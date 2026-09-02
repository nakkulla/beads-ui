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
import { debug } from '../logging.js';
import { acquireDeployLock } from './deploy-lock.js';
import { scriptSummary } from './failure-class.js';
import { repoOperationPolicySupported } from './repo-operation-policy.js';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { createRepoOperationTransitionLauncher } from './repo-operation-transition.js';
import {
  beginRepoOpsDisplayResolution,
  recordRepoOpsResolution,
  refreshRepoOpsDisplay
} from './repo-ops-display.js';
import {
  DEFAULT_REPO_OPS_TIMEOUT_MS,
  resolveEffectiveRepoOps,
  resolveRepoOps
} from './repo-ops-resolver.js';
import {
  normalizeScriptRetry,
  resolutionAccess,
  scriptRetryApplicable,
  scriptRetryConsumptionKey
} from './resolution-ladder.js';
import {
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from './state-paths.js';
import { createRepoOpsDeployWorktreeManager } from './worktree.js';

const default_log = debug('worker:repo-ops');

const RECONCILE_GRACE_MS = 5000;

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
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, locks: ReturnType<typeof import('./locks.js').createLockManager>, resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, fs?: typeof import('node:fs'), timeline?: { append: (input: any) => unknown }, runner?: ReturnType<typeof createRepoOperationRunner>, deployWorktree?: ReturnType<typeof createRepoOpsDeployWorktreeManager>, deployLock?: typeof acquireDeployLock, transition?: ReturnType<typeof createRepoOperationTransitionLauncher>, verifyCheckout?: { materialize: (input: any) => Promise<any>, verify: (input: any) => Promise<{ ok: boolean }>, cleanup: (input: any) => Promise<void> }, autoAdvanceRestore?: { beforeReconcile: (workspace: string) => void, afterReconcileLocked: (workspace: string) => Promise<boolean>, restoreAll: () => Promise<void> }, policySupported?: () => boolean, notify?: { needsHuman: (input: any) => Promise<void> }|null, log?: (...args: any[]) => void, now?: () => number, sleep?: (ms: number) => Promise<void> }} deps
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
  const log = deps.log || default_log;
  // The outward push (UI-jw27). Optional so every existing construction site
  // (and test) keeps working with no notifier at all — a missing one is
  // silence, never a settlement failure.
  const notify = deps.notify || null;
  const now = deps.now || (() => Date.now());
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) =>
      new Promise((resolve) => setTimeout(resolve, ms)));
  /**
   * Workspaces whose stored failed verify rows were already checked against
   * existing successes. Settlement-time sweeps keep the rows covered from then
   * on, so one pass per coordinator lifetime is enough and later reconciles
   * spend no git calls on it.
   *
   * @type {Set<string>}
   */
  const verify_coverage_swept = new Set();

  /**
   * Resolve an operation's historical/effective policy without publishing it
   * as the current target-base gate authority.
   *
   * @param {{ repo: string, previous_sha: string|null, target_sha: string, kind?: 'verify'|'deploy', gitRun: any }} input
   */
  async function resolveEffective(input) {
    return resolveEffectiveRepoOps(input);
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
   * A MANUAL run additionally hashes its issued `manual_run_id` (UI-s582 §3.5):
   * without it a second 배포 실행 on the same tip resolves to the SAME id and
   * adopts the first run's terminal record instead of running again. The key is
   * added only for a manual run, so every automatic identity is byte-identical
   * to what it hashed before.
   *
   * @param {{ effective_base_sha: string, target_base: string, target_sha: string, script_mode: string, script_blob_sha: string, manual_run_id?: number|null }} input
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
          script_blob_sha: input.script_blob_sha,
          ...(Number.isInteger(input.manual_run_id)
            ? { manual_run_id: input.manual_run_id }
            : {})
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
   * The two things a settled operation keeps from its run log: the digest that
   * gives the failure its identity, and the one line that says why the script
   * failed (2026-08-28 worker-record-timeline spec §6 row 2). Both come out of
   * ONE read — the log is already read whole for the digest, so a second pass
   * over the same bytes is the only cost.
   *
   * The summary search sees the WHOLE output, not a tail window. §6 asks for
   * the FIRST line that announces a failure, and a script that fails early and
   * then keeps printing — a `npm ci` that died before a long deploy log — puts
   * that line outside any tail. Scanning from the front is also what makes the
   * "last non-empty line" fallback mean what it says.
   *
   * @param {string} file
   * @returns {{ digest: string|null, summary: string|null }}
   */
  function logEvidence(file) {
    /** @type {Buffer} */
    let raw;
    try {
      raw = fs.readFileSync(file);
    } catch {
      return { digest: null, summary: null };
    }
    const digest = crypto.createHash('sha256').update(raw).digest('hex');
    return { digest, summary: scriptSummary(raw.toString('utf8')) };
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
   * @param {string} ancestor_ref
   * @param {string} descendant_sha
   * @returns {Promise<'ancestor'|'not_ancestor'|'unknown'>}
   */
  async function ancestryStatus(ancestor_ref, descendant_sha) {
    try {
      const result = await deps.gitRun(
        ['merge-base', '--is-ancestor', ancestor_ref, descendant_sha],
        { cwd: deps.repo }
      );
      if (result.code === 0) {
        return 'ancestor';
      }
      return result.code === 1 ? 'not_ancestor' : 'unknown';
    } catch {
      return 'unknown';
    }
  }

  /**
   * What a later success must contain to cover a failed deploy record: the
   * target it bound, or — when it died before binding one — every subject
   * commit it was created to deploy.
   *
   * `effective_base_sha` is deliberately NOT a fallback. It names the commit
   * deployed BEFORE this record, so a record that failed pre-bind would be
   * covered by the very success that preceded it, and the merge it existed to
   * deploy would be marked delivered while its cleanup still reports the
   * failure — a row that can never converge.
   *
   * @param {any} operation
   * @returns {string[]} Refs that must all be contained, empty when unprovable.
   */
  function coverageRefsOf(operation) {
    if (typeof operation.target_sha === 'string' && operation.target_sha) {
      return [operation.target_sha];
    }
    /** @type {any[]} */
    const subjects = Array.isArray(operation.subjects)
      ? operation.subjects
      : [];
    /** @type {string[]} */
    const merged = subjects
      .map((subject) => subject?.merged_sha)
      .filter(
        (merged_sha) => typeof merged_sha === 'string' && merged_sha.length > 0
      );
    return merged.length > 0 && merged.length === subjects.length ? merged : [];
  }

  /**
   * @param {string[]} refs
   * @param {string} descendant_sha
   */
  async function coversEvery(refs, descendant_sha) {
    if (refs.length === 0) {
      return false;
    }
    for (const ref of refs) {
      if (!(await isCoveredByDescendant(ref, descendant_sha))) {
        return false;
      }
    }
    return true;
  }

  /**
   * The PR heads one verify record stands for. `verify_head_shas` collects
   * every head that adopted the record; the original `verify_head_sha` is the
   * fallback for a row written before the list existed.
   *
   * @param {any} operation
   * @returns {string[]}
   */
  function verifyHeadsOf(operation) {
    /** @type {string[]} */
    const heads = Array.isArray(operation.verify_head_shas)
      ? operation.verify_head_shas.filter(
          (/** @type {unknown} */ sha) => typeof sha === 'string' && sha
        )
      : [];
    if (
      heads.length === 0 &&
      typeof operation.verify_head_sha === 'string' &&
      operation.verify_head_sha
    ) {
      heads.push(operation.verify_head_sha);
    }
    return heads;
  }

  /**
   * A later verify success covers a failed verify row when one of the success
   * heads descends from one of the failed row's heads: the same PR line moved
   * past the failing commit and the candidate built on it passed. Rows keyed
   * by candidate tree never collide, so without this the failed row would
   * outlive the merge it blocked and keep asking for resolution.
   *
   * @param {any} failed
   * @param {any} succeeded
   */
  async function verifyCovers(failed, succeeded) {
    const failed_heads = verifyHeadsOf(failed);
    const succeeded_heads = verifyHeadsOf(succeeded);
    for (const failed_head of failed_heads) {
      for (const succeeded_head of succeeded_heads) {
        if (
          failed_head === succeeded_head ||
          (await isCoveredByDescendant(failed_head, succeeded_head))
        ) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Durably cover failed verify rows when a same-repo verify success on a
   * descendant head exists, regardless of which row settled last. Mirrors the
   * deploy branch of {@link sweepDescendantCoverage} with head ancestry in
   * place of target containment.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} settled
   */
  async function sweepVerifyCoverage(workspace, operation_id, settled) {
    const queue = deps.store.snapshot(workspace);
    if (settled.state === 'succeeded') {
      for (const [failed_id, failed] of Object.entries(queue.repo_operations)) {
        if (
          failed.kind !== 'verify' ||
          failed.repo_id !== settled.repo_id ||
          failed.state !== 'failed' ||
          failed.superseded_by ||
          !(await verifyCovers(failed, settled))
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
    for (const [succeeded_id, succeeded] of Object.entries(
      queue.repo_operations
    )) {
      if (
        succeeded.kind !== 'verify' ||
        succeeded.repo_id !== settled.repo_id ||
        succeeded.state !== 'succeeded' ||
        !(await verifyCovers(settled, succeeded))
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
  }

  /**
   * Cover the failed verify rows a workspace already holds — rows settled
   * before the verify coverage sweep existed, or while the server was down —
   * against the successes stored next to them.
   *
   * @param {string} workspace
   */
  async function sweepStoredVerifyCoverage(workspace) {
    try {
      const queue = deps.store.snapshot(workspace);
      for (const [operation_id, operation] of Object.entries(
        queue.repo_operations
      )) {
        if (
          operation.kind !== 'verify' ||
          operation.state !== 'failed' ||
          operation.superseded_by
        ) {
          continue;
        }
        await sweepVerifyCoverage(workspace, operation_id, operation);
      }
    } catch {
      return;
    }
  }

  /**
   * Durably cover failed deploy and verify rows when terminal settlement
   * proves a successful descendant, regardless of which row settled last.
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
        (settled.state !== 'succeeded' && settled.state !== 'failed')
      ) {
        return;
      }
      if (settled.kind === 'verify') {
        await sweepVerifyCoverage(workspace, operation_id, settled);
        return;
      }
      // Descendant coverage is a DEPLOY adoption: a newer HEAD containing the
      // target proves the delivery is on disk. A post-merge job is an ACTION,
      // not a state — a newer tree containing its target says nothing about
      // whether the script ever ran (UI-i60a §2), so a job record is never
      // covered by, and never covers, another operation.
      if (settled.kind !== 'deploy') {
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
          if (
            !(await coversEvery(coverageRefsOf(failed), settled.target_sha))
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
      const refs = coverageRefsOf(settled);
      if (refs.length === 0) {
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
          !(await coversEvery(refs, succeeded.target_sha))
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
   * Put one settled operation failure on the timeline of every bead the
   * operation was carrying (record-timeline-retention §5).
   *
   * A deploy can coalesce several merges onto one target, so the operation has
   * a LIST of subjects and each of those beads needs the failure in its own
   * history — a bead whose deploy failed must not have to know which other
   * beads shared the run to find that out.
   *
   * The summary is `logEvidence`'s already-extracted line (spec §6 row 2), the
   * same string the durable failure record carries. The append result is
   * ignored: a settled failure is settled whether or not its history line
   * survived.
   *
   * @param {any} operation - The operation as it stands at settlement.
   * @param {string} operation_id
   * @param {{ code: string, exit_code?: number|null }} failure
   * @param {string|null} summary
   */
  function recordOperationFailure(operation, operation_id, failure, summary) {
    if (!deps.timeline) {
      return;
    }
    const kind_label =
      operation?.kind === 'verify'
        ? '검증'
        : operation?.kind === 'job'
          ? '잡'
          : '배포';
    const exit_code = failure.exit_code ?? null;
    const line = [
      `${failure.code}`,
      ...(typeof exit_code === 'number' ? [`exit ${exit_code}`] : []),
      ...(typeof summary === 'string' && summary.length > 0 ? [summary] : [])
    ].join(' · ');
    for (const subject of Array.isArray(operation?.subjects)
      ? operation.subjects
      : []) {
      const bead_id = subject?.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      deps.timeline.append({
        bead_id,
        kind: 'operation_failed',
        // The OPERATION id, which §5 names as the alternative to a sequence: an
        // operation fails once, and a settlement replayed after a restart
        // re-appends the same id for the same run.
        seq: operation_id,
        summary: `${kind_label} 실패 — ${line}`,
        ...(typeof operation?.log_path === 'string' &&
        operation.log_path.length > 0
          ? { log_path: operation.log_path }
          : {})
      });
    }
  }

  /**
   * Announce a `[배포 실행]` click that ended in a terminal failure (UI-jw27
   * §2). Reached only from the branch of {@link settleFailure} that has already
   * written the durable settlement AND has no retry left — a deferred
   * `script_retry` returns before this, so a run that still has a ladder step
   * is not announced as a wall.
   *
   * MANUAL origin only. An automatic deploy's terminal failure is announced by
   * `completion-intent.js terminalize()`, which owns that class; announcing it
   * here as well would send the same wall twice under two names.
   *
   * @param {any} operation - The settled record, read back before the write.
   * @param {{ code: string, detail?: string }} failure
   * @param {string|null} summary
   */
  function announceManualDeployFailure(operation, failure, summary) {
    if (
      !notify ||
      operation?.source !== 'manual' ||
      !Number.isInteger(operation?.manual_run_id)
    ) {
      return;
    }
    const subject = Array.isArray(operation.subjects)
      ? operation.subjects.find(
          (/** @type {any} */ entry) =>
            typeof entry?.bead_id === 'string' && entry.bead_id.length > 0
        )
      : null;
    try {
      Promise.resolve(
        notify.needsHuman({
          bead_id: subject ? subject.bead_id : 'manual',
          failure_class: '수동 배포 실패',
          reason: failure.code,
          reason_detail: summary ?? failure.detail ?? null,
          next_action: '재클릭 또는 [세션에서 해결]',
          repo: deps.repo
        })
      ).catch((err) => {
        log('manual deploy failure notify failed: %o', err);
      });
    } catch (err) {
      log('manual deploy failure notify failed: %o', err);
    }
  }

  /**
   * Durable failure settlement with the master §5 fingerprint identity.
   *
   * @param {string} workspace
   * @param {any} operation
   * @param {string} operation_id
   * @param {{ code: string, detail?: string, interrupted?: boolean, exit_code?: number|null, signal?: string|null, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }} failure
   */
  async function settleFailure(workspace, operation, operation_id, failure) {
    const current =
      deps.store.snapshot(workspace).repo_operations[operation_id] || operation;
    const evidence = current.log_path
      ? logEvidence(current.log_path)
      : { digest: null, summary: null };
    const log_digest = evidence.digest;
    const failure_record = {
      code: failure.code,
      fingerprint: failureFingerprint({
        code: failure.code,
        exit_code: failure.exit_code ?? null,
        signal: failure.signal ?? null,
        log_digest
      }),
      detail: failure.detail ?? '',
      interrupted: failure.interrupted === true,
      ...(evidence.summary === null ? {} : { summary: evidence.summary }),
      ...(failure.fetch_failure === 'timeout' ||
      failure.fetch_failure === 'nonzero'
        ? { fetch_failure: failure.fetch_failure }
        : {}),
      ...(Number.isFinite(failure.elapsed_ms) && Number(failure.elapsed_ms) >= 0
        ? { elapsed_ms: Number(failure.elapsed_ms) }
        : {})
    };
    const access = resolutionAccess({
      policy_supported: policySupported(),
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
        failure: failure_record
      });
      return 'retry_pending';
    }
    const blocked_reason =
      current.state === 'running' &&
      current.retry === null &&
      !policySupported()
        ? 'schema_unsupported'
        : null;
    // A record that is ALREADY terminal is a no-op for the store, so the
    // announcement below is bound to the same fact: this pass is what wrote the
    // failure. A reconcile that re-settles the same run therefore sends nothing
    // (UI-jw27 §2).
    const settled_before =
      current.state === 'succeeded' || current.state === 'failed';
    deps.store.settleRepoOperation(workspace, {
      operation_id,
      attempt_id: current.attempt_id,
      exit_code: failure.exit_code ?? null,
      signal: failure.signal ?? null,
      log_digest,
      failure: failure_record,
      retry_outcome:
        current.retry === null &&
        (blocked_reason !== null || !scriptRetryApplicable(current))
          ? 'not_applicable'
          : undefined,
      retry_blocked_reason: blocked_reason
    });
    if (
      !settled_before &&
      deps.store.snapshot(workspace).repo_operations[operation_id]?.state ===
        'failed'
    ) {
      announceManualDeployFailure(current, failure_record, evidence.summary);
    }
    recordOperationFailure(current, operation_id, failure, evidence.summary);
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
          : typeof operation.target_sha !== 'string'
            ? { ok: false }
            : // A job's readback is EXACT, never covered: the run is only
              // evidence for the tree it was aligned to, so a worktree that
              // moved on during the script invalidates it (UI-i60a §2).
              operation.kind === 'job'
              ? await deploy_worktree.verifyAligned({
                  repo: deps.repo,
                  target_sha: operation.target_sha
                })
              : typeof deploy_worktree.verifyCovered === 'function'
                ? await deploy_worktree.verifyCovered({
                    repo: deps.repo,
                    target_sha: operation.target_sha
                  })
                : await deploy_worktree.verifyAligned({
                    repo: deps.repo,
                    target_sha: operation.target_sha
                  });
      if (!aligned.ok) {
        const deploy_code =
          'code' in aligned && aligned.code === 'repo_ops_worktree_unowned'
            ? aligned.code
            : 'deploy_worktree_residue';
        await settleFailure(workspace, operation, operation_id, {
          code:
            operation.kind === 'verify'
              ? 'verify_candidate_mismatch'
              : deploy_code,
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
   * This workspace's per-kind opt-out from the declared repository operations
   * (UI-lsti §2). Read fresh on every decision — the setting is a durable queue
   * field a user can flip between two operations.
   *
   * @returns {{ verify: boolean, deploy: boolean }}
   */
  function optOutOf() {
    const stored = deps.store.snapshot(deps.workspace).repo_ops_opt_out;
    return {
      verify: stored?.verify === true,
      deploy: stored?.deploy === true
    };
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
    const policy = await resolveEffective({
      repo: deps.repo,
      previous_sha: candidate.base_sha,
      target_sha: candidate.final_sha || candidate.head_sha,
      kind: 'verify',
      gitRun: deps.gitRun
    });
    if (!policy.policy || !policy.target) {
      return policy;
    }
    if (optOutOf().verify) {
      return { ok: true, inert: true, opted_out: true };
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
    // materialize는 await다 — 그 사이 사용자가 opt-out을 켰다면 작업을 사전기록
    // 하기 전에 멈춘다. opt-out은 "새 작업을 만들지 않는다"는 뜻이므로 판정은
    // 진입 시점이 아니라 생성 직전 값이 소유한다. 이미 만든 checkout은 되돌린다.
    if (optOutOf().verify) {
      await verify_checkout.cleanup({
        repo: deps.repo,
        path: materialized.path
      });
      return { ok: true, inert: true, opted_out: true };
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
      inherited.verify_head_shas.includes(candidate.head_sha.toLowerCase()) &&
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
          operation_id
        });
      }
      throw new Error('repo_operation_spawn_failed');
    }
    if (!started.ok || !started.process_identity) {
      if (input.retry === true) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id
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
   * @param {{ declaration: any, target_sha: string, retry?: boolean, manual?: boolean }} plan
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
      // A retry re-binds for real: the contract lets a target that moved while
      // the first attempt failed supersede this record (§3.2), and that verdict
      // needs the remote. A FIRST attempt is different — its caller pinned the
      // target from a fetch that already happened, everything below runs on
      // `plan.target_sha` rather than on what a rebind resolves, and re-fetching
      // it only lets a transient network failure kill a deploy whose target is
      // already in this repository. Monotonicity is judged below against the
      // deploy worktree HEAD, never against the store's last success. A target
      // this repository cannot resolve still needs the remote.
      const present =
        plan.retry === true
          ? { code: 1, stdout: '', stderr: '' }
          : await deps.gitRun(
              [
                'rev-parse',
                '--verify',
                '--quiet',
                `${plan.target_sha}^{commit}`
              ],
              { cwd: deps.repo }
            );
      /** @type {{ ok: boolean, code?: string, target_sha?: string, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }} */
      const rebound =
        present.code === 0
          ? bindPinnedTarget(plan.target_sha)
          : await deploy_worktree.bindTarget({
              repo: deps.repo,
              base: operation.target_base
            });
      if (!rebound.ok || typeof rebound.target_sha !== 'string') {
        const code = rebound.code || 'repo_ops_target_unresolved';
        if (plan.retry === true) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            blocked_reason: code
          });
        } else {
          await settleFailure(workspace, operation, operation_id, {
            code,
            fetch_failure: rebound.fetch_failure,
            elapsed_ms: rebound.elapsed_ms
          });
        }
        return {
          ok: false,
          code,
          operation_id,
          ...(rebound.fetch_failure
            ? {
                fetch_failure: rebound.fetch_failure
              }
            : {}),
          ...(Number.isFinite(rebound.elapsed_ms)
            ? { elapsed_ms: rebound.elapsed_ms }
            : {})
        };
      }

      const state =
        typeof deploy_worktree.readState === 'function'
          ? await deploy_worktree.readState({ repo: deps.repo })
          : { ok: true, head: null, clean: true };
      if (
        !state.ok &&
        'code' in state &&
        state.code === 'repo_ops_worktree_unowned'
      ) {
        const code = 'repo_ops_worktree_unowned';
        if (plan.retry === true) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            blocked_reason: code
          });
        } else {
          await settleFailure(workspace, operation, operation_id, { code });
        }
        return { ok: false, code, operation_id };
      }
      if (state.ok && state.clean === true && typeof state.head === 'string') {
        const target_status =
          state.head === plan.target_sha
            ? 'ancestor'
            : await ancestryStatus(plan.target_sha, state.head);
        // A worktree HEAD that already contains the target ends an AUTOMATIC
        // record: the delivery it exists for is provably on disk. A MANUAL run
        // means the opposite — the person asked for this exact tip to be
        // deployed AGAIN — so it aligns and runs instead of settling as
        // covered/superseded (UI-s582 §3.4).
        if (target_status === 'ancestor' && plan.manual !== true) {
          // The record must name the SHA that is actually on disk: the
          // coverage sweep below and `deploymentEvidence` both skip a success
          // without `target_sha`, which left every session-predeployed target
          // unable to cover the failed deploy it repaired (UI-j2f0).
          deps.store.settleRepoOperation(workspace, {
            operation_id,
            attempt_id: operation.attempt_id,
            exit_code: 0,
            signal: null,
            target_sha: state.head,
            ...(typeof state.path === 'string' && state.path
              ? { deploy_worktree: state.path }
              : {})
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
        if (target_status !== 'ancestor') {
          const head_status = await ancestryStatus(state.head, plan.target_sha);
          if (head_status !== 'ancestor') {
            const code =
              target_status === 'not_ancestor' && head_status === 'not_ancestor'
                ? 'remote_history_not_monotonic'
                : 'repo_ops_ancestry_check_failed';
            if (plan.retry === true) {
              deps.store.settleConsumedRepoOperationRetry(workspace, {
                operation_id,
                blocked_reason: code
              });
            } else {
              await settleFailure(workspace, operation, operation_id, { code });
            }
            return { ok: false, code, operation_id };
          }
        }
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
   * @param {{ declaration: any, classification: string, target_sha: string, retry?: boolean, manual?: boolean }} plan
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
   * Pin a target SHA the caller already resolved, without touching the remote:
   * the fetch that produced it has already happened, so re-resolving it here
   * would only replace a decided target with the remote's CURRENT tip.
   *
   * Monotonicity is NOT judged here. The contract measures it against the
   * deploy worktree HEAD (the durable SHA), and that judgment runs right after
   * binding: a target the HEAD already descends from settles as `superseded`,
   * only a target unrelated to it is `remote_history_not_monotonic`. Comparing
   * against the store's last successful record instead refused a zero-commit
   * landing whose head merely sat behind a newer deploy (UI-avs8 follow-up).
   *
   * @param {unknown} pinned_sha
   * @returns {{ ok: boolean, code?: string, target_sha?: string }}
   */
  function bindPinnedTarget(pinned_sha) {
    if (typeof pinned_sha !== 'string' || !/^[0-9a-f]{40}$/i.test(pinned_sha)) {
      return { ok: false, code: 'repo_ops_target_unresolved' };
    }
    return { ok: true, target_sha: pinned_sha.toLowerCase() };
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
    /** @type {{ ok: boolean, code?: string, target_sha?: string, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }} */
    let bound;
    if (subject.target_sha === undefined) {
      bound = await deploy_worktree.bindTarget({
        repo: deps.repo,
        base: subject.target_base
      });
    } else {
      bound = bindPinnedTarget(subject.target_sha);
    }
    if (!bound.ok || typeof bound.target_sha !== 'string') {
      return {
        ok: false,
        code: bound.code || 'repo_ops_target_unresolved',
        ...(bound.fetch_failure ? { fetch_failure: bound.fetch_failure } : {}),
        ...(Number.isFinite(bound.elapsed_ms)
          ? { elapsed_ms: bound.elapsed_ms }
          : {})
      };
    }
    const target_sha = bound.target_sha;
    const manual = subject.source === 'manual';
    // The ONE previous-base exception (UI-s582 §3.2), manual path only: policy
    // and script come from the TIP being deployed rather than from the base the
    // last success ran under. The tip is a commit that already landed on
    // `<remote>/<base>`, so this is not an unreviewed script executing itself —
    // and it is the only way a `[deploy]` activation landing (previous base has
    // no declaration) can ever be run.
    /** @type {any} */
    const policy = await resolveEffective({
      repo: deps.repo,
      previous_sha:
        manual || subject.policy_source === 'target_tip'
          ? target_sha
          : previous_sha,
      target_sha,
      kind: 'deploy',
      gitRun: deps.gitRun
    });
    if (!policy.policy || !policy.target) return policy;
    if (optOutOf().deploy) {
      return { ok: true, inert: true, opted_out: true };
    }
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
    // containment 검사는 await다 — verify와 같은 이유로, 사전기록(그리고 그 앞의
    // bootstrap attach 변이) 직전 값이 판정을 소유한다.
    if (optOutOf().deploy) {
      return { ok: true, inert: true, opted_out: true };
    }
    const effective_base_sha = previous_sha || target_sha;
    const operation_id = operationId({
      effective_base_sha,
      target_base: subject.target_base,
      target_sha,
      script_mode: declaration.mode,
      script_blob_sha: declaration.blob_sha,
      ...(manual && Number.isInteger(subject.manual_run_id)
        ? { manual_run_id: subject.manual_run_id }
        : {})
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
      ...(manual
        ? {
            source: /** @type {const} */ ('manual'),
            // The click-time tip, durable from the prerecord on: a manual
            // record that waits behind another operation must still launch at
            // the tip it was authorized against, not at whatever the remote
            // has moved to by then (UI-s582 §3.5).
            target_sha,
            ...(Number.isInteger(subject.manual_run_id)
              ? { manual_run_id: subject.manual_run_id }
              : {})
          }
        : {}),
      bootstrap_provenance: subject.bootstrap_provenance || null
    });
    if (!prerecord.ok)
      return { ok: false, code: 'repo_operation_prerecord_failed' };
    const operations = prerecord.queue.repo_operations;
    if (operations[operation_id].state !== 'queued')
      return {
        ok: true,
        operation_id,
        adopted: true,
        timeout_ms: declaration.timeout_ms
      };
    // Durable per-repo serialization: while another operation runs, the queued
    // record waits for a later reconcile instead of racing the worktree.
    if (runningOperationFor(operations, operation_id)) {
      return {
        ok: true,
        operation_id,
        queued: true,
        timeout_ms: declaration.timeout_ms
      };
    }
    const launched = await launchRecorded(workspace, operation_id, {
      declaration,
      classification: policy.classification,
      target_sha,
      ...(manual ? { manual: true } : {})
    });
    return launched.ok
      ? { ...launched, timeout_ms: declaration.timeout_ms }
      : launched;
  }

  // -------------------------------------------------------------------------
  // The post-merge job lane (UI-i60a §2): kind `job` rides the deploy envelope
  // — durable prerecord, the shared `.repo-ops-deploy` worktree, the
  // cross-process deploy lock, the deploy timeout, the runner's log directory,
  // and the tracked-clean readback — with ONE deliberate divergence. Deploy
  // adopts a newer containing HEAD as success without running; a job may not,
  // because "the tree is on disk" is not "the script ran".
  // -------------------------------------------------------------------------

  /**
   * Identity of one post-merge job RUN. Deploy hashes what it delivers so two
   * requests for the same delivery coalesce; a job hashes its ATTEMPT instead,
   * because a terminal RepoOperation never reopens and the retry reconcile
   * (§3 branch ③) has to be able to record a genuinely new run of the same
   * file at the same target. The ledger, not this id, is what keeps the file
   * to one application.
   *
   * @param {{ target_sha: string, script_path: string, script_blob_sha: string, attempt: number }} input
   */
  function jobOperationId(input) {
    return crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          repo: deps.repo,
          kind: 'job',
          target_sha: input.target_sha,
          script_path: input.script_path,
          script_blob_sha: input.script_blob_sha,
          attempt: input.attempt
        })
      )
      .digest('hex')
      .slice(0, 24);
  }

  /**
   * How many runs of this exact job file at this exact target already have a
   * record. Reading it inside the lock is what makes the next id fresh without
   * a clock or a counter.
   *
   * @param {Record<string, any>} operations
   * @param {{ target_sha: string, script_path: string, script_blob_sha: string }} input
   */
  function jobAttemptCount(operations, input) {
    let count = 0;
    for (const operation of Object.values(operations || {})) {
      if (
        operation &&
        operation.kind === 'job' &&
        operation.repo_id === deps.repo &&
        operation.target_sha === input.target_sha &&
        operation.script_path === input.script_path &&
        operation.script_blob_sha === input.script_blob_sha
      ) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * The `[deploy]` declaration's timeout at the job's own target, or the
   * default when the repository declares none. Identical resolution to deploy's
   * (§2), so a repository tunes both with one number.
   *
   * @param {string} target_sha
   * @returns {Promise<{ ok: boolean, code?: string, timeout_ms?: number }>}
   */
  async function jobTimeoutFor(target_sha) {
    /** @type {any} */
    const resolved = await resolveRepoOps({
      repo: deps.repo,
      sha: target_sha,
      gitRun: deps.gitRun
    });
    if (resolved.ok === false) {
      return { ok: false, code: resolved.code || 'repo_ops_config_invalid' };
    }
    const declared = resolved.deploy?.timeout_ms;
    return {
      ok: true,
      timeout_ms:
        Number.isInteger(declared) && Number(declared) > 0
          ? Number(declared)
          : DEFAULT_REPO_OPS_TIMEOUT_MS
    };
  }

  /**
   * Align the shared runtime worktree to the job's exact target under the
   * cross-process deploy lock, refusing every outcome that is not "HEAD is the
   * merge commit this job was discovered in".
   *
   * A HEAD that already CONTAINS the target is the monotonicity refusal §2
   * names: rewinding the shared runtime source to run a job would deploy an
   * older tree as a side effect, and the newer tree is not evidence the job
   * ran. Unreadable ancestry fails the same way rather than guessing.
   *
   * `onAligned` runs INSIDE the lock, right after the exact-HEAD read and
   * before the release. §2 conditions the spawn on "the aligned worktree HEAD
   * is `merge_sha`", and a caller that spawned after the release would only
   * have proved that it WAS, since another executor holding the same lock can
   * realign the shared worktree in the gap. The callback holds the lock for the
   * spawn alone, never for the run: the script's own window is covered by the
   * post-exit exact `verifyAligned` readback, which fails the operation — and
   * so writes no `applied` — if the worktree moved underneath it.
   *
   * @param {string} target_sha
   * @param {number} timeout_ms
   * @param {(path: string) => Promise<void>} [onAligned]
   * @returns {Promise<{ ok: boolean, code?: string, path?: string }>}
   */
  async function alignJobWorktree(target_sha, timeout_ms, onAligned) {
    const acquired = await deployLock({ repo: deps.repo, timeout_ms });
    if (!acquired.ok) {
      return { ok: false, code: acquired.code };
    }
    try {
      const state =
        typeof deploy_worktree.readState === 'function'
          ? await deploy_worktree.readState({ repo: deps.repo })
          : { ok: true, head: null, clean: true };
      if (!state.ok) {
        return {
          ok: false,
          code:
            'code' in state && typeof state.code === 'string'
              ? state.code
              : 'repo_ops_worktree_unreadable'
        };
      }
      if (typeof state.head === 'string' && state.head !== target_sha) {
        const head_contains_target = await ancestryStatus(
          target_sha,
          state.head
        );
        const target_contains_head = await ancestryStatus(
          state.head,
          target_sha
        );
        if (
          head_contains_target !== 'not_ancestor' ||
          target_contains_head !== 'ancestor'
        ) {
          return { ok: false, code: 'post_merge_job_target_moved' };
        }
      }
      const aligned = await deploy_worktree.ensureAligned({
        repo: deps.repo,
        workspace: deps.workspace,
        target_sha
      });
      if (!aligned.ok || typeof aligned.path !== 'string') {
        return {
          ok: false,
          code: aligned.code || 'repo_ops_worktree_align_failed'
        };
      }
      // §2's spawn-time condition, asserted as its own read: the worktree HEAD
      // IS the merge commit, not merely something that contains it.
      const exact = await deploy_worktree.verifyAligned({
        repo: deps.repo,
        target_sha
      });
      if (!exact.ok) {
        return { ok: false, code: 'post_merge_job_target_moved' };
      }
      if (typeof onAligned === 'function') {
        await onAligned(aligned.path);
      }
      return { ok: true, path: aligned.path };
    } finally {
      await acquired.release();
    }
  }

  /**
   * Phase 1 of a job run: prove the target is runnable and write the durable
   * record, WITHOUT spawning. The caller writes the ledger `intent` naming the
   * returned operation before calling {@link launchJob}, which is what makes a
   * refusal here (a moved target above all) leave the ledger untouched — a
   * later merge then finds the same content-addressed key still pending.
   *
   * @param {{ target_base: string, target_sha: string, bead_id: string, script_path: string, script_mode: string, script_blob_sha: string }} input
   */
  async function prepareJob(input) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      return await prepareJobLocked(input);
    } finally {
      release();
    }
  }

  /**
   * @param {{ target_base: string, target_sha: string, bead_id: string, script_path: string, script_mode: string, script_blob_sha: string }} input
   */
  async function prepareJobLocked(input) {
    const workspace = deps.workspace;
    const target_sha =
      typeof input.target_sha === 'string' &&
      /^[0-9a-f]{40}$/i.test(input.target_sha)
        ? input.target_sha.toLowerCase()
        : null;
    const script_blob_sha =
      typeof input.script_blob_sha === 'string' &&
      /^[0-9a-f]{40}$/i.test(input.script_blob_sha)
        ? input.script_blob_sha.toLowerCase()
        : null;
    if (
      target_sha === null ||
      script_blob_sha === null ||
      typeof input.script_path !== 'string' ||
      input.script_path.length === 0 ||
      typeof input.script_mode !== 'string' ||
      input.script_mode.length === 0 ||
      typeof input.bead_id !== 'string' ||
      input.bead_id.length === 0
    ) {
      return { ok: false, code: 'post_merge_job_input_invalid' };
    }
    const timeout = await jobTimeoutFor(target_sha);
    if (!timeout.ok || !Number.isInteger(timeout.timeout_ms)) {
      return { ok: false, code: timeout.code || 'repo_ops_config_invalid' };
    }
    const timeout_ms = Number(timeout.timeout_ms);
    const operations = deps.store.snapshot(workspace).repo_operations;
    // Durable per-repo serialization, refused BEFORE any record exists: a job
    // that queued behind another operation would have nothing to launch it,
    // because a queued job is never auto-launched (see the reconcile).
    if (runningOperationFor(operations, null)) {
      return { ok: false, code: 'repo_operation_busy' };
    }
    const aligned = await alignJobWorktree(target_sha, timeout_ms);
    if (!aligned.ok || typeof aligned.path !== 'string') {
      return {
        ok: false,
        code: aligned.code || 'repo_ops_worktree_align_failed'
      };
    }
    const operation_id = jobOperationId({
      target_sha,
      script_path: input.script_path,
      script_blob_sha,
      attempt: jobAttemptCount(operations, {
        target_sha,
        script_path: input.script_path,
        script_blob_sha
      })
    });
    const prerecord = deps.store.ensureRepoOperation(workspace, {
      operation_id,
      repo_id: deps.repo,
      kind: 'job',
      subjects: [{ bead_id: input.bead_id, merged_sha: target_sha }],
      effective_base_sha: target_sha,
      target_base: input.target_base,
      target_sha,
      deploy_worktree: aligned.path,
      script_path: input.script_path,
      script_mode: input.script_mode,
      script_blob_sha
    });
    if (!prerecord.ok) {
      return { ok: false, code: 'repo_operation_prerecord_failed' };
    }
    return { ok: true, operation_id, timeout_ms, path: aligned.path };
  }

  /**
   * Phase 2 of a job run: re-align and spawn the record {@link prepareJob}
   * wrote and the caller's ledger now names.
   *
   * @param {{ operation_id: string }} input
   */
  async function launchJob(input) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      const workspace = deps.workspace;
      const operation =
        deps.store.snapshot(workspace).repo_operations[input.operation_id];
      if (!operation || operation.kind !== 'job') {
        return { ok: false, code: 'repo_operation_missing' };
      }
      if (operation.state !== 'queued' && operation.state !== 'retry_pending') {
        return { ok: true, operation_id: input.operation_id, adopted: true };
      }
      return await launchRecordedJob(workspace, input.operation_id, operation, {
        retry: operation.state === 'retry_pending'
      });
    } finally {
      release();
    }
  }

  /**
   * Align and spawn one already-prerecorded job. Shared by the first launch and
   * by the reconcile's `script_retry` relaunch, so the retry re-proves the
   * exact-target condition instead of trusting the first attempt's alignment.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {any} operation
   * @param {{ retry?: boolean }} plan
   */
  async function launchRecordedJob(workspace, operation_id, operation, plan) {
    const target_sha = operation.target_sha;
    /**
     * @param {string} code
     */
    async function refuse(code) {
      if (plan.retry === true) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
          blocked_reason: code
        });
      } else {
        await settleFailure(workspace, operation, operation_id, { code });
      }
      return { ok: false, code, operation_id };
    }
    if (
      typeof target_sha !== 'string' ||
      typeof operation.script_path !== 'string' ||
      operation.script_path.length === 0
    ) {
      return await refuse('post_merge_job_identity_missing');
    }
    const timeout = await jobTimeoutFor(target_sha);
    if (!timeout.ok || !Number.isInteger(timeout.timeout_ms)) {
      return await refuse(timeout.code || 'repo_ops_config_invalid');
    }
    const timeout_ms = Number(timeout.timeout_ms);
    // The spawn happens inside the align lock (§2): between the exact-HEAD read
    // and a spawn made after the release, another executor can realign the
    // shared worktree, and the job would then run against a tree that is not
    // the merge commit it was discovered in.
    /** @type {any} */
    let spawned = null;
    const aligned = await alignJobWorktree(
      target_sha,
      timeout_ms,
      async (aligned_path) => {
        spawned = await spawnRecorded(workspace, operation_id, operation, {
          script_path: path.join(aligned_path, operation.script_path),
          cwd: aligned_path,
          target_sha,
          timeout_ms,
          deploy_worktree: aligned_path,
          retry: plan.retry === true
        });
      }
    );
    if (!aligned.ok || typeof aligned.path !== 'string') {
      return await refuse(aligned.code || 'repo_ops_worktree_align_failed');
    }
    return spawned;
  }

  /**
   * The terminal evidence of one job record, with no coverage adoption of any
   * kind. `unknown` is a record that is not there (or not a job) — which the
   * ledger reads as an interruption, never as a run that succeeded.
   *
   * `started` is the durable invocation trace `startRepoOperation` writes, the
   * same marker `resolution-ladder.scriptIdentity` reads as "a runner was
   * actually invoked". The ledger needs it because a record that failed BEFORE
   * any spawn (a refused re-alignment above all) did not leave an unknown
   * effect behind — it left none — so its key is still plainly pending.
   *
   * @param {string} operation_id
   */
  function jobEvidence(operation_id) {
    const operation = observe(operation_id);
    if (!operation || operation.kind !== 'job') {
      return {
        state: /** @type {const} */ ('unknown'),
        operation_id,
        started: false
      };
    }
    const started = typeof operation.started_at === 'number';
    if (operation.state === 'succeeded') {
      return {
        state: /** @type {const} */ ('succeeded'),
        operation_id,
        started
      };
    }
    if (operation.state === 'failed') {
      return {
        state: /** @type {const} */ ('failed'),
        operation_id,
        started,
        code: operation.failure?.code || 'repo_operation_failed',
        ...(typeof operation.log_path === 'string' && operation.log_path
          ? { log_path: operation.log_path }
          : {})
      };
    }
    return { state: /** @type {const} */ ('running'), operation_id, started };
  }

  /**
   * Settle whatever the record the ledger names has become, then report it.
   * This is the re-judgement §3's retry reconcile runs before it decides
   * between waiting, re-adopting, and re-recording.
   *
   * @param {string} operation_id
   */
  async function reconcileJob(operation_id) {
    await reconcile(deps.workspace);
    return jobEvidence(operation_id);
  }

  /**
   * @param {string} operation_id
   * @param {{ timeout_ms?: number, poll_ms?: number }} [input]
   */
  async function waitForJobTerminal(operation_id, input = {}) {
    const timeout_ms =
      Number.isFinite(input.timeout_ms) && Number(input.timeout_ms) >= 0
        ? Number(input.timeout_ms)
        : DEFAULT_REPO_OPS_TIMEOUT_MS;
    const poll_ms =
      Number.isFinite(input.poll_ms) && Number(input.poll_ms) > 0
        ? Number(input.poll_ms)
        : 100;
    const deadline = now() + timeout_ms + RECONCILE_GRACE_MS;
    while (true) {
      await reconcile(deps.workspace);
      const evidence = jobEvidence(operation_id);
      if (evidence.state !== 'running') {
        return evidence;
      }
      const remaining_ms = deadline - now();
      if (remaining_ms <= 0) {
        return evidence;
      }
      await sleep(Math.min(poll_ms, remaining_ms));
    }
  }

  /**
   * Reasons the 배포 실행 click can be refused (UI-s582 §3). Every one of them
   * is a REFUSAL: no record is written, nothing is queued, and the client says
   * exactly which precondition failed.
   *
   * @typedef {'deploy_not_declared'|'deploy_opted_out'|'deploy_in_flight'|'target_unresolved'|'remote_history_not_monotonic'} ManualDeployRefusal
   */

  /**
   * Whether any deploy operation for this repo is still in flight.
   *
   * @param {Record<string, any>} operations
   * @returns {boolean}
   */
  function deployInFlight(operations) {
    for (const operation of Object.values(operations || {})) {
      if (
        operation &&
        operation.repo_id === deps.repo &&
        operation.kind === 'deploy' &&
        (operation.state === 'queued' ||
          operation.state === 'running' ||
          operation.state === 'retry_pending')
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * The newest deploy record that already stood for THIS exact target, so a new
   * manual run can link it as its predecessor. Same repo, same base and same
   * pinned SHA — a record for another target is not what this run replaces.
   *
   * @param {Record<string, any>} operations
   * @param {{ target_base: string, target_sha: string }} target
   * @returns {string|null}
   */
  function previousDeployFor(operations, target) {
    /** @type {string|null} */
    let latest_id = null;
    /** @type {number} */
    let latest_at = -1;
    for (const [operation_id, operation] of Object.entries(operations || {})) {
      if (
        !operation ||
        operation.repo_id !== deps.repo ||
        operation.kind !== 'deploy' ||
        operation.target_base !== target.target_base ||
        operation.target_sha !== target.target_sha ||
        operation.superseded_by
      ) {
        continue;
      }
      const at =
        typeof operation.requested_at === 'number' ? operation.requested_at : 0;
      if (at >= latest_at) {
        latest_at = at;
        latest_id = operation_id;
      }
    }
    return latest_id;
  }

  /**
   * The 배포 실행 click (UI-s582 §3): run the declared deploy script once, now,
   * at the remote tip — the only entry a person has into the deploy lane.
   *
   * The target is NOT an input. It comes from the attachment's one base
   * resolver, which pins remote, base and the fetched tip together, so nothing
   * here assumes `origin` and a client cannot name a commit of its own.
   *
   * @returns {Promise<{ ok: true, operation_id: string }|{ ok: false, reason: ManualDeployRefusal }>}
   */
  async function runManualDeploy() {
    if (typeof deps.resolveBase !== 'function') {
      return { ok: false, reason: 'target_unresolved' };
    }
    /** @type {any} */
    let resolved;
    try {
      resolved = await deps.resolveBase({ force: true });
    } catch {
      return { ok: false, reason: 'target_unresolved' };
    }
    if (
      !resolved ||
      resolved.ok !== true ||
      typeof resolved.base !== 'string' ||
      resolved.base.length === 0 ||
      typeof resolved.base_oid !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(resolved.base_oid)
    ) {
      return { ok: false, reason: 'target_unresolved' };
    }
    const release = await deps.locks.repoOperationLock(deps.repo);
    try {
      return await runManualDeployLocked({
        target_base: resolved.base,
        target_sha: resolved.base_oid.toLowerCase()
      });
    } finally {
      release();
    }
  }

  /**
   * Guards, ancestry and enqueue for one manual run. Held under the SAME lock
   * acquisition as the enqueue below it, so the in-flight guard and the record
   * it protects cannot interleave with a second click.
   *
   * @param {{ target_base: string, target_sha: string }} pinned
   * @returns {Promise<{ ok: true, operation_id: string }|{ ok: false, reason: ManualDeployRefusal }>}
   */
  async function runManualDeployLocked(pinned) {
    /** @type {any} */
    const policy = await resolveEffective({
      repo: deps.repo,
      previous_sha: pinned.target_sha,
      target_sha: pinned.target_sha,
      kind: 'deploy',
      gitRun: deps.gitRun
    });
    // An unreadable declaration is not the same fact as an absent one, and the
    // refusal vocabulary has no word for it. Fail closed on the target: what
    // could not be read is a target this run cannot stand on.
    if (!policy || !policy.policy || !policy.target) {
      return { ok: false, reason: 'target_unresolved' };
    }
    const declaration = policy.policy.deploy;
    if (!declaration || declaration.identity_invalid) {
      return { ok: false, reason: 'deploy_not_declared' };
    }
    if (optOutOf().deploy) {
      return { ok: false, reason: 'deploy_opted_out' };
    }
    if (deployInFlight(deps.store.snapshot(deps.workspace).repo_operations)) {
      return { ok: false, reason: 'deploy_in_flight' };
    }
    const ancestry = await manualAncestryVerdict(pinned.target_sha);
    if (ancestry !== 'allowed') {
      return { ok: false, reason: ancestry };
    }
    const issued = deps.store.issueManualDeployRun(deps.workspace);
    const manual_run_id = issued.ok
      ? deps.store.snapshot(deps.workspace).manual_deploy_seq
      : 0;
    if (!Number.isInteger(manual_run_id) || manual_run_id <= 0) {
      return { ok: false, reason: 'target_unresolved' };
    }
    const predecessor = previousDeployFor(
      deps.store.snapshot(deps.workspace).repo_operations,
      pinned
    );
    /** @type {any} */
    const ensured = await ensureDeployLocked({
      source: 'manual',
      manual_run_id,
      policy_source: 'target_tip',
      target_base: pinned.target_base,
      target_sha: pinned.target_sha,
      subjects: [{ bead_id: 'manual', merged_sha: pinned.target_sha }]
    });
    // A record that exists is the answer, whatever the run then did with it:
    // the script's own failure belongs on its card, not on the click.
    if (typeof ensured.operation_id === 'string' && ensured.operation_id) {
      if (predecessor && predecessor !== ensured.operation_id) {
        deps.store.supersedeRepoOperation(deps.workspace, {
          operation_id: predecessor,
          successor_id: ensured.operation_id
        });
      }
      return { ok: true, operation_id: ensured.operation_id };
    }
    // The opt-out is re-read after the async policy and containment checks, so
    // a workspace that turned it on mid-flight lands here as an INERT result.
    // It is a different fact from an undeclared lane and must keep its own
    // word, so it is mapped before the generic inert reason.
    if (ensured.opted_out === true) {
      return { ok: false, reason: 'deploy_opted_out' };
    }
    return {
      ok: false,
      reason:
        ensured.code === 'remote_history_not_monotonic'
          ? 'remote_history_not_monotonic'
          : ensured.inert === true
            ? 'deploy_not_declared'
            : 'target_unresolved'
    };
  }

  /**
   * Compare the deploy worktree HEAD with the pinned tip (UI-s582 §3.4). All
   * three monotonic relations are ALLOWED — equal, HEAD already ahead, HEAD
   * behind — because a manual run means redeploy, not "deliver if missing".
   * Only genuinely divergent histories are refused, and a probe that cannot
   * decide fails closed on the target.
   *
   * @param {string} target_sha
   * @returns {Promise<'allowed'|'remote_history_not_monotonic'|'target_unresolved'>}
   */
  async function manualAncestryVerdict(target_sha) {
    if (typeof deploy_worktree.readState !== 'function') {
      return 'allowed';
    }
    /** @type {any} */
    let state;
    try {
      state = await deploy_worktree.readState({ repo: deps.repo });
    } catch {
      return 'target_unresolved';
    }
    if (!state || state.ok !== true) {
      return 'target_unresolved';
    }
    // No worktree yet (the pre-bootstrap state) — there is no HEAD to diverge
    // from, so alignment creates it at the tip.
    if (typeof state.head !== 'string' || state.head.length === 0) {
      return 'allowed';
    }
    if (state.head === target_sha) {
      return 'allowed';
    }
    const target_is_ancestor = await ancestryStatus(target_sha, state.head);
    if (target_is_ancestor === 'unknown') {
      return 'target_unresolved';
    }
    if (target_is_ancestor === 'ancestor') {
      return 'allowed';
    }
    const head_is_ancestor = await ancestryStatus(state.head, target_sha);
    if (head_is_ancestor === 'unknown') {
      return 'target_unresolved';
    }
    return head_is_ancestor === 'ancestor'
      ? 'allowed'
      : 'remote_history_not_monotonic';
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
    // A manual record keeps reading its policy — and now its TARGET — from the
    // tip it was authorized against, on every relaunch: the previous base may
    // still have no declaration at all.
    const manual = operation.source === 'manual';
    // A retry re-runs the SAME command at the SAME target the first attempt
    // failed at (contract §3.2). Re-binding would resolve the remote's CURRENT
    // tip, so a base that moved between the two runs would leave the consumed
    // key pinned to the old SHA while the script executed against a new one —
    // a different command wearing the first one's retry budget. A MANUAL record
    // pins for the same reason one step earlier: the person authorized THIS
    // tip, and a record queued behind another operation must not silently
    // become a deploy of whatever landed since. The pinned SHA is authority in
    // both cases; its absence fails closed rather than falling back to a fresh
    // bind.
    /** @type {{ ok: boolean, code?: string, target_sha?: string }} */
    const bound =
      retry || manual
        ? typeof operation.target_sha === 'string' && operation.target_sha
          ? { ok: true, target_sha: operation.target_sha }
          : {
              ok: false,
              code: retry
                ? 'repo_ops_retry_target_missing'
                : 'manual_target_missing'
            }
        : await deploy_worktree.bindTarget({
            repo: deps.repo,
            base: operation.target_base
          });
    if (!bound.ok || typeof bound.target_sha !== 'string') {
      if (retry) {
        deps.store.settleConsumedRepoOperationRetry(workspace, {
          operation_id,
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
    const policy = await resolveEffective({
      repo: deps.repo,
      previous_sha: manual ? bound.target_sha : operation.effective_base_sha,
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
      retry,
      ...(manual ? { manual: true } : {})
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
        blocked_reason: 'verify_retry_input_missing'
      });
      return;
    }
    /** @type {any} */
    const policy = await resolveEffective({
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
   * @param {string} head_sha
   */
  function verifyReceipt(operation_id, head_sha) {
    const operation = observe(operation_id);
    const bound_head_sha =
      typeof head_sha === 'string' && /^[0-9a-f]{40}$/i.test(head_sha)
        ? head_sha.toLowerCase()
        : null;
    if (
      !operation ||
      operation.kind !== 'verify' ||
      bound_head_sha === null ||
      !operation.verify_head_shas.includes(bound_head_sha)
    ) {
      return null;
    }
    return {
      operation_id,
      effective_base_sha: operation.effective_base_sha,
      head_sha: bound_head_sha,
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
   * @param {{ head_sha?: string, timeout_ms?: number, poll_ms?: number }} [options]
   */
  async function waitForTerminal(operation_id, options = {}) {
    const head_sha = options.head_sha;
    if (typeof head_sha !== 'string') {
      return null;
    }
    const initial = verifyReceipt(operation_id, head_sha);
    if (initial === null) {
      return null;
    }
    const deadline = Date.now() + (options.timeout_ms ?? 600_000) + 5000;
    const poll_ms = options.poll_ms ?? 100;
    while (Date.now() <= deadline) {
      await reconcile(deps.workspace);
      const operation = observe(operation_id);
      if (
        operation &&
        (operation.state === 'succeeded' || operation.state === 'failed')
      ) {
        return verifyReceipt(operation_id, head_sha);
      }
      await new Promise((resolve) => setTimeout(resolve, poll_ms));
    }
    return null;
  }

  /**
   * @param {string} sha
   * @param {{ current_target_base?: boolean }} [options]
   */
  async function hasConfig(sha, options = {}) {
    const display_generation = options.current_target_base
      ? beginRepoOpsDisplayResolution(deps.workspace)
      : null;
    const resolved = await resolveRepoOps({
      repo: deps.repo,
      sha,
      gitRun: deps.gitRun
    });
    if (display_generation !== null) {
      recordRepoOpsResolution({
        workspace: deps.workspace,
        resolution: resolved,
        base_sha: sha,
        generation: display_generation
      });
    }
    if (!resolved.ok && resolved.code) {
      return resolved;
    }
    const opt_out = optOutOf();
    // `present`는 선언 사실이므로 opt-out과 무관하게 불변이다. verify를
    // 건너뛰는 workspace는 script를 null로 받아, 호출부가 이미 가진 "verify
    // 선언 없음" 분기를 그대로 탄다 — 새 분기를 만들지 않는다.
    return {
      ok: true,
      present: resolved.config_blob_sha !== null,
      verify_script_path: opt_out.verify
        ? null
        : (resolved.verify?.script ?? null),
      verify_timeout_ms: opt_out.verify
        ? null
        : (resolved.verify?.timeout_ms ?? null),
      verify_opted_out: opt_out.verify,
      deploy_opted_out: opt_out.deploy
    };
  }

  /**
   * @param {{ target_base: string, bead_id: string, merged_sha: string }} subject
   */
  async function findExactDeployOperation(subject) {
    if (
      typeof subject.target_base !== 'string' ||
      typeof subject.bead_id !== 'string' ||
      typeof subject.merged_sha !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(subject.merged_sha)
    ) {
      return null;
    }
    const merged_sha = subject.merged_sha.toLowerCase();
    const candidates = Object.entries(
      deps.store.snapshot(deps.workspace).repo_operations
    )
      .filter(
        ([, operation]) =>
          operation.repo_id === deps.repo &&
          operation.kind === 'deploy' &&
          operation.target_base === subject.target_base &&
          operation.subjects.some(
            (entry) =>
              entry.bead_id === subject.bead_id &&
              entry.merged_sha === merged_sha
          )
      )
      .sort(([left_id, left], [right_id, right]) => {
        const requested_delta = left.requested_at - right.requested_at;
        return requested_delta !== 0
          ? requested_delta
          : left_id.localeCompare(right_id);
      });
    if (candidates.length === 0) {
      return null;
    }
    const [operation_id, operation] = candidates[0];
    const resolved = await resolveRepoOps({
      repo: deps.repo,
      sha: operation.effective_base_sha,
      gitRun: deps.gitRun
    });
    const declaration = resolved.ok === false ? null : resolved.deploy;
    if (
      !declaration ||
      declaration.script !== operation.script_path ||
      declaration.mode !== operation.script_mode ||
      declaration.blob_sha !== operation.script_blob_sha ||
      !Number.isInteger(declaration.timeout_ms) ||
      !Number.isFinite(declaration.timeout_ms) ||
      declaration.timeout_ms <= 0
    ) {
      return { operation_id, code: 'repo_operation_timeout_unresolved' };
    }
    return { operation_id, timeout_ms: declaration.timeout_ms };
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
    const failure = operation.failure;
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
          code: failure?.code || 'repo_operation_failed',
          ...(failure?.fetch_failure
            ? { fetch_failure: failure.fetch_failure }
            : {}),
          ...(Number.isFinite(failure?.elapsed_ms)
            ? { elapsed_ms: failure?.elapsed_ms }
            : {}),
          ...(typeof operation.log_path === 'string'
            ? { log_path: operation.log_path }
            : {})
        }
      : { state: operation.state, operation_id };
  }

  /**
   * @param {string} operation_id
   * @param {{ target_base: string, merged_sha: string, timeout_ms: number, poll_ms?: number }} input
   */
  async function waitForDeployTerminal(operation_id, input) {
    if (
      !Number.isFinite(input.timeout_ms) ||
      input.timeout_ms < 0 ||
      typeof input.target_base !== 'string' ||
      typeof input.merged_sha !== 'string'
    ) {
      return {
        state: 'failed',
        operation_id,
        code: 'repo_operation_timeout_unresolved'
      };
    }
    const poll_ms =
      Number.isFinite(input.poll_ms) && Number(input.poll_ms) > 0
        ? Number(input.poll_ms)
        : 100;
    const deadline = now() + input.timeout_ms + RECONCILE_GRACE_MS;
    /** @type {any} */
    let evidence = null;
    while (true) {
      await reconcile(deps.workspace);
      evidence = await deploymentEvidence(operation_id, input);
      if (evidence.state === 'succeeded' || evidence.state === 'failed') {
        return evidence;
      }
      const remaining_ms = deadline - now();
      if (remaining_ms <= 0) {
        return evidence;
      }
      await sleep(Math.min(poll_ms, remaining_ms));
    }
  }

  /**
   * @param {string} workspace
   */
  async function reconcile(workspace) {
    const release = await deps.locks.repoOperationLock(deps.repo);
    let auto_advance_restore_ready = false;
    try {
      try {
        deps.autoAdvanceRestore?.beforeReconcile(workspace);
      } catch {
        // Candidate capture is fail-closed and must not block ordinary reconcile.
      }
      await reconcileLocked(workspace);
      try {
        auto_advance_restore_ready =
          (await deps.autoAdvanceRestore?.afterReconcileLocked(workspace)) ===
          true;
      } catch {
        // A later pass retries restoration judgment from durable operation state.
      }
    } finally {
      release();
    }
    if (auto_advance_restore_ready) {
      try {
        await deps.autoAdvanceRestore?.restoreAll();
      } catch {
        // Per-workspace snapshots remain authoritative for a later pass.
      }
    }
  }

  /**
   * @param {string} workspace
   */
  async function reconcileLocked(workspace) {
    if (!verify_coverage_swept.has(workspace)) {
      verify_coverage_swept.add(workspace);
      await sweepStoredVerifyCoverage(workspace);
    }
    const queue = deps.store.snapshot(workspace);
    for (const [operation_id, operation] of Object.entries(
      queue.repo_operations
    )) {
      if (operation.state === 'retry_pending') {
        const current_queue = deps.store.snapshot(workspace);
        const access = resolutionAccess({
          policy_supported: policySupported(),
          subject: operation
        });
        if (!access.script_retry) {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id,
            ...(policySupported()
              ? {}
              : { blocked_reason: 'schema_unsupported' })
          });
          continue;
        }
        if (normalizeScriptRetry(operation).status !== 'unconsumed') {
          deps.store.settleConsumedRepoOperationRetry(workspace, {
            operation_id
          });
          continue;
        }
        const operations_now = current_queue.repo_operations || {};
        if (!runningOperationFor(operations_now, operation_id)) {
          if (operation.kind === 'verify') {
            await launchVerifyRetry(workspace, operation_id, operation);
          } else if (operation.kind === 'job') {
            await launchRecordedJob(workspace, operation_id, operation, {
              retry: true
            });
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
              operation_id
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
          operation_id
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
      // A queued job is NEVER launched from here. Its ledger `intent` is
      // written between the prerecord and the spawn, so a queued job record
      // may be one whose intent was never written — running it would apply a
      // file the ledger cannot account for. Terminalizing instead is what lets
      // the cleanup's own re-judgement decide (UI-i60a §3).
      if (operation.kind === 'job') {
        await settleFailure(workspace, operation, operation_id, {
          code: 'interrupted',
          detail: 'post_merge_job_launch_missing',
          interrupted: true
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
   * Acknowledge one failed row (UI-q0uy §4.6-2). Not a transition: the record
   * keeps its state and its whole evidence trail. Under the repo-operation lock
   * like every other write here, so it cannot race a launch that is about to
   * move the same row.
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
    runManualDeploy,
    ensureVerify,
    observe,
    verifyReceipt,
    waitForTerminal,
    hasConfig,
    findExactDeployOperation,
    deploymentEvidence,
    waitForDeployTerminal,
    prepareJob,
    launchJob,
    reconcileJob,
    waitForJobTerminal,
    reconcile,
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
