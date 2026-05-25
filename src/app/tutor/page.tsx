'use client';

import 'katex/dist/katex.min.css';
import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type RefObject,
} from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import TutorMarkdown from '@/components/TutorMarkdown';
import { MAJORS, type Major } from '@/lib/tutor-personalities';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type ConversationSummary = {
  id: string;
  major: Major;
  title: string;
  created_at: string;
  updated_at: string;
};

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

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : '2-digit',
  });
}

export default function TutorPage() {
  const [major, setMajor] = useState<Major | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch conversation list once on mount. If 401, silently ignore.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/conversations')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.conversations) {
          setConversations(data.conversations);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  function resetToPicker() {
    abortRef.current?.abort();
    setMajor(null);
    setConversationId(null);
    setMessages([]);
    setInput('');
    setStreaming(false);
    setError(null);
    setMobileSidebarOpen(false);
  }

  function startNewConversation() {
    abortRef.current?.abort();
    setConversationId(null);
    setMessages([]);
    setInput('');
    setStreaming(false);
    setError(null);
    setMobileSidebarOpen(false);
  }

  async function loadConversation(conv: ConversationSummary) {
    abortRef.current?.abort();
    setLoadingConversation(true);
    setError(null);
    setMobileSidebarOpen(false);
    try {
      const res = await fetch(`/api/conversations/${conv.id}`);
      if (!res.ok) {
        setError({
          kind: 'general',
          message: 'Could not load that conversation.',
        });
        return;
      }
      const data = await res.json();
      setMajor(conv.major);
      setConversationId(conv.id);
      setMessages(
        (data.messages ?? []).map((m: { role: string; content: string }) => ({
          role: m.role as ChatMessage['role'],
          content: m.content,
        })),
      );
      setInput('');
    } catch {
      setError({ kind: 'general', message: 'Network error.' });
    } finally {
      setLoadingConversation(false);
    }
  }

  async function deleteConversation(id: string) {
    if (
      !window.confirm('Delete this conversation? This cannot be undone.')
    )
      return;
    try {
      const res = await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
      if (!res.ok) return;
      setConversations((cs) => cs.filter((c) => c.id !== id));
      if (conversationId === id) {
        setConversationId(null);
        setMessages([]);
      }
    } catch {
      // silent
    }
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
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const wasNewConversation = conversationId === null;

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ major, conversationId, messages: outgoing }),
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

      const returnedConvId = res.headers.get('X-Conversation-Id');
      if (returnedConvId) {
        setConversationId(returnedConvId);
        if (wasNewConversation) {
          const nowIso = new Date().toISOString();
          const newConv: ConversationSummary = {
            id: returnedConvId,
            major,
            title: userMsg.content
              .trim()
              .split(/\s+/)
              .slice(0, 6)
              .join(' ')
              .slice(0, 80),
            created_at: nowIso,
            updated_at: nowIso,
          };
          setConversations((cs) => [newConv, ...cs]);
        } else {
          setConversations((cs) => {
            const target = cs.find((c) => c.id === returnedConvId);
            if (!target) return cs;
            const bumped = {
              ...target,
              updated_at: new Date().toISOString(),
            };
            return [bumped, ...cs.filter((c) => c.id !== returnedConvId)];
          });
        }
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
            // ignore malformed SSE
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
        m[m.length - 1]?.role === 'assistant' &&
        m[m.length - 1].content === ''
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
          conversationId={conversationId}
          messages={messages}
          input={input}
          setInput={setInput}
          streaming={streaming}
          loadingConversation={loadingConversation}
          error={error}
          conversations={conversations}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          onSubmit={sendMessage}
          onChangeMajor={resetToPicker}
          onNewConversation={startNewConversation}
          onLoadConversation={loadConversation}
          onDeleteConversation={deleteConversation}
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
  conversationId,
  messages,
  input,
  setInput,
  streaming,
  loadingConversation,
  error,
  conversations,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  onSubmit,
  onChangeMajor,
  onNewConversation,
  onLoadConversation,
  onDeleteConversation,
  scrollRef,
}: {
  major: Major;
  conversationId: string | null;
  messages: ChatMessage[];
  input: string;
  setInput: (s: string) => void;
  streaming: boolean;
  loadingConversation: boolean;
  error: ErrorState;
  conversations: ConversationSummary[];
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (b: boolean) => void;
  onSubmit: (e: FormEvent) => void;
  onChangeMajor: () => void;
  onNewConversation: () => void;
  onLoadConversation: (c: ConversationSummary) => void;
  onDeleteConversation: (id: string) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="flex-1 flex min-h-0">
      <Sidebar
        conversations={conversations}
        conversationId={conversationId}
        onNewConversation={onNewConversation}
        onLoadConversation={onLoadConversation}
        onDeleteConversation={onDeleteConversation}
        className="hidden lg:flex"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b border-neutral-200 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] truncate">
              STAR Labs Tutor / {MAJOR_LABELS[major]}
            </div>
            <div className="flex items-center gap-5 shrink-0">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
              >
                Recent
              </button>
              <button
                type="button"
                onClick={onChangeMajor}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
              >
                ← Change major
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 flex flex-col gap-8">
            {loadingConversation && (
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Loading conversation…
              </div>
            )}

            {!loadingConversation && messages.length === 0 && (
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
                className={
                  m.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                }
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
              disabled={streaming || loadingConversation}
              className="flex-1 border border-neutral-300 px-4 py-3 text-black placeholder-neutral-400 focus:outline-none focus:border-[#0a1628] disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={streaming || loadingConversation || !input.trim()}
              className="bg-[#0a1628] text-white font-mono text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {streaming ? 'Sending…' : 'Send'}
            </button>
          </div>
        </form>
      </div>

      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          <div className="border-b border-neutral-200 px-5 py-5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628]">
              Recent
            </span>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
            >
              Close ×
            </button>
          </div>
          <Sidebar
            conversations={conversations}
            conversationId={conversationId}
            onNewConversation={onNewConversation}
            onLoadConversation={onLoadConversation}
            onDeleteConversation={onDeleteConversation}
            className="flex flex-1"
            hideHeader
          />
        </div>
      )}
    </section>
  );
}

