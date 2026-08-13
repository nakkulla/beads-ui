/**
 * Per-bead git worktree lifecycle (spec §5.2, §5.5).
 *
 * Each session runs in a dedicated `.worktrees/<bead-id>` created from a pinned
 * base commit and removed on cleanup. All worktree add/remove operations are
 * serialized through the repo git-topology lock (layer 2) so concurrent
 * sessions never race the same repo's ref database. {@link
 * createWorktreeManager}'s `withTopologyLock` exposes that same lock to the
 * modules that run their own ref-mutating git commands (`pr-actions`'s base
 * sync + branch cleanup, `verify-cmd`'s PR-head fetch).
 *
 * This NEVER installs to live runtime dirs (`~/.claude`, shared service dirs) —
 * it only manipulates worktrees inside the target repo.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { runShell } from '../bd.js';
import { repoOpsDeployWorktreeJournalPath } from './state-paths.js';

/**
 * @typedef {(args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>} GitRunner
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
 * Create a worktree manager bound to a lock manager.
 *
 * @param {{ locks: { topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner, fs?: typeof import('node:fs') }} deps
 * @returns {{
 *   pathFor: (repo: string, bead_id: string) => string,
 *   exists: (repo: string, bead_id: string) => boolean,
 *   add: (input: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>,
 *   remove: (input: { repo: string, bead_id: string }) => Promise<{ code: number, stderr: string }>,
 *   observeOwnedByBead: (input: { repo: string, bead_id: string }) => Promise<{ ok: boolean, present: boolean, path: string|null, branch: string|null, head_sha: string|null, reason: string|null }>,
 *   removeByBranch: (input: { repo: string, branch: string, expected_path?: string|null, expected_head?: string|null }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
 *   removeIfDiscardable: (input: { repo: string, bead_id: string, base: string }) => Promise<{ ok: boolean, removed: boolean, reason: string|null }>,
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
     * @param {{ repo: string, branch: string, expected_path?: string|null, expected_head?: string|null }} input
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
        if (typeof input.expected_head === 'string') {
          const head = await run(['rev-parse', 'HEAD'], { cwd: wt });
          if (head.code !== 0 || head.stdout.trim() !== input.expected_head) {
            return {
              ok: false,
              removed: false,
              reason: 'identity_changed'
            };
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
     * @param {{ repo: string, bead_id: string, base: string }} input
     * @returns {Promise<{ ok: boolean, removed: boolean, reason: string|null }>}
     */
    async removeIfDiscardable(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = pathFor(input.repo, input.bead_id);
        const branch = branchForBead(input.bead_id);

        let wt_present = false;
        try {
          wt_present = fs.existsSync(wt);
        } catch {
          return { ok: false, removed: false, reason: 'observe_failed' };
        }

        const branch_probe = await run(
          ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`],
          { cwd: input.repo }
        );
        // `--quiet` reports a missing ref as exit 1; any other nonzero is a
        // failed observation, not an absence.
        if (branch_probe.code !== 0 && branch_probe.code !== 1) {
          return { ok: false, removed: false, reason: 'observe_failed' };
        }
        const branch_present = branch_probe.code === 0;

        if (wt_present) {
          const status = await run(['status', '--porcelain'], { cwd: wt });
          if (status.code !== 0) {
            return { ok: false, removed: false, reason: 'observe_failed' };
          }
          if (status.stdout.trim().length > 0) {
            return { ok: false, removed: false, reason: 'dirty' };
          }
        }

        if (branch_present) {
          const branch_ahead = parseCount(
            await run(['rev-list', '--count', `${input.base}..${branch}`], {
              cwd: input.repo
            })
          );
          if (branch_ahead === null) {
            return { ok: false, removed: false, reason: 'observe_failed' };
          }
          if (branch_ahead > 0) {
            return { ok: false, removed: false, reason: 'branch_ahead' };
          }
        }

        if (wt_present) {
          // A detached (or re-pointed) HEAD carries commits no branch check can
          // see — without this, `-B` would strand them as unreachable objects.
          const head_ahead = parseCount(
            await run(['rev-list', '--count', `${input.base}..HEAD`], {
              cwd: wt
            })
          );
          if (head_ahead === null) {
            return { ok: false, removed: false, reason: 'observe_failed' };
          }
          if (head_ahead > 0) {
            return { ok: false, removed: false, reason: 'head_ahead' };
          }
          // NEVER `--force`: git's own refusal is the last guard against
          // removing a worktree whose state the observations above missed.
          const removed = await run(['worktree', 'remove', wt], {
            cwd: input.repo
          });
          if (removed.code !== 0) {
            return { ok: false, removed: false, reason: 'remove_failed' };
          }
          return { ok: true, removed: true, reason: null };
        }

        return { ok: true, removed: false, reason: null };
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
 * @param {{ locks: { repoOperationLock: (repo: string) => Promise<() => void>, topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner, fs?: typeof import('node:fs'), journalPath?: (workspace: string) => string }} deps
 */
export function createRepoOpsDeployWorktreeManager(deps) {
  const fs = deps.fs || nodeFs;
  /** @type {GitRunner} */
  const run = deps.run || ((args, options) => runShell('git', args, options));
  const journalPath = deps.journalPath || repoOpsDeployWorktreeJournalPath;

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
   * @param {{ repo: string, base: string, workspace?: string, last_successful_sha?: string|null }} input
   */
  async function ensure(input) {
    const repo = fs.realpathSync(path.resolve(input.repo));
    const deploy_path = pathFor(repo);
    const workspace = input.workspace || repo;
    const release_operation = await deps.locks.repoOperationLock(repo);
    try {
      let fetch_result = await run(['fetch', 'origin', input.base], {
        cwd: repo,
        timeout_ms: 30_000
      });
      if (fetch_result.code === 124) {
        fetch_result = await run(['fetch', 'origin', input.base], {
          cwd: repo,
          timeout_ms: 30_000
        });
      }
      if (fetch_result.code !== 0) {
        return { ok: false, code: 'repo_ops_fetch_failed' };
      }
      const target_result = await run(
        ['rev-parse', `refs/remotes/origin/${input.base}^{commit}`],
        { cwd: repo }
      );
      const target_sha =
        target_result.code === 0
          ? target_result.stdout.trim().toLowerCase()
          : '';
      if (!/^[0-9a-f]{40}$/.test(target_sha)) {
        return { ok: false, code: 'repo_ops_target_unresolved' };
      }
      if (input.last_successful_sha) {
        const containment = await run(
          [
            'merge-base',
            '--is-ancestor',
            input.last_successful_sha,
            target_sha
          ],
          { cwd: repo }
        );
        if (containment.code === 1)
          return { ok: false, code: 'remote_history_not_monotonic' };
        if (containment.code !== 0)
          return { ok: false, code: 'repo_ops_ancestry_check_failed' };
      }
      const journal_file = journalPath(workspace);
      const journal = readJournal(journal_file);
      const list = await run(['worktree', 'list', '--porcelain', '-z'], {
        cwd: repo
      });
      const registered =
        list.code === 0 && registeredPaths(list.stdout).includes(deploy_path);
      const exists = fs.existsSync(deploy_path);
      if (exists || registered || journal) {
        const common_repo = await run(
          ['rev-parse', '--path-format=absolute', '--git-common-dir'],
          {
            cwd: repo
          }
        );
        const common_deploy = exists
          ? await run(
              ['rev-parse', '--path-format=absolute', '--git-common-dir'],
              { cwd: deploy_path }
            )
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
          return { ok: false, code: 'repo_ops_worktree_unowned' };
        }
      } else {
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
    } finally {
      release_operation();
    }
  }

  return { pathFor, ensure };
}
