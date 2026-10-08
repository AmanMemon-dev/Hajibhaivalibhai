import Link from 'next/link';
import { business, waLink } from '@/lib/business';
import { categories } from '@/data/categories';
import { Newsletter } from './Newsletter';

export function Footer() {
  const col = (title: string, links: [string, string][]) => (
    <div><p className="eyebrow mb-4">{title}</p><ul className="space-y-2.5 text-sm">{links.map(([l, h]) => <li key={h + l}><Link href={h} className="text-muted hover:text-ink">{l}</Link></li>)}</ul></div>
  );
  return (
    <footer className="bg-ink text-[#f2f2ee] [--muted:200_200_200] [&_.text-muted]:text-[rgb(170,170,170)] [&_.text-muted:hover]:text-white">
      <div className="container-x py-16 md:py-20 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2.6fr]">
        <div>
          <p className="font-display font-bold text-2xl sm:text-3xl tracking-[-0.02em]">HAJIBHAI VALIBHAI</p>
          <p className="mt-3 max-w-sm text-[rgb(190,190,190)]">{business.tagline}</p>
          <address className="not-italic mt-6 text-sm text-[rgb(170,170,170)] space-y-1">
            <p>{business.address}</p><p>{business.hours}</p><p><a className="hover:text-white" href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a> · <a className="hover:text-white" href={`mailto:${business.email}`}>{business.email}</a></p>
          </address>
          <div className="mt-6 flex flex-wrap gap-3"><a href="/quote/" className="min-h-[48px] px-6 inline-flex items-center bg-accent text-accent-ink rounded font-medium">Request Quote</a><a href={waLink('Hi, I would like to know more about your materials.')} target="_blank" rel="noopener noreferrer" className="min-h-[48px] px-6 inline-flex items-center border border-white/30 rounded hover:bg-white/10">WhatsApp</a></div>
          <Newsletter />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {col('Materials', categories.slice(0, 7).map((c) => [c.name, `/materials/${c.slug}/`]))}
          {col('More materials', [...categories.slice(7).map((c) => [c.name, `/materials/${c.slug}/`] as [string, string]), ['All materials', '/materials/']])}
          {col('Explore', [['Visualize', '/visualize/'], ['Building Estimator', '/estimator/'], ['Calculators', '/tools/'], ['Inspiration', '/inspiration/'], ['Guides', '/learn/']])}
          {col('Company', [['About', '/about/'], ['Contact & Store', '/contact/'], ['Trade & Dealers', '/trade/'], ['Request Quote', '/quote/'], ['Privacy', '/privacy/'], ['Terms', '/terms/']])}
        </div>
      </div>
      <div className="border-t border-white/10"><div className="container-x py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-[rgb(150,150,150)]">
        <p>© {new Date().getFullYear()} Hajibhai Valibhai. All rights reserved.</p>
        <p className="flex gap-4">{business.social.map((s) => <a key={s.name} href={s.href} className="hover:text-white" rel="noopener noreferrer">{s.name}</a>)}</p></div></div>
    <div className="overflow-hidden border-t border-white/10" aria-hidden><p className="container-x font-display font-bold leading-[0.8] tracking-[-0.05em] text-white/[0.06] text-[clamp(3rem,15vw,15rem)] whitespace-nowrap pt-6 pb-2">HAJIBHAI VALIBHAI</p></div>
    </footer>
  );
}
