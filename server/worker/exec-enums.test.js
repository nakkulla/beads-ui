import { describe, expect, test } from 'vitest';
import * as enums from './exec-enums.js';
import {
  BEAD_APPLY_KEYS,
  EXEC_SETTING_KEYS,
  IMPL_PRESET_KEYS,
  IMPL_RUNTIMES,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  PRESET_KV_KEYS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  WORKSPACE_KV_KEYS,
  execSettingEnums,
  implPresetEnums,
  inferImplRuntime,
  sessionDefaultEnums,
  validateExecSettings,
  validateImplPresetSettings,
  validateImplSettings
} from './exec-enums.js';
import { resolveCatalog } from './runner-catalog.js';

/** The 12 workspace-global-capable exec keys (workflow_mode excluded). */
const EXPECTED_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'impl_runtime',
  'impl_model',
  'impl_effort'
];

describe('worker/exec-enums static vocabularies (dotfiles-mqcj)', () => {
  test('covers all 15 full-profile preset keys', () => {
    expect(IMPL_PRESET_KEYS).toHaveLength(15);
    expect(IMPL_PRESET_KEYS).toEqual([
      ...BEAD_APPLY_KEYS,
      ...ORCHESTRATION_KEYS
    ]);
    expect(Object.keys(implPresetEnums())).toEqual(IMPL_PRESET_KEYS);
  });

  test('keeps impl_dispatch on the per-bead apply list', () => {
    expect(BEAD_APPLY_KEYS).toHaveLength(12);

    expect(BEAD_APPLY_KEYS).toContain('impl_dispatch');
  });

  test('drops impl_dispatch from the workspace kv list', () => {
    expect(WORKSPACE_KV_KEYS).toHaveLength(12);

    expect(WORKSPACE_KV_KEYS).not.toContain('impl_dispatch');
  });

  test('appends quick_fix_impl_model as the kv-only route-scoped key', () => {
    expect(WORKSPACE_KV_KEYS.at(-1)).toBe('quick_fix_impl_model');
  });

  test('exceeds the per-bead list by the one kv-only key', () => {
    const extra = WORKSPACE_KV_KEYS.filter(
      (key) => !BEAD_APPLY_KEYS.includes(key)
    );

    expect(extra).toEqual(['quick_fix_impl_model']);
  });

  test('keeps quick_fix_impl_model out of the preset-carried kv list', () => {
    expect(PRESET_KV_KEYS).toHaveLength(11);
    expect(PRESET_KV_KEYS).not.toContain('quick_fix_impl_model');

    expect(PRESET_KV_KEYS.every((key) => IMPL_PRESET_KEYS.includes(key))).toBe(
      true
    );
  });

  test('offers the catalog model tokens to quick_fix_impl_model without auto', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const session_enums = sessionDefaultEnums(catalog);

    expect(session_enums.quick_fix_impl_model).toEqual(
      Object.keys(catalog.model_index)
    );
    expect(session_enums.quick_fix_impl_model).not.toContain('auto');
  });

  test('retires the merged SESSION_DEFAULT_KEYS surface', () => {
    expect(/** @type {any} */ (enums).SESSION_DEFAULT_KEYS).toBeUndefined();
  });

  test('exposes the step-review model vocabulary', () => {
    expect(REVIEW_STEP_MODELS).toEqual([
      'codex',
      'opus',
      'fable',
      'self',
      'skip'
    ]);
  });

  test('narrows plan_review to codex/fable/skip (no self, no opus)', () => {
    expect(PLAN_REVIEW_MODELS).toEqual(['codex', 'fable', 'skip']);
    expect(PLAN_REVIEW_MODELS).not.toContain('self');
    expect(PLAN_REVIEW_MODELS).not.toContain('opus');
  });

  test('fixes the review effort vocabulary at four levels', () => {
    expect(REVIEW_EFFORTS).toEqual(['low', 'medium', 'high', 'xhigh']);
  });

  test('drops the retired review_model surface entirely', () => {
    expect(/** @type {any} */ (enums).REVIEW_MODELS).toBeUndefined();
    expect(/** @type {any} */ (enums).EXEC_SETTING_ENUMS).toBeUndefined();
    expect(/** @type {any} */ (enums).IMPL_MODELS).toBeUndefined();
    expect(Object.hasOwn(execSettingEnums(), 'review_model')).toBe(false);
  });
});

