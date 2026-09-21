/**
 * Build a canonical issue hash that retains the active view. An unknown view
 * falls back to worker, the single repo-scoped tab (UI-p7s2 §7.1).
 *
 * @param {'worker'|'monitor'|'compare'|'adr'} view
 * @param {string} id
 */
export function issueHashFor(view, id) {
  const v =
    view === 'monitor' || view === 'compare' || view === 'adr'
      ? view
      : 'worker';
  return `#/${v}?issue=${encodeURIComponent(id)}`;
}
