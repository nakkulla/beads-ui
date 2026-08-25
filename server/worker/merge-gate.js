/**
 * No-CI merge eligibility. Pure evaluation over an observed PR's mergeability,
 * workflow review receipts, and the optional verify receipt.
 *
 * Observation failures stay fail-closed. The verify receipt is bound to the
 * exact observed head SHA. The `impl_review` receipt is bound by ANCESTRY
 * (UI-vzyh §2): it stays valid while its SHA equals or is an ancestor of the
 * observed head, so a base-sync merge that only moves the tip never invalidates
 * it. Only a non-ancestor receipt (rewritten history, branch reset) is stale.
 * The one impure export here is {@link createAncestryProbe}, which owns that
 * judgement's git access through an injected runner; everything else stays a
 * pure function of what the probe returned.
 *
 * Identity is not a caller-provided gate input. Cached projections are advisory
 * and stay bound to the latest poller's PR/head observation. The authoritative
 * click re-runs `observeNow`, then compares the observed base with `baseGate`
 * before any effect; that effect boundary owns target-base/head freshness.
 *
 * @import { PrObservationEntry, VerifyObservation } from './pr-observations.js'
 */

/**
 * `spec_id_missing` is deliberately distinct from `missing`: a review receipt
 * can be re-acquired by dispatching a reviewer, but an absent native `spec_id`
 * can only be repaired by writing Bead metadata, so the manual-merge
 * continuation must never spend a review on it (UI-yqw9 incident).
 *
 * `undetermined` is the verdict the gate could NOT reach — the ancestry probe
 * errored, was absent, or (poller-side) the Bead could not be read this pass.
 * It is deliberately NOT folded into `stale`: both hold the merge, but only
 * `stale` is a fact about the branch (rewritten history, reset) that a person
 * must act on. An undetermined verdict is re-taken by the next observation, so
 * display fails quiet on it while the gate still fails closed (the contract's
 * "fails closed stale at merge and fails quiet undetermined in display").
 *
 * @typedef {'current'|'missing'|'stale'|'invalid'|'spec_id_missing'|'undetermined'} CurrentState
 */

/**
 * The shared receipt/head ancestry judgement (UI-vzyh §2). `probe_error` covers
 * every uncertainty — the observed head could not be fetched or proven, or git
 * itself failed — and is deliberately NOT folded into `non_ancestor`, because
 * the two have different owners: gate consumers fail closed on both, while the
 * board's display probe (`workflow-enrich.js`) fails quiet on error only.
 *
 * @typedef {'equal'|'ancestor'|'non_ancestor'|'probe_error'} AncestryState
 */

/**
 * @typedef {(receipt_sha: string, head_sha: string) => Promise<AncestryState>} AncestryProbe
 */

/**
 * @typedef {Object} VerifyReceiptState
 * @property {'present'|'absent'|'invalid'} declaration_state
 * @property {VerifyObservation|null} receipt
 * @property {Record<string, string>|null} [expected_key]
 */

/**
 * The receipt observation's verdict as the gate consumes it (UI-bu6d §4).
 *
 * `undecidable` is what a caller with no authority to observe passes — the
 * cached board projections — and it neither holds nor clears. An ABSENT
 * `receipt_state` reads the same way, so a surface that never learned about
 * receipts keeps its prior behaviour instead of silently refusing every merge.
 *
 * `waived` is a hold a MANUAL merge authority (UI-58w8) bound to this exact
 * head has overridden: the receipt finding is a record defect, not a product
 * defect, so a person's own click decides it. The codes stay attached for the
 * board; only the hold is lifted. Automatic enrolment never waives.
 *
 * @typedef {Object} ReceiptGateState
 * @property {'ok'|'unbacked'|'probe_error'|'undecidable'|'waived'} state
 * @property {string[]} codes - Blocking violation codes, most relevant first.
 */

/**
 * @typedef {Object} MergeGateInput
 * @property {CurrentState} review_receipt_state
 * @property {VerifyReceiptState} verify_receipt_state
 * @property {ReceiptGateState} [receipt_state]
 */

/**
 * @typedef {Object} MergeGateVerdict
 * @property {boolean} enabled
 * @property {'eligible'|'mergeability'|'review'|'receipt'|'verify'|'undecidable'|'unobserved'|'merged'|'closed_unmerged'} tier
 * @property {string} gate_badge
 * @property {string} base_badge
 * @property {string|null} reason
 */

export const GATE_BADGES = {
  eligible: '머지 가능',
  review: '리뷰 확인 필요',
  receipt: '영수증 확인 필요',
  verify_pass: '검증 완료',
  verify_fail: '검증 실패',
  verify_pending: '검증 대기',
  blocked: '머지 불가',
  spec_id: '스펙 ID 누락',
  error: '관측 오류',
  unobserved: '관측 대기',
  merged: '머지됨',
  closed: 'PR closed'
};

const REVIEW_RECEIPT_RE = /^[^@\s]+@([0-9a-f]{40})$/i;

