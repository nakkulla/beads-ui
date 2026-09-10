import { describe, expect, test } from 'vitest';
import { REC_REASONS } from '../../app/utils/rec-settings.js';
import {
  IMPL_RUNTIMES as CLIENT_IMPL_RUNTIMES,
  QUICK_FIX_KV_KEYS as CLIENT_QUICK_FIX_KV_KEYS,
  QUICK_FIX_LANE_MAP as CLIENT_QUICK_FIX_LANE_MAP,
  QUICK_FIX_ORCHESTRATION_KEYS as CLIENT_QUICK_FIX_ORCHESTRATION_KEYS,
  isHttpOriginValue as clientIsHttpOriginValue
} from '../../app/views/settings-dialog/session-model.js';
import {
  isHttpOriginValue,
  validateSessionDefaultsPatch
} from '../session-defaults.js';
import * as enums from './exec-enums.js';
import {
  ACCOUNT_KEYS,
  BEAD_APPLY_KEYS,
  EXEC_SETTING_KEYS,
  IMPL_PRESET_KEYS,
  IMPL_RUNTIMES,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  PRESET_KV_KEYS,
  QUICK_FIX_KV_KEYS,
  QUICK_FIX_LANE_MAP,
  QUICK_FIX_ORCHESTRATION_KEYS,
  REC_SIGNALS,
  REC_VALUES,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
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

/** The 15 workspace-global-capable exec keys (workflow_mode excluded). */
const EXPECTED_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'spec_review_model',
  'spec_review_effort',
  'spec_review_speed',
  'plan_review_model',
  'plan_review_effort',
  'plan_review_speed',
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed',
  'impl_runtime',
  'impl_model',
  'impl_effort'
];

