import { describe, expect, test } from 'vitest';
import {
  PLACEMENT_PREFER_QUESTION,
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS,
  PLACEMENT_QUESTION_VERSION
} from './question.js';

/** The version of the request that carried the order question alone. */
const PREVIOUS_VERSION = '015a1e174f45';

describe('placement question', () => {
  test('changes its version when the request adds the preference question', () => {
    expect(PLACEMENT_QUESTION_VERSION).not.toBe(PREVIOUS_VERSION);
  });

  test('carries the order question and the preference question', () => {
    const names = Object.keys(PLACEMENT_QUESTIONS);

    expect(names).toEqual([PLACEMENT_QUESTION, PLACEMENT_PREFER_QUESTION]);
  });

  test('offers three preference choices in A/B orientation', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_PREFER_QUESTION];

    const choices = Object.keys(question.criteria);

    expect(question.type).toBe('choice');
    expect(choices).toEqual([
      'a_better_first',
      'b_better_first',
      'no_preference'
    ]);
  });

  test('asks which landing first makes the other easier with no order required', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_PREFER_QUESTION];

    expect(question.instructions).toContain(
      'Assume neither has to land before the other.'
    );
    expect(question.instructions).toContain(
      'which order makes the other easier, smaller or less likely to be redone'
    );
    expect(question.criteria.a_better_first).toContain(
      'B is likely to reuse, extend or be simplified by what A adds or changes'
    );
    expect(question.criteria.b_better_first).toContain(
      'A is likely to reuse, extend or be simplified by what B adds or changes'
    );
    expect(question.criteria.no_preference).toContain(
      'the order does not materially matter'
    );
  });

  test('explains the overlap line the way the order question does', () => {
    const order = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];
    const prefer = PLACEMENT_QUESTIONS[PLACEMENT_PREFER_QUESTION];
    const overlap_text =
      'The state may begin with a line naming the paths their declared scopes overlap on; that line is material about where the two may touch. A folder on that line only says both work somewhere under it, which by itself does not mean they change the same file.';

    expect(order.instructions).toContain(overlap_text);
    expect(prefer.instructions).toContain(overlap_text);
  });

  test('keeps the order question wording', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    expect(question.instructions).toMatch(
      /How must their implementation and landing be ordered\?$/
    );
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
