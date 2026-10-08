'use client';
import { Suspense, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { materials, finishOptions, getMaterial } from '@/data/materials';
import { useSurfaceMaterial } from './useSurfaceMaterial';
import { Chip } from '@/components/ui';

type Obj = 'slab' | 'tile' | 'tap' | 'basin';
function Thing({ obj, matId, fixture }: { obj: Obj; matId: string; fixture: string }) {
  const o = { pattern: 'straight', tileSize: '600', grout: 'light', groutWidth: 'standard' };
  const { mat } = useSurfaceMaterial(matId, 'floor', obj === 'slab' ? 2.4 : 1.2, obj === 'slab' ? 1.2 : 1.2, o);
  const f = finishOptions.fixtures.find((x) => x.id === fixture) ?? finishOptions.fixtures[3];
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: f.hex, roughness: f.rough, metalness: f.metal }), [f]);
  const white = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f6f6f4', roughness: 0.1 }), []);
  if (obj === 'slab') return <mesh material={mat} castShadow receiveShadow rotation={[-0.3, 0.5, 0]}><boxGeometry args={[2.4, 0.18, 1.2]} /></mesh>;
  if (obj === 'tile') return <mesh material={mat} castShadow receiveShadow rotation={[-0.9, 0.4, 0]}><boxGeometry args={[1.5, 0.05, 1.5]} /></mesh>;
  if (obj === 'tap') return <group><mesh material={metal} position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.1, 0.12, 1.1, 32]} /></mesh><mesh material={metal} position={[0.35, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 0.75, 32]} /></mesh><mesh material={metal} position={[0.7, 0.4, 0]}><cylinderGeometry args={[0.07, 0.05, 0.3, 32]} /></mesh><mesh material={metal} position={[-0.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.06, 0.5, 0.06]} /></mesh></group>;
  return <group><mesh material={white} position={[0, -0.1, 0]} castShadow><cylinderGeometry args={[1.05, 0.55, 0.55, 48, 1, true]} /></mesh><mesh material={white} position={[0, -0.37, 0]}><cylinderGeometry args={[0.55, 0.55, 0.04, 48]} /></mesh><mesh material={white} position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.05, 0.06, 16, 64]} /></mesh><mesh material={metal} position={[0, 0.4, -0.95]}><cylinderGeometry args={[0.05, 0.05, 0.5, 24]} /></mesh></group>;
}

export default function MaterialExplorer() {
  const [obj, setObj] = useState<Obj>('slab'); const [mat, setMat] = useState('marble-carrara'); const [fix, setFix] = useState('chrome');
  const list = materials.filter((m) => ['marble', 'granite', 'tile', 'wood', 'stone'].includes(m.kind)).slice(0, 14);
  const m = getMaterial(mat);
  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] rounded-lg overflow-hidden bg-stone border hairline">
        <Canvas shadows dpr={[1, 1.6]} camera={{ position: [0, 1.2, 3.8], fov: 38 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping }} aria-label="3D material object — drag to rotate">
          <ambientLight intensity={0.6} /><directionalLight position={[3, 5, 3]} intensity={2} castShadow />
          <Suspense fallback={null}><Environment resolution={128} frames={1}><Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 5, 1]} rotation-x={Math.PI / 2} /><Lightformer form="rect" intensity={1.5} position={[-5, 2, 2]} scale={[5, 4, 1]} rotation-y={Math.PI / 2} /></Environment><Thing obj={obj} matId={mat} fixture={fix} /></Suspense>
          <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.2} minDistance={2.5} maxDistance={7} />
        </Canvas>
        <p className="absolute bottom-3 left-3 text-xs text-muted glass px-3 py-1 rounded">Drag to rotate · scroll to zoom</p>
      </div>
      <div>
        <p className="eyebrow mb-3">Object</p>
        <div className="flex flex-wrap gap-2">{(['slab', 'tile', 'tap', 'basin'] as Obj[]).map((o) => <Chip key={o} active={obj === o} onClick={() => setObj(o)}>{o[0].toUpperCase() + o.slice(1)}</Chip>)}</div>
        {(obj === 'slab' || obj === 'tile') && (<><p className="eyebrow mt-6 mb-3">Material</p><div className="grid grid-cols-5 gap-2">{list.map((x) => <button key={x.id} onClick={() => setMat(x.id)} aria-label={x.name} aria-pressed={mat === x.id} title={x.name} className={`aspect-square rounded border-2 ${mat === x.id ? 'border-accent' : 'border-transparent'}`} style={{ background: x.color }} />)}</div><p className="mt-3 font-display text-xl">{m?.name}</p><p className="text-sm text-muted capitalize">{m?.kind} · roughness {m?.roughness}</p></>)}
        {(obj === 'tap' || obj === 'basin') && (<><p className="eyebrow mt-6 mb-3">Finish</p><div className="flex flex-wrap gap-2">{finishOptions.fixtures.map((f) => <Chip key={f.id} active={fix === f.id} onClick={() => setFix(f.id)}>{f.label}</Chip>)}</div></>)}
      </div>
    </div>
  );
}
