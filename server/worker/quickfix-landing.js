/**
 * Worker-owned landing for one dispatched quick_fix attempt.
 *
 * The workflow contract forbids expanding automatic deployment from an
 * unreviewed push. A Worker-dispatched quick_fix is different: its session
 * must complete one implementation review before pushing, so the pushed head
 * is reviewed and the Worker can own deployment evidence and closure. The
 * canonical rule remains in dotfiles `docs/contracts/workflow.md`; this module
 * only consumes it.
 *
 * No `pr_wait`, merge gate, or merge driver participates. This lane pushes the
 * base directly, then proves containment and settles the attempt itself. The
 * landed head is the review receipt SHA, proven by containment in the fetched
 * base; the preserved worktree is never a head witness, because the session
 * lands through a detached candidate and leaves that worktree at the dispatch
 * base (UI-fiei). The durable cursor is a resume input, not display-only
 * state: it carries the head binding across restarts, and a `parent_close`
 * record makes an already-closed bead a successful resume.
 * `premature_close` applies only without that Worker-owned close record and
 * outside the contract's no-change close, which has two kinds: a session that
 * refuted the Bead's root-cause hypothesis, or that passed the approved
 * verification bundle with no tracked delta and nothing pushed, closes the Bead
 * itself with `close_reason` `refuted: ...` or `no-delta: ...`
 * (`workflow-state.yaml no_change_close`), and the Worker then removes residue
 * only — no push containment, review receipt, deployment, or close.
 *
 * This module judges only what happens AFTER a session delivered. A session
 * that refused to start on an unmet prerequisite never reaches it: the
 * scheduler settles that attempt as `waiting` ahead of the call (2026-08-28
 * worker-prerequisite-wait-tier spec §4.1·§4.6). So `QuickfixLandingReason`
 * gains no token for it — `waiting` is not an outcome of landing settlement but
 * an ending in front of one, and reading the absent push record as
 * `delivery_unproven:push_log_absent` is exactly the confusion that spec removes.
 *
 * @import { Attempt } from './queue-store.js'
 */
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';
import { ADMISSION_RECEIPT_RE } from './admission.js';
import { failureTokenSummary } from './failure-class.js';
import { resolveRepoOps } from './repo-ops-resolver.js';
import { branchForBead } from './worktree.js';

const log = debug('worker:quickfix-landing');

// Consumed verbatim from dotfiles `workflow-state.yaml no_change_close`
// (`close_reason.regex`, `lines: single_line_only`); not redefined here.
const NO_CHANGE_CLOSE_REASON_RE = /^(?:refuted|no-delta): \S/;

/**
 * What each landing cursor is called on the bead's timeline
 * (record-timeline-retention §5). The cursor names are the durable vocabulary
 * the resume judgment already uses, so the history and the record cannot
 * disagree about which step a landing reached.
 *
 * @type {Readonly<Record<string, string>>}
 */
const LANDING_STEP_LABELS = Object.freeze({
  base_containment: 'base 포함 확인',
  repo_operations: '배포 실행',
  branch_cleanup: '브랜치 정리',
  parent_close: 'bead close',
  no_change_close: '무변경 close'
});

/**
 * Which of the contract's two no-change close kinds this `close_reason`
 * declares. `null` for anything else — a non-string, a prefix the contract
 * does not name, or a multi-line reason.
 *
 * @type {Readonly<Record<string, 'refuted'|'no_delta'>>}
 */
const NO_CHANGE_CLOSE_KINDS = Object.freeze({
  refuted: 'refuted',
  'no-delta': 'no_delta'
});

/**
 * @param {unknown} close_reason
 * @returns {'refuted'|'no_delta'|null}
 */
function noChangeCloseKind(close_reason) {
  if (typeof close_reason !== 'string') {
    return null;
  }
  if (!NO_CHANGE_CLOSE_REASON_RE.test(close_reason)) {
    return null;
  }
  if (/[\r\n]/.test(close_reason)) {
    return null;
  }
  const prefix = close_reason.slice(0, close_reason.indexOf(':'));
  return NO_CHANGE_CLOSE_KINDS[prefix] ?? null;
}

/**
 * The four contract failures named by design §11 are the central cases. The
 * remaining values distinguish an unobservable judgment from the exact lower
 * settlement step that failed, instead of reporting false success.
 *
 * `not_resolved` is retired (worker-failure-tiers §5): a session's own status
 * write is no longer the only admissible proof that its work landed. What
 * replaces it names which EVIDENCE was missing — the push record, the review
 * receipt, or the binding between them — plus the two record failures that were
 * previously reported as if the bead had simply not been resolved.
 *
 * @typedef {'premature_close'|'invalid_impl_review'|'head_mismatch'|'push_not_contained'|'containment_unobservable'|'repo_ops_config_invalid'|'repo_operation_failed'|'repo_operation_pending'|'worktree_remove_failed'|'local_branch_delete_failed'|'bd_close_failed'|'bd_read_failed'|'bd_record_failed'|'delivery_unproven:push_log_absent'|'delivery_unproven:impl_review_missing'|'delivery_unproven:impl_review_sha_mismatch'|'foreign_landing_unpinned:foreign_repo'|'foreign_landing_unpinned:foreign_path'|'foreign_landing_unpinned:foreign_base'|'foreign_checkout_unavailable'|'foreign_deploy_unsupported'} QuickfixLandingReason
 */

