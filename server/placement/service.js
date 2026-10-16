/**
 * The placement judgment service (UI-izba §4.2–§4.5): turns a workspace's
 * candidates and lane members into `placement_relations`/`placement_status`
 * from cached answers, and schedules the jev calls the cache is missing.
 *
 * The projection is synchronous and never calls jev — `[추천 배치]` only shows
 * finished results. Calls are scheduled: a workspace's change in candidates,
 * members or material digests is gathered for {@link BATCH_DELAY_MS}, then only
 * the uncached pairs are queued; at most {@link CONCURRENCY} calls run server
 * wide. A failed pair waits {@link FAILURE_BACKOFF_MS}; a missing key stops
 * queueing until its recheck window passes (§4.8).
 *
 * `server/worker/queue-place.js` never reads this module: placement writes stay
 * judgment-free and take the lane and index they are given.
 *
 * @import { PlacementWire } from './wire.js'
 * @import { IssueMaterial } from './material.js'
 */
import path from 'node:path';
import { debug } from '../logging.js';
import { resolveSpecId } from '../spec-id.js';
import { WORKFLOW_ROUTES } from '../worker/routes.js';
import { stateRootDir } from '../worker/state-paths.js';
import { createCallLog } from './call-log.js';
import { createJevClient } from './jev-client.js';
import { issueMaterial, pairState } from './material.js';
import { createPairCache, pairCacheKey } from './pair-cache.js';
import { BATCH_DELAY_MS, CONCURRENCY, FAILURE_BACKOFF_MS } from './question.js';
import { placementRelations } from './relations.js';
import { createSpecSectionCache } from './spec-sections.js';

const log = debug('placement:service');

/** @type {number} While calls are outstanding, progress is announced this often. */
const PROGRESS_ANNOUNCE_MS = 2_000;

/** @type {ReadonlySet<string>} */
const ROUTES = new Set(WORKFLOW_ROUTES);

/**
 * Whether a 후보 row can be placed into a lane — the same facts and the same
 * reading as the browser's `placementFromFacts` (`app/views/worker/
 * placement.js`): a known route, not awaiting the user, and a description
 * (quick_fix) or a published spec (otherwise). `worker_ineligible` does not
 * exclude (UI-lbm5 §4.2: such a Bead runs in the session lane). A legacy row
 * without the fact bundle keeps that function's permissive fallback.
 *
 * @param {Record<string, unknown>} row
 * @returns {boolean}
 */
export function isPlaceableCandidate(row) {
  const has_facts =
    Object.hasOwn(row, 'route') &&
    Object.hasOwn(row, 'spec_state') &&
    Object.hasOwn(row, 'has_description') &&
    Object.hasOwn(row, 'awaiting_user');
  if (!has_facts) {
    return true;
  }
  const route = typeof row.route === 'string' ? row.route : '';
  return (
    ROUTES.has(route) &&
    row.awaiting_user !== true &&
    (route === 'quick_fix'
      ? row.has_description === true
      : row.spec_state === 'published')
  );
}

/**
 * @typedef {Object} ProjectInput
 * @property {string[]} candidates - Placeable candidate ids, display order.
 * @property {string[]} members - Waiting entries and lane-occupying lineages.
 * @property {Record<string, string[]>} blocked_by
 * @property {Record<string, string[]>} scopes
 * @property {{ blocker: string, blockee: string }[]} lane_edges
 * @property {Map<string, Record<string, unknown>>|null} rows - The workspace
 * snapshot's `id_index`, or null when there is no snapshot yet.
 */

/**
 * @typedef {Object} WorkspaceState
 * @property {string[]} candidates
 * @property {Map<string, IssueMaterial>} materials
 * @property {Array<{ a: string, b: string, overlap?: string[] }>} pairs
 * @property {string} signature
 */

/**
 * @typedef {Object} Job
 * @property {string} workspace
 * @property {string} key
 * @property {string} a
 * @property {string} b
 * @property {IssueMaterial} material_a
 * @property {IssueMaterial} material_b
 * @property {string[]} overlap
 */

/**
 * @typedef {Object} PlacementServiceOptions
 * @property {ReturnType<typeof createJevClient>} client
 * @property {ReturnType<typeof createPairCache>} pairCache
 * @property {ReturnType<typeof createSpecSectionCache>} specSections
 * @property {ReturnType<typeof createCallLog>} callLog
 * @property {() => number} [now]
 */

/**
 * Create a placement service.
 *
 * @param {PlacementServiceOptions} options
 */
