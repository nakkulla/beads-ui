import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} WorkflowStage
 * @property {'empty'|'dim'|'on'|'reviewed'|'skip'|'stale'} state
 * @property {string | null} [receipt]
 * @property {boolean} [stale]
 */

/**
 * @typedef {Object} WorkflowSummary
 * @property {'spec_backed'|'full_plan'} route
 * @property {Record<string, WorkflowStage>} stages
 */

/** Stage key → CSS color-class suffix (mockup uses `mrg` for merge). */
const STAGE_CLASS = {
  spec: 'spec',
  plan: 'plan',
  impl: 'impl',
  pr: 'pr',
  merge: 'mrg'
};

/** Stage key → visible label text. */
const STAGE_LABEL = {
  spec: 'spec',
  plan: 'plan',
  impl: 'impl',
  pr: 'pr',
  merge: 'merge'
};

/** Route → ordered stage keys (spec_backed omits plan). */
const ROUTE_ORDER = {
  spec_backed: ['spec', 'impl', 'pr', 'merge'],
  full_plan: ['spec', 'plan', 'impl', 'pr', 'merge']
};

/** State → cell glyph. `stale` keeps ✓ but renders greyed via `.stale`. */
const GLYPH = { reviewed: '✓', skip: '⊘', stale: '✓' };

/**
 * Derive the "current in-progress" cell that receives the glow. Deterministic
 * rule (documented, matches board-card-final.html): glow appears only while the
 * issue is actively progressing (status in_progress|resolved), and lands on the
 * first route-ordered stage whose state is `dim` (artifact present, no receipt
 * yet). A card that is open/closed shows no glow.
 *
 * @param {string[]} order
 * @param {Record<string, WorkflowStage>} stages
 * @param {string} status
 * @returns {string | null}
 */
function glowStageKey(order, stages, status) {
  const active = status === 'in_progress' || status === 'resolved';
  if (!active) {
    return null;
  }
  for (const key of order) {
    if (stages[key] && stages[key].state === 'dim') {
      return key;
    }
  }
  return null;
}

/**
 * Render one stepper segment (bar + label). The server already computed the
 * per-stage `state` (incl. stale); this only maps state → classes/glyph and
 * pairs the glow cell with an inline stage-on color so `currentColor` resolves
 * to the bright hue for the box-shadow.
 *
 * @param {string} key
 * @param {WorkflowStage} stage
 * @param {boolean} glow
 * @returns {TemplateResult}
 */
function segTemplate(key, stage, glow) {
  const c = /** @type {Record<string, string>} */ (STAGE_CLASS)[key] || key;
  const state = (stage && stage.state) || 'empty';
  const glyph = /** @type {Record<string, string>} */ (GLYPH)[state] || '';
  let bar_class = 'bar';
  if (state === 'dim') {
    bar_class += ` b-${c} dim`;
  } else if (state === 'on' || state === 'reviewed' || state === 'skip') {
    bar_class += ` b-${c} on`;
  } else if (state === 'stale') {
    bar_class += ` b-${c} stale`;
  }
  if (glow) {
    bar_class += ' glow';
  }
  const lbl_class = state === 'empty' ? 'lbl' : `lbl l-${c} on`;
  const style = glow ? `color: var(--stage-${c}-on)` : '';
  return html`
    <div class="seg">
      <div class=${bar_class} style=${style}>${glyph}</div>
      <div class=${lbl_class}>
        ${/** @type {Record<string, string>} */ (STAGE_LABEL)[key] || key}
      </div>
    </div>
  `;
}

/**
 * Route-driven stepper (board-card-final.html). Consumes the server-computed
 * `workflow.stages` object — no client-side git/receipt logic.
 *
 * @param {WorkflowSummary | null | undefined} workflow
 * @param {string | undefined} status
 * @returns {TemplateResult | string}
 */
export function stepperTemplate(workflow, status) {
  if (!workflow || !workflow.stages) {
    return '';
  }
  const route = workflow.route === 'full_plan' ? 'full_plan' : 'spec_backed';
  const order = ROUTE_ORDER[route];
  const stages = workflow.stages;
  const glow_key = glowStageKey(order, stages, String(status || 'open'));
  return html`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${order.map((key) =>
        segTemplate(key, stages[key] || { state: 'empty' }, key === glow_key)
      )}
    </div>
  `;
}
