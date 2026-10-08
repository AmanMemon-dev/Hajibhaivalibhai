import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
export const metadata: Metadata = { title: 'Privacy Policy' };
export default function Page() { return (<><PageHero title="Privacy Policy" intro="Template — have this reviewed by a legal professional before launch." /><div className="container-x pb-16 max-w-2xl space-y-5 text-muted">
  <p><b className="text-ink">What we store.</b> Your selection, comparison, wishlist, designs, estimator inputs and preferences are stored in your browser (localStorage) so the site works without an account. They are not sent to a server.</p>
  <p><b className="text-ink">Enquiries.</b> When you submit a quote or contact form, we use your name, phone, email and project details to respond. In this static build, submissions are kept on your device until a backend is connected.</p>
  <p><b className="text-ink">Analytics.</b> Optional analytics (GA4 / Meta Pixel) load only if configured by the site owner.</p>
  <p><b className="text-ink">Contact.</b> Questions about your data: see the Contact page.</p></div></>); }
