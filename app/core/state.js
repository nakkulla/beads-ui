/**
 * Minimal app state store with subscription, plus the shell's persisted
 * preferences (UI-dbn6 §3.2·§3.3).
 *
 * The DISPLAY scope (`beads-ui.scope`: `*` or a root_dir) and the CONNECTED
 * workspace (`beads-ui.workspace`: always a real root_dir) are separate facts.
 * The "hidden or unregistered → remove" rule applies to the connected
 * workspace alone; a scope naming a repo that is gone simply reads as 전체.
 */
import { debug } from '../utils/logging.js';

/**
 * @typedef {'all'|'open'|'in_progress'|'deferred'|'resolved'|'closed'|'ready'|string[]} StatusFilter
 */

/**
 * @typedef {{ status: StatusFilter, search: string, type: string }} Filters
 */

/**
 * The screen on display. `pipeline`·`compare`·`adr` are the shell's screens;
 * the legacy names remain in the union only for bridged components that still
 * type against them until Phase 4 removes those components.
 *
 * @typedef {'pipeline'|'compare'|'adr'|'worker'|'monitor'} ViewName
 */

/**
 * @typedef {{ selected_parent_id: string | null, show_closed_children: string[] }} WorkerState
 */

/**
 * @typedef {{ default_workspace: string | null }} WorkspaceConfig
 */

/**
 * @typedef {{ workspace_config?: WorkspaceConfig }} AppConfig
 */

/**
 * @typedef {Object} WorkspaceInfo
 * @property {string} path - Full path to workspace
 * @property {string} database - Path to the database file
 * @property {number} [pid] - Process ID of the daemon
 * @property {string} [version] - Version of beads
 */

/**
 * @typedef {Object} WorkspaceState
 * @property {WorkspaceInfo | null} current - Currently active workspace
 * @property {WorkspaceInfo[]} available - All available workspaces
 * @property {string[]} hidden - Absolute paths hidden from the picker (spec §6)
 */

/**
 * @typedef {{ selected_id: string | null, detail_root: string | null, scope: string, view: ViewName, filters: Filters, worker: WorkerState, workspace: WorkspaceState, config: { workspace_config: WorkspaceConfig } }} AppState
 * @typedef {{ selected_id?: string | null, detail_root?: string | null, scope?: string, view?: ViewName, filters?: Partial<Filters>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }} AppStatePatch
 */

export const SCOPE_KEY = 'beads-ui.scope';
export const WORKSPACE_KEY = 'beads-ui.workspace';
export const ALL_SCOPE = '*';

const DEFAULT_CONFIG = Object.freeze({
  workspace_config: {
    default_workspace: null
  }
});

/**
 * @param {AppConfig | undefined} input
 * @returns {{ workspace_config: WorkspaceConfig }}
 */
