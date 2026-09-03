import { describe, expect, test } from 'vitest';
import {
  BEAD_APPLY_KEYS,
  BOOLEAN_DRAFT_ON,
  IMPL_DISPATCHES,
  IMPL_PRESET_KEYS,
  ORCHESTRATION_KEYS,
  PRESET_KV_KEYS,
  QUICK_FIX_KV_KEYS,
  QUICK_FIX_LANE_MAP,
  QUICK_FIX_ORCHESTRATION_KEYS,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
  WORKSPACE_KV_KEYS,
  adoptSessionDefaultValues,
  buildExecutionOptionView,
  buildOrchestrationPatch,
  buildPresetDiff,
  buildQuickFixPresetDiff,
  buildSessionDefaultsPatch,
  implEffortOptions,
  implModelOptions,
  isDelegationDisabled,
  isHttpOriginValue,
  narrowImplTarget,
  normalizeQuickFixLanePreset,
  orchestrationEffortOptions,
  orchestrationModelOptions
} from './session-model.js';

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

/** A minimal two-runner catalog in the worker snapshot's shape. */
const CATALOG = {
  runners: {
    claude: {
      models: {
        opus: { efforts: ['low', 'high'] },
        haiku: { efforts: ['low'] }
      }
    },
    codex: {
      models: {
        sol: { efforts: ['medium', 'xhigh'] },
        terra: { efforts: ['high'] }
      }
    }
  }
};

/** The claude shape: efforts live on the runner, not on each model. */
const RUNNER_LEVEL_CATALOG = {
  runners: {
    claude: {
      models: { opus: {}, haiku: { efforts: ['low'] } },
      efforts: ['low', 'medium', 'high', 'xhigh']
    }
  }
};

/** The outer Worker vocabulary differs per model from the inner one. */
const ORCHESTRATION_CATALOG = {
  runners: {
    claude: { models: { opus: {} }, efforts: ['low', 'high'] },
    codex: {
      models: {
        sol: {
          efforts: ['low', 'xhigh'],
          orchestration_efforts: ['low', 'xhigh', 'max', 'ultra']
        },
        terra: { efforts: ['high'] },
        luna: {}
      },
      efforts: ['minimal']
    }
  }
};

describe('session key lists', () => {
  test('names the fifteen per-bead keys and no orchestration key', () => {
    expect(BEAD_APPLY_KEYS).toHaveLength(15);
    expect(BEAD_APPLY_KEYS).toContain('impl_dispatch');
    expect(BEAD_APPLY_KEYS).toContain('impl_speed');
    expect(
      BEAD_APPLY_KEYS.some((key) => key.startsWith('orchestration_'))
    ).toBe(false);
  });

  test('drops impl_dispatch from the twenty-one workspace kv keys', () => {
    expect(WORKSPACE_KV_KEYS).toHaveLength(21);

    expect(WORKSPACE_KV_KEYS).not.toContain('impl_dispatch');
  });

  test('mirrors the quick_fix kv block after the per-bead keys', () => {
    expect(WORKSPACE_KV_KEYS.slice(-7)).toEqual([
      ...QUICK_FIX_KV_KEYS,
      'base_sync_accept_local_commits',
      'bdui_url'
    ]);
    for (const key of QUICK_FIX_KV_KEYS) {
      expect(IMPL_PRESET_KEYS).not.toContain(key);
      expect(PRESET_KV_KEYS).not.toContain(key);
    }
    expect(IMPL_PRESET_KEYS).not.toContain('bdui_url');
    expect(IMPL_PRESET_KEYS).not.toContain('base_sync_accept_local_commits');
    expect(PRESET_KV_KEYS).not.toContain('base_sync_accept_local_commits');
  });

  test('maps exactly eight preset fields onto the quick_fix lane', () => {
    expect(QUICK_FIX_ORCHESTRATION_KEYS).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_orchestration_speed'
    ]);
    expect(QUICK_FIX_LANE_MAP).toEqual({
      orchestration_model: 'quick_fix_orchestration_model',
      orchestration_effort: 'quick_fix_orchestration_effort',
      orchestration_speed: 'quick_fix_orchestration_speed',
      impl_dispatch: 'quick_fix_impl_dispatch',
      impl_runtime: 'quick_fix_impl_runtime',
      impl_model: 'quick_fix_impl_model',
      impl_effort: 'quick_fix_impl_effort',
      impl_speed: 'quick_fix_impl_speed'
    });
  });

  test('names the fourteen kv keys a global preset apply replaces', () => {
    expect(PRESET_KV_KEYS).toEqual([
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
      'impl_speed'
    ]);
  });

  test('offers 위임 and 메인 as the two execution modes', () => {
    expect(IMPL_DISPATCHES).toEqual(['delegated', 'main']);
  });

  test('mirrors all eighteen execution preset keys', () => {
    expect(IMPL_PRESET_KEYS).toEqual([
      ...BEAD_APPLY_KEYS,
      ...ORCHESTRATION_KEYS
    ]);
    expect(IMPL_PRESET_KEYS).toHaveLength(18);
  });

  test('offers the fixed review speed vocabulary', () => {
    expect(REVIEW_SPEEDS).toEqual(['default', 'fast']);
  });
});

