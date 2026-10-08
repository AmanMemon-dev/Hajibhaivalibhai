'use client';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { filterProducts } from '@/services/api';
import { categories } from '@/data/categories';
import { allApplications, allColors, allFinishes, allStyles, products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Drawer, Button, Chip } from '@/components/ui';
import { useUI } from '@/store';
import { cn } from '@/lib/utils';

type F = { category: string; colors: string[]; finishes: string[]; applications: string[]; styles: string[]; sizes: string[]; q: string; sort: 'featured' | 'name-asc' | 'name-desc' };
const empty = (category = ''): F => ({ category, colors: [], finishes: [], applications: [], styles: [], sizes: [], q: '', sort: 'featured' });
const arr = (s: string | null) => (s ? s.split(',').filter(Boolean) : []);

function Group({ title, values, picked, onToggle, swatches }: { title: string; values: string[]; picked: string[]; onToggle: (v: string) => void; swatches?: Record<string, string> }) {
  const [open, setOpen] = useState(true);
  return (
    <fieldset className="border-b hairline pb-4">
      <legend className="sr-only">{title}</legend>
      <button type="button" className="w-full flex justify-between items-center min-h-[44px] font-medium text-sm" onClick={() => setOpen(!open)} aria-expanded={open}>{title}<span aria-hidden>{open ? '−' : '+'}</span></button>
      {open && <div className="flex flex-wrap gap-2 mt-1 max-h-48 overflow-y-auto">{values.map((v) => <button type="button" key={v} onClick={() => onToggle(v)} aria-pressed={picked.includes(v)} className={cn('min-h-[36px] px-3 rounded-full text-xs border inline-flex items-center gap-1.5 transition-colors', picked.includes(v) ? 'bg-ink text-bg border-ink' : 'hairline hover:border-ink')}>{swatches?.[v] && <span className="h-3 w-3 rounded-full border border-black/20" style={{ background: swatches[v] }} />}{v}</button>)}</div>}
    </fieldset>
  );
}

