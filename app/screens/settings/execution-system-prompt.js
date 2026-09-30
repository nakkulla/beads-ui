/**
 * The `워커` tab's read-only worker system prompt section. The contract is
 * server-assembled and fetched on the first expand; it moved to the `실행`
 * pane with the retired exec-defaults dialog (UI-rxp3 §4) and out of
 * `execution-pane.js` into this module (UI-dbn6).
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {Object} SystemPromptContext
 * @property {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @property {() => void} doRender
 */
import { html } from 'lit-html';
import {
  promptBlockTemplate,
  promptStatusTemplate
} from '../../ui/prompt-block.js';

/**
 * Hold the section's expand and fetch state.
 *
 * @param {SystemPromptContext} ctx
 */
export function createSystemPromptSection(ctx) {
  const { send, doRender } = ctx;

  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;

  /** Fetch the assembled contract; the client holds no copy to drift from it. */
  async function fetchSystemPrompt() {
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await send('get-worker-system-prompt', {});
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
      }
    } catch {
      prompt_error = true;
    } finally {
      prompt_loading = false;
      doRender();
    }
  }

  function toggleSystemPrompt() {
    prompt_expanded = !prompt_expanded;
    if (prompt_expanded && !prompt_data) {
      void fetchSystemPrompt();
      return;
    }
    doRender();
  }

  /**
   * @returns {TemplateResult|''}
   */
  function systemPromptBody() {
    const status = promptStatusTemplate({
      loading: prompt_loading,
      error: prompt_error
    });
    if (status) {
      return status;
    }
    if (!prompt_data) {
      return '';
    }
    const variants = Array.isArray(prompt_data.variants)
      ? prompt_data.variants
      : [];
    return html`<div class="settings-dialog__sp-body">
      ${prompt_data.target_base_placeholder
        ? html`<div class="prompt-block__meta">
            \`${prompt_data.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`
        : ''}
      ${variants.map(
        (/** @type {any} */ v) =>
          html`<div class="settings-dialog__sp-variant" data-variant=${v.key}>
            <div class="settings-dialog__sp-cond">${v.condition}</div>
            ${promptBlockTemplate(v.label, v.system_prompt)}
          </div>`
      )}
    </div>`;
  }

  /**
   * @returns {TemplateResult}
   */
  function systemPromptSection() {
    return html`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="ui-btn ui-btn--ghost ui-btn--sm"
        data-seam="system-prompt-toggle"
        aria-expanded=${prompt_expanded ? 'true' : 'false'}
        @click=${toggleSystemPrompt}
      >
        ${prompt_expanded ? '접기' : '전문 보기'}
      </button>
      ${prompt_expanded ? systemPromptBody() : ''}
    </section>`;
  }

  return { systemPromptSection };
}
