import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { expect, test } from 'vitest';
import {
  FAILURE_NEXT_ACTIONS,
  FAILURE_SENTENCES,
  RECOVERY_WAIT_SENTENCES
} from './failure-sentences.js';

/**
 * The `QuickfixLandingReason` tokens, read from the typedef that declares them
 * so a token added there without a sentence fails here.
 *
 * @returns {string[]}
 */
function quickfixLandingReasons() {
  const source = readFileSync(
    path.resolve(process.cwd(), 'server/worker/quickfix-landing.js'),
    'utf8'
  );
  const match = source.match(/@typedef \{([^}]+)\} QuickfixLandingReason/);
  if (!match) {
    throw new Error('QuickfixLandingReason typedef not found');
  }
  return match[1].split('|').map((token) => token.trim().replace(/'/g, ''));
}

/**
 * The last colon segment with an entry, the precedence every caller uses.
 *
 * @param {Readonly<Record<string, string>>} table
 * @param {string} token
 * @returns {string|null}
 */
function lastSegmentEntry(table, token) {
  /** @type {string|null} */
  let found = null;
  for (const segment of token.split(':')) {
    if (Object.hasOwn(table, segment)) {
      found = table[segment];
    }
  }
  return found;
}

test('gives every quick_fix landing reason a cause sentence', () => {
  const reasons = quickfixLandingReasons();

  const missing = reasons.filter(
    (token) => lastSegmentEntry(FAILURE_SENTENCES, token) === null
  );

  expect(reasons.length).toBeGreaterThan(10);
  expect(missing).toEqual([]);
});

test('gives every quick_fix landing reason a next action', () => {
  const reasons = quickfixLandingReasons();

  const missing = reasons.filter(
    (token) => lastSegmentEntry(FAILURE_NEXT_ACTIONS, token) === null
  );

  expect(missing).toEqual([]);
});

test('names the no-change close in the invalid_impl_review next action', () => {
  const guidance = FAILURE_NEXT_ACTIONS.invalid_impl_review;

  expect(guidance).toContain('no-delta');
  expect(guidance).toContain('직접 닫아야');
});

test('keeps the shared recovery release sentences immutable', () => {
  expect(Object.isFrozen(RECOVERY_WAIT_SENTENCES)).toBe(true);
});

test('keeps the session decision in the recovery release sentence', () => {
  expect(RECOVERY_WAIT_SENTENCES.unclassified).toContain('세션에서');
});

test('directs script_failed recovery to a successful manual deployment', () => {
  const guidance = FAILURE_NEXT_ACTIONS.script_failed;

  expect(guidance).toMatch(/자동 재시도.*이미/);
  expect(guidance).toMatch(/원인.*Worker 설정의 \[배포 실행\].*base tip.*성공/);
});
