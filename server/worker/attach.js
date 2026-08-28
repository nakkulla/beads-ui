/**
 * Live worker dispatch wiring (spec §5.1–§5.3) — the ONE production module that
 * turns the Phase 10 scheduler engine into a running auto-advance loop.
 *
 * Phase 10 shipped the scheduler + all its parts fully injectable and unit
 * tested, but nothing constructed them with REAL deps or drove `tick()`. This
 * module closes that seam:
 *
 *   - {@link createWorkerAttachment} builds a per-workspace scheduler wired to
 *     REAL deps — child_process spawn via `createRunner`, bd metadata + a bead
 *     snapshot reader over `server/bd.js`, the per-repo git worktree manager, the
 *     independent verifier, the shared session-log broker, the process-wide
 *     locks singleton, and the PID probe the scheduler's reconcile judges
 *     detached sessions with. EVERYTHING is injectable so tests pass fakes
 *     (never a real spawn).
 *
 * Registration model (chosen for consistency + test hermeticity): attachments
 * are created EAGERLY at server startup, one per active workspace, by
 * {@link initWorkerRuntime}. They are NEVER created lazily by a ws subscribe or
 * toggle, so a test that only exercises the ws handlers (and never calls
 * `initWorkerRuntime`) has no registered attachment and {@link tickWorkerQueue}
 * / {@link stopWorkerAttempt} are inert no-ops — no real bd/spawn is reachable.
 * A workspace registered after startup gets its worker loop on the next server
 * start (acceptable for the single-canonical-workspace deployment).
 *
 * @import { BeadSnapshot } from './scheduler.js'
 */
import { execFileSync, spawn } from 'node:child_process';
import path from 'node:path';
import {
  isWorkerIneligible,
  workerLabels
} from '../../app/utils/worker-eligibility.js';
import { kvGetJson, runBdJsonProjected, runShell } from '../bd.js';
import { getConfig } from '../config.js';
import { debug } from '../logging.js';
import { createPoller } from '../poller.js';
import { listAccounts as listClaudeAccounts } from '../routes/claude-usage.js';
import { listAccounts as listCodexAccounts } from '../routes/codex-usage.js';
import { createRuntimeIdentity } from '../runtime-identity.js';
import { resolveSpecId } from '../spec-id.js';
import { watchDb } from '../watcher.js';
import { parsePrNumber } from '../workflow-enrich.js';
import { requestWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import { createAccountCatalog } from './account-catalog.js';
import { validateAdmission } from './admission.js';
import { createAutoAdvanceRestoreController } from './auto-advance-restore.js';
import { createAutoMerge } from './auto-merge.js';
import { createBdMetadata } from './bd-metadata.js';
import { createBeadTimeline } from './bead-timeline.js';
import {
  createCompletionActionDriver,
  createCompletionIntentCoordinator
} from './completion-intent.js';
import { createDiscardCoordinator } from './discard-coordinator.js';
import { loadExecutionDefaults } from './execution-defaults.js';
import { readPushLog } from './guard-hook.js';
import { observedHeadSha } from './merge-candidates.js';
import { createMergeQueue } from './merge-queue.js';
import { createNotifier } from './notify.js';
import { createPrActions } from './pr-actions.js';
import { createPrPoller } from './pr-poller.js';
import { createProcessController } from './process-controller.js';
import { emitQueueChanged, onQueueChanged } from './queue-events.js';
import { createQuickfixLanding } from './quickfix-landing.js';
import {
  RECEIPT_METADATA_KEYS,
  checkReceipts,
  receiptDefaultsFrom,
  receiptProbeError
} from './receipt-check.js';
import { createRecoveryArchive } from './recovery-archive.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import { createRepoOperationMigration } from './repo-operation-migration.js';
import {
  effectiveVerifyPolicy,
  repoOpsDisplayFor
} from './repo-ops-display.js';
import { createRevertBuilder } from './revert-builder.js';
import {
  createReviewSession,
  isReviewAfterMergeReason
} from './review-session.js';
import { createReviseDisposition } from './revise-disposition.js';
import { createRunner } from './runner/index.js';
import { getWorkerRuntime } from './runtime.js';
import { createScheduler } from './scheduler.js';
import { createSessionMonitors } from './session-monitor.js';
import { baseUnresolvedReason, resolveTargetBase } from './target-base.js';
import { replayUsage } from './usage-replay.js';
import { runVerifyAtSha } from './verify-cmd.js';
import { createVerifier } from './verify.js';
import { createWorktreeManager } from './worktree.js';

const log = debug('worker:attach');

/**
 * Cadence of the per-attachment reconcile pass
 * (worker-detached-session-reconcile §2). Sessions are detached, so a session
 * that outlived a restart ends with nobody holding its handle; only this timer
 * observes that end.
 *
 * A pass with no persisted `running` attempt costs one in-memory snapshot read,
 * and a dead attempt costs ONE `gh` observation before it stops being
 * `running` — so 60 s buys bounded recovery latency at essentially no
 * steady-state cost.
 *
 * @type {number}
 */
export const RECONCILE_INTERVAL_SECONDS = 60;

/**
 * How long one target-base resolution stays good for the SCAN path
 * (worker-base-scope-alignment §1).
 *
 * Resolution ends in `git fetch`, and the tick scan resolves once per queued
 * bead, so an unmemoized resolver would fetch once per bead per tick. The
 * dispatch path re-resolves with `{ force: true }` immediately before the
 * worktree cut, so the memo only ever shortens the SCAN's view — never the one
 * a cut or an admission pin is taken from.
 *
 * @type {number}
 */
const BASE_RESOLUTION_TTL_MS = 20_000;

/**
 * The issue rows of a `bd ready --json` payload, tolerating either an array of
 * issues or a `{ ready: [...] }` / `{ issues: [...] }` object. `null` means the
 * payload carries NO recognizable row list, which is unreadable rather than
 * empty — bd emits a bare array (`[]` when nothing is ready, observed live), so
 * treating an unknown shape as "nothing is ready" would report a bd fault as a
 * queue full of not-ready beads.
 *
 * @param {unknown} json
 * @returns {any[]|null}
 */
function readyRows(json) {
  if (Array.isArray(json)) {
    return json;
  }
  if (json && typeof json === 'object') {
    const o = /** @type {any} */ (json);
    if (Array.isArray(o.ready)) {
      return o.ready;
    }
    if (Array.isArray(o.issues)) {
      return o.issues;
    }
  }
  return null;
}

/**
 * Extract the ready-issue id set from the rows of a `bd ready --json` payload.
 *
 * @param {any[]} arr
 * @returns {Set<string>}
 */
function readyIdSet(arr) {
  /** @type {Set<string>} */
  const ids = new Set();
  for (const it of arr) {
    const id = it && typeof it === 'object' ? it.id : it;
    if (typeof id === 'string' && id.length > 0) {
      ids.add(id);
    }
  }
  return ids;
}

/**
 * Build the live `bd` dependency the scheduler consumes: metadata
 * set/unset/read (from bd-metadata.js) PLUS `snapshotBead` which reads
 * `bd show --json` (status + exec-settings metadata) and `bd ready --json`
 * (authoritative runnable set) for the workspace.
 *
 * FAIL-VISIBLE: a non-zero exit or an unreadable payload from EITHER query
 * throws. Nothing dispatches either way — both scheduler call sites already
 * catch — but a swallowed failure used to reach the queue as a plain
 * not-ready bead, so a bd outage was indistinguishable from a dependency block.
 *
 * The base is NOT a bead-level fact (worker-base-scope-alignment §2): it comes
 * from `resolveBase`, the one repo-declaration resolver, re-read on every
 * snapshot so a dispatch reads the CURRENT declaration rather than one captured
 * at attachment construction. An unresolved base is carried as
 * `base_unresolved` instead of thrown, so the refusal names the failing
 * declaration step rather than an incidental `bd_snapshot_failed`.
 *
 * @param {{ cwd: string, repo: string, resolveBase: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>, runJson?: typeof runBdJsonProjected, run?: (args: string[], options?: any) => Promise<{ code: number, stdout: string, stderr: string }>, requestSnapshot?: (workspace: string, cause: string) => Promise<any>, onReadback?: (issue: unknown) => void }} config
 */
export function createLiveBd(config) {
  const cwd = config.cwd;
  const runJson = config.runJson || runBdJsonProjected;
  const meta = createBdMetadata({
    cwd,
    run: config.run,
    runJson: config.runJson,
    requestSnapshot: config.requestSnapshot || requestWorkspaceSnapshot,
    ...(config.onReadback ? { onReadback: config.onReadback } : {})
  });

  return {
    ...meta,
    /**
     * @param {string} bead_id
     * @returns {Promise<BeadSnapshot>}
     */
    async snapshotBead(bead_id) {
      const shown = await runJson('show', ['show', bead_id, '--json'], {
        cwd,
        expected_id: bead_id
      });
      if (!shown || shown.ok !== true) {
        throw new Error(
          `bd show ${bead_id} failed (${
            shown && shown.error ? shown.error.code : 'no result'
          })`
        );
      }
      const issue = /** @type {any} */ (shown.data);
      const md =
        issue.metadata && typeof issue.metadata === 'object'
          ? issue.metadata
          : {};
      const status = typeof issue.status === 'string' ? issue.status : '';
      const closed = status === 'closed' || status === 'resolved';

      const readyList = await runJson(
        'ready',
        ['ready', '--limit', '1000', '--json'],
        { cwd }
      );
      if (!readyList || readyList.ok !== true) {
        throw new Error(
          `bd ready failed (${
            readyList && readyList.error ? readyList.error.code : 'no result'
          })`
        );
      }
      const ready_rows = readyRows(readyList.data);
      if (!ready_rows) {
        throw new Error('bd ready returned an unreadable payload');
      }
      const ready_ids = readyIdSet(ready_rows);

      const ready = !closed && ready_ids.has(bead_id);
      const blocked = !closed && !ready_ids.has(bead_id);

      const route = typeof md.route === 'string' ? md.route : null;
      // Direct `blocks` blockers (UI-04vo §3). `bd show --json` lists the
      // issues this bead depends on; only `blocks` edges are scheduling
      // signals. `ready`/`blocked` judgment itself stays delegated to
      // `bd ready` above — these ids feed lane ordering and the display-only
      // wait-reason chip.
      /** @type {string[]} */
      const blocks_blockers = [];
      if (Array.isArray(issue.dependencies)) {
        for (const dep of issue.dependencies) {
          if (
            dep &&
            typeof dep === 'object' &&
            /** @type {any} */ (dep).dependency_type === 'blocks' &&
            typeof (/** @type {any} */ (dep).id) === 'string' &&
            /** @type {any} */ (dep).id.length > 0
          ) {
            blocks_blockers.push(/** @type {any} */ (dep).id);
          }
        }
      }
      // Presence rule for admission inputs: malformed values must reach the
      // validator as present-and-invalid, never collapse into absence.
      const spec = resolveSpecId(issue);
      const spec_id = spec.path || null;
      const spec_review = Object.hasOwn(md, 'spec_review')
        ? md.spec_review
        : undefined;
      const plan_path = Object.hasOwn(md, 'plan_path')
        ? md.plan_path
        : undefined;
      const plan_approval = Object.hasOwn(md, 'plan_approval')
        ? md.plan_approval
        : undefined;
      const last_checked_sha = Object.hasOwn(md, 'last_checked_sha')
        ? md.last_checked_sha
        : undefined;
      // The quick_fix self-review judgement inputs (UI-r7or §6.3). Same presence
      // rule: `issue_type` decides whether `baseline_red` is required and
      // `quick_fix_review` is the receipt itself, so a malformed value has to
      // reach the judge as present-and-invalid.
      const issue_type = Object.hasOwn(issue, 'issue_type')
        ? issue.issue_type
        : undefined;
      const quick_fix_review = Object.hasOwn(md, 'quick_fix_review')
        ? md.quick_fix_review
        : undefined;
      // The interactive session that implemented this bead (UI-p206 §5.1). Same
      // presence rule: the fork qualification has to see a malformed value as
      // present-and-invalid so it rejects with a reason instead of reading as a
      // bead that never named a session.
      const session_ref = Object.hasOwn(md, 'session_ref')
        ? md.session_ref
        : undefined;
      // 여기만 presence 규칙이 반대다. 다른 입력은 부재를 `undefined` 값으로
      // 눕혀도 되지만, admission은 `awaiting_user`를 **키 존재**로 판정한다
      // (값 형식을 보지 않는다). `undefined`를 항상 채우면 모든 Bead에서
      // `Object.hasOwn`이 참이 되어 전부 거부되므로, 키가 있을 때만 조건부
      // spread로 실어 보낸다.
      const awaiting_user_entry = Object.hasOwn(md, 'awaiting_user')
        ? { awaiting_user: md.awaiting_user }
        : {};

      const resolved = await config.resolveBase();

      return {
        ready,
        blocked,
        repo: config.repo,
        target_base: resolved.ok ? resolved.base : '',
        base_oid: resolved.ok ? resolved.base_oid : null,
        base_unresolved: resolved.ok ? null : baseUnresolvedReason(resolved),
        model:
          typeof md.orchestration_model === 'string'
            ? md.orchestration_model
            : undefined,
        effort:
          typeof md.orchestration_effort === 'string'
            ? md.orchestration_effort
            : undefined,
        orchestration_speed:
          typeof md.orchestration_speed === 'string'
            ? md.orchestration_speed
            : undefined,
        claude_account:
          typeof md.claude_account === 'string' ? md.claude_account : undefined,
        codex_account:
          typeof md.codex_account === 'string' ? md.codex_account : undefined,
        // The per-step exec keys (dotfiles-mqcj). They reach `policy.js` only
        // through this snapshot, so the bead-over-global layering and the
        // stamp/revert duty both depend on every one of them being read here.
        // The retired `review_model` is deliberately absent: no dual read.
        spec_review_model:
          typeof md.spec_review_model === 'string'
            ? md.spec_review_model
            : undefined,
        spec_review_effort:
          typeof md.spec_review_effort === 'string'
            ? md.spec_review_effort
            : undefined,
        impl_review_model:
          typeof md.impl_review_model === 'string'
            ? md.impl_review_model
            : undefined,
        impl_review_effort:
          typeof md.impl_review_effort === 'string'
            ? md.impl_review_effort
            : undefined,
        plan_review_model:
          typeof md.plan_review_model === 'string'
            ? md.plan_review_model
            : undefined,
        plan_review_effort:
          typeof md.plan_review_effort === 'string'
            ? md.plan_review_effort
            : undefined,
        impl_runtime:
          typeof md.impl_runtime === 'string' ? md.impl_runtime : undefined,
        impl_model:
          typeof md.impl_model === 'string' ? md.impl_model : undefined,
        impl_effort:
          typeof md.impl_effort === 'string' ? md.impl_effort : undefined,
        workflow_mode:
          typeof md.workflow_mode === 'string' ? md.workflow_mode : null,
        // Read from the SAME issue observation as `workflow_mode` (UI-bu6d §5):
        // the pair is stamped in one write and reverted in one, so a prior read
        // from a second source could restore a combination that never existed.
        workflow_mode_source:
          typeof md.workflow_mode_source === 'string'
            ? md.workflow_mode_source
            : null,
        route,
        status,
        title: typeof issue.title === 'string' ? issue.title : null,
        description:
          typeof issue.description === 'string' ? issue.description : null,
        labels: workerLabels(issue.labels),
        spec_id,
        spec_id_conflict: spec.conflict,
        spec_review,
        plan_path,
        plan_approval,
        last_checked_sha,
        issue_type,
        quick_fix_review,
        session_ref,
        ...awaiting_user_entry,
        deps: blocks_blockers,
        blocked_by: blocks_blockers
      };
    }
  };
}

/**
 * Real PID liveness + start-time probe for the scheduler's reconcile. Aliveness
 * via `kill(pid, 0)`; start time via `ps -o lstart=` (second resolution — the
 * reconcile's tolerance absorbs the coarseness). Fail-safe: any error yields
 * `{ alive:false }` so a genuinely-dead PID is disposed.
 *
 * @param {number|null} pid
 * @returns {{ alive: boolean, started_at: number|null }}
 */
export function defaultProbePid(pid) {
  if (pid == null) {
    return { alive: false, started_at: null };
  }
  let alive = false;
  try {
    process.kill(pid, 0);
    alive = true;
  } catch (err) {
    // EPERM means the process exists but is owned by another user → alive.
    alive = !!(err && /** @type {any} */ (err).code === 'EPERM');
  }
  if (!alive) {
    return { alive: false, started_at: null };
  }
  let started_at = null;
  try {
    const out = execFileSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
      encoding: 'utf8'
    });
    const t = Date.parse(out.trim());
    started_at = Number.isFinite(t) ? t : null;
  } catch {
    started_at = null;
  }
  return { alive, started_at };
}

