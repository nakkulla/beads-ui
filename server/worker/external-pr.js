/**
 * In-memory registry of EXTERNAL PRs — the PRs a normal session delivered
 * without ever passing through the worker scheduler (UI-7agi §1).
 *
 * A worker-dispatched bead reaches `pr_wait` because an attempt verified into
 * it; a bead the user finished in an ordinary session has no attempt at all, so
 * `queue.json` knows nothing about it. Its PR is nonetheless real and mergeable,
 * and the beads-ui merge click is a documented merge path for it — this registry
 * is what makes those beads visible to the same lane.
 *
 * DELIBERATELY NON-PERSISTENT and NEVER written into `queue.json`: the source of
 * truth is bd itself (`status=resolved` + `metadata.pr_url`), re-scanned on the
 * poller's cadence. Injecting a synthetic attempt into the durable queue would
 * make the worker's own records lie about what it ran.
 *
 * `added_at` is preserved across refreshes so a row keeps its lane position
 * instead of jumping every scan.
 */
import path from 'node:path';

/**
 * One external PR row.
 *
 * @typedef {Object} ExternalPrRow
 * @property {string} bead_id - The resolved bead carrying the PR.
 * @property {string} pr_url - `metadata.pr_url` as bd holds it.
 * @property {number|null} pr_number - Parsed PR number, or null when the url is
 * unparseable (the lane then renders the ordinary `pr_ref_unknown` state —
 * fail-quiet, never a guessed number).
 * @property {number} added_at - Epoch ms the row was FIRST seen.
 */

/**
 * Create the external PR registry. One instance is held process-wide by the
 * worker runtime so the scanner (writer) and the ws snapshot decoration +
 * PR poller (readers) share one view.
 *
 * @param {{ now?: () => number }} [options]
 */
export function createExternalPrStore(options = {}) {
  const now = options.now || (() => Date.now());

  /** @type {Map<string, Map<string, ExternalPrRow>>} */
  const by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the queue store's and the
   * observation cache's, so scanner and readers cannot end up on two keys for
   * one workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, ExternalPrRow>}
   */
  function laneFor(workspace) {
    const key = path.resolve(String(workspace || ''));
    let lane = by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      by_workspace.set(key, lane);
    }
    return lane;
  }

  return {
    /**
     * Replace a workspace's registry with the rows a scan just produced. The
     * whole set is replaced (not merged): a bead that left `resolved`, lost its
     * `pr_url`, or was closed must DISAPPEAR, and only a full replace can
     * express that.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, pr_url: string, pr_number: number|null }[]} rows
     * @returns {ExternalPrRow[]}
     */
    replace(workspace, rows) {
      const lane = laneFor(workspace);
      /** @type {Map<string, ExternalPrRow>} */
      const next = new Map();
      for (const row of Array.isArray(rows) ? rows : []) {
        if (!row || typeof row.bead_id !== 'string' || !row.bead_id) {
          continue;
        }
        const prior = lane.get(row.bead_id);
        next.set(row.bead_id, {
          bead_id: row.bead_id,
          pr_url: typeof row.pr_url === 'string' ? row.pr_url : '',
          pr_number:
            typeof row.pr_number === 'number' && Number.isFinite(row.pr_number)
              ? row.pr_number
              : null,
          added_at: prior ? prior.added_at : now()
        });
      }
      by_workspace.set(path.resolve(String(workspace || '')), next);
      return [...next.values()];
    },

    /**
     * A workspace's external rows, oldest first — a plain read, so the snapshot
     * decoration can call it freely.
     *
     * @param {string} workspace
     * @returns {ExternalPrRow[]}
     */
    list(workspace) {
      return [...laneFor(workspace).values()].sort(
        (a, b) => a.added_at - b.added_at
      );
    },

    /**
     * One row, or null.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {ExternalPrRow|null}
     */
    get(workspace, bead_id) {
      return laneFor(workspace).get(bead_id) || null;
    },

    /**
     * Retire ONE row ahead of the next scan (UI-wwby §1).
     *
     * The registry is replaced wholesale every poller tick, so a bead whose
     * cleanup just succeeded is already destined to disappear from it — this
     * only brings that conclusion forward by up to one scan period. The stale
     * window in between is what let a `done` bead come back as an external row.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {boolean} Whether a row was actually removed.
     */
    drop(workspace, bead_id) {
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        return false;
      }
      return laneFor(workspace).delete(bead_id);
    },

    /**
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
    }
  };
}
