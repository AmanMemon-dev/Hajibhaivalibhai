'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useUI } from '@/store';
import { business, waLink } from '@/lib/business';
import { usePathname } from 'next/navigation';

export function ScrollProgress() { const { scrollYProgress } = useScroll(); const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 }); return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]" style={{ scaleX: x }} aria-hidden />; }

export function FloatingActions() {
  const [top, setTop] = useState(false); const path = usePathname();
  useEffect(() => { const f = () => setTop(window.scrollY > 800); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  const msg = path.startsWith('/materials/') && path.split('/').filter(Boolean).length > 2 ? `Hi, I am interested in the product on this page: ${typeof window !== 'undefined' ? window.location.href : ''}` : 'Hi, I would like to know more about your materials.';
  return (
    <div className="floating fixed right-4 bottom-24 lg:bottom-6 z-40 flex flex-col gap-3 items-end">
      {top && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="h-12 w-12 rounded-full glass shadow-2 grid place-items-center">↑</button>}
      <a href={`tel:${business.phone.replace(/\s/g, '')}`} aria-label="Call us" className="h-12 w-12 rounded-full bg-ink text-bg shadow-2 grid place-items-center">✆</a>
      <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-3 grid place-items-center text-2xl hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.900 11.900 0 0 0 4.600 4.100c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z" /></svg></a>
    </div>
  );
}
export function MobileBar() {
  const path = usePathname();
  const item = 'flex-1 min-h-[56px] flex flex-col items-center justify-center text-[11px] gap-0.5';
  const on = (h: string) => (path.startsWith(h) ? 'text-accent' : '');
  return (
    <nav className="lg:hidden floating fixed bottom-0 inset-x-0 z-40 glass border-t hairline flex pb-[env(safe-area-inset-bottom)]" aria-label="Quick navigation">
      <Link href="/materials/" className={`${item} ${on('/materials')}`}><span aria-hidden className="text-lg">▦</span>Explore</Link>
      <Link href="/visualize/" className={`${item} ${on('/visualize')}`}><span aria-hidden className="text-lg">◫</span>Visualize</Link>
      <Link href="/quote/" className={`${item} ${on('/quote')}`}><span aria-hidden className="text-lg">✎</span>Quote</Link>
      <a href={waLink('Hi, I would like to know more about your materials.')} target="_blank" rel="noopener noreferrer" className={item}><span aria-hidden className="text-lg">✉</span>WhatsApp</a>
    </nav>
  );
}
export function Toast() { const t = useUI((s) => s.toast); return t ? <div role="status" className="fixed left-1/2 -translate-x-1/2 bottom-24 lg:bottom-8 z-[95] bg-ink text-bg px-5 py-3 rounded shadow-3 text-sm max-w-[90vw]">{t}</div> : null; }
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem('hv-cookie')) setShow(true); } catch {} }, []);
  if (!show) return null;
  const set = (v: string) => { try { localStorage.setItem('hv-cookie', v); } catch {} setShow(false); };
  return <div role="dialog" aria-label="Cookie notice" className="fixed left-4 right-4 md:right-auto md:max-w-md bottom-24 lg:bottom-6 z-[70] glass rounded-lg p-5 shadow-3"><p className="text-sm">We use essential storage for your selection and preferences, and optional analytics if enabled. See our <Link href="/privacy/" className="underline">Privacy Policy</Link>.</p><div className="mt-4 flex gap-3"><button onClick={() => set('all')} className="min-h-[44px] px-5 bg-ink text-bg rounded text-sm">Accept</button><button onClick={() => set('essential')} className="min-h-[44px] px-5 border border-ink/25 rounded text-sm">Essential only</button></div></div>;
}
