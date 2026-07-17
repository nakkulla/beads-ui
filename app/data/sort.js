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

/**
 * Rank spacing for freshly written manual-order entries. A power of two keeps
 * repeated midpoint insertions exact for as long as float precision allows
 * before a renormalization is forced (spec §2).
 */
export const RANK_STEP = 2 ** 20;

/**
 * The minimal shape the manual-order helpers read. Kept looser than IssueLite
 * (only `id` + `created_at`) so callers with a wider `status` type can pass
 * their lists without a cast.
 *
 * @typedef {{ id: string, created_at?: number | string }} RankableIssue
 */

/**
 * Effective rank of an issue for manual ordering (spec §2): an explicit rank
 * from the order map when present, otherwise `-created_at_ms` so unranked issues
 * (including brand-new ones) sort newest-first above unranked older ones and
 * below anything hand-placed with a negative rank.
 *
 * @param {RankableIssue} issue
 * @param {Record<string, number> | null | undefined} order
 * @returns {number}
 */
export function effectiveRank(issue, order) {
  const id = issue && issue.id;
  if (
    order &&
    typeof id === 'string' &&
    Object.prototype.hasOwnProperty.call(order, id) &&
    typeof order[id] === 'number' &&
    Number.isFinite(order[id])
  ) {
    return order[id];
  }
  return -toSortableTimestamp(issue && issue.created_at);
}

/**
 * Build a comparator that orders by effective rank ascending, then id ascending
 * for stability. `order` is captured once so a single sort observes a coherent
 * rank map.
 *
 * @param {Record<string, number> | null | undefined} order
 * @returns {(a: RankableIssue, b: RankableIssue) => number}
 */
export function cmpEffectiveRank(order) {
  return (a, b) => {
    const ra = effectiveRank(a, order);
    const rb = effectiveRank(b, order);
    if (ra !== rb) {
      return ra < rb ? -1 : 1;
    }
    const ida = a?.id;
    const idb = b?.id;
    return ida < idb ? -1 : ida > idb ? 1 : 0;
  };
}

/**
 * Result of {@link computeDropRank}.
 *
 * - `{ rank }` — the single new effective rank to assign to the dropped bead;
 *   the caller sends `entries: [{ bead_id: dropped_id, rank }]`.
 * - `{ renormalize }` — a full batch that re-ranks the ENTIRE visible list at
 *   `index * RANK_STEP` (dropped bead already at its target slot); the caller
 *   sends these entries verbatim. Emitted only when a midpoint is not strictly
 *   representable between neighbours.
 *
 * @typedef {{ rank: number } | { renormalize: Array<{ bead_id: string, rank: number }> }} DropRankResult
 */

/**
 * Compute the manual rank for a dropped bead (spec §2).
 *
 * `sorted_list` is the column's desired final ordering with the dropped bead
 * ALREADY spliced in at `drop_index`; neighbours are the items immediately above
 * (`drop_index - 1`) and below (`drop_index + 1`). Between two neighbours the
 * rank is their midpoint `m = (a + b) / 2`; at the top it is `first - STEP`; at
 * the bottom `last + STEP`; alone in the column it is `0`.
 *
 * The renormalization trigger is representability, not a fixed epsilon: when
 * `!(a < m < b)` — the midpoint has collapsed onto a neighbour at float
 * precision — the whole list is re-ranked at `index * STEP` so the manual order
 * is restored atomically without losing the relative position of unranked
 * (`-created_at_ms`) fallbacks.
 *
 * @param {RankableIssue[]} sorted_list - Final visible order incl. the dropped bead.
 * @param {number} drop_index - Index the dropped bead occupies in `sorted_list`.
 * @param {Record<string, number> | null | undefined} order - Current order map.
 * @returns {DropRankResult}
 */
export function computeDropRank(sorted_list, drop_index, order) {
  const list = Array.isArray(sorted_list) ? sorted_list : [];
  const n = list.length;
  const idx = Math.max(0, Math.min(drop_index, n - 1));
  const above = idx - 1 >= 0 ? list[idx - 1] : null;
  const below = idx + 1 < n ? list[idx + 1] : null;

  if (!above && !below) {
    return { rank: 0 };
  }
  if (!above) {
    // below is non-null here (both-null handled above).
    return {
      rank:
        effectiveRank(/** @type {RankableIssue} */ (below), order) - RANK_STEP
    };
  }
  if (!below) {
    return { rank: effectiveRank(above, order) + RANK_STEP };
  }

  const a = effectiveRank(above, order);
  const b = effectiveRank(below, order);
  const m = (a + b) / 2;
  if (a < m && m < b) {
    return { rank: m };
  }
  return {
    renormalize: list.map((it, i) => ({ bead_id: it.id, rank: i * RANK_STEP }))
  };
}
