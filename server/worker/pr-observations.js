/**
 * In-memory PR observation cache (worker-phase2 §4 / 부록 B.3).
 *
 * What the server has SEEN on GitHub for the beads sitting in `pr_wait`: PR
 * state, mergeability, CI checks, head SHA — plus the local `verify_cmd`
 * result that §5's second gate tier stands on.
 *
 * DELIBERATELY NON-PERSISTENT. None of this goes into `queue.json`: it is an
 * observation of a remote system, not queue placement, and a stale observation
 * replayed from disk after a restart is exactly the "stale green" §5 forbids.
 * Losing the cache on restart is CORRECT — the poller re-observes within one
 * interval, and a missing verify result re-runs verification instead of
 * passing the gate (spec §11.9).
 *
 * Every record is BOUND TO A HEAD SHA. The gate compares that binding against
 * the currently observed head, so a green earned on an older commit cannot
 * satisfy the gate after the branch advances.
 *
 * @import { CheckObservation, PrDetail } from './gh.js'
 */
import path from 'node:path';

/**
 * The CI side of one observation, bound to the head SHA it was taken at.
 *
 * @typedef {Object} CiObservation
 * @property {'ok'|'empty'|'error'} state - The gh adapter's 3-state, carried
 * through verbatim: `empty` is "this repo reported no checks", NEVER "the query
 * failed" (worker-phase2 §5 fail-closed).
 * @property {string} head_sha - Head SHA this observation belongs to.
 * @property {CheckObservation[]} checks - Normalized checks (empty unless ok).
 * @property {'pass'|'fail'|'pending'|null} conclusion - Rolled-up verdict.
 * @property {string|null} reason - The adapter's failure reason when errored.
 */

/**
 * A local `verify_cmd` run result, bound to the head SHA it ran against.
 *
 * @typedef {Object} VerifyObservation
 * @property {string} head_sha - The SHA the detached worktree was pinned to.
 * @property {boolean} ok - Whether the command exited 0 in time.
 * @property {string} reason - `ok` or one of the verify-cmd failure reasons.
 * @property {number} at - Epoch ms the run finished.
 */

/**
 * One bead's observation record.
 *
 * @typedef {Object} PrObservationEntry
 * @property {string} bead_id - The observed bead.
 * @property {number} observed_at - Epoch ms of the last completed observation.
 * @property {string|null} error - Observation failure reason, or null. A
 * non-null value makes the merge gate UNDECIDABLE — it is never read as "no
 * signal" (worker-phase2 §5).
 * @property {PrDetail|null} pr - Last successfully observed PR detail.
 * @property {CiObservation|null} ci - Last CI observation (null when the PR is
 * no longer open — a merged/closed PR is classified by `pr.state` alone).
 * @property {VerifyObservation|null} verify - Last local verification result.
 */

/**
 * Create a PR observation cache. One instance is held process-wide by the
 * worker runtime so the poller (writer) and the ws snapshot decoration
 * (reader) see the same observations.
 *
 * @param {{ now?: () => number }} [options]
 */
export function createPrObservationStore(options = {}) {
  const now = options.now || (() => Date.now());

  /** @type {Map<string, Map<string, PrObservationEntry>>} */
  const by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the queue store's, so the poller
   * (which keys on the resolved attachment root) and the ws snapshot
   * decoration (which keys on the connection's workspace root) can never end up
   * writing and reading two different lanes for the same workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, PrObservationEntry>}
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
     * One bead's record, or null when nothing has been observed yet (which the
     * gate reads as "not observed", never as "no signal").
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {PrObservationEntry|null}
     */
    get(workspace, bead_id) {
      return laneFor(workspace).get(bead_id) || null;
    },

    /**
     * Record a completed observation pass for one bead. The verify result is
     * PRESERVED across passes: it is bound to a SHA of its own and is not part
     * of what a poll observes, so a fresh poll must not erase it (that would
     * re-run a 10-minute test suite every interval).
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @param {{ error?: string|null, pr?: PrDetail|null, ci?: CiObservation|null }} input
     * @returns {PrObservationEntry}
     */
    record(workspace, bead_id, input) {
      const lane = laneFor(workspace);
      const prior = lane.get(bead_id) || null;
      /** @type {PrObservationEntry} */
      const next = {
        bead_id,
        observed_at: now(),
        error: input.error ?? null,
        pr: input.pr ?? null,
        ci: input.ci ?? null,
        verify: prior ? prior.verify : null
      };
      lane.set(bead_id, next);
      return next;
    },

    /**
     * Record a local verification result against the SHA it ran on.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @param {VerifyObservation} verify
     */
    recordVerify(workspace, bead_id, verify) {
      const lane = laneFor(workspace);
      const prior = lane.get(bead_id) || null;
      lane.set(bead_id, {
        bead_id,
        observed_at: prior ? prior.observed_at : 0,
        error: prior ? prior.error : null,
        pr: prior ? prior.pr : null,
        ci: prior ? prior.ci : null,
        verify
      });
    },

    /**
     * Drop observations for beads no longer in `pr_wait` (a merge, a rerun, or
     * a manual queue removal), so the cache cannot outlive the lane it
     * describes.
     *
     * @param {string} workspace
     * @param {string[]} bead_ids - The beads currently in `pr_wait`.
     */
    prune(workspace, bead_ids) {
      const keep = new Set(bead_ids);
      const lane = laneFor(workspace);
      for (const id of Array.from(lane.keys())) {
        if (!keep.has(id)) {
          lane.delete(id);
        }
      }
    },

    /**
     * All observations for a workspace, keyed by bead id. A plain read — no
     * query, no mutation — so the ws snapshot decoration can call it freely.
     *
     * @param {string} workspace
     * @returns {Record<string, PrObservationEntry>}
     */
    snapshot(workspace) {
      /** @type {Record<string, PrObservationEntry>} */
      const out = {};
      for (const [id, entry] of laneFor(workspace)) {
        out[id] = entry;
      }
      return out;
    },

    /**
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
    }
  };
}
