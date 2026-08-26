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
 * Since UI-jaua §5.4 the same pass carries a SECOND, toggle-independent step:
 * a cross lane that the user started (`▶ 진행`) has to roll through merge, and
 * this module is already the code that observes PR-wait entry. It registers
 * those armed rows through `enqueueMergeManual` — item-level authority, which
 * the global `auto_merge` toggle has never owned (UI-58w8 §1) — rather than
 * growing a driver, an authority source, or a startup signal of its own. It
 * still never calls `merge()`, and it still widens no eligibility: the gate
 * re-judges every registered item at its turn exactly as before.
 *
 * @import { Queue } from './queue-store.js'
 */
import {
  completionIntentSeed,
  mergeQueueCandidates,
  observedBaseRef,
  observedHeadSha,
  overlaidPrWait
} from './merge-candidates.js';

/**
 * Build a workspace's auto-merge enroller.
 *
 * @param {{
 *   workspace: string,
 *   store: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   verifyState: () => { declaration_state: 'present'|'absent'|'invalid', base_sha: string|null },
 *   headSha?: (bead_id: string) => string|null,
 *   baseRef?: (bead_id: string) => string|null,
 *   candidates?: (workspace: string, queue: Record<string, unknown>, verify_policy: { declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }) => Array<{ bead_id: string, external: boolean, repairable?: boolean }>,
 *   lane?: (workspace: string, queue: Record<string, unknown>) => Array<{ bead_id: string, external: boolean }>,
 *   completionSeed?: (workspace: string, queue: Record<string, unknown>, bead_id: string) => { source_attempt_id: string, target_base: string, subject: any }|null,
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
  // The observed base of the SAME cache entry the head came from: an
  // automatic authority names one observation's head AND base (UI-58w8 §1).
  const baseRef =
    deps.baseRef ||
    ((/** @type {string} */ bead_id) => observedBaseRef(workspace, bead_id));
  const candidates = deps.candidates || mergeQueueCandidates;
  const lane = deps.lane || overlaidPrWait;
  const completionSeed = deps.completionSeed || completionIntentSeed;

  let stopped = false;
  /** Guards §4.3's recursion: the enroll below emits the event it listens to. */
  let scanning = false;
  /** An event that arrived mid-scan asks for exactly one more pass. */
  let rescan = false;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  /**
   * Fan the mutation out and wake the sequential driver — the two steps a bare
   * store write does NOT do. Both enrolment paths use it, so a lane's
   * registration reaches the driver by exactly the signal automatic enrolment
   * already uses (UI-jaua §5.4 step 4: no new startup signal).
   */
  function wake() {
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
    /** @type {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} */
    let verify_policy = { declaration_state: 'invalid', base_sha: null };
    try {
      verify_policy = deps.verifyState();
    } catch {
      verify_policy = { declaration_state: 'invalid', base_sha: null };
    }
    /** @type {Array<{ bead_id: string, external: boolean, head_sha: string, target_base?: string, completion?: { source_attempt_id: string, target_base: string, subject: any } }>} */
    const entries = [];
    for (const c of candidates(workspace, overlaid, verify_policy)) {
      const head_sha = headSha(c.bead_id);
      if (!head_sha) {
        // Fail closed, the merge gate's own first rule: an unreadable head
        // cannot be compared against an exclusion, so the row waits for an
        // observation instead of being queued on a guess.
        continue;
      }
      if (c.external !== true && snapshot.auto_merge === true) {
        const completion = completionSeed(workspace, snapshot, c.bead_id);
        if (!completion) {
          continue;
        }
        entries.push({ ...c, head_sha, completion });
        continue;
      }
      const target_base = baseRef(c.bead_id);
      entries.push({
        ...c,
        head_sha,
        ...(target_base === null ? {} : { target_base })
      });
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
      wake();
    }
    return {
      applied: result.ok,
      conflict: result.conflict,
      queued: Math.max(0, after - before),
      queue: result.queue
    };
  }

  /**
   * Register the armed cross-lane members that have reached PR wait
   * (UI-jaua §5.4). Runs on every pass REGARDLESS of `auto_merge`, because the
   * authority it grants is item-level and the global toggle owns automatic
   * enrolment only (UI-58w8 §1) — the same asymmetry the merge queue already
   * relies on.
   *
   * The lane overlay is deliberately not used here. `overlaidPrWait` projects
   * rows down to `{ bead_id, external }` and mixes in registry rows that have
   * no durable entry at all; the arm lives on the DURABLE `pr_wait` row, which
   * is also the only kind of row a lane can ever have armed.
   *
   * @returns {{ applied: boolean, conflict: boolean, queued: number, queue: Queue }}
   */
  function enrollArmed() {
    const snapshot = /** @type {any} */ (deps.store.snapshot(workspace));
    const pr_wait = Array.isArray(snapshot.pr_wait) ? snapshot.pr_wait : [];
    const merge_queue = Array.isArray(snapshot.merge_queue)
      ? snapshot.merge_queue
      : [];
    // Already carrying manual authority means the lane's ask is answered —
    // by an earlier pass, by the user's own click, or by a promotion. An
    // automatic or authority-less entry is still a candidate: registering it
    // is what makes it survive `auto_merge` being switched off mid-lane.
    /** @type {Set<string>} */
    const held = new Set();
    for (const entry of merge_queue) {
      if (entry?.authority?.source === 'manual') {
        held.add(entry.bead_id);
      }
    }
    /** @type {Array<{ bead_id: string, external: boolean, head_sha: string, target_base: string|null, via: 'lane' }>} */
    const entries = [];
    for (const row of pr_wait) {
      const bead_id = row?.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      const armed_by_lane = row.armed_by_lane;
      if (typeof armed_by_lane !== 'string' || armed_by_lane.length === 0) {
        continue;
      }
      if (held.has(bead_id)) {
        continue;
      }
      const head_sha = headSha(bead_id);
      if (!head_sha) {
        // The module's first rule (see `enroll`): an authority granted on an
        // unread head is a merge on stale evidence. The row keeps its arm and
        // the next observation tries again.
        continue;
      }
      entries.push({
        bead_id,
        external: row.external === true,
        head_sha,
        target_base: baseRef(bead_id),
        via: 'lane'
      });
    }
    if (entries.length === 0) {
      return {
        applied: false,
        conflict: false,
        queued: 0,
        queue: /** @type {Queue} */ (snapshot)
      };
    }
    const before = merge_queue.length;
    // An unreadable base is refused by the store's own rule, which is the same
    // rule the click path relies on — no second copy of it lives here.
    const result = deps.store.enqueueMergeManual(workspace, {
      expected_revision: snapshot.revision,
      entries
    });
    const after =
      result.ok && Array.isArray(result.queue.merge_queue)
        ? result.queue.merge_queue.length
        : before;
    if (result.ok) {
      wake();
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
        // BEFORE the toggle test (UI-jaua §5.4): a started cross lane must
        // reach merge in a repo whose `auto_merge` is off, which is the whole
        // point of registering it as item-level authority.
        const armed = enrollArmed();
        if (q.auto_merge !== true) {
          if (!armed.applied) {
            return;
          }
          // A registration emitted the event this scan listens to; let the
          // coalescing loop absorb it. The next pass finds the row already
          // held by manual authority and applies nothing, which terminates.
          continue;
        }
        const result = enroll();
        // Nothing enrolled and nothing pruned means no mutation and no emit, so
        // the loop that fed this one is over — that is what actually terminates
        // the recursion (§4.3).
        if (!result.applied && !armed.applied) {
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
    enrollArmed,
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
