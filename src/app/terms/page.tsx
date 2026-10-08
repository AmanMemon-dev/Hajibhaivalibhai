import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
export const metadata: Metadata = { title: 'Terms of Use' };
export default function Page() { return (<><PageHero title="Terms of Use" intro="Template — have this reviewed by a legal professional before launch." /><div className="container-x pb-16 max-w-2xl space-y-5 text-muted">
  <p><b className="text-ink">Information only.</b> Product details, specifications, 3D previews and calculators are for guidance. Colours on screen differ from real materials; request samples before ordering.</p>
  <p><b className="text-ink">Estimates.</b> The estimator and calculators give planning-grade quantities from standard norms. They are not structural designs. Always confirm with a qualified engineer or architect and your local building by-laws.</p>
  <p><b className="text-ink">Quotes.</b> Quote requests are not orders. Prices and availability are confirmed by us in writing.</p></div></>); }