/**
 * Extra fields a landing record keeps across every later write. Today the only
 * one is `resolved_by`, which names the Worker's own evidence-based resolve
 * (§5.3) so a reader can tell it from a session's status write.
 *
 * @typedef {{ resolved_by: string }|null|undefined} LandingExtra
 */

/**
 * Create the quick_fix landing settlement for one workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: {
 *     updateAttempt: (workspace: string, input: { attempt_id: string, patch: Partial<Attempt> }) => unknown,
 *     moveToDone: (workspace: string, input: { bead_id: string, attempt_id: string, patch: Partial<Attempt> }) => unknown,
 *     snapshot: (workspace: string) => unknown
 *   },
 *   bd: {
 *     readIssue: (bead_id: string) => Promise<Record<string, any>>,
 *     readStatus: (bead_id: string) => Promise<string|null>,
 *     setStatus: (bead_id: string, status: string) => Promise<void>,
 *     readMetadata: (bead_id: string, key: string) => Promise<string|null>
 *   },
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   worktree: {
 *     removeIfDiscardable: (input: { repo: string, bead_id: string, base: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *     withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 *   },
 *   repoOperations: {
 *     hasConfig: (sha: string, options?: { current_target_base?: boolean }) => Promise<any>,
 *     ensureDeploy: (subject: any) => Promise<any>,
 *     waitForDeployTerminal: (operation_id: string, input: any) => Promise<any>
 *   }|null,
 *   readPushLog?: (input: { attempt_id: string }) => { ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: string },
 *   timeline?: { append: (input: any) => unknown },
 *   accept_skipped_receipt?: boolean,
 *   notifyChanged?: (workspace: string) => void,
 *   now?: () => number
 * }} deps
 * `readPushLog` is the attempt's own pre-push record (`guard-hook.js`, record
 * mode) — the delivery evidence §5.3 judges. An absent dep reads exactly like
 * an absent log: unproven, never innocent.
 *
 * `accept_skipped_receipt` widens the receipt vocabulary to `skipped@<sha>`.
 * It defaults to false and stays false until the dotfiles contract Bead that
 * introduces that receipt form is closed (design §9); until then a `skipped`
 * reviewer is an invalid receipt, exactly as before.
 */
