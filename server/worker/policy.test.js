import { describe, expect, test } from 'vitest';
import * as policy from './policy.js';
import { resolveExecSettings } from './policy.js';
import { resolveCatalog } from './runner-catalog.js';

describe('worker/policy merge axis removal', () => {
  test('exports no merge/drift policy surface', () => {
    expect(/** @type {any} */ (policy).resolvePolicies).toBeUndefined();
    expect(/** @type {any} */ (policy).MERGE_POLICIES).toBeUndefined();
    expect(/** @type {any} */ (policy).DRIFT_POLICIES).toBeUndefined();
  });
});

describe('worker/policy resolveExecSettings (bead > global > final fallback)', () => {
  test('falls back to opus for the model and unset for every other key when nothing is set', () => {
    const r = resolveExecSettings({ bead: {}, defaults: {} });
    expect(r.orchestration_model).toBe('opus');
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.orchestration_speed).toBe('default');
    expect(r.spec_review_model).toBe(undefined);
    expect(r.spec_review_effort).toBe(undefined);
    expect(r.impl_review_model).toBe(undefined);
    expect(r.impl_review_effort).toBe(undefined);
    expect(r.plan_review_model).toBe(undefined);
    expect(r.plan_review_effort).toBe(undefined);
    expect(r.impl_model).toBe(undefined);
    expect(r.impl_effort).toBe(undefined);
    // The hardcoded fallback is never a stamp/revert target.
    expect(r.stamped_keys).toEqual([]);
    // Tolerates null/undefined levels.
    expect(
      resolveExecSettings({ bead: null, defaults: undefined }).stamped_keys
    ).toEqual([]);
  });

  test('the runner axis is gone: worker_runner is neither resolved nor stamped', () => {
    const r = resolveExecSettings(
      /** @type {any} */ ({
        bead: { runner: 'codex' },
        defaults: { worker_runner: 'ccx' }
      })
    );
    expect(/** @type {any} */ (r).worker_runner).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('workspace global fills only the three orchestration keys when the bead is bare', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        orchestration_speed: 'default'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'sonnet',
      orchestration_effort: 'high',
      orchestration_speed: 'default'
    });
  });

  test('ignores every session key offered by the workspace layer (bd kv owns them)', () => {
    const r = resolveExecSettings(
      /** @type {any} */ ({
        bead: {},
        defaults: {
          orchestration_model: 'sonnet',
          spec_review_model: 'opus',
          spec_review_effort: 'high',
          plan_review_model: 'fable',
          plan_review_effort: 'xhigh',
          impl_review_model: 'self',
          impl_review_effort: 'low',
          impl_runtime: 'claude',
          impl_model: 'sonnet',
          impl_effort: 'medium'
        }
      })
    );

    expect(r.spec_review_model).toBe(undefined);
    expect(r.spec_review_effort).toBe(undefined);
    expect(r.plan_review_model).toBe(undefined);
    expect(r.plan_review_effort).toBe(undefined);
    expect(r.impl_review_model).toBe(undefined);
    expect(r.impl_review_effort).toBe(undefined);
    expect(r.impl_runtime).toBe(undefined);
    expect(r.impl_model).toBe(undefined);
    expect(r.impl_effort).toBe(undefined);
  });

  test('stamps nothing even when the workspace layer supplies every orchestration key', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        orchestration_speed: 'default'
      }
    });

    expect(r.stamped_keys).toEqual([]);
  });

  test('resolves the nine session keys from the bead layer alone', () => {
    const r = resolveExecSettings({
      bead: {
        spec_review_model: 'skip',
        spec_review_effort: 'low',
        plan_review_model: 'fable',
        plan_review_effort: 'medium',
        impl_review_model: 'codex',
        impl_review_effort: 'xhigh',
        impl_runtime: 'claude',
        impl_model: 'haiku',
        impl_effort: 'high'
      },
      defaults: {}
    });

    expect(r).toMatchObject({
      spec_review_model: 'skip',
      spec_review_effort: 'low',
      plan_review_model: 'fable',
      plan_review_effort: 'medium',
      impl_review_model: 'codex',
      impl_review_effort: 'xhigh',
      impl_runtime: 'claude',
      impl_model: 'haiku',
      impl_effort: 'high'
    });
  });

  test('bead metadata beats the workspace global and stamps nothing', () => {
    const r = resolveExecSettings({
      bead: {
        model: 'fable',
        effort: 'low',
        spec_review_model: 'skip',
        spec_review_effort: 'low',
        plan_review_model: 'skip',
        plan_review_effort: 'medium',
        impl_review_model: 'codex',
        impl_review_effort: 'xhigh',
        impl_runtime: 'claude',
        impl_model: 'haiku',
        impl_effort: 'high'
      },
      defaults: {
        orchestration_model: 'opus',
        orchestration_effort: 'high'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'fable',
      orchestration_effort: 'low',
      spec_review_model: 'skip',
      spec_review_effort: 'low',
      plan_review_model: 'skip',
      plan_review_effort: 'medium',
      impl_review_model: 'codex',
      impl_review_effort: 'xhigh',
      impl_runtime: 'claude',
      impl_model: 'haiku',
      impl_effort: 'high'
    });
    expect(r.stamped_keys).toEqual([]);
  });

  test('the retired review_model is neither resolved nor stamped (dotfiles-mqcj)', () => {
    const r = resolveExecSettings(
      /** @type {any} */ ({
        bead: { review_model: 'opus' },
        defaults: { review_model: 'codex' }
      })
    );

    expect(/** @type {any} */ (r).review_model).toBe(undefined);
    // No dual read: the retired key must not seed the per-step keys either.
    expect(r.spec_review_model).toBe(undefined);
    expect(r.impl_review_model).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('plan_review_model rejects self/opus at both layers (narrowed vocabulary)', () => {
    const bead_pinned = resolveExecSettings({
      bead: { plan_review_model: 'self' },
      defaults: {}
    });
    expect(bead_pinned.plan_review_model).toBe(undefined);

    const global_only = resolveExecSettings(
      /** @type {any} */ ({ bead: {}, defaults: { plan_review_model: 'opus' } })
    );
    expect(global_only.plan_review_model).toBe(undefined);
    expect(global_only.stamped_keys).toEqual([]);
  });

  test('impl_model accepts a codex short name and impl_effort the catalog union', () => {
    const r = resolveExecSettings({
      bead: { impl_model: 'luna', impl_effort: 'max' },
      defaults: {}
    });

    expect(r.impl_model).toBe('luna');
    expect(r.impl_effort).toBe('max');
    // impl_effort is a pass-through for the delegated leaf, so it validates
    // against the catalog-wide union — `max` stands even with no impl model set.
    const unpinned = resolveExecSettings({
      bead: { impl_effort: 'max' },
      defaults: {}
    });
    expect(unpinned.impl_effort).toBe('max');

    // A level no catalog model accepts is still rejected.
    const bogus = resolveExecSettings({
      bead: { impl_effort: 'ultra' },
      defaults: {}
    });
    expect(bogus.impl_effort).toBe(undefined);
  });

  test('infers runtime for known model-only legacy metadata without overwriting it', () => {
    const r = resolveExecSettings({
      bead: { impl_model: 'terra', impl_effort: 'high' },
      defaults: {}
    });

    expect(r.impl_runtime).toBe('codex');
    expect(r.impl_runtime_inferred).toBe(true);
    expect(r.stamped_keys).toEqual([]);
  });

  test('infers a Bead model runtime and ignores a workspace runtime', () => {
    const r = resolveExecSettings(
      /** @type {any} */ ({
        bead: { impl_model: 'terra' },
        defaults: { impl_runtime: 'claude' }
      })
    );

    expect(r.impl_runtime).toBe('codex');
    expect(r.impl_runtime_inferred).toBe(true);
    expect(r.invalid_reason).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('ignores a workspace-layer implementation model entirely', () => {
    const r = resolveExecSettings(
      /** @type {any} */ ({ bead: {}, defaults: { impl_model: 'terra' } })
    );

    expect(r.impl_runtime).toBe(undefined);
    expect(r.impl_model).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('rejects an invalid implementation target on the bead layer', () => {
    const r = resolveExecSettings({
      bead: { impl_model: 'terra', impl_effort: 'max' },
      defaults: {}
    });

    expect(r.invalid_reason).toBe('illegal_impl_effort');
  });

  test('explicit inherit resolves an exact model against the controller runtime', () => {
    const r = resolveExecSettings({
      bead: { impl_runtime: 'inherit', impl_model: 'terra' },
      defaults: { orchestration_model: 'sol' }
    });

    expect(r.impl_runtime).toBe('inherit');
    expect(r.impl_model).toBe('terra');
    expect(r.invalid_reason).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('rejects mismatched or unknown implementation targets instead of silently falling through', () => {
    const mismatch = resolveExecSettings({
      bead: { impl_runtime: 'claude', impl_model: 'terra' },
      defaults: {}
    });
    const unknown = resolveExecSettings(
      /** @type {any} */ ({
        bead: { impl_model: 'removed-model' },
        defaults: { impl_model: 'sonnet' }
      })
    );

    expect(mismatch.invalid_reason).toBe('provider_model_mismatch');
    expect(unknown.invalid_reason).toBe('unknown_impl_model');
  });

  test('a per-step review effort outside the fixed 4 resolves to unset', () => {
    const r = resolveExecSettings({
      bead: { spec_review_effort: 'max' },
      defaults: {}
    });

    // Fail-quiet: the key passes through to the session's own kv/harness layer.
    expect(r.spec_review_effort).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('a retired codex model blocks dispatch without reading lower layers', () => {
    const bead_pinned = resolveExecSettings({
      bead: { model: 'gpt-5.6' },
      defaults: {}
    });
    expect(bead_pinned.orchestration_model).toBe('opus');
    expect(bead_pinned.invalid_reason).toBe('invalid_orchestration_model');
    expect(bead_pinned.stamped_keys).toEqual([]);

    const global_only = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'gpt-5.6',
        orchestration_effort: 'medium'
      }
    });
    // The fallback value is display-only: an explicit invalid model blocks
    // dispatch before the lower effort layer can resolve or stamp.
    expect(global_only.orchestration_model).toBe('opus');
    expect(global_only.orchestration_effort).toBe(undefined);
    expect(global_only.invalid_reason).toBe('invalid_orchestration_model');
    expect(global_only.stamped_keys).toEqual([]);
  });

  test('a global model still beats the fallback and stamps nothing', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: { orchestration_model: 'sonnet' }
    });

    expect(r.orchestration_model).toBe('sonnet');
    expect(r.stamped_keys).toEqual([]);
  });

  test('a bead model beats both the global and the fallback without stamping', () => {
    const r = resolveExecSettings({
      bead: { model: 'haiku' },
      defaults: { orchestration_model: 'sonnet' }
    });

    expect(r.orchestration_model).toBe('haiku');
    expect(r.stamped_keys).toEqual([]);
  });

  test('exports the hardcoded model fallback as a named constant', () => {
    expect(policy.ORCHESTRATION_MODEL_FALLBACK).toBe('opus');
  });

  test('an invalid explicit outer effort blocks dispatch without falling through', () => {
    const r = resolveExecSettings({
      bead: { effort: 'ultra' },
      defaults: { orchestration_effort: 'high' }
    });
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.invalid_reason).toBe('illegal_orchestration_effort');
    expect(r.stamped_keys).toEqual([]);
  });

  test('session and orchestration keys resolve independently of one another', () => {
    const r = resolveExecSettings({
      bead: { spec_review_model: 'skip' },
      defaults: { orchestration_model: 'haiku' }
    });
    expect(r.spec_review_model).toBe('skip');
    expect(r.orchestration_model).toBe('haiku');
    expect(r.stamped_keys).toEqual([]);
  });

  test('fails closed for explicit invalid outer model, effort, and speed in precedence order', () => {
    const invalid_model = resolveExecSettings({
      bead: {
        model: 'removed-model',
        effort: 'ultra',
        orchestration_speed: 'fast'
      },
      defaults: {
        orchestration_model: 'sol',
        orchestration_effort: 'ultra',
        orchestration_speed: 'fast'
      }
    });
    const invalid_effort = resolveExecSettings({
      bead: { model: 'luna', effort: 'ultra', orchestration_speed: 'fast' },
      defaults: { orchestration_effort: 'max', orchestration_speed: 'default' }
    });
    const invalid_speed = resolveExecSettings({
      bead: { model: 'opus', effort: 'high', orchestration_speed: 'fast' },
      defaults: { orchestration_speed: 'default' }
    });

    expect(invalid_model.invalid_reason).toBe('invalid_orchestration_model');
    expect(invalid_effort.invalid_reason).toBe('illegal_orchestration_effort');
    expect(invalid_speed.invalid_reason).toBe('illegal_orchestration_speed');
  });

  test('accepts model-specific outer capabilities and defaults absent speed to Standard', () => {
    const sol = resolveExecSettings({
      bead: { model: 'sol', effort: 'ultra', orchestration_speed: 'fast' },
      defaults: {}
    });
    const luna = resolveExecSettings({
      bead: { model: 'luna', effort: 'max' },
      defaults: {}
    });

    expect(sol).toMatchObject({
      orchestration_effort: 'ultra',
      orchestration_speed: 'fast',
      invalid_reason: undefined
    });
    expect(luna).toMatchObject({
      orchestration_effort: 'max',
      orchestration_speed: 'default',
      invalid_reason: undefined
    });
  });
});

describe('worker/policy runner derivation from the model catalog', () => {
  test('derives claude for the hardcoded model fallback', () => {
    const r = resolveExecSettings({ bead: {}, defaults: {} });

    expect(r.orchestration_model).toBe('opus');
    expect(r.runner).toBe('claude');
  });

  test('accepts a codex model and derives the codex runner', () => {
    const r = resolveExecSettings({ bead: { model: 'sol' }, defaults: {} });

    expect(r.orchestration_model).toBe('sol');
    expect(r.runner).toBe('codex');
    expect(r.stamped_keys).toEqual([]);
  });

  test('derives the codex runner from a workspace-global codex model', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: { orchestration_model: 'terra' }
    });

    expect(r.orchestration_model).toBe('terra');
    expect(r.runner).toBe('codex');
    expect(r.stamped_keys).toEqual([]);
  });

  test('blocks an unknown model before it can run the display fallback', () => {
    const r = resolveExecSettings({
      bead: { model: 'grok4' },
      defaults: {}
    });

    expect(r.orchestration_model).toBe('opus');
    expect(r.runner).toBe('claude');
    expect(r.invalid_reason).toBe('invalid_orchestration_model');
  });

  test('accepts the per-model max effort luna alone allows', () => {
    const r = resolveExecSettings({
      bead: { model: 'luna', effort: 'max' },
      defaults: {}
    });

    expect(r.orchestration_model).toBe('luna');
    expect(r.runner).toBe('codex');
    expect(r.orchestration_effort).toBe('max');
  });

  test('blocks an effort the resolved model rejects', () => {
    const r = resolveExecSettings({
      bead: { model: 'sol', effort: 'minimal' },
      defaults: {}
    });

    expect(r.orchestration_model).toBe('sol');
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.invalid_reason).toBe('illegal_orchestration_effort');
    expect(r.stamped_keys).toEqual([]);
  });

  test('does not fall through when the model rejects the bead effort', () => {
    const r = resolveExecSettings({
      bead: { model: 'luna', effort: 'ultra' },
      defaults: { orchestration_effort: 'xhigh' }
    });

    expect(r.orchestration_effort).toBe(undefined);
    expect(r.invalid_reason).toBe('illegal_orchestration_effort');
    expect(r.stamped_keys).toEqual([]);
  });

  test('validates the effort against the resolved model, not the bead model', () => {
    const r = resolveExecSettings({
      bead: { effort: 'minimal' },
      defaults: {}
    });

    // `minimal` belongs to the codex runner-wide list; the resolved model is
    // claude/opus, so it is not a valid effort here.
    expect(r.orchestration_effort).toBe(undefined);
  });

  test('resolves a config-added model from an injected catalog', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { nova: { id: 'gpt-5.7-nova', efforts: ['max'] } } }
      },
      warn: () => {}
    });

    const r = resolveExecSettings({
      bead: { model: 'nova', effort: 'max' },
      defaults: {},
      catalog
    });

    expect(r.orchestration_model).toBe('nova');
    expect(r.runner).toBe('codex');
    expect(r.orchestration_effort).toBe('max');
  });

  test('rejects a model absent from the injected catalog', () => {
    const catalog = resolveCatalog({ active: ['claude'] });

    const r = resolveExecSettings({
      bead: { model: 'sol' },
      defaults: {},
      catalog
    });

    expect(r.orchestration_model).toBe('opus');
    expect(r.runner).toBe('claude');
    expect(r.invalid_reason).toBe('invalid_orchestration_model');
  });
});

