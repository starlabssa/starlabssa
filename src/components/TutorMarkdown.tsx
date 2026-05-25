'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// DeepSeek (and most LaTeX-trained models) emit math with backslashed
// delimiters: \( ... \) for inline and \[ ... \] for display.
// remark-math only recognizes $...$ / $$...$$, so we normalize here.
function normalizeMathDelimiters(content: string): string {
  return content
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, inner) => `$$${inner}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, inner) => `$${inner}$`);
}

export default function TutorMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ children }) => (
          <h2 className="font-serif text-2xl text-black mt-6 first:mt-0 mb-3">{children}</h2>
        ),
        h2: ({ children }) => (
          <h3 className="font-serif text-xl text-black mt-6 first:mt-0 mb-3">{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 className="font-serif text-lg text-black mt-5 first:mt-0 mb-2">{children}</h4>
        ),
        h4: ({ children }) => (
          <h5 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0a1628] mt-5 first:mt-0 mb-2">
            {children}
          </h5>
        ),
        p: ({ children }) => <p className="leading-relaxed mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-5 mb-3 space-y-1 marker:text-[#0a1628]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 mb-3 space-y-1 marker:text-[#0a1628]">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-black">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0a1628] underline underline-offset-2 hover:opacity-70"
          >
            {children}
          </a>
        ),
        code: ({ children, className }) => {
          const isBlock = typeof className === 'string' && className.includes('language-');
          if (isBlock) {
            return (
              <code
                className={`${className} block bg-neutral-50 border border-neutral-200 p-4 text-[13px] font-mono leading-relaxed overflow-x-auto`}
              >
                {children}
              </code>
            );
          }
          return (
            <code className="font-mono text-[13px] bg-neutral-100 px-1 py-[1px] rounded">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="mb-3 overflow-x-auto">{children}</pre>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#0a1628] pl-4 my-3 text-neutral-700 italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-neutral-300">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a1628] py-2 px-3">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="py-2 px-3 border-b border-neutral-200">{children}</td>
        ),
        hr: () => <hr className="border-neutral-200 my-4" />,
      }}
    >
      {normalizeMathDelimiters(content)}
    </ReactMarkdown>
  );
}
