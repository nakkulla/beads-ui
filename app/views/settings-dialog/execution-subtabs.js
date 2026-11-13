import { html } from 'lit-html';

/** @typedef {'worker'|'quick_fix'|'session_review'|'hermes'|'resolution'} ExecutionSubtab */

/**
 * @param {ExecutionSubtab} selected
 * @param {(tab: ExecutionSubtab) => void} onSelect
 */
export function executionSubtabs(selected, onSelect) {
  /** @type {Array<[ExecutionSubtab, string]>} */
  const tabs = [
    ['worker', '워커'],
    ['quick_fix', 'quick fix'],
    ['session_review', '세션 리뷰'],
    ['hermes', 'Hermes 세션'],
    ['resolution', '해소 세션']
  ];
  return html`<div
    class="settings-dialog__seg"
    role="group"
    aria-label="실행 설정 구분"
  >
    ${tabs.map(
      ([tab, label]) =>
        html`<button
          type="button"
          class=${`op-btn${selected === tab ? ' is-active' : ''}`}
          data-execution-subtab=${tab}
          aria-pressed=${selected === tab ? 'true' : 'false'}
          @click=${() => onSelect(tab)}
        >
          ${label}
        </button>`
    )}
  </div>`;
}

/** The session-only review explanation shared by both target modes. */
export const SESSION_REVIEW_NOTICE =
  'Worker는 이 두 리뷰를 돌리지 않습니다 · 이 저장소에서 여는 세션이 씁니다';
