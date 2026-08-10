import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} ArtifactRow
 * @property {'spec'|'plan'} kind
 * @property {string} path
 * @property {'plan_pending'|null} missing_state
 */

/**
 * @typedef {Object} ArtifactHandlers
 * @property {(ev: Event, path: string) => void} onCopyPath - Path click = copy to clipboard.
 * @property {(ev: Event, path: string, missing_state: 'plan_pending'|null) => void} onOpenDoc - "열기" = open md viewer.
 */

/**
 * Whether metadata records that plan authoring progressed beyond path pinning.
 *
 * @param {Record<string, any>} metadata
 */
function hasPlanAuthoringHistory(metadata) {
  return ['plan_review', 'plan_approval', 'plan_check'].some((key) => {
    const value = metadata[key];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

/**
 * Collect artifact rows from issue metadata (spec_id / plan_path).
 *
 * @param {{ metadata?: Record<string, any> }} issue
 * @returns {ArtifactRow[]}
 */
export function collectArtifacts(issue) {
  const md = (issue && issue.metadata) || {};
  /** @type {ArtifactRow[]} */
  const rows = [];
  if (typeof md.spec_id === 'string' && md.spec_id.trim().length > 0) {
    rows.push({
      kind: 'spec',
      path: md.spec_id.trim(),
      missing_state: null
    });
  }
  if (typeof md.plan_path === 'string' && md.plan_path.trim().length > 0) {
    rows.push({
      kind: 'plan',
      path: md.plan_path.trim(),
      missing_state: hasPlanAuthoringHistory(md) ? null : 'plan_pending'
    });
  }
  return rows;
}

/**
 * Artifacts section (detail-panel.html): spec/plan paths. Clicking the path
 * copies it; the "열기" button opens the md viewer.
 *
 * @param {{ metadata?: Record<string, any> }} issue
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
