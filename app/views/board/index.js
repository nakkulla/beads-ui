import { html, render } from 'lit-html';
import { DEFAULT_CLOSED_RANGE } from '../../data/closed-range.js';
import { createListSelectors } from '../../data/list-selectors.js';
import { debug } from '../../utils/logging.js';
import { showToast } from '../../utils/toast.js';
import { createReorderController } from '../reorder.js';
import { columnTemplate } from './column.js';
import { filterBarTemplate } from './filter-bar.js';

/**
 * @typedef {import('./card.js').BoardCardIssue & { issue_type?: string, status?: string, closed_at?: number | null, created_at?: number | string, parent?: string | { id?: string } }} IssueLite
 */

/**
 * A child row preserved for a parent card's compact rollup (spec §3.3). Carries
 * enough to render (title/status) and to order with `cmpChildOrder`
 * (metadata.task_order / title / created_at).
 *
 * @typedef {{ id: string, title?: string, status?: string, metadata?: Record<string, unknown> | null, created_at?: number | string }} ChildRow
 */

/**
 * @typedef {{ get: () => ({ revision: number, order: Record<string, number> } | null), set: (s: { revision: number, order: Record<string, number> } | null) => void, subscribe?: (fn: () => void) => () => void }} UiOrderStore
 */

/**
 * @typedef {{ get: () => (import('../../utils/label-policy.js').DisplayPolicy | null), subscribe?: (fn: () => void) => () => void }} DisplayPolicyStore
 */

/**
 * @typedef {Object} BoardViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<any>} [transport]
 * @property {UiOrderStore} [uiOrderStore]
 * @property {DisplayPolicyStore} [displayPolicyStore]
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
 * @type {Record<string, 'open'|'in_progress'|'deferred'|'resolved'|'closed'>}
 */
const DROP_STATUS_BY_COL = {
  'ready-col': 'open',
  'in-progress-col': 'in_progress',
  'resolved-col': 'resolved',
  'deferred-col': 'deferred',
  'closed-col': 'closed'
};

/**
 * Columns whose cards share the manual rank map and support same-column
 * reordering (spec §2; UX v3 — only in the `manual` sort mode). Closed is
 * excluded — it keeps `closed_at desc`. Deferred participates like every
 * other status column (UX v3 spec §2).
 *
 * @type {Set<string>}
 */
const REORDER_COLS = new Set([
  'blocked-col',
  'ready-col',
  'in-progress-col',
  'resolved-col',
  'deferred-col'
]);

/** localStorage key for the Board sort mode (UX v3 spec §3). */
const SORT_KEY = 'beads-ui.board.sort';

/** @type {Set<string>} */
const SORT_MODES = new Set([
  'created_desc',
  'created_asc',
  'updated_desc',
  'priority',
  'manual'
]);

/**
 * Read the persisted Board sort mode; default is created-desc (newest first,
 * UX v3 spec §3).
 *
 * @returns {import('../../data/list-selectors.js').BoardSortMode}
 */
