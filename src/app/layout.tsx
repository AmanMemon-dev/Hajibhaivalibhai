import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Shell } from '@/components/layout/Shell';
import { business } from '@/lib/business';

export const metadata: Metadata = {
  metadataBase: new URL(business.site),
  title: { default: 'Hajibhai Valibhai — Building Materials, Stone, Tiles & 3D Visualizer', template: '%s | Hajibhai Valibhai' },
  description: 'Cement, steel, sand, aggregates, granite, marble, tiles, sanitaryware and more. Explore materials, estimate your building, preview in 3D and request a quote.',
  manifest: '/manifest.webmanifest',
  openGraph: { type: 'website', siteName: 'Hajibhai Valibhai', title: 'Hajibhai Valibhai — Materials that shape the spaces you imagine', description: 'A modern material discovery, estimating and 3D visualisation platform backed by decades of trade expertise.', images: ['/og.svg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#F6F3EE', width: 'device-width', initialScale: 1 };

const ld = { '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'Hajibhai Valibhai', description: 'Building materials supplier', url: business.site, telephone: business.phone, email: business.email, address: { '@type': 'PostalAddress', streetAddress: business.address } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body><Shell>{children}</Shell></body>
    </html>
  );
}