describe('isDelegationDisabled (per-bead drafts only)', () => {
  test('disables the delegation rows when the mode is 메인', () => {
    expect(isDelegationDisabled({ impl_dispatch: 'main' })).toBe(true);
  });

  test('keeps the delegation rows enabled for 위임', () => {
    expect(isDelegationDisabled({ impl_dispatch: 'delegated' })).toBe(false);
  });

  test('keeps the delegation rows enabled when no mode is chosen', () => {
    expect(isDelegationDisabled({})).toBe(false);
  });
});

describe('implModelOptions', () => {
  test('offers 자동 plus every model of the chosen delegation target', () => {
    expect(implModelOptions(CATALOG, 'codex')).toEqual([
      'auto',
      'sol',
      'terra'
    ]);
  });

  test('offers every catalog model when the target is inherit', () => {
    expect(implModelOptions(CATALOG, 'inherit')).toEqual([
      'auto',
      'opus',
      'haiku',
      'sol',
      'terra'
    ]);
  });

  test('offers only 자동 when the catalog is unknown', () => {
    expect(implModelOptions(null, 'codex')).toEqual(['auto']);
  });
});

describe('implEffortOptions', () => {
  test('narrows the efforts to the chosen model', () => {
    expect(implEffortOptions(CATALOG, 'codex', 'sol')).toEqual([
      'auto',
      'medium',
      'xhigh'
    ]);
  });

  test('falls back to the target runtime union when the model is 자동', () => {
    expect(implEffortOptions(CATALOG, 'codex', 'auto')).toEqual([
      'auto',
      'medium',
      'xhigh',
      'high'
    ]);
  });

  test('falls back to the runner efforts for a model that declares none', () => {
    expect(implEffortOptions(RUNNER_LEVEL_CATALOG, 'claude', 'opus')).toEqual([
      'auto',
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('prefers the model efforts over the runner list', () => {
    expect(implEffortOptions(RUNNER_LEVEL_CATALOG, 'claude', 'haiku')).toEqual([
      'auto',
      'low'
    ]);
  });
});

describe('orchestrationEffortOptions', () => {
  test('offers the outer worker vocabulary of the chosen model', () => {
    expect(
      orchestrationEffortOptions(ORCHESTRATION_CATALOG, 'codex', 'sol')
    ).toEqual(['auto', 'low', 'xhigh', 'max', 'ultra']);
  });

  test('falls back to the model efforts without an orchestration list', () => {
    expect(
      orchestrationEffortOptions(ORCHESTRATION_CATALOG, 'codex', 'terra')
    ).toEqual(['auto', 'high']);
  });

  test('falls back to the runner efforts when the model declares neither', () => {
    expect(
      orchestrationEffortOptions(ORCHESTRATION_CATALOG, 'codex', 'luna')
    ).toEqual(['auto', 'minimal']);
  });

  test('unions every model of the runtime while the model is 자동', () => {
    expect(
      orchestrationEffortOptions(ORCHESTRATION_CATALOG, 'codex', 'auto')
    ).toEqual(['auto', 'low', 'xhigh', 'max', 'ultra', 'high', 'minimal']);
  });
});

describe('narrowImplTarget', () => {
  test('drops a model and effort the new delegation target cannot run', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'claude', impl_model: 'sol', impl_effort: 'medium' },
      CATALOG,
      null
    );

    expect(narrowed).toEqual({
      impl_runtime: 'claude',
      impl_model: undefined,
      impl_effort: undefined
    });
  });

  test('keeps 자동 on both dependent keys', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'codex', impl_model: 'auto', impl_effort: 'auto' },
      CATALOG,
      null
    );

    expect(narrowed).toEqual({
      impl_runtime: 'codex',
      impl_model: 'auto',
      impl_effort: 'auto'
    });
  });

  test('changes nothing while no runtime is set', () => {
    const narrowed = narrowImplTarget(
      { impl_model: 'sol', impl_effort: 'medium' },
      CATALOG,
      null
    );

    expect(narrowed).toEqual({
      impl_runtime: undefined,
      impl_model: 'sol',
      impl_effort: 'medium'
    });
  });

  test('keeps an inherited target whose controller runtime is unknown', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'inherit', impl_model: 'sol' },
      CATALOG,
      null
    );

    expect(narrowed.impl_model).toBe('sol');
  });

  test('drops a model the inherited controller runtime cannot run', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'inherit', impl_model: 'sol' },
      CATALOG,
      'claude'
    );

    expect(narrowed.impl_model).toBe(undefined);
  });

  test('drops an effort outside the surviving model union', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'codex', impl_model: 'sol', impl_effort: 'high' },
      CATALOG,
      null
    );

    expect(narrowed).toEqual({
      impl_runtime: 'codex',
      impl_model: 'sol',
      impl_effort: undefined
    });
  });

  test('keeps a runner-level effort the model itself does not declare', () => {
    const narrowed = narrowImplTarget(
      { impl_runtime: 'claude', impl_model: 'opus', impl_effort: 'high' },
      RUNNER_LEVEL_CATALOG,
      null
    );

    expect(narrowed).toEqual({
      impl_runtime: 'claude',
      impl_model: 'opus',
      impl_effort: 'high'
    });
  });
});