function loadSortMode() {
  try {
    const raw = window.localStorage.getItem(SORT_KEY);
    if (raw && SORT_MODES.has(raw)) {
      return /** @type {any} */ (raw);
    }
  } catch {
    // ignore storage errors
  }
  return 'created_desc';
}

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
  const displayPolicyStore = options.displayPolicyStore;
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
  let list_deferred = [];
  /** @type {IssueLite[]} */
  let list_closed = [];
  /** Deferred column visibility (UX v3 spec §2) — session-local, no storage. */
  let show_deferred = false;
  /** Live deferred issue count for the toggle label (computed even when hidden). */
  let deferred_count = 0;
  /** @type {import('../../data/list-selectors.js').BoardSortMode} */
  let sort_mode = loadSortMode();
  /** @type {Map<string, string>} */
  let status_by_id = new Map();
  /** @type {Map<string, string>} */
  let col_by_id = new Map();
  /** @type {Map<string, ChildRow[]>} */
  let children_by_parent = new Map();
  /**
   * Cards whose child rollup the user has explicitly collapsed. The rollup is
   * expanded by default (spec §3.3), so this tracks the exceptions.
   *
   * @type {Set<string>}
   */
  const collapsed_ids = new Set();

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
   * True while any board-local filter (search / priority / type) is active.
   * Child folding is suspended in this state (spec §3.3) so a filter that hides
   * a parent cannot make its children vanish.
   *
   * @returns {boolean}
   */
  function filterActive() {
    return (
      filters.search.trim() !== '' ||
      filters.priority !== '' ||
      filters.type !== ''
    );
  }

  /**
   * Recompose all column lists from the subscription stores in two passes
   * (spec §3.3): pass 1 builds the five render lists and the set of rendered
   * top-level parents; pass 2 folds children of rendered parents into their
   * parent card (unless a board-local filter is active).
   */
  function refreshFromStores() {
    try {
      if (selectors) {
        // Pass 1: the five render lists exactly as displayed. Closed is already
        // period-filtered server-side (Phase 4) and capped here; this cap is the
        // parent-existence input the fold rule reads.
        const in_progress = selectors.selectBoardColumn(
          'tab:board:in-progress',
          'in_progress',
          sort_mode
        );
        const blocked = selectors
          .selectBoardColumn('tab:board:blocked', 'blocked', sort_mode)
          .filter(isOpenBoardIssue);
        const in_prog_ids = new Set(in_progress.map((i) => i.id));
        const ready = selectors
          .selectBoardColumn('tab:board:ready', 'ready', sort_mode)
          .filter((i) => isOpenBoardIssue(i) && !in_prog_ids.has(i.id));
        const resolved = selectors.selectBoardColumn(
          'tab:board:resolved',
          'resolved',
          sort_mode
        );
        // Deferred is always composed (the toggle shows its live count) but
        // participates in the render sets only while shown (UX v3 spec §2).
        const deferred = selectors.selectBoardColumn(
          'tab:board:deferred',
          'deferred',
          sort_mode
        );
        const deferred_shown = show_deferred ? deferred : [];
        const closed = selectors
          .selectBoardColumn('tab:board:closed', 'closed')
          .slice(0, CLOSED_RENDER_CAP);

        const all = [
          ...blocked,
          ...ready,
          ...in_progress,
          ...resolved,
          ...deferred_shown,
          ...closed
        ];

        // The rollup must index every child (incl. folded ones) so a parent card
        // can list them — build it from the full render set, before exclusion.
        rebuildChildrenIndex(all);

        // rendered_parents: ids of TOP-LEVEL (parentless) cards across the five
        // render lists. Only these count as a "rendered parent" for folding; a
        // parent that is itself absent (cut by the closed period/cap filter) is
        // not present, so its child stays a card (spec §3.3 — no issue vanishes).
        /** @type {Set<string>} */
        const rendered_parents = new Set();
        for (const it of all) {
          if (it && it.id && !parentIdOf(it)) {
            rendered_parents.add(it.id);
          }
        }

        // Pass 2: fold children of rendered parents out of every column. Folding
        // is SUSPENDED whenever a board-local filter is active so a filter that
        // hides the parent cannot make its children vanish, and search can reach
        // children directly (spec §3.3).
        const fold = !filterActive();
        list_blocked = fold
          ? excludeFolded(blocked, rendered_parents)
          : blocked;
        list_ready = fold ? excludeFolded(ready, rendered_parents) : ready;
        list_in_progress = fold
          ? excludeFolded(in_progress, rendered_parents)
          : in_progress;
        list_resolved = fold
          ? excludeFolded(resolved, rendered_parents)
          : resolved;
        list_deferred = fold
          ? excludeFolded(deferred_shown, rendered_parents)
          : deferred_shown;
        deferred_count = deferred.length;
        list_closed = fold ? excludeFolded(closed, rendered_parents) : closed;

        status_by_id = new Map();
        for (const it of list_blocked) status_by_id.set(it.id, 'open');
        for (const it of list_ready) status_by_id.set(it.id, 'open');
        for (const it of list_in_progress)
          status_by_id.set(it.id, 'in_progress');
        for (const it of list_resolved) status_by_id.set(it.id, 'resolved');
        for (const it of list_deferred) status_by_id.set(it.id, 'deferred');
        for (const it of list_closed) status_by_id.set(it.id, 'closed');

        // Column membership (id → column DOM id) so a drop can tell a same-column
        // reorder from a cross-column status change (Blocked/Ready both 'open',
        // so status alone is insufficient). Built from the rendered (post-fold)
        // lists — folded children are not draggable cards.
        col_by_id = new Map();
        for (const it of list_blocked) col_by_id.set(it.id, 'blocked-col');
        for (const it of list_ready) col_by_id.set(it.id, 'ready-col');
        for (const it of list_in_progress)
          col_by_id.set(it.id, 'in-progress-col');
        for (const it of list_resolved) col_by_id.set(it.id, 'resolved-col');
        for (const it of list_deferred) col_by_id.set(it.id, 'deferred-col');
        for (const it of list_closed) col_by_id.set(it.id, 'closed-col');
      }
      doRender();
    } catch {
      list_blocked = [];
      list_ready = [];
      list_in_progress = [];
      list_resolved = [];
      list_deferred = [];
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
      // card can sort the compact rows with cmpChildOrder (spec §3.3).
      arr.push({
        id: it.id,
        title: it.title,
        status: it.status,
        metadata: /** @type {any} */ (it).metadata,
        created_at: it.created_at
      });
    }
    children_by_parent = map;
  }

  /**
   * Compute the rollup for a card: N done (resolved|closed) of M total children,
   * plus the in_progress child (if any) and the full child list.
   *
   * @param {string} id
   * @returns {{ total: number, count: number, current: ChildRow | null, children: ChildRow[] }}
   */
  function rollupFor(id) {
    const children = children_by_parent.get(id) || [];
    let count = 0;
    /** @type {ChildRow | null} */
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
   * Child rollups render expanded by default (spec §3.3); a card is expanded
   * unless the user has explicitly collapsed it.
   *
   * @param {string} id
   * @returns {boolean}
   */
  function isExpanded(id) {
    return !collapsed_ids.has(id);
  }

  /**
   * @param {Event} ev
   * @param {string} id
   */
  function onRollupToggle(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    if (collapsed_ids.has(id)) {
      collapsed_ids.delete(id);
    } else {
      collapsed_ids.add(id);
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

  /**
   * @param {Event} ev
   * @param {string} id
   */
  function onFromChipClick(ev, id) {
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
    onChildClick,
    onFromChipClick,
    // Read on every access so a pushed policy snapshot takes effect on the next
    // render without rebuilding this context object.
    get policy() {
      return displayPolicyStore ? displayPolicyStore.get() : null;
    }
  };

  // --- filter handlers (board-local state) ---
  // A filter change flips whether child folding is active (spec §3.3), so it
  // must recompose the lists (refreshFromStores), not just re-render.
  const filter_handlers = {
    /** @param {Event} ev */
    onSearchInput(ev) {
      filters.search = String(
        /** @type {HTMLInputElement} */ (ev.target).value || ''
      );
      refreshFromStores();
    },
    /** @param {Event} ev */
    onPriorityChange(ev) {
      filters.priority = String(
        /** @type {HTMLSelectElement} */ (ev.target).value || ''
      );
      refreshFromStores();
    },
    /** @param {Event} ev */
    onTypeChange(ev) {
      filters.type = String(
        /** @type {HTMLSelectElement} */ (ev.target).value || ''
      );
      refreshFromStores();
    },
    /** @param {Event} ev */
    onSortChange(ev) {
      const value = String(
        /** @type {HTMLSelectElement} */ (ev.target).value || ''
      );
      if (!SORT_MODES.has(value) || value === sort_mode) {
        return;
      }
      sort_mode = /** @type {any} */ (value);
      try {
        window.localStorage.setItem(SORT_KEY, value);
      } catch {
        // ignore storage errors
      }
      refreshFromStores();
    },
    onDeferredToggle() {
      show_deferred = !show_deferred;
      refreshFromStores();
    },
    onNewIssue() {
      if (onNewIssue) {
        onNewIssue();
      }
    }
  };

  function template() {
    // 5→6 column layout contract (UX v3 spec §2): the modifier class swaps the
    // grid template so Closed stays on the same row when Deferred is shown.
    const root_class = show_deferred
      ? 'board-root board-root--deferred'
      : 'board-root';
    return html`
      <div class="board-view">
        ${filterBarTemplate(filters, filter_handlers, {
          sort_mode,
          show_deferred,
          deferred_count
        })}
        <div class=${root_class}>
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
          ${show_deferred
            ? columnTemplate(
                {
                  title: 'Deferred',
                  id: 'deferred-col',
                  items: applyFilters(list_deferred)
                },
                card_ctx
              )
            : ''}
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
   * @param {'open'|'in_progress'|'deferred'|'resolved'|'closed'} new_status
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
      case 'deferred-col':
        return list_deferred;
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
    // The drop target identifies the anchor card in the RENDERED (filtered)
    // column, but the rank math must run against the FULL column list: a
    // midpoint or renormalization computed on a filtered subset would scramble
    // the dropped card's order relative to the hidden cards (spec §2 — the
    // renormalization batch covers the whole list).
    const full = listForCol(col_id);
    const dragged = full.find((it) => it.id === issue_id);
    if (!dragged) {
      return;
    }
    const without = full.filter((it) => it.id !== issue_id);
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
      // Same-column drop = manual reorder (spec §2), allowed only in the
      // `manual` sort mode (UX v3 spec §3) — in comparator modes the rank
      // write would be invisible and misleading. Closed keeps closed_at desc
      // and is never reorderable.
      if (REORDER_COLS.has(target_col_id)) {
        if (sort_mode !== 'manual') {
          showToast(
            '수동(드래그) 정렬 모드에서만 순서를 바꿀 수 있습니다',
            'warning',
            2000
          );
          return;
        }
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

  // A policy change alters which labels pass the filter, so it has to recompose
  // the lists rather than only re-render.
  /** @type {null | (() => void)} */
  let unsubscribe_policy = null;
  if (displayPolicyStore && displayPolicyStore.subscribe) {
    unsubscribe_policy = displayPolicyStore.subscribe(() => {
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
      if (unsubscribe_policy) {
        unsubscribe_policy();
        unsubscribe_policy = null;
      }
      mount_element.replaceChildren();
      list_blocked = [];
      list_ready = [];
      list_in_progress = [];
      list_resolved = [];
      list_deferred = [];
      list_closed = [];
      status_by_id = new Map();
      col_by_id = new Map();
    }
  };
}

/**
 * Read the parent id off an issue's flattened `parent` edge (bd JSON). Returns
 * '' for a top-level issue (no parent).
 *
 * @param {IssueLite} issue
 * @returns {string}
 */
function parentIdOf(issue) {
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
 * Drop children whose parent is a rendered top-level card (spec §3.3); such
 * children are folded into the parent card and must not also appear as columns.
 *
 * @param {IssueLite[]} list
 * @param {Set<string>} rendered_parents
 * @returns {IssueLite[]}
 */
function excludeFolded(list, rendered_parents) {
  return list.filter((it) => {
    const parent = parentIdOf(it);
    return !(parent && rendered_parents.has(parent));
  });
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
