import { describe, expect, test } from 'vitest';
import * as policy from './policy.js';
import { resolveExecSettings } from './policy.js';

describe('worker/policy merge axis removal', () => {
  test('exports no merge/drift policy surface', () => {
    expect(/** @type {any} */ (policy).resolvePolicies).toBeUndefined();
    expect(/** @type {any} */ (policy).MERGE_POLICIES).toBeUndefined();
    expect(/** @type {any} */ (policy).DRIFT_POLICIES).toBeUndefined();
  });
});

describe('worker/policy resolveExecSettings (bead > global > final fallback)', () => {
  test('falls back to opus for the model and unset for the other 3 when nothing is set', () => {
    const r = resolveExecSettings({ bead: {}, defaults: {} });
    expect(r.orchestration_model).toBe('opus');
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.review_model).toBe(undefined);
    expect(r.impl_model).toBe(undefined);
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

  test('workspace global fills every key and stamps all 4 when the bead is bare', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        review_model: 'opus',
        impl_model: 'sonnet'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'sonnet',
      orchestration_effort: 'high',
      review_model: 'opus',
      impl_model: 'sonnet'
    });
    expect(r.stamped_keys).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'review_model',
      'impl_model'
    ]);
  });

  test('bead metadata beats the workspace global and stamps nothing', () => {
    const r = resolveExecSettings({
      bead: {
        model: 'fable',
        effort: 'low',
        review_model: 'skip',
        impl_model: 'haiku'
      },
      defaults: {
        orchestration_model: 'opus',
        orchestration_effort: 'high',
        review_model: 'opus',
        impl_model: 'sonnet'
      }
    });
    expect(r).toMatchObject({
      orchestration_model: 'fable',
      orchestration_effort: 'low',
      review_model: 'skip',
      impl_model: 'haiku'
    });
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
      bead: { review_model: 'skip' },
      defaults: { impl_model: 'haiku' }
    });
    expect(r.review_model).toBe('skip');
    expect(r.impl_model).toBe('haiku');
    expect(r.stamped_keys).toEqual(['impl_model']);
  });
});
