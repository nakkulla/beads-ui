/**
 * `gh` CLI adapter — the ONE module that spawns `gh` (worker-phase2 §1/§10).
 *
 * Every method returns a THREE-STATE result so a caller can never confuse
 * "the query ran and found nothing" with "the query could not be completed":
 *
 *   { state: 'ok', data }       — the query ran and returned a result.
 *   { state: 'empty' }          — the query ran successfully, nothing to return.
 *   { state: 'error', reason }  — the query could not be completed.
 *
 * That distinction IS the fail-closed verdict of §1: a semantically empty
 * observation fails the attempt (`pr_missing`), while an observation error must
 * not (it retries and records `gh_observation_failed`). Collapsing the two would
 * misdiagnose a `gh` outage as "the session never opened a PR".
 *
 * The spawn is injected (`deps.run`), so every test drives this adapter with a
 * fake runner — no test ever reaches a real `gh` binary or the network. The
 * WRITE operations (`mergeSquash` / `updateBranch` / `closePr`, worker-phase2
 * §6) live here for the same reason: this module is the only place that spawns
 * `gh`, so mocking it is what keeps "no test ever merges anything" structural
 * rather than a convention.
 *
 * ---------------------------------------------------------------------------
 * WHY THE CHECKS QUERY IS `gh pr view --json statusCheckRollup`, NOT
 * `gh pr checks` (worker-phase2 §5, the CI-vs-no-CI discrimination)
 * ---------------------------------------------------------------------------
 * §5 needs THREE outcomes from the checks observation: "this repo has CI and
 * here is its verdict", "this repo successfully reported NO checks at all"
 * (the tier that falls through to the local `verify_cmd`), and "the query
 * failed" (fail-closed: the gate becomes undecidable, never the no-signal
 * tier). `gh pr checks` cannot express that, measured on gh 2.89.0:
 *
 *   $ gh pr checks 29 --repo nakkulla/beads-ui --json name,state,bucket
 *     exit 1 · stdout "" · stderr "no checks reported on the 'UI-g8gc' branch"
 *   $ gh pr checks 999999 --repo nakkulla/beads-ui --json name,state,bucket
 *     exit 1 · stdout "" · stderr "GraphQL: Could not resolve to a PullRequest…"
 *
 * NO checks and a FAILED query are both exit 1 with empty stdout even under
 * `--json`; the only thing that differs is an English stderr sentence. Keying
 * a fail-closed safety gate off a localizable CLI message is not a
 * discriminator we are willing to trust.
 *
 * `gh pr view --json statusCheckRollup` gives a STRUCTURAL one instead:
 *
 *   $ gh pr view 29 --repo nakkulla/beads-ui --json …,statusCheckRollup
 *     exit 0 · {"statusCheckRollup":[], …}                  ← no CI (empty)
 *   $ gh pr view 13969 --repo cli/cli --json …,statusCheckRollup
 *     exit 0 · {"statusCheckRollup":[{"__typename":"CheckRun",…}]}  ← ok
 *   $ gh pr view 999999 --repo nakkulla/beads-ui --json number,state,…
 *     exit 1 · stdout "" · stderr "GraphQL: Could not resolve…"     ← error
 *
 * So the discriminator is: exit 0 AND a `statusCheckRollup` key holding an
 * array — empty array = semantic empty, non-empty = ok. Anything else (non-zero
 * exit, unparseable output, the key absent or not an array, an item whose shape
 * we cannot classify) is an ERROR. A missing key is deliberately an error and
 * never "no CI": a field gh stopped returning must not read as "this repo has
 * no CI, go ahead and merge".
 */
import { runShell } from '../bd.js';

/**
 * @template T
 * @typedef {{ state: 'ok', data: T } | { state: 'empty' } | { state: 'error', reason: string }} GhResult
 */

/**
 * One open pull request as observed by {@link createGh}'s `openPrForBranch`.
 *
 * @typedef {Object} PrObservation
 * @property {number|null} number - PR number (null when gh omitted it).
 * @property {string} url - PR URL (non-empty; an empty url is an error state).
 * @property {string} head_ref - Head branch name as GitHub reports it.
 * @property {string} head_sha - Head commit sha (Phase 4 binds gates to this).
 * @property {string} state - GitHub PR state (OPEN for this query).
 */

/**
 * One pull request's mergeability detail as observed by `prDetail`
 * (worker-phase2 §4). `mergeable` / `merge_state_status` are GitHub's own
 * enums, passed through verbatim — `UNKNOWN` is a real value the poller
 * re-queries rather than a parse failure.
 *
 * @typedef {Object} PrDetail
 * @property {number|null} number - PR number (null when gh omitted it).
 * @property {string} url - PR URL.
 * @property {string} state - OPEN | CLOSED | MERGED.
 * @property {string} mergeable - MERGEABLE | CONFLICTING | UNKNOWN.
 * @property {string} merge_state_status - CLEAN|BEHIND|BLOCKED|DIRTY|UNKNOWN…
 * @property {string} head_ref - Head branch name.
 * @property {string} head_sha - Head commit sha; every gate verdict binds here.
 */

