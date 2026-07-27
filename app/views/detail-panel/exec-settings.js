import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * Orchestration models. Mirrors the server enum in server/worker/exec-enums.js
 * (claude is the worker's only runner — worker-phase1 §4).
 */
export const MODELS = ['opus', 'sonnet', 'haiku', 'fable'];

export const EFFORTS = ['low', 'medium', 'high', 'xhigh'];
export const REVIEW_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];
export const IMPL_MODELS = ['opus', 'fable', 'sonnet', 'haiku'];
/** Stored workflow_mode values; `standard` records as key removal (unset). */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

/**
 * `(기본)` labels for each exec key = what actually runs when NEITHER the bead
 * NOR the workspace-global exec_defaults set the key (the final fallback layer:
 * hardcoded / CLI / workflow default). Used verbatim by the ⚙ global dialog (it
 * edits the global layer, so its `(기본)` IS this fallback), and as the
 * detail-panel fallback when no global override exists (spec §3).
 *
 * MIRROR: keep in sync with the resolution fallbacks —
 *   - orchestration_model: hardcoded `opus` (policy.js
 *     ORCHESTRATION_MODEL_FALLBACK), so `--model opus` is always passed.
 *   - orchestration_effort: no `--effort` passed ⇒ the claude CLI's own default
 *     (claude.js buildArgv omits the flag when unset).
 *   - review_model: session workflow gate default `codex`.
 *   - impl_model: workflow delegation tier auto (complex=opus / boundary=sonnet).
 *
 * @type {Record<string, string>}
 */
export const DEFAULT_LABELS = {
  orchestration_model: '(기본: opus)',
  orchestration_effort: '(기본: CLI 기본)',
  review_model: '(기본: codex)',
  impl_model: '(기본: 티어 자동)'
};

/**
 * The `(기본)` option label for a key on the detail-panel (bead) surface: a bead
 * left unset falls through to the workspace-global exec_defaults FIRST, so when a
 * global override exists show it (`(기본: <값> — 전역)`); otherwise the static
 * final-fallback label (spec §3.2).
 *
 * @param {string} key
 * @param {Record<string, any>} globals - Workspace-global exec_defaults.
 * @returns {string}
 */
export function defaultLabelFor(key, globals) {
  const g = globals && globals[key];
  if (typeof g === 'string' && g.length > 0) {
    return `(기본: ${g} — 전역)`;
  }
  return DEFAULT_LABELS[key] || '(기본)';
}

/**
 * @typedef {Object} ExecSettingsHandlers
 * @property {(key: string, value: string) => void} onChange
 */

/**
 * Build one labelled `<select>` row (detail-panel.html `.kv`).
 *
 * @param {string} key
 * @param {string} label
 * @param {{ value: string, label: string }[]} options
 * @param {string} selected
 * @param {boolean} highlight
 * @param {ExecSettingsHandlers} handlers
 * @returns {TemplateResult}
 */
function selectRow(key, label, options, selected, highlight, handlers) {
  return html`
    <div class="detail-kv">
      <span class="detail-kv__k">${label}</span>
      <select
        class=${highlight ? 'detail-kv__v detail-kv__v--sel' : 'detail-kv__v'}
        aria-label=${label}
        data-key=${key}
        @change=${(/** @type {Event} */ ev) =>
          handlers.onChange(
            key,
            /** @type {HTMLSelectElement} */ (ev.target).value
          )}
      >
        ${options.map(
          (opt) =>
            html`<option value=${opt.value} ?selected=${opt.value === selected}>
              ${opt.label}
            </option>`
        )}
      </select>
    </div>
  `;
}

/**
 * Build select options, optionally prefixed with an unset `(기본…)` option.
 *
 * @param {string[]} values
 * @param {string} [default_label] - Label for the unset option; omit for none.
 * @returns {{ value: string, label: string }[]}
 */
function toOptions(values, default_label) {
  const opts = values.map((v) => ({ value: v, label: v }));
  return typeof default_label === 'string'
    ? [{ value: '', label: default_label }, ...opts]
    : opts;
}

/**
 * Execution-settings editor (detail-panel.html "실행 설정"): the 4 exec keys +
 * workflow_mode. Selecting `standard` for workflow_mode (or `(기본)` for a key)
 * records an unset — the server mutation removes the metadata key.
 *
 * @param {{ metadata?: Record<string, any> }} effective_issue - Issue whose `metadata` carries the effective (metadata + in-flight edits) values.
 * @param {ExecSettingsHandlers} handlers
 * @param {Record<string, any>} [exec_defaults] - Workspace-global exec defaults
 * (queue snapshot). A bead-unset key resolves through these first, so they drive
 * the `(기본)` label (§3.2).
 * @returns {TemplateResult}
 */
export function execSettingsTemplate(effective_issue, handlers, exec_defaults) {
  const md = (effective_issue && effective_issue.metadata) || {};
  const globals =
    exec_defaults && typeof exec_defaults === 'object' ? exec_defaults : {};
  const wf_mode = md.workflow_mode === 'fast_track' ? 'fast_track' : 'standard';
  return html`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${selectRow(
      'orchestration_model',
      'orchestration_model',
      toOptions(MODELS, defaultLabelFor('orchestration_model', globals)),
      md.orchestration_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'orchestration_effort',
      'orchestration_effort',
      toOptions(EFFORTS, defaultLabelFor('orchestration_effort', globals)),
      md.orchestration_effort || '',
      false,
      handlers
    )}
    ${selectRow(
      'review_model',
      'review_model',
      toOptions(REVIEW_MODELS, defaultLabelFor('review_model', globals)),
      md.review_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'impl_model',
      'impl_model',
      toOptions(IMPL_MODELS, defaultLabelFor('impl_model', globals)),
      md.impl_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'workflow_mode',
      'workflow_mode',
      toOptions(WORKFLOW_MODES),
      wf_mode,
      md.workflow_mode === 'fast_track',
      handlers
    )}
  `;
}