/**
 * Build a live worker attachment for one workspace. All deps default to REAL
 * implementations; every one is overridable so tests inject fakes.
 *
 * @param {string} workspace_root - Absolute workspace root (also the git repo).
 * @param {{
 *   runtime?: ReturnType<typeof getWorkerRuntime>,
 *   repo?: string,
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   bd?: any,
 *   worktree?: any,
 *   verify?: any,
 *   gh?: any,
 *   makeRunner?: (name: string) => any,
 *   accountCatalog?: ReturnType<typeof createAccountCatalog>,
 *   spawn_impl?: (command: string, args: string[], options: any) => any,
 *   kill_impl?: (pid: number, signal?: NodeJS.Signals|number) => void,
 *   probePid?: (pid: number|null) => { alive: boolean, started_at: number|null },
 *   processController?: ReturnType<typeof createProcessController>,
 *   sessionMonitors?: any,
 *   quickfixLanding?: ReturnType<typeof createQuickfixLanding>,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   admission?: any,
 *   notify?: any,
 *   reviseDisposition?: any,
 *   reviewSession?: any,
 *   mergeQueue?: any,
 *   autoMerge?: any,
 *   completionIntent?: any,
 *   completionActionDriver?: any,
 *   discardCoordinator?: any,
 *   recoveryArchive?: ReturnType<typeof createRecoveryArchive>,
 *   timeline?: ReturnType<typeof createBeadTimeline>,
 *   repoOperationMigration?: { run: () => Promise<any> },
 *   autoAdvanceRestore?: ReturnType<typeof createAutoAdvanceRestoreController>,
 *   getSubscriberCount?: () => number,
 *   runJson?: typeof runBdJsonProjected,
 *   kvGet?: (workspace: string, key: string) => ReturnType<typeof kvGetJson>,
 *   watchBeads?: (root_dir: string, onChange: () => void) => { close: () => void }
 * }} [options]
 */
