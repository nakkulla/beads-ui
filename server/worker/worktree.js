/**
 * Per-bead git worktree lifecycle (spec §5.2, §5.5).
 *
 * Each session runs in a dedicated `.worktrees/<bead-id>` created from a pinned
 * base commit and removed on cleanup. All worktree add/remove operations are
 * serialized through the repo git-topology lock (layer 2), together with
 * deploy-target fetch/ref resolution, so concurrent sessions never race the
 * same repo's ref database. {@link
 * createWorktreeManager}'s `withTopologyLock` exposes that same lock to the
 * modules that run their own ref-mutating git commands (`pr-actions`'s base
 * sync + branch cleanup, `verify-cmd`'s PR-head fetch).
 *
 * This NEVER installs to live runtime dirs (`~/.claude`, shared service dirs) —
 * it only manipulates worktrees inside the target repo.
 */
import { createHash } from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { runShell } from '../bd.js';
import { repoOpsDeployWorktreeJournalPath } from './state-paths.js';

/**
 * @typedef {(args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>} GitRunner
 */
/**
 * @typedef {'absent'|'discardable'|'base_contained'|'unique'|'unknown'} WorktreeObservationState
 */
/**
 * @typedef {Object} WorktreeIdentity
 * @property {string|null} worktree_realpath
 * @property {string|null} branch
 * @property {string|null} head_sha
 * @property {string|null} [branch_head_sha]
 * @property {string|null} base_oid
 * @property {string} status_digest
 */
/**
 * @typedef {Object} WorktreeSummary
 * @property {number} staged_count
 * @property {number} unstaged_count
 * @property {number} untracked_count
 * @property {number} branch_ahead
 * @property {number} head_ahead
 */
/**
 * @typedef {Object} WorktreeObservation
 * @property {boolean} ok
 * @property {WorktreeObservationState} state
 * @property {boolean} removed
 * @property {string|null} reason
 * @property {string|null} cause
 * @property {boolean} owned
 * @property {WorktreeIdentity} identity
 * @property {WorktreeSummary} summary
 */
/**
 * @typedef {Object} WorktreeChangedPaths
 * @property {string[]} staged
 * @property {string[]} unstaged
 */
/**
 * @typedef {WorktreeObservation & { paths: WorktreeChangedPaths, ahead_contained?: boolean }} InternalWorktreeObservation
 */
/**
 * @typedef {Object} WorktreePathState
 * @property {string} mode
 * @property {string} oid
 */

/**
 * The branch a bead's session works on: the bead id itself (`add` creates it
 * with `-B <bead_id>`). Observers of that branch — the PR observation verdict
 * (worker-phase2 §1) — resolve it through here instead of re-deriving the
 * convention, so the naming rule has exactly one owner.
 *
 * @param {string} bead_id
 * @returns {string}
 */
export function branchForBead(bead_id) {
  return bead_id;
}

/**
 * Parse a `rev-list --count` result. Anything that is not a plain integer —
 * including a nonzero exit — reads as "unobserved" rather than zero, so a
 * failed observation can never be mistaken for "no unique commits".
 *
 * @param {{ code: number, stdout: string }} result
 * @returns {number|null}
 */
function parseCount(result) {
  if (result.code !== 0) {
    return null;
  }
  const text = result.stdout.trim();
  return /^\d+$/.test(text) ? Number(text) : null;
}

/**
 * Split `git worktree list --porcelain -z` output into records.
 *
 * `-z` rather than plain `--porcelain` (UI-u7hh §2): attributes are terminated
 * by NUL and records separated by an empty attribute, so a repo path containing
 * a newline can never be mistaken for a record boundary. Attributes other than
 * `worktree` and `branch` (`HEAD`, `detached`, `prunable`, `locked`) carry
 * nothing this lookup needs — a `detached` record simply has no `branch`, which
 * is what keeps `.worktrees/.verify/`'s worker-owned worktrees unmatchable.
 *
 * @param {string} stdout
 * @returns {{ path: string, branch: string|null }[]}
 */
function parseWorktreeRecords(stdout) {
  /** @type {{ path: string, branch: string|null }[]} */
  const records = [];
  /** @type {{ path: string, branch: string|null }|null} */
  let current = null;
  for (const attr of stdout.split('\0')) {
    if (attr === '') {
      if (current) {
        records.push(current);
        current = null;
      }
      continue;
    }
    const sep = attr.indexOf(' ');
    const key = sep === -1 ? attr : attr.slice(0, sep);
    const value = sep === -1 ? '' : attr.slice(sep + 1);
    if (key === 'worktree') {
      if (current) {
        records.push(current);
      }
      current = { path: value, branch: null };
    } else if (current && key === 'branch') {
      current.branch = value;
    }
  }
  if (current) {
    records.push(current);
  }
  return records;
}

/**
 * Whether `wt` is a worktree this worker owns and may force-remove (UI-u7hh
 * §1).
 *
 * The name computation this lookup replaces WAS the boundary — {@link
 * createWorktreeManager}'s `pathFor` cannot address anything outside
 * `repo/.worktrees/<bead_id>`. A real `git worktree list` returns every
 * worktree attached to the repo, including ones a person created for their own
 * work, and `remove --force` on one of those is not recoverable. So the two
 * conditions the contract's own naming rule guarantees are required back:
 *
 * 1. directly under `repo/.worktrees/` — by `path.relative`, not a string
 *    prefix, which a sibling like `.worktrees-backup/` would satisfy;
 * 2. `basename === branch`, the routing invariant every route holds. The
 *    collision fallback `<bead-id>-<YYYYMMDD>` names worktree and branch
 *    alike, so this admits exactly the case UI-u7hh exists to fix.
 *
 * @param {string} repo
 * @param {string} wt
 * @param {string} branch
 * @returns {boolean}
 */
function isOwnedWorktree(repo, wt, branch) {
  const rel = path.relative(path.join(repo, '.worktrees'), wt);
  if (rel === '' || rel.startsWith('..') || path.isAbsolute(rel)) {
    return false;
  }
  if (rel.includes(path.sep)) {
    return false;
  }
  return path.basename(wt) === branch;
}

/**
 * @param {string} value
 * @returns {string}
 */
function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

/**
 * Parse `git status --porcelain=v2 -z` without interpreting path bytes as
 * control fields. Rename/copy and unmerged records are deliberately retained
 * only as a conservative cause: Phase 1 never proves them base-contained.
 *
 * @param {string} stdout
 * @returns {{ staged: Set<string>, unstaged: Set<string>, untracked: Set<string>, cause: string|null }}
 */
function parseStatusV2(stdout) {
  /** @type {Set<string>} */
  const staged = new Set();
  /** @type {Set<string>} */
  const unstaged = new Set();
  /** @type {Set<string>} */
  const untracked = new Set();
  /** @type {string|null} */
  let cause = null;
  const records = stdout.split('\0');
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    if (record.length === 0) {
      continue;
    }
    const kind = record[0];
    if (kind === '?') {
      untracked.add(record.slice(2));
      cause = cause || 'untracked_present';
      continue;
    }
    if (kind === '2') {
      cause = cause || 'rename_or_copy';
      index += 1;
      continue;
    }
    if (kind === 'u') {
      cause = cause || 'unmerged_state';
      continue;
    }
    if (kind !== '1') {
      cause = cause || 'unsupported_status';
      continue;
    }
    const fields = record.split(' ');
    if (fields.length < 9 || fields[1].length !== 2) {
      cause = cause || 'unsupported_status';
      continue;
    }
    const xy = fields[1];
    const sub = fields[2];
    const relative_path = fields.slice(8).join(' ');
    if (sub !== 'N...') {
      cause = cause || 'submodule_state';
    }
    if (xy.includes('T')) {
      cause = cause || 'typechange_state';
    }
    if (xy[0] !== '.') {
      staged.add(relative_path);
    }
    if (xy[1] !== '.') {
      unstaged.add(relative_path);
    }
  }
  return { staged, unstaged, untracked, cause };
}

