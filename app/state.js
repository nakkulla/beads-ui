/**
 * Minimal app state store with subscription.
 */
import { debug } from './utils/logging.js';

/**
 * @typedef {'all'|'open'|'in_progress'|'resolved'|'closed'|'ready'|string[]} StatusFilter
 */

/**
 * @typedef {{ status: StatusFilter, search: string, type: string }} Filters
 */

/**
 * @typedef {'issues'|'epics'|'board'} ViewName
 */

/**
 * @typedef {'today'|'3'|'7'} ClosedFilter
 */

/**
 * @typedef {{ closed_filter: ClosedFilter }} BoardState
 */

/**
 * @typedef {Object} WorkspaceInfo
 * @property {string} path - Full path to workspace
 * @property {string} database - Path to the database file
 * @property {'dolt'|'sqlite'} [backend] - Workspace backend type
 * @property {boolean} [can_sync] - Whether Dolt sync is supported
 * @property {number} [pid] - Process ID of the daemon
 * @property {string} [version] - Version of beads
 */

/**
 * @typedef {'off'|'30s'|'60s'} AutoSyncMode
 */

/**
 * @typedef {{ is_syncing: boolean, auto_sync_mode: AutoSyncMode }} SyncState
 */

/**
 * @typedef {Object} WorkspaceState
 * @property {WorkspaceInfo | null} current - Currently active workspace
 * @property {WorkspaceInfo[]} available - All available workspaces
 */

/**
 * @typedef {{ selected_id: string | null, view: ViewName, filters: Filters, board: BoardState, workspace: WorkspaceState, sync: SyncState }} AppState
 */

/**
 * Create a simple store for application state.
 *
 * @param {Partial<AppState>} [initial]
 * @returns {{ getState: () => AppState, setState: (patch: { selected_id?: string | null, filters?: Partial<Filters>, board?: Partial<BoardState>, workspace?: Partial<WorkspaceState>, sync?: Partial<SyncState> }) => void, subscribe: (fn: (s: AppState) => void) => () => void }}
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
          : 'today'
    },
    workspace: {
      current: initial.workspace?.current ?? null,
      available: initial.workspace?.available ?? []
    },
    sync: {
      is_syncing: initial.sync?.is_syncing ?? false,
      auto_sync_mode:
        initial.sync?.auto_sync_mode === '30s' ||
        initial.sync?.auto_sync_mode === '60s'
          ? initial.sync.auto_sync_mode
          : 'off'
    }
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
     * @param {{ selected_id?: string | null, filters?: Partial<Filters>, board?: Partial<BoardState>, workspace?: Partial<WorkspaceState>, sync?: Partial<SyncState> }} patch
     */
    setState(patch) {
      /** @type {AppState} */
      const next = {
        ...state,
        ...patch,
        filters: { ...state.filters, ...(patch.filters || {}) },
        board: { ...state.board, ...(patch.board || {}) },
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
        sync: {
          ...state.sync,
          ...(patch.sync || {})
        }
      };
      // Avoid emitting if nothing changed (shallow compare)
      const next_available_key = next.workspace.available
        .map(
          (ws) =>
            `${ws.path}|${ws.database}|${ws.backend || ''}|${ws.can_sync === true ? '1' : '0'}`
        )
        .join('||');
      const current_available_key = state.workspace.available
        .map(
          (ws) =>
            `${ws.path}|${ws.database}|${ws.backend || ''}|${ws.can_sync === true ? '1' : '0'}`
        )
        .join('||');
      const workspace_changed =
        next.workspace.current?.path !== state.workspace.current?.path ||
        next.workspace.current?.database !==
          state.workspace.current?.database ||
        next.workspace.current?.backend !== state.workspace.current?.backend ||
        next.workspace.current?.can_sync !==
          state.workspace.current?.can_sync ||
        next_available_key !== current_available_key;
      const sync_changed =
        next.sync.is_syncing !== state.sync.is_syncing ||
        next.sync.auto_sync_mode !== state.sync.auto_sync_mode;
      if (
        next.selected_id === state.selected_id &&
        next.view === state.view &&
        next.filters.status === state.filters.status &&
        next.filters.search === state.filters.search &&
        next.filters.type === state.filters.type &&
        next.board.closed_filter === state.board.closed_filter &&
        !workspace_changed &&
        !sync_changed
      ) {
        return;
      }
      state = next;
      log('state change %o', {
        selected_id: state.selected_id,
        view: state.view,
        filters: state.filters,
        board: state.board,
        workspace: state.workspace.current?.path,
        sync: state.sync
      });
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