export function createWorkerAttachment(workspace_root, options = {}) {
  const runtime = options.runtime || getWorkerRuntime();
  const repo = options.repo || workspace_root;
  const baseGitRun =
    options.gitRun ||
    ((/** @type {string[]} */ args, /** @type {any} */ opts) =>
      runShell('git', args, opts));
  const gitRun = (/** @type {string[]} */ args, /** @type {any} */ opts = {}) =>
    baseGitRun(args, { ...opts, cwd: opts.cwd ?? repo });

  // The workspace's ONE timeline writer (record-timeline-retention §5). Built
  // here, beside the other attachment-owned collaborators, because the bead
  // history it owns is per workspace and its single-writer guarantee only holds
  // if nobody else constructs a second instance — producers (scheduler, merge
  // queue, repo-operation coordinator, ws handlers) receive THIS one.
  const timeline = options.timeline || createBeadTimeline({ workspace_root });
  // The queue store is process-wide while a timeline is per workspace, so the
  // attachment is what pairs them (record-timeline-retention §7): the store may
  // only transfer a processed-terminal attempt out of `queue.json` once THIS
  // workspace's terminal event is durable.
  runtime.queueStore.useTimeline(workspace_root, timeline);

  // The ONE base resolution seam (worker-base-scope-alignment §1/§2). The base
  // has exactly one source — the target repo's `docs/agents/repo-ops.toml`
  // declaration — and every consumer here (snapshot, admission, worktree cut,
  // preamble, merge gate) reads it through this function. The memo bounds the
  // scan path's fetch cost; `{ force: true }` is the dispatch path's fresh read.
  /** @type {{ at: number, result: import('./target-base.js').TargetBaseResult }|null} */
  let base_cache = null;
  /** @type {Promise<import('./target-base.js').TargetBaseResult>|null} */
  let base_inflight = null;
  const resolveBase =
    options.resolveBase ||
    (async (/** @type {{ force?: boolean }} */ opts = {}) => {
      const at = Date.now();
      if (base_inflight) {
        return base_inflight;
      }
      if (
        !opts.force &&
        base_cache &&
        at - base_cache.at < BASE_RESOLUTION_TTL_MS
      ) {
        return base_cache.result;
      }
      const resolution = resolveTargetBase({ repo, gitRun });
      base_inflight = resolution;
      try {
        const result = await resolution;
        base_cache = { at: Date.now(), result };
        if (!result.ok) {
          log(
            'target base unresolved for %s: %s/%s',
            repo,
            result.step,
            result.detail
          );
        }
        return result;
      } finally {
        if (base_inflight === resolution) {
          base_inflight = null;
        }
      }
    });

  // Every confirming `bd show` readback this attachment's metadata writer makes
  // is the freshest authoritative view of that bead in the process, so it feeds
  // the title cache directly (UI-eey2 §9.2) instead of letting the stepper wait
  // out the 5-minute TTL after a metadata write.
  const bd =
    options.bd ||
    createLiveBd({
      cwd: workspace_root,
      repo,
      resolveBase,
      ...(options.runJson ? { runJson: options.runJson } : {}),
      onReadback: (issue) => {
        runtime.titleCache.refreshFromIssue(workspace_root, issue);
      }
    });

  // Workspace-scoped admission accessor (worker-autorun-policy §1): the
  // scheduler validates candidates/dispatches through `validate` (base
  // defaults to the snapshot's resolved base_oid; dispatch pins the worktree
  // base_oid), and the ws place handler pre-checks through `check`.
  // The PR observation adapter (worker-phase2 §1). Shared with admission's
  // fail-closed `gh_unavailable` check: a workspace whose `gh` cannot observe a
  // PR can never produce a success verdict, so it must not dispatch at all.
  const gh = options.gh || runtime.gh;
  const ghAvailable = async () => (await gh.checkAvailability()).state === 'ok';
  const admission = options.admission || {
    /**
     * @param {import('./scheduler.js').BeadSnapshot} snap
     * @param {string} [base]
     */
    validate(snap, base) {
      // An unresolvable declaration is refused BEFORE any git probe: the base is
      // what every later check is asked about, so there is nothing to ask
      // (worker-base-scope-alignment §1 — no fallback).
      if (snap.base_unresolved) {
        return Promise.resolve({
          ok: false,
          reason: /** @type {any} */ (snap.base_unresolved)
        });
      }
      return validateAdmission({
        gitRun,
        ghAvailable,
        repo: snap.repo,
        // The FETCHED remote tip, not the local branch name: a local `<base>`
        // that is stale would otherwise pass admission against a commit the
        // remote left behind.
        base: base || snap.base_oid || snap.target_base,
        // Refusals name the attempt's BRANCH even when the check runs against a
        // pinned base_oid — a SHA cannot tell the operator the base is wrong.
        base_label: snap.target_base,
        bead: {
          route: snap.route,
          description: snap.description,
          spec_id: snap.spec_id,
          spec_id_conflict: snap.spec_id_conflict,
          spec_review: snap.spec_review,
          plan_path: snap.plan_path,
          plan_approval: snap.plan_approval,
          last_checked_sha: snap.last_checked_sha,
          labels: snap.labels,
          // 스냅샷과 같은 조건부 spread여야 한다. 이 리터럴은 고정 키 목록이라
          // `awaiting_user: snap.awaiting_user`로 항상 실으면 파킹이 없는 Bead도
          // own-property를 얻어 presence 판정이 전부 거부하고, 아예 빼면 파킹이
          // admission에 도달하지 못한다.
          ...(Object.hasOwn(snap, 'awaiting_user')
            ? { awaiting_user: snap.awaiting_user }
            : {})
        }
      });
    },
    /**
     * @param {string} bead_id
     * @returns {Promise<import('./admission.js').AdmissionResult>}
     */
    async check(bead_id) {
      let snap;
      try {
        snap = await bd.snapshotBead(bead_id);
      } catch {
        return { ok: false, reason: 'git_error' };
      }
      return this.validate(snap);
    }
  };
  const recoveryArchive = options.recoveryArchive || createRecoveryArchive();
  const worktree =
    options.worktree ||
    createWorktreeManager({
      locks: runtime.locks,
      createBranchArchive: (input) =>
        recoveryArchive.createBranch({
          workspace: keyFor(workspace_root),
          ...input
        })
    });
  // The pre-restart auto-advance restore controller asks whether a boot-time
  // deploy candidate reached terminal success even after a successor adopted
  // its target (UI-s582 §1 retired the repair chain that used to answer this).
  // A succeeded deploy for the SAME pinned target sha is that proof, read from
  // the durable records only — nothing here reports on itself.
  const deployTargetJudge = {
    /**
     * @param {{ workspace: string, operation_id: string }} input
     */
    async judge(input) {
      const queue = runtime.queueStore.snapshot(input.workspace);
      const operation = queue.repo_operations[input.operation_id];
      if (!operation || typeof operation.target_sha !== 'string') {
        return { verdict: 'unresolved', evidence: null };
      }
      for (const [candidate_id, candidate] of Object.entries(
        queue.repo_operations
      )) {
        if (
          candidate.kind === 'deploy' &&
          candidate.state === 'succeeded' &&
          candidate.target_sha === operation.target_sha
        ) {
          return { verdict: 'chain_closed', evidence: candidate_id };
        }
      }
      return { verdict: 'unresolved', evidence: null };
    }
  };
  const repoOperationCoordinator = createRepoOperationCoordinator({
    workspace: workspace_root,
    repo,
    store: runtime.queueStore,
    locks: runtime.locks,
    // The manual 배포 실행 path pins its target through the SAME base resolver
    // every other dispatch uses (UI-s582 §3.1) — remote, base and fetched tip
    // in one resolution, so nothing there assumes `origin`.
    resolveBase,
    gitRun,
    autoAdvanceRestore: options.autoAdvanceRestore
  });
  const quickfixLanding =
    options.quickfixLanding ||
    createQuickfixLanding(
      // UI-5ym8: `readPushLog` enters the landing dep contract with the
      // `session-outcome` unit (spec §5); the cast keeps this wiring type-clean
      // until that typedef lands.
      /** @type {any} */ ({
        workspace: keyFor(workspace_root),
        repo,
        store: runtime.queueStore,
        bd,
        gitRun,
        worktree,
        repoOperations: repoOperationCoordinator,
        // The attempt's OWN pre-push record (2026-08-28 worker-failure-tiers spec
        // §5): the lane's landing is judged from the ref/SHA the record-mode hook
        // wrote, not from the session's self-report. Bound here because the
        // landing module has no workspace of its own.
        readPushLog: (/** @type {{ attempt_id: string }} */ input) =>
          readPushLog({ workspace: keyFor(workspace_root), ...input }),
        notifyChanged: (/** @type {string} */ ws_key) =>
          emitQueueChanged(ws_key)
      })
    );
  // The observation verdict + the worker's `pr_url`/`resolved` back-fill: the
  // bd writer is the same metadata adapter the scheduler uses (extended with
  // the status pair), so both write through one confirmed argv encoding.
  const verify =
    options.verify ||
    createVerifier({ gh, bd: createBdMetadata({ cwd: workspace_root }) });

  // Custom process seams identify unit-test attachments. Production supplies
  // none of them and therefore always gets verified process-group control.
  const processController =
    options.processController ||
    (options.spawn_impl || options.makeRunner || options.probePid
      ? null
      : createProcessController({ signal: options.kill_impl }));

  const makeRunner =
    options.makeRunner ||
    ((name) =>
      createRunner(name, {
        spawn_impl: options.spawn_impl || ((c, a, o) => spawn(c, a, o)),
        kill_impl: options.kill_impl,
        ...(processController ? { process_controller: processController } : {})
      }));
  const accountCatalog =
    options.accountCatalog ||
    createAccountCatalog({
      listClaude: listClaudeAccounts,
      listCodex: listCodexAccounts
    });

  // The outward attempt-lifecycle push (UI-2yoq). Config is read per call, so a
  // machine that never opted into `[worker.notify]` pushes nothing and a toggle
  // takes effect without a restart.
  const notify =
    options.notify ||
    createNotifier({
      getConfig,
      // The snapshot title cache doubles as the push's title source (UI-vb0t
      // §3.3): a notification naming only a bead id is one the notification
      // centre cannot place, and the cache already knows how to read — and not
      // re-read — a title.
      resolveTitle: (bead_id) =>
        runtime.titleCache.ensureTitle(workspace_root, bead_id)
    });

  // The disposition actions need the scheduler and the scheduler needs their
  // completion verdict, so the dep is a late-bound indirection rather than a
  // constructor argument. Before the binding lands (it does, one statement
  // later) the verdict fails closed, which is also what an attachment built
  // without disposition wiring reports.
  /** @type {ReturnType<typeof createReviseDisposition>|null} */
  let reviseDisposition = null;
  // Same late-bound indirection as the disposition dep above, and for the same
  // reason: the coordinator needs the scheduler to dispatch, and the scheduler
  // needs the coordinator's verdict when the session exits (UI-d7fy §5.4).
  /** @type {ReturnType<typeof createReviewSession>|null} */
  let reviewSession = null;
  /** @type {ReturnType<typeof createPrActions>|null} */
  let prActions = null;
  /** @type {ReturnType<typeof createCompletionIntentCoordinator>|null} */
  let completionIntent = null;
  /** @type {ReturnType<typeof createCompletionActionDriver>|null} */
  let completionActionDriver = null;

  const probePid = options.probePid || defaultProbePid;

  // Detached-session monitors (UI-o2yt §3.3). Built here, started by
  // `initWorkerRuntime` for the sessions that outlived the previous process:
  // constructing one reaches nothing, so a test that only builds an attachment
  // still tails no file and signals no process.
  const sessionMonitors =
    options.sessionMonitors ||
    createSessionMonitors({
      store: runtime.queueStore,
      sessionLog: runtime.sessionLog,
      usage: runtime.usageStore,
      delegation: runtime.delegationStore,
      probePid,
      kill_impl: options.kill_impl,
      ...(processController ? { processController } : {}),
      notifyChanged: (ws_key) => emitQueueChanged(ws_key)
    });

  const scheduler = createScheduler({
    store: runtime.queueStore,
    execPresetCoordinator: runtime.execPresetCoordinator,
    // The account default layer lives in `bd kv`, which the preset
    // coordinator's synchronous workspace resolution cannot reach (UI-d3cb
    // §5.1). Bound the same way `runtime.js` binds the coordinator's own pair,
    // and overridable on the SAME seam as `options.bd`: a stubbed bd would
    // otherwise leave this one channel talking to the real CLI.
    kvGet:
      options.kvGet ||
      ((/** @type {string} */ workspace, /** @type {string} */ key) =>
        kvGetJson(key, { cwd: workspace })),
    makeRunner,
    accountCatalog,
    bd,
    worktree,
    verify,
    quickfixLanding,
    sessionLog: runtime.sessionLog,
    usage: runtime.usageStore,
    delegation: runtime.delegationStore,
    admission,
    // Dispatch-time re-resolution (worker-base-scope-alignment §1): the cut and
    // the admission pin are taken from a base read HERE, not one captured at
    // attachment construction.
    resolveBase,
    // The DETECTION layer's git runner (UI-8mvc §3, UI-1xcd §4). The post-hoc
    // base invariant asks its reachability question with the SAME git runner
    // the base resolver uses, so the observation can never disagree with the
    // base it is judging, and unwiring it here is what turns the detection
    // layer back into unit-test-only code. The `gh` adapter is no longer part
    // of that judgment: a landing is proven by the attempt's own push record.
    gitRun,
    notify,
    // The external-row evidence the attempt-less conflict dispatch stands on
    // (UI-w0hi §1) — the SAME registry the poller refreshes and the merge click
    // reads, so a dispatch can never disagree with the row that was clicked.
    externalPrs: {
      get: (/** @type {string} */ ws_key, /** @type {string} */ bead_id) =>
        runtime.externalPrs.get(ws_key, bead_id)
    },
    disposition: {
      /**
       * @param {{ workspace: string, attempt_id: string, bead_id: string, kind: string, prior_receipt?: string|null, target_base?: string|null }} input
       */
      complete(input) {
        return reviseDisposition
          ? reviseDisposition.complete(input)
          : Promise.resolve({ ok: false, reason: 'no_disposition_dep' });
      },
      /**
       * @param {string} bead_id
       */
      release(bead_id) {
        reviseDisposition?.release(bead_id);
      }
    },
    reviewSession: {
      /**
       * @param {{ workspace: string, attempt_id: string, bead_id: string, session_ok: boolean, reason?: string|null }} input
       */
      complete(input) {
        return reviewSession
          ? reviewSession.complete(input)
          : Promise.resolve({ ok: false, reason: 'no_review_session_dep' });
      }
    },
    onCompletionAttemptSettled(input) {
      return completionIntent
        ? completionIntent.attemptSettled(input)
        : Promise.resolve();
    },
    probePid,
    ...(processController ? { processController } : {}),
    sessionMonitors,
    notifyQueueChanged: (ws_key) => emitQueueChanged(ws_key)
  });

  const discardCoordinator =
    options.discardCoordinator ||
    createDiscardCoordinator(
      {
        workspace: keyFor(workspace_root),
        repo,
        store: runtime.queueStore,
        gh,
        bd,
        worktree,
        gitRun,
        scheduler,
        archive: recoveryArchive,
        processController,
        sessionLog: runtime.sessionLog,
        revertBuilder: createRevertBuilder({ gitRun }),
        verifyRevert: async (
          /** @type {{ worktree: string, base_sha: string }} */ input
        ) => {
          const resolved = await resolveVerify({ sha: input.base_sha });
          if (resolved.state === 'absent') {
            return { ok: true };
          }
          if (resolved.state !== 'resolved') {
            return {
              ok: false,
              reason: resolved.reason || 'repo_ops_config_invalid'
            };
          }
          const result = await runShell(
            resolved.value.cmd[0],
            resolved.value.cmd.slice(1),
            {
              cwd: input.worktree,
              timeout_ms: resolved.value.timeout_ms
            }
          );
          return result.code === 0
            ? { ok: true }
            : { ok: false, reason: 'verify_cmd_failed' };
        },
        rollbackBaseSync: (
          /** @type {Parameters<NonNullable<typeof prActions>['rollbackBaseSync']>[0]} */ refs
        ) =>
          prActions
            ? prActions.rollbackBaseSync(refs)
            : Promise.resolve({
                ok: false,
                reason: 'rollback_cleanup_unwired'
              }),
        rollbackVerify: (
          /** @type {string} */ bead_id,
          /** @type {string} */ base_sha
        ) =>
          prActions
            ? prActions.rollbackVerify(bead_id, base_sha)
            : Promise.resolve({
                ok: false,
                reason: 'rollback_cleanup_unwired'
              }),
        external: {
          get: (/** @type {string} */ ws_key, /** @type {string} */ bead_id) =>
            runtime.externalPrs.get(ws_key, bead_id)
        },
        actionInFlight: (/** @type {string} */ bead_id) =>
          prActions?.isInFlight(bead_id) === true,
        notifyChanged: (/** @type {string} */ ws_key) =>
          emitQueueChanged(ws_key)
      },
      { resolveBase }
    );

  // REVISE-parking disposition (UI-hs11 §3.2–§3.4): the two human clicks that
  // dispose of a bead parked at `awaiting_user=spec_review_stale:revise`.
  // Wired with the SAME queue store, parking-observation cache, lock manager
  // and scheduler the decoration and dispatch use, so a click can never act on
  // a different view of the world than the badge it followed.
  reviseDisposition =
    options.reviseDisposition ||
    createReviseDisposition({
      workspace: keyFor(workspace_root),
      repo,
      store: runtime.queueStore,
      bd: createBdMetadata({ cwd: workspace_root }),
      parked: runtime.reviseParked,
      scheduler,
      locks: runtime.locks,
      gitRun,
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key)
    });

  // The `[리뷰 후 머지]` click (UI-d7fy §5). It reads the SAME queue store the
  // gate holds the row in and re-observes through the SAME `prActions` the
  // click bound its authority with, so the verdict can never describe a
  // different PR than the button did.
  reviewSession =
    options.reviewSession ||
    createReviewSession({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      bd: createBdMetadata({ cwd: workspace_root }),
      scheduler,
      observeReviewReceipt: (/** @type {string} */ bead_id) =>
        prActions
          ? prActions.observeReviewReceipt(bead_id)
          : Promise.resolve({ ok: false, reason: 'no_attachment' }),
      kick: () => kickWorkerMergeQueue(workspace_root),
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key)
    });

  // The periodic reconcile pass. `createPoller` is reused for the unref'd
  // interval and its double-start guard, but its gate is a SUBSCRIBER gate and
  // reconcile must run without one: the state needing recovery most is a
  // just-restarted workspace with auto_advance OFF and nobody watching the
  // Worker tab (worker-detached-session-reconcile §2). Hence the constant 1.
  const reconciler = createPoller({
    intervalSeconds: RECONCILE_INTERVAL_SECONDS,
    getClientCount: () => 1,
    onTick: () => {
      const ws_key = keyFor(workspace_root);
      Promise.resolve(scheduler.reconcile(ws_key)).catch((err) => {
        log('reconcile pass failed for %s: %o', ws_key, err);
      });
      Promise.resolve(repoOperationCoordinator.reconcile(ws_key)).catch(
        (err) => {
          log('repo-operation reconcile pass failed for %s: %o', ws_key, err);
        }
      );
    }
  });

  // Keep runtime.status()'s running_count in sync with THIS scheduler.
  runtime.setRunningCountProvider(() => scheduler.runningCount());

  /**
   * Which exact commit a compatibility resolution reads from.
   *
   * @typedef {Object} OpsPin
   * @property {string|null} [sha] - The exact repository commit whose
   * declaration authorizes a compatibility run. Omission is inert.
   * @property {boolean} [force] - Retained caller shape; ignored.
   */

  /**
   * Compatibility runner input from one exact pinned repository declaration.
   * Pre-merge poll/click paths use RepoOperationCoordinator directly.
   *
   * @param {OpsPin} [pin]
   * @returns {Promise<any>}
   */
  const resolveVerify = async (pin = {}) => {
    if (typeof pin.sha !== 'string') {
      return { state: 'absent' };
    }
    try {
      const policy = /** @type {any} */ (
        await repoOperationCoordinator.hasConfig(pin.sha)
      );
      if (!policy.ok) {
        return { state: 'invalid', reason: policy.code };
      }
      if (typeof policy.verify_script_path !== 'string') {
        return { state: 'absent' };
      }
      return {
        state: 'resolved',
        source: 'repo_ops',
        value: {
          cmd: [policy.verify_script_path],
          timeout_ms: policy.verify_timeout_ms
        }
      };
    } catch (err) {
      log('verify resolution failed for %s: %o', repo, err);
      return { state: 'invalid', reason: 'repo_ops_config_invalid' };
    }
  };

  /**
   * Monotonic counter ordering overlapping {@link refreshExternalPrs} calls:
   * only the newest scan in flight may apply its result.
   */
  let external_scan_generation = 0;

  /**
   * The beads the worker itself is running, which the external scan must never
   * register (UI-b8n8). `null` means the set could not be read at all — the
   * caller treats that as fail-closed, not as an empty set.
   *
   * @returns {Set<string>|null}
   */
  function externalProtectedIds() {
    try {
      return scheduler.externalProtectedBeadIds(keyFor(workspace_root));
    } catch (err) {
      log(
        'external protection set unreadable for %s: %o',
        keyFor(workspace_root),
        err
      );
      return null;
    }
  }

  /**
   * The receipt fields ONE scanned external row carries into the registry
   * (UI-17mj §2.2).
   *
   * An external bead has no worker attempt, so nothing ever recorded a
   * `receipt_check` for it — the badge only appeared once a conflict-resolution
   * attempt happened to finish, and then kept showing that attempt's verdict
   * even after the metadata was corrected. The scan is the observation that has
   * always been missing, and it is cheap: `head: null` means no git probe, and
   * the metadata came along with the scan the poller already made.
   *
   * `receipt_key` is what keeps it cheap ACROSS ticks — a re-check happens only
   * when one of the nine backing keys actually changed, so a steady lane costs
   * one string compare per row per tick.
   *
   * DISPLAY ONLY. The merge gate re-checks live on the click, and never reads
   * this.
   *
   * @param {import('./bd-metadata.js').ExternalPrScanRow} row
   * @returns {Promise<{ receipt_key: string|null, receipt_check?: import('./receipt-check.js').ReceiptCheckResult|null }>}
   */
  async function observedReceiptFor(row) {
    const metadata =
      row.metadata && typeof row.metadata === 'object' ? row.metadata : null;
    if (!metadata) {
      // The legacy `scanBeads` shape carries no metadata at all. Nothing was
      // observed, so nothing is claimed.
      return { receipt_key: null, receipt_check: null };
    }
    const receipt_key = JSON.stringify(
      RECEIPT_METADATA_KEYS.map((key) => metadata[key] ?? null)
    );
    const prior = runtime.externalPrs.get(keyFor(workspace_root), row.bead_id);
    if (prior && prior.receipt_key === receipt_key) {
      // Unchanged backing: `undefined` tells the registry to carry the previous
      // observation over rather than blank it.
      return { receipt_key };
    }
    try {
      return {
        receipt_key,
        receipt_check: await checkReceipts({
          metadata,
          baseline: null,
          lineage: null,
          defaults: receiptDefaultsFrom(loadExecutionDefaults()),
          head: null
        })
      };
    } catch (err) {
      log('external receipt check threw for %s: %o', row.bead_id, err);
      return { receipt_key, receipt_check: receiptProbeError('check_threw') };
    }
  }

  /**
   * Re-derive the workspace's EXTERNAL PR rows from bd (UI-7agi §1): every
   * `resolved` bead still carrying a `metadata.pr_url`. Memory only — nothing
   * is written into `queue.json`, because none of these beads ran here.
   *
   * A bd that cannot be read THROWS out of `scanBeads`; the caller (the poller
   * pass) logs and keeps the previous rows, so a transient bd failure does not
   * blank the lane.
   *
   * The same scan also carries every bead's status, which this pass hands to
   * the scheduler's closed-queue sweep (UI-m6bg §확정 트리거). That is the
   * `auto_advance`-independent cleanup trigger: it rides the poller's existing
   * subscriber gate and cadence and spends no `bd` process of its own, so an
   * idle server sweeps exactly as often as it scans bd — never.
   *
   * The sweep is fenced in its own try/catch. The registry has already been
   * replaced successfully by then, and a sweep failure escaping here would read
   * to the poller's catch as an external-scan failure it should keep stale rows
   * for.
   *
   * The scan's `resolved` + `pr_url` condition matches a bead THIS worker is
   * still running: a session writes both keys at PR Delivery, while its process
   * is alive and its attempt unfinished. Registering it would put a live bead in
   * the merge lane — auto-merge takes it, post-merge `branch_cleanup` deletes a
   * worktree the session is still using, and the session's own verify then finds
   * no OPEN PR and records the finished work as `pr_missing` (UI-b8n8 §접근 A).
   * So worker-owned beads are filtered out before the registry is replaced; the
   * protected set is the scheduler's, including the stop-teardown fence.
   *
   * The judgment is a SYNCHRONOUS read of the queue snapshot, for the same
   * reason `sweepClosedQueue` is synchronous: nothing can dispatch between the
   * exclusion and the registration. The receipt observation (UI-17mj §2.2) is
   * the one awaited step inside the pass, so the protection set is read a
   * SECOND time after it — the deciding read is the one with no await left
   * between itself and `replace`.
   *
   * Overlapping calls are ordered by generation, not by completion. The poller
   * releases its own re-entrancy fence only AFTER this await, and the manual
   * refresh paths (`prepare`, {@link refreshWorkspaceExternalPrs}) are outside
   * it entirely, so an older scan can settle last. Applying its result would
   * publish stale rows — and, now that the sweep rides the same response, would
   * move a REOPENED bead to `done` off a `closed` reading a newer scan already
   * superseded. `done` is not draggable back, so that mistake is not recoverable
   * from the UI. A superseded `prepare` therefore returns with the registry one
   * generation behind its own scan; the worst that costs is a conflict dispatch
   * refused as a non-member, which is the fail-closed side.
   *
   * @returns {Promise<void>}
   */
  async function refreshExternalPrs() {
    if (typeof bd.scanBeads !== 'function') {
      return;
    }
    const generation = ++external_scan_generation;
    const { pr_rows, statuses, fresh } = await bd.scanBeads();
    if (generation !== external_scan_generation) {
      return;
    }
    if (fresh === false) {
      return;
    }
    const protected_ids = externalProtectedIds();
    if (protected_ids === null) {
      // Fail-closed: with no protection set the exclusion cannot be decided, and
      // registering the whole scan is exactly the unsafe side. The previous rows
      // stay for one pass. The sweep below is independent of the registry and
      // still runs — it is the caller's own `statuses` read.
      log(
        'external registry left stale for %s (no protection set)',
        keyFor(workspace_root)
      );
    } else {
      /** @type {string[]} */
      const excluded = [];
      /** @type {{ bead_id: string, pr_url: string, pr_number: number|null, receipt_key?: string|null, receipt_check?: import('./receipt-check.js').ReceiptCheckResult|null }[]} */
      const rows = [];
      for (const row of /** @type {import('./bd-metadata.js').ExternalPrScanRow[]} */ (
        pr_rows
      )) {
        if (protected_ids.has(row.bead_id)) {
          excluded.push(row.bead_id);
          continue;
        }
        rows.push({
          bead_id: row.bead_id,
          pr_url: row.pr_url,
          pr_number: parsePrNumber(row.pr_url),
          ...(await observedReceiptFor(row))
        });
      }
      if (generation !== external_scan_generation) {
        // The receipt observations above are awaited, so a newer scan can have
        // overtaken this one meanwhile. The generation fence has to be re-read
        // AFTER them for the same reason it exists at all: an older scan may
        // never publish its rows, and it may not run the sweep below off them
        // either.
        return;
      }
      // The exclusion is re-decided here, against a set read with NOTHING
      // awaited between it and the replace. The observations above are the only
      // awaits in this pass, but they are enough for a dispatch to land
      // meanwhile, and registering a bead the worker just claimed is exactly
      // the accident UI-b8n8 closed.
      const owned_now = externalProtectedIds();
      if (owned_now === null) {
        log(
          'external registry left stale for %s (no protection set)',
          keyFor(workspace_root)
        );
      } else {
        const registered = rows.filter((row) => {
          if (!owned_now.has(row.bead_id)) {
            return true;
          }
          excluded.push(row.bead_id);
          return false;
        });
        if (excluded.length > 0) {
          // Normal operation, not an anomaly — logged only so the lane's
          // absence is explainable.
          log(
            'external scan skipped worker-owned beads for %s: %s',
            keyFor(workspace_root),
            excluded.join(', ')
          );
        }
        runtime.externalPrs.replace(keyFor(workspace_root), registered);
      }
    }
    try {
      scheduler.sweepClosedQueue(keyFor(workspace_root), statuses);
    } catch (err) {
      log('closed-queue sweep failed for %s: %o', keyFor(workspace_root), err);
    }
  }

  // The PR-wait actions (worker-phase2 §6): the authoritative [머지] click, the
  // single post-merge cleanup, and [폐기]. Built with the SAME gh adapter,
  // observation cache, worktree manager and scheduler the poller and dispatch
  // use, so a click can never act on a different view of the world than the
  // badges it followed.
  prActions = createPrActions({
    workspace: keyFor(workspace_root),
    repo,
    store: runtime.queueStore,
    gh,
    observations: runtime.prObservations,
    activity: runtime.activityStore,
    bd,
    // The external row lookup the relaxed `pr_wait` guard stands on (UI-7agi §4).
    external: {
      get: (/** @type {string} */ ws_key, /** @type {string} */ bead_id) =>
        runtime.externalPrs.get(ws_key, bead_id),
      // Retiring the row at cleanup success (UI-wwby §1) closes the stale window
      // in which a merged bead could be re-enrolled as an external candidate.
      drop: (/** @type {string} */ ws_key, /** @type {string} */ bead_id) =>
        runtime.externalPrs.drop(ws_key, bead_id)
    },
    worktree,
    gitRun,
    scheduler,
    // The merge gate's EXPECTED base (worker-base-scope-alignment §5). The gate
    // compares an expectation against GitHub's observed `baseRefName`, so the
    // expectation may never be derived from an observation.
    resolveBase,
    resolveVerify,
    runVerify: (/** @type {any} */ input) =>
      runVerifyAtSha({ ...input, worktree, git: gitRun }),
    repoOperations: repoOperationCoordinator,
    notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
    // The SAME notifier the scheduler pushes attempt transitions through, so
    // the merge that closes a bead lands in the same channel as its start and
    // its PR (UI-9rrk).
    notify
  });

  // The one-shot legacy-state migration (master spec §11). It converts durable
  // state only; the lane resume that follows it at startup is what asks the
  // coordinator for the operations that conversion implies.
  const repoOperationMigration =
    options.repoOperationMigration ||
    createRepoOperationMigration({
      workspace: keyFor(workspace_root),
      repo,
      store: runtime.queueStore,
      gitRun,
      cleanupFacts: (/** @type {string} */ bead_id) =>
        prActions.cleanupFacts(bead_id),
      repoOperations: repoOperationCoordinator,
      resumeClosure: (/** @type {string} */ bead_id) =>
        prActions.resumeMigratedClosure(bead_id)
    });

  // The sequential merge driver (UI-5v7d §2). It is the ONLY caller of
  // `prActions.merge()` for a queued item, so it is built with the same actions
  // instance every click routes into — a click queues, this merges. Started by
  // `initWorkerRuntime` (not here) so a constructed-but-uninitialized attachment
  // in a test never reaches `gh`.
  const mergeQueue =
    options.mergeQueue ||
    createMergeQueue({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      merge: (/** @type {string} */ bead_id) =>
        prActions.merge(bead_id, { allow_conflict_resolution: false }),
      probeMergeability: (/** @type {string} */ bead_id) =>
        prActions.probeMergeability(bead_id),
      dispatchConflict: (
        /** @type {string} */ bead_id,
        /** @type {{ head_sha: string, base_ref: string|null, head_ref: string|null }} */ approved,
        /** @type {{ queue_bead_id: string, wait_ms: number, manual_authority?: boolean, dispatch_head_sha: string, base_ref: string, head_ref: string }} */ resolution_wait,
        /** @type {{ continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }|undefined} */ continuation
      ) =>
        prActions.dispatchConflict(
          bead_id,
          approved,
          resolution_wait,
          continuation
        ),
      // Whether a still-dirty head already contains its base tip (UI-p49g
      // §4.1) — the evidence that separates a session's failed resolution from
      // one the queue re-conflicted. The production queue picks its deps
      // explicitly, so an unwired seam would charge EVERY re-conflict.
      baseContained: (
        /** @type {string} */ bead_id,
        /** @type {{ base_ref: string, head_ref: string, head_sha: string }} */ input
      ) => prActions.baseContained(bead_id, input),
      observePr: (/** @type {string} */ bead_id) => prActions.prState(bead_id),
      // The head an auto-merge exclusion is pinned to (UI-yk55 §3.3). A cache
      // read only — `observePr` returns `{state, error}` and cannot serve it.
      headSha: (/** @type {string} */ bead_id) =>
        observedHeadSha(keyFor(workspace_root), bead_id),
      // Whether the PR poller still OBSERVES this bead (UI-wwby §3). The driver
      // has no other route to the registry, and without it a halt on a head the
      // poller never looks at can never end.
      isExternalRow: (/** @type {string} */ bead_id) =>
        !!runtime.externalPrs.get(keyFor(workspace_root), bead_id),
      conflictDispatchBlocked: (
        /** @type {string} */ queue_bead_id,
        /** @type {string} */ subject_bead_id
      ) =>
        scheduler.queueConflictBlocked(
          keyFor(workspace_root),
          queue_bead_id,
          subject_bead_id
        ),
      // Preserve the mutation response as one object: `result_head_sha` is
      // authoritative only at this effect boundary (UI-vkk8 §4).
      updateBase: (/** @type {string} */ bead_id) =>
        prActions.updateBase(bead_id),
      onCompletionResult: (
        /** @type {string} */ root_bead_id,
        /** @type {string} */ subject_bead_id,
        /** @type {any} */ result
      ) =>
        completionActionDriver
          ? completionActionDriver.onMergeResult(
              root_bead_id,
              subject_bead_id,
              result
            )
          : Promise.resolve(),
      // Re-derive the EXTERNAL rows once before the resumed queue's first item
      // (UI-5v7d §2): at boot the registry is empty until something scans bd,
      // and a restored external head would otherwise be refused as a non-member.
      prepare: refreshExternalPrs,
      subscribeQueueChanged: onQueueChanged,
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
      log
    });

  // The automatic enroller (UI-yk55 §4). Same lifetime as the driver it feeds,
  // and it never merges anything itself — it only decides what takes a place in
  // the driver's queue. Started by `initWorkerRuntime`, like the driver.
  const autoMerge =
    options.autoMerge ||
    createAutoMerge({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      // The enrollment scan is synchronous, so it reads the ladder through the
      // cached projection (UI-kfl4): advisory shortlisting only — every item it
      // queues is re-gated by `gateNow` against a fresh pin before it merges.
      // Opt-out aware (UI-lsti §3): a workspace that skips its declared
      // `[verify]` lane never produces a receipt, so the raw declaration would
      // hold every row at `verify_missing` and auto-merge would never enroll.
      verifyState: () =>
        effectiveVerifyPolicy(
          repoOpsDisplayFor(keyFor(workspace_root)),
          runtime.queueStore.snapshot(keyFor(workspace_root))
        ),
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
      // Persist alone leaves items in a queue nobody drains (UI-yk55 §4.2).
      kick: () => mergeQueue.kick(),
      subscribeQueueChanged: onQueueChanged,
      log
    });

  const resolvedCompletionActionDriver =
    options.completionActionDriver ||
    createCompletionActionDriver({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      prActions,
      bd,
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
      kickMerge: () => mergeQueue.kick(),
      log
    });
  completionActionDriver = resolvedCompletionActionDriver;

  // Durable completion-intent lifecycle. Phase-specific effects stay injected;
  // the attachment owns only startup, queue-event wakeups, and shutdown.
  const resolvedCompletionIntent =
    options.completionIntent ||
    createCompletionIntentCoordinator({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      subscribeQueueChanged: onQueueChanged,
      observe: resolvedCompletionActionDriver.observe,
      onAction: resolvedCompletionActionDriver.onAction,
      adoptLegacy: resolvedCompletionActionDriver.adoptLegacyTimeout,
      onAttemptSettled: resolvedCompletionActionDriver.onAttemptSettled,
      log
    });
  completionIntent = resolvedCompletionIntent;

  // The bd issue-change subscription §5's re-observation trigger rides
  // (UI-hk74). It is the SAME primitive the server already watches the beads
  // database with — a debounced filesystem signal, NOT a poller — bound here
  // per workspace so a `waiting_metadata` root is re-checked exactly when a
  // human's `bd update` lands and never on a cadence. The coordinator pass
  // covers only the restart case, where an event could have been missed while
  // nothing was listening.
  const beadsChanges = (() => {
    /** @type {{ close: () => void }|null} */
    let handle = null;
    const watch = options.watchBeads || watchDb;
    const fire = () => {
      Promise.resolve(resolvedCompletionActionDriver.onIssuesChanged?.()).catch(
        (err) => {
          log(
            'bd issue-change metadata check failed for %s: %o',
            keyFor(workspace_root),
            err
          );
        }
      );
      // The parked-resume trigger rides the SAME signal (2026-08-28
      // worker-failure-tiers spec §3.1): a bead parked on `awaiting_user`
      // resumes exactly when the human's `bd update` clears the key, not on a
      // cadence of its own.
      Promise.resolve(
        scheduler.onIssuesChanged?.(keyFor(workspace_root))
      ).catch((err) => {
        log(
          'bd issue-change parked resume failed for %s: %o',
          keyFor(workspace_root),
          err
        );
      });
      // A gate hold's exit is an `impl_review` receipt written to the BEAD
      // (UI-d7fy §3.3), which this is the signal for. Gated on a hold actually
      // standing so an ordinary `bd update` costs no merge pass: without a hold
      // there is nothing here for the queue to re-judge, and with one the PR
      // observation pass would otherwise be the upper bound on how long the row
      // waits after the receipt lands.
      try {
        const held = (
          runtime.queueStore.snapshot(keyFor(workspace_root)).merge_queue || []
        ).some((/** @type {any} */ entry) => !!entry.hold);
        if (held) {
          Promise.resolve(mergeQueue.kick()).catch((err) => {
            log(
              'bd issue-change merge kick failed for %s: %o',
              keyFor(workspace_root),
              err
            );
          });
        }
      } catch (err) {
        log(
          'bd issue-change hold check failed for %s: %o',
          keyFor(workspace_root),
          err
        );
      }
    };
    return {
      start() {
        if (handle) {
          return;
        }
        try {
          handle = watch(workspace_root, fire);
        } catch (err) {
          log(
            'bd issue-change watch failed for %s: %o',
            keyFor(workspace_root),
            err
          );
          handle = null;
        }
      },
      stop() {
        if (!handle) {
          return;
        }
        try {
          handle.close();
        } catch {
          // A watcher that cannot be closed must not break teardown.
        }
        handle = null;
      }
    };
  })();

  // PR poller (worker-phase2 §4): watches this workspace's `pr_wait` PRs. It is
  // BUILT here but started by `initWorkerRuntime`. Its default subscriber count
  // is 0, while durable auto-merge/merge-queue/deployment demand can still wake
  // it after restart.
  const prPoller = createPrPoller({
    workspace: keyFor(workspace_root),
    repo,
    store: runtime.queueStore,
    gh,
    observations: runtime.prObservations,
    readIssue:
      typeof bd.readIssue === 'function'
        ? (/** @type {string} */ bead_id) => bd.readIssue(bead_id)
        : undefined,
    // The receipt/head ancestry probe needs git: the observed PR head is a
    // GitHub fact this repository may not carry yet (UI-vzyh §2).
    gitRun,
    activity: runtime.activityStore,
    getSubscriberCount: options.getSubscriberCount || (() => 0),
    resolveBase,
    repoOperations: repoOperationCoordinator,
    // The externally-observed MERGED trigger routes into the SAME cleanup the
    // button runs — one implementation, two triggers (worker-phase2 §6).
    onMerged: (bead_id, merge_sha, refs) =>
      prActions.cleanupObservedMerge(bead_id, merge_sha, refs),
    onDiscardObservation: (bead_id) => discardCoordinator.observeBead(bead_id),
    // The external registry rides the poller's own subscriber gate and cadence
    // (UI-7agi §1) — an idle server scans bd exactly as often as it queries gh:
    // never.
    external: {
      refresh: refreshExternalPrs,
      list: () => runtime.externalPrs.list(keyFor(workspace_root))
    },
    notifyChanged: (ws_key) => emitQueueChanged(ws_key)
  });

  return {
    runtime,
    scheduler,
    reconciler,
    prPoller,
    prActions,
    discardCoordinator,
    mergeQueue,
    autoMerge,
    completionIntent: resolvedCompletionIntent,
    completionActionDriver: resolvedCompletionActionDriver,
    beadsChanges,
    refreshExternalPrs,
    reviseDisposition,
    reviewSession,
    sessionMonitors,
    processController,
    bd,
    // Exposed so the ws snapshot decoration can ask whether a bead's worktree
    // still exists (UI-w0hi §3); the manager itself stays attachment-owned.
    worktree,
    admission,
    deployTargetJudge,
    repoOperationCoordinator,
    repoOperationMigration,
    timeline,
    repo,
    resolveBase,
    // Exposed so pinned-blob readers use the attachment's own runner rather
    // than constructing a second git seam.
    gitRun,
    workspace: workspace_root
  };
}

