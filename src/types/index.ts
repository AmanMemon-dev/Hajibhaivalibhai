/** Shared data models. Mirrored in /docs/data-models.md — keep in sync. */
export type Finish = 'Polished' | 'Matte' | 'Natural' | 'Textured' | 'Glossy' | 'Satin' | 'Honed';
export type Application = 'Floor' | 'Wall' | 'Kitchen' | 'Bathroom' | 'Exterior' | 'Commercial' | 'Structural' | 'Plumbing' | 'Finishing';
export type Style = 'Modern' | 'Minimal' | 'Luxury' | 'Natural' | 'Industrial' | 'Traditional';

export type SwatchPattern = 'solid' | 'veins' | 'speckle' | 'grain' | 'grid' | 'brick' | 'metal' | 'stripe' | 'chip' | 'ceramic';
export interface Swatch { base: string; accent: string; pattern: SwatchPattern; }

export interface Category {
  id: string; slug: string; name: string; group: string; tagline: string; intro: string;
  characteristics: string[]; applications: string[]; types: { name: string; note: string }[];
  buyingGuide: string[]; faqs: { q: string; a: string }[]; swatch: Swatch;
}

export interface Variant { id: string; label: string; colorHex?: string; }

export interface Product {
  id: string; slug: string; name: string; categorySlug: string; materialType: string;
  finish: Finish | string; color: string; colorHex: string;
  applications: Application[]; styles: Style[]; sizes: string[]; thickness?: string;
  indoorOutdoor: 'Indoor' | 'Outdoor' | 'Both';
  description: string; specifications: Record<string, string>; variants: Variant[];
  swatch: Swatch; images: string[]; imageFit?: 'cover' | 'contain'; texture?: string; materialId?: string;
  /** Reserved for backend-supplied pricing. Never hardcode. */
  price?: { amount: number; currency: string; unit: string };
  datasheetUrl?: string; // PLACEHOLDER: technical sheet link
}

export type SurfaceKey = 'floor' | 'wall' | 'counter' | 'accent' | 'exteriorWall' | 'cladding' | 'roof';
export interface PBRMaterial {
  id: string; name: string; kind: 'marble' | 'granite' | 'tile' | 'wood' | 'stone' | 'paint' | 'quartz' | 'metal' | 'concrete';
  surfaces: SurfaceKey[]; color: string; texture?: string; normalMap?: string;
  roughness: number; metalness: number; repeat: [number, number]; pattern?: 'noise' | 'veins' | 'grain' | 'speckle' | 'tile';
  productSlug?: string;
}

export type SpaceId = 'living' | 'kitchen' | 'bathroom' | 'bedroom' | 'exterior';
export interface SpaceDef { id: SpaceId; name: string; surfaces: { key: SurfaceKey; label: string }[]; fixtures: string[]; }

export interface Testimonial { id: string; name: string; role: string; quote: string; placeholder: true; }
export interface Post { slug: string; title: string; excerpt: string; category: string; readTime: string; body: { h?: string; p: string }[]; }
export interface Project { slug: string; title: string; type: string; location: string; summary: string; materials: string[]; swatch: Swatch; }
export interface InspirationSpace {
  slug: string; title: string; type: string; description: string; swatch: Swatch;
  used: { part: string; productSlug: string }[];
}

export interface QuoteItem { productSlug: string; productName: string; quantity?: string; size?: string; variant?: string; }
export interface QuoteRequest {
  items: QuoteItem[]; projectType: string; details?: string;
  contact: { name: string; phone: string; email: string; location: string };
  source: 'selection' | 'product' | 'configurator' | 'general'; createdAt: string;
}
export interface DesignSave {
  id: string; name: string; space: SpaceId; picks: Partial<Record<SurfaceKey, string>>; options: Record<string, string>; createdAt: string;
}
