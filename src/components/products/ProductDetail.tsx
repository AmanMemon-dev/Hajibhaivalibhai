'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { Swatch } from '@/components/ui/Swatch';
import { ProductImage } from '@/components/products/ProductImage';
import { Button, Badge, Chip, Skeleton, Arrow } from '@/components/ui';
import { useSelection, useUI, useWishlist } from '@/store';
import { materials } from '@/data/materials';
import { waLink } from '@/lib/business';
import { hasWebGL, isLowPower } from '@/components/3d/capabilities';
import { cn } from '@/lib/utils';

const Slab = dynamic(() => import('@/components/3d/ProductSlab3D'), { ssr: false, loading: () => <Skeleton className="h-full w-full" /> });

function visualizeUrl(p: Product) {
  const m = materials.find((x) => x.productSlug === p.slug); if (!m) return '/visualize/';
  const s = m.surfaces[0]; const space = s === 'counter' ? 'kitchen' : s === 'roof' || s === 'exteriorWall' || s === 'cladding' ? 'exterior' : 'living';
  const key = s === 'counter' ? 'counter' : s === 'roof' ? 'roof' : s === 'exteriorWall' ? 'exteriorWall' : s === 'cladding' ? 'cladding' : s;
  return `/visualize/?space=${space}&${key}=${m.id}&surface=${key}`;
}

export function ProductDetail({ p }: { p: Product }) {
  const [tab, setTab] = useState<'swatch' | 'texture' | '3d'>('swatch'); const [variant, setVariant] = useState(p.variants[0].id); const [ok3d, setOk3d] = useState(false);
  const sel = useSelection(); const wish = useWishlist(); const toast = useUI((s) => s.showToast);
  const mat = materials.find((x) => x.productSlug === p.slug);
  useEffect(() => setOk3d(hasWebGL() && !isLowPower()), []);
  const v = p.variants.find((x) => x.id === variant)!; const sw = { ...p.swatch, base: v.colorHex ?? p.swatch.base };
  const inSel = sel.has(p.slug);
  const msg = `Hi, I am interested in ${p.name} (${p.finish}, ${v.label}). Could you share details and a quote? ${typeof window !== 'undefined' ? window.location.href : ''}`;
  const facts: [string, string][] = [['Category', p.categorySlug.replace(/-/g, ' ')], ['Type', p.materialType], ['Colour', p.color], ['Finish', String(p.finish)], ['Sizes', p.sizes.join(', ')], ['Thickness', p.thickness ?? '—'], ['Application', p.applications.join(', ')], ['Indoor / outdoor', p.indoorOutdoor]];
  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 xl:gap-16">
      <div>
        <div className="relative aspect-[4/3] rounded overflow-hidden bg-stone border hairline">
          {tab === 'swatch' && (p.images.length ? <ProductImage p={p} seed={p.id.length * 7 + p.name.length} label={p.name} /> : <Swatch swatch={sw} seed={p.id.length * 7 + p.name.length} className="h-full w-full object-cover" label={`${p.name} — ${v.label}`} />)}
          {tab === 'texture' && <div className="h-full w-full overflow-hidden"><Swatch swatch={sw} seed={p.id.length * 7 + p.name.length} className="h-full w-full object-cover scale-[2.4] origin-center" label="Texture close-up" /></div>}
          {tab === '3d' && (mat && ok3d ? <Slab materialId={mat.id} /> : <div className="h-full grid place-items-center p-8 text-center text-muted text-sm">{mat ? '3D viewer is off on this device — use the swatch and texture views.' : '3D preview is not available for this product yet. Slot ready: add a GLB via `modelUrl` in the data.'}</div>)}
          <div className="absolute top-3 left-3 flex gap-2"><Badge className="bg-bg/85 backdrop-blur">{p.finish}</Badge></div>
        </div>
        <div className="flex gap-2 mt-3" role="tablist" aria-label="Product views">{(['swatch', 'texture', '3d'] as const).map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn('min-h-[44px] px-4 rounded text-sm border', tab === t ? 'bg-ink text-bg border-ink' : 'hairline hover:border-ink')}>{t === 'swatch' ? 'Overview' : t === 'texture' ? 'Texture' : '3D / 360°'}</button>)}</div>
      </div>
      <div>
        <Badge>{p.materialType}</Badge><h1 className="text-step-3 mt-4">{p.name}</h1><p className="mt-4 text-muted text-step-0">{p.description}</p>
        {p.price && <p className="mt-4 font-display text-3xl">{p.price.currency} {p.price.amount} <span className="text-base text-muted">/ {p.price.unit}</span></p>}
        <div className="mt-6"><p className="eyebrow mb-2">Variant</p><div className="flex flex-wrap gap-2">{p.variants.map((x) => <Chip key={x.id} active={variant === x.id} onClick={() => setVariant(x.id)}><span className="inline-block h-3 w-3 rounded-full border border-black/20 mr-2 align-middle" style={{ background: x.colorHex }} />{x.label}</Chip>)}</div></div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button onClick={() => { sel.add(p, { variant: v.label }); toast(inSel ? 'Already in My Selection' : `${p.name} added to My Selection`); }}>{inSel ? '✓ In My Selection' : 'Add to Project'}</Button>
          <Button href={`/quote/?product=${p.slug}`} variant="dark">Request Quote</Button>
          <Button href={waLink(msg)} external variant="ghost">Ask on WhatsApp</Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm"><Link href={visualizeUrl(p)} className="underline underline-offset-4 hover:text-accent">See it in a 3D space <Arrow /></Link><button className="underline underline-offset-4 hover:text-accent" onClick={() => wish.toggle(p.slug)}>{wish.slugs.includes(p.slug) ? '♥ Saved' : '♡ Save for later'}</button><a href={p.datasheetUrl} className="underline underline-offset-4 text-muted" aria-disabled onClick={(e) => { e.preventDefault(); toast('Technical sheet is a placeholder — upload a PDF and set datasheetUrl'); }}>Technical sheet (placeholder)</a></div>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm border-t hairline pt-6">{facts.map(([k, val]) => <div key={k}><dt className="text-xs uppercase tracking-wider text-muted">{k}</dt><dd className="mt-0.5 capitalize-first">{val}</dd></div>)}</dl>
      </div>
      <div className="lg:col-span-2"><h2 className="text-step-2 mb-5">Specifications</h2><dl className="divide-y hairline border-y hairline max-w-3xl">{Object.entries(p.specifications).map(([k, val]) => <div key={k} className="flex justify-between gap-6 py-3 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right">{val}</dd></div>)}</dl><p className="hint mt-2">Sample specifications — confirm against the manufacturer’s datasheet.</p></div>
    </div>
  );
}
