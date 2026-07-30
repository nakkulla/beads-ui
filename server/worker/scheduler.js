/**
 * Worker scheduler — the auto-advance state machine (spec §5.1–§5.3).
 *
 * Drives the queue: when `auto_advance` is on, ONE scan walks the single
 * waiting lane in order and fills the free slots (`queue.slots`, the store-owned
 * concurrency cap — worker-phase2 §3). A blocked / inadmissible entry is skipped
 * to the next runnable one, never starving the rest. `slots = 1` IS the retired
 * serial lane. ⏸ (auto_advance off) lets running sessions finish but starts no
 * new ones.
 *
 * Dispatch is fail-closed and contract-native:
 *   - RE-READ ready/blocked/deps/exec-settings from bd just before dispatch and
 *     snapshot them into the attempt (base/head OID, started_at, pid, runner,
 *     model, effort — spec §5.1/§5.2).
 *   - Record + readback `workflow_mode=fast_track` on the bead, snapshotting the
 *     PRIOR value into the attempt. On any termination WITHOUT a bead close
 *     (fail/stop/reconcile) the prior value is reverted (unset when originally
 *     absent) so a stray fast_track never switches a later manual session to
 *     unattended (spec §5.2), and a bead left `in_progress` is reopened so the
 *     claim the session never gave back cannot hide it from `bd ready`.
 *   - On success, INDEPENDENT verification (a SERVER-observed open PR for the
 *     attempt's branch, worker-phase2 §1) gates the move to the PR-wait lane;
 *     any failure turns `auto_advance` OFF and leaves the failure banner to
 *     render off the terminal attempt record (worker-phase2 §2 — the circuit
 *     breaker that used to do this is gone with the merge axis).
 *
 * {@link createScheduler}'s `reconcile` is the second observation path
 * (worker-detached-session-reconcile §1). Sessions are spawned detached so they
 * survive a server restart, which means `onSessionDone` — a child-process handle
 * this process holds — can never observe the end of a session it did not spawn.
 * `reconcile` judges those persisted `running` attempts by PID + process start
 * time and disposes the dead ones through the SAME verify/branch logic
 * `onSessionDone` uses, so a restart-surviving session that already pushed its
 * PR still reaches `pr_wait`.
 *
 * Fully injectable (fake clock / runner / bd / worktree / verify / PID probe) so
 * no real subprocess is spawned in tests.
 *
 * @import { RunnerHandle, RunnerVerdict } from './runner/session.js'
 */
import { debug } from '../logging.js';
import { resolveExecSettings } from './policy.js';
import { DEFAULT_SLOTS, MIN_SLOTS } from './queue-store.js';
import { defaultTaskPrompt } from './runner/preamble.js';

const log = debug('worker:scheduler');

/**
 * How far a probed process start time may differ from the attempt's recorded
 * `started_at` before the PID counts as RECYCLED (a different process wearing
 * the same number). `ps -o lstart=` resolves to whole seconds, so the tolerance
 * has to absorb that coarseness.
 *
 * Exported because the detached session monitor re-verifies the same way before
 * every signal (UI-o2yt §3.3) — two tolerances would be two contracts.
 *
 * @type {number}
 */
export const PID_START_TOLERANCE_MS = 2000;

/**
 * Upper bound on the matched command persisted with a blocker failure. The
 * record exists to name what tripped the guard, not to archive a script.
 *
 * @type {number}
 */
const CAUSE_DETAIL_COMMAND_MAX = 512;

/**
 * Attempt statuses that mean the attempt is over. The lifecycle vocabulary is
 * `running`/`done`/`failed`/`orphaned`/`paused`/`stopped` (queue-store's
 * `Attempt.status`); `orphaned` belongs here with `failed` — the record is
 * resumable by a human click, but nothing is running. `paused` is the one
 * non-terminal status that can still be history-only, so it is judged by leaf
 * (see `sweepClosedQueue`) rather than by this set. Anything OUTSIDE the set
 * (including a missing status) reads as still-active wherever the safe default
 * is to leave a bead alone.
 *
 * @type {Set<string>}
 */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped'
]);

/**
 * Project a session's `blocked_detail` onto the attempt's durable
 * `cause_detail` (UI-2o4z §2). Undefined when the session left nothing to
 * record, so the patch keeps the field null instead of inventing one.
 *
 * @param {{ reason: string, command: string|null }|null|undefined} detail
 * @returns {{ reason: string, command: string|null }|undefined}
 */
function blockerCauseDetail(detail) {
  if (!detail || typeof detail.reason !== 'string') {
    return undefined;
  }
  const command =
    typeof detail.command === 'string'
      ? detail.command.slice(0, CAUSE_DETAIL_COMMAND_MAX)
      : null;
  return { reason: detail.reason, command };
}

/**
 * The first-dispatch prompt for a bead admitted with a STALE spec_review
 * receipt (UI-dlim §3.2): the default task prompt plus the observed facts the
 * session cannot see from inside its worktree — the receipt it currently pins,
 * the base the staleness was computed against, and the spec commits that landed
 * after the receipt.
 *
 * The lane's PROCEDURE is deliberately not restated here: it belongs to the
 * workflow contract (dotfiles `docs/contracts/workflow.md`), and beads-ui is
 * that contract's consumer, not its author. The prompt therefore delivers the
 * trigger plus observations and points at the contract for the rest.
 *
 * @param {string} bead_id
 * @param {{ receipt: string, base: string, delta_shas: string[] }} stale
 * @returns {string}
 */
function staleDispatchPrompt(bead_id, stale) {
  return [
    defaultTaskPrompt(bead_id),
    `stale spec_review 관측 — 이 비드의 spec_review 영수증 \`${stale.receipt}\` 이후 base \`${stale.base}\`에서 스펙 파일이 변경되었다.`,
    `delta 커밋: ${stale.delta_shas.join(', ')}`,
    '구현에 들어가기 전에 workflow 계약의 워커 재리뷰 레인(stale receipt 갱신)을 먼저 수행하라.'
  ].join('\n\n');
}

/**
 * @typedef {Object} BeadSnapshot
 * @property {boolean} ready - Runnable now.
 * @property {boolean} blocked - Blocked by unmet dependencies.
 * @property {string} repo - Target repo root.
 * @property {string} target_base - Merge target base (branch name). Empty when
 * the repo's declaration could not be resolved — `base_unresolved` says why.
 * @property {string|null} [base_oid] - The FETCHED remote tip of `target_base`
 * (worker-base-scope-alignment §1). What the worktree is cut from and what
 * admission is pinned to; a bare branch name would cut from a possibly-stale
 * local ref.
 * @property {string|null} [base_unresolved] - `base_unresolved:<step>` when the
 * repo's base declaration failed to resolve, else null. Present-and-set means
 * NOTHING may dispatch: there is no base to cut from, admit against, or compare
 * a PR to.
 * @property {string} [model] - orchestration_model.
 * @property {string} [effort] - orchestration_effort.
 * @property {string} [review_model] - review_model (per-bead exec setting).
 * @property {string} [impl_model] - impl_model (per-bead exec setting).
 * @property {string|null} [workflow_mode] - Current workflow_mode metadata.
 * @property {string|null} [route] - Workflow route (e.g. full_plan).
 * @property {string} [status] - Issue status (open/in_progress/resolved/closed).
 * @property {string|null} [title] - Issue title, for the start notification.
 * @property {string|null} [spec_id] - Spec doc path metadata (admission input).
 * @property {unknown} [spec_review] - Raw spec_review metadata value. Key
 * absence ⇒ `undefined`; any present value must reach the admission
 * validator so a malformed receipt rejects instead of reading as absent.
 * @property {string[]} [deps] - Dependency ids.
 */

/**
 * @typedef {Object} SchedulerDeps
 * @property {any} store - Queue store (queue-store.js).
 * @property {(runner_name: string) => { name: string, spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }} makeRunner
 * @property {{
 *   snapshotBead: (bead_id: string) => Promise<BeadSnapshot>,
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *   setStatus: (bead_id: string, status: string) => Promise<void>,
 *   readStatus: (bead_id: string) => Promise<string|null>
 * }} bd
 * @property {{ add: (i: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>, remove: (i: { repo: string, bead_id: string }) => Promise<any>, removeIfDiscardable?: (i: { repo: string, bead_id: string, base: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>, addDetached?: (i: { repo: string, name: string, sha: string }) => Promise<{ path: string }>, removeDetached?: (i: { repo: string, name: string }) => Promise<any>, pathFor?: (repo: string, bead_id: string) => string, exists?: (repo: string, bead_id: string) => boolean }} worktree
 * @property {{ verifyPrSubmitted: (i: { repo: string, bead_id: string }) => Promise<{ ok: boolean, reason: string, pr_url?: string|null, already_finished?: boolean }> }} verify
 * Server-observation completion verdict (worker-phase2 §1): an open PR for the
 * attempt's branch, plus the worker's `pr_url`/`resolved` back-fill.
 * @property {(options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>} [resolveBase]
 * The repo's base declaration resolver (worker-base-scope-alignment §1). Called
 * with `{ force: true }` at dispatch, immediately before the worktree cut, so
 * the cut and the attempt's recorded `target_base` come from a base read at
 * dispatch time rather than one captured earlier. Absent wiring falls back to
 * the snapshot's own resolution.
 * @property {{ validate: (snap: BeadSnapshot, base?: string) => Promise<{ ok: boolean, reason?: string, stale?: { receipt_sha: string, delta_shas: string[] } }> }} [admission]
 * Auto-run admission validator (worker-autorun-policy §1). When present, the
 * tick candidate scan AND the dispatch re-check (against the pinned worktree
 * base_oid) both gate on it; refusals are recorded in `Queue.admission`. An
 * ADMITTED result may still carry `stale` (UI-dlim §3.1) — a non-blocking
 * observation that the spec moved after the receipt, which flags the badge and
 * the attempt and is injected into the session prompt.
 * @property {{ complete: (input: { workspace: string, attempt_id: string, bead_id: string, kind: string, prior_receipt?: string|null, target_base?: string|null }) => Promise<{ ok: boolean, reason?: string }>, release?: (bead_id: string) => void }} [disposition]
 * Completion verdict for a DISPOSITION attempt (UI-hs11 §3.3). A disposition
 * session opens no PR, so the PR-existence check every implementation attempt
 * ends with would fail it as `no_pr`; this dep judges the disposition's own
 * durable result instead. Absent wiring simply means no disposition can be
 * dispatched (the entry point refuses).
 * @property {{ get: (workspace: string, bead_id: string) => import('./external-pr.js').ExternalPrRow|null }} [externalPrs]
 * The EXTERNAL PR registry (UI-7agi §1), read by {@link createScheduler}'s
 * `dispatchExternalConflict` to confirm the bead really is an external row
 * before launching a resolution session for it. Optional and FAIL-CLOSED: an
 * attachment built without it (every hermetic test) refuses the dispatch as
 * `not_external` rather than launching against an unverified bead.
 * @property {{ attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void, pathFor?: (workspace: string, attempt_id: string) => string, stderrPathFor?: (workspace: string, attempt_id: string) => string }} sessionLog
 * The session-log broker. `pathFor`/`stderrPathFor` are what the spawn hands the
 * runner as its stdout/stderr files (UI-o2yt §3.1); a fake without them simply
 * leaves the engine on its stdout-pipe fallback, which is what fixture-driven
 * tests want.
 * @property {{ stop: (workspace: string, attempt_id: string) => boolean }} [sessionMonitors]
 * Detached-session monitors (UI-o2yt §3.3). Present in the live wiring only: a
 * dead attempt's monitor is stopped — draining its log to EOF — before the
 * disposition reads the guard evidence and lifts the terminal usage tally.
 * @property {ReturnType<typeof import('./usage-store.js').createUsageStore>} [usage]
 * Live token-usage tally for running attempts (UI-raqh §1). Absent wiring
 * (older tests) simply means no usage is tallied or persisted.
 * @property {(workspace: string) => void} [notifyQueueChanged]
 * Fired after autonomous queue transitions (dispatch records, admission
 * refusals, session done/fail) so ws subscribers get a fresh snapshot without
 * waiting for their next own mutation (worker-autorun-policy §6).
 * @property {{
 *   attemptStarted: (i: any) => void,
 *   attemptFailed: (i: any) => void,
 *   prWaitEntered: (i: any) => void
 * }} [notify]
 * Outward attempt-lifecycle push (UI-2yoq, notify.js). Optional: absent wiring
 * (every dispatch-only test) simply pushes nothing, exactly like a machine that
 * left `[worker.notify]` off.
 * @property {(pid: number|null) => { alive: boolean, started_at: number|null }} [probePid]
 * Liveness + start-time probe for {@link createScheduler}'s `reconcile`. Absent
 * (legacy wiring / dispatch-only tests) makes every reconcile pass a no-op:
 * without a probe there is no evidence a detached session died.
 * @property {() => number} [now]
 * @property {(bead_id: string) => string} [makeAttemptId]
 */

/**
 * Build the auto-advance state machine over the queue store.
 *
 * @param {SchedulerDeps} deps
 * @returns {{
 *   tick: (workspace: string) => Promise<void>,
 *   stop: (workspace: string, attempt_id: string) => Promise<boolean>,
 *   pause: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string }>,
 *   resume: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>,
 *   resolveConflict: (workspace: string, bead_id: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>,
 *   dispatchExternalConflict: (workspace: string, bead_id: string, target_base?: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>,
 *   dispatchReviseFix: (workspace: string, input: { bead_id: string, attempt_id: string, prompt: string }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>,
 *   reconcile: (workspace: string) => Promise<void>,
 *   sweepClosedQueue: (workspace: string, statuses: Record<string, string>) => void,
 *   activeBeadIds: (workspace: string) => Set<string>,
 *   externalProtectedBeadIds: (workspace: string) => Set<string>,
 *   runningCount: () => number,
 *   runningBeads: () => string[],
 *   isRunning: (bead_id: string) => boolean
 * }}
 */
