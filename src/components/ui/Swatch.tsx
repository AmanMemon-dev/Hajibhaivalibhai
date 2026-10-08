import type { Swatch as S } from '@/types';
import { useId } from 'react';

/** Procedural placeholder imagery (no image files needed). Replace with <img> once real photography exists. */
function rnd(seed: number) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
export function Swatch({ swatch, seed = 1, className = '', label, width, height }: { swatch: S; seed?: number; className?: string; label?: string; width?: number | string; height?: number | string }) {
  const id = useId().replace(/:/g, '');
  const r = rnd(seed * 97 + 13); const { base, accent, pattern } = swatch;
  const els: React.ReactNode[] = [];
  const W = 400, H = 300;
  if (pattern === 'veins') for (let i = 0; i < 7; i++) { const y = r() * H; const d = `M-10 ${y} C ${W * .25} ${y + (r() - .5) * 140}, ${W * .6} ${y + (r() - .5) * 160}, ${W + 10} ${y + (r() - .5) * 120}`; els.push(<path key={i} d={d} stroke={accent} strokeWidth={0.6 + r() * 2.2} fill="none" opacity={0.25 + r() * 0.5} />); }
  if (pattern === 'speckle' || pattern === 'chip') for (let i = 0; i < (pattern === 'chip' ? 90 : 260); i++) els.push(<circle key={i} cx={r() * W} cy={r() * H} r={pattern === 'chip' ? 3 + r() * 9 : 0.5 + r() * 1.8} fill={r() > 0.5 ? accent : '#000'} opacity={pattern === 'chip' ? 0.35 : 0.2 + r() * 0.5} />);
  if (pattern === 'grain') for (let i = 0; i < 28; i++) { const y = (i / 28) * H + r() * 6; els.push(<path key={i} d={`M0 ${y} Q ${W / 2} ${y + (r() - .5) * 14} ${W} ${y + (r() - .5) * 8}`} stroke={accent} strokeWidth={0.5 + r() * 1.6} fill="none" opacity={0.25 + r() * 0.4} />); }
  if (pattern === 'grid') for (let i = 1; i < 4; i++) { els.push(<line key={'a' + i} x1={(W / 4) * i} y1={0} x2={(W / 4) * i} y2={H} stroke={accent} strokeWidth={2} opacity={0.6} />, <line key={'b' + i} x1={0} y1={(H / 3) * i} x2={W} y2={(H / 3) * i} stroke={accent} strokeWidth={2} opacity={0.6} />); }
  if (pattern === 'brick') for (let row = 0; row < 8; row++) for (let c = 0; c < 6; c++) els.push(<rect key={row + '-' + c} x={c * 70 - (row % 2 ? 35 : 0)} y={row * 38} width={66} height={34} fill={accent} opacity={0.18 + r() * 0.3} rx={2} />);
  if (pattern === 'stripe') for (let i = 0; i < 14; i++) els.push(<rect key={i} x={i * 30} y={0} width={14} height={H} fill={accent} opacity={0.18 + (i % 3) * 0.1} />);
  if (pattern === 'metal') for (let i = 0; i < 24; i++) els.push(<rect key={i} x={0} y={i * 12.5} width={W} height={1.5} fill="#fff" opacity={0.08 + r() * 0.12} />);
  if (pattern === 'ceramic') els.push(<ellipse key="e" cx={W * 0.5} cy={H * 0.55} rx={W * 0.32} ry={H * 0.28} fill={accent} opacity={0.55} />, <ellipse key="f" cx={W * 0.5} cy={H * 0.5} rx={W * 0.26} ry={H * 0.2} fill={base} opacity={0.9} />);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={width} height={height} preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={label || 'Material swatch'}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".16" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".2" /></linearGradient></defs>
      <rect width={W} height={H} fill={base} />{els}<rect width={W} height={H} fill={`url(#${id})`} />
    </svg>
  );
}