describe('worker/exec-enums full-profile presets', () => {
  test('reuses the exec-setting orchestration enums', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['ultra'] } } }
      },
      warn: () => {}
    });

    const preset_enums = implPresetEnums(catalog);
    const exec_enums = execSettingEnums(catalog);

    for (const key of ORCHESTRATION_KEYS) {
      expect(preset_enums[key]).toEqual(exec_enums[key]);
    }
  });

  test('validates orchestration values from the injected catalog', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['ultra'] } } }
      },
      warn: () => {}
    });

    const accepted = validateImplPresetSettings(
      {
        orchestration_model: 'nova',
        orchestration_effort: 'ultra',
        orchestration_speed: 'fast'
      },
      { catalog }
    );
    const rejected = validateImplPresetSettings(
      { orchestration_model: 'removed-model' },
      { catalog }
    );

    expect(accepted).toEqual({ ok: true });
    expect(rejected).toEqual({
      ok: false,
      reason: 'invalid_orchestration_model'
    });
  });

  test('preserves auto literals and the main-dispatch coherence exemption', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const auto = validateImplPresetSettings(
      {
        impl_dispatch: 'delegated',
        impl_runtime: 'inherit',
        impl_model: 'auto',
        impl_effort: 'auto'
      },
      { catalog }
    );
    const main = validateImplPresetSettings(
      {
        impl_dispatch: 'main',
        impl_runtime: 'claude',
        impl_model: 'terra'
      },
      { catalog }
    );

    expect(auto).toEqual({ ok: true });
    expect(main).toEqual({ ok: true });
  });
});

describe('worker/exec-enums execSettingEnums (catalog-driven)', () => {
  test('covers the canonical 12 workspace-global exec keys in contract order', () => {
    expect(EXEC_SETTING_KEYS).toEqual(EXPECTED_KEYS);
    expect(Object.keys(execSettingEnums())).toEqual(EXPECTED_KEYS);
  });

  test('takes the model keys from the injected catalog model index', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const table = execSettingEnums(catalog);

    expect(table.orchestration_model).toEqual(Object.keys(catalog.model_index));
    expect(table.impl_model).toEqual(Object.keys(catalog.model_index));
    expect(table.impl_model).toContain('sol');
    expect(table.impl_model).toContain('opus');
  });

  test('separates outer effort and speed unions from implementation effort', () => {
    const table = execSettingEnums(resolveCatalog({ warn: () => {} }));

    expect(table.orchestration_effort).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max',
      'ultra'
    ]);
    expect(table.impl_effort).toEqual([
      'low',
      'medium',
      'high',
      'xhigh',
      'max'
    ]);
    expect(table.orchestration_speed).toEqual(['default', 'fast']);
    // `minimal` is on the codex runner-wide list but every builtin codex model
    // pins its own efforts, so no model actually accepts it.
    expect(table.impl_effort).not.toContain('minimal');
  });

  test('a runner-wide effort reaches the union through a model that pins nothing', () => {
    const catalog = resolveCatalog({
      overrides: { codex: { models: { nova: { id: 'gpt-5.7-nova' } } } },
      warn: () => {}
    });

    expect(execSettingEnums(catalog).impl_effort).toContain('minimal');
  });

  test('a config-added model reaches the model keys through the catalog', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['ultra'] } } }
      },
      warn: () => {}
    });

    const table = execSettingEnums(catalog);

    expect(table.orchestration_model).toContain('nova');
    expect(table.impl_effort).toContain('ultra');
  });

  test('the review keys are catalog-independent contract vocabularies', () => {
    const table = execSettingEnums(resolveCatalog({ active: ['claude'] }));

    expect(table.spec_review_model).toEqual(REVIEW_STEP_MODELS);
    expect(table.impl_review_model).toEqual(REVIEW_STEP_MODELS);
    expect(table.plan_review_model).toEqual(PLAN_REVIEW_MODELS);
    expect(table.spec_review_effort).toEqual(REVIEW_EFFORTS);
    expect(table.impl_review_effort).toEqual(REVIEW_EFFORTS);
    expect(table.plan_review_effort).toEqual(REVIEW_EFFORTS);
  });

  test('exposes the implementation runtime contract enum', () => {
    expect(IMPL_RUNTIMES).toEqual(['inherit', 'claude', 'codex']);
    expect(execSettingEnums().impl_runtime).toEqual(IMPL_RUNTIMES);
  });
});

