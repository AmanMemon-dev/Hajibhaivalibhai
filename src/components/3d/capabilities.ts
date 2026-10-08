/** Device capability checks used to decide between the WebGL experience and the 2D fallback. */
export function hasWebGL(): boolean {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch { return false; }
}
export function prefersReducedMotion() { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
export function isLowPower(): boolean {
  const n = navigator as any;
  return !!((n.deviceMemory && n.deviceMemory <= 2) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2 && isMobile()) || n.connection?.saveData);
}
export function isMobile() { return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches; }


