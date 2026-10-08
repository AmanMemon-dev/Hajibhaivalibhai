'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Mounts children only once the element is near the viewport (keeps Three.js off first paint). */
export function LazyMount({ children, className, rootMargin = '300px', fallback }: { children: (visible: boolean) => ReactNode; className?: string; rootMargin?: string; fallback?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null); const [mounted, setMounted] = useState(false); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); if (e.isIntersecting) setMounted(true); }, { rootMargin });
    io.observe(el); return () => io.disconnect();
  }, [rootMargin]);
  return <div ref={ref} className={className}>{mounted ? children(inView) : fallback}</div>;
}

export function Loader({ label = 'Loading 3D…' }: { label?: string }) {
  const [pct, setPct] = useState(8);
  useEffect(() => { const t = setInterval(() => setPct((p) => Math.min(p + Math.random() * 14, 92)), 220); return () => clearInterval(t); }, []);
  return <div className="absolute inset-0 grid place-items-center bg-stone/60 backdrop-blur-sm z-10" role="status"><div className="w-56 text-center"><p className="text-sm text-muted mb-3">{label} {Math.round(pct)}%</p><div className="h-[2px] bg-line"><div className="h-full bg-accent transition-all duration-200" style={{ width: `${pct}%` }} /></div></div></div>;
}
