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
  const round_cap = deps.resolution_round_cap ?? RESOLUTION_ROUND_CAP;
  const resolution_wait_ms = deps.resolution_wait_ms ?? RESOLUTION_WAIT_MS;
  const unconfirmed_poll_ms = deps.unconfirmed_poll_ms ?? UNCONFIRMED_POLL_MS;
  const unconfirmed_wait_ms = deps.unconfirmed_wait_ms ?? UNCONFIRMED_WAIT_MS;

  let started = false;
  let stopped = false;
  let draining = false;
  // Set when a durable write the loop DEPENDS ON did not stick. It ends the
  // current drain instead of retrying in place; the queue is durable, so the
  // next kick or restart resumes it.
  let halted = false;
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
   * @param {string} bead_id
   */
  function queuedEntry(bead_id) {
    const q = snapshot();
    const lane = q && Array.isArray(q.merge_queue) ? q.merge_queue : [];
    return lane.find((/** @type {any} */ e) => e.bead_id === bead_id) || null;
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
   * @param {string} bead_id
   * @param {string|null} attempt_id
   * @returns {Promise<'ended'|'timeout'|'gone'|'stopped'>}
   */
  async function waitForResolution(bead_id, attempt_id) {
    const deadline = now() + resolution_wait_ms;
    while (!stopped) {
      if (!queuedEntry(bead_id)) {
        return 'gone';
      }
      if (!resolutionStillRunning(bead_id, attempt_id)) {
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
   * @param {string} bead_id
   * @param {number} deadline
   * @returns {Promise<'merged'|'pr_closed_unmerged'|'merge_unconfirmed_timeout'|'gone'|'stopped'>}
   */
  async function watchUnconfirmed(bead_id, deadline) {
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
      if (!queuedEntry(bead_id)) {
        return 'gone';
      }
      /** @type {any} */
      let observed;
      try {
        observed = await deps.observePr(bead_id);
      } catch (err) {
        log('merge queue re-observation failed for %s: %o', bead_id, err);
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
   * Drive ONE queue item to a terminal disposition.
   *
   * @param {string} bead_id
   */
  async function processItem(bead_id) {
    // A retried item starts clean: the previous reason described a run that is
    // over, and leaving it up would label a live attempt with a dead failure.
    failures.delete(bead_id);
    notify();
    /** @type {number|null} */
    let unconfirmed_deadline = null;

    // Boot resume (spec §2 부팅 정합): a durable `running` resolution attempt is
    // restored as the step-3 wait rather than judged a failure.
    const restored = runningResolutionAttempt(bead_id);
    if (restored) {
      const entry = queuedEntry(bead_id);
      if (entry && entry.resolution_rounds >= round_cap) {
        // The cap is spent, so this item gets no more rounds — including this
        // restored one. The session is left running, as everywhere else.
        fail(bead_id, 'resolution_round_cap');
        dequeue(bead_id);
        return;
      }
      const outcome = await waitForResolution(bead_id, restored);
      if (outcome === 'stopped' || outcome === 'gone') {
        return;
      }
      if (outcome === 'timeout') {
        fail(bead_id, 'resolution_timeout');
        dequeue(bead_id);
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
          // finished either way — nothing here retries a cleanup.
          fail(
            bead_id,
            `정리 실패(${result.cleanup_step || '?'}): ${result.reason || ''}`
          );
        }
        dequeue(bead_id);
        return;
      }

      if (action === 'conflict_resolution') {
        if (!result.ok) {
          fail(bead_id, result.reason || 'resolution_refused');
          dequeue(bead_id);
          return;
        }
        const entry = queuedEntry(bead_id);
        const rounds = entry ? entry.resolution_rounds : round_cap;
        if (rounds >= round_cap) {
          // Cap reached. The session just dispatched is deliberately LEFT
          // RUNNING (spec §2): the queue gives up its turn, the human keeps
          // the resolution work.
          fail(bead_id, 'resolution_round_cap');
          dequeue(bead_id);
          return;
        }
        const outcome = await waitForResolution(
          bead_id,
          result.attempt_id || null
        );
        if (outcome === 'stopped' || outcome === 'gone') {
          return;
        }
        if (outcome === 'timeout') {
          fail(bead_id, 'resolution_timeout');
          dequeue(bead_id);
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
        const verdict = await watchUnconfirmed(bead_id, unconfirmed_deadline);
        if (verdict === 'stopped' || verdict === 'gone') {
          return;
        }
        if (verdict === 'merged') {
          // Re-merge: the re-gate sees MERGED and runs the cleanup through the
          // `already_merged` arm — one cleanup implementation, as everywhere.
          continue;
        }
        fail(bead_id, verdict);
        dequeue(bead_id);
        return;
      }

      fail(bead_id, (result && result.reason) || 'refused');
      dequeue(bead_id);
      return;
    }
  }

  /**
   * Run the queue to exhaustion. Re-entrant-safe: a second call while the loop
   * runs is a no-op, because the loop always re-reads the head.
   *
   * @returns {Promise<void>}
   */
  async function drain() {
    if (draining || stopped) {
      return;
    }
    draining = true;
    halted = false;
    try {
      // A queue resumed after a restart can hold EXTERNAL rows, and those exist
      // only in the in-memory registry the ws overlay reads — empty until
      // something scans bd. Without this, a restored external head would be
      // refused as `not_in_pr_wait` and dropped, which is exactly the resume the
      // durable queue exists to guarantee (UI-5v7d §2 / UI-7agi 정합).
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
    } catch (err) {
      log('merge queue drain failed: %o', err);
    } finally {
      draining = false;
      active = null;
      notify();
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
          if (ws_key === workspace) {
            wake();
          }
        });
      }
      void drain();
    },

    /**
     * Stop the driver (shutdown / tests). A wait in flight resolves at once and
     * its item is left where it is — durably queued, resumed by the next start.
     */
    stop() {
      stopped = true;
      started = false;
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
      return drain();
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
