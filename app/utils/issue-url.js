/**
 * Build a canonical issue hash that retains the active view.
 *
 * @param {'board'|'worker'|'monitor'|'compare'|'adr'} view
 * @param {string} id
 */
export function issueHashFor(view, id) {
  const v =
    view === 'worker' ||
    view === 'monitor' ||
    view === 'compare' ||
    view === 'adr'
      ? view
      : 'board';
  return `#/${v}?issue=${encodeURIComponent(id)}`;
}
