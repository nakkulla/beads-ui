import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} BoardFilterState
 * @property {string} search
 * @property {string} priority - '' (all) or '0'..'4'.
 * @property {string} type - '' (all) or a bd issue type.
 * @property {string[]} labels - Selected labels; empty means "any".
 */

/**
 * @typedef {Object} BoardFilterHandlers
 * @property {(ev: Event) => void} onSearchInput
 * @property {(ev: Event) => void} onPriorityChange
 * @property {(ev: Event) => void} onTypeChange
 * @property {(ev: Event) => void} onSortChange
 * @property {() => void} onDeferredToggle
 * @property {() => void} onLabelMenuToggle
 * @property {(label: string) => void} onLabelToggle
 * @property {() => void} onLabelClear
 * @property {(ev: Event) => void} onNewIssue
 */

/**
 * @typedef {Object} BoardFilterExtras
 * @property {string} sort_mode - Current Board sort mode (UX v3 spec §3).
 * @property {boolean} deferred_popup_open - Whether the Deferred popup is open.
 * @property {number} deferred_count - Live deferred issue count.
 * @property {string[]} label_options - Union of labels across the loaded issues.
 * @property {boolean} label_menu_open
 */

const PRIORITY_OPTIONS = [
  { value: '', label: '우선순위' },
  { value: '0', label: 'P0' },
  { value: '1', label: 'P1' },
  { value: '2', label: 'P2' },
  { value: '3', label: 'P3' },
  { value: '4', label: 'P4' }
];

const TYPE_OPTIONS = [
  { value: '', label: '타입' },
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
  { value: 'task', label: 'task' },
  { value: 'epic', label: 'epic' },
  { value: 'chore', label: 'chore' }
];

const SORT_OPTIONS = [
  { value: 'created_desc', label: '생성 최신순' },
  { value: 'created_asc', label: '생성 오래된순' },
  { value: 'updated_desc', label: '수정 최신순' },
  { value: 'priority', label: '우선순위순' },
  { value: 'manual', label: '수동(드래그)' }
];

/**
 * Label multi-select popover. Options come from the labels actually present in
 * the loaded issues, WITHOUT the display policy applied — a label hidden from
 * the cards must still be selectable here.
 *
 * @param {BoardFilterState} state
 * @param {BoardFilterHandlers} handlers
 * @param {BoardFilterExtras} extras
 * @returns {TemplateResult}
 */
function labelFilterTemplate(state, handlers, extras) {
  const selected_count = state.labels.length;
  const label_text = selected_count > 0 ? `라벨 ${selected_count}` : '라벨';
  return html`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${selected_count > 0
          ? 'board-filter__label-btn is-on'
          : 'board-filter__label-btn'}
        aria-haspopup="true"
        aria-expanded=${extras.label_menu_open ? 'true' : 'false'}
        @click=${handlers.onLabelMenuToggle}
      >
        ${label_text} ▾
      </button>
      ${extras.label_menu_open
        ? html`<div class="board-filter__label-menu" role="group">
            ${extras.label_options.length === 0
              ? html`<div class="board-filter__label-empty">라벨 없음</div>`
              : extras.label_options.map(
                  (label) =>
                    html`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${state.labels.includes(label)}
                        @change=${() => handlers.onLabelToggle(label)}
                      />
                      <span>${label}</span>
                    </label>`
                )}
            ${selected_count > 0
              ? html`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${handlers.onLabelClear}
                >
                  선택 해제
                </button>`
              : ''}
          </div>`
        : ''}
    </div>
  `;
}

/**
 * Board filter bar: search + priority + type on the left; the Deferred popup
 * button, sort dropdown, and "새 이슈" on the right (UX v3 spec §2–3). Filters
 * are board-local state, not app-store state.
 *
 * @param {BoardFilterState} state
 * @param {BoardFilterHandlers} handlers
 * @param {BoardFilterExtras} extras
 * @returns {TemplateResult}
 */
export function filterBarTemplate(state, handlers, extras) {
  return html`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${state.search}
        @input=${handlers.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${handlers.onPriorityChange}
      >
        ${PRIORITY_OPTIONS.map(
          (opt) =>
            html`<option
              value=${opt.value}
              ?selected=${state.priority === opt.value}
            >
              ${opt.label}
            </option>`
        )}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${handlers.onTypeChange}
      >
        ${TYPE_OPTIONS.map(
          (opt) =>
            html`<option
              value=${opt.value}
              ?selected=${state.type === opt.value}
            >
              ${opt.label}
            </option>`
        )}
      </select>
      ${labelFilterTemplate(state, handlers, extras)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${extras.deferred_popup_open
          ? 'board-filter__deferred is-on'
          : 'board-filter__deferred'}
        aria-haspopup="dialog"
        aria-expanded=${extras.deferred_popup_open ? 'true' : 'false'}
        @click=${handlers.onDeferredToggle}
      >
        Deferred ${extras.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${handlers.onSortChange}
      >
        ${SORT_OPTIONS.map(
          (opt) =>
            html`<option
              value=${opt.value}
              ?selected=${extras.sort_mode === opt.value}
            >
              ${opt.label}
            </option>`
        )}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${handlers.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `;
}
