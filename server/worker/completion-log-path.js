/**
 * Which log a root completion points at (UI-i8cy §5.3).
 *
 * The PR 대기 row's `completion_status.log_path` and the log-reading API's
 * `completion` source both come from THIS function, so the path a person sees
 * on the card and the file the popup reads cannot drift apart. The order is the
 * projection's original one: the terminal reason's own log, then the stopped
 * cleanup's, then the last local verify observation's.
 */
import { COMPLETION_AUTO_RESOLUTION_PHASE } from './queue-store.js';

/**
 * The durable `CompletionPhase` vocabulary, mirrored here because the queue
 * schema does not export its list. The auto-resolution phases are DERIVED from
 * the exported class→phase binding rather than retyped: a mirror that misses a
 * phase projects a live intent as `intent_state_invalid`, which is how UI-hk74
 * §4's three new phases would have been hidden from the card entirely.
 *
 * @type {Set<string>}
 */
export const COMPLETION_PHASES = new Set([
  'gating',
  'holding',
  'merging',
  'cleaning',
  ...Object.values(COMPLETION_AUTO_RESOLUTION_PHASE),
  'paused',
  'needs_human',
  'completed'
]);

/**
 * Phases after which a completion no longer runs anything
 * (`completion-intent.js` treats exactly these two as settled).
 *
 * @type {Set<string>}
 */
export const COMPLETION_TERMINAL_PHASES = new Set(['needs_human', 'completed']);

/**
 * @param {unknown} value
 * @param {number} [limit]
 * @returns {string|null}
 */
export function boundedCompletionText(value, limit = 4000) {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  return value.slice(-limit);
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>|null}
 */
function plainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, any>} */ (value)
    : null;
}

/**
 * The intent record of one root completion when it is well-formed, else null —
 * the same validity the projection applies before it reads any field.
 *
 * @param {Record<string, any>} queue
 * @param {string} root_bead_id
 * @returns {Record<string, any>|null}
 */
export function validCompletionIntent(queue, root_bead_id) {
  const intents = plainObject(queue.completion_intents);
  if (!intents || !Object.hasOwn(intents, root_bead_id)) {
    return null;
  }
  const value = plainObject(intents[root_bead_id]);
  const subject = plainObject(value?.subject);
  if (
    value === null ||
    !COMPLETION_PHASES.has(value.phase) ||
    subject === null ||
    subject.role !== 'root' ||
    typeof subject.bead_id !== 'string' ||
    subject.bead_id.length === 0
  ) {
    return null;
  }
  return value;
}

/**
 * The log path one root completion shows, or null when it has none.
 *
 * @param {Record<string, any>} queue
 * @param {string} root_bead_id
 * @param {() => any} observe - Reads the PR poller's observation of the root;
 * only consulted when neither record names a log.
 * @returns {string|null}
 */
export function completionLogPath(queue, root_bead_id, observe) {
  const value = validCompletionIntent(queue, root_bead_id);
  if (value === null) {
    return null;
  }
  const terminal = plainObject(value.terminal_reason);
  let log_path = boundedCompletionText(terminal?.log_path, 1000);
  if (log_path !== null) {
    return log_path;
  }
  const cleanup_failed = plainObject(queue.cleanup_failed);
  const cleanup =
    cleanup_failed && Object.hasOwn(cleanup_failed, root_bead_id)
      ? plainObject(cleanup_failed[root_bead_id])
      : null;
  log_path = boundedCompletionText(cleanup?.log_path, 1000);
  if (log_path !== null) {
    return log_path;
  }
  let observed = null;
  try {
    observed = observe();
  } catch {
    observed = null;
  }
  return boundedCompletionText(observed?.verify?.log_path, 1000);
}
