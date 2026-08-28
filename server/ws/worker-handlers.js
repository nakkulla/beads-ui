/**
 * WebSocket handlers for the Worker queue channel (spec §5.1).
 *
 * A `worker-queue` subscription is per-workspace: on subscribe the client
 * receives a snapshot of the queue; on any queue mutation the whole queue is
 * pushed as a fresh snapshot to every subscriber of that workspace. This reuses
 * the same server-push envelope machinery as issue lists ({@link pushSnapshotIfChanged})
 * so Worker data and issue data flow through one unified push protocol.
 *
 * Concurrency: every mutation carries an `expected_revision`; the queue store
 * runs a revision CAS so a stale client's drag cannot clobber a newer ordering.
 * On conflict the handler replies with the current snapshot so the client
 * re-syncs and retries.
 *
 * Execution: `worker-queue-toggle` retains the legacy independent
 * `auto_advance` mutation. `worker-automation-toggle` atomically aligns
 * `auto_advance` and `auto_merge`, then starts both live automation pipelines
 * on turn-ON. Legacy destructive messages bridge into the same durable
 * `worker-discard` coordinator and are inert when no attachment is registered
 * for the workspace.
 *
 * Auth: these handlers only run for already-authenticated sockets — the
 * connection layer's first-frame auth gate fronts `handleMessage`, and these
 * are reached through the same post-auth dispatch switch as every other
 * mutation (no auth special-casing).
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import nodeFs from 'node:fs';
import { makeError, makeOk } from '../../app/protocol.js';
import {
  activeAttemptStates,
  isImplementationAttempt
} from '../../app/utils/active-attempts.js';
import {
  backupFreshWorkerStaleWork,
  checkWorkerQueueAdmission,
  continueWorkerStaleWork,
  discardWorkerBead,
  dismissWorkerRepoOperation,
  enqueueWorkerManualMerge,
  enrollWorkerMergeCandidates,
  kickWorkerMergeQueue,
  observeWorkerPrs,
  pauseWorkerAttempt,
  readBeadTimeline,
  recheckWorkerStaleWork,
  refreshWorkerExternalPrs,
  resumeWorkerAttempt,
  resumeWorkerQueueHold,
  retryWorkerCleanup,
  retryWorkerParkedAttempt,
  retryWorkerQueueHoldNow,
  reviseApproveWorkerBead,
  reviseFixWorkerBead,
  startWorkerRepoOperationDeployRun,
  stopWorkerReviewSessionProcess,
  tickWorkerQueue,
  workerMergeEffectInFlight,
  workerMergeQueueState,
  workerRepoId,
  workerSlots,
  workerWorktreeExists
} from '../worker/attach.js';
import {
  normalizeDelegationSessions,
  readAttemptDelegationStreams
} from '../worker/delegation-monitor.js';
import { projectExecutionDefaults } from '../worker/execution-defaults.js';
import {
  applyForeignBlockerCleanup,
  onForeignBlockerResolved
} from '../worker/foreign-blocker-status.js';
import {
  evaluateMergeGate,
  observedReviewReceiptState
} from '../worker/merge-gate.js';
import { sanitizeOutput } from '../worker/output-sanitize.js';
import { onQueueChanged } from '../worker/queue-events.js';
import {
  COMPLETION_AUTO_RESOLUTION_PHASE,
  COMPLETION_RETRY_MAX,
  MANUAL_MERGE_CONTINUATION,
  orderLaneByBlocks
} from '../worker/queue-store.js';
import { summarizeReceiptCheck } from '../worker/receipt-check.js';
import {
  classifyRepoOperationFailure,
  projectRepoOperationPolicy
} from '../worker/repo-operation-policy.js';
import {
  effectiveVerifyPolicy,
  repoOpsDisplayFor,
  repoOpsVerifyReceiptState
} from '../worker/repo-ops-display.js';
import { normalizeScriptRetry } from '../worker/resolution-ladder.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { applyPreamble, defaultTaskPrompt } from '../worker/runner/preamble.js';
import { createTailReader } from '../worker/runner/tail-reader.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { activeLaneLineages } from '../worker/scheduler.js';
import { scopeCache } from '../worker/scope-cache.js';
import {
  beadOfTransferredAttempt,
  resolveSessionLogRead
} from '../worker/session-log.js';
import { createSessionRefTranscript } from '../worker/session-ref-transcript.js';
import {
  isSafeSessionId,
  parseSessionRef,
  readSessionSnapshot,
  resolveSessionFile,
  sessionRefViews
} from '../worker/session-ref.js';
import { readDeclaredBase } from '../worker/target-base.js';
import {
  normalizeUsageLegs,
  readAttemptUsageReceipts
} from '../worker/usage-receipts.js';
import {
  emitSessionLogAppend,
  emitSessionLogSnapshot,
  getConnWorkspace,
  log,
  pushSnapshotIfChanged,
  runBdJsonProjectedInWorkspace
} from './context.js';
import { laneBeadIds, sessionExcludedBeadIds } from './lane-membership.js';
import { trimQueueProjection } from './snapshot-retention.js';
import { targetWorkspaceOf } from './workspace-target.js';

// Re-exported so the opt-out rule keeps one import site per consumer lane
// (UI-lsti §3): the wire projection here, the auto-merge enroller in attach.js.
export { effectiveVerifyPolicy };

/**
 * Server-wide single queue store (from the shared Worker runtime) so all
 * connections share one in-memory revision — making the CAS authoritative
 * in-process across concurrent clients — AND so `/healthz` reports the same
 * auto_advance the ws toggle mutates.
 *
 * @returns {ReturnType<typeof import('../worker/queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Put one human click on the bead's permanent history
 * (record-timeline-retention §5).
 *
 * The handler does NOT open the timeline file. §5's single-writer rule is that
 * the ws handler ASKS the workspace's injected writer, and the queue store is
 * where `attach.js` registered it — so this asks the store, and a workspace
 * whose attachment registered none records nothing.
 *
 * The result is ignored and every throw is swallowed: a click's effect has
 * already happened by the time it is announced here, and a lost history line
 * must never turn a completed action into a failed one.
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @param {string} action - Stable name of the click.
 * @param {string} summary
 */
function recordUserAction(workspace, bead_id, action, summary) {
  try {
    queueStore().recordTimelineEvent(workspace, {
      bead_id,
      kind: 'user_action',
      // The action plus the queue revision the click produced. The revision is
      // the queue's own monotonic counter, so two identical clicks stay two
      // events while a re-announcement of ONE click keeps one id — which a
      // clock or a random value could not do.
      seq: `${action}:${queueStore().snapshot(workspace).revision}`,
      summary
    });
  } catch (err) {
    log('user-action timeline record failed for %s: %o', bead_id, err);
  }
}

/**
 * Per-workspace subscriber registry. Keyed by workspace root_dir; each value is
 * the set of `{ ws, client_id }` pairs currently subscribed to that workspace's
 * queue.
 *
 * @type {Map<string, Set<{ ws: WebSocket, client_id: string, last_body?: string }>>}
 */
const SUBSCRIBERS = new Map();

/**
 * @typedef {Object} PublicStaleWorkSummary
 * @property {number} staged_count
 * @property {number} unstaged_count
 * @property {number} untracked_count
 * @property {number} branch_ahead
 * @property {number} head_ahead
 */
/**
 * @typedef {Object} PublicStaleWork
 * @property {1} schema
 * @property {'worktree'|'branch'} residue
 * @property {'unique'|'unknown'} state
 * @property {string} cause
 * @property {PublicStaleWorkSummary} summary
 * @property {string} identity_digest
 * @property {string} action_id
 * @property {boolean} can_resume
 * @property {boolean} can_continue
 * @property {boolean} can_backup_fresh
 * @property {boolean} can_recheck
 */
/**
 * @typedef {Object} PublicAdmission
 * @property {string} reason
 * @property {number} at
 * @property {true} [stale]
 * @property {PublicStaleWork} [stale_work]
 */

/**
 * The connection's own workspace. Still the answer for the SUBSCRIPTION
 * handlers: a `worker-queue` / `session-log` subscription is connection-scoped
 * by design (UI-qrfo §5 「구독 채널은 건드리지 않는다」), and the monitor reads a
 * separate server-global aggregation rather than opening one per repo.
 *
 * @param {WebSocket} ws
 * @returns {string}
 */
function workspaceKeyOf(ws) {
  return getConnWorkspace(ws)?.root_dir || '';
}

/**
 * The workspace a MUTATION targets (UI-qrfo §5): the optional `payload.root_dir`
 * when the request names one, this connection's workspace otherwise.
 *
 * Replies `bad_request` and returns `null` when the named directory is not in
 * the registry allow list — path injection must not be able to reach a repo
 * nobody registered (§10).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @returns {string|null}
 */
function mutationWorkspaceOf(ws, req) {
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
  }
  return key;
}

/**
 * @param {string} key
 * @returns {Set<{ ws: WebSocket, client_id: string }>}
 */
function subscribersFor(key) {
  let set = SUBSCRIBERS.get(key);
  if (!set) {
    set = new Set();
    SUBSCRIBERS.set(key, set);
  }
  return set;
}

/**
 * How many clients are currently subscribed to a workspace's worker queue. The
 * PR poller gates every `gh` query on this (worker-phase2 §4): nobody watching
 * ⇒ nothing to refresh ⇒ no queries.
 *
 * @param {string} workspace_key
 * @returns {number}
 */
export function workerQueueSubscriberCount(workspace_key) {
  const set = SUBSCRIBERS.get(workspace_key);
  return set ? set.size : 0;
}

/**
 * How many clients are subscribed to ANY workspace's worker queue. The runnable
 * cache's scan gate reads this alongside the monitor subscriber count
 * (UI-0a2m): a worker-tab-only viewer renders the `session_active` lane too, so
 * "somebody is watching" must include them or the scan never runs for that
 * viewer.
 */
export function workerQueueSubscriberTotal() {
  let total = 0;
  for (const set of SUBSCRIBERS.values()) {
    total += set.size;
  }
  return total;
}

/**
 * The workspace keys with at least one worker-queue subscriber (UI-0a2m). The
 * periodic runnable refresh walks these IN ADDITION to the monitor-visible
 * roots: a repo hidden from the monitor still renders its own worker tab, and
 * its session lane must not freeze at the subscribe-time scan.
 */
export function workerQueueSubscribedWorkspaces() {
  /** @type {string[]} */
  const out = [];
  for (const [key, set] of SUBSCRIBERS) {
    if (set.size > 0) {
      out.push(key);
    }
  }
  return out;
}

/**
 * Bound one GitHub PR record to fields the Worker UI actually renders.
 *
 * @param {any} value
 */
function publicDiscardPr(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }
  return {
    number: Number.isFinite(value.number) ? value.number : null,
    url: typeof value.url === 'string' ? value.url : null,
    state: typeof value.state === 'string' ? value.state : null,
    head_ref: typeof value.head_ref === 'string' ? value.head_ref : null,
    head_sha: typeof value.head_sha === 'string' ? value.head_sha : null,
    base_ref: typeof value.base_ref === 'string' ? value.base_ref : null,
    merged_sha: typeof value.merged_sha === 'string' ? value.merged_sha : null
  };
}

/**
 * Project the optional stale-work diagnostic without its server-only identity
 * snapshot. Unknown or legacy payloads fail quiet to the existing reason/at
 * badge contract.
 *
 * @param {unknown} value
 * @returns {PublicStaleWork|null}
 */
function publicStaleWork(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    /** @type {Record<string, unknown>} */ (value).schema !== 1
  ) {
    return null;
  }
  const stale_work = /** @type {Record<string, unknown>} */ (value);
  const summary = /** @type {Record<string, unknown> | undefined} */ (
    stale_work.summary
  );
  if (!summary || typeof summary !== 'object' || Array.isArray(summary)) {
    return null;
  }
  return {
    schema: 1,
    residue: stale_work.residue === 'branch' ? 'branch' : 'worktree',
    state: stale_work.state === 'unique' ? 'unique' : 'unknown',
    cause: typeof stale_work.cause === 'string' ? stale_work.cause : 'unknown',
    summary: {
      staged_count: Number.isInteger(summary.staged_count)
        ? /** @type {number} */ (summary.staged_count)
        : 0,
      unstaged_count: Number.isInteger(summary.unstaged_count)
        ? /** @type {number} */ (summary.unstaged_count)
        : 0,
      untracked_count: Number.isInteger(summary.untracked_count)
        ? /** @type {number} */ (summary.untracked_count)
        : 0,
      branch_ahead: Number.isInteger(summary.branch_ahead)
        ? /** @type {number} */ (summary.branch_ahead)
        : 0,
      head_ahead: Number.isInteger(summary.head_ahead)
        ? /** @type {number} */ (summary.head_ahead)
        : 0
    },
    identity_digest:
      typeof stale_work.identity_digest === 'string'
        ? stale_work.identity_digest
        : '',
    action_id:
      typeof stale_work.action_id === 'string' ? stale_work.action_id : '',
    can_resume: stale_work.can_resume === true,
    can_continue: stale_work.can_continue === true,
    can_backup_fresh: stale_work.can_backup_fresh === true,
    can_recheck: stale_work.can_recheck === true
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, PublicAdmission>}
 */
function publicAdmissions(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  /** @type {Record<string, PublicAdmission>} */
  const projected = {};
  for (const [bead_id, raw] of Object.entries(value)) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      continue;
    }
    const admission = /** @type {Record<string, unknown>} */ (raw);
    const stale_work = publicStaleWork(admission.stale_work);
    projected[bead_id] = {
      reason:
        typeof admission.reason === 'string' ? admission.reason : 'unknown',
      at: Number.isFinite(admission.at)
        ? /** @type {number} */ (admission.at)
        : 0,
      ...(admission.stale === true ? { stale: true } : {}),
      ...(stale_work === null ? {} : { stale_work })
    };
  }
  return projected;
}

/**
 * Project only active discard progress. The durable operation also contains
 * source paths, Bead snapshots, session ids, and process identity that are
 * controller evidence, not a websocket contract. The verified archive path is
 * intentionally retained for this local UI as required by spec §9.3.
 *
 * @param {unknown} value
 */
function publicDiscardOperations(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  /** @type {Record<string, any>} */
  const projected = {};
  for (const [operation_id, raw] of Object.entries(value)) {
    const operation = /** @type {any} */ (raw);
    if (
      !operation ||
      typeof operation !== 'object' ||
      operation.phase === 'done'
    ) {
      continue;
    }
    projected[operation_id] = {
      operation_id,
      ...(operation.kind === 'stale_work_backup_fresh'
        ? { kind: 'stale_work_backup_fresh' }
        : {}),
      bead_id: typeof operation.bead_id === 'string' ? operation.bead_id : null,
      attempt_id:
        typeof operation.attempt_id === 'string' ? operation.attempt_id : null,
      requested_at: Number.isFinite(operation.requested_at)
        ? operation.requested_at
        : null,
      mode: typeof operation.mode === 'string' ? operation.mode : null,
      phase: typeof operation.phase === 'string' ? operation.phase : null,
      backup:
        operation.backup && typeof operation.backup === 'object'
          ? {
              path:
                typeof operation.backup.path === 'string'
                  ? operation.backup.path
                  : null,
              manifest_sha256:
                typeof operation.backup.manifest_sha256 === 'string'
                  ? operation.backup.manifest_sha256
                  : null,
              verified_at: Number.isFinite(operation.backup.verified_at)
                ? operation.backup.verified_at
                : null
            }
          : null,
      original_pr: publicDiscardPr(operation.original_pr),
      revert_pr: publicDiscardPr(operation.revert_pr),
      last_error:
        typeof operation.last_error === 'string' ? operation.last_error : null
    };
  }
  return projected;
}

/**
 * Overlay the EXTERNAL PR rows onto a queue snapshot's `pr_wait` (UI-7agi §2).
 *
 * A bead a normal session delivered a PR for is `resolved` with a
 * `metadata.pr_url` and no attempt at all, so the durable lane never held it.
 * Synthesizing the row HERE — on the wire, never in `queue.json` — is what lets
 * the existing observation/activity/title decorations and the whole client-side
 * lane render it with no second code path. A synthetic attempt in the durable
 * queue would have been the alternative, and it would have made the worker's own
 * records claim it ran something it never ran.
 *
 * A bead the worker itself put in `pr_wait` is left alone: the durable attempt
 * is the more specific record, so the overlay yields to it. A bead the durable
 * `done` lane holds is excluded for the same reason (UI-m6bg §overlay): the
 * registry is only as fresh as the last scan, and in that window a bead just
 * moved to done would otherwise be drawn in the PR-wait lane at the same time.
 *
 * Each overlay row also carries `wt_present` (UI-w0hi §3): whether the
 * delivering session's worktree is still there, which decides whether the
 * conflict-resolution click has anywhere to run. Durable rows carry nothing new
 * — their own attempt already answers it.
 *
 * THREE sources feed a row, in order (UI-17mj §2.1): durable `pr_wait`, the
 * registry, and finally `queue.merge_queue`. The third exists because the scan
 * that fills the registry EXCLUDES a bead the worker is currently running
 * (`externalProtectedBeadIds`, UI-b8n8) — so a conflict-resolution session,
 * which is only ever dispatched from the queue's own authority, drops the bead
 * out of the registry for as long as it runs, and the row used to vanish from
 * the lane mid-resolution while a worker-owned row would merely have gained a
 * badge. The queue item is the evidence that survives that window: it is
 * cleared on resolution, merge or cancel, by which time the next scan has
 * refilled the registry, so the row never blinks. The exclusion itself is
 * untouched — UI-b8n8's guard against re-adopting a running bead still holds.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
export function withExternalPrWait(workspace_key, queue) {
  /** @type {import('../worker/external-pr.js').ExternalPrRow[]} */
  let rows = [];
  try {
    rows = getWorkerRuntime().externalPrs.list(workspace_key);
  } catch {
    rows = [];
  }
  const merge_queue = Array.isArray(queue.merge_queue)
    ? /** @type {any[]} */ (queue.merge_queue)
    : [];
  // Both synthetic sources empty — nothing to overlay, so the caller keeps the
  // exact snapshot object it passed in.
  if (rows.length === 0 && merge_queue.length === 0) {
    return queue;
  }
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  const done_lane = Array.isArray(queue.done)
    ? /** @type {any[]} */ (queue.done)
    : [];
  const queue_lane = Array.isArray(queue.queue)
    ? /** @type {any[]} */ (queue.queue)
    : [];
  const durable = new Set(
    [...lane, ...done_lane, ...queue_lane].map((e) => e && e.bead_id)
  );
  /** @type {Set<string>} */
  const emitted = new Set();
  /** @type {Array<{ bead_id: string, added_at: number|null, external: true, wt_present: boolean }>} */
  const overlay = [];
  for (const row of rows) {
    if (durable.has(row.bead_id) || emitted.has(row.bead_id)) {
      continue;
    }
    emitted.add(row.bead_id);
    overlay.push({
      bead_id: row.bead_id,
      added_at: row.added_at,
      external: true,
      wt_present: externalWorktreePresent(workspace_key, row.bead_id)
    });
  }
  for (const entry of merge_queue) {
    const bead_id = entry && entry.bead_id;
    if (
      typeof bead_id !== 'string' ||
      bead_id.length === 0 ||
      durable.has(bead_id) ||
      emitted.has(bead_id)
    ) {
      continue;
    }
    emitted.add(bead_id);
    const granted_at = entry.authority && entry.authority.granted_at;
    overlay.push({
      bead_id,
      // The queue item carries no `added_at` of its own; the authority's grant
      // is the only time it can honestly report.
      added_at:
        typeof granted_at === 'number' && Number.isFinite(granted_at)
          ? granted_at
          : null,
      external: true,
      wt_present: externalWorktreePresent(workspace_key, bead_id)
    });
  }
  if (overlay.length === 0) {
    return queue;
  }
  return { ...queue, pr_wait: [...lane, ...overlay] };
}

