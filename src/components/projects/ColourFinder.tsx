'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Chip } from '@/components/ui';
import { useUI } from '@/store';

/** Curated palettes. Shade names are descriptive, not brand shade codes. */
const moods: Record<string, { name: string; hex: string }[]> = {
  Calm: [{ name: 'Mist Grey', hex: '#d8dcdc' }, { name: 'Sage', hex: '#9aa58c' }, { name: 'Soft Sand', hex: '#d9cdb7' }, { name: 'Pale Blue', hex: '#c5d3dc' }],
  Warm: [{ name: 'Terracotta', hex: '#b9654a' }, { name: 'Clay Blush', hex: '#dcbfb2' }, { name: 'Honey', hex: '#d3b873' }, { name: 'Warm White', hex: '#efe9dc' }],
  Bold: [{ name: 'Deep Navy', hex: '#26344a' }, { name: 'Forest', hex: '#2f5e4e' }, { name: 'Charcoal', hex: '#3a3c40' }, { name: 'Oxblood', hex: '#6d2a2a' }],
  Neutral: [{ name: 'Greige', hex: '#cfc6b8' }, { name: 'Stone', hex: '#b8b2a7' }, { name: 'Ivory', hex: '#f1ece0' }, { name: 'Taupe', hex: '#9b8f82' }],
  Luxe: [{ name: 'Champagne', hex: '#c8b28a' }, { name: 'Onyx', hex: '#1c1c1e' }, { name: 'Brass', hex: '#b89a5a' }, { name: 'Pearl', hex: '#ece9e3' }],
};
export function ColourFinder() {
  const [mood, setMood] = useState('Calm'); const [pick, setPick] = useState(moods.Calm[0]); const toast = useUI((s) => s.showToast);
  return (
    <div className="container-x pb-10 grid lg:grid-cols-[1fr_1.2fr] gap-10">
      <div><p className="eyebrow mb-3">Mood</p><div className="flex flex-wrap gap-2">{Object.keys(moods).map((m) => <Chip key={m} active={mood === m} onClick={() => { setMood(m); setPick(moods[m][0]); }}>{m}</Chip>)}</div>
        <div className="mt-8 grid grid-cols-2 gap-3">{moods[mood].map((c) => <button key={c.hex} onClick={() => setPick(c)} aria-pressed={pick.hex === c.hex} className={`rounded overflow-hidden border-2 text-left ${pick.hex === c.hex ? 'border-accent' : 'border-transparent'}`}><span className="block h-24" style={{ background: c.hex }} /><span className="block p-3 text-sm bg-surface"><b className="block">{c.name}</b><span className="text-muted">{c.hex.toUpperCase()}</span></span></button>)}</div></div>
      <div className="rounded-lg overflow-hidden border hairline"><div className="h-64 md:h-80 relative" style={{ background: pick.hex }}><div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/25 to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex gap-2">{moods[mood].filter((c) => c.hex !== pick.hex).slice(0, 3).map((c) => <span key={c.hex} className="h-10 flex-1 rounded border border-white/40" style={{ background: c.hex }} title={c.name} />)}</div></div>
        <div className="p-6"><h2 className="font-display text-3xl">{pick.name}</h2><p className="text-muted mt-1">{pick.hex.toUpperCase()} · pairs with the swatches shown on the bottom edge</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href={`/visualize/?space=living&wall=${encodeURIComponent(`custom:${pick.hex}:matte`)}&surface=wall`} className="min-h-[48px] px-6 inline-flex items-center rounded bg-accent text-accent-ink font-medium">Try on a 3D wall</Link><button onClick={async () => { try { await navigator.clipboard.writeText(pick.hex); toast('Colour copied'); } catch {} }} className="min-h-[48px] px-6 rounded border border-ink/25">Copy hex</button><Link href="/materials/colours-finishes/" className="min-h-[48px] px-6 inline-flex items-center rounded border border-ink/25">Browse paints</Link></div>
          <p className="hint mt-4">On-screen colours vary by display. Always test a patch on the wall in daylight and evening light.</p></div></div>
    </div>
  );
}
