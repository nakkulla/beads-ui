/**
 * Independent completion verification (spec §5.2).
 *
 * A session exit 0 is NOT sufficient to mark a bead Done. The Worker
 * independently verifies that the session's WORK actually landed on the intended
 * base AND that bd's own status confirms completion — never the session stdout:
 *
 *   1. Work tip — resolve `refs/heads/<bead_id>` (the per-session worktree
 *      branch). If the ref is missing or unresolvable, verification FAILS closed
 *      (a session that left no work branch cannot have merged anything).
 *   2. Git ancestry — `git merge-base --is-ancestor <work_tip> <base_tip>` must
 *      hold: the work tip is contained in the target base, i.e. the session's
 *      branch really merged into base (NOT the vacuous base-vs-base check).
 *   3. bd readback — the bead's status in bd metadata must be exactly `closed`.
 *      `resolved` is INSUFFICIENT: a fast_track worker session completes through
 *      merge + sweep to `closed`, so anything short of `closed` is unverified.
 *
 * Only when all three hold does the caller move the bead to Done and dispatch
 * next.
 */

/**
 * @typedef {Object} VerifyResult
 * @property {boolean} ok - Work tip landed in base AND bd reads `closed`.
 * @property {boolean} ancestry - Work tip is an ancestor of the base tip.
 * @property {string|null} bd_status - Status read back from bd.
 * @property {string|null} work_tip - Resolved work-branch tip sha (null if unresolvable).
 * @property {string} reason - 'ok' | 'work_tip_unresolved' | 'base_unresolved' | 'work_not_in_base' | 'bd_not_closed'.
 */

/**
 * The single bd status that proves a worker session fully completed. A worker
 * dispatch runs fast_track through merge + sweep, which lands the bead at
 * `closed`; `resolved` (PR opened, not yet merged/closed) is NOT sufficient.
 *
 * @type {'closed'}
 */
const DONE_STATUS = 'closed';

/**
 * Resolve a git ref to its sha, fail-quiet. Returns '' when the ref does not
 * resolve (exit non-zero) so the caller can fail closed.
 *
 * @param {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} gitRun
 * @param {string} repo
 * @param {string} ref
 * @returns {Promise<string>}
 */
async function resolveRef(gitRun, repo, ref) {
  const r = await gitRun(['rev-parse', '--verify', '--quiet', ref], {
    cwd: repo
  });
  return r.code === 0 ? r.stdout.trim() : '';
}

/**
 * Create an independent verifier.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   bdShow: (bead_id: string) => Promise<{ status?: string | null } | null>
 * }} deps
 * @returns {{ verifyMerge: (input: { repo: string, target_base: string, bead_id: string }) => Promise<VerifyResult> }}
 */
export function createVerifier(deps) {
  return {
    /**
     * @param {{ repo: string, target_base: string, bead_id: string }} input
     * @returns {Promise<VerifyResult>}
     */
    async verifyMerge(input) {
      // 1. Resolve the session's WORK tip (refs/heads/<bead_id>). Fail closed
      //    when the ref is missing — no branch means no merge landed.
      const work_tip = await resolveRef(
        deps.gitRun,
        input.repo,
        `refs/heads/${input.bead_id}`
      );
      if (!work_tip) {
        return {
          ok: false,
          ancestry: false,
          bd_status: null,
          work_tip: null,
          reason: 'work_tip_unresolved'
        };
      }

      // 2. Resolve the target base tip. Fail closed if the base is unresolvable.
      const base_tip = await resolveRef(
        deps.gitRun,
        input.repo,
        input.target_base
      );
      if (!base_tip) {
        return {
          ok: false,
          ancestry: false,
          bd_status: null,
          work_tip,
          reason: 'base_unresolved'
        };
      }

      // 3. Ancestry: the work tip must be an ancestor of the base tip, i.e. the
      //    session's branch actually merged INTO the base (exit 0 iff true).
      const anc = await deps.gitRun(
        ['merge-base', '--is-ancestor', work_tip, base_tip],
        { cwd: input.repo }
      );
      const ancestry = anc.code === 0;

      // 4. bd readback — the truth source is bd, never session stdout.
      const bead = await deps.bdShow(input.bead_id);
      const bd_status =
        bead && typeof bead.status === 'string' ? bead.status : null;
      const bd_closed = bd_status === DONE_STATUS;

      if (!ancestry) {
        return {
          ok: false,
          ancestry,
          bd_status,
          work_tip,
          reason: 'work_not_in_base'
        };
      }
      if (!bd_closed) {
        return {
          ok: false,
          ancestry,
          bd_status,
          work_tip,
          reason: 'bd_not_closed'
        };
      }
      return { ok: true, ancestry, bd_status, work_tip, reason: 'ok' };
    }
  };
}
