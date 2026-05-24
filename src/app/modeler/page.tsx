import Link from 'next/link';
import { listTemplates } from '@/lib/modeler/templates';
import type { Template } from '@/lib/modeler/templates';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'STAR Labs Modeler — Turn images into printable objects',
  description:
    'Upload an image and instantly generate a 3D-printable STL file. Bookmarks, keychains, portraits, coasters, vases, coins — fully in your browser.',
};

export default function ModelerLandingPage() {
  const templates = listTemplates();

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            STAR Labs Modeler
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-3xl">
            From image
            <br />
            to <em className="text-[#0a1628] not-italic">printable object</em>
            <br />
            in your browser.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Upload a photo or sculpt a vase by clicks. Download an STL file ready for any
            3D printer. Nothing is uploaded — the entire model is generated locally
            on your device.
          </p>
        </div>
      </section>

      <section className="lg:hidden border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-3">
            Desktop recommended
          </div>
          <p className="text-neutral-700 leading-relaxed">
            The Modeler studio uses 3D preview controls best suited to a mouse and a larger screen.
            Bookmark this page and visit on a laptop or desktop for the full experience.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl text-black">Templates</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {templates.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {templates.map((t) => (
              <Link
                key={t.id}
                href={`/modeler/${t.id}`}
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Template / {t.id}
                  </div>
                  <span className="font-mono text-[10px] text-[#0a1628] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">{t.name}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm flex-1 mb-6">
                  {t.tagline}
                </p>
                <div className="flex gap-3 pt-4 border-t border-neutral-200 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  <CardSpecs template={t} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <h2 className="font-serif text-2xl text-black mb-12">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              ['01', 'Pick a template', 'Choose the form factor — bookmark, keychain, portrait, coaster, vase, or coin.'],
              ['02', 'Upload or sculpt', 'Drop a photo for relief templates, or adjust the sliders for parametric ones.'],
              ['03', 'Tune & download', 'Adjust depth, size, and detail. Download a print-ready STL.'],
            ].map(([n, title, body]) => (
              <li key={n}>
                <div className="font-mono text-xs text-[#0a1628] mb-4">{n}</div>
                <h3 className="font-serif text-xl text-black mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

function CardSpecs({ template }: { template: Template }) {
  if (template.kind === 'vase') {
    return (
      <>
        <span>{template.defaults.heightMM} mm tall</span>
        <span>·</span>
        <span>{(template.defaults.bellyRadiusMM * 2).toFixed(0)} mm wide</span>
      </>
    );
  }
  const d = template.defaults;
  return (
    <>
      <span>
        {d.widthMM}
        {d.widthMM !== d.heightMM && `×${d.heightMM}`} mm
      </span>
      <span>·</span>
      <span>{(d.baseMM + d.reliefMM).toFixed(1)} mm thick</span>
    </>
  );
}
