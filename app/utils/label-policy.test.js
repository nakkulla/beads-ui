import { describe, expect, test } from 'vitest';
import {
  isChipEnabled,
  isLabelVisible,
  visibleLabels
} from './label-policy.js';

/**
 * @param {Partial<Omit<import('./label-policy.js').DisplayPolicy, 'chips'>> & { chips?: Partial<import('./label-policy.js').DisplayPolicyChips> }} [overrides]
 * @returns {import('./label-policy.js').DisplayPolicy}
 */
function policy(overrides = {}) {
  const { chips: chip_overrides, ...rest } = overrides;
  return {
    revision: 1,
    hidden_labels: [],
    hidden_prefixes: [],
    visible_labels: [],
    ...rest,
    chips: {
      route: true,
      fast_track: true,
      pr: true,
      from: true,
      blocked: true,
      stepper: true,
      ...chip_overrides
    }
  };
}

describe('isLabelVisible', () => {
  test('shows a label no rule mentions', () => {
    expect(isLabelVisible('frontend', policy())).toBe(true);
  });

  test('hides an exact match in hidden_labels', () => {
    expect(isLabelVisible('pr', policy({ hidden_labels: ['pr'] }))).toBe(false);
  });

  test('hides a label matching a hidden prefix', () => {
    const p = policy({ hidden_prefixes: ['reviewed:'] });

    expect(isLabelVisible('reviewed:spec', p)).toBe(false);
  });

  test('does not treat a hidden prefix as a suffix or substring match', () => {
    const p = policy({ hidden_prefixes: ['reviewed:'] });

    expect(isLabelVisible('not-reviewed:spec', p)).toBe(true);
  });

  test('lets visible_labels win over an exact hidden entry', () => {
    const p = policy({ hidden_labels: ['pr'], visible_labels: ['pr'] });

    expect(isLabelVisible('pr', p)).toBe(true);
  });

  test('lets visible_labels win over a hidden prefix', () => {
    const p = policy({
      hidden_prefixes: ['reviewed:'],
      visible_labels: ['reviewed:impl']
    });

    expect(isLabelVisible('reviewed:impl', p)).toBe(true);
  });

  test('keeps hiding siblings of a prefix-exempted label', () => {
    const p = policy({
      hidden_prefixes: ['reviewed:'],
      visible_labels: ['reviewed:impl']
    });

    expect(isLabelVisible('reviewed:spec', p)).toBe(false);
  });

  test('shows everything when no policy has arrived yet', () => {
    expect(isLabelVisible('has:spec', null)).toBe(true);
  });

  test('ignores an empty prefix rule', () => {
    expect(isLabelVisible('anything', policy({ hidden_prefixes: [''] }))).toBe(
      true
    );
  });
});

describe('visibleLabels', () => {
  test('filters a label list while preserving order', () => {
    const p = policy({
      hidden_labels: ['pr'],
      hidden_prefixes: ['reviewed:']
    });

    const result = visibleLabels(
      ['frontend', 'pr', 'reviewed:spec', 'backend'],
      p
    );

    expect(result).toEqual(['frontend', 'backend']);
  });

  test('drops non-string entries', () => {
    expect(visibleLabels(['ok', 42, null], policy())).toEqual(['ok']);
  });

  test('returns an empty list for a non-array input', () => {
    expect(visibleLabels(undefined, policy())).toEqual([]);
  });
});

describe('isChipEnabled', () => {
  test('reads an explicit toggle', () => {
    expect(isChipEnabled(policy({ chips: { from: false } }), 'from')).toBe(
      false
    );
  });

  test('defaults an absent toggle to on', () => {
    const partial = /** @type {any} */ ({ chips: { route: false } });

    expect(isChipEnabled(partial, 'stepper')).toBe(true);
  });

  test('defaults to on when no policy has arrived yet', () => {
    expect(isChipEnabled(null, 'blocked')).toBe(true);
  });
});
