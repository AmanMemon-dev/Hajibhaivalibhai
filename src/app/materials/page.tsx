import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Catalogue } from '@/components/filters/Catalogue';
import { categories, categoryGroups } from '@/data/categories';
import Link from 'next/link';
import { Swatch } from '@/components/ui/Swatch';
export const metadata: Metadata = { title: 'All Materials', description: 'Browse cement, aggregates, sand, bricks, granite, marble, tiles, steel, aluminium, plumbing, sanitaryware and paints. Filter by colour, finish, application and style.' };
export default function Page() {
  return (<>
    <PageHero eyebrow="Material library" title="Every material, one catalogue." intro="Filter by category, colour, finish, application and style. Add to your project list or request one quote." crumbs={[{ label: 'Home', href: '/' }, { label: 'Materials' }]} />
    <section className="container-x pb-10"><div className="space-y-8">{categoryGroups.map((g) => <div key={g}><p className="eyebrow mb-3">{g}</p><div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">{categories.filter((c) => c.group === g).map((c) => <Link key={c.slug} href={`/materials/${c.slug}/`} className="shrink-0 w-44 group"><Swatch swatch={c.swatch} className="h-24 w-full rounded-sm object-cover group-hover:opacity-90" /><p className="mt-2 text-sm font-medium group-hover:text-accent">{c.name}</p></Link>)}</div></div>)}</div></section>
    <section className="container-x pb-8 pt-8"><Catalogue /></section>
  </>);
}
