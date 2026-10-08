import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { business, waLink } from '@/lib/business';
import { Button } from '@/components/ui';
export const metadata: Metadata = { title: 'Contact & Store Locator', description: 'Visit our showroom, call, WhatsApp or send an enquiry.' };
export default function Page() {
  return (<><PageHero eyebrow="Contact" title="Visit, call or message." crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
    <div className="container-x pb-16 grid lg:grid-cols-2 gap-12">
      <div className="space-y-8"><address className="not-italic space-y-3 text-step-0"><p className="eyebrow">Showroom & store</p><p className="font-display text-3xl">{business.name}</p><p className="text-muted">{business.address}</p><p className="text-muted">{business.hours}</p><p><a className="underline" href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a><br /><a className="underline" href={`mailto:${business.email}`}>{business.email}</a></p><p className="hint">All contact details are placeholders — set them in <code>src/lib/business.ts</code> or .env.</p></address>
        <div className="flex gap-3 flex-wrap"><Button href={waLink('Hi, I would like to know more about your materials.')} external>WhatsApp</Button><Button variant="ghost" href={`tel:${business.phone.replace(/\s/g, '')}`}>Call</Button><Button variant="ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`} external>Directions</Button></div>
        <div className="aspect-[4/3] rounded-lg border border-dashed hairline bg-stone grid place-items-center text-muted text-sm text-center p-6" role="img" aria-label="Map placeholder">Map embed placeholder<br />Add a Google Maps / OpenStreetMap iframe here.</div></div>
      <div><h2 className="text-step-2 mb-6">Send an enquiry</h2><ContactForm /></div></div></>);
}
