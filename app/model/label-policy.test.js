import { describe, expect, test } from 'vitest';
import {
  HIDDEN_LABELS,
  HIDDEN_LABEL_PREFIXES,
  JUDGEMENT_LABELS,
  splitLabels
} from './label-policy.js';

describe('fixed label policy (UI-dbn6 §4.2)', () => {
  test('hides the four retired and system prefixes', () => {
    const labels = [
      'reviewed:spec',
      'skipped:plan',
      'export:github',
      'provides:api'
    ];

    const out = splitLabels(labels);

    expect(out).toEqual({ judgement: [], plain: [] });
  });

  test('hides the two exact system labels', () => {
    const labels = ['has:spec', 'pr'];

    const out = splitLabels(labels);

    expect(out).toEqual({ judgement: [], plain: [] });
  });

  test('separates the six judgement labels in their declared order', () => {
    const labels = [
      'spec-after-blocker',
      'worker-ineligible',
      'session-preferred',
      'complex',
      'backend',
      'frontend'
    ];

    const out = splitLabels(labels);

    expect(out.judgement).toEqual([...JUDGEMENT_LABELS]);
  });

  test('keeps every other label as plain in its original order', () => {
    const labels = ['ux', 'frontend', 'perf', 'has:spec', 'docs'];

    const out = splitLabels(labels);

    expect(out.plain).toEqual(['ux', 'perf', 'docs']);
  });

  test('ignores non-string and empty entries', () => {
    const labels = /** @type {any} */ (['', null, 7, 'ok']);

    const out = splitLabels(labels);

    expect(out).toEqual({ judgement: [], plain: ['ok'] });
  });

  test('answers an empty split for a missing label list', () => {
    const out = splitLabels(undefined);

    expect(out).toEqual({ judgement: [], plain: [] });
  });

  test('declares the fixed constants of the retired display policy', () => {
    const constants = {
      HIDDEN_LABEL_PREFIXES,
      HIDDEN_LABELS,
      JUDGEMENT_LABELS
    };

    expect(constants).toEqual({
      HIDDEN_LABEL_PREFIXES: ['reviewed:', 'skipped:', 'export:', 'provides:'],
      HIDDEN_LABELS: ['has:spec', 'pr'],
      JUDGEMENT_LABELS: [
        'frontend',
        'backend',
        'complex',
        'session-preferred',
        'worker-ineligible',
        'spec-after-blocker'
      ]
    });
  });
});
