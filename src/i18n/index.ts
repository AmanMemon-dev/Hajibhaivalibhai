'use client';
/**
 * English-only copy for nav, hero and CTAs.
 */
export const dict = {
  en: { 'nav.home': 'Home', 'nav.materials': 'Materials', 'nav.visualize': 'Visualize', 'nav.inspiration': 'Inspiration', 'nav.about': 'About', 'nav.contact': 'Contact', 'cta.quote': 'Request Quote', 'cta.explore': 'Explore Materials', 'cta.visualize': 'Visualize Your Space', 'cta.whatsapp': 'WhatsApp us', 'search.ph': 'Search materials, products, finishes…', 'hero.title': 'Materials that shape the spaces you imagine.', 'hero.sub': 'Stone, tiles, cement, steel, sanitaryware and more — explore, compare and preview them in 3D, then request a quote.' },
} as const;
export type Key = keyof typeof dict.en;
export function useT() {
  return (k: Key) => dict.en[k];
}
