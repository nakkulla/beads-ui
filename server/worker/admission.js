/**
 * Auto-run admission validator (worker-autorun-policy spec §1).
 *
 * One fail-closed validator shared by queue entry (`worker-queue-place`), the
 * tick candidate scan, and the dispatch re-check (against the worktree's pinned
 * `base_oid`, closing the check-then-advance TOCTOU). Admission requires a
 * human intent anchor before a bead may auto-run:
 *
 *   0. no exact `worker-ineligible` label. Checked before environment probes so
 *      an interactive-only disposition is always the visible refusal.
 *   1. `gh` usable (installed + authenticated). Checked before git because it is the
 *      only ENVIRONMENT condition here: without `gh` the server cannot observe
 *      the PR that is now the sole completion verdict (worker-phase2 §1/§10), so
 *      no bead in the workspace can succeed and every per-bead check below is
 *      moot. Reporting the environment cause instead of an incidental
 *      `invalid_route` is what makes the badge actionable; the adapter memoizes
 *      the probe, so leading with it costs no extra process per candidate.
 *   2. `route` pinned to the enum (`spec_backed` | `full_plan` | `quick_fix`),
 *   3. `quick_fix` stops here after requiring a non-empty description. It has no
 *      anchor spec, so spec existence, receipt reachability, freshness, and git
 *      probes do not apply, and no `stale` payload can be produced. Its
 *      description is the only substantive admission input because the workflow
 *      contract requires a self-sufficient quick-fix bead; the procedure remains
 *      contract-owned by dotfiles `docs/contracts/workflow.md`.
 *   4. native/metadata `spec_id` conflict absent, then the resolved path tracked
 *      at the base commit (`git cat-file -e <base>:<spec_id>`) —
 *      a spec absent from THAT base refuses as `spec_missing_at_base:<base>`
 *      (worker-target-base §2): the spec is not gone, it was not on that branch,
 *      and the base is what the operator must fix. An absent `spec_id` stays the
 *      bare `spec_missing`, which keeps the two causes distinguishable in one
 *      badge string,
 *   5. a `<reviewer>@<40hex>` spec_review receipt — `skipped@<40hex>` counts
 *      (a skip is explicit user authority to proceed), short/non-hex does not,
 *   6. the receipt SHA reachable as a commit,
 *   7. freshness: `git log <sha>..<base> -- <spec_id>` runs successfully. A
 *      NON-empty delta no longer refuses (UI-dlim §3.1): the file-scoped probe
 *      cannot tell a change inside this bead's spec scope from another bead
 *      editing its own section of a shared spec, and refusing on it stopped the
 *      unattended lane until a human refreshed the receipt by hand. The bead is
 *      admitted with a `stale` payload instead, and the dispatched session
 *      re-reviews it in-session (the lane's procedure is contract-owned —
 *      dotfiles `docs/contracts/workflow.md`). The probe FAILING is still a
 *      refusal: a stale verdict that cannot be computed is not a pass.
 *
 * EVERY git failure is a rejection (`git_error`) — the fail-quiet `runGit` of
 * workflow-enrich.js is deliberately not reused here. `git cat-file -e` cannot
 * distinguish a missing path from a bad revision by exit code (both 128), so
 * the base is verified as a commit first; after that, a non-zero cat-file is a
 * missing spec path (spawn failures surface as code 127 → git_error).
 */
import { isWorkerIneligible } from '../../app/utils/worker-eligibility.js';

/**
 * Admission receipt: any reviewer token + EXACTLY 40 hex.
 *
 * EXPORTED because the monitor's `runnable` pre-filter (UI-qrfo §4) judges the
 * same receipt: a second copy of this pattern would let 표시 and 실행 disagree
 * about which beads are eligible, so both read this one symbol.
 */
export const ADMISSION_RECEIPT_RE = /^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;

/** @type {ReadonlyArray<'spec_backed'|'full_plan'|'quick_fix'>} */
const ADMISSIBLE_ROUTES = ['spec_backed', 'full_plan', 'quick_fix'];

