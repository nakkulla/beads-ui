import { workerLabels } from './worker-eligibility.js';

export const SPEC_AFTER_BLOCKER_LABEL = 'spec-after-blocker';

/**
 * Whether the `spec-after-blocker` label is in effect (UI-svh6 §4.1): the
 * predecessor's OUTCOME is this Bead's design premise, so the spec waits too —
 * not just the implementation the `blocks` edge already holds back.
 *
 * Label and blockers are read TOGETHER because the contract declares the label
 * `effective_only_while: dependency_unsatisfied`: on a Bead nothing blocks the
 * label says nothing and needs no removal, and blockers without the label are
 * the ordinary case. Neither is an error, so nothing throws here (fail-quiet).
 *
 * @param {unknown} labels
 * @param {unknown} blocked_by
 * @returns {boolean}
 */
export function specAfterBlockerActive(labels, blocked_by) {
  return (
    workerLabels(labels).includes(SPEC_AFTER_BLOCKER_LABEL) &&
    Array.isArray(blocked_by) &&
    blocked_by.length > 0
  );
}
