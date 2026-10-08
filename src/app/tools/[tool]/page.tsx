import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/PageHero';
import { Calculators } from '@/components/projects/Calculators';
const tools = { tile: 'Tile quantity calculator', cement: 'Concrete & cement calculator', sand: 'Plaster & sand calculator', paint: 'Paint calculator', steel: 'Steel weight calculator' } as const;
export const generateStaticParams = () => Object.keys(tools).map((tool) => ({ tool }));
export function generateMetadata({ params }: { params: { tool: keyof typeof tools } }): Metadata { return tools[params.tool] ? { title: tools[params.tool], description: `${tools[params.tool]} with standard Indian construction norms.` } : {}; }
export default function Page({ params }: { params: { tool: keyof typeof tools } }) {
  if (!tools[params.tool]) notFound();
  return (<><PageHero eyebrow="Calculator" title={tools[params.tool]} crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/tools/' }, { label: tools[params.tool] }]} /><Calculators initial={params.tool} /></>);
}
