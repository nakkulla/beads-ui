/**
 * Resolve the v2 repository-operation declaration from an exact Git tree.
 */
import { parse as parseToml } from 'smol-toml';

export const REPO_OPS_CONFIG_PATH = 'repo-ops/config.toml';
const SCRIPT_ROOT = 'repo-ops/script/';
const DEFAULT_TIMEOUT_MS = 600_000;

/**
 * @param {string} value
 */
function isSha(value) {
  return /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} stdout
 */
function parseLsTree(stdout) {
  const match = /^(\d+)\s+(blob)\s+([0-9a-f]{40})\t(.+)$/im.exec(stdout);
  if (!match) {
    return null;
  }
  return { mode: match[1], type: match[2], blob_sha: match[3], path: match[4] };
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function configInvalid(value) {
  if (!isPlainObject(value)) {
    return 'root_not_object';
  }
  for (const key of Object.keys(value)) {
    if (key !== 'base' && key !== 'verify' && key !== 'deploy') {
      return 'unknown_key';
    }
  }
  if (
    value.base !== undefined &&
    (typeof value.base !== 'string' || value.base.trim() === '')
  ) {
    return 'bad_base';
  }
  for (const kind of ['verify', 'deploy']) {
    const declaration = value[kind];
    if (declaration === undefined) {
      continue;
    }
    if (!isPlainObject(declaration)) {
      return `bad_${kind}`;
    }
    for (const key of Object.keys(declaration)) {
      if (key !== 'script' && key !== 'timeout_ms' && key !== 'mode') {
        return 'unknown_key';
      }
    }
    if (
      typeof declaration.script !== 'string' ||
      !declaration.script.startsWith(SCRIPT_ROOT) ||
      declaration.script.includes('..') ||
      declaration.script.length <= SCRIPT_ROOT.length
    ) {
      return `bad_${kind}_script`;
    }
    const timeout_ms = declaration.timeout_ms;
    if (
      timeout_ms !== undefined &&
      (!Number.isInteger(timeout_ms) ||
        typeof timeout_ms !== 'number' ||
        timeout_ms <= 0)
    ) {
      return `bad_${kind}_timeout`;
    }
    if (declaration.mode !== undefined && declaration.mode !== '100755') {
      return `bad_${kind}_mode`;
    }
  }
  return null;
}

/**
 * @param {{ repo: string, sha: string, gitRun: (args: string[], options: { cwd: string }) => Promise<{ code: number, stdout: string, stderr: string }> }} input
 */
export async function resolveRepoOps(input) {
  if (!isSha(input.sha)) {
    return {
      ok: false,
      code: 'repo_ops_config_invalid',
      detail: 'invalid_sha'
    };
  }
  const config_result = await input.gitRun(
    ['show', `${input.sha}:${REPO_OPS_CONFIG_PATH}`],
    { cwd: input.repo }
  );
  if (config_result.code !== 0) {
    const config_tree = await input.gitRun(
      ['ls-tree', input.sha, '--', REPO_OPS_CONFIG_PATH],
      { cwd: input.repo }
    );
    if (config_tree.code !== 0 || !parseLsTree(config_tree.stdout)) {
      return {
        base: 'main',
        verify: null,
        deploy: null,
        config_blob_sha: null
      };
    }
    return {
      ok: false,
      code: 'repo_ops_config_invalid',
      detail: 'config_blob_unreadable'
    };
  }
  /** @type {any} */
  let config;
  try {
    config = parseToml(config_result.stdout);
  } catch {
    return {
      ok: false,
      code: 'repo_ops_config_invalid',
      detail: 'toml_parse_failed'
    };
  }
  const invalid = configInvalid(config);
  if (invalid) {
    return { ok: false, code: 'repo_ops_config_invalid', detail: invalid };
  }
  const config_tree = await input.gitRun(
    ['ls-tree', input.sha, '--', REPO_OPS_CONFIG_PATH],
    { cwd: input.repo }
  );
  const config_entry =
    config_tree.code === 0 ? parseLsTree(config_tree.stdout) : null;
  if (!config_entry) {
    return {
      ok: false,
      code: 'repo_ops_config_invalid',
      detail: 'config_identity_missing'
    };
  }
  /** @param {'verify'|'deploy'} kind */
  const resolveOperation = async (kind) => {
    const declaration = config[kind];
    if (declaration === undefined) {
      return null;
    }
    const tree = await input.gitRun(
      ['ls-tree', input.sha, '--', declaration.script],
      { cwd: input.repo }
    );
    const entry = tree.code === 0 ? parseLsTree(tree.stdout) : null;
    if (
      !entry ||
      entry.path !== declaration.script ||
      entry.type !== 'blob' ||
      entry.mode !== '100755'
    ) {
      throw new Error(`bad_${kind}_identity`);
    }
    return {
      script: declaration.script,
      timeout_ms: declaration.timeout_ms ?? DEFAULT_TIMEOUT_MS,
      mode: entry.mode,
      blob_sha: entry.blob_sha,
      object_type: entry.type
    };
  };
  try {
    return {
      base: config.base ?? 'main',
      verify: await resolveOperation('verify'),
      deploy: await resolveOperation('deploy'),
      config_blob_sha: config_entry.blob_sha
    };
  } catch (err) {
    return {
      ok: false,
      code: 'repo_ops_config_invalid',
      detail: err instanceof Error ? err.message : 'operation_invalid'
    };
  }
}

/**
 * Pin policy to the previous target base and classify the delivery.
 *
 * @param {{ repo: string, previous_sha: string|null, target_sha: string, kind?: 'verify'|'deploy', gitRun: (args: string[], options: { cwd: string }) => Promise<{ code: number, stdout: string, stderr: string }> }} input
 */
export async function resolveEffectiveRepoOps(input) {
  const kind = input.kind ?? 'deploy';
  const previous = input.previous_sha
    ? await resolveRepoOps({
        repo: input.repo,
        sha: input.previous_sha,
        gitRun: input.gitRun
      })
    : { base: 'main', verify: null, deploy: null, config_blob_sha: null };
  const target = await resolveRepoOps({
    repo: input.repo,
    sha: input.target_sha,
    gitRun: input.gitRun
  });
  if (!previous.ok && previous.code) return previous;
  if (!target.ok && target.code) return target;
  const previous_operation = previous[kind];
  const target_operation = target[kind];
  if (!previous_operation && target_operation) {
    return { policy: previous, target, classification: 'bootstrap' };
  }
  if (!previous_operation) {
    return { policy: previous, target, classification: 'normal' };
  }
  const same =
    previous.config_blob_sha === target.config_blob_sha &&
    target_operation &&
    previous_operation.object_type === target_operation.object_type &&
    previous_operation.mode === target_operation.mode &&
    previous_operation.blob_sha === target_operation.blob_sha;
  return {
    policy: previous,
    target,
    classification: same ? 'normal' : 'transition'
  };
}
