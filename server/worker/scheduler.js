/**
 * Worker scheduler — the auto-advance state machine (spec §5.1–§5.3).
 *
 * Drives the queue: when `auto_advance` is on, ONE scan walks the single
 * waiting lane in order and fills the free slots (`queue.slots`, the store-owned
 * concurrency cap — worker-phase2 §3). Merge-serial mode temporarily forces
 * the effective cap to 1 without overwriting that stored preference. A blocked
 * / inadmissible entry is skipped to the next runnable one, never starving the
 * rest. `slots = 1` IS the retired serial lane. ⏸ (auto_advance off) lets
 * running sessions finish but starts no new ones.
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
 *     Worker-dispatched quick_fix attempts bypass this PR verdict entirely:
 *     their reviewed base-direct push settles through the quick_fix landing.
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
 * @import { Attempt } from './queue-store.js'
 * @import { RunnerHandle, RunnerVerdict } from './runner/session.js'
 * @import { WorktreeObservation, WorktreeSummary } from './worktree.js'
 */
import { createHash } from 'node:crypto';
import nodeFs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { isImplementationAttempt } from '../../app/utils/active-attempts.js';
import { isWorkerIneligible } from '../../app/utils/worker-eligibility.js';
import { debug } from '../logging.js';
import { resolveCswapPath as defaultResolveCswapPath } from '../routes/claude-usage.js';
import {
  WORKSPACE_ACCOUNTS_KV_KEY,
  normalizeWorkspaceAccounts
} from '../workspace-accounts.js';
import { observeBaseDrift } from './base-drift.js';
import {
  observeClaudeEffort as defaultObserveClaudeEffort,
  observeClaudeSubagentEffort as defaultObserveClaudeSubagentEffort
} from './claude-effort-observer.js';
import { prepareCodexAccountHome as defaultPrepareCodexAccountHome } from './codex-account-home.js';
import { observeCodexEffort as defaultObserveCodexEffort } from './codex-effort-observer.js';
import * as default_delegation_monitor from './delegation-monitor.js';
import { EXEC_SETTING_KEYS } from './exec-enums.js';
import { loadExecutionDefaults } from './execution-defaults.js';
import * as default_guard_hook from './guard-hook.js';
import { DEFAULT_SLOTS, MIN_SLOTS } from './queue-store.js';
import { judgeQuickFixHandoff } from './quick-fix-handoff.js';
import {
  RECEIPT_BASELINE_KEYS,
  RECEIPT_METADATA_KEYS,
  checkReceipts,
  receiptDefaultsFrom,
  receiptLineageForAttempt,
  receiptProbeError
} from './receipt-check.js';
import { repairSessionPrompt } from './repair-session-adapter.js';
import { liftDelegation } from './runner/claude.js';
import { RUNNERS } from './runner/index.js';
import { defaultTaskPrompt } from './runner/preamble.js';
import { codexAccountHomeDir as defaultCodexAccountHomeDir } from './state-paths.js';
import * as default_usage_receipts from './usage-receipts.js';

const log = debug('worker:scheduler');

/**
 * @typedef {Object} StaleWorkIdentity
 * @property {string|null} worktree_realpath
 * @property {string|null} branch
 * @property {string|null} head_sha
 * @property {string|null} [branch_head_sha]
 * @property {string|null} base_oid
 * @property {string|null} status_digest
 */
/**
 * @typedef {Object} StaleWorkAdmission
 * @property {1} schema
 * @property {'worktree'|'branch'} residue
 * @property {'unique'|'unknown'} state
 * @property {string} cause
 * @property {WorktreeSummary} summary
 * @property {string} identity_digest
 * @property {string} action_id
 * @property {boolean} can_resume
 * @property {boolean} can_continue
 * @property {boolean} can_backup_fresh
 * @property {boolean} can_recheck
 * @property {StaleWorkIdentity} identity
 */

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
 * Serialize a decision-binding value without depending on object insertion
 * order. Decision tokens cross a WebSocket boundary, so JSON.stringify() on
 * caller-provided objects is not a stable identity check.
 *
 * @param {unknown} value
 * @returns {string}
 */
function canonicalContinuationJson(value) {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string' || typeof value === 'boolean') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? JSON.stringify(value) : 'null';
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalContinuationJson).join(',')}]`;
  }
  if (typeof value === 'object') {
    const record = /** @type {Record<string, unknown>} */ (value);
    return `{${Object.keys(record)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${canonicalContinuationJson(record[key])}`
      )
      .join(',')}}`;
  }
  return 'null';
}

/** @param {unknown} value */
function continuationDigest(value) {
  return createHash('sha256')
    .update(canonicalContinuationJson(value))
    .digest('hex');
}

/**
 * Require the exact small server-issued token shape. This is deliberately not
 * a generic deep-equality helper: unknown keys and coerced values must never
 * make a stale continuation look current.
 *
 * @param {unknown} supplied
 * @param {Record<string, string|number|null>} expected
 */
function matchesDecisionToken(supplied, expected) {
  if (!supplied || typeof supplied !== 'object' || Array.isArray(supplied)) {
    return false;
  }
  const actual = /** @type {Record<string, unknown>} */ (supplied);
  const expected_keys = Object.keys(expected).sort();
  if (
    Object.keys(actual).sort().join('\u0000') !== expected_keys.join('\u0000')
  ) {
    return false;
  }
  return expected_keys.every((key) => actual[key] === expected[key]);
}

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
  'stopped',
  'discarded'
]);

/** Maximum terminal receipt inboxes inspected per reconciliation pass. */
const TERMINAL_RECEIPT_RECOVERY_MAX = 32;
// Assistant lines a fresh session may take before its project JSONL holds one.
const SESSION_EFFORT_RETRY_LIMIT = 3;

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
 * First-dispatch prompt for artifact staleness: default task plus the receipt,
 * actual anchor, base, commits, and changed paths for each stale artifact.
 *
 * The lane's PROCEDURE is deliberately not restated here: it belongs to the
 * workflow contract (dotfiles `docs/contracts/workflow.md`), and beads-ui is
 * that contract's consumer, not its author. The prompt therefore delivers the
 * trigger plus observations and points at the contract for the rest.
 *
 * @param {string} bead_id
 * @param {{
 *   base: string,
 *   spec?: { receipt: string, receipt_sha: string, delta_shas: string[], changed_paths?: string[] },
 *   plan?: { receipt: string, receipt_sha: string, delta_shas: string[], changed_paths: string[] }
 * }} stale
 * @returns {string}
 */
function staleDispatchPrompt(bead_id, stale) {
  /** @type {string[]} */
  const blocks = [];
  if (stale.spec) {
    blocks.push(
      [
        '[spec]',
        `stale spec_review 관측 — 영수증 \`${stale.spec.receipt}\`, freshness 앵커 \`${stale.spec.receipt_sha}\`, base \`${stale.base}\`.`,
        `delta 커밋: ${stale.spec.delta_shas.join(', ')}`,
        `변경 경로: ${(stale.spec.changed_paths || []).join(', ') || '(기록 없음)'}`
      ].join('\n')
    );
  }
  if (stale.plan) {
    blocks.push(
      [
        '[plan]',
        `stale plan_approval 관측 — 영수증 \`${stale.plan.receipt}\`, freshness 앵커 \`${stale.plan.receipt_sha}\`, base \`${stale.base}\`.`,
        `delta 커밋: ${stale.plan.delta_shas.join(', ')}`,
        `변경 경로: ${stale.plan.changed_paths.join(', ') || '(기록 없음)'}`
      ].join('\n')
    );
  }
  return [
    defaultTaskPrompt(bead_id),
    ...blocks,
    '구현에 들어가기 전에 workflow 계약의 워커 재리뷰 레인(stale receipt 갱신)을 먼저 수행하라.'
  ].join('\n\n');
}

/**
 * @param {string} bead_id
 * @param {{ identity: StaleWorkIdentity, summary: WorktreeSummary, target_base: string }} stale_work
 */
function staleWorkContinuePrompt(bead_id, stale_work) {
  const summary = stale_work.summary;
  return [
    defaultTaskPrompt(bead_id),
    '기존 worktree를 의도적으로 채택했다. 이 worktree를 reset하거나 버리지 마라.',
    `현재 변경 요약: staged ${summary.staged_count}, unstaged ${summary.unstaged_count}, untracked ${summary.untracked_count}, branch ahead ${summary.branch_ahead}, HEAD ahead ${summary.head_ahead}.`,
    `핀된 최신 base: \`${stale_work.target_base}\`; 기존 worktree HEAD: \`${stale_work.identity.head_sha || 'unknown'}\`.`,
    '남은 변경을 먼저 검토하고 현재 workflow authority와 정합한 뒤 작업을 이어가라.'
  ].join('\n\n');
}

/**
 * The quick_fix self-review observation block (UI-r7or §6), or null when there
 * is nothing to observe.
 *
 * Only `stale` and `unreviewed` earn a block: `reviewed` needs no lane, and
 * `unknown` means the pinned projection could not be read at all, so ordering a
 * session to review would be an instruction without evidence (§6.2).
 *
 * Like {@link staleDispatchPrompt}, this carries the OBSERVATION and a pointer
 * only — the delta self-review procedure belongs to the workflow contract.
 *
 * @param {import('./quick-fix-handoff.js').QuickFixHandoffState|null} judgement
 * @param {unknown} receipt - Raw `quick_fix_review` metadata; an `unreviewed`
 * bead may legitimately carry none.
 * @returns {string|null}
 */
export function quickFixSelfReviewBlock(judgement, receipt) {
  if (
    !judgement ||
    (judgement.state !== 'stale' && judgement.state !== 'unreviewed')
  ) {
    return null;
  }
  const receipt_text =
    typeof receipt === 'string' && receipt.trim().length > 0
      ? `\`${receipt.trim()}\``
      : '(없음)';
  const digest_text = judgement.digest ? `\`${judgement.digest}\`` : '(없음)';
  return [
    [
      '[quick_fix self-review]',
      `${judgement.state} quick_fix_review 관측 — 영수증 ${receipt_text}, 현재 본문 digest ${digest_text}.`,
      `누락: ${judgement.missing.join(', ') || '(없음)'}`
    ].join('\n'),
    '구현에 들어가기 전에 workflow 계약의 quick_fix delta self-review 레인을 먼저 수행하라.'
  ].join('\n\n');
}

/**
 * Append the observation block to whichever base prompt the dispatch selected
 * (§6.1). The block never REPLACES that choice, and always follows it: a session
 * has to know what it is taking over before it can judge what to do first
 * (§6.4).
 *
 * @param {string} base_prompt
 * @param {string|null} block
 */
