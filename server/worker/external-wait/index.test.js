import { expect, test } from 'vitest';
import { HOLD_BUDGET, OBSERVATION } from './contract.js';
import * as external_wait from './index.js';

test('exports the shared constants and unit integration functions', () => {
  expect(external_wait.HOLD_BUDGET).toBe(HOLD_BUDGET);
  expect(external_wait.OBSERVATION).toBe(OBSERVATION);
  for (const name of [
    'externalWaitFilePath',
    'makeWaitId',
    'createExternalWaitStore',
    'registrationDecision',
    'holdDecision',
    'completionDigest',
    'observeSlurmJob',
    'observeProcessJob',
    'createExternalWaitObserver',
    'externalWaitIdOf'
  ]) {
    expect(
      external_wait[/** @type {keyof typeof external_wait} */ (name)]
    ).toBeTypeOf('function');
  }
});
