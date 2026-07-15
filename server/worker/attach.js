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
 *     independent verifier, the shared session-log broker, and the process-wide
 *     breaker/locks/tokens singletons — plus an orphan detector. EVERYTHING is
 *     injectable so tests pass fakes (never a real spawn).
 *   - The lock_state fed to each session is the runtime's merge-lock ledger, so
 *     the session-side fail-closed guard (session.js) can tell whether THIS
 *     session holds the (repo, target_base) merge lock.
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
import { runBdJson, runShell } from '../bd.js';
import { debug } from '../logging.js';
import { createBdMetadata } from './bd-metadata.js';
import { createOrphanDetector } from './orphan.js';
import { createRunner } from './runner/index.js';
import { getWorkerRuntime } from './runtime.js';
import { createScheduler } from './scheduler.js';
import { createVerifier } from './verify.js';
import { createWorktreeManager } from './worktree.js';

const log = debug('worker:attach');

/**
 * The default merge target base when a bead does not pin one. Worker dispatch
 * lands work on this branch of the repo.
 *
 * @type {string}
 */
const DEFAULT_TARGET_BASE = 'main';

/**
 * Live-bound server port for the merge-lock endpoint injected into each session
 * preamble. Set by {@link setWorkerPort} once the server begins listening; read
 * late (per dispatch) so an attachment built before `listen` still gets it.
 *
 * @type {number}
 */
let WORKER_PORT = 0;

/**
 * Set the live server port. Called from server startup after `listen`.
 *
 * @param {number} port
 */
export function setWorkerPort(port) {
  if (typeof port === 'number' && Number.isFinite(port)) {
    WORKER_PORT = port;
  }
}

/**
 * Extract the ready-issue id set from a `bd ready --json` payload, tolerating
 * either an array of issues or a `{ ready: [...] }` / `{ issues: [...] }` object.
 *
 * @param {unknown} json
 * @returns {Set<string>}
 */
function readyIdSet(json) {
  /** @type {any[]} */
  let arr = [];
  if (Array.isArray(json)) {
    arr = json;
  } else if (json && typeof json === 'object') {
    const o = /** @type {any} */ (json);
    arr = Array.isArray(o.ready)
      ? o.ready
      : Array.isArray(o.issues)
        ? o.issues
        : [];
  }
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
 * Build the live `bd` dependency the scheduler + orphan detector consume:
 * metadata set/unset/read (from bd-metadata.js) PLUS `snapshotBead` which reads
 * `bd show --json` (status + exec-settings metadata) and `bd ready --json`
 * (authoritative runnable set) for the workspace. Best-effort + fail-safe: any
 * bd failure yields not-ready (nothing dispatches) rather than a throw.
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
      const issue =
        shown && shown.stdoutJson && typeof shown.stdoutJson === 'object'
          ? /** @type {any} */ (shown.stdoutJson)
          : {};
      const md =
        issue.metadata && typeof issue.metadata === 'object'
          ? issue.metadata
          : {};
      const status = typeof issue.status === 'string' ? issue.status : '';
      const closed = status === 'closed' || status === 'resolved';

      /** @type {Set<string>} */
      let ready_ids = new Set();
      try {
        const readyList = await runJson(
          ['ready', '--limit', '1000', '--json'],
          {
            cwd
          }
        );
        ready_ids = readyIdSet(readyList && readyList.stdoutJson);
      } catch {
        ready_ids = new Set();
      }

      const ready = !closed && ready_ids.has(bead_id);
      const blocked = !closed && !ready_ids.has(bead_id);
      return {
        ready,
        blocked,
        repo: config.repo,
        target_base:
          typeof md.target_base === 'string' && md.target_base.length > 0
            ? md.target_base
            : config.target_base,
        runner:
          typeof md.worker_runner === 'string' ? md.worker_runner : undefined,
        model:
          typeof md.orchestration_model === 'string'
            ? md.orchestration_model
            : undefined,
        effort:
          typeof md.orchestration_effort === 'string'
            ? md.orchestration_effort
            : undefined,
        workflow_mode:
          typeof md.workflow_mode === 'string' ? md.workflow_mode : null,
        route: typeof md.route === 'string' ? md.route : null,
        plan_path: typeof md.plan_path === 'string' ? md.plan_path : null,
        deps: []
      };
    }
  };
}