export function withQuickFixSelfReview(base_prompt, block) {
  return block ? `${base_prompt}\n\n${block}` : base_prompt;
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
 * @property {string} [orchestration_speed] - Effective outer launch speed
 * (`default` or `fast`).
 * @property {string} [claude_account] - Per-bead cswap email pin.
 * @property {string} [codex_account] - Per-bead codex-auth account key pin.
 * @property {string} [spec_review_model] - spec_review_model (per-bead exec setting).
 * @property {string} [spec_review_effort] - spec_review_effort (per-bead exec setting).
 * @property {string} [impl_review_model] - impl_review_model (per-bead exec setting).
 * @property {string} [impl_review_effort] - impl_review_effort (per-bead exec setting).
 * @property {string} [plan_review_model] - plan_review_model (per-bead exec setting).
 * @property {string} [plan_review_effort] - plan_review_effort (per-bead exec setting).
 * @property {string} [impl_runtime] - impl_runtime (per-bead exec setting).
 * @property {string} [impl_model] - impl_model (per-bead exec setting).
 * @property {string} [impl_effort] - impl_effort (per-bead exec setting).
 * @property {string|null} [workflow_mode] - Current workflow_mode metadata.
 * @property {string|null} [workflow_mode_source] - Current workflow_mode_source
 * metadata, read from the same issue observation as `workflow_mode`.
 * @property {string|null} [route] - Workflow route (e.g. full_plan).
 * @property {string} [status] - Issue status (open/in_progress/resolved/closed).
 * @property {string|null} [title] - Issue title, for the start notification.
 * @property {string|null} [description] - Issue description. The quick_fix route's only admission input (admission.js §4).
 * @property {string[]} [labels] - Normalized live Bead labels.
 * @property {string|null} [spec_id] - Native-first spec doc path (admission input).
 * @property {boolean} [spec_id_conflict] - Native and legacy metadata paths differ.
 * @property {unknown} [spec_review] - Raw spec_review metadata value. Key
 * absence ⇒ `undefined`; any present value must reach the admission
 * validator so a malformed receipt rejects instead of reading as absent.
 * @property {unknown} [plan_path] - Raw plan_path admission input.
 * @property {unknown} [plan_approval] - Raw plan_approval admission input.
 * @property {unknown} [last_checked_sha] - Raw freshness cursor admission input.
 * @property {unknown} [issue_type] - Raw top-level issue type. A quick_fix
 * self-review input only (`baseline_red` is required for `bug`); key absence ⇒
 * `undefined`, any present value reaches the judge unflattened.
 * @property {unknown} [quick_fix_review] - Raw quick_fix self-review receipt
 * metadata, under the same presence rule.
 * @property {string[]} [deps] - Direct `blocks` blocker ids (UI-04vo §3) —
 * the lane-ordering edge source. Consumers intersect these with the current
 * queue membership.
 * @property {string[]} [blocked_by] - Display-only direct blocker ids for the
 * wait-reason chip; never a scheduling input beyond `ready`/`blocked`.
 */

/**
 * @typedef {Object} SchedulerDeps
 * @property {any} store - Queue store (queue-store.js).
 * @property {ReturnType<typeof import('./exec-preset-coordinator.js').createExecPresetCoordinator>} execPresetCoordinator
 * The sole authority for workspace preset resolution. It snapshots the selected
 * preset before launch state changes, so the scheduler never reads mutable
 * preset/default state itself.
 * @property {(workspace: string, key: string) => Promise<import('../bd.js').KvGetResult>} [kvGet]
 * Workspace-addressed `bd kv` reader (UI-d3cb §5.1). The account default layer
 * lives in kv, which the preset coordinator's synchronous workspace resolution
 * cannot reach, so every dispatch resolution reads it through this dep. Absent
 * wiring leaves the layer ABSENT rather than refusing: an unwired channel is
 * not one of §5.2's four `unusable` cases, and no repo default can be stored
 * without it either.
 * @property {(runner_name: string) => { name: string, spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }} makeRunner
 * @property {{ resolveClaude: (email: string) => Promise<any>, resolveCodex: (key: string) => Promise<any> }} [accountCatalog]
 * @property {() => string|null} [resolveCswapPath]
 * @property {typeof defaultPrepareCodexAccountHome} [prepareCodexAccountHome]
 * @property {(key: string) => string} [codexAccountHomeDir]
 * @property {string} [codexRoot]
 * @property {string} [homeDir]
 * @property {{
 *   snapshotBead: (bead_id: string) => Promise<BeadSnapshot>,
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *   setStatus: (bead_id: string, status: string) => Promise<void>,
 *   readStatus: (bead_id: string) => Promise<string|null>
 * }} bd
 * @property {{ add: (i: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>, remove: (i: { repo: string, bead_id: string }) => Promise<any>, removeIfDiscardable?: (i: { repo: string, bead_id: string, base: string, preserve?: boolean }) => Promise<WorktreeObservation>, addDetached?: (i: { repo: string, name: string, sha: string }) => Promise<{ path: string }>, removeDetached?: (i: { repo: string, name: string }) => Promise<any>, pathFor?: (repo: string, bead_id: string) => string, exists?: (repo: string, bead_id: string) => boolean }} worktree
 * @property {{ verifyPrSubmitted: (i: { repo: string, bead_id: string }) => Promise<{ ok: boolean, reason: string, pr_url?: string|null, already_finished?: boolean }> }} verify
 * Server-observation completion verdict (worker-phase2 §1): an open PR for the
 * attempt's branch, plus the worker's `pr_url`/`resolved` back-fill.
 * @property {{ settle: (input: { attempt_id: string, bead_id: string, target_base: string }) => Promise<{ ok: boolean, reason?: string, step?: string|null }> }} [quickfixLanding]
 * Worker-dispatched quick_fix landing settlement (design §6). An attachment
 * without this dep fails the landing attempt closed; it never falls back to PR
 * observation.
 * @property {(options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>} [resolveBase]
 * The repo's base declaration resolver (worker-base-scope-alignment §1). Called
 * with `{ force: true }` at dispatch, immediately before the worktree cut, so
 * the cut and the attempt's recorded `target_base` come from a base read at
 * dispatch time rather than one captured earlier. Absent wiring falls back to
 * the snapshot's own resolution.
 * @property {{ validate: (snap: BeadSnapshot, base?: string) => Promise<{ ok: boolean, reason?: string, stale?: { receipt_sha?: string, delta_shas?: string[], changed_paths?: string[], plan?: { receipt_sha: string, delta_shas: string[], changed_paths: string[] } } }> }} [admission]
 * Auto-run admission validator (worker-autorun-policy §1). When present, the
 * tick candidate scan AND the dispatch re-check (against the pinned worktree
 * base_oid) both gate on it; refusals are recorded in `Queue.admission`. An
 * ADMITTED result may still carry `stale` (UI-dlim §3.1) — a non-blocking
 * observation that an artifact scope moved after its anchor, which flags the
 * badge and attempt and is injected into the session prompt.
 * @property {{ complete: (input: { workspace: string, attempt_id: string, bead_id: string, kind: string, prior_receipt?: string|null, target_base?: string|null }) => Promise<{ ok: boolean, reason?: string }>, release?: (bead_id: string) => void }} [disposition]
 * Completion verdict for a DISPOSITION attempt (UI-hs11 §3.3). A disposition
 * session opens no PR, so the PR-existence check every implementation attempt
 * ends with would fail it as `no_pr`; this dep judges the disposition's own
 * durable result instead. Absent wiring simply means no disposition can be
 * dispatched (the entry point refuses).
 * @property {{ judge: (input: { workspace: string, operation_id: string }) => Promise<{ verdict: string, evidence?: string|null }> }} [repairSession]
 * Existing repair-target observation used to neutralize only failures whose
 * target is already durably complete. Absent or throwing wiring fails closed.
 * @property {{ get: (workspace: string, bead_id: string) => import('./external-pr.js').ExternalPrRow|null }} [externalPrs]
 * The EXTERNAL PR registry (UI-7agi §1), read by {@link createScheduler}'s
 * `dispatchExternalConflict` to confirm the bead really is an external row
 * before launching a resolution session for it. Optional and FAIL-CLOSED: an
 * attachment built without it (every hermetic test) refuses the dispatch as
 * `not_external` rather than launching against an unverified bead.
 * @property {{ existsSync: (path: string) => boolean }} [fs]
 * @property {{ attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void, publish?: (workspace: string, attempt_id: string, event: unknown, launch_id?: string, offset?: number) => void, pathFor?: (workspace: string, attempt_id: string) => string, stderrPathFor?: (workspace: string, attempt_id: string) => string }} sessionLog
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
 * @property {ReturnType<typeof import('./delegation-store.js').createDelegationStore>} [delegation] -
 * Live Claude subagent tally (UI-2mpn §5.2). Absent, the delegation pass is a
 * no-op and a subagent stays invisible — exactly what an unwired `usage` does
 * to the token badge.
 * @property {typeof import('./usage-receipts.js')} [usageReceipts]
 * Attempt-scoped receipt filesystem adapter. The default is the production
 * reader; tests may inject a deterministic in-memory seam.
 * @property {typeof import('./delegation-monitor.js')} [delegationMonitor]
 * Attempt-scoped delegated-session monitor adapter. The default is the
 * production reader; tests may inject a deterministic in-memory seam.
 * @property {(input: { cwd: string, session_id: string }) => string|null} [observeClaudeEffort]
 * @property {(input: { cwd: string, session_id: string, agent_id: string }) => string|null} [observeClaudeSubagentEffort]
 * Fail-quiet Claude session-file effort observer.
 * @property {(input: { session_id: string, started_at: number|null }) => string|null} [observeCodexEffort]
 * Fail-quiet Codex rollout-file effort observer.
 * @property {(workspace: string) => void} [notifyQueueChanged]
 * Fired after autonomous queue transitions (dispatch records, admission
 * refusals, session done/fail) so ws subscribers get a fresh snapshot without
 * waiting for their next own mutation (worker-autorun-policy §6).
 * @property {(input: { workspace: string, root_bead_id: string, op_id: string, failure_key: any, attempt: any, verdict: RunnerVerdict|null }) => Promise<void>|void} [onCompletionAttemptSettled]
 * Completion coordinator settlement hook. Invoked only after the ordinary
 * attempt termination path has durably updated the record.
 * @property {{
 *   attemptStarted: (i: any) => void,
 *   attemptFailed: (i: any) => void,
 *   prWaitEntered: (i: any) => void
 * }} [notify]
 * Outward attempt-lifecycle push (UI-2yoq, notify.js). Optional: absent wiring
 * (every dispatch-only test) simply pushes nothing, exactly like a machine that
 * left `[worker.notify]` off.
 * @property {{
 *   install: (i: { workspace: string, attempt_id: string, repo: string, target_base: string }) => { ok: boolean, dir?: string, hook_path?: string, reason?: string },
 *   envFor: (i: { workspace: string, attempt_id: string }) => Record<string, string>,
 *   remove: (i: { workspace: string, attempt_id: string }) => boolean,
 *   readPushLog?: (i: { workspace: string, attempt_id: string }) => { ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: string }
 * }} [guardHook]
 * The prevention layer (UI-8mvc §2). Defaults to the real `guard-hook.js`, so
 * production wiring is the module itself and a test overrides it only to drive
 * an install failure. Every attempt EXCEPT a disposition gets one: a
 * REVISE-disposition session publishes the base as its job.
 * @property {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} [gitRun]
 * The `git` runner the DETECTION layer asks its reachability question with
 * (UI-8mvc §3, UI-1xcd §4), and the one `launchSession` reads an attempt's
 * starting branch tip with. Wired from the attachment's one runner, so the
 * observation runs the same git the base resolver does. Absent wiring makes
 * every observation record `no_observer_deps` — an attempt that could not be
 * observed is recorded as such, never judged.
 * @property {(pid: number|null) => { alive: boolean, started_at: number|null }} [probePid]
 * Liveness + start-time probe for {@link createScheduler}'s `reconcile`. Absent
 * (legacy wiring / dispatch-only tests) makes every reconcile pass a no-op:
 * without a probe there is no evidence a detached session died.
 * @property {{ probe: (identity: { pid: number, pgid: number, started_at: number }) => { state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }, terminate: (identity: { pid: number, pgid: number, started_at: number }) => Promise<{ ok: boolean, state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }> }} [processController]
 * Restart-safe detached process-group controller. When absent, pause preserves
 * the legacy process-local handle behavior for older embedders and tests.
 * @property {() => number} [now]
 * @property {(bead_id: string) => string} [makeAttemptId]
 */

/**
 * @param {any} attempt
 * @returns {string|null}
 */
function serialLineageId(attempt) {
  if (!attempt || typeof attempt.bead_id !== 'string') {
    return null;
  }
  return typeof attempt.completion_root_id === 'string'
    ? attempt.completion_root_id
    : attempt.bead_id;
}

/**
 * Statuses that RELEASE lane occupancy (UI-04vo §2): merge-and-cleanup
 * completion (`done` via moveToDone), the unified discard terminal, and the
 * legacy `stopped` history state. Everything else — running, paused,
 * `failed`, `orphaned`, `dismissed_at` regardless — keeps the lineage's lane
 * occupied until the lineage merges or is discarded.
 *
 * @type {Set<string>}
 */
const LANE_RELEASING_STATUSES = new Set(['done', 'stopped', 'discarded']);

/**
 * Zero-based slot index of a serial lane id, or null for anything else.
 *
 * @param {unknown} id
 */
function serialLaneIndexOf(id) {
  if (typeof id !== 'string') {
    return null;
  }
  const match = /^s([1-5])$/.exec(id);
  return match ? Number(match[1]) - 1 : null;
}

/**
 * The serial lane a bead currently waits in, or null when it sits in the
 * parallel lane (or in no waiting lane at all).
 *
 * @param {{ serial_lanes?: Array<{ id: string, entries: Array<{ bead_id: string }> }> }} q
 * @param {string} bead_id
 * @returns {string|null}
 */
function waitingLaneOf(q, bead_id) {
  for (const lane of q.serial_lanes || []) {
    if (lane.entries.some((entry) => entry.bead_id === bead_id)) {
      return lane.id;
    }
  }
  return null;
}

/**
 * Per-lane active lineage occupancy (UI-04vo §2), rebuilt from durable state
 * on every read so a restart reproduces it without a schema field. A lane is
 * occupied by a lineage while any of these holds for an attempt carrying its
 * `serial_lane_id`:
 *
 *   - a LEAF attempt (nothing resumed from it) in a non-releasing status —
 *     running, paused, failed, orphaned; `dismissed_at` is a UI hide, never
 *     a release;
 *   - the bead sits in durable `pr_wait` (its terminal `done` attempt is the
 *     lane holder until merge cleanup moves it to Done);
 *   - a discard operation for the lineage is still in flight.
 *
 * @param {{ attempts?: Record<string, any>, pr_wait?: Array<{ bead_id: string, serial_lane_id?: string|null }>, discard_operations?: Record<string, any> }} q
 * @returns {Map<string, Set<string>>} lane id → occupying lineage ids.
 */
export function activeLaneLineages(q) {
  const values = Object.values(q.attempts || {});
  const resumed = new Set(
    values.map((attempt) => attempt?.resumed_from).filter(Boolean)
  );
  /** @type {Map<string, Set<string>>} */
  const lanes = new Map();
  /**
   * @param {unknown} lane
   * @param {string|null} lineage
   */
  function occupy(lane, lineage) {
    if (serialLaneIndexOf(lane) === null || !lineage) {
      return;
    }
    const key = /** @type {string} */ (lane);
    const set = lanes.get(key) || new Set();
    set.add(lineage);
    lanes.set(key, set);
  }
  for (const attempt of values) {
    if (!attempt || LANE_RELEASING_STATUSES.has(attempt.status)) {
      continue;
    }
    if (resumed.has(attempt.attempt_id)) {
      continue;
    }
    occupy(attempt.serial_lane_id, serialLineageId(attempt));
  }
  for (const entry of q.pr_wait || []) {
    const attempt = [...values]
      .reverse()
      .find((item) => item?.bead_id === entry?.bead_id);
    if (attempt && serialLaneIndexOf(attempt.serial_lane_id) !== null) {
      occupy(attempt.serial_lane_id, serialLineageId(attempt));
    } else {
      occupy(entry.serial_lane_id, entry.bead_id);
    }
  }
  for (const operation of Object.values(q.discard_operations || {})) {
    if (!operation || operation.phase === 'done') {
      continue;
    }
    const attempt =
      (typeof operation.attempt_id === 'string' &&
        q.attempts?.[operation.attempt_id]) ||
      [...values].reverse().find((item) => item?.bead_id === operation.bead_id);
    if (attempt) {
      occupy(attempt.serial_lane_id, serialLineageId(attempt));
    }
  }
  return lanes;
}

/**
 * Whether a serial lane is occupied by any lineage OTHER than `lineage_id`.
 * A lineage never fences itself: its own resume, repair, and re-dispatch are
 * the continuations lane inheritance exists for.
 *
 * @param {Map<string, Set<string>>} occupancy
 * @param {string} lane_id
 * @param {string} lineage_id
 */
export function laneOccupiedByOther(occupancy, lane_id, lineage_id) {
  const occupants = occupancy.get(lane_id);
  if (!occupants) {
    return false;
  }
  return [...occupants].some((lineage) => lineage !== lineage_id);
}

/**
 * Where each provider's effective account came from. Carried beside `accounts`
 * rather than inside it (UI-d3cb §5.1) because the continuation digest hashes
 * `accounts`, and the same account spends the same tokens whether an issue pin
 * or a repo default named it.
 *
 * @typedef {{ claude: 'bead'|'workspace_default'|null, codex: 'bead'|'workspace_default'|null }} AccountSources
 */

/**
 * Settle one provider: issue pin > repo default > current active login.
 *
 * @param {unknown} pinned - The Bead snapshot's account metadata value.
 * @param {string|undefined} workspace_default
 * @returns {{ value: string|null, source: 'bead'|'workspace_default'|null }}
 */
function effectiveAccount(pinned, workspace_default) {
  // `typeof` rather than a truthiness test, so the pin layer keeps exactly the
  // acceptance it had before this key gained a layer beneath it.
  if (typeof pinned === 'string') {
    return { value: pinned, source: 'bead' };
  }
  if (typeof workspace_default === 'string') {
    return { value: workspace_default, source: 'workspace_default' };
  }
  return { value: null, source: null };
}

/**
 * The operator-actionable specifics behind a closed-vocabulary account refusal.
 *
 * The refusal reasons themselves are NOT widened per source (§5.2); the detail
 * is what answers "fix the issue, or fix the repo settings?". Order matters:
 * the Codex HOME preparation detail names a failing path and keeps precedence,
 * and a failure traced to an issue pin stays detail-free exactly as before.
 *
 * @param {{ reason: string, detail?: unknown, home_dir?: string|null, provider?: 'claude'|'codex' }} failure
 * @param {{ claude: string|null, codex: string|null }} accounts
 * @param {AccountSources} account_sources
 * @returns {{ reason: string, command: string|null }|null}
 */
function launchAccountRefusalDetail(failure, accounts, account_sources) {
  if (typeof failure.detail === 'string') {
    return { reason: failure.detail, command: failure.home_dir ?? null };
  }
  const provider = failure.provider;
  if (
    provider !== undefined &&
    account_sources[provider] === 'workspace_default'
  ) {
    return {
      reason: `workspace_default:${provider}_account=${accounts[provider]}`,
      command: null
    };
  }
  return null;
}

/**
 * Build the auto-advance state machine over the queue store.
 *
 * @param {SchedulerDeps} deps
 * @returns {{
 *   tick: (workspace: string) => Promise<void>,
 *   staleWorkContinue: (workspace: string, input: { bead_id: string, action_id: string, expected_revision: number }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, conflict?: boolean }>,
 *   staleWorkRecheck: (workspace: string, input: { bead_id: string, action_id: string, expected_revision: number }) => Promise<{ ok: boolean, reason?: string, state?: string, conflict?: boolean }>,
 *   stop: (workspace: string, attempt_id: string) => Promise<boolean>,
 *   pause: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string }>,
 *   resume: (workspace: string, attempt_id: string, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any, instructions?: string, preclaimed?: boolean }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>,
 *   resolveConflict: (workspace: string, bead_id: string, resolution_wait?: { queue_bead_id: string, wait_ms: number, manual_authority?: boolean }|null, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>,
 *   dispatchExternalConflict: (workspace: string, bead_id: string, target_base?: string, resolution_wait?: { queue_bead_id: string, wait_ms: number, manual_authority?: boolean }|null, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>,
 *   queueConflictBlocked: (workspace: string, queue_bead_id: string, subject_bead_id: string) => boolean,
 *   dispatchReviseFix: (workspace: string, input: { bead_id: string, attempt_id: string, prompt: string, prior_receipt?: string|null, resume?: boolean, continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>,
 *   dispatchCompletionRepair: (workspace: string, input: { root_bead_id: string, op: any, log_path?: string|null, continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, adopted?: boolean, continuation_mismatch?: any }>,
 *   dispatchRepoOperationRepair: (workspace: string, input: { bead_id: string, operation_id: string, packet: any }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, session_id?: string|null }>,
 *   canDiscardAttempt: (attempt_id: string|null|undefined) => boolean,
 *   fenceDiscardAttempt: (attempt_id: string|null|undefined) => boolean,
 *   finalizeDiscardAttempt: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string }>,
 *   recoverControls: (workspace: string) => Promise<void>,
 *   reconcile: (workspace: string) => Promise<void>,
 *   sweepClosedQueue: (workspace: string, statuses: Record<string, string>) => void,
 *   activeBeadIds: (workspace: string) => Set<string>,
 *   staleWorkActionInFlight: (workspace: string, bead_id: string) => boolean,
 *   externalProtectedBeadIds: (workspace: string) => Set<string>,
 *   runningCount: () => number,
 *   runningBeads: () => string[],
 *   isRunning: (bead_id: string) => boolean
 * }}
 */
export function createScheduler(deps) {
  const now = deps.now || (() => Date.now());
  const fs = deps.fs || nodeFs;
  const guardHook = deps.guardHook || default_guard_hook;
  const usage_receipts = deps.usageReceipts || default_usage_receipts;
  const delegation_monitor =
    deps.delegationMonitor || default_delegation_monitor;
  const observeClaudeEffort =
    deps.observeClaudeEffort || defaultObserveClaudeEffort;
  const observeClaudeSubagentEffort =
    deps.observeClaudeSubagentEffort || defaultObserveClaudeSubagentEffort;
  const observeCodexEffort =
    deps.observeCodexEffort || defaultObserveCodexEffort;
  /** @type {Map<string, number>} */
  const receipt_recovery_cursor = new Map();
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
   * @typedef {{ bead_id: string, lineage_id: string, serial_lane_id: string|null, continuation?: boolean }} LaneLaunchInput
   */
  /**
   * @typedef {{
   *   release: () => void,
   *   handoff: () => void,
   *   revalidate: (input: LaneLaunchInput) => ({ ok: true, lease: LaneLaunchLease }|{ ok: false, reason: string })
   * }} LaneLaunchLease
   */
  /**
   * The lane-occupancy launch coordinator is deliberately process-local. Queue
   * state remains the recovery source; reservations only close the await gaps
   * before a durable attempt exists.
   *
   * @type {Map<string, { launches: Map<string, LaneLaunchInput> }>} */
  const serial_coordinators = new Map();

  /**
   * @param {string} workspace
   * @returns {{ launches: Map<string, LaneLaunchInput> }}
   */
  function serialCoordinator(workspace) {
    let coordinator = serial_coordinators.get(workspace);
    if (!coordinator) {
      coordinator = { launches: new Map() };
      serial_coordinators.set(workspace, coordinator);
    }
    return coordinator;
  }
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
   * The in-flight dispatch drain, or `null` when no pass is running. Overlapping
   * passes are what let two sessions take the same bead: the scan spans awaits
   * (bd snapshot, admission), and a pass that starts inside that window sees a
   * claim-free state the first pass has not written yet. One drain at a time
   * removes the window; `rescan` is how a request that arrives mid-drain is
   * carried into the next round instead of nesting.
   *
   * Instance-scoped like `claimed`/`running`: `createScheduler` is built per
   * workspace (`attach.js`), so there is no workspace key to hold here.
   *
   * @type {Promise<void>|null}
   */
  let draining = null;
  let rescan = false;
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
  /** @type {Map<string, ReturnType<typeof setInterval>>} */
  const receipt_poll_timers = new Map();
  /** @type {Map<string, ReturnType<typeof setInterval>>} */
  const delegation_poll_timers = new Map();
  /**
   * @type {Map<string, {
   *   offsets: Record<string, number>,
   *   sessions: Map<string, import('./queue-store.js').DelegationSession>
   * }>}
   */
  const delegation_tail_states = new Map();

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
   * Observe receipt-only arrivals while an attempt runs. A nested Codex leg can
   * complete after the outer stream has gone quiet, so usage events alone are
   * not a sufficient fanout trigger.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  function startUsageReceiptPolling(workspace, attempt_id) {
    if (receipt_poll_timers.has(attempt_id)) {
      return;
    }
    /** @type {Set<string>} */
    const seen = new Set();
    try {
      const current = deps.store.snapshot(workspace).attempts?.[attempt_id];
      for (const leg of current?.usage_legs || []) {
        if (leg && typeof leg.receipt_id === 'string') {
          seen.add(leg.receipt_id);
        }
      }
    } catch {
      return;
    }
    const poll = () => {
      try {
        const current = deps.store.snapshot(workspace).attempts?.[attempt_id];
        const scanned = usage_receipts.readAttemptUsageReceipts(
          workspace,
          attempt_id,
          { known_legs: current?.usage_legs }
        );
        let changed = false;
        for (const leg of scanned.legs) {
          if (!seen.has(leg.receipt_id)) {
            seen.add(leg.receipt_id);
            changed = true;
          }
        }
        if (changed) {
          notifyChanged(workspace);
        }
      } catch (err) {
        log('live receipt poll failed for %s: %o', attempt_id, err);
      }
    };
    const timer = setInterval(poll, USAGE_FANOUT_THROTTLE_MS);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    receipt_poll_timers.set(attempt_id, timer);
  }

  /**
   * @param {string} attempt_id
   */
  function clearUsageReceiptPolling(attempt_id) {
    const timer = receipt_poll_timers.get(attempt_id);
    if (timer) {
      clearInterval(timer);
      receipt_poll_timers.delete(attempt_id);
    }
  }

  /**
   * Compare only the fields whose live change requires a queue snapshot.
   * Identity is validated by the monitor reader before it reaches this point.
   *
   * @param {import('./queue-store.js').DelegationSession|undefined} prior
   * @param {import('./queue-store.js').DelegationSession} current
   */
  function delegationSummaryChanged(prior, current) {
    return (
      !prior ||
      prior.status !== current.status ||
      prior.last_event_at !== current.last_event_at
    );
  }

  /**
   * @param {import('./queue-store.js').DelegationSession[]} sessions
   */
  function delegationSummaryIdentity(sessions) {
    return JSON.stringify(
      [...sessions].sort((left, right) =>
        left.launch_id.localeCompare(right.launch_id)
      )
    );
  }

  /**
   * Tail validated delegated-session streams for one running attempt.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  function startDelegationPolling(workspace, attempt_id) {
    if (delegation_poll_timers.has(attempt_id)) {
      return;
    }
    /** @type {import('./queue-store.js').DelegationSession[]} */
    let durable = [];
    try {
      const current = deps.store.snapshot(workspace).attempts?.[attempt_id];
      durable = delegation_monitor.normalizeDelegationSessions(
        current?.delegation_sessions
      );
    } catch {
      return;
    }
    const state = {
      offsets: /** @type {Record<string, number>} */ ({}),
      sessions: new Map(durable.map((session) => [session.launch_id, session]))
    };
    delegation_tail_states.set(attempt_id, state);
    /**
     * @param {boolean} publish_events - False for the adopting first scan: a
     * restart re-reads a stream this process never published, and the drawer
     * takes that prefix from its own snapshot. Publishing it here would push
     * the same lines a second time.
     */
    const poll = (publish_events) => {
      try {
        const current = deps.store.snapshot(workspace).attempts?.[attempt_id];
        if (!current || current.status !== 'running') {
          clearDelegationPolling(attempt_id);
          return;
        }
        const scanned = delegation_monitor.readAttemptDelegationStreams(
          workspace,
          attempt_id,
          {
            known_sessions: [...state.sessions.values()],
            from_offsets: { ...state.offsets }
          }
        );
        for (const stream of scanned.streams) {
          if (publish_events && typeof deps.sessionLog.publish === 'function') {
            for (const entry of stream.events) {
              deps.sessionLog.publish(
                workspace,
                attempt_id,
                entry.event,
                stream.launch_id,
                entry.offset
              );
            }
          }
          state.offsets[stream.launch_id] = stream.offset;
        }
        let changed = false;
        for (const session of scanned.sessions) {
          const prior = state.sessions.get(session.launch_id);
          changed = delegationSummaryChanged(prior, session) || changed;
          state.sessions.set(session.launch_id, session);
        }
        if (changed) {
          notifyChanged(workspace);
        }
      } catch {
        log('delegation tail failed for %s: read_failed', attempt_id);
      }
    };
    poll(false);
    if (!delegation_tail_states.has(attempt_id)) {
      return;
    }
    const timer = setInterval(() => poll(true), USAGE_FANOUT_THROTTLE_MS);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    delegation_poll_timers.set(attempt_id, timer);
  }

  /**
   * @param {string} attempt_id
   */
  function clearDelegationPolling(attempt_id) {
    const timer = delegation_poll_timers.get(attempt_id);
    if (timer) {
      clearInterval(timer);
      delegation_poll_timers.delete(attempt_id);
    }
    delegation_tail_states.delete(attempt_id);
  }

  /**
   * @param {string} workspace
   */
  function gcUsageReceiptInboxes(workspace) {
    if (typeof usage_receipts.gcUsageReceiptInboxes !== 'function') {
      return;
    }
    try {
      usage_receipts.gcUsageReceiptInboxes(
        workspace,
        deps.store.snapshot(workspace).attempts
      );
    } catch (err) {
      log('receipt inbox gc failed for workspace %s: %o', workspace, err);
    }
  }

  /**
   * Re-scan terminal/history-only attempts after a restart. These attempts have
   * no live handle left to perform another terminal mutation, so a receipt that
   * landed after pause/stop would otherwise remain stranded indefinitely.
   *
   * @param {string} workspace
   * @param {Record<string, any>} attempts
   * @returns {boolean}
   */
  function recoverTerminalUsageReceipts(workspace, attempts) {
    const candidates = Object.entries(attempts || {})
      .filter(([, attempt]) => {
        const status = /** @type {any} */ (attempt)?.status;
        return status === 'paused' || TERMINAL_ATTEMPT_STATUSES.has(status);
      })
      .sort(([left], [right]) => left.localeCompare(right));
    if (candidates.length === 0) {
      receipt_recovery_cursor.delete(workspace);
      return false;
    }
    const limit = Math.min(TERMINAL_RECEIPT_RECOVERY_MAX, candidates.length);
    const start =
      (receipt_recovery_cursor.get(workspace) || 0) % candidates.length;
    let changed = false;
    for (let offset = 0; offset < limit; offset += 1) {
      const [attempt_id, attempt] =
        candidates[(start + offset) % candidates.length];
      let receipt_arrived = false;
      /** @type {import('./queue-store.js').DelegationSession[]|null} */
      let recovered_sessions = null;
      try {
        const scanned = usage_receipts.readAttemptUsageReceipts(
          workspace,
          attempt_id,
          { known_legs: /** @type {any} */ (attempt).usage_legs }
        );
        receipt_arrived = scanned.files.length > 0;
      } catch (err) {
        log('terminal receipt recovery failed for %s: %o', attempt_id, err);
      }
      try {
        const durable = delegation_monitor.normalizeDelegationSessions(
          /** @type {any} */ (attempt).delegation_sessions
        );
        const scanned = delegation_monitor.readAttemptDelegationStreams(
          workspace,
          attempt_id,
          { known_sessions: durable }
        );
        const finalized = delegation_monitor.finalizeDelegationSessions(
          [...scanned.sessions, ...durable],
          true
        );
        if (
          delegationSummaryIdentity(finalized) !==
          delegationSummaryIdentity(durable)
        ) {
          recovered_sessions = finalized;
        }
      } catch {
        log(
          'terminal delegation recovery failed for %s: read_failed',
          attempt_id
        );
      }
      if (receipt_arrived || recovered_sessions !== null) {
        const result = deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: {}
        });
        changed = changed || !!result?.ok;
      }
    }
    receipt_recovery_cursor.set(workspace, (start + limit) % candidates.length);
    return changed;
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
    const usage = deps.usage ? deps.usage.get(workspace, attempt_id) : null;
    if (deps.usage) {
      deps.usage.clearAttempt(workspace, attempt_id);
    }
    // The timer is per WORKSPACE, so it belongs to every live session in it:
    // reclaiming it while another attempt is still streaming would drop that
    // attempt's pending update. Only the last session out turns it off.
    if (running.size === 0) {
      clearUsageFanout(workspace);
    }
    clearUsageReceiptPolling(attempt_id);
    clearDelegationPolling(attempt_id);
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
   * @param {StaleWorkAdmission} [stale_work]
   */
  function recordSkipReason(workspace, bead_id, reason, stale_work) {
    const result = deps.store.recordAdmission(workspace, {
      bead_id,
      reason,
      ...(stale_work ? { stale_work } : {})
    });
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
   * request another round so the slot it was holding still goes to another bead.
   * The fence is what keeps the re-request from retrying the same bead forever.
   *
   * The request is not awaited — this runs inside the drain it would be waiting
   * on ({@link requestRescan}).
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} reason
   * @param {StaleWorkAdmission} [stale_work]
   */
  function refuseDispatch(workspace, bead_id, reason, stale_work) {
    recordSkipReason(workspace, bead_id, reason, stale_work);
    claimed.delete(bead_id);
    dispatch_refused.add(bead_id);
    requestRescan();
  }

  /**
   * Leaf attempts that can still resume the same Bead conversation. Identity is
   * checked after the worktree observation, before any automatic reclaim.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} repo
   * @returns {Attempt[]}
   */
  function resumableResidueAttempts(workspace, bead_id, repo) {
    const attempts = /** @type {Attempt[]} */ (
      Object.values(deps.store.snapshot(workspace).attempts || {})
    );
    const resumed_from = new Set(
      attempts.map((attempt) => attempt?.resumed_from).filter(Boolean)
    );
    return attempts.filter((attempt) => {
      return (
        attempt.bead_id === bead_id &&
        attempt.repo === repo &&
        isImplementationAttempt(attempt) &&
        (attempt.status === 'failed' ||
          attempt.status === 'orphaned' ||
          attempt.status === 'paused') &&
        attempt.cleanup_diagnosis !== true &&
        typeof attempt.session_id === 'string' &&
        attempt.session_id.length > 0 &&
        typeof attempt.head_oid === 'string' &&
        attempt.head_oid.length > 0 &&
        !resumed_from.has(attempt.attempt_id)
      );
    });
  }

  /**
   * @param {WorktreeObservation} observation
   * @param {string} bead_id
   * @param {Attempt[]} candidates
   * @returns {Attempt|null}
   */
  function matchingResidueAttempt(observation, bead_id, candidates) {
    const identity = observation?.identity;
    if (
      observation?.owned !== true ||
      !identity ||
      identity.branch !== bead_id ||
      typeof identity.worktree_realpath !== 'string'
    ) {
      return null;
    }
    return (
      candidates.find((attempt) => attempt.head_oid === identity.head_sha) ||
      null
    );
  }

  /**
   * Build the durable schema-1 admission from a server-only observation.
   *
   * @param {WorktreeObservation} observation
   * @param {string} bead_id
   * @param {Attempt|null} resume_attempt
   * @returns {StaleWorkAdmission}
   */
  function staleWorkAdmission(observation, bead_id, resume_attempt) {
    const owned =
      observation?.owned === true && observation?.identity?.branch === bead_id;
    const has_worktree =
      typeof observation?.identity?.worktree_realpath === 'string';
    const residue = has_worktree ? 'worktree' : 'branch';
    const state =
      owned && (observation?.state === 'unique' || resume_attempt !== null)
        ? 'unique'
        : 'unknown';
    const cause = !owned
      ? 'ownership_unknown'
      : resume_attempt
        ? 'resume_available'
        : typeof observation?.cause === 'string'
          ? observation.cause
          : typeof observation?.reason === 'string'
            ? observation.reason
            : 'observe_failed';
    const summary = {
      staged_count: Number(observation?.summary?.staged_count) || 0,
      unstaged_count: Number(observation?.summary?.unstaged_count) || 0,
      untracked_count: Number(observation?.summary?.untracked_count) || 0,
      branch_ahead: Number(observation?.summary?.branch_ahead) || 0,
      head_ahead: Number(observation?.summary?.head_ahead) || 0
    };
    const identity = observation?.identity || {
      worktree_realpath: null,
      branch: null,
      head_sha: null,
      branch_head_sha: null,
      base_oid: null,
      status_digest: null
    };
    const identity_digest = continuationDigest(identity);
    const capability = {
      can_resume:
        owned && has_worktree && state === 'unique' && resume_attempt !== null,
      can_continue: owned && has_worktree && state === 'unique',
      can_backup_fresh: owned && state === 'unique',
      can_recheck:
        owned &&
        (state === 'unknown' || (residue === 'branch' && state === 'unique'))
    };
    const action_id = continuationDigest({
      identity_digest,
      cause,
      capability
    });
    return {
      schema: 1,
      residue,
      state,
      cause,
      summary,
      identity_digest,
      action_id,
      ...capability,
      identity
    };
  }

  /**
   * @param {StaleWorkIdentity} expected
   * @param {StaleWorkIdentity} observed
   */
  function sameStaleIdentity(expected, observed) {
    return [
      'worktree_realpath',
      'branch',
      'head_sha',
      'branch_head_sha',
      'base_oid',
      'status_digest'
    ].every(
      (key) =>
        (expected[/** @type {keyof StaleWorkIdentity} */ (key)] ?? null) ===
        (observed[/** @type {keyof StaleWorkIdentity} */ (key)] ?? null)
    );
  }

  /**
   * Preserve an actionable stale-work card when dispatch cannot produce a
   * fresh observation. Only recheck stays open on this synthetic unknown
   * observation; no cleanup or attempt mutation follows from it.
   *
   * @param {StaleWorkAdmission} stale_work
   * @param {string} cut_base
   * @param {string} cause
   * @returns {WorktreeObservation}
   */
  function unknownStaleWorkObservation(stale_work, cut_base, cause) {
    const expected = stale_work.identity;
    return {
      ok: false,
      state: 'unknown',
      removed: false,
      reason: cause,
      cause,
      owned: true,
      identity: {
        worktree_realpath: expected.worktree_realpath,
        branch: expected.branch,
        head_sha: expected.head_sha,
        branch_head_sha: expected.branch_head_sha,
        base_oid: cut_base,
        status_digest:
          expected.status_digest || continuationDigest({ expected, cut_base })
      },
      summary: stale_work.summary
    };
  }

  /**
   * Fail closed without degrading the durable admission to a raw badge.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {StaleWorkAdmission} stale_work
   * @param {string} cut_base
   * @param {WorktreeObservation|null} observation
   * @param {string} cause
   */
  function refuseStaleWorkDispatch(
    workspace,
    attempt_id,
    bead_id,
    stale_work,
    cut_base,
    observation,
    cause
  ) {
    const actionable = observation?.identity
      ? observation
      : unknownStaleWorkObservation(stale_work, cut_base, cause);
    removeGuardHook(workspace, attempt_id);
    refuseDispatch(
      workspace,
      bead_id,
      'worktree_stale_work',
      staleWorkAdmission(actionable, bead_id, null)
    );
  }

  /**
   * @param {string} workspace
   * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
   * @param {'continue'|'can_recheck'} capability
   */
  function staleWorkAction(workspace, input, capability) {
    const queue = deps.store.snapshot(workspace);
    if (queue.revision !== input.expected_revision) {
      return { ok: false, reason: 'revision_conflict', conflict: true };
    }
    const admission = queue.admission?.[input.bead_id];
    const stale_work = admission?.stale_work;
    const waiting =
      queue.queue.some(
        (/** @type {{ bead_id: string }} */ entry) =>
          entry.bead_id === input.bead_id
      ) ||
      queue.serial_lanes.some(
        (/** @type {{ entries: Array<{ bead_id: string }> }} */ lane) =>
          lane.entries.some((entry) => entry.bead_id === input.bead_id)
      );
    if (
      admission?.reason !== 'worktree_stale_work' ||
      !stale_work ||
      stale_work.action_id !== input.action_id ||
      (capability === 'continue'
        ? stale_work.can_resume !== true && stale_work.can_continue !== true
        : stale_work.can_recheck !== true) ||
      !waiting
    ) {
      return { ok: false, reason: 'stale_work_conflict', conflict: true };
    }
    if (discardActive(queue, { bead_id: input.bead_id })) {
      return { ok: false, reason: 'discard_in_progress', conflict: true };
    }
    if (staleWorkActionInFlight(workspace, input.bead_id)) {
      return { ok: false, reason: 'action_in_flight', conflict: true };
    }
    return { ok: true, queue, stale_work };
  }

  /**
   * Recheck externally owned PR/branch authority before a stale-work mutation.
   * Missing git wiring is tolerated only by hermetic schedulers; live wiring
   * always supplies it through attach.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {string} repo
   * @param {StaleWorkIdentity} identity
   */
  async function staleWorkOwnerReason(workspace, bead_id, repo, identity) {
    if (deps.externalPrs?.get(workspace, bead_id)) {
      return 'external_pr_owner';
    }
    if (
      typeof deps.gitRun !== 'function' ||
      typeof identity.branch !== 'string' ||
      identity.branch.length === 0
    ) {
      return null;
    }
    const remote = await deps.gitRun(
      ['ls-remote', '--heads', 'origin', identity.branch],
      { cwd: repo }
    );
    if (remote.code !== 0) {
      return 'remote_ref_observe_failed';
    }
    return remote.stdout.trim().length > 0 ? 'remote_branch_owner' : null;
  }

  /**
   * Read the repo's `bd kv` account default layer, once per launch decision.
   *
   * Deliberately UNCACHED (§5.1): a stale cache would decide which account's
   * tokens a launch spends, which is worth far more than one `bd kv get`.
   *
   * @param {string} workspace
   * @returns {Promise<import('../workspace-accounts.js').WorkspaceAccountsLayer>}
   */
  async function readWorkspaceAccountsLayer(workspace) {
    if (typeof deps.kvGet !== 'function') {
      return { state: 'absent', values: {}, warnings: [] };
    }
    try {
      return normalizeWorkspaceAccounts(
        await deps.kvGet(workspace, WORKSPACE_ACCOUNTS_KV_KEY)
      );
    } catch {
      return { state: 'unusable', values: {}, warnings: ['kv_read_failed'] };
    }
  }

  /**
   * Resolve the effective values through the coordinator's one immutable
   * dispatch snapshot. A missing coordinator is a fail-closed wiring error;
   * the scheduler must never reconstruct defaults from the queue itself.
   *
   * The EFFECTIVE accounts are settled here rather than at launch (§5.1), so
   * the continuation decision token's existing `accounts` digest already covers
   * a repo default that moved after the user chose a continuation.
   *
   * @param {string} workspace
   * @param {BeadSnapshot} bead_snapshot
   * @param {import('../workspace-accounts.js').WorkspaceAccountsLayer} [workspace_accounts]
   * @returns {{ ok: true, preset_id: string|null, preset_revision: number|null, settings: Readonly<Record<string, string>>, exec: any, accounts: { claude: string|null, codex: string|null }, account_sources: AccountSources }|{ ok: false, reason: string }}
   */
  function resolveDispatchSettings(
    workspace,
    bead_snapshot,
    workspace_accounts
  ) {
    if (
      !deps.execPresetCoordinator ||
      typeof deps.execPresetCoordinator.resolveForDispatch !== 'function'
    ) {
      return {
        ok: false,
        reason: 'default_exec_preset_resolution_unavailable'
      };
    }
    const layer = workspace_accounts ?? {
      state: /** @type {const} */ ('absent'),
      values: {},
      warnings: []
    };
    // Knowing a repo default EXISTS without knowing what it says is worse than
    // having none: degrading it to "no default" silently spends whichever
    // account happens to be logged in (§5.2).
    if (layer.state === 'unusable') {
      return { ok: false, reason: 'workspace_accounts_unavailable' };
    }
    try {
      const resolved = deps.execPresetCoordinator.resolveForDispatch(
        workspace,
        bead_snapshot
      );
      if (!resolved.ok) {
        return resolved;
      }
      const claude = effectiveAccount(
        bead_snapshot.claude_account,
        layer.values.claude_account
      );
      const codex = effectiveAccount(
        bead_snapshot.codex_account,
        layer.values.codex_account
      );
      return {
        ...resolved,
        accounts: { claude: claude.value, codex: codex.value },
        account_sources: { claude: claude.source, codex: codex.source }
      };
    } catch {
      return { ok: false, reason: 'default_exec_preset_resolution_failed' };
    }
  }

  /**
   * Prepare launch-only account settings for the ALREADY SETTLED effective
   * accounts. This reads no kv: the issue-pin/repo-default precedence is
   * decided in {@link resolveDispatchSettings} (§5.1), so this step only
   * resolves the catalog, the `cswap` path, and the `CODEX_HOME` mirror.
   *
   * A failure names the `provider` it belongs to so the refusal detail can say
   * whether the issue or the repo settings need fixing (§5.2).
   *
   * @param {{ claude: string|null, codex: string|null }} accounts
   * @param {string} runner_name
   */
  async function resolveLaunchAccounts(accounts, runner_name) {
    /** @type {{ claude_account: string|null, codex_account: string|null, cswap_path?: string, env?: Record<string, string> }} */
    const applied = { claude_account: null, codex_account: null };
    if (accounts.claude !== null && runner_name === 'claude') {
      if (!deps.accountCatalog) {
        return {
          ok: false,
          reason: 'claude_account_list_unavailable',
          provider: 'claude'
        };
      }
      let claude;
      try {
        claude = await deps.accountCatalog.resolveClaude(accounts.claude);
      } catch {
        return {
          ok: false,
          reason: 'claude_account_list_unavailable',
          provider: 'claude'
        };
      }
      if (!claude.ok) {
        return { ...claude, provider: 'claude' };
      }
      const cswap_path = (deps.resolveCswapPath || defaultResolveCswapPath)();
      if (!cswap_path) {
        return { ok: false, reason: 'cswap_unavailable', provider: 'claude' };
      }
      applied.claude_account = accounts.claude;
      applied.cswap_path = cswap_path;
    }

    if (accounts.codex !== null) {
      if (!deps.accountCatalog) {
        return {
          ok: false,
          reason: 'codex_account_list_unavailable',
          provider: 'codex'
        };
      }
      let codex;
      try {
        codex = await deps.accountCatalog.resolveCodex(accounts.codex);
      } catch {
        return {
          ok: false,
          reason: 'codex_account_list_unavailable',
          provider: 'codex'
        };
      }
      if (!codex.ok) {
        return { ...codex, provider: 'codex' };
      }
      const home_dir = deps.homeDir || os.homedir();
      const process_codex_root = process.env.CODEX_HOME;
      const codex_root =
        deps.codexRoot ||
        (typeof process_codex_root === 'string' && process_codex_root.length > 0
          ? process_codex_root
          : path.join(home_dir, '.codex'));
      const encoded_key = Buffer.from(accounts.codex, 'utf8').toString(
        'base64url'
      );
      const auth_file = path.join(
        codex_root,
        'accounts',
        `${encoded_key}.auth.json`
      );
      const account_home_dir = (
        deps.codexAccountHomeDir || defaultCodexAccountHomeDir
      )(accounts.codex);
      const prepared = await (
        deps.prepareCodexAccountHome || defaultPrepareCodexAccountHome
      )({
        key: accounts.codex,
        auth_file,
        codex_root,
        home_dir: account_home_dir
      });
      if (!prepared.ok) {
        log(
          'codex account HOME preparation failed: %s (%s)',
          prepared.detail,
          account_home_dir
        );
        // §4.3 requires the failing path to be visible: the seven launch
        // reasons are a closed vocabulary, so the operator-actionable detail
        // rides alongside it rather than widening that vocabulary.
        return { ...prepared, home_dir: account_home_dir, provider: 'codex' };
      }
      applied.codex_account = accounts.codex;
      applied.env = { CODEX_HOME: prepared.home_dir };
    }
    return { ok: true, ...applied };
  }

  /**
   * Build the durable effective-value provenance independently from the subset
   * of keys this worker writes into metadata. Unset optional keys are recorded
   * as null so every fresh snapshot still has the complete 12-key shape.
   *
   * @param {any} exec
   * @returns {Record<string, string|null>}
   */
  function execValuesFor(exec) {
    /** @type {Record<string, string|null>} */
    const values = {};
    for (const key of EXEC_SETTING_KEYS) {
      values[key] = typeof exec[key] === 'string' ? exec[key] : null;
    }
    return values;
  }

  /**
   * Capture the exact metadata values an attempt temporarily overlays. A null
   * value means the key was absent and must be unset during cleanup.
   *
   * @param {string} bead_id
   * @param {string[]} keys
   * @returns {Promise<{ ok: true, values: Record<string, string|null> }|{ ok: false }>}
   */
  async function captureExecRestoreValues(bead_id, keys) {
    /** @type {Record<string, string|null>} */
    const values = {};
    for (const key of keys) {
      try {
        const value = await deps.bd.readMetadata(bead_id, key);
        values[key] = typeof value === 'string' ? value : null;
      } catch {
        // An unreadable value is not evidence of absence. Continuing would
        // later unset user metadata during cleanup, so the caller must refuse
        // before prerecording, stamping, or spawning.
        return { ok: false };
      }
    }
    return { ok: true, values };
  }

  /**
   * Snapshot the five receipt-authority keys immediately before this attempt's
   * first metadata write (UI-bu6d §2). That snapshot is the ONLY thing that
   * later makes "this key appeared" or "this key changed" a sayable claim.
   *
   * Unlike {@link captureExecRestoreValues} a failed read does NOT refuse the
   * dispatch: nothing is restored from this snapshot, so its absence costs an
   * observation, not user metadata. The baseline-dependent checks simply do not
   * run for that attempt.
   *
   * @param {string} bead_id
   * @returns {Promise<Record<string, string|null>|null>}
   */
  async function captureReceiptBaseline(bead_id) {
    /** @type {Record<string, string|null>} */
    const values = {};
    for (const key of RECEIPT_BASELINE_KEYS) {
      try {
        const value = await deps.bd.readMetadata(bead_id, key);
        values[key] = typeof value === 'string' ? value : null;
      } catch (err) {
        log('receipt baseline read failed for %s %s: %o', bead_id, key, err);
        return null;
      }
    }
    return values;
  }

  /**
   * Read the whole metadata surface the receipt check judges. One unreadable
   * key makes the whole observation a probe error rather than a clean pass —
   * absence and unreadability must never look alike here.
   *
   * @param {string} bead_id
   * @returns {Promise<Record<string, unknown>|null>}
   */
  async function readReceiptMetadata(bead_id) {
    /** @type {Record<string, unknown>} */
    const metadata = {};
    for (const key of RECEIPT_METADATA_KEYS) {
      try {
        const value = await deps.bd.readMetadata(bead_id, key);
        if (typeof value === 'string') {
          metadata[key] = value;
        }
      } catch (err) {
        log('receipt metadata read failed for %s %s: %o', bead_id, key, err);
        return null;
      }
    }
    return metadata;
  }

  /**
   * Stamp the unattended dispatch's `workflow_mode` AND the authority that owns
   * it, then confirm both by readback (UI-bu6d §5, contract L102). Writing
   * `fast_track` without naming the Worker as its source leaves a mode whose
   * author cannot be told from a user's.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, workflow_mode: string|null, workflow_mode_source: string|null }>}
   */
  async function stampWorkerWorkflowMode(bead_id) {
    await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
    await deps.bd.setMetadata(bead_id, 'workflow_mode_source', 'worker');
    const workflow_mode = await deps.bd.readMetadata(bead_id, 'workflow_mode');
    const workflow_mode_source = await deps.bd.readMetadata(
      bead_id,
      'workflow_mode_source'
    );
    return {
      ok: workflow_mode === 'fast_track' && workflow_mode_source === 'worker',
      workflow_mode,
      workflow_mode_source
    };
  }

  /**
   * Observe this attempt's receipt against the state that must back it, and
   * record the result on the attempt (UI-bu6d §3).
   *
   * RECORDING ONLY. A violation is a bookkeeping defect, not a bad artifact, so
   * it never calls {@link failAttempt} and never halts auto_advance; the single
   * fail-closed consequence lives in the merge gate, which re-observes current
   * metadata rather than reading this record back.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   */
  async function recordReceiptCheck(workspace, attempt_id, bead_id) {
    const attempt =
      deps.store.snapshot(workspace).attempts?.[attempt_id] ?? null;
    /** @type {import('./receipt-check.js').ReceiptCheckResult} */
    let result;
    const metadata = await readReceiptMetadata(bead_id);
    if (!metadata) {
      result = receiptProbeError('metadata_unreadable');
    } else {
      try {
        result = await checkReceipts({
          metadata,
          baseline: attempt?.receipt_baseline ?? null,
          lineage: receiptLineageForAttempt(attempt),
          defaults: receiptDefaultsFrom(loadExecutionDefaults()),
          // No head is passed on purpose. `head_oid` is the branch SHA read
          // BEFORE the session ran, not the head it delivered, so binding a
          // `verify_receipt` to it would assert a relationship nobody observed.
          // The gate does that binding against the PR head it just fetched.
          head: null
        });
      } catch (err) {
        log('receipt check threw for %s: %o', attempt_id, err);
        result = receiptProbeError('check_threw');
      }
    }
    if (!result.ok) {
      log(
        'receipt check unbacked for %s: probe_error=%o violations=%o',
        bead_id,
        result.probe_error,
        result.violations
      );
    }
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { receipt_check: { ...result, checked_at: now() } }
    });
  }

  /**
   * Restore a finished attempt's temporary overlay before resolving settings
   * for a substitute launch. Unlike terminal best-effort cleanup, this path
   * requires exact readback because the next resolver will treat the restored
   * values as user-owned input.
   *
   * @param {string} bead_id
   * @param {string|null} workflow_mode_prior
   * @param {string[]|null|undefined} keys
   * @param {Record<string, string|null>|null} restore_values
   * @param {string|null} [workflow_mode_source_prior]
   */
  async function restoreAttemptOverlayForRelaunch(
    bead_id,
    workflow_mode_prior,
    keys,
    restore_values,
    workflow_mode_source_prior = null
  ) {
    try {
      await revertWorkflowMode(
        bead_id,
        workflow_mode_prior,
        workflow_mode_source_prior
      );
      const workflow_readback = await deps.bd.readMetadata(
        bead_id,
        'workflow_mode'
      );
      if (
        (typeof workflow_mode_prior === 'string' &&
          workflow_readback !== workflow_mode_prior) ||
        (workflow_mode_prior === null && typeof workflow_readback === 'string')
      ) {
        return false;
      }
      const source_readback = await deps.bd.readMetadata(
        bead_id,
        'workflow_mode_source'
      );
      if (
        (typeof workflow_mode_source_prior === 'string' &&
          source_readback !== workflow_mode_source_prior) ||
        (workflow_mode_source_prior === null &&
          typeof source_readback === 'string')
      ) {
        return false;
      }
      for (const key of Array.isArray(keys) ? keys : []) {
        const prior = restore_values?.[key] ?? null;
        if (typeof prior === 'string') {
          await deps.bd.setMetadata(bead_id, key, prior);
        } else {
          await deps.bd.unsetMetadata(bead_id, key);
        }
        const readback = await deps.bd.readMetadata(bead_id, key);
        if (
          (typeof prior === 'string' && readback !== prior) ||
          (prior === null && typeof readback === 'string')
        ) {
          return false;
        }
      }
    } catch (err) {
      log(
        'attempt overlay restore failed before relaunch for %s: %o',
        bead_id,
        err
      );
      return false;
    }
    return true;
  }

  /**
   * Persist a complete attempt before its first metadata write. A failed CAS or
   * persistence write means the launch has no durable cleanup/provenance record
   * and must stop before it can stamp or spawn.
   *
   * @param {string} workspace
   * @param {any} attempt
   * @param {number} [expected_revision]
   */
  function prerecordAttempt(workspace, attempt, expected_revision) {
    try {
      return (
        deps.store.appendAttempt(workspace, {
          expected_revision:
            expected_revision ?? deps.store.snapshot(workspace).revision,
          attempt
        }).ok === true
      );
    } catch {
      return false;
    }
  }

  /**
   * Persist the attempt and its merge-queue ownership in one revision.
   *
   * @param {string} workspace
   * @param {any} attempt
   * @param {{ queue_bead_id: string, wait_ms: number, manual_authority?: boolean }} resolution_wait
   * @param {number} [expected_revision]
   */
  function prerecordResolutionAttempt(
    workspace,
    attempt,
    resolution_wait,
    expected_revision
  ) {
    if (typeof deps.store.appendResolutionAttempt !== 'function') {
      return false;
    }
    try {
      return (
        deps.store.appendResolutionAttempt(workspace, {
          expected_revision:
            expected_revision ?? deps.store.snapshot(workspace).revision,
          queue_bead_id: resolution_wait.queue_bead_id,
          subject_bead_id: attempt.bead_id,
          wait_ms: resolution_wait.wait_ms,
          attempt
        }).ok === true
      );
    } catch {
      return false;
    }
  }

  /**
   * Persist a relaunch child. An explicit generic resume of a completion-owned
   * ancestor uses the store's atomic ownership transfer; other relaunch kinds
   * keep their existing ordinary append semantics.
   *
   * @param {string} workspace
   * @param {any} prior
   * @param {any} attempt
   * @param {boolean} completion_resume
   * @param {{ queue_bead_id: string, wait_ms: number, manual_authority?: boolean }|null} resolution_wait
   * @param {number} [expected_revision]
   */
  function prerecordRelaunchAttempt(
    workspace,
    prior,
    attempt,
    completion_resume,
    resolution_wait = null,
    expected_revision
  ) {
    if (resolution_wait) {
      return prerecordResolutionAttempt(
        workspace,
        attempt,
        resolution_wait,
        expected_revision
      );
    }
    if (!completion_resume) {
      return prerecordAttempt(workspace, attempt, expected_revision);
    }
    const completion_owned =
      prior.completion_root_id != null ||
      prior.completion_op_id != null ||
      prior.completion_mode != null ||
      prior.completion_failure_key != null;
    if (!completion_owned) {
      return prerecordAttempt(workspace, attempt, expected_revision);
    }
    if (typeof deps.store.appendResumedCompletionAttempt !== 'function') {
      return false;
    }
    try {
      return (
        deps.store.appendResumedCompletionAttempt(workspace, {
          expected_revision:
            expected_revision ?? deps.store.snapshot(workspace).revision,
          source_attempt_id: prior.attempt_id,
          attempt
        }).ok === true
      );
    } catch {
      return false;
    }
  }

  /**
   * Install this attempt's pre-push hook (UI-8mvc §2). Called BEFORE the launch
   * path's first state change — no worktree, no attempt record, no metadata
   * stamp — so a failure is a plain refusal with nothing to unwind.
   *
   * Reports rather than throws for the same reason the module does: the answer
   * to a failed install is a visible refusal, and a throw out of the dispatch
   * would abort with nothing on screen.
   *
   * @param {{ workspace: string, attempt_id: string, repo: string, target_base: string }} input
   * @returns {boolean} Whether the hook is in place.
   */
  function installGuardHook(input) {
    /** @type {{ ok: boolean, reason?: string }} */
    let result;
    try {
      result = guardHook.install(input);
    } catch (err) {
      log('guard hook install threw for %s: %o', input.attempt_id, err);
      result = { ok: false, reason: 'threw' };
    }
    if (!result.ok) {
      log(
        'guard hook install failed for %s: %s',
        input.attempt_id,
        result.reason || 'unknown'
      );
      return false;
    }
    return true;
  }

  /**
   * The tip of an attempt's own branch, or null when it cannot be read
   * (UI-1xcd §4.2).
   *
   * Null is the honest answer, never a substitute value: this is diagnostic
   * data, and a `base_oid` stand-in is what made the old field look like a
   * measurement when it was a copy.
   *
   * @param {string} repo
   * @param {string} bead_id
   * @returns {Promise<string|null>}
   */
  async function branchTip(repo, bead_id) {
    if (typeof deps.gitRun !== 'function' || !repo || !bead_id) {
      return null;
    }
    try {
      const r = await deps.gitRun(['rev-parse', `refs/heads/${bead_id}`], {
        cwd: repo
      });
      if (r.code !== 0) {
        return null;
      }
      const oid = String(r.stdout || '').trim();
      return /^[0-9a-f]{40,64}$/i.test(oid) ? oid : null;
    } catch (err) {
      log('branch tip read failed for %s in %s: %o', bead_id, repo, err);
      return null;
    }
  }

  /**
   * Append one surviving guard verdict to the attempt record (UI-1xcd §1).
   *
   * Read-modify-write off the store, so the accumulation is the same one the
   * restart monitor performs and a cold reload sees every warning in order.
   * Never throws: an unpersisted diagnostic must not end a session that broke
   * no invariant.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {{ reason: string, command: string|null }} detail
   */
  function recordGuardWarning(workspace, attempt_id, detail) {
    try {
      const attempt = deps.store.snapshot(workspace).attempts[attempt_id];
      const prior = Array.isArray(attempt?.guard_warnings)
        ? attempt.guard_warnings
        : [];
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          guard_warnings: [
            ...prior,
            {
              reason: detail.reason,
              command: detail.command ?? null,
              at: now()
            }
          ]
        }
      });
    } catch (err) {
      log('guard-warning record failed for %s: %o', attempt_id, err);
    }
  }

  /**
   * Drop an attempt's hook assets. Idempotent and never throwing, so every
   * early return between the install and the spawn — and every termination
   * path — can call it unconditionally, including for the disposition attempts
   * that never had one (spec §5, 완료조건 #17: the requirement is zero residue,
   * not a badge).
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  function removeGuardHook(workspace, attempt_id) {
    try {
      guardHook.remove({ workspace, attempt_id });
    } catch (err) {
      log('guard hook remove threw for %s: %o', attempt_id, err);
    }
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
   * @param {{ attempts?: Record<string, any>, discard_operations?: Record<string, any> }} q - Queue snapshot.
   * @returns {Set<string>}
   */
  function activeBeadIdsFrom(q) {
    /** @type {Set<string>} */
    const out = new Set(claimed);
    for (const operation of Object.values(q.discard_operations || {})) {
      const discard = /** @type {any} */ (operation);
      if (discard.phase !== 'done' && typeof discard.bead_id === 'string') {
        out.add(discard.bead_id);
      }
    }
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
   * Whether one durable discard operation currently owns a Bead or attempt.
   *
   * @param {{ discard_operations?: Record<string, any> }} q
   * @param {{ bead_id?: string|null, attempt_id?: string|null }} identity
   */
  function discardActive(q, identity) {
    return Object.values(q.discard_operations || {}).some((operation) => {
      const discard = /** @type {any} */ (operation);
      return (
        discard.phase !== 'done' &&
        ((typeof identity.bead_id === 'string' &&
          discard.bead_id === identity.bead_id) ||
          (typeof identity.attempt_id === 'string' &&
            discard.attempt_id === identity.attempt_id))
      );
    });
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
   * Fence stale-work actions only on work that can still mutate this Bead.
   * A dispatch refusal deliberately stays actionable until an external tick
   * clears it, so it is not part of this narrower union.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {boolean}
   */
  function staleWorkActionInFlight(workspace, bead_id) {
    const queue = deps.store.snapshot(workspace);
    if (claimed.has(bead_id) || cleanup_pending.has(bead_id)) {
      return true;
    }
    if (discardActive(queue, { bead_id })) {
      return true;
    }
    const attempts = Object.values(queue.attempts || {});
    const resumed_from = new Set(
      attempts
        .map((attempt) => attempt?.resumed_from)
        .filter((attempt_id) => typeof attempt_id === 'string')
    );
    return attempts.some((attempt) => {
      if (
        !attempt ||
        attempt.bead_id !== bead_id ||
        TERMINAL_ATTEMPT_STATUSES.has(attempt.status)
      ) {
        return false;
      }
      return !(
        attempt.status === 'paused' && resumed_from.has(attempt.attempt_id)
      );
    });
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
   * @returns {Promise<{ ok: boolean, reason?: string, stale?: { receipt_sha?: string, delta_shas?: string[], changed_paths?: string[], plan?: { receipt_sha: string, delta_shas: string[], changed_paths: string[] } } }>}
   */
  async function checkAdmission(snap, base) {
    if (isWorkerIneligible(snap.labels)) {
      return { ok: false, reason: 'worker_ineligible' };
    }
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
   * The workspace's effective concurrency cap, read from the store on every
   * pass; an unusable value falls back to the same default `normalizeQueue`
   * applies.
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
   * Revert the `workflow_mode` PAIR to its pre-launch values — the mode and the
   * authority that owns it, unset when originally absent (UI-bu6d §5). They are
   * stamped in one write and must come back in one: a `workflow_mode_source`
   * left behind on a reverted mode names an author for a value nobody wrote.
   *
   * @param {string} bead_id
   * @param {string|null} prior
   * @param {string|null} [source_prior]
   */
  async function revertWorkflowMode(bead_id, prior, source_prior = null) {
    if (prior == null) {
      await deps.bd.unsetMetadata(bead_id, 'workflow_mode');
    } else {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', prior);
    }
    if (source_prior == null) {
      await deps.bd.unsetMetadata(bead_id, 'workflow_mode_source');
    } else {
      await deps.bd.setMetadata(bead_id, 'workflow_mode_source', source_prior);
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
   * @param {Record<string, string|null>|null} [restore_values]
   */
  async function revertExecStamps(bead_id, keys, restore_values = null) {
    if (!Array.isArray(keys)) {
      return;
    }
    for (const key of keys) {
      try {
        const prior = restore_values?.[key];
        if (typeof prior === 'string') {
          await deps.bd.setMetadata(bead_id, key, prior);
        } else {
          await deps.bd.unsetMetadata(bead_id, key);
        }
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
   * The `workflow_mode_source` value this attempt overlaid, read off its
   * durable record so the revert restores the exact prior even after a restart.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string|null}
   */
  function workflowModeSourcePriorOf(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts?.[attempt_id];
    return a && typeof a.workflow_mode_source_prior === 'string'
      ? a.workflow_mode_source_prior
      : null;
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
   * @param {string} workspace - Workspace path.
   * @param {string} attempt_id - Attempt identifier.
   */
  function execRestoreValuesOf(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts[attempt_id];
    return a &&
      a.exec_restore_values &&
      typeof a.exec_restore_values === 'object'
      ? a.exec_restore_values
      : null;
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
   * Synchronously judges a launch against the lane fences (UI-04vo §2).
   * `excluded_token` is the lease being revalidated during queue dispatch, so
   * it does not fence itself while it remains continuously held. Fail-visible
   * by contract: every reason surfaces through the admission badge.
   *
   * @param {string} workspace
   * @param {LaneLaunchInput} input
   * @param {string|null} [excluded_token]
   * @returns {string|null}
   */
  function laneLaunchRefusal(workspace, input, excluded_token = null) {
    const coordinator = serialCoordinator(workspace);
    const q = deps.store.snapshot(workspace);
    const launch_values = [...coordinator.launches.entries()]
      .filter(([token]) => token !== excluded_token)
      .map(([, launch]) => launch);
    if (launch_values.some((item) => item.bead_id === input.bead_id)) {
      return 'bead_running';
    }
    const lane_id = input.serial_lane_id;
    if (lane_id === null) {
      return null;
    }
    if (serialLaneIndexOf(lane_id) === null) {
      return 'serial_lane_invalid';
    }
    const occupied_by_other =
      laneOccupiedByOther(activeLaneLineages(q), lane_id, input.lineage_id) ||
      launch_values.some(
        (item) =>
          item.serial_lane_id === lane_id &&
          item.lineage_id !== input.lineage_id
      );
    if (occupied_by_other) {
      return 'serial_lane_occupied';
    }
    if (input.continuation !== true) {
      // A fresh dispatch may only take a lane through its head — non-head
      // entries wait for the exclusive chain in front of them.
      const index = /** @type {number} */ (serialLaneIndexOf(lane_id));
      const entries = q.serial_lanes?.[index]?.entries || [];
      if (entries.length === 0 || entries[0].bead_id !== input.bead_id) {
        return 'serial_lane_not_head';
      }
    }
    return null;
  }

  /**
   * Synchronous inspect/acquire half of the launch protocol
   * (acquire → revalidate → handoff). No await may be inserted here: callers
   * invoke it before their first worktree, metadata, or attempt side effect.
   *
   * @param {string} workspace
   * @param {LaneLaunchInput} input
   * @returns {{ ok: true, lease: LaneLaunchLease }|{ ok: false, reason: string }}
   */
  function acquireLaneLaunch(workspace, input) {
    const coordinator = serialCoordinator(workspace);
    const refusal = laneLaunchRefusal(workspace, input);
    if (refusal) {
      return { ok: false, reason: refusal };
    }
    const token = `${input.bead_id}:${Date.now()}:${coordinator.launches.size}`;
    coordinator.launches.set(token, {
      bead_id: input.bead_id,
      lineage_id: input.lineage_id,
      serial_lane_id: input.serial_lane_id
    });
    let held = true;
    /** Release the pre-record reservation exactly once. */
    function release() {
      if (!held) {
        return;
      }
      held = false;
      coordinator.launches.delete(token);
    }
    /**
     * @param {LaneLaunchInput} next_input
     * @returns {{ ok: true, lease: LaneLaunchLease }|{ ok: false, reason: string }}
     */
    function revalidate(next_input) {
      if (!held) {
        return { ok: false, reason: 'bead_running' };
      }
      const next_refusal = laneLaunchRefusal(workspace, next_input, token);
      if (next_refusal) {
        return { ok: false, reason: next_refusal };
      }
      const launch = coordinator.launches.get(token);
      if (!launch) {
        return { ok: false, reason: 'bead_running' };
      }
      launch.bead_id = next_input.bead_id;
      launch.lineage_id = next_input.lineage_id;
      launch.serial_lane_id = next_input.serial_lane_id;
      return { ok: true, lease };
    }
    const lease = { release, handoff: release, revalidate };
    return { ok: true, lease };
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
   * @param {{ moot?: boolean }} [options]
   */
  async function failAttempt(
    workspace,
    attempt_id,
    bead_id,
    prior,
    cause,
    cause_detail,
    options = {}
  ) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'failed',
        cause,
        finished_at: now(),
        cause_detail: cause_detail ?? null,
        ...(options.moot === true ? { dismissed_at: now() } : {})
      }
    });
    notifyLifecycle('attemptFailed', {
      bead_id,
      cause,
      repo: repoOfAttempt(workspace, attempt_id),
      cause_detail: cause_detail ?? null
    });
    try {
      await revertWorkflowMode(
        bead_id,
        prior,
        workflowModeSourcePriorOf(workspace, attempt_id)
      );
    } catch (err) {
      // Best-effort on the failure path: the halt below already stops the queue,
      // so a bd-down revert failure must not escape onSessionDone.
      log('workflow_mode revert failed for %s: %o', bead_id, err);
    }
    // Revert any exec-setting stamps this attempt wrote (best-effort).
    await revertExecStamps(
      bead_id,
      execStampedKeysOf(workspace, attempt_id),
      execRestoreValuesOf(workspace, attempt_id)
    );
    if (options.moot !== true) {
      deps.store.haltAutoAdvanceForAttempt(workspace, { attempt_id });
    }
    // STRICTLY after the halt: reopening the bead makes it dispatchable again,
    // so a tick raised by a sibling attempt finishing concurrently must already
    // see auto_advance OFF or it would relaunch the attempt that just failed.
    await releaseBeadClaim(bead_id);
  }

  /**
   * The common SETTLEMENT step of every termination (UI-8mvc §3): observe the
   * remote base against the `base_oid` this attempt pinned and persist what was
   * seen. Runs after the process is gone and BEFORE any branch cleanup, on all
   * three paths — normal completion, a user ⏸/■, and the restart-side dead
   * attempt disposal — because a session can push on any of them.
   *
   * Never throws and never fails an attempt by itself: the caller decides what
   * a violation does, and everything else (an exclusion, an observation
   * failure, an attempt outside the invariant's scope) is a record only.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<boolean>} Whether an UNEXCLUDED landing was detected.
   */
  async function settleBaseDrift(workspace, attempt_id) {
    const attempt = deps.store.snapshot(workspace).attempts[attempt_id];
    if (!attempt) {
      return false;
    }
    /** @type {import('./base-drift.js').BaseDriftVerdict} */
    let verdict;
    try {
      verdict = await observeBaseDrift({
        attempt,
        resolveBase: deps.resolveBase,
        git: deps.gitRun,
        // The attempt's own pre-push record (UI-1xcd §4.1). Read lazily so an
        // excluded attempt never touches the filesystem, and read HERE because
        // the observer has no workspace of its own.
        readPushLog: () =>
          typeof guardHook.readPushLog === 'function'
            ? guardHook.readPushLog({ workspace, attempt_id })
            : { ok: false, reason: 'absent' }
      });
    } catch (err) {
      // The observer is internally fail-open; a throw is a defect, and letting
      // it escape would abort a termination path over EVIDENCE collection.
      log('base drift observation threw for %s: %o', attempt_id, err);
      return false;
    }
    if (verdict.record) {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { base_drift: verdict.record }
      });
    }
    return verdict.violation === true;
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
  /**
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
        const result = deps.store.updateAttempt(workspace, {
          attempt_id,
          patch
        });
        if (result?.ok) {
          notifyChanged(workspace);
        }
        // The ⏸/■ path returns here, so the settlement step has to run on this
        // side of the return (UI-8mvc §3): a session halted mid-flight may
        // already have pushed, and a stop is not evidence that it did not.
        if (await settleBaseDrift(workspace, attempt_id)) {
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            prior,
            'base_landing_detected',
            { reason: 'base_landing_detected', command: null }
          );
          notifyChanged(workspace);
        }
        return;
      }

      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { exit: verdict.exit, ...usagePatch(workspace, attempt_id) }
      });

      // The settlement step, ahead of EVERY completion branch (UI-8mvc §3).
      // Above the disposition split on purpose: that branch returns, so a call
      // placed after it could not even record why a disposition was excluded.
      // Independent of `verdict.success` for the same reason — a session that
      // died on a blocker may still have pushed first, and in that case the
      // landing is the honest cause.
      if (await settleBaseDrift(workspace, attempt_id)) {
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          'base_landing_detected',
          { reason: 'base_landing_detected', command: null }
        );
        notifyChanged(workspace);
        await tick(workspace);
        return;
      }

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
        let moot = false;
        const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
        if (
          !verdict.blocked &&
          typeof attempt?.repair_operation_id === 'string' &&
          deps.repairSession &&
          typeof deps.repairSession.judge === 'function'
        ) {
          try {
            const judged = await deps.repairSession.judge({
              workspace,
              operation_id: attempt.repair_operation_id
            });
            moot = judged.verdict === 'chain_closed';
          } catch (err) {
            log('repair target judgment failed for %s: %o', attempt_id, err);
          }
        }
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
            : undefined,
          { moot }
        );
        notifyChanged(workspace);
        await tick(workspace);
        return;
      }

      // The receipt observation, ahead of EVERY success branch (UI-bu6d §3).
      // Both the external-PR resolution below and the quick-fix landing after
      // it RETURN, and `main:quick_fix_default` is precisely the token a
      // quick-fix attempt records — a check placed after the split would never
      // see the attempts it exists for.
      await recordReceiptCheck(workspace, attempt_id, bead_id);

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
          await revertWorkflowMode(
            bead_id,
            prior,
            workflowModeSourcePriorOf(workspace, attempt_id)
          );
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
          execStampedKeysOf(workspace, attempt_id),
          execRestoreValuesOf(workspace, attempt_id)
        );
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: { status: 'done', finished_at: now() }
        });
        notifyChanged(workspace);
        await tick(workspace);
        return;
      }

      if (quickfixLaneOf(workspace, attempt_id)) {
        await settleQuickfixLanding(
          workspace,
          attempt_id,
          bead_id,
          prior,
          snap.target_base,
          true
        );
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
          await revertWorkflowMode(
            bead_id,
            prior,
            workflowModeSourcePriorOf(workspace, attempt_id)
          );
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
          execStampedKeysOf(workspace, attempt_id),
          execRestoreValuesOf(workspace, attempt_id)
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
      // The single common exit of every LIVE termination — success, failure,
      // guard kill, and the ⏸/■ early return (their `done` still resolves
      // here, after the process is actually gone). Best-effort by contract: the
      // next attempt writes under a new id, so a leftover tree cannot pollute a
      // later judgment (UI-8mvc §5).
      removeGuardHook(workspace, attempt_id);
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
   * Whether an attempt belongs to the Worker-dispatched quick_fix lane, read
   * from the durable record so restart reconciliation makes the same decision
   * as the live completion path.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {boolean}
   */
  function quickfixLaneOf(workspace, attempt_id) {
    try {
      const a = deps.store.snapshot(workspace).attempts[attempt_id];
      return !!a && a.quickfix_lane === true;
    } catch {
      return false;
    }
  }

  /**
   * Settle a successful quick_fix session without entering PR observation or
   * `pr_wait`. The landing dep owns `moveToDone` on success.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {string|null} prior
   * @param {string} target_base
   * @param {boolean} repo_known
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, step?: string|null }>}
   */
  async function settleQuickfixLanding(
    workspace,
    attempt_id,
    bead_id,
    prior,
    target_base,
    repo_known
  ) {
    try {
      await revertWorkflowMode(
        bead_id,
        prior,
        workflowModeSourcePriorOf(workspace, attempt_id)
      );
    } catch (err) {
      log(
        'workflow_mode revert failed on quick_fix landing for %s: %o',
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
      return { ok: false, reason: 'workflow_mode_revert_failed' };
    }
    await revertExecStamps(
      bead_id,
      execStampedKeysOf(workspace, attempt_id),
      execRestoreValuesOf(workspace, attempt_id)
    );

    if (!repo_known) {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        'quickfix_landing_failed:repo_unknown'
      );
      notifyChanged(workspace);
      await tick(workspace);
      return { ok: false, reason: 'quickfix_landing_failed:repo_unknown' };
    }
    if (!deps.quickfixLanding) {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        'quickfix_landing_unavailable'
      );
      notifyChanged(workspace);
      await tick(workspace);
      return { ok: false, reason: 'quickfix_landing_unavailable' };
    }

    let result;
    try {
      result = await deps.quickfixLanding.settle({
        attempt_id,
        bead_id,
        target_base
      });
    } catch (err) {
      log('quick_fix landing threw for %s: %o', attempt_id, err);
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        prior,
        'quickfix_landing_failed:threw'
      );
      notifyChanged(workspace);
      await tick(workspace);
      return { ok: false, reason: 'quickfix_landing_failed:threw' };
    }

    if (result.ok) {
      notifyChanged(workspace);
      await tick(workspace);
      return { ok: true };
    }
    const reason =
      typeof result.reason === 'string' && result.reason.length > 0
        ? result.reason
        : 'unknown';
    await failAttempt(
      workspace,
      attempt_id,
      bead_id,
      prior,
      `quickfix_landing_failed:${reason}`
    );
    notifyChanged(workspace);
    await tick(workspace);
    return { ok: false, reason, step: result.step };
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
      await revertWorkflowMode(
        bead_id,
        prior,
        workflowModeSourcePriorOf(workspace, attempt_id)
      );
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
    await revertExecStamps(
      bead_id,
      execStampedKeysOf(workspace, attempt_id),
      execRestoreValuesOf(workspace, attempt_id)
    );
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
    const restored = await restoreAttemptOverlayForRelaunch(
      bead_id,
      record.workflow_mode_prior ?? null,
      record.exec_stamped_keys,
      record.exec_restore_values ?? null,
      record.workflow_mode_source_prior ?? null
    );
    if (!restored) {
      return false;
    }
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'failed',
        cause: `disposition_resume_failed:${verdict.reason}`,
        finished_at: now()
      }
    });
    /** @type {{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }} */
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
      if (relaunched.continuation_mismatch) {
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: {
            continuation_action: {
              mismatch: relaunched.continuation_mismatch,
              continuation: null
            }
          }
        });
        const q = deps.store.snapshot(workspace);
        const queue_bead_id = q.merge_queue?.find(
          (/** @type {any} */ entry) => {
            if (entry.bead_id === bead_id) {
              return true;
            }
            return (
              q.completion_intents?.[entry.bead_id]?.subject?.bead_id ===
              bead_id
            );
          }
        )?.bead_id;
        if (queue_bead_id) {
          const persisted = deps.store.requireMergeContinuation(workspace, {
            bead_id: queue_bead_id,
            subject_bead_id: bead_id,
            mismatch: relaunched.continuation_mismatch
          });
          if (persisted.ok) {
            releaseDisposition(bead_id);
            notifyChanged(workspace);
            return true;
          }
        }
        releaseDisposition(bead_id);
        notifyChanged(workspace);
        return true;
      }
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
   * Whether the SCHEDULER is the lifecycle owner of a persisted attempt
   * (UI-hk74 §7). Head review and repair attempts live in the same history but
   * are dispatched, adopted, and settled by the head-review transport against
   * its own durable markers. They never enter this engine's `running` set, so
   * the reconcile fences below cannot vouch for them — and `isDeadAttempt`
   * would read every one of them as dead and orphan a live reviewer.
   *
   * @param {any} attempt
   * @returns {boolean}
   */
  function isSchedulerOwned(attempt) {
    return (attempt?.kind ?? 'implementation') === 'implementation';
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
   * A historical cleanup-diagnosis attempt has no active launch path. It may
   * still settle through a live in-memory session or a verified live process;
   * otherwise it is retired without observing, retrying, or resuming cleanup.
   *
   * @param {string} attempt_id
   * @param {any} attempt
   * @returns {boolean}
   */
  function isOrphanedLegacyCleanupDiagnosis(attempt_id, attempt) {
    if (
      attempt.cleanup_diagnosis !== true ||
      (attempt.status !== 'running' && attempt.status !== 'paused')
    ) {
      return false;
    }
    if (
      running.has(attempt_id) ||
      settling.has(attempt_id) ||
      paused_done.has(attempt_id) ||
      claimed.has(attempt.bead_id)
    ) {
      return false;
    }
    return attempt.pid == null || isDeadAttempt(attempt);
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   */
  function retireLegacyCleanupDiagnosis(workspace, attempt_id) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'orphaned',
        cause: 'legacy_cleanup_diagnosis_retired',
        finished_at: now()
      }
    });
    removeGuardHook(workspace, attempt_id);
    notifyChanged(workspace);
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
    // The hook assets come down AFTER the disposition, never before it
    // (UI-1xcd §4). They now carry the push record the settlement below reads,
    // and removing them at entry deleted that evidence a step ahead of the
    // observation — so the removal sits in a `finally` covering every branch's
    // own `return`, exactly as `onSessionDone` already does it.
    //
    // The `settling` fence spans the whole disposition for the same reason
    // `onSessionDone` raises it: the observation below takes seconds, and this
    // path writes the attempt's terminal status at the end of them. It is what
    // makes a discard REQUESTED mid-disposition refuse with `attempt_settling`
    // (`canDiscardAttempt`) instead of racing that write — the reverse order of
    // the race `reconcile`'s own discard fence closes.
    settling.add(attempt_id);
    try {
      await disposeDeadAttemptSettlement(workspace, attempt_id, attempt);
    } finally {
      settling.delete(attempt_id);
      removeGuardHook(workspace, attempt_id);
    }
  }

  /**
   * The body of {@link disposeDeadAttempt}; see its contract. Split out only so
   * the hook removal can wrap every early return.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {any} attempt
   */
  async function disposeDeadAttemptSettlement(workspace, attempt_id, attempt) {
    const bead_id = attempt.bead_id;
    const prior = attempt.workflow_mode_prior ?? null;
    const repo = typeof attempt.repo === 'string' ? attempt.repo : '';
    const target_base =
      typeof attempt.target_base === 'string' ? attempt.target_base : '';
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
    // The restart-side settlement (UI-8mvc §3). Ahead of both special branches
    // for the same reason it is in `onSessionDone`: they return, and the
    // exclusion of a disposition / an unpinned external resolution has to be
    // recorded rather than silently skipped. The claim is taken around the
    // failure exactly as the ordinary arm takes it — `failAttempt` reopens the
    // bead, and an unclaimed reopen races a tick into re-dispatching it.
    if (await settleBaseDrift(workspace, attempt_id)) {
      claimed.add(bead_id);
      try {
        await failAttempt(
          workspace,
          attempt_id,
          bead_id,
          prior,
          'base_landing_detected',
          { reason: 'base_landing_detected', command: null }
        );
      } finally {
        claimed.delete(bead_id);
      }
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }
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
    // The receipt observation, at the same place `onSessionDone` takes it
    // (UI-bu6d §3): past the base-drift failure and the disposition arm, ahead
    // of EVERY branch that can settle this attempt as done. A restart-recovered
    // attempt reaches `pr_wait` through here and nowhere else, so a check that
    // lived only in `onSessionDone` would leave those attempts unobserved — and
    // leave a previous attempt's warning standing as if it still described them.
    await recordReceiptCheck(workspace, attempt_id, bead_id);

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
            await revertWorkflowMode(
              bead_id,
              prior,
              workflowModeSourcePriorOf(workspace, attempt_id)
            );
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
              execStampedKeysOf(workspace, attempt_id),
              execRestoreValuesOf(workspace, attempt_id)
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
      if (quickfixLaneOf(workspace, attempt_id)) {
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: usagePatch(workspace, attempt_id)
        });
        if (guard_kill) {
          // Guard evidence outranks landing exactly as it outranks the ordinary
          // PR observation: a monitor-killed session fails however far it got.
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
          notifyChanged(workspace);
          await tick(workspace);
        } else {
          await settleQuickfixLanding(
            workspace,
            attempt_id,
            bead_id,
            prior,
            target_base,
            repo.length > 0
          );
        }
        return;
      }

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
          await revertWorkflowMode(
            bead_id,
            prior,
            workflowModeSourcePriorOf(workspace, attempt_id)
          );
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
            execStampedKeysOf(workspace, attempt_id),
            execRestoreValuesOf(workspace, attempt_id)
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
   * ONLY attempts no part of THIS process owns are candidates, behind four
   * fences, because a durable `running` record is not by itself evidence of a
   * detached session:
   *
   *   - `running` — a live session handle: `onSessionDone` is its authority.
   *   - `settling` — a settlement is mid-flight for it: the handler already
   *     dropped the handle but has not written the terminal status yet.
   *   - `claimed` (by BEAD) — a dispatch or relaunch is in flight. Between the
   *     durable pre-record (`status:'running'`, `pid:null`) and `running.set`
   *     at spawn, the attempt looks exactly like a dead one — `pid == null` —
   *     and the claim, taken in the tick cascade before dispatch and released
   *     only on abort/termination, is what tells the two apart.
   *   - `discardActive` — a discard operation owns this attempt. Its very first
   *     destructive act is to KILL the session, so the process disappearing is
   *     the expected midpoint of the discard, not evidence of a dead detached
   *     session. Without this fence the pass observes an attempt whose PR the
   *     discard is busy closing, fails it `verify_failed:pr_missing`, and that
   *     write lands on top of `finalizeDiscardAttempt`'s `discarded` — leaving a
   *     failure banner on work that was in fact discarded cleanly. This fence is
   *     the DURABLE one: unlike the scheduler-local `stopped` set it survives a
   *     restart, and the operation record exists before the fence is raised. It
   *     is checked FIRST because it also has to cover the legacy-diagnosis
   *     retirement branch, which the other three fences sit behind.
   *
   * @param {string} workspace
   */
  async function reconcile(workspace) {
    if (reconciling.has(workspace)) {
      return;
    }
    reconciling.add(workspace);
    try {
      let q = deps.store.snapshot(workspace);
      if (recoverTerminalUsageReceipts(workspace, q.attempts)) {
        q = deps.store.snapshot(workspace);
        notifyChanged(workspace);
      }
      gcUsageReceiptInboxes(workspace);
      /** @type {Array<{ attempt_id: string, attempt: any }>} */
      const dead = [];
      /** @type {string[]} */
      const retired = [];
      for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
        const a = /** @type {any} */ (attempt);
        if (!a) {
          continue;
        }
        if (a.status === 'running') {
          startDelegationPolling(workspace, attempt_id);
        }
        // AHEAD of the legacy-retirement branch, not beside the other three:
        // retirement is a durable terminal write of its own, so a discard that
        // owns a legacy diagnosis attempt must fence that branch too.
        if (discardActive(q, { bead_id: a.bead_id, attempt_id })) {
          continue;
        }
        if (isOrphanedLegacyCleanupDiagnosis(attempt_id, a)) {
          retired.push(attempt_id);
          continue;
        }
        if (a.status !== 'running' || !isSchedulerOwned(a)) {
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
      for (const attempt_id of retired) {
        retireLegacyCleanupDiagnosis(workspace, attempt_id);
      }
      for (const d of dead) {
        // Re-checked per iteration, not just at selection: each disposition
        // ends in a `tick`, so an earlier one in this same pass may already
        // have re-dispatched the bead of a later candidate. The discard fence
        // and the attempt's own status are re-read off a FRESH snapshot for the
        // same reason plus one more — a discard that lands after this pass
        // selected its candidates is exactly the race that produced the stale
        // `verify_failed:pr_missing` banner. Two dispositions of that discard
        // have to be caught, and only one of them is still `discardActive`:
        // an accepted one, and a COMPLETED one whose operation is back to
        // `phase: 'done'` with the attempt already written `discarded`. The
        // durable status is what catches the second, so the candidate is
        // disposed only while it is still `running`, and off the CURRENT
        // record rather than the one selection captured.
        if (claimed.has(d.attempt.bead_id)) {
          continue;
        }
        const fresh = deps.store.snapshot(workspace);
        const current = fresh.attempts?.[d.attempt_id];
        if (
          !current ||
          current.status !== 'running' ||
          discardActive(fresh, {
            bead_id: current.bead_id,
            attempt_id: d.attempt_id
          })
        ) {
          continue;
        }
        await disposeDeadAttempt(workspace, d.attempt_id, current);
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
   * @param {LaneLaunchLease|null} reservation
   * @param {{ stale_work?: StaleWorkAdmission }} [options]
   */
  async function dispatch(
    workspace,
    bead_id,
    reservation = null,
    options = {}
  ) {
    const stale_context = options.stale_work || null;
    try {
      // RE-READ authoritative ready/blocked/deps/exec-settings at dispatch.
      // A disagreement with the scan pass is a real TOCTOU stop, so it is
      // recorded on the same channel the scan uses — without a reason this
      // dispatch would abort with nothing visible anywhere.
      let snap;
      try {
        snap = await deps.bd.snapshotBead(bead_id);
      } catch {
        reservation?.release();
        recordSkipReason(workspace, bead_id, 'bd_snapshot_failed');
        claimed.delete(bead_id);
        return;
      }
      if (!snap.ready || snap.blocked) {
        reservation?.release();
        if (!dequeueIfClosed(workspace, bead_id, snap)) {
          recordSkipReason(workspace, bead_id, notReadyReason(snap));
        }
        claimed.delete(bead_id);
        return;
      }
      if (isWorkerIneligible(snap.labels)) {
        reservation?.release();
        refuseDispatch(workspace, bead_id, 'worker_ineligible');
        return;
      }
      // The bead's lane is re-read HERE, at dispatch: a drag between scan and
      // dispatch moves the head-only judgment with it, and the recorded
      // `serial_lane_id` snapshot must match the lane the launch actually
      // consumed.
      const serial_lane_id = waitingLaneOf(
        deps.store.snapshot(workspace),
        bead_id
      );
      const lane_input = {
        bead_id,
        lineage_id: bead_id,
        serial_lane_id
      };
      const serial_launch = reservation
        ? reservation.revalidate(lane_input)
        : acquireLaneLaunch(workspace, lane_input);
      if (!serial_launch.ok) {
        reservation?.release();
        refuseDispatch(workspace, bead_id, serial_launch.reason);
        return;
      }
      reservation = serial_launch.lease;

      // Capture the preset/reference + effective values once, before any launch
      // state mutation. The coordinator's snapshot is the only default source;
      // all later stamp/provenance work consumes this immutable result.
      const resolved_exec = resolveDispatchSettings(
        workspace,
        snap,
        await readWorkspaceAccountsLayer(workspace)
      );
      if (!resolved_exec.ok) {
        reservation.release();
        refuseDispatch(workspace, bead_id, resolved_exec.reason);
        return;
      }
      const exec = resolved_exec.exec;
      if (exec.invalid_reason) {
        reservation.release();
        refuseDispatch(workspace, bead_id, exec.invalid_reason);
        return;
      }
      // DERIVED from the resolved model, never an independent axis: the catalog
      // owns the model→runner map, so a bead asking for `sol` dispatches through
      // codex without anyone setting a runner key (§C-2).
      const runner_name = exec.runner;

      const attempt_id = makeAttemptId(bead_id);
      const prior = snap.workflow_mode ?? null;
      const prior_source = snap.workflow_mode_source ?? null;

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
          refuseDispatch(workspace, bead_id, 'base_unresolved:git_error');
          return;
        }
        if (!resolved.ok) {
          refuseDispatch(
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
        refuseDispatch(workspace, bead_id, snap.base_unresolved);
        return;
      }
      const quickfix_lane = snap.route === 'quick_fix';
      // The cut source: the FETCHED remote tip when the resolver produced one, so
      // a stale local `<base>` cannot silently become the worktree's parent.
      const cut_base = snap.base_oid || snap.target_base;

      // PREVENTION LAYER (UI-8mvc §2): the pre-push hook goes in HERE — after the
      // base re-resolution that supplies its subject, and before the first state
      // change of the launch. At this point there is no worktree, no attempt
      // record and no metadata stamp, so an install failure ends in a refusal
      // with nothing left behind (완료조건 #17). Every early return BELOW this
      // line removes it again.
      // A reviewed quick_fix ends by pushing the base directly. Installing the
      // ordinary hook would make that lane reject its own terminal duty;
      // disposition has the same exemption, and base-drift skips this lane.
      if (
        !quickfix_lane &&
        !installGuardHook({
          workspace,
          attempt_id,
          repo: snap.repo,
          target_base: snap.target_base
        })
      ) {
        refuseDispatch(workspace, bead_id, 'guard_hook_install_failed');
        return;
      }

      // PRE-FLIGHT (spec §2): a leftover worktree/branch from an earlier ■ makes
      // `add` fail outright, and — once the worktree alone is gone — makes its
      // `-B` silently reset a branch that may still hold the only copy of its
      // commits. Clear it when nothing would be lost, refuse VISIBLY otherwise.
      /** @type {{ path: string, branch: string, base_oid: string }|null} */
      let wt = null;
      if (stale_context) {
        const expected_identity = stale_context.identity;
        if (typeof deps.worktree.removeIfDiscardable !== 'function') {
          refuseStaleWorkDispatch(
            workspace,
            attempt_id,
            bead_id,
            stale_context,
            cut_base,
            null,
            'observer_unavailable'
          );
          return;
        }
        /** @type {WorktreeObservation} */
        let observed;
        try {
          observed = await deps.worktree.removeIfDiscardable({
            repo: snap.repo,
            bead_id,
            base: cut_base,
            preserve: true
          });
        } catch {
          refuseStaleWorkDispatch(
            workspace,
            attempt_id,
            bead_id,
            stale_context,
            cut_base,
            null,
            'git_error'
          );
          return;
        }
        if (
          expected_identity.base_oid !== cut_base ||
          observed.state !== 'unique' ||
          observed.owned !== true ||
          !observed.identity ||
          !sameStaleIdentity(expected_identity, observed.identity) ||
          typeof expected_identity.worktree_realpath !== 'string' ||
          typeof expected_identity.branch !== 'string'
        ) {
          refuseStaleWorkDispatch(
            workspace,
            attempt_id,
            bead_id,
            stale_context,
            cut_base,
            observed,
            'worktree_identity_changed'
          );
          return;
        }
        wt = {
          path: expected_identity.worktree_realpath,
          branch: expected_identity.branch,
          base_oid: cut_base
        };
      } else if (typeof deps.worktree.removeIfDiscardable === 'function') {
        const resume_candidates = resumableResidueAttempts(
          workspace,
          bead_id,
          snap.repo
        );
        /** @type {WorktreeObservation} */
        let residue;
        try {
          residue = await deps.worktree.removeIfDiscardable({
            repo: snap.repo,
            bead_id,
            base: cut_base,
            ...(resume_candidates.length > 0 ? { preserve: true } : {})
          });
        } catch {
          removeGuardHook(workspace, attempt_id);
          refuseDispatch(workspace, bead_id, 'git_error');
          return;
        }
        if (resume_candidates.length > 0) {
          const resume_attempt = matchingResidueAttempt(
            residue,
            bead_id,
            resume_candidates
          );
          if (resume_attempt) {
            removeGuardHook(workspace, attempt_id);
            refuseDispatch(
              workspace,
              bead_id,
              'worktree_stale_work',
              staleWorkAdmission(residue, bead_id, resume_attempt)
            );
            return;
          }
          try {
            residue = await deps.worktree.removeIfDiscardable({
              repo: snap.repo,
              bead_id,
              base: cut_base
            });
          } catch {
            removeGuardHook(workspace, attempt_id);
            refuseDispatch(workspace, bead_id, 'git_error');
            return;
          }
        }
        if (!residue.ok) {
          removeGuardHook(workspace, attempt_id);
          refuseDispatch(
            workspace,
            bead_id,
            'worktree_stale_work',
            staleWorkAdmission(residue, bead_id, null)
          );
          return;
        }
      }
      if (!stale_context) {
        try {
          wt = await deps.worktree.add({
            repo: snap.repo,
            bead_id,
            base: cut_base
          });
        } catch {
          // Fail-VISIBLE: this used to abort with no badge, no log and no attempt,
          // leaving a re-queued bead permanently stuck with nothing to see.
          removeGuardHook(workspace, attempt_id);
          refuseDispatch(workspace, bead_id, 'worktree_add_failed');
          return;
        }
      }
      if (!wt) {
        if (stale_context) {
          refuseStaleWorkDispatch(
            workspace,
            attempt_id,
            bead_id,
            stale_context,
            cut_base,
            null,
            'worktree_identity_changed'
          );
        } else {
          removeGuardHook(workspace, attempt_id);
          refuseDispatch(workspace, bead_id, 'worktree_identity_changed');
        }
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
        removeGuardHook(workspace, attempt_id);
        if (!stale_context) {
          try {
            await deps.worktree.remove({ repo: snap.repo, bead_id });
          } catch {
            // Best-effort cleanup; the refusal is already recorded.
          }
        }
        claimed.delete(bead_id);
        dispatch_refused.add(bead_id);
        // Not awaited: this runs inside the drain it would wait on
        // ({@link requestRescan}).
        requestRescan();
        return;
      }

      // Capture exact pre-overlay values before the durable attempt record.
      // Without this snapshot, terminal cleanup could erase user-owned values.
      const stamped_keys = exec.stamped_keys;
      const exec_values = execValuesFor(exec);
      const restore_capture = await captureExecRestoreValues(
        bead_id,
        stamped_keys
      );
      if (!restore_capture.ok) {
        reservation.release();
        removeGuardHook(workspace, attempt_id);
        if (!stale_context) {
          try {
            await deps.worktree.remove({ repo: snap.repo, bead_id });
          } catch {
            // The visible refusal remains the recovery evidence.
          }
        }
        refuseDispatch(workspace, bead_id, 'exec_restore_capture_failed');
        return;
      }
      const exec_restore_values = restore_capture.values;
      // Receipt-authority snapshot, taken in the same window and for the same
      // reason: after the first metadata write nothing can tell an appeared key
      // from a pre-existing one (UI-bu6d §2).
      const receipt_baseline = await captureReceiptBaseline(bead_id);

      // DURABLE pre-record before the FIRST metadata write. It carries the whole
      // effective 12-key snapshot and exact cleanup provenance.
      if (
        !prerecordAttempt(workspace, {
          attempt_id,
          bead_id,
          repo: snap.repo,
          target_base: snap.target_base,
          base_oid: wt.base_oid,
          ...(stale_context
            ? { head_oid: stale_context.identity.head_sha }
            : {}),
          workflow_mode_prior: prior,
          workflow_mode_source_prior: prior_source,
          receipt_baseline,
          exec_default_preset_id: resolved_exec.preset_id,
          exec_default_preset_revision: resolved_exec.preset_revision,
          exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
          exec_values,
          exec_restore_values,
          spec_review_stale: !!adm.stale,
          quickfix_lane,
          serial_lane_id,
          status: 'running',
          pid: null
        })
      ) {
        reservation.release();
        removeGuardHook(workspace, attempt_id);
        if (!stale_context) {
          try {
            await deps.worktree.remove({ repo: snap.repo, bead_id });
          } catch {
            // The durable refusal is already recorded below.
          }
        }
        refuseDispatch(workspace, bead_id, 'attempt_prerecord_failed');
        return;
      }
      reservation.handoff();

      // Record + readback workflow_mode=fast_track (double-delivered with prompt).
      // The set AND its confirming readback are contained: a bd failure or a
      // readback that does not echo `fast_track` fails THIS dispatch only (records
      // a failed attempt, reverts the mode, releases the claim) — it never rejects
      // out of tick's Promise.all, and never halts the queue or pauses siblings
      // (spec §5.2).
      let fast_track_ok = false;
      try {
        const stamped = await stampWorkerWorkflowMode(bead_id);
        fast_track_ok = stamped.ok;
        if (!fast_track_ok) {
          log(
            'workflow_mode readback mismatch for %s: expected fast_track/worker, got %o/%o',
            bead_id,
            stamped.workflow_mode,
            stamped.workflow_mode_source
          );
        }
      } catch (err) {
        log('workflow_mode set/readback failed for %s: %o', bead_id, err);
        fast_track_ok = false;
      }
      if (!fast_track_ok) {
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: {
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
          await revertWorkflowMode(
            bead_id,
            prior,
            workflowModeSourcePriorOf(workspace, attempt_id)
          );
        } catch {
          // Best-effort: bd may be down; the failed record already reflects it.
        }
        removeGuardHook(workspace, attempt_id);
        claimed.delete(bead_id);
        notifyChanged(workspace);
        return;
      }

      // The judgement's own route pin decides applicability, so no route test
      // is restated here: a non-quick_fix snapshot yields `null` and no block.
      const quick_fix_block = quickFixSelfReviewBlock(
        judgeQuickFixHandoff({
          issue_type: snap.issue_type,
          description: snap.description,
          metadata: {
            route: snap.route,
            quick_fix_review: snap.quick_fix_review
          }
        }),
        snap.quick_fix_review
      );
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
        speed: exec.orchestration_speed ?? 'default',
        accounts: resolved_exec.accounts,
        account_sources: resolved_exec.account_sources,
        quickfix_lane,
        prior_wf: prior,
        stamped_keys,
        wt_path: wt.path,
        // Only the FIRST dispatch holds a bead snapshot, so only it can name the
        // bead in the start push; a resume/conflict relaunch pushes without one.
        title: snap.title ?? null,
        launch_kind: stale_context ? 'stale_work_continue' : 'dispatch',
        // The adapter reads only `id`/`prompt`; the plan-receipt fields the
        // retired runner guard needed are no longer carried (worker-phase1 §4).
        // A fresh receipt carries no `prompt`, so the adapter builds the default
        // one — only a stale dispatch overrides it (UI-dlim §3.2).
        spawnBead: stale_context
          ? {
              id: bead_id,
              prompt: withQuickFixSelfReview(
                staleWorkContinuePrompt(bead_id, {
                  identity: stale_context.identity,
                  summary: stale_context.summary,
                  target_base: wt.base_oid
                }),
                quick_fix_block
              )
            }
          : adm.stale
            ? {
                id: bead_id,
                prompt: withQuickFixSelfReview(
                  staleDispatchPrompt(bead_id, {
                    base: wt.base_oid,
                    spec:
                      adm.stale.receipt_sha && adm.stale.delta_shas
                        ? {
                            receipt:
                              typeof snap.spec_review === 'string' &&
                              snap.spec_review.trim().length > 0
                                ? snap.spec_review.trim()
                                : adm.stale.receipt_sha,
                            receipt_sha: adm.stale.receipt_sha,
                            delta_shas: adm.stale.delta_shas,
                            changed_paths: adm.stale.changed_paths
                          }
                        : undefined,
                    plan: adm.stale.plan
                      ? {
                          receipt:
                            typeof snap.plan_approval === 'string' &&
                            snap.plan_approval.trim().length > 0
                              ? snap.plan_approval.trim()
                              : adm.stale.plan.receipt_sha,
                          ...adm.stale.plan
                        }
                      : undefined
                  }),
                  quick_fix_block
                )
              }
            : quick_fix_block
              ? {
                  id: bead_id,
                  // This branch has no base prompt of its own — the adapter
                  // builds one. Carrying a prompt takes that path away, so the
                  // default has to be built here or the session would receive
                  // the observation alone (§6.1).
                  prompt: withQuickFixSelfReview(
                    defaultTaskPrompt(bead_id),
                    quick_fix_block
                  )
                }
              : { id: bead_id }
      });
    } finally {
      reservation?.release();
    }
  }

  /**
   * Continue one identity-bound stale worktree. A resumable leaf keeps the
   * existing resume contract; otherwise normal dispatch adopts the verified
   * worktree while skipping remove/add only.
   *
   * @param {string} workspace
   * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
   */
  async function staleWorkContinue(workspace, input) {
    const authorized = staleWorkAction(workspace, input, 'continue');
    if (!authorized.ok) {
      return authorized;
    }
    const stale_work = authorized.stale_work;
    let snap;
    try {
      snap = await deps.bd.snapshotBead(input.bead_id);
    } catch {
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const owner_reason = await staleWorkOwnerReason(
      workspace,
      input.bead_id,
      snap.repo,
      stale_work.identity
    );
    if (owner_reason) {
      return { ok: false, reason: owner_reason, conflict: true };
    }
    const reauthorized = staleWorkAction(workspace, input, 'continue');
    if (!reauthorized.ok) {
      return reauthorized;
    }
    const candidates = resumableResidueAttempts(
      workspace,
      input.bead_id,
      snap.repo
    );
    const resume_attempt = matchingResidueAttempt(
      /** @type {WorktreeObservation} */ (
        /** @type {unknown} */ ({
          owned: true,
          identity: stale_work.identity
        })
      ),
      input.bead_id,
      candidates
    );
    if (resume_attempt && stale_work.can_resume) {
      claimed.add(input.bead_id);
      const resumed = await resume(workspace, resume_attempt.attempt_id, {
        preclaimed: true
      });
      if (!resumed.ok) {
        claimed.delete(input.bead_id);
      }
      return resumed;
    }
    if (!stale_work.can_continue) {
      return { ok: false, reason: 'stale_work_conflict', conflict: true };
    }
    if (claimed.has(input.bead_id)) {
      return { ok: false, reason: 'bead_running', conflict: true };
    }
    const before = new Set(Object.keys(reauthorized.queue.attempts || {}));
    claimed.add(input.bead_id);
    await dispatch(workspace, input.bead_id, null, { stale_work });
    const after = deps.store.snapshot(workspace);
    const attempt = Object.values(after.attempts || {})
      .reverse()
      .find(
        (candidate) =>
          candidate?.bead_id === input.bead_id &&
          !before.has(candidate.attempt_id)
      );
    if (!attempt) {
      return {
        ok: false,
        reason: after.admission?.[input.bead_id]?.reason || 'dispatch_refused'
      };
    }
    return attempt.status === 'running'
      ? { ok: true, attempt_id: attempt.attempt_id }
      : {
          ok: false,
          attempt_id: attempt.attempt_id,
          reason: attempt.cause || 'spawn_failed'
        };
  }

  /**
   * @param {string} workspace
   * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
   */
  async function staleWorkRecheck(workspace, input) {
    const authorized = staleWorkAction(workspace, input, 'can_recheck');
    if (!authorized.ok) {
      return authorized;
    }
    let snap;
    try {
      snap = await deps.bd.snapshotBead(input.bead_id);
    } catch {
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const owner_reason = await staleWorkOwnerReason(
      workspace,
      input.bead_id,
      snap.repo,
      authorized.stale_work.identity
    );
    if (owner_reason) {
      return { ok: false, reason: owner_reason, conflict: true };
    }
    let cut_base = authorized.stale_work.identity.base_oid;
    if (typeof deps.resolveBase === 'function') {
      let resolved;
      try {
        resolved = await deps.resolveBase({ force: true });
      } catch {
        return { ok: false, reason: 'base_unresolved:git_error' };
      }
      if (!resolved.ok) {
        return { ok: false, reason: `base_unresolved:${resolved.step}` };
      }
      cut_base = resolved.base_oid;
    }
    if (
      typeof cut_base !== 'string' ||
      cut_base.length === 0 ||
      typeof deps.worktree.removeIfDiscardable !== 'function'
    ) {
      return { ok: false, reason: 'base_unresolved:missing' };
    }
    const reauthorized = staleWorkAction(workspace, input, 'can_recheck');
    if (!reauthorized.ok) {
      return reauthorized;
    }
    claimed.add(input.bead_id);
    let release_action_claim = true;
    try {
      /** @type {WorktreeObservation} */
      let observation;
      try {
        observation = await deps.worktree.removeIfDiscardable({
          repo: snap.repo,
          bead_id: input.bead_id,
          base: cut_base
        });
      } catch {
        return { ok: false, reason: 'git_error' };
      }
      if (observation.ok) {
        const cleared = deps.store.clearAdmission(workspace, input.bead_id);
        if (cleared.ok) {
          notifyChanged(workspace);
        }
        claimed.delete(input.bead_id);
        release_action_claim = false;
        await tick(workspace);
        return { ok: true, state: observation.state };
      }
      const resume_candidates = resumableResidueAttempts(
        workspace,
        input.bead_id,
        snap.repo
      );
      const resume_attempt = matchingResidueAttempt(
        observation,
        input.bead_id,
        resume_candidates
      );
      const stale_work = staleWorkAdmission(
        observation,
        input.bead_id,
        resume_attempt
      );
      const recorded = deps.store.recordAdmission(workspace, {
        bead_id: input.bead_id,
        reason: 'worktree_stale_work',
        stale_work
      });
      if (recorded.ok) {
        notifyChanged(workspace);
      }
      return { ok: true, state: stale_work.state };
    } finally {
      if (release_action_claim) {
        claimed.delete(input.bead_id);
      }
    }
  }

  /**
   * Dispatch one RepoOperation repair session (master spec §4.4). This is the
   * `RepairSessionAdapter`'s only door into the scheduler, and it deliberately
   * adds NO session machinery: it resolves the owner Bead's own latest attempt
   * and hands it to the existing relaunch path with the adapter's packet as the
   * prompt. Every launch, log, and monitor concern therefore stays exactly
   * where it already lived.
   *
   * It refuses rather than improvises: no attempt lineage, a worktree that is
   * not provably the Bead's, or a session already running on that Bead all end
   * as a manual state instead of a second dispatch path.
   *
   * @param {string} workspace
   * @param {{ bead_id: string, operation_id: string, packet: any }} input
   */
  async function dispatchRepoOperationRepair(workspace, input) {
    if (
      !input ||
      typeof input.bead_id !== 'string' ||
      input.bead_id.length === 0 ||
      typeof input.operation_id !== 'string' ||
      input.operation_id.length === 0 ||
      !input.packet ||
      typeof input.packet !== 'object'
    ) {
      return { ok: false, reason: 'repair_packet_invalid' };
    }
    if (claimed.has(input.bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    const attempts = Object.values(
      deps.store.snapshot(workspace).attempts || {}
    );
    if (
      attempts.some(
        (attempt) =>
          attempt?.bead_id === input.bead_id && attempt.status === 'running'
      )
    ) {
      return { ok: false, reason: 'bead_running' };
    }
    const resumed_from = new Set(
      attempts.map((attempt) => attempt?.resumed_from).filter(Boolean)
    );
    const lineage = attempts
      .filter(
        (attempt) =>
          attempt?.bead_id === input.bead_id &&
          // The relaunch source is the owner Bead's own implementation lineage
          // (UI-hk74 §7): a head-review attempt has no worktree of its own to
          // prove ownership of, and resuming from one would repair nothing.
          isImplementationAttempt(attempt) &&
          !resumed_from.has(attempt.attempt_id)
      )
      .sort(
        (left, right) =>
          (right.started_at || 0) - (left.started_at || 0) ||
          right.attempt_id.localeCompare(left.attempt_id)
      );
    const prior = lineage[0];
    if (!prior || typeof prior.repo !== 'string' || prior.repo.length === 0) {
      return { ok: false, reason: 'repair_attempt_source_missing' };
    }
    const owned = await proveOwnedWorktree(prior.repo, input.bead_id);
    if (!owned.ok) {
      return { ok: false, reason: owned.reason };
    }
    let snap;
    try {
      snap = await deps.bd.snapshotBead(input.bead_id);
    } catch {
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const launched = await relaunchFromAttempt(workspace, prior, {
      prompt: repairSessionPrompt(input.packet),
      bead_snapshot: snap,
      cwd: owned.path,
      repair_operation_id: input.operation_id
    });
    return launched.ok
      ? { ok: true, attempt_id: launched.attempt_id, session_id: null }
      : launched;
  }

  /**
   * Notify the completion coordinator after the normal scheduler settlement
   * has written the attempt's observed session/PR result.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {RunnerVerdict|null} verdict
   */
  async function reportCompletionSettlement(workspace, attempt_id, verdict) {
    if (typeof deps.onCompletionAttemptSettled !== 'function') {
      return;
    }
    const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
    if (
      !attempt ||
      typeof attempt.completion_root_id !== 'string' ||
      typeof attempt.completion_op_id !== 'string' ||
      !attempt.completion_failure_key
    ) {
      return;
    }
    try {
      await deps.onCompletionAttemptSettled({
        workspace,
        root_bead_id: attempt.completion_root_id,
        op_id: attempt.completion_op_id,
        failure_key: attempt.completion_failure_key,
        attempt,
        verdict
      });
    } catch (err) {
      log(
        'completion attempt settlement hook failed for %s: %o',
        attempt_id,
        err
      );
    }
  }

  /**
   * Shared launch tail for a first dispatch AND a manual resume: spawn the
   * runner, fill the spawn-time snapshot, attach the session log, wire
   * session_id capture + the done handler. On a spawn throw it cleans up exactly
   * like the exec-stamp partial failure (revert stamps + workflow_mode, record
   * `spawn_failed`, release the claim) so no stamped metadata or leaked
   * `running` record outlives the aborted launch.
   *
   * A resolution attempt is no longer named here (UI-1xcd §3): the flag existed
   * only to relax the session-side `git merge` guard, which now warns for every
   * attempt, so nothing about the launch depends on it. It stays on the ATTEMPT
   * RECORD (`relaunchFromAttempt`), where it identifies the attempt kind for
   * consumers outside the guard.
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
   *   speed: string,
   *   accounts: { claude: string|null, codex: string|null },
   *   account_sources?: AccountSources,
   *   prior_wf: string|null,
   *   stamped_keys: string[],
   *   wt_path: string,
   *   spawnBead: any,
   *   title?: string|null,
   *   launch_kind?: 'dispatch'|'stale_work_continue'|'resume'|'conflict'|'disposition'|'completion_repair',
   *   resume_session_id?: string|null,
   *   verify_worktree?: boolean,
   *   disposition?: string|null,
   *   quickfix_lane?: boolean,
   *   completion_repair?: any
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
      speed,
      accounts = { claude: null, codex: null },
      account_sources = { claude: null, codex: null },
      prior_wf,
      wt_path,
      spawnBead,
      resume_session_id
    } = input;

    const runner = deps.makeRunner(runner_name);
    const started_at = now();
    const receipt_inbox = usage_receipts.ensureUsageReceiptInbox(
      workspace,
      attempt_id
    );
    const receipt_dir =
      receipt_inbox.ok && typeof receipt_inbox.dir === 'string'
        ? receipt_inbox.dir
        : null;
    if (receipt_dir === null) {
      log(
        'receipt inbox unavailable for %s; continuing without receipt env',
        attempt_id
      );
    }
    const monitor_inbox = delegation_monitor.ensureDelegationMonitorDir(
      workspace,
      attempt_id
    );
    const monitor_dir =
      monitor_inbox.ok && typeof monitor_inbox.dir === 'string'
        ? monitor_inbox.dir
        : null;
    if (monitor_dir === null) {
      log(
        'delegation monitor unavailable for %s: monitor_setup_failed',
        attempt_id
      );
    }

    /** @type {any} */
    const settings = {
      model: model ?? undefined,
      effort: effort ?? undefined,
      speed,
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
      disposition: input.disposition ?? null,
      quickfix_lane: input.quickfix_lane === true
    };
    if (input.completion_repair) {
      settings.completion_repair = input.completion_repair;
    }
    // Hand the session the hook that was installed BEFORE any state change
    // (UI-8mvc §2). Delivery creates nothing, which is why it belongs here even
    // though the install does not: `runner/session.js` spreads `settings.env`
    // over the inherited environment, and `claude.js`'s routing env touches no
    // `GIT_CONFIG_*` key, so there is no collision to lose.
    //
    // DISPOSITION and quick_fix sessions are left alone in all three layers:
    // publishing the resolved/base-direct target IS their job, so no hook was
    // installed. Pointing session git at that absent hooksPath would also
    // disable every repository hook for the session.
    if (receipt_dir !== null || monitor_dir !== null) {
      settings.env = {
        ...(settings.env || {}),
        BDUI_ATTEMPT_ID: attempt_id,
        ...(receipt_dir !== null
          ? { BDUI_CODEX_USAGE_RECEIPT_DIR: receipt_dir }
          : {}),
        ...(monitor_dir !== null
          ? { BDUI_CODEX_DELEGATION_MONITOR_DIR: monitor_dir }
          : {})
      };
    }
    if (!settings.disposition && !settings.quickfix_lane) {
      settings.env = {
        ...settings.env,
        ...guardHook.envFor({ workspace, attempt_id })
      };
    }
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

    // The attempt's STARTING POINT, read before the process exists (UI-1xcd
    // §4.2). Two things were wrong with reading it after the spawn: the value
    // written was a copy of `base_oid` rather than the branch tip, and the
    // read happened at a moment the child could already have committed. The
    // worktree pre-flight has run, so the branch exists here.
    //
    // Diagnostic only — the landing judgment stands on the push record — which
    // is exactly why a failed read leaves the field ABSENT instead of falling
    // back to `base_oid`: a wrong value dressed as a fact is the class of
    // problem this Bead exists to remove.
    const start_oid = await branchTip(repo, bead_id);

    if (
      input.verify_worktree === true &&
      wt_path.length > 0 &&
      wt_path !== repo &&
      !fs.existsSync(wt_path)
    ) {
      return { ok: false, reason: 'worktree_missing' };
    }

    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { claude_account: null, codex_account: null }
    });
    const account_settings = await resolveLaunchAccounts(accounts, runner_name);
    if (!account_settings.ok) {
      await finalizeLaunchRefusal(
        input,
        account_settings.reason,
        false,
        launchAccountRefusalDetail(account_settings, accounts, account_sources)
      );
      return { ok: false, reason: account_settings.reason };
    }
    if (account_settings.claude_account !== null) {
      settings.claude_account = account_settings.claude_account;
      settings.cswap_path = account_settings.cswap_path;
    }
    if (account_settings.env) {
      settings.env = { ...(settings.env || {}), ...account_settings.env };
    }

    /** @type {RunnerHandle} */
    let handle;
    try {
      handle = runner.spawn(spawnBead, wt_path, settings);
    } catch (error) {
      let spawn_failure = 'spawn_failed';
      const launch_error = /** @type {any} */ (error);
      if (launch_error?.cleanup instanceof Promise) {
        const cleanup = await launch_error.cleanup;
        const identity_reason =
          typeof launch_error.message === 'string'
            ? launch_error.message
            : 'process_identity:unknown';
        spawn_failure = cleanup?.ok
          ? `spawn_failed:${identity_reason}`
          : `spawn_failed:${identity_reason}:${cleanup?.reason || 'direct_child_cleanup_failed'}`;
      }
      await finalizeLaunchRefusal(input, spawn_failure, false);
      return { ok: false, reason: spawn_failure };
    }

    // What the spawn actually sent (UI-rxp3 §3), lifted off the handle rather
    // than rebuilt here — ONE assembly feeds both the argv and this record, so
    // the two cannot disagree. Every launch shape passes through this single
    // point (first dispatch, stale dispatch, resume, conflict, disposition), so
    // there is no per-shape recording to keep in sync either. An adapter that
    // exposes no prompts writes nothing rather than a placeholder.
    const prompts = handle.prompts || {};
    /** @type {Record<string, string>} */
    const prompt_patch = {};
    if (typeof prompts.system_prompt === 'string') {
      prompt_patch.system_prompt = prompts.system_prompt;
    }
    if (typeof prompts.task_prompt === 'string') {
      prompt_patch.task_prompt = prompts.task_prompt;
    }

    // Fill the runtime snapshot now that the process exists (spec §5.2). The
    // durable fields (repo/base_oid/exec_stamped_keys) were pre-recorded above;
    // here we add the spawn-time facts + resolved exec values.
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        ...(start_oid === null ? {} : { head_oid: start_oid }),
        started_at,
        pid: handle.pid,
        process_identity: handle.process_identity ?? null,
        runner: runner_name,
        model: model ?? null,
        effort: effort ?? null,
        speed,
        claude_account: account_settings.claude_account,
        codex_account: account_settings.codex_account,
        ...prompt_patch
      }
    });
    log(
      'attempt %s started: %s %s / %s / %s',
      attempt_id,
      runner_name,
      model ?? 'default',
      effort ?? 'default',
      speed
    );

    notifyLifecycle('attemptStarted', {
      bead_id,
      title: input.title ?? null,
      runner: runner_name,
      model,
      effort,
      speed,
      repo,
      kind: input.launch_kind ?? 'dispatch'
    });

    deps.store.clearAdmission(workspace, bead_id);
    deps.sessionLog.attach(workspace, attempt_id, handle.events);
    let init_cwd = wt_path;
    let session_effort_attempted = false;
    let session_effort_retries = 0;
    handle.events.on('raw', (raw) => {
      // Claude subagent sessions and their terminal receipts (UI-2mpn §5.4).
      // The RAW line is the subject, not the normalized event: a subagent's
      // `end` rides a `user` turn, which `normalize()` produces no event for,
      // and the replay path lifts the same line with the same function.
      if (runner_name === 'claude' && deps.delegation) {
        try {
          const lifted = liftDelegation(raw);
          if (deps.delegation.apply(workspace, attempt_id, lifted)) {
            scheduleUsageFanout(workspace);
          }
          if (lifted && lifted.kind === 'end' && lifted.agent_id !== null) {
            backfillSubagentEffort(lifted.launch_id, lifted.agent_id);
          }
        } catch (err) {
          log('delegation lift failed for %s: %o', attempt_id, err);
        }
      }
      // The orchestrator's own effort lands in its project JSONL only with its
      // first `assistant` record — after `system/init` named the session — so
      // the session-id observation above misses a fresh session. Retry on the
      // first assistant lines, bounded so a session that never records one
      // does not reread a growing file per turn.
      if (
        raw &&
        typeof raw === 'object' &&
        raw.type === 'assistant' &&
        session_effort_retries < SESSION_EFFORT_RETRY_LIMIT
      ) {
        session_effort_retries += 1;
        const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
        backfillObservedEffort(attempt?.session_id ?? null);
      }
      if (
        raw &&
        typeof raw === 'object' &&
        raw.type === 'system' &&
        raw.subtype === 'init' &&
        typeof raw.cwd === 'string' &&
        raw.cwd.length > 0
      ) {
        init_cwd = raw.cwd;
      }
    });

    /**
     * @param {string|null} session_id
     */
    function backfillObservedEffort(session_id) {
      const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
      if (
        (runner_name !== 'claude' && runner_name !== 'codex') ||
        typeof session_id !== 'string' ||
        session_id.length === 0 ||
        attempt?.effort != null ||
        attempt?.observed_effort != null
      ) {
        return;
      }
      /** @type {string|null} */
      let observed_effort = null;
      try {
        observed_effort =
          runner_name === 'claude'
            ? observeClaudeEffort({ cwd: init_cwd, session_id })
            : observeCodexEffort({
                session_id,
                started_at: attempt?.started_at ?? null
              });
      } catch (err) {
        log(
          '%s effort observation failed for %s: %o',
          runner_name,
          attempt_id,
          err
        );
        return;
      }
      if (
        typeof observed_effort !== 'string' ||
        observed_effort.trim().length === 0
      ) {
        return;
      }
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { observed_effort }
      });
    }

    /**
     * Read a closed Claude subagent's effort off its own JSONL and pin it on
     * the live session + receipt (fail-quiet, like the orchestrator's).
     *
     * @param {string} launch_id
     * @param {string} agent_id
     */
    function backfillSubagentEffort(launch_id, agent_id) {
      if (!deps.delegation) {
        return;
      }
      const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
      const session_id = attempt?.session_id;
      if (typeof session_id !== 'string' || session_id.length === 0) {
        return;
      }
      /** @type {string|null} */
      let effort = null;
      try {
        effort = observeClaudeSubagentEffort({
          cwd: init_cwd,
          session_id,
          agent_id
        });
      } catch (err) {
        log('subagent effort observation failed for %s: %o', launch_id, err);
        return;
      }
      if (typeof effort !== 'string' || effort.trim().length === 0) {
        return;
      }
      if (deps.delegation.setEffort(workspace, attempt_id, launch_id, effort)) {
        scheduleUsageFanout(workspace);
      }
    }

    // Persist the runner session id when it arrives (stream first event). The
    // updateAttempt store-only write does NOT fan out on its own, so notify ws
    // subscribers explicitly to propagate it to a live drawer (spec §2).
    handle.events.on('session_id', (session_id) => {
      const normalized_session_id =
        typeof session_id === 'string' ? session_id : null;
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          session_id: normalized_session_id
        }
      });
      if (normalized_session_id !== null && !session_effort_attempted) {
        session_effort_attempted = true;
        backfillObservedEffort(normalized_session_id);
      }
      notifyChanged(workspace);
    });
    // Token usage (UI-raqh §1): assistant snapshots accumulate per message id,
    // the `result` total replaces them. Kept in memory while the session runs
    // and persisted onto the attempt at termination; the fanout is throttled
    // because a usage tick is not a queue transition.
    const usage_store = deps.usage;
    handle.events.on('event', (ev) => {
      // A guard verdict the session SURVIVED (UI-1xcd §1). The stream event was
      // its only trace, and nothing persisted it — so `base_merge` moving onto
      // the warn path would have made "the session merged the base in" a fact
      // that vanished with the process. Unconditional, unlike the usage arm
      // below: the record is evidence, not telemetry.
      if (ev && ev.guard_warning) {
        recordGuardWarning(workspace, attempt_id, ev.guard_warning);
      }
      const usage = ev && ev.usage;
      if (!usage_store || !usage) {
        return;
      }
      if (ev.kind === 'result') {
        usage_store.recordResult(workspace, attempt_id, usage);
      } else {
        usage_store.record(workspace, attempt_id, usage);
      }
      scheduleUsageFanout(workspace);
    });
    running.set(attempt_id, { bead_id, repo, handle, prior: prior_wf });
    startUsageReceiptPolling(workspace, attempt_id);
    startDelegationPolling(workspace, attempt_id);
    notifyChanged(workspace);

    // onSessionDone reads only repo + target_base off the snap, so a synthetic
    // snapshot carries everything the termination path needs (the independent
    // verify target) for both first dispatch and resume.
    const doneSnap = /** @type {BeadSnapshot} */ (
      /** @type {any} */ ({ repo, target_base })
    );
    handle.done
      .then(async (verdict) => {
        const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
        backfillObservedEffort(attempt?.session_id ?? null);
        await onSessionDone(
          workspace,
          attempt_id,
          bead_id,
          doneSnap,
          prior_wf,
          verdict
        );
        await reportCompletionSettlement(workspace, attempt_id, verdict);
      })
      .catch((err) => {
        log('session settlement failed for %s: %o', attempt_id, err);
      });
    return { ok: true };
  }

  /**
   * Apply the existing spawn-abort cleanup to a terminal launch refusal.
   *
   * @param {any} input
   * @param {string} cause
   * @param {boolean} dismissed
   * @param {{ reason: string, command: string|null }|null} [cause_detail] - The
   * operator-actionable specifics behind a closed-vocabulary `cause`, such as
   * which account-HOME path failed which mirror check.
   */
  async function finalizeLaunchRefusal(
    input,
    cause,
    dismissed,
    cause_detail = null
  ) {
    removeGuardHook(input.workspace, input.attempt_id);
    usage_receipts.removeEmptyUsageReceiptInbox(
      input.workspace,
      input.attempt_id
    );
    delegation_monitor.removeEmptyDelegationMonitorDir(
      input.workspace,
      input.attempt_id
    );
    await revertExecStamps(
      input.bead_id,
      input.stamped_keys,
      execRestoreValuesOf(input.workspace, input.attempt_id)
    );
    deps.store.updateAttempt(input.workspace, {
      attempt_id: input.attempt_id,
      patch: {
        status: 'failed',
        cause,
        finished_at: now(),
        ...(cause_detail ? { cause_detail } : {}),
        ...(dismissed ? { dismissed_at: now() } : {})
      }
    });
    notifyLifecycle('attemptFailed', {
      bead_id: input.bead_id,
      cause,
      repo: input.repo,
      cause_detail
    });
    try {
      await revertWorkflowMode(
        input.bead_id,
        input.prior_wf,
        workflowModeSourcePriorOf(input.workspace, input.attempt_id)
      );
    } catch {
      // Best-effort: the failed record already preserves the refusal.
    }
    claimed.delete(input.bead_id);
    notifyChanged(input.workspace);
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
   * (spec §1, extended by worker-phase1 §1.2). A failed quick_fix at a durable
   * cleanup cursor resumes settlement on its original attempt, even after its
   * worktree was removed. Fail-closed with five refusal
   * reasons (admission-badge convention): `not_failed` · `no_session_id` ·
   * `worktree_missing` · `bead_running` · `already_resumed`
   * A NEW attempt is minted carrying `resumed_from`. Its effective settings
   * are resolved from the current Bead/default preset before any state change;
   * same-runner auto resumes the provider session, while a runner mismatch
   * requires an explicit token-bound decision.
   *
   * The breaker-reset branch (worker-phase1 §1.3) is gone with the breaker
   * itself (worker-phase2 §2): there is no repo-level block for a resume to
   * clear. Turning `auto_advance` back on stays the user's explicit ▶.
   *
   * @param {string} workspace
   * @param {string} attempt_id - The prior (paused/failed/orphaned) attempt.
   * @param {{ continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any, instructions?: string, preclaimed?: boolean }} [continuation]
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>}
   */
  async function resume(workspace, attempt_id, continuation = {}) {
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
    if (prior.cleanup_diagnosis === true) {
      if (isOrphanedLegacyCleanupDiagnosis(attempt_id, prior)) {
        retireLegacyCleanupDiagnosis(workspace, attempt_id);
      }
      return { ok: false, reason: 'legacy_cleanup_diagnosis_retired' };
    }
    if (discardActive(q, { bead_id: prior.bead_id, attempt_id })) {
      return { ok: false, reason: 'discard_in_progress' };
    }
    const bead_id = prior.bead_id;
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    const quickfix_cleanup_resume =
      prior.status === 'failed' &&
      prior.quickfix_lane === true &&
      typeof prior.quickfix_landing?.reason === 'string' &&
      prior.quickfix_landing.reason.length > 0 &&
      (prior.quickfix_landing.cursor === 'branch_cleanup' ||
        prior.quickfix_landing.cursor === 'parent_close');
    // worktree_missing: the bead worktree is gone (resume never recreates it).
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : true;
    if (!quickfix_cleanup_resume && !wt_present) {
      return { ok: false, reason: 'worktree_missing' };
    }
    // bead_running: a live (or store-recorded running) attempt for the same bead.
    if (claimed.has(bead_id) && continuation.preclaimed !== true) {
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
    if (quickfix_cleanup_resume) {
      if (settling.has(attempt_id)) {
        return { ok: false, reason: 'bead_running' };
      }
      claimed.add(bead_id);
      settling.add(attempt_id);
      try {
        const result = await settleQuickfixLanding(
          workspace,
          attempt_id,
          bead_id,
          prior.workflow_mode_prior ?? null,
          prior.target_base || 'main',
          repo.length > 0
        );
        return result.ok
          ? { ok: true, attempt_id }
          : { ok: false, reason: result.reason };
      } finally {
        settling.delete(attempt_id);
        claimed.delete(bead_id);
      }
    }
    /** @type {BeadSnapshot} */
    let snap;
    try {
      snap = await deps.bd.snapshotBead(bead_id);
    } catch {
      recordSkipReason(workspace, bead_id, 'bd_snapshot_failed');
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const adm = await checkAdmission(
      snap,
      typeof prior.base_oid === 'string' && prior.base_oid.length > 0
        ? prior.base_oid
        : undefined
    );
    if (!adm.ok) {
      const reason = adm.reason || 'git_error';
      recordSkipReason(workspace, bead_id, reason);
      return { ok: false, reason };
    }
    const default_prompt = resumePrompt(bead_id, prior.status ?? null);
    const prompt =
      typeof continuation.instructions === 'string' &&
      continuation.instructions.length > 0
        ? `${default_prompt}\n\n사용자가 이번 재개에 추가 지침을 남겼다. 아래 지침이 위 기본 절차와 충돌하면 지침을 우선하라.\n${continuation.instructions}`
        : default_prompt;
    const result = await relaunchFromAttempt(workspace, prior, {
      prompt,
      conflict_resolution: prior.conflict_resolution === true,
      completion_resume: true,
      repair_operation_id: prior.repair_operation_id ?? null,
      continuation: continuation.continuation,
      decision_token: continuation.decision_token,
      bead_snapshot: snap
    });
    if (result.ok) {
      const cleared = deps.store.clearAdmission(workspace, bead_id);
      if (cleared && cleared.ok) {
        notifyChanged(workspace);
      }
    }
    return result;
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
   * dangerous moment). After push the session records HOW it resolved each
   * conflict as a `bd comment` — the merge commit shows the outcome but not
   * the intent judgment, and that narrative is what the human merge click
   * reviews.
   *
   * The exact-delta self-review is stated because it is now a MERGE
   * PRECONDITION, not advice (UI-vzyh §2): a resolver mutation overrides the
   * ancestry rule, and `head-review.js` refuses the merge with
   * `resolver_self_review_not_approved` unless this session reviewed its own
   * prior→result delta and the queue recorded the APPROVE. No external
   * reviewer is dispatched for it, so a session that skips it strands its own
   * PR.
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
      'push 전에 해소 전 head부터 해소 후 head까지의 exact delta를 네가 직접 self-review하고 verdict를 남겨라 — 이 self-review는 머지의 필수조건이고 외부 리뷰어는 디스패치되지 않는다.',
      `push 후 \`bd comment ${bead_id}\`로 해소 내역을 기록하라 — 충돌 난 파일과 각각을 어떤 방식으로(어느 쪽을 살렸는지, 어떻게 양쪽 의도를 합쳤는지) 해소했는지 간결히.`,
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
   * @param {{ queue_bead_id: string, wait_ms: number, manual_authority?: boolean }|null} [resolution_wait]
   * @param {{ continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }} [continuation]
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>}
   */
  async function resolveConflict(
    workspace,
    bead_id,
    resolution_wait = null,
    continuation = {}
  ) {
    if (
      resolution_wait &&
      resolution_wait.manual_authority !== true &&
      queueConflictBlocked(workspace, resolution_wait.queue_bead_id, bead_id)
    ) {
      return { ok: false, reason: 'worker_sessions_busy' };
    }
    const q = deps.store.snapshot(workspace);
    if (discardActive(q, { bead_id })) {
      return { ok: false, reason: 'discard_in_progress' };
    }
    /** @type {any|null} */
    let source = null;
    let source_at = -1;
    for (const a of Object.values(q.attempts || {})) {
      if (!a || a.bead_id !== bead_id || !isImplementationAttempt(a)) {
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
      conflict_resolution: true,
      resolution_wait,
      continuation: continuation.continuation,
      decision_token: continuation.decision_token
    });
  }

  /**
   * Return the one durable source attempt that owns a completion root. Repair
   * attempts always carry an operation id; accepting a latest same-Bead record
   * here would let an unrelated administrative attempt rewrite provenance.
   *
   * @param {Record<string, any>} queue
   * @param {string} root_bead_id
   * @returns {{ source: any|null, reason: string|null }}
   */
  function completionRootAnchor(queue, root_bead_id) {
    const anchors = Object.values(queue.attempts || {}).filter(
      (attempt) =>
        attempt &&
        attempt.bead_id === root_bead_id &&
        attempt.completion_root_id === root_bead_id &&
        attempt.completion_op_id === null
    );
    if (anchors.length === 0) {
      return { source: null, reason: 'completion_source_anchor_missing' };
    }
    if (anchors.length > 1) {
      return { source: null, reason: 'completion_source_anchor_ambiguous' };
    }
    return { source: anchors[0], reason: null };
  }

  /**
   * The most recent same-Bead attempt that captured a resumable transcript.
   * A newer pre-session failure must not hide an older valid conversation.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {any}
   */
  function lastSessionAttemptOf(workspace, bead_id) {
    /** @type {any} */
    let last = null;
    const attempts = deps.store.snapshot(workspace).attempts || {};
    for (const attempt of Object.values(attempts)) {
      const a = /** @type {any} */ (attempt);
      if (
        a &&
        a.bead_id === bead_id &&
        isImplementationAttempt(a) &&
        typeof a.session_id === 'string' &&
        a.session_id.length > 0
      ) {
        last = a;
      }
    }
    return last;
  }

  /**
   * The latest attempt minted by this external-conflict dispatcher. A generic
   * historical attempt must not turn the first external resolution into a
   * relaunch; only a prior external resolver establishes that lineage.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {any}
   */
  function lastExternalConflictAttemptOf(workspace, bead_id) {
    /** @type {any} */
    let last = null;
    const attempts = deps.store.snapshot(workspace).attempts || {};
    for (const attempt of Object.values(attempts)) {
      const a = /** @type {any} */ (attempt);
      if (a && a.bead_id === bead_id && a.external_conflict === true) {
        last = a;
      }
    }
    return last;
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
   * @param {{ queue_bead_id: string, wait_ms: number, manual_authority?: boolean }|null} [resolution_wait]
   * @param {{ continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }} [continuation]
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function dispatchExternalConflict(
    workspace,
    bead_id,
    target_base,
    resolution_wait = null,
    continuation = {}
  ) {
    if (
      resolution_wait &&
      resolution_wait.manual_authority !== true &&
      queueConflictBlocked(workspace, resolution_wait.queue_bead_id, bead_id)
    ) {
      return { ok: false, reason: 'worker_sessions_busy' };
    }
    const q = deps.store.snapshot(workspace);
    if (discardActive(q, { bead_id })) {
      return { ok: false, reason: 'discard_in_progress' };
    }
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
    const prior_attempt = lastExternalConflictAttemptOf(workspace, bead_id);
    // The first observed external conflict has no durable source session and
    // remains a fresh dispatch. A later conflict is attempt-derived and must
    // cross the same current-resolution / mismatch boundary as every other
    // relaunch.
    if (prior_attempt) {
      return relaunchFromAttempt(workspace, prior_attempt, {
        prompt: conflictPrompt(bead_id, base),
        conflict_resolution: true,
        external_conflict: true,
        resolution_wait,
        resume:
          typeof prior_attempt.session_id === 'string' &&
          prior_attempt.session_id.length > 0,
        continuation: continuation.continuation,
        decision_token: continuation.decision_token
      });
    }
    /** @type {string} */
    let runner_name;
    /** @type {string|null} */
    let launch_model;
    /** @type {string|null} */
    let launch_effort;
    /** @type {string} */
    let launch_speed;
    /** @type {string[]} */
    let stamped_keys;
    /** @type {Record<string, string|null>|null} */
    let exec_values;
    /** @type {string|null} */
    let preset_id;
    /** @type {number|null} */
    let preset_revision;
    const resolved_exec = resolveDispatchSettings(
      workspace,
      snap,
      await readWorkspaceAccountsLayer(workspace)
    );
    if (!resolved_exec.ok) {
      return { ok: false, reason: resolved_exec.reason };
    }
    const exec = resolved_exec.exec;
    if (exec.invalid_reason) {
      return { ok: false, reason: exec.invalid_reason };
    }
    runner_name = exec.runner;
    launch_model = exec.orchestration_model ?? null;
    launch_effort = exec.orchestration_effort ?? null;
    launch_speed = exec.orchestration_speed ?? 'default';
    stamped_keys = exec.stamped_keys;
    exec_values = execValuesFor(exec);
    preset_id = resolved_exec.preset_id;
    preset_revision = resolved_exec.preset_revision;
    const restore_capture = await captureExecRestoreValues(
      bead_id,
      stamped_keys
    );
    if (!restore_capture.ok) {
      return { ok: false, reason: 'exec_restore_capture_failed' };
    }
    const exec_restore_values = restore_capture.values;
    const receipt_baseline = await captureReceiptBaseline(bead_id);
    const attempt_id = makeAttemptId(bead_id);
    const prior = snap.workflow_mode ?? null;
    // External-PR resolution work owns no waiting-lane entry, so it launches
    // lane-free: only the bead_running fence applies.
    const serial_launch = acquireLaneLaunch(workspace, {
      bead_id,
      lineage_id: bead_id,
      serial_lane_id: null
    });
    if (!serial_launch.ok) {
      return { ok: false, reason: serial_launch.reason };
    }
    const serial_lease = serial_launch.lease;
    try {
      snap = await deps.bd.snapshotBead(bead_id);
    } catch {
      serial_lease.release();
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    const revalidated = serial_lease.revalidate({
      bead_id,
      lineage_id: bead_id,
      serial_lane_id: null
    });
    if (!revalidated.ok) {
      serial_lease.release();
      return { ok: false, reason: revalidated.reason };
    }
    try {
      // An external-PR resolution is a CONFLICT session (spec §2 적용 범위: every
      // session except a disposition), and its job — merge the base INTO the
      // branch, verify, push the branch — never writes the base. It is exempt
      // only from the DETECTION layer, and for an observation reason rather than
      // a policy one: this dispatch pins no `base_oid`, so there is no reference
      // point to compare against afterwards (§5 잔여 3). That makes prevention the
      // only layer covering it, which is an argument for installing the hook, not
      // against it. Installed here, before `claimed.add` and the durable
      // pre-record — the same "before the first state change" rule.
      if (
        !installGuardHook({
          workspace,
          attempt_id,
          repo,
          target_base: base
        })
      ) {
        serial_lease.release();
        return { ok: false, reason: 'guard_hook_install_failed' };
      }

      claimed.add(bead_id);

      // DURABLE pre-record before the first metadata write, exactly as the queue
      // dispatch does it: a crash between here and spawn leaves a record a
      // restart can revert the stamps from. `base_oid` stays null — this dispatch
      // creates no worktree and passes no admission, so there is no pinned base
      // to honestly record.
      const prerecord_started_at = resolution_wait ? now() : null;
      const attempt = {
        attempt_id,
        bead_id,
        repo,
        target_base: base,
        base_oid: null,
        runner: runner_name,
        model: launch_model,
        effort: launch_effort,
        speed: launch_speed,
        workflow_mode_prior: prior,
        workflow_mode_source_prior: snap.workflow_mode_source ?? null,
        receipt_baseline,
        exec_default_preset_id: preset_id,
        exec_default_preset_revision: preset_revision,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values,
        exec_restore_values,
        conflict_resolution: true,
        external_conflict: true,
        started_at: prerecord_started_at,
        status: 'running',
        pid: null
      };
      const prerecorded = resolution_wait
        ? prerecordResolutionAttempt(workspace, attempt, resolution_wait)
        : prerecordAttempt(workspace, attempt);
      if (!prerecorded) {
        serial_lease.release();
        removeGuardHook(workspace, attempt_id);
        claimed.delete(bead_id);
        notifyChanged(workspace);
        return { ok: false, reason: 'attempt_prerecord_failed' };
      }
      serial_lease.handoff();
    } finally {
      serial_lease.release();
    }

    let mode_ok = false;
    try {
      mode_ok = (await stampWorkerWorkflowMode(bead_id)).ok;
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
        await revertWorkflowMode(
          bead_id,
          prior,
          workflowModeSourcePriorOf(workspace, attempt_id)
        );
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      removeGuardHook(workspace, attempt_id);
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'workflow_mode_record_failed' };
    }

    const launched = await launchSession({
      workspace,
      attempt_id,
      bead_id,
      repo,
      target_base: base,
      base_oid: null,
      runner_name,
      model: launch_model,
      effort: launch_effort,
      speed: launch_speed,
      accounts: resolved_exec.accounts,
      account_sources: resolved_exec.account_sources,
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
      spawnBead: { id: bead_id, prompt: conflictPrompt(bead_id, base) }
    });
    if (!launched.ok) {
      return { ok: false, reason: launched.reason || 'spawn_failed' };
    }
    return { ok: true, attempt_id };
  }

  /**
   * Shared continuation resolver for every attempt-derived launch. It snapshots
   * current settings and validates any cross-runner decision before the hook,
   * claim, ancestor settlement, child record, metadata overlay, or spawn.
   *
   * `disposition` marks the child as a REVISE-disposition attempt (UI-hs11
   * §3.3), which changes three things: the record carries the kind (so the
   * termination path takes the disposition verdict), the session runs WITHOUT
   * the PR-submit directive, and `cwd`/`resume` may point it at the shared
   * target_base checkout instead of the bead worktree.
   *
   * @param {string} workspace
   * @param {any} prior - The source attempt record (guards already passed).
   * @param {any} [options]
   * @returns {Promise<any>}
   */
  async function resolveContinuationForAttempt(workspace, prior, options = {}) {
    const bead_id = prior.bead_id;
    const recorded_prior_runner =
      typeof prior.runner === 'string' && prior.runner.length > 0
        ? prior.runner
        : null;
    const prior_exec_complete = !!(
      prior.exec_values &&
      typeof prior.exec_values === 'object' &&
      EXEC_SETTING_KEYS.every(
        (key) =>
          Object.hasOwn(prior.exec_values, key) &&
          (typeof prior.exec_values[key] === 'string' ||
            prior.exec_values[key] === null)
      )
    );
    const prior_runner_available =
      recorded_prior_runner !== null && RUNNERS.includes(recorded_prior_runner);
    let bead_snapshot = options.bead_snapshot;
    if (!bead_snapshot) {
      try {
        bead_snapshot = await deps.bd.snapshotBead(bead_id);
      } catch {
        return { ok: false, reason: 'bd_snapshot_failed' };
      }
    }
    const resolved = resolveDispatchSettings(
      workspace,
      bead_snapshot,
      await readWorkspaceAccountsLayer(workspace)
    );
    if (!resolved.ok) {
      return { ok: false, reason: resolved.reason };
    }
    if (resolved.exec.invalid_reason) {
      return { ok: false, reason: resolved.exec.invalid_reason };
    }
    const prior_runner = recorded_prior_runner ?? resolved.exec.runner;
    const requested_decision = options.continuation || 'auto';
    if (
      !['auto', 'prior_session', 'fresh_current'].includes(requested_decision)
    ) {
      return { ok: false, reason: 'bad_request' };
    }
    const current_exec_values = execValuesFor(resolved.exec);
    const decision_token = {
      source_attempt_id: prior.attempt_id,
      source_attempt_digest: continuationDigest({
        runner: prior_runner,
        session_id: prior.session_id ?? null,
        exec_values: prior.exec_values ?? null,
        resumed_from: prior.resumed_from ?? null
      }),
      observed_queue_revision: deps.store.snapshot(workspace).revision,
      preset_id: resolved.preset_id,
      preset_revision: resolved.preset_revision,
      effective_exec_digest: continuationDigest({
        runner: resolved.exec.runner,
        model: resolved.exec.orchestration_model ?? null,
        effort: resolved.exec.orchestration_effort ?? null,
        speed: resolved.exec.orchestration_speed ?? 'default',
        exec_values: current_exec_values,
        accounts: resolved.accounts
      })
    };
    const runner_mismatch = prior_runner !== resolved.exec.runner;
    // A choice is meaningful only while the provider boundary still exists.
    // Drift back to the prior runner discards the stale choice and follows the
    // ordinary current-settings path without reopening a dialog.
    const decision =
      requested_decision !== 'auto' && !runner_mismatch
        ? 'auto'
        : requested_decision;
    const mismatch = () => ({
      reason: 'runner_mismatch',
      continuation_required: true,
      prior_available:
        options.resume !== false &&
        prior_exec_complete &&
        prior_runner_available &&
        typeof prior.session_id === 'string' &&
        prior.session_id.length > 0,
      prior: {
        runner: recorded_prior_runner,
        model: prior.model ?? null,
        effort: prior.effort ?? null,
        speed: prior.speed ?? 'default'
      },
      current: {
        runner: resolved.exec.runner,
        model: resolved.exec.orchestration_model ?? null,
        effort: resolved.exec.orchestration_effort ?? null,
        speed: resolved.exec.orchestration_speed ?? 'default'
      },
      decision_token
    });
    if (decision === 'auto' && runner_mismatch) {
      return {
        ok: false,
        reason: 'runner_mismatch',
        continuation_mismatch: mismatch()
      };
    }
    if (
      decision !== 'auto' &&
      !matchesDecisionToken(options.decision_token, decision_token)
    ) {
      return {
        ok: false,
        reason: 'continuation_decision_stale',
        continuation_mismatch: mismatch()
      };
    }
    const use_prior = decision === 'prior_session';
    if (
      use_prior &&
      (!prior_exec_complete ||
        !prior_runner_available ||
        options.resume === false ||
        typeof prior.session_id !== 'string' ||
        prior.session_id.length === 0)
    ) {
      return {
        ok: false,
        reason: 'prior_session_unavailable',
        continuation_mismatch: mismatch()
      };
    }
    if (
      decision === 'auto' &&
      options.resume !== false &&
      (typeof prior.session_id !== 'string' || prior.session_id.length === 0)
    ) {
      return { ok: false, reason: 'no_session_id' };
    }
    const runner_name = use_prior
      ? /** @type {string} */ (prior_runner)
      : resolved.exec.runner;
    const launch_model = use_prior
      ? (prior.model ?? null)
      : (resolved.exec.orchestration_model ?? null);
    const launch_effort = use_prior
      ? (prior.effort ?? null)
      : (resolved.exec.orchestration_effort ?? null);
    const launch_speed = use_prior
      ? (prior.speed ?? 'default')
      : (resolved.exec.orchestration_speed ?? 'default');
    const exec_values = use_prior ? prior.exec_values : current_exec_values;
    if (options.capture_restore === false) {
      return {
        ok: true,
        bead_snapshot,
        decision,
        decision_token,
        runner_mismatch
      };
    }
    const candidate_stamped_keys = use_prior
      ? EXEC_SETTING_KEYS
      : resolved.exec.stamped_keys;
    const restore_capture = await captureExecRestoreValues(
      bead_id,
      candidate_stamped_keys
    );
    if (!restore_capture.ok) {
      return { ok: false, reason: 'exec_restore_capture_failed' };
    }
    const stamped_keys = use_prior
      ? EXEC_SETTING_KEYS.filter(
          (key) => restore_capture.values[key] !== exec_values[key]
        )
      : candidate_stamped_keys;
    /** @type {Record<string, string|null>} */
    const exec_restore_values = {};
    for (const key of stamped_keys) {
      exec_restore_values[key] = restore_capture.values[key];
    }
    return {
      ok: true,
      bead_snapshot,
      decision,
      runner_name,
      launch_model,
      launch_effort,
      launch_speed,
      exec_values,
      accounts: resolved.accounts,
      account_sources: resolved.account_sources,
      exec_restore_values,
      stamped_keys,
      decision_token,
      runner_mismatch,
      preset_id: use_prior
        ? (prior.exec_default_preset_id ?? null)
        : resolved.preset_id,
      preset_revision: use_prior
        ? (prior.exec_default_preset_revision ?? null)
        : resolved.preset_revision,
      continuation_mode:
        decision === 'fresh_current' || options.resume === false
          ? 'fresh'
          : 'session'
    };
  }

  /**
   * Re-read every token input after restore-value capture. This is the final
   * async preflight before the guard hook, so a changed source, queue revision,
   * Bead value, or preset cannot cross into a state-changing relaunch.
   *
   * @param {string} workspace
   * @param {any} prior
   * @param {any} options
   * @param {any} continuation
   */
  async function revalidateContinuationForAttempt(
    workspace,
    prior,
    options,
    continuation
  ) {
    const live_prior =
      deps.store.snapshot(workspace).attempts?.[prior.attempt_id];
    if (!live_prior) {
      return { ok: false, reason: 'continuation_source_stale' };
    }
    const latest = await resolveContinuationForAttempt(workspace, live_prior, {
      ...options,
      bead_snapshot: null,
      capture_restore: false
    });
    if (!latest.ok) {
      return latest;
    }
    if (
      !matchesDecisionToken(continuation.decision_token, latest.decision_token)
    ) {
      return { ok: false, reason: 'continuation_settings_changed' };
    }
    return {
      ok: true,
      expected_revision: latest.decision_token.observed_queue_revision
    };
  }

  /**
   * @param {string} workspace
   * @param {any} prior
   * @param {any} options
   */
  async function relaunchFromAttempt(workspace, prior, options) {
    const continuation = await resolveContinuationForAttempt(
      workspace,
      prior,
      options
    );
    if (!continuation.ok) {
      return continuation;
    }
    return relaunchResolvedAttempt(workspace, prior, options, continuation);
  }

  /**
   * Resolve the ordered fallback for a disappeared resume worktree.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {any} options
   * @returns {Promise<'repair_target_resolved'|'fresh'|'worktree_missing'>}
   */
  async function missingRelaunchDecision(
    workspace,
    attempt_id,
    bead_id,
    options
  ) {
    const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
    let target_resolved = null;
    if (typeof attempt?.repair_operation_id === 'string') {
      if (
        !deps.repairSession ||
        typeof deps.repairSession.judge !== 'function'
      ) {
        return 'worktree_missing';
      }
      try {
        const judged = await deps.repairSession.judge({
          workspace,
          operation_id: attempt.repair_operation_id
        });
        target_resolved = judged.verdict === 'chain_closed';
      } catch {
        return 'worktree_missing';
      }
    } else {
      try {
        const snapshot = await deps.bd.snapshotBead(bead_id);
        target_resolved = snapshot.status === 'closed';
      } catch {
        return 'worktree_missing';
      }
    }
    if (target_resolved) {
      return 'repair_target_resolved';
    }
    if (options.repair_operation_id || options.disposition) {
      return 'fresh';
    }
    return 'worktree_missing';
  }

  /**
   * @param {string} workspace
   * @param {any} prior
   * @param {any} options
   * @param {any} continuation
   */
  async function relaunchResolvedAttempt(
    workspace,
    prior,
    options,
    continuation
  ) {
    const bead_id = prior.bead_id;
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    const attempt_id = prior.attempt_id;
    const {
      bead_snapshot,
      runner_name,
      launch_model,
      launch_effort,
      launch_speed,
      exec_values,
      accounts,
      account_sources,
      exec_restore_values,
      stamped_keys,
      preset_id,
      preset_revision,
      continuation_mode
    } = continuation;
    const new_attempt_id = makeAttemptId(bead_id);
    const target_base =
      typeof prior.target_base === 'string' ? prior.target_base : 'main';
    const quickfix_lane = prior.quickfix_lane === true;
    const serial_launch = acquireLaneLaunch(workspace, {
      bead_id,
      lineage_id: serialLineageId(prior) || bead_id,
      serial_lane_id: prior.serial_lane_id ?? null,
      continuation: true
    });
    if (!serial_launch.ok) {
      return { ok: false, reason: serial_launch.reason };
    }
    const serial_lease = serial_launch.lease;
    const revalidated = await revalidateContinuationForAttempt(
      workspace,
      prior,
      options,
      continuation
    );
    if (!revalidated.ok) {
      serial_lease.release();
      return revalidated;
    }
    continuation.expected_revision = revalidated.expected_revision;
    const prior_wf =
      typeof bead_snapshot.workflow_mode === 'string'
        ? bead_snapshot.workflow_mode
        : null;
    const prior_wf_source =
      typeof bead_snapshot.workflow_mode_source === 'string'
        ? bead_snapshot.workflow_mode_source
        : null;
    const receipt_baseline = await captureReceiptBaseline(bead_id);
    const relaunch_attempt = {
      attempt_id: new_attempt_id,
      bead_id,
      repo,
      target_base,
      base_oid: prior.base_oid ?? null,
      runner: runner_name,
      model: launch_model,
      effort: launch_effort,
      speed: launch_speed,
      workflow_mode_prior: prior_wf,
      workflow_mode_source_prior: prior_wf_source,
      receipt_baseline,
      exec_default_preset_id: preset_id,
      exec_default_preset_revision: preset_revision,
      exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
      exec_values,
      exec_restore_values,
      serial_lane_id: prior.serial_lane_id ?? null,
      quickfix_lane,
      resumed_from: attempt_id,
      continuation_mode,
      conflict_resolution: options.conflict_resolution,
      external_conflict:
        options.external_conflict === true || prior.external_conflict === true,
      disposition: options.disposition ?? null,
      disposition_receipt: options.disposition_receipt ?? null,
      disposition_resume: options.disposition
        ? continuation_mode === 'session'
        : false,
      disposition_prompt: options.disposition ? options.prompt : null,
      repair_operation_id: options.repair_operation_id ?? null,
      started_at: options.resolution_wait ? now() : null,
      status: 'running',
      pid: null
    };

    try {
      if (
        !options.disposition &&
        !quickfix_lane &&
        !installGuardHook({
          workspace,
          attempt_id: new_attempt_id,
          repo,
          target_base
        })
      ) {
        serial_lease.release();
        return { ok: false, reason: 'guard_hook_install_failed' };
      }
      if (
        !prerecordRelaunchAttempt(
          workspace,
          prior,
          relaunch_attempt,
          options.completion_resume === true,
          options.resolution_wait ?? null,
          continuation.expected_revision
        )
      ) {
        serial_lease.release();
        removeGuardHook(workspace, new_attempt_id);
        claimed.delete(bead_id);
        notifyChanged(workspace);
        return { ok: false, reason: 'attempt_prerecord_failed' };
      }
      serial_lease.handoff();
    } finally {
      serial_lease.release();
    }
    if (
      prior.base_drift == null &&
      (await settleBaseDrift(workspace, attempt_id))
    ) {
      deps.store.updateAttempt(workspace, {
        attempt_id: new_attempt_id,
        patch: {
          status: 'failed',
          cause: 'base_landing_detected',
          finished_at: now()
        }
      });
      removeGuardHook(workspace, attempt_id);
      if (!options.disposition && !quickfix_lane) {
        removeGuardHook(workspace, new_attempt_id);
      }
      notifyChanged(workspace);
      await reportCompletionSettlement(workspace, new_attempt_id, null);
      return { ok: false, reason: 'base_landing_detected' };
    }
    paused_done.delete(attempt_id);
    removeGuardHook(workspace, attempt_id);
    claimed.add(bead_id);

    let mode_ok = false;
    try {
      mode_ok = (await stampWorkerWorkflowMode(bead_id)).ok;
    } catch (err) {
      log('resume workflow_mode set/readback failed for %s: %o', bead_id, err);
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
        await revertWorkflowMode(
          bead_id,
          prior_wf,
          workflowModeSourcePriorOf(workspace, new_attempt_id)
        );
      } catch {
        // The failed attempt remains the durable recovery evidence.
      }
      removeGuardHook(workspace, new_attempt_id);
      claimed.delete(bead_id);
      notifyChanged(workspace);
      await reportCompletionSettlement(workspace, new_attempt_id, null);
      return { ok: false, reason: 'workflow_mode_record_failed' };
    }

    let wt_path =
      options.cwd ||
      (typeof deps.worktree.pathFor === 'function'
        ? deps.worktree.pathFor(repo, bead_id)
        : '');
    let resume_session_id =
      continuation_mode === 'session' ? prior.session_id : null;
    if (wt_path.length > 0 && wt_path !== repo) {
      const owned = await proveOwnedWorktree(repo, bead_id);
      if (owned.ok) {
        wt_path = owned.path;
      } else {
        const decision = await missingRelaunchDecision(
          workspace,
          new_attempt_id,
          bead_id,
          options
        );
        if (decision === 'fresh') {
          wt_path = repo;
          resume_session_id = null;
          deps.store.updateAttempt(workspace, {
            attempt_id: new_attempt_id,
            patch: {
              continuation_mode: 'fresh',
              disposition_resume: false
            }
          });
        } else {
          const refusal_input = {
            workspace,
            attempt_id: new_attempt_id,
            bead_id,
            repo,
            prior_wf,
            stamped_keys
          };
          await finalizeLaunchRefusal(refusal_input, decision, true);
          await reportCompletionSettlement(workspace, new_attempt_id, null);
          return { ok: false, reason: decision };
        }
      }
    }
    /** @type {any} */
    const launch_input = {
      workspace,
      attempt_id: new_attempt_id,
      bead_id,
      repo,
      target_base,
      base_oid: prior.base_oid ?? null,
      runner_name,
      model: launch_model,
      effort: launch_effort,
      speed: launch_speed,
      accounts,
      account_sources,
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
      verify_worktree: true,
      resume_session_id,
      disposition: options.disposition ?? null,
      quickfix_lane
    };
    let launched = await launchSession(launch_input);
    if (!launched.ok && launched.reason === 'worktree_missing') {
      const decision = await missingRelaunchDecision(
        workspace,
        new_attempt_id,
        bead_id,
        options
      );
      if (decision === 'fresh') {
        deps.store.updateAttempt(workspace, {
          attempt_id: new_attempt_id,
          patch: {
            continuation_mode: 'fresh',
            disposition_resume: false
          }
        });
        launch_input.wt_path = repo;
        launch_input.resume_session_id = null;
        launched = await launchSession(launch_input);
      } else {
        await finalizeLaunchRefusal(launch_input, decision, true);
        await reportCompletionSettlement(workspace, new_attempt_id, null);
        return { ok: false, reason: decision };
      }
    }
    if (!launched.ok) {
      await reportCompletionSettlement(workspace, new_attempt_id, null);
      return { ok: false, reason: launched.reason || 'spawn_failed' };
    }
    return { ok: true, attempt_id: new_attempt_id };
  }

  /**
   * Return the launcher's physical slot occupants: in-process claims plus
   * durable running attempts whose process cannot be proven dead.
   *
   * @param {Record<string, any>} q
   * @returns {Set<string>}
   */
  function occupiedBeadIds(q) {
    const occupied = new Set(claimed);
    for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (!a || a.status !== 'running' || !isSchedulerOwned(a)) {
        continue;
      }
      if (
        running.has(attempt_id) ||
        settling.has(attempt_id) ||
        claimed.has(a.bead_id)
      ) {
        continue;
      }
      if (!isDeadAttempt(a)) {
        occupied.add(a.bead_id);
      }
    }
    return occupied;
  }

  /**
   * Keep automatic conflict resolvers within the launcher's physical slot cap.
   * Manual authority bypasses this predicate at the caller; same-Bead claims
   * remain owned by the dispatcher's `bead_running` guard.
   *
   * The queue ROOT is never exempted. In a nested saga the root and the
   * current subject are different beads, so excusing the root hides a slot it
   * genuinely spends and overbooks the cap the launcher enforces. Only the
   * subject is excused, and that cannot overbook: a subject already holding a
   * slot is refused by `bead_running` before any session starts, so the excused
   * slot is never actually handed out.
   *
   * @param {string} workspace
   * @param {string} queue_bead_id - The saga root, counted like any other bead.
   * @param {string} subject_bead_id
   */
  function queueConflictBlocked(workspace, queue_bead_id, subject_bead_id) {
    const q = deps.store.snapshot(workspace);
    const occupied = occupiedBeadIds(q);
    occupied.delete(subject_bead_id);
    return slotsOf(q) - occupied.size <= 0;
  }

  /**
   * Prove that the canonical owned worktree still has the Bead branch checked
   * out. A transcript-missing fallback is fresh only after this proof; an
   * arbitrary directory is never accepted as same-Bead continuity.
   *
   * @param {string} repo
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, path: string }|{ ok: false, reason: string }>}
   */
  async function proveOwnedWorktree(repo, bead_id) {
    if (
      typeof deps.worktree.exists !== 'function' ||
      typeof deps.worktree.pathFor !== 'function' ||
      typeof deps.gitRun !== 'function' ||
      !deps.worktree.exists(repo, bead_id)
    ) {
      return { ok: false, reason: 'worktree_missing' };
    }
    const wt_path = deps.worktree.pathFor(repo, bead_id);
    if (typeof wt_path !== 'string' || wt_path.length === 0) {
      return { ok: false, reason: 'worktree_unowned' };
    }
    let branch;
    try {
      branch = await deps.gitRun(['rev-parse', '--abbrev-ref', 'HEAD'], {
        cwd: wt_path
      });
    } catch {
      return { ok: false, reason: 'worktree_branch_unreadable' };
    }
    if (branch.code !== 0) {
      return { ok: false, reason: 'worktree_branch_unreadable' };
    }
    if (String(branch.stdout || '').trim() !== bead_id) {
      return { ok: false, reason: 'worktree_branch_mismatch' };
    }
    return { ok: true, path: wt_path };
  }

  /**
   * @param {string} root_bead_id
   * @param {string} bead_id
   * @param {'resume_root'|'dispatch_repair'} mode
   * @returns {string}
   */
  function completionRepairPrompt(root_bead_id, bead_id, mode) {
    return mode === 'resume_root'
      ? `Bead ${bead_id}의 자동머지 실패를 같은 구현 세션 문맥에서 수정하고 feature branch PR을 다시 제출하라. 완료 의도 root는 ${root_bead_id}다.`
      : `Bead ${root_bead_id}의 pinned-base 실패를 linked repair Bead ${bead_id}에서 수정하고 feature branch PR을 제출하라.`;
  }

  /**
   * Fail one prerecorded completion attempt before its process starts.
   *
   * @param {{ workspace: string, attempt_id: string, bead_id: string, repo: string, reason: string, prior_wf: string|null, stamped_keys?: string[], remove_worktree?: boolean, dismissed?: boolean }} input
   */
  async function failPreparedCompletion(input) {
    const {
      workspace,
      attempt_id,
      bead_id,
      repo,
      reason,
      prior_wf,
      stamped_keys,
      remove_worktree,
      dismissed
    } = input;
    if (Array.isArray(stamped_keys) && stamped_keys.length > 0) {
      await revertExecStamps(
        bead_id,
        stamped_keys,
        execRestoreValuesOf(workspace, attempt_id)
      );
    }
    try {
      await revertWorkflowMode(
        bead_id,
        prior_wf,
        workflowModeSourcePriorOf(workspace, attempt_id)
      );
    } catch {
      // Durable attempt failure and completion op remain the recovery evidence.
    }
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'failed',
        cause: reason,
        finished_at: now(),
        ...(dismissed === true ? { dismissed_at: now() } : {})
      }
    });
    if (remove_worktree === true) {
      try {
        await deps.worktree.remove({ repo, bead_id });
      } catch {
        // The failed attempt remains durable; reconciliation owns residue.
      }
    }
    removeGuardHook(workspace, attempt_id);
    usage_receipts.removeEmptyUsageReceiptInbox(workspace, attempt_id);
    delegation_monitor.removeEmptyDelegationMonitorDir(workspace, attempt_id);
    claimed.delete(bead_id);
    notifyLifecycle('attemptFailed', {
      bead_id,
      cause: reason,
      repo,
      cause_detail: null
    });
    notifyChanged(workspace);
    await reportCompletionSettlement(workspace, attempt_id, null);
    return { ok: false, reason };
  }

  /**
   * Dispatch one coordinator-owned repair attempt. The supplied attempt id is
   * journaled atomically with the root budget before any worktree, metadata, or
   * process effect. Replaying an already-prerecorded operation adopts it and
   * never spends or spawns again.
   *
   * @param {string} workspace
   * @param {{ root_bead_id: string, op: any, log_path?: string|null, continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }} input
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, adopted?: boolean, continuation_mismatch?: any }>}
   */
  async function dispatchCompletionRepair(workspace, input) {
    const { root_bead_id, op } = input;
    if (
      !op ||
      (op.kind !== 'resume_root' && op.kind !== 'dispatch_repair') ||
      op.status !== 'prepared' ||
      typeof op.op_id !== 'string' ||
      typeof op.attempt_id !== 'string' ||
      !op.failure_key
    ) {
      return { ok: false, reason: 'completion_op_invalid' };
    }
    const q = deps.store.snapshot(workspace);
    const intent = q.completion_intents?.[root_bead_id];
    if (!intent) {
      return { ok: false, reason: 'completion_intent_missing' };
    }
    const existing = q.attempts?.[op.attempt_id];
    if (existing) {
      const recorded_failure = existing.completion_failure_key;
      const same =
        existing.completion_root_id === root_bead_id &&
        existing.completion_op_id === op.op_id &&
        existing.completion_mode === op.kind &&
        recorded_failure?.stage === op.failure_key.stage &&
        recorded_failure?.reason === op.failure_key.reason &&
        recorded_failure?.subject_sha === op.failure_key.subject_sha &&
        recorded_failure?.base_sha === op.failure_key.base_sha &&
        recorded_failure?.result_digest === op.failure_key.result_digest;
      const active_same =
        intent.active_op?.op_id === op.op_id &&
        intent.active_op?.attempt_id === op.attempt_id;
      return same && active_same
        ? { ok: true, attempt_id: op.attempt_id, adopted: true }
        : {
            ok: false,
            reason: same
              ? 'completion_attempt_not_active'
              : 'completion_attempt_collision'
          };
    }
    const active_op = intent.active_op;
    const replaces_create =
      op.kind === 'dispatch_repair' &&
      active_op?.kind === 'create_repair' &&
      active_op.status === 'observed' &&
      active_op.repair_bead_id === op.repair_bead_id &&
      active_op.failure_key?.stage === op.failure_key.stage &&
      active_op.failure_key?.reason === op.failure_key.reason &&
      active_op.failure_key?.subject_sha === op.failure_key.subject_sha &&
      active_op.failure_key?.base_sha === op.failure_key.base_sha &&
      active_op.failure_key?.result_digest === op.failure_key.result_digest;
    if (intent.active_op !== null && !replaces_create) {
      return { ok: false, reason: 'completion_op_in_flight' };
    }
    const expected_subject_sha =
      intent.subject?.merged_sha || intent.subject?.head_sha;
    if (
      expected_subject_sha &&
      expected_subject_sha !== op.failure_key.subject_sha
    ) {
      return { ok: false, reason: 'completion_subject_sha_stale' };
    }
    if (
      intent.subject?.base_sha &&
      intent.subject.base_sha !== op.failure_key.base_sha
    ) {
      return { ok: false, reason: 'completion_base_sha_stale' };
    }

    const anchor = completionRootAnchor(q, root_bead_id);
    if (!anchor.source) {
      return {
        ok: false,
        reason: anchor.reason || 'completion_lineage_missing'
      };
    }
    const source = anchor.source;
    if (
      !source ||
      typeof source.repo !== 'string' ||
      source.repo.length === 0
    ) {
      return { ok: false, reason: 'completion_lineage_missing' };
    }
    const mode = /** @type {'resume_root'|'dispatch_repair'} */ (op.kind);
    const bead_id =
      mode === 'resume_root' ? intent.subject.bead_id : op.repair_bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      return { ok: false, reason: 'repair_bead_missing' };
    }
    if (bead_id !== root_bead_id && !intent.repair_bead_ids.includes(bead_id)) {
      return { ok: false, reason: 'repair_bead_unowned' };
    }
    if (claimed.has(root_bead_id) || claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const attempt of Object.values(q.attempts || {})) {
      if (
        attempt &&
        (attempt.bead_id === root_bead_id || attempt.bead_id === bead_id) &&
        attempt.status === 'running'
      ) {
        return { ok: false, reason: 'bead_running' };
      }
    }

    const repo = source.repo;
    const target_base =
      typeof intent.target_base === 'string' && intent.target_base.length > 0
        ? intent.target_base
        : source.target_base;
    if (typeof target_base !== 'string' || target_base.length === 0) {
      return { ok: false, reason: 'target_base_missing' };
    }
    /** @type {string} */
    let wt_path;
    /** @type {string|null} */
    let resume_session_id = null;
    /** @type {string|null} */
    let resumed_from = null;
    /** @type {string|null} */
    let prior_wf = source.workflow_mode_prior ?? null;
    /** @type {string|null} */
    let prior_wf_source = source.workflow_mode_source_prior ?? null;
    /** @type {string} */
    let runner_name;
    /** @type {string|null} */
    let launch_model;
    /** @type {string|null} */
    let launch_effort;
    /** @type {string} */
    let launch_speed;
    /** @type {string[]} */
    let stamped_keys;
    /** @type {Record<string, string|null>|null} */
    let exec_values;
    /** @type {{ claude: string|null, codex: string|null }} */
    let accounts;
    /** @type {AccountSources} */
    let account_sources;
    /** @type {string|null} */
    let preset_id;
    /** @type {number|null} */
    let preset_revision;
    /** @type {Record<string, string|null>} */
    let exec_restore_values = {};
    /** @type {'session'|'fresh'|null} */
    let continuation_mode = null;
    /** @type {number|undefined} */
    let continuation_expected_revision;
    /** @type {any|null} */
    let continuation_source = null;
    /** @type {any|null} */
    let continuation_resolution = null;
    /** @type {any|null} */
    let continuation_options = null;
    if (mode === 'resume_root') {
      const owned = await proveOwnedWorktree(repo, bead_id);
      if (!owned.ok) {
        return owned;
      }
      const resume_source = lastSessionAttemptOf(workspace, bead_id);
      if (!resume_source) {
        return { ok: false, reason: 'no_session_id' };
      }
      continuation_options = {
        continuation: input.continuation,
        decision_token: input.decision_token
      };
      const continuation = await resolveContinuationForAttempt(
        workspace,
        resume_source,
        continuation_options
      );
      if (!continuation.ok) {
        return continuation;
      }
      continuation_source = resume_source;
      continuation_resolution = continuation;
      wt_path = owned.path;
      resume_session_id =
        continuation.continuation_mode === 'session'
          ? resume_source.session_id
          : null;
      resumed_from = resume_source.attempt_id;
      prior_wf = continuation.bead_snapshot.workflow_mode ?? null;
      prior_wf_source = continuation.bead_snapshot.workflow_mode_source ?? null;
      runner_name = continuation.runner_name;
      launch_model = continuation.launch_model;
      launch_effort = continuation.launch_effort;
      launch_speed = continuation.launch_speed;
      stamped_keys = continuation.stamped_keys;
      exec_values = continuation.exec_values;
      accounts = continuation.accounts;
      account_sources = continuation.account_sources;
      exec_restore_values = continuation.exec_restore_values;
      preset_id = continuation.preset_id;
      preset_revision = continuation.preset_revision;
      continuation_mode = continuation.continuation_mode;
    } else {
      if (
        typeof deps.worktree.exists === 'function' &&
        deps.worktree.exists(repo, bead_id)
      ) {
        return { ok: false, reason: 'repair_worktree_exists' };
      }
      let repair_snap;
      try {
        repair_snap = await deps.bd.snapshotBead(bead_id);
      } catch {
        return { ok: false, reason: 'bd_snapshot_failed' };
      }
      if (repair_snap.repo !== repo) {
        return { ok: false, reason: 'repair_repo_mismatch' };
      }
      const resolved_exec = resolveDispatchSettings(
        workspace,
        repair_snap,
        await readWorkspaceAccountsLayer(workspace)
      );
      if (!resolved_exec.ok) {
        return { ok: false, reason: resolved_exec.reason };
      }
      const exec = resolved_exec.exec;
      if (exec.invalid_reason) {
        return { ok: false, reason: exec.invalid_reason };
      }
      prior_wf = repair_snap.workflow_mode ?? null;
      prior_wf_source = repair_snap.workflow_mode_source ?? null;
      runner_name = exec.runner;
      launch_model = exec.orchestration_model ?? null;
      launch_effort = exec.orchestration_effort ?? null;
      launch_speed = exec.orchestration_speed ?? 'default';
      stamped_keys = exec.stamped_keys;
      exec_values = execValuesFor(exec);
      accounts = resolved_exec.accounts;
      account_sources = resolved_exec.account_sources;
      const restore_capture = await captureExecRestoreValues(
        bead_id,
        stamped_keys
      );
      if (!restore_capture.ok) {
        return { ok: false, reason: 'exec_restore_capture_failed' };
      }
      for (const key of stamped_keys) {
        exec_restore_values[key] = restore_capture.values[key];
      }
      preset_id = resolved_exec.preset_id;
      preset_revision = resolved_exec.preset_revision;
      wt_path = '';
    }
    const receipt_baseline = await captureReceiptBaseline(bead_id);

    const attempt_id = op.attempt_id;
    const serial_launch = acquireLaneLaunch(workspace, {
      bead_id,
      lineage_id: root_bead_id,
      serial_lane_id: source.serial_lane_id ?? null,
      continuation: true
    });
    if (!serial_launch.ok) {
      return { ok: false, reason: serial_launch.reason };
    }
    const serial_lease = serial_launch.lease;
    if (continuation_source && continuation_resolution) {
      const revalidated = await revalidateContinuationForAttempt(
        workspace,
        continuation_source,
        continuation_options,
        continuation_resolution
      );
      if (!revalidated.ok) {
        serial_lease.release();
        return revalidated;
      }
      continuation_expected_revision = revalidated.expected_revision;
    }
    try {
      if (!installGuardHook({ workspace, attempt_id, repo, target_base })) {
        serial_lease.release();
        return { ok: false, reason: 'guard_hook_install_failed' };
      }
      claimed.add(bead_id);
      let prerecord;
      try {
        prerecord = deps.store.beginRepairOp(workspace, {
          root_bead_id,
          op,
          expected_revision: continuation_expected_revision,
          attempt: {
            attempt_id,
            bead_id,
            repo,
            target_base,
            base_oid: op.failure_key.base_sha,
            runner: runner_name,
            model: launch_model,
            effort: launch_effort,
            speed: launch_speed,
            workflow_mode_prior: prior_wf,
            workflow_mode_source_prior: prior_wf_source,
            receipt_baseline,
            exec_default_preset_id: preset_id,
            exec_default_preset_revision: preset_revision,
            exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
            exec_values,
            exec_restore_values,
            serial_lane_id: source.serial_lane_id ?? null,
            resumed_from,
            continuation_mode,
            completion_root_id: root_bead_id,
            completion_op_id: op.op_id,
            completion_mode: mode,
            completion_failure_key: op.failure_key,
            status: 'running',
            pid: null
          }
        });
      } catch {
        serial_lease.release();
        removeGuardHook(workspace, attempt_id);
        claimed.delete(bead_id);
        return { ok: false, reason: 'attempt_prerecord_failed' };
      }
      if (!prerecord.ok) {
        serial_lease.release();
        removeGuardHook(workspace, attempt_id);
        claimed.delete(bead_id);
        return { ok: false, reason: 'attempt_prerecord_failed' };
      }
      serial_lease.handoff();
    } finally {
      serial_lease.release();
    }
    notifyChanged(workspace);

    if (mode === 'dispatch_repair') {
      try {
        const created = await deps.worktree.add({
          repo,
          bead_id,
          base: op.failure_key.base_sha
        });
        if (
          created.base_oid !== op.failure_key.base_sha ||
          created.branch !== bead_id
        ) {
          return await failPreparedCompletion({
            workspace,
            attempt_id,
            bead_id,
            repo,
            reason: 'repair_worktree_pin_mismatch',
            prior_wf,
            remove_worktree: true
          });
        }
        wt_path = created.path;
      } catch {
        return await failPreparedCompletion({
          workspace,
          attempt_id,
          bead_id,
          repo,
          reason: 'repair_worktree_failed',
          prior_wf,
          remove_worktree: true
        });
      }
    }

    let mode_ok = false;
    try {
      mode_ok = (await stampWorkerWorkflowMode(bead_id)).ok;
    } catch {
      mode_ok = false;
    }
    if (!mode_ok) {
      return failPreparedCompletion({
        workspace,
        attempt_id,
        bead_id,
        repo,
        reason: 'workflow_mode_record_failed',
        prior_wf,
        remove_worktree: mode === 'dispatch_repair'
      });
    }

    const completion_repair = {
      mode,
      stage: op.failure_key.stage,
      reason: op.failure_key.reason,
      subject_sha: op.failure_key.subject_sha,
      base_sha: op.failure_key.base_sha,
      result_digest: op.failure_key.result_digest,
      log_path: input.log_path ?? null
    };
    if (mode === 'resume_root') {
      const owned = await proveOwnedWorktree(repo, bead_id);
      if (!owned.ok) {
        const reason = await missingRelaunchDecision(
          workspace,
          attempt_id,
          bead_id,
          {}
        );
        return failPreparedCompletion({
          workspace,
          attempt_id,
          bead_id,
          repo,
          reason,
          prior_wf,
          stamped_keys,
          remove_worktree: false,
          dismissed: true
        });
      }
      wt_path = owned.path;
    }
    const launched = await launchSession({
      workspace,
      attempt_id,
      bead_id,
      repo,
      target_base,
      base_oid: op.failure_key.base_sha,
      runner_name,
      model: launch_model,
      effort: launch_effort,
      speed: launch_speed,
      accounts,
      account_sources,
      prior_wf,
      stamped_keys,
      wt_path,
      launch_kind: 'completion_repair',
      verify_worktree: mode === 'resume_root',
      resume_session_id,
      completion_repair,
      spawnBead: {
        id: bead_id,
        prompt: completionRepairPrompt(root_bead_id, bead_id, mode)
      }
    });
    if (!launched.ok) {
      if (mode === 'resume_root' && launched.reason === 'worktree_missing') {
        const reason = await missingRelaunchDecision(
          workspace,
          attempt_id,
          bead_id,
          {}
        );
        return failPreparedCompletion({
          workspace,
          attempt_id,
          bead_id,
          repo,
          reason,
          prior_wf,
          stamped_keys,
          remove_worktree: false,
          dismissed: true
        });
      }
      if (mode === 'dispatch_repair') {
        try {
          await deps.worktree.remove({ repo, bead_id });
        } catch {
          // Attempt failure is durable; reconciliation owns remaining residue.
        }
      }
      await reportCompletionSettlement(workspace, attempt_id, null);
      return { ok: false, reason: launched.reason || 'spawn_failed' };
    }
    deps.store.advanceCompletionOp(workspace, {
      root_bead_id,
      op_id: op.op_id,
      status: 'dispatched'
    });
    notifyChanged(workspace);
    return { ok: true, attempt_id };
  }

  /**
   * Dispatch the REVISE-disposition (finding acceptance) session for a parked
   * bead (UI-hs11 §3.3). It reuses the relaunch machinery — a child attempt
   * carrying `resumed_from` and the selected current/prior execution snapshot
   * — and differs in exactly three ways: the record carries
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
   * @param {{ bead_id: string, attempt_id: string, prompt: string, prior_receipt?: string|null, resume?: boolean, continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }} input
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
    const resume =
      input.resume !== false &&
      input.continuation !== 'fresh_current' &&
      wt_present &&
      has_session;
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
      resume,
      continuation: input.continuation,
      decision_token: input.decision_token
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
    gcUsageReceiptInboxes(workspace);
    dispatch_refused.clear();
    await tickPass(workspace);
  }

  /**
   * Mark that another round is needed WITHOUT awaiting the drain. The dispatch
   * refusal paths call this from inside the drain's own `Promise.all`, so
   * awaiting {@link tickPass} there would be a self-wait: the pass would block
   * on its own completion. Only entries from outside the drain may await.
   */
  function requestRescan() {
    rescan = true;
  }

  /**
   * The coalesced dispatch drain — the entry every pass goes through.
   *
   * A caller awaits this as "slots refilled" (the stop/pause/cleanup paths
   * return `{ ok: true }` right after `await tick(...)`), so an overlapping call
   * cannot return early: it marks a rescan and returns the SAME drain promise,
   * which resolves only once the round it joined has run. Overlap therefore
   * costs the caller nothing but the serialization it needs.
   *
   * `finally` clears the flag on the failure path too — a pass that throws must
   * not leave the guard permanently occupied.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  function tickPass(workspace) {
    if (draining) {
      rescan = true;
      return draining;
    }
    draining = (async () => {
      try {
        do {
          rescan = false;
          await runPass(workspace);
        } while (rescan);
      } finally {
        draining = null;
      }
    })();
    return draining;
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
  async function runPass(workspace) {
    let q = deps.store.snapshot(workspace);
    if (!q.auto_advance) {
      return;
    }
    const paused_beads = leafPausedBeads(q);
    const active_beads = activeBeadIdsFrom(q);

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
    const occupied = occupiedBeadIds(q);
    let free = slotsOf(q) - occupied.size;
    // Candidate order (UI-04vo §2): every parallel-lane entry first, then the
    // head of each UNOCCUPIED serial lane. Non-head serial entries are never
    // candidates — the exclusive chain in front of them is what a serial lane
    // means — and an occupied lane contributes nothing until its lineage
    // merges, is cleaned up, or is discarded.
    const lane_occupancy = activeLaneLineages(q);
    /** @type {Array<{ bead_id: string, serial_lane_id: string|null }>} */
    const candidates = q.queue.map(
      (/** @type {{ bead_id: string }} */ entry) => ({
        bead_id: entry.bead_id,
        serial_lane_id: /** @type {string|null} */ (null)
      })
    );
    for (const lane of q.serial_lanes || []) {
      const head = lane.entries[0];
      if (!head) {
        continue;
      }
      if (laneOccupiedByOther(lane_occupancy, lane.id, head.bead_id)) {
        continue;
      }
      candidates.push({ bead_id: head.bead_id, serial_lane_id: lane.id });
    }
    for (const entry of candidates) {
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
        paused_beads.has(entry.bead_id) ||
        active_beads.has(entry.bead_id)
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
    const live_snapshot = deps.store.snapshot(workspace);
    const live_queue = new Set([
      ...live_snapshot.queue.map(
        (/** @type {{ bead_id: string }} */ e) => e.bead_id
      ),
      ...(live_snapshot.serial_lanes || []).flatMap(
        (/** @type {{ entries: Array<{ bead_id: string }> }} */ lane) =>
          lane.entries.map((e) => e.bead_id)
      )
    ]);
    const live_active = activeBeadIdsFrom(live_snapshot);
    // `claimed` is re-read here too: the coalescing guard already removes the
    // overlap that let two passes claim one bead, and this is the thin line
    // behind it — a bead claimed since this pass's scan never launches twice.
    const to_launch = to_dispatch.filter(
      (d) =>
        live_queue.has(d.bead_id) &&
        !claimed.has(d.bead_id) &&
        !live_active.has(d.bead_id)
    );
    /** @type {Array<{ bead_id: string, lease: LaneLaunchLease }>} */
    const launches = [];
    for (const d of to_launch) {
      // The lane is re-resolved from the LIVE snapshot: a drag during the scan
      // moves the head-only judgment with the bead, and dispatch revalidates
      // against its own re-read again.
      const reservation = acquireLaneLaunch(workspace, {
        bead_id: d.bead_id,
        lineage_id: d.bead_id,
        serial_lane_id: waitingLaneOf(live_snapshot, d.bead_id)
      });
      if (!reservation.ok) {
        continue;
      }
      claimed.add(d.bead_id);
      launches.push({ bead_id: d.bead_id, lease: reservation.lease });
    }
    await Promise.all(
      launches.map(async (launch) => {
        try {
          await dispatch(workspace, launch.bead_id, launch.lease);
        } catch (err) {
          launch.lease.release();
          claimed.delete(launch.bead_id);
          log('dispatch failed for %s: %o', launch.bead_id, err);
          requestRescan();
        }
      })
    );
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
      await revertWorkflowMode(
        entry.bead_id,
        entry.prior,
        workflowModeSourcePriorOf(workspace, attempt_id)
      );
    } catch {
      // Best-effort: bd may be down; the terminal record already reflects it.
    }
    await revertExecStamps(
      entry.bead_id,
      execStampedKeysOf(workspace, attempt_id),
      execRestoreValuesOf(workspace, attempt_id)
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
    const snapshot = deps.store.snapshot(workspace);
    const attempt = snapshot.attempts?.[attempt_id];
    if (
      discardActive(snapshot, {
        attempt_id,
        bead_id: attempt?.bead_id ?? null
      })
    ) {
      return { ok: false, reason: 'discard_in_progress' };
    }
    if (deps.processController) {
      return pauseDurably(workspace, attempt_id);
    }
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
   * Resolve a verified identity from the durable record. Legacy attempts may
   * infer `pgid = pid`, but the controller still has to prove every observed
   * value before signaling.
   *
   * @param {any} attempt
   * @returns {{ pid: number, pgid: number, started_at: number }|null}
   */
  function processIdentityOf(attempt) {
    const identity = attempt?.process_identity;
    if (
      identity &&
      Number.isInteger(identity.pid) &&
      Number.isInteger(identity.pgid) &&
      Number.isFinite(identity.started_at)
    ) {
      return identity;
    }
    if (
      attempt &&
      Number.isInteger(attempt.pid) &&
      Number.isFinite(attempt.started_at)
    ) {
      return {
        pid: attempt.pid,
        pgid: attempt.pid,
        started_at: attempt.started_at
      };
    }
    return null;
  }

  /**
   * Persist a fail-closed control result without changing attempt status.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} phase
   * @param {string} reason
   */
  function failPauseControl(workspace, attempt_id, phase, reason) {
    const result = deps.store.advanceAttemptControl(workspace, {
      attempt_id,
      expected_phase: phase,
      next_phase: 'failed',
      last_error: reason
    });
    notifyChanged(workspace);
    return {
      ok: false,
      reason: result.ok ? reason : 'control_persist_failed'
    };
  }

  /**
   * Drive a persisted pause from any restart-safe phase.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function drivePauseControl(workspace, attempt_id) {
    const process_controller = deps.processController;
    if (!process_controller) {
      return { ok: false, reason: 'process_controller_missing' };
    }
    let attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
    if (!attempt || !attempt.control || attempt.control.kind !== 'pause') {
      return { ok: false, reason: 'control_missing' };
    }
    if (attempt.control.phase === 'done') {
      return { ok: true };
    }
    if (attempt.control.phase === 'failed') {
      return {
        ok: false,
        reason: attempt.control.last_error || 'control_failed'
      };
    }
    const identity = processIdentityOf(attempt);
    if (!identity) {
      return failPauseControl(
        workspace,
        attempt_id,
        attempt.control.phase,
        'identity_unknown'
      );
    }
    if (
      attempt.control.phase === 'requested' ||
      attempt.control.phase === 'signaled'
    ) {
      const live_entry = running.get(attempt_id);
      if (live_entry) {
        // The handle can resolve as soon as TERM lands. Mark the pause before
        // the controller signals so onSessionDone cannot classify that
        // expected exit as a session failure while termination is in flight.
        stopped.add(attempt_id);
      }
      let terminated;
      try {
        terminated = await process_controller.terminate(identity);
      } catch {
        terminated = {
          ok: false,
          state: /** @type {const} */ ('unknown'),
          reason: 'terminate_failed'
        };
      }
      if (!terminated.ok && terminated.state !== 'recycled') {
        if (live_entry && running.has(attempt_id)) {
          stopped.delete(attempt_id);
        }
        return failPauseControl(
          workspace,
          attempt_id,
          attempt.control.phase,
          terminated.reason || `identity_${terminated.state}`
        );
      }
      if (attempt.control.phase === 'requested') {
        const signaled = deps.store.advanceAttemptControl(workspace, {
          attempt_id,
          expected_phase: 'requested',
          next_phase: 'signaled'
        });
        if (!signaled.ok) {
          return { ok: false, reason: 'control_persist_failed' };
        }
      }
      const signaled_attempt =
        deps.store.snapshot(workspace).attempts[attempt_id];
      if (signaled_attempt.control?.phase === 'signaled') {
        const persisted = deps.store.advanceAttemptControl(workspace, {
          attempt_id,
          expected_phase: 'signaled',
          next_phase: 'terminated'
        });
        if (!persisted.ok) {
          return { ok: false, reason: 'control_persist_failed' };
        }
      }
    }
    attempt = deps.store.snapshot(workspace).attempts[attempt_id];
    if (attempt.control?.phase !== 'terminated') {
      return { ok: false, reason: 'control_phase_invalid' };
    }
    const observed = process_controller.probe(identity);
    if (observed.state !== 'gone' && observed.state !== 'recycled') {
      return failPauseControl(
        workspace,
        attempt_id,
        'terminated',
        observed.reason || `identity_${observed.state}`
      );
    }

    const entry = running.get(attempt_id);
    if (entry) {
      stopped.add(attempt_id);
      const done = entry.handle.done;
      paused_done.set(attempt_id, done);
      const forgetDone = () => paused_done.delete(attempt_id);
      done.then(forgetDone, forgetDone);
      running.delete(attempt_id);
      claimed.delete(entry.bead_id);
    }
    deps.sessionMonitors?.stop(workspace, attempt_id);
    const completed = deps.store.completeAttemptControl(workspace, {
      attempt_id,
      finished_at: now(),
      patch: usagePatch(workspace, attempt_id)
    });
    if (!completed.ok) {
      return { ok: false, reason: 'control_persist_failed' };
    }
    await revertStamps(workspace, attempt_id, {
      bead_id: attempt.bead_id,
      prior: attempt.workflow_mode_prior ?? null
    });
    notifyChanged(workspace);
    await tick(workspace);
    return { ok: true };
  }

  /**
   * Persist a pause request before signaling, or resume its durable phase when
   * the process-local runner handle was lost across a server restart.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function pauseDurably(workspace, attempt_id) {
    const snapshot = deps.store.snapshot(workspace);
    const attempt = snapshot.attempts?.[attempt_id];
    if (
      discardActive(snapshot, {
        attempt_id,
        bead_id: attempt?.bead_id ?? null
      })
    ) {
      return { ok: false, reason: 'discard_in_progress' };
    }
    if (!attempt || attempt.status !== 'running') {
      return { ok: false, reason: 'not_running' };
    }
    if (
      typeof attempt.session_id !== 'string' ||
      attempt.session_id.length === 0
    ) {
      return { ok: false, reason: 'no_session_id' };
    }
    if (attempt.control === null) {
      const requested = deps.store.requestAttemptControl(workspace, {
        attempt_id,
        kind: 'pause'
      });
      if (!requested.ok) {
        return {
          ok: false,
          reason: requested.reason || 'control_persist_failed'
        };
      }
      notifyChanged(workspace);
    }
    return drivePauseControl(workspace, attempt_id);
  }

  /**
   * Resume every nonterminal persisted control before ordinary dead-attempt
   * reconciliation is allowed to classify the same process.
   *
   * @param {string} workspace
   */
  async function recoverControls(workspace) {
    const snapshot = deps.store.snapshot(workspace);
    const discard_attempts = new Set(
      Object.values(snapshot.discard_operations || {})
        .filter((operation) => /** @type {any} */ (operation).phase !== 'done')
        .map((operation) => /** @type {any} */ (operation).attempt_id)
        .filter((attempt_id) => typeof attempt_id === 'string')
    );
    for (const [attempt_id, attempt] of Object.entries(
      snapshot.attempts || {}
    )) {
      if (discard_attempts.has(attempt_id)) {
        continue;
      }
      const phase = /** @type {any} */ (attempt).control?.phase;
      if (
        phase === 'requested' ||
        phase === 'signaled' ||
        phase === 'terminated'
      ) {
        await drivePauseControl(workspace, attempt_id);
      }
    }
  }

  /**
   * Suppress the expected live-handle exit as soon as a durable discard fence
   * exists. The runner remains in the running map until archive/termination
   * completes, so its slot is still occupied during the safety-critical copy.
   *
   * @param {string|null|undefined} attempt_id
   */
  function canDiscardAttempt(attempt_id) {
    return (
      typeof attempt_id !== 'string' ||
      attempt_id.length === 0 ||
      !settling.has(attempt_id)
    );
  }

  /**
   * @param {string|null|undefined} attempt_id
   */
  function fenceDiscardAttempt(attempt_id) {
    if (typeof attempt_id !== 'string' || attempt_id.length === 0) {
      return false;
    }
    if (!canDiscardAttempt(attempt_id)) {
      return false;
    }
    stopped.add(attempt_id);
    return true;
  }

  /**
   * Release scheduler-local ownership only after the process controller proved
   * the group absent and the monitor drained its final log lines.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function finalizeDiscardAttempt(workspace, attempt_id) {
    if (!canDiscardAttempt(attempt_id)) {
      return { ok: false, reason: 'attempt_settling' };
    }
    const attempt = deps.store.snapshot(workspace).attempts?.[attempt_id];
    if (!attempt) {
      return { ok: false, reason: 'attempt_not_found' };
    }
    const entry = running.get(attempt_id);
    if (entry) {
      stopped.add(attempt_id);
      const done = entry.handle.done;
      paused_done.set(attempt_id, done);
      const forgetDone = () => paused_done.delete(attempt_id);
      done.then(forgetDone, forgetDone);
      running.delete(attempt_id);
      claimed.delete(entry.bead_id);
    }
    deps.sessionMonitors?.stop(workspace, attempt_id);
    if (await settleBaseDrift(workspace, attempt_id)) {
      return { ok: false, reason: 'base_landing_detected' };
    }
    const updated = deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'discarded',
        cause: null,
        control: null,
        finished_at: now(),
        ...usagePatch(workspace, attempt_id)
      }
    });
    if (!updated.ok) {
      return { ok: false, reason: 'attempt_persist_failed' };
    }
    await revertStamps(workspace, attempt_id, {
      bead_id: attempt.bead_id,
      prior: attempt.workflow_mode_prior ?? null
    });
    notifyChanged(workspace);
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
    const initial = deps.store.snapshot(workspace);
    if (
      discardActive(initial, {
        attempt_id,
        bead_id: initial.attempts?.[attempt_id]?.bead_id ?? null
      })
    ) {
      return false;
    }
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
    // The ⏸/■ settlement for the one record that reaches no other observer
    // (UI-8mvc §3, implementation review 2026-08-03): a `paused` attempt whose
    // `onSessionDone` died with the previous server is not `running`, so
    // reconcile never disposes of it, and this discard would clear its branch —
    // the detection layer's only evidence — unobserved. Guarded on the ABSENT
    // handle on purpose: while `pending_done` is held the process may still be
    // writing, and that case settles through its own `done`.
    if (!pending_done && (await settleBaseDrift(workspace, attempt_id))) {
      await failAttempt(
        workspace,
        attempt_id,
        rec.bead_id,
        rec.workflow_mode_prior ?? null,
        'base_landing_detected',
        { reason: 'base_landing_detected', command: null }
      );
      removeGuardHook(workspace, attempt_id);
      notifyChanged(workspace);
      await tick(workspace);
      return true;
    }
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
    // The one termination that reaches neither `onSessionDone` nor
    // `disposeDeadAttempt`: a `paused` record discarded after a restart, whose
    // process this server never held (UI-8mvc §5). Guarded on the ABSENT handle
    // for the same reason the settlement above is (UI-1xcd §4, implementation
    // review 2026-08-04): while `pending_done` is held the process may still be
    // pushing, and its `onSessionDone` settles and then removes the hook in its
    // own `finally` — removing it here would delete that settlement's evidence.
    if (!pending_done) {
      removeGuardHook(workspace, attempt_id);
    }
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
    staleWorkContinue,
    staleWorkRecheck,
    stop,
    pause,
    resume,
    resolveConflict,
    dispatchExternalConflict,
    queueConflictBlocked,
    dispatchReviseFix,
    dispatchCompletionRepair,
    dispatchRepoOperationRepair,
    canDiscardAttempt,
    fenceDiscardAttempt,
    finalizeDiscardAttempt,
    recoverControls,
    reconcile,
    sweepClosedQueue,
    activeBeadIds,
    staleWorkActionInFlight,
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
