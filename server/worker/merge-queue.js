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
import {
  GITHUB_FAILURE_CLASS_LABELS,
  GITHUB_FAILURE_PHRASES,
  GITHUB_HEAD_UNREADABLE,
  GITHUB_UNREACHABLE,
  GITHUB_WAIT_POINT_LABELS,
  VERIFY_CANDIDATE_MOVED,
  isGithubHold,
  isGithubWaitHold
} from '../../app/utils/github-wait.js';
import { timingSeconds } from '../timing-settings.js';
import { failureTokenSummary } from './failure-class.js';
import { foreignHandoffCauseOf } from './foreign-handoff.js';
import { isTransientGithubFailure } from './gh.js';
import { conditionWaitPolicy } from './repo-operation-policy.js';
import { cleanupRetryParked } from './resolution-ladder.js';

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
 * The resolution wait in effect right now, in ms: the server-global timing
 * setting `merge_resolution_wait_seconds` (UI-ny0h). {@link RESOLUTION_WAIT_MS}
 * is its default.
 *
 * @returns {number}
 */
export function resolutionWaitSettingMs() {
  return timingSeconds('merge_resolution_wait_seconds') * 1000;
}

/**
 * The unconfirmed-merge re-observation interval in effect right now, in ms
 * (`merge_unconfirmed_poll_seconds`; {@link UNCONFIRMED_POLL_MS} is its default).
 *
 * @returns {number}
 */
export function unconfirmedPollSettingMs() {
  return timingSeconds('merge_unconfirmed_poll_seconds') * 1000;
}

/**
 * The unconfirmed-merge wait cap in effect right now, in ms
 * (`merge_unconfirmed_wait_seconds`; {@link UNCONFIRMED_WAIT_MS} is its default).
 *
 * @returns {number}
 */
export function unconfirmedWaitSettingMs() {
  return timingSeconds('merge_unconfirmed_wait_seconds') * 1000;
}

/**
 * How long a connection wait stands, from its `since`, before its one push
 * (UI-aui8 §3.8): the timing setting `merge_github_wait_notify_seconds`, read
 * at each rejudge like the other merge-queue waits.
 *
 * @returns {number}
 */
export function githubWaitNotifySettingMs() {
  return timingSeconds('merge_github_wait_notify_seconds') * 1000;
}

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
 * The one line each `merge()` disposition puts on the bead's timeline
 * (record-timeline-retention §5). Keyed by the SIX dispositions the header
 * above already enumerates, so a new disposition shows up here as a missing
 * label rather than as a silently absent event.
 *
 * @type {Readonly<Record<string, string>>}
 */
const MERGE_STEP_LABELS = Object.freeze({
  merged: 'squash 머지 완료',
  updated_and_merged: 'base 동기화 후 squash 머지 완료',
  already_merged: '이미 머지됨',
  cleanup_pending: '머지 완료 · 정리 진행 중',
  merge_unconfirmed: '머지 확인 대기',
  conflict_resolution: '충돌 해소 세션 디스패치',
  refused: '머지 보류'
});

/**
 * How many consecutive pre-merge rechecks of one turn may see the candidate
 * move before the item is excluded (UI-aui8 §3.4). The completion intent
 * ends on the same count (§3.7).
 */
export const MOVED_CANDIDATE_LIMIT = 3;

/**
 * The head a permanent GitHub failure was read on (UI-aui8 §3.6) — the head
 * its exclusion is pinned to — or null when the result names no GitHub
 * failure class or no full SHA.
 *
 * @param {{ failure_class?: string|null }|null|undefined} result
 * @param {string|null|undefined} head_sha
 * @returns {string|null}
 */
function permanentGithubHead(result, head_sha) {
  if (
    !result ||
    typeof result.failure_class !== 'string' ||
    isTransientGithubFailure(result.failure_class) ||
    typeof head_sha !== 'string' ||
    !SHA40_RE.test(head_sha)
  ) {
    return null;
  }
  return head_sha;
}

/**
 * One item's post-merge confirm wait, read for its GitHub outcome (UI-aui8
 * §3.5, §3.6): when an observation first failed transiently, and the GitHub
 * failure class of the last observation (null when it was no GitHub
 * failure).
 *
 * @typedef {Object} UnconfirmedGithubWait
 * @property {number|null} first_transient_at
 * @property {string|null} last_class
 */

/**
 * Where one workspace's GitHub holds are read and written (UI-aui8 §3.7).
 * The merge queue and the completion intent share this one record on the
 * queued item, so an item has one hold identity, one `since` and one
 * notification marker whichever of the two observed the failure.
 *
 * @typedef {Object} GithubHoldContext
 * @property {string} workspace
 * @property {{ snapshot: (workspace: string) => any, setMergeHold: (workspace: string, input: any) => { ok: boolean } }} store
 * @property {{ append: (input: any) => unknown }|null} [timeline]
 * @property {() => number} now
 * @property {(...args: any[]) => void} log
 * @property {((notice: GithubHoldNotice) => unknown)|null} [announce] - The
 * one push of a hold (§3.6, §3.8). Absent, no hold is marked or sent.
 * @property {() => number} [notifyAfterMs] - How long a connection wait
 * stands before its push; the timing setting when absent.
 */

/**
 * What the one push of a GitHub hold says (UI-aui8 §3.8).
 *
 * @typedef {Object} GithubHoldNotice
 * @property {string} bead_id
 * @property {string} reason
 * @property {number} since
 * @property {string} head_sha
 * @property {string|null} failure_class
 * @property {string|null} wait_point
 */

/**
 * @typedef {Object} GithubHoldInput
 * @property {string} reason
 * @property {string|null} [head_sha]
 * @property {string|null} [failure_class]
 * @property {string|null} [wait_point]
 * @property {number|null} [since]
 * @property {import('./queue-store.js').LostBaseUpdate|null} [base_update] -
 * The base update whose answer was lost (§3.2); omitted keeps the stored one.
 */

/**
 * The GitHub hold (UI-aui8 §3.3, §3.6) the queued item stands on, or null
 * when it is not queued, stands on another hold, or the snapshot is
 * unreadable.
 *
 * @param {GithubHoldContext} ctx
 * @param {string} bead_id
 * @returns {import('./queue-store.js').MergeHold|null}
 */
export function queuedGithubHold(ctx, bead_id) {
  let q;
  try {
    q = ctx.store.snapshot(ctx.workspace);
  } catch {
    return null;
  }
  const lane = q && Array.isArray(q.merge_queue) ? q.merge_queue : [];
  const entry = lane.find((/** @type {any} */ e) => e.bead_id === bead_id);
  const hold = entry ? entry.hold : null;
  return isGithubHold(hold) ? hold : null;
}

/**
 * The one history line a GitHub hold writes when it starts or ends (UI-aui8
 * §3.9). The id is the hold's own identity — reason plus `since` — so a
 * replay of the same line dedupes, and the per-attempt `m<n>` numbering
 * never sees it.
 *
 * @param {GithubHoldContext} ctx
 * @param {string} bead_id
 * @param {{ reason: string, since: number, wait_point?: string|null, failure_class?: string|null }} hold
 * @param {'start'|'end'} edge
 */
