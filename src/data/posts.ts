import type { Post } from '@/types';
export const posts: Post[] = [
  { slug: 'marble-vs-granite', title: 'Marble vs Granite: Which Should You Choose?', excerpt: 'Hardness, maintenance, look and cost compared in plain language.', category: 'Stone guide', readTime: '5 min',
    body: [
      { p: 'Both are natural stones, but they behave differently once installed. Choosing well comes down to where the stone will live and how much care you want to give it.' },
      { h: 'Hardness and wear', p: 'Granite is harder (about 6–7 on the Mohs scale) and resists scratches and heat. Marble is softer (3–4) and can etch when it meets acids such as lemon or tomato.' },
      { h: 'Look and feel', p: 'Marble offers flowing veins and a luxurious, cool surface. Granite has a speckled, crystalline look in a wider range of deep colours.' },
      { h: 'Maintenance', p: 'Seal both. Marble needs more careful cleaning with pH-neutral products; granite tolerates daily kitchen use well.' },
      { h: 'Rule of thumb', p: 'Granite for kitchens, steps and exteriors; marble for living floors, bathrooms and feature walls.' },
    ] },
  { slug: 'which-stone-for-which-use', title: 'Which Stone for Which Use', excerpt: 'A practical map from room to stone: floors, cladding, paving and counters.', category: 'Stone guide', readTime: '6 min',
    body: [
      { p: 'Stone selection is mostly about hardness, porosity and grip.' },
      { h: 'Interior floors', p: 'Marble, limestone, Kota and polished or honed granite. Choose honed for better grip.' },
      { h: 'Kitchen counters', p: 'Granite and quartz-style surfaces; marble only if you accept patina.' },
      { h: 'Exterior cladding', p: 'Slate, sandstone, limestone and flamed granite.' },
      { h: 'Driveways and paving', p: 'Basalt, flamed granite and cobbles, chosen for load and grip.' },
    ] },
  { slug: 'choosing-bathroom-tiles', title: 'Choosing Bathroom Tiles', excerpt: 'Slip ratings, sizes, grout and layout, simplified.', category: 'Tiles', readTime: '4 min',
    body: [
      { p: 'A bathroom needs tiles that cope with water, soap and daily cleaning.' },
      { h: 'Slip resistance', p: 'Use R10 or higher on the floor and glossy or matte tiles on walls.' },
      { h: 'Size', p: 'Smaller tiles on shower floors follow the slope; larger formats on walls reduce grout lines.' },
      { h: 'Grout', p: 'Epoxy grout resists stains and mildew in wet zones.' },
    ] },
  { slug: 'estimating-cement-sand-aggregate', title: 'Estimating Cement, Sand and Aggregate', excerpt: 'How material quantities are estimated for concrete and plaster.', category: 'Construction', readTime: '5 min',
    body: [
      { p: 'Dry volume is roughly 1.54 times wet volume of concrete. Mix ratios then split that volume into cement, sand and aggregate.' },
      { h: 'Use the calculators', p: 'Our calculators give planning estimates. Always confirm with your engineer or contractor.' },
      { h: 'Add wastage', p: 'Allow 5–10% for spillage and variations on site.' },
    ] },
  { slug: 'paint-finish-guide', title: 'Matt, Satin or Gloss: Choosing a Paint Finish', excerpt: 'How sheen affects look, durability and cleaning.', category: 'Colours', readTime: '3 min',
    body: [
      { p: 'Sheen changes how a colour looks and how well it washes.' },
      { h: 'Matt', p: 'Hides surface imperfections; best for bedrooms and ceilings.' },
      { h: 'Satin', p: 'A soft sheen that is easier to clean; suits living areas and corridors.' },
      { h: 'Gloss', p: 'Highly durable for trims and doors but shows every imperfection.' },
    ] },
];