/**
 * Registry of per-workspace attachments keyed by resolved workspace root. Only
 * populated by {@link initWorkerRuntime} (or a test hook) — never lazily.
 *
 * @type {Map<string, ReturnType<typeof createWorkerAttachment>>}
 */
const ATTACHMENTS = new Map();

/**
 * One fail-closed startup sequence per attachment. The promise remains in the
 * map after completion so repeated runtime initialization cannot interleave a
 * second recovery pass with already-started drivers.
 *
 * @type {Map<string, Promise<void>>}
 */
const ATTACHMENT_STARTUPS = new Map();

/** @type {ReturnType<typeof createAutoAdvanceRestoreController>|null} */
let auto_advance_restore_controller = null;

/**
 * @param {string} workspace_root
 * @returns {string}
 */
function keyFor(workspace_root) {
  return path.resolve(String(workspace_root || ''));
}

/**
 * Recover every persisted `running` attempt this process does not own: rebuild
 * its token tally from the session log (UI-ediw) and reattach a detached-session
 * monitor to it (UI-o2yt §3.3).
 *
 * Both halves are STARTUP-only and share ONE observation of the log — the line
 * boundary. The replay owns `[0, boundary)` and the monitor continues at
 * `boundary`, so the two readers cover the file exactly once between them:
 * computing a boundary per reader would leave the lines appended in between
 * counted twice or by nobody, and the usage and guard evidence in that window
 * are precisely what this recovery exists to preserve.
 *
 * An attempt the SCHEDULER is running is skipped entirely: its own engine
 * already reads the log, so a monitor would double-broadcast it and a replay
 * would fight a live tally. That guard is what keeps a repeat
 * `initWorkerRuntime` call harmless.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key - Resolved workspace root.
 */