function appendGithubHoldLine(ctx, bead_id, hold, edge) {
  if (!ctx.timeline) {
    return;
  }
  const waiting = hold.reason === GITHUB_UNREACHABLE;
  const name = waiting ? 'GitHub 연결 대기' : 'GitHub 확인 실패 보류';
  const detail = waiting
    ? GITHUB_WAIT_POINT_LABELS[String(hold.wait_point)]
    : (GITHUB_FAILURE_PHRASES[String(hold.failure_class)] ??
      GITHUB_FAILURE_PHRASES.unknown);
  try {
    ctx.timeline.append({
      bead_id,
      kind: 'merge_step',
      seq: `gh-${hold.reason}-${hold.since}${edge === 'end' ? '-end' : ''}`,
      summary:
        edge === 'end'
          ? `머지 큐 · ${name} 끝`
          : `머지 큐 · ${name}${detail ? ` — ${detail}` : ''}`
    });
  } catch (err) {
    ctx.log('merge queue GitHub hold history failed for %s: %o', bead_id, err);
  }
}

/**
 * Write or refresh one queued item's GitHub hold (UI-aui8 §3.3, §3.6, §3.7).
 * The hold's identity is its reason: a refresh under the same reason keeps
 * `since` and the notification marker whatever the failure point or the head
 * now says, and only the start of a hold (or a change of reason) writes a
 * history line. A missing head keeps the one the hold already pinned.
 *
 * The write's three outcomes are kept apart: an unchanged record is the
 * normal re-judgment, a write that THROWS is `failed`, and the caller decides
 * what a failed write stops. Every write that sticks or is unchanged also
 * judges the hold's one push ({@link announceGithubHold}); the marker that
 * push writes makes the outcome `written`.
 *
 * @param {GithubHoldContext} ctx
 * @param {string} bead_id
 * @param {GithubHoldInput} input
 * @returns {'written'|'unchanged'|'failed'}
 */
export function writeGithubHold(ctx, bead_id, input) {
  const prior = queuedGithubHold(ctx, bead_id);
  const head_sha =
    typeof input.head_sha === 'string' && input.head_sha.length > 0
      ? input.head_sha
      : (prior?.head_sha ?? '');
  /** @type {'written'|'unchanged'|'failed'} */
  let outcome = 'unchanged';
  try {
    outcome = ctx.store.setMergeHold(ctx.workspace, {
      bead_id,
      hold: {
        reason: input.reason,
        head_sha,
        // A slot-fenced review hold this replaces must not hand its wait on.
        auto_review_wait: null,
        failure_class: input.failure_class ?? null,
        wait_point: input.wait_point ?? null,
        ...(typeof input.since === 'number' ? { since: input.since } : {}),
        ...(input.base_update !== undefined
          ? { base_update: input.base_update }
          : {})
      },
      at: ctx.now()
    }).ok
      ? 'written'
      : 'unchanged';
  } catch (err) {
    ctx.log('merge queue GitHub hold write failed for %s: %o', bead_id, err);
    return 'failed';
  }
  if (prior && prior.reason !== input.reason) {
    appendGithubHoldLine(ctx, bead_id, prior, 'end');
  }
  const stored = queuedGithubHold(ctx, bead_id);
  if (stored && (!prior || prior.reason !== stored.reason)) {
    appendGithubHoldLine(ctx, bead_id, stored, 'start');
  }
  const announced = stored ? announceGithubHold(ctx, bead_id, stored) : 'none';
  if (announced === 'failed') {
    return 'failed';
  }
  return announced === 'marked' ? 'written' : outcome;
}

/**
 * The one push of a GitHub hold (UI-aui8 §3.6, §3.8), judged at the rejudge
 * that wrote it: a connection wait once it has stood the notify setting from
 * `since`, a head-unreadable hold at once — waiting does not clear that
 * failure. A hold that already carries its marker sends nothing, and one
 * stored before the marker existed has not sent.
 *
 * The marker is written BEFORE the send, so a restart never sends twice; a
 * marker write that does not stick sends nothing and the next rejudge tries
 * again, and one that THROWS is a failed store write (§3.3) the caller ends
 * its drain on. The send is fire-and-forget and never retried: a failed push
 * blocks no queue transition.
 *
 * @param {GithubHoldContext} ctx
 * @param {string} bead_id
 * @param {import('./queue-store.js').MergeHold} hold
 * @returns {'marked'|'none'|'failed'} `marked` when the marker write changed
 * the queue file.
 */
function announceGithubHold(ctx, bead_id, hold) {
  if (!ctx.announce || typeof hold.notified_at === 'number') {
    return 'none';
  }
  const at = ctx.now();
  if (hold.reason === GITHUB_UNREACHABLE) {
    const after_ms = ctx.notifyAfterMs
      ? ctx.notifyAfterMs()
      : githubWaitNotifySettingMs();
    if (at - hold.since < after_ms) {
      return 'none';
    }
  }
  const failure_class = hold.failure_class ?? null;
  const wait_point = hold.wait_point ?? null;
  try {
    const marked = ctx.store.setMergeHold(ctx.workspace, {
      bead_id,
      hold: {
        reason: hold.reason,
        head_sha: hold.head_sha,
        failure_class,
        wait_point,
        notified_at: at
      },
      at
    }).ok;
    if (!marked) {
      return 'none';
    }
  } catch (err) {
    ctx.log('merge queue GitHub hold marker failed for %s: %o', bead_id, err);
    return 'failed';
  }
  /** @param {unknown} err */
  const pushFailed = (err) => {
    ctx.log('merge queue GitHub hold push failed for %s: %o', bead_id, err);
  };
  try {
    void Promise.resolve(
      ctx.announce({
        bead_id,
        reason: hold.reason,
        since: hold.since,
        head_sha: hold.head_sha,
        failure_class,
        wait_point
      })
    ).catch(pushFailed);
  } catch (err) {
    pushFailed(err);
  }
  return 'marked';
}

/**
 * End a GitHub hold at a final disposition (UI-aui8 §3.3, §3.7): release the
 * record if the item is still queued, then write its one closing history
 * line. A hold the item already left the queue with (a cleanup took it) still
 * gets its closing line from the copy the caller started under. A release
 * that THROWS is a failed store write (§3.3): the hold stands, no closing
 * line is written, and the caller ends its drain before any transition.
 *
 * @param {GithubHoldContext} ctx
 * @param {string} bead_id
 * @param {import('./queue-store.js').MergeHold|null} started - The GitHub
 * hold the caller started under, if any.
 * @returns {'released'|'unchanged'|'failed'} `released` when the release
 * changed the queue file.
 */
export function endGithubHold(ctx, bead_id, started) {
  const queued = queuedGithubHold(ctx, bead_id);
  const hold = queued ?? started;
  if (!hold) {
    return 'unchanged';
  }
  let released = false;
  if (queued) {
    try {
      released =
        ctx.store.setMergeHold(ctx.workspace, {
          bead_id,
          hold: null,
          at: ctx.now()
        }).ok === true;
    } catch (err) {
      ctx.log(
        'merge queue GitHub hold release failed for %s: %o',
        bead_id,
        err
      );
      return 'failed';
    }
  }
  appendGithubHoldLine(ctx, bead_id, hold, 'end');
  return released ? 'released' : 'unchanged';
}