/**
 * @param {GitRunner} run
 * @param {string} cwd
 * @param {string} revision
 * @param {string} relative_path
 * @returns {Promise<{ ok: boolean, state: WorktreePathState|null }>}
 */
async function treePathState(run, cwd, revision, relative_path) {
  const result = await run(['ls-tree', '-z', revision, '--', relative_path], {
    cwd
  });
  if (result.code !== 0) {
    return { ok: false, state: null };
  }
  if (result.stdout.length === 0) {
    return { ok: true, state: null };
  }
  const match =
    /^([0-7]{6}) (?:blob|tree|commit) ([0-9a-f]{40,64})\t[^\0]*\0$/.exec(
      result.stdout
    );
  return match
    ? { ok: true, state: { mode: match[1], oid: match[2] } }
    : { ok: false, state: null };
}

/**
 * @param {GitRunner} run
 * @param {string} cwd
 * @param {string} relative_path
 * @returns {Promise<{ ok: boolean, state: WorktreePathState|null }>}
 */
async function indexPathState(run, cwd, relative_path) {
  const result = await run(['ls-files', '--stage', '-z', '--', relative_path], {
    cwd
  });
  if (result.code !== 0) {
    return { ok: false, state: null };
  }
  if (result.stdout.length === 0) {
    return { ok: true, state: null };
  }
  const records = result.stdout.split('\0').filter(Boolean);
  if (records.length !== 1) {
    return { ok: false, state: null };
  }
  const match = /^([0-7]{6}) ([0-9a-f]{40,64}) 0\t/.exec(records[0]);
  return match
    ? { ok: true, state: { mode: match[1], oid: match[2] } }
    : { ok: false, state: null };
}

/**
 * Hash the worktree representation through Git so clean/smudge filters use the
 * same object identity they would receive on `git add`.
 *
 * @param {GitRunner} run
 * @param {typeof import('node:fs')} fs
 * @param {string} cwd
 * @param {string} relative_path
 * @returns {Promise<{ ok: boolean, state: WorktreePathState|null, special: boolean }>}
 */
async function worktreePathState(run, fs, cwd, relative_path) {
  const absolute_path = path.join(cwd, relative_path);
  /** @type {import('node:fs').Stats} */
  let stat;
  try {
    stat = fs.lstatSync(absolute_path);
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code === 'ENOENT') {
      return { ok: true, state: null, special: false };
    }
    return { ok: false, state: null, special: false };
  }
  if (!stat.isFile() && !stat.isSymbolicLink()) {
    return { ok: true, state: null, special: true };
  }
  if (stat.isSymbolicLink()) {
    const format = await run(['rev-parse', '--show-object-format'], { cwd });
    if (
      format.code !== 0 ||
      (format.stdout.trim() !== 'sha1' && format.stdout.trim() !== 'sha256')
    ) {
      return { ok: false, state: null, special: false };
    }
    /** @type {Buffer} */
    let target;
    try {
      target = fs.readlinkSync(absolute_path, { encoding: 'buffer' });
    } catch {
      return { ok: false, state: null, special: false };
    }
    const header = Buffer.from(`blob ${target.length}\0`);
    const oid = createHash(format.stdout.trim())
      .update(header)
      .update(target)
      .digest('hex');
    return {
      ok: true,
      state: { mode: '120000', oid },
      special: false
    };
  }
  const hashed = await run(
    ['hash-object', `--path=${relative_path}`, '--', relative_path],
    { cwd }
  );
  if (hashed.code !== 0 || !/^[0-9a-f]{40,64}$/i.test(hashed.stdout.trim())) {
    return { ok: false, state: null, special: false };
  }
  const mode = stat.mode & 0o111 ? '100755' : '100644';
  return {
    ok: true,
    state: { mode, oid: hashed.stdout.trim() },
    special: false
  };
}

/**
 * @param {WorktreePathState|null} left
 * @param {WorktreePathState|null} right
 * @returns {boolean}
 */
function samePathState(left, right) {
  return (
    (left === null && right === null) ||
    (left !== null &&
      right !== null &&
      left.mode === right.mode &&
      left.oid === right.oid)
  );
}

/**
 * @param {GitRunner} run
 * @param {string} cwd
 * @param {string} base_oid
 * @param {string} ref
 * @returns {Promise<{ ok: boolean, contained: boolean, cause: string|null }>}
 */
async function observeAheadContainment(run, cwd, base_oid, ref) {
  const merge_count = parseCount(
    await run(['rev-list', '--count', '--merges', `${base_oid}..${ref}`], {
      cwd
    })
  );
  if (merge_count === null) {
    return { ok: false, contained: false, cause: 'observe_failed' };
  }
  if (merge_count > 0) {
    return { ok: true, contained: false, cause: 'ahead_merge_commit' };
  }
  const merge_base_result = await run(['merge-base', base_oid, ref], { cwd });
  const merge_base = merge_base_result.stdout.trim();
  if (merge_base_result.code !== 0 || !/^[0-9a-f]{40,64}$/i.test(merge_base)) {
    return { ok: false, contained: false, cause: 'observe_failed' };
  }
  const paths_result = await run(
    ['diff', '--name-only', '-z', '--no-renames', merge_base, ref, '--'],
    { cwd }
  );
  if (
    paths_result.code !== 0 ||
    (paths_result.stdout.length > 0 && !paths_result.stdout.endsWith('\0'))
  ) {
    return { ok: false, contained: false, cause: 'observe_failed' };
  }
  const paths = paths_result.stdout.split('\0').filter(Boolean);
  for (const relative_path of paths) {
    const [merge_base_state, ref_state, base_state] = await Promise.all([
      treePathState(run, cwd, merge_base, relative_path),
      treePathState(run, cwd, ref, relative_path),
      treePathState(run, cwd, base_oid, relative_path)
    ]);
    if (!merge_base_state.ok || !ref_state.ok || !base_state.ok) {
      return { ok: false, contained: false, cause: 'observe_failed' };
    }
    if (
      merge_base_state.state?.mode === '160000' ||
      ref_state.state?.mode === '160000' ||
      base_state.state?.mode === '160000'
    ) {
      return {
        ok: true,
        contained: false,
        cause: 'ahead_submodule_path'
      };
    }
    if (!samePathState(ref_state.state, base_state.state)) {
      return { ok: true, contained: false, cause: 'ahead_not_contained' };
    }
  }
  return { ok: true, contained: true, cause: null };
}

/**
 * Observe the exact dirty-state material bound into a stale-work identity.
 * Both admission and forced cleanup use this function so the final lock-held
 * comparison cannot silently omit a file class covered by the archive check.
 *
 * @param {GitRunner} run
 * @param {typeof import('node:fs')} fs
 * @param {string} wt
 * @param {{ worktree_realpath: string|null, branch: string|null, head_sha: string|null, base_oid: string|null }} identity
 * @returns {Promise<{
 *   ok: boolean,
 *   status_digest: string,
 *   parsed: ReturnType<typeof parseStatusV2>,
 *   staged_paths: string[],
 *   unstaged_paths: string[],
 *   special_paths: string[]
 * }>}
 */
