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
 * fake runner — no test ever reaches a real `gh` binary or the network. Later
 * phases add checks/merge/update-branch/close to THIS adapter.
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
