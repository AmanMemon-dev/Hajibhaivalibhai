'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { spaces, defaultPicks } from '@/data/configurator';
import { materials, finishOptions, getMaterial } from '@/data/materials';
import { useConfigurator, useSelection, useUI } from '@/store';
import { designMaterials, designMessage, fromQuery, toQuery } from '@/lib/design';
import { matSwatch } from '@/lib/matSwatch';
import { Swatch } from '@/components/ui/Swatch';
import { Button, Chip } from '@/components/ui';
import { Loader } from '@/components/3d/LazyMount';
import { hasWebGL, isLowPower, prefersReducedMotion } from '@/components/3d/capabilities';
import { Room2D } from './Room2D';
import { waLink } from '@/lib/business';
import type { SpaceId, SurfaceKey } from '@/types';
import { cn } from '@/lib/utils';

const Scene = dynamic(() => import('@/components/3d/ConfiguratorScene'), { ssr: false });
const spaceIcon: Record<SpaceId, string> = { living: '🛋', kitchen: '🍳', bathroom: '🛁', bedroom: '🛏', exterior: '🏠' };
const kindLabel: Record<string, string> = { marble: 'Marble', granite: 'Granite', tile: 'Tiles', wood: 'Wood-look', stone: 'Natural stone', paint: 'Paint', quartz: 'Quartz-style', metal: 'Metal', concrete: 'Concrete' };

