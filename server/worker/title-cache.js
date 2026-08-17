/**
 * In-memory bead title cache for queue-snapshot decoration (UI-12k6).
 *
 * The Worker lanes render a card per bead, but only Ready/Blocked beads reach
 * the client through a live issue subscription. A bead sitting in `pr_wait`
 * (resolved) or `done` (closed) is in no subscribed column, so the client has
 * nothing to look its title up in and falls back to printing the bead id. This
 * cache is what lets the server put those titles on the wire.
 *
 * NON-PERSISTED, exactly like `pr-observations.js` and `activity-store.js`: it
 * lives on the wire and in process memory only. Titles are DISPLAY-ONLY, so a
 * title renamed after it was cached is allowed to stay stale until the process
 * restarts — there is no correctness claim riding on it, and re-querying `bd`
 * on every snapshot to chase renames would cost far more than the staleness.
 *
 * The read is SYNCHRONOUS ({@link createTitleCache} `titlesFor`) because the
 * snapshot decoration is synchronous. A miss is therefore not an error and not
 * a wait: it is omitted from this snapshot, queued for an async `bd show` fill,
 * and arrives on the NEXT snapshot, which the fill callback triggers.
 *
 * `ensureTitle` is the awaiting variant for callers with no next snapshot to
 * fall back on — the worker's Discord push (UI-vb0t). Both share one fill per
 * bead, so a notification and a snapshot racing for the same title cost one
 * `bd show` between them.
 */
import path from 'node:path';
import { workerLabels } from '../../app/utils/worker-eligibility.js';
import { isBdProtocolFailure } from '../bd-json.js';
import { runBdJsonProjected } from '../bd.js';
import { debug } from '../logging.js';

const log = debug('worker:title-cache');

/**
 * How long a failed lookup is remembered before another `bd show` is allowed.
 * A bead whose title cannot be read (deleted, wrong workspace, bd failure) is
 * in every subsequent snapshot too, so without this the miss would re-spawn a
 * `bd` process on every fanout.
 */
const NEGATIVE_TTL_MS = 60_000;

/**
 * How long a SUCCESSFUL lookup stays fresh (UI-d7pw §4.4).
 *
 * The original contract let a cached title go stale until the process
 * restarted — acceptable for a rename, which is rare and carries no correctness
 * claim. `updated_at` breaks that bargain: it moves on every edit, and a lane
 * row reading "수정 3시간 전" forever is visibly wrong.
 *
 * 5 minutes because the lane renders a RELATIVE time ("대략 얼마 전"), for which
 * 5-minute resolution is plenty, and because 12 `bd show` per bead per hour is
 * negligible at lane scale (tens of rows).
 */
const POSITIVE_TTL_MS = 5 * 60_000;

/**
 * One cached bead record.
 *
 * @typedef {Object} BeadRecord
 * @property {string} title
 * @property {number|string|null} created_at
 * @property {number|string|null} updated_at
 * @property {string[]} labels
 * @property {number} at - Epoch ms this record was read, for {@link POSITIVE_TTL_MS}.
 */

/**
 * Create a bead title cache. One instance is held process-wide by the worker
 * runtime so every workspace's snapshot decoration shares the fill queue.
 *
 * @param {{ now?: () => number, negative_ttl_ms?: number, positive_ttl_ms?: number, runJson?: typeof runBdJsonProjected }} [options]
 */