async function observeStatusDigest(run, fs, wt, identity) {
  /** @type {{ ok: boolean, status_digest: string, parsed: ReturnType<typeof parseStatusV2>, staged_paths: string[], unstaged_paths: string[], special_paths: string[] }} */
  const failed = {
    ok: false,
    status_digest: sha256('observe_failed'),
    parsed: parseStatusV2(''),
    staged_paths: [],
    unstaged_paths: [],
    special_paths: []
  };
  const status = await run(
    ['status', '--porcelain=v2', '-z', '--untracked-files=all'],
    { cwd: wt }
  );
  if (status.code !== 0) {
    return failed;
  }
  const parsed = parseStatusV2(status.stdout);
  const staged_paths = [...parsed.staged].sort();
  const unstaged_paths = [...parsed.unstaged].sort();
  /** @type {string[]} */
  const special_paths = [];
  if (parsed.cause === null) {
    for (const relative_path of unstaged_paths) {
      try {
        const stat = fs.lstatSync(path.join(wt, relative_path));
        if (!stat.isFile() && !stat.isSymbolicLink()) {
          special_paths.push(relative_path);
        }
      } catch {
        /* path equality below will fail closed if it was not deleted */
      }
    }
  }
  const [staged_delta, unstaged_delta] =
    special_paths.length > 0
      ? [
          { code: 0, stdout: '', stderr: '' },
          {
            code: 0,
            stdout: JSON.stringify({ special_paths }),
            stderr: ''
          }
        ]
      : await Promise.all([
          run(
            [
              'diff',
              '--cached',
              '--binary',
              '--full-index',
              '--no-ext-diff',
              '--no-textconv',
              '--'
            ],
            { cwd: wt }
          ),
          run(
            [
              'diff',
              '--binary',
              '--full-index',
              '--no-ext-diff',
              '--no-textconv',
              '--'
            ],
            { cwd: wt }
          )
        ]);
  if (staged_delta.code !== 0 || unstaged_delta.code !== 0) {
    return failed;
  }
  /** @type {Array<{ path: string, state: WorktreePathState|null, special: boolean }>} */
  const untracked_states = [];
  for (const relative_path of [...parsed.untracked].sort()) {
    const observed = await worktreePathState(run, fs, wt, relative_path);
    if (!observed.ok) {
      return failed;
    }
    untracked_states.push({
      path: relative_path,
      state: observed.state,
      special: observed.special
    });
  }
  return {
    ok: true,
    status_digest: sha256(
      JSON.stringify({
        worktree_realpath: identity.worktree_realpath,
        branch: identity.branch,
        head_sha: identity.head_sha,
        base_oid: identity.base_oid,
        status: status.stdout,
        staged_delta: staged_delta.stdout,
        unstaged_delta: unstaged_delta.stdout,
        untracked_states
      })
    ),
    parsed,
    staged_paths,
    unstaged_paths,
    special_paths
  };
}

/**
 * Create a worktree manager bound to a lock manager.
 *
 * @param {{ locks: { topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner, fs?: typeof import('node:fs'), createBranchArchive?: (input: { archive_id: string, repo: string, ref: string, base_oid: string, branch_head_sha: string }) => { ok: boolean, reason?: string }|Promise<{ ok: boolean, reason?: string }> }} deps
 * @returns {{
 *   pathFor: (repo: string, bead_id: string) => string,
 *   exists: (repo: string, bead_id: string) => boolean,
 *   add: (input: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>,
 *   remove: (input: { repo: string, bead_id: string }) => Promise<{ code: number, stderr: string }>,
 *   observeOwnedByBead: (input: { repo: string, bead_id: string }) => Promise<{ ok: boolean, present: boolean, path: string|null, branch: string|null, head_sha: string|null, reason: string|null }>,
 *   removeByBranch: (input: { repo: string, branch: string, expected_path?: string|null, expected_head?: string|null, expected_base_oid?: string|null, expected_status_digest?: string|null }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *   removeIfDiscardable: (input: { repo: string, bead_id: string, base: string, preserve?: boolean }) => Promise<WorktreeObservation>,
 *   addDetached: (input: { repo: string, name: string, sha: string }) => Promise<{ path: string }>,
 *   removeDetached: (input: { repo: string, name: string }) => Promise<{ code: number, stderr: string }>,
 *   withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 * }}
 */
