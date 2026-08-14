/**
 * No-CI merge eligibility. Pure evaluation over an observed PR's mergeability,
 * workflow review receipts, and the optional verify receipt.
 *
 * Observation failures stay fail-closed. Every receipt that can approve a
 * merge is bound to the currently observed head SHA.
 *
 * Identity is not a caller-provided gate input. Cached projections are advisory
 * and stay bound to the latest poller's PR/head observation. The authoritative
 * click re-runs `observeNow`, then compares the observed base with `baseGate`
 * before any effect; that effect boundary owns target-base/head freshness.
 *
 * @import { PrObservationEntry, VerifyObservation } from './pr-observations.js'
 */

/**
 * @typedef {'current'|'missing'|'stale'|'invalid'} CurrentState
 */

/**
 * @typedef {Object} VerifyReceiptState
 * @property {'present'|'absent'|'invalid'} declaration_state
 * @property {VerifyObservation|null} receipt
 * @property {Record<string, string>|null} [expected_key]
 */

/**
 * @typedef {Object} MergeGateInput
 * @property {CurrentState} review_receipt_state
 * @property {VerifyReceiptState} verify_receipt_state
 */

/**
 * @typedef {Object} MergeGateVerdict
 * @property {boolean} enabled
 * @property {'eligible'|'mergeability'|'review'|'verify'|'undecidable'|'unobserved'|'merged'|'closed_unmerged'} tier
 * @property {string} gate_badge
 * @property {string} base_badge
 * @property {string|null} reason
 */

export const GATE_BADGES = {
  eligible: '머지 가능',
  review: '리뷰 확인 필요',
  verify_pass: '검증 완료',
  verify_fail: '검증 실패',
  verify_pending: '검증 대기',
  blocked: '머지 불가',
  error: '관측 오류',
  unobserved: '관측 대기',
  merged: '머지됨',
  closed: 'PR closed'
};

const REVIEW_RECEIPT_RE = /^[^@\s]+@([0-9a-f]{40})$/i;

const VERIFY_RECEIPT_FIELDS = [
  'effective_base_sha',
  'head_sha',
  'candidate_tree_sha',
  'script_object_type',
  'script_mode',
  'script_blob_sha'
];

/**
 * @param {Record<string, unknown>|null|undefined} receipt
 * @param {Record<string, unknown>|null|undefined} expected
 */
export function verifyReceiptMatches(receipt, expected) {
  if (!receipt || !expected) {
    return false;
  }
  return VERIFY_RECEIPT_FIELDS.every(
    (field) =>
      typeof receipt[field] === 'string' && receipt[field] === expected[field]
  );
}

/**
 * Derive workflow review freshness from one authoritative Bead read.
 *
 * @param {Record<string, any>|null|undefined} issue
 * @param {string} head_sha
 * @returns {CurrentState}
 */
export function reviewReceiptState(issue, head_sha) {
  if (!issue || typeof issue !== 'object' || Array.isArray(issue)) {
    return 'invalid';
  }
  const metadata =
    issue.metadata &&
    typeof issue.metadata === 'object' &&
    !Array.isArray(issue.metadata)
      ? /** @type {Record<string, unknown>} */ (issue.metadata)
      : null;
  if (!metadata) {
    return 'missing';
  }
  if (metadata.route === 'quick_fix') {
    return 'current';
  }
  if (metadata.route !== 'spec_backed' && metadata.route !== 'full_plan') {
    return 'invalid';
  }
  if (typeof issue.spec_id !== 'string' || issue.spec_id.length === 0) {
    return 'missing';
  }
  const spec_review =
    typeof metadata.spec_review === 'string'
      ? REVIEW_RECEIPT_RE.exec(metadata.spec_review.trim())
      : null;
  const impl_review =
    typeof metadata.impl_review === 'string'
      ? REVIEW_RECEIPT_RE.exec(metadata.impl_review.trim())
      : null;
  if (!spec_review || !impl_review) {
    return 'missing';
  }
  return impl_review[1].toLowerCase() === head_sha.toLowerCase()
    ? 'current'
    : 'stale';
}

/**
 * Read a cached review result only while it is bound to the cached PR head.
 *
 * @param {PrObservationEntry|null} entry
 * @returns {CurrentState}
 */
export function observedReviewReceiptState(entry) {
  if (!entry || !entry.pr || !entry.review_receipt) {
    return 'missing';
  }
  if (entry.review_receipt.head_sha !== entry.pr.head_sha) {
    return 'stale';
  }
  return entry.review_receipt.state;
}

