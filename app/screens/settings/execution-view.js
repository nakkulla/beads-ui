/**
 * Derived reads of the `실행` pane's state: the orchestration overlay the rows
 * render, the provider axis, which `속도` rows exist, and one profile's preset
 * draft. Split out of `execution-pane.js` (UI-dbn6): the pane still owns every
 * value and hands getters in, so each read sees the current draft.
 *
 * @typedef {Object} ExecutionViewContext
 * @property {() => any} queueOf
 * @property {() => any} runnerCatalog
 * @property {() => Record<string, any>|null} executionProjection
 * @property {() => Record<string, string>} sessionDraft - The in-progress
 * session-defaults edits over the server baseline.
 * @property {() => Record<string, string|null>} workerDraft - The unsaved
 * orchestration edits over the queue snapshot.
 * @property {() => string|null} runtimeChoice - The UI-only provider pick.
 */
import {
  ORCHESTRATION_KEYS,
  QUICK_FIX_LANE_MAP,
  QUICK_FIX_ORCHESTRATION_KEYS,
  orchestrationRuntimeInitial,
  presetKeysFor,
  speedVisible
} from '../../model/session-model.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { isRecord } from './execution-shared.js';

/** Preset keys the QUEUE stores; the rest of the preset lives in workspace kv. */
const QUEUE_PRESET_KEYS = [
  ...ORCHESTRATION_KEYS,
  ...QUICK_FIX_ORCHESTRATION_KEYS
];

/** The 속도 keys stored on the QUEUE rather than in workspace kv. */
const QUEUE_SPEED_KEYS = [
  'orchestration_speed',
  'quick_fix_orchestration_speed'
];

/**
 * The storage key one canonical preset key is read from and written to on
 * screen. A quick_fix preset carries canonical names, but the kv object and
 * the queue keep the prefixed ones, which is what the rows edit (§3.2).
 *
 * @param {string} key - A canonical preset key.
 * @param {'general'|'quick_fix'} profile
 * @returns {string}
 */
function storageKeyOf(key, profile) {
  return profile === 'quick_fix' ? QUICK_FIX_LANE_MAP[key] : key;
}

/**
 * Build the derived reads over one pane's state.
 *
 * @param {ExecutionViewContext} ctx
 */
