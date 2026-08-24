/**
 * Lane-membership sets shared by the worker and monitor channels.
 *
 * Both channels answer "which beads does a lane already draw" from the same
 * decorated snapshot — the runnable lane's exclusion (UI-qrfo §4) and the
 * session lane's exclusion (UI-yrzu §3) must not drift between them, so the
 * set builders live here rather than in either handler module (UI-0a2m).
 */
import { activeBeadIds } from '../../app/utils/active-attempts.js';

/**
 * Valid bead ids across the named flat lanes of one snapshot.
 *
 * @param {Record<string, any>} snapshot
 * @param {string[]} lanes
 * @returns {Set<string>}
 */
export function laneBeadIds(snapshot, lanes) {
  /** @type {Set<string>} */
  const ids = new Set();
  for (const lane of lanes) {
    const entries = snapshot[lane];
    if (!Array.isArray(entries)) {
      continue;
    }
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.add(bead_id);
      }
    }
  }
  return ids;
}

/**
 * Valid bead ids in configured serial lanes (UI-2gi1 §4).
 *
 * Older and malformed snapshots fail quiet so both channels keep their
 * pre-serial-lane behavior.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
export function serialLaneBeadIds(snapshot) {
  /** @type {Set<string>} */
  const ids = new Set();
  const serial_lanes = snapshot.serial_lanes;
  if (!Array.isArray(serial_lanes)) {
    return ids;
  }
  for (const lane of serial_lanes) {
    if (!lane || typeof lane !== 'object' || Array.isArray(lane)) {
      continue;
    }
    const entries = lane.entries;
    if (!Array.isArray(entries)) {
      continue;
    }
    for (const entry of entries) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        continue;
      }
      const bead_id = entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.add(bead_id);
      }
    }
  }
  return ids;
}

/**
 * The `done` lane's `added_at` per bead — the second input
 * `app/utils/active-attempts.js` needs to tell a failure the done lane already
 * resolved from one still waiting for a decision.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Map<string, number>}
 */
export function doneAtByBead(snapshot) {
  /** @type {Map<string, number>} */
  const done_at_by_bead = new Map();
  for (const entry of Array.isArray(snapshot.done) ? snapshot.done : []) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id === 'string' && typeof entry.added_at === 'number') {
      done_at_by_bead.set(bead_id, entry.added_at);
    }
  }
  return done_at_by_bead;
}

/**
 * The bead ids a workspace has in a lane the WORKER still owns —
 * `queue` ∪ serial ∪ `pr_wait`, without `done`.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
export function activeLaneBeadIds(snapshot) {
  const ids = laneBeadIds(snapshot, ['queue', 'pr_wait']);
  for (const bead_id of serialLaneBeadIds(snapshot)) {
    ids.add(bead_id);
  }
  return ids;
}

/**
 * The ids no session tile may repeat: every worker-owned lane member plus every
 * bead an active worker attempt already draws (UI-yrzu §3). `done` is
 * deliberately absent: a bead a session reopened as `in_progress` is being
 * worked on right now, and its completion history is not a reason to hide that
 * fact.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
export function sessionExcludedBeadIds(snapshot) {
  const ids = activeLaneBeadIds(snapshot);
  for (const bead_id of activeBeadIds(
    snapshot.attempts || {},
    doneAtByBead(snapshot)
  )) {
    ids.add(bead_id);
  }
  return ids;
}

/**
 * The bead ids a workspace already has in a lane — the `runnable` exclusion set
 * (UI-qrfo §4). A bead sitting in `queue`/`pr_wait`/`done` is past the "실행할
 * 수 있다" question; the session exclusion above keeps using the `done`-free
 * set, where a reopened bead must stay visible.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
export function lanedBeadIds(snapshot) {
  const ids = activeLaneBeadIds(snapshot);
  for (const bead_id of laneBeadIds(snapshot, ['done'])) {
    ids.add(bead_id);
  }
  return ids;
}
