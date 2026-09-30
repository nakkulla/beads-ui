/**
 * The one predicate for "this stop needs a human conversation" (UI-nuwy §3.1)
 * and the stop label the conversation entry block and notifications print.
 *
 * Current targets are a string `awaiting_user` park (routed by the caller) and
 * a recovery wait whose reason is `authority` or `no_progress`. Waits recorded
 * under the retired schema-1 reasons stay targets read-compatibly so a Bead
 * waiting at deploy time is not abandoned: `verification`, `reconcile`, a
 * session-declared `unclassified`, and a `prerequisite` with no blockers.
 */

/**
 * Recovery reasons that stop an unattended session for a person today.
 *
 * @type {ReadonlySet<string>}
 */
export const CONVERSATION_RECOVERY_REASONS = new Set([
  'authority',
  'no_progress'
]);

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
    CONVERSATION_RECOVERY_REASONS.has(recovery.reason || '') ||
    isLegacyStalledRecovery(recovery, blockers)
  );
}

/**
 * Whether a stalled recovery was recorded under a retired reason (옛 기록).
 *
 * @param {{ reason?: string|null, classification?: string }} recovery
 * @param {unknown[]} blockers
 * @returns {boolean}
 */
function isLegacyStalledRecovery(recovery, blockers) {
  return (
    ['verification', 'reconcile'].includes(recovery.reason || '') ||
    (recovery.reason === 'unclassified' &&
      recovery.classification === 'session_recovery_wait') ||
    (recovery.reason === 'prerequisite' && blockers.length === 0)
  );
}

/**
 * The stop label of one conversation target, as the entry block's
 * `멈춤 사유` slot spells it: `awaiting_user=<값>` for a park,
 * `recovery:<reason>` for a current recovery, and `recovery:<reason> (옛 기록)`
 * for a read-compatible legacy one. Null when the input is no target.
 *
 * @param {{ awaiting_user?: string|null, recovery?: { reason?: string|null, classification?: string }|null, blockers?: unknown[] }} input
 * @returns {string|null}
 */
export function conversationStopLabel(input) {
  if (typeof input.awaiting_user === 'string' && input.awaiting_user) {
    return `awaiting_user=${input.awaiting_user}`;
  }
  const recovery = input.recovery;
  if (!recovery || typeof recovery.reason !== 'string') {
    return null;
  }
  if (CONVERSATION_RECOVERY_REASONS.has(recovery.reason)) {
    return `recovery:${recovery.reason}`;
  }
  return isLegacyStalledRecovery(recovery, input.blockers || [])
    ? `recovery:${recovery.reason} (옛 기록)`
    : null;
}
