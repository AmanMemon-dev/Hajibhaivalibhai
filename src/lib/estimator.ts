/**
 * Whole-building material estimator (planning-grade Bill of Quantities).
 *
 * IMPORTANT: this is an ESTIMATE based on standard Indian site practice and widely used norms, NOT a structural
 * design. Structural sizes, bar schedules, setbacks, FAR, seismic zone and bylaws must come from a licensed
 * structural engineer / architect and your local authority. Norm references are noted per item (IS 456 concrete,
 * IS 1077/2185/2212/6041 masonry units, IS 2250 mortar, IS 1661/2402 plaster, IS 1786 rebar, IS 15622 adhesives,
 * IS 13630/15622 tiles, NBC 2016 for water demand). All constants live in NORMS so an engineer can tune them.
 */

export type WallType = 'clay-modular' | 'clay-standard' | 'flyash' | 'aac' | 'concrete-block';
export type Grade = 'M15' | 'M20' | 'M25' | 'M30';
export type TilePattern = 'straight' | 'diagonal' | 'herringbone';
export type Fixing = 'adhesive' | 'mortar';
export type Density = 'open' | 'standard' | 'compact';

export interface EstimatorInput {
  mode: 'dimensions' | 'area';
  length: number; width: number;            // metres (UI converts from ft)
  builtUpArea: number;                      // m² per floor, used when mode === 'area'
  floors: number;                           // number of storeys incl. ground (G+0 = 1)
  floorHeight: number;                      // m, floor-to-floor
  slabThickness: number;                    // m
  parapetHeight: number;                    // m
  foundationDepth: number;                  // m below plinth
  gridSpacing: number;                      // m column grid
  concrete: Grade;
  columnSection: 'auto' | '230x230' | '230x300' | '230x380' | '300x450';
  staircase: boolean;
  // masonry
  wallType: WallType; extThickness: number; intThickness: number; mortarRatio: number; // cement parts (1:n)
  density: Density;
  windows: number; windowW: number; windowH: number; extDoors: number; intDoors: number; doorW: number; doorH: number;
  // plaster
  intPlasterT: number; extPlasterT: number; ceilPlasterT: number; intPlasterRatio: number; extPlasterRatio: number; ceilPlasterRatio: number;
  // flooring & tiling
  carpetRatio: number; tileL: number; tileW: number; tileT: number; jointMm: number; pattern: TilePattern; fixing: Fixing;
  bathrooms: number; bathTileHeight: number; kitchens: number; kitchenTileHeight: number;
  // paint
  paintInterior: boolean; paintExterior: boolean; coats: number; waterproofTerrace: boolean;
  // services
  occupants: number;
  // wastage (%)
  wasteCement: number; wasteAgg: number; wasteSteel: number; wasteBrick: number;
}

export const defaultInput = (): EstimatorInput => ({
  mode: 'dimensions', length: 12, width: 9, builtUpArea: 108, floors: 2, floorHeight: 3.05, slabThickness: 0.125, parapetHeight: 1.0, foundationDepth: 1.5, gridSpacing: 3.5,
  concrete: 'M20', columnSection: 'auto', staircase: true,
  wallType: 'clay-standard', extThickness: 0.23, intThickness: 0.115, mortarRatio: 6, density: 'standard',
  windows: 10, windowW: 1.2, windowH: 1.2, extDoors: 2, intDoors: 10, doorW: 0.9, doorH: 2.1,
  intPlasterT: 0.012, extPlasterT: 0.02, ceilPlasterT: 0.01, intPlasterRatio: 5, extPlasterRatio: 4, ceilPlasterRatio: 3,
  carpetRatio: 0.85, tileL: 0.6, tileW: 0.6, tileT: 10, jointMm: 2, pattern: 'straight', fixing: 'adhesive',
  bathrooms: 3, bathTileHeight: 2.1, kitchens: 1, kitchenTileHeight: 0.6,
  paintInterior: true, paintExterior: true, coats: 2, waterproofTerrace: true,
  occupants: 6, wasteCement: 3, wasteAgg: 5, wasteSteel: 3, wasteBrick: 5,
});