export function ConfiguratorApp() {
  const c = useConfigurator(); const router = useRouter(); const { add } = useSelection(); const toast = useUI((s) => s.showToast);
  const [mode, setMode] = useState<'pending' | '3d' | '2d'>('pending'); const [ready, setReady] = useState(false); const [hot, setHot] = useState(true);
  const [sheet, setSheet] = useState(false); const [compareView, setCompareView] = useState(false); const [saveName, setSaveName] = useState('');
  const [customHex, setCustomHex] = useState('#9aa58c'); const [customFin, setCustomFin] = useState<'matte' | 'satin' | 'gloss'>('matte');
  const capture = useRef<(() => string) | null>(null); const hydrated = useRef(false);

  // capability detection
  useEffect(() => { setSheet(window.innerWidth >= 1024); }, []);
  useEffect(() => setMode(hasWebGL() && !isLowPower() && !prefersReducedMotion() ? '3d' : '2d'), []);
  // hydrate from URL once
  useEffect(() => {
    const q = fromQuery(new URLSearchParams(window.location.search));
    if (q.space) { c.setSpace(q.space); setTimeout(() => c.hydrate({ picks: { ...defaultPicks[q.space!], ...q.picks }, options: { ...useConfigurator.getState().options, ...q.options } }), 0); }
    if (q.surface) c.setSurface(q.surface);
    setTimeout(() => { hydrated.current = true; }, 100); // let URL state apply before syncing back to the URL
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // sync URL
  useEffect(() => { if (!hydrated.current) return; window.history.replaceState(null, '', `?${toQuery(c.space, c.picks, c.options)}`); }, [c.space, c.picks, c.options]);

  const def = spaces.find((s) => s.id === c.space)!;
  const surfaceDef = def.surfaces.find((s) => s.key === c.surface) ?? def.surfaces[0];
  const surface = surfaceDef.key;
  const mats = useMemo(() => materials.filter((m) => m.surfaces.includes(surface)), [surface]);
  const grouped = useMemo(() => mats.reduce<Record<string, typeof mats>>((a, m) => ((a[m.kind] ||= []).push(m), a), {}), [mats]);
  const current = getMaterial(c.picks[surface]);
  const tileable = surface === 'floor' && current && ['tile', 'marble', 'granite', 'stone', 'wood'].includes(current.kind);
  const list = designMaterials(c.space, c.picks);
  const shareUrl = () => `${window.location.origin}/visualize/?${toQuery(c.space, c.picks, c.options)}`;
  const onSurface = useCallback((s: SurfaceKey) => { if (def.surfaces.some((x) => x.key === s)) c.setSurface(s); }, [def, c]);

  const exportPng = () => { const d = capture.current?.(); if (!d) return toast('Export is available in 3D mode'); const a = document.createElement('a'); a.href = d; a.download = `hajibhai-${c.space}-design.png`; a.click(); };
  const addAll = () => { list.forEach((d) => d.product && add(d.product, { variant: d.label })); toast(`${list.filter((d) => d.product).length} materials added to My Selection`); };
  const copyLink = async () => { try { await navigator.clipboard.writeText(shareUrl()); toast('Design link copied'); } catch { toast(shareUrl()); } };
  const wa = () => window.open(waLink(designMessage(c.space, c.picks, c.options, shareUrl())), '_blank', 'noopener');
  const toQuote = () => { addAll(); router.push('/quote/?source=configurator'); };

  const H = ({ n, children }: { n: number; children: React.ReactNode }) => <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted mb-3"><span className="text-accent mr-2">{n}</span>{children}</p>;
  const sub = 'text-xs text-muted mb-2';
  const Panel = (
    <div className="flex flex-col gap-7">
      <section aria-label="Choose space"><H n={1}>Space</H>
        <div className="grid grid-cols-3 gap-2">{spaces.map((s) => <button key={s.id} onClick={() => c.setSpace(s.id)} aria-pressed={c.space === s.id} className={cn('min-h-[44px] px-2 rounded border text-sm transition-colors', c.space === s.id ? 'bg-ink text-bg border-ink' : 'hairline hover:border-ink')}>{s.name}</button>)}</div></section>
      <section aria-label="Choose surface"><H n={2}>Surface</H>
        <div className="flex flex-wrap gap-2">{def.surfaces.map((s) => <Chip key={s.key} active={surface === s.key} onClick={() => c.setSurface(s.key)}>{s.label}</Chip>)}</div></section>
      <section aria-label="Choose material"><H n={3}>Material</H>
        {current && <p className="-mt-1 mb-3 text-sm">{current.name}</p>}
        <div className="space-y-5">
          {Object.entries(grouped).map(([kind, arr]) => (
            <div key={kind}><p className={sub}>{kindLabel[kind] ?? kind}</p>
              <div className="grid grid-cols-5 gap-2">{arr.map((m) => (
                <button key={m.id} onClick={() => c.pick(surface, m.id)} aria-label={m.name} aria-pressed={c.picks[surface] === m.id} title={m.name} className={cn('relative aspect-square rounded overflow-hidden ring-offset-2 ring-offset-[rgb(var(--surface))] transition-shadow', c.picks[surface] === m.id ? 'ring-2 ring-accent' : 'ring-1 ring-line hover:ring-ink/40')}><Swatch swatch={matSwatch(m)} seed={m.id.length} className="h-full w-full" /></button>))}</div></div>))}
          {(surface === 'wall' || surface === 'exteriorWall' || surface === 'accent') && (
            <div><p className={sub}>Custom paint colour</p>
              <div className="flex items-center gap-3"><input type="color" value={customHex} onChange={(e) => { setCustomHex(e.target.value); c.pick(surface, `custom:${e.target.value}:${customFin}`); }} aria-label="Pick paint colour" className="h-11 w-14 rounded border hairline bg-transparent p-1" />
                <div className="flex gap-1.5 flex-wrap">{(['matte', 'satin', 'gloss'] as const).map((f) => <Chip key={f} active={customFin === f && String(c.picks[surface]).startsWith('custom:')} onClick={() => { setCustomFin(f); c.pick(surface, `custom:${customHex}:${f}`); }}>{f}</Chip>)}</div></div></div>)}
        </div></section>
      {(tileable || def.fixtures.some((f) => ['Faucet', 'Shower', 'Accessories', 'Window frames'].includes(f))) && <section aria-label="Variant and finish"><H n={4}>Finish</H>
        <div className="space-y-5">
          {tileable && (<>
            <div><p className={sub}>Laying pattern</p><div className="flex flex-wrap gap-2">{finishOptions.patterns.map((p) => <Chip key={p} active={c.options.pattern === p} onClick={() => c.setOption('pattern', p)}>{p}</Chip>)}</div></div>
            <div><p className={sub}>Tile size (mm)</p><div className="flex flex-wrap gap-2">{finishOptions.tileSizes.map((p) => <Chip key={p} active={c.options.tileSize === p} onClick={() => c.setOption('tileSize', p)}>{p}×{p}</Chip>)}</div></div>
            <div><p className={sub}>Grout colour & width</p><div className="flex items-center gap-2 flex-wrap">{finishOptions.grout.map((g) => <button key={g.id} onClick={() => c.setOption('grout', g.id)} aria-label={`Grout ${g.label}`} aria-pressed={c.options.grout === g.id} className={cn('h-8 w-8 rounded-full ring-offset-2 ring-offset-[rgb(var(--surface))]', c.options.grout === g.id ? 'ring-2 ring-accent' : 'ring-1 ring-line')} style={{ background: g.hex }} />)}<span className="w-2" />{finishOptions.groutWidths.map((g) => <Chip key={g} active={c.options.groutWidth === g} onClick={() => c.setOption('groutWidth', g)}>{g}</Chip>)}</div></div></>)}
          {def.fixtures.some((f) => ['Faucet', 'Shower', 'Accessories'].includes(f)) && <div><p className={sub}>Faucet, shower & accessories</p><div className="flex flex-wrap gap-2">{finishOptions.fixtures.map((f) => <Chip key={f.id} active={c.options.fixture === f.id} onClick={() => c.setOption('fixture', f.id)}>{f.label}</Chip>)}</div></div>}
          {def.fixtures.includes('Window frames') && <div><p className={sub}>Aluminium window & door sections</p><div className="flex flex-wrap gap-2">{finishOptions.frames.map((f) => <Chip key={f.id} active={c.options.frame === f.id} onClick={() => c.setOption('frame', f.id)}>{f.label}</Chip>)}</div></div>}
        </div></section>}
      <section aria-label="Save, share and quote" className="border-t hairline pt-6 space-y-4"><H n={5}>Your design</H>
        <ul className="text-sm divide-y hairline">{list.map((d) => <li key={d.key} className="flex justify-between gap-3 py-2"><span className="text-muted">{d.label}</span><span className="text-right">{d.material?.name}</span></li>)}</ul>
        <Button onClick={toQuote} className="w-full">Request quote for this design</Button>
        <div className="grid grid-cols-2 gap-2"><Button variant="ghost" size="sm" onClick={wa}>WhatsApp</Button><Button variant="ghost" size="sm" onClick={copyLink}>Copy link</Button><Button variant="ghost" size="sm" onClick={exportPng}>Export image</Button></div>
        <div className="flex gap-2"><input className="field !min-h-[40px] text-sm" placeholder="Name this design" value={saveName} onChange={(e) => setSaveName(e.target.value)} aria-label="Design name" /><Button size="sm" onClick={() => { c.save(saveName); setSaveName(''); toast('Design saved on this device'); }}>Save</Button></div>
        {c.saves.length > 0 && <div><p className={sub}>Saved designs</p><ul className="space-y-1.5">{c.saves.map((d) => <li key={d.id} className="flex items-center justify-between text-sm"><button className="underline underline-offset-2 text-left" onClick={() => c.load(d)}>{d.name} <span className="text-muted">· {spaces.find((s) => s.id === d.space)?.name}</span></button><button onClick={() => c.deleteSave(d.id)} aria-label={`Delete ${d.name}`} className="h-9 w-9 text-muted">✕</button></li>)}</ul>{c.saves.length > 1 && <button className="text-xs text-accent mt-2" onClick={() => setCompareView(true)}>Compare saved designs →</button>}</div>}
      </section>
    </div>
  );

  const Toolbar = (
    <div className="flex items-center gap-1.5">
      <button onClick={c.undo} disabled={!c.past.length} className="tb" aria-label="Undo">↶</button><button onClick={c.redo} disabled={!c.future.length} className="tb" aria-label="Redo">↷</button><button onClick={c.reset} className="tb" aria-label="Reset design">⟲</button>
      <span className="w-px h-6 bg-line mx-1" />
      <button onClick={c.toggleRotate} aria-pressed={c.autoRotate} className={cn('tb', c.autoRotate && '!bg-ink !text-bg')} aria-label="Auto-rotate">⟳</button>
      <button onClick={() => setHot(!hot)} aria-pressed={hot} className={cn('tb', hot && '!bg-ink !text-bg')} aria-label="Toggle hotspots">◉</button>
    </div>
  );

  return (
    <div className="relative h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] min-h-[560px] bg-stone overflow-hidden">
      <style>{`.tb{height:44px;width:44px;display:grid;place-items:center;border-radius:6px;background:rgb(var(--surface)/.85);border:1px solid rgb(var(--line));font-size:18px}.tb:disabled{opacity:.35}.tb:hover:not(:disabled){border-color:rgb(var(--ink))}`}</style>
      <div className="absolute inset-0 lg:right-[416px]">
        {mode === '3d' && <>{!ready && <Loader label="Building your room" />}<Scene space={c.space} picks={c.picks} options={c.options} night={false} autoRotate={c.autoRotate} hotspots={hot} onSurface={onSurface} capture={capture} onReady={() => setReady(true)} /></>}
        {mode === '2d' && <Room2D space={c.space} picks={c.picks} options={c.options} night={false} />}
      </div>
      <div className="absolute top-3 left-3 right-3 lg:right-[420px] z-10 flex flex-wrap items-center justify-between gap-2">
        <div className="glass rounded-lg p-1.5">{Toolbar}</div>
        <p className="hidden md:block glass text-xs rounded px-3 py-2 text-muted">Drag to orbit · scroll to zoom</p>
      </div>
      {/* Desktop: floating glass side panel */}
      <aside className="hidden lg:block absolute top-3 bottom-3 right-3 w-[400px] bg-surface border hairline shadow-2 rounded-xl p-6 overflow-y-auto z-10" aria-label="Design controls">{Panel}</aside>
      {/* Mobile: bottom sheet */}
      <aside className={cn('lg:hidden absolute inset-x-0 bottom-14 z-20 bg-surface border-t hairline shadow-3 rounded-t-2xl transition-[max-height] duration-300 overflow-hidden', sheet ? 'max-h-[58dvh]' : 'max-h-[132px]')} aria-label="Design controls">
        <button onClick={() => setSheet(!sheet)} className="w-full h-10 grid place-items-center" aria-expanded={sheet} aria-label={sheet ? 'Collapse panel' : 'Expand panel'}><span className="h-1 w-10 rounded bg-ink/30" /></button>
        <div className="px-4 pb-6 overflow-y-auto max-h-[calc(58dvh-40px)]">{Panel}</div>
      </aside>
      {compareView && <CompareDesigns onClose={() => setCompareView(false)} />}
    </div>
  );
}

function CompareDesigns({ onClose }: { onClose: () => void }) {
  const saves = useConfigurator((s) => s.saves); const live = useConfigurator(); const [a, setA] = useState(saves[0]?.id); const [b, setB] = useState(saves[1]?.id);
  const A = saves.find((s) => s.id === a), B = saves.find((s) => s.id === b);
  const col = (d?: typeof A) => d ? designMaterials(d.space, d.picks) : [];
  void live;
  return (
    <div className="absolute inset-0 z-30 bg-bg/95 backdrop-blur p-4 md:p-10 overflow-y-auto" role="dialog" aria-label="Compare designs">
      <div className="max-w-4xl mx-auto"><div className="flex justify-between items-center mb-6"><h2 className="font-display text-3xl">Compare two designs</h2><button onClick={onClose} className="h-12 w-12 text-xl" aria-label="Close comparison">✕</button></div>
        <div className="grid md:grid-cols-2 gap-6">{[[a, setA, A], [b, setB, B]].map(([val, set, d], i) => (
          <div key={i}><select className="field mb-4" value={val as string} onChange={(e) => (set as any)(e.target.value)} aria-label={`Design ${i ? 'B' : 'A'}`}>{saves.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
            <ul className="space-y-3">{col(d as any).map((m) => <li key={m.key} className="flex items-center gap-3"><Swatch swatch={matSwatch(m.material)} className="h-12 w-12 rounded-sm shrink-0" /><span><span className="block text-xs text-muted">{m.label}</span><span className="block">{m.material?.name}</span></span></li>)}</ul></div>))}</div></div>
    </div>
  );
}
