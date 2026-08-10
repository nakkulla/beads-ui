const REPAIRABLE_DEPLOY_REASONS = new Set([
  'deploy_config_invalid',
  'deploy_missing_for_self',
  'deploy_not_detached_for_self',
  'deploy_verify_missing',
  'deploy_failed'
]);

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
      typeof failure.reason === 'string' &&
      REPAIRABLE_DEPLOY_REASONS.has(failure.reason))
  );
}
