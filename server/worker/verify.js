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
 * ---------------------------------------------------------------------------
 * THE `pr_url` FALLBACK (UI-b8n8 §접근 B)
 * ---------------------------------------------------------------------------
 * The branch query alone binds completion to ONE ref name. Force push is a
 * push-safety hard invariant, so a session whose PR went `dirty` rebases and
 * re-issues on a different ref (`<bead-id>-r2`); that PR is real, recorded in
 * `metadata.pr_url`, and permanently invisible to a `--head <bead-id>` query.
 * A branch `empty` therefore falls back to the contract key the worker itself
 * back-fills — but only through a STRICT parse (`/pull/<n>`, same `--repo` as
 * origin resolves, url echoed back by gh), because the board's tolerant
 * `parsePrNumber` would accept an issue link or a foreign repo's URL and let an
 * unrelated MERGED PR certify this bead as done.
 *
 * MERGED counts as success: the question verify answers is "is the work done",
 * and a merged PR answers it more strongly than an open one. Everything else
 * stays fail-closed — a gh failure is still `gh_observation_failed`, a bd query
 * failure is `bd_read_failed`, and CLOSED-unmerged is still `pr_missing`.
 *
 * @import { GhResult, PrObservation, PrDetail } from './gh.js'
 */
import { branchForBead } from './worktree.js';

/**
 * @typedef {Object} VerifyResult
 * @property {boolean} ok - An open PR was observed AND bd carries the record.
 * @property {'ok'|'pr_missing'|'gh_observation_failed'|'bd_record_failed'|'bd_read_failed'} reason
 * `pr_missing` = successful observation, no PR that proves completion.
 * `gh_observation_failed` = the observation itself could not be completed
 * (retried). `bd_record_failed` = PR observed, but the worker's
 * `pr_url`/`resolved` back-fill did not stick. `bd_read_failed` = the fallback's
 * bd query itself failed, which is NOT downgraded to `pr_missing` for the same
 * reason a gh outage is not.
 * @property {string|null} pr_url - Observed PR URL (null unless observed).
 * @property {number|null} pr_number - Observed PR number (null unless observed).
 * @property {string|null} gh_reason - The gh adapter's own failure reason,
 * kept for the banner; null unless the observation errored.
 * @property {'OPEN'|'MERGED'|null} pr_state - State of the PR the verdict stands
 * on. Durable record only (it rides the attempt's `verify_result`), so "this
 * attempt passed on a MERGED PR" is reconstructible from `queue.json`.
 * @property {boolean} already_finished - The bead was ALREADY `closed` when the
 * merged PR was observed: bd was left untouched and the scheduler must route the
 * bead to `done` instead of `pr_wait`, so a finished cleanup is not re-run.
 */

/** Extra observation attempts after the first (worker-phase2 §1 "짧은 재시도"). */
const DEFAULT_RETRIES = 2;

/** Delay between observation retries (ms). */
const DEFAULT_RETRY_DELAY_MS = 1000;

/**
 * Parse `metadata.pr_url` STRICTLY — verify's own parser, deliberately not the
 * board's `parsePrNumber` (`workflow-enrich.js`). That one is a display helper:
 * it accepts `/issues/<n>`, a bare `#<n>` and any trailing number, and it never
 * looks at which repository the URL points to. Feeding it a fallback that grants
 * completion would let a stale link to another repo's issue resolve to some
 * unrelated PR number in THIS repo and certify the attempt as done.
 *
 * Accepted shape is exactly `https://<host>/<owner>/<repo>/pull/<n>`; the slug
 * is spelled the way {@link import('./gh.js')} spells `--repo` (bare
 * `owner/repo` on github.com, `host/owner/repo` elsewhere) so the caller can
 * compare the two directly.
 *
 * @param {string} raw
 * @returns {{ slug: string, number: number }|null} null when the URL is not a
 * pull-request URL of that exact shape.
 */
function parsePrUrlStrict(raw) {
  if (typeof raw !== 'string' || raw.length === 0) {
    return null;
  }
  /** @type {URL} */
  let parsed;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') {
    return null;
  }
  // A query string or fragment is not part of a canonical PR url; refusing them
  // keeps `pr.url` equality (the third check) an exact string comparison.
  if (parsed.search.length > 0 || parsed.hash.length > 0) {
    return null;
  }
  const segments = parsed.pathname.split('/').filter((s) => s.length > 0);
  if (segments.length !== 4 || segments[2] !== 'pull') {
    return null;
  }
  const [owner, repo, , number_raw] = segments;
  if (!/^[0-9]+$/.test(number_raw)) {
    return null;
  }
  const number = Number(number_raw);
  if (!Number.isSafeInteger(number) || number <= 0) {
    return null;
  }
  const host = parsed.hostname;
  return {
    slug:
      host.toLowerCase() === 'github.com'
        ? `${owner}/${repo}`
        : `${host}/${owner}/${repo}`,
    number
  };
}

