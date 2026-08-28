/**
 * Which kind of resume one FAILED quick_fix landing row asks for — re-running
 * the same attempt's settlement, or re-running its session (UI-8h1x §3.1).
 *
 * It lives here, with no imports, because FOUR consumers must read the same one
 * copy: the server's `server/worker/scheduler.js` (which branch `resume()`
 * takes) and the client's `app/views/worker/running-grid.js` (button label),
 * `lane-model.js` (`resume_eligible`), and `index.js` (refusal toast). The
 * server may not pull the client modules — those import `lanes.js` and
 * therefore lit-html — so shared judgment goes in a dependency-free leaf. The
 * precedent is `app/utils/failure-sentences.js` and `app/utils/
 * worker-eligibility.js`, both already imported by `server/worker/*`.
 *
 * The failure TOKENS are owned by dotfiles' workflow contract; which of them a
 * settlement re-run can clear is Worker-internal judgment that beads-ui owns
 * (§3.1, same line as `workflow-state.yaml
 * enclosed_foreign_landing.worker_judgment`). This module changes no contract.
 *
 * The enumerated side is `session`, not `settlement`: settlement-family reasons
 * carry `repo-operation-coordinator.js` codes straight through, so that
 * vocabulary is OPEN and a table of it would go stale with every new code.
 * Session-family reasons are the closed few `server/worker/quickfix-landing.js`
 * writes itself.
 */

/**
 * Reasons whose remedy is the session, written verbatim by
 * `server/worker/quickfix-landing.js`. `not_resolved` is retired (UI-5ym8 §5)
 * and appears only in historic records, but it is session-natured, so reading
 * it keeps those rows on their current behaviour.
 *
 * @type {ReadonlySet<string>}
 */
const SESSION_REASONS = Object.freeze(
  new Set([
    'push_not_contained',
    'invalid_impl_review',
    'premature_close',
    'head_mismatch',
    'foreign_deploy_unsupported',
    'not_resolved'
  ])
);

/**
 * Session-natured reason FAMILIES, matched by prefix: the delivery-evidence
 * bind (`delivery_unproven:push_log_absent` and siblings) was not proven, which
 * only the session can fix.
 *
 * @type {readonly string[]}
 */
const SESSION_REASON_PREFIXES = Object.freeze(['delivery_unproven:']);

/**
 * The resume kind one failed quick_fix landing asks for. Reads the failure
 * reason ONLY — never the cursor, the worktree, or the session id (§3.2).
 *
 * Unknown reasons default to `settlement` because `settle` is idempotent: a row
 * that really did not land simply fails again and rewrites its reason, so the
 * worst cost of a wrong `settlement` verdict is one wasted settlement pass,
 * while a wrong `session` verdict spawns a session with nothing to do and
 * leaves the row with no way to be cleared (§1). The asymmetry sets the default.
 *
 * An ABSENT reason (`null`/`undefined` landing, or a missing/non-string/empty
 * `reason`) answers `session`: settlement never started, so those rows are
 * correctly session re-runs (§1.2), and `scheduler.js` filters them out before
 * it ever asks. That also keeps every ordinary non-quick_fix failure tile —
 * which carries `quickfix_landing: null` — on its existing labels and its
 * existing `resume_eligible` rule, so no consumer needs a separate guard.
 *
 * @param {{ reason?: string|null }|null|undefined} quickfix_landing
 * @returns {'settlement'|'session'}
 */
export function resumeKindOf(quickfix_landing) {
  const reason =
    quickfix_landing && typeof quickfix_landing.reason === 'string'
      ? quickfix_landing.reason
      : '';
  if (reason.length === 0) {
    return 'session';
  }
  if (SESSION_REASONS.has(reason)) {
    return 'session';
  }
  for (const prefix of SESSION_REASON_PREFIXES) {
    if (reason.startsWith(prefix)) {
      return 'session';
    }
  }
  return 'settlement';
}
