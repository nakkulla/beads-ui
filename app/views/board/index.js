import { html, render } from 'lit-html';
import { createListSelectors } from '../../data/list-selectors.js';
import { debug } from '../../utils/logging.js';
import { showToast } from '../../utils/toast.js';
import { columnTemplate } from './column.js';
import { filterBarTemplate } from './filter-bar.js';

/**
 * @typedef {import('./card.js').BoardCardIssue & { issue_type?: string, status?: string, closed_at?: number | null }} IssueLite
 */

/**
 * @typedef {Object} BoardViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<unknown>} [transport]
 * @property {() => void} [onNewIssue]
 */

const CLOSED_COLLAPSE_KEY = 'beads-ui.board.closed-collapsed';
const CLOSED_LIMIT = 50;

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
  const onNewIssue = options.onNewIssue;
  const selectors = issueStores ? createListSelectors(issueStores) : null;

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
  /** @type {Map<string, { id: string, title?: string, status?: string }[]>} */
  let children_by_parent = new Map();
  /** @type {Set<string>} */
  const expanded_ids = new Set();

  const filters = { search: '', priority: '', type: '' };

  let closed_collapsed = true;
  try {
    closed_collapsed =
      window.localStorage.getItem(CLOSED_COLLAPSE_KEY) !== 'false';
  } catch {
    // ignore storage errors
  }

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
          .slice(0, CLOSED_LIMIT);

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

  function onClosedToggle() {
    closed_collapsed = !closed_collapsed;
    try {
      window.localStorage.setItem(
        CLOSED_COLLAPSE_KEY,
        closed_collapsed ? 'true' : 'false'
      );
    } catch {
      // ignore storage errors
    }
    doRender();
  }

  const card_ctx = {
    onCardClick,
    onCopyId,
    onDragStart,
    onDragEnd,
    onClosedToggle,
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
              collapsed: closed_collapsed
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
    const new_status = DROP_STATUS_BY_COL[col.id];
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
