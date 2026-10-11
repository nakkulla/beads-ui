/**
 * The enclosed foreign landing target (dotfiles `workflow-state.yaml
 * enclosed_foreign_landing`), shared by the two delivery paths that consume it.
 *
 * `quickfix-landing.js` (push delivery) and the PR flow (verify, poller, merge
 * actions, discard, review session) read the SAME three pins and bind the SAME
 * pinned checkout, so the pin judgment and the remote lookup live here once.
 * beads-ui is a contract consumer (ADR UI-u6ud-2): the vocabulary below is a
 * hand copy, never read at runtime.
 *
 * Two entries exist on purpose (2026-10-11 foreign-pr-worker-merge spec §3.1):
 *
 *   - {@link foreignTargetFromMetadata} is PURE. The whole-list scan already
 *     carries the pins, so every observation re-derives the target from it
 *     without a `bd show` per row.
 *   - {@link readForeignTarget} re-reads the pins through `readMetadata` at the
 *     start of a state-changing operation (merge, post-merge closure, discard,
 *     review dispatch), so a pin a person just corrected decides that action.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseOriginRepo } from './gh.js';
import { branchForBead } from './worktree.js';

/**
 * The three pins, in the contract's order.
 *
 * @type {readonly ['foreign_repo', 'foreign_path', 'foreign_base']}
 */
export const FOREIGN_PIN_KEYS = Object.freeze(
  /** @type {['foreign_repo', 'foreign_path', 'foreign_base']} */ ([
    'foreign_repo',
    'foreign_path',
    'foreign_base'
  ])
);

/**
 * The contract's `failure_classes.foreign_handoff.causes`, copied by hand.
 *
 * @type {readonly string[]}
 */
export const FOREIGN_HANDOFF_CAUSES = Object.freeze([
  'foreign_deploy_unsupported',
  'foreign_conflict_needs_human',
  'foreign_pr_base_mismatch'
]);

/** The class token a handoff cause is reported under. */
export const FOREIGN_HANDOFF_CLASS = 'foreign_handoff';

/**
 * Where the Worker-owned verify candidates of a foreign target live, under the
 * target's common git dir (`enclosed_foreign_landing.delivery.pr.verify.worktree`).
 */
export const FOREIGN_VERIFY_DIR = 'bdui-verify';

/** `repo-ops/post-merge.d/` — its files are a foreign deploy stop. */
const POST_MERGE_JOB_DIR = 'repo-ops/post-merge.d';

const SHA40_RE = /^[0-9a-f]{40}$/i;

/**
 * @typedef {{ repo: string, path: string, base: string }} ForeignPins
 * The three pins after the shape judgment: `repo` is the URL as written,
 * `path` the expanded absolute checkout path, `base` the branch name.
 */

/**
 * @typedef {Object} ForeignPrTarget
 * @property {string} repo_url - `foreign_repo` exactly as pinned.
 * @property {string} path - The expanded, normalized `foreign_path`.
 * @property {string} base - `foreign_base`.
 * @property {string} slug - gh's `--repo` spelling (`owner/repo` on
 * github.com, `host/owner/repo` elsewhere).
 * @property {string} repo_name - The repository name alone, for labels.
 * @property {number|null} [pr_number] - The PR number parsed from the SAME
 * `pr_url` the detection judged, so the slug and the number can never come
 * from two different records; null when that url is not a PR url.
 * @property {string|null} [pr_url] - That `pr_url`.
 */

/**
 * @typedef {ForeignPrTarget & { remote: string }} BoundForeignTarget
 * A target whose pinned checkout was bound: `remote` is the remote of
 * `foreign_path` whose URL names the same repository as `foreign_repo`.
 */

/**
 * @typedef {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} GitRun
 */

/**
 * Parse a pull-request URL STRICTLY: exactly `https://<host>/<owner>/<repo>/pull/<n>`.
 * The slug is spelled the way gh spells `--repo`, so it compares directly with
 * {@link parseOriginRepo}'s output.
 *
 * @param {unknown} raw
 * @returns {{ slug: string, number: number }|null}
 */
