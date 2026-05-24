import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'Support — STAR Labs',
  description: 'Contact STAR Labs for all inquiries, collaborations, or service requests.',
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-6">
            Support
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl text-black leading-[0.95] mb-8 max-w-4xl">
            Let's <em className="text-[#0a1628] not-italic">talk</em>.
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">
            For all inquiries, collaborations, or service requests, reach out by email. We aim to
            respond within 1–2 business days.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                Email
              </div>
              <a
                href="mailto:starlabs.ksa@gmail.com"
                className="font-serif text-2xl lg:text-3xl text-black hover:text-[#0a1628] transition-colors break-all"
              >
                starlabs.ksa@gmail.com
              </a>
              <p className="text-neutral-600 text-sm mt-4 leading-relaxed">
                The fastest way to reach us. Include your project context, files, and any deadlines.
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] mb-4">
                Inquiries we welcome
              </div>
              <ul className="space-y-3 text-neutral-700">
                <li className="pl-4 relative">
                  <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                  3D modeling and CAD consultancy requests
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                  Rapid prototyping and printing quotes
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                  Research and collaboration proposals
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                  Partnership and contractor opportunities
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 top-3 w-2 h-px bg-[#0a1628]" />
                  Press, speaking, and media requests
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
