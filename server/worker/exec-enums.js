/**
 * Shared exec-setting enums — the SINGLE source of truth for the 10 worker
 * exec-preference keys (orchestration_model / orchestration_effort, the three
 * `*_review_model` / `*_review_effort` step pairs, and impl_model / impl_effort).
 *
 * Consumed by:
 *   - queue-store.js: workspace-global default validation + persistence
 *     normalize (`exec_defaults`), and the `setExecDefault` mutation enum.
 *   - policy.js: dispatch resolution (`resolveExecSettings`).
 *   - ws/mutation-handlers.js: the per-bead detail-panel edit surface, which
 *     synthesizes the extra `workflow_mode` key on top of these 10.
 *
 * `workflow_mode` is intentionally NOT part of this table — it is a per-bead
 * metadata key only, never a workspace-global default (spec 비-목표).
 *
 * The runner axis is retired (worker-phase1 §4): the runner is DERIVED from the
 * resolved model through the catalog's globally-unique model names, so there is
 * no `worker_runner` key to validate.
 *
 * `review_model` is RETIRED (2026-08-09, dotfiles-mqcj): the single review key
 * split into per-step `spec_/impl_/plan_` model+effort pairs. There is no dual
 * read and no fallback — a key with no entry in this table is simply unknown, so
 * a persisted `review_model` drops on load and a mutation naming it is rejected.
 *
 * The table is a FUNCTION rather than a constant because four of its entries are
 * catalog-derived, and the catalog is a config-time input: evaluating it at
 * module load would freeze `[runner]` overrides read before the config exists.
 *
 * @import { ResolvedCatalog } from './runner-catalog.js'
 */
import { catalogEfforts } from './runner-catalog.js';
import { runtimeCatalog } from './runner/index.js';

/**
 * `spec_review_model` / `impl_review_model` options. Consumed by the workflow
 * skill inside the session, not by the worker launcher — which is why `codex`
 * and the non-model verbs `self` / `skip` all belong here.
 *
 * @type {ReadonlyArray<string>}
 */
export const REVIEW_STEP_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];

/**
 * `plan_review_model` options — narrower than the other two steps by contract:
 * a plan review is never self-reviewed, and `opus` is not one of its legs.
 *
 * @type {ReadonlyArray<string>}
 */
export const PLAN_REVIEW_MODELS = ['codex', 'fable', 'skip'];

/**
 * Effort vocabulary for all three review steps. Fixed by the contract rather
 * than catalog-derived: the review legs are dispatched by the session, so their
 * effort is the workflow's own four-level scale, not a CLI flag.
 *
 * @type {ReadonlyArray<string>}
 */
export const REVIEW_EFFORTS = ['low', 'medium', 'high', 'xhigh'];

/**
 * Canonical execution-setting key order shared by persistence, mutations, and
 * UI presentation. `workflow_mode` is intentionally absent.
 *
 * @type {ReadonlyArray<string>}
 */
export const EXEC_SETTING_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'impl_model',
  'impl_effort'
];

/**
 * Allowed values per exec-preference key — the 10 workspace-global-capable keys
 * (`workflow_mode` excluded).
 *
 * `orchestration_model` and `impl_model` take the catalog's model names (claude
 * aliases plus the codex short names, which pass through unexpanded — the worker
 * never assembles a full model id). Their effort partners take the catalog-wide
 * UNION: `orchestration_effort` is narrowed per resolved model by `policy.js`
 * and by the UI selector, while `impl_effort` names a leaf whose model is not
 * known at set time.
 *
 * @param {ResolvedCatalog} [catalog] - Defaults to the process-wide runtime
 * catalog; tests and the WS layer inject their own.
 * @returns {Record<string, ReadonlyArray<string>>}
 */
export function execSettingEnums(catalog = runtimeCatalog()) {
  const models = Object.keys(catalog.model_index);
  const efforts = catalogEfforts(catalog);
  return {
    orchestration_model: models,
    orchestration_effort: efforts,
    spec_review_model: REVIEW_STEP_MODELS,
    spec_review_effort: REVIEW_EFFORTS,
    impl_review_model: REVIEW_STEP_MODELS,
    impl_review_effort: REVIEW_EFFORTS,
    plan_review_model: PLAN_REVIEW_MODELS,
    plan_review_effort: REVIEW_EFFORTS,
    impl_model: models,
    impl_effort: efforts
  };
}
