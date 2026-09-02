import { describe, expect, test } from 'vitest';
import {
  DISCARD_TERMINAL_PHASES,
  discardOperationActive
} from './discard-phase.js';

describe('worker/discard-phase', () => {
  test('freezes both terminal phase names', () => {
    expect(DISCARD_TERMINAL_PHASES).toEqual(['done', 'abandoned']);
    expect(Object.isFrozen(DISCARD_TERMINAL_PHASES)).toBe(true);
  });

  test.each(['done', 'abandoned'])('treats %s as inactive', (phase) => {
    expect(discardOperationActive({ phase })).toBe(false);
  });

  test.each(['requested', 'archived', 'runner_terminated'])(
    'treats %s as active',
    (phase) => {
      expect(discardOperationActive({ phase })).toBe(true);
    }
  );

  test.each([null, undefined, {}, { phase: null }, 'requested', []])(
    'treats malformed input as inactive',
    (operation) => {
      expect(discardOperationActive(/** @type {any} */ (operation))).toBe(
        false
      );
    }
  );
});