/**
 * One normalized CI check from the PR's status-check rollup.
 *
 * @typedef {Object} CheckObservation
 * @property {string} name - Check/context name.
 * @property {'pass'|'fail'|'pending'|'skip'} conclusion - Normalized verdict.
 */

/** Re-probe interval while `gh` is NOT usable (ms). */
const AVAILABILITY_RETRY_MS = 30_000;

/**
 * `gh pr list --json` field set. Phase 1 needs number+url; head_ref/head_sha are
 * observed now so Phase 4's SHA-bound gate reads the same shape.
 *
 * @type {string}
 */
const PR_JSON_FIELDS = 'number,url,headRefName,headRefOid,state';

/**
 * `gh pr view --json` field set for the mergeability detail (worker-phase2 §4).
 *
 * @type {string}
 */
const PR_DETAIL_FIELDS =
  'number,url,state,mergeable,mergeStateStatus,headRefName,headRefOid';

/**
 * `gh pr view --json` field set for the checks observation. See the module
 * docblock for why the rollup — not `gh pr checks` — carries the 3-state.
 *
 * @type {string}
 */
const PR_CHECKS_FIELDS = 'statusCheckRollup';

/**
 * Normalize one rollup item to a single verdict. GitHub returns two shapes:
 * `CheckRun` (Actions et al — `status` + `conclusion`) and `StatusContext`
 * (the legacy commit-status API — `state`). An item matching NEITHER shape is
 * unclassifiable, and returning null makes the whole query an error rather
 * than guessing a verdict for a check we cannot read.
 *
 * @param {Record<string, unknown>} item
 * @returns {'pass'|'fail'|'pending'|'skip'|null}
 */
function checkConclusion(item) {
  if (typeof item.status === 'string') {
    if (item.status !== 'COMPLETED') {
      return 'pending';
    }
    const c = item.conclusion;
    if (c === 'SUCCESS' || c === 'NEUTRAL') {
      return 'pass';
    }
    if (c === 'SKIPPED') {
      return 'skip';
    }
    return 'fail';
  }
  if (typeof item.state === 'string') {
    if (item.state === 'SUCCESS') {
      return 'pass';
    }
    if (item.state === 'PENDING' || item.state === 'EXPECTED') {
      return 'pending';
    }
    return 'fail';
  }
  return null;
}

/**
 * Map a non-zero `gh` exit to a stable reason. `runShell` reports a spawn
 * failure (no `gh` on PATH) as code 127, which is exactly the "cannot observe"
 * case admission refuses with `gh_unavailable`.
 *
 * @param {number} code
 * @returns {string}
 */
function exitReason(code) {
  return code === 127 ? 'gh_missing' : 'gh_failed';
}

/**
 * Create the `gh` adapter.
 *
 * @param {{
 *   run?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   now?: () => number
 * }} [deps]
 */
