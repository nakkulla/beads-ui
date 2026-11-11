/**
 * @typedef {{ claude_account?: string|null, cswap_path?: string, env?: Record<string, string> }} SessionAccounts
 * @typedef {(workspace: string, bead_id: string|null, runner: string) => Promise<SessionAccounts|null>} ResolveSessionAccounts
 */

/**
 * Use the same account transport for Worker and conversation windows.
 *
 * @param {SessionAccounts} accounts
 * @param {string} runner
 * @returns {Pick<import('./tmux-launcher.js').LaunchInput, 'env'|'wrapper'>}
 */
export function sessionLaunchAccountOptions(accounts, runner) {
  return {
    ...(accounts.env ? { env: accounts.env } : {}),
    ...(runner === 'claude' && accounts.claude_account && accounts.cswap_path
      ? {
          wrapper: {
            executable: accounts.cswap_path,
            args: ['run', accounts.claude_account, '--share-history', '--']
          }
        }
      : {})
  };
}

/**
 * Conversation windows retain the active login if account resolution fails.
 *
 * @param {ResolveSessionAccounts|undefined} resolveAccounts
 * @param {string} workspace
 * @param {string|null} bead_id
 * @param {string} runner
 * @returns {Promise<Pick<import('./tmux-launcher.js').LaunchInput, 'env'|'wrapper'>>}
 */
export async function resolveSessionLaunchOptions(
  resolveAccounts,
  workspace,
  bead_id,
  runner
) {
  if (!resolveAccounts) {
    return {};
  }
  try {
    const accounts = await resolveAccounts(workspace, bead_id, runner);
    return accounts === null
      ? {}
      : sessionLaunchAccountOptions(accounts, runner);
  } catch {
    return {};
  }
}
