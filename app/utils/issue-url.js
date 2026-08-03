/**
 * Build a canonical issue hash that retains the active view.
 *
 * @param {'board'|'worker'|'monitor'} view
 * @param {string} id
 */
export function issueHashFor(view, id) {
  const v = view === 'worker' || view === 'monitor' ? view : 'board';
  return `#/${v}?issue=${encodeURIComponent(id)}`;
}