function Sidebar({
  conversations,
  conversationId,
  onNewConversation,
  onLoadConversation,
  onDeleteConversation,
  className,
  hideHeader,
}: {
  conversations: ConversationSummary[];
  conversationId: string | null;
  onNewConversation: () => void;
  onLoadConversation: (c: ConversationSummary) => void;
  onDeleteConversation: (id: string) => void;
  className?: string;
  hideHeader?: boolean;
}) {
  return (
    <aside
      className={`${className ?? ''} w-full lg:w-72 lg:border-r border-neutral-200 bg-white flex-col`}
    >
      {!hideHeader && (
        <div className="px-5 py-5 border-b border-neutral-200 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628]">
            Recent
          </span>
          <button
            type="button"
            onClick={onNewConversation}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
          >
            + New
          </button>
        </div>
      )}
      {hideHeader && (
        <div className="px-5 py-3 border-b border-neutral-200">
          <button
            type="button"
            onClick={onNewConversation}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
          >
            + New conversation
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-5 text-sm text-neutral-500">No past chats yet.</div>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {conversations.map((c) => {
              const active = c.id === conversationId;
              return (
                <li
                  key={c.id}
                  className={`group flex items-start ${active ? 'bg-neutral-50' : 'hover:bg-neutral-50'} transition-colors`}
                >
                  <button
                    type="button"
                    onClick={() => onLoadConversation(c)}
                    className="flex-1 text-left px-5 py-4 min-w-0"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0a1628] mb-1.5">
                      {MAJOR_LABELS[c.major]} · {formatShortDate(c.updated_at)}
                    </div>
                    <div className="text-sm text-black truncate">
                      {c.title || 'Untitled chat'}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteConversation(c.id)}
                    aria-label="Delete conversation"
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-neutral-400 hover:text-[#0a1628] transition px-3 py-4"
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
