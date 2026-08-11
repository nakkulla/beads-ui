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
import { runBdJson, runShell, unwrapShowJson } from '../bd.js';
import { getConfig } from '../config.js';
import { debug } from '../logging.js';
import { createPoller } from '../poller.js';
import { resolveSpecId } from '../spec-id.js';
import { parsePrNumber } from '../workflow-enrich.js';
import { validateAdmission } from './admission.js';
import { createAutoMerge } from './auto-merge.js';
import { createBdMetadata } from './bd-metadata.js';
import {
  createCompletionActionDriver,
  createCompletionIntentCoordinator
} from './completion-intent.js';
import { createCompletionRepairService } from './completion-repair.js';
import { createDiscardCoordinator } from './discard-coordinator.js';
import { observedHeadSha } from './merge-candidates.js';
import { createMergeQueue } from './merge-queue.js';
import { createNotifier } from './notify.js';
import { createPrActions } from './pr-actions.js';
import { createPrPoller } from './pr-poller.js';
import { createProcessController } from './process-controller.js';
import { emitQueueChanged, onQueueChanged } from './queue-events.js';
import { createRecoveryArchive } from './recovery-archive.js';
import {
  peekVerifyResolution,
  resolveDeployAt,
  resolveVerifyAt
} from './repo-ops.js';
import { createRevertBuilder } from './revert-builder.js';
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
 * @param {{ cwd: string, repo: string, resolveBase: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>, runJson?: (args: string[], options?: any) => Promise<{ code: number, stdoutJson?: any, stderr?: string }>, run?: (args: string[], options?: any) => Promise<{ code: number, stdout: string, stderr: string }> }} config
 */
