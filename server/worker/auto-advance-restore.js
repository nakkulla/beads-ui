/**
 * Process-wide, fail-closed restoration of pre-restart auto-advance state after
 * one verified self-deploy chain reaches terminal success.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createUnhandledFailurePredicate } from './attempt-failure.js';

const RESTART_MARKER_NAME = '.repo-ops-deploy.restart.json';

/**
 * @typedef {Object} RestoreRegistration
 * @property {string} workspace
 * @property {string} repo
 * @property {ReturnType<typeof import('./queue-store.js').createQueueStore>} store
 * @property {ReturnType<typeof import('./locks.js').createLockManager>} locks
 * @property {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} gitRun
 * @property {{ judge: (input: { workspace: string, operation_id: string }) => Promise<{ verdict: string, evidence: string|null }> }} repairSession
 * @property {(workspace: string) => void} notifyChanged
 * @property {(workspace: string) => Promise<void>} tick
 */

/**
 * @param {{ runtime_identity: { source_repo?: unknown, source_sha?: unknown, process_started_at?: unknown, instance_id?: unknown }|null }} deps
 */
export function createAutoAdvanceRestoreController(deps) {
  /** @type {Map<string, RestoreRegistration>} */
  const registrations = new Map();
  /** @type {Map<string, Set<string>>} */
  const candidate_ids = new Map();
  let triggered = false;

  /**
   * @param {RestoreRegistration} registration
   */
  function register(registration) {
    registrations.set(registration.workspace, registration);
  }

  /**
   * Freeze boot-time deploy candidates before the first coordinator mutation.
   *
   * @param {string} workspace
   */
  function beforeReconcile(workspace) {
    if (candidate_ids.has(workspace)) {
      return;
    }
    /** @type {Set<string>} */
    const candidates = new Set();
    try {
      const registration = registrations.get(workspace);
      const operations =
        registration?.store.snapshot(workspace).repo_operations;
      for (const [operation_id, operation] of Object.entries(
        operations || {}
      )) {
        if (
          operation.kind === 'deploy' &&
          operation.state !== 'succeeded' &&
          operation.state !== 'failed'
        ) {
          candidates.add(operation_id);
        }
      }
    } catch {
      // An unreadable first snapshot cannot safely admit candidates later.
    }
    candidate_ids.set(workspace, candidates);
  }

  /**
   * @param {RestoreRegistration} registration
   * @param {string} repo
   */
  async function rootCommit(registration, repo) {
    const result = await registration.gitRun(
      ['rev-list', '--max-parents=0', 'HEAD'],
      { cwd: repo }
    );
    if (result.code !== 0) {
      return null;
    }
    const first = String(result.stdout || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0);
    return first && /^[0-9a-f]{40}$/i.test(first) ? first.toLowerCase() : null;
  }

  /**
   * @param {RestoreRegistration} registration
   */
  async function sameRepository(registration) {
    const source_repo = deps.runtime_identity?.source_repo;
    if (typeof source_repo !== 'string') {
      return false;
    }
    const workspace_root = await rootCommit(registration, registration.repo);
    const source_root = await rootCommit(registration, source_repo);
    return workspace_root !== null && workspace_root === source_root;
  }

  /**
   * @param {RestoreRegistration} registration
   * @param {string} operation_id
   * @param {any} operation
   */
  async function terminalSuccess(registration, operation_id, operation) {
    // Direct success has no chain_id; late descendant success stays owned by judge().
    if (operation.state === 'succeeded') {
      return true;
    }
    const judged = await registration.repairSession.judge({
      workspace: registration.workspace,
      operation_id
    });
    return judged.verdict === 'chain_closed';
  }

  /**
   * The directory the deploy script writes its restart marker under: the parent
   * of the common git directory, so a linked-worktree registration resolves the
   * same owner root the script did.
   *
   * @param {RestoreRegistration} registration
   */
  async function ownerRoot(registration) {
    const result = await registration.gitRun(
      ['rev-parse', '--path-format=absolute', '--git-common-dir'],
      { cwd: registration.repo }
    );
    if (result.code !== 0) {
      return null;
    }
    const first = String(result.stdout || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0);
    return first ? path.dirname(first) : null;
  }

  /**
   * Judge the restart marker a deploy script left behind, including one a
   * session owned and the Worker never recorded.
   *
   * The instance binding is what replaces a consume ledger: a marker names the
   * exact runtime its health readback certified, so no later manual restart or
   * crash reboot can ever match it, not even at the same SHA.
   *
   * @param {RestoreRegistration} registration
   */
  async function markerCertifiesThisRuntime(registration) {
    const identity = deps.runtime_identity;
    if (
      !identity ||
      typeof identity.source_sha !== 'string' ||
      typeof identity.instance_id !== 'string'
    ) {
      return false;
    }
    let marker = null;
    try {
      const owner_root = await ownerRoot(registration);
      if (owner_root === null) {
        return false;
      }
      marker = JSON.parse(
        fs.readFileSync(
          path.join(owner_root, '.worktrees', RESTART_MARKER_NAME),
          'utf8'
        )
      );
    } catch {
      // An absent, unreadable or unparsable marker is not evidence.
      return false;
    }
    if (
      !marker ||
      typeof marker !== 'object' ||
      marker.schema !== 1 ||
      marker.result !== 'ok' ||
      marker.target_sha !== identity.source_sha.toLowerCase() ||
      typeof marker.instance_id !== 'string' ||
      marker.instance_id !== identity.instance_id
    ) {
      return false;
    }
    return await sameRepository(registration);
  }

  /**
   * Re-evaluate frozen candidates after one locked coordinator pass.
   *
   * @param {string} workspace
   */
  async function afterReconcileLocked(workspace) {
    if (triggered) {
      return true;
    }
    beforeReconcile(workspace);
    const registration = registrations.get(workspace);
    const identity = deps.runtime_identity;
    if (
      !registration ||
      !identity ||
      typeof identity.source_sha !== 'string' ||
      typeof identity.process_started_at !== 'number' ||
      !Number.isFinite(identity.process_started_at)
    ) {
      return false;
    }
    const candidates = candidate_ids.get(workspace) || new Set();
    for (const operation_id of candidates) {
      try {
        const operation =
          registration.store.snapshot(workspace).repo_operations[operation_id];
        if (
          !operation ||
          operation.target_sha !== identity.source_sha.toLowerCase() ||
          typeof operation.started_at !== 'number' ||
          !Number.isFinite(operation.started_at) ||
          operation.started_at >= identity.process_started_at ||
          !(await sameRepository(registration)) ||
          !(await terminalSuccess(registration, operation_id, operation))
        ) {
          continue;
        }
        triggered = true;
        return true;
      } catch {
        // Judgment errors stay OFF and are retried by a later pass.
      }
    }
    try {
      if (await markerCertifiesThisRuntime(registration)) {
        triggered = true;
        return true;
      }
    } catch {
      // A marker judgment error stays OFF and is retried by a later pass.
    }
    return false;
  }

  /**
   * Restore every eligible registered workspace, then hand it to subscribers
   * and the scheduler only after releasing its repo-operation lock.
   */
  async function restoreAll() {
    if (!triggered) {
      return;
    }
    for (const registration of registrations.values()) {
      let release = null;
      let restored = false;
      try {
        release = await registration.locks.repoOperationLock(registration.repo);
        const queue = registration.store.snapshot(registration.workspace);
        const isUnhandledFailure = createUnhandledFailurePredicate(queue);
        const has_unhandled_failure = Object.values(queue.attempts || {}).some(
          (attempt) =>
            (attempt.status === 'failed' || attempt.status === 'orphaned') &&
            isUnhandledFailure(attempt)
        );
        if (
          !registration.store.autoAdvanceAtShutdown(registration.workspace) ||
          queue.auto_advance !== false ||
          has_unhandled_failure
        ) {
          continue;
        }
        const result = registration.store.setAutoAdvance(
          registration.workspace,
          true
        );
        if (!result.ok) {
          continue;
        }
        restored = true;
        registration.store.consumeAutoAdvanceAtShutdown(registration.workspace);
      } catch {
        // Per-workspace judgment failure leaves its current OFF state unchanged.
      } finally {
        release?.();
      }
      if (!restored) {
        continue;
      }
      try {
        registration.notifyChanged(registration.workspace);
      } catch {
        // Durable state is authoritative; another queue event can refresh UI.
      }
      try {
        await registration.tick(registration.workspace);
      } catch {
        // Durable state is authoritative; another scheduler event can retry.
      }
    }
  }

  return { afterReconcileLocked, beforeReconcile, register, restoreAll };
}
