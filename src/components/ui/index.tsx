'use client';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BtnProps = { variant?: 'primary' | 'ghost' | 'link' | 'dark'; size?: 'md' | 'sm' | 'lg'; href?: string; external?: boolean; children: ReactNode; className?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
export function Button({ variant = 'primary', size = 'md', href, external, children, className, ...rest }: BtnProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 select-none whitespace-nowrap rounded-sm disabled:opacity-50 disabled:pointer-events-none';
  const sizes = { sm: 'min-h-[40px] px-4 text-sm', md: 'min-h-[48px] px-6 text-[0.95rem]', lg: 'min-h-[56px] px-8 text-base' };
  const v = {
    primary: 'bg-accent text-accent-ink hover:bg-ink hover:text-bg',
    dark: 'bg-ink text-bg hover:bg-bg hover:text-ink',
    ghost: 'border border-ink/30 hover:border-ink hover:bg-ink hover:text-bg text-ink',
    link: 'underline-offset-4 hover:underline text-ink px-0 min-h-0',
  }[variant];
  const cls = cn(base, variant === 'link' ? '' : sizes[size], v, className);
  if (href) return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
/** Modern arrow (up-right) as inline SVG; inherits colour and scales with font-size. */
export const Arrow = ({ className = '' }: { className?: string }) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" aria-hidden className={cn('inline-block shrink-0', className)}><path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" /></svg>;
export const Badge = ({ children, className }: { children: ReactNode; className?: string }) => <span className={cn('inline-flex items-center rounded-sm border hairline px-2 py-0.5 font-mono text-[0.68rem] uppercase text-muted', className)}>{children}</span>;
export const Chip = ({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: ReactNode }) => (
  <button type="button" onClick={onClick} aria-pressed={active} className={cn('min-h-[40px] px-4 rounded-sm text-sm border transition-colors', active ? 'bg-ink text-bg border-ink' : 'hairline hover:border-ink')}>{children}</button>
);
export function SectionHead({ eyebrow, title, intro, action }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
      <div className="max-w-2xl">{eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}<h2 className="text-step-3">{title}</h2>{intro && <p className="mt-4 text-muted text-step-0 max-w-xl">{intro}</p>}</div>
      {action}
    </div>
  );
}
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted"><ol className="flex flex-wrap gap-x-2 gap-y-1">
      {items.map((it, i) => <li key={i} className="flex gap-2">{it.href ? <Link href={it.href} className="hover:text-ink">{it.label}</Link> : <span className="text-ink" aria-current="page">{it.label}</span>}{i < items.length - 1 && <span aria-hidden>/</span>}</li>)}
    </ol></nav>
  );
}
/** Accessible drawer (right) / bottom sheet (mobile) with focus trap + Esc. */
export function Drawer({ open, onClose, title, children, side = 'right', footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; side?: 'right' | 'left'; footer?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'Tab' && ref.current) { const f = ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'); if (!f.length) return; const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } };
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden';
    setTimeout(() => ref.current?.querySelector<HTMLElement>('button')?.focus(), 50);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.(); };
  }, [open, onClose]);
  return (
    <AnimatePresence>{open && (
      <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={title}>
        <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div ref={ref} className={cn('absolute bg-bg shadow-3 flex flex-col max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[88dvh] max-md:rounded-t-xl md:top-0 md:h-full md:w-[460px]', side === 'right' ? 'md:right-0' : 'md:left-0')}
          initial={{ y: 40, x: side === 'right' ? 40 : -40, opacity: 0 }} animate={{ y: 0, x: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center justify-between p-5 border-b hairline"><h2 className="font-display text-2xl">{title}</h2><button onClick={onClose} aria-label="Close" className="h-12 w-12 -mr-2 grid place-items-center rounded hover:bg-ink/5 text-xl">✕</button></div>
          <div className="flex-1 overflow-y-auto p-5">{children}</div>
          {footer && <div className="p-5 border-t hairline">{footer}</div>}
        </motion.div>
      </div>
    )}</AnimatePresence>
  );
}
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; }; }, [open, onClose]);
  return (
    <AnimatePresence>{open && (
      <div className="fixed inset-0 z-[80] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={title}>
        <motion.div className="absolute inset-0 bg-black/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div className={cn('relative bg-bg rounded-lg shadow-3 w-full max-h-[90dvh] overflow-y-auto', wide ? 'max-w-5xl' : 'max-w-xl')} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}>
          <div className="sticky top-0 bg-bg flex items-center justify-between p-5 border-b hairline z-10"><h2 className="font-display text-2xl">{title}</h2><button onClick={onClose} aria-label="Close" className="h-12 w-12 -mr-2 grid place-items-center rounded hover:bg-ink/5 text-xl">✕</button></div>
          <div className="p-5 md:p-8">{children}</div>
        </motion.div>
      </div>
    )}</AnimatePresence>
  );
}
export const Skeleton = ({ className }: { className?: string }) => <div className={cn('skeleton rounded', className)} aria-hidden />;
export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="lbl">{label}</span>{children}{error ? <span role="alert" className="block text-xs text-red-600 mt-1">{error}</span> : hint ? <span className="hint block">{hint}</span> : null}</label>;
}