const SHA40_RE = /^[0-9a-f]{40}$/i;

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
 * Build the shared ancestry probe both gate consumers run (UI-vzyh §2).
 *
 * The head the poller observed is a GitHub fact: the local repository may not
 * carry that object at all, and `merge-base` on a missing object exits 128,
 * which would read as "not an ancestor" and refuse a perfectly fresh receipt.
 * So the probe FETCHES the exact SHA first and answers only from an object it
 * proved is present. Anything it cannot prove is `probe_error`, never a
 * verdict.
 *
 * @param {{ gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, repo: string, remote?: string }} deps
 * @returns {AncestryProbe}
 */
export function createAncestryProbe(deps) {
  const remote = deps.remote || 'origin';

  /**
   * @param {string[]} args
   * @returns {Promise<number|null>}
   */
  async function run(args) {
    try {
      const result = await deps.gitRun(args, { cwd: deps.repo });
      return typeof result.code === 'number' ? result.code : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} sha
   */
  async function present(sha) {
    return (
      (await run(['rev-parse', '--verify', '--quiet', `${sha}^{commit}`])) === 0
    );
  }

  /**
   * @param {string} sha
   */
  async function ensure(sha) {
    if (await present(sha)) {
      return true;
    }
    await run(['fetch', '--no-tags', remote, sha]);
    return present(sha);
  }

  return async function probeAncestry(receipt_sha, head_sha) {
    const receipt = String(receipt_sha || '').toLowerCase();
    const head = String(head_sha || '').toLowerCase();
    if (!SHA40_RE.test(receipt) || !SHA40_RE.test(head)) {
      return 'probe_error';
    }
    if (receipt === head) {
      return 'equal';
    }
    if (!(await ensure(head)) || !(await ensure(receipt))) {
      return 'probe_error';
    }
    const code = await run(['merge-base', '--is-ancestor', receipt, head]);
    if (code === 0) {
      return 'ancestor';
    }
    return code === 1 ? 'non_ancestor' : 'probe_error';
  };
}

/**
 * Derive workflow review freshness from one authoritative Bead read.
 *
 * The `impl_review` receipt is ancestry-bound (UI-vzyh §2): equality and
 * ancestry are both `current`, so head movement alone — a base-sync merge, a
 * queue-owned `base_update` — never makes it stale. `non_ancestor` (rewritten
 * history) is `stale`; `probe_error`, a throwing probe, and an absent probe are
 * `undetermined`. The gate refuses on both — refusing is recoverable through
 * the manual continuation's observed-head review, while passing on an unproven
 * ancestry is not — but only `stale` is a fact the display may alert on.
 *
 * @param {Record<string, any>|null|undefined} issue
 * @param {string} head_sha
 * @param {AncestryProbe} [probeAncestry] - Absent probe is fail-closed.
 * @returns {Promise<CurrentState>}
 */
export async function reviewReceiptState(issue, head_sha, probeAncestry) {
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
    return 'spec_id_missing';
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
  const receipt_sha = impl_review[1].toLowerCase();
  const head = String(head_sha || '').toLowerCase();
  if (receipt_sha === head) {
    return 'current';
  }
  if (typeof probeAncestry !== 'function') {
    return 'undetermined';
  }
  /** @type {AncestryState} */
  let ancestry;
  try {
    ancestry = await probeAncestry(receipt_sha, head);
  } catch {
    return 'undetermined';
  }
  if (ancestry === 'equal' || ancestry === 'ancestor') {
    return 'current';
  }
  return ancestry === 'non_ancestor' ? 'stale' : 'undetermined';
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

  if (input.review_receipt_state === 'spec_id_missing') {
    return verdict(
      false,
      'review',
      GATE_BADGES.spec_id,
      base_badge,
      'spec_id_missing'
    );
  }
  if (input.review_receipt_state === 'undetermined') {
    // Same hold as below, but with an EMPTY badge: nobody has anything to do
    // about a verdict the next observation re-takes, so the lanes draw
    // nothing for it (fail-quiet in display, fail-closed at the gate).
    return verdict(
      false,
      'review',
      '',
      base_badge,
      'review_receipt_undetermined'
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

  // Receipt backing sits between review and verify (UI-bu6d §4): it is the last
  // workflow-authority question, and it must be settled before any verify run
  // is spent on a PR that cannot qualify anyway.
  //
  // A probe error holds, exactly like the ancestry probe: refusing is
  // recoverable through a user's own merge, passing on an unproven receipt is
  // not. That user's own merge is the manual click authority, which arrives
  // here as `waived` and falls through like `ok`.
  const receipt_state = input.receipt_state;
  if (receipt_state && receipt_state.state === 'probe_error') {
    return verdict(
      false,
      'receipt',
      GATE_BADGES.receipt,
      base_badge,
      'receipt_unbacked:probe_error'
    );
  }
  if (receipt_state && receipt_state.state === 'unbacked') {
    return verdict(
      false,
      'receipt',
      GATE_BADGES.receipt,
      base_badge,
      `receipt_unbacked:${receipt_state.codes[0] ?? 'unknown'}`
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
