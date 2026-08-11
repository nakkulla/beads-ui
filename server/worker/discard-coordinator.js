/**
 * Restart-safe unified Worker discard orchestration.
 *
 * The queue operation is the authority. Every external side effect is followed
 * by an authoritative readback before the next phase is persisted, so startup
 * recovery can repeat observations without repeating completed mutations.
 */
import { resolvePrRef } from './pr-poller.js';
import { archiveDiscardSource } from './recovery-archive.js';

const DISCARDABLE_ATTEMPT_STATUSES = new Set([
  'running',
  'paused',
  'failed',
  'orphaned',
  'done'
]);

/**
 * @param {{ workspace: string, repo: string, store: any, gh: any, bd: any, worktree: any, gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, scheduler: any, archive: any, processController: any, sessionLog: any, external?: { get: (workspace: string, bead_id: string) => any }, actionInFlight?: (bead_id: string) => boolean, makeOperationId?: () => string, now?: () => number, notifyChanged?: (workspace: string) => void }} deps
 */
export function createDiscardCoordinator(deps) {
  const now = deps.now || (() => Date.now());
  const makeOperationId =
    deps.makeOperationId ||
    (() => `discard-${now()}-${Math.random().toString(16).slice(2, 10)}`);
  const notifyChanged = deps.notifyChanged || (() => {});
  /** @type {Map<string, Promise<any>>} */
  const driving = new Map();

  /**
   * @param {string} operation_id
   */
  function operationOf(operation_id) {
    return deps.store.snapshot(deps.workspace).discard_operations?.[
      operation_id
    ];
  }

  /**
   * @param {any} operation
   * @param {string} reason
   */
  function fail(operation, reason) {
    deps.store.failDiscardOperation(deps.workspace, {
      operation_id: operation.operation_id,
      expected_phase: operation.phase,
      reason
    });
    notifyChanged(deps.workspace);
    return {
      ok: false,
      operation_id: operation.operation_id,
      phase: operation.phase,
      reason
    };
  }

  /**
   * @param {any} operation
   * @param {string} next_phase
   * @param {any} [patch]
   */
  function advance(operation, next_phase, patch = {}) {
    const result = deps.store.advanceDiscardOperation(deps.workspace, {
      operation_id: operation.operation_id,
      expected_phase: operation.phase,
      next_phase,
      patch
    });
    if (!result.ok) {
      return null;
    }
    notifyChanged(deps.workspace);
    return result.queue.discard_operations[operation.operation_id];
  }

  /**
   * @param {string} repo
   * @param {string} branch
   */
  async function localRef(repo, branch) {
    const result = await deps.gitRun(
      ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`],
      { cwd: repo }
    );
    if (result.code === 0) {
      const sha = result.stdout.trim();
      return sha.length > 0
        ? { ok: true, sha }
        : { ok: false, reason: 'local_ref_bad_output' };
    }
    return result.code === 1
      ? { ok: true, sha: null }
      : { ok: false, reason: 'local_ref_observe_failed' };
  }

  /**
   * @param {string} repo
   * @param {string} branch
   */
  async function remoteRef(repo, branch) {
    const result = await deps.gitRun(
      ['ls-remote', '--heads', 'origin', branch],
      { cwd: repo }
    );
    if (result.code !== 0) {
      return { ok: false, reason: 'remote_ref_observe_failed' };
    }
    const line = result.stdout.trim();
    if (line.length === 0) {
      return { ok: true, sha: null };
    }
    const sha = line.split(/\s+/)[0];
    return /^[0-9a-f]{40}$/i.test(sha)
      ? { ok: true, sha }
      : { ok: false, reason: 'remote_ref_bad_output' };
  }

  /**
   * @param {string} bead_id
   * @param {string|null} attempt_id
   * @returns {Promise<{ ok: true, attempt: any, source_snapshot: Record<string, unknown> }|{ ok: false, reason: string }>}
   */
  async function captureSource(bead_id, attempt_id) {
    const queue = deps.store.snapshot(deps.workspace);
    const attempts = Object.values(queue.attempts || {}).filter(
      (attempt) => /** @type {any} */ (attempt)?.bead_id === bead_id
    );
    const attempt = attempt_id
      ? attempts.find(
          (candidate) =>
            /** @type {any} */ (candidate).attempt_id === attempt_id
        )
      : attempts.at(-1);
    if (!attempt) {
      return { ok: false, reason: 'attempt_not_found' };
    }
    const record = /** @type {any} */ (attempt);
    if (!DISCARDABLE_ATTEMPT_STATUSES.has(record.status)) {
      return { ok: false, reason: 'attempt_not_discardable' };
    }
    if (
      Object.values(queue.attempts || {}).some(
        (candidate) =>
          /** @type {any} */ (candidate).resumed_from === record.attempt_id
      )
    ) {
      return { ok: false, reason: 'attempt_not_leaf' };
    }
    if (attempt_id && attempts.at(-1) !== attempt) {
      return { ok: false, reason: 'attempt_not_latest' };
    }
    const process_identity =
      record.process_identity &&
      Number.isInteger(record.process_identity.pid) &&
      Number.isInteger(record.process_identity.pgid) &&
      Number.isFinite(record.process_identity.started_at)
        ? record.process_identity
        : Number.isInteger(record.pid) && Number.isFinite(record.started_at)
          ? {
              pid: record.pid,
              pgid: record.pid,
              started_at: record.started_at
            }
          : null;
    if (
      process_identity === null &&
      (record.status === 'running' ||
        record.control?.phase === 'requested' ||
        record.control?.phase === 'signaled')
    ) {
      return { ok: false, reason: 'identity_unknown' };
    }
    const repo =
      typeof record.repo === 'string' && record.repo.length > 0
        ? record.repo
        : deps.repo;
    const topology = await deps.worktree.observeOwnedByBead({
      repo,
      bead_id
    });
    if (!topology.ok) {
      return {
        ok: false,
        reason: topology.reason || 'worktree_observe_failed'
      };
    }
    if (!topology.present) {
      return { ok: false, reason: 'worktree_missing' };
    }
    const local = await localRef(repo, topology.branch);
    if (!local.ok || local.sha === null) {
      return {
        ok: false,
        reason: local.reason || 'local_ref_missing'
      };
    }
    if (topology.head_sha !== local.sha) {
      return { ok: false, reason: 'source_ref_mismatch' };
    }
    const remote = await remoteRef(repo, topology.branch);
    if (!remote.ok) {
      return {
        ok: false,
        reason: remote.reason || 'remote_ref_observe_failed'
      };
    }
    const ref = resolvePrRef(queue, bead_id);
    let pr = null;
    if (ref) {
      const observed = await deps.gh.prDetail(repo, ref.number);
      if (observed.state !== 'ok') {
        return {
          ok: false,
          reason: `pr_state_unknown:${observed.reason || 'gh_empty'}`
        };
      }
      pr = observed.data;
    }
    let bead_status;
    let bead_pr_url;
    try {
      bead_status = await deps.bd.readStatus(bead_id);
      bead_pr_url = await deps.bd.readMetadata(bead_id, 'pr_url');
    } catch {
      return { ok: false, reason: 'bd_snapshot_failed' };
    }
    return {
      ok: true,
      attempt: { ...record, process_identity },
      source_snapshot: {
        repo,
        workspace: deps.workspace,
        worktree: topology.path,
        branch: topology.branch,
        target_base: record.target_base,
        base_oid: record.base_oid,
        source_head: topology.head_sha || local.sha,
        attempt_status: record.status,
        attempt_head: record.head_oid,
        session_id: record.session_id,
        process_identity,
        local_branch_sha: local.sha,
        remote_branch_sha: remote.sha,
        pr,
        bead_status,
        bead_pr_url,
        membership: {
          queue: queue.queue.some(
            (/** @type {any} */ entry) => entry.bead_id === bead_id
          ),
          pr_wait: queue.pr_wait.some(
            (/** @type {any} */ entry) => entry.bead_id === bead_id
          ),
          cleanup_failed: Object.hasOwn(queue.cleanup_failed, bead_id),
          merge_queue: queue.merge_queue.some(
            (/** @type {any} */ entry) => entry.bead_id === bead_id
          )
        }
      }
    };
  }

  /**
   * @param {any} operation
   */
  async function archive(operation) {
    const source = operation.source_snapshot;
    deps.scheduler.fenceDiscardAttempt?.(operation.attempt_id);
    if (operation.process_identity && !deps.processController) {
      return fail(operation, 'process_controller_missing');
    }
    return archiveDiscardSource({
      workspace: deps.workspace,
      operation,
      store: deps.store,
      processController: deps.processController,
      withTopologyLock: (work) =>
        deps.worktree.withTopologyLock(source.repo, async () => work()),
      createArchive: () =>
        deps.archive.create({
          workspace: deps.workspace,
          operation_id: operation.operation_id,
          repo: source.repo,
          worktree: source.worktree,
          target_base: source.base_oid || source.target_base,
          source_head: source.source_head,
          source_snapshot: source,
          session_log_path: operation.attempt_id
            ? deps.sessionLog.pathFor(deps.workspace, operation.attempt_id)
            : null
        })
    });
  }

  /**
   * @param {any} operation
   */
  async function terminateRunner(operation) {
    const identity = operation.process_identity;
    if (identity) {
      if (!deps.processController) {
        return { ok: false, reason: 'process_controller_missing' };
      }
      const observed = deps.processController.probe(identity);
      if (observed.state === 'unknown') {
        return { ok: false, reason: observed.reason || 'identity_unknown' };
      }
      if (observed.state === 'owned') {
        const term = deps.processController.signal(identity, 'SIGTERM');
        if (!term.ok) {
          return {
            ok: false,
            reason: term.reason || `identity_${term.state}`
          };
        }
        const continued = deps.processController.signal(identity, 'SIGCONT');
        if (!continued.ok && continued.state !== 'gone') {
          return {
            ok: false,
            reason: continued.reason || `identity_${continued.state}`
          };
        }
        const terminated = await deps.processController.terminate(identity);
        if (!terminated.ok && terminated.state !== 'recycled') {
          return {
            ok: false,
            reason: terminated.reason || `identity_${terminated.state}`
          };
        }
      }
    }
    if (operation.attempt_id) {
      const settled = await deps.scheduler.finalizeDiscardAttempt(
        deps.workspace,
        operation.attempt_id
      );
      if (!settled.ok) {
        return { ok: false, reason: settled.reason || 'attempt_settle_failed' };
      }
    }
    return { ok: true };
  }

  /**
   * @param {any} operation
   */
  async function observeAndClosePr(operation) {
    const number = operation.source_snapshot.pr?.number;
    if (!Number.isFinite(number)) {
      return advance(operation, 'pr_closed', { mode: 'unmerged' });
    }
    let observed = await deps.gh.prDetail(
      operation.source_snapshot.repo,
      number
    );
    if (observed.state !== 'ok') {
      return fail(
        operation,
        `pr_state_unknown:${observed.reason || 'gh_empty'}`
      );
    }
    if (observed.data.state === 'MERGED') {
      return advance(operation, 'merged_revert', {
        mode: 'merged_revert',
        original_pr: observed.data
      });
    }
    if (observed.data.state === 'OPEN') {
      const closed = await deps.gh.closePr(
        operation.source_snapshot.repo,
        number
      );
      observed = await deps.gh.prDetail(operation.source_snapshot.repo, number);
      if (observed.state !== 'ok') {
        return fail(
          operation,
          `pr_close_readback_failed:${observed.reason || 'gh_empty'}`
        );
      }
      if (observed.data.state === 'MERGED') {
        return advance(operation, 'merged_revert', {
          mode: 'merged_revert',
          original_pr: observed.data
        });
      }
      if (observed.data.state !== 'CLOSED') {
        return fail(
          operation,
          `pr_close_failed:${closed.reason || 'unconfirmed'}`
        );
      }
    }
    if (observed.data.state !== 'CLOSED') {
      return fail(operation, `pr_state_invalid:${observed.data.state}`);
    }
    return advance(operation, 'pr_closed', {
      mode: 'unmerged',
      original_pr: observed.data,
      receipts: { pr_closed: { number, at: now() } }
    });
  }

  /**
   * @param {any} operation
   */
  async function removeWorktree(operation) {
    const source = operation.source_snapshot;
    const result = await deps.worktree.removeByBranch({
      repo: source.repo,
      branch: source.branch,
      expected_path: source.worktree,
      expected_head: source.source_head
    });
    if (!result.ok) {
      if (result.reason === 'identity_changed') {
        return fail(operation, 'worktree_identity_changed');
      }
      return fail(
        operation,
        `worktree_remove_failed:${result.reason || 'unknown'}`
      );
    }
    return advance(operation, 'worktree_removed', {
      receipts: { worktree_removed: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   */
  async function removeLocalRef(operation) {
    const { repo, branch } = operation.source_snapshot;
    const result = await deps.worktree.withTopologyLock(repo, async () => {
      const before = await localRef(repo, branch);
      if (!before.ok) {
        return before;
      }
      const before_sha =
        typeof before.sha === 'string' ? before.sha : null;
      if (
        before_sha !== null &&
        before_sha !== operation.source_snapshot.local_branch_sha
      ) {
        return { ok: false, reason: 'local_ref_changed' };
      }
      if (before_sha !== null) {
        const deleted = await deps.gitRun(
          ['update-ref', '-d', `refs/heads/${branch}`, before_sha],
          { cwd: repo }
        );
        if (deleted.code !== 0) {
          return { ok: false, reason: 'local_ref_delete_failed' };
        }
      }
      const after = await localRef(repo, branch);
      return after.ok && after.sha === null
        ? { ok: true }
        : { ok: false, reason: 'local_ref_delete_failed' };
    });
    if (!result.ok) {
      return fail(operation, result.reason || 'local_ref_delete_failed');
    }
    return advance(operation, 'local_ref_removed', {
      receipts: { local_ref_removed: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   */
  async function removeRemoteRef(operation) {
    const { repo, branch } = operation.source_snapshot;
    const result = await deps.worktree.withTopologyLock(repo, async () => {
      const before = await remoteRef(repo, branch);
      if (!before.ok) {
        return before;
      }
      if (
        before.sha !== null &&
        before.sha !== operation.source_snapshot.remote_branch_sha
      ) {
        return { ok: false, reason: 'remote_ref_changed' };
      }
      if (before.sha !== null) {
        const deleted = await deps.gitRun(
          [
            'push',
            `--force-with-lease=refs/heads/${branch}:${before.sha}`,
            'origin',
            `:refs/heads/${branch}`
          ],
          { cwd: repo }
        );
        if (deleted.code !== 0) {
          return { ok: false, reason: 'remote_ref_delete_failed' };
        }
      }
      const after = await remoteRef(repo, branch);
      return after.ok && after.sha === null
        ? { ok: true }
        : {
            ok: false,
            reason: after.reason || 'remote_ref_delete_failed'
          };
    });
    if (!result.ok) {
      return fail(operation, result.reason || 'remote_ref_delete_failed');
    }
    return advance(operation, 'remote_ref_removed', {
      receipts: { remote_ref_removed: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   */
  async function reopenBead(operation) {
    try {
      if ((await deps.bd.readStatus(operation.bead_id)) !== 'open') {
        await deps.bd.setStatus(operation.bead_id, 'open');
      }
      if ((await deps.bd.readStatus(operation.bead_id)) !== 'open') {
        return fail(operation, 'bd_status_readback_failed');
      }
    } catch {
      return fail(operation, 'bd_status_write_failed');
    }
    return advance(operation, 'bead_opened', {
      receipts: { bead_opened: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   */
  async function clearPrUrl(operation) {
    try {
      if ((await deps.bd.readMetadata(operation.bead_id, 'pr_url')) !== null) {
        await deps.bd.unsetMetadata(operation.bead_id, 'pr_url');
      }
      if ((await deps.bd.readMetadata(operation.bead_id, 'pr_url')) !== null) {
        return fail(operation, 'bd_pr_url_readback_failed');
      }
    } catch {
      return fail(operation, 'bd_pr_url_write_failed');
    }
    return advance(operation, 'bead_pr_url_cleared', {
      receipts: { bead_pr_url_cleared: { at: now() } }
    });
  }

  /**
   * @param {string} operation_id
   */
  async function driveOperation(operation_id) {
    for (let count = 0; count < 20; count += 1) {
      const operation = operationOf(operation_id);
      if (!operation) {
        return { ok: false, reason: 'operation_not_found' };
      }
      if (operation.last_error) {
        return {
          ok: false,
          operation_id,
          phase: operation.phase,
          reason: operation.last_error
        };
      }
      if (operation.phase === 'done') {
        return { ok: true, operation_id };
      }
      if (operation.phase === 'merged_revert') {
        return { ok: true, operation_id, pending: 'merged_revert' };
      }
      if (operation.phase === 'requested') {
        const result = await archive(operation);
        if (!result.ok) {
          return {
            ok: false,
            operation_id,
            phase: operation.phase,
            reason: result.reason
          };
        }
        continue;
      }
      if (operation.phase === 'backup_verified') {
        const result = await terminateRunner(operation);
        if (!result.ok) {
          return fail(operation, result.reason);
        }
        if (!advance(operation, 'runner_terminated')) {
          return fail(operation, 'runner_phase_persist_failed');
        }
        continue;
      }
      if (operation.phase === 'runner_terminated') {
        const next = await observeAndClosePr(operation);
        if (!next || next.ok === false) {
          return next || fail(operation, 'pr_phase_persist_failed');
        }
        continue;
      }
      /** @type {Record<string, (operation: any) => Promise<any>>} */
      const handlers = {
        pr_closed: removeWorktree,
        worktree_removed: removeLocalRef,
        local_ref_removed: removeRemoteRef,
        remote_ref_removed: reopenBead,
        bead_opened: clearPrUrl
      };
      if (operation.phase === 'bead_pr_url_cleared') {
        const completed = deps.store.completeDiscardOperation(deps.workspace, {
          operation_id,
          expected_phase: operation.phase
        });
        if (!completed.ok) {
          return fail(operation, 'discard_finalize_failed');
        }
        notifyChanged(deps.workspace);
        await deps.scheduler.tick(deps.workspace);
        continue;
      }
      const handler = handlers[operation.phase];
      if (!handler) {
        return fail(operation, 'phase_unknown');
      }
      const next = await handler(operation);
      if (!next || next.ok === false) {
        return next || fail(operation, 'phase_persist_failed');
      }
    }
    return { ok: false, operation_id, reason: 'phase_limit' };
  }

  /**
   * Serialize every wake-up for one operation inside this server process.
   *
   * @param {string} operation_id
   */
  function drive(operation_id) {
    const active = driving.get(operation_id);
    if (active) {
      return active;
    }
    const running = driveOperation(operation_id)
      .catch(() => {
        const operation = operationOf(operation_id);
        return operation
          ? fail(operation, 'discard_driver_error')
          : { ok: false, operation_id, reason: 'operation_not_found' };
      })
      .finally(() => {
        if (driving.get(operation_id) === running) {
          driving.delete(operation_id);
        }
      });
    driving.set(operation_id, running);
    return running;
  }

  /**
   * @param {{ bead_id: string, attempt_id?: string|null, expected_revision: number }} input
   */
  async function discard(input) {
    const snapshot = deps.store.snapshot(deps.workspace);
    const existing = Object.values(snapshot.discard_operations || {}).find(
      (operation) =>
        /** @type {any} */ (operation).bead_id === input.bead_id &&
        /** @type {any} */ (operation).phase !== 'done'
    );
    if (existing) {
      return {
        ok: true,
        reused: true,
        operation_id: /** @type {any} */ (existing).operation_id,
        phase: /** @type {any} */ (existing).phase
      };
    }
    if (snapshot.revision !== input.expected_revision) {
      return { ok: false, conflict: true, reason: 'revision_conflict' };
    }
    if (deps.actionInFlight?.(input.bead_id)) {
      return { ok: false, conflict: false, reason: 'action_in_flight' };
    }
    let captured;
    try {
      captured = await captureSource(input.bead_id, input.attempt_id || null);
    } catch {
      return { ok: false, conflict: false, reason: 'source_observe_failed' };
    }
    if (!captured.ok) {
      return { ok: false, conflict: false, reason: captured.reason };
    }
    // `captureSource` spans git/GitHub/Beads awaits. Recheck immediately before
    // the synchronous queue CAS so a merge/cleanup that started in that window
    // wins cleanly instead of racing destructive discard phases.
    if (deps.actionInFlight?.(input.bead_id)) {
      return { ok: false, conflict: false, reason: 'action_in_flight' };
    }
    if (
      deps.scheduler.canDiscardAttempt?.(captured.attempt.attempt_id) === false
    ) {
      return { ok: false, conflict: false, reason: 'attempt_settling' };
    }
    const operation_id = makeOperationId();
    const created = deps.store.createDiscardOperation(deps.workspace, {
      expected_revision: input.expected_revision,
      operation: {
        operation_id,
        bead_id: input.bead_id,
        attempt_id: captured.attempt.attempt_id,
        process_identity: captured.attempt.process_identity,
        source_snapshot: captured.source_snapshot
      }
    });
    if (!created.ok) {
      const concurrent = Object.values(
        deps.store.snapshot(deps.workspace).discard_operations || {}
      ).find(
        (operation) =>
          /** @type {any} */ (operation).bead_id === input.bead_id &&
          /** @type {any} */ (operation).phase !== 'done'
      );
      if (concurrent) {
        return {
          ok: true,
          reused: true,
          operation_id: /** @type {any} */ (concurrent).operation_id,
          phase: /** @type {any} */ (concurrent).phase
        };
      }
      return {
        ok: false,
        conflict: created.conflict,
        reason: created.reason || 'operation_create_failed'
      };
    }
    if (
      typeof captured.attempt.attempt_id === 'string' &&
      !deps.scheduler.fenceDiscardAttempt?.(captured.attempt.attempt_id)
    ) {
      deps.store.failDiscardOperation(deps.workspace, {
        operation_id,
        expected_phase: 'requested',
        reason: 'attempt_settling'
      });
      notifyChanged(deps.workspace);
      return {
        ok: false,
        operation_id,
        phase: 'requested',
        reason: 'attempt_settling'
      };
    }
    notifyChanged(deps.workspace);
    return drive(operation_id);
  }

  async function recover() {
    const operations = Object.values(
      deps.store.snapshot(deps.workspace).discard_operations || {}
    );
    for (const operation of operations) {
      const record = /** @type {any} */ (operation);
      if (record.phase !== 'done' && !record.last_error) {
        await drive(record.operation_id);
      }
    }
  }

  /** Rebuild scheduler-local exit fences before any other startup recovery. */
  function recoverFences() {
    const operations = Object.values(
      deps.store.snapshot(deps.workspace).discard_operations || {}
    );
    for (const operation of operations) {
      const record = /** @type {any} */ (operation);
      if (record.phase !== 'done') {
        deps.scheduler.fenceDiscardAttempt?.(record.attempt_id);
      }
    }
  }

  /**
   * Treat a poller observation only as a wake-up; the phase driver performs
   * its own authoritative PR read before any mutation.
   *
   * @param {string} bead_id
   */
  async function observeBead(bead_id) {
    const operation = Object.values(
      deps.store.snapshot(deps.workspace).discard_operations || {}
    ).find(
      (candidate) =>
        /** @type {any} */ (candidate).bead_id === bead_id &&
        /** @type {any} */ (candidate).phase !== 'done'
    );
    return operation
      ? drive(/** @type {any} */ (operation).operation_id)
      : { ok: false, reason: 'operation_not_found' };
  }

  /**
   * @param {string} operation_id
   */
  async function retry(operation_id) {
    const operation = operationOf(operation_id);
    if (!operation || operation.phase === 'done') {
      return { ok: false, reason: 'operation_not_retryable' };
    }
    if (operation.last_error) {
      const cleared = deps.store.advanceDiscardOperation(deps.workspace, {
        operation_id,
        expected_phase: operation.phase,
        next_phase: operation.phase
      });
      if (!cleared.ok) {
        return { ok: false, reason: 'retry_persist_failed' };
      }
    }
    return drive(operation_id);
  }

  return { discard, recoverFences, recover, retry, drive, observeBead };
}
