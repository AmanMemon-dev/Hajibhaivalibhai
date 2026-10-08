'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, QuoteItem, SpaceId, SurfaceKey, DesignSave } from '@/types';
import { defaultOptions, defaultPicks } from '@/data/configurator';

/* ---------- selection (project material list) ---------- */
interface SelState { items: QuoteItem[]; add: (p: Pick<Product, 'slug' | 'name'>, extra?: Partial<QuoteItem>) => void; remove: (slug: string) => void; update: (slug: string, patch: Partial<QuoteItem>) => void; clear: () => void; has: (slug: string) => boolean; }
export const useSelection = create<SelState>()(persist((set, get) => ({
  items: [],
  add: (p, extra) => set((s) => (s.items.some((i) => i.productSlug === p.slug) ? s : { items: [...s.items, { productSlug: p.slug, productName: p.name, ...extra }] })),
  remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.productSlug !== slug) })),
  update: (slug, patch) => set((s) => ({ items: s.items.map((i) => (i.productSlug === slug ? { ...i, ...patch } : i)) })),
  clear: () => set({ items: [] }),
  has: (slug) => get().items.some((i) => i.productSlug === slug),
}), { name: 'hv-selection' }));

/* ---------- wishlist ---------- */
interface WishState { slugs: string[]; toggle: (slug: string) => void; }
export const useWishlist = create<WishState>()(persist((set) => ({
  slugs: [], toggle: (slug) => set((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug] })),
}), { name: 'hv-wishlist' }));

/* ---------- ui ---------- */
interface UIState { palette: boolean; selection: boolean; compare: boolean; menu: boolean; filters: boolean; recent: string[];
  open: (k: 'palette' | 'selection' | 'compare' | 'menu' | 'filters', v?: boolean) => void; addRecent: (q: string) => void; toast: string | null; showToast: (m: string) => void; }
export const useUI = create<UIState>()(persist((set) => ({
  palette: false, selection: false, compare: false, menu: false, filters: false, recent: [], toast: null,
  open: (k, v = true) => set({ [k]: v } as any),
  addRecent: (q) => set((s) => ({ recent: [q, ...s.recent.filter((r) => r !== q)].slice(0, 5) })),
  showToast: (m) => { set({ toast: m }); setTimeout(() => set({ toast: null }), 2600); },
}), { name: 'hv-ui', partialize: (s) => ({ recent: s.recent }) }));

/* ---------- configurator (with undo/redo, URL sync, saves) ---------- */
type Picks = Partial<Record<SurfaceKey, string>>;
interface Snap { picks: Picks; options: Record<string, string>; }
interface CfgState {
  space: SpaceId; picks: Picks; options: Record<string, string>; surface: SurfaceKey; night: boolean; autoRotate: boolean; before: Snap | null; compareB: Snap | null;
  past: Snap[]; future: Snap[]; saves: DesignSave[];
  setSpace: (s: SpaceId) => void; setSurface: (s: SurfaceKey) => void; pick: (surface: SurfaceKey, id: string) => void; setOption: (k: string, v: string) => void;
  undo: () => void; redo: () => void; reset: () => void; toggleNight: () => void; toggleRotate: () => void;
  markBefore: () => void; clearBefore: () => void; setCompareB: (v: boolean) => void;
  save: (name: string) => void; load: (d: DesignSave) => void; deleteSave: (id: string) => void; hydrate: (s: Partial<{ space: SpaceId; picks: Picks; options: Record<string, string> }>) => void;
}
const snap = (s: CfgState): Snap => ({ picks: { ...s.picks }, options: { ...s.options } });
export const useConfigurator = create<CfgState>()(persist((set, get) => ({
  space: 'living', picks: { ...defaultPicks.living }, options: { ...defaultOptions }, surface: 'floor', night: false, autoRotate: false, before: null, compareB: null, past: [], future: [], saves: [],
  setSpace: (space) => set((s) => ({ space, picks: { ...defaultPicks[space] }, surface: (Object.keys(defaultPicks[space])[0] as SurfaceKey), past: [...s.past, snap(s)].slice(-30), future: [], before: null })),
  setSurface: (surface) => set({ surface }),
  pick: (surface, id) => set((s) => ({ picks: { ...s.picks, [surface]: id }, past: [...s.past, snap(s)].slice(-30), future: [] })),
  setOption: (k, v) => set((s) => ({ options: { ...s.options, [k]: v }, past: [...s.past, snap(s)].slice(-30), future: [] })),
  undo: () => set((s) => { const p = s.past[s.past.length - 1]; return p ? { ...p, past: s.past.slice(0, -1), future: [snap(s), ...s.future] } : s; }),
  redo: () => set((s) => { const f = s.future[0]; return f ? { ...f, future: s.future.slice(1), past: [...s.past, snap(s)] } : s; }),
  reset: () => set((s) => ({ picks: { ...defaultPicks[s.space] }, options: { ...defaultOptions }, past: [...s.past, snap(s)], future: [] })),
  toggleNight: () => set((s) => ({ night: !s.night })),
  toggleRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  markBefore: () => set((s) => ({ before: snap(s) })),
  clearBefore: () => set({ before: null }),
  setCompareB: (v) => set((s) => ({ compareB: v ? snap(s) : null })),
  save: (name) => set((s) => ({ saves: [{ id: String(Date.now()), name: name || 'My design', space: s.space, picks: { ...s.picks }, options: { ...s.options }, createdAt: new Date().toISOString() }, ...s.saves].slice(0, 12) })),
  load: (d) => set((s) => ({ space: d.space, picks: { ...d.picks }, options: { ...d.options }, past: [...s.past, snap(s)], future: [] })),
  deleteSave: (id) => set((s) => ({ saves: s.saves.filter((x) => x.id !== id) })),
  hydrate: (v) => set((s) => ({ ...s, ...v })),
}), { name: 'hv-configurator', partialize: (s) => ({ saves: s.saves }) }));
