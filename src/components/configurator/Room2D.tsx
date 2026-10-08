'use client';
import type { SpaceId, SurfaceKey } from '@/types';
import { getMaterial, finishOptions } from '@/data/materials';
import { matSwatch } from '@/lib/matSwatch';
import { Swatch } from '@/components/ui/Swatch';
import { useId } from 'react';

/** 2D fallback preview: same data, no WebGL. Used for no-WebGL, low-power and reduced-motion users. */
export function Room2D({ space, picks, options, night }: { space: SpaceId; picks: Partial<Record<SurfaceKey, string>>; options: Record<string, string>; night: boolean }) {
  const uid = useId().replace(/:/g, '');
  const surf = (k: SurfaceKey) => ({ m: getMaterial(picks[k]), sw: matSwatch(getMaterial(picks[k])) });
  const keys: SurfaceKey[] = space === 'exterior' ? ['exteriorWall', 'cladding', 'floor', 'roof'] : ['floor', 'wall', 'accent', 'counter'];
  const fill = (k: SurfaceKey) => `url(#${uid}-${k})`;
  const dim = night ? 0.55 : 0;
  const frame = finishOptions.frames.find((f) => f.id === options.frame)?.hex ?? '#222';
  return (
    <svg viewBox="0 0 800 520" className="w-full h-full" role="img" aria-label={`2D preview of ${space}`} preserveAspectRatio="xMidYMid slice">
      <defs>{keys.map((k) => <pattern key={k} id={`${uid}-${k}`} patternUnits="userSpaceOnUse" width="200" height="150"><Swatch swatch={surf(k).sw} seed={k.length} width={200} height={150} /></pattern>)}</defs>
      <rect width="800" height="520" fill={night ? '#0b1020' : space === 'exterior' ? '#cfe3f3' : '#e9e6e0'} />
      {space === 'exterior' ? (<>
        <rect y="400" width="800" height="120" fill="#6d8a55" /><polygon points="260,420 560,420 620,500 200,500" fill={fill('floor')} />
        <rect x="200" y="200" width="400" height="220" fill={fill('exteriorWall')} /><rect x="200" y="200" width="130" height="220" fill={fill('cladding')} /><rect x="200" y="380" width="400" height="40" fill={fill('cladding')} />
        <polygon points="170,205 400,110 630,205" fill={fill('roof')} /><rect x="360" y="260" width="70" height="80" fill="#a9c9e0" stroke={frame} strokeWidth="6" /><rect x="470" y="260" width="70" height="80" fill="#a9c9e0" stroke={frame} strokeWidth="6" /><rect x="250" y="300" width="60" height="120" fill={frame} />
      </>) : (<>
        <polygon points="60,120 740,120 740,360 60,360" fill={fill('wall')} />
        {picks.accent && <rect x="200" y="140" width="400" height="200" fill={fill('accent')} />}
        <polygon points="60,360 740,360 800,520 0,520" fill={fill('floor')} />
        {(space === 'kitchen' || space === 'bathroom') && <><rect x="140" y="300" width="520" height="46" fill={fill('counter')} /><rect x="140" y="346" width="520" height="60" fill="#d9d3c7" /></>}
        {space === 'living' && <rect x="230" y="300" width="340" height="70" rx="8" fill="#8b8f94" />}
        {space === 'bedroom' && <rect x="250" y="290" width="300" height="90" rx="6" fill="#f1eee8" stroke="#6b5444" strokeWidth="10" />}
      </>)}
      <rect width="800" height="520" fill="#000" opacity={dim} />
    </svg>
  );
}
