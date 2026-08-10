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
 *
 * ---------------------------------------------------------------------------
 * WHY EVERY PR OPERATION PASSES AN EXPLICIT `--repo`
 * ---------------------------------------------------------------------------
 * Without it, gh resolves the repository from the remotes in `cwd`, and in a
 * fork checkout (origin = the writable fork, upstream = the read-only source)
 * it picks the upstream unless `gh repo set-default` was run in that very
 * checkout. Measured 2026-07-27: a session opened PR #39 on the fork and
 * `openPrForBranch` queried the upstream instead, got `[]` with exit 0, and §1
 * read that successful-but-empty observation as `pr_missing` — the attempt
 * failed and auto_advance switched itself off. `gh repo set-default` is
 * per-checkout state, so it fixes one machine and lets the next clone repeat
 * the bug; the repository the worker means is the one it pushes to, i.e.
 * origin's push URL, and that is what {@link parseOriginRepo} derives.
 *
 * Resolution failure is an `error` state (`origin_unresolvable`), never a
 * silent fallback to an argv without `--repo` — that fallback IS the bug above,
 * and verify reads the error as `gh_observation_failed` (retry) rather than
 * `pr_missing` (attempt failed).
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
 * @property {string} base_ref - Base branch name as GitHub reports it.
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
 * @property {string|null} [merged_sha] - Authoritative merge commit SHA for a
 * MERGED PR; null while no merge commit exists.
 * @property {string} base_ref - Base branch name. The ONLY base signal an
 * external PR has (UI-7agi §3): with no attempt to read `target_base` from, the
 * post-merge cleanup would otherwise sync, verify and deploy `main` for a PR
 * that targeted something else.
 */

/**
 * One merged pull request that a COMMIT belongs to, as observed by
 * `mergedPrsForCommit` (UI-43bh §per-SHA PR 프로버넌스).
 *
 * @typedef {Object} CommitPrObservation
 * @property {number|null} number - PR number (null when GitHub omitted it).
 * @property {string} url - PR html url.
 * @property {string} base_ref - The branch the PR merged INTO. Only a PR whose
 * base is the attempt's target base explains a commit's presence on that base.
 * @property {string} merged_at - Merge timestamp; non-empty by construction,
 * since it is what made this item a match.
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
 * How long a SUCCESSFUL availability probe stays good (ms).
 *
 * A success used to be memoized for the process lifetime, which made a later
 * `gh auth` logout, token expiry or revocation structurally unobservable: the
 * admission check kept passing for days on a probe taken at boot, and every
 * dispatch it admitted was one whose §1 completion verdict could never succeed.
 *
 * 60 s is chosen against the two costs it sits between. Above it: a whole tick
 * pass (a handful of admission checks seconds apart) shares ONE `gh auth status`
 * spawn, so the per-dispatch-probe cost the memo existed to avoid does not come
 * back. Below it: a revoked token is noticed within a minute, which is far
 * shorter than any session it would otherwise let start.
 *
 * @type {number}
 */
const AVAILABILITY_OK_TTL_MS = 60_000;

/**
 * How long a resolved `--repo` value stays good per repo dir (ms).
 *
 * Same 60 s as {@link AVAILABILITY_OK_TTL_MS} and for the same reason: a whole
 * tick pass shares one `git remote get-url` spawn, while a remote that was
 * repointed (fork renamed, origin swapped) cannot stay invisible for longer
 * than a minute.
 *
 * @type {number}
 */
const ORIGIN_TTL_MS = 60_000;

/**
 * `gh pr list --json` field set. Phase 1 needs number+url; head_ref/head_sha are
 * observed now so Phase 4's SHA-bound gate reads the same shape.
 *
 * @type {string}
 */
const PR_JSON_FIELDS = 'number,url,headRefName,headRefOid,baseRefName,state';

/**
 * `gh pr view --json` field set for the mergeability detail (worker-phase2 §4).
 *
 * @type {string}
 */
