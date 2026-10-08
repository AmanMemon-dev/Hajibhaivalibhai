import { spaces } from '@/data/configurator';
import { getMaterial } from '@/data/materials';
import { products } from '@/data/products';
import type { SpaceId, SurfaceKey } from '@/types';

export function designMaterials(space: SpaceId, picks: Partial<Record<SurfaceKey, string>>) {
  const def = spaces.find((s) => s.id === space)!;
  return def.surfaces.filter((s) => picks[s.key]).map((s) => {
    const m = getMaterial(picks[s.key]); const prod = m?.productSlug ? products.find((p) => p.slug === m.productSlug) : undefined;
    return { key: s.key, label: s.label, material: m, product: prod };
  });
}
export function designMessage(space: SpaceId, picks: Partial<Record<SurfaceKey, string>>, options: Record<string, string>, url?: string) {
  const name = spaces.find((s) => s.id === space)?.name;
  const lines = designMaterials(space, picks).map((d) => `• ${d.label}: ${d.material?.name ?? '—'}`);
  const extra = [options.pattern && options.pattern !== 'straight' ? `Floor pattern: ${options.pattern}` : '', options.fixture ? `Fixtures: ${options.fixture}` : ''].filter(Boolean);
  return `Hi, I designed a ${name} on your website and would like a quote:\n${lines.join('\n')}${extra.length ? '\n' + extra.join('\n') : ''}${url ? `\n\nDesign link: ${url}` : ''}`;
}
const keys = ['floor', 'wall', 'counter', 'accent', 'exteriorWall', 'cladding', 'roof'] as const;
export function toQuery(space: SpaceId, picks: Partial<Record<SurfaceKey, string>>, options: Record<string, string>) {
  const q = new URLSearchParams({ space }); keys.forEach((k) => picks[k] && q.set(k, picks[k]!)); Object.entries(options).forEach(([k, v]) => q.set('o_' + k, v)); return q.toString();
}
export function fromQuery(q: URLSearchParams) {
  const space = (q.get('space') as SpaceId) || undefined; const picks: Partial<Record<SurfaceKey, string>> = {}; const options: Record<string, string> = {};
  keys.forEach((k) => { const v = q.get(k); if (v) picks[k] = v; }); q.forEach((v, k) => { if (k.startsWith('o_')) options[k.slice(2)] = v; });
  return { space, picks, options, surface: (q.get('surface') as SurfaceKey) || undefined };
}
