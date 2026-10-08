'use client';
import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { Html, RoundedBox } from '@react-three/drei';
import type { SpaceId, SurfaceKey } from '@/types';
import { useSurfaceMaterial, type SurfaceOpts } from './useSurfaceMaterial';
import { finishOptions, getMaterial } from '@/data/materials';
import { useConfigurator } from '@/store';
import { products } from '@/data/products';
import Link from 'next/link';

export interface RoomProps { picks: Partial<Record<SurfaceKey, string>>; options: Record<string, string>; night: boolean; interactive?: boolean; onSurface?: (s: SurfaceKey) => void; hotspots?: boolean; }

/* ================= primitives ================= */
type V3 = [number, number, number];
const WOOD = '#8a6a4d', WOOD_D = '#5b4333', WHITE = '#f3f1ec';

function Box({ p, s, c = '#bbb', r = 0.7, m = 0, rot, shadow = true, opacity }: { p: V3; s: V3; c?: string; r?: number; m?: number; rot?: V3; shadow?: boolean; opacity?: number }) {
  return <mesh position={p} rotation={rot} castShadow={shadow} receiveShadow><boxGeometry args={s} /><meshStandardMaterial color={c} roughness={r} metalness={m} transparent={opacity !== undefined} opacity={opacity ?? 1} depthWrite={opacity === undefined} /></mesh>;
}
/** Soft-edged box for furniture and cabinetry. */
function RB({ p, s, c = '#bbb', r = 0.6, m = 0, rad = 0.04, rot, shadow = true }: { p: V3; s: V3; c?: string; r?: number; m?: number; rad?: number; rot?: V3; shadow?: boolean }) {
  return <RoundedBox args={s} radius={Math.max(0.002, Math.min(rad, Math.min(...s) / 2 - 0.002))} smoothness={3} position={p} rotation={rot} castShadow={shadow} receiveShadow><meshStandardMaterial color={c} roughness={r} metalness={m} /></RoundedBox>;
}
function Cyl({ p, r, h, c = '#fff', rough = 0.4, m = 0, seg = 28, rot, emissive }: { p: V3; r: number | [number, number]; h: number; c?: string; rough?: number; m?: number; seg?: number; rot?: V3; emissive?: string }) {
  const [rt, rb] = Array.isArray(r) ? r : [r, r];
  return <mesh position={p} rotation={rot} castShadow receiveShadow><cylinderGeometry args={[rt, rb, h, seg]} /><meshStandardMaterial color={c} roughness={rough} metalness={m} emissive={emissive ?? '#000'} emissiveIntensity={emissive ? 0.6 : 0} /></mesh>;
}
function Ball({ p, s, c, rough = 0.9 }: { p: V3; s: V3; c: string; rough?: number }) {
  return <mesh position={p} scale={s} castShadow><sphereGeometry args={[1, 14, 12]} /><meshStandardMaterial color={c} roughness={rough} /></mesh>;
}
const opts = (o: Record<string, string>): SurfaceOpts => ({ pattern: o.pattern, tileSize: o.tileSize, grout: o.grout, groutWidth: o.groutWidth });
const fx = (o: Record<string, string>) => finishOptions.fixtures.find((f) => f.id === o.fixture) ?? finishOptions.fixtures[3];
const metalOf = (o: Record<string, string>) => { const f = fx(o); return { c: f.hex, rough: f.rough, m: f.metal }; };

/* ================= configurable surface ================= */
/** A configurable box surface with click-to-select and an optional info hotspot. */
function Surface({ id, k, size, pos, rot, o, props, hotspotAt, label }: { id?: string; k: SurfaceKey; size: V3; pos: V3; rot?: V3; o: Record<string, string>; props: RoomProps; hotspotAt?: V3; label?: string }) {
  const flat = size[1] < 0.2 && size[1] <= Math.min(size[0], size[2]);
  const wd = flat ? size[0] : Math.max(size[0], size[2]); const hd = flat ? size[2] : size[1];
  const { mat, material } = useSurfaceMaterial(id, k, wd, hd, opts(o));
  const sel = useConfigurator((s) => s.surface);
  return (
    <group>
      <mesh position={pos} rotation={rot} receiveShadow castShadow material={mat}
        onPointerOver={props.interactive ? (e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; } : undefined}
        onPointerOut={props.interactive ? () => { document.body.style.cursor = ''; } : undefined}
        onClick={props.interactive ? (e) => { e.stopPropagation(); props.onSurface?.(k); } : undefined}>
        <boxGeometry args={size} />
      </mesh>
      {props.hotspots && material && hotspotAt && <Hotspot at={hotspotAt} materialId={material.id} label={label} active={sel === k} />}
    </group>
  );
}

