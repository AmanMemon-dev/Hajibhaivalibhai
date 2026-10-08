import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ColourFinder } from '@/components/projects/ColourFinder';
export const metadata: Metadata = { title: 'Paint Colour Finder', description: 'Explore wall colour palettes by mood and try them on a 3D wall.' };
export default function Page() { return (<><PageHero eyebrow="Colour finder" title="Find your shade." intro="Pick a mood, preview the colour and try it on a wall in the 3D visualizer." crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators', href: '/tools/' }, { label: 'Colour finder' }]} /><ColourFinder /></>); }
