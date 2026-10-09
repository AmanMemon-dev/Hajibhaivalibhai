'use client';
import { useState, type ReactNode } from 'react';
import { quick, NORMS, type Grade } from '@/lib/estimator';
import { Button, Field } from '@/components/ui';
import { useSelection, useUI } from '@/store';
import { products } from '@/data/products';
import { waLink } from '@/lib/business';
import { cn } from '@/lib/utils';

const tools = [['tile', 'Tiles'], ['cement', 'Concrete & cement'], ['sand', 'Plaster & sand'], ['paint', 'Paint'], ['steel', 'Steel weight']] as const;
type Tool = (typeof tools)[number][0];
const n = (v: string) => parseFloat(v) || 0;
const Input = ({ label, v, set, hint, unit }: { label: string; v: string; set: (s: string) => void; hint?: string; unit?: string }) => <Field label={`${label}${unit ? ` (${unit})` : ''}`} hint={hint}><input className="field" type="number" inputMode="decimal" min={0} value={v} onChange={(e) => set(e.target.value)} /></Field>;
const Result = ({ children }: { children: ReactNode }) => <div className="rounded-lg bg-[#111315] text-[#f2eee6] p-6 md:p-8 [&_.k]:text-white/60" aria-live="polite">{children}</div>;
const Big = ({ k, v, u }: { k: string; v: string | number; u?: string }) => <div><p className="k text-xs uppercase tracking-wider">{k}</p><p className="font-display text-step-3 leading-none mt-1">{v} <span className="text-base text-white/60">{u}</span></p></div>;

function addP(slug: string, qty: string, add: ReturnType<typeof useSelection.getState>['add'], update: ReturnType<typeof useSelection.getState>['update'], toast: (m: string) => void) { const p = products.find((x) => x.slug === slug); if (!p) return; add(p); update(p.slug, { quantity: qty }); toast(`${p.name} added with quantity`); }

