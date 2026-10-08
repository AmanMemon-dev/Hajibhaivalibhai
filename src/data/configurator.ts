import type { SpaceDef, SpaceId, SurfaceKey } from '@/types';

export const spaces: SpaceDef[] = [
  { id: 'living', name: 'Living Room', surfaces: [{ key: 'floor', label: 'Floor' }, { key: 'wall', label: 'Walls' }, { key: 'accent', label: 'Feature wall' }], fixtures: [] },
  { id: 'kitchen', name: 'Kitchen', surfaces: [{ key: 'floor', label: 'Floor' }, { key: 'wall', label: 'Walls' }, { key: 'counter', label: 'Countertop' }, { key: 'accent', label: 'Backsplash' }], fixtures: ['Faucet'] },
  { id: 'bathroom', name: 'Bathroom', surfaces: [{ key: 'floor', label: 'Floor' }, { key: 'wall', label: 'Walls' }, { key: 'accent', label: 'Feature wall' }, { key: 'counter', label: 'Vanity top' }], fixtures: ['Faucet', 'Shower', 'Accessories'] },
  { id: 'bedroom', name: 'Bedroom', surfaces: [{ key: 'floor', label: 'Floor' }, { key: 'wall', label: 'Walls' }, { key: 'accent', label: 'Headboard wall' }], fixtures: [] },
  { id: 'exterior', name: 'Exterior', surfaces: [{ key: 'exteriorWall', label: 'Wall colour' }, { key: 'cladding', label: 'Stone cladding' }, { key: 'floor', label: 'Ground / paving' }, { key: 'roof', label: 'Roof' }], fixtures: ['Window frames'] },
];

export const defaultPicks: Record<SpaceId, Partial<Record<SurfaceKey, string>>> = {
  living: { floor: 'marble-botticino', wall: 'paint-warm-white', accent: 'stone-slate' },
  kitchen: { floor: 'tile-concrete', wall: 'paint-warm-white', counter: 'granite-black', accent: 'tile-subway' },
  bathroom: { floor: 'tile-slate', wall: 'tile-marble-look', accent: 'marble-nero', counter: 'quartz-white' },
  bedroom: { floor: 'wood-oak', wall: 'paint-greige', accent: 'paint-sage' },
  exterior: { exteriorWall: 'paint-warm-white', cladding: 'stone-limestone', floor: 'stone-kota', roof: 'roof-terracotta' },
};
export const defaultOptions: Record<string, string> = { fixture: 'chrome', frame: 'black', grout: 'light', pattern: 'straight', tileSize: '600', groutWidth: 'standard' };
