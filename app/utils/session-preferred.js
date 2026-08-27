import { workerLabels } from './worker-eligibility.js';

export const SESSION_PREFERRED_LABEL = 'session-preferred';
export const SESSION_PREFERRED_REASONS = [
  'exclusive_machine',
  'iterative_user_judgment',
  'visual_verification'
];

/**
 * The contract reason a Bead is better run in an interactive session, or `''`
 * when the advisory attachment is invalid (UI-49mc §2).
 *
 * Label and paired reason are read TOGETHER because the workflow contract makes
 * either half alone meaningless: a label without an enum reason is an invalid
 * attachment the consumer ignores, and a reason without the label is not an
 * attachment at all. Neither is an error, so nothing throws here.
 *
 * @param {unknown} labels
 * @param {unknown} metadata
 * @returns {string}
 */
export function sessionPreferredReason(labels, metadata) {
  if (!workerLabels(labels).includes(SESSION_PREFERRED_LABEL)) {
    return '';
  }
  if (typeof metadata !== 'object' || metadata === null) {
    return '';
  }
  const reason = /** @type {any} */ (metadata).session_preferred_reason;
  return typeof reason === 'string' &&
    SESSION_PREFERRED_REASONS.includes(reason)
    ? reason
    : '';
}

/**
 * Whether the `session-preferred` advisory is validly attached. Advisory only:
 * it never enters worker admission (§2).
 *
 * @param {unknown} labels
 * @param {unknown} metadata
 * @returns {boolean}
 */
export function isSessionPreferred(labels, metadata) {
  return sessionPreferredReason(labels, metadata) !== '';
}
