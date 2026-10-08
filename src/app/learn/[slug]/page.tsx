import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '@/data/posts';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui';
import { business } from '@/lib/business';
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const p = posts.find((x) => x.slug === params.slug); return p ? { title: p.title, description: p.excerpt, openGraph: { type: 'article', title: p.title, description: p.excerpt } } : {}; }
export default function Page({ params }: { params: { slug: string } }) {
  const p = posts.find((x) => x.slug === params.slug); if (!p) notFound();
  const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.excerpt, author: { '@type': 'Organization', name: business.name } };
  return (<><PageHero eyebrow={`${p.category} · ${p.readTime}`} title={p.title} intro={p.excerpt} crumbs={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/learn/' }, { label: p.title }]} />
    <article className="container-x pb-16"><div className="max-w-2xl space-y-6 text-step-0">{p.body.map((b, i) => <div key={i}>{b.h && <h2 className="text-step-2 mb-2">{b.h}</h2>}<p className="text-muted leading-relaxed">{b.p}</p></div>)}<div className="pt-6 flex gap-3 flex-wrap"><Button href="/materials/">Browse materials</Button><Button href="/estimator/" variant="ghost">Estimate quantities</Button></div></div></article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></>);
}
