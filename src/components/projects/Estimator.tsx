'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { defaultInput, estimate, suggestOpenings, type EstimatorInput, type Line, type WallType } from '@/lib/estimator';
import { products } from '@/data/products';
import { useSelection, useUI } from '@/store';
import { Button } from '@/components/ui';
import { waLink } from '@/lib/business';
import { cn } from '@/lib/utils';

const SQFT = 10.7639;
const fmt = (n: number, d = 0) => n.toLocaleString('en-IN', { maximumFractionDigits: d });

/** The only things a homeowner really knows: size, floors, wall material, bathrooms, tile size. */
interface Simple { area: number; floors: number; wall: WallType; baths: number; tile: [number, number] }
const initial: Simple = { area: 1200, floors: 1, wall: 'clay-standard', baths: 2, tile: [0.6, 0.6] };

const presets: { name: string; patch: Partial<Simple> }[] = [
  { name: '1 BHK · 500 sq ft', patch: { area: 500, floors: 1, baths: 1 } },
  { name: '2 BHK · 900 sq ft', patch: { area: 900, floors: 1, baths: 2 } },
  { name: '3 BHK · 1,300 sq ft', patch: { area: 1300, floors: 1, baths: 3 } },
  { name: 'Duplex · 2,400 sq ft', patch: { area: 2400, floors: 2, baths: 4 } },
];
const walls: [WallType, string][] = [['clay-standard', 'Red clay brick'], ['flyash', 'Fly-ash brick'], ['aac', 'AAC block']];
const tiles: [[number, number], string][] = [[[0.6, 0.6], '2×2 ft'], [[0.6, 1.2], '2×4 ft'], [[0.8, 0.8], '800×800']];

/** Expand the four simple answers into the full engine input using standard defaults. */
function toInput(s: Simple): EstimatorInput {
  const perFloor = s.area / SQFT / s.floors; const o = suggestOpenings(perFloor, s.floors); const block = s.wall === 'aac';
  return {
    ...defaultInput(), mode: 'area', builtUpArea: perFloor, floors: s.floors, concrete: s.floors >= 3 ? 'M25' : 'M20',
    wallType: s.wall, extThickness: block ? 0.2 : 0.23, intThickness: block ? 0.1 : 0.115,
    windows: o.windows, intDoors: o.intDoors, extDoors: o.extDoors, occupants: o.occupants, bathrooms: s.baths, kitchens: 1, tileL: s.tile[0], tileW: s.tile[1],
  };
}

const Group = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="border hairline rounded-lg bg-surface p-5 md:p-6">
    <h2 className="flex items-center gap-3 font-display text-xl"><span className="h-7 w-7 rounded-full border border-accent text-accent grid place-items-center text-sm font-sans">{n}</span>{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);
const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} aria-pressed={active} className={cn('min-h-[44px] px-4 rounded border text-sm transition-colors', active ? 'bg-ink text-bg border-ink' : 'hairline hover:border-ink')}>{children}</button>
);

