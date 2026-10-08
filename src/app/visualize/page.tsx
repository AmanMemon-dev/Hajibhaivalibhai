import type { Metadata } from 'next';
import { ConfiguratorApp } from '@/components/configurator/ConfiguratorApp';
export const metadata: Metadata = { title: 'Visualize Your Space — 3D Material Configurator', description: 'Change floors, walls, countertops, fixtures and exteriors in a live 3D room. Save, share and request a quote for your design.' };
export default function Page() { return <><h1 className="sr-only">Visualize your space in 3D</h1><ConfiguratorApp /></>; }
