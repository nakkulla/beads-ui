import { html, render } from 'lit-html';
import { DEFAULT_CLOSED_RANGE } from '../../data/closed-range.js';
import { createListSelectors } from '../../data/list-selectors.js';
import { debug } from '../../utils/logging.js';
import { showToast } from '../../utils/toast.js';
import { createReorderController } from '../reorder.js';
import { columnTemplate } from './column.js';
import { filterBarTemplate } from './filter-bar.js';

/**
 * @typedef {import('./card.js').BoardCardIssue & { issue_type?: string, status?: string, closed_at?: number | null, created_at?: number | string }} IssueLite
 */

/**
 * @typedef {{ get: () => ({ revision: number, order: Record<string, number> } | null), set: (s: { revision: number, order: Record<string, number> } | null) => void, subscribe?: (fn: () => void) => () => void }} UiOrderStore
 */

/**
 * @typedef {Object} BoardViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<any>} [transport]
 * @property {UiOrderStore} [uiOrderStore]
 * @property {string} [closedRange] - Current Closed period ('today'|'7d'|'30d'|'all').
 * @property {(range: string) => void} [onClosedRangeChange]
 * @property {() => void} [onNewIssue]
 */

/**
 * Client-side render cap for the Closed column (spec §3.2). The server already
 * narrows the list by `params.since`; this bounds the DOM (and Phase 5's
 * parent-existence input) to the most recent closures.
 */
const CLOSED_RENDER_CAP = 200;

/**
 * Map a droppable column id to its target status. The Blocked column is
 * derived (open + blocked) and is intentionally absent — it is not a status,
 * so cards cannot be dropped there.
 *
 * @type {Record<string, 'open'|'in_progress'|'resolved'|'closed'>}
 */
const DROP_STATUS_BY_COL = {
  'ready-col': 'open',
  'in-progress-col': 'in_progress',
  'resolved-col': 'resolved',
  'closed-col': 'closed'
};

/**
 * Columns whose cards share the manual rank map and support same-column
 * reordering (spec §2). Closed is excluded — it keeps `closed_at desc`.
 *
 * @type {Set<string>}
 */
const REORDER_COLS = new Set([
  'blocked-col',
  'ready-col',
  'in-progress-col',
  'resolved-col'
]);

/**
 * Board view (control-tower v1): 5 columns — Blocked / Ready / In progress /
 * Resolved / Closed(collapsed strip). Push-only: composes columns from the
 * per-subscription issue stores via list-selectors. Card body is the v1
 * skeleton; chips/stepper/rollup land in Phase 8.
 *
 * @param {HTMLElement} mount_element
 * @param {BoardViewOptions} options
 * @returns {{ load: () => Promise<void>, clear: () => void }}
 */
