/**
 * Shared child-rollup markup (spec §3.2).
 *
 * Board 카드와 Worker 실행 타일이 같은 사실을 서로 다른 마크업으로 그리면 두
 * 화면의 "children N/M"이 다른 것처럼 보인다. `board-card__roll*` 클래스명은
 * Board 시절 이름 그대로 두고(전역 CSS가 이미 그 이름을 쓴다) 마크업만 공유한다.
 */
import { html } from 'lit-html';
import { cmpChildOrder } from '../data/sort.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {import('../utils/child-rollup.js').ChildRow} ChildRow
 */

/**
 * @typedef {import('../utils/child-rollup.js').ChildRollup} ChildRollup
 */

/**
 * @typedef {Object} ChildRollupOptions
 * @property {string} parent_id - Carried on the toggle as `data-roll-parent` for delegated clicks.
 * @property {boolean} [expanded]
 * @property {TemplateResult | string} [trailing] - Right side of the meta row (Board: `timesTemplate`).
 * @property {string | null} [empty_label] - Text for `total === 0`; nothing renders when absent.
 * @property {(child: ChildRow) => (TemplateResult | null)} [childChips]
 * @property {(ev: Event) => void} [onToggle]
 * @property {(ev: Event, child_id: string) => void} [onChildClick]
 */

/**
 * @param {string | undefined} status
 * @returns {string}
 */
export function statusDotClass(status) {
  switch (status) {
    case 'in_progress':
      return 'board-card__dot board-card__dot--progress';
    case 'resolved':
      return 'board-card__dot board-card__dot--resolved';
    case 'closed':
      return 'board-card__dot board-card__dot--closed';
    case 'blocked':
      return 'board-card__dot board-card__dot--blocked';
    default:
      return 'board-card__dot';
  }
}

/**
 * The `children N/M ▴|▾` toggle. `data-roll-parent` rides along even without a
 * handler so a delegated listener (Worker) can read the bead id off the DOM;
 * an absent `onToggle` binds `undefined`, which lit-html commits as "no
 * listener" rather than as a no-op handler.
 *
 * @param {string} parent_id
 * @param {number} count
 * @param {number} total
 * @param {boolean} expanded
 * @param {((ev: Event) => void) | undefined} onToggle
 * @returns {TemplateResult}
 */
function toggleTemplate(parent_id, count, total, expanded, onToggle) {
  return html`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${parent_id}
    aria-expanded=${expanded ? 'true' : 'false'}
    @click=${onToggle}
  >
    children ${count}/${total} ${expanded ? '▴' : '▾'}
  </button>`;
}

/**
 * One compact child row: status dot + ordinal + title + caller-supplied chips.
 * `data-child-id` is unconditional for the same delegated-listener reason as
 * the toggle.
 *
 * @param {ChildRow} child
 * @param {number} ord
 * @param {TemplateResult | null} chips
 * @param {((ev: Event, child_id: string) => void) | undefined} onChildClick
 * @returns {TemplateResult}
 */
function childTemplate(child, ord, chips, onChildClick) {
  return html`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${child.id}
    @click=${onChildClick
      ? (/** @type {Event} */ ev) => onChildClick(ev, child.id)
      : undefined}
  >
    <span class=${statusDotClass(child.status)}>●</span>
    <span class="board-card__roll-child-ord">${ord}</span>
    <span class="board-card__roll-child-title">${child.title || child.id}</span>
    ${chips}
  </button>`;
}

/**
 * Child rollup block: "children N/M" toggle + the current in_progress child
 * one-liner + (when expanded) the compact child rows ordered by
 * `cmpChildOrder`.
 *
 * @param {ChildRollup} rollup
 * @param {ChildRollupOptions} opts
 * @returns {TemplateResult | string}
 */
export function childRollupTemplate(rollup, opts) {
  const total = rollup.total || 0;
  const expanded = !!opts.expanded;
  const trailing = opts.trailing ?? '';
  const empty_label =
    typeof opts.empty_label === 'string' && opts.empty_label.length > 0
      ? opts.empty_label
      : null;
  if (total === 0 && empty_label === null) {
    return '';
  }
  const children = Array.isArray(rollup.children) ? rollup.children : [];
  const ordered = total > 0 ? children.slice().sort(cmpChildOrder) : children;
  return html`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${total > 0
          ? toggleTemplate(
              opts.parent_id,
              rollup.count,
              total,
              expanded,
              opts.onToggle
            )
          : html`<span class="board-card__roll-none">${empty_label}</span>`}
        ${trailing}
      </div>
      ${total > 0 && rollup.current
        ? html`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${rollup.current.title || rollup.current.id}</span
            >
          </div>`
        : ''}
      ${expanded && total > 0
        ? html`<div class="board-card__roll-list">
            ${ordered.map((c, i) =>
              childTemplate(
                c,
                i + 1,
                opts.childChips ? opts.childChips(c) : null,
                opts.onChildClick
              )
            )}
          </div>`
        : ''}
    </div>
  `;
}
