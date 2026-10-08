import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { inspiration } from '@/data/inspiration';
import { products } from '@/data/products';
import { Swatch } from '@/components/ui/Swatch';
import { PageHero } from '@/components/layout/PageHero';
import { Button, Arrow } from '@/components/ui';
export const generateStaticParams = () => inspiration.map((s) => ({ slug: s.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const s = inspiration.find((x) => x.slug === params.slug); return s ? { title: s.title, description: s.description } : {}; }
export default function Page({ params }: { params: { slug: string } }) {
  const s = inspiration.find((x) => x.slug === params.slug); if (!s) notFound();
  return (<><PageHero eyebrow={s.type} title={s.title} intro={s.description} crumbs={[{ label: 'Home', href: '/' }, { label: 'Inspiration', href: '/inspiration/' }, { label: s.title }]} />
    <div className="container-x pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-10"><div className="aspect-[4/3] rounded overflow-hidden"><Swatch swatch={s.swatch} seed={s.slug.length} className="h-full w-full object-cover" label={s.title} /></div>
      <div><h2 className="text-step-2">Materials used in this space</h2><ul className="mt-6 divide-y hairline border-y hairline">{s.used.map((u) => { const p = products.find((x) => x.slug === u.productSlug); return <li key={u.part}><Link href={p ? `/materials/${p.categorySlug}/${p.slug}/` : '/materials/'} className="flex items-center gap-4 py-4 group"><Swatch swatch={p?.swatch ?? s.swatch} className="h-14 w-14 rounded-sm shrink-0 object-cover" /><span className="flex-1"><span className="block text-xs uppercase tracking-wider text-muted">{u.part}</span><span className="block font-display text-xl group-hover:text-accent">{p?.name ?? '—'}</span></span><Arrow className="text-xl" /></Link></li>; })}</ul><div className="mt-8 flex gap-3 flex-wrap"><Button href="/visualize/">Recreate in 3D</Button><Button href="/quote/" variant="ghost">Request quote</Button></div></div></div></>);
}
