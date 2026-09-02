import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} ArtifactRow
 * @property {'spec'|'plan'} kind
 * @property {string} path
 * @property {'plan_pending'|'spec_draft'|null} missing_state
 */

/**
 * @typedef {Object} ArtifactDoc
 * @property {string} path
 * @property {'plan_pending'|'spec_draft'|null} missing_state
 */

/**
 * @typedef {Object} ArtifactHandlers
 * @property {(ev: Event, path: string) => void} onCopyPath - Path click = copy to clipboard.
 * @property {(ev: Event, path: string, missing_state: 'plan_pending'|'spec_draft'|null) => void} onOpenDoc - "열기" = open md viewer.
 */

/**
 * Collect artifact rows from the server's workflow stage document verdicts.
 *
 * @param {{ workflow?: { stages?: { spec?: { doc?: ArtifactDoc }, plan?: { doc?: ArtifactDoc } } } } & Record<string, any>} issue
 * @returns {ArtifactRow[]}
 */
export function collectArtifacts(issue) {
  /** @type {ArtifactRow[]} */
  const rows = [];
  const stages = issue?.workflow?.stages;
  const spec_doc = stages?.spec?.doc;
  if (spec_doc) {
    rows.push({
      kind: 'spec',
      path: spec_doc.path,
      missing_state: spec_doc.missing_state
    });
  }
  const plan_doc = stages?.plan?.doc;
  if (plan_doc) {
    rows.push({
      kind: 'plan',
      path: plan_doc.path,
      missing_state: plan_doc.missing_state
    });
  }
  return rows;
}

/**
 * Artifacts section (detail-panel.html): spec/plan paths. Clicking the path
 * copies it; the "열기" button opens the md viewer.
 *
 * @param {{ workflow?: { stages?: { spec?: { doc?: ArtifactDoc }, plan?: { doc?: ArtifactDoc } } } } & Record<string, any>} issue
 * @param {ArtifactHandlers} handlers
 * @returns {TemplateResult}
 */
export function artifactsTemplate(issue, handlers) {
  const rows = collectArtifacts(issue);
  return html`
    <div class="detail-section-label">Artifacts</div>
    ${rows.length === 0
      ? html`<div class="detail-empty">산출물 없음</div>`
      : html`
          ${rows.map(
            (row) =>
              html`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${row.path} · 클릭하면 복사`}
                  @click=${(/** @type {Event} */ ev) =>
                    handlers.onCopyPath(ev, row.path)}
                >
                  ${row.path}
                </button>
                ${row.missing_state === 'spec_draft'
                  ? html`<span class="detail-art__badge">draft</span>`
                  : null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${(/** @type {Event} */ ev) =>
                    handlers.onOpenDoc(ev, row.path, row.missing_state)}
                >
                  열기
                </button>
              </div>`
          )}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `;
}
