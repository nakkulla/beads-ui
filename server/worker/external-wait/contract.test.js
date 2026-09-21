import { expect, test } from 'vitest';
import {
  ADAPTERS,
  EXTERNAL_WAIT_CAUSE,
  EXTERNAL_WAIT_KEY,
  HOLD_BUDGET,
  NOTES_LINE_PREFIX,
  OBSERVATION,
  RECORD_STAGES,
  RESULT_LINE_PREFIX,
  WAIT_ID_RE,
  externalWaitIdOf
} from './contract.js';

test('copies the external-wait contract vocabulary', () => {
  expect({
    EXTERNAL_WAIT_KEY,
    HOLD_BUDGET,
    OBSERVATION,
    ADAPTERS,
    RECORD_STAGES,
    EXTERNAL_WAIT_CAUSE,
    RESULT_LINE_PREFIX,
    NOTES_LINE_PREFIX
  }).toEqual({
    EXTERNAL_WAIT_KEY: 'external_wait',
    HOLD_BUDGET: { turns_total: 3, turn_seconds: 540 },
    OBSERVATION: {
      slurm_interval_seconds: 120,
      process_interval_seconds: 30,
      error_backoff_seconds: [60, 120, 300, 900]
    },
    ADAPTERS: ['slurm', 'process'],
    RECORD_STAGES: [
      'hold',
      'done',
      'detached',
      'completing',
      'resumed',
      'stopped'
    ],
    EXTERNAL_WAIT_CAUSE: 'external_job',
    RESULT_LINE_PREFIX: '대기 · external:',
    NOTES_LINE_PREFIX: 'external-wait: '
  });
});

test.each([
  HOLD_BUDGET,
  OBSERVATION,
  OBSERVATION.error_backoff_seconds,
  ADAPTERS,
  RECORD_STAGES,
  WAIT_ID_RE
])('freezes mutable contract values %j', (value) => {
  expect(Object.isFrozen(value)).toBe(true);
});

test.each([
  ['w-012345abcdef', true],
  ['w-012345abcde', false],
  ['w-012345abcdef0', false],
  ['w-012345abcdeG', false],
  ['w-012345ABCDEf', false],
  [' w-012345abcdef', false]
])('checks the wait identifier format %s', (wait_id, expected) => {
  expect(WAIT_ID_RE.test(wait_id)).toBe(expected);
});

test.each(['w-012345abcdef', 'malformed', '', '   '])(
  'reads an own string value without format validation %j',
  (wait_id) => {
    const metadata = { external_wait: wait_id };

    const result = externalWaitIdOf(metadata);

    expect(result).toBe(wait_id);
  }
);

test.each([
  undefined,
  null,
  {},
  Object.create({ external_wait: 'w-012345abcdef' })
])('returns an empty string when the own key is absent %j', (metadata) => {
  expect(externalWaitIdOf(metadata)).toBe('');
});

test.each([null, undefined, 0, false, {}])(
  'returns no identifier for a non-string value %j',
  (value) => {
    expect(externalWaitIdOf({ external_wait: value })).toBe('');
  }
);