/**
 * Build a workspace's merge driver.
 *
 * @param {{
 *   workspace: string,
 *   store: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   merge: (bead_id: string, options?: { retry_failed_cleanup?: boolean }) => Promise<MergeClickResult>,
 *   probeMergeability?: (bead_id: string) => Promise<{ ok: boolean, kind: 'merged'|'closed'|'dirty'|'behind'|'clean'|'blocked', reason: string|null, head_sha: string|null, base_ref: string|null, head_ref?: string|null, external: boolean, continuation?: 'verify', failure_class?: string, wait_point?: string, head_unread?: boolean }>,
 *   dispatchConflict?: (bead_id: string, approved: { head_sha: string, base_ref: string|null, head_ref: string|null }, resolution_wait: { queue_bead_id: string, wait_ms: number, manual_authority?: boolean, dispatch_head_sha: string, base_ref: string, head_ref: string }, continuation?: { continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }, decided?: () => boolean) => Promise<MergeClickResult>,
 *   baseContained?: (bead_id: string, input: { base_ref: string, head_ref: string, head_sha: string }) => Promise<'contained'|'not_contained'|'unreachable'|null>,
 *   observePr: (bead_id: string) => Promise<{ state?: string|null, error?: string|null, failure_class?: string }>,
 *   headSha?: (bead_id: string) => string|null,
 *   verifiedOperation?: (bead_id: string) => string|null,
 *   isExternalRow?: (bead_id: string) => boolean,
 *   conflictDispatchBlocked?: (queue_bead_id: string, subject_bead_id: string) => boolean,
 *   reviewDispatchBlocked?: (bead_id: string) => boolean,
 *   reviewSession?: { startAuto: (input: { bead_id: string, head_sha: string, head_ref: string|null, reason: string }) => Promise<{ ok: boolean, reason?: string }> },
 *   updateBase?: (bead_id: string) => Promise<{ ok: boolean, reason: string|null, result_head_sha: string|null, failure_class?: string }>,
 *   onCompletionResult?: (root_bead_id: string, subject_bead_id: string, result: MergeClickResult) => Promise<void>|void,
 *   prepare?: () => Promise<unknown>,
 *   subscribeQueueChanged?: (fn: (workspace: string) => void) => (() => void),
 *   notifyChanged?: (workspace: string) => void,
 *   timeline?: { append: (input: any) => unknown, readTimeline?: (bead_id: string, options?: any) => any[] },
 *   now?: () => number,
 *   conditionWaitPolicy?: () => import('./resolution-ladder.js').ConditionWaitPolicy|null,
 *   setTimer?: (fn: () => void, ms: number) => any,
 *   setResolutionPollTimer?: (fn: () => void, ms: number) => any,
 *   clearTimer?: (handle: any) => void,
 *   log?: (...args: any[]) => void,
 *   resolution_round_cap?: number,
 *   rebase_round_cap?: number,
 *   resolution_wait_ms?: number,
 *   unconfirmed_poll_ms?: number,
 *   unconfirmed_wait_ms?: number,
 *   announceGithubHold?: (notice: GithubHoldNotice) => unknown,
 *   github_wait_notify_ms?: number
 * }} deps
 */
