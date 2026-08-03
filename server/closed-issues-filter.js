// A leaf module on purpose: both `list-adapters.js` (which filters BEFORE
// enrichment so out-of-range issues never pay the enrich + provenance cost) and
// `ws/context.js` (which re-exports it for the diff/emit path) depend on it, and
// several ws tests full-mock `./list-adapters.js`, so routing the filter through
// either of those modules would leave it undefined under those mocks.

/**
 * Drop `closed-issues` items closed before `params.since` (epoch ms, inclusive).
 *
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 * @param {Array<{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>>} items
 */
export function applyClosedIssuesFilter(spec, items) {
  if (String(spec.type) !== 'closed-issues') {
    return items;
  }
  const since = closedIssuesSince(spec);
  if (since === null) {
    return items;
  }
  /** @type {typeof items} */
  const out = [];
  for (const it of items) {
    const ca = it.closed_at;
    if (typeof ca === 'number' && Number.isFinite(ca) && ca >= since) {
      out.push(it);
    }
  }
  return out;
}

/**
 * Read the inclusive `closed_at` lower bound (epoch ms) off a subscription
 * spec, or null when the subscription covers the whole range.
 *
 * @param {{ params?: Record<string, string|number|boolean> }} spec
 * @returns {number | null}
 */
export function closedIssuesSince(spec) {
  const p = spec.params || {};
  const since = typeof p.since === 'number' ? p.since : 0;
  if (!Number.isFinite(since) || since <= 0) {
    return null;
  }
  return since;
}
