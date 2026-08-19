import { describe, expect, test } from 'vitest';
import {
  buildOptionView,
  resolveExecutionSettings,
  unsetOptionLabel
} from './execution-defaults.js';

const PROJECTION = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        opus: { model: 'opus', effort: 'high' },
        fable: { model: 'fable', effort: 'high' }
      }
    },
    plan_review: {
      standard_recommended: 'codex',
      fast_track_default: 'fable'
    },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      model_catalog: {
        claude: ['opus', 'fable'],
        codex: { sol: 'gpt-5.6-sol', terra: 'gpt-5.6-terra' }
      },
      effort_by_transport: {
        'codex-native-spawn': {
          auto: 'provider-tier-or-runtime-model-default'
        }
      }
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: null,
    speed: 'default'
  }
};

describe('resolveExecutionSettings', () => {
  test('resolves pin over global over harness', () => {
    const rows = resolveExecutionSettings({
      pin: { impl_model: 'terra' },
      global: { impl_model: 'sol', workflow_mode: 'fast_track' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_model).toMatchObject({
      value: 'terra',
      source: 'pin',
      display: '5.6-terra',
      full_value: 'gpt-5.6-terra'
    });
    expect(rows.workflow_mode).toMatchObject({
      value: 'fast_track',
      source: 'global'
    });
    expect(rows.impl_runtime).toMatchObject({
      value: 'codex',
      source: 'base'
    });
  });

  test('derives base effort from the effective global reviewer', () => {
    const rows = resolveExecutionSettings({
      global: { plan_review_model: 'fable' },
      execution_defaults: PROJECTION
    });

    expect(rows.plan_review_model).toMatchObject({
      display: 'fable',
      source: 'global'
    });
    expect(rows.plan_review_effort).toEqual({
      value: 'high',
      source: 'base',
      display: 'high',
      full_value: 'high',
      resolution: 'default'
    });
  });

  test('uses workflow mode to choose the plan reviewer preset', () => {
    const rows = resolveExecutionSettings({
      pin: { workflow_mode: 'fast_track' },
      execution_defaults: PROJECTION
    });

    expect(rows.plan_review_model.value).toBe('fable');
    expect(rows.plan_review_effort.value).toBe('high');
  });

  test('compacts only gpt model ids and preserves the full id', () => {
    const rows = resolveExecutionSettings({ execution_defaults: PROJECTION });

    expect(rows.spec_review_model.display).toBe('5.6-sol');
    expect(rows.spec_review_model.full_value).toBe('gpt-5.6-sol');
    expect(rows.orchestration_model.display).toBe('opus');
    expect(rows.orchestration_model.full_value).toBe('opus');
  });

  test('distinguishes inherited unset from literal default', () => {
    const inherited = resolveExecutionSettings({
      execution_defaults: PROJECTION
    });
    const fixed = resolveExecutionSettings({
      global: { impl_speed: 'default' },
      execution_defaults: PROJECTION
    });

    expect(inherited.impl_speed).toMatchObject({
      source: 'base',
      display: 'default (일반)',
      resolution: 'default'
    });
    expect(fixed.impl_speed).toMatchObject({
      source: 'global',
      display: 'default (일반 · 전역 고정)',
      resolution: 'explicit'
    });
  });

  test('reports auto, CLI default and unavailable states without guessing', () => {
    const rows = resolveExecutionSettings({ execution_defaults: PROJECTION });
    const unavailable = resolveExecutionSettings({
      execution_defaults: { supported: false }
    });

    expect(rows.impl_effort.display).toBe('auto (실행 시 결정)');
    expect(rows.orchestration_effort.display).toBe('CLI 기본 (미지정)');
    expect(unavailable.impl_model).toMatchObject({
      display: '기본값 확인 불가',
      resolution: 'unavailable'
    });
  });

  test('keeps selector-defined disabled states when projection is unavailable', () => {
    const rows = resolveExecutionSettings({
      pin: { spec_review_model: 'self', impl_dispatch: 'main' },
      execution_defaults: { supported: false }
    });

    expect(rows.spec_review_effort.resolution).toBe('not_applicable');
    expect(rows.impl_dispatch.display).toBe('메인');
    expect(rows.impl_model.display).toBe('해당 없음');
  });

  test('marks self skip main and unresolved inherit as not applicable or dynamic', () => {
    const self_rows = resolveExecutionSettings({
      pin: { spec_review_model: 'self', impl_runtime: 'inherit' },
      execution_defaults: PROJECTION
    });
    const main_rows = resolveExecutionSettings({
      pin: { impl_dispatch: 'main' },
      execution_defaults: PROJECTION
    });

    expect(self_rows.spec_review_effort).toMatchObject({
      display: '해당 없음',
      resolution: 'not_applicable'
    });
    expect(self_rows.impl_runtime.display).toBe('inherit (실행 시 결정)');
    expect(main_rows.impl_dispatch.display).toBe('메인');
    expect(main_rows.impl_model.display).toBe('해당 없음');
  });

  test('surfaces unknown transport effort tokens as incompatible', () => {
    const projection = structuredClone(PROJECTION);
    projection.session.implementation.effort_by_transport[
      'codex-native-spawn'
    ].auto = 'future-posture';

    const rows = resolveExecutionSettings({
      execution_defaults: projection,
      transport: 'codex-native-spawn'
    });

    expect(rows.impl_effort).toMatchObject({
      display: 'future-posture (비호환)',
      resolution: 'incompatible'
    });
  });
  test('marks a reviewer token the projection does not define as incompatible', () => {
    const rows = resolveExecutionSettings({
      pin: { spec_review_model: 'gemini' },
      execution_defaults: PROJECTION
    });

    expect(rows.spec_review_model).toMatchObject({
      value: 'gemini',
      display: 'gemini (비호환)',
      resolution: 'incompatible'
    });
  });

  test('marks a model the pinned runtime does not offer as incompatible', () => {
    const rows = resolveExecutionSettings({
      pin: { impl_runtime: 'claude', impl_model: 'sol' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_model).toMatchObject({
      value: 'sol',
      display: 'sol (비호환)',
      resolution: 'incompatible'
    });
  });
});

describe('unsetOptionLabel', () => {
  test('names no layer for the dialog that edits that layer itself', () => {
    const unset = resolveExecutionSettings({
      execution_defaults: PROJECTION
    }).spec_review_model;

    expect(unsetOptionLabel(unset, false)).toBe('기본값 사용 — 5.6-sol');
  });

  test('names the supplying layer for the per-bead editor', () => {
    const from_global = resolveExecutionSettings({
      global: { spec_review_model: 'fable' },
      execution_defaults: PROJECTION
    }).spec_review_model;
    const from_base = resolveExecutionSettings({
      execution_defaults: PROJECTION
    }).spec_review_model;

    expect(unsetOptionLabel(from_global, true)).toBe(
      '기본값 사용 — fable (전역)'
    );
    expect(unsetOptionLabel(from_base, true)).toBe(
      '기본값 사용 — 5.6-sol (harness)'
    );
  });

  test('drops the fixation marker from a literal default one layer down', () => {
    const from_global = resolveExecutionSettings({
      global: { impl_speed: 'default' },
      execution_defaults: PROJECTION
    }).impl_speed;

    expect(unsetOptionLabel(from_global, true)).toBe(
      '기본값 사용 — default (일반) (전역)'
    );
  });
});

describe('buildOptionView', () => {
  test('labels each choice with what selecting it would resolve to', () => {
    const view = buildOptionView({
      key: 'spec_review_model',
      choices: ['codex', 'fable', 'self'],
      layer: 'pin',
      execution_defaults: PROJECTION
    });

    expect(view.options).toEqual([
      { value: 'codex', label: '5.6-sol', full_value: 'gpt-5.6-sol' },
      { value: 'fable', label: 'fable', full_value: 'fable' },
      { value: 'self', label: 'self', full_value: 'self' }
    ]);
  });

  test('keeps a stored value the choice list omits', () => {
    const view = buildOptionView({
      key: 'impl_model',
      choices: ['auto', 'opus'],
      layer: 'pin',
      pin: { impl_runtime: 'claude', impl_model: 'sol' },
      execution_defaults: PROJECTION
    });

    expect(view.options[0]).toEqual({
      value: 'sol',
      label: 'sol (비호환)',
      full_value: 'sol'
    });
  });

  test('resolves the unset option against the remaining layers only', () => {
    const view = buildOptionView({
      key: 'spec_review_model',
      choices: ['codex', 'fable'],
      layer: 'pin',
      pin: { spec_review_model: 'fable' },
      global: { spec_review_model: 'opus' },
      execution_defaults: PROJECTION
    });

    expect(view.unset_label).toBe('기본값 사용 — opus (전역)');
  });
});
