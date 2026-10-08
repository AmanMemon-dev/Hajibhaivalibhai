import type { Product, Application, Style, Swatch, SwatchPattern } from '@/types';

/**
 * Catalogue data. Add products by appending a row to the matching category below.
 * Row: [name, materialType, finish, colour, hex, accentHex, pattern, applications, styles, description]
 * Applications: F=Floor W=Wall K=Kitchen B=Bathroom E=Exterior C=Commercial S=Structural P=Plumbing N=Finishing
 * Styles: M=Modern m=Minimal L=Luxury N=Natural I=Industrial T=Traditional
 * NOTE: sample copy — specifications are indicative, confirm with supplier datasheets before publishing.
 */
type Row = [string, string, string, string, string, string, SwatchPattern, string, string, string];

const A: Record<string, Application> = { F: 'Floor', W: 'Wall', K: 'Kitchen', B: 'Bathroom', E: 'Exterior', C: 'Commercial', S: 'Structural', P: 'Plumbing', N: 'Finishing' };
const S: Record<string, Style> = { M: 'Modern', m: 'Minimal', L: 'Luxury', N: 'Natural', I: 'Industrial', T: 'Traditional' };

interface CatDef {
  slug: string; sizes: string[]; thickness?: string; io: Product['indoorOutdoor'];
  specs: Record<string, string>; rows: Row[]; variantLabels?: string[];
}

