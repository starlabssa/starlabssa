// src/lib/gemini-vision.ts
// Server-only helper. Calls Google Gemini's vision model to transcribe/describe
// an image so the description can be fed into the existing DeepSeek tutor flow.
//
// Model: gemini-3.5-flash (current stable multimodal model; supports inline
// base64 image input via the generateContent REST endpoint).
// Docs: https://ai.google.dev/gemini-api/docs/vision

import type { Major } from "@/lib/tutor-personalities";

const GEMINI_MODEL = "gemini-3.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const TIMEOUT_MS = 15_000;

export const SUPPORTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type SupportedImageMimeType = (typeof SUPPORTED_IMAGE_MIME_TYPES)[number];

export type TranscribeImageInput = {
  dataBase64: string;
  mimeType: SupportedImageMimeType;
  userText: string; // may be empty
  major: Major;
};

export class GeminiVisionError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly detail?: string,
  ) {
    super(message);
    this.name = "GeminiVisionError";
  }
}

function buildPrompt(userText: string, major: Major): string {
  const trimmed = userText.trim();
  const focusLine = trimmed
    ? `The student also typed this alongside the image: """${trimmed}"""`
    : "The student did not type any text — the image is the entire question.";

  return [
    `You are a vision transcription assistant for a ${major} tutoring session.`,
    `Your only job is to describe what is in the image so a separate text-only tutor can answer the student.`,
    ``,
    focusLine,
    ``,
    `Carefully and faithfully transcribe / describe everything in the image that is relevant for tutoring:`,
    `- If there is a problem statement, transcribe it verbatim.`,
    `- If there are equations or math, write them out in LaTeX (e.g. $x^2 + 1$ or $$\\int_0^1 x\\,dx$$).`,
    `- If there is a diagram, figure, or chart, describe its structure, labels, axes, and what it depicts.`,
    `- If there is handwriting, transcribe it as best you can and flag anything illegible.`,
    `- If there is a table, render it in markdown.`,
    `- If the image is a textbook page or screenshot, capture the relevant question/passage, not surrounding chrome.`,
    ``,
    `Do not solve the problem. Do not explain. Just produce a faithful, complete description so the tutor has everything it needs.`,
    `If the image is unreadable, unrelated to studying, or empty, say so plainly in one sentence.`,
  ].join("\n");
}

/**
 * Calls Gemini and returns a plain-text description of the image.
 * Throws GeminiVisionError on any failure (network, non-2xx, malformed response, empty text).
 */
export async function transcribeImage(input: TranscribeImageInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiVisionError("Missing GEMINI_API_KEY in server environment", 500);
  }

  const prompt = buildPrompt(input.userText, input.major);

  const body = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: input.mimeType,
              data: input.dataBase64,
            },
          },
          { text: prompt },
        ],
      },
    ],
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    const aborted = (err as Error)?.name === "AbortError";
    throw new GeminiVisionError(
      aborted ? "Vision request timed out" : "Vision request failed",
      504,
      (err as Error)?.message,
    );
  }
  clearTimeout(timer);

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new GeminiVisionError(
      "Gemini API returned an error",
      res.status,
      detail.slice(0, 500),
    );
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new GeminiVisionError("Gemini returned malformed JSON", 502);
  }

  // Expected shape: { candidates: [ { content: { parts: [ { text: "..." } ] } } ] }
  const text = extractText(json);
  if (!text) {
    throw new GeminiVisionError("Gemini returned an empty response", 502);
  }
  return text;
}

function extractText(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const candidates = (json as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const first = candidates[0];
  if (!first || typeof first !== "object") return null;
  const content = (first as { content?: unknown }).content;
  if (!content || typeof content !== "object") return null;
  const parts = (content as { parts?: unknown }).parts;
  if (!Array.isArray(parts)) return null;
  const chunks: string[] = [];
  for (const p of parts) {
    if (p && typeof p === "object" && typeof (p as { text?: unknown }).text === "string") {
      chunks.push((p as { text: string }).text);
    }
  }
  const joined = chunks.join("\n").trim();
  return joined.length > 0 ? joined : null;
}
