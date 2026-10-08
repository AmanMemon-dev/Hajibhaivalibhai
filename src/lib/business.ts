/** PLACEHOLDER business details — replace with real data (or load from env / CMS). */
export const business = {
  name: 'Hajibhai Valibhai',
  tagline: 'Building Materials. Architectural Surfaces. Better Spaces.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '910000000000', // PLACEHOLDER
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 00000 00000',   // PLACEHOLDER
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@example.com',  // PLACEHOLDER
  address: 'Showroom address line, Your City, State, PIN',      // PLACEHOLDER
  hours: 'Mon–Sat 9:00–19:00 · Sun by appointment',             // PLACEHOLDER
  site: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  social: [
    { name: 'Instagram', href: '#' }, { name: 'Facebook', href: '#' }, { name: 'YouTube', href: '#' }, { name: 'LinkedIn', href: '#' },
  ], // PLACEHOLDER links
};
export const waLink = (text: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
