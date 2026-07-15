/**
 * Independent completion verification (spec §5.2).
 *
 * A session exit 0 is NOT sufficient to mark a bead Done. The Worker
 * independently verifies:
 *   1. Git ancestry — the merge SHA actually CONTAINS the target base (the
 *      merge really landed on the intended base, not a stale fork).
 *   2. bd readback  — the bead's status/receipt in bd metadata reflects
 *      completion. The truth source for the stepper is ALWAYS bd metadata
 *      readback, never session stdout.
 *
 * Only when both hold does the caller move the bead to Done and dispatch next.
 */

/**
 * @typedef {Object} VerifyResult
 * @property {boolean} ok - Both ancestry and bd readback pass.
 * @property {boolean} ancestry - Target base is an ancestor of the merge SHA.
 * @property {string|null} bd_status - Status read back from bd.
 * @property {string} reason - 'ok' | 'base_not_ancestor' | 'bd_not_done'.
 */

/** @type {ReadonlySet<string>} */
const DONE_STATUSES = new Set(['closed', 'resolved', 'done']);

/**
 * Create an independent verifier.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   bdShow: (bead_id: string) => Promise<{ status?: string | null } | null>
 * }} deps
 * @returns {{ verifyMerge: (input: { repo: string, target_base: string, merge_sha: string, bead_id: string }) => Promise<VerifyResult> }}
 */
export function createVerifier(deps) {
  return {
    /**
     * @param {{ repo: string, target_base: string, merge_sha: string, bead_id: string }} input
     * @returns {Promise<VerifyResult>}
     */
    async verifyMerge(input) {
      // `git merge-base --is-ancestor <base> <merge_sha>` exits 0 iff base is an
      // ancestor of the merge SHA (i.e. the merge contains the base).
      const anc = await deps.gitRun(
        ['merge-base', '--is-ancestor', input.target_base, input.merge_sha],
        { cwd: input.repo }
      );
      const ancestry = anc.code === 0;

      const bead = await deps.bdShow(input.bead_id);
      const bd_status =
        bead && typeof bead.status === 'string' ? bead.status : null;
      const bd_done = !!bd_status && DONE_STATUSES.has(bd_status);

      if (!ancestry) {
        return { ok: false, ancestry, bd_status, reason: 'base_not_ancestor' };
      }
      if (!bd_done) {
        return { ok: false, ancestry, bd_status, reason: 'bd_not_done' };
      }
      return { ok: true, ancestry, bd_status, reason: 'ok' };
    }
  };
}