describe('buildPresetDiff', () => {
  test('reports added, removed and changed keys and skips equal ones', () => {
    const diff = buildPresetDiff(
      { impl_runtime: 'claude', impl_model: 'opus', impl_speed: 'fast' },
      { impl_runtime: 'codex', impl_model: 'opus', impl_effort: 'high' }
    );

    expect(diff.rows).toEqual([
      {
        key: 'impl_runtime',
        label: '위임 대상',
        before: 'claude',
        after: 'codex',
        kind: 'changed'
      },
      {
        key: 'impl_effort',
        label: '구현 effort',
        before: null,
        after: 'high',
        kind: 'added'
      },
      {
        key: 'impl_speed',
        label: '구현 속도',
        before: 'fast',
        after: null,
        kind: 'removed'
      }
    ]);
  });

  test('orders rows by the preset kv keys before the orchestration keys', () => {
    const diff = buildPresetDiff(
      {},
      {
        orchestration_model: 'sol',
        impl_model: 'sol',
        workflow_mode: 'fast_track'
      }
    );

    expect(diff.rows.map((row) => row.key)).toEqual([
      'workflow_mode',
      'impl_model',
      'orchestration_model'
    ]);
  });

  test('compares exactly the seventeen keys a global apply writes', () => {
    const every_key = Object.fromEntries(
      [...PRESET_KV_KEYS, ...ORCHESTRATION_KEYS, ...WORKSPACE_KV_KEYS].map(
        (key) => [key, 'x']
      )
    );

    const diff = buildPresetDiff({}, every_key);

    expect(diff.rows.map((row) => row.key)).toEqual([
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
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]);
    expect(diff.ignored_keys).toEqual([
      ...QUICK_FIX_KV_KEYS,
      'base_sync_accept_local_commits',
      'bdui_url'
    ]);
  });

  test('returns impl_dispatch as ignored rather than comparing it', () => {
    const diff = buildPresetDiff({}, { impl_dispatch: 'main' });

    expect(diff.rows).toEqual([]);
    expect(diff.ignored_keys).toEqual(['impl_dispatch']);
  });

  test('never previews the kv-only quick_fix model as cleared', () => {
    const diff = buildPresetDiff(
      { quick_fix_impl_model: 'sol' },
      { impl_runtime: 'codex' }
    );

    expect(diff.rows.map((row) => row.key)).toEqual(['impl_runtime']);
  });

  test('returns no rows for an empty preset against empty settings', () => {
    const diff = buildPresetDiff({}, {});

    expect(diff).toEqual({ rows: [], ignored_keys: [] });
  });
});

