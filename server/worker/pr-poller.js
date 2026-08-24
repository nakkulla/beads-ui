/**
 * PR poller — the server's eyes on the pull requests it is waiting on
 * (worker-phase2 §4/§5).
 *
 * Phase 1 made "the server OBSERVED an open PR" the completion verdict and
 * parked the bead in `pr_wait`. Nothing watched it after that: the tile knew a
 * PR existed and nothing else. This module closes that loop — every interval it
 * re-observes each `pr_wait` PR (state · mergeable · mergeStateStatus · head
 * SHA), writes the result into the non-persistent observation cache, and
 * emits a queue-changed so the existing `worker-queue-snapshot` push carries
 * fresh badges to every subscriber. It NEVER merges, cleans up, or moves a
 * bead — Phase 5 owns every action.
 *
 * Cost discipline (spec §4):
 *   - it runs ONLY while the workspace has worker-queue subscribers or durable
 *     `auto_merge`/merge-queue demand,
 *   - it makes ZERO `gh` calls when `pr_wait` is empty.
 * Both gates are checked before any query, so an idle server is silent. The
 * demand gate is inherited by reusing {@link createPoller}.
 *
 * `mergeable: UNKNOWN` is re-queried after a short delay rather than reported:
 * GitHub computes mergeability lazily and the first read after a base advance
 * only TRIGGERS that computation, so reporting it verbatim would show
 * "확인중" indefinitely. The delay is injected so tests never sleep.
 *
 * Optional verification runs from here too, pinned to the observed head SHA.
 * A recorded failure for the current SHA is not re-run on a timer; click-time
 * evaluation owns deliberate retries.
 *
 * @import { Queue } from './queue-store.js'
 */
import { isImplementationAttempt } from '../../app/utils/active-attempts.js';
import { debug } from '../logging.js';
import { createPoller } from '../poller.js';
import { createAncestryProbe, reviewReceiptState } from './merge-gate.js';
import { onQueueChanged } from './queue-events.js';
import { COMPLETION_VERIFY_SUPPRESSED_PHASES } from './queue-store.js';

const log = debug('worker:pr-poller');

/**
 * Poll cadence. Spec §4 fixes the band at 30–60 s; 45 s sits in the middle —
 * it halves the query volume of a 30 s cadence while keeping worst-case badge
 * staleness inside the spec ceiling, and with two `gh` calls per open PR per
 * pass a realistic `pr_wait` of a handful of PRs stays around ten calls a
 * minute, orders of magnitude under GitHub's hourly budget. The badges are
 * advisory anyway (§6 makes the click-time re-query authoritative), so buying
 * freshness below 45 s would pay a real cost for no decision quality.
 *
 * @type {number}
 */
export const DEFAULT_PR_POLL_INTERVAL_SECONDS = 45;

/**
 * How long to wait before re-reading a `mergeable: UNKNOWN`. The first query is
 * what asks GitHub to compute mergeability; a couple of seconds is the usual
 * turnaround, and a still-UNKNOWN second read simply reports as such and
 * resolves on the next pass.
 *
 * @type {number}
 */
export const DEFAULT_UNKNOWN_REQUERY_DELAY_MS = 2000;

/**
 * Pull a PR number out of a PR URL (`…/pull/304`).
 *
 * @param {unknown} url
 * @returns {number|null}
 */
function prNumberFromUrl(url) {
  if (typeof url !== 'string') {
    return null;
  }
  const m = /\/pull\/(\d+)/.exec(url);
  return m ? Number.parseInt(m[1], 10) : null;
}

/**
 * Resolve which PR a `pr_wait` bead is waiting on, from the durable attempt
 * records (the verifier stored the observed url+number in `verify_result` when
 * it moved the bead into the lane). A PURE read of the queue snapshot, so it
 * survives a restart: the attempts are persisted even though the observation
 * cache is not.
 *
 * A promoted external row can retain its PR url directly in durable `pr_wait`
 * state after the bead closes and leaves the resolved-only registry. That row
 * is the restart-safe fallback after attempts and before `external`, the row
 * the registry derived from bd's own `metadata.pr_url`. Attempts still win:
 * when both exist the worker's own record is the more specific one.
 *
 * @param {Queue} queue
 * @param {string} bead_id
 * @param {{ pr_url: string, pr_number: number|null }|null} [external]
 * @returns {{ number: number, url: string }|null}
 */
