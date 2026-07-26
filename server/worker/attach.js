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
 *     locks singleton — plus an orphan detector. EVERYTHING is injectable so
 *     tests pass fakes (never a real spawn).
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
import { debug } from '../logging.js';
import { validateAdmission } from './admission.js';
import { createBdMetadata } from './bd-metadata.js';
import { createOrphanDetector } from './orphan.js';
import { emitQueueChanged } from './queue-events.js';
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
      const issue = /** @type {any} */ (
        unwrapShowJson(shown && shown.stdoutJson) || {}
      );
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
        spec_id,
        spec_review,
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
 *   gh?: any,
 *   makeRunner?: (name: string) => any,
 *   spawn_impl?: (command: string, args: string[], options: any) => any,
 *   kill_impl?: (pid: number, signal?: NodeJS.Signals|number) => void,
 *   probePid?: (pid: number|null) => { alive: boolean, started_at: number|null },
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   admission?: any
 * }} [options]
 */
export function createWorkerAttachment(workspace_root, options = {}) {
  const runtime = options.runtime || getWorkerRuntime();
  const repo = options.repo || workspace_root;
  const target_base = options.target_base || DEFAULT_TARGET_BASE;

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

  const scheduler = createScheduler({
    store: runtime.queueStore,
    makeRunner,
    bd,
    worktree,
    verify,
    sessionLog: runtime.sessionLog,
    admission,
    notifyQueueChanged: (ws_key) => emitQueueChanged(ws_key)
  });

  const orphan = createOrphanDetector({
    store: runtime.queueStore,
    bd,
    probePid: options.probePid || defaultProbePid
  });

  // Keep runtime.status()'s running_count in sync with THIS scheduler.
  runtime.setRunningCountProvider(() => scheduler.runningCount());

  return {
    runtime,
    scheduler,
    orphan,
    bd,
    admission,
    repo,
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
 * Create + register attachments for each active workspace and reap any orphaned
 * attempts persisted from a prior run (spec §5.3). Idempotent per workspace.
 *
 * @param {{ workspaces: string[] }} input
 * @returns {ReturnType<typeof createWorkerAttachment>[]}
 */
export function initWorkerRuntime(input) {
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
