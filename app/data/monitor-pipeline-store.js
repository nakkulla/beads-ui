/**
 * Client-side holder for the aggregated monitor pipeline snapshot (UI-nprg).
 *
 * The first push establishes keyed state and a sequence; later patches update
 * those keys. Both assembled arrays retain their identity until content changes.
 *
 * `null` means "nothing received yet", which the monitor renders as its empty
 * state; an empty array means "the server looked and every repo was idle".
 *
 * `workspaces_state` (UI-qrfo §4) is the second half of the same snapshot: one
 * entry per VISIBLE repo — pipeline-empty ones included — carrying the
 * automation flags, slots, CAS `revision` and exec defaults the waiting lane's
 * group headers control. It defaults to an empty array rather than null because
 * a server that does not send it is simply a repo list with no controls, which
 * renders fine (fail-quiet).
 *
 * `external_waits` stays inside its owning workspace row. The store treats it
 * like every other optional projection and never invents queue membership or
 * execution state from it.
 *
 * Each row's `bead_titles` is filled from the last titles its repo carried
 * (UI-uhfj, `bead-title-memory.js`), so a title the server omits for a moment
 * does not turn a card heading into its bead id.
 */
import { createBeadTitleMemory } from './bead-title-memory.js';
import {
  applyPatch as applyKeyedPatch,
  assembleMonitorPipeline,
  canonicalJson,
  splitMonitorPipeline
} from './keyed-patch.js';

/**
 * @returns {{ get: () => Array<Record<string, any>>|null, getWorkspacesState: () => Array<Record<string, any>>, set: (list: Array<Record<string, any>>|null, state?: Array<Record<string, any>>|null, seq?: number) => void, applyPatch: (patch: import('./keyed-patch.js').KeyedPatch & { seq: number }) => boolean, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createMonitorPipelineStore() {
  /** @type {import('./keyed-patch.js').KeyedMap} */
  let keyed = new Map();
  /** @type {number|null} */
  let last_seq = null;
  /** @type {Array<Record<string, any>>|null} */
  let workspaces = null;
  /** @type {Array<Record<string, any>>} */
  let workspaces_state = [];
  let list_canonical = canonicalJson(workspaces);
  let state_canonical = canonicalJson(workspaces_state);
  /** @type {Set<() => void>} */
  const listeners = new Set();
  const known_titles = createBeadTitleMemory();

  /**
   * @param {Array<Record<string, any>>} list
   * @returns {Array<Record<string, any>>}
   */
  function withKnownTitles(list) {
    return list.map((workspace) => {
      const filled = known_titles.fill(
        workspace.root_dir,
        workspace.bead_titles
      );
      return filled ? { ...workspace, bead_titles: filled } : workspace;
    });
  }

  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn();
      } catch {
        /* ignore listener errors */
      }
    }
  }

  /**
   * @param {Array<Record<string, any>>|null} list
   * @param {Array<Record<string, any>>} state
   */
  function adopt(list, state) {
    const next_list_canonical = canonicalJson(list);
    const next_state_canonical = canonicalJson(state);
    const list_changed = list_canonical !== next_list_canonical;
    const state_changed = state_canonical !== next_state_canonical;
    if (list_changed) {
      workspaces = list;
      list_canonical = next_list_canonical;
    }
    if (state_changed) {
      workspaces_state = state;
      state_canonical = next_state_canonical;
    }
    if (list_changed || state_changed) {
      emit();
    }
  }

  function clear() {
    keyed = new Map();
    last_seq = null;
    adopt(null, []);
  }

  return {
    get() {
      return workspaces;
    },
    getWorkspacesState() {
      return workspaces_state;
    },
    /**
     * @param {Array<Record<string, any>>|null} list
     * @param {Array<Record<string, any>>|null} [state]
     * @param {number} [seq]
     */
    set(list, state, seq = 1) {
      keyed = splitMonitorPipeline({
        workspaces: Array.isArray(list) ? list : [],
        workspaces_state: Array.isArray(state) ? state : []
      });
      last_seq = seq;
      const body = assembleMonitorPipeline(keyed);
      adopt(
        Array.isArray(list) ? withKnownTitles(body.workspaces) : null,
        body.workspaces_state
      );
    },
    /** @param {import('./keyed-patch.js').KeyedPatch & { seq: number }} patch */
    applyPatch(patch) {
      if (last_seq === null || patch.seq !== last_seq + 1) {
        clear();
        return false;
      }
      keyed = applyKeyedPatch(keyed, patch);
      last_seq = patch.seq;
      const body = assembleMonitorPipeline(keyed);
      adopt(withKnownTitles(body.workspaces), body.workspaces_state);
      return true;
    },
    clear,
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
