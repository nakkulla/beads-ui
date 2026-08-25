/**
 * The sequential merge driver (UI-5v7d §2).
 *
 * Every merge in a workspace goes through ONE in-process loop that takes the
 * durable `merge_queue` head, runs the ordinary `pr-actions.merge()` against
 * it, and only then moves on. That serialization is the whole point: a merge
 * lands on the base, so two merges started together make the second one's PR
 * BEHIND or CONFLICTING with a base the first is still writing. Clicking [머지]
 * no longer merges — it queues, and this loop merges.
 *
 * The driver is the ONLY caller of `merge()` for a queued item, and `merge()`
 * itself is unchanged: re-gate → BEHIND update-branch → squash → cleanup. What
 * this module owns is the disposition of the SIX things that call can come back
 * as, and only that:
 *
 * - `merged` / `updated_and_merged` / `already_merged` → done, dequeue.
 *   `ok:false` there means the cleanup stopped part-way; that is already a
 *   durable `cleanup_failed` record, so the item still leaves the queue.
 * - `conflict_resolution` → bind the exact attempt durably. It holds the turn
 *   until its absolute deadline, then yields without ending the item; the exact
 *   late terminal leaf is promoted for a fresh gate after the active merge.
 * - `merge_unconfirmed` → the squash command exited 0 but the PR is not
 *   OBSERVED merged (merge queue / `--auto`, or an unreadable state). Neither
 *   done nor failed, so the item KEEPS the head and the driver re-observes it.
 *   Dequeuing here is what would let the next merge start against a base the
 *   previous PR is about to land on.
 * - `refused` → skip and continue. No auto-retry: a red CI or a closed PR is a
 *   human's problem, and the queue's job is to not stop for it.
 *
 * Every FAILURE disposition also writes a durable exclusion pinned to the head
 * SHA it failed at (UI-yk55 §3), because the automatic enroller judges the same
 * row eligible again a moment later and `enqueueMerge` hands each new entry a
 * fresh `resolution_rounds` budget. Without the exclusion, "gave up after 2
 * resolution rounds" would mean "2 more rounds, forever".
 *
 * The queue, consumed rounds, resolution identity, deadline, and settlement
 * state live in `queue.json` because merging beads-ui restarts this process.
 * Only the currently active turn and transient failure decoration are memory.
 *
 * @import { MergeClickResult } from './pr-actions.js'
 */

/**
 * How many conflict-resolution rounds ONE queue item may consume (spec §2).
 * Counted durably, so a deploy restart cannot hand an item a fresh budget.
 *
 * @type {number}
 */
export const RESOLUTION_ROUND_CAP = 2;

/**
 * How long a dispatched resolution owns the queue turn before yielding it.
 * Neither the session nor the item terminates at this deadline.
 *
 * @type {number}
 */
export const RESOLUTION_WAIT_MS = 30 * 60 * 1000;

/**
 * How often an unconfirmed merge's PR state is re-observed, and how long that
 * goes on before the item is skipped (spec §2 step 4). After the timeout the
 * existing poller / manual click own it, exactly as they did before this queue.
 *
 * @type {number}
 */
export const UNCONFIRMED_POLL_MS = 60 * 1000;

/** @type {number} */
export const UNCONFIRMED_WAIT_MS = 30 * 60 * 1000;

/**
 * Backstop wake interval while waiting on a resolution session. The primary
 * signal is the queue-changed event the scheduler emits when the attempt ends;
 * this only bounds how long a MISSED event can stall the queue.
 *
 * @type {number}
 */
const RESOLUTION_POLL_MS = 30 * 1000;

/** @type {Set<string>} */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped'
]);

/**
 * @param {any} q
 * @returns {{ active: boolean, reason: string|null }}
 */
function repairFence(q) {
  if (q === null) {
    return { active: true, reason: 'snapshot_unreadable' };
  }
  const repo_operations =
    q && typeof q.repo_operations === 'object' ? q.repo_operations : {};
  for (const [operation_id, operation] of Object.entries(repo_operations)) {
    if (operation?.state === 'repairing') {
      return { active: true, reason: `repo_operation:${operation_id}` };
    }
  }
  const cleanup_failed =
    q && typeof q.cleanup_failed === 'object' ? q.cleanup_failed : {};
  for (const [bead_id, failure] of Object.entries(cleanup_failed)) {
    if (failure?.repair?.mode) {
      return { active: true, reason: `cleanup:${bead_id}` };
    }
  }
  return { active: false, reason: null };
}

/**
 * @typedef {Object} MergeQueueState
 * @property {string|null} active - The item the driver is working on right now.
 * @property {Record<string, string>} failures - Why each skipped item failed,
 * by bead_id. Non-durable: a restart clears it, which is correct — the reason
 * described one run of one click.
 * @property {{ bead_id: string, reason: string }|null} waiting - Why one
 * nonterminal item is deferred (`worker_sessions_busy` or
 * `completion_waiting:<phase>`). Non-durable and re-derived after restart.
 */

/**
 * Build a workspace's merge driver.
 *
 * @param {{
 *   workspace: string,
 *   store: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   merge: (bead_id: string) => Promise<MergeClickResult>,
 *   probeMergeability?: (bead_id: string) => Promise<{ ok: boolean, kind: 'merged'|'closed'|'dirty'|'behind'|'clean'|'blocked', reason: string|null, head_sha: string|null, base_ref: string|null, head_ref?: string|null, external: boolean, continuation?: 'verify' }>,
 *   dispatchConflict?: (bead_id: string, approved: { head_sha: string, base_ref: string|null }, resolution_wait: { queue_bead_id: string, wait_ms: number, manual_authority?: boolean }, continuation?: { continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }) => Promise<MergeClickResult>,
 *   observePr: (bead_id: string) => Promise<{ state?: string|null, error?: string|null }>,
 *   headSha?: (bead_id: string) => string|null,
 *   isExternalRow?: (bead_id: string) => boolean,
 *   conflictDispatchBlocked?: (queue_bead_id: string, subject_bead_id: string) => boolean,
 *   headReview?: {
 *     captureStartingApproval?: (queue_bead_id: string, subject_bead_id: string) => Promise<{ actor: string, head_sha: string, raw: string }|null>,
 *     ensureApproved: (queue_bead_id: string, subject_bead_id: string, observed: { head_sha: string, base_ref: string|null, head_ref?: string|null, mutation?: string|null, mutation_result_sha?: string|null, starting_approval?: { actor: string, head_sha: string, raw: string }|null }) => Promise<{ state: 'approved'|'failed'|'gone'|'halted', reason: string|null }>
 *   },
 *   updateBase?: (bead_id: string) => Promise<{ ok: boolean, reason: string|null, result_head_sha: string|null }>,
 *   onCompletionResult?: (root_bead_id: string, subject_bead_id: string, result: MergeClickResult) => Promise<void>|void,
 *   prepare?: () => Promise<unknown>,
 *   subscribeQueueChanged?: (fn: (workspace: string) => void) => (() => void),
 *   notifyChanged?: (workspace: string) => void,
 *   now?: () => number,
 *   setTimer?: (fn: () => void, ms: number) => any,
 *   setResolutionPollTimer?: (fn: () => void, ms: number) => any,
 *   clearTimer?: (handle: any) => void,
 *   log?: (...args: any[]) => void,
 *   resolution_round_cap?: number,
 *   resolution_wait_ms?: number,
 *   unconfirmed_poll_ms?: number,
 *   unconfirmed_wait_ms?: number
 * }} deps
 */
