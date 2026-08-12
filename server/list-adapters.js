import { runBdJson } from './bd.js';
import {
  applyClosedIssuesFilter,
  closedIssuesSince
} from './closed-issues-filter.js';
import { debug } from './logging.js';
import { enrichIssuesWorkflow } from './workflow-enrich.js';
import { requestWorkspaceSnapshot } from './workspace-snapshot-runtime.js';

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
      // `--limit 0` = unlimited. A cap here truncates in bd's arbitrary
      // (non-`closed_at`) order, so the all-time range dropped rows without
      // saying which — and lifting it costs ~20ms at 1493 issues.
      const args = [
        'list',
        '--json',
        '--tree=false',
        '--status',
        'closed',
        '--limit',
        '0'
      ];
      const since = closedIssuesSince(spec);
      if (since !== null) {
        // `--closed-after` is EXCLUSIVE while the board filter is inclusive
        // (`closed_at >= since`), so the bound is nudged back one second —
        // `closed_at` has second precision, and the exact boundary call stays
        // with `applyClosedIssuesFilter`.
        args.push('--closed-after', new Date(since - 1000).toISOString());
      }
      return args;
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
    case 'deferred-issues': {
      return [
        'list',
        '--json',
        '--tree=false',
        '--status',
        'deferred',
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
 * @typedef {{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>} NormalizedIssue
 */

/**
 * @typedef {Object} FetchListResultSuccess
 * @property {true} ok
 * @property {NormalizedIssue[]} items
 * @property {boolean} [stale]
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
 * Enriches each returned issue with a compact `workflow` object (route,
 * stepper stages incl. computed stale, chips) via `enrichIssuesWorkflow` using
 * the workspace root as git cwd. Enrichment is fail-quiet and never blocks
 * shaping.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @param {{ cwd?: string, workspace_snapshot?: boolean, snapshot_cause?: string }} [options] - Optional working directory and snapshot request options
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
export async function fetchListForSubscription(spec, options = {}) {
  if (
    options.workspace_snapshot === true &&
    isWorkspaceSnapshotListSpec(spec)
  ) {
    return fetchWorkspaceSnapshotProjection(spec, options);
  }
  const result = await fetchListForSubscriptionRaw(spec, options);
  if (result.ok) {
    // Filter BEFORE enrichment: a range view keeps a handful of the closed
    // issues bd returns, and enrich + provenance both cost per issue.
    result.items = applyClosedIssuesFilter(spec, result.items);
    result.items = enrichIssuesWorkflow(
      /** @type {any} */ (result.items),
      options.cwd
    );
    result.items = await enrichIssuesProvenance(
      /** @type {any} */ (result.items),
      options.cwd
    );
  }
  return result;
}

/**
 * Fetch one shared workspace generation and project it into a list view.
 * `issue-detail` deliberately remains on the direct `bd show` path.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @param {{ cwd?: string, snapshot_cause?: string }} options
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
async function fetchWorkspaceSnapshotProjection(spec, options) {
  const snapshot_result = await requestWorkspaceSnapshot(
    options.cwd,
    options.snapshot_cause || 'background-subscribe'
  );
  if (!snapshot_result.ok) {
    return { ok: false, error: snapshot_result.error };
  }
  if (snapshot_result.stale) {
    return {
      ok: true,
      items: projectWorkspaceSnapshot(spec, snapshot_result.snapshot, options),
      stale: true
    };
  }
  return {
    ok: true,
    items: projectWorkspaceSnapshot(spec, snapshot_result.snapshot, options)
  };
}

/**
 * Project one committed raw workspace snapshot into the legacy list payload
 * shape without issuing another `bd` command.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @param {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot} snapshot
 * @param {{ cwd?: string }} options
 * @returns {NormalizedIssue[]}
 */
function projectWorkspaceSnapshot(spec, snapshot, options) {
  const type = String(spec.type);
  /** @type {NormalizedIssue[]} */
  let items;
  switch (type) {
    case 'all-issues': {
      items = snapshot.all.filter((item) => item.status !== 'closed');
      break;
    }
    case 'ready-issues': {
      items = projectReadyIssues(snapshot);
      break;
    }
    case 'blocked-issues': {
      items = projectBlockedIssues(snapshot);
      break;
    }
    case 'in-progress-issues': {
      items = projectByStatus(snapshot, 'in_progress');
      break;
    }
    case 'closed-issues': {
      items = projectByStatus(snapshot, 'closed');
      break;
    }
    case 'resolved-issues': {
      items = projectByStatus(snapshot, 'resolved');
      break;
    }
    case 'deferred-issues': {
      items = projectByStatus(snapshot, 'deferred');
      break;
    }
    default: {
      return [];
    }
  }
  items = applyClosedIssuesFilter(spec, items);
  items = enrichIssuesWorkflow(/** @type {any} */ (items), options.cwd);
  return attachSnapshotProvenance(items, snapshot);
}

/**
 * @param {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot} snapshot
 * @param {string} status
 * @returns {NormalizedIssue[]}
 */
