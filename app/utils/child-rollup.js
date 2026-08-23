/**
 * Shared parent→children rollup computation (spec §3.1).
 *
 * Board 카드와 Worker 실행 타일이 같은 자식 집합에서 서로 다른 N/M·목록을
 * 내면 "어디까지 왔는가"에 두 화면이 다르게 답한다. 인덱스 구성과 rollup 계산은
 * 여기 한 곳에만 있다.
 */
import { selectCurrentChild } from './current-child.js';

/**
 * A child row preserved for a parent's compact rollup. Carries enough to render
 * (title/status) and to order with `cmpChildOrder` (metadata.task_order /
 * title / created_at), plus `updated_at` for `selectCurrentChild`.
 *
 * @typedef {{ id: string, title?: string, status?: string, metadata?: Record<string, unknown> | null, workflow?: Record<string, any>, created_at?: number | string, updated_at?: number | string }} ChildRow
 */

/**
 * @typedef {{ total: number, count: number, current: ChildRow | null, children: ChildRow[] }} ChildRollup
 */

/**
 * Read the parent id off an issue's flattened `parent` edge (bd JSON). Returns
 * '' for a top-level issue (no parent).
 *
 * @param {any} issue
 * @returns {string}
 */
export function parentIdOf(issue) {
  const raw = issue && /** @type {any} */ (issue).parent;
  if (typeof raw === 'string') {
    return raw;
  }
  if (raw && raw.id) {
    return String(raw.id);
  }
  return '';
}

/**
 * Build the parent→children index from an already-subscribed issue set so the
 * rollup is computed client-side (no server round-trip). Dedupes by id across
 * columns; reads the `parent` edge (string id or `{ id }`).
 *
 * @param {any[]} issues
 * @returns {Map<string, ChildRow[]>}
 */
export function buildChildrenIndex(issues) {
  /** @type {Map<string, any>} */
  const seen = new Map();
  for (const it of issues) {
    if (it && it.id && !seen.has(it.id)) {
      seen.set(it.id, it);
    }
  }
  /** @type {Map<string, ChildRow[]>} */
  const map = new Map();
  for (const it of seen.values()) {
    const parent = parentIdOf(it);
    if (!parent) {
      continue;
    }
    let arr = map.get(parent);
    if (!arr) {
      arr = [];
      map.set(parent, arr);
    }
    // Preserve the ordering keys (metadata.task_order / created_at) so the
    // card can sort the compact rows with cmpChildOrder (spec §3.3), plus
    // `updated_at` — the key `selectCurrentChild` orders on (UI-53es §2).
    arr.push({
      id: it.id,
      title: it.title,
      status: it.status,
      metadata: /** @type {any} */ (it).metadata,
      workflow: /** @type {any} */ (it).workflow,
      created_at: it.created_at,
      updated_at: it.updated_at
    });
  }
  return map;
}

/**
 * Compute the rollup for a parent: N done (resolved|closed) of M total
 * children, plus the in_progress child (if any) and the full child list.
 *
 * @param {Map<string, ChildRow[]>} children_by_parent
 * @param {string} id
 * @returns {ChildRollup}
 */
export function rollupFor(children_by_parent, id) {
  const children = children_by_parent.get(id) || [];
  let count = 0;
  for (const c of children) {
    if (c.status === 'resolved' || c.status === 'closed') {
      count += 1;
    }
  }
  // 어느 child가 "현재"인지는 Board·모니터·Worker 타일이 공유하는 계약이다
  // (UI-53es §2) — 여기서 따로 고르면 세 화면의 답이 갈린다.
  const current = /** @type {ChildRow | null} */ (selectCurrentChild(children));
  return { total: children.length, count, current, children };
}
