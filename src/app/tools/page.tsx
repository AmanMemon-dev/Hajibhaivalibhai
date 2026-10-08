import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { Calculators } from '@/components/projects/Calculators';
export const metadata: Metadata = { title: 'Construction Calculators', description: 'Tile quantity, concrete and cement bags, plaster and sand, paint litres and steel weight calculators.' };
export default function Page() { return (<><PageHero eyebrow="Calculators" title="Quick calculators." intro="For a single task. Planning a whole building? Use the estimator." crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators' }]}><p className="mt-6"><Link href="/estimator/" className="text-accent underline underline-offset-4">Open the whole-building estimator →</Link> · <Link href="/tools/colour-finder/" className="underline underline-offset-4">Colour finder →</Link></p></PageHero><Calculators /></>); }
