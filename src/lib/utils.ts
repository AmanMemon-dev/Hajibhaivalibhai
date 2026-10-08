export const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');
export const productHref = (p: { categorySlug: string; slug: string }) => `/materials/${p.categorySlug}/${p.slug}/`;
