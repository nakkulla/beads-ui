/**
 * 표시 tab — the per-workspace label/chip display policy, ported from the
 * retired standalone display-settings dialog (spec §D).
 *
 * Rendering only: every write goes back through the dialog shell so all three
 * tabs share one CAS/notification path.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */
import { html } from 'lit-html';
import { isLabelVisible } from '../../utils/label-policy.js';

/**
 * The six derived-chip toggles, in display order.
 *
 * @type {ReadonlyArray<[string, string]>}
 */
export const CHIP_TOGGLES = [
  ['route', 'route 칩'],
  ['fast_track', '⚡ fast_track 칩'],
  ['pr', 'PR 칩'],
  ['from', '↩ from 칩'],
  ['blocked', 'blocked 사유 칩'],
  ['stepper', 'stepper']
];

/**
 * Why a label is currently not rendered — this decides what a pill click means.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @returns {'shown'|'hidden_exact'|'hidden_prefix'}
 */
export function labelPillState(label, policy) {
  if (isLabelVisible(label, policy)) {
    return 'shown';
  }
  return policy.hidden_labels.includes(label)
    ? 'hidden_exact'
    : 'hidden_prefix';
}

/**
 * @param {DisplayPolicy} policy
 * @param {string[]} labels
 * @param {(label: string) => void} onPillClick
 * @returns {TemplateResult}
 */
export function labelsSection(policy, labels, onPillClick) {
  return html`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${labels.length === 0
        ? html`<div class="settings-dialog__empty">라벨 없음</div>`
        : html`<div class="settings-dialog__pills">
            ${labels.map((label) => {
              const pill_state = labelPillState(label, policy);
              return html`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${pill_state}`}
                data-label=${label}
                data-state=${pill_state}
                @click=${() => onPillClick(label)}
              >
                ${label}
              </button>`;
            })}
          </div>`}
    </section>
  `;
}

/**
 * @param {DisplayPolicy} policy
 * @param {string} draft
 * @param {{ onDraft: (value: string) => void, onAdd: () => void, onRemove: (prefix: string) => void }} handlers
 * @returns {TemplateResult}
 */
export function prefixesSection(policy, draft, handlers) {
  return html`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${policy.hidden_prefixes.map(
          (prefix) =>
            html`<span class="settings-dialog__prefix">
              ${prefix}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${prefix} 규칙 제거`}
                @click=${() => handlers.onRemove(prefix)}
              >
                ×
              </button>
            </span>`
        )}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${draft}
          @input=${(/** @type {Event} */ ev) =>
            handlers.onDraft(
              String(/** @type {HTMLInputElement} */ (ev.target).value || '')
            )}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${handlers.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `;
}

/**
 * @param {DisplayPolicy} policy
 * @param {(chip: string) => void} onToggle
 * @returns {TemplateResult}
 */
export function chipsSection(policy, onToggle) {
  return html`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${CHIP_TOGGLES.map(
          ([chip, label]) =>
            html`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${chip}
                .checked=${/** @type {any} */ (policy.chips)[chip] !== false}
                @change=${() => onToggle(chip)}
              />
              <span>${label}</span>
            </label>`
        )}
      </div>
    </section>
  `;
}