export function createMergeQueue(deps) {
  const workspace = deps.workspace;
  const now = deps.now || (() => Date.now());
  // A cleanup waiting on a `[deploy]` condition (dotfiles-rnyd9) is parked
  // like a scheduled cleanup retry; null under a pin that predates it.
  const conditionWait =
    deps.conditionWaitPolicy || (() => conditionWaitPolicy());
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
  // The three waits are read when a timer or deadline is armed, so a timing
  // settings change reaches the next arming (UI-ny0h §3.3); `deps` overrides
  // pin a value for tests.
  const resolutionWaitMs = () =>
    deps.resolution_wait_ms ?? resolutionWaitSettingMs();
  const unconfirmedPollMs = () =>
    deps.unconfirmed_poll_ms ?? unconfirmedPollSettingMs();
  const unconfirmedWaitMs = () =>
    deps.unconfirmed_wait_ms ?? unconfirmedWaitSettingMs();

  let started = false;
  let stopped = false;
  let draining = false;
  let drain_requested = false;
  // True for exactly the synchronous span of `deps.notifyChanged` (UI-nfkp
  // §3.1). `emitQueueChanged` fans out synchronously, so this is enough for the
  // driver's own subscriber to tell the driver's own event from an external one.
  let self_notifying = false;
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
  /** @type {{ bead_id: string, operation_id: string|null }|null} */
  let halted_on_verify = null;
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
  /** @type {GithubHoldContext} */
  const github_hold_ctx = {
    workspace,
    store: deps.store,
    timeline: deps.timeline ?? null,
    now,
    log,
    announce: deps.announceGithubHold ?? null,
    notifyAfterMs: () =>
      deps.github_wait_notify_ms ?? githubWaitNotifySettingMs()
  };
  /** @type {(() => void)|null} */
  let unsubscribe = null;
  /** @type {(() => void)|null} */
  let wake_waiter = null;
  /** @type {any|null} */
  let resolution_poll_timer = null;

  function notify() {
    if (typeof deps.notifyChanged === 'function') {
      // Restore the ENCLOSING value rather than clearing: `start()`'s callback
      // re-enters `drain()` synchronously on a halt resume, and the pass it
      // starts notifies again — a hard reset would drop the flag while the
      // OUTER fanout is still running.
      const outer_self_notifying = self_notifying;
      try {
        self_notifying = true;
        deps.notifyChanged(workspace);
      } catch {
        // A broken fanout must never break the queue.
      } finally {
        self_notifying = outer_self_notifying;
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
          !cleanupRetryParked(q, entry.bead_id, now(), conditionWait()) &&
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
      // repeated blocked kick must add no revision and no `queue-changed` of
      // its own, because `hasHeldEntry()` turns that event into another drain
      // which re-judges this row. (The drain's own end-of-pass `notify()` is a
      // second, older path into the same re-drain — UI-nfkp owns it; this
      // write simply must not become a third.)
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
   * Put one item on a `foreign_handoff` hold (UI-k467 §3.7). Like a review
   * hold it keeps its slot and is re-judged on the next drain — a push to the
   * PR head or a pin/PR-base fix releases it without a click — but it never
   * spends a review lineage, and nothing here dispatches a resolver for it.
   *
   * @param {string} bead_id
   * @param {string} reason
   * @param {string|null|undefined} head_sha
   */
  function holdForeignHandoff(bead_id, reason, head_sha) {
    held_this_pass.add(bead_id);
    writeHold(bead_id, reason, head_sha, null);
    log('merge queue: %s held (%s)', bead_id, reason);
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
   * A GitHub hold (UI-aui8 §3.3) is NOT released here: passing the gate alone
   * is not its exit. It ends only at the turn's final disposition, through
   * {@link settleGithubHold}.
   *
   * @param {string} bead_id
   */
  function releaseHold(bead_id) {
    const hold = queuedEntry(bead_id)?.hold;
    if (!hold || isGithubHold(hold)) {
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
   * This queued item's GitHub hold (UI-aui8 §3.3, §3.6), if it stands on one.
   *
   * @param {string} bead_id
   * @returns {import('./queue-store.js').MergeHold|null}
   */
  function githubHoldOf(bead_id) {
    return queuedGithubHold(github_hold_ctx, bead_id);
  }

  /**
   * Decide a base update whose answer was lost (UI-aui8 §3.2) from an
   * observation that read the PR head. An unmoved head means the update did
   * not apply; a moved head means the PR is past that request, whoever moved
   * it, so the request is never resent as it was. The decided record is
   * cleared, and the gate judges the head it read like any other.
   *
   * @param {string} bead_id
   * @param {import('./queue-store.js').LostBaseUpdate} lost
   * @param {{ head_sha?: string|null }} observed
   * @returns {'applied'|'not_applied'|'undecided'|'failed'} `failed` when the
   * clearing write threw; this drain ends (UI-aui8 §3.3).
   */
  function decideLostBaseUpdate(bead_id, lost, observed) {
    const head =
      typeof observed.head_sha === 'string' && observed.head_sha.length > 0
        ? observed.head_sha.toLowerCase()
        : null;
    if (head === null) {
      return 'undecided';
    }
    const hold = githubHoldOf(bead_id);
    if (hold?.base_update) {
      try {
        deps.store.setMergeHold(workspace, {
          bead_id,
          hold: {
            reason: hold.reason,
            head_sha: hold.head_sha,
            failure_class: hold.failure_class ?? null,
            wait_point: hold.wait_point ?? null,
            base_update: null
          },
          at: now()
        });
      } catch (err) {
        log(
          'merge queue lost base update clear failed for %s: %o',
          bead_id,
          err
        );
        halted = true;
        notify();
        return 'failed';
      }
    }
    return head === lost.head_sha ? 'not_applied' : 'applied';
  }

  /**
   * Hold one item on a GitHub failure (UI-aui8 §3.3, §3.6) and take it out of
   * THIS pass. The item keeps its slot and its authority; no failure, no
   * exclusion and no dequeue is written, and its in-memory failure is cleared.
   * Identity, `since` and history follow {@link writeGithubHold}. A GitHub
   * hold never spends a review lineage, never dispatches a resolver and never
   * opens a failure conversation — it does not go through {@link holdEntry}.
   *
   * A write that THROWS ends this drain without a dequeue (UI-yk55 §3.2) —
   * the durable queue still holds the item.
   *
   * @param {string} bead_id
   * @param {GithubHoldInput} input
   * @returns {'written'|'unchanged'|'failed'}
   */
  function holdOnGithub(bead_id, input) {
    const outcome = writeGithubHold(github_hold_ctx, bead_id, input);
    if (outcome === 'failed') {
      halted = true;
      notify();
      return outcome;
    }
    const failure_cleared = failures.delete(bead_id);
    held_this_pass.add(bead_id);
    log(
      'merge queue: %s held (%s at %s, %s)',
      bead_id,
      input.reason,
      input.wait_point ?? '-',
      input.failure_class ?? '-'
    );
    // The `writeHold` rule: a re-judgment to the same record costs no fanout.
    if (outcome === 'written' || failure_cleared) {
      notify();
    }
    return outcome;
  }

  /**
   * End a GitHub hold at the turn's final disposition (UI-aui8 §3.3) through
   * {@link endGithubHold}.
   *
   * A release that fails ends this drain (UI-aui8 §3.3, UI-yk55 §3.2): the
   * caller writes no transition after it.
   *
   * @param {string} bead_id
   * @param {import('./queue-store.js').MergeHold|null} started - The GitHub
   * hold the turn started under, if any.
   * @returns {boolean} false when the release failed.
   */
  function settleGithubHold(bead_id, started) {
    const outcome = endGithubHold(github_hold_ctx, bead_id, started);
    if (outcome === 'failed') {
      halted = true;
      notify();
      return false;
    }
    if (outcome === 'released') {
      notify();
    }
    return true;
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
   * Whether a person shelved this bead out of every automatic merge path
   * (UI-sd12 §3.1).
   *
   * @param {string} bead_id
   * @returns {boolean}
   */
  function shelved(bead_id) {
    const q = snapshot();
    const shelf = (q && q.merge_shelved) || {};
    return Object.hasOwn(shelf, bead_id);
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
   * @param {string|null} [head_override] - The head the deciding GitHub read
   * saw directly (UI-aui8 §3.4, §3.6) — the third moved recheck's head, or
   * the head a permanent failure was read on. It pins the exclusion instead
   * of the poller's possibly older observation.
   */
  function failAndDequeue(bead_id, reason, head_override = null) {
    fail(bead_id, reason);
    if (!queuedEntry(bead_id)) {
      notify();
      return;
    }
    const head_sha =
      typeof head_override === 'string' && SHA40_RE.test(head_override)
        ? head_override.toLowerCase()
        : headSha(bead_id);
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
        wait_ms: resolutionWaitMs(),
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
        // A ready record a GitHub hold kept unconsumed (UI-aui8 §3.2) waits
        // for the hold's own rejudge; the driver's own event would only
        // re-read GitHub in a closed loop.
        if (isGithubHold(entry.hold)) {
          continue;
        }
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
   * A containment fetch that could not reach GitHub charges nothing (UI-aui8
   * §3.2): it answers `unreachable`, and the caller holds the item without
   * consuming the resolution.
   *
   * @param {any} probe
   * @param {any} resolution
   * @param {string} subject_bead_id
   * @returns {Promise<'session'|'rebase'|'none'|'unreachable'>}
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
    /** @type {'contained'|'not_contained'|'unreachable'|null} */
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
    if (contained === 'unreachable') {
      return 'unreachable';
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
   * A deadline whose LAST observation failed transiently is not an OPEN PR
   * (UI-aui8 §3.5): it answers `github_unreachable`, and `confirm` carries
   * when the wait first failed so the hold can start there. A last
   * observation that failed permanently keeps its class in the timeout
   * (§3.6).
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {number} deadline
   * @param {UnconfirmedGithubWait} [confirm] - The item's GitHub
   * observation record, shared across re-entries like the deadline.
   * @returns {Promise<'merged'|'pr_closed_unmerged'|'merge_unconfirmed_timeout'|`merge_unconfirmed_timeout:${string}`|'github_unreachable'|'gone'|'stopped'>}
   */
  async function watchUnconfirmed(
    queue_bead_id,
    subject_bead_id,
    deadline,
    confirm = newUnconfirmedGithubWait()
  ) {
    while (!stopped) {
      const left = deadline - now();
      if (left <= 0) {
        if (confirm.last_class === null) {
          return 'merge_unconfirmed_timeout';
        }
        return isTransientGithubFailure(confirm.last_class)
          ? GITHUB_UNREACHABLE
          : `merge_unconfirmed_timeout:${confirm.last_class}`;
      }
      await sleepOrWake(Math.min(unconfirmedPollMs(), left));
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
      noteUnconfirmedObservation(confirm, observed?.failure_class);
    }
    return 'stopped';
  }

  /**
   * @returns {UnconfirmedGithubWait}
   */
  function newUnconfirmedGithubWait() {
    return { first_transient_at: null, last_class: null };
  }

  /**
   * Record one post-merge observation's GitHub outcome (UI-aui8 §3.5, §3.6):
   * a GitHub failure keeps its class, and a transient one, the first time,
   * its moment; any other observation means the last one was not a GitHub
   * failure.
   *
   * @param {UnconfirmedGithubWait} confirm
   * @param {unknown} failure_class
   */
  function noteUnconfirmedObservation(confirm, failure_class) {
    if (!Object.hasOwn(GITHUB_FAILURE_CLASS_LABELS, String(failure_class))) {
      confirm.last_class = null;
      return;
    }
    confirm.last_class = String(failure_class);
    if (
      isTransientGithubFailure(failure_class) &&
      confirm.first_transient_at === null
    ) {
      confirm.first_transient_at = now();
    }
  }

  /**
   * The last merge-attempt number handed out per bead, in this process.
   *
   * @type {Map<string, number>}
   */
  const merge_attempt_seq = new Map();

  /**
   * The highest merge-attempt number this bead's timeline already carries.
   *
   * Read from the timeline rather than kept only in memory because the numbers
   * are event ids: a restart that began again at 1 would hand a NEW attempt the
   * id of a pre-restart one, and the reader — which dedupes by id — would drop
   * one of the two.
   *
   * @param {string} bead_id
   * @returns {number}
   */
  function recordedMergeAttempts(bead_id) {
    const timeline = /** @type {any} */ (deps.timeline);
    if (typeof timeline?.readTimeline !== 'function') {
      return 0;
    }
    let highest = 0;
    try {
      for (const event of timeline.readTimeline(bead_id)) {
        if (event?.kind !== 'merge_step') {
          continue;
        }
        const seq =
          String(event.event_id ?? '')
            .split(':')
            .pop() ?? '';
        const parsed = /^m(\d+)$/.exec(seq);
        if (parsed) {
          highest = Math.max(highest, Number(parsed[1]));
        }
      }
    } catch (err) {
      log('merge attempt seq probe failed for %s: %o', bead_id, err);
    }
    return highest;
  }

  /**
   * The identity of ONE merge attempt, assigned before the effect it names.
   *
   * @param {string} bead_id
   * @returns {string}
   */
  function nextMergeAttemptSeq(bead_id) {
    const prior = merge_attempt_seq.get(bead_id);
    const next =
      (prior === undefined ? recordedMergeAttempts(bead_id) : prior) + 1;
    merge_attempt_seq.set(bead_id, next);
    return `m${next}`;
  }

  /**
   * @param {string} bead_id
   * @param {string} [queue_bead_id] - The queue item this merge runs for, when
   * it is not the subject itself.
   * @returns {Promise<MergeClickResult>}
   */
  async function runMerge(bead_id, queue_bead_id = bead_id) {
    // BEFORE the effect: every exit below belongs to this one attempt, and an
    // id minted after the fact could not tell a replay from a new try.
    const attempt_seq = nextMergeAttemptSeq(bead_id);
    if (snapshotFence(snapshot()).active) {
      return recordMergeStep(bead_id, attempt_seq, {
        ok: /** @type {const} */ (false),
        action: /** @type {const} */ ('refused'),
        reason: 'snapshot_unreadable'
      });
    }
    // A connection-wait rejudge never re-runs a cleanup that already failed
    // (UI-aui8 §3.3): that record belongs to its banner and a person.
    const held_hold = queuedEntry(queue_bead_id)?.hold;
    try {
      const result = isGithubWaitHold(held_hold)
        ? await deps.merge(bead_id, { retry_failed_cleanup: false })
        : await deps.merge(bead_id);
      // A GitHub hold's rejudge that found the poller's cleanup in flight
      // decided nothing; the hold's own lines are its history (§3.9).
      if (isGithubHold(held_hold) && result?.reason === 'action_in_flight') {
        return result;
      }
      return recordMergeStep(bead_id, attempt_seq, result);
    } catch (err) {
      log('merge queue merge() threw for %s: %o', bead_id, err);
      return recordMergeStep(bead_id, attempt_seq, {
        ok: /** @type {const} */ (false),
        action: /** @type {const} */ ('refused'),
        reason: 'merge_error'
      });
    }
  }

  /**
   * Put one merge disposition on the bead's permanent history (§5) and hand the
   * disposition straight back, so the single point every `merge()` outcome
   * passes through stays a single expression at each of its three exits.
   *
   * The result of the append is ignored: a merge that happened must never be
   * reported as refused because its history line was lost.
   *
   * @template {{ ok?: boolean, action?: string, reason?: string|null, head_unread?: boolean }} T
   * @param {string} bead_id
   * @param {string} attempt_seq - This merge attempt's id, from {@link
   * nextMergeAttemptSeq}.
   * @param {T} result
   * @returns {T}
   */
  function recordMergeStep(bead_id, attempt_seq, result) {
    if (!deps.timeline) {
      return result;
    }
    const action = String(result?.action ?? '');
    const label = MERGE_STEP_LABELS[action];
    if (label === undefined) {
      return result;
    }
    const reason = typeof result?.reason === 'string' ? result.reason : null;
    // A GitHub hold writes its own start and end lines (UI-aui8 §3.9); the
    // attempts that only failed to reach GitHub add none of their own.
    if (reason === GITHUB_UNREACHABLE || result?.head_unread === true) {
      return result;
    }
    // An unconfirmed merge's line waits for its confirm wait to end: a wait
    // that ends on the connection wait has only the hold's lines (§3.9).
    if (action === 'merge_unconfirmed') {
      deferred_merge_steps.set(bead_id, { attempt_seq, result });
      return result;
    }
    appendMergeStep(bead_id, attempt_seq, result);
    return result;
  }

  /**
   * The unconfirmed merge attempt per subject bead whose line waits for its
   * confirm wait to end (UI-aui8 §3.9).
   *
   * @type {Map<string, { attempt_seq: string, result: { action?: string, reason?: string|null } }>}
   */
  const deferred_merge_steps = new Map();

  /**
   * End the confirm wait of one subject's unconfirmed merge attempt: write its
   * deferred line when the wait reached a disposition other than the
   * connection wait or a stop, and drop it either way.
   *
   * @param {string} bead_id - The subject bead.
   * @param {string} verdict - How {@link watchUnconfirmed} ended.
   */
  function settleDeferredMergeStep(bead_id, verdict) {
    const deferred = deferred_merge_steps.get(bead_id);
    deferred_merge_steps.delete(bead_id);
    if (!deferred || verdict === GITHUB_UNREACHABLE || verdict === 'stopped') {
      return;
    }
    appendMergeStep(bead_id, deferred.attempt_seq, deferred.result);
  }

  /**
   * Append one merge attempt's line (§5). The result of the append is
   * ignored, as in {@link recordMergeStep}.
   *
   * @param {string} bead_id
   * @param {string} attempt_seq
   * @param {{ action?: string, reason?: string|null }} result
   */
  function appendMergeStep(bead_id, attempt_seq, result) {
    const label = MERGE_STEP_LABELS[String(result?.action ?? '')];
    if (!deps.timeline || label === undefined) {
      return;
    }
    const reason = typeof result?.reason === 'string' ? result.reason : null;
    deps.timeline.append({
      bead_id,
      kind: 'merge_step',
      // The ATTEMPT is the identity, not the disposition: two attempts on the
      // same bead reach `refused` for two different reasons — a snapshot the
      // queue could not read, then a `merge()` that threw — and a disposition
      // key would collapse them into one line and lose the first reason. The
      // number is fixed before the effect, so a replay of the SAME attempt
      // re-appends one id the reader dedupes.
      seq: attempt_seq,
      summary:
        reason === null
          ? `머지 큐 · ${label}`
          : `머지 큐 · ${label} — ${failureTokenSummary(reason) ?? reason}`
    });
  }

  /**
   * The connection-wait refusal of one probe (UI-aui8 §3.2).
   *
   * @param {any} probe
   * @param {string} wait_point
   * @returns {MergeClickResult}
   */
  function githubUnreachable(probe, wait_point) {
    return {
      ok: false,
      action: 'refused',
      reason: GITHUB_UNREACHABLE,
      failure_class: isTransientGithubFailure(probe.failure_class)
        ? probe.failure_class
        : 'network',
      wait_point: /** @type {any} */ (wait_point),
      head_sha: probe.head_sha || null,
      base_ref: probe.base_ref || null,
      head_ref: probe.head_ref || null
    };
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
      return runMerge(subject_bead_id, queue_bead_id);
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
    // A probe that could not reach GitHub decides nothing (UI-aui8 §3.2): the
    // ready resolution stays unconsumed, so the wait costs no round.
    if (!probe.ok && probe.reason === GITHUB_UNREACHABLE) {
      return githubUnreachable(
        probe,
        ready_attempt_id ? 'resolution' : (probe.wait_point ?? 'gate_read')
      );
    }
    const before = queuedEntry(queue_bead_id);
    const charge = ready_attempt_id
      ? await resolutionCharge(probe, before?.resolution, subject_bead_id)
      : 'none';
    if (charge === 'unreachable') {
      return githubUnreachable(probe, 'resolution');
    }
    const effective_rounds =
      (before?.resolution_rounds ?? round_cap) + (charge === 'session' ? 1 : 0);
    const effective_rebase =
      (before?.rebase_rounds ?? rebase_cap) + (charge === 'rebase' ? 1 : 0);
    const dispatch_refusal =
      probe.ok && probe.kind === 'dirty'
        ? conflictDispatchRefusal(probe, effective_rounds, effective_rebase)
        : null;
    // A resolver dispatch re-probes before its effect, so a ready resolution
    // it would start from is consumed only once THAT read decided (UI-aui8
    // §3.2); every other disposition was decided by the probe above.
    if (probe.ok && probe.kind === 'dirty' && dispatch_refusal === null) {
      return dispatchLatestConflict(
        queue_bead_id,
        subject_bead_id,
        probe,
        ready_attempt_id ? { attempt_id: ready_attempt_id, charge } : null
      );
    }
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
        head_ref: probe.head_ref || null,
        ...(probe.failure_class ? { failure_class: probe.failure_class } : {}),
        ...(probe.head_unread === true ? { head_unread: true } : {})
      };
    }
    if (probe.kind !== 'dirty') {
      // The merge gate is the ONE review judgment (UI-d7fy §2/§4): `runMerge`
      // re-runs it against a fresh pin, and a verdict it refuses on comes back
      // as a `refused` reason this item is HELD on — never a second, narrower
      // freshness rule of the queue's own.
      return runMerge(subject_bead_id, queue_bead_id);
    }
    return dispatch_refusal;
  }

  /**
   * Why a DIRTY probe cannot start a resolver, or null when it can.
   *
   * @param {any} probe
   * @param {number} effective_rounds
   * @param {number} effective_rebase
   * @returns {MergeClickResult|null}
   */
  function conflictDispatchRefusal(probe, effective_rounds, effective_rebase) {
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
    return null;
  }

  /**
   * Start a resolver for the DIRTY identity the probe approved. A ready
   * resolution is consumed through `decided` once the dispatch re-probe chose
   * the effect and before the next record binds (UI-aui8 §3.2); a re-probe
   * that could not reach GitHub leaves it ready and holds at `resolution`,
   * and any other refusal consumes it afterwards.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {any} probe
   * @param {{ attempt_id: string, charge: 'session'|'rebase'|'none' }|null} ready
   * @returns {Promise<MergeClickResult|null>}
   */
  async function dispatchLatestConflict(
    queue_bead_id,
    subject_bead_id,
    probe,
    ready
  ) {
    let consumed = ready === null;
    let consume_failed = false;
    const decided = () => {
      if (!consumed && ready) {
        consumed = true;
        consume_failed = !consumeResolution(
          queue_bead_id,
          ready.attempt_id,
          ready.charge
        );
      }
      return !consume_failed;
    };
    const identity = dispatchIdentity(probe);
    /** @type {MergeClickResult} */
    let result;
    try {
      result = await /** @type {NonNullable<typeof deps.dispatchConflict>} */ (
        deps.dispatchConflict
      )(
        subject_bead_id,
        {
          head_sha: probe.head_sha,
          base_ref: probe.base_ref || null,
          head_ref: probe.head_ref || null
        },
        {
          queue_bead_id,
          wait_ms: resolutionWaitMs(),
          manual_authority: manualContinuation(queue_bead_id),
          ...identity
        },
        continuationInput(queue_bead_id, subject_bead_id),
        decided
      );
    } catch (err) {
      log(
        'merge queue conflict dispatch failed for %s: %o',
        subject_bead_id,
        err
      );
      result = {
        ok: false,
        action: 'conflict_resolution',
        reason: 'resolution_dispatch_error'
      };
    }
    if (consume_failed) {
      return null;
    }
    if (result.reason === GITHUB_UNREACHABLE) {
      return githubUnreachable(
        result.head_sha ? result : { ...result, head_sha: probe.head_sha },
        'resolution'
      );
    }
    if (!decided()) {
      return null;
    }
    return result;
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
      // A root the intent kept on its connection wait yields this pass, as a
      // gating root on a GitHub hold does (UI-aui8 §3.3, §3.7).
      if (keptGithubWait(root_bead_id)) {
        held_this_pass.add(root_bead_id);
      } else {
        halted = true;
        halted_on_completion = {
          bead_id: root_bead_id,
          phase: typeof intent?.phase === 'string' ? intent.phase : 'unknown'
        };
      }
    }
    notify();
  }

  /**
   * Whether the completion intent left this root `gating` on a GitHub hold
   * (UI-aui8 §3.7), the wait it keeps until its next observation.
   *
   * @param {string} root_bead_id
   * @returns {boolean}
   */
  function keptGithubWait(root_bead_id) {
    return (
      completionIntent(root_bead_id)?.phase === 'gating' &&
      githubHoldOf(root_bead_id) !== null
    );
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
      // A root whose observation stands on a GitHub hold keeps its slot and
      // yields this pass (UI-aui8 §3.3, §3.7): the completion intent's next
      // observation judges it, and the items behind it keep merging.
      if (githubHoldOf(root_bead_id)) {
        held_this_pass.add(root_bead_id);
        return;
      }
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
    // The completion root's GitHub hold lives on its queue entry, shared with
    // the completion intent (UI-aui8 §3.7), and ends like `processItem`'s:
    // once, at a final disposition of the turn.
    let started_github_hold = githubHoldOf(root_bead_id);
    // False when the release failed: the drain ends, so the caller writes
    // no transition after it (UI-aui8 §3.3).
    const settleGithub = () => {
      if (!settleGithubHold(root_bead_id, started_github_hold)) {
        return false;
      }
      started_github_hold = null;
      return true;
    };
    const confirm = newUnconfirmedGithubWait();

    while (!stopped && !halted) {
      if (!queuedEntry(root_bead_id)) {
        settleGithub();
        return;
      }
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
        if (!settleGithub()) {
          return;
        }
        requireContinuation(
          root_bead_id,
          subject_bead_id,
          result.continuation_mismatch
        );
        return;
      }
      const action = result ? result.action : null;
      // A transient failure of the merge turn is the root's connection wait,
      // not a completion failure (UI-aui8 §3.7): no handoff, so the intent
      // keeps its phase and its execution record.
      if (result.reason === GITHUB_UNREACHABLE) {
        holdOnGithub(root_bead_id, {
          reason: GITHUB_UNREACHABLE,
          head_sha: result.head_sha ?? null,
          failure_class: result.failure_class ?? null,
          wait_point: result.wait_point ?? null
        });
        return;
      }
      // A permanent failure that never read the head holds the root alone,
      // as `processItem` holds a plain item (UI-aui8 §3.6): no handoff, so
      // the drain goes on past it.
      if (result.head_unread === true) {
        holdOnGithub(root_bead_id, {
          reason: GITHUB_HEAD_UNREADABLE,
          failure_class: result.failure_class ?? 'unknown',
          wait_point: result.wait_point ?? 'gate_read'
        });
        return;
      }
      if (
        action === 'refused' &&
        result.reason === 'action_in_flight' &&
        started_github_hold
      ) {
        held_this_pass.add(root_bead_id);
        return;
      }
      if (action === 'cleanup_pending') {
        if (!settleGithub()) {
          return;
        }
        deps.store.dequeueMerge(workspace, root_bead_id);
        void requestDrain();
        return;
      }
      if (
        action === 'merged' ||
        action === 'updated_and_merged' ||
        action === 'already_merged'
      ) {
        // The root's own merge hands its wait to the intent, which ends it at
        // the cleanup handoff or keeps it — `since` and notification mark
        // included — when the read that pins the cleanup fails again
        // (UI-aui8 §3.3, §3.7). A child subject's merge ends it here.
        if (subject_bead_id !== root_bead_id && !settleGithub()) {
          return;
        }
        await handoffCompletion(root_bead_id, subject_bead_id, result);
        if (!keptGithubWait(root_bead_id)) {
          settleGithub();
        }
        return;
      }
      if (action === 'conflict_resolution') {
        if (!settleGithub()) {
          return;
        }
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
          unconfirmed_deadline = now() + unconfirmedWaitMs();
        }
        if (confirm.first_transient_at === null) {
          noteUnconfirmedObservation(confirm, result.failure_class);
        }
        const verdict = await watchUnconfirmed(
          root_bead_id,
          subject_bead_id,
          unconfirmed_deadline,
          confirm
        );
        settleDeferredMergeStep(subject_bead_id, verdict);
        if (verdict === 'stopped') {
          return;
        }
        if (verdict === 'gone') {
          settleGithub();
          return;
        }
        if (verdict === 'merged') {
          continue;
        }
        if (verdict === GITHUB_UNREACHABLE) {
          // The deadline disposition of a confirm that only failed to reach
          // GitHub stays on the same wait (UI-aui8 §3.5, §3.7).
          holdOnGithub(root_bead_id, {
            reason: GITHUB_UNREACHABLE,
            head_sha: result.head_sha ?? null,
            failure_class: confirm.last_class,
            wait_point: 'merge_confirm',
            since: confirm.first_transient_at
          });
          return;
        }
        if (!settleGithub()) {
          return;
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
      // A moved candidate goes back to the intent, which re-gates it and
      // counts the move (§3.7); the hold, if any, is not ended by it.
      if (action !== 'refused' || result.reason !== VERIFY_CANDIDATE_MOVED) {
        if (!settleGithub()) {
          return;
        }
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
    // The shelf is checked before ANY effect, the completion branch included
    // (UI-sd12 §3.3). The store never inserts a shelved bead; this is the
    // defense for a queue state that holds one anyway. It leaves without a
    // merge, base update, resolution or review dispatch.
    if (shelved(bead_id)) {
      log('merge queue: %s shelved — dequeued without effect', bead_id);
      dequeue(bead_id);
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
    // Consecutive pre-merge rechecks this turn that saw the candidate move
    // (UI-aui8 §3.4); any other outcome resets the count.
    let moved_streak = 0;
    // The GitHub hold this turn started under (UI-aui8 §3.3). It survives
    // every re-gate of the turn and ends only at a final disposition, once.
    let started_github_hold = githubHoldOf(bead_id);
    // False when the release failed: the drain ends, so the caller writes
    // no transition after it (UI-aui8 §3.3).
    const settleGithub = () => {
      if (!settleGithubHold(bead_id, started_github_hold)) {
        return false;
      }
      started_github_hold = null;
      return true;
    };
    // The post-merge confirm wait's GitHub record, item-scoped like the
    // deadline (UI-aui8 §3.5).
    const confirm = newUnconfirmedGithubWait();

    while (!stopped && !halted) {
      if (!queuedEntry(bead_id)) {
        // The item left under this turn (a poller cleanup took it): the hold
        // it stood on is over.
        settleGithub();
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
      const verified_operation = verifiedOperation(bead_id);
      const lost_base_update = githubHoldOf(bead_id)?.base_update ?? null;
      const result = await runLatestMerge(
        bead_id,
        bead_id,
        resolution.kind === 'ready' ? resolution.attempt_id || null : null
      );
      if (!result) {
        return;
      }
      if (result.continuation_mismatch) {
        if (!settleGithub()) {
          return;
        }
        requireContinuation(bead_id, bead_id, result.continuation_mismatch);
        return;
      }
      const action = result ? result.action : null;

      // A transient GitHub failure anywhere in the turn is the connection
      // wait (UI-aui8 §3.3): the item keeps its slot, nothing is failed,
      // excluded or dequeued, and the drain moves on behind it.
      if (result.reason === GITHUB_UNREACHABLE) {
        holdOnGithub(bead_id, {
          reason: GITHUB_UNREACHABLE,
          head_sha: result.head_sha ?? null,
          failure_class: result.failure_class ?? null,
          wait_point: result.wait_point ?? null
        });
        return;
      }
      // A permanent failure that never read the head cannot pin an exclusion
      // and must not halt the drain on a head it never saw (UI-aui8 §3.6).
      if (result.head_unread === true) {
        holdOnGithub(bead_id, {
          reason: GITHUB_HEAD_UNREADABLE,
          failure_class: result.failure_class ?? 'unknown',
          wait_point: result.wait_point ?? 'gate_read'
        });
        return;
      }
      // A base update whose answer was lost is decided by this observation
      // before any new one is sent (UI-aui8 §3.2). A moved head may be the
      // author's push rather than the update, so it earns no exemption: a PR
      // still BEHIND gets one update pinned to the head read now, and
      // `expectedHeadOid` refuses it if the lost one moved the head first.
      if (lost_base_update) {
        const decided = decideLostBaseUpdate(bead_id, lost_base_update, result);
        if (decided === 'failed') {
          return;
        }
      }
      // The poller's own cleanup of a MERGED PR holds the bead in flight: the
      // connection-wait rejudge accepts it rather than run a second one
      // (UI-aui8 §3.3). The next pass sees the item gone or decides again.
      if (
        action === 'refused' &&
        result.reason === 'action_in_flight' &&
        started_github_hold
      ) {
        held_this_pass.add(bead_id);
        return;
      }
      // A candidate that moved under the pre-merge recheck is re-gated in the
      // same turn, like `mergeability_changed`; the third consecutive move
      // ends the item, pinned to the head that third recheck saw (§3.4).
      if (action === 'refused' && result.reason === VERIFY_CANDIDATE_MOVED) {
        moved_streak += 1;
        if (moved_streak < MOVED_CANDIDATE_LIMIT) {
          continue;
        }
        if (!settleGithub()) {
          return;
        }
        failAndDequeue(
          bead_id,
          VERIFY_CANDIDATE_MOVED,
          result.head_sha ?? null
        );
        return;
      }
      moved_streak = 0;

      // The gate's review verdicts HOLD (UI-d7fy §3.3): authority stays, the
      // item keeps its slot, nothing is dequeued or terminalized, and the rest
      // of the queue keeps draining behind it. Any other verdict means the
      // gate is no longer holding on a review, so a stale hold is released
      // before this turn decides anything else.
      if (action === 'refused' && HOLD_REASONS.has(String(result.reason))) {
        if (!settleGithub()) {
          return;
        }
        await holdEntry(
          bead_id,
          String(result.reason),
          result.head_sha,
          result.head_ref ?? null
        );
        return;
      }
      if (
        action === 'refused' &&
        foreignHandoffCauseOf(result.reason) !== null
      ) {
        if (!settleGithub()) {
          return;
        }
        holdForeignHandoff(bead_id, String(result.reason), result.head_sha);
        return;
      }
      releaseHold(bead_id);

      if (action === 'cleanup_pending') {
        if (!settleGithub()) {
          return;
        }
        deps.store.dequeueMerge(workspace, bead_id);
        void requestDrain();
        return;
      }

      if (action === 'verify_blocked') {
        if (!settleGithub()) {
          return;
        }
        fail(bead_id, result.reason || 'verify_failed');
        halted = true;
        halted_on_verify = { bead_id, operation_id: verified_operation };
        resumeVerified();
        notify();
        return;
      }

      if (
        action === 'merged' ||
        action === 'updated_and_merged' ||
        action === 'already_merged'
      ) {
        if (!settleGithub()) {
          return;
        }
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
        if (!settleGithub()) {
          return;
        }
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
          unconfirmed_deadline = now() + unconfirmedWaitMs();
        }
        if (confirm.first_transient_at === null) {
          // The command's own post-merge read may already have failed.
          noteUnconfirmedObservation(confirm, result.failure_class);
        }
        const verdict = await watchUnconfirmed(
          bead_id,
          bead_id,
          unconfirmed_deadline,
          confirm
        );
        settleDeferredMergeStep(bead_id, verdict);
        if (verdict === 'stopped') {
          return;
        }
        if (verdict === 'gone') {
          settleGithub();
          return;
        }
        if (verdict === 'merged') {
          // Re-merge: the re-gate sees MERGED and runs the cleanup through the
          // `already_merged` arm — one cleanup implementation, as everywhere.
          continue;
        }
        if (verdict === GITHUB_UNREACHABLE) {
          // The command succeeded and only the confirmation could not reach
          // GitHub (UI-aui8 §3.5): not an exclusion. The hold starts when this
          // wait first failed, and the turn yields.
          holdOnGithub(bead_id, {
            reason: GITHUB_UNREACHABLE,
            head_sha: result.head_sha ?? null,
            failure_class: confirm.last_class,
            wait_point: 'merge_confirm',
            since: confirm.first_transient_at
          });
          return;
        }
        if (!settleGithub()) {
          return;
        }
        // A timeout whose last read failed permanently pins the exclusion to
        // the head the merge ran on (§3.6).
        failAndDequeue(
          bead_id,
          verdict,
          verdict.startsWith('merge_unconfirmed_timeout:')
            ? permanentGithubHead(
                { failure_class: confirm.last_class },
                result.head_sha
              )
            : null
        );
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
        /** @type {{ ok: boolean, reason?: string|null, result_head_sha?: string|null, failure_class?: string }} */
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
        if (isTransientGithubFailure(updated.failure_class)) {
          // The update never reached GitHub, or its answer never came back
          // (UI-aui8 §3.2): the hold keeps the request, and the next
          // observation decides whether it applied before any new one.
          holdOnGithub(bead_id, {
            reason: GITHUB_UNREACHABLE,
            head_sha: result.head_sha ?? null,
            failure_class: updated.failure_class ?? null,
            wait_point: 'resolution',
            base_update: result.head_sha
              ? { head_sha: result.head_sha, base_ref: result.base_ref ?? null }
              : null
          });
          return;
        }
        if (!settleGithub()) {
          return;
        }
        failAndDequeue(
          bead_id,
          updated.reason || 'update_branch_failed',
          permanentGithubHead(updated, result.head_sha)
        );
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
        if (!settleGithub()) {
          return;
        }
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

      if (!settleGithub()) {
        return;
      }
      failAndDequeue(
        bead_id,
        (result && result.reason) || 'refused',
        permanentGithubHead(result, result.head_sha)
      );
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
   * @param {string} bead_id
   * @returns {string|null}
   */
  function verifiedOperation(bead_id) {
    try {
      return deps.verifiedOperation?.(bead_id) ?? null;
    } catch (err) {
      log('merge queue verify observation failed for %s: %o', bead_id, err);
      return null;
    }
  }

  /** Resume only for new evidence, not every repeated poll or our own notify. */
  function resumeVerified() {
    if (!halted_on_verify) {
      return;
    }
    const { bead_id, operation_id } = halted_on_verify;
    if (queuedEntry(bead_id)) {
      const current_operation = verifiedOperation(bead_id);
      if (!current_operation || current_operation === operation_id) {
        return;
      }
    }
    halted_on_verify = null;
    void requestDrain();
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
        halted_on_verify = null;
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
          if (!self_notifying) {
            resumeVerified();
          }
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
          //
          // The driver's OWN event is not such a kick (UI-nfkp §2/§3.1). This
          // driver both emits and subscribes, so while a hold stands the
          // end-of-drain `notify()` — and every in-pass `active` transition —
          // would land right here and ask for another pass, a closed loop that
          // no amount of write-side idempotence breaks. The re-judgement still
          // arrives on every external kick UI-d7fy §3.3 enumerates (PR
          // observation pass, enrollment, completion driver, review session
          // done, runnable-cache metadata), which is where a receipt written
          // outside the queue actually becomes visible.
          if (!self_notifying && hasHeldEntry()) {
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
      halted_on_verify = null;
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
