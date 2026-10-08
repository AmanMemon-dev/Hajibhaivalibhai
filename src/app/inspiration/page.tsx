import type { Metadata } from 'next';
import Link from 'next/link';
import { inspiration } from '@/data/inspiration';
import { Swatch } from '@/components/ui/Swatch';
import { PageHero } from '@/components/layout/PageHero';
export const metadata: Metadata = { title: 'Materials in Real Spaces', description: 'Living rooms, kitchens, bathrooms, exteriors and commercial spaces — with the exact materials used in each.' };
export default function Page() {
  return (<><PageHero eyebrow="Inspiration" title="Materials in real spaces." intro="Open any space to see the floor, wall, counter and sanitary materials used — each linked to its product." crumbs={[{ label: 'Home', href: '/' }, { label: 'Inspiration' }]} />
    <div className="container-x pb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{inspiration.map((s, i) => <Link key={s.slug} href={`/inspiration/${s.slug}/`} className={`group block ${i % 5 === 0 ? 'lg:row-span-2' : ''}`}><div className={`overflow-hidden rounded relative ${i % 5 === 0 ? 'aspect-[4/5] lg:h-[calc(100%-5rem)] lg:aspect-auto' : 'aspect-[4/3]'}`}><Swatch swatch={s.swatch} seed={i + 4} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div><p className="mt-3 text-xs text-muted uppercase tracking-wider">{s.type}</p><h2 className="font-display text-2xl group-hover:text-accent">{s.title}</h2></Link>)}</div></>);
}
