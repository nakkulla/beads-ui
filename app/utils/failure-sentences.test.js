import { expect, test } from 'vitest';
import { RECOVERY_WAIT_SENTENCES } from './failure-sentences.js';

test('keeps the shared recovery release sentences immutable', () => {
  expect(Object.isFrozen(RECOVERY_WAIT_SENTENCES)).toBe(true);
});

test('keeps the session decision in the recovery release sentence', () => {
  expect(RECOVERY_WAIT_SENTENCES.unclassified).toContain('세션에서');
});