export function parsePrUrlStrict(raw) {
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
  // keeps `pr.url` equality an exact string comparison.
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
 * The repository a remote URL (scp, ssh or https) or a PR URL names, in gh's
 * `--repo` spelling; `.git` is dropped. Null when it names none.
 *
 * @param {unknown} raw
 * @returns {string|null}
 */
export function repositorySlugOf(raw) {
  if (typeof raw !== 'string' || raw.trim().length === 0) {
    return null;
  }
  const pr = parsePrUrlStrict(raw);
  if (pr !== null) {
    return pr.slug;
  }
  return parseOriginRepo(raw);
}

/**
 * Whether two URLs name the same host/owner/repo, compared case-insensitively
 * (`enclosed_foreign_landing.delivery.pr.detection.normalize`).
 *
 * @param {unknown} left
 * @param {unknown} right
 * @returns {boolean}
 */
export function sameRepository(left, right) {
  const a = repositorySlugOf(left);
  const b = repositorySlugOf(right);
  return a !== null && b !== null && a.toLowerCase() === b.toLowerCase();
}

/**
 * Expand a leading `~` the way the session wrote it.
 *
 * @param {string} raw
 * @returns {string}
 */
function expandHome(raw) {
  return raw === '~' || raw.startsWith('~/')
    ? path.join(os.homedir(), raw.slice(1))
    : raw;
}

/**
 * The shape judgment of the three pins, everything except the git branch-name
 * check. `foreign_repo` alone decides whether a landing is foreign at all;
 * once it is, every pin is required and a missing or malformed one names
 * itself (UI-jf33).
 *
 * @param {Record<string, unknown>} raw
 * @returns {{ ok: true, foreign: ForeignPins|null }|{ ok: false, reason: string }}
 */
export function judgeForeignPinShape(raw) {
  /** @type {Record<'foreign_repo'|'foreign_path'|'foreign_base', string>} */
  const pins = { foreign_repo: '', foreign_path: '', foreign_base: '' };
  for (const key of FOREIGN_PIN_KEYS) {
    const value = raw ? raw[key] : undefined;
    pins[key] = typeof value === 'string' ? value.trim() : '';
  }
  if (
    pins.foreign_repo.length === 0 &&
    pins.foreign_path.length === 0 &&
    pins.foreign_base.length === 0
  ) {
    return { ok: true, foreign: null };
  }
  if (pins.foreign_repo.length === 0) {
    return { ok: false, reason: 'foreign_landing_unpinned:foreign_repo' };
  }
  const expanded = expandHome(pins.foreign_path);
  if (expanded.length === 0 || !path.isAbsolute(expanded)) {
    return { ok: false, reason: 'foreign_landing_unpinned:foreign_path' };
  }
  if (pins.foreign_base.length === 0 || /\s/.test(pins.foreign_base)) {
    return { ok: false, reason: 'foreign_landing_unpinned:foreign_base' };
  }
  return {
    ok: true,
    foreign: {
      repo: pins.foreign_repo,
      path: path.normalize(expanded),
      base: pins.foreign_base
    }
  };
}

/**
 * Read and judge the three pins through bd, with git judging the branch name
 * (`foo..bar`, `.hidden`, `main.lock` are all refused). The `cwd` is only a
 * place to run a repo-independent command from.
 *
 * A read OUTAGE is `bd_read_failed`, never "unpinned".
 *
 * @param {{ readMetadata: (bead_id: string, key: string) => Promise<string|null>, gitRun: GitRun, cwd: string, log?: (...args: any[]) => void }} deps
 * @param {string} bead_id
 * @returns {Promise<{ ok: true, foreign: ForeignPins|null }|{ ok: false, reason: string }>}
 */
export async function readForeignPins(deps, bead_id) {
  const log = deps.log || (() => {});
  /** @type {Record<string, string|null>} */
  const raw = {};
  for (const key of FOREIGN_PIN_KEYS) {
    try {
      raw[key] = await deps.readMetadata(bead_id, key);
    } catch (err) {
      log('%s readback failed for %s: %o', key, bead_id, err);
      return { ok: false, reason: 'bd_read_failed' };
    }
  }
  const shaped = judgeForeignPinShape(raw);
  if (!shaped.ok || shaped.foreign === null) {
    return shaped;
  }
  if (!(await branchNameValid(deps, shaped.foreign.base, bead_id))) {
    return { ok: false, reason: 'foreign_landing_unpinned:foreign_base' };
  }
  return shaped;
}

/**
 * @param {{ gitRun: GitRun, cwd: string, log?: (...args: any[]) => void }} deps
 * @param {string} base
 * @param {string} bead_id
 * @returns {Promise<boolean>}
 */
async function branchNameValid(deps, base, bead_id) {
  try {
    const checked = await deps.gitRun(
      ['check-ref-format', `refs/heads/${base}`],
      { cwd: deps.cwd }
    );
    return checked.code === 0;
  } catch (err) {
    (deps.log || (() => {}))(
      'foreign_base check failed for %s: %o',
      bead_id,
      err
    );
    return false;
  }
}

/**
 * The PR-delivery detection over judged pins (`delivery.pr.detection`): the
 * pins exist AND `pr_url` names the pinned repository.
 *
 * @param {ForeignPins} foreign
 * @param {unknown} pr_url
 * @returns {{ ok: true, target: ForeignPrTarget }|{ ok: false, reason: string }}
 */
export function foreignPrTargetOf(foreign, pr_url) {
  const slug = repositorySlugOf(foreign.repo);
  if (slug === null) {
    return { ok: false, reason: 'foreign_landing_unpinned:foreign_repo' };
  }
  if (!sameRepository(foreign.repo, pr_url)) {
    return { ok: false, reason: 'foreign_pr_repo_mismatch' };
  }
  const parsed = parsePrUrlStrict(pr_url);
  return {
    ok: true,
    target: {
      repo_url: foreign.repo,
      path: foreign.path,
      base: foreign.base,
      slug,
      repo_name: slug.split('/').at(-1) || slug,
      pr_number: parsed === null ? null : parsed.number,
      pr_url: parsed === null ? null : String(pr_url).trim()
    }
  };
}

/**
 * The PR number a state-reading or state-changing call on a pinned foreign PR
 * uses: the target's own, parsed from the one `pr_url` the detection judged.
 * The Worker's durable reference (an attempt's recorded PR, a `pr_wait` row's
 * url) must name the SAME PR; when it does not — the pins and `pr_url` moved
 * from `A#4` to `B#8` while an attempt still records `#4` — the call is
 * refused before any gh call, since pairing one record's slug with another's
 * number reads or changes a different PR (UI-k467 §4-3).
 *
 * A missing durable reference is no disagreement: an attempt-less row's only
 * record IS the Bead's `pr_url`.
 *
 * @param {ForeignPrTarget} target
 * @param {{ number: number, url?: string|null }|null} ref
 * @returns {{ ok: true, number: number }|{ ok: false, reason: string }}
 */
export function foreignPrRefOf(target, ref) {
  const number = target.pr_number;
  if (typeof number !== 'number' || !Number.isSafeInteger(number)) {
    return { ok: false, reason: 'pr_ref_unknown' };
  }
  if (ref === null) {
    return { ok: true, number };
  }
  if (ref.number !== number) {
    return { ok: false, reason: 'foreign_pr_ref_mismatch' };
  }
  const url = typeof ref.url === 'string' ? ref.url.trim() : '';
  if (url.length > 0) {
    const parsed = parsePrUrlStrict(url);
    if (
      parsed === null ||
      parsed.number !== number ||
      parsed.slug.toLowerCase() !== target.slug.toLowerCase()
    ) {
      return { ok: false, reason: 'foreign_pr_ref_mismatch' };
    }
  }
  return { ok: true, number };
}

/**
 * The PURE observation-side entry: judge the pins a scan carried against the
 * `pr_url` it carried. The git branch-name check is left to the state-changing
 * side's {@link readForeignTarget}; a name git refuses fails there before any
 * effect.
 *
 * @param {Record<string, unknown>|null|undefined} metadata
 * @param {unknown} pr_url
 * @returns {{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: ForeignPrTarget }}
 */
export function foreignTargetFromMetadata(metadata, pr_url) {
  const shaped = judgeForeignPinShape(metadata || {});
  if (!shaped.ok) {
    return { state: 'invalid', reason: shaped.reason };
  }
  if (shaped.foreign === null) {
    return { state: 'none' };
  }
  const detected = foreignPrTargetOf(shaped.foreign, pr_url);
  return detected.ok
    ? { state: 'ok', target: detected.target }
    : { state: 'invalid', reason: detected.reason };
}

/**
 * The state-changing entry: re-read the pins (and `pr_url`, unless the caller
 * holds a fresher one) through bd and judge them. With `readIssue` the pins and
 * `pr_url` come from ONE `bd show`; otherwise each key is a `readMetadata`.
 *
 * @param {{ readMetadata: (bead_id: string, key: string) => Promise<string|null>, readIssue?: (bead_id: string) => Promise<Record<string, any>>, gitRun: GitRun, cwd: string, log?: (...args: any[]) => void }} deps
 * @param {string} bead_id
 * @param {string|null} [pr_url]
 * @returns {Promise<{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: ForeignPrTarget }>}
 */
export async function readForeignTarget(deps, bead_id, pr_url = null) {
  if (typeof deps.readIssue === 'function') {
    /** @type {Record<string, any>} */
    let metadata;
    try {
      const issue = await deps.readIssue(bead_id);
      metadata =
        issue && issue.metadata && typeof issue.metadata === 'object'
          ? issue.metadata
          : {};
    } catch {
      return { state: 'invalid', reason: 'bd_read_failed' };
    }
    return judgeForeignTargetMetadata(deps, metadata, bead_id, pr_url);
  }
  const pins = await readForeignPins(deps, bead_id);
  if (!pins.ok) {
    return { state: 'invalid', reason: pins.reason };
  }
  if (pins.foreign === null) {
    return { state: 'none' };
  }
  let url = pr_url;
  if (typeof url !== 'string' || url.length === 0) {
    try {
      url = await deps.readMetadata(bead_id, 'pr_url');
    } catch {
      return { state: 'invalid', reason: 'bd_read_failed' };
    }
  }
  const detected = foreignPrTargetOf(pins.foreign, url);
  return detected.ok
    ? { state: 'ok', target: detected.target }
    : { state: 'invalid', reason: detected.reason };
}

/**
 * Judge the pins of ONE Bead read the caller already made (`bd show`
 * metadata), with git judging the branch name — so an action that has just
 * read the Bead for another reason spends no second read on its pins.
 *
 * @param {{ gitRun: GitRun, cwd: string, log?: (...args: any[]) => void }} deps
 * @param {Record<string, any>} metadata
 * @param {string} bead_id
 * @param {string|null} [pr_url] - A url the caller holds; else the metadata's.
 * @returns {Promise<{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: ForeignPrTarget }>}
 */
export async function judgeForeignTargetMetadata(
  deps,
  metadata,
  bead_id,
  pr_url = null
) {
  const shaped = judgeForeignPinShape(metadata);
  if (!shaped.ok) {
    return { state: 'invalid', reason: shaped.reason };
  }
  if (shaped.foreign === null) {
    return { state: 'none' };
  }
  if (!(await branchNameValid(deps, shaped.foreign.base, bead_id))) {
    return {
      state: 'invalid',
      reason: 'foreign_landing_unpinned:foreign_base'
    };
  }
  const detected = foreignPrTargetOf(
    shaped.foreign,
    typeof pr_url === 'string' && pr_url.length > 0 ? pr_url : metadata.pr_url
  );
  return detected.ok
    ? { state: 'ok', target: detected.target }
    : { state: 'invalid', reason: detected.reason };
}

/**
 * Bind the pinned checkout: it must be a git checkout, and one of its remotes
 * must name the pinned repository — that remote, not `origin`, is what the
 * base is fetched from.
 *
 * `match: 'exact'` compares the remote URL verbatim with the pin (the push
 * delivery's historical rule, unchanged); `'repository'` compares the
 * normalized host/owner/repo the PR delivery's detection uses.
 *
 * @param {{ repo: string, path: string }} foreign
 * @param {GitRun} gitRun
 * @param {{ match?: 'exact'|'repository', log?: (...args: any[]) => void }} [options]
 * @returns {Promise<{ ok: true, remote: string }|{ ok: false, reason: 'foreign_checkout_unavailable' }>}
 */
export async function resolveForeignRemote(foreign, gitRun, options = {}) {
  const match = options.match || 'exact';
  try {
    const top = await gitRun(['rev-parse', '--show-toplevel'], {
      cwd: foreign.path
    });
    if (top.code !== 0) {
      return { ok: false, reason: 'foreign_checkout_unavailable' };
    }
    const remotes = await gitRun(['remote'], { cwd: foreign.path });
    if (remotes.code !== 0) {
      return { ok: false, reason: 'foreign_checkout_unavailable' };
    }
    for (const name of remotes.stdout.split(/\r?\n/)) {
      const remote = name.trim();
      if (remote.length === 0) {
        continue;
      }
      const url = await gitRun(['remote', 'get-url', remote], {
        cwd: foreign.path
      });
      if (url.code !== 0) {
        continue;
      }
      const observed = url.stdout.trim();
      if (
        match === 'exact'
          ? observed === foreign.repo
          : sameRepository(observed, foreign.repo)
      ) {
        return { ok: true, remote };
      }
    }
    return { ok: false, reason: 'foreign_checkout_unavailable' };
  } catch (err) {
    (options.log || (() => {}))(
      'foreign checkout unavailable at %s: %o',
      foreign.path,
      err
    );
    return { ok: false, reason: 'foreign_checkout_unavailable' };
  }
}

/**
 * Bind a PR target's checkout (repository-normalized remote match).
 *
 * @param {ForeignPrTarget} target
 * @param {GitRun} gitRun
 * @returns {Promise<{ ok: true, target: BoundForeignTarget }|{ ok: false, reason: string }>}
 */
export async function bindForeignTarget(target, gitRun) {
  const bound = await resolveForeignRemote(
    { repo: target.repo_url, path: target.path },
    gitRun,
    { match: 'repository' }
  );
  if (!bound.ok) {
    return bound;
  }
  return { ok: true, target: { ...target, remote: bound.remote } };
}

/**
 * Fetch the foreign base into `FETCH_HEAD` and resolve it — the push
 * delivery's form. A fetch moves no local branch.
 *
 * @param {{ path: string, base: string }} foreign
 * @param {string} remote
 * @param {GitRun} gitRun
 * @returns {Promise<{ ok: true, sha: string }|{ ok: false }>}
 */
export async function fetchForeignBase(foreign, remote, gitRun) {
  try {
    const fetched = await gitRun(['fetch', '--no-tags', remote, foreign.base], {
      cwd: foreign.path
    });
    if (fetched.code !== 0) {
      return { ok: false };
    }
    // `FETCH_HEAD` is the commit this fetch just brought in; a remote-tracking
    // ref can lag it under a custom refspec.
    const rev = await gitRun(['rev-parse', 'FETCH_HEAD'], {
      cwd: foreign.path
    });
    const sha = rev.stdout.trim();
    if (rev.code !== 0 || !SHA40_RE.test(sha)) {
      return { ok: false };
    }
    return { ok: true, sha };
  } catch {
    return { ok: false };
  }
}

/**
 * Fetch the PR target's base into its remote-tracking ref with an explicit
 * refspec, so `refs/remotes/<remote>/<base>` names exactly the fetched tip the
 * verify candidate is checked against.
 *
 * @param {BoundForeignTarget} target
 * @param {GitRun} gitRun
 * @returns {Promise<{ ok: true, sha: string }|{ ok: false }>}
 */
export async function fetchForeignBaseTip(target, gitRun) {
  const tracking = `refs/remotes/${target.remote}/${target.base}`;
  try {
    const fetched = await gitRun(
      [
        'fetch',
        '--no-tags',
        target.remote,
        `+refs/heads/${target.base}:${tracking}`
      ],
      { cwd: target.path }
    );
    if (fetched.code !== 0) {
      return { ok: false };
    }
    const rev = await gitRun(['rev-parse', `${tracking}^{commit}`], {
      cwd: target.path
    });
    const sha = rev.stdout.trim();
    if (rev.code !== 0 || !SHA40_RE.test(sha)) {
      return { ok: false };
    }
    return { ok: true, sha: sha.toLowerCase() };
  } catch {
    return { ok: false };
  }
}

/**
 * Whether a tree-ish carries any file under `repo-ops/post-merge.d/`.
 *
 * @param {string} repo
 * @param {string} tree_ish
 * @param {GitRun} gitRun
 * @returns {Promise<boolean|null>} null when the listing could not be read.
 */
export async function hasPostMergeJobs(repo, tree_ish, gitRun) {
  try {
    const listed = await gitRun(
      [
        'ls-tree',
        '-r',
        '--name-only',
        tree_ish,
        '--',
        `${POST_MERGE_JOB_DIR}/`
      ],
      { cwd: repo }
    );
    if (listed.code !== 0) {
      return null;
    }
    return listed.stdout.trim().length > 0;
  } catch {
    return null;
  }
}

/**
 * The tree GitHub's squash merge would produce: the PR head merged onto the
 * base tip, computed without a worktree. Null on a conflict or a git error.
 *
 * @param {string} repo
 * @param {string} base_sha
 * @param {string} head_sha
 * @param {GitRun} gitRun
 * @returns {Promise<string|null>}
 */
export async function candidateTreeOf(repo, base_sha, head_sha, gitRun) {
  try {
    const merged = await gitRun(
      ['merge-tree', '--write-tree', base_sha, head_sha],
      { cwd: repo }
    );
    const tree = merged.stdout.split(/\r?\n/)[0].trim();
    return merged.code === 0 && SHA40_RE.test(tree) ? tree : null;
  } catch {
    return null;
  }
}

/**
 * Make sure a commit is present in the target checkout, fetching it from the
 * bound remote (by sha, then by the PR's pull ref) when it is not.
 *
 * @param {BoundForeignTarget} target
 * @param {string} sha
 * @param {number|null} pr_number
 * @param {GitRun} gitRun
 * @returns {Promise<boolean>}
 */
export async function ensureForeignCommit(target, sha, pr_number, gitRun) {
  /** @param {string[]} args */
  const run = async (args) => {
    try {
      return (await gitRun(args, { cwd: target.path })).code;
    } catch {
      return null;
    }
  };
  const present = async () =>
    (await run(['cat-file', '-e', `${sha}^{commit}`])) === 0;
  if (await present()) {
    return true;
  }
  await run(['fetch', '--no-tags', target.remote, sha]);
  if (await present()) {
    return true;
  }
  if (Number.isInteger(pr_number)) {
    await run(['fetch', '--no-tags', target.remote, `pull/${pr_number}/head`]);
  }
  return present();
}

/**
 * The Worker-owned candidate root under the target's common git dir.
 *
 * @param {string} repo
 * @param {GitRun} gitRun
 * @returns {Promise<string|null>}
 */
export async function foreignCandidateRoot(repo, gitRun) {
  try {
    const common = await gitRun(['rev-parse', '--git-common-dir'], {
      cwd: repo
    });
    if (common.code !== 0 || common.stdout.trim().length === 0) {
      return null;
    }
    const dir = path.resolve(repo, common.stdout.trim());
    return path.join(dir, FOREIGN_VERIFY_DIR);
  } catch {
    return null;
  }
}

/**
 * Whether a path is one of the Worker-owned candidates — directly under a
 * `<common git dir>/bdui-verify/` directory — and, when so, that common git
 * dir. Anything else is never removed by the candidate cleanup.
 *
 * @param {unknown} candidate_path
 * @returns {string|null}
 */
export function foreignCandidateCommonDir(candidate_path) {
  if (typeof candidate_path !== 'string' || candidate_path.length === 0) {
    return null;
  }
  const resolved = path.resolve(candidate_path);
  const parent = path.dirname(resolved);
  if (path.basename(parent) !== FOREIGN_VERIFY_DIR) {
    return null;
  }
  if (path.basename(resolved).length === 0) {
    return null;
  }
  return path.dirname(parent);
}

/**
 * The owner marker sits NEXT TO a candidate (`<candidate>.owner.json`), never
 * inside it, so the candidate tree the verify script sees stays exactly the
 * squash tree. Several rig workspaces can verify the same target, so the
 * shared `bdui-verify/` holds candidates of more than one Worker.
 */
export const FOREIGN_CANDIDATE_OWNER_SUFFIX = '.owner.json';

/**
 * @param {string} candidate_path
 * @returns {string}
 */
export function foreignCandidateOwnerPath(candidate_path) {
  return `${candidate_path}${FOREIGN_CANDIDATE_OWNER_SUFFIX}`;
}

/**
 * Record which workspace created a candidate (written before the worktree
 * exists, so a crash never leaves an unowned candidate of this Worker).
 *
 * @param {Pick<typeof import('node:fs'), 'writeFileSync'>} fs_impl
 * @param {string} candidate_path
 * @param {string} workspace
 */
export function writeForeignCandidateOwner(fs_impl, candidate_path, workspace) {
  fs_impl.writeFileSync(
    foreignCandidateOwnerPath(candidate_path),
    `${JSON.stringify({ workspace })}\n`
  );
}

/**
 * The workspace a candidate's marker names; null when the marker is absent or
 * unreadable — an unknown owner, which a sweep must leave alone.
 *
 * @param {Pick<typeof import('node:fs'), 'readFileSync'>} fs_impl
 * @param {string} candidate_path
 * @returns {string|null}
 */
export function readForeignCandidateOwner(fs_impl, candidate_path) {
  try {
    const parsed = JSON.parse(
      String(fs_impl.readFileSync(foreignCandidateOwnerPath(candidate_path)))
    );
    return parsed && typeof parsed.workspace === 'string'
      ? parsed.workspace
      : null;
  } catch {
    return null;
  }
}

/**
 * The owned residue a foreign PR leaves in its target
 * (`delivery.pr.residue_cleanup.owned`, minus the rig half the caller owns):
 * the target `.worktrees/<bead-id>` and local `<bead-id>` branch, and the
 * remote head branch — each only while it still points at the pinned head.
 * A dirty or unknown state is KEPT. Every failure is a warning: the result
 * lists what stayed and never blocks the caller.
 *
 * @param {{ target: BoundForeignTarget, bead_id: string, head_sha: string|null, head_ref: string|null, gitRun: GitRun, withLock?: <T>(fn: () => Promise<T>) => Promise<T> }} input
 * @returns {Promise<{ removed: string[], kept: string[] }>}
 */
export async function cleanupForeignResidue(input) {
  const { target, gitRun } = input;
  const head =
    typeof input.head_sha === 'string' && SHA40_RE.test(input.head_sha)
      ? input.head_sha.toLowerCase()
      : null;
  const branch = branchForBead(input.bead_id);
  /** @type {string[]} */
  const removed = [];
  /** @type {string[]} */
  const kept = [];
  /**
   * @param {string[]} args
   * @param {string} [cwd]
   */
  const run = async (args, cwd = target.path) => {
    try {
      return await gitRun(args, { cwd });
    } catch {
      return { code: -1, stdout: '', stderr: '' };
    }
  };
  const work = async () => {
    if (head === null) {
      kept.push('head_unknown');
      return;
    }
    const wt = path.join(target.path, '.worktrees', input.bead_id);
    let wt_present = false;
    try {
      wt_present = fs.existsSync(wt);
    } catch {
      wt_present = true;
    }
    let wt_gone = !wt_present;
    if (wt_present) {
      const status = await run(
        ['status', '--porcelain', '--untracked-files=all'],
        wt
      );
      const wt_head = await run(['rev-parse', 'HEAD'], wt);
      if (
        status.code === 0 &&
        status.stdout.trim().length === 0 &&
        wt_head.code === 0 &&
        wt_head.stdout.trim().toLowerCase() === head
      ) {
        const gone = await run(['worktree', 'remove', wt]);
        wt_gone = gone.code === 0;
        (wt_gone ? removed : kept).push(`worktree:${wt}`);
      } else {
        kept.push(`worktree:${wt}`);
      }
    }
    const local = await run([
      'rev-parse',
      '--verify',
      '--quiet',
      `refs/heads/${branch}`
    ]);
    if (local.code === 0) {
      if (wt_gone && local.stdout.trim().toLowerCase() === head) {
        const deleted = await run(['branch', '-D', branch]);
        (deleted.code === 0 ? removed : kept).push(`branch:${branch}`);
      } else {
        kept.push(`branch:${branch}`);
      }
    }
    const head_ref =
      typeof input.head_ref === 'string' && input.head_ref.length > 0
        ? input.head_ref
        : branch;
    const listed = await run(['ls-remote', '--heads', target.remote, head_ref]);
    const line = listed.code === 0 ? listed.stdout.trim() : '';
    if (listed.code !== 0) {
      kept.push(`remote:${head_ref}`);
    } else if (line.length > 0) {
      if (line.split(/\s+/)[0].toLowerCase() === head) {
        // The lease makes the delete atomic with the head check: a commit
        // pushed after `ls-remote` makes the remote refuse, and the branch is
        // kept (spec §3.6-4 "only while it still points at the pinned head").
        const pushed = await run([
          'push',
          `--force-with-lease=refs/heads/${head_ref}:${head}`,
          target.remote,
          '--delete',
          head_ref
        ]);
        (pushed.code === 0 ? removed : kept).push(`remote:${head_ref}`);
      } else {
        kept.push(`remote:${head_ref}`);
      }
    }
  };
  try {
    if (typeof input.withLock === 'function') {
      await input.withLock(work);
    } else {
      await work();
    }
  } catch {
    kept.push('cleanup_error');
  }
  return { removed, kept };
}

/**
 * Whether a PR detail is in genuine conflict (`CONFLICTING` or `DIRTY`).
 *
 * @param {{ mergeable?: string, merge_state_status?: string }} pr
 * @returns {boolean}
 */
function prConflicting(pr) {
  return pr.mergeable === 'CONFLICTING' || pr.merge_state_status === 'DIRTY';
}

/**
 * The pre-merge judgment of an OPEN foreign PR (spec §3.4, §3.5, §3.7): the
 * three `foreign_handoff` causes in the order a person fixes them, then the
 * target `[verify]` policy of the fetched `foreign_base` tip.
 *
 *   - PR base ≠ `foreign_base` → `foreign_pr_base_mismatch` (never retargeted),
 *   - CONFLICTING/DIRTY → `foreign_conflict_needs_human` (no resolver),
 *   - the fetched base tip declares `[deploy]`, or the candidate tree (PR head
 *     merged onto that tip) carries `repo-ops/post-merge.d/` files →
 *     `foreign_deploy_unsupported`.
 *
 * An observation it cannot complete is `{ ok: false, reason }`, never a pass.
 *
 * @param {{ target: BoundForeignTarget, pr: { number?: number|null, base_ref?: string, head_sha?: string, mergeable?: string, merge_state_status?: string }, gitRun: GitRun, resolveRepoOps: (input: { repo: string, sha: string, gitRun: GitRun }) => Promise<any> }} input
 * @returns {Promise<{ ok: true, handoff: string|null, base_sha: string|null, verify_script_path: string|null }|{ ok: false, reason: string }>}
 */
export async function judgeForeignPreMerge(input) {
  const { target, pr, gitRun } = input;
  if (String(pr.base_ref || '').trim() !== target.base) {
    return {
      ok: true,
      handoff: 'foreign_pr_base_mismatch',
      base_sha: null,
      verify_script_path: null
    };
  }
  if (prConflicting(pr)) {
    return {
      ok: true,
      handoff: 'foreign_conflict_needs_human',
      base_sha: null,
      verify_script_path: null
    };
  }
  const tip = await fetchForeignBaseTip(target, gitRun);
  if (!tip.ok) {
    return { ok: false, reason: 'base_fetch_failed' };
  }
  /** @type {any} */
  let policy;
  try {
    policy = await input.resolveRepoOps({
      repo: target.path,
      sha: tip.sha,
      gitRun
    });
  } catch {
    return { ok: false, reason: 'repo_ops_config_invalid' };
  }
  if (policy && policy.ok === false) {
    return { ok: false, reason: policy.code || 'repo_ops_config_invalid' };
  }
  if (policy.deploy) {
    return {
      ok: true,
      handoff: 'foreign_deploy_unsupported',
      base_sha: tip.sha,
      verify_script_path: null
    };
  }
  const head = typeof pr.head_sha === 'string' ? pr.head_sha : '';
  if (
    !SHA40_RE.test(head) ||
    !(await ensureForeignCommit(
      target,
      head,
      typeof pr.number === 'number' ? pr.number : null,
      gitRun
    ))
  ) {
    return { ok: false, reason: 'verify_head_sha_unobserved' };
  }
  const tree = await candidateTreeOf(target.path, tip.sha, head, gitRun);
  if (tree === null) {
    return { ok: false, reason: 'verify_candidate_materialize_failed' };
  }
  const jobs = await hasPostMergeJobs(target.path, tree, gitRun);
  if (jobs === null) {
    return { ok: false, reason: 'post_merge_jobs_unreadable' };
  }
  if (jobs) {
    return {
      ok: true,
      handoff: 'foreign_deploy_unsupported',
      base_sha: tip.sha,
      verify_script_path: null
    };
  }
  return {
    ok: true,
    handoff: null,
    base_sha: tip.sha,
    verify_script_path:
      policy.verify && typeof policy.verify.script === 'string'
        ? policy.verify.script
        : null
  };
}

/**
 * The post-merge re-judgment (spec §3.6 step 2): the merge SHA's FIRST parent
 * owns the declaration (never the merge SHA's own), the merge SHA's tree owns
 * the `post-merge.d` question.
 *
 * @param {{ target: BoundForeignTarget, merge_sha: string, gitRun: GitRun, resolveRepoOps: (input: { repo: string, sha: string, gitRun: GitRun }) => Promise<any> }} input
 * @returns {Promise<{ ok: true, handoff: string|null, first_parent: string, verify_script_path: string|null }|{ ok: false, reason: string }>}
 */
export async function judgeForeignPostMerge(input) {
  const { target, gitRun } = input;
  /** @type {{ code: number, stdout: string }} */
  let parent;
  try {
    parent = await gitRun(['rev-parse', `${input.merge_sha}^1`], {
      cwd: target.path
    });
  } catch {
    parent = { code: 1, stdout: '' };
  }
  const first_parent = parent.stdout.trim().toLowerCase();
  if (parent.code !== 0 || !SHA40_RE.test(first_parent)) {
    return { ok: false, reason: 'verify_candidate_mismatch' };
  }
  /** @type {any} */
  let policy;
  try {
    policy = await input.resolveRepoOps({
      repo: target.path,
      sha: first_parent,
      gitRun
    });
  } catch {
    return { ok: false, reason: 'repo_ops_config_invalid' };
  }
  if (policy && policy.ok === false) {
    return { ok: false, reason: policy.code || 'repo_ops_config_invalid' };
  }
  if (policy.deploy) {
    return {
      ok: true,
      handoff: 'foreign_deploy_unsupported',
      first_parent,
      verify_script_path: null
    };
  }
  const jobs = await hasPostMergeJobs(target.path, input.merge_sha, gitRun);
  if (jobs === null) {
    return { ok: false, reason: 'post_merge_jobs_unreadable' };
  }
  if (jobs) {
    return {
      ok: true,
      handoff: 'foreign_deploy_unsupported',
      first_parent,
      verify_script_path: null
    };
  }
  return {
    ok: true,
    handoff: null,
    first_parent,
    verify_script_path:
      policy.verify && typeof policy.verify.script === 'string'
        ? policy.verify.script
        : null
  };
}