/** Suggest door/window counts and occupants from built-up area (starting point the user can edit). */
export function suggestOpenings(areaPerFloor: number, floors: number) {
  const total = areaPerFloor * floors;
  return { windows: Math.max(4, Math.round(total / 22)), extDoors: Math.max(1, floors === 1 ? 2 : 2), intDoors: Math.max(3, Math.round(total / 20)), bathrooms: Math.max(1, Math.round(total / 70)), occupants: Math.max(3, Math.round(total / 30)) };
}

/* ---------------- norms ---------------- */
export const NORMS = {
  cementBagKg: 50, cementBagM3: 0.0347,         // 50 kg bag ≈ 0.0347 m³ at 1440 kg/m³
  concreteDry: 1.54,                             // wet→dry volume factor, IS 456 practice
  mortarDryMasonry: 1.30, mortarDryPlaster: 1.27,
  plasterUnevenAllowance: 1.15,                  // +15% for surface undulation / wall absorption
  sandTonnePerM3: 1.55, aggTonnePerM3: 1.50, cft: 35.3147, brassM3: 2.8317,
  mixes: { M15: [1, 2, 4], M20: [1, 1.5, 3], M25: [1, 1, 2], M30: [1, 0.75, 1.5] } as Record<Grade, number[]>,
  // kg of steel per m³ of concrete (typical residential ranges, engineer to confirm)
  steel: { footing: 70, column: 160, beam: 140, slab: 85, lintel: 90, stair: 100, plinth: 120 },
  bindingWireFraction: 0.008,
  joint: { conventional: 0.010, thin: 0.003 },
  thinBedKgPerM3: 30,
  units: {
    'clay-modular': { name: 'Modular clay brick 190×90×90', l: 0.19, w: 0.09, h: 0.09, thin: false, solidFactor: 1 },
    'clay-standard': { name: 'Standard clay brick 230×110×75', l: 0.23, w: 0.11, h: 0.075, thin: false, solidFactor: 1 },
    flyash: { name: 'Fly-ash brick 230×110×75', l: 0.23, w: 0.11, h: 0.075, thin: false, solidFactor: 1 },
    aac: { name: 'AAC block 600×200×T', l: 0.6, w: 0.2, h: 0.2, thin: true, solidFactor: 1 },
    'concrete-block': { name: 'Solid concrete block 400×200×T', l: 0.4, w: 0.2, h: 0.2, thin: false, solidFactor: 1 },
  } as Record<WallType, { name: string; l: number; w: number; h: number; thin: boolean; solidFactor: number }>,
  densityFactor: { open: 0.2, standard: 0.3, compact: 0.4 } as Record<Density, number>, // internal wall m per m² floor
  adhesiveKgM2: (area: number) => (area <= 0.1 ? 4 : area <= 0.4 ? 5 : 6.5),
  groutDensity: 1.6,
  bedMm: { adhesive: 25, mortar: 40 },
  putty: 1.5, primerM2L: 11, interiorM2L: 11, exteriorM2L: 9, waterproofKgM2: 1.5,
  waterLpcd: 135, overheadFraction: 0.5, tankSizes: [500, 750, 1000, 1500, 2000, 3000, 5000],
  plumbing: { cpvcPerBath: 12, cpvcPerKitchen: 8, cpvcMain: 15, cpvcPerFloor: 6, swrPerBath: 8, swrPerKitchen: 5, fittingsPerBath: 22, fittingsPerKitchen: 10 },
};

