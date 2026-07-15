import { runBdJson } from './bd.js';
import { debug } from './logging.js';

const log = debug('list-adapters');
const DEPENDENCY_BLOCKED_ARGS = [
  'ready',
  '--explain',
  '--limit',
  '1000',
  '--json'
];

/**
 * Build concrete `bd` CLI args for a subscription type + params.
 * Always includes `--json` for parseable output.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @returns {string[]}
 */
export function mapSubscriptionToBdArgs(spec) {
  const t = String(spec.type);
  switch (t) {
    case 'all-issues': {
      return ['list', '--json', '--tree=false'];
    }
    case 'blocked-issues': {
      return [
        'list',
        '--json',
        '--tree=false',
        '--status',
        'blocked',
        '--limit',
        '1000'
      ];
    }
    case 'ready-issues': {
      return ['ready', '--limit', '1000', '--json'];
    }
    case 'in-progress-issues': {
      return ['list', '--json', '--tree=false', '--status', 'in_progress'];
    }
    case 'closed-issues': {
      return [
        'list',
        '--json',
        '--tree=false',
        '--status',
        'closed',
        '--limit',
        '1000'
      ];
    }
    case 'resolved-issues': {
      return [
        'list',
        '--json',
        '--tree=false',
        '--status',
        'resolved',
        '--limit',
        '1000'
      ];
    }
    case 'issue-detail': {
      const p = spec.params || {};
      const id = String(p.id || '').trim();
      if (id.length === 0) {
        throw badRequest('Missing param: params.id');
      }
      return ['show', id, '--json'];
    }
    default: {
      throw badRequest(`Unknown subscription type: ${t}`);
    }
  }
}

/**
 * Normalize bd list output to minimal Issue shape used by the registry.
 * - Ensures `id` is a string.
 * - Coerces timestamps to numbers.
 * - `closed_at` defaults to null when missing or invalid.
 *
 * @param {unknown} value
 * @returns {Array<{ id: string, created_at: number, updated_at: number, closed_at: number | null } & Record<string, unknown>>}
 */
export function normalizeIssueList(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  /** @type {Array<{ id: string, created_at: number, updated_at: number, closed_at: number | null } & Record<string, unknown>>} */
  const out = [];
  for (const it of value) {
    const id = String(it.id ?? '');
    if (id.length === 0) {
      continue;
    }
    const created_at = parseTimestamp(/** @type {any} */ (it).created_at);
    const updated_at = parseTimestamp(it.updated_at);
    const closed_raw = it.closed_at;
    /** @type {number | null} */
    let closed_at = null;
    if (closed_raw !== undefined && closed_raw !== null) {
      const n = parseTimestamp(closed_raw);
      closed_at = Number.isFinite(n) ? n : null;
    }
    out.push({
      ...it,
      id,
      created_at: Number.isFinite(created_at) ? created_at : 0,
      updated_at: Number.isFinite(updated_at) ? updated_at : 0,
      closed_at
    });
  }
  return out;
}

/**
 * @typedef {Object} FetchListResultSuccess
 * @property {true} ok
 * @property {Array<{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>>} items
 */

/**
 * @typedef {Object} FetchListResultFailure
 * @property {false} ok
 * @property {{ code: string, message: string, details?: Record<string, unknown> }} error
 */

/**
 * Execute the mapped `bd` command for a subscription spec and return normalized items.
 * Errors do not throw; they are surfaced as a structured object.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @param {{ cwd?: string }} [options] - Optional working directory for bd command
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
export async function fetchListForSubscription(spec, options = {}) {
  if (String(spec.type) === 'blocked-issues') {
    return fetchBlockedIssues(options);
  }

  /** @type {string[]} */
  let args;
  try {
    args = mapSubscriptionToBdArgs(spec);
  } catch (err) {
    // Surface bad requests (e.g., missing params)
    log('mapSubscriptionToBdArgs failed for %o: %o', spec, err);
    const e = toErrorObject(err);
    return { ok: false, error: e };
  }

  try {
    const res = await runBdJson(args, { cwd: options.cwd });
    if (!res || res.code !== 0 || !('stdoutJson' in res)) {
      if (
        String(spec.type) === 'resolved-issues' &&
        isUnsupportedResolvedStatus(res?.stderr || '')
      ) {
        return { ok: true, items: [] };
      }
      log(
        'bd failed for %o (args=%o) code=%s stderr=%s',
        spec,
        args,
        res?.code,
        res?.stderr || ''
      );
      return bdCommandFailure(res);
    }
    // bd show may return a single object; normalize to an array first
    const raw = Array.isArray(res.stdoutJson)
      ? res.stdoutJson
      : res.stdoutJson && typeof res.stdoutJson === 'object'
        ? [res.stdoutJson]
        : [];

    const items = normalizeIssueList(raw);
    return { ok: true, items };
  } catch (err) {
    log('bd invocation failed for %o (args=%o): %o', spec, args, err);
    return {
      ok: false,
      error: {
        code: 'bd_error',
        message:
          (err && /** @type {any} */ (err).message) || 'bd invocation failed'
      }
    };
  }
}

