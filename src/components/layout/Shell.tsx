'use client';
import { usePathname } from 'next/navigation';
import { Providers } from './Providers';
import { Header } from '@/components/navigation/Header';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { Footer } from './Footer';
import { CookieBanner, FloatingActions, MobileBar, ScrollProgress, Toast } from './Floating';
import { SelectionDrawer } from '@/components/quote/SelectionDrawer';

export function Shell({ children }: { children: React.ReactNode }) {
  const app = usePathname().startsWith('/visualize'); // full-screen tool: no footer or floating buttons
  return (
    <Providers>
      <ScrollProgress /><Header /><MobileMenu />
      <main id="main" className="min-h-[70vh]">{children}</main>
      {!app && <><Footer /><FloatingActions /></>}<MobileBar /><SelectionDrawer /><Toast /><CookieBanner />
    </Providers>
  );
}