export function Calculators({ initial = 'tile' }: { initial?: Tool }) {
  const [t, setT] = useState<Tool>(initial); const { add, update } = useSelection(); const toast = useUI((s) => s.showToast);
  // tile
  const [area, setArea] = useState('120'); const [tl, setTl] = useState('600'); const [tw, setTw] = useState('600'); const [waste, setWaste] = useState('10'); const [areaU, setAreaU] = useState<'m2' | 'sqft'>('sqft');
  // concrete
  const [vol, setVol] = useState('10'); const [grade, setGrade] = useState<Grade>('M20');
  const [cl, setCl] = useState('4'); const [cw, setCw] = useState('3'); const [cd, setCd] = useState('0.15');
  // plaster
  const [pa, setPa] = useState('100'); const [pt, setPt] = useState('12'); const [pr, setPr] = useState('5');
  // paint
  const [wa, setWa] = useState('150'); const [coats, setCoats] = useState('2'); const [cov, setCov] = useState('11');
  // steel
  const [dia, setDia] = useState('12'); const [len, setLen] = useState('12'); const [qty, setQty] = useState('50');

  const m2 = areaU === 'sqft' ? n(area) / 10.7639 : n(area);
  const tile = quick.tile(m2, n(tl) / 1000, n(tw) / 1000, n(waste));
  const volume = n(cl) * n(cw) * n(cd) > 0 && !n(vol) ? n(cl) * n(cw) * n(cd) : n(vol);
  const conc = quick.concrete(volume, grade); const pl = quick.plaster(n(pa), n(pt), n(pr)); const pn = quick.paint(n(wa), n(coats), n(cov)); const st = quick.steelKg(n(dia), n(len), n(qty));
  return (
    <div className="container-x pb-10">
      <div role="tablist" aria-label="Calculators" className="flex gap-2 overflow-x-auto no-scrollbar mb-10">{tools.map(([id, l]) => <button key={id} role="tab" aria-selected={t === id} onClick={() => setT(id)} className={cn('shrink-0 min-h-[48px] px-5 rounded-full border text-sm', t === id ? 'bg-[#111315] text-[#f2eee6] border-ink' : 'hairline hover:border-ink')}>{l}</button>)}</div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <div className="grid sm:grid-cols-2 gap-5">
          {t === 'tile' && <>
            <div className="sm:col-span-2 flex gap-2"><button onClick={() => setAreaU('sqft')} aria-pressed={areaU === 'sqft'} className={cn('px-4 min-h-[44px] rounded border text-sm', areaU === 'sqft' ? 'bg-[#111315] text-[#f2eee6]' : 'hairline')}>sq ft</button><button onClick={() => setAreaU('m2')} aria-pressed={areaU === 'm2'} className={cn('px-4 min-h-[44px] rounded border text-sm', areaU === 'm2' ? 'bg-[#111315] text-[#f2eee6]' : 'hairline')}>m²</button></div>
            <Input label="Area to tile" v={area} set={setArea} unit={areaU === 'sqft' ? 'sq ft' : 'm²'} /><Input label="Wastage" v={waste} set={setWaste} unit="%" hint="8–10% straight, 12–15% diagonal" /><Input label="Tile length" v={tl} set={setTl} unit="mm" /><Input label="Tile width" v={tw} set={setTw} unit="mm" /></>}
          {t === 'cement' && <>
            <Field label="Concrete grade"><select className="field" value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>{(['M15', 'M20', 'M25', 'M30'] as Grade[]).map((g) => <option key={g} value={g}>{g} — 1:{NORMS.mixes[g].slice(1).join(':')}</option>)}</select></Field>
            <Input label="Concrete volume" v={vol} set={setVol} unit="m³" hint="Or fill length × width × depth below and clear this" />
            <Input label="Length" v={cl} set={setCl} unit="m" /><Input label="Width" v={cw} set={setCw} unit="m" /><Input label="Depth / thickness" v={cd} set={setCd} unit="m" /><div className="flex items-end"><Button variant="ghost" size="sm" onClick={() => setVol(String(+(n(cl) * n(cw) * n(cd)).toFixed(3)))}>Use L × W × D</Button></div></>}
          {t === 'sand' && <><Input label="Plastered area" v={pa} set={setPa} unit="m²" /><Input label="Thickness" v={pt} set={setPt} unit="mm" hint="Internal 12, external 20, ceiling 10" /><Field label="Mix (cement : sand)"><select className="field" value={pr} onChange={(e) => setPr(e.target.value)}>{[3, 4, 5, 6].map((r) => <option key={r} value={r}>1 : {r}</option>)}</select></Field></>}
          {t === 'paint' && <><Input label="Paintable area" v={wa} set={setWa} unit="m²" /><Input label="Coats" v={coats} set={setCoats} /><Input label="Coverage" v={cov} set={setCov} unit="m²/L/coat" hint="Check the product tin; 9–12 typical" /></>}
          {t === 'steel' && <><Input label="Bar diameter" v={dia} set={setDia} unit="mm" /><Input label="Bar length" v={len} set={setLen} unit="m" /><Input label="Number of bars" v={qty} set={setQty} /></>}
        </div>
        <div>
          {t === 'tile' && <Result><div className="grid grid-cols-2 gap-6"><Big k="Tiles needed" v={tile.pieces.toLocaleString('en-IN')} u="pcs" /><Big k="Area with wastage" v={tile.areaWithWaste} u="m²" /></div><div className="mt-6 flex gap-3 flex-wrap"><Button size="sm" onClick={() => addP('carrara-marble-look-tile', `${tile.areaWithWaste} m²`, add, update, toast)}>Add tiles to project</Button><Button size="sm" variant="ghost" className="!border-white/30 !text-white" href={waLink(`Hi, I need ${tile.pieces} tiles (${tl}×${tw} mm, ${tile.areaWithWaste} m² incl. wastage). Please quote.`)} external>WhatsApp</Button></div></Result>}
          {t === 'cement' && <Result><div className="grid grid-cols-3 gap-6"><Big k="Cement" v={conc.bags} u="bags" /><Big k="Sand" v={conc.sandM3} u="m³" /><Big k="Aggregate" v={conc.aggM3} u="m³" /></div><p className="text-sm text-white/60 mt-5">Dry-volume factor {NORMS.concreteDry}; 50 kg bag = {NORMS.cementBagM3} m³ (IS 456 practice). Add 3–5% wastage.</p><div className="mt-6"><Button size="sm" onClick={() => { addP('ppc-cement', `${conc.bags} bags`, add, update, toast); addP('m-sand-concrete-grade', `${conc.sandM3} m³`, add, update, toast); addP('20-mm-aggregate', `${conc.aggM3} m³`, add, update, toast); }}>Add all three to project</Button></div></Result>}
          {t === 'sand' && <Result><div className="grid grid-cols-2 gap-6"><Big k="Cement" v={pl.bags} u="bags" /><Big k="Sand" v={pl.sandM3} u="m³" /></div><p className="text-sm text-white/60 mt-5">Includes +15% for surface undulation and a 1.27 dry-volume factor (IS 1661).</p><div className="mt-6"><Button size="sm" onClick={() => { addP('ppc-cement', `${pl.bags} bags`, add, update, toast); addP('m-sand-plaster-grade', `${pl.sandM3} m³`, add, update, toast); }}>Add to project</Button></div></Result>}
          {t === 'paint' && <Result><Big k="Paint needed" v={pn.litres} u="litres" /><p className="text-sm text-white/60 mt-5">Add 1 coat of primer (~{(n(wa) / NORMS.primerM2L).toFixed(1)} L) and putty (~{Math.round(n(wa) * NORMS.putty)} kg) on new walls.</p><div className="mt-6"><Button size="sm" onClick={() => addP('asian-paints-royale-luxury-emulsion', `${pn.litres} L`, add, update, toast)}>Add to project</Button></div></Result>}
          {t === 'steel' && <Result><div className="grid grid-cols-2 gap-6"><Big k="Weight" v={st} u="kg" /><Big k="Per metre" v={((n(dia) * n(dia)) / 162).toFixed(2)} u="kg/m" /></div><p className="text-sm text-white/60 mt-5">Unit weight = d² / 162 kg per metre (d in mm). Whole-building steel? Use the estimator.</p><div className="mt-6 flex gap-3"><Button size="sm" onClick={() => addP('tmt-bar-fe-500d', `${st} kg`, add, update, toast)}>Add TMT bars</Button><Button size="sm" variant="ghost" className="!border-white/30 !text-white" href="/estimator/">Whole-building estimator</Button></div></Result>}
          <p className="hint mt-4">Planning estimates only. Confirm quantities with your engineer or contractor.</p>
        </div>
      </div>
    </div>
  );
}
