/**
 * The scope selector's `⟳ git pull` (부록 A 전역 `git-pull-workspace`): one
 * request for the connected repo and one toast naming what happened, in the
 * wording the base header used.
 */
import { showToast } from '../../ui/toast.js';
import { nameOf } from './scope.js';

/**
 * @param {(type: string, payload?: unknown) => Promise<any>} send
 * @param {string} root_dir - The connected repo the button names.
 * @returns {Promise<void>}
 */
export async function runGitPull(send, root_dir) {
  try {
    const result = await send('git-pull-workspace', {});
    const status = result?.status;
    if (status === 'up_to_date') {
      showToast('Already up to date', 'success', 2000);
    } else if (status === 'stash_pop_conflict') {
      showToast(
        'Git pulled, but stash pop conflicted (check git stash list)',
        'warning',
        4000
      );
    } else {
      showToast(`Git pulled ${nameOf(root_dir)}`, 'success', 2000);
    }
  } catch (err) {
    const code = /** @type {any} */ (err)?.code;
    const detail = /** @type {any} */ (err)?.message;
    if (code === 'rebase_conflict') {
      showToast(
        'Git pull conflicts — reverted (manual resolve required)',
        'error',
        4000
      );
    } else if (code === 'rebase_conflict_abort_failed') {
      showToast(
        "Git pull conflicts AND rebase --abort failed — repo left mid-rebase, run 'git rebase --abort' manually",
        'error',
        6000
      );
    } else if (code === 'busy') {
      showToast(
        'Git pull skipped: another operation is running',
        'warning',
        3000
      );
    } else {
      showToast(`Git pull failed${detail ? `: ${detail}` : ''}`, 'error', 3000);
    }
  }
}