/**
 * The `wt_present` probe every synthesized external row carries (UI-w0hi §3).
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @returns {boolean}
 */
function externalWorktreePresent(workspace_key, bead_id) {
  try {
    return workerWorktreeExists(workspace_key, bead_id);
  } catch {
    // Fail-quiet, like every other decoration here: an unreadable repo renders
    // a disabled button with a reason, never a guessed `true`.
    return false;
  }
}

/**
 * The receipt warning a bead's latest checked attempt recorded (UI-bu6d §7).
 *
 * DURABLE ROWS ONLY since UI-17mj §2.3: an external row has no attempt of its
 * own, and the one it may acquire — a conflict-resolution session — leaves a
 * terminal `receipt_check` behind that outlives the metadata fix it complained
 * about. {@link externalReceiptWarningFor} reads the scan's current observation
 * for those rows instead.
 *
 * FAIL-QUIET by convention: an attempt with no `receipt_check` — a legacy
 * record, an attempt whose bd read failed — summarizes to null and the row
 * shows nothing. This projection creates no authority; the gate's own re-check
 * does.
 *
 * @param {Record<string, unknown>} queue
 * @param {string} bead_id
 * @returns {ReturnType<typeof summarizeReceiptCheck>}
 */
function receiptWarningFor(queue, bead_id) {
  const attempts =
    queue.attempts && typeof queue.attempts === 'object'
      ? Object.values(/** @type {Record<string, any>} */ (queue.attempts))
      : [];
  /** @type {{ at: number, check: Record<string, unknown> }|null} */
  let best = null;
  for (const attempt of attempts) {
    if (
      !attempt ||
      attempt.bead_id !== bead_id ||
      // The warning describes the IMPLEMENTATION receipt (UI-hk74 §7).
      !isImplementationAttempt(attempt) ||
      !attempt.receipt_check ||
      typeof attempt.receipt_check !== 'object'
    ) {
      continue;
    }
    const at =
      typeof attempt.receipt_check.checked_at === 'number'
        ? attempt.receipt_check.checked_at
        : 0;
    if (!best || at >= best.at) {
      best = { at, check: attempt.receipt_check };
    }
  }
  return best
    ? summarizeReceiptCheck(
        /** @type {import('../worker/receipt-check.js').ReceiptCheckResult} */ (
          best.check
        )
      )
    : null;
}

/**
 * The receipt warning the EXTERNAL registry row carries (UI-17mj §2.3).
 *
 * An external bead never ran under the worker, so the attempt record
 * {@link receiptWarningFor} reads is either absent or — after a
 * conflict-resolution session — a stale verdict that survives the metadata fix
 * it reported. The scan re-observes the row's receipts on every tick, so the
 * registry value is the one that changes back to clean when the metadata does.
 *
 * Null whenever the registry has nothing to say: a row synthesized from the
 * merge queue alone (§2.1) is external but unscanned, and fail-quiet means no
 * badge rather than a resurrected attempt verdict.
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @returns {ReturnType<typeof summarizeReceiptCheck>}
 */
function externalReceiptWarningFor(workspace_key, bead_id) {
  /** @type {import('../worker/external-pr.js').ExternalPrRow|null} */
  let row = null;
  try {
    row = getWorkerRuntime().externalPrs.get(workspace_key, bead_id);
  } catch {
    row = null;
  }
  return row && row.receipt_check
    ? summarizeReceiptCheck(row.receipt_check)
    : null;
}

/**
 * Project the PR observation cache onto the beads currently in `pr_wait`, each
 * with its evaluated merge gate (worker-phase2 §4/§5).
 *
 * A PURE READ — it queries nothing and mutates nothing. The poller is the only
 * writer; this is what puts its findings on the wire, riding the existing
 * `worker-queue-snapshot` push rather than a new message type. A bead the
 * poller has not reached yet simply has no entry, and the gate reports that as
 * "관측 대기" (disabled), never as a passing signal.
 *
 * `receipt_check` has TWO sources (UI-17mj §2.3), chosen per row: an external
 * row reports the scan's current observation, a durable one its implementation
 * attempt's record. Same field on the wire, so the client keeps one badge.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @param {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} verify_policy
 * @returns {Record<string, unknown>}
 */
function prObservationsFor(workspace_key, queue, verify_policy) {
  /** @type {Record<string, unknown>} */
  const out = {};
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  if (lane.length === 0) {
    return out;
  }
  /** @type {Record<string, any>} */
  let observed = {};
  try {
    observed = getWorkerRuntime().prObservations.snapshot(workspace_key);
  } catch {
    observed = {};
  }
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    const record = observed[bead_id] || null;
    out[bead_id] = {
      pr: record ? record.pr : null,
      verify: record ? record.verify : null,
      error: record ? record.error : null,
      observed_at: record ? record.observed_at : null,
      gate: evaluateMergeGate(record, {
        review_receipt_state: observedReviewReceiptState(record),
        verify_receipt_state: repoOpsVerifyReceiptState(
          verify_policy,
          record?.verify || null
        ),
        // A pure read of cached observations creates no authority (UI-bu6d §4):
        // the receipt verdict comes from the click path's live re-check, and
        // this projection only CARRIES the recorded warning below.
        receipt_state: { state: 'undecidable', codes: [] }
      }),
      receipt_check:
        entry.external === true
          ? externalReceiptWarningFor(workspace_key, bead_id)
          : receiptWarningFor(queue, bead_id)
    };
  }
  return out;
}

/**
 * Project what the server is DOING to each `pr_wait` bead right now
 * (UI-raqh §3/§4): the poller's collapsed activity and the merge's current
 * step. A PURE read of the shared activity cache — the poller and the PR
 * actions are the only writers — riding the existing snapshot push exactly
 * like {@link prObservationsFor}.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function prActivityFor(workspace_key, queue) {
  /** @type {Record<string, unknown>} */
  const out = {};
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  if (lane.length === 0) {
    return out;
  }
  /** @type {Record<string, any>} */
  let active = {};
  try {
    active = getWorkerRuntime().activityStore.snapshot(workspace_key);
  } catch {
    active = {};
  }
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    const record = active[bead_id];
    if (record) {
      out[bead_id] = record;
    }
  }
  return out;
}

/**
 * Runtimes whose REVISE-parking store already has its fill callback wired.
 * Same lazily-built-singleton problem the title cache has: wiring at module
 * load would bind to an instance a test later throws away.
 *
 * @type {WeakSet<object>}
 */
const REVISE_FILL_WIRED = new WeakSet();

/**
 * Project which waiting-lane beads are parked at
 * `awaiting_user=spec_review_stale:revise` (UI-hs11 §3.1), so the row can
 * offer the two disposition buttons.
 *
 * ADVISORY, and PARTIAL like {@link beadTitlesFor}: the third condition of the
 * judgment is a `bd show`, which cannot run inside this synchronous
 * decoration, so only cached observations travel and a miss is delivered by
 * the fanout the fill callback triggers. Every click re-runs the WHOLE
 * judgment server-side before acting.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function reviseParkedFor(workspace_key, queue) {
  /** @type {ReturnType<typeof import('../worker/revise-parked.js').createReviseParkedStore>|null} */
  let store = null;
  try {
    store = getWorkerRuntime().reviseParked;
  } catch {
    store = null;
  }
  if (!store) {
    return {};
  }
  if (!REVISE_FILL_WIRED.has(store)) {
    REVISE_FILL_WIRED.add(store);
    store.setOnFilled((workspace) => {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('revise-parked fill fanout failed for %s: %o', workspace, err);
      }
    });
  }
  try {
    return store.observeFor(workspace_key, queue);
  } catch (err) {
    log('revise-parked observation failed for %s: %o', workspace_key, err);
    return {};
  }
}

/**
 * Worker runtimes whose title cache already has its fill callback wired. The
 * runtime is a lazily-built singleton that tests reset, so the wiring cannot
 * happen at module load — it would bind to an instance that is later thrown
 * away, and the refill fanout would silently stop happening.
 *
 * @type {WeakSet<object>}
 */
const TITLE_FILL_WIRED = new WeakSet();

/**
 * Titles for every bead the lanes render (UI-12k6). Ready/Blocked beads reach
 * the client through their own live subscription; `queue`/`pr_wait`/`done`
 * beads do not, so without this decoration the client has no title for them
 * and prints the bead id.
 *
 * PARTIAL BY DESIGN: only cache hits travel. The decoration is synchronous, so
 * a miss is omitted here, queued for an async `bd show`, and delivered by the
 * fanout the fill callback triggers — never by blocking this snapshot.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, string>}
 */
function beadTitlesFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'titlesFor');
}

/**
 * The 생성·수정 시각 of every bead the lanes render (UI-d7pw §4.3). Rides the SAME
 * cache and the same `bd show` as {@link beadTitlesFor} — no extra process per
 * bead — and carries the same partiality: a cache miss is omitted here and
 * arrives on the snapshot the fill callback triggers.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, { created_at: number|string|null, updated_at: number|string|null }>}
 */
function beadTimesFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'timesFor');
}

/**
 * How many timeline lines the failure popover / parked tile show
 * (record-timeline-retention §9). The tile answers "무엇이 이 시도를 끝냈나",
 * not "이 bead의 전체 이력" — that question belongs to the issue detail page's
 * 섹션, which fetches the whole thing on its own.
 *
 * @type {number}
 */
const TILE_TIMELINE_LIMIT = 5;

/**
 * Attempt statuses whose tile carries the failure/park projection
 * (`running-grid.js`). Only those beads get timeline material on the snapshot:
 * the popover is the only tile surface that shows it, and probing a log path
 * for every bead in the queue would spend syscalls on cards that never ask.
 *
 * @type {Set<string>}
 */
const TIMELINE_TILE_STATUSES = new Set(['failed', 'orphaned', 'parked']);

/**
 * The §9 tile material of every bead whose card shows a failure or a park: the
 * last few history lines plus the log the attempt left behind.
 *
 * Carried on the SNAPSHOT rather than fetched by the tile, because ADR 14 makes
 * `buildLanes` the single assembler — a renderer that fetched its own rows
 * would be a second assembly path for the same card. It is a decoration like
 * `bead_titles`: non-persisted, partial, and fail-quiet. A bead with no events
 * and no readable log is OMITTED entirely rather than shipped as an empty
 * shell, so the client's own emptiness check is `key in map`.
 *
 * `log_expired` is the §4 read-resolution order's `expired` outcome — the
 * retention policy deleted the transcript — which is a different answer from
 * "this attempt recorded no path", and the tile says so with 만료됨.
 *
 * Exported for the §9 transport test, which fixes the omission rules; the
 * snapshot builder is its only production caller.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, { events: import('../worker/bead-timeline.js').TimelineEvent[], log_path: string|null, log_expired: boolean }>}
 */
export function beadTimelinesFor(workspace_key, queue) {
  const attempts = /** @type {Record<string, any>} */ (queue.attempts || {});
  /** @type {Map<string, any>} */
  const newest_by_bead = new Map();
  for (const attempt of Object.values(attempts)) {
    if (
      !attempt ||
      typeof attempt.bead_id !== 'string' ||
      attempt.bead_id.length === 0 ||
      !TIMELINE_TILE_STATUSES.has(attempt.status)
    ) {
      continue;
    }
    const prior = newest_by_bead.get(attempt.bead_id);
    const at =
      typeof attempt.finished_at === 'number' ? attempt.finished_at : 0;
    const prior_at =
      prior && typeof prior.finished_at === 'number' ? prior.finished_at : -1;
    if (!prior || at >= prior_at) {
      newest_by_bead.set(attempt.bead_id, attempt);
    }
  }

  /** @type {Record<string, { events: import('../worker/bead-timeline.js').TimelineEvent[], log_path: string|null, log_expired: boolean }>} */
  const out = {};
  for (const [bead_id, attempt] of newest_by_bead) {
    const events = readBeadTimeline(workspace_key, bead_id, {
      limit: TILE_TIMELINE_LIMIT
    });
    /** @type {import('../worker/session-log.js').SessionLogLocation} */
    let located;
    try {
      located = resolveSessionLogRead({
        workspace: workspace_key,
        attempt_id: String(attempt.attempt_id || ''),
        bead_id,
        log_path: typeof attempt.log_path === 'string' ? attempt.log_path : null
      });
    } catch {
      located = { status: 'expired', path: null, gzipped: false };
    }
    // A record that never stored a path AND resolved to nothing is a failure
    // that ran no session at all — there is no log fact to report, expired or
    // otherwise, so the row is simply absent.
    const stored =
      typeof attempt.log_path === 'string' && attempt.log_path.length > 0
        ? attempt.log_path
        : null;
    const log_expired = located.status === 'expired' && stored !== null;
    const log_path = located.status === 'ok' ? located.path : null;
    if (events.length === 0 && log_path === null && !log_expired) {
      continue;
    }
    out[bead_id] = { events, log_path, log_expired };
  }
  return out;
}

/**
 * Normalized labels for every bead the lanes render. This is deliberately a
 * partial projection: missing entries are unknown, never an inferred empty
 * label array, because waiting rows can be outside the live issue subscription.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, string[]>}
 */
function beadLabelsFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'labelsFor');
}

/**
 * The `blocks` edges among a serial lane's members plus one incoming bead —
 * the authoritative ordering input a lane mutation must apply (UI-04vo §3).
 * Edges naming a bead outside that set carry no in-lane ordering signal.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue - Normalized queue snapshot.
 * @param {unknown} lane
 * @param {string} bead_id
 * @returns {{ blocker: string, blockee: string }[]}
 */
function laneBlocksEdges(workspace_key, queue, lane, bead_id) {
  if (typeof lane !== 'string' || !/^s[1-5]$/.test(lane)) {
    return [];
  }
  const entries = (
    Array.isArray(queue.serial_lanes) ? queue.serial_lanes : []
  ).find((/** @type {any} */ entry_lane) => entry_lane?.id === lane)?.entries;
  const members = new Set(
    (Array.isArray(entries) ? entries : []).map(
      (/** @type {any} */ entry) => entry.bead_id
    )
  );
  members.add(bead_id);
  const blocked_by = beadBlockedByFor(workspace_key, {
    queue: [...members].map((id) => ({ bead_id: id }))
  });
  /** @type {{ blocker: string, blockee: string }[]} */
  const edges = [];
  for (const blockee of members) {
    for (const blocker of blocked_by[blockee] || []) {
      if (members.has(blocker)) {
        edges.push({ blocker, blockee });
      }
    }
  }
  return edges;
}

/**
 * Recalibrate one serial lane after `dep-add` changes its blocks graph
 * (UI-2gi1 §6.5). Both beads must already belong to the same lane in this
 * workspace. The ordinary placement edge source remains authoritative; the
 * newly committed edge is added only when its readback has not reached that
 * partial cache yet.
 *
 * A matching lane always fans out, including no-order-change and cycle cases,
 * because the non-persisted `lane_states` projection may still have changed.
 *
 * @param {string} workspace_key
 * @param {string} blockee
 * @param {string} blocker
 * @param {unknown} readback
 * @returns {{ matched: boolean, lane: string|null, changed: boolean, cycle: boolean }}
 */
export function recalibrateSerialLaneAfterDepAdd(
  workspace_key,
  blockee,
  blocker,
  readback
) {
  if (workspace_key.length === 0) {
    return { matched: false, lane: null, changed: false, cycle: false };
  }
  try {
    getWorkerRuntime().titleCache.refreshFromIssue(workspace_key, readback);
  } catch (err) {
    log(
      'dependency readback cache refresh failed for %s: %o',
      workspace_key,
      err
    );
  }
  const queue = queueStore().snapshot(workspace_key);
  const lanes = Array.isArray(queue.serial_lanes) ? queue.serial_lanes : [];
  const lane = lanes.find((candidate) => {
    if (!candidate || !Array.isArray(candidate.entries)) {
      return false;
    }
    const members = new Set(
      candidate.entries.map((entry) => entry && entry.bead_id)
    );
    return members.has(blockee) && members.has(blocker);
  });
  if (!lane || typeof lane.id !== 'string') {
    return { matched: false, lane: null, changed: false, cycle: false };
  }
  const blocks_edges = laneBlocksEdges(workspace_key, queue, lane.id, blockee);
  if (
    !blocks_edges.some(
      (edge) => edge.blocker === blocker && edge.blockee === blockee
    )
  ) {
    blocks_edges.push({ blocker, blockee });
  }
  const result = queueStore().recalibrateSerialLane(workspace_key, {
    lane: lane.id,
    blocks_edges
  });
  fanout(workspace_key, result.queue);
  return {
    matched: true,
    lane: lane.id,
    changed: result.changed,
    cycle: result.cycle
  };
}

/**
 * Direct `blocks` blocker ids for every bead the lanes render (UI-04vo §3).
 * Partial like labels: an absent key is unknown, never "no blockers".
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, string[]>}
 */
function beadBlockedByFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'blockedByFor');
}

/** Whether {@link wireForeignBlockerFanout} has already registered. */
let foreign_blocker_fanout_wired = false;

/**
 * Re-push the snapshot of every workspace whose blocked-by projection was
 * WAITING on a cross-rig lookup (UI-u6zf §3.3·§3.4).
 *
 * The requester set is the whole point: the workspace that asked is the one
 * holding the blocked bead, never the rig that owns the blocker. Waking the
 * owner instead re-pushes a snapshot nothing changed in and leaves the stale
 * chip standing exactly where the user is looking. Wired lazily for the same
 * reason the title cache's fill is — at module load `fanout` has no runtime to
 * read a snapshot from.
 */
function wireForeignBlockerFanout() {
  if (foreign_blocker_fanout_wired) {
    return;
  }
  foreign_blocker_fanout_wired = true;
  onForeignBlockerResolved((requesters) => {
    for (const workspace of requesters) {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('foreign blocker fill fanout failed for %s: %o', workspace, err);
      }
    }
  });
}

/**
 * The blocked-by projection with CLOSED foreign blockers removed, plus the
 * owning workspace of each survivor (UI-u6zf §3.2·§4).
 *
 * Applied HERE rather than in a consumer because the previous arrangement —
 * cleanup as monitor post-processing — silently stopped covering the Worker tab
 * the moment that tab grew its own blocked chip.
 *
 * @param {string} workspace_key
 * @param {Record<string, string[]>} bead_blocked_by
 * @returns {{ bead_blocked_by: Record<string, string[]>, blocker_workspaces: Record<string, string>|null }}
 */
function cleanForeignBlockers(workspace_key, bead_blocked_by) {
  wireForeignBlockerFanout();
  /** @type {Record<string, any>} */
  const projected = { bead_blocked_by };
  try {
    applyForeignBlockerCleanup(projected, workspace_key);
  } catch (err) {
    log('foreign blocker cleanup failed for %s: %o', workspace_key, err);
    return { bead_blocked_by, blocker_workspaces: null };
  }
  return {
    bead_blocked_by: projected.bead_blocked_by,
    blocker_workspaces: projected.blocker_workspaces || null
  };
}

/**
 * Per-serial-lane derived display state (UI-04vo §3/§5): current occupancy
 * lineages, the lane's order, and which positions `blocks` DETERMINES.
 *
 * The order itself is corrected where it is written (the lane mutators), so by
 * the time a snapshot renders there is nothing left to move. What the reader
 * still needs is WHY a row sits where it does, so `corrections` reports the
 * in-lane blocks constraint for each member that has one — `after` names the
 * blocker it must follow. Recomputed on EVERY snapshot from durable state and
 * the blocked-by cache; never persisted, so it cannot go stale relative to
 * what it was derived from.
 *
 * @param {Record<string, any>} raw_queue - Normalized queue (pre-projection).
 * @param {Record<string, string[]>} blocked_by_map
 * @returns {Record<string, { occupied_by: string[], order: string[], corrections: { bead_id: string, after: string }[], cycle: boolean }>}
 */