export function createExecutionView(ctx) {
  /** @returns {Record<string, string|null>} */
  function currentOrchestrationValues() {
    const queue = ctx.queueOf();
    const worker_draft = ctx.workerDraft();
    /** @type {Record<string, string|null>} */
    const current = {};
    for (const key of [
      ...ORCHESTRATION_KEYS,
      ...QUICK_FIX_ORCHESTRATION_KEYS
    ]) {
      current[key] = Object.prototype.hasOwnProperty.call(worker_draft, key)
        ? worker_draft[key]
        : queue && typeof queue[key] === 'string'
          ? queue[key]
          : null;
    }
    return current;
  }

  /**
   * The provider the orchestration rows are narrowed to: the user's pick, or —
   * before they touch the row — the runner of the stored model, falling back to
   * the projection's default orchestration model.
   *
   * @returns {string|null}
   */
  function orchestrationRuntime() {
    const orchestration_runtime = ctx.runtimeChoice();
    if (orchestration_runtime !== null) {
      return orchestration_runtime;
    }
    const projection = ctx.executionProjection();
    const projected =
      projection && isRecord(projection.orchestration)
        ? projection.orchestration.model
        : null;
    return orchestrationRuntimeInitial(
      ctx.runnerCatalog(),
      currentOrchestrationValues().orchestration_model,
      typeof projected === 'string' ? projected : null
    );
  }

  /**
   * The catalog token a review gate's reviewer stands for. A reviewer name the
   * projection maps to a catalog alias resolves through that map, so the row's
   * provider is the one that will actually run it. `self`, `skip`, and an unset
   * gate name no runner at all.
   *
   * @param {string|undefined} reviewer
   * @returns {string|null}
   */
  function reviewerModelToken(reviewer) {
    if (
      typeof reviewer !== 'string' ||
      reviewer.length === 0 ||
      reviewer === 'self' ||
      reviewer === 'skip'
    ) {
      return null;
    }
    const projection = ctx.executionProjection();
    const reviewers = projection?.session?.review?.reviewers;
    const mapped =
      isRecord(reviewers) && isRecord(reviewers[reviewer])
        ? reviewers[reviewer].model
        : null;
    return typeof mapped === 'string' && mapped.length > 0 ? mapped : reviewer;
  }

  /**
   * Which `속도` rows the catalog admits right now, keyed by their stored key.
   * The template and {@link pruneHiddenSpeeds} read the SAME map, so a hidden
   * row and a cleared value can never disagree.
   *
   * @returns {Record<string, boolean>}
   */
  function speedVisibility() {
    const catalog = ctx.runnerCatalog();
    const session_draft = ctx.sessionDraft();
    const orchestration = currentOrchestrationValues();
    const worker_runtime = orchestrationRuntime();
    const quick_fix_orchestration_model =
      orchestration.quick_fix_orchestration_model;
    return {
      orchestration_speed: speedVisible(catalog, { runtime: worker_runtime }),
      spec_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(session_draft.spec_review_model)
      }),
      plan_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(session_draft.plan_review_model)
      }),
      impl_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(session_draft.impl_review_model)
      }),
      impl_speed: speedVisible(catalog, {
        runtime: session_draft.impl_runtime,
        model: session_draft.impl_model
      }),
      // An unset quick_fix orchestration model falls through to the general
      // profile, so the row follows the general provider until it names one.
      quick_fix_orchestration_speed: quick_fix_orchestration_model
        ? speedVisible(catalog, { model: quick_fix_orchestration_model })
        : speedVisible(catalog, { runtime: worker_runtime }),
      quick_fix_impl_speed: speedVisible(catalog, {
        runtime: session_draft.quick_fix_impl_runtime,
        model: session_draft.quick_fix_impl_model
      })
    };
  }

  /**
   * Clear every stored 속도 whose row just disappeared, so a runner that cannot
   * take `fast` never keeps one behind an invisible row (UI-7yh2 §3.4). The
   * caller saves: the return says which store moved.
   *
   * @returns {{ session: boolean, queue: boolean }}
   */
  function pruneHiddenSpeeds() {
    const visibility = speedVisibility();
    const orchestration = currentOrchestrationValues();
    const worker_draft = ctx.workerDraft();
    const session_draft = ctx.sessionDraft();
    let session_changed = false;
    let queue_changed = false;
    for (const [key, visible] of Object.entries(visibility)) {
      if (visible) {
        continue;
      }
      if (QUEUE_SPEED_KEYS.includes(key)) {
        if (typeof orchestration[key] === 'string') {
          worker_draft[key] = null;
          queue_changed = true;
        }
        continue;
      }
      if (typeof session_draft[key] === 'string') {
        delete session_draft[key];
        session_changed = true;
      }
    }
    return { session: session_changed, queue: queue_changed };
  }

  /**
   * The `실행 방식` a quick_fix Bead would actually run under, resolved through
   * the shared resolver with no pin — the workspace layer alone. `delegated` is
   * what puts the delegation rows on screen (UI-7yh2 §3.5).
   *
   * @returns {boolean}
   */
  function quickFixDelegated() {
    const rows = resolveExecutionSettings({
      pin: null,
      global: { ...ctx.sessionDraft() },
      execution_defaults: ctx.executionProjection(),
      runner_catalog: ctx.runnerCatalog(),
      route: 'quick_fix'
    });
    return rows.impl_dispatch?.value === 'delegated';
  }

  /**
   * Current explicit execution values of ONE profile as preset settings, in
   * canonical key names — what the pane shows, not what the stores hold.
   * Orchestration reads the same draft-over-queue overlay the rows render, so
   * a value whose queue save failed is still the one a save captures.
   *
   * @param {'general'|'quick_fix'} profile
   * @returns {Record<string, string>}
   */
  function executionDraftSettings(profile) {
    /** @type {Record<string, string>} */
    const settings = {};
    const orchestration = currentOrchestrationValues();
    const session_draft = ctx.sessionDraft();
    for (const key of presetKeysFor(profile)) {
      const storage_key = storageKeyOf(key, profile);
      const value = QUEUE_PRESET_KEYS.includes(storage_key)
        ? orchestration[storage_key]
        : session_draft[storage_key];
      if (typeof value === 'string' && value.length > 0) {
        settings[key] = value;
      }
    }
    return settings;
  }

  return {
    currentOrchestrationValues,
    orchestrationRuntime,
    speedVisibility,
    pruneHiddenSpeeds,
    quickFixDelegated,
    executionDraftSettings
  };
}
