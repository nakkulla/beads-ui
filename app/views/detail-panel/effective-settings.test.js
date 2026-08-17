import { describe, expect, test } from 'vitest';
import {
  EFFECTIVE_GROUPS,
  buildImplPresetApplyPayload,
  buildThreeStatePayload,
  effectiveRows,
  layerSummary,
  resolveLayer
} from './effective-settings.js';

describe('resolveLayer', () => {
  test('reports a bead metadata value as the 핀 layer', () => {
    const layer = resolveLayer('impl_model', { impl_model: 'sol' }, {});

    expect(layer).toEqual({ value: 'sol', source: 'pin' });
  });

  test('reports a kv value as the 전역 layer when the bead has no pin', () => {
    const layer = resolveLayer('impl_model', {}, { impl_model: 'terra' });

    expect(layer).toEqual({ value: 'terra', source: 'global' });
  });

  test('lets a bead pin win over the workspace default', () => {
    const layer = resolveLayer(
      'impl_model',
      { impl_model: 'sol' },
      { impl_model: 'terra' }
    );

    expect(layer.source).toBe('pin');
    expect(layer.value).toBe('sol');
  });

  test('reports 기본 with NO value when neither layer carries the key', () => {
    const layer = resolveLayer('impl_model', {}, {});

    expect(layer).toEqual({ value: null, source: 'base' });
  });

  test('treats workflow_mode=standard on the bead as a real pin', () => {
    const layer = resolveLayer(
      'workflow_mode',
      { workflow_mode: 'standard' },
      { workflow_mode: 'fast_track' }
    );

    expect(layer).toEqual({ value: 'standard', source: 'pin' });
  });

  test('ignores an empty metadata string rather than reading it as a pin', () => {
    const layer = resolveLayer('impl_model', { impl_model: '' }, {});

    expect(layer.source).toBe('base');
  });
});

describe('effectiveRows', () => {
  test('produces one row per key of the requested group', () => {
    const rows = effectiveRows(
      ['workflow_mode', 'impl_model'],
      { impl_model: 'sol' },
      { workflow_mode: 'fast_track' }
    );

    expect(rows).toEqual([
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
      { workflow_mode: 'fast_track' }
    );

    expect(summary).toEqual({ pin: 1, global: 1, base: 1 });
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
