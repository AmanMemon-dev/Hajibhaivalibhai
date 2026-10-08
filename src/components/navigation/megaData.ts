import { categories } from '@/data/categories';
const bySlug = (s: string) => categories.find((c) => c.slug === s)!;
export const megaColumns = [
  { title: 'Building Materials', items: ['cement', 'sand', 'aggregates', 'bricks-blocks'] },
  { title: 'Surfaces', items: ['granite', 'marble', 'tiles', 'natural-stone'] },
  { title: 'Structural', items: ['steel', 'aluminium'] },
  { title: 'Finishing', items: ['colours-finishes'] },
  { title: 'Bathroom', items: ['sanitaryware', 'plumbing'] },
].map((c) => ({ ...c, cats: c.items.map(bySlug) }));
