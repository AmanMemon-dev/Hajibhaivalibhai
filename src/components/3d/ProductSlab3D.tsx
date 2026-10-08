'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useSurfaceMaterial } from './useSurfaceMaterial';

function Slab({ id }: { id: string }) { const { mat } = useSurfaceMaterial(id, 'counter', 2.4, 1.2, { pattern: 'straight', tileSize: '600', grout: 'light', groutWidth: 'standard' }); return <mesh material={mat} castShadow rotation={[-0.35, 0.5, 0]}><boxGeometry args={[2.4, 0.16, 1.3]} /></mesh>; }
export default function ProductSlab3D({ materialId }: { materialId: string }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 1.4, 3.6], fov: 38 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping }} aria-label="3D slab — drag to rotate">
      <ambientLight intensity={0.7} /><directionalLight position={[3, 4, 3]} intensity={2} />
      <Suspense fallback={null}><Environment resolution={128} frames={1}><Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 5, 1]} rotation-x={Math.PI / 2} /></Environment><Slab id={materialId} /></Suspense>
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.4} minDistance={2.5} maxDistance={6} />
    </Canvas>
  );
}
