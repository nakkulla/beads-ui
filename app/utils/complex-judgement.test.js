import { describe, expect, test } from 'vitest';
import {
  COMPLEX_CHIP_LABEL,
  COMPLEX_LABEL,
  COMPLEX_REASONS,
  COMPLEX_REASON_TEXT,
  complexReason,
  complexReasonSentences,
  complexTooltip
} from './complex-judgement.js';

describe('complexReason 존재 조건 (UI-7nhi §1)', () => {
  test('reads the joined signals when label and reason agree', () => {
    const reason = complexReason(['complex'], {
      complex_reason: 'hard_diagnosis+invariant_reasoning'
    });

    expect(reason).toBe('hard_diagnosis+invariant_reasoning');
  });

  test('ignores a reason attached without the label', () => {
    const reason = complexReason([], { complex_reason: 'hard_diagnosis' });

    expect(reason).toBe('');
  });

  test('ignores a label attached without a reason', () => {
    const reason = complexReason(['complex'], {});

    expect(reason).toBe('');
  });

  test('drops a signal outside the contract enum', () => {
    const reason = complexReason(['complex'], { complex_reason: 'made_up' });

    expect(reason).toBe('');
  });

  test('keeps only the enum signals of a mixed reason', () => {
    const reason = complexReason(['complex'], {
      complex_reason: 'made_up+verification_by_judgment'
    });

    expect(reason).toBe('verification_by_judgment');
  });

  test('rejoins every surviving signal with a plus', () => {
    const reason = complexReason(['complex'], {
      complex_reason:
        'hard_diagnosis+invariant_reasoning+verification_by_judgment'
    });

    expect(reason).toBe(
      'hard_diagnosis+invariant_reasoning+verification_by_judgment'
    );
  });

  test('names the contract label the judgement rides on', () => {
    expect(COMPLEX_LABEL).toBe('complex');
  });

  test('names the single chip this module drives', () => {
    expect(COMPLEX_CHIP_LABEL).toBe('복잡');
  });

  test('carries one sentence per enum signal', () => {
    const missing = COMPLEX_REASONS.filter(
      (signal) => !COMPLEX_REASON_TEXT[signal]
    );

    expect(missing).toEqual([]);
  });
});

describe('complexReason fail-quiet (UI-7nhi §1)', () => {
  test('answers empty for a null metadata bag', () => {
    expect(complexReason(['complex'], null)).toBe('');
  });

  test('answers empty for a non-object metadata bag', () => {
    expect(complexReason(['complex'], 'complex')).toBe('');
  });

  test('answers empty for a non-string reason value', () => {
    expect(complexReason(['complex'], { complex_reason: 7 })).toBe('');
  });

  test('answers empty for malformed labels', () => {
    expect(complexReason(null, { complex_reason: 'hard_diagnosis' })).toBe('');
    expect(complexReason(42, { complex_reason: 'hard_diagnosis' })).toBe('');
    expect(complexReason(undefined, undefined)).toBe('');
  });
});

describe('complexReasonSentences (문장은 UI-8x90 §4.6)', () => {
  test('maps every signal to its display sentence', () => {
    const sentences = complexReasonSentences(
      'hard_diagnosis+verification_by_judgment'
    );

    expect(sentences).toEqual([
      COMPLEX_REASON_TEXT.hard_diagnosis,
      COMPLEX_REASON_TEXT.verification_by_judgment
    ]);
  });

  test('answers an empty list for an absent reason', () => {
    expect(complexReasonSentences('')).toEqual([]);
    expect(complexReasonSentences(null)).toEqual([]);
  });
});

describe('complexTooltip (UI-7nhi §1)', () => {
  test('answers empty for an absent judgement', () => {
    expect(complexTooltip('')).toBe('');
  });

  test('joins the 사유 sentences under the judgement line', () => {
    const tooltip = complexTooltip('hard_diagnosis+invariant_reasoning');

    expect(tooltip).toBe(
      `복잡한 작업으로 판정됨\n사유: ${COMPLEX_REASON_TEXT.hard_diagnosis} · ${COMPLEX_REASON_TEXT.invariant_reasoning}`
    );
  });

  test('names no model or runtime', () => {
    const tooltip = complexTooltip('hard_diagnosis');

    expect(tooltip).not.toContain('fable');
    expect(tooltip).not.toContain('claude');
    expect(tooltip).not.toContain('hard_diagnosis');
  });

  test('writes no 상태 line', () => {
    const tooltip = complexTooltip('verification_by_judgment');

    expect(tooltip).not.toContain('상태');
  });
});