function projectByStatus(snapshot, status) {
  return snapshot.all.filter((item) => item.status === status);
}

/**
 * @param {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot} snapshot
 * @returns {NormalizedIssue[]}
 */
function projectReadyIssues(snapshot) {
  /** @type {NormalizedIssue[]} */
  const items = [];
  for (const ready_item of snapshot.ready_explain.ready) {
    const id = String(ready_item.id ?? '');
    const stored = snapshot.id_index.get(id);
    if (stored) {
      items.push({ ...stored, ...ready_item });
    }
  }
  return items;
}

/**
 * @param {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot} snapshot
 * @returns {NormalizedIssue[]}
 */
function projectBlockedIssues(snapshot) {
  const stored_items = projectByStatus(snapshot, 'blocked');
  /** @type {NormalizedIssue[]} */
  const dependency_items = [];
  for (const blocked_item of snapshot.ready_explain.blocked) {
    const id = String(blocked_item.id ?? '');
    const stored = snapshot.id_index.get(id);
    if (stored) {
      dependency_items.push({ ...stored, ...blocked_item });
    }
  }
  return attachBlockedInfo(
    /** @type {any} */ (
      mergeIssueLists(
        /** @type {any} */ (stored_items),
        /** @type {any} */ (dependency_items)
      )
    ),
    /** @type {any} */ (stored_items),
    /** @type {any} */ (dependency_items)
  );
}

/**
 * @param {NormalizedIssue[]} items
 * @param {import('./workspace-snapshot-coordinator.js').WorkspaceSnapshot} snapshot
 * @returns {NormalizedIssue[]}
 */
function attachSnapshotProvenance(items, snapshot) {
  const from_by_id =
    snapshot.command_mode === 'embedded-dependencies'
      ? collectEmbeddedProvenance(items)
      : collectProvenanceEdges(
          snapshot.dependency_edges,
          items.map((item) => item.id)
        );
  if (from_by_id.size === 0) {
    return items;
  }
  return items.map((item) => {
    const from_id = from_by_id.get(item.id);
    return from_id ? { ...item, from_id } : item;
  });
}

/**
 * @param {NormalizedIssue[]} items
 * @returns {Map<string, string>}
 */
function collectEmbeddedProvenance(items) {
  /** @type {Map<string, string>} */
  const by_id = new Map();
  for (const item of items) {
    if (!Array.isArray(item.dependencies)) {
      continue;
    }
    for (const edge of item.dependencies) {
      if (!edge || typeof edge !== 'object') {
        continue;
      }
      const record = /** @type {Record<string, unknown>} */ (edge);
      if (record.type !== 'discovered-from') {
        continue;
      }
      const from_id = String(record.depends_on_id ?? '');
      if (from_id.length > 0 && !by_id.has(item.id)) {
        by_id.set(item.id, from_id);
      }
    }
  }
  return by_id;
}

/**
 * @param {{ type: string }} spec
 */
function isWorkspaceSnapshotListSpec(spec) {
  return String(spec.type) !== 'issue-detail';
}

/**
 * Attach `from_id` — the bead this one was discovered from — to every issue in
 * a list.
 *
 * Provenance is an EDGE (`discovered-from`), never a label, so it is derived
 * here rather than read off the issue. One batch `bd dep list <ids...> --json`
 * covers the whole list; in that batch shape each record is a bare edge
 * `{ issue_id, depends_on_id, type }` where `issue_id` is the follow-up and
 * `depends_on_id` is the origin. (The single-id shape is different — it returns
 * full target issues with a `dependency_type` field — so the two must not share
 * a parser.)
 *
 * A bead can carry more than one origin edge; the card shows one, so the first
 * edge wins. Everything here is fail-quiet: a bd failure returns the issues
 * untouched and the card simply renders no provenance chip.
 *
 * @param {NormalizedIssue[]} items
 * @param {string | undefined} cwd
 * @returns {Promise<NormalizedIssue[]>}
 */
async function enrichIssuesProvenance(items, cwd) {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }
  const ids = items
    .map((it) => String(it.id ?? ''))
    .filter((id) => id.length > 0);
  if (ids.length === 0) {
    return items;
  }
  /** @type {Map<string, string>} */
  let from_by_id = new Map();
  try {
    const res = await runBdJson(['dep', 'list', ...ids, '--json'], { cwd });
    if (!res || res.code !== 0 || !('stdoutJson' in res)) {
      log('bd dep list failed for provenance code=%s', res?.code);
      return items;
    }
    from_by_id = collectProvenanceEdges(res.stdoutJson, ids);
  } catch (err) {
    log('bd dep list invocation failed for provenance: %o', err);
    return items;
  }
  if (from_by_id.size === 0) {
    return items;
  }
  return items.map((it) => {
    const from_id = from_by_id.get(String(it.id ?? ''));
    return from_id ? { ...it, from_id } : it;
  });
}