describe('normalizeQuickFixLanePreset', () => {
  const TARGET_ENUMS = {
    quick_fix_orchestration_model: ['opus', 'sol'],
    quick_fix_orchestration_effort: ['high', 'xhigh'],
    quick_fix_orchestration_speed: ['default', 'fast'],
    quick_fix_impl_dispatch: ['delegated', 'main'],
    quick_fix_impl_runtime: ['claude', 'codex'],
    quick_fix_impl_model: ['opus', 'sol'],
    quick_fix_impl_effort: ['auto', 'high'],
    quick_fix_impl_speed: ['default', 'fast']
  };

  test('maps compatible values and reports unmapped preset fields', () => {
    const normalized = normalizeQuickFixLanePreset(
      {
        workflow_mode: 'fast_track',
        impl_dispatch: 'delegated',
        impl_runtime: 'codex',
        impl_model: 'sol',
        impl_effort: 'high',
        impl_speed: 'fast',
        orchestration_model: 'opus',
        orchestration_effort: 'xhigh',
        orchestration_speed: 'default'
      },
      TARGET_ENUMS
    );

    expect(normalized.values).toEqual({
      quick_fix_orchestration_model: 'opus',
      quick_fix_orchestration_effort: 'xhigh',
      quick_fix_orchestration_speed: 'default',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      quick_fix_impl_effort: 'high',
      quick_fix_impl_speed: 'fast'
    });
    expect(normalized.warnings).toEqual([]);
    expect(normalized.skipped_keys).toEqual(['workflow_mode']);
  });

  test('unsets inherit, model auto, and every absent source key', () => {
    const normalized = normalizeQuickFixLanePreset(
      {
        impl_runtime: 'inherit',
        impl_model: 'auto',
        impl_effort: 'auto'
      },
      TARGET_ENUMS
    );

    expect(normalized.values).toEqual({
      quick_fix_orchestration_model: null,
      quick_fix_orchestration_effort: null,
      quick_fix_orchestration_speed: null,
      quick_fix_impl_dispatch: null,
      quick_fix_impl_runtime: null,
      quick_fix_impl_model: null,
      quick_fix_impl_effort: 'auto',
      quick_fix_impl_speed: null
    });
    expect(normalized.warnings).toEqual([
      'lane_incompatible:quick_fix_impl_runtime',
      'lane_incompatible:quick_fix_impl_model'
    ]);
    expect(normalized.skipped_keys).toEqual([]);
  });
});

describe('buildQuickFixPresetDiff', () => {
  test('previews inherit auto and absent keys as general-profile fallthrough', () => {
    const target_enums = {
      quick_fix_orchestration_model: ['opus', 'sol'],
      quick_fix_orchestration_effort: ['high'],
      quick_fix_orchestration_speed: ['default', 'fast'],
      quick_fix_impl_dispatch: ['delegated', 'main'],
      quick_fix_impl_runtime: ['claude', 'codex'],
      quick_fix_impl_model: ['opus', 'sol'],
      quick_fix_impl_effort: ['auto', 'high'],
      quick_fix_impl_speed: ['default', 'fast']
    };
    const current = {
      quick_fix_orchestration_model: 'opus',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      quick_fix_impl_speed: 'fast'
    };

    const diff = buildQuickFixPresetDiff(
      current,
      {
        impl_runtime: 'inherit',
        impl_model: 'auto',
        impl_effort: 'auto'
      },
      target_enums
    );

    expect(diff.rows).toMatchObject([
      { key: 'quick_fix_orchestration_model', after: null },
      { key: 'quick_fix_impl_dispatch', after: null },
      { key: 'quick_fix_impl_runtime', after: null },
      { key: 'quick_fix_impl_model', after: null },
      { key: 'quick_fix_impl_effort', after: 'auto' },
      { key: 'quick_fix_impl_speed', after: null }
    ]);
    expect(diff.ignored_keys).toEqual([]);
  });
});

describe('orchestrationModelOptions', () => {
  test('filters the model list by the UI-only runtime choice', () => {
    expect(orchestrationModelOptions(CATALOG, 'claude')).toEqual([
      'opus',
      'haiku'
    ]);
  });

  test('lists every model when no runtime filter is chosen', () => {
    expect(orchestrationModelOptions(CATALOG, null)).toEqual([
      'opus',
      'haiku',
      'sol',
      'terra'
    ]);
  });
});

