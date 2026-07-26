/**
 * Independent completion verification — SERVER OBSERVATION (worker-phase2 §1).
 *
 * A session exit 0 is NOT sufficient to call a bead done, and neither is the
 * session's own bd bookkeeping. The dual-lane verdict this module used to run
 * (auto_merge = observed merge_sha + bd `closed` / pr_stop = bd `resolved` +
 * `pr_url`) is GONE: unattended merging is gone with it, and judging pr_stop
 * from the session's self-report failed real work that merely forgot to write
 * bd. The single verdict is now what the SERVER can see on GitHub:
 *
 *   is there an OPEN pull request for this attempt's branch (= the bead id)?
 *
 * Three-state, fail-closed (the gh adapter's contract):
 *   - observed a PR              → success.
 *   - observed successfully, none → `pr_missing` (the attempt failed).
 *   - could not observe          → short retry, then `gh_observation_failed`.
 *     An observation error is NEVER downgraded to `pr_missing`; a `gh` outage
 *     must not read as "the session never opened a PR".
 *
 * On success the WORKER back-fills bd itself — `metadata.pr_url` = the observed
 * URL, status = `resolved`, each with a readback. The session's own write stays
 * a contract obligation; this is the fallback that makes "work done, record
 * missing" stop being a failure. The writes are idempotent, so a session that
 * already recorded both passes straight through. A bd write or readback that
 * fails is NOT swallowed: it yields `bd_record_failed` (see the reason table
 * below), because the contract keys are what every later consumer (the PR
 * queue, pr-finish cleanup, the human reading the board) reads — silently
 * passing would recreate the same record/reality divergence in the opposite
 * direction, with the worker believing a bead is resolved that bd shows open.
 *
 * @import { GhResult, PrObservation } from './gh.js'
 */
import { branchForBead } from './worktree.js';

/**
 * @typedef {Object} VerifyResult
 * @property {boolean} ok - An open PR was observed AND bd carries the record.
 * @property {'ok'|'pr_missing'|'gh_observation_failed'|'bd_record_failed'} reason
 * `pr_missing` = successful observation, no open PR. `gh_observation_failed` =
 * the observation itself could not be completed (retried). `bd_record_failed` =
 * PR observed, but the worker's `pr_url`/`resolved` back-fill did not stick.
 * @property {string|null} pr_url - Observed PR URL (null unless observed).
 * @property {number|null} pr_number - Observed PR number (null unless observed).
 * @property {string|null} gh_reason - The gh adapter's own failure reason,
 * kept for the banner; null unless the observation errored.
 */

/** Extra observation attempts after the first (worker-phase2 §1 "짧은 재시도"). */
const DEFAULT_RETRIES = 2;

/** Delay between observation retries (ms). */
const DEFAULT_RETRY_DELAY_MS = 1000;

/**
 * Create the observation verifier.
 *
 * @param {{
 *   gh: { openPrForBranch: (repo_dir: string, branch: string) => Promise<GhResult<PrObservation>> },
 *   bd: {
 *     setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *     readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *     setStatus: (bead_id: string, status: string) => Promise<void>,
 *     readStatus: (bead_id: string) => Promise<string|null>
 *   },
 *   retries?: number,
 *   sleep?: (ms: number) => Promise<void>,
 *   retry_delay_ms?: number
 * }} deps
 * @returns {{ verifyPrSubmitted: (input: { repo: string, bead_id: string }) => Promise<VerifyResult> }}
 */
export function createVerifier(deps) {
  const retries =
    typeof deps.retries === 'number' && deps.retries >= 0
      ? deps.retries
      : DEFAULT_RETRIES;
  const retry_delay_ms =
    typeof deps.retry_delay_ms === 'number'
      ? deps.retry_delay_ms
      : DEFAULT_RETRY_DELAY_MS;
  const sleep =
    deps.sleep ||
    ((/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms)));

  /**
   * Observe the branch's open PR, retrying ONLY the error state (an empty
   * result is an answer, not a failure — retrying it would just delay the
   * `pr_missing` verdict).
   *
   * @param {string} repo
   * @param {string} branch
   * @returns {Promise<GhResult<PrObservation>>}
   */
  async function observe(repo, branch) {
    /** @type {GhResult<PrObservation>} */
    let last = { state: 'error', reason: 'gh_not_called' };
    for (let i = 0; i <= retries; i += 1) {
      try {
        last = await deps.gh.openPrForBranch(repo, branch);
      } catch {
        last = { state: 'error', reason: 'gh_spawn_failed' };
      }
      if (last.state !== 'error') {
        return last;
      }
      if (i < retries) {
        await sleep(retry_delay_ms);
      }
    }
    return last;
  }

  /**
   * Back-fill the contract keys the session was supposed to write, each with a
   * confirming readback. Returns false on any throw or mismatch.
   *
   * @param {string} bead_id
   * @param {string} pr_url
   * @returns {Promise<boolean>}
   */
  async function recordToBd(bead_id, pr_url) {
    try {
      await deps.bd.setMetadata(bead_id, 'pr_url', pr_url);
      if ((await deps.bd.readMetadata(bead_id, 'pr_url')) !== pr_url) {
        return false;
      }
      await deps.bd.setStatus(bead_id, 'resolved');
      if ((await deps.bd.readStatus(bead_id)) !== 'resolved') {
        return false;
      }
    } catch {
      return false;
    }
    return true;
  }

  return {
    /**
     * @param {{ repo: string, bead_id: string }} input
     * @returns {Promise<VerifyResult>}
     */
    async verifyPrSubmitted(input) {
      const observation = await observe(
        input.repo,
        branchForBead(input.bead_id)
      );

      if (observation.state === 'error') {
        return {
          ok: false,
          reason: 'gh_observation_failed',
          pr_url: null,
          pr_number: null,
          gh_reason: observation.reason
        };
      }
      if (observation.state === 'empty') {
        return {
          ok: false,
          reason: 'pr_missing',
          pr_url: null,
          pr_number: null,
          gh_reason: null
        };
      }

      const pr = observation.data;
      const recorded = await recordToBd(input.bead_id, pr.url);
      return {
        ok: recorded,
        reason: recorded ? 'ok' : 'bd_record_failed',
        pr_url: pr.url,
        pr_number: pr.number,
        gh_reason: null
      };
    }
  };
}
