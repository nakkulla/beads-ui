/**
 * Restart-safe unified Worker discard orchestration.
 *
 * The queue operation is the authority. Every external side effect is followed
 * by an authoritative readback before the next phase is persisted, so startup
 * recovery can repeat observations without repeating completed mutations.
 */
import fs from 'node:fs';
import path from 'node:path';
import { isImplementationAttempt } from '../../app/utils/active-attempts.js';
import { debug } from '../logging.js';
import { resolvePrRef } from './pr-poller.js';
import { archiveDiscardSource } from './recovery-archive.js';
import { createRevertBuilder } from './revert-builder.js';
import { staleResidueIntact } from './stale-work.js';
import { discardRevertWorktreeDir } from './state-paths.js';

const default_log = debug('worker:discard');

const DISCARDABLE_ATTEMPT_STATUSES = new Set([
  'running',
  'paused',
  'failed',
  'orphaned',
  'done',
  // 2026-08-29 worker-held-tile-discard spec §3 D3 (정합 원칙): this set is the
  // union of the statuses at the two places that draw a `폐기` button — the
  // running-lane Worker attempt tile and the PR 대기 row's `done` attempt — so
  // that no drawn button can answer `attempt_not_discardable`.
  //
  // That is why `waiting` is here (2026-08-28 worker-prerequisite-wait-tier
  // §5.2: `폐기` is the ONLY action that tile has), and why the other two held
  // statuses joined it.
  'waiting',
  'parked',
  'retry_wait'
]);

/**
 * @param {{ workspace: string, repo: string, store: any, gh: any, bd: any, worktree: any, gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>, scheduler: any, archive: any, processController: any, sessionLog: any, revertBuilder?: any, verifyRevert?: (input: any) => Promise<any>, rollbackBaseSync?: (refs: any) => Promise<any>, rollbackVerify?: (bead_id: string, base_sha: string) => Promise<any>, external?: { get: (workspace: string, bead_id: string) => any }, actionInFlight?: (bead_id: string) => boolean, makeOperationId?: () => string, now?: () => number, notifyChanged?: (workspace: string) => void, notify?: { needsHuman: (input: any) => Promise<void> }|null, log?: (...args: any[]) => void }} deps
 * @param {{ resolveBase?: (options?: { force?: boolean }) => Promise<{ ok: boolean, base?: string|null, base_oid?: string|null, step?: string }> }} [options]
 */