function Hotspot({ at, materialId, label, active }: { at: V3; materialId: string; label?: string; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const m = getMaterial(materialId); const prod = m?.productSlug ? products.find((p) => p.slug === m.productSlug) : undefined;
  if (!m) return null;
  return (
    <Html position={at} center zIndexRange={[20, 0]} style={{ pointerEvents: 'auto' }}>
      <div className="relative">
        <button onClick={() => setOpen(!open)} aria-label={`Details: ${m.name}`} aria-expanded={open} className={`h-7 w-7 rounded-full border-2 border-white shadow-lg grid place-items-center text-[11px] font-bold ${active ? 'bg-[#D63F12] text-white' : 'bg-black/70 text-white'} hover:scale-110 transition-transform`}>{open ? '×' : '+'}</button>
        {open && (
          <div className="absolute left-9 top-1/2 -translate-y-1/2 w-56 rounded-lg bg-[rgb(var(--surface))] text-[rgb(var(--ink))] border border-[rgb(var(--line))] shadow-2xl p-3 text-left z-50">
            <p className="text-[10px] uppercase tracking-widest text-[rgb(var(--muted))]">{label}</p>
            <p className="font-display text-lg leading-tight">{m.name}</p>
            <p className="text-xs text-[rgb(var(--muted))] mt-1 capitalize">{m.kind}{prod ? ` · ${prod.finish}` : ''}</p>
            <div className="mt-3 flex gap-2">
              {prod && <Link href={`/materials/${prod.categorySlug}/${prod.slug}/`} className="min-h-[36px] px-3 inline-flex items-center justify-center flex-1 text-xs rounded bg-[#D63F12] text-white">View details</Link>}
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}

/* ================= building blocks ================= */
/** Glazed window with aluminium frame, mullion and sill. Faces +z; rotate [0, π/2, 0] for the left wall. */
function Window({ o, p, s, rot }: { o: Record<string, string>; p: V3; s: [number, number]; rot?: V3 }) {
  const f = finishOptions.frames.find((x) => x.id === o.frame) ?? finishOptions.frames[1]; const t = 0.05; const mat = { c: f.hex, r: f.rough, m: f.metal };
  return (
    <group position={p} rotation={rot}>
      <Box p={[0, 0, 0]} s={[s[0] - 0.08, s[1] - 0.08, 0.012]} c="#bcd6e6" r={0.04} m={0.1} opacity={0.38} shadow={false} />
      <Box p={[0, s[1] / 2 - t / 2, 0]} s={[s[0], t, 0.12]} {...mat} /><Box p={[0, -s[1] / 2 + t / 2, 0]} s={[s[0], t, 0.12]} {...mat} />
      <Box p={[s[0] / 2 - t / 2, 0, 0]} s={[t, s[1], 0.12]} {...mat} /><Box p={[-s[0] / 2 + t / 2, 0, 0]} s={[t, s[1], 0.12]} {...mat} />
      <Box p={[0, 0, 0]} s={[0.035, s[1] - 0.06, 0.09]} {...mat} />
      <Box p={[0, -s[1] / 2 - 0.02, 0.07]} s={[s[0] + 0.14, 0.04, 0.2]} c="#e9e6df" r={0.6} />
    </group>
  );
}
function Plant({ p, k = 1 }: { p: V3; k?: number }) {
  return (
    <group position={p} scale={k}>
      <Cyl p={[0, 0.17, 0]} r={[0.17, 0.12]} h={0.34} c="#d9d2c5" rough={0.7} />
      {[[0, 0.62, 0, 0.2, 0.34, 0.2], [0.12, 0.5, 0.06, 0.1, 0.26, 0.1], [-0.12, 0.54, -0.05, 0.1, 0.28, 0.1], [0.04, 0.46, -0.13, 0.1, 0.22, 0.1], [-0.06, 0.78, 0.04, 0.12, 0.24, 0.12]].map(([x, y, z, a, b, c], i) => <Ball key={i} p={[x, y, z]} s={[a, b, c]} c={i % 2 ? '#4e7a3a' : '#5d8a45'} />)}
    </group>
  );
}
function Lamp({ p, night, h = 1.55 }: { p: V3; night: boolean; h?: number }) {
  return (
    <group position={p}>
      <Cyl p={[0, 0.02, 0]} r={0.15} h={0.04} c="#26272a" m={0.4} /><Cyl p={[0, h / 2, 0]} r={0.012} h={h} c="#26272a" m={0.5} />
      <Cyl p={[0, h + 0.06, 0]} r={[0.13, 0.2]} h={0.26} c={night ? '#ffe3a8' : '#f4efe6'} rough={0.9} emissive={night ? '#ffcf8a' : undefined} />
    </group>
  );
}
function Handle({ p, vertical = false, c = '#b9bcc0' }: { p: V3; vertical?: boolean; c?: string }) {
  return <Box p={p} s={vertical ? [0.014, 0.16, 0.018] : [0.16, 0.014, 0.018]} c={c} m={0.9} r={0.3} shadow={false} />;
}
/** A run of cabinet doors facing +z. */
function Doors({ x0, x1, y, h, z, n, c, vertical = false }: { x0: number; x1: number; y: number; h: number; z: number; n: number; c: string; vertical?: boolean }) {
  const w = (x1 - x0) / n;
  return <>{Array.from({ length: n }).map((_, i) => { const cx = x0 + w * (i + 0.5); return <group key={i}><RB p={[cx, y, z]} s={[w - 0.012, h, 0.022]} c={c} r={0.45} rad={0.008} /><Handle p={[cx + (vertical ? w / 2 - 0.05 : 0), y + (vertical ? 0 : h / 2 - 0.07), z + 0.02]} vertical={vertical} /></group>; })}</>;
}
function Faucet({ o, p, rot = 0, tall = false }: { o: Record<string, string>; p: V3; rot?: number; tall?: boolean }) {
  const f = fx(o); const H = tall ? 0.3 : 0.2;
  return <group position={p} rotation={[0, rot, 0]}><Cyl p={[0, H / 2, 0]} r={0.02} h={H} c={f.hex} rough={f.rough} m={f.metal} /><Box p={[0, H, 0.07]} s={[0.026, 0.026, 0.17]} c={f.hex} r={f.rough} m={f.metal} /><Box p={[0.06, 0.07, 0]} s={[0.07, 0.016, 0.016]} c={f.hex} r={f.rough} m={f.metal} /></group>;
}

/* ================= room shell ================= */
const RW = 5, RD = 4, RH = 2.8;
interface Win { z: number; w: number; sill: number; h: number }
/** Floor slab, back wall, left wall (with optional window opening) and skirting. */
function Shell({ props, win, accent, floorHotspot = [0.9, 0.05, 1.2], skirting = true }: { props: RoomProps; win?: Win; accent?: { w: number; h: number; x: number }; floorHotspot?: V3; skirting?: boolean }) {
  const o = props.options; const p = props.picks; const lx = -RW / 2 - 0.05;
  const seg = (key: string, z: number, y: number, len: number, hh: number, hs?: V3) => <Surface key={key} k="wall" id={p.wall} size={[0.1, hh, len]} pos={[lx, y, z]} o={o} props={props} hotspotAt={hs} label="Walls" />;
  return (
    <group>
      <Box p={[-0.05, -0.2, 0]} s={[RW + 0.3, 0.2, RD + 0.3]} c="#34363a" r={0.8} />
      <Surface k="floor" id={p.floor} size={[RW, 0.1, RD]} pos={[0, -0.05, 0]} o={o} props={props} hotspotAt={floorHotspot} label="Floor" />
      <Surface k="wall" id={p.wall} size={[RW + 0.1, RH, 0.1]} pos={[-0.05, RH / 2, -RD / 2 - 0.05]} o={o} props={props} hotspotAt={[-2.1, 2.45, -RD / 2 + 0.05]} label="Walls" />
      {!win && seg('l', 0, RH / 2, RD, RH)}
      {win && (() => {
        const z1 = win.z - win.w / 2, z2 = win.z + win.w / 2, top = win.sill + win.h;
        return <>
          {seg('b', 0, win.sill / 2, RD, win.sill)}{seg('t', 0, top + (RH - top) / 2, RD, RH - top)}
          {seg('s1', (-RD / 2 + z1) / 2, win.sill + win.h / 2, z1 + RD / 2, win.h, [lx + 0.05, 2.35, -1.3])}{seg('s2', (z2 + RD / 2) / 2, win.sill + win.h / 2, RD / 2 - z2, win.h)}
          <Window o={o} p={[lx, win.sill + win.h / 2, win.z]} s={[win.w, win.h]} rot={[0, Math.PI / 2, 0]} />
        </>;
      })()}
      {accent && <Surface k="accent" id={p.accent} size={[accent.w, accent.h, 0.04]} pos={[accent.x, accent.h / 2 + 0.02, -RD / 2 + 0.02]} o={o} props={props} hotspotAt={[accent.x + accent.w / 2 - 0.25, accent.h - 0.35, -RD / 2 + 0.1]} label="Feature wall" />}
      {skirting && <><Box p={[0, 0.045, -RD / 2 + 0.01]} s={[RW, 0.09, 0.02]} c={WHITE} r={0.5} shadow={false} /><Box p={[-RW / 2 + 0.01, 0.045, 0]} s={[0.02, 0.09, RD]} c={WHITE} r={0.5} shadow={false} /></>}
    </group>
  );
}

/* ================= living room ================= */
function Living(props: RoomProps) {
  const n = props.night;
  return (
    <group>
      <Shell props={props} win={{ z: 0.5, w: 1.9, sill: 0.7, h: 1.6 }} accent={{ w: 3.4, h: 2.45, x: -0.2 }} />
      {/* curtains */}
      <Box p={[-RW / 2 + 0.07, 2.5, 0.5]} s={[0.03, 0.03, 2.6]} c="#2a2b2e" m={0.6} /><RB p={[-RW / 2 + 0.1, 1.28, -0.7]} s={[0.05, 2.4, 0.5]} c="#e4ded2" r={0.95} rad={0.02} /><RB p={[-RW / 2 + 0.1, 1.28, 1.7]} s={[0.05, 2.4, 0.5]} c="#e4ded2" r={0.95} rad={0.02} />
      {/* rug */}
      <RB p={[-0.3, 0.012, 0.1]} s={[3.0, 0.024, 2.0]} c="#d6ccba" r={1} rad={0.01} shadow={false} /><Box p={[-0.3, 0.026, 0.1]} s={[2.6, 0.004, 1.6]} c="#c3b79f" r={1} shadow={false} />
      {/* sofa */}
      <RB p={[-0.3, 0.2, -1.5]} s={[2.5, 0.22, 1.0]} c="#5f6368" r={0.9} rad={0.03} />
      <RB p={[-0.3, 0.33, -1.5]} s={[2.5, 0.2, 0.96]} c="#8b9096" r={0.95} rad={0.08} />
      <RB p={[-0.3, 0.72, -1.9]} s={[2.5, 0.62, 0.22]} c="#838890" r={0.95} rad={0.1} />
      <RB p={[-1.5, 0.5, -1.5]} s={[0.24, 0.6, 1.0]} c="#7a7f86" r={0.95} rad={0.1} /><RB p={[0.9, 0.5, -1.5]} s={[0.24, 0.6, 1.0]} c="#7a7f86" r={0.95} rad={0.1} />
      {[-0.95, -0.3, 0.35].map((x, i) => <group key={i}><RB p={[x, 0.5, -1.45]} s={[0.62, 0.14, 0.78]} c="#9aa0a7" r={0.95} rad={0.06} /><RB p={[x, 0.78, -1.74]} s={[0.6, 0.42, 0.16]} c="#9aa0a7" r={0.95} rad={0.07} rot={[-0.18, 0, 0]} /></group>)}
      <RB p={[-1.2, 0.62, -1.3]} s={[0.38, 0.38, 0.12]} c="#c9a35a" r={0.9} rad={0.05} rot={[0, 0.4, 0.15]} /><RB p={[0.55, 0.62, -1.3]} s={[0.38, 0.38, 0.12]} c="#6f8a7a" r={0.9} rad={0.05} rot={[0, -0.4, -0.12]} />
      {/* coffee table */}
      <Cyl p={[-0.3, 0.38, 0.15]} r={0.52} h={0.04} c="#3a2f26" rough={0.35} /><Cyl p={[-0.3, 0.19, 0.15]} r={[0.08, 0.28]} h={0.36} c="#2a2a2c" rough={0.4} m={0.5} />
      <RB p={[-0.45, 0.43, 0.1]} s={[0.3, 0.04, 0.22]} c="#c9a35a" rad={0.01} rot={[0, 0.3, 0]} /><Cyl p={[-0.1, 0.46, 0.22]} r={0.05} h={0.1} c="#e7e1d6" rough={0.2} />
      {/* armchair */}
      <group position={[1.65, 0, 0.35]} rotation={[0, -0.9, 0]}>
        <RB p={[0, 0.22, 0]} s={[0.9, 0.3, 0.9]} c="#a97c52" r={0.85} rad={0.08} /><RB p={[0, 0.5, -0.38]} s={[0.9, 0.6, 0.16]} c="#a97c52" r={0.85} rad={0.09} /><RB p={[0, 0.4, 0.02]} s={[0.7, 0.14, 0.68]} c="#b98c60" r={0.9} rad={0.06} />
        <RB p={[-0.42, 0.42, 0]} s={[0.12, 0.3, 0.82]} c="#9a6f48" r={0.85} rad={0.05} /><RB p={[0.42, 0.42, 0]} s={[0.12, 0.3, 0.82]} c="#9a6f48" r={0.85} rad={0.05} />
      </group>
      {/* sideboard, art and decor */}
      <RB p={[1.85, 0.4, -1.72]} s={[1.3, 0.62, 0.5]} c={WOOD_D} r={0.5} rad={0.02} /><Doors x0={1.2} x1={2.5} y={0.4} h={0.56} z={-1.46} n={3} c="#6b5040" vertical />
      <Cyl p={[1.5, 0.82, -1.72]} r={[0.07, 0.1]} h={0.26} c="#e8e2d6" rough={0.3} /><Plant p={[2.1, 0.71, -1.72]} k={0.55} />
      {[-1.1, -0.4, 0.3].map((x, i) => <group key={i}><Box p={[x, 1.6, -1.94]} s={[0.5, 0.7, 0.03]} c="#ece8df" r={0.5} /><Box p={[x, 1.6, -1.925]} s={[0.4, 0.6, 0.01]} c={['#b8893b', '#4f6b5e', '#8a4f3a'][i]} r={0.9} shadow={false} /></group>)}
      <Lamp p={[-2.0, 0, -1.75]} night={n} /><Plant p={[-2.1, 0, 1.6]} k={1.4} />
    </group>
  );
}

/* ================= kitchen ================= */
function Kitchen(props: RoomProps) {
  const p = props.picks; const o = props.options; const f = fx(o); const base = '#e4dfd4'; const dark = '#2f3337';
  return (
    <group>
      <Shell props={props} win={{ z: 0.9, w: 1.4, sill: 1.0, h: 1.2 }} floorHotspot={[0.4, 0.05, 1.5]} skirting={false} />
      {/* base cabinets along back wall (x -2.4 → 1.65) */}
      <RB p={[-0.375, 0.4, -1.7]} s={[4.05, 0.74, 0.6]} c={base} r={0.6} rad={0.01} /><Box p={[-0.375, 0.04, -1.66]} s={[4.0, 0.08, 0.5]} c="#222" shadow={false} />
      <Doors x0={-2.4} x1={1.65} y={0.42} h={0.68} z={-1.39} n={7} c="#efeae0" />
      <Surface k="counter" id={p.counter} size={[4.1, 0.04, 0.66]} pos={[-0.375, 0.79, -1.67]} o={o} props={props} hotspotAt={[-1.9, 0.9, -1.55]} label="Countertop" />
      <Surface k="accent" id={p.accent} size={[4.1, 0.66, 0.04]} pos={[-0.375, 1.14, -RD / 2 + 0.02]} o={o} props={props} hotspotAt={[-2.1, 1.14, -RD / 2 + 0.1]} label="Backsplash" />
      {/* wall units + hood */}
      <RB p={[-1.05, 1.95, -1.82]} s={[2.7, 0.8, 0.34]} c={base} r={0.6} rad={0.01} /><Doors x0={-2.4} x1={0.3} y={1.95} h={0.76} z={-1.64} n={5} c="#efeae0" vertical />
      <Box p={[1.0, 1.9, -1.9]} s={[0.4, 0.8, 0.2]} c="#c7cbd0" m={0.8} r={0.3} /><RB p={[1.0, 1.62, -1.78]} s={[0.9, 0.14, 0.42]} c="#d3d7db" m={0.8} r={0.3} rad={0.02} />
      {/* sink + faucet + cooktop */}
      <Box p={[-1.3, 0.815, -1.67]} s={[0.78, 0.012, 0.44]} c="#aeb4ba" m={0.9} r={0.25} /><Box p={[-1.3, 0.822, -1.67]} s={[0.66, 0.012, 0.34]} c="#7e858c" m={0.9} r={0.35} /><Faucet o={o} p={[-1.3, 0.81, -1.9]} tall />
      <Box p={[1.0, 0.815, -1.67]} s={[0.62, 0.012, 0.5]} c="#0f1012" m={0.3} r={0.1} />
      {[[-0.14, -0.11], [0.14, -0.11], [-0.14, 0.11], [0.14, 0.11]].map(([dx, dz], i) => <Cyl key={i} p={[1.0 + dx, 0.826, -1.67 + dz]} r={i < 2 ? 0.09 : 0.065} h={0.012} c="#3a3c40" m={0.7} rough={0.4} />)}
      {/* fridge */}
      <RB p={[2.05, 0.92, -1.68]} s={[0.78, 1.84, 0.66]} c="#cfd3d8" m={0.6} r={0.3} rad={0.03} /><Box p={[2.05, 1.18, -1.34]} s={[0.76, 0.01, 0.02]} c="#444" shadow={false} /><Handle p={[1.76, 1.45, -1.33]} vertical c="#8a9096" /><Handle p={[1.76, 0.85, -1.33]} vertical c="#8a9096" />
      {/* island */}
      <RB p={[0, 0.43, 0.55]} s={[2.0, 0.82, 0.8]} c={dark} r={0.55} rad={0.015} /><Doors x0={-1} x1={1} y={0.43} h={0.7} z={0.96} n={4} c="#3a3f44" vertical />
      <Surface k="counter" id={p.counter} size={[2.2, 0.05, 0.98]} pos={[0, 0.845, 0.55]} o={o} props={props} hotspotAt={[0.9, 0.95, 0.7]} label="Island top" />
      {[-0.55, 0.55].map((x) => <group key={x}><Cyl p={[x, 0.62, 1.3]} r={0.17} h={0.06} c="#b8893b" rough={0.6} /><Cyl p={[x, 0.31, 1.3]} r={0.02} h={0.62} c="#222" m={0.6} /><Cyl p={[x, 0.03, 1.3]} r={0.14} h={0.02} c="#222" m={0.6} /></group>)}
      {[-0.5, 0.5].map((x) => <group key={x}><Cyl p={[x, 2.1, 0.55]} r={0.005} h={1.4} c="#222" /><Cyl p={[x, 1.55, 0.55]} r={[0.07, 0.17]} h={0.2} c={f.hex} m={f.metal} rough={f.rough} /></group>)}
      <Cyl p={[0.5, 0.9, 0.6]} r={0.11} h={0.1} c="#c75b39" rough={0.5} /><Cyl p={[-0.4, 0.88, 0.5]} r={[0.1, 0.13]} h={0.07} c="#e8e2d6" rough={0.3} />
      <Plant p={[-2.1, 0, 1.6]} k={1.2} />
    </group>
  );
}

/* ================= bathroom ================= */
function Bathroom(props: RoomProps) {
  const p = props.picks; const o = props.options; const f = fx(o); const mt = metalOf(o);
  return (
    <group>
      <Shell props={props} win={{ z: 0.6, w: 0.9, sill: 1.45, h: 0.7 }} accent={{ w: 2.8, h: 2.5, x: -1.0 }} floorHotspot={[0.3, 0.05, 0.9]} skirting={false} />
      {/* vanity */}
      <RB p={[-1.4, 0.37, -1.7]} s={[1.6, 0.7, 0.55]} c={WOOD} r={0.5} rad={0.015} /><Doors x0={-2.2} x1={-0.6} y={0.38} h={0.62} z={-1.42} n={2} c="#9a7658" />
      <Surface k="counter" id={p.counter} size={[1.68, 0.04, 0.62]} pos={[-1.4, 0.74, -1.68]} o={o} props={props} hotspotAt={[-0.75, 0.86, -1.55]} label="Vanity top" />
      <Cyl p={[-1.4, 0.83, -1.66]} r={[0.26, 0.19]} h={0.15} c="#f7f7f5" rough={0.08} /><Faucet o={o} p={[-1.4, 0.76, -1.9]} tall />
      {/* mirror + sconces */}
      <Box p={[-1.4, 1.6, -1.97]} s={[1.1, 1.0, 0.025]} c="#cfdbe2" r={0.04} m={0.4} /><Box p={[-1.4, 1.6, -1.96]} s={[1.18, 1.08, 0.02]} c={mt.c} r={mt.rough} m={mt.m} shadow={false} />
      {[-2.15, -0.65].map((x) => <group key={x}><Cyl p={[x, 1.9, -1.93]} r={0.03} h={0.2} {...mt} /><Cyl p={[x, 1.9, -1.9]} r={0.045} h={0.12} c="#fff3d6" emissive={props.night ? '#ffcf8a' : undefined} rot={[Math.PI / 2, 0, 0]} /></group>)}
      <Box p={[-1.4, 0.98, -1.93]} s={[0.4, 0.03, 0.08]} c="#e9e6df" />
      {/* WC */}
      <RB p={[0.35, 0.65, -1.88]} s={[0.46, 0.5, 0.2]} c="#f7f7f5" r={0.1} rad={0.05} /><RB p={[0.35, 0.24, -1.62]} s={[0.4, 0.34, 0.56]} c="#f7f7f5" r={0.1} rad={0.12} /><RB p={[0.35, 0.43, -1.6]} s={[0.4, 0.04, 0.54]} c="#eceae5" r={0.2} rad={0.02} />
      <Cyl p={[0.35, 0.92, -1.88]} r={0.035} h={0.02} {...mt} />
      {/* shower enclosure */}
      <Box p={[1.85, 0.015, -1.2]} s={[1.3, 0.03, 1.6]} c="#c8c6c0" r={0.3} shadow={false} /><Cyl p={[1.9, 0.035, -1.3]} r={0.07} h={0.01} {...mt} />
      <Box p={[1.2, 1.05, -1.2]} s={[0.02, 2.1, 1.6]} c="#cfe6f2" r={0.04} opacity={0.28} shadow={false} /><Box p={[1.85, 1.05, -0.4]} s={[1.3, 2.1, 0.02]} c="#cfe6f2" r={0.04} opacity={0.28} shadow={false} />
      <Box p={[1.2, 2.1, -1.2]} s={[0.04, 0.04, 1.6]} c={mt.c} r={mt.rough} m={mt.m} /><Box p={[1.85, 2.1, -0.4]} s={[1.3, 0.04, 0.04]} c={mt.c} r={mt.rough} m={mt.m} /><Box p={[1.2, 1.05, -0.4]} s={[0.04, 2.1, 0.04]} c={mt.c} r={mt.rough} m={mt.m} /><Handle p={[1.4, 1.0, -0.38]} vertical c={f.hex} />
      <Cyl p={[2.1, 2.1, -1.88]} r={0.014} h={0.4} {...mt} rot={[Math.PI / 2, 0, 0]} /><Cyl p={[2.1, 2.07, -1.64]} r={0.14} h={0.025} {...mt} />
      <Cyl p={[1.6, 1.15, -1.97]} r={0.05} h={0.03} {...mt} rot={[Math.PI / 2, 0, 0]} />
      {/* towel rail + towels + bathmat */}
      <Box p={[-RW / 2 + 0.07, 1.25, -0.5]} s={[0.04, 0.04, 0.7]} c={mt.c} r={mt.rough} m={mt.m} /><RB p={[-RW / 2 + 0.1, 1.0, -0.5]} s={[0.05, 0.5, 0.4]} c="#e8e4dc" r={0.95} rad={0.02} />
      <RB p={[0.4, 0.012, -0.9]} s={[0.9, 0.024, 0.55]} c="#d2cabb" r={1} rad={0.01} shadow={false} />
      <Plant p={[-2.1, 0, 1.7]} k={0.9} />
    </group>
  );
}

/* ================= bedroom ================= */
function Bedroom(props: RoomProps) {
  const n = props.night;
  return (
    <group>
      <Shell props={props} win={{ z: 0.9, w: 1.7, sill: 0.8, h: 1.5 }} accent={{ w: 2.9, h: 2.3, x: 0.3 }} />
      <Box p={[-RW / 2 + 0.07, 2.5, 0.9]} s={[0.03, 0.03, 2.5]} c="#2a2b2e" m={0.6} /><RB p={[-RW / 2 + 0.1, 1.28, -0.2]} s={[0.05, 2.4, 0.5]} c="#d9d3c6" r={0.95} rad={0.02} /><RB p={[-RW / 2 + 0.1, 1.28, 2.0]} s={[0.05, 2.4, 0.4]} c="#d9d3c6" r={0.95} rad={0.02} />
      <RB p={[0.3, 0.012, 0.15]} s={[3.0, 0.024, 2.0]} c="#cfc5b3" r={1} rad={0.01} shadow={false} />
      {/* bed */}
      <RB p={[0.3, 0.18, -0.9]} s={[1.9, 0.3, 2.2]} c={WOOD_D} r={0.55} rad={0.03} />
      <RB p={[0.3, 0.8, -1.94]} s={[2.0, 1.0, 0.1]} c="#a68a73" r={0.95} rad={0.05} />
      <RB p={[0.3, 0.46, -0.88]} s={[1.8, 0.24, 2.05]} c="#f2efe9" r={0.95} rad={0.08} />
      <RB p={[0.3, 0.6, -0.15]} s={[1.84, 0.09, 1.28]} c="#8fa08c" r={0.95} rad={0.04} /><RB p={[0.3, 0.66, 0.05]} s={[1.86, 0.06, 0.4]} c="#cbb89a" r={0.95} rad={0.03} />
      {[-0.4, 1.0].map((x, i) => <RB key={i} p={[x, 0.66, -1.62]} s={[0.7, 0.16, 0.42]} c={i ? '#e9e3d6' : '#fbfaf7'} r={0.95} rad={0.07} rot={[-0.2, 0, 0]} />)}
      <RB p={[0.3, 0.7, -1.3]} s={[0.4, 0.14, 0.3]} c="#c9a35a" r={0.95} rad={0.06} />
      {/* bench */}
      <RB p={[0.3, 0.22, 0.4]} s={[1.5, 0.12, 0.42]} c="#6f6358" r={0.9} rad={0.05} />{[-0.65, 0.65].map((x) => <Box key={x} p={[0.3 + x, 0.08, 0.4]} s={[0.05, 0.16, 0.36]} c="#222" m={0.5} />)}
      {/* nightstands */}
      {[-1.0, 1.6].map((x) => <group key={x}><RB p={[x, 0.27, -1.72]} s={[0.5, 0.54, 0.42]} c={WOOD} r={0.5} rad={0.02} /><Box p={[x, 0.36, -1.5]} s={[0.4, 0.01, 0.01]} c="#222" shadow={false} /><Handle p={[x, 0.45, -1.5]} /><Handle p={[x, 0.27, -1.5]} /><Cyl p={[x, 0.59, -1.72]} r={0.012} h={0.1} c="#222" m={0.5} /><Cyl p={[x, 0.76, -1.72]} r={[0.09, 0.14]} h={0.2} c={n ? '#ffe3a8' : '#f1ece2'} rough={0.9} emissive={n ? '#ffcf8a' : undefined} /></group>)}
      {/* wardrobe */}
      <RB p={[-1.95, 1.12, -1.68]} s={[1.0, 2.24, 0.6]} c="#d9d3c6" r={0.55} rad={0.015} /><Doors x0={-2.45} x1={-1.45} y={1.12} h={2.18} z={-1.37} n={2} c="#e6e1d6" vertical />
      <Plant p={[2.1, 0, 1.3]} k={1.3} />
      {[[-0.5, 1.7], [0.3, 1.9], [1.1, 1.7]].map(([x, y], i) => <group key={i}><Box p={[x, y, -1.94]} s={[0.4, i === 1 ? 0.55 : 0.4, 0.03]} c="#efece4" /><Box p={[x, y, -1.925]} s={[0.3, i === 1 ? 0.45 : 0.3, 0.01]} c={['#b8893b', '#8a4f3a', '#4f6b5e'][i]} r={0.9} shadow={false} /></group>)}
    </group>
  );
}

/* ================= exterior ================= */
function Exterior(props: RoomProps) {
  const p = props.picks; const o = props.options;
  const door = finishOptions.frames.find((f) => f.id === o.frame) ?? finishOptions.frames[1];
  // gable roof: two slopes of length L rising `rise` over half-depth `d`, ridge along x
  const d = 2.85, rise = 1.45, L = Math.hypot(d, rise), ang = Math.atan2(rise, d), eaveY = 3.18;
  // wall-coloured gable ends that follow the roof line
  const gable = useMemo(() => {
    const s = new THREE.Shape(); s.moveTo(-2.3, 0); s.lineTo(2.3, 0); s.lineTo(2.3, 0.26); s.lineTo(0, 1.43); s.lineTo(-2.3, 0.26); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: false }); const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 4.6, uv.getY(i) / 1.4); return g;
  }, []);
  const { mat: wallMat } = useSurfaceMaterial(p.exteriorWall, 'exteriorWall', 4.6, 1.4, opts(o));
  return (
    <group>
      {/* ground, lawn, forecourt + path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 2]} receiveShadow><planeGeometry args={[40, 30]} /><meshStandardMaterial color="#7a9a5f" roughness={1} /></mesh>
      <Surface k="floor" id={p.floor} size={[7.2, 0.1, 3.8]} pos={[0.2, 0, 4.4]} o={o} props={props} hotspotAt={[0.2, 0.2, 4.4]} label="Paving" />
      <Surface k="floor" id={p.floor} size={[1.3, 0.1, 3.0]} pos={[-0.35, 0, 7.7]} o={o} props={props} />
      {/* main house */}
      <Surface k="exteriorWall" id={p.exteriorWall} size={[7, 3.2, 4.6]} pos={[0, 1.6, 0]} o={o} props={props} hotspotAt={[3.5, 2.7, 1.4]} label="Wall colour" />
      <Surface k="cladding" id={p.cladding} size={[7.06, 0.45, 4.66]} pos={[0, 0.22, 0]} o={o} props={props} />
      <Box p={[0, 3.2, 0]} s={[7.1, 0.06, 4.7]} c="#f1eee8" r={0.6} />
      {/* stone-clad feature volume */}
      <Surface k="cladding" id={p.cladding} size={[2.2, 2.7, 3.0]} pos={[-4.6, 1.35, 0.9]} o={o} props={props} hotspotAt={[-4.6, 2.3, 2.45]} label="Stone cladding" />
      <Box p={[-4.6, 2.76, 0.9]} s={[2.5, 0.12, 3.3]} c="#e8e5df" r={0.5} />
      {/* gable roof */}
      {[1, -1].map((sg) => <Surface key={sg} k="roof" id={p.roof} size={[7.9, 0.14, L]} pos={[0, eaveY + rise / 2 + 0.05, (sg * d) / 2]} rot={[sg * ang, 0, 0]} o={o} props={props} hotspotAt={sg === 1 ? [1.6, 4.4, 1.2] : undefined} label="Roof" />)}
      <Surface k="roof" id={p.roof} size={[7.9, 0.22, 0.36]} pos={[0, eaveY + rise + 0.12, 0]} o={o} props={props} />
      <mesh geometry={gable} material={wallMat} position={[3.3, 3.2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow />
      <mesh geometry={gable} material={wallMat} position={[-3.5, 3.2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow />
      {/* front facade: door, canopy, steps, windows */}
      <Box p={[-0.4, 1.1, 2.32]} s={[1.05, 2.2, 0.08]} c={door.hex} r={door.rough} m={door.metal} /><Box p={[-0.05, 1.05, 2.38]} s={[0.03, 0.6, 0.03]} c="#b9bcc0" m={0.9} /><Box p={[-0.4, 1.1, 2.3]} s={[1.2, 2.3, 0.04]} c="#efece6" shadow={false} />
      <Box p={[-0.4, 2.5, 3.0]} s={[1.9, 0.09, 1.5]} c="#efece6" r={0.5} /><Box p={[0.5, 1.25, 3.7]} s={[0.07, 2.5, 0.07]} c="#222" m={0.5} /><Box p={[-1.3, 1.25, 3.7]} s={[0.07, 2.5, 0.07]} c="#222" m={0.5} />
      <Box p={[-0.4, 0.07, 3.05]} s={[1.9, 0.1, 1.5]} c="#c8c5be" r={0.9} /><Box p={[-0.4, 0.12, 2.65]} s={[1.9, 0.1, 0.7]} c="#d2cfc8" r={0.9} />
      <Window o={o} p={[1.45, 1.75, 2.3]} s={[1.2, 1.5]} /><Window o={o} p={[2.9, 1.75, 2.3]} s={[1.2, 1.5]} /><Window o={o} p={[-2.2, 1.75, 2.3]} s={[1.3, 1.5]} />
      <Window o={o} p={[3.5, 1.75, -0.6]} s={[1.2, 1.5]} rot={[0, Math.PI / 2, 0]} /><Window o={o} p={[3.5, 1.75, 1.0]} s={[1.2, 1.5]} rot={[0, Math.PI / 2, 0]} />
      {/* compound wall + gate pillars */}
      <Box p={[-4.7, 0.45, 6.4]} s={[6.6, 0.9, 0.2]} c="#e9e6df" r={0.8} /><Box p={[4.36, 0.45, 6.4]} s={[7.3, 0.9, 0.2]} c="#e9e6df" r={0.8} />
      <Box p={[-1.25, 0.8, 6.4]} s={[0.35, 1.6, 0.35]} c="#e0dcd3" r={0.7} /><Box p={[0.55, 0.8, 6.4]} s={[0.35, 1.6, 0.35]} c="#e0dcd3" r={0.7} />
      {/* planting */}
      {[[-3.3, 2.7], [-2.7, 2.7], [3.0, 2.7], [3.8, 2.7]].map(([x, z], i) => <Ball key={i} p={[x, 0.3, z]} s={[0.4, 0.34, 0.4]} c={i % 2 ? '#4e7a3a' : '#5d8a45'} />)}
      {[[-7, 3.5, 1.1], [7, 3, 1.0], [-6, -4, 1.3], [6.5, -3.5, 1.2]].map(([x, z, k], i) => <group key={i} position={[x, 0, z]} scale={k}><Cyl p={[0, 0.8, 0]} r={0.12} h={1.6} c="#5a4632" /><Ball p={[0, 2.1, 0]} s={[1, 1.05, 1]} c="#4e7a3a" /><Ball p={[0.5, 1.8, 0.3]} s={[0.6, 0.6, 0.6]} c="#5d8a45" /></group>)}
    </group>
  );
}

export function RoomScene({ space, ...props }: RoomProps & { space: SpaceId }) {
  switch (space) {
    case 'kitchen': return <Kitchen {...props} />;
    case 'bathroom': return <Bathroom {...props} />;
    case 'bedroom': return <Bedroom {...props} />;
    case 'exterior': return <Exterior {...props} />;
    default: return <Living {...props} />;
  }
}
