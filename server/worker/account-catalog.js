/**
 * @typedef {{ key: string, email: string, status?: string, windows?: Array<{ pct: number, resetsAt: string|null }> }} Account
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
     * Read the active Claude row, including usage windows used by outage classification.
     *
     * @returns {Promise<{ ok: true, account: Account }|{ ok: false, reason: string }>}
     */
    async activeClaude() {
      const listed = await listClaude();
      if (!listed.ok) {
        return { ok: false, reason: 'claude_account_list_unavailable' };
      }
      if (typeof listed.active_key !== 'string') {
        return { ok: false, reason: 'claude_active_account_unavailable' };
      }
      const matches = listed.accounts.filter(
        (candidate) => candidate.key === listed.active_key
      );
      if (matches.length !== 1) {
        return { ok: false, reason: 'claude_active_account_unavailable' };
      }
      return { ok: true, account: matches[0] };
    },

    /**
     * Read a Claude row by email without discarding catalog health fields.
     *
     * @param {string} email
     * @returns {Promise<{ ok: true, account: Account }|{ ok: false, reason: string }>}
     */
    async readClaude(email) {
      const listed = await listClaude();
      if (!listed.ok) {
        return {
          ok: /** @type {const} */ (false),
          reason: 'claude_account_list_unavailable'
        };
      }
      const matches = listed.accounts.filter(
        (candidate) => candidate.email === email
      );
      if (matches.length === 0) {
        return {
          ok: /** @type {const} */ (false),
          reason: 'claude_account_unknown'
        };
      }
      if (matches.length > 1) {
        return {
          ok: /** @type {const} */ (false),
          reason: 'claude_account_ambiguous'
        };
      }
      return { ok: /** @type {const} */ (true), account: matches[0] };
    },

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
