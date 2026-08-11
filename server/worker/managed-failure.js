/** @type {Readonly<Record<string, Readonly<{ failure_code: string, reason: string, retryable: boolean }>>>} */
const FAILURE_DEFINITIONS = Object.freeze({
  adapter_regression: Object.freeze({
    failure_code: 'adapter_regression',
    reason: 'deploy_failed',
    retryable: false
  }),
  pointer_transient: Object.freeze({
    failure_code: 'pointer_transient',
    reason: 'managed_pointer_transient',
    retryable: true
  }),
  helper_spawn_timeout: Object.freeze({
    failure_code: 'helper_spawn_timeout',
    reason: 'managed_helper_spawn_timeout',
    retryable: true
  }),
  pointer_escape: Object.freeze({
    failure_code: 'pointer_escape',
    reason: 'managed_pointer_escape',
    retryable: false
  }),
  restart_effect_ambiguous: Object.freeze({
    failure_code: 'restart_effect_ambiguous',
    reason: 'managed_restart_effect_ambiguous',
    retryable: false
  }),
  runtime_identity_mismatch: Object.freeze({
    failure_code: 'runtime_identity_mismatch',
    reason: 'managed_runtime_identity_mismatch',
    retryable: false
  }),
  runtime_health_red: Object.freeze({
    failure_code: 'runtime_health_red',
    reason: 'managed_runtime_health_red',
    retryable: false
  })
});

/**
 * @param {unknown} failure_code
 */
export function managedFailureDefinition(failure_code) {
  if (typeof failure_code !== 'string') {
    return null;
  }
  return FAILURE_DEFINITIONS[failure_code] || null;
}

/**
 * @param {unknown} input
 * @returns {{ ok: true, definition: { failure_code: string, reason: string, retryable: boolean } }|{ ok: false, reason: 'managed_failure_record_invalid' }}
 */
export function validateManagedFailure(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, reason: 'managed_failure_record_invalid' };
  }
  const value = /** @type {any} */ (input);
  const definition = managedFailureDefinition(value.failure_code);
  if (!definition || value.retryable !== definition.retryable) {
    return { ok: false, reason: 'managed_failure_record_invalid' };
  }
  return { ok: true, definition };
}
