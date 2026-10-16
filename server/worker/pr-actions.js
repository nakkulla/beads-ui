/**
 * The PR-wait ACTIONS (worker-phase2 §6): the authoritative [머지] click, the
 * ONE post-merge cleanup, the conflict-resolution dispatch, and [폐기]
 * (`2026-07-27-worker-discard-button.md`).
 *
 * Everything Phase 4 built is ADVISORY — a poller writing badges into a
 * non-persistent cache. This module is where a human decision turns into an
 * irreversible act, so its whole design is about not trusting what the human
 * saw:
 *
 *   1. THE CLICK RE-QUERIES. The badge was rendered up to a poll interval ago
 *      and the base can move in between (the same TOCTOU the admission
 *      validator answers with a tick-scan check plus a pinned-base re-check at
 *      dispatch). The display is advisory; the click-time `gh` read decides.
 *   2. A NEW HEAD SHA RE-OPENS THE GATE. Every verification verdict is bound to
 *      the commit it was taken on, so if the re-read head differs from what the
 *      cache holds, the gate is re-evaluated against the NEW sha — running the
 *      local verification if that tier needs it. A restart (empty cache) lands
 *      in exactly this path and therefore VERIFIES rather than passing.
 *   3. THREE OUTCOMES, ONLY ONE OF WHICH MERGES.
 *        CLEAN → squash merge.
 *        DIRTY → do NOT merge; dispatch a conflict-resolution session and stop.
 *        BEHIND / UNKNOWN / otherwise unclean → refuse without an effect.
 *      Automatic conflict resolution is fine; automatic merging is not. Nothing
 *      here merges after a resolution or on any timer — the
 *      only merge triggers are this click and a merge a human performed on
 *      github.com (which the poller observes and routes into the SAME cleanup).
 *
 * CLEANUP ORDER IS THE `pr-finish` SKILL CONTRACT'S, not this module's:
 *
 *   base 동기화(base_containment) → repo-declared verify/deploy RepoOperation
 *   (repo_operations) → post-merge jobs → 워크트리·원격/로컬 브랜치 정리 →
 *   parent bd close → bead `done(merged)`
 *
 * It is deliberately NOT an unconditional immediate `bd close`. A step that
 * fails STOPS the sequence, leaves the bead `resolved` in `pr_wait`, records a
 * DURABLE `merged_cleanup_failed` (queue.json — see the queue store). The
 * completion coordinator retries transient branch/base observations with a
 * bounded budget; deterministic failures need a human to remove the cause.
 *
 * A MERGE IS NOT A DELIVERY: closure waits for the repo-declared RepoOperation
 * lane to reach a terminal success on the exact merged SHA.
 *
 * @import { Queue } from './queue-store.js'
 * @import { PrDetail } from './gh.js'
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { isImplementationAttempt } from '../../app/utils/active-attempts.js';
import { FOREIGN_HANDOFF_SENTENCES } from '../../app/utils/failure-sentences.js';
import { debug } from '../logging.js';
import { parsePrNumber } from '../workflow-enrich.js';
import { workflowScriptDir } from './attempt-facts.js';
import { beadDeferLockKey } from './bead-defer.js';
import { discardOperationActive } from './discard-phase.js';
import { loadExecutionDefaults } from './execution-defaults.js';
import { failureTokenSummary, scriptSummary } from './failure-class.js';
import { foreignHandoffReason } from './foreign-handoff.js';
import {
  bindForeignTarget,
  cleanupForeignResidue,
  fetchForeignBaseTip,
  foreignPrRefOf,
  judgeForeignPostMerge,
  judgeForeignPreMerge,
  judgeForeignTargetMetadata,
  readForeignTarget
} from './foreign-target.js';
import {
  createAncestryProbe,
  evaluateMergeGate,
  reviewReceiptState
} from './merge-gate.js';
import { createPostMergeJobRunner } from './post-merge-job.js';
import { resolvePrRef } from './pr-poller.js';
import {
  checkReceipts,
  receiptDefaultsFrom,
  receiptGateState,
  receiptLineageForAttempt
} from './receipt-check.js';
import { resolveRepoOps as defaultResolveRepoOps } from './repo-ops-resolver.js';
import { cleanupFailureRetryClass } from './resolution-ladder.js';
import { branchForBead } from './worktree.js';

const log = debug('worker:pr-actions');

/**
 * How long to wait before re-reading a `mergeable: UNKNOWN` at click time.
 * GitHub computes mergeability lazily and the first read only TRIGGERS the
 * computation, so acting on the first UNKNOWN would mean branching on a
 * non-answer. Same rationale (and same order of magnitude) as the poller's.
 *
 * @type {number}
 */
export const DEFAULT_CLICK_REQUERY_DELAY_MS = 2000;

/** @type {Set<string>} */
const RESUMABLE_TERMINAL_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded'
]);

/**
 * The post-merge cleanup steps, IN THE ORDER the pr-finish contract fixes them
 * (worker-phase2 §6, worker-deploy-hook §2). Exported so the failure record,
 * the banner, and the tests all name the same sequence rather than three
 * private copies of it.
 *
 * Parent close still comes after branch and worktree cleanup.
 *
 * @type {string[]}
 */
export const CLEANUP_STEPS = [
  'base_containment',
  'repo_operations',
  'post_merge_jobs',
  'branch_cleanup',
  'parent_close'
];

/**
 * The closure half, derived from {@link CLEANUP_STEPS} rather than listed
 * again. Every caller that asks "does this record resume through
 * {@link closeCoveredRow} alone?" reads this, so inserting a step at the front
 * of the half moves all of them together instead of leaving one behind naming
 * the old first step.
 *
 * @type {string[]}
 */
const CLOSURE_STEPS = CLEANUP_STEPS.slice(
  CLEANUP_STEPS.indexOf('post_merge_jobs')
);

/**
 * What step 1 did to the LOCAL checkout. The installed workflow helper owns
 * base-sync decisions; its result and reason pass through to the cleanup log.
 * Historical outcomes remain readable in persisted cleanup records.
 *
 * @typedef {`base_sync:${string}:${string}`|'fast_forwarded'|'fetch_only:not_on_base'|'fetch_only:dirty'|'fetch_only:diverged'} BaseSyncOutcome
 */

/**
 * @typedef {Object} MergeClickResult
 * @property {boolean} ok - Whether the click accomplished what it set out to.
 * @property {'merged'|'updated_and_merged'|'already_merged'|'cleanup_pending'|'merge_unconfirmed'|'conflict_resolution'|'verify_blocked'|'refused'} action
 * What the click actually DID — never just "succeeded": a dispatched conflict
 * resolution is a legitimate outcome that merged nothing, and
 * `cleanup_pending` is a landed merge whose RepoOperation has not reached a
 * terminal state yet;
 * `merge_unconfirmed` is a merge COMMAND that succeeded without the PR being
 * observed merged (a merge queue accepted it, or the re-read failed).
 * @property {string|null} reason - Machine-readable cause for a refusal (or a
 * cleanup failure) — null on a clean success.
 * @property {string|null} [cleanup_step] - Which cleanup step stopped, if one did.
 * @property {BaseSyncOutcome|null} [base_sync] - What the cleanup's base sync
 * did to the local checkout, when a cleanup ran.
 * @property {string|null} [attempt_id] - The resolution attempt, when dispatched.
 * @property {string|null} [head_sha] - The sha the decision was taken on.
 * @property {string|null} [base_ref] - The base the decision was taken on,
 * when the refusal came from a mergeability probe that observed one.
 * @property {string|null} [head_ref] - The PR head ref the probe observed.
 * @property {Record<string, unknown>|null} [continuation_mismatch]
 */

/**
 * The merge driver's ownership of one dispatched resolution, plus the dispatch
 * identity the queue records with it (UI-p49g §3.1). The identity fields are
 * optional on the wire because a human click dispatches without a queue turn.
 *
 * @typedef {Object} ResolutionWaitInput
 * @property {string} queue_bead_id
 * @property {number} wait_ms
 * @property {boolean} [manual_authority]
 * @property {string} [dispatch_head_sha]
 * @property {string} [base_ref]
 * @property {string} [head_ref]
 */

/**
 * @typedef {Object} MergeabilityProbe
 * @property {boolean} ok
 * @property {'merged'|'closed'|'dirty'|'behind'|'clean'|'blocked'} kind
 * @property {string|null} reason
 * @property {string|null} head_sha
 * @property {string|null} base_ref
 * @property {string|null} [head_ref]
 * @property {boolean} external
 * @property {'verify'} [continuation]
 */

/**
 * @typedef {Object} DiscardResult
 * @property {boolean} ok
 * @property {string|null} reason
 */

/**
 * Whether the re-read PR is in genuine conflict. Both spellings GitHub uses are
 * accepted: `mergeable: CONFLICTING` is the computed verdict, `DIRTY` is the
 * merge-state status that accompanies it.
 *
 * @param {PrDetail} pr
 * @returns {boolean}
 */
function isConflicting(pr) {
  return pr.mergeable === 'CONFLICTING' || pr.merge_state_status === 'DIRTY';
}

/**
 * One comparable commit id, or null when the value is not one.
 *
 * @param {unknown} sha
 * @returns {string|null}
 */
function normalizeSha(sha) {
  return typeof sha === 'string' && /^[0-9a-f]{40}$/i.test(sha)
    ? sha.toLowerCase()
    : null;
}

/**
 * @param {PrDetail|Record<string, any>|null|undefined} pr
 * @returns {string|null}
 */
function authoritativeMergeSha(pr) {
  const sha = pr?.merge_sha || pr?.merged_sha;
  return typeof sha === 'string' && /^[0-9a-f]{40}$/i.test(sha)
    ? sha.toLowerCase()
    : null;
}

/**
 * Create the PR actions for ONE workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: any,
 *   gh: any,
 *   observations: ReturnType<typeof import('./pr-observations.js').createPrObservationStore>,
 *   activity?: ReturnType<typeof import('./activity-store.js').createActivityStore>,
 *   bd: {
 *     setStatus: (bead_id: string, status: string) => Promise<void>,
 *     readStatus: (bead_id: string) => Promise<string|null>,
 *     unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *     readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *     readIssue?: (bead_id: string) => Promise<Record<string, any>>,
 *     updateFields?: (bead_id: string, input: { set?: Record<string, string>, append_notes?: string }) => Promise<void>,
 *   },
 *   external?: {
 *     get: (workspace: string, bead_id: string) => import('./external-pr.js').ExternalPrRow|null,
 *     drop?: (workspace: string, bead_id: string) => boolean
 *   },
 *   worktree: {
 *     remove: (input: { repo: string, bead_id: string }) => Promise<unknown>,
 *     removeByBranch: (input: { repo: string, branch: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *     removeCompleted: (input: { repo: string, branch: string, expected_path: string, expected_head: string, delivered_sha: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null, worktree_removed?: boolean, branch_removed?: boolean, backup?: { path: string, manifest_sha256: string, file_count: number }|null }>,
 *     pathFor: (repo: string, bead_id: string) => string,
 *     exists?: (repo: string, bead_id: string) => boolean,
 *     removeIfDiscardable?: (input: { repo: string, bead_id: string, base: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *     withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 *   },
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   runBaseSync?: (file: string, args: string[], options: { cwd: string, encoding: 'utf8' }) => Promise<{ stdout: string }>,
 *   homeDir?: string,
 *   scheduler: { resolveConflict: (workspace: string, bead_id: string, resolution_wait?: ResolutionWaitInput|null, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }, head_ref?: string|null) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>, dispatchExternalConflict: (workspace: string, bead_id: string, target_base?: string, resolution_wait?: ResolutionWaitInput|null, continuation?: { continuation?: 'auto'|'prior_session'|'fresh_current', decision_token?: any }, head_ref?: string|null) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, continuation_mismatch?: any }>, tick: (workspace: string) => Promise<void>, reconcileInteractiveSessions?: (workspace: string) => Promise<void> },
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   resolveVerify?: (pin?: { sha?: string|null, force?: boolean }) => Promise<any>,
 *   runVerify?: (input: any) => Promise<{ ok: boolean, reason: string, exit: number|null, attempts?: { reason: string, log_path?: string }[] }>,
 *   repoOperations?: { ensureVerify: (candidate: any) => Promise<any>, ensureDeploy: (subject: any) => Promise<any>, waitForTerminal: (operation_id: string, options?: any) => Promise<any>, waitForDeployTerminal: (operation_id: string, input: any) => Promise<any>, verifyReceipt: (operation_id: string, head_sha: string) => any, hasConfig: (sha: string, options?: { current_target_base?: boolean }) => Promise<any>, findExactDeployOperation: (subject: any) => Promise<any>, findCleanupVerifyOperation?: (subject: { target_base: string, bead_id: string, merged_sha: string }) => Promise<{ operation_id: string, head_sha: string|null, state: string, timeout_ms: number|null }|null>, deploymentEvidence: (operation_id: string, subject: any) => Promise<any>, eligibleJobHead?: (input: { target_base: string, merge_sha: string }) => Promise<string|null>, prepareJob?: (input: any) => Promise<any>, launchJob?: (input: { operation_id: string }) => Promise<any>, reconcileJob?: (operation_id: string) => Promise<any>, waitForJobTerminal?: (operation_id: string, input?: any) => Promise<any> },
 *   notifyChanged?: (workspace: string) => void,
 *   notify?: { mergeCompleted: (input: { bead_id: string, pr_url?: string|null, repo?: string|null }) => Promise<void>, needsHuman?: (input: any) => Promise<void> },
 *   requeryDelayMs?: number,
 *   sleep?: (ms: number) => Promise<void>,
 *   now?: () => number,
 *   timeline?: { append: (input: any) => unknown },
 *   announceForeignHandoff?: (input: { bead_id: string, cause: string, identity: string, pr_url?: string|null, foreign_path?: string|null }) => unknown,
 *   announceCleanupInterruption?: (bead_id: string) => unknown,
 *   resolveRepoOps?: (input: { repo: string, sha: string, gitRun: any }) => Promise<any>,
 *   locks?: { acquire: (key: string) => Promise<() => void> }
 * }} deps
 * `timeline` is the workspace's bead-history writer; without it a cleanup
 * that backed up leftover content records nothing and behaves identically.
 * `locks` is the worker runtime's lock manager: the observed-merge cleanup
 * holds the Bead's defer lock (UI-0d9i §3.4); without it nothing is held.
 * `announceForeignHandoff` pushes a `foreign_handoff` once (UI-k467 §3.7);
 * `announceCleanupInterruption` pushes and opens a cleanup stop no completion
 * intent drives once per record (UI-gske §3.5);
 * `resolveRepoOps` reads a pinned foreign target's declaration (tests inject).
 */
