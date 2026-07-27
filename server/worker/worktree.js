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

/**
 * @typedef {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} GitRunner
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
 * Create a worktree manager bound to a lock manager.
 *
 * @param {{ locks: { topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner, fs?: typeof import('node:fs') }} deps
 * @returns {{
 *   pathFor: (repo: string, bead_id: string) => string,
 *   exists: (repo: string, bead_id: string) => boolean,
 *   add: (input: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>,
 *   remove: (input: { repo: string, bead_id: string }) => Promise<{ code: number, stderr: string }>,
 *   removeIfDiscardable: (input: { repo: string, bead_id: string, base: string }) => Promise<{ ok: boolean, reason: string|null }>,
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
     * Remove a leftover bead worktree ONLY when nothing would be lost. The
     * observations and the removal share ONE topology-lock hold, so no
     * concurrent add/remove can change the repo in between (a check released
     * before the removal would decide on state that no longer holds).
     *
     * `ok` answers the caller's actual question — "is there residue blocking a
     * fresh run?" — so it is true both when nothing was there and when a
     * discardable residue was removed. Every other outcome is `ok:false` with
     * the reason and leaves the residue untouched: `add`'s `-B` resets the
     * branch to base, so refusing fail-closed is what protects unique commits.
     *
     * DEADLOCK BOUNDARY (see {@link withTopologyLock}): raw git only in here —
     * never `add` / `remove` / `addDetached` / `removeDetached`, which take the
     * same non-reentrant lock.
     *
     * @param {{ repo: string, bead_id: string, base: string }} input
     * @returns {Promise<{ ok: boolean, reason: string|null }>}
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
          return { ok: false, reason: 'observe_failed' };
        }

        const branch_probe = await run(
          ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`],
          { cwd: input.repo }
        );
        // `--quiet` reports a missing ref as exit 1; any other nonzero is a
        // failed observation, not an absence.
        if (branch_probe.code !== 0 && branch_probe.code !== 1) {
          return { ok: false, reason: 'observe_failed' };
        }
        const branch_present = branch_probe.code === 0;

        if (wt_present) {
          const status = await run(['status', '--porcelain'], { cwd: wt });
          if (status.code !== 0) {
            return { ok: false, reason: 'observe_failed' };
          }
          if (status.stdout.trim().length > 0) {
            return { ok: false, reason: 'dirty' };
          }
        }

        if (branch_present) {
          const branch_ahead = parseCount(
            await run(['rev-list', '--count', `${input.base}..${branch}`], {
              cwd: input.repo
            })
          );
          if (branch_ahead === null) {
            return { ok: false, reason: 'observe_failed' };
          }
          if (branch_ahead > 0) {
            return { ok: false, reason: 'branch_ahead' };
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
            return { ok: false, reason: 'observe_failed' };
          }
          if (head_ahead > 0) {
            return { ok: false, reason: 'head_ahead' };
          }
          // NEVER `--force`: git's own refusal is the last guard against
          // removing a worktree whose state the observations above missed.
          const removed = await run(['worktree', 'remove', wt], {
            cwd: input.repo
          });
          if (removed.code !== 0) {
            return { ok: false, reason: 'remove_failed' };
          }
        }

        return { ok: true, reason: null };
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
     * @param {{ repo: string, name: string, sha: string }} input
     * @returns {Promise<{ path: string }>}
     */
    async addDetached(input) {
      const release = await locks.topologyLock(input.repo);
      try {
        const wt = pathFor(input.repo, input.name);
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
        const wt = pathFor(input.repo, input.name);
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
