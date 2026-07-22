/**
 * Per-bead git worktree lifecycle (spec §5.2, §5.5).
 *
 * Each session runs in a dedicated `.worktrees/<bead-id>` created from a pinned
 * base commit and removed on cleanup. All worktree add/remove operations are
 * serialized through the repo git-topology lock (layer 2) so concurrent
 * sessions never race the same repo's ref database.
 *
 * This NEVER installs to live runtime dirs (`~/.claude`, shared service dirs) —
 * it only manipulates worktrees inside the target repo.
 */
import path from 'node:path';
import { runShell } from '../bd.js';

/**
 * @typedef {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} GitRunner
 */

/**
 * Create a worktree manager bound to a lock manager.
 *
 * @param {{ locks: { topologyLock: (repo: string) => Promise<() => void> }, run?: GitRunner }} deps
 * @returns {{
 *   pathFor: (repo: string, bead_id: string) => string,
 *   add: (input: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>,
 *   remove: (input: { repo: string, bead_id: string }) => Promise<{ code: number, stderr: string }>,
 *   addDetached: (input: { repo: string, name: string, sha: string }) => Promise<{ path: string }>,
 *   removeDetached: (input: { repo: string, name: string }) => Promise<{ code: number, stderr: string }>
 * }}
 */
export function createWorktreeManager(deps) {
  const locks = deps.locks;
  /** @type {GitRunner} */
  const run = deps.run || ((args, options) => runShell('git', args, options));

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
        const branch = input.bead_id;
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
