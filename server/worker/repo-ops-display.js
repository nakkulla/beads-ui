/**
 * The DISPLAY cache for a workspace's repo-operation declaration (UI-q0uy
 * §4.6-1).
 *
 * `resolveRepoOps` is a pure async function over a git tree, but `decorateQueue`
 * runs on every snapshot push and cannot await git. So the server owns one small
 * per-workspace cache instead, filled only from current target-base reads:
 *
 *   (a) workspace attach/reconnect — one resolve at the last known `origin/<base>`
 *       tip, and
 *   (b) poller, click-time, and synced-current cleanup policy reads that
 *       explicitly identify their SHA as the current target base.
 *
 * Historical compatibility and effective operation-policy lookups stay pure:
 * publishing either would let an old SHA supersede the current merge gate.
 *
 * The four states matter to every consumer: only `absent` proves there is no
 * declaration. `pending` and `error` remain explicit so advisory gates and the
 * settings display fail closed while resolution is incomplete or invalid.
 */
import { emitQueueChanged } from './queue-events.js';
import { REPO_OPS_CONFIG_PATH, resolveRepoOps } from './repo-ops-resolver.js';

/**
 * @typedef {Object} RepoOpsDisplay
 * @property {'resolved'|'absent'|'pending'|'error'} status
 * @property {string} source_path - The declaration path that was read.
 * @property {string|null} base_ref - Declared target base, when known.
 * @property {string|null} base_sha - The exact SHA the declaration was read at.
 * @property {{ script: string, timeout_ms: number }|null} verify
 * @property {{ script: string, timeout_ms: number }|null} deploy
 * @property {string|null} error_code - Resolver code on `error`, else null.
 */

/** @type {Map<string, RepoOpsDisplay>} */
const DISPLAY = new Map();
/** @type {Map<string, number>} */
const RESOLUTION_GENERATION = new Map();

/**
 * @param {unknown} workspace
 * @returns {string}
 */
function keyFor(workspace) {
  return String(workspace || '');
}

/**
 * The shape a workspace with no cache entry shows: nothing is claimed, and the
 * client renders "선언 확인 중" without claiming that policy is absent.
 *
 * @returns {RepoOpsDisplay}
 */
function pendingDisplay() {
  return {
    status: 'pending',
    source_path: REPO_OPS_CONFIG_PATH,
    base_ref: null,
    base_sha: null,
    verify: null,
    deploy: null,
    error_code: null
  };
}

/**
 * Read the cached declaration for one workspace. Synchronous by contract — this
 * is what `decorateQueue` calls.
 *
 * @param {string} workspace
 * @returns {RepoOpsDisplay}
 */
export function repoOpsDisplayFor(workspace) {
  return DISPLAY.get(keyFor(workspace)) || pendingDisplay();
}

/**
 * Issue a workspace-local publication token when an async current-base
 * resolution starts.
 * Later-started requests supersede earlier ones regardless of completion order.
 *
 * @param {string} workspace
 * @returns {number}
 */
export function beginRepoOpsDisplayResolution(workspace) {
  const key = keyFor(workspace);
  const generation = (RESOLUTION_GENERATION.get(key) || 0) + 1;
  RESOLUTION_GENERATION.set(key, generation);
  return generation;
}

/**
 * @param {RepoOpsDisplay} display
 * @returns {'present'|'absent'|'invalid'}
 */
export function repoOpsVerifyState(display) {
  if (display.status === 'resolved') {
    return display.verify ? 'present' : 'absent';
  }
  if (display.status === 'absent') {
    return 'absent';
  }
  return 'invalid';
}

/**
 * Bind the advisory verify declaration state to the base SHA at which repo-ops
 * was resolved.
 *
 * @param {RepoOpsDisplay} display
 * @returns {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }}
 */
export function repoOpsVerifyPolicy(display) {
  return {
    declaration_state: repoOpsVerifyState(display),
    base_sha: display.base_sha
  };
}

/**
 * A cached receipt can satisfy an advisory gate only at the exact base SHA
 * whose repo-ops declaration produced the current policy.
 *
 * @param {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} policy
 * @param {any} receipt
 * @returns {{ declaration_state: 'present'|'absent'|'invalid', receipt: any|null }}
 */
export function repoOpsVerifyReceiptState(policy, receipt) {
  if (policy.declaration_state !== 'present') {
    return { declaration_state: policy.declaration_state, receipt: null };
  }
  const expected_base = policy.base_sha?.toLowerCase() || null;
  const receipt_base =
    typeof receipt?.effective_base_sha === 'string'
      ? receipt.effective_base_sha.toLowerCase()
      : null;
  return {
    declaration_state: 'present',
    receipt:
      expected_base !== null && receipt_base === expected_base ? receipt : null
  };
}

