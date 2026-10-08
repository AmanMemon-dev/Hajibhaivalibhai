import * as THREE from 'three';
import type { PBRMaterial } from '@/types';

/**
 * Procedural PBR textures drawn on <canvas> so the configurator works with zero image assets.
 * If PBRMaterial.texture / normalMap URLs are provided they are loaded instead (see useSurfaceMaterial).
 */
function rng(seed: number) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
const hash = (str: string) => { let h = 7; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h || 1; };
export function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16); const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
}
const lum = (hex: string) => { const n = parseInt(hex.slice(1), 16); return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };

/** Draw the intrinsic look of a material (stone/wood/etc.) onto a square canvas. */
function drawStone(size: number, m: PBRMaterial, seed: number): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d')!; const r = rng(seed);
  x.fillStyle = m.color; x.fillRect(0, 0, size, size);
  const dark = lum(m.color) > 0.5 ? 'rgba(60,60,60,' : 'rgba(255,255,255,'; const light = lum(m.color) > 0.5 ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
  const p = m.pattern ?? 'noise';
  if (p === 'veins') for (let i = 0; i < 9; i++) { x.beginPath(); let px = -10, py = r() * size; x.moveTo(px, py); for (let k = 0; k < 6; k++) { px += size / 5; py += (r() - 0.5) * size * 0.35; x.quadraticCurveTo(px - size / 10, py + (r() - 0.5) * 60, px, py); } x.strokeStyle = `${dark}${0.12 + r() * 0.35})`; x.lineWidth = 0.5 + r() * 3.5; x.stroke(); }
  if (p === 'speckle') for (let i = 0; i < size * 6; i++) { x.fillStyle = r() > 0.5 ? `${dark}${0.15 + r() * 0.4})` : `${light}${0.1 + r() * 0.3})`; const s = 0.5 + r() * 2.2; x.fillRect(r() * size, r() * size, s, s); }
  if (p === 'grain') for (let i = 0; i < size / 2.5; i++) { const y = r() * size; x.beginPath(); x.moveTo(0, y); x.bezierCurveTo(size * 0.3, y + (r() - 0.5) * 12, size * 0.7, y + (r() - 0.5) * 12, size, y + (r() - 0.5) * 8); x.strokeStyle = `${dark}${0.05 + r() * 0.22})`; x.lineWidth = 0.4 + r() * 2.2; x.stroke(); }
  // overall mottling
  for (let i = 0; i < 40; i++) { const g = x.createRadialGradient(r() * size, r() * size, 0, r() * size, r() * size, size * (0.1 + r() * 0.3)); g.addColorStop(0, `${r() > 0.5 ? dark : light}0.06)`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, size, size); }
  return c;
}

export interface TileOpts { layout: 'straight' | 'diagonal' | 'herringbone' | 'checker'; groutHex: string; groutMm: number; tileMm: number; }

/** Returns { canvas, coverage } where coverage is the real-world metre span of one canvas repeat. */
export function drawTiled(m: PBRMaterial, o: TileOpts, seed: number): { canvas: HTMLCanvasElement; coverage: number } {
  const S = 1024; const c = document.createElement('canvas'); c.width = c.height = S; const x = c.getContext('2d')!;
  const stone = drawStone(512, m, seed); const r = rng(seed + 5); const tile = o.tileMm / 1000;
  x.fillStyle = o.groutHex; x.fillRect(0, 0, S, S);
  const paint = (cx: number, cy: number, w: number, h: number, ang: number, tone = 0) => {
    const g = (o.groutMm / o.tileMm) * Math.max(w, h) * (o.layout === 'herringbone' ? 2 : 1);
    x.save(); x.translate(cx, cy); x.rotate(ang); x.beginPath(); x.rect(-(w - g) / 2, -(h - g) / 2, w - g, h - g); x.clip();
    const sx = r() * 256, sy = r() * 256; x.drawImage(stone, sx, sy, 256, 256, -w / 2, -h / 2, w, h);
    x.fillStyle = tone > 0 ? `rgba(255,255,255,${tone})` : `rgba(0,0,0,${-tone})`; x.fillRect(-w / 2, -h / 2, w, h); x.restore();
  };
  let coverage = 4 * tile;
  if (o.layout === 'straight' || o.layout === 'checker') {
    const n = 4, t = S / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) paint(i * t + t / 2, j * t + t / 2, t, t, 0, o.layout === 'checker' ? ((i + j) % 2 ? 0.1 : -0.12) : (r() - 0.5) * 0.06);
  } else if (o.layout === 'diagonal') {
    const k = 3, s = S / (k * Math.SQRT2); coverage = k * Math.SQRT2 * tile;
    const v1 = [s * Math.SQRT1_2, s * Math.SQRT1_2], v2 = [-s * Math.SQRT1_2, s * Math.SQRT1_2];
    for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) { const px = i * v1[0] + j * v2[0], py = i * v1[1] + j * v2[1]; if (px > -s && px < S + s && py > -s && py < S + s) paint(px, py, s, s, Math.PI / 4, (r() - 0.5) * 0.06); }
  } else {
    // 90° herringbone, planks 2:1, cell period = 4 plank-widths
    const w = S / 4; coverage = 2 * tile;
    for (let i = -4; i < 8; i++) {
      // H plank at (i,i)-(i+1,i) for each i, plus periodic copies shifted by 4 in x
      for (let sx = -1; sx <= 1; sx++) for (let sy = -1; sy <= 1; sy++) {
        const hx = (i) * w + sx * S, hy = (i) * w + sy * S; paint(hx + w, hy + w / 2, 2 * w, w, 0, (r() - 0.5) * 0.07);
        const vx = (i + 2) * w + sx * S, vy = (i - 1) * w + sy * S; paint(vx + w / 2, vy + w, w, 2 * w, 0, (r() - 0.5) * 0.07);
      }
    }
  }
  return { canvas: c, coverage };
}

const cache = new Map<string, { tex: THREE.CanvasTexture; coverage: number }>();
export function getSurfaceTexture(m: PBRMaterial, tiled: TileOpts | null): { tex: THREE.CanvasTexture; coverage: number } | null {
  if (m.kind === 'paint') return null;
  const key = `${m.id}|${m.color}|${tiled ? `${tiled.layout}-${tiled.tileMm}-${tiled.groutHex}-${tiled.groutMm}` : 'slab'}`;
  const hit = cache.get(key); if (hit) return hit;
  const seed = hash(m.id);
  let canvas: HTMLCanvasElement, coverage: number;
  if (tiled) ({ canvas, coverage } = drawTiled(m, tiled, seed)); else { canvas = drawStone(1024, m, seed); coverage = m.kind === 'tile' ? 0.6 : 2.4; }
  const tex = new THREE.CanvasTexture(canvas); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const out = { tex, coverage }; cache.set(key, out); return out;
}