export function createBoardView(mount_element, options) {
  const log = debug('views:board');
  const gotoIssue = options.gotoIssue;
  const issueStores = options.issueStores;
  const transport = options.transport;
  const uiOrderStore = options.uiOrderStore;
  const onClosedRangeChangeCb = options.onClosedRangeChange;
  const onNewIssue = options.onNewIssue;
  let closed_range = options.closedRange || DEFAULT_CLOSED_RANGE;
  const selectors = issueStores
    ? createListSelectors(issueStores, uiOrderStore)
    : null;
  const reorder = createReorderController({ transport, uiOrderStore });

  /** @type {IssueLite[]} */
  let list_blocked = [];
  /** @type {IssueLite[]} */
  let list_ready = [];
  /** @type {IssueLite[]} */
  let list_in_progress = [];
  /** @type {IssueLite[]} */
  let list_resolved = [];
  /** @type {IssueLite[]} */
  let list_closed = [];
  /** @type {Map<string, string>} */
  let status_by_id = new Map();
  /** @type {Map<string, string>} */
  let col_by_id = new Map();
  /** @type {Map<string, { id: string, title?: string, status?: string }[]>} */
  let children_by_parent = new Map();
  /** @type {Set<string>} */
  const expanded_ids = new Set();

  const filters = { search: '', priority: '', type: '' };

  /** @type {string | null} */
  let dragging_id = null;

  /**
   * @param {IssueLite} issue
   * @returns {boolean}
   */
  function isOpenBoardIssue(issue) {
    return String(issue.status || 'open') === 'open';
  }

  /**
   * Apply the board-local filters (search / priority / type) to a list.
   *
   * @param {IssueLite[]} items
   * @returns {IssueLite[]}
   */
  function applyFilters(items) {
    const q = filters.search.trim().toLowerCase();
    const pri = filters.priority;
    const type = filters.type;
    return items.filter((it) => {
      if (q) {
        const id = String(it.id || '').toLowerCase();
        const title = String(it.title || '').toLowerCase();
        if (!id.includes(q) && !title.includes(q)) {
          return false;
        }
      }
      if (pri !== '' && String(it.priority) !== pri) {
        return false;
      }
      if (type !== '' && String(it.issue_type || '') !== type) {
        return false;
      }
      return true;
    });
  }

  /**
   * Recompose all column lists from the subscription stores.
   */
  function refreshFromStores() {
    try {
      if (selectors) {
        const in_progress = selectors.selectBoardColumn(
          'tab:board:in-progress',
          'in_progress'
        );
        const blocked = selectors
          .selectBoardColumn('tab:board:blocked', 'blocked')
          .filter(isOpenBoardIssue);
        const in_prog_ids = new Set(in_progress.map((i) => i.id));
        const ready = selectors
          .selectBoardColumn('tab:board:ready', 'ready')
          .filter((i) => isOpenBoardIssue(i) && !in_prog_ids.has(i.id));
        const resolved = selectors.selectBoardColumn(
          'tab:board:resolved',
          'resolved'
        );
        const closed = selectors
          .selectBoardColumn('tab:board:closed', 'closed')
          .slice(0, CLOSED_RENDER_CAP);

        list_blocked = blocked;
        list_ready = ready;
        list_in_progress = in_progress;
        list_resolved = resolved;
        list_closed = closed;

        status_by_id = new Map();
        for (const it of blocked) status_by_id.set(it.id, 'open');
        for (const it of ready) status_by_id.set(it.id, 'open');
        for (const it of in_progress) status_by_id.set(it.id, 'in_progress');
        for (const it of resolved) status_by_id.set(it.id, 'resolved');
        for (const it of closed) status_by_id.set(it.id, 'closed');

        // Column membership (id → column DOM id) so a drop can tell a same-column
        // reorder from a cross-column status change (Blocked/Ready both 'open',
        // so status alone is insufficient).
        col_by_id = new Map();
        for (const it of blocked) col_by_id.set(it.id, 'blocked-col');
        for (const it of ready) col_by_id.set(it.id, 'ready-col');
        for (const it of in_progress) col_by_id.set(it.id, 'in-progress-col');
        for (const it of resolved) col_by_id.set(it.id, 'resolved-col');
        for (const it of closed) col_by_id.set(it.id, 'closed-col');

        rebuildChildrenIndex([
          ...blocked,
          ...ready,
          ...in_progress,
          ...resolved,
          ...closed
        ]);
      }
      doRender();
    } catch {
      list_blocked = [];
      list_ready = [];
      list_in_progress = [];
      list_resolved = [];
      list_closed = [];
      children_by_parent = new Map();
      doRender();
    }
  }

  /**
   * Rebuild the parent→children index from the already-subscribed issue set so
   * the card rollup is computed client-side (no server round-trip). Dedupes by
   * id across columns; reads the `parent` edge (string id or `{ id }`).
   *
   * @param {IssueLite[]} all
   */
  function rebuildChildrenIndex(all) {
    /** @type {Map<string, IssueLite>} */
    const seen = new Map();
    for (const it of all) {
      if (it && it.id && !seen.has(it.id)) {
        seen.set(it.id, it);
      }
    }
    /** @type {Map<string, { id: string, title?: string, status?: string }[]>} */
    const map = new Map();
    for (const it of seen.values()) {
      const raw = /** @type {any} */ (it).parent;
      const parent =
        typeof raw === 'string' ? raw : raw && raw.id ? String(raw.id) : '';
      if (!parent) {
        continue;
      }
      let arr = map.get(parent);
      if (!arr) {
        arr = [];
        map.set(parent, arr);
      }
      arr.push({ id: it.id, title: it.title, status: it.status });
    }
    children_by_parent = map;
  }

  /**
   * Compute the rollup for a card: N done (resolved|closed) of M total children,
   * plus the in_progress child (if any) and the full child list.
   *
   * @param {string} id
   * @returns {{ total: number, count: number, current: { id: string, title?: string, status?: string } | null, children: { id: string, title?: string, status?: string }[] }}
   */
  function rollupFor(id) {
    const children = children_by_parent.get(id) || [];
    let count = 0;
    /** @type {{ id: string, title?: string, status?: string } | null} */
    let current = null;
    for (const c of children) {
      if (c.status === 'resolved' || c.status === 'closed') {
        count += 1;
      }
      if (!current && c.status === 'in_progress') {
        current = c;
      }
    }
    return { total: children.length, count, current, children };
  }

  /**
   * @param {string} id
   * @returns {boolean}
   */
  function isExpanded(id) {
    return expanded_ids.has(id);
  }

  /**
   * @param {Event} ev
   * @param {string} id
   */
  function onRollupToggle(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    if (expanded_ids.has(id)) {
      expanded_ids.delete(id);
    } else {
      expanded_ids.add(id);
    }
    doRender();
  }

  /**
   * @param {Event} ev
   * @param {string} id
   */
  function onChildClick(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    gotoIssue(id);
  }

  // --- card / column interaction context ---

  /**
   * @param {MouseEvent} ev
   * @param {string} id
   */
  function onCardClick(ev, id) {
    if (!dragging_id) {
      gotoIssue(id);
    }
  }

  /**
   * @param {Event} ev
   * @param {string} id
   */
  function onCopyId(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    void copyToClipboard(id).then((ok) => {
      if (ok) {
        showToast('복사됨', 'success', 1200);
      }
    });
  }

  /**
   * @param {DragEvent} ev
   * @param {string} id
   */
  function onDragStart(ev, id) {
    dragging_id = id;
    if (ev.dataTransfer) {
      ev.dataTransfer.setData('text/plain', id);
      ev.dataTransfer.effectAllowed = 'move';
    }
    const target = /** @type {HTMLElement} */ (ev.target);
    target.classList.add('board-card--dragging');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragEnd(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    target.classList.remove('board-card--dragging');
    clearDropTarget();
    setTimeout(() => {
      dragging_id = null;
    }, 0);
  }

  /**
   * Closed period dropdown change: reflect locally then report to the shell,
   * which re-subscribes `closed-issues` with the new `since` (spec §3.2).
   *
   * @param {Event} ev
   */
  function handleClosedRangeChange(ev) {
    const value = String(
      /** @type {HTMLSelectElement} */ (ev.target).value || ''
    );
    if (!value || value === closed_range) {
      return;
    }
    closed_range = value;
    if (onClosedRangeChangeCb) {
      onClosedRangeChangeCb(value);
    }
    doRender();
  }

  const card_ctx = {
    onCardClick,
    onCopyId,
    onDragStart,
    onDragEnd,
    onClosedRangeChange: handleClosedRangeChange,
    rollupFor,
    isExpanded,
    onRollupToggle,
    onChildClick
  };

  // --- filter handlers (board-local state) ---
  const filter_handlers = {
    /** @param {Event} ev */
    onSearchInput(ev) {
      filters.search = String(
        /** @type {HTMLInputElement} */ (ev.target).value || ''
      );
      doRender();
    },
    /** @param {Event} ev */
    onPriorityChange(ev) {
      filters.priority = String(
        /** @type {HTMLSelectElement} */ (ev.target).value || ''
      );
      doRender();
    },
    /** @param {Event} ev */
    onTypeChange(ev) {
      filters.type = String(
        /** @type {HTMLSelectElement} */ (ev.target).value || ''
      );
      doRender();
    },
    onNewIssue() {
      if (onNewIssue) {
        onNewIssue();
      }
    }
  };

  function template() {
    return html`
      <div class="board-view">
        ${filterBarTemplate(filters, filter_handlers)}
        <div class="board-root">
          ${columnTemplate(
            {
              title: 'Blocked',
              id: 'blocked-col',
              items: applyFilters(list_blocked)
            },
            card_ctx
          )}
          ${columnTemplate(
            {
              title: 'Ready',
              id: 'ready-col',
              items: applyFilters(list_ready)
            },
            card_ctx
          )}
          ${columnTemplate(
            {
              title: 'In progress',
              id: 'in-progress-col',
              items: applyFilters(list_in_progress)
            },
            card_ctx
          )}
          ${columnTemplate(
            {
              title: 'Resolved',
              id: 'resolved-col',
              items: applyFilters(list_resolved)
            },
            card_ctx
          )}
          ${columnTemplate(
            {
              title: 'Closed',
              id: 'closed-col',
              items: applyFilters(list_closed),
              is_closed: true,
              closed_range
            },
            card_ctx
          )}
        </div>
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
    postRenderEnhance();
  }

  /**
   * Roving tabindex: first card of each column is tabbable.
   */
  function postRenderEnhance() {
    try {
      const columns = Array.from(
        mount_element.querySelectorAll('.board-column')
      );
      for (const col of columns) {
        const cards = Array.from(col.querySelectorAll('.board-card'));
        cards.forEach((card, idx) => {
          /** @type {HTMLElement} */ (card).tabIndex = idx === 0 ? 0 : -1;
        });
      }
    } catch {
      // non-fatal
    }
  }

  /**
   * Update issue status via transport, surfacing a toast on completion.
   *
   * @param {string} issue_id
   * @param {'open'|'in_progress'|'resolved'|'closed'} new_status
   */
  async function updateIssueStatus(issue_id, new_status) {
    if (!transport) {
      showToast('연결되지 않아 상태를 변경할 수 없습니다', 'error');
      return;
    }
    try {
      await transport('update-status', { id: issue_id, status: new_status });
      showToast('상태 변경됨', 'success', 1500);
    } catch (err) {
      log('update-status failed: %o', err);
      showToast('상태 변경 실패', 'error');
    }
  }

  /**
   * The full (pre-filter) sorted list backing a reorderable column.
   *
   * @param {string} col_id
   * @returns {IssueLite[]}
   */
  function listForCol(col_id) {
    switch (col_id) {
      case 'blocked-col':
        return list_blocked;
      case 'ready-col':
        return list_ready;
      case 'in-progress-col':
        return list_in_progress;
      case 'resolved-col':
        return list_resolved;
      default:
        return [];
    }
  }

  /**
   * Same-column reorder (spec §2 / §3.1): compute the dropped bead's new rank
   * against the column's rendered order, apply it to the shared ui-order store
   * optimistically, then persist via `ui-order-set`. On a CAS conflict, adopt
   * the server snapshot, recompute against the fresh order, and retry once.
   *
   * @param {string} col_id
   * @param {string} issue_id
   * @param {HTMLElement} drop_target - The element the drop landed on.
   */
  function reorderInColumn(col_id, issue_id, drop_target) {
    if (!transport || !uiOrderStore) {
      return;
    }
    const rendered = applyFilters(listForCol(col_id));
    const dragged = rendered.find((it) => it.id === issue_id);
    if (!dragged) {
      return;
    }
    const without = rendered.filter((it) => it.id !== issue_id);
    const over_card = drop_target.closest
      ? /** @type {HTMLElement | null} */ (drop_target.closest('.board-card'))
      : null;
    let insert_index = without.length;
    if (over_card) {
      const over_id = over_card.getAttribute('data-issue-id');
      if (over_id === issue_id) {
        // Dropped onto itself — no move.
        return;
      }
      const j = without.findIndex((it) => it.id === over_id);
      if (j >= 0) {
        insert_index = j;
      }
    }
    const final_list = without.slice();
    final_list.splice(insert_index, 0, dragged);
    void reorder.applyReorder(issue_id, final_list, insert_index);
  }

  function clearDropTarget() {
    for (const c of Array.from(
      mount_element.querySelectorAll('.board-column--drag-over')
    )) {
      c.classList.remove('board-column--drag-over');
    }
  }

  /** @type {HTMLElement | null} */
  let current_drop_target = null;

  mount_element.addEventListener('dragover', (ev) => {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    const target = /** @type {HTMLElement} */ (ev.target);
    const col = /** @type {HTMLElement | null} */ (
      target.closest('.board-column')
    );
    if (col && col !== current_drop_target) {
      if (current_drop_target) {
        current_drop_target.classList.remove('board-column--drag-over');
      }
      col.classList.add('board-column--drag-over');
      current_drop_target = col;
    }
  });

  mount_element.addEventListener('dragleave', (ev) => {
    const related = /** @type {HTMLElement | null} */ (ev.relatedTarget);
    if (!related || !mount_element.contains(related)) {
      if (current_drop_target) {
        current_drop_target.classList.remove('board-column--drag-over');
        current_drop_target = null;
      }
    }
  });

  mount_element.addEventListener('drop', (ev) => {
    ev.preventDefault();
    if (current_drop_target) {
      current_drop_target.classList.remove('board-column--drag-over');
      current_drop_target = null;
    }
    const target = /** @type {HTMLElement} */ (ev.target);
    const col = target.closest('.board-column');
    if (!col) {
      return;
    }
    const issue_id = ev.dataTransfer?.getData('text/plain') || '';
    if (!issue_id) {
      return;
    }
    const target_col_id = col.id;
    const source_col_id = col_by_id.get(issue_id);
    if (source_col_id && source_col_id === target_col_id) {
      // Same-column drop = manual reorder (spec §2). Closed keeps closed_at desc
      // and is not reorderable; other columns share the rank map.
      if (REORDER_COLS.has(target_col_id)) {
        reorderInColumn(target_col_id, issue_id, target);
      }
      return;
    }
    // Cross-column drop = status change (unchanged path).
    const new_status = DROP_STATUS_BY_COL[target_col_id];
    if (!new_status) {
      // Blocked (or unknown) column is not a droppable status target.
      showToast('여기로는 옮길 수 없습니다', 'warning', 1500);
      return;
    }
    const current_status = status_by_id.get(issue_id);
    if (current_status === new_status) {
      // Same status — no-op, no mutation.
      return;
    }
    void updateIssueStatus(issue_id, new_status);
  });

  // Keyboard navigation: Enter/Space opens; arrows move focus within/across.
  mount_element.addEventListener('keydown', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const tag = String(target.tagName || '').toLowerCase();
    if (
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      tag === 'button' ||
      tag === 'a' ||
      target.isContentEditable === true
    ) {
      // Interactive children (id copy, rollup toggle, child links) handle
      // their own keyboard activation — don't hijack Enter/arrows here.
      return;
    }
    const card = /** @type {HTMLElement | null} */ (
      target.closest('.board-card')
    );
    if (!card) {
      return;
    }
    const key = String(ev.key || '');
    if (key === 'Enter' || key === ' ') {
      ev.preventDefault();
      const id = card.getAttribute('data-issue-id');
      if (id) {
        gotoIssue(id);
      }
      return;
    }
    if (
      key !== 'ArrowUp' &&
      key !== 'ArrowDown' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight'
    ) {
      return;
    }
    ev.preventDefault();
    const col = /** @type {HTMLElement | null} */ (
      card.closest('.board-column')
    );
    if (!col) {
      return;
    }
    const cards = Array.from(col.querySelectorAll('.board-card'));
    const idx = cards.indexOf(card);
    if (key === 'ArrowDown' && idx < cards.length - 1) {
      moveFocus(card, /** @type {HTMLElement} */ (cards[idx + 1]));
      return;
    }
    if (key === 'ArrowUp' && idx > 0) {
      moveFocus(card, /** @type {HTMLElement} */ (cards[idx - 1]));
      return;
    }
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const cols = Array.from(mount_element.querySelectorAll('.board-column'));
      const col_idx = cols.indexOf(col);
      const dir = key === 'ArrowRight' ? 1 : -1;
      let next_idx = col_idx + dir;
      while (next_idx >= 0 && next_idx < cols.length) {
        const first = /** @type {HTMLElement | null} */ (
          cols[next_idx].querySelector('.board-card')
        );
        if (first) {
          moveFocus(card, first);
          return;
        }
        next_idx += dir;
      }
    }
  });

  /**
   * @param {HTMLElement} from
   * @param {HTMLElement} to
   */
  function moveFocus(from, to) {
    try {
      from.tabIndex = -1;
      to.tabIndex = 0;
      to.focus();
    } catch {
      // ignore focus errors
    }
  }

  /** @type {null | (() => void)} */
  let unsubscribe_selectors = null;
  if (selectors && selectors.subscribe) {
    unsubscribe_selectors = selectors.subscribe(() => {
      try {
        refreshFromStores();
      } catch {
        // ignore
      }
    });
  }

  return {
    async load() {
      log('load');
      refreshFromStores();
    },
    clear() {
      if (unsubscribe_selectors) {
        unsubscribe_selectors();
        unsubscribe_selectors = null;
      }
      mount_element.replaceChildren();
      list_blocked = [];
      list_ready = [];
      list_in_progress = [];
      list_resolved = [];
      list_closed = [];
      status_by_id = new Map();
      col_by_id = new Map();
    }
  };
}

/**
 * Copy text to the clipboard with a non-secure-context fallback.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  try {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(String(text));
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = String(text);
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } finally {
      ta.remove();
    }
    return ok;
  } catch {
    return false;
  }
}