function recoverRunningAttempts(att, key) {
  try {
    const q = att.runtime.queueStore.snapshot(key);
    const usage_store = att.runtime.usageStore;
    const delegation_store = att.runtime.delegationStore;
    const session_log = att.runtime.sessionLog;
    for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (!a || a.status !== 'running') {
        continue;
      }
      // `review_session` records ARE this engine's (UI-d7fy §5): the scheduler
      // dispatches them, so they have a session log to replay and a process to
      // reattach a monitor to, exactly like an implementation run. Any OTHER
      // non-implementation kind is a retired lane whose record the load-time
      // migration already terminalized, so nothing here can be `running`.
      const kind = a.kind ?? 'implementation';
      if (kind !== 'implementation' && kind !== 'review_session') {
        continue;
      }
      if (att.scheduler.isRunning(a.bead_id)) {
        continue;
      }
      const boundary = session_log.lineBoundaryOf(key, attempt_id);
      if (!usage_store.get(key, attempt_id)) {
        replayUsage({
          session_log,
          usage_store,
          // Rebuilds the attempt's subagent rows and receipts off the same
          // lines (UI-2mpn §5.4); the monitor started below continues at the
          // same boundary, so the two never overlap.
          delegation_store,
          workspace: key,
          attempt_id,
          // The adapter that WROTE this log, so the replay lifts usage the way
          // the dead session's live stream did.
          ...(typeof a.runner === 'string' ? { runner: a.runner } : {}),
          ...(boundary == null ? {} : { end_offset: boundary })
        });
      }
      att.sessionMonitors.start(key, a, {
        start_offset: boundary ?? 0
      });
    }
  } catch (err) {
    log('running-attempt recovery failed for %s: %o', key, err);
  }
}

