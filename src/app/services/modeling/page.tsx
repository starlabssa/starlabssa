import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: '3D Modeling Consultancy — STAR Labs',
  description:
    'Precision Autodesk-based CAD modeling for products, parts, and visualization. DFM for additive manufacturing and ready-to-print files.',
};

const OFFERINGS = [
  ['Parametric CAD', 'Editable Autodesk Fusion 360 or Inventor models with organized feature history.'],
  ['Assemblies', 'Constraints, motion studies, and alignment for real-world fit.'],
  ['Surface & Solid Modeling', 'Smooth aesthetic surfaces and precise engineering solids.'],
  ['DFM for Additive Manufacturing', 'Orientation, support planning, and wall-thickness optimization.'],
  ['Technical Drawings', 'Detailed 2D prints and assembly sheets for documentation.'],
  ['Tolerance & Fit', 'Slip-fit, press-fit, and clearance design for printed parts.'],
  ['Material Guidance', 'Plastics, resins, and composites suitable for FDM/SLA printers.'],
  ['Visualization', 'Exploded views, render setups, and client-ready presentation assets.'],
  ['Rapid Iteration', 'Quick turnaround updates based on test feedback or redesign goals.'],
  ['File Prep for Printing', 'Watertight meshes and export guidance for your printer profile.'],
];

const PROCESS = [
  ['01', 'Brief', 'We define your goals, functional needs, and target printer/material.'],
  ['02', 'Concept Alignment', 'Review sketches, references, or inspiration to set design intent.'],
  ['03', 'Modeling', 'Parametric modeling in Autodesk Fusion 360 or Inventor with continuous feedback.'],
  ['04', 'Verification', 'Geometry checks, tolerance validation, and export testing for your print setup.'],
  ['05', 'Delivery', 'Editable CAD, watertight STL/3MF files, and optional renders or drawings.'],
];

const WHY = [
  ['Manufacturing-Ready Design', 'Every model is validated for 3D printing and practical production constraints.'],
  ['Parametric Flexibility', 'Easily adjustable dimensions and controlled dependencies for quick revisions.'],
  ['Precision & Clarity', 'Clean feature trees, labeled sketches, and clear documentation for seamless handoff.'],
  ['Transparent Workflow', 'Regular previews, milestone reviews, and direct communication during design.'],
];

const DELIVERABLES = [
  'Autodesk Fusion 360 (.f3d) or Inventor (.ipt / .iam) files',
  'STEP (.step) and STL / 3MF exports ready for printing',
  '2D technical drawings (PDF/DWG)',
  'Exploded view and basic assembly notes',
  'Material and printer orientation recommendations',
  'Optional render images for client presentations',
  'Revision log with change notes and version control',
];

export default function ModelingService() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            Services / 3D Modeling
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            CAD modeling,
            <br />
            <em className="text-[#0a1628] not-italic">manufacturing-ready</em>.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            Turning ideas into accurate, manufacturable 3D models — fully built in Autodesk
            environments and optimized for additive manufacturing.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-black">What we offer</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {OFFERINGS.length} capabilities
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {OFFERINGS.map(([title, body]) => (
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
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">Why STAR Labs</h2>
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
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-12">Process</h2>
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

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-black mb-10">Deliverables</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 max-w-4xl">
            {DELIVERABLES.map((d) => (
              <li key={d} className="text-neutral-700 leading-relaxed pl-4 relative">
                <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
              Request a quotation
            </div>
            <p className="font-serif text-3xl lg:text-4xl text-black leading-tight mb-8">
              Send your references, sketches, and design requirements. We'll respond with a clear
              scope, cost, and estimated delivery timeline.
            </p>
            <a
              href="mailto:starlabs.ksa@gmail.com?subject=3D%20Modeling%20Quotation%20Request"
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