export function Estimator() {
  const [s, setS] = useState<Simple>(initial); const [showAll, setShowAll] = useState(false);
  const { add, update } = useSelection(); const toast = useUI((st) => st.showToast); const router = useRouter();
  const patch = (p: Partial<Simple>) => setS((x) => ({ ...x, ...p }));
  const r = useMemo(() => estimate(toInput(s)), [s]);
  useEffect(() => { try { const v = localStorage.getItem('hv-estimator-simple'); if (v) setS({ ...initial, ...JSON.parse(v) }); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem('hv-estimator-simple', JSON.stringify(s)); } catch {} }, [s]);

  const t = r.totals; const paintL = r.lines.filter((l) => l.key === 'intpaint' || l.key === 'extpaint').reduce((a, l) => a + l.qty, 0);
  const isBrick = s.wall !== 'aac';
  const cards: [string, string, string, string][] = [
    ['Cement', fmt(t.cementBags), 'bags of 50 kg', `${t.cementTonnes} tonnes`],
    ['Sand', fmt(t.sandM3, 1), 'm³', `≈ ${t.sandBrass} brass`],
    ['Aggregate', fmt(t.aggM3, 1), 'm³ (10 & 20 mm)', `≈ ${t.aggBrass} brass`],
    ['Steel (TMT)', fmt(t.steelKg), 'kg', `${t.steelTonnes} tonnes`],
    [isBrick ? 'Bricks' : 'AAC blocks', fmt(t.wallUnits), 'pieces', 'includes breakage'],
    ['Floor & wall tiles', fmt(t.tileM2, 1), 'm²', `≈ ${fmt(t.tileM2 * SQFT)} sq ft`],
    ['Paint', fmt(paintL, 0), 'litres', 'interior + exterior, 2 coats'],
  ];
  const groups = useMemo(() => r.lines.reduce<Record<string, Line[]>>((a, l) => ((a[l.group] ||= []).push(l), a), {}), [r.lines]);
  const addAll = () => { let n = 0; r.lines.forEach((l) => { const p = products.find((x) => x.slug === l.productSlug); if (p) { add(p); update(p.slug, { quantity: `${fmt(l.qty, 1)} ${l.unit}` }); n++; } }); return n; };
  const summary = `Hi, I used your material estimator for a ${fmt(s.area)} sq ft, ${s.floors}-floor house:\n• Cement: ${t.cementBags} bags\n• Sand: ${t.sandM3} m³\n• Aggregate: ${t.aggM3} m³\n• Steel: ${fmt(t.steelKg)} kg\n• ${isBrick ? 'Bricks' : 'AAC blocks'}: ${fmt(t.wallUnits)}\n• Tiles: ${t.tileM2} m²\nPlease share a quote.`;

  return (
    <div className="container-x grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8 xl:gap-12 pb-10">
      <div className="space-y-4 no-print">
        <Group n={1} title="How big is the house?">
          <label className="block"><span className="lbl">Total built-up area (all floors)</span>
            <div className="flex items-center gap-3"><input type="number" inputMode="numeric" min={200} max={20000} step={50} className="field" value={s.area || ''} onChange={(e) => patch({ area: Math.min(20000, Math.max(0, parseFloat(e.target.value) || 0)) })} /><span className="text-sm text-muted whitespace-nowrap">sq ft</span></div></label>
          <input type="range" min={300} max={6000} step={50} value={Math.min(6000, Math.max(300, s.area))} onChange={(e) => patch({ area: Number(e.target.value) })} aria-label="Built-up area" className="w-full mt-4 accent-[#D63F12]" />
          <div className="mt-3 flex flex-wrap gap-2">{presets.map((p) => <button key={p.name} type="button" onClick={() => patch(p.patch)} className="text-xs px-3 min-h-[36px] rounded-full border hairline hover:border-ink">{p.name}</button>)}</div>
        </Group>
        <Group n={2} title="How many floors?">
          <div className="flex flex-wrap gap-2">{[1, 2, 3, 4].map((n) => <Pill key={n} active={s.floors === n} onClick={() => patch({ floors: n })}>{n === 1 ? 'Ground only' : `G+${n - 1}`}</Pill>)}</div>
        </Group>
        <Group n={3} title="Walls built with">
          <div className="flex flex-wrap gap-2">{walls.map(([v, l]) => <Pill key={v} active={s.wall === v} onClick={() => patch({ wall: v })}>{l}</Pill>)}</div>
        </Group>
        <Group n={4} title="Bathrooms & tiles">
          <p className="lbl">Bathrooms</p>
          <div className="flex flex-wrap gap-2">{[1, 2, 3, 4, 5, 6].map((n) => <Pill key={n} active={s.baths === n} onClick={() => patch({ baths: n })}>{n}</Pill>)}</div>
          <p className="lbl mt-5">Floor tile size</p>
          <div className="flex flex-wrap gap-2">{tiles.map(([v, l]) => <Pill key={l} active={s.tile[0] === v[0] && s.tile[1] === v[1]} onClick={() => patch({ tile: v })}>{l}</Pill>)}</div>
        </Group>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start" id="results">
        <div className="print-only"><p className="font-display text-3xl">Material estimate — Hajibhai Valibhai</p><p>{fmt(s.area)} sq ft · {s.floors} floor(s). Planning estimate only.</p></div>
        <div>
          <p className="eyebrow mb-3">You will need approximately</p>
          <div className="grid grid-cols-2 gap-3">{cards.map(([l, v, u, sub], i) => (
            <div key={l} className={cn('border hairline rounded-lg p-4 bg-surface', i === cards.length - 1 && 'col-span-2')}>
              <p className="text-xs uppercase tracking-wider text-muted">{l}</p>
              <p className="font-display text-step-3 leading-none mt-2" aria-live="polite">{v}</p>
              <p className="text-xs text-muted mt-1">{u}</p><p className="text-xs mt-2 text-accent">{sub}</p>
            </div>))}</div>
          <p className="hint mt-3">A planning estimate (±10–15%) using standard Indian norms. Final quantities depend on your structural design and site.</p>
        </div>

        <div className="flex flex-wrap gap-3 no-print">
          <Button onClick={() => { addAll(); router.push('/quote/?source=estimator'); }}>Request quote for this list</Button>
          <Button variant="ghost" href={waLink(summary)} external>Send on WhatsApp</Button>
          <Button variant="ghost" onClick={() => window.print()}>Print</Button>
        </div>

        <div className="border hairline rounded-lg bg-surface">
          <button className="w-full flex justify-between items-center p-4 text-left" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}><span className="font-display text-xl">Full material list</span><span aria-hidden>{showAll ? '−' : '+'}</span></button>
          {showAll && <div className="px-4 pb-4"><table className="w-full text-sm"><tbody>{Object.entries(groups).map(([g, ls]) => (<>
            <tr key={g} className="bg-stone/60"><td colSpan={2} className="px-3 py-2 text-xs font-semibold uppercase tracking-wider">{g}</td></tr>
            {ls.map((l) => <tr key={l.key} className="border-t hairline align-top"><td className="p-3">{l.label}{l.note && <span className="block text-xs text-muted">{l.note}</span>}</td><td className="p-3 text-right whitespace-nowrap font-medium">{fmt(l.qty, 1)} <span className="text-muted font-normal">{l.unit}</span></td></tr>)}</>))}</tbody></table>
            <button className="text-sm text-accent underline mt-3 no-print" onClick={() => toast(`${addAll()} items added to My Selection`)}>Add all to My Selection</button></div>}
        </div>
      </div>
    </div>
  );
}
