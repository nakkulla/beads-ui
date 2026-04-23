/**
 * Minimal app state store with subscription.
 */
import { debug } from './utils/logging.js';

/**
 * @typedef {'all'|'open'|'in_progress'|'deferred'|'resolved'|'closed'|'ready'|string[]} StatusFilter
 */

/**
 * @typedef {{ status: StatusFilter, search: string, type: string }} Filters
 */

/**
 * @typedef {'issues'|'epics'|'board'|'worker'} ViewName
 */

/**
 * @typedef {'today'|'3'|'7'} ClosedFilter
 */

/**
 * @typedef {{ closed_filter: ClosedFilter, show_deferred_column: boolean }} BoardState
 */

/**
 * @typedef {{ selected_parent_id: string | null, show_closed_children: string[] }} WorkerState
 */

/**
 * @typedef {{ visible_prefixes: string[] }} LabelDisplayPolicy
 */

/**
 * @typedef {{ default_workspace: string | null }} WorkspaceConfig
 */

/**
 * @typedef {{ label_display_policy?: LabelDisplayPolicy, workspace_config?: WorkspaceConfig }} AppConfig
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
 */

/**
 * @typedef {{ selected_id: string | null, view: ViewName, filters: Filters, board: BoardState, worker: WorkerState, workspace: WorkspaceState, config: { label_display_policy: LabelDisplayPolicy, workspace_config: WorkspaceConfig } }} AppState
 */

const DEFAULT_CONFIG = Object.freeze({
  label_display_policy: {
    visible_prefixes: ['has:', 'reviewed:']
  },
  workspace_config: {
    default_workspace: null
  }
});

/**
 * @param {AppConfig | undefined} input
 * @returns {{ label_display_policy: LabelDisplayPolicy, workspace_config: WorkspaceConfig }}
 */
function normalizeConfig(input) {
  const prefixes = input?.label_display_policy?.visible_prefixes;
  const default_workspace =
    typeof input?.workspace_config?.default_workspace === 'string' &&
    input.workspace_config.default_workspace.length > 0
      ? input.workspace_config.default_workspace
      : null;

  if (!Array.isArray(prefixes)) {
    return {
      label_display_policy: {
        visible_prefixes:
          DEFAULT_CONFIG.label_display_policy.visible_prefixes.slice()
      },
      workspace_config: {
        default_workspace
      }
    };
  }

  return {
    label_display_policy: {
      visible_prefixes: prefixes.filter((value) => typeof value === 'string')
    },
    workspace_config: {
      default_workspace
    }
  };
}

/**
 * Create a simple store for application state.
 *
 * @param {{ selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }} [initial]
 * @returns {{ getState: () => AppState, setState: (patch: { selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }) => void, subscribe: (fn: (s: AppState) => void) => () => void }}
 */
export function createStore(initial = {}) {
  const log = debug('state');
  /** @type {AppState} */
  let state = {
    selected_id: initial.selected_id ?? null,
    view: initial.view ?? 'issues',
    filters: {
      status: initial.filters?.status ?? 'all',
      search: initial.filters?.search ?? '',
      type:
        typeof initial.filters?.type === 'string' ? initial.filters?.type : ''
    },
    board: {
      closed_filter:
        initial.board?.closed_filter === '3' ||
        initial.board?.closed_filter === '7' ||
        initial.board?.closed_filter === 'today'
          ? initial.board?.closed_filter
          : 'today',
      show_deferred_column: initial.board?.show_deferred_column === true
    },
    worker: {
      selected_parent_id: initial.worker?.selected_parent_id ?? null,
      show_closed_children: Array.isArray(initial.worker?.show_closed_children)
        ? initial.worker.show_closed_children
        : []
    },
    workspace: {
      current: initial.workspace?.current ?? null,
      available: initial.workspace?.available ?? []
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
     * @param {{ selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }} patch
     */
    setState(patch) {
      /** @type {AppState} */
      const next = {
        ...state,
        ...patch,
        filters: { ...state.filters, ...(patch.filters || {}) },
        board: { ...state.board, ...(patch.board || {}) },
        worker: { ...state.worker, ...(patch.worker || {}) },
        workspace: {
          current:
            patch.workspace?.current !== undefined
              ? patch.workspace.current
              : state.workspace.current,
          available:
            patch.workspace?.available !== undefined
              ? patch.workspace.available
              : state.workspace.available
        },
        config:
          patch.config !== undefined
            ? normalizeConfig(patch.config)
            : state.config
      };
      const workspace_changed =
        next.workspace.current?.path !== state.workspace.current?.path ||
        next.workspace.available.length !== state.workspace.available.length;
      const config_changed =
        next.config.label_display_policy.visible_prefixes.length !==
          state.config.label_display_policy.visible_prefixes.length ||
        next.config.label_display_policy.visible_prefixes.some(
          (prefix, index) =>
            prefix !== state.config.label_display_policy.visible_prefixes[index]
        ) ||
        next.config.workspace_config.default_workspace !==
          state.config.workspace_config.default_workspace;
      if (
        next.selected_id === state.selected_id &&
        next.view === state.view &&
        next.filters.status === state.filters.status &&
        next.filters.search === state.filters.search &&
        next.filters.type === state.filters.type &&
        next.board.closed_filter === state.board.closed_filter &&
        next.board.show_deferred_column === state.board.show_deferred_column &&
        next.worker.selected_parent_id === state.worker.selected_parent_id &&
        next.worker.show_closed_children.length ===
          state.worker.show_closed_children.length &&
        next.worker.show_closed_children.every(
          (id, index) => id === state.worker.show_closed_children[index]
        ) &&
        !workspace_changed &&
        !config_changed
      ) {
        return;
      }
      state = next;
      log('state change %o', {
        selected_id: state.selected_id,
        view: state.view,
        filters: state.filters,
        board: state.board,
        worker: state.worker,
        workspace: state.workspace.current?.path,
        config: {
          visible_prefixes: state.config.label_display_policy.visible_prefixes,
          default_workspace: state.config.workspace_config.default_workspace
        }
      });
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
