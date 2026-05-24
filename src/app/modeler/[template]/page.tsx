import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTemplate, listTemplates } from '@/lib/modeler/templates';
import ModelerStudio from '@/components/modeler/ModelerStudio';
import SiteHeader from '@/components/SiteHeader';

export function generateStaticParams() {
  return listTemplates().map((t) => ({ template: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  const t = getTemplate(template);
  if (!t) return { title: 'Template not found — STAR Labs Modeler' };
  return {
    title: `${t.name} — STAR Labs Modeler`,
    description: t.tagline,
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  const t = getTemplate(template);
  if (!t) notFound();

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <div className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <Link
            href="/modeler"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0a1628] hover:underline"
          >
            ← All templates
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Modeler / {t.id}
          </div>
        </div>
      </div>
      <ModelerStudio template={t} />
    </main>
  );
}
