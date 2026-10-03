import { afterEach, expect, test } from 'vitest';
import {
  __resetTimingSettingsForTest,
  __setTimingOverridesForTest
} from '../../timing-settings.js';
import { OBSERVATION } from './contract.js';
import { effectiveObservation } from './observation.js';

afterEach(() => {
  __resetTimingSettingsForTest();
});

test('reads the contract defaults when nothing is overridden', () => {
  __setTimingOverridesForTest({});

  const effective = effectiveObservation();

  expect(effective).toEqual(OBSERVATION);
});

test('overrides only the contract override fields', () => {
  __setTimingOverridesForTest({
    external_wait_slurm_interval_seconds: 240,
    external_wait_process_interval_seconds: 45
  });

  const effective = effectiveObservation();

  expect(effective.slurm_interval_seconds).toBe(240);
  expect(effective.process_interval_seconds).toBe(45);
  expect(effective.error_backoff_seconds).toBe(
    OBSERVATION.error_backoff_seconds
  );
});