describe('worker/exec-enums static vocabularies (dotfiles-mqcj)', () => {
  test('keeps account pins outside every preset and exec axis', () => {
    expect(ACCOUNT_KEYS).toEqual(['claude_account', 'codex_account']);

    for (const key of ACCOUNT_KEYS) {
      expect(BEAD_APPLY_KEYS).not.toContain(key);
      expect(WORKSPACE_KV_KEYS).not.toContain(key);
      expect(IMPL_PRESET_KEYS).not.toContain(key);
      expect(PRESET_KV_KEYS).not.toContain(key);
      expect(EXEC_SETTING_KEYS).not.toContain(key);
    }
  });

  test('covers all 25 full-profile preset keys', () => {
    expect(IMPL_PRESET_KEYS).toHaveLength(25);
    expect(IMPL_PRESET_KEYS).toEqual([
      ...BEAD_APPLY_KEYS,
      ...ORCHESTRATION_KEYS,
      ...QUICK_FIX_ORCHESTRATION_KEYS,
      ...QUICK_FIX_KV_KEYS
    ]);
    expect(Object.keys(implPresetEnums())).toEqual(IMPL_PRESET_KEYS);
  });

  test('keeps fourteen execution keys on the per-bead apply list', () => {
    expect(BEAD_APPLY_KEYS).toHaveLength(14);

    expect(BEAD_APPLY_KEYS).toContain('impl_dispatch');
    expect(BEAD_APPLY_KEYS).not.toContain('workflow_mode');
  });

  test('drops impl_dispatch from the workspace kv list', () => {
    expect(WORKSPACE_KV_KEYS).toHaveLength(21);

    expect(WORKSPACE_KV_KEYS).toEqual([
      'workflow_mode',
      'spec_review_model',
      'spec_review_effort',
      'spec_review_speed',
      'plan_review_model',
      'plan_review_effort',
      'plan_review_speed',
      'impl_review_model',
      'impl_review_effort',
      'impl_review_speed',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed',
      'quick_fix_impl_dispatch',
      'quick_fix_impl_runtime',
      'quick_fix_impl_model',
      'quick_fix_impl_effort',
      'quick_fix_impl_speed',
      'base_sync_accept_local_commits',
      'bdui_url'
    ]);
  });

  test('appends bdui_url as the last kv-only key', () => {
    expect(WORKSPACE_KV_KEYS.at(-1)).toBe('bdui_url');
  });

  test('exceeds the per-bead list by the route profile and the kv-only keys', () => {
    const extra = WORKSPACE_KV_KEYS.filter(
      (key) => !BEAD_APPLY_KEYS.includes(key)
    );

    expect(extra).toEqual([
      'workflow_mode',
      ...QUICK_FIX_KV_KEYS,
      'base_sync_accept_local_commits',
      'bdui_url'
    ]);
  });

  test('keeps base_sync_accept_local_commits off every per-bead surface', () => {
    expect(BEAD_APPLY_KEYS).not.toContain('base_sync_accept_local_commits');
    expect(IMPL_PRESET_KEYS).not.toContain('base_sync_accept_local_commits');
    expect(EXEC_SETTING_KEYS).not.toContain('base_sync_accept_local_commits');
    expect(PRESET_KV_KEYS).not.toContain('base_sync_accept_local_commits');
  });

  test('keeps bdui_url off every per-bead surface (metadata_key forbidden)', () => {
    expect(BEAD_APPLY_KEYS).not.toContain('bdui_url');
    expect(IMPL_PRESET_KEYS).not.toContain('bdui_url');
    expect(EXEC_SETTING_KEYS).not.toContain('bdui_url');
    expect(
      Object.keys(execSettingEnums(resolveCatalog({ warn: () => {} })))
    ).not.toContain('bdui_url');
  });

  test('gives bdui_url no enum entry, since the contract types it as a string', () => {
    const session_enums = sessionDefaultEnums(
      resolveCatalog({ warn: () => {} })
    );

    expect(WORKSPACE_KV_KEYS).toContain('bdui_url');
    expect(Object.keys(session_enums)).not.toContain('bdui_url');
  });

  test('gives the bool key no enum entry either, since it is typed bool', () => {
    const session_enums = sessionDefaultEnums(
      resolveCatalog({ warn: () => {} })
    );

    expect(WORKSPACE_KV_KEYS).toContain('base_sync_accept_local_commits');
    expect(Object.keys(session_enums)).not.toContain(
      'base_sync_accept_local_commits'
    );
  });

  test('includes every quick_fix kv key in the preset-carried kv list', () => {
    expect(PRESET_KV_KEYS).toHaveLength(18);
    for (const key of QUICK_FIX_KV_KEYS) {
      expect(PRESET_KV_KEYS).toContain(key);
    }
    expect(PRESET_KV_KEYS).not.toContain('workflow_mode');
    expect(PRESET_KV_KEYS).not.toContain('bdui_url');

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

  test('mirrors every quick_fix session enum from the contract', () => {
    const session_enums = sessionDefaultEnums(
      resolveCatalog({ warn: () => {} })
    );

    expect(session_enums.quick_fix_impl_dispatch).toEqual([
      'delegated',
      'main'
    ]);
    expect(session_enums.quick_fix_impl_runtime).toEqual(['claude', 'codex']);
    expect(session_enums.quick_fix_impl_effort).toEqual(
      session_enums.impl_effort
    );
    expect(session_enums.quick_fix_impl_effort).toContain('auto');
    expect(session_enums.quick_fix_impl_speed).toEqual(['default', 'fast']);
  });

  test('retires the merged SESSION_DEFAULT_KEYS surface', () => {
    expect(/** @type {any} */ (enums).SESSION_DEFAULT_KEYS).toBeUndefined();
  });

  test('exposes the step-review model vocabulary', () => {
    expect(REVIEW_STEP_MODELS).toEqual([
      'codex',
      'astra',
      'opus',
      'fable',
      'self',
      'skip'
    ]);
  });

  test('narrows plan_review to codex/astra/fable/skip (no self, no opus)', () => {
    expect(PLAN_REVIEW_MODELS).toEqual(['codex', 'astra', 'fable', 'skip']);
    expect(PLAN_REVIEW_MODELS).not.toContain('self');
    expect(PLAN_REVIEW_MODELS).not.toContain('opus');
  });

  test('fixes the review effort vocabulary at four levels', () => {
    expect(REVIEW_EFFORTS).toEqual(['low', 'medium', 'high', 'xhigh']);
  });

  test('fixes the review speed vocabulary at two tiers', () => {
    expect(REVIEW_SPEEDS).toEqual(['default', 'fast']);
  });

  test('drops the retired review_model surface entirely', () => {
    expect(/** @type {any} */ (enums).REVIEW_MODELS).toBeUndefined();
    expect(/** @type {any} */ (enums).EXEC_SETTING_ENUMS).toBeUndefined();
    expect(/** @type {any} */ (enums).IMPL_MODELS).toBeUndefined();
    expect(Object.hasOwn(execSettingEnums(), 'review_model')).toBe(false);
  });
});

describe('worker/exec-enums full-profile presets', () => {
  test('accepts every quick_fix preset key', () => {
    const result = validateImplPresetSettings({
      quick_fix_orchestration_model: 'sol',
      quick_fix_orchestration_effort: 'high',
      quick_fix_orchestration_speed: 'fast',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      quick_fix_impl_effort: 'auto',
      quick_fix_impl_speed: 'fast'
    });

    expect(result).toEqual({ ok: true });
  });

  test('rejects workflow_mode as an unknown preset key', () => {
    const result = validateImplPresetSettings({
      workflow_mode: 'fast_track'
    });

    expect(result).toEqual({
      ok: false,
      reason: 'unknown_impl_preset_key:workflow_mode'
    });
  });

  test('rejects fast quick_fix speed when the runner lacks that tier', () => {
    const result = validateImplPresetSettings({
      quick_fix_impl_runtime: 'claude',
      quick_fix_impl_speed: 'fast'
    });

    expect(result).toEqual({
      ok: false,
      reason: 'quick_fix_speed_unsupported'
    });
  });

  test('rejects fast quick_fix orchestration speed when the effective model lacks that tier', () => {
    const result = validateImplPresetSettings({
      quick_fix_orchestration_model: 'opus',
      quick_fix_orchestration_speed: 'fast'
    });

    expect(result).toEqual({
      ok: false,
      reason: 'quick_fix_speed_unsupported'
    });
  });

  test('accepts fast quick_fix impl speed inherited from a concrete general runtime', () => {
    const result = validateImplPresetSettings({
      impl_runtime: 'codex',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_speed: 'fast'
    });

    expect(result).toEqual({ ok: true });
  });

  test('validates review speed without a missing enum crash', () => {
    const accepted = validateImplPresetSettings({
      spec_review_speed: 'fast'
    });
    const rejected = validateImplPresetSettings({
      spec_review_speed: 'turbo'
    });

    expect(accepted).toEqual({ ok: true });
    expect(rejected).toEqual({
      ok: false,
      reason: 'invalid_spec_review_speed'
    });
  });

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
        impl_runtime: 'auto',
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
  test('covers the canonical 15 workspace-global exec keys in contract order', () => {
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
    expect(table.spec_review_speed).toEqual(REVIEW_SPEEDS);
    expect(table.impl_review_speed).toEqual(REVIEW_SPEEDS);
    expect(table.plan_review_speed).toEqual(REVIEW_SPEEDS);
  });

  test('exposes the implementation runtime contract enum', () => {
    expect(IMPL_RUNTIMES).toEqual(['auto', 'claude', 'codex']);
    expect(execSettingEnums().impl_runtime).toEqual(IMPL_RUNTIMES);
  });

  test('mirrors the client implementation runtime enum exactly', () => {
    expect(IMPL_RUNTIMES).toEqual(CLIENT_IMPL_RUNTIMES);
  });
});

describe('worker/exec-enums reviewer token validation', () => {
  test.each(['codex', 'astra'])(
    'accepts %s across bead review settings',
    (reviewer_model) => {
      const settings = {
        spec_review_model: reviewer_model,
        impl_review_model: reviewer_model,
        plan_review_model: reviewer_model
      };

      const result = validateExecSettings(settings);

      expect(result).toMatchObject({ ok: true });
    }
  );

  test.each(['codex', 'astra'])(
    'accepts %s across execution preset review settings',
    (reviewer_model) => {
      const settings = {
        spec_review_model: reviewer_model,
        impl_review_model: reviewer_model,
        plan_review_model: reviewer_model
      };

      const result = validateImplPresetSettings(settings);

      expect(result).toEqual({ ok: true });
    }
  );

  test.each(['codex', 'astra'])(
    'accepts %s across workspace review settings',
    (reviewer_model) => {
      const settings = {
        spec_review_model: reviewer_model,
        impl_review_model: reviewer_model,
        plan_review_model: reviewer_model
      };

      const result = validateSessionDefaultsPatch(settings);

      expect(result).toEqual({ ok: true, patch: settings });
    }
  );
});

describe('worker/exec-enums implementation target coherence', () => {
  test('marks stale known settings incompatible across all 15 keys', () => {
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

  test('validates review speed without a missing enum crash', () => {
    const accepted = validateExecSettings({ impl_review_speed: 'fast' });
    const rejected = validateExecSettings({ impl_review_speed: 'turbo' });

    expect(accepted).toMatchObject({ ok: true });
    expect(rejected).toEqual({
      ok: false,
      reason: 'invalid_impl_review_speed'
    });
  });

  test('infers a provider only for a known model-only legacy value', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    expect(inferImplRuntime({ impl_model: 'terra' }, catalog)).toBe('codex');
    expect(inferImplRuntime({ impl_model: 'removed-model' }, catalog)).toBe(
      undefined
    );
    expect(
      inferImplRuntime({ impl_runtime: 'auto', impl_model: 'terra' }, catalog)
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

  test('keeps auto as the runtime when no exact model is chosen', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const result = validateImplSettings(
      { impl_runtime: 'auto' },
      { catalog, active_writer: true }
    );

    expect(result).toMatchObject({
      ok: true,
      impl_runtime: 'auto',
      inferred: false
    });
  });

  test('checks the effort of an auto runtime against the exact model', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const accepted = validateImplSettings(
      { impl_runtime: 'auto', impl_model: 'opus', impl_effort: 'xhigh' },
      { catalog, active_writer: true }
    );
    const rejected = validateImplSettings(
      { impl_runtime: 'auto', impl_model: 'opus', impl_effort: 'max' },
      { catalog, active_writer: true }
    );

    expect(accepted).toMatchObject({ ok: true, impl_runtime: 'auto' });
    expect(rejected).toMatchObject({
      ok: false,
      reason: 'illegal_impl_effort'
    });
  });

  test('validates the literal auto model and effort as an unspecified target', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const result = validateImplSettings(
      { impl_runtime: 'auto', impl_model: 'auto', impl_effort: 'auto' },
      { catalog, active_writer: false }
    );

    expect(result).toEqual({ ok: true, impl_runtime: 'auto', inferred: false });
  });

  test('accepts a model-less auto effort from the whole catalog union', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const result = validateImplSettings(
      { impl_runtime: 'auto', impl_effort: 'max' },
      { catalog, active_writer: true }
    );

    expect(result).toMatchObject({ ok: true, impl_runtime: 'auto' });
  });

  test('ignores the controller provider when the runtime is auto', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const result = validateImplSettings(
      {
        orchestration_model: 'opus',
        impl_runtime: 'auto',
        impl_model: 'sol',
        impl_effort: 'high'
      },
      { catalog, active_writer: true, controller_runtime: 'claude' }
    );

    expect(result).toMatchObject({ ok: true, impl_runtime: 'auto' });
  });

  test('rejects the retired inherit runtime', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const result = validateImplSettings(
      { impl_runtime: 'inherit', impl_model: 'terra' },
      { catalog, active_writer: true }
    );

    expect(result).toEqual({ ok: false, reason: 'invalid_impl_runtime' });
  });

  test('never answers with the retired controller_runtime_required reason', () => {
    const catalog = resolveCatalog({ warn: () => {} });

    const reasons = [
      { impl_runtime: 'auto', impl_model: 'terra' },
      { impl_runtime: 'auto', impl_model: 'opus' },
      { impl_runtime: 'auto' }
    ].map(
      (settings) =>
        /** @type {{ reason?: string }} */ (
          validateImplSettings(settings, { catalog, active_writer: true })
        ).reason
    );

    expect(reasons).toEqual([undefined, undefined, undefined]);
  });
});

