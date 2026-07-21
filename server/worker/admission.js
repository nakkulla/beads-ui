/**
 * Auto-run admission validator (worker-autorun-policy spec §1).
 *
 * One fail-closed validator shared by queue entry (`worker-queue-place`), the
 * tick candidate scan, and the dispatch re-check (against the worktree's pinned
 * `base_oid`, closing the check-then-advance TOCTOU). Admission requires a
 * human intent anchor before a bead may auto-run:
 *
 *   1. `route` pinned to the enum (`spec_backed` | `full_plan`),
 *   2. `spec_id` tracked at the base commit (`git cat-file -e <base>:<spec_id>`),
 *   3. a `<reviewer>@<40hex>` spec_review receipt — `skipped@<40hex>` counts
 *      (a skip is explicit user authority to proceed), short/non-hex does not,
 *   4. the receipt SHA reachable as a commit,
 *   5. freshness: `git log <sha>..<base> -- <spec_id>` runs successfully AND is
 *      empty (no spec change after the receipt).
 *
 * EVERY git failure is a rejection (`git_error`) — the fail-quiet `runGit` of
 * workflow-enrich.js is deliberately not reused here. `git cat-file -e` cannot
 * distinguish a missing path from a bad revision by exit code (both 128), so
 * the base is verified as a commit first; after that, a non-zero cat-file is a
 * missing spec path (spawn failures surface as code 127 → git_error).
 */

/** Admission receipt: any reviewer token + EXACTLY 40 hex. */
const ADMISSION_RECEIPT_RE = /^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;

/** @type {ReadonlyArray<'spec_backed'|'full_plan'>} */
const ADMISSIBLE_ROUTES = ['spec_backed', 'full_plan'];

/**
 * @typedef {Object} AdmissionResult
 * @property {boolean} ok - True when the bead may auto-run.
 * @property {'invalid_route'|'spec_missing'|'receipt_missing_or_malformed'|'receipt_unreachable'|'spec_review_stale'|'git_error'} [reason]
 */

/**
 * Validate one bead for auto-run admission against a pinned base.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   repo: string,
 *   base: string,
 *   bead: { route?: string|null, spec_id?: string|null, spec_review?: unknown }
 * }} input
 * @returns {Promise<AdmissionResult>}
 */
export async function validateAdmission(input) {
  const { gitRun, repo, base, bead } = input;

  if (!ADMISSIBLE_ROUTES.includes(/** @type {any} */ (bead && bead.route))) {
    return { ok: false, reason: 'invalid_route' };
  }
  const spec_id = bead && typeof bead.spec_id === 'string' ? bead.spec_id : '';
  if (spec_id.length === 0) {
    return { ok: false, reason: 'spec_missing' };
  }

  const spec_review = bead ? bead.spec_review : undefined;
  const receipt_ok =
    typeof spec_review === 'string' &&
    ADMISSION_RECEIPT_RE.test(spec_review.trim());
  const receipt_sha = receipt_ok
    ? /** @type {string} */ (spec_review).trim().split('@')[1]
    : '';

  /**
   * @param {string[]} args
   * @returns {Promise<{ code: number, stdout: string }>}
   */
  const git = async (args) => {
    const r = await gitRun(args, { cwd: repo });
    return { code: r.code, stdout: r.stdout };
  };

  try {
    // Base must resolve as a commit FIRST — this is what lets a later non-zero
    // cat-file be read as "spec path missing" instead of "bad revision".
    const base_ok = await git([
      'rev-parse',
      '--verify',
      '--quiet',
      `${base}^{commit}`
    ]);
    if (base_ok.code !== 0) {
      return { ok: false, reason: 'git_error' };
    }

    const spec_exists = await git(['cat-file', '-e', `${base}:${spec_id}`]);
    if (spec_exists.code === 127) {
      return { ok: false, reason: 'git_error' };
    }
    if (spec_exists.code !== 0) {
      return { ok: false, reason: 'spec_missing' };
    }

    if (!receipt_ok) {
      return { ok: false, reason: 'receipt_missing_or_malformed' };
    }

    const sha_ok = await git([
      'rev-parse',
      '--verify',
      '--quiet',
      `${receipt_sha}^{commit}`
    ]);
    if (sha_ok.code === 127) {
      return { ok: false, reason: 'git_error' };
    }
    if (sha_ok.code !== 0) {
      return { ok: false, reason: 'receipt_unreachable' };
    }

    const fresh = await git(['log', `${receipt_sha}..${base}`, '--', spec_id]);
    if (fresh.code !== 0) {
      return { ok: false, reason: 'git_error' };
    }
    if (fresh.stdout.trim().length > 0) {
      return { ok: false, reason: 'spec_review_stale' };
    }
  } catch {
    return { ok: false, reason: 'git_error' };
  }

  return { ok: true };
}