/**
 * Real PID liveness + start-time probe for orphan detection. Aliveness via
 * `kill(pid, 0)`; start time via `ps -o lstart=` (second resolution — the
 * detector's tolerance absorbs the coarseness). Fail-safe: any error yields
 * `{ alive:false }` so a genuinely-dead PID is reaped.
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
 *   makeRunner?: (name: string) => any,
 *   spawn_impl?: (command: string, args: string[], options: any) => any,
 *   kill_impl?: (pid: number, signal?: NodeJS.Signals|number) => void,
 *   ccx_env?: Record<string, string|undefined>,
 *   probePid?: (pid: number|null) => { alive: boolean, started_at: number|null },
 *   port?: number | (() => number),
 *   parallel_slots?: number
 * }} [options]
 */
export function createWorkerAttachment(workspace_root, options = {}) {
  const runtime = options.runtime || getWorkerRuntime();
  const repo = options.repo || workspace_root;
  const target_base = options.target_base || DEFAULT_TARGET_BASE;

  const bd =
    options.bd || createLiveBd({ cwd: workspace_root, repo, target_base });
  const worktree =
    options.worktree || createWorktreeManager({ locks: runtime.locks });
  const verify =
    options.verify ||
    createVerifier({
      gitRun: (args, opts) => runShell('git', args, opts),
      bdShow: async (bead_id) => {
        const r = await runBdJson(['show', bead_id, '--json'], {
          cwd: workspace_root
        });
        return r && r.stdoutJson && typeof r.stdoutJson === 'object'
          ? /** @type {any} */ (r.stdoutJson)
          : null;
      }
    });

  // The lock_state each session sees: the runtime's merge-lock ledger. Fail
  // closed — when no ledger is wired yet, isHeldBy is false, so ANY merge attempt
  // is treated as unlocked (killed).
  const lock_state = {
    /** @param {string|undefined} token */
    isHeldBy: (token) =>
      !!(runtime.mergeLock && token && runtime.mergeLock.isHeldBy(token))
  };

  const makeRunner =
    options.makeRunner ||
    ((name) =>
      createRunner(name, {
        spawn_impl: options.spawn_impl || ((c, a, o) => spawn(c, a, o)),
        kill_impl: options.kill_impl,
        ccx_env: options.ccx_env,
        lock_state
      }));

  const scheduler = createScheduler({
    store: runtime.queueStore,
    makeRunner,
    bd,
    worktree,
    tokens: runtime.tokens,
    verify,
    breaker: runtime.breaker,
    sessionLog: runtime.sessionLog,
    port: options.port !== undefined ? options.port : () => WORKER_PORT,
    parallel_slots: options.parallel_slots
  });

  const orphan = createOrphanDetector({
    store: runtime.queueStore,
    breaker: runtime.breaker,
    bd,
    probePid: options.probePid || defaultProbePid
  });

  // Keep runtime.status()'s running_count in sync with THIS scheduler.
  runtime.setRunningCountProvider(() => scheduler.runningCount());

  return { runtime, scheduler, orphan, bd, workspace: workspace_root };
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
 * Create + register attachments for each active workspace and reap any orphaned
 * attempts persisted from a prior run (spec §5.3). Idempotent per workspace.
 *
 * @param {{ workspaces: string[], port?: number }} input
 * @returns {ReturnType<typeof createWorkerAttachment>[]}
 */
export function initWorkerRuntime(input) {
  if (typeof input.port === 'number') {
    setWorkerPort(input.port);
  }
  /** @type {ReturnType<typeof createWorkerAttachment>[]} */
  const built = [];
  for (const ws of input.workspaces || []) {
    if (!ws) {
      continue;
    }
    const key = keyFor(ws);
    let att = ATTACHMENTS.get(key);
    if (!att) {
      att = createWorkerAttachment(key);
      ATTACHMENTS.set(key, att);
    }
    try {
      const orphans = att.orphan.detect(key);
      if (orphans.length > 0) {
        log('reaped %d orphaned attempt(s) in %s', orphans.length, key);
      }
    } catch (err) {
      log('orphan detection failed for %s: %o', key, err);
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
 * Stop a running attempt (tile ■), IF an attachment is registered.
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
 * Test hook: drop all registered attachments.
 */
export function __resetWorkerAttachmentsForTest() {
  ATTACHMENTS.clear();
}
