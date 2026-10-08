'use client';
import { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { SpaceId, SurfaceKey } from '@/types';
import { RoomScene } from './Rooms';
import { isMobile } from './capabilities';

const cams: Record<SpaceId, { pos: [number, number, number]; target: [number, number, number]; max: number }> = {
  living: { pos: [5.4, 3.4, 6.2], target: [-0.2, 1.1, -0.2], max: 11 }, kitchen: { pos: [5.0, 3.2, 6.2], target: [0, 1.0, -0.3], max: 11 }, bathroom: { pos: [5.2, 3.4, 5.8], target: [0, 1.1, -0.4], max: 10 },
  bedroom: { pos: [5.4, 3.4, 6.0], target: [0, 1.0, -0.4], max: 11 }, exterior: { pos: [13, 6.5, 16], target: [-0.6, 1.5, 2], max: 30 },
};

function Invalidate({ deps }: { deps: unknown[] }) { const inv = useThree((s) => s.invalidate); useEffect(() => { inv(); const t = setTimeout(inv, 120); return () => clearTimeout(t); }, deps); return null; } // eslint-disable-line react-hooks/exhaustive-deps
function Capture({ capture }: { capture?: React.MutableRefObject<(() => string) | null> }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => { if (capture) capture.current = () => { gl.render(scene, camera); return gl.domElement.toDataURL('image/png'); }; return () => { if (capture) capture.current = null; }; }, [gl, scene, camera, capture]);
  return null;
}

export interface SceneProps {
  space: SpaceId; picks: Partial<Record<SurfaceKey, string>>; options: Record<string, string>; night: boolean; autoRotate: boolean; hotspots?: boolean;
  onSurface?: (s: SurfaceKey) => void; capture?: React.MutableRefObject<(() => string) | null>; onReady?: () => void;
}

export default function ConfiguratorScene({ space, picks, options, night, autoRotate, hotspots = true, onSurface, capture, onReady }: SceneProps) {
  const mobile = useMemo(() => isMobile(), []);
  const cam = cams[space];
  const sky = night ? '#0b1020' : space === 'exterior' ? '#cfe3f3' : '#e9e6e0';
  return (
    <Canvas shadows={!mobile} dpr={[1, mobile ? 1.5 : 2]} frameloop={autoRotate ? 'always' : 'demand'} camera={{ position: cam.pos, fov: 38, near: 0.1, far: 120 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: 'high-performance' }} onCreated={() => onReady?.()} aria-label="Interactive 3D room preview">
      <color attach="background" args={[sky]} />
      {space === 'exterior' && <fog attach="fog" args={[sky, 30, 70]} />}
      <ambientLight intensity={night ? 0.12 : 0.55} />
      <hemisphereLight args={[night ? '#3a4a7a' : '#ffffff', '#8a7f70', night ? 0.2 : 0.5]} />
      <directionalLight position={night ? [-4, 6, 3] : [5, 8, 4]} intensity={night ? 0.25 : 1.9} color={night ? '#8fa6e8' : '#fff4e0'} castShadow={!mobile} shadow-mapSize={[mobile ? 512 : 1536, mobile ? 512 : 1536]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} shadow-bias={-0.0005} />
      {night && space !== 'exterior' && (<><pointLight position={[0, 2.5, 0]} intensity={14} color="#ffcf8a" distance={9} decay={2} castShadow={false} /><pointLight position={[-1.5, 1.6, -1.2]} intensity={5} color="#ffd9a0" distance={6} decay={2} /></>)}
      {night && space === 'exterior' && <pointLight position={[0, 2.2, 5]} intensity={20} color="#ffcf8a" distance={14} decay={2} />}
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1} background={false}>
          <Lightformer form="rect" intensity={night ? 0.4 : 3} position={[0, 6, 2]} scale={[12, 6, 1]} rotation-x={Math.PI / 2} color={night ? '#6f86d6' : '#ffffff'} />
          <Lightformer form="rect" intensity={night ? 0.3 : 2} position={[-6, 2, 2]} scale={[6, 4, 1]} rotation-y={Math.PI / 2} color={night ? '#9db0f0' : '#fff2dd'} />
          <Lightformer form="ring" intensity={night ? 0.2 : 1.2} position={[5, 3, 6]} scale={4} color="#ffffff" />
        </Environment>
        <RoomScene space={space} picks={picks} options={options} night={night} interactive onSurface={onSurface} hotspots={hotspots} />
        {space !== 'exterior' && <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={12} blur={2.4} far={3} frames={1} />}
      </Suspense>
      <OrbitControls key={space} makeDefault enableDamping dampingFactor={0.08} autoRotate={autoRotate} autoRotateSpeed={0.8} target={cam.target} minDistance={2.5} maxDistance={cam.max} maxPolarAngle={Math.PI / 2.05} enablePan panSpeed={0.6} />
      <Invalidate deps={[space, picks, options, night, hotspots]} /><Capture capture={capture} />
    </Canvas>
  );
}
