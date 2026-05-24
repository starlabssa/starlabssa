import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const PRINCIPLES = [
  ['Innovation', 'Exploring and developing new technologies that drive progress.'],
  ['Integration', 'Combining research, design, and industry expertise into one unified process.'],
  ['Impact', 'Ensuring that every project contributes to a sustainable and intelligent future.'],
];

export const metadata = {
  title: 'About — STAR Labs',
  description: 'Saudi-based innovation and development consultancy advancing science, engineering, and design.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            About
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            Building tomorrow's
            <br />
            <em className="text-[#0a1628] not-italic">technologies</em>, today.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            STAR Labs is a Saudi-based innovation and development consultancy dedicated to advancing
            science, engineering, and design.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                Who we are
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-black leading-tight">
                Bridging research and practical application.
              </h2>
            </div>
            <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
              <p>
                We specialize in transforming ideas into scalable, real-world technologies. Our
                mission is simple yet bold: redefine how innovation is approached by learning from
                the institutions that came before us, and building on their successes with a fresh
                perspective and renewed purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                Purpose
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-black leading-tight">
                A regional hub for innovation and R&amp;D.
              </h2>
            </div>
            <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
              <p>
                We exist to accelerate technological growth in fields that shape the modern world —
                renewable energy, artificial intelligence, materials science, and digital
                manufacturing.
              </p>
              <p>
                Through collaboration, strategic partnerships, and forward-thinking development,
                STAR Labs aims to become the regional hub for innovation and R&amp;D in Saudi Arabia
                and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-black">Philosophy &amp; approach</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              3 principles
            </span>
          </div>
          <p className="text-neutral-700 text-lg leading-relaxed max-w-3xl mb-10">
            We believe in <em className="text-[#0a1628] not-italic">learning, creating, and
            advancing for all.</em> Our work is grounded in three principles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {PRINCIPLES.map(([title, body], i) => (
              <div key={title} className="bg-white p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
              Looking ahead
            </div>
            <p className="font-serif text-3xl lg:text-4xl text-black leading-tight mb-10">
              While today we operate as a consultancy and development firm, our future lies in
              becoming a full-scale innovation center — combining research, prototyping, and
              product development under one roof.
            </p>
            <Link
              href="/support"
              className="inline-block px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
