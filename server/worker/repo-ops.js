/**
 * Pinned repository operation declarations.
 *
 * Deployment commands are declarations for the external Deployment Job. The
 * Worker reads them for visibility only; it never runs or adapts them.
 */
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { debug } from '../logging.js';
import { resolveVerifyCmd } from './verify-cmd.js';

const log = debug('worker:repo-ops');

export const REPO_OPS_BLOB_PATH = 'docs/agents/repo-ops.toml';

const DEFAULT_TIMEOUT_MS = 600000;
const CACHE_MAX = 64;

/** @typedef {{ cmd: string[], timeout_ms: number }} ResolvedOps */
/** @template T @typedef {{ state: 'resolved', source: 'declaration'|'config', value: T }|{ state: 'absent' }|{ state: 'invalid', source: 'declaration', detail: string }} OpsResolution */
/** @typedef {OpsResolution<ResolvedOps>} VerifyResolution */
/** @typedef {OpsResolution<ResolvedOps>} DeployResolution */

/** @type {OpsResolution<any>} */
const ABSENT = { state: 'absent' };
/** @type {OpsResolution<any>} */
const PIN_UNAVAILABLE = {
  state: 'invalid',
  source: 'declaration',
  detail: 'pin_unavailable'
};

/** @type {Map<string, { verify: VerifyResolution, deploy: DeployResolution }>} */
const declaration_cache = new Map();
/** @type {Map<string, { verify: VerifyResolution, deploy: DeployResolution }>} */
const latest_by_repo = new Map();

export function resetRepoOpsCache() {
  declaration_cache.clear();
  latest_by_repo.clear();
}

/**
 * @param {any} section
 * @returns {{ ok: true, value: ResolvedOps }|{ ok: false, detail: string }}
 */
function normalizeDeclaredCmd(section) {
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return { ok: false, detail: 'section_not_a_table' };
  }
  if (
    !Array.isArray(section.cmd) ||
    section.cmd.length === 0 ||
    !section.cmd.every(
      (/** @type {unknown} */ value) =>
        typeof value === 'string' && value.length > 0
    )
  ) {
    return { ok: false, detail: 'cmd_not_a_nonempty_argv_array' };
  }
  if (
    Object.hasOwn(section, 'timeout_ms') &&
    (typeof section.timeout_ms !== 'number' ||
      !Number.isFinite(section.timeout_ms) ||
      section.timeout_ms <= 0)
  ) {
    return { ok: false, detail: 'timeout_ms_not_a_positive_number' };
  }
  return {
    ok: true,
    value: {
      cmd: section.cmd.slice(),
      timeout_ms: Object.hasOwn(section, 'timeout_ms')
        ? Math.floor(section.timeout_ms)
        : DEFAULT_TIMEOUT_MS
    }
  };
}

/**
 * @param {any} parsed
 * @param {'verify'|'deploy'} kind
 * @returns {OpsResolution<ResolvedOps>}
 */
function declaredOps(parsed, kind) {
  if (!Object.hasOwn(parsed, kind)) {
    return ABSENT;
  }
  const normalized = normalizeDeclaredCmd(parsed[kind]);
  return normalized.ok
    ? { state: 'resolved', source: 'declaration', value: normalized.value }
    : {
        state: 'invalid',
        source: 'declaration',
        detail: `${kind}:${normalized.detail}`
      };
}

/**
 * @param {string} detail
 */
function brokenEntry(detail) {
  /** @type {{ state: 'invalid', source: 'declaration', detail: string }} */
  const invalid = { state: 'invalid', source: 'declaration', detail };
  return { verify: invalid, deploy: invalid };
}

/**
 * @param {{ gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, repo: string, sha: string }} input
 */
async function readDeclarationAt(input) {
  const repo = path.resolve(input.repo);
  const key = `${repo}\0${input.sha}`;
  const cached = declaration_cache.get(key);
  if (cached) {
    latest_by_repo.set(repo, cached);
    return cached;
  }
  try {
    const pinned = await input.gitRun(
      ['rev-parse', '--verify', '--quiet', `${input.sha}^{commit}`],
      { cwd: repo }
    );
    if (pinned.code !== 0 || pinned.stdout.trim().length === 0) {
      return brokenEntry('pin_unresolvable');
    }
    const shown = await input.gitRun(
      ['show', `${input.sha}:${REPO_OPS_BLOB_PATH}`],
      { cwd: repo }
    );
    if (shown.code !== 0) {
      const entry = { verify: ABSENT, deploy: ABSENT };
      declaration_cache.set(key, entry);
      latest_by_repo.set(repo, entry);
      return entry;
    }
    const parsed = parseToml(shown.stdout);
    const entry = {
      verify: declaredOps(parsed, 'verify'),
      deploy: declaredOps(parsed, 'deploy')
    };
    if (declaration_cache.size >= CACHE_MAX) {
      const oldest = declaration_cache.keys().next();
      if (!oldest.done) {
        declaration_cache.delete(oldest.value);
      }
    }
    declaration_cache.set(key, entry);
    latest_by_repo.set(repo, entry);
    return entry;
  } catch (error) {
    log('declaration read failed for %s at %s: %o', repo, input.sha, error);
    return brokenEntry('git_error');
  }
}

/**
 * @param {{ gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, repo: string, sha: string|null, config_map: Record<string, ResolvedOps>|null|undefined }} input
 * @returns {Promise<VerifyResolution>}
 */
export async function resolveVerifyAt(input) {
  if (!input.sha) {
    return PIN_UNAVAILABLE;
  }
  const declared = (
    await readDeclarationAt({
      gitRun: input.gitRun,
      repo: input.repo,
      sha: input.sha
    })
  ).verify;
  if (declared.state !== 'absent') {
    return declared;
  }
  const configured = resolveVerifyCmd(input.repo, input.config_map);
  return configured
    ? { state: 'resolved', source: 'config', value: configured }
    : ABSENT;
}

/**
 * @param {{ gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, repo: string, sha: string|null }} input
 * @returns {Promise<DeployResolution>}
 */
export async function resolveDeployAt(input) {
  if (!input.sha) {
    return PIN_UNAVAILABLE;
  }
  return (
    await readDeclarationAt({
      gitRun: input.gitRun,
      repo: input.repo,
      sha: input.sha
    })
  ).deploy;
}

/**
 * @param {string} repo
 * @param {Record<string, ResolvedOps>|null|undefined} config_map
 * @returns {VerifyResolution}
 */
export function peekVerifyResolution(repo, config_map) {
  const key = path.resolve(repo);
  const declared = latest_by_repo.get(key)?.verify || ABSENT;
  if (declared.state !== 'absent') {
    return declared;
  }
  const configured = resolveVerifyCmd(key, config_map);
  return configured
    ? { state: 'resolved', source: 'config', value: configured }
    : ABSENT;
}

/**
 * @param {string} repo
 * @returns {DeployResolution}
 */
export function peekDeployResolution(repo) {
  return latest_by_repo.get(path.resolve(repo))?.deploy || ABSENT;
}
