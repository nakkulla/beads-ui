/**
 * Per-workspace cache of monitor-runnable beads (UI-qrfo §4).
 *
 * The monitor aggregation ships each visible repo's worker lanes, but a bead
 * that has never been queued is in NO lane — so "spec 리뷰가 끝나 지금 실행할 수
 * 있는 이슈" was invisible there. This cache is what puts those candidates on
 * the wire.
 *
 * Cached PER WORKSPACE, not per bead (unlike `title-cache.js`): one shared
 * workspace snapshot carries every row and its metadata, so every 판정 condition
 * below is decidable without a separate `bd list --status open` process.
 *
 * The read is SYNCHRONOUS, exactly like the title cache, because the snapshot
 * assembly is synchronous. A miss is therefore not an error and not a wait: it
 * is an empty lane for THIS snapshot, queued for an async fill, and arrives on
 * the NEXT snapshot, which the fill callback triggers.
 *
 * This is a DISPLAY-ONLY pre-filter — it never looks at git. Whether the spec
 * file exists at the base commit, whether the receipt SHA is reachable, whether
 * `gh` is usable: all of that stays with `validateAdmission()` at placement
 * time. 표시 통과 → 적재 거부 is the normal path, and the refusal renders as the
 * existing `⛔ 사유` badge.
 *
 * NON-PERSISTED, like `title-cache.js`/`pr-observations.js`: process memory and
 * the wire only.
 */
