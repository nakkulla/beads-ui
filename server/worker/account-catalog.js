/**
 * @typedef {{ key: string, number?: number, email: string, status?: string, windows?: Array<{ key?: string, pct: number, resetsAt: string|null }> }} Account
 * @typedef {{ ok: true, accounts: Account[], active_key: string|null }|{ ok: false, error: string }} AccountList
 * @typedef {(accounts: Account[], active_key: string|null) => void} CatalogObserver
 */

/**
 * Build the launch-time account resolver over the cached usage catalogs.
 *
 * @param {{ listClaude: () => Promise<AccountList>, listCodex: () => Promise<AccountList> }} deps
 */
export function createAccountCatalog({ listClaude, listCodex }) {
  /** @type {Set<CatalogObserver>} */
  const claude_observers = new Set();
  /** @type {Set<CatalogObserver>} */
  const codex_observers = new Set();
  return {
    /**
     * Observe existing hold-evaluation reads without adding a polling loop.
     * Each read hands over its rows and its active login key.
     *
     * @param {CatalogObserver} listener
     */
    subscribeClaude(listener) {
      claude_observers.add(listener);
      return () => claude_observers.delete(listener);
    },

    /**
     * Observe Codex list reads the same way, so a changed Codex active login
     * is seen by the reads that already happen (UI-np4t §4.4-2).
     *
     * @param {CatalogObserver} listener
     */
    subscribeCodex(listener) {
      codex_observers.add(listener);
      return () => codex_observers.delete(listener);
    },

    /**
     * Read every Claude account row used for automatic outage switching.
     *
     * @returns {Promise<{ ok: true, accounts: Account[], active_key: string|null }|{ ok: false, reason: string }>}
     */
    async listClaude() {
      const listed = await listClaude();
      if (!listed.ok) {
        return { ok: false, reason: 'claude_account_list_unavailable' };
      }
      for (const listener of claude_observers) {
        listener(listed.accounts, listed.active_key);
      }
      return {
        ok: true,
        accounts: listed.accounts,
        active_key: listed.active_key
      };
    },

    /**
     * Read every Codex account row the recovery selector may offer. Codex has
     * no `activeCodex`/`readCodex` twin: codex-auth exposes the durable key and
     * its usage windows, and nothing else this worker consumes.
     *
     * @returns {Promise<{ ok: true, accounts: Account[], active_key: string|null }|{ ok: false, reason: string }>}
     */
    async listCodex() {
      const listed = await listCodex();
      if (!listed.ok) {
        return { ok: false, reason: 'codex_account_list_unavailable' };
      }
      for (const listener of codex_observers) {
        listener(listed.accounts, listed.active_key);
      }
      return {
        ok: true,
        accounts: listed.accounts,
        active_key: listed.active_key
      };
    },

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
