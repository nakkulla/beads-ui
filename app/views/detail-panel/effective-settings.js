/**
 * Effective execution settings for ONE bead — the issue detail's layer model
 * (spec §E).
 *
 * Three layers are visible here: `핀` (this bead's metadata), `전역` (the
 * workspace `bd kv` default), and `기본` (the pinned harness projection).
 * The shared resolver decodes the projection; this module owns no default map.
 *
 * @typedef {'pin'|'global'|'base'} SettingSource
 * @typedef {{ value: string|null, source: SettingSource, display: string, full_value: string|null, resolution: string }} SettingLayer
 * @typedef {{ key: string, value: string|null, source: SettingSource, display: string, full_value: string|null, resolution: string }} EffectiveRow
 */
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import {
  BEAD_APPLY_KEYS,
  BEAD_PIN_KEYS,
  ORCHESTRATION_KEYS,
  QUICK_FIX_LANE_MAP
} from '../settings-dialog/session-model.js';
import { modelRunnerOf } from './exec-settings.js';

/**
 * The per-bead editor's four groups, in display order — the same role
 * vocabulary the collapsed value line reads (오케 before 워커). 오케스트레이션
 * is separate because its three keys are the only ones the worker launcher
 * consumes and the only ones whose workspace layer is the queue rather than
 * `bd kv`.
 *
 * @type {ReadonlyArray<{ id: string, label: string, keys: string[] }>}
 */
export const EFFECTIVE_GROUPS = [
  { id: 'workflow', label: '워크플로우', keys: ['workflow_mode'] },
  {
    id: 'orchestration',
    label: '오케스트레이션',
    keys: [...ORCHESTRATION_KEYS]
  },
  {
    id: 'implementation',
    label: '워커 구현',
    keys: [
      'impl_dispatch',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]
  },
  {
    id: 'review',
    label: '리뷰',
    keys: [
      'spec_review_model',
      'spec_review_effort',
      'spec_review_speed',
      'plan_review_model',
      'plan_review_effort',
      'plan_review_speed',
      'impl_review_model',
      'impl_review_effort',
      'impl_review_speed'
    ]
  }
];

/**
 * Korean labels for the keys the card renders.
 *
 * @type {Record<string, string>}
 */
export const SETTING_LABELS = {
  workflow_mode: '모드',
  spec_review_model: '사양 리뷰',
  spec_review_effort: '사양 리뷰 effort',
  spec_review_speed: '사양 리뷰 속도',
  plan_review_model: '계획 리뷰',
  plan_review_effort: '계획 리뷰 effort',
  plan_review_speed: '계획 리뷰 속도',
  impl_review_model: '구현 리뷰',
  impl_review_effort: '구현 리뷰 effort',
  impl_review_speed: '구현 리뷰 속도',
  impl_dispatch: '실행 방식',
  impl_runtime: '위임 대상',
  impl_model: '모델',
  impl_effort: 'effort',
  impl_speed: '속도',
  orchestration_model: '오케스트레이션 모델',
  orchestration_effort: '오케스트레이션 effort',
  orchestration_speed: '오케스트레이션 속도'
};

/**
 * Badge text per source layer.
 *
 * @type {Record<SettingSource, string>}
 */
export const SOURCE_LABELS = { pin: '핀', global: '전역', base: '기본' };

/**
 * Resolve one key across the visible layers.
 *
 * The `기본` value comes only from the pinned wire projection. An unavailable
 * projection remains a structured `기본값 확인 불가` result.
 *
 * @param {string} key
 * @param {Record<string, unknown>|null|undefined} bead_metadata
 * @param {Record<string, unknown>|null|undefined} workspace_values
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @param {Record<string, any>|null|undefined} [runner_catalog]
 * @param {string|null} [controller_runtime]
 * @returns {SettingLayer}
 */
export function resolveLayer(
  key,
  bead_metadata,
  workspace_values,
  execution_defaults,
  runner_catalog,
  controller_runtime = null
) {
  return resolveExecutionSettings({
    pin: bead_metadata,
    global: workspace_values,
    execution_defaults,
    runner_catalog,
    route:
      bead_metadata && typeof bead_metadata.route === 'string'
        ? bead_metadata.route
        : null,
    controller_runtime
  })[key];
}

