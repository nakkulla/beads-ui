/**
 * Candidate lane tools both tabs draw (UI-f2sy §6): the 우선순위·타입·라벨 filter
 * controls and the sort chain editor. The templates are pure — every state they
 * show arrives as an argument — so the Worker and Monitor views keep their own
 * state and handlers while the markup (and therefore the click/change selectors
 * the handlers read) stays one.
 *
 * @import { LaneModel } from './lane-model.js'
 * @import { CandidateSortState } from './candidate-sort.js'
 */
import { html } from 'lit-html';
import {
  CANDIDATE_SORT_PRESETS,
  SORT_KEY_OPTIONS,
  chainOf,
  presetIdOf
} from './candidate-sort.js';
import { PRIORITY_FILTER_OPTIONS, TYPE_FILTER_OPTIONS } from './lane-model.js';

/**
 * Union of the labels on every lane row a render draws (UI-p7s2 §6). 표시 정책과
 * 무관하게 전부 보인다 — 감춰진 라벨도 필터로는 걸 수 있어야 한다.
 *
 * @param {LaneModel} model
 * @param {string[]} selected - Labels picked in the filter; they stay listed even
 * when no row carries them, so the pick can still be switched off.
 * @returns {string[]}
 */
export function labelOptionsOf(model, selected) {
  /** @type {Set<string>} */
  const labels = new Set();
  // 보류도 필터 **이전** 집합에서 모은다 — 필터 뒤 목록에서 모으면 보류에만
  // 있는 라벨 A를 고른 순간 B 옵션이 사라져 다중 선택이 성립하지 않는다.
  for (const item of [
    ...model.runnable_all,
    ...model.deferred_all,
    ...model.queue,
    ...model.running,
    ...model.pr_wait,
    ...model.done
  ]) {
    for (const label of Array.isArray(item.labels) ? item.labels : []) {
      if (typeof label === 'string' && label.length > 0) {
        labels.add(label);
      }
    }
  }
  for (const label of selected) {
    labels.add(label);
  }
  return [...labels].sort((a, b) => a.localeCompare(b));
}

/**
 * The 라벨 필터 button and its check-list popover (UI-p7s2 §6). 열림은 이 조작
 * 자신이 들고 있다 — 판정 칩 팝업은 bead 하나에 매인 열림 키를 쓰므로 카드 밖
 * 조작이 올라탈 자리가 없다.
 *
 * @param {{ selected: string[], options: string[], open: boolean }} input
 * @returns {import('lit-html').TemplateResult}
 */
function labelFilterTemplate({ selected, options, open }) {
  return html`<div class="worker-filter__labels">
    <button
      type="button"
      class="ui-chip worker-filter__chip worker-filter__labels-btn${selected.length >
      0
        ? ' is-active'
        : ''}"
      aria-expanded=${open ? 'true' : 'false'}
      title="라벨 필터"
    >
      라벨${selected.length > 0 ? ` ${selected.length}` : ''} ▾
    </button>
    ${open
      ? html`<div class="chip-popover worker-filter__labels-pop">
          ${options.length === 0
            ? html`<div class="chip-popover__line">라벨 없음</div>`
            : options.map(
                (label) =>
                  html`<label class="worker-filter__label-option">
                    <input
                      type="checkbox"
                      class="worker-filter__label-check"
                      data-label=${label}
                      .checked=${selected.includes(label)}
                    />
                    ${label}
                  </label>`
              )}
        </div>`
      : ''}
  </div>`;
}

