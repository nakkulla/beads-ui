/**
 * Shared sort comparators for issues lists.
 * Centralizes sorting so views and stores stay consistent.
 */

/**
 * @typedef {{ id: string, title?: string, status?: 'open'|'in_progress'|'deferred'|'resolved'|'closed', priority?: number, issue_type?: string, created_at?: number | string, updated_at?: number, closed_at?: number }} IssueLite
 */

/**
 * Normalize a created_at value into epoch milliseconds for sorting.
 *
 * @param {number | string | undefined} timestamp_value
 * @returns {number}
 */
function toSortableTimestamp(timestamp_value) {
  if (typeof timestamp_value === 'number') {
    return Number.isFinite(timestamp_value) ? timestamp_value : 0;
  }
  if (typeof timestamp_value === 'string') {
    const parsed_ms = Date.parse(timestamp_value);
    return Number.isFinite(parsed_ms) ? parsed_ms : 0;
  }
  return 0;
}

/**
 * Compare open issues by created_at desc, then priority asc, then id asc.
 *
 * @param {IssueLite} a
 * @param {IssueLite} b
 */
export function cmpCreatedDescThenPriority(a, b) {
  const ca = toSortableTimestamp(a.created_at);
  const cb = toSortableTimestamp(b.created_at);
  if (ca !== cb) {
    return ca < cb ? 1 : -1;
  }
  const pa = a.priority ?? 2;
  const pb = b.priority ?? 2;
  if (pa !== pb) {
    return pa - pb;
  }
  const ida = a.id;
  const idb = b.id;
  return ida < idb ? -1 : ida > idb ? 1 : 0;
}

/**
 * Compare by closed_at desc, then id asc for stability.
 *
 * @param {IssueLite} a
 * @param {IssueLite} b
 */
export function cmpClosedDesc(a, b) {
  const ca = a.closed_at ?? 0;
  const cb = b.closed_at ?? 0;
  if (ca !== cb) {
    return ca < cb ? 1 : -1;
  }
  const ida = a?.id;
  const idb = b?.id;
  return ida < idb ? -1 : ida > idb ? 1 : 0;
}