export interface Line { key: string; group: string; label: string; qty: number; unit: string; note?: string; productSlug?: string; productName?: string }
export interface Result {
  geometry: { L: number; W: number; perimeter: number; areaPerFloor: number; totalBuilt: number; carpet: number; columns: number; footingSize: number; bays: [number, number]; extWallArea: number; intWallArea: number; extWallVol: number; intWallVol: number };
  concrete: { name: string; volume: number }[]; concreteTotal: number;
  lines: Line[];
  totals: { cementBags: number; cementTonnes: number; sandM3: number; sandTonnes: number; sandBrass: number; aggM3: number; aggTonnes: number; aggBrass: number; steelKg: number; steelTonnes: number; wallUnits: number; wallUnitName: string; tileM2: number };
  cementByWork: { label: string; bags: number }[];
  assumptions: { label: string; value: string }[];
  warnings: string[];
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
const up = (n: number) => Math.ceil(n - 1e-9);

function mixQuantities(wetVol: number, ratio: number[], dry: number) {
  const dryVol = wetVol * dry; const sum = ratio.reduce((a, b) => a + b, 0);
  return { cement: (dryVol * ratio[0]) / sum, sand: (dryVol * ratio[1]) / sum, agg: ratio[2] ? (dryVol * ratio[2]) / sum : 0 };
}

export function estimate(inp: EstimatorInput): Result {
  const N = NORMS; const warnings: string[] = [];
  const floors = Math.max(1, Math.round(inp.floors));
  // ---- plan geometry
  let L = inp.length, W = inp.width;
  if (inp.mode === 'area') { L = Math.sqrt(inp.builtUpArea * 1.25); W = inp.builtUpArea / L; }
  const A = L * W, perimeter = 2 * (L + W), totalBuilt = A * floors, carpet = totalBuilt * inp.carpetRatio;
  const bx = Math.max(1, up(L / inp.gridSpacing)), by = Math.max(1, up(W / inp.gridSpacing));
  const columns = (bx + 1) * (by + 1);
  const gridLen = (by + 1) * L + (bx + 1) * W; // beam length per level
  const H = inp.floorHeight;
  if (floors > 4) warnings.push('Buildings above G+3 need a full structural design (and lift/fire provisions). Treat these figures as a rough guide only.');
  if (inp.gridSpacing > 4.5) warnings.push('Column spans above 4.5 m usually need deeper beams — confirm with your structural engineer.');
  if ((inp.concrete === 'M25' || inp.concrete === 'M30')) warnings.push('IS 456 recommends a design mix (not nominal mix) for M25 and above; quantities here use indicative proportions.');

  // ---- sections
  const sec: Record<string, [number, number]> = { '230x230': [0.23, 0.23], '230x300': [0.23, 0.3], '230x380': [0.23, 0.38], '300x450': [0.3, 0.45] };
  const autoSec = floors <= 2 ? '230x300' : floors === 3 ? '230x380' : '300x450';
  const [cw, cd] = sec[inp.columnSection === 'auto' ? autoSec : inp.columnSection];
  const footing = floors === 1 ? 1.2 : floors === 2 ? 1.5 : floors === 3 ? 1.8 : 2.1;
  const footT = floors <= 2 ? 0.45 : 0.6;
  const shaftH = Math.max(0.3, inp.foundationDepth - footT);

  // ---- openings
  const winArea = inp.windows * inp.windowW * inp.windowH;
  const doorArea = (inp.extDoors + inp.intDoors) * inp.doorW * inp.doorH;
  const extDoorArea = inp.extDoors * inp.doorW * inp.doorH;
  const intDoorArea = inp.intDoors * inp.doorW * inp.doorH;

  // ---- walls
  const extGross = perimeter * H * floors;
  const intLenPerFloor = A * N.densityFactor[inp.density];
  const intGross = intLenPerFloor * H * floors;
  const extWallArea = Math.max(0, extGross - winArea - extDoorArea);
  const intWallArea = Math.max(0, intGross - intDoorArea);
  const parapetVol = perimeter * inp.parapetHeight * inp.intThickness;
  // beams/slab reduce wall height: deduct beam depth below slab on external walls
  const beamBelow = Math.max(0.1, 0.45 - inp.slabThickness);
  const extWallVol = Math.max(0, extWallArea - perimeter * beamBelow * floors) * inp.extThickness + parapetVol;
  const intWallVol = intWallArea * inp.intThickness;
  const wallVol = extWallVol + intWallVol;

  // ---- concrete elements (wet volume m³)
  const pccThick = 0.1, pccSide = footing + 0.15;
  const vPCC = columns * pccSide * pccSide * pccThick;
  const vFooting = columns * footing * footing * footT;
  const vColumn = columns * cw * cd * (shaftH + H * floors);
  const vPlinth = gridLen * 0.23 * 0.3;
  const levels = floors; // floor slabs incl. roof
  const vBeam = gridLen * 0.23 * beamBelow * levels;
  const vSlab = A * inp.slabThickness * levels;
  const lintelLen = inp.windows * (inp.windowW + 0.3) + (inp.extDoors + inp.intDoors) * (inp.doorW + 0.3);
  const vLintel = lintelLen * inp.extThickness * 0.15 * 0.8 + 0; // ~ average wall thickness
  const stairStoreys = inp.staircase && floors > 1 ? floors : 0;
  const vStair = stairStoreys * 1.5;
  const vSunshade = inp.windows * inp.windowW * 0.45 * 0.075; // optional chajja
  const elems = [
    { name: 'PCC under footings (1:4:8)', volume: vPCC, mix: [1, 4, 8], steel: 0 },
    { name: 'Footings', volume: vFooting, mix: N.mixes[inp.concrete], steel: N.steel.footing },
    { name: 'Columns', volume: vColumn, mix: N.mixes[inp.concrete], steel: N.steel.column },
    { name: 'Plinth beam', volume: vPlinth, mix: N.mixes[inp.concrete], steel: N.steel.plinth },
    { name: 'Floor beams', volume: vBeam, mix: N.mixes[inp.concrete], steel: N.steel.beam },
    { name: 'Slabs (floors + roof)', volume: vSlab, mix: N.mixes[inp.concrete], steel: N.steel.slab },
    { name: 'Lintels & sunshades', volume: vLintel + vSunshade, mix: N.mixes[inp.concrete], steel: N.steel.lintel },
    { name: 'Staircase', volume: vStair, mix: N.mixes[inp.concrete], steel: N.steel.stair },
  ];
  let cementVol = 0, sandVol = 0, aggVol = 0, steelKg = 0;
  const cementByWork: { label: string; bags: number }[] = [];
  const concrete: { name: string; volume: number }[] = [];
  let rccCement = 0;
  for (const e of elems) {
    const q = mixQuantities(e.volume, e.mix, N.concreteDry);
    cementVol += q.cement; sandVol += q.sand; aggVol += q.agg; steelKg += e.volume * e.steel;
    concrete.push({ name: e.name, volume: r2(e.volume) });
    rccCement += q.cement;
  }
  cementByWork.push({ label: 'Concrete (PCC + RCC)', bags: rccCement / N.cementBagM3 });
  const concreteTotal = elems.reduce((a, e) => a + e.volume, 0);

  // ---- masonry
  const u = N.units[inp.wallType];
  const joint = u.thin ? N.joint.thin : N.joint.conventional;
  const isBlock = inp.wallType === 'aac' || inp.wallType === 'concrete-block';
  // units per m³ of wall = 1 / (unit volume incl. mortar joints); blocks take their depth from the wall thickness
  const unitsPerM3 = (t: number) => (isBlock ? 1 / ((u.l + joint) * (u.h + joint) * t) : 1 / ((u.l + joint) * (u.w + joint) * (u.h + joint)));
  const unitSolid = (t: number) => (isBlock ? u.l * u.h * t : u.l * u.w * u.h);
  const extUnits = extWallVol * unitsPerM3(inp.extThickness);
  const intUnits = intWallVol * unitsPerM3(inp.intThickness);
  const wallUnits = (extUnits + intUnits) * (1 + inp.wasteBrick / 100);
  const mortarWet = Math.max(0, extWallVol - extUnits * unitSolid(inp.extThickness)) + Math.max(0, intWallVol - intUnits * unitSolid(inp.intThickness));
  let masonryCementBags = 0, thinBedKg = 0;
  if (u.thin) {
    thinBedKg = wallVol * N.thinBedKgPerM3;
  } else {
    const q = mixQuantities(mortarWet, [1, inp.mortarRatio], N.mortarDryMasonry);
    masonryCementBags = q.cement / N.cementBagM3;
    cementVol += q.cement; sandVol += q.sand;
    cementByWork.push({ label: 'Masonry mortar', bags: masonryCementBags });
  }
  void masonryCementBags;

  // ---- plaster (IS 1661) — areas
  const extPlasterArea = Math.max(0, perimeter * (H * floors + inp.parapetHeight) - winArea - extDoorArea);
  const intWallPlasterArea = extWallArea + 2 * intWallArea - intDoorArea * 0; // inner face of ext + both faces of int
  const ceilArea = A * floors;
  const plasterParts = [
    { label: 'External plaster', area: extPlasterArea, t: inp.extPlasterT, ratio: inp.extPlasterRatio },
    { label: 'Internal plaster', area: intWallPlasterArea, t: inp.intPlasterT, ratio: inp.intPlasterRatio },
    { label: 'Ceiling plaster', area: ceilArea, t: inp.ceilPlasterT, ratio: inp.ceilPlasterRatio },
  ];
  let plasterCementVol = 0, plasterSandVol = 0;
  for (const p of plasterParts) {
    const q = mixQuantities(p.area * p.t * N.plasterUnevenAllowance, [1, p.ratio], N.mortarDryPlaster);
    plasterCementVol += q.cement; plasterSandVol += q.sand;
  }
  cementVol += plasterCementVol; sandVol += plasterSandVol;
  cementByWork.push({ label: 'Plaster', bags: plasterCementVol / N.cementBagM3 });

  // ---- flooring & tiling
  const bathFloor = inp.bathrooms * 3.0;
  const mainFloor = Math.max(0, carpet - bathFloor);
  const tileArea = inp.tileL * inp.tileW;
  const patWaste = inp.pattern === 'straight' ? 1.08 : inp.pattern === 'diagonal' ? 1.12 : 1.15;
  const floorTileM2 = mainFloor * patWaste;
  const floorPieces = up(floorTileM2 / tileArea);
  const bathWall = inp.bathrooms * (7.0 * inp.bathTileHeight - 1.6);
  const kitchenWall = inp.kitchens * 3.0 * inp.kitchenTileHeight;
  const bathFloorTile = bathFloor * 1.1;
  const wallTileM2 = (bathWall + kitchenWall) * 1.1;
  const allTileM2 = floorTileM2 + bathFloorTile + wallTileM2;
  const bedMm = N.bedMm[inp.fixing] / 1000;
  const screedWet = (mainFloor + bathFloor) * bedMm;
  const sq = mixQuantities(screedWet, [1, 4], N.mortarDryMasonry);
  cementVol += sq.cement; sandVol += sq.sand;
  cementByWork.push({ label: inp.fixing === 'mortar' ? 'Tile mortar bed' : 'Levelling screed', bags: sq.cement / N.cementBagM3 });
  const adhesiveKg = inp.fixing === 'adhesive' ? (mainFloor * N.adhesiveKgM2(tileArea) + wallTileM2 / 1.1 * 4.5 + bathFloor * 5) : wallTileM2 / 1.1 * 4.5;
  const groutKgM2 = ((inp.tileL * 1000 + inp.tileW * 1000) / (inp.tileL * 1000 * inp.tileW * 1000)) * inp.tileT * inp.jointMm * N.groutDensity;
  const groutKg = (mainFloor + bathFloor + wallTileM2 / 1.1) * groutKgM2 * 1.1 + 0.0001;

  // ---- paint & protection
  const intPaintArea = intWallPlasterArea + ceilArea - wallTileM2 / 1.1;
  const extPaintArea = extPlasterArea;
  const puttyKg = inp.paintInterior ? Math.max(0, intPaintArea) * N.putty : 0;
  const primerL = (inp.paintInterior ? Math.max(0, intPaintArea) / N.primerM2L : 0) + (inp.paintExterior ? extPaintArea / N.primerM2L : 0);
  const intPaintL = inp.paintInterior ? (Math.max(0, intPaintArea) * inp.coats) / N.interiorM2L : 0;
  const extPaintL = inp.paintExterior ? (extPaintArea * inp.coats) / N.exteriorM2L : 0;
  const wpArea = (inp.waterproofTerrace ? A : 0) + bathFloor + inp.bathrooms * 7 * 0.3;
  const wpKg = wpArea * N.waterproofKgM2;

  // ---- services
  const P = N.plumbing;
  const cpvc = inp.bathrooms * P.cpvcPerBath + inp.kitchens * P.cpvcPerKitchen + P.cpvcMain + (floors - 1) * P.cpvcPerFloor;
  const swr = inp.bathrooms * P.swrPerBath + inp.kitchens * P.swrPerKitchen + 10;
  const fittings = inp.bathrooms * P.fittingsPerBath + inp.kitchens * P.fittingsPerKitchen;
  const needL = inp.occupants * N.waterLpcd * N.overheadFraction;
  const tank = N.tankSizes.find((s) => s >= needL) ?? N.tankSizes[N.tankSizes.length - 1];

  // ---- totals with wastage
  const cementBags = (cementVol / N.cementBagM3) * (1 + inp.wasteCement / 100);
  const sandM3 = sandVol * (1 + inp.wasteAgg / 100);
  const aggM3 = aggVol * (1 + inp.wasteAgg / 100);
  const steelTotal = steelKg * (1 + inp.wasteSteel / 100);
  const wire = steelTotal * N.bindingWireFraction;
  const wasteMult = (1 + inp.wasteCement / 100);
  cementByWork.forEach((c) => (c.bags = c.bags * wasteMult));

  const L2 = (key: string, group: string, label: string, qty: number, unit: string, productSlug?: string, productName?: string, note?: string): Line => ({ key, group, label, qty, unit, productSlug, productName, note });
  const lines: Line[] = [
    L2('cement', 'Cement', 'Cement (PPC/OPC, 50 kg bags)', up(cementBags), 'bags', 'ppc-cement', 'PPC Cement', `${r1(cementBags * 0.05)} tonnes incl. ${inp.wasteCement}% wastage`),
    L2('sand', 'Sand', 'Sand (M-sand / river sand)', r2(sandM3), 'm³', 'm-sand-concrete-grade', 'M-Sand (Concrete Grade)', `≈ ${r1(sandM3 / N.brassM3)} brass · ${Math.round(sandM3 * N.cft)} cft · ${r1(sandM3 * N.sandTonnePerM3)} t`),
    L2('agg20', 'Aggregates', '20 mm aggregate (RCC)', r2(aggM3 * 0.7), 'm³', '20-mm-aggregate', '20 mm Aggregate', `≈ ${r1((aggM3 * 0.7) * N.aggTonnePerM3)} t`),
    L2('agg10', 'Aggregates', '10 mm aggregate (slabs, lintels, stairs)', r2(aggM3 * 0.3), 'm³', '10-mm-aggregate', '10 mm Aggregate', `≈ ${r1((aggM3 * 0.3) * N.aggTonnePerM3)} t`),
    L2('steel', 'Steel', 'TMT reinforcement bars', Math.round(steelTotal), 'kg', 'tmt-bar-fe-500d', 'TMT Bar Fe 500D', `${r2(steelTotal / 1000)} tonnes incl. ${inp.wasteSteel}% wastage`),
    L2('wire', 'Steel', 'Binding wire', Math.round(wire), 'kg', undefined, undefined, '~0.8% of steel weight'),
    L2('units', 'Walls', u.name + (inp.wallType === 'aac' || inp.wallType === 'concrete-block' ? ` (${Math.round(inp.extThickness * 1000)}/${Math.round(inp.intThickness * 1000)} mm)` : ''), up(wallUnits), 'nos', wallProduct(inp.wallType), undefined, `incl. ${inp.wasteBrick}% breakage · wall volume ${r1(wallVol)} m³`),
  ];
  if (u.thin) lines.push(L2('thinbed', 'Walls', 'Block jointing mortar (thin bed)', Math.round(thinBedKg), 'kg', 'block-jointing-mortar', 'Block Jointing Mortar', `${up(thinBedKg / 25)} × 25 kg bags`));
  lines.push(
    L2('floortile', 'Tiles', 'Floor tiles (living / bedrooms)', r1(floorTileM2), 'm²', 'oak-plank-wood-look-tile', undefined, `${floorPieces} pcs of ${Math.round(inp.tileL * 1000)}×${Math.round(inp.tileW * 1000)} mm incl. ${Math.round((patWaste - 1) * 100)}% wastage`),
    L2('bathfloor', 'Tiles', 'Bathroom floor tiles (anti-skid)', r1(bathFloorTile), 'm²', 'slate-look-anti-skid-tile', undefined, `${inp.bathrooms} bathrooms`),
    L2('walltile', 'Tiles', 'Wall tiles (bathrooms + kitchen)', r1(wallTileM2), 'm²', 'subway-gloss-wall-tile', undefined, 'incl. 10% wastage'),
    L2('adhesive', 'Tiles', 'Tile adhesive', Math.round(adhesiveKg), 'kg', 'premium-tile-adhesive', 'Premium Tile Adhesive', `${up(adhesiveKg / 20)} × 20 kg bags`),
    L2('grout', 'Tiles', 'Tile grout', r1(groutKg), 'kg', 'cementitious-tile-grout', 'Cementitious Tile Grout', `${up(groutKg / 5)} × 5 kg packs · ${inp.jointMm} mm joints`),
  );
  if (inp.paintInterior) lines.push(
    L2('putty', 'Paint', 'Wall putty', Math.round(puttyKg), 'kg', 'wall-putty-white', 'Wall Putty (White)', `${up(puttyKg / 20)} × 20 kg bags · 2 coats`),
    L2('intpaint', 'Paint', `Interior emulsion (${inp.coats} coats)`, r1(intPaintL), 'L', 'premium-interior-emulsion-matt', undefined, `${Math.round(intPaintArea)} m² painted area`),
  );
  if (inp.paintExterior) lines.push(L2('extpaint', 'Paint', `Exterior paint (${inp.coats} coats)`, r1(extPaintL), 'L', 'weather-shield-exterior-paint', undefined, `${Math.round(extPaintArea)} m² façade area`));
  lines.push(L2('primer', 'Paint', 'Primer (1 coat)', r1(primerL), 'L', 'acrylic-primer', 'Acrylic Primer'));
  if (wpKg > 0) lines.push(L2('waterproof', 'Paint', 'Waterproof coating (terrace + wet areas)', Math.round(wpKg), 'kg', 'waterproof-coating', 'Waterproof Coating', `${Math.round(wpArea)} m² treated`));
  lines.push(
    L2('cpvc', 'Plumbing', 'CPVC hot & cold pipe', Math.round(cpvc), 'm', 'cpvc-hot-cold-pipe', 'CPVC Hot & Cold Pipe', `${up(cpvc / 3)} × 3 m lengths`),
    L2('cpvcfit', 'Plumbing', 'CPVC fittings', fittings, 'pcs', 'cpvc-fittings-set', 'CPVC Fittings Set', 'elbows, tees, couplers, valves'),
    L2('swr', 'Plumbing', 'SWR drainage pipe', Math.round(swr), 'm', 'swr-drainage-pipe', 'SWR Drainage Pipe', `${up(swr / 3)} × 3 m lengths`),
    L2('tank', 'Plumbing', 'Overhead water tank', 1, `× ${tank} L`, 'overhead-water-tank-1000-l', undefined, `${inp.occupants} occupants × ${N.waterLpcd} L/day × ${N.overheadFraction * 100}% (NBC 2016 planning figure)`),
    L2('wc', 'Sanitary', 'WC / toilet', inp.bathrooms, 'pcs', 'wall-hung-wc-with-soft-close'),
    L2('basin', 'Sanitary', 'Wash basin', inp.bathrooms + 1, 'pcs', 'counter-top-round-basin'),
    L2('shower', 'Sanitary', 'Shower set', inp.bathrooms, 'pcs', 'chrome-rain-shower-set'),
    L2('faucet', 'Sanitary', 'Faucets / mixers', inp.bathrooms * 3 + inp.kitchens + 1, 'pcs', 'matte-black-basin-mixer'),
    L2('drain', 'Sanitary', 'Floor drains', inp.bathrooms + inp.kitchens + 1, 'pcs', 'floor-drain-trap'),
    L2('windows', 'Openings', 'Aluminium windows', r1(winArea), 'm²', 'slim-sliding-window-profile', undefined, `${inp.windows} windows · ${inp.windowW}×${inp.windowH} m`),
  );

  const g: Result['geometry'] = { L: r2(L), W: r2(W), perimeter: r1(perimeter), areaPerFloor: r1(A), totalBuilt: r1(totalBuilt), carpet: r1(carpet), columns, footingSize: footing, bays: [bx, by], extWallArea: r1(extWallArea), intWallArea: r1(intWallArea), extWallVol: r2(extWallVol), intWallVol: r2(intWallVol) };
  const assumptions = [
    { label: 'Concrete grade / nominal mix', value: `${inp.concrete} (1:${N.mixes[inp.concrete].slice(1).join(':')}), dry factor ${N.concreteDry} — IS 456` },
    { label: 'Cement bag', value: `50 kg = ${N.cementBagM3} m³ (1440 kg/m³)` },
    { label: 'Column grid', value: `${bx}×${by} bays @ ${inp.gridSpacing} m → ${columns} columns, ${cw * 1000}×${cd * 1000} mm` },
    { label: 'Footing', value: `${footing}×${footing}×${footT} m isolated, ${pccThick * 1000} mm PCC 1:4:8 bed` },
    { label: 'Steel intensity (kg/m³)', value: `footing ${N.steel.footing}, column ${N.steel.column}, beam ${N.steel.beam}, slab ${N.steel.slab}, plinth ${N.steel.plinth} — IS 1786 bars` },
    { label: 'Masonry mortar', value: u.thin ? 'thin-bed adhesive ~30 kg/m³' : `1:${inp.mortarRatio} cement:sand, dry factor ${N.mortarDryMasonry}, 10 mm joints` },
    { label: 'Internal wall length', value: `${N.densityFactor[inp.density]} m per m² of floor (${inp.density} layout)` },
    { label: 'Plaster', value: `ext ${inp.extPlasterT * 1000} mm 1:${inp.extPlasterRatio}, int ${inp.intPlasterT * 1000} mm 1:${inp.intPlasterRatio}, ceiling ${inp.ceilPlasterT * 1000} mm 1:${inp.ceilPlasterRatio}; +15% undulation allowance; dry factor ${N.mortarDryPlaster} — IS 1661/2402` },
    { label: 'Tiles', value: `${inp.pattern} lay wastage ${Math.round((patWaste - 1) * 100)}%, ${inp.fixing === 'mortar' ? '40 mm mortar bed' : '25 mm screed + adhesive'}, grout formula (L+W)/(L×W)×T×J×1.6` },
    { label: 'Paint coverage', value: `interior ${N.interiorM2L} m²/L/coat, exterior ${N.exteriorM2L} m²/L/coat, putty ${N.putty} kg/m² (2 coats)` },
    { label: 'Water demand', value: `${N.waterLpcd} L per person per day (NBC 2016 domestic), tank = ${N.overheadFraction * 100}% of daily demand` },
    { label: 'Wastage', value: `cement ${inp.wasteCement}%, sand & aggregate ${inp.wasteAgg}%, steel ${inp.wasteSteel}%, bricks/blocks ${inp.wasteBrick}%` },
  ];

  return {
    geometry: g, concrete, concreteTotal: r2(concreteTotal), lines,
    totals: { cementBags: up(cementBags), cementTonnes: r1(cementBags * 0.05), sandM3: r2(sandM3), sandTonnes: r1(sandM3 * N.sandTonnePerM3), sandBrass: r1(sandM3 / N.brassM3), aggM3: r2(aggM3), aggTonnes: r1(aggM3 * N.aggTonnePerM3), aggBrass: r1(aggM3 / N.brassM3), steelKg: Math.round(steelTotal), steelTonnes: r2(steelTotal / 1000), wallUnits: up(wallUnits), wallUnitName: u.name, tileM2: r1(allTileM2) },
    cementByWork: cementByWork.map((c) => ({ label: c.label, bags: Math.round(c.bags) })), assumptions, warnings,
  };
}

function wallProduct(t: WallType) {
  return ({ 'clay-modular': 'red-clay-brick-class-i', 'clay-standard': 'red-clay-brick-class-i', flyash: 'fly-ash-brick', aac: 'aac-block-200-mm', 'concrete-block': 'solid-concrete-block' } as const)[t];
}

/** Single-purpose helpers shared with the quick calculators. */
export const quick = {
  tile: (area: number, tl: number, tw: number, wastePct: number) => { const pcs = up((area * (1 + wastePct / 100)) / (tl * tw)); return { pieces: pcs, areaWithWaste: r2(area * (1 + wastePct / 100)) }; },
  concrete: (vol: number, grade: Grade) => { const q = mixQuantities(vol, NORMS.mixes[grade], NORMS.concreteDry); return { bags: up(q.cement / NORMS.cementBagM3), sandM3: r2(q.sand), aggM3: r2(q.agg) }; },
  plaster: (area: number, thicknessMm: number, ratio: number) => { const q = mixQuantities(area * (thicknessMm / 1000) * NORMS.plasterUnevenAllowance, [1, ratio], NORMS.mortarDryPlaster); return { bags: up(q.cement / NORMS.cementBagM3), sandM3: r2(q.sand) }; },
  paint: (area: number, coats: number, m2PerL: number) => ({ litres: r1((area * coats) / m2PerL) }),
  /** Unit weight of steel bars: d²/162 kg/m (IS standard formula, d in mm). */
  steelKg: (diaMm: number, lengthM: number, qty: number) => r1((diaMm * diaMm) / 162 * lengthM * qty),
};