/**
 * The three Board-inherited filter axes — 우선순위 칩·타입 select·라벨 팝오버 — as
 * sibling nodes of the `.worker-filter` strip. Each control carries the count it
 * alone hides, so "왜 안 보이지" has an answer without opening anything.
 *
 * @param {{ priorities: number[], type: string, labels: string[], label_options: string[], labels_open: boolean, hidden: { priority: number, type: number, label: number } }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function fieldFiltersTemplate({
  priorities,
  type,
  labels,
  label_options,
  labels_open,
  hidden
}) {
  return html`<div
      class="worker-filter__priorities"
      role="group"
      aria-label="우선순위 필터"
    >
      ${PRIORITY_FILTER_OPTIONS.map(
        (o) =>
          html`<button
            type="button"
            class="ui-chip worker-filter__chip worker-filter__priority${priorities.includes(
              o.value
            )
              ? ' is-active'
              : ''}"
            data-priority=${String(o.value)}
            aria-pressed=${priorities.includes(o.value) ? 'true' : 'false'}
          >
            ${o.label}
          </button>`
      )}
      ${hidden.priority > 0
        ? html`<span class="worker-filter__hidden"
            >숨김 ${hidden.priority}</span
          >`
        : ''}
    </div>
    <select
      class="ui-select ui-select--bare worker-sort worker-filter__type"
      aria-label="타입 필터"
    >
      ${TYPE_FILTER_OPTIONS.map(
        (o) =>
          html`<option value=${o.value} ?selected=${type === o.value}>
            ${o.label}
          </option>`
      )}
    </select>
    ${hidden.type > 0
      ? html`<span class="worker-filter__hidden">숨김 ${hidden.type}</span>`
      : ''}
    ${labelFilterTemplate({
      selected: labels,
      options: label_options,
      open: labels_open
    })}
    ${hidden.label > 0
      ? html`<span class="worker-filter__hidden">숨김 ${hidden.label}</span>`
      : ''}`;
}

/**
 * Candidate pane sort select (UI-raqh §2, chain in UI-d13v §4.4). The value is
 * `custom` for as long as the chain row is open, whatever the stored state
 * turned out to be — an edit that happens to land on a preset must not yank the
 * row shut under the cursor (§4.3 still stores it as that preset).
 *
 * @param {{ sort: CandidateSortState, chain_open: boolean, extra_class?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateSortSelectTemplate({ sort, chain_open, extra_class }) {
  const current = chain_open ? 'custom' : presetIdOf(sort) || 'custom';
  return html`<select
    class="ui-select ui-select--bare worker-sort${extra_class
      ? ` ${extra_class}`
      : ''}"
    aria-label="후보 정렬"
    title="후보 정렬"
    .value=${current}
  >
    ${CANDIDATE_SORT_PRESETS.map(
      (o) =>
        html`<option value=${o.id} ?selected=${current === o.id}>
          ${o.label}
        </option>`
    )}
    <option value="custom" ?selected=${current === 'custom'}>
      사용자 지정…
    </option>
  </select>`;
}

/**
 * The chain editor row (§4.4): three key selects, each with a direction toggle,
 * on ONE line directly under the pane header. A step whose key is `없음` renders
 * no toggle: the row draws only what it has material for, and a direction
 * without a key answers nothing.
 *
 * @param {CandidateSortState} sort
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateSortChainTemplate(sort) {
  const chain = chainOf(sort);
  return html`<div
    class="worker-sort-chain"
    role="group"
    aria-label="후보 정렬 체인"
  >
    ${[0, 1, 2].map((index) => {
      const step = chain[index];
      return html`<span class="worker-sort-chain__step">
        <select
          class="ui-select ui-select--bare worker-sort-chain__key"
          data-step=${index}
          aria-label=${`${index + 1}차 정렬 키`}
          .value=${step ? step.key : ''}
        >
          ${index === 0
            ? ''
            : html`<option value="" ?selected=${!step}>없음</option>`}
          ${SORT_KEY_OPTIONS.map(
            (o) =>
              html`<option
                value=${o.key}
                ?selected=${!!step && step.key === o.key}
              >
                ${o.label}
              </option>`
          )}
        </select>
        ${step
          ? html`<button
              type="button"
              class="op-btn op-btn--icon worker-sort-chain__dir"
              data-step=${index}
              aria-label=${step.dir === 'asc' ? '오름차순' : '내림차순'}
              title=${step.dir === 'asc' ? '오름차순' : '내림차순'}
            >
              ${step.dir === 'asc' ? '↑' : '↓'}
            </button>`
          : ''}
      </span>`;
    })}
  </div>`;
}
