/**
 * @typedef {{ key: string, email: string }} Account
 * @typedef {{ ok: true, accounts: Account[], active_key: string|null }|{ ok: false, error: string }} AccountList
 */

/**
 * Build the launch-time account resolver over the cached usage catalogs.
 *
 * @param {{ listClaude: () => Promise<AccountList>, listCodex: () => Promise<AccountList> }} deps
 */
export function createAccountCatalog({ listClaude, listCodex }) {
  return {
    /**
     * Resolve one Claude account by email without choosing among duplicates.
     *
     * @param {string} email
     */
    async resolveClaude(email) {
      const listed = await listClaude();
      if (!listed.ok) {
        return { ok: false, reason: 'claude_account_list_unavailable' };
      }
      const matches = listed.accounts.filter(
        (account) => account.email === email
      );
      if (matches.length === 0) {
        return { ok: false, reason: 'claude_account_unknown' };
      }
      if (matches.length > 1) {
        return { ok: false, reason: 'claude_account_ambiguous' };
      }
      return { ok: true, account: matches[0] };
    },

    /**
     * Resolve one Codex account by its durable account key.
     *
     * @param {string} key
     */
    async resolveCodex(key) {
      const listed = await listCodex();
      if (!listed.ok) {
        return { ok: false, reason: 'codex_account_list_unavailable' };
      }
      const account = listed.accounts.find(
        (candidate) => candidate.key === key
      );
      if (!account) {
        return { ok: false, reason: 'codex_account_unknown' };
      }
      return { ok: true, account };
    }
  };
}