function laneStatesFor(raw_queue, blocked_by_map) {
  /** @type {Record<string, { occupied_by: string[], order: string[], corrections: { bead_id: string, after: string }[], cycle: boolean }>} */
  const out = {};
  const occupancy = activeLaneLineages(raw_queue);
  const lanes = Array.isArray(raw_queue.serial_lanes)
    ? raw_queue.serial_lanes
    : [];
  for (const lane of lanes) {
    if (!lane || typeof lane.id !== 'string' || !Array.isArray(lane.entries)) {
      continue;
    }
    /** @type {string[]} */
    const order_ids = lane.entries
      .map((/** @type {any} */ entry) => entry?.bead_id)
      .filter((/** @type {unknown} */ id) => typeof id === 'string');
    const members = new Set(order_ids);
    /** @type {{ blocker: string, blockee: string }[]} */
    const edges = [];
    for (const id of order_ids) {
      for (const blocker of blocked_by_map[id] || []) {
        if (members.has(blocker)) {
          edges.push({ blocker, blockee: id });
        }
      }
    }
    const topo = orderLaneByBlocks(order_ids, edges);
    const position_of = new Map(topo.order.map((id, at) => [id, at]));
    /** @type {{ bead_id: string, after: string }[]} */
    const corrections = [];
    if (!topo.cycle) {
      for (const bead_id of topo.order) {
        const blockers = edges
          .filter((edge) => edge.blockee === bead_id)
          .map((edge) => edge.blocker);
        if (blockers.length === 0) {
          continue;
        }
        const last = blockers.reduce((latest, blocker) =>
          Number(position_of.get(blocker)) > Number(position_of.get(latest))
            ? blocker
            : latest
        );
        corrections.push({ bead_id, after: last });
      }
    }
    out[lane.id] = {
      occupied_by: [...(occupancy.get(lane.id) || [])],
      order: topo.order,
      corrections,
      cycle: topo.cycle
    };
  }
  return out;
}

/**
 * The process-wide title cache, with its refill fanout wired exactly once.
 * Null when no worker runtime is reachable, which every decoration reads as
 * "ship nothing" rather than as an error.
 *
 * @returns {ReturnType<typeof import('../worker/title-cache.js').createTitleCache>|null}
 */
function titleCacheHandle() {
  /** @type {ReturnType<typeof import('../worker/title-cache.js').createTitleCache>|null} */
  let cache = null;
  try {
    cache = getWorkerRuntime().titleCache;
  } catch {
    return null;
  }
  if (!cache) {
    return null;
  }
  if (!TITLE_FILL_WIRED.has(cache)) {
    TITLE_FILL_WIRED.add(cache);
    cache.setOnFilled((workspace) => {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('title fill fanout failed for %s: %o', workspace, err);
      }
    });
  }
  return cache;
}

/**
 * Stepper projections for every bead a LANE renders (UI-eey2 §9.2), plus the
 * `done` beads.
 *
 * The id set adds the beads of RUNNING attempts, which sit in no lane array at
 * all while they execute. `done` is in the set for ONE consumer field: the
 * 완료 행's PR link reads `chips.pr` from here. A finished bead still draws no
 * stepper and no route/from chip — that exclusion lives in the client renderer,
 * not in this id set, because the projection is one object per bead.
 *
 * Partial on exactly the title cache's contract: a bead whose record has not
 * landed is absent and arrives on the snapshot the fill callback triggers.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function beadWorkflowFor(workspace_key, queue) {
  const cache = titleCacheHandle();
  if (!cache) {
    return {};
  }
  const ids = [...laneMemberIds(queue, true), ...laneBeadIds(queue, ['done'])];
  if (ids.length === 0) {
    return {};
  }
  try {
    return cache.workflowFor(workspace_key, ids);
  } catch (err) {
    log('bead workflow lookup failed for %s: %o', workspace_key, err);
    return {};
  }
}

/**
 * The beads the 실행중 레인 draws, by the SAME predicate the client draws it
 * with (`app/utils/active-attempts.js` `activeAttemptStates`, UI-anna §3.2).
 * A `status === 'running'` filter is NOT the same set: the client's 실행중
 * tiles include a paused attempt and an unhandled failure, so copying that
 * filter here would drop the decorations of exactly those tiles.
 *
 * Only `implementation` attempts confer occupancy (UI-hk74 §7) — that
 * exclusion lives inside the shared predicate.
 *
 * @param {Record<string, unknown>} queue
 * @returns {string[]}
 */
function runningLaneBeadIds(queue) {
  /** @type {Map<string, number>} */
  const done_at_by_bead = new Map();
  const done_lane = Array.isArray(queue.done)
    ? /** @type {any[]} */ (queue.done)
    : [];
  for (const entry of done_lane) {
    if (
      entry &&
      typeof entry.bead_id === 'string' &&
      typeof entry.added_at === 'number'
    ) {
      done_at_by_bead.set(entry.bead_id, entry.added_at);
    }
  }
  const attempts = /** @type {Record<string, any>} */ (queue.attempts || {});
  return [...activeAttemptStates(attempts, done_at_by_bead).winners.keys()];
}

/**
 * The beads a LANE renders: `queue` ∪ `serial_lanes[].entries` ∪ the 실행중
 * 레인 beads, with `pr_wait` included only when the caller asks for it.
 * `done` is never a member — a finished bead draws neither a stepper nor an
 * overlap chip. The one decoration a done bead does carry (its PR link) adds
 * the `done` lane on top of this set at its own call site.
 *
 * @param {Record<string, unknown>} queue
 * @param {boolean} include_pr_wait
 * @returns {string[]}
 */
function laneMemberIds(queue, include_pr_wait) {
  /** @type {string[]} */
  const ids = [];
  const lanes = [
    queue.queue,
    ...(include_pr_wait ? [queue.pr_wait] : []),
    ...(Array.isArray(queue.serial_lanes)
      ? /** @type {any[]} */ (queue.serial_lanes).map((lane) => lane?.entries)
      : [])
  ];
  for (const lane_entries of lanes) {
    const entries = Array.isArray(lane_entries)
      ? /** @type {any[]} */ (lane_entries)
      : [];
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.push(bead_id);
      }
    }
  }
  ids.push(...runningLaneBeadIds(queue));
  return ids;
}

/**
 * Worker runtimes whose scope cache already has its fill callback wired. Same
 * lazily-built-singleton problem the title cache has.
 *
 * @type {WeakSet<object>}
 */
const SCOPE_FILL_WIRED = new WeakSet();

/**
 * The process-wide declared-scope cache, with its refill fanout wired exactly
 * once. Null when it cannot be reached, which the decoration reads as "ship
 * nothing" rather than as an error.
 *
 * @returns {ReturnType<typeof import('../worker/scope-cache.js').createScopeCache>|null}
 */
function scopeCacheHandle() {
  /** @type {ReturnType<typeof import('../worker/scope-cache.js').createScopeCache>|null} */
  let cache = null;
  try {
    cache = scopeCache();
  } catch {
    return null;
  }
  if (!cache) {
    return null;
  }
  if (!SCOPE_FILL_WIRED.has(cache)) {
    SCOPE_FILL_WIRED.add(cache);
    cache.onFilled((workspace) => {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('scope fill fanout failed for %s: %o', workspace, err);
      }
    });
  }
  return cache;
}

/**
 * The declared scope of every bead the WAITING, RUNNING, PR 대기, 후보 and
 * SESSION lanes render (UI-qm12 §4.3, widened to 후보 by UI-f3ma and to
 * `pr_wait` + `session_active` by UI-anna §3.1) — the same set
 * {@link beadWorkflowFor} decorates, plus the session-held beads that stand in
 * no lane array at all.
 *
 * Three deliberately distinct values, none of which blocks the push:
 *   - NO ENTRY: not read yet (`miss`), or the bead declares no scope anywhere.
 *   - `{ scope: [], artifacts }`: the source was read, nothing declared.
 *   - `null`: unreadable (missing artifact, git failure, unresolved base).
 *
 * ONE source per bead (UI-f1qy §4.3): the document artifact when the bead has
 * one, otherwise the issue description's `## scope` section, which ships with
 * `artifacts: []`. The description source never yields `null` — the parse is
 * local and has no failure concept, so 무효 항목은 무시, 부재는 미선언이다.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, { scope: string[], artifacts: string[] }|null>}
 */
function beadScopeFor(workspace_key, queue) {
  const scopes = scopeCacheHandle();
  if (!scopes) {
    return {};
  }
  /** @type {Record<string, { scope: string[], artifacts: string[] }|null>} */
  const out = {};
  /**
   * @param {string} bead_id
   * @param {string[]} artifacts
   */
  const readInto = (bead_id, artifacts) => {
    const peeked = scopes.peek(workspace_key, artifacts);
    if (peeked.state === 'hit') {
      out[bead_id] = { scope: peeked.scope, artifacts };
    } else if (peeked.state === 'failed') {
      out[bead_id] = null;
    }
  };
  const ids = laneMemberIds(queue, true);
  try {
    const titles = titleCacheHandle();
    if (titles && ids.length > 0) {
      const artifacts_by_bead = titles.scopeArtifactsFor(workspace_key, ids);
      for (const [bead_id, artifacts] of Object.entries(artifacts_by_bead)) {
        readInto(bead_id, artifacts);
      }
      // 아티팩트가 있는 bead는 그쪽이 유일한 원천이므로 아직 읽히지 않았어도
      // (`miss` → NO ENTRY) description으로 내려오지 않는다 (§3 우선순위).
      const described = titles.descriptionScopeFor(workspace_key, ids);
      for (const [bead_id, scope] of Object.entries(described)) {
        if (bead_id in out || bead_id in artifacts_by_bead) {
          continue;
        }
        out[bead_id] = { scope, artifacts: [] };
      }
    }
  } catch (err) {
    log('bead scope lookup failed for %s: %o', workspace_key, err);
  }
  // 후보 lane (UI-f3ma): the scope source comes from the runnable projection
  // rather than the title cache, because a bead that has never entered a lane
  // has no title-cache record to read it from. It is the SAME source either way
  // — the same artifact set (`RunnableItem.plan_path` exists for exactly this
  // reason), or the same description section — so loading a candidate into a
  // lane cannot change its verdict.
  try {
    for (const item of runnableRows(workspace_key, queue)) {
      const bead_id = typeof item.bead_id === 'string' ? item.bead_id : '';
      if (bead_id.length === 0 || bead_id in out) {
        continue;
      }
      // 행의 scope 원천은 `scope_spec_id`가 정한다 — admission `spec_id`는
      // quick_fix에서 언제나 비어 있어 원천 판정에 쓸 수 없다 (UI-f1qy §4.4).
      const spec_id =
        typeof item.scope_spec_id === 'string' ? item.scope_spec_id : '';
      if (spec_id.length > 0) {
        const plan_path =
          typeof item.plan_path === 'string' && item.plan_path.length > 0
            ? item.plan_path
            : '';
        readInto(bead_id, plan_path ? [spec_id, plan_path] : [spec_id]);
        continue;
      }
      if (Array.isArray(item.description_scope)) {
        out[bead_id] = { scope: item.description_scope, artifacts: [] };
      }
    }
  } catch (err) {
    log('runnable scope lookup failed for %s: %o', workspace_key, err);
  }
  // 세션이 잡은 실행중 bead (UI-anna §3.1): attempt가 없어 레인 집합에 걸리지
  // 않고 큐에도 없을 수 있다. 원천 사다리는 후보 행과 같다 — 아티팩트 집합
  // (`[spec_id, plan_path?]`)이 있으면 그쪽이 유일한 원천이고, 없으면
  // description의 `## scope` 절이다 (UI-zw6j). 사다리가 같아야 같은 bead가 세션
  // 착수에서 큐 적재로 옮겨가도 겹침 판정이 달라지지 않는다.
  try {
    /** @type {string[]} */
    const described_ids = [];
    for (const item of sessionActiveRows(workspace_key, queue)) {
      const bead_id = typeof item.bead_id === 'string' ? item.bead_id : '';
      if (bead_id.length === 0 || bead_id in out) {
        continue;
      }
      const spec_id = typeof item.spec_id === 'string' ? item.spec_id : '';
      if (spec_id.length === 0) {
        // 아티팩트 없는 세션 행의 description은 title 캐시가 읽는다: 세션 행은
        // description을 싣지 않고, 후보 투영은 `open`만 담아 이 bead의 행을
        // 아예 만들지 않는다. 파서와 입력이 후보 경로와 같으므로 판정도 같다.
        // 아직 적재되지 않은 record는 NO ENTRY로 남고, 채워지면 그 fanout이
        // 다음 스냅샷에 싣는다 — 아티팩트 경로의 `miss`와 같은 읽기다.
        described_ids.push(bead_id);
        continue;
      }
      const plan_path =
        typeof item.plan_path === 'string' && item.plan_path.length > 0
          ? item.plan_path
          : '';
      readInto(bead_id, plan_path ? [spec_id, plan_path] : [spec_id]);
    }
    const titles = described_ids.length > 0 ? titleCacheHandle() : null;
    if (titles) {
      const described = titles.descriptionScopeFor(
        workspace_key,
        described_ids
      );
      for (const [bead_id, scope] of Object.entries(described)) {
        if (bead_id in out) {
          continue;
        }
        out[bead_id] = { scope, artifacts: [] };
      }
    }
  } catch (err) {
    log('session scope lookup failed for %s: %o', workspace_key, err);
  }
  return out;
}

/**
 * This workspace's 후보 rows for the scope decoration (UI-f3ma), minus the
 * beads already standing in a lane. Side-effect-free like
 * {@link sessionActiveRows}: the snapshot decoration must never trigger a
 * `bd list` refill of its own.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Array<Record<string, any>>}
 */
function runnableRows(workspace_key, queue) {
  try {
    return (
      getWorkerRuntime().runnableCache.runnablePeek(
        workspace_key,
        laneMemberIds(queue, true)
      ) || []
    );
  } catch (err) {
    log('runnable lookup failed for %s: %o', workspace_key, err);
    return [];
  }
}

/**
 * The four partial lane decorations (`titlesFor` · `timesFor` · `labelsFor` ·
 * `blockedByFor`) share one id set: `queue` ∪ `pr_wait` ∪ `done` ∪ the serial
 * lanes ∪ the 실행중 레인 beads (UI-anna §3.2). The running lane is in the set
 * so a bead a SESSION started — one that stands in no lane array — still
 * carries its blockers; a running bead that kept its queue entry was already
 * covered. Every decoration here is additive, so a wider set only adds
 * material and changes no existing verdict.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @param {'titlesFor'|'timesFor'|'labelsFor'|'blockedByFor'} method
 * @returns {any}
 */
function beadDecorationFor(workspace_key, queue, method) {
  const cache = titleCacheHandle();
  if (!cache) {
    return {};
  }
  /** @type {string[]} */
  const ids = [];
  const decorated_lanes = [
    ...['queue', 'pr_wait', 'done'].map((lane) => queue[lane]),
    ...(Array.isArray(queue.serial_lanes)
      ? /** @type {any[]} */ (queue.serial_lanes).map((lane) => lane?.entries)
      : [])
  ];
  for (const lane_entries of decorated_lanes) {
    const entries = Array.isArray(lane_entries)
      ? /** @type {any[]} */ (lane_entries)
      : [];
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.push(bead_id);
      }
    }
  }
  ids.push(...runningLaneBeadIds(queue));
  if (ids.length === 0) {
    return {};
  }
  try {
    return cache[method](workspace_key, ids);
  } catch (err) {
    log('bead %s lookup failed for %s: %o', method, workspace_key, err);
    return {};
  }
}

/**
 * The attempt fields that are recorded durably but must NOT ride the
 * worker-state push (UI-rxp3 §3): the full system + task prompts, plus the
 * disposition lane's own task prompt, which is a prompt body by the same
 * measure and has no client reader. A queue
 * snapshot carries every attempt of every lane and is pushed on every
 * transition — through this one projection, which the Monitor channel's
 * cross-workspace aggregation reuses — so shipping multi-kilobyte prompt bodies
 * per attempt would bloat the channel for a value almost no render reads. The
 * UI fetches them on demand instead (`get-attempt-prompt` / `get-bead-prompt`).
 * The scheduler's own `disposition_prompt` reader goes through the store, not
 * this projection, so dropping it here changes no server behaviour.
 *
 * @type {string[]}
 */
const PROMPT_FIELDS = ['system_prompt', 'task_prompt', 'disposition_prompt'];

/**
 * Drop {@link PROMPT_FIELDS} from one attempt. A record that carries neither is
 * returned untouched so the common case allocates nothing.
 *
 * @param {any} attempt
 * @returns {any}
 */
function stripPrompts(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return attempt;
  }
  if (!PROMPT_FIELDS.some((field) => field in attempt)) {
    return attempt;
  }
  const out = { ...attempt };
  for (const field of PROMPT_FIELDS) {
    delete out[field];
  }
  return out;
}

/**
 * Human label for one delegation leg (UI-eey2 §9.3).
 *
 * The ordinal is the only count available: the durable vocabulary carries no
 * total unit count, and inventing one ("unit 3/5") would state a fact no
 * producer wrote. `구현 unit 3 · codex` therefore says exactly what is known.
 *
 * @param {string|null} role
 * @param {string|null} runtime
 * @param {number} ordinal
 * @param {string|null} [agent_type] - The Claude subagent's own type, which is
 * the only name a subagent row has: there is no unit number to count and the
 * ordinal would say nothing (UI-2mpn §6.2).
 * @returns {string}
 */
function legLabelOf(role, runtime, ordinal, agent_type = null) {
  const suffix = runtime ? ` · ${runtime}` : '';
  if (role === 'implementation') {
    return `구현 unit ${ordinal}${suffix}`;
  }
  if (role === 'review-consult') {
    return `review-consult${suffix}`;
  }
  if (role === 'subagent') {
    return `${agent_type || 'subagent'}${suffix}`;
  }
  return `위임 ${ordinal}${suffix}`;
}

/**
 * The delegation legs of ONE running attempt, derived purely from evidence the
 * attempt already carries (UI-eey2 §9.3): the live/durable
 * `delegation_sessions[]` launches and the `usage_legs[]` receipts. No new
 * producer contract and no new durable vocabulary — a leg the monitor stream
 * never observed still appears through its usage receipt, in the `done` state
 * a receipt implies.
 *
 * Launches lead the ordering because they are the only rows with a start time;
 * receipts with no matching launch follow in their own recorded order.
 *
 * @param {any} attempt
 * @param {import('../worker/queue-store.js').DelegationSession[]} delegation_sessions
 * @returns {Array<{ role: string|null, runtime: string|null, model: string|null, agent_type?: string, state: 'live'|'done'|'failed', ordinal: number, label: string }>}
 */
