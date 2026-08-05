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
 *   - it runs ONLY while the workspace has worker-queue subscribers OR the
 *     durable `auto_merge` flag is on (UI-yk55 §4.4), and
 *   - it makes ZERO `gh` calls when `pr_wait` is empty.
 * Both gates are checked before any query, so an idle server is silent. The
 * demand gate is inherited by reusing {@link createPoller}.
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
 * A bead with NO attempt at all — a PR a normal session delivered (UI-7agi §3)
 * — falls back to `external`, the row the registry derived from bd's own
 * `metadata.pr_url`. Attempts still win: when both exist the worker's own
 * record is the more specific one.
 *
 * @param {Queue} queue
 * @param {string} bead_id
 * @param {{ pr_url: string, pr_number: number|null }|null} [external]
 * @returns {{ number: number, url: string }|null}
 */
export function resolvePrRef(queue, bead_id, external = null) {
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
  if (best) {
    return { number: best.number, url: best.url };
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
 *   activity?: ReturnType<typeof import('./activity-store.js').createActivityStore>,
 *   getSubscriberCount: () => number,
 *   resolveVerify?: (pinned_sha?: string|null) => Promise<import('./repo-ops.js').VerifyResolution>,
 *   worktree?: any,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   runVerify?: (input: any) => Promise<{ ok: boolean, reason: string, exit: number|null }>,
 *   onMerged?: (bead_id: string) => Promise<unknown>,
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
  const now = deps.now || (() => Date.now());
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const requery_delay_ms =
    typeof deps.requeryDelayMs === 'number'
      ? deps.requeryDelayMs
      : DEFAULT_UNKNOWN_REQUERY_DELAY_MS;
  const notifyChanged = deps.notifyChanged || (() => {});
  const resolveVerify =
    deps.resolveVerify ||
    (() =>
      Promise.resolve(
        /** @type {import('./repo-ops.js').VerifyResolution} */ ({
          state: 'absent'
        })
      ));
  const runVerify =
    deps.runVerify ||
    ((/** @type {any} */ input) =>
      runVerifyAtSha({
        ...input,
        worktree: deps.worktree,
        git: deps.gitRun
      }));

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
   * With none of the three present the old rule stands exactly as it was: no
   * subscribers, no `gh` traffic.
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
        (Array.isArray(q.merge_queue) && q.merge_queue.length > 0)
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

    // A merged or closed PR is classified by its state alone — there is no gate
    // left to compute, so no checks query is spent on it. MERGED hands off to
    // the SAME post-merge cleanup the [머지] button runs (worker-phase2 §6 — one
    // implementation, two triggers); CLOSED-unmerged is NOT a completion, so the
    // bead simply stays where it is awaiting a human decision (§4).
    if (pr.state !== 'OPEN') {
      deps.observations.record(workspace, bead_id, { error: null, pr });
      // An EXTERNAL row records the MERGED observation and STOPS (UI-7agi §1):
      // its cleanup runs the full choreography including `deploy`, and nothing
      // the user did not click may deploy. The lane shows `머지됨 · 정리` and the
      // [정리] click is the single trigger — the worker row's automatic hand-off
      // stays exactly as it was, because there the merge itself came from a
      // click on this server.
      if (
        pr.state === 'MERGED' &&
        !external_row &&
        typeof deps.onMerged === 'function'
      ) {
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
    // Pre-merge context, so the pin is the fetched remote target-base tip that
    // the injected resolver supplies (UI-kfl4 §4.1). An `invalid` declaration
    // starts NO run: the gate refuses the row as undecidable, and running a
    // command resolved from the legacy fallback would be the silent drift the
    // ladder exists to end.
    const resolved = await resolveVerify();
    if (resolved.state !== 'resolved') {
      return { verify: null };
    }
    const prior = deps.observations.get(workspace, bead_id);
    if (prior && prior.verify && prior.verify.head_sha === pr.head_sha) {
      return { verify: null };
    }
    return {
      verify: startVerify(bead_id, ref.number, pr.head_sha, resolved.value)
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
    // A bead may hold one run per head SHA, so the display flag is a counter:
    // the first run to finish must not switch the badge off under the second.
    markActivity('beginVerifying', bead_id);
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
    observing = true;
    /** @type {Promise<void>[]} */
    const pending = [];
    try {
      const queue = deps.store.snapshot(workspace);
      const durable = Array.isArray(queue.pr_wait) ? queue.pr_wait : [];
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
