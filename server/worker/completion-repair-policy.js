/**
 * Keep automatic post-merge repair on the design's explicit allowlist.
 *
 * @param {unknown} value
 */
export function isRepairableCleanupFailure(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const failure = /** @type {Record<string, unknown>} */ (value);
  return (
    (failure.step === 'post_merge_verify' &&
      failure.reason === 'verify_cmd_failed') ||
    (failure.step === 'deploy' &&
      failure.reason === 'deploy_failed' &&
      failure.failure_code === 'adapter_regression' &&
      failure.retryable === false)
  );
}