function attemptLegs(attempt, delegation_sessions) {
  /** @type {Array<{ role: string|null, runtime: string|null, model: string|null, agent_type: string|null, state: 'live'|'done'|'failed' }>} */
  const rows = [];
  /** @type {Set<string>} */
  const seen = new Set();
  const launches = [...delegation_sessions].sort(
    (a, b) => (a?.started_at || 0) - (b?.started_at || 0)
  );
  for (const session of launches) {
    if (!session || typeof session !== 'object') {
      continue;
    }
    seen.add(`${session.session_id || ''}\u0000${session.turn_id || ''}`);
    rows.push({
      role: typeof session.role === 'string' ? session.role : null,
      runtime: typeof session.provider === 'string' ? session.provider : null,
      model: typeof session.model === 'string' ? session.model : null,
      agent_type:
        typeof session.agent_type === 'string' ? session.agent_type : null,
      state:
        session.status === 'running'
          ? 'live'
          : session.status === 'done'
            ? 'done'
            : 'failed'
    });
  }
  const usage_legs = Array.isArray(attempt?.usage_legs)
    ? attempt.usage_legs
    : [];
  for (const leg of usage_legs) {
    if (!leg || typeof leg !== 'object') {
      continue;
    }
    // A receipt exists only after the leg finished, so an unmatched one is a
    // completed leg whose launch this process never saw (a restart, typically).
    if (seen.has(`${leg.session_id || ''}\u0000${leg.turn_id || ''}`)) {
      continue;
    }
    rows.push({
      role: typeof leg.role === 'string' ? leg.role : null,
      runtime: typeof leg.provider === 'string' ? leg.provider : null,
      model: typeof leg.model === 'string' ? leg.model : null,
      agent_type: typeof leg.agent_type === 'string' ? leg.agent_type : null,
      state: 'done'
    });
  }
  /** @type {Map<string, number>} */
  const ordinals = new Map();
  return rows.map((row) => {
    const role_key = row.role || '';
    const ordinal = (ordinals.get(role_key) || 0) + 1;
    ordinals.set(role_key, ordinal);
    const { agent_type, ...rest } = row;
    // Only a Claude subagent has one, and a Codex row's projection must stay
    // byte-identical to what it was before subagents existed.
    return {
      ...rest,
      ...(agent_type === null ? {} : { agent_type }),
      ordinal,
      label: legLabelOf(row.role, row.runtime, ordinal, agent_type)
    };
  });
}

/**
 * Project the attempts map with the LIVE, non-persisted per-attempt values
 * folded in: the token tally (UI-raqh §1) and `last_event_at`, the time of the
 * attempt's last session-log line (UI-53es §1), which the monitor row turns
 * into its heartbeat. Both apply to RUNNING attempts only — a terminated one
 * keeps whatever was persisted onto its record. A pure read of the shared
 * stores; the scheduler and the session-log broker are the only writers.
 *
 * @param {Record<string, unknown>} queue
 * @param {string} workspace_key
 * @returns {Record<string, unknown>}
 */
export function attemptsWithUsage(queue, workspace_key) {
  const attempts = /** @type {Record<string, any>} */ (queue.attempts || {});
  /** @type {ReturnType<typeof import('../worker/usage-store.js').createUsageStore>|null} */
  let store = null;
  /** @type {ReturnType<typeof import('../worker/session-log.js').createSessionLog>|null} */
  let session_log = null;
  try {
    const runtime = getWorkerRuntime();
    store = runtime.usageStore;
    session_log = runtime.sessionLog;
  } catch {
    store = null;
    session_log = null;
  }
  const delegation_store = delegationStoreOrNull();
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [attempt_id, attempt] of Object.entries(attempts)) {
    const running = Boolean(attempt) && attempt.status === 'running';
    const live = running && store ? store.get(workspace_key, attempt_id) : null;
    const last_event_at =
      running && session_log && typeof session_log.lastEventAt === 'function'
        ? session_log.lastEventAt(workspace_key, attempt_id)
        : null;
    /** @type {any} */
    let projected = stripPrompts(attempt);
    if (live) {
      projected = { ...projected, usage: live };
    }
    if (running) {
      // Claude subagent receipts come off the in-memory delegation store, not
      // an inbox directory (UI-2mpn §5.4): the parent stream is their only
      // producer. Order is immaterial to the first-record dedupe here — the
      // receipt reader already drops what durable holds, and a running attempt
      // has no settled subagent copy to disagree with.
      const live_legs = delegation_store
        ? delegation_store.get(workspace_key, attempt_id).legs
        : [];
      try {
        const scanned = readAttemptUsageReceipts(workspace_key, attempt_id, {
          known_legs: attempt.usage_legs
        });
        if (scanned.legs.length > 0 || live_legs.length > 0) {
          projected = {
            ...projected,
            usage_legs: normalizeUsageLegs([
              ...live_legs,
              ...scanned.legs,
              ...(Array.isArray(attempt.usage_legs) ? attempt.usage_legs : [])
            ])
          };
        }
      } catch (err) {
        log('usage receipt overlay failed for %s: %o', attempt_id, err);
      }
      const delegation_sessions = delegationSessionsForAttempt(
        workspace_key,
        attempt
      );
      if (delegation_sessions.length > 0) {
        projected = { ...projected, delegation_sessions };
      }
      // The running card's progress detail (UI-eey2 §9.3). Both are live-only
      // and fail-quiet: an attempt with no observed line and no delegation
      // simply carries neither key, and the card renders without those rows.
      const activity =
        session_log && typeof session_log.lastActivity === 'function'
          ? session_log.lastActivity(workspace_key, attempt_id)
          : null;
      if (activity) {
        projected = { ...projected, last_activity: activity };
      }
      const legs = attemptLegs(
        /** @type {any} */ (projected),
        delegation_sessions
      );
      if (legs.length > 0) {
        projected = { ...projected, legs };
      }
    }
    if (typeof last_event_at === 'number') {
      projected = { ...projected, last_event_at };
    }
    out[attempt_id] = projected;
  }
  return out;
}

/**
 * Overlay validated live delegation summaries onto one running attempt. The
 * durable identity is handed back to the reader as the conflict boundary;
 * live rows then lead the merge so newer status/activity wins.
 *
 * @param {string} workspace
 * @param {any} attempt
 * @returns {import('../worker/queue-store.js').DelegationSession[]}
 */
function delegationSessionsForAttempt(workspace, attempt) {
  const durable = normalizeDelegationSessions(attempt?.delegation_sessions);
  if (!attempt || attempt.status !== 'running') {
    return durable;
  }
  const attempt_id = String(attempt.attempt_id || '');
  // Claude subagents have no monitor directory: the parent stream is their only
  // evidence, and `delegation-store` is where reading it accumulates
  // (UI-2mpn §5.4). Merged here rather than at the call sites so the snapshot
  // overlay and the transcript authorization can never see different rows.
  const delegation_store = delegationStoreOrNull();
  const live = delegation_store
    ? delegation_store.get(workspace, attempt_id).sessions
    : [];
  try {
    const scanned = readAttemptDelegationStreams(workspace, attempt_id, {
      known_sessions: durable
    });
    return normalizeDelegationSessions([
      ...live,
      ...scanned.sessions,
      ...durable
    ]);
  } catch {
    return normalizeDelegationSessions([...live, ...durable]);
  }
}

/**
 * The process-wide delegation store, or null when no worker runtime exists
 * (the ws handlers are unit-tested without one).
 *
 * @returns {ReturnType<typeof import('../worker/delegation-store.js').createDelegationStore>|null}
 */
function delegationStoreOrNull() {
  try {
    return getWorkerRuntime().delegationStore || null;
  } catch {
    return null;
  }
}

/**
 * The durable `CompletionPhase` vocabulary, mirrored here because the queue
 * schema does not export its list. The auto-resolution phases are DERIVED from
 * the exported class→phase binding rather than retyped: a mirror that misses a
 * phase projects a live intent as `intent_state_invalid`, which is how UI-hk74
 * §4's three new phases would have been hidden from the card entirely.
 *
 * @type {Set<string>}
 */
const COMPLETION_PHASES = new Set([
  'gating',
  'merging',
  'cleaning',
  ...Object.values(COMPLETION_AUTO_RESOLUTION_PHASE),
  'paused',
  'needs_human',
  'completed'
]);

/**
 * @param {unknown} value
 * @param {number} [limit]
 * @returns {string|null}
 */
function boundedCompletionText(value, limit = 4000) {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  return value.slice(-limit);
}

/**
 * Project the non-terminal automatic resolution state (UI-hk74 §4) the row
 * badge reads. Only the fields §9 shows travel: the class that names the badge,
 * the original terminal reason, the retry budget, its next wake, and the last
 * error. `op` stays server-side — it is coordinator input, not display.
 *
 * A record whose `class` is unrecognized projects as absent rather than as a
 * badge nobody can read (fail-quiet, the workflow-contract consumer rule).
 *
 * @param {unknown} raw
 * @returns {{ class: string, origin_reason: string|null, attempts: number, attempt_cap: number, next_at: number|null, last_error: string|null }|null}
 */
function projectAutoResolution(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }
  const value = /** @type {Record<string, unknown>} */ (raw);
  const resolution_class = value.class;
  if (
    typeof resolution_class !== 'string' ||
    !(resolution_class in COMPLETION_AUTO_RESOLUTION_PHASE)
  ) {
    return null;
  }
  return {
    class: resolution_class,
    origin_reason: boundedCompletionText(value.origin_reason, 500),
    attempts: Number.isInteger(value.attempts)
      ? Math.max(0, Number(value.attempts))
      : 0,
    attempt_cap: COMPLETION_RETRY_MAX,
    next_at:
      typeof value.next_at === 'number' && Number.isFinite(value.next_at)
        ? value.next_at
        : null,
    last_error: boundedCompletionText(value.last_error, 500)
  };
}

/**
 * Project the durable coordinator journal into the bounded UI contract. Raw
 * operations never cross the wire; the client gets only root identity, phase,
 * and pinned evidence. A malformed journal is visible as terminal instead of
 * disappearing.
 *
 * @param {string} workspace_key
 * @param {Record<string, any>} queue
 * @returns {Record<string, any>}
 */
function completionStatusFor(workspace_key, queue) {
  const raw_intents =
    queue.completion_intents &&
    typeof queue.completion_intents === 'object' &&
    !Array.isArray(queue.completion_intents)
      ? queue.completion_intents
      : {};
  /** @type {Record<string, any>} */
  const statuses = {};
  for (const [root_bead_id, raw] of Object.entries(raw_intents)) {
    const value =
      raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : null;
    const subject =
      value?.subject &&
      typeof value.subject === 'object' &&
      !Array.isArray(value.subject)
        ? value.subject
        : null;
    const valid =
      value !== null &&
      COMPLETION_PHASES.has(value.phase) &&
      subject !== null &&
      subject.role === 'root' &&
      typeof subject.bead_id === 'string' &&
      subject.bead_id.length > 0;
    if (!valid) {
      statuses[root_bead_id] = {
        root_bead_id,
        phase: 'needs_human',
        subject_role: null,
        subject_bead_id: root_bead_id,
        head_sha: null,
        base_sha: null,
        merged_sha: null,
        active_attempt_id: null,
        failure_stage: 'state',
        failure_reason: 'intent_state_invalid',
        evidence: 'completion_intent_malformed',
        log_path: null,
        terminal_reason: 'intent_state_invalid',
        auto_resolution: null
      };
      continue;
    }
    const active_op =
      value.active_op &&
      typeof value.active_op === 'object' &&
      !Array.isArray(value.active_op)
        ? value.active_op
        : null;
    const terminal =
      value.terminal_reason &&
      typeof value.terminal_reason === 'object' &&
      !Array.isArray(value.terminal_reason)
        ? value.terminal_reason
        : null;
    const cleanup =
      queue.cleanup_failed?.[root_bead_id] &&
      typeof queue.cleanup_failed[root_bead_id] === 'object'
        ? queue.cleanup_failed[root_bead_id]
        : null;
    const failure_key = terminal?.failure_key || active_op?.failure_key || null;
    let evidence = boundedCompletionText(terminal?.evidence);
    let log_path = boundedCompletionText(terminal?.log_path, 1000);
    if (evidence === null && cleanup) {
      evidence =
        boundedCompletionText(cleanup.output_tail) ||
        boundedCompletionText(cleanup.detail);
    }
    if (log_path === null && cleanup) {
      log_path = boundedCompletionText(cleanup.log_path, 1000);
    }
    if (evidence === null || log_path === null) {
      let observed = null;
      try {
        observed = getWorkerRuntime().prObservations.get(
          workspace_key,
          root_bead_id
        );
      } catch {
        observed = null;
      }
      if (evidence === null) {
        evidence = boundedCompletionText(observed?.verify?.output_tail);
      }
      if (log_path === null) {
        log_path = boundedCompletionText(observed?.verify?.log_path, 1000);
      }
    }
    statuses[root_bead_id] = {
      root_bead_id,
      phase: value.phase,
      subject_role: subject.role,
      subject_bead_id: subject.bead_id,
      head_sha: boundedCompletionText(subject.head_sha, 64),
      base_sha: boundedCompletionText(subject.base_sha, 64),
      merged_sha: boundedCompletionText(subject.merged_sha, 64),
      active_attempt_id: boundedCompletionText(active_op?.attempt_id, 200),
      failure_stage:
        boundedCompletionText(failure_key?.stage, 200) ||
        boundedCompletionText(terminal?.stage, 200) ||
        boundedCompletionText(cleanup?.step, 200),
      failure_reason:
        boundedCompletionText(failure_key?.reason, 500) ||
        boundedCompletionText(terminal?.reason, 500) ||
        boundedCompletionText(cleanup?.reason, 500),
      evidence,
      log_path,
      terminal_reason: boundedCompletionText(terminal?.reason, 500),
      auto_resolution: projectAutoResolution(value.auto_resolution)
    };
  }
  return statuses;
}

/** Bytes of operation log the card carries inline. */
const OPERATION_TAIL_BYTES = 2000;

/**
 * Read the tail of an operation log with credentials removed. Bounded by
 * construction — the card shows a tail, the full log stays behind its path.
 *
 * @param {unknown} log_path
 * @returns {string}
 */
function operationOutputTail(log_path) {
  if (typeof log_path !== 'string' || log_path.length === 0) {
    return '';
  }
  try {
    const size = nodeFs.statSync(log_path).size;
    const start = Math.max(0, size - OPERATION_TAIL_BYTES);
    const length = size - start;
    if (length <= 0) {
      return '';
    }
    const buffer = Buffer.alloc(length);
    const fd = nodeFs.openSync(log_path, 'r');
    try {
      nodeFs.readSync(fd, buffer, 0, length, start);
    } finally {
      nodeFs.closeSync(fd);
    }
    return sanitizeOutput(buffer.toString('utf8'));
  } catch {
    return '';
  }
}

/**
 * Project the durable RepoOperation records as UI cards (master spec §10).
 *
 * Each card carries kind, target SHA/tree, script path and blob, elapsed time,
 * state, a sanitized output tail, the full log path, and the exit code. It also
 * carries `failure_kind` — the pinned contract's classification — so the client
 * can NAME the failure without deciding for itself what it is. There is
 * deliberately no retry or resolve affordance in this projection: after the one
 * automatic `script_retry` a failure is terminal (UI-s582 §2).
 *
 * @param {unknown} operations
 * @returns {Record<string, any>[]}
 */
function projectRepoOperations(operations) {
  if (!operations || typeof operations !== 'object') {
    return [];
  }
  /** @type {Record<string, any>[]} */
  const cards = [];
  for (const [operation_id, raw] of Object.entries(
    /** @type {Record<string, any>} */ (operations)
  )) {
    // `schema` is the durable record marker the store's normalizer writes; a
    // row without it is unreadable and is dropped rather than half-projected.
    if (!raw || typeof raw !== 'object' || raw.schema !== 1) {
      continue;
    }
    const terminal_failure = raw.state === 'failed';
    const failure = raw.failure || null;
    cards.push({
      operation_id,
      kind: raw.kind,
      repo_id: raw.repo_id,
      target_base: raw.target_base,
      target_sha: raw.target_sha,
      target_tree: raw.target_tree,
      effective_base_sha: raw.effective_base_sha,
      script_path: raw.script_path ?? null,
      script_blob_sha: raw.script_blob_sha,
      script_mode: raw.script_mode,
      state: raw.state,
      requested_at: raw.requested_at,
      started_at: raw.started_at,
      finished_at: raw.finished_at,
      elapsed_ms:
        typeof raw.started_at === 'number'
          ? (typeof raw.finished_at === 'number'
              ? raw.finished_at
              : Date.now()) - raw.started_at
          : null,
      exit_code: raw.exit_code,
      signal: raw.signal,
      log_path: raw.log_path,
      log_digest: raw.log_digest,
      output_tail: terminal_failure ? operationOutputTail(raw.log_path) : '',
      subjects: Array.isArray(raw.subjects) ? raw.subjects : [],
      failure: failure
        ? {
            code: failure.code,
            fingerprint: failure.fingerprint,
            detail: sanitizeOutput(failure.detail),
            interrupted: failure.interrupted === true,
            ...(failure.fetch_failure
              ? { fetch_failure: failure.fetch_failure }
              : {}),
            ...(Number.isFinite(failure.elapsed_ms)
              ? { elapsed_ms: failure.elapsed_ms }
              : {})
          }
        : null,
      failure_kind: failure ? classifyRepoOperationFailure(raw) : null,
      // Pre- vs post-merge verify (master spec §9.2) decides which resolve
      // wording the card offers. A post-merge verify runs against the merged
      // commit, so its bound target is no longer the PR head it was cut from.
      verify_stage:
        raw.kind !== 'verify'
          ? null
          : typeof raw.target_sha === 'string' &&
              typeof raw.verify_head_sha === 'string' &&
              raw.target_sha !== raw.verify_head_sha
            ? 'post_merge'
            : 'pre_merge',
      retry: {
        status: normalizeScriptRetry(raw).status,
        first_fingerprint: raw.retry?.first_fingerprint || null,
        // The failure the FIRST attempt died of, so a consumed retry whose
        // second failure differs can name what changed (UI-s582 §2). Sanitized
        // exactly like the terminal failure it sits beside.
        first_failure: raw.retry?.first_failure
          ? {
              code: raw.retry.first_failure.code,
              fingerprint: raw.retry.first_failure.fingerprint,
              detail: sanitizeOutput(raw.retry.first_failure.detail),
              interrupted: raw.retry.first_failure.interrupted === true
            }
          : null,
        blocked_reason: raw.retry?.blocked_reason || null,
        absorbed: raw.retry?.absorbed || null
      },
      superseded_by: raw.superseded_by,
      // Who asked for this operation (UI-s582 §3.7): `manual` is the 배포 실행
      // click, everything else is the Worker's own work.
      source: raw.source === 'manual' ? 'manual' : 'automatic',
      // A human acknowledged this failed row (UI-q0uy §4.6-2). Projected so the
      // client can drop it from the 해결 필요 tally without inventing its own
      // notion of "handled".
      dismissed: raw.dismissed ?? null
    });
  }
  cards.sort(
    (left, right) =>
      (right.requested_at || 0) - (left.requested_at || 0) ||
      left.operation_id.localeCompare(right.operation_id)
  );
  return cards;
}

/**
 * This workspace's session-held beads for one snapshot (UI-0a2m). A synchronous
 * SIDE-EFFECT-FREE cache read — decoration runs on every reply and fanout, so
 * it must never itself spawn a scan. Freshness is owned elsewhere: the
 * subscribe-time `refresh` in {@link handleSubscribeWorkerQueue} and the
 * monitor module's periodic driver, whose fill completion re-pushes this
 * workspace's snapshot. Fail-quiet — a broken cache must not block the
 * snapshot.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue - The snapshot whose lanes/attempts
 * define the exclusion set.
 * @returns {Array<Record<string, unknown>>}
 */
function sessionActiveRows(workspace_key, queue) {
  try {
    return (
      getWorkerRuntime().runnableCache.sessionActivePeek(
        workspace_key,
        sessionExcludedBeadIds(queue)
      ) || []
    );
  } catch (err) {
    log('session_active lookup failed for %s: %o', workspace_key, err);
    return [];
  }
}

/**
 * One bead's TRANSFERRED attempt records, or an empty list (§7).
 *
 * `readAttemptsForBead` returns the union of the live queue and the record
 * tree; the live half is already in the projection, so only the ids the
 * projection lacks survive the caller's dedupe.
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @returns {any[]}
 */