function normalizeConfig(input) {
  const default_workspace =
    typeof input?.workspace_config?.default_workspace === 'string' &&
    input.workspace_config.default_workspace.length > 0
      ? input.workspace_config.default_workspace
      : DEFAULT_CONFIG.workspace_config.default_workspace;

  return {
    workspace_config: {
      default_workspace
    }
  };
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
function sameList(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Create a simple store for application state.
 *
 * @param {AppStatePatch} [initial]
 * @returns {{ getState: () => AppState, setState: (patch: AppStatePatch) => void, subscribe: (fn: (s: AppState) => void) => () => void }}
 */
export function createStore(initial = {}) {
  const log = debug('state');
  /** @type {AppState} */
  let state = {
    selected_id: initial.selected_id ?? null,
    detail_root: initial.detail_root ?? null,
    scope: initial.scope ?? ALL_SCOPE,
    view: initial.view ?? 'pipeline',
    filters: {
      status: initial.filters?.status ?? 'all',
      search: initial.filters?.search ?? '',
      type:
        typeof initial.filters?.type === 'string' ? initial.filters?.type : ''
    },
    worker: {
      selected_parent_id: initial.worker?.selected_parent_id ?? null,
      show_closed_children: Array.isArray(initial.worker?.show_closed_children)
        ? initial.worker.show_closed_children
        : []
    },
    workspace: {
      current: initial.workspace?.current ?? null,
      available: initial.workspace?.available ?? [],
      hidden: initial.workspace?.hidden ?? []
    },
    config: normalizeConfig(initial.config)
  };

  /** @type {Set<(s: AppState) => void>} */
  const subs = new Set();

  function emit() {
    for (const fn of Array.from(subs)) {
      try {
        fn(state);
      } catch {
        // ignore
      }
    }
  }

  return {
    getState() {
      return state;
    },
    /**
     * Update state. Nested filters can be partial.
     *
     * @param {AppStatePatch} patch
     */
    setState(patch) {
      /** @type {AppState} */
      const next = {
        ...state,
        ...patch,
        filters: { ...state.filters, ...(patch.filters || {}) },
        worker: { ...state.worker, ...(patch.worker || {}) },
        workspace: {
          current:
            patch.workspace?.current !== undefined
              ? patch.workspace.current
              : state.workspace.current,
          available:
            patch.workspace?.available !== undefined
              ? patch.workspace.available
              : state.workspace.available,
          hidden:
            patch.workspace?.hidden !== undefined
              ? patch.workspace.hidden
              : state.workspace.hidden
        },
        config:
          patch.config !== undefined
            ? normalizeConfig(patch.config)
            : state.config
      };
      const workspace_changed =
        next.workspace.current?.path !== state.workspace.current?.path ||
        next.workspace.available.length !== state.workspace.available.length ||
        !sameList(next.workspace.hidden, state.workspace.hidden);
      const config_changed =
        next.config.workspace_config.default_workspace !==
        state.config.workspace_config.default_workspace;
      if (
        next.selected_id === state.selected_id &&
        next.detail_root === state.detail_root &&
        next.scope === state.scope &&
        next.view === state.view &&
        next.filters.status === state.filters.status &&
        next.filters.search === state.filters.search &&
        next.filters.type === state.filters.type &&
        next.worker.selected_parent_id === state.worker.selected_parent_id &&
        sameList(
          next.worker.show_closed_children,
          state.worker.show_closed_children
        ) &&
        !workspace_changed &&
        !config_changed
      ) {
        return;
      }
      state = next;
      log('state change %o', {
        selected_id: state.selected_id,
        detail_root: state.detail_root,
        scope: state.scope,
        view: state.view,
        workspace: state.workspace.current?.path
      });
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}

/**
 * @typedef {{ getItem: (key: string) => string|null, setItem: (key: string, value: string) => void, removeItem: (key: string) => void }} KeyStorage
 */

/**
 * @param {KeyStorage|null|undefined} storage
 * @param {string} key
 * @returns {string|null}
 */
function readKey(storage, key) {
  try {
    return storage ? storage.getItem(key) : null;
  } catch {
    return null;
  }
}

/**
 * @param {KeyStorage|null|undefined} storage
 * @param {string} key
 * @param {string|null} value - `null` removes the key.
 */
function writeKey(storage, key, value) {
  try {
    if (!storage) {
      return;
    }
    if (value === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, value);
    }
  } catch {
    // storage denial must not break the shell
  }
}

/**
 * @param {KeyStorage|null|undefined} storage
 * @returns {string} `*` or a root_dir.
 */
export function readScope(storage) {
  const raw = readKey(storage, SCOPE_KEY);
  return raw && raw.length > 0 ? raw : ALL_SCOPE;
}

/**
 * @param {KeyStorage|null|undefined} storage
 * @param {string} scope
 */
export function writeScope(storage, scope) {
  writeKey(storage, SCOPE_KEY, scope || ALL_SCOPE);
}

/**
 * @param {KeyStorage|null|undefined} storage
 * @returns {string|null}
 */
export function readSavedWorkspace(storage) {
  const raw = readKey(storage, WORKSPACE_KEY);
  return raw && raw.length > 0 ? raw : null;
}

/**
 * @param {KeyStorage|null|undefined} storage
 * @param {string} root_dir
 */
export function writeSavedWorkspace(storage, root_dir) {
  writeKey(storage, WORKSPACE_KEY, root_dir);
}

/**
 * The saved connected workspace when it is still registered and visible;
 * otherwise the key is removed and `null` returned (spec
 * 2026-07-20-hidden-workspace-restore-guard). The scope key is never touched.
 *
 * @param {KeyStorage|null|undefined} storage
 * @param {string[]} available_paths
 * @param {string[]} hidden
 * @returns {string|null}
 */
export function pruneSavedWorkspace(storage, available_paths, hidden) {
  const saved = readSavedWorkspace(storage);
  if (!saved) {
    return null;
  }
  if (!available_paths.includes(saved) || hidden.includes(saved)) {
    writeKey(storage, WORKSPACE_KEY, null);
    return null;
  }
  return saved;
}

/** Lane collapse keys, one per scope kind (the old Monitor / Worker keys). */
const LANE_COLLAPSE_KEYS = {
  all: 'beads-ui.monitor.lane-collapsed',
  repo: 'beads-ui.worker.lane-collapsed'
};
const SECTIONS_KEY = 'beads-ui.monitor.sections';
const CANDIDATE_FILTER_KEY = 'beads-ui.monitor.candidate-filter';
const CANDIDATE_SORT_KEY = 'bdui.worker.candidate_sort';
const RUNNING_SORT_KEY = 'bdui.monitor.running_sort';
const DONE_RANGE_KEY = 'bdui.worker.done-range';
const ONLY_SHOWN_KEY = 'beads-ui.pipeline.only-shown';
const MOBILE_LANE_KEY = 'beads-ui.pipeline.mobile-lane';

/**
 * @param {string|null} raw
 * @returns {any}
 */
function parseJson(raw) {
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * The pipeline screen's persisted view preferences. Keys continue the old
 * Worker/Monitor keys so a user's stored choices carry over.
 *
 * @param {KeyStorage|null|undefined} storage
 */
export function createPipelinePrefs(storage) {
  /**
   * @param {'all'|'repo'} kind
   * @returns {{ lanes: Record<string, boolean>, areas: Record<string, boolean> }}
   */
  function collapseState(kind) {
    const parsed = parseJson(readKey(storage, LANE_COLLAPSE_KEYS[kind]));
    if (parsed && typeof parsed === 'object' && parsed.lanes) {
      return {
        lanes: { ...parsed.lanes },
        areas: { ...(parsed.areas || {}) }
      };
    }
    return { lanes: { done: true }, areas: {} };
  }

  /** @returns {Record<string, Record<string, boolean>>} */
  function sections() {
    const parsed = parseJson(readKey(storage, SECTIONS_KEY));
    return parsed && typeof parsed === 'object' ? parsed : {};
  }

  return {
    /**
     * @param {'all'|'repo'} kind
     * @param {string} lane
     * @returns {boolean}
     */
    laneCollapsed(kind, lane) {
      return collapseState(kind).lanes[lane] === true;
    },
    /**
     * @param {'all'|'repo'} kind
     * @param {string} lane
     * @param {boolean} value
     */
    setLaneCollapsed(kind, lane, value) {
      const next = collapseState(kind);
      next.lanes[lane] = value;
      writeKey(storage, LANE_COLLAPSE_KEYS[kind], JSON.stringify(next));
    },
    /**
     * @param {'all'|'repo'} kind
     * @param {'parallel'|'serial'} area
     * @returns {boolean}
     */
    areaCollapsed(kind, area) {
      return collapseState(kind).areas[area] === true;
    },
    /**
     * @param {'all'|'repo'} kind
     * @param {'parallel'|'serial'} area
     * @param {boolean} value
     */
    setAreaCollapsed(kind, area, value) {
      const next = collapseState(kind);
      next.areas[area] = value;
      writeKey(storage, LANE_COLLAPSE_KEYS[kind], JSON.stringify(next));
    },
    /**
     * @param {string} root_dir
     * @param {string} lane - `runnable` for the candidate lane, else the lane id.
     * @returns {boolean}
     */
    bundleCollapsed(root_dir, lane) {
      return sections()[root_dir]?.[lane] === true;
    },
    /**
     * @param {string} root_dir
     * @param {string} lane
     * @param {boolean} value
     */
    setBundleCollapsed(root_dir, lane, value) {
      const all = sections();
      all[root_dir] = { ...(all[root_dir] || {}), [lane]: value };
      writeKey(storage, SECTIONS_KEY, JSON.stringify(all));
    },
    /** @returns {any} Raw stored candidate filter (normalized by the caller). */
    candidateFilter() {
      return parseJson(readKey(storage, CANDIDATE_FILTER_KEY));
    },
    /** @param {Record<string, unknown>} filter */
    setCandidateFilter(filter) {
      writeKey(storage, CANDIDATE_FILTER_KEY, JSON.stringify(filter));
    },
    /** @returns {string} A candidate sort preset id. */
    candidateSort() {
      const raw = readKey(storage, CANDIDATE_SORT_KEY);
      const parsed = parseJson(raw);
      const preset =
        parsed && typeof parsed === 'object' ? parsed.preset : raw || '';
      return typeof preset === 'string' ? preset : '';
    },
    /** @param {string} preset */
    setCandidateSort(preset) {
      writeKey(storage, CANDIDATE_SORT_KEY, JSON.stringify({ preset }));
    },
    /** @returns {'started'|'elapsed'} */
    runningSort() {
      return readKey(storage, RUNNING_SORT_KEY) === 'elapsed'
        ? 'elapsed'
        : 'started';
    },
    /** @param {'started'|'elapsed'} value */
    setRunningSort(value) {
      writeKey(storage, RUNNING_SORT_KEY, value);
    },
    /** @returns {string|null} Raw stored done range. */
    doneRange() {
      return readKey(storage, DONE_RANGE_KEY);
    },
    /** @param {string} value */
    setDoneRange(value) {
      writeKey(storage, DONE_RANGE_KEY, value);
    },
    /** @returns {boolean} */
    onlyShown() {
      return readKey(storage, ONLY_SHOWN_KEY) === 'true';
    },
    /** @param {boolean} value */
    setOnlyShown(value) {
      writeKey(storage, ONLY_SHOWN_KEY, value ? 'true' : 'false');
    },
    /** @returns {string|null} */
    mobileLane() {
      return readKey(storage, MOBILE_LANE_KEY);
    },
    /** @param {string} lane */
    setMobileLane(lane) {
      writeKey(storage, MOBILE_LANE_KEY, lane);
    }
  };
}
