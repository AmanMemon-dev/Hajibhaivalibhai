/** Business details. Address, hours and social links are still placeholders. */
export const business = {
  name: 'Hajibhai Valibhai',
  tagline: 'Building Materials. Architectural Surfaces. Better Spaces.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '919925488984',
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 99254 88984',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hajibhaivalibhai@gmail.com',
  address: 'Showroom address line, Your City, State, PIN',      // PLACEHOLDER
  hours: 'Mon–Sat 9:00–19:00 · Sun by appointment',             // PLACEHOLDER
  site: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  social: [
    { name: 'Instagram', href: '#' }, { name: 'Facebook', href: '#' }, { name: 'YouTube', href: '#' }, { name: 'LinkedIn', href: '#' },
  ], // PLACEHOLDER links
};
/** Who to call, grouped by what the customer is buying. Shown in About → Team. */
export const contactGroups = [
  {
    title: 'Building materials',
    note: 'Cement, aggregate and steel',
    people: [
      { name: 'Yakub Memon', phone: '9925488984' },
      { name: 'Yasin Memon', phone: '9879966671' },
      { name: 'Aman Memon', phone: '9723696876' },
    ],
  },
  {
    title: 'Colours, plumbing & sanitary',
    note: 'Paint, plumbing and sanitaryware',
    people: [
      { name: 'Mustakim Memon', phone: '9537225401' },
      { name: 'Yunus Memon', phone: '9825597301' },
    ],
  },
];
export const fmtPhone = (n: string) => `+91 ${n.slice(0, 5)} ${n.slice(5)}`;

export const waLink = (text: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