function transferredAttemptsFor(workspace_key, bead_id) {
  try {
    const store = getWorkerRuntime().queueStore;
    if (typeof store.readAttemptsForBead !== 'function') {
      return [];
    }
    return store.readAttemptsForBead(workspace_key, bead_id);
  } catch {
    return [];
  }
}

/**
 * Attach the declared scope to each `session_active` row (UI-anna §3.1), the
 * same additive shape `withRunnableScope` gives a runnable row.
 *
 * The value is COPIED from the `bead_scope` decoration this same snapshot
 * carries rather than peeked again: {@link beadScopeFor} already read those
 * rows through the candidate ladder — `[spec_id, plan_path?]` at the pinned
 * base, else the description's `## scope` section — and one ladder is what
 * makes 세션 착수 → 큐 적재 leave the overlap verdict alone. `null` (unreadable)
 * and a missing entry both leave the field off — absence is 판정 불가, never
 * "no scope".
 *
 * @param {Array<Record<string, unknown>>} rows
 * @param {Record<string, { scope: string[], artifacts: string[] }|null>} bead_scope
 * @returns {Array<Record<string, unknown>>}
 */
function withSessionScope(rows, bead_scope) {
  return rows.map((row) => {
    const bead_id = typeof row.bead_id === 'string' ? row.bead_id : '';
    const entry = bead_id.length > 0 ? bead_scope[bead_id] : undefined;
    if (!entry || !Array.isArray(entry.scope)) {
      return row;
    }
    return { ...row, scope: entry.scope };
  });
}

/**
 * Decorate a queue snapshot with computed, non-persisted workspace info:
 *   - the pinned repository-operation declaration used by the merge gate,
 *   - `slots` (the live concurrency cap from the attachment), so the tab can
 *     flag live sessions exceeding the cap after a manual resume
 *     (worker-phase1 §2.3, worker-phase2 §3),
 *   - the EXTERNAL PR rows overlaid onto `pr_wait` (UI-7agi §2) — beads a normal
 *     session delivered a PR for, which no attempt ever placed in the lane,
 *   - `pr_observations`: what the PR poller has SEEN for each `pr_wait` bead
 *     plus its merge-gate verdict (worker-phase2 §4/§5) — a pure cache read,
 *   - `bead_times`: 생성·수정 시각 for those same beads (UI-d7pw §4.3), on the
 *     same partiality contract as `bead_titles`.
 *   - `declared_base`: the workspace's DECLARED target base (UI-j6wa §3), read
 *     from the declaration only — never the fetching five-step resolve, which
 *     belongs to the dispatch path. Null when the declaration exists but cannot
 *     be read as one, so the chip can say `base ?` instead of claiming `main`,
 *   - `bead_titles`: display titles for the queue/pr_wait/done beads (UI-12k6),
 *     which are in no subscribed issue column and would otherwise render as
 *     bare ids,
 *   - `runner_catalog`: the resolved runner/model catalog (UI-jrb3 §7) the
 *     exec-setting selectors render from, so the client never keeps its own copy
 *     of a table `config.toml` can extend,
 *
 * Exported since UI-nprg: the monitor's cross-workspace aggregation builds its
 * per-workspace payload with THIS function rather than a second assembly path,
 * so both channels ship the same decorated contract.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} raw_queue
 * @returns {Record<string, unknown>}
 */
export function decorateQueue(workspace_key, raw_queue) {
  // Overlaid FIRST so every decoration below — observations, activity, titles —
  // sees the external rows without knowing they exist (UI-7agi §2).
  const overlaid = withExternalPrWait(workspace_key, raw_queue);
  const completion_status = completionStatusFor(workspace_key, overlaid);
  /** @type {Record<string, any>} */
  const public_queue = { ...overlaid };
  // Push-projection retention (UI-qbbg §4.1), applied BEFORE every lane-based
  // decoration below so the operation cards, the title/time/label maps and the
  // client's own classifier all read the same trimmed projection. The judgment
  // input stays the full overlaid raw. A throwing rule ships the untrimmed
  // snapshot (§6): the payload size regresses, the display does not break.
  try {
    const trimmed = trimQueueProjection(
      public_queue,
      overlaid,
      Date.now(),
      // The transferred records of the beads that stay on the wire (§7). Read
      // here rather than inside the rule so the retention module keeps its
      // no-I/O contract; a store without the query API (or one that throws)
      // simply tops nothing up.
      {
        attemptsForBead: (bead_id) =>
          transferredAttemptsFor(workspace_key, bead_id)
      }
    );
    public_queue.done = trimmed.done;
    public_queue.attempts = trimmed.attempts;
    public_queue.repo_operations = trimmed.repo_operations;
  } catch (err) {
    log('snapshot retention failed for %s: %o', workspace_key, err);
  }
  public_queue.admission = publicAdmissions(overlaid.admission);
  // `hold` and `lineages` DO travel — the stop banner and its 다음 HH:MM are
  // drawn from them (2026-08-28 worker-failure-tiers spec §8). `hold_history` is
  // the reducer's own 30-minute working memory: nothing renders it, so it stays
  // server-side like `completion_intents`.
  delete public_queue.hold_history;
  delete public_queue.completion_intents;
  delete public_queue.last_deploy;
  delete public_queue.reconcile;
  // The RepoOperation lane's PUBLIC surface (master spec §4.5, §10): the
  // operation cards and the pinned policy projection. The raw records never
  // travel — a card is a display projection with a bounded sanitized tail, and
  // the policy is read from the pinned contract copy so no policy sentence is
  // authored here.
  // The workspace's per-kind opt-out from the DECLARED operations (UI-lsti §3).
  // A legacy queue with no key travels as both kinds running, which is the
  // state every such workspace is actually in.
  public_queue.repo_ops_opt_out = {
    verify: /** @type {any} */ (overlaid).repo_ops_opt_out?.verify === true,
    deploy: /** @type {any} */ (overlaid).repo_ops_opt_out?.deploy === true
  };
  // Only the OPERATIONS are trimmed (UI-qbbg §4.3).
  public_queue.repo_operations = projectRepoOperations(
    public_queue.repo_operations
  );
  public_queue.repo_operation_policy = projectRepoOperationPolicy();
  public_queue.cleanup_failed = overlaid.cleanup_failed || {};
  public_queue.discard_operations = publicDiscardOperations(
    overlaid.discard_operations
  );
  /** @type {Record<string, any>} */
  const queue = {
    ...public_queue,
    queue: Array.isArray(overlaid.queue) ? overlaid.queue : [],
    pr_wait: Array.isArray(overlaid.pr_wait) ? overlaid.pr_wait : [],
    done: Array.isArray(public_queue.done) ? public_queue.done : [],
    completion_status
  };
  const repo_ops = repoOpsDisplayFor(workspace_key);
  const verify_policy = effectiveVerifyPolicy(repo_ops, queue);
  // The canonical repository the attachment operates on (UI-s582 §3). It rides
  // the declaration rather than a key of its own because every consumer that
  // needs it — the 배포 실행 click — is already reading the declaration, and a
  // workspace with no attachment projects `null` instead of guessing.
  /** @type {string|null} */
  let repo_id = null;
  try {
    repo_id = workerRepoId(workspace_key);
  } catch {
    repo_id = null;
  }
  /** @type {number|null} */
  let slots = null;
  try {
    slots = workerSlots(workspace_key);
  } catch {
    slots = null;
  }
  // Without a registered attachment the decoration falls back to the queue's
  // own persisted cap so the editor still renders the value it will mutate.
  if (slots === null && typeof queue.slots === 'number') {
    slots = queue.slots;
  }
  /** @type {string|null} */
  let declared_base = null;
  try {
    declared_base = readDeclaredBase(String(workspace_key || ''));
  } catch {
    declared_base = null;
  }
  // The resolved runner/model catalog (UI-jrb3 §7) — the source the exec-setting
  // selectors render their grouped model options and per-model effort lists
  // from. Non-persisted like every other decoration here, and fail-quiet: a
  // catalog that cannot be resolved travels as null and the client falls back to
  // showing the stored value alone rather than an empty selector.
  /** @type {import('../worker/runner-catalog.js').ResolvedCatalog|null} */
  let runner_catalog = null;
  try {
    runner_catalog = runtimeCatalog();
  } catch {
    runner_catalog = null;
  }
  let execution_defaults;
  try {
    execution_defaults = projectExecutionDefaults(runner_catalog);
  } catch {
    execution_defaults = {
      schema_version: null,
      supported: false,
      source_commit: null,
      digest: null,
      session: null,
      orchestration: null
    };
  }
  const cleaned = cleanForeignBlockers(
    workspace_key,
    beadBlockedByFor(workspace_key, queue)
  );
  const bead_blocked_by = cleaned.bead_blocked_by;
  const bead_scope = beadScopeFor(workspace_key, queue);
  return {
    ...queue,
    // The manual-continuation capability (UI-58w8 §8): a read-only projection
    // of the queue schema's own constant, independent of the `auto_merge`
    // boolean the queue itself carries — the snapshot never authors a second
    // meaning for either.
    manual_merge_continuation: MANUAL_MERGE_CONTINUATION,
    runner_catalog,
    execution_defaults,
    // The workspace's declared base (UI-j6wa §3), non-persisted like every
    // other decoration here. Display only — nothing dispatches on it.
    declared_base,
    // Attempts carry the LIVE usage tally while they run (UI-raqh §1); the
    // persisted `Attempt.usage` stands on its own once they end.
    attempts: attemptsWithUsage(queue, workspace_key),
    // `repo_ops` is the pinned declaration consumed by verify and deploy, plus
    // the canonical `repo_id` the attachment resolves it against.
    workspace_info: {
      slots,
      repo_ops: { ...repo_ops, repo_id }
    },
    // Observed PR state + merge-gate verdict per `pr_wait` bead. Non-persisted
    // (worker-phase2 §4) — it exists only on the wire and in server memory.
    // The SERVER-side consumer of the terminal attempts' `receipt_check`, which
    // UI-qbbg §4.3 strips from the wire: it reads the untrimmed attempts so the
    // PR-wait row keeps the receipt warning the client reads from HERE.
    pr_observations: prObservationsFor(
      workspace_key,
      { ...queue, attempts: overlaid.attempts },
      verify_policy
    ),
    // What is RUNNING against each `pr_wait` bead right now (UI-raqh §3/§4) —
    // observation/verification activity and merge progress. Also non-persisted.
    pr_activity: prActivityFor(workspace_key, queue),
    // Titles for the queue/pr_wait/done beads (UI-12k6) — non-persisted and
    // partial (cache hits only); the client falls back to the id without it.
    bead_titles: beadTitlesFor(workspace_key, queue),
    // 생성·수정 시각 for the same beads (UI-d7pw §4.3), from the same cache and
    // the same `bd show`. Kept as its own key rather than folded into
    // `bead_titles` so the existing title contract is untouched.
    bead_times: beadTimesFor(workspace_key, queue),
    // Normalized labels for the same queue/pr_wait/done ids. Partial cache
    // hits only: a missing key is intentionally unknown to the Phase 3 view.
    bead_labels: beadLabelsFor(workspace_key, queue),
    // 실패·파킹 타일이 읽는 최근 이력 5줄 + 로그 경로
    // (record-timeline-retention §9). Non-persisted like the decorations
    // above, and present only for the beads whose card actually shows a
    // failure or a park.
    bead_timelines: beadTimelinesFor(workspace_key, queue),
    // Stepper projections for the LANE members (UI-eey2 §9.2) — `queue` ∪ the
    // serial lanes ∪ running attempts ∪ `pr_wait` ∪ `done`. Same
    // partial-cache contract as the three decorations above. `done` rides here
    // only so the 완료 행 can draw its PR link; the renderer keeps drawing no
    // stepper for it.
    bead_workflow: beadWorkflowFor(workspace_key, queue),
    // Declared scope of the WAITING, RUNNING, PR 대기, 후보 and SESSION beads
    // (UI-qm12 §4.3, target set widened by UI-anna §3.1), from which the client
    // derives the pairwise overlap chips. Same partial, fail-quiet,
    // non-persisted contract as the decorations above.
    bead_scope,
    // Direct blocks blocker ids for the same beads (UI-04vo §3) — the
    // wait-reason chip and lane topological corrections read from this, and
    // CLOSED cross-rig blockers are already gone from it (UI-u6zf §3.2).
    bead_blocked_by,
    // Owning workspace of each SURVIVING cross-rig blocker (UI-u6zf §4), so a
    // blocked chip can open the blocker in the rig that holds it. Its own key
    // rather than a widened `bead_blocked_by`, on the same partiality contract
    // as `bead_titles`/`bead_times`: a missing key is 모름, not "same repo".
    ...(cleaned.blocker_workspaces
      ? { blocker_workspaces: cleaned.blocker_workspaces }
      : {}),
    // Per-serial-lane occupancy + topological correction, derived fresh from
    // this snapshot (UI-04vo §5). Never persisted.
    lane_states: laneStatesFor(overlaid, bead_blocked_by),
    // 세션이 `in_progress`로 잡은 이슈 (UI-yrzu §3 → UI-0a2m): 모니터가 얹던
    // 버킷을 워커 채널 스냅샷도 싣는다 — 워커 탭 실행중 그리드가 같은 세션
    // 타일을 그린다. 제외 집합은 이 스냅샷의 레인·attempt에서 그 자리에서
    // 계산하므로 캐시가 낡아도 한 bead가 두 레인에 그려지지 않는다.
    session_active: withSessionScope(
      sessionActiveRows(workspace_key, queue),
      bead_scope
    ),
    // Which waiting beads are parked awaiting a REVISE disposition (UI-hs11
    // §3.1). Non-persisted, partial and advisory — see the projection.
    revise_parked: reviseParkedFor(workspace_key, queue),
    // The merge driver's live view (UI-5v7d §3): which queued item it is on and
    // why each skipped one failed. The ORDER and membership travel in the
    // durable `merge_queue` spread above; only this half is non-persisted, so a
    // restart shows the resumed queue with no stale failure text.
    merge_queue_state: workerMergeQueueState(workspace_key) || {
      active: null,
      failures: {},
      waiting: null
    }
  };
}

/**
 * Observers notified whenever a workspace's snapshot is re-pushed. The monitor
 * aggregation (UI-nprg) rides this instead of `onQueueChanged` alone: the
 * asynchronous title / REVISE-parking fills re-push through {@link fanout}
 * WITHOUT emitting a queue-change event, so a monitor-only viewer would
 * otherwise stay on bare bead ids until something mutated a queue.
 *
 * @type {Set<(workspace_key: string) => void>}
 */
const SNAPSHOT_REFRESH_LISTENERS = new Set();

/**
 * Register a snapshot-refresh observer.
 *
 * @param {(workspace_key: string) => void} listener
 * @returns {() => void} Unregister.
 */
export function onWorkerSnapshotRefresh(listener) {
  SNAPSHOT_REFRESH_LISTENERS.add(listener);
  return () => SNAPSHOT_REFRESH_LISTENERS.delete(listener);
}

/**
 * Push the current queue snapshot to every subscriber of a workspace.
 *
 * Exported since UI-04vo: the analysis submit path converges through the same
 * queue CAS and must publish the result on the SAME channel, rather than
 * growing a second push with its own decoration.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 */
export function fanout(workspace_key, queue) {
  const body_json = JSON.stringify({
    root_dir: workspace_key,
    queue: decorateQueue(workspace_key, queue)
  });
  for (const sub of subscribersFor(workspace_key)) {
    pushSnapshotIfChanged(sub, 'worker-queue-snapshot', body_json);
  }
  for (const listener of SNAPSHOT_REFRESH_LISTENERS) {
    try {
      listener(workspace_key);
    } catch (err) {
      log('snapshot refresh listener failed for %s: %o', workspace_key, err);
    }
  }
}

// Autonomous scheduler transitions (dispatch, admission refusal, done/fail)
// emit queue-events; fan the fresh snapshot out so clients see them without
// waiting for their next own mutation (worker-autorun-policy §6).
onQueueChanged((workspace) => {
  try {
    fanout(workspace, queueStore().snapshot(workspace));
  } catch (err) {
    log('queue-changed fanout failed for %s: %o', workspace, err);
  }
});

/**
 * Detach a connection from the worker-queue subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachWorkerQueue(ws) {
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws) {
        set.delete(sub);
      }
    }
  }
  detachSessionLog(ws);
}

/**
 * Live session-log (transcript) subscriptions (spec §5.6). Each entry pushes
 * snapshot-then-appends for one attempt to one client id. `off` unsubscribes
 * the per-entry runtime session-log listener.
 *
 * @type {Set<{ ws: WebSocket, client_id: string, attempt_id: string, launch_id?: string, off: () => void }>}
 */
const SESSION_LOG_SUBS = new Set();

/**
 * Remove and unsubscribe every session-log subscription for a connection.
 *
 * @param {WebSocket} ws
 */
export function detachSessionLog(ws) {
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
    }
  }
}

/**
 * One bead's metadata bag, read through the projected bd JSON owner.
 *
 * Every failure — an unusable workspace, a missing bead, a shape refusal — is
 * the SAME answer here (`null`), because the only consumer draws nothing in all
 * of them (UI-4xzk §4.2).
 *
 * @param {WebSocket} ws
 * @param {string} key - Target workspace root; empty means the connection's.
 * @param {string} bead_id
 * @returns {Promise<Record<string, unknown>|null>}
 */
async function beadMetadataOf(ws, key, bead_id) {
  /** @type {any} */
  let shown;
  try {
    shown = await runBdJsonProjectedInWorkspace(
      ws,
      'show',
      ['show', bead_id, '--json'],
      { ...(key ? { cwd: key } : {}), expected_id: bead_id }
    );
  } catch (err) {
    log('session_ref read threw for %s: %o', bead_id, err);
    return null;
  }
  if (shown.ok !== true) {
    log('session_ref read failed for %s: %s', bead_id, shown.error?.code);
    return null;
  }
  const metadata = shown.data && shown.data.metadata;
  return metadata && typeof metadata === 'object' && !Array.isArray(metadata)
    ? /** @type {Record<string, unknown>} */ (metadata)
    : null;
}

/**
 * Validate the `session_ref` variant of a `subscribe-session-log` payload.
 *
 * `attempt_id` is not a free label here: it is the client store's key for the
 * drawer, so it must be exactly `session:<provider>:<session_id>` — the same
 * convention the parallel analyzer follows when it puts a `job_id` in that slot.
 *
 * @param {unknown} raw
 * @param {string} attempt_id
 * @param {boolean} has_launch_id
 * @returns {{ bead_id: string, provider: 'claude'|'codex', session_id: string }|null}
 */
function normalizeSessionRefRequest(raw, attempt_id, has_launch_id) {
  if (has_launch_id || !raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }
  const value = /** @type {Record<string, unknown>} */ (raw);
  const bead_id = typeof value.bead_id === 'string' ? value.bead_id : '';
  const provider = value.provider;
  const session_id =
    typeof value.session_id === 'string' ? value.session_id : '';
  if (
    bead_id.length === 0 ||
    (provider !== 'claude' && provider !== 'codex') ||
    !isSafeSessionId(session_id)
  ) {
    return null;
  }
  if (attempt_id !== `session:${provider}:${session_id}`) {
    return null;
  }
  return { bead_id, provider, session_id };
}

/**
 * Open one `session_ref` session's transcript: authorize, snapshot, follow.
 *
 * The server opens NO file whose `(provider, session_id)` the bead's own
 * `session_ref` does not name (§4.3). An unnamed pair is answered with the same
 * empty snapshot an unauthorized delegation gets — fail-quiet, and no
 * filesystem access at all, so the reply cannot report a file's existence.
 *
 * @param {WebSocket} ws
 * @param {{ key: string, client_id: string, attempt_id: string, session_ref: { bead_id: string, provider: 'claude'|'codex', session_id: string } }} input
 */
