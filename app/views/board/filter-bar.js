import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} BoardFilterState
 * @property {string} search
 * @property {string} priority - '' (all) or '0'..'4'.
 * @property {string} type - '' (all) or a bd issue type.
 */

/**
 * @typedef {Object} BoardFilterHandlers
 * @property {(ev: Event) => void} onSearchInput
 * @property {(ev: Event) => void} onPriorityChange
 * @property {(ev: Event) => void} onTypeChange
 * @property {(ev: Event) => void} onSortChange
 * @property {() => void} onDeferredToggle
 * @property {(ev: Event) => void} onNewIssue
 */

/**
 * @typedef {Object} BoardFilterExtras
 * @property {string} sort_mode - Current Board sort mode (UX v3 spec §3).
 * @property {boolean} show_deferred - Deferred column visibility (spec §2).
 * @property {number} deferred_count - Live deferred issue count.
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
 * Board filter bar: search + priority + type on the left; Deferred toggle,
 * sort dropdown, and "새 이슈" on the right (UX v3 spec §2–3). Filters are
 * board-local state, not app-store state.
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
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${extras.show_deferred
          ? 'board-filter__deferred is-on'
          : 'board-filter__deferred'}
        aria-pressed=${extras.show_deferred ? 'true' : 'false'}
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
