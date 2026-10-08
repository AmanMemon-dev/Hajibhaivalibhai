import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/data/posts';
import { PageHero } from '@/components/layout/PageHero';
export const metadata: Metadata = { title: 'Material Guides', description: 'Practical guides: marble vs granite, which stone for which use, choosing bathroom tiles, estimating cement and sand, paint finishes.' };
export default function Page() { return (<><PageHero eyebrow="Learn" title="Material guides." intro="Plain-language advice before you buy." crumbs={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} /><div className="container-x pb-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{posts.map((p) => <Link key={p.slug} href={`/learn/${p.slug}/`} className="group border hairline rounded-lg p-7 bg-surface hover:shadow-2 transition-shadow"><p className="text-xs uppercase tracking-wider text-accent">{p.category} · {p.readTime}</p><h2 className="font-display text-2xl mt-3 group-hover:text-accent">{p.title}</h2><p className="text-muted text-sm mt-3">{p.excerpt}</p></Link>)}</div></>); }
