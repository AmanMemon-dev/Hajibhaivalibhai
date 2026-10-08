import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Estimator } from '@/components/projects/Estimator';
export const metadata: Metadata = { title: 'Material Estimator — Cement, Sand, Bricks, Steel, Tiles', description: 'Enter your house size and floors to estimate cement, sand, aggregate, steel, bricks, tiles and paint.' };
export default function Page() {
  return (<>
    <PageHero eyebrow="Material estimator" title="How much material does your house need?" intro="Answer four simple questions. Get cement, sand, aggregate, steel, bricks, tiles and paint — in seconds." crumbs={[{ label: 'Home', href: '/' }, { label: 'Estimator' }]} />
    <Estimator />
  </>);
}
