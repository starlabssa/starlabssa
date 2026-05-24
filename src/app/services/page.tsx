import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const SERVICES = [
  {
    slug: '/modeler',
    label: 'modeler',
    title: 'Modeler',
    blurb:
      'Turn images into 3D-printable STL files — bookmarks, keychains, vases, and more, generated locally in your browser.',
  },
  {
    slug: '/services/modeling',
    label: 'modeling',
    title: '3D Modeling Consultancy',
    blurb: 'Precision CAD modeling for concept design, products, and visualization.',
  },
  {
    slug: '/services/printing',
    label: 'printing',
    title: '3D Printing & Manufacturing',
    blurb: 'From rapid prototypes to production parts — quality and precision guaranteed.',
  },
];

export const metadata = {
  title: 'Services — STAR Labs',
  description: 'Design, modeling, and production services at STAR Labs.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            Services
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            From idea
            <br />
            to <em className="text-[#0a1628] not-italic">technology</em>,
            <br />
            end to end.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Explore how STAR Labs transforms ideas into technology — through design, modeling, and
            production.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-black">Offerings</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {SERVICES.length} services
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={s.slug}
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col min-h-[280px]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Service / {s.label}
                  </div>
                  <span className="font-mono text-[10px] text-[#0a1628] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">{s.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm flex-1">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
