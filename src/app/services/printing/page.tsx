import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: '3D Printing & Manufacturing — STAR Labs',
  description:
    'FDM and SLA 3D printing for rapid prototyping and short-run parts. Many materials and colors, Autodesk-ready files.',
};

const WHY = [
  ['Accelerate Iteration', 'Test, learn, and refine quickly — shorten the path from idea to validated design.'],
  ['Reduce Risk & Cost', 'Catch fit, tolerance, and usability issues before committing to tooling or large orders.'],
  ['Real-World Feedback', 'Evaluate parts in-hand for ergonomics, assembly, and performance.'],
  ['Design Freedom', 'Print complex geometries that are difficult or costly to machine.'],
  ['Bridge to Production', 'Create jigs, fixtures, and pilot runs while final manufacturing ramps up.'],
  ['Custom & On-Demand', 'Make one-offs or short runs without minimum order quantities.'],
];

const FDM_MATERIALS = ['PLA / PLA+', 'PETG', 'ABS', 'ASA', 'TPU (flexible)', 'Nylon', 'Nylon + CF'];
const SLA_RESINS = ['Standard', 'Tough / Durable', 'High-Temp', 'Clear / Translucent', 'Rigid / Filled', 'Flexible'];

const FILE_PREP = [
  ['Preferred Files', 'STL or 3MF. We also accept STEP for orientation guidance.'],
  ['Modeled in Autodesk', 'Our upstream CAD is built in Autodesk apps for clean, watertight exports.'],
  ['Checks', 'Wall thickness, overhangs, supports, and orientation recommendations.'],
  ['Finish Options', 'Sanding, priming/painting (on request), basic post-processing for SLA.'],
  ['Quality Control', 'Visual inspection, dimensional spot-checks, and test fit (when applicable).'],
];

const PROCESS = [
  ['01', 'Share Files', 'Send STL/3MF (and STEP if needed), quantity, and color/material preferences.'],
  ['02', 'Review', 'We confirm feasibility, suggest orientation/material, and flag any risks.'],
  ['03', 'Quote', 'You receive price and lead time based on material, size, and volume.'],
  ['04', 'Print', 'We manufacture, post-process (if requested), and inspect.'],
  ['05', 'Delivery', 'Pickup or shipping with basic packing; digital print report provided.'],
];

export default function PrintingService() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            Services / 3D Printing
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            Rapid prototypes,
            <br />
            <em className="text-[#0a1628] not-italic">production parts</em>.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Fast, reliable additive manufacturing with FDM &amp; SLA. Perfect for functional
            prototypes, fit checks, enclosures, jigs, models, and presentation pieces.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">Processes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            <div className="bg-white p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                FDM
              </div>
              <h3 className="font-serif text-2xl text-black mb-3">Fused Deposition Modeling</h3>
              <p className="text-neutral-600 mb-5 leading-relaxed">
                Versatile and cost-effective for quick iterations and durable functional parts.
              </p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Enclosures, brackets, fixtures, and large prints.
                </li>
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Wide palette of materials and colors.
                </li>
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Balanced strength, price, and turnaround time.
                </li>
              </ul>
            </div>
            <div className="bg-white p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                SLA
              </div>
              <h3 className="font-serif text-2xl text-black mb-3">Stereolithography</h3>
              <p className="text-neutral-600 mb-5 leading-relaxed">
                High-detail resin printing for smooth surfaces, small features, and
                presentation-quality parts.
              </p>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Cosmetic models, miniatures, and precise fit checks.
                </li>
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Specialty resins for toughness, heat resistance, or transparency.
                </li>
                <li className="pl-3 relative">
                  <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
                  Minimal layer lines; paint/finish-ready surfaces.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">Why rapid prototyping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {WHY.map(([title, body]) => (
              <div key={title} className="bg-white p-6">
                <h3 className="font-serif text-lg text-black mb-2">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">Materials &amp; colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            <div className="bg-white p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                FDM Filaments
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {FDM_MATERIALS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block border border-[#0a1628] text-[#0a1628] text-[11px] font-mono uppercase tracking-wider px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Core neutrals plus a wide range of solid colors. Specialty filaments available on
                request.
              </p>
            </div>
            <div className="bg-white p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                SLA Resins
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {SLA_RESINS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block border border-[#0a1628] text-[#0a1628] text-[11px] font-mono uppercase tracking-wider px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Black, white, gray, clear, and specialty tones. Paint-ready and polishable options
                available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">File prep &amp; handover</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
            {FILE_PREP.map(([title, body]) => (
              <li key={title}>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5">
                  {title}
                </div>
                <p className="text-neutral-700 leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-12">How to order</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PROCESS.map(([n, title, body]) => (
              <li key={n}>
                <div className="font-mono text-xs text-[#0a1628] mb-4">{n}</div>
                <h3 className="font-serif text-lg text-black mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
              Request a quotation
            </div>
            <p className="font-serif text-3xl lg:text-4xl text-black leading-tight mb-8">
              Include your files (STL/3MF), target material, color, quantities, and any special
              requirements.
            </p>
            <a
              href="mailto:starlabs.ksa@gmail.com?subject=3D%20Printing%20Quotation%20Request"
              className="inline-block px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              starlabs.ksa@gmail.com →
            </a>
            <div className="mt-10">
              <Link
                href="/services"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-[#0a1628]"
              >
                ← All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
