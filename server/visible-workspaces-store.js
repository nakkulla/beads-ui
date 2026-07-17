/**
 * Visible-workspaces store — the durable SERVER-GLOBAL set of workspaces the
 * user has hidden from the picker (spec §6).
 *
 * A HIDDEN set (not a visible set) is persisted so a newly discovered workspace
 * defaults to visible. Unlike the per-workspace queue/ui-order stores this is a
 * single file for the whole server — one hidden set applies to every connected
 * client — so it needs no CAS: every mutation is a single-key add/remove toggle
 * that the process serializes in-memory.
 *
 * Persistence: one `visible-workspaces.json` under `$XDG_STATE_HOME/bdui/` (see
 * state-paths.js). Writes are atomic (temp file + rename) so a crash mid-write
 * never leaves a partial file.
 *
 * @typedef {Object} VisibleWorkspaces
 * @property {string[]} hidden - Absolute (resolved) paths hidden from the picker.
 */
/**
 * @typedef {Object} VisibilityResult
 * @property {boolean} changed - True when the hidden set was actually mutated.
 * @property {string[]} hidden - Current hidden set (snapshot copy).
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { visibleWorkspacesFilePath } from './worker/state-paths.js';

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} raw
 * @returns {VisibleWorkspaces}
 */
function normalize(raw) {
  /** @type {VisibleWorkspaces} */
  const o = { hidden: [] };
  if (!isRecord(raw) || !Array.isArray(raw.hidden)) {
    return o;
  }
  const seen = new Set();
  for (const entry of raw.hidden) {
    if (typeof entry !== 'string' || entry.length === 0) {
      continue;
    }
    const resolved = path.resolve(entry);
    if (!seen.has(resolved)) {
      seen.add(resolved);
      o.hidden.push(resolved);
    }
  }
  return o;
}

/**
 * Create a visible-workspaces store. A single instance is shared server-wide so
 * every connection observes one coherent in-memory hidden set.
 *
 * @param {{ filePath?: () => string, fs?: typeof import('node:fs') }} [options]
 */
export function createVisibleWorkspacesStore(options = {}) {
  const filePath = options.filePath || visibleWorkspacesFilePath;
  const fs = options.fs || nodeFs;

  /** @type {VisibleWorkspaces | null} */
  let cache = null;

  /**
   * Cold-load the hidden set from disk (once per process). Subsequent calls
   * return the cached in-memory state.
   *
   * @returns {VisibleWorkspaces}
   */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    let o = { hidden: /** @type {string[]} */ ([]) };
    try {
      const raw = fs.readFileSync(filePath(), 'utf8');
      o = normalize(JSON.parse(raw));
    } catch {
      o = { hidden: [] };
    }
    cache = o;
    return o;
  }

  /**
   * Atomically persist the hidden set (temp file + rename).
   *
   * @param {VisibleWorkspaces} o
   */
  function persist(o) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(o, null, 2));
    fs.renameSync(tmp, file);
  }

  return {
    /**
     * Current hidden set (loads on first access).
     *
     * @returns {string[]}
     */
    listHidden() {
      return [...ensureLoaded().hidden];
    },

    /**
     * Toggle a workspace's visibility. Idempotent: hiding an already-hidden path
     * (or showing an already-visible one) is a no-op that persists nothing and
     * reports `changed: false`. A successful toggle is persisted atomically and
     * only then committed to the in-memory cache.
     *
     * @param {string} workspace_path - Absolute workspace path.
     * @param {boolean} visible - True to show (remove from hidden), false to hide.
     * @returns {VisibilityResult}
     */
    setVisibility(workspace_path, visible) {
      const resolved = path.resolve(String(workspace_path || ''));
      const cur = ensureLoaded();
      const set = new Set(cur.hidden);
      const was_hidden = set.has(resolved);

      let changed = false;
      if (visible) {
        if (was_hidden) {
          set.delete(resolved);
          changed = true;
        }
      } else if (!was_hidden) {
        set.add(resolved);
        changed = true;
      }

      if (!changed) {
        return { changed: false, hidden: [...cur.hidden] };
      }

      /** @type {VisibleWorkspaces} */
      const next = { hidden: [...set] };
      persist(next);
      cache = next;
      return { changed: true, hidden: [...next.hidden] };
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk).
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}