export function createPlacementService(options) {
  const { client, pairCache, specSections, callLog } = options;
  const now = options.now || (() => Date.now());

  /** @type {Map<string, WorkspaceState>} */
  const workspaces = new Map();
  /**
   * Material memo by workspace and id: a row object and a spec value that did
   * not change since the last projection reuse the same text and digest.
   *
   * @type {Map<string, Map<string, { row: unknown, spec: unknown, scope_key: string, material: IssueMaterial|null }>>}
   */
  const memo = new Map();
  /** @type {Map<string, { reason: string, at: number }>} */
  const failures = new Map();
  /** @type {Job[]} */
  const queue = [];
  /** @type {Set<string>} Cache keys queued or in flight. */
  const outstanding = new Set();
  /** @type {Map<string, number>} */
  const outstanding_by_workspace = new Map();
  let active = 0;
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const batch_timers = new Map();
  /** @type {Map<string, { at: number, timer: ReturnType<typeof setTimeout> }>} */
  const recheck_timers = new Map();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const announce_timers = new Map();
  /** @type {Set<(workspace: string) => void>} */
  const listeners = new Set();
  /** @type {Array<() => void>} */
  let idle_waiters = [];

  specSections.onFilled((workspace) => announce(workspace));

  /**
   * @param {string} workspace
   */
  function announce(workspace) {
    const timer = announce_timers.get(workspace);
    if (timer !== undefined) {
      clearTimeout(timer);
      announce_timers.delete(workspace);
    }
    for (const listener of listeners) {
      try {
        listener(workspace);
      } catch (err) {
        log('placement fill callback failed for %s: %o', workspace, err);
      }
    }
  }

  /**
   * One fanout when a workspace's last outstanding call ends; while calls are
   * still running, at most one progress fanout per {@link PROGRESS_ANNOUNCE_MS}.
   *
   * @param {string} workspace
   */
  function scheduleAnnounce(workspace) {
    if ((outstanding_by_workspace.get(workspace) || 0) === 0) {
      announce(workspace);
      return;
    }
    if (announce_timers.has(workspace)) {
      return;
    }
    const timer = setTimeout(() => {
      announce_timers.delete(workspace);
      announce(workspace);
    }, PROGRESS_ANNOUNCE_MS);
    timer.unref?.();
    announce_timers.set(workspace, timer);
  }

  /**
   * Run {@link fire} for a workspace at `at` (the earliest asked time wins).
   *
   * @param {string} workspace
   * @param {number|null} at
   */
  function scheduleRecheck(workspace, at) {
    if (at === null) {
      return;
    }
    const existing = recheck_timers.get(workspace);
    if (existing && existing.at <= at) {
      return;
    }
    if (existing) {
      clearTimeout(existing.timer);
    }
    const timer = setTimeout(
      () => {
        recheck_timers.delete(workspace);
        void fire(workspace);
      },
      Math.max(0, at - now())
    );
    timer.unref?.();
    recheck_timers.set(workspace, { at, timer });
  }

  /**
   * @param {string} key
   * @returns {{ reason: string, at: number }|null}
   */
  function activeFailure(key) {
    const failure = failures.get(key);
    if (!failure) {
      return null;
    }
    if (now() - failure.at >= FAILURE_BACKOFF_MS) {
      failures.delete(key);
      return null;
    }
    return failure;
  }

  /**
   * Queue the uncached pairs of a workspace's latest projection.
   *
   * @param {string} workspace
   */
  async function fire(workspace) {
    const state = workspaces.get(workspace);
    if (!state) {
      return;
    }
    /** @type {Job[]} */
    const jobs = [];
    /** @type {number|null} */
    let next_retry = null;
    for (const { a, b, overlap } of state.pairs) {
      const material_a = state.materials.get(a);
      const material_b = state.materials.get(b);
      if (!material_a || !material_b) {
        continue;
      }
      const key = pairCacheKey(a, b, material_a.digest, material_b.digest);
      const failure = activeFailure(key);
      if (failure !== null) {
        // A pair still inside its backoff window is asked again when the
        // window ends; without this, only the earliest failure's timer ever
        // fires and the later ones wait for an input change.
        const at = failure.at + FAILURE_BACKOFF_MS;
        next_retry = next_retry === null ? at : Math.min(next_retry, at);
        continue;
      }
      if (
        outstanding.has(key) ||
        pairCache.get(a, b, material_a.digest, material_b.digest) !== null
      ) {
        continue;
      }
      jobs.push({
        workspace,
        key,
        a,
        b,
        material_a,
        material_b,
        overlap: overlap || []
      });
    }
    scheduleRecheck(workspace, next_retry);
    if (jobs.length === 0) {
      return;
    }
    if (client.keys.state() === 'missing') {
      scheduleRecheck(workspace, client.keys.recheckAt());
      return;
    }
    if (client.keys.state() !== 'present') {
      const key = await client.keys.get();
      if (key === null) {
        scheduleRecheck(workspace, client.keys.recheckAt());
        announce(workspace);
        return;
      }
    }
    for (const job of jobs) {
      if (outstanding.has(job.key)) {
        continue;
      }
      outstanding.add(job.key);
      outstanding_by_workspace.set(
        workspace,
        (outstanding_by_workspace.get(workspace) || 0) + 1
      );
      queue.push(job);
    }
    announce(workspace);
    pump();
  }

  function pump() {
    while (active < CONCURRENCY && queue.length > 0) {
      const job = /** @type {Job} */ (queue.shift());
      active += 1;
      void run(job).finally(() => {
        active -= 1;
        outstanding.delete(job.key);
        const left = (outstanding_by_workspace.get(job.workspace) || 1) - 1;
        if (left > 0) {
          outstanding_by_workspace.set(job.workspace, left);
        } else {
          outstanding_by_workspace.delete(job.workspace);
        }
        scheduleAnnounce(job.workspace);
        pump();
      });
    }
    if (active === 0 && queue.length === 0) {
      const waiters = idle_waiters;
      idle_waiters = [];
      for (const resolve of waiters) {
        resolve();
      }
    }
  }

  /**
   * @param {Job} job
   */
  async function run(job) {
    const started = now();
    /** @type {import('./jev-client.js').JevResult} */
    let result;
    try {
      result = await client.judge(
        pairState(
          job.a,
          job.material_a.text,
          job.b,
          job.material_b.text,
          job.overlap
        )
      );
    } catch {
      result = { ok: false, reason: 'connection_failed' };
    }
    const ended = now();
    if (result.ok) {
      failures.delete(job.key);
      pairCache.set(
        job.a,
        job.b,
        job.material_a.digest,
        job.material_b.digest,
        {
          choice: result.choice,
          confidence: result.confidence,
          judged_at: ended
        }
      );
    } else {
      failures.set(job.key, { reason: result.reason, at: ended });
      scheduleRecheck(job.workspace, ended + FAILURE_BACKOFF_MS);
    }
    void callLog.append({
      at: new Date(ended).toISOString(),
      workspace: job.workspace,
      a: job.a,
      b: job.b,
      digest_a: job.material_a.digest,
      digest_b: job.material_b.digest,
      choice: result.ok ? result.choice : null,
      confidence: result.ok ? result.confidence : null,
      ms: ended - started,
      reason: result.ok ? null : result.reason
    });
  }

  /**
   * @param {string} workspace
   * @param {string} id
   * @param {Record<string, unknown>|undefined} row
   * @param {string[]|undefined} scope - The declared scope the placement
   * judgment reads for this bead.
   * @returns {IssueMaterial|null}
   */
  function materialOf(workspace, id, row, scope) {
    const spec_path = row ? resolveSpecId(row).path : '';
    const spec = spec_path ? specSections.peek(workspace, spec_path) : null;
    const spec_ref = spec && spec.state === 'hit' ? spec.value : spec?.state;
    let by_id = memo.get(workspace);
    if (!by_id) {
      by_id = new Map();
      memo.set(workspace, by_id);
    }
    const scope_key = Array.isArray(scope) ? JSON.stringify(scope) : '';
    const cached = by_id.get(id);
    if (
      cached &&
      cached.row === row &&
      cached.spec === spec_ref &&
      cached.scope_key === scope_key
    ) {
      return cached.material;
    }
    const material = issueMaterial(row, spec_path, spec, scope);
    by_id.set(id, { row, spec: spec_ref, scope_key, material });
    return material;
  }

  return {
    /**
     * The wire fields of one workspace from what is cached right now. With
     * `observe`, the projection also becomes the workspace's latest state and
     * a changed pair set arms the batch timer.
     *
     * @param {string} workspace
     * @param {ProjectInput} input
     * @param {{ observe: boolean }} mode
     * @returns {PlacementWire}
     */
    project(workspace, input, mode) {
      /** @type {Map<string, IssueMaterial>} */
      const materials = new Map();
      /** @type {Record<string, string|null>} */
      const digests = {};
      const ids = new Set([...input.candidates, ...input.members]);
      for (const id of ids) {
        const material = materialOf(
          workspace,
          id,
          input.rows?.get(id),
          input.scopes[id]
        );
        digests[id] = material ? material.digest : null;
        if (material) {
          materials.set(id, material);
        }
      }
      const by_id = memo.get(workspace);
      if (by_id) {
        for (const id of by_id.keys()) {
          if (!ids.has(id)) {
            by_id.delete(id);
          }
        }
      }
      const out = placementRelations({
        candidates: input.candidates,
        members: input.members,
        blocked_by: input.blocked_by,
        scopes: input.scopes,
        lane_edges: input.lane_edges,
        digests,
        key_state: client.keys.state(),
        judgmentFor: (a, b, digest_a, digest_b) => {
          const entry = pairCache.get(a, b, digest_a, digest_b);
          if (entry) {
            return {
              kind: 'answer',
              choice: entry.choice,
              confidence: entry.confidence,
              judged_at: entry.judged_at
            };
          }
          const failure = activeFailure(pairCacheKey(a, b, digest_a, digest_b));
          return failure ? { kind: 'failed', reason: failure.reason } : null;
        }
      });
      if (mode.observe) {
        const signature = out.jev_pairs
          .map(({ a, b }) =>
            pairCacheKey(
              a,
              b,
              /** @type {string} */ (digests[a]),
              /** @type {string} */ (digests[b])
            )
          )
          .sort()
          .join('\n');
        const previous = workspaces.get(workspace);
        workspaces.set(workspace, {
          candidates: [...input.candidates],
          materials,
          pairs: out.jev_pairs,
          signature
        });
        if (!previous || previous.signature !== signature) {
          const timer = batch_timers.get(workspace);
          if (timer !== undefined) {
            clearTimeout(timer);
          }
          const next = setTimeout(() => {
            batch_timers.delete(workspace);
            void fire(workspace);
          }, BATCH_DELAY_MS);
          next.unref?.();
          batch_timers.set(workspace, next);
        }
      }
      return {
        placement_relations: out.relations,
        placement_status: out.status,
        placement_progress: out.progress
      };
    },

    /**
     * `↻ 다시 판정`: drop the cached answers and remembered failures naming
     * one of the workspace's current candidates, then queue those pairs again
     * at once.
     *
     * @param {string} workspace
     * @returns {Promise<{ cleared: number }>}
     */
    async rejudge(workspace) {
      const state = workspaces.get(workspace);
      if (!state) {
        return { cleared: 0 };
      }
      const ids = new Set(state.candidates);
      const cleared = pairCache.deleteInvolving(ids);
      for (const { a, b } of state.pairs) {
        const material_a = state.materials.get(a);
        const material_b = state.materials.get(b);
        if (material_a && material_b && (ids.has(a) || ids.has(b))) {
          failures.delete(
            pairCacheKey(a, b, material_a.digest, material_b.digest)
          );
        }
      }
      announce(workspace);
      await fire(workspace);
      return { cleared };
    },

    /**
     * Register a "placement material or answers changed" callback; the ws
     * layer wires it to the queue fanout.
     *
     * @param {(workspace: string) => void} listener
     * @returns {() => void} Unregister.
     */
    onFilled(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Resolve once no call is queued or running (tests).
     *
     * @returns {Promise<void>}
     */
    idle() {
      if (active === 0 && queue.length === 0) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        idle_waiters.push(resolve);
      });
    }
  };
}

