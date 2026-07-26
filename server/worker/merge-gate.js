/**
 * The three-tier merge gate (worker-phase2 §5) — a PURE function over one
 * bead's PR observation.
 *
 * | signal source                 | gate                        | badge        |
 * |-------------------------------|-----------------------------|--------------|
 * | GitHub CI present             | [머지] only while CI green  | CI ✓         |
 * | no CI + `verify_cmd` resolved | only with a local green FOR | 로컬검증 ✓   |
 * |                               | THE CURRENT head SHA        |              |
 * | neither (successful empties)  | no gate                     | 검증 신호 없음 |
 *
 * Two rules dominate everything else here:
 *
 * 1. FAIL CLOSED. Any observation ERROR — a failed `gh` query, an unresolvable
 *    PR reference, an unreadable checks payload — makes the gate UNDECIDABLE:
 *    disabled, with an error badge. It is NEVER downgraded to the third
 *    "검증 신호 없음" tier. Only a SUCCESSFUL empty checks observation may
 *    conclude "this repo has no CI".
 * 2. EVERY verdict is bound to the CURRENT head SHA. A CI or local-verify
 *    result carried over from an older commit does not satisfy the gate; the
 *    gate reports "not observed yet" until a result for the current head
 *    arrives. That is what makes a branch update / conflict resolution / a
 *    server restart (cache miss) re-verify instead of passing on a stale green.
 *
 * Nothing here merges, queries, or mutates — Phase 5 owns the [머지] action and
 * its click-time authoritative re-query.
 *
 * @import { PrObservationEntry } from './pr-observations.js'
 */

/**
 * @typedef {Object} MergeGateVerdict
 * @property {boolean} enabled - Whether [머지] may be offered as clickable.
 * @property {'ci'|'local_verify'|'none'|'undecidable'|'unobserved'|'merged'|'closed_unmerged'} tier
 * Which §5 row decided this (or the terminal PR state that pre-empted them).
 * @property {string} gate_badge - Badge for the verification signal.
 * @property {string} base_badge - Badge for the PR's base relationship
 * (`충돌` / `base 뒤처짐` / `최신` …); empty when there is nothing to say.
 * @property {string|null} reason - Machine-readable cause for a refusal.
 */

/** Badge strings (worker-phase2 §5/§7). */
export const GATE_BADGES = {
  ci_pass: 'CI ✓',
  ci_fail: 'CI ✗',
  ci_pending: 'CI 대기',
  verify_pass: '로컬검증 ✓',
  verify_fail: '로컬검증 ✗',
  verify_pending: '로컬검증 대기',
  no_signal: '검증 신호 없음',
  error: '관측 오류',
  unobserved: '관측 대기',
  merged: '머지됨',
  closed: 'PR closed'
};

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
 * Describe the PR's relationship to its base. Advisory only — §6 makes the
 * click-time re-query authoritative — so an unrecognized combination says
 * nothing rather than guessing.
 *
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
  if (pr.merge_state_status === 'CLEAN') {
    return '최신';
  }
  if (pr.mergeable === 'UNKNOWN') {
    return 'base 확인중';
  }
  return '';
}

/**
 * Evaluate the merge gate for one bead.
 *
 * @param {PrObservationEntry|null} entry - The bead's observation, or null when
 * the poller has not observed it yet.
 * @param {{ verify_cmd_present: boolean }} options - Whether a `verify_cmd`
 * resolves for this workspace (explicit config or auto-detection — the second
 * tier only exists when one does).
 * @returns {MergeGateVerdict}
 */
export function evaluateMergeGate(entry, options) {
  if (!entry) {
    return verdict(
      false,
      'unobserved',
      GATE_BADGES.unobserved,
      '',
      'not_observed'
    );
  }
  // Fail-closed rule 1: an observation error is undecidable, not "no signal".
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
  // Terminal PR states pre-empt the verification tiers: there is nothing left
  // to gate. MERGED is recorded for Phase 5's cleanup to consume; CLOSED
  // without a merge is NOT a completion — the bead stays in `pr_wait` awaiting
  // a human decision (worker-phase2 §4, codex review finding 2).
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

  const base = baseBadge(pr);
  const ci = entry.ci;
  if (!ci || ci.state === 'error') {
    return verdict(
      false,
      'undecidable',
      GATE_BADGES.error,
      base,
      (ci && ci.reason) || 'no_ci_observation'
    );
  }
  // Fail-closed rule 2: a checks observation taken at another commit says
  // nothing about this one.
  if (ci.head_sha !== pr.head_sha) {
    return verdict(
      false,
      'unobserved',
      GATE_BADGES.unobserved,
      base,
      'ci_sha_stale'
    );
  }

  // Tier 1 — the repo has CI.
  if (ci.state === 'ok') {
    if (ci.conclusion === 'pass') {
      return verdict(true, 'ci', GATE_BADGES.ci_pass, base, null);
    }
    if (ci.conclusion === 'fail') {
      return verdict(false, 'ci', GATE_BADGES.ci_fail, base, 'ci_failed');
    }
    return verdict(false, 'ci', GATE_BADGES.ci_pending, base, 'ci_pending');
  }

  // Tier 2 — a SUCCESSFUL empty checks observation plus a resolved verify_cmd.
  if (options.verify_cmd_present) {
    const v = entry.verify;
    if (!v || v.head_sha !== pr.head_sha) {
      // No result for the current head: a cache miss after a restart, or the
      // SHA advanced past an older run. Either way the gate waits for a fresh
      // run — a stale green never passes.
      return verdict(
        false,
        'local_verify',
        GATE_BADGES.verify_pending,
        base,
        v ? 'verify_sha_stale' : 'verify_missing'
      );
    }
    if (v.ok) {
      return verdict(true, 'local_verify', GATE_BADGES.verify_pass, base, null);
    }
    return verdict(
      false,
      'local_verify',
      GATE_BADGES.verify_fail,
      base,
      v.reason
    );
  }

  // Tier 3 — no CI, no verify_cmd. The click itself is the human's decision,
  // so the gate steps aside and the badge says honestly what it is based on.
  return verdict(true, 'none', GATE_BADGES.no_signal, base, null);
}
