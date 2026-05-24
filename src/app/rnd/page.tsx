import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'R&D — STAR Labs',
  description: 'Research and development across AI, robotics, materials, quantum, biotech, and space technology.',
};

const FIELDS = [
  ['Artificial Intelligence', 'Advanced AI research including machine learning, computer vision, natural language processing, and autonomous systems for industrial applications.'],
  ['Biotechnology', 'Synthetic biology, bioengineering, and biomanufacturing technologies for sustainable production and medical applications.'],
  ['High-G Impact-Resistant Composite Wristwatch', 'Developing a wristwatch case and movement assembly engineered to survive extreme G-forces — fusing aerospace-grade composites with precision horology for tactical and high-performance use.'],
];

export default function RNDPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            Research &amp; Development
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            Research that
            <br />
            <em className="text-[#0a1628] not-italic">becomes</em> technology.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Focused disciplines, one lab. We pursue the foundational work that turns into the
            products, tools, and infrastructure of the next decade.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-black">Active fields</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {FIELDS.length} disciplines
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {FIELDS.map(([title, body], i) => (
              <div key={title} className="bg-white p-8 min-h-[220px]">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Field / {String(i + 1).padStart(2, '0')}
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
              Collaboration
            </div>
            <p className="font-serif text-3xl lg:text-4xl text-black leading-tight mb-8">
              We actively collaborate with universities, research institutions, and industry
              partners to advance scientific knowledge and develop practical solutions.
            </p>
            <a
              href="mailto:starlabs.ksa@gmail.com?subject=Research%20Collaboration%20Inquiry"
              className="inline-block px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Explore partnership →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
