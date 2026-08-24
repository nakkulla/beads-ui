/**
 * List selectors utility: compose subscription membership with issues entities
 * and apply view-specific sorting. Provides a lightweight `subscribe` that
 * triggers once per issues envelope to let views re-render.
 */
/**
 * @typedef {{ id: string, title?: string, status?: 'open'|'in_progress'|'deferred'|'resolved'|'closed', priority?: number, issue_type?: string, created_at?: number | string, updated_at?: number, closed_at?: number, comment_count?: number, from_id?: string }} IssueLite
 */
import {
  cmpClosedDesc,
  cmpCreatedAscThenPriority,
  cmpCreatedDescThenPriority,
  cmpEffectiveRank,
  cmpPriorityThenCreatedDesc,
  cmpUpdatedDesc
} from './sort.js';

/**
 * Board sort modes (UX v3 spec §3). `manual` selects the shared rank map;
 * the rest are pure comparators. Omitting the mode keeps the legacy behaviour
 * (manual rank when an order store is wired) so Worker call sites are
 * unaffected.
 *
 * @typedef {'created_desc'|'created_asc'|'updated_desc'|'priority'|'manual'} BoardSortMode
 */

/**
 * @typedef {{ get: () => ({ revision: number, order: Record<string, number> } | null), subscribe?: (fn: () => void) => () => void }} UiOrderStore
 */

/**
 * Factory for list selectors.
 *
 * Source of truth is per-subscription stores providing snapshots for a given
 * client id. Central issues store fallback has been removed.
 *
 * When a `ui_order_store` is supplied, non-closed columns sort by effective rank
 * (spec §2 — the manual order replaces the priority secondary key); the Closed
 * column always keeps `closed_at desc`. Omitting the store preserves the exact
 * prior behaviour (created-desc-then-priority) so existing call sites compile and
 * sort unchanged. `subscribe` fans out on BOTH issue and order changes so an
 * order push re-renders every subscribed view without per-view wiring.
 *
 * @param {{ snapshotFor?: (client_id: string) => IssueLite[], subscribe?: (fn: () => void) => () => void }} [issue_stores]
 * @param {UiOrderStore} [ui_order_store]
 */
export function createListSelectors(
  issue_stores = undefined,
  ui_order_store = undefined
) {
  // Sorting comparators are centralized in app/data/sort.js

  /**
   * Current order map when a ui-order store is wired, else null (which selects
   * the legacy created-desc-then-priority sort).
   *
   * @returns {Record<string, number> | null}
   */
  function currentOrder() {
    if (!ui_order_store || typeof ui_order_store.get !== 'function') {
      return null;
    }
    const snap = ui_order_store.get();
    return snap && snap.order ? snap.order : {};
  }

  /**
   * Get entities for a Board column with column-specific sort.
   *
   * `sort_mode` (UX v3 spec §3) is Board-only: when omitted the legacy
   * behaviour applies (manual rank when an order store is wired, else
   * created-desc) so Worker call sites keep their manual ordering unchanged.
   * `closed` always sorts by `closed_at desc` regardless of mode.
   *
   * @param {string} client_id
   * @param {'ready'|'blocked'|'in_progress'|'deferred'|'resolved'|'closed'} mode
   * @param {BoardSortMode} [sort_mode]
   * @returns {IssueLite[]}
   */
  function selectBoardColumn(client_id, mode, sort_mode) {
    const arr =
      issue_stores && issue_stores.snapshotFor
        ? issue_stores.snapshotFor(client_id).slice()
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
      case 'manual':
      default: {
        const order = currentOrder();
        if (order) {
          arr.sort(cmpEffectiveRank(order));
        } else {
          // No manual-order store: keep the legacy latest-first sort contract.
          arr.sort(cmpCreatedDescThenPriority);
        }
        return arr;
      }
    }
  }

  /**
   * Subscribe for re-render; triggers once per issues envelope and once per
   * order snapshot.
   *
   * @param {() => void} fn
   * @returns {() => void}
   */
  function subscribe(fn) {
    /** @type {Array<() => void>} */
    const offs = [];
    if (issue_stores && typeof issue_stores.subscribe === 'function') {
      offs.push(issue_stores.subscribe(fn));
    }
    if (ui_order_store && typeof ui_order_store.subscribe === 'function') {
      offs.push(ui_order_store.subscribe(fn));
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
