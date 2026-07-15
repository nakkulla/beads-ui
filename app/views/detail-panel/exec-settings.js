import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/** Runners (worker_runner). ccx = claude-code-proxy. */
export const RUNNERS = ['claude', 'codex', 'ccx'];

/**
 * Runner-specific orchestration model catalogs. ccx reuses claude's models.
 * Mirrors the server enum in server/ws/mutation-handlers.js.
 */
export const RUNNER_MODELS = {
  claude: ['opus', 'sonnet', 'haiku', 'fable'],
  codex: ['gpt-5.6', 'gpt-5.4'],
  ccx: ['opus', 'sonnet', 'haiku', 'fable']
};

export const EFFORTS = ['low', 'medium', 'high', 'xhigh'];
export const REVIEW_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];
export const IMPL_MODELS = ['opus', 'fable', 'sonnet', 'haiku'];
/** Stored workflow_mode values; `standard` records as key removal (unset). */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

/**
 * Orchestration models available for a runner (defaults to claude's set).
 *
 * @param {string | undefined} runner
 * @returns {string[]}
 */
export function modelsForRunner(runner) {
  return (
    /** @type {Record<string, string[]>} */ (RUNNER_MODELS)[
      String(runner || 'claude')
    ] || RUNNER_MODELS.claude
  );
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
 * @param {string[]} values
 * @param {boolean} [with_default]
 * @returns {{ value: string, label: string }[]}
 */
function toOptions(values, with_default = true) {
  const opts = values.map((v) => ({ value: v, label: v }));
  return with_default ? [{ value: '', label: '(기본)' }, ...opts] : opts;
}

/**
 * Execution-settings editor (detail-panel.html "실행 설정"): the 5 exec keys +
 * workflow_mode. Model options are filtered by the chosen runner. Selecting
 * `standard` for workflow_mode (or `(기본)` for a key) records an unset — the
 * server mutation removes the metadata key.
 *
 * @param {{ metadata?: Record<string, any> }} effective_issue - Issue whose `metadata` carries the effective (metadata + in-flight edits) values.
 * @param {ExecSettingsHandlers} handlers
 * @returns {TemplateResult}
 */
export function execSettingsTemplate(effective_issue, handlers) {
  const md = (effective_issue && effective_issue.metadata) || {};
  const runner = md.worker_runner || '';
  const wf_mode = md.workflow_mode === 'fast_track' ? 'fast_track' : 'standard';
  return html`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${selectRow(
      'worker_runner',
      'worker_runner',
      toOptions(RUNNERS),
      runner,
      !!runner,
      handlers
    )}
    ${selectRow(
      'orchestration_model',
      'orchestration_model',
      toOptions(modelsForRunner(runner)),
      md.orchestration_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'orchestration_effort',
      'orchestration_effort',
      toOptions(EFFORTS),
      md.orchestration_effort || '',
      false,
      handlers
    )}
    ${selectRow(
      'review_model',
      'review_model',
      toOptions(REVIEW_MODELS),
      md.review_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'impl_model',
      'impl_model',
      toOptions(IMPL_MODELS),
      md.impl_model || '',
      false,
      handlers
    )}
    ${selectRow(
      'workflow_mode',
      'workflow_mode',
      toOptions(WORKFLOW_MODES, false),
      wf_mode,
      md.workflow_mode === 'fast_track',
      handlers
    )}
  `;
}
