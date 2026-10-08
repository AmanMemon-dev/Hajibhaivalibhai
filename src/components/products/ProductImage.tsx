'use client';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/types';
import { Swatch } from '@/components/ui/Swatch';
import { cn } from '@/lib/utils';

/**
 * Product picture. If the product has a photo (p.images[0]) it is shown either whole on a soft backdrop
 * (imageFit 'contain', for pack-shots; white backgrounds blend in) or filling the frame (imageFit 'cover', for photos). If the file is missing
 * or fails to load, it falls back to the generated swatch so the page never shows a broken image.
 */
export function ProductImage({ p, swatchClassName = 'h-full w-full object-cover', className, seed, label }: {
  p: Product; swatchClassName?: string; className?: string; seed: number; label?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // The image may have failed before React attached onError (static HTML), so check once on mount.
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) setFailed(true); }, []);
  const src = p.images[0];
  if (!src || failed) return <Swatch swatch={p.swatch} seed={seed} label={label ?? `${p.name} swatch`} className={swatchClassName} />;
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#ecece8_70%,#e0e0da_100%)]', className)}>
      <img
        ref={ref} src={src} alt={label ?? p.name} loading="lazy" decoding="async" onError={() => setFailed(true)}
        className={cn('absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]', p.imageFit === 'cover' ? 'object-cover object-[50%_65%]' : 'object-contain p-[4%] mix-blend-multiply')}
      />
    </div>
  );
}
