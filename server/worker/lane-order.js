/**
 * The ONE ordering rule every lane correction uses.
 *
 * Lives apart from `queue-store.js` because both sides of the wire need it:
 * the worker queue corrects 레포 직렬 레인 order here, and the Monitor's
 * 연결 레인 자동 교정 (UI-jaua §6.1) runs the SAME function in the browser.
 * `queue-store.js` reaches for `node:fs`, so a browser bundle cannot import it
 * — and a second, cross-lane-only sort would be exactly the divergence UI-jaua
 * §4 forbids ("정렬 규칙은 하나다").
 */

/**
 * Stable topological correction of one serial lane's order under `blocks`
 * edges (UI-04vo §3). Pure and deterministic: recomputable from any snapshot,
 * never stored. The user order is preserved as far as the edges allow — the
 * next emitted bead is always the earliest user-ordered bead whose in-lane
 * blockers have all been emitted. Edges naming ids outside `order` carry no
 * ordering signal. A cycle disables correction entirely (fail-visible at the
 * caller): the input order returns unchanged with `cycle: true`.
 *
 * @param {string[]} order - User-ordered bead ids of one lane.
 * @param {{ blocker: string, blockee: string }[]} edges - Direct blocks edges.
 * @returns {{ order: string[], corrections: { bead_id: string, after: string }[], cycle: boolean }}
 */
export function orderLaneByBlocks(order, edges) {
  const index_of = new Map(order.map((id, index) => [id, index]));
  /** @type {Map<string, Set<string>>} */
  const blockers_of = new Map(order.map((id) => [id, new Set()]));
  for (const edge of edges) {
    if (
      edge.blocker !== edge.blockee &&
      index_of.has(edge.blocker) &&
      index_of.has(edge.blockee)
    ) {
      /** @type {Set<string>} */ (blockers_of.get(edge.blockee)).add(
        edge.blocker
      );
    }
  }
  const emitted = new Set();
  /** @type {string[]} */
  const sorted = [];
  while (sorted.length < order.length) {
    const next = order.find((id) => {
      if (emitted.has(id)) {
        return false;
      }
      for (const blocker of /** @type {Set<string>} */ (blockers_of.get(id))) {
        if (!emitted.has(blocker)) {
          return false;
        }
      }
      return true;
    });
    if (next === undefined) {
      return { order: [...order], corrections: [], cycle: true };
    }
    emitted.add(next);
    sorted.push(next);
  }
  /** @type {{ bead_id: string, after: string }[]} */
  const corrections = [];
  const sorted_index = new Map(sorted.map((id, index) => [id, index]));
  for (const id of sorted) {
    let moved_after = null;
    for (const blocker of /** @type {Set<string>} */ (blockers_of.get(id))) {
      const was_before =
        Number(index_of.get(id)) < Number(index_of.get(blocker));
      const now_after =
        Number(sorted_index.get(id)) > Number(sorted_index.get(blocker));
      if (was_before && now_after) {
        if (
          moved_after === null ||
          Number(sorted_index.get(blocker)) >
            Number(sorted_index.get(moved_after))
        ) {
          moved_after = blocker;
        }
      }
    }
    if (moved_after !== null) {
      corrections.push({ bead_id: id, after: moved_after });
    }
  }
  return { order: sorted, corrections, cycle: false };
}
