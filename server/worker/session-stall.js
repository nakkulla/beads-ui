/**
 * Identify recovery waits that require an interactive disposition.
 *
 * @param {{ reason?: string|null, classification?: string }|null|undefined} recovery
 * @param {unknown[]} [blockers]
 * @returns {boolean}
 */
export function isSessionStalledRecovery(recovery, blockers = []) {
  if (!recovery) {
    return false;
  }
  return (
    ['authority', 'verification', 'no_progress', 'reconcile'].includes(
      recovery.reason || ''
    ) ||
    (recovery.reason === 'unclassified' &&
      recovery.classification === 'session_recovery_wait') ||
    (recovery.reason === 'prerequisite' && blockers.length === 0)
  );
}
