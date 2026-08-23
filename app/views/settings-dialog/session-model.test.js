import { describe, expect, test } from 'vitest';
import {
  BEAD_APPLY_KEYS,
  IMPL_DISPATCHES,
  IMPL_PRESET_KEYS,
  ORCHESTRATION_KEYS,
  PRESET_KV_KEYS,
  REVIEW_EFFORTS,
  WORKSPACE_KV_KEYS,
  buildExecutionOptionView,
  buildOrchestrationPatch,
  buildPresetDiff,
  buildSessionDefaultsPatch,
  implEffortOptions,
  implModelOptions,
  isDelegationDisabled,
  narrowImplTarget,
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
  test('names the twelve per-bead keys and no orchestration key', () => {
    expect(BEAD_APPLY_KEYS).toHaveLength(12);
    expect(BEAD_APPLY_KEYS).toContain('impl_dispatch');
    expect(BEAD_APPLY_KEYS).toContain('impl_speed');
    expect(
      BEAD_APPLY_KEYS.some((key) => key.startsWith('orchestration_'))
    ).toBe(false);
  });

  test('drops impl_dispatch from the twelve workspace kv keys', () => {
    expect(WORKSPACE_KV_KEYS).toHaveLength(12);

    expect(WORKSPACE_KV_KEYS).not.toContain('impl_dispatch');
  });

  test('mirrors the server kv-only quick_fix_impl_model key last', () => {
    expect(WORKSPACE_KV_KEYS.at(-1)).toBe('quick_fix_impl_model');
    expect(IMPL_PRESET_KEYS).not.toContain('quick_fix_impl_model');
  });

  test('names the eleven kv keys a global preset apply replaces', () => {
    expect(PRESET_KV_KEYS).toEqual([
      'workflow_mode',
      'spec_review_model',
      'spec_review_effort',
      'plan_review_model',
      'plan_review_effort',
      'impl_review_model',
      'impl_review_effort',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]);
  });

  test('offers 위임 and 메인 as the two execution modes', () => {
    expect(IMPL_DISPATCHES).toEqual(['delegated', 'main']);
  });

  test('mirrors all fifteen execution preset keys', () => {
    expect(IMPL_PRESET_KEYS).toEqual([
      ...BEAD_APPLY_KEYS,
      ...ORCHESTRATION_KEYS
    ]);
    expect(IMPL_PRESET_KEYS).toHaveLength(15);
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

  test('compares exactly the fourteen keys a global apply writes', () => {
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
      'plan_review_model',
      'plan_review_effort',
      'impl_review_model',
      'impl_review_effort',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed',
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]);
    expect(diff.ignored_keys).toEqual(['quick_fix_impl_model']);
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
      { workflow_mode: 'standard', impl_speed: 'fast' },
      { workflow_mode: 'fast_track', impl_speed: 'fast' }
    );

    expect(patch).toEqual({ workflow_mode: 'fast_track' });
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
});