describe('buildExecutionOptionView', () => {
  test('keeps a stored token the narrowed choice list no longer offers', () => {
    const view = buildExecutionOptionView(
      'impl_model',
      ['auto', 'opus'],
      { impl_runtime: 'claude', impl_model: 'sol' },
      PROJECTION,
      CATALOG
    );

    expect(view.options[0]).toEqual({
      value: 'sol',
      label: 'sol (비호환)',
      full_value: 'sol'
    });
  });

  test('keeps stored tokens separate from concrete option labels', () => {
    const view = buildExecutionOptionView(
      'spec_review_model',
      ['codex', 'fable'],
      {},
      PROJECTION,
      CATALOG
    );

    expect(view.unset_label).toBe('기본값 사용 — 5.6-sol');
    expect(view.options).toEqual([
      { value: 'codex', label: '5.6-sol', full_value: 'gpt-5.6-sol' },
      { value: 'fable', label: 'fable', full_value: 'fable' }
    ]);
  });

  test('recalculates dependent effort from the current reviewer draft', () => {
    const codex = buildExecutionOptionView(
      'plan_review_effort',
      REVIEW_EFFORTS,
      { plan_review_model: 'codex' },
      PROJECTION,
      CATALOG
    );
    const fable = buildExecutionOptionView(
      'plan_review_effort',
      REVIEW_EFFORTS,
      { plan_review_model: 'fable' },
      PROJECTION,
      CATALOG
    );

    expect(codex.unset_label).toBe('기본값 사용 — xhigh');
    expect(fable.unset_label).toBe('기본값 사용 — high');
  });

  test('recalculates implementation model label from runtime and model draft', () => {
    const view = buildExecutionOptionView(
      'impl_model',
      ['auto', 'sol', 'terra'],
      { impl_runtime: 'codex' },
      PROJECTION,
      CATALOG
    );

    expect(view.unset_label).toBe('기본값 사용 — 5.6-sol');
    expect(view.options[2]).toEqual({
      value: 'terra',
      label: '5.6-terra',
      full_value: 'gpt-5.6-terra'
    });
  });
});

describe('buildSessionDefaultsPatch', () => {
  test('sends only the keys whose value changed', () => {
    const patch = buildSessionDefaultsPatch(
      {
        workflow_mode: 'standard',
        spec_review_speed: 'default',
        impl_speed: 'fast'
      },
      {
        workflow_mode: 'fast_track',
        spec_review_speed: 'fast',
        impl_speed: 'fast'
      }
    );

    expect(patch).toEqual({
      workflow_mode: 'fast_track',
      spec_review_speed: 'fast'
    });
  });

  test('never sends impl_dispatch to the workspace kv layer', () => {
    const patch = buildSessionDefaultsPatch(
      { impl_dispatch: 'delegated' },
      { impl_dispatch: 'main' }
    );

    expect(patch).toEqual({});
  });

  test('sends null for a key the draft cleared back to (기본)', () => {
    const patch = buildSessionDefaultsPatch({ impl_speed: 'fast' }, {});

    expect(patch).toEqual({ impl_speed: null });
  });

  test('returns an empty patch when nothing changed', () => {
    const patch = buildSessionDefaultsPatch(
      { workflow_mode: 'standard' },
      { workflow_mode: 'standard' }
    );

    expect(patch).toEqual({});
  });

  test('keeps workflow_mode=standard as an explicit value, not a deletion', () => {
    const patch = buildSessionDefaultsPatch({}, { workflow_mode: 'standard' });

    expect(patch).toEqual({ workflow_mode: 'standard' });
  });

  test('diffs quick_fix_impl_model like any other workspace kv key', () => {
    const patch = buildSessionDefaultsPatch(
      { quick_fix_impl_model: 'sol' },
      { quick_fix_impl_model: 'terra' }
    );

    expect(patch).toEqual({ quick_fix_impl_model: 'terra' });
  });

  test('diffs bdui_url like any other workspace kv key', () => {
    const patch = buildSessionDefaultsPatch(
      { bdui_url: 'http://one:3000' },
      { bdui_url: 'http://two:3000' }
    );

    expect(patch).toEqual({ bdui_url: 'http://two:3000' });
  });

  test('sends a dropped bdui_url as the null deletion request', () => {
    const patch = buildSessionDefaultsPatch(
      { bdui_url: 'http://one:3000' },
      {}
    );

    expect(patch).toEqual({ bdui_url: null });
  });

  test('sends the checked bool key as a JSON boolean, not the draft marker', () => {
    const patch = buildSessionDefaultsPatch(
      {},
      { base_sync_accept_local_commits: BOOLEAN_DRAFT_ON }
    );

    expect(patch).toEqual({ base_sync_accept_local_commits: true });
  });

  test('sends an unchecked bool key as the null deletion request', () => {
    const patch = buildSessionDefaultsPatch(
      { base_sync_accept_local_commits: BOOLEAN_DRAFT_ON },
      {}
    );

    expect(patch).toEqual({ base_sync_accept_local_commits: null });
  });

  test('sends nothing while the bool key is unchanged', () => {
    const patch = buildSessionDefaultsPatch(
      { base_sync_accept_local_commits: BOOLEAN_DRAFT_ON },
      { base_sync_accept_local_commits: BOOLEAN_DRAFT_ON }
    );

    expect(patch).toEqual({});
  });
});

