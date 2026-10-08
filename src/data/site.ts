/** Static site content (copy, steps, bundles, FAQ, timeline). Move to a CMS later. */
export const homeCategories = [
  { n: '01', name: 'Stone', href: '/materials/granite', desc: 'Granite, marble, sandstone, slate.', traits: ['Durable', 'Natural'], uses: 'Counters · Floors · Cladding', swatch: { base: '#2a2a2c', accent: '#8a8a90', pattern: 'speckle' } },
  { n: '02', name: 'Tiles', href: '/materials/tiles', desc: 'Porcelain in stone, wood and marble looks.', traits: ['Low upkeep', 'Wide sizes'], uses: 'Floors · Bathrooms · Outdoors', swatch: { base: '#d8d2c6', accent: '#a39b8d', pattern: 'grid' } },
  { n: '03', name: 'Cement', href: '/materials/cement', desc: 'OPC, PPC, white cement, adhesives.', traits: ['Graded', 'Consistent'], uses: 'RCC · Plaster · Tile fixing', swatch: { base: '#9a9a96', accent: '#6f6f6b', pattern: 'speckle' } },
  { n: '04', name: 'Steel', href: '/materials/steel', desc: 'TMT bars, channels, beams, tubes.', traits: ['Fe 500/550', 'Certified'], uses: 'Reinforcement · Frames', swatch: { base: '#4a4f55', accent: '#9aa1a8', pattern: 'metal' } },
  { n: '05', name: 'Aluminium', href: '/materials/aluminium', desc: 'Window, door and partition sections.', traits: ['Light', 'Corrosion-free'], uses: 'Windows · Façades', swatch: { base: '#b9bec4', accent: '#e5e8ea', pattern: 'metal' } },
  { n: '06', name: 'Plumbing', href: '/materials/plumbing', desc: 'CPVC, UPVC, fittings, tanks, pumps.', traits: ['Pressure rated', 'Complete systems'], uses: 'Water · Drainage', swatch: { base: '#d7dde2', accent: '#7f8c96', pattern: 'solid' } },
  { n: '07', name: 'Sanitaryware', href: '/materials/sanitaryware', desc: 'Basins, WCs, faucets, vanities.', traits: ['Finish-matched', 'Water-saving'], uses: 'Bathrooms · Washrooms', swatch: { base: '#f4f4f2', accent: '#c9ccd0', pattern: 'ceramic' } },
  { n: '08', name: 'Colours', href: '/materials/colours-finishes', desc: 'Paints, textures, putty, waterproofing.', traits: ['Washable', 'Weatherproof'], uses: 'Walls · Façades', swatch: { base: '#d9cbb3', accent: '#b48a60', pattern: 'stripe' } },
  { n: '09', name: 'Aggregates', href: '/materials/aggregates', desc: '10, 20, 40 mm, GSB, crush stone.', traits: ['Graded', 'Bulk supply'], uses: 'Concrete · Roads', swatch: { base: '#7d7a74', accent: '#bdb8ad', pattern: 'chip' } },
  { n: '10', name: 'Sand', href: '/materials/sand', desc: 'River, M-sand, plaster, filling.', traits: ['Low silt', 'Graded'], uses: 'Plaster · Concrete', swatch: { base: '#c9b48a', accent: '#a78f63', pattern: 'speckle' } },
] as const;

export const brands = ['Brand One', 'Brand Two', 'Brand Three', 'Brand Four', 'Brand Five', 'Brand Six', 'Brand Seven', 'Brand Eight']; // PLACEHOLDER
export const stats = [
  { label: 'Years of trading', value: 'XX+' }, { label: 'Products stocked', value: 'XX+' }, { label: 'Projects supplied', value: 'XX+' }, { label: 'Happy clients', value: 'XX+' },
]; // PLACEHOLDER figures — never invent numbers