export function resolvePrRef(queue, bead_id, external = null) {
  const rollback = Object.values(queue?.discard_operations || {}).find(
    (operation) =>
      /** @type {any} */ (operation)?.bead_id === bead_id &&
      /** @type {any} */ (operation)?.phase === 'revert_pr_wait' &&
      Number.isFinite(/** @type {any} */ (operation)?.revert_pr?.number) &&
      typeof (/** @type {any} */ (operation)?.revert_pr?.url) === 'string'
  );
  if (rollback) {
    const revert_pr = /** @type {any} */ (rollback).revert_pr;
    return { number: revert_pr.number, url: revert_pr.url };
  }
  const attempts = queue && queue.attempts ? Object.values(queue.attempts) : [];
  /** @type {{ number: number, url: string, at: number }|null} */
  let best = null;
  for (const a of attempts) {
    if (!a || a.bead_id !== bead_id || !isImplementationAttempt(a)) {
      continue;
    }
    const vr = /** @type {any} */ (a.verify_result);
    if (!vr || typeof vr !== 'object') {
      continue;
    }
    const url = typeof vr.pr_url === 'string' ? vr.pr_url : '';
    const number =
      typeof vr.pr_number === 'number' ? vr.pr_number : prNumberFromUrl(url);
    if (number === null || !Number.isFinite(number)) {
      continue;
    }
    const at = typeof a.finished_at === 'number' ? a.finished_at : 0;
    if (!best || at >= best.at) {
      best = { number, url, at };
    }
  }
  if (best) {
    return { number: best.number, url: best.url };
  }
  const durable_row = (Array.isArray(queue?.pr_wait) ? queue.pr_wait : []).find(
    (entry) => entry?.bead_id === bead_id
  );
  const durable_url =
    typeof durable_row?.pr_url === 'string' ? durable_row.pr_url : '';
  const durable_number = prNumberFromUrl(durable_url);
  if (durable_number !== null) {
    return { number: durable_number, url: durable_url };
  }
  if (!external) {
    return null;
  }
  const url = typeof external.pr_url === 'string' ? external.pr_url : '';
  const number =
    typeof external.pr_number === 'number' &&
    Number.isFinite(external.pr_number)
      ? external.pr_number
      : prNumberFromUrl(url);
  return number === null ? null : { number, url };
}

/**
 * Create a PR poller for ONE workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: { snapshot: (workspace: string) => Queue, reconcileExternalPrWait?: (workspace: string, input: { bead_id: string, pr_url: string, head_ref: string }) => { ok: boolean }, promoteMergedExternal?: (workspace: string, input: any) => { ok: boolean }, recordCleanupFailure?: (workspace: string, input: any) => unknown },
 *   gh: { prDetail: (repo_dir: string, number: number) => Promise<import('./gh.js').GhResult<import('./gh.js').PrDetail>> },
 *   observations: ReturnType<typeof import('./pr-observations.js').createPrObservationStore>,
 *   readIssue?: (bead_id: string) => Promise<Record<string, any>>,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   activity?: ReturnType<typeof import('./activity-store.js').createActivityStore>,
 *   getSubscriberCount: () => number,
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   repoOperations?: { hasConfig: (sha: string, options?: { current_target_base?: boolean }) => Promise<any>, ensureVerify: (candidate: any) => Promise<any>, waitForTerminal: (operation_id: string, options?: any) => Promise<any>, verifyReceipt: (operation_id: string, head_sha: string) => any, refreshDisplay?: (input: { base: string|null, sha: string|null }) => Promise<any> },
 *   onMerged?: (bead_id: string, merge_sha: string, refs?: { head_ref: string|null, pr_url: string|null }) => Promise<unknown>,
 *   onDiscardObservation?: (bead_id: string) => Promise<unknown>,
 *   external?: {
 *     refresh: () => Promise<unknown>,
 *     list: () => import('./external-pr.js').ExternalPrRow[]
 *   },
 *   notifyChanged?: (workspace: string) => void,
 *   intervalSeconds?: number,
 *   requeryDelayMs?: number,
 *   sleep?: (ms: number) => Promise<void>,
 *   now?: () => number
 * }} deps
 */