const PR_DETAIL_FIELDS =
  'number,url,state,mergeable,mergeStateStatus,headRefName,headRefOid,baseRefName,mergeCommit';

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
    const status = item.status.toUpperCase();
    if (status !== 'COMPLETED') {
      return 'pending';
    }
    const c =
      typeof item.conclusion === 'string'
        ? item.conclusion.toUpperCase()
        : item.conclusion;
    if (c === 'SUCCESS' || c === 'NEUTRAL') {
      return 'pass';
    }
    if (c === 'SKIPPED') {
      return 'skip';
    }
    return 'fail';
  }
  if (typeof item.state === 'string') {
    const state = item.state.toUpperCase();
    if (state === 'SUCCESS') {
      return 'pass';
    }
    if (state === 'PENDING' || state === 'EXPECTED') {
      return 'pending';
    }
    return 'fail';
  }
  return null;
}

/**
 * Derive gh's `--repo` value from a git remote URL. Handles the three forms
 * git writes: scp-like (`git@HOST:OWNER/REPO.git`), `ssh://git@HOST/OWNER/REPO`
 * and `https://HOST/OWNER/REPO`. github.com yields the bare `OWNER/REPO`; any
 * other host keeps its `HOST/OWNER/REPO` prefix, which is how gh addresses a
 * GitHub Enterprise repo.
 *
 * Anything that does not resolve to exactly one owner and one repo returns
 * null — the caller turns that into an error state rather than guessing.
 *
 * @param {string} raw - Remote URL as `git remote get-url` printed it.
 * @returns {string|null}
 */
function parseOriginRepo(raw) {
  const url = raw.trim();
  if (url.length === 0) {
    return null;
  }
  let host = '';
  let path = '';
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) {
    /** @type {URL} */
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return null;
    }
    host = parsed.hostname;
    path = parsed.pathname;
  } else {
    const scp = /^(?:[^@/]+@)?([^@/:]+):(.+)$/.exec(url);
    if (!scp) {
      return null;
    }
    host = scp[1];
    path = scp[2];
  }
  const segments = path
    .replace(/\.git$/, '')
    .split('/')
    .filter((part) => part.length > 0);
  if (host.length === 0 || segments.length !== 2) {
    return null;
  }
  const [owner, repo] = segments;
  return host.toLowerCase() === 'github.com'
    ? `${owner}/${repo}`
    : `${host}/${owner}/${repo}`;
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
 * `run` spawns `gh` and `git_run` spawns `git`; they stay separate runners
 * because each is bound to its own binary — reusing `run` for the origin lookup
 * would hand `git` arguments to `gh`.
 *
 * @param {{
 *   run?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   git_run?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   now?: () => number
 * }} [deps]
 */