/**
 * Reduce a `bd dep list --json` payload to `issue id → origin id` for
 * `discovered-from` edges only. First edge per issue wins.
 *
 * `bd` answers in TWO different shapes depending on how many ids were asked
 * for, and both must be read here because a board column can hold exactly one
 * card:
 *
 * - several ids → bare edges `{ issue_id, depends_on_id, type }`,
 * - a single id → the full TARGET issues, each with a `dependency_type` and no
 *   back-reference, so the owning issue is the one id that was requested.
 *
 * @param {unknown} value
 * @param {string[]} requested_ids - The ids passed to `bd dep list`, in order.
 * @returns {Map<string, string>}
 */
function collectProvenanceEdges(value, requested_ids) {
  /** @type {Map<string, string>} */
  const by_id = new Map();
  if (!Array.isArray(value)) {
    return by_id;
  }
  const single_id = requested_ids.length === 1 ? requested_ids[0] : null;
  for (const edge of value) {
    if (!edge || typeof edge !== 'object') {
      continue;
    }
    const e = /** @type {Record<string, unknown>} */ (edge);
    /** @type {string} */
    let issue_id;
    /** @type {string} */
    let origin_id;
    if (e.issue_id !== undefined || e.depends_on_id !== undefined) {
      if (e.type !== 'discovered-from') {
        continue;
      }
      issue_id = String(e.issue_id ?? '');
      origin_id = String(e.depends_on_id ?? '');
    } else {
      if (single_id === null || e.dependency_type !== 'discovered-from') {
        continue;
      }
      issue_id = single_id;
      origin_id = String(e.id ?? '');
    }
    if (issue_id.length === 0 || origin_id.length === 0) {
      continue;
    }
    if (!by_id.has(issue_id)) {
      by_id.set(issue_id, origin_id);
    }
  }
  return by_id;
}

/**
 * Fetch + normalize the mapped `bd` command for a subscription spec, without
 * workflow enrichment.
 *
 * @param {{ type: string, params?: Record<string, string | number | boolean> }} spec
 * @param {{ cwd?: string }} [options]
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
async function fetchListForSubscriptionRaw(spec, options = {}) {
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
    const stored_items = normalizeIssueList(stored_raw);
    const dependency_items = normalizeIssueList(dependency_raw);
    const items = attachBlockedInfo(
      mergeIssueLists(stored_items, dependency_items),
      stored_items,
      dependency_items
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
 * Synthesize `blocked_info` for every Blocked-column issue.
 *
 * The column has two independent sources — a stored `status=blocked` (an
 * EXTERNAL blocker: something outside the tracker is being waited on) and
 * `bd ready --explain` (a DEPENDENCY blocker: other beads must land first) —
 * and an issue can be in both at once. {@link mergeIssueLists} cannot carry
 * that distinction: it shallow-spreads one record over the other, so whichever
 * source loses the spread is erased. Membership is therefore read from the two
 * source lists directly, after the merge.
 *
 * `reason` comes from `metadata.blocked_reason` and stays null when the key is
 * absent, so the card falls back to a bare "blocked" chip.
 *
 * @param {NormalizedIssue[]} merged
 * @param {NormalizedIssue[]} stored_items
 * @param {NormalizedIssue[]} dependency_items
 * @returns {NormalizedIssue[]}
 */
function attachBlockedInfo(merged, stored_items, dependency_items) {
  const external_ids = new Set(stored_items.map((it) => String(it.id ?? '')));
  /** @type {Map<string, string[]>} */
  const blockers_by_id = new Map();
  for (const item of dependency_items) {
    blockers_by_id.set(String(item.id ?? ''), extractBlockerIds(item));
  }
  return merged.map((item) => {
    const id = String(item.id ?? '');
    const external = external_ids.has(id);
    const blockers = blockers_by_id.get(id) || [];
    return {
      ...item,
      blocked_info: {
        external,
        reason: external ? blockedReasonOf(item) : null,
        blockers
      }
    };
  });
}

/**
 * Read the blocker ids off a `bd ready --explain` blocked entry.
 *
 * @param {Record<string, unknown>} item
 * @returns {string[]}
 */
function extractBlockerIds(item) {
  const blocked_by = item.blocked_by;
  if (!Array.isArray(blocked_by)) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  for (const entry of blocked_by) {
    const id =
      entry && typeof entry === 'object'
        ? String(/** @type {Record<string, unknown>} */ (entry).id ?? '')
        : String(entry ?? '');
    if (id.length > 0) {
      ids.push(id);
    }
  }
  return ids;
}

/**
 * @param {Record<string, unknown>} item
 * @returns {string | null}
 */
function blockedReasonOf(item) {
  const metadata = item.metadata;
  if (!metadata || typeof metadata !== 'object') {
    return null;
  }
  const reason = /** @type {Record<string, unknown>} */ (metadata)
    .blocked_reason;
  if (typeof reason !== 'string') {
    return null;
  }
  const trimmed = reason.trim();
  return trimmed.length > 0 ? trimmed : null;
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
