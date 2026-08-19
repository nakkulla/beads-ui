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
 * preserved worktree HEAD must equal the review receipt SHA exactly: ancestry
 * would accept an unreviewed commit B added after reviewed commit A. The
 * durable cursor is also a resume input, not display-only state: after branch
 * cleanup it replaces the legitimately absent worktree as the head binding,
 * and a `parent_close` record makes an already-closed bead a successful resume.
 * `premature_close` applies only without that Worker-owned close record.
 *
 * @import { Attempt } from './queue-store.js'
 */
import { debug } from '../logging.js';
import { ADMISSION_RECEIPT_RE } from './admission.js';
import { branchForBead } from './worktree.js';

const log = debug('worker:quickfix-landing');

/**
 * The four contract failures named by design §11 are the central cases. The
 * remaining values distinguish an unobservable judgment from the exact lower
 * settlement step that failed, instead of reporting false success.
 *
 * @typedef {'premature_close'|'not_resolved'|'invalid_impl_review'|'head_mismatch'|'push_not_contained'|'containment_unobservable'|'repo_ops_config_invalid'|'repo_operation_failed'|'repo_operation_pending'|'worktree_remove_failed'|'local_branch_delete_failed'|'bd_close_failed'} QuickfixLandingReason
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
 *     readStatus: (bead_id: string) => Promise<string|null>,
 *     setStatus: (bead_id: string, status: string) => Promise<void>,
 *     readMetadata: (bead_id: string, key: string) => Promise<string|null>
 *   },
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   worktree: {
 *     pathFor: (repo: string, bead_id: string) => string,
 *     exists: (repo: string, bead_id: string) => boolean,
 *     removeByBranch: (input: { repo: string, branch: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *     withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 *   },
 *   repoOperations: {
 *     hasConfig: (sha: string, options?: { current_target_base?: boolean }) => Promise<any>,
 *     ensureDeploy: (subject: any) => Promise<any>,
 *     waitForDeployTerminal: (operation_id: string, input: any) => Promise<any>
 *   }|null,
 *   notifyChanged?: (workspace: string) => void,
 *   now?: () => number
 * }} deps
 */