export function Catalogue({ categorySlug, pool }: { categorySlug?: string; pool?: string[] }) {
  const [f, setF] = useState<F>(empty(categorySlug)); const [view, setView] = useState<'grid' | 'list'>('grid'); const { filters, open } = useUI(); const [ready, setReady] = useState(false);
  useEffect(() => { const q = new URLSearchParams(window.location.search); setF({ category: categorySlug ?? q.get('cat') ?? '', colors: arr(q.get('colour')), finishes: arr(q.get('finish')), applications: arr(q.get('use')), styles: arr(q.get('style')), sizes: arr(q.get('size')), q: q.get('q') ?? '', sort: (q.get('sort') as F['sort']) || 'featured' }); setReady(true); }, [categorySlug]);
  useEffect(() => { if (!ready) return; const q = new URLSearchParams(); if (!categorySlug && f.category) q.set('cat', f.category); if (f.colors.length) q.set('colour', f.colors.join(',')); if (f.finishes.length) q.set('finish', f.finishes.join(',')); if (f.applications.length) q.set('use', f.applications.join(',')); if (f.styles.length) q.set('style', f.styles.join(',')); if (f.sizes.length) q.set('size', f.sizes.join(',')); if (f.q) q.set('q', f.q); if (f.sort !== 'featured') q.set('sort', f.sort); const s = q.toString(); window.history.replaceState(null, '', s ? `?${s}` : window.location.pathname); }, [f, ready, categorySlug]);

  const scope = useMemo(() => products.filter((p) => (categorySlug ? p.categorySlug === categorySlug : true)), [categorySlug]);
  const colorHex = useMemo(() => Object.fromEntries(scope.map((p) => [p.color, p.colorHex])), [scope]);
  const sizes = useMemo(() => Array.from(new Set(scope.flatMap((p) => p.sizes))), [scope]);
  const colors = useMemo(() => Array.from(new Set(scope.map((p) => p.color))).sort(), [scope]);
  const finishes = useMemo(() => Array.from(new Set(scope.map((p) => p.finish))).sort(), [scope]);
  const apps = useMemo(() => Array.from(new Set(scope.flatMap((p) => p.applications))).sort(), [scope]);
  const styles = useMemo(() => Array.from(new Set(scope.flatMap((p) => p.styles))).sort(), [scope]);
  void allApplications; void allColors; void allFinishes; void allStyles; void pool;

  const list = useMemo(() => filterProducts({ category: f.category || undefined, q: f.q || undefined, colors: f.colors, finishes: f.finishes, applications: f.applications as any, styles: f.styles as any, sort: f.sort }).filter((p) => !f.sizes.length || p.sizes.some((s) => f.sizes.includes(s))), [f]);
  const toggle = (k: 'colors' | 'finishes' | 'applications' | 'styles' | 'sizes') => (v: string) => setF((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const chips = [...f.colors.map((v) => ['colors', v]), ...f.finishes.map((v) => ['finishes', v]), ...f.applications.map((v) => ['applications', v]), ...f.styles.map((v) => ['styles', v]), ...f.sizes.map((v) => ['sizes', v])] as ['colors' | 'finishes' | 'applications' | 'styles' | 'sizes', string][];
  const active = chips.length + (f.q ? 1 : 0) + (!categorySlug && f.category ? 1 : 0);

  const Panel = (
    <div className="space-y-4">
      <label className="block"><span className="lbl">Search in results</span><input type="search" className="field" value={f.q} onChange={(e) => setF((s) => ({ ...s, q: e.target.value }))} placeholder="e.g. black polished" /></label>
      {!categorySlug && <label className="block"><span className="lbl">Category</span><select className="field" value={f.category} onChange={(e) => setF((s) => ({ ...s, category: e.target.value }))}><option value="">All categories</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>}
      <Group title="Colour" values={colors} picked={f.colors} onToggle={toggle('colors')} swatches={colorHex} />
      <Group title="Finish" values={finishes} picked={f.finishes} onToggle={toggle('finishes')} />
      <Group title="Application" values={apps} picked={f.applications} onToggle={toggle('applications')} />
      <Group title="Style" values={styles} picked={f.styles} onToggle={toggle('styles')} />
      <Group title="Size" values={sizes} picked={f.sizes} onToggle={toggle('sizes')} />
      <div className="opacity-60"><p className="text-sm font-medium min-h-[44px] flex items-center">Price</p><p className="hint">Price filter appears when pricing is connected from the backend.</p></div>
      {active > 0 && <Button variant="ghost" size="sm" onClick={() => setF(empty(categorySlug))}>Clear all</Button>}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-8 xl:gap-12">
      <aside className="hidden lg:block sticky top-28 self-start max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2" aria-label="Filters">{Panel}</aside>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-sm text-muted" aria-live="polite"><b className="text-ink">{list.length}</b> product{list.length === 1 ? '' : 's'}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => open('filters')}>Filters{active ? ` (${active})` : ''}</Button>
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select id="sort" className="field !min-h-[40px] !w-auto text-sm" value={f.sort} onChange={(e) => setF((s) => ({ ...s, sort: e.target.value as F['sort'] }))}><option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option></select>
            <div className="hidden sm:inline-flex border hairline rounded overflow-hidden" role="group" aria-label="View"><button onClick={() => setView('grid')} aria-pressed={view === 'grid'} className={cn('h-10 w-10', view === 'grid' && 'bg-ink text-bg')} aria-label="Grid view">▦</button><button onClick={() => setView('list')} aria-pressed={view === 'list'} className={cn('h-10 w-10', view === 'list' && 'bg-ink text-bg')} aria-label="List view">☰</button></div>
          </div>
        </div>
        {active > 0 && <div className="flex flex-wrap gap-2 mb-5" aria-label="Active filters">{chips.map(([k, v]) => <Chip key={k + v} active onClick={() => toggle(k)(v)}>{v} ✕</Chip>)}{f.q && <Chip active onClick={() => setF((s) => ({ ...s, q: '' }))}>“{f.q}” ✕</Chip>}<button className="text-sm underline text-muted" onClick={() => setF(empty(categorySlug))}>Clear all</button></div>}
        {list.length === 0 ? <div className="border border-dashed hairline rounded-lg p-14 text-center"><p className="font-display text-2xl">No exact match.</p><p className="text-muted mt-2">Try removing a filter, or tell us what you need.</p><div className="mt-6 flex gap-3 justify-center"><Button variant="ghost" onClick={() => setF(empty(categorySlug))}>Clear filters</Button><Button href="/quote/">Ask us</Button></div></div> : (
          <LayoutGroup><motion.div layout className={cn('grid gap-4 md:gap-5', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
            <AnimatePresence mode="popLayout">{list.map((p) => <motion.div layout key={p.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}><ProductCard p={p} view={view} /></motion.div>)}</AnimatePresence>
          </motion.div></LayoutGroup>)}
      </div>
      <Drawer open={filters} onClose={() => open('filters', false)} title="Filters" footer={<Button className="w-full" onClick={() => open('filters', false)}>Show {list.length} products</Button>}>{Panel}</Drawer>
    </div>
  );
}
