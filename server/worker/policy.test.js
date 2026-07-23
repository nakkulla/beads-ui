import { describe, expect, test } from 'vitest';
import { resolveExecSettings, resolvePolicies } from './policy.js';

describe('worker/policy resolution (bead > workspace global > default)', () => {
  test('defaults to auto_merge / auto_rereview when nothing is set', () => {
    expect(resolvePolicies({ bead: {}, queue: {} })).toEqual({
      merge_policy: 'auto_merge',
      drift_policy: 'auto_rereview'
    });
  });

  test('workspace global overrides the default', () => {
    expect(
      resolvePolicies({
        bead: {},
        queue: { merge_policy: 'pr_stop', drift_policy: 'halt' }
      })
    ).toEqual({ merge_policy: 'pr_stop', drift_policy: 'halt' });
  });

  test('bead metadata overrides the workspace global', () => {
    expect(
      resolvePolicies({
        bead: { merge_policy: 'auto_merge', drift_policy: 'auto_rereview' },
        queue: { merge_policy: 'pr_stop', drift_policy: 'halt' }
      })
    ).toEqual({ merge_policy: 'auto_merge', drift_policy: 'auto_rereview' });
  });

  test('the two keys resolve independently', () => {
    expect(
      resolvePolicies({
        bead: { merge_policy: 'pr_stop' },
        queue: { drift_policy: 'halt' }
      })
    ).toEqual({ merge_policy: 'pr_stop', drift_policy: 'halt' });
  });

  test('a non-enum value at any level falls through to the next level', () => {
    expect(
      resolvePolicies({
        bead: { merge_policy: 'yolo', drift_policy: 42 },
        queue: { merge_policy: 'pr_stop', drift_policy: 'bogus' }
      })
    ).toEqual({ merge_policy: 'pr_stop', drift_policy: 'auto_rereview' });
  });

  test('null/undefined levels are tolerated', () => {
    expect(resolvePolicies({ bead: null, queue: undefined })).toEqual({
      merge_policy: 'auto_merge',
      drift_policy: 'auto_rereview'
    });
  });
});

describe('worker/policy resolveExecSettings (bead > global > default, runner-first compat)', () => {
  test('hardcoded default (runner=claude, rest unset) when nothing is set', () => {
    const r = resolveExecSettings({ bead: {}, defaults: {} });
    expect(r.worker_runner).toBe('claude');
    expect(r.orchestration_model).toBe(undefined);
    expect(r.orchestration_effort).toBe(undefined);
    expect(r.review_model).toBe(undefined);
    expect(r.impl_model).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
    // Tolerates null/undefined levels.
    expect(
      resolveExecSettings({ bead: null, defaults: undefined }).worker_runner
    ).toBe('claude');
  });

  test('workspace global fills every key and stamps all 5 when the bead is bare', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: {
        worker_runner: 'codex',
        orchestration_model: 'gpt-5.6',
        orchestration_effort: 'high',
        review_model: 'opus',
        impl_model: 'sonnet'
      }
    });
    expect(r).toMatchObject({
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.6',
      orchestration_effort: 'high',
      review_model: 'opus',
      impl_model: 'sonnet'
    });
    expect(r.stamped_keys).toEqual([
      'worker_runner',
      'orchestration_model',
      'orchestration_effort',
      'review_model',
      'impl_model'
    ]);
  });

  test('bead metadata beats the workspace global and stamps nothing', () => {
    const r = resolveExecSettings({
      bead: {
        runner: 'codex',
        model: 'gpt-5.4',
        effort: 'low',
        review_model: 'skip',
        impl_model: 'haiku'
      },
      defaults: {
        worker_runner: 'claude',
        orchestration_model: 'opus',
        orchestration_effort: 'high',
        review_model: 'opus',
        impl_model: 'sonnet'
      }
    });
    expect(r).toMatchObject({
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.4',
      orchestration_effort: 'low',
      review_model: 'skip',
      impl_model: 'haiku'
    });
    expect(r.stamped_keys).toEqual([]);
  });

  test('incompatible cross-layer (bead runner=claude, global model=gpt-5.6) resolves model unset, no stamp', () => {
    const r = resolveExecSettings({
      bead: { runner: 'claude' },
      defaults: { orchestration_model: 'gpt-5.6' }
    });
    expect(r.worker_runner).toBe('claude');
    expect(r.orchestration_model).toBe(undefined);
    expect(r.stamped_keys).toEqual([]);
  });

  test('runner-first: a global runner makes its global model compatible → both stamp', () => {
    const r = resolveExecSettings({
      bead: {},
      defaults: { worker_runner: 'codex', orchestration_model: 'gpt-5.6' }
    });
    expect(r.worker_runner).toBe('codex');
    expect(r.orchestration_model).toBe('gpt-5.6');
    expect(r.stamped_keys).toEqual(['worker_runner', 'orchestration_model']);
  });

  test('runner-independent keys still resolve when the cross-layer model is skipped', () => {
    const r = resolveExecSettings({
      bead: { runner: 'claude' },
      defaults: {
        orchestration_model: 'gpt-5.6',
        orchestration_effort: 'medium'
      }
    });
    // runner from bead (not stamped), model skipped as incompatible (unset, not
    // stamped), effort adopted from global (stamped).
    expect(r.worker_runner).toBe('claude');
    expect(r.orchestration_model).toBe(undefined);
    expect(r.orchestration_effort).toBe('medium');
    expect(r.stamped_keys).toEqual(['orchestration_effort']);
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
