/**
 * Data service layer. Components NEVER import /data directly — they call these functions.
 * Today: static data. Later: set NEXT_PUBLIC_API_URL and replace the bodies with fetch() calls
 * (see docs/data-models.md). Signatures stay identical so the UI does not change.
 */
import Fuse from 'fuse.js';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { materials } from '@/data/materials';
import { inspiration } from '@/data/inspiration';
import { posts } from '@/data/posts';
import { testimonials } from '@/data/testimonials';
import type { Category, Product, PBRMaterial, InspirationSpace, Post, Testimonial, QuoteRequest } from '@/types';

const wait = <T,>(v: T): Promise<T> => Promise.resolve(v);

export interface ProductQuery {
  category?: string; q?: string; colors?: string[]; finishes?: string[]; applications?: string[]; styles?: string[];
  sort?: 'featured' | 'name-asc' | 'name-desc';
}

export const getCategories = (): Promise<Category[]> => wait(categories);
export const getCategoryBySlug = (slug: string) => wait(categories.find((c) => c.slug === slug) ?? null);
export const getProducts = (qy: ProductQuery = {}): Promise<Product[]> => wait(filterProducts(qy));
export const getProductBySlug = (slug: string) => wait(products.find((p) => p.slug === slug) ?? null);
export const getRelatedProducts = (p: Product, n = 4) => wait(products.filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id).slice(0, n));
export const getMaterials = (): Promise<PBRMaterial[]> => wait(materials);
export const getInspiration = (): Promise<InspirationSpace[]> => wait(inspiration);
export const getPosts = (): Promise<Post[]> => wait(posts);
export const getTestimonials = (): Promise<Testimonial[]> => wait(testimonials);

/** Synchronous variants for static page generation and client filtering. */
export function filterProducts(qy: ProductQuery = {}): Product[] {
  let list = products.slice();
  if (qy.category) list = list.filter((p) => p.categorySlug === qy.category);
  if (qy.colors?.length) list = list.filter((p) => qy.colors!.includes(p.color));
  if (qy.finishes?.length) list = list.filter((p) => qy.finishes!.includes(p.finish));
  if (qy.applications?.length) list = list.filter((p) => p.applications.some((a) => qy.applications!.includes(a)));
  if (qy.styles?.length) list = list.filter((p) => p.styles.some((s) => qy.styles!.includes(s)));
  if (qy.q) { const hit = new Set(searchProducts(qy.q)); list = searchProducts(qy.q).filter((p) => list.includes(p)); void hit; }
  if (qy.sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
  if (qy.sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name));
  return list;
}

/**
 * Product search: every word must match (typos allowed) somewhere in the product's text, in any order,
 * so "white marble polished" and "polished white marble" behave the same. Falls back to fuzzy single-pattern search.
 */
interface Hay { p: Product; hay: string; name: string }
let _hay: Hay[] | null = null; let _fuseHay: Fuse<Hay> | null = null; let _fuseName: Fuse<Product> | null = null;
const hays = () => (_hay ??= products.map((p) => ({ p, name: p.name.toLowerCase(), hay: [p.name, p.materialType, p.color, p.finish, p.categorySlug.replace(/-/g, ' '), p.applications.join(' '), p.styles.join(' '), p.description].join(' ').toLowerCase() })));
export function searchProducts(q: string): Product[] {
  const query = q.trim().toLowerCase(); if (!query) return products.slice();
  const tokens = query.split(/\s+/).filter(Boolean);
  _fuseHay ??= new Fuse(hays(), { keys: ['hay'], useExtendedSearch: true, threshold: 0.2, ignoreLocation: true });
  let res = _fuseHay.search(tokens.map((t) => (t.length > 2 ? t : `'${t}`)).join(' ')).map((r) => r.item);
  if (!res.length) { _fuseName ??= new Fuse(products, { keys: [{ name: 'name', weight: 3 }, 'materialType', 'color', 'finish', 'categorySlug'], threshold: 0.35, ignoreLocation: true }); return _fuseName.search(query).map((r) => r.item); }
  // rank: products whose NAME contains every token first
  const score = (h: Hay) => tokens.filter((t) => h.name.includes(t)).length;
  res = res.map((h, i) => ({ h, i, s: score(h) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.h);
  return res.map((h) => h.p);
}

export interface SearchResult { kind: 'product' | 'category'; title: string; subtitle: string; href: string; }
export function searchMaterials(q: string, limit = 8): SearchResult[] {
  const query = q.trim();
  if (!query) return [];
  const cats = new Fuse(categories, { keys: ['name', 'tagline', 'group'], threshold: 0.35 }).search(query).slice(0, 3).map((r): SearchResult => ({ kind: 'category', title: r.item.name, subtitle: r.item.group, href: `/materials/${r.item.slug}/` }));
  const prods = searchProducts(query).slice(0, limit).map((p): SearchResult => ({ kind: 'product', title: p.name, subtitle: `${p.materialType} · ${p.finish}`, href: `/materials/${p.categorySlug}/${p.slug}/` }));
  return [...cats, ...prods].slice(0, limit);
}

/**
 * Submit a quote. Static now: stores the last request locally and resolves.
 * Backend later: POST QuoteRequest to `${NEXT_PUBLIC_API_URL}/quotes` and forward to CRM / email / WhatsApp.
 */
export async function submitQuote(req: QuoteRequest): Promise<{ ok: true; reference: string }> {
  const reference = 'HV-' + Date.now().toString(36).toUpperCase();
  try { localStorage.setItem('hv-last-quote', JSON.stringify({ ...req, reference })); } catch {}
  // const api = process.env.NEXT_PUBLIC_API_URL; if (api) await fetch(`${api}/quotes`, { method: 'POST', body: JSON.stringify(req) });
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, reference };
}
