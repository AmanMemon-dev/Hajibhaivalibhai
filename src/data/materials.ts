import type { PBRMaterial } from '@/types';

/**
 * Configurator materials. Edit this file (or serve the same JSON from a backend) to add materials.
 * `texture` / `normalMap` are optional image URLs under /public/textures; when absent a procedural texture
 * is generated from `color` + `pattern`, so everything works with zero image assets.
 */
export const materials: PBRMaterial[] = [
  // Marble
  { id: 'marble-carrara', name: 'Carrara White', kind: 'marble', surfaces: ['floor', 'wall', 'counter', 'accent'], color: '#ece9e3', roughness: 0.25, metalness: 0, repeat: [2, 2], pattern: 'veins', productSlug: 'carrara-white-marble' },
  { id: 'marble-nero', name: 'Nero Marquina', kind: 'marble', surfaces: ['floor', 'wall', 'counter', 'accent'], color: '#1c1c1e', roughness: 0.2, metalness: 0, repeat: [2, 2], pattern: 'veins', productSlug: 'nero-marquina-marble' },
  { id: 'marble-botticino', name: 'Botticino Beige', kind: 'marble', surfaces: ['floor', 'wall', 'counter'], color: '#cfbfa4', roughness: 0.35, metalness: 0, repeat: [2, 2], pattern: 'veins', productSlug: 'botticino-beige-marble' },
  { id: 'marble-emperador', name: 'Emperador Dark', kind: 'marble', surfaces: ['floor', 'wall', 'accent'], color: '#4b3426', roughness: 0.28, metalness: 0, repeat: [2, 2], pattern: 'veins', productSlug: 'emperador-dark-marble' },
  // Granite
  { id: 'granite-black', name: 'Absolute Black', kind: 'granite', surfaces: ['floor', 'counter', 'cladding', 'accent'], color: '#1b1b1d', roughness: 0.18, metalness: 0.05, repeat: [3, 3], pattern: 'speckle', productSlug: 'premium-black-granite' },
  { id: 'granite-kashmir', name: 'Kashmir White', kind: 'granite', surfaces: ['floor', 'counter', 'cladding'], color: '#d9d6cf', roughness: 0.25, metalness: 0, repeat: [3, 3], pattern: 'speckle', productSlug: 'kashmir-white-granite' },
  { id: 'granite-tan', name: 'Tan Brown', kind: 'granite', surfaces: ['floor', 'counter', 'cladding'], color: '#5a3a2a', roughness: 0.25, metalness: 0, repeat: [3, 3], pattern: 'speckle', productSlug: 'tan-brown-granite' },
  { id: 'granite-grey', name: 'Steel Grey', kind: 'granite', surfaces: ['floor', 'counter', 'cladding'], color: '#6a6d72', roughness: 0.4, metalness: 0, repeat: [3, 3], pattern: 'speckle', productSlug: 'steel-grey-granite' },
  // Tiles
  { id: 'tile-marble-look', name: 'Marble-look Porcelain', kind: 'tile', surfaces: ['floor', 'wall'], color: '#e8e5df', roughness: 0.3, metalness: 0, repeat: [4, 4], pattern: 'tile', productSlug: 'carrara-marble-look-tile' },
  { id: 'tile-concrete', name: 'Concrete-look Large Format', kind: 'tile', surfaces: ['floor', 'wall'], color: '#9a9a98', roughness: 0.7, metalness: 0, repeat: [3, 3], pattern: 'tile', productSlug: 'concrete-look-large-format' },
  { id: 'tile-terrazzo', name: 'Terrazzo', kind: 'tile', surfaces: ['floor', 'wall'], color: '#d7d0c4', roughness: 0.5, metalness: 0, repeat: [4, 4], pattern: 'speckle', productSlug: 'terrazzo-designer-tile' },
  { id: 'tile-slate', name: 'Slate-look Anti-skid', kind: 'tile', surfaces: ['floor', 'wall'], color: '#4a4d52', roughness: 0.85, metalness: 0, repeat: [4, 4], pattern: 'tile', productSlug: 'slate-look-anti-skid-tile' },
  { id: 'tile-subway', name: 'Subway Gloss', kind: 'tile', surfaces: ['wall', 'accent'], color: '#f0efec', roughness: 0.1, metalness: 0, repeat: [6, 6], pattern: 'tile', productSlug: 'subway-gloss-wall-tile' },
  { id: 'tile-emerald', name: 'Emerald Gloss', kind: 'tile', surfaces: ['wall', 'accent'], color: '#2f5e4e', roughness: 0.1, metalness: 0, repeat: [6, 6], pattern: 'tile', productSlug: 'emerald-kitchen-tile' },
  // Wood-look
  { id: 'wood-oak', name: 'Oak Plank', kind: 'wood', surfaces: ['floor', 'wall'], color: '#a77b52', roughness: 0.6, metalness: 0, repeat: [3, 3], pattern: 'grain', productSlug: 'oak-plank-wood-look-tile' },
  { id: 'wood-walnut', name: 'Walnut Plank', kind: 'wood', surfaces: ['floor', 'wall'], color: '#5e4230', roughness: 0.55, metalness: 0, repeat: [3, 3], pattern: 'grain' },
  // Stone
  { id: 'stone-kota', name: 'Kota Blue', kind: 'stone', surfaces: ['floor', 'cladding'], color: '#6d7a7d', roughness: 0.8, metalness: 0, repeat: [3, 3], pattern: 'grain', productSlug: 'kota-blue-stone' },
  { id: 'stone-sandstone', name: 'Agra Red Sandstone', kind: 'stone', surfaces: ['cladding', 'floor', 'wall'], color: '#a34b3a', roughness: 0.9, metalness: 0, repeat: [3, 3], pattern: 'grain', productSlug: 'agra-red-sandstone' },
  { id: 'stone-slate', name: 'Black Slate', kind: 'stone', surfaces: ['cladding', 'wall'], color: '#2c2f33', roughness: 0.85, metalness: 0, repeat: [3, 3], pattern: 'grain', productSlug: 'black-slate-cladding' },
  { id: 'stone-limestone', name: 'Jaisalmer Limestone', kind: 'stone', surfaces: ['cladding', 'floor', 'wall'], color: '#d3b873', roughness: 0.85, metalness: 0, repeat: [3, 3], pattern: 'grain', productSlug: 'jaisalmer-yellow-limestone' },
  // Quartz-style
  { id: 'quartz-white', name: 'Quartz White', kind: 'quartz', surfaces: ['counter'], color: '#f2f1ee', roughness: 0.15, metalness: 0, repeat: [2, 2], pattern: 'speckle' },
  { id: 'quartz-grey', name: 'Quartz Graphite', kind: 'quartz', surfaces: ['counter'], color: '#4a4c50', roughness: 0.15, metalness: 0, repeat: [2, 2], pattern: 'speckle' },
  // Paints
  { id: 'paint-warm-white', name: 'Warm White', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#efe9dc', roughness: 0.9, metalness: 0, repeat: [1, 1], productSlug: 'asian-paints-royale-luxury-emulsion' },
  { id: 'paint-greige', name: 'Greige', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#cfc6b8', roughness: 0.85, metalness: 0, repeat: [1, 1], productSlug: 'jsw-halo-majestic-interiors-silk' },
  { id: 'paint-sage', name: 'Sage Green', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#9aa58c', roughness: 0.9, metalness: 0, repeat: [1, 1], productSlug: 'nerolac-impressions-kashmir-luxury-emulsion' },
  { id: 'paint-terracotta', name: 'Terracotta', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#b9654a', roughness: 0.9, metalness: 0, repeat: [1, 1], productSlug: 'asian-paints-ace-exterior-emulsion' },
  { id: 'paint-navy', name: 'Deep Navy', kind: 'paint', surfaces: ['wall', 'accent'], color: '#26344a', roughness: 0.9, metalness: 0, repeat: [1, 1] },
  { id: 'paint-charcoal', name: 'Charcoal', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#3a3c40', roughness: 0.9, metalness: 0, repeat: [1, 1] },
  { id: 'paint-blush', name: 'Blush', kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: '#dcbfb2', roughness: 0.9, metalness: 0, repeat: [1, 1] },
  // Roof
  { id: 'roof-terracotta', name: 'Clay Tile Roof', kind: 'tile', surfaces: ['roof'], color: '#a8523a', roughness: 0.8, metalness: 0, repeat: [6, 6], pattern: 'tile' },
  { id: 'roof-slate', name: 'Slate Roof', kind: 'stone', surfaces: ['roof'], color: '#3a3e44', roughness: 0.8, metalness: 0, repeat: [6, 6], pattern: 'tile' },
  { id: 'roof-metal', name: 'Standing-seam Metal', kind: 'metal', surfaces: ['roof'], color: '#7b8087', roughness: 0.4, metalness: 0.8, repeat: [8, 1], pattern: 'tile' },
  // Exterior concrete
  { id: 'concrete-board', name: 'Board-form Concrete', kind: 'concrete', surfaces: ['exteriorWall', 'cladding'], color: '#9b9a96', roughness: 0.95, metalness: 0, repeat: [2, 2], pattern: 'grain' },
];

export const finishOptions = {
  fixtures: [
    { id: 'white', label: 'White', hex: '#f4f4f2', metal: 0.0, rough: 0.15 },
    { id: 'black', label: 'Matte black', hex: '#1c1d1f', metal: 0.6, rough: 0.5 },
    { id: 'gold', label: 'Brushed gold', hex: '#b89a5a', metal: 1.0, rough: 0.3 },
    { id: 'chrome', label: 'Chrome', hex: '#d6dade', metal: 1.0, rough: 0.08 },
  ],
  frames: [
    { id: 'anodised', label: 'Anodised silver', hex: '#b9bec4', metal: 0.9, rough: 0.35 },
    { id: 'black', label: 'Powder-coat black', hex: '#222326', metal: 0.4, rough: 0.5 },
    { id: 'bronze', label: 'Bronze', hex: '#6a5440', metal: 0.7, rough: 0.4 },
    { id: 'white', label: 'Powder-coat white', hex: '#eceded', metal: 0.2, rough: 0.5 },
  ],
  grout: [
    { id: 'light', label: 'Light grey', hex: '#bdbab3' },
    { id: 'dark', label: 'Charcoal', hex: '#3b3c3f' },
    { id: 'white', label: 'White', hex: '#f1f0ec' },
    { id: 'sand', label: 'Sand', hex: '#b9a98a' },
  ],
  patterns: ['straight', 'diagonal', 'herringbone', 'checker'] as const,
  tileSizes: ['300', '600', '800'] as const,
  groutWidths: ['thin', 'standard', 'wide'] as const,
};
/** Supports curated ids and custom paint ids of the form `custom:#rrggbb:matte|satin|gloss`. */
export function getMaterial(id?: string): PBRMaterial | undefined {
  if (!id) return undefined;
  if (id.startsWith('custom:')) {
    const [, hex, fin = 'matte'] = id.split(':');
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return undefined;
    const rough = fin === 'gloss' ? 0.2 : fin === 'satin' ? 0.5 : 0.9;
    return { id, name: `Custom ${hex.toUpperCase()} (${fin})`, kind: 'paint', surfaces: ['wall', 'exteriorWall', 'accent'], color: hex, roughness: rough, metalness: 0, repeat: [1, 1] };
  }
  return materials.find((m) => m.id === id);
}
