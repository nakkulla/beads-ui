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
import { runBdJson, runShell, unwrapShowJson } from '../bd.js';
import { getConfig } from '../config.js';
import { debug } from '../logging.js';
import { createPoller } from '../poller.js';
import { validateAdmission } from './admission.js';
import { createBdMetadata } from './bd-metadata.js';
import { createNotifier } from './notify.js';
import { createPrActions } from './pr-actions.js';
import { createPrPoller } from './pr-poller.js';
import { emitQueueChanged } from './queue-events.js';
import { createReviseDisposition } from './revise-disposition.js';
import { createRunner } from './runner/index.js';
import { getWorkerRuntime } from './runtime.js';
import { createScheduler } from './scheduler.js';
import { createSessionMonitors } from './session-monitor.js';
import { replayUsage } from './usage-replay.js';
import { resolveVerifyCmd, runVerifyAtSha } from './verify-cmd.js';
import { createVerifier } from './verify.js';
import { createWorktreeManager } from './worktree.js';

const log = debug('worker:attach');

/**
 * The last-resort merge target base: used when neither the bead's `target_base`
 * metadata nor the repo's `[worker.target_base]` config pins one. Worker
 * dispatch lands work on this branch of the repo.
 *
 * @type {string}
 */
const DEFAULT_TARGET_BASE = 'main';

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
 * The workspace's configured merge target base from `[worker.target_base]`
 * (worker-target-base §1), or null when the repo pins none.
 *
 * Read at construction time, like the rest of the attachment's wiring. Any
 * config read failure yields null so a broken config degrades to the default
 * instead of blocking attachment construction.
 *
 * @param {string} workspace_root
 * @returns {string|null}
 */
function configTargetBase(workspace_root) {
  try {
    const map = getConfig().worker_target_base;
    const base = map ? map[path.resolve(String(workspace_root || ''))] : null;
    return typeof base === 'string' && base.length > 0 ? base : null;
  } catch {
    return null;
  }
}

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
 * @param {{ cwd: string, repo: string, target_base: string, runJson?: (args: string[], options?: any) => Promise<{ code: number, stdoutJson?: any, stderr?: string }>, run?: (args: string[], options?: any) => Promise<{ code: number, stdout: string, stderr: string }> }} config
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
      const spec_id = typeof md.spec_id === 'string' ? md.spec_id : null;
      const spec_review = Object.hasOwn(md, 'spec_review')
        ? md.spec_review
        : undefined;

      return {
        ready,
        blocked,
        repo: config.repo,
        target_base:
          typeof md.target_base === 'string' && md.target_base.length > 0
            ? md.target_base
            : config.target_base,
        model:
          typeof md.orchestration_model === 'string'
            ? md.orchestration_model
            : undefined,
        effort:
          typeof md.orchestration_effort === 'string'
            ? md.orchestration_effort
            : undefined,
        review_model:
          typeof md.review_model === 'string' ? md.review_model : undefined,
        impl_model:
          typeof md.impl_model === 'string' ? md.impl_model : undefined,
        workflow_mode:
          typeof md.workflow_mode === 'string' ? md.workflow_mode : null,
        route,
        status,
        title: typeof issue.title === 'string' ? issue.title : null,
        spec_id,
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
 *   target_base?: string,
 *   bd?: any,
 *   worktree?: any,
 *   verify?: any,
 *   gh?: any,
 *   makeRunner?: (name: string) => any,
 *   spawn_impl?: (command: string, args: string[], options: any) => any,
 *   kill_impl?: (pid: number, signal?: NodeJS.Signals|number) => void,
 *   probePid?: (pid: number|null) => { alive: boolean, started_at: number|null },
 *   sessionMonitors?: any,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   admission?: any,
 *   notify?: any,
 *   reviseDisposition?: any,
 *   getSubscriberCount?: () => number
 * }} [options]
 */
