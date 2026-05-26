import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const FIELDS = [
  ['Renewable Energy', 'Driving sustainability through smart energy systems and resource optimization.'],
  ['Artificial Intelligence', 'Developing adaptive algorithms and machine learning solutions for modern industries.'],
  ['Advanced Materials', 'Exploring high-performance composites, alloys, and sustainable alternatives.'],
  ['3D Modeling & Manufacturing', 'Integrating precision design with real-world production capabilities.'],
];

const TOOLS: { href: string; title: string; body: string }[] = [
  {
    href: '/tutor',
    title: 'STAR Labs Tutor',
    body:
      'An AI study partner with discipline-specific personalities for medicine, engineering, and business students. Ask questions, work through problems, and learn at your own pace.',
  },
  {
    href: '/modeler',
    title: 'STAR Labs Modeler',
    body:
      'Turn photos into 3D-printable objects — bookmarks, keychains, vases, and more — generated locally in your browser and downloadable as STL files.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
                STAR Labs — Saudi Arabia
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
                Advancement
                <br />
                for all,
                <br />
                <em className="text-[#0a1628] not-italic">at the frontier</em>
                <br />
                of the future.
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl mb-10">
                Pioneering innovation across renewable energy, AI, advanced materials, and digital
                manufacturing.
              </p>
              <Link
                href="/support"
                className="inline-block px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                Get in touch
              </Link>
            </div>
            <div className="flex lg:justify-end">
              <Image
                src="/star-labs-logo.png"
                alt="STAR Labs"
                width={500}
                height={200}
                priority
                className="w-full max-w-xs lg:max-w-sm h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                About
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-black leading-tight">
                A Saudi consultancy and development lab building the foundation for tomorrow's
                technologies.
              </h2>
            </div>
            <div className="space-y-5 text-neutral-700 text-lg leading-relaxed">
              <p>
                STAR Labs is a Saudi-based consultancy and development lab focused on building the
                foundation for tomorrow's technologies. We bridge visionary ideas and practical
                engineering — a hub for future innovation and research.
              </p>
              <p>
                Our mission is to empower industries through intelligent design, sustainable
                solutions, and technological excellence. By learning from the successes and
                limitations of past institutions, STAR Labs redefines how innovation is discovered,
                shared, and scaled.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl text-black">Fields of expertise</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {FIELDS.length} disciplines
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            {FIELDS.map(([title, body]) => (
              <div key={title} className="bg-white p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Discipline
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                Our Tools
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-black leading-tight">
                Built in-house. Free to use.
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {TOOLS.length} live
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col text-left"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Tool
                  </div>
                  <span className="font-mono text-[10px] text-[#0a1628] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-black mb-3">{tool.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm flex-1">{tool.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
              Vision
            </div>
            <p className="font-serif text-3xl lg:text-4xl text-black leading-tight mb-10">
              Innovation should be accessible, impactful, and collaborative — uniting research,
              creativity, and engineering to shape a future where technology advances humanity as a
              whole.
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
