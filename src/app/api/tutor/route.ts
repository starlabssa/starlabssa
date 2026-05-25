import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";
import { MAJORS, TUTOR_PERSONALITIES } from "@/lib/tutor-personalities";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getOrCreateProfile } from "@/lib/profile";

const AI_PROVIDER = {
  baseUrl: "https://api.deepseek.com",
  model: "deepseek-v4-flash",
  apiKeyEnv: "DEEPSEEK_API_KEY",
} as const;

const RequestSchema = z.object({
  major: z.enum(MAJORS),
  conversationId: z.string().uuid().nullable(),
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .min(1),
});

function titleFromFirstMessage(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) return "Untitled chat";
  return trimmed.split(/\s+/).slice(0, 6).join(" ").slice(0, 80);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env[AI_PROVIDER.apiKeyEnv];
  if (!apiKey) {
    return Response.json(
      { error: `Missing ${AI_PROVIDER.apiKeyEnv} in server environment` },
      { status: 500 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { major, messages } = parsed.data;
  let { conversationId } = parsed.data;
  const systemPrompt = TUTOR_PERSONALITIES[major];

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return Response.json(
      { error: "Last message must be from user" },
      { status: 400 }
    );
  }

  // New conversation: ensure profile + create row
  if (!conversationId) {
    await getOrCreateProfile();
    const { data: newConv, error: convErr } = await supabaseAdmin
      .from("conversations")
      .insert({
        clerk_user_id: userId,
        major,
        title: titleFromFirstMessage(lastMessage.content),
      })
      .select("id")
      .single();
    if (convErr || !newConv) {
      return Response.json(
        {
          error: "Failed to create conversation",
          detail: convErr?.message ?? "unknown",
        },
        { status: 500 }
      );
    }
    conversationId = newConv.id;
  } else {
    // Existing: verify ownership
    const { data: owned, error: ownErr } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("clerk_user_id", userId)
      .maybeSingle();
    if (ownErr) {
      return Response.json(
        { error: "Failed to verify ownership", detail: ownErr.message },
        { status: 500 }
      );
    }
    if (!owned) {
      return Response.json({ error: "Conversation not found" }, { status: 404 });
    }
  }
  const finalConversationId = conversationId;

  // Persist user message
  const { error: insUserErr } = await supabaseAdmin.from("messages").insert({
    conversation_id: finalConversationId,
    role: "user",
    content: lastMessage.content,
  });
  if (insUserErr) {
    return Response.json(
      { error: "Failed to save message", detail: insUserErr.message },
      { status: 500 }
    );
  }

  // Call DeepSeek
  const upstream = await fetch(`${AI_PROVIDER.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_PROVIDER.model,
      stream: true,
      thinking: { type: "disabled" },
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      {
        error: "Upstream AI provider error",
        status: upstream.status,
        detail: detail.slice(0, 500),
      },
      { status: 502 }
    );
  }

  // Tee the stream: forward bytes to client AND accumulate assistant text on server.
  // On stream end, persist assistant message and bump conversation.updated_at.
  // If client cancels mid-stream, the partial response is NOT saved (intentional).
  const upstreamReader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let assistantText = "";

  const out = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await upstreamReader.read();
      if (done) {
        if (assistantText.length > 0) {
          await supabaseAdmin.from("messages").insert({
            conversation_id: finalConversationId,
            role: "assistant",
            content: assistantText,
          });
        }
        await supabaseAdmin
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", finalConversationId);
        controller.close();
        return;
      }

      controller.enqueue(value);

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        const line = part.trim();
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const json = JSON.parse(payload);
          const delta: string | undefined = json?.choices?.[0]?.delta?.content;
          if (delta) assistantText += delta;
        } catch {
          // ignore malformed SSE
        }
      }
    },
    async cancel() {
      try {
        await upstreamReader.cancel();
      } catch {
        // ignore
      }
    },
  });

  return new Response(out, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Conversation-Id": finalConversationId,
      "Access-Control-Expose-Headers": "X-Conversation-Id",
    },
  });
}
