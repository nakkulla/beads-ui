/**
 * Build a canonical issue hash that retains the active view.
 *
 * @param {'board'|'worker'} view
 * @param {string} id
 */
export function issueHashFor(view, id) {
  const v = view === 'worker' ? 'worker' : 'board';
  return `#/${v}?issue=${encodeURIComponent(id)}`;
}
