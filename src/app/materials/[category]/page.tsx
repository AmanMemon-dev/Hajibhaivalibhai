import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { inspiration } from '@/data/inspiration';
import { PageHero } from '@/components/layout/PageHero';
import { Catalogue } from '@/components/filters/Catalogue';
import { Faq } from '@/components/home/Sections';
import { Swatch } from '@/components/ui/Swatch';
import { Button, Chip } from '@/components/ui';
import { business } from '@/lib/business';

export function generateStaticParams() { return categories.map((c) => ({ category: c.slug })); }
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = categories.find((x) => x.slug === params.category); if (!c) return {};
  return { title: `${c.name} — Types, Uses & Buying Guide`, description: `${c.tagline} ${c.intro}`.slice(0, 160), alternates: { canonical: `/materials/${c.slug}/` } };
}
export default function Page({ params }: { params: { category: string } }) {
  const c = categories.find((x) => x.slug === params.category); if (!c) notFound();
  const prods = products.filter((p) => p.categorySlug === c.slug);
  const spec = prods[0]?.specifications ?? {};
  const insp = inspiration.filter((s) => s.used.some((u) => prods.some((p) => p.slug === u.productSlug))).slice(0, 3);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Materials', '/materials/'], [c.name, `/materials/${c.slug}/`]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: business.site + u })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];
  return (<>
    <PageHero eyebrow={c.group} title={c.name} intro={c.tagline} crumbs={[{ label: 'Home', href: '/' }, { label: 'Materials', href: '/materials/' }, { label: c.name }]}>
      <div className="mt-8 flex flex-wrap gap-3"><Button href="#products">Browse {prods.length} products</Button><Button variant="ghost" href="/quote/">Request a quote</Button></div>
    </PageHero>
    <div className="container-x"><div className="relative aspect-[21/8] overflow-hidden rounded"><Swatch swatch={c.swatch} seed={3} className="h-full w-full object-cover" label={`${c.name} texture`} /></div></div>
    <section className="container-x py-16 grid md:grid-cols-[1.2fr_1fr] gap-12"><div><h2 className="text-step-2">About {c.name.toLowerCase()}</h2><p className="mt-4 text-muted text-step-0 max-w-xl">{c.intro}</p></div><ul className="grid grid-cols-2 gap-3 content-start">{c.characteristics.map((x) => <li key={x} className="border hairline rounded p-4 text-sm bg-surface">{x}</li>)}</ul></section>
    <section className="container-x pb-16"><h2 className="text-step-2 mb-6">Material types</h2><div className="grid sm:grid-cols-3 gap-4">{c.types.map((t) => <div key={t.name} className="border hairline rounded-lg p-6 bg-surface"><h3 className="font-display text-2xl">{t.name}</h3><p className="text-sm text-muted mt-2">{t.note}</p></div>)}</div><div className="mt-8"><p className="eyebrow mb-3">Typical applications</p><div className="flex flex-wrap gap-2">{c.applications.map((a) => <Chip key={a}>{a}</Chip>)}</div></div></section>
    <section className="container-x pb-12" id="products"><h2 className="text-step-2 mb-8">Products</h2><Catalogue categorySlug={c.slug} /></section>
    {insp.length > 0 && <section className="container-x py-12"><h2 className="text-step-2 mb-6">In real spaces</h2><div className="grid sm:grid-cols-3 gap-4">{insp.map((s) => <Link key={s.slug} href={`/inspiration/${s.slug}/`} className="group"><div className="aspect-[4/3] overflow-hidden rounded"><Swatch swatch={s.swatch} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div><p className="mt-2 font-display text-xl">{s.title}</p></Link>)}</div></section>}
    <section className="container-x py-12 grid md:grid-cols-2 gap-12"><div><h2 className="text-step-2 mb-5">Typical specifications</h2><dl className="divide-y hairline border-y hairline">{Object.entries(spec).filter(([k]) => !['Finish', 'Colour'].includes(k)).map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl><p className="hint mt-2">Indicative — confirm on the product datasheet.</p></div>
      <div><h2 className="text-step-2 mb-5">Buying guide</h2><ol className="space-y-4">{c.buyingGuide.map((g, i) => <li key={i} className="flex gap-4"><span className="font-display text-2xl text-accent w-8">{i + 1}</span><span className="text-muted">{g}</span></li>)}</ol></div></section>
    <section className="container-x py-12 grid lg:grid-cols-[1fr_1.4fr] gap-12"><h2 className="text-step-2">Frequently asked</h2><Faq items={c.faqs} /></section>
    <section className="container-x py-12"><div className="rounded-xl bg-[#111315] text-[#f2eee6] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h2 className="text-step-3">Need help choosing {c.name.toLowerCase()}?</h2><p className="text-white/70 mt-2">Send us your project and we’ll recommend options.</p></div><div className="flex gap-3 flex-wrap"><Button href="/quote/">Request quote</Button><Button href="/visualize/" variant="ghost" className="!border-white/30 !text-white">Visualize</Button></div></div></section>
    {ld.map((l, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(l) }} />)}
  </>);
}
