import { describe, expect, test } from 'vitest';
import {
  LEGACY_PRESET_IDS,
  TARGET_PRESETS,
  planPresetReplacement
} from './exec-presets-plan.js';

/**
 * Build a snapshot preset row as the coordinator emits it (id/name/settings).
 *
 * @param {string} id - Identifier the coordinator would have assigned.
 * @param {string} name - Display label shown in the settings dialog.
 * @param {Record<string, string>} settings - Sparse profile.
 * @returns {{ id: string, name: string, settings: Record<string, string> }}
 */
function presetRow(id, name, settings) {
  return { id, name, settings };
}

/**
 * A snapshot holding the five targets under synthetic ids, so the false
 * idempotent case can be built without repeating every profile.
 *
 * @returns {{ revision: number, presets: Array<{ id: string, name: string, settings: Record<string, string> }> }}
 */
function targetSnapshot() {
  return {
    revision: 60,
    presets: TARGET_PRESETS.map((target, index) =>
      presetRow(`new-${index}`, target.name, { ...target.settings })
    )
  };
}

describe('planPresetReplacement', () => {
  test('deletes the thirteen legacy presets and creates the five targets', () => {
    const snapshot = {
      revision: 55,
      presets: LEGACY_PRESET_IDS.map((id, index) =>
        presetRow(id, `legacy-${index}`, { impl_runtime: 'claude' })
      )
    };

    const plan = planPresetReplacement(
      snapshot,
      TARGET_PRESETS,
      LEGACY_PRESET_IDS
    );

    expect(plan.delete).toHaveLength(13);
    expect(plan.create).toHaveLength(5);
    expect(plan.keep).toEqual([]);
    expect(plan.preserve).toEqual([]);
  });

  test('plans no write when the five targets are already present', () => {
    const snapshot = targetSnapshot();

    const plan = planPresetReplacement(
      snapshot,
      TARGET_PRESETS,
      LEGACY_PRESET_IDS
    );

    expect(plan.keep).toHaveLength(5);
    expect(plan.delete).toEqual([]);
    expect(plan.create).toEqual([]);
  });

  test('preserves a same-name preset whose settings differ and still creates the target', () => {
    const snapshot = {
      revision: 61,
      presets: [
        presetRow('other-1', TARGET_PRESETS[0].name, {
          ...TARGET_PRESETS[0].settings,
          orchestration_effort: 'medium'
        })
      ]
    };

    const plan = planPresetReplacement(
      snapshot,
      TARGET_PRESETS,
      LEGACY_PRESET_IDS
    );

    expect(plan.preserve).toEqual([
      {
        id: 'other-1',
        name: TARGET_PRESETS[0].name,
        reason: 'name_matches_settings_differ'
      }
    ]);
    expect(plan.create.map((target) => target.name)).toContain(
      TARGET_PRESETS[0].name
    );
  });

  test('preserves a preset whose id is not a known legacy id', () => {
    const snapshot = {
      revision: 62,
      presets: [
        presetRow('stranger', '누군가의 프리셋', { impl_runtime: 'codex' })
      ]
    };

    const plan = planPresetReplacement(
      snapshot,
      TARGET_PRESETS,
      LEGACY_PRESET_IDS
    );

    expect(plan.preserve).toEqual([
      { id: 'stranger', name: '누군가의 프리셋', reason: 'unknown_preset' }
    ]);
    expect(plan.delete).toEqual([]);
  });
});