/**
 * @param {boolean} enabled
 * @param {MergeGateVerdict['tier']} tier
 * @param {string} gate_badge
 * @param {string} base_badge
 * @param {string|null} reason
 * @returns {MergeGateVerdict}
 */
function verdict(enabled, tier, gate_badge, base_badge, reason) {
  return { enabled, tier, gate_badge, base_badge, reason };
}

/**
 * @param {import('./gh.js').PrDetail} pr
 * @returns {string}
 */
function baseBadge(pr) {
  if (pr.mergeable === 'CONFLICTING' || pr.merge_state_status === 'DIRTY') {
    return '충돌';
  }
  if (pr.merge_state_status === 'BEHIND') {
    return 'base 뒤처짐';
  }
  if (pr.mergeable === 'UNKNOWN' || pr.merge_state_status === 'UNKNOWN') {
    return 'base 확인중';
  }
  if (pr.mergeable === 'MERGEABLE' && pr.merge_state_status === 'CLEAN') {
    return '최신';
  }
  return '';
}

/**
 * @param {import('./gh.js').PrDetail} pr
 * @returns {string|null}
 */
function mergeabilityReason(pr) {
  if (pr.mergeable === 'CONFLICTING' || pr.merge_state_status === 'DIRTY') {
    return 'merge_conflicting';
  }
  if (pr.merge_state_status === 'BEHIND') {
    return 'base_behind';
  }
  if (pr.mergeable === 'UNKNOWN' || pr.merge_state_status === 'UNKNOWN') {
    return 'mergeability_unknown';
  }
  if (pr.mergeable !== 'MERGEABLE' || pr.merge_state_status !== 'CLEAN') {
    return 'mergeability_not_clean';
  }
  return null;
}

/**
 * @param {PrObservationEntry|null} entry
 * @param {MergeGateInput} input
 * @returns {MergeGateVerdict}
 */
export function evaluateMergeGate(entry, input) {
  if (!entry) {
    return verdict(
      false,
      'unobserved',
      GATE_BADGES.unobserved,
      '',
      'not_observed'
    );
  }
  if (entry.error) {
    return verdict(false, 'undecidable', GATE_BADGES.error, '', entry.error);
  }
  const pr = entry.pr;
  if (!pr) {
    return verdict(
      false,
      'undecidable',
      GATE_BADGES.error,
      '',
      'no_pr_observation'
    );
  }
  if (pr.state === 'MERGED') {
    return verdict(
      false,
      'merged',
      GATE_BADGES.merged,
      GATE_BADGES.merged,
      null
    );
  }
  if (pr.state === 'CLOSED') {
    return verdict(
      false,
      'closed_unmerged',
      GATE_BADGES.closed,
      GATE_BADGES.closed,
      'pr_closed_unmerged'
    );
  }

  const base_badge = baseBadge(pr);
  const mergeability_reason = mergeabilityReason(pr);
  if (mergeability_reason !== null) {
    return verdict(
      false,
      'mergeability',
      GATE_BADGES.blocked,
      base_badge,
      mergeability_reason
    );
  }

  if (input.review_receipt_state !== 'current') {
    return verdict(
      false,
      'review',
      GATE_BADGES.review,
      base_badge,
      `review_receipt_${input.review_receipt_state}`
    );
  }

  const verify_state = input.verify_receipt_state;
  if (verify_state.declaration_state === 'invalid') {
    return verdict(
      false,
      'undecidable',
      GATE_BADGES.error,
      base_badge,
      'verify_config_invalid'
    );
  }
  if (verify_state.declaration_state === 'absent') {
    return verdict(true, 'eligible', GATE_BADGES.eligible, base_badge, null);
  }

  const receipt = verify_state.receipt;
  if (!receipt) {
    return verdict(
      false,
      'verify',
      GATE_BADGES.verify_pending,
      base_badge,
      'verify_missing'
    );
  }
  if (
    verify_state.expected_key &&
    !verifyReceiptMatches(
      /** @type {Record<string, unknown>} */ (receipt),
      verify_state.expected_key
    )
  ) {
    return verdict(
      false,
      'verify',
      GATE_BADGES.verify_pending,
      base_badge,
      'verify_receipt_stale'
    );
  }
  if (receipt.head_sha !== pr.head_sha) {
    return verdict(
      false,
      'verify',
      GATE_BADGES.verify_pending,
      base_badge,
      'verify_sha_stale'
    );
  }
  if (!receipt.ok) {
    return verdict(
      false,
      'verify',
      GATE_BADGES.verify_fail,
      base_badge,
      receipt.reason
    );
  }
  return verdict(true, 'eligible', GATE_BADGES.verify_pass, base_badge, null);
}
