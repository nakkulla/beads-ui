/**
 * The collapsed 저장소 작업 strip's facts (UI-q0uy §4.1) — moved from
 * `views/worker/lanes.js` (UI-dbn6 Phase 1). Pure: no template.
 */

/**
 * @param {unknown} sha
 * @returns {string}
 */
export function shortSha(sha) {
  return typeof sha === 'string' && sha.length >= 7 ? sha.slice(0, 7) : '—';
}

/**
 * What the collapsed 저장소 작업 strip says (UI-q0uy §4.1). Pure derivation over
 * the projections the snapshot already carries, so a reader gets the current
 * deployment, its freshness and the outstanding count WITHOUT expanding
 * anything — and nothing here ever forces an expansion.
 *
 * 해결 필요 counts unresolved failures only: a `failed` row a human already
 * acknowledged (§4.6-2 `dismissed`) is out, and a stopped cleanup is in.
 *
 * Returns null when this workspace has neither operations nor a stopped
 * cleanup — there is no state there worth a strip.
 *
 * @param {any} operations - Projected `repo_operations` cards.
 * @param {any} cleanup_failures - Projected `cleanup_failed` entries.
 * @returns {{ deploy: { sha: string, at: number|null, elapsed_ms: number|null }|null, unresolved: number, badge: { tone: 'act'|'quiet', label: string } }|null}
 */
export function repoOpsStripModel(operations, cleanup_failures) {
  const cards = Array.isArray(operations) ? operations : [];
  const cleanup = Array.isArray(cleanup_failures) ? cleanup_failures : [];
  if (cards.length === 0 && cleanup.length === 0) {
    return null;
  }
  /** @type {any|null} */
  let latest = null;
  for (const card of cards) {
    if (
      card.kind !== 'deploy' ||
      card.state !== 'succeeded' ||
      typeof card.target_sha !== 'string'
    ) {
      continue;
    }
    if (
      !latest ||
      (typeof card.finished_at === 'number' ? card.finished_at : 0) >
        (typeof latest.finished_at === 'number' ? latest.finished_at : 0)
    ) {
      latest = card;
    }
  }
  const unresolved =
    cards.filter(
      (/** @type {any} */ card) =>
        card.state === 'failed' && !card.dismissed && !card.superseded_by
    ).length + cleanup.length;
  return {
    deploy: latest
      ? {
          sha: shortSha(latest.target_sha),
          at:
            typeof latest.finished_at === 'number' ? latest.finished_at : null,
          elapsed_ms:
            typeof latest.elapsed_ms === 'number' ? latest.elapsed_ms : null
        }
      : null,
    unresolved,
    badge:
      unresolved > 0
        ? { tone: 'act', label: `해결 필요 ${unresolved}` }
        : { tone: 'quiet', label: '모두 정상' }
  };
}

/**
 * Local wall-clock `HH:MM` of the current deployment, or '' without one — the
 * strip says WHEN it landed; the full timestamp is the title.
 *
 * @param {unknown} at
 * @returns {string}
 */
export function deployClock(at) {
  if (typeof at !== 'number' || !Number.isFinite(at) || at <= 0) {
    return '';
  }
  const date = new Date(at);
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}
