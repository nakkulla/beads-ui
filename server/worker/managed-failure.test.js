import { describe, expect, test } from 'vitest';
import {
  managedFailureDefinition,
  validateManagedFailure
} from './managed-failure.js';

describe('worker/managed-failure', () => {
  test.each([
    ['adapter_regression', 'deploy_failed', false],
    ['pointer_transient', 'managed_pointer_transient', true],
    ['helper_spawn_timeout', 'managed_helper_spawn_timeout', true],
    ['pointer_escape', 'managed_pointer_escape', false],
    ['restart_effect_ambiguous', 'managed_restart_effect_ambiguous', false],
    ['runtime_identity_mismatch', 'managed_runtime_identity_mismatch', false],
    ['runtime_health_red', 'managed_runtime_health_red', false]
  ])(
    'maps %s to its finite public failure contract',
    (code, reason, retryable) => {
      expect(managedFailureDefinition(code)).toEqual({
        failure_code: code,
        reason,
        retryable
      });
      expect(validateManagedFailure({ failure_code: code, retryable })).toEqual(
        {
          ok: true,
          definition: { failure_code: code, reason, retryable }
        }
      );
    }
  );

  test('rejects unknown and contradictory failure records', () => {
    expect(
      validateManagedFailure({ failure_code: 'unknown', retryable: false })
    ).toEqual({ ok: false, reason: 'managed_failure_record_invalid' });
    expect(
      validateManagedFailure({
        failure_code: 'pointer_transient',
        retryable: false
      })
    ).toEqual({ ok: false, reason: 'managed_failure_record_invalid' });
  });
});