describe('workspace kv mirror across the two runtimes', () => {
  test('matches every quick_fix key list and lane mapping exactly', () => {
    expect(QUICK_FIX_KV_KEYS).toEqual(CLIENT_QUICK_FIX_KV_KEYS);
    expect(QUICK_FIX_ORCHESTRATION_KEYS).toEqual(
      CLIENT_QUICK_FIX_ORCHESTRATION_KEYS
    );
    expect(QUICK_FIX_LANE_MAP).toEqual(CLIENT_QUICK_FIX_LANE_MAP);
  });

  test('judges every bdui_url case the same way on both sides', () => {
    const cases = [
      'http://100.64.0.1:3000',
      'https://beads.example',
      'http://host:3000/',
      'http://host:3000/api',
      'http://host:3000?a=1',
      'http://host:3000#x',
      'http://user:pw@host:3000',
      'HTTP://HOST:3000',
      '100.64.0.1:3000',
      'ftp://host',
      ''
    ];

    const disagreements = cases
      .map((value) => [
        value,
        isHttpOriginValue(value),
        clientIsHttpOriginValue(value)
      ])
      .filter(
        ([, server_verdict, client_verdict]) =>
          server_verdict !== client_verdict
      );

    expect(disagreements).toEqual([]);
  });
});

describe('worker/exec-enums rec vocabularies (UI-sbum §2)', () => {
  test('matches the client rec_reason enum exactly', () => {
    expect(REC_SIGNALS).toEqual(REC_REASONS);
  });

  test('allows exactly one recommended value per key', () => {
    expect(REC_VALUES).toEqual({
      rec_orchestration_model: ['fable'],
      rec_impl_runtime: ['claude']
    });
  });

  test('keeps the recommendation keys out of every resolved key list', () => {
    for (const key of Object.keys(REC_VALUES)) {
      expect(BEAD_APPLY_KEYS).not.toContain(key);
      expect(WORKSPACE_KV_KEYS).not.toContain(key);
      expect(IMPL_PRESET_KEYS).not.toContain(key);
      expect(EXEC_SETTING_KEYS).not.toContain(key);
      expect(
        Object.keys(execSettingEnums(resolveCatalog({ warn: () => {} })))
      ).not.toContain(key);
    }
  });
});

test.each(['astra', 'sol'])(
  'accepts %s orchestration with a Codex implementation preset',
  (orchestration_model) => {
    const result = validateImplPresetSettings({
      orchestration_model,
      orchestration_effort: 'high',
      orchestration_speed: 'default',
      impl_dispatch: 'delegated',
      impl_runtime: 'codex',
      impl_model: 'astra',
      impl_effort: 'max',
      impl_speed: 'default',
      impl_review_model: 'fable',
      impl_review_effort: 'xhigh'
    });

    expect(result).toEqual({ ok: true });
  }
);

test('rejects Astra implementation under the Claude runtime', () => {
  const result = validateImplPresetSettings({
    impl_dispatch: 'delegated',
    impl_runtime: 'claude',
    impl_model: 'astra'
  });

  expect(result.ok).toBe(false);
});
