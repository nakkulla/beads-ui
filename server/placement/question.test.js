import { describe, expect, test } from 'vitest';
import {
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS,
  PLACEMENT_QUESTION_VERSION
} from './question.js';

/** The version of the question before the conflict criteria were narrowed. */
const PREVIOUS_VERSION = '192b785e09b6';

describe('placement question', () => {
  test('changes its version when the criteria are narrowed', () => {
    expect(PLACEMENT_QUESTION_VERSION).not.toBe(PREVIOUS_VERSION);
  });

  test('tells jev not to pick conflict from an overlap line alone', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.instructions).toContain('conflict-resolution session');
    expect(question.criteria.conflict).toContain(
      'Do not choose this only because the declared scopes overlap'
    );
  });
});
