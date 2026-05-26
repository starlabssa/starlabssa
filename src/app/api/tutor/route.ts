import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";
import { MAJORS, TUTOR_PERSONALITIES } from "@/lib/tutor-personalities";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getOrCreateProfile } from "@/lib/profile";
import {
  transcribeImage,
  GeminiVisionError,
  SUPPORTED_IMAGE_MIME_TYPES,
  type SupportedImageMimeType,
} from "@/lib/gemini-vision";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB

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
  image: z
    .object({
      mimeType: z.enum(SUPPORTED_IMAGE_MIME_TYPES),
      dataBase64: z.string().min(1),
    })
    .optional(),
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

  // If an image was attached, validate size server-side and run vision transcription.
  // On success we splice the description into the last user message ONLY for the
  // upstream DeepSeek call — the message we persist to the DB stays as the user
  // typed it (or "[Image attached]" if empty).
  let imageDescription: string | null = null;
  if (parsed.data.image) {
    const approxBytes = Math.floor((parsed.data.image.dataBase64.length * 3) / 4);
    if (approxBytes > MAX_IMAGE_BYTES) {
      return Response.json(
        { error: "Image is too large. Please use an image under 10 MB." },
        { status: 413 }
      );
    }
    try {
      imageDescription = await transcribeImage({
        dataBase64: parsed.data.image.dataBase64,
        mimeType: parsed.data.image.mimeType as SupportedImageMimeType,
        userText: lastMessage.content,
        major,
      });
    } catch (err) {
      const detail =
        err instanceof GeminiVisionError ? err.detail ?? err.message : String(err);
      console.error("[tutor] gemini-vision failed:", detail);
      return Response.json(
        {
          error:
            "Couldn't read your image. Try a clearer photo, or send the question as text.",
        },
        { status: 502 }
      );
    }
  }

  // If the user attached an image but typed no text, store a placeholder so the
  // DB row isn't empty. The DeepSeek call always uses the spliced version below.
  const persistedUserContent =
    parsed.data.image && lastMessage.content.trim().length === 0
      ? "[Image attached]"
      : lastMessage.content;

  // New conversation: ensure profile + create row
  if (!conversationId) {
    await getOrCreateProfile();
    const { data: newConv, error: convErr } = await supabaseAdmin
      .from("conversations")
      .insert({
        clerk_user_id: userId,
        major,
        title: titleFromFirstMessage(persistedUserContent),
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
    content: persistedUserContent,
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
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(0, -1),
        {
          role: "user",
          content: imageDescription
            ? `[The student attached an image. A vision model transcribed it as follows — treat this as ground truth for what is in the image:]\n\n${imageDescription}\n\n---\n\nStudent's message: ${lastMessage.content.trim() || "(no text — please answer based on the image content above)"}`
            : lastMessage.content,
        },
      ],
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
      ...(finalConversationId ? { "X-Conversation-Id": finalConversationId } : {}),
      "Access-Control-Expose-Headers": "X-Conversation-Id",
    },
  });
}
