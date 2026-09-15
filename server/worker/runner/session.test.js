import { expect, test } from 'vitest';
import { terminalResultOf } from './session.js';

test.each([
  'provider',
  'unclassified',
  'reconcile',
  'no_progress',
  'unknown_token'
])('parses recovery wait token %s without judging its authority', (reason) => {
  const result = terminalResultOf(
    `\n  대기 · recovery:${reason}\nmore evidence`
  );

  expect(result).toEqual({ kind: 'recovery_wait', reason });
});

test.each(['', 'UPPER', 'provider-more', 'provider1', 'provider extra'])(
  'rejects malformed recovery token %j',
  (reason) => {
    const result = terminalResultOf(`대기 · recovery:${reason}`);

    expect(result).toBeNull();
  }
);

test.each([
  ['실패 · failed', { kind: 'failure' }],
  ['환경 · failed', { kind: 'environment' }],
  ['대기 · blocks:UI-1', { kind: 'waiting_blocks' }],
  [
    `대기 · base_moved:${'a'.repeat(40)}:${'b'.repeat(40)}`,
    {
      kind: 'base_moved',
      candidate_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40)
    }
  ]
])('preserves the existing terminal grammar %s', (line, expected) => {
  const result = terminalResultOf(line);

  expect(result).toEqual(expected);
});
