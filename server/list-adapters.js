import path from 'node:path';
import { isBdProtocolFailure } from './bd-json.js';
import { runBdJsonProjected } from './bd.js';
import {
  applyClosedIssuesFilter,
  closedIssuesSince
} from './closed-issues-filter.js';
import { debug } from './logging.js';
import {
  cachedIssuePrefixFor,
  foreignBlockerClosedAtFor,
  prefixOfBeadId,
  visibleWorkspaceRoots
} from './worker/foreign-blocker-status.js';
import { enrichIssuesWorkflow } from './workflow-enrich.js';
import {
  peekWorkspaceSnapshot,
  requestWorkspaceSnapshot
} from './workspace-snapshot-runtime.js';

/**
 * @import { WorkspaceSnapshot } from './workspace-snapshot-coordinator.js'
 */

const log = debug('list-adapters');
const DEPENDENCY_BLOCKED_ARGS = [
  'ready',
  '--explain',
  '--limit',
  '1000',
  '--json'
];
const DEFAULT_LIST_LIMIT = 50;
const SNAPSHOT_LIST_LIMIT = 1000;
/** Follow-up ids carried with `dependents_info` (UI-d13v §3.5). */
const DEPENDENTS_ID_LIMIT = 5;
/** Field separator of the `decoration_rev` delta fingerprint (UI-d13v §3.7). */
const DECORATION_FIELD_SEPARATOR = '\u001e';

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
      // `--include-dependents` carries the reverse-direction edges the detail
      // panel renders read-only; without it `bd show` answers `dependencies`
      // only.
      return ['show', id, '--include-dependents', '--json'];
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
    try {
      result.items = await enrichIssuesProvenance(
        /** @type {any} */ (result.items),
        options.cwd
      );
    } catch (err) {
      if (err instanceof BdProtocolError) {
        return bdCommandFailure({ ok: false, error: err.bd_error });
      }
      throw err;
    }
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
      items = limitSnapshotItems(
        snapshot.all.filter((item) => item.status !== 'closed'),
        DEFAULT_LIST_LIMIT
      );
      break;
    }
    case 'ready-issues': {
      items = limitSnapshotItems(
        projectReadyIssues(snapshot, options.cwd),
        SNAPSHOT_LIST_LIMIT
      );
      break;
    }
    case 'blocked-issues': {
      items = projectBlockedIssues(snapshot, options.cwd);
      break;
    }
    case 'in-progress-issues': {
      items = limitSnapshotItems(
        projectByStatus(snapshot, 'in_progress'),
        DEFAULT_LIST_LIMIT
      );
      break;
    }
    case 'closed-issues': {
      items = projectByStatus(snapshot, 'closed');
      break;
    }
    case 'resolved-issues': {
      items = limitSnapshotItems(
        projectByStatus(snapshot, 'resolved'),
        SNAPSHOT_LIST_LIMIT
      );
      break;
    }
    case 'deferred-issues': {
      items = limitSnapshotItems(
        projectByStatus(snapshot, 'deferred'),
        SNAPSHOT_LIST_LIMIT
      );
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
 * Restore the cap of the legacy subscription command after preserving raw
 * whole-list ordering in the shared snapshot.
 *
 * @param {NormalizedIssue[]} items
 * @param {number} limit
 * @returns {NormalizedIssue[]}
 */
function limitSnapshotItems(items, limit) {
  return items.slice(0, limit);
}

/**
 * @param {WorkspaceSnapshot} snapshot
 * @param {string | undefined} root_dir
 * @returns {NormalizedIssue[]}
 */
function projectReadyIssues(snapshot, root_dir) {
  /** @type {NormalizedIssue[]} */
  const items = [];
  for (const ready_item of snapshot.ready_explain.ready) {
    const id = String(ready_item.id ?? '');
    const stored = snapshot.id_index.get(id);
    if (stored) {
      items.push(mergeSnapshotIssue(stored, ready_item));
    }
  }
  return attachCandidateDecorations(items, snapshot, root_dir);
}

/**
 * @param {WorkspaceSnapshot} snapshot
 * @param {string | undefined} root_dir
 * @returns {NormalizedIssue[]}
 */
function projectBlockedIssues(snapshot, root_dir) {
  /** @type {NormalizedIssue[]} */
  const dependency_items = [];
  for (const blocked_item of snapshot.ready_explain.blocked) {
    const id = String(blocked_item.id ?? '');
    const stored = snapshot.id_index.get(id);
    if (stored) {
      dependency_items.push(mergeSnapshotIssue(stored, blocked_item));
    }
  }
  return attachCandidateDecorations(
    attachBlockedInfo(
      /** @type {any} */ (
        limitSnapshotItems(dependency_items, SNAPSHOT_LIST_LIMIT)
      )
    ),
    snapshot,
    root_dir
  );
}

/**
 * @typedef {{ id: string, closed_at: number, foreign: boolean, root_dir?: string }} ReleasedBlocker
 * @typedef {{ released_by: ReleasedBlocker[], last_released_at: number }} ReleaseInfo
 * @typedef {{ count: number, ids: string[] }} DependentsInfo
 * @typedef {{ snapshot: WorkspaceSnapshot, root_dir: string, self_prefix: string | null, owner_by_prefix: Map<string, string>, peer_snapshots: WorkspaceSnapshot[] }} DecorationContext
 */

/**
 * Attach the candidate-lane decorations to a Ready/Blocked projection
 * (UI-d13v §3.3·§3.5·§3.7).
 *
 * Same place and same idiom as {@link attachBlockedInfo}: display material
 * derived from the generation that was already fetched, never an admission
 * input. `blocked_info` answers "why can it not go"; these two answer "why can
 * it go NOW" and "why should it go FIRST", which is exactly what disappears
 * from the screen the moment a blocker closes.
 *
 * Every key is optional on purpose — an absent key means "not known", so a
 * consumer that cannot tell 0 from unknown must read both as unknown.
 *
 * @param {NormalizedIssue[]} items
 * @param {WorkspaceSnapshot} snapshot
 * @param {string | undefined} root_dir
 * @returns {NormalizedIssue[]}
 */
function attachCandidateDecorations(items, snapshot, root_dir) {
  if (items.length === 0) {
    return items;
  }
  const context = createDecorationContext(snapshot, root_dir);
  return items.map((item) => {
    const release_info = releaseInfoFor(item.id, context);
    const dependents_info = dependentsInfoFor(item.id, context);
    return {
      ...item,
      ...(release_info === null ? {} : { release_info }),
      ...(dependents_info === null ? {} : { dependents_info }),
      decoration_rev: decorationRev(release_info, dependents_info)
    };
  });
}

/**
 * Collect the per-generation materials both decorations share, so the visible
 * workspace list and the cross-workspace peeks cost one pass per projection
 * rather than one per issue.
 *
 * @param {WorkspaceSnapshot} snapshot
 * @param {string | undefined} root_dir
 * @returns {DecorationContext}
 */
function createDecorationContext(snapshot, root_dir) {
  const self_root =
    typeof root_dir === 'string' && root_dir.length > 0 ? root_dir : '';
  const self_resolved = self_root.length > 0 ? path.resolve(self_root) : '';
  /** @type {string[]} */
  let roots = [];
  try {
    roots = visibleWorkspaceRoots();
  } catch (err) {
    log('visible workspace roots unreadable for decorations: %o', err);
  }
  /** @type {Map<string, string>} */
  const owner_by_prefix = new Map();
  /** @type {WorkspaceSnapshot[]} */
  const peer_snapshots = [];
  for (const other_root of roots) {
    if (other_root === self_resolved) {
      continue;
    }
    // The SAME prefix map `applyForeignBlockerCleanup` writes
    // `blocker_workspaces` from, so a released foreign blocker and a surviving
    // one name the same owning root.
    const prefix = cachedIssuePrefixFor(other_root);
    if (typeof prefix === 'string' && prefix.length > 0) {
      owner_by_prefix.set(prefix, other_root);
    }
    const peer = peekWorkspaceSnapshot(other_root);
    if (peer !== null) {
      peer_snapshots.push(peer);
    }
  }
  return {
    snapshot,
    root_dir: self_root,
    self_prefix:
      self_resolved.length > 0 ? cachedIssuePrefixFor(self_resolved) : null,
    owner_by_prefix,
    peer_snapshots
  };
}

/**
 * The CLOSED blockers this issue was waiting on, newest close first
 * (UI-d13v §3.3).
 *
 * An OPEN blocker is deliberately absent: that one is still `blocked_info`'s to
 * report. `released_by` empty means the key is not carried at all.
 *
 * @param {string} issue_id
 * @param {DecorationContext} context
 * @returns {ReleaseInfo | null}
 */
function releaseInfoFor(issue_id, context) {
  const blocker_ids = blocksIndexOf(context.snapshot, 'blocks_out').get(
    issue_id
  );
  if (!blocker_ids || blocker_ids.length === 0) {
    return null;
  }
  /** @type {ReleasedBlocker[]} */
  const released_by = [];
  for (const blocker_id of blocker_ids) {
    const stored = context.snapshot.id_index.get(blocker_id);
    if (stored) {
      if (stored.status === 'closed' && typeof stored.closed_at === 'number') {
        released_by.push({
          id: blocker_id,
          closed_at: stored.closed_at,
          foreign: false
        });
      }
      continue;
    }
    const foreign_entry = foreignReleasedBlocker(blocker_id, context);
    if (foreign_entry !== null) {
      released_by.push(foreign_entry);
    }
  }
  if (released_by.length === 0) {
    return null;
  }
  released_by.sort(byClosedAtDescThenId);
  return { released_by, last_released_at: released_by[0].closed_at };
}

/**
 * A blocker that lives in another visible rig, reported only once that rig's
 * cache says CLOSED and carries a `closed_at`.
 *
 * A cache miss, an `open` answer and a close with no readable timestamp all
 * read the same way here — the id is left out, because "not known yet" must
 * never be drawn as "not released". The owning root is what makes the lookup
 * possible at all, so it is also what `root_dir` reports; an id no visible rig
 * owns has no entry to carry the key on.
 *
 * @param {string} blocker_id
 * @param {DecorationContext} context
 * @returns {ReleasedBlocker | null}
 */
function foreignReleasedBlocker(blocker_id, context) {
  const prefix = prefixOfBeadId(blocker_id);
  if (context.self_prefix !== null && prefix === context.self_prefix) {
    // This rig's own id that the generation does not carry — unknown, and
    // asking another rig for it would answer about a different bead.
    return null;
  }
  const owner_root = context.owner_by_prefix.get(prefix);
  if (owner_root === undefined) {
    return null;
  }
  const closed_at = foreignBlockerClosedAtFor(
    blocker_id,
    owner_root,
    context.root_dir
  );
  if (typeof closed_at !== 'number') {
    return null;
  }
  return { id: blocker_id, closed_at, foreign: true, root_dir: owner_root };
}

/**
 * How many OPEN issues are waiting on this one (UI-d13v §3.5).
 *
 * Counted across this generation plus the last snapshot every OTHER visible
 * workspace happened to have — peeked, never requested, because a follow-up
 * count is worth one refresh cycle of lag and not a fanout multiplied by the
 * number of open repos. A workspace with no snapshot yet contributes nothing
 * and says so nowhere: the count is a lower bound by construction.
 *
 * `count === 0` carries no key, so 0 and unknown are the same answer.
 *
 * @param {string} issue_id
 * @param {DecorationContext} context
 * @returns {DependentsInfo | null}
 */
function dependentsInfoFor(issue_id, context) {
  /** @type {Set<string>} */
  const open_ids = new Set();
  collectOpenDependents(context.snapshot, issue_id, open_ids);
  for (const peer of context.peer_snapshots) {
    collectOpenDependents(peer, issue_id, open_ids);
  }
  if (open_ids.size === 0) {
    return null;
  }
  return {
    count: open_ids.size,
    ids: [...open_ids].sort().slice(0, DEPENDENTS_ID_LIMIT)
  };
}

/**
 * @param {WorkspaceSnapshot} snapshot
 * @param {string} issue_id
 * @param {Set<string>} out
 */
function collectOpenDependents(snapshot, issue_id, out) {
  const waiter_ids = blocksIndexOf(snapshot, 'blocks_in').get(issue_id);
  if (!waiter_ids) {
    return;
  }
  for (const waiter_id of waiter_ids) {
    const stored = snapshot.id_index.get(waiter_id);
    if (stored && stored.status !== 'closed') {
      out.add(waiter_id);
    }
  }
}

/**
 * Read one derived index off a snapshot, tolerating a generation built before
 * the index existed.
 *
 * @param {WorkspaceSnapshot} snapshot
 * @param {'blocks_out'|'blocks_in'} name
 * @returns {Map<string, string[]>}
 */
function blocksIndexOf(snapshot, name) {
  const index = snapshot[name];
  return index instanceof Map ? index : new Map();
}

/**
 * @param {ReleasedBlocker} a
 * @param {ReleasedBlocker} b
 * @returns {number}
 */
function byClosedAtDescThenId(a, b) {
  if (a.closed_at !== b.closed_at) {
    return b.closed_at - a.closed_at;
  }
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/**
 * Fingerprint of the two decorations for the subscription delta (UI-d13v §3.7).
 *
 * Neither decoration moves the issue's own `updated_at`/`closed_at` — a blocker
 * closing, a follow-up appearing, a foreign lookup landing all change what this
 * row should say while the row itself stands still — so without this string the
 * delta would compute "unchanged" and no upsert would ever reach the client.
 * Not display material: keys are serialized in sorted order purely so equal
 * decorations produce equal strings.
 *
 * @param {ReleaseInfo | null} release_info
 * @param {DependentsInfo | null} dependents_info
 * @returns {string}
 */
function decorationRev(release_info, dependents_info) {
  /** @type {string[]} */
  const fields = [];
  if (dependents_info !== null) {
    fields.push(
      `dependents_info=${dependents_info.count}:${dependents_info.ids.join(',')}`
    );
  }
  if (release_info !== null) {
    const released = release_info.released_by
      .map(
        (entry) =>
          `${entry.id}:${entry.closed_at}:${entry.foreign ? 1 : 0}:${entry.root_dir ?? ''}`
      )
      .join(',');
    fields.push(`release_info=${released}`);
  }
  return fields.join(DECORATION_FIELD_SEPARATOR);
}

/**
 * Keep explain-only fields while restoring the normalized timestamp contract of
 * list adapter rows after an explain payload overrides a raw snapshot field.
 *
 * @param {NormalizedIssue} stored
 * @param {Record<string, unknown>} explained
 * @returns {NormalizedIssue}
 */
function mergeSnapshotIssue(stored, explained) {
  return normalizeIssueList([{ ...stored, ...explained }])[0] || stored;
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
      const from_id = nonEmptyStringId(record.depends_on_id);
      if (from_id !== null && !by_id.has(item.id)) {
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
    const res = await runBdJsonProjected(
      'dep',
      ['dep', 'list', ...ids, '--json'],
      { cwd }
    );
    if (!res || res.ok !== true) {
      // An ordinary optional dependency CLI failure stays fail-quiet display
      // policy; a schema or shape failure is a compatibility fault and must
      // reach the subscription instead of silently dropping provenance.
      if (isBdProtocolFailure(res)) {
        throw new BdProtocolError(res.error);
      }
      log('bd dep list failed for provenance code=%s', res?.error?.code);
      return items;
    }
    from_by_id = collectProvenanceEdges(res.data, ids);
  } catch (err) {
    if (err instanceof BdProtocolError) {
      // Ordinary provenance failures stay fail-quiet; a protocol fault is a
      // compatibility fault and must fail the subscription instead.
      throw err;
    }
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
      const batch_issue_id = nonEmptyStringId(e.issue_id);
      const batch_origin_id = nonEmptyStringId(e.depends_on_id);
      if (batch_issue_id === null || batch_origin_id === null) {
        continue;
      }
      issue_id = batch_issue_id;
      origin_id = batch_origin_id;
    } else {
      if (single_id === null || e.dependency_type !== 'discovered-from') {
        continue;
      }
      issue_id = single_id;
      const single_origin_id = nonEmptyStringId(e.id);
      if (single_origin_id === null) {
        continue;
      }
      origin_id = single_origin_id;
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
 * Preserve the CLI's identifier contract: malformed values must not turn into
 * fabricated provenance strings such as "[object Object]".
 *
 * @param {unknown} value
 * @returns {string | null}
 */
function nonEmptyStringId(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
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
    const is_detail = String(spec.type) === 'issue-detail';
    const res = await runBdJsonProjected(is_detail ? 'show' : 'list', args, {
      cwd: options.cwd,
      ...(is_detail ? { expected_id: String(spec.params?.id ?? '') } : {})
    });
    if (!res || res.ok !== true) {
      if (
        String(spec.type) === 'resolved-issues' &&
        !isBdProtocolFailure(res) &&
        isUnsupportedResolvedStatus(res?.error?.message || '')
      ) {
        return { ok: true, items: [] };
      }
      log('bd failed for %o (args=%o) code=%s', spec, args, res?.error?.code);
      return bdCommandFailure(res);
    }
    // `show` projects one issue; the list views project an array.
    const raw = Array.isArray(res.data) ? res.data : [res.data];

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
 * Fetch Board Blocked-column issues from the dependency-aware
 * `bd ready --explain` blockers.
 *
 * The stored `status=blocked` source is gone: the workflow contract parks a
 * bead with `metadata.awaiting_user` without touching its status, so the column
 * carries dependency blocking only and a parked bead stays in its own status
 * column with the `awaiting_user` chip.
 *
 * @param {{ cwd?: string }} [options]
 * @returns {Promise<FetchListResultSuccess | FetchListResultFailure>}
 */
async function fetchBlockedIssues(options = {}) {
  try {
    const dependency_res = await runBdJsonProjected(
      'ready-explain',
      DEPENDENCY_BLOCKED_ARGS,
      { cwd: options.cwd }
    );
    if (!dependency_res || dependency_res.ok !== true) {
      log(
        'bd failed for dependency-blocked issues (args=%o) code=%s',
        DEPENDENCY_BLOCKED_ARGS,
        dependency_res?.error?.code
      );
      return bdCommandFailure(dependency_res);
    }

    const dependency_raw = extractDependencyBlockedIssues(dependency_res.data);
    const items = attachBlockedInfo(normalizeIssueList(dependency_raw));
    return { ok: true, items };
  } catch (err) {
    log(
      'bd invocation failed for blocked issues (dependency args=%o): %o',
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
 * The column has one source — `bd ready --explain` — so the info carries the
 * blocker ids only. Waiting on a person is no longer a status: it is
 * `metadata.awaiting_user`, which the card reads directly.
 *
 * @param {NormalizedIssue[]} dependency_items
 * @returns {NormalizedIssue[]}
 */
function attachBlockedInfo(dependency_items) {
  return dependency_items.map((item) => ({
    ...item,
    blocked_info: { blockers: extractBlockerIds(item) }
  }));
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
 * Convert a failed bd command result to a fetch failure.
 *
 * @param {{ ok: false, error: import('./bd-json.js').BdJsonError } | undefined | null} res
 * @returns {FetchListResultFailure}
 */
function bdCommandFailure(res) {
  const error = res && res.error ? res.error : null;
  return {
    ok: false,
    error: {
      code: 'bd_error',
      message: String((error && error.message) || 'bd failed'),
      details: {
        exit_code:
          error && error.details && typeof error.details.exit_code === 'number'
            ? error.details.exit_code
            : -1,
        reason: error ? error.code : 'bd_error'
      }
    }
  };
}

/**
 * Raised so a provenance protocol fault escapes the fail-quiet display path and
 * fails its subscription.
 */
class BdProtocolError extends Error {
  /**
   * @param {any} error
   */
  constructor(error) {
    super(String((error && error.message) || 'bd protocol failure'));
    this.name = 'BdProtocolError';
    this.bd_error = error;
  }
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
