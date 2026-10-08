'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useUI } from '@/store';
import { megaColumns } from './megaData';
import { Button } from '@/components/ui';
import { useT } from '@/i18n';
import { AnimatePresence, motion } from 'framer-motion';

export function MobileMenu() {
  const { menu, open } = useUI(); const t = useT(); const [mat, setMat] = useState(false);
  const links = [['/visualize/', t('nav.visualize')], ['/estimator/', 'Building Estimator'], ['/inspiration/', t('nav.inspiration')], ['/tools/', 'Calculators'], ['/learn/', 'Guides'], ['/trade/', 'Trade & Dealers'], ['/about/', t('nav.about')], ['/contact/', t('nav.contact')]] as const;
  return (
    <AnimatePresence>{menu && (
      <motion.div className="fixed inset-0 z-[90] bg-bg xl:hidden flex flex-col" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="flex items-center justify-between h-16 px-4 border-b hairline"><span className="font-display text-xl">HAJIBHAI VALIBHAI</span><button onClick={() => open('menu', false)} className="h-12 w-12 grid place-items-center text-xl" aria-label="Close menu">✕</button></div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <Link href="/" className="block py-3 font-display text-3xl">{t('nav.home')}</Link>
          <button className="w-full flex justify-between items-center py-3 font-display text-3xl" aria-expanded={mat} onClick={() => setMat(!mat)}>{t('nav.materials')}<span>{mat ? '−' : '+'}</span></button>
          {mat && <div className="pb-4 grid grid-cols-2 gap-x-4 gap-y-1">{megaColumns.flatMap((c) => c.cats).map((c) => <Link key={c.slug} href={`/materials/${c.slug}/`} className="py-3 text-sm min-h-[48px] flex items-center border-b hairline">{c.name}</Link>)}<Link href="/materials/" className="py-3 text-sm text-accent col-span-2">All materials →</Link></div>}
          {links.map(([h, l]) => <Link key={h} href={h} className="block py-3 font-display text-3xl">{l}</Link>)}
        </div>
        <div className="p-4 border-t hairline flex items-center gap-3"><Button href="/quote/" className="flex-1">{t('cta.quote')}</Button></div>
      </motion.div>
    )}</AnimatePresence>
  );
}
