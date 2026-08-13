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
import path from 'node:path';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { createRepoOperationTransitionLauncher } from './repo-operation-transition.js';
import { resolveEffectiveRepoOps } from './repo-ops-resolver.js';
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
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, locks: ReturnType<typeof import('./locks.js').createLockManager>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, fs?: typeof import('node:fs'), runner?: ReturnType<typeof createRepoOperationRunner>, deployWorktree?: ReturnType<typeof createRepoOpsDeployWorktreeManager>, transition?: ReturnType<typeof createRepoOperationTransitionLauncher> }} deps
 */
export function createRepoOperationCoordinator(deps) {
  const fs = deps.fs || nodeFs;
  const runner = deps.runner || createRepoOperationRunner();
  const transition = deps.transition || createRepoOperationTransitionLauncher();
  const deploy_worktree =
    deps.deployWorktree ||
    createRepoOpsDeployWorktreeManager({ locks: deps.locks, run: deps.gitRun });

  /**
   * Deploy operation identity per master spec §5: repo, kind, base, and the
   * pinned effective policy — never the subject set, so uncovered subjects
   * coalesce into the queued operation instead of forking a twin.
   *
   * @param {{ effective_base_sha: string, target_base: string, script_mode: string, script_blob_sha: string }} input
   */
  function operationId(input) {
    return crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          repo: deps.repo,
          kind: 'deploy',
          target_base: input.target_base,
          effective_base_sha: input.effective_base_sha,
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
   * @param {any} operation
   */
  async function ownerBead(operation) {
    if (operation.subjects.length < 2) {
      return undefined;
    }
    /** @type {{ bead_id: string, timestamp: number }[]} */
    const candidates = [];
    for (const subject of operation.subjects) {
      const result = await deps.gitRun(
        ['log', '-1', '--format=%ct', subject.merged_sha],
        { cwd: deps.repo }
      );
      const timestamp = Number.parseInt(result.stdout.trim(), 10);
      candidates.push({
        bead_id: subject.bead_id,
        timestamp: Number.isFinite(timestamp) ? timestamp : -1
      });
    }
    candidates.sort(
      (left, right) =>
        right.timestamp - left.timestamp ||
        left.bead_id.localeCompare(right.bead_id)
    );
    return candidates[0]?.bead_id;
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
        typeof operation.target_sha === 'string'
          ? await deploy_worktree.verifyAligned({
              repo: deps.repo,
              target_sha: operation.target_sha
            })
          : { ok: false };
      if (!aligned.ok) {
        await settleFailure(workspace, operation, operation_id, {
          code: 'deploy_worktree_residue',
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
      return;
    }
    await settleFailure(workspace, operation, operation_id, {
      code: marker.exit_code === 124 ? 'timeout' : 'script_failed',
      exit_code: marker.exit_code,
      signal: marker.signal
    });
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

  return { ensureDeploy, observe, reconcile };
}