export function createQuickfixLanding(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  const repo_operations = deps.repoOperations || null;
  const notifyChanged = deps.notifyChanged || (() => {});
  const now = deps.now || (() => Date.now());
  const accept_skipped_receipt = deps.accept_skipped_receipt === true;

  /**
   * One landing record, plus whatever this attempt has to keep carrying.
   *
   * Every step rewrites `quickfix_landing` whole, so a fact recorded once — the
   * Worker's own evidence-based resolve (§5.3) — must ride along with each
   * later write or the next one erases it.
   *
   * @param {{ cursor: 'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'|'no_change_close'|null, head_sha: string|null, reason: string|null }} record
   * @param {LandingExtra} extra
   * @returns {Attempt['quickfix_landing']}
   */
  function landingRecord(record, extra) {
    return /** @type {Attempt['quickfix_landing']} */ ({
      ...record,
      ...(extra || {})
    });
  }

  /**
   * Put one landing step on the bead's permanent history
   * (record-timeline-retention §5).
   *
   * The bead is read back off the attempt record rather than threaded through
   * every step: `markStep` and `fail` are called from more than a dozen places,
   * and a parameter added to all of them is a dozen chances to pass the wrong
   * one. An attempt the store cannot name has no bead, so it records nothing.
   *
   * The result is ignored — history must never decide whether a landing
   * continues — and the whole thing is wrapped, because a diagnostic may not
   * end a settlement that broke no invariant.
   *
   * @param {string} attempt_id
   * @param {'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'|'no_change_close'|null} step
   * @param {string|null} reason - The failure token, or null for a step reached.
   */
  function recordLandingStep(attempt_id, step, reason) {
    if (!deps.timeline) {
      return;
    }
    try {
      const snapshot = /** @type {any} */ (deps.store.snapshot(workspace));
      const bead_id = snapshot?.attempts?.[attempt_id]?.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        return;
      }
      const label = step === null ? null : LANDING_STEP_LABELS[step];
      deps.timeline.append({
        bead_id,
        attempt_id,
        kind: 'landing_step',
        // The STEP is the fact, so a resumed landing that re-runs a step
        // re-appends the same id and the reader keeps one line. A failure is a
        // different fact than reaching the step, hence the suffix.
        seq: reason === null ? step : `${step ?? 'precondition'}:failed`,
        summary:
          reason === null
            ? `착지 단계: ${label ?? step}`
            : `착지 실패 — ${failureTokenSummary(reason) ?? reason}${
                label === undefined || label === null ? '' : ` (${label})`
              }`
      });
    } catch (err) {
      log(
        'quick_fix landing timeline record failed for %s: %o',
        attempt_id,
        err
      );
    }
  }

  /**
   * @param {string} attempt_id
   * @param {'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'} cursor
   * @param {string} head_sha
   * @param {LandingExtra} [extra]
   */
  function markStep(attempt_id, cursor, head_sha, extra = null) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        quickfix_landing: landingRecord(
          { cursor, head_sha, reason: null },
          extra
        )
      }
    });
    recordLandingStep(attempt_id, cursor, null);
    notifyChanged(workspace);
  }

  /**
   * @param {string} attempt_id
   * @param {QuickfixLandingReason|string} reason
   * @param {'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'|'no_change_close'|null} step
   * @param {string|null} head_sha
   * @param {LandingExtra} [extra]
   * @returns {{ ok: false, reason: string, step: string|null }}
   */
  function fail(attempt_id, reason, step, head_sha, extra = null) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        quickfix_landing: landingRecord(
          { cursor: step, head_sha, reason },
          extra
        )
      }
    });
    recordLandingStep(attempt_id, step, reason);
    notifyChanged(workspace);
    return { ok: false, reason, step };
  }

  /**
   * Read and validate the `impl_review` receipt. Shared by the ordinary
   * `resolved` path and the delivery-evidence path (§5.3), so the two can never
   * disagree about which receipt is admissible.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, sha: string }|{ ok: false, reason: 'invalid_impl_review'|'impl_review_missing'|'bd_read_failed' }>}
   */
  async function readReceipt(bead_id) {
    /** @type {string|null} */
    let receipt;
    try {
      receipt = await deps.bd.readMetadata(bead_id, 'impl_review');
    } catch (err) {
      log('quick_fix impl_review readback failed for %s: %o', bead_id, err);
      // A read OUTAGE is environmental, not a malformed receipt (UI-8h1x
      // §3.1.1). Recording it as `invalid_impl_review` would send a transient
      // bd failure down the session re-run branch; only a FORMAT error keeps
      // that token.
      return { ok: false, reason: 'bd_read_failed' };
    }
    const trimmed = typeof receipt === 'string' ? receipt.trim() : '';
    if (trimmed.length === 0) {
      return { ok: false, reason: 'impl_review_missing' };
    }
    const separator = trimmed.lastIndexOf('@');
    const reviewer = trimmed.slice(0, separator);
    if (
      !ADMISSION_RECEIPT_RE.test(trimmed) ||
      (reviewer === 'skipped' && !accept_skipped_receipt)
    ) {
      return { ok: false, reason: 'invalid_impl_review' };
    }
    return { ok: true, sha: trimmed.slice(separator + 1) };
  }

  /**
   * Prove that this attempt's reviewed work actually reached the base, for a
   * bead whose status the session never wrote (§5.2–§5.3).
   *
   * The evidence is the attempt's OWN pre-push record plus the review receipt
   * bound to the pushed head. That pair is strictly stronger than the status
   * write it replaces: a session could set `resolved` without pushing anything,
   * while it cannot forge a hook record git itself produced, and an unreviewed
   * head still fails because the receipt SHA has to equal the pushed one.
   *
   * Only after the pair matches does the Worker write `resolved` itself, with a
   * confirming readback — an unconfirmed write is a record failure, not a
   * landing.
   *
   * @param {{ attempt_id: string, bead_id: string, target_base: string }} input
   * @returns {Promise<{ ok: true, receipt_sha: string }|{ ok: false, reason: QuickfixLandingReason }>}
   */
  async function proveDelivery(input) {
    const { attempt_id, bead_id, target_base } = input;
    const base_ref = `refs/heads/${target_base}`;
    const read = deps.readPushLog
      ? deps.readPushLog({ attempt_id })
      : { ok: /** @type {const} */ (false), reason: 'absent' };
    const base_pushes = read.ok
      ? read.entries.filter(
          (entry) =>
            typeof entry.remote_ref === 'string' &&
            entry.remote_ref === base_ref
        )
      : [];
    if (base_pushes.length === 0) {
      return { ok: false, reason: 'delivery_unproven:push_log_absent' };
    }
    const receipt = await readReceipt(bead_id);
    if (!receipt.ok) {
      return {
        ok: false,
        reason:
          receipt.reason === 'impl_review_missing'
            ? 'delivery_unproven:impl_review_missing'
            : // A read outage keeps its own token so the resume judgment sees
              // an environmental failure, not a malformed receipt (§3.1.1).
              receipt.reason
      };
    }
    // The LAST base-destined line is the landing: a lane that pushed twice
    // landed the second one, and the receipt has to bind to what is on the base
    // now, not to an intermediate head.
    const landed = base_pushes[base_pushes.length - 1].local_oid;
    if (
      typeof landed !== 'string' ||
      landed.toLowerCase() !== receipt.sha.toLowerCase()
    ) {
      return {
        ok: false,
        reason: 'delivery_unproven:impl_review_sha_mismatch'
      };
    }
    try {
      await deps.bd.setStatus(bead_id, 'resolved');
      if ((await deps.bd.readStatus(bead_id)) !== 'resolved') {
        return { ok: false, reason: 'bd_record_failed' };
      }
    } catch (err) {
      log('quick_fix worker resolve failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'bd_record_failed' };
    }
    return { ok: true, receipt_sha: receipt.sha };
  }

  /**
   * Fetch and resolve the exact remote base without moving a local base branch.
   *
   * @param {string} target_base
   * @returns {Promise<{ ok: true, sha: string }|{ ok: false }>}
   */
  async function fetchBase(target_base) {
    try {
      return await deps.worktree.withTopologyLock(repo, async () => {
        const fetched = await deps.gitRun(
          ['fetch', '--no-tags', 'origin', target_base],
          { cwd: repo }
        );
        if (fetched.code !== 0) {
          return { ok: /** @type {const} */ (false) };
        }
        const rev = await deps.gitRun(['rev-parse', `origin/${target_base}`], {
          cwd: repo
        });
        const sha = rev.stdout.trim();
        if (rev.code !== 0 || !/^[0-9a-f]{40}$/i.test(sha)) {
          return { ok: /** @type {const} */ (false) };
        }
        return { ok: /** @type {const} */ (true), sha };
      });
    } catch (err) {
      log('quick_fix base observation failed for %s: %o', target_base, err);
      return { ok: false };
    }
  }

  /**
   * Read the enclosed foreign landing pins (dotfiles `workflow-state.yaml
   * enclosed_foreign_landing`). `foreign_repo` alone decides whether this
   * Bead's landing is foreign at all; once it is, every pin is required and a
   * missing or malformed one names itself instead of surfacing later as an
   * unobservable containment in the wrong repository (UI-jf33).
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, foreign: { repo: string, path: string, base: string }|null }|{ ok: false, reason: QuickfixLandingReason }>}
   */
  async function readForeignLanding(bead_id) {
    /** @type {Record<'foreign_repo'|'foreign_path'|'foreign_base', string>} */
    const pins = { foreign_repo: '', foreign_path: '', foreign_base: '' };
    for (const key of /** @type {const} */ ([
      'foreign_repo',
      'foreign_path',
      'foreign_base'
    ])) {
      let value;
      try {
        value = await deps.bd.readMetadata(bead_id, key);
      } catch (err) {
        log('quick_fix %s readback failed for %s: %o', key, bead_id, err);
        return { ok: false, reason: 'bd_read_failed' };
      }
      pins[key] = typeof value === 'string' ? value.trim() : '';
    }
    if (
      pins.foreign_repo.length === 0 &&
      pins.foreign_path.length === 0 &&
      pins.foreign_base.length === 0
    ) {
      return { ok: true, foreign: null };
    }
    // The URL is compared verbatim against `git remote get-url` later, so the
    // only shape rule here is non-emptiness.
    if (pins.foreign_repo.length === 0) {
      return { ok: false, reason: 'foreign_landing_unpinned:foreign_repo' };
    }
    const expanded =
      pins.foreign_path === '~' || pins.foreign_path.startsWith('~/')
        ? path.join(os.homedir(), pins.foreign_path.slice(1))
        : pins.foreign_path;
    if (expanded.length === 0 || !path.isAbsolute(expanded)) {
      return { ok: false, reason: 'foreign_landing_unpinned:foreign_path' };
    }
    // Git itself judges the branch name (`foo..bar`, `.hidden`, `main.lock`
    // are all refused); the rig cwd is only a place to run a repo-independent
    // command from.
    if (pins.foreign_base.length === 0 || /\s/.test(pins.foreign_base)) {
      return { ok: false, reason: 'foreign_landing_unpinned:foreign_base' };
    }
    try {
      const checked = await deps.gitRun(
        ['check-ref-format', `refs/heads/${pins.foreign_base}`],
        { cwd: repo }
      );
      if (checked.code !== 0) {
        return { ok: false, reason: 'foreign_landing_unpinned:foreign_base' };
      }
    } catch (err) {
      log('quick_fix foreign_base check failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'foreign_landing_unpinned:foreign_base' };
    }
    return {
      ok: true,
      foreign: {
        repo: pins.foreign_repo,
        path: path.normalize(expanded),
        base: pins.foreign_base
      }
    };
  }

  /**
   * Bind the pinned foreign checkout: it must be a git checkout, and one of its
   * remotes must carry exactly the pinned URL — that remote, not `origin`, is
   * what the base is fetched from.
   *
   * @param {{ repo: string, path: string, base: string }} foreign
   * @returns {Promise<{ ok: true, remote: string }|{ ok: false, reason: 'foreign_checkout_unavailable' }>}
   */
  async function resolveForeignRemote(foreign) {
    try {
      const top = await deps.gitRun(['rev-parse', '--show-toplevel'], {
        cwd: foreign.path
      });
      if (top.code !== 0) {
        return { ok: false, reason: 'foreign_checkout_unavailable' };
      }
      const remotes = await deps.gitRun(['remote'], { cwd: foreign.path });
      if (remotes.code !== 0) {
        return { ok: false, reason: 'foreign_checkout_unavailable' };
      }
      for (const name of remotes.stdout.split(/\r?\n/)) {
        const remote = name.trim();
        if (remote.length === 0) {
          continue;
        }
        const url = await deps.gitRun(['remote', 'get-url', remote], {
          cwd: foreign.path
        });
        if (url.code === 0 && url.stdout.trim() === foreign.repo) {
          return { ok: true, remote };
        }
      }
      return { ok: false, reason: 'foreign_checkout_unavailable' };
    } catch (err) {
      log(
        'quick_fix foreign checkout unavailable at %s: %o',
        foreign.path,
        err
      );
      return { ok: false, reason: 'foreign_checkout_unavailable' };
    }
  }

  /**
   * Fetch and resolve the foreign base tip in the foreign checkout. The rig's
   * topology lock guards the rig's own worktree graph and says nothing about
   * this checkout, so none is taken here; a fetch moves no local branch.
   *
   * @param {{ repo: string, path: string, base: string }} foreign
   * @param {string} remote
   * @returns {Promise<{ ok: true, sha: string }|{ ok: false }>}
   */
  async function fetchForeignBase(foreign, remote) {
    try {
      const fetched = await deps.gitRun(
        ['fetch', '--no-tags', remote, foreign.base],
        { cwd: foreign.path }
      );
      if (fetched.code !== 0) {
        return { ok: false };
      }
      // `FETCH_HEAD` is the commit this fetch just brought in; a
      // remote-tracking ref can lag it under a custom refspec.
      const rev = await deps.gitRun(['rev-parse', 'FETCH_HEAD'], {
        cwd: foreign.path
      });
      const sha = rev.stdout.trim();
      if (rev.code !== 0 || !/^[0-9a-f]{40}$/i.test(sha)) {
        return { ok: false };
      }
      return { ok: true, sha };
    } catch (err) {
      log(
        'quick_fix foreign base observation failed for %s: %o',
        foreign.repo,
        err
      );
      return { ok: false };
    }
  }

  /**
   * Whether the landed commit's own `repo-ops/config.toml` declares `[deploy]`,
   * read through the same resolver the rig uses (TOML parse, absent-by-ls-tree
   * proof, declaration validity). The rig coordinator can only deploy the rig,
   * so a foreign declaration is a fail-closed stop rather than a skipped step.
   *
   * @param {{ repo: string, path: string, base: string }} foreign
   * @param {string} head_sha
   * @returns {Promise<{ ok: true, declared: boolean }|{ ok: false }>}
   */
  async function foreignDeclaresDeploy(foreign, head_sha) {
    try {
      const resolved = await resolveRepoOps({
        repo: foreign.path,
        sha: head_sha,
        gitRun: deps.gitRun
      });
      if ('ok' in resolved && resolved.ok === false) {
        return { ok: false };
      }
      return { ok: true, declared: resolved.deploy !== null };
    } catch (err) {
      log('quick_fix foreign deploy declaration read failed: %o', err);
      return { ok: false };
    }
  }

  /**
   * Remove the owned worktree, then its local branch. Base-direct push creates
   * no remote topic branch, so this cleanup deliberately performs no remote
   * branch deletion.
   *
   * The worktree is judged against the fetched base that now contains the
   * landed head, not against the head itself: its HEAD is the dispatch base,
   * everything it holds is already on the base, and an absent worktree is
   * nothing left to remove. Only unique work refuses (`unique`/`unknown`).
   *
   * @param {string} bead_id
   * @param {string} base_sha
   * @returns {Promise<{ ok: true }|{ ok: false, reason: QuickfixLandingReason }>}
   */
  async function cleanupBranch(bead_id, base_sha) {
    const branch = branchForBead(bead_id);
    try {
      const removed = await deps.worktree.removeIfDiscardable({
        repo,
        bead_id,
        base: base_sha
      });
      if (!removed.ok) {
        log('quick_fix worktree preserved for %s: %s', bead_id, removed.reason);
        return { ok: false, reason: 'worktree_remove_failed' };
      }
    } catch (err) {
      log('quick_fix worktree removal failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'worktree_remove_failed' };
    }

    try {
      return await deps.worktree.withTopologyLock(repo, async () => {
        const deleted = await deps.gitRun(['branch', '-D', branch], {
          cwd: repo
        });
        if (deleted.code !== 0) {
          const still = await deps.gitRun(
            ['rev-parse', '--verify', `refs/heads/${branch}`],
            { cwd: repo }
          );
          if (still.code === 0) {
            return {
              ok: /** @type {const} */ (false),
              reason: /** @type {QuickfixLandingReason} */ (
                'local_branch_delete_failed'
              )
            };
          }
        }
        return { ok: /** @type {const} */ (true) };
      });
    } catch (err) {
      log('quick_fix local branch deletion failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'local_branch_delete_failed' };
    }
  }

  /**
   * Close with confirming readback. A write that returned before readback
   * failure may have landed, so its caller restores `resolved` on failure.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, wrote: boolean }>}
   */
  async function closeBead(bead_id) {
    let wrote = false;
    try {
      await deps.bd.setStatus(bead_id, 'closed');
      wrote = true;
      return { ok: (await deps.bd.readStatus(bead_id)) === 'closed', wrote };
    } catch (err) {
      log('quick_fix bd close failed for %s: %o', bead_id, err);
      return { ok: false, wrote };
    }
  }

  /** @param {string} bead_id */
  async function restoreResolved(bead_id) {
    try {
      await deps.bd.setStatus(bead_id, 'resolved');
      return (await deps.bd.readStatus(bead_id)) === 'resolved';
    } catch (err) {
      log('quick_fix bd resolved restore failed for %s: %o', bead_id, err);
      return false;
    }
  }

  /**
   * Settle a contract no-change close: the worktree, cut from base and holding
   * no unique commit or working delta, is the only residue. Removal is
   * fail-closed by construction — anything that would be lost stays, and the
   * attempt records that instead of forcing.
   *
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {string} target_base
   * @param {'refuted'|'no_delta'} kind
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, step: string|null }>}
   */
  async function settleNoChangeClose(attempt_id, bead_id, target_base, kind) {
    const fetched = await fetchBase(target_base);
    if (!fetched.ok) {
      return fail(
        attempt_id,
        'containment_unobservable',
        'no_change_close',
        null
      );
    }
    let residue;
    try {
      residue = await deps.worktree.removeIfDiscardable({
        repo,
        bead_id,
        base: fetched.sha
      });
    } catch (err) {
      log(
        'quick_fix no-change residue removal failed for %s: %o',
        bead_id,
        err
      );
      return fail(
        attempt_id,
        'worktree_remove_failed',
        'no_change_close',
        null
      );
    }
    if (!residue.ok) {
      log(
        'quick_fix no-change residue preserved for %s: %s',
        bead_id,
        residue.reason
      );
      return fail(
        attempt_id,
        'worktree_remove_failed',
        'no_change_close',
        null
      );
    }
    deps.store.moveToDone(workspace, {
      bead_id,
      attempt_id,
      patch: {
        status: 'done',
        finished_at: now(),
        done_kind: kind,
        quickfix_landing: {
          cursor: 'no_change_close',
          head_sha: null,
          reason: null
        }
      }
    });
    notifyChanged(workspace);
    return { ok: true };
  }

  /**
   * The durable landing cursor participates in resume judgment. A recorded
   * cleanup/close step can outlive its worktree, while the receipt must still
   * bind to the cursor's exact reviewed SHA. Only an unrecorded close is a
   * `premature_close`.
   *
   * @param {{ attempt_id: string, bead_id: string, target_base: string }} input
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, step: string|null }>}
   */
  async function settle(input) {
    const { attempt_id, bead_id, target_base } = input;
    const snapshot = /** @type {any} */ (deps.store.snapshot(workspace));
    const durable_landing = snapshot.attempts?.[attempt_id]?.quickfix_landing;
    const durable_cursor =
      durable_landing?.cursor === 'branch_cleanup' ||
      durable_landing?.cursor === 'parent_close'
        ? durable_landing.cursor
        : null;
    const durable_head_sha =
      typeof durable_landing?.head_sha === 'string'
        ? durable_landing.head_sha
        : null;
    // One `bd show` supplies status and close_reason from the same moment, so
    // the no-change judgment below cannot straddle a status change.
    /** @type {Record<string, any>} */
    let issue;
    try {
      issue = await deps.bd.readIssue(bead_id);
    } catch (err) {
      log('quick_fix status readback failed for %s: %o', bead_id, err);
      // An unreadable bead says nothing about the landing; naming the read is
      // what lets the classifier treat it as the environment failure it is.
      return fail(attempt_id, 'bd_read_failed', null, null);
    }
    const status = typeof issue.status === 'string' ? issue.status : null;
    if (
      status === 'closed' &&
      durable_cursor === 'parent_close' &&
      durable_head_sha !== null &&
      /^[0-9a-f]{40}$/i.test(durable_head_sha)
    ) {
      deps.store.moveToDone(workspace, {
        bead_id,
        attempt_id,
        patch: {
          status: 'done',
          finished_at: now(),
          quickfix_landing: {
            cursor: 'parent_close',
            head_sha: durable_head_sha,
            reason: null
          }
        }
      });
      notifyChanged(workspace);
      return { ok: true };
    }
    if (status === 'closed') {
      const no_change_kind = noChangeCloseKind(issue.close_reason);
      if (no_change_kind === null) {
        return fail(attempt_id, 'premature_close', null, null);
      }
      return settleNoChangeClose(
        attempt_id,
        bead_id,
        target_base,
        no_change_kind
      );
    }
    // Fields every later landing record must carry. Assigned only on the
    // evidence path below, and read at each write — a step that rewrites
    // `quickfix_landing` whole would otherwise erase what was recorded here.
    /** @type {LandingExtra} */
    let landing_extra = null;

    /** @type {string|null} */
    let receipt_head_sha = null;
    if (status !== 'resolved') {
      // §5.2–§5.3: the session did not write `resolved`. That is not a verdict
      // about the work — it is a missing self-report, and the attempt's own
      // push record plus the review receipt answer the question the report was
      // standing in for.
      const proven = await proveDelivery({ attempt_id, bead_id, target_base });
      if (!proven.ok) {
        return fail(attempt_id, proven.reason, null, null);
      }
      receipt_head_sha = proven.receipt_sha;
      landing_extra = { resolved_by: 'worker:evidence' };
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          quickfix_landing: landingRecord(
            { cursor: null, head_sha: receipt_head_sha, reason: null },
            landing_extra
          )
        }
      });
      notifyChanged(workspace);
    } else {
      const receipt = await readReceipt(bead_id);
      if (!receipt.ok) {
        // The ordinary path keeps ONE receipt reason: on a bead the session
        // itself resolved, an absent receipt and a malformed one are the same
        // contract failure, and splitting them now would rename a token the
        // failure vocabulary already carries. A read OUTAGE is not one of the
        // two — it keeps `bd_read_failed` so the resume judgment reads it as
        // environmental (§3.1.1).
        return fail(
          attempt_id,
          receipt.reason === 'bd_read_failed'
            ? 'bd_read_failed'
            : 'invalid_impl_review',
          null,
          null
        );
      }
      receipt_head_sha = receipt.sha;
    }
    const head_sha = durable_cursor ? durable_head_sha : receipt_head_sha;

    if (
      head_sha === null ||
      !/^[0-9a-f]{40}$/i.test(head_sha) ||
      (durable_cursor && receipt_head_sha !== head_sha)
    ) {
      return fail(attempt_id, 'head_mismatch', null, head_sha, landing_extra);
    }

    // The landed head is the receipt-bound SHA, not the owned worktree's HEAD:
    // `land-quick-fix.py` pushes a detached candidate and never commits in
    // that worktree, so its HEAD stays at the dispatch base (UI-fiei). The
    // proof that the reviewed bytes landed is base containment below.

    markStep(attempt_id, 'base_containment', head_sha, landing_extra);
    const foreign_read = await readForeignLanding(bead_id);
    if (!foreign_read.ok) {
      return fail(
        attempt_id,
        foreign_read.reason,
        'base_containment',
        head_sha,
        landing_extra
      );
    }
    const foreign = foreign_read.foreign;
    // The rig base is always fetched: it is the discard judgment for the rig
    // worktree below. For a foreign landing the containment question is asked
    // in the pinned checkout instead, because the landed SHA does not exist in
    // the rig at all (UI-jf33).
    const fetched = await fetchBase(target_base);
    if (!fetched.ok) {
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha,
        landing_extra
      );
    }
    /** @type {string} */
    let containment_cwd = repo;
    /** @type {string} */
    let containment_tip = fetched.sha;
    if (foreign) {
      const remote = await resolveForeignRemote(foreign);
      if (!remote.ok) {
        return fail(
          attempt_id,
          remote.reason,
          'base_containment',
          head_sha,
          landing_extra
        );
      }
      const foreign_fetched = await fetchForeignBase(foreign, remote.remote);
      if (!foreign_fetched.ok) {
        return fail(
          attempt_id,
          'containment_unobservable',
          'base_containment',
          head_sha,
          landing_extra
        );
      }
      containment_cwd = foreign.path;
      containment_tip = foreign_fetched.sha;
    }
    let containment;
    try {
      containment = await deps.gitRun(
        ['merge-base', '--is-ancestor', head_sha, containment_tip],
        { cwd: containment_cwd }
      );
    } catch (err) {
      log('quick_fix containment check failed for %s: %o', bead_id, err);
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha,
        landing_extra
      );
    }
    if (containment.code === 1) {
      return fail(
        attempt_id,
        'push_not_contained',
        'base_containment',
        head_sha,
        landing_extra
      );
    }
    if (containment.code !== 0) {
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha,
        landing_extra
      );
    }

    if (foreign) {
      markStep(attempt_id, 'repo_operations', head_sha, landing_extra);
      const declared = await foreignDeclaresDeploy(foreign, head_sha);
      if (!declared.ok) {
        return fail(
          attempt_id,
          'repo_ops_config_invalid',
          'repo_operations',
          head_sha,
          landing_extra
        );
      }
      if (declared.declared) {
        return fail(
          attempt_id,
          'foreign_deploy_unsupported',
          'repo_operations',
          head_sha,
          landing_extra
        );
      }
    } else if (repo_operations) {
      markStep(attempt_id, 'repo_operations', head_sha, landing_extra);
      let config;
      try {
        config = await repo_operations.hasConfig(head_sha, {
          current_target_base: true
        });
      } catch (err) {
        log('quick_fix repo config read failed for %s: %o', bead_id, err);
        return fail(
          attempt_id,
          'repo_ops_config_invalid',
          'repo_operations',
          head_sha,
          landing_extra
        );
      }
      if (!config.ok) {
        return fail(
          attempt_id,
          config.code || 'repo_ops_config_invalid',
          'repo_operations',
          head_sha,
          landing_extra
        );
      }
      if (config.present) {
        let deployed;
        try {
          deployed = await repo_operations.ensureDeploy({
            target_base,
            // Only the reviewed SHA is authorized for automatic deployment in
            // this attempt. Later unreviewed base commits are excluded; an
            // already-deployed descendant is covered by the coordinator's
            // existing descendant_success_covers_ancestor_rows monotonicity.
            target_sha: head_sha,
            subjects: [{ bead_id, merged_sha: head_sha }]
          });
        } catch (err) {
          log('quick_fix deploy start failed for %s: %o', bead_id, err);
          return fail(
            attempt_id,
            'repo_operation_failed',
            'repo_operations',
            head_sha,
            landing_extra
          );
        }
        if (!deployed.ok) {
          return fail(
            attempt_id,
            deployed.code || 'repo_operation_failed',
            'repo_operations',
            head_sha,
            landing_extra
          );
        }
        if (!deployed.inert && typeof deployed.operation_id === 'string') {
          let evidence;
          try {
            evidence = await repo_operations.waitForDeployTerminal(
              deployed.operation_id,
              {
                target_base,
                merged_sha: head_sha,
                timeout_ms: deployed.timeout_ms
              }
            );
          } catch (err) {
            log('quick_fix deploy evidence failed for %s: %o', bead_id, err);
            return fail(
              attempt_id,
              'repo_operation_failed',
              'repo_operations',
              head_sha,
              landing_extra
            );
          }
          if (evidence?.state === 'failed') {
            return fail(
              attempt_id,
              evidence.code || 'repo_operation_failed',
              'repo_operations',
              head_sha,
              landing_extra
            );
          }
          if (evidence?.state !== 'succeeded') {
            return fail(
              attempt_id,
              evidence?.code || 'repo_operation_pending',
              'repo_operations',
              head_sha,
              landing_extra
            );
          }
        }
      }
    }

    markStep(attempt_id, 'branch_cleanup', head_sha, landing_extra);
    const cleaned = await cleanupBranch(bead_id, fetched.sha);
    if (!cleaned.ok) {
      return fail(
        attempt_id,
        cleaned.reason,
        'branch_cleanup',
        head_sha,
        landing_extra
      );
    }

    markStep(attempt_id, 'parent_close', head_sha, landing_extra);
    const closed = await closeBead(bead_id);
    if (!closed.ok) {
      if (closed.wrote) {
        await restoreResolved(bead_id);
      }
      return fail(
        attempt_id,
        'bd_close_failed',
        'parent_close',
        head_sha,
        landing_extra
      );
    }

    deps.store.moveToDone(workspace, {
      bead_id,
      attempt_id,
      patch: {
        status: 'done',
        finished_at: now(),
        quickfix_landing: landingRecord(
          { cursor: 'parent_close', head_sha, reason: null },
          landing_extra
        )
      }
    });
    notifyChanged(workspace);
    return { ok: true };
  }

  return { settle };
}