describe('worker/policy default catalog = runtime catalog (impl review finding 1)', () => {
  test('resolves a config-added model without an injected catalog', async () => {
    const { mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
    const { tmpdir } = await import('node:os');
    const { join } = await import('node:path');
    const { __resetRuntimeCatalogForTest } = await import('./runner/index.js');
    const dir = mkdtempSync(join(tmpdir(), 'bdui-policy-catalog-'));
    const config_path = join(dir, 'config.toml');
    writeFileSync(
      config_path,
      '[runner.codex.models.nova]\nid = "gpt-5.7-nova"\nefforts = ["high"]\n'
    );
    const prev = process.env.BDUI_CONFIG_PATH;
    process.env.BDUI_CONFIG_PATH = config_path;
    __resetRuntimeCatalogForTest();
    try {
      const r = resolveExecSettings({
        bead: { model: 'nova', effort: 'high' },
        defaults: {}
      });

      expect(r.orchestration_model).toBe('nova');
      expect(r.runner).toBe('codex');
      expect(r.orchestration_effort).toBe('high');
    } finally {
      if (prev === undefined) {
        delete process.env.BDUI_CONFIG_PATH;
      } else {
        process.env.BDUI_CONFIG_PATH = prev;
      }
      __resetRuntimeCatalogForTest();
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('worker/policy rec_* invariance (UI-sbum §6)', () => {
  test('resolves identical settings with and without the recommendation keys', () => {
    const bead = {
      orchestration_model: 'sonnet',
      impl_runtime: 'codex'
    };

    const without_rec = resolveExecSettings({ bead, defaults: {} });
    const with_rec = resolveExecSettings({
      bead: /** @type {any} */ ({
        ...bead,
        rec: { rec_orchestration_model: 'fable' },
        rec_orchestration_model: 'fable',
        rec_impl_runtime: 'claude',
        rec_reason: 'contract_change+multi_repo'
      }),
      defaults: {}
    });

    expect(with_rec).toEqual(without_rec);
    expect(/** @type {any} */ (with_rec).rec).toBe(undefined);
    expect(/** @type {any} */ (with_rec).rec_orchestration_model).toBe(
      undefined
    );
    expect(with_rec.stamped_keys).not.toContain('rec_orchestration_model');
  });
});

describe('worker/policy bead_dependents invariance (UI-8x90 §6.2)', () => {
  test('resolves identical settings with and without the follow-up decoration', () => {
    const bead = {
      orchestration_model: 'sonnet',
      impl_runtime: 'codex'
    };

    const without_dependents = resolveExecSettings({ bead, defaults: {} });
    const with_dependents = resolveExecSettings({
      bead: /** @type {any} */ ({
        ...bead,
        bead_dependents: {
          'UI-1': { ids: ['UI-20'], root_dirs: { 'UI-20': '/repos/peer' } }
        }
      }),
      defaults: /** @type {any} */ ({
        bead_dependents: { 'UI-1': { ids: ['UI-21'] } }
      })
    });

    expect(with_dependents).toEqual(without_dependents);
    expect(/** @type {any} */ (with_dependents).bead_dependents).toBe(
      undefined
    );
    expect(with_dependents.stamped_keys).not.toContain('bead_dependents');
  });
});
