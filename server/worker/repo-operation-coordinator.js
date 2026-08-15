/**
 * The intentionally small RepoOperation entry point. It owns durable
 * prerecording, launch serialization, and restart reconciliation; callers
 * never spawn directly. The repo-operation lock is held across the whole
 * launch path (bind → resolve → prerecord → align → spawn → record), and
 * durable running-state serializes across restarts where the in-process lock
 * cannot.
 */
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { acquireDeployLock } from './deploy-lock.js';
import { resolveRepairOwner } from './repair-session-adapter.js';
import {
  isRepairEligible,
  repoOperationPolicySupported
} from './repo-operation-policy.js';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { createRepoOperationTransitionLauncher } from './repo-operation-transition.js';
import {
  recordRepoOpsResolution,
  refreshRepoOpsDisplay
} from './repo-ops-display.js';
import {
  resolveEffectiveRepoOps,
  resolveRepoOps
} from './repo-ops-resolver.js';
import {
  normalizeResolutionSubjects,
  normalizeScriptRetry,
  reproducedWithoutNewEvidence,
  resolutionAccess,
  scriptRetryApplicable,
  scriptRetryConsumptionKey
} from './resolution-ladder.js';
import {
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from './state-paths.js';
import { createRepoOpsDeployWorktreeManager } from './worktree.js';

/**
 * @param {{ repo_operations: Record<string, any> }} queue
 * @param {string} repo_id
 * @param {string} target_base
 * @returns {string|null}
 */
export function latestSuccessfulDeploySha(queue, repo_id, target_base) {
  /** @type {any|null} */
  let latest = null;
  for (const operation of Object.values(queue.repo_operations || {})) {
    if (
      operation.repo_id === repo_id &&
      operation.kind === 'deploy' &&
      operation.target_base === target_base &&
      operation.state === 'succeeded' &&
      typeof operation.target_sha === 'string' &&
      typeof operation.finished_at === 'number' &&
      (!latest || operation.finished_at > latest.finished_at)
    ) {
      latest = operation;
    }
  }
  return latest ? latest.target_sha : null;
}

/**
 * Stable failure identity per master spec §5: a digest over the failure class
 * and the terminal evidence, so identical failures can be recognized later.
 *
 * @param {{ code: string, exit_code?: number|null, signal?: string|null, log_digest?: string|null }} input
 */
export function failureFingerprint(input) {
  return crypto
    .createHash('sha256')
    .update(
      [
        input.code,
        String(input.exit_code ?? ''),
        String(input.signal ?? ''),
        String(input.log_digest ?? '')
      ].join('\n')
    )
    .digest('hex');
}

/**
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, locks: ReturnType<typeof import('./locks.js').createLockManager>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, fs?: typeof import('node:fs'), runner?: ReturnType<typeof createRepoOperationRunner>, deployWorktree?: ReturnType<typeof createRepoOpsDeployWorktreeManager>, deployLock?: typeof acquireDeployLock, transition?: ReturnType<typeof createRepoOperationTransitionLauncher>, verifyCheckout?: { materialize: (input: any) => Promise<any>, verify: (input: any) => Promise<{ ok: boolean }>, cleanup: (input: any) => Promise<void> }, repairSession?: { dispatch: (input: any) => Promise<{ ok: boolean, attempt_id?: string, session_id?: string|null, reason?: string }>, judge: (input: any) => Promise<{ verdict: string, evidence: string|null }> }, policySupported?: () => boolean }} deps
 */
export function createRepoOperationCoordinator(deps) {
  const fs = deps.fs || nodeFs;
  const runner = deps.runner || createRepoOperationRunner();
  const transition = deps.transition || createRepoOperationTransitionLauncher();
  const deploy_worktree =
    deps.deployWorktree ||
    createRepoOpsDeployWorktreeManager({ locks: deps.locks, run: deps.gitRun });
  const deployLock = deps.deployLock || acquireDeployLock;
  const verify_checkout =
    deps.verifyCheckout || createVerifyCheckout({ fs, gitRun: deps.gitRun });
  const policySupported = deps.policySupported || repoOperationPolicySupported;

  /**
   * `resolveEffectiveRepoOps`, plus the display-cache update (UI-q0uy §4.6-1).
   * The cache is fed by the resolve this launch ALREADY does — there is no
   * second resolution anywhere on this path.
   *
   * What gets recorded is the declaration the Worker ACTUALLY consumed, which is
   * the pinned `policy` side except on a bootstrap, where the target tree IS the
   * policy. Recording the target unconditionally would let a PR head define what
   * the settings surface claims this repo declares — exactly the inversion
   * `AGENTS.md` forbids, and on the verify lane `target_sha` is a PR head or
   * final SHA, never a base at all.
   *
   * Two cases record nothing rather than guess:
   *   - no `previous_sha` on a non-bootstrap resolve: the "previous" policy is
   *     then a hardcoded default, not a tree read, and recording it would claim
   *     a proven absence nobody proved;
   *   - a failed resolve: `resolveEffectiveRepoOps` collapses a previous-side and
   *     a target-side failure into one shape, so the SHA it failed at is not
   *     recoverable here. The error is recorded with a null SHA, which the
   *     settings surface renders as 선언 읽기 실패 with no base claim.
   *
   * @param {{ repo: string, previous_sha: string|null, target_sha: string, kind?: 'verify'|'deploy', gitRun: any }} input
   */
  async function resolveEffectiveTracked(input) {
    /** @type {any} */
    const result = await resolveEffectiveRepoOps(input);
    if (!result || typeof result !== 'object') {
      return result;
    }
    if (result.ok === false) {
      recordRepoOpsResolution({
        workspace: deps.workspace,
        resolution: result,
        base_sha: null
      });
      return result;
    }
    const bootstrap = result.classification === 'bootstrap';
    const resolution = bootstrap ? result.target : result.policy;
    const base_sha = bootstrap ? input.target_sha : input.previous_sha;
    if (
      typeof base_sha === 'string' &&
      resolution &&
      typeof resolution === 'object' &&
      'config_blob_sha' in resolution
    ) {
      recordRepoOpsResolution({
        workspace: deps.workspace,
        resolution,
        base_sha
      });
    }
    return result;
  }

  /**
   * The attach-time fill (UI-q0uy §4.6-1 (a)): one resolve at the base tip the
   * attachment already resolved, so a workspace shows its declaration before any
   * operation has run.
   *
   * @param {{ base: string|null, sha: string|null }} input
   */
  async function refreshDisplay(input) {
    return refreshRepoOpsDisplay({
      workspace: deps.workspace,
      repo: deps.repo,
      base: input.base,
      sha: input.sha,
      gitRun: deps.gitRun
    });
  }

  /**
   * Deploy operation identity per master spec §5: repo, kind, base, fetched
   * target, and pinned effective policy — never the subject set, so uncovered
   * subjects on the same target coalesce while a later fetched target queues a
   * successor instead of attaching itself to an older running operation.
   *
   * @param {{ effective_base_sha: string, target_base: string, target_sha: string, script_mode: string, script_blob_sha: string }} input
   */
  function operationId(input) {
    return crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          repo: deps.repo,
          kind: 'deploy',
          target_base: input.target_base,
          target_sha: input.target_sha,
          effective_base_sha: input.effective_base_sha,
          script_mode: input.script_mode,
          script_blob_sha: input.script_blob_sha
        })
      )
      .digest('hex')
      .slice(0, 24);
  }

  /**
   * @param {{ effective_base_sha: string, target_base: string, target_tree: string, script_object_type: string, script_mode: string, script_blob_sha: string }} input
   */
  function verifyOperationId(input) {
    return crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          repo: deps.repo,
          kind: 'verify',
          target_base: input.target_base,
          effective_base_sha: input.effective_base_sha,
          target_tree: input.target_tree,
          script_object_type: input.script_object_type,
          script_mode: input.script_mode,
          script_blob_sha: input.script_blob_sha
        })
      )
      .digest('hex')
      .slice(0, 24);
  }

  /**
   * @param {string} file
   */
  function fileSha256(file) {
    try {
      return crypto
        .createHash('sha256')
        .update(fs.readFileSync(file))
        .digest('hex');
    } catch {
      return null;
    }
  }

  /**
   * @param {Record<string, any>} operations
   * @param {string|null} [except_operation_id]
   */
  function runningOperationFor(operations, except_operation_id) {
    for (const [operation_id, operation] of Object.entries(operations)) {
      if (operation_id === except_operation_id) continue;
      if (
        operation.repo_id === deps.repo &&
        (operation.state === 'running' || operation.state === 'retry_pending')
      ) {
        return operation_id;
      }
    }
    return null;
  }

  /**
   * The deterministic repair owner (§9.3), delegated to the adapter so the
   * settle path and the dispatch path can never disagree about it.
   *
   * @param {any} operation
   */
  async function ownerBead(operation) {
    if (operation.subjects.length < 2) {
      return undefined;
    }
    const owner = await resolveRepairOwner(
      { gitRun: deps.gitRun, repo: deps.repo },
      operation
    );
    return owner ?? undefined;
  }

  /**
   * Test whether one commit is contained by another without letting an
   * unavailable ref or git error block terminal settlement.
   *
   * @param {string} ancestor_ref
   * @param {string} descendant_sha
   */
  async function isCoveredByDescendant(ancestor_ref, descendant_sha) {
    try {
      const result = await deps.gitRun(
        ['merge-base', '--is-ancestor', ancestor_ref, descendant_sha],
        { cwd: deps.repo }
      );
      return result.code === 0;
    } catch {
      return false;
    }
  }

  /**
   * Durably cover failed deploy rows when terminal settlement proves a
   * successful descendant, regardless of which row settled last.
   *
   * @param {string} workspace
   * @param {string} operation_id
   */
  async function sweepDescendantCoverage(workspace, operation_id) {
    try {
      const queue = deps.store.snapshot(workspace);
      const settled = queue.repo_operations[operation_id];
      if (
        !settled ||
        settled.kind !== 'deploy' ||
        (settled.state !== 'succeeded' && settled.state !== 'failed')
      ) {
        return;
      }
      if (settled.state === 'succeeded') {
        if (typeof settled.target_sha !== 'string') {
          return;
        }
        for (const [failed_id, failed] of Object.entries(
          queue.repo_operations
        )) {
          if (
            failed.kind !== 'deploy' ||
            failed.repo_id !== settled.repo_id ||
            failed.state !== 'failed' ||
            failed.superseded_by
          ) {
            continue;
          }
          const ancestor_ref = failed.target_sha ?? failed.effective_base_sha;
          if (
            typeof ancestor_ref !== 'string' ||
            !(await isCoveredByDescendant(ancestor_ref, settled.target_sha))
          ) {
            continue;
          }
          try {
            deps.store.supersedeRepoOperation(workspace, {
              operation_id: failed_id,
              successor_id: operation_id
            });
          } catch {
            continue;
          }
        }
        return;
      }
      if (settled.superseded_by) {
        return;
      }
      const ancestor_ref = settled.target_sha ?? settled.effective_base_sha;
      if (typeof ancestor_ref !== 'string') {
        return;
      }
      for (const [succeeded_id, succeeded] of Object.entries(
        queue.repo_operations
      )) {
        if (
          succeeded.kind !== 'deploy' ||
          succeeded.repo_id !== settled.repo_id ||
          succeeded.state !== 'succeeded' ||
          typeof succeeded.target_sha !== 'string' ||
          !(await isCoveredByDescendant(ancestor_ref, succeeded.target_sha))
        ) {
          continue;
        }
        try {
          deps.store.supersedeRepoOperation(workspace, {
            operation_id,
            successor_id: succeeded_id
          });
        } catch {
          return;
        }
        return;
      }
    } catch {
      return;
    }
  }

  /**
   * Durable failure settlement with the master §5 fingerprint identity.
   *
   * @param {string} workspace
   * @param {any} operation
   * @param {string} operation_id
   * @param {{ code: string, detail?: string, interrupted?: boolean, exit_code?: number|null, signal?: string|null }} failure
   */
  async function settleFailure(workspace, operation, operation_id, failure) {
    const current =
      deps.store.snapshot(workspace).repo_operations[operation_id] || operation;
    const log_digest = current.log_path ? fileSha256(current.log_path) : null;
    const owner_bead = await ownerBead(current);
    const failure_record = {
      code: failure.code,
      fingerprint: failureFingerprint({
        code: failure.code,
        exit_code: failure.exit_code ?? null,
        signal: failure.signal ?? null,
        log_digest
      }),
      detail: failure.detail ?? '',
      interrupted: failure.interrupted === true
    };
    const queue = deps.store.snapshot(workspace);
    const access = resolutionAccess({
      policy_supported: policySupported(),
      auto_repair: queue.auto_repair === true,
      subject: current
    });
    if (
      current.state === 'running' &&
      current.retry === null &&
      access.script_retry &&
      scriptRetryApplicable(current)
    ) {
      deps.store.deferRepoOperationRetry(workspace, {
        operation_id,
        attempt_id: current.attempt_id,
        exit_code: failure.exit_code ?? null,
        signal: failure.signal ?? null,
        log_digest,
        owner_bead,
        failure: failure_record
      });
      return 'retry_pending';
    }
    const blocked_reason =
      current.state === 'running' && current.retry === null
        ? !policySupported()
          ? 'schema_unsupported'
          : queue.auto_repair !== true
            ? 'auto_repair_off'
            : null
        : null;
    deps.store.settleRepoOperation(workspace, {
      operation_id,
      attempt_id: current.attempt_id,
      exit_code: failure.exit_code ?? null,
      signal: failure.signal ?? null,
      log_digest,
      owner_bead,
      failure: failure_record,
      ladder_stage: blocked_reason
        ? 'user_triggered_session'
        : 'auto_repair_session',
      retry_outcome:
        current.retry === null &&
        (blocked_reason !== null || !scriptRetryApplicable(current))
          ? 'not_applicable'
          : undefined,
      retry_blocked_reason: blocked_reason
    });
    await sweepDescendantCoverage(workspace, operation_id);
    transition.reclaim(workspace, operation_id);
    return 'failed';
  }

  /**
   * Terminal settlement from a runner marker, including the master §6.3 step 7
   * post-run readback: a deploy succeeds only when the owned worktree is still
   * at the bound target and clean.
   *
   * @param {string} workspace
   * @param {any} operation
   * @param {string} operation_id
   * @param {{ exit_code: number|null, signal: string|null }} marker
   */
  async function settleFromMarker(workspace, operation, operation_id, marker) {
    if (marker.exit_code === 0 && !marker.signal) {
      const aligned =
        operation.kind === 'verify'
          ? await verify_checkout.verify({
              repo: deps.repo,
              path: operation.deploy_worktree,
              target_tree: operation.target_tree
            })
          : typeof operation.target_sha === 'string'
            ? typeof deploy_worktree.verifyCovered === 'function'
              ? await deploy_worktree.verifyCovered({
                  repo: deps.repo,
                  target_sha: operation.target_sha
                })
              : await deploy_worktree.verifyAligned({
                  repo: deps.repo,
                  target_sha: operation.target_sha
                })
            : { ok: false };
      if (!aligned.ok) {
        await settleFailure(workspace, operation, operation_id, {
          code:
            operation.kind === 'verify'
              ? 'verify_candidate_mismatch'
              : 'deploy_worktree_residue',
          exit_code: marker.exit_code,
          signal: marker.signal
        });
        return;
      }
      const log_digest = operation.log_path
        ? fileSha256(operation.log_path)
        : null;
      deps.store.settleRepoOperation(workspace, {
        operation_id,
        attempt_id: operation.attempt_id,
        exit_code: marker.exit_code,
        signal: marker.signal,
        log_digest
      });
      await sweepDescendantCoverage(workspace, operation_id);
      transition.reclaim(workspace, operation_id);
      if (operation.kind === 'verify') {
        await verify_checkout.cleanup({
          repo: deps.repo,
          path: operation.deploy_worktree
        });
      }
      return;
    }
    const disposition = await settleFailure(
      workspace,
      operation,
      operation_id,
      {
        code: marker.exit_code === 124 ? 'timeout' : 'script_failed',
        exit_code: marker.exit_code,
        signal: marker.signal
      }
    );
    if (operation.kind === 'verify' && disposition !== 'retry_pending') {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: operation.deploy_worktree
      });
    }
  }

  /**
   * @param {any} candidate
   */
  function verifyCandidateMatches(candidate) {
    let candidate_repo = '';
    let coordinator_repo = '';
    try {
      candidate_repo = fs.realpathSync(path.resolve(candidate.repo));
      coordinator_repo = fs.realpathSync(path.resolve(deps.repo));
    } catch {
      return false;
    }
    return (
      candidate_repo === coordinator_repo &&
      candidate.origin === 'origin' &&
      typeof candidate.target_base === 'string' &&
      candidate.target_base.length > 0 &&
      /^[0-9a-f]{40}$/i.test(candidate.base_sha) &&
      /^[0-9a-f]{40}$/i.test(candidate.head_sha) &&
      (candidate.script_path === null ||
        typeof candidate.script_path === 'string') &&
      (candidate.final_sha === undefined ||
        /^[0-9a-f]{40}$/i.test(candidate.final_sha)) &&
      typeof candidate.bead_id === 'string' &&
      candidate.bead_id.length > 0 &&
      (candidate.final_sha !== undefined ||
        Number.isInteger(candidate.pr_number))
    );
  }

  /**
   * @param {any} candidate
   */
  async function ensureVerify(candidate) {
    if (!verifyCandidateMatches(candidate)) {
      return { ok: false, code: 'verify_candidate_mismatch' };
    }
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      return await ensureVerifyLocked(candidate);
    } finally {
      release();
    }
  }

  /**
   * @param {any} candidate
   */
  async function ensureVerifyLocked(candidate) {
    /** @type {any} */
    const policy = await resolveEffectiveTracked({
      repo: deps.repo,
      previous_sha: candidate.base_sha,
      target_sha: candidate.final_sha || candidate.head_sha,
      kind: 'verify',
      gitRun: deps.gitRun
    });
    if (!policy.policy || !policy.target) {
      return policy;
    }
    const declaration = policy.policy.verify;
    if (!declaration) {
      return { ok: true, inert: true };
    }
    if (
      declaration.identity_invalid ||
      declaration.object_type !== 'blob' ||
      candidate.script_path !== declaration.script ||
      policy.policy.base !== candidate.target_base
    ) {
      return { ok: false, code: 'verify_candidate_mismatch' };
    }
    const materialized = await verify_checkout.materialize({
      repo: deps.repo,
      origin: candidate.origin,
      target_base: candidate.target_base,
      base_sha: candidate.base_sha,
      head_sha: candidate.head_sha,
      pr_number: candidate.pr_number,
      final_sha: candidate.final_sha
    });
    if (
      !materialized.ok ||
      typeof materialized.path !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(materialized.tree_sha)
    ) {
      return {
        ok: false,
        code: materialized.code || 'verify_candidate_mismatch'
      };
    }
    const operation_id = verifyOperationId({
      effective_base_sha: candidate.base_sha,
      target_base: candidate.target_base,
      target_tree: materialized.tree_sha,
      script_object_type: declaration.object_type,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha
    });
    const existing_before =
      deps.store.snapshot(deps.workspace).repo_operations[operation_id] || null;
    const prerecord = deps.store.ensureRepoOperation(deps.workspace, {
      operation_id,
      repo_id: deps.repo,
      kind: 'verify',
      subjects: [
        {
          bead_id: candidate.bead_id,
          merged_sha: candidate.final_sha || candidate.head_sha
        }
      ],
      effective_base_sha: candidate.base_sha,
      target_base: candidate.target_base,
      target_tree: materialized.tree_sha,
      verify_head_sha: candidate.head_sha,
      deploy_worktree: materialized.path,
      script_object_type: declaration.object_type,
      script_path: declaration.script,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha
    });
    if (!prerecord.ok) {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return { ok: false, code: 'repo_operation_prerecord_failed' };
    }
    const operation = prerecord.queue.repo_operations[operation_id];
    const inherited = candidate.receipt_operation_id
      ? deps.store.snapshot(deps.workspace).repo_operations[
          candidate.receipt_operation_id
        ]
      : null;
    if (
      inherited &&
      inherited.kind === 'verify' &&
      inherited.state === 'succeeded' &&
      inherited.effective_base_sha === candidate.base_sha.toLowerCase() &&
      inherited.verify_head_sha === candidate.head_sha.toLowerCase() &&
      inherited.target_tree === materialized.tree_sha.toLowerCase() &&
      inherited.script_object_type === declaration.object_type &&
      inherited.script_mode === declaration.mode &&
      inherited.script_blob_sha === declaration.blob_sha
    ) {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return {
        ok: true,
        operation_id: candidate.receipt_operation_id,
        adopted: true,
        inherited: true
      };
    }
    if (existing_before) {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return { ok: true, operation_id, adopted: true };
    }
    if (operation.state !== 'queued') {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return { ok: true, operation_id, adopted: true };
    }
    const script = await transition.materialize({
      workspace: deps.workspace,
      repo: deps.repo,
      operation_id,
      blob_sha: declaration.blob_sha,
      mode: declaration.mode
    });
    if (!script.ok || typeof script.path !== 'string') {
      await settleFailure(deps.workspace, operation, operation_id, {
        code: 'verify_script_materialize_failed'
      });
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return {
        ok: false,
        code: 'verify_script_materialize_failed',
        operation_id
      };
    }
    const started = await runner.start({
      workspace: deps.workspace,
      operation_id,
      attempt_id: operation.attempt_id,
      script_path: script.path,
      cwd: materialized.path,
      target_sha: candidate.final_sha || candidate.head_sha,
      target_base: candidate.target_base,
      timeout_ms: declaration.timeout_ms
    });
    if (!started.ok || !started.process_identity) {
      await settleFailure(deps.workspace, operation, operation_id, {
        code: started.code || 'repo_operation_spawn_failed'
      });
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return { ok: false, code: started.code, operation_id };
    }
    const running = deps.store.startRepoOperation(deps.workspace, {
      operation_id,
      attempt_id: operation.attempt_id,
      process_identity: started.process_identity,
      log_path: started.log_path,
      target_sha: candidate.final_sha || candidate.head_sha,
      target_tree: materialized.tree_sha,
      deploy_worktree: materialized.path
    });
    return running.ok
      ? { ok: true, operation_id, timeout_ms: declaration.timeout_ms }
      : { ok: false, code: 'repo_operation_start_record_failed', operation_id };
  }

  /**
   * Consume retry eligibility immediately before the runner spawn, then bind
   * the new process to the same operation attempt. A spawn refusal settles the
   * preserved first failure because the durable key is already consumed.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} operation
   * @param {{ script_path: string, cwd: string, target_sha: string, timeout_ms: number, target_tree?: string, deploy_worktree?: string, retry?: boolean }} input
   */
  async function spawnRecorded(workspace, operation_id, operation, input) {
    if (input.retry === true) {
      const consumed_key = scriptRetryConsumptionKey(operation);
      if (!consumed_key) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation),
          blocked_reason: 'retry_identity_missing'
        });
        return { ok: false, code: 'repo_operation_retry_identity_missing' };
      }
      const consumed = deps.store.consumeRepoOperationRetry(workspace, {
        operation_id,
        attempt_id: operation.attempt_id,
        consumed_key
      });
      if (!consumed.ok) {
        return { ok: false, code: 'repo_operation_retry_consume_failed' };
      }
    }
    /** @type {any} */
    let started;
    try {
      started = await runner.start({
        workspace,
        operation_id,
        attempt_id: operation.attempt_id,
        script_path: input.script_path,
        cwd: input.cwd,
        target_sha: input.target_sha,
        target_base: operation.target_base,
        timeout_ms: input.timeout_ms
      });
    } catch {
      if (input.retry === true) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation)
        });
      }
      throw new Error('repo_operation_spawn_failed');
    }
    if (!started.ok || !started.process_identity) {
      if (input.retry === true) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation)
        });
      } else {
        await settleFailure(workspace, operation, operation_id, {
          code: started.code || 'repo_operation_spawn_failed'
        });
      }
      return { ok: false, code: started.code, operation_id };
    }
    const running = deps.store.startRepoOperation(workspace, {
      operation_id,
      attempt_id: operation.attempt_id,
      process_identity: started.process_identity,
      log_path: started.log_path,
      target_sha: input.target_sha,
      ...(typeof input.target_tree === 'string'
        ? { target_tree: input.target_tree }
        : {}),
      ...(typeof input.deploy_worktree === 'string'
        ? { deploy_worktree: input.deploy_worktree }
        : {})
    });
    return running.ok
      ? { ok: true, operation_id, timeout_ms: input.timeout_ms }
      : { ok: false, code: 'repo_operation_start_record_failed', operation_id };
  }

  /**
   * Bind, check monotonic deploy evidence, and align while holding the shared
   * cross-process lock. The caller already holds the in-process repo-operation
   * lock, so the only nesting direction is in-process then cross-process.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} operation
   * @param {{ declaration: any, target_sha: string, retry?: boolean }} plan
   */
  async function alignRecordedDeploy(workspace, operation_id, operation, plan) {
    const acquired = await deployLock({
      repo: deps.repo,
      timeout_ms: plan.declaration.timeout_ms
    });
    if (!acquired.ok) {
      await settleFailure(workspace, operation, operation_id, {
        code: acquired.code
      });
      return { ok: false, code: acquired.code, operation_id };
    }
    try {
      const rebound = await deploy_worktree.bindTarget({
        repo: deps.repo,
        base: operation.target_base,
        last_successful_sha: latestSuccessfulDeploySha(
          deps.store.snapshot(workspace),
          deps.repo,
          operation.target_base
        )
      });
      if (!rebound.ok || typeof rebound.target_sha !== 'string') {
        const code = rebound.code || 'repo_ops_target_unresolved';
        if (plan.retry === true) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            owner_bead: await ownerBead(operation),
            blocked_reason: code
          });
        } else {
          await settleFailure(workspace, operation, operation_id, { code });
        }
        return { ok: false, code, operation_id };
      }

      const state =
        typeof deploy_worktree.readState === 'function'
          ? await deploy_worktree.readState({ repo: deps.repo })
          : { ok: true, head: null, clean: true };
      if (
        state.ok &&
        state.clean === true &&
        typeof state.head === 'string' &&
        (state.head === plan.target_sha ||
          (await isCoveredByDescendant(plan.target_sha, state.head)))
      ) {
        deps.store.settleRepoOperation(workspace, {
          operation_id,
          attempt_id: operation.attempt_id,
          exit_code: 0,
          signal: null
        });
        await sweepDescendantCoverage(workspace, operation_id);
        transition.reclaim(workspace, operation_id);
        return {
          ok: true,
          operation_id,
          terminal: true,
          covered: state.head === plan.target_sha,
          superseded: state.head !== plan.target_sha
        };
      }

      const aligned = await deploy_worktree.ensureAligned({
        repo: deps.repo,
        workspace,
        target_sha: plan.target_sha
      });
      if (!aligned.ok || typeof aligned.path !== 'string') {
        const code = aligned.code || 'repo_ops_worktree_align_failed';
        if (plan.retry === true) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            owner_bead: await ownerBead(operation),
            blocked_reason: code
          });
        } else {
          await settleFailure(workspace, operation, operation_id, { code });
        }
        return { ok: false, code, operation_id };
      }
      return { ok: true, path: aligned.path, operation_id };
    } finally {
      await acquired.release();
    }
  }

  /**
   * Align, materialize, spawn, and record one already-prerecorded queued
   * operation. Every pre-spawn failure settles durably instead of leaving a
   * silent queued record. Caller holds the repo-operation lock.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {{ declaration: any, classification: string, target_sha: string, retry?: boolean }} plan
   */
  async function launchRecorded(workspace, operation_id, plan) {
    const operation =
      deps.store.snapshot(workspace).repo_operations[operation_id];
    if (
      !operation ||
      (operation.state !== 'queued' && operation.state !== 'retry_pending')
    ) {
      return { ok: true, operation_id, adopted: true };
    }
    const aligned = await alignRecordedDeploy(
      workspace,
      operation_id,
      operation,
      plan
    );
    if (!aligned.ok || aligned.terminal === true) {
      return aligned;
    }
    if (typeof aligned.path !== 'string') {
      await settleFailure(workspace, operation, operation_id, {
        code: 'repo_ops_worktree_align_failed'
      });
      return {
        ok: false,
        code: 'repo_ops_worktree_align_failed',
        operation_id
      };
    }
    let script_path = path.join(aligned.path, plan.declaration.script);
    if (plan.classification === 'transition') {
      const materialized = await transition.materialize({
        workspace,
        repo: deps.repo,
        operation_id,
        blob_sha: plan.declaration.blob_sha,
        mode: plan.declaration.mode
      });
      if (!materialized.ok || typeof materialized.path !== 'string') {
        if (plan.retry === true) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            owner_bead: await ownerBead(operation),
            blocked_reason: 'repo_ops_transition_materialize_failed'
          });
        } else {
          await settleFailure(workspace, operation, operation_id, {
            code: 'repo_ops_transition_materialize_failed'
          });
        }
        return {
          ok: false,
          code: 'repo_ops_transition_materialize_failed',
          operation_id
        };
      }
      script_path = materialized.path;
    }
    return spawnRecorded(workspace, operation_id, operation, {
      script_path,
      cwd: aligned.path,
      target_sha: plan.target_sha,
      timeout_ms: plan.declaration.timeout_ms,
      deploy_worktree: aligned.path,
      retry: plan.retry === true
    });
  }

  /**
   * @param {any} subject
   */
  async function ensureDeploy(subject) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      return await ensureDeployLocked(subject);
    } finally {
      release();
    }
  }

  /**
   * @param {any} subject
   */
  async function ensureDeployLocked(subject) {
    const workspace = deps.workspace;
    const previous_sha = latestSuccessfulDeploySha(
      deps.store.snapshot(workspace),
      deps.repo,
      subject.target_base
    );
    const bound = await deploy_worktree.bindTarget({
      repo: deps.repo,
      base: subject.target_base,
      last_successful_sha: previous_sha
    });
    if (!bound.ok || typeof bound.target_sha !== 'string') {
      return { ok: false, code: bound.code || 'repo_ops_target_unresolved' };
    }
    const target_sha = bound.target_sha;
    /** @type {any} */
    const policy = await resolveEffectiveTracked({
      repo: deps.repo,
      previous_sha,
      target_sha,
      kind: 'deploy',
      gitRun: deps.gitRun
    });
    if (!policy.policy || !policy.target) return policy;
    if (!policy.policy.deploy && !policy.target.deploy)
      return { ok: true, inert: true };
    if (
      policy.classification === 'bootstrap' &&
      !subject.bootstrap_provenance
    ) {
      return { ok: false, code: 'bootstrap_not_approved' };
    }
    /** @type {any} */
    const declaration =
      policy.classification === 'bootstrap'
        ? policy.target.deploy
        : policy.policy.deploy;
    if (!declaration || declaration.identity_invalid)
      return { ok: true, inert: true };
    const subjects = Array.isArray(subject.subjects)
      ? subject.subjects
      : [{ bead_id: 'bootstrap', merged_sha: target_sha }];
    for (const entry of subjects) {
      const contained = await deps.gitRun(
        ['merge-base', '--is-ancestor', entry.merged_sha, target_sha],
        { cwd: deps.repo }
      );
      if (contained.code !== 0) {
        return { ok: false, code: 'repo_operation_subject_not_contained' };
      }
    }
    const effective_base_sha = previous_sha || target_sha;
    const operation_id = operationId({
      effective_base_sha,
      target_base: subject.target_base,
      target_sha,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha
    });
    const existing =
      deps.store.snapshot(workspace).repo_operations[operation_id];
    // A fresh approved bootstrap request reopens a failed record — including
    // one whose own bootstrap run failed. The approval is the authority, and
    // re-requesting it is the only remediation entry a bootstrap operation has.
    if (
      existing &&
      existing.state === 'failed' &&
      subject.bootstrap_provenance
    ) {
      const attached = deps.store.attachRepoOperationBootstrap(workspace, {
        operation_id,
        provenance: subject.bootstrap_provenance,
        attempt_id: `${operation_id}:${Date.now()}`
      });
      if (!attached.ok) {
        return { ok: false, code: 'repo_operation_bootstrap_attach_failed' };
      }
    }
    const prerecord = deps.store.ensureRepoOperation(workspace, {
      operation_id,
      repo_id: deps.repo,
      kind: 'deploy',
      subjects,
      effective_base_sha,
      target_base: subject.target_base,
      script_path: declaration.script,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha,
      bootstrap_provenance: subject.bootstrap_provenance || null
    });
    if (!prerecord.ok)
      return { ok: false, code: 'repo_operation_prerecord_failed' };
    const operations = prerecord.queue.repo_operations;
    if (operations[operation_id].state !== 'queued')
      return { ok: true, operation_id, adopted: true };
    // Durable per-repo serialization: while another operation runs, the queued
    // record waits for a later reconcile instead of racing the worktree.
    if (runningOperationFor(operations, operation_id)) {
      return { ok: true, operation_id, queued: true };
    }
    return launchRecorded(workspace, operation_id, {
      declaration,
      classification: policy.classification,
      target_sha
    });
  }

  /**
   * Relaunch one queued record from its own pinned identity (restart path).
   * Caller holds the repo-operation lock.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} operation
   */
  async function launchQueued(workspace, operation_id, operation) {
    const retry = operation.state === 'retry_pending';
    // A retry re-runs the SAME command at the SAME target the first attempt
    // failed at (contract §3.2). Re-binding would resolve the remote's CURRENT
    // tip, so a base that moved between the two runs would leave the consumed
    // key pinned to the old SHA while the script executed against a new one —
    // a different command wearing the first one's retry budget. The pinned SHA
    // is authority here; its absence fails closed rather than falling back to a
    // fresh bind.
    /** @type {{ ok: boolean, code?: string, target_sha?: string }} */
    const bound = retry
      ? typeof operation.target_sha === 'string' && operation.target_sha
        ? { ok: true, target_sha: operation.target_sha }
        : { ok: false, code: 'repo_ops_retry_target_missing' }
      : await deploy_worktree.bindTarget({
          repo: deps.repo,
          base: operation.target_base,
          last_successful_sha: latestSuccessfulDeploySha(
            deps.store.snapshot(workspace),
            deps.repo,
            operation.target_base
          )
        });
    if (!bound.ok || typeof bound.target_sha !== 'string') {
      if (retry) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation),
          blocked_reason: bound.code || 'repo_ops_target_unresolved'
        });
      } else {
        await settleFailure(workspace, operation, operation_id, {
          code: bound.code || 'repo_ops_target_unresolved'
        });
      }
      return;
    }
    /** @type {any} */
    const policy = await resolveEffectiveTracked({
      repo: deps.repo,
      previous_sha: operation.effective_base_sha,
      target_sha: bound.target_sha,
      kind: 'deploy',
      gitRun: deps.gitRun
    });
    /** @type {any} */
    const declaration = policy.policy
      ? policy.classification === 'bootstrap'
        ? policy.target.deploy
        : policy.policy.deploy
      : null;
    if (
      !declaration ||
      declaration.identity_invalid ||
      declaration.mode !== operation.script_mode ||
      declaration.blob_sha !== operation.script_blob_sha
    ) {
      if (retry) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation),
          blocked_reason: 'repo_ops_policy_drift'
        });
      } else {
        await settleFailure(workspace, operation, operation_id, {
          code: 'repo_ops_policy_drift'
        });
      }
      return;
    }
    await launchRecorded(workspace, operation_id, {
      declaration,
      classification: policy.classification,
      target_sha: bound.target_sha,
      retry
    });
  }

  /**
   * Recreate the pinned verify script and respawn it in the still-owned candidate
   * checkout. The retry key is consumed only after policy/materialization checks
   * succeed and immediately before the runner invocation.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} operation
   */
  async function launchVerifyRetry(workspace, operation_id, operation) {
    const policy_target = operation.verify_head_sha || operation.target_sha;
    if (
      typeof policy_target !== 'string' ||
      typeof operation.target_sha !== 'string' ||
      typeof operation.deploy_worktree !== 'string'
    ) {
      deps.store.settleConsumedRepoOperationRetry(workspace, {
        operation_id,
        owner_bead: await ownerBead(operation),
        blocked_reason: 'verify_retry_input_missing'
      });
      return;
    }
    /** @type {any} */
    const policy = await resolveEffectiveTracked({
      repo: deps.repo,
      previous_sha: operation.effective_base_sha,
      target_sha: policy_target,
      kind: 'verify',
      gitRun: deps.gitRun
    });
    const declaration = policy.policy?.verify || null;
    if (
      !declaration ||
      declaration.identity_invalid ||
      declaration.mode !== operation.script_mode ||
      declaration.blob_sha !== operation.script_blob_sha
    ) {
      deps.store.settleConsumedRepoOperationRetry(workspace, {
        operation_id,
        owner_bead: await ownerBead(operation),
        blocked_reason: 'repo_ops_policy_drift'
      });
      return;
    }
    const script = await transition.materialize({
      workspace,
      repo: deps.repo,
      operation_id,
      blob_sha: declaration.blob_sha,
      mode: declaration.mode
    });
    if (!script.ok || typeof script.path !== 'string') {
      deps.store.settleConsumedRepoOperationRetry(workspace, {
        operation_id,
        owner_bead: await ownerBead(operation),
        blocked_reason: 'verify_script_materialize_failed'
      });
      return;
    }
    await spawnRecorded(workspace, operation_id, operation, {
      script_path: script.path,
      cwd: operation.deploy_worktree,
      target_sha: operation.target_sha,
      target_tree: operation.target_tree,
      deploy_worktree: operation.deploy_worktree,
      timeout_ms: declaration.timeout_ms,
      retry: true
    });
  }

  /**
   * @param {string} operation_id
   */
  function observe(operation_id) {
    return (
      deps.store.snapshot(deps.workspace).repo_operations[operation_id] || null
    );
  }

  /**
   * @param {string} operation_id
   */
  function verifyReceipt(operation_id) {
    const operation = observe(operation_id);
    if (!operation || operation.kind !== 'verify') {
      return null;
    }
    return {
      operation_id,
      effective_base_sha: operation.effective_base_sha,
      head_sha: operation.verify_head_sha,
      candidate_tree_sha: operation.target_tree,
      script_object_type: operation.script_object_type,
      script_mode: operation.script_mode,
      script_blob_sha: operation.script_blob_sha,
      ok: operation.state === 'succeeded',
      reason:
        operation.state === 'failed'
          ? operation.failure?.code || 'verify_failed'
          : operation.state,
      at:
        operation.finished_at || operation.started_at || operation.requested_at,
      state: operation.state,
      ...(typeof operation.log_path === 'string'
        ? { log_path: operation.log_path }
        : {})
    };
  }

  /**
   * @param {string} operation_id
   * @param {{ timeout_ms?: number, poll_ms?: number }} [options]
   */
  async function waitForTerminal(operation_id, options = {}) {
    const deadline = Date.now() + (options.timeout_ms ?? 600_000) + 5000;
    const poll_ms = options.poll_ms ?? 100;
    while (Date.now() <= deadline) {
      await reconcile(deps.workspace);
      const operation = observe(operation_id);
      if (
        operation &&
        (operation.state === 'succeeded' || operation.state === 'failed')
      ) {
        return verifyReceipt(operation_id);
      }
      await new Promise((resolve) => setTimeout(resolve, poll_ms));
    }
    return null;
  }

  /**
   * @param {string} sha
   */
  async function hasConfig(sha) {
    const resolved = await resolveRepoOps({
      repo: deps.repo,
      sha,
      gitRun: deps.gitRun
    });
    if (!resolved.ok && resolved.code) {
      return resolved;
    }
    return {
      ok: true,
      present: resolved.config_blob_sha !== null,
      verify_script_path: resolved.verify?.script ?? null
    };
  }

  /**
   * @param {string} operation_id
   * @param {{ target_base: string, merged_sha: string }} subject
   */
  async function deploymentEvidence(operation_id, subject) {
    const operation = observe(operation_id);
    if (!operation) {
      return { state: 'failed', code: 'repo_operation_missing' };
    }
    if (operation.state === 'succeeded') {
      return { state: 'succeeded', operation_id };
    }
    const operations = Object.entries(
      deps.store.snapshot(deps.workspace).repo_operations
    );
    for (const [candidate_id, candidate] of operations) {
      if (
        candidate.kind !== 'deploy' ||
        candidate.repo_id !== deps.repo ||
        candidate.target_base !== subject.target_base ||
        candidate.state !== 'succeeded' ||
        typeof candidate.target_sha !== 'string'
      ) {
        continue;
      }
      const covered = await deps.gitRun(
        [
          'merge-base',
          '--is-ancestor',
          subject.merged_sha,
          candidate.target_sha
        ],
        { cwd: deps.repo }
      );
      if (covered.code === 0) {
        return {
          state: 'succeeded',
          operation_id: candidate_id,
          covered_operation_id: operation_id
        };
      }
    }
    return operation.state === 'failed'
      ? {
          state: 'failed',
          operation_id,
          code: operation.failure?.code || 'repo_operation_failed'
        }
      : { state: operation.state, operation_id };
  }

  /**
   * @param {string} workspace
   */
  async function reconcile(workspace) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      await reconcileLocked(workspace);
    } finally {
      release();
    }
  }

  /**
   * @param {string} workspace
   */
  async function reconcileLocked(workspace) {
    const queue = deps.store.snapshot(workspace);
    for (const [operation_id, operation] of Object.entries(
      queue.repo_operations
    )) {
      if (operation.state === 'retry_pending') {
        const current_queue = deps.store.snapshot(workspace);
        const access = resolutionAccess({
          policy_supported: policySupported(),
          auto_repair: current_queue.auto_repair === true,
          subject: operation
        });
        if (!access.script_retry) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            owner_bead: await ownerBead(operation),
            ladder_stage: 'user_triggered_session',
            blocked_reason: !policySupported()
              ? 'schema_unsupported'
              : 'auto_repair_off'
          });
          continue;
        }
        if (normalizeScriptRetry(operation).status !== 'unconsumed') {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            owner_bead: await ownerBead(operation)
          });
          continue;
        }
        const operations_now = current_queue.repo_operations || {};
        if (!runningOperationFor(operations_now, operation_id)) {
          if (operation.kind === 'verify') {
            await launchVerifyRetry(workspace, operation_id, operation);
          } else {
            await launchQueued(workspace, operation_id, operation);
          }
        }
        continue;
      }
      if (operation.state === 'running') {
        const marker = runner.readMarker(
          workspace,
          operation_id,
          operation.attempt_id
        );
        if (marker) {
          await settleFromMarker(workspace, operation, operation_id, marker);
          continue;
        }
        const state = operation.process_identity
          ? runner.processController.probe(operation.process_identity)
          : { state: 'gone' };
        if (state.state === 'gone' || state.state === 'recycled') {
          if (operation.retry?.consumed_key) {
            deps.store.settleConsumedRepoOperationRetry(workspace, {
              operation_id,
              owner_bead: await ownerBead(operation)
            });
            transition.reclaim(workspace, operation_id);
          } else {
            const disposition = await settleFailure(
              workspace,
              operation,
              operation_id,
              {
                code: 'interrupted',
                detail: 'marker_missing',
                interrupted: true
              }
            );
            if (
              operation.kind === 'verify' &&
              disposition !== 'retry_pending'
            ) {
              await verify_checkout.cleanup({
                repo: deps.repo,
                path: operation.deploy_worktree
              });
            }
          }
          if (operation.kind === 'verify' && operation.retry?.consumed_key) {
            await verify_checkout.cleanup({
              repo: deps.repo,
              path: operation.deploy_worktree
            });
          }
        }
        continue;
      }
      if (operation.state !== 'queued') continue;
      if (operation.retry?.consumed_key) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          owner_bead: await ownerBead(operation)
        });
        continue;
      }
      // A queued record with a launch handshake belongs to a process spawned
      // by a Worker that died before its queue write: adopt, never respawn.
      const launch = runner.readLaunchMarker(
        workspace,
        operation_id,
        operation.attempt_id
      );
      if (launch) {
        const marker = runner.readMarker(
          workspace,
          operation_id,
          operation.attempt_id
        );
        if (marker) {
          await settleFromMarker(workspace, operation, operation_id, marker);
          continue;
        }
        const probe = runner.processController.probe(launch);
        if (probe.state === 'owned') {
          // Restore the invocation identity the handshake recorded. Without the
          // log path and the pinned target this adopted record could not prove a
          // script ever ran, and its failure would skip the script retry the
          // contract grants a real invocation (§3.2).
          deps.store.startRepoOperation(workspace, {
            operation_id,
            attempt_id: operation.attempt_id,
            process_identity: launch,
            log_path: operation.log_path || launch.log_path || '',
            ...(operation.target_sha || !launch.target_sha
              ? {}
              : { target_sha: launch.target_sha })
          });
        } else {
          await settleFailure(workspace, operation, operation_id, {
            code: 'interrupted',
            detail: 'launch_lost',
            interrupted: true
          });
        }
        continue;
      }
      if (operation.kind === 'verify') {
        await settleFailure(workspace, operation, operation_id, {
          code: 'interrupted',
          detail: 'verify_launch_missing',
          interrupted: true
        });
        await verify_checkout.cleanup({
          repo: deps.repo,
          path: operation.deploy_worktree
        });
        continue;
      }
      const operations_now =
        deps.store.snapshot(workspace).repo_operations || {};
      if (!runningOperationFor(operations_now, operation_id)) {
        await launchQueued(workspace, operation_id, operation);
      }
    }
    const pending = repoOpsSpoolPendingDir(workspace);
    /** @type {string[]} */
    let names = [];
    try {
      names = fs.readdirSync(pending).filter((name) => name.endsWith('.json'));
    } catch {
      await reconcileRepairsLocked(workspace);
      return;
    }
    for (const name of names) {
      const file = path.join(pending, name);
      try {
        const request = JSON.parse(fs.readFileSync(file, 'utf8'));
        const verdict = await consumeBootstrap(request);
        writeReceipt(file, verdict);
      } catch {
        writeReceipt(file, { ok: false, code: 'bootstrap_provenance_invalid' });
      }
    }
    await reconcileRepairsLocked(workspace);
  }

  /**
   * The chain's spent automatic budget. It is the MAXIMUM across the chain's
   * records, not a per-record value: a successor operation inherits `auto_used`
   * precisely so a new record cannot present itself as an unspent chain.
   *
   * @param {Record<string, any>} operations
   * @param {string} chain_id
   */
  function chainAutoUsed(operations, chain_id) {
    let used = 0;
    for (const operation of Object.values(operations)) {
      if (operation.repair.chain_id === chain_id) {
        used = Math.max(used, operation.repair.auto_used);
      }
    }
    return used;
  }

  /**
   * A chain closes on a terminal success of one of its operations (§9.3).
   *
   * @param {Record<string, any>} operations
   * @param {string} chain_id
   */
  function chainClosed(operations, chain_id) {
    return Object.values(operations).some(
      (operation) =>
        operation.repair.chain_id === chain_id &&
        operation.state === 'succeeded'
    );
  }

  /**
   * Start one repair session for a terminal failure. Caller holds the
   * repo-operation lock.
   *
   * `auto` is the contract-gated path: it requires the workspace flag, an
   * eligible failure class, unspent chain budget, and evidence that this is not
   * the same failure reproducing. `manual` is a human click — it skips the
   * budget and the flag, but goes through the SAME coordinator dispatch so a
   * new attempt is only ever created after repair evidence exists.
   *
   * @param {string} workspace
   * @param {string} requested_subject_id - `op:<operation_id>`,
   * `cleanup:<bead_id>`, or a bare operation id from a legacy caller.
   * @param {'auto'|'manual'} mode
   */
  async function startRepairLocked(workspace, requested_subject_id, mode) {
    const queue = deps.store.snapshot(workspace);
    const operation_id = requested_subject_id.startsWith('op:')
      ? requested_subject_id.slice('op:'.length)
      : requested_subject_id;
    const operation = queue.repo_operations[operation_id];
    if (operation?.state === 'repairing') {
      return { ok: true, operation_id, adopted: true };
    }
    if (operation?.state === 'failed' && operation.superseded_by) {
      const chain_id = operation.repair.chain_id || operation_id;
      return {
        ok: false,
        code: chainClosed(queue.repo_operations, chain_id)
          ? 'repair_chain_closed'
          : 'repo_operation_superseded'
      };
    }
    if (operation?.state === 'failed') {
      const chain_id = operation.repair.chain_id || operation_id;
      if (chainClosed(queue.repo_operations, chain_id)) {
        return { ok: false, code: 'repair_chain_closed' };
      }
    }
    const normalized = normalizeResolutionSubjects(queue);
    const subject_id = requested_subject_id.startsWith('cleanup:')
      ? requested_subject_id
      : `op:${operation_id}`;
    const subject = normalized.find(
      (candidate) => candidate.subject_id === subject_id
    );
    if (!subject) {
      return operation
        ? { ok: false, code: 'repo_operation_not_failed' }
        : { ok: false, code: 'repo_operation_missing' };
    }
    if (subject.source === 'cleanup') {
      return startCleanupRepairLocked(workspace, subject, mode);
    }
    const chain_id = operation.repair.chain_id || operation_id;
    if (mode === 'auto') {
      // The config disable is not advisory: an automatic dispatch asked for
      // while the flag is off is REFUSED, never downgraded to a manual one.
      if (queue.auto_repair !== true) {
        deps.store.descendRepoOperationToUser(workspace, { operation_id });
        return { ok: false, code: 'auto_repair_disabled' };
      }
      if (!policySupported()) {
        deps.store.descendRepoOperationToUser(workspace, { operation_id });
        return { ok: false, code: 'policy_schema_unsupported' };
      }
      if (!isRepairEligible(operation)) {
        return { ok: false, code: 'repair_not_eligible' };
      }
      if (operation.dismissed) {
        deps.store.descendRepoOperationToUser(workspace, { operation_id });
        return { ok: false, code: 'repair_dismissed' };
      }
      if (
        chainAutoUsed(queue.repo_operations, chain_id) >=
        operation.repair.auto_budget
      ) {
        deps.store.descendRepoOperationToUser(workspace, { operation_id });
        return { ok: false, code: 'repair_budget_exhausted' };
      }
      if (reproducedWithoutNewEvidence(queue.repo_operations, operation_id)) {
        deps.store.descendRepoOperationToUser(workspace, { operation_id });
        return { ok: false, code: 'repair_fingerprint_repeated' };
      }
    }
    if (!deps.repairSession) {
      return { ok: false, code: 'repair_session_unavailable' };
    }
    const owner_bead =
      operation.repair.owner_bead ||
      (await resolveRepairOwner(
        { gitRun: deps.gitRun, repo: deps.repo },
        operation
      ));
    // A bootstrap operation's only subject is the synthetic `bootstrap` marker,
    // not a Bead a session can attach to. Refusing here — BEFORE the prerecord —
    // is what keeps the chain's one automatic budget unspent: the prerecord
    // spends it deliberately ahead of any session effect, and releasing a failed
    // dispatch does not refund, so resolving an undispatchable owner would burn
    // the budget on a repair that could never have run.
    if (!owner_bead || owner_bead === 'bootstrap') {
      return { ok: false, code: 'repair_owner_unresolved' };
    }
    const prerecorded = deps.store.startRepoOperationRepair(workspace, {
      operation_id,
      mode,
      owner_bead
    });
    if (!prerecorded.ok) {
      return { ok: false, code: 'repair_prerecord_failed' };
    }
    const dispatched = await deps.repairSession.dispatch({
      workspace,
      operation_id,
      operation: deps.store.snapshot(workspace).repo_operations[operation_id],
      mode,
      owner_bead
    });
    if (!dispatched.ok || typeof dispatched.attempt_id !== 'string') {
      deps.store.releaseRepoOperationRepair(workspace, { operation_id });
      return { ok: false, code: dispatched.reason || 'repair_dispatch_failed' };
    }
    deps.store.bindRepoOperationRepairSession(workspace, {
      operation_id,
      attempt_id: dispatched.attempt_id,
      session_id: dispatched.session_id ?? null
    });
    return {
      ok: true,
      operation_id,
      mode,
      attempt_id: dispatched.attempt_id,
      session_id: dispatched.session_id ?? null
    };
  }

  /**
   * Dispatch the legacy cleanup surface through the same session Interface.
   * The synthetic operation is packet input only; durable state remains beside
   * the cleanup failure it describes.
   *
   * @param {string} workspace
   * @param {any} subject
   * @param {'auto'|'manual'} mode
   */
  async function startCleanupRepairLocked(workspace, subject, mode) {
    const queue = deps.store.snapshot(workspace);
    const failure = queue.cleanup_failed[subject.bead_id];
    if (!failure) {
      return { ok: false, code: 'repo_operation_missing' };
    }
    if (failure.repair?.mode) {
      return { ok: true, operation_id: subject.subject_id, adopted: true };
    }
    if (mode === 'auto') {
      if (queue.auto_repair !== true) {
        return { ok: false, code: 'auto_repair_disabled' };
      }
      if (!policySupported()) {
        return { ok: false, code: 'policy_schema_unsupported' };
      }
      if ((failure.repair?.auto_used || 0) >= 1) {
        return { ok: false, code: 'repair_budget_exhausted' };
      }
    }
    if (!deps.repairSession) {
      return { ok: false, code: 'repair_session_unavailable' };
    }
    const row = queue.pr_wait.find(
      (entry) => entry.bead_id === subject.bead_id
    );
    if (!row) {
      return { ok: false, code: 'repair_owner_unresolved' };
    }
    const prerecorded = deps.store.startCleanupRepair(workspace, {
      bead_id: subject.bead_id,
      mode
    });
    if (!prerecorded.ok) {
      return { ok: false, code: 'repair_prerecord_failed' };
    }
    const current = deps.store.snapshot(workspace);
    const current_failure = current.cleanup_failed[subject.bead_id];
    const current_repair = current_failure.repair;
    // The prerecord above writes `repair`; its absence here means the durable
    // write did not land, so the dispatch must not proceed on a record whose
    // chain and budget were never stamped.
    if (!current_repair) {
      return { ok: false, code: 'repair_prerecord_failed' };
    }
    const code = current_failure.failure_code || current_failure.reason;
    const synthetic_operation = {
      kind: 'cleanup',
      step: current_failure.step,
      reason: current_failure.reason,
      subjects: [
        {
          bead_id: subject.bead_id,
          merged_sha: row.merge_sha || ''
        }
      ],
      target_base: null,
      target_sha: row.merge_sha || null,
      target_tree: null,
      effective_base_sha: null,
      script_blob_sha: null,
      script_mode: null,
      attempt_id: subject.subject_id,
      exit_code: null,
      signal: null,
      started_at: null,
      finished_at: current_failure.at,
      log_path: current_failure.log_path || null,
      log_digest: null,
      output_tail: current_failure.output_tail || '',
      state: 'repairing',
      failure: {
        code,
        fingerprint: failureFingerprint({ code }),
        detail: current_failure.detail || current_failure.reason,
        interrupted: false
      },
      retry: {
        first_failure: null,
        first_fingerprint: null,
        consumed_key: null,
        absorbed: null,
        outcome: 'not_applicable',
        blocked_reason: null
      },
      repair: {
        chain_id: current_repair.chain_id,
        auto_budget: 1,
        auto_used: current_repair.auto_used,
        ladder_stage: current_repair.ladder_stage
      }
    };
    const dispatched = await deps.repairSession.dispatch({
      workspace,
      operation_id: subject.subject_id,
      operation: synthetic_operation,
      mode,
      owner_bead: subject.bead_id
    });
    if (!dispatched.ok || typeof dispatched.attempt_id !== 'string') {
      deps.store.releaseCleanupRepair(workspace, {
        bead_id: subject.bead_id
      });
      return { ok: false, code: dispatched.reason || 'repair_dispatch_failed' };
    }
    deps.store.bindCleanupRepairSession(workspace, {
      bead_id: subject.bead_id,
      attempt_id: dispatched.attempt_id,
      session_id: dispatched.session_id ?? null
    });
    return {
      ok: true,
      operation_id: subject.subject_id,
      mode,
      attempt_id: dispatched.attempt_id,
      session_id: dispatched.session_id ?? null
    };
  }

  /**
   * @param {string} operation_id
   * @param {'auto'|'manual'} [mode]
   */
  async function startRepair(operation_id, mode = 'manual') {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      return await startRepairLocked(deps.workspace, operation_id, mode);
    } finally {
      release();
    }
  }

  /**
   * Acknowledge one failed row (UI-q0uy §4.6-2). Not a transition and not a
   * repair: the record keeps its state and evidence, and the repair budget and
   * chain are untouched. Under the repo-operation lock like every other write
   * here, so it cannot race a launch that is about to move the same row.
   *
   * @param {string} operation_id
   */
  async function dismiss(operation_id) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      const operation = observe(operation_id);
      if (!operation) {
        return { ok: false, code: 'repo_operation_missing' };
      }
      if (operation.state !== 'failed') {
        return { ok: false, code: 'repo_operation_not_failed' };
      }
      const applied = deps.store.dismissRepoOperation(deps.workspace, {
        operation_id,
        by: 'user'
      });
      if (!applied || applied.ok !== true) {
        return { ok: false, code: 'repo_operation_dismiss_refused' };
      }
      return { ok: true, operation_id };
    } finally {
      release();
    }
  }

  /**
   * Reconcile the repair lane. Two passes, both driven by facts the coordinator
   * can read for itself:
   *
   *   - a `repairing` record whose session is no longer running returns to
   *     `failed`, because a session ENDING is not a repair. Nothing here reads
   *     what the session said about itself.
   *   - a `failed` record that passes every §9.3 gate gets its one automatic
   *     dispatch. Turning `auto_repair` back ON therefore reconciles eligible
   *     failures on the very next pass without any extra trigger.
   *
   * Caller holds the repo-operation lock.
   *
   * @param {string} workspace
   */
  async function reconcileRepairsLocked(workspace) {
    if (!deps.repairSession) {
      return;
    }
    for (const [operation_id, operation] of Object.entries(
      deps.store.snapshot(workspace).repo_operations
    )) {
      if (operation.repo_id !== deps.repo) continue;
      if (operation.state === 'repairing') {
        const judged = await deps.repairSession.judge({
          workspace,
          operation_id
        });
        if (judged.verdict !== 'session_running') {
          deps.store.releaseRepoOperationRepair(workspace, { operation_id });
        }
        continue;
      }
      if (operation.state !== 'failed') continue;
      await startRepairLocked(workspace, operation_id, 'auto');
    }
    const queue = deps.store.snapshot(workspace);
    for (const subject of normalizeResolutionSubjects(queue)) {
      if (subject.source !== 'cleanup') {
        continue;
      }
      if (subject.cleanup_failure.repair?.mode) {
        const judged = await deps.repairSession.judge({
          workspace,
          operation_id: subject.subject_id
        });
        if (judged.verdict !== 'session_running') {
          deps.store.releaseCleanupRepair(workspace, {
            bead_id: subject.bead_id
          });
        }
        continue;
      }
      await startRepairLocked(workspace, subject.subject_id, 'auto');
    }
  }

  /**
   * @param {string} source
   * @param {unknown} receipt
   */
  function writeReceipt(source, receipt) {
    const processed = repoOpsSpoolProcessedDir(deps.workspace);
    fs.mkdirSync(processed, { recursive: true });
    const name = path.basename(source, '.json');
    const receipt_path = path.join(processed, `${name}.receipt.json`);
    const temp = `${receipt_path}.tmp`;
    fs.writeFileSync(temp, JSON.stringify(receipt));
    fs.renameSync(temp, receipt_path);
    fs.renameSync(source, path.join(processed, `${name}.request.json`));
  }

  /**
   * @param {string} value
   */
  function isWorkspaceRelativePath(value) {
    if (typeof value !== 'string' || value === '') return false;
    if (value.startsWith('/') || value.includes('\0')) return false;
    return !value
      .split('/')
      .some((segment) => segment === '..' || segment === '');
  }

  /**
   * @param {any} request
   */
  async function consumeBootstrap(request) {
    if (
      !request ||
      typeof request.repo !== 'string' ||
      typeof request.target_base !== 'string' ||
      /\s|^-/.test(request.target_base) ||
      request.target_base === '' ||
      !isWorkspaceRelativePath(request.approved_source_path) ||
      !/^[0-9a-f]{40}$/i.test(request.approved_source_sha) ||
      typeof request.requested_by !== 'string' ||
      request.requested_by === '' ||
      !Number.isFinite(request.requested_at)
    ) {
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    }
    // Provenance binds to THIS coordinator's canonical repo: a request naming
    // any other checkout (or an unresolvable path) is rejected outright, and
    // every git proof below runs against the canonical repo only.
    let canonical_request_repo = '';
    let canonical_repo = '';
    try {
      canonical_request_repo = fs.realpathSync(path.resolve(request.repo));
      canonical_repo = fs.realpathSync(path.resolve(deps.repo));
    } catch {
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    }
    if (canonical_request_repo !== canonical_repo) {
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    }
    const commit = await deps.gitRun(
      ['cat-file', '-e', `${request.approved_source_sha}^{commit}`],
      { cwd: deps.repo }
    );
    const file = await deps.gitRun(
      [
        'cat-file',
        '-e',
        `${request.approved_source_sha}:${request.approved_source_path}`
      ],
      { cwd: deps.repo }
    );
    if (commit.code !== 0 || file.code !== 0)
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    // consumeBootstrap only runs from reconcileLocked, which already holds the
    // repo-operation lock — re-acquiring it here would self-deadlock.
    const ensured = await ensureDeployLocked({
      target_base: request.target_base,
      subjects: null,
      bootstrap_provenance: {
        approved_source_path: request.approved_source_path,
        approved_source_sha: request.approved_source_sha.toLowerCase(),
        requested_by: request.requested_by,
        requested_at: request.requested_at
      }
    });
    return ensured.ok
      ? { ok: true, operation_id: ensured.operation_id ?? null }
      : ensured;
  }

  return {
    ensureDeploy,
    ensureVerify,
    observe,
    verifyReceipt,
    waitForTerminal,
    hasConfig,
    deploymentEvidence,
    reconcile,
    startRepair,
    dismiss,
    refreshDisplay
  };
}