async function followSessionRefLog(ws, input) {
  const { attempt_id, client_id, key, session_ref } = input;
  // Unlike every other branch of this handler, authorization here needs a `bd`
  // process, so the subscription only becomes real after an await. Unsubscribe,
  // connection close and same-client re-subscribe all cancel by walking the
  // REGISTERED entries, so a placeholder goes in first: without it those three
  // find nothing, and the reader created afterwards would never be stopped —
  // one leaked tail reader per cancelled open, and duplicate appends when the
  // same client reopens during the window.
  let cancelled = false;
  /** @type {{ ws: WebSocket, client_id: string, attempt_id: string, off: () => void }} */
  const sub = {
    ws,
    client_id,
    attempt_id,
    off: () => {
      cancelled = true;
    }
  };
  SESSION_LOG_SUBS.add(sub);
  const metadata = await beadMetadataOf(ws, key, session_ref.bead_id);
  if (cancelled || !SESSION_LOG_SUBS.has(sub)) {
    return;
  }
  /**
   * Every fail-quiet exit registers nothing, so the placeholder goes with it —
   * a leftover entry would answer a later `unsubscribe-session-log` with
   * `unsubscribed: true` for a subscription that never existed.
   */
  const giveUp = () => {
    SESSION_LOG_SUBS.delete(sub);
    emitSessionLogSnapshot(ws, client_id, attempt_id, [], null);
  };
  const entry = parseSessionRef(metadata?.session_ref).find(
    (item) =>
      item.provider === session_ref.provider &&
      item.session_id === session_ref.session_id
  );
  if (entry === undefined) {
    giveUp();
    return;
  }
  const located = resolveSessionFile(entry);
  if (located.locality !== 'local' || located.file === null) {
    giveUp();
    return;
  }
  const snapshot = readSessionSnapshot(located.file);
  if (snapshot === null) {
    giveUp();
    return;
  }
  // ONE adapter for the whole subscription: a codex tool call below the
  // snapshot boundary is the only thing that can name the command of an output
  // that arrives as a live append.
  const adapter = createSessionRefTranscript(entry.provider);
  /** @type {unknown[]} */
  const lines = [];
  for (const line of snapshot.text.split('\n')) {
    lines.push(...adapter.project(line));
  }
  emitSessionLogSnapshot(
    ws,
    client_id,
    attempt_id,
    lines,
    located.last_event_at
  );
  const reader = createTailReader({
    file: located.file,
    start_offset: snapshot.boundary,
    onLine: (line) => {
      for (const event of adapter.project(line)) {
        emitSessionLogAppend(ws, client_id, attempt_id, event);
      }
    }
  });
  sub.off = reader.stop;
  reader.start();
  log(
    'subscribe-session-log %s attempt=%s mode=session_ref',
    client_id,
    attempt_id
  );
}

/**
 * Handle `get-session-refs`. Payload: `{ bead_id, root_dir? }`.
 *
 * Answers the issue detail panel's 세션 이력 rows. Bead `status` is deliberately
 * NOT carried: the panel already holds it, and two sources of the same fact can
 * disagree (UI-4xzk §4.2).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGetSessionRefs(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bead_id = typeof p.bead_id === 'string' ? p.bead_id : '';
  if (bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  const metadata = await beadMetadataOf(ws, key, bead_id);
  /** @type {unknown[]} */
  let sessions = [];
  try {
    sessions = sessionRefViews(metadata);
  } catch (err) {
    log('session_ref projection failed for %s: %o', bead_id, err);
    sessions = [];
  }
  ws.send(JSON.stringify(makeOk(req, { bead_id, sessions })));
}

/**
 * One attempt record for the session-log viewer, wherever it now lives
 * (record-timeline-retention §7).
 *
 * The LIVE queue answers first and answers for everything in flight. A
 * PROCESSED-terminal attempt has left `queue.json` for
 * `beads/<bead>/attempts/<attempt>.json`, and the client sends only an attempt
 * id — which does not carry its bead — so the bead is recovered from the record
 * tree before `readAttempt` is asked for the record.
 *
 * Fail-quiet at every step: an unreadable store or an unknown attempt is null,
 * and the caller then resolves the log through the legacy candidates alone.
 *
 * @param {any} runtime
 * @param {string} key - Resolved workspace key.
 * @param {string} attempt_id
 * @returns {any}
 */
function attemptRecordFor(runtime, key, attempt_id) {
  try {
    const live = runtime.queueStore.snapshot(key).attempts?.[attempt_id];
    if (live) {
      return live;
    }
  } catch {
    return null;
  }
  if (typeof runtime.queueStore.readAttempt !== 'function') {
    return null;
  }
  const bead_id = beadOfTransferredAttempt(key, attempt_id);
  if (bead_id === null) {
    return null;
  }
  try {
    return runtime.queueStore.readAttempt(key, bead_id, attempt_id);
  } catch {
    return null;
  }
}

/**
 * Handle `subscribe-session-log`. Payload:
 * `{ id: client_id, attempt_id, launch_id?, session_ref?, root_dir? }`.
 *
 * Emits a SNAPSHOT of the persisted raw stream, then registers a live-append
 * listener on the shared runtime session-log. A Done/Failed attempt simply
 * never fires an append (the session is over), so the same path yields
 * snapshot-only for historical logs and live-follow for a running attempt.
 *
 * `root_dir` generalizes the authorization rule from "this connection's exact
 * attempt" to "the TARGET workspace's exact attempt" (UI-eey2 §9.5): the
 * monitor's one drawer opens sessions in every visible repo, not only the
 * connected one. An unregistered directory is `bad_request`, exactly like every
 * other targeted op; absence keeps the connection workspace. The subscription
 * registry is keyed by client id, so no key collides.
 *
 * `session_ref` (UI-4xzk §4.3) opens an INTERACTIVE session's own transcript
 * instead of an attempt's: there is no attempt, no runtime broker and no
 * `last_activity` overlay, so it reads the file directly and follows it with a
 * tail reader. It is mutually exclusive with `launch_id`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSubscribeSessionLog(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const client_id = typeof p.id === 'string' ? p.id : '';
  const attempt_id = typeof p.attempt_id === 'string' ? p.attempt_id : '';
  const has_launch_id = p.launch_id !== undefined;
  const launch_id =
    has_launch_id && typeof p.launch_id === 'string' ? p.launch_id : '';
  const has_session_ref = p.session_ref !== undefined;
  if (
    client_id.length === 0 ||
    attempt_id.length === 0 ||
    (has_launch_id && launch_id.length === 0)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          has_launch_id
            ? 'payload requires { id: string, attempt_id: string, launch_id?: non-empty string }'
            : 'payload requires { id: string, attempt_id: string }'
        )
      )
    );
    return;
  }
  const session_ref = has_session_ref
    ? normalizeSessionRefRequest(p.session_ref, attempt_id, has_launch_id)
    : null;
  if (has_session_ref && session_ref === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.session_ref requires { bead_id, provider: claude|codex, session_id } with attempt_id "session:<provider>:<session_id>" and no launch_id'
        )
      )
    );
    return;
  }
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }

  // Drop any prior subscription for the same (ws, client_id) so re-open is idempotent.
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
    }
  }

  ws.send(
    JSON.stringify(
      makeOk(req, {
        id: client_id,
        attempt_id,
        ...(has_launch_id ? { launch_id } : {})
      })
    )
  );

  if (session_ref !== null) {
    await followSessionRefLog(ws, {
      key,
      client_id,
      attempt_id,
      session_ref
    });
    return;
  }

  const runtime = getWorkerRuntime();
  // ONE record lookup for both branches (record-timeline-retention §7): the
  // attempt may have been transferred out of `queue.json`, and its stored
  // `log_path` — the first candidate of the §4 read order — lives only on that
  // record.
  const attempt = attemptRecordFor(runtime, key, attempt_id);
  /** @type {import('../worker/session-log.js').SessionLogReadOptions} */
  const read_options = {
    bead_id: typeof attempt?.bead_id === 'string' ? attempt.bead_id : null,
    log_path: typeof attempt?.log_path === 'string' ? attempt.log_path : null
  };

  if (has_launch_id) {
    const authorized =
      delegationSessionsForAttempt(key, attempt).find(
        (session) => session.launch_id === launch_id
      ) || null;
    if (!authorized) {
      emitSessionLogSnapshot(ws, client_id, attempt_id, [], null, launch_id);
      return;
    }
    // The identity that passed authorization is handed to the reader, not just
    // the launch id: a stream whose on-disk identity disagrees with it is
    // rejected there, so a file swapped under an authorized id yields an empty
    // snapshot instead of another session's transcript.
    /** @type {{ lines: unknown[], last_event_at: number|null, offset: number }} */
    let snapshot = { lines: [], last_event_at: null, offset: 0 };
    try {
      snapshot = runtime.sessionLog.readDelegation(
        key,
        attempt_id,
        launch_id,
        authorized,
        read_options
      );
    } catch {
      snapshot = { lines: [], last_event_at: null, offset: 0 };
    }
    emitSessionLogSnapshot(
      ws,
      client_id,
      attempt_id,
      snapshot.lines,
      snapshot.last_event_at,
      launch_id
    );
    const snapshot_offset =
      typeof snapshot.offset === 'number' && Number.isFinite(snapshot.offset)
        ? snapshot.offset
        : 0;
    const off = runtime.sessionLog.subscribe((append) => {
      if (
        append.workspace === key &&
        append.attempt_id === attempt_id &&
        append.launch_id === launch_id &&
        // The snapshot already carried every line below its boundary. Byte
        // offset is the only exact key here: `recorded_at` collides at
        // millisecond resolution, so a timestamp filter would drop a line.
        (typeof append.offset !== 'number' || append.offset >= snapshot_offset)
      ) {
        emitSessionLogAppend(
          ws,
          client_id,
          attempt_id,
          append.event,
          launch_id
        );
      }
    }, launch_id);
    SESSION_LOG_SUBS.add({ ws, client_id, attempt_id, launch_id, off });
    log(
      'subscribe-session-log %s attempt=%s mode=delegation',
      client_id,
      attempt_id
    );
    return;
  }

  const located =
    typeof runtime.sessionLog.resolveLog === 'function'
      ? runtime.sessionLog.resolveLog(key, attempt_id, read_options)
      : null;
  // A RUNNING attempt whose file has not appeared yet is a one-poll race, not a
  // deletion, so only a settled attempt may be reported expired. The live
  // subscription is registered either way: a transcript that shows up after the
  // snapshot still streams.
  const expired =
    located !== null &&
    located.status === 'expired' &&
    attempt?.status !== 'running';
  const lines = runtime.sessionLog.read(key, attempt_id, read_options);
  emitSessionLogSnapshot(
    ws,
    client_id,
    attempt_id,
    lines,
    runtime.sessionLog.lastEventAtOf(key, attempt_id, read_options),
    undefined,
    expired ? { expired: true } : {}
  );

  const off = runtime.sessionLog.subscribe((a) => {
    if (
      a.workspace === key &&
      a.attempt_id === attempt_id &&
      typeof a.launch_id !== 'string'
    ) {
      emitSessionLogAppend(ws, client_id, attempt_id, a.event);
    }
  });
  SESSION_LOG_SUBS.add({ ws, client_id, attempt_id, off });
  log('subscribe-session-log %s attempt=%s mode=main', client_id, attempt_id);
}

/**
 * Handle `unsubscribe-session-log`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeSessionLog(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  let removed = false;
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * The base placeholder the system-prompt preview is assembled with. The preview
 * is workspace-independent on purpose — it shows the CONTRACT, and pinning a
 * real branch name into it would make the same text read differently per
 * workspace for no gain.
 *
 * @type {string}
 */
const PREVIEW_TARGET_BASE = '<target_base>';

/**
 * One attempt's recorded send, or the missing shape. A record written before
 * UI-rxp3 carries neither field, which is a fact about the record rather than
 * an error — the reader shows "기록 없음" (fail-quiet contract consumption).
 *
 * @param {any} attempt
 * @returns {{ attempt_id: string, system_prompt: string|null, task_prompt: string|null, recorded_at: number|null }|{ missing: true }}
 */
function promptRecordOf(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return { missing: true };
  }
  const system_prompt =
    typeof attempt.system_prompt === 'string' ? attempt.system_prompt : null;
  const task_prompt =
    typeof attempt.task_prompt === 'string' ? attempt.task_prompt : null;
  if (system_prompt === null && task_prompt === null) {
    return { missing: true };
  }
  return {
    attempt_id: String(attempt.attempt_id || ''),
    system_prompt,
    task_prompt,
    recorded_at:
      typeof attempt.started_at === 'number' ? attempt.started_at : null
  };
}

/**
 * Handle `get-attempt-prompt`. Payload: `{ attempt_id }`.
 *
 * Workspace scope follows `subscribe-session-log`: the connection's own
 * verified workspace, and nothing else. An attempt of another workspace is
 * simply not found here — the reader switches workspace to see it, exactly as
 * for its transcript.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetAttemptPrompt(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const attempt_id = typeof p.attempt_id === 'string' ? p.attempt_id : '';
  if (attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  // Same optional `root_dir` as `subscribe-session-log` (UI-eey2 §9.5), and for
  // the same reason: the drawer's prompt toggle must read the prompt of the
  // attempt it is actually showing, not answer 기록 없음 because the attempt
  // lives in another repo.
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  const attempt = queueStore().snapshot(key).attempts[attempt_id];
  ws.send(JSON.stringify(makeOk(req, promptRecordOf(attempt))));
}

/**
 * Handle `get-bead-prompt`. Payload: `{ bead_id }`.
 *
 * Keyed by BEAD rather than attempt (UI-rxp3 §5): the issue detail panel knows
 * which bead it is showing and nothing about attempts, so resolving the newest
 * recorded attempt is the server's job. A bead with no recorded attempt gets
 * the missing shape plus the default task prompt the next dispatch WOULD send,
 * so the panel can preview it without holding a copy of the text.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetBeadPrompt(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bead_id = typeof p.bead_id === 'string' ? p.bead_id : '';
  if (bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const attempts = Object.values(queueStore().snapshot(key).attempts).filter(
    // The panel asks what the bead's own dispatch was told to do; a review
    // session's prompt is a different question the same bead id would answer
    // (UI-hk74 §7).
    (/** @type {any} */ a) =>
      a && a.bead_id === bead_id && isImplementationAttempt(a)
  );
  // Newest first by start time; an attempt that never started (a refusal
  // recorded before the spawn) sorts last and carries no prompt anyway.
  attempts.sort(
    (/** @type {any} */ a, /** @type {any} */ b) =>
      (typeof b.started_at === 'number' ? b.started_at : 0) -
      (typeof a.started_at === 'number' ? a.started_at : 0)
  );
  for (const attempt of attempts) {
    const record = promptRecordOf(attempt);
    if (!(/** @type {any} */ (record).missing)) {
      ws.send(JSON.stringify(makeOk(req, record)));
      return;
    }
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        missing: true,
        default_task_prompt: defaultTaskPrompt(bead_id)
      })
    )
  );
}

/**
 * Handle `get-bead-timeline`. Payload: `{ bead_id, root_dir? }`.
 *
 * The issue detail page's Worker 이력 섹션 (record-timeline-retention §9). The
 * WHOLE timeline, newest first — the section's question is "이 bead에 무슨 일이
 *있었나", which the 5 lines the failure tile carries cannot answer, and the
 * events are short enough that paging them server-side would only add a cursor
 * nobody needs. The section reveals them progressively on its own.
 *
 * An unknown bead, a workspace with no attachment, and a bead that has simply
 * never been dispatched all reply `{ bead_id, events: [] }` rather than an
 * error: the section draws nothing on an empty list, and three different
 * silences would be three ways of saying the same "이력 없음".
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetBeadTimeline(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bead_id = typeof p.bead_id === 'string' ? p.bead_id : '';
  if (bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  // Same optional `root_dir` contract as `get-session-refs`: absent keeps the
  // connection's workspace, an unregistered path is refused rather than read.
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  // `readTimeline` returns oldest first; the section reads newest first, and
  // reversing HERE keeps the one ordering decision on the wire instead of in
  // every consumer.
  const events = readBeadTimeline(key, bead_id).slice().reverse();
  ws.send(JSON.stringify(makeOk(req, { bead_id, events })));
}

/**
 * Handle `get-worker-system-prompt`. Payload: `{}`.
 *
 * Assembles the contract through `preamble.js` — the single owner of the text —
 * rather than shipping a client-side copy that would drift the first time the
 * contract changes. The default variant is the one the scheduler actually
 * dispatches with (`fast_track: true`, PR-submitting), because that is what
 * every queued bead gets; the conditional variants ride along with the
 * condition that selects them.
 *
 * The reply is a constant of the contract, not of the request: there is no
 * payload field to read, so there is none to validate either.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetWorkerSystemPrompt(ws, req) {
  const dispatch = applyPreamble('', {
    fast_track: true,
    target_base: PREVIEW_TARGET_BASE
  });
  const disposition = applyPreamble('', {
    fast_track: true,
    pr_submit: false,
    disposition: true
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        target_base_placeholder: PREVIEW_TARGET_BASE,
        system_prompt: dispatch.system_prompt,
        variants: [
          {
            key: 'dispatch',
            label: '워커 디스패치 (기본)',
            condition:
              'fast_track · PR 제출 · target_base 해석됨 — 큐 디스패치·재개·충돌 해결',
            system_prompt: dispatch.system_prompt
          },
          {
            key: 'disposition',
            label: 'REVISE 처분 세션',
            condition:
              'disposition — PR 미제출, base push·hook 판정 면제 (가드 계약 처분 변형)',
            system_prompt: disposition.system_prompt
          }
        ]
      })
    )
  );
}

/**
 * Test-only: clear subscribers and the queue store's in-memory cache.
 */
export function __resetWorkerQueueForTest() {
  SUBSCRIBERS.clear();
  for (const sub of SESSION_LOG_SUBS) {
    try {
      sub.off();
    } catch {
      /* ignore */
    }
  }
  SESSION_LOG_SUBS.clear();
  queueStore().__clearCacheForTest();
  // The PR observation cache is server memory too — a leftover observation
  // would decorate the next test's snapshot (worker-phase2 §4).
  getWorkerRuntime().prObservations.clear();
  // Same for cached bead titles (UI-12k6).
  getWorkerRuntime().titleCache.clear();
  // ...and for cached REVISE-parking observations (UI-hs11).
  getWorkerRuntime().reviseParked.clear();
}

