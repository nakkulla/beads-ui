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
import { runBdJson, unwrapShowJson } from '../bd.js';
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
 * Create a bead title cache. One instance is held process-wide by the worker
 * runtime so every workspace's snapshot decoration shares the fill queue.
 *
 * @param {{ now?: () => number, negative_ttl_ms?: number, runJson?: typeof runBdJson }} [options]
 */
export function createTitleCache(options = {}) {
  const now = options.now || (() => Date.now());
  const negative_ttl_ms =
    typeof options.negative_ttl_ms === 'number'
      ? options.negative_ttl_ms
      : NEGATIVE_TTL_MS;
  const runJson =
    options.runJson ||
    ((args, opts) => runBdJson(args, /** @type {any} */ (opts)));

  /** @type {Map<string, Map<string, string>>} */
  const titles_by_workspace = new Map();
  /** @type {Map<string, Map<string, number>>} */
  const failed_by_workspace = new Map();
  /**
   * Fills currently running, keyed `<workspace>\0<bead>`. A bead already being
   * filled is NOT queued again — the in-flight run's completion callback is
   * what delivers it, so a burst of snapshots collapses to one `bd show`.
   *
   * The value is the run itself, not a mere marker, so an AWAITING caller
   * (`ensureTitle`) can join a run that a synchronous snapshot started
   * (UI-vb0t §3.3).
   *
   * @type {Map<string, Promise<string|null>>}
   */
  const in_flight = new Map();
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
   * @returns {Map<string, string>}
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
   * Read one bead's title through `bd show`. Every failure mode — non-zero
   * exit, unreadable payload, missing/empty title — collapses to null, because
   * the caller treats them identically: negative-cache and move on.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {Promise<string|null>}
   */
  async function fetchTitle(workspace, bead_id) {
    const r = await runJson(['show', bead_id, '--json'], { cwd: workspace });
    if (!r || r.code !== 0) {
      return null;
    }
    const issue = unwrapShowJson(r.stdoutJson);
    const title = issue && typeof issue.title === 'string' ? issue.title : '';
    return title.length > 0 ? title : null;
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
    const running = in_flight.get(flight_key);
    if (running) {
      return running;
    }
    const run = (async () => {
      if (gate) {
        await gate;
      }
      const lane = laneFor(workspace);
      const failed = failedFor(workspace);
      try {
        const title = await fetchTitle(workspace, bead_id);
        if (title) {
          lane.set(bead_id, title);
          failed.delete(bead_id);
          return title;
        }
        failed.set(bead_id, now() + negative_ttl_ms);
        log('no title for %s in %s', bead_id, workspace);
        return null;
      } catch (err) {
        failed.set(bead_id, now() + negative_ttl_ms);
        log('title lookup failed for %s in %s: %o', bead_id, workspace, err);
        return null;
      } finally {
        in_flight.delete(flight_key);
      }
    })();
    in_flight.set(flight_key, run);
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
      /** @type {Record<string, string>} */
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
          out[bead_id] = hit;
          continue;
        }
        const until = failed.get(bead_id);
        if (typeof until === 'number') {
          if (until > at) {
            continue;
          }
          failed.delete(bead_id);
        }
        if (in_flight.has(flightKey(workspace, bead_id))) {
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
      if (hit) {
        return hit;
      }
      const failed = failedFor(workspace);
      const until = failed.get(id);
      if (typeof until === 'number') {
        if (until > now()) {
          return null;
        }
        failed.delete(id);
      }
      // Only the caller that STARTS a run announces its result — a joiner would
      // just repeat the fanout the starter already owes.
      const started = !in_flight.has(flightKey(workspace, id));
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
      in_flight.clear();
    }
  };
}