/**
 * @param {{ fs: typeof import('node:fs'), gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }> }} deps
 */
function createVerifyCheckout(deps) {
  return {
    /**
     * @param {{ repo: string, origin: string, target_base: string, base_sha: string, head_sha: string, pr_number: number, final_sha?: string }} input
     */
    async materialize(input) {
      if (input.final_sha) {
        const checkout_path = deps.fs.mkdtempSync(
          path.join(os.tmpdir(), 'bdui-verify-final-')
        );
        deps.fs.rmdirSync(checkout_path);
        const added = await deps.gitRun(
          ['worktree', 'add', '--detach', checkout_path, input.final_sha],
          { cwd: input.repo }
        );
        const tree =
          added.code === 0
            ? await deps.gitRun(['rev-parse', `${input.final_sha}^{tree}`], {
                cwd: input.repo
              })
            : { code: 1, stdout: '', stderr: added.stderr };
        if (tree.code !== 0 || !/^[0-9a-f]{40}$/i.test(tree.stdout.trim())) {
          await this.cleanup({ repo: input.repo, path: checkout_path });
          return { ok: false, code: 'verify_candidate_mismatch' };
        }
        return { ok: true, path: checkout_path, tree_sha: tree.stdout.trim() };
      }
      const fetched = await deps.gitRun(
        ['fetch', input.origin, `pull/${input.pr_number}/head`],
        { cwd: input.repo, timeout_ms: 120_000 }
      );
      if (fetched.code !== 0) {
        return { ok: false, code: 'verify_candidate_mismatch' };
      }
      const remote = await deps.gitRun(
        [
          'rev-parse',
          `refs/remotes/${input.origin}/${input.target_base}^{commit}`
        ],
        { cwd: input.repo }
      );
      if (
        remote.code !== 0 ||
        remote.stdout.trim().toLowerCase() !== input.base_sha.toLowerCase()
      ) {
        return { ok: false, code: 'verify_candidate_mismatch' };
      }
      const head = await deps.gitRun(['rev-parse', 'FETCH_HEAD^{commit}'], {
        cwd: input.repo
      });
      if (
        head.code !== 0 ||
        head.stdout.trim().toLowerCase() !== input.head_sha.toLowerCase()
      ) {
        return { ok: false, code: 'verify_candidate_mismatch' };
      }
      const checkout_path = deps.fs.mkdtempSync(
        path.join(os.tmpdir(), 'bdui-verify-candidate-')
      );
      deps.fs.rmdirSync(checkout_path);
      const added = await deps.gitRun(
        ['worktree', 'add', '--detach', checkout_path, input.base_sha],
        { cwd: input.repo }
      );
      if (added.code !== 0) {
        deps.fs.rmSync(checkout_path, { recursive: true, force: true });
        return { ok: false, code: 'verify_candidate_materialize_failed' };
      }
      const merged = await deps.gitRun(
        ['merge', '--squash', '--no-commit', input.head_sha],
        { cwd: checkout_path }
      );
      const tree =
        merged.code === 0
          ? await deps.gitRun(['write-tree'], { cwd: checkout_path })
          : { code: 1, stdout: '', stderr: merged.stderr };
      if (tree.code !== 0 || !/^[0-9a-f]{40}$/i.test(tree.stdout.trim())) {
        await this.cleanup({ repo: input.repo, path: checkout_path });
        return { ok: false, code: 'verify_candidate_materialize_failed' };
      }
      return { ok: true, path: checkout_path, tree_sha: tree.stdout.trim() };
    },

    /**
     * @param {{ repo: string, path: string|null, target_tree: string|null }} input
     */
    async verify(input) {
      if (!input.path || !input.target_tree) {
        return { ok: false };
      }
      const tree = await deps.gitRun(['write-tree'], { cwd: input.path });
      return {
        ok:
          tree.code === 0 &&
          tree.stdout.trim().toLowerCase() === input.target_tree.toLowerCase()
      };
    },

    /**
     * @param {{ repo: string, path: string|null }} input
     */
    async cleanup(input) {
      if (!input.path) {
        return;
      }
      await deps.gitRun(['worktree', 'remove', '--force', input.path], {
        cwd: input.repo
      });
      deps.fs.rmSync(input.path, { recursive: true, force: true });
    }
  };
}
