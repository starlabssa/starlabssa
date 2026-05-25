import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";
import { MAJORS, TUTOR_PERSONALITIES } from "@/lib/tutor-personalities";

// Swappable AI provider config.
// To switch providers, change baseUrl/model/apiKeyEnv and adjust the
// request body shape below if the new provider isn't OpenAI-compatible.
const AI_PROVIDER = {
  baseUrl: "https://api.deepseek.com",
  model: "deepseek-v4-flash",
  apiKeyEnv: "DEEPSEEK_API_KEY",
} as const;

const RequestSchema = z.object({
  major: z.enum(MAJORS),
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  // 1. Auth gate
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Server env check
  const apiKey = process.env[AI_PROVIDER.apiKeyEnv];
  if (!apiKey) {
    return Response.json(
      { error: `Missing ${AI_PROVIDER.apiKeyEnv} in server environment` },
      { status: 500 }
    );
  }

  // 3. Parse + validate body
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
  const systemPrompt = TUTOR_PERSONALITIES[major];

  // 4. Call DeepSeek (OpenAI-compatible) with thinking explicitly disabled
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

  // 5. Pass through SSE stream as-is (OpenAI-format `data: {...}` chunks)
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
