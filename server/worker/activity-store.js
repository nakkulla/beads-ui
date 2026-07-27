/**
 * In-memory activity cache: what the server is DOING to a `pr_wait` bead right
 * now (UI-raqh §3/§4).
 *
 * `pr-observations.js` answers "what did we last SEE on GitHub"; this answers
 * "what is running at this instant" — a poller observation pass, a local
 * `verify_cmd` run, or a merge and its post-merge cleanup. Same discipline as
 * the observation cache: process-wide, workspace-scoped, and never persisted.
 * A restart legitimately loses it, because nothing is in flight after one.
 *
 * The two poller flags are INDEPENDENT COUNTERS, not one enum and not two
 * booleans. Independent because a ten-minute local verification overlaps the
 * next observation pass, and a single enum's `finally` would clear a state it
 * never set. Counted because the poller starts a verification per (bead, head
 * SHA) pair, so a bead can legitimately have two verifications in flight and
 * the first to finish must not switch the display off while the second runs.
 * The snapshot collapses both into ONE display value — `verifying` wins,
 * because it is the longer and more specific of the two.
 */
import path from 'node:path';

/**
 * What a merge click is doing right now (UI-raqh §4). `started_at` is the epoch
 * ms of the FIRST step, not the current one: the question it answers is how
 * long this merge has been going.
 *
 * @typedef {{ step: string, started_at: number }} MergeProgress
 */

/**
 * One bead's activity as it goes on the wire.
 *
 * @typedef {{ activity: 'checking'|'verifying'|null, merge_progress: MergeProgress|null }} ActivityEntry
 */

/**
 * The mutable per-bead record behind {@link ActivityEntry}.
 *
 * @typedef {{ checking: number, verifying: number, merge_progress: MergeProgress|null }} ActivityRecord
 */

/**
 * Create an activity cache. One instance is held by the worker runtime so the
 * poller and the PR actions (writers) and the ws snapshot decoration (reader)
 * share it.
 *
 * @param {{ now?: () => number }} [options]
 */
export function createActivityStore(options = {}) {
  const now = options.now || (() => Date.now());

  /** @type {Map<string, Map<string, ActivityRecord>>} */
  const by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the queue store's and the
   * observation cache's, so a writer and a reader can never end up on two
   * lanes for the same workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, ActivityRecord>}
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

  /**
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {ActivityRecord}
   */
  function recordFor(workspace, bead_id) {
    const lane = laneFor(workspace);
    let record = lane.get(bead_id);
    if (!record) {
      record = { checking: 0, verifying: 0, merge_progress: null };
      lane.set(bead_id, record);
    }
    return record;
  }

  /**
   * Drop a record that no longer says anything, so an idle workspace holds an
   * empty map rather than a pile of all-zero entries.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {ActivityRecord} record
   */
  function pruneIfIdle(workspace, bead_id, record) {
    if (
      record.checking === 0 &&
      record.verifying === 0 &&
      record.merge_progress === null
    ) {
      laneFor(workspace).delete(bead_id);
    }
  }

  /**
   * @param {ActivityRecord} record
   * @returns {ActivityEntry}
   */
  function project(record) {
    return {
      activity:
        record.verifying > 0
          ? 'verifying'
          : record.checking > 0
            ? 'checking'
            : null,
      merge_progress: record.merge_progress
        ? { ...record.merge_progress }
        : null
    };
  }

  /**
   * @param {'checking'|'verifying'} field
   * @param {number} delta
   * @returns {(workspace: string, bead_id: string) => void}
   */
  function counter(field, delta) {
    return (workspace, bead_id) => {
      const record = recordFor(workspace, bead_id);
      record[field] = Math.max(0, record[field] + delta);
      pruneIfIdle(workspace, bead_id, record);
    };
  }

  return {
    /**
     * A gh observation pass started for this bead.
     */
    beginChecking: counter('checking', 1),

    /**
     * That pass ended — called from its own `finally`, so it can only ever
     * decrement the work it started.
     */
    endChecking: counter('checking', -1),

    /**
     * A local `verify_cmd` run started for this bead (one per head SHA).
     */
    beginVerifying: counter('verifying', 1),

    /**
     * That run ended, from its own `finally`.
     */
    endVerifying: counter('verifying', -1),

    /**
     * Record the merge's current step. The first call stamps the start time and
     * later ones only advance the step, so the record measures the whole merge
     * rather than its latest stage.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @param {string} step
     */
    setMergeProgress(workspace, bead_id, step) {
      const record = recordFor(workspace, bead_id);
      record.merge_progress = {
        step,
        started_at: record.merge_progress
          ? record.merge_progress.started_at
          : now()
      };
    },

    /**
     * Release the merge progress (success, failure, or a conflict hand-off).
     *
     * @param {string} workspace
     * @param {string} bead_id
     */
    clearMergeProgress(workspace, bead_id) {
      const lane = laneFor(workspace);
      const record = lane.get(bead_id);
      if (!record) {
        return;
      }
      record.merge_progress = null;
      pruneIfIdle(workspace, bead_id, record);
    },

    /**
     * One bead's activity, or null when nothing is happening to it.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {ActivityEntry|null}
     */
    get(workspace, bead_id) {
      const record = laneFor(workspace).get(bead_id);
      return record ? project(record) : null;
    },

    /**
     * All activity for a workspace, keyed by bead id. A plain read — no query,
     * no mutation — so the ws snapshot decoration can call it freely.
     *
     * @param {string} workspace
     * @returns {Record<string, ActivityEntry>}
     */
    snapshot(workspace) {
      /** @type {Record<string, ActivityEntry>} */
      const out = {};
      for (const [bead_id, record] of laneFor(workspace)) {
        out[bead_id] = project(record);
      }
      return out;
    },

    /**
     * Drop activity for beads no longer in `pr_wait`, so the cache cannot
     * outlive the lane it describes.
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
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
    }
  };
}
