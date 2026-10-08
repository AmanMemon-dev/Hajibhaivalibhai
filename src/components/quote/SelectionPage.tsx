'use client';
import { useSelection, useUI, useWishlist } from '@/store';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui';
import { waLink } from '@/lib/business';
export function SelectionPage() {
  const { items, clear } = useSelection(); const open = useUI((s) => s.open); const wish = useWishlist();
  const list = items.map((i) => products.find((p) => p.slug === i.productSlug)).filter(Boolean) as typeof products;
  const saved = wish.slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;
  return (
    <div className="container-x pb-10 space-y-16">
      <section><div className="flex flex-wrap items-end justify-between gap-4 mb-6"><h2 className="text-step-2">My Selection ({items.length})</h2><div className="flex gap-3 flex-wrap"><Button href="/quote/" disabled={!items.length}>Request quote</Button><Button variant="ghost" href={waLink(`Hi, quote for:\n${items.map((i) => `• ${i.productName}${i.quantity ? ' — ' + i.quantity : ''}`).join('\n')}`)} external>WhatsApp</Button>{items.length > 0 && <Button variant="link" onClick={clear}>Clear</Button>}</div></div>
        {list.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="text-muted border border-dashed hairline rounded-lg p-10 text-center">Nothing here yet. <a className="underline" href="/materials/">Browse materials</a> or <a className="underline" href="/estimator/">estimate a building</a>.</p>}</section>
      {saved.length > 0 && <section><h2 className="text-step-2 mb-6">Saved for later</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{saved.map((p) => <ProductCard key={p.id} p={p} />)}</div></section>}
    </div>
  );
}
