'use client';

import 'katex/dist/katex.min.css';
import { useState, useRef, useEffect, type FormEvent, type RefObject } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import TutorMarkdown from '@/components/TutorMarkdown';
import { MAJORS, type Major } from '@/lib/tutor-personalities';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const MAJOR_LABELS: Record<Major, string> = {
  medicine: 'Medicine',
  engineering: 'Engineering',
  business: 'Business',
};

const MAJOR_TAGLINES: Record<Major, string> = {
  medicine:
    'Evidence-first, mechanism-led. For med, nursing, pharmacy, and health-science students.',
  engineering:
    'First-principles. Derives before asserting. Walks problems with units and intuition.',
  business:
    'Frameworks-aware, not framework-obsessed. Trade-offs over buzzwords.',
};

type ErrorState =
  | { kind: 'unauthorized' }
  | { kind: 'general'; message: string }
  | null;

export default function TutorPage() {
  const [major, setMajor] = useState<Major | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  function resetToPicker() {
    abortRef.current?.abort();
    setMajor(null);
    setMessages([]);
    setInput('');
    setStreaming(false);
    setError(null);
  }

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (!major || !input.trim() || streaming) return;

    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    const outgoing = [...messages, userMsg];
    setMessages(outgoing);
    setInput('');
    setError(null);
    setStreaming(true);
    // Empty assistant slot we'll fill as deltas stream in
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ major, messages: outgoing }),
        signal: ctrl.signal,
      });

      if (res.status === 401) {
        setError({ kind: 'unauthorized' });
        setMessages((m) => m.slice(0, -1));
        return;
      }
      if (!res.ok || !res.body) {
        setError({
          kind: 'general',
          message: `Couldn't reach the tutor (status ${res.status}). Try again in a moment.`,
        });
        setMessages((m) => m.slice(0, -1));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const json = JSON.parse(payload);
            const delta: string | undefined =
              json?.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === 'assistant') {
                  copy[copy.length - 1] = {
                    ...last,
                    content: last.content + delta,
                  };
                }
                return copy;
              });
            }
          } catch {
            // Ignore malformed SSE lines
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError({
        kind: 'general',
        message: 'Network error. Check your connection and try again.',
      });
      setMessages((m) =>
        m[m.length - 1]?.role === 'assistant' && m[m.length - 1].content === ''
          ? m.slice(0, -1)
          : m,
      );
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <SiteHeader />
      {major === null ? (
        <PickerScreen onPick={setMajor} />
      ) : (
        <ChatScreen
          major={major}
          messages={messages}
          input={input}
          setInput={setInput}
          streaming={streaming}
          error={error}
          onSubmit={sendMessage}
          onChangeMajor={resetToPicker}
          scrollRef={scrollRef}
        />
      )}
    </main>
  );
}

function PickerScreen({ onPick }: { onPick: (m: Major) => void }) {
  return (
    <>
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            STAR Labs Tutor
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-3xl">
            Pick your
            <br />
            <em className="text-[#0a1628] not-italic">major</em>.
            <br />
            Start learning.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Each tutor is tuned for the discipline you&apos;re studying — different
            reasoning style, different priorities, different way of explaining things.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl text-black">Choose a tutor</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {MAJORS.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {MAJORS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onPick(m)}
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col text-left"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Tutor / {m}
                  </div>
                  <span className="font-mono text-[10px] text-[#0a1628] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">
                  {MAJOR_LABELS[m]}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm flex-1">
                  {MAJOR_TAGLINES[m]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ChatScreen({
  major,
  messages,
  input,
  setInput,
  streaming,
  error,
  onSubmit,
  onChangeMajor,
  scrollRef,
}: {
  major: Major;
  messages: ChatMessage[];
  input: string;
  setInput: (s: string) => void;
  streaming: boolean;
  error: ErrorState;
  onSubmit: (e: FormEvent) => void;
  onChangeMajor: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="flex-1 flex flex-col">
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628]">
            STAR Labs Tutor / {MAJOR_LABELS[major]}
          </div>
          <button
            type="button"
            onClick={onChangeMajor}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
          >
            ← Change major
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 flex flex-col gap-8">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-2xl text-black mb-3">
                Ask your first question.
              </p>
              <p className="text-neutral-600 text-sm">
                A concept, a problem, or an exam topic — whatever you&apos;re working on.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  m.role === 'user'
                    ? 'max-w-[80%] bg-[#0a1628] text-white px-5 py-3 rounded-2xl rounded-br-md'
                    : 'max-w-[85%] text-black'
                }
              >
                <div
                  className={
                    m.role === 'user'
                      ? 'font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2'
                      : 'font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628] mb-2'
                  }
                >
                  {m.role === 'user' ? 'You' : 'Tutor'}
                </div>
                {m.role === 'user' ? (
                  <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                    {m.content}
                  </div>
                ) : (
                  <div className="text-[15px]">
                    {m.content ? (
                      <TutorMarkdown content={m.content} />
                    ) : streaming && i === messages.length - 1 ? (
                      <span className="text-neutral-400">…</span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}

          {error?.kind === 'unauthorized' && (
            <div className="border border-neutral-200 bg-neutral-50 px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628] mb-2">
                Sign in required
              </div>
              <p className="text-sm text-neutral-700 mb-3">
                You need to be signed in to chat with the tutor.
              </p>
              <Link
                href="/sign-in"
                className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-[#0a1628] px-4 py-2 hover:opacity-90 transition"
              >
                Sign in →
              </Link>
            </div>
          )}

          {error?.kind === 'general' && (
            <div className="border border-neutral-200 bg-neutral-50 px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628] mb-2">
                Something went wrong
              </div>
              <p className="text-sm text-neutral-700">{error.message}</p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} className="border-t border-neutral-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-5 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the tutor…"
            disabled={streaming}
            className="flex-1 border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-[#0a1628] disabled:bg-neutral-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="bg-[#0a1628] text-white font-mono text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {streaming ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
    </section>
  );
}
