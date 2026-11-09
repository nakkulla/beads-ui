/**
 * The one local base sync both landing paths share: the PR post-merge cleanup
 * and the Worker quick_fix landing.
 *
 * It fetches (or takes) the landed base SHA and, when the human checkout sits
 * on the base branch, hands the lossless local update to the installed
 * workflow helper `sync-target-base-checkout.py`. The helper owns every
 * dirty/diverged decision; this module only finds it, runs it under the repo
 * topology lock and turns its JSON report into a {@link BaseSyncOutcome}.
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { workflowScriptDir } from './attempt-facts.js';

/**
 * What the sync did to the LOCAL checkout. The installed workflow helper owns
 * base-sync decisions; its result and reason pass through to the cleanup log.
 * Historical outcomes remain readable in persisted cleanup records.
 *
 * @typedef {`base_sync:${string}:${string}`|'fast_forwarded'|'fetch_only:not_on_base'|'fetch_only:dirty'|'fetch_only:diverged'} BaseSyncOutcome
 */

/**
 * @typedef {{ ok: true, sha: string, outcome: BaseSyncOutcome }|{ ok: false, reason: string }} BaseSyncResult
 */

/**
 * Create the base sync for ONE repository.
 *
 * @param {{
 *   repo: string,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   worktree: { withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T> },
 *   runBaseSync?: (file: string, args: string[], options: { cwd: string, encoding: 'utf8' }) => Promise<{ stdout: string }>,
 *   homeDir?: string
 * }} deps
 */
export function createBaseSync(deps) {
  const repo = deps.repo;
  const runBaseSync = deps.runBaseSync || promisify(execFile);
  const home_dir = deps.homeDir || os.homedir();

  /**
   * Fetch and pin the base, then let the helper update a checkout that is on
   * the base branch. The outcome never blocks a caller's cleanup: downstream
   * operations use the returned SHA, independently of the local checkout.
   *
   * @param {string} target_base
   * @param {string|null} [candidate_sha] - Already fetched candidate. When
   * present, update the checkout toward this exact commit instead of fetching
   * a potentially newer base tip.
   * @returns {Promise<BaseSyncResult>}
   */
  async function syncBase(target_base, candidate_sha = null) {
    // Every command below writes or reads this repo's ref database, so the whole
    // sequence is serialized under the topology lock (§8). No worktree-manager
    // call happens inside — those take the same lock (see `withTopologyLock`).
    return deps.worktree.withTopologyLock(repo, async () => {
      let sha = candidate_sha;
      if (sha === null) {
        const fetched = await deps.gitRun(
          ['fetch', '--no-tags', 'origin', target_base],
          { cwd: repo }
        );
        if (fetched.code !== 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'base_fetch_failed'
          };
        }
        const rev = await deps.gitRun(['rev-parse', `origin/${target_base}`], {
          cwd: repo
        });
        if (rev.code !== 0 || rev.stdout.trim().length === 0) {
          return {
            ok: /** @type {const} */ (false),
            reason: 'base_rev_unavailable'
          };
        }
        sha = rev.stdout.trim();
      }
      const head = await deps.gitRun(['rev-parse', '--abbrev-ref', 'HEAD'], {
        cwd: repo
      });
      if (head.code !== 0 || head.stdout.trim() !== target_base) {
        return {
          ok: /** @type {const} */ (true),
          sha,
          outcome: /** @type {BaseSyncOutcome} */ ('fetch_only:not_on_base')
        };
      }
      /** @type {BaseSyncOutcome} */
      let outcome = 'base_sync:failed:script_missing';
      try {
        const script = ['claude', 'codex']
          .map((runner) =>
            path.join(
              workflowScriptDir(home_dir, runner),
              'sync-target-base-checkout.py'
            )
          )
          .find((file) => existsSync(file));
        if (script) {
          const synced = await runBaseSync(
            'python3',
            [
              script,
              '--repo',
              repo,
              '--remote',
              'origin',
              '--base',
              target_base,
              '--target-sha',
              sha
            ],
            { cwd: repo, encoding: 'utf8' }
          );
          const report = JSON.parse(synced.stdout);
          outcome =
            report !== null &&
            typeof report.result === 'string' &&
            report.result.length > 0 &&
            typeof report.reason === 'string' &&
            report.reason.length > 0
              ? `base_sync:${report.result}:${report.reason}`
              : 'base_sync:failed:invalid_response';
        }
      } catch (error) {
        const code = /** @type {NodeJS.ErrnoException} */ (error).code;
        outcome = `base_sync:failed:${error instanceof SyntaxError ? 'invalid_json' : code || 'script_error'}`;
        try {
          const report = JSON.parse(
            /** @type {{ stdout: string }} */ (error).stdout
          );
          if (
            report !== null &&
            report.result === 'failed' &&
            typeof report.reason === 'string' &&
            report.reason.length > 0
          ) {
            outcome = `base_sync:failed:${report.reason}`;
          }
        } catch {
          // Keep the execution error when no valid failure report was emitted.
        }
      }
      return {
        ok: /** @type {const} */ (true),
        sha,
        outcome
      };
    });
  }

  return { syncBase };
}