export function createPrPoller(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  // Absent wiring leaves the probe undefined, which `reviewReceiptState` reads
  // as fail-closed (UI-vzyh §2) — never as a silent pass.
  const probeAncestry =
    typeof deps.gitRun === 'function'
      ? createAncestryProbe({ gitRun: deps.gitRun, repo })
      : undefined;
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const requery_delay_ms =
    typeof deps.requeryDelayMs === 'number'
      ? deps.requeryDelayMs
      : DEFAULT_UNKNOWN_REQUERY_DELAY_MS;
  const notifyChanged = deps.notifyChanged || (() => {});
  const repo_operations = deps.repoOperations || null;

  const activity = deps.activity || null;
  const external = deps.external || null;

  /**
   * Whether anything still NEEDS this workspace observed (UI-yk55 §4.4).
   *
   * The subscriber count alone used to answer this, and "subscriber" means an
   * open browser tab. That was right while every merge came from a click: with
   * nobody looking, nothing could act on an observation. `auto_merge` breaks
   * that equivalence — the server itself becomes a consumer, and a poller gated
   * on tabs would stop feeding it the moment the last tab closed, so the mode
   * would silently do nothing. The observation cache is non-persistent, so a
   * restart lands in the same state.
   *
   * A NON-EMPTY merge queue is demand for the same reason (UI-wwby §3): the
   * driver halts on an unreadable head and resumes on exactly one signal — an
   * observation arriving. With the toggle off and no tab open, a queue that
   * survived a restart into an empty observation cache would wait on a poller
   * that never runs, which is the permanent halt this Bead exists to remove.
   * The `auto_merge` flag cannot stand in for it: a manual [머지] click fills
   * the queue with the toggle off.
   *
   * With none of these present the old rule stands: no subscribers, no `gh`
   * traffic.
   *
   * @returns {boolean}
   */
  function pollDemand() {
    if (deps.getSubscriberCount() > 0) {
      return true;
    }
    try {
      const q = deps.store.snapshot(workspace);
      return (
        q.auto_merge === true ||
        (Array.isArray(q.merge_queue) && q.merge_queue.length > 0) ||
        Object.values(q.discard_operations || {}).some(
          (operation) =>
            /** @type {any} */ (operation)?.phase === 'revert_pr_wait'
        )
      );
    } catch {
      return false;
    }
  }

  /**
   * Mark an activity transition and publish it (UI-raqh §3). The fanout is what
   * turns the flag into a badge; without it the state would only surface on the
   * next unrelated snapshot.
   *
   * @param {'beginChecking'|'endChecking'|'beginVerifying'|'endVerifying'} op
   * @param {string} bead_id
   */
  function markActivity(op, bead_id) {
    if (!activity) {
      return;
    }
    activity[op](workspace, bead_id);
    notifyChanged(workspace);
  }

  /** Guards the OBSERVATION phase so overlapping ticks never double-query. */
  let observing = false;
  /**
   * In-flight local verifications, keyed `bead_id\0sha`, so a pass that starts
   * while a 10-minute suite is still running does not launch a second one.
   *
   * @type {Set<string>}
   */
  const verifying = new Set();
  /**
   * Beads whose externally-observed post-merge cleanup is running.
   *
   * @type {Set<string>}
   */
  const cleaning = new Set();
  /** @type {Set<string>} */
  const discard_observing = new Set();
  /** @type {(() => void)|null} */
  let off_queue_changed = null;

  /**
   * Observe one bead's PR. Returns true when the cache changed.
   *
   * @param {Queue} queue
   * @param {string} bead_id
   * @param {import('./external-pr.js').ExternalPrRow|null} [external_row] - The
   * registry row when this bead is an EXTERNAL lane member (UI-7agi §1).
   * @returns {Promise<{ verify: Promise<void>|null }>}
   */
  async function observeBead(queue, bead_id, external_row = null) {
    const ref = resolvePrRef(queue, bead_id, external_row);
    if (!ref) {
      // No durable PR reference: the bead is in `pr_wait` but nothing records
      // WHICH pr. Fail closed (undecidable gate) rather than guessing.
      deps.observations.record(workspace, bead_id, {
        error: 'pr_ref_unknown'
      });
      return { verify: null };
    }

    /** @type {import('./gh.js').GhResult<import('./gh.js').PrDetail>} */
    let detail;
    try {
      detail = await deps.gh.prDetail(repo, ref.number);
    } catch {
      detail = { state: 'error', reason: 'gh_spawn_failed' };
    }
    // GitHub computes mergeability lazily: the query itself triggers it, so the
    // first read right after a base advance is meaningless. Re-read once.
    if (
      detail.state === 'ok' &&
      detail.data.state === 'OPEN' &&
      detail.data.mergeable === 'UNKNOWN'
    ) {
      await sleep(requery_delay_ms);
      try {
        const again = await deps.gh.prDetail(repo, ref.number);
        if (again.state === 'ok') {
          detail = again;
        }
      } catch {
        // Keep the first (UNKNOWN) reading; the next pass tries again.
      }
    }
    if (detail.state !== 'ok') {
      deps.observations.record(workspace, bead_id, {
        error: detail.state === 'error' ? detail.reason : 'gh_empty'
      });
      return { verify: null };
    }
    const pr = detail.data;

    const active_discard = Object.values(queue.discard_operations || {}).some(
      (operation) =>
        /** @type {any} */ (operation).bead_id === bead_id &&
        /** @type {any} */ (operation).phase !== 'done'
    );
    if (active_discard) {
      deps.observations.record(workspace, bead_id, { error: null, pr });
      return {
        verify:
          typeof deps.onDiscardObservation === 'function'
            ? observeDiscard(bead_id)
            : null
      };
    }

    // A merged or closed PR is classified by its state alone. MERGED hands off to
    // the SAME post-merge cleanup the [머지] button runs (worker-phase2 §6 — one
    // implementation, two triggers); CLOSED-unmerged is NOT a completion, so the
    // bead simply stays where it is awaiting a human decision (§4).
    if (pr.state !== 'OPEN') {
      deps.observations.record(workspace, bead_id, { error: null, pr });
      if (
        pr.state === 'MERGED' &&
        !queue.cleanup_failed?.[bead_id] &&
        typeof deps.onMerged === 'function'
      ) {
        const merge_sha = pr.merge_sha || pr.merged_sha;
        if (typeof merge_sha !== 'string') {
          deps.observations.record(workspace, bead_id, {
            error: 'merge_sha_unobserved'
          });
          return { verify: null };
        }
        return {
          verify: cleanupMerged(bead_id, merge_sha, {
            head_ref: pr.head_ref || null,
            pr_url: pr.url || null,
            external: external_row !== null
          })
        };
      }
      return { verify: null };
    }

    if (
      external_row !== null &&
      typeof deps.store.reconcileExternalPrWait === 'function'
    ) {
      try {
        deps.store.reconcileExternalPrWait(workspace, {
          bead_id,
          pr_url: pr.url || ref.url,
          head_ref: pr.head_ref || ''
        });
      } catch (err) {
        log('external PR-wait reconcile failed for %s: %o', bead_id, err);
      }
    }

    /** @type {import('./merge-gate.js').CurrentState} */
    let review_receipt_state = 'invalid';
    if (typeof deps.readIssue === 'function') {
      try {
        const issue = await deps.readIssue(bead_id);
        review_receipt_state = await reviewReceiptState(
          issue,
          pr.head_sha,
          probeAncestry
        );
      } catch {
        review_receipt_state = 'invalid';
      }
    }
    deps.observations.record(workspace, bead_id, {
      error: null,
      pr,
      review_receipt: {
        state: review_receipt_state,
        head_sha: pr.head_sha
      }
    });

    if (!repo_operations || typeof deps.resolveBase !== 'function') {
      return { verify: null };
    }
    const operations = repo_operations;
    /**
     * @param {string} reason
     */
    async function failBaseResolution(reason) {
      try {
        await operations.refreshDisplay?.({ base: null, sha: null });
      } catch (err) {
        log('repo-ops display invalidation failed for %s: %o', bead_id, err);
      }
      deps.observations.record(workspace, bead_id, {
        error: reason,
        pr,
        review_receipt: {
          state: review_receipt_state,
          head_sha: pr.head_sha
        }
      });
      return { verify: null };
    }
    let pinned;
    try {
      pinned = await deps.resolveBase();
    } catch {
      return failBaseResolution('base_unresolved:git_error');
    }
    if (!pinned.ok || typeof pinned.base_oid !== 'string') {
      return failBaseResolution(
        `base_unresolved:${pinned && 'step' in pinned ? pinned.step : 'base_sha_unobserved'}`
      );
    }
    const policy = await repo_operations.hasConfig(pinned.base_oid, {
      current_target_base: true
    });
    if (!policy.ok || typeof policy.verify_script_path !== 'string') {
      return { verify: null };
    }
    if (verifySuppressed(queue, bead_id)) {
      return { verify: null };
    }
    return {
      verify: startVerify(bead_id, ref.number, pr.head_sha, {
        target_base: pinned.base,
        base_sha: pinned.base_oid,
        script_path: policy.verify_script_path
      })
    };
  }

  /**
   * Whether this row's completion intent forbids a pre-merge verify run
   * (UI-hk74 §8). A row that cannot merge under any observation still draws a
   * fresh verify every time the base moves, which is where the five wasted runs
   * of the originating incident came from. `reviewing` is deliberately NOT
   * suppressed: the gate demands a verify receipt the moment a review is
   * approved.
   *
   * @param {Queue} queue
   * @param {string} bead_id
   */
  function verifySuppressed(queue, bead_id) {
    const phase = /** @type {any} */ (queue).completion_intents?.[bead_id]
      ?.phase;
    return (
      typeof phase === 'string' &&
      COMPLETION_VERIFY_SUPPRESSED_PHASES.has(phase)
    );
  }

  /**
   * Hand an externally-observed merge to the shared post-merge cleanup, guarded
   * against re-entry: a cleanup can outlast a poll interval, and the bead stays
   * in `pr_wait` until it finishes, so the next pass would otherwise observe
   * MERGED again and start a second one. The cleanup's own guards refuse a
   * bead with an existing `merged_cleanup_failed` record — nothing retries a
   * failed cleanup automatically (§6).
   *
   * @param {string} bead_id
   * @param {string} merge_sha
   * @param {{ head_ref?: string|null, pr_url?: string|null, external?: boolean }} [refs]
   * @returns {Promise<void>}
   */
  async function cleanupMerged(bead_id, merge_sha, refs = {}) {
    const before = deps.store.snapshot(workspace);
    if (cleaning.has(bead_id) || before.cleanup_failed?.[bead_id]) {
      return;
    }
    cleaning.add(bead_id);
    try {
      if (
        refs.external === true &&
        !before.pr_wait.some((entry) => entry.bead_id === bead_id)
      ) {
        const promoted = deps.store.promoteMergedExternal?.(workspace, {
          bead_id,
          merge_sha,
          head_ref: refs.head_ref || null,
          pr_url: refs.pr_url || null
        });
        const promoted_queue = deps.store.snapshot(workspace);
        const durable = promoted_queue.pr_wait.some(
          (entry) => entry.bead_id === bead_id
        );
        if (!promoted?.ok && !durable) {
          deps.store.recordCleanupFailure?.(workspace, {
            bead_id,
            step: 'repo_operations',
            reason: 'external_deployment_promote_failed'
          });
          notifyChanged(workspace);
          return;
        }
      }
      const result = await /** @type {any} */ (deps.onMerged)(
        bead_id,
        merge_sha,
        refs
      );
      if (
        result?.ok === false &&
        result.reason !== 'action_in_flight' &&
        !deps.store.snapshot(workspace).cleanup_failed?.[bead_id]
      ) {
        deps.store.recordCleanupFailure?.(workspace, {
          bead_id,
          step: result.step || 'repo_operations',
          reason: result.reason || 'cleanup_observer_failed'
        });
      }
      notifyChanged(workspace);
    } catch (err) {
      if (!deps.store.snapshot(workspace).cleanup_failed?.[bead_id]) {
        deps.store.recordCleanupFailure?.(workspace, {
          bead_id,
          step: 'repo_operations',
          reason: 'cleanup_observer_failed'
        });
      }
      log('post-merge cleanup failed for %s: %o', bead_id, err);
    } finally {
      cleaning.delete(bead_id);
    }
  }

  /**
   * Wake the durable discard driver once per bead per observation round.
   *
   * @param {string} bead_id
   */
  async function observeDiscard(bead_id) {
    if (discard_observing.has(bead_id)) {
      return;
    }
    discard_observing.add(bead_id);
    try {
      await /** @type {any} */ (deps.onDiscardObservation)(bead_id);
      notifyChanged(workspace);
    } catch (err) {
      log('discard observation failed for %s: %o', bead_id, err);
    } finally {
      discard_observing.delete(bead_id);
    }
  }

  /**
   * Run the local verification for one (bead, head SHA) pair and bind the
   * result to that SHA.
   *
   * @param {string} bead_id
   * @param {number} pr_number
   * @param {string} head_sha
   * @param {{ target_base: string, base_sha: string, script_path: string }} policy
   * @returns {Promise<void>}
   */
  async function startVerify(bead_id, pr_number, head_sha, policy) {
    if (!repo_operations) {
      return;
    }
    const key = `${bead_id}\u0000${policy.base_sha}\u0000${head_sha}\u0000${policy.script_path}`;
    if (verifying.has(key)) {
      return;
    }
    verifying.add(key);
    // A bead may hold one run per head SHA, so the display flag is a counter:
    // the first run to finish must not switch the badge off under the second.
    markActivity('beginVerifying', bead_id);
    try {
      const ensured = await repo_operations.ensureVerify({
        repo,
        origin: 'origin',
        target_base: policy.target_base,
        base_sha: policy.base_sha,
        head_sha,
        bead_id,
        pr_number,
        script_path: policy.script_path
      });
      if (!ensured.ok || typeof ensured.operation_id !== 'string') {
        return;
      }
      const receipt =
        (await repo_operations.waitForTerminal(ensured.operation_id, {
          head_sha,
          timeout_ms: ensured.timeout_ms
        })) || repo_operations.verifyReceipt(ensured.operation_id, head_sha);
      if (receipt?.state === 'succeeded' || receipt?.state === 'failed') {
        deps.observations.recordVerify(workspace, bead_id, receipt);
      }
      notifyChanged(workspace);
    } catch (err) {
      log('verify run failed for %s@%s: %o', bead_id, head_sha, err);
    } finally {
      verifying.delete(key);
      markActivity('endVerifying', bead_id);
    }
  }

  /**
   * One observation pass. Subscriber-gated and lane-gated: with no subscribers,
   * or with an empty lane, NOT ONE `gh` call is made. The lane is the UNION of
   * the durable `pr_wait` and the external PR registry (UI-7agi §1) — without
   * the union an overlaid external row would render forever as 관측 대기,
   * because nothing would ever observe it.
   *
   * The returned promise settles only after any verification this pass started,
   * so a test can await deterministic completion — but the overlap guard is
   * released as soon as the observations are done, so a long-running suite
   * never blocks the next pass's badge refresh.
   *
   * @returns {Promise<void>}
   */
  async function tick() {
    if (!pollDemand()) {
      return;
    }
    if (observing) {
      return;
    }
    observing = true;
    try {
      // The external registry is re-derived from bd on the SAME cadence, inside
      // the same subscriber gate, so an idle server scans nothing (UI-7agi §1).
      // A failed scan keeps the previous rows rather than emptying the lane.
      if (external) {
        try {
          await external.refresh();
        } catch (err) {
          log('external PR scan failed for %s: %o', workspace, err);
        }
      }
      /** @type {Promise<void>[]} */
      const pending = [];
      const queue = deps.store.snapshot(workspace);
      const durable = Array.isArray(queue.pr_wait) ? [...queue.pr_wait] : [];
      for (const operation of Object.values(queue.discard_operations || {})) {
        const record = /** @type {any} */ (operation);
        if (
          record?.phase === 'revert_pr_wait' &&
          typeof record.bead_id === 'string' &&
          !durable.some((entry) => entry.bead_id === record.bead_id)
        ) {
          durable.push({
            bead_id: record.bead_id,
            added_at: record.requested_at
          });
        }
      }
      const durable_ids = new Set(durable.map((e) => e.bead_id));
      /** @type {Map<string, import('./external-pr.js').ExternalPrRow>} */
      const external_rows = new Map();
      if (external) {
        for (const row of external.list()) {
          // A bead the worker itself put in `pr_wait` is a WORKER row: the
          // durable attempt is the better record, so the overlay yields.
          if (!durable_ids.has(row.bead_id)) {
            external_rows.set(row.bead_id, row);
          }
        }
      }
      const entries = [
        ...durable,
        ...[...external_rows.values()].map((row) => ({
          bead_id: row.bead_id,
          added_at: row.added_at
        }))
      ];
      const lane_ids = entries.map((e) => e.bead_id);
      // A MERGE QUEUE member keeps its observation even after it drops out of
      // the lane (UI-yk55 §3.2). An external row vanishes from the overlay with
      // no lane mutation behind it, and the driver still has to dispose of the
      // item — which it can only do by reading the head SHA this cache holds.
      // Pruning it there would leave the driver unable to record an exclusion,
      // so it would hold the item and halt, blocking every item behind it.
      const queued_ids = Array.isArray(queue.merge_queue)
        ? queue.merge_queue.map((/** @type {any} */ e) => e.bead_id)
        : [];
      // Whether anything was being observed BEFORE this pass pruned. It decides
      // the empty-lane fanout below.
      const had_observations =
        Object.keys(deps.observations.snapshot(workspace)).length > 0;
      deps.observations.prune(workspace, [...lane_ids, ...queued_ids]);
      // The activity cache describes the same lane, so it is pruned with it —
      // a bead that merged or was discarded must not keep a stale badge.
      if (activity) {
        activity.prune(workspace, lane_ids);
      }
      if (entries.length === 0) {
        // The lane just emptied. For a durable row the queue mutation that
        // emptied it already fanned out; a registry-only row has NO other
        // emitter (implementation review 2026-07-28), so without this the
        // client would keep rendering a row whose bead is gone — and every
        // later pass returns here too, so it would never self-correct. Gated on
        // there having been something to drop, which makes it fire once.
        if (had_observations) {
          notifyChanged(workspace);
        }
        return;
      }
      for (const entry of entries) {
        // `확인중` covers exactly the gh round-trip for this bead (UI-raqh §3);
        // its own `finally` is the only thing that clears it, so an overlapping
        // local verification's badge is never touched.
        markActivity('beginChecking', entry.bead_id);
        try {
          const r = await observeBead(
            queue,
            entry.bead_id,
            external_rows.get(entry.bead_id) || null
          );
          if (r.verify) {
            pending.push(r.verify);
          }
        } catch (err) {
          log('observation failed for %s: %o', entry.bead_id, err);
          // Record the failure so EVERY lane member ends the pass with an
          // entry: the queue-changed hook re-ticks while a bead is unobserved,
          // and a silently skipped bead would make that hook self-trigger.
          deps.observations.record(workspace, entry.bead_id, {
            error: 'observation_error'
          });
        } finally {
          markActivity('endChecking', entry.bead_id);
        }
      }
      notifyChanged(workspace);
      await Promise.all(pending);
    } finally {
      observing = false;
    }
  }

  const poller = createPoller({
    intervalSeconds:
      typeof deps.intervalSeconds === 'number'
        ? deps.intervalSeconds
        : DEFAULT_PR_POLL_INTERVAL_SECONDS,
    // The interval carries the SAME demand rule as `tick` — the shared poller
    // gates on this count before it ever calls onTick, so gating only inside
    // `tick` would leave the timer half-armed (UI-yk55 §4.4).
    getClientCount: () => (pollDemand() ? 1 : 0),
    onTick: () => {
      void tick().catch((err) => log('pr poll tick failed: %o', err));
    }
  });

  return {
    tick,

    /**
     * Arm the interval AND a queue-changed hook that observes a bead as soon as
     * it ENTERS `pr_wait` (spec §5's "pr_wait 진입 시" trigger) instead of
     * waiting up to a full interval. The hook fires a pass only when the lane
     * holds a bead with no observation yet, so ordinary queue mutations do not
     * turn into `gh` traffic.
     */
    start() {
      poller.start();
      if (off_queue_changed) {
        return;
      }
      off_queue_changed = onQueueChanged((ws) => {
        if (ws !== workspace) {
          return;
        }
        let unobserved = false;
        try {
          const queue = deps.store.snapshot(workspace);
          const entries = Array.isArray(queue.pr_wait) ? queue.pr_wait : [];
          /** @type {string[]} */
          const ids = entries.map((e) => e.bead_id);
          if (external) {
            for (const row of external.list()) {
              ids.push(row.bead_id);
            }
          }
          unobserved = ids.some((id) => !deps.observations.get(workspace, id));
        } catch {
          unobserved = false;
        }
        if (unobserved) {
          void tick().catch((err) => log('pr entry tick failed: %o', err));
        }
      });
    },

    stop() {
      poller.stop();
      if (off_queue_changed) {
        off_queue_changed();
        off_queue_changed = null;
      }
    }
  };
}