/**
 * Handle `subscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeWorkerQueue(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  if (typeof client_id !== 'string' || client_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.id must be a non-empty string')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const sub = { ws, client_id };
  subscribersFor(key).add(sub);
  log('subscribe-worker-queue %s ws=%s', client_id, key);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  pushSnapshotIfChanged(
    sub,
    'worker-queue-snapshot',
    JSON.stringify({
      root_dir: key,
      queue: decorateQueue(key, queueStore().snapshot(key))
    })
  );
  // 세션 레인의 "on subscribe" 스캔 (UI-0a2m): 스냅샷의 `session_active`는
  // fill 없는 peek이므로, 콜드 캐시를 채우는 트리거는 구독이 소유한다. 완료는
  // 모니터 모듈이 배선한 `setOnFilled`가 이 워크스페이스의 스냅샷 재전송으로
  // 전달한다. Fail-quiet: 스캔이 못 떠도 구독은 성립한다.
  try {
    getWorkerRuntime().runnableCache.refresh(key);
  } catch (err) {
    log('runnable refresh on subscribe failed for %s: %o', key, err);
  }
  // The snapshot above is sent SYNCHRONOUSLY with whatever the registry already
  // holds; the scan is the "on subscribe" refresh trigger (UI-7agi §1) and its
  // result reaches the client through the ordinary fanout. Deliberately not
  // awaited — a slow `bd list` must not delay the first paint.
  void refreshWorkerExternalPrs(key)
    .then((scanned) => {
      if (scanned) {
        fanout(key, queueStore().snapshot(key));
      }
    })
    .catch((err) => {
      log('external PR refresh failed for %s: %o', key, err);
    });
}

/**
 * Handle `unsubscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * Sweeps the WHOLE registry the way {@link detachWorkerQueue} does, not just the
 * connection's current workspace bucket: the client unsubscribes AFTER
 * `set-workspace` has already repointed the connection, so the entry to remove
 * lives under the PREVIOUS workspace key.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeWorkerQueue(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  let removed = false;
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws && sub.client_id === client_id) {
        set.delete(sub);
        removed = true;
      }
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Reply with the mutation result and fan out a fresh snapshot on success.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} workspace_key
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 */
function replyMutation(ws, req, workspace_key, result) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict,
        queue: decorateQueue(workspace_key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (result.ok) {
    fanout(workspace_key, /** @type {any} */ (result.queue));
  }
}

/**
 * @param {any} payload
 * @returns {number}
 */
function revisionOf(payload) {
  const rev = payload?.expected_revision;
  return typeof rev === 'number' && Number.isFinite(rev) ? rev : -1;
}

/**
 * Handle `worker-queue-place`. Payload:
 * `{ bead_id, lane?: 'parallel'|'s1'..'s5', index?, expected_revision }`
 * (UI-04vo §5). New entry and cross-lane move share this op — the store
 * removes the bead from its origin lane before inserting. An absent lane (or
 * a legacy value like `'serial'`) lands in the parallel lane; an out-of-range
 * serial slot is rejected by the store CAS layer.
 *
 * Queue entry is admission-gated (worker-autorun-policy §1): a live attachment
 * applies the full validator, while an inactive workspace still performs an
 * authoritative worker-ineligible label read. A refusal replies
 * `{ applied:false, admission_reason }` without mutating the queue.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerQueuePlace(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {import('../worker/admission.js').AdmissionResult | null} */
  let admission = null;
  try {
    admission = await checkWorkerQueueAdmission(key, p.bead_id);
  } catch (err) {
    log('admission check failed for %s/%s: %o', key, p.bead_id, err);
    admission = { ok: false, reason: 'git_error' };
  }
  if (admission && !admission.ok) {
    const reason = admission.reason || 'git_error';
    // Persist the refusal so the candidate badge renders it for EVERY client
    // (the reply-only admission_reason was droppable — implementation review
    // 2026-07-22 finding 4).
    try {
      queueStore().recordAdmission(key, { bead_id: p.bead_id, reason });
    } catch (err) {
      log('admission record failed for %s/%s: %o', key, p.bead_id, err);
    }
    const snap = queueStore().snapshot(key);
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: false,
          admission_reason: reason,
          queue: decorateQueue(key, snap)
        })
      )
    );
    fanout(key, snap);
    return;
  }
  const place_lane =
    typeof p.lane === 'string' && /^s[1-5]$/.test(p.lane) ? p.lane : undefined;
  let result = queueStore().place(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    lane: place_lane,
    index: typeof p.index === 'number' ? p.index : undefined,
    blocks_edges: laneBlocksEdges(
      key,
      queueStore().snapshot(key),
      place_lane,
      p.bead_id
    )
  });
  if (result.ok) {
    // A successful (admission-passed) placement clears any prior refusal —
    // unless the pass itself observed a stale receipt (UI-dlim §3.2), in which
    // case the placement REPLACES the refusal with the non-blocking stale mark
    // so the queued row announces the in-session re-review from the moment it
    // enters the lane.
    const applied =
      admission && admission.stale
        ? queueStore().recordAdmission(key, {
            bead_id: p.bead_id,
            reason: 'spec_review_stale',
            stale: true
          })
        : queueStore().clearAdmission(key, p.bead_id);
    if (applied.ok) {
      result = { ...result, queue: applied.queue };
    }
  }
  replyMutation(ws, req, key, result);
  if (result.ok) {
    // A placement is the OTHER thing that can fill a free slot, and it is the
    // only dispatch path a discarded bead has (discard spec §1): without this
    // kick an auto_advance-ON queue would sit idle until the next attempt
    // finished. Same fire-and-forget pattern as the toggle-ON tick.
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after place failed for %s: %o', key, err);
    });
  }
}

/**
 * Handle `worker-queue-reorder`. Payload:
 * `{ bead_id, lane?: 'parallel'|'s1'..'s5', to_index, expected_revision }`
 * (UI-04vo §5). An absent lane keeps the legacy parallel-lane meaning.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueReorder(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || typeof p.to_index !== 'number') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id, to_index }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const reorder_lane =
    typeof p.lane === 'string' && /^s[1-5]$/.test(p.lane) ? p.lane : undefined;
  const result = queueStore().reorder(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    lane: reorder_lane,
    to_index: p.to_index,
    blocks_edges: laneBlocksEdges(
      key,
      queueStore().snapshot(key),
      reorder_lane,
      p.bead_id
    )
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-arm`. Payload:
 * `{ bead_ids: string[], lane_id, expected_revision }` (UI-jaua §5.3) — arms
 * this workspace's parallel rows for a Monitor cross lane, so they dispatch
 * while the repo's own `auto_advance` stays OFF.
 *
 * `lane_id` is NOT checked against the lane store: `cross-lanes.json` is
 * server-global and a workspace handler must not depend on it (§5.3). Bead ids
 * absent from this queue are fail-quiet, because one `▶ 진행` sends the whole
 * lane membership to every repo it spans.
 *
 * A successful arm kicks the live dispatch loop exactly as `worker-queue-place`
 * does — the arm is what makes a free slot fillable.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueArm(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    !Array.isArray(p.bead_ids) ||
    typeof p.lane_id !== 'string' ||
    p.lane_id.length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_ids: string[], lane_id: string }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().arm(key, {
    expected_revision: revisionOf(p),
    bead_ids: p.bead_ids,
    lane_id: p.lane_id
  });
  replyMutation(ws, req, key, result);
  if (result.ok) {
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after arm failed for %s: %o', key, err);
    });
  }
}

/**
 * Handle `worker-queue-disarm`. Payload:
 * `{ bead_ids?: string[], lane_id?, expected_revision }` (UI-jaua §5.3) —
 * `bead_ids` clears exactly those rows, `lane_id` alone clears every row this
 * workspace has armed to that lane. At least one of the two is required.
 *
 * No tick: disarming only REMOVES candidates, so the next ordinary pass is
 * soon enough.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueDisarm(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const has_ids = Array.isArray(p.bead_ids);
  const has_lane = typeof p.lane_id === 'string' && p.lane_id.length > 0;
  if (!has_ids && !has_lane) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_ids: string[] } or { lane_id: string }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().disarm(key, {
    expected_revision: revisionOf(p),
    bead_ids: has_ids ? p.bead_ids : undefined,
    lane_id: has_lane ? p.lane_id : undefined
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-toggle`. Payload: `{ on: boolean, expected_revision }`.
 * Persists the `auto_advance` flag (CAS) and, on a successful turn-ON, kicks the
 * live dispatch loop with a fire-and-forget `tick` (error-captured). The tick is
 * a no-op unless a worker attachment is registered for this workspace, so ws
 * tests without a live attachment stay hermetic (spec §5.1, F1).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().toggleAutoAdvance(key, {
    expected_revision: revisionOf(p),
    on: p.on
  });
  replyMutation(ws, req, key, result);
  if (result.ok && p.on === true) {
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after toggle failed for %s: %o', key, err);
    });
  }
}

/**
 * Observe the workspace once and enroll only while durable auto-merge remains
 * enabled after the asynchronous observation completes.
 *
 * @param {string} workspace_key
 */
function observeAndEnrollAutoMerge(workspace_key) {
  Promise.resolve(observeWorkerPrs(workspace_key))
    .catch((err) => {
      log('auto-merge observation failed for %s: %o', workspace_key, err);
    })
    .then(() => {
      if (queueStore().snapshot(workspace_key).auto_merge !== true) {
        return;
      }
      enrollWorkerMergeCandidates(workspace_key);
    })
    .catch((err) => {
      log('auto-merge enrolment failed for %s: %o', workspace_key, err);
    });
}

/**
 * Handle `worker-automation-toggle`.
 * Payload: `{ on: boolean, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerAutomationToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const state = p.on === false ? workerMergeQueueState(key) : null;
  const result = queueStore().toggleAutomation(key, {
    expected_revision: revisionOf(p),
    on: p.on,
    keep: state ? state.active : null
  });
  replyMutation(ws, req, key, result);
  if (result.ok && p.on === true) {
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after automation toggle failed for %s: %o', key, err);
    });
    observeAndEnrollAutoMerge(key);
  }
}

/**
 * Handle `worker-repo-ops-opt-out-toggle`. Payload:
 * `{ kind: 'verify'|'deploy', opted_out: boolean, expected_revision }`.
 *
 * The workspace's own decision to treat a DECLARED verify/deploy lane as
 * undeclared (UI-lsti §3). Deliberately not a config edit: the declaration
 * belongs to the repository and every other workspace keeps reading it, and
 * operations that already exist keep running — this only stops NEW ones from
 * being created here.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerRepoOpsOptOutToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    (p.kind !== 'verify' && p.kind !== 'deploy') ||
    typeof p.opted_out !== 'boolean'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          "payload requires { kind: 'verify'|'deploy', opted_out: boolean }"
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  replyMutation(
    ws,
    req,
    key,
    queueStore().setRepoOpsOptOut(key, {
      expected_revision: revisionOf(p),
      kind: p.kind,
      opted_out: p.opted_out
    })
  );
}

/**
 * Handle `worker-repo-operation-dismiss`. Payload: `{ operation_id: string }`.
 *
 * The 「기록 닫기」 click (UI-q0uy §4.6-2). It is NOT a state transition: the row
 * stays `failed` with its whole evidence trail, and only the 해결 필요 tally
 * stops counting it. A row that is queued or running is refused as an invalid
 * state.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerRepoOperationDismiss(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.operation_id !== 'string' || p.operation_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { operation_id }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, code?: string, operation_id?: string }} */
  let result;
  try {
    result = await dismissWorkerRepoOperation(key, {
      operation_id: p.operation_id
    });
  } catch (err) {
    log('repo-operation dismiss failed for %s: %o', key, err);
    result = { ok: false, code: 'repo_operation_dismiss_failed' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ok: result.ok === true,
        reason:
          result.ok === true ? undefined : result.code || 'dismiss_refused',
        queue: decorateQueue(key, queueStore().snapshot(key))
      })
    )
  );
  fanout(key, queueStore().snapshot(key));
}

/**
 * Handle `worker-queue-hold-resume`. Payload: `{ since: number }`.
 *
 * The `재개` click on a systemic queue stop (2026-08-28 worker-failure-tiers
 * spec §3.4). `since` is a CAS on the stop the button was drawn against: a
 * mismatch is a NO-OP reply, never a release, because clearing a stop the user
 * never saw is exactly what the confirmation is there to prevent. A duplicate
 * click is idempotent for the same reason — the second one no longer matches.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerQueueHoldResume(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.since !== 'number' || !Number.isFinite(p.since)) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { since }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, reason?: string }} */
  let result;
  try {
    result = await resumeWorkerQueueHold(key, { since: p.since });
  } catch (err) {
    log('queue hold resume failed for %s: %o', key, err);
    result = { ok: false, reason: 'queue_hold_resume_failed' };
  }
  replyQueueHold(ws, req, key, result);
}

/**
 * Handle `worker-queue-hold-retry-now`. Payload: `{ since: number }`.
 *
 * The `지금 재시도` click on an env hold (spec §4): every lineage's backoff
 * collapses to now. Same CAS, same idempotence.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerQueueHoldRetryNow(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.since !== 'number' || !Number.isFinite(p.since)) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { since }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, reason?: string }} */
  let result;
  try {
    result = await retryWorkerQueueHoldNow(key, { since: p.since });
  } catch (err) {
    log('queue hold retry-now failed for %s: %o', key, err);
    result = { ok: false, reason: 'queue_hold_retry_failed' };
  }
  replyQueueHold(ws, req, key, result);
}

/**
 * Handle `worker-parked-retry`. Payload: `{ bead_id, attempt_id }`.
 *
 * The `재시도` button on a `parked` tile (spec §3.1). Refused with `not_latest`
 * when the named attempt is no longer the bead's last implementation attempt:
 * the tile the user clicked has to still be the bead's current state.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerParkedRetry(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.bead_id !== 'string' ||
    p.bead_id.length === 0 ||
    typeof p.attempt_id !== 'string' ||
    p.attempt_id.length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id, attempt_id }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, reason?: string }} */
  let result;
  try {
    result = await retryWorkerParkedAttempt(key, {
      bead_id: p.bead_id,
      attempt_id: p.attempt_id
    });
  } catch (err) {
    log('parked retry failed for %s: %o', key, err);
    result = { ok: false, reason: 'parked_retry_failed' };
  }
  recordUserAction(key, p.bead_id, 'parked_retry', '[재시도] 클릭 · 파킹 해제');
  replyQueueHold(ws, req, key, result);
}

/**
 * The shared reply of the three queue-hold clicks: the decorated queue rides
 * the reply so the clicking client re-renders off a readback, and the fanout
 * gives every OTHER subscriber the same one.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} key
 * @param {{ ok: boolean, reason?: string }} result
 */
function replyQueueHold(ws, req, key, result) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ok: result.ok === true,
        reason: result.ok === true ? undefined : result.reason || 'refused',
        queue: decorateQueue(key, queueStore().snapshot(key))
      })
    )
  );
  fanout(key, queueStore().snapshot(key));
}

/**
 * Handle `worker-repo-operation-deploy-run`. Payload: `{ repo_id }`.
 *
 * The 배포 실행 click (UI-s582 §3). The target is NOT an input: the workspace's
 * base resolver pins remote, base and the fetched tip, and the declared script
 * is read from THAT tip. `repo_id` is REQUIRED and is the client naming the
 * repository it drew the button for — it rides the snapshot as
 * `workspace_info.repo_ops.repo_id`. The authority is the registered
 * attachment, so an absent, empty or non-matching value is refused rather than
 * redirected onto a repository the person was not looking at.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerRepoOperationDeployRun(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.repo_id !== 'string' || p.repo_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { repo_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, operation_id?: string, reason?: string }} */
  let result;
  try {
    result = await startWorkerRepoOperationDeployRun(key, {
      repo_id: p.repo_id
    });
  } catch (err) {
    log('repo-operation deploy run failed for %s: %o', key, err);
    result = { ok: false, reason: 'target_unresolved' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ok: result.ok === true,
        ...(result.ok === true
          ? { operation_id: result.operation_id || null }
          : { reason: result.reason || 'target_unresolved' }),
        queue: decorateQueue(key, queueStore().snapshot(key))
      })
    )
  );
  fanout(key, queueStore().snapshot(key));
}

/**
 * Handle `worker-queue-set-slots`. Payload: `{ slots: number, expected_revision }`.
 * Persists the workspace concurrency cap (CAS, worker-phase2 §3) — the value the
 * scheduler's single scan fills up to. Bound + integer validation lives in the
 * queue store's `setSlots`, which REJECTS an unusable value (`applied:false`)
 * rather than clamping it, so the stored cap is never silently rewritten.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetSlots(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.slots !== 'number') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { slots: number }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().setSlots(key, {
    expected_revision: revisionOf(p),
    slots: p.slots
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-set-serial-lane-count` (UI-04vo §5).
 * Payload: `{ count: number, expected_revision }`. The store returns truncated
 * lanes' waiting entries to the parallel tail; a value outside 1..5 is a
 * bad_request before any store call.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetSerialLaneCount(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.count !== 'number' ||
    !Number.isInteger(p.count) ||
    p.count < 1 ||
    p.count > 5
  ) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { count: 1..5 }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().setSerialLaneCount(key, {
    expected_revision: revisionOf(p),
    count: p.count
  });
  replyMutation(ws, req, key, result);
  if (result.ok) {
    // Entries returned to the parallel lane may be immediately dispatchable.
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after lane count change failed for %s: %o', key, err);
    });
  }
}

/**
 * Store the workspace's three orchestration defaults as values (spec §C.5).
 * There is no preset reference any more, so this is a plain CAS-guarded queue
 * mutation with the queue's own revision.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetOrchestrationDefaults(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (!p.values || typeof p.values !== 'object' || Array.isArray(p.values)) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { values: object }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().setOrchestrationDefaults(key, {
    expected_revision: revisionOf(p),
    values: p.values
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-attempt-pause`. Payload: `{ attempt_id: string }`. Pauses (⏸)
 * a running attempt: group-kill + attempt `paused` + workflow_mode/exec revert,
 * bead stays queued, and the freed slot advances the queue
 * (worker-phase1 §2.1). Refusals carry a `reason` (`not_running` /
 * `no_session_id` / `no_attachment`).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptPause(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, reason?: string }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await pauseWorkerAttempt(key, p.attempt_id);
  } catch (err) {
    log('worker-attempt-pause failed for %s/%s: %o', key, p.attempt_id, err);
    result = { ok: false, reason: 'error' };
  }
  const queue = /** @type {any} */ (queueStore().snapshot(key));
  const phase =
    queue.attempts?.[p.attempt_id]?.control?.phase ||
    (result.ok ? 'done' : null);
  ws.send(
    JSON.stringify(
      makeOk(req, {
        attempt_id: p.attempt_id,
        paused: !!result.ok,
        phase,
        reason: result.ok ? null : result.reason || null
      })
    )
  );
  if (result.ok) {
    fanout(key, queue);
  }
}

/**
 * Retired `worker-attempt-stop` endpoint. It remains routable so stale clients
 * get an explicit error, but it performs no workspace lookup or mutation.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptStop(ws, req) {
  ws.send(
    JSON.stringify(
      makeError(
        req,
        'action_retired',
        'worker-attempt-stop is retired; use worker-discard'
      )
    )
  );
}

/**
 * Handle `worker-attempt-resume`. Payload:
 * `{ attempt_id, expected_revision, continuation?, decision_token?, instructions? }`.
 * Manually resumes (↻ / paused tile ▶) a paused, failed, or orphaned attempt in
 * its existing worktree (spec §1) under the SAME CAS revision contract as the
 * queue mutations: a stale `expected_revision` replies `conflict:true` with the
 * authoritative queue and does NOT resume — the client retries once against the
 * fresh revision. On refusal the reply carries the admission-badge `reason` (one
 * of the five §1.2 causes) with `resumed:false`; on success it carries the new
 * attempt id and fans a fresh snapshot. Inert (`resumed:false`) when no live
 * attachment is registered.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptResume(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  if (
    p.continuation != null &&
    p.continuation !== 'auto' &&
    p.continuation !== 'prior_session' &&
    p.continuation !== 'fresh_current'
  ) {
    ws.send(
      JSON.stringify(makeError(req, 'bad_request', 'invalid continuation'))
    );
    return;
  }
  if (
    (p.continuation === 'prior_session' ||
      p.continuation === 'fresh_current') &&
    (!p.decision_token ||
      typeof p.decision_token !== 'object' ||
      Array.isArray(p.decision_token))
  ) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'decision_token is required')
      )
    );
    return;
  }
  if (
    p.decision_token !== undefined &&
    p.continuation !== 'prior_session' &&
    p.continuation !== 'fresh_current'
  ) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'decision_token requires continuation')
      )
    );
    return;
  }
  if (
    p.instructions !== undefined &&
    (typeof p.instructions !== 'string' || p.instructions.length > 4000)
  ) {
    ws.send(
      JSON.stringify(makeError(req, 'bad_request', 'invalid instructions'))
    );
    return;
  }
  const instructions =
    typeof p.instructions === 'string' && p.instructions.trim().length > 0
      ? p.instructions.trim()
      : undefined;
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          attempt_id: p.attempt_id,
          resumed: false,
          conflict: true,
          new_attempt_id: null,
          reason: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await resumeWorkerAttempt(key, p.attempt_id, {
      continuation: p.continuation,
      decision_token: p.decision_token,
      instructions
    });
  } catch (err) {
    log('worker-attempt-resume failed for %s/%s: %o', key, p.attempt_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        attempt_id: p.attempt_id,
        resumed: !!result.ok,
        conflict: false,
        new_attempt_id: result.attempt_id || null,
        reason: result.ok ? null : result.reason || null,
        continuation_mismatch: result.continuation_mismatch || null
      })
    )
  );
  if (result.ok) {
    // Push a fresh snapshot so the new running tile appears immediately.
    fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
  }
}

/**
 * Reply to a merge-queue mutation and, on success, start the driver.
 *
 * The kick is fire-and-forget and its promise settles only when the WHOLE queue
 * drains, so awaiting it here would hold the reply for every merge in line. The
 * driver fans its own progress out through queue-changed.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} workspace_key
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 * @param {Record<string, unknown>} [extra] - Extra reply fields (queued count).
 */
