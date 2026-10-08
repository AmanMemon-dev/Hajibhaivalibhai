import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { QuoteFlow } from '@/components/quote/QuoteFlow';
export const metadata: Metadata = { title: 'Request a Quote', description: 'Send your material list and project details. No payment — we respond with a tailored quote.' };
export default function Page() { return (<><PageHero eyebrow="Request a quote" title="Tell us what you’re building." intro="Three short steps. No payment, no obligation." /><div className="container-x pb-8"><QuoteFlow /></div></>); }
