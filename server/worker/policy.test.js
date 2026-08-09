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

  test('workspace global fills every key and stamps all 10 in contract order when the bead is bare', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        spec_review_model: 'opus',
        spec_review_effort: 'high',
        impl_review_model: 'self',
        impl_review_effort: 'low',
        plan_review_model: 'fable',
        plan_review_effort: 'xhigh',
        impl_model: 'sonnet',
        impl_effort: 'medium'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'sonnet',
      orchestration_effort: 'high',
      spec_review_model: 'opus',
      spec_review_effort: 'high',
      impl_review_model: 'self',
      impl_review_effort: 'low',
      plan_review_model: 'fable',
      plan_review_effort: 'xhigh',
      impl_model: 'sonnet',
      impl_effort: 'medium'
    });
    expect(r.stamped_keys).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'spec_review_model',
      'spec_review_effort',
      'impl_review_model',
      'impl_review_effort',
      'plan_review_model',
      'plan_review_effort',
      'impl_model',
      'impl_effort'
    ]);
  });

  test('bead metadata beats the workspace global and stamps nothing', () => {
    const r = resolveExecSettings({
      bead: {
        model: 'fable',
        effort: 'low',
        spec_review_model: 'skip',
        spec_review_effort: 'low',
        impl_review_model: 'codex',
        impl_review_effort: 'xhigh',
        plan_review_model: 'skip',
        plan_review_effort: 'medium',
        impl_model: 'haiku',
        impl_effort: 'high'
      },
      defaults: {
        orchestration_model: 'opus',
        orchestration_effort: 'high',
        spec_review_model: 'opus',
        spec_review_effort: 'high',
        impl_review_model: 'self',
        impl_review_effort: 'low',
        plan_review_model: 'fable',
        plan_review_effort: 'xhigh',
        impl_model: 'sonnet',
        impl_effort: 'medium'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'fable',
      orchestration_effort: 'low',
      spec_review_model: 'skip',
      spec_review_effort: 'low',
      impl_review_model: 'codex',
      impl_review_effort: 'xhigh',
      plan_review_model: 'skip',
      plan_review_effort: 'medium',
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

    const global_only = resolveExecSettings({
      bead: {},
      defaults: { plan_review_model: 'opus' }
    });
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

  test('a per-step review effort outside the fixed 4 falls through to the global', () => {
    const r = resolveExecSettings({
      bead: { spec_review_effort: 'max' },
      defaults: { spec_review_effort: 'high' }
    });

    expect(r.spec_review_effort).toBe('high');
    // The bead SET the key, so it is not a stamp/revert target.
    expect(r.stamped_keys).toEqual([]);
  });

  test('a retired codex model value falls back to opus at both layers', () => {
    const bead_pinned = resolveExecSettings({
      bead: { model: 'gpt-5.6' },
      defaults: {}
    });
    expect(bead_pinned.orchestration_model).toBe('opus');
    expect(bead_pinned.stamped_keys).toEqual([]);

    const global_only = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'gpt-5.6',
        orchestration_effort: 'medium'
      }
    });
    // The stale model is dropped (fallback, not stamped); the valid effort still
    // resolves from the global layer.
    expect(global_only.orchestration_model).toBe('opus');
    expect(global_only.orchestration_effort).toBe('medium');
    expect(global_only.stamped_keys).toEqual(['orchestration_effort']);
  });

  test('a global model still beats the fallback and is stamped', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: { orchestration_model: 'sonnet' }
    });

    expect(r.orchestration_model).toBe('sonnet');
    expect(r.stamped_keys).toEqual(['orchestration_model']);
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

  test('an invalid bead value falls through to the global, but a bead-SET key is never stamped', () => {
    const r = resolveExecSettings({
      bead: { effort: 'ultra' },
      defaults: { orchestration_effort: 'high' }
    });
    // Invalid bead effort falls through to the global for the resolved value...
    expect(r.orchestration_effort).toBe('high');
    // ...but the bead already set the key, so it is not a stamp/revert target.
    expect(r.stamped_keys).toEqual([]);
  });

  test('keys resolve independently across bead and global layers', () => {
    const r = resolveExecSettings({
      bead: { spec_review_model: 'skip' },
      defaults: { impl_model: 'haiku' }
    });
    expect(r.spec_review_model).toBe('skip');
    expect(r.impl_model).toBe('haiku');
    expect(r.stamped_keys).toEqual(['impl_model']);
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
    expect(r.stamped_keys).toEqual(['orchestration_model']);
  });

  test('falls back to opus on claude for an unknown model', () => {
    const r = resolveExecSettings({
      bead: { model: 'grok4' },
      defaults: {}
    });

    expect(r.orchestration_model).toBe('opus');
    expect(r.runner).toBe('claude');
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

  test('leaves the effort unset when the resolved model rejects it', () => {
    const r = resolveExecSettings({
      bead: { model: 'sol', effort: 'max' },
      defaults: {}
    });

    expect(r.orchestration_model).toBe('sol');
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('falls the effort through to the global when the model rejects the bead value', () => {
    const r = resolveExecSettings({
      bead: { model: 'sol', effort: 'max' },
      defaults: { orchestration_effort: 'xhigh' }
    });

    expect(r.orchestration_effort).toBe('xhigh');
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
  });
});
