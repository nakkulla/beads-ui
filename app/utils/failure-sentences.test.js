import { expect, test } from 'vitest';
import {
  RECOVERY_WAIT_LABELS,
  RECOVERY_WAIT_SENTENCES
} from './failure-sentences.js';

test('keeps the shared recovery vocabulary immutable', () => {
  expect(Object.isFrozen(RECOVERY_WAIT_LABELS)).toBe(true);
  expect(Object.isFrozen(RECOVERY_WAIT_SENTENCES)).toBe(true);
  expect(Object.keys(RECOVERY_WAIT_LABELS)).toEqual(
    Object.keys(RECOVERY_WAIT_SENTENCES)
  );
});
