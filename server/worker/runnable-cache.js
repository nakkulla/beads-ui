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
import { debug } from '../logging.js';
import { resolveSpecId } from '../spec-id.js';
import {
  parsePlanApprovalReceipt,
  parsePlanReceipt,
  parsePlanReviewReceipt
} from '../workflow-enrich.js';
import { requestWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import { ADMISSION_RECEIPT_RE } from './admission.js';

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
const RUNNABLE_ROUTES = new Set(['spec_backed', 'full_plan']);

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
 * @property {string} spec_reviewer - Reviewer token from `spec_review`.
 * @property {'approved'|'authored'|'none'} plan_state
 * @property {string[]} labels - Non-policy labels carried for display. An exact
 * `worker-ineligible` label excludes the row before this projection is made.
 * @property {number|string|null} created_at
 * @property {number|string|null} updated_at
 */

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
 * @returns {RunnableItem|null}
 */
function qualify(row) {
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
  if (isPhaseChild(row)) {
    return null;
  }
  return {
    bead_id,
    title: typeof row.title === 'string' ? row.title : '',
    route,
    spec_id: spec.path,
    spec_reviewer: normalized_spec_review.slice(
      0,
      normalized_spec_review.indexOf('@')
    ),
    plan_state: planState(meta, route),
    labels: workerLabels(row.labels),
    created_at: stampOf(row.created_at),
    updated_at: stampOf(row.updated_at)
  };
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
 *   runJson?: (args: string[], options?: { cwd?: string }) => Promise<{ code: number, stdoutJson?: unknown }>,
 *   requestSnapshot?: (workspace: string, cause: string) => Promise<{ ok: boolean, stale?: boolean, snapshot?: { all?: unknown[] } }>,
 *   subscriberCount?: () => number
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

  /** @type {Map<string, { items: RunnableItem[], at: number }>} */
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
   * Read one workspace's open beads and keep the ones that qualify. Every
   * failure mode — non-zero exit, unreadable payload, non-array rows — collapses
   * to null, because the caller treats them identically: negative-cache and move
   * on.
   *
   * @param {string} workspace
   * @returns {Promise<RunnableItem[]|null>}
   */
  async function fetchRunnable(workspace) {
    let rows;
    if (requestSnapshot) {
      const result = await requestSnapshot(workspace, 'monitor-runnable');
      if (!result.ok || result.stale || !Array.isArray(result.snapshot?.all)) {
        return null;
      }
      rows = result.snapshot.all;
    } else {
      const result = await options.runJson?.(
        ['list', '--status', 'open', '--limit', '1000', '--json'],
        { cwd: workspace }
      );
      if (!result || result.code !== 0) {
        return null;
      }
      rows = result.stdoutJson;
    }
    if (!Array.isArray(rows)) {
      return null;
    }
    /** @type {RunnableItem[]} */
    const items = [];
    for (const raw of rows) {
      if (!raw || typeof raw !== 'object') {
        continue;
      }
      const item = qualify(/** @type {Record<string, unknown>} */ (raw));
      if (item) {
        items.push(item);
      }
    }
    return items;
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
        const items = await fetchRunnable(workspace);
        if (items) {
          records.set(key, { items, at: now() });
          failed.delete(key);
          return true;
        }
        failed.set(key, now() + negative_ttl_ms);
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
      const key = keyOf(workspace);
      const hit = records.get(key);
      if (!hit || now() - hit.at >= positive_ttl_ms) {
        queueFill(workspace);
      }
      if (!hit) {
        return [];
      }
      const excluded = exclude_ids ? new Set(exclude_ids) : null;
      return excluded
        ? hit.items.filter((item) => !excluded.has(item.bead_id))
        : hit.items.slice();
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
        records.set(key, { items: hit.items, at: -Infinity });
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