/**
 * The service with the real jev client, the state-directory cache and call
 * log, and the pinned-base spec reader.
 */
export function createDefaultPlacementService() {
  const pairCache = createPairCache({
    file: path.join(stateRootDir(), 'placement-pair-cache.json')
  });
  pairCache.load();
  return createPlacementService({
    client: createJevClient(),
    pairCache,
    specSections: createSpecSectionCache(),
    callLog: createCallLog({
      file: path.join(stateRootDir(), 'placement-calls.jsonl')
    })
  });
}

/**
 * The installed instance. Null until the server installs one at startup, so a
 * test that decorates a queue never reaches jev, `secrets-get` or the state
 * directory; with no service the decoration omits both wire fields.
 *
 * @type {ReturnType<typeof createPlacementService>|null}
 */
let INSTALLED = null;

/**
 * @returns {ReturnType<typeof createPlacementService>|null}
 */
export function placementService() {
  return INSTALLED;
}

/**
 * Install the process-wide service (server startup).
 *
 * @param {ReturnType<typeof createPlacementService>} [service]
 */
export function installPlacementService(service) {
  INSTALLED = service || createDefaultPlacementService();
  return INSTALLED;
}

/**
 * @param {ReturnType<typeof createPlacementService>|null} service
 */
export function __setPlacementServiceForTest(service) {
  INSTALLED = service;
}