/**
 * @param {string[]} keys
 * @param {Record<string, unknown>|null|undefined} bead_metadata
 * @param {Record<string, unknown>|null|undefined} workspace_values
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @param {Record<string, any>|null|undefined} [runner_catalog]
 * @param {string|null} [controller_runtime]
 * @returns {EffectiveRow[]}
 */
export function effectiveRows(
  keys,
  bead_metadata,
  workspace_values,
  execution_defaults,
  runner_catalog,
  controller_runtime = null
) {
  const resolved = resolveExecutionSettings({
    pin: bead_metadata,
    global: workspace_values,
    execution_defaults,
    runner_catalog,
    route:
      bead_metadata && typeof bead_metadata.route === 'string'
        ? bead_metadata.route
        : null,
    controller_runtime
  });
  return keys.map((key) => ({ key, ...resolved[key] }));
}

/**
 * The one-line summary's counts: how many keys each layer supplies.
 *
 * @param {string[]} keys
 * @param {Record<string, unknown>|null|undefined} bead_metadata
 * @param {Record<string, unknown>|null|undefined} workspace_values
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @param {Record<string, any>|null|undefined} [runner_catalog]
 * @param {string|null} [controller_runtime]
 * @returns {{ pin: number, global: number, base: number }}
 */
export function layerSummary(
  keys,
  bead_metadata,
  workspace_values,
  execution_defaults,
  runner_catalog,
  controller_runtime = null
) {
  const counts = { pin: 0, global: 0, base: 0 };
  for (const row of effectiveRows(
    keys,
    bead_metadata,
    workspace_values,
    execution_defaults,
    runner_catalog,
    controller_runtime
  )) {
    counts[row.source] += 1;
  }
  return counts;
}

/**
 * Build one THREE-STATE per-bead edit.
 *
 * An explicit choice is written as a literal — including `workflow_mode:
 * standard`, which a bead must be able to pin to override a `fast_track`
 * workspace default. Only the editor's `(기본)` choice, carried here as `null`,
 * becomes the empty value the server translates to `--unset-metadata`.
 *
 * @param {string} id
 * @param {string} key
 * @param {string|null} value
 * @returns {{ id: string, key: string, value: string }}
 */
export function buildThreeStatePayload(id, key, value) {
  return { id, key, value: typeof value === 'string' ? value : '' };
}

/**
 * Build the implementation-preset quick-apply request, or null when no preset
 * is chosen so the caller sends nothing.
 *
 * @param {string} id
 * @param {string} preset_id
 * @param {number} expected_revision
 * @returns {{ id: string, preset_id: string, expected_revision: number }|null}
 */
export function buildImplPresetApplyPayload(id, preset_id, expected_revision) {
  if (typeof preset_id !== 'string' || preset_id.length === 0) {
    return null;
  }
  return { id, preset_id, expected_revision };
}

/**
 * Every key the card can display, for the summary's denominator.
 *
 * @type {ReadonlyArray<string>}
 */
export const EFFECTIVE_KEYS = [...BEAD_APPLY_KEYS, ...ORCHESTRATION_KEYS];

/** The four implementation axes a quick_fix lane value overrides one by one. */
const QUICK_FIX_IMPL_KEYS = [
  'impl_dispatch',
  'impl_model',
  'impl_effort',
  'impl_speed'
];

/**
 * Project one preset onto the pin values an apply would actually write for this
 * issue's route — the client mirror of the server `presetSettingsForIssue`
 * (`server/ws/exec-preset-handlers.js`). The two write-blocking checks that
 * function also runs (`validateOrchestrationPin`, `validateImplSettings`) are
 * deliberately absent: they refuse a write, they never change an expectation.
 *
 * @param {Record<string, any>|null|undefined} preset_settings
 * @param {string|null|undefined} route
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @returns {Record<string, string>}
 */
