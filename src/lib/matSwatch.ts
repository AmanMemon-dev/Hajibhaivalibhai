import type { PBRMaterial, Swatch } from '@/types';
export function matSwatch(m?: PBRMaterial): Swatch {
  if (!m) return { base: '#ccc', accent: '#999', pattern: 'solid' };
  const n = parseInt(m.color.slice(1), 16); const l = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  const mix = (v: number) => Math.max(0, Math.min(255, Math.round(v + (l > 0.5 ? -70 : 80))));
  const accent = `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => mix(v).toString(16).padStart(2, '0')).join('')}`;
  const pattern = m.kind === 'wood' ? 'grain' : m.pattern === 'veins' ? 'veins' : m.pattern === 'speckle' ? 'speckle' : m.pattern === 'grain' ? 'grain' : m.pattern === 'tile' ? 'grid' : 'solid';
  return { base: m.color, accent, pattern };
}
