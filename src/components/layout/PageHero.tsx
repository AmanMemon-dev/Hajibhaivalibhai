import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui';
export function PageHero({ eyebrow, title, intro, crumbs, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <section className="container-x pt-8 md:pt-14 pb-10 md:pb-16">
      {crumbs && <div className="mb-8"><Breadcrumbs items={crumbs} /></div>}
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="text-step-4 max-w-5xl">{title}</h1>
      {intro && <p className="mt-6 text-step-1 text-muted max-w-2xl leading-snug">{intro}</p>}
      {children}
    </section>
  );
}