/**
 * Settle the `[리뷰 후 머지]` sessions a restart orphaned (UI-d7fy §5.2/§5.4).
 *
 * A `review_session` attempt is dispatched by the SCHEDULER, so a crash can
 * leave one of two records behind, and the §5.2 per-Bead in-flight guard reads
 * both as live forever — which permanently disables the one button that is the
 * hold's only exit:
 *
 *   - `pending`: the click's CAS committed and the process never launched.
 *   - `running`: the session was launched and did not outlive the restart.
 *
 * A record whose process IS still alive is left exactly as it is — the monitor
 * reattaches to it in {@link recoverRunningAttempts} below. An ambiguous probe
 * (`unknown`, no controller identity on a record that has one) counts as alive
 * for the same reason: terminalizing a live reviewer would re-enable the button
 * and buy a SECOND reviewer on the same head, which is worse than a button that
 * stays disabled until the next restart proves the process gone.
 *
 * The settlement is {@link createQueueStore.settleReviewSession}, so the row
 * keeps its hold and its authority and only the attempt ends. When the binding
 * is already gone (the entry was cancelled or re-authorized while the server
 * was down) that write refuses by design — and the attempt still has to leave
 * `pending`/`running`, or the guard outlives the authority it was taken under.
 * The direct patch is that case and only that case.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key
 */
function recoverReviewSessions(att, key) {
  const store = att.runtime.queueStore;
  /** @type {Array<{ attempt_id: string, cause: string }>} */
  const doomed = [];
  try {
    const q = store.snapshot(key);
    for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (!a || a.kind !== 'review_session') {
        continue;
      }
      if (a.status !== 'pending' && a.status !== 'running') {
        continue;
      }
      if (att.scheduler.isRunning(a.bead_id)) {
        continue;
      }
      if (a.status === 'pending') {
        doomed.push({ attempt_id, cause: 'session_lost:never_launched' });
        continue;
      }
      const identity = attemptProcessIdentity(a);
      const state =
        identity && att.processController
          ? att.processController.probe(identity).state
          : 'gone';
      if (state === 'gone' || state === 'recycled') {
        doomed.push({ attempt_id, cause: 'session_lost:process_gone' });
      }
    }
  } catch (err) {
    log('review-session recovery plan failed for %s: %o', key, err);
    return;
  }
  if (doomed.length === 0) {
    return;
  }
  for (const plan of doomed) {
    try {
      att.sessionMonitors?.stop(key, plan.attempt_id);
    } catch (err) {
      log(
        'review-session monitor stop failed for %s: %o',
        plan.attempt_id,
        err
      );
    }
    try {
      const settled = store.settleReviewSession(key, {
        attempt_id: plan.attempt_id,
        outcome: 'failed',
        cause: plan.cause,
        hold_reason: null,
        at: Date.now()
      });
      if (!settled.ok) {
        store.updateAttempt(key, {
          attempt_id: plan.attempt_id,
          patch: {
            status: 'failed',
            cause: plan.cause,
            control: null,
            finished_at: Date.now()
          }
        });
      }
    } catch (err) {
      log(
        'review-session recovery write failed for %s: %o',
        plan.attempt_id,
        err
      );
    }
  }
  emitQueueChanged(key);
}

/**
 * The identity a detached attempt's process control needs. Mirrors the readers
 * in `scheduler.js` and `session-monitor.js`: a legacy record may only know its
 * `pid`, and a session leader's `pgid` equals it.
 *
 * @param {any} attempt
 * @returns {{ pid: number, pgid: number, started_at: number }|null}
 */
function attemptProcessIdentity(attempt) {
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
 * Kill one repair session this server did not spawn, and say whether the kill
 * is CONFIRMED. A session that outlived the restart is NOT in the scheduler's
 * running map, so `scheduler.stop` cannot reach it — the verified process-group
 * controller is the path that can.
 *
 * Confirmed means "no live process of this attempt is left": an attempt that is
 * not `running`, a record with no controller or no process identity (§2: 살아
 * 있는 PID가 없으면 종단만 기록), or a `terminate` that reports `ok`.
 *
 * NOT confirmed means the pid may still be running — `terminate` refused
 * (`{ ok: false }`) or threw. The caller must then leave the record alone: the
 * retirement writes a terminal status and drops the keys that name the process,
 * so recording it over a live session would strand that session unidentifiable.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key
 * @param {string} attempt_id
 * @param {{ running_only?: boolean }} [options] - `running_only: false` asks by
 * process identity instead of by status, for the §3.8 caller whose records the
 * STORE already settled at load while their processes are still alive.
 * @returns {Promise<boolean>} Whether the stop is confirmed.
 */
async function stopRetiredRepairSession(att, key, attempt_id, options = {}) {
  const attempt = att.runtime.queueStore.snapshot(key).attempts?.[attempt_id];
  if (!attempt) {
    return true;
  }
  if (options.running_only !== false && attempt.status !== 'running') {
    return true;
  }
  try {
    att.sessionMonitors?.stop(key, attempt_id);
  } catch (err) {
    log('repair-lane monitor stop failed for %s: %o', attempt_id, err);
  }
  const identity = attemptProcessIdentity(attempt);
  if (!att.processController || !identity) {
    return true;
  }
  try {
    const stopped = await att.processController.terminate(identity);
    if (stopped?.ok === true) {
      return true;
    }
    log(
      'repair-lane session stop refused for %s: %o',
      attempt_id,
      stopped ?? null
    );
    return false;
  } catch (err) {
    log('repair-lane session stop failed for %s: %o', attempt_id, err);
    return false;
  }
}

/**
 * Retire every persisted post-merge repair saga (UI-8w4t §2) FIRST, before any
 * other startup pass can observe its records. The order is the whole point:
 * the cold load withheld these intents with their `repair_*` keys intact, this
 * pass kills the surviving session processes, and only then does the store
 * write the attempt terminals, the `repair_lane_retired` reason, and the
 * rewritten record that no longer has the keys. Dropping the keys first would
 * leave a live repair session with nothing left to name it — and
 * {@link recoverRunningAttempts}, which runs below, would reattach a monitor to
 * exactly that process.
 *
 * The repair Beads the lane already created are left alone; a human closes
 * them.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key
 */
async function retireRepairLanes(att, key) {
  const store = att.runtime.queueStore;
  let pending = [];
  try {
    pending = store.pendingRepairLaneRetirements(key);
  } catch (err) {
    log('repair-lane retirement plan failed for %s: %o', key, err);
    return;
  }
  if (pending.length === 0) {
    return;
  }
  for (const plan of pending) {
    let stopped = true;
    for (const attempt_id of plan.attempt_ids) {
      // Every attempt, not until the first refusal: a root may own more than
      // one session, and the ones that CAN be stopped should be.
      stopped =
        (await stopRetiredRepairSession(att, key, attempt_id)) && stopped;
    }
    if (!stopped) {
      // Ordering over progress (§2). The record keeps its phase and its keys,
      // so the next startup replans this root from disk and tries again; the
      // alternative is a terminal record whose process is still running.
      log(
        'repair-lane retirement deferred for %s: session still alive',
        plan.root_bead_id
      );
      continue;
    }
    try {
      store.retireRepairLane(key, {
        root_bead_id: plan.root_bead_id,
        at: Date.now()
      });
    } catch (err) {
      log('repair-lane retirement failed for %s: %o', plan.root_bead_id, err);
    }
  }
  emitQueueChanged(key);
}

/**
 * Stop and settle every attempt of a RETIRED lane, once per boot (UI-d7fy
 * §3.8).
 *
 * The store already terminalized these records as it read them — an unknown
 * `kind` must never come back as an implementation attempt holding a 실행중
 * slot — so the ordering this function owns is the other half: the PROCESS the
 * record named is still running, and a pure store cannot kill a pid. The
 * migration is written back once, after the stops, so the file on disk stops
 * naming a lane this build no longer has.
 *
 * Best-effort per attempt: a refused stop still leaves a terminal record whose
 * every late write fails, which is the property the retirement needs.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key
 */
async function retireKindAttempts(att, key) {
  const store = att.runtime.queueStore;
  let pending = [];
  try {
    pending = store.pendingRetiredKindAttempts(key);
  } catch (err) {
    log('retired-kind attempt plan failed for %s: %o', key, err);
    return;
  }
  if (pending.length === 0) {
    return;
  }
  for (const plan of pending) {
    log(
      'retiring %s attempt %s of kind %s',
      plan.bead_id,
      plan.attempt_id,
      plan.kind
    );
    await stopRetiredRepairSession(att, key, plan.attempt_id, {
      running_only: false
    });
  }
  try {
    store.commitRetiredKindAttempts(key);
  } catch (err) {
    log('retired-kind attempt commit failed for %s: %o', key, err);
  }
  emitQueueChanged(key);
}

/**
 * Recover persisted control before any monitor or ordinary driver can observe
 * the same attempt. A recovery failure leaves the attachment constructed but
 * inert; starting reconcile/poll/merge after an ambiguous signal would let a
 * second subsystem consume the attempt under a contradictory state.
 *
 * @param {ReturnType<typeof createWorkerAttachment>} att
 * @param {string} key
 * @param {boolean} start_pr_poller
 */
async function startWorkerAttachment(att, key, start_pr_poller) {
  await retireRepairLanes(att, key);
  await retireKindAttempts(att, key);
  try {
    await att.discardCoordinator.recoverFences();
  } catch (err) {
    log('discard fence recovery failed for %s: %o', key, err);
    return;
  }

  try {
    await att.scheduler.recoverControls(key);
  } catch (err) {
    log('control recovery failed for %s: %o', key, err);
    return;
  }

  // Before the monitor reattach below, which is what the surviving records are
  // owed and the orphaned ones must not get.
  recoverReviewSessions(att, key);
  recoverRunningAttempts(att, key);
  try {
    await att.discardCoordinator.recover();
  } catch (err) {
    log('discard operation recovery failed for %s: %o', key, err);
    return;
  }
  try {
    await att.scheduler.reconcile(key);
  } catch (err) {
    log('startup reconcile failed for %s: %o', key, err);
    return;
  }
  try {
    await att.repoOperationCoordinator.reconcile(key);
  } catch (err) {
    log('repo-operation startup reconcile failed for %s: %o', key, err);
  }
  // Fill the declaration DISPLAY cache once at the base tip this attachment
  // already resolved (UI-q0uy §4.6-1 (a)). Non-fatal: an unfilled cache reads as
  // 선언 확인 중 in the settings dialog without claiming policy is absent.
  try {
    const base = await att.resolveBase();
    await att.repoOperationCoordinator.refreshDisplay({
      base: base.base,
      sha: base.ok ? base.base_oid : null
    });
  } catch (err) {
    log('repo-ops display refresh failed for %s: %o', key, err);
  }
  // Before the lane resumes: the legacy records must already be converted, or
  // the resume would skip exactly the rows the migration exists for. A failure
  // here is not fatal — an unconverted row keeps its legacy failure record and
  // the resume passes it by, which is the state we started from.
  try {
    await att.repoOperationMigration?.run();
  } catch (err) {
    log('repo-operation legacy migration failed for %s: %o', key, err);
  }
  try {
    await att.prActions.resumeRepoOperations?.();
  } catch (err) {
    log('repo-operation cleanup resume failed for %s: %o', key, err);
    return;
  }
  if (start_pr_poller) {
    try {
      att.prPoller.start();
    } catch (err) {
      log('pr poller start failed for %s: %o', key, err);
    }
  }
  try {
    att.reconciler.start();
  } catch (err) {
    log('reconcile timer start failed for %s: %o', key, err);
  }
  try {
    att.mergeQueue.start();
  } catch (err) {
    log('merge queue start failed for %s: %o', key, err);
  }
  try {
    att.autoMerge.start();
    const queue = att.runtime.queueStore.snapshot(key);
    if (queue.auto_merge === true) {
      Promise.resolve(att.prPoller.tick()).catch((err) => {
        log('worker boot PR observation failed for %s: %o', key, err);
      });
    }
  } catch (err) {
    log('auto-merge start failed for %s: %o', key, err);
  }
  try {
    att.completionIntent.start();
  } catch (err) {
    log('completion-intent start failed for %s: %o', key, err);
  }
  try {
    att.beadsChanges?.start();
  } catch (err) {
    log('bd issue-change subscription start failed for %s: %o', key, err);
  }
}

/**
 * Create + register attachments for each active workspace, then reconcile the
 * `running` attempts persisted from a prior run and arm the periodic reconcile
 * timer (worker-detached-session-reconcile §2). Idempotent per workspace.
 *
 * `getSubscriberCount` is what turns the PR poller on (worker-phase2 §4): the
 * caller supplies the live worker-queue subscriber count for a workspace. The
 * poller also honors durable auto-merge/merge-queue/deployment demand; omitting
 * the provider stays silent only when none of those internal consumers exist.
 *
 * @param {{ workspaces: string[], getSubscriberCount?: (workspace: string) => number, runtime_identity?: any }} input
 * @returns {ReturnType<typeof createWorkerAttachment>[]}
 */
export function initWorkerRuntime(input) {
  /** @type {ReturnType<typeof createWorkerAttachment>[]} */
  const built = [];
  const countFor = input.getSubscriberCount;
  if (!auto_advance_restore_controller) {
    let runtime_identity = null;
    if (Object.hasOwn(input, 'runtime_identity')) {
      runtime_identity = input.runtime_identity;
    } else {
      try {
        const config = getConfig();
        const created = createRuntimeIdentity({
          host: config.host,
          port: config.port
        });
        runtime_identity = created.ok ? created.identity : null;
      } catch {
        runtime_identity = null;
      }
    }
    auto_advance_restore_controller = createAutoAdvanceRestoreController({
      runtime_identity
    });
  }
  const restore_controller = auto_advance_restore_controller;
  for (const ws of input.workspaces || []) {
    if (!ws) {
      continue;
    }
    const key = keyFor(ws);
    let att = ATTACHMENTS.get(key);
    let created = false;
    if (!att) {
      att = createWorkerAttachment(key, {
        autoAdvanceRestore: restore_controller,
        getSubscriberCount:
          typeof countFor === 'function' ? () => countFor(key) : undefined
      });
      ATTACHMENTS.set(key, att);
      created = true;
    }
    restore_controller.register({
      workspace: key,
      repo: att.repo,
      store: att.runtime.queueStore,
      locks: att.runtime.locks,
      gitRun: att.gitRun,
      repairSession: att.deployTargetJudge,
      notifyChanged: (workspace) => emitQueueChanged(workspace),
      tick: (workspace) => att.scheduler.tick(workspace)
    });
    if (!ATTACHMENT_STARTUPS.has(key)) {
      ATTACHMENT_STARTUPS.set(
        key,
        startWorkerAttachment(
          att,
          key,
          created && typeof countFor === 'function'
        )
      );
    }
    built.push(att);
  }
  return built;
}

/**
 * Tick the auto-advance loop for a workspace, IF an attachment is registered.
 * No-op (resolved) otherwise — this is what keeps ws-handler tests hermetic.
 *
 * @param {string} workspace_root
 * @returns {Promise<void>}
 */
export async function tickWorkerQueue(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return;
  }
  await att.scheduler.tick(keyFor(workspace_root));
}

