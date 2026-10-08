'use client';
import Link from 'next/link';
import { Drawer, Button } from '@/components/ui';
import { useSelection, useUI } from '@/store';
import { waLink } from '@/lib/business';
import { products } from '@/data/products';
import { Swatch } from '@/components/ui/Swatch';

export function SelectionDrawer() {
  const { selection, open } = useUI(); const { items, remove, update, clear } = useSelection();
  const msg = `Hi, I would like a quote for:\n${items.map((i, n) => `${n + 1}. ${i.productName}${i.quantity ? ` — ${i.quantity}` : ''}`).join('\n')}`;
  return (
    <Drawer open={selection} onClose={() => open('selection', false)} title="My Selection" footer={items.length > 0 && <div className="grid gap-3"><Button href="/quote/" onClick={() => open('selection', false)}>Request quote for {items.length} item{items.length > 1 ? 's' : ''}</Button><Button variant="ghost" href={waLink(msg)} external>Send list on WhatsApp</Button></div>}>
      {items.length === 0 ? <div className="text-muted"><p>Your project material list is empty.</p><p className="mt-2">Add tiles, stone, cement, sanitaryware and more as you browse, then request one quote for everything.</p><Button href="/materials/" className="mt-6" variant="ghost" onClick={() => open('selection', false)}>Browse materials</Button><Link href="/estimator/" onClick={() => open('selection', false)} className="block mt-4 text-accent underline">Or estimate a whole building →</Link></div> : (
        <ul className="divide-y hairline">
          {items.map((i) => { const p = products.find((x) => x.slug === i.productSlug); return (
            <li key={i.productSlug} className="py-4 flex gap-4">
              {p && <Swatch swatch={p.swatch} seed={5} className="h-16 w-16 rounded-sm shrink-0 object-cover" />}
              <div className="flex-1 min-w-0"><p className="font-medium leading-tight">{i.productName}</p>
                <input aria-label={`Quantity for ${i.productName}`} className="field mt-2 !min-h-[40px] text-sm" placeholder="Quantity (e.g. 200 m², 50 bags)" value={i.quantity || ''} onChange={(e) => update(i.productSlug, { quantity: e.target.value })} /></div>
              <button onClick={() => remove(i.productSlug)} aria-label={`Remove ${i.productName}`} className="h-11 w-11 grid place-items-center text-muted hover:text-ink">✕</button>
            </li>); })}
          <li className="pt-4"><button onClick={clear} className="text-sm text-muted underline">Clear list</button></li>
        </ul>
      )}
    </Drawer>
  );
}
