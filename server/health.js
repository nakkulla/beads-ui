import {
  bdHealthSnapshot,
  resolveBdWorkspaceIdentity
} from './bd-capability.js';
import { runBd, runBdJson } from './bd.js';
import { resolveWorkspaceDatabase } from './db.js';
import { MANUAL_MERGE_CONTINUATION } from './worker/queue-store.js';
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
 * @typedef {{ auto_advance: boolean, running_count: number, auto_merge: boolean, manual_merge_continuation: { schema_version: number, head_review_projection: boolean } }} WorkerStatus
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
    return {
      auto_advance: false,
      running_count: 0,
      auto_merge: false,
      manual_merge_continuation: MANUAL_MERGE_CONTINUATION
    };
  }
}

/**
 * Default bd capability probe: the dual-mode producer observation for the
 * workspace, using the real bd runner.
 *
 * @param {string} root_dir
 * @returns {Promise<{ ok: boolean, diagnostics: Record<string, unknown> }>}
 */
export async function defaultBdCapabilityProbe(root_dir) {
  const identity = resolveBdWorkspaceIdentity({ root_dir });
  return bdHealthSnapshot({
    primary_workspace: identity.ok ? identity.data : undefined,
    run_json: runBdJson,
    cwd: root_dir
  });
}

/**
 * Run readiness checks and compute overall health. `worker` reflects the live
 * Worker subsystem: auto_advance and the running session count.
 *
 * `checks.bd` stays a boolean and now answers a stronger question than "does
 * the binary run": a bd whose JSON this server cannot read is not a usable bd,
 * so an unhealthy protocol boundary turns it false and `/healthz` 503. The
 * typed detail is additive under `diagnostics.bd`.
 *
 * @param {{ root_dir?: string, bd_probe?: HealthProbe, db_probe?: HealthProbe, bd_capability_probe?: (root_dir: string) => Promise<{ ok: boolean, diagnostics: Record<string, unknown> }>, worker_status?: () => WorkerStatus, runtime_identity?: () => any }} [options]
 * @returns {Promise<{ ok: boolean, checks: { bd: boolean, db: boolean, worker: WorkerStatus }, runtime: any|null, diagnostics: { bd: Record<string, unknown> } }>}
 */
export async function checkHealth(options = {}) {
  const root_dir = options.root_dir || process.cwd();
  const bd_probe = options.bd_probe || defaultBdProbe;
  const db_probe = options.db_probe || (() => defaultDbProbe(root_dir));
  const capability_probe =
    options.bd_capability_probe || defaultBdCapabilityProbe;

  const [bd_alive, db, capability] = await Promise.all([
    runProbe(bd_probe),
    runProbe(db_probe),
    runCapabilityProbe(capability_probe, root_dir)
  ]);

  const worker = options.worker_status
    ? options.worker_status()
    : defaultWorkerStatus(root_dir);
  const bd = bd_alive && capability.ok;
  const checks = { bd, db, worker };
  let runtime = null;
  try {
    runtime = options.runtime_identity ? options.runtime_identity() : null;
  } catch {
    runtime = null;
  }
  return {
    ok: bd && db,
    checks,
    runtime,
    diagnostics: { bd: capability.diagnostics }
  };
}

/**
 * Run the capability probe, turning a thrown probe into an explicit red result
 * rather than an absent diagnostic.
 *
 * @param {(root_dir: string) => Promise<{ ok: boolean, diagnostics: Record<string, unknown> }>} probe
 * @param {string} root_dir
 */
async function runCapabilityProbe(probe, root_dir) {
  try {
    const result = await probe(root_dir);
    if (result && typeof result === 'object') {
      return result;
    }
  } catch {
    // Fall through to the explicit red result below.
  }
  return {
    ok: false,
    diagnostics: {
      version: null,
      producer_observations: null,
      producer_capabilities: [],
      consumer_supported_formats: [],
      workspace_probe: { ok: false },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: 'bd_capability_probe_failed'
    }
  };
}