export function createWorktreeManager(deps) {
  const locks = deps.locks;
  /** @type {GitRunner} */
  const run = deps.run || ((args, options) => runShell('git', args, options));
  const fs = deps.fs || nodeFs;
  const createBranchArchive = deps.createBranchArchive;

  /**
   * @param {string} repo
   * @param {string} bead_id
   * @returns {string}
   */
  function pathFor(repo, bead_id) {
    return path.join(repo, '.worktrees', bead_id);
  }

  /**
   * Path of a WORKER-OWNED, single-use detached verify worktree (UI-egj7 §1).
   *
   * OWNERSHIP INVARIANT: `.worktrees/.verify/` is a namespace no session
   * worktree can reach — {@link pathFor} names its directory after the bead id,
   * and a bead id cannot contain `/`. The destructive reclaim ladder in {@link
   * createWorktreeManager}'s `addDetached` therefore only ever operates on
   * worker-owned residue, structurally rather than by a `verify-` prefix
   * convention.
   *
   * @param {string} repo
   * @param {string} name
   * @returns {string}
   */
  function detachedPathFor(repo, name) {
    return path.join(repo, '.worktrees', '.verify', name);
  }

  return {
    pathFor,

    /**
     * Run `fn` holding this repo's git-topology lock (layer 2) — the seam other
     * modules use to serialize REF-MUTATING git commands they run themselves
     * (`fetch`, `merge --ff-only`, `branch -D`, `push --delete`) against the
     * worktree operations here. Phases 4–5 added such commands in `pr-actions`
     * and `verify-cmd`; without this they raced concurrent slots on the same
     * ref database (worker-phase2 §8 keeps the topology lock protected core).
     *
     * DEADLOCK BOUNDARY — the lock is a plain non-reentrant mutex. `fn` MUST
     * NOT call `add` / `remove` / `addDetached` / `removeDetached`: each of
     * those takes the SAME lock and would wait forever on the caller that is
     * already holding it. The rule callers follow is therefore: the lock wraps
     * only raw `git` invocations, and is always released before any call back
     * into this manager.
     *
     * @template T
     * @param {string} repo
     * @param {() => Promise<T>} fn
     * @returns {Promise<T>}
     */
    async withTopologyLock(repo, fn) {
      const release = await locks.topologyLock(repo);
      try {
        return await fn();
      } finally {
        release();
      }
    },

    /**
     * Whether the bead's worktree directory is present. A manual session resume
     * reuses the existing worktree and does NOT recreate a deleted one, so a
     * missing directory is a `worktree_missing` refusal (spec §1.2).
     *
     * @param {string} repo
     * @param {string} bead_id
     * @returns {boolean}
     */
    exists(repo, bead_id) {
      try {
        return fs.existsSync(pathFor(repo, bead_id));
      } catch {
        return false;
      }
    },

    /**
     * Add `.worktrees/<bead_id>` from `base`, on a branch named `<bead_id>`.
     * Returns the resolved base OID for the attempt snapshot.
     *
     * @param {{ repo: string, bead_id: string, base: string }} input
     * @returns {Promise<{ path: string, branch: string, base_oid: string }>}
     */
    async add(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = pathFor(input.repo, input.bead_id);
        const branch = branchForBead(input.bead_id);
        const added = await run(
          ['worktree', 'add', '-B', branch, wt, input.base],
          { cwd: input.repo }
        );
        if (added.code !== 0) {
          throw new Error(
            `git worktree add failed (${added.code}): ${added.stderr.trim()}`
          );
        }
        const rev = await run(['rev-parse', 'HEAD'], { cwd: wt });
        return {
          path: wt,
          branch,
          base_oid: rev.code === 0 ? rev.stdout.trim() : ''
        };
      } finally {
        release();
      }
    },

    /**
     * Force-remove the bead's worktree. Topology-lock guarded.
     *
     * @param {{ repo: string, bead_id: string }} input
     * @returns {Promise<{ code: number, stderr: string }>}
     */
    async remove(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = pathFor(input.repo, input.bead_id);
        const removed = await run(['worktree', 'remove', '--force', wt], {
          cwd: input.repo
        });
        return { code: removed.code, stderr: removed.stderr };
      } finally {
        release();
      }
    },

    /**
     * Resolve the worker-owned worktree/branch/head tuple that a durable
     * discard snapshot binds to. Collision fallback branches remain eligible
     * only when their basename and worktree directory still match.
     *
     * @param {{ repo: string, bead_id: string }} input
     */
    async observeOwnedByBead(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const listed = await run(['worktree', 'list', '--porcelain', '-z'], {
          cwd: input.repo
        });
        if (listed.code !== 0) {
          return {
            ok: false,
            present: false,
            path: null,
            branch: null,
            head_sha: null,
            reason: 'observe_failed'
          };
        }
        let root = input.repo;
        try {
          root = fs.realpathSync(input.repo);
        } catch {
          /* the ownership check below still uses the given root */
        }
        const matches = parseWorktreeRecords(listed.stdout).filter((record) => {
          if (!record.branch?.startsWith('refs/heads/')) {
            return false;
          }
          const branch = record.branch.slice('refs/heads/'.length);
          const name_matches =
            branch === input.bead_id ||
            new RegExp(
              `^${input.bead_id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-\\d{8}$`
            ).test(branch);
          return (
            name_matches &&
            (isOwnedWorktree(root, record.path, branch) ||
              isOwnedWorktree(input.repo, record.path, branch))
          );
        });
        if (matches.length > 1) {
          return {
            ok: false,
            present: false,
            path: null,
            branch: null,
            head_sha: null,
            reason: 'ownership_ambiguous'
          };
        }
        if (matches.length === 0) {
          return {
            ok: true,
            present: false,
            path: null,
            branch: null,
            head_sha: null,
            reason: null
          };
        }
        const match = matches[0];
        const branch = /** @type {string} */ (match.branch).slice(
          'refs/heads/'.length
        );
        const head = await run(['rev-parse', 'HEAD'], { cwd: match.path });
        if (head.code !== 0 || !/^[0-9a-f]{40}$/i.test(head.stdout.trim())) {
          return {
            ok: false,
            present: true,
            path: match.path,
            branch,
            head_sha: null,
            reason: 'head_observe_failed'
          };
        }
        return {
          ok: true,
          present: true,
          path: match.path,
          branch,
          head_sha: head.stdout.trim(),
          reason: null
        };
      } finally {
        release();
      }
    },

    /**
     * Remove the worktree that has `branch` checked out — ASKING git where it
     * is instead of computing a name from the bead id (UI-u7hh §1).
     *
     * The contract allows two names for the same session (the bead id, and the
     * collision fallback `<bead-id>-<YYYYMMDD>`), and a worktree whose
     * directory is gone still holds its branch through the `.git/worktrees/`
     * registration. Neither is expressible by name computation, and both end
     * the same way: `git branch -D` refuses a branch some worktree still owns.
     * A real lookup covers both because it observes the occupancy directly.
     *
     * Observation failure is NOT absence — the bug this replaces was exactly
     * that reading (`fs.existsSync` false ⇒ "already cleaned up"), so a failed
     * `worktree list`, and an impossible 2+ match that can only be a parse
     * error, both return `observe_failed` rather than a quiet success.
     *
     * The lookup and the removal share ONE topology-lock hold: releasing
     * between them would decide the removal on a topology another slot may
     * already have changed (`removeIfDiscardable` holds the lock for the same
     * reason). DEADLOCK BOUNDARY (see {@link withTopologyLock}): raw git only
     * in here — never another manager method, which would take the same
     * non-reentrant lock.
     *
     * @param {{ repo: string, branch: string, expected_path?: string|null, expected_head?: string|null, expected_base_oid?: string|null, expected_status_digest?: string|null }} input
     * @returns {Promise<{ ok: boolean, removed: boolean, reason: string|null }>}
     */
    async removeByBranch(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const listed = await run(['worktree', 'list', '--porcelain', '-z'], {
          cwd: input.repo
        });
        if (listed.code !== 0) {
          return { ok: false, removed: false, reason: 'observe_failed' };
        }
        const ref = `refs/heads/${input.branch}`;
        // Exact ref match, never a prefix: `UI-abc` must not claim `UI-abcd`.
        const matches = parseWorktreeRecords(listed.stdout).filter(
          (record) => record.branch === ref
        );
        // git itself forbids one branch in two worktrees, so 2+ is a parse
        // fault, not a state to act on.
        if (matches.length > 1) {
          return { ok: false, removed: false, reason: 'observe_failed' };
        }
        if (matches.length === 0) {
          return { ok: true, removed: false, reason: null };
        }
        const wt = matches[0].path;
        if (
          typeof input.expected_path === 'string' &&
          wt !== input.expected_path
        ) {
          return {
            ok: false,
            removed: false,
            reason: 'identity_changed'
          };
        }
        // git reports canonical paths, so the repo side is resolved too before
        // they are compared (a symlinked repo root would otherwise read as
        // foreign).
        let root = input.repo;
        try {
          root = fs.realpathSync(input.repo);
        } catch {
          // Keep the given path; the boundary check below still applies.
        }
        if (
          !isOwnedWorktree(root, wt, input.branch) &&
          !isOwnedWorktree(input.repo, wt, input.branch)
        ) {
          return { ok: false, removed: false, reason: 'foreign_worktree' };
        }
        /** @type {string|null} */
        let head_sha = null;
        if (
          typeof input.expected_head === 'string' ||
          typeof input.expected_status_digest === 'string'
        ) {
          const head = await run(['rev-parse', 'HEAD'], { cwd: wt });
          head_sha = head.code === 0 ? head.stdout.trim() : null;
          if (
            head_sha === null ||
            (typeof input.expected_head === 'string' &&
              head_sha !== input.expected_head)
          ) {
            return {
              ok: false,
              removed: false,
              reason: 'identity_changed'
            };
          }
        }
        if (typeof input.expected_status_digest === 'string') {
          if (typeof input.expected_base_oid !== 'string') {
            return { ok: false, removed: false, reason: 'identity_changed' };
          }
          let worktree_realpath;
          try {
            worktree_realpath = fs.realpathSync(wt);
          } catch {
            return { ok: false, removed: false, reason: 'identity_changed' };
          }
          const symbolic = await run(
            ['symbolic-ref', '--quiet', '--short', 'HEAD'],
            { cwd: wt }
          );
          const observed_branch =
            symbolic.code === 0 ? symbolic.stdout.trim() : null;
          const status = await observeStatusDigest(run, fs, wt, {
            worktree_realpath,
            branch: observed_branch,
            head_sha,
            base_oid: input.expected_base_oid
          });
          if (
            observed_branch !== input.branch ||
            !status.ok ||
            status.status_digest !== input.expected_status_digest
          ) {
            return { ok: false, removed: false, reason: 'identity_changed' };
          }
        }
        const removed = await run(['worktree', 'remove', '--force', wt], {
          cwd: input.repo
        });
        if (removed.code !== 0) {
          return { ok: false, removed: false, reason: 'remove_failed' };
        }
        return { ok: true, removed: true, reason: null };
      } finally {
        release();
      }
    },

    /**
     * Remove a leftover bead worktree ONLY when nothing would be lost. The
     * observations and the removal share ONE topology-lock hold, so no
     * concurrent add/remove can change the repo in between (a check released
     * before the removal would decide on state that no longer holds).
     *
     * `ok` answers the caller's actual question — "is there residue blocking a
     * fresh run?" — so it is true both when nothing was there and when a
     * discardable residue was removed. `removed` separates those two: false
     * means nothing had to go, true means a discardable worktree really was
     * taken down. Every other outcome is `ok:false, removed:false` with the
     * reason and leaves the residue untouched: `add`'s `-B` resets the branch to
     * base, so refusing fail-closed is what protects unique commits.
     *
     * DEADLOCK BOUNDARY (see {@link withTopologyLock}): raw git only in here —
     * never `add` / `remove` / `addDetached` / `removeDetached`, which take the
     * same non-reentrant lock.
     *
     * @param {{ repo: string, bead_id: string, base: string, preserve?: boolean }} input
     * @returns {Promise<WorktreeObservation>}
     */
    async removeIfDiscardable(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = pathFor(input.repo, input.bead_id);
        const branch = branchForBead(input.bead_id);
        const empty_summary = {
          staged_count: 0,
          unstaged_count: 0,
          untracked_count: 0,
          branch_ahead: 0,
          head_ahead: 0
        };

        /**
         * Observe one immutable decision snapshot. No file or ref is changed in
         * this helper; callers may safely surface its bounded summary.
         *
         * @returns {Promise<InternalWorktreeObservation>}
         */
        async function observe() {
          const base_probe = await run(
            ['rev-parse', '--verify', `${input.base}^{commit}`],
            { cwd: input.repo }
          );
          if (
            base_probe.code !== 0 ||
            !/^[0-9a-f]{40,64}$/i.test(base_probe.stdout.trim())
          ) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned: false,
              identity: {
                worktree_realpath: null,
                branch: null,
                head_sha: null,
                branch_head_sha: null,
                base_oid: null,
                status_digest: sha256('observe_failed')
              },
              summary: { ...empty_summary },
              paths: { staged: [], unstaged: [] }
            };
          }
          const base_oid = base_probe.stdout.trim();
          let wt_present = false;
          try {
            wt_present = fs.existsSync(wt);
          } catch {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned: false,
              identity: {
                worktree_realpath: null,
                branch: null,
                head_sha: null,
                branch_head_sha: null,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: { ...empty_summary },
              paths: { staged: [], unstaged: [] }
            };
          }
          const branch_probe = await run(
            ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`],
            { cwd: input.repo }
          );
          if (branch_probe.code !== 0 && branch_probe.code !== 1) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned: false,
              identity: {
                worktree_realpath: null,
                branch: null,
                head_sha: null,
                branch_head_sha: null,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: { ...empty_summary },
              paths: { staged: [], unstaged: [] }
            };
          }
          const branch_present = branch_probe.code === 0;
          const branch_head_sha = branch_present
            ? branch_probe.stdout.trim()
            : null;
          if (
            branch_present &&
            !/^[0-9a-f]{40,64}$/i.test(branch_head_sha ?? '')
          ) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned: false,
              identity: {
                worktree_realpath: null,
                branch,
                head_sha: null,
                branch_head_sha: null,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: { ...empty_summary },
              paths: { staged: [], unstaged: [] }
            };
          }
          const branch_ahead = branch_present
            ? parseCount(
                await run(['rev-list', '--count', `${base_oid}..${branch}`], {
                  cwd: input.repo
                })
              )
            : 0;
          if (branch_ahead === null) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned: false,
              identity: {
                worktree_realpath: null,
                branch: branch_present ? branch : null,
                head_sha: null,
                branch_head_sha,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: { ...empty_summary },
              paths: { staged: [], unstaged: [] }
            };
          }
          if (!wt_present) {
            const state = branch_present ? 'discardable' : 'absent';
            /** @type {string|null} */
            let cause = branch_ahead > 0 ? 'branch_ahead' : null;
            let ahead_contained = false;
            let observation_ok = cause === null;
            if (branch_ahead > 0 && createBranchArchive) {
              const containment = await observeAheadContainment(
                run,
                input.repo,
                base_oid,
                `refs/heads/${branch}`
              );
              cause = containment.cause;
              ahead_contained = containment.contained;
              observation_ok = containment.ok && containment.contained;
            }
            return {
              ok: observation_ok,
              state: observation_ok
                ? state
                : cause === 'observe_failed'
                  ? 'unknown'
                  : 'unique',
              removed: false,
              reason: cause,
              cause,
              owned: branch_present && branch === branchForBead(input.bead_id),
              identity: {
                worktree_realpath: null,
                branch: branch_present ? branch : null,
                head_sha: null,
                branch_head_sha,
                base_oid,
                status_digest: sha256(
                  JSON.stringify({
                    branch_present,
                    branch_head_sha,
                    branch_ahead,
                    base_oid
                  })
                )
              },
              summary: { ...empty_summary, branch_ahead },
              paths: { staged: [], unstaged: [] },
              ahead_contained
            };
          }

          /** @type {string|null} */
          let worktree_realpath = null;
          try {
            worktree_realpath = fs.realpathSync(wt);
          } catch {
            worktree_realpath = null;
          }
          const symbolic = await run(
            ['symbolic-ref', '--quiet', '--short', 'HEAD'],
            { cwd: wt }
          );
          const observed_branch =
            symbolic.code === 0 ? symbolic.stdout.trim() : null;
          let repo_realpath = input.repo;
          try {
            repo_realpath = fs.realpathSync(input.repo);
          } catch {
            /* ownership still checks the supplied repo root */
          }
          const owned =
            worktree_realpath !== null &&
            observed_branch === branch &&
            (isOwnedWorktree(repo_realpath, worktree_realpath, branch) ||
              isOwnedWorktree(input.repo, worktree_realpath, branch));
          const head_probe = await run(['rev-parse', '--verify', 'HEAD'], {
            cwd: wt
          });
          const head_sha =
            head_probe.code === 0 &&
            /^[0-9a-f]{40,64}$/i.test(head_probe.stdout.trim())
              ? head_probe.stdout.trim()
              : null;
          const head_ahead =
            head_sha === null
              ? null
              : parseCount(
                  await run(
                    ['rev-list', '--count', `${base_oid}..${head_sha}`],
                    { cwd: wt }
                  )
                );
          if (head_ahead === null) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned,
              identity: {
                worktree_realpath,
                branch: observed_branch,
                head_sha,
                branch_head_sha,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: {
                ...empty_summary,
                branch_ahead,
                head_ahead: head_ahead ?? 0
              },
              paths: { staged: [], unstaged: [] }
            };
          }
          const status = await observeStatusDigest(run, fs, wt, {
            worktree_realpath,
            branch: observed_branch,
            head_sha,
            base_oid
          });
          if (!status.ok) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'observe_failed',
              cause: 'observe_failed',
              owned,
              identity: {
                worktree_realpath,
                branch: observed_branch,
                head_sha,
                branch_head_sha,
                base_oid,
                status_digest: sha256('observe_failed')
              },
              summary: {
                ...empty_summary,
                branch_ahead,
                head_ahead
              },
              paths: { staged: [], unstaged: [] }
            };
          }
          const parsed = status.parsed;
          const staged_paths = status.staged_paths;
          const unstaged_paths = status.unstaged_paths;
          const special_paths = status.special_paths;
          const summary = {
            staged_count: staged_paths.length,
            unstaged_count: unstaged_paths.length,
            untracked_count: parsed.untracked.size,
            branch_ahead,
            head_ahead
          };
          const identity = {
            worktree_realpath,
            branch: observed_branch,
            head_sha,
            branch_head_sha,
            base_oid,
            status_digest: status.status_digest
          };
          if (
            head_ahead > 0 &&
            (observed_branch !== branch || head_sha !== branch_head_sha)
          ) {
            return {
              ok: false,
              state: 'unique',
              removed: false,
              reason: 'head_ahead',
              cause: 'head_ahead',
              owned,
              identity,
              summary,
              paths: { staged: staged_paths, unstaged: unstaged_paths }
            };
          }
          let ahead_contained = false;
          if (branch_ahead > 0) {
            if (!createBranchArchive) {
              return {
                ok: false,
                state: 'unique',
                removed: false,
                reason: 'branch_ahead',
                cause: 'branch_ahead',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
            const containment = await observeAheadContainment(
              run,
              wt,
              base_oid,
              `refs/heads/${branch}`
            );
            if (!containment.ok || !containment.contained) {
              return {
                ok: false,
                state: containment.ok ? 'unique' : 'unknown',
                removed: false,
                reason: containment.cause,
                cause: containment.cause,
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
            ahead_contained = true;
          }
          if (!owned) {
            return {
              ok: false,
              state: 'unknown',
              removed: false,
              reason: 'ownership_unknown',
              cause: 'ownership_unknown',
              owned: false,
              identity,
              summary,
              paths: { staged: staged_paths, unstaged: unstaged_paths }
            };
          }
          if (parsed.cause !== null) {
            return {
              ok: false,
              state: 'unique',
              removed: false,
              reason: parsed.cause,
              cause: parsed.cause,
              owned,
              identity,
              summary,
              paths: { staged: staged_paths, unstaged: unstaged_paths }
            };
          }
          if (special_paths.length > 0) {
            return {
              ok: false,
              state: 'unique',
              removed: false,
              reason: 'special_file',
              cause: 'special_file',
              owned,
              identity,
              summary,
              paths: { staged: staged_paths, unstaged: unstaged_paths }
            };
          }
          if (staged_paths.length === 0 && unstaged_paths.length === 0) {
            return {
              ok: true,
              state: 'discardable',
              removed: false,
              reason: null,
              cause: null,
              owned,
              identity,
              summary,
              paths: { staged: [], unstaged: [] },
              ahead_contained
            };
          }
          for (const relative_path of staged_paths) {
            const [base_state, index_state] = await Promise.all([
              treePathState(run, wt, base_oid, relative_path),
              indexPathState(run, wt, relative_path)
            ]);
            if (!base_state.ok || !index_state.ok) {
              return {
                ok: false,
                state: 'unknown',
                removed: false,
                reason: 'observe_failed',
                cause: 'observe_failed',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
            if (!samePathState(base_state.state, index_state.state)) {
              return {
                ok: false,
                state: 'unique',
                removed: false,
                reason: 'dirty_unique',
                cause: 'dirty_unique',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
          }
          for (const relative_path of unstaged_paths) {
            const [base_state, worktree_state] = await Promise.all([
              treePathState(run, wt, base_oid, relative_path),
              worktreePathState(run, fs, wt, relative_path)
            ]);
            if (!base_state.ok || !worktree_state.ok) {
              return {
                ok: false,
                state: 'unknown',
                removed: false,
                reason: 'observe_failed',
                cause: 'observe_failed',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
            if (worktree_state.special) {
              return {
                ok: false,
                state: 'unique',
                removed: false,
                reason: 'special_file',
                cause: 'special_file',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
            if (!samePathState(base_state.state, worktree_state.state)) {
              return {
                ok: false,
                state: 'unique',
                removed: false,
                reason: 'dirty_unique',
                cause: 'dirty_unique',
                owned,
                identity,
                summary,
                paths: { staged: staged_paths, unstaged: unstaged_paths }
              };
            }
          }
          return {
            ok: true,
            state: 'base_contained',
            removed: false,
            reason: null,
            cause: null,
            owned,
            identity,
            summary,
            paths: { staged: staged_paths, unstaged: unstaged_paths },
            ahead_contained
          };
        }

        const first = await observe();
        if (input.preserve === true) {
          return withoutPaths(first);
        }
        if (!first.ok || first.state === 'absent') {
          return withoutPaths(first);
        }
        const has_worktree = worktreePresent(first);
        const has_contained_ahead_ref =
          first.ahead_contained === true &&
          first.summary.branch_ahead > 0 &&
          typeof first.identity.branch_head_sha === 'string';
        if (!has_worktree && !has_contained_ahead_ref) {
          return withoutPaths(first);
        }
        if (has_contained_ahead_ref) {
          let archived;
          try {
            archived = await createBranchArchive?.({
              archive_id: `auto-reclaim-${branch}-${first.identity.base_oid?.slice(0, 12)}-${first.identity.branch_head_sha?.slice(0, 12)}`,
              repo: input.repo,
              ref: `refs/heads/${branch}`,
              base_oid: /** @type {string} */ (first.identity.base_oid),
              branch_head_sha: /** @type {string} */ (
                first.identity.branch_head_sha
              )
            });
          } catch {
            archived = { ok: false, reason: 'archive_failed' };
          }
          if (!archived?.ok) {
            return withoutPaths({
              ...first,
              ok: false,
              state: 'unknown',
              reason: 'archive_failed',
              cause: 'archive_failed'
            });
          }
        }
        const second = await observe();
        if (
          second.state !== first.state ||
          JSON.stringify(second.identity) !== JSON.stringify(first.identity)
        ) {
          return withoutPaths({
            ...first,
            ok: false,
            state: 'unknown',
            reason: 'identity_changed',
            cause: 'identity_changed'
          });
        }
        const changed_paths = [
          ...new Set([...first.paths.staged, ...first.paths.unstaged])
        ];
        if (first.state === 'base_contained') {
          const restored = await run(
            [
              'restore',
              '--source=HEAD',
              '--staged',
              '--worktree',
              '--',
              ...changed_paths
            ],
            { cwd: wt }
          );
          if (restored.code !== 0) {
            await restoreContainedState(first, changed_paths);
            return withoutPaths({
              ...first,
              ok: false,
              state: 'unknown',
              reason: 'restore_failed',
              cause: 'restore_failed'
            });
          }
          const clean = await observe();
          const working_delta_gone =
            clean.summary.staged_count === 0 &&
            clean.summary.unstaged_count === 0 &&
            clean.summary.untracked_count === 0;
          const ahead_still_contained =
            first.ahead_contained === true
              ? clean.ahead_contained === true
              : clean.summary.branch_ahead === 0 &&
                clean.summary.head_ahead === 0;
          if (
            !clean.ok ||
            clean.state !== 'discardable' ||
            !working_delta_gone ||
            !ahead_still_contained
          ) {
            await restoreContainedState(first, changed_paths);
            return withoutPaths({
              ...first,
              ok: false,
              state: 'unknown',
              reason: 'restore_failed',
              cause: 'restore_failed'
            });
          }
        }
        if (has_worktree) {
          const removed = await run(['worktree', 'remove', wt], {
            cwd: input.repo
          });
          if (removed.code !== 0) {
            if (first.state === 'base_contained') {
              await restoreContainedState(first, changed_paths);
            }
            return withoutPaths({
              ...first,
              ok: false,
              state: 'unknown',
              reason: 'remove_failed',
              cause: 'remove_failed'
            });
          }
        }
        if (has_contained_ahead_ref) {
          const deleted = await run(
            [
              'update-ref',
              '-d',
              `refs/heads/${branch}`,
              /** @type {string} */ (first.identity.branch_head_sha)
            ],
            { cwd: input.repo }
          );
          if (deleted.code !== 0) {
            return withoutPaths({
              ...first,
              ok: false,
              state: 'unknown',
              removed: has_worktree,
              reason: 'ref_delete_failed',
              cause: 'ref_delete_failed'
            });
          }
        }
        return withoutPaths({ ...first, removed: true });

        /**
         * @param {InternalWorktreeObservation} observation
         * @returns {boolean}
         */
        function worktreePresent(observation) {
          return observation.identity?.worktree_realpath !== null;
        }

        /**
         * @param {InternalWorktreeObservation} observation
         * @returns {WorktreeObservation}
         */
        function withoutPaths(observation) {
          const { paths, ahead_contained, ...result } = observation;
          void paths;
          void ahead_contained;
          return result;
        }

        /**
         * Recreate the proven pre-cleanup state if normalize or non-forced
         * removal fails. Both writes remain exact-path and base-pinned.
         *
         * @param {InternalWorktreeObservation} observation
         * @param {string[]} changed_paths
         */
        async function restoreContainedState(observation, changed_paths) {
          if (observation.paths.staged.length > 0) {
            await run(
              [
                'restore',
                `--source=${observation.identity.base_oid}`,
                '--staged',
                '--',
                ...observation.paths.staged
              ],
              { cwd: wt }
            );
          }
          if (changed_paths.length > 0) {
            await run(
              [
                'restore',
                `--source=${observation.identity.base_oid}`,
                '--worktree',
                '--',
                ...changed_paths
              ],
              { cwd: wt }
            );
          }
        }
      } finally {
        release();
      }
    },

    /**
     * Add a DETACHED worktree pinned to an exact commit (worker-autorun-policy
     * §4) — the post-merge verify_cmd runs against the immutable merge SHA,
     * never a moving base tip. `add`'s `-B` branch form cannot express this.
     * Topology-lock guarded; clean up with {@link removeDetached}.
     *
     * RECLAIM BEFORE ADD (UI-egj7 §1): every `git worktree add` failure of the
     * "Preparing worktree … fatal: '<path>' …" family is a name collision with
     * residue of a previous run — a live worktree, a stale registration whose
     * directory is gone, a lock left by a process that died mid-add, or an
     * unregistered leftover directory. The worktree named here is worker-owned
     * and single-use (see {@link detachedPathFor}), so the residue is reclaimed
     * unconditionally rather than diagnosed: each step is best-effort, the
     * whole ladder is idempotent, and verify runs are rare enough that three
     * extra git spawns cost nothing next to parsing porcelain to decide.
     *
     * The ladder may only ever meet DEAD residue — `verify-cmd`'s per-(repo,
     * name) lifecycle mutex (UI-egj7 §2) serializes same-name runs, so it can
     * never destroy a live sibling's worktree.
     *
     * @param {{ repo: string, name: string, sha: string }} input
     * @returns {Promise<{ path: string }>}
     */
    async addDetached(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = detachedPathFor(input.repo, input.name);
        /**
         * A reclaim step never decides the outcome — only the `add` below does,
         * so neither a nonzero exit nor a throw may escape.
         *
         * @param {string[]} args
         */
        const reclaim = async (args) => {
          try {
            await run(args, { cwd: input.repo });
          } catch {
            // Ignored on purpose; the add below reports the real failure.
          }
        };
        // 1. release a lock left behind by a process that died mid-add.
        await reclaim(['worktree', 'unlock', wt]);
        // 2. take down a registered leftover, dirty or not.
        await reclaim(['worktree', 'remove', '--force', wt]);
        // 3. an unregistered leftover directory git will not touch itself.
        try {
          if (fs.existsSync(wt)) {
            fs.rmSync(wt, { recursive: true, force: true });
          }
        } catch {
          // Best-effort; the add below reports the real failure.
        }
        // 4. drop registrations whose directory is already gone.
        await reclaim(['worktree', 'prune']);
        const added = await run(
          ['worktree', 'add', '--detach', wt, input.sha],
          { cwd: input.repo }
        );
        if (added.code !== 0) {
          throw new Error(
            `git worktree add --detach failed (${added.code}): ${added.stderr.trim()}`
          );
        }
        return { path: wt };
      } finally {
        release();
      }
    },

    /**
     * Force-remove a detached verify worktree. Topology-lock guarded.
     *
     * @param {{ repo: string, name: string }} input
     * @returns {Promise<{ code: number, stderr: string }>}
     */
    async removeDetached(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = detachedPathFor(input.repo, input.name);
        const removed = await run(['worktree', 'remove', '--force', wt], {
          cwd: input.repo
        });
        return { code: removed.code, stderr: removed.stderr };
      } finally {
        release();
      }
    }
  };
}

/**
 * Create the permanent, detached deploy worktree manager. It intentionally
 * does not share the session-worktree namespace: the fixed path is protected
 * by a durable ownership journal as well as Git's own registration record.
 *
 * Repo-operation serialization is CALLER-owned: the coordinator holds the
 * repo-operation lock across bind, align, spawn, and durable record. This
 * manager takes the topology lock around ref-changing fetches and worktree
 * creation.
 *
 * @param {{ locks: { topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner, fs?: typeof import('node:fs'), journalPath?: (workspace: string) => string, now?: () => number }} deps
 */
export function createRepoOpsDeployWorktreeManager(deps) {
  const fs = deps.fs || nodeFs;
  /** @type {GitRunner} */
  const run = deps.run || ((args, options) => runShell('git', args, options));
  const journalPath = deps.journalPath || repoOpsDeployWorktreeJournalPath;
  const now = deps.now || (() => Date.now());

  /**
   * @param {string} repo
   */
  function pathFor(repo) {
    return path.resolve(repo, '.worktrees', '.repo-ops-deploy');
  }

  /**
   * @param {string} file
   * @param {unknown} value
   */
  function persistJournal(file, value) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const temp = `${file}.tmp`;
    fs.writeFileSync(temp, JSON.stringify(value));
    fs.renameSync(temp, file);
  }

  /**
   * @param {string} file
   */
  function readJournal(file) {
    try {
      const value = JSON.parse(fs.readFileSync(file, 'utf8'));
      return value && typeof value === 'object' ? value : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} stdout
   */
  function registeredPaths(stdout) {
    return stdout
      .split('\0')
      .filter((line) => line.startsWith('worktree '))
      .map((line) => path.resolve(line.slice('worktree '.length)));
  }

  /**
   * Prove that any state at the reserved deploy path belongs to this repository
   * and to the durable ownership journal. Complete absence is a valid bootstrap
   * state; partial or foreign evidence is not.
   *
   * @param {{ repo: string, workspace?: string }} input
   * @returns {Promise<{ ok: true, path: string, exists: boolean }|{ ok: false, code: 'repo_ops_worktree_unowned', path: string, exists: boolean }>}
   */
  async function inspectOwnership(input) {
    const repo = input.repo;
    const deploy_path = pathFor(repo);
    const workspace = input.workspace || repo;
    const journal = readJournal(journalPath(workspace));
    const list = await run(['worktree', 'list', '--porcelain', '-z'], {
      cwd: repo
    });
    const registered =
      list.code === 0 && registeredPaths(list.stdout).includes(deploy_path);
    const exists = fs.existsSync(deploy_path);
    if (!exists && !registered && !journal) {
      return { ok: true, path: deploy_path, exists: false };
    }
    const common_repo = await run(
      ['rev-parse', '--path-format=absolute', '--git-common-dir'],
      { cwd: repo }
    );
    const common_deploy = exists
      ? await run(['rev-parse', '--path-format=absolute', '--git-common-dir'], {
          cwd: deploy_path
        })
      : { code: 1, stdout: '' };
    const head = exists
      ? await run(['symbolic-ref', '-q', 'HEAD'], { cwd: deploy_path })
      : { code: 1 };
    const journal_owned =
      journal && journal.repo === repo && journal.path === deploy_path;
    const common_equal =
      common_repo.code === 0 &&
      common_deploy.code === 0 &&
      path.resolve(repo, common_repo.stdout.trim()) ===
        path.resolve(deploy_path, common_deploy.stdout.trim());
    if (
      !exists ||
      !registered ||
      !journal_owned ||
      !common_equal ||
      head.code === 0
    ) {
      return {
        ok: false,
        code: 'repo_ops_worktree_unowned',
        path: deploy_path,
        exists
      };
    }
    return { ok: true, path: deploy_path, exists: true };
  }

  /**
   * Bound fetch of `origin/<base>` and immutable target pin. Retries exactly
   * once, and only after a fully-reclaimed pre-execution timeout (exit 124).
   *
   * @param {{ repo: string, base: string }} input
   * @returns {Promise<{ ok: boolean, code?: string, target_sha?: string, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }>}
   */
  async function bindTarget(input) {
    const repo = fs.realpathSync(path.resolve(input.repo));
    let elapsed_ms = 0;
    const release = await deps.locks.topologyLock(repo);
    let fetch_result;
    let target_result;
    try {
      /** @returns {Promise<{ code: number, stdout: string, stderr: string }>} */
      const runFetch = async () => {
        const started_at = now();
        const result = await run(['fetch', 'origin', input.base], {
          cwd: repo,
          timeout_ms: 30_000
        });
        elapsed_ms += Math.max(0, now() - started_at);
        return result;
      };
      fetch_result = await runFetch();
      if (fetch_result.code === 124) {
        fetch_result = await runFetch();
      }
      if (fetch_result.code !== 0) {
        return {
          ok: false,
          code: 'repo_ops_fetch_failed',
          fetch_failure: fetch_result.code === 124 ? 'timeout' : 'nonzero',
          elapsed_ms
        };
      }
      target_result = await run(
        ['rev-parse', `refs/remotes/origin/${input.base}^{commit}`],
        { cwd: repo }
      );
    } finally {
      release();
    }
    const target_sha =
      target_result.code === 0 ? target_result.stdout.trim().toLowerCase() : '';
    if (!/^[0-9a-f]{40}$/.test(target_sha)) {
      return { ok: false, code: 'repo_ops_target_unresolved' };
    }
    return { ok: true, target_sha };
  }

  /**
   * Ownership-proven alignment of the permanent worktree to an already-bound
   * target SHA. Never deletes an ambiguous path.
   *
   * @param {{ repo: string, workspace?: string, target_sha: string }} input
   * @returns {Promise<{ ok: boolean, code?: string, path?: string, target_sha?: string }>}
   */
  async function ensureAligned(input) {
    const repo = fs.realpathSync(path.resolve(input.repo));
    const deploy_path = pathFor(repo);
    const workspace = input.workspace || repo;
    const target_sha = input.target_sha;
    {
      const journal_file = journalPath(workspace);
      const ownership = await inspectOwnership({ repo, workspace });
      if (!ownership.ok) {
        return { ok: false, code: ownership.code };
      }
      if (!ownership.exists) {
        const release_topology = await deps.locks.topologyLock(repo);
        try {
          const added = await run(
            ['worktree', 'add', '--detach', deploy_path, target_sha],
            { cwd: repo }
          );
          if (added.code !== 0)
            return { ok: false, code: 'repo_ops_worktree_create_failed' };
          persistJournal(journal_file, { repo, path: deploy_path });
        } finally {
          release_topology();
        }
      }
      const reset = await run(['reset', '--hard', target_sha], {
        cwd: deploy_path
      });
      const clean = await run(['clean', '-ffd'], { cwd: deploy_path });
      const current = await run(['rev-parse', 'HEAD'], { cwd: deploy_path });
      const dirty = await run(
        ['status', '--porcelain', '--untracked-files=all'],
        { cwd: deploy_path }
      );
      if (
        reset.code !== 0 ||
        clean.code !== 0 ||
        current.stdout.trim().toLowerCase() !== target_sha ||
        dirty.stdout.trim() !== ''
      ) {
        return { ok: false, code: 'repo_ops_worktree_align_failed' };
      }
      return { ok: true, path: deploy_path, target_sha };
    }
  }

  /**
   * Read the deploy worktree evidence without changing it. A missing worktree is
   * a normal pre-bootstrap state; unreadable existing state fails closed.
   *
   * @param {{ repo: string }} input
   */
  async function readState(input) {
    const repo = fs.realpathSync(path.resolve(input.repo));
    const ownership = await inspectOwnership({ repo });
    if (!ownership.ok) {
      return {
        ok: false,
        code: ownership.code,
        path: ownership.path,
        head: null,
        clean: false
      };
    }
    if (!ownership.exists) {
      return {
        ok: true,
        path: ownership.path,
        head: null,
        clean: true
      };
    }
    const current = await run(['rev-parse', 'HEAD'], {
      cwd: ownership.path
    });
    const dirty = await run(
      ['status', '--porcelain', '--untracked-files=all'],
      { cwd: ownership.path }
    );
    const head = current.stdout.trim().toLowerCase();
    if (
      current.code !== 0 ||
      dirty.code !== 0 ||
      !/^[0-9a-f]{40}$/.test(head)
    ) {
      return {
        ok: false,
        path: ownership.path,
        head: null,
        clean: false
      };
    }
    return {
      ok: true,
      path: ownership.path,
      head,
      clean: dirty.stdout.trim() === ''
    };
  }

  /**
   * Verify the terminal postcondition of a deploy run: the owned worktree is
   * still at the bound target and clean (master spec §6.3 step 7).
   *
   * @param {{ repo: string, target_sha: string }} input
   */
  async function verifyAligned(input) {
    const state = await readState({ repo: input.repo });
    if (!state.ok) {
      return { ok: false, ...(state.code ? { code: state.code } : {}) };
    }
    return {
      ok:
        state.clean === true &&
        typeof state.head === 'string' &&
        state.head === input.target_sha
    };
  }

  /**
   * Verify that the clean deploy worktree still covers the operation target.
   * A newer successful deploy therefore cannot invalidate an older operation's
   * zero-exit marker during the executor's post-script readback.
   *
   * @param {{ repo: string, target_sha: string }} input
   */
  async function verifyCovered(input) {
    const state = await readState({ repo: input.repo });
    if (
      !state.ok ||
      !state.clean ||
      typeof state.head !== 'string' ||
      typeof state.path !== 'string'
    ) {
      return { ok: false, ...(state.code ? { code: state.code } : {}) };
    }
    if (state.head === input.target_sha) {
      return { ok: true };
    }
    const contained = await run(
      ['merge-base', '--is-ancestor', input.target_sha, state.head],
      { cwd: input.repo }
    );
    return { ok: contained.code === 0 };
  }

  /**
   * @param {{ repo: string, base: string, workspace?: string }} input
   * @returns {Promise<{ ok: boolean, code?: string, path?: string, target_sha?: string, fetch_failure?: 'timeout'|'nonzero', elapsed_ms?: number }>}
   */
  async function ensure(input) {
    const bound = await bindTarget(input);
    if (!bound.ok) {
      return bound;
    }
    if (typeof bound.target_sha !== 'string') {
      return { ok: false, code: 'repo_ops_target_unresolved' };
    }
    return ensureAligned({
      repo: input.repo,
      workspace: input.workspace,
      target_sha: bound.target_sha
    });
  }

  return {
    pathFor,
    bindTarget,
    ensureAligned,
    readState,
    verifyAligned,
    verifyCovered,
    ensure
  };
}
