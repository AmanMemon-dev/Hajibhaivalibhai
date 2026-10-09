'use client';
import { useState } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui';
import { waLink } from '@/lib/business';

const field = 'mt-1 w-full min-h-[44px] rounded border hairline bg-bg px-3 text-sm';

/** Lets a customer ask for any shade by its code. The shop mixes it on the tinting machine. */
export function ShadeMixer({ p }: { p: Product }) {
  const brand = p.facts?.find(([k]) => k === 'Brand')?.[1] ?? p.name.split(' ')[0];
  const packs = p.sizes.filter((s) => /\d/.test(s));
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [pack, setPack] = useState(packs[0] ?? '');
  const [qty, setQty] = useState(1);
  const [pick, setPick] = useState('');
  const ready = code.trim().length > 0;
  const msg = [
    'Hi, I would like a tinted paint made to a shade code.',
    `Product: ${p.name}`,
    `Brand shade card: ${brand}`,
    `Shade code: ${code.trim()}`,
    name.trim() && `Shade name: ${name.trim()}`,
    pack ? `Pack: ${pack} × ${qty}` : `Quantity: ${qty}`,
    pick && `Colour I am matching (approx.): ${pick}`,
  ].filter(Boolean).join('\n');
  return (
    <section className="mt-8 rounded border hairline p-5" aria-labelledby="mix-h">
      <h2 id="mix-h" className="text-step-1">Get your shade mixed</h2>
      <p className="mt-2 text-sm text-muted">We tint on our machine to the shade code you choose from the {brand} shade card. Enter the code and we will mix it for you.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Shade code<input className={field} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code from the shade card" autoComplete="off" /></label>
        <label className="text-sm">Shade name (optional)<input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" /></label>
        {packs.length > 0 && <label className="text-sm">Pack size<select className={field} value={pack} onChange={(e) => setPack(e.target.value)}>{packs.map((s) => <option key={s}>{s}</option>)}</select></label>}
        <label className="text-sm">Quantity<input className={field} type="number" min={1} max={99} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))} /></label>
        <label className="text-sm">Colour you are matching (optional)
          <span className="mt-1 flex items-center gap-3"><input type="color" value={pick || '#cccccc'} onChange={(e) => setPick(e.target.value)} className="h-11 w-16 rounded border hairline bg-bg" aria-label="Pick a colour to match" />
            <span className="text-xs text-muted">{pick ? pick.toUpperCase() : 'Not set'}</span></span>
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {ready ? <Button href={waLink(msg)} external>Send shade request on WhatsApp</Button> : <Button disabled>Send shade request on WhatsApp</Button>}
        <p className="text-xs text-muted">{ready ? 'Opens WhatsApp with your request filled in.' : 'Enter a shade code to continue.'}</p>
      </div>
    </section>
  );
}
