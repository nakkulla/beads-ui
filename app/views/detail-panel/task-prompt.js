import { html } from 'lit-html';
import {
  formatRecordedAt,
  promptBlockTemplate,
  promptStatusTemplate
} from '../prompt-block.js';

/**
 * The issue detail panel's "과업 프롬프트" section (UI-rxp3 §5): what the worker
 * last sent for THIS bead, fetched on demand and collapsed by default.
 *
 * Collapsed by default because the send is multi-kilobyte and a reader opening
 * an issue is almost never asking for it — and because collapsed means the
 * request only fires when someone actually wants the answer. A bead that was
 * never dispatched has no record; the server answers with the default task
 * prompt the next dispatch WOULD send, and this renders it as a preview rather
 * than claiming it was sent.
 *
 * The section stands on `transport` alone, so it works on a detail panel opened
 * without ever visiting the Worker tab (no queue subscription involved).
 *
 * @typedef {Object} TaskPromptState
 * @property {boolean} expanded
 * @property {boolean} [loading]
 * @property {boolean} [error]
 * @property {any} [data]
 */

/**
 * @param {TaskPromptState} state
 * @param {{ onToggle?: () => void }} [handlers]
 * @returns {import('lit-html').TemplateResult}
 */
export function taskPromptTemplate(state, handlers = {}) {
  return html`
    <div class="detail-section-label">
      과업 프롬프트
      <button
        type="button"
        class="detail-prompt__toggle"
        data-seam="task-prompt-toggle"
        aria-expanded=${state.expanded ? 'true' : 'false'}
        title=${state.expanded ? '접기' : '워커가 보낸 프롬프트 보기'}
        @click=${() => handlers.onToggle && handlers.onToggle()}
      >
        ${state.expanded ? '접기' : '펼치기'}
      </button>
    </div>
    ${state.expanded
      ? html`<div class="detail-prompt" data-seam="task-prompt">
          ${bodyTemplate(state)}
        </div>`
      : ''}
  `;
}

/**
 * @param {TaskPromptState} state
 * @returns {import('lit-html').TemplateResult|''}
 */
function bodyTemplate(state) {
  const status = promptStatusTemplate(state);
  if (status) {
    return status;
  }
  const data = state.data;
  if (!data) {
    return '';
  }
  if (data.missing) {
    return html`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof data.default_task_prompt === 'string'
        ? promptBlockTemplate('예상 기본 과업', data.default_task_prompt)
        : ''}`;
  }
  const recorded_at = formatRecordedAt(data.recorded_at);
  return html`<div class="detail-prompt__meta">
      ${data.attempt_id}${recorded_at ? ` · ${recorded_at}` : ''}
    </div>
    ${typeof data.task_prompt === 'string'
      ? promptBlockTemplate('과업 (user)', data.task_prompt)
      : ''}
    ${typeof data.system_prompt === 'string'
      ? promptBlockTemplate(
          '시스템 계약 (--append-system-prompt)',
          data.system_prompt
        )
      : ''}`;
}
