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
 * - `conflict_resolution` → a session was dispatched. Wait for it to END, count
 *   the round, and merge again. The queue holding still guarantees nothing else
 *   moves the base while that session works, which is what stops the
 *   resolve→re-conflict loop the manual flow had.
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
 * Durable vs memory: the queue and each item's consumed resolution rounds live
 * in `queue.json` because merging beads-ui DEPLOYS beads-ui, which restarts this
 * process mid-queue. Everything else — which item is active, why one failed, the
 * waiting clocks — is memory: after a restart nothing is in flight, so a fresh
 * clock is the honest reading.
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
 * How long the driver waits for a dispatched resolution session to END before
 * giving up on the item (spec §2). The session itself is NOT stopped — the
 * queue moves on and leaves it running, because killing a session that is
 * mid-resolution destroys work no one asked to throw away.
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

/**
 * @typedef {Object} MergeQueueState
 * @property {string|null} active - The item the driver is working on right now.
 * @property {Record<string, string>} failures - Why each skipped item failed,
 * by bead_id. Non-durable: a restart clears it, which is correct — the reason
 * described one run of one click.
 */

/**
 * Build a workspace's merge driver.
 *
 * @param {{
 *   workspace: string,
 *   store: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   merge: (bead_id: string) => Promise<MergeClickResult>,
 *   observePr: (bead_id: string) => Promise<{ state?: string|null, error?: string|null }>,
 *   headSha?: (bead_id: string) => string|null,
 *   isExternalRow?: (bead_id: string) => boolean,
 *   onCompletionResult?: (root_bead_id: string, subject_bead_id: string, result: MergeClickResult) => Promise<void>|void,
 *   prepare?: () => Promise<unknown>,
 *   subscribeQueueChanged?: (fn: (workspace: string) => void) => (() => void),
 *   notifyChanged?: (workspace: string) => void,
 *   now?: () => number,
 *   setTimer?: (fn: () => void, ms: number) => any,
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
  /** @type {string|null} */
  let halted_on_completion = null;
  let prepared = false;
  /** @type {string|null} */
  let active = null;
  /** @type {Map<string, string>} */
  const failures = new Map();
  /** @type {(() => void)|null} */
  let unsubscribe = null;
  /** @type {(() => void)|null} */
  let wake_waiter = null;

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
   * @returns {{ bead_id: string, resolution_rounds: number }|null}
   */
  function headEntry() {
    const q = snapshot();
    const lane = q && Array.isArray(q.merge_queue) ? q.merge_queue : [];
    return lane.length > 0 ? lane[0] : null;
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
   * @param {string} root_bead_id
   * @returns {any|null}
   */
  function completionIntent(root_bead_id) {
    const q = snapshot();
    return q?.completion_intents?.[root_bead_id] || null;
  }

  /**
   * The bead's own RUNNING conflict-resolution attempt, if one exists. This is
   * what a boot resume finds when the previous process died with a session in
   * flight — and it must be judged BEFORE `merge()` is called again, because
   * `scheduler.resolveConflict` refuses a running bead with `bead_running`,
   * which would look like a resolution failure instead of the wait it is.
   *
   * @param {string} bead_id
   * @returns {string|null} The running attempt's id.
   */
  function runningResolutionAttempt(bead_id) {
    const q = snapshot();
    for (const [attempt_id, a] of Object.entries(
      (q && q.attempts) || /** @type {Record<string, any>} */ ({})
    )) {
      const rec = /** @type {any} */ (a);
      if (
        rec &&
        rec.bead_id === bead_id &&
        rec.status === 'running' &&
        rec.conflict_resolution === true
      ) {
        return attempt_id;
      }
    }
    return null;
  }

  /**
   * Whether the bead's resolution session is still in flight.
   *
   * `paused` counts as in flight, not as ended. A user who pauses a resolution
   * session has not finished resolving anything, and calling `merge()` there
   * would find the PR still DIRTY and dispatch a SECOND session from the paused
   * one — restarting by itself the session a human deliberately stopped. Waiting
   * it out (and timing out) is what leaves that decision with the human.
   *
   * @param {string} bead_id
   * @param {string|null} attempt_id - Null watches ANY resolution attempt of
   * the bead (the boot-resume case, where the driver did not dispatch it).
   * @returns {boolean}
   */
  function resolutionStillRunning(bead_id, attempt_id) {
    if (!attempt_id) {
      return runningResolutionAttempt(bead_id) !== null;
    }
    const q = snapshot();
    const rec = q && q.attempts ? q.attempts[attempt_id] : null;
    if (!rec) {
      return false;
    }
    if (rec.status === 'running') {
      return true;
    }
    if (rec.status !== 'paused') {
      return false;
    }
    // A paused attempt the user already RESUMED is spent history — its child is
    // the live one, so the wait follows the child instead of stalling here.
    const child = Object.values(q.attempts || {}).find(
      (/** @type {any} */ a) => a && a.resumed_from === attempt_id
    );
    return child
      ? resolutionStillRunning(bead_id, /** @type {any} */ (child).attempt_id)
      : true;
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
   * Count one consumed resolution round, failing CLOSED: a bump that did not
   * persist would let the item re-merge on a budget the cap already spent.
   *
   * @param {string} bead_id
   * @returns {boolean}
   */
  function bumpRound(bead_id) {
    try {
      return deps.store.bumpResolutionRound(workspace, bead_id).ok;
    } catch (err) {
      log('merge queue round bump failed for %s: %o', bead_id, err);
      return false;
    }
  }

  /**
   * Wait for a resolution session to end.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {string|null} attempt_id
   * @returns {Promise<'ended'|'timeout'|'gone'|'stopped'>}
   */
  async function waitForResolution(queue_bead_id, subject_bead_id, attempt_id) {
    const deadline = now() + resolution_wait_ms;
    while (!stopped) {
      if (!queuedEntry(queue_bead_id)) {
        return 'gone';
      }
      if (!resolutionStillRunning(subject_bead_id, attempt_id)) {
        return 'ended';
      }
      const left = deadline - now();
      if (left <= 0) {
        return 'timeout';
      }
      await sleepOrWake(Math.min(RESOLUTION_POLL_MS, left));
    }
    return 'stopped';
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
    try {
      return await deps.merge(bead_id);
    } catch (err) {
      log('merge queue merge() threw for %s: %o', bead_id, err);
      return { ok: false, action: 'refused', reason: 'merge_error' };
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
      halted = true;
      halted_on_completion = root_bead_id;
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
      halted_on_completion = root_bead_id;
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
    const restored = runningResolutionAttempt(subject_bead_id);
    if (restored) {
      const entry = queuedEntry(root_bead_id);
      if (entry && entry.resolution_rounds >= round_cap) {
        await handoffCompletion(root_bead_id, subject_bead_id, {
          ok: false,
          action: 'refused',
          reason: 'resolution_round_cap'
        });
        return;
      }
      const outcome = await waitForResolution(
        root_bead_id,
        subject_bead_id,
        restored
      );
      if (outcome === 'stopped' || outcome === 'gone') {
        return;
      }
      if (outcome === 'timeout') {
        await handoffCompletion(root_bead_id, subject_bead_id, {
          ok: false,
          action: 'refused',
          reason: 'resolution_timeout'
        });
        return;
      }
      if (!bumpRound(root_bead_id)) {
        halted = true;
        return;
      }
    }

    while (!stopped && !halted && queuedEntry(root_bead_id)) {
      const result = await runMerge(subject_bead_id);
      const action = result ? result.action : null;
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
          await handoffCompletion(root_bead_id, subject_bead_id, result);
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
        const outcome = await waitForResolution(
          root_bead_id,
          subject_bead_id,
          result.attempt_id || null
        );
        if (outcome === 'stopped' || outcome === 'gone') {
          return;
        }
        if (outcome === 'timeout') {
          await handoffCompletion(root_bead_id, subject_bead_id, {
            ok: false,
            action: 'refused',
            reason: 'resolution_timeout'
          });
          return;
        }
        if (!bumpRound(root_bead_id)) {
          halted = true;
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

    // Boot resume (spec §2 부팅 정합): a durable `running` resolution attempt is
    // restored as the step-3 wait rather than judged a failure.
    const restored = runningResolutionAttempt(bead_id);
    if (restored) {
      const entry = queuedEntry(bead_id);
      if (entry && entry.resolution_rounds >= round_cap) {
        // The cap is spent, so this item gets no more rounds — including this
        // restored one. The session is left running, as everywhere else.
        // Right after a restart the observation cache is empty, so the head SHA
        // is usually unreadable here: the disposition then HOLDS the item (§3.2)
        // instead of dropping it without an exclusion.
        failAndDequeue(bead_id, 'resolution_round_cap');
        return;
      }
      const outcome = await waitForResolution(bead_id, bead_id, restored);
      if (outcome === 'stopped' || outcome === 'gone') {
        return;
      }
      if (outcome === 'timeout') {
        failAndDequeue(bead_id, 'resolution_timeout');
        return;
      }
      if (!bumpRound(bead_id)) {
        // The round did not persist, so re-merging would spend a budget the
        // count cannot prove. Leave the item queued and stop this drain.
        halted = true;
        return;
      }
    }

    while (!stopped && !halted) {
      if (!queuedEntry(bead_id)) {
        return;
      }
      const result = await runMerge(bead_id);
      const action = result ? result.action : null;

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
          failAndDequeue(bead_id, result.reason || 'resolution_refused');
          return;
        }
        const entry = queuedEntry(bead_id);
        const rounds = entry ? entry.resolution_rounds : round_cap;
        if (rounds >= round_cap) {
          // Cap reached. The session just dispatched is deliberately LEFT
          // RUNNING (spec §2): the queue gives up its turn, the human keeps
          // the resolution work.
          failAndDequeue(bead_id, 'resolution_round_cap');
          return;
        }
        const outcome = await waitForResolution(
          bead_id,
          bead_id,
          result.attempt_id || null
        );
        if (outcome === 'stopped' || outcome === 'gone') {
          return;
        }
        if (outcome === 'timeout') {
          failAndDequeue(bead_id, 'resolution_timeout');
          return;
        }
        if (!bumpRound(bead_id)) {
          halted = true;
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

      failAndDequeue(bead_id, (result && result.reason) || 'refused');
      return;
    }
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
        drain_requested = false;
        halted = false;
        halted_on_head = null;
        halted_on_completion = null;
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
          const head = headEntry();
          if (!head) {
            break;
          }
          active = head.bead_id;
          notify();
          await processItem(head.bead_id);
        }
      }
    } catch (err) {
      log('merge queue drain failed: %o', err);
    } finally {
      const rerun = !stopped && drain_requested;
      draining = false;
      active = null;
      notify();
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
            const root_bead_id = halted_on_completion;
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
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch {
          // ignore
        }
        unsubscribe = null;
      }
      wake();
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
      return { active, failures: Object.fromEntries(failures) };
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