export function createDiscardCoordinator(deps, options = {}) {
  const resolve_base = options.resolveBase;
  const now = deps.now || (() => Date.now());
  const makeOperationId =
    deps.makeOperationId ||
    (() => `discard-${now()}-${Math.random().toString(16).slice(2, 10)}`);
  const notifyChanged = deps.notifyChanged || (() => {});
  const log = deps.log || default_log;
  // Optional so every existing construction site (and test) keeps working with
  // no notifier at all — a missing one is silence, never a discard failure.
  const notify = deps.notify || null;
  const revertBuilder =
    deps.revertBuilder || createRevertBuilder({ gitRun: deps.gitRun });
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
   * Announce one durable discard failure (UI-jw27 §2). The discard ladder has
   * no retry step, so the FIRST failure is already terminal and every
   * `failDiscardOperation` write announces — including the one a re-click
   * produces, which is a new terminal record and a new fact.
   *
   * Fire-and-forget and guarded: the notifier is no-throw by its own contract,
   * and this guard keeps that true for an injected fake that breaks it.
   *
   * @param {unknown} bead_id
   * @param {string} reason
   */
  function announceDiscardFailure(bead_id, reason) {
    if (!notify || typeof bead_id !== 'string' || bead_id.length === 0) {
      return;
    }
    try {
      Promise.resolve(
        notify.needsHuman({
          bead_id,
          failure_class: '폐기 실패',
          reason,
          next_action: '재클릭 또는 [세션에서 해결]',
          repo: deps.repo
        })
      ).catch((err) => {
        log('discard failure notify failed: %o', err);
      });
    } catch (err) {
      log('discard failure notify failed: %o', err);
    }
  }

  /**
   * @param {any} operation
   * @param {string} reason
   */
  function fail(operation, reason) {
    const written = deps.store.failDiscardOperation(deps.workspace, {
      operation_id: operation.operation_id,
      expected_phase: operation.phase,
      reason
    });
    // Only a write that LANDED is a terminal fact. `failDiscardOperation` is a
    // CAS on the observed phase, so a refused write (`phase_mismatch`,
    // `operation_not_found`) left no record for a push to be about (UI-jw27
    // §2); announcing it anyway would report a failure the board never shows.
    if (written.ok) {
      announceDiscardFailure(operation.bead_id, reason);
    }
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
   * Materialize the exact PR head before archiving a merged cleanup failure
   * whose worker worktree and branch are already gone. The attempt's
   * `head_oid` is its dispatch starting point, not the delivered implementation.
   *
   * @param {string} repo
   * @param {{ number?: number, head_sha?: string }} pr
   * @returns {Promise<{ ok: true, sha: string }|{ ok: false, reason: string }>}
   */
  async function fetchPinnedPrHead(repo, pr) {
    if (
      !Number.isFinite(pr.number) ||
      typeof pr.head_sha !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(pr.head_sha)
    ) {
      return { ok: false, reason: 'pr_head_identity_unknown' };
    }
    const pull_ref = `refs/pull/${pr.number}/head`;
    const fetched_pull = await deps.gitRun(['fetch', 'origin', pull_ref], {
      cwd: repo
    });
    if (fetched_pull.code === 0) {
      const fetched_head = await deps.gitRun(['rev-parse', 'FETCH_HEAD'], {
        cwd: repo
      });
      if (
        fetched_head.code !== 0 ||
        fetched_head.stdout.trim() !== pr.head_sha
      ) {
        return { ok: false, reason: 'pull_ref_head_mismatch' };
      }
    } else {
      const fetched_head = await deps.gitRun(['fetch', 'origin', pr.head_sha], {
        cwd: repo
      });
      if (fetched_head.code !== 0) {
        return { ok: false, reason: 'pull_ref_head_unavailable' };
      }
    }
    const observed_head = await deps.gitRun(
      ['cat-file', '-e', `${pr.head_sha}^{commit}`],
      { cwd: repo }
    );
    return observed_head.code === 0
      ? { ok: true, sha: pr.head_sha }
      : { ok: false, reason: 'pull_ref_head_unavailable' };
  }

  /**
   * Every attempt of one bead, oldest first — the queue's own rows PLUS the
   * records §7 moved to `beads/<bead>/attempts/` (record-timeline-retention).
   *
   * A bead settles before it is discarded far more often than not: the `done`
   * lane is exactly where a merged PR is reverted from, and by then the bead's
   * whole attempt set is processed-terminal and has left `queue.json`. Reading
   * the queue alone would answer `attempt_not_found` for precisely the discards
   * that matter most.
   *
   * The queue snapshot is the fallback for a store without the query API, so
   * the existing test doubles keep working unchanged.
   *
   * @param {any} queue
   * @param {string} bead_id
   * @returns {any[]}
   */
  function beadAttempts(queue, bead_id) {
    if (typeof deps.store.readAttemptsForBead === 'function') {
      try {
        return deps.store.readAttemptsForBead(deps.workspace, bead_id);
      } catch {
        // Fall through: an unreadable record tree still has a live queue.
      }
    }
    return Object.values(queue.attempts || {}).filter(
      (attempt) => /** @type {any} */ (attempt)?.bead_id === bead_id
    );
  }

  /**
   * @param {string} bead_id
   * @param {string|null} attempt_id
   * @returns {Promise<{ ok: true, attempt: any, source_snapshot: Record<string, unknown> }|{ ok: false, reason: string }>}
   */
  async function captureSource(bead_id, attempt_id) {
    const queue = deps.store.snapshot(deps.workspace);
    // The discard source is the bead's own IMPLEMENTATION lineage (UI-hk74 §7):
    // a review session runs against a PR this bead already opened, so letting
    // one take the "last attempt" slot would point the rollback at the
    // reviewer's session instead of the work being discarded.
    const bead_attempts = beadAttempts(queue, bead_id);
    const attempts = bead_attempts.filter((attempt) =>
      isImplementationAttempt(attempt)
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
    // The successor may itself have been transferred (§7), so the bead's own
    // records join the queue-wide scan: a resume this discard would strand is
    // no less a successor for having settled.
    if (
      [...Object.values(queue.attempts || {}), ...bead_attempts].some(
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
    const cleanup_failed = Object.hasOwn(queue.cleanup_failed || {}, bead_id);
    const branch = topology.present
      ? topology.branch
      : cleanup_failed &&
          pr?.state === 'MERGED' &&
          typeof pr.head_ref === 'string' &&
          pr.head_ref.length > 0
        ? pr.head_ref
        : null;
    if (branch === null) {
      return { ok: false, reason: 'source_branch_unknown' };
    }
    const local = await localRef(repo, branch);
    if (!local.ok) {
      return { ok: false, reason: local.reason || 'local_ref_observe_failed' };
    }
    if (topology.present && local.sha === null) {
      return { ok: false, reason: 'local_ref_missing' };
    }
    if (topology.present && topology.head_sha !== local.sha) {
      return { ok: false, reason: 'source_ref_mismatch' };
    }
    const remote = await remoteRef(repo, branch);
    if (!remote.ok) {
      return {
        ok: false,
        reason: remote.reason || 'remote_ref_observe_failed'
      };
    }
    if (!topology.present && !cleanup_failed) {
      return { ok: false, reason: 'worktree_missing' };
    }
    if (!topology.present && pr?.state !== 'MERGED') {
      return { ok: false, reason: 'cleanup_failed_pr_not_merged' };
    }
    let absent_source_head = null;
    if (!topology.present) {
      if (
        typeof pr?.head_sha !== 'string' ||
        (local.sha !== null && local.sha !== pr.head_sha) ||
        (remote.sha !== null && remote.sha !== pr.head_sha)
      ) {
        return { ok: false, reason: 'source_residue_identity_changed' };
      }
      const fetched_head = await fetchPinnedPrHead(repo, pr || {});
      if (fetched_head.ok === false) {
        return { ok: false, reason: fetched_head.reason };
      }
      absent_source_head = fetched_head.sha;
    }
    const source_head =
      topology.head_sha || local.sha || absent_source_head || null;
    if (!/^[0-9a-f]{40}$/i.test(source_head || '')) {
      return { ok: false, reason: 'source_head_unknown' };
    }
    if (remote.sha !== null && remote.sha !== source_head) {
      return { ok: false, reason: 'source_remote_ref_mismatch' };
    }
    let parent_issue;
    /** @type {Record<string, any>[]} */
    let phase_children;
    try {
      parent_issue = await deps.bd.readIssue(bead_id);
      const listed_children = await deps.bd.listChildren(bead_id);
      if (!Array.isArray(listed_children)) {
        return { ok: false, reason: 'phase_child_snapshot_failed' };
      }
      /** @type {Record<string, any>[]} */
      const children = [];
      /** @type {Set<string>} */
      const child_ids = new Set();
      for (const listed of listed_children) {
        const child_id = listed?.id;
        if (
          typeof child_id !== 'string' ||
          child_id.length === 0 ||
          child_id === bead_id ||
          child_ids.has(child_id)
        ) {
          return { ok: false, reason: 'phase_child_snapshot_failed' };
        }
        child_ids.add(child_id);
        const child = await deps.bd.readIssue(child_id);
        if (
          !child ||
          child.id !== child_id ||
          child.metadata?.parent !== bead_id ||
          typeof child.metadata?.plan_task_anchor !== 'string' ||
          child.metadata.plan_task_anchor.length === 0
        ) {
          return { ok: false, reason: 'phase_child_snapshot_failed' };
        }
        const descendants = await deps.bd.listChildren(child_id);
        if (!Array.isArray(descendants)) {
          return { ok: false, reason: 'phase_child_snapshot_failed' };
        }
        if (descendants.length > 0) {
          return { ok: false, reason: 'phase_child_nested' };
        }
        children.push(child);
      }
      phase_children = children.sort((left, right) =>
        left.id.localeCompare(right.id)
      );
    } catch {
      return { ok: false, reason: 'phase_child_snapshot_failed' };
    }
    const parent_metadata =
      parent_issue.metadata && typeof parent_issue.metadata === 'object'
        ? parent_issue.metadata
        : {};
    /** @type {Record<string, { present: boolean, value?: unknown }>} */
    const parent_authority = {};
    for (const key of [
      'spec_id',
      'plan_path',
      'spec_review',
      'plan_review',
      'plan_approval'
    ]) {
      const source = key === 'spec_id' ? parent_issue : parent_metadata;
      parent_authority[key] = Object.hasOwn(source, key)
        ? { present: true, value: source[key] }
        : { present: false };
    }
    return {
      ok: true,
      attempt: { ...record, process_identity },
      source_snapshot: {
        repo,
        workspace: deps.workspace,
        worktree: topology.path,
        branch,
        target_base: record.target_base,
        base_oid: record.base_oid,
        source_head,
        attempt_status: record.status,
        attempt_head: record.head_oid,
        session_id: record.session_id,
        process_identity,
        local_branch_sha: local.sha,
        remote_branch_sha: remote.sha,
        ...(topology.present ? {} : { preexisting_absent: true }),
        pr,
        bead_status:
          typeof parent_issue.status === 'string' ? parent_issue.status : null,
        bead_pr_url:
          typeof parent_metadata.pr_url === 'string'
            ? parent_metadata.pr_url
            : null,
        phase_children,
        parent_authority,
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
   * The session transcript this archive should copy, resolved through the §4
   * read ladder rather than the flat derivation.
   *
   * A log is no longer necessarily at the legacy flat path: a new session is
   * written straight into `beads/<bead>/sessions/`, and the one-time record
   * migration renamed the historical ones there without rewriting the stored
   * `log_path`. `pathFor` answers only the flat location, so it would hand the
   * archiver a name that does not exist and the copy would silently skip.
   * `readPathFor` walks the same candidates every other reader does; the bead
   * is passed because it is what makes the bead-scoped candidate reachable.
   *
   * @param {{ attempt_id?: string|null, bead_id?: string|null }} operation
   * @returns {string|null}
   */
  function sessionLogPathOf(operation) {
    if (!operation.attempt_id) {
      return null;
    }
    if (typeof deps.sessionLog.readPathFor === 'function') {
      return deps.sessionLog.readPathFor(deps.workspace, operation.attempt_id, {
        bead_id: operation.bead_id ?? null
      });
    }
    return deps.sessionLog.pathFor(deps.workspace, operation.attempt_id);
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
        source.residue === 'branch'
          ? typeof deps.archive.createBranch === 'function'
            ? deps.archive.createBranch({
                workspace: deps.workspace,
                archive_id: operation.operation_id,
                repo: source.repo,
                ref: `refs/heads/${source.branch}`,
                base_oid: source.base_oid,
                branch_head_sha: source.branch_head_sha
              })
            : { ok: false, reason: 'branch_archive_unwired' }
          : source.preexisting_absent === true
            ? typeof deps.archive.createCommittedSource === 'function'
              ? deps.archive.createCommittedSource({
                  workspace: deps.workspace,
                  operation_id: operation.operation_id,
                  source_snapshot: source,
                  session_log_path: sessionLogPathOf(operation)
                })
              : { ok: false, reason: 'committed_source_archive_unwired' }
            : deps.archive.create({
                workspace: deps.workspace,
                operation_id: operation.operation_id,
                repo: source.repo,
                worktree: source.worktree,
                target_base: source.base_oid || source.target_base,
                source_head: source.source_head,
                source_snapshot: source,
                session_log_path: sessionLogPathOf(operation)
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
      // 정산 전 status는 `captureSource`가 포착한 것을 넘긴다 (2026-08-29
      // held-tile-discard §4.2): 이 단계는 `runner_terminated`가 저장되기 전에
      // 죽으면 recovery가 다시 돌리는데, 그때 attempt 레코드는 이미 `discarded`라
      // 스스로는 자기가 무엇이었는지 답하지 못한다.
      const settled = await deps.scheduler.finalizeDiscardAttempt(
        deps.workspace,
        operation.attempt_id,
        operation.bead_id,
        typeof operation.source_snapshot?.attempt_status === 'string'
          ? operation.source_snapshot.attempt_status
          : null
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

  /** @param {string} value */
  function safeBranchPart(value) {
    return value.replace(/[^A-Za-z0-9._-]/g, '-');
  }

  /** @param {any} operation */
  async function observeMergedSource(operation) {
    if (typeof deps.gh.revertSource !== 'function') {
      return fail(operation, 'merged_revert_unwired');
    }
    const number = operation.source_snapshot.pr?.number;
    if (!Number.isFinite(number)) {
      return fail(operation, 'original_pr_missing');
    }
    const original = await deps.gh.revertSource(
      operation.source_snapshot.repo,
      number
    );
    if (original.state !== 'ok') {
      return fail(
        operation,
        `original_pr_observe_failed:${original.reason || 'unknown'}`
      );
    }
    const target_base = original.data.base_ref;
    const captured_pr = operation.source_snapshot.pr;
    if (
      target_base !== operation.source_snapshot.target_base ||
      !captured_pr ||
      original.data.number !== captured_pr.number ||
      original.data.base_ref !== captured_pr.base_ref ||
      original.data.head_ref !== captured_pr.head_ref ||
      original.data.head_sha !== captured_pr.head_sha
    ) {
      return fail(operation, 'original_pr_target_base_changed');
    }
    const fetched = await deps.gitRun(['fetch', 'origin', target_base], {
      cwd: operation.source_snapshot.repo
    });
    if (fetched.code !== 0) {
      return fail(operation, 'revert_target_base_fetch_failed');
    }
    const target = await deps.gitRun(
      ['rev-parse', `refs/remotes/origin/${target_base}`],
      { cwd: operation.source_snapshot.repo }
    );
    const target_sha = target.stdout.trim();
    if (target.code !== 0 || !/^[0-9a-f]{40}$/i.test(target_sha)) {
      return fail(operation, 'revert_target_base_unavailable');
    }
    return advance(operation, 'revert_source_observed', {
      mode: 'merged_revert',
      original_pr: original.data,
      receipts: {
        revert_source_observed: { at: now(), target_base, target_sha }
      }
    });
  }

  /**
   * Remove only a deterministic, pre-persist local preparation residue. The
   * private path, branch, pinned base HEAD, and absent remote ref must all agree;
   * anything else may be user or concurrent work and is preserved.
   *
   * @param {string} repo
   * @param {string} worktree
   * @param {string} branch
   * @param {string} target_sha
   */
  async function clearPreparedResidue(repo, worktree, branch, target_sha) {
    return deps.worktree.withTopologyLock(repo, async () => {
      const remote = await remoteRef(repo, branch);
      if (!remote.ok || remote.sha !== null) {
        return {
          ok: false,
          reason: remote.reason || 'revert_remote_ref_exists'
        };
      }
      const listed = await deps.gitRun(['worktree', 'list', '--porcelain'], {
        cwd: repo
      });
      if (listed.code !== 0) {
        return { ok: false, reason: 'revert_worktree_observe_failed' };
      }
      const path_present = listed.stdout.includes(`worktree ${worktree}`);
      if (path_present) {
        if (
          !hasExactRevertWorktree(listed.stdout, worktree, branch, target_sha)
        ) {
          return { ok: false, reason: 'revert_worktree_identity_changed' };
        }
        const removed = await deps.gitRun(
          ['worktree', 'remove', '--force', worktree],
          { cwd: repo }
        );
        if (removed.code !== 0) {
          return { ok: false, reason: 'revert_worktree_remove_failed' };
        }
      } else if (fs.existsSync(worktree)) {
        return { ok: false, reason: 'revert_worktree_unregistered' };
      }
      const local = await localRef(repo, branch);
      if (!local.ok || (local.sha !== null && local.sha !== target_sha)) {
        return {
          ok: false,
          reason: local.reason || 'revert_branch_identity_changed'
        };
      }
      if (local.sha !== null) {
        const deleted = await deps.gitRun(
          ['update-ref', '-d', `refs/heads/${branch}`, target_sha],
          { cwd: repo }
        );
        if (deleted.code !== 0) {
          return { ok: false, reason: 'revert_branch_remove_failed' };
        }
      }
      const readback = await localRef(repo, branch);
      return readback.ok && readback.sha === null
        ? { ok: true }
        : { ok: false, reason: 'revert_branch_remove_readback_failed' };
    });
  }

  /** @param {any} operation */
  async function prepareRevertLocal(operation) {
    if (!operation.original_pr || typeof deps.verifyRevert !== 'function') {
      return fail(operation, 'merged_revert_unwired');
    }
    const target_base = operation.original_pr.base_ref;
    const branch = `revert-${safeBranchPart(operation.bead_id)}-${safeBranchPart(operation.operation_id).slice(0, 12)}`;
    const parent = discardRevertWorktreeDir(
      deps.workspace,
      operation.operation_id
    );
    fs.mkdirSync(parent, { recursive: true });
    const worktree = path.join(parent, branch);
    const target_sha = operation.receipts?.revert_source_observed?.target_sha;
    if (typeof target_sha !== 'string') {
      return fail(operation, 'revert_target_base_unavailable');
    }
    const cleared = await clearPreparedResidue(
      operation.source_snapshot.repo,
      worktree,
      branch,
      target_sha
    );
    if (!cleared.ok) {
      return fail(operation, cleared.reason || 'revert_local_residue_unknown');
    }
    const built = await revertBuilder.prepare({
      repo: operation.source_snapshot.repo,
      worktree,
      branch,
      target_base,
      target_sha,
      original: operation.original_pr
    });
    if (!built.ok) {
      return fail(operation, built.reason || 'revert_build_failed');
    }
    return advance(operation, 'revert_local_prepared', {
      revert_pr: {
        branch,
        worktree,
        worktree_parent: parent,
        base_sha: built.base_sha,
        tree_sha: built.tree_sha,
        target_base
      },
      receipts: {
        revert_local_prepared: { at: now(), base_sha: built.base_sha }
      }
    });
  }

  /** @param {any} operation */
  async function commitRevert(operation) {
    const revert_pr = operation.revert_pr;
    const verifyRevert = deps.verifyRevert;
    if (
      !revert_pr ||
      typeof revert_pr.worktree !== 'string' ||
      typeof revert_pr.branch !== 'string' ||
      typeof revert_pr.base_sha !== 'string' ||
      typeof revert_pr.tree_sha !== 'string' ||
      typeof verifyRevert !== 'function'
    ) {
      return fail(operation, 'revert_worktree_identity_missing');
    }
    const branch = await deps.gitRun(['symbolic-ref', '--short', 'HEAD'], {
      cwd: revert_pr.worktree
    });
    const before = await deps.gitRun(['rev-parse', 'HEAD'], {
      cwd: revert_pr.worktree
    });
    if (
      branch.code !== 0 ||
      branch.stdout.trim() !== revert_pr.branch ||
      before.code !== 0 ||
      !/^[0-9a-f]{40}$/i.test(before.stdout.trim())
    ) {
      return fail(operation, 'revert_worktree_identity_changed');
    }
    const already_committed = before.stdout.trim() !== revert_pr.base_sha;
    if (already_committed) {
      const parent = await deps.gitRun(['rev-parse', 'HEAD^'], {
        cwd: revert_pr.worktree
      });
      const tree = await deps.gitRun(['rev-parse', 'HEAD^{tree}'], {
        cwd: revert_pr.worktree
      });
      const status = await deps.gitRun(['status', '--porcelain'], {
        cwd: revert_pr.worktree
      });
      const message = await deps.gitRun(['log', '-1', '--format=%B'], {
        cwd: revert_pr.worktree
      });
      if (
        parent.code !== 0 ||
        parent.stdout.trim() !== revert_pr.base_sha ||
        tree.code !== 0 ||
        tree.stdout.trim() !== revert_pr.tree_sha ||
        status.code !== 0 ||
        status.stdout.trim().length > 0 ||
        message.code !== 0 ||
        !message.stdout.includes(`Discard operation: ${operation.operation_id}`)
      ) {
        return fail(operation, 'revert_commit_identity_changed');
      }
    }
    const verified = await verifyRevert({
      repo: operation.source_snapshot.repo,
      worktree: revert_pr.worktree,
      base_sha: revert_pr.base_sha,
      bead_id: operation.bead_id
    });
    if (!verified?.ok) {
      return fail(
        operation,
        `revert_verify_failed:${verified?.reason || 'unknown'}`
      );
    }
    if (!already_committed) {
      const staged = await deps.gitRun(['add', '-A'], {
        cwd: revert_pr.worktree
      });
      if (staged.code !== 0) {
        return fail(operation, 'revert_stage_failed');
      }
      const tree = await deps.gitRun(['write-tree'], {
        cwd: revert_pr.worktree
      });
      if (tree.code !== 0 || tree.stdout.trim() !== revert_pr.tree_sha) {
        return fail(operation, 'revert_tree_changed_after_verify');
      }
      const committed = await deps.gitRun(
        [
          'commit',
          '-m',
          `Revert ${operation.bead_id}`,
          '-m',
          `Discard operation: ${operation.operation_id}`
        ],
        { cwd: revert_pr.worktree }
      );
      if (committed.code !== 0) {
        return fail(operation, 'revert_commit_failed');
      }
    }
    const local_head = await deps.gitRun(['rev-parse', 'HEAD'], {
      cwd: revert_pr.worktree
    });
    const revert_head_sha = local_head.stdout.trim();
    if (local_head.code !== 0 || !/^[0-9a-f]{40}$/i.test(revert_head_sha)) {
      return fail(operation, 'revert_head_observe_failed');
    }
    return advance(operation, 'revert_local_ready', {
      revert_pr: { ...revert_pr, head_sha: revert_head_sha },
      receipts: { revert_local_ready: { at: now(), head_sha: revert_head_sha } }
    });
  }

  /** @param {any} operation */
  async function pushRevert(operation) {
    const revert_pr = operation.revert_pr;
    if (
      !revert_pr ||
      typeof revert_pr.branch !== 'string' ||
      typeof revert_pr.worktree !== 'string' ||
      typeof revert_pr.head_sha !== 'string'
    ) {
      return fail(operation, 'revert_push_identity_missing');
    }
    const existing = await remoteRef(
      operation.source_snapshot.repo,
      revert_pr.branch
    );
    if (!existing.ok) {
      return fail(operation, existing.reason || 'revert_push_readback_failed');
    }
    if (existing.sha !== revert_pr.head_sha && existing.sha !== null) {
      return fail(operation, 'revert_remote_ref_changed');
    }
    const pushed =
      existing.sha === revert_pr.head_sha
        ? { code: 0 }
        : await deps.gitRun(
            ['push', 'origin', `${revert_pr.branch}:${revert_pr.branch}`],
            { cwd: revert_pr.worktree }
          );
    if (pushed.code !== 0) {
      return fail(operation, 'revert_push_failed');
    }
    const remote = await remoteRef(
      operation.source_snapshot.repo,
      revert_pr.branch
    );
    if (!remote.ok || remote.sha !== revert_pr.head_sha) {
      return fail(operation, remote.reason || 'revert_push_readback_failed');
    }
    return advance(operation, 'revert_remote_pushed', {
      receipts: {
        revert_remote_pushed: { at: now(), head_sha: revert_pr.head_sha }
      }
    });
  }

  /** @param {any} operation */
  async function openRevertPr(operation) {
    const revert_pr = operation.revert_pr;
    if (
      !revert_pr ||
      typeof revert_pr.branch !== 'string' ||
      typeof revert_pr.head_sha !== 'string' ||
      typeof operation.original_pr?.url !== 'string'
    ) {
      return fail(operation, 'revert_pr_identity_missing');
    }
    if (typeof deps.gh.createRevertPr !== 'function') {
      return fail(operation, 'merged_revert_unwired');
    }
    const revert = await deps.gh.createRevertPr(
      operation.source_snapshot.repo,
      {
        base: revert_pr.target_base,
        head: revert_pr.branch,
        head_sha: revert_pr.head_sha,
        title: `Revert ${operation.bead_id}`,
        body: `Rollback of ${operation.original_pr.url}\n\nDiscard operation: ${operation.operation_id}\nArchive: ${operation.backup?.path || 'unavailable'}`
      }
    );
    if (revert.state !== 'ok') {
      return fail(
        operation,
        `revert_pr_create_failed:${revert.reason || 'unknown'}`
      );
    }
    if (
      revert.data.base_ref !== revert_pr.target_base ||
      revert.data.head_ref !== revert_pr.branch ||
      revert.data.head_sha !== revert_pr.head_sha ||
      !Number.isFinite(revert.data.number) ||
      typeof revert.data.url !== 'string' ||
      revert.data.url.length === 0
    ) {
      return fail(operation, 'revert_pr_readback_mismatch');
    }
    return advance(operation, 'revert_pr_created', {
      mode: 'merged_revert',
      original_pr: operation.original_pr,
      revert_pr: {
        ...revert_pr,
        ...revert.data,
        branch: revert_pr.branch,
        head_sha: revert_pr.head_sha
      },
      receipts: {
        revert_pr_created: {
          at: now(),
          base_sha: revert_pr.base_sha,
          head_sha: revert_pr.head_sha
        }
      }
    });
  }

  /**
   * @param {string} output
   * @param {string} expected_path
   * @param {string} branch
   * @param {string} sha
   */
  function hasExactRevertWorktree(output, expected_path, branch, sha) {
    const blocks = output.trim().split('\n\n');
    return blocks.some((block) => {
      const lines = block.split('\n');
      return (
        lines.includes(`worktree ${expected_path}`) &&
        lines.includes(`HEAD ${sha}`) &&
        lines.includes(`branch refs/heads/${branch}`)
      );
    });
  }

  /** @param {any} operation */
  async function removeRevertWorktree(operation) {
    const revert_pr = operation.revert_pr;
    const repo = operation.source_snapshot.repo;
    if (
      !revert_pr ||
      typeof revert_pr.worktree !== 'string' ||
      typeof revert_pr.branch !== 'string' ||
      typeof revert_pr.head_sha !== 'string'
    ) {
      return fail(operation, 'revert_worktree_identity_missing');
    }
    const result = await deps.worktree.withTopologyLock(repo, async () => {
      const listed = await deps.gitRun(['worktree', 'list', '--porcelain'], {
        cwd: repo
      });
      if (listed.code !== 0) {
        return { ok: false, reason: 'revert_worktree_observe_failed' };
      }
      if (
        !hasExactRevertWorktree(
          listed.stdout,
          revert_pr.worktree,
          revert_pr.branch,
          revert_pr.head_sha
        )
      ) {
        const missing = !listed.stdout.includes(
          `worktree ${revert_pr.worktree}`
        );
        return missing
          ? { ok: true, already_removed: true }
          : { ok: false, reason: 'revert_worktree_identity_changed' };
      }
      const branch_ref = await deps.gitRun(
        ['rev-parse', '--verify', '--quiet', `refs/heads/${revert_pr.branch}`],
        { cwd: repo }
      );
      if (
        branch_ref.code !== 0 ||
        branch_ref.stdout.trim() !== revert_pr.head_sha
      ) {
        return { ok: false, reason: 'revert_branch_identity_changed' };
      }
      const removed = await deps.gitRun(
        ['worktree', 'remove', '--force', revert_pr.worktree],
        { cwd: repo }
      );
      if (removed.code !== 0) {
        return { ok: false, reason: 'revert_worktree_remove_failed' };
      }
      const readback = await deps.gitRun(['worktree', 'list', '--porcelain'], {
        cwd: repo
      });
      return readback.code === 0 &&
        !readback.stdout.includes(`worktree ${revert_pr.worktree}`)
        ? { ok: true }
        : { ok: false, reason: 'revert_worktree_remove_readback_failed' };
    });
    if (!result.ok) {
      return fail(operation, result.reason || 'revert_worktree_remove_failed');
    }
    return advance(operation, 'revert_worktree_removed', {
      receipts: { revert_worktree_removed: { at: now() } }
    });
  }

  /** @param {any} operation */
  async function resolveRevertBead(operation) {
    try {
      if ((await deps.bd.readStatus(operation.bead_id)) !== 'resolved') {
        await deps.bd.setStatus(operation.bead_id, 'resolved');
      }
      if ((await deps.bd.readStatus(operation.bead_id)) !== 'resolved') {
        return fail(operation, 'revert_bd_status_readback_failed');
      }
    } catch {
      return fail(operation, 'revert_bd_status_write_failed');
    }
    return advance(operation, 'revert_bead_resolved', {
      receipts: { revert_bead_resolved: { at: now() } }
    });
  }

  /** @param {any} operation */
  async function bindRevertPrUrl(operation) {
    if (typeof deps.bd.setMetadata !== 'function') {
      return fail(operation, 'revert_bd_metadata_unwired');
    }
    try {
      if (
        (await deps.bd.readMetadata(operation.bead_id, 'pr_url')) !==
        operation.revert_pr.url
      ) {
        await deps.bd.setMetadata(
          operation.bead_id,
          'pr_url',
          operation.revert_pr.url
        );
      }
      if (
        (await deps.bd.readMetadata(operation.bead_id, 'pr_url')) !==
        operation.revert_pr.url
      ) {
        return fail(operation, 'revert_bd_pr_url_readback_failed');
      }
    } catch {
      return fail(operation, 'revert_bd_pr_url_write_failed');
    }
    return advance(operation, 'revert_pr_url_bound', {
      receipts: { revert_pr_url_bound: { at: now() } }
    });
  }

  /** @param {any} operation */
  function recordRevertWait(operation) {
    return advance(operation, 'revert_pr_wait', {
      receipts: { revert_pr_wait: { at: now() } }
    });
  }

  /** @param {any} operation */
  async function observeRevertPr(operation) {
    const number = operation.revert_pr?.number;
    if (!Number.isFinite(number)) {
      return fail(operation, 'revert_pr_missing');
    }
    const observed = await deps.gh.prDetail(
      operation.source_snapshot.repo,
      number
    );
    if (observed.state !== 'ok') {
      return fail(
        operation,
        `revert_pr_observe_failed:${observed.reason || 'unknown'}`
      );
    }
    const expected = operation.revert_pr;
    if (
      observed.data.number !== expected.number ||
      observed.data.url !== expected.url ||
      observed.data.base_ref !== expected.target_base ||
      observed.data.head_ref !== (expected.head_ref || expected.branch) ||
      observed.data.head_sha !== expected.head_sha
    ) {
      return fail(operation, 'revert_pr_identity_changed');
    }
    if (observed.data.state === 'OPEN') {
      return {
        ok: true,
        operation_id: operation.operation_id,
        pending: 'revert_pr_wait'
      };
    }
    const observed_revert_pr = {
      ...expected,
      state: observed.data.state,
      merged_sha: observed.data.merged_sha || null
    };
    if (observed.data.state === 'CLOSED') {
      const persisted = advance(operation, operation.phase, {
        revert_pr: observed_revert_pr
      });
      return persisted
        ? fail(persisted, 'revert_pr_closed_unmerged')
        : fail(operation, 'revert_pr_state_persist_failed');
    }
    if (observed.data.state !== 'MERGED') {
      return fail(operation, 'revert_pr_state_invalid');
    }
    if (!/^[0-9a-f]{40}$/i.test(observed.data.merged_sha || '')) {
      return fail(operation, 'revert_pr_merge_sha_missing');
    }
    return advance(operation, 'rollback_base_sync', {
      revert_pr: observed_revert_pr,
      receipts: {
        revert_pr_merged: { at: now(), merge_sha: observed.data.merged_sha }
      }
    });
  }

  /** @param {any} operation */
  async function rollbackBaseSync(operation) {
    if (typeof deps.rollbackBaseSync !== 'function') {
      return fail(operation, 'rollback_base_sync_unwired');
    }
    const synced = await deps.rollbackBaseSync({
      base_ref: operation.original_pr?.base_ref
    });
    if (!synced?.ok || typeof synced.sha !== 'string') {
      return fail(
        operation,
        `rollback_base_sync_failed:${synced?.reason || 'unknown'}`
      );
    }
    const merge_sha = operation.receipts?.revert_pr_merged?.merge_sha;
    const integrated = await deps.gitRun(
      ['merge-base', '--is-ancestor', merge_sha, synced.sha],
      { cwd: operation.source_snapshot.repo }
    );
    if (integrated.code !== 0) {
      return fail(operation, 'rollback_merge_not_on_target_base');
    }
    return advance(operation, 'rollback_verified', {
      receipts: { rollback_base_sync: { at: now(), base_sha: synced.sha } }
    });
  }

  /** @param {any} operation */
  async function rollbackVerify(operation) {
    if (typeof deps.rollbackVerify !== 'function') {
      return fail(operation, 'rollback_verify_unwired');
    }
    const base_sha = operation.receipts?.rollback_base_sync?.base_sha;
    const verified = await deps.rollbackVerify(operation.bead_id, base_sha);
    if (!verified?.ok) {
      return fail(
        operation,
        `rollback_verify_failed:${verified?.reason || 'unknown'}`
      );
    }
    return advance(operation, 'rollback_source_cleanup', {
      receipts: { rollback_verified: { at: now(), base_sha } }
    });
  }

  /** @param {any} operation */
  async function rollbackRemoveSourceWorktree(operation) {
    const source = operation.source_snapshot;
    if (source.preexisting_absent === true) {
      const observed = await deps.worktree.observeOwnedByBead({
        repo: source.repo,
        bead_id: operation.bead_id
      });
      if (!observed.ok || observed.present) {
        return fail(
          operation,
          observed.reason || 'rollback_source_worktree_reappeared'
        );
      }
      return advance(operation, 'rollback_source_local_removed', {
        receipts: {
          rollback_source_worktree_removed: {
            at: now(),
            already_absent: true
          }
        }
      });
    }
    const removed = await deps.worktree.removeByBranch({
      repo: source.repo,
      branch: source.branch,
      expected_path: source.worktree,
      expected_head: source.source_head
    });
    if (!removed.ok) {
      return fail(
        operation,
        `rollback_source_worktree_failed:${removed.reason || 'unknown'}`
      );
    }
    return advance(operation, 'rollback_source_local_removed', {
      receipts: { rollback_source_worktree_removed: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   * @param {string} branch
   * @param {string|null} expected_sha
   * @param {string} next_phase
   * @param {string} receipt
   */
  async function rollbackRemoveLocalRef(
    operation,
    branch,
    expected_sha,
    next_phase,
    receipt
  ) {
    const result = await deps.worktree.withTopologyLock(
      operation.source_snapshot.repo,
      async () => {
        const before = await localRef(operation.source_snapshot.repo, branch);
        if (
          !before.ok ||
          (before.sha !== null && before.sha !== expected_sha)
        ) {
          return { ok: false, reason: before.reason || 'local_ref_changed' };
        }
        if (before.sha !== null) {
          const deleted = await deps.gitRun(
            ['update-ref', '-d', `refs/heads/${branch}`, before.sha],
            { cwd: operation.source_snapshot.repo }
          );
          if (deleted.code !== 0) {
            return { ok: false, reason: 'local_ref_delete_failed' };
          }
        }
        const after = await localRef(operation.source_snapshot.repo, branch);
        return after.ok && after.sha === null
          ? { ok: true }
          : { ok: false, reason: after.reason || 'local_ref_delete_failed' };
      }
    );
    if (!result.ok) {
      return fail(
        operation,
        `rollback_${receipt}_failed:${result.reason || 'unknown'}`
      );
    }
    return advance(operation, next_phase, {
      receipts: { [receipt]: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   * @param {string} branch
   * @param {string|null} expected_sha
   * @param {string} next_phase
   * @param {string} receipt
   */
  async function rollbackRemoveRemoteRef(
    operation,
    branch,
    expected_sha,
    next_phase,
    receipt
  ) {
    const result = await deps.worktree.withTopologyLock(
      operation.source_snapshot.repo,
      async () => {
        const before = await remoteRef(operation.source_snapshot.repo, branch);
        if (
          !before.ok ||
          (before.sha !== null && before.sha !== expected_sha)
        ) {
          return { ok: false, reason: before.reason || 'remote_ref_changed' };
        }
        if (before.sha !== null) {
          const deleted = await deps.gitRun(
            [
              'push',
              `--force-with-lease=refs/heads/${branch}:${before.sha}`,
              'origin',
              `:refs/heads/${branch}`
            ],
            { cwd: operation.source_snapshot.repo }
          );
          if (deleted.code !== 0) {
            return { ok: false, reason: 'remote_ref_delete_failed' };
          }
        }
        const after = await remoteRef(operation.source_snapshot.repo, branch);
        return after.ok && after.sha === null
          ? { ok: true }
          : { ok: false, reason: after.reason || 'remote_ref_delete_failed' };
      }
    );
    if (!result.ok) {
      return fail(
        operation,
        `rollback_${receipt}_failed:${result.reason || 'unknown'}`
      );
    }
    return advance(operation, next_phase, {
      receipts: { [receipt]: { at: now() } }
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
      expected_head: source.source_head,
      ...(operation.kind === 'stale_work_backup_fresh'
        ? {
            expected_base_oid: source.base_oid,
            expected_status_digest: source.status_digest
          }
        : {})
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
    return advance(
      operation,
      operation.kind === 'stale_work_backup_fresh'
        ? 'stale_worktree_removed'
        : 'worktree_removed',
      {
        receipts: { worktree_removed: { at: now() } }
      }
    );
  }

  /**
   * Re-observe the complete archived identity immediately before the first
   * cleanup mutation. A matching HEAD alone is insufficient because dirty or
   * untracked content may have changed after the archive was verified.
   *
   * @param {NonNullable<ReturnType<typeof operationOf>>} operation
   */
  async function verifyStaleCleanupSource(operation) {
    const source = operation.source_snapshot;
    if (deps.external?.get(deps.workspace, operation.bead_id)) {
      return { ok: false, reason: 'external_pr_owner' };
    }
    const remote = await remoteRef(source.repo, source.branch);
    if (!remote.ok || remote.sha !== null) {
      return {
        ok: false,
        reason: remote.reason || 'remote_branch_owner'
      };
    }
    if (source.residue === 'branch') {
      const local = await localRef(source.repo, source.branch);
      if (!local.ok) {
        return {
          ok: false,
          reason: local.reason || 'local_ref_observe_failed'
        };
      }
      if (local.sha === null) {
        return { ok: true };
      }
      if (local.sha !== source.branch_head_sha) {
        return { ok: false, reason: 'local_ref_changed' };
      }
    }
    let observed;
    try {
      observed = await deps.worktree.removeIfDiscardable({
        repo: source.repo,
        bead_id: operation.bead_id,
        base: source.base_oid,
        preserve: true
      });
    } catch {
      return { ok: false, reason: 'source_observe_failed' };
    }
    const expected = {
      worktree_realpath: source.worktree,
      branch: source.branch,
      head_sha: source.source_head,
      branch_head_sha: source.branch_head_sha,
      base_oid: source.base_oid,
      status_digest: source.status_digest
    };
    if (source.residue === 'branch') {
      if (!staleResidueIntact(expected, observed)) {
        return { ok: false, reason: 'worktree_identity_changed' };
      }
      return { ok: true };
    }
    const worktree_already_removed =
      observed.owned === true &&
      observed.identity?.worktree_realpath === null &&
      observed.identity.head_sha === null &&
      observed.identity.base_oid === source.base_oid &&
      (observed.identity.branch === null ||
        observed.identity.branch === source.branch);
    if (worktree_already_removed) {
      return { ok: true };
    }
    if (!staleResidueIntact(expected, observed)) {
      return { ok: false, reason: 'worktree_identity_changed' };
    }
    return { ok: true };
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
      const before_sha = typeof before.sha === 'string' ? before.sha : null;
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
    return advance(
      operation,
      operation.kind === 'stale_work_backup_fresh'
        ? 'stale_local_ref_removed'
        : 'local_ref_removed',
      {
        receipts: { local_ref_removed: { at: now() } }
      }
    );
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
   * @param {unknown} value
   * @returns {value is { present: boolean, value?: unknown }}
   */
  function isAuthorityValue(value) {
    if (value === null || typeof value !== 'object') {
      return false;
    }
    const candidate = /** @type {{ present?: unknown }} */ (value);
    return (
      typeof candidate.present === 'boolean' &&
      (!candidate.present || Object.hasOwn(candidate, 'value'))
    );
  }

  /**
   * @param {Record<string, any>} issue
   * @returns {Record<string, { present: boolean, value?: unknown }>|null}
   */
  function parentAuthorityOf(issue) {
    if (!issue || typeof issue !== 'object') {
      return null;
    }
    const metadata =
      issue.metadata && typeof issue.metadata === 'object'
        ? issue.metadata
        : {};
    /** @type {Record<string, { present: boolean, value?: unknown }>} */
    const authority = {};
    for (const key of [
      'spec_id',
      'plan_path',
      'spec_review',
      'plan_review',
      'plan_approval'
    ]) {
      const source = key === 'spec_id' ? issue : metadata;
      authority[key] = Object.hasOwn(source, key)
        ? { present: true, value: source[key] }
        : { present: false };
    }
    return authority;
  }

  /**
   * @param {Record<string, { present: boolean, value?: unknown }>} left
   * @param {Record<string, { present: boolean, value?: unknown }>} right
   */
  function hasSameAuthority(left, right) {
    for (const key of [
      'spec_id',
      'plan_path',
      'spec_review',
      'plan_review',
      'plan_approval'
    ]) {
      if (!isAuthorityValue(left?.[key]) || !isAuthorityValue(right?.[key])) {
        return false;
      }
      if (left[key].present !== right[key].present) {
        return false;
      }
      if (
        left[key].present &&
        JSON.stringify(left[key].value) !== JSON.stringify(right[key].value)
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * @param {any} operation
   * @param {string} next_phase
   */
  async function deletePhaseChildren(operation, next_phase) {
    const snapshot = operation.source_snapshot?.phase_children;
    if (!Array.isArray(snapshot)) {
      return fail(operation, 'phase_child_snapshot_missing');
    }
    /** @type {Set<string>} */
    const snapshot_ids = new Set();
    for (const child of snapshot) {
      if (
        !child ||
        typeof child.id !== 'string' ||
        child.id.length === 0 ||
        child.id === operation.bead_id ||
        snapshot_ids.has(child.id)
      ) {
        return fail(operation, 'phase_child_snapshot_invalid');
      }
      snapshot_ids.add(child.id);
    }
    let current_children;
    try {
      current_children = await deps.bd.listChildren(operation.bead_id);
      if (!Array.isArray(current_children)) {
        return fail(operation, 'phase_children_delete_failed');
      }
      /** @type {Set<string>} */
      const current_ids = new Set();
      for (const listed of current_children) {
        const child_id = listed?.id;
        if (
          typeof child_id !== 'string' ||
          child_id.length === 0 ||
          current_ids.has(child_id) ||
          !snapshot_ids.has(child_id)
        ) {
          return fail(operation, 'phase_child_set_changed');
        }
        current_ids.add(child_id);
        const child = await deps.bd.readIssue(child_id);
        if (
          !child ||
          child.id !== child_id ||
          child.metadata?.parent !== operation.bead_id ||
          typeof child.metadata?.plan_task_anchor !== 'string' ||
          child.metadata.plan_task_anchor.length === 0
        ) {
          return fail(operation, 'phase_children_delete_failed');
        }
        const descendants = await deps.bd.listChildren(child_id);
        if (!Array.isArray(descendants)) {
          return fail(operation, 'phase_children_delete_failed');
        }
        if (descendants.length > 0) {
          return fail(operation, 'phase_child_nested');
        }
      }
      /** @type {string[]} */
      const remaining_ids = [];
      for (const child_id of snapshot_ids) {
        const found = await deps.bd.findIssue(child_id);
        if (found === null) {
          continue;
        }
        if (!current_ids.has(child_id)) {
          return fail(operation, 'phase_child_set_changed');
        }
        remaining_ids.push(child_id);
      }
      if (remaining_ids.length > 0) {
        await deps.bd.deleteIssues(remaining_ids);
      }
    } catch {
      return fail(operation, 'phase_children_delete_failed');
    }
    try {
      for (const child_id of snapshot_ids) {
        if ((await deps.bd.findIssue(child_id)) !== null) {
          return fail(operation, 'phase_children_readback_failed');
        }
      }
      const remaining_children = await deps.bd.listChildren(operation.bead_id);
      if (
        !Array.isArray(remaining_children) ||
        remaining_children.length !== 0
      ) {
        return fail(operation, 'phase_children_readback_failed');
      }
    } catch {
      return fail(operation, 'phase_children_readback_failed');
    }
    return advance(operation, next_phase, {
      receipts: { phase_children_deleted: { at: now() } }
    });
  }

  /**
   * @param {any} operation
   * @param {string} next_phase
   */
  async function resetParent(operation, next_phase) {
    const baseline = operation.source_snapshot?.parent_authority;
    if (!baseline || typeof baseline !== 'object') {
      return fail(operation, 'parent_authority_snapshot_missing');
    }
    try {
      const before = await deps.bd.readIssue(operation.bead_id);
      const current_authority = parentAuthorityOf(before);
      if (
        !current_authority ||
        !hasSameAuthority(baseline, current_authority)
      ) {
        return fail(operation, 'bd_parent_authority_changed');
      }
      await deps.bd.updateFields(operation.bead_id, {
        status: 'open',
        unset: ['pr_url', 'impl_review', 'last_checked_sha']
      });
      const after = await deps.bd.readIssue(operation.bead_id);
      const after_authority = parentAuthorityOf(after);
      if (
        after.status !== 'open' ||
        Object.hasOwn(after.metadata || {}, 'pr_url') ||
        Object.hasOwn(after.metadata || {}, 'impl_review') ||
        Object.hasOwn(after.metadata || {}, 'last_checked_sha') ||
        !after_authority ||
        !hasSameAuthority(baseline, after_authority)
      ) {
        return fail(operation, 'bd_parent_reset_readback_failed');
      }
    } catch {
      return fail(operation, 'bd_parent_reset_failed');
    }
    return advance(operation, next_phase, {
      receipts: { parent_reset: { at: now() } }
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
        if (typeof deps.gh.revertSource !== 'function') {
          return { ok: true, operation_id, pending: 'merged_revert' };
        }
        const result = await observeMergedSource(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_phase_persist_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_source_observed') {
        const result = await prepareRevertLocal(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_prepare_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_local_prepared') {
        const result = await commitRevert(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_commit_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_local_ready') {
        const result = await pushRevert(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_push_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_remote_pushed') {
        const result = await openRevertPr(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_pr_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_pr_wait') {
        const result = await observeRevertPr(operation);
        if (!result || result.ok === false || result.pending) {
          return result || fail(operation, 'rollback_observe_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_pr_created') {
        const result = await removeRevertWorktree(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_worktree_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_worktree_removed') {
        const result = await resolveRevertBead(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_bead_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_bead_resolved') {
        const result = await bindRevertPrUrl(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_pr_url_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'revert_pr_url_bound') {
        const result = recordRevertWait(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'revert_pr_wait_persist_failed');
        }
        continue;
      }
      if (operation.phase === 'rollback_base_sync') {
        const result = await rollbackBaseSync(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'rollback_base_sync_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'rollback_verified') {
        const result = await rollbackVerify(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'rollback_verify_phase_failed');
        }
        continue;
      }
      if (operation.phase === 'rollback_source_cleanup') {
        const result = await rollbackRemoveSourceWorktree(operation);
        if (!result || result.ok === false) {
          return (
            result || fail(operation, 'rollback_source_worktree_phase_failed')
          );
        }
        continue;
      }
      if (operation.phase === 'rollback_source_local_removed') {
        const result = await rollbackRemoveLocalRef(
          operation,
          operation.source_snapshot.branch,
          operation.source_snapshot.local_branch_sha,
          'rollback_source_remote_removed',
          'rollback_source_local_removed'
        );
        if (!result || result.ok === false) {
          return (
            result || fail(operation, 'rollback_source_local_phase_failed')
          );
        }
        continue;
      }
      if (operation.phase === 'rollback_source_remote_removed') {
        const result = await rollbackRemoveRemoteRef(
          operation,
          operation.source_snapshot.branch,
          operation.source_snapshot.remote_branch_sha,
          'rollback_revert_local_removed',
          'rollback_source_remote_removed'
        );
        if (!result || result.ok === false) {
          return (
            result || fail(operation, 'rollback_source_remote_phase_failed')
          );
        }
        continue;
      }
      if (operation.phase === 'rollback_revert_local_removed') {
        const result = await rollbackRemoveLocalRef(
          operation,
          operation.revert_pr.branch,
          operation.revert_pr.head_sha,
          'rollback_revert_remote_removed',
          'rollback_revert_local_removed'
        );
        if (!result || result.ok === false) {
          return (
            result || fail(operation, 'rollback_revert_local_phase_failed')
          );
        }
        continue;
      }
      if (operation.phase === 'rollback_revert_remote_removed') {
        const result = await rollbackRemoveRemoteRef(
          operation,
          operation.revert_pr.branch,
          operation.revert_pr.head_sha,
          'rollback_phase_children_deleting',
          'rollback_revert_remote_removed'
        );
        if (!result || result.ok === false) {
          return (
            result || fail(operation, 'rollback_revert_remote_phase_failed')
          );
        }
        continue;
      }
      if (operation.phase === 'rollback_bead_opened') {
        return fail(operation, 'phase_child_snapshot_missing');
      }
      if (operation.phase === 'rollback_pr_url_cleared') {
        return fail(operation, 'phase_child_snapshot_missing');
      }
      if (
        operation.phase === 'bead_opened' ||
        operation.phase === 'bead_pr_url_cleared'
      ) {
        return fail(operation, 'phase_child_snapshot_missing');
      }
      if (operation.phase === 'rollback_finalized') {
        await deps.scheduler.tick(deps.workspace);
        const completed = deps.store.completeDiscardOperation(deps.workspace, {
          operation_id,
          expected_phase: operation.phase
        });
        if (!completed.ok) {
          return fail(operation, 'rollback_finalize_persist_failed');
        }
        notifyChanged(deps.workspace);
        return { ok: true, operation_id };
      }
      if (operation.phase === 'rollback_phase_children_deleting') {
        const result = await deletePhaseChildren(
          operation,
          'rollback_phase_children_deleted'
        );
        if (!result || result.ok === false) {
          return result || fail(operation, 'rollback_phase_children_failed');
        }
        continue;
      }
      if (operation.phase === 'rollback_phase_children_deleted') {
        const result = await resetParent(operation, 'rollback_finalized');
        if (!result || result.ok === false) {
          return result || fail(operation, 'rollback_parent_reset_failed');
        }
        continue;
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
      if (
        operation.kind === 'stale_work_backup_fresh' &&
        operation.phase === 'backup_verified'
      ) {
        const verified = await verifyStaleCleanupSource(operation);
        if (!verified.ok) {
          return fail(operation, verified.reason || 'source_verify_failed');
        }
        const result =
          operation.source_snapshot.residue === 'branch'
            ? await removeLocalRef(operation)
            : await removeWorktree(operation);
        if (!result || result.ok === false) {
          return (
            result ||
            fail(
              operation,
              operation.source_snapshot.residue === 'branch'
                ? 'local_ref_phase_persist_failed'
                : 'worktree_phase_persist_failed'
            )
          );
        }
        continue;
      }
      if (
        operation.kind === 'stale_work_backup_fresh' &&
        operation.phase === 'stale_worktree_removed'
      ) {
        const result = await removeLocalRef(operation);
        if (!result || result.ok === false) {
          return result || fail(operation, 'local_ref_phase_persist_failed');
        }
        continue;
      }
      if (
        operation.kind === 'stale_work_backup_fresh' &&
        operation.phase === 'stale_local_ref_removed'
      ) {
        const completed = deps.store.completeDiscardOperation(deps.workspace, {
          operation_id,
          expected_phase: operation.phase
        });
        if (!completed.ok) {
          return fail(operation, 'stale_work_finalize_failed');
        }
        notifyChanged(deps.workspace);
        await deps.scheduler.tick(deps.workspace);
        return { ok: true, operation_id };
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
        remote_ref_removed: (operation) =>
          deletePhaseChildren(operation, 'phase_children_deleted'),
        phase_children_deleted: (operation) =>
          resetParent(operation, 'parent_reset')
      };
      if (operation.phase === 'parent_reset') {
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
   * Start verified archive recovery for an attempt-less stale worktree. The
   * admission identity and queue revision are checked again immediately before
   * the durable operation/fence is created.
   *
   * @param {{ bead_id: string, action_id: string, expected_revision: number }} input
   */
  async function backupFresh(input) {
    const snapshot = deps.store.snapshot(deps.workspace);
    if (snapshot.revision !== input.expected_revision) {
      return { ok: false, conflict: true, reason: 'revision_conflict' };
    }
    const admission = snapshot.admission?.[input.bead_id];
    const stale_work = admission?.stale_work;
    if (
      admission?.reason !== 'worktree_stale_work' ||
      !stale_work ||
      stale_work.action_id !== input.action_id ||
      stale_work.can_backup_fresh !== true ||
      !stale_work.identity
    ) {
      return { ok: false, conflict: true, reason: 'stale_work_conflict' };
    }
    const waiting =
      snapshot.queue.some(
        (/** @type {{ bead_id: string }} */ entry) =>
          entry.bead_id === input.bead_id
      ) ||
      snapshot.serial_lanes.some(
        (/** @type {{ entries: Array<{ bead_id: string }> }} */ lane) =>
          lane.entries.some((entry) => entry.bead_id === input.bead_id)
      );
    if (!waiting) {
      return { ok: false, conflict: true, reason: 'waiting_lane_changed' };
    }
    if (
      Object.values(snapshot.discard_operations || {}).some(
        (operation) =>
          operation.bead_id === input.bead_id && operation.phase !== 'done'
      ) ||
      deps.actionInFlight?.(input.bead_id) ||
      deps.scheduler.staleWorkActionInFlight?.(
        deps.workspace,
        input.bead_id
      ) === true
    ) {
      return { ok: false, conflict: true, reason: 'action_in_flight' };
    }
    if (deps.external?.get(deps.workspace, input.bead_id)) {
      return { ok: false, conflict: true, reason: 'external_pr_owner' };
    }
    if (typeof resolve_base !== 'function') {
      return { ok: false, conflict: false, reason: 'base_resolver_missing' };
    }
    let resolved;
    try {
      resolved = await resolve_base({ force: true });
    } catch {
      return { ok: false, conflict: false, reason: 'base_observe_failed' };
    }
    // Only the base NAME is needed here (it labels the operation's
    // `target_base`). The recorded `base_oid` is the residue's own identity:
    // every later phase archives, re-observes, and removes against it, so a
    // base that moved on since the admission was recorded changes nothing the
    // backup depends on. Refusing on that drift left the card with no way
    // out — the admission only refreshes on a dispatch retry, which an
    // `auto_advance: false` workspace never runs (UI-avs8).
    if (!resolved.ok) {
      return { ok: false, conflict: true, reason: 'base_identity_changed' };
    }
    const branch = stale_work.identity.branch;
    if (typeof branch !== 'string' || branch.length === 0) {
      return { ok: false, conflict: true, reason: 'worktree_identity_changed' };
    }
    const remote = await remoteRef(deps.repo, branch);
    if (!remote.ok) {
      return { ok: false, conflict: false, reason: remote.reason };
    }
    if (remote.sha !== null) {
      return { ok: false, conflict: true, reason: 'remote_branch_owner' };
    }
    let observed;
    try {
      observed = await deps.worktree.removeIfDiscardable({
        repo: deps.repo,
        bead_id: input.bead_id,
        base: stale_work.identity.base_oid,
        preserve: true
      });
    } catch {
      return { ok: false, conflict: false, reason: 'source_observe_failed' };
    }
    if (!staleResidueIntact(stale_work.identity, observed)) {
      return { ok: false, conflict: true, reason: 'worktree_identity_changed' };
    }
    const residue = stale_work.residue === 'branch' ? 'branch' : 'worktree';
    const branch_head_sha = stale_work.identity.branch_head_sha;
    if (
      residue === 'branch' &&
      (typeof branch_head_sha !== 'string' || branch_head_sha.length === 0)
    ) {
      return { ok: false, conflict: true, reason: 'worktree_identity_changed' };
    }
    const operation_id = makeOperationId();
    const created = deps.store.createDiscardOperation(deps.workspace, {
      expected_revision: input.expected_revision,
      operation: {
        operation_id,
        bead_id: input.bead_id,
        attempt_id: null,
        kind: 'stale_work_backup_fresh',
        process_identity: null,
        source_snapshot: {
          repo: deps.repo,
          residue,
          worktree: stale_work.identity.worktree_realpath,
          branch,
          source_head: stale_work.identity.head_sha,
          branch_head_sha,
          base_oid: stale_work.identity.base_oid,
          target_base: resolved.base,
          local_branch_sha:
            residue === 'branch'
              ? branch_head_sha
              : stale_work.identity.head_sha,
          remote_branch_sha: null,
          identity_digest: stale_work.identity_digest,
          status_digest: stale_work.identity.status_digest
        }
      }
    });
    if (!created.ok) {
      return {
        ok: false,
        conflict: created.conflict,
        reason: created.reason || 'operation_create_failed'
      };
    }
    notifyChanged(deps.workspace);
    return drive(operation_id);
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
      const settled = deps.store.failDiscardOperation(deps.workspace, {
        operation_id,
        expected_phase: 'requested',
        reason: 'attempt_settling'
      });
      if (settled.ok) {
        announceDiscardFailure(input.bead_id, 'attempt_settling');
      }
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

  return {
    discard,
    backupFresh,
    recoverFences,
    recover,
    retry,
    drive,
    observeBead
  };
}
