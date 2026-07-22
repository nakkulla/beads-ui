/**
 * Independent completion verification (worker-autorun-policy spec §3/§5).
 *
 * A session exit 0 is NOT sufficient to mark a bead Done. Success is judged
 * per the attempt's resolved `merge_policy` — never from session stdout:
 *
 *   auto_merge — (1) a SERVER-OBSERVED `merge_sha` exists (recorded by the
 *   merge-lock route at release: the base tip the server itself read after
 *   confirming the base advanced under the session's lock; 40-hex enforced,
 *   bd-metadata hex-coercion precedent), and (2) bd reads exactly `closed`.
 *   The old work-branch ancestry check is GONE: the contract-mandated squash
 *   merge severs work-tip ancestry, so `merge-base --is-ancestor` refused
 *   every contract-compliant merge (latent verify_failed:work_not_in_base).
 *   The observed merge_sha IS the release-time base tip, so containment is
 *   true by construction. A session that never took the lock exits with bd
 *   unclosed → the legacy `bd_not_closed` reason survives (status is checked
 *   first); a closed bead WITHOUT an observed merge is `merge_sha_missing`.
 *
 *   pr_stop — bd reads exactly `resolved` AND `pr_url` metadata exists. No
 *   merge happened by design, so merge_sha/closed are not consulted.
 */

/**
 * @typedef {Object} VerifyResult
 * @property {boolean} ok - The policy lane's success criteria all hold.
 * @property {string|null} bd_status - Status read back from bd.
 * @property {string} reason - 'ok' | 'bd_not_closed' | 'merge_sha_missing' |
 * 'bd_not_resolved' | 'pr_url_missing' | 'invalid_merge_policy'.
 */

/** Strict 40-hex commit sha (bd metadata hex-coercion precedent). */
const SHA40_RE = /^[0-9a-f]{40}$/i;

/**
 * Create an independent verifier. `bdShow` must return the issue with its
 * `metadata` (pr_url lives there).
 *
 * @param {{
 *   bdShow: (bead_id: string) => Promise<{ status?: string | null, metadata?: Record<string, unknown> | null } | null>
 * }} deps
 * @returns {{ verifyMerge: (input: { repo: string, target_base: string, bead_id: string, merge_policy: 'auto_merge'|'pr_stop', merge_sha: string|null }) => Promise<VerifyResult> }}
 */
export function createVerifier(deps) {
  return {
    /**
     * @param {{ repo: string, target_base: string, bead_id: string, merge_policy: 'auto_merge'|'pr_stop', merge_sha: string|null }} input
     * @returns {Promise<VerifyResult>}
     */
    async verifyMerge(input) {
      const bead = await deps.bdShow(input.bead_id);
      const bd_status =
        bead && typeof bead.status === 'string' ? bead.status : null;
      const metadata =
        bead && bead.metadata && typeof bead.metadata === 'object'
          ? bead.metadata
          : {};

      if (input.merge_policy === 'pr_stop') {
        if (bd_status !== 'resolved') {
          return { ok: false, bd_status, reason: 'bd_not_resolved' };
        }
        const pr_url = /** @type {any} */ (metadata).pr_url;
        if (typeof pr_url !== 'string' || pr_url.length === 0) {
          return { ok: false, bd_status, reason: 'pr_url_missing' };
        }
        return { ok: true, bd_status, reason: 'ok' };
      }

      if (input.merge_policy !== 'auto_merge') {
        return { ok: false, bd_status, reason: 'invalid_merge_policy' };
      }

      if (bd_status !== 'closed') {
        return { ok: false, bd_status, reason: 'bd_not_closed' };
      }
      if (
        typeof input.merge_sha !== 'string' ||
        !SHA40_RE.test(input.merge_sha)
      ) {
        return { ok: false, bd_status, reason: 'merge_sha_missing' };
      }
      return { ok: true, bd_status, reason: 'ok' };
    }
  };
}
