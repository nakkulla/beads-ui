/**
 * The stale-work residue judgment shared by the admission producer and by every
 * consumer that must re-observe that residue before acting on it.
 *
 * `scheduler.js` `staleWorkAdmission` promotes a residue to `unique` when a
 * resumable attempt matches it, even when the worktree itself carries nothing
 * to lose. That promotion is deliberate: a clean worktree whose failed session
 * can still be resumed is exactly the case the card exists to ask about. The
 * consumers, however, re-derived acceptance from the RAW observation state and
 * demanded `unique`, so a promoted card was offered and then refused as
 * `worktree_identity_changed` on every action — the user saw "이전 작업 상태가
 * 바뀌었습니다" for a residue that had not changed at all.
 *
 * What proves the residue is unchanged is the IDENTITY, not the state name:
 * `status_digest` covers the dirty and untracked content, the shas cover the
 * refs, and the observation state is a function of exactly those inputs against
 * the same `base_oid`. So one predicate binds the whole identity and accepts
 * every state an intact residue can report, while `unknown` (the observation
 * itself failed) and `absent` (nothing is left) stay refused fail-closed.
 */

const STALE_IDENTITY_KEYS = [
  'worktree_realpath',
  'branch',
  'head_sha',
  'branch_head_sha',
  'base_oid',
  'status_digest'
];

/**
 * Observation states an INTACT residue can report. `discardable` and
 * `base_contained` are the promoted case: nothing unique is left in the
 * worktree, and the only reason the bead is parked is the resumable session.
 */
export const INTACT_RESIDUE_STATES = new Set([
  'unique',
  'discardable',
  'base_contained'
]);

/**
 * @param {Record<string, unknown>} expected
 * @param {Record<string, unknown>} observed
 */
export function sameStaleIdentity(expected, observed) {
  return STALE_IDENTITY_KEYS.every(
    (key) => (expected[key] ?? null) === (observed[key] ?? null)
  );
}

/**
 * Answer the one question every stale-work consumer actually asks: is the
 * residue recorded in the admission still exactly there, still ours, and still
 * observable?
 *
 * @param {Record<string, unknown>|null|undefined} expected - Identity recorded in the admission.
 * @param {{ state?: string, owned?: boolean, identity?: Record<string, unknown>|null }|null|undefined} observed
 */
export function staleResidueIntact(expected, observed) {
  if (!expected || !observed || observed.owned !== true || !observed.identity) {
    return false;
  }
  return (
    INTACT_RESIDUE_STATES.has(String(observed.state)) &&
    sameStaleIdentity(expected, observed.identity)
  );
}