function replyMergeQueue(ws, req, workspace_key, result, extra = {}) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ...extra,
        applied: result.ok,
        conflict: result.conflict,
        queue: decorateQueue(workspace_key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (!result.ok) {
    return;
  }
  fanout(workspace_key, /** @type {any} */ (result.queue));
  Promise.resolve(kickWorkerMergeQueue(workspace_key)).catch((err) => {
    log('merge queue kick failed for %s: %o', workspace_key, err);
  });
}

/**
 * Handle `worker-merge-queue-add`. Payload:
 * `{ bead_id, expected_revision, continuation?, decision_token? }`.
 *
 * The [머지] click, which no longer merges (UI-5v7d §3): it puts the bead in the
 * sequential queue and the driver merges when its turn comes. Everything the old
 * direct click derived server-side — the re-gate, the BEHIND update, the DIRTY
 * arm — still happens, just inside the driver's `merge()` call, so the badges in
 * the clicked snapshot stay advisory exactly as before.
 *
 * Same CAS discipline as every other mutation: a stale revision replies
 * `conflict:true` without queuing, because that snapshot may predate the
 * transition that moved this very bead out of the lane.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerMergeQueueAdd(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const has_continuation = p.continuation !== undefined;
  if (
    (has_continuation &&
      p.continuation !== 'prior_session' &&
      p.continuation !== 'fresh_current') ||
    (has_continuation &&
      (!p.decision_token ||
        typeof p.decision_token !== 'object' ||
        Array.isArray(p.decision_token))) ||
    (!has_continuation && p.decision_token !== undefined)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'continuation requires prior_session|fresh_current and decision_token'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  if (has_continuation) {
    const decided = queueStore().decideMergeContinuation(key, {
      expected_revision: revisionOf(p),
      bead_id: p.bead_id,
      continuation: p.continuation,
      decision_token: p.decision_token
    });
    replyMergeQueue(ws, req, key, decided, {
      bead_id: p.bead_id,
      queued: 0,
      continuation_decided: decided.ok
    });
    return;
  }
  const before_queue = /** @type {any} */ (queueStore().snapshot(key))
    .merge_queue;
  const before = Array.isArray(before_queue) ? before_queue.length : 0;
  // The click IS the item's durable continuation authority (UI-58w8 §1), so
  // it binds the head/base one fresh authoritative probe returns; an
  // unreadable identity replies as a refusal with no queue effect. The
  // external-row vouching moved with it: the probe's own lane membership read
  // is the overlay-aware one.
  const result = await enqueueWorkerManualMerge(key, {
    bead_id: p.bead_id,
    expected_revision: revisionOf(p)
  });
  // The write also APPLIES when it only dropped an auto-merge exclusion for an
  // already-queued row (UI-yk55 §3.2), so the count comes from the queue itself
  // rather than from `ok` — a click that queued nothing must not report a place
  // in line it did not take.
  const after =
    result.ok && Array.isArray(result.queue.merge_queue)
      ? result.queue.merge_queue.length
      : before;
  recordUserAction(key, p.bead_id, 'merge_queue_add', '[머지] 클릭');
  replyMergeQueue(ws, req, key, result, {
    bead_id: p.bead_id,
    queued: Math.max(0, after - before),
    ...(typeof (/** @type {any} */ (result).reason) === 'string'
      ? { reason: /** @type {any} */ (result).reason }
      : {})
  });
}

/**
 * Handle `worker-merge-queue-add-all`. Payload: `{ expected_revision }`.
 *
 * Bulk enrolment (UI-5v7d §3, shared with the auto enroller by UI-yk55 §4.2):
 * queue every currently mergeable `pr_wait` row in lane order, in ONE write — a
 * write per row would make every row after the first fail its own revision
 * check.
 *
 * The eligibility judgment is the server's own, not a client-supplied list: a
 * list would let a stale tab queue rows whose gate has since closed, and the
 * queue's whole value is that its members are the ones worth merging right now.
 * It runs through the SAME shared step the automatic enroller uses, so the two
 * callers cannot drift into two different notions of "mergeable" — which
 * includes the auto-merge exclusion filter.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeQueueAddAll(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = enrollWorkerMergeCandidates(key, {
    expected_revision: revisionOf(p)
  });
  const queue = /** @type {any} */ (result.queue || queueStore().snapshot(key));
  if (!result.applied) {
    // Nothing enrolled: a stale revision (conflict), or no eligible row at all.
    // The enroller already fanned out and kicked when it DID apply, so only this
    // arm has to answer by itself.
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: result.conflict,
          queued: 0,
          queue: decorateQueue(key, queue)
        })
      )
    );
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        queued: result.queued,
        queue: decorateQueue(key, queue)
      })
    )
  );
}

/**
 * Handle `worker-merge-auto-toggle`. Payload: `{ on: boolean, expected_revision }`.
 *
 * The PR 대기 lane's durable independent auto-merge switch (UI-yk55 §5). The
 * workspace automation control may align both axes at click time, but this
 * message remains available afterwards so merge automation can be changed on
 * its own.
 *
 * Turning it ON does three things in order — persist, observe once, enroll once
 * — because the enrolment judges against the observation cache, and after a
 * restart (or on a workspace nobody has been watching) that cache is empty, so
 * enrolling first would find every candidate `unobserved` and queue nothing.
 *
 * Turning it OFF also empties the WAITING queue (§5.2): leaving the queue full
 * while the switch says off is not a stop, and the next observation would refill
 * it anyway. The item being merged runs to completion — it already reached
 * GitHub.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeAutoToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const state = p.on === false ? workerMergeQueueState(key) : null;
  const result = queueStore().toggleAutoMerge(key, {
    expected_revision: revisionOf(p),
    on: p.on,
    // OFF flips the flag and empties the waiting queue in ONE write: a restart
    // between two writes would leave "stopped" with a full queue for the
    // boot-resume driver to merge (§5.2).
    clear_waiting: p.on === false,
    keep: state ? state.active : null
  });
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: result.conflict,
          queued: 0,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    return;
  }
  if (p.on === false) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: true,
          conflict: false,
          queued: 0,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    fanout(key, /** @type {any} */ (result.queue));
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        queued: 0,
        queue: decorateQueue(key, /** @type {any} */ (result.queue))
      })
    )
  );
  fanout(key, /** @type {any} */ (result.queue));
  // Fire-and-forget: the observation is a `gh` round-trip per open PR, and the
  // reply above already carries the persisted flag.
  observeAndEnrollAutoMerge(key);
}

/**
 * Kill the processes of the review sessions ONE cancel just settled — the
 * single `[취소]` and the lane's bulk `[일괄 머지 중단]` alike (UI-d7fy §5.6).
 *
 * Best-effort, and deliberately AFTER the write: the CAS already terminalized
 * these attempts as `failed: cancelled` and reclaimed their authority, so a
 * session that outlives the stop finds its binding gone and writes nothing.
 *
 * PROCESS-ONLY on purpose. The generic attempt stop is the tile's ■ — it
 * records a `stopped` attempt with a null cause, reverts the session's metadata
 * stamps and reopens the bead's claim — and all three would corrupt this state:
 * the cancellation cause is the durable one, this session stamped nothing, and
 * the bead's claim belongs to a PR that is still open and still waiting.
 *
 * @param {string} key
 * @param {string[]|undefined} attempt_ids
 */
function stopCancelledReviewSessions(key, attempt_ids) {
  for (const attempt_id of attempt_ids || []) {
    try {
      void Promise.resolve(
        stopWorkerReviewSessionProcess(key, attempt_id)
      ).catch(() => {});
    } catch {
      // The reply and the durable write are already out; a stop that cannot
      // even be attempted must not take the handler down with it.
    }
  }
}

/**
 * Handle `worker-merge-queue-remove`. Payload:
 * `{ bead_id, expected_revision }`, or `{ all: true, expected_revision }`.
 *
 * [취소] on a WAITING item, and — with `all` — the lane header's
 * [일괄 머지 중단]. The bulk form is ONE server-side write on purpose: removing
 * item by item lets the active one finish between requests, which promotes the
 * next waiter to active and makes its own removal refuse, leaving an item
 * queued after a click that said "stop everything".
 *
 * The ACTIVE item is never removable: its merge is already running against
 * GitHub, and dropping the record would only hide it (UI-5v7d §3).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeQueueRemove(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bulk = p.all === true;
  if (!bulk && (typeof p.bead_id !== 'string' || p.bead_id.length === 0)) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id: string } or { all: true }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const state = workerMergeQueueState(key);
  if (bulk) {
    const result = queueStore().cancelMerge(key, {
      expected_revision: revisionOf(p),
      all: true,
      keep: state ? state.active : null
    });
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: null,
          applied: result.ok,
          conflict: result.conflict,
          reason: null,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    if (result.ok) {
      fanout(key, /** @type {any} */ (result.queue));
      stopCancelledReviewSessions(key, result.cancelled_attempt_ids);
    }
    return;
  }
  // Only an actual merge EFFECT in flight (the GitHub API window) locks the
  // item (UI-d7fy §5.6). A running review session does NOT — reviewing is not
  // merging, and the cancel is exactly what reclaims the authority that
  // session was dispatched under, so refusing it would leave the one lever
  // that stops it unusable.
  const review_session_running = Object.values(
    /** @type {any} */ (queueStore().snapshot(key)).attempts || {}
  ).some(
    (/** @type {any} */ a) =>
      a?.bead_id === p.bead_id &&
      a.kind === 'review_session' &&
      (a.status === 'running' || a.status === 'pending')
  );
  if (
    state &&
    state.active === p.bead_id &&
    (!review_session_running || workerMergeEffectInFlight(key, p.bead_id))
  ) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          applied: false,
          conflict: false,
          reason: 'merge_active',
          queue: decorateQueue(
            key,
            /** @type {any} */ (queueStore().snapshot(key))
          )
        })
      )
    );
    return;
  }
  const result = queueStore().cancelMerge(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        applied: result.ok,
        conflict: result.conflict,
        reason: null,
        queue: decorateQueue(key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (result.ok) {
    fanout(key, /** @type {any} */ (result.queue));
    stopCancelledReviewSessions(key, result.cancelled_attempt_ids);
  }
}

/**
 * Retired `worker-pr-discard` endpoint. It remains routable so stale clients
 * get an explicit error, but it performs no workspace lookup or mutation.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerPrDiscard(ws, req) {
  ws.send(
    JSON.stringify(
      makeError(
        req,
        'action_retired',
        'worker-pr-discard is retired; use worker-discard'
      )
    )
  );
}

/**
 * Handle the durable unified `worker-discard` entry.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerDiscard(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.bead_id !== 'string' ||
    p.bead_id.length === 0 ||
    !Number.isInteger(p.expected_revision) ||
    (p.attempt_id != null &&
      (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0)) ||
    (p.operation_id != null &&
      (typeof p.operation_id !== 'string' || p.operation_id.length === 0))
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id, attempt_id?, operation_id?, expected_revision }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {any} */
  let result;
  try {
    result = await discardWorkerBead(key, {
      bead_id: p.bead_id,
      ...(p.attempt_id == null ? {} : { attempt_id: p.attempt_id }),
      ...(p.operation_id == null ? {} : { operation_id: p.operation_id }),
      expected_revision: p.expected_revision
    });
  } catch (err) {
    log('worker-discard failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  recordUserAction(key, p.bead_id, 'discard', '[폐기] 클릭');
  const queue = /** @type {any} */ (queueStore().snapshot(key));
  const accepted = typeof result.operation_id === 'string';
  const operation = accepted
    ? queue.discard_operations?.[result.operation_id]
    : null;
  const phase = operation?.phase || result.phase || null;
  const pending =
    result.pending || (phase === 'merged_revert' ? 'merged_revert' : null);
  const receipt = operation
    ? {
        archive_path:
          typeof operation.backup?.path === 'string'
            ? operation.backup.path
            : null,
        original_pr: publicDiscardPr(operation.original_pr),
        revert_pr: publicDiscardPr(operation.revert_pr)
      }
    : null;
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        operation_id: result.operation_id || null,
        accepted,
        discarded: result.ok === true && phase === 'done',
        pending,
        reused: result.reused === true,
        conflict: result.conflict === true,
        phase,
        reason: result.reason || null,
        receipt,
        queue: decorateQueue(key, queue)
      })
    )
  );
  if (accepted) {
    fanout(key, queue);
  }
}

/**
 * @typedef {Object} WorkerStaleActionResult
 * @property {boolean} ok
 * @property {boolean} [conflict]
 * @property {string} [reason]
 * @property {string} [operation_id]
 * @property {string} [attempt_id]
 * @property {string} [state]
 */

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {(workspace: string, input: { bead_id: string, action_id: string, expected_revision: number }) => Promise<WorkerStaleActionResult>} action
 * @param {'continued'|'accepted'|'rechecked'} outcome_key
 */
async function handleWorkerStaleWorkAction(ws, req, action, outcome_key) {
  const p = /** @type {Record<string, unknown>} */ (req.payload || {});
  if (
    typeof p.bead_id !== 'string' ||
    p.bead_id.length === 0 ||
    typeof p.action_id !== 'string' ||
    p.action_id.length === 0 ||
    !Number.isInteger(p.expected_revision)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id, action_id, expected_revision }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {WorkerStaleActionResult} */
  let result;
  try {
    result = await action(key, {
      bead_id: p.bead_id,
      action_id: p.action_id,
      expected_revision: Number(p.expected_revision)
    });
  } catch (err) {
    log('%s failed for %s/%s: %o', req.type, key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  const queue = queueStore().snapshot(key);
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        [outcome_key]: result.ok === true,
        operation_id: result.operation_id || null,
        attempt_id: result.attempt_id || null,
        state: result.state || null,
        conflict: result.conflict === true,
        reason: result.reason || null,
        queue: decorateQueue(key, queue)
      })
    )
  );
  if (result.ok === true) {
    fanout(key, queue);
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerStaleWorkContinue(ws, req) {
  return handleWorkerStaleWorkAction(
    ws,
    req,
    continueWorkerStaleWork,
    'continued'
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerStaleWorkBackupFresh(ws, req) {
  return handleWorkerStaleWorkAction(
    ws,
    req,
    backupFreshWorkerStaleWork,
    'accepted'
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerStaleWorkRecheck(ws, req) {
  return handleWorkerStaleWorkAction(
    ws,
    req,
    recheckWorkerStaleWork,
    'rechecked'
  );
}

/**
 * Shared body of the two REVISE-disposition clicks (UI-hs11 §3.2). Both follow
 * the merge click's discipline exactly: validate the payload, refuse a stale
 * CAS revision WITHOUT acting (the snapshot the user clicked from may predate
 * the transition that unparked this very bead), run the action, collapse any
 * throw into `reason:'error'`, and fan out regardless of the outcome — a
 * refusal still re-observed bd, so the badge may have moved either way.
 *
 * The parked badge in that snapshot is advisory: the action itself re-runs the
 * whole parking judgment server-side before it touches anything.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {(workspace_key: string, bead_id: string, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, sha?: string, continuation_mismatch?: any }>} run
 */
async function handleReviseDisposition(ws, req, run) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const has_continuation = p.continuation !== undefined;
  if (
    (has_continuation &&
      p.continuation !== 'prior_session' &&
      p.continuation !== 'fresh_current') ||
    (has_continuation &&
      (!p.decision_token ||
        typeof p.decision_token !== 'object' ||
        Array.isArray(p.decision_token))) ||
    (!has_continuation && p.decision_token !== undefined)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'continuation requires prior_session|fresh_current and decision_token'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          ok: false,
          conflict: true,
          reason: null,
          attempt_id: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, reason?: string, attempt_id?: string, sha?: string, continuation_mismatch?: any }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = has_continuation
      ? await run(key, p.bead_id, {
          continuation: p.continuation,
          decision_token: p.decision_token
        })
      : await run(key, p.bead_id);
  } catch (err) {
    log('revise disposition failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        ok: !!result.ok,
        conflict: false,
        reason: result.ok ? null : result.reason || null,
        attempt_id: result.attempt_id || null,
        sha: result.sha || null,
        continuation_mismatch: result.continuation_mismatch || null
      })
    )
  );
  fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
}

/**
 * Handle `worker-revise-fix`. Payload:
 * `{ bead_id, expected_revision, continuation?, decision_token? }`.
 *
 * [finding 수용·수정] (UI-hs11 §3.3): dispatch the disposition session that
 * applies the parked findings to the spec, publishes on the resolved
 * `target_base` checkout, refreshes the receipt and unblocks the bead. The
 * click IS explicit user approval for that spec edit — the authority semantics
 * belong to the workflow contract, this handler only carries the trigger.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerReviseFix(ws, req) {
  await handleReviseDisposition(ws, req, reviseFixWorkerBead);
}

/**
 * Handle `worker-revise-approve`. Payload: `{ bead_id, expected_revision }`.
 *
 * [승인하고 진행] (UI-hs11 §3.4): no session at all — the server refreshes the
 * receipt to `skipped@<target_base tip>` with the notes lineage and the unblock
 * in one bd write, read back.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerReviseApprove(ws, req) {
  await handleReviseDisposition(ws, req, reviseApproveWorkerBead);
}

/**
 * Handle `worker-cleanup-retry`. Payload: `{ bead_id, expected_revision }`.
 * The queue revision is checked before attachment lookup so a stale click has
 * no action-side effects. The attachment remains a thin route to the canonical
 * `prActions.retryCleanup()` owner.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerCleanupRetry(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.trim().length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          retried: false,
          conflict: true,
          pending: false,
          cleanup_step: null,
          reason: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, pending?: boolean, step?: string|null, reason?: string|null }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await retryWorkerCleanup(key, p.bead_id);
  } catch (err) {
    log('worker cleanup retry failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  recordUserAction(key, p.bead_id, 'cleanup_retry', '[정리] 클릭');
  const latest = /** @type {any} */ (queueStore().snapshot(key));
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        retried: result.ok === true,
        conflict: false,
        pending: result.pending === true,
        cleanup_step: result.step || null,
        reason: result.ok ? null : result.reason || null,
        queue: decorateQueue(key, latest)
      })
    )
  );
  fanout(key, latest);
}

/**
 * Handle `worker-queue-remove`. Payload: `{ bead_id, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueRemove(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().remove(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  replyMutation(ws, req, key, result);
}
