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
      ['UltraTech Weather Plus Cement', 'UltraTech Cement', 'Water repellent', 'Grey', '#8a8c88', '#65675f', 'speckle', 'S', 'I', ''],
      ['UltraTech Super Cement', 'OPC · UltraTech Cement', 'OPC 53 Grade', 'Grey', '#8e8e8a', '#6b6b67', 'speckle', 'S', 'I', ''],
      ['UltraTech Premium Cement', 'OPC · UltraTech Cement', 'OPC 53 Grade', 'Grey', '#8e8e8a', '#6b6b67', 'speckle', 'S', 'I', ''],
      ['UltraTech Super Plus Cement', 'OPC · UltraTech Cement', 'OPC 53 Grade', 'Grey', '#8a8c88', '#65675f', 'speckle', 'S', 'I', ''],
      ['Wonder Xtreme Cement', 'Blended · Wonder Cement', 'High performance', 'Grey', '#8e8e8a', '#6b6b67', 'speckle', 'S', 'I', ''],
      ['Wonder Plus Cement', 'Premium · Wonder Cement', 'Premium', 'Grey', '#8a8c88', '#65675f', 'speckle', 'SN', 'I', ''],
      ['Wonder PPC Cement', 'PPC · Wonder Cement', 'PPC', 'Grey', '#8a8c88', '#65675f', 'speckle', 'SN', 'I', ''],
      ['Wonder OPC Cement', 'OPC · Wonder Cement', 'OPC 43 & 53 Grade', 'Grey', '#8e8e8a', '#6b6b67', 'speckle', 'S', 'I', ''],
      ['Birla White Cement', 'White cement · Birla White', 'White Portland Cement', 'White', '#f0efeb', '#cfcdc5', 'speckle', 'N', 'mL', ''],
      ['JK WhiteMaxX White Cement', 'White cement · JK Cement', 'White Portland Cement', 'White', '#f0efeb', '#cfcdc5', 'speckle', 'N', 'mL', ''],
      ['UltraTech Tilefixo Royal NT', 'Tile adhesive · UltraTech', 'Cement-based adhesive', 'Grey', '#cdb92f', '#8a1f4a', 'speckle', 'FWB', 'M', ''],
      ['UltraTech Tilefixo Royal NT Plus', 'Tile adhesive · UltraTech', 'Cement-based adhesive', 'Grey', '#cdb92f', '#8a1f4a', 'speckle', 'FWC', 'M', ''],
      ['Asian Paints SmartCare Epoxy Tile Grout', 'Epoxy grout · Asian Paints', 'Two-component epoxy', 'Multi', '#c0b8a8', '#4b2a86', 'solid', 'BKW', 'M', ''],
      ['Asian Paints SmartCare Cement Tile Grout', 'Cement grout · Asian Paints', 'Polymer-modified cement', 'Multi', '#aaa9a3', '#4b2a86', 'solid', 'FWB', 'm', ''],
      ['Asian Paints Block Joining Mortar', 'Mortar · Asian Paints', 'Cement-based mortar', 'Grey', '#9a9a95', '#4b2a86', 'speckle', 'S', 'I', ''],
    ],
  },
  {
    slug: 'aggregates', sizes: ['By the tonne', 'By the truck load'], io: 'Both',
    specs: { Supply: 'Loose, in bulk (truck / tractor load)', Source: 'Crushed hard stone', Standard: 'IS 383:2016 (for concrete)', 'Bulk density': 'About 1.5 t per m³ (varies with size and moisture)' },
    rows: [
      ['10 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#797771', '#b5b1a7', 'chip', 'S', 'I', 'Crushed stone with a nominal size of 10 mm, for thin slabs, lintels, stairs and precast work.'],
      ['20 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#75736d', '#b1ada3', 'chip', 'S', 'I', 'Crushed stone with a nominal size of 20 mm, the standard coarse aggregate for RCC.'],
      ['40 mm Aggregate', 'Crushed stone', 'Natural', 'Grey', '#716f69', '#aca89e', 'chip', 'S', 'I', 'Crushed stone with a nominal size of 40 mm, for mass concrete and lightly reinforced work.'],
      ['GSB Grade I', 'Granular sub-base', 'Natural', 'Grey', '#8a867d', '#bcb7aa', 'chip', 'ES', 'I', 'Graded granular sub-base material for roads, yards and industrial floors.'],
      ['Stone Dust', 'Crusher dust', 'Natural', 'Grey', '#8f8c85', '#aaa69c', 'speckle', 'FS', 'I', 'Fine crusher dust (0–4.75 mm) for paver bedding, filling and block making.'],
      ['Crush Stone Chips', 'Chips', 'Natural', 'Grey', '#7a7870', '#b6b2a8', 'chip', 'ES', 'I', 'Small crushed chips for drainage layers, terrace work and decorative finishes.'],
      ['Wet Mix Macadam', 'WMM', 'Natural', 'Grey', '#85827a', '#b1ad9f', 'chip', 'ES', 'I', 'Graded aggregate mixed with water at the plant, for road base courses.'],
      ['Boulders for Retaining', 'Boulders', 'Natural', 'Grey', '#6a6862', '#a39f95', 'chip', 'E', 'N', 'Large natural stone for gabions, retaining walls and rubble masonry.'],
    ],
  },
  {
    slug: 'sand', sizes: ['By the brass', 'By the tonne', 'By the truck load'], io: 'Both',
    specs: { Supply: 'Loose, in bulk (truck / tractor load)', Standard: 'IS 383:2016 (concrete) · IS 1542 (plaster)', 'Bulk density': 'About 1.55 t per m³ (varies with moisture)', Unit: '1 brass = 100 cu ft ≈ 2.83 m³' },
    rows: [
      ['M-Sand (Concrete Grade)', 'Manufactured sand', 'Natural', 'Grey-brown', '#a79a82', '#8a7d66', 'speckle', 'S', 'I', 'Washed manufactured sand, graded for RCC and structural concrete.'],
      ['M-Sand (Plaster Grade)', 'Manufactured sand', 'Natural', 'Tan', '#bfae8c', '#9c8b6b', 'speckle', 'N', 'I', 'Finer, sieved manufactured sand for smooth internal and external plaster.'],
      ['River Sand', 'River sand', 'Natural', 'Sand', '#cdb88d', '#a8956d', 'speckle', 'SN', 'T', 'Natural rounded river sand for plaster, masonry and concrete.'],
      ['Plaster Sand', 'Plaster sand', 'Natural', 'Sand', '#c6b390', '#a28f6d', 'speckle', 'N', 'T', 'Sieved fine sand for plaster coats and masonry mortar.'],
      ['Filling Sand', 'Filling sand', 'Natural', 'Brown', '#a08968', '#7e6a4f', 'speckle', 'F', 'I', 'Economical sand for plinth filling and levelling.'],
      ['Bedding Sand', 'Bedding sand', 'Natural', 'Sand', '#d1bf9a', '#ac9a74', 'speckle', 'FE', 'm', 'Uniform sand for laying paver blocks and stone paving.'],
      ['Silica Sand', 'Silica', 'Natural', 'White', '#e3dcc9', '#bdb49c', 'speckle', 'N', 'M', 'Clean, light-coloured quartz sand for filtration and special mixes.'],
      ['Washed Coarse Sand', 'Coarse sand', 'Natural', 'Grey', '#b0a287', '#8c7f66', 'speckle', 'S', 'I', 'Washed coarse sand for concrete and drainage beds.'],
    ],
  },
  {
    slug: 'bricks-blocks', sizes: ['230×110×75 mm'], io: 'Both',
    specs: { Supply: 'Per piece or per 1,000; palletised on request', Standard: 'See product (IS 1077, 12894, 2185, 2691, 15658)', Tolerance: 'As per the relevant IS standard' },
    rows: [
      ['Red Clay Brick (Class I)', 'Clay brick', 'Natural', 'Red', '#b0553a', '#8a3c27', 'brick', 'SW', 'T', 'Kiln-burnt clay bricks, 230×110×75 mm, for load-bearing and partition walls.'],
      ['Fly-ash Brick', 'Fly-ash', 'Natural', 'Grey', '#8d8a85', '#a8a49d', 'brick', 'SW', 'I', 'Pressed fly ash bricks with uniform size for neat masonry.'],
      ['AAC Block 100 mm', 'AAC', 'Natural', 'White-grey', '#d0cfca', '#b2b0a9', 'brick', 'SW', 'M', 'Lightweight 100 mm AAC block for partition walls.'],
      ['AAC Block 200 mm', 'AAC', 'Natural', 'White-grey', '#cdccc7', '#aeaca5', 'brick', 'SW', 'M', 'Lightweight 200 mm AAC block for external walls.'],
      ['Solid Concrete Block', 'Concrete block', 'Natural', 'Grey', '#8c8a86', '#6e6c68', 'brick', 'SE', 'I', 'Dense solid concrete blocks for boundary and load-bearing walls.'],
      ['Hollow Concrete Block', 'Concrete block', 'Natural', 'Grey', '#93918d', '#75736f', 'brick', 'SW', 'I', 'Lighter hollow concrete blocks for non-load-bearing walls.'],
      ['Facing Brick', 'Clay brick', 'Textured', 'Terracotta', '#b8654a', '#8e4a34', 'brick', 'WE', 'NT', 'Textured clay brick left exposed on façades and feature walls.'],
      ['Paver Block', 'Paver', 'Textured', 'Grey', '#9a9b9d', '#b9babc', 'brick', 'E', 'I', 'Interlocking concrete paver for driveways, yards and pathways.'],
    ],
  },
  {
    slug: 'steel', sizes: ['8–32 mm', '6 m / 12 m lengths', 'Custom cut'], io: 'Both',
    specs: { Grade: 'See product', Certificate: 'Mill test certificate on request', Length: '6 m / 12 m', Finish: 'Mill / galvanised as noted' },
    rows: [
      ['German TMT Fe 500D', 'TMT bar · German TMT', 'Fe 500D', 'Steel', '#4c5056', '#80868d', 'metal', 'S', 'I', ''],
      ['German TMT Fe 550D', 'TMT bar · German TMT', 'Fe 550D', 'Steel', '#484c52', '#7c828a', 'metal', 'S', 'I', ''],
      ['German CRS Green Steel', 'Corrosion-resistant TMT · German TMT', 'CRS (Fe 500D / 550D)', 'Steel', '#454a50', '#7a8087', 'metal', 'S', 'I', ''],
      ['Tata Tiscon 550SD', 'TMT bar · Tata Tiscon', 'Fe 550SD', 'Steel', '#484c52', '#7c828a', 'metal', 'S', 'I', ''],
      ['Tata Tiscon CRS550D', 'Corrosion-resistant TMT · Tata Tiscon', 'CRS 550D', 'Steel', '#454a50', '#7a8087', 'metal', 'S', 'I', ''],
      ['MS Channel (ISMC)', 'Channel', 'Natural', 'Steel', '#52565c', '#868c93', 'metal', 'SC', 'I', 'Structural channels for frames, purlins and fabrication.'],
      ['MS Square Tube', 'Tube', 'Natural', 'Steel', '#535760', '#898f96', 'metal', 'SC', 'IM', 'Square and rectangular hollow sections for gates and frames.'],
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

/**
 * Product photos. Put the image file in /public/products/... and list it here by product slug.
 * 'contain' shows the whole picture (best for pack-shots); 'cover' fills the frame (best for photos).
 * Products without an entry — or whose file is missing — fall back to the generated swatch.
 */
const productImages: Record<string, { src: string; fit: 'cover' | 'contain' }> = {
  // UltraTech: white-background pack-shots (shown whole). Wonder Cement: bag-on-site photos (fill the frame).
  'ultratech-weather-plus-cement': { src: '/products/cement/ultratech-weather-plus.jpg', fit: 'contain' },
  'ultratech-super-cement': { src: '/products/cement/ultratech-super.jpg', fit: 'contain' },
  'ultratech-premium-cement': { src: '/products/cement/ultratech-premium.jpg', fit: 'contain' },
  'ultratech-super-plus-cement': { src: '/products/cement/ultratech-super-plus.jpg', fit: 'contain' },
  'wonder-xtreme-cement': { src: '/products/cement/wonder-xtreme.jpg', fit: 'cover' },
  'wonder-plus-cement': { src: '/products/cement/wonder-plus.jpg', fit: 'cover' },
  'wonder-ppc-cement': { src: '/products/cement/wonder-ppc.jpg', fit: 'cover' },
  'wonder-opc-cement': { src: '/products/cement/wonder-opc.jpg', fit: 'cover' },
  'ultratech-tilefixo-royal-nt': { src: '/products/cement/ultratech-tilefixo-royal-nt.jpg', fit: 'contain' },
  'ultratech-tilefixo-royal-nt-plus': { src: '/products/cement/ultratech-tilefixo-royal-nt-plus.jpg', fit: 'contain' },
  'asian-paints-smartcare-epoxy-tile-grout': { src: '/products/cement/asian-paints-epoxy-grout.jpg', fit: 'contain' },
  'asian-paints-smartcare-cement-tile-grout': { src: '/products/cement/asian-paints-cement-grout.jpg', fit: 'contain' },
  'asian-paints-block-joining-mortar': { src: '/products/cement/asian-paints-block-joining-mortar.jpg', fit: 'contain' },
  'birla-white-cement': { src: '/products/cement/birla-white.jpg', fit: 'cover' },
  'jk-whitemaxx-white-cement': { src: '/products/cement/jk-whitemaxx.jpg', fit: 'cover' },
  // Bricks and blocks: free-to-use stock photos from Pexels (generic, not our own stock): replace with your own photos when you have them.
  'red-clay-brick-class-i': { src: '/products/bricks/red-clay-brick.jpg', fit: 'cover' },
  'fly-ash-brick': { src: '/products/bricks/fly-ash-brick.jpg', fit: 'cover' },
  'aac-block-100-mm': { src: '/products/bricks/aac-block.jpg', fit: 'cover' },
  'aac-block-200-mm': { src: '/products/bricks/aac-block.jpg', fit: 'cover' },
  'solid-concrete-block': { src: '/products/bricks/solid-concrete-block.jpg', fit: 'cover' },
  'hollow-concrete-block': { src: '/products/bricks/hollow-concrete-block.jpg', fit: 'cover' },
  'facing-brick': { src: '/products/bricks/facing-brick.jpg', fit: 'cover' },
  'paver-block': { src: '/products/bricks/paver-block.jpg', fit: 'cover' },
  // MS channel, square tube and binding wire: free-to-use stock photos from Pexels (generic, not our own stock).
  'ms-channel-ismc': { src: '/products/steel/ms-channel.jpg', fit: 'cover' },
  'ms-square-tube': { src: '/products/steel/ms-square-tube.jpg', fit: 'cover' },
  'binding-wire': { src: '/products/steel/binding-wire.jpg', fit: 'cover' },
  // Aggregates and sand: free-to-use stock photos from Pexels (generic, not our own stock). Some products share a photo.
  '10-mm-aggregate': { src: '/products/aggregates/aggregate-10mm.jpg', fit: 'cover' },
  '20-mm-aggregate': { src: '/products/aggregates/aggregate-20mm.jpg', fit: 'cover' },
  '40-mm-aggregate': { src: '/products/aggregates/aggregate-40mm.jpg', fit: 'cover' },
  'gsb-grade-i': { src: '/products/aggregates/gsb.jpg', fit: 'cover' },
  'stone-dust': { src: '/products/aggregates/stone-dust.jpg', fit: 'cover' },
  'crush-stone-chips': { src: '/products/aggregates/stone-chips.jpg', fit: 'cover' },
  'wet-mix-macadam': { src: '/products/aggregates/wmm.jpg', fit: 'cover' },
  'boulders-for-retaining': { src: '/products/aggregates/boulders.jpg', fit: 'cover' },
  'm-sand-concrete-grade': { src: '/products/sand/m-sand-concrete.jpg', fit: 'cover' },
  'm-sand-plaster-grade': { src: '/products/sand/m-sand-plaster.jpg', fit: 'cover' },
  'river-sand': { src: '/products/sand/river-sand.jpg', fit: 'cover' },
  'plaster-sand': { src: '/products/sand/plaster-sand.jpg', fit: 'cover' },
  'filling-sand': { src: '/products/sand/filling-sand.jpg', fit: 'cover' },
  'bedding-sand': { src: '/products/sand/bedding-sand.jpg', fit: 'cover' },
  'silica-sand': { src: '/products/sand/silica-sand.jpg', fit: 'cover' },
  'washed-coarse-sand': { src: '/products/sand/coarse-sand.jpg', fit: 'cover' },
  'german-tmt-fe-500d': { src: '/products/steel/german-tmt-500d.jpg', fit: 'cover' },
  'german-tmt-fe-550d': { src: '/products/steel/german-tmt-550d.jpg', fit: 'cover' },
  'german-crs-green-steel': { src: '/products/steel/german-crs.jpg', fit: 'cover' },
  'tata-tiscon-550sd': { src: '/products/steel/tata-tiscon-550sd.jpg', fit: 'cover' },
  'tata-tiscon-crs550d': { src: '/products/steel/tata-tiscon-crs550d.jpg', fit: 'cover' },
};

/**
 * Brand cement details. Source: each manufacturer's own website (see `source`), summarised in our words.
 * Only facts the manufacturers publish are listed. Pack size is the standard 50 kg bag.
 */
const PACK = '50 kg bag';
const TMT_SIZES = ['6 mm', '8 mm', '10 mm', '12 mm', '16 mm', '20 mm and above (on order)'];
const german = (page: string) => ({ name: 'germansteel.in', url: `https://www.germansteel.in/products/${page}` });
type Extra = Pick<Product, 'description' | 'sizes' | 'variants' | 'facts' | 'benefits' | 'useCases' | 'source' | 'basis'> & { specifications: Record<string, string> };
const AGG_BASIS = 'Typical values from the relevant IS / MoRTH standard, not a test report. Ask us about the stock you will receive.';
const SAND_BASIS = 'Typical values from the relevant IS standard, not a test report. Ask us about the stock you will receive.';
const SAND_UNIT_NOTE = '1 brass = 100 cu ft ≈ 2.83 m³';
// Stock status for the bricks and blocks range: the two bricks are held in stock, everything else is supplied on order.
const IN_STOCK = new Set(['red-clay-brick-class-i', 'fly-ash-brick']);
const BRICK_BASIS = 'Typical values from the relevant IS standard, not a test report. Ask us about the strength class and current stock.';
const AGG_UNITS = ['By the tonne', 'By the truck load'];
const SAND_UNITS = ['By the brass', 'By the tonne', 'By the truck load'];
const wonder = (page: string) => ({ name: 'wondercement.com', url: `https://www.wondercement.com/en/products/${page}` });
const ultratech = (path: string) => ({ name: 'ultratechcement.com', url: `https://www.ultratechcement.com/for-homebuilders/products/${path}` });
const brandDetails: Record<string, Extra> = {
  'wonder-opc-cement': {
    description: 'Ordinary Portland Cement (OPC) from Wonder Cement, available in 43 and 53 grade. Built for high early strength, so construction can move faster without giving up long-term durability.',
    sizes: [PACK],
    variants: [{ id: 'g53', label: 'OPC 53 Grade' }, { id: 'g43', label: 'OPC 43 Grade' }],
    facts: [['Brand', 'Wonder Cement'], ['Cement type', 'Ordinary Portland Cement (OPC)'], ['Pack size', PACK], ['Best for', 'High-rise, bridges and flyovers, pre-cast, mass concrete']],
    benefits: ['High early strength for faster construction', 'High durability', 'Protection against corrosion in harsh environments', 'Optimised strength-to-cement ratio', 'Low heat of hydration, which limits thermal cracking in mass concrete'],
    useCases: ['High-rise construction', 'Public infrastructure: bridges, flyovers and industrial foundations', 'Pre-cast concrete segments', 'Mass concrete work'],
    specifications: { Brand: 'Wonder Cement', Type: 'Ordinary Portland Cement (OPC)', 'Grades available': 'OPC 43 and OPC 53', 'Raw material': 'Limestone from Wonder Cement’s own deposits', 'Alkali, magnesia and free lime': 'Balanced, with low alkali', Chloride: 'Almost negligible', 'Heat of hydration': 'Low', 'Concrete grades it can make': 'M15 to M35', 'Pack size': PACK },
    source: wonder('opc-cement'),
  },
  'ultratech-super-cement': {
    description: 'UltraTech Super cement, OPC 53 grade, supplied in 50 kg bags. UltraTech has not published a datasheet for it on its website, so ask us for the datasheet and current availability.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'UltraTech Cement'], ['Cement type', 'Ordinary Portland Cement (OPC)'], ['Grade', '53 Grade'], ['Pack size', PACK]],
    specifications: { Brand: 'UltraTech Cement', Type: 'Ordinary Portland Cement (OPC)', Grade: '53 Grade', 'Pack size': PACK },
    source: ultratech('overview'),
  },
  'wonder-ppc-cement': {
    description: 'Portland Pozzolana Cement (PPC) from Wonder Cement, made with premium clinker and high-quality fly ash. A strong, durable all-round cement for foundations, RCC and plastering.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'Wonder Cement'], ['Cement type', 'Portland Pozzolana Cement (PPC)'], ['Pack size', PACK], ['Best for', 'Foundations, RCC, plastering, mass concrete']],
    benefits: ['High compressive strength', 'Well-graded particles from closed-circuit grinding reduce voids, for denser and less permeable concrete', 'Resists sulphate attack', 'Low alkali and low chloride help prevent cracking and steel corrosion', 'Smooth finish on interior and exterior plaster'],
    useCases: ['Foundations and footings, residential and commercial', 'RCC slabs, beams and columns', 'Plaster work', 'Mass concrete such as retaining walls, bridges and basements'],
    specifications: { Brand: 'Wonder Cement', Type: 'Portland Pozzolana Cement (PPC)', Composition: 'Premium clinker and high-quality fly ash', 'Sulphate attack': 'Resistant', 'Alkali and chloride': 'Low', 'Pack size': PACK },
    source: wonder('ppc-cement'),
  },
  'wonder-xtreme-cement': {
    description: 'Wonder Xtreme is a specially blended cement for high-performance concrete, aimed at fast, high-strength slab casting and demanding structures.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'Wonder Cement'], ['Cement type', 'Blended cement for high-performance concrete'], ['Grade', '53 Grade'], ['Pack size', PACK], ['Packaging', 'Multi-layer tamper-proof BOPP bag'], ['Best for', 'Slabs, high-rise, coastal and marine work']],
    benefits: ['High compressive strength; reactive particles bond well with steel, sand and aggregates', 'Dampness protection: fills tiny capillary gaps in the concrete to block water', 'Built to withstand harsh weather', 'Dense, sulphate-resistant concrete', 'Premium BOPP bag keeps moisture out in transit and storage'],
    useCases: ['Residential RCC: foundations, columns and slabs', 'High-rise construction', 'Marine and coastal work', 'Public infrastructure'],
    specifications: { Brand: 'Wonder Cement', Type: 'Specially blended cement', Grade: '53 Grade', Strength: 'Extreme early strength (manufacturer claim)', Packaging: 'Multi-layer tamper-proof BOPP bag', 'Pack size': PACK },
    source: wonder('xtreme-cement'),
  },
  'wonder-plus-cement': {
    description: 'Wonder Plus is Wonder Cement’s premium offering, positioned a step above PPC. It has the highest share of ultra-fine “Wonder Particles” (3–30 micron) for denser concrete and a smooth plaster finish.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'Wonder Cement'], ['Cement type', 'Premium cement, a step above PPC'], ['Grade', '53 Grade'], ['Pack size', PACK], ['Packaging', 'Tamper-proof laminated AD*STAR bag'], ['Best for', 'Foundation to roof, plastering']],
    benefits: ['High strength and density: fine particles fill micro voids, so concrete is stronger and more impermeable', 'Maximum coverage per bag', 'Low heat of hydration, low alkali, low chloride and sulphate resistance, which reduce cracking', 'Tamper-proof bag keeps the cement fresh from plant to site'],
    useCases: ['Foundations, columns, slabs and RCC', 'High-rise construction', 'Plaster work, interior and exterior', 'Mass concrete work'],
    specifications: { Brand: 'Wonder Cement', Type: 'Premium cement, a step above PPC', Grade: '53 Grade', 'Fine particles': 'Highest share of 3–30 micron Wonder Particles', 'Heat of hydration': 'Low', 'Alkali and chloride': 'Low', 'Sulphate resistance': 'Yes', Packaging: 'Tamper-proof laminated AD*STAR bag', 'Pack size': PACK },
    source: wonder('plus-cement'),
  },
  'birla-white-cement': {
    description: 'Premium White Portland Cement from Birla White (Aditya Birla Group). Made for wall finishing, decorative work and refined interiors, with high whiteness and fine particles for an even, bright finish.',
    sizes: ['1 kg', '5 kg', '25 kg', '50 kg'], variants: [],
    facts: [['Brand', 'Birla White'], ['Cement type', 'White Portland Cement'], ['Whiteness', '89%+ (Hunter scale)'], ['Pack sizes', '1, 5, 25 and 50 kg'], ['Best for', 'Wall finishing, decorative and interior work']],
    benefits: ['Better coverage for an even finish', 'Smooth finish even when blended with pigments', 'Walls look brighter and more vibrant', 'High compressive strength'],
    useCases: ['Wall plastering and finishing', 'Decorative work', 'Refined interiors'],
    specifications: { Brand: 'Birla White (Aditya Birla Group)', Type: 'White Portland Cement', Whiteness: '89%+ on the Hunter Whiteness Scale', Fineness: '370–400 Blaine', 'Compressive strength': '60 MPa', 'Pack sizes': '1, 5, 25 and 50 kg' },
    source: { name: 'birlawhite.com', url: 'https://www.birlawhite.com/products/white-cement/white-cement' },
  },
  'jk-whitemaxx-white-cement': {
    description: 'JKC WhiteMaxX is a white Portland cement from JK Cement that combines strength with a sparkling white, smooth matt finish. Used for walls, ceilings, mosaic tiles and terrazzo flooring.',
    sizes: ['1 kg', '5 kg', '25 kg', '40 kg', '50 kg'], variants: [],
    facts: [['Brand', 'JK Cement'], ['Cement type', 'White Portland Cement'], ['Whiteness', 'Up to 90%'], ['Pack sizes', '1, 5, 25, 40 and 50 kg'], ['Best for', 'Walls, ceilings, mosaic tiles, terrazzo']],
    benefits: ['Sparkling whiteness', 'Superior compressive strength', 'Smooth matt finish', 'No curing required'],
    useCases: ['Smooth interior and exterior walls and ceilings', 'Mosaic tiles', 'Terrazzo flooring', 'Ornamental and decorative objects', 'Covering minor cracks and pores before repainting'],
    specifications: { Brand: 'JK Cement', Type: 'White Portland Cement', Whiteness: 'Up to 90% (manufacturer claim)', Coats: 'Generally 2 coats cover a wall evenly', Curing: 'Not required', 'Shelf life': '6–12 months', 'Pack sizes': '1, 5, 25, 40 and 50 kg' },
    source: { name: 'jkcement.com', url: 'https://www.jkcement.com/whitemaxx-white-cement/' },
  },
  'ultratech-weather-plus-cement': {
    description: 'UltraTech Weather Plus is a water-repellent cement. It is designed to fill the tiny pores in concrete and break the links between capillaries, helping keep dampness out of foundations, walls and the roof.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'UltraTech Cement'], ['Cement type', 'Water-repellent cement'], ['Grade', '53 Grade'], ['Pack size', PACK], ['Packaging', 'Tamper-proof bag'], ['Best for', 'Whole structure: foundation, walls and roof']],
    benefits: ['Better dampness prevention', 'Better protection against rusting of steel in RCC', 'Higher durability', 'Tamper-proof bag limits loss in transport and keeps the cement in good condition longer'],
    useCases: ['Foundations', 'Walls', 'Roof slabs', 'UltraTech recommends using it for the entire structure'],
    specifications: { Brand: 'UltraTech Cement', Type: 'Water-repellent cement', Grade: '53 Grade', Action: 'Fills tiny pores and breaks capillary interconnection', Packaging: 'Tamper-proof bag', 'Pack size': PACK },
    source: ultratech('ultratech-building-solution/ultratech-weather-plus'),
  },
  'ultratech-premium-cement': {
    description: 'UltraTech Premium cement, OPC 53 grade, supplied in 50 kg bags. UltraTech describes Premium as a solid, sustainable and durable solution for construction needs. UltraTech has not published a datasheet for it on its website, so ask us for the datasheet and current availability.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'UltraTech Cement'], ['Cement type', 'Ordinary Portland Cement (OPC)'], ['Grade', '53 Grade'], ['Pack size', PACK]],
    specifications: { Brand: 'UltraTech Cement', Type: 'Ordinary Portland Cement (OPC)', Grade: '53 Grade', 'Pack size': PACK },
    source: ultratech('overview'),
  },

  'ultratech-super-plus-cement': {
    description: 'UltraTech Super Plus cement, OPC 53 grade, supplied in 50 kg bags. UltraTech has not published a datasheet for it on its website, so ask us for the datasheet and current availability.',
    sizes: [PACK], variants: [],
    facts: [['Brand', 'UltraTech Cement'], ['Cement type', 'Ordinary Portland Cement (OPC)'], ['Grade', '53 Grade'], ['Pack size', PACK]],
    specifications: { Brand: 'UltraTech Cement', Type: 'Ordinary Portland Cement (OPC)', Grade: '53 Grade', 'Pack size': PACK },
    source: ultratech('overview'),
  },

  // ---- Tile adhesives, grouts and block mortar. Brand details from ultratechcement.com and asianpaints.com; supplied on order.
  'ultratech-tilefixo-royal-nt': {
    description: 'UltraTech Tilefixo Royal NT is a high-strength cement-based adhesive for fixing medium-format tiles and natural stone on floors and walls, indoors and outdoors, in dry and wet areas.',
    sizes: ['20 kg bag'], variants: [],
    facts: [['Brand', 'UltraTech Tilefixo'], ['Type', 'Tile and natural stone adhesive'], ['Colour', 'Grey'], ['Best for', 'Medium-format tiles and natural stone'], ['Where', 'Floors and walls; dry and wet, indoor and outdoor'], ['Supply', 'On order']],
    benefits: ['High strength without needing curing (self-curing technology)', 'Helps prevent hollowness under tiles, loosening, debonding, chipping and cracking', 'Helps keep dampness out of the tile bed', 'Suitable for dry and wet areas, inside and outside'],
    useCases: ['Floor and wall tiling, medium-format tiles', 'Natural stone fixing', 'Bathrooms, kitchens, balconies and other wet areas'],
    specifications: { Brand: 'UltraTech Tilefixo', Product: 'Royal NT', Type: 'Cement-based tile and natural stone adhesive', Colour: 'Grey', 'Suitable tiles': 'Medium-format tiles and natural stone', Areas: 'Floors and walls; dry and wet; indoor and outdoor', Pack: '20 kg bag', Supply: 'On order' },
    source: { name: 'ultratechcement.com', url: 'https://www.ultratechcement.com/tilefixo/Overview' },
  },
  'ultratech-tilefixo-royal-nt-plus': {
    description: 'UltraTech Tilefixo Royal NT Plus is the Royal range adhesive for large-format tiles and natural stone, for floors and walls indoors and outdoors, in dry and wet areas.',
    sizes: ['20 kg bag'], variants: [],
    facts: [['Brand', 'UltraTech Tilefixo'], ['Type', 'Large tile and natural stone adhesive'], ['Colour', 'Grey'], ['Best for', 'Large-format tiles and natural stone'], ['Where', 'Floors and walls; dry and wet, indoor and outdoor'], ['Supply', 'On order']],
    benefits: ['Made for large-format tiles and natural stone', 'High strength without needing curing (self-curing technology)', 'Helps prevent hollowness under tiles, loosening, debonding, chipping and cracking', 'Suitable for dry and wet areas, inside and outside'],
    useCases: ['Large-format floor and wall tiles', 'Natural stone fixing', 'Living rooms, lobbies and commercial floors', 'Wet areas, indoor and outdoor'],
    specifications: { Brand: 'UltraTech Tilefixo', Product: 'Royal NT Plus', Type: 'Cement-based large tile and natural stone adhesive', Colour: 'Grey', 'Suitable tiles': 'Large-format tiles and natural stone', Areas: 'Floors and walls; dry and wet; indoor and outdoor', Pack: '20 kg bag', Supply: 'On order' },
    source: { name: 'ultratechcement.com', url: 'https://www.ultratechcement.com/tilefixo/Overview' },
  },
  'asian-paints-smartcare-epoxy-tile-grout': {
    description: 'Asian Paints SmartCare Tile Grout (Epoxy Based) is a two-component, tintable epoxy grout for ceramic and vitrified tiles and stone joints where a hygienic, water-tight finish is needed.',
    sizes: ['1 kg pack'], variants: [],
    facts: [['Brand', 'Asian Paints SmartCare'], ['Type', 'Two-component epoxy tile grout'], ['Pack size', '1 kg'], ['Shades', '26, tintable on request'], ['Joint width', 'Up to 5 mm'], ['Supply', 'On order']],
    benefits: ['Long life', 'Impervious to water, so it helps waterproof wet areas', 'Non-toxic and resistant to chemicals', '26 shades, with tinting available'],
    useCases: ['Tile joints up to 5 mm wide', 'Bathroom floors and other wet areas', 'Kitchens, swimming pools, food units and laboratories', 'Sealing cracks on interior absorbent surfaces'],
    specifications: { Brand: 'Asian Paints SmartCare', Type: 'Two-component epoxy tile grout', Tiles: 'Ceramic, vitrified and stone', 'Joint width': 'Up to 5 mm', Shades: '26', 'Pack size': '1 kg', 'Shelf life': '12 months, stored closed away from heat and direct sun', Supply: 'On order' },
    source: { name: 'asianpaints.com', url: 'https://www.asianpaints.com/products/waterproofing-solutions/smartcare-tile-grout-epoxy-based.html' },
  },
  'asian-paints-smartcare-cement-tile-grout': {
    description: 'Asian Paints SmartCare Tile Grout (Cement Based) is a single-component, polymer-modified, fast-setting, low-shrinkage grout that keeps water out of tile joints on floors and walls.',
    sizes: ['Pack sizes on request'], variants: [],
    facts: [['Brand', 'Asian Paints SmartCare'], ['Type', 'Polymer-modified cement tile grout'], ['Shades', '9'], ['Joint width', 'Up to 5 mm'], ['Form', 'Fine powder, mixed with water'], ['Supply', 'On order']],
    benefits: ['Economical and durable', 'Easy to mix and apply', 'Water-repelling, impermeable joint filler', 'Non-dusting, so cleaning is simpler', 'Fast setting with low shrinkage'],
    useCases: ['Tile joints up to 5 mm wide', 'Floors and walls', 'Bathrooms, kitchens, showers and damp areas'],
    specifications: { Brand: 'Asian Paints SmartCare', Type: 'Single-component, polymer-modified cement grout', Setting: 'Fast setting, low shrinkage', 'Joint width': 'Up to 5 mm', Shades: '9', 'Shelf life': '12 months in a cool, dry place away from moisture', Coverage: 'Depends on tile size and joint width', Supply: 'On order' },
    source: { name: 'asianpaints.com', url: 'https://www.asianpaints.com/products/waterproofing-solutions/tile-grout-cement-based.html' },
  },
  'asian-paints-block-joining-mortar': {
    description: 'Asian Paints Block Joining Mortar is a ready-to-use, cement-based, non-shrink, self-curing mortar for bonding AAC blocks, concrete blocks and fly ash bricks in thin joints.',
    sizes: ['40 kg bag'], variants: [],
    facts: [['Brand', 'Asian Paints SmartCare'], ['Type', 'Cement-based block joining mortar'], ['Pack size', '40 kg bag'], ['Colour', 'Grey'], ['Joint thickness', '3 to 4 mm'], ['Supply', 'On order']],
    benefits: ['Non-shrink and self-curing, with no separate curing step', 'Smooth, lump-free and thixotropic mix', 'Thin joints of 3 to 4 mm', 'Bonds AAC blocks, concrete blocks and fly ash bricks'],
    useCases: ['AAC block masonry', 'Concrete block walls', 'Fly ash brick walls'],
    specifications: { Brand: 'Asian Paints SmartCare', 'Product code': '6801', Type: 'Cement-based, non-shrink, self-curing mortar', Colour: 'Grey', 'Pack size': '40 kg bag', 'Joint thickness': '3 to 4 mm', Coverage: '2 to 2.5 sq ft per kg at 3 mm (depends on surface flatness)', 'Water per bag': '10 to 10.8 litres per 40 kg', 'Bulk density': '1.89', 'Pot life at 27 °C': '1.5 to 2 hours', 'Compressive strength': '12.5 MPa', 'Shelf life': '1 year in original packing, stored dry', Supply: 'On order' },
    source: { name: 'asianpaints.com', url: 'https://www.asianpaints.com/content/dam/asian_paints/products/product-information-sheets/Block-Joining-Mortar.pdf' },
  },

  // ---- Steel (TMT bars). Sizes: 6, 8, 10, 12 and 16 mm in stock; 20 mm and above on order.
  'german-tmt-fe-500d': {
    description: 'German TMT Fe 500D reinforcement bars, made with the TMX (Thermex) quenching and self-tempering process for strength, ductility and weldability. Made by German Steel in Gujarat.',
    sizes: TMT_SIZES, variants: [],
    facts: [['Brand', 'German TMT'], ['Grade', 'Fe 500D'], ['Standard', 'IS 1786:2008'], ['Sizes in stock', '6, 8, 10, 12 and 16 mm'], ['On order', '20 mm and above']],
    benefits: ['Tough tempered outer layer with a ductile core', 'Extra strength and ductility', 'Higher weldability', 'Super bonding with concrete', 'Better fire resistance than plain bars', 'Made without costly alloys'],
    useCases: ['Foundations, footings and plinth beams', 'Columns, beams and slabs', 'General RCC reinforcement as the structural design requires'],
    specifications: { Brand: 'German TMT (German Steel)', Grade: 'Fe 500D', 'Minimum yield strength': '500 MPa (grade designation)', Standard: 'IS 1786:2008', Process: 'TMX (Thermex) quenching and self-tempering', 'Sizes in stock': '6, 8, 10, 12 and 16 mm', 'On order': '20 mm and above', Certifications: 'ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (company)' },
    source: german('tmt-bars'),
  },
  'german-tmt-fe-550d': {
    description: 'German TMT Fe 550D reinforcement bars: the higher-strength grade for heavier structures. Made with the TMX (Thermex) quenching and self-tempering process by German Steel in Gujarat.',
    sizes: TMT_SIZES, variants: [],
    facts: [['Brand', 'German TMT'], ['Grade', 'Fe 550D'], ['Standard', 'IS 1786:2008'], ['Sizes in stock', '6, 8, 10, 12 and 16 mm'], ['On order', '20 mm and above']],
    benefits: ['Higher yield strength than Fe 500D', 'Extra strength and ductility', 'Higher weldability', 'Super bonding with concrete', 'Better fire resistance than plain bars', 'Made without costly alloys'],
    useCases: ['Heavily loaded columns, beams and slabs', 'Foundations and footings', 'General RCC reinforcement as the structural design requires'],
    specifications: { Brand: 'German TMT (German Steel)', Grade: 'Fe 550D', 'Minimum yield strength': '550 MPa (grade designation)', Standard: 'IS 1786:2008', Process: 'TMX (Thermex) quenching and self-tempering', 'Sizes in stock': '6, 8, 10, 12 and 16 mm', 'On order': '20 mm and above', Certifications: 'ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (company)' },
    source: german('tmt-bars'),
  },
  'german-crs-green-steel': {
    description: 'German CRS Green Steel is a corrosion-resistant TMT bar for moisture-prone and harsh environments such as coastal areas. Available in Fe 500D CRS and Fe 550D CRS.',
    sizes: TMT_SIZES,
    variants: [{ id: 'f500', label: 'Fe 500D CRS' }, { id: 'f550', label: 'Fe 550D CRS' }],
    facts: [['Brand', 'German TMT'], ['Type', 'Corrosion-resistant TMT bar'], ['Sizes in stock', '6, 8, 10, 12 and 16 mm'], ['On order', '20 mm and above'], ['Best for', 'Coastal and moisture-prone sites']],
    benefits: ['Corrosion resistance for harsh and humid conditions', '100% D-quality output', 'Performance up to 20–50% above normal TMT bars (manufacturer claim)', 'Lower carbon emissions in production'],
    useCases: ['Coastal areas', 'Moisture-prone and harsh environments', 'Structures that need a longer service life'],
    specifications: { Brand: 'German TMT (German Steel)', Grades: 'Fe 500D CRS and Fe 550D CRS', Type: 'Corrosion-resistant TMT (CRS) bar', 'Sizes in stock': '6, 8, 10, 12 and 16 mm', 'On order': '20 mm and above' },
    source: german('crs-green-steel'),
  },
  'tata-tiscon-550sd': {
    description: 'Tata Tiscon 550SD is a Fe 550SD super-ductile TMT rebar made from virgin iron ore with the Temp-core online quenching process. Built for beams, columns and foundations, and for seismic and coastal zones.',
    sizes: TMT_SIZES, variants: [],
    facts: [['Brand', 'Tata Tiscon'], ['Grade', 'Fe 550SD'], ['Standard', 'IS 1786:2008 · IS 13920:2016'], ['Sizes in stock', '6, 8, 10, 12 and 16 mm'], ['On order', '20 mm and above']],
    benefits: ['Minimum yield strength of 570 MPa', 'High UTS/YS ratio and elongation for earthquake resistance', 'Can reduce the steel needed for the same design', 'Low sulphur and phosphorus', 'Tight weight tolerance: ±5% up to 10 mm, ±3% for 12 and 16 mm (Tata’s claim)', 'Described by Tata as India’s first GreenPro-certified rebar'],
    useCases: ['Beams, columns and foundations', 'Residential projects and individual homes', 'High-rises and commercial towers', 'Earthquake-prone and coastal zones', 'Infrastructure'],
    specifications: { Brand: 'Tata Tiscon (Tata Steel)', Grade: 'Fe 550SD (super ductile)', Standard: 'IS 1786:2008 and IS 13920:2016', 'Minimum yield strength': '570 MPa', 'Minimum tensile strength': '655 MPa', 'Minimum UTS/YS ratio': '1.15', 'Minimum total elongation': '16%', 'Carbon (max)': '0.25%', 'Sulphur and phosphorus': 'Each below 0.04%, combined below 0.075%', Process: 'Temp-core online quenching, virgin iron ore', 'Sizes in stock': '6, 8, 10, 12 and 16 mm', 'On order': '20 mm and above' },
    source: { name: 'tatatiscon.co.in', url: 'https://www.tatatiscon.co.in/550-sd-tmt-rebars' },
  },
  'tata-tiscon-crs550d': {
    description: 'Tata Tiscon CRS550D is a corrosion-resistant, super-ductile rebar. Copper and chromium form a protective layer on the bar surface that slows corrosion, which suits coastal, humid and industrial sites.',
    sizes: TMT_SIZES, variants: [],
    facts: [['Brand', 'Tata Tiscon'], ['Grade', 'CRS 550D'], ['Type', 'Corrosion-resistant super-ductile rebar'], ['Sizes in stock', '6, 8, 10, 12 and 16 mm'], ['On order', '20 mm and above']],
    benefits: ['Minimum yield strength of 570 MPa', 'Protective oxide layer slows corrosion', 'Better ductility and energy absorption for seismic performance', 'Can reduce the steel needed and speed up construction', 'No special handling needed'],
    useCases: ['Coastal and high-humidity areas', 'Areas with a high groundwater table', 'Industrial and heavy-rain locations', 'Earthquake-resistant construction'],
    specifications: { Brand: 'Tata Tiscon (Tata Steel)', Grade: 'CRS 550D (corrosion resistant, super ductile)', 'Minimum yield strength': '570 MPa', 'Carbon (max)': '0.25%', 'Sulphur and phosphorus (max)': '0.035% each', 'Carbon equivalent (max)': '0.61', 'Copper + chromium (max)': '0.40%', 'Sizes in stock': '6, 8, 10, 12 and 16 mm', 'On order': '20 mm and above' },
    source: { name: 'tatatiscon.co.in', url: 'https://tatatiscon.co.in/tata-tiscon-crs550d' },
  },

  // ---- Aggregates: loose, unbranded, sold in bulk. Values are typical figures from the IS / MoRTH standard, not test reports.
  '10-mm-aggregate': {
    description: 'Crushed stone aggregate of 10 mm nominal size. Used where concrete sections are thin or reinforcement is closely spaced, and often blended with 20 mm aggregate to improve the grading of a mix.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed hard stone'], ['Nominal size', '10 mm'], ['Standard', 'IS 383:2016'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Fits between closely spaced reinforcement', 'Fills gaps between larger aggregate for a denser mix', 'Angular, crushed particles interlock and bond well with cement paste'],
    useCases: ['Thin slabs, sunshades, lintels and stairs', 'Precast items and small structural members', 'Closely reinforced sections', 'Blended with 20 mm aggregate for a denser mix'],
    specifications: { Material: 'Crushed hard stone', 'Nominal size': '10 mm', Standard: 'IS 383:2016', 'Impact / crushing value': 'Up to 45% for concrete, 30% for wearing surfaces (IS 383 limit)', 'Bulk density': 'About 1.5 t per m³ (approx.)', Supply: 'Loose, in bulk' },
    basis: AGG_BASIS,
  },
  '20-mm-aggregate': {
    description: 'Crushed stone aggregate of 20 mm nominal size, the standard coarse aggregate for reinforced concrete in houses and buildings.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed hard stone'], ['Nominal size', '20 mm'], ['Standard', 'IS 383:2016'], ['Sold', 'By the tonne or truck load']],
    benefits: ['The usual size for building RCC; suits most reinforcement spacing', 'Angular, crushed particles interlock and bond well with cement paste', 'Easy to place and compact with normal vibration'],
    useCases: ['RCC slabs, beams and columns', 'Footings and plinth beams', 'Roof slabs and general structural concrete', 'Base layers under floors'],
    specifications: { Material: 'Crushed hard stone', 'Nominal size': '20 mm', Standard: 'IS 383:2016', 'Impact / crushing value': 'Up to 45% for concrete, 30% for wearing surfaces (IS 383 limit)', 'Bulk density': 'About 1.5 t per m³ (approx.)', Supply: 'Loose, in bulk' },
    basis: AGG_BASIS,
  },
  '40-mm-aggregate': {
    description: 'Crushed stone aggregate of 40 mm nominal size, for mass concrete and sections with wide reinforcement spacing.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed hard stone'], ['Nominal size', '40 mm'], ['Standard', 'IS 383:2016'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Needs less cement paste per cubic metre than smaller sizes', 'Suits large, thick sections', 'Economical where heavy reinforcement does not limit the size'],
    useCases: ['Mass concrete and PCC', 'Foundation beds and raft bases', 'Lightly reinforced or unreinforced work', 'Sub-base and drainage layers'],
    specifications: { Material: 'Crushed hard stone', 'Nominal size': '40 mm', Standard: 'IS 383:2016', 'Impact / crushing value': 'Up to 45% for concrete, 30% for wearing surfaces (IS 383 limit)', 'Bulk density': 'About 1.5 t per m³ (approx.)', Supply: 'Loose, in bulk' },
    basis: AGG_BASIS,
  },
  'gsb-grade-i': {
    description: 'Granular sub-base (GSB) of Grading I: a well-graded blend of crushed stone and fines that compacts into a firm, free-draining layer under roads, yards and industrial floors.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed stone, graded blend'], ['Grading', 'Grading I'], ['Standard', 'MoRTH Specifications, Section 400'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Compacts into a stable, load-spreading layer', 'Free-draining, so it protects the layers above from water', 'A good base for roads, hardstands and industrial floors'],
    useCases: ['Road sub-base', 'Industrial and warehouse floor bases', 'Yards, parking areas and hardstands', 'Approach roads'],
    specifications: { Material: 'Crushed stone, graded blend', Grading: 'Grading I', Standard: 'MoRTH Specifications, Section 400', Supply: 'Loose, in bulk' },
    basis: AGG_BASIS,
  },
  'stone-dust': {
    description: 'Fine crusher dust (0 to 4.75 mm), a by-product of stone crushing. Used as a bedding and filling material, and in block and paver making.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crusher dust'], ['Particle size', '0 to 4.75 mm'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Economical filling and levelling material', 'Compacts well as a bedding layer', 'Fills voids between coarse stone'],
    useCases: ['Bedding under paver blocks and stone', 'Filling and levelling', 'Making cement blocks and pavers', 'Blending with coarse stone in base layers'],
    specifications: { Material: 'Crusher dust', 'Particle size': '0 to 4.75 mm', Supply: 'Loose, in bulk', Note: 'Not a substitute for washed M-sand in structural concrete or plaster' },
    basis: 'Typical values, not a test report. Ask us about the stock you will receive.',
  },
  'crush-stone-chips': {
    description: 'Small crushed stone chips, typically 6 to 12 mm. A clean, angular material for drainage layers, terrace work and decorative finishes.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed stone'], ['Typical size', '6 to 12 mm'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Clean, angular chips drain freely', 'Useful where a fine, even stone layer is needed', 'Many non-structural uses'],
    useCases: ['Drainage layers and filter beds', 'Terrace and roof screed work', 'Mosaic and decorative floor finishes', 'Pathways and garden areas'],
    specifications: { Material: 'Crushed stone', 'Typical size': '6 to 12 mm', Supply: 'Loose, in bulk' },
    basis: 'Typical values, not a test report. Tell us the size you need.',
  },
  'wet-mix-macadam': {
    description: 'Wet Mix Macadam (WMM): graded crushed aggregate mixed with water at the plant, ready to lay and roll as a road base course.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Crushed stone, graded and pre-mixed'], ['Standard', 'MoRTH Specifications, Section 400'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Arrives pre-mixed and graded, ready to lay', 'Rolls to a dense, stable base', 'Spreads load well under bituminous or concrete surfacing'],
    useCases: ['Road base courses', 'Highway shoulders', 'Industrial pavements'],
    specifications: { Material: 'Crushed stone, graded and pre-mixed', Standard: 'MoRTH Specifications, Section 400', Supply: 'Loose, in bulk' },
    basis: AGG_BASIS,
  },
  'boulders-for-retaining': {
    description: 'Large natural stone boulders for gabions, retaining walls and rubble masonry. Choose the size to suit the work.',
    sizes: AGG_UNITS, variants: [],
    facts: [['Material', 'Natural hard stone'], ['Typical size', 'About 100 to 300 mm, depending on use'], ['Sold', 'By the tonne or truck load']],
    benefits: ['Strong and durable in exposed conditions', 'Large stone locks together with little binder', 'Economical for bulk filling and protection work'],
    useCases: ['Gabion walls', 'Retaining walls and rubble masonry', 'Foundation packing', 'Slope and embankment protection'],
    specifications: { Material: 'Natural hard stone', 'Typical size': 'About 100 to 300 mm', Supply: 'Loose, in bulk' },
    basis: 'Typical values, not a test report. Tell us the use and we will advise the size.',
  },

  // ---- Sand. Values are typical figures from IS 383 / IS 1542, not test reports.
  'm-sand-concrete-grade': {
    description: 'Manufactured sand made by crushing hard stone and washing it to remove fines. Graded for concrete, with consistent quality from load to load.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Crushed stone sand (manufactured)'], ['Grading', 'Zone II (IS 383)'], ['Standard', 'IS 383:2016'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Consistent grading, load after load', 'Washed to keep fines (silt and dust) low', 'Angular particles bond well, giving strong concrete', 'Does not depend on river mining'],
    useCases: ['RCC slabs, beams, columns and footings', 'Site-mixed and ready-mix concrete', 'Block and paver making'],
    specifications: { Material: 'Crushed stone sand (manufactured)', Grading: 'Zone II (IS 383)', Standard: 'IS 383:2016', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: SAND_BASIS,
  },
  'm-sand-plaster-grade': {
    description: 'Manufactured sand sieved finer for plastering. Gives a smooth, even coat on internal and external walls.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Crushed stone sand, sieved fine'], ['Use', 'Plaster and mortar'], ['Standard', 'IS 1542 (sand for plaster)'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Fine, even grading for a smooth plaster surface', 'Washed to keep dust low', 'Consistent in colour and quality'],
    useCases: ['Internal and external plaster', 'Masonry mortar', 'Finishing coats'],
    specifications: { Material: 'Crushed stone sand, sieved fine', Use: 'Plaster and mortar', Standard: 'IS 1542 (sand for plaster)', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: SAND_BASIS,
  },
  'river-sand': {
    description: 'Natural sand from river beds, with rounded particles. Used for plaster, masonry and concrete where it is available.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Natural river sand'], ['Standard', 'IS 383:2016'], ['Silt limit', 'Up to 3% (IS 383)'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Rounded particles give a smooth, workable mix', 'Long track record in plaster and masonry', 'Light colour for plaster'],
    useCases: ['Plaster and masonry mortar', 'Concrete, where silt content is within limits', 'Filtration and drainage beds'],
    specifications: { Material: 'Natural river sand', Standard: 'IS 383:2016', 'Clay, fine silt and dust': 'Up to 3% (IS 383 limit for natural sand)', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: 'Typical values from the relevant IS standard, not a test report. River sand supply depends on local mining permissions, so ask about current availability.',
  },
  'plaster-sand': {
    description: 'Sieved fine sand for plastering and masonry mortar, free from pebbles and large lumps.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Sieved natural sand'], ['Use', 'Plaster and mortar'], ['Standard', 'IS 1542 (sand for plaster)'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Sieved, so free from stones and lumps', 'Workable mortar that spreads evenly', 'Smooth finish on walls'],
    useCases: ['Internal and external plaster', 'Masonry mortar', 'Floor screeds'],
    specifications: { Material: 'Sieved natural sand', Use: 'Plaster and mortar', Standard: 'IS 1542 (sand for plaster)', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: SAND_BASIS,
  },
  'filling-sand': {
    description: 'Economical natural sand for filling and levelling, where a graded sand is not needed.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Natural sand'], ['Use', 'Filling and levelling'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Low-cost bulk fill', 'Compacts well when wetted', 'Quick to spread and level'],
    useCases: ['Plinth filling', 'Levelling below floors', 'Backfilling around foundations'],
    specifications: { Material: 'Natural sand', Use: 'Filling and levelling', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE, Note: 'Not for use in concrete or plaster' },
    basis: 'Typical values, not a test report.',
  },
  'bedding-sand': {
    description: 'Uniform, clean sand for laying a level bed under paver blocks, tiles and stone paving.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Natural sand'], ['Use', 'Bedding under paving'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Uniform particles screed to a level bed', 'Drains freely under pavers', 'Easy to spread and compact'],
    useCases: ['Bedding under paver blocks', 'Stone and tile paving in yards and driveways', 'Jointing sand between pavers'],
    specifications: { Material: 'Natural sand', Use: 'Bedding under paving', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: 'Typical values, not a test report.',
  },
  'silica-sand': {
    description: 'Clean, light-coloured quartz-rich sand for filtration, special screeds and speciality mixes.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Quartz-rich silica sand'], ['Colour', 'White to off-white'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Clean and light-coloured', 'Chemically inert quartz', 'Suited to filtration and speciality uses'],
    useCases: ['Water filtration beds', 'Speciality screeds and floorings', 'Decorative and landscape uses'],
    specifications: { Material: 'Quartz-rich silica sand', Colour: 'White to off-white', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: 'Typical values, not a test report. Tell us the purity or grade you need.',
  },
  'washed-coarse-sand': {
    description: 'Coarse sand washed to remove silt and dust, for concrete and drainage beds.',
    sizes: SAND_UNITS, variants: [],
    facts: [['Material', 'Washed natural sand, coarse'], ['Standard', 'IS 383:2016'], ['Sold', 'By the brass, tonne or truck load']],
    benefits: ['Washed, so low in silt and dust', 'Coarse grading drains freely', 'Suitable for concrete mixes'],
    useCases: ['Concrete, blended to suit the grading', 'Drainage and soak-pit beds', 'Filter layers'],
    specifications: { Material: 'Washed natural sand, coarse', Standard: 'IS 383:2016', 'Bulk density': 'About 1.55 t per m³ (approx.)', Unit: SAND_UNIT_NOTE },
    basis: SAND_BASIS,
  },

  // ---- Bricks and blocks. Unbranded; figures are typical values from the relevant IS standard, not test reports.
  'red-clay-brick-class-i': {
    description: 'Burnt clay building bricks in the standard 230×110×75 mm size, fired in a kiln for strength and even colour. The usual choice for load-bearing and partition walls.',
    sizes: ['230×110×75 mm'], variants: [],
    facts: [['Material', 'Burnt clay'], ['Size', '230×110×75 mm'], ['Standard', 'IS 1077 (common burnt clay building bricks)'], ['Sold', 'Per piece or per 1,000']],
    benefits: ['Familiar, easy to lay and cut', 'Good compressive strength when well burnt', 'Takes plaster well', 'Long track record in Indian houses'],
    useCases: ['Load-bearing and partition walls', 'Boundary walls', 'Foundation masonry (use well-burnt bricks)', 'Plastered walls'],
    specifications: { Material: 'Burnt clay', Size: '230×110×75 mm', Standard: 'IS 1077', 'Water absorption': 'Up to 20% (classes to 12.5), up to 15% above (IS 1077)', 'Strength classes': 'Set by compressive strength; ask for the class you need', Supply: 'Loose or palletised' },
    basis: BRICK_BASIS,
  },
  'fly-ash-brick': {
    description: 'Bricks made from fly ash, with sand or stone dust and a binder, pressed to uniform size. They give straight, even walls and use a waste product from power plants.',
    sizes: ['230×110×75 mm'], variants: [],
    facts: [['Material', 'Fly ash with binder'], ['Size', '230×110×75 mm'], ['Standard', 'IS 12894 (fly ash bricks)'], ['Sold', 'Per piece or per 1,000']],
    benefits: ['Uniform size, so walls need less plaster and mortar', 'Smooth, even faces', 'Lower weight than clay brick', 'Made from a recycled industrial by-product'],
    useCases: ['Load-bearing and partition walls', 'Compound walls', 'Plastered masonry'],
    specifications: { Material: 'Fly ash with binder', Size: '230×110×75 mm', Standard: 'IS 12894', 'Water absorption': 'Up to 20% (IS 12894)', Supply: 'Loose or palletised' },
    basis: BRICK_BASIS,
  },
  'aac-block-100-mm': {
    description: 'Autoclaved aerated concrete (AAC) block, 100 mm thick. Very light and easy to cut, for internal partition walls.',
    sizes: ['600×200×100 mm'], variants: [],
    facts: [['Material', 'Autoclaved aerated concrete'], ['Size', '600×200×100 mm'], ['Standard', 'IS 2185 (Part 3)'], ['Sold', 'Per piece or per cubic metre']],
    benefits: ['Light weight, so lower load on the structure', 'Large blocks lay quickly', 'Easy to cut, chase and drill', 'Good heat insulation'],
    useCases: ['Internal partition walls', 'Non-load-bearing walls in framed buildings'],
    specifications: { Material: 'Autoclaved aerated concrete', Size: '600×200×100 mm', Standard: 'IS 2185 (Part 3)', 'Dry density': 'About 550 to 650 kg/m³ (typical)', Jointing: 'Thin-bed block jointing mortar', Supply: 'Palletised' },
    basis: BRICK_BASIS,
  },
  'aac-block-200-mm': {
    description: 'Autoclaved aerated concrete (AAC) block, 200 mm thick. Light and thermally efficient, for external walls of framed buildings.',
    sizes: ['600×200×200 mm'], variants: [],
    facts: [['Material', 'Autoclaved aerated concrete'], ['Size', '600×200×200 mm'], ['Standard', 'IS 2185 (Part 3)'], ['Sold', 'Per piece or per cubic metre']],
    benefits: ['Light weight, so lower load on the structure', 'Large blocks lay quickly', 'Good heat insulation for cooler rooms', 'Easy to cut and chase'],
    useCases: ['External walls of framed buildings', 'Infill walls in RCC structures', 'Lift shafts and service enclosures'],
    specifications: { Material: 'Autoclaved aerated concrete', Size: '600×200×200 mm', Standard: 'IS 2185 (Part 3)', 'Dry density': 'About 550 to 650 kg/m³ (typical)', Jointing: 'Thin-bed block jointing mortar', Supply: 'Palletised' },
    basis: BRICK_BASIS,
  },
  'solid-concrete-block': {
    description: 'Solid cement concrete blocks, 400 mm long. Strong and dense, for boundary walls, load-bearing walls and retaining work.',
    sizes: ['400×200×200 mm', '400×200×150 mm', '400×200×100 mm'], variants: [],
    facts: [['Material', 'Cement concrete'], ['Length × height', '400×200 mm'], ['Thickness', '100, 150 or 200 mm'], ['Standard', 'IS 2185 (Part 1)'], ['Sold', 'Per piece']],
    benefits: ['Dense and strong', 'Large size lays faster than brick', 'Uniform, square faces', 'Suits exposed and ground-level use'],
    useCases: ['Boundary and compound walls', 'Load-bearing walls', 'Retaining and plinth walls'],
    specifications: { Material: 'Cement concrete', Size: '400×200 mm face, 100/150/200 mm thick', Standard: 'IS 2185 (Part 1)', Strength: 'Strength grade per IS 2185 (Part 1); ask for the grade you need', Supply: 'Palletised or loose' },
    basis: BRICK_BASIS,
  },
  'hollow-concrete-block': {
    description: 'Hollow cement concrete blocks, 400 mm long. Lighter than solid blocks, for walls that do not carry heavy loads.',
    sizes: ['400×200×200 mm', '400×200×150 mm', '400×200×100 mm'], variants: [],
    facts: [['Material', 'Cement concrete, hollow'], ['Length × height', '400×200 mm'], ['Thickness', '100, 150 or 200 mm'], ['Standard', 'IS 2185 (Part 1)'], ['Sold', 'Per piece']],
    benefits: ['Lighter than solid blocks', 'Hollow cores let you place reinforcement and concrete', 'Lays quickly with fewer joints', 'Lower cost per square metre of wall'],
    useCases: ['Non-load-bearing and infill walls', 'Partition walls', 'Compound walls with reinforced cores'],
    specifications: { Material: 'Cement concrete, hollow', Size: '400×200 mm face, 100/150/200 mm thick', Standard: 'IS 2185 (Part 1)', Strength: 'Strength grade per IS 2185 (Part 1); ask for the grade you need', Supply: 'Palletised or loose' },
    basis: BRICK_BASIS,
  },
  'facing-brick': {
    description: 'Burnt clay facing bricks with a textured, even finish, made to be left exposed. For façades and feature walls where you want the brick to show.',
    sizes: ['230×110×75 mm'], variants: [],
    facts: [['Material', 'Burnt clay, textured'], ['Size', '230×110×75 mm'], ['Standard', 'IS 2691 (burnt clay facing bricks)'], ['Sold', 'Per piece']],
    benefits: ['Attractive finish with no plaster needed', 'Weather-resistant when well burnt', 'Durable, with low maintenance'],
    useCases: ['Exposed brick façades', 'Feature walls', 'Compound walls and gate pillars'],
    specifications: { Material: 'Burnt clay, textured', Size: '230×110×75 mm', Standard: 'IS 2691', Finish: 'Textured; colour varies a little between batches', Supply: 'Loose or palletised' },
    basis: BRICK_BASIS,
  },
  'paver-block': {
    description: 'Precast concrete interlocking paver blocks for driveways, yards and pathways. Choose the thickness by traffic load.',
    sizes: ['60 mm thick', '80 mm thick', '100 mm thick'], variants: [],
    facts: [['Material', 'Precast cement concrete'], ['Thickness', '60, 80 or 100 mm'], ['Standard', 'IS 15658 (precast concrete blocks for paving)'], ['Sold', 'Per square metre or per piece']],
    benefits: ['Interlocking pattern spreads load', 'Free-draining joints', 'Single blocks can be lifted and replaced', 'Non-slip surface'],
    useCases: ['Driveways and parking', 'Yards and plazas', 'Pathways and footpaths', 'Factory and industrial yards (use 80 to 100 mm)'],
    specifications: { Material: 'Precast cement concrete', Thickness: '60, 80 or 100 mm, chosen by traffic', Standard: 'IS 15658', Strength: 'Grade rises with thickness and traffic; see IS 15658', Bedding: 'Sand bedding and joint sand', Supply: 'Palletised' },
    basis: BRICK_BASIS,
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const products: Product[] = defs.flatMap((d) =>
  d.rows.map((r, i): Product => {
    const [name, materialType, finish, color, base, accent, pattern, apps, styles, description] = r;
    const swatch: Swatch = { base, accent, pattern };
    const item: Product = {
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
      swatch, images: productImages[slugify(name)] ? [productImages[slugify(name)].src] : [], imageFit: productImages[slugify(name)]?.fit, datasheetUrl: '#', // PLACEHOLDER
    };
    const extra = brandDetails[slugify(name)];
    const out = extra ? { ...item, ...extra } : item;
    if (d.slug !== 'bricks-blocks') return out;
    const availability = IN_STOCK.has(out.slug) ? 'In stock' : 'On order';
    return { ...out, availability, facts: [...(out.facts ?? []), ['Availability', availability]], specifications: { ...out.specifications, Availability: availability } };
  }),
);

export const allFinishes = Array.from(new Set(products.map((p) => p.finish))).sort();
export const allColors = Array.from(new Set(products.map((p) => p.color))).sort();
export const allApplications = Array.from(new Set(products.flatMap((p) => p.applications))).sort();
export const allStyles = Array.from(new Set(products.flatMap((p) => p.styles))).sort();
