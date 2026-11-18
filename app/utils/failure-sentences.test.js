import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { expect, test } from 'vitest';
import {
  FAILURE_NEXT_ACTIONS,
  FAILURE_SENTENCES,
  RECOVERY_WAIT_SENTENCES,
  UNKNOWN_FAILURE_TEXT,
  failureCodeWords,
  failureSummaryWords,
  isFailureCodeOnly,
  providerWaitResumeSentence,
  recoveryWords,
  scriptExitSentence
} from './failure-sentences.js';

test.each([0, 1])(
  'names the provider wait automatic resume rung %i',
  (step) => {
    const sentence = providerWaitResumeSentence(step, 2);

    expect(sentence).toBe(
      `공급자·사용량 조건 해제를 기다리며, 예정 시각에 자동으로 이어갑니다(${step + 1}/2).`
    );
  }
);

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

test('names no control outside the card in the script_failed next action', () => {
  const guidance = FAILURE_NEXT_ACTIONS.script_failed;

  expect(guidance).not.toMatch(/\[배포 실행\]|Worker 설정/);
});

test.each([
  [
    'quickfix_landing_failed:script_failed',
    '스크립트가 0이 아닌 코드로 끝났습니다'
  ],
  ['quickfix_landing_failed:mystery_token', '착지 실패'],
  ['mystery_token', UNKNOWN_FAILURE_TEXT],
  ['', UNKNOWN_FAILURE_TEXT],
  [null, UNKNOWN_FAILURE_TEXT]
])('says the failure code %j in dictionary words only', (code, words) => {
  const result = failureSummaryWords(code);

  expect(result).toBe(words);
});

test('reads a composite code segment by segment for the detail row', () => {
  const words = failureCodeWords('quickfix_landing_failed:script_failed');

  expect(words).toBe('착지 실패 › 스크립트가 0이 아닌 코드로 끝났습니다');
});

test('reads an unknown code segment as the unknown words', () => {
  const words = failureCodeWords('quickfix_landing_failed:mystery_token');

  expect(words).toBe(`착지 실패 › ${UNKNOWN_FAILURE_TEXT}`);
});

test.each([
  ['script_failed', true],
  ['quickfix_landing_failed:script_failed', true],
  ['API Error: 529', false],
  ['restart', false],
  ['', false]
])('tells whether the summary %j holds only a code', (text, code_only) => {
  const result = isFailureCodeOnly(text);

  expect(result).toBe(code_only);
});

test('names which script exited and its exit code', () => {
  const sentence = scriptExitSentence('deploy', 2);

  expect(sentence).toBe('배포 스크립트가 exit 2로 끝났습니다.');
});

test('says a recovery classification as its disposition and reason words', () => {
  const words = recoveryWords('wait', 'provider');

  expect(words).toBe('대기 · 공급자·사용량');
});

test('says an unknown recovery disposition as unclassified', () => {
  const words = recoveryWords('mystery', 'mystery');

  expect(words).toBe('미분류');
});