/**
 * Keep only what the settings surface shows. The resolver also returns the blob
 * identity it verified, which is an execution fact, not a display one.
 *
 * @param {any} declaration
 * @returns {{ script: string, timeout_ms: number }|null}
 */
function laneOf(declaration) {
  if (
    !declaration ||
    typeof declaration.script !== 'string' ||
    typeof declaration.timeout_ms !== 'number'
  ) {
    return null;
  }
  return { script: declaration.script, timeout_ms: declaration.timeout_ms };
}

/**
 * Project one `resolveRepoOps` result into the display shape. `absent` is only
 * ever claimed on the resolver's own proven-absent return (a successful empty
 * tree listing leaves `config_blob_sha` null) — every failure is `error`.
 *
 * @param {any} resolution
 * @param {string|null} base_sha
 * @returns {RepoOpsDisplay}
 */
export function projectRepoOpsDisplay(resolution, base_sha) {
  if (!resolution || typeof resolution !== 'object') {
    return {
      ...pendingDisplay(),
      status: 'error',
      error_code: 'no_resolution'
    };
  }
  if (resolution.ok === false) {
    return {
      status: 'error',
      source_path: REPO_OPS_CONFIG_PATH,
      base_ref: null,
      base_sha,
      verify: null,
      deploy: null,
      error_code:
        typeof resolution.code === 'string'
          ? resolution.code
          : 'repo_ops_config_invalid'
    };
  }
  const present = typeof resolution.config_blob_sha === 'string';
  return {
    status: present ? 'resolved' : 'absent',
    source_path: REPO_OPS_CONFIG_PATH,
    base_ref: typeof resolution.base === 'string' ? resolution.base : null,
    base_sha,
    verify: present ? laneOf(resolution.verify) : null,
    deploy: present ? laneOf(resolution.deploy) : null,
    error_code: null
  };
}

/**
 * Store a display entry, and fan a fresh snapshot out when it actually changed.
 * An unchanged re-resolve is silent — the coordinator resolves on every
 * operation, and a broadcast per operation would be noise.
 *
 * @param {string} workspace
 * @param {RepoOpsDisplay} entry
 * @param {number} [generation]
 * @returns {boolean} Whether the cache changed.
 */
export function recordRepoOpsDisplay(workspace, entry, generation) {
  const key = keyFor(workspace);
  if (
    typeof generation === 'number' &&
    RESOLUTION_GENERATION.get(key) !== generation
  ) {
    return false;
  }
  const previous = DISPLAY.get(key);
  if (previous && JSON.stringify(previous) === JSON.stringify(entry)) {
    return false;
  }
  DISPLAY.set(key, entry);
  emitQueueChanged(key);
  return true;
}

/**
 * Record the result of a resolve the CALLER already performed (the coordinator
 * path). Nothing is resolved here — that is the whole point.
 *
 * @param {{ workspace: string, resolution: any, base_sha: string|null, generation?: number }} input
 * @returns {boolean}
 */
export function recordRepoOpsResolution(input) {
  return recordRepoOpsDisplay(
    input.workspace,
    projectRepoOpsDisplay(input.resolution, input.base_sha),
    input.generation
  );
}

/**
 * The attach-time fill (a): resolve the declaration ONCE at the base tip the
 * caller already resolved, and cache it. Fail-quiet by design — a base the
 * attachment could not resolve records `error`, which the client shows as 선언
 * 읽기 실패 rather than silently falling back to the legacy display.
 *
 * @param {{ workspace: string, repo: string, base: string|null, sha: string|null, gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }> }} input
 * @returns {Promise<RepoOpsDisplay>}
 */
export async function refreshRepoOpsDisplay(input) {
  const generation = beginRepoOpsDisplayResolution(input.workspace);
  const sha = typeof input.sha === 'string' ? input.sha.trim() : '';
  if (!/^[0-9a-f]{40}$/i.test(sha)) {
    const entry = /** @type {RepoOpsDisplay} */ ({
      ...pendingDisplay(),
      status: 'error',
      base_ref: input.base || null,
      error_code: 'repo_ops_base_unresolved'
    });
    recordRepoOpsDisplay(input.workspace, entry, generation);
    return entry;
  }
  const resolution = await resolveRepoOps({
    repo: input.repo,
    sha,
    gitRun: /** @type {any} */ (input.gitRun)
  });
  const entry = projectRepoOpsDisplay(resolution, sha);
  recordRepoOpsDisplay(input.workspace, entry, generation);
  return entry;
}

/**
 * Test-only: drop every cached entry.
 */
export function __resetRepoOpsDisplayForTest() {
  DISPLAY.clear();
  RESOLUTION_GENERATION.clear();
}
