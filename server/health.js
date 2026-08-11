import { runBd } from './bd.js';
import { resolveWorkspaceDatabase } from './db.js';
import { getWorkerRuntime } from './worker/runtime.js';

/**
 * @typedef {() => boolean | Promise<boolean>} HealthProbe
 */

/**
 * Cached result of the `bd --version` liveness check. The bd binary location is
 * process-stable, so probing it once and memoizing keeps `/healthz` cheap on
 * repeated readiness polls.
 *
 * @type {Promise<boolean> | null}
 */
let bd_probe_cache = null;

/**
 * Default bd liveness probe: resolves true when `bd --version` exits 0. Cached
 * for the process lifetime.
 *
 * @returns {Promise<boolean>}
 */
export function defaultBdProbe() {
  if (!bd_probe_cache) {
    bd_probe_cache = runBd(['--version'], { timeout_ms: 2000 })
      .then((r) => r.code === 0)
      .catch(() => false);
  }
  return bd_probe_cache;
}

/**
 * Reset the memoized bd probe result. Test-only hook.
 */
export function __resetBdProbeCacheForTest() {
  bd_probe_cache = null;
}

/**
 * Default database liveness probe: the cheapest reliable signal is whether the
 * default workspace database resolves and exists on disk (a filesystem stat via
 * {@link resolveWorkspaceDatabase}). No subprocess is spawned; central-dolt
 * workspaces resolve to their `.beads` metadata directory.
 *
 * @param {string} root_dir
 * @returns {boolean}
 */
export function defaultDbProbe(root_dir) {
  try {
    return resolveWorkspaceDatabase({ cwd: root_dir }).exists;
  } catch {
    return false;
  }
}

/**
 * @param {HealthProbe} fn
 * @returns {Promise<boolean>}
 */
async function runProbe(fn) {
  try {
    return !!(await fn());
  } catch {
    return false;
  }
}

/**
 * @typedef {{ auto_advance: boolean, running_count: number }} WorkerStatus
 */

/**
 * Default worker-status probe: reads the shared Worker runtime (queue
 * auto_advance + live running count) for the workspace (spec §5.3).
 *
 * `breaker_tripped` is GONE rather than frozen at false (worker-phase2 §2): the
 * breaker no longer exists, and a permanently-false field would misreport a
 * concept the system dropped.
 *
 * @param {string} root_dir
 * @returns {WorkerStatus}
 */
export function defaultWorkerStatus(root_dir) {
  try {
    return getWorkerRuntime().status(root_dir);
  } catch {
    return { auto_advance: false, running_count: 0 };
  }
}

/**
 * Run readiness checks and compute overall health. `worker` reflects the live
 * Worker subsystem: auto_advance and the running session count.
 *
 * @param {{ root_dir?: string, bd_probe?: HealthProbe, db_probe?: HealthProbe, worker_status?: () => WorkerStatus, runtime_identity?: () => any }} [options]
 * @returns {Promise<{ ok: boolean, checks: { bd: boolean, db: boolean, worker: WorkerStatus }, runtime: any|null }>}
 */
export async function checkHealth(options = {}) {
  const root_dir = options.root_dir || process.cwd();
  const bd_probe = options.bd_probe || defaultBdProbe;
  const db_probe = options.db_probe || (() => defaultDbProbe(root_dir));

  const [bd, db] = await Promise.all([runProbe(bd_probe), runProbe(db_probe)]);

  const worker = options.worker_status
    ? options.worker_status()
    : defaultWorkerStatus(root_dir);
  const checks = { bd, db, worker };
  let runtime = null;
  try {
    runtime = options.runtime_identity ? options.runtime_identity() : null;
  } catch {
    runtime = null;
  }
  return { ok: bd && db, checks, runtime };
}
