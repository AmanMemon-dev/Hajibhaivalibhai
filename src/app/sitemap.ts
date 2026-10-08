import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { posts } from '@/data/posts';
import { inspiration } from '@/data/inspiration';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const s = business.site;
  const fixed = ['', '/materials', '/visualize', '/estimator', '/inspiration', '/tools', '/tools/colour-finder', '/learn', '/about', '/contact', '/trade', '/quote', '/privacy', '/terms'];
  return [
    ...fixed.map((p) => ({ url: `${s}${p}/` })),
    ...categories.map((c) => ({ url: `${s}/materials/${c.slug}/` })),
    ...products.map((p) => ({ url: `${s}/materials/${p.categorySlug}/${p.slug}/` })),
    ...posts.map((p) => ({ url: `${s}/learn/${p.slug}/` })),
    ...inspiration.map((p) => ({ url: `${s}/inspiration/${p.slug}/` })),
  ];
}