/**
 * Create the observation verifier.
 *
 * @param {{
 *   gh: {
 *     openPrForBranch: (repo_dir: string, branch: string) => Promise<GhResult<PrObservation>>,
 *     prDetail: (repo_dir: string, number: number) => Promise<GhResult<PrDetail>>,
 *     repoSlug: (repo_dir: string) => Promise<string|null>
 *   },
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

  /**
   * The back-fill for a MERGED fallback PR. Unlike {@link recordToBd} it reads
   * the status FIRST: a bead already `closed` (pr-finish, the merge click, an
   * earlier cleanup) must not be pushed back to `resolved` — that reopens it
   * into `pr_wait` and re-runs a cleanup and deploy that already ran.
   *
   * The status read is a QUERY, not a write, so its failure is `bd_read_failed`
   * like the fallback's `readMetadata` — `bd_record_failed` is reserved for a
   * back-fill that did not stick.
   *
   * @param {string} bead_id
   * @param {string} pr_url
   * @returns {Promise<{ ok: boolean, already_finished: boolean, reason: 'ok'|'bd_read_failed'|'bd_record_failed' }>}
   */
  async function recordMergedToBd(bead_id, pr_url) {
    /** @type {string|null} */
    let status;
    try {
      status = await deps.bd.readStatus(bead_id);
    } catch {
      return { ok: false, already_finished: false, reason: 'bd_read_failed' };
    }
    if (status === 'closed') {
      return { ok: true, already_finished: true, reason: 'ok' };
    }
    const ok = await recordToBd(bead_id, pr_url);
    return {
      ok,
      already_finished: false,
      reason: ok ? 'ok' : 'bd_record_failed'
    };
  }

  /**
   * Second-stage observation: the PR recorded in `metadata.pr_url`, admitted
   * only when it PROVES it is this repository's pull request.
   *
   * @param {string} repo
   * @param {string} bead_id
   * @returns {Promise<VerifyResult>}
   */
  async function verifyByRecordedUrl(repo, bead_id) {
    /** @type {VerifyResult} */
    const missing = {
      ok: false,
      reason: 'pr_missing',
      pr_url: null,
      pr_number: null,
      gh_reason: null,
      pr_state: null,
      already_finished: false
    };
    /** @type {string|null} */
    let recorded;
    try {
      recorded = await deps.bd.readMetadata(bead_id, 'pr_url');
    } catch {
      // `readMetadata` throws on a failed query and returns null only for a
      // successful "key absent" (bd-metadata.js). A bd outage must not read as
      // "the session left no PR", so it gets its own terminal reason instead of
      // being downgraded — and it is not retried, matching `bd_record_failed`.
      return { ...missing, reason: 'bd_read_failed' };
    }
    if (recorded === null) {
      return missing;
    }
    const parsed = parsePrUrlStrict(recorded);
    if (parsed === null) {
      return missing;
    }
    /** @type {string|null} */
    let slug;
    try {
      slug = await deps.gh.repoSlug(repo);
    } catch {
      slug = null;
    }
    if (slug === null) {
      // Origin became unresolvable between the branch query and here. That is a
      // failed observation, not a verdict: the fail-closed boundary forbids
      // reading a gh/origin failure as "no PR exists".
      return {
        ...missing,
        reason: 'gh_observation_failed',
        gh_reason: 'origin_unresolvable'
      };
    }
    if (slug.toLowerCase() !== parsed.slug.toLowerCase()) {
      return missing;
    }
    /** @type {GhResult<PrDetail>} */
    let detail;
    try {
      detail = await deps.gh.prDetail(repo, parsed.number);
    } catch {
      detail = { state: 'error', reason: 'gh_spawn_failed' };
    }
    if (detail.state !== 'ok') {
      return {
        ...missing,
        reason: 'gh_observation_failed',
        gh_reason: detail.state === 'error' ? detail.reason : 'gh_bad_json'
      };
    }
    const pr = detail.data;
    if (pr.url !== recorded) {
      // The number resolved to a different PR than the one recorded — the url
      // is the identity, not the number.
      return missing;
    }
    if (pr.state !== 'OPEN' && pr.state !== 'MERGED') {
      return missing;
    }
    /** @type {{ ok: boolean, already_finished: boolean, reason: 'ok'|'bd_read_failed'|'bd_record_failed' }} */
    let record;
    if (pr.state === 'MERGED') {
      record = await recordMergedToBd(bead_id, pr.url);
    } else {
      const ok = await recordToBd(bead_id, pr.url);
      record = {
        ok,
        already_finished: false,
        reason: ok ? 'ok' : 'bd_record_failed'
      };
    }
    return {
      ok: record.ok,
      reason: record.reason,
      pr_url: pr.url,
      pr_number: pr.number,
      gh_reason: null,
      pr_state: pr.state,
      already_finished: record.already_finished
    };
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
          gh_reason: observation.reason,
          pr_state: null,
          already_finished: false
        };
      }
      if (observation.state === 'empty') {
        // No OPEN PR on the bead's own branch. Before calling the attempt
        // failed, ask the contract key whether the PR simply lives elsewhere.
        return verifyByRecordedUrl(input.repo, input.bead_id);
      }

      const pr = observation.data;
      const recorded = await recordToBd(input.bead_id, pr.url);
      return {
        ok: recorded,
        reason: recorded ? 'ok' : 'bd_record_failed',
        pr_url: pr.url,
        pr_number: pr.number,
        gh_reason: null,
        pr_state: 'OPEN',
        already_finished: false
      };
    }
  };
}
