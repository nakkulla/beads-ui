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
 *   3. THREE BRANCHES, ONE OF WHICH IS NOT A MERGE.
 *        CLEAN → squash merge.
 *        BEHIND → update-branch on GitHub, re-confirm the gate, then merge.
 *        DIRTY → do NOT merge; dispatch a conflict-resolution session and stop.
 *      Automatic conflict resolution is fine; automatic merging is not. Nothing
 *      here merges after a resolution, after a green CI, or on any timer — the
 *      only merge triggers are this click and a merge a human performed on
 *      github.com (which the poller observes and routes into the SAME cleanup).
 *
 * CLEANUP ORDER IS THE `pr-finish` SKILL CONTRACT'S, not this module's:
 *
 *   base 동기화 → repo-required post-merge 검증 → 배포(install) → linked Beads
 *   스윕 (child leaves-first, readback) → 워크트리·원격/로컬 브랜치 정리 →
 *   parent bd close → export: capability ship (provides: readback) →
 *   bead `done(merged)`
 *
 * It is deliberately NOT an unconditional immediate `bd close`. A step that
 * fails STOPS the sequence, leaves the bead `resolved` in `pr_wait`, records a
 * DURABLE `merged_cleanup_failed` (queue.json — see the queue store), raises a
 * banner, and never retries by itself. Returning the situation to a human is
 * the designed outcome: the merge already happened and cannot be undone, so
 * guessing at the remainder is strictly worse than reporting it.
 *
 * A MERGE IS NOT A DELIVERY (worker-deploy-hook): until something restarts the
 * shared service it keeps serving the pre-merge build, which is exactly how a
 * merged fix stayed invisible. The deploy step closes that gap, and everything
 * about it is fail-closed — it refuses without a resolvable verification, and
 * it re-checks the LOCAL checkout immediately before spawning rather than
 * trusting step 1's report of it.
 *
 * @import { Queue } from './queue-store.js'
 * @import { PrDetail } from './gh.js'
 * @import { ResolvedVerifyCmd } from './verify-cmd.js'
 */
import { spawn } from 'node:child_process';
import { debug } from '../logging.js';
import { parsePrNumber } from '../workflow-enrich.js';
import { evaluateMergeGate } from './merge-gate.js';
import { resolvePrRef, rollupConclusion } from './pr-poller.js';
import { shipExportedCapabilities } from './ship-capabilities.js';
import { errorDetail, runVerifyCmd } from './verify-cmd.js';
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

/**
 * The post-merge cleanup steps, IN THE ORDER the pr-finish contract fixes them
 * (worker-phase2 §6, worker-deploy-hook §2). Exported so the failure record,
 * the banner, and the tests all name the same sequence rather than three
 * private copies of it.
 *
 * Aligned with the contract's sweep order: install (= `deploy`) sits directly
 * after sync + verify, and the parent close comes AFTER the branch and worktree
 * cleanup, not before it (the old `parent_close → branch_cleanup` inversion).
 *
 * `ship_exported_capabilities` is the ONE step after the close, and it has to be
 * (ship-close choreography: `bd ship` refuses an open issue without `--force`).
 * That makes it the one step whose failure leaves bd `closed` while the cleanup
 * stopped — see {@link failCleanup} for why that is deliberate and not rolled
 * back.
 *
 * @type {string[]}
 */
export const CLEANUP_STEPS = [
  'base_sync',
  'post_merge_verify',
  'deploy',
  'child_sweep',
  'branch_cleanup',
  'parent_close',
  'ship_exported_capabilities'
];

/**
 * A workspace's resolved post-merge deploy command (`[worker.deploy."<abs>"]`).
 * Config-only — unlike verify there is NO auto-detection, so a null resolution
 * means "this repo has no deployment", never "we could not guess one".
 *
 * @typedef {Object} ResolvedDeployCmd
 * @property {string[]} cmd - Deploy argv (spawned WITHOUT a shell).
 * @property {number} timeout_ms - Deadline for the synchronous mode.
 * @property {boolean} detached - Whether the command restarts the process
 * running this code, and therefore must be launched unattended AFTER the
 * cleanup is durably recorded.
 */

/**
 * What step 1 of the cleanup actually did to the LOCAL checkout. `fast_forwarded`
 * = fetched AND moved the local base branch; the `fetch_only:*` pair = fetched,
 * local checkout deliberately untouched (see {@link syncBase} for why that is
 * sufficient rather than degraded).
 *
 * @typedef {'fast_forwarded'|'fetch_only:not_on_base'|'fetch_only:dirty'} BaseSyncOutcome
 */

/**
 * @typedef {Object} MergeClickResult
 * @property {boolean} ok - Whether the click accomplished what it set out to.
 * @property {'merged'|'updated_and_merged'|'already_merged'|'merge_unconfirmed'|'conflict_resolution'|'refused'} action
 * What the click actually DID — never just "succeeded": a dispatched conflict
 * resolution is a legitimate outcome that merged nothing, and
 * `merge_unconfirmed` is a merge COMMAND that succeeded without the PR being
 * observed merged (a merge queue accepted it, or the re-read failed).
 * @property {string|null} reason - Machine-readable cause for a refusal (or a
 * cleanup failure) — null on a clean success.
 * @property {string|null} [cleanup_step] - Which cleanup step stopped, if one did.
 * @property {BaseSyncOutcome|null} [base_sync] - What the cleanup's base sync
 * did to the local checkout, when a cleanup ran.
 * @property {string|null} [attempt_id] - The resolution attempt, when dispatched.
 * @property {string|null} [head_sha] - The sha the decision was taken on.
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
 *     listChildren?: (bead_id: string) => Promise<{ id: string, status: string }[]>,
 *     ship?: (capability: string) => Promise<{ status: string, issue_id: string|null }>,
 *     removeLabel?: (bead_id: string, label: string) => Promise<void>
 *   },
 *   external?: {
 *     get: (workspace: string, bead_id: string) => import('./external-pr.js').ExternalPrRow|null
 *   },
 *   worktree: {
 *     remove: (input: { repo: string, bead_id: string }) => Promise<unknown>,
 *     exists?: (repo: string, bead_id: string) => boolean,
 *     withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 *   },
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   scheduler: { resolveConflict: (workspace: string, bead_id: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>, dispatchExternalConflict: (workspace: string, bead_id: string, target_base?: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>, tick: (workspace: string) => Promise<void> },
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   resolveVerify?: () => ResolvedVerifyCmd|null,
 *   runVerify?: (input: any) => Promise<{ ok: boolean, reason: string, exit: number|null }>,
 *   resolveDeploy?: () => ResolvedDeployCmd|null,
 *   spawnImpl?: typeof spawn,
 *   notifyChanged?: (workspace: string) => void,
 *   notify?: { mergeCompleted: (input: { bead_id: string, pr_url?: string|null, repo?: string|null }) => Promise<void> },
 *   requeryDelayMs?: number,
 *   sleep?: (ms: number) => Promise<void>,
 *   now?: () => number
 * }} deps
 */
