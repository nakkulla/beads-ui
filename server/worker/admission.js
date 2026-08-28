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
 *   0.5 no `awaiting_user` key. A permanent disposition label still outranks a
 *      temporary park, so this sits directly after (0) and before every probe.
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
 *   7. freshness: artifact files plus their declared scope prefixes are probed.
 *      A NON-empty delta does not refuse (UI-dlim §3.1): refusing on it stopped
 *      the unattended lane until a human refreshed the receipt by hand, and the
 *      probe cannot tell a change that invalidates this bead's premises from an
 *      unrelated one. The bead is admitted with a `stale` payload instead, and
 *      the dispatched session re-reviews it in-session (the lane's procedure is
 *      contract-owned — dotfiles `docs/contracts/workflow.md`). A probe FAILURE
 *      is still a refusal because an unknown verdict is not a pass. Enumerated
 *      full-plan readiness misses instead fall back to the spec scope; they are
 *      observations, not probe failures.
 *
 * Process failures always reject as `git_error`. Cursor validation fails quiet
 * to the artifact receipt, and the four enumerated plan-readiness misses fail
 * quiet to the spec scope. `git cat-file -e` cannot distinguish a missing path
 * from a bad revision by exit code (both 128), so the base is verified first;
 * after that, a non-zero spec cat-file means the spec is missing at that base.
 */
import { isWorkerIneligible } from '../../app/utils/worker-eligibility.js';
import { parseArtifactScope, parseNameOnlyLog } from './artifact-scope.js';

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
const EXACT_SHA_RE = /^[0-9a-fA-F]{40}$/;
const PLAN_APPROVAL_RE = /^user@([0-9a-fA-F]{40})$/;

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
 * @typedef {'worker_ineligible'|'awaiting_user'|'bd_snapshot_failed'|'gh_unavailable'|'invalid_route'|'missing_description'|'spec_id_conflict'|'spec_missing'|`spec_missing_at_base:${string}`|`base_unresolved:${string}`|'receipt_missing_or_malformed'|'receipt_unreachable'|'git_error'} AdmissionReason
 */

/**
 * One artifact's non-blocking staleness observation. `receipt_sha` is the
 * freshness anchor actually used: a valid cursor when present, otherwise the
 * artifact receipt SHA.
 *
 * @typedef {Object} AdmissionArtifactStale
 * @property {string} receipt_sha
 * @property {string[]} delta_shas
 * @property {string[]} changed_paths
 */

/**
 * Non-blocking staleness observation carried by an ADMITTED result. The legacy
 * top-level fields remain the spec block; a full-plan probe adds `plan`. A
 * plan-only delta therefore produces an object with only `plan`.
 *
 * @typedef {Object} AdmissionStale
 * @property {string} [receipt_sha]
 * @property {string[]} [delta_shas]
 * @property {string[]} [changed_paths]
 * @property {AdmissionArtifactStale} [plan]
 */

