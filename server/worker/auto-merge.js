/**
 * The automatic merge-queue enroller (UI-yk55 §4).
 *
 * `[일괄 머지]` used to be a one-shot: it queued whatever was eligible AT THE
 * MOMENT OF THE CLICK, and every PR that turned green afterwards needed a human
 * watching the screen. This module turns that into a durable mode — while
 * `auto_merge` is on, every observation that changes the queue re-runs the same
 * eligibility judgment and keeps feeding the sequential driver.
 *
 * It rides `queue-changed` rather than a timer of its own: the PR poller already
 * emits that event on every observation pass, so the enroller reacts at the
 * exact moment the state it depends on changed, and an idle workspace runs
 * nothing.
 *
 * Two things it deliberately does NOT do:
 *
 * - It never calls `merge()`. The driver remains the single caller (UI-5v7d),
 *   so every safety property of the sequential queue — one at a time, re-gate at
 *   the turn, the 2-round resolution cap, the 30-minute waits — applies to an
 *   automatically enrolled item exactly as to a clicked one.
 * - It never widens eligibility. {@link mergeQueueCandidates} is the same
 *   judgment the click uses; the only thing this adds is the exclusion filter,
 *   which can only make the set SMALLER.
 *
 * @import { Queue } from './queue-store.js'
 */
import {
  mergeQueueCandidates,
  observedHeadSha,
  overlaidPrWait
} from './merge-candidates.js';

/**
 * Build a workspace's auto-merge enroller.
 *
 * @param {{
 *   workspace: string,
 *   store: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   verifyCmdState: () => 'resolved'|'absent'|'invalid',
 *   headSha?: (bead_id: string) => string|null,
 *   candidates?: (workspace: string, queue: Record<string, unknown>, verify_cmd_state: 'resolved'|'absent'|'invalid') => Array<{ bead_id: string, external: boolean }>,
 *   lane?: (workspace: string, queue: Record<string, unknown>) => Array<{ bead_id: string, external: boolean }>,
 *   notifyChanged?: (workspace: string) => void,
 *   kick?: () => unknown,
 *   subscribeQueueChanged?: (fn: (workspace: string) => void) => (() => void),
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createAutoMerge(deps) {
  const workspace = deps.workspace;
  const log = deps.log || (() => {});
  const headSha =
    deps.headSha ||
    ((/** @type {string} */ bead_id) => observedHeadSha(workspace, bead_id));
  const candidates = deps.candidates || mergeQueueCandidates;
  const lane = deps.lane || overlaidPrWait;

  let stopped = false;
  /** Guards §4.3's recursion: the enroll below emits the event it listens to. */
  let scanning = false;
  /** An event that arrived mid-scan asks for exactly one more pass. */
  let rescan = false;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  /**
   * Queue every eligible row that is not excluded, prune dead exclusions, fan
   * the result out, and wake the driver — the four steps a bare
   * `enqueueMerge()` does NOT do (UI-yk55 §4.2).
   *
   * `enqueueMerge` only persists. An enroller that called it alone would leave
   * items sitting in a durable queue nobody is draining, which reads as "the
   * automation is broken" and is the exact regression this shape exists to
   * prevent.
   *
   * @param {{ expected_revision?: number|null }} [input]
   * @returns {{ applied: boolean, conflict: boolean, queued: number, queue: Queue }}
   */
  function enroll(input = {}) {
    const snapshot = /** @type {any} */ (deps.store.snapshot(workspace));
    const rows = lane(workspace, snapshot);
    const overlaid = { ...snapshot, pr_wait: rows };
    /** @type {'resolved'|'absent'|'invalid'} */
    let verify_cmd_state = 'absent';
    try {
      verify_cmd_state = deps.verifyCmdState();
    } catch {
      // An unreadable resolution is not a broken declaration — it is no
      // declaration this pass could see, so the gate falls to its own tiers.
      verify_cmd_state = 'absent';
    }
    /** @type {Array<{ bead_id: string, external: boolean, head_sha: string }>} */
    const entries = [];
    for (const c of candidates(workspace, overlaid, verify_cmd_state)) {
      const head_sha = headSha(c.bead_id);
      if (!head_sha) {
        // Fail closed, the merge gate's own first rule: an unreadable head
        // cannot be compared against an exclusion, so the row waits for an
        // observation instead of being queued on a guess.
        continue;
      }
      entries.push({ ...c, head_sha });
    }
    const before = Array.isArray(snapshot.merge_queue)
      ? snapshot.merge_queue.length
      : 0;
    const result = deps.store.enqueueMergeAuto(workspace, {
      expected_revision:
        typeof input.expected_revision === 'number'
          ? input.expected_revision
          : null,
      entries,
      present_ids: rows.map((r) => r.bead_id)
    });
    const after =
      result.ok && Array.isArray(result.queue.merge_queue)
        ? result.queue.merge_queue.length
        : before;
    if (result.ok) {
      // Persist alone fans nothing out and wakes nobody — see the doc above.
      if (typeof deps.notifyChanged === 'function') {
        try {
          deps.notifyChanged(workspace);
        } catch {
          // A broken fanout must never break enrollment.
        }
      }
      if (typeof deps.kick === 'function') {
        try {
          Promise.resolve(deps.kick()).catch((err) => {
            log('auto-merge kick failed for %s: %o', workspace, err);
          });
        } catch (err) {
          log('auto-merge kick threw for %s: %o', workspace, err);
        }
      }
    }
    return {
      applied: result.ok,
      conflict: result.conflict,
      queued: Math.max(0, after - before),
      queue: result.queue
    };
  }

  /**
   * One coalesced automatic pass. A `queue-changed` that arrives while a scan
   * runs — including the one the scan itself emits — marks a single re-run
   * rather than nesting.
   */
  function scan() {
    if (scanning) {
      rescan = true;
      return;
    }
    scanning = true;
    try {
      do {
        rescan = false;
        /** @type {any} */
        const q = deps.store.snapshot(workspace);
        if (q.auto_merge !== true) {
          return;
        }
        const result = enroll();
        // Nothing enrolled and nothing pruned means no mutation and no emit, so
        // the loop that fed this one is over — that is what actually terminates
        // the recursion (§4.3).
        if (!result.applied) {
          return;
        }
      } while (rescan && !stopped);
    } catch (err) {
      // A broken enroller must leave the manual [머지] path alone.
      log('auto-merge scan failed for %s: %o', workspace, err);
    } finally {
      scanning = false;
    }
  }

  return {
    enroll,
    scan,

    start() {
      stopped = false;
      if (unsubscribe || typeof deps.subscribeQueueChanged !== 'function') {
        return;
      }
      unsubscribe = deps.subscribeQueueChanged((ws_key) => {
        if (ws_key !== workspace || stopped) {
          return;
        }
        scan();
      });
    },

    stop() {
      stopped = true;
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch {
          // ignore
        }
        unsubscribe = null;
      }
    }
  };
}