describe('adoptSessionDefaultValues', () => {
  test('turns a stored true into the draft marker the checkbox reads', () => {
    const values = adoptSessionDefaultValues({
      base_sync_accept_local_commits: true,
      workflow_mode: 'fast_track'
    });

    expect(values).toEqual({
      base_sync_accept_local_commits: BOOLEAN_DRAFT_ON,
      workflow_mode: 'fast_track'
    });
  });

  test('drops a stored false, which means the same as absence', () => {
    const values = adoptSessionDefaultValues({
      base_sync_accept_local_commits: false
    });

    expect(values).toEqual({});
  });

  test('drops any non-string value on a non-bool key', () => {
    const values = adoptSessionDefaultValues({ workflow_mode: 3 });

    expect(values).toEqual({});
  });

  test('reads a missing map as the empty layer', () => {
    expect(adoptSessionDefaultValues(null)).toEqual({});
  });
});

describe('isHttpOriginValue', () => {
  test('accepts an absolute http origin with a port', () => {
    expect(isHttpOriginValue('http://100.64.0.1:3000')).toBe(true);
  });

  test('accepts an https origin without a port', () => {
    expect(isHttpOriginValue('https://beads.example')).toBe(true);
  });

  test('rejects a trailing slash, which would concatenate into //api', () => {
    expect(isHttpOriginValue('http://100.64.0.1:3000/')).toBe(false);
  });

  test('rejects a path, query, fragment, or userinfo', () => {
    expect(isHttpOriginValue('http://host:3000/api')).toBe(false);
    expect(isHttpOriginValue('http://host:3000?a=1')).toBe(false);
    expect(isHttpOriginValue('http://host:3000#x')).toBe(false);
    expect(isHttpOriginValue('http://user:pw@host:3000')).toBe(false);
  });

  test('rejects a scheme-less host and a non-http scheme', () => {
    expect(isHttpOriginValue('100.64.0.1:3000')).toBe(false);
    expect(isHttpOriginValue('ftp://host')).toBe(false);
    expect(isHttpOriginValue('')).toBe(false);
  });
});

describe('buildOrchestrationPatch', () => {
  test('sends only the changed orchestration values', () => {
    const patch = buildOrchestrationPatch(
      { orchestration_model: 'opus', orchestration_effort: 'high' },
      { orchestration_model: 'sol', orchestration_effort: 'high' }
    );

    expect(patch).toEqual({ orchestration_model: 'sol' });
  });

  test('never carries a session key into the orchestration payload', () => {
    const patch = buildOrchestrationPatch(
      {},
      /** @type {any} */ ({ orchestration_model: 'sol', impl_model: 'sol' })
    );

    expect(patch).toEqual({ orchestration_model: 'sol' });
  });

  test('diffs quick_fix orchestration values with the general values', () => {
    const patch = buildOrchestrationPatch(
      { quick_fix_orchestration_model: 'opus' },
      { quick_fix_orchestration_model: 'sol' }
    );

    expect(patch).toEqual({ quick_fix_orchestration_model: 'sol' });
  });
});
