/**
 * PR poller — the server's eyes on the pull requests it is waiting on
 * (worker-phase2 §4/§5).
 *
 * Phase 1 made "the server OBSERVED an open PR" the completion verdict and
 * parked the bead in `pr_wait`. Nothing watched it after that: the tile knew a
 * PR existed and nothing else. This module closes that loop — every interval it
 * re-observes each `pr_wait` PR (state · mergeable · mergeStateStatus · CI ·
 * head SHA), writes the result into the non-persistent observation cache, and
 * emits a queue-changed so the existing `worker-queue-snapshot` push carries
 * fresh badges to every subscriber. It NEVER merges, cleans up, or moves a
 * bead — Phase 5 owns every action.
 *
 * Cost discipline (spec §4):
 *   - it runs ONLY while the workspace has worker-queue subscribers, and
 *   - it makes ZERO `gh` calls when `pr_wait` is empty.
 * Both gates are checked before any query, so an idle server is silent. The
 * subscriber gate is inherited by reusing {@link createPoller}.
 *
 * `mergeable: UNKNOWN` is re-queried after a short delay rather than reported:
 * GitHub computes mergeability lazily and the first read after a base advance
 * only TRIGGERS that computation, so reporting it verbatim would show
 * "확인중" indefinitely. The delay is injected so tests never sleep.
 *
 * Local verification (§5 tier 2) runs from here too, pinned to the observed
 * head SHA — see {@link runVerifyAtSha}. It is started only for an OPEN PR
 * whose checks observation came back SUCCESSFULLY EMPTY (no CI) when the
 * workspace resolves a `verify_cmd` and the cache holds no result for that
 * exact SHA (a restart cache-miss, or the head advanced). A recorded RED for
 * the current SHA is not re-run on a timer — that would relaunch a full test
 * suite every interval forever; Phase 5's click-time re-check is what re-runs
 * it deliberately.
 *
 * @import { Queue } from './queue-store.js'
 * @import { CiObservation } from './pr-observations.js'
 */
import { debug } from '../logging.js';
import { createPoller } from '../poller.js';
import { onQueueChanged } from './queue-events.js';
import { runVerifyAtSha } from './verify-cmd.js';

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
 * @param {Queue} queue
 * @param {string} bead_id
 * @returns {{ number: number, url: string }|null}
 */