describe('worker/exec-enums implementation target coherence', () => {
  test('marks stale known settings incompatible across all 12 keys', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(
      validateExecSettings(
        { orchestration_model: 'removed-model' },
        { catalog }
      )
    ).toMatchObject({ ok: false, reason: 'invalid_orchestration_model' });
    expect(
      validateExecSettings(
        { impl_review_model: 'removed-reviewer' },
        { catalog }
      )
    ).toMatchObject({ ok: false, reason: 'invalid_impl_review_model' });
    expect(
      validateExecSettings({ impl_review_effort: 'max' }, { catalog })
    ).toMatchObject({ ok: false, reason: 'invalid_impl_review_effort' });
  });

  test('infers a provider only for a known model-only legacy value', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(inferImplRuntime({ impl_model: 'terra' }, catalog)).toBe('codex');
    expect(inferImplRuntime({ impl_model: 'removed-model' }, catalog)).toBe(
      undefined
    );
    expect(
      inferImplRuntime(
        { impl_runtime: 'inherit', impl_model: 'terra' },
        catalog
      )
    ).toBe(undefined);
  });

  test('rejects active model-only writes while accepting the read-only legacy form', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(
      validateImplSettings(
        { impl_model: 'terra', impl_effort: 'high' },
        { catalog, active_writer: false }
      )
    ).toMatchObject({ ok: true, impl_runtime: 'codex', inferred: true });
    expect(
      validateImplSettings(
        { impl_model: 'terra', impl_effort: 'high' },
        { catalog, active_writer: true }
      )
    ).toMatchObject({ ok: false, reason: 'impl_runtime_required' });
  });

  test('requires the selected runtime, model, and effort to share one provider', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(
      validateImplSettings(
        { impl_runtime: 'codex', impl_model: 'terra', impl_effort: 'high' },
        { catalog, active_writer: true }
      )
    ).toMatchObject({ ok: true, impl_runtime: 'codex' });
    expect(
      validateImplSettings(
        { impl_runtime: 'claude', impl_model: 'terra' },
        { catalog, active_writer: true }
      )
    ).toMatchObject({ ok: false, reason: 'provider_model_mismatch' });
    expect(
      validateImplSettings(
        { impl_runtime: 'codex', impl_model: 'terra', impl_effort: 'max' },
        { catalog, active_writer: true }
      )
    ).toMatchObject({ ok: false, reason: 'illegal_impl_effort' });
  });

  test('resolves inherit against the controller provider', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(
      validateImplSettings(
        {
          orchestration_model: 'sol',
          impl_runtime: 'inherit',
          impl_model: 'terra'
        },
        { catalog, active_writer: true }
      )
    ).toMatchObject({ ok: true, impl_runtime: 'inherit' });
    expect(
      validateImplSettings(
        { impl_runtime: 'inherit', impl_model: 'terra' },
        { catalog, active_writer: true, controller_runtime: 'claude' }
      )
    ).toMatchObject({ ok: false, reason: 'provider_model_mismatch' });
  });
});