export function createPrActions(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  const now = deps.now || (() => Date.now());
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));
  const requery_delay_ms =
    typeof deps.requeryDelayMs === 'number'
      ? deps.requeryDelayMs
      : DEFAULT_CLICK_REQUERY_DELAY_MS;
  const notifyChanged = deps.notifyChanged || (() => {});
  const resolveVerify = deps.resolveVerify || (() => null);
  const resolveDeploy = deps.resolveDeploy || (() => null);
  const spawnImpl = deps.spawnImpl || spawn;
  const runVerify =
    deps.runVerify ||
    (() =>
      Promise.resolve({
        ok: false,
        reason: 'verify_cmd_spawn_error',
        exit: null
      }));

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
  // Optional so every existing construction site (and test) keeps working with
  // no notifier at all — a missing one is silence, never a cleanup failure.
  const notify = deps.notify || null;

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
   * @returns {Promise<{ ok: true, external: false }|{ ok: true, external: true, pr_url: string }|{ ok: false, reason: string }>}
   */
  async function laneMembership(q, bead_id) {
    if (inPrWait(q, bead_id)) {
      return { ok: true, external: false };
    }
    if (!external || !external.get(workspace, bead_id)) {
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
    return { ok: true, external: true, pr_url };
  }

  /**
   * The bead's merge target base, from the attempt that produced the PR. A bead
   * whose attempts predate the field falls back to `main`, exactly like resume.
   *
   * An EXTERNAL bead has no attempt that PRODUCED its PR, so the ordering
   * continues into GitHub's own `baseRefName` (UI-7agi §3) — passed in as
   * `hint` from the click-time gate, else read from the observation cache.
   * `main` stays the last resort, but reaching it for a PR that targeted
   * another branch would sync, verify and deploy the WRONG branch, which is why
   * the hint exists at all.
   *
   * An external CONFLICT-RESOLUTION attempt is skipped for exactly that reason
   * (UI-w0hi §1): it records the base the resolution CLICK observed, not the
   * base the PR was opened against, and it is not the record that produced the
   * PR. Letting it win would silently outrank the fresher click-time hint the
   * moment the PR's base moved — the one case the hint exists to cover.
   *
   * @param {Queue} q
   * @param {string} bead_id
   * @param {string|null} [hint] - `base_ref` as the click-time gate observed it.
   * @returns {string}
   */
  function targetBaseFor(q, bead_id, hint = null) {
    const attempts = q && q.attempts ? Object.values(q.attempts) : [];
    /** @type {{ base: string, at: number }|null} */
    let best = null;
    for (const a of attempts) {
      if (!a || a.bead_id !== bead_id || typeof a.target_base !== 'string') {
        continue;
      }
      if (a.external_conflict === true) {
        continue;
      }
      const at = typeof a.finished_at === 'number' ? a.finished_at : 0;
      if (!best || at >= best.at) {
        best = { base: a.target_base, at };
      }
    }
    if (best && best.base.length > 0) {
      return best.base;
    }
    if (typeof hint === 'string' && hint.length > 0) {
      return hint;
    }
    const observed = deps.observations.get(workspace, bead_id);
    const base_ref = observed && observed.pr ? observed.pr.base_ref : '';
    return typeof base_ref === 'string' && base_ref.length > 0
      ? base_ref
      : 'main';
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
   * ONE authoritative observation at click time: read the PR, resolve a lazy
   * `UNKNOWN` mergeability, read its checks, and write the result into the
   * observation cache so the badge the user sees next matches the decision that
   * was just taken on it.
   *
   * @param {string} bead_id
   * @param {number} number
   * @returns {Promise<{ pr: PrDetail }|{ error: string }>}
   */
  async function observeNow(bead_id, number) {
    /** @type {any} */
    let detail;
    try {
      detail = await deps.gh.prDetail(repo, number);
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
        const again = await deps.gh.prDetail(repo, number);
        if (again.state === 'ok') {
          detail = again;
        }
      } catch {
        // Keep the first reading; the gate below fails closed on UNKNOWN.
      }
    }
    if (detail.state !== 'ok') {
      const error = detail.state === 'error' ? detail.reason : 'gh_empty';
      deps.observations.record(workspace, bead_id, { error });
      return { error };
    }
    const pr = /** @type {PrDetail} */ (detail.data);
    if (pr.state !== 'OPEN') {
      // A terminal PR is classified by its state alone — no checks query is
      // spent on it, exactly as the poller does.
      deps.observations.record(workspace, bead_id, { error: null, pr });
      return { pr };
    }

    /** @type {any} */
    let checks;
    try {
      checks = await deps.gh.prChecks(repo, number);
    } catch {
      checks = { state: 'error', reason: 'gh_spawn_failed' };
    }
    const ci =
      checks.state === 'ok'
        ? {
            state: /** @type {const} */ ('ok'),
            head_sha: pr.head_sha,
            checks: checks.data,
            conclusion: rollupConclusion(checks.data),
            reason: null
          }
        : checks.state === 'empty'
          ? {
              state: /** @type {const} */ ('empty'),
              head_sha: pr.head_sha,
              checks: [],
              conclusion: null,
              reason: null
            }
          : {
              state: /** @type {const} */ ('error'),
              head_sha: pr.head_sha,
              checks: [],
              conclusion: null,
              reason: checks.reason
            };
    deps.observations.record(workspace, bead_id, { error: null, pr, ci });
    return { pr };
  }

  /**
   * Re-observe and re-evaluate the merge gate FOR THE CURRENT HEAD SHA, running
   * the local verification when that is the deciding tier and no result is
   * bound to this exact commit.
   *
   * This is the step that makes a stale green worthless: the gate compares the
   * verify/CI binding against the sha just read, so a head that advanced (a
   * branch update, a conflict resolution's push) or a cache the restart emptied
   * both land on `verify_missing` / `verify_sha_stale` and re-run rather than
   * pass.
   *
   * @param {string} bead_id
   * @param {number} number
   * @returns {Promise<{ pr: PrDetail, verdict: import('./merge-gate.js').MergeGateVerdict }|{ error: string }>}
   */
  async function gateNow(bead_id, number) {
    const observed = await observeNow(bead_id, number);
    if ('error' in observed) {
      return observed;
    }
    const pr = observed.pr;
    const resolved = resolveVerify();
    let entry = deps.observations.get(workspace, bead_id);
    let verdict = evaluateMergeGate(entry, {
      verify_cmd_present: !!resolved
    });
    if (
      resolved &&
      !verdict.enabled &&
      verdict.tier === 'local_verify' &&
      (verdict.reason === 'verify_missing' ||
        verdict.reason === 'verify_sha_stale')
    ) {
      /** @type {{ ok: boolean, reason: string }} */
      let r;
      try {
        r = await runVerify({
          repo,
          bead_id,
          sha: pr.head_sha,
          pr_number: number,
          cmd: resolved.cmd,
          timeout_ms: resolved.timeout_ms
        });
      } catch (err) {
        log('click-time verification threw for %s: %o', bead_id, err);
        r = { ok: false, reason: 'verify_cmd_spawn_error' };
      }
      deps.observations.recordVerify(workspace, bead_id, {
        head_sha: pr.head_sha,
        ok: !!r.ok,
        reason: r.reason,
        at: now()
      });
      entry = deps.observations.get(workspace, bead_id);
      verdict = evaluateMergeGate(entry, { verify_cmd_present: true });
    }
    return { pr, verdict };
  }

  // -------------------------------------------------------------------------
  // Post-merge cleanup — ONE implementation, two triggers (§6).
  // -------------------------------------------------------------------------

  /**
   * Step 1 — base 동기화, with an EXPLICIT outcome (§6).
   *
   * Fetches the base from `origin` — which is what every later step reads — and
   * fast-forwards the LOCAL base branch only when doing so cannot touch user
   * work: the checkout must already be on that branch and be clean. A dirty or
   * differently-checked-out repo is left completely alone.
   *
   * WHY FETCH-ONLY IS SUFFICIENT, not a degraded outcome: nothing downstream
   * reads the local checkout. The post-merge verification (step 2) runs in its
   * own DETACHED worktree pinned to the sha this function returns — the fetched
   * `origin/<base>` — so its verdict is identical whether or not the local
   * branch was moved. The fast-forward is a convenience for the human who will
   * next sit in that checkout, and preserving their unrelated work outranks it.
   * That is also why a dirty/other-branch checkout is NOT a cleanup failure:
   * making it one would block cleanup during the repo's normal working state
   * while buying no verification strength.
   *
   * The two outcomes are still reported apart rather than both as a bare
   * success — "I moved your base branch" and "I left your checkout untouched"
   * are different facts about the user's repo, and the cleanup record/log names
   * which one happened.
   *
   * A checkout that IS on a clean base branch but cannot fast-forward is
   * divergence: a genuine failure (`base_ff_diverged`), never something to force.
   *
   * @param {string} target_base
   * @returns {Promise<{ ok: true, sha: string, outcome: BaseSyncOutcome }|{ ok: false, reason: string }>}
   */
  async function syncBase(target_base) {
    // Every command below writes or reads this repo's ref database, so the whole
    // sequence is serialized under the topology lock (§8). No worktree-manager
    // call happens inside — those take the same lock (see `withTopologyLock`).
    return deps.worktree.withTopologyLock(repo, async () => {
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
      const sha = rev.stdout.trim();
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
      const status = await deps.gitRun(['status', '--porcelain'], {
        cwd: repo
      });
      if (status.code !== 0 || status.stdout.trim().length > 0) {
        return {
          ok: /** @type {const} */ (true),
          sha,
          outcome: /** @type {BaseSyncOutcome} */ ('fetch_only:dirty')
        };
      }
      const ff = await deps.gitRun(
        ['merge', '--ff-only', `origin/${target_base}`],
        { cwd: repo }
      );
      if (ff.code !== 0) {
        return { ok: /** @type {const} */ (false), reason: 'base_ff_diverged' };
      }
      return {
        ok: /** @type {const} */ (true),
        sha,
        outcome: /** @type {BaseSyncOutcome} */ ('fast_forwarded')
      };
    });
  }

  /**
   * Step 2 — the repo's own post-merge verification, run against the MERGED base
   * commit in a detached worktree. A repo that requires none (no configured or
   * detectable `verify_cmd`) has nothing to run, which is a pass, not a skip
   * that hides a failure.
   *
   * @param {string} bead_id
   * @param {string} base_sha
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string, detail?: string, output_tail?: string, log_path?: string }>}
   */
  async function postMergeVerify(bead_id, base_sha) {
    const resolved = resolveVerify();
    if (!resolved) {
      return { ok: true };
    }
    /** @type {{ ok: boolean, reason: string, detail?: string, output_tail?: string, log_path?: string }} */
    let r;
    try {
      r = await runVerify({
        repo,
        bead_id: `${bead_id}-postmerge`,
        sha: base_sha,
        pr_number: null,
        cmd: resolved.cmd,
        timeout_ms: resolved.timeout_ms
      });
    } catch (err) {
      log('post-merge verification threw for %s: %o', bead_id, err);
      return { ok: false, reason: 'verify_cmd_spawn_error' };
    }
    return r.ok
      ? { ok: true }
      : {
          ok: false,
          reason: r.reason,
          detail: r.detail,
          output_tail: r.output_tail,
          log_path: r.log_path
        };
  }

  /**
   * The deploy step's LAST-MOMENT check on the local checkout
   * (worker-deploy-hook §2).
   *
   * Unlike the verification — which runs in its own detached worktree pinned to
   * an exact sha — the deploy runs a command against the LOCAL base checkout,
   * so what that checkout contains IS what gets deployed. Step 1's outcome is
   * not enough evidence: `fetch_only:*` means the checkout was never moved, a
   * local branch AHEAD of origin still fast-forwards cleanly, and minutes of
   * verification sit between step 1 and here during which a human can check out
   * anything at all.
   *
   * So all three facts are re-read immediately before the spawn: on the target
   * base, clean, and HEAD exactly at the base commit that was verified. Any
   * mismatch means the thing about to be deployed is not the thing that passed
   * — the one outcome worse than not deploying.
   *
   * Read-only (`rev-parse` / `status`), so it deliberately does NOT take the
   * topology lock: it mutates no ref, and holding the lock across the deploy
   * spawn would block every other repo operation for the deploy's duration.
   *
   * @param {string} target_base
   * @param {string} base_sha
   * @returns {Promise<{ ok: true }|{ ok: false, reason: string }>}
   */
  async function revalidateBaseCheckout(target_base, base_sha) {
    const branch = await deps.gitRun(['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: repo
    });
    if (branch.code !== 0 || branch.stdout.trim() !== target_base) {
      return { ok: false, reason: 'checkout_not_on_base' };
    }
    const status = await deps.gitRun(['status', '--porcelain'], { cwd: repo });
    if (status.code !== 0 || status.stdout.trim().length > 0) {
      return { ok: false, reason: 'checkout_dirty' };
    }
    const head = await deps.gitRun(['rev-parse', 'HEAD'], { cwd: repo });
    if (head.code !== 0 || head.stdout.trim() !== base_sha) {
      return { ok: false, reason: 'head_not_base_sha' };
    }
    return { ok: true };
  }

  /**
   * Map a {@link runVerifyCmd} outcome onto the deploy failure vocabulary. The
   * RUNNER is shared (same shell-less argv spawn, same deadline handling); only
   * the names differ, and they must differ — a `deploy_timeout` in the record
   * has to be distinguishable from a verification that timed out.
   *
   * @param {string} reason
   * @returns {string}
   */
  function deployReasonFor(reason) {
    if (reason === 'verify_cmd_failed') {
      return 'deploy_failed';
    }
    if (reason === 'verify_cmd_timeout') {
      return 'deploy_timeout';
    }
    return 'deploy_spawn_error';
  }

  /**
   * @param {'deployed'|'launched'|'failed'} outcome
   * @param {string|null} reason
   * @param {string} bead_id
   * @param {string} base_sha
   * @param {{ detail?: string, log_path?: string }} [extra] - The run's own
   * diagnostics (UI-l53x §2/§4). The store drops any key that is not a non-empty
   * string, so an absent diagnostic stays an ABSENT key rather than a null.
   * @returns {{ outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string }}
   */
  function deployRecord(outcome, reason, bead_id, base_sha, extra) {
    return { outcome, reason, bead_id, base_sha, ...extra };
  }

  /**
   * Step 3 — the repo's post-merge DEPLOYMENT (worker-deploy-hook §2).
   *
   * Three ways this returns without spawning anything:
   *
   *   - no `[worker.deploy]` section → nothing to run, which is a pass with the
   *     same meaning verify's "no command" has,
   *   - no RESOLVABLE verify command → `deploy_verify_missing`. "No verify = a
   *     pass" is a MERGE-GATE semantics; a deployment is not allowed to inherit
   *     it, or a deploy-only repo would ship code nothing ever checked,
   *   - the local checkout is not the verified base → `deploy_base_not_synced`.
   *
   * `detached` does not spawn here either: it returns the resolved command as
   * `pending` for {@link runCleanup} to launch after the whole cleanup is
   * durably recorded. A `bdui-shared restart` deploy kills this process, and
   * the remaining cleanup steps must not die with it.
   *
   * Every failure here preserves what it can (UI-l53x §2): the full command
   * output goes to the workspace's own `deploy-logs/` directory, the tail and the
   * log path ride the returned record into `cleanup_failed` + `last_deploy`, and
   * the two refusals that return BEFORE the command runs now write a `failed`
   * `last_deploy` of their own — `failed` already means "it ran and did not
   * succeed, OR never started", and leaving a stale success record in place made
   * `last_deploy` answer "is the running service the merged code?" with a yes it
   * had no basis for. Only "this repo has no deployment" still writes nothing:
   * having nothing to say is not the same as a refusal.
   *
   * @param {string} bead_id
   * @param {string} base_sha
   * @param {string} target_base
   * @returns {Promise<{ ok: true, pending: ResolvedDeployCmd|null }|{ ok: false, reason: string, detail?: string, output_tail?: string, log_path?: string }>}
   */
  async function runDeploy(bead_id, base_sha, target_base) {
    const deploy = resolveDeploy();
    if (!deploy) {
      return { ok: true, pending: null };
    }
    if (!resolveVerify()) {
      deps.store.recordLastDeploy(
        workspace,
        deployRecord('failed', 'deploy_verify_missing', bead_id, base_sha)
      );
      return { ok: false, reason: 'deploy_verify_missing' };
    }
    const revalidated = await revalidateBaseCheckout(target_base, base_sha);
    if (!revalidated.ok) {
      log(
        'deploy refused for %s: local checkout %s (base %s)',
        bead_id,
        revalidated.reason,
        base_sha
      );
      // The concrete guard — `checkout_not_on_base` / `checkout_dirty` /
      // `head_not_base_sha` — used to live only in the debug log, which left the
      // record saying "not synced" without saying HOW.
      const detail = revalidated.reason;
      deps.store.recordLastDeploy(
        workspace,
        deployRecord('failed', 'deploy_base_not_synced', bead_id, base_sha, {
          detail
        })
      );
      return { ok: false, reason: 'deploy_base_not_synced', detail };
    }
    if (deploy.detached) {
      return { ok: true, pending: deploy };
    }

    /**
     * @type {{
     *   ok: boolean,
     *   reason: string,
     *   detail?: string,
     *   output_tail?: string,
     *   log_path?: string
     * }}
     */
    let r;
    try {
      r = await runVerifyCmd({
        cwd: repo,
        cmd: deploy.cmd,
        timeout_ms: deploy.timeout_ms,
        spawn_impl: spawnImpl,
        // Keyed on `repo`, the same key `runVerifyAtSha` uses — `deps.repo` may
        // differ from `deps.workspace` (attach.js resolves `options.repo ||
        // workspace_root`), and the logs belong to the repo the command ran in.
        log_context: {
          kind: 'deploy',
          workspace_root: repo,
          bead_id,
          sha: base_sha,
          started_at_ms: Date.now()
        }
      });
    } catch (err) {
      // Near-unreachable: `runVerifyCmd` resolves its own spawn failures rather
      // than throwing, so this only catches a throw from outside its try.
      log('deploy threw for %s: %o', bead_id, err);
      r = {
        ok: false,
        reason: 'verify_cmd_spawn_error',
        detail: errorDetail(err)
      };
    }
    if (r.ok) {
      deps.store.recordLastDeploy(
        workspace,
        // A successful deploy's log is the comparison baseline for the next
        // failure — the same reason verify keeps its passing runs.
        deployRecord('deployed', null, bead_id, base_sha, {
          log_path: r.log_path
        })
      );
      return { ok: true, pending: null };
    }
    const reason = deployReasonFor(r.reason);
    deps.store.recordLastDeploy(
      workspace,
      deployRecord('failed', reason, bead_id, base_sha, {
        detail: r.detail,
        log_path: r.log_path
      })
    );
    return {
      ok: false,
      reason,
      detail: r.detail,
      output_tail: r.output_tail,
      log_path: r.log_path
    };
  }

  /**
   * Fire a detached deploy and stop caring about its RESULT — no wait, `unref`
   * so it cannot hold the event loop open. The result is UNKNOWABLE by design:
   * the canonical case restarts this very server, so there is no survivor to
   * observe the exit code. `launched` is therefore recorded as an INTENT before
   * this runs, and the only thing that can still be learned here is that the
   * spawn itself never happened.
   *
   * One listener IS attached: `error`. Node reports a pre-exec failure (ENOENT
   * and friends) as an asynchronous `error` event, not a throw — unhandled it
   * would crash this server while the record still says `launched`. That event
   * is exactly the "spawn never happened" case, so it feeds the same
   * `on_spawn_error` repair as a synchronous throw.
   *
   * OUTPUT is not preserved here and cannot be (UI-l53x §3): `stdio` is ignored
   * because there is no survivor to read it. The one observable failure — the
   * spawn itself — does carry its error text out, as the return value for a
   * synchronous throw and as the callback's argument for the asynchronous event.
   *
   * @param {ResolvedDeployCmd} deploy
   * @param {(detail?: string) => void} on_spawn_error - Overwrites the `launched`
   * record; may fire asynchronously, but only ever for a process that never
   * started.
   * @returns {{ ok: boolean, detail?: string }} Whether the spawn call itself
   * succeeded, with the thrown error's text when it did not.
   */
  function launchDetachedDeploy(deploy, on_spawn_error) {
    try {
      const child = spawnImpl(deploy.cmd[0], deploy.cmd.slice(1), {
        cwd: repo,
        shell: false,
        stdio: 'ignore',
        detached: true,
        windowsHide: true
      });
      if (child && typeof child.once === 'function') {
        child.once('error', (/** @type {unknown} */ err) => {
          log('detached deploy spawn failed: %o', err);
          on_spawn_error(errorDetail(err));
        });
      }
      if (child && typeof child.unref === 'function') {
        child.unref();
      }
      return { ok: true };
    } catch (err) {
      log('detached deploy spawn failed: %o', err);
      return { ok: false, detail: errorDetail(err) };
    }
  }

  /**
   * Step 4 — the linked Beads sweep, LEAVES FIRST. Children are walked depth
   * first and closed from the deepest up, each with a confirming readback,
   * before the parent is touched at all (step 6). An unreadable child list is a
   * STOP, never an empty sweep: "this bead has no children" and "bd would not
   * tell us" must not produce the same act.
   *
   * `closed_ids` is the walk's whole `seen` set — the parent plus every
   * descendant it reached — and by the time it is returned every one of them is
   * `closed` (already closed on arrival, or closed here). Step 7 enumerates
   * exactly that set, which is deliberately WIDER than "what this sweep closed":
   * a `[정리]` retry finds parent and children already closed, so a narrow list
   * would be empty and would drop the descendants' `export:` labels forever.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, closed_ids: string[] }|{ ok: false, reason: string }>}
   */
  async function sweepChildren(bead_id) {
    if (typeof deps.bd.listChildren !== 'function') {
      return { ok: false, reason: 'child_sweep_unavailable' };
    }
    /** @type {string[]} */
    const leaves_first = [];
    /** @type {Set<string>} */
    const seen = new Set([bead_id]);

    /**
     * @param {string} id
     * @returns {Promise<{ ok: true }|{ ok: false, reason: string }>}
     */
    const walk = async (id) => {
      /** @type {{ id: string, status: string }[]} */
      let children;
      try {
        children = await /** @type {any} */ (deps.bd.listChildren)(id);
      } catch (err) {
        log('child listing failed for %s: %o', id, err);
        return { ok: false, reason: `child_list_failed:${id}` };
      }
      for (const child of children) {
        if (!child || typeof child.id !== 'string' || seen.has(child.id)) {
          continue;
        }
        seen.add(child.id);
        const deeper = await walk(child.id);
        if (!deeper.ok) {
          return deeper;
        }
        if (child.status !== 'closed') {
          leaves_first.push(child.id);
        }
      }
      return { ok: true };
    };

    const walked = await walk(bead_id);
    if (!walked.ok) {
      return walked;
    }
    for (const id of leaves_first) {
      const closed = await closeBead(id);
      if (!closed.ok) {
        return { ok: false, reason: `child_close_failed:${id}` };
      }
    }
    return { ok: true, closed_ids: [...seen] };
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
    try {
      await deps.worktree.remove({ repo, bead_id });
    } catch (err) {
      log('worktree remove threw for %s: %o', bead_id, err);
    }
    if (
      typeof deps.worktree.exists === 'function' &&
      deps.worktree.exists(repo, bead_id)
    ) {
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
   * Announce the merge that CLOSED the bead (UI-9rrk). One hook covers both
   * triggers because both converge on `runCleanup`. The notifier is optional
   * and no-throw by its own contract, so this can never turn a finished cleanup
   * into a failed one — the guard below keeps that true for an injected fake
   * that breaks the contract.
   *
   * AWAITED by the caller (UI-vb0t §3.4): reading the bead title made the send
   * asynchronous, and the deploy launched right after may restart this process.
   * What is awaited is the child's SPAWN, not its exit — it is detached and
   * unref'd, so it outlives the restart once it exists.
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
   * Run the whole cleanup in contract order. The SINGLE implementation both the
   * [머지] button and the poller's externally-observed MERGED go through — a
   * second copy for the external case is exactly the divergence §6 forbids.
   *
   * @param {string} bead_id
   * @param {{ base_ref?: string|null, head_ref?: string|null, pr_url?: string|null }} [refs]
   * - What the click-time gate observed on GitHub (UI-7agi §3). Load-bearing
   * for an external PR, which has no attempt to read a target base from.
   * @returns {Promise<{ ok: boolean, step: string|null, reason: string|null, base_sync: BaseSyncOutcome|null }>}
   */
  async function runCleanup(bead_id, refs = {}) {
    const q = deps.store.snapshot(workspace);
    const target_base = targetBaseFor(q, bead_id, refs.base_ref || null);
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
    const durable = inPrWait(q, bead_id);

    markStep(bead_id, 'base_sync');
    const synced = await syncBase(target_base);
    if (!synced.ok) {
      return failCleanup(bead_id, 'base_sync', synced.reason, null);
    }
    const base_sync = synced.outcome;
    log(
      'cleanup base sync for %s: %s (base %s)',
      bead_id,
      base_sync,
      synced.sha
    );
    markStep(bead_id, 'post_merge_verify');
    const verified = await postMergeVerify(bead_id, synced.sha);
    if (!verified.ok) {
      return failCleanup(
        bead_id,
        'post_merge_verify',
        verified.reason,
        base_sync,
        undefined,
        verified.detail,
        verified.output_tail,
        verified.log_path
      );
    }
    markStep(bead_id, 'deploy');
    const deployed = await runDeploy(bead_id, synced.sha, target_base);
    if (!deployed.ok) {
      return failCleanup(
        bead_id,
        'deploy',
        deployed.reason,
        base_sync,
        undefined,
        deployed.detail,
        deployed.output_tail,
        deployed.log_path
      );
    }
    const pending_deploy = deployed.pending;
    markStep(bead_id, 'child_sweep');
    const swept = await sweepChildren(bead_id);
    if (!swept.ok) {
      return failCleanup(bead_id, 'child_sweep', swept.reason, base_sync);
    }
    markStep(bead_id, 'branch_cleanup');
    const branches = await cleanupBranches(bead_id, refs.head_ref || null);
    if (!branches.ok) {
      return failCleanup(bead_id, 'branch_cleanup', branches.reason, base_sync);
    }
    // The parent close is the last step that may need bd RESTORING —
    // everything before it left the bead `resolved` untouched (§6), and the
    // one step after it deliberately does not roll the close back.
    markStep(bead_id, 'parent_close');
    const closed = await closeBead(bead_id);
    if (!closed.ok) {
      return failCleanup(
        bead_id,
        'parent_close',
        'bd_close_failed',
        base_sync,
        // A write that landed but could not be confirmed may have left bd
        // `closed`; a write that never landed did not.
        closed.wrote
      );
    }

    // Step 7 — publish the capabilities the now-closed beads exported. It runs
    // AFTER the close because `bd ship` refuses an open issue, and a `--force`
    // ship before the close could leave `provides:` on a bead whose close then
    // failed: a capability that claims delivery it never made.
    markStep(bead_id, 'ship_exported_capabilities');
    const shipped = await shipExportedCapabilities({
      bd: deps.bd,
      bead_ids: swept.closed_ids
    });
    if (!shipped.ok) {
      return failShip(bead_id, shipped, base_sync, pr_url);
    }
    if (shipped.removed.length > 0) {
      // The `export:` labels stripped off canceling-disposition descendants —
      // a mutation nothing else records, so it belongs in the run log.
      log(
        'cleanup for %s removed export labels: %s',
        bead_id,
        shipped.removed.join(',')
      );
    }
    // A successful ship — including the one inside a `[정리]` retry — is what
    // retires the workspace record the external path leaves behind.
    deps.store.clearShipFailure(workspace);

    if (!pending_deploy) {
      if (durable) {
        deps.store.moveToDone(workspace, { bead_id });
      }
      notifyChanged(workspace);
      await announceMerged(bead_id, pr_url);
      return { ok: true, step: null, reason: null, base_sync };
    }

    // THE TERMINAL LAUNCH (worker-deploy-hook §2). Everything durable is
    // written FIRST, in one mutation, because the next line may kill this
    // process: a `launched` record that only exists in memory when the server
    // restarts itself is a record that never existed.
    const launch_record = deployRecord('launched', null, bead_id, synced.sha);
    if (durable) {
      deps.store.moveToDoneWithDeploy(workspace, {
        bead_id,
        deploy: launch_record
      });
    } else {
      deps.store.recordLastDeploy(workspace, launch_record);
    }
    notifyChanged(workspace);
    // Announced BEFORE the launch, for the same reason the durable write is:
    // the detached deploy may restart this process, and a notification that
    // never got sent is a merge nobody heard about. AWAITED, so "before" means
    // the child exists, not merely that the call was made (UI-vb0t §3.4).
    await announceMerged(bead_id, pr_url);
    // A spawn that never started — a synchronous throw or Node's asynchronous
    // `error` event — means we are still alive, so the intent was wrong and can
    // be corrected. The cleanup itself still succeeded — the bead really is
    // done and its branches really are gone — so this surfaces as a failed
    // DEPLOY record rather than a cleanup stop that would ask a human to redo
    // finished work.
    const record_spawn_failure = (/** @type {string|undefined} */ detail) => {
      deps.store.recordLastDeploy(
        workspace,
        deployRecord('failed', 'deploy_spawn_error', bead_id, synced.sha, {
          detail
        })
      );
      notifyChanged(workspace);
    };
    const launched = launchDetachedDeploy(pending_deploy, record_spawn_failure);
    if (!launched.ok) {
      record_spawn_failure(launched.detail);
    }
    return { ok: true, step: null, reason: null, base_sync };
  }

  /**
   * Record a cleanup stop durably and hand the bead back to a human: it stays
   * in `pr_wait`, bd is left `resolved`, the banner renders off the record, and
   * NOTHING retries on its own.
   *
   * When the stop happened AT the parent close, the bead is FIRST put back to
   * `resolved` (with a readback) — otherwise "bd stays `resolved`" would
   * be a claim the record makes and the database contradicts. A restore that
   * itself fails is written into the record as `restore_failed` rather than
   * left silent: a human needs to know the status is wrong, not merely that a
   * cleanup stopped.
   *
   * THE ONE EXCEPTION (UI-4ii4): a `ship_exported_capabilities` failure calls
   * this WITHOUT `restore_bd`, so bd stays `closed` while the cleanup is
   * recorded as stopped. That is deliberate. The ship step runs after the
   * children were already closed, so rolling only the parent back to `resolved`
   * would manufacture a half state — a `resolved` parent over `closed` children
   * — which is worse than an honest "everything closed, one capability still
   * unpublished". The retry is idempotent (`bd ship` returns
   * `already_shipped`), so the recorded stop is fully recoverable by a re-click.
   *
   * @param {string} bead_id
   * @param {string} step
   * @param {string} reason
   * @param {BaseSyncOutcome|null} base_sync
   * @param {boolean} [restore_bd] - Whether the parent close may have landed.
   * @param {string} [detail] - The step's own diagnostic text, when it has one
   * (UI-2o4z §3); the reason alone cannot always identify the failure.
   * @param {string} [output_tail] - The failing command's own output tail, when
   * the step ran one (UI-qult §1) — `post_merge_verify` and, since UI-l53x §2,
   * the synchronous `deploy`.
   * @param {string} [log_path] - Absolute path to that command's FULL preserved
   * output (UI-0x54), when the run produced a complete log file. A cleanup
   * retry overwrites it with its own run's log.
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
    log_path
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
    if (inPrWait(deps.store.snapshot(workspace), bead_id)) {
      deps.store.recordCleanupFailure(workspace, {
        bead_id,
        step,
        reason,
        bd_restore,
        detail,
        output_tail,
        log_path
      });
    }
    notifyChanged(workspace);
    return { ok: false, step, reason, base_sync };
  }

  /**
   * Record a `ship_exported_capabilities` stop (UI-4ii4).
   *
   * Two records, for two different readers, because this step is the first one
   * that can fail after the parent is `closed`:
   *
   *   - The lane-member `cleanup_failed` record + banner + `[정리]` retry, via
   *     {@link failCleanup} — with NO `restore_bd`, so the close stands.
   *   - A WORKSPACE-level ship-failure record, for the external PR row. That row
   *     lives only while its bead is `resolved` + `pr_url` (UI-7agi), so the
   *     close that just landed makes it vanish from the next scan, and
   *     `failCleanup`'s `inPrWait` guard writes nothing for it. Without this
   *     record the external path would be exactly the silent hole this whole
   *     step exists to close: merged, closed, capability unpublished, nothing on
   *     screen. It carries no retry button — the row is gone — so its banner
   *     names the manual `bd ship` instead.
   *
   * The membership is re-read HERE, at the moment of failure, rather than taken
   * from the snapshot the cleanup opened with. `failCleanup` makes its own
   * failure-time check, so a bead that left the lane mid-cleanup (a [폐기] while
   * a long post-merge suite ran) would fall between a start-time `durable=true`
   * and a failure-time `inPrWait=false` and get NO record at all. One reading,
   * used by both halves, is what guarantees exactly one of them writes.
   *
   * @param {string} bead_id
   * @param {{ reason: string, detail?: string }} failure
   * @param {BaseSyncOutcome|null} base_sync
   * @param {string|null} pr_url
   */
  async function failShip(bead_id, failure, base_sync, pr_url) {
    const durable = inPrWait(deps.store.snapshot(workspace), bead_id);
    if (!durable) {
      deps.store.recordShipFailure(workspace, {
        bead_id,
        reason: failure.reason,
        detail: failure.detail || null,
        pr_url
      });
    }
    return failCleanup(
      bead_id,
      'ship_exported_capabilities',
      failure.reason,
      base_sync,
      // The close is NOT rolled back — see failCleanup's exception note.
      undefined,
      failure.detail
    );
  }

  // -------------------------------------------------------------------------
  // Actions.
  // -------------------------------------------------------------------------

  /**
   * The authoritative [머지] click (§6).
   *
   * @param {string} bead_id
   * @returns {Promise<MergeClickResult>}
   */
  async function merge(bead_id) {
    if (in_flight.has(bead_id)) {
      return refuse('action_in_flight');
    }
    in_flight.add(bead_id);
    // Step 1 of 7 (UI-raqh §4): the re-gate + the merge itself, including the
    // BEHIND arm's update-branch and its re-observation.
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

      const first = await gateNow(bead_id, ref.number);
      if ('error' in first) {
        return refuse(first.error);
      }
      const refs = {
        base_ref: first.pr.base_ref || null,
        head_ref: first.pr.head_ref || null,
        // The url the click itself resolved (UI-9rrk). For an external row the
        // registry may be one scan stale, so the notification must name the PR
        // this click actually merged, not the previous one.
        pr_url: ref.url || null
      };
      // A merge that already happened (here or on github.com) runs the same
      // cleanup rather than a second merge. For an EXTERNAL row this is the
      // whole of the [정리] button: the poller deliberately never auto-cleans
      // one, so the click is the only trigger (UI-7agi §1).
      if (first.pr.state === 'MERGED') {
        const c = await runCleanup(bead_id, refs);
        return {
          ok: c.ok,
          action: 'already_merged',
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
      // its CI says, and resolving is not merging.
      if (isConflicting(first.pr)) {
        // An EXTERNAL row has no attempt to relaunch from, so it takes the
        // attempt-less dispatch instead (UI-w0hi §2). The base is the one THIS
        // click observed, not a stored one: an external row has no attempt
        // recording a `target_base`, and the prompt names the branch the
        // session must merge.
        if (is_external) {
          return dispatchExternalResolution(
            bead_id,
            first.pr.head_sha,
            first.pr.base_ref || ''
          );
        }
        return dispatchResolution(bead_id, first.pr.head_sha);
      }
      if (!first.verdict.enabled) {
        return refuse(first.verdict.reason || 'gate_blocked');
      }

      if (first.pr.merge_state_status !== 'BEHIND') {
        // AWAITED: `in_flight` and the progress record must both outlive the
        // cleanup, which is exactly what the guard promises — returning the
        // promise unawaited would run this `finally` before the merge even
        // issued.
        return await doMerge(
          bead_id,
          ref.number,
          first.pr.head_sha,
          'merged',
          refs
        );
      }

      // BEHIND — merge the base into the branch ON GITHUB, then re-confirm.
      /** @type {any} */
      let updated;
      try {
        updated = await deps.gh.updateBranch(repo, ref.number);
      } catch {
        updated = { state: 'error', reason: 'gh_spawn_failed' };
      }
      if (updated.state !== 'ok') {
        return refuse(`update_branch_failed:${updated.reason || 'gh_failed'}`);
      }
      // The update produced a NEW head commit, so the whole gate is re-derived
      // against it — CI/local verification included.
      const second = await gateNow(bead_id, ref.number);
      if ('error' in second) {
        return refuse(second.error);
      }
      if (second.pr.state !== 'OPEN') {
        return refuse(
          second.pr.state === 'MERGED'
            ? 'pr_already_merged'
            : 'pr_closed_unmerged'
        );
      }
      if (isConflicting(second.pr)) {
        if (is_external) {
          return dispatchExternalResolution(
            bead_id,
            second.pr.head_sha,
            second.pr.base_ref || ''
          );
        }
        return dispatchResolution(bead_id, second.pr.head_sha);
      }
      if (!second.verdict.enabled) {
        return refuse(second.verdict.reason || 'gate_blocked');
      }
      if (second.pr.merge_state_status === 'BEHIND') {
        return refuse('still_behind');
      }
      return await doMerge(
        bead_id,
        ref.number,
        second.pr.head_sha,
        'updated_and_merged',
        {
          base_ref: second.pr.base_ref || null,
          head_ref: second.pr.head_ref || null,
          pr_url: ref.url || null
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
   * @param {{ base_ref?: string|null, head_ref?: string|null, pr_url?: string|null }} [refs]
   * - The gate-time base/head branch names and the click-resolved PR url,
   * forwarded to the cleanup (UI-7agi §3, UI-9rrk).
   * @returns {Promise<MergeClickResult>}
   */
  async function doMerge(bead_id, number, head_sha, action, refs = {}) {
    /** @type {any} */
    let merged;
    try {
      // Pinned to the head the gate approved — GitHub refuses the merge if the
      // branch moved since, so an unverified commit can never land (§5/§6).
      merged = await deps.gh.mergeSquash(repo, number, head_sha);
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
      after = await deps.gh.prDetail(repo, number);
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

    const c = await runCleanup(bead_id, refs);
    return {
      ok: c.ok,
      action,
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
   * @returns {Promise<MergeClickResult>}
   */
  async function dispatchResolution(bead_id, head_sha) {
    // Resolving is not merging: drop the progress BEFORE the session appears,
    // so the row goes back to its ordinary conflict state rather than showing a
    // merge that is not happening.
    clearStep(bead_id);
    const r = await deps.scheduler.resolveConflict(workspace, bead_id);
    notifyChanged(workspace);
    return {
      ok: !!r.ok,
      action: 'conflict_resolution',
      reason: r.ok ? null : r.reason || 'resolution_refused',
      attempt_id: r.attempt_id || null,
      head_sha
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
   * @returns {Promise<MergeClickResult>}
   */
  async function dispatchExternalResolution(bead_id, head_sha, base_ref) {
    clearStep(bead_id);
    const r = await deps.scheduler.dispatchExternalConflict(
      workspace,
      bead_id,
      base_ref
    );
    notifyChanged(workspace);
    return {
      ok: !!r.ok,
      action: 'conflict_resolution',
      reason: r.ok ? null : r.reason || 'resolution_refused',
      attempt_id: r.attempt_id || null,
      head_sha
    };
  }

  /**
   * The externally-observed MERGED trigger (§4): a human merged on github.com.
   * Runs the IDENTICAL cleanup, with two extra guards the button does not need:
   * it never runs while another action holds the bead, and it never re-runs a
   * cleanup that already failed — "no auto-retry" means the automatic trigger
   * must stay off it until a human acts.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: boolean, step: string|null, reason: string|null, base_sync?: BaseSyncOutcome|null }>}
   */
  async function cleanupObservedMerge(bead_id) {
    if (in_flight.has(bead_id)) {
      return { ok: false, step: null, reason: 'action_in_flight' };
    }
    const q = deps.store.snapshot(workspace);
    if (!inPrWait(q, bead_id)) {
      return { ok: false, step: null, reason: 'not_in_pr_wait' };
    }
    if (q.cleanup_failed && q.cleanup_failed[bead_id]) {
      return { ok: false, step: null, reason: 'merged_cleanup_failed' };
    }
    in_flight.add(bead_id);
    try {
      return await runCleanup(bead_id);
    } finally {
      in_flight.delete(bead_id);
      clearStep(bead_id);
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
   * `state` field decides here, so no checks query is spent and no observation
   * is recorded — the barrier is already open and would suppress the write
   * anyway.
   *
   * @param {number} number
   * @returns {Promise<{ pr_state: string }|{ error: string }>}
   */
  async function readPrState(number) {
    /** @type {any} */
    let detail;
    try {
      detail = await deps.gh.prDetail(repo, number);
    } catch {
      detail = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (detail.state !== 'ok') {
      return { error: detail.state === 'error' ? detail.reason : 'gh_empty' };
    }
    return { pr_state: /** @type {PrDetail} */ (detail.data).state };
  }

  /**
   * Read one `pr_wait` bead's PR state, with no gate, no checks query and no
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
    const observed = await readPrState(ref.number);
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
   * @returns {Promise<{ ok: boolean, reason: string|null }>}
   */
  async function discardTransition(bead_id, number) {
    const observed = await readPrState(number);
    if ('error' in observed) {
      return { ok: false, reason: `pr_state_unknown:${observed.error}` };
    }
    if (observed.pr_state === 'MERGED') {
      return { ok: false, reason: 'pr_already_merged' };
    }
    if (observed.pr_state === 'OPEN') {
      /** @type {any} */
      let closed;
      try {
        closed = await deps.gh.closePr(repo, number);
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
    return { ok: true, reason: null };
  }

  return { merge, discard, cleanupObservedMerge, prState };
}
