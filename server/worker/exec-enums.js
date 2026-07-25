/**
 * Shared exec-setting enums — the SINGLE source of truth for the 4 worker
 * exec-preference keys (orchestration_model / orchestration_effort /
 * review_model / impl_model).
 *
 * Consumed by:
 *   - queue-store.js: workspace-global default validation + persistence
 *     normalize (`exec_defaults`), and the `setExecDefault` mutation enum.
 *   - policy.js: dispatch resolution (`resolveExecSettings`).
 *   - ws/mutation-handlers.js: the per-bead detail-panel edit surface, which
 *     synthesizes the extra `workflow_mode` key on top of these 4.
 *
 * `workflow_mode` is intentionally NOT part of this table — it is a per-bead
 * metadata key only, never a workspace-global default (spec 비-목표).
 *
 * The runner axis is retired (worker-phase1 §4): the worker runs claude only,
 * so there is no `worker_runner` key and no runner↔model cross-compatibility to
 * enforce. `review_model` keeps its `codex` option because its consumer is the
 * workflow skill inside the session, not the worker launcher.
 */

/** Orchestration models (claude catalog — the only runner). */
export const MODELS = ['opus', 'sonnet', 'haiku', 'fable'];

/** orchestration_effort levels. */
export const EFFORTS = ['low', 'medium', 'high', 'xhigh'];

/** review_model options (consumed by the workflow skill, not the worker). */
export const REVIEW_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];

/** impl_model options (consumed by the workflow skill, not the worker). */
export const IMPL_MODELS = ['opus', 'fable', 'sonnet', 'haiku'];

/**
 * Allowed values per exec-preference key — the 4 workspace-global-capable keys
 * (`workflow_mode` excluded).
 *
 * @type {Record<string, ReadonlyArray<string>>}
 */
export const EXEC_SETTING_ENUMS = {
  orchestration_model: MODELS,
  orchestration_effort: EFFORTS,
  review_model: REVIEW_MODELS,
  impl_model: IMPL_MODELS
};
