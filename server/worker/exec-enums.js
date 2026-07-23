/**
 * Shared exec-setting enums — the SINGLE source of truth for the 5 worker
 * exec-preference keys (worker_runner / orchestration_model /
 * orchestration_effort / review_model / impl_model).
 *
 * Consumed by:
 *   - queue-store.js: workspace-global default validation + persistence
 *     normalize (`exec_defaults`), and the `setExecDefault` mutation enum.
 *   - policy.js: dispatch resolution (`resolveExecSettings`).
 *   - ws/mutation-handlers.js: the per-bead detail-panel edit surface, which
 *     synthesizes the extra `workflow_mode` key on top of these 5.
 *
 * `workflow_mode` is intentionally NOT part of this table — it is a per-bead
 * metadata key only, never a workspace-global default (spec 비-목표). The
 * runner↔model cross-compatibility is likewise NOT encoded here: it is enforced
 * at dispatch resolve (resolveExecSettings) and by the UI option filter, so a
 * value passes this per-key enum on the union set.
 */

/** Runners (worker_runner). `ccx` = claude-code-proxy, reuses claude's models. */
export const RUNNERS = ['claude', 'codex', 'ccx'];

/**
 * Runner-specific orchestration model catalogs. `ccx` uses the same model set
 * as `claude`.
 *
 * @type {Record<string, ReadonlyArray<string>>}
 */
export const RUNNER_MODELS = {
  claude: ['opus', 'sonnet', 'haiku', 'fable'],
  codex: ['gpt-5.6', 'gpt-5.4'],
  ccx: ['opus', 'sonnet', 'haiku', 'fable']
};

/** Union of all orchestration models across runners (server enum, per-key set). */
export const ALL_ORCHESTRATION_MODELS = Array.from(
  new Set([...RUNNER_MODELS.claude, ...RUNNER_MODELS.codex])
);

/** orchestration_effort levels. */
export const EFFORTS = ['low', 'medium', 'high', 'xhigh'];

/** review_model options. */
export const REVIEW_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];

/** impl_model options. */
export const IMPL_MODELS = ['opus', 'fable', 'sonnet', 'haiku'];

/**
 * Allowed values per exec-preference key — the 5 workspace-global-capable keys
 * (`workflow_mode` excluded). `orchestration_model` uses the runner union.
 *
 * @type {Record<string, ReadonlyArray<string>>}
 */
export const EXEC_SETTING_ENUMS = {
  worker_runner: RUNNERS,
  orchestration_model: ALL_ORCHESTRATION_MODELS,
  orchestration_effort: EFFORTS,
  review_model: REVIEW_MODELS,
  impl_model: IMPL_MODELS
};