export function resolvePrRef(queue, bead_id) {
  const attempts = queue && queue.attempts ? Object.values(queue.attempts) : [];
  /** @type {{ number: number, url: string, at: number }|null} */
  let best = null;
  for (const a of attempts) {
    if (!a || a.bead_id !== bead_id) {
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
  return best ? { number: best.number, url: best.url } : null;
}

/**
 * Roll a set of normalized checks up to one verdict. A single failure decides
 * the whole rollup; otherwise anything still running keeps it pending; skipped
 * checks do not hold the gate.
 *
 * @param {import('./gh.js').CheckObservation[]} checks
 * @returns {'pass'|'fail'|'pending'}
 */
export function rollupConclusion(checks) {
  let pending = false;
  for (const c of checks) {
    if (c.conclusion === 'fail') {
      return 'fail';
    }
    if (c.conclusion === 'pending') {
      pending = true;
    }
  }
  return pending ? 'pending' : 'pass';
}

/**
 * Create a PR poller for ONE workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: { snapshot: (workspace: string) => Queue },
 *   gh: {
 *     prDetail: (repo_dir: string, number: number) => Promise<import('./gh.js').GhResult<import('./gh.js').PrDetail>>,
 *     prChecks: (repo_dir: string, number: number) => Promise<import('./gh.js').GhResult<import('./gh.js').CheckObservation[]>>
 *   },
 *   observations: ReturnType<typeof import('./pr-observations.js').createPrObservationStore>,
 *   getSubscriberCount: () => number,
 *   resolveVerify?: () => import('./verify-cmd.js').ResolvedVerifyCmd|null,
 *   worktree?: any,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   runVerify?: (input: any) => Promise<{ ok: boolean, reason: string, exit: number|null }>,
 *   onMerged?: (bead_id: string) => Promise<unknown>,
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
  const now = deps.now || (() => Date.now());
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const requery_delay_ms =
    typeof deps.requeryDelayMs === 'number'
      ? deps.requeryDelayMs
      : DEFAULT_UNKNOWN_REQUERY_DELAY_MS;
  const notifyChanged = deps.notifyChanged || (() => {});
  const resolveVerify = deps.resolveVerify || (() => null);
  const runVerify =
    deps.runVerify ||
    ((/** @type {any} */ input) =>
      runVerifyAtSha({
        ...input,
        worktree: deps.worktree,
        git: deps.gitRun
      }));

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
  /** @type {(() => void)|null} */
  let off_queue_changed = null;

  /**
   * Observe one bead's PR. Returns true when the cache changed.
   *
   * @param {Queue} queue
   * @param {string} bead_id
   * @returns {Promise<{ verify: Promise<void>|null }>}
   */
  async function observeBead(queue, bead_id) {
    const ref = resolvePrRef(queue, bead_id);
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

    // A merged or closed PR is classified by its state alone — there is no gate
    // left to compute, so no checks query is spent on it. MERGED hands off to
    // the SAME post-merge cleanup the [머지] button runs (worker-phase2 §6 — one
    // implementation, two triggers); CLOSED-unmerged is NOT a completion, so the
    // bead simply stays where it is awaiting a human decision (§4).
    if (pr.state !== 'OPEN') {
      deps.observations.record(workspace, bead_id, { error: null, pr });
      if (pr.state === 'MERGED' && typeof deps.onMerged === 'function') {
        return { verify: cleanupMerged(bead_id) };
      }
      return { verify: null };
    }

    /** @type {import('./gh.js').GhResult<import('./gh.js').CheckObservation[]>} */
    let checks;
    try {
      checks = await deps.gh.prChecks(repo, ref.number);
    } catch {
      checks = { state: 'error', reason: 'gh_spawn_failed' };
    }
    /** @type {CiObservation} */
    const ci =
      checks.state === 'ok'
        ? {
            state: 'ok',
            head_sha: pr.head_sha,
            checks: checks.data,
            conclusion: rollupConclusion(checks.data),
            reason: null
          }
        : checks.state === 'empty'
          ? {
              state: 'empty',
              head_sha: pr.head_sha,
              checks: [],
              conclusion: null,
              reason: null
            }
          : {
              state: 'error',
              head_sha: pr.head_sha,
              checks: [],
              conclusion: null,
              reason: checks.reason
            };
    deps.observations.record(workspace, bead_id, { error: null, pr, ci });

    if (ci.state !== 'empty') {
      return { verify: null };
    }
    const resolved = resolveVerify();
    if (!resolved) {
      return { verify: null };
    }
    const prior = deps.observations.get(workspace, bead_id);
    if (prior && prior.verify && prior.verify.head_sha === pr.head_sha) {
      return { verify: null };
    }
    return {
      verify: startVerify(bead_id, ref.number, pr.head_sha, resolved)
    };
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
   * @returns {Promise<void>}
   */
  async function cleanupMerged(bead_id) {
    if (cleaning.has(bead_id)) {
      return;
    }
    cleaning.add(bead_id);
    try {
      await /** @type {any} */ (deps.onMerged)(bead_id);
      notifyChanged(workspace);
    } catch (err) {
      log('post-merge cleanup failed for %s: %o', bead_id, err);
    } finally {
      cleaning.delete(bead_id);
    }
  }

  /**
   * Run the local verification for one (bead, head SHA) pair and bind the
   * result to that SHA.
   *
   * @param {string} bead_id
   * @param {number} pr_number
   * @param {string} head_sha
   * @param {import('./verify-cmd.js').ResolvedVerifyCmd} resolved
   * @returns {Promise<void>}
   */
  async function startVerify(bead_id, pr_number, head_sha, resolved) {
    const key = `${bead_id}\u0000${head_sha}`;
    if (verifying.has(key)) {
      return;
    }
    verifying.add(key);
    try {
      const r = await runVerify({
        repo,
        bead_id,
        sha: head_sha,
        pr_number,
        cmd: resolved.cmd,
        timeout_ms: resolved.timeout_ms
      });
      deps.observations.recordVerify(workspace, bead_id, {
        head_sha,
        ok: !!r.ok,
        reason: r.reason,
        at: now()
      });
      notifyChanged(workspace);
    } catch (err) {
      log('verify run failed for %s@%s: %o', bead_id, head_sha, err);
    } finally {
      verifying.delete(key);
    }
  }

  /**
   * One observation pass. Subscriber-gated and lane-gated: with no subscribers,
   * or with an empty `pr_wait`, NOT ONE `gh` call is made.
   *
   * The returned promise settles only after any verification this pass started,
   * so a test can await deterministic completion — but the overlap guard is
   * released as soon as the observations are done, so a long-running suite
   * never blocks the next pass's badge refresh.
   *
   * @returns {Promise<void>}
   */
  async function tick() {
    if (deps.getSubscriberCount() <= 0) {
      return;
    }
    if (observing) {
      return;
    }
    observing = true;
    /** @type {Promise<void>[]} */
    const pending = [];
    try {
      const queue = deps.store.snapshot(workspace);
      const entries = Array.isArray(queue.pr_wait) ? queue.pr_wait : [];
      deps.observations.prune(
        workspace,
        entries.map((e) => e.bead_id)
      );
      if (entries.length === 0) {
        return;
      }
      for (const entry of entries) {
        try {
          const r = await observeBead(queue, entry.bead_id);
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
        }
      }
      notifyChanged(workspace);
    } finally {
      observing = false;
    }
    await Promise.all(pending);
  }

  const poller = createPoller({
    intervalSeconds:
      typeof deps.intervalSeconds === 'number'
        ? deps.intervalSeconds
        : DEFAULT_PR_POLL_INTERVAL_SECONDS,
    getClientCount: deps.getSubscriberCount,
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
          unobserved = entries.some(
            (e) => !deps.observations.get(workspace, e.bead_id)
          );
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