/**
 * @typedef {Object} AdmissionResult
 * @property {boolean} ok - True when the bead may auto-run.
 * @property {AdmissionReason} [reason]
 * @property {AdmissionStale} [stale] - Present only on an admitted result whose
 * artifact scope changed after its anchor; absent means all probes are fresh.
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
 *     plan_path?: unknown,
 *     plan_approval?: unknown,
 *     last_checked_sha?: unknown,
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

  // 계약상 `awaiting_user` 키의 존재 자체가 "사용자 결정 산출물이 아직 없다"이고,
  // 키 제거는 그 산출물을 쓰는 같은 `bd update`에서만 일어난다. 그래서 값 형식은
  // 보지 않고 presence 하나로 fail-closed 거부한다.
  if (bead && Object.hasOwn(bead, 'awaiting_user')) {
    return { ok: false, reason: 'awaiting_user' };
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

  /**
   * Resolve the shared freshness cursor. Invalid or unrelated cursors fail
   * quiet to the receipt; process launch failures remain admission failures.
   *
   * @param {unknown} cursor
   * @returns {Promise<{ error: boolean, sha: string|null }>}
   */
  const resolveCursor = async (cursor) => {
    const cursor_sha = typeof cursor === 'string' ? cursor.trim() : '';
    if (!EXACT_SHA_RE.test(cursor_sha)) {
      return { error: false, sha: null };
    }
    const reachable = await git([
      'rev-parse',
      '--verify',
      '--quiet',
      `${cursor_sha}^{commit}`
    ]);
    if (reachable.code === 127) {
      return { error: true, sha: null };
    }
    if (reachable.code !== 0) {
      return { error: false, sha: null };
    }
    const ancestor = await git([
      'merge-base',
      '--is-ancestor',
      cursor_sha,
      base
    ]);
    if (ancestor.code === 127) {
      return { error: true, sha: null };
    }
    return ancestor.code === 0
      ? { error: false, sha: cursor_sha }
      : { error: false, sha: null };
  };

  /**
   * @param {string} artifact_path
   * @returns {Promise<string[]|null>}
   */
  const readScope = async (artifact_path) => {
    const shown = await git(['show', `${base}:${artifact_path}`]);
    return shown.code === 0 ? parseArtifactScope(shown.stdout) : null;
  };

  /**
   * @param {string} artifact_path
   * @param {string[]} scope
   * @param {string} anchor_sha
   * @returns {Promise<{ delta_shas: string[], changed_paths: string[] }|null>}
   */
  const probeArtifact = async (artifact_path, scope, anchor_sha) => {
    const pathspecs = [artifact_path];
    for (const item of scope) {
      if (!pathspecs.includes(item)) {
        pathspecs.push(item);
      }
    }
    const fresh = await git([
      '--literal-pathspecs',
      'log',
      '--format=%H',
      '--name-only',
      `${anchor_sha}..${base}`,
      '--',
      ...pathspecs
    ]);
    return fresh.code === 0 ? parseNameOnlyLog(fresh.stdout) : null;
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

    const cursor = await resolveCursor(bead && bead.last_checked_sha);
    if (cursor.error) {
      return { ok: false, reason: 'git_error' };
    }

    /** @type {AdmissionStale} */
    const stale = {};
    /** @type {string[]} */
    let spec_scope = [];
    /** @type {{ path: string, scope: string[], anchor: string }|null} */
    let plan_probe = null;

    if (bead.route === 'full_plan') {
      const plan_path =
        typeof bead.plan_path === 'string' ? bead.plan_path.trim() : '';
      const approval_match =
        typeof bead.plan_approval === 'string'
          ? PLAN_APPROVAL_RE.exec(bead.plan_approval.trim())
          : null;
      if (plan_path.length > 0 && approval_match) {
        const plan_receipt_sha = approval_match[1];
        const approval_reachable = await git([
          'rev-parse',
          '--verify',
          '--quiet',
          `${plan_receipt_sha}^{commit}`
        ]);
        if (approval_reachable.code === 127) {
          return { ok: false, reason: 'git_error' };
        }
        if (approval_reachable.code === 0) {
          const plan_exists = await git([
            'cat-file',
            '-e',
            `${base}:${plan_path}`
          ]);
          if (plan_exists.code === 127) {
            return { ok: false, reason: 'git_error' };
          }
          if (plan_exists.code === 0) {
            const plan_scope = await readScope(plan_path);
            if (plan_scope === null) {
              return { ok: false, reason: 'git_error' };
            }
            if (plan_scope.length > 0) {
              plan_probe = {
                path: plan_path,
                scope: plan_scope,
                anchor: cursor.sha || plan_receipt_sha
              };
            }
          }
        }
      }
    }

    if (bead.route === 'spec_backed' || plan_probe === null) {
      const parsed_scope = await readScope(spec_id);
      if (parsed_scope === null) {
        return { ok: false, reason: 'git_error' };
      }
      spec_scope = parsed_scope;
    }

    const spec_anchor = cursor.sha || receipt_sha;
    const spec_delta = await probeArtifact(spec_id, spec_scope, spec_anchor);
    if (spec_delta === null) {
      return { ok: false, reason: 'git_error' };
    }
    if (spec_delta.delta_shas.length > 0) {
      stale.receipt_sha = spec_anchor;
      stale.delta_shas = spec_delta.delta_shas;
      stale.changed_paths = spec_delta.changed_paths;
    }

    if (plan_probe !== null) {
      const plan_delta = await probeArtifact(
        plan_probe.path,
        plan_probe.scope,
        plan_probe.anchor
      );
      if (plan_delta === null) {
        return { ok: false, reason: 'git_error' };
      }
      if (plan_delta.delta_shas.length > 0) {
        stale.plan = {
          receipt_sha: plan_probe.anchor,
          delta_shas: plan_delta.delta_shas,
          changed_paths: plan_delta.changed_paths
        };
      }
    }

    if (Object.keys(stale).length > 0) {
      return { ok: true, stale };
    }
  } catch {
    return { ok: false, reason: 'git_error' };
  }

  return { ok: true };
}
