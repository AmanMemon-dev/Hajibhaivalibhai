'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/** Theme init, Lenis smooth scroll (disabled for reduced motion), service worker, analytics hooks. */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.1, smoothWheel: true,
      // let inner scroll areas (panels, drawers, menus) scroll natively with the wheel
      prevent: (node) => { if ((node as HTMLElement).tagName === 'CANVAS') return true; for (let el: HTMLElement | null = node as HTMLElement; el && el !== document.body; el = el.parentElement) { const o = getComputedStyle(el).overflowY; if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight) return true; } return false; },
    });
    let raf = 0; const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') navigator.serviceWorker.register('/sw.js').catch(() => {});
    const ga = process.env.NEXT_PUBLIC_GA4_ID;
    if (ga && !document.getElementById('ga4')) { const s = document.createElement('script'); s.id = 'ga4'; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`; document.head.appendChild(s); (window as any).dataLayer = (window as any).dataLayer || []; (window as any).gtag = function () { (window as any).dataLayer.push(arguments); }; (window as any).gtag('js', new Date()); (window as any).gtag('config', ga); }
  }, []);
  return <>{children}</>;
}
