/**
 * List selectors utility: compose subscription membership with issues entities
 * and apply view-specific sorting. Provides a lightweight `subscribe` that
 * triggers once per issues envelope to let views re-render.
 */
/**
 * @typedef {{ id: string, title?: string, status?: 'open'|'in_progress'|'deferred'|'resolved'|'closed', priority?: number, issue_type?: string, created_at?: number | string, updated_at?: number, started_at?: number | string, closed_at?: number, comment_count?: number, from_id?: string }} IssueLite
 */
import {
  cmpClosedDesc,
  cmpCreatedAscThenPriority,
  cmpCreatedDescThenPriority,
  cmpPriorityThenCreatedDesc,
  cmpUpdatedDesc
} from './sort.js';

/**
 * Column sort modes (UX v3 spec §3). All of them are pure comparators; omitting
 * the mode keeps the default created-desc-then-priority order. The manual rank
 * mode retired with the Board tab and its ui-order channel (UI-p7s2 §7.2).
 *
 * @typedef {'created_desc'|'created_asc'|'updated_desc'|'priority'} ColumnSortMode
 */

/**
 * Factory for list selectors.
 *
 * Source of truth is per-subscription stores providing snapshots for a given
 * client id. Central issues store fallback has been removed.
 *
 * The issue-stores leg only forwards notifications whose subscription id this
 * instance renders. That set is declared explicitly by `options.client_ids`
 * (the Worker console subscribes for re-render without ever calling
 * `selectBoardColumn`, so recording ids at call time would silently drop its
 * updates). Omitting the option keeps the unfiltered legacy behaviour.
 *
 * @param {{ snapshotFor?: (client_id: string) => IssueLite[], subscribe?: (fn: (client_id: string) => void) => () => void }} [issue_stores]
 * @param {{ client_ids?: readonly string[] }} [options]
 */
export function createListSelectors(
  issue_stores = undefined,
  options = undefined
) {
  /** @type {Set<string> | null} */
  const owned_client_ids =
    options && Array.isArray(options.client_ids)
      ? new Set(options.client_ids)
      : null;
  // Sorting comparators are centralized in app/data/sort.js

  /**
   * Get entities for one subscription column with a column-specific sort.
   *
   * `sort_mode` (UX v3 spec §3) defaults to created-desc-then-priority when
   * omitted. `closed` always sorts by `closed_at desc` regardless of mode.
   *
   * @param {string} client_id
   * @param {'ready'|'blocked'|'in_progress'|'deferred'|'resolved'|'closed'} mode
   * @param {ColumnSortMode} [sort_mode]
   * @returns {IssueLite[]}
   */
  function selectBoardColumn(client_id, mode, sort_mode) {
    const arr =
      issue_stores && issue_stores.snapshotFor
        ? issue_stores.snapshotFor(client_id)
        : [];
    if (mode === 'closed') {
      arr.sort(cmpClosedDesc);
      return arr;
    }
    switch (sort_mode) {
      case 'created_desc':
        arr.sort(cmpCreatedDescThenPriority);
        return arr;
      case 'created_asc':
        arr.sort(cmpCreatedAscThenPriority);
        return arr;
      case 'updated_desc':
        arr.sort(cmpUpdatedDesc);
        return arr;
      case 'priority':
        arr.sort(cmpPriorityThenCreatedDesc);
        return arr;
      default:
        arr.sort(cmpCreatedDescThenPriority);
        return arr;
    }
  }

  /**
   * Subscribe for re-render; triggers once per owned issues content change.
   *
   * @param {() => void} fn
   * @returns {() => void}
   */
  function subscribe(fn) {
    /** @type {Array<() => void>} */
    const offs = [];
    if (issue_stores && typeof issue_stores.subscribe === 'function') {
      offs.push(
        issue_stores.subscribe((client_id) => {
          if (owned_client_ids && !owned_client_ids.has(client_id)) {
            return;
          }
          fn();
        })
      );
    }
    return () => {
      for (const off of offs) {
        try {
          off();
        } catch {
          /* ignore unsubscribe errors */
        }
      }
    };
  }

  return {
    selectBoardColumn,
    subscribe
  };
}