import path from 'node:path';
import {
  isWorkerIneligible,
  workerLabels
} from '../../app/utils/worker-eligibility.js';
import { isBdProtocolFailure } from '../bd-json.js';
import { debug } from '../logging.js';
import { resolveSpecId } from '../spec-id.js';
import {
  enrichIssueWorkflow,
  parsePlanApprovalReceipt,
  parsePlanReceipt,
  parsePlanReviewReceipt
} from '../workflow-enrich.js';
import { requestWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import { ADMISSION_RECEIPT_RE } from './admission.js';
import { ACCOUNT_KEYS, BEAD_APPLY_KEYS } from './exec-enums.js';

const log = debug('worker:runnable-cache');

/**
 * How long a SUCCESSFUL scan stays fresh.
 *
 * 30 s is the same tick as the server's default `poll_interval_seconds`, which
 * is also the monitor's refresh driver cadence (§4 갱신 driver): a shorter TTL
 * would only make the driver's own refill re-read what it just read, a longer
 * one would leave a freshly pinned `spec_review` invisible past a full tick.
 */
const POSITIVE_TTL_MS = 30_000;

/**
 * How long a FAILED scan is remembered before another `bd list` is allowed.
 *
 * A workspace that cannot be read (bad checkout, bd unavailable) is in every
 * subsequent snapshot too, so without this each push would spawn a fresh `bd`
 * process per broken repo. Deliberately double the success TTL — the failure is
 * the case where retrying is least likely to pay.
 */
const NEGATIVE_TTL_MS = 60_000;

/**
 * The routes an auto-runnable bead may carry (spec §4, same enum as
 * `admission.js` `ADMISSIBLE_ROUTES`). A route outside this set is a bead the
 * worker would refuse as `invalid_route`, so showing it as runnable would be a
 * lie the user can only discover by clicking.
 *
 * @type {ReadonlySet<string>}
 */
const RUNNABLE_ROUTES = new Set(['spec_backed', 'full_plan', 'quick_fix']);

/**
 * One display-runnable bead. Deliberately a PROJECTION of the `bd list` row, not
 * the row itself: the monitor lane renders an id, a title and the 생성·수정 meta
 * line, and shipping whole bead records for every open issue in every repo would
 * put the entire backlog on the wire on every push.
 *
 * @typedef {Object} RunnableItem
 * @property {string} bead_id
 * @property {string} title
 * @property {string} route - The `metadata.route` that qualified it.
 * @property {string} spec_id - The native-first resolved spec path.
 * @property {string|null} plan_path - `metadata.plan_path` when it is a
 * non-empty string (UI-qm12 §4.4). Carried so a runnable bead's declared scope
 * is read from the SAME artifact set as the queued beads' — loading it into a
 * lane must not change the overlap verdict.
 * @property {string[]} [scope] - The declared scope at the pinned base,
 * attached ADDITIVELY by the monitor pipeline on a scope-cache hit. Absent
 * means 판정 불가 (not yet read, unreadable, or no spec), never "no scope".
 * @property {string} spec_reviewer - Reviewer token from `spec_review`.
 * @property {'approved'|'authored'|'none'} plan_state
 * @property {boolean} blocked - Membership in `ready_explain.blocked`.
 * @property {string[]} blocked_by - Direct `blocks` blocker ids.
 * @property {string[]} labels - Non-policy labels carried for display. An exact
 * `worker-ineligible` label excludes the row before this projection is made.
 * @property {number|string|null} created_at
 * @property {number|string|null} updated_at
 * @property {Record<string, unknown>|null} workflow - The stepper projection for
 * this row (UI-eey2 §9.1), or null when the enrich could not be computed.
 * @property {Record<string, string>} exec_pins - Only the bead's EXECUTION
 * metadata pins, so the card can resolve its orchestration/worker chips without
 * the whole backlog's metadata riding the wire.
 */

/**
 * One bead an interactive SESSION is working on (UI-yrzu §4.1) — a row the
 * runnable projection above rejects because its status is `in_progress`, not
 * `open`.
 *
 * The 자격 conditions of `RunnableItem` deliberately do NOT apply: a session
 * claims whatever issue it likes, so `worker-ineligible`, the route enum, the
 * `spec_review` receipt and phase-child parentage are all irrelevant here. The
 * only question this projection answers is "지금 누가 무엇을 하고 있나".
 *
 * The lane exclusion (활성 Worker attempt · queue · serial · pr_wait) belongs to
 * the CALLER's current state, exactly like `runnableFor`'s, so it is applied at
 * read time.
 *
 * @typedef {Object} SessionActiveItem
 * @property {string} bead_id
 * @property {string} title
 * @property {'in_progress'} status
 * @property {string} route - `metadata.route`, or `''` when unpinned.
 * @property {string} spec_id - Resolved spec path; `''` when absent or in
 * conflict.
 * @property {string[]} labels - Non-policy labels, same normalization as
 * `RunnableItem`.
 * @property {number|string|null} created_at
 * @property {number|string|null} updated_at
 * @property {number|string|null} started_at
 * @property {Record<string, unknown>|null} workflow - Stepper projection for
 * this row, or null when the enrich could not be computed.
 * @property {boolean} blocked - Membership in `ready_explain.blocked`.
 * @property {string[]} blocked_by - Direct `blocks` blocker ids.
 */

/**
 * The metadata keys an execution chip may be resolved from: the per-bead preset
 * axes plus the two account pins. Anything else in `metadata` stays off the
 * wire.
 *
 * @type {ReadonlyArray<string>}
 */
const EXEC_PIN_KEYS = [...BEAD_APPLY_KEYS, ...ACCOUNT_KEYS];

/**
 * Project the execution pins of one row's metadata (UI-eey2 §9.1). Non-string
 * values are dropped rather than coerced: a pin is an enum token, and a number
 * where one belongs is a malformed record, not a selection.
 *
 * @param {Record<string, unknown>} meta
 * @returns {Record<string, string>}
 */
function execPinsOf(meta) {
  /** @type {Record<string, string>} */
  const pins = {};
  for (const key of EXEC_PIN_KEYS) {
    const value = meta[key];
    if (typeof value === 'string' && value.length > 0) {
      pins[key] = value;
    }
  }
  return pins;
}

/**
 * Keep a timestamp only in the shapes the client can format; anything else
 * becomes null so the row simply renders no meta line (same rule as
 * `title-cache.js`).
 *
 * @param {unknown} value
 * @returns {number|string|null}
 */
function stampOf(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * The bead's metadata bag from a `bd list --json` row, or an empty object.
 * `bd list` nests the durable workflow keys under `metadata` (same field
 * `bd-metadata.js` `scanBeads()` reads for `pr_url`).
 *
 * @param {Record<string, unknown>} row
 * @returns {Record<string, unknown>}
 */
function metadataOf(row) {
  const md = row.metadata;
  return md && typeof md === 'object'
    ? /** @type {Record<string, unknown>} */ (md)
    : {};
}

/**
 * Whether a row is a full_plan phase child (`UI-xxxx.N`).
 *
 * Same predicate as `app/views/worker/index.js` `isPhaseChild()`: a phase child
 * is a sub-unit of its parent plan's execution, never a standalone worker
 * candidate. Judged by the flattened `parent` edge OR a dotted id suffix,
 * because a list row may omit `parent`.
 *
 * @param {Record<string, unknown>} row
 * @returns {boolean}
 */
function isPhaseChild(row) {
  const raw = row.parent;
  const has_parent =
    typeof raw === 'string'
      ? raw.length > 0
      : !!(raw && typeof raw === 'object' && /** @type {any} */ (raw).id);
  return has_parent || /\.\d+$/.test(typeof row.id === 'string' ? row.id : '');
}

/**
 * Derive the display-only plan state using the workflow consumer's receipt
 * parsers. New keys win without malformed-key fallback, matching
 * `workflow-enrich.js` `planStage()`; legacy keys remain read-only compatibility.
 *
 * @param {Record<string, unknown>} meta
 * @param {string} route
 * @returns {'approved'|'authored'|'none'}
 */
function planState(meta, route) {
  if (route !== 'full_plan') {
    return 'none';
  }
  const plan_path =
    typeof meta.plan_path === 'string' ? meta.plan_path.trim() : '';
  if (plan_path.length === 0) {
    return 'none';
  }

  const has_new_approval = Object.hasOwn(meta, 'plan_approval');
  const legacy_approval = has_new_approval
    ? null
    : parsePlanReceipt(meta.plan_review);
  const approval = has_new_approval
    ? parsePlanApprovalReceipt(meta.plan_approval)
    : legacy_approval;
  if (approval) {
    return 'approved';
  }

  const review = legacy_approval
    ? parsePlanReviewReceipt(meta.plan_check)
    : Object.hasOwn(meta, 'plan_review')
      ? parsePlanReviewReceipt(meta.plan_review)
      : parsePlanReviewReceipt(meta.plan_check);
  return review ? 'authored' : 'none';
}

/**
 * The 판정 조건 (spec §4), minus the lane exclusion — that one depends on the
 * CALLER's current queue state, so it is applied at read time instead of being
 * baked into the cached list.
 *
 * @param {Record<string, unknown>} row
 * @param {string[]|null} blocked_by - Null means no `ready_explain` source.
 * @param {(issue: unknown) => Record<string, unknown>|null} [enrich] - Workflow
 * projection for the SAME row; defaults to no projection.
 * @returns {RunnableItem|null}
 */
function qualify(row, blocked_by = null, enrich = undefined) {
  const bead_id = typeof row.id === 'string' ? row.id : '';
  if (bead_id.length === 0) {
    return null;
  }
  if (row.status !== 'open') {
    return null;
  }
  if (isWorkerIneligible(row.labels)) {
    return null;
  }
  const meta = metadataOf(row);
  const route = typeof meta.route === 'string' ? meta.route : '';
  if (!RUNNABLE_ROUTES.has(route)) {
    return null;
  }
  const is_quick_fix = route === 'quick_fix';
  let spec_id = '';
  let spec_reviewer = '';
  if (is_quick_fix) {
    if (
      typeof row.description !== 'string' ||
      row.description.trim().length === 0
    ) {
      return null;
    }
  } else {
    const spec = resolveSpecId(row);
    if (spec.path.length === 0 || spec.conflict) {
      return null;
    }
    const spec_review = meta.spec_review;
    const normalized_spec_review =
      typeof spec_review === 'string' ? spec_review.trim() : '';
    if (
      normalized_spec_review.length === 0 ||
      !ADMISSION_RECEIPT_RE.test(normalized_spec_review)
    ) {
      return null;
    }
    spec_id = spec.path;
    spec_reviewer = normalized_spec_review.slice(
      0,
      normalized_spec_review.indexOf('@')
    );
  }
  if (isPhaseChild(row)) {
    return null;
  }
  const plan_path =
    typeof meta.plan_path === 'string' ? meta.plan_path.trim() : '';
  return {
    bead_id,
    title: typeof row.title === 'string' ? row.title : '',
    route,
    spec_id,
    plan_path: plan_path.length > 0 ? plan_path : null,
    spec_reviewer,
    plan_state: is_quick_fix ? 'none' : planState(meta, route),
    blocked: blocked_by !== null,
    blocked_by: blocked_by || [],
    labels: workerLabels(row.labels),
    created_at: stampOf(row.created_at),
    updated_at: stampOf(row.updated_at),
    workflow: enrich ? enrich(row) : null,
    exec_pins: execPinsOf(meta)
  };
}

/**
 * A session row's timestamp, with the shared snapshot's "unparseable" sentinel
 * removed (UI-yrzu §5·§10).
 *
 * `list-adapters.js normalizeIssueList()` turns a missing or unparseable
 * `created_at`/`updated_at` into `0` before this cache ever sees the row. The
 * session tile's 경과 줄 falls back from `started_at` to `updated_at` through
 * `validTime`, which reads that `0` as a real 1970 timestamp and renders "56년
 * 전" where the spec asks for no line at all (§5·§10). The other readers of
 * these fields go through `formatRelativeTime`, which already answers `''` for
 * `0`, so only this lane needed the sentinel removed.
 *
 * @param {unknown} value
 * @returns {number|string|null}
 */
function sessionStamp(value) {
  const stamp = stampOf(value);
  return stamp === 0 ? null : stamp;
}

/**
 * The 판정 for a SESSION-held bead (UI-yrzu §3), minus the lane exclusion, which
 * the caller applies at read time exactly like the runnable one.
 *
 * Only two things disqualify a row here: no id, and a status that is not
 * `in_progress`. Everything `qualify()` additionally demands — the route enum,
 * the `spec_review` receipt, `worker-ineligible`, phase-child parentage — is a
 * WORKER admission condition, and a session is not the worker.
 *
 * @param {Record<string, unknown>} row
 * @param {string[]|null} blocked_by - Null means no `ready_explain` source.
 * @param {(issue: unknown) => Record<string, unknown>|null} [enrich] - Workflow
 * projection for the SAME row; defaults to no projection.
 * @returns {SessionActiveItem|null}
 */
function qualifySession(row, blocked_by = null, enrich = undefined) {
  const bead_id = typeof row.id === 'string' ? row.id : '';
  if (bead_id.length === 0) {
    return null;
  }
  if (row.status !== 'in_progress') {
    return null;
  }
  const meta = metadataOf(row);
  const spec = resolveSpecId(row);
  return {
    bead_id,
    title: typeof row.title === 'string' ? row.title : '',
    status: 'in_progress',
    route: typeof meta.route === 'string' ? meta.route : '',
    spec_id: spec.conflict ? '' : spec.path,
    labels: workerLabels(row.labels),
    created_at: sessionStamp(row.created_at),
    updated_at: sessionStamp(row.updated_at),
    started_at: sessionStamp(row.started_at),
    workflow: enrich ? enrich(row) : null,
    blocked: blocked_by !== null,
    blocked_by: blocked_by || []
  };
}

/**
 * Read direct blocker ids from one `bd ready --explain` blocked row using the
 * same string-or-`{ id }` convention as `list-adapters.js` (UI-2gi1 §6.1).
 *
 * @param {Record<string, unknown>} row
 * @returns {string[]}
 */
function blockerIds(row) {
  if (!Array.isArray(row.blocked_by)) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  for (const entry of row.blocked_by) {
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
 * Direct `blocks` blocker ids embedded in the bead's own `bd list` row — the
 * second source spec §6.1 names for when the explain row carries membership but
 * no blocker ids of its own.
 *
 * Both edge shapes this codebase already reads are accepted: the `bd show`
 * shape (`dependency_type` + `id`, `title-cache.js`) and the embedded `bd list`
 * shape (`type` + `depends_on_id`, `list-adapters.js`). Neither is guessed at —
 * an unrecognized row simply contributes nothing.
 *
 * @param {Record<string, unknown>} row
 * @returns {string[]}
 */
function embeddedBlockerIds(row) {
  if (!Array.isArray(row.dependencies)) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  for (const dep of row.dependencies) {
    if (!dep || typeof dep !== 'object' || Array.isArray(dep)) {
      continue;
    }
    const edge = /** @type {Record<string, unknown>} */ (dep);
    if ((edge.dependency_type ?? edge.type) !== 'blocks') {
      continue;
    }
    const id =
      typeof edge.depends_on_id === 'string' && edge.depends_on_id.length > 0
        ? edge.depends_on_id
        : typeof edge.id === 'string'
          ? edge.id
          : '';
    if (id.length > 0) {
      ids.push(id);
    }
  }
  return ids;
}

/**
 * Create a runnable-candidate cache. One instance is held process-wide by the
 * worker runtime, next to the title cache, so every monitor push shares one
 * fill queue.
 *
 * Everything the cache depends on is injectable so the unit stays a pure test:
 * `now` for the TTL clock, `requestSnapshot` for the shared generation, and
 * `subscriberCount` for the "nobody is watching" gate.
 *
 * @param {{
 *   now?: () => number,
 *   positive_ttl_ms?: number,
 *   negative_ttl_ms?: number,
 *   runJson?: (command_family: string, args: string[], options?: { cwd?: string }) => Promise<{ ok: boolean, data?: unknown }>,
 *   requestSnapshot?: (workspace: string, cause: string) => Promise<{ ok: boolean, stale?: boolean, snapshot?: { all?: unknown[], ready_explain?: { blocked?: unknown[] } } }>,
 *   subscriberCount?: () => number,
 *   enrichWorkflow?: (issue: unknown, workspace: string) => Record<string, unknown>|null
 * }} [options]
 */
export function createRunnableCache(options = {}) {
  const now = options.now || (() => Date.now());
  const positive_ttl_ms =
    typeof options.positive_ttl_ms === 'number'
      ? options.positive_ttl_ms
      : POSITIVE_TTL_MS;
  const negative_ttl_ms =
    typeof options.negative_ttl_ms === 'number'
      ? options.negative_ttl_ms
      : NEGATIVE_TTL_MS;
  const enrichWorkflow =
    options.enrichWorkflow ||
    ((/** @type {any} */ issue, /** @type {string} */ workspace) =>
      enrichIssueWorkflow(issue, workspace));
  const requestSnapshot =
    typeof options.requestSnapshot === 'function'
      ? options.requestSnapshot
      : options.runJson
        ? null
        : requestWorkspaceSnapshot;

  /**
   * How many clients are watching the monitor. The LIVE wiring replaces this
   * with `monitorPipelineSubscriberCount` (ws/monitor-handlers.js) — the module
   * cannot import that itself without an import cycle. A directly constructed
   * cache with no wiring counts as watched, so a unit test asking for candidates
   * gets them; the "0 subscribers" contract is exercised by injecting 0.
   *
   * @type {() => number}
   */
  let subscriberCount =
    typeof options.subscriberCount === 'function'
      ? options.subscriberCount
      : () => 1;

  /**
   * One record per workspace holding BOTH buckets of the same scan (UI-yrzu
   * §4.1). They share a record — and therefore one `at` stamp — so
   * `invalidate`/`refresh`/`clear` and the negative cache apply to both without
   * a second code path that could let the two lanes disagree about freshness.
   *
   * @type {Map<string, { items: RunnableItem[], session_active: SessionActiveItem[], at: number }>}
   */
  const records = new Map();
  /** @type {Map<string, number>} */
  const failed = new Map();
  /**
   * Scans currently running, keyed by resolved workspace. A workspace already
   * being scanned is NOT queued again — the in-flight run's completion is what
   * delivers it, so a burst of pushes collapses to one `bd list`.
   *
   * @type {Map<string, Promise<boolean>>}
   */
  const in_flight = new Map();
  /** @type {((workspace: string) => void)|null} */
  let onFilled = null;

  /**
   * Workspace keys are RESOLVED like the queue store's, so the aggregation's
   * root and the invalidation's root address the same repo.
   *
   * @param {string} workspace
   * @returns {string}
   */
  function keyOf(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * The workflow projector for one workspace. The `bd list` row already carries
   * everything `enrichIssueWorkflow` reads, so the stepper costs NO extra bd
   * call (UI-eey2 §9.1); the git probe rides the enrich module's own cache.
   * Fail-quiet per row: an enrich that throws leaves that one card with no
   * stepper instead of dropping it from the lane.
   *
   * @param {string} workspace
   * @returns {(issue: unknown) => Record<string, unknown>|null}
   */
  function enrichFor(workspace) {
    const root = keyOf(workspace);
    return (issue) => {
      try {
        return enrichWorkflow(issue, root) || null;
      } catch (err) {
        log('workflow enrich failed in %s: %o', root, err);
        return null;
      }
    };
  }

  /**
   * Read one workspace's open beads and keep the ones that qualify. Every
   * failure mode — non-zero exit, unreadable payload, non-array rows — collapses
   * to null, because the caller treats them identically: negative-cache and move
   * on.
   *
   * Both buckets come out of THIS ONE scan: the `--all` snapshot already holds
   * every row, so the session bucket costs no extra `bd` process (UI-yrzu §4.1).
   *
   * @param {string} workspace
   * @returns {Promise<{ items: RunnableItem[]|null, session_active: SessionActiveItem[], protocol_failure: boolean }>}
   */
  async function fetchRunnable(workspace) {
    let rows;
    /** @type {Map<string, string[]>|null} */
    let blockers_by_id = null;
    if (requestSnapshot) {
      const result = await requestSnapshot(workspace, 'monitor-runnable');
      if (!result.ok || result.stale || !Array.isArray(result.snapshot?.all)) {
        return { items: null, session_active: [], protocol_failure: false };
      }
      rows = result.snapshot.all;
      const blocked = result.snapshot.ready_explain?.blocked;
      if (Array.isArray(blocked)) {
        blockers_by_id = new Map();
        for (const raw of blocked) {
          if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            continue;
          }
          const row = /** @type {Record<string, unknown>} */ (raw);
          const id = typeof row.id === 'string' ? row.id : String(row.id ?? '');
          if (id.length > 0) {
            blockers_by_id.set(id, blockerIds(row));
          }
        }
      }
    } else {
      const result = await options.runJson?.(
        'list',
        ['list', '--status', 'open', '--limit', '1000', '--json'],
        { cwd: workspace }
      );
      // A protocol failure is not "no runnable work": it is reported so the
      // caller skips the negative cache entirely, because suppressing the retry
      // would hide a compatibility break behind an empty queue.
      if (!result || result.ok !== true) {
        return {
          items: null,
          session_active: [],
          protocol_failure: isBdProtocolFailure(result)
        };
      }
      rows = result.data;
    }
    if (!Array.isArray(rows)) {
      return { items: null, session_active: [], protocol_failure: false };
    }
    /** @type {RunnableItem[]} */
    const items = [];
    /** @type {SessionActiveItem[]} */
    const session_active = [];
    const enrich = enrichFor(workspace);
    for (const raw of rows) {
      if (!raw || typeof raw !== 'object') {
        continue;
      }
      const row = /** @type {Record<string, unknown>} */ (raw);
      const explained = blockers_by_id?.get(
        typeof row.id === 'string' ? row.id : String(row.id ?? '')
      );
      // Membership stays the explain row's alone; only the ids fall back, so a
      // bead the explain source never called blocked can never gain a chip here.
      const blocked_by =
        explained === undefined
          ? null
          : explained.length > 0
            ? explained
            : embeddedBlockerIds(row);
      const item = qualify(row, blocked_by, enrich);
      if (item) {
        items.push(item);
        continue;
      }
      // The second bucket of the SAME pass: a row the runnable 판정 rejected is
      // still a fact about the repo when a session holds it (UI-yrzu §4.1).
      const session_item = qualifySession(row, blocked_by, enrich);
      if (session_item) {
        session_active.push(session_item);
      }
    }
    return { items, session_active, protocol_failure: false };
  }

  /**
   * @param {string} key
   */
  function announceFilled(key) {
    if (!onFilled) {
      return;
    }
    try {
      onFilled(key);
    } catch (err) {
      log('runnable fill callback failed for %s: %o', key, err);
    }
  }

  /**
   * One shared scan for one workspace. NEVER rejects: every failure is a
   * negative-cache entry and a log line.
   *
   * A failed refresh must NOT evict what is already cached (same rule as
   * `title-cache.js`): dropping candidates the reader already sees because `bd`
   * hiccupped is a regression. Only the retry is suppressed.
   *
   * @param {string} workspace
   */
  function startFill(workspace) {
    const key = keyOf(workspace);
    const run = (async () => {
      try {
        const fetched = await fetchRunnable(workspace);
        if (fetched.items) {
          records.set(key, {
            items: fetched.items,
            session_active: fetched.session_active,
            at: now()
          });
          failed.delete(key);
          return true;
        }
        // A protocol fault stays retryable: negative-caching it would report a
        // compatibility break as an empty runnable queue for the whole TTL.
        if (!fetched.protocol_failure) {
          failed.set(key, now() + negative_ttl_ms);
        }
        log('runnable list unreadable for %s', key);
        return false;
      } catch (err) {
        failed.set(key, now() + negative_ttl_ms);
        log('runnable scan failed for %s: %o', key, err);
        return false;
      } finally {
        in_flight.delete(key);
      }
    })();
    in_flight.set(key, run);
    void run.then((ok) => {
      if (ok) {
        announceFilled(key);
      }
    });
  }

  /**
   * The gate every fill passes through: no watchers, an in-flight scan, or a
   * live negative-cache entry each mean "do not spawn `bd` right now".
   *
   * @param {string} workspace
   */
  function queueFill(workspace) {
    if (subscriberCount() <= 0) {
      // Nobody is watching the monitor, so there is no snapshot for a fill to
      // land on — spawning `bd` per repo here would be pure waste (spec §4).
      return;
    }
    const key = keyOf(workspace);
    if (in_flight.has(key)) {
      return;
    }
    const until = failed.get(key);
    if (typeof until === 'number') {
      if (until > now()) {
        return;
      }
      failed.delete(key);
    }
    startFill(workspace);
  }

  /**
   * The shared read path of both buckets: one TTL check, one refill trigger,
   * one exclusion filter. Written once so `runnableFor` and `sessionActiveFor`
   * cannot drift apart in freshness or in what "already in a lane" means.
   *
   * @template {'items'|'session_active'} B
   * @param {string} workspace
   * @param {B} bucket
   * @param {Iterable<string>} [exclude_ids]
   * @returns {B extends 'items' ? RunnableItem[] : SessionActiveItem[]}
   */
  function readBucket(workspace, bucket, exclude_ids) {
    const key = keyOf(workspace);
    const hit = records.get(key);
    if (!hit || now() - hit.at >= positive_ttl_ms) {
      queueFill(workspace);
    }
    if (!hit) {
      return /** @type {any} */ ([]);
    }
    const rows = /** @type {Array<{ bead_id: string }>} */ (hit[bucket]);
    const excluded = exclude_ids ? new Set(exclude_ids) : null;
    return /** @type {any} */ (
      excluded
        ? rows.filter((item) => !excluded.has(item.bead_id))
        : rows.slice()
    );
  }

  return {
    /**
     * Register the "new candidates landed" callback. The ws layer wires this to
     * the monitor push, which is the whole delivery path for a candidate that
     * missed the snapshot that asked for it.
     *
     * @param {((workspace: string) => void)|null} fn
     */
    setOnFilled(fn) {
      onFilled = typeof fn === 'function' ? fn : null;
    },

    /**
     * Wire the live monitor subscriber count (see the field's own note for why
     * it cannot be an import).
     *
     * @param {(() => number)|null} fn
     */
    setSubscriberCount(fn) {
      subscriberCount = typeof fn === 'function' ? fn : () => 1;
    },

    /**
     * This workspace's runnable candidates, minus the ids the caller already has
     * in a lane. SYNCHRONOUS and side-effect-free from the caller's view: a cold
     * miss is an empty array plus a queued async fill whose completion re-pushes
     * the snapshot.
     *
     * `exclude_ids` is passed IN rather than read from the queue store here: the
     * aggregation already holds that workspace's decorated `queue`/`pr_wait`/
     * `done`, and reaching back into the store from the cache would give the
     * same bead two different lane verdicts in one snapshot.
     *
     * An EXPIRED record still answers (stale-while-revalidate) — the lane keeps
     * rendering while the refresh runs, and a failed refresh leaves the stale
     * list in place.
     *
     * @param {string} workspace
     * @param {Iterable<string>} [exclude_ids]
     * @returns {RunnableItem[]}
     */
    runnableFor(workspace, exclude_ids) {
      return readBucket(workspace, 'items', exclude_ids);
    },

    /**
     * This workspace's SESSION-held beads, minus the ids the caller already has
     * in a lane or in an active worker attempt (UI-yrzu §3).
     *
     * Same TTL/fill/exclude contract as `runnableFor` — including the
     * stale-while-revalidate read — because both buckets are the same scan, and
     * the two lanes disagreeing about how old the repo's picture is would be a
     * bug the user reads as a flickering tile.
     *
     * @param {string} workspace
     * @param {Iterable<string>} [exclude_ids]
     * @returns {SessionActiveItem[]}
     */
    sessionActiveFor(workspace, exclude_ids) {
      return readBucket(workspace, 'session_active', exclude_ids);
    },

    /**
     * Ask for a re-scan regardless of how fresh the record is — the periodic
     * driver's entry point (spec §4 갱신 driver). Still gated on subscribers, an
     * in-flight scan and the failure TTL, so a tick can never outrun those.
     *
     * @param {string} workspace
     */
    refresh(workspace) {
      queueFill(workspace);
    },

    /**
     * Expire one workspace's record so the next read re-scans. Wired to
     * `onQueueChanged`. EXPIRE, never delete: a delete makes the next
     * synchronous read answer `[]` until the async `bd list` lands, which
     * blanks the 실행가능 lane for every push in between — with a live session
     * emitting queue events every few seconds the lane visibly flickers. The
     * stale list is safe to keep serving because the read-time `exclude_ids`
     * already removes any bead that just entered a lane, so "renders in two
     * lanes at once" cannot happen through this record.
     *
     * The negative entry is dropped too — a queue change is fresh evidence that
     * the workspace is being worked in, so holding a stale failure back would
     * only delay the recovery.
     *
     * @param {string} workspace
     */
    invalidate(workspace) {
      const key = keyOf(workspace);
      const hit = records.get(key);
      if (hit) {
        records.set(key, { ...hit, at: -Infinity });
      }
      failed.delete(key);
    },

    /**
     * Drop every cached workspace (test hook / restart semantics). The callbacks
     * are WIRING, not state, and survive — they are registered once per
     * instance, so clearing them here would silently kill the refill push.
     */
    clear() {
      records.clear();
      failed.clear();
      in_flight.clear();
    }
  };
}