export function createPrActions(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  const runBaseSync = deps.runBaseSync || promisify(execFile);
  const home_dir = deps.homeDir || os.homedir();
  const probeAncestry = createAncestryProbe({ gitRun: deps.gitRun, repo });
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const requery_delay_ms =
    typeof deps.requeryDelayMs === 'number'
      ? deps.requeryDelayMs
      : DEFAULT_CLICK_REQUERY_DELAY_MS;
  const notifyChanged = deps.notifyChanged || (() => {});
  const resolveVerify =
    deps.resolveVerify ||
    (() =>
      Promise.resolve(
        /** @type {any} */ ({
          state: 'absent'
        })
      ));
  const runVerify =
    deps.runVerify ||
    (() =>
      Promise.resolve({
        ok: false,
        reason: 'verify_cmd_spawn_error',
        exit: null
      }));
  const repo_operations = deps.repoOperations || null;
  const resolveRepoOps = deps.resolveRepoOps || defaultResolveRepoOps;
  // The `post_merge_jobs` step is the shared runner every landing settlement
  // uses (UI-1eag §3.1); this module only supplies the PR row's merge SHA,
  // its retry authority and its failure record.
  const post_merge_jobs = createPostMergeJobRunner({
    workspace,
    repo,
    store: deps.store,
    gitRun: deps.gitRun,
    repoOperations: repo_operations
  });

  /**
   * The gh adapter one PR is read and changed through: a pinned foreign PR
   * goes through its pinned slug, never the workspace origin (UI-k467 §3.1).
   *
   * @param {import('./foreign-target.js').ForeignPrTarget|null} target
   * @returns {any}
   */
  function ghFor(target) {
    return target && typeof deps.gh.forSlug === 'function'
      ? deps.gh.forSlug(target.slug)
      : deps.gh;
  }

  /**
   * Re-read this Bead's foreign pins at the start of a state-changing action
   * (UI-k467 §3.1): a pin a person just corrected decides this action. A
   * `pr_url` the caller already read in the same instant is reused.
   *
   * @param {string} bead_id
   * @param {string|null} [pr_url]
   * @param {Record<string, any>|null} [metadata] - The Bead's metadata from a
   * read this action already made at the same instant (an external row's
   * lane-membership `bd show`); judged without a second read.
   * @returns {Promise<{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: import('./foreign-target.js').ForeignPrTarget }>}
   */
  async function foreignTargetFor(bead_id, pr_url = null, metadata = null) {
    if (metadata) {
      return judgeForeignTargetMetadata(
        { gitRun: deps.gitRun, cwd: repo, log },
        metadata,
        bead_id,
        pr_url
      );
    }
    if (typeof deps.bd.readMetadata !== 'function') {
      return { state: 'none' };
    }
    return readForeignTarget(
      {
        readMetadata: deps.bd.readMetadata,
        // One `bd show` serves the three pins and `pr_url` together.
        ...(typeof deps.bd.readIssue === 'function'
          ? { readIssue: deps.bd.readIssue }
          : {}),
        gitRun: deps.gitRun,
        cwd: repo,
        log
      },
      bead_id,
      pr_url
    );
  }

  /**
   * The PR number one action reads or changes. A pinned foreign PR's number
   * comes from the same `pr_url` parse as its slug and must agree with the
   * Worker's durable reference, else the action is refused before any gh call
   * (UI-k467 §4-3); a workspace PR keeps the durable reference's number.
   *
   * @param {import('./foreign-target.js').ForeignPrTarget|null} target
   * @param {{ number: number, url?: string|null }|null} ref
   * @returns {{ ok: true, number: number }|{ ok: false, reason: string }}
   */
  function prNumberFor(target, ref) {
    if (target) {
      return foreignPrRefOf(target, ref);
    }
    return ref
      ? { ok: true, number: ref.number }
      : { ok: false, reason: 'pr_ref_unknown' };
  }

  /**
   * The observation's `foreign` field for one target (the card's label and
   * handoff badge read it).
   *
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @param {{ handoff?: string|null, base_sha?: string|null, verify_declared?: boolean|null }} [extra]
   * @returns {import('./pr-observations.js').ForeignObservation}
   */
  function foreignObservation(target, extra = {}) {
    return {
      slug: target.slug,
      repo_name: target.repo_name,
      base: target.base,
      path: target.path,
      handoff: extra.handoff ?? null,
      base_sha: extra.base_sha ?? null,
      verify_declared: extra.verify_declared ?? null
    };
  }

  /**
   * Push one `foreign_handoff` (the announcer owns the once-record).
   *
   * @param {string} bead_id
   * @param {string} cause
   * @param {string} identity
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @param {string|null} pr_url
   */
  function announceHandoff(bead_id, cause, identity, target, pr_url) {
    if (typeof deps.announceForeignHandoff !== 'function') {
      return;
    }
    try {
      deps.announceForeignHandoff({
        bead_id,
        cause,
        identity,
        pr_url,
        foreign_path: target.path
      });
    } catch (err) {
      log('foreign handoff announce failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Beads with an action in flight. A merge and its cleanup can take minutes
   * (a post-merge suite runs inside it), and both a double click and the
   * poller's externally-observed MERGED can arrive during that window — this
   * makes the second one a no-op instead of a second cleanup racing the first.
   *
   * @type {Set<string>}
   */
  const in_flight = new Set();

  const activity = deps.activity || null;
  const external = deps.external || null;

  /** Request a dispatch pass after a durable PR-wait member leaves its lane. */
  function requestQueueTick() {
    try {
      Promise.resolve(deps.scheduler.tick(workspace)).catch((err) => {
        log('worker tick after pr_wait exit failed for %s: %o', workspace, err);
      });
    } catch (err) {
      log('worker tick after pr_wait exit failed for %s: %o', workspace, err);
    }
  }
  // Optional so every existing construction site (and test) keeps working with
  // no notifier at all — a missing one is silence, never a cleanup failure.
  const notify = deps.notify || null;

  /**
   * Append one bounded-verify flake absorption note without making it part of
   * the action's success condition. The verify runner owns the retry lifecycle;
   * this helper only records the two attempt log paths when the final result is
   * green.
   *
   * @param {string} bead_id
   * @param {'post_merge_verify'|'merge_gate'} lane
   * @param {{ reason: string, log_path?: string }[]} attempts
   */
  async function appendVerifyFlakeNote(bead_id, lane, attempts) {
    if (
      typeof deps.bd.updateFields !== 'function' ||
      attempts.length !== 2 ||
      attempts[0].reason !== 'verify_cmd_failed'
    ) {
      return;
    }
    const first_log = attempts[0].log_path || '없음';
    const retry_log = attempts[1].log_path || '없음';
    const append_notes = `verify flake 흡수 (${lane}): 1차 verify_cmd_failed (${first_log}) → 재시도 green (${retry_log})`;
    try {
      await deps.bd.updateFields(bead_id, { append_notes });
    } catch (err) {
      log(
        'verify flake note append failed for %s (%s): %o',
        bead_id,
        lane,
        err
      );
    }
  }

  /**
   * Publish the merge's current step (UI-raqh §4). The click runs for minutes
   * and the client has no other way to see where it is; the fanout is what
   * makes the step visible to every subscriber, including one that reloaded
   * mid-merge.
   *
   * @param {string} bead_id
   * @param {string} step
   */
  function markStep(bead_id, step) {
    if (!activity) {
      return;
    }
    activity.setMergeProgress(workspace, bead_id, step);
    notifyChanged(workspace);
  }

  /**
   * Release the merge progress — on success, on failure, and before handing a
   * conflicting PR to a resolution session (which merges nothing, so leaving
   * the row "merging" would be a lie).
   *
   * @param {string} bead_id
   */
  function clearStep(bead_id) {
    if (!activity) {
      return;
    }
    activity.clearMergeProgress(workspace, bead_id);
    notifyChanged(workspace);
  }

  /**
   * @param {string} reason
   * @returns {MergeClickResult}
   */
  function refuse(reason) {
    return { ok: false, action: 'refused', reason };
  }

  /**
   * @param {Queue} q
   * @param {string} bead_id
   * @returns {boolean}
   */
  function inPrWait(q, bead_id) {
    const lane = Array.isArray(q.pr_wait) ? q.pr_wait : [];
    return lane.some((e) => e && e.bead_id === bead_id);
  }

  /**
   * Whether the sequential merge queue currently holds an item for this bead.
   *
   * @param {Queue} q
   * @param {string} bead_id
   */
  function inMergeQueue(q, bead_id) {
    const items = Array.isArray(q.merge_queue) ? q.merge_queue : [];
    return items.some((e) => e && e.bead_id === bead_id);
  }

  /**
   * @param {Queue} q
   * @param {string} bead_id
   */
  function discardActive(q, bead_id) {
    return Object.values(q.discard_operations || {}).some(
      (operation) =>
        /** @type {any} */ (operation).bead_id === bead_id &&
        discardOperationActive(/** @type {any} */ (operation))
    );
  }

  /**
   * Decide whether a clicked bead is a legitimate lane member, and which KIND
   * (UI-7agi §4).
   *
   * A durable `pr_wait` entry is a WORKER row and passes as before. Anything
   * else may still be an EXTERNAL row — a PR a normal session delivered — but
   * only when bd CONFIRMS it right now: `status=resolved` AND a `metadata.pr_url`
   * still present. That re-read is not a convenience: an external row is not a
   * queue-revision CAS target, so this is the only thing standing between the
   * click and a bead that was closed, discarded, or re-opened since the snapshot
   * the user clicked on was rendered.
   *
   * It reads ONE `bd show` through `readIssue`, not a status read plus a
   * metadata read (implementation review 2026-07-28). The guard's whole claim is
   * that both facts hold at the SAME instant; a bead closing between two queries
   * keeps its `pr_url`, so the pair would report `resolved` + a live url for a
   * bead that is already closed. Fail-closed — an unreadable bd throws and the
   * click is refused, and an adapter that cannot answer atomically is refused
   * rather than downgraded.
   *
   * @param {Queue} q
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, external: false }|{ ok: true, external: true, pr_url: string, metadata: Record<string, any> }|{ ok: false, reason: string }>}
   */
  async function laneMembership(q, bead_id) {
    if (inPrWait(q, bead_id)) {
      return { ok: true, external: false };
    }
    // The registry drops a bead for as long as ANY non-terminal attempt of its
    // own runs (`externalProtectedBeadIds`, UI-b8n8) — and the queue's own
    // resolution and review-session attempts are attempts too. Right after
    // one of them ends, the queue re-observes the head before the next scan
    // has refilled the registry, so the row it is driving read as
    // `not_in_pr_wait` (`repair_head_unobservable`, UI-w25i). The queue item
    // is the evidence that survives that window; bd still confirms the row
    // below exactly as for a registry hit, so nothing is admitted on the
    // queue's word alone.
    const in_registry = !!external && !!external.get(workspace, bead_id);
    if (!in_registry && !inMergeQueue(q, bead_id)) {
      return { ok: false, reason: 'not_in_pr_wait' };
    }
    if (typeof deps.bd.readIssue !== 'function') {
      return { ok: false, reason: 'bd_read_unsupported' };
    }
    /** @type {Record<string, any>} */
    let issue;
    try {
      issue = await deps.bd.readIssue(bead_id);
    } catch (err) {
      log('external lane re-read failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'bd_read_failed' };
    }
    if (issue.status !== 'resolved') {
      return { ok: false, reason: 'not_resolved' };
    }
    const md = issue.metadata;
    const pr_url =
      md && typeof md === 'object'
        ? /** @type {Record<string, unknown>} */ (md).pr_url
        : null;
    if (typeof pr_url !== 'string' || pr_url.length === 0) {
      return { ok: false, reason: 'pr_url_missing' };
    }
    return {
      ok: true,
      external: true,
      pr_url,
      metadata: /** @type {Record<string, any>} */ (md)
    };
  }

  /**
   * The bead's EXPECTED merge target base (worker-base-scope-alignment §5).
   *
   * The two operands of the pre-merge comparison must come from different
   * sides, so this function has exactly TWO sources and neither is an
   * observation:
   *
   *   1. a valid worker attempt's `target_base` — the base the branch was
   *      actually cut from, and
   *   2. `resolveTargetBase(repo)` — the repo's own declaration.
   *
   * What was REMOVED is as load-bearing as what stayed. The old chain continued
   * into `hint` and then the observation cache's `base_ref`, but `hint` IS an
   * observation (its own doc said `base_ref as the click-time gate observed it`)
   * — so an external PR, which has no attempt, fell through to comparing the
   * observed base against itself. The hardcoded `'main'` terminus is gone too:
   * resolution failure is fail-closed, not a fallback.
   *
   * An external CONFLICT-RESOLUTION attempt is still skipped (UI-w0hi §1): it
   * records the base the resolution CLICK observed, not the base the PR was
   * opened against, so it is an observation wearing an attempt's clothes.
   *
   * @param {Queue} q
   * @param {string} bead_id
   * @param {import('./target-base.js').TargetBaseResult} [declaration]
   * @returns {Promise<{ ok: true, base: string, source: 'attempt'|'declaration' }|{ ok: false, reason: string }>}
   */
  async function expectedBaseFor(q, bead_id, declaration = undefined) {
    const attempts = q && q.attempts ? Object.values(q.attempts) : [];
    /** @type {{ base: string, at: number }|null} */
    let best = null;
    for (const a of attempts) {
      if (!a || a.bead_id !== bead_id || typeof a.target_base !== 'string') {
        continue;
      }
      if (a.external_conflict === true || !isImplementationAttempt(a)) {
        continue;
      }
      const at = typeof a.finished_at === 'number' ? a.finished_at : 0;
      if (!best || at >= best.at) {
        best = { base: a.target_base, at };
      }
    }
    if (best && best.base.length > 0) {
      return { ok: true, base: best.base, source: 'attempt' };
    }
    if (typeof deps.resolveBase !== 'function') {
      return { ok: false, reason: 'base_unresolved:no_resolver' };
    }
    /** @type {import('./target-base.js').TargetBaseResult|undefined} */
    let resolved = declaration;
    if (!resolved) {
      try {
        // `force`: the merge is IRREVERSIBLE, so its expected base may not come
        // from the scan path's short-lived memo. A declaration that changed since
        // the last scan would otherwise be compared against a stale expectation
        // (implementation review 2026-07-30).
        resolved = await deps.resolveBase({ force: true });
      } catch {
        return { ok: false, reason: 'base_unresolved:git_error' };
      }
    }
    if (!resolved.ok) {
      return { ok: false, reason: `base_unresolved:${resolved.step}` };
    }
    return { ok: true, base: resolved.base, source: 'declaration' };
  }

  /**
   * The pre-merge base comparison (worker-base-scope-alignment §5): the PR's
   * OBSERVED `baseRefName` against the EXPECTED base above. A mismatch is
   * fail-closed and NEVER auto-retargeted — changing a PR's base changes its
   * diff and what was reviewed, so it is a human decision.
   *
   * Applied to external PRs too, and deliberately BEFORE every other branch of
   * the click (already-merged cleanup, conflict dispatch, merge): an external PR
   * opened with no `--base` is precisely where the wrong base comes from, and
   * syncing/verifying/deploying the expected base for a PR that landed somewhere
   * else would hide the landing rather than report it.
   *
   * @param {Queue} q
   * @param {string} bead_id
   * @param {string|null|undefined} observed_base_ref
   * @param {{ ok: true, base: string, source: 'attempt'|'declaration' }} [expected_input]
   * @returns {Promise<{ ok: true, base: string }|{ ok: false, reason: string }>}
   */
  async function baseGate(
    q,
    bead_id,
    observed_base_ref,
    expected_input = undefined
  ) {
    const expected = expected_input || (await expectedBaseFor(q, bead_id));
    if (!expected.ok) {
      return expected;
    }
    const observed =
      typeof observed_base_ref === 'string' ? observed_base_ref.trim() : '';
    if (observed.length === 0) {
      return { ok: false, reason: 'base_ref_unobserved' };
    }
    if (observed !== expected.base) {
      return {
        ok: false,
        reason: `base_mismatch:${expected.base}!=${observed}`
      };
    }
    return { ok: true, base: expected.base };
  }

  /**
   * The branch the PR was opened FROM. Convention makes it the bead id, and a
   * worker attempt guarantees it — an external PR does not, so GitHub's own
   * `headRefName` wins when it says something else (UI-7agi §3). Deleting the
   * wrong branch is not a risk here: an unknown branch is a no-op, and the one
   * that just merged is the one gh names.
   *
   * @param {string} bead_id
   * @param {string|null} hint
   * @returns {string}
   */
  function headBranchFor(bead_id, hint) {
    if (typeof hint === 'string' && hint.length > 0) {
      return hint;
    }
    const observed = deps.observations.get(workspace, bead_id);
    const head_ref = observed && observed.pr ? observed.pr.head_ref : '';
    return typeof head_ref === 'string' && head_ref.length > 0
      ? head_ref
      : branchForBead(bead_id);
  }

  /**
   * The Worker attempt this bead's receipt is judged against — the LATEST one,
   * whether or not it carries a baseline. External conflict attempts are
   * skipped for the same reason {@link expectedBaseFor} skips them: they
   * observe a PR they did not produce.
   *
   * Deliberately NOT "the latest attempt that has a baseline": an older
   * attempt's snapshot describes a different dispatch, so reusing it would read
   * this attempt's ordinary metadata as an appeared-or-changed key and hold a
   * good PR. A latest attempt without a baseline correctly yields `null`, which
   * skips the baseline-dependent checks instead of guessing.
   *
   * @param {string} bead_id
   * @returns {any|null}
   */
  function receiptAttemptFor(bead_id) {
    /** @type {any[]} */
    let attempts;
    try {
      attempts = Object.values(deps.store.snapshot(workspace).attempts || {});
    } catch {
      return null;
    }
    /** @type {{ attempt: any, at: number }|null} */
    let best = null;
    for (const attempt of attempts) {
      if (
        !attempt ||
        attempt.bead_id !== bead_id ||
        attempt.external_conflict === true ||
        // A review session carries no `receipt_baseline` (UI-hk74 §7), so
        // letting one win "latest" would answer `null` here and skip every
        // baseline-dependent forgery check the receipt gate exists to run.
        !isImplementationAttempt(attempt)
      ) {
        continue;
      }
      const at =
        typeof attempt.finished_at === 'number'
          ? attempt.finished_at
          : typeof attempt.started_at === 'number'
            ? attempt.started_at
            : 0;
      if (!best || at >= best.at) {
        best = { attempt, at };
      }
    }
    return best ? best.attempt : null;
  }

  /**
   * RE-OBSERVE the execution receipt at action time (UI-bu6d §4).
   *
   * The attempt's own recorded `receipt_check` is deliberately NOT read back:
   * metadata may have been forged further OR repaired since the session ended,
   * and only the current state may decide. That is what makes a user's fix lift
   * the hold on the next click, and a later forgery catch it.
   *
   * Every failure to observe is `probe_error`, which the gate holds on — the
   * same fail-closed side the ancestry probe takes.
   *
   * @param {Record<string, any>|null} metadata
   * @param {string} bead_id
   * @param {string} head_sha
   * @param {import('./merge-gate.js').AncestryProbe} [probe] - A pinned
   * foreign PR's head is judged in its target checkout (UI-k467 §3.3).
   * @returns {Promise<import('./merge-gate.js').ReceiptGateState>}
   */
  async function receiptGateStateOf(
    metadata,
    bead_id,
    head_sha,
    probe = probeAncestry
  ) {
    if (!metadata) {
      return { state: 'probe_error', codes: [], details: [] };
    }
    const attempt = receiptAttemptFor(bead_id);
    try {
      return receiptGateState(
        await checkReceipts({
          metadata,
          baseline: attempt?.receipt_baseline ?? null,
          lineage: receiptLineageForAttempt(attempt),
          defaults: receiptDefaultsFrom(loadExecutionDefaults()),
          head: head_sha,
          probeAncestry: probe
        })
      );
    } catch (err) {
      log('receipt check threw for %s: %o', bead_id, err);
      return { state: 'probe_error', codes: [], details: [] };
    }
  }

  /**
   * Read both workflow authorities at action time from ONE Bead observation.
   *
   * Quick fixes intentionally carry no formal review receipts. Spec-backed
   * routes require a reviewed spec and an implementation receipt that is the
   * observed PR head or one of its ancestors (UI-vzyh §2). The receipt backing
   * (UI-bu6d §4) is judged from the SAME read, so the two verdicts can never
   * describe different moments of the bead.
   *
   * A bd read that could not happen at all is reported APART from the verdict
   * it produces (UI-hk74 §10 / review F6). The verdict stays exactly what it
   * was — `invalid` holds the gate, which is the fail-closed side every other
   * caller already depends on — but `authority_unreadable` lets the automatic
   * metadata watch tell "the record says no" from "the record could not be
   * read", and wait for the next event instead of stopping for a human.
   *
   * @param {string} bead_id
   * @param {string} head_sha
   * @param {import('./merge-gate.js').AncestryProbe} [probe]
   * @returns {Promise<{ review_receipt_state: import('./merge-gate.js').CurrentState, receipt_state: import('./merge-gate.js').ReceiptGateState, authority_unreadable: boolean }>}
   */
  async function readGateAuthority(bead_id, head_sha, probe = probeAncestry) {
    if (typeof deps.bd.readIssue !== 'function') {
      return {
        review_receipt_state: 'invalid',
        receipt_state: { state: 'probe_error', codes: [], details: [] },
        authority_unreadable: true
      };
    }
    /** @type {Record<string, any>} */
    let issue;
    try {
      issue = await deps.bd.readIssue(bead_id);
    } catch (err) {
      log('review receipt read failed for %s: %o', bead_id, err);
      return {
        review_receipt_state: 'invalid',
        receipt_state: { state: 'probe_error', codes: [], details: [] },
        authority_unreadable: true
      };
    }
    const metadata =
      issue &&
      typeof issue.metadata === 'object' &&
      !Array.isArray(issue.metadata)
        ? issue.metadata
        : null;
    const receipt_state = await receiptGateStateOf(
      metadata,
      bead_id,
      head_sha,
      probe
    );
    return {
      authority_unreadable: false,
      review_receipt_state: await reviewReceiptState(issue, head_sha, probe),
      receipt_state:
        receipt_state.state !== 'ok' &&
        manualMergeAuthorityCovers(bead_id, head_sha)
          ? {
              state: 'waived',
              codes: receipt_state.codes,
              details: receipt_state.details
            }
          : receipt_state
    };
  }

  /**
   * Whether a MANUAL merge authority (UI-58w8 §1) bound to exactly this head is
   * queued for the bead. A person's [머지] click is the "user's own merge" the
   * receipt hold defers to (UI-bu6d §4): the receipt finding is a record
   * defect, so the click lifts the hold while the codes stay on the board.
   * Automatic enrolment carries no such authority, and a head that moved since
   * the click is not covered — the authority binds what the person saw.
   *
   * @param {string} bead_id
   * @param {string|null} head_sha
   */
  function manualMergeAuthorityCovers(bead_id, head_sha) {
    const q = deps.store.snapshot(workspace);
    const entry = Array.isArray(q.merge_queue)
      ? q.merge_queue.find(
          (/** @type {any} */ item) => item && item.bead_id === bead_id
        )
      : null;
    const authority = entry && entry.authority ? entry.authority : null;
    return (
      authority !== null &&
      authority.source === 'manual' &&
      authority.requested_head_sha === String(head_sha).toLowerCase()
    );
  }

  /**
   * ONE authoritative observation at click time: read the PR, resolve a lazy
   * `UNKNOWN` mergeability, and write the result into the observation cache so
   * the badge the user sees next matches the decision that
   * was just taken on it.
   *
   * @param {string} bead_id
   * @param {number} number
   * @param {import('./foreign-target.js').ForeignPrTarget|null} [target] - A
   * pinned foreign PR is read through its slug (UI-k467 §3.1).
   * @returns {Promise<{ pr: PrDetail }|{ error: string }>}
   */
  async function observeNow(bead_id, number, target = null) {
    const gh = ghFor(target);
    const foreign = target ? { foreign: foreignObservation(target) } : {};
    /** @type {any} */
    let detail;
    try {
      detail = await gh.prDetail(repo, number);
    } catch {
      detail = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (
      detail.state === 'ok' &&
      detail.data.state === 'OPEN' &&
      detail.data.mergeable === 'UNKNOWN'
    ) {
      await sleep(requery_delay_ms);
      try {
        const again = await gh.prDetail(repo, number);
        if (again.state === 'ok') {
          detail = again;
        }
      } catch {
        // Keep the first reading; the gate below fails closed on UNKNOWN.
      }
    }
    if (detail.state !== 'ok') {
      const error = detail.state === 'error' ? detail.reason : 'gh_empty';
      deps.observations.record(workspace, bead_id, { error, ...foreign });
      return { error };
    }
    const pr = /** @type {PrDetail} */ (detail.data);
    // A terminal PR is classified by its state alone.
    deps.observations.record(workspace, bead_id, {
      error: null,
      pr,
      ...foreign
    });
    return { pr };
  }

  /**
   * The click-time gate of a pinned foreign PR (UI-k467 §3.4–§3.5): the
   * checkout is bound, the three `foreign_handoff` causes are judged ahead of
   * every other branch (so neither the queue driver, `dispatchConflict` nor a
   * click ever reaches a resolver), and the target `[verify]` runs from the
   * fetched `foreign_base` tip's declaration, bound to (PR head, base tip).
   *
   * A handoff is an `error` the caller refuses with; the manual-merge waiver
   * reads `receipt_state` only, so a click cannot lift it.
   *
   * @param {string} bead_id
   * @param {number} number
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @returns {Promise<any>}
   */
  async function foreignGateNow(bead_id, number, target) {
    const observed = await observeNow(bead_id, number, target);
    if ('error' in observed) {
      return observed;
    }
    const pr = observed.pr;
    if (pr.state !== 'OPEN') {
      return {
        pr,
        verdict: evaluateMergeGate(deps.observations.get(workspace, bead_id), {
          review_receipt_state: 'current',
          verify_receipt_state: { declaration_state: 'absent', receipt: null }
        }),
        target
      };
    }
    if (!repo_operations) {
      return { error: 'repo_operations_unavailable' };
    }
    const bound = await bindForeignTarget(target, deps.gitRun);
    if (!bound.ok) {
      deps.observations.record(workspace, bead_id, {
        error: bound.reason,
        pr,
        foreign: foreignObservation(target)
      });
      return { error: bound.reason };
    }
    const probe = createAncestryProbe({
      gitRun: deps.gitRun,
      repo: bound.target.path,
      remote: bound.target.remote
    });
    const { review_receipt_state, receipt_state, authority_unreadable } =
      await readGateAuthority(bead_id, pr.head_sha, probe);
    const review_receipt = {
      state: review_receipt_state,
      head_sha: pr.head_sha
    };
    const judgment = await judgeForeignPreMerge({
      target: bound.target,
      pr,
      gitRun: deps.gitRun,
      resolveRepoOps
    });
    if (!judgment.ok) {
      deps.observations.record(workspace, bead_id, {
        error: judgment.reason,
        pr,
        review_receipt,
        foreign: foreignObservation(target)
      });
      return { error: judgment.reason };
    }
    if (judgment.handoff !== null) {
      const reason = foreignHandoffReason(judgment.handoff);
      deps.observations.record(workspace, bead_id, {
        error: reason,
        pr,
        review_receipt,
        foreign: foreignObservation(target, {
          handoff: judgment.handoff,
          base_sha: judgment.base_sha
        })
      });
      announceHandoff(
        bead_id,
        judgment.handoff,
        judgment.handoff === 'foreign_pr_base_mismatch'
          ? `${pr.base_ref || ''}->${target.base}`
          : judgment.handoff === 'foreign_conflict_needs_human'
            ? String(pr.head_sha || '')
            : `${judgment.base_sha || ''}:${pr.head_sha || ''}`,
        target,
        pr.url || null
      );
      return {
        error: reason,
        pr,
        handoff: judgment.handoff
      };
    }
    const foreign = foreignObservation(target, {
      base_sha: judgment.base_sha,
      verify_declared: judgment.verify_script_path !== null
    });
    deps.observations.record(workspace, bead_id, {
      error: null,
      pr,
      review_receipt,
      foreign
    });
    const base_sha = /** @type {string} */ (judgment.base_sha);
    const common = {
      pr,
      target_base: target.base,
      base_sha,
      repo_operations: true,
      authority_unreadable,
      receipt_state,
      target: bound.target
    };
    const preliminary = evaluateMergeGate(
      deps.observations.get(workspace, bead_id),
      {
        review_receipt_state,
        receipt_state,
        verify_receipt_state: { declaration_state: 'absent', receipt: null }
      }
    );
    if (!preliminary.enabled || judgment.verify_script_path === null) {
      return {
        ...common,
        verdict: preliminary,
        verify_operation_id: null,
        verify_attempted: false
      };
    }
    const ensured = await repo_operations.ensureVerify({
      repo: bound.target.path,
      origin: bound.target.remote,
      target_base: target.base,
      base_sha,
      head_sha: pr.head_sha,
      bead_id,
      pr_number: number,
      script_path: judgment.verify_script_path,
      foreign: {
        slug: bound.target.slug,
        path: bound.target.path,
        remote: bound.target.remote
      }
    });
    if (ensured.inert) {
      return {
        ...common,
        verdict: preliminary,
        verify_operation_id: null,
        verify_attempted: false
      };
    }
    if (!ensured.ok || typeof ensured.operation_id !== 'string') {
      return {
        ...common,
        verdict: evaluateMergeGate(deps.observations.get(workspace, bead_id), {
          review_receipt_state,
          receipt_state,
          verify_receipt_state: {
            declaration_state: 'invalid',
            receipt: null,
            error: ensured.code ?? 'operation_id_missing'
          }
        }),
        verify_operation_id: null,
        verify_attempted: true
      };
    }
    const receipt =
      (await repo_operations.waitForTerminal(ensured.operation_id, {
        head_sha: pr.head_sha,
        timeout_ms: ensured.timeout_ms
      })) || repo_operations.verifyReceipt(ensured.operation_id, pr.head_sha);
    if (receipt?.state === 'succeeded' || receipt?.state === 'failed') {
      deps.observations.recordVerify(workspace, bead_id, receipt);
    }
    return {
      ...common,
      verdict: evaluateMergeGate(deps.observations.get(workspace, bead_id), {
        review_receipt_state,
        receipt_state,
        verify_receipt_state: {
          declaration_state: 'present',
          receipt:
            receipt?.state === 'succeeded' || receipt?.state === 'failed'
              ? receipt
              : null,
          expected_key: receipt
            ? {
                effective_base_sha: receipt.effective_base_sha,
                head_sha: receipt.head_sha,
                candidate_tree_sha: receipt.candidate_tree_sha,
                script_object_type: receipt.script_object_type,
                script_mode: receipt.script_mode,
                script_blob_sha: receipt.script_blob_sha
              }
            : null
        }
      }),
      verify_operation_id: ensured.operation_id,
      verify_attempted: true
    };
  }

  /**
   * Re-observe and re-evaluate the merge gate FOR THE CURRENT HEAD SHA, running
   * the local verification when that is the deciding tier and no result is
   * bound to this exact commit.
   *
   * This is the step that makes a stale green worthless: the gate compares the
   * verify receipt binding against the sha just read, so a head that advanced (a
   * branch update, a conflict resolution's push) or a cache the restart emptied
   * both land on `verify_missing` / `verify_sha_stale` and re-run rather than
   * pass.
   *
   * @param {string} bead_id
   * @param {number} number
   * @param {import('./target-base.js').TargetBaseResult} [base_pin]
   * @returns {Promise<{ pr: PrDetail, verdict: import('./merge-gate.js').MergeGateVerdict, target_base?: string, base_sha?: string, repo_operations?: boolean, verify_operation_id?: string|null, verify_attempted?: boolean, authority_unreadable?: boolean, receipt_state?: import('./merge-gate.js').ReceiptGateState }|{ error: string }>}
   */
  async function gateNow(bead_id, number, base_pin) {
    const observed = await observeNow(bead_id, number);
    if ('error' in observed) {
      return observed;
    }
    const pr = observed.pr;
    if (pr.state === 'OPEN') {
      if (!repo_operations) {
        return { error: 'repo_operations_unavailable' };
      }
      let pinned = base_pin;
      if (!pinned) {
        try {
          pinned = await deps.resolveBase?.({ force: true });
        } catch {
          return { error: 'base_unresolved:git_error' };
        }
      }
      if (!pinned?.ok || typeof pinned.base_oid !== 'string') {
        return {
          error: `base_unresolved:${pinned && 'step' in pinned ? pinned.step : 'no_resolver'}`
        };
      }
      const config = await repo_operations.hasConfig(pinned.base_oid, {
        current_target_base: true
      });
      if (!config.ok) {
        return { error: config.code || 'repo_ops_config_invalid' };
      }
      const { review_receipt_state, receipt_state, authority_unreadable } =
        await readGateAuthority(bead_id, pr.head_sha);
      deps.observations.record(workspace, bead_id, {
        error: null,
        pr,
        review_receipt: {
          state: review_receipt_state,
          head_sha: pr.head_sha
        }
      });
      const preliminary = evaluateMergeGate(
        deps.observations.get(workspace, bead_id),
        {
          review_receipt_state,
          receipt_state,
          verify_receipt_state: {
            declaration_state: 'absent',
            receipt: null
          }
        }
      );
      if (!preliminary.enabled || !config.verify_script_path) {
        return {
          pr,
          verdict: preliminary,
          target_base: pinned.base,
          base_sha: pinned.base_oid,
          repo_operations: true,
          verify_operation_id: null,
          verify_attempted: false,
          authority_unreadable,
          receipt_state
        };
      }
      const ensured = await repo_operations.ensureVerify({
        repo,
        origin: 'origin',
        target_base: pinned.base,
        base_sha: pinned.base_oid,
        head_sha: pr.head_sha,
        bead_id,
        pr_number: number,
        script_path: config.verify_script_path
      });
      if (ensured.inert) {
        return {
          pr,
          verdict: preliminary,
          target_base: pinned.base,
          base_sha: pinned.base_oid,
          repo_operations: true,
          verify_operation_id: null,
          verify_attempted: false,
          authority_unreadable,
          receipt_state
        };
      }
      if (!ensured.ok || typeof ensured.operation_id !== 'string') {
        return {
          pr,
          verdict: evaluateMergeGate(
            deps.observations.get(workspace, bead_id),
            {
              review_receipt_state,
              receipt_state,
              verify_receipt_state: {
                declaration_state: 'invalid',
                receipt: null,
                // The coordinator can only reconstruct a cause it was handed;
                // dropping this code is what left one live incident unexplained
                // (spec §6.2).
                error: ensured.code ?? 'operation_id_missing'
              }
            }
          ),
          target_base: pinned.base,
          base_sha: pinned.base_oid,
          repo_operations: true,
          verify_operation_id:
            typeof ensured.operation_id === 'string'
              ? ensured.operation_id
              : null,
          verify_attempted: true,
          authority_unreadable,
          receipt_state
        };
      }
      const receipt =
        (await repo_operations.waitForTerminal(ensured.operation_id, {
          head_sha: pr.head_sha,
          timeout_ms: ensured.timeout_ms
        })) || repo_operations.verifyReceipt(ensured.operation_id, pr.head_sha);
      if (receipt?.state === 'succeeded' || receipt?.state === 'failed') {
        deps.observations.recordVerify(workspace, bead_id, receipt);
      }
      const expected_key = receipt
        ? {
            effective_base_sha: receipt.effective_base_sha,
            head_sha: receipt.head_sha,
            candidate_tree_sha: receipt.candidate_tree_sha,
            script_object_type: receipt.script_object_type,
            script_mode: receipt.script_mode,
            script_blob_sha: receipt.script_blob_sha
          }
        : null;
      return {
        pr,
        verdict: evaluateMergeGate(deps.observations.get(workspace, bead_id), {
          review_receipt_state,
          receipt_state,
          verify_receipt_state: {
            declaration_state: 'present',
            receipt:
              receipt?.state === 'succeeded' || receipt?.state === 'failed'
                ? receipt
                : null,
            expected_key
          }
        }),
        target_base: pinned.base,
        base_sha: pinned.base_oid,
        repo_operations: true,
        verify_operation_id: ensured.operation_id,
        verify_attempted: true,
        authority_unreadable,
        receipt_state
      };
    }
    return {
      pr,
      verdict: evaluateMergeGate(deps.observations.get(workspace, bead_id), {
        review_receipt_state: 'current',
        verify_receipt_state: {
          declaration_state: 'absent',
          receipt: null
        }
      })
    };
  }

  /**
   * Whether a gated PR that reads MERGED names its merge commit.
   *
   * @param {any} pr
   * @returns {boolean}
   */
  function mergedShaObserved(pr) {
    return (
      pr.state !== 'MERGED' ||
      (typeof pr.merged_sha === 'string' &&
        /^[0-9a-f]{40}$/i.test(pr.merged_sha))
    );
  }

  /**
   * The completion gate's authority for a workspace PR: the declared base,
   * resolved and pinned, and the ordinary gate.
   *
   * @param {Queue} q
   * @param {string} bead_id
   * @param {number} number
   * @returns {Promise<{ ok: true, gated: any, authority: { target_base: string, base_sha: string } }|{ ok: false, reason: string }>}
   */
  async function workspaceCompletionAuthority(q, bead_id, number) {
    if (typeof deps.resolveBase !== 'function') {
      return { ok: false, reason: 'base_unresolved:no_resolver' };
    }
    let pinned;
    try {
      pinned = await deps.resolveBase({ force: true });
    } catch {
      return { ok: false, reason: 'base_unresolved:git_error' };
    }
    if (!pinned.ok) {
      return { ok: false, reason: `base_unresolved:${pinned.step}` };
    }
    const expected = await expectedBaseFor(q, bead_id, pinned);
    if (!expected.ok) {
      return { ok: false, reason: expected.reason };
    }
    if (pinned.base !== expected.base) {
      return {
        ok: false,
        reason: `base_pin_mismatch:${expected.base}!=${pinned.base}`
      };
    }
    if (typeof pinned.base_oid !== 'string' || pinned.base_oid.length === 0) {
      return { ok: false, reason: 'base_sha_unobserved' };
    }
    const gated = await gateNow(bead_id, number, pinned);
    if ('error' in gated) {
      return { ok: false, reason: gated.error };
    }
    const base_ok = await baseGate(q, bead_id, gated.pr.base_ref, expected);
    if (!base_ok.ok) {
      return { ok: false, reason: base_ok.reason };
    }
    if (!mergedShaObserved(gated.pr)) {
      return { ok: false, reason: 'merge_sha_unobserved' };
    }
    const authority =
      gated.pr.state === 'OPEN'
        ? { target_base: gated.target_base, base_sha: gated.base_sha }
        : { target_base: pinned.base, base_sha: pinned.base_oid };
    if (
      authority.target_base !== expected.base ||
      typeof authority.base_sha !== 'string' ||
      authority.base_sha.length === 0
    ) {
      return { ok: false, reason: 'base_authority_unobserved' };
    }
    return {
      ok: true,
      gated,
      authority: {
        target_base: authority.target_base,
        base_sha: authority.base_sha
      }
    };
  }

  /**
   * The completion gate's authority for a pinned foreign PR (UI-k467 §3.4):
   * `foreign_base` is the expected base, and its tip is the one fetched from
   * the bound remote — by the foreign gate for an OPEN PR, by a fresh fetch
   * otherwise. The number comes from the same `pr_url` parse as the slug.
   *
   * @param {string} bead_id
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @param {{ number: number, url?: string|null }} ref
   * @returns {Promise<{ ok: true, gated: any, authority: { target_base: string, base_sha: string } }|{ ok: false, reason: string }>}
   */
  async function foreignCompletionAuthority(bead_id, target, ref) {
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return { ok: false, reason: pinned.reason };
    }
    const gated = await foreignGateNow(bead_id, pinned.number, target);
    if ('error' in gated) {
      return { ok: false, reason: gated.error };
    }
    if (!mergedShaObserved(gated.pr)) {
      return { ok: false, reason: 'merge_sha_unobserved' };
    }
    /** @type {string|null} */
    let base_sha =
      gated.pr.state === 'OPEN' && typeof gated.base_sha === 'string'
        ? gated.base_sha
        : null;
    if (gated.pr.state !== 'OPEN') {
      const bound = await bindForeignTarget(target, deps.gitRun);
      if (!bound.ok) {
        return { ok: false, reason: bound.reason };
      }
      const tip = await fetchForeignBaseTip(bound.target, deps.gitRun);
      base_sha = tip.ok ? tip.sha : null;
    }
    if (base_sha === null || base_sha.length === 0) {
      return { ok: false, reason: 'base_authority_unobserved' };
    }
    return {
      ok: true,
      gated,
      authority: { target_base: target.base, base_sha }
    };
  }

  /**
   * Re-run the authoritative merge gate and expose only the SHA-bound evidence
   * the completion coordinator needs. This path never updates a branch, merges
   * a PR, or starts cleanup.
   *
   * @param {string} bead_id
   * @param {'root'} [role]
   * @returns {Promise<any>}
   */
  async function completionGate(bead_id, role = 'root') {
    const q = deps.store.snapshot(workspace);
    const member = await laneMembership(q, bead_id);
    if (!member.ok) {
      return { ok: false, reason: member.reason };
    }
    if (member.external === true) {
      return { ok: false, reason: 'external_completion_unsupported' };
    }
    // A pinned foreign PR runs the SAME saga with its target as the authority
    // (UI-k467 §3.4): the foreign gate (detection, bound checkout, the three
    // `foreign_handoff` causes, target `[verify]`) replaces the workspace base
    // resolution, so a verify failure lands as the same `pre_merge_hold`.
    const foreign = await foreignTargetFor(bead_id);
    if (foreign.state === 'invalid') {
      return { ok: false, reason: foreign.reason };
    }
    const ref = resolvePrRef(q, bead_id, null);
    if (!ref || typeof ref.number !== 'number') {
      return { ok: false, reason: 'pr_ref_unknown' };
    }
    const judged =
      foreign.state === 'ok'
        ? await foreignCompletionAuthority(bead_id, foreign.target, ref)
        : await workspaceCompletionAuthority(q, bead_id, ref.number);
    if (!judged.ok) {
      return { ok: false, reason: judged.reason };
    }
    const { gated, authority } = judged;
    const entry = deps.observations.get(workspace, bead_id);
    const verify = entry?.verify;
    return {
      ok: true,
      // §10: the automatic metadata watch must be able to tell a refusal from
      // an unread record. Every other caller ignores this field.
      authority_unreadable: gated.authority_unreadable === true,
      target_base: authority.target_base,
      base_sha: authority.base_sha,
      subject: {
        role,
        bead_id,
        pr_url: gated.pr.url,
        head_sha: gated.pr.head_sha,
        base_sha: authority.base_sha,
        merged_sha: gated.pr.state === 'MERGED' ? gated.pr.merged_sha : null
      },
      verdict: gated.verdict,
      evidence: {
        // Which key moved, not only which code fired: the terminal record is
        // the only place a person reads the cause from (spec §4.2).
        ...(gated.receipt_state?.state === 'unbacked'
          ? {
              receipt: {
                codes: gated.receipt_state.codes,
                details: gated.receipt_state.details
              }
            }
          : {}),
        ...(verify
          ? {
              verify: {
                head_sha: verify.head_sha,
                ok: verify.ok,
                reason: verify.reason,
                ...(typeof verify.output_tail === 'string'
                  ? { output_tail: verify.output_tail.slice(-4000) }
                  : {}),
                ...(typeof verify.log_path === 'string'
                  ? { log_path: verify.log_path }
                  : {})
              }
            }
          : {})
      }
    };
  }

  // -------------------------------------------------------------------------
  // Post-merge cleanup — ONE implementation, two triggers (§6).
  // -------------------------------------------------------------------------

  /**
   * Step 1 — base 동기화, with an EXPLICIT outcome (§6).
   *
   * Fetches and pins the base for downstream containment and deployment. On
   * the base branch, the installed workflow helper owns lossless local sync,
   * including dirty checkouts. Its outcome never blocks cleanup: downstream
   * operations use the fetched SHA, independently of the local checkout.
   *
   * @param {string} target_base
   * @param {string|null} [candidate_sha] - Already fetched candidate. When
   * present, update the checkout toward this exact commit instead of fetching
   * a potentially newer base tip.
   * @returns {Promise<{ ok: true, sha: string, outcome: BaseSyncOutcome }|{ ok: false, reason: string }>}
   */
  async function syncBase(target_base, candidate_sha = null) {
    // Every command below writes or reads this repo's ref database, so the whole
    // sequence is serialized under the topology lock (§8). No worktree-manager
    // call happens inside — those take the same lock (see `withTopologyLock`).
    return deps.worktree.withTopologyLock(repo, async () => {
      let sha = candidate_sha;
      if (sha === null) {
        const fetched = await deps.gitRun(
          ['fetch', '--no-tags', 'origin', target_base],
          { cwd: repo }
        );
        if (fetched.code !== 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'base_fetch_failed'
          };
        }
        const rev = await deps.gitRun(['rev-parse', `origin/${target_base}`], {
          cwd: repo
        });
        if (rev.code !== 0 || rev.stdout.trim().length === 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'base_rev_unavailable'
          };
        }
        sha = rev.stdout.trim();
      }
      const head = await deps.gitRun(['rev-parse', '--abbrev-ref', 'HEAD'], {
        cwd: repo
      });
      if (head.code !== 0 || head.stdout.trim() !== target_base) {
        return {
          ok: /** @type {const} */ (true),
          sha,
          outcome: /** @type {BaseSyncOutcome} */ ('fetch_only:not_on_base')
        };
      }
      /** @type {BaseSyncOutcome} */
      let outcome = 'base_sync:failed:script_missing';
      try {
        const script = ['claude', 'codex']
          .map((runner) =>
            path.join(
              workflowScriptDir(home_dir, runner),
              'sync-target-base-checkout.py'
            )
          )
          .find((file) => existsSync(file));
        if (script) {
          const synced = await runBaseSync(
            'python3',
            [
              script,
              '--repo',
              repo,
              '--remote',
              'origin',
              '--base',
              target_base,
              '--target-sha',
              sha
            ],
            { cwd: repo, encoding: 'utf8' }
          );
          const report = JSON.parse(synced.stdout);
          outcome =
            report !== null &&
            typeof report.result === 'string' &&
            report.result.length > 0 &&
            typeof report.reason === 'string' &&
            report.reason.length > 0
              ? `base_sync:${report.result}:${report.reason}`
              : 'base_sync:failed:invalid_response';
        }
      } catch (error) {
        const code = /** @type {NodeJS.ErrnoException} */ (error).code;
        outcome = `base_sync:failed:${error instanceof SyntaxError ? 'invalid_json' : code || 'script_error'}`;
        try {
          const report = JSON.parse(
            /** @type {{ stdout: string }} */ (error).stdout
          );
          if (
            report !== null &&
            report.result === 'failed' &&
            typeof report.reason === 'string' &&
            report.reason.length > 0
          ) {
            outcome = `base_sync:failed:${report.reason}`;
          }
        } catch {
          // Keep the execution error when no valid failure report was emitted.
        }
      }
      return {
        ok: /** @type {const} */ (true),
        sha,
        outcome
      };
    });
  }

  /**
   * Step 2 — compatibility verification from the exact pinned repository
   * declaration, run against the MERGED base in a detached worktree. An absent
   * `[verify]` lane is inert; an unreadable or invalid declaration fails closed.
   *
   * The resolution is pinned to `base_sha` — the merged base this step verifies
   * — so the commands come from the same commit as the code they run against.
   *
   * @param {string} bead_id
   * @param {string} base_sha
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, detail?: string, output_tail?: string, log_path?: string, retry_count?: number }>}
   */
  async function postMergeVerify(bead_id, base_sha) {
    const resolved = await resolveVerify({ sha: base_sha });
    if (resolved.state === 'absent') {
      return { ok: true };
    }
    if (resolved.state !== 'resolved') {
      return {
        ok: false,
        reason: resolved.reason || 'repo_ops_config_invalid'
      };
    }
    /** @type {{ ok: boolean, reason: string, detail?: string, output_tail?: string, log_path?: string, attempts?: { reason: string, log_path?: string }[] }} */
    let r;
    try {
      r = await runVerify({
        repo,
        bead_id: `${bead_id}-postmerge`,
        sha: base_sha,
        pr_number: null,
        cmd: resolved.value.cmd,
        timeout_ms: resolved.value.timeout_ms,
        retry_flaky: true
      });
    } catch (err) {
      log('post-merge verification threw for %s: %o', bead_id, err);
      return { ok: false, reason: 'verify_cmd_spawn_error' };
    }
    if (r.ok && Array.isArray(r.attempts) && r.attempts.length === 2) {
      await appendVerifyFlakeNote(bead_id, 'post_merge_verify', r.attempts);
    }
    return r.ok
      ? { ok: true }
      : {
          ok: false,
          reason: r.reason,
          detail: r.detail,
          output_tail: r.output_tail,
          log_path: r.log_path,
          retry_count: Array.isArray(r.attempts)
            ? Math.max(0, r.attempts.length - 1)
            : 0
        };
  }
  /**
   * Close one bead with a confirming readback (the contract's "readback" —
   * PR Finish closes, and a close nobody confirmed is not a close).
   *
   * `wrote` reports whether the `closed` WRITE was issued without throwing,
   * separately from whether the readback confirmed it. The two differ in exactly
   * the case that matters: a write that landed and a readback that could not be
   * completed leaves bd `closed` while this returns `ok: false`, so the caller
   * must still restore the status rather than assume nothing happened.
   *
   * @param {string} id
   * @returns {Promise<{ ok: boolean, wrote: boolean }>}
   */
  async function closeBead(id) {
    let wrote = false;
    try {
      await deps.bd.setStatus(id, 'closed');
      wrote = true;
      return { ok: (await deps.bd.readStatus(id)) === 'closed', wrote };
    } catch (err) {
      log('bd close failed for %s: %o', id, err);
      return { ok: false, wrote };
    }
  }

  /**
   * Put a bead back to `resolved` with a confirming readback — the repair for a
   * cleanup that stopped AT the parent close (§6, worker-deploy-hook §2).
   *
   * The spec's failure contract is "bead stays `resolved`, handed back to a
   * human". A close that landed (or may have landed) makes that false by doing
   * nothing: the bead reads on the board as finished work while the cleanup
   * actually stopped. Restoring first is what makes the durable failure record
   * accurate.
   *
   * With the parent close moved LAST there is exactly one caller: no step runs
   * after it, so no other failure can find bd already touched.
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async function restoreResolved(id) {
    try {
      await deps.bd.setStatus(id, 'resolved');
      return (await deps.bd.readStatus(id)) === 'resolved';
    } catch (err) {
      log('bd resolved restore failed for %s: %o', id, err);
      return false;
    }
  }

  /**
   * Step 5 — worktree + remote/local branch cleanup. Each removal tolerates
   * "already gone" (GitHub's auto-delete-branch, a worktree the user pruned)
   * but ONLY after CONFIRMING absence: a failed delete whose target still
   * exists stops the cleanup. Nothing here force-pushes or rewrites history —
   * deleting the merged PR's own topic branch is the whole of it, and its
   * ownership is exactly as clear as the merge that just landed it.
   *
   * LOCK BOUNDARY (§8): the worktree removal takes the repo topology lock
   * INSIDE the worktree manager, so it runs first and unlocked here; the branch
   * deletions — which mutate the same ref database — then run under an
   * explicitly acquired hold of that lock. Wrapping both would deadlock on the
   * non-reentrant mutex.
   *
   * @param {string} bead_id
   * @param {string|null} [head_ref] - GitHub's own head branch name, when the
   * click-time gate observed one (UI-7agi §3).
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string }>}
   */
  async function cleanupBranches(bead_id, head_ref = null) {
    const branch = headBranchFor(bead_id, head_ref);
    // The worktree is found BY THE BRANCH being deleted, not by a name derived
    // from the bead id (UI-u7hh §3) — the branch name comes from GitHub, and
    // deriving the worktree separately is what let the two disagree. No
    // `typeof` guard and no confirming re-check: the fallback a guard creates
    // is the very bug being fixed, and the lookup already decides inside one
    // lock hold, so there is nothing left to confirm afterwards.
    const wt = await deps.worktree.removeByBranch({ repo, branch });
    if (!wt.ok) {
      return { ok: false, reason: 'worktree_remove_failed' };
    }

    return deps.worktree.withTopologyLock(repo, async () => {
      const local = await deps.gitRun(['branch', '-D', branch], { cwd: repo });
      if (local.code !== 0) {
        const still = await deps.gitRun(
          ['rev-parse', '--verify', `refs/heads/${branch}`],
          { cwd: repo }
        );
        if (still.code === 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'local_branch_delete_failed'
          };
        }
      }

      const remote = await deps.gitRun(['push', 'origin', '--delete', branch], {
        cwd: repo
      });
      if (remote.code !== 0) {
        const still = await deps.gitRun(
          ['ls-remote', '--heads', 'origin', branch],
          {
            cwd: repo
          }
        );
        if (still.code !== 0 || still.stdout.trim().length > 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'remote_branch_delete_failed'
          };
        }
      }
      return { ok: /** @type {const} */ (true) };
    });
  }

  /**
   * Put the one line a cleanup that backed up leftover content leaves on the
   * bead's history (UI-w2ou §3.4), whether or not it then removed the
   * worktree. The seq names the backup and the outcome, so a rerun that
   * reuses the backup re-appends the same id and a later removal still
   * shows. The result is ignored — history never decides whether a cleanup
   * continues.
   *
   * @param {string} bead_id
   * @param {{ path: string, file_count: number }} backup
   * @param {boolean} worktree_removed
   */
  function recordCleanupBackup(bead_id, backup, worktree_removed) {
    if (!deps.timeline) {
      return;
    }
    try {
      deps.timeline.append({
        bead_id,
        kind: 'merge_step',
        seq: `branch_cleanup:backup:${path.basename(backup.path)}:${worktree_removed ? 'removed' : 'kept'}`,
        summary: worktree_removed
          ? `정리 — 커밋 안 된 변경 ${backup.file_count}개를 백업하고 워크트리를 지움`
          : `정리 — 커밋 안 된 변경 ${backup.file_count}개를 백업함(워크트리는 남김)`,
        detail: backup.path
      });
    } catch (err) {
      log('cleanup backup timeline record failed for %s: %o', bead_id, err);
    }
  }

  /**
   * Normal post-merge cleanup uses the manager's single-lock content proof for
   * the local worktree/ref, then keeps the existing remote ownership check.
   * Explicit discard continues to use {@link cleanupBranches}.
   *
   * @param {string} bead_id
   * @param {string|null} head_ref
   * @param {string|null} head_sha
   * @param {string} merge_sha
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, detail?: string }>}
   */
  async function cleanupCompletedBranches(
    bead_id,
    head_ref,
    head_sha,
    merge_sha
  ) {
    const branch = headBranchFor(bead_id, head_ref);
    let expected_head = head_sha;
    if (
      typeof expected_head !== 'string' ||
      !/^[0-9a-f]{40,64}$/i.test(expected_head)
    ) {
      const observed = await deps.gitRun(
        ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`],
        { cwd: repo }
      );
      if (observed.code !== 0 && observed.code !== 1) {
        return { ok: false, reason: 'worktree_remove_failed' };
      }
      expected_head =
        observed.code === 0 ? observed.stdout.trim() : '0'.repeat(40);
    }
    const local = await deps.worktree.removeCompleted({
      repo,
      branch,
      expected_path: deps.worktree.pathFor(repo, branch),
      expected_head,
      delivered_sha: merge_sha
    });
    const backup =
      local.backup && typeof local.backup.path === 'string'
        ? local.backup
        : null;
    if (backup) {
      recordCleanupBackup(bead_id, backup, local.worktree_removed === true);
    }
    if (!local.ok) {
      // `backup=` is appended AFTER the one `manager_reason=` token the retry
      // classifier counts (resolution-ladder.js), so the class is unchanged.
      return {
        ok: false,
        reason:
          local.reason === 'ref_delete_failed'
            ? 'local_branch_delete_failed'
            : 'worktree_remove_failed',
        detail: `manager_reason=${local.reason ?? 'unknown'} worktree_removed=${local.worktree_removed === true} branch_removed=${local.branch_removed === true}${backup ? ` backup=${backup.path}` : ''}`
      };
    }
    return deps.worktree.withTopologyLock(repo, async () => {
      const remote = await deps.gitRun(['push', 'origin', '--delete', branch], {
        cwd: repo
      });
      if (remote.code !== 0) {
        const still = await deps.gitRun(
          ['ls-remote', '--heads', 'origin', branch],
          { cwd: repo }
        );
        if (still.code !== 0 || still.stdout.trim().length > 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'remote_branch_delete_failed'
          };
        }
      }
      return { ok: /** @type {const} */ (true) };
    });
  }

  /**
   * Announce the merge that CLOSED the bead (UI-9rrk). One hook covers both
   * triggers because both converge on `runCleanup`. The notifier is optional
   * and no-throw by its own contract, so this can never turn a finished cleanup
   * into a failed one — the guard below keeps that true for an injected fake
   * that breaks the contract.
   *
   * AWAITED by the caller (UI-vb0t §3.4): reading the bead title makes the send
   * asynchronous. Closure is not complete until the notifier has spawned its
   * detached child; the child exit remains outside this action.
   *
   * @param {string} bead_id
   * @param {string|null} pr_url
   */
  async function announceMerged(bead_id, pr_url) {
    if (!notify) {
      return;
    }
    try {
      await notify.mergeCompleted({ bead_id, pr_url, repo });
    } catch (err) {
      log('merge notify failed: %o', err);
    }
  }

  /**
   * @param {Queue} q
   * @param {string} bead_id
   * @param {{ merge_sha?: string|null }} refs
   * @param {import('./foreign-target.js').ForeignPrTarget|null} [target]
   * @returns {Promise<string|null>}
   */
  async function cleanupMergeSha(q, bead_id, refs, target = null) {
    const candidates = [
      refs.merge_sha,
      q.completion_intents?.[bead_id]?.subject?.merged_sha,
      authoritativeMergeSha(deps.observations.get(workspace, bead_id)?.pr)
    ];
    for (const candidate of candidates) {
      if (typeof candidate === 'string' && /^[0-9a-f]{40}$/i.test(candidate)) {
        return candidate.toLowerCase();
      }
    }
    const ref = resolvePrRef(
      q,
      bead_id,
      external ? external.get(workspace, bead_id) : null
    );
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return null;
    }
    try {
      const detail = await ghFor(target).prDetail(repo, pinned.number);
      return detail.state === 'ok' && detail.data.state === 'MERGED'
        ? authoritativeMergeSha(detail.data)
        : null;
    } catch {
      return null;
    }
  }

  /**
   * The `post_merge_jobs` step (UI-i60a §1–§3): apply every job file the merged
   * tree carries that this workspace has not applied yet, exactly once per file
   * content, before the row is allowed to close. The judgment and execution are
   * the shared runner's (`post-merge-job.js`, UI-1eag §3.1); this row supplies
   * its merge SHA, its retry authority and its failure record.
   *
   * Returns null when the step is done and closure may continue; anything else
   * is the cleanup result that stops it — a failure record, or a pending wait
   * on an execution this pass must not duplicate.
   *
   * @param {string} bead_id
   * @param {any} row - The `pr_wait` row, for the cursor-recorded merge sha.
   * @param {{ base_sync: BaseSyncOutcome|null, job_retry: boolean }} options
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }|null>}
   */
  async function runPostMergeJobs(bead_id, row, options) {
    const base_sync = options.base_sync;
    const merge_sha = await cleanupMergeSha(
      deps.store.snapshot(workspace),
      bead_id,
      { merge_sha: row?.merge_sha ?? null }
    );
    if (merge_sha === null) {
      return await failCleanup(
        bead_id,
        'post_merge_jobs',
        'merge_sha_unobserved',
        base_sync
      );
    }
    return post_merge_jobs.run({
      bead_id,
      merge_sha,
      job_retry: options.job_retry === true,
      resolveTargetBase: () =>
        expectedBaseFor(deps.store.snapshot(workspace), bead_id),
      onFailure: (reason, evidence) =>
        failCleanup(
          bead_id,
          'post_merge_jobs',
          reason,
          base_sync,
          undefined,
          undefined,
          undefined,
          evidence.log_path
        ),
      onPending: () =>
        /** @type {{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }} */ ({
          ok: true,
          pending: true,
          step: 'post_merge_jobs',
          reason: null,
          base_sync
        })
    });
  }

  /**
   * Execute only the closure half once the repo operations for this row have
   * reached a terminal success.
   *
   * `job_retry_authorized` is deliberately NOT derived from `resume_failure`:
   * every boot- and coordinator-driven resume passes `resume_failure` too, and
   * §3 lets an outcome-unknown job be re-run only under a human click. Only
   * {@link retryCleanupLocked} — whose callers are the [정리] retry and the
   * [머지] click on an already-merged PR — carries that authority.
   *
   * @param {string} bead_id
   * @param {boolean} [resume_failure]
   * @param {boolean} [job_retry_authorized]
   * @param {{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: import('./foreign-target.js').ForeignPrTarget }|null} [foreign_judged]
   * - The foreign target judgment the calling action already re-read at its
   * entry (UI-k467 §3.1); null makes this closure, as a resume entry, re-read.
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }>}
   */
  async function closeCoveredRow(
    bead_id,
    resume_failure = false,
    job_retry_authorized = false,
    foreign_judged = null
  ) {
    const q = deps.store.snapshot(workspace);
    const row = q.pr_wait.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    );
    if (!row) {
      return {
        ok: false,
        step: null,
        reason: 'not_in_pr_wait',
        base_sync: null
      };
    }
    const prior_failure = q.cleanup_failed?.[bead_id];
    const closure_start = CLEANUP_STEPS.indexOf(CLOSURE_STEPS[0]);
    const prior_step_index = prior_failure
      ? CLEANUP_STEPS.indexOf(prior_failure.step)
      : -1;
    if (prior_failure && prior_step_index >= closure_start && !resume_failure) {
      return {
        ok: false,
        step: prior_failure.step,
        reason: prior_failure.reason,
        base_sync: null
      };
    }
    // The observation retry budget survives until success or the next failure.
    if (
      prior_failure &&
      prior_failure.step !== 'branch_cleanup' &&
      prior_failure.step !== 'base_containment'
    ) {
      deps.store.clearCleanupFailure(workspace, bead_id);
    }
    // Resume is decided BY NAME, never by an offset into the half: an index
    // comparison would silently resume a stored record one step earlier or later
    // every time the sequence changes. A failure recorded outside the half
    // replays it whole, which is what its steps are idempotent for.
    const resume_step =
      prior_failure && CLOSURE_STEPS.includes(prior_failure.step)
        ? prior_failure.step
        : null;
    const resume_index =
      resume_step === null ? 0 : CLOSURE_STEPS.indexOf(resume_step);
    /** @param {string} step */
    const runsFrom = (step) => CLOSURE_STEPS.indexOf(step) >= resume_index;
    // A pinned foreign PR (UI-k467 §3.6): its post-merge jobs belong to the
    // target and are never run here, and its branch cleanup is the owned
    // residue only. Re-read because this is also the restart/[정리] entry.
    const foreign =
      foreign_judged ?? (await foreignTargetFor(bead_id, row.pr_url || null));
    if (foreign.state === 'ok') {
      if (runsFrom('branch_cleanup')) {
        deps.store.setCleanupCursor?.(workspace, {
          bead_id,
          cursor: 'branch_cleanup'
        });
        markStep(bead_id, 'branch_cleanup');
        const facts = await cleanupFacts(bead_id, foreign);
        await cleanupForeignResidueOf(bead_id, foreign.target, {
          head_sha: facts.head_sha,
          head_ref: row.head_ref || facts.head_ref
        });
      }
      return closeAndSettle(bead_id, row);
    }
    if (foreign.state === 'invalid') {
      return failCleanup(
        bead_id,
        resume_step || CLOSURE_STEPS[0],
        foreign.reason,
        null
      );
    }
    if (runsFrom('post_merge_jobs')) {
      deps.store.setCleanupCursor?.(workspace, {
        bead_id,
        cursor: 'post_merge_jobs'
      });
      markStep(bead_id, 'post_merge_jobs');
      const jobs = await runPostMergeJobs(bead_id, row, {
        base_sync: null,
        // §3: an outcome-unknown job is re-judged, re-recorded and re-run only
        // under a human-authorized retry OF THIS STEP. A boot resume or a
        // coordinator replay of an interrupted row carries no such authority
        // and must terminate instead.
        job_retry:
          job_retry_authorized === true && resume_step === 'post_merge_jobs'
      });
      if (jobs !== null) {
        return jobs;
      }
    }
    if (runsFrom('branch_cleanup')) {
      deps.store.setCleanupCursor?.(workspace, {
        bead_id,
        cursor: 'branch_cleanup'
      });
      markStep(bead_id, 'branch_cleanup');
      const facts = await cleanupFacts(bead_id);
      const merge_sha = facts.merge_sha;
      if (typeof merge_sha !== 'string') {
        return failCleanup(
          bead_id,
          'branch_cleanup',
          'cleanup_identity_unobserved',
          null
        );
      }
      const branches = await cleanupCompletedBranches(
        bead_id,
        row.head_ref || facts.head_ref,
        facts.head_sha,
        merge_sha
      );
      if (!branches.ok) {
        return failCleanup(
          bead_id,
          'branch_cleanup',
          branches.reason,
          null,
          false,
          branches.detail
        );
      }
    }
    return closeAndSettle(bead_id, row);
  }

  /**
   * The `parent_close` step and the lane settlement every closure ends with.
   *
   * @param {string} bead_id
   * @param {any} row - The `pr_wait` row being closed.
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }>}
   */
  async function closeAndSettle(bead_id, row) {
    deps.store.setCleanupCursor?.(workspace, {
      bead_id,
      cursor: 'parent_close'
    });
    markStep(bead_id, 'parent_close');
    const closed = await closeBead(bead_id);
    if (!closed.ok) {
      return failCleanup(
        bead_id,
        'parent_close',
        'bd_close_failed',
        null,
        closed.wrote
      );
    }
    if (external && typeof external.drop === 'function') {
      try {
        external.drop(workspace, bead_id);
      } catch (err) {
        log('external row drop failed for %s: %o', bead_id, err);
      }
    }
    const moved = deps.store.moveToDone(workspace, { bead_id });
    if (moved.ok) {
      deps.store.markInteractiveSessionsSettled?.(workspace, bead_id, 'done');
      try {
        await deps.scheduler.reconcileInteractiveSessions?.(workspace);
      } catch (err) {
        log('interactive settlement reconcile failed for %s: %o', bead_id, err);
      }
    }
    notifyChanged(workspace);
    requestQueueTick();
    await announceMerged(bead_id, row.pr_url || null);
    return { ok: true, step: null, reason: null, base_sync: null };
  }

  /**
   * Run the whole cleanup in contract order. The SINGLE implementation both the
   * [머지] button and the poller's externally-observed MERGED go through — a
   * second copy for the external case is exactly the divergence §6 forbids.
   *
   * @param {string} bead_id
   * @param {{ base_ref?: string|null, head_ref?: string|null, pr_url?: string|null, merge_sha?: string|null, target_base?: string|null, verify_operation_id?: string|null, verified_base_sha?: string, verified_head_sha?: string }} [refs]
   * - What the click-time gate observed on GitHub (UI-7agi §3). Load-bearing
   * for an external PR, which has no attempt to read a target base from.
   * @param {{ retry_authorized?: boolean, settled_verify?: string }} [options]
   * - `retry_authorized`: a person's cleanup retry of a `repo_operations` stop
   * (UI-btsr §3.1). Only {@link retryCleanupLocked} passes it; it lets that
   * step's verify and deploy record one new run of a failed operation instead
   * of adopting it. `settled_verify`: the cleanup verify a boot resume already
   * waited to a success (UI-btsr §3.3), so the cleanup goes on to the deploy
   * without re-ensuring it.
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }>}
   */
  async function runCleanup(bead_id, refs = {}, options = {}) {
    const retry_authorized = options.retry_authorized === true;
    let q = deps.store.snapshot(workspace);
    if (discardActive(q, bead_id)) {
      return {
        ok: false,
        step: null,
        reason: 'discard_in_progress',
        base_sync: null
      };
    }
    // A pinned foreign PR closes through its target (UI-k467 §3.6) — Worker
    // merge and GitHub direct merge alike reach here.
    const foreign = await foreignTargetFor(bead_id, refs.pr_url || null);
    if (foreign.state === 'invalid') {
      return failCleanup(bead_id, 'base_containment', foreign.reason, null);
    }
    if (foreign.state === 'ok') {
      return runForeignCleanup(bead_id, foreign.target, refs);
    }
    // The EXPECTED base, never the observed one (§5): this is the branch that
    // gets synced, verified and deployed, so deriving it from the PR's own
    // metadata would let a wrongly-based PR pick its own post-merge target.
    const expected =
      typeof refs.target_base === 'string' && refs.target_base.length > 0
        ? { ok: /** @type {const} */ (true), base: refs.target_base }
        : await expectedBaseFor(q, bead_id);
    if (!expected.ok) {
      return failCleanup(bead_id, 'base_containment', expected.reason, null);
    }
    const target_base = expected.base;
    // The merge notification's url (UI-9rrk). The CLICK's own resolution wins:
    // an external row's registry entry can be one scan stale, and naming the
    // previous PR would be worse than naming none. Without a click (the
    // poller's observed MERGED) it falls back to this snapshot — read now,
    // because by the time it fires the lane row is already gone.
    const pr_url =
      refs.pr_url ||
      resolvePrRef(
        q,
        bead_id,
        external ? external.get(workspace, bead_id) : null
      )?.url ||
      null;
    // Lane bookkeeping belongs to beads the LANE actually holds. An external row
    // exists only in memory (UI-7agi §1/§2), so pushing it into the durable
    // `done` lane would make `queue.json` record a run that never happened here
    // — and §6's "the row disappears on the next scan" is how it actually
    // leaves. The deploy record is workspace-level and stays either way: a
    // deploy that really ran is a real fact about this repo.
    let durable = inPrWait(q, bead_id);
    if (repo_operations && !durable && external?.get(workspace, bead_id)) {
      const merge_sha = await cleanupMergeSha(q, bead_id, refs);
      if (merge_sha === null) {
        return {
          ok: false,
          step: 'base_containment',
          reason: 'merge_sha_unobserved',
          base_sync: null
        };
      }
      const promoted = deps.store.promoteMergedExternal(workspace, {
        bead_id,
        merge_sha,
        head_ref:
          refs.head_ref ||
          deps.observations.get(workspace, bead_id)?.pr?.head_ref ||
          null,
        pr_url
      });
      // `promoteMergedExternal` refuses a bead the lane ALREADY holds, and the
      // poller promotes external rows on its own (`pr-poller.js`) — so between
      // the `inPrWait` read above and the `await` on the merge sha, the row can
      // become durable underneath this call. That refusal is not a failure: the
      // post-condition this step owes is "the row is in `pr_wait`", so the lane
      // itself decides, exactly as the poller's own promote does. Only a bead
      // still outside the lane failed.
      q = deps.store.snapshot(workspace);
      durable = inPrWait(q, bead_id);
      if (!promoted.ok && !durable) {
        return {
          ok: false,
          step: 'repo_operations',
          reason: 'external_deployment_promote_failed',
          base_sync: null
        };
      }
    }

    /** @type {BaseSyncOutcome|null} */
    let base_sync = null;
    if (!repo_operations || !durable) {
      return failCleanup(
        bead_id,
        'repo_operations',
        'repo_operations_unavailable',
        null
      );
    }
    {
      const merge_sha = await cleanupMergeSha(q, bead_id, refs);
      if (merge_sha === null) {
        return failCleanup(
          bead_id,
          'base_containment',
          'merge_sha_unobserved',
          null
        );
      }
      deps.store.setCleanupCursor?.(workspace, {
        bead_id,
        cursor: 'base_containment',
        merge_sha,
        head_ref:
          refs.head_ref ||
          deps.observations.get(workspace, bead_id)?.pr?.head_ref ||
          null,
        pr_url
      });
      markStep(bead_id, 'base_containment');
      const synced = await syncBase(target_base);
      if (!synced.ok) {
        return failCleanup(bead_id, 'base_containment', synced.reason, null);
      }
      base_sync = synced.outcome;
      const covers_merge = await deps.gitRun(
        ['merge-base', '--is-ancestor', merge_sha, synced.sha],
        { cwd: repo }
      );
      if (covers_merge.code === 1) {
        return failCleanup(
          bead_id,
          'base_containment',
          'deployment_target_not_covering_merge',
          base_sync
        );
      }
      if (covers_merge.code !== 0) {
        return failCleanup(
          bead_id,
          'base_containment',
          'deployment_candidate_ancestry_check_failed',
          base_sync
        );
      }
      deps.store.setCleanupCursor?.(workspace, {
        bead_id,
        cursor: 'repo_operations'
      });
      markStep(bead_id, 'repo_operations');
      const config = repo_operations
        ? await repo_operations.hasConfig(synced.sha, {
            current_target_base: true
          })
        : { ok: true, present: false };
      if (!config.ok) {
        return failCleanup(
          bead_id,
          'repo_operations',
          config.code || 'repo_ops_config_invalid',
          base_sync
        );
      }
      if (config.present && repo_operations) {
        let effective_base_sha = refs.verified_base_sha;
        if (!effective_base_sha) {
          const parent = await deps.gitRun(['rev-parse', `${merge_sha}^`], {
            cwd: repo
          });
          effective_base_sha =
            parent.code === 0 ? parent.stdout.trim() : undefined;
        }
        if (
          !effective_base_sha ||
          !/^[0-9a-f]{40}$/i.test(effective_base_sha)
        ) {
          return failCleanup(
            bead_id,
            'repo_operations',
            'verify_candidate_mismatch',
            base_sync
          );
        }
        const verify_policy =
          await repo_operations.hasConfig(effective_base_sha);
        if (!verify_policy.ok) {
          return failCleanup(
            bead_id,
            'repo_operations',
            'verify_candidate_mismatch',
            base_sync
          );
        }
        // Spec §7.2/§8: a base declaring no [verify] must create no verify
        // stage and no verify-shaped failure. The head SHA is demanded after —
        // never before — the effective base says verify actually runs. A
        // cleanup verify that already ran stored the PR head it verified
        // (UI-btsr §3.3): a retry and a restart read that, since the
        // observation cache is not persistent; a first run has no such record
        // and reads the cache as before.
        if (typeof verify_policy.verify_script_path === 'string') {
          const verified_head_sha =
            refs.verified_head_sha ||
            (
              await repo_operations.findCleanupVerifyOperation?.({
                target_base,
                bead_id,
                merged_sha: merge_sha
              })
            )?.head_sha ||
            deps.observations.get(workspace, bead_id)?.pr?.head_sha;
          if (
            typeof verified_head_sha !== 'string' ||
            !/^[0-9a-f]{40}$/i.test(verified_head_sha)
          ) {
            return failCleanup(
              bead_id,
              'repo_operations',
              'verify_head_sha_unobserved',
              base_sync
            );
          }
          // Boot resume already waited this merge's own cleanup verify to a
          // success (UI-btsr §3.3). Re-ensuring it would materialize a fresh
          // candidate checkout only to adopt the same record, and a checkout
          // failure there would stop a row whose verify already passed.
          const settled =
            typeof options.settled_verify === 'string'
              ? repo_operations.verifyReceipt(
                  options.settled_verify,
                  verified_head_sha
                )
              : null;
          if (
            settled?.state !== 'succeeded' ||
            settled.effective_base_sha !== effective_base_sha.toLowerCase()
          ) {
            const verified = await repo_operations.ensureVerify({
              repo,
              origin: 'origin',
              target_base,
              base_sha: effective_base_sha,
              head_sha: verified_head_sha,
              final_sha: merge_sha,
              bead_id,
              pr_number: parsePrNumber(pr_url || '') || 0,
              script_path: verify_policy.verify_script_path,
              receipt_operation_id: refs.verify_operation_id || null,
              retry_chain: true,
              ...(retry_authorized
                ? {
                    retry_authorized: true,
                    on_retry_recorded: () => resumeRetriedRow(bead_id)
                  }
                : {})
            });
            if (!verified.ok) {
              return failCleanup(
                bead_id,
                'repo_operations',
                verified.code || 'verify_failed',
                base_sync
              );
            }
            if (!verified.inert && typeof verified.operation_id === 'string') {
              const receipt =
                (await repo_operations.waitForTerminal(verified.operation_id, {
                  head_sha: verified_head_sha,
                  timeout_ms: verified.timeout_ms
                })) ||
                repo_operations.verifyReceipt(
                  verified.operation_id,
                  verified_head_sha
                );
              if (!receipt || receipt.state !== 'succeeded') {
                return failCleanup(
                  bead_id,
                  'repo_operations',
                  receipt?.reason || 'verify_failed',
                  base_sync,
                  undefined,
                  undefined,
                  undefined,
                  receipt?.log_path
                );
              }
            }
          }
        }
        const deployed = await repo_operations.ensureDeploy({
          target_base,
          target_sha: synced.sha,
          subjects: [{ bead_id, merged_sha: merge_sha }],
          ...(retry_authorized
            ? {
                retry_authorized: true,
                on_retry_recorded: () => resumeRetriedRow(bead_id)
              }
            : {})
        });
        if (!deployed.ok) {
          return failCleanup(
            bead_id,
            'repo_operations',
            deployed.code || 'repo_operation_failed',
            base_sync,
            undefined,
            undefined,
            undefined,
            undefined,
            repoOpsFailureEvidence(deployed)
          );
        }
        if (!deployed.inert && typeof deployed.operation_id === 'string') {
          const evidence = await repo_operations.waitForDeployTerminal(
            deployed.operation_id,
            {
              target_base,
              merged_sha: merge_sha,
              timeout_ms: deployed.timeout_ms
            }
          );
          if (evidence.state === 'failed') {
            return failCleanup(
              bead_id,
              'repo_operations',
              evidence.code || 'repo_operation_failed',
              base_sync,
              undefined,
              undefined,
              undefined,
              evidence.log_path,
              repoOpsFailureEvidence(evidence)
            );
          }
          if (evidence.state !== 'succeeded') {
            return {
              ok: true,
              pending: true,
              step: 'repo_operations',
              reason: null,
              base_sync
            };
          }
        }
        return {
          ...(await closeCoveredRow(bead_id, false, false, foreign)),
          base_sync
        };
      }
      // A base that declares no `repo-ops/config.toml` has nothing to verify
      // and nothing to deploy, so the cursor moves straight on to closure.
      return {
        ...(await closeCoveredRow(bead_id, false, false, foreign)),
        base_sync
      };
    }
  }

  /**
   * The post-merge closure of a pinned foreign PR (UI-k467 §3.6), on the same
   * cursor and failure records as the workspace merge tail:
   *
   *   1. `base_containment` — re-fetch `foreign_base` from the bound remote in
   *      `foreign_path` and prove the merge SHA is the tip or its ancestor.
   *   2. `repo_operations` — re-judge from the merge SHA's FIRST parent and the
   *      merge SHA's tree: `[deploy]`/`post-merge.d` is
   *      `foreign_handoff(foreign_deploy_unsupported)` (bead stays resolved); a
   *      first-parent `[verify]` needs a Worker result bound to (PR head, first
   *      parent), run now when absent.
   *   3. `post_merge_jobs` is never run for a foreign target.
   *   4–5. owned residue cleanup and the close, in {@link closeCoveredRow}.
   *
   * @param {string} bead_id
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @param {{ head_ref?: string|null, pr_url?: string|null, merge_sha?: string|null, verify_operation_id?: string|null, verified_head_sha?: string }} refs
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }>}
   */
  async function runForeignCleanup(bead_id, target, refs) {
    let q = deps.store.snapshot(workspace);
    const pr_url =
      refs.pr_url ||
      resolvePrRef(
        q,
        bead_id,
        external ? external.get(workspace, bead_id) : null
      )?.url ||
      null;
    let durable = inPrWait(q, bead_id);
    if (!durable && external?.get(workspace, bead_id)) {
      const merge_sha = await cleanupMergeSha(q, bead_id, refs, target);
      if (merge_sha === null) {
        return {
          ok: false,
          step: 'base_containment',
          reason: 'merge_sha_unobserved',
          base_sync: null
        };
      }
      const promoted = deps.store.promoteMergedExternal(workspace, {
        bead_id,
        merge_sha,
        head_ref:
          refs.head_ref ||
          deps.observations.get(workspace, bead_id)?.pr?.head_ref ||
          null,
        pr_url
      });
      q = deps.store.snapshot(workspace);
      durable = inPrWait(q, bead_id);
      if (!promoted.ok && !durable) {
        return {
          ok: false,
          step: 'repo_operations',
          reason: 'external_deployment_promote_failed',
          base_sync: null
        };
      }
    }
    if (!durable) {
      return failCleanup(
        bead_id,
        'repo_operations',
        'repo_operations_unavailable',
        null
      );
    }
    const merge_sha = await cleanupMergeSha(q, bead_id, refs, target);
    if (merge_sha === null) {
      return failCleanup(
        bead_id,
        'base_containment',
        'merge_sha_unobserved',
        null
      );
    }
    deps.store.setCleanupCursor?.(workspace, {
      bead_id,
      cursor: 'base_containment',
      merge_sha,
      head_ref:
        refs.head_ref ||
        deps.observations.get(workspace, bead_id)?.pr?.head_ref ||
        null,
      pr_url
    });
    markStep(bead_id, 'base_containment');
    const bound = await bindForeignTarget(target, deps.gitRun);
    if (!bound.ok) {
      return failCleanup(bead_id, 'base_containment', bound.reason, null);
    }
    const tip = await fetchForeignBaseTip(bound.target, deps.gitRun);
    if (!tip.ok) {
      return failCleanup(
        bead_id,
        'base_containment',
        'base_fetch_failed',
        null
      );
    }
    const covers = await deps.gitRun(
      ['merge-base', '--is-ancestor', merge_sha, tip.sha],
      { cwd: bound.target.path }
    );
    if (covers.code === 1) {
      return failCleanup(
        bead_id,
        'base_containment',
        'deployment_target_not_covering_merge',
        null
      );
    }
    if (covers.code !== 0) {
      return failCleanup(
        bead_id,
        'base_containment',
        'deployment_candidate_ancestry_check_failed',
        null
      );
    }
    deps.store.setCleanupCursor?.(workspace, {
      bead_id,
      cursor: 'repo_operations'
    });
    markStep(bead_id, 'repo_operations');
    const judged = await judgeForeignPostMerge({
      target: bound.target,
      merge_sha,
      gitRun: deps.gitRun,
      resolveRepoOps
    });
    if (!judged.ok) {
      return failCleanup(bead_id, 'repo_operations', judged.reason, null);
    }
    if (judged.handoff !== null) {
      // Recorded FIRST: the announcement's failure conversation reads the
      // stop back from `cleanup_failed`.
      const stopped = await failCleanup(
        bead_id,
        'repo_operations',
        foreignHandoffReason(judged.handoff),
        null,
        undefined,
        // The PR-flow sentence, told apart from the quick_fix push landing's
        // one by class (UI-k467 §3.7).
        FOREIGN_HANDOFF_SENTENCES[judged.handoff]
      );
      announceHandoff(bead_id, judged.handoff, merge_sha, target, pr_url);
      return stopped;
    }
    if (judged.verify_script_path !== null) {
      if (!repo_operations) {
        return failCleanup(
          bead_id,
          'repo_operations',
          'repo_operations_unavailable',
          null
        );
      }
      const verified_head_sha =
        refs.verified_head_sha ||
        deps.observations.get(workspace, bead_id)?.pr?.head_sha ||
        q.completion_intents?.[bead_id]?.merge_head_sha;
      if (
        typeof verified_head_sha !== 'string' ||
        !/^[0-9a-f]{40}$/i.test(verified_head_sha)
      ) {
        return failCleanup(
          bead_id,
          'repo_operations',
          'verify_head_sha_unobserved',
          null
        );
      }
      const verified = await repo_operations.ensureVerify({
        repo: bound.target.path,
        origin: bound.target.remote,
        target_base: target.base,
        base_sha: judged.first_parent,
        head_sha: verified_head_sha,
        final_sha: merge_sha,
        bead_id,
        pr_number: parsePrNumber(pr_url || '') || 0,
        script_path: judged.verify_script_path,
        receipt_operation_id: refs.verify_operation_id || null,
        foreign: {
          slug: bound.target.slug,
          path: bound.target.path,
          remote: bound.target.remote
        }
      });
      if (!verified.ok) {
        return failCleanup(
          bead_id,
          'repo_operations',
          verified.code || 'verify_failed',
          null
        );
      }
      if (!verified.inert && typeof verified.operation_id === 'string') {
        const receipt =
          (await repo_operations.waitForTerminal(verified.operation_id, {
            head_sha: verified_head_sha,
            timeout_ms: verified.timeout_ms
          })) ||
          repo_operations.verifyReceipt(
            verified.operation_id,
            verified_head_sha
          );
        if (!receipt || receipt.state !== 'succeeded') {
          return failCleanup(
            bead_id,
            'repo_operations',
            receipt?.reason || 'verify_failed',
            null,
            undefined,
            undefined,
            undefined,
            receipt?.log_path
          );
        }
      }
    }
    return closeCoveredRow(bead_id, false, false, {
      state: 'ok',
      target
    });
  }

  /**
   * Remove a pinned foreign PR's owned residue (UI-k467 §3.6 step 4): the
   * target worktree/branch/remote head at the pinned head, the Worker's verify
   * candidates, and the rig attempt worktree and branch. Dirty or unknown
   * state is kept, and every failure is a warning that never blocks the close.
   *
   * @param {string} bead_id
   * @param {import('./foreign-target.js').ForeignPrTarget} target
   * @param {{ head_sha: string|null, head_ref: string|null }} facts
   */
  async function cleanupForeignResidueOf(bead_id, target, facts) {
    /** @type {string[]} */
    const kept = [];
    const bound = await bindForeignTarget(target, deps.gitRun);
    if (bound.ok) {
      try {
        const result = await cleanupForeignResidue({
          target: bound.target,
          bead_id,
          head_sha: facts.head_sha,
          head_ref: facts.head_ref,
          gitRun: deps.gitRun,
          withLock: (fn) => deps.worktree.withTopologyLock(target.path, fn)
        });
        kept.push(...result.kept);
      } catch (err) {
        log('foreign residue cleanup threw for %s: %o', bead_id, err);
        kept.push('target_residue');
      }
      try {
        await /** @type {any} */ (repo_operations)?.sweepForeignCandidates?.({
          path: bound.target.path
        });
      } catch (err) {
        log('foreign verify candidate sweep failed for %s: %o', bead_id, err);
        kept.push('verify_candidates');
      }
    } else {
      kept.push(`target:${bound.reason}`);
    }
    // The rig attempt worktree: the session worked in the target, so the rig
    // one holds nothing but the dispatch base — removed only when nothing in it
    // would be lost.
    const attempt = receiptAttemptFor(bead_id);
    const base =
      typeof attempt?.base_oid === 'string' && attempt.base_oid.length > 0
        ? attempt.base_oid
        : typeof attempt?.target_base === 'string'
          ? attempt.target_base
          : null;
    if (
      base !== null &&
      typeof deps.worktree.removeIfDiscardable === 'function'
    ) {
      try {
        const rig = await deps.worktree.removeIfDiscardable({
          repo,
          bead_id,
          base
        });
        if (!rig?.ok) {
          kept.push(`rig_worktree:${rig?.reason || 'kept'}`);
        }
      } catch (err) {
        log('rig attempt worktree cleanup failed for %s: %o', bead_id, err);
        kept.push('rig_worktree');
      }
    }
    if (kept.length > 0) {
      log('foreign residue kept for %s: %s', bead_id, kept.join(', '));
      try {
        deps.timeline?.append({
          bead_id,
          kind: 'merge_step',
          seq: `branch_cleanup:foreign_residue_kept:${kept.join('|').slice(0, 120)}`,
          summary: `정리 — 대상 저장소 잔여물 일부를 남김 (${kept.join(', ')})`
        });
      } catch (err) {
        log('foreign residue timeline record failed for %s: %o', bead_id, err);
      }
    }
  }

  /** @param {{ base_ref?: string|null }} refs */
  async function rollbackBaseSync(refs = {}) {
    const target_base =
      typeof refs.base_ref === 'string' && refs.base_ref.length > 0
        ? refs.base_ref
        : null;
    return target_base === null
      ? { ok: false, reason: 'rollback_base_missing' }
      : syncBase(target_base);
  }

  /**
   * @param {string} bead_id
   * @param {string} base_sha
   */
  async function rollbackVerify(bead_id, base_sha) {
    return postMergeVerify(bead_id, base_sha);
  }

  /**
   * @param {any} value
   * @returns {{ failure_code?: string, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }}
   */
  function repoOpsFailureEvidence(value) {
    return {
      ...(typeof value?.code === 'string' && value.code.length > 0
        ? { failure_code: value.code }
        : {}),
      ...(value?.fetch_failure === 'timeout' ||
      value?.fetch_failure === 'nonzero'
        ? { fetch_failure: value.fetch_failure }
        : {}),
      ...(Number.isFinite(value?.elapsed_ms) && Number(value.elapsed_ms) >= 0
        ? { elapsed_ms: Number(value.elapsed_ms) }
        : {})
    };
  }

  /**
   * Record a cleanup stop durably in `pr_wait`, leaving bd `resolved`.
   * Owned observation failures carry the coordinator's retry schedule.
   *
   * When the stop happened AT the parent close, the bead is FIRST put back to
   * `resolved` (with a readback) — otherwise "bd stays `resolved`" would
   * be a claim the record makes and the database contradicts. A restore that
   * itself fails is written into the record as `restore_failed` rather than
   * left silent: a human needs to know the status is wrong, not merely that a
   * cleanup stopped.
   *
   * @param {string} bead_id
   * @param {string} step
   * @param {string} reason
   * @param {BaseSyncOutcome|null} base_sync
   * @param {boolean} [restore_bd] - Whether the parent close may have landed.
   * @param {string} [detail] - The step's own diagnostic text, when it has one
   * (UI-2o4z §3); the reason alone cannot always identify the failure.
   * @param {string} [output_tail] - The failing verification command's output
   * tail, when available (UI-qult §1).
   * @param {string} [log_path] - Absolute path to that command's FULL preserved
   * output (UI-0x54), when the run produced a complete log file. A cleanup
   * retry overwrites it with its own run's log.
   * @param {{ failure_code?: string, retryable?: boolean, retry_count?: number, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }} [failure_evidence]
   * @returns {Promise<{ ok: false, step: string, reason: string, base_sync: BaseSyncOutcome|null }>}
   */
  async function failCleanup(
    bead_id,
    step,
    reason,
    base_sync,
    restore_bd,
    detail,
    output_tail,
    log_path,
    failure_evidence = {}
  ) {
    /** @type {string|null} */
    let bd_restore = null;
    if (restore_bd === true) {
      bd_restore = (await restoreResolved(bead_id))
        ? 'restored'
        : 'restore_failed';
    }
    log(
      'cleanup stopped for %s at %s: %s (base_sync %o, bd_restore %o, detail %o)',
      bead_id,
      step,
      reason,
      base_sync,
      bd_restore,
      detail
    );
    // Same rule as the success path: `cleanup_failed` is durable lane state, so
    // it is written only for a bead the lane holds. An external row's failure
    // stays in the log and in its unchanged 머지됨 · 정리 affordance — the [정리]
    // click IS the retry, and nothing automatic ever touches it.
    // The one line the card and the timeline quote (2026-08-28
    // worker-record-timeline spec §6): the failing command's own output when
    // this step ran one, its diagnostic text when it did not, and the token's
    // sentence when the step printed nothing at all. Null when the token maps
    // to no sentence either — a summary is never invented.
    const summary =
      scriptSummary(output_tail) ??
      scriptSummary(detail) ??
      failureTokenSummary(reason);
    const q = deps.store.snapshot(workspace);
    if (inPrWait(q, bead_id)) {
      /** @type {{ retryable?: boolean, retry_count?: number, next_retry_at?: number }} */
      const cleanup_retry = {};
      if (step === 'branch_cleanup' || step === 'base_containment') {
        const previous = q.cleanup_failed[bead_id];
        cleanup_retry.retryable =
          cleanupFailureRetryClass({ step, reason, detail }) === 'transient';
        const retry_count =
          (previous?.step === 'branch_cleanup' ||
            previous?.step === 'base_containment') &&
          previous.retryable === true
            ? (previous.retry_count ?? 0) + 1
            : 0;
        cleanup_retry.retry_count = retry_count;
        if (cleanup_retry.retryable && retry_count < 3) {
          cleanup_retry.next_retry_at =
            (deps.now || Date.now)() + [60_000, 300_000, 900_000][retry_count];
        }
      }
      const recorded = deps.store.recordCleanupFailure(workspace, {
        bead_id,
        step,
        reason,
        bd_restore,
        detail,
        summary,
        output_tail,
        log_path,
        ...failure_evidence,
        ...cleanup_retry
      });
      if (
        recorded.ok === true &&
        typeof deps.announceCleanupInterruption === 'function'
      ) {
        // The announcer decides whether a completion intent still drives
        // this cleanup; a foreign handoff stop is announced by its caller.
        try {
          deps.announceCleanupInterruption(bead_id);
        } catch (err) {
          log('cleanup interruption announce failed for %s: %o', bead_id, err);
        }
      }
    }
    notifyChanged(workspace);
    return { ok: false, step, reason, base_sync };
  }

  /**
   * A person's cleanup retry just recorded one new run of the failed repo
   * operation (UI-btsr §3.3). The coordinator calls this synchronously right
   * after the successor's prerecord, before anything launches. The row is in
   * progress again, not stopped: its stop record goes so the card shows the
   * run and a boot resume can pick the row up if the server restarts mid-run
   * (beads-ui deploys itself by restarting), and the cursor stays on
   * `repo_operations`. A failure of the new run records a new stop with its
   * own time through {@link failCleanup}.
   *
   * @param {string} bead_id
   */
  function resumeRetriedRow(bead_id) {
    deps.store.clearCleanupFailure(workspace, bead_id);
    deps.store.setCleanupCursor?.(workspace, {
      bead_id,
      cursor: 'repo_operations'
    });
    notifyChanged(workspace);
  }

  // -------------------------------------------------------------------------
  // Actions.
  // -------------------------------------------------------------------------

  /**
   * Read the latest mergeability authority without updating a branch, merging,
   * starting cleanup, or dispatching a resolver. Observation and SHA-bound
   * verification are allowed because they are the evidence this probe returns.
   *
   * @param {string} bead_id
   * @returns {Promise<MergeabilityProbe>}
   */
  async function probeMergeability(bead_id) {
    const q = deps.store.snapshot(workspace);
    const member = await laneMembership(q, bead_id);
    if (!member.ok) {
      return {
        ok: false,
        kind: 'blocked',
        reason: member.reason,
        head_sha: null,
        base_ref: null,
        external: false
      };
    }
    const is_external = member.external === true;
    const ref = resolvePrRef(
      q,
      bead_id,
      is_external
        ? {
            pr_url: member.pr_url,
            pr_number: parsePrNumber(member.pr_url)
          }
        : null
    );
    if (!ref) {
      return {
        ok: false,
        kind: 'blocked',
        reason: 'pr_ref_unknown',
        head_sha: null,
        base_ref: null,
        external: is_external
      };
    }
    const foreign = await foreignTargetFor(
      bead_id,
      is_external ? member.pr_url : null,
      member.external === true ? member.metadata : null
    );
    if (foreign.state === 'invalid') {
      return {
        ok: false,
        kind: 'blocked',
        reason: foreign.reason,
        head_sha: null,
        base_ref: null,
        external: is_external
      };
    }
    const target = foreign.state === 'ok' ? foreign.target : null;
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return {
        ok: false,
        kind: 'blocked',
        reason: pinned.reason,
        head_sha: null,
        base_ref: null,
        external: is_external
      };
    }
    /** @type {any} */
    const observed = target
      ? await foreignGateNow(bead_id, pinned.number, target)
      : await gateNow(bead_id, pinned.number);
    if ('error' in observed) {
      // A foreign handoff still names the head and base it was judged on, so
      // a queue hold binds that identity (UI-k467 §3.7).
      return {
        ok: false,
        kind: 'blocked',
        reason: observed.error,
        head_sha: observed.pr?.head_sha ?? null,
        base_ref: observed.pr?.base_ref || null,
        external: is_external
      };
    }
    // A pinned foreign PR's base was judged against `foreign_base` above
    // (`foreign_pr_base_mismatch`); the workspace declaration never applies.
    const base_ok = target
      ? { ok: /** @type {const} */ (true) }
      : await baseGate(q, bead_id, observed.pr.base_ref);
    if (!base_ok.ok) {
      return {
        ok: false,
        kind: 'blocked',
        reason: /** @type {any} */ (base_ok).reason,
        head_sha: observed.pr.head_sha,
        base_ref: observed.pr.base_ref || null,
        external: is_external
      };
    }
    const common = {
      reason: /** @type {string|null} */ (null),
      head_sha: observed.pr.head_sha,
      base_ref: observed.pr.base_ref || null,
      head_ref: observed.pr.head_ref || null,
      // Carried for the `[리뷰 후 머지]` prompt (UI-d7fy §5.3): the session is
      // told which PR it is reviewing from the same observation the authority
      // binds to, never from a cached badge.
      pr_url: observed.pr.url || null,
      external: is_external
    };
    if (observed.pr.state === 'MERGED') {
      return { ok: true, kind: 'merged', ...common };
    }
    if (observed.pr.state === 'CLOSED') {
      return {
        ok: false,
        kind: 'closed',
        ...common,
        reason: 'pr_closed_unmerged'
      };
    }
    if (isConflicting(observed.pr)) {
      return { ok: true, kind: 'dirty', ...common };
    }
    if (!observed.verdict.enabled) {
      return {
        ok: false,
        kind: 'blocked',
        ...common,
        reason: observed.verdict.reason || 'gate_blocked',
        ...(observed.verify_attempted ? { continuation: 'verify' } : {})
      };
    }
    return { ok: true, kind: 'clean', ...common };
  }

  /**
   * Re-observe the PR head and re-judge the review receipt against it — the
   * `[리뷰 후 머지]` completion verdict's only input (UI-d7fy §5.4).
   *
   * DELIBERATELY NARROWER than {@link probeMergeability}: the whole gate would
   * answer a different question, because mergeability and base freshness are
   * judged AHEAD of the receipt and would mask a receipt that is now current
   * behind a `base_behind` this click never promised to resolve. The subject
   * here is the review lineage alone.
   *
   * The head is the FINAL observed one, not the head the click bound: a
   * `REVISE` fix pushes to the PR head branch and moves it.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, head_sha: string, head_ref: string|null, state: import('./merge-gate.js').CurrentState }|{ ok: false, reason: string }>}
   */
  async function observeReviewReceipt(bead_id) {
    const q = deps.store.snapshot(workspace);
    const member = await laneMembership(q, bead_id);
    if (!member.ok) {
      return { ok: /** @type {const} */ (false), reason: member.reason };
    }
    const ref = resolvePrRef(
      q,
      bead_id,
      member.external === true
        ? { pr_url: member.pr_url, pr_number: parsePrNumber(member.pr_url) }
        : null
    );
    if (!ref) {
      return {
        ok: /** @type {const} */ (false),
        reason: 'pr_ref_unknown'
      };
    }
    const foreign = await foreignTargetFor(
      bead_id,
      member.external === true ? member.pr_url : null,
      member.external === true ? member.metadata : null
    );
    if (foreign.state === 'invalid') {
      return { ok: /** @type {const} */ (false), reason: foreign.reason };
    }
    const target = foreign.state === 'ok' ? foreign.target : null;
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return { ok: /** @type {const} */ (false), reason: pinned.reason };
    }
    const observed = await observeNow(bead_id, pinned.number, target);
    if ('error' in observed) {
      return { ok: /** @type {const} */ (false), reason: observed.error };
    }
    const head_sha = normalizeSha(observed.pr.head_sha);
    if (head_sha === null) {
      return {
        ok: /** @type {const} */ (false),
        reason: 'pr_identity_unreadable'
      };
    }
    /** @type {import('./merge-gate.js').AncestryProbe} */
    let probe = probeAncestry;
    if (target) {
      const bound = await bindForeignTarget(target, deps.gitRun);
      if (!bound.ok) {
        return { ok: /** @type {const} */ (false), reason: bound.reason };
      }
      probe = createAncestryProbe({
        gitRun: deps.gitRun,
        repo: bound.target.path,
        remote: bound.target.remote
      });
    }
    const { review_receipt_state } = await readGateAuthority(
      bead_id,
      head_sha,
      probe
    );
    return {
      ok: /** @type {const} */ (true),
      head_sha,
      head_ref: observed.pr.head_ref || null,
      state: review_receipt_state
    };
  }

  /**
   * The authoritative [머지] click (§6).
   *
   * @param {string} bead_id
   * @param {{ allow_conflict_resolution?: boolean }} [options]
   * @returns {Promise<MergeClickResult>}
   */
  async function merge(bead_id, options = {}) {
    if (in_flight.has(bead_id)) {
      return refuse('action_in_flight');
    }
    if (discardActive(deps.store.snapshot(workspace), bead_id)) {
      return refuse('discard_in_progress');
    }
    in_flight.add(bead_id);
    // Step 1 of 7 (UI-raqh §4): the re-gate + the merge itself.
    markStep(bead_id, 'merging');
    try {
      const q = deps.store.snapshot(workspace);
      const member = await laneMembership(q, bead_id);
      if (!member.ok) {
        return refuse(member.reason);
      }
      const is_external = member.external === true;
      const ref = resolvePrRef(
        q,
        bead_id,
        is_external
          ? {
              // Both fields come from the SAME click-time read (implementation
              // review 2026-07-28). Pairing this fresh url with the registry's
              // cached number would merge the PREVIOUS pr whenever the bead's
              // `pr_url` moved since the last scan.
              pr_url: member.pr_url,
              pr_number: parsePrNumber(member.pr_url)
            }
          : null
      );
      if (!ref) {
        return refuse('pr_ref_unknown');
      }
      // A pinned foreign PR (UI-k467 §3.4) is gated, merged and closed in its
      // target; the pins are re-read here because this click changes state.
      const foreign = await foreignTargetFor(
        bead_id,
        is_external ? member.pr_url : null,
        member.external === true ? member.metadata : null
      );
      if (foreign.state === 'invalid') {
        return refuse(foreign.reason);
      }
      const target = foreign.state === 'ok' ? foreign.target : null;
      const pinned = prNumberFor(target, ref);
      if (!pinned.ok) {
        return refuse(pinned.reason);
      }

      /** @type {any} */
      const first = target
        ? await foreignGateNow(bead_id, pinned.number, target)
        : await gateNow(bead_id, pinned.number);
      if ('error' in first) {
        return {
          ...refuse(first.error),
          ...(first.pr ? { head_sha: first.pr.head_sha } : {})
        };
      }
      // Base comparison BEFORE every branch below (§5) — fail-closed, external
      // PRs included, no auto-retarget. A foreign PR's base was compared with
      // `foreign_base` inside its gate.
      const base_ok = target
        ? { ok: /** @type {const} */ (true) }
        : await baseGate(q, bead_id, first.pr.base_ref);
      if (!base_ok.ok) {
        return refuse(/** @type {any} */ (base_ok).reason);
      }
      const refs = {
        base_ref: first.pr.base_ref || null,
        head_ref: first.pr.head_ref || null,
        merge_sha: authoritativeMergeSha(first.pr),
        // The url the click itself resolved (UI-9rrk). For an external row the
        // registry may be one scan stale, so the notification must name the PR
        // this click actually merged, not the previous one.
        pr_url: (target ? target.pr_url : ref.url) || null,
        ...(target ? { target_base: target.base } : {})
      };
      // A merge that already happened (here or on github.com) runs the same
      // cleanup rather than a second merge. For an EXTERNAL row this is the
      // whole of the [정리] button: the poller never starts its cleanup, but it
      // may resume a nonterminal attempt this click already authorized.
      if (first.pr.state === 'MERGED') {
        if (discardActive(deps.store.snapshot(workspace), bead_id)) {
          return refuse('discard_in_progress');
        }
        const c = q.cleanup_failed?.[bead_id]
          ? await retryCleanupLocked(bead_id, refs)
          : await runCleanup(bead_id, refs);
        return {
          ok: c.ok,
          action: c.pending ? 'cleanup_pending' : 'already_merged',
          reason: c.reason,
          cleanup_step: c.step,
          base_sync: c.base_sync,
          head_sha: first.pr.head_sha
        };
      }
      if (first.pr.state === 'CLOSED') {
        return refuse('pr_closed_unmerged');
      }
      // DIRTY comes BEFORE the gate: a conflicting PR needs resolving whatever
      // its cached eligibility says, and resolving is not merging.
      if (isConflicting(first.pr)) {
        if (discardActive(deps.store.snapshot(workspace), bead_id)) {
          return refuse('discard_in_progress');
        }
        if (options.allow_conflict_resolution === false) {
          return {
            ok: false,
            action: 'refused',
            reason: 'conflict_resolution_required',
            head_sha: first.pr.head_sha
          };
        }
        // An EXTERNAL row has no attempt to relaunch from, so it takes the
        // attempt-less dispatch instead (UI-w0hi §2). The base is the one THIS
        // click observed, not a stored one: an external row has no attempt
        // recording a `target_base`, and the prompt names the branch the
        // session must merge.
        if (is_external) {
          return dispatchExternalResolution(
            bead_id,
            first.pr.head_sha,
            first.pr.base_ref || '',
            first.pr.head_ref || null
          );
        }
        return dispatchResolution(
          bead_id,
          first.pr.head_sha,
          first.pr.base_ref || '',
          first.pr.head_ref || null
        );
      }
      if (!first.verdict.enabled) {
        if (first.verify_attempted) {
          return {
            ok: false,
            action: 'verify_blocked',
            reason: first.verdict.reason || 'verify_failed',
            head_sha: first.pr.head_sha
          };
        }
        return refuse(first.verdict.reason || 'gate_blocked');
      }

      // AWAITED: `in_flight` and the progress record must both outlive the
      // cleanup, which is exactly what the guard promises — returning the
      // promise unawaited would run this `finally` before the merge even
      // issued.
      return await doMerge(
        bead_id,
        pinned.number,
        first.pr.head_sha,
        'merged',
        refs,
        {
          base_sha: first.base_sha,
          repo_operations: first.repo_operations === true,
          verify_operation_id: first.verify_operation_id || null,
          target: first.target || null
        }
      );
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
    }
  }

  /**
   * Perform the squash merge and, only once the PR is OBSERVED merged, the
   * cleanup.
   *
   * A zero exit from `gh pr merge` is NOT proof the PR is merged. On a repo with
   * a merge queue (or under `--auto`) the command succeeds by ENQUEUEING the PR,
   * which stays OPEN until the queue lands it — possibly minutes later,
   * possibly never. Treating that exit as a merge is what would let the cleanup
   * close the bead and delete both branches out from under a live PR, which is
   * unrecoverable. So the same principle the whole redesign runs on applies to
   * our own write too: the server's OBSERVATION decides, not the actor's
   * self-report.
   *
   * A PR still OPEN after a successful merge command is left in `pr_wait` with
   * an honest `merge_unconfirmed` result; the poller performs the cleanup when
   * it observes the real MERGED, through the SAME single implementation (§4/§6).
   *
   * @param {string} bead_id
   * @param {number} number
   * @param {string} head_sha
   * @param {'merged'|'updated_and_merged'} action
   * @param {{ base_ref?: string|null, head_ref?: string|null, pr_url?: string|null, merge_sha?: string|null }} [refs]
   * @param {{ base_sha?: string, repo_operations?: boolean, verify_operation_id?: string|null, target?: import('./foreign-target.js').BoundForeignTarget|null }} [verification]
   * - `target` is a pinned foreign PR's bound checkout: the merge goes through
   * `gh pr merge --repo <pinned slug>` and the candidate freshness re-check
   * re-fetches `foreign_base` there (UI-k467 §3.4).
   * - The gate-time base/head branch names and the click-resolved PR url,
   * forwarded to the cleanup (UI-7agi §3, UI-9rrk).
   * @returns {Promise<MergeClickResult>}
   */
  async function doMerge(
    bead_id,
    number,
    head_sha,
    action,
    refs = {},
    verification = {}
  ) {
    if (discardActive(deps.store.snapshot(workspace), bead_id)) {
      return refuse('discard_in_progress');
    }
    const target = verification.target || null;
    const gh = ghFor(target);
    /** @type {any} */
    let merged;
    if (verification.repo_operations) {
      const [fresh_pr, fresh_base] = await Promise.all([
        gh.prDetail(repo, number),
        target
          ? fetchForeignBaseTip(target, deps.gitRun).then((tip) =>
              tip.ok ? { ok: true, base_oid: tip.sha } : { ok: false }
            )
          : deps.resolveBase?.({ force: true })
      ]);
      if (
        fresh_pr?.state !== 'ok' ||
        fresh_pr.data.state !== 'OPEN' ||
        fresh_pr.data.head_sha !== head_sha ||
        !fresh_base?.ok ||
        fresh_base.base_oid !== verification.base_sha
      ) {
        return refuse('verify_candidate_stale');
      }
    }
    if (deps.store.snapshot(workspace).completion_intents?.[bead_id]) {
      const recorded = deps.store.recordCompletionMergeHead(workspace, {
        root_bead_id: bead_id,
        head_sha
      });
      if (!recorded.ok) {
        return refuse('merge_prerecord_failed');
      }
    }
    try {
      // Pinned to the head the gate approved — GitHub refuses the merge if the
      // branch moved since, so an unverified commit can never land (§5/§6).
      merged = await gh.mergeSquash(repo, number, head_sha);
    } catch {
      merged = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (merged.state !== 'ok') {
      return {
        ok: false,
        action: 'refused',
        reason: `merge_failed:${merged.reason || 'gh_failed'}`,
        head_sha
      };
    }

    /** @type {any} */
    let after;
    try {
      after = await gh.prDetail(repo, number);
    } catch {
      after = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (after.state !== 'ok') {
      // The merge command succeeded but we cannot see the result: refuse to
      // clean up on an unread state. The poller re-reads on its own cadence.
      return {
        ok: false,
        action: 'merge_unconfirmed',
        reason: `merge_state_unconfirmed:${after.reason || 'gh_failed'}`,
        head_sha
      };
    }
    if (after.data.state !== 'MERGED') {
      return {
        ok: true,
        action: 'merge_unconfirmed',
        reason: 'merge_pending',
        head_sha
      };
    }

    const c = await runCleanup(bead_id, {
      ...refs,
      merge_sha: authoritativeMergeSha(after.data),
      verify_operation_id: verification.verify_operation_id || null,
      verified_base_sha: verification.base_sha,
      verified_head_sha: head_sha
    });
    return {
      ok: c.ok,
      // A still-running RepoOperation is the merge-driver handoff: it is
      // deliberately not a serial merge-queue slot.
      action: c.pending ? 'cleanup_pending' : action,
      reason: c.reason,
      cleanup_step: c.step,
      base_sync: c.base_sync,
      head_sha
    };
  }

  /**
   * DIRTY arm: hand the branch back to the session that wrote it.
   *
   * @param {string} bead_id
   * @param {string} head_sha
   * @param {string} base_ref
   * @param {string|null} head_ref - The PR head branch this dispatch observed.
   * The scheduler restores a missing worktree from it (UI-p49g §5.2), so a
   * null forfeits that restore and keeps the old `worktree_missing` refusal.
   * @param {ResolutionWaitInput|null} [resolution_wait]
   * @param {{ continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }|undefined} [continuation]
   * @returns {Promise<MergeClickResult>}
   */
  async function dispatchResolution(
    bead_id,
    head_sha,
    base_ref,
    head_ref,
    resolution_wait = null,
    continuation
  ) {
    // Resolving is not merging: drop the progress BEFORE the session appears,
    // so the row goes back to its ordinary conflict state rather than showing a
    // merge that is not happening.
    clearStep(bead_id);
    const attempts = Object.values(
      deps.store.snapshot(workspace).attempts || {}
    );
    const resumable = attempts.some(
      (attempt) =>
        attempt &&
        attempt.bead_id === bead_id &&
        RESUMABLE_TERMINAL_STATUSES.has(String(attempt.status)) &&
        typeof attempt.session_id === 'string' &&
        attempt.session_id.length > 0
    );
    if (!resumable) {
      return dispatchExternalResolution(
        bead_id,
        head_sha,
        base_ref,
        head_ref,
        resolution_wait,
        continuation
      );
    }
    const r = await deps.scheduler.resolveConflict(
      workspace,
      bead_id,
      resolution_wait,
      continuation || {},
      head_ref
    );
    notifyChanged(workspace);
    return {
      ok: !!r.ok,
      action: 'conflict_resolution',
      reason: r.ok ? null : r.reason || 'resolution_refused',
      attempt_id: r.attempt_id || null,
      continuation_mismatch: r.continuation_mismatch || null,
      head_sha,
      base_ref: base_ref || null,
      head_ref
    };
  }

  /**
   * DIRTY arm for an EXTERNAL row (UI-w0hi §2): the same hand-off, minus the
   * attempt to relaunch from. The scheduler mints a fresh session in the
   * worktree the delivering session left behind, and refuses visibly
   * (`worktree_missing`) when there is none.
   *
   * @param {string} bead_id
   * @param {string} head_sha
   * @param {string} base_ref - The base branch this click OBSERVED on the PR.
   * @param {string|null} head_ref - The head branch this click OBSERVED, which
   * the scheduler restores a missing worktree from (UI-p49g §5.2).
   * @param {ResolutionWaitInput|null} [resolution_wait]
   * @param {{ continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }|undefined} [continuation]
   * @returns {Promise<MergeClickResult>}
   */
  async function dispatchExternalResolution(
    bead_id,
    head_sha,
    base_ref,
    head_ref,
    resolution_wait = null,
    continuation
  ) {
    clearStep(bead_id);
    const r = await deps.scheduler.dispatchExternalConflict(
      workspace,
      bead_id,
      base_ref,
      resolution_wait,
      continuation || {},
      head_ref
    );
    notifyChanged(workspace);
    return {
      ok: !!r.ok,
      action: 'conflict_resolution',
      reason: r.ok ? null : r.reason || 'resolution_refused',
      attempt_id: r.attempt_id || null,
      continuation_mismatch: r.continuation_mismatch || null,
      head_sha,
      base_ref: base_ref || null,
      head_ref
    };
  }

  /**
   * Whether a PR head already CONTAINS its base branch tip (UI-p49g §4.1).
   *
   * This is the evidence that separates a resolution the session got wrong
   * from one the queue re-conflicted: a head that merged the current base and
   * is still dirty is the session's failure, while a head that never saw the
   * current base was overtaken by a merge that landed after it pushed.
   *
   * Timeless by construction — it asks about the base tip as it is NOW, not a
   * snapshot taken at dispatch — so a late promotion cannot change the answer.
   * Every unreadable step answers `null`, which the caller charges to the
   * session; a head that moved again between the probe and this fetch is one
   * such step, because the judgment would then be about a different commit.
   *
   * @param {string} bead_id - Named for the seam's shape; the repo is the
   * workspace's, exactly like every other git command here.
   * @param {{ base_ref: string, head_ref: string, head_sha: string }} input
   * @returns {Promise<'contained'|'not_contained'|null>}
   */
  async function baseContained(bead_id, input) {
    const { base_ref, head_ref, head_sha } = input;
    if (!base_ref || !head_ref || !normalizeSha(head_sha)) {
      return null;
    }
    return deps.worktree.withTopologyLock(repo, async () => {
      const fetched = await deps.gitRun(
        ['fetch', '--no-tags', 'origin', base_ref, head_ref],
        { cwd: repo }
      );
      if (fetched.code !== 0) {
        return null;
      }
      const head = await deps.gitRun(['rev-parse', `origin/${head_ref}`], {
        cwd: repo
      });
      if (
        head.code !== 0 ||
        normalizeSha(head.stdout.trim()) !== normalizeSha(head_sha)
      ) {
        return null;
      }
      const ancestor = await deps.gitRun(
        ['merge-base', '--is-ancestor', `origin/${base_ref}`, head_sha],
        { cwd: repo }
      );
      if (ancestor.code === 0) {
        return /** @type {const} */ ('contained');
      }
      if (ancestor.code === 1) {
        return /** @type {const} */ ('not_contained');
      }
      return null;
    });
  }

  /**
   * Dispatch only the exact DIRTY head/base pair the merge driver approved.
   * The seam re-probes immediately before the effect, so a moved branch or a
   * newly non-conflicting PR returns without starting a resolver.
   *
   * @param {string} bead_id
   * @param {{ head_sha: string, base_ref: string|null, head_ref?: string|null }} approved
   * @param {ResolutionWaitInput|null} [resolution_wait]
   * @param {{ continuation: 'prior_session'|'fresh_current', decision_token: Record<string, unknown> }|undefined} [continuation]
   * @returns {Promise<MergeClickResult>}
   */
  async function dispatchConflict(
    bead_id,
    approved,
    resolution_wait = null,
    continuation
  ) {
    if (in_flight.has(bead_id)) {
      return refuse('action_in_flight');
    }
    in_flight.add(bead_id);
    markStep(bead_id, 'merging');
    try {
      const latest = await probeMergeability(bead_id);
      if (
        !latest.ok ||
        latest.kind !== 'dirty' ||
        latest.head_sha !== approved.head_sha ||
        latest.base_ref !== approved.base_ref
      ) {
        return refuse(
          latest.reason ||
            (latest.kind === 'dirty'
              ? 'mergeability_identity_changed'
              : 'mergeability_changed')
        );
      }
      if (latest.external) {
        return dispatchExternalResolution(
          bead_id,
          latest.head_sha || '',
          latest.base_ref || '',
          approved.head_ref || latest.head_ref || null,
          resolution_wait,
          continuation
        );
      }
      return dispatchResolution(
        bead_id,
        latest.head_sha || '',
        latest.base_ref || '',
        approved.head_ref || latest.head_ref || null,
        resolution_wait,
        continuation
      );
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
    }
  }

  /**
   * The externally-observed MERGED trigger (§4): a human merged on github.com.
   * Runs the IDENTICAL cleanup, with two extra guards the button does not need:
   * it never runs while another action holds the bead, and it never re-runs a
   * cleanup that already failed — "no auto-retry" means the automatic trigger
   * must stay off it until a human acts.
   *
   * @param {string} bead_id
   * @param {string|null} [merge_sha]
   * @param {{ head_ref?: string|null, pr_url?: string|null }} [refs]
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function cleanupObservedMerge(bead_id, merge_sha = null, refs = {}) {
    if (in_flight.has(bead_id)) {
      return { ok: false, step: null, reason: 'action_in_flight' };
    }
    // The Bead's defer lock is held from the status re-read through the whole
    // cleanup (UI-0d9i §3.4): a [보류로 전환] that is past its queue re-check
    // finishes its `bd defer` first and this cleanup then reads `deferred`; a
    // defer arriving meanwhile waits and its re-check refuses. It is taken
    // BEFORE `in_flight`, so a defer holding it never mistakes a cleanup that
    // is only waiting for a running merge, and the guards below are judged
    // after the wait.
    const release = deps.locks
      ? await deps.locks.acquire(beadDeferLockKey(workspace, bead_id))
      : () => {};
    try {
      if (in_flight.has(bead_id)) {
        return { ok: false, step: null, reason: 'action_in_flight' };
      }
      const q = deps.store.snapshot(workspace);
      if (discardActive(q, bead_id)) {
        return { ok: false, step: null, reason: 'discard_in_progress' };
      }
      const external_resume =
        !inPrWait(q, bead_id) &&
        !!external?.get(workspace, bead_id) &&
        !!repo_operations;
      if (!inPrWait(q, bead_id) && !external_resume) {
        return { ok: false, step: null, reason: 'not_in_pr_wait' };
      }
      if (q.cleanup_failed?.[bead_id]) {
        return { ok: false, step: null, reason: 'merged_cleanup_failed' };
      }
      return await cleanupObservedMergeHeld(bead_id, merge_sha, refs);
    } finally {
      release();
    }
  }

  /**
   * The part of {@link cleanupObservedMerge} that runs with the Bead's defer
   * lock held and its guards passed.
   *
   * @param {string} bead_id
   * @param {string|null} merge_sha
   * @param {{ head_ref?: string|null, pr_url?: string|null }} refs
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function cleanupObservedMergeHeld(bead_id, merge_sha, refs) {
    in_flight.add(bead_id);
    try {
      // A deferred Bead is "no longer considered" (UI-0d9i §3.4): an outside
      // merge observed meanwhile runs none of the cleanup's side effects. The
      // status is re-read right before the first one, and an unreadable status
      // skips this observation too — the next one reads it again.
      /** @type {string|null} */
      let status = null;
      try {
        status = await deps.bd.readStatus(bead_id);
      } catch (err) {
        log('bd status read before cleanup failed for %s: %o', bead_id, err);
        return { ok: false, step: null, reason: 'bead_status_unreadable' };
      }
      if (status === 'deferred') {
        return { ok: false, step: null, reason: 'bead_deferred' };
      }
      return await runCleanup(bead_id, { ...refs, merge_sha });
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
    }
  }

  /**
   * The PR/remote facts one bead's cleanup would use, from the resolvers that
   * already own them. It applies no policy: the legacy-state migration (master
   * spec §11 rule 1) is what picks a canonical subject out of these and proves
   * its remote containment.
   *
   * @param {string} bead_id
   * @param {{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: import('./foreign-target.js').ForeignPrTarget }|null} [foreign_judged]
   * - A judgment the caller already holds; null re-reads the pins.
   * @returns {Promise<{ base: string|null, base_reason: string|null, merge_sha: string|null, head_sha: string|null, head_ref: string|null, pr_url: string|null }>}
   */
  async function cleanupFacts(bead_id, foreign_judged = null) {
    const q = deps.store.snapshot(workspace);
    const row =
      q.pr_wait.find((/** @type {any} */ entry) => entry.bead_id === bead_id) ||
      null;
    const expected = await expectedBaseFor(q, bead_id);
    const foreign =
      foreign_judged ??
      (await foreignTargetFor(bead_id, row ? row.pr_url : null));
    const merge_sha = await cleanupMergeSha(
      q,
      bead_id,
      { merge_sha: row ? row.merge_sha : null },
      foreign.state === 'ok' ? foreign.target : null
    );
    const observed = deps.observations.get(workspace, bead_id);
    return {
      base: expected.ok ? expected.base : null,
      base_reason: expected.ok ? null : expected.reason,
      merge_sha,
      head_sha:
        q.completion_intents?.[bead_id]?.merge_head_sha ||
        observed?.pr?.head_sha ||
        q.completion_intents?.[bead_id]?.subject?.head_sha ||
        null,
      head_ref: (row ? row.head_ref : null) || observed?.pr?.head_ref || null,
      pr_url:
        (row ? row.pr_url : null) ||
        resolvePrRef(
          q,
          bead_id,
          external ? external.get(workspace, bead_id) : null
        )?.url ||
        null
    };
  }

  /**
   * Resume the idempotent closure half for one migrated legacy row (master
   * spec §11 rule 5). The migration has already retired the legacy failure
   * record and pinned the canonical subject SHA, so this entry adds no policy
   * of its own — it is the same closure every other caller runs.
   *
   * @param {string} bead_id
   */
  async function resumeMigratedClosure(bead_id) {
    if (in_flight.has(bead_id)) {
      return { ok: false, step: null, reason: 'action_in_flight' };
    }
    in_flight.add(bead_id);
    try {
      return await closeCoveredRow(bead_id, true);
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
    }
  }

  /**
   * Resume only nonterminal coordinator-owned cleanup rows after restart.
   *
   * A row is resumed from where its cursor stopped. `base_containment` replays
   * the whole cleanup. `repo_operations` first adopts an exact deploy subject,
   * then waits on the subject's cleanup verify chain tip (UI-btsr §3.3), and
   * only replays when neither was prerecorded. The closure half
   * (`post_merge_jobs`, `branch_cleanup`, `parent_close`) replays ONLY the closure,
   * because reaching those cursors is itself the proof that the repo operations
   * already settled terminally — {@link closeCoveredRow} is the single entry
   * that owns that half, and each of its steps is idempotent, so an interrupted
   * step simply runs again.
   *
   * Both halves are reachable interrupted: beads-ui deploys itself by
   * restarting its own service, so a self-deploy can kill the worker mid
   * cleanup. Such a row records neither success nor failure, which puts it
   * outside the [정리] click's resume (that one requires a `cleanup_failed`
   * record) — without this boot resume it would sit in `pr_wait` forever.
   */
  async function resumeRepoOperations() {
    const queue = deps.store.snapshot(workspace);
    const rows = queue.pr_wait.filter(
      (/** @type {any} */ row) =>
        CLEANUP_STEPS.includes(row.cleanup_cursor) &&
        typeof row.merge_sha === 'string' &&
        !queue.cleanup_failed?.[row.bead_id]
    );
    for (const row of rows) {
      const closure_only =
        CLEANUP_STEPS.indexOf(row.cleanup_cursor) >=
        CLEANUP_STEPS.indexOf(CLOSURE_STEPS[0]);
      if (!closure_only && !repo_operations) {
        continue;
      }
      if (in_flight.has(row.bead_id)) {
        continue;
      }
      in_flight.add(row.bead_id);
      try {
        if (closure_only) {
          await closeCoveredRow(row.bead_id, true);
          continue;
        }
        const operations = repo_operations;
        if (!operations) {
          continue;
        }
        if (row.cleanup_cursor === 'repo_operations') {
          const expected = await expectedBaseFor(queue, row.bead_id);
          if (expected.ok) {
            const exact = await operations.findExactDeployOperation({
              target_base: expected.base,
              bead_id: row.bead_id,
              merged_sha: row.merge_sha
            });
            if (exact) {
              markStep(row.bead_id, 'repo_operations');
              if (
                exact.code === 'repo_operation_timeout_unresolved' ||
                !Number.isFinite(exact.timeout_ms)
              ) {
                await failCleanup(
                  row.bead_id,
                  'repo_operations',
                  'repo_operation_timeout_unresolved',
                  null,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  repoOpsFailureEvidence({
                    code: 'repo_operation_timeout_unresolved'
                  })
                );
                continue;
              }
              const evidence = await operations.waitForDeployTerminal(
                exact.operation_id,
                {
                  target_base: expected.base,
                  merged_sha: row.merge_sha,
                  timeout_ms: exact.timeout_ms
                }
              );
              if (evidence.state === 'succeeded') {
                await closeCoveredRow(row.bead_id);
                continue;
              }
              if (evidence.state === 'failed') {
                await failCleanup(
                  row.bead_id,
                  'repo_operations',
                  evidence.code || 'repo_operation_failed',
                  null,
                  undefined,
                  undefined,
                  undefined,
                  evidence.log_path,
                  repoOpsFailureEvidence(evidence)
                );
              }
              continue;
            }
            // No deploy recorded yet: the cleanup may have stopped inside its
            // own verify — a person's retry included, whose run outlives the
            // restart (UI-btsr §3.3). Wait on that chain's tip with the PR
            // head it stored rather than replaying the cleanup in front of it,
            // where a base fetch or checkout failure would stop a row whose
            // verify is still running. A tip that already failed is adopted,
            // never re-run: this entry carries no retry authority.
            const verify = await operations.findCleanupVerifyOperation?.({
              target_base: expected.base,
              bead_id: row.bead_id,
              merged_sha: row.merge_sha
            });
            if (verify && typeof verify.head_sha === 'string') {
              markStep(row.bead_id, 'repo_operations');
              const receipt =
                (await operations.waitForTerminal(verify.operation_id, {
                  head_sha: verify.head_sha,
                  ...(verify.timeout_ms !== null
                    ? { timeout_ms: verify.timeout_ms }
                    : {})
                })) ||
                operations.verifyReceipt(verify.operation_id, verify.head_sha);
              if (receipt?.state === 'failed') {
                await failCleanup(
                  row.bead_id,
                  'repo_operations',
                  receipt.reason || 'verify_failed',
                  null,
                  undefined,
                  undefined,
                  undefined,
                  receipt.log_path
                );
                continue;
              }
              if (receipt?.state === 'succeeded') {
                await runCleanup(
                  row.bead_id,
                  {
                    merge_sha: row.merge_sha,
                    head_ref: row.head_ref,
                    pr_url: row.pr_url,
                    verified_head_sha: verify.head_sha
                  },
                  { settled_verify: receipt.operation_id }
                );
                continue;
              }
              if (receipt) {
                // Still running past its declared deadline: pending, exactly
                // like an exact deploy that has not settled yet.
                continue;
              }
            }
          }
        }
        await runCleanup(row.bead_id, {
          merge_sha: row.merge_sha,
          head_ref: row.head_ref,
          pr_url: row.pr_url
        });
      } finally {
        in_flight.delete(row.bead_id);
        clearStep(row.bead_id);
      }
    }
    return [];
  }

  /**
   * Run the manual [정리] replay while the caller owns the bead action lock.
   *
   * @param {string} bead_id
   * @param {{ base_ref?: string|null, head_ref?: string|null, merge_sha?: string|null, pr_url?: string|null }} [refs]
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function retryCleanupLocked(bead_id, refs = {}) {
    const q = deps.store.snapshot(workspace);
    if (discardActive(q, bead_id)) {
      return { ok: false, step: null, reason: 'discard_in_progress' };
    }
    if (!inPrWait(q, bead_id)) {
      return { ok: false, step: null, reason: 'not_in_pr_wait' };
    }
    const cleanup_failure = q.cleanup_failed?.[bead_id];
    if (!cleanup_failure) {
      return { ok: false, step: null, reason: 'cleanup_failed_missing' };
    }
    if (CLOSURE_STEPS.includes(cleanup_failure.step)) {
      // The human-click boundary: both callers are clicks, so this is the one
      // entry that may re-run an outcome-unknown post-merge job (§3).
      return await closeCoveredRow(bead_id, true, true);
    }
    // The same boundary for a stopped repo operation (UI-btsr §3.1): the
    // failed verify or deploy runs once more as a new record instead of being
    // adopted again. Boot resume, the coordinator replay and the first run
    // reach `runCleanup` without it.
    return await runCleanup(bead_id, refs, {
      retry_authorized: cleanup_failure.step === 'repo_operations'
    });
  }

  /**
   * Reuse the complete cleanup path for one human-authorized [정리] retry.
   * This entry deliberately has no retry policy of its own.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function retryCleanup(bead_id) {
    if (in_flight.has(bead_id)) {
      return { ok: false, step: null, reason: 'action_in_flight' };
    }
    in_flight.add(bead_id);
    try {
      return await retryCleanupLocked(bead_id);
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
    }
  }

  /**
   * Coordinator-owned replay of the same complete cleanup choreography after
   * a merged-base repair. Authorization is the root intent's prerecorded
   * `retry_cleanup` op, while the manual path is authorized by a [정리] click.
   * No cleanup steps are copied here: both entries call {@link runCleanup}.
   *
   * @param {string} root_bead_id
   * @returns {Promise<{ ok: boolean, pending?: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function resumeCompletionCleanup(root_bead_id) {
    if (in_flight.has(root_bead_id)) {
      return { ok: false, step: null, reason: 'action_in_flight' };
    }
    const q = deps.store.snapshot(workspace);
    if (discardActive(q, root_bead_id)) {
      return { ok: false, step: null, reason: 'discard_in_progress' };
    }
    const intent = q.completion_intents?.[root_bead_id];
    if (!inPrWait(q, root_bead_id)) {
      return { ok: false, step: null, reason: 'not_in_pr_wait' };
    }
    if (
      !intent ||
      intent.phase !== 'cleaning' ||
      intent.subject?.role !== 'root' ||
      intent.active_op?.kind !== 'retry_cleanup'
    ) {
      return { ok: false, step: null, reason: 'completion_cleanup_unowned' };
    }
    in_flight.add(root_bead_id);
    try {
      if (CLOSURE_STEPS.includes(q.cleanup_failed?.[root_bead_id]?.step)) {
        return await closeCoveredRow(root_bead_id, true);
      }
      return await runCleanup(root_bead_id);
    } finally {
      in_flight.delete(root_bead_id);
      clearStep(root_bead_id);
    }
  }

  /**
   * Run [폐기]: throw the PR, the worktree and the branch away, and hand the
   * bead back to the candidate lane. It does NOT re-queue and does NOT dispatch
   * — re-running is the drag path (후보 → 대기), which re-passes admission
   * against the CURRENT base, so this button makes exactly one promise and keeps
   * it whether or not the queue is paused (discard spec §1/§4).
   *
   * The transition is ORDER-SENSITIVE and every step is verified:
   *
   *   0. mark the discard in flight in the observation cache — the barrier that
   *      makes this close invisible to the poller's CLOSED-unmerged handling,
   *   1. re-read the PR state authoritatively: the badge is advisory, so a
   *      stale cache can neither skip the close of a genuinely OPEN PR nor let
   *      an already-MERGED one be discarded,
   *   2. close the PR (only when step 1 saw it OPEN),
   *   3. bd status back to `open` AND `metadata.pr_url` removed, each with a
   *      readback (a `resolved` bead would be skipped by a later dispatch as
   *      not-ready — codex finding 3),
   *   4. discard the worktree and the local+remote branch,
   *   5. REMOVE the bead from `pr_wait` in ONE mutation.
   *
   * @param {string} bead_id
   * @returns {Promise<DiscardResult>}
   */
  async function discard(bead_id) {
    if (in_flight.has(bead_id)) {
      return { ok: false, reason: 'action_in_flight' };
    }
    const q = deps.store.snapshot(workspace);
    if (discardActive(q, bead_id)) {
      return { ok: false, reason: 'discard_in_progress' };
    }
    if (!inPrWait(q, bead_id)) {
      return { ok: false, reason: 'not_in_pr_wait' };
    }
    const ref = resolvePrRef(q, bead_id);
    if (!ref) {
      return { ok: false, reason: 'pr_ref_unknown' };
    }
    in_flight.add(bead_id);
    deps.observations.markDiscarding(workspace, bead_id);
    try {
      return await discardTransition(bead_id, ref.number);
    } finally {
      // Released only here: by this point the bead has either left `pr_wait`
      // (nothing observes it any more) or the discard failed and the human needs
      // to see the real state again.
      deps.observations.clearDiscarding(workspace, bead_id);
      in_flight.delete(bead_id);
    }
  }

  /**
   * The click-time authoritative PR state (discard spec §1 step 1). Only the
   * `state` field decides here, so no merge gate is evaluated and no observation
   * is recorded — the barrier is already open and would suppress the write
   * anyway.
   *
   * @param {number} number
   * @param {import('./foreign-target.js').ForeignPrTarget|null} [target]
   * @returns {Promise<{ pr_state: string }|{ error: string }>}
   */
  async function readPrState(number, target = null) {
    /** @type {any} */
    let detail;
    try {
      detail = await ghFor(target).prDetail(repo, number);
    } catch {
      detail = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (detail.state !== 'ok') {
      return { error: detail.state === 'error' ? detail.reason : 'gh_empty' };
    }
    return { pr_state: /** @type {PrDetail} */ (detail.data).state };
  }

  /**
   * Read one `pr_wait` bead's PR state, with no gate and no
   * side effect at all. The merge queue's `merge_unconfirmed` watch (UI-5v7d §2
   * step 4) is the caller: it holds the head while asking, once a minute, the
   * ONE question that can end that state — did the PR actually land?
   *
   * It resolves the PR reference exactly as the merge click does, EXTERNAL rows
   * included, so the watch reads the same PR the merge targeted.
   *
   * @param {string} bead_id
   * @returns {Promise<{ state: string|null, error: string|null }>}
   */
  async function prState(bead_id) {
    const q = deps.store.snapshot(workspace);
    const member = await laneMembership(q, bead_id);
    if (!member.ok) {
      return { state: null, error: member.reason || 'not_in_pr_wait' };
    }
    const ref = resolvePrRef(
      q,
      bead_id,
      member.external === true
        ? {
            pr_url: member.pr_url,
            pr_number: parsePrNumber(member.pr_url)
          }
        : null
    );
    if (!ref) {
      return { state: null, error: 'pr_ref_unknown' };
    }
    const foreign = await foreignTargetFor(
      bead_id,
      member.external === true ? member.pr_url : null,
      member.external === true ? member.metadata : null
    );
    if (foreign.state === 'invalid') {
      return { state: null, error: foreign.reason };
    }
    const target = foreign.state === 'ok' ? foreign.target : null;
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return { state: null, error: pinned.reason };
    }
    const observed = await readPrState(pinned.number, target);
    if ('error' in observed) {
      return { state: null, error: observed.error };
    }
    return { state: observed.pr_state, error: null };
  }

  /**
   * The ordered body of [폐기], separated from the in-flight/observation
   * bookkeeping.
   *
   * A close that fails stops the transition BEFORE bd is touched: the bead stays
   * in `pr_wait` and a merge that landed between the re-read and the close is
   * caught by exactly that failure, leaving it to the poller's MERGED cleanup.
   *
   * @param {string} bead_id
   * @param {number} number
   * @param {import('./foreign-target.js').ForeignPrTarget|null} [target]
   * @returns {Promise<{ ok: boolean, reason: string|null }>}
   */
  async function discardTransition(bead_id, number, target = null) {
    const observed = await readPrState(number, target);
    if ('error' in observed) {
      return { ok: false, reason: `pr_state_unknown:${observed.error}` };
    }
    if (observed.pr_state === 'MERGED') {
      return {
        ok: false,
        reason: target
          ? 'foreign_merged_discard_unsupported'
          : 'pr_already_merged'
      };
    }
    if (observed.pr_state === 'OPEN') {
      /** @type {any} */
      let closed;
      try {
        closed = await ghFor(target).closePr(repo, number);
      } catch {
        closed = { state: 'error', reason: 'gh_spawn_failed' };
      }
      if (closed.state !== 'ok') {
        return { ok: false, reason: `pr_close_failed:${closed.reason}` };
      }
    }

    try {
      await deps.bd.setStatus(bead_id, 'open');
      if ((await deps.bd.readStatus(bead_id)) !== 'open') {
        return { ok: false, reason: 'bd_status_readback_failed' };
      }
      await deps.bd.unsetMetadata(bead_id, 'pr_url');
      if ((await deps.bd.readMetadata(bead_id, 'pr_url')) !== null) {
        return { ok: false, reason: 'bd_pr_url_readback_failed' };
      }
    } catch (err) {
      log('discard bd transition failed for %s: %o', bead_id, err);
      return { ok: false, reason: 'bd_record_failed' };
    }

    const discarded = await cleanupBranches(bead_id);
    if (!discarded.ok) {
      return {
        ok: false,
        reason: `worktree_discard_failed:${discarded.reason}`
      };
    }

    const removed = deps.store.removeFromPrWait(workspace, { bead_id });
    if (!removed.ok) {
      return { ok: false, reason: 'pr_wait_remove_failed' };
    }
    notifyChanged(workspace);
    requestQueueTick();
    return { ok: true, reason: null };
  }

  /**
   * Update a BEHIND PR's branch from its base — the queue-owned base-update
   * mutation of the manual continuation (UI-58w8 §2). The returned SHA is the
   * mutation response's authoritative result identity; the caller re-observes
   * the PR separately and requires exact equality before §4 may relax review.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, reason: string|null, result_head_sha: string|null }>}
   */
  async function updateBase(bead_id) {
    const q = deps.store.snapshot(workspace);
    const member = await laneMembership(q, bead_id);
    if (!member.ok) {
      return { ok: false, reason: member.reason, result_head_sha: null };
    }
    const ref = resolvePrRef(
      q,
      bead_id,
      member.external === true
        ? { pr_url: member.pr_url, pr_number: parsePrNumber(member.pr_url) }
        : null
    );
    if (!ref) {
      return { ok: false, reason: 'pr_ref_unknown', result_head_sha: null };
    }
    // `base_behind` alignment of a pinned foreign PR runs `gh … --repo
    // <pinned slug>` under the same conditions (UI-k467 §3.4).
    const foreign = await foreignTargetFor(
      bead_id,
      member.external === true ? member.pr_url : null,
      member.external === true ? member.metadata : null
    );
    if (foreign.state === 'invalid') {
      return { ok: false, reason: foreign.reason, result_head_sha: null };
    }
    const target = foreign.state === 'ok' ? foreign.target : null;
    const pinned = prNumberFor(target, ref);
    if (!pinned.ok) {
      return { ok: false, reason: pinned.reason, result_head_sha: null };
    }
    /** @type {any} */
    let updated;
    try {
      updated = await ghFor(target).updateBranch(repo, pinned.number);
    } catch (err) {
      log('base update failed for %s: %o', bead_id, err);
      return {
        ok: false,
        reason: 'update_branch_failed',
        result_head_sha: null
      };
    }
    if (
      !updated ||
      updated.state !== 'ok' ||
      typeof updated.data !== 'string' ||
      !/^[0-9a-f]{40}$/i.test(updated.data)
    ) {
      return {
        ok: false,
        reason:
          updated && typeof updated.reason === 'string'
            ? updated.reason
            : 'update_branch_failed',
        result_head_sha: null
      };
    }
    notifyChanged(workspace);
    return {
      ok: true,
      reason: null,
      result_head_sha: updated.data.toLowerCase()
    };
  }

  return {
    merge,
    probeMergeability,
    observeReviewReceipt,
    updateBase,
    dispatchConflict,
    baseContained,
    discard,
    isInFlight: (/** @type {string} */ bead_id) => in_flight.has(bead_id),
    cleanupObservedMerge,
    cleanupFacts,
    resumeMigratedClosure,
    resumeRepoOperations,
    retryCleanup,
    rollbackBaseSync,
    rollbackVerify,
    resumeCompletionCleanup,
    prState,
    completionGate
  };
}