export function createWorkerAttachment(workspace_root, options = {}) {
  const runtime = options.runtime || getWorkerRuntime();
  const repo = options.repo || workspace_root;
  // Resolution order (worker-target-base §1): bead metadata (applied per-bead in
  // createLiveBd.snapshotBead) > repo config > 'main'. `options.target_base`
  // stays the test-injection seam ahead of both.
  const target_base =
    options.target_base ??
    configTargetBase(workspace_root) ??
    DEFAULT_TARGET_BASE;

  const bd =
    options.bd || createLiveBd({ cwd: workspace_root, repo, target_base });

  // Workspace-scoped admission accessor (worker-autorun-policy §1): the
  // scheduler validates candidates/dispatches through `validate` (base
  // defaults to the CURRENT base ref tip; dispatch pins the worktree
  // base_oid), and the ws place handler pre-checks through `check`.
  const gitRun =
    options.gitRun ||
    ((/** @type {string[]} */ args, /** @type {any} */ opts) =>
      runShell('git', args, opts));
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
      return validateAdmission({
        gitRun,
        ghAvailable,
        repo: snap.repo,
        base: base || snap.target_base,
        // Refusals name the attempt's BRANCH even when the check runs against a
        // pinned base_oid — a SHA cannot tell the operator the base is wrong.
        base_label: snap.target_base,
        bead: {
          route: snap.route,
          spec_id: snap.spec_id,
          spec_review: snap.spec_review
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

  const makeRunner =
    options.makeRunner ||
    ((name) =>
      createRunner(name, {
        spawn_impl: options.spawn_impl || ((c, a, o) => spawn(c, a, o)),
        kill_impl: options.kill_impl
      }));

  // The outward attempt-lifecycle push (UI-2yoq). Config is read per call, so a
  // machine that never opted into `[worker.notify]` pushes nothing and a toggle
  // takes effect without a restart.
  const notify = options.notify || createNotifier({ getConfig });

  // The disposition actions need the scheduler and the scheduler needs their
  // completion verdict, so the dep is a late-bound indirection rather than a
  // constructor argument. Before the binding lands (it does, one statement
  // later) the verdict fails closed, which is also what an attachment built
  // without disposition wiring reports.
  /** @type {ReturnType<typeof createReviseDisposition>|null} */
  let reviseDisposition = null;

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
      notifyChanged: (ws_key) => emitQueueChanged(ws_key)
    });

  const scheduler = createScheduler({
    store: runtime.queueStore,
    makeRunner,
    bd,
    worktree,
    verify,
    sessionLog: runtime.sessionLog,
    usage: runtime.usageStore,
    admission,
    notify,
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
    probePid,
    sessionMonitors,
    notifyQueueChanged: (ws_key) => emitQueueChanged(ws_key)
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
   * The workspace's resolved verify command, read LIVE (config can change
   * between a poll and a click) — shared by the poller's pre-merge tier and the
   * actions' click-time re-verification + post-merge verification.
   *
   * @returns {import('./verify-cmd.js').ResolvedVerifyCmd|null}
   */
  const resolveVerify = () => {
    try {
      return resolveVerifyCmd(repo, getConfig().worker_verify);
    } catch {
      return null;
    }
  };

  /**
   * The workspace's post-merge deploy command, also read LIVE so a config edit
   * lands without a restart. Config-only by design (worker-deploy-hook §1):
   * absent section = this repo has no deployment.
   *
   * @returns {import('./pr-actions.js').ResolvedDeployCmd|null}
   */
  const resolveDeploy = () => {
    try {
      return getConfig().worker_deploy[repo] || null;
    } catch {
      return null;
    }
  };

  // The PR-wait actions (worker-phase2 §6): the authoritative [머지] click, the
  // single post-merge cleanup, and [폐기]. Built with the SAME gh adapter,
  // observation cache, worktree manager and scheduler the poller and dispatch
  // use, so a click can never act on a different view of the world than the
  // badges it followed.
  const prActions = createPrActions({
    workspace: keyFor(workspace_root),
    repo,
    store: runtime.queueStore,
    gh,
    observations: runtime.prObservations,
    activity: runtime.activityStore,
    bd,
    worktree,
    gitRun,
    scheduler,
    resolveVerify,
    runVerify: (/** @type {any} */ input) =>
      runVerifyAtSha({ ...input, worktree, git: gitRun }),
    resolveDeploy,
    notifyChanged: (/** @type {string} */ ws_key) => emitQueueChanged(ws_key)
  });

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
    notifyChanged: (ws_key) => emitQueueChanged(ws_key)
  });

  return {
    runtime,
    scheduler,
    reconciler,
    prPoller,
    prActions,
    reviseDisposition,
    sessionMonitors,
    bd,
    admission,
    repo,
    target_base,
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
    if (!att) {
      att = createWorkerAttachment(key, {
        getSubscriberCount:
          typeof countFor === 'function' ? () => countFor(key) : undefined
      });
      ATTACHMENTS.set(key, att);
      if (typeof countFor === 'function') {
        try {
          att.prPoller.start();
        } catch (err) {
          log('pr poller start failed for %s: %o', key, err);
        }
      }
    }
    try {
      att.reconciler.start();
    } catch (err) {
      log('reconcile timer start failed for %s: %o', key, err);
    }
    // Before the startup pass judges those attempts: rebuild what their tally
    // was (the disposition below is the write that persists it — UI-ediw) and
    // re-arm the live half for the ones still running — drawer follow, merge
    // guard, continued usage (UI-o2yt §3.3).
    recoverRunningAttempts(att, key);
    // Startup pass: a session that died WITH the old server may already have
    // pushed its PR, so the same routine that handles a later death decides
    // this one too. Fire-and-forget — a slow `gh` must not hold up startup.
    try {
      Promise.resolve(att.scheduler.reconcile(key)).catch((err) => {
        log('startup reconcile failed for %s: %o', key, err);
      });
    } catch (err) {
      log('startup reconcile failed for %s: %o', key, err);
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
 * Pre-check auto-run admission for a queue placement, IF an attachment is
 * registered. Returns `null` when none is (ws-handler tests and inactive
 * workspaces stay hermetic — no bd/git reachable, and nothing can dispatch
 * there anyway; the dispatch-time re-check stays the authoritative gate).
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<import('./admission.js').AdmissionResult | null>}
 */
export async function checkWorkerQueueAdmission(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.admission) {
    return null;
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
 * Run the authoritative [머지] click for a `pr_wait` bead (worker-phase2 §6),
 * IF an attachment is registered. Inert without one — a ws-handler test never
 * reaches `gh`, and an unattached workspace could not have dispatched the bead
 * in the first place.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {Promise<import('./pr-actions.js').MergeClickResult>}
 */
export async function mergeWorkerPr(workspace_root, bead_id) {
  const att = ATTACHMENTS.get(keyFor(workspace_root));
  if (!att || !att.prActions) {
    return { ok: false, action: 'refused', reason: 'no_attachment' };
  }
  return att.prActions.merge(bead_id);
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
 * Test hook: register a (fake) attachment so the ws-handler wiring can be
 * exercised without a real spawn.
 *
 * @param {string} workspace_root
 * @param {ReturnType<typeof createWorkerAttachment>} attachment
 */
export function __registerWorkerAttachmentForTest(workspace_root, attachment) {
  ATTACHMENTS.set(keyFor(workspace_root), attachment);
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
      att.sessionMonitors?.stopAll();
    } catch {
      /* ignore */
    }
  }
  ATTACHMENTS.clear();
}