export function createQuickfixLanding(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  const repo_operations = deps.repoOperations || null;
  const notifyChanged = deps.notifyChanged || (() => {});
  const now = deps.now || (() => Date.now());

  /**
   * @param {string} attempt_id
   * @param {'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'} cursor
   * @param {string} head_sha
   */
  function markStep(attempt_id, cursor, head_sha) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        quickfix_landing: { cursor, head_sha, reason: null }
      }
    });
    notifyChanged(workspace);
  }

  /**
   * @param {string} attempt_id
   * @param {QuickfixLandingReason|string} reason
   * @param {'base_containment'|'repo_operations'|'branch_cleanup'|'parent_close'|null} step
   * @param {string|null} head_sha
   * @returns {{ ok: false, reason: string, step: string|null }}
   */
  function fail(attempt_id, reason, step, head_sha) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        quickfix_landing: { cursor: step, head_sha, reason }
      }
    });
    notifyChanged(workspace);
    return { ok: false, reason, step };
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
   * Remove the owned worktree, then its local branch. Base-direct push creates
   * no remote topic branch, so this cleanup deliberately performs no remote
   * branch deletion.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true }|{ ok: false, reason: QuickfixLandingReason }>}
   */
  async function cleanupBranch(bead_id) {
    const branch = branchForBead(bead_id);
    try {
      const removed = await deps.worktree.removeByBranch({ repo, branch });
      if (!removed.ok) {
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
    /** @type {string|null} */
    let status;
    try {
      status = await deps.bd.readStatus(bead_id);
    } catch (err) {
      log('quick_fix status readback failed for %s: %o', bead_id, err);
      return fail(attempt_id, 'not_resolved', null, null);
    }
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
      return fail(attempt_id, 'premature_close', null, null);
    }
    if (status !== 'resolved') {
      return fail(attempt_id, 'not_resolved', null, null);
    }

    /** @type {string|null} */
    let receipt;
    try {
      receipt = await deps.bd.readMetadata(bead_id, 'impl_review');
    } catch (err) {
      log('quick_fix impl_review readback failed for %s: %o', bead_id, err);
      return fail(attempt_id, 'invalid_impl_review', null, null);
    }
    const trimmed_receipt = typeof receipt === 'string' ? receipt.trim() : '';
    const separator = trimmed_receipt.lastIndexOf('@');
    const reviewer = trimmed_receipt.slice(0, separator);
    if (!ADMISSION_RECEIPT_RE.test(trimmed_receipt) || reviewer === 'skipped') {
      return fail(attempt_id, 'invalid_impl_review', null, null);
    }
    const receipt_head_sha = trimmed_receipt.slice(separator + 1);
    const head_sha = durable_cursor ? durable_head_sha : receipt_head_sha;

    if (
      head_sha === null ||
      !/^[0-9a-f]{40}$/i.test(head_sha) ||
      (durable_cursor && receipt_head_sha !== head_sha)
    ) {
      return fail(attempt_id, 'head_mismatch', null, head_sha);
    }

    if (!durable_cursor && !deps.worktree.exists(repo, bead_id)) {
      return fail(attempt_id, 'head_mismatch', null, head_sha);
    }
    if (!durable_cursor) {
      try {
        const head = await deps.gitRun(['rev-parse', 'HEAD'], {
          cwd: deps.worktree.pathFor(repo, bead_id)
        });
        // An ancestry check would accept unreviewed B after reviewed A. Landing
        // therefore requires exact equality with the receipt-bound SHA.
        if (head.code !== 0 || head.stdout.trim() !== head_sha) {
          return fail(attempt_id, 'head_mismatch', null, head_sha);
        }
      } catch (err) {
        log('quick_fix worktree HEAD read failed for %s: %o', bead_id, err);
        return fail(attempt_id, 'head_mismatch', null, head_sha);
      }
    }

    markStep(attempt_id, 'base_containment', head_sha);
    const fetched = await fetchBase(target_base);
    if (!fetched.ok) {
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha
      );
    }
    let containment;
    try {
      containment = await deps.gitRun(
        ['merge-base', '--is-ancestor', head_sha, fetched.sha],
        { cwd: repo }
      );
    } catch (err) {
      log('quick_fix containment check failed for %s: %o', bead_id, err);
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha
      );
    }
    if (containment.code === 1) {
      return fail(
        attempt_id,
        'push_not_contained',
        'base_containment',
        head_sha
      );
    }
    if (containment.code !== 0) {
      return fail(
        attempt_id,
        'containment_unobservable',
        'base_containment',
        head_sha
      );
    }

    if (repo_operations) {
      markStep(attempt_id, 'repo_operations', head_sha);
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
          head_sha
        );
      }
      if (!config.ok) {
        return fail(
          attempt_id,
          config.code || 'repo_ops_config_invalid',
          'repo_operations',
          head_sha
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
            head_sha
          );
        }
        if (!deployed.ok) {
          return fail(
            attempt_id,
            deployed.code || 'repo_operation_failed',
            'repo_operations',
            head_sha
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
              head_sha
            );
          }
          if (evidence?.state === 'failed') {
            return fail(
              attempt_id,
              evidence.code || 'repo_operation_failed',
              'repo_operations',
              head_sha
            );
          }
          if (evidence?.state !== 'succeeded') {
            return fail(
              attempt_id,
              evidence?.code || 'repo_operation_pending',
              'repo_operations',
              head_sha
            );
          }
        }
      }
    }

    markStep(attempt_id, 'branch_cleanup', head_sha);
    const cleaned = await cleanupBranch(bead_id);
    if (!cleaned.ok) {
      return fail(attempt_id, cleaned.reason, 'branch_cleanup', head_sha);
    }

    markStep(attempt_id, 'parent_close', head_sha);
    const closed = await closeBead(bead_id);
    if (!closed.ok) {
      if (closed.wrote) {
        await restoreResolved(bead_id);
      }
      return fail(attempt_id, 'bd_close_failed', 'parent_close', head_sha);
    }

    deps.store.moveToDone(workspace, {
      bead_id,
      attempt_id,
      patch: {
        status: 'done',
        finished_at: now(),
        quickfix_landing: {
          cursor: 'parent_close',
          head_sha,
          reason: null
        }
      }
    });
    notifyChanged(workspace);
    return { ok: true };
  }

  return { settle };
}
