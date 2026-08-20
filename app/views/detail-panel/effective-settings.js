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
  ORCHESTRATION_KEYS,
  SESSION_DEFAULT_KEYS
} from '../settings-dialog/session-model.js';

/**
 * The per-bead editor's four groups, in display order. `Worker` is separate
 * because its three keys are the only ones the worker launcher consumes and the
 * only ones whose workspace layer is the queue rather than `bd kv`.
 *
 * @type {ReadonlyArray<{ id: string, label: string, keys: string[] }>}
 */
export const EFFECTIVE_GROUPS = [
  { id: 'workflow', label: '워크플로우', keys: ['workflow_mode'] },
  {
    id: 'review',
    label: '리뷰',
    keys: [
      'spec_review_model',
      'spec_review_effort',
      'plan_review_model',
      'plan_review_effort',
      'impl_review_model',
      'impl_review_effort'
    ]
  },
  {
    id: 'implementation',
    label: '구현',
    keys: [
      'impl_dispatch',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]
  },
  { id: 'worker', label: 'Worker', keys: [...ORCHESTRATION_KEYS] }
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
  plan_review_model: '계획 리뷰',
  plan_review_effort: '계획 리뷰 effort',
  impl_review_model: '구현 리뷰',
  impl_review_effort: '구현 리뷰 effort',
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
export const EFFECTIVE_KEYS = [...SESSION_DEFAULT_KEYS, ...ORCHESTRATION_KEYS];
