'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { megaColumns } from './megaData';
import { Swatch } from '@/components/ui/Swatch';
import { Button, Arrow } from '@/components/ui';
import { useSelection, useUI } from '@/store';
import { useT } from '@/i18n';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useT(); const path = usePathname(); const [mega, setMega] = useState(false); const [scrolled, setScrolled] = useState(false);
  const open = useUI((s) => s.open); const selCount = useSelection((s) => s.items.length);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setMega(false); open('menu', false); }, [path, open]);
  const nav = [['/', t('nav.home')], ['/visualize/', t('nav.visualize')], ['/estimator/', 'Estimator'], ['/inspiration/', t('nav.inspiration')], ['/about/', t('nav.about')], ['/contact/', t('nav.contact')]] as const;
  const item = 'px-3 py-2 text-[0.88rem] font-medium text-ink/70 hover:text-ink transition-colors'; const on = '!text-ink underline decoration-accent decoration-2 underline-offset-[10px]';
  const active = (h: string) => (h === '/' ? path === '/' : path.startsWith(h));
  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', 'bg-bg/95 backdrop-blur border-b hairline')} onMouseLeave={() => setMega(false)}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] bg-ink text-bg px-4 py-2 rounded">Skip to content</a>
      <div className="container-x flex items-center justify-between h-16 md:h-20 gap-4">
        <Link href="/" className="flex flex-col leading-none shrink-0" aria-label="Hajibhai Valibhai — home">
          <span className="font-display font-bold text-[1.05rem] min-[400px]:text-xl md:text-[1.35rem] tracking-[-0.02em] whitespace-nowrap">HAJIBHAI VALIBHAI</span>
          <span className="hidden md:block font-mono text-[0.6rem] uppercase text-muted mt-1.5">Building materials / Surfaces</span>
        </Link>
        <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
          {nav.slice(0, 1).map(([h, l]) => <Link key={h} href={h} className={cn(item, active(h) && on)}>{l}</Link>)}
          <button className={cn(item, 'flex items-center gap-1', (mega || path.startsWith('/materials')) && on)} aria-expanded={mega} aria-haspopup="true" onMouseEnter={() => setMega(true)} onFocus={() => setMega(true)} onClick={() => setMega((m) => !m)}>{t('nav.materials')} <span aria-hidden className="text-[9px]">▾</span></button>
          {nav.slice(1).map(([h, l]) => <Link key={h} href={h} className={cn(item, active(h) && on)}>{l}</Link>)}
        </nav>
        <div className="flex items-center gap-0.5 md:gap-1">
          <button onClick={() => open('selection')} className="h-11 px-3 inline-flex items-center gap-2 font-mono text-xs uppercase hover:text-accent" aria-label={`My Selection (${selCount})`}>Selection<span className="min-w-[20px] h-5 px-1 grid place-items-center bg-ink text-bg text-[10px]">{selCount}</span></button>
          <Button href="/quote/" size="sm" className="hidden md:inline-flex ml-1">{t('cta.quote')}</Button>
          <button onClick={() => open('menu')} className="xl:hidden h-11 w-11 grid place-items-center text-xl" aria-label="Open menu">≡</button>
        </div>
      </div>
      <AnimatePresence>{mega && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="hidden xl:block absolute inset-x-0 top-full bg-bg border-b hairline" onMouseEnter={() => setMega(true)}>
          <div className="container-x py-10 grid grid-cols-5 gap-8">
            {megaColumns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-3">{col.cats.map((c) => (
                  <li key={c.slug}><Link href={`/materials/${c.slug}/`} className="group flex items-center gap-3"><Swatch swatch={c.swatch} className="h-11 w-11 shrink-0 object-cover" /><span><span className="block text-sm font-medium group-hover:text-accent">{c.name}</span><span className="block text-xs text-muted line-clamp-1">{c.tagline.split('.')[0]}</span></span></Link></li>
                ))}</ul>
              </div>
            ))}
          </div>
          <div className="container-x pb-6 flex gap-6 text-sm"><Link href="/materials/" className="text-accent hover:underline">All materials <Arrow /></Link><Link href="/estimator/" className="hover:underline">Material estimator <Arrow /></Link></div>
        </motion.div>
      )}</AnimatePresence>
    </header>
  );
}