/**
 * Read the one execution-policy label needed when a workspace has no live
 * scheduler attachment. This keeps direct queue mutations fail-closed without
 * constructing runners, git probes, or timers for an inactive workspace.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<import('./admission.js').AdmissionResult>}
 */
async function checkUnattachedWorkerAdmission(workspace_root, bead_id) {
  const shown = await runBdJsonProjected('show', ['show', bead_id, '--json'], {
    cwd: keyFor(workspace_root),
    expected_id: bead_id
  });
  if (!shown || shown.ok !== true) {
    return { ok: false, reason: 'bd_snapshot_failed' };
  }
  const issue = shown.data;
  return isWorkerIneligible(/** @type {any} */ (issue).labels)
    ? { ok: false, reason: 'worker_ineligible' }
    : { ok: true };
}

/** @type {typeof checkUnattachedWorkerAdmission} */
let unattachedAdmissionCheck = checkUnattachedWorkerAdmission;

/**
 * Pre-check auto-run admission for a queue placement. A live attachment owns
 * the full route/spec/git admission. Without one, an authoritative `bd show`
 * still enforces the interactive-only label before queue mutation.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<import('./admission.js').AdmissionResult>}
 */
export async function checkWorkerQueueAdmission(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.admission) {
    return unattachedAdmissionCheck(workspace_root, bead_id);
  }
  return att.admission.check(bead_id);
}

/**
 * The read-only inputs a pinned-base reader needs from a live attachment: the
 * base resolver and the git runner it reads blobs with. Null without an
 * attachment — an inactive workspace has no base to pin, and the caller must
 * refuse rather than read an unpinned tree. The declared-scope cache behind the
 * Monitor overlap chips is the surviving reader.
 *
 * @param {string} workspace_root
 * @returns {{ repo: string, resolveBase: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>, gitRun: (args: string[], options?: any) => Promise<any> }|null}
 */
export function workerAnalysisContext(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || typeof att.resolveBase !== 'function') {
    return null;
  }
  return {
    repo: att.repo,
    resolveBase: att.resolveBase,
    gitRun: att.gitRun
  };
}

/**
 * The workspace's concurrency cap, or null when no attachment is registered.
 *
 * The value is the STORE's (`queue.slots`, user-editable via
 * `worker-queue-set-slots` — worker-phase2 §3), not a construction-time option:
 * the attachment is built once at startup, so reading it live is what lets a
 * cap edit reach the display without a restart. Read-only display input: the
 * Worker tab flags a manual resume that pushed live sessions past the cap
 * (worker-phase1 §2.3).
 *
 * @param {string} workspace_root
 * @returns {number|null}
 */
export function workerSlots(workspace_root) {
  const key = keyFor(workspace_root);
  const att = ATTACHMENTS.get(key);
  if (!att) {
    return null;
  }
  const slots = att.runtime.queueStore.snapshot(key).slots;
  return typeof slots === 'number' ? slots : null;
}

/**
 * The canonical repository path this workspace's attachment operates on, or
 * null when none is registered (UI-s582 §3). Projected onto the snapshot so a
 * client that has never seen an operation record can still NAME the repository
 * it is acting on — the mismatch guard on 배포 실행 is worth nothing if the
 * client is allowed to say nothing.
 *
 * @param {string} workspace_root
 * @returns {string|null}
 */
export function workerRepoId(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  return att && typeof att.repo === 'string' && att.repo ? att.repo : null;
}

/**
 * Whether a bead's worktree still exists in the workspace's repo (UI-w0hi §3).
 *
 * READ-ONLY and fail-quiet: no attachment, no worktree manager, or a manager
 * without the probe all answer `false`, which the lane renders as a disabled
 * [충돌 해소] with a reason tooltip. Guessing `true` would offer a click whose
 * dispatch could only refuse.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {boolean}
 */
export function workerWorktreeExists(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.worktree || typeof att.worktree.exists !== 'function') {
    return false;
  }
  return att.worktree.exists(att.repo, bead_id) === true;
}

/**
 * Discard an attempt (tile ■), IF an attachment is registered.
 *
 * @param {string} workspace_root
 * @param {string} attempt_id
 * @returns {Promise<boolean>}
 */
export async function stopWorkerAttempt(workspace_root, attempt_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return false;
  }
  return att.scheduler.stop(keyFor(workspace_root), attempt_id);
}

/**
 * Stop a cancelled `[리뷰 후 머지]` session's PROCESS (UI-d7fy §5.6), IF an
 * attachment is registered.
 *
 * Deliberately NOT {@link stopWorkerAttempt}: that path is the tile's ■, which
 * writes a `stopped` record, reverts the attempt's metadata stamps and reopens
 * the bead's claim. Against a cancelled review session all three are wrong —
 * the cancel's CAS already wrote `failed: cancelled`, the session stamped
 * nothing, and the bead's claim belongs to a PR that is still open.
 *
 * @param {string} workspace_root
 * @param {string} attempt_id
 */
export async function stopWorkerReviewSessionProcess(
  workspace_root,
  attempt_id
) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return false;
  }
  return att.scheduler.stopReviewSessionProcess(
    keyFor(workspace_root),
    attempt_id
  );
}

/**
 * Pause a running attempt (tile ⏸, worker-phase1 §2.1), IF an attachment is
 * registered. Inert (`{ ok: false, reason: 'no_attachment' }`) without one.
 *
 * @param {string} workspace_root
 * @param {string} attempt_id
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function pauseWorkerAttempt(workspace_root, attempt_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.pause(keyFor(workspace_root), attempt_id);
}

/**
 * Manually resume a paused/failed/orphaned attempt (spec §1), IF an attachment
 * is registered. Inert (`{ ok: false, reason: 'no_attachment' }`) without one —
 * ws-handler tests and inactive workspaces stay hermetic.
 *
 * @param {string} workspace_root
 * @param {string} attempt_id
 * @param {{ continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any, instructions?: string }} [continuation]
 * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>}
 */
export async function resumeWorkerAttempt(
  workspace_root,
  attempt_id,
  continuation
) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.resume(keyFor(workspace_root), attempt_id, continuation);
}

/**
 * Release a systemic queue stop (`재개`, 2026-08-28 worker-failure-tiers spec
 * §3.4). CAS on `hold.since`, so a stop that moved under the button is refused
 * rather than silently acknowledged.
 *
 * @param {string} workspace_root
 * @param {{ since?: number|null }} input
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function resumeWorkerQueueHold(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.resumeQueueHold(keyFor(workspace_root), input);
}

/**
 * Collapse an env hold's backoff to now (`지금 재시도`, spec §4). Same CAS.
 *
 * @param {string} workspace_root
 * @param {{ since?: number|null }} input
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function retryWorkerQueueHoldNow(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.retryQueueHoldNow(keyFor(workspace_root), input);
}

/**
 * Dispatch a fresh attempt for a `parked` one (`재시도` on the tile, spec §3.1).
 * Refused unless the named attempt is still the bead's last implementation
 * attempt — the tile the user clicked must still be the current state.
 *
 * @param {string} workspace_root
 * @param {{ bead_id: string, attempt_id: string }} input
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export async function retryWorkerParkedAttempt(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.retryParked(keyFor(workspace_root), input);
}

/**
 * Acknowledge one FAILED RepoOperation row (UI-q0uy §4.6-2). The row stays
 * failed and auditable; only the 해결 필요 tally and its action buttons drop it.
 *
 * @param {string} workspace_root
 * @param {{ operation_id: string }} input
 * @returns {Promise<{ ok: boolean, code?: string, operation_id?: string }>}
 */
export async function dismissWorkerRepoOperation(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.repoOperationCoordinator) {
    return { ok: false, code: 'no_attachment' };
  }
  return att.repoOperationCoordinator.dismiss(input.operation_id);
}

/**
 * Run the declared deploy script once, right now, at the fetched remote tip
 * (UI-s582 §3) — the 배포 실행 click. Inert without a registered attachment:
 * there is no resolver to pin a target with, which is the same refusal as an
 * unresolvable one.
 *
 * `repo_id` is the repository the CLIENT drew the button for, and it is
 * REQUIRED: a click that cannot name its repository is a click from a screen
 * whose state we cannot trust, so an absent, empty or mismatched value is
 * refused rather than redirected onto whatever this workspace happens to own.
 *
 * @param {string} workspace_root
 * @param {{ repo_id?: string|null }} [input]
 * @returns {Promise<{ ok: boolean, operation_id?: string, reason?: string }>}
 */
export async function startWorkerRepoOperationDeployRun(
  workspace_root,
  input = {}
) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.repoOperationCoordinator) {
    return { ok: false, reason: 'target_unresolved' };
  }
  if (
    typeof input.repo_id !== 'string' ||
    input.repo_id.length === 0 ||
    input.repo_id !== att.repo
  ) {
    return { ok: false, reason: 'target_unresolved' };
  }
  return att.repoOperationCoordinator.runManualDeploy();
}

/**
 * Reconcile the RepoOperation lane now, instead of waiting for the periodic
 * pass.
 *
 * @param {string} workspace_root
 * @returns {Promise<void>}
 */
