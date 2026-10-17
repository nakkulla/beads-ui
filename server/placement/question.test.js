import { describe, expect, test } from 'vitest';
import {
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS,
  PLACEMENT_QUESTION_VERSION
} from './question.js';

/** The version of the question that let a resolution session settle a same-file edit. */
const PREVIOUS_VERSION = '019d23f3b282';

describe('placement question', () => {
  test('changes its version when the conflict criterion returns to same-file edits', () => {
    expect(PLACEMENT_QUESTION_VERSION).not.toBe(PREVIOUS_VERSION);
  });

  test('asks conflict for a pair that changes the same file together', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.criteria.conflict).toContain(
      'both change the same file, shared state, contract clause or deployment surface'
    );
    expect(question.criteria.independent).toContain(
      'do not both change the same file'
    );
  });

  test('drops the resolution-session premise and the overlap-alone caveat', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    const text = JSON.stringify(question);

    expect(text).not.toContain('conflict-resolution session');
    expect(text).not.toContain('Do not choose this only because');
  });

  test('says a folder overlap alone does not mean same-file edits', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.instructions).toContain(
      'does not mean they change the same file'
    );
  });
});