const defs: CatDef[] = [
  {
    slug: 'granite', sizes: ['600×600 mm', '800×800 mm', 'Slab 2400×1200 mm'], thickness: '18 / 20 / 30 mm', io: 'Both',
    specs: { Material: 'Natural granite', 'Water absorption': '< 0.4%', 'Mohs hardness': '6–7', 'Edge profiles': 'Straight, bullnose, ogee' },
    rows: [
      ['Premium Black Granite', 'Absolute Black', 'Polished', 'Black', '#1b1b1d', '#4a4a4e', 'speckle', 'KFWE', 'MLm', 'Uniform deep black granite with a mirror polish. A reliable choice for kitchen counters and contemporary flooring.'],
      ['Tan Brown Granite', 'Imperial brown', 'Polished', 'Brown', '#5a3a2a', '#b07a50', 'speckle', 'KFC', 'TL', 'Warm brown with copper flecks that hide daily wear, popular for counters and steps.'],
      ['Kashmir White Granite', 'Light granite', 'Polished', 'White', '#d9d6cf', '#7d6b66', 'speckle', 'KFW', 'MmN', 'Bright cream-white granite with garnet speckles; brightens kitchens and entryways.'],
      ['Steel Grey Granite', 'Grey granite', 'Honed', 'Grey', '#6a6d72', '#a5a8ad', 'speckle', 'FWEC', 'IMm', 'Even cool-grey granite, ideal for commercial floors and façade bases.'],
      ['Green Galaxy Granite', 'Galaxy granite', 'Polished', 'Green', '#16312a', '#bfae7a', 'speckle', 'KWL', 'L', 'Deep green with golden stars for statement counters and bar tops.'],
      ['Flamed Black Granite', 'Black granite', 'Textured', 'Black', '#26262a', '#5b5b60', 'speckle', 'EF', 'IM', 'Flamed texture gives excellent grip for driveways, ramps and exterior steps.'],
      ['Leathered Rosa Granite', 'Pink granite', 'Matte', 'Pink', '#a8837a', '#d9b9ae', 'speckle', 'KWF', 'NT', 'Soft pink with a leathered finish that resists fingerprints and glare.'],
      ['Jet Mist Granite', 'Mist grey', 'Polished', 'Grey', '#4d4f55', '#8f939a', 'speckle', 'KFC', 'MI', 'Mid-tone granite with fine grain, balanced for large kitchen islands.'],
      ['Desert Gold Granite', 'Golden granite', 'Polished', 'Gold', '#b89560', '#6a4a2b', 'speckle', 'FKW', 'TNL', 'Sandy gold tones that warm up traditional and transitional interiors.'],
    ],
  },
  {
    slug: 'marble', sizes: ['600×600 mm', '800×800 mm', 'Slab 2700×1600 mm'], thickness: '16 / 18 / 20 mm', io: 'Indoor',
    specs: { Material: 'Natural marble', 'Water absorption': '< 0.5%', 'Mohs hardness': '3–4', 'Sealer': 'Recommended' },
    rows: [
      ['Carrara White Marble', 'Italian marble', 'Polished', 'White', '#ebe9e5', '#a5a5a8', 'veins', 'FWBK', 'MmL', 'Classic soft-grey veining on a white ground, a timeless Italian marble.'],
      ['Statuario Marble', 'Italian marble', 'Polished', 'White', '#f1efeb', '#555358', 'veins', 'FWL', 'L', 'Bold, dramatic veins on a bright white base for feature floors and walls.'],
      ['Makrana White Marble', 'Makrana', 'Polished', 'White', '#f3f1ec', '#c9c5bb', 'veins', 'FWT', 'TNm', 'Pure white Indian marble with minimal veining, used in temples and heritage buildings.'],
      ['Botticino Beige Marble', 'Italian marble', 'Honed', 'Beige', '#cfbfa4', '#a58f6c', 'veins', 'FWB', 'NmT', 'Warm beige with subtle cloud pattern; a calm choice for living areas.'],
      ['Nero Marquina Marble', 'Black marble', 'Polished', 'Black', '#161617', '#e5e3df', 'veins', 'FWBL', 'LM', 'Deep black with crisp white veins for dramatic bathrooms and accents.'],
      ['Emperador Dark Marble', 'Brown marble', 'Polished', 'Brown', '#4b3426', '#b79a7c', 'veins', 'FWL', 'LT', 'Rich brown with cream veins, popular for feature walls and entryways.'],
      ['Green Onyx', 'Onyx', 'Polished', 'Green', '#a9c3a2', '#e9f0e3', 'veins', 'WL', 'L', 'Translucent onyx that glows when backlit. A showpiece for bars and feature panels.'],
      ['Rosso Levanto Marble', 'Red marble', 'Polished', 'Red', '#6d2a2a', '#c99d92', 'veins', 'WFL', 'LT', 'Deep wine-red stone for statement flooring and insets.'],
      ['Crema Marfil Marble', 'Spanish marble', 'Polished', 'Cream', '#e0d2b3', '#b99f74', 'veins', 'FWB', 'mNT', 'Cream-beige with light veins; a versatile classic.'],
    ],
  },
  {
    slug: 'natural-stone', sizes: ['300×600 mm', '600×600 mm', 'Random cut'], thickness: '15 – 40 mm', io: 'Both',
    specs: { Material: 'Natural stone', 'Water absorption': '1–5%', Texture: 'Varies by piece', Sealer: 'Recommended in wet areas' },
    rows: [
      ['Kota Blue Stone', 'Kota stone', 'Natural', 'Blue-grey', '#6d7a7d', '#9fb0b3', 'grain', 'FEC', 'NIT', 'Hard-wearing limestone from Rajasthan, great for large floors with minimal joints.'],
      ['Jaisalmer Yellow Limestone', 'Limestone', 'Honed', 'Yellow', '#d3b873', '#a8893f', 'grain', 'WEF', 'NT', 'Honey-gold limestone with fossil texture for façades and boundary walls.'],
      ['Agra Red Sandstone', 'Sandstone', 'Natural', 'Red', '#a34b3a', '#d98a73', 'grain', 'WEF', 'TN', 'Classic red sandstone used in heritage and contemporary cladding.'],
      ['Dholpur Beige Sandstone', 'Sandstone', 'Textured', 'Beige', '#cdb899', '#a28d6c', 'grain', 'EFW', 'NmT', 'Fine-grained beige sandstone for garden paving and exterior walls.'],
      ['Black Slate Cladding', 'Slate', 'Textured', 'Black', '#2c2f33', '#5f666d', 'grain', 'WE', 'IM', 'Riven slate with natural cleft texture for feature walls and exteriors.'],
      ['Multicolour Slate', 'Slate', 'Natural', 'Multi', '#7b5f4c', '#a7b08f', 'grain', 'WEF', 'NI', 'Rust, green and grey tones in one rugged slate for rustic façades.'],
      ['Basalt Paving', 'Basalt', 'Textured', 'Dark grey', '#3b3d41', '#6c7076', 'grain', 'EC', 'IM', 'Dense volcanic stone with superior grip for driveways and plazas.'],
      ['Granite Cobbles', 'Cobble', 'Natural', 'Grey', '#85888d', '#b9bcc1', 'chip', 'E', 'NT', 'Hand-split cobbles for driveways, pathways and landscape edging.'],
      ['Ledgestone Wall Panels', 'Decorative', 'Textured', 'Mixed', '#8a7d6d', '#c5b8a5', 'brick', 'WE', 'NM', 'Stacked-stone panels for fast, textured feature walls.'],
      ['Honed Limestone Floor', 'Limestone', 'Honed', 'Ivory', '#dcd3bf', '#b2a688', 'grain', 'FWB', 'mN', 'Soft ivory limestone with a quiet, matte feel for calm interiors.'],
    ],
  },
  {
    slug: 'tiles', sizes: ['300×300 mm', '600×600 mm', '600×1200 mm', '800×1600 mm', '1200×2400 mm'], thickness: '8 – 12 mm', io: 'Both',
    specs: { Material: 'Porcelain / ceramic', 'Water absorption': '< 0.5% (porcelain)', 'Slip rating': 'R9–R11 by range', 'Rectified edge': 'Available' },
    rows: [
      ['Carrara Marble-look Tile', 'Marble-look porcelain', 'Polished', 'White', '#ece9e3', '#a7a7aa', 'veins', 'FWBK', 'MmL', 'Print-matched marble-look tile with realistic veining and rectified edges.'],
      ['Oak Plank Wood-look Tile', 'Wood-look porcelain', 'Matte', 'Oak', '#a77b52', '#7d5a38', 'grain', 'FWC', 'NmT', 'Warm oak planks with the durability of porcelain for living and bedrooms.'],
      ['Slate-look Anti-skid Tile', 'Stone-look porcelain', 'Textured', 'Charcoal', '#4a4d52', '#7a7e84', 'grain', 'EBF', 'IM', 'R11 anti-skid tile for bathrooms, balconies and parking areas.'],
      ['Concrete-look Large Format', 'Large-format porcelain', 'Matte', 'Grey', '#9a9a98', '#b9b9b5', 'speckle', 'FWC', 'IMm', 'Seamless concrete aesthetic in 1200×2400 mm slabs.'],
      ['Subway Gloss Wall Tile', 'Ceramic wall', 'Glossy', 'White', '#f0efec', '#d4d2cd', 'brick', 'WKB', 'mM', 'Classic 75×300 mm subway tile for kitchen backsplash and bathrooms.'],
      ['Terrazzo Designer Tile', 'Designer porcelain', 'Matte', 'Multi', '#d7d0c4', '#b3714c', 'chip', 'FWC', 'MN', 'Terrazzo chips in warm tones for trend-led floors.'],
      ['Sandstone-look Outdoor Tile', 'Outdoor porcelain', 'Textured', 'Sand', '#c4ae8a', '#a08a68', 'grain', 'EF', 'NT', '20 mm outdoor tile for terraces, with excellent grip and frost resistance.'],
      ['3D Wave Wall Tile', '3D ceramic', 'Matte', 'White', '#e5e2dc', '#c1bdb4', 'stripe', 'WC', 'ML', 'Sculpted 3D relief for feature walls with dramatic light play.'],
      ['Parking Paver Tile', 'Heavy-duty', 'Textured', 'Grey', '#7d7f82', '#a2a4a8', 'speckle', 'EC', 'I', 'High-strength tile for parking and driveways.'],
      ['Emerald Kitchen Tile', 'Ceramic wall', 'Glossy', 'Green', '#2f5e4e', '#7fa391', 'ceramic', 'KW', 'ML', 'Deep green glaze for bold splashbacks.'],
    ],
  },
  {
    slug: 'cement', sizes: ['50 kg bag', '25 kg bag', '20 kg bag', '5 kg pack'], io: 'Both',
    specs: { Pack: 'Bag / pack', 'Standard': 'IS compliant (confirm)', 'Shelf life': 'Up to 90 days', Storage: 'Dry, off the floor' },
    rows: [
      ['OPC 53 Grade Cement', 'OPC', 'Natural', 'Grey', '#8e8e8a', '#6b6b67', 'speckle', 'S', 'I', 'High-strength ordinary Portland cement for RCC, beams and fast-track structures.'],
      ['OPC 43 Grade Cement', 'OPC', 'Natural', 'Grey', '#93938f', '#6f6f6b', 'speckle', 'SN', 'I', 'General-purpose OPC suitable for plaster, masonry and flooring.'],
      ['PPC Cement', 'PPC', 'Natural', 'Grey', '#8a8c88', '#65675f', 'speckle', 'SN', 'I', 'Blended cement for durable residential construction and plastering.'],
      ['White Cement', 'White cement', 'Natural', 'White', '#f0efeb', '#cfcdc5', 'speckle', 'N', 'mL', 'Fine white cement for finishing, terrazzo and decorative work.'],
      ['Premium Tile Adhesive', 'Adhesive', 'Natural', 'Grey', '#aaaaa5', '#85857f', 'speckle', 'FWB', 'M', 'Polymer-modified adhesive for porcelain, ceramic and stone tiles.'],
      ['Large-format Tile Adhesive', 'Adhesive', 'Natural', 'White', '#d7d7d1', '#b0b0a8', 'speckle', 'FWC', 'M', 'High-bond adhesive for 600×1200 and larger tiles.'],
      ['Epoxy Grout', 'Grout', 'Glossy', 'Multi', '#c0b8a8', '#8b8272', 'solid', 'BKW', 'M', 'Stain-resistant epoxy grout for wet areas and kitchens.'],
      ['Cementitious Tile Grout', 'Grout', 'Matte', 'Grey', '#aaa9a3', '#8a8982', 'solid', 'FWB', 'm', 'Sanded grout in multiple shades for 2–12 mm joints.'],
      ['Block Jointing Mortar', 'Mortar', 'Natural', 'Grey', '#9a9a95', '#75756f', 'speckle', 'S', 'I', 'Thin-bed mortar for AAC and concrete block masonry.'],
    ],
  },
  {
    slug: 'aggregates', sizes: ['Per cubic metre', 'Per tonne', 'Truck load'], io: 'Both',
    specs: { Supply: 'Bulk, truck load', 'Source': 'Crushed stone', Tested: 'Grading on request', Delivery: 'Site delivery available (confirm)' },
    rows: [
      ['10 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#797771', '#b5b1a7', 'chip', 'S', 'I', 'Fine coarse aggregate for thin slabs, precast and finishing screeds.'],
      ['20 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#75736d', '#b1ada3', 'chip', 'S', 'I', 'The standard size for RCC slabs, beams and columns.'],
      ['40 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#716f69', '#aca89e', 'chip', 'S', 'I', 'Larger aggregate for mass concrete and foundations.'],
      ['GSB Grade I', 'Granular sub-base', 'Natural', 'Grey', '#8a867d', '#bcb7aa', 'chip', 'ES', 'I', 'Graded granular sub-base for roads and industrial floors.'],
      ['Stone Dust', 'Crusher dust', 'Natural', 'Grey', '#8f8c85', '#aaa69c', 'speckle', 'FS', 'I', 'Fine dust for paver bedding and filling.'],
      ['Crush Stone Chips', 'Chips', 'Natural', 'Grey', '#7a7870', '#b6b2a8', 'chip', 'ES', 'I', 'Small chips for drainage layers and decorative finishes.'],
      ['Wet Mix Macadam', 'WMM', 'Natural', 'Grey', '#85827a', '#b1ad9f', 'chip', 'ES', 'I', 'Pre-mixed graded aggregate for road base courses.'],
      ['Boulders for Retaining', 'Boulders', 'Natural', 'Grey', '#6a6862', '#a39f95', 'chip', 'E', 'N', 'Large stone for gabions and retaining walls.'],
    ],
  },
  {
    slug: 'sand', sizes: ['Per brass', 'Per cubic metre', 'Truck load'], io: 'Both',
    specs: { Supply: 'Bulk, truck load', 'Silt content': 'Low (confirm)', Zone: 'Zone II / III', Delivery: 'Site delivery available (confirm)' },
    rows: [
      ['M-Sand (Concrete Grade)', 'Manufactured sand', 'Natural', 'Grey-brown', '#a79a82', '#8a7d66', 'speckle', 'S', 'I', 'Washed manufactured sand with controlled grading for RCC.'],
      ['M-Sand (Plaster Grade)', 'Manufactured sand', 'Natural', 'Tan', '#bfae8c', '#9c8b6b', 'speckle', 'N', 'I', 'Fine M-sand for smooth internal and external plaster.'],
      ['River Sand', 'River sand', 'Natural', 'Sand', '#cdb88d', '#a8956d', 'speckle', 'SN', 'T', 'Natural rounded river sand for plaster and masonry.'],
      ['Plaster Sand', 'Plaster sand', 'Natural', 'Sand', '#c6b390', '#a28f6d', 'speckle', 'N', 'T', 'Sieved fine sand for plaster coats.'],
      ['Filling Sand', 'Filling sand', 'Natural', 'Brown', '#a08968', '#7e6a4f', 'speckle', 'F', 'I', 'Economical sand for plinth filling and levelling.'],
      ['Bedding Sand', 'Bedding sand', 'Natural', 'Sand', '#d1bf9a', '#ac9a74', 'speckle', 'FE', 'm', 'Uniform sand for paver and stone bedding.'],
      ['Silica Sand', 'Silica', 'Natural', 'White', '#e3dcc9', '#bdb49c', 'speckle', 'N', 'M', 'Clean silica for filtration, flooring screeds and specialty mixes.'],
      ['Washed Coarse Sand', 'Coarse sand', 'Natural', 'Grey', '#b0a287', '#8c7f66', 'speckle', 'S', 'I', 'Washed coarse sand for concrete and drainage beds.'],
    ],
  },
  {
    slug: 'bricks-blocks', sizes: ['230×110×75 mm', '600×200×100 mm', '600×200×200 mm'], io: 'Both',
    specs: { Material: 'See type', 'Compressive strength': 'Per grade (confirm)', Tolerance: 'Dimensionally accurate', Pack: 'Per piece / pallet' },
    rows: [
      ['Red Clay Brick (Class I)', 'Clay brick', 'Natural', 'Red', '#b0553a', '#8a3c27', 'brick', 'SW', 'T', 'Kiln-burnt clay bricks with consistent colour and strength.'],
      ['Fly-ash Brick', 'Fly-ash', 'Natural', 'Grey', '#8d8a85', '#a8a49d', 'brick', 'SW', 'I', 'Eco-friendly bricks with uniform dimensions for neat masonry.'],
      ['AAC Block 100 mm', 'AAC', 'Natural', 'White-grey', '#d0cfca', '#b2b0a9', 'brick', 'SW', 'M', 'Lightweight autoclaved block for partitions.'],
      ['AAC Block 200 mm', 'AAC', 'Natural', 'White-grey', '#cdccc7', '#aeaca5', 'brick', 'SW', 'M', 'Thermally efficient block for external walls.'],
      ['Solid Concrete Block', 'Concrete block', 'Natural', 'Grey', '#8c8a86', '#6e6c68', 'brick', 'SE', 'I', 'High-strength solid blocks for boundary and load-bearing walls.'],
      ['Hollow Concrete Block', 'Concrete block', 'Natural', 'Grey', '#93918d', '#75736f', 'brick', 'SW', 'I', 'Lighter hollow block for non-load-bearing walls.'],
      ['Facing Brick', 'Clay brick', 'Textured', 'Terracotta', '#b8654a', '#8e4a34', 'brick', 'WE', 'NT', 'Exposed-brick finish for façades and feature walls.'],
      ['Paver Block', 'Paver', 'Textured', 'Grey', '#9a9b9d', '#b9babc', 'brick', 'E', 'I', 'Interlocking paver for driveways and plazas.'],
    ],
  },
  {
    slug: 'steel', sizes: ['8–32 mm', '6 m / 12 m lengths', 'Custom cut'], io: 'Both',
    specs: { Grade: 'See product', Certificate: 'Mill test certificate on request', Length: '6 m / 12 m', Finish: 'Mill / galvanised as noted' },
    rows: [
      ['TMT Bar Fe 500D', 'TMT bar', 'Natural', 'Steel', '#4c5056', '#80868d', 'metal', 'S', 'I', 'Earthquake-resistant ductile reinforcement bars, 8–32 mm.'],
      ['TMT Bar Fe 550D', 'TMT bar', 'Natural', 'Steel', '#484c52', '#7c828a', 'metal', 'S', 'I', 'Higher-strength bars for heavy structures.'],
      ['MS Channel (ISMC)', 'Channel', 'Natural', 'Steel', '#52565c', '#868c93', 'metal', 'SC', 'I', 'Structural channels for frames, purlins and fabrication.'],
      ['MS Angle (ISA)', 'Angle', 'Natural', 'Steel', '#555960', '#8b9198', 'metal', 'S', 'I', 'Equal and unequal angles for trusses and supports.'],
      ['MS Beam (ISMB)', 'Beam', 'Natural', 'Steel', '#4f5359', '#83898f', 'metal', 'SC', 'I', 'I-section beams for structural framing.'],
      ['MS Flat', 'Flat', 'Natural', 'Steel', '#575b61', '#8d939a', 'metal', 'S', 'I', 'Flat bars for grills, brackets and base plates.'],
      ['MS Square Tube', 'Tube', 'Natural', 'Steel', '#535760', '#898f96', 'metal', 'SC', 'IM', 'Square and rectangular hollow sections for gates and frames.'],
      ['Galvanised Steel Pipe', 'Pipe', 'Natural', 'Silver', '#9aa1a8', '#c9cfd4', 'metal', 'SP', 'I', 'Galvanised pipes for scaffolding, handrails and water.'],
      ['Binding Wire', 'Wire', 'Natural', 'Steel', '#5d6167', '#8f959b', 'metal', 'S', 'I', 'Annealed binding wire for rebar tying.'],
    ],
  },
  {
    slug: 'aluminium', sizes: ['2-track sliding', '3-track sliding', 'Custom lengths 6 m'], io: 'Both',
    specs: { Alloy: '6063-T5', Finish: 'Anodised / powder-coat', 'Wall thickness': '1.2–2.0 mm', Length: '6 m' },
    rows: [
      ['Slim Sliding Window Profile', 'Sliding', 'Matte', 'Black', '#232427', '#50525a', 'metal', 'WE', 'MIm', 'Narrow-sightline sliding profile in a matte-black powder coat.'],
      ['Heavy-duty Sliding Door Profile', 'Sliding', 'Natural', 'Silver', '#b8bdc3', '#e0e3e6', 'metal', 'EC', 'M', 'Robust profile for large sliding doors and balcony openings.'],
      ['Casement Window Profile', 'Casement', 'Satin', 'White', '#e9eaec', '#c8cacd', 'metal', 'W', 'm', 'Hinged window profile with good weather seals.'],
      ['Partition Profile', 'Partition', 'Natural', 'Silver', '#b1b6bc', '#d9dcdf', 'metal', 'CB', 'M', 'Clean partition profile for offices and bathrooms.'],
      ['Façade Curtain Wall Mullion', 'Façade', 'Matte', 'Bronze', '#6a5440', '#a58a6d', 'metal', 'EC', 'ML', 'Structural mullion for glazed façades.'],
      ['Shopfront Frame', 'Shopfront', 'Natural', 'Silver', '#aab0b6', '#d4d8dc', 'metal', 'C', 'M', 'Wide frames for retail and showroom fronts.'],
      ['Wood-finish Aluminium Section', 'Decorative', 'Textured', 'Walnut', '#6d4b32', '#9f7655', 'grain', 'WEC', 'NMT', 'Wood-grain powder coat with the durability of aluminium.'],
      ['Mosquito Mesh Frame', 'Accessory', 'Matte', 'Grey', '#6b6e73', '#9a9da2', 'metal', 'W', 'm', 'Slim frames for insect screens.'],
    ],
  },
  {
    slug: 'plumbing', sizes: ['½"', '¾"', '1"', '1½"', '2"'], io: 'Both',
    specs: { Material: 'See product', 'Pressure class': 'Per SDR rating', Standard: 'IS / equivalent (confirm)', Warranty: 'Per manufacturer' },
    rows: [
      ['CPVC Hot & Cold Pipe', 'CPVC', 'Natural', 'Cream', '#e8dcc2', '#c2b595', 'solid', 'P', 'M', 'Pipes for hot and cold potable water, with solvent-cement joints.'],
      ['UPVC Cold Water Pipe', 'UPVC', 'Natural', 'Grey', '#aab1b6', '#7e868c', 'solid', 'P', 'M', 'Rigid cold-water pipes for overhead and underground lines.'],
      ['SWR Drainage Pipe', 'PVC', 'Natural', 'Grey', '#9ba3a8', '#788086', 'solid', 'P', 'I', 'Soil, waste and rain-water pipes in rubber-ring or solvent joint.'],
      ['GI Pipe', 'GI', 'Natural', 'Silver', '#a2a9af', '#cfd3d7', 'metal', 'P', 'I', 'Galvanised pipe for fire lines and exposed risers.'],
      ['Brass Ball Valve', 'Valve', 'Polished', 'Brass', '#b99a55', '#e0c47e', 'metal', 'P', 'T', 'Forged brass ball valve with full-bore flow.'],
      ['CPVC Fittings Set', 'Fittings', 'Natural', 'Cream', '#e4d8bd', '#bfb292', 'solid', 'P', 'M', 'Elbows, tees and couplers matched to CPVC pipe.'],
      ['Overhead Water Tank 1000 L', 'Tank', 'Natural', 'Black', '#252628', '#4a4c50', 'solid', 'P', 'I', 'Multi-layer tank with UV protection; sizes 500–5000 L.'],
      ['Self-priming Pump', 'Pump', 'Natural', 'Blue', '#2b5d82', '#6b95b5', 'metal', 'P', 'I', 'Monoblock pump for domestic water boosting.'],
      ['Floor Drain & Trap', 'Drainage', 'Polished', 'Steel', '#a9b0b6', '#d0d5d9', 'metal', 'PB', 'M', 'Stainless drain with removable cover.'],
    ],
  },
  {
    slug: 'sanitaryware', sizes: ['Standard', 'Compact', 'Wall-hung'], io: 'Indoor',
    specs: { Material: 'Vitreous china / brass', 'Flush': 'Dual (WC)', Finish: 'See product', Warranty: 'Per manufacturer' },
    rows: [
      ['Counter-top Round Basin', 'Wash basin', 'Glossy', 'White', '#f6f6f4', '#d2d4d6', 'ceramic', 'B', 'MmL', 'Sculptural round basin for vanity tops.'],
      ['Wall-hung WC with Soft-close', 'WC', 'Glossy', 'White', '#f4f4f2', '#cfd1d3', 'ceramic', 'B', 'Mm', 'Rimless wall-hung toilet with a concealed cistern.'],
      ['Matte Black Basin Mixer', 'Faucet', 'Matte', 'Matte black', '#1c1d1f', '#46484c', 'metal', 'B', 'MI', 'Single-lever mixer in a durable PVD matte-black finish.'],
      ['Brushed Gold Basin Mixer', 'Faucet', 'Satin', 'Gold', '#b89a5a', '#e0c98c', 'metal', 'BL', 'L', 'Brushed-gold single-lever mixer with ceramic cartridge.'],
      ['Chrome Rain Shower Set', 'Shower', 'Polished', 'Chrome', '#c9ced3', '#eef0f2', 'metal', 'B', 'M', 'Overhead rain shower with hand shower and diverter.'],
      ['Freestanding Bathtub', 'Bathtub', 'Glossy', 'White', '#f7f7f5', '#d5d7d9', 'ceramic', 'BL', 'LM', 'Acrylic freestanding tub for a spa-like bathroom.'],
      ['Floating Vanity Unit', 'Vanity', 'Matte', 'Walnut', '#6f4e37', '#a07a5c', 'grain', 'B', 'NM', 'Wall-hung vanity with soft-close drawers.'],
      ['LED Backlit Mirror', 'Mirror', 'Polished', 'Clear', '#d9dde0', '#f3f5f6', 'solid', 'B', 'Mm', 'Round mirror with a dimmable warm-white LED halo.'],
      ['Accessory Set (Matte Black)', 'Accessories', 'Matte', 'Matte black', '#1e1f21', '#4a4c50', 'metal', 'B', 'MI', 'Towel bar, robe hook, paper holder and shelf.'],
    ],
  },
  {
    slug: 'colours-finishes', sizes: ['1 L', '4 L', '10 L', '20 L'], io: 'Both',
    specs: { Base: 'Water-based', Coverage: '~100–140 sq ft/L/coat', 'Dry time': 'Touch dry in 1–2 hours', Warranty: 'Per manufacturer' },
    rows: [
      ['Premium Interior Emulsion (Matt)', 'Emulsion', 'Matte', 'Warm white', '#efe9dc', '#d6ccb8', 'solid', 'WN', 'MmN', 'Washable matt emulsion with low odour.'],
      ['Silk Interior Emulsion', 'Emulsion', 'Satin', 'Greige', '#cfc6b8', '#b0a595', 'solid', 'WN', 'Mm', 'Soft sheen that reflects light and cleans easily.'],
      ['Weather-shield Exterior Paint', 'Exterior', 'Matte', 'Terracotta', '#b9654a', '#8e4a34', 'solid', 'EN', 'NT', 'Weather-resistant façade paint with algae protection.'],
      ['Textured Wall Finish', 'Texture', 'Textured', 'Sand', '#c8b69a', '#a29179', 'grain', 'WN', 'NL', 'Sand-texture finish for feature walls.'],
      ['Wall Putty (White)', 'Putty', 'Natural', 'White', '#f1f0ec', '#d3d1c9', 'speckle', 'N', 'M', 'Cement-based putty for a smooth base.'],
      ['Acrylic Primer', 'Primer', 'Matte', 'White', '#f4f3ef', '#d8d6ce', 'solid', 'N', 'M', 'Water-based primer for interior and exterior walls.'],
      ['Waterproof Coating', 'Waterproofing', 'Matte', 'Grey', '#8a8d90', '#acaeb0', 'solid', 'EN', 'I', 'Flexible coating for terraces, bathrooms and tanks.'],
      ['Metallic Decorative Paint', 'Decorative', 'Glossy', 'Champagne', '#c8b28a', '#e5d6b4', 'stripe', 'WL', 'L', 'Pearlescent finish for accent walls.'],
      ['Sage Green Emulsion', 'Emulsion', 'Matte', 'Sage', '#9aa58c', '#7b856e', 'solid', 'WN', 'Nm', 'Muted green that brings calm to bedrooms.'],
    ],
  },
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const products: Product[] = defs.flatMap((d) =>
  d.rows.map((r, i): Product => {
    const [name, materialType, finish, color, base, accent, pattern, apps, styles, description] = r;
    const swatch: Swatch = { base, accent, pattern };
    return {
      id: `${d.slug}-${String(i + 1).padStart(3, '0')}`,
      slug: slugify(name),
      name, categorySlug: d.slug, materialType, finish, color, colorHex: base,
      applications: apps.split('').map((c) => A[c]).filter(Boolean),
      styles: styles.split('').map((c) => S[c]).filter(Boolean),
      sizes: d.sizes, thickness: d.thickness, indoorOutdoor: d.io,
      description, specifications: { ...d.specs, Finish: finish, Colour: color },
      variants: [
        { id: 'v1', label: color, colorHex: base },
        { id: 'v2', label: `${finish === 'Polished' ? 'Honed' : 'Polished'} alternative`, colorHex: accent },
      ],
      swatch, images: [], datasheetUrl: '#', // PLACEHOLDER
    };
  }),
);

export const allFinishes = Array.from(new Set(products.map((p) => p.finish))).sort();
export const allColors = Array.from(new Set(products.map((p) => p.color))).sort();
export const allApplications = Array.from(new Set(products.flatMap((p) => p.applications))).sort();
export const allStyles = Array.from(new Set(products.flatMap((p) => p.styles))).sort();
