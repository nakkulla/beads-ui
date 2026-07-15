import { runBd } from './bd.js';
import { resolveWorkspaceDatabase } from './db.js';

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
 * Run readiness checks and compute overall health. `worker` is always `'absent'`
 * until the worker subsystem lands in a later phase.
 *
 * @param {{ root_dir?: string, bd_probe?: HealthProbe, db_probe?: HealthProbe }} [options]
 * @returns {Promise<{ ok: boolean, checks: { bd: boolean, db: boolean, worker: 'absent' } }>}
 */
export async function checkHealth(options = {}) {
  const root_dir = options.root_dir || process.cwd();
  const bd_probe = options.bd_probe || defaultBdProbe;
  const db_probe = options.db_probe || (() => defaultDbProbe(root_dir));

  const [bd, db] = await Promise.all([runProbe(bd_probe), runProbe(db_probe)]);

  const checks = {
    bd,
    db,
    worker: /** @type {const} */ ('absent')
  };
  return { ok: bd && db, checks };
}
