/**
 * Shared same-lane manual-reorder controller (spec §2). Extracted so the Board
 * column reorder and the Worker candidate-lane reorder run identical rank math
 * and CAS conventions from one place.
 *
 * Given the dragged bead, the lane's desired FINAL order (dragged already
 * spliced at `insert_index`), and the shared ui-order store, it computes the new
 * effective rank via {@link import('../data/sort.js').computeDropRank}, applies
 * it to the store optimistically, then persists via `ui-order-set`. On a CAS
 * conflict it adopts the server snapshot, recomputes against the fresh order,
 * and retries once.
 */
import { computeDropRank } from '../data/sort.js';

/**
 * @typedef {{ revision: number, order: Record<string, number> }} UiOrderSnapshot
 */

/**
 * @typedef {{ get: () => (UiOrderSnapshot | null), set: (s: UiOrderSnapshot | null) => void, subscribe?: (fn: () => void) => () => void }} UiOrderStore
 */

/**
 * @param {{ transport?: (type: string, payload: unknown) => Promise<any>, uiOrderStore?: UiOrderStore }} deps
 * @returns {{ applyReorder: (issue_id: string, final_list: Array<{ id: string, created_at?: number | string }>, insert_index: number) => Promise<void> }}
 */
export function createReorderController(deps) {
  const transport = deps.transport;
  const uiOrderStore = deps.uiOrderStore;

  /**
   * @param {import('../data/sort.js').DropRankResult} result
   * @param {string} issue_id
   * @returns {Array<{ bead_id: string, rank: number }>}
   */
  function entriesFor(result, issue_id) {
    return 'renormalize' in result
      ? result.renormalize
      : [{ bead_id: issue_id, rank: result.rank }];
  }

  /**
   * @param {UiOrderSnapshot} base
   * @param {Array<{ bead_id: string, rank: number }>} entries
   */
  function optimisticApply(base, entries) {
    const merged = { ...base.order };
    for (const e of entries) {
      merged[e.bead_id] = e.rank;
    }
    if (uiOrderStore) {
      uiOrderStore.set({ revision: base.revision, order: merged });
    }
  }

  /**
   * @param {string} issue_id
   * @param {Array<{ id: string, created_at?: number | string }>} final_list
   * @param {number} insert_index
   */
  async function applyReorder(issue_id, final_list, insert_index) {
    if (!transport || !uiOrderStore) {
      return;
    }
    const base = uiOrderStore.get() || { revision: 0, order: {} };
    const entries = entriesFor(
      computeDropRank(final_list, insert_index, base.order),
      issue_id
    );
    optimisticApply(base, entries);
    const res = await transport('ui-order-set', {
      expected_revision: base.revision,
      entries
    });
    if (res && res.conflict) {
      const adopted = {
        revision: typeof res.revision === 'number' ? res.revision : 0,
        order: res.order || {}
      };
      uiOrderStore.set(adopted);
      const entries2 = entriesFor(
        computeDropRank(final_list, insert_index, adopted.order),
        issue_id
      );
      optimisticApply(adopted, entries2);
      const res2 = await transport('ui-order-set', {
        expected_revision: adopted.revision,
        entries: entries2
      });
      if (res2 && res2.applied) {
        uiOrderStore.set({
          revision: typeof res2.revision === 'number' ? res2.revision : 0,
          order: res2.order || {}
        });
      }
    } else if (res && res.applied) {
      uiOrderStore.set({
        revision: typeof res.revision === 'number' ? res.revision : 0,
        order: res.order || {}
      });
    }
  }

  return { applyReorder };
}
