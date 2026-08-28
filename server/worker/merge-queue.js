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
 * How many QUEUE-CAUSED re-conflicts ONE queue item may absorb (UI-p49g §2).
 *
 * A resolution that merged the base tip it was dispatched on, and came back
 * dirty only because a later merge moved that base, is not a session failure —
 * so it does not spend {@link RESOLUTION_ROUND_CAP}. It still spends
 * something: without a cap of its own, a busy lane could re-conflict the same
 * item indefinitely and call a session every time.
 *
 * @type {number}
 */
export const RESOLUTION_REBASE_CAP = 3;

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

const SHA40_RE = /^[0-9a-f]{40}$/i;

/** @type {Set<string>} */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped'
]);

/**
 * Fail closed on a queue snapshot this process cannot read (UI-s582 §1: the
 * repair-state half of the old fence is gone with the repair path, but a store
 * read that THREW must still stop the driver — merging against an unknown
 * snapshot is the one thing worse than not merging).
 *
 * @param {any} q
 * @returns {{ active: boolean, reason: string|null }}
 */
function snapshotFence(q) {
  if (q === null) {
    return { active: true, reason: 'snapshot_unreadable' };
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
 *   dispatchConflict?: (bead_id: string, approved: { head_sha: string, base_ref: string|null, head_ref: string|null }, resolution_wait: { queue_bead_id: string, wait_ms: number, manual_authority?: boolean, dispatch_head_sha: string, base_ref: string, head_ref: string }, continuation?: { continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }) => Promise<MergeClickResult>,
 *   baseContained?: (bead_id: string, input: { base_ref: string, head_ref: string, head_sha: string }) => Promise<'contained'|'not_contained'|null>,
 *   observePr: (bead_id: string) => Promise<{ state?: string|null, error?: string|null }>,
 *   headSha?: (bead_id: string) => string|null,
 *   isExternalRow?: (bead_id: string) => boolean,
 *   conflictDispatchBlocked?: (queue_bead_id: string, subject_bead_id: string) => boolean,
 *   reviewDispatchBlocked?: (bead_id: string) => boolean,
 *   reviewSession?: { startAuto: (input: { bead_id: string, head_sha: string, head_ref: string|null, reason: string }) => Promise<{ ok: boolean, reason?: string }> },
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
 *   rebase_round_cap?: number,
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
  const rebase_cap = deps.rebase_round_cap ?? RESOLUTION_REBASE_CAP;
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
  let halted_on_snapshot = null;
  /** @type {{ queue_bead_id: string, subject_bead_id: string }|null} */
  let halted_on_conflict = null;
  let prepared = false;
  /** @type {string|null} */
  let active = null;
  /**
   * Items this drain pass has already put on a gate hold (UI-d7fy §3.3).
   *
   * A held item stays at its place in the durable queue, so without a
   * per-pass memory `headEntry` would hand it straight back and the loop would
   * re-gate the same head forever. Emptied at the top of every pass, because
   * "every `kick()` re-judges a held item" is the contract the hold rests on.
   *
   * @type {Set<string>}
   */
  const held_this_pass = new Set();
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
          // A gate hold does NOT stop the drain (UI-d7fy §3.3): the item keeps
          // its slot and its authority, and everything behind it keeps
          // merging. It is skipped for the REST OF THIS PASS only — the set is
          // emptied at every `kick()`, which is what re-runs the gate on it.
          !held_this_pass.has(entry.bead_id)
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
   * The gate verdicts that HOLD an item instead of ending it (UI-d7fy §3.3),
   * widened to the workflow contract's four by the 2026-08-28
   * auto-review-dispatch spec (§4 1번).
   *
   * All four say the same thing — this head has no review the gate can stand
   * on — and none of them is decided by anything the queue owns, so none of
   * them is a failure of this item's turn. `review_receipt_invalid` used to be
   * an ordinary refusal that dequeued the row; a malformed receipt is exactly
   * what a review lineage rewrites, so it holds like the other three.
   *
   * The exit is the review lineage: the queue's own once-per-head dispatch
   * (§4) or the `[리뷰 후 머지]` click that resumes it — never a dequeue and
   * never a terminal `needs_human`.
   *
   * @type {Set<string>}
   */
  const HOLD_REASONS = new Set([
    'review_receipt_missing',
    'review_receipt_stale',
    'review_receipt_invalid',
    'review_receipt_undetermined'
  ]);

  /**
   * Write or refresh one item's hold.
   *
   * `auto_review_wait` is OMITTED unless a fence verdict is being stated: the
   * store preserves what it already holds on an omission, so the hold write
   * itself never disturbs the wait marker the judgment below owns.
   *
   * @param {string} bead_id
   * @param {string} reason
   * @param {string|null|undefined} head_sha
   * @param {'slot'|null} [auto_review_wait]
   */
  function writeHold(bead_id, reason, head_sha, auto_review_wait) {
    try {
      // The store writes only when something actually changed, so a held item
      // re-judged to the same verdict costs no revision and no fanout.
      if (
        deps.store.setMergeHold(workspace, {
          bead_id,
          hold: {
            reason,
            head_sha: head_sha || '',
            ...(auto_review_wait === undefined ? {} : { auto_review_wait })
          },
          at: now()
        }).ok
      ) {
        notify();
      }
    } catch (err) {
      log('merge queue hold write failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Whether this bead has a `review_session` attempt still in flight — the
   * per-Bead guard every writer of a review lineage shares (UI-d7fy §5.2,
   * restated by the 2026-08-28 auto-review-dispatch spec §4 3번).
   *
   * @param {any} q
   * @param {string} bead_id
   * @returns {boolean}
   */
  function reviewSessionInFlight(q, bead_id) {
    const attempts = (q && q.attempts) || {};
    return Object.values(attempts).some((/** @type {any} */ attempt) => {
      return (
        !!attempt &&
        attempt.kind === 'review_session' &&
        attempt.bead_id === bead_id &&
        (attempt.status === 'pending' || attempt.status === 'running')
      );
    });
  }

  /**
   * Decide whether THIS hold spends the row's one automatic review lineage
   * (2026-08-28 auto-review-dispatch spec §4).
   *
   * The judgment lives in the hold write's own turn because that is the moment
   * the gate produced the reason; every `kick()` re-judges a held row, so no
   * watcher and no timer exist for this. Any condition that fails dispatches
   * nothing and only logs — a failure to dispatch is not a failure of the row,
   * whose hold stands either way.
   *
   * @param {string} bead_id
   * @param {string} reason
   * @param {string|null|undefined} raw_head_sha
   * @param {string|null} head_ref
   * @returns {Promise<void>}
   */
  async function judgeAutoReviewDispatch(
    bead_id,
    reason,
    raw_head_sha,
    head_ref
  ) {
    // 1. The reason must be one of the four review holds, and the head must be
    //    a real sha — a claim is taken ON a head, and a gate refusal that
    //    carried none cannot be told apart from any other.
    if (
      !HOLD_REASONS.has(reason) ||
      typeof raw_head_sha !== 'string' ||
      !SHA40_RE.test(raw_head_sha)
    ) {
      writeHold(bead_id, reason, raw_head_sha, null);
      return;
    }
    // Every durable copy of a head is lowercase, so the claim comparison and
    // the `expected` the store re-checks must be too.
    const head_sha = raw_head_sha.toLowerCase();
    const q = snapshot();
    const entry = Array.isArray(q?.merge_queue)
      ? q.merge_queue.find(
          (/** @type {any} */ item) => item.bead_id === bead_id
        )
      : null;
    if (!entry) {
      return;
    }
    // 2. An automatic dispatch rides the authority the row ALREADY has and
    //    never mints one — only a click makes a manual authority. A legacy
    //    authority-less row's exit is the button.
    const authority = entry.authority ?? null;
    if (!authority) {
      writeHold(bead_id, reason, head_sha, null);
      return;
    }
    // 3. One review lineage per bead at a time. A session that pushed its own
    //    REVISE fix moved the head, and this is what stops the queue from
    //    reading that move as a new lineage while the session still runs.
    if (reviewSessionInFlight(q, bead_id)) {
      writeHold(bead_id, reason, head_sha, null);
      return;
    }
    // 4. The claim: this head gets at most one lineage, whichever trigger
    //    spent it. A `head_sha: null` exhausted claim (§5.2 fail-closed) covers
    //    EVERY head.
    const claim = entry.review_dispatch ?? null;
    if (claim && (claim.head_sha === null || claim.head_sha === head_sha)) {
      if (claim.state === 'active') {
        // Same head, `active`, and no attempt in flight: the records disagree,
        // which a restart recovery that did not land can produce. Correct the
        // claim to `exhausted` at the SAME head and dispatch nothing (§4 4번) —
        // leaving it `active` would keep saying a session is running that
        // ended, and moving its head would buy the row a second lineage.
        try {
          deps.store.expireReviewDispatchClaim(workspace, {
            bead_id,
            head_sha
          });
        } catch (err) {
          log('review claim correction failed for %s: %o', bead_id, err);
        }
      }
      writeHold(bead_id, reason, head_sha, null);
      return;
    }
    // 5. The slot fence (ADR 0015, 결정 1). A MANUAL authority is exempt: it
    //    stands for a click a person just made. An automatic one waits for a
    //    free workspace slot, and says so on the card.
    if (authority.source !== 'manual' && reviewDispatchBlocked(bead_id)) {
      // Written EXPLICITLY, and only when it differs from what is stored: a
      // repeated blocked kick that bumped the revision would emit
      // `queue-changed`, which `hasHeldEntry()` turns into another drain, which
      // re-judges this row — forever.
      writeHold(bead_id, reason, head_sha, 'slot');
      return;
    }
    writeHold(bead_id, reason, head_sha, null);
    if (typeof deps.reviewSession?.startAuto !== 'function') {
      return;
    }
    try {
      const started = await deps.reviewSession.startAuto({
        bead_id,
        head_sha,
        head_ref,
        reason
      });
      if (started && started.ok !== true) {
        log(
          'merge queue: automatic review dispatch refused for %s (%s)',
          bead_id,
          started.reason || 'unknown'
        );
      }
    } catch (err) {
      log(
        'merge queue automatic review dispatch threw for %s: %o',
        bead_id,
        err
      );
    }
  }

  /**
   * Whether the workspace has no slot for an automatic review session right
   * now (§4 5번). Unwired reads as "not blocked": the fence is the enrollment
   * courtesy of ADR 0015, not a safety gate, and a driver built without a
   * scheduler has no slots to protect.
   *
   * @param {string} bead_id
   * @returns {boolean}
   */
  function reviewDispatchBlocked(bead_id) {
    if (typeof deps.reviewDispatchBlocked !== 'function') {
      return false;
    }
    try {
      return deps.reviewDispatchBlocked(bead_id) === true;
    } catch (err) {
      log('review dispatch fence read failed for %s: %o', bead_id, err);
      return false;
    }
  }

  /**
   * Put one item on a gate hold, take it out of THIS pass, and judge whether
   * the hold spends the row's one automatic review lineage.
   *
   * @param {string} bead_id
   * @param {string} reason
   * @param {string|null|undefined} head_sha
   * @param {string|null} [head_ref]
   * @returns {Promise<void>}
   */
  async function holdEntry(bead_id, reason, head_sha, head_ref = null) {
    held_this_pass.add(bead_id);
    writeHold(bead_id, reason, head_sha);
    log('merge queue: %s held (%s)', bead_id, reason);
    await judgeAutoReviewDispatch(bead_id, reason, head_sha, head_ref);
  }

  /**
   * Whether ANY queued item is currently on a gate hold (UI-d7fy §3.3).
   *
   * The hold's exit is a fact the queue does not own — an `impl_review` receipt
   * written to the Bead by the `[리뷰 후 머지]` session, or by a person, or by
   * any other path. Nothing about that write touches the queue file, so the
   * only signal the driver can hang the re-judgement on is the ambient
   * queue-changed event the PR observation pass emits. Hence: while a hold
   * stands, that event is a reason to drain.
   *
   * @returns {boolean}
   */
  function hasHeldEntry() {
    const q = snapshot();
    const lane = Array.isArray(q?.merge_queue) ? q.merge_queue : [];
    return lane.some((/** @type {any} */ entry) => !!entry.hold);
  }

  /**
   * Release a hold the gate no longer justifies. The whole record goes,
   * `auto_review_wait` with it (2026-08-28 auto-review-dispatch spec §4 5번):
   * nothing is waiting for a slot once nothing is held. The `review_dispatch`
   * claim deliberately SURVIVES (§5.1) — it is pinned to a head, and a
   * transient non-hold verdict between two holds at the same head must not buy
   * that head a second automatic review.
   *
   * @param {string} bead_id
   */
  function releaseHold(bead_id) {
    if (!queuedEntry(bead_id)?.hold) {
      return;
    }
    try {
      if (
        deps.store.setMergeHold(workspace, { bead_id, hold: null, at: now() })
          .ok
      ) {
        notify();
      }
    } catch (err) {
      log('merge queue hold release failed for %s: %o', bead_id, err);
    }
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
   * The dispatch identity a `resolution` record must carry (UI-p49g §3.1),
   * read off whatever named the head/base pair this dispatch was taken on. A
   * missing part stays missing: the store refuses the write rather than
   * persist a binding that cannot be judged later.
   *
   * @param {{ head_sha?: string|null, base_ref?: string|null, head_ref?: string|null }} observed
   * @returns {{ dispatch_head_sha: string, base_ref: string, head_ref: string }}
   */
  function dispatchIdentity(observed) {
    return {
      dispatch_head_sha: observed.head_sha || '',
      // `conflictPrompt` defaults an absent base to `main`, so the record names
      // the branch the session was actually told to merge.
      base_ref: observed.base_ref || 'main',
      head_ref: observed.head_ref || ''
    };
  }

  /**
   * The dispatch identity of a resolution the queue is ADOPTING rather than
   * dispatching, read from the current mergeability observation.
   *
   * @param {string} subject_bead_id
   * @returns {Promise<{ dispatch_head_sha: string, base_ref: string, head_ref: string }>}
   */
  async function observedIdentity(subject_bead_id) {
    if (typeof deps.probeMergeability !== 'function') {
      return dispatchIdentity({});
    }
    try {
      const probe = await deps.probeMergeability(subject_bead_id);
      return dispatchIdentity(probe.ok ? probe : {});
    } catch (err) {
      log(
        'merge queue resolution identity probe failed for %s: %o',
        subject_bead_id,
        err
      );
      return dispatchIdentity({});
    }
  }

  /**
   * Persist an exact attempt binding before the driver waits on it.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string} attempt_id
   * @param {{ dispatch_head_sha: string, base_ref: string, head_ref: string }} identity
   */
  function bindResolution(
    queue_bead_id,
    subject_bead_id,
    attempt_id,
    identity
  ) {
    let ok = false;
    try {
      ok = deps.store.bindResolutionWait(workspace, {
        bead_id: queue_bead_id,
        subject_bead_id,
        attempt_id,
        wait_ms: resolution_wait_ms,
        ...identity
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
   * @param {{ dispatch_head_sha: string, base_ref: string, head_ref: string }} identity
   */
  function ensureResolutionBound(
    queue_bead_id,
    subject_bead_id,
    attempt_id,
    identity
  ) {
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
      return bindResolution(
        queue_bead_id,
        subject_bead_id,
        attempt_id,
        identity
      );
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
          !bindResolution(
            queue_bead_id,
            subject_bead_id,
            restored.attempt_id,
            // The queue did not dispatch THIS session (a boot restore, or a
            // resolver a click started on a queued row), so the identity has
            // to be observed rather than remembered. Without it the record
            // could not answer §4.2's question at all.
            await observedIdentity(subject_bead_id)
          )
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
   * Which budget one finished resolution round spends (UI-p49g §4.2).
   *
   * The question is never "is it still dirty" alone — that is true both when
   * the session failed and when the QUEUE re-conflicted a correct resolution
   * by landing another PR on the base underneath it. Only the second is
   * forgiven, and only on positive evidence: the session pushed a new head AND
   * that head does not contain the base branch. Every unreadable ground —
   * a failed re-probe, a missing dispatch identity, an unusable containment
   * answer — charges the session, because wrongly forgiving calls sessions
   * forever while wrongly charging only hands the item to a person.
   *
   * @param {any} probe
   * @param {any} resolution
   * @param {string} subject_bead_id
   * @returns {Promise<'session'|'rebase'|'none'>}
   */
  async function resolutionCharge(probe, resolution, subject_bead_id) {
    if (!probe.ok) {
      return 'session';
    }
    if (probe.kind !== 'dirty') {
      return 'none';
    }
    const dispatch_head_sha = resolution?.dispatch_head_sha;
    const base_ref = resolution?.base_ref;
    const head_ref = resolution?.head_ref;
    if (
      typeof probe.head_sha !== 'string' ||
      !SHA40_RE.test(probe.head_sha) ||
      typeof dispatch_head_sha !== 'string' ||
      !SHA40_RE.test(dispatch_head_sha) ||
      typeof base_ref !== 'string' ||
      base_ref.length === 0 ||
      typeof head_ref !== 'string' ||
      head_ref.length === 0
    ) {
      return 'session';
    }
    if (probe.head_sha === dispatch_head_sha) {
      // The session pushed nothing, so nothing it did can have been overtaken.
      return 'session';
    }
    if (typeof deps.baseContained !== 'function') {
      return 'session';
    }
    /** @type {'contained'|'not_contained'|null} */
    let contained = null;
    try {
      contained = await deps.baseContained(subject_bead_id, {
        base_ref,
        head_ref,
        head_sha: probe.head_sha
      });
    } catch (err) {
      log(
        'merge queue base containment probe failed for %s: %o',
        subject_bead_id,
        err
      );
      contained = null;
    }
    return contained === 'not_contained' ? 'rebase' : 'session';
  }

  /**
   * Clear one exact ready resolution record, charging it only when the latest
   * probe still needs another conflict-resolution round.
   *
   * @param {string} queue_bead_id
   * @param {string} attempt_id
   * @param {'session'|'rebase'|'none'} charge
   */
  function consumeResolution(queue_bead_id, attempt_id, charge) {
    let ok = false;
    try {
      ok = deps.store.consumeResolutionWait(workspace, {
        bead_id: queue_bead_id,
        attempt_id,
        charge
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
    if (snapshotFence(snapshot()).active) {
      return { ok: false, action: 'refused', reason: 'snapshot_unreadable' };
    }
    try {
      return await deps.merge(bead_id);
    } catch (err) {
      log('merge queue merge() threw for %s: %o', bead_id, err);
      return { ok: false, action: 'refused', reason: 'merge_error' };
    }
  }

  /**
   * Re-probe before every effect. A ready resolution is charged exactly once
   * after the probe and before the selected merge/update/resolver action.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string|null} ready_attempt_id
   * @returns {Promise<MergeClickResult|null>}
   */
  async function runLatestMerge(
    queue_bead_id,
    subject_bead_id,
    ready_attempt_id
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
        !consumeResolution(queue_bead_id, ready_attempt_id, 'session')
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
    /** @type {'session'|'rebase'|'none'} */
    const charge = ready_attempt_id
      ? await resolutionCharge(probe, before?.resolution, subject_bead_id)
      : 'none';
    const effective_rounds =
      (before?.resolution_rounds ?? round_cap) + (charge === 'session' ? 1 : 0);
    const effective_rebase =
      (before?.rebase_rounds ?? rebase_cap) + (charge === 'rebase' ? 1 : 0);
    if (
      ready_attempt_id &&
      !consumeResolution(queue_bead_id, ready_attempt_id, charge)
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
      // The merge gate is the ONE review judgment (UI-d7fy §2/§4): `runMerge`
      // re-runs it against a fresh pin, and a verdict it refuses on comes back
      // as a `refused` reason this item is HELD on — never a second, narrower
      // freshness rule of the queue's own.
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
    if (effective_rebase >= rebase_cap) {
      return {
        ok: false,
        action: 'refused',
        reason: 'resolution_rebase_cap',
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
    const identity = dispatchIdentity(probe);
    try {
      return await deps.dispatchConflict(
        subject_bead_id,
        {
          head_sha: probe.head_sha,
          base_ref: probe.base_ref || null,
          head_ref: probe.head_ref || null
        },
        {
          queue_bead_id,
          wait_ms: resolution_wait_ms,
          manual_authority: manualContinuation(queue_bead_id),
          ...identity
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
   * Drive the root subject while preserving its public queue slot. Conflict
   * rounds stay on the root queue entry.
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
            result.attempt_id,
            dispatchIdentity(result)
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
      if (action === 'refused' && result.reason === 'snapshot_unreadable') {
        halted = true;
        halted_on_snapshot =
          snapshotFence(snapshot()).reason || 'snapshot_unreadable';
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
    const fence = snapshotFence(snapshot());
    if (fence.active) {
      halted = true;
      halted_on_snapshot = fence.reason;
      log(
        'merge queue: %s halted — queue snapshot unreadable (%s)',
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
      // A `ready` resolution goes straight back to re-observation (UI-d7fy
      // §3.3): the resolver's own commit is judged by the same ancestry rule
      // as any other commit, so there is no queue-owned mutation voucher to
      // carry and no `resolver-self:` receipt to demand.
      const result = await runLatestMerge(
        bead_id,
        bead_id,
        resolution.kind === 'ready' ? resolution.attempt_id || null : null
      );
      if (!result) {
        return;
      }
      if (result.continuation_mismatch) {
        requireContinuation(bead_id, bead_id, result.continuation_mismatch);
        return;
      }
      const action = result ? result.action : null;

      // The gate's review verdicts HOLD (UI-d7fy §3.3): authority stays, the
      // item keeps its slot, nothing is dequeued or terminalized, and the rest
      // of the queue keeps draining behind it. Any other verdict means the
      // gate is no longer holding on a review, so a stale hold is released
      // before this turn decides anything else.
      if (action === 'refused' && HOLD_REASONS.has(String(result.reason))) {
        await holdEntry(
          bead_id,
          String(result.reason),
          result.head_sha,
          result.head_ref ?? null
        );
        return;
      }
      releaseHold(bead_id);

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
        if (
          !ensureResolutionBound(
            bead_id,
            bead_id,
            result.attempt_id,
            dispatchIdentity(result)
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

      if (action === 'refused' && result.reason === 'snapshot_unreadable') {
        halted = true;
        halted_on_snapshot =
          snapshotFence(snapshot()).reason || 'snapshot_unreadable';
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
        // Every kick re-judges every held item (UI-d7fy §3.3): the skip list
        // is a property of ONE pass, never of the item.
        held_this_pass.clear();
        halted_on_head = null;
        halted_on_completion = null;
        halted_on_snapshot = null;
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
          if (halted_on_snapshot && !snapshotFence(snapshot()).active) {
            halted_on_snapshot = null;
            void requestDrain();
          }
          if (halted_on_conflict) {
            void requestDrain();
          }
          if (resolutionNeedsDrain()) {
            void requestDrain();
          }
          // A HELD item is re-judged on every kick (UI-d7fy §3.3), and `wake()`
          // above only nudges a drain that is already in progress. Without this
          // the hold would end only on a queue-owned mutation — so a receipt
          // that became valid through any other path would leave the row held
          // forever. Coalesced by `requestDrain`/`drain`: overlapping events set
          // the latch instead of starting a second pass, and a re-judgement that
          // lands on the same reason writes nothing and emits no further event.
          if (hasHeldEntry()) {
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
      halted_on_snapshot = null;
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
