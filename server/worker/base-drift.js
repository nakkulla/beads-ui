/**
 * Post-hoc base invariant — the DETECTION layer (UI-8mvc §3).
 *
 * The prevention layer (`guard-hook.js`) refuses a push whose destination ref is
 * the attempt's base, and `--no-verify` measurably walks through it. This module
 * is what sits behind that hole: after the session process is gone, it asks one
 * question the hook cannot be asked afterwards — did the remote base move off
 * the `base_oid` this attempt pinned, and is that movement made of THIS
 * attempt's commits?
 *
 * It is EVIDENCE, not enforcement, and the whole shape follows from that:
 *
 *   - Every observation failure (base re-resolution, `rev-list`, the PR query)
 *     is recorded as a failure step and is NEVER a violation. Killing a session
 *     because the observation could not run would recreate, under a new name,
 *     the false-positive kill this Bead exists to remove.
 *   - A landing that came through a PR merge is excluded BEFORE the verdict.
 *     GitHub's merge-commit strategy puts the branch's own SHAs on the base, and
 *     a human fast-forwarding the branch onto the base is an allowed act; without
 *     the exclusion both read as violations.
 *   - So is a REBASE (UI-43bh). "The attempt pushed to base" and "the base moved
 *     first and the attempt rebased onto it" produce the SAME commit graph, so
 *     the walk alone is direction-blind: the foreign commit the branch inherited
 *     is in both ranges and reads as a landing. Two exclusions, both applied
 *     before the verdict, carve that case out — the branch's POSTURE (does it
 *     sit entirely on top of the observed tip?) and each shared commit's
 *     PROVENANCE (does a merged PR of another unit account for it?).
 *     Moving the walk's anchor to merge-base/observed instead was rejected: a
 *     shared commit is always swallowed below the merge-base, so that anchor
 *     silences the real violations too.
 *   - Attempts the invariant cannot judge (a disposition, whose job IS to publish
 *     the base; an external-conflict dispatch, which pins no `base_oid`) record
 *     the fact that they were EXCLUDED. A silent non-application leaves no
 *     evidence behind when the gap later matters.
 *
 * Known miss (§5 잔여 5, fixed as a test): a session that commits outside the
 * attempt branch — on a main checkout or a detached HEAD — and pushes that to
 * base leaves the branch walk empty, so the intersection is empty and nothing is
 * detected. Closing that path belongs to the hook, not here.
 *
 * Everything it touches is injected (`resolveBase`, `git`, `gh`), so a test
 * drives the whole judgment without a repo, a network or a `gh` binary.
 */
import { debug } from '../logging.js';

const log = debug('worker:base-drift');

/**
 * How many shared commits the per-SHA provenance query is willing to spend one
 * `gh` call each on. Above it the observation is abandoned as UNDONE rather
 * than answered — an intersection this large is not the shape this invariant
 * describes (an attempt lands a handful of commits), and a burst of API calls
 * per finished attempt is its own failure mode.
 *
 * @type {number}
 */
const SHA_CAP = 20;

/**
 * What one attempt's post-hoc base observation recorded. Only the fields the
 * observation actually produced are present, so an absent key means "this
 * observation never got that far" rather than a default value.
 *
 * @typedef {Object} BaseDriftRecord
 * @property {string} [pinned] - The `base_oid` the attempt was dispatched
 * against, i.e. the point the comparison is anchored to.
 * @property {string} [observed] - The remote base tip re-resolved after the
 * session ended. Absent when the re-resolution itself failed.
 * @property {boolean} [landed] - Whether any of this attempt's commits are
 * reachable from the observed tip.
 * @property {'pr_merge'|'other_pr_merge'|'direct_push'} [via] - How the landing
 * happened: a MERGED pull request of THIS branch, a merged PR of another unit
 * that accounts for every shared commit, or a push that no merged PR accounts
 * for (the violation).
 * @property {string[]} [shas] - The evidence set: on a violation, the shared
 * commits NO merged PR explains; otherwise the whole intersection.
 * @property {'branch_contains_observed'} [excluded] - Why the verdict was
 * declined before the walk ever ran (the rebase posture).
 * @property {'disposition'|'no_base_oid'} [skipped] - Why the attempt was
 * outside the invariant's scope. Recorded so the exclusion is visible.
 * @property {string} [error] - Which observation step failed
 * (`base_resolve:<step>` / `containment:rev_parse` / `containment:merge_base` /
 * `rev_list_branch` / `rev_list_base` / `pr_observe:<reason>` /
 * `pr_observe:sha_cap` / `no_repo` / `no_observer_deps`).
 */

/**
 * The observation's outcome: what to persist, and whether the fail-closed
 * disposition applies.
 *
 * @typedef {Object} BaseDriftVerdict
 * @property {boolean} violation - True ONLY for an unexcluded landing.
 * @property {BaseDriftRecord|null} record - The record to persist on the
 * attempt; null when the base never moved (there is nothing to say).
 */