export function presetExpectationForIssue(
  preset_settings,
  route,
  runner_catalog
) {
  const settings = preset_settings || {};
  /** @type {Record<string, string>} */
  const projected = {};
  for (const key of BEAD_PIN_KEYS) {
    if (typeof settings[key] === 'string') {
      projected[key] = settings[key];
    }
  }
  if (route !== 'quick_fix') {
    return projected;
  }
  for (const key of ORCHESTRATION_KEYS) {
    const value = settings[QUICK_FIX_LANE_MAP[key]] ?? settings[key];
    if (typeof value === 'string') {
      projected[key] = value;
    }
  }
  for (const key of QUICK_FIX_IMPL_KEYS) {
    const lane_value = settings[QUICK_FIX_LANE_MAP[key]];
    if (typeof lane_value === 'string') {
      projected[key] = lane_value;
    }
  }
  const lane_runtime = settings.quick_fix_impl_runtime;
  const lane_model = settings.quick_fix_impl_model;
  const derived_runtime =
    typeof lane_model === 'string'
      ? modelRunnerOf(runner_catalog, lane_model)
      : null;
  const runtime =
    (typeof lane_runtime === 'string' ? lane_runtime : null) ??
    derived_runtime ??
    settings.impl_runtime;
  if (typeof runtime === 'string') {
    projected.impl_runtime = runtime;
  } else {
    delete projected.impl_runtime;
  }
  return projected;
}

/**
 * One key's value, or null when the key is absent or carries an empty token.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function presentValue(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Whether the runner catalog can answer which runner owns a model — the same
 * judgement `exec-settings.js catalogRunners` makes before a lookup. That
 * helper is not exported and its file is outside this design's scope, so the
 * predicate is restated here and the two must stay identical.
 *
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @returns {boolean}
 */
function catalogIsReady(runner_catalog) {
  if (!isRecord(runner_catalog) || !isRecord(runner_catalog.runners)) {
    return false;
  }
  return Object.values(runner_catalog.runners).some(
    (entry) => isRecord(entry) && isRecord(entry.models)
  );
}

/**
 * Whether the runtime expectation cannot be judged YET: only a quick_fix issue
 * whose preset supplies a lane MODEL but no lane runtime needs the catalog to
 * derive a provider, and only an unarrived catalog makes that derivation
 * impossible.
 *
 * A catalog that HAS arrived and simply does not list the model is not
 * undecidable — the server `inferImplRuntime` fails the same way and falls
 * through to the general `impl_runtime`, so both sides reach one conclusion.
 *
 * @param {Record<string, any>|null|undefined} preset_settings
 * @param {string|null|undefined} route
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @returns {boolean}
 */
function runtimeExpectationPending(preset_settings, route, runner_catalog) {
  const settings = preset_settings || {};
  return (
    route === 'quick_fix' &&
    typeof settings.quick_fix_impl_runtime !== 'string' &&
    typeof settings.quick_fix_impl_model === 'string' &&
    !catalogIsReady(runner_catalog)
  );
}

/**
 * How far this issue's pins have drifted from the preset it records.
 *
 * SYMMETRIC by design: a key the projection omits expects ABSENCE, because an
 * apply `--unset-metadata`s it. That is why this is not the server's
 * `dispatchPreset` `deviated_keys`, which walks only the pins that exist and so
 * answers a different question — what one attempt carried, not whether the
 * issue still describes the preset.
 *
 * Returns null while the expectation itself is unknowable, which the caller
 * treats exactly like an unarrived preset list (spec §3.4): saying nothing
 * beats reporting a drift that only an absent catalog invented.
 *
 * @param {Record<string, unknown>|null|undefined} bead_metadata
 * @param {Record<string, any>|null|undefined} preset_settings
 * @param {string|null|undefined} route
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @returns {{ count: number, entries: Array<{ key: string, actual: string|null, expected: string|null }> }|null}
 */
export function presetDeviation(
  bead_metadata,
  preset_settings,
  route,
  runner_catalog
) {
  if (runtimeExpectationPending(preset_settings, route, runner_catalog)) {
    return null;
  }
  const metadata = bead_metadata || {};
  const expectation = presetExpectationForIssue(
    preset_settings,
    route,
    runner_catalog
  );
  /** @type {Array<{ key: string, actual: string|null, expected: string|null }>} */
  const entries = [];
  for (const key of BEAD_PIN_KEYS) {
    const actual = presentValue(metadata[key]);
    const expected = presentValue(expectation[key]);
    if (actual !== expected) {
      entries.push({ key, actual, expected });
    }
  }
  return { count: entries.length, entries };
}