export function createGh(deps = {}) {
  const run = deps.run || ((args, options) => runShell('gh', args, options));
  const now = deps.now || (() => Date.now());

  /**
   * Memoized availability. Once `gh` is usable it stays usable for the process
   * lifetime (an authenticated CLI does not spontaneously de-authenticate under
   * us, and re-probing per dispatch would spawn a process per admission check);
   * while it is NOT usable the probe repeats at most once per 30 s so a repo
   * that installs/authenticates `gh` recovers without a server restart.
   *
   * @type {{ ok: boolean, reason: string, at: number } | null}
   */
  let availability = null;

  /**
   * Run a `gh … --json` query and hand back the parsed payload, collapsing
   * every "could not complete the query" path (spawn failure, non-zero exit,
   * unparseable stdout) onto the SAME error state the 3-state contract
   * requires. Callers own the ok/empty split on the parsed value.
   *
   * @param {string[]} args
   * @param {string} cwd
   * @returns {Promise<{ state: 'ok', data: unknown } | { state: 'error', reason: string }>}
   */
  async function runJson(args, cwd) {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let r;
    try {
      r = await run(args, { cwd });
    } catch {
      return { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (r.code !== 0) {
      return { state: 'error', reason: exitReason(r.code) };
    }
    try {
      return { state: 'ok', data: JSON.parse(r.stdout) };
    } catch {
      return { state: 'error', reason: 'gh_bad_json' };
    }
  }

  /**
   * Run a `gh` command that produces no payload (the write operations). Same
   * error collapsing as {@link runJson}; success carries `true` so the 3-state
   * shape is identical across the adapter.
   *
   * @param {string[]} args
   * @param {string} cwd
   * @returns {Promise<GhResult<true>>}
   */
  async function runVoid(args, cwd) {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let r;
    try {
      r = await run(args, { cwd });
    } catch {
      return { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (r.code !== 0) {
      return { state: 'error', reason: exitReason(r.code) };
    }
    return { state: 'ok', data: true };
  }

  return {
    /**
     * Observe the OPEN pull request for a branch (§1's only success signal).
     * An empty result array is a semantic empty (no open PR); an unusable
     * payload (bad JSON, no url) is an ERROR, never an empty — a malformed
     * observation must not read as "the session opened no PR".
     *
     * @param {string} repo_dir - Repo root the query runs in (`cwd`).
     * @param {string} branch - Head branch name (the bead id).
     * @returns {Promise<GhResult<PrObservation>>}
     */
    async openPrForBranch(repo_dir, branch) {
      /** @type {{ code: number, stdout: string, stderr: string }} */
      let r;
      try {
        r = await run(
          [
            'pr',
            'list',
            '--head',
            branch,
            '--state',
            'open',
            '--json',
            PR_JSON_FIELDS
          ],
          { cwd: repo_dir }
        );
      } catch {
        return { state: 'error', reason: 'gh_spawn_failed' };
      }
      if (r.code !== 0) {
        return { state: 'error', reason: exitReason(r.code) };
      }
      /** @type {unknown} */
      let parsed;
      try {
        parsed = JSON.parse(r.stdout);
      } catch {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      if (!Array.isArray(parsed)) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      if (parsed.length === 0) {
        return { state: 'empty' };
      }
      const first = /** @type {Record<string, unknown>} */ (parsed[0]);
      const url = typeof first.url === 'string' ? first.url : '';
      if (url.length === 0) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      return {
        state: 'ok',
        data: {
          number: typeof first.number === 'number' ? first.number : null,
          url,
          head_ref:
            typeof first.headRefName === 'string' ? first.headRefName : '',
          head_sha:
            typeof first.headRefOid === 'string' ? first.headRefOid : '',
          state: typeof first.state === 'string' ? first.state : ''
        }
      };
    },

    /**
     * Observe one KNOWN pull request's state + mergeability (worker-phase2 §4).
     *
     * There is no `empty` outcome here: the caller already holds the PR number,
     * so "gh could not resolve it" is a failed observation, not an answer. A
     * merged or closed PR still resolves — its `state` carries that fact, which
     * is exactly what §4's external-merge classification reads.
     *
     * @param {string} repo_dir - Repo root the query runs in (`cwd`).
     * @param {number} number - The PR to observe, as recorded at `pr_wait` entry.
     * @returns {Promise<GhResult<PrDetail>>}
     */
    async prDetail(repo_dir, number) {
      const r = await runJson(
        ['pr', 'view', String(number), '--json', PR_DETAIL_FIELDS],
        repo_dir
      );
      if (r.state === 'error') {
        return r;
      }
      const o = r.data;
      if (!o || typeof o !== 'object' || Array.isArray(o)) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      const rec = /** @type {Record<string, unknown>} */ (o);
      const url = typeof rec.url === 'string' ? rec.url : '';
      const state = typeof rec.state === 'string' ? rec.state : '';
      if (url.length === 0 || state.length === 0) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      return {
        state: 'ok',
        data: {
          number: typeof rec.number === 'number' ? rec.number : null,
          url,
          state,
          mergeable: typeof rec.mergeable === 'string' ? rec.mergeable : '',
          merge_state_status:
            typeof rec.mergeStateStatus === 'string'
              ? rec.mergeStateStatus
              : '',
          head_ref: typeof rec.headRefName === 'string' ? rec.headRefName : '',
          head_sha: typeof rec.headRefOid === 'string' ? rec.headRefOid : ''
        }
      };
    },

    /**
     * Observe a PR's CI checks (`gh pr checks` equivalent — see the module
     * docblock for why this is spelled as a rollup query). THE 3-state split
     * that §5's merge gate stands on:
     *
     *   ok    — the repo reported checks; `data` carries their conclusions.
     *   empty — the query SUCCEEDED and the repo reported no checks at all
     *           (the "CI 없음" tier that falls through to `verify_cmd`).
     *   error — the observation could not be completed, INCLUDING a rollup key
     *           that is absent or not an array, or an item shape we cannot
     *           classify. Never degraded to `empty`.
     *
     * @param {string} repo_dir - Repo root the query runs in (`cwd`).
     * @param {number} number - The PR whose checks decide the gate.
     * @returns {Promise<GhResult<CheckObservation[]>>}
     */
    async prChecks(repo_dir, number) {
      const r = await runJson(
        ['pr', 'view', String(number), '--json', PR_CHECKS_FIELDS],
        repo_dir
      );
      if (r.state === 'error') {
        return r;
      }
      const o = r.data;
      if (!o || typeof o !== 'object' || Array.isArray(o)) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      const rollup = /** @type {Record<string, unknown>} */ (o)
        .statusCheckRollup;
      if (!Array.isArray(rollup)) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      if (rollup.length === 0) {
        return { state: 'empty' };
      }
      /** @type {CheckObservation[]} */
      const checks = [];
      for (const raw of rollup) {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        const item = /** @type {Record<string, unknown>} */ (raw);
        const conclusion = checkConclusion(item);
        if (conclusion === null) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        const name =
          typeof item.name === 'string'
            ? item.name
            : typeof item.context === 'string'
              ? item.context
              : '';
        checks.push({ name, conclusion });
      }
      return { state: 'ok', data: checks };
    },

    /**
     * SQUASH-merge a pull request (`gh pr merge <n> --squash`) — worker-phase2
     * §6, the only merge this system performs and always behind a human click.
     *
     * The branch is NOT deleted here (`--delete-branch` is deliberately absent):
     * branch removal is a LATER step of the pr-finish cleanup order, after the
     * post-merge verification and the bd sweep, and folding it into the merge
     * call would run it out of order and unconditionally.
     *
     * Two states only — the caller holds the PR number, so there is nothing a
     * successful-but-empty result could mean. A refusal by GitHub (not
     * mergeable, branch protection, a race with another merge) is a non-zero
     * exit, i.e. an ERROR: the click path must not treat it as a merge.
     *
     * `head_sha` is passed to GitHub as `--match-head-commit`, which closes the
     * LAST TOCTOU window in the click path: the gate was evaluated against a
     * specific head, and a push landing between that evaluation and this call
     * would otherwise merge a commit nothing ever verified. With the pin,
     * GitHub itself refuses the merge (→ an ERROR, not a merge) and the next
     * click re-gates the new head. Omitting it merges whatever is current,
     * which is exactly the stale-approval failure §5/§6 exist to prevent.
     *
     * @param {string} repo_dir - Repo root the command runs in (`cwd`).
     * @param {number} number - The PR to merge.
     * @param {string} [head_sha] - The exact head the gate approved.
     * @returns {Promise<GhResult<true>>}
     */
    async mergeSquash(repo_dir, number, head_sha) {
      const args = ['pr', 'merge', String(number), '--squash'];
      if (typeof head_sha === 'string' && head_sha.length > 0) {
        args.push('--match-head-commit', head_sha);
      }
      return runVoid(args, repo_dir);
    },

    /**
     * Merge the BASE into the PR branch on GitHub (`gh pr update-branch <n>`) —
     * the BEHIND arm of the click branch (worker-phase2 §6). Merge-into-branch,
     * never a rebase: a rebase would need a force-push, which the push-safety
     * rules forbid, and the squash merge discards the merge commit anyway.
     *
     * @param {string} repo_dir - Repo root the command runs in (`cwd`).
     * @param {number} number - The PR whose branch is behind its base.
     * @returns {Promise<GhResult<true>>}
     */
    async updateBranch(repo_dir, number) {
      return runVoid(['pr', 'update-branch', String(number)], repo_dir);
    },

    /**
     * Close a pull request WITHOUT merging (`gh pr close <n>`) — the first step
     * of [재실행] (worker-phase2 §6). The branch is left alone here; discarding
     * the worktree/branch is a later, separately-verified step.
     *
     * @param {string} repo_dir - Repo root the command runs in (`cwd`).
     * @param {number} number - The PR to abandon.
     * @returns {Promise<GhResult<true>>}
     */
    async closePr(repo_dir, number) {
      return runVoid(['pr', 'close', String(number)], repo_dir);
    },

    /**
     * Whether `gh` is installed AND authenticated (`gh auth status`). Memoized
     * per the policy documented on {@link availability}.
     *
     * @returns {Promise<GhResult<true>>}
     */
    async checkAvailability() {
      if (availability && availability.ok) {
        return { state: 'ok', data: true };
      }
      const at = now();
      if (availability && at - availability.at < AVAILABILITY_RETRY_MS) {
        return { state: 'error', reason: availability.reason };
      }
      /** @type {{ code: number, stdout: string, stderr: string }} */
      let r;
      try {
        r = await run(['auth', 'status'], {});
      } catch {
        availability = { ok: false, reason: 'gh_spawn_failed', at };
        return { state: 'error', reason: 'gh_spawn_failed' };
      }
      if (r.code !== 0) {
        const reason = exitReason(r.code);
        availability = { ok: false, reason, at };
        return { state: 'error', reason };
      }
      availability = { ok: true, reason: 'ok', at };
      return { state: 'ok', data: true };
    }
  };
}