export function createGh(deps = {}) {
  const run = deps.run || ((args, options) => runShell('gh', args, options));
  const gitRun =
    deps.git_run || ((args, options) => runShell('git', args, options));
  const now = deps.now || (() => Date.now());

  /**
   * Memoized availability, with a TTL on BOTH verdicts: a success is trusted for
   * {@link AVAILABILITY_OK_TTL_MS} and a failure re-probes after
   * {@link AVAILABILITY_RETRY_MS}. Neither verdict is permanent — an
   * authenticated CLI can be logged out or have its token revoked under us just
   * as an unusable one can be repaired.
   *
   * @type {{ ok: boolean, reason: string, at: number } | null}
   */
  let availability = null;

  /**
   * Resolved `--repo` values keyed BY REPO DIR. One worker serves several
   * repos, so a single-slot cache would hand one repo's `--repo` to another's
   * PR query.
   *
   * @type {Map<string, { repo: string, at: number }>}
   */
  const origin_repos = new Map();

  /**
   * Resolve the `--repo` value for a repo dir from origin's PUSH url — the
   * repository this worker's sessions actually push branches to. Only
   * successes are memoized; a failure re-probes on the next call so a repo
   * that gains its origin back recovers without waiting out a TTL.
   *
   * @param {string} repo_dir
   * @returns {Promise<string|null>} null when origin is absent, unparseable or
   * the lookup itself failed.
   */
  async function resolveRepo(repo_dir) {
    const at = now();
    const cached = origin_repos.get(repo_dir);
    if (cached && at - cached.at < ORIGIN_TTL_MS) {
      return cached.repo;
    }
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let r;
    try {
      r = await gitRun(['remote', 'get-url', '--push', 'origin'], {
        cwd: repo_dir
      });
    } catch {
      return null;
    }
    if (r.code !== 0) {
      return null;
    }
    const repo = parseOriginRepo(r.stdout);
    if (repo === null) {
      return null;
    }
    origin_repos.set(repo_dir, { repo, at });
    return repo;
  }

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

  /**
   * `gh pr list --head <branch> --state <state>`, normalized to the 3-state
   * contract. Shared by the OPEN query (§1's completion signal) and the MERGED
   * one (UI-8mvc §3's false-positive exclusion) so the two can never disagree
   * about what an unusable payload means: an empty ARRAY is a semantic empty,
   * anything unreadable is an error.
   *
   * @param {string} repo_dir - Repo root the query runs in (`cwd`).
   * @param {string} branch - Head branch name (the bead id).
   * @param {'open'|'merged'} state - The `--state` filter.
   * @returns {Promise<GhResult<PrObservation>>}
   */
  async function prForBranch(repo_dir, branch, state) {
    const repo = await resolveRepo(repo_dir);
    if (repo === null) {
      return { state: 'error', reason: 'origin_unresolvable' };
    }
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
          state,
          '--json',
          PR_JSON_FIELDS,
          '--repo',
          repo
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
        head_sha: typeof first.headRefOid === 'string' ? first.headRefOid : '',
        base_ref:
          typeof first.baseRefName === 'string' ? first.baseRefName : '',
        state: typeof first.state === 'string' ? first.state : ''
      }
    };
  }

  return {
    /**
     * The `--repo` value this adapter resolves for a repo dir — the same
     * memoized origin parse every PR query passes (UI-b8n8 §접근 B).
     *
     * Exposed because verify's `pr_url` fallback has to PROVE the recorded PR
     * belongs to the repository the sessions push to before it may accept that
     * PR as completion evidence. Re-deriving origin there would fork the parse
     * this module exists to own (see the `--repo` rationale above).
     *
     * @param {string} repo_dir
     * @returns {Promise<string|null>} null when origin is absent, unparseable
     * or the lookup failed — the caller decides what an unresolvable origin
     * means for its own verdict.
     */
    async repoSlug(repo_dir) {
      return resolveRepo(repo_dir);
    },

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
      return prForBranch(repo_dir, branch, 'open');
    },

    /**
     * Observe a MERGED pull request for a branch — the detection layer's
     * false-positive exclusion (UI-8mvc §3-4). A landing whose commits reached
     * the base through a merged PR is not a session violation: GitHub's
     * merge-commit strategy puts the branch's own SHAs on the base, and a human
     * fast-forwarding the branch onto the base is an allowed act.
     *
     * The 3-state split carries its weight here too, in the opposite direction
     * from `openPrForBranch`: `empty` (no merged PR) is what lets a landing be
     * called a violation, while an `error` must NOT — an unobservable PR is
     * recorded as an observation failure, never used as evidence of guilt.
     *
     * @param {string} repo_dir - Repo root the query runs in (`cwd`).
     * @param {string} branch - Head branch name (the bead id).
     * @returns {Promise<GhResult<PrObservation>>}
     */
    async mergedPrForBranch(repo_dir, branch) {
      return prForBranch(repo_dir, branch, 'merged');
    },

    /**
     * Observe the MERGED pull requests one COMMIT belongs to — the per-SHA
     * provenance the detection layer needs to tell "another unit's merge that
     * this attempt inherited by rebasing" from "this attempt pushed to base"
     * (UI-43bh). `mergedPrForBranch` cannot answer that: it asks about THIS
     * branch, and the commit under suspicion belongs to someone else's.
     *
     * The endpoint is the REST `repos/{slug}/commits/{sha}/pulls`, addressed
     * through {@link resolveRepo}'s origin slug rather than gh's `{owner}/{repo}`
     * placeholder — the placeholder resolves from cwd's default repository,
     * which in a fork checkout is the upstream (see the module docblock's
     * `--repo` rationale). Measured 2026-08-03 on nakkulla/beads-ui: the
     * endpoint DOES return PR #81 for its squash `merge_commit_sha`, which is
     * the only shape this observation cares about.
     *
     * `--paginate` because the endpoint pages at 30: reading only the first
     * page and answering `empty` would turn an incomplete observation into
     * evidence of guilt. A pagination that cannot be completed exits non-zero
     * and lands in `error`.
     *
     * ONE `JSON.parse` of the whole stdout is correct here, measured on gh
     * 2.89.0: `--paginate` MERGES an array-returning endpoint's pages into a
     * single flat array rather than concatenating one JSON document per page
     * (`gh api --paginate 'repos/nakkulla/beads-ui/labels?per_page=1'` → 9
     * pages, parsed by one `json.loads` as a 9-element list). Were a future gh
     * to emit per-page documents instead, the parse fails and this collapses to
     * `error` — the fail-open direction, never a false `empty`.
     *
     * The 3-state split runs the same direction as `mergedPrForBranch`:
     *
     *   ok    — a PR with `merged_at` set AND `base.ref === target_base`.
     *   empty — the query ran and nothing matched (no PR, none merged, or all
     *           merged into some other branch). The only answer that permits a
     *           violation verdict.
     *   error — unresolvable origin, failed query, or a payload we cannot read.
     *           NEVER used as evidence.
     *
     * Merge state is read from `merged_at`, never from `state`: the REST
     * payload has no `MERGED` value — a merged PR reports `state: 'closed'`,
     * exactly like an abandoned one.
     *
     * @param {string} repo_dir - Repo root the query runs in (`cwd`).
     * @param {string} sha - The commit whose provenance is in question.
     * @param {string} target_base - The attempt's re-resolved base branch name.
     * Required: without it `ok` and `empty` cannot be told apart.
     * @returns {Promise<GhResult<CommitPrObservation>>}
     */
    async mergedPrsForCommit(repo_dir, sha, target_base) {
      if (typeof target_base !== 'string' || target_base.length === 0) {
        return { state: 'error', reason: 'target_base_required' };
      }
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      const r = await runJson(
        ['api', '--paginate', `repos/${repo}/commits/${sha}/pulls`],
        repo_dir
      );
      if (r.state === 'error') {
        return r;
      }
      if (!Array.isArray(r.data)) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      // The WHOLE payload is validated before ANY item is judged. Judging as we
      // go would let a malformed item later in the array be answered as `empty`
      // the moment an earlier item matched — and `empty` is the one answer that
      // permits a violation verdict, so a payload we cannot fully read must not
      // reach it.
      /** @type {{ number: number|null, url: string, base_ref: string, merged_at: string|null }[]} */
      const items = [];
      for (const raw of r.data) {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        const item = /** @type {Record<string, unknown>} */ (raw);
        const merged_at = item.merged_at;
        // An EMPTY `merged_at` is malformed, not "unmerged": the API writes
        // null for an unmerged PR, so a blank string is a shape we cannot read
        // and must never be read as the innocent answer.
        if (
          merged_at !== null &&
          (typeof merged_at !== 'string' || merged_at.length === 0)
        ) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        const base = item.base;
        if (!base || typeof base !== 'object' || Array.isArray(base)) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        const base_ref = /** @type {Record<string, unknown>} */ (base).ref;
        if (typeof base_ref !== 'string' || base_ref.length === 0) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        items.push({
          number: typeof item.number === 'number' ? item.number : null,
          url: typeof item.html_url === 'string' ? item.html_url : '',
          base_ref,
          merged_at
        });
      }
      for (const item of items) {
        if (item.merged_at === null || item.base_ref !== target_base) {
          continue;
        }
        return {
          state: 'ok',
          data: {
            number: item.number,
            url: item.url,
            base_ref: item.base_ref,
            merged_at: item.merged_at
          }
        };
      }
      return { state: 'empty' };
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
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      const r = await runJson(
        [
          'pr',
          'view',
          String(number),
          '--json',
          PR_DETAIL_FIELDS,
          '--repo',
          repo
        ],
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
      // A MISSING head sha is an ERROR, never an `ok` carrying an empty string.
      // Every gate verdict binds to this value and the merge pins itself to it,
      // so an observation without one cannot be reported as a successful
      // observation: in the "검증 신호 없음" tier the gate is ENABLED, and an
      // empty sha reaching that path would merge a head nothing pinned.
      const head_sha = typeof rec.headRefOid === 'string' ? rec.headRefOid : '';
      const merge_commit =
        rec.mergeCommit &&
        typeof rec.mergeCommit === 'object' &&
        !Array.isArray(rec.mergeCommit)
          ? /** @type {Record<string, unknown>} */ (rec.mergeCommit)
          : null;
      const merged_sha =
        merge_commit &&
        typeof merge_commit.oid === 'string' &&
        /^[0-9a-f]{40}$/i.test(merge_commit.oid)
          ? merge_commit.oid
          : null;
      if (
        url.length === 0 ||
        state.length === 0 ||
        head_sha.length === 0 ||
        (state === 'MERGED' && merged_sha === null)
      ) {
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
          base_ref: typeof rec.baseRefName === 'string' ? rec.baseRefName : '',
          head_sha,
          merged_sha
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
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      const r = await runJson(
        [
          'pr',
          'view',
          String(number),
          '--json',
          PR_CHECKS_FIELDS,
          '--repo',
          repo
        ],
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
     * Observe all CI signals attached to one exact commit SHA. Completion
     * ownership cannot use a PR rollup here because the comparison subject is
     * the pinned target-base commit, not the PR head.
     *
     * Both REST sources are required: Checks API runs and legacy commit
     * statuses. A response larger than the bounded page fails closed instead
     * of silently classifying an incomplete set.
     *
     * @param {string} repo_dir
     * @param {string} sha
     * @returns {Promise<GhResult<CheckObservation[]>>}
     */
    async commitChecks(repo_dir, sha) {
      if (!/^[0-9a-f]{40}$/i.test(sha)) {
        return { state: 'error', reason: 'commit_sha_invalid' };
      }
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      const [check_runs_result, statuses_result] = await Promise.all([
        runJson(
          [
            'api',
            '--method',
            'GET',
            `repos/${repo}/commits/${sha}/check-runs?per_page=100`
          ],
          repo_dir
        ),
        runJson(
          [
            'api',
            '--method',
            'GET',
            `repos/${repo}/commits/${sha}/status?per_page=100`
          ],
          repo_dir
        )
      ]);
      if (check_runs_result.state === 'error') {
        return check_runs_result;
      }
      if (statuses_result.state === 'error') {
        return statuses_result;
      }
      const check_payload = check_runs_result.data;
      const status_payload = statuses_result.data;
      if (
        !check_payload ||
        typeof check_payload !== 'object' ||
        Array.isArray(check_payload) ||
        !status_payload ||
        typeof status_payload !== 'object' ||
        Array.isArray(status_payload)
      ) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      const check_record = /** @type {Record<string, unknown>} */ (
        check_payload
      );
      const status_record = /** @type {Record<string, unknown>} */ (
        status_payload
      );
      if (
        !Array.isArray(check_record.check_runs) ||
        !Array.isArray(status_record.statuses) ||
        typeof check_record.total_count !== 'number' ||
        typeof status_record.total_count !== 'number'
      ) {
        return { state: 'error', reason: 'gh_bad_json' };
      }
      if (
        check_record.total_count > check_record.check_runs.length ||
        status_record.total_count > status_record.statuses.length
      ) {
        return { state: 'error', reason: 'gh_checks_truncated' };
      }
      /** @type {CheckObservation[]} */
      const checks = [];
      for (const raw of [
        ...check_record.check_runs,
        ...status_record.statuses
      ]) {
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
        if (name.length === 0) {
          return { state: 'error', reason: 'gh_bad_json' };
        }
        checks.push({ name: name.slice(0, 200), conclusion });
      }
      return checks.length === 0
        ? { state: 'empty' }
        : { state: 'ok', data: checks };
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
     * `head_sha` is REQUIRED and is passed to GitHub as `--match-head-commit`,
     * which closes the LAST TOCTOU window in the click path: the gate was
     * evaluated against a specific head, and a push landing between that
     * evaluation and this call would otherwise merge a commit nothing ever
     * verified. With the pin, GitHub itself refuses the merge (→ an ERROR, not a
     * merge) and the next click re-gates the new head.
     *
     * An absent or empty sha REFUSES (3-state error) rather than merging
     * unpinned. Merging whatever is current is exactly the stale-approval
     * failure §5/§6 exist to prevent, and it must not be reachable by a
     * malformed observation — least of all in the "검증 신호 없음" tier, where
     * the gate is enabled and the pin is the only thing binding the click to a
     * commit.
     *
     * @param {string} repo_dir - Repo root the command runs in (`cwd`).
     * @param {number} number - The PR to merge.
     * @param {string} head_sha - The exact head the gate approved (required).
     * @returns {Promise<GhResult<true>>}
     */
    async mergeSquash(repo_dir, number, head_sha) {
      if (typeof head_sha !== 'string' || head_sha.length === 0) {
        return { state: 'error', reason: 'head_sha_required' };
      }
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      return runVoid(
        [
          'pr',
          'merge',
          String(number),
          '--squash',
          '--match-head-commit',
          head_sha,
          '--repo',
          repo
        ],
        repo_dir
      );
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
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      return runVoid(
        ['pr', 'update-branch', String(number), '--repo', repo],
        repo_dir
      );
    },

    /**
     * Close a pull request WITHOUT merging (`gh pr close <n>`) — the close step
     * of [폐기] (`2026-07-27-worker-discard-button.md` §1), reached only after
     * the authoritative re-read saw the PR OPEN. The branch is left alone here;
     * discarding the worktree/branch is a later, separately-verified step.
     *
     * @param {string} repo_dir - Repo root the command runs in (`cwd`).
     * @param {number} number - The PR to abandon.
     * @returns {Promise<GhResult<true>>}
     */
    async closePr(repo_dir, number) {
      const repo = await resolveRepo(repo_dir);
      if (repo === null) {
        return { state: 'error', reason: 'origin_unresolvable' };
      }
      return runVoid(['pr', 'close', String(number), '--repo', repo], repo_dir);
    },

    /**
     * Whether `gh` is installed AND authenticated (`gh auth status`). Memoized
     * per the policy documented on {@link availability}.
     *
     * @returns {Promise<GhResult<true>>}
     */
    async checkAvailability() {
      const at = now();
      if (availability && availability.ok) {
        if (at - availability.at < AVAILABILITY_OK_TTL_MS) {
          return { state: 'ok', data: true };
        }
      } else if (availability && at - availability.at < AVAILABILITY_RETRY_MS) {
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
