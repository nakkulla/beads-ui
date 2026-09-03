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
      route_defaults: { quick_fix: { dispatch: 'main' } },
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

  test('uses the quick_fix route dispatch default when upper layers are absent', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch).toMatchObject({
      value: 'main',
      source: 'base',
      display: '메인'
    });
    for (const key of [
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]) {
      expect(rows[key]).toMatchObject({
        value: null,
        display: '해당 없음',
        resolution: 'not_applicable'
      });
    }
  });

  test('names the harness layer on the quick_fix dispatch row alone', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      execution_defaults: PROJECTION
    });

    expect(rows.quick_fix_impl_dispatch).toMatchObject({
      value: 'main',
      source: 'base',
      display: '메인 (하네스)'
    });
  });

  test('lets an upper-layer dispatch override the quick_fix route default', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      pin: { impl_dispatch: 'delegated' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch).toMatchObject({
      value: 'delegated',
      source: 'pin',
      display: '위임'
    });
    expect(rows.impl_model.display).toBe('5.6-sol');
  });

  test('preserves existing defaults for other missing and unknown routes', () => {
    const without_route = resolveExecutionSettings({
      execution_defaults: PROJECTION
    });
    const spec_backed = resolveExecutionSettings({
      route: 'spec_backed',
      execution_defaults: PROJECTION
    });
    const unknown = resolveExecutionSettings({
      route: 'future_route',
      execution_defaults: PROJECTION
    });
    const without_route_defaults = structuredClone(PROJECTION);
    Reflect.deleteProperty(
      without_route_defaults.session.implementation,
      'route_defaults'
    );
    const missing = resolveExecutionSettings({
      route: 'quick_fix',
      execution_defaults: without_route_defaults
    });

    expect(spec_backed).toEqual(without_route);
    expect(unknown).toEqual(without_route);
    expect(missing.impl_dispatch.value).toBe('delegated');
  });

  test('keeps route-less implementation rows at the existing snapshot', () => {
    const rows = resolveExecutionSettings({ execution_defaults: PROJECTION });

    expect({
      impl_dispatch: rows.impl_dispatch,
      impl_runtime: rows.impl_runtime,
      impl_model: rows.impl_model,
      impl_effort: rows.impl_effort,
      impl_speed: rows.impl_speed,
      quick_fix_impl_model: rows.quick_fix_impl_model
    }).toEqual({
      impl_dispatch: {
        value: 'delegated',
        source: 'base',
        display: '위임',
        full_value: 'delegated',
        resolution: 'default'
      },
      impl_runtime: {
        value: 'codex',
        source: 'base',
        display: 'codex',
        full_value: 'codex',
        resolution: 'default'
      },
      impl_model: {
        value: 'sol',
        source: 'base',
        display: '5.6-sol',
        full_value: 'gpt-5.6-sol',
        resolution: 'default'
      },
      impl_effort: {
        value: 'auto',
        source: 'base',
        display: 'auto (실행 시 결정)',
        full_value: 'auto',
        resolution: 'dynamic'
      },
      impl_speed: {
        value: 'default',
        source: 'base',
        display: 'default (일반)',
        full_value: 'default',
        resolution: 'default'
      },
      quick_fix_impl_model: {
        value: null,
        source: 'base',
        display: '메인 (orchestration opus)',
        full_value: null,
        resolution: 'default'
      }
    });
  });

  test('labels the unset quick_fix model row with the effective orchestration model', () => {
    const from_projection = resolveExecutionSettings({
      execution_defaults: PROJECTION
    });
    const from_workspace = resolveExecutionSettings({
      global: { orchestration_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(from_projection.quick_fix_impl_model).toEqual({
      value: null,
      source: 'base',
      display: '메인 (orchestration opus)',
      full_value: null,
      resolution: 'default'
    });
    expect(from_workspace.quick_fix_impl_model.display).toBe(
      '메인 (orchestration 5.6-terra)'
    );
  });

  test('compacts a stored quick_fix model token to its catalog id', () => {
    const rows = resolveExecutionSettings({
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(rows.quick_fix_impl_model).toEqual({
      value: 'terra',
      source: 'global',
      display: '5.6-terra',
      full_value: 'gpt-5.6-terra',
      resolution: 'explicit'
    });
  });

  test('reports the quick_fix model row as unavailable without a projection', () => {
    const rows = resolveExecutionSettings({ execution_defaults: null });

    expect(rows.quick_fix_impl_model).toMatchObject({
      value: null,
      display: '기본값 확인 불가',
      resolution: 'unavailable'
    });
  });

  test('delegates a quick_fix bead to the runtime the kv model derives', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch).toEqual({
      value: 'delegated',
      source: 'global',
      display: '위임 (모델 함의)',
      full_value: 'delegated',
      resolution: 'explicit'
    });
    expect(rows.impl_runtime).toMatchObject({
      value: 'codex',
      source: 'global',
      display: 'codex (유도)'
    });
    expect(rows.impl_model).toMatchObject({
      value: 'terra',
      source: 'global',
      display: '5.6-terra (quick_fix)',
      full_value: 'gpt-5.6-terra'
    });
  });

  test('keeps quick_fix dispatch main ahead of its model implication', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: {
        quick_fix_impl_dispatch: 'main',
        quick_fix_impl_model: 'sol'
      },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch).toMatchObject({
      value: 'main',
      source: 'global',
      display: '메인 (quick_fix)'
    });
  });

  test('resolves every explicit quick_fix implementation override', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'claude',
        quick_fix_impl_model: 'opus',
        quick_fix_impl_effort: 'high',
        quick_fix_impl_speed: 'fast'
      },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('위임 (quick_fix)');
    expect(rows.impl_runtime.display).toBe('claude (quick_fix)');
    expect(rows.impl_model.display).toBe('opus (quick_fix)');
    expect(rows.impl_effort.display).toBe('high (quick_fix)');
    expect(rows.impl_speed.display).toBe('fast (quick_fix)');
  });

  test('falls from a lone quick_fix delegated dispatch to general defaults', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: { quick_fix_impl_dispatch: 'delegated' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('위임 (quick_fix)');
    expect(rows.impl_runtime.value).toBe('codex');
    expect(rows.impl_model.value).toBe('sol');
    expect(rows.impl_effort.value).toBe('auto');
    expect(rows.impl_speed.value).toBe('default');
  });

  test('uses auto when a quick_fix runtime cannot run the harness model', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'claude'
      },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_model).toMatchObject({
      value: 'auto',
      source: 'base',
      display: 'auto'
    });
  });

  test('skips a quick_fix model whose provider contradicts its runtime', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: {
        quick_fix_impl_runtime: 'claude',
        quick_fix_impl_model: 'sol'
      },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('메인');
    expect(rows.quick_fix_impl_model).toMatchObject({
      value: 'sol',
      display: 'sol (비호환)',
      resolution: 'incompatible'
    });
  });

  test('keeps a general runtime from implying quick_fix delegation', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: { impl_runtime: 'codex' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('메인');
  });

  test('prefers quick_fix orchestration values before general values', () => {
    const quick_fix = resolveExecutionSettings({
      route: 'quick_fix',
      global: {
        orchestration_model: 'opus',
        quick_fix_orchestration_model: 'sol'
      },
      execution_defaults: PROJECTION
    });
    const general = resolveExecutionSettings({
      route: 'quick_fix',
      global: { orchestration_model: 'opus' },
      execution_defaults: PROJECTION
    });

    expect(quick_fix.orchestration_model).toMatchObject({
      value: 'sol',
      display: '5.6-sol (quick_fix)'
    });
    expect(general.orchestration_model.value).toBe('opus');
  });

  test('keeps a pinned main dispatch ahead of the quick_fix kv model', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      pin: { impl_dispatch: 'main' },
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('메인');
    expect(rows.impl_model.display).toBe('해당 없음');
  });

  test('leaves a non-quick_fix route untouched by the kv model', () => {
    const with_kv = resolveExecutionSettings({
      route: 'spec_backed',
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });
    const without_kv = resolveExecutionSettings({
      route: 'spec_backed',
      execution_defaults: PROJECTION
    });

    for (const key of [
      'impl_dispatch',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]) {
      expect(with_kv[key]).toEqual(without_kv[key]);
    }
  });

  test('keeps a pinned implementation model ahead of the quick_fix kv model', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      pin: { impl_model: 'sol' },
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_model).toMatchObject({
      value: 'sol',
      source: 'pin',
      display: '5.6-sol'
    });
    expect(rows.impl_runtime.display).toBe('codex (유도)');
  });

  test('skips the dispatch flip when the pinned runtime contradicts the kv model', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      pin: { impl_runtime: 'claude' },
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(rows.impl_dispatch.display).toBe('메인');
    expect(rows.impl_runtime.display).toBe('해당 없음');
  });

  test('marks a quick_fix model no runtime offers as incompatible without flipping', () => {
    const rows = resolveExecutionSettings({
      route: 'quick_fix',
      global: { quick_fix_impl_model: 'nebula' },
      execution_defaults: PROJECTION
    });

    expect(rows.quick_fix_impl_model).toMatchObject({
      value: 'nebula',
      display: 'nebula (비호환)',
      resolution: 'incompatible'
    });
    expect(rows.impl_dispatch.display).toBe('메인');
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

  test('reads the quick_fix kv implication only when given the bead route', () => {
    const routed = buildOptionView({
      key: 'impl_dispatch',
      choices: ['delegated', 'main'],
      layer: 'pin',
      global: { quick_fix_impl_model: 'terra' },
      route: 'quick_fix',
      execution_defaults: PROJECTION
    });
    const unrouted = buildOptionView({
      key: 'impl_dispatch',
      choices: ['delegated', 'main'],
      layer: 'pin',
      global: { quick_fix_impl_model: 'terra' },
      execution_defaults: PROJECTION
    });

    expect(routed.unset_label).toBe('기본값 사용 — 위임 (모델 함의) (전역)');
    expect(unrouted.unset_label).toBe('기본값 사용 — 위임 (harness)');
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