export function createLiveBd(config) {
  const cwd = config.cwd;
  const runJson =
    config.runJson || ((args, options) => runBdJson(args, options));
  const meta = createBdMetadata({
    cwd,
    run: config.run,
    runJson: config.runJson
  });

  return {
    ...meta,
    /**
     * @param {string} bead_id
     * @returns {Promise<BeadSnapshot>}
     */
    async snapshotBead(bead_id) {
      const shown = await runJson(['show', bead_id, '--json'], { cwd });
      if (shown && typeof shown.code === 'number' && shown.code !== 0) {
        throw new Error(
          `bd show ${bead_id} failed (${shown.code}): ${(
            shown.stderr || ''
          ).trim()}`
        );
      }
      const unwrapped = unwrapShowJson(shown && shown.stdoutJson);
      if (!unwrapped) {
        throw new Error(`bd show ${bead_id} returned an unreadable payload`);
      }
      const issue = /** @type {any} */ (unwrapped);
      const md =
        issue.metadata && typeof issue.metadata === 'object'
          ? issue.metadata
          : {};
      const status = typeof issue.status === 'string' ? issue.status : '';
      const closed = status === 'closed' || status === 'resolved';

      const readyList = await runJson(['ready', '--limit', '1000', '--json'], {
        cwd
      });
      if (
        readyList &&
        typeof readyList.code === 'number' &&
        readyList.code !== 0
      ) {
        throw new Error(
          `bd ready failed (${readyList.code}): ${(
            readyList.stderr || ''
          ).trim()}`
        );
      }
      const ready_rows = readyRows(readyList && readyList.stdoutJson);
      if (!ready_rows) {
        throw new Error('bd ready returned an unreadable payload');
      }
      const ready_ids = readyIdSet(ready_rows);

      const ready = !closed && ready_ids.has(bead_id);
      const blocked = !closed && !ready_ids.has(bead_id);

      const route = typeof md.route === 'string' ? md.route : null;
      // Presence rule for the admission inputs: a malformed spec_review must
      // reach the validator as present-and-invalid, never as absent.
      const spec = resolveSpecId(issue);
      const spec_id = spec.path || null;
      const spec_review = Object.hasOwn(md, 'spec_review')
        ? md.spec_review
        : undefined;

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
        route,
        status,
        title: typeof issue.title === 'string' ? issue.title : null,
        labels: workerLabels(issue.labels),
        spec_id,
        spec_id_conflict: spec.conflict,
        spec_review,
        deps: []
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
 *   spawn_impl?: (command: string, args: string[], options: any) => any,
 *   kill_impl?: (pid: number, signal?: NodeJS.Signals|number) => void,
 *   probePid?: (pid: number|null) => { alive: boolean, started_at: number|null },
 *   processController?: ReturnType<typeof createProcessController>,
 *   sessionMonitors?: any,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   admission?: any,
 *   notify?: any,
 *   reviseDisposition?: any,
 *   mergeQueue?: any,
 *   autoMerge?: any,
 *   completionIntent?: any,
 *   completionActionDriver?: any,
 *   completionRepair?: any,
 *   discardCoordinator?: any,
 *   recoveryArchive?: ReturnType<typeof createRecoveryArchive>,
 *   getSubscriberCount?: () => number
 * }} [options]
 */
export function createWorkerAttachment(workspace_root, options = {}) {
  const runtime = options.runtime || getWorkerRuntime();
  const repo = options.repo || workspace_root;
  const gitRun =
    options.gitRun ||
    ((/** @type {string[]} */ args, /** @type {any} */ opts) =>
      runShell('git', args, opts));

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

  const bd =
    options.bd || createLiveBd({ cwd: workspace_root, repo, resolveBase });

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
          spec_id: snap.spec_id,
          spec_id_conflict: snap.spec_id_conflict,
          spec_review: snap.spec_review,
          labels: snap.labels
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
  const worktree =
    options.worktree || createWorktreeManager({ locks: runtime.locks });
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
      probePid,
      kill_impl: options.kill_impl,
      ...(processController ? { processController } : {}),
      notifyChanged: (ws_key) => emitQueueChanged(ws_key)
    });

  const scheduler = createScheduler({
    store: runtime.queueStore,
    execPresetCoordinator: runtime.execPresetCoordinator,
    makeRunner,
    bd,
    worktree,
    verify,
    sessionLog: runtime.sessionLog,
    usage: runtime.usageStore,
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
    cleanupDiagnosis: {
      /** @param {string} bead_id */
      async retryCleanup(bead_id) {
        if (!prActions) {
          return { ok: false, reason: 'retry_unwired' };
        }
        const result = await prActions.retryCleanup(bead_id);
        return {
          ok: result.ok,
          ...(typeof result.reason === 'string'
            ? { reason: result.reason }
            : {})
        };
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

  const recoveryArchive = options.recoveryArchive || createRecoveryArchive();
  const discardCoordinator =
    options.discardCoordinator ||
    createDiscardCoordinator({
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
        const resolved = await resolveVerify({
          sha: input.base_sha,
          force: true
        });
        if (resolved.state !== 'resolved') {
          return {
            ok: false,
            reason:
              resolved.state === 'invalid'
                ? 'verify_config_invalid'
                : 'verify_missing'
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
      rollbackBaseSync: (/** @type {any} */ refs) =>
        prActions
          ? prActions.rollbackBaseSync(refs)
          : Promise.resolve({ ok: false, reason: 'rollback_cleanup_unwired' }),
      rollbackVerify: (
        /** @type {string} */ bead_id,
        /** @type {string} */ base_sha
      ) =>
        prActions
          ? prActions.rollbackVerify(bead_id, base_sha)
          : Promise.resolve({ ok: false, reason: 'rollback_cleanup_unwired' }),
      rollbackResolveDeploy: (
        /** @type {string} */ bead_id,
        /** @type {string} */ base_sha,
        /** @type {string} */ target_base
      ) =>
        prActions
          ? prActions.rollbackResolveDeploy(bead_id, base_sha, target_base)
          : Promise.resolve({ ok: false, reason: 'rollback_cleanup_unwired' }),
      launchRollbackDeploy: (
        /** @type {string} */ bead_id,
        /** @type {any} */ pending_deploy
      ) => prActions?.launchRollbackDeploy(bead_id, pending_deploy),
      external: {
        get: (/** @type {string} */ ws_key, /** @type {string} */ bead_id) =>
          runtime.externalPrs.get(ws_key, bead_id)
      },
      actionInFlight: (/** @type {string} */ bead_id) =>
        prActions?.isInFlight(bead_id) === true,
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key)
    });

  // REVISE-parking disposition (UI-hs11 §3.2–§3.4): the two human clicks that
  // dispose of a bead parked at `blocked_reason=spec_review_stale:revise`.
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
    }
  });

  // Keep runtime.status()'s running_count in sync with THIS scheduler.
  runtime.setRunningCountProvider(() => scheduler.runningCount());

  /**
   * The base sha a PRE-MERGE resolution pins to: the FETCHED remote tip of the
   * target base (UI-kfl4 §4.1). Null when the base cannot be resolved, which
   * drops the declaration rung and leaves the legacy config rung answering
   * alone — the behaviour that existed before the declaration was read at all.
   *
   * @returns {Promise<string|null>}
   */
  const premergePin = async (/** @type {boolean} */ force) => {
    try {
      const resolved = await resolveBase(force ? { force: true } : {});
      return resolved.ok ? resolved.base_oid : null;
    } catch {
      return null;
    }
  };

  /**
   * Which commit a resolution reads rung 1 from.
   *
   * @typedef {Object} OpsPin
   * @property {string|null} [sha] - An explicit pin: the cleanup's synced base
   * commit. Everything else omits it and takes the pre-merge pin.
   * @property {boolean} [force] - Re-resolve the target base instead of taking
   * the scan memo. Set by the AUTHORITATIVE click-time gate, whose whole job is
   * to judge against the base as it stands right now.
   */

  /**
   * The workspace's resolved verify command, read LIVE (both rungs can change
   * between a poll and a click) — shared by the poller's pre-merge tier and the
   * actions' click-time re-verification + post-merge verification.
   *
   * A THROWN resolution is `invalid`, not `absent`: a resolver that could not
   * answer must never be read as a repo that declares nothing, which is a
   * passing tier for the merge gate.
   *
   * @param {OpsPin} [pin]
   * @returns {Promise<import('./repo-ops.js').VerifyResolution>}
   */
  const resolveVerify = async (pin = {}) => {
    try {
      return await resolveVerifyAt({
        gitRun,
        repo,
        sha: pin.sha || (await premergePin(pin.force === true)),
        config_map: getConfig().worker_verify
      });
    } catch (err) {
      log('verify resolution failed for %s: %o', repo, err);
      return {
        state: 'invalid',
        source: 'declaration',
        detail: 'resolver_threw'
      };
    }
  };

  /**
   * The workspace's post-merge deploy command, on the same two-rung ladder and
   * the same pin contract as {@link resolveVerify}.
   *
   * @param {OpsPin} [pin]
   * @returns {Promise<import('./repo-ops.js').DeployResolution>}
   */
  const resolveDeploy = async (pin = {}) => {
    try {
      return await resolveDeployAt({
        gitRun,
        repo,
        sha: pin.sha || (await premergePin(pin.force === true)),
        config_map: getConfig().worker_deploy
      });
    } catch (err) {
      log('deploy resolution failed for %s: %o', repo, err);
      return {
        state: 'invalid',
        source: 'declaration',
        detail: 'resolver_threw'
      };
    }
  };

  /**
   * Monotonic counter ordering overlapping {@link refreshExternalPrs} calls:
   * only the newest scan in flight may apply its result.
   */
  let external_scan_generation = 0;

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
   * exclusion and the registration.
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
    const { pr_rows, statuses } = await bd.scanBeads();
    if (generation !== external_scan_generation) {
      return;
    }
    /** @type {Set<string>|null} */
    let protected_ids = null;
    try {
      protected_ids = scheduler.externalProtectedBeadIds(
        keyFor(workspace_root)
      );
    } catch (err) {
      log(
        'external protection set unreadable for %s: %o',
        keyFor(workspace_root),
        err
      );
    }
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
      /** @type {{ bead_id: string, pr_url: string, pr_number: number|null }[]} */
      const rows = [];
      for (const row of /** @type {{ bead_id: string, pr_url: string }[]} */ (
        pr_rows
      )) {
        if (protected_ids.has(row.bead_id)) {
          excluded.push(row.bead_id);
          continue;
        }
        rows.push({
          bead_id: row.bead_id,
          pr_url: row.pr_url,
          pr_number: parsePrNumber(row.pr_url)
        });
      }
      if (excluded.length > 0) {
        // Normal operation, not an anomaly — logged only so the lane's absence
        // is explainable.
        log(
          'external scan skipped worker-owned beads for %s: %s',
          keyFor(workspace_root),
          excluded.join(', ')
        );
      }
      runtime.externalPrs.replace(keyFor(workspace_root), rows);
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
    resolveDeploy,
    notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
    // The SAME notifier the scheduler pushes attempt transitions through, so
    // the merge that closes a bead lands in the same channel as its start and
    // its PR (UI-9rrk).
    notify
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
      merge: (/** @type {string} */ bead_id) => prActions.merge(bead_id),
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
      verifyCmdState: () => {
        try {
          return peekVerifyResolution(
            keyFor(workspace_root),
            getConfig().worker_verify
          ).state;
        } catch {
          return 'absent';
        }
      },
      notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key),
      // Persist alone leaves items in a queue nobody drains (UI-yk55 §4.2).
      kick: () => mergeQueue.kick(),
      subscribeQueueChanged: onQueueChanged,
      log
    });

  const completionRepair =
    options.completionRepair ||
    createCompletionRepairService({
      bd,
      repo,
      gh,
      resolveVerify,
      runVerify: (/** @type {any} */ input) =>
        runVerifyAtSha({ ...input, worktree, git: gitRun })
    });

  const resolvedCompletionActionDriver =
    options.completionActionDriver ||
    createCompletionActionDriver({
      workspace: keyFor(workspace_root),
      store: runtime.queueStore,
      prActions,
      completionRepair,
      scheduler,
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
      onAttemptSettled: resolvedCompletionActionDriver.onAttemptSettled,
      log
    });
  completionIntent = resolvedCompletionIntent;

  // PR poller (worker-phase2 §4): watches this workspace's `pr_wait` PRs. It is
  // BUILT here but never started here — `initWorkerRuntime` starts it only when
  // a real subscriber-count provider is wired, so a test that constructs an
  // attachment can never reach `gh`. Its default subscriber count is 0, which
  // by itself already makes every pass a no-op.
  const prPoller = createPrPoller({
    workspace: keyFor(workspace_root),
    repo,
    store: runtime.queueStore,
    gh,
    observations: runtime.prObservations,
    activity: runtime.activityStore,
    getSubscriberCount: options.getSubscriberCount || (() => 0),
    resolveVerify,
    worktree,
    gitRun,
    // The externally-observed MERGED trigger routes into the SAME cleanup the
    // button runs — one implementation, two triggers (worker-phase2 §6).
    onMerged: (bead_id) => prActions.cleanupObservedMerge(bead_id),
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
    completionRepair,
    refreshExternalPrs,
    reviseDisposition,
    sessionMonitors,
    processController,
    bd,
    // Exposed so the ws snapshot decoration can ask whether a bead's worktree
    // still exists (UI-w0hi §3); the manager itself stays attachment-owned.
    worktree,
    admission,
    repo,
    resolveBase,
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
    const session_log = att.runtime.sessionLog;
    for (const [attempt_id, attempt] of Object.entries(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (!a || a.status !== 'running') {
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
    if (att.runtime.queueStore.snapshot(key).auto_merge === true) {
      Promise.resolve(att.prPoller.tick()).catch((err) => {
        log('auto-merge boot observation failed for %s: %o', key, err);
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
}

/**
 * Create + register attachments for each active workspace, then reconcile the
 * `running` attempts persisted from a prior run and arm the periodic reconcile
 * timer (worker-detached-session-reconcile §2). Idempotent per workspace.
 *
 * `getSubscriberCount` is what turns the PR poller on (worker-phase2 §4): the
 * caller supplies the live worker-queue subscriber count for a workspace, and
 * the poller queries `gh` only while that is positive. Omitting it leaves every
 * poller armed-but-silent, which is what keeps tests off the network.
 *
 * @param {{ workspaces: string[], getSubscriberCount?: (workspace: string) => number }} input
 * @returns {ReturnType<typeof createWorkerAttachment>[]}
 */
export function initWorkerRuntime(input) {
  /** @type {ReturnType<typeof createWorkerAttachment>[]} */
  const built = [];
  const countFor = input.getSubscriberCount;
  for (const ws of input.workspaces || []) {
    if (!ws) {
      continue;
    }
    const key = keyFor(ws);
    let att = ATTACHMENTS.get(key);
    let created = false;
    if (!att) {
      att = createWorkerAttachment(key, {
        getSubscriberCount:
          typeof countFor === 'function' ? () => countFor(key) : undefined
      });
      ATTACHMENTS.set(key, att);
      created = true;
    }
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
  const shown = await runBdJson(['show', bead_id, '--json'], {
    cwd: keyFor(workspace_root)
  });
  if (!shown || shown.code !== 0) {
    return { ok: false, reason: 'bd_snapshot_failed' };
  }
  const issue = unwrapShowJson(shown.stdoutJson);
  if (!issue) {
    return { ok: false, reason: 'bd_snapshot_failed' };
  }
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
 * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
 */
export async function resumeWorkerAttempt(workspace_root, attempt_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.resume(keyFor(workspace_root), attempt_id);
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
      verifyCmdState: () => {
        try {
          return peekVerifyResolution(key, getConfig().worker_verify).state;
        } catch {
          return 'absent';
        }
      },
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
 * Start or reuse one durable unified discard operation.
 *
 * @param {string} workspace_root
 * @param {{ bead_id: string, attempt_id?: string|null, expected_revision: number }} input
 */
export async function discardWorkerBead(workspace_root, input) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.discardCoordinator) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.discardCoordinator.discard(input);
}

/**
 * Run the [finding 수용·수정] disposition click for a parked bead (UI-hs11
 * §3.3), IF an attachment is registered. Inert without one — a ws-handler test
 * never reaches bd or a spawn, and an unattached workspace could not have
 * dispatched the parking session in the first place.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
 */
export async function reviseFixWorkerBead(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.reviseDisposition) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.reviseDisposition.fix(bead_id);
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
 * Start a human-requested cleanup diagnosis, if this workspace has a live
 * scheduler attachment.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
 */
export async function diagnoseWorkerCleanup(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att) {
    return { ok: false, reason: 'no_attachment' };
  }
  return att.scheduler.dispatchCleanupDiagnosis(
    keyFor(workspace_root),
    bead_id
  );
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
 * reconcile timers so no armed timer or queue-changed hook outlives the test
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
      att.reconciler?.stop();
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
  unattachedAdmissionCheck = checkUnattachedWorkerAdmission;
}
