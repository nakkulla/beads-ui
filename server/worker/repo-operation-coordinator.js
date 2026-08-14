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
import {
  repairEvidenceKey,
  resolveRepairOwner
} from './repair-session-adapter.js';
import { isRepairEligible } from './repo-operation-policy.js';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { createRepoOperationTransitionLauncher } from './repo-operation-transition.js';
import {
  resolveEffectiveRepoOps,
  resolveRepoOps
} from './repo-ops-resolver.js';
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
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, locks: ReturnType<typeof import('./locks.js').createLockManager>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, fs?: typeof import('node:fs'), runner?: ReturnType<typeof createRepoOperationRunner>, deployWorktree?: ReturnType<typeof createRepoOpsDeployWorktreeManager>, transition?: ReturnType<typeof createRepoOperationTransitionLauncher>, verifyCheckout?: { materialize: (input: any) => Promise<any>, verify: (input: any) => Promise<{ ok: boolean }>, cleanup: (input: any) => Promise<void> }, repairSession?: { dispatch: (input: any) => Promise<{ ok: boolean, attempt_id?: string, session_id?: string|null, reason?: string }>, judge: (input: any) => Promise<{ verdict: string, evidence: string|null }> } }} deps
 */
export function createRepoOperationCoordinator(deps) {
  const fs = deps.fs || nodeFs;
  const runner = deps.runner || createRepoOperationRunner();
  const transition = deps.transition || createRepoOperationTransitionLauncher();
  const deploy_worktree =
    deps.deployWorktree ||
    createRepoOpsDeployWorktreeManager({ locks: deps.locks, run: deps.gitRun });
  const verify_checkout =
    deps.verifyCheckout || createVerifyCheckout({ fs, gitRun: deps.gitRun });

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
      if (operation.repo_id === deps.repo && operation.state === 'running') {
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
   * Durable failure settlement with the master §5 fingerprint identity.
   *
   * @param {string} workspace
   * @param {any} operation
   * @param {string} operation_id
   * @param {{ code: string, detail?: string, interrupted?: boolean, exit_code?: number|null, signal?: string|null }} failure
   */
  async function settleFailure(workspace, operation, operation_id, failure) {
    const log_digest = operation.log_path
      ? fileSha256(operation.log_path)
      : null;
    const owner_bead = await ownerBead(operation);
    deps.store.settleRepoOperation(workspace, {
      operation_id,
      attempt_id: operation.attempt_id,
      exit_code: failure.exit_code ?? null,
      signal: failure.signal ?? null,
      log_digest,
      owner_bead,
      failure: {
        code: failure.code,
        fingerprint: failureFingerprint({
          code: failure.code,
          exit_code: failure.exit_code ?? null,
          signal: failure.signal ?? null,
          log_digest
        }),
        detail: failure.detail ?? '',
        interrupted: failure.interrupted === true
      }
    });
    transition.reclaim(workspace, operation_id);
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
            ? await deploy_worktree.verifyAligned({
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
      transition.reclaim(workspace, operation_id);
      if (operation.kind === 'verify') {
        await verify_checkout.cleanup({
          repo: deps.repo,
          path: operation.deploy_worktree
        });
      }
      return;
    }
    await settleFailure(workspace, operation, operation_id, {
      code: marker.exit_code === 124 ? 'timeout' : 'script_failed',
      exit_code: marker.exit_code,
      signal: marker.signal
    });
    if (operation.kind === 'verify') {
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
    const policy = await resolveEffectiveRepoOps({
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
   * Align, materialize, spawn, and record one already-prerecorded queued
   * operation. Every pre-spawn failure settles durably instead of leaving a
   * silent queued record. Caller holds the repo-operation lock.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {{ declaration: any, classification: string, target_sha: string }} plan
   */
  async function launchRecorded(workspace, operation_id, plan) {
    const operation =
      deps.store.snapshot(workspace).repo_operations[operation_id];
    if (!operation || operation.state !== 'queued') {
      return { ok: true, operation_id, adopted: true };
    }
    const aligned = await deploy_worktree.ensureAligned({
      repo: deps.repo,
      workspace,
      target_sha: plan.target_sha
    });
    if (!aligned.ok || typeof aligned.path !== 'string') {
      await settleFailure(workspace, operation, operation_id, {
        code: aligned.code || 'repo_ops_worktree_align_failed'
      });
      return { ok: false, code: aligned.code, operation_id };
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
        await settleFailure(workspace, operation, operation_id, {
          code: 'repo_ops_transition_materialize_failed'
        });
        return {
          ok: false,
          code: 'repo_ops_transition_materialize_failed',
          operation_id
        };
      }
      script_path = materialized.path;
    }
    const started = await runner.start({
      workspace,
      operation_id,
      attempt_id: operation.attempt_id,
      script_path,
      cwd: aligned.path,
      target_sha: plan.target_sha,
      target_base: operation.target_base,
      timeout_ms: plan.declaration.timeout_ms
    });
    if (!started.ok || !started.process_identity) {
      await settleFailure(workspace, operation, operation_id, {
        code: started.code || 'repo_operation_spawn_failed'
      });
      return { ok: false, code: started.code, operation_id };
    }
    const running = deps.store.startRepoOperation(workspace, {
      operation_id,
      attempt_id: operation.attempt_id,
      process_identity: started.process_identity,
      log_path: started.log_path,
      target_sha: plan.target_sha,
      deploy_worktree: aligned.path
    });
    if (!running.ok) {
      return {
        ok: false,
        code: 'repo_operation_start_record_failed',
        operation_id
      };
    }
    return { ok: true, operation_id };
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
    const policy = await resolveEffectiveRepoOps({
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
    if (
      existing &&
      existing.state === 'failed' &&
      existing.bootstrap_provenance === null &&
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
    const bound = await deploy_worktree.bindTarget({
      repo: deps.repo,
      base: operation.target_base,
      last_successful_sha: latestSuccessfulDeploySha(
        deps.store.snapshot(workspace),
        deps.repo,
        operation.target_base
      )
    });
    if (!bound.ok || typeof bound.target_sha !== 'string') {
      await settleFailure(workspace, operation, operation_id, {
        code: bound.code || 'repo_ops_target_unresolved'
      });
      return;
    }
    /** @type {any} */
    const policy = await resolveEffectiveRepoOps({
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
      await settleFailure(workspace, operation, operation_id, {
        code: 'repo_ops_policy_drift'
      });
      return;
    }
    await launchRecorded(workspace, operation_id, {
      declaration,
      classification: policy.classification,
      target_sha: bound.target_sha
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
          await settleFailure(workspace, operation, operation_id, {
            code: 'interrupted',
            detail: 'marker_missing',
            interrupted: true
          });
          if (operation.kind === 'verify') {
            await verify_checkout.cleanup({
              repo: deps.repo,
              path: operation.deploy_worktree
            });
          }
        }
        continue;
      }
      if (operation.state !== 'queued') continue;
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
          deps.store.startRepoOperation(workspace, {
            operation_id,
            attempt_id: operation.attempt_id,
            process_identity: launch,
            log_path: operation.log_path || ''
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
   * The same failure reproducing with no new tree/script/environment evidence
   * (§9.3): identical fingerprint AND identical evidence key on another record.
   * Such a record buys no further automatic budget and stays manual — including
   * when it opened its own chain, which is the loop this rule exists to close.
   *
   * @param {Record<string, any>} operations
   * @param {string} operation_id
   * @param {any} operation
   */
  function reproducedWithoutNewEvidence(operations, operation_id, operation) {
    const fingerprint = operation.failure?.fingerprint;
    if (typeof fingerprint !== 'string' || fingerprint.length === 0) {
      return false;
    }
    const evidence = repairEvidenceKey(operation);
    for (const [candidate_id, candidate] of Object.entries(operations)) {
      if (candidate_id === operation_id) continue;
      if (candidate.repo_id !== deps.repo) continue;
      if (candidate.failure?.fingerprint !== fingerprint) continue;
      if (repairEvidenceKey(candidate) !== evidence) continue;
      if (candidate.repair.auto_used > 0) {
        return true;
      }
    }
    return false;
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
   * @param {string} operation_id
   * @param {'auto'|'manual'} mode
   */
  async function startRepairLocked(workspace, operation_id, mode) {
    const queue = deps.store.snapshot(workspace);
    const operation = queue.repo_operations[operation_id];
    if (!operation) {
      return { ok: false, code: 'repo_operation_missing' };
    }
    if (operation.state === 'repairing') {
      return { ok: true, operation_id, adopted: true };
    }
    if (operation.state !== 'failed') {
      return { ok: false, code: 'repo_operation_not_failed' };
    }
    const chain_id = operation.repair.chain_id || operation_id;
    if (chainClosed(queue.repo_operations, chain_id)) {
      return { ok: false, code: 'repair_chain_closed' };
    }
    if (mode === 'auto') {
      // The config disable is not advisory: an automatic dispatch asked for
      // while the flag is off is REFUSED, never downgraded to a manual one.
      if (queue.auto_repair !== true) {
        return { ok: false, code: 'auto_repair_disabled' };
      }
      if (!isRepairEligible(operation)) {
        return { ok: false, code: 'repair_not_eligible' };
      }
      if (
        chainAutoUsed(queue.repo_operations, chain_id) >=
        operation.repair.auto_budget
      ) {
        return { ok: false, code: 'repair_budget_exhausted' };
      }
      if (
        reproducedWithoutNewEvidence(
          queue.repo_operations,
          operation_id,
          operation
        )
      ) {
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
    if (!owner_bead) {
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
    startRepair
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
