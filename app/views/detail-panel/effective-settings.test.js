import { describe, expect, test } from 'vitest';
import {
  EFFECTIVE_GROUPS,
  buildImplPresetApplyPayload,
  buildThreeStatePayload,
  effectiveRows,
  layerSummary,
  resolveLayer
} from './effective-settings.js';

const PROJECTION = {
  supported: true,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
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
      model_catalog: { codex: { sol: 'gpt-5.6-sol', terra: 'gpt-5.6-terra' } },
      effort_by_transport: {}
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

describe('resolveLayer', () => {
  test('reports a bead metadata value as the 핀 layer', () => {
    const layer = resolveLayer(
      'impl_model',
      { impl_model: 'sol' },
      {},
      PROJECTION
    );

    expect(layer).toMatchObject({
      value: 'sol',
      source: 'pin',
      display: '5.6-sol',
      full_value: 'gpt-5.6-sol'
    });
  });

  test('reports a kv value as the 전역 layer when the bead has no pin', () => {
    const layer = resolveLayer(
      'impl_model',
      {},
      { impl_model: 'terra' },
      PROJECTION
    );

    expect(layer).toMatchObject({ value: 'terra', source: 'global' });
  });

  test('lets a bead pin win over the workspace default', () => {
    const layer = resolveLayer(
      'impl_model',
      { impl_model: 'sol' },
      { impl_model: 'terra' },
      PROJECTION
    );

    expect(layer.source).toBe('pin');
    expect(layer.value).toBe('sol');
  });

  test('reports the structured harness value when neither layer carries the key', () => {
    const layer = resolveLayer('impl_model', {}, {}, PROJECTION);

    expect(layer).toMatchObject({
      value: 'sol',
      source: 'base',
      display: '5.6-sol',
      full_value: 'gpt-5.6-sol',
      resolution: 'default'
    });
  });

  test('treats workflow_mode=standard on the bead as a real pin', () => {
    const layer = resolveLayer(
      'workflow_mode',
      { workflow_mode: 'standard' },
      { workflow_mode: 'fast_track' },
      PROJECTION
    );

    expect(layer).toMatchObject({ value: 'standard', source: 'pin' });
  });

  test('ignores an empty metadata string rather than reading it as a pin', () => {
    const layer = resolveLayer(
      'impl_model',
      { impl_model: '' },
      {},
      PROJECTION
    );

    expect(layer.source).toBe('base');
  });
});

describe('effectiveRows', () => {
  test('produces one row per key of the requested group', () => {
    const rows = effectiveRows(
      ['workflow_mode', 'impl_model'],
      { impl_model: 'sol' },
      { workflow_mode: 'fast_track' },
      PROJECTION
    );

    expect(rows).toMatchObject([
      { key: 'workflow_mode', value: 'fast_track', source: 'global' },
      { key: 'impl_model', value: 'sol', source: 'pin' }
    ]);
  });

  test('groups the editor into 워크플로우 · 리뷰 · 구현 · Worker', () => {
    expect(EFFECTIVE_GROUPS.map((group) => group.id)).toEqual([
      'workflow',
      'review',
      'implementation',
      'worker'
    ]);
  });

  test('never places an orchestration key outside the Worker group', () => {
    for (const group of EFFECTIVE_GROUPS) {
      if (group.id === 'worker') {
        continue;
      }
      expect(group.keys.some((key) => key.startsWith('orchestration_'))).toBe(
        false
      );
    }
  });
});

describe('layerSummary', () => {
  test('counts the pinned and workspace-sourced keys', () => {
    const summary = layerSummary(
      ['workflow_mode', 'impl_model', 'impl_effort'],
      { impl_model: 'sol' },
      { workflow_mode: 'fast_track' },
      PROJECTION
    );

    expect(summary).toEqual({ pin: 1, global: 1, base: 1 });
  });

  test('derives reviewer effort and dynamic disabled states from the same rows', () => {
    const rows = effectiveRows(
      [
        'plan_review_model',
        'plan_review_effort',
        'impl_dispatch',
        'impl_runtime',
        'impl_model'
      ],
      { impl_dispatch: 'main', impl_runtime: 'inherit' },
      { plan_review_model: 'fable' },
      PROJECTION
    );

    expect(rows).toMatchObject([
      { value: 'fable', source: 'global', display: 'fable' },
      { value: 'high', source: 'base', display: 'high' },
      { value: 'main', source: 'pin', display: '메인' },
      { value: null, resolution: 'not_applicable' },
      { value: null, resolution: 'not_applicable' }
    ]);
  });
});

describe('buildThreeStatePayload', () => {
  test('sends an explicit value as a literal write', () => {
    expect(buildThreeStatePayload('UI-1', 'workflow_mode', 'standard')).toEqual(
      { id: 'UI-1', key: 'workflow_mode', value: 'standard' }
    );
  });

  test('sends an empty value for the (기본) choice, the only deletion', () => {
    expect(buildThreeStatePayload('UI-1', 'workflow_mode', null)).toEqual({
      id: 'UI-1',
      key: 'workflow_mode',
      value: ''
    });
  });
});

describe('buildImplPresetApplyPayload', () => {
  test('addresses one bead with the preset id and the snapshot revision', () => {
    expect(buildImplPresetApplyPayload('UI-1', 'preset-1', 3)).toEqual({
      id: 'UI-1',
      preset_id: 'preset-1',
      expected_revision: 3
    });
  });

  test('returns null without a chosen preset so no request is sent', () => {
    expect(buildImplPresetApplyPayload('UI-1', '', 3)).toBe(null);
  });
});
