/**
 * The DISPLAY cache for a workspace's repo-operation declaration (UI-q0uy
 * §4.6-1).
 *
 * `resolveRepoOps` is a pure async function over a git tree, but `decorateQueue`
 * runs on every snapshot push and cannot await git. So the server owns one small
 * per-workspace cache instead, filled from exactly two places:
 *
 *   (a) workspace attach/reconnect — one resolve at the last known `origin/<base>`
 *       tip, and
 *   (b) the coordinator — every time it already resolved a declaration for an
 *       operation, its result lands here too. No duplicate resolve exists.
 *
 * The four states matter to the client: only `absent` — an EMPTY tree listing
 * that actually proves there is no config — lets the settings dialog fall back
 * to its legacy display. `pending` and `error` say so instead, so a repo that
 * HAS a config never quietly reads as one that does not just because resolution
 * was slow or failed.
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

/**
 * @param {unknown} workspace
 * @returns {string}
 */
function keyFor(workspace) {
  return String(workspace || '');
}

/**
 * The shape a workspace with no cache entry shows: nothing is claimed, and the
 * client renders "선언 확인 중" rather than a legacy fallback.
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
 * @returns {boolean} Whether the cache changed.
 */
export function recordRepoOpsDisplay(workspace, entry) {
  const key = keyFor(workspace);
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
 * @param {{ workspace: string, resolution: any, base_sha: string|null }} input
 * @returns {boolean}
 */
export function recordRepoOpsResolution(input) {
  return recordRepoOpsDisplay(
    input.workspace,
    projectRepoOpsDisplay(input.resolution, input.base_sha)
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
  const sha = typeof input.sha === 'string' ? input.sha.trim() : '';
  if (!/^[0-9a-f]{40}$/i.test(sha)) {
    const entry = /** @type {RepoOpsDisplay} */ ({
      ...pendingDisplay(),
      status: 'error',
      base_ref: input.base || null,
      error_code: 'repo_ops_base_unresolved'
    });
    recordRepoOpsDisplay(input.workspace, entry);
    return entry;
  }
  const resolution = await resolveRepoOps({
    repo: input.repo,
    sha,
    gitRun: /** @type {any} */ (input.gitRun)
  });
  const entry = projectRepoOpsDisplay(resolution, sha);
  recordRepoOpsDisplay(input.workspace, entry);
  return entry;
}

/**
 * Test-only: drop every cached entry.
 */
export function __resetRepoOpsDisplayForTest() {
  DISPLAY.clear();
}
