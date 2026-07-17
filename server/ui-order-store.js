/**
 * Manual UI-order store — persistence + revision-CAS concurrency guard.
 *
 * Owns the durable per-workspace MANUAL card ordering (spec §2): a map from
 * bead id to a numeric `rank`. Board columns and the Worker candidate lane sort
 * by this rank so a user's hand-placed order survives reloads and is shared
 * across every client of that workspace. Ordering writes are guarded by an
 * integer `revision` CAS so a stale client's drag can never clobber a newer
 * ordering (mirrors the Worker queue store).
 *
 * Persistence: one `ui-order.json` per workspace under
 * `$XDG_STATE_HOME/bdui/<slug>/` (see state-paths.js). Writes are atomic (temp
 * file + rename) so a crash mid-write never leaves a partial file.
 *
 * @typedef {Object} UiOrder
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {Record<string, number>} order - Bead id → numeric rank.
 */
/**
 * @typedef {Object} UiOrderOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {number} revision - Current revision (new on success, unchanged else).
 * @property {Record<string, number>} order - Current order map (snapshot copy).
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { uiOrderFilePath } from './worker/state-paths.js';

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @returns {UiOrder}
 */
function emptyUiOrder() {
  return { revision: 0, order: {} };
}

/**
 * Deep clone via JSON — order state is plain data, so this is safe and keeps
 * returned snapshots isolated from the in-memory cache.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {unknown} raw
 * @returns {UiOrder}
 */
function normalizeUiOrder(raw) {
  const o = emptyUiOrder();
  if (!isRecord(raw)) {
    return o;
  }
  o.revision =
    typeof raw.revision === 'number' && Number.isFinite(raw.revision)
      ? Math.max(0, Math.floor(raw.revision))
      : 0;
  if (isRecord(raw.order)) {
    for (const [key, value] of Object.entries(raw.order)) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        o.order[key] = value;
      }
    }
  }
  return o;
}

/**
 * An entry is valid when its bead_id is a non-blank string and its rank is a
 * finite number. Invalid entries reject the whole batch (no partial apply).
 *
 * @param {unknown} entry
 * @returns {entry is { bead_id: string, rank: number }}
 */
function isValidEntry(entry) {
  return (
    isRecord(entry) &&
    typeof entry.bead_id === 'string' &&
    entry.bead_id.trim().length > 0 &&
    typeof entry.rank === 'number' &&
    Number.isFinite(entry.rank)
  );
}

/**
 * Create a UI-order store. A single instance is shared server-wide so all
 * connections (and thus all clients dragging concurrently) observe one coherent
 * in-memory revision, making the CAS authoritative in-process.
 *
 * @param {{ filePathFor?: (workspace: string) => string, fs?: typeof import('node:fs') }} [options]
 */
export function createUiOrderStore(options = {}) {
  const filePathFor = options.filePathFor || uiOrderFilePath;
  const fs = options.fs || nodeFs;

  /** @type {Map<string, UiOrder>} */
  const cache = new Map();

  /**
   * @param {string} workspace
   * @returns {string}
   */
  function keyFor(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * Cold-load a workspace order from disk (once per process). Subsequent calls
   * return the cached in-memory order.
   *
   * @param {string} workspace
   * @returns {UiOrder}
   */
  function ensureLoaded(workspace) {
    const key = keyFor(workspace);
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    let o = emptyUiOrder();
    try {
      const raw = fs.readFileSync(filePathFor(workspace), 'utf8');
      o = normalizeUiOrder(JSON.parse(raw));
    } catch {
      o = emptyUiOrder();
    }
    cache.set(key, o);
    return o;
  }

  /**
   * Atomically persist an order for a workspace (temp file + rename).
   *
   * @param {string} workspace
   * @param {UiOrder} o
   */
  function persist(workspace, o) {
    const file = filePathFor(workspace);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(o, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * Build a result carrying the current (unchanged) snapshot fields.
   *
   * @param {UiOrder} cur
   * @param {boolean} conflict
   * @returns {UiOrderOpResult}
   */
  function reject(cur, conflict) {
    return {
      ok: false,
      conflict,
      revision: cur.revision,
      order: { ...cur.order }
    };
  }

  /**
   * Apply a CAS-guarded mutation. Builds the next state on a clone, persists it,
   * and only commits to the cache on a successful write — so a failed write
   * leaves both memory and disk at the prior revision (atomic op).
   *
   * @param {string} workspace
   * @param {number} expected_revision
   * @param {(next: UiOrder) => boolean} mutate - Returns false to reject.
   * @returns {UiOrderOpResult}
   */
  function applyMutation(workspace, expected_revision, mutate) {
    const cur = ensureLoaded(workspace);
    if (expected_revision !== cur.revision) {
      return reject(cur, true);
    }
    const next = clone(cur);
    if (!mutate(next)) {
      return reject(cur, false);
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return {
      ok: true,
      conflict: false,
      revision: next.revision,
      order: { ...next.order }
    };
  }

  /**
   * Apply an unconditional (no-CAS) mutation. Used by close-time pruning, which
   * is not a client drag so it carries no `expected_revision`.
   *
   * @param {string} workspace
   * @param {(next: UiOrder) => boolean} mutate - Returns false for a no-op.
   * @returns {UiOrderOpResult}
   */
  function applyUnconditional(workspace, mutate) {
    const cur = ensureLoaded(workspace);
    const next = clone(cur);
    if (!mutate(next)) {
      return reject(cur, false);
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return {
      ok: true,
      conflict: false,
      revision: next.revision,
      order: { ...next.order }
    };
  }

  return {
    /**
     * Cold-load (and cache) a workspace order.
     *
     * @param {string} workspace
     * @returns {UiOrder}
     */
    load(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Current in-memory snapshot (loads on first access).
     *
     * @param {string} workspace
     * @returns {UiOrder}
     */
    snapshot(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Merge/overwrite the given entries' ranks. CAS-guarded. `entries` are the
     * full set the client wants written (batch renormalization sends the whole
     * list). Any invalid entry rejects the WHOLE batch (no partial apply).
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, entries: Array<{ bead_id: string, rank: number }> }} input
     * @returns {UiOrderOpResult}
     */
    setRanks(workspace, input) {
      const { expected_revision, entries } = input || {};
      return applyMutation(workspace, expected_revision, (next) => {
        if (!Array.isArray(entries)) {
          return false;
        }
        for (const e of entries) {
          if (!isValidEntry(e)) {
            return false;
          }
        }
        for (const e of entries) {
          next.order[e.bead_id] = e.rank;
        }
        return true;
      });
    },

    /**
     * Remove ids from the order (close-time pruning). No CAS. A no-op (none of
     * the ids present) bumps no revision and persists nothing.
     *
     * @param {string} workspace
     * @param {string[]} ids
     * @returns {UiOrderOpResult}
     */
    pruneIds(workspace, ids) {
      return applyUnconditional(workspace, (next) => {
        if (!Array.isArray(ids)) {
          return false;
        }
        let removed = false;
        for (const id of ids) {
          if (
            typeof id === 'string' &&
            Object.prototype.hasOwnProperty.call(next.order, id)
          ) {
            delete next.order[id];
            removed = true;
          }
        }
        return removed;
      });
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk).
     */
    __clearCacheForTest() {
      cache.clear();
    }
  };
}