/**
 * Refusal reason. `spec_missing_at_base:<base>` follows this repo's existing
 * `prefix:detail` single-string convention (`verify_failed:<reason>` etc.), so
 * the persisted `Queue.admission[bead_id].reason` stays a plain string and needs
 * no schema change or normalize migration.
 *
 * `base_unresolved:<step>` is produced by the CALLER (the live wiring's
 * `validate`, and the dispatch path) rather than in here: with no resolvable
 * base there is nothing for this validator to ask git about
 * (worker-base-scope-alignment §1).
 *
 * @typedef {'worker_ineligible'|'bd_snapshot_failed'|'gh_unavailable'|'invalid_route'|'missing_description'|'spec_id_conflict'|'spec_missing'|`spec_missing_at_base:${string}`|`base_unresolved:${string}`|'receipt_missing_or_malformed'|'receipt_unreachable'|'git_error'} AdmissionReason
 */

/**
 * Non-blocking staleness observation carried by an ADMITTED result (UI-dlim
 * §3.1): the receipt the bead currently pins, and the spec commits that landed
 * after it at the checked base. Both are pure observation — the session decides
 * what they mean, this validator never judges the delta's scope.
 *
 * @typedef {Object} AdmissionStale
 * @property {string} receipt_sha - The 40-hex SHA of the pinned spec_review.
 * @property {string[]} delta_shas - Post-receipt spec commits, newest first.
 */

/**
 * @typedef {Object} AdmissionResult
 * @property {boolean} ok - True when the bead may auto-run.
 * @property {AdmissionReason} [reason]
 * @property {AdmissionStale} [stale] - Present only on an admitted result whose
 * spec changed after the receipt; absent means the receipt is fresh.
 */

/**
 * Validate one bead for auto-run admission against a pinned base.
 *
 * `ghAvailable` is optional so the validator stays a pure unit under test (and
 * so existing callers that predate the check keep their behaviour): when the dep
 * is ABSENT the gh condition passes, mirroring the scheduler's own
 * absent-admission-dep convention. The live wiring (attach.js) always injects
 * it, so production stays fail-closed. A throw from the dep is a refusal, never
 * an escape.
 *
 * `base_label` is what a refusal REPORTS, while `base` is what git is asked
 * about: the dispatch re-check pins `base` to the worktree's `base_oid`, and a
 * SHA is useless to a human deciding whether the repo's base branch is wrong.
 * Defaults to `base` when absent.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   ghAvailable?: () => Promise<boolean>,
 *   repo: string,
 *   base: string,
 *   base_label?: string,
 *   bead: {
 *     route?: string|null,
 *     description?: string|null,
 *     spec_id?: string|null,
 *     spec_id_conflict?: boolean,
 *     spec_review?: unknown,
 *     labels?: unknown,
 *     [key: string]: unknown
 *   }
 * }} input
 * @returns {Promise<AdmissionResult>}
 */
export async function validateAdmission(input) {
  const { gitRun, ghAvailable, repo, base, base_label, bead } = input;
  const reported_base =
    typeof base_label === 'string' && base_label.length > 0 ? base_label : base;

  if (isWorkerIneligible(bead && bead.labels)) {
    return { ok: false, reason: 'worker_ineligible' };
  }

  if (typeof ghAvailable === 'function') {
    let gh_ok = false;
    try {
      gh_ok = (await ghAvailable()) === true;
    } catch {
      gh_ok = false;
    }
    if (!gh_ok) {
      return { ok: false, reason: 'gh_unavailable' };
    }
  }

  if (!ADMISSIBLE_ROUTES.includes(/** @type {any} */ (bead && bead.route))) {
    return { ok: false, reason: 'invalid_route' };
  }
  if (bead.route === 'quick_fix') {
    if (
      typeof bead.description !== 'string' ||
      bead.description.trim().length === 0
    ) {
      return { ok: false, reason: 'missing_description' };
    }
    return { ok: true };
  }
  if (bead && bead.spec_id_conflict === true) {
    return { ok: false, reason: 'spec_id_conflict' };
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
      return { ok: false, reason: `spec_missing_at_base:${reported_base}` };
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

    // `--format=%H` makes the delta directly consumable: the same single probe
    // now yields the commit list the session is told about, with no second git
    // call and no parsing of the default log layout.
    const fresh = await git([
      'log',
      '--format=%H',
      `${receipt_sha}..${base}`,
      '--',
      spec_id
    ]);
    if (fresh.code !== 0) {
      return { ok: false, reason: 'git_error' };
    }
    const delta_shas = fresh.stdout
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (delta_shas.length > 0) {
      return { ok: true, stale: { receipt_sha, delta_shas } };
    }
  } catch {
    return { ok: false, reason: 'git_error' };
  }

  return { ok: true };
}