export async function reconcileWorkerRepoOperations(workspace_root) {
  const key = keyFor(workspace_root);
  const att = ATTACHMENTS.get(key);
  if (!att || !att.repoOperationCoordinator) {
    return;
  }
  await att.repoOperationCoordinator.reconcile(key);
}

/**
 * Kick the sequential merge driver after a queue placement (UI-5v7d §2), IF an
 * attachment is registered. Inert without one — nothing could have merged there
 * anyway, and the item stays durably queued for whenever one appears.
 *
 * Fire-and-forget by the caller, exactly like the dispatch tick: the returned
 * promise settles when the whole QUEUE drains, not when one merge does.
 *
 * @param {string} workspace_root
 * @returns {Promise<void>}
 */
export async function kickWorkerMergeQueue(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.mergeQueue) {
    return;
  }
  await att.mergeQueue.kick();
}

/**
 * Whether a queue item's [머지] click may NOT be cancelled right now. Only an
 * actual merge effect in flight (the GitHub API window) locks the item; the
 * review/repair continuation phases are cancellable — that is exactly what
 * discards the authority and makes their late results no-ops (UI-58w8 §1).
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 */
export function workerMergeEffectInFlight(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.prActions) {
    return false;
  }
  try {
    return att.prActions.isInFlight(bead_id) === true;
  } catch {
    return true;
  }
}

/**
 * Queue a manual [머지] click as a durable per-item continuation authority
 * (UI-58w8 §1). The authority binds the head/base THIS click observed, so the
 * identity comes from one fresh authoritative probe — never a cached badge —
 * and an unreadable identity makes NO queue effect at all. A blocked probe
 * (stale receipt, conflict) still queues: resolving those is exactly what the
 * authority authorizes. Without an attachment there is nothing to observe
 * through, which is the same unreadable-identity refusal.
 *
 * @param {string} workspace_root
 * @param {{ bead_id: string, expected_revision: number }} input
 * @returns {Promise<import('./queue-store.js').QueueOpResult & { reason?: string }>}
 */
export async function enqueueWorkerManualMerge(workspace_root, input) {
  const key = keyFor(workspace_root);
  const store = getWorkerRuntime().queueStore;
  const att = ATTACHMENTS.get(key);
  if (!att || !att.prActions) {
    return {
      ok: false,
      conflict: false,
      reason: 'no_attachment',
      queue: store.snapshot(key)
    };
  }
  // The CAS judges the snapshot the person clicked on, so it is taken HERE,
  // at click arrival. The probe below can take a verify's whole runtime, and
  // that verify's own record (plus background observation) advances the
  // revision meanwhile — checking the click-time revision after the probe
  // conflicted every click during base movement. Lane membership is judged
  // again inside the write, so applying at the post-probe revision loses no
  // safety.
  const at_click = store.snapshot(key);
  if (input.expected_revision !== at_click.revision) {
    return { ok: false, conflict: true, queue: at_click };
  }
  /** @type {any} */
  let probe = null;
  try {
    probe = await att.prActions.probeMergeability(input.bead_id);
  } catch (err) {
    log('manual merge probe failed for %s: %o', input.bead_id, err);
  }
  const head_sha =
    probe && typeof probe.head_sha === 'string' && probe.head_sha.length > 0
      ? probe.head_sha
      : null;
  const target_base =
    probe && typeof probe.base_ref === 'string' && probe.base_ref.length > 0
      ? probe.base_ref
      : null;
  if (head_sha === null || target_base === null) {
    return {
      ok: false,
      conflict: false,
      reason: 'pr_identity_unreadable',
      queue: store.snapshot(key)
    };
  }
  // `[리뷰 후 머지]` (UI-d7fy §5.1–§5.2). The gate reason THIS probe just took
  // decides it, not the badge the person clicked: the same authority is granted
  // either way, and the only difference is that a held row also gets a review
  // session registered in the same write and dispatched after it.
  if (att.reviewSession && isReviewAfterMergeReason(probe.reason)) {
    return att.reviewSession.start({
      bead_id: input.bead_id,
      expected_revision: store.snapshot(key).revision,
      probe: {
        head_sha,
        target_base,
        head_ref: probe.head_ref ?? null,
        pr_url: probe.pr_url ?? null,
        external: probe.external === true,
        reason: probe.reason
      }
    });
  }
  return store.enqueueMergeManual(key, {
    expected_revision: store.snapshot(key).revision,
    entries: [
      {
        bead_id: input.bead_id,
        head_sha,
        target_base,
        external: probe.external === true
      }
    ]
  });
}

/**
 * Run the SHARED enrollment step (UI-yk55 §4.2): judge the lane, apply the
 * exclusion filter, persist, fan out, and wake the driver. Both the lane's
 * toggle and `worker-merge-queue-add-all` come through here, which is what keeps
 * one eligibility rule for one queue.
 *
 * A workspace with no attachment still enrolls: the queue store and the
 * observation cache are runtime-wide, so the judgment is just as valid there —
 * only the driver kick lands on nothing, which is what an unattached workspace
 * means. A transient enroller is built for that case rather than refusing, so
 * the ws path behaves identically with and without a live attachment. It
 * subscribes to nothing, so it leaves no listener behind.
 *
 * @param {string} workspace_root
 * @param {{ expected_revision?: number|null }} [input]
 * @returns {{ applied: boolean, conflict: boolean, queued: number, queue: import('./queue-store.js').Queue|null }}
 */
export function enrollWorkerMergeCandidates(workspace_root, input = {}) {
  const key = keyFor(workspace_root);
  const att = ATTACHMENTS.get(key);
  const enroller =
    (att && att.autoMerge) ||
    createAutoMerge({
      workspace: key,
      store: getWorkerRuntime().queueStore,
      verifyState: () =>
        effectiveVerifyPolicy(
          repoOpsDisplayFor(key),
          getWorkerRuntime().queueStore.snapshot(key)
        ),
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
      kick: () => kickWorkerMergeQueue(key),
      log
    });
  return enroller.enroll(input);
}

/**
 * Observe this workspace's PRs ONCE, IF an attachment is registered — the
 * immediate pass §4.4 requires when `auto_merge` flips OFF→ON, so the enroll
 * that follows judges against a fresh cache instead of an empty one.
 *
 * @param {string} workspace_root
 * @returns {Promise<void>}
 */
export async function observeWorkerPrs(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.prPoller) {
    return;
  }
  await att.prPoller.tick();
}

/**
 * The merge driver's non-durable view (active item + per-item failure reasons)
 * for the queue-snapshot decoration. Null without an attachment, which the
 * decoration reads as "nothing is running", the same fail-quiet default the
 * other projections use.
 *
 * @param {string} workspace_root
 * @returns {import('./merge-queue.js').MergeQueueState|null}
 */
export function workerMergeQueueState(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.mergeQueue) {
    return null;
  }
  return att.mergeQueue.state();
}

/**
 * Re-scan a workspace's external PR rows (UI-7agi §1), IF an attachment is
 * registered. Inert without one — an unattached workspace renders no lane.
 *
 * Called on `subscribe-worker-queue` so the first snapshot a client receives
 * already carries the external rows instead of waiting up to a poll interval
 * for them.
 *
 * @param {string} workspace_root
 * @returns {Promise<boolean>} Whether a scan actually ran.
 */
export async function refreshWorkerExternalPrs(workspace_root) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || typeof att.refreshExternalPrs !== 'function') {
    return false;
  }
  await att.refreshExternalPrs();
  return true;
}

/**
 * Discard a `pr_wait` bead's PR, worktree and branch ([폐기], discard spec §1),
 * IF an attachment is registered. Inert without one.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<import('./pr-actions.js').DiscardResult>}
 */
export async function discardWorkerPr(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.prActions) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.prActions.discard(bead_id);
}

/**
 * Retry one human-authorized post-merge cleanup through the canonical PR
 * actions owner. Missing attachment wiring fails closed.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<{ ok: boolean, pending?: boolean, step?: string|null, reason?: string|null }>}
 */
export async function retryWorkerCleanup(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || typeof att.prActions?.retryCleanup !== 'function') {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.prActions.retryCleanup(bead_id);
}

/**
 * Start or reuse one durable unified discard operation.
 *
 * @param {string} workspace_root
 * @param {{ bead_id: string, attempt_id?: string|null, operation_id?: string|null, expected_revision: number }} input
 */
export async function discardWorkerBead(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.discardCoordinator) {
    return { ok: false, reason: 'no_attachment' };
  }
  if (typeof input.operation_id === 'string' && input.operation_id.length > 0) {
    const queue = getWorkerRuntime().queueStore.snapshot(
      keyFor(workspace_root)
    );
    const operation = queue.discard_operations?.[input.operation_id];
    if (
      !operation ||
      operation.bead_id !== input.bead_id ||
      operation.phase === 'done'
    ) {
      return { ok: false, reason: 'operation_not_retryable' };
    }
    if (queue.revision !== input.expected_revision) {
      return { ok: false, conflict: true, reason: 'revision_conflict' };
    }
    return att.discardCoordinator.retry(input.operation_id);
  }
  return att.discardCoordinator.discard(input);
}

/**
 * @param {string} workspace_root
 * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
 */
export async function continueWorkerStaleWork(workspace_root, input) {
  const key = keyFor(workspace_root);
  const att = ATTACHMENTS.get(key);
  if (!att || typeof att.scheduler?.staleWorkContinue !== 'function') {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.staleWorkContinue(key, input);
}

/**
 * @param {string} workspace_root
 * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
 */
export async function backupFreshWorkerStaleWork(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || typeof att.discardCoordinator?.backupFresh !== 'function') {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.discardCoordinator.backupFresh(input);
}

/**
 * @param {string} workspace_root
 * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
 */
export async function recheckWorkerStaleWork(workspace_root, input) {
  const key = keyFor(workspace_root);
  const att = ATTACHMENTS.get(key);
  if (!att || typeof att.scheduler?.staleWorkRecheck !== 'function') {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.staleWorkRecheck(key, input);
}

/**
 * Run the [finding 수용·수정] disposition click for a parked bead (UI-hs11
 * §3.3), IF an attachment is registered. Inert without one — a ws-handler test
 * never reaches bd or a spawn, and an unattached workspace could not have
 * dispatched the parking session in the first place.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {{ continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }} [continuation]
 * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>}
 */
export async function reviseFixWorkerBead(
  workspace_root,
  bead_id,
  continuation = {}
) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.reviseDisposition) {
    return { ok: false, reason: 'no_attachment' };
  }
  return continuation.continuation !== undefined
    ? att.reviseDisposition.fix(bead_id, continuation)
    : att.reviseDisposition.fix(bead_id);
}

/**
 * Run the [승인하고 진행] disposition click for a parked bead (UI-hs11 §3.4),
 * IF an attachment is registered. Inert without one.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<{ ok: boolean, reason?: string, sha?: string }>}
 */
export async function reviseApproveWorkerBead(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.reviseDisposition) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.reviseDisposition.approve(bead_id);
}

/**
 * Test hook: register a (fake) attachment so the ws-handler wiring can be
 * exercised without a real spawn.
 *
 * @param {string} workspace_root
 * @param {ReturnType<typeof createWorkerAttachment>} attachment
 */
export function __registerWorkerAttachmentForTest(workspace_root, attachment) {
  const key = keyFor(workspace_root);
  ATTACHMENT_STARTUPS.delete(key);
  ATTACHMENTS.set(key, attachment);
}

/**
 * Test hook: replace the unattached label reader so ws tests never reach a real
 * Beads database.
 *
 * @param {typeof checkUnattachedWorkerAdmission} reader
 */
export function __setUnattachedAdmissionCheckForTest(reader) {
  unattachedAdmissionCheck = reader;
}

/**
 * Test hook: drop all registered attachments, stopping their PR pollers and
 * timers so no armed timer or queue-changed hook outlives the test
 * that built it.
 */
export function __resetWorkerAttachmentsForTest() {
  for (const att of ATTACHMENTS.values()) {
    try {
      att.prPoller?.stop();
    } catch {
      /* ignore */
    }
    try {
      att.autoMerge?.stop();
    } catch {
      /* ignore */
    }
    try {
      att.completionIntent?.stop();
    } catch {
      // ignore
    }
    try {
      att.beadsChanges?.stop();
    } catch {
      /* ignore */
    }
    try {
      att.sessionMonitors?.stopAll();
    } catch {
      /* ignore */
    }
  }
  ATTACHMENTS.clear();
  ATTACHMENT_STARTUPS.clear();
  auto_advance_restore_controller = null;
  unattachedAdmissionCheck = checkUnattachedWorkerAdmission;
}
