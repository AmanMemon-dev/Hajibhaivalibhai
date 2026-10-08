'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, Arrow } from '@/components/ui';
import { Swatch } from '@/components/ui/Swatch';

const lines = ['Materials', 'for buildings', 'that last'];
const quick = ['Marble', 'Granite', 'Tiles', 'Steel', 'Cement'];

/** Swatch tile for the bento board. */
function Tile({ href, label, n, swatch, seed, className }: { href: string; label: string; n: string; swatch: any; seed: number; className: string }) {
  return (
    <Link href={href} className={`group relative overflow-hidden ${className}`}>
      <Swatch swatch={swatch} seed={seed} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]" />
      <span className="absolute left-3 top-3 font-mono text-[0.68rem] text-white mix-blend-difference">{n}</span>
      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-bg text-ink opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"><Arrow className="text-lg" /></span>
      <span className="absolute left-3 bottom-3 bg-bg px-3 py-1.5 text-sm font-medium">{label}</span>
    </Link>
  );
}
/** Action tile (solid colour) for the bento board. */
function Action({ href, title, sub, tone, className }: { href: string; title: string; sub: string; tone: 'accent' | 'ink'; className: string }) {
  return (
    <Link href={href} className={`group relative flex flex-col justify-between p-4 md:p-5 transition-colors ${tone === 'accent' ? 'bg-accent text-white hover:bg-ink' : 'bg-ink text-white hover:bg-accent'} ${className}`}>
      <Arrow className="self-end text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      <span><span className="block font-mono text-[0.68rem] uppercase text-white/70">{sub}</span><span className="block font-display text-xl md:text-2xl font-semibold tracking-[-0.03em] leading-none mt-1.5">{title}</span></span>
    </Link>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 16 } as const, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } });
  return (
    <section aria-label="Introduction" className="border-b hairline">
      <div className="container-x grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 py-8 md:py-12 lg:min-h-[calc(100dvh-5rem)] lg:items-stretch">
        <div className="flex flex-col justify-between gap-10 py-2">
          <motion.p {...fade(0)} className="eyebrow">Building materials · Architectural surfaces</motion.p>
          <div>
            <h1 className="text-[clamp(2.2rem,0.5rem+4.6vw,5.4rem)] uppercase leading-[0.88] tracking-[-0.045em] font-bold">
              {lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]"><motion.span className="block" initial={reduce ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}>{l}{i === lines.length - 1 && <span className="text-accent">.</span>}</motion.span></span>
              ))}
            </h1>
            <motion.p {...fade(0.35)} className="mt-8 max-w-lg text-step-1 leading-snug text-muted">Stone, tiles, cement, steel, sanitaryware and more. Browse the range, try it in a 3D room, and get a quote for exactly what you need.</motion.p>
            <motion.div {...fade(0.45)} className="mt-9 flex flex-wrap gap-3"><Button href="/materials/" size="lg">Explore materials <Arrow /></Button><Button href="/visualize/" variant="ghost" size="lg">Visualize your space</Button></motion.div>
          </div>
          <motion.ul {...fade(0.55)} className="flex flex-wrap gap-x-5 gap-y-2 border-t hairline pt-5 font-mono text-xs uppercase text-muted">
            <li className="text-ink">Popular</li>{quick.map((q) => <li key={q}><Link href={`/materials/${q.toLowerCase()}/`} className="hover:text-accent">{q}</Link></li>)}
          </motion.ul>
        </div>

        <motion.div {...fade(0.2)} className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-2 md:gap-3 lg:h-full lg:min-h-[560px]">
          <Tile href="/materials/marble/" n="01" label="Marble" seed={4} swatch={{ base: '#ece8e0', accent: '#b9b2a5', pattern: 'veins' }} className="col-span-2 aspect-[4/3] lg:aspect-auto lg:row-span-3" />
          <Tile href="/materials/granite/" n="02" label="Granite" seed={5} swatch={{ base: '#2a2a2c', accent: '#8a8a90', pattern: 'speckle' }} className="col-span-2 aspect-[4/3] lg:aspect-auto lg:row-span-2" />
          <Tile href="/materials/tiles/" n="03" label="Tiles" seed={6} swatch={{ base: '#d8d2c6', accent: '#a39b8d', pattern: 'grid' }} className="aspect-square lg:aspect-auto lg:row-span-2" />
          <Tile href="/materials/steel/" n="04" label="Steel" seed={7} swatch={{ base: '#4a4f55', accent: '#9aa1a8', pattern: 'metal' }} className="aspect-square lg:aspect-auto" />
          <Action href="/visualize/" sub="3D visualizer" title="Try it in 3D" tone="accent" className="col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-4 min-h-[130px] lg:min-h-0" />
          <Action href="/estimator/" sub="Estimator" title="Estimate your house" tone="ink" className="col-span-2 lg:col-start-1 lg:row-start-4 min-h-[130px] lg:min-h-0" />
        </motion.div>
      </div>
    </section>
  );
}
