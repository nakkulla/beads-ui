import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} WorkflowStage
 * @property {'none'|'dim'|'full'} [fill]
 * @property {'review'|'skip'|null} [glyph]
 * @property {boolean} [stale]
 * @property {string | null} [receipt]
 * @property {string | null} [approval_receipt]
 * @property {'missing'|'fresh'|'stale'|'unknown'|'legacy'} [approval_state]
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

/** Server `glyph` axis → cell character. The contract owns this split. */
const GLYPH = { review: '✓', skip: '⊘' };

/** Stage field combination → accessible-name phrase (spec §8). */
const STATE_TEXT = {
  none: '미도달',
  dim: '진행 중',
  stale: '재검토 필요',
  review: '검토 완료',
  skip: '검토 생략',
  done: '완료'
};

/**
 * Derive the "current" cell — the one that blinks. Deterministic rule: it
 * appears only while the issue is actively progressing (status
 * in_progress|resolved), and lands on the first route-ordered stage that is
 * `dim` AND fresh. A stale cell is `dim` too, but it means "needs action", not
 * "in progress", so it is skipped (spec §6). A card that is open/closed marks
 * nothing.
 *
 * @param {string[]} order
 * @param {Record<string, WorkflowStage>} stages
 * @param {string} status
 * @returns {string | null}
 */
function currentStageKey(order, stages, status) {
  const active = status === 'in_progress' || status === 'resolved';
  if (!active) {
    return null;
  }
  for (const key of order) {
    const stage = stages[key];
    if (stage && stage.fill === 'dim' && stage.stale !== true) {
      return key;
    }
  }
  return null;
}

/**
 * Accessible phrase for one stage, from the three server fields (spec §8). The
 * `fill === 'dim'` rows never collide: the server guarantees a stale cell is
 * downgraded to `dim`, so `stale` is checked first.
 *
 * @param {WorkflowStage} stage
 * @returns {string}
 */
function stageStateText(stage) {
  const fill = (stage && stage.fill) || 'none';
  if (fill === 'none') {
    return STATE_TEXT.none;
  }
  if (stage && stage.stale === true) {
    return STATE_TEXT.stale;
  }
  if (fill === 'dim') {
    return STATE_TEXT.dim;
  }
  if (stage && stage.glyph === 'review') {
    return STATE_TEXT.review;
  }
  if (stage && stage.glyph === 'skip') {
    return STATE_TEXT.skip;
  }
  return STATE_TEXT.done;
}

/**
 * Accessible plan state keeps review evidence and native approval distinct
 * while the visual cell continues to reuse the existing glyph/fill vocabulary.
 *
 * @param {WorkflowStage} stage
 * @returns {string}
 */
function planStageStateText(stage) {
  if (!stage || stage.fill === 'none' || !stage.approval_state) {
    return stageStateText(stage);
  }
  /** @type {string[]} */
  const parts = [];
  if (stage.glyph === 'review') {
    parts.push(STATE_TEXT.review);
  } else if (stage.glyph === 'skip') {
    parts.push(STATE_TEXT.skip);
  }
  if (stage.approval_state === 'missing') {
    parts.push('승인 필요');
  } else if (stage.approval_state === 'stale') {
    parts.push('재승인 필요');
  } else if (stage.approval_state === 'unknown') {
    parts.push('승인 확인 불가');
  } else {
    parts.push('승인 완료');
  }
  return parts.join(' · ');
}

/**
 * Render one stepper segment (bar + label). The server already resolved the
 * three axes; this only maps them onto classes and the glyph character, and
 * pairs the current cell with an inline stage-on color so `currentColor`
 * resolves to the bright hue for the reduced-motion glow fallback.
 *
 * @param {string} key
 * @param {WorkflowStage} stage
 * @param {boolean} current
 * @returns {TemplateResult}
 */
function segTemplate(key, stage, current) {
  const c = /** @type {Record<string, string>} */ (STAGE_CLASS)[key] || key;
  const fill = (stage && stage.fill) || 'none';
  const stale = !!stage && stage.stale === true;
  const glyph =
    /** @type {Record<string, string>} */ (GLYPH)[
      (stage && stage.glyph) || ''
    ] || '';
  let bar_class = 'bar';
  if (fill === 'dim') {
    bar_class += ` b-${c} dim`;
  } else if (fill === 'full') {
    bar_class += ` b-${c} full`;
  }
  if (stale) {
    bar_class += ' stale';
  }
  if (current) {
    bar_class += ' cur';
  }
  const lbl_class = fill === 'none' ? 'lbl' : `lbl l-${c} on`;
  const style = current ? `color: var(--stage-${c}-on)` : '';
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
  const current_key = currentStageKey(order, stages, String(status || 'open'));
  // `role="img"` replaces child content in the a11y tree, so per-segment labels
  // would never surface — the whole progress state goes in one container label
  // (spec §8).
  const aria_label = `워크플로우 진행: ${order
    .map(
      (key) =>
        `${/** @type {Record<string, string>} */ (STAGE_LABEL)[key] || key} ${key === 'plan' ? planStageStateText(stages[key] || {}) : stageStateText(stages[key] || {})}`
    )
    .join(' · ')}`;
  return html`
    <div class="stp" role="img" aria-label=${aria_label}>
      ${order.map((key) =>
        segTemplate(key, stages[key] || {}, key === current_key)
      )}
    </div>
  `;
}
