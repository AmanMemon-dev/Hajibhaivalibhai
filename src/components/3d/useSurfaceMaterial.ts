'use client';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { PBRMaterial, SurfaceKey } from '@/types';
import { getMaterial, finishOptions } from '@/data/materials';
import { getSurfaceTexture, type TileOpts } from './textures';

export interface SurfaceOpts { pattern: string; tileSize: string; grout: string; groutWidth: string; }
const groutMm = { thin: 2, standard: 4, wide: 8 } as Record<string, number>;
const loader = typeof window !== 'undefined' ? new THREE.TextureLoader() : null;

/** Builds a MeshStandardMaterial for a configurator material on a surface of w×h metres. */
export function useSurfaceMaterial(id: string | undefined, surface: SurfaceKey, w: number, h: number, o: SurfaceOpts) {
  const m = getMaterial(id);
  const mat = useMemo(() => {
    const base = m ?? ({ id: 'none', name: 'None', kind: 'paint', surfaces: [], color: '#cccccc', roughness: 0.9, metalness: 0, repeat: [1, 1] } as PBRMaterial);
    const mm = new THREE.MeshStandardMaterial({ color: base.kind === 'paint' ? base.color : '#ffffff', roughness: base.roughness, metalness: base.metalness });
    const tileable = surface === 'floor' ? ['tile', 'marble', 'granite', 'stone', 'wood'].includes(base.kind) : base.kind === 'tile';
    const roof = surface === 'roof';
    const tiled: TileOpts | null = tileable ? { layout: (o.pattern as TileOpts['layout']) || 'straight', tileMm: Number(o.tileSize) || 600, groutHex: finishOptions.grout.find((g) => g.id === o.grout)?.hex ?? '#bdbab3', groutMm: groutMm[o.groutWidth] ?? 4 } : roof && base.pattern === 'tile' ? { layout: 'straight', tileMm: 300, groutHex: '#00000040'.slice(0, 7), groutMm: 6 } : null;
    if (base.texture && loader) { const t = loader.load(base.texture); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(base.repeat[0], base.repeat[1]); t.colorSpace = THREE.SRGBColorSpace; mm.map = t; mm.color.set('#fff'); if (base.normalMap) mm.normalMap = loader.load(base.normalMap); }
    else { const gt = getSurfaceTexture(base, tiled); if (gt) { const t = gt.tex.clone(); t.needsUpdate = true; t.repeat.set(Math.max(w / gt.coverage, 0.1), Math.max(h / gt.coverage, 0.1)); mm.map = t; if (base.kind === 'stone' || base.kind === 'concrete') { mm.bumpMap = t; mm.bumpScale = 0.6; } } }
    return mm;
  }, [m, surface, w, h, o.pattern, o.tileSize, o.grout, o.groutWidth]);
  useEffect(() => () => { mat.map?.dispose(); mat.dispose(); }, [mat]);
  return { mat, material: m };
}
