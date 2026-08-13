/**
 * The intentionally small RepoOperation entry point. It owns durable
 * prerecording and restart reconciliation; callers never spawn directly.
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
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, locks: ReturnType<typeof import('./locks.js').createLockManager>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, fs?: typeof import('node:fs'), runner?: ReturnType<typeof createRepoOperationRunner>, deployWorktree?: ReturnType<typeof createRepoOpsDeployWorktreeManager> }} deps
 */
export function createRepoOperationCoordinator(deps) {
  const fs = deps.fs || nodeFs;
  const runner = deps.runner || createRepoOperationRunner();
  const transition = createRepoOperationTransitionLauncher();
  const deploy_worktree =
    deps.deployWorktree ||
    createRepoOpsDeployWorktreeManager({ locks: deps.locks, run: deps.gitRun });

  /**
   * @param {unknown} value
   */
  function operationId(value) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(value))
      .digest('hex')
      .slice(0, 24);
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
   * @param {any} request
   */
  async function consumeBootstrap(request) {
    if (
      !request ||
      typeof request.repo !== 'string' ||
      typeof request.target_base !== 'string' ||
      typeof request.approved_source_path !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(request.approved_source_sha) ||
      typeof request.requested_by !== 'string'
    ) {
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    }
    const commit = await deps.gitRun(
      ['cat-file', '-e', `${request.approved_source_sha}^{commit}`],
      { cwd: request.repo }
    );
    const file = await deps.gitRun(
      [
        'cat-file',
        '-e',
        `${request.approved_source_sha}:${request.approved_source_path}`
      ],
      { cwd: request.repo }
    );
    if (commit.code !== 0 || file.code !== 0)
      return { ok: false, code: 'bootstrap_provenance_invalid' };
    const fetch = await deps.gitRun(['fetch', 'origin', request.target_base], {
      cwd: request.repo,
      timeout_ms: 30_000
    });
    const target = await deps.gitRun(
      ['rev-parse', `refs/remotes/origin/${request.target_base}^{commit}`],
      { cwd: request.repo }
    );
    if (fetch.code !== 0 || target.code !== 0) {
      return { ok: false, code: 'bootstrap_target_unresolved' };
    }
    const target_sha = target.stdout.trim().toLowerCase();
    const ensured = await ensureDeploy({
      effective_base_sha: latestSuccessfulDeploySha(
        deps.store.snapshot(deps.workspace),
        deps.repo,
        request.target_base
      ),
      target_sha,
      target_base: request.target_base,
      subjects: [{ bead_id: 'bootstrap', merged_sha: target_sha }],
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

  /**
   * @param {any} subject
   */
  async function ensureDeploy(subject) {
    /** @type {any} */
    const policy = await resolveEffectiveRepoOps({
      repo: deps.repo,
      previous_sha: subject.effective_base_sha || null,
      target_sha: subject.target_sha,
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
    if (!declaration) return { ok: true, inert: true };
    const operation_id = operationId({
      repo: deps.repo,
      kind: 'deploy',
      effective_base_sha: subject.effective_base_sha || subject.target_sha,
      target_base: declaration.base || subject.target_base,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha,
      subjects: subject.subjects
    });
    const existing = deps.store.snapshot(deps.workspace).repo_operations[
      operation_id
    ];
    if (
      existing &&
      existing.state === 'failed' &&
      existing.bootstrap_provenance === null &&
      subject.bootstrap_provenance
    ) {
      const attached = deps.store.attachRepoOperationBootstrap(deps.workspace, {
        operation_id,
        provenance: subject.bootstrap_provenance,
        attempt_id: `${operation_id}:${Date.now()}`
      });
      if (!attached.ok) {
        return { ok: false, code: 'repo_operation_bootstrap_attach_failed' };
      }
    }
    const prerecord = deps.store.ensureRepoOperation(deps.workspace, {
      operation_id,
      repo_id: deps.repo,
      kind: 'deploy',
      subjects: subject.subjects,
      effective_base_sha: subject.effective_base_sha || subject.target_sha,
      target_base: subject.target_base,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha,
      bootstrap_provenance: subject.bootstrap_provenance || null
    });
    if (!prerecord.ok)
      return { ok: false, code: 'repo_operation_prerecord_failed' };
    const operation = prerecord.queue.repo_operations[operation_id];
    if (operation.state !== 'queued')
      return { ok: true, operation_id, adopted: true };
    const checkout = await deploy_worktree.ensure({
      repo: deps.repo,
      workspace: deps.workspace,
      base: subject.target_base,
      last_successful_sha: latestSuccessfulDeploySha(
        deps.store.snapshot(deps.workspace),
        deps.repo,
        subject.target_base
      )
    });
    if (!checkout.ok) return checkout;
    /** @type {any} */
    const ready_checkout = checkout;
    let script_path = path.join(ready_checkout.path, declaration.script);
    if (policy.classification === 'transition') {
      const materialized = await transition.materialize({
        workspace: deps.workspace,
        repo: deps.repo,
        operation_id,
        base_sha: subject.effective_base_sha,
        script: declaration.script,
        mode: declaration.mode,
        gitRun: deps.gitRun
      });
      if (!materialized.ok) return materialized;
      script_path = /** @type {any} */ (materialized).path;
    }
    /** @type {any} */
    const started = runner.start({
      workspace: deps.workspace,
      operation_id,
      attempt_id: operation.attempt_id,
      script_path,
      cwd: ready_checkout.path,
      target_sha: ready_checkout.target_sha,
      target_base: subject.target_base,
      timeout_ms: declaration.timeout_ms
    });
    if (!started.ok) return started;
    const running = deps.store.startRepoOperation(deps.workspace, {
      operation_id,
      attempt_id: operation.attempt_id,
      process_identity: started.process_identity,
      log_path: started.log_path,
      target_sha: ready_checkout.target_sha,
      deploy_worktree: ready_checkout.path
    });
    return running.ok
      ? { ok: true, operation_id }
      : { ok: false, code: 'repo_operation_start_record_failed' };
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
   * @param {string} workspace
   */
  async function reconcile(workspace) {
    const queue = deps.store.snapshot(workspace);
    for (const [operation_id, operation] of Object.entries(
      queue.repo_operations
    )) {
      if (operation.state !== 'running') continue;
      const marker = runner.readMarker(
        workspace,
        operation_id,
        operation.attempt_id
      );
      if (marker) {
        const owner_bead = await ownerBead(operation);
        deps.store.settleRepoOperation(workspace, {
          operation_id,
          attempt_id: operation.attempt_id,
          exit_code: marker.exit_code,
          signal: marker.signal,
          owner_bead
        });
        transition.reclaim(workspace, operation_id);
        continue;
      }
      const state = operation.process_identity
        ? runner.processController.probe(operation.process_identity)
        : { state: 'gone' };
      if (state.state === 'gone' || state.state === 'recycled') {
        const owner_bead = await ownerBead(operation);
        deps.store.settleRepoOperation(workspace, {
          operation_id,
          attempt_id: operation.attempt_id,
          exit_code: null,
          signal: null,
          owner_bead,
          failure: {
            code: 'interrupted',
            fingerprint: '',
            detail: 'marker_missing',
            interrupted: true
          }
        });
        transition.reclaim(workspace, operation_id);
      }
    }
    const pending = repoOpsSpoolPendingDir(workspace);
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

  return { ensureDeploy, observe, reconcile };
}
