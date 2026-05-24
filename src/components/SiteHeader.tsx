import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/modeler', label: 'Modeler' },
  { href: '/rnd', label: 'R&D' },
  { href: '/support', label: 'Support' },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl lg:text-2xl text-black tracking-tight whitespace-nowrap">
          STAR Labs
        </Link>
        <nav className="flex items-center gap-5 lg:gap-8 flex-wrap justify-end">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-[#0a1628] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