export const bundles = [
  { id: 'bathroom', name: 'Complete Bathroom', desc: 'Tiles, sanitaryware, faucets, plumbing and accessories as one list.', items: [{ part: 'Wall tiles', cat: 'tiles', slug: 'carrara-marble-look-tile' }, { part: 'Floor tiles', cat: 'tiles', slug: 'slate-look-anti-skid-tile' }, { part: 'Basin', cat: 'sanitaryware', slug: 'cera-carly-table-top-basin' }, { part: 'WC', cat: 'sanitaryware', slug: 'cera-cuva-wall-hung-toilet' }, { part: 'Faucet', cat: 'sanitaryware', slug: 'cera-ripple-single-lever-basin-mixer' }, { part: 'Shower', cat: 'sanitaryware', slug: 'hindware-rain-shower-100-mm-square' }, { part: 'Pipes', cat: 'plumbing', slug: 'cpvc-hot-cold-pipe' }, { part: 'Accessories', cat: 'sanitaryware', slug: 'hindware-bath-accessories-combo-set' }] },
  { id: 'kitchen', name: 'Complete Kitchen', desc: 'Flooring, wall tiles, countertop, sink plumbing and finishing.', items: [{ part: 'Flooring', cat: 'tiles', slug: 'concrete-look-large-format' }, { part: 'Backsplash', cat: 'tiles', slug: 'subway-gloss-wall-tile' }, { part: 'Countertop', cat: 'granite', slug: 'premium-black-granite' }, { part: 'Adhesive', cat: 'cement', slug: 'ultratech-tilefixo-royal-nt' }, { part: 'Grout', cat: 'cement', slug: 'asian-paints-smartcare-epoxy-tile-grout' }, { part: 'Drain', cat: 'plumbing', slug: 'floor-drain-trap' }, { part: 'Paint', cat: 'colours-finishes', slug: 'silk-interior-emulsion' }] },
  { id: 'home', name: 'Complete Home', desc: 'From foundation to finish: structure, stone, tiles, colour and sanitary.', items: [{ part: 'Cement', cat: 'cement', slug: 'wonder-ppc-cement' }, { part: 'Steel', cat: 'steel', slug: 'german-tmt-fe-500d' }, { part: 'Sand', cat: 'sand', slug: 'm-sand-concrete-grade' }, { part: 'Aggregates', cat: 'aggregates', slug: '20-mm-aggregate' }, { part: 'Bricks', cat: 'bricks-blocks', slug: 'red-clay-brick-class-i' }, { part: 'Stone', cat: 'marble', slug: 'botticino-beige-marble' }, { part: 'Tiles', cat: 'tiles', slug: 'oak-plank-wood-look-tile' }, { part: 'Colours', cat: 'colours-finishes', slug: 'premium-interior-emulsion-matt' }, { part: 'Plumbing', cat: 'plumbing', slug: 'cpvc-hot-cold-pipe' }, { part: 'Sanitaryware', cat: 'sanitaryware', slug: 'cera-cuva-wall-hung-toilet' }] },
];

export const guide = {
  q1: ['New Home', 'Renovation', 'Commercial', 'Bathroom', 'Kitchen', 'Exterior'],
  q2: ['Modern', 'Luxury', 'Minimal', 'Natural', 'Industrial', 'Traditional'],
  /** Static recommendation rules. Replace with an API / AI advisor later. */
  recommend: (what: string, style: string): { slug: string; why: string }[] => {
    const base: Record<string, string[]> = {
      'New Home': ['cement', 'steel', 'sand', 'aggregates', 'bricks-blocks', 'tiles'],
      Renovation: ['tiles', 'colours-finishes', 'marble', 'sanitaryware'],
      Commercial: ['steel', 'aluminium', 'granite', 'tiles'],
      Bathroom: ['tiles', 'sanitaryware', 'plumbing'],
      Kitchen: ['granite', 'tiles', 'plumbing', 'colours-finishes'],
      Exterior: ['natural-stone', 'colours-finishes', 'aluminium', 'granite'],
    };
    const styleAdd: Record<string, string[]> = { Luxury: ['marble'], Natural: ['natural-stone'], Industrial: ['steel'], Modern: ['aluminium'], Minimal: ['tiles'], Traditional: ['natural-stone', 'marble'] };
    const out = Array.from(new Set([...(base[what] || []), ...(styleAdd[style] || [])]));
    return out.map((slug) => ({ slug, why: `Fits a ${style.toLowerCase()} ${what.toLowerCase()} project.` }));
  },
};

export const timeline = [
  { year: 'XXXX', title: 'Founded as a trading house', text: 'Placeholder: the family firm begins supplying building materials locally.' },
  { year: 'XXXX', title: 'Growing trusted supply', text: 'Placeholder: expansion into cement, steel and stone with long-term contractor relationships.' },
  { year: 'XXXX', title: 'Surfaces and finishes', text: 'Placeholder: tiles, sanitaryware and colours join the range.' },
  { year: 'Today', title: 'A digital material library', text: 'Browse, compare and visualise materials online — backed by decades of hands-on expertise.' },
]; // PLACEHOLDER dates and milestones

export const homeFaq = [
  { q: 'Do you publish prices online?', a: 'Prices vary by quantity, brand and delivery, so we prepare a tailored quote. Add materials to My Selection and request one.' },
  { q: 'Can I see materials before buying?', a: 'Yes. Visit the showroom for samples, or use the 3D Visualizer to preview combinations.' },
  { q: 'Do you supply to contractors and dealers?', a: 'Yes. Use the Trade page for bulk and project enquiries.' },
  { q: 'Do you deliver?', a: 'Placeholder: confirm delivery areas and lead times.' },
];

export const faqJson = homeFaq;
