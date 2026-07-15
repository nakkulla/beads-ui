import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * Session-history section — a clean seam for Phase 11 (live Worker session
 * transcripts). Renders a labelled placeholder only; no data wiring here.
 *
 * @returns {TemplateResult}
 */
export function sessionHistoryTemplate() {
  return html`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-empty" data-seam="session-history">
      세션 이력은 Worker 연동 후 표시됩니다 (Phase 11).
    </div>
  `;
}
