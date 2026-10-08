'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Reveal, Button, Skeleton, Arrow } from '@/components/ui';
import { Swatch } from '@/components/ui/Swatch';
import { homeCategories, homeFaq } from '@/data/site';
import { inspiration } from '@/data/inspiration';
import { LazyMount } from '@/components/3d/LazyMount';
import { hasWebGL, isLowPower } from '@/components/3d/capabilities';

const MaterialExplorer = dynamic(() => import('@/components/3d/MaterialExplorer'), { ssr: false, loading: () => <Skeleton className="aspect-[16/9] w-full" /> });

/** Material families as an editorial index: big names, hairline rows, swatch on the right. */
export function ExploreGrid() {
  return (
    <section className="container-x py-20 md:py-32" id="explore">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div><p className="eyebrow mb-4">Material index</p><h2 className="text-step-4">Everything a building is made of.</h2></div>
        <Button href="/materials/" variant="ghost">All materials <Arrow /></Button>
      </div>
      <ul className="border-t border-ink">
        {homeCategories.map((c, i) => (
          <li key={c.n} className="border-b hairline">
            <Link href={c.href} className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_9rem_2rem] items-center gap-x-4 gap-y-1 py-5 md:py-6 -mx-4 px-4 transition-colors hover:bg-ink hover:text-bg">
              <span className="font-mono text-xs text-muted group-hover:text-bg/60">{c.n}</span>
              <span className="font-display text-3xl md:text-5xl tracking-[-0.03em] font-semibold">{c.name}</span>
              <span className="hidden md:block text-sm text-muted group-hover:text-bg/70 max-w-sm">{c.desc}<span className="block font-mono text-[0.68rem] uppercase mt-1.5 opacity-70">{c.uses}</span></span>
              <Swatch swatch={c.swatch as any} seed={i + 2} className="h-14 w-20 md:h-16 md:w-36 object-cover justify-self-end transition-transform duration-500 group-hover:scale-[1.04]" />
              <Arrow className="hidden md:block text-2xl justify-self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function VisualizeTeaser() {
  const [ok, setOk] = useState(true);
  useEffect(() => setOk(hasWebGL() && !isLowPower()), []);
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#0c0c0d', color: '#fff',  ['--bg' as any]: '12 12 13', ['--surface' as any]: '24 24 26', ['--line' as any]: '58 58 62', ['--stone' as any]: '30 30 33', ['--ink' as any]: '244 244 240', ['--muted' as any]: '165 166 170' }}>
      <div className="container-x grid lg:grid-cols-[1fr_1.55fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="eyebrow mb-5 !text-white">3D visualizer</p>
          <h2 className="text-step-4 text-white">See it before you build it.</h2>
          <p className="mt-6 text-white/65 max-w-md text-step-0">Change floors, walls, counters and fixtures in a live 3D room or a full house, then send the exact material list to us.</p>
          <div className="mt-10"><Button href="/visualize/" size="lg">Open the visualizer <Arrow /></Button></div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs uppercase text-white/60 max-w-sm">{['Living room', 'Kitchen', 'Bathroom', 'Bedroom', 'Exterior'].map((x) => <dd key={x} className="border-t border-white/15 pt-2">{x}</dd>)}</dl>
        </div>
        <LazyMount fallback={<Skeleton className="aspect-[16/10] w-full" />}>{() => ok ? <MaterialExplorer /> : <div className="border border-white/15 p-10 text-center text-white/60">3D preview is off on this device.</div>}</LazyMount>
      </div>
    </section>
  );
}

export function EstimatorTeaser() {
  const items = ['Cement', 'Sand', 'Aggregate', 'Steel', 'Bricks', 'Tiles', 'Paint'];
  return (
    <section className="container-x py-20 md:py-32 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
      <div>
        <p className="eyebrow mb-5">Material estimator</p>
        <h2 className="text-step-4">Four questions. One complete list.</h2>
        <p className="mt-6 text-muted max-w-md text-step-0">Enter the size, floors and wall type of your house. Get the cement, sand, steel, bricks, tiles and paint you need, in seconds.</p>
        <div className="mt-10"><Button href="/estimator/" size="lg">Estimate my house <Arrow /></Button></div>
      </div>
      <ol className="border-t border-ink">{items.map((x, i) => <li key={x} className="flex items-baseline justify-between border-b hairline py-4"><span className="font-display text-2xl md:text-4xl font-semibold tracking-[-0.03em]">{x}</span><span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span></li>)}</ol>
    </section>
  );
}

export function InspirationPreview() {
  const [a, b, c] = inspiration;
  const tile = (s: typeof a, i: number, cls: string) => (
    <Reveal key={s.slug} delay={i * 0.06} className={cls}>
      <Link href={`/inspiration/${s.slug}/`} className="group block h-full">
        <div className="relative overflow-hidden h-[calc(100%-3.25rem)] min-h-[220px]"><Swatch swatch={s.swatch} seed={i + 9} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
        <div className="flex items-baseline justify-between pt-3"><h3 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3><span className="font-mono text-[0.68rem] uppercase text-muted">{s.type}</span></div>
      </Link>
    </Reveal>
  );
  return (
    <section className="bg-stone py-20 md:py-32"><div className="container-x">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div><p className="eyebrow mb-4">Inspiration</p><h2 className="text-step-4">Materials in real spaces.</h2></div>
        <Button href="/inspiration/" variant="ghost">Open gallery <Arrow /></Button>
      </div>
      <div className="grid md:grid-cols-12 gap-4 md:gap-6 md:h-[640px]">
        {tile(a, 0, 'md:col-span-7 h-[420px] md:h-full')}
        <div className="md:col-span-5 grid gap-4 md:gap-6 md:grid-rows-2">
          {tile(b, 1, 'h-[300px] md:h-full')}{tile(c, 2, 'h-[300px] md:h-full')}
        </div>
      </div>
    </div></section>
  );
}

export function Faq({ items = homeFaq }: { items?: { q: string; a: string }[] }) {
  return <div className="divide-y hairline border-y hairline">{items.map((f) => <details key={f.q} className="group py-1"><summary className="flex justify-between items-center gap-4 min-h-[56px] cursor-pointer list-none font-medium">{f.q}<span className="text-xl text-muted group-open:rotate-45 transition-transform" aria-hidden>+</span></summary><p className="pb-5 text-muted max-w-2xl">{f.a}</p></details>)}</div>;
}

export function FinalCta() {
  return (
    <section className="bg-accent text-accent-ink">
      <div className="container-x py-20 md:py-32">
        <h2 className="text-step-5 uppercase leading-[0.86] tracking-[-0.045em] font-bold max-w-[14ch]">Let’s build something.</h2>
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="max-w-md text-step-1 leading-snug text-white/85">Send your material list or a design and we’ll come back with a tailored quote.</p>
          <div className="flex gap-3 flex-wrap"><Button href="/quote/" variant="dark" size="lg">Request a quote <Arrow /></Button><Button href="/contact/" variant="ghost" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-ink">Visit the showroom</Button></div>
        </div>
      </div>
    </section>
  );
}