export function createMergeQueue(deps) {
  const workspace = deps.workspace;
  const now = deps.now || (() => Date.now());
  const setTimer =
    deps.setTimer ||
    ((/** @type {() => void} */ fn, /** @type {number} */ ms) => {
      const t = setTimeout(fn, ms);
      // A pending wait must never hold the process open on shutdown.
      if (typeof t === 'object' && t && typeof t.unref === 'function') {
        t.unref();
      }
      return t;
    });
  const clearTimer =
    deps.clearTimer || ((/** @type {any} */ h) => clearTimeout(h));
  const setResolutionPollTimer = deps.setResolutionPollTimer || setTimer;
  const log = deps.log || (() => {});
  // The head SHA an exclusion is pinned to (UI-yk55 §3.3). A cache read, not a
  // network call: the driver adds no `gh` traffic of its own.
  const headSha = deps.headSha || (() => null);
  const round_cap = deps.resolution_round_cap ?? RESOLUTION_ROUND_CAP;
  const resolution_wait_ms = deps.resolution_wait_ms ?? RESOLUTION_WAIT_MS;
  const unconfirmed_poll_ms = deps.unconfirmed_poll_ms ?? UNCONFIRMED_POLL_MS;
  const unconfirmed_wait_ms = deps.unconfirmed_wait_ms ?? UNCONFIRMED_WAIT_MS;

  let started = false;
  let stopped = false;
  let draining = false;
  let drain_requested = false;
  // Set when a durable write the loop DEPENDS ON did not stick. It ends the
  // current drain instead of retrying in place; the queue is durable, so the
  // next kick or restart resumes it.
  let halted = false;
  /**
   * The bead whose UNREADABLE head SHA ended the last drain (UI-yk55 §3.2).
   *
   * That halt has a specific recovery signal — an observation arriving — and
   * nothing else would deliver it: `queue-changed` only WAKES a sleeping wait,
   * and an enroller pass that changes nothing kicks nobody. Without this the
   * queue would sit halted forever with a perfectly mergeable head. The other
   * halt causes (a persist that did not stick) keep the pre-existing contract:
   * the next kick or restart resumes them.
   *
   * @type {string|null}
   */
  let halted_on_head = null;
  /** @type {{ bead_id: string, phase: string }|null} */
  let halted_on_completion = null;
  /** @type {string|null} */
  let halted_on_repair = null;
  /** @type {{ queue_bead_id: string, subject_bead_id: string }|null} */
  let halted_on_conflict = null;
  let prepared = false;
  /** @type {string|null} */
  let active = null;
  /** @type {Map<string, string>} */
  const failures = new Map();
  /** @type {(() => void)|null} */
  let unsubscribe = null;
  /** @type {(() => void)|null} */
  let wake_waiter = null;
  /** @type {any|null} */
  let resolution_poll_timer = null;

  function notify() {
    if (typeof deps.notifyChanged === 'function') {
      try {
        deps.notifyChanged(workspace);
      } catch {
        // A broken fanout must never break the queue.
      }
    }
  }

  /**
   * @returns {any}
   */
  function snapshot() {
    try {
      return deps.store.snapshot(workspace);
    } catch {
      return null;
    }
  }

  /**
   * @returns {any|null}
   */
  function headEntry() {
    const q = snapshot();
    const lane = q && Array.isArray(q.merge_queue) ? q.merge_queue : [];
    const invalid = lane.find((/** @type {any} */ entry) => {
      if (entry.resolution?.state === 'invalid') {
        return true;
      }
      if (entry.resolution?.state !== 'yielded') {
        return false;
      }
      return resolutionLineage(q, entry).state === 'invalid';
    });
    if (invalid) {
      return invalid;
    }
    return (
      lane.find(
        (/** @type {any} */ entry) =>
          entry.resolution?.state !== 'yielded' &&
          // A terminal head-review failure waits for a human re-click
          // (UI-58w8 §1) — driving it again would spin the drain, and
          // dequeuing it would erase the failure the user must see.
          entry.head_review?.state !== 'failed'
      ) || null
    );
  }

  /**
   * Whether the PR poller OBSERVES this bead — the only question that decides
   * whether halting on it can ever end (UI-wwby §3).
   *
   * A halt resumes on exactly one signal: an observation arriving with a
   * readable head SHA. The poller's subjects are the `pr_wait` lane plus the
   * current external registry rows and nothing else, so halting on a bead
   * outside both is halting forever — which is how a `done` bead that had been
   * resurrected into `merge_queue` froze the whole queue behind it.
   *
   * The branch is deliberately NOT "does it belong to a durable lane": the
   * corrupted head in that incident was a `done` member, and `done` is not
   * observed. A lookup that throws counts as NOT observed, i.e. it sends the
   * item out of the queue. That is the safe direction — an item wrongly
   * dequeued is re-judged by the enroller and comes back, while a wrong halt
   * stops every PR behind it and waits on an observation that was already
   * undecidable.
   *
   * @param {string} bead_id
   */
  function pollerObserves(bead_id) {
    const q = snapshot();
    const lane = q && Array.isArray(q.pr_wait) ? q.pr_wait : [];
    if (lane.some((/** @type {any} */ e) => e.bead_id === bead_id)) {
      return true;
    }
    if (typeof deps.isExternalRow !== 'function') {
      return false;
    }
    try {
      return deps.isExternalRow(bead_id) === true;
    } catch (err) {
      log('merge queue: external row lookup failed for %s: %o', bead_id, err);
      return false;
    }
  }

  /**
   * @param {string} bead_id
   */
  function queuedEntry(bead_id) {
    const q = snapshot();
    const lane = q && Array.isArray(q.merge_queue) ? q.merge_queue : [];
    return lane.find((/** @type {any} */ e) => e.bead_id === bead_id) || null;
  }

  /**
   * Whether a queue item carries a live manual continuation authority
   * (UI-58w8 §1). A manual click is that item's own completion authority, so
   * the global `auto_merge` toggle — which owns automatic ENROLMENT only —
   * must not pause it. Provenance is the durable record, never a guess from
   * when the toggle changed; a legacy authority-less entry answers false and
   * keeps the old pause behaviour.
   *
   * @param {string} bead_id
   */
  function manualContinuation(bead_id) {
    return queuedEntry(bead_id)?.authority?.source === 'manual';
  }

  /**
   * Persist and halt on a decision that cannot be made by the background
   * driver.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {any} mismatch
   */
  function requireContinuation(queue_bead_id, subject_bead_id, mismatch) {
    let ok = false;
    try {
      ok = deps.store.requireMergeContinuation(workspace, {
        bead_id: queue_bead_id,
        subject_bead_id,
        mismatch
      }).ok;
    } catch (err) {
      log(
        'merge queue continuation persist failed for %s: %o',
        queue_bead_id,
        err
      );
    }
    halted = true;
    notify();
    return ok;
  }

  /**
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   */
  function continuationInput(queue_bead_id, subject_bead_id) {
    const action = queuedEntry(queue_bead_id)?.continuation_action;
    if (
      !action ||
      action.subject_bead_id !== subject_bead_id ||
      (action.continuation !== 'prior_session' &&
        action.continuation !== 'fresh_current') ||
      !action.decision_token
    ) {
      return undefined;
    }
    return {
      continuation: action.continuation,
      decision_token: action.decision_token
    };
  }

  /**
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   */
  function continuationRequired(queue_bead_id, subject_bead_id) {
    const action = queuedEntry(queue_bead_id)?.continuation_action;
    return (
      action?.subject_bead_id === subject_bead_id &&
      action.continuation === null
    );
  }

  /**
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   */
  function clearContinuation(queue_bead_id, subject_bead_id) {
    if (!queuedEntry(queue_bead_id)?.continuation_action) {
      return true;
    }
    const result = deps.store.clearMergeContinuation(workspace, {
      bead_id: queue_bead_id,
      subject_bead_id
    });
    notify();
    return result.ok;
  }

  /**
   * @param {string} root_bead_id
   * @returns {any|null}
   */
  function completionIntent(root_bead_id) {
    const q = snapshot();
    return q?.completion_intents?.[root_bead_id] || null;
  }

  /**
   * Resolve one persisted wait to its exact linear resume leaf.
   *
   * @param {any} q
   * @param {any} entry
   * @returns {{ state: 'active'|'terminal'|'invalid', leaf: any|null, reason: string|null }}
   */
  function resolutionLineage(q, entry) {
    const resolution = entry?.resolution;
    if (!resolution || resolution.state === 'invalid') {
      return {
        state: 'invalid',
        leaf: null,
        reason: 'resolution_wait_invalid'
      };
    }
    const attempts = Object.values(q?.attempts || {});
    let leaf = q?.attempts?.[resolution.attempt_id];
    if (!leaf) {
      return {
        state: 'invalid',
        leaf: null,
        reason: 'resolution_attempt_missing'
      };
    }
    const visited = new Set();
    while (leaf) {
      if (visited.has(leaf.attempt_id)) {
        return {
          state: 'invalid',
          leaf,
          reason: 'resolution_lineage_ambiguous'
        };
      }
      visited.add(leaf.attempt_id);
      if (leaf.bead_id !== resolution.subject_bead_id) {
        return {
          state: 'invalid',
          leaf,
          reason: 'resolution_subject_mismatch'
        };
      }
      if (leaf.conflict_resolution !== true) {
        return {
          state: 'invalid',
          leaf,
          reason: 'resolution_attempt_not_conflict'
        };
      }
      const children = attempts.filter(
        (/** @type {any} */ attempt) =>
          attempt?.resumed_from === leaf.attempt_id
      );
      if (children.length > 1) {
        return {
          state: 'invalid',
          leaf,
          reason: 'resolution_lineage_ambiguous'
        };
      }
      if (children.length === 0) {
        break;
      }
      leaf = children[0];
    }
    if (leaf.status === 'running' || leaf.status === 'paused') {
      return { state: 'active', leaf, reason: null };
    }
    if (TERMINAL_ATTEMPT_STATUSES.has(leaf.status || '')) {
      return { state: 'terminal', leaf, reason: null };
    }
    return {
      state: 'invalid',
      leaf,
      reason: 'resolution_attempt_status_invalid'
    };
  }

  /**
   * Find one unbound live resolution leaf left by a pre-journal process.
   *
   * @param {string} subject_bead_id
   * @returns {{ attempt_id: string|null, reason: string|null }}
   */
  function restorableResolutionAttempt(subject_bead_id) {
    const q = snapshot();
    const attempts = Object.values(q?.attempts || {});
    const parents = new Set(
      attempts
        .map((/** @type {any} */ attempt) => attempt?.resumed_from)
        .filter(Boolean)
    );
    const live = attempts.filter(
      (/** @type {any} */ attempt) =>
        attempt?.bead_id === subject_bead_id &&
        attempt.conflict_resolution === true &&
        (attempt.status === 'running' || attempt.status === 'paused') &&
        !parents.has(attempt.attempt_id)
    );
    if (live.length === 0) {
      return { attempt_id: null, reason: null };
    }
    if (live.length !== 1) {
      return {
        attempt_id: null,
        reason: 'resolution_lineage_ambiguous'
      };
    }
    return { attempt_id: live[0].attempt_id, reason: null };
  }

  /**
   * Sleep, but return early when the queue changes — the scheduler emits that
   * on every attempt transition, so a resolution session's end wakes the driver
   * instead of costing it a full poll interval.
   *
   * @param {number} ms
   * @returns {Promise<void>}
   */
  function sleepOrWake(ms) {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) {
          return;
        }
        done = true;
        clearTimer(timer);
        if (wake_waiter === finish) {
          wake_waiter = null;
        }
        resolve();
      };
      const timer = setTimer(finish, Math.max(0, ms));
      wake_waiter = finish;
    });
  }

  function wake() {
    if (wake_waiter) {
      wake_waiter();
    }
  }

  /**
   * Whether at least one yielded resolver still needs a missed-event backstop.
   *
   * @returns {boolean}
   */
  function hasYieldedResolution() {
    const q = snapshot();
    const lane = Array.isArray(q?.merge_queue) ? q.merge_queue : [];
    return lane.some(
      (/** @type {any} */ entry) =>
        entry.resolution?.state === 'yielded' &&
        resolutionLineage(q, entry).state === 'active'
    );
  }

  /** Maintain one low-frequency poll for yielded waits; never one per item. */
  function maintainResolutionWatcher() {
    if (stopped || !hasYieldedResolution()) {
      if (resolution_poll_timer !== null) {
        clearTimer(resolution_poll_timer);
        resolution_poll_timer = null;
      }
      return;
    }
    if (resolution_poll_timer !== null) {
      return;
    }
    resolution_poll_timer = setResolutionPollTimer(() => {
      resolution_poll_timer = null;
      if (stopped) {
        return;
      }
      if (resolutionNeedsDrain()) {
        void requestDrain();
      }
      maintainResolutionWatcher();
    }, RESOLUTION_POLL_MS);
  }

  /**
   * @param {string} bead_id
   * @param {string} reason
   */
  function fail(bead_id, reason) {
    failures.set(bead_id, reason);
    log('merge queue: %s skipped (%s)', bead_id, reason);
  }

  /**
   * This bead's durable auto-merge exclusion, if it has one.
   *
   * @param {string} bead_id
   * @returns {{ head_sha: string, reason: string }|null}
   */
  function skipRecord(bead_id) {
    const q = snapshot();
    const skips = (q && q.auto_merge_skips) || {};
    return skips[bead_id] || null;
  }

  /**
   * Dispose of an item as a FAILURE: record the exclusion and drop it from the
   * queue in ONE durable mutation (UI-yk55 §3.2).
   *
   * The two halves cannot be separate writes. Dequeue without a record and the
   * enroller re-queues the same head with `resolution_rounds` reset to 0, which
   * is the unbounded resolution-session loop the exclusion exists to stop;
   * record without a dequeue and the boot-resume driver merges the same head
   * again. So when the head SHA is unreadable — or the write does not stick —
   * the item is NOT dequeued: the drain halts and the durable queue is picked up
   * by the next kick or restart, once the observation is back.
   *
   * An item that already left the queue (the ordinary merged-and-cleaned path,
   * where `removeFromLanes` took it) needs neither half.
   *
   * @param {string} bead_id
   * @param {string} reason
   */
  function failAndDequeue(bead_id, reason) {
    fail(bead_id, reason);
    if (!queuedEntry(bead_id)) {
      notify();
      return;
    }
    const head_sha = headSha(bead_id);
    if (!head_sha) {
      if (!pollerObserves(bead_id)) {
        // No observation will ever arrive for this bead, so a halt here has no
        // end (UI-wwby §3). Drop it WITHOUT an exclusion record: there is
        // nowhere to pin one — `removeFromLanes` already cleared its skip when
        // it left the lane — and the record's job (stopping a re-enrolment
        // loop) is now done by the store's lane-exclusivity gate instead.
        // `dequeue` keeps its own persist-failure halt, which is a different
        // halt with a different (unchanged) recovery contract.
        log(
          'merge queue: %s head SHA unreadable and unobserved — dequeued without an exclusion',
          bead_id
        );
        dequeue(bead_id);
        return;
      }
      log(
        'merge queue: %s head SHA unreadable — not dequeued, halting this drain',
        bead_id
      );
      halted = true;
      halted_on_head = bead_id;
      notify();
      return;
    }
    let ok = false;
    try {
      ok = deps.store.recordMergeSkip(workspace, {
        bead_id,
        head_sha,
        reason
      }).ok;
    } catch (err) {
      log('merge queue skip record failed for %s: %o', bead_id, err);
      ok = false;
    }
    if (!ok && queuedEntry(bead_id)) {
      log(
        'merge queue: %s could not be dequeued — halting this drain',
        bead_id
      );
      halted = true;
    }
    notify();
  }

  /**
   * Drop the item from the durable queue. Returns whether it actually left.
   *
   * A persist that throws (a full or unwritable state dir) leaves the item AT
   * THE HEAD, so a caller that ignored the failure would loop straight back
   * into `merge()` on the same bead — a hot loop against GitHub. Every caller
   * treats `false` as "stop this drain"; the queue is durable, so the next
   * kick or restart picks it up once the disk is writable again.
   *
   * @param {string} bead_id
   * @returns {boolean}
   */
  function dequeue(bead_id) {
    let ok = false;
    try {
      ok = deps.store.dequeueMerge(workspace, bead_id).ok;
    } catch (err) {
      log('merge queue dequeue failed for %s: %o', bead_id, err);
      ok = false;
    }
    if (!ok && queuedEntry(bead_id)) {
      log(
        'merge queue: %s could not be dequeued — halting this drain',
        bead_id
      );
      halted = true;
    }
    // The store mutation alone fans nothing out, and both halves of what just
    // changed — the remaining order and this item's skip reason — are what the
    // lane draws. Safe here because it is outside every wait, so the event
    // cannot wake the loop it belongs to.
    notify();
    return ok;
  }

  /**
   * Send one undecidable resolution lineage through the existing ownership
   * boundary. Completion roots retain their slot; ordinary rows receive the
   * same durable skip/dequeue treatment as every other terminal refusal.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string} reason
   */
  async function failResolution(queue_bead_id, subject_bead_id, reason) {
    if (completionIntent(queue_bead_id)) {
      await handoffCompletion(queue_bead_id, subject_bead_id, {
        ok: false,
        action: 'conflict_resolution',
        reason
      });
      return;
    }
    failAndDequeue(queue_bead_id, reason);
  }

  /**
   * Persist an exact attempt binding before the driver waits on it.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string} attempt_id
   */
  function bindResolution(queue_bead_id, subject_bead_id, attempt_id) {
    let ok = false;
    try {
      ok = deps.store.bindResolutionWait(workspace, {
        bead_id: queue_bead_id,
        subject_bead_id,
        attempt_id,
        wait_ms: resolution_wait_ms
      }).ok;
    } catch (err) {
      log('merge queue resolution bind failed for %s: %o', queue_bead_id, err);
    }
    if (!ok) {
      halted = true;
      notify();
      return false;
    }
    notify();
    return true;
  }

  /**
   * Accept the scheduler's atomic prerecord, or use the legacy bind seam when
   * a custom dispatcher recorded only the attempt. A different existing
   * journal is an ownership conflict and stops the driver fail-closed.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string} attempt_id
   */
  function ensureResolutionBound(queue_bead_id, subject_bead_id, attempt_id) {
    const resolution = queuedEntry(queue_bead_id)?.resolution;
    if (
      resolution &&
      resolution.state !== 'invalid' &&
      resolution.attempt_id === attempt_id &&
      resolution.subject_bead_id === subject_bead_id
    ) {
      return true;
    }
    if (resolution === null) {
      return bindResolution(queue_bead_id, subject_bead_id, attempt_id);
    }
    halted = true;
    notify();
    return false;
  }

  /**
   * Promote every exact terminal wait before choosing the next runnable head.
   * This is what gives late settlements priority after the current active item.
   *
   * @returns {boolean}
   */
  function promoteTerminalResolutions() {
    const q = snapshot();
    const lane = Array.isArray(q?.merge_queue) ? q.merge_queue : [];
    let changed = false;
    for (const entry of lane) {
      if (
        entry.resolution?.state !== 'waiting' &&
        entry.resolution?.state !== 'yielded'
      ) {
        continue;
      }
      const lineage = resolutionLineage(q, entry);
      if (lineage.state !== 'terminal') {
        continue;
      }
      const settled_at =
        typeof lineage.leaf?.finished_at === 'number'
          ? lineage.leaf.finished_at
          : now();
      let ok = false;
      try {
        ok = deps.store.settleResolutionWait(workspace, {
          bead_id: entry.bead_id,
          subject_bead_id: entry.resolution.subject_bead_id,
          attempt_id: entry.resolution.attempt_id,
          settled_at,
          active_bead_id: active
        }).ok;
      } catch (err) {
        log(
          'merge queue resolution settlement failed for %s: %o',
          entry.bead_id,
          err
        );
      }
      if (!ok) {
        halted = true;
        notify();
        return changed;
      }
      changed = true;
    }
    if (changed) {
      notify();
    }
    return changed;
  }

  /**
   * Whether a queue-change event can advance durable resolution state.
   *
   * @returns {boolean}
   */
  function resolutionNeedsDrain() {
    const q = snapshot();
    const lane = Array.isArray(q?.merge_queue) ? q.merge_queue : [];
    for (const entry of lane) {
      const resolution = entry.resolution;
      if (!resolution) {
        continue;
      }
      if (resolution.state === 'invalid') {
        return true;
      }
      const lineage = resolutionLineage(q, entry);
      if (lineage.state === 'invalid') {
        return true;
      }
      if (resolution.state === 'ready') {
        return (
          lineage.state !== 'terminal' ||
          q.auto_merge === true ||
          entry.authority?.source === 'manual'
        );
      }
      if (lineage.state === 'terminal') {
        return true;
      }
      if (resolution.state === 'waiting' && resolution.deadline_at <= now()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Observe or yield one durable wait. A ready record remains unconsumed until
   * the latest mergeability probe has selected the next effect.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @returns {Promise<{ kind: 'none'|'ready'|'yielded'|'paused'|'failed'|'gone'|'stopped', attempt_id?: string }>}
   */
  async function prepareResolution(queue_bead_id, subject_bead_id) {
    while (!stopped && !halted) {
      const entry = queuedEntry(queue_bead_id);
      if (!entry) {
        return { kind: 'gone' };
      }
      let resolution = entry.resolution;
      if (!resolution) {
        const restored = restorableResolutionAttempt(subject_bead_id);
        if (restored.reason) {
          await failResolution(queue_bead_id, subject_bead_id, restored.reason);
          return { kind: 'failed' };
        }
        if (!restored.attempt_id) {
          if (
            entry.resolution_rounds > 0 &&
            snapshot()?.auto_merge !== true &&
            !manualContinuation(queue_bead_id)
          ) {
            halted = true;
            return { kind: 'paused' };
          }
          return { kind: 'none' };
        }
        if (entry.resolution_rounds >= round_cap) {
          await failResolution(
            queue_bead_id,
            subject_bead_id,
            'resolution_round_cap'
          );
          return { kind: 'failed' };
        }
        if (
          !bindResolution(queue_bead_id, subject_bead_id, restored.attempt_id)
        ) {
          return { kind: 'paused' };
        }
        continue;
      }
      if (resolution.state === 'invalid') {
        await failResolution(queue_bead_id, subject_bead_id, resolution.reason);
        return { kind: 'failed' };
      }
      const q = snapshot();
      const lineage = resolutionLineage(q, entry);
      if (lineage.state === 'invalid') {
        await failResolution(
          queue_bead_id,
          subject_bead_id,
          lineage.reason || 'resolution_wait_invalid'
        );
        return { kind: 'failed' };
      }
      if (resolution.state === 'ready') {
        if (lineage.state !== 'terminal') {
          await failResolution(
            queue_bead_id,
            subject_bead_id,
            'resolution_ready_lineage_active'
          );
          return { kind: 'failed' };
        }
        if (q.auto_merge !== true && !manualContinuation(queue_bead_id)) {
          halted = true;
          return { kind: 'paused' };
        }
        return { kind: 'ready', attempt_id: resolution.attempt_id };
      }
      if (lineage.state === 'terminal') {
        promoteTerminalResolutions();
        continue;
      }
      if (resolution.state === 'yielded') {
        return { kind: 'yielded' };
      }
      const left = resolution.deadline_at - now();
      if (left <= 0) {
        let ok = false;
        try {
          ok = deps.store.yieldResolutionWait(workspace, {
            bead_id: queue_bead_id,
            subject_bead_id,
            attempt_id: resolution.attempt_id,
            yielded_at: now()
          }).ok;
        } catch (err) {
          log(
            'merge queue resolution yield failed for %s: %o',
            queue_bead_id,
            err
          );
        }
        if (!ok) {
          halted = true;
          notify();
          return { kind: 'paused' };
        }
        notify();
        maintainResolutionWatcher();
        return { kind: 'yielded' };
      }
      await sleepOrWake(Math.min(RESOLUTION_POLL_MS, left));
    }
    return { kind: stopped ? 'stopped' : 'paused' };
  }

  /**
   * Clear one exact ready resolution record, charging it only when the latest
   * probe still needs another conflict-resolution round.
   *
   * @param {string} queue_bead_id
   * @param {string} attempt_id
   * @param {boolean} consume_round
   */
  function consumeResolution(queue_bead_id, attempt_id, consume_round) {
    let ok = false;
    try {
      ok = deps.store.consumeResolutionWait(workspace, {
        bead_id: queue_bead_id,
        attempt_id,
        consume_round
      }).ok;
    } catch (err) {
      log(
        'merge queue resolution consumption failed for %s: %o',
        queue_bead_id,
        err
      );
    }
    if (!ok) {
      halted = true;
      notify();
      return false;
    }
    notify();
    return true;
  }

  /**
   * Re-observe an unconfirmed merge until the PR reaches a terminal state.
   *
   * The deadline belongs to the ITEM, not to one watch: an observed MERGED
   * sends the driver back to `merge()`, and a `gh` that then reports the PR
   * still OPEN would return `merge_unconfirmed` again. A per-watch clock would
   * restart on every such flip and hold the head forever; the item's clock
   * bounds the whole state no matter how many times it re-enters.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {number} deadline
   * @returns {Promise<'merged'|'pr_closed_unmerged'|'merge_unconfirmed_timeout'|'gone'|'stopped'>}
   */
  async function watchUnconfirmed(queue_bead_id, subject_bead_id, deadline) {
    while (!stopped) {
      const left = deadline - now();
      if (left <= 0) {
        return 'merge_unconfirmed_timeout';
      }
      await sleepOrWake(Math.min(unconfirmed_poll_ms, left));
      if (stopped) {
        return 'stopped';
      }
      // The bead can leave `pr_wait` under us: the poller observes the same
      // MERGED and runs the cleanup through its own trigger. That is a
      // completion, not a loss — the item is simply already done.
      if (!queuedEntry(queue_bead_id)) {
        return 'gone';
      }
      /** @type {any} */
      let observed;
      try {
        observed = await deps.observePr(subject_bead_id);
      } catch (err) {
        log(
          'merge queue re-observation failed for %s: %o',
          subject_bead_id,
          err
        );
        observed = null;
      }
      const state = observed && observed.state;
      if (state === 'MERGED') {
        return 'merged';
      }
      if (state === 'CLOSED') {
        return 'pr_closed_unmerged';
      }
      // OPEN, or an unreadable observation: keep waiting. An observation error
      // is never promoted to a verdict here — the same fail-closed rule the
      // merge gate runs on.
    }
    return 'stopped';
  }

  /**
   * @param {string} bead_id
   * @returns {Promise<MergeClickResult>}
   */
  async function runMerge(bead_id) {
    if (repairFence(snapshot()).active) {
      return { ok: false, action: 'refused', reason: 'repair_in_flight' };
    }
    try {
      return await deps.merge(bead_id);
    } catch (err) {
      log('merge queue merge() threw for %s: %o', bead_id, err);
      return { ok: false, action: 'refused', reason: 'merge_error' };
    }
  }

  /**
   * Route one manual item through the head-review machine and shape its
   * non-approved outcome as a driver-level result (UI-58w8 §2).
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ head_sha: string, base_ref: string|null, head_ref?: string|null, mutation: string|null, mutation_result_sha: string|null, starting_approval: { actor: string, head_sha: string, raw: string }|null }} observed
   * @returns {Promise<{ state: 'approved'|'failed'|'gone'|'halted', reason: string|null }>}
   */
  async function ensureHeadReview(queue_bead_id, subject_bead_id, observed) {
    // A vouched mutation vouches for exactly ONE binding: the caller clears it
    // right after this call, so a later external push cannot inherit the
    // resolver's or the base update's provenance.

    /** @type {{ state: 'approved'|'failed'|'gone'|'halted', reason: string|null }} */
    let review = { state: 'failed', reason: 'head_review_error' };
    try {
      review = await /** @type {NonNullable<typeof deps.headReview>} */ (
        deps.headReview
      ).ensureApproved(queue_bead_id, subject_bead_id, observed);
    } catch (err) {
      log('merge queue head review threw for %s: %o', queue_bead_id, err);
    }
    return review;
  }

  /**
   * Re-probe before every effect. A ready resolution is charged exactly once
   * after the probe and before the selected merge/update/resolver action.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string|null} ready_attempt_id
   * @param {{ mutation: string|null, result_head_sha: string|null, starting_approval: { actor: string, head_sha: string, raw: string }|null }} [vouched] - The queue-owned mutation
   * evidence this drain can vouch for (`resolver:<attempt>` / `base_update`).
   * A HOLDER, not a value: whichever site binds it consumes it, so one
   * resolver push or base update vouches for exactly one head-review binding
   * and never for a later external push.
   * @returns {Promise<MergeClickResult|null>}
   */
  async function runLatestMerge(
    queue_bead_id,
    subject_bead_id,
    ready_attempt_id,
    vouched = {
      mutation: null,
      result_head_sha: null,
      starting_approval: null
    }
  ) {
    if (
      ready_attempt_id &&
      snapshot()?.auto_merge !== true &&
      !manualContinuation(queue_bead_id)
    ) {
      halted = true;
      return null;
    }
    if (typeof deps.probeMergeability !== 'function') {
      if (
        ready_attempt_id &&
        !consumeResolution(queue_bead_id, ready_attempt_id, true)
      ) {
        return null;
      }
      return runMerge(subject_bead_id);
    }
    /** @type {any} */
    let probe;
    try {
      probe = await deps.probeMergeability(subject_bead_id);
    } catch (err) {
      log(
        'merge queue mergeability probe failed for %s: %o',
        subject_bead_id,
        err
      );
      probe = {
        ok: false,
        kind: 'blocked',
        reason: 'mergeability_probe_error'
      };
    }
    if (
      ready_attempt_id &&
      snapshot()?.auto_merge !== true &&
      !manualContinuation(queue_bead_id)
    ) {
      halted = true;
      return null;
    }
    const before = queuedEntry(queue_bead_id);
    const consume_round =
      ready_attempt_id !== null && probe.ok === true && probe.kind === 'dirty';
    const effective_rounds =
      (before?.resolution_rounds ?? round_cap) + (consume_round ? 1 : 0);
    if (
      ready_attempt_id &&
      !consumeResolution(queue_bead_id, ready_attempt_id, consume_round)
    ) {
      return null;
    }
    if (!probe.ok) {
      return {
        ok: false,
        action: probe.continuation === 'verify' ? 'verify_blocked' : 'refused',
        reason: probe.reason || 'mergeability_probe_blocked',
        head_sha: probe.head_sha || null,
        base_ref: probe.base_ref || null,
        head_ref: probe.head_ref || null
      };
    }
    if (probe.kind !== 'dirty') {
      // A manual item never merges on a bare metadata receipt (UI-58w8 §5):
      // even a CLEAN gate must first bind an approved head-review journal to
      // the exact authority/head, so the review machine runs BEFORE the merge
      // — for a current receipt this is the `existing_current` binding, for a
      // moved head the automatic reviewer.
      if (
        probe.kind === 'clean' &&
        manualContinuation(queue_bead_id) &&
        // A completion root runs its OWN gating saga with its own repair
        // budget (`processCompletionItem`), and that loop has no disposition
        // for a head-review result. The two machines stay separate.
        completionIntent(queue_bead_id) === null &&
        typeof deps.headReview?.ensureApproved === 'function'
      ) {
        const review = await ensureHeadReview(queue_bead_id, subject_bead_id, {
          head_sha: probe.head_sha || '',
          base_ref: probe.base_ref || null,
          head_ref: probe.head_ref || null,
          mutation: vouched.mutation,
          mutation_result_sha: vouched.result_head_sha,
          starting_approval: vouched.starting_approval
        });
        vouched.mutation = null;
        vouched.result_head_sha = null;
        vouched.starting_approval = null;
        if (review.state !== 'approved') {
          return {
            ok: false,
            action: 'head_review',
            reason: review.reason || review.state,
            review_state: review.state,
            head_sha: probe.head_sha || null
          };
        }
      }
      return runMerge(subject_bead_id);
    }
    if (effective_rounds >= round_cap) {
      return {
        ok: false,
        action: 'refused',
        reason: 'resolution_round_cap',
        head_sha: probe.head_sha || null
      };
    }
    if (
      typeof deps.dispatchConflict !== 'function' ||
      typeof probe.head_sha !== 'string' ||
      probe.head_sha.length === 0
    ) {
      return {
        ok: false,
        action: 'refused',
        reason: 'mergeability_identity_invalid',
        head_sha: probe.head_sha || null
      };
    }
    try {
      return await deps.dispatchConflict(
        subject_bead_id,
        {
          head_sha: probe.head_sha,
          base_ref: probe.base_ref || null
        },
        {
          queue_bead_id,
          wait_ms: resolution_wait_ms,
          manual_authority: manualContinuation(queue_bead_id)
        },
        continuationInput(queue_bead_id, subject_bead_id)
      );
    } catch (err) {
      log(
        'merge queue conflict dispatch failed for %s: %o',
        subject_bead_id,
        err
      );
      return {
        ok: false,
        action: 'conflict_resolution',
        reason: 'resolution_dispatch_error'
      };
    }
  }

  /**
   * Hand a completion-owned result back without creating an auto-merge skip.
   * The root intent is the terminal authority; the root queue position remains
   * held unless the callback completes or terminalizes it.
   *
   * @param {string} root_bead_id
   * @param {string} subject_bead_id
   * @param {MergeClickResult} result
   */
  async function handoffCompletion(root_bead_id, subject_bead_id, result) {
    if (typeof deps.onCompletionResult === 'function') {
      try {
        await deps.onCompletionResult(root_bead_id, subject_bead_id, result);
      } catch (err) {
        log('completion merge handoff failed for %s: %o', root_bead_id, err);
      }
    }
    if (queuedEntry(root_bead_id)) {
      const intent = completionIntent(root_bead_id);
      halted = true;
      halted_on_completion = {
        bead_id: root_bead_id,
        phase: typeof intent?.phase === 'string' ? intent.phase : 'unknown'
      };
    }
    notify();
  }

  /**
   * Drive the current subject while preserving the root's public queue slot.
   * Conflict rounds stay on the root queue entry, independent from the shared
   * repair-session budget stored on the intent.
   *
   * @param {string} root_bead_id
   * @param {any} intent
   */
  async function processCompletionItem(root_bead_id, intent) {
    if (intent.phase !== 'merging') {
      halted = true;
      halted_on_completion = {
        bead_id: root_bead_id,
        phase: intent.phase
      };
      return;
    }
    const subject_bead_id = intent.subject?.bead_id;
    if (typeof subject_bead_id !== 'string' || subject_bead_id.length === 0) {
      await handoffCompletion(root_bead_id, root_bead_id, {
        ok: false,
        action: 'refused',
        reason: 'completion_subject_invalid'
      });
      return;
    }
    const q = snapshot();
    if (
      intent.subject?.role === 'repair' &&
      Array.isArray(q.done) &&
      q.done.some(
        (/** @type {any} */ entry) => entry.bead_id === subject_bead_id
      )
    ) {
      await handoffCompletion(root_bead_id, subject_bead_id, {
        ok: true,
        action: 'already_merged',
        reason: null
      });
      return;
    }
    /** @type {number|null} */
    let unconfirmed_deadline = null;

    while (!stopped && !halted && queuedEntry(root_bead_id)) {
      if (continuationRequired(root_bead_id, subject_bead_id)) {
        halted = true;
        notify();
        return;
      }
      const resolution = await prepareResolution(root_bead_id, subject_bead_id);
      if (
        resolution.kind === 'yielded' ||
        resolution.kind === 'paused' ||
        resolution.kind === 'failed' ||
        resolution.kind === 'gone' ||
        resolution.kind === 'stopped'
      ) {
        return;
      }
      const result = await runLatestMerge(
        root_bead_id,
        subject_bead_id,
        resolution.kind === 'ready' ? resolution.attempt_id || null : null
      );
      if (!result) {
        return;
      }
      if (result.continuation_mismatch) {
        requireContinuation(
          root_bead_id,
          subject_bead_id,
          result.continuation_mismatch
        );
        return;
      }
      const action = result ? result.action : null;
      if (action === 'cleanup_pending') {
        deps.store.dequeueMerge(workspace, root_bead_id);
        void requestDrain();
        return;
      }
      if (
        action === 'merged' ||
        action === 'updated_and_merged' ||
        action === 'already_merged'
      ) {
        await handoffCompletion(root_bead_id, subject_bead_id, result);
        return;
      }
      if (action === 'conflict_resolution') {
        if (!result.ok) {
          if (result.reason === 'worker_sessions_busy') {
            halted = true;
            halted_on_conflict = {
              queue_bead_id: root_bead_id,
              subject_bead_id
            };
            notify();
            return;
          }
          await handoffCompletion(root_bead_id, subject_bead_id, result);
          return;
        }
        if (
          typeof result.attempt_id !== 'string' ||
          result.attempt_id.length === 0
        ) {
          await handoffCompletion(root_bead_id, subject_bead_id, {
            ok: false,
            action: 'refused',
            reason: 'resolution_attempt_missing'
          });
          return;
        }
        if (!clearContinuation(root_bead_id, subject_bead_id)) {
          halted = true;
          return;
        }
        const entry = queuedEntry(root_bead_id);
        const rounds = entry ? entry.resolution_rounds : round_cap;
        if (rounds >= round_cap) {
          await handoffCompletion(root_bead_id, subject_bead_id, {
            ok: false,
            action: 'refused',
            reason: 'resolution_round_cap'
          });
          return;
        }
        if (
          !ensureResolutionBound(
            root_bead_id,
            subject_bead_id,
            result.attempt_id
          )
        ) {
          return;
        }
        continue;
      }
      if (action === 'merge_unconfirmed') {
        if (unconfirmed_deadline === null) {
          unconfirmed_deadline = now() + unconfirmed_wait_ms;
        }
        const verdict = await watchUnconfirmed(
          root_bead_id,
          subject_bead_id,
          unconfirmed_deadline
        );
        if (verdict === 'stopped' || verdict === 'gone') {
          return;
        }
        if (verdict === 'merged') {
          continue;
        }
        await handoffCompletion(root_bead_id, subject_bead_id, {
          ok: false,
          action: 'refused',
          reason: verdict
        });
        return;
      }
      if (
        action === 'refused' &&
        (result.reason === 'conflict_resolution_required' ||
          result.reason === 'mergeability_changed' ||
          result.reason === 'mergeability_identity_changed')
      ) {
        continue;
      }
      if (action === 'refused' && result.reason === 'repair_in_flight') {
        halted = true;
        halted_on_repair = repairFence(snapshot()).reason || 'repair_in_flight';
        notify();
        return;
      }
      await handoffCompletion(root_bead_id, subject_bead_id, result);
      return;
    }
  }

  /**
   * Drive ONE queue item to a terminal disposition.
   *
   * @param {string} bead_id
   */
  async function processItem(bead_id) {
    const fence = repairFence(snapshot());
    if (fence.active) {
      halted = true;
      halted_on_repair = fence.reason;
      log(
        'merge queue: %s halted — repair in flight (%s)',
        bead_id,
        fence.reason
      );
      return;
    }
    // A retried item starts clean: the previous reason described a run that is
    // over, and leaving it up would label a live attempt with a dead failure.
    failures.delete(bead_id);
    notify();
    const completion = completionIntent(bead_id);
    if (completion) {
      await processCompletionItem(bead_id, completion);
      return;
    }
    /** @type {number|null} */
    let unconfirmed_deadline = null;

    // The exclusion filter has to be HERE and not only in the enroller
    // (UI-yk55 §3.2): `drain()` takes the durable queue's head straight into
    // this function, so a restart that resumes a queue written before the
    // disposition landed would merge exactly the head the exclusion names.
    const skip = skipRecord(bead_id);
    if (skip) {
      const head_sha = headSha(bead_id);
      if (!head_sha) {
        if (!pollerObserves(bead_id)) {
          // Same terminating rule as `failAndDequeue` (UI-wwby §3) — the two
          // halt sites must not disagree about when a halt can end. Unobserved
          // means the deciding observation is never coming, so the item leaves
          // instead of freezing the queue; it is not merged, which is what the
          // exclusion actually guards.
          log(
            'merge queue: %s excluded, head SHA unreadable and unobserved — dequeued',
            bead_id
          );
          dequeue(bead_id);
          return;
        }
        // Cannot tell whether the branch moved since it failed. Merging on that
        // guess is the one thing the record exists to prevent, so the item stays
        // queued and the drain ends — the next observation decides it.
        log(
          'merge queue: %s excluded but head SHA unreadable — halting this drain',
          bead_id
        );
        halted = true;
        halted_on_head = bead_id;
        return;
      }
      if (head_sha === skip.head_sha) {
        fail(bead_id, skip.reason || 'auto_merge_skipped');
        dequeue(bead_id);
        return;
      }
    }

    // Queue-owned mutation evidence THIS drain can vouch for (UI-58w8 §2):
    // a consumed ready resolution or the driver's own base update. It never
    // survives a restart on purpose — an unprovable move fails closed.
    /** @type {{ actor: string, head_sha: string, raw: string }|null} */
    let starting_approval = null;
    if (
      manualContinuation(bead_id) &&
      typeof deps.headReview?.captureStartingApproval === 'function'
    ) {
      try {
        starting_approval = await deps.headReview.captureStartingApproval(
          bead_id,
          bead_id
        );
      } catch (err) {
        log('merge queue approval snapshot failed for %s: %o', bead_id, err);
      }
    }
    /** @type {{ mutation: string|null, result_head_sha: string|null, starting_approval: { actor: string, head_sha: string, raw: string }|null }} */
    const vouched = {
      mutation: null,
      result_head_sha: null,
      starting_approval
    };
    // The base update is attempted at most once per turn, so a PR that stays
    // BEHIND cannot loop the driver against the GitHub API.
    let base_update_attempted = false;
    // An external registry race gets one refresh/re-probe per item entry. The
    // flag resets only when a new click/kick enters this item (UI-vkk8 §1).
    let registry_refresh_attempted = false;

    while (!stopped && !halted) {
      if (!queuedEntry(bead_id)) {
        return;
      }
      if (continuationRequired(bead_id, bead_id)) {
        halted = true;
        notify();
        return;
      }
      const resolution = await prepareResolution(bead_id, bead_id);
      if (
        resolution.kind === 'yielded' ||
        resolution.kind === 'paused' ||
        resolution.kind === 'failed' ||
        resolution.kind === 'gone' ||
        resolution.kind === 'stopped'
      ) {
        return;
      }
      if (resolution.kind === 'ready' && resolution.attempt_id) {
        // Resolver attempts currently expose no authoritative pushed head.
        // Rebind both voucher fields together so a prior mutation's SHA cannot
        // survive; the null result forces full-final-head review (UI-vkk8 §4).
        vouched.mutation = `resolver:${resolution.attempt_id}`;
        vouched.result_head_sha = null;
      }
      const result = await runLatestMerge(
        bead_id,
        bead_id,
        resolution.kind === 'ready' ? resolution.attempt_id || null : null,
        vouched
      );
      if (!result) {
        return;
      }
      if (result.continuation_mismatch) {
        requireContinuation(bead_id, bead_id, result.continuation_mismatch);
        return;
      }
      const action = result ? result.action : null;

      if (action === 'cleanup_pending') {
        deps.store.dequeueMerge(workspace, bead_id);
        void requestDrain();
        return;
      }

      if (action === 'verify_blocked') {
        fail(bead_id, result.reason || 'verify_failed');
        halted = true;
        notify();
        return;
      }

      if (
        action === 'merged' ||
        action === 'updated_and_merged' ||
        action === 'already_merged'
      ) {
        if (!result.ok) {
          // The merge LANDED; only the cleanup stopped, and that is already a
          // durable `cleanup_failed` record with its own banner. The item is
          // finished either way — nothing here retries a cleanup. The exclusion
          // still gets written (UI-yk55 §3.2): a cleanup-failed row stays
          // eligible (`cleanup_failed` + merged tier), so without one the
          // enroller would re-queue the same broken cleanup forever.
          failAndDequeue(
            bead_id,
            `정리 실패(${result.cleanup_step || '?'}): ${result.reason || ''}`
          );
          return;
        }
        dequeue(bead_id);
        return;
      }

      if (action === 'conflict_resolution') {
        if (!result.ok) {
          if (result.reason === 'worker_sessions_busy') {
            halted = true;
            halted_on_conflict = {
              queue_bead_id: bead_id,
              subject_bead_id: bead_id
            };
            notify();
            return;
          }
          failAndDequeue(bead_id, result.reason || 'resolution_refused');
          return;
        }
        if (
          typeof result.attempt_id !== 'string' ||
          result.attempt_id.length === 0
        ) {
          failAndDequeue(bead_id, 'resolution_attempt_missing');
          return;
        }
        if (!clearContinuation(bead_id, bead_id)) {
          halted = true;
          return;
        }
        const entry = queuedEntry(bead_id);
        const rounds = entry ? entry.resolution_rounds : round_cap;
        if (rounds >= round_cap) {
          failAndDequeue(bead_id, 'resolution_round_cap');
          return;
        }
        if (!ensureResolutionBound(bead_id, bead_id, result.attempt_id)) {
          return;
        }
        continue;
      }

      if (action === 'merge_unconfirmed') {
        if (unconfirmed_deadline === null) {
          unconfirmed_deadline = now() + unconfirmed_wait_ms;
        }
        const verdict = await watchUnconfirmed(
          bead_id,
          bead_id,
          unconfirmed_deadline
        );
        if (verdict === 'stopped' || verdict === 'gone') {
          return;
        }
        if (verdict === 'merged') {
          // Re-merge: the re-gate sees MERGED and runs the cleanup through the
          // `already_merged` arm — one cleanup implementation, as everywhere.
          continue;
        }
        failAndDequeue(bead_id, verdict);
        return;
      }

      if (
        action === 'refused' &&
        (result.reason === 'conflict_resolution_required' ||
          result.reason === 'mergeability_changed' ||
          result.reason === 'mergeability_identity_changed')
      ) {
        continue;
      }

      if (
        action === 'refused' &&
        result.reason === 'base_behind' &&
        manualContinuation(bead_id) &&
        typeof deps.updateBase === 'function' &&
        !base_update_attempted
      ) {
        // Queue-owned base update (UI-58w8 §2): the manual authority carries
        // a BEHIND PR through `updateBranch`. The moved head no longer needs a
        // carry stamp to vouch for it — the prior receipt is an ancestor of the
        // updated head, so the merge gate reads it as current (UI-vzyh §2).
        base_update_attempted = true;
        /** @type {{ ok: boolean, reason?: string|null, result_head_sha?: string|null }} */
        let updated = {
          ok: false,
          reason: 'update_branch_failed',
          result_head_sha: null
        };
        try {
          updated = await deps.updateBase(bead_id);
        } catch (err) {
          log('merge queue base update threw for %s: %o', bead_id, err);
        }
        if (updated.ok) {
          notify();
          continue;
        }
        failAndDequeue(bead_id, updated.reason || 'update_branch_failed');
        return;
      }

      if (
        action === 'refused' &&
        (result.reason === 'review_receipt_stale' ||
          result.reason === 'review_receipt_missing' ||
          result.reason === 'review_receipt_undetermined') &&
        manualContinuation(bead_id) &&
        typeof deps.headReview?.ensureApproved === 'function'
      ) {
        // Manual continuation (UI-58w8 §2): a queue-owned head mutation left
        // the receipt stale, so the head-review machine re-acquires a CURRENT
        // review instead of this being a terminal refusal. An undetermined
        // ancestry (probe error at merge time) takes the same path — the
        // contract routes a merge-gate probe_error to a review of the observed
        // head, and only the display stays quiet on it.
        const review = await ensureHeadReview(bead_id, bead_id, {
          head_sha: result.head_sha || '',
          base_ref: result.base_ref || null,
          head_ref: result.head_ref || null,
          mutation: vouched.mutation,
          mutation_result_sha: vouched.result_head_sha,
          starting_approval: vouched.starting_approval
        });
        vouched.mutation = null;
        vouched.result_head_sha = null;
        vouched.starting_approval = null;
        if (review.state === 'approved') {
          notify();
          continue;
        }
        if (review.state === 'failed') {
          // Terminal needs-human: the item KEEPS its queue slot and its
          // journal — a re-click issues the fresh authority that may retry.
          // The drain ENDS rather than returning to the same head: a failed
          // journal that did not persist would otherwise be re-driven in a
          // tight loop, which is the one thing a terminal state must not do.
          fail(bead_id, review.reason || 'head_review_failed');
          halted = true;
          notify();
          return;
        }
        if (review.state === 'halted') {
          halted = true;
          halted_on_head = bead_id;
          notify();
          return;
        }
        // 'gone': cancelled or superseded under us — nothing left to drive.
        return;
      }

      if (action === 'head_review') {
        const review_state = /** @type {any} */ (result).review_state;
        if (review_state === 'approved') {
          notify();
          continue;
        }
        if (review_state === 'failed') {
          fail(bead_id, result.reason || 'head_review_failed');
          halted = true;
          notify();
          return;
        }
        if (review_state === 'halted') {
          halted = true;
          halted_on_head = bead_id;
          notify();
          return;
        }
        return;
      }

      if (action === 'refused' && result.reason === 'repair_in_flight') {
        halted = true;
        halted_on_repair = repairFence(snapshot()).reason || 'repair_in_flight';
        notify();
        return;
      }

      if (action === 'refused' && result.reason === 'not_in_pr_wait') {
        if (!registry_refresh_attempted && typeof deps.prepare === 'function') {
          registry_refresh_attempted = true;
          try {
            await deps.prepare();
          } catch (err) {
            log('merge queue registry refresh failed for %s: %o', bead_id, err);
          }
          continue;
        }
        // Only an observed row may keep the queue head: its next poll can end
        // the halt. An unobserved row must leave so it cannot freeze every PR
        // behind it forever (UI-wwby §3, UI-vkk8 §1 correction).
        if (pollerObserves(bead_id)) {
          fail(bead_id, 'not_in_pr_wait');
          halted = true;
          halted_on_head = bead_id;
          notify();
          return;
        }
        failAndDequeue(bead_id, 'not_in_pr_wait');
        return;
      }

      failAndDequeue(bead_id, (result && result.reason) || 'refused');
      return;
    }
  }

  /**
   * Keep a deferred automatic resolver asleep until its external session fence
   * is provably clear. Without a predicate, staying halted is the fail-closed
   * behavior; a restart can re-evaluate the durable queue from scratch.
   */
  function conflictDispatchStillBlocked() {
    if (!halted_on_conflict) {
      return false;
    }
    const pending = halted_on_conflict;
    if (!queuedEntry(pending.queue_bead_id)) {
      halted_on_conflict = null;
      return false;
    }
    if (manualContinuation(pending.queue_bead_id)) {
      halted_on_conflict = null;
      return false;
    }
    if (typeof deps.conflictDispatchBlocked !== 'function') {
      return true;
    }
    let blocked = true;
    try {
      blocked = deps.conflictDispatchBlocked(
        pending.queue_bead_id,
        pending.subject_bead_id
      );
    } catch (err) {
      log(
        'merge queue conflict dispatch fence failed for %s: %o',
        pending.queue_bead_id,
        err
      );
    }
    if (!blocked) {
      halted_on_conflict = null;
    }
    return blocked;
  }

  /**
   * Remember a requested pass even when one is already running. The active
   * drain must not await itself, so an in-flight caller gets an immediate
   * promise while the latch makes the current owner run the next pass.
   *
   * @returns {Promise<void>}
   */
  function requestDrain() {
    if (stopped) {
      return Promise.resolve();
    }
    if (conflictDispatchStillBlocked()) {
      return Promise.resolve();
    }
    drain_requested = true;
    return drain();
  }

  /**
   * Run requested passes serially. Each pass re-reads the durable head; a kick
   * arriving during an await sets the latch and is consumed only after the
   * current pass exits its halt condition.
   *
   * @returns {Promise<void>}
   */
  async function drain() {
    if (draining || stopped) {
      return;
    }
    draining = true;
    try {
      while (!stopped && drain_requested) {
        if (conflictDispatchStillBlocked()) {
          drain_requested = false;
          break;
        }
        drain_requested = false;
        halted = false;
        halted_on_head = null;
        halted_on_completion = null;
        halted_on_repair = null;
        // A queue resumed after a restart can hold EXTERNAL rows, and those
        // exist only in the in-memory registry the ws overlay reads — empty
        // until something scans bd. Without this, a restored external head
        // would be refused as `not_in_pr_wait` and dropped, which is exactly
        // the resume the durable queue exists to guarantee (UI-5v7d §2 /
        // UI-7agi 정합).
        if (!prepared && typeof deps.prepare === 'function') {
          prepared = true;
          try {
            await deps.prepare();
          } catch (err) {
            log('merge queue prepare failed: %o', err);
          }
        }
        while (!stopped && !halted) {
          promoteTerminalResolutions();
          if (halted) {
            break;
          }
          const head = headEntry();
          if (!head) {
            break;
          }
          active = head.bead_id;
          notify();
          await processItem(head.bead_id);
          active = null;
          notify();
        }
      }
    } catch (err) {
      log('merge queue drain failed: %o', err);
    } finally {
      const rerun = !stopped && drain_requested;
      draining = false;
      active = null;
      notify();
      maintainResolutionWatcher();
      if (rerun) {
        void drain();
      }
    }
  }

  return {
    /**
     * Start the driver: subscribe to queue-changed (the resolution-session wake)
     * and resume a queue that survived a restart.
     */
    start() {
      if (started) {
        return;
      }
      started = true;
      stopped = false;
      if (typeof deps.subscribeQueueChanged === 'function') {
        unsubscribe = deps.subscribeQueueChanged((ws_key) => {
          if (ws_key !== workspace) {
            return;
          }
          wake();
          // The PR poller emits this on every observation pass, so it is also
          // the arrival signal for the head SHA a halt was waiting on. An event
          // that changes nothing must not re-enter `merge()` on the same
          // unreadable state — so the resume asks whether the state that
          // JUSTIFIED the halt still holds, and there are three ways it can
          // stop holding (UI-wwby §3):
          //
          // - the head is readable now: the original resume signal;
          // - the head left the queue: whatever remains behind it is owed a
          //   drain, and this callback is the only thing watching;
          // - the head is no longer OBSERVED — its external registry row
          //   expired: no observation is coming, so the halt would be
          //   permanent. Resuming sends it down the unobserved branch, which
          //   dequeues it.
          if (halted_on_head) {
            const head = halted_on_head;
            if (!queuedEntry(head) || headSha(head) || !pollerObserves(head)) {
              halted_on_head = null;
              void requestDrain();
            }
          }
          if (halted_on_completion) {
            const root_bead_id = halted_on_completion.bead_id;
            const intent = completionIntent(root_bead_id);
            if (
              !queuedEntry(root_bead_id) ||
              !intent ||
              intent.phase === 'merging'
            ) {
              halted_on_completion = null;
              void requestDrain();
            }
          }
          if (halted_on_repair && !repairFence(snapshot()).active) {
            halted_on_repair = null;
            void requestDrain();
          }
          if (halted_on_conflict) {
            void requestDrain();
          }
          if (resolutionNeedsDrain()) {
            void requestDrain();
          }
        });
      }
      void requestDrain();
    },

    /**
     * Stop the driver (shutdown / tests). A wait in flight resolves at once and
     * its item is left where it is — durably queued, resumed by the next start.
     */
    stop() {
      stopped = true;
      started = false;
      drain_requested = false;
      halted_on_repair = null;
      halted_on_conflict = null;
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch {
          // ignore
        }
        unsubscribe = null;
      }
      wake();
      maintainResolutionWatcher();
    },

    /**
     * Kick the loop after a queue placement. Fire-and-forget, exactly like the
     * scheduler's dispatch tick.
     *
     * @returns {Promise<void>}
     */
    kick() {
      return requestDrain();
    },

    /**
     * The driver's non-durable view, for the queue-snapshot decoration.
     *
     * @returns {MergeQueueState}
     */
    state() {
      return {
        active,
        failures: Object.fromEntries(failures),
        // A resolver slot fence is more specific when transient halts overlap.
        waiting: halted_on_conflict
          ? {
              bead_id: halted_on_conflict.queue_bead_id,
              reason: 'worker_sessions_busy'
            }
          : halted_on_completion
            ? {
                bead_id: halted_on_completion.bead_id,
                reason: `completion_waiting:${halted_on_completion.phase}`
              }
            : null
      };
    },

    /**
     * Whether a bead is the item currently being processed — the one thing a
     * [취소] click may NOT remove.
     *
     * @param {string} bead_id
     * @returns {boolean}
     */
    isActive(bead_id) {
      return active === bead_id;
    }
  };
}
