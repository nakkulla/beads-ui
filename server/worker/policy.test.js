import { describe, expect, test } from 'vitest';
import { resolvePolicies } from './policy.js';

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
