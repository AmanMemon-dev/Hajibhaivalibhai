/** Business details. Address, hours and social links are still placeholders. */
export const business = {
  name: 'Hajibhai Valibhai',
  tagline: 'Building Materials. Architectural Surfaces. Better Spaces.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '919925488984',
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 99254 88984',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hajibhaivalibhai@gmail.com',
  address: 'M/s Hajibhai Valibhai — open the map for the exact location',  // TODO: replace with the street address text
  hours: 'Mon–Sat 9:00–19:00 · Sun by appointment',             // PLACEHOLDER
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.48098213267!2d71.89797307511331!3d23.694511978708547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395b873cc151f8c5%3A0xa2543074df2b3093!2sM%2Fs%20Hajibhai%20Valibhai!5e0!3m2!1sen!2sin!4v1791458737180!5m2!1sen!2sin',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=23.694512,71.897973',
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
