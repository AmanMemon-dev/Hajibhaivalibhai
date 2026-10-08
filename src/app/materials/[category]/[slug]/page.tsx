import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductDetail } from '@/components/products/ProductDetail';
import { ProductCard } from '@/components/products/ProductCard';
import { Breadcrumbs } from '@/components/ui';
import { business } from '@/lib/business';

export function generateStaticParams() { return products.map((p) => ({ category: p.categorySlug, slug: p.slug })); }
export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const p = products.find((x) => x.slug === params.slug && x.categorySlug === params.category); if (!p) return {};
  return { title: `${p.name} — ${p.finish} ${p.materialType}`, description: p.description, alternates: { canonical: `/materials/${p.categorySlug}/${p.slug}/` }, openGraph: { title: p.name, description: p.description } };
}
export default function Page({ params }: { params: { category: string; slug: string } }) {
  const p = products.find((x) => x.slug === params.slug && x.categorySlug === params.category); if (!p) notFound();
  const c = categories.find((x) => x.slug === p.categorySlug)!;
  const related = products.filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id).slice(0, 3);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, category: c.name, color: p.color, material: p.materialType, brand: { '@type': 'Brand', name: business.name } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Materials', '/materials/'], [c.name, `/materials/${c.slug}/`], [p.name, `/materials/${c.slug}/${p.slug}/`]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: business.site + u })) },
  ];
  return (<>
    <div className="container-x pt-8 pb-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Materials', href: '/materials/' }, { label: c.name, href: `/materials/${c.slug}/` }, { label: p.name }]} /></div>
    <div className="container-x pb-16"><ProductDetail p={p} /></div>
    <section className="container-x pb-12"><h2 className="text-step-2 mb-6">Related products</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></section>
    {ld.map((l, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(l) }} />)}
  </>);
}
