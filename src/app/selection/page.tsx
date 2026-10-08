import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { SelectionPage } from '@/components/quote/SelectionPage';
export const metadata: Metadata = { title: 'My Selection', description: 'Your project material list, comparison and saved items.', robots: { index: false } };
export default function Page() { return (<><PageHero eyebrow="Project list" title="My Selection" intro="Everything you’ve shortlisted — ready for one combined quote." /><SelectionPage /></>); }