export function createScheduler(deps) {
  const now = deps.now || (() => Date.now());
  let attempt_seq = 0;
  const makeAttemptId =
    deps.makeAttemptId || ((bead_id) => `${bead_id}-${now()}-${++attempt_seq}`);

  /**
   * Live sessions keyed by attempt_id.
   *
   * @type {Map<string, { bead_id: string, repo: string, handle: RunnerHandle, prior: string|null }>}
   */
  const running = new Map();
  /** Beads currently claimed (dispatching or running) — prevents double launch. @type {Set<string>} */
  const claimed = new Set();
  /**
   * Attempts whose `onSessionDone` is in flight. That handler drops the
   * `running` + `claimed` fences at entry and only THEN awaits the verify, so
   * in between the attempt is still durably `running` with nothing else marking
   * it as this process's work — a reconcile pass landing there would dispose an
   * attempt that is already being disposed.
   *
   * @type {Set<string>}
   */
  const settling = new Set();
  /**
   * Attempts terminated by an explicit stop (■). Their `done` promise still
   * resolves later; `onSessionDone` must NOT re-run the failure path for them
   * (no auto_advance halt, no double revert) — the stop already finalized them.
   *
   * @type {Set<string>}
   */
  const stopped = new Set();
  /**
   * Beads refused by the dispatch-time admission RE-check within the current
   * tick cascade. The refill pass skips them so a scan-pass/dispatch-fail
   * disagreement (moving base) can never livelock dispatch↔tick; the set is
   * cleared at every externally-initiated tick, so the next real tick retries.
   *
   * @type {Set<string>}
   */
  const dispatch_refused = new Set();
  /**
   * Beads whose ■ stop cleanup has not finished yet. A live stop's residue
   * check waits for the killed process to actually exit, and re-dispatching in
   * that window would run against a worktree that is still being torn down.
   *
   * @type {Set<string>}
   */
  const cleanup_pending = new Set();
  /**
   * `handle.done` of each PAUSED attempt, keyed by attempt_id. `pause()` sends
   * SIGTERM without waiting for the exit, so a ■ that follows it immediately
   * still faces a dying process — and a residue check racing that process could
   * discard work it writes after the check. Holding the promise here lets the
   * paused-discard path wait exactly like the live one. Entries are dropped when
   * the promise settles, when a discard consumes it, and when a relaunch spends
   * the ancestor, so nothing accumulates.
   *
   * @type {Map<string, Promise<RunnerVerdict>>}
   */
  const paused_done = new Map();
  /**
   * Workspaces with a reconcile pass in flight. A pass can spend seconds inside
   * `gh`, so the periodic timer would otherwise stack overlapping passes that
   * each see the same still-`running` attempt and dispose it twice.
   *
   * @type {Set<string>}
   */
  const reconciling = new Set();

  /**
   * Notify ws subscribers of an autonomous queue transition (best-effort).
   *
   * @param {string} workspace
   */
  function notifyChanged(workspace) {
    if (typeof deps.notifyQueueChanged === 'function') {
      try {
        deps.notifyQueueChanged(workspace);
      } catch {
        // A broken fanout must never break the scheduler.
      }
    }
  }

  /**
   * Fire one outward lifecycle push (UI-2yoq). The notifier is no-throw by
   * contract; this guard exists so a broken injected fake still cannot turn a
   * notification into a queue-transition failure.
   *
   * @param {'attemptStarted'|'attemptFailed'|'prWaitEntered'} event
   * @param {any} input
   */
  function notifyLifecycle(event, input) {
    if (!deps.notify) {
      return;
    }
    try {
      deps.notify[event](input);
    } catch (err) {
      log('worker notify %s failed: %o', event, err);
    }
  }

  /**
   * How long a usage-only change waits before it reaches subscribers
   * (UI-raqh §1). A streaming session emits usage many times a second, and none
   * of those ticks is a queue transition — so they are merged on a trailing
   * edge instead of fanning out a full snapshot per event. Queue changes keep
   * their immediate fanout.
   *
   * @type {number}
   */
  const USAGE_FANOUT_THROTTLE_MS = 3000;
  /**
   * Pending usage-only fanouts, one per workspace.
   *
   * @type {Map<string, ReturnType<typeof setTimeout>>}
   */
  const usage_fanout_timers = new Map();

  /**
   * Merge a usage-only change into the workspace's pending fanout. The FIRST
   * change arms the timer and later ones ride it, so a burst costs exactly one
   * snapshot per interval.
   *
   * @param {string} workspace
   */
  function scheduleUsageFanout(workspace) {
    if (usage_fanout_timers.has(workspace)) {
      return;
    }
    const timer = setTimeout(() => {
      usage_fanout_timers.delete(workspace);
      notifyChanged(workspace);
    }, USAGE_FANOUT_THROTTLE_MS);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    usage_fanout_timers.set(workspace, timer);
  }

  /**
   * Drop a pending usage fanout — called at attempt termination, where the
   * terminal `notifyChanged` publishes the final value anyway and a timer left
   * armed would just re-send it.
   *
   * @param {string} workspace
   */
  function clearUsageFanout(workspace) {
    const timer = usage_fanout_timers.get(workspace);
    if (timer) {
      clearTimeout(timer);
      usage_fanout_timers.delete(workspace);
    }
  }

  /**
   * The repo an attempt was dispatched against, read off its durable record.
   * `failAttempt` is reached from paths that do not all carry the repo in
   * scope, and the record has held it since the pre-spawn write.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string|null}
   */
  function repoOfAttempt(workspace, attempt_id) {
    try {
      const q = deps.store.snapshot(workspace);
      const attempt = q && q.attempts ? q.attempts[attempt_id] : null;
      return attempt && typeof attempt.repo === 'string' ? attempt.repo : null;
    } catch {
      return null;
    }
  }

  /**
   * The terminal usage patch for an attempt: the live tally, lifted out of the
   * store so the record carries it after the process is gone. Returns an empty
   * patch when nothing was tallied, which keeps `usage: null` on an attempt
   * whose runner reported none.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {{ usage?: any }}
   */
  function usagePatch(workspace, attempt_id) {
    if (!deps.usage) {
      return {};
    }
    const usage = deps.usage.get(workspace, attempt_id);
    deps.usage.clearAttempt(workspace, attempt_id);
    // The timer is per WORKSPACE, so it belongs to every live session in it:
    // reclaiming it while another attempt is still streaming would drop that
    // attempt's pending update. Only the last session out turns it off.
    if (running.size === 0) {
      clearUsageFanout(workspace);
    }
    return usage ? { usage } : {};
  }

  /**
   * Record why a bead was skipped and fan out ONLY when the store applied the
   * record. The store no-ops an unchanged reason, so a bead parked at the same
   * reason cannot bump the revision on every tick.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} reason
   */
  function recordSkipReason(workspace, bead_id, reason) {
    const result = deps.store.recordAdmission(workspace, { bead_id, reason });
    if (result && result.ok) {
      notifyChanged(workspace);
    }
  }

  /**
   * Record the NON-blocking stale-receipt observation of an ADMITTED bead
   * (UI-dlim §3.4). It rides the same record the refusals use so both render
   * through one badge path, but carries `stale:true` so the UI never shows it
   * as a refusal. The record is cleared by the dispatch that follows, exactly
   * like a refusal cleared by a successful launch.
   *
   * @param {string} workspace
   * @param {string} bead_id
   */
  function recordStale(workspace, bead_id) {
    const result = deps.store.recordAdmission(workspace, {
      bead_id,
      reason: 'spec_review_stale',
      stale: true
    });
    if (result && result.ok) {
      notifyChanged(workspace);
    }
  }

  /**
   * The skip reason for a bead bd did not hand back as runnable. `blocked` is
   * deliberately NOT the reason: `snapshotBead` derives it from mere absence
   * from `bd ready`, so it reads as a dependency block even when the real cause
   * is a session's leftover `in_progress` claim. The status IS the diagnosis.
   *
   * @param {BeadSnapshot} snap
   * @returns {string}
   */
  function notReadyReason(snap) {
    const status =
      typeof snap.status === 'string' && snap.status.length > 0
        ? snap.status
        : 'unknown';
    return `not_ready:${status}`;
  }

  /**
   * Refuse a dispatch that already took the claim: record the reason as a badge,
   * give the claim back, fence the bead for the rest of THIS tick cascade, and
   * re-enter the pass so the slot it was holding still goes to another bead.
   * The fence is what keeps the re-entry from retrying the same bead forever.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} reason
   */
  async function refuseDispatch(workspace, bead_id, reason) {
    recordSkipReason(workspace, bead_id, reason);
    claimed.delete(bead_id);
    dispatch_refused.add(bead_id);
    await tickPass(workspace);
  }

  /**
   * Dispose of a bead whose bd status is terminal instead of badging it. A bead
   * closed outside the worker (a manual PR merge) can never become
   * dispatchable, so the badge would repeat on every tick forever. Only `closed`
   * qualifies — `resolved`/`in_progress` are states work can still move out of,
   * and their badge is the information.
   *
   * A queue-lane member goes to DONE, not out of the lanes (UI-m6bg §결함 1):
   * the candidate lane is synthesized as `ready − (queue ∪ pr_wait ∪ done)`, so
   * a dropped `closed` bead — never `ready` — simply vanished from the screen
   * instead of reading as finished work. A member of any other lane (`pr_wait`)
   * keeps the old drop disposition; that is out of this spec's scope.
   *
   * `moveToDone` does NOT clear the `admission` record `dropFromQueue` deleted.
   * The spec accepts the residue: a bead sent to done has its admission
   * re-evaluated on the next queue placement.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {BeadSnapshot} snap
   * @returns {boolean} True when the bead is terminal (caller skips the badge).
   */
  function dequeueIfClosed(workspace, bead_id, snap) {
    if (snap.status !== 'closed') {
      return false;
    }
    const in_queue = deps.store
      .snapshot(workspace)
      .queue.some(
        (/** @type {{ bead_id: string }} */ e) => e.bead_id === bead_id
      );
    const result = in_queue
      ? deps.store.moveToDone(workspace, { bead_id })
      : deps.store.dropFromQueue(workspace, { bead_id });
    if (result && result.ok) {
      notifyChanged(workspace);
    }
    return true;
  }

  /**
   * The SCHEDULER-owned "this workspace is working on it" union, over a queue
   * snapshot the caller already holds. Deliberately wider than the client's
   * `active_bead_ids`: that one omits the pre-attempt dispatch claim, so a bead
   * already picked for launch would read as idle.
   *
   * Members:
   *   - `claimed` — the dispatch claim, taken BEFORE any attempt record exists.
   *   - `dispatch_refused` — refused within the current tick cascade, retried
   *     on the next externally-initiated tick.
   *   - leaf `paused` attempts ({@link leafPausedBeads}) — a resumed ancestor is
   *     history, not a live pause, and counting it would fence its bead out
   *     forever.
   *   - any non-terminal attempt.
   *
   * @param {{ attempts?: Record<string, any> }} q - Queue snapshot.
   * @returns {Set<string>}
   */
  function activeBeadIdsFrom(q) {
    /** @type {Set<string>} */
    const out = new Set(claimed);
    for (const bead_id of dispatch_refused) {
      out.add(bead_id);
    }
    for (const bead_id of leafPausedBeads(q)) {
      out.add(bead_id);
    }
    const attempts = Object.values(q.attempts || {});
    const resumed_from = new Set(
      attempts
        .map((a) => a && /** @type {any} */ (a).resumed_from)
        .filter(Boolean)
    );
    for (const attempt of attempts) {
      const a = /** @type {any} */ (attempt);
      if (!a || typeof a.bead_id !== 'string') {
        continue;
      }
      if (TERMINAL_ATTEMPT_STATUSES.has(a.status)) {
        continue;
      }
      if (a.status === 'paused' && resumed_from.has(a.attempt_id)) {
        continue;
      }
      out.add(a.bead_id);
    }
    return out;
  }

  /**
   * The active union over a FRESH snapshot ({@link activeBeadIdsFrom}) — the
   * public spelling for callers outside the scheduler.
   *
   * @param {string} workspace
   * @returns {Set<string>}
   */
  function activeBeadIds(workspace) {
    return activeBeadIdsFrom(deps.store.snapshot(workspace));
  }

  /**
   * Beads the EXTERNAL PR registry must not adopt (UI-b8n8 §접근 A). A strict
   * SUPERSET of {@link activeBeadIds}:
   *
   *   externalProtectedBeadIds = activeBeadIds ∪ cleanup_pending
   *
   * `cleanup_pending` is load-bearing, not defensive. {@link stop} marks the
   * attempt `stopped` (terminal) and releases the claim BEFORE the killed
   * process is gone, hanging the residue check on the process's own `done`
   * promise — so in that window `activeBeadIds` is already empty for the bead
   * while its worktree is still live. A bead sitting at `resolved` + `pr_url`
   * would be registered as external there, become an auto-merge candidate, and
   * have the post-merge `branch_cleanup` delete the worktree of a process that
   * has not finished dying. The fence is the only thing covering that window.
   *
   * {@link sweepClosedQueue} deliberately does NOT use this set: adding
   * `cleanup_pending` there would only delay a terminating bead's move to
   * `done`, buying nothing.
   *
   * @param {string} workspace
   * @returns {Set<string>}
   */
  function externalProtectedBeadIds(workspace) {
    const out = activeBeadIds(workspace);
    for (const bead_id of cleanup_pending) {
      out.add(bead_id);
    }
    return out;
  }

  /**
   * Move every queue-lane bead bd has already closed into the Done lane
   * (UI-m6bg §확정 트리거). {@link dequeueIfClosed} only ever runs inside a
   * scheduler tick, and a tick returns immediately when `auto_advance` is off —
   * which is exactly the workspace where a bead finished in a normal session
   * sits in the waiting lane forever. This sweep is the `auto_advance`-
   * independent trigger for the same disposition.
   *
   * `statuses` is the CALLER's authoritative read (the poller's `bd list` pass
   * hands its own response in), so this sweep spawns no `bd` process of its own
   * and never substitutes a cached or guessed status: a bead absent from the map
   * is skipped silently, and the next pass judges it again.
   *
   * SYNCHRONOUS on purpose — there is no `await` anywhere in the body. That is
   * what makes the window between the active judgment and the mutation empty, so
   * a dispatch cannot interleave between them; the spec's "변이 직전에 활성
   * 여부를 재확인한다" is satisfied structurally instead of by a redundant second
   * read.
   *
   * @param {string} workspace
   * @param {Record<string, string>} statuses - Bead id → bd status, from THIS pass.
   */
  function sweepClosedQueue(workspace, statuses) {
    if (!statuses || typeof statuses !== 'object') {
      return;
    }
    const q = deps.store.snapshot(workspace);
    // The same union {@link externalProtectedBeadIds} builds on, WITHOUT the
    // `cleanup_pending` fence — see that function for why the two differ.
    const active = activeBeadIdsFrom(q);
    let moved = false;
    try {
      for (const entry of q.queue) {
        const bead_id = entry && entry.bead_id;
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          continue;
        }
        // `resolved` is deliberately NOT swept: PR Delivery is done but the
        // merge is not, and the external overlay is drawing that bead in the
        // PR-wait lane. Same judgment {@link dequeueIfClosed} makes.
        if (statuses[bead_id] !== 'closed') {
          continue;
        }
        if (active.has(bead_id)) {
          continue;
        }
        const result = deps.store.moveToDone(workspace, { bead_id });
        if (result && result.ok) {
          moved = true;
        }
      }
    } finally {
      // A persist that throws mid-sweep leaves the EARLIER moves durable. The
      // caller swallows the error, so without the finally those rows would sit
      // in `done` on disk while every subscriber still renders them as waiting.
      if (moved) {
        notifyChanged(workspace);
      }
    }
  }

  /**
   * Best-effort residue cleanup after a discard (■): the SAME fail-closed
   * primitive the dispatch pre-flight uses, so a worktree still carrying
   * unfinished work survives the discard instead of being force-removed.
   * A refusal or a git error is logged only — the halt already happened, and
   * the pre-flight is the next line of defence.
   *
   * @param {string} repo
   * @param {string} bead_id
   * @param {string} base
   */
  async function cleanupStopResidue(repo, bead_id, base) {
    if (
      typeof deps.worktree.removeIfDiscardable !== 'function' ||
      typeof repo !== 'string' ||
      repo.length === 0
    ) {
      return;
    }
    try {
      const result = await deps.worktree.removeIfDiscardable({
        repo,
        bead_id,
        base
      });
      if (!result.ok) {
        log('stop residue preserved for %s: %s', bead_id, result.reason);
      }
    } catch (err) {
      log('stop residue cleanup failed for %s: %o', bead_id, err);
    }
  }

  /**
   * The merge target an attempt was pinned to — the base every residue
   * observation compares against. Falls back to `main` for a record written
   * before the field existed.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string}
   */
  function attemptBase(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts[attempt_id];
    return a && typeof a.target_base === 'string' && a.target_base.length > 0
      ? a.target_base
      : 'main';
  }

  /**
   * Tail of a LIVE stop: the process has now exited, so the residue can be
   * judged safely. The fence is lifted whatever the verdict, and the queue is
   * ticked so the slot the stop freed keeps advancing.
   *
   * @param {string} workspace
   * @param {string} repo
   * @param {string} bead_id
   * @param {string} base
   */
  async function finishStopCleanup(workspace, repo, bead_id, base) {
    try {
      await cleanupStopResidue(repo, bead_id, base);
    } finally {
      cleanup_pending.delete(bead_id);
    }
    notifyChanged(workspace);
    // Detached from stop()'s caller, so nothing here may reject unhandled.
    try {
      await tick(workspace);
    } catch (err) {
      log('stop cleanup tick failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Run the admission validator fail-closed: absent dep passes (legacy wiring),
   * a validator throw is a git_error refusal, never an escape out of tick.
   *
   * @param {BeadSnapshot} snap
   * @param {string} [base]
   * @returns {Promise<{ ok: boolean, reason?: string, stale?: { receipt_sha: string, delta_shas: string[] } }>}
   */
  async function checkAdmission(snap, base) {
    if (!deps.admission) {
      return { ok: true };
    }
    try {
      return await deps.admission.validate(snap, base);
    } catch {
      return { ok: false, reason: 'git_error' };
    }
  }

  /**
   * The workspace's concurrency cap, read from the STORE (`queue.slots`) on
   * every pass so a UI edit takes effect on the next tick. A snapshot without a
   * usable value (a hand-built fake store) falls back to the same default
   * `normalizeQueue` applies, so the cap is never 0/NaN.
   *
   * @param {{ slots?: unknown }} q - Queue snapshot.
   * @returns {number}
   */
  function slotsOf(q) {
    const raw = q.slots;
    return typeof raw === 'number' && Number.isInteger(raw) && raw >= MIN_SLOTS
      ? raw
      : DEFAULT_SLOTS;
  }

  /**
   * Revert workflow_mode to the pre-launch value (unset when originally absent).
   *
   * @param {string} bead_id
   * @param {string|null} prior
   */
  async function revertWorkflowMode(bead_id, prior) {
    if (prior == null) {
      await deps.bd.unsetMetadata(bead_id, 'workflow_mode');
    } else {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', prior);
    }
  }

  /**
   * Unset the exec-setting metadata keys stamped onto a bead at dispatch
   * (worker-global-exec-defaults §3). Best-effort per key — a bd failure is
   * logged, never thrown — so it mirrors the workflow_mode revert's fail-open
   * posture on the termination paths and never blocks a done/fail/stop move.
   *
   * @param {string} bead_id
   * @param {string[]|null|undefined} keys
   */
  async function revertExecStamps(bead_id, keys) {
    if (!Array.isArray(keys)) {
      return;
    }
    for (const key of keys) {
      try {
        await deps.bd.unsetMetadata(bead_id, key);
      } catch (err) {
        log('exec stamp revert failed for %s %s: %o', bead_id, key, err);
      }
    }
  }

  /**
   * Give back a claim the session held when it ended WITHOUT closing the bead.
   * Only `in_progress` is reopened — that is the state a session takes and
   * never gave back, and it hides the bead from `bd ready`, so every later tick
   * skips it with no trace. `resolved`/`closed` are real progress that a failed
   * verify must not rewrite.
   *
   * Best-effort like the workflow_mode revert: a bd failure is logged and never
   * escapes the termination path, which is already halted anyway.
   *
   * @param {string} bead_id
   */
  async function releaseBeadClaim(bead_id) {
    try {
      if ((await deps.bd.readStatus(bead_id)) !== 'in_progress') {
        return;
      }
      await deps.bd.setStatus(bead_id, 'open');
      const readback = await deps.bd.readStatus(bead_id);
      if (readback !== 'open') {
        log(
          'bead claim release readback mismatch for %s: expected open, got %o',
          bead_id,
          readback
        );
      }
    } catch (err) {
      log('bead claim release failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Read the durable exec_stamped_keys recorded on an attempt at dispatch.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string[]|null}
   */
  function execStampedKeysOf(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts[attempt_id];
    return a && Array.isArray(a.exec_stamped_keys) ? a.exec_stamped_keys : null;
  }

  /**
   * The guard-kill evidence a detached monitor recorded for an attempt, read
   * off the durable record (UI-o2yt §3.3). Null when no monitor stopped it.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {{ reason: string, command: string|null }|null}
   */
  function guardKillOf(workspace, attempt_id) {
    try {
      const a = deps.store.snapshot(workspace).attempts[attempt_id];
      const gk = a && a.guard_kill;
      return gk && typeof gk.reason === 'string' ? gk : null;
    } catch {
      return null;
    }
  }

  /**
   * Beads holding a LEAF paused attempt (worker-phase1 §1.1). Resume mints a
   * child attempt and leaves the ancestor `paused` forever, so "is this bead
   * paused?" must ask about the leaf — an attempt nothing was resumed from.
   * Treating a resumed ancestor as active would block dispatch for a bead that
   * is running again.
   *
   * @param {{ attempts?: Record<string, any> }} q - Queue snapshot.
   * @returns {Set<string>}
   */
  function leafPausedBeads(q) {
    const attempts = Object.values(q.attempts || {});
    const resumed_from = new Set(
      attempts.map((a) => a && a.resumed_from).filter(Boolean)
    );
    const out = new Set();
    for (const a of attempts) {
      if (a && a.status === 'paused' && !resumed_from.has(a.attempt_id)) {
        out.add(a.bead_id);
      }
    }
    return out;
  }

  /**
   * Finalize a failed attempt: mark Failed, revert workflow_mode + exec stamps,
   * and turn auto_advance OFF.
   *
   * The auto_advance halt IS the failure behaviour now (worker-phase2 §2). With
   * sessions unable to touch the base, a failure's blast radius is one worktree,
   * so there is nothing to fence off per-repo — stopping the queue and letting
   * the banner render off this terminal record covers what the breaker covered.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {string|null} prior
   * @param {string} cause
   * @param {{ reason: string, command: string|null }} [cause_detail] - What the
   * fail-closed path actually caught (UI-2o4z §2). Only the blocker path has
   * one; every other cause stays detail-less.
   */
  async function failAttempt(
    workspace,
    attempt_id,
    bead_id,
    prior,
    cause,
    cause_detail
  ) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'failed',
        cause,
        finished_at: now(),
        cause_detail: cause_detail ?? null
      }
    });
    notifyLifecycle('attemptFailed', {
      bead_id,
      cause,
      repo: repoOfAttempt(workspace, attempt_id),
      cause_detail: cause_detail ?? null
    });
    try {
      await revertWorkflowMode(bead_id, prior);
    } catch (err) {
      // Best-effort on the failure path: the halt below already stops the queue,
      // so a bd-down revert failure must not escape onSessionDone.
      log('workflow_mode revert failed for %s: %o', bead_id, err);
    }
    // Revert any exec-setting stamps this attempt wrote (best-effort).
    await revertExecStamps(bead_id, execStampedKeysOf(workspace, attempt_id));
    deps.store.setAutoAdvance(workspace, false);
    // STRICTLY after the halt: reopening the bead makes it dispatchable again,
    // so a tick raised by a sibling attempt finishing concurrently must already
    // see auto_advance OFF or it would relaunch the attempt that just failed.
    await releaseBeadClaim(bead_id);
  }

  /**
   * Handle a finished session: SERVER-OBSERVED PR verdict → `pr_wait`, else the
   * failure path (auto_advance OFF + banner).
   *
   * The whole body runs under the `settling` fence: the `running`/`claimed`
   * entries are dropped immediately (a finished session holds no slot), but the
   * attempt stays durably `running` until the terminal write lands several
   * awaits later, and `reconcile` must not read that window as an unowned
   * detached session.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {BeadSnapshot} snap
   * @param {string|null} prior
   * @param {RunnerVerdict} verdict
   */
  async function onSessionDone(
    workspace,
    attempt_id,
    bead_id,
    snap,
    prior,
    verdict
  ) {
    settling.add(attempt_id);
    try {
      running.delete(attempt_id);
      claimed.delete(bead_id);

      // An explicit stop/pause already finalized this attempt (status + mode
      // reverted); the late `done` resolution must not re-run the failure path.
      // It IS still this attempt's last word on usage: the SIGTERM does not
      // wait for the exit, so events buffered behind it land after the
      // finalizing write and would otherwise strand a live tally forever.
      if (stopped.has(attempt_id)) {
        stopped.delete(attempt_id);
        // A ⏸/■ of a disposition session ends that disposition: the guard and
        // the repo lease it holds must come back, or the bead and every later
        // fix in this repo stay fenced (UI-hs11 §3.3).
        if (dispositionKindOf(workspace, attempt_id)) {
          releaseDisposition(bead_id);
        }
        const patch = usagePatch(workspace, attempt_id);
        if (patch.usage) {
          deps.store.updateAttempt(workspace, { attempt_id, patch });
          notifyChanged(workspace);
        }
        return;
      }

      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { exit: verdict.exit, ...usagePatch(workspace, attempt_id) }
      });

      // A DISPOSITION attempt takes its own completion path (UI-hs11 §3.3):
      // it opens no PR, so the observation below would fail every successful
      // repair as `no_pr`.
      const kind = dispositionKindOf(workspace, attempt_id);
      if (kind) {
        await onDispositionDone(
          workspace,
          attempt_id,
          bead_id,
          prior,
          verdict,
          kind
        );
        return;
      }

      if (!verdict.success) {
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          verdict.blocked
            ? 'loud_fail_blocker'
            : `session_failed:${verdict.reason}`,
          verdict.blocked
            ? blockerCauseDetail(verdict.blocked_detail)
            : undefined
        );
        notifyChanged(workspace);
        await tick(workspace);
        return;
      }

      // An EXTERNAL-PR resolution takes its own completion path (UI-w0hi §1):
      // the bead's lane membership belongs to the external overlay, so the
      // ordinary success — verify the PR, then `moveToPrWait` — would inject a
      // bead into the durable lane that never ran here. The attempt is the only
      // thing this path owns, so the attempt is the only thing it closes.
      if (externalConflictOf(workspace, attempt_id)) {
        // The revert stays fail-closed exactly as below: a stray `fast_track`
        // left on the bead would switch the user's next manual session to
        // unattended, which is worse than a failed attempt record.
        try {
          await revertWorkflowMode(bead_id, prior);
        } catch (err) {
          log(
            'workflow_mode revert failed on external resolution for %s: %o',
            bead_id,
            err
          );
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            prior,
            'workflow_mode_revert_failed'
          );
          notifyChanged(workspace);
          await tick(workspace);
          return;
        }
        await revertExecStamps(
          bead_id,
          execStampedKeysOf(workspace, attempt_id)
        );
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: { status: 'done', finished_at: now() }
        });
        notifyChanged(workspace);
        await tick(workspace);
        return;
      }

      // Independent verification — session exit 0 is NOT enough, and neither is
      // the session's own bd bookkeeping (worker-phase2 §1). ONE verdict now:
      // does the server OBSERVE an open PR for this attempt's branch?
      const vr = await deps.verify.verifyPrSubmitted({
        repo: snap.repo,
        bead_id
      });
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { verify_result: vr }
      });

      if (vr.ok) {
        // EVERY success is now PR-stop in nature: the bead stays open for a
        // later human merge click, so a stray fast_track must not switch that
        // session to unattended — a failed revert BLOCKS the lane move
        // unconditionally (fail-closed, implementation review 2026-07-22, now
        // not policy-gated).
        try {
          await revertWorkflowMode(bead_id, prior);
        } catch (err) {
          log(
            'workflow_mode revert failed on success for %s: %o',
            bead_id,
            err
          );
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            prior,
            'workflow_mode_revert_failed'
          );
          notifyChanged(workspace);
          await tick(workspace);
          return;
        }
        // The auto-run's global-default exec fill must not persist as the
        // bead's own metadata (worker-global-exec-defaults §3; best-effort,
        // never blocks the lane move).
        await revertExecStamps(
          bead_id,
          execStampedKeysOf(workspace, attempt_id)
        );
        if (vr.already_finished) {
          // The PR was observed MERGED and bd already held the bead `closed`
          // (UI-b8n8 §접근 B): the whole post-merge choreography — cleanup,
          // deploy, bd close — has already run. Routing it through `pr_wait`
          // would queue that finished work for a second run, so the attempt
          // terminates straight into `done`, in ONE persist like the lane move
          // below. No `prWaitEntered` push: the bead never enters the lane.
          deps.store.moveToDone(workspace, {
            bead_id,
            attempt_id,
            patch: { status: 'done', finished_at: now() }
          });
        } else {
          // Attempt done + bead into `pr_wait` in ONE persist (§4): a split write
          // could leave the bead queued for re-dispatch with its PR already open.
          deps.store.moveToPrWait(workspace, {
            bead_id,
            attempt_id,
            patch: { status: 'done', finished_at: now() }
          });
          notifyLifecycle('prWaitEntered', {
            bead_id,
            pr_url: vr.pr_url ?? null,
            repo: snap.repo
          });
        }
      } else {
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          `verify_failed:${vr.reason}`
        );
      }
      notifyChanged(workspace);
      await tick(workspace);
    } finally {
      settling.delete(attempt_id);
    }
  }

  /**
   * The disposition kind recorded on an attempt at dispatch, or null for an
   * ordinary implementation attempt.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string|null}
   */
  function dispositionKindOf(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts[attempt_id];
    return a && typeof a.disposition === 'string' && a.disposition.length > 0
      ? a.disposition
      : null;
  }

  /**
   * Whether an attempt resolves an EXTERNAL PR's conflict (UI-w0hi §1), read
   * off the durable record exactly like {@link dispositionKindOf}. The flag has
   * to survive a restart: `disposeDeadAttempt` disposes attempts this process
   * never launched, and lane membership of an external bead is the overlay's,
   * not `queue.json`'s.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {boolean}
   */
  function externalConflictOf(workspace, attempt_id) {
    try {
      const a = deps.store.snapshot(workspace).attempts[attempt_id];
      return !!a && a.external_conflict === true;
    } catch {
      return false;
    }
  }

  /**
   * Terminate a DISPOSITION attempt (UI-hs11 §3.3). The PR-existence verdict is
   * bypassed entirely; the disposition dep judges its own durable result
   * (receipt refreshed + park left + receipt commit published) instead.
   *
   * On success the transient dispatch metadata is restored exactly as a normal
   * completion restores it, the bead's claim is given back, the attempt is
   * closed `done`, and `auto_advance` is resumed by the disposition dep — the
   * bead stays in the WAITING lane so the ordinary lane re-dispatches the
   * implementation against the fresh receipt. On failure the standard failure
   * path runs, which is what raises the existing failure banner.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {string|null} prior
   * @param {RunnerVerdict} verdict
   * @param {string} kind
   */
  async function onDispositionDone(
    workspace,
    attempt_id,
    bead_id,
    prior,
    verdict,
    kind
  ) {
    const record = deps.store.snapshot(workspace).attempts[attempt_id] || {};
    if (!verdict.success) {
      // A `--resume` launch whose transcript turned out to be gone fails before
      // it can do anything; the spec's fallback is a substitute session
      // carrying the same prompt (its lineage lives in the bead notes). Bounded
      // to ONE retry by the flag the retry itself clears.
      //
      // A BLOCKED verdict is never retried: a guard violation is a property of
      // what the session did, not of a transcript that could not be found, and
      // relaunching it would just run into the same guard.
      if (record.disposition_resume === true && !verdict.blocked) {
        const retried = await retryDispositionFresh(
          workspace,
          attempt_id,
          bead_id,
          record,
          verdict
        );
        if (retried) {
          return;
        }
      }
      releaseDisposition(bead_id);
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        verdict.blocked
          ? 'loud_fail_blocker'
          : `session_failed:${verdict.reason}`,
        verdict.blocked ? blockerCauseDetail(verdict.blocked_detail) : undefined
      );
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }
    /** @type {{ ok: boolean, reason?: string }} */
    let result = { ok: false, reason: 'no_disposition_dep' };
    if (deps.disposition && typeof deps.disposition.complete === 'function') {
      try {
        result = await deps.disposition.complete({
          workspace,
          attempt_id,
          bead_id,
          kind,
          // Read off the DURABLE record so the verdict is the same after a
          // restart, where the disposition module holds nothing in memory.
          prior_receipt: record.disposition_receipt ?? null,
          target_base:
            typeof record.target_base === 'string' ? record.target_base : 'main'
        });
      } catch (err) {
        log('disposition completion threw for %s: %o', attempt_id, err);
        result = { ok: false, reason: 'error' };
      }
    }
    if (!result.ok) {
      releaseDisposition(bead_id);
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        `disposition_failed:${result.reason || 'unknown'}`
      );
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }
    // FAIL-CLOSED, exactly like the normal completion path: a stray
    // `fast_track` left on the bead would switch a later manual session to
    // unattended, so a failed revert blocks the success.
    let reverted = true;
    try {
      await revertWorkflowMode(bead_id, prior);
    } catch (err) {
      log('workflow_mode revert failed after disposition %s: %o', bead_id, err);
      reverted = false;
    }
    if (!reverted) {
      releaseDisposition(bead_id);
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        'workflow_mode_revert_failed'
      );
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }
    await revertExecStamps(bead_id, execStampedKeysOf(workspace, attempt_id));
    // The disposition writes `open` itself; this only covers a session that
    // claimed the bead `in_progress` and ended without giving it back.
    await releaseBeadClaim(bead_id);
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { status: 'done', finished_at: now() }
    });
    // Resuming the queue is the LAST step, after the metadata is restored: the
    // acceptance criterion is that the ordinary lane re-dispatches this bead,
    // and it must not do so against a half-restored bead. A persist failure
    // here means the disposition did not achieve its point, so it fails.
    let resumed = true;
    try {
      deps.store.setAutoAdvance(workspace, true);
    } catch (err) {
      log('auto_advance resume failed after disposition %s: %o', bead_id, err);
      resumed = false;
    }
    if (!resumed) {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        'disposition_failed:auto_advance_resume_failed'
      );
    }
    notifyChanged(workspace);
    await tick(workspace);
  }

  /**
   * Give a disposition's per-Bead guard and per-repo lease back (UI-hs11
   * §3.3). Every termination that does not reach the completion verdict must
   * call this, or the bead — and the repo's whole fix lane — stays fenced for
   * the life of the process.
   *
   * @param {string} bead_id
   */
  function releaseDisposition(bead_id) {
    if (!deps.disposition || typeof deps.disposition.release !== 'function') {
      return;
    }
    try {
      deps.disposition.release(bead_id);
    } catch (err) {
      log('disposition release failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Relaunch a failed `--resume` disposition as a FRESH substitute session
   * (UI-hs11 §3.3 fallback). The worktree and the session id can both still be
   * present while the transcript itself is gone, in which case the resume dies
   * without doing anything — indistinguishable from a session that ran and
   * failed, so the retry is attempted once for both and the flag on the child
   * (`disposition_resume:false`) is what stops a second one.
   *
   * The failed ancestor is recorded terminally first, because the relaunch
   * links to it through `resumed_from` and the guards read that chain.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {any} record - The failed attempt.
   * @param {RunnerVerdict} verdict
   * @returns {Promise<boolean>} Whether a substitute session was launched.
   */
  async function retryDispositionFresh(
    workspace,
    attempt_id,
    bead_id,
    record,
    verdict
  ) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'failed',
        cause: `disposition_resume_failed:${verdict.reason}`,
        finished_at: now()
      }
    });
    /** @type {{ ok: boolean, reason?: string, attempt_id?: string }} */
    let relaunched;
    try {
      relaunched = await dispatchReviseFix(workspace, {
        bead_id,
        attempt_id,
        prompt:
          typeof record.disposition_prompt === 'string' &&
          record.disposition_prompt.length > 0
            ? record.disposition_prompt
            : defaultTaskPrompt(bead_id),
        prior_receipt: record.disposition_receipt ?? null,
        resume: false
      });
    } catch (err) {
      log('disposition substitute launch threw for %s: %o', bead_id, err);
      relaunched = { ok: false, reason: 'error' };
    }
    if (!relaunched.ok) {
      log(
        'disposition substitute launch refused for %s: %s',
        bead_id,
        relaunched.reason
      );
      return false;
    }
    notifyChanged(workspace);
    return true;
  }

  /**
   * Is a persisted `running` attempt's process gone? The judgment is
   * attempt_id + PID + START TIME, never mere PID existence: a recycled PID
   * (same number, unrelated process) must read as dead, or a dead session would
   * hold its slot until the number is reused by nothing.
   *
   * `pid == null` reads as dead, which is only sound for an attempt no part of
   * this process owns — a dispatch that has pre-recorded but not yet spawned
   * has exactly that shape. {@link reconcile}'s `running`/`settling`/`claimed`
   * fences are what guarantee that, so this must not be called on its own.
   *
   * @param {any} attempt
   * @returns {boolean}
   */
  function isDeadAttempt(attempt) {
    const probePid = deps.probePid;
    if (typeof probePid !== 'function') {
      return false;
    }
    if (attempt.pid == null) {
      return true;
    }
    const probe = probePid(attempt.pid);
    if (!probe.alive) {
      return true;
    }
    return (
      attempt.started_at != null &&
      probe.started_at != null &&
      Math.abs(probe.started_at - attempt.started_at) > PID_START_TOLERANCE_MS
    );
  }

  /**
   * Dispose ONE attempt whose detached session is gone
   * (worker-detached-session-reconcile §1). The exit code is unobservable here,
   * so `exit` is left null and the verdict comes from the same independent
   * observation `onSessionDone` runs — exit 0 was never the authority anyway.
   * Both branches then mirror `onSessionDone` verbatim, including the
   * `verify_result` record the PR poller's `resolvePrRef` reads to learn which
   * PR a `pr_wait` bead is waiting on.
   *
   * A dead attempt with no recorded `repo` cannot be observed at all, so it
   * fails closed rather than guessing a repo — an unobservable attempt must
   * never read as "no PR was ever opened".
   *
   * The bead is CLAIMED for the whole disposition, taken before the first await.
   * The `gh` observation can take seconds, and `tick` skips claimed beads — so
   * without the claim a user flipping auto_advance back on mid-observation
   * could re-dispatch the same bead, and this disposition's `failAttempt` would
   * then release the NEW session's bd claim and revert ITS metadata. The claim
   * is given back before the trailing `notifyChanged`/`tick` so the bead this
   * pass just recovered is dispatchable to the tick it raises itself.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {any} attempt
   */
  async function disposeDeadAttempt(workspace, attempt_id, attempt) {
    const bead_id = attempt.bead_id;
    const prior = attempt.workflow_mode_prior ?? null;
    const repo = typeof attempt.repo === 'string' ? attempt.repo : '';
    // A DISPOSITION session that outlived a restart is judged by its own
    // verdict, never by the PR observation (UI-hs11 §3.3): it opens no PR, so
    // the branch below would fail every successful repair as `pr_missing`.
    const kind =
      typeof attempt.disposition === 'string' && attempt.disposition.length > 0
        ? attempt.disposition
        : null;
    // An EXTERNAL-PR resolution that outlived a restart is judged the same way
    // (UI-w0hi §1): it opens no PR of its own — the PR already exists and is
    // the external overlay's — so the observation below would both fail it as
    // `pr_missing` and, on a pass, move a bead into a durable lane the worker
    // never put it in.
    const external_conflict = attempt.external_conflict === true;
    // FIRST, before any observation and for BOTH attempt kinds: retire this
    // attempt's detached monitor. The stop drains its session log to EOF, which
    // is what completes the usage tally lifted below AND settles any guard
    // evidence still in the tail (UI-o2yt §3.3).
    if (deps.sessionMonitors) {
      try {
        deps.sessionMonitors.stop(workspace, attempt_id);
      } catch (err) {
        log('session monitor stop failed for %s: %o', attempt_id, err);
      }
    }
    // Re-read AFTER the drain: the evidence may have been written by it.
    const guard_kill = guardKillOf(workspace, attempt_id);
    if (kind) {
      // No claim is taken here, unlike the branch below: the disposition path
      // owns its own relaunch (which takes the claim itself), and a claim
      // released around it would drop the NEW session's fence. Nothing can
      // re-dispatch this bead meanwhile either — the park left `auto_advance`
      // off, and turning it back on is the last step of a successful verdict.
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: usagePatch(workspace, attempt_id)
      });
      // Guard evidence OUTRANKS the disposition's own readback for the same
      // reason it outranks the `gh` observation: a monitor-killed session must
      // fail however far its writes got.
      await onDispositionDone(
        workspace,
        attempt_id,
        bead_id,
        prior,
        /** @type {any} */ (
          guard_kill
            ? {
                success: false,
                reason: 'guard_kill',
                exit: null,
                blocked: true,
                blocked_detail: {
                  reason: guard_kill.reason,
                  command: guard_kill.command ?? null
                }
              }
            : {
                success: true,
                reason: 'reconciled',
                exit: null,
                blocked: false
              }
        ),
        kind
      );
      return;
    }
    if (external_conflict) {
      // An EXTERNAL resolution takes the same claim the ordinary arm does, for
      // the same reason, but never reaches `gh`: there is no PR of its own to
      // observe, and a pass would move a bead into a durable lane the worker
      // never put it in (UI-w0hi §1). The usage patch is the only part of the
      // ordinary observation write that still applies.
      claimed.add(bead_id);
      try {
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: usagePatch(workspace, attempt_id)
        });
        if (guard_kill) {
          // Guard evidence outranks here exactly as it does on the ordinary
          // arm: a monitor-killed session fails however far its writes got.
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            prior,
            'loud_fail_blocker',
            blockerCauseDetail({
              reason: guard_kill.reason,
              command: guard_kill.command ?? null
            })
          );
        } else {
          // Nothing observable says whether the resolution succeeded — the PR
          // belongs to the external row and the merge gate re-observes it on
          // the next click anyway. So this closes the attempt, reverts its
          // stamps, and leaves the durable lanes alone. The revert stays
          // fail-closed for the reason it is everywhere else: a stray
          // `fast_track` would switch the user's next manual session to
          // unattended.
          let mode_reverted = true;
          try {
            await revertWorkflowMode(bead_id, prior);
          } catch (err) {
            log(
              'workflow_mode revert failed on external resolution reconcile for %s: %o',
              bead_id,
              err
            );
            mode_reverted = false;
          }
          if (mode_reverted) {
            await revertExecStamps(
              bead_id,
              execStampedKeysOf(workspace, attempt_id)
            );
            deps.store.updateAttempt(workspace, {
              attempt_id,
              patch: { status: 'done', finished_at: now() }
            });
          } else {
            await failAttempt(
              workspace,
              attempt_id,
              bead_id,
              prior,
              'workflow_mode_revert_failed'
            );
          }
        }
      } finally {
        claimed.delete(bead_id);
      }
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }
    claimed.add(bead_id);
    try {
      /** @type {{ ok: boolean, reason: string, pr_url?: string|null, already_finished?: boolean }} */
      let vr;
      if (repo.length === 0) {
        vr = { ok: false, reason: 'gh_observation_failed' };
      } else {
        try {
          vr = await deps.verify.verifyPrSubmitted({ repo, bead_id });
        } catch (err) {
          // The verifier is fail-closed internally; a throw is a defect, and
          // letting it escape would leave the attempt `running` for the next
          // pass to re-observe forever.
          log('reconcile verify threw for %s: %o', attempt_id, err);
          vr = { ok: false, reason: 'gh_observation_failed' };
        }
      }
      // The usage patch rides this write exactly as it rides `onSessionDone`'s
      // exit write: a tally rebuilt from the session log at startup (UI-ediw)
      // is the only usage a dead detached attempt can carry, so persisting it
      // here is what keeps the number past disposition. Nothing recovered →
      // empty patch → `usage: null`, unchanged.
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { verify_result: vr, ...usagePatch(workspace, attempt_id) }
      });

      if (guard_kill) {
        // Blocker evidence OUTRANKS the `gh` observation (UI-o2yt §3.3). An
        // engine-run session that trips a guard fails no matter what it pushed;
        // a monitor-killed one must fail the same way, or a PR opened before the
        // violation would launder the kill into a success.
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          'loud_fail_blocker',
          blockerCauseDetail({
            reason: guard_kill.reason,
            command: guard_kill.command ?? null
          })
        );
      } else if (vr.ok) {
        // A failed revert BLOCKS the lane move (fail-closed): a stray
        // `fast_track` left on the bead would switch a later manual session to
        // unattended.
        let mode_reverted = true;
        try {
          await revertWorkflowMode(bead_id, prior);
        } catch (err) {
          log(
            'workflow_mode revert failed on reconcile for %s: %o',
            bead_id,
            err
          );
          mode_reverted = false;
        }
        if (mode_reverted) {
          await revertExecStamps(
            bead_id,
            execStampedKeysOf(workspace, attempt_id)
          );
          // A recovered normal completion must NOT stop the queue:
          // `auto_advance` is deliberately untouched on this branch.
          //
          // The already-finished verdict routes to `done` here for the same
          // reason it does in `onSessionDone` (UI-b8n8 §접근 B): a bead bd holds
          // as `closed` has had its whole post-merge choreography run.
          if (vr.already_finished) {
            deps.store.moveToDone(workspace, {
              bead_id,
              attempt_id,
              patch: { status: 'done', finished_at: now() }
            });
          } else {
            deps.store.moveToPrWait(workspace, {
              bead_id,
              attempt_id,
              patch: { status: 'done', finished_at: now() }
            });
            notifyLifecycle('prWaitEntered', {
              bead_id,
              pr_url: vr.pr_url ?? null,
              repo
            });
          }
        } else {
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            prior,
            'workflow_mode_revert_failed'
          );
        }
      } else {
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          `verify_failed:${vr.reason}`
        );
      }
    } finally {
      // Never leak the claim: an unexpected throw here would otherwise fence
      // the bead out of every later dispatch for the life of the process.
      claimed.delete(bead_id);
    }
    notifyChanged(workspace);
    await tick(workspace);
  }

  /**
   * Reconcile persisted `running` attempts against the OS
   * (worker-detached-session-reconcile §1). Both entry points — server startup
   * and the periodic timer — share this one routine.
   *
   * ONLY attempts no part of THIS process owns are candidates, behind three
   * fences, because a durable `running` record is not by itself evidence of a
   * detached session:
   *
   *   - `running` — a live session handle: `onSessionDone` is its authority.
   *   - `settling` — `onSessionDone` is mid-flight for it: it already dropped
   *     the handle but has not written the terminal status yet.
   *   - `claimed` (by BEAD) — a dispatch or relaunch is in flight. Between the
   *     durable pre-record (`status:'running'`, `pid:null`) and `running.set`
   *     at spawn, the attempt looks exactly like a dead one — `pid == null` —
   *     and the claim, taken in the tick cascade before dispatch and released
   *     only on abort/termination, is what tells the two apart.
   *
   * @param {string} workspace
   */
  async function reconcile(workspace) {
    if (reconciling.has(workspace)) {
      return;
    }
    reconciling.add(workspace);
    try {
      const q = deps.store.snapshot(workspace);
      /** @type {Array<{ attempt_id: string, attempt: any }>} */
      const dead = [];
      for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
        const a = /** @type {any} */ (attempt);
        if (!a || a.status !== 'running') {
          continue;
        }
        if (
          running.has(attempt_id) ||
          settling.has(attempt_id) ||
          claimed.has(a.bead_id)
        ) {
          continue;
        }
        if (isDeadAttempt(a)) {
          dead.push({ attempt_id, attempt: a });
        }
      }
      for (const d of dead) {
        // Re-checked per iteration, not just at selection: each disposition
        // ends in a `tick`, so an earlier one in this same pass may already
        // have re-dispatched the bead of a later candidate.
        if (claimed.has(d.attempt.bead_id)) {
          continue;
        }
        await disposeDeadAttempt(workspace, d.attempt_id, d.attempt);
      }
    } finally {
      reconciling.delete(workspace);
    }
  }

  /**
   * Dispatch one bead: re-read bd, guard, worktree, workflow_mode, attempt
   * snapshot, spawn. Releases the claim on any pre-spawn abort.
   *
   * @param {string} workspace
   * @param {string} bead_id
   */
  async function dispatch(workspace, bead_id) {
    // RE-READ authoritative ready/blocked/deps/exec-settings at dispatch.
    // A disagreement with the scan pass is a real TOCTOU stop, so it is
    // recorded on the same channel the scan uses — without a reason this
    // dispatch would abort with nothing visible anywhere.
    let snap;
    try {
      snap = await deps.bd.snapshotBead(bead_id);
    } catch {
      recordSkipReason(workspace, bead_id, 'bd_snapshot_failed');
      claimed.delete(bead_id);
      return;
    }
    if (!snap.ready || snap.blocked) {
      if (!dequeueIfClosed(workspace, bead_id, snap)) {
        recordSkipReason(workspace, bead_id, notReadyReason(snap));
      }
      claimed.delete(bead_id);
      return;
    }

    // Resolve the 4 exec settings (bead metadata > workspace-global default >
    // final fallback: `opus` for orchestration_model, unset for the other 3).
    // `stamped_keys` names the bead-absent keys filled from the global default
    // that this dispatch must stamp (and later revert) —
    // worker-global-exec-defaults §3; the hardcoded fallback never stamps.
    const exec = resolveExecSettings({
      bead: snap,
      defaults: deps.store.snapshot(workspace).exec_defaults
    });
    const runner_name = 'claude';

    const attempt_id = makeAttemptId(bead_id);
    const prior = snap.workflow_mode ?? null;

    // Base RE-RESOLUTION at dispatch (worker-base-scope-alignment §1). The scan
    // may have read a memoized resolution; the cut below and the attempt record
    // must come from a base read now. An unresolved declaration refuses HERE,
    // before any worktree is touched: there is nothing to cut from, and the
    // dispatch order puts the cut ahead of the admission re-check.
    if (typeof deps.resolveBase === 'function') {
      /** @type {import('./target-base.js').TargetBaseResult} */
      let resolved;
      try {
        resolved = await deps.resolveBase({ force: true });
      } catch {
        await refuseDispatch(workspace, bead_id, 'base_unresolved:git_error');
        return;
      }
      if (!resolved.ok) {
        await refuseDispatch(
          workspace,
          bead_id,
          `base_unresolved:${resolved.step}`
        );
        return;
      }
      snap = {
        ...snap,
        target_base: resolved.base,
        base_oid: resolved.base_oid,
        base_unresolved: null
      };
    } else if (snap.base_unresolved) {
      await refuseDispatch(workspace, bead_id, snap.base_unresolved);
      return;
    }
    // The cut source: the FETCHED remote tip when the resolver produced one, so
    // a stale local `<base>` cannot silently become the worktree's parent.
    const cut_base = snap.base_oid || snap.target_base;

    // PRE-FLIGHT (spec §2): a leftover worktree/branch from an earlier ■ makes
    // `add` fail outright, and — once the worktree alone is gone — makes its
    // `-B` silently reset a branch that may still hold the only copy of its
    // commits. Clear it when nothing would be lost, refuse VISIBLY otherwise.
    if (typeof deps.worktree.removeIfDiscardable === 'function') {
      /** @type {{ ok: boolean, removed: boolean, reason: string|null }} */
      let residue;
      try {
        residue = await deps.worktree.removeIfDiscardable({
          repo: snap.repo,
          bead_id,
          base: cut_base
        });
      } catch {
        await refuseDispatch(workspace, bead_id, 'git_error');
        return;
      }
      if (!residue.ok) {
        await refuseDispatch(workspace, bead_id, 'worktree_stale_work');
        return;
      }
    }

    let wt;
    try {
      wt = await deps.worktree.add({
        repo: snap.repo,
        bead_id,
        base: cut_base
      });
    } catch {
      // Fail-VISIBLE: this used to abort with no badge, no log and no attempt,
      // leaving a re-queued bead permanently stuck with nothing to see.
      await refuseDispatch(workspace, bead_id, 'worktree_add_failed');
      return;
    }

    // Admission re-check against the PINNED base_oid — the tick scan validated
    // against a moving base tip, so a base advance between scan and worktree
    // creation (TOCTOU) is caught here, fail-closed.
    const adm = await checkAdmission(snap, wt.base_oid);
    if (adm.ok && adm.stale) {
      // The re-check is pinned to base_oid, so ITS payload — not the scan's —
      // is what the session is told about (UI-dlim §3.2). A bead that was fresh
      // at scan time and stale here is flagged, never refused.
      recordStale(workspace, bead_id);
    }
    if (!adm.ok) {
      recordSkipReason(workspace, bead_id, adm.reason || 'git_error');
      try {
        await deps.worktree.remove({ repo: snap.repo, bead_id });
      } catch {
        // Best-effort cleanup; the refusal is already recorded.
      }
      claimed.delete(bead_id);
      dispatch_refused.add(bead_id);
      await tickPass(workspace);
      return;
    }

    // Record + readback workflow_mode=fast_track (double-delivered with prompt).
    // The set AND its confirming readback are contained: a bd failure or a
    // readback that does not echo `fast_track` fails THIS dispatch only (records
    // a failed attempt, reverts the mode, releases the claim) — it never rejects
    // out of tick's Promise.all, and never halts the queue or pauses siblings
    // (spec §5.2).
    let fast_track_ok = false;
    try {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
      const readback = await deps.bd.readMetadata(bead_id, 'workflow_mode');
      fast_track_ok = readback === 'fast_track';
      if (!fast_track_ok) {
        log(
          'workflow_mode readback mismatch for %s: expected fast_track, got %o',
          bead_id,
          readback
        );
      }
    } catch (err) {
      log('workflow_mode set/readback failed for %s: %o', bead_id, err);
      fast_track_ok = false;
    }
    if (!fast_track_ok) {
      deps.store.appendAttempt(workspace, {
        expected_revision: deps.store.snapshot(workspace).revision,
        attempt: { attempt_id, bead_id }
      });
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          repo: snap.repo,
          target_base: snap.target_base,
          base_oid: wt.base_oid,
          workflow_mode_prior: prior,
          status: 'failed',
          cause: 'workflow_mode_record_failed',
          finished_at: now()
        }
      });
      // Direct failure record — this path never reaches `failAttempt`, so the
      // push is fired here (UI-2yoq §2).
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'workflow_mode_record_failed',
        repo: snap.repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return;
    }

    // DURABLE pre-record: persist the attempt (status 'running', pid null)
    // BEFORE the first exec-setting metadata write, recording the exact keys
    // this dispatch will stamp. If a crash lands between here and spawn, a
    // restart's reconcile can revert the stamps from this record — an
    // in-memory-only registry could not (worker-global-exec-defaults §3).
    const stamped_keys = exec.stamped_keys;
    // Persist the resolved values of the stamped keys too (spec §1): a later
    // manual resume re-stamps from the PRIOR snapshot rather than re-resolving
    // the current global defaults, so the values must travel on the attempt.
    /** @type {Record<string, string>} */
    const exec_values = {};
    for (const key of stamped_keys) {
      const value = /** @type {Record<string, string>} */ (
        /** @type {any} */ (exec)
      )[key];
      if (typeof value === 'string') {
        exec_values[key] = value;
      }
    }
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        repo: snap.repo,
        target_base: snap.target_base,
        base_oid: wt.base_oid,
        workflow_mode_prior: prior,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values: stamped_keys.length > 0 ? exec_values : null,
        spec_review_stale: !!adm.stale,
        status: 'running',
        pid: null
      }
    });

    // Stamp each bead-absent, global-filled exec key onto the bead metadata
    // (set + confirming readback, mirroring the workflow_mode stamp). A bd
    // failure or a readback mismatch on ANY key fails THIS dispatch only: the
    // durably-recorded stamped_keys are unset (idempotent for keys not yet
    // written — a set that succeeded but whose readback threw/mismatched is
    // still cleaned up), the attempt is recorded failed, the mode is reverted,
    // the claim released — no queue halt, no sibling pause.
    let exec_stamp_ok = true;
    for (const key of stamped_keys) {
      const value = /** @type {Record<string, string>} */ (
        /** @type {any} */ (exec)
      )[key];
      try {
        await deps.bd.setMetadata(bead_id, key, value);
        const rb = await deps.bd.readMetadata(bead_id, key);
        if (rb !== value) {
          log(
            'exec stamp readback mismatch for %s %s: expected %o, got %o',
            bead_id,
            key,
            value,
            rb
          );
          exec_stamp_ok = false;
          break;
        }
      } catch (err) {
        log('exec stamp set/readback failed for %s %s: %o', bead_id, key, err);
        exec_stamp_ok = false;
        break;
      }
    }
    if (!exec_stamp_ok) {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          status: 'failed',
          cause: 'exec_stamp_failed',
          finished_at: now()
        }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'exec_stamp_failed',
        repo: snap.repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return;
    }

    await launchSession({
      workspace,
      attempt_id,
      bead_id,
      repo: snap.repo,
      target_base: snap.target_base,
      base_oid: wt.base_oid,
      runner_name,
      model: exec.orchestration_model ?? null,
      effort: exec.orchestration_effort ?? null,
      prior_wf: prior,
      stamped_keys,
      wt_path: wt.path,
      // Only the FIRST dispatch holds a bead snapshot, so only it can name the
      // bead in the start push; a resume/conflict relaunch pushes without one.
      title: snap.title ?? null,
      launch_kind: 'dispatch',
      // The adapter reads only `id`/`prompt`; the plan-receipt fields the
      // retired runner guard needed are no longer carried (worker-phase1 §4).
      // A fresh receipt carries no `prompt`, so the adapter builds the default
      // one — only a stale dispatch overrides it (UI-dlim §3.2).
      spawnBead: adm.stale
        ? {
            id: bead_id,
            prompt: staleDispatchPrompt(bead_id, {
              receipt:
                typeof snap.spec_review === 'string' &&
                snap.spec_review.trim().length > 0
                  ? snap.spec_review.trim()
                  : adm.stale.receipt_sha,
              base: wt.base_oid,
              delta_shas: adm.stale.delta_shas
            })
          }
        : { id: bead_id }
    });
  }

  /**
   * Shared launch tail for a first dispatch AND a manual resume: spawn the
   * runner, fill the spawn-time snapshot, attach the session log, wire
   * session_id capture + the done handler. On a spawn throw it cleans up exactly
   * like the exec-stamp partial failure (revert stamps + workflow_mode, record
   * `spawn_failed`, release the claim) so no stamped metadata or leaked
   * `running` record outlives the aborted launch.
   *
   * `conflict_resolution` marks a resolution attempt (worker-phase2 §6). It is
   * the ONLY input that relaxes the session-side `git merge` guard, so it
   * defaults to false here and only Phase 5's resolution dispatch passes true.
   *
   * @param {{
   *   workspace: string,
   *   attempt_id: string,
   *   bead_id: string,
   *   repo: string,
   *   target_base: string,
   *   base_oid: string|null,
   *   runner_name: string,
   *   model: string|null,
   *   effort: string|null,
   *   prior_wf: string|null,
   *   stamped_keys: string[],
   *   wt_path: string,
   *   spawnBead: any,
   *   title?: string|null,
   *   launch_kind?: 'dispatch'|'resume'|'conflict'|'disposition',
   *   resume_session_id?: string|null,
   *   conflict_resolution?: boolean,
   *   disposition?: string|null
   * }} input
   * @returns {Promise<{ ok: boolean, reason?: string }>} Whether the session
   * actually started. A spawn abort is REPORTED rather than swallowed: the
   * relaunch callers hand their verdict to a click that would otherwise be told
   * a session is running when none is.
   */
  async function launchSession(input) {
    const {
      workspace,
      attempt_id,
      bead_id,
      repo,
      target_base,
      base_oid,
      runner_name,
      model,
      effort,
      prior_wf,
      stamped_keys,
      wt_path,
      spawnBead,
      resume_session_id
    } = input;

    const runner = deps.makeRunner(runner_name);
    const started_at = now();

    /** @type {any} */
    const settings = {
      model: model ?? undefined,
      effort: effort ?? undefined,
      fast_track: true,
      // The base wiring (worker-base-scope-alignment §3): `launchSession`
      // already destructured `repo`/`target_base`/`base_oid`, but the settings
      // object did not carry them, so neither `applyPreamble` (the PR base
      // directive, §4) nor `findMergeViolation` (the guard's subject, §6) could
      // ever see them. Widening the signatures alone passes the unit tests and
      // still delivers nothing to a real session — this is the missing link.
      repo,
      target_base,
      base_oid: base_oid ?? null,
      conflict_resolution: input.conflict_resolution === true,
      // A disposition session repairs a spec on the base and opens no PR, so
      // the always-on PR-submit directive would instruct it to do the one
      // thing its own prompt forbids (UI-hs11 §3.3).
      disposition: input.disposition ?? null
    };
    // Resume argv branch (spec §1.4): the adapter reads this to continue the
    // prior claude session id / codex thread id.
    if (resume_session_id) {
      settings.resume_session_id = resume_session_id;
    }
    // The output files the child inherits as stdout/stderr (UI-o2yt §3.1). The
    // session log is keyed by the WORKSPACE, not the worktree the session runs
    // in, so the path is resolved here and handed down rather than derived
    // inside the engine.
    if (typeof deps.sessionLog.pathFor === 'function') {
      settings.log_path = deps.sessionLog.pathFor(workspace, attempt_id);
      if (typeof deps.sessionLog.stderrPathFor === 'function') {
        settings.stderr_path = deps.sessionLog.stderrPathFor(
          workspace,
          attempt_id
        );
      }
    }

    /** @type {RunnerHandle} */
    let handle;
    try {
      handle = runner.spawn(spawnBead, wt_path, settings);
    } catch {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { status: 'failed', cause: 'spawn_failed', finished_at: now() }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'spawn_failed',
        repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'spawn_failed' };
    }

    // Fill the runtime snapshot now that the process exists (spec §5.2). The
    // durable fields (repo/base_oid/exec_stamped_keys) were pre-recorded above;
    // here we add the spawn-time facts + resolved exec values.
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        head_oid: base_oid,
        started_at,
        pid: handle.pid,
        runner: runner_name,
        model: model ?? null,
        effort: effort ?? null
      }
    });

    notifyLifecycle('attemptStarted', {
      bead_id,
      title: input.title ?? null,
      model,
      effort,
      repo,
      kind: input.launch_kind ?? 'dispatch'
    });

    deps.store.clearAdmission(workspace, bead_id);
    deps.sessionLog.attach(workspace, attempt_id, handle.events);
    // Persist the runner session id when it arrives (stream first event). The
    // updateAttempt store-only write does NOT fan out on its own, so notify ws
    // subscribers explicitly to propagate it to a live drawer (spec §2).
    handle.events.on('session_id', (session_id) => {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          session_id: typeof session_id === 'string' ? session_id : null
        }
      });
      notifyChanged(workspace);
    });
    // Token usage (UI-raqh §1): assistant snapshots accumulate per message id,
    // the `result` total replaces them. Kept in memory while the session runs
    // and persisted onto the attempt at termination; the fanout is throttled
    // because a usage tick is not a queue transition.
    const usage_store = deps.usage;
    if (usage_store) {
      handle.events.on('event', (ev) => {
        const usage = ev && ev.usage;
        if (!usage) {
          return;
        }
        if (ev.kind === 'result') {
          usage_store.recordResult(workspace, attempt_id, usage);
        } else {
          usage_store.record(workspace, attempt_id, usage);
        }
        scheduleUsageFanout(workspace);
      });
    }
    running.set(attempt_id, { bead_id, repo, handle, prior: prior_wf });
    notifyChanged(workspace);

    // onSessionDone reads only repo + target_base off the snap, so a synthetic
    // snapshot carries everything the termination path needs (the independent
    // verify target) for both first dispatch and resume.
    const doneSnap = /** @type {BeadSnapshot} */ (
      /** @type {any} */ ({ repo, target_base })
    );
    handle.done.then((verdict) =>
      onSessionDone(workspace, attempt_id, bead_id, doneSnap, prior_wf, verdict)
    );
    return { ok: true };
  }

  /**
   * The manual-resume task prompt (spec §1.4, branched by worker-phase1 §1.4):
   * announce how the prior attempt ended, instruct a self-check of worktree/
   * bead/PR state, and require finishing ONLY the remaining contract steps. The
   * unattended/policy preamble is layered on by the adapter's `applyPreamble`,
   * exactly as for a first launch.
   *
   * A `paused` ancestor was halted by the user on purpose, so it must NOT be
   * announced as a failure — telling the session it failed is exactly the
   * dishonesty this phase removes from the UI.
   *
   * @param {string} bead_id
   * @param {string|null} prior_status
   * @returns {string}
   */
  function resumePrompt(bead_id, prior_status) {
    const opening =
      prior_status === 'paused'
        ? `이전 무인 세션이 사용자 요청으로 일시정지되었다(bead ${bead_id}).`
        : `이전 무인 세션이 완료 전에 중단되어 attempt가 실패로 남았다(bead ${bead_id}).`;
    return [
      opening,
      '같은 워크트리에서 세션을 이어 진행한다. 먼저 워크트리·bead 상태·PR/머지 현황을 직접 점검해 어디까지 진행됐는지 확인하라.',
      '이미 끝난 단계는 반복하지 말고, 남은 계약 단계만 마무리한 뒤 종료하라.'
    ].join(' ');
  }

  /**
   * Manually resume a paused/failed/orphaned attempt in its EXISTING worktree
   * (spec §1, extended by worker-phase1 §1.2). Fail-closed with five refusal
   * reasons (admission-badge convention): `not_failed` · `no_session_id` ·
   * `worktree_missing` · `bead_running` · `already_resumed`
   * (`runner_unavailable` is retired with the runner axis — claude is the only
   * runner). A NEW attempt is minted carrying `resumed_from`, the PRIOR snapshot
   * is inherited verbatim (no re-resolution of globals), workflow_mode + exec
   * are re-stamped from the prior values, and the shared launch tail spawns the
   * adapter's resume argv.
   *
   * The breaker-reset branch (worker-phase1 §1.3) is gone with the breaker
   * itself (worker-phase2 §2): there is no repo-level block for a resume to
   * clear. Turning `auto_advance` back on stays the user's explicit ▶.
   *
   * @param {string} workspace
   * @param {string} attempt_id - The prior (paused/failed/orphaned) attempt.
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function resume(workspace, attempt_id) {
    const q = deps.store.snapshot(workspace);
    const prior = q.attempts ? q.attempts[attempt_id] : null;

    // not_failed: no such attempt, or not in a resumable state.
    if (
      !prior ||
      (prior.status !== 'failed' &&
        prior.status !== 'orphaned' &&
        prior.status !== 'paused')
    ) {
      return { ok: false, reason: 'not_failed' };
    }
    // no_session_id: a pre-UI-azj6 attempt without a captured session id.
    if (typeof prior.session_id !== 'string' || prior.session_id.length === 0) {
      return { ok: false, reason: 'no_session_id' };
    }
    const bead_id = prior.bead_id;
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    // worktree_missing: the bead worktree is gone (resume never recreates it).
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : true;
    if (!wt_present) {
      return { ok: false, reason: 'worktree_missing' };
    }
    // bead_running: a live (or store-recorded running) attempt for the same bead.
    if (claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.bead_id === bead_id && a.status === 'running') {
        return { ok: false, reason: 'bead_running' };
      }
    }
    // already_resumed: a child attempt already carries this as `resumed_from`
    // (scan-derived so it survives cold reload — the ancestor is permanently
    // spent regardless of the child's success/failure).
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.resumed_from === attempt_id) {
        return { ok: false, reason: 'already_resumed' };
      }
    }
    return relaunchFromAttempt(workspace, prior, {
      prompt: resumePrompt(bead_id, prior.status ?? null),
      conflict_resolution: false
    });
  }

  /**
   * The conflict-resolution task prompt (worker-phase2 §6). The session is the
   * bead's ORIGINAL one, revived in its own worktree, so it already knows the
   * change — what it needs is the new fact (its PR conflicts) and the exact
   * shape of the resolution.
   *
   * Three constraints are stated because each one is load-bearing:
   * merge-into-branch and NOT rebase (a rebase needs a force-push, which the
   * push-safety rules forbid — and the squash merge discards the merge commit
   * anyway); resolve preserving BOTH sides' intent; and do NOT merge the PR
   * (the merge stays a human click — resolving automatically and then merging
   * automatically would resurrect unattended merging at the single most
   * dangerous moment).
   *
   * @param {string} bead_id
   * @param {string} target_base
   * @returns {string}
   */
  function conflictPrompt(bead_id, target_base) {
    const base = target_base || 'main';
    return [
      `네 PR이 base(${base})와 충돌한다(bead ${bead_id}).`,
      `같은 워크트리에서 origin을 fetch한 뒤 \`git merge origin/${base}\`로 base를 이 브랜치에 머지해 충돌을 해소하라.`,
      'rebase와 force-push는 금지다 — merge-into-branch만 사용한다.',
      '충돌은 양쪽 변경의 의도가 모두 보존되도록 해소하고, 레포의 테스트/검증을 돌려 통과시킨 뒤 브랜치에 push하라.',
      'PR 머지는 절대 수행하지 마라 — 머지는 사람이 버튼으로 한다.'
    ].join(' ');
  }

  /**
   * Dispatch a CONFLICT-RESOLUTION session for a bead sitting in `pr_wait`
   * (worker-phase2 §6). It reuses the resume machinery wholesale rather than
   * building a second launcher: the same existing worktree, the same
   * `claude --resume <session_id>`, the same `resumed_from` link, the same
   * inherited snapshot. Only two things differ — the prompt, and the
   * `conflict_resolution` flag that travels onto the attempt record AND into the
   * runner settings, which is the ONLY thing that lets the session's
   * `git merge origin/<base>` past the fail-closed guard (§1).
   *
   * The source attempt is the bead's LATEST one carrying a session id — for a
   * `pr_wait` bead that is the `done` attempt that opened the PR, and for a
   * second conflict (base moved again) it is the previous resolution attempt.
   *
   * Cap-exempt by design: this is human-click-originated, exactly like a manual
   * resume (worker-phase1 §2.3), so it does not wait for a free slot.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function resolveConflict(workspace, bead_id) {
    const q = deps.store.snapshot(workspace);
    /** @type {any|null} */
    let source = null;
    let source_at = -1;
    for (const a of Object.values(q.attempts || {})) {
      if (!a || a.bead_id !== bead_id) {
        continue;
      }
      if (typeof a.session_id !== 'string' || a.session_id.length === 0) {
        continue;
      }
      const at =
        typeof a.finished_at === 'number'
          ? a.finished_at
          : typeof a.started_at === 'number'
            ? a.started_at
            : 0;
      if (at >= source_at) {
        source = a;
        source_at = at;
      }
    }
    if (!source) {
      return { ok: false, reason: 'no_session_id' };
    }
    if (claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.bead_id === bead_id && a.status === 'running') {
        return { ok: false, reason: 'bead_running' };
      }
    }
    const repo = typeof source.repo === 'string' ? source.repo : '';
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : true;
    if (!wt_present) {
      return { ok: false, reason: 'worktree_missing' };
    }
    const target_base =
      typeof source.target_base === 'string' ? source.target_base : 'main';
    return relaunchFromAttempt(workspace, source, {
      prompt: conflictPrompt(bead_id, target_base),
      conflict_resolution: true
    });
  }

  /**
   * Dispatch a conflict-resolution session for an EXTERNAL PR row (UI-w0hi §1):
   * a bead an ordinary session delivered a PR for, which the durable lanes and
   * the attempt registry never held.
   *
   * {@link resolveConflict} cannot serve it — it relaunches FROM an attempt, so
   * a bead with none is refused `no_session_id` every time. The way out is that
   * {@link conflictPrompt} is self-contained (fetch, merge base into branch,
   * preserve both intents, verify, push, never merge the PR): the original
   * session's context improves the result, it is not an input the task needs.
   * So this mints a FRESH attempt-less session instead — `resume_session_id`
   * null, `dispatchReviseFix`'s precedent — in the worktree the shared
   * `<repo>/.worktrees/<bead-id>` convention already put there.
   *
   * The four guards refuse BEFORE anything is recorded, because none of them is
   * a session that failed: `bead_running` (a resolution is already up),
   * `not_external` (the click is about a row this registry does not know —
   * fail-closed when the registry is not wired at all), `bd_snapshot_failed`
   * (nothing to resolve exec settings or the repo from), `worktree_missing`
   * (this path never recreates one).
   *
   * `snapshotBead` is read for the repo AND the exec settings, but its
   * `ready`/`blocked` verdict is deliberately NOT consulted: an external bead is
   * `resolved`, hence always blocked. This is a human click on an existing PR,
   * not a queue dispatch.
   *
   * Cap-exempt like every other human-click dispatch.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} [target_base] - The base branch the CLICK observed on the
   * PR (pr-actions §2); empty/absent falls back to `main`.
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function dispatchExternalConflict(workspace, bead_id, target_base) {
    const q = deps.store.snapshot(workspace);
    if (claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.bead_id === bead_id && a.status === 'running') {
        return { ok: false, reason: 'bead_running' };
      }
    }
    // The registry IS the evidence that this bead is an external row. Without
    // the dep there is no evidence at all, which is a refusal, not a pass.
    if (!deps.externalPrs || !deps.externalPrs.get(workspace, bead_id)) {
      return { ok: false, reason: 'not_external' };
    }
    /** @type {BeadSnapshot} */
    let snap;
    try {
      snap = await deps.bd.snapshotBead(bead_id);
    } catch {
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const repo = snap.repo;
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : true;
    if (!wt_present) {
      return { ok: false, reason: 'worktree_missing' };
    }

    const base =
      typeof target_base === 'string' && target_base.length > 0
        ? target_base
        : 'main';
    // Resolved from scratch, not inherited: there is no prior attempt to carry
    // a snapshot forward from, so this is the queue dispatch's contract
    // verbatim (bead metadata > workspace default > hardcoded fallback), with
    // the same stamp-and-revert duty for the globally-filled keys.
    const exec = resolveExecSettings({
      bead: snap,
      defaults: deps.store.snapshot(workspace).exec_defaults
    });
    const runner_name = 'claude';
    const attempt_id = makeAttemptId(bead_id);
    const prior = snap.workflow_mode ?? null;
    const stamped_keys = exec.stamped_keys;
    /** @type {Record<string, string>} */
    const exec_values = {};
    for (const key of stamped_keys) {
      const value = /** @type {Record<string, string>} */ (
        /** @type {any} */ (exec)
      )[key];
      if (typeof value === 'string') {
        exec_values[key] = value;
      }
    }

    claimed.add(bead_id);

    // DURABLE pre-record before the first metadata write, exactly as the queue
    // dispatch does it: a crash between here and spawn leaves a record a
    // restart can revert the stamps from. `base_oid` stays null — this dispatch
    // creates no worktree and passes no admission, so there is no pinned base
    // to honestly record.
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        repo,
        target_base: base,
        base_oid: null,
        runner: runner_name,
        model: exec.orchestration_model ?? null,
        effort: exec.orchestration_effort ?? null,
        workflow_mode_prior: prior,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values: stamped_keys.length > 0 ? exec_values : null,
        conflict_resolution: true,
        external_conflict: true,
        status: 'running',
        pid: null
      }
    });

    let mode_ok = false;
    try {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
      const rb = await deps.bd.readMetadata(bead_id, 'workflow_mode');
      mode_ok = rb === 'fast_track';
    } catch (err) {
      log(
        'external conflict workflow_mode set/readback failed for %s: %o',
        bead_id,
        err
      );
      mode_ok = false;
    }
    if (!mode_ok) {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          status: 'failed',
          cause: 'workflow_mode_record_failed',
          finished_at: now()
        }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'workflow_mode_record_failed',
        repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'workflow_mode_record_failed' };
    }

    let exec_ok = true;
    for (const key of stamped_keys) {
      const value = exec_values[key];
      if (typeof value !== 'string') {
        continue;
      }
      try {
        await deps.bd.setMetadata(bead_id, key, value);
        const rb = await deps.bd.readMetadata(bead_id, key);
        if (rb !== value) {
          log(
            'external conflict exec stamp readback mismatch for %s %s: expected %o, got %o',
            bead_id,
            key,
            value,
            rb
          );
          exec_ok = false;
          break;
        }
      } catch (err) {
        log(
          'external conflict exec stamp failed for %s %s: %o',
          bead_id,
          key,
          err
        );
        exec_ok = false;
        break;
      }
    }
    if (!exec_ok) {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          status: 'failed',
          cause: 'exec_stamp_failed',
          finished_at: now()
        }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'exec_stamp_failed',
        repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'exec_stamp_failed' };
    }

    const launched = await launchSession({
      workspace,
      attempt_id,
      bead_id,
      repo,
      target_base: base,
      base_oid: null,
      runner_name,
      model: exec.orchestration_model ?? null,
      effort: exec.orchestration_effort ?? null,
      prior_wf: prior,
      stamped_keys,
      wt_path:
        typeof deps.worktree.pathFor === 'function'
          ? deps.worktree.pathFor(repo, bead_id)
          : '',
      launch_kind: 'conflict',
      // A FRESH session, not a resume: an external row carries no session id to
      // continue, and the prompt is self-contained.
      resume_session_id: null,
      conflict_resolution: true,
      spawnBead: { id: bead_id, prompt: conflictPrompt(bead_id, base) }
    });
    if (!launched.ok) {
      return { ok: false, reason: launched.reason || 'spawn_failed' };
    }
    return { ok: true, attempt_id };
  }

  /**
   * Shared relaunch tail for a manual resume AND a conflict-resolution dispatch:
   * mint a child attempt inheriting the source snapshot verbatim, re-stamp
   * workflow_mode + the exec keys from the PRIOR values, and hand off to the
   * launch tail with the adapter's `--resume` argv. Every refusal here is a
   * recorded FAILED child attempt with the stamps rolled back.
   *
   * `disposition` marks the child as a REVISE-disposition attempt (UI-hs11
   * §3.3), which changes three things: the record carries the kind (so the
   * termination path takes the disposition verdict), the session runs WITHOUT
   * the PR-submit directive, and `cwd`/`resume` may point it at the shared
   * target_base checkout instead of the bead worktree.
   *
   * @param {string} workspace
   * @param {any} prior - The source attempt record (guards already passed).
   * @param {{ prompt: string, conflict_resolution: boolean, disposition?: string|null, disposition_receipt?: string|null, cwd?: string|null, resume?: boolean }} options
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function relaunchFromAttempt(workspace, prior, options) {
    const bead_id = prior.bead_id;
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    const attempt_id = prior.attempt_id;
    const runner_name = 'claude';

    // The ancestor is spent from here on: nothing can discard it any more, so
    // its parked `done` promise must not outlive the relaunch.
    paused_done.delete(attempt_id);
    claimed.add(bead_id);

    const new_attempt_id = makeAttemptId(bead_id);
    const target_base =
      typeof prior.target_base === 'string' ? prior.target_base : 'main';
    const prior_wf =
      typeof prior.workflow_mode_prior === 'string'
        ? prior.workflow_mode_prior
        : null;
    const stamped_keys = Array.isArray(prior.exec_stamped_keys)
      ? prior.exec_stamped_keys
      : [];
    const exec_values =
      prior.exec_values && typeof prior.exec_values === 'object'
        ? /** @type {Record<string, string>} */ (prior.exec_values)
        : {};

    // Mint the new attempt inheriting the PRIOR snapshot verbatim (§1.3): repo/
    // target_base/base_oid/runner/model/effort — never re-resolved from current
    // globals. The retired merge-axis fields are NOT copied forward: history
    // keeps them on the old record, new attempts stop writing them (§9).
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id: new_attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id: new_attempt_id,
      patch: {
        repo,
        target_base,
        base_oid: prior.base_oid ?? null,
        runner: runner_name,
        model: prior.model ?? null,
        effort: prior.effort ?? null,
        workflow_mode_prior: prior_wf,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values: stamped_keys.length > 0 ? exec_values : null,
        resumed_from: attempt_id,
        conflict_resolution: options.conflict_resolution,
        // INHERITED, never re-derived (UI-w0hi §1): a child of an external
        // resolution is still working an external bead, and losing the flag
        // would send its successful termination down the ordinary arm — which
        // injects the bead into the durable `pr_wait` lane the external overlay
        // owns. The identifier has to survive every relaunch, not just a
        // restart.
        external_conflict: prior.external_conflict === true,
        disposition: options.disposition ?? null,
        disposition_receipt: options.disposition_receipt ?? null,
        disposition_resume: options.disposition
          ? options.resume !== false
          : false,
        disposition_prompt: options.disposition ? options.prompt : null,
        status: 'running',
        pid: null
      }
    });

    // Re-stamp workflow_mode=fast_track from the PRIOR snapshot (set + readback).
    let mode_ok = false;
    try {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
      const rb = await deps.bd.readMetadata(bead_id, 'workflow_mode');
      mode_ok = rb === 'fast_track';
    } catch (err) {
      log('resume workflow_mode set/readback failed for %s: %o', bead_id, err);
      mode_ok = false;
    }
    if (!mode_ok) {
      deps.store.updateAttempt(workspace, {
        attempt_id: new_attempt_id,
        patch: {
          status: 'failed',
          cause: 'workflow_mode_record_failed',
          finished_at: now()
        }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'workflow_mode_record_failed',
        repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'workflow_mode_record_failed' };
    }

    // Re-stamp the exec keys with the PRIOR values (set + confirming readback).
    let exec_ok = true;
    for (const key of stamped_keys) {
      const value = exec_values[key];
      if (typeof value !== 'string') {
        continue;
      }
      try {
        await deps.bd.setMetadata(bead_id, key, value);
        const rb = await deps.bd.readMetadata(bead_id, key);
        if (rb !== value) {
          exec_ok = false;
          break;
        }
      } catch (err) {
        log('resume exec stamp failed for %s %s: %o', bead_id, key, err);
        exec_ok = false;
        break;
      }
    }
    if (!exec_ok) {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id: new_attempt_id,
        patch: {
          status: 'failed',
          cause: 'exec_stamp_failed',
          finished_at: now()
        }
      });
      notifyLifecycle('attemptFailed', {
        bead_id,
        cause: 'exec_stamp_failed',
        repo,
        cause_detail: null
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'exec_stamp_failed' };
    }

    // Reuse the existing worktree — no worktree.add / admission re-check (§1.3).
    // A disposition may override the cwd: its edits belong to the shared
    // target_base checkout, not to this bead's branch worktree.
    const wt_path =
      options.cwd ||
      (typeof deps.worktree.pathFor === 'function'
        ? deps.worktree.pathFor(repo, bead_id)
        : '');
    const resume_session_id =
      options.resume === false ? null : prior.session_id;
    const launched = await launchSession({
      workspace,
      attempt_id: new_attempt_id,
      bead_id,
      repo,
      target_base,
      base_oid: prior.base_oid ?? null,
      runner_name,
      model: prior.model ?? null,
      effort: prior.effort ?? null,
      prior_wf,
      stamped_keys,
      wt_path,
      launch_kind: options.disposition
        ? 'disposition'
        : options.conflict_resolution
          ? 'conflict'
          : 'resume',
      spawnBead: {
        id: bead_id,
        prompt: options.prompt
      },
      resume_session_id,
      conflict_resolution: options.conflict_resolution,
      disposition: options.disposition ?? null
    });
    if (!launched.ok) {
      return { ok: false, reason: launched.reason || 'spawn_failed' };
    }

    return { ok: true, attempt_id: new_attempt_id };
  }

  /**
   * Dispatch the REVISE-disposition (finding acceptance) session for a parked
   * bead (UI-hs11 §3.3). It reuses the relaunch machinery — a child attempt
   * carrying `resumed_from`, the prior snapshot inherited verbatim, the same
   * re-stamped metadata — and differs in exactly three ways: the record carries
   * `disposition`, the session runs in the SHARED target_base checkout (its
   * edits land on the base, not on a bead branch), and the runner is told to
   * open no PR.
   *
   * The `--resume` argv is used only when the bead's worktree still exists:
   * the runner's session store is keyed by the directory the session ran in, so
   * resuming from a different cwd could not find the transcript. Without it the
   * fallback is a fresh session carrying the same prompt, whose lineage the
   * bead's own notes supply.
   *
   * Cap-exempt like every other human-click dispatch.
   *
   * @param {string} workspace
   * @param {{ bead_id: string, attempt_id: string, prompt: string, prior_receipt?: string|null, resume?: boolean }} input
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function dispatchReviseFix(workspace, input) {
    const { bead_id, attempt_id, prompt } = input;
    const q = deps.store.snapshot(workspace);
    const prior = q.attempts ? q.attempts[attempt_id] : null;
    if (!prior || prior.bead_id !== bead_id) {
      return { ok: false, reason: 'attempt_not_found' };
    }
    if (claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.bead_id === bead_id && a.status === 'running') {
        return { ok: false, reason: 'bead_running' };
      }
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.resumed_from === attempt_id) {
        return { ok: false, reason: 'already_resumed' };
      }
    }
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    if (repo.length === 0) {
      return { ok: false, reason: 'repo_unknown' };
    }
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : false;
    const has_session =
      typeof prior.session_id === 'string' && prior.session_id.length > 0;
    // `input.resume === false` is the substitute-session retry: the first
    // launch's `--resume` found no transcript, so this one starts fresh.
    const resume = input.resume !== false && wt_present && has_session;
    return relaunchFromAttempt(workspace, prior, {
      prompt,
      conflict_resolution: false,
      disposition: 'revise_fix',
      disposition_receipt:
        input.prior_receipt !== undefined
          ? input.prior_receipt
          : (prior.disposition_receipt ?? null),
      // Resuming needs the ORIGINAL cwd; a fresh session goes straight to the
      // shared checkout the repair is committed on.
      cwd: resume
        ? typeof deps.worktree.pathFor === 'function'
          ? deps.worktree.pathFor(repo, bead_id)
          : repo
        : repo,
      resume
    });
  }

  /**
   * Externally-initiated tick: reopens dispatch-refused beads for a fresh
   * attempt, then runs one dispatch pass.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  async function tick(workspace) {
    dispatch_refused.clear();
    await tickPass(workspace);
  }

  /**
   * One dispatch pass (worker-phase2 §3): ONE ordered scan of the single
   * waiting lane, filling the free slots of the store-owned cap.
   *
   * Every skip rule of the retired two-lane scan is preserved verbatim — a
   * claimed bead, a dispatch-refused bead, a leaf-paused bead, a bd snapshot
   * failure, a not-ready/blocked bead, and an admission refusal all SKIP to the
   * next entry rather than stopping the scan. That skip-don't-stop rule is the
   * anti-starvation guarantee: one inadmissible head can never hold the queue.
   *
   * The three skips that reflect the BEAD's own state (snapshot failure,
   * not-ready, admission refusal) record a reason the UI renders as a badge.
   * The other three are already visible as a running tile, a just-recorded
   * refusal, and a user-paused attempt.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  async function tickPass(workspace) {
    const q = deps.store.snapshot(workspace);
    if (!q.auto_advance) {
      return;
    }
    const paused_beads = leafPausedBeads(q);

    /** @type {Array<{ bead_id: string, snap: BeadSnapshot }>} */
    const to_dispatch = [];

    // Occupancy is `claimed`, NOT `running`: a dispatch that has taken its claim
    // but has not spawned yet already owns a slot, and a refusal's re-entrant
    // pass would otherwise count those in-flight siblings as free and overbook.
    //
    // `claimed` alone is complete only while THIS server's lifetime contains
    // every attempt's lifetime. A detached session survives the restart that
    // empties the Set, so a durable `running` attempt no part of this process
    // owns counts too — selected behind the same three fences
    // {@link reconcile} picks orphans with, so both sides define "orphan"
    // identically and cannot drift apart. The union is keyed by BEAD, matching
    // what the cap limits, so a bead in both sets is never counted twice.
    const occupied = new Set(claimed);
    for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (!a || a.status !== 'running') {
        continue;
      }
      if (
        running.has(attempt_id) ||
        settling.has(attempt_id) ||
        claimed.has(a.bead_id)
      ) {
        continue;
      }
      // Same judgment as dispose, opposite safe default: an unprobeable attempt
      // reads as NOT dead, which here spends one slot less instead of
      // overbooking — the two consumers' risks point in opposite directions.
      if (!isDeadAttempt(a)) {
        occupied.add(a.bead_id);
      }
    }
    let free = slotsOf(q) - occupied.size;
    for (const entry of q.queue) {
      if (free <= 0) {
        break;
      }
      // A stop whose residue cleanup is still in flight: RECORDED, not silent —
      // a silent skip is the exact failure mode this phase removes.
      if (cleanup_pending.has(entry.bead_id)) {
        recordSkipReason(workspace, entry.bead_id, 'stop_cleanup_pending');
        continue;
      }
      if (
        claimed.has(entry.bead_id) ||
        dispatch_refused.has(entry.bead_id) ||
        paused_beads.has(entry.bead_id)
      ) {
        continue;
      }
      let snap;
      try {
        snap = await deps.bd.snapshotBead(entry.bead_id);
      } catch {
        recordSkipReason(workspace, entry.bead_id, 'bd_snapshot_failed');
        continue;
      }
      if (!snap.ready || snap.blocked) {
        if (!dequeueIfClosed(workspace, entry.bead_id, snap)) {
          recordSkipReason(workspace, entry.bead_id, notReadyReason(snap));
        }
        continue;
      }
      const adm = await checkAdmission(snap);
      if (!adm.ok) {
        recordSkipReason(workspace, entry.bead_id, adm.reason || 'git_error');
        continue;
      }
      // Admitted-but-stale: badge it and dispatch anyway. The scan's verdict is
      // display only — the dispatch re-check, pinned to the worktree base_oid,
      // is what the session prompt is built from (UI-dlim §3.2).
      if (adm.stale) {
        recordStale(workspace, entry.bead_id);
      }
      to_dispatch.push({ bead_id: entry.bead_id, snap });
      free -= 1;
    }

    // Claim synchronously, then dispatch (dispatch re-reads authoritatively).
    //
    // The lane is re-read HERE, in the same synchronous block as the claim: the
    // scan above spans awaits (bd snapshot, admission), and the closed-queue
    // sweep runs on the poller cadence inside one of those windows. A bead the
    // sweep completed into `done` while this pass was awaiting is no longer a
    // queue member, and launching it would both run finished work and delete
    // the `done` row the sweep just wrote. Nothing can move a bead between this
    // read and the claim, so the check is not merely advisory.
    const live_queue = new Set(
      deps.store
        .snapshot(workspace)
        .queue.map((/** @type {{ bead_id: string }} */ e) => e.bead_id)
    );
    const to_launch = to_dispatch.filter((d) => live_queue.has(d.bead_id));
    for (const d of to_launch) {
      claimed.add(d.bead_id);
    }
    await Promise.all(to_launch.map((d) => dispatch(workspace, d.bead_id)));
  }

  /**
   * Tear down a live session for a user-initiated halt (⏸ and ■ share this).
   * Group-kills the tree and drops the claim. `auto_advance` is untouched — a
   * user halt of ONE attempt is not a failure (spec §5.2).
   *
   * @param {string} attempt_id
   * @param {{ bead_id: string, handle: RunnerHandle }} entry
   */
  function teardownLiveSession(attempt_id, entry) {
    stopped.add(attempt_id);
    try {
      entry.handle.kill('SIGTERM');
    } catch {
      // Best-effort; the process may already be gone.
    }
    running.delete(attempt_id);
    claimed.delete(entry.bead_id);
  }

  /**
   * Revert the bead metadata a halted attempt stamped: workflow_mode back to
   * its pre-launch value, plus any exec-setting stamps. Both are best-effort —
   * the terminal attempt record already reflects the halt.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {{ bead_id: string, prior: string|null }} entry
   */
  async function revertStamps(workspace, attempt_id, entry) {
    try {
      await revertWorkflowMode(entry.bead_id, entry.prior);
    } catch {
      // Best-effort: bd may be down; the terminal record already reflects it.
    }
    await revertExecStamps(
      entry.bead_id,
      execStampedKeysOf(workspace, attempt_id)
    );
  }

  /**
   * Pause a running attempt (tile ⏸, worker-phase1 §2.1). Same teardown as ■,
   * but the attempt lands in `paused` — resumable, never a failure — and the
   * bead STAYS in its lane. The worktree and session log are preserved so
   * `claude --resume <session_id>` can continue in place.
   *
   * Fail-closed on a missing session id: without it the attempt could never be
   * resumed, so pausing would silently become a discard.
   *
   * Ends with a `tick()` so the freed slot advances the queue (§2.1/§2.3) —
   * pausing one session must not stall the whole lane.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function pause(workspace, attempt_id) {
    const entry = running.get(attempt_id);
    if (!entry) {
      return { ok: false, reason: 'not_running' };
    }
    const rec = deps.store.snapshot(workspace).attempts[attempt_id];
    const sid = rec && rec.session_id;
    if (typeof sid !== 'string' || sid.length === 0) {
      return { ok: false, reason: 'no_session_id' };
    }
    // SIGTERM below does not wait for the exit, so a ■ arriving right after
    // this pause must be able to wait for the same process (see `paused_done`).
    const done = entry.handle.done;
    paused_done.set(attempt_id, done);
    const forgetDone = () => {
      paused_done.delete(attempt_id);
    };
    done.then(forgetDone, forgetDone);
    teardownLiveSession(attempt_id, entry);
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'paused',
        cause: null,
        finished_at: now(),
        ...usagePatch(workspace, attempt_id)
      }
    });
    await revertStamps(workspace, attempt_id, entry);
    notifyChanged(workspace);
    await tick(workspace);
    return { ok: true };
  }

  /**
   * Discard an attempt (tile ■, worker-phase1 §2.2). Terminal: the attempt
   * lands in `stopped` and the bead leaves every lane, so the tick that follows
   * cannot re-dispatch the work the user just abandoned. Re-running means
   * re-queueing the bead from the candidate list.
   *
   * The state write and the lane removal go through ONE store mutation — split
   * across two writes, a crash in between would leave a stopped attempt whose
   * bead is still queued.
   *
   * Also accepts a leaf `paused` attempt (its process is already gone): that
   * path only transitions the record and clears the lane.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<boolean>} True when an attempt was discarded.
   */
  async function stop(workspace, attempt_id) {
    const entry = running.get(attempt_id);
    if (entry) {
      const base = attemptBase(workspace, attempt_id);
      // Fenced from the moment of the halt: the residue check below runs only
      // after the killed process is gone, and a re-dispatch in that window
      // would race the teardown.
      cleanup_pending.add(entry.bead_id);
      const done = entry.handle.done;
      teardownLiveSession(attempt_id, entry);
      deps.store.discardAttempt(workspace, {
        attempt_id,
        bead_id: entry.bead_id,
        patch: {
          status: 'stopped',
          cause: null,
          finished_at: now(),
          ...usagePatch(workspace, attempt_id)
        }
      });
      await revertStamps(workspace, attempt_id, entry);
      // The bead already left the lane above, so the reopen cannot re-dispatch
      // it here; leaving the claim would silently skip it on a later re-queue.
      await releaseBeadClaim(entry.bead_id);
      // SIGTERM does not wait for the exit, so the residue check rides on the
      // handle's own `done` — checking now could clear a worktree the dying
      // process is still writing to. It is deliberately NOT awaited: stop()
      // must return to its ws caller even if the process ignores the signal.
      done.then(
        () => finishStopCleanup(workspace, entry.repo, entry.bead_id, base),
        () => {
          // A rejected `done` leaves the exit state unknown — keep the residue
          // (the dispatch pre-flight is the next defence) and lift the fence.
          cleanup_pending.delete(entry.bead_id);
        }
      );
      notifyChanged(workspace);
      await tick(workspace);
      return true;
    }
    // No live process: a paused attempt discarded from its tile. Stamps were
    // already reverted at pause time.
    const snap = deps.store.snapshot(workspace);
    const rec = snap.attempts[attempt_id];
    if (!rec || rec.status !== 'paused') {
      return false;
    }
    // Leaf guard (§1.1): a resumed ancestor stays `paused` forever, and a
    // client rendering a stale tile could otherwise ■ it — pulling the bead of
    // the RUNNING child out of the lane. Server-side because resume fans out
    // only after its bd writes and spawn complete, leaving a real window.
    for (const a of Object.values(snap.attempts || {})) {
      if (a && a.resumed_from === attempt_id) {
        return false;
      }
    }
    // `pause()` only signalled the process; it never waited for the exit. When
    // that promise is still held, the discard owes the same wait a live stop
    // does — otherwise the residue check races a process that is still writing.
    const pending_done = paused_done.get(attempt_id);
    paused_done.delete(attempt_id);
    const repo = typeof rec.repo === 'string' ? rec.repo : '';
    const base = attemptBase(workspace, attempt_id);
    if (pending_done) {
      cleanup_pending.add(rec.bead_id);
    }
    deps.store.discardAttempt(workspace, {
      attempt_id,
      bead_id: rec.bead_id,
      patch: { status: 'stopped', cause: null, finished_at: now() }
    });
    await releaseBeadClaim(rec.bead_id);
    if (pending_done) {
      // Detached exactly like the live path: stop() must answer its ws caller
      // even when the paused process ignores the signal.
      pending_done.then(
        () => finishStopCleanup(workspace, repo, rec.bead_id, base),
        () => {
          // Unknown exit state — keep the residue, lift the fence (the dispatch
          // pre-flight is the next defence).
          cleanup_pending.delete(rec.bead_id);
        }
      );
    } else {
      // A paused record with no live handle (restored after a restart): the
      // process is long gone, so the residue is settled inline.
      await cleanupStopResidue(repo, rec.bead_id, base);
    }
    notifyChanged(workspace);
    await tick(workspace);
    return true;
  }

  return {
    tick,
    stop,
    pause,
    resume,
    resolveConflict,
    dispatchExternalConflict,
    dispatchReviseFix,
    reconcile,
    sweepClosedQueue,
    activeBeadIds,
    externalProtectedBeadIds,
    runningCount() {
      return running.size;
    },
    runningBeads() {
      return Array.from(running.values()).map((r) => r.bead_id);
    },
    /**
     * @param {string} bead_id
     * @returns {boolean}
     */
    isRunning(bead_id) {
      return claimed.has(bead_id);
    }
  };
}