/**
 * Split `git rev-list` output into SHAs, in walk order.
 *
 * @param {string} stdout
 * @returns {string[]}
 */
function parseShas(stdout) {
  return String(stdout || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Walk `<from>..<ref>` and hand back its SHAs, or null when the walk could not
 * be completed (a failed walk must never read as an empty one — an empty walk
 * is precisely what makes an attempt innocent).
 *
 * @param {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} git
 * @param {string} repo
 * @param {string} from
 * @param {string} ref
 * @returns {Promise<string[]|null>}
 */
async function revList(git, repo, from, ref) {
  /** @type {{ code: number, stdout: string, stderr: string }} */
  let r;
  try {
    r = await git(['rev-list', `${from}..${ref}`], { cwd: repo });
  } catch (err) {
    log('rev-list %s..%s threw in %s: %o', from, ref, repo, err);
    return null;
  }
  if (r.code !== 0) {
    return null;
  }
  return parseShas(r.stdout);
}

/**
 * Observe one finished attempt against the base it was dispatched from.
 *
 * Runs REGARDLESS of the session's own verdict: a session killed by SIGTERM may
 * well have pushed before it died, and in that case `base_landing_detected` is
 * the more honest failure cause than whatever the runner reported.
 *
 * @param {{
 *   attempt: { bead_id?: string, repo?: string|null, base_oid?: string|null, disposition?: string|null },
 *   resolveBase?: (options?: { force?: boolean }) => Promise<import('./target-base.js').TargetBaseResult>,
 *   git?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   gh?: {
 *     mergedPrForBranch: (repo_dir: string, branch: string) => Promise<{ state: string, data?: unknown, reason?: string }>,
 *     mergedPrsForCommit?: (repo_dir: string, sha: string, target_base: string) => Promise<{ state: string, data?: unknown, reason?: string }>
 *   }
 * }} input
 * @returns {Promise<BaseDriftVerdict>}
 */
export async function observeBaseDrift(input) {
  const attempt = input.attempt || {};

  // A REVISE disposition publishes the base as its job (§3 대상).
  if (
    typeof attempt.disposition === 'string' &&
    attempt.disposition.length > 0
  ) {
    return { violation: false, record: { skipped: 'disposition' } };
  }
  // An external-conflict dispatch pins no base_oid, so there is no anchor to
  // compare against. The exclusion follows from unobservability, not policy.
  const pinned =
    typeof attempt.base_oid === 'string' && attempt.base_oid.length > 0
      ? attempt.base_oid
      : null;
  if (pinned === null) {
    return { violation: false, record: { skipped: 'no_base_oid' } };
  }

  const repo = typeof attempt.repo === 'string' ? attempt.repo : '';
  if (repo.length === 0) {
    return { violation: false, record: { pinned, error: 'no_repo' } };
  }
  const resolveBase = input.resolveBase;
  const git = input.git;
  if (typeof resolveBase !== 'function' || typeof git !== 'function') {
    return { violation: false, record: { pinned, error: 'no_observer_deps' } };
  }

  // The SAME forced re-resolution the merge gate takes before an irreversible
  // merge (`pr-actions.js`): the scan path's memo could otherwise hand back a
  // tip taken before this very session ran, which is exactly the movement being
  // looked for.
  /** @type {import('./target-base.js').TargetBaseResult} */
  let resolved;
  try {
    resolved = await resolveBase({ force: true });
  } catch (err) {
    log('base re-resolution threw for %s: %o', repo, err);
    return {
      violation: false,
      record: { pinned, error: 'base_resolve:threw' }
    };
  }
  if (!resolved.ok) {
    return {
      violation: false,
      record: { pinned, error: `base_resolve:${resolved.step}` }
    };
  }

  const observed = resolved.base_oid;
  if (observed === pinned) {
    return { violation: false, record: null };
  }

  const branch = typeof attempt.bead_id === 'string' ? attempt.bead_id : '';
  const ref = `refs/heads/${branch}`;

  // STRICT containment: the branch sits entirely on top of the observed base.
  // That is the rebase posture — the attempt INHERITED the base's new commits
  // rather than publishing them. `observed != head` is what keeps the miss
  // boundary: an attempt that pushed its own tip to base also contains the
  // observed tip, and only the branch having commits ABOVE it says "rebase".
  /** @type {{ code: number, stdout: string, stderr: string }} */
  let head_r;
  try {
    head_r = await git(['rev-parse', ref], { cwd: repo });
  } catch (err) {
    log('rev-parse %s threw in %s: %o', ref, repo, err);
    return {
      violation: false,
      record: { pinned, observed, error: 'containment:rev_parse' }
    };
  }
  const head = head_r.code === 0 ? String(head_r.stdout || '').trim() : '';
  if (head.length === 0) {
    return {
      violation: false,
      record: { pinned, observed, error: 'containment:rev_parse' }
    };
  }
  if (head !== observed) {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let ancestor_r;
    try {
      ancestor_r = await git(['merge-base', '--is-ancestor', observed, ref], {
        cwd: repo
      });
    } catch (err) {
      log('is-ancestor %s..%s threw in %s: %o', observed, ref, repo, err);
      return {
        violation: false,
        record: { pinned, observed, error: 'containment:merge_base' }
      };
    }
    if (ancestor_r.code === 0) {
      // No walk ran, so the record carries no `landed`/`shas`: an absent key
      // means the observation never got that far.
      return {
        violation: false,
        record: { pinned, observed, excluded: 'branch_contains_observed' }
      };
    }
    // Exit 1 is `--is-ancestor`'s NEGATIVE ANSWER, not a failed observation;
    // only a higher code means the question could not be asked.
    if (ancestor_r.code !== 1) {
      return {
        violation: false,
        record: { pinned, observed, error: 'containment:merge_base' }
      };
    }
  }

  const attempt_commits = await revList(
    git,
    repo,
    pinned,
    `refs/heads/${branch}`
  );
  if (attempt_commits === null) {
    return {
      violation: false,
      record: { pinned, observed, error: 'rev_list_branch' }
    };
  }
  const base_commits = await revList(git, repo, pinned, observed);
  if (base_commits === null) {
    return {
      violation: false,
      record: { pinned, observed, error: 'rev_list_base' }
    };
  }

  const on_base = new Set(base_commits);
  const shas = attempt_commits.filter((sha) => on_base.has(sha));
  if (shas.length === 0) {
    // The base moved, but not by this attempt's hand. This is the ordinary
    // case: a human merge click, another worker's merge, a user push.
    return { violation: false, record: { pinned, observed, landed: false } };
  }

  // The exclusion runs BEFORE the verdict, and its failure is not a violation:
  // a false positive costs a stopped queue and a killed session, a false
  // negative costs one unreported landing that the record still shows.
  const gh = input.gh;
  if (!gh || typeof gh.mergedPrForBranch !== 'function') {
    return {
      violation: false,
      record: { pinned, observed, shas, error: 'pr_observe:no_gh' }
    };
  }
  /** @type {{ state: string, data?: unknown, reason?: string }} */
  let pr;
  try {
    pr = await gh.mergedPrForBranch(repo, branch);
  } catch (err) {
    log('merged PR observation threw for %s: %o', branch, err);
    return {
      violation: false,
      record: { pinned, observed, shas, error: 'pr_observe:threw' }
    };
  }
  if (pr.state === 'ok') {
    return {
      violation: false,
      record: { pinned, observed, landed: true, via: 'pr_merge', shas }
    };
  }
  if (pr.state !== 'empty') {
    return {
      violation: false,
      record: {
        pinned,
        observed,
        shas,
        error: `pr_observe:${pr.reason || 'unknown'}`
      }
    };
  }

  // PER-SHA provenance: every shared commit that another unit's merged PR
  // accounts for is not this attempt's doing. This is the second half of the
  // rebase exclusion, and the half that survives a base that kept moving after
  // the rebase (the branch then no longer contains the observed tip).
  if (typeof gh.mergedPrsForCommit !== 'function') {
    return {
      violation: false,
      record: { pinned, observed, shas, error: 'pr_observe:no_gh' }
    };
  }
  if (shas.length > SHA_CAP) {
    // An observation deliberately left undone is not evidence of guilt.
    return {
      violation: false,
      record: { pinned, observed, shas, error: 'pr_observe:sha_cap' }
    };
  }
  /** @type {string[]} */
  const unexplained = [];
  for (const sha of shas) {
    /** @type {{ state: string, data?: unknown, reason?: string }} */
    let commit_pr;
    try {
      commit_pr = await gh.mergedPrsForCommit(repo, sha, resolved.base);
    } catch (err) {
      log('commit PR observation threw for %s: %o', sha, err);
      return {
        violation: false,
        record: { pinned, observed, shas, error: 'pr_observe:threw' }
      };
    }
    if (commit_pr.state === 'ok') {
      continue;
    }
    if (commit_pr.state !== 'empty') {
      return {
        violation: false,
        record: {
          pinned,
          observed,
          shas,
          error: `pr_observe:${commit_pr.reason || 'unknown'}`
        }
      };
    }
    unexplained.push(sha);
  }
  if (unexplained.length === 0) {
    return {
      violation: false,
      record: {
        pinned,
        observed,
        landed: true,
        via: 'other_pr_merge',
        shas
      }
    };
  }

  return {
    violation: true,
    record: {
      pinned,
      observed,
      landed: true,
      via: 'direct_push',
      shas: unexplained
    }
  };
}