/**
 * Fetch Board Blocked-column issues from both stored blocked status and
 * dependency-aware `bd ready --explain` blockers.
 *
 * @param {{ cwd?: string }} [options]
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
async function fetchBlockedIssues(options = {}) {
  const stored_args = mapSubscriptionToBdArgs({ type: 'blocked-issues' });
  try {
    const stored_res = await runBdJson(stored_args, { cwd: options.cwd });
    if (!stored_res || stored_res.code !== 0 || !('stdoutJson' in stored_res)) {
      log(
        'bd failed for blocked stored issues (args=%o) code=%s stderr=%s',
        stored_args,
        stored_res?.code,
        stored_res?.stderr || ''
      );
      return bdCommandFailure(stored_res);
    }

    const dependency_res = await runBdJson(DEPENDENCY_BLOCKED_ARGS, {
      cwd: options.cwd
    });
    if (
      !dependency_res ||
      dependency_res.code !== 0 ||
      !('stdoutJson' in dependency_res)
    ) {
      log(
        'bd failed for dependency-blocked issues (args=%o) code=%s stderr=%s',
        DEPENDENCY_BLOCKED_ARGS,
        dependency_res?.code,
        dependency_res?.stderr || ''
      );
      return bdCommandFailure(dependency_res);
    }

    const stored_raw = Array.isArray(stored_res.stdoutJson)
      ? stored_res.stdoutJson
      : [];
    const dependency_raw = extractDependencyBlockedIssues(
      dependency_res.stdoutJson
    );
    const items = mergeIssueLists(
      normalizeIssueList(stored_raw),
      normalizeIssueList(dependency_raw)
    );
    return { ok: true, items };
  } catch (err) {
    log(
      'bd invocation failed for blocked issues (stored args=%o, dependency args=%o): %o',
      stored_args,
      DEPENDENCY_BLOCKED_ARGS,
      err
    );
    return {
      ok: false,
      error: {
        code: 'bd_error',
        message:
          (err && /** @type {any} */ (err).message) || 'bd invocation failed'
      }
    };
  }
}

/**
 * Extract the dependency-blocked array from `bd ready --explain --json`.
 *
 * @param {unknown} value
 * @returns {unknown[]}
 */
function extractDependencyBlockedIssues(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return [];
  }
  const blocked = /** @type {{ blocked?: unknown }} */ (value).blocked;
  return Array.isArray(blocked) ? blocked : [];
}

/**
 * Merge issue lists by id while preserving first-seen order.
 *
 * @param {...Array<{ id: string, created_at: number, updated_at: number, closed_at: number | null } & Record<string, unknown>>} lists
 * @returns {Array<{ id: string, created_at: number, updated_at: number, closed_at: number | null } & Record<string, unknown>>}
 */
function mergeIssueLists(...lists) {
  /** @type {Map<string, { id: string, created_at: number, updated_at: number, closed_at: number | null } & Record<string, unknown>>} */
  const by_id = new Map();
  for (const list of lists) {
    for (const item of list) {
      const existing = by_id.get(item.id);
      by_id.set(item.id, existing ? { ...existing, ...item } : item);
    }
  }
  return Array.from(by_id.values());
}

/**
 * Convert a failed bd command result to a fetch failure.
 *
 * @param {{ code?: number, stderr?: string } | undefined | null} res
 * @returns {FetchListResultFailure}
 */
function bdCommandFailure(res) {
  return {
    ok: false,
    error: {
      code: 'bd_error',
      message: String(res?.stderr || 'bd failed'),
      details: { exit_code: res?.code ?? -1 }
    }
  };
}

/**
 * Create a `bad_request` error object.
 *
 * @param {string} message
 */
function badRequest(message) {
  const e = new Error(message);
  // @ts-expect-error add code
  e.code = 'bad_request';
  return e;
}

/**
 * Return true when bd rejects the optional `resolved` custom status because a
 * repository has not configured it yet.
 *
 * @param {string} stderr
 */
function isUnsupportedResolvedStatus(stderr) {
  return stderr.includes('invalid status') && stderr.includes('resolved');
}

/**
 * Normalize arbitrary thrown values to a structured error object.
 *
 * @param {unknown} err
 * @returns {FetchListResultFailure['error']}
 */
function toErrorObject(err) {
  if (err && typeof err === 'object') {
    const any = /** @type {{ code?: unknown, message?: unknown }} */ (err);
    const code = typeof any.code === 'string' ? any.code : 'bad_request';
    const message =
      typeof any.message === 'string' ? any.message : 'Request error';
    return { code, message };
  }
  return { code: 'bad_request', message: 'Request error' };
}

/**
 * Parse a bd timestamp string to epoch ms using Date.parse.
 * Falls back to numeric coercion when parsing fails.
 *
 * @param {unknown} v
 * @returns {number}
 */
function parseTimestamp(v) {
  if (typeof v === 'string') {
    const ms = Date.parse(v);
    if (Number.isFinite(ms)) {
      return ms;
    }
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  if (typeof v === 'number') {
    return Number.isFinite(v) ? v : 0;
  }
  return 0;
}
