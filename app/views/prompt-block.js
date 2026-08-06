/**
 * Shared rendering for the three prompt-inspection surfaces (UI-rxp3 §4/§5):
 * the ⚙ dialog's worker system prompt, the issue detail panel's task prompt,
 * and the transcript drawer's per-attempt send.
 *
 * The three differ in WHAT they fetch and WHERE they sit; they agree on how a
 * prompt body and its loading/error/missing states look, which is all this
 * module owns. No prompt text lives here — every string comes from the server,
 * whose `preamble.js` is the single owner (§4).
 */
import { html } from 'lit-html';

/**
 * @typedef {Object} PromptFetchState
 * @property {boolean} [loading] - A request is in flight.
 * @property {boolean} [error] - The request failed; the section says so and
 * nothing else on the page is affected (§6).
 * @property {any} [data] - The reply payload, or null before the first fetch.
 */

/**
 * One labelled prompt body. TEXT binding — the prompt is assembled from bead
 * ids and repo declarations, so lit-html's escaping is what handles it.
 *
 * @param {string} label
 * @param {string} text
 * @returns {import('lit-html').TemplateResult}
 */
export function promptBlockTemplate(label, text) {
  return html`<div class="prompt-block">
    <div class="prompt-block__label">${label}</div>
    <pre class="prompt-block__body">${text}</pre>
  </div>`;
}

/**
 * The non-content states, or '' when there is content to render instead.
 *
 * @param {PromptFetchState} state
 * @returns {import('lit-html').TemplateResult|''}
 */
export function promptStatusTemplate(state) {
  if (state.loading) {
    return html`<div class="prompt-block__status">불러오는 중…</div>`;
  }
  if (state.error) {
    return html`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`;
  }
  return '';
}

/**
 * Format an epoch-ms timestamp for the "기록 시각" line, or '' when the record
 * carries none (a spawn whose start time was never stamped).
 *
 * @param {unknown} at
 * @returns {string}
 */
export function formatRecordedAt(at) {
  if (typeof at !== 'number' || !Number.isFinite(at)) {
    return '';
  }
  const d = new Date(at);
  const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
