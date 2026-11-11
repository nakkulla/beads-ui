import { describe, expect, test } from 'vitest';
import {
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS,
  PLACEMENT_QUESTION_VERSION
} from './question.js';

/** The version of the question whose order criteria left out shared groundwork use. */
const PREVIOUS_VERSION = 'd0b8ae971950';

describe('placement question', () => {
  test('changes its version when the order criteria add shared groundwork use', () => {
    expect(PLACEMENT_QUESTION_VERSION).not.toBe(PREVIOUS_VERSION);
  });

  test('orders a pair where one side uses groundwork the other lays down', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.criteria.a_first).toContain(
      'B uses shared groundwork (infrastructure, a helper, a schema, a contract or configuration) that A newly lays down or changes'
    );
    expect(question.criteria.b_first).toContain(
      'A uses shared groundwork (infrastructure, a helper, a schema, a contract or configuration) that B newly lays down or changes'
    );
  });

  test('keeps conflict for pairs where neither relies on the other', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.criteria.conflict).toMatch(
      /^Neither relies on the other's result/
    );
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
