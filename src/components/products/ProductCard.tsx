'use client';
import Link from 'next/link';
import type { Product } from '@/types';
import { ProductImage } from '@/components/products/ProductImage';
import { Badge } from '@/components/ui';
import { useSelection, useUI, useWishlist } from '@/store';
import { productHref } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ProductCard({ p, view = 'grid' }: { p: Product; view?: 'grid' | 'list' }) {
  const sel = useSelection(); const wish = useWishlist(); const toast = useUI((s) => s.showToast);
  const inSel = sel.items.some((i) => i.productSlug === p.slug); const liked = wish.slugs.includes(p.slug);
  const seed = p.id.length * 7 + p.name.length;
  return (
    <article className={cn('group relative bg-surface border hairline rounded hover:shadow-2 transition-all duration-300', view === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col')}>
      <Link href={productHref(p)} className={cn('relative block overflow-hidden', view === 'list' ? 'sm:w-64 shrink-0 aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]')} aria-label={`View ${p.name}`}>
        <ProductImage p={p} seed={seed} label={p.name} swatchClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <span className="absolute left-3 top-3"><Badge className="bg-bg/85 backdrop-blur">{p.finish}</Badge></span>
      </Link>
      <button onClick={() => { wish.toggle(p.slug); }} aria-pressed={liked} aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'} className="absolute right-2 top-2 h-11 w-11 grid place-items-center rounded-full bg-bg/80 backdrop-blur text-lg">{liked ? '♥' : '♡'}</button>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <p className="text-xs text-muted uppercase tracking-wider">{p.materialType}</p>
        <h3 className="font-display text-xl mt-1 leading-tight"><Link href={productHref(p)} className="hover:text-accent">{p.name}</Link></h3>
        <p className="text-sm text-muted mt-2 line-clamp-2">{p.applications.join(' · ')}</p>
        {/* Price slot: rendered only when the backend supplies p.price */}
        {p.price && <p className="mt-2 font-medium">{p.price.currency} {p.price.amount} / {p.price.unit}</p>}
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          <Link href={productHref(p)} className="min-h-[44px] px-4 inline-flex items-center rounded border border-ink/25 text-sm hover:border-ink">Explore</Link>
          <button onClick={() => { sel.add(p); toast(inSel ? 'Already in My Selection' : `${p.name} added to My Selection`); }} className={cn('min-h-[44px] px-4 rounded text-sm font-medium', inSel ? 'bg-ink/10' : 'bg-accent text-accent-ink hover:brightness-110')}>{inSel ? '✓ In selection' : 'Add to project'}</button>
        </div>
      </div>
    </article>
  );
}