export function createTitleCache(options = {}) {
  const now = options.now || (() => Date.now());
  const negative_ttl_ms =
    typeof options.negative_ttl_ms === 'number'
      ? options.negative_ttl_ms
      : NEGATIVE_TTL_MS;
  const positive_ttl_ms =
    typeof options.positive_ttl_ms === 'number'
      ? options.positive_ttl_ms
      : POSITIVE_TTL_MS;
  const runJson = options.runJson || runBdJsonProjected;

  /** @type {Map<string, Map<string, BeadRecord>>} */
  const titles_by_workspace = new Map();
  /** @type {Map<string, Map<string, number>>} */
  const failed_by_workspace = new Map();
  /**
   * Fills currently running, keyed `<workspace>\0<bead>`. A bead already being
   * filled is NOT queued again — the in-flight run's completion callback is
   * what delivers it, so a burst of snapshots collapses to one `bd show`.
   *
   * The value carries the run, not a mere marker, so an AWAITING caller
   * (`ensureTitle`) can join a synchronous snapshot's current-generation run
   * (UI-vb0t §3.3). A cache invalidation advances that generation and permits
   * a replacement lookup without an older completion deleting it.
   *
   * @type {Map<string, { generation: number, run: Promise<string|null> }>}
   */
  const in_flight = new Map();
  /** @type {Map<string, Map<string, number>>} */
  const generations_by_workspace = new Map();
  /** @type {((workspace: string) => void)|null} */
  let onFilled = null;

  /**
   * Workspace keys are RESOLVED like the queue store's, so the decoration's
   * connection root and the fill's workspace root address the same lane.
   *
   * @param {string} workspace
   * @returns {string}
   */
  function keyOf(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * The `in_flight` key. NUL-joined so no workspace path or bead id can forge
   * another pair's key.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {string}
   */
  function flightKey(workspace, bead_id) {
    return `${keyOf(workspace)}\u0000${bead_id}`;
  }

  /**
   * @param {string} workspace
   * @returns {Map<string, BeadRecord>}
   */
  function laneFor(workspace) {
    const key = keyOf(workspace);
    let lane = titles_by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      titles_by_workspace.set(key, lane);
    }
    return lane;
  }

  /**
   * @param {string} workspace
   * @returns {Map<string, number>}
   */
  function failedFor(workspace) {
    const key = keyOf(workspace);
    let lane = failed_by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      failed_by_workspace.set(key, lane);
    }
    return lane;
  }

  /**
   * @param {string} workspace
   * @returns {Map<string, number>}
   */
  function generationsFor(workspace) {
    const key = keyOf(workspace);
    let lane = generations_by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      generations_by_workspace.set(key, lane);
    }
    return lane;
  }

  /**
   * @param {unknown} issue
   * @returns {BeadRecord|null}
   */
  function recordFromIssue(issue) {
    const raw_issue = /** @type {any} */ (issue);
    const title =
      raw_issue && typeof raw_issue.title === 'string' ? raw_issue.title : '';
    if (title.length === 0) {
      return null;
    }
    return {
      title,
      created_at: stampOf(raw_issue && raw_issue.created_at),
      updated_at: stampOf(raw_issue && raw_issue.updated_at),
      labels: workerLabels(raw_issue && raw_issue.labels),
      at: now()
    };
  }

  /**
   * Read one bead's title AND timestamps through `bd show`. The timestamps ride
   * on the same response as the title (UI-d7pw §4.3), so the lane's 생성·수정
   * display costs no extra `bd` call. Every failure mode — non-zero exit,
   * unreadable payload, missing/empty title — collapses to null, because the
   * caller treats them identically: negative-cache and move on.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {Promise<{ record: BeadRecord|null, protocol_failure: boolean }>}
   */
  async function fetchBead(workspace, bead_id) {
    const r = await runJson('show', ['show', bead_id, '--json'], {
      cwd: workspace,
      expected_id: bead_id
    });
    if (!r || r.ok !== true) {
      // A protocol fault is reported separately so the caller does not
      // negative-cache it: suppressing the retry would hide a compatibility
      // break behind a bead that simply "has no title".
      return { record: null, protocol_failure: isBdProtocolFailure(r) };
    }
    return { record: recordFromIssue(r.data), protocol_failure: false };
  }

  /**
   * Keep a timestamp only in the shapes the client can format; anything else
   * becomes null so the row simply renders no meta line.
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
   * One shared lookup for one bead: read the title and apply it to the positive
   * or negative cache. Every failure collapses to null, so this NEVER rejects
   * and an awaiting caller needs no guard of its own.
   *
   * Registration in `in_flight` is SYNCHRONOUS with the call, which is what
   * lets a later caller in the same tick join the run instead of spawning a
   * second `bd`. `gate` serializes a batch: handing it the previous run keeps
   * a wide snapshot from launching one `bd` per bead at once.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {Promise<unknown>} [gate]
   * @returns {Promise<string|null>}
   */
  function lookup(workspace, bead_id, gate) {
    const flight_key = flightKey(workspace, bead_id);
    const generation = generationsFor(workspace).get(bead_id) || 0;
    const running = in_flight.get(flight_key);
    if (running && running.generation === generation) {
      return running.run;
    }
    let run = Promise.resolve(/** @type {string|null} */ (null));
    run = (async () => {
      if (gate) {
        await gate;
      }
      const lane = laneFor(workspace);
      const failed = failedFor(workspace);
      try {
        const fetched = await fetchBead(workspace, bead_id);
        const bead = fetched.record;
        if (bead) {
          if ((generationsFor(workspace).get(bead_id) || 0) === generation) {
            lane.set(bead_id, bead);
            failed.delete(bead_id);
            return bead.title;
          }
          const fresh = lane.get(bead_id);
          return fresh ? fresh.title : null;
        }
        // A refresh that failed must NOT evict what is already cached
        // (UI-d7pw §4.4): dropping a title the reader already sees because `bd`
        // hiccupped is a regression. Only the retry is suppressed — and not
        // even that for a protocol fault, which must stay retryable.
        if (
          !fetched.protocol_failure &&
          (generationsFor(workspace).get(bead_id) || 0) === generation
        ) {
          failed.set(bead_id, now() + negative_ttl_ms);
        }
        log('no title for %s in %s', bead_id, workspace);
        const stale = lane.get(bead_id);
        return stale ? stale.title : null;
      } catch (err) {
        if ((generationsFor(workspace).get(bead_id) || 0) === generation) {
          failed.set(bead_id, now() + negative_ttl_ms);
        }
        log('title lookup failed for %s in %s: %o', bead_id, workspace, err);
        const stale = lane.get(bead_id);
        return stale ? stale.title : null;
      } finally {
        if (in_flight.get(flight_key)?.run === run) {
          in_flight.delete(flight_key);
        }
      }
    })();
    in_flight.set(flight_key, { generation, run });
    return run;
  }

  /**
   * @param {string} workspace
   */
  function announceFilled(workspace) {
    if (!onFilled) {
      return;
    }
    try {
      onFilled(keyOf(workspace));
    } catch (err) {
      log('title fill callback failed for %s: %o', workspace, err);
    }
  }

  /**
   * Await a batch of runs, then notify ONCE if anything landed. Fully
   * fail-quiet: a bead that cannot be read is negative-cached by its own run,
   * and never blocks the other ids in the batch or the snapshot that asked.
   *
   * @param {string} workspace
   * @param {Promise<string|null>[]} runs
   */
  async function fill(workspace, runs) {
    const titles = await Promise.all(runs);
    if (titles.some(Boolean)) {
      announceFilled(workspace);
    }
  }

  /**
   * The shared synchronous read behind `titlesFor`/`timesFor` (UI-d7pw §4.4).
   *
   * Three states, deliberately distinguished — collapsing them is what makes
   * "keep serving the old value while it refreshes" and "drop a bead that could
   * not be read" contradict each other:
   *
   * - COLD MISS (no record): omitted from the result, queued for an async fill
   *   whose completion re-fans the snapshot. Unchanged behaviour.
   * - FRESH HIT (within the positive TTL): returned, no work.
   * - EXPIRED HIT (record present, TTL spent): the STALE value is returned AND
   *   one refresh is queued. The snapshot never blocks, and a failed refresh
   *   leaves the stale value in place (see `lookup`).
   *
   * @template T
   * @param {string} workspace
   * @param {string[]} ids
   * @param {(rec: BeadRecord) => T} project
   * @returns {Record<string, T>}
   */
  function collect(workspace, ids, project) {
    /** @type {Record<string, T>} */
    const out = {};
    const lane = laneFor(workspace);
    const failed = failedFor(workspace);
    const at = now();
    /** @type {string[]} */
    const missing = [];
    /** @type {Set<string>} */
    const seen = new Set();
    for (const raw of ids) {
      const bead_id = typeof raw === 'string' ? raw : '';
      if (bead_id.length === 0 || seen.has(bead_id)) {
        continue;
      }
      seen.add(bead_id);
      const hit = lane.get(bead_id);
      if (hit) {
        out[bead_id] = project(hit);
        if (at - hit.at < positive_ttl_ms) {
          continue;
        }
        // Expired: the value above still ships, but a refresh is queued below
        // unless the negative cache or an in-flight run already owns this id.
      }
      const until = failed.get(bead_id);
      if (typeof until === 'number') {
        if (until > at) {
          continue;
        }
        failed.delete(bead_id);
      }
      const running = in_flight.get(flightKey(workspace, bead_id));
      if (
        running &&
        running.generation === (generationsFor(workspace).get(bead_id) || 0)
      ) {
        // Someone else's run already covers this id and will fan out when it
        // lands; joining it here would only duplicate that fanout.
        continue;
      }
      missing.push(bead_id);
    }
    if (missing.length > 0) {
      // Fire-and-forget: the decoration must stay synchronous, and `fill`
      // swallows everything it can fail on. The runs are CHAINED, so the
      // batch still costs one `bd` at a time.
      /** @type {Promise<string|null>[]} */
      const runs = [];
      /** @type {Promise<unknown>|undefined} */
      let gate;
      for (const bead_id of missing) {
        const run = lookup(workspace, bead_id, gate);
        runs.push(run);
        gate = run;
      }
      void fill(workspace, runs);
    }
    return out;
  }

  return {
    /**
     * Register the "new titles landed" callback. The ws layer wires this to a
     * queue fanout, which is the whole delivery path for a title that missed
     * the snapshot that asked for it.
     *
     * @param {((workspace: string) => void)|null} fn
     */
    setOnFilled(fn) {
      onFilled = typeof fn === 'function' ? fn : null;
    },

    /**
     * Cache hits for `ids`, as a plain map. SYNCHRONOUS and side-effect-free
     * from the caller's view: misses are simply absent from the result and are
     * queued for an async fill whose completion re-fans the snapshot.
     *
     * @param {string} workspace
     * @param {string[]} ids
     * @returns {Record<string, string>}
     */
    titlesFor(workspace, ids) {
      return collect(workspace, ids, (rec) => rec.title);
    },

    /**
     * Cache hits for `ids` as `{ created_at, updated_at }`, on exactly the same
     * partiality contract as {@link titlesFor} (UI-d7pw §4.3). Reads the SAME
     * records, so a bead present in one result is present in the other.
     *
     * @param {string} workspace
     * @param {string[]} ids
     * @returns {Record<string, { created_at: number|string|null, updated_at: number|string|null }>}
     */
    timesFor(workspace, ids) {
      return collect(workspace, ids, (rec) => ({
        created_at: rec.created_at,
        updated_at: rec.updated_at
      }));
    },

    /**
     * Cache hits for `ids` as normalized label arrays. Partial like titles and
     * times: an absent key means the client must retain unknown rather than
     * inferring a false scheduling label.
     *
     * @param {string} workspace
     * @param {string[]} ids
     * @returns {Record<string, string[]>}
     */
    labelsFor(workspace, ids) {
      return collect(workspace, ids, (rec) => rec.labels);
    },

    /**
     * Replace one cache entry with a successful mutation readback. Advancing
     * this bead's generation makes any older in-flight `bd show` unable to
     * overwrite authoritative labels that arrived after the mutation.
     *
     * @param {string} workspace
     * @param {unknown} issue
     */
    refreshFromIssue(workspace, issue) {
      const raw_issue = /** @type {any} */ (issue);
      const bead_id =
        raw_issue && typeof raw_issue.id === 'string' ? raw_issue.id : '';
      if (bead_id.length === 0) {
        return;
      }
      const generations = generationsFor(workspace);
      generations.set(bead_id, (generations.get(bead_id) || 0) + 1);
      const lane = laneFor(workspace);
      const failed = failedFor(workspace);
      const record = recordFromIssue(issue);
      if (record) {
        lane.set(bead_id, record);
        failed.delete(bead_id);
        announceFilled(workspace);
        return;
      }
      lane.delete(bead_id);
      failed.delete(bead_id);
    },

    /**
     * Invalidate one bead so the next synchronous projection queues a fresh
     * lookup. An older lookup cannot restore its prior value after this call.
     *
     * @param {string} workspace
     * @param {string} bead_id
     */
    invalidate(workspace, bead_id) {
      const id = typeof bead_id === 'string' ? bead_id : '';
      if (id.length === 0) {
        return;
      }
      const generations = generationsFor(workspace);
      generations.set(id, (generations.get(id) || 0) + 1);
      laneFor(workspace).delete(id);
      failedFor(workspace).delete(id);
    },

    /**
     * The ASYNCHRONOUS counterpart of {@link titlesFor} for a caller that can
     * wait for one title — the worker's Discord push, whose whole point is
     * naming the bead it is about (UI-vb0t §3.3). A miss is filled here and
     * awaited rather than omitted; a negative-cached id answers null without
     * touching `bd` again.
     *
     * Never throws: every failure is null.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {Promise<string|null>}
     */
    async ensureTitle(workspace, bead_id) {
      const id = typeof bead_id === 'string' ? bead_id : '';
      if (id.length === 0) {
        return null;
      }
      const hit = laneFor(workspace).get(id);
      if (hit && now() - hit.at < positive_ttl_ms) {
        return hit.title;
      }
      const failed = failedFor(workspace);
      const until = failed.get(id);
      if (typeof until === 'number') {
        if (until > now()) {
          // Negative-cached. A stale record still beats null for this caller —
          // a push naming the bead by a slightly old title reads better than one
          // naming it by id.
          return hit ? hit.title : null;
        }
        failed.delete(id);
      }
      // EXPIRED HIT awaits the refresh rather than shipping the stale value
      // (UI-d7pw §4.4): this caller has no "next snapshot" to correct it, so
      // stale-while-revalidate does not apply. `lookup` returns the stale title
      // if the refresh fails, so the result is never worse than before.
      // Only the caller that STARTS a run announces its result — a joiner would
      // just repeat the fanout the starter already owes.
      const running = in_flight.get(flightKey(workspace, id));
      const started =
        !running ||
        running.generation !== (generationsFor(workspace).get(id) || 0);
      const title = await lookup(workspace, id);
      if (title && started) {
        // A title this path warmed is a title the next queue snapshot can
        // render, so the fanout is fired here too.
        announceFilled(workspace);
      }
      return title;
    },

    /**
     * Drop every cached title (test hook / restart semantics). The fill
     * callback is WIRING, not state, and survives — it is registered once per
     * instance, so clearing it here would silently kill the refill fanout.
     */
    clear() {
      titles_by_workspace.clear();
      failed_by_workspace.clear();
      generations_by_workspace.clear();
      in_flight.clear();
    }
  };
}
