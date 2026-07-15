/**
 * List selectors utility: compose subscription membership with issues entities
 * and apply view-specific sorting. Provides a lightweight `subscribe` that
 * triggers once per issues envelope to let views re-render.
 */
/**
 * @typedef {{ id: string, title?: string, status?: 'open'|'in_progress'|'deferred'|'resolved'|'closed', priority?: number, issue_type?: string, created_at?: number | string, updated_at?: number, closed_at?: number }} IssueLite
 */
import { cmpClosedDesc, cmpCreatedDescThenPriority } from './sort.js';

/**
 * Factory for list selectors.
 *
 * Source of truth is per-subscription stores providing snapshots for a given
 * client id. Central issues store fallback has been removed.
 *
 * @param {{ snapshotFor?: (client_id: string) => IssueLite[], subscribe?: (fn: () => void) => () => void }} [issue_stores]
 */
export function createListSelectors(issue_stores = undefined) {
  // Sorting comparators are centralized in app/data/sort.js

  /**
   * Get entities for a Board column with column-specific sort.
   *
   * @param {string} client_id
   * @param {'ready'|'blocked'|'in_progress'|'deferred'|'resolved'|'closed'} mode
   * @returns {IssueLite[]}
   */
  function selectBoardColumn(client_id, mode) {
    const arr =
      issue_stores && issue_stores.snapshotFor
        ? issue_stores.snapshotFor(client_id).slice()
        : [];
    if (mode === 'in_progress' || mode === 'resolved') {
      arr.sort(cmpCreatedDescThenPriority);
    } else if (mode === 'closed') {
      arr.sort(cmpClosedDesc);
    } else {
      // All non-closed board modes share the latest-first sort contract.
      arr.sort(cmpCreatedDescThenPriority);
    }
    return arr;
  }

  /**
   * Subscribe for re-render; triggers once per issues envelope.
   *
   * @param {() => void} fn
   * @returns {() => void}
   */
  function subscribe(fn) {
    if (issue_stores && typeof issue_stores.subscribe === 'function') {
      return issue_stores.subscribe(fn);
    }
    return () => {};
  }

  return {
    selectBoardColumn,
    subscribe
  };
}
