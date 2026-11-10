import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  collectAccountRefs,
  createAccountRemoveHandler,
  removalOutcomeOf
} from './account-remove.js';
import {
  __resetSwitchStateForTest,
  acquireSwitchLock,
  isSwitchInFlight,
  releaseSwitchLock
} from './account-switch.js';

/**
 * @import { CommandResult } from './account-login.js'
 */

const CODEX_KEY = 'user-BBB::22222222-2222-2222-2222-222222222222';

// `codex-auth remove <number> --json` as codex-auth 0.3.0-alpha.11 prints it
// (isolated CODEX_HOME probe, 2026-11-10).
const CODEX_REMOVE_OK = JSON.stringify({
  schema_version: 1,
  command: 'remove',
  removed: [
    {
      number: 2,
      account_key: CODEX_KEY,
      email: 'b@example.com',
      alias: null,
      plan: 'plus',
      active: false
    }
  ],
  new_active_account_key: 'user-AAA::11111111-1111-1111-1111-111111111111'
});
const CODEX_REMOVE_UNRESOLVED = JSON.stringify({
  schema_version: 1,
  error: {
    code: 'selector_resolution_failed',
    message: 'one or more selectors could not be resolved',
    resolutions: [
      { selector: '9', status: 'not_found', account_key: null, candidates: [] }
    ]
  }
});
// `cswap remove <number> --yes --json` (claude-swap a279d67).
const CSWAP_REMOVE_OK =
  '{"schemaVersion": 1, "ok": true, "removed": {"number": 2, "email": "two@example.com"}}';
const CSWAP_REMOVE_FAILED =
  '{"schemaVersion": 1, "ok": false, "error": "remove_failed", "message": "Account 2 does not exist"}';

/** @type {(code: number, stdout?: string, stderr?: string) => CommandResult} */
function commandResult(code, stdout = '', stderr = '') {
  return { code, stdout, stderr, not_found: false, timed_out: false };
}

/**
 * @returns {any}
 */
function fakeResponse() {
  const res = {
    statusCode: 0,
    /** @type {any} */
    body: undefined,
    /**
     * @param {number} code
     */
    status(code) {
      res.statusCode = code;
      return res;
    },
    /**
     * @param {unknown} payload
     */
    json(payload) {
      res.body = payload;
      return res;
    }
  };
  return res;
}

/**
 * @param {'claude'|'codex'} provider
 * @param {{ active?: boolean, in_use?: string[] | Error, refs?: any, remove?: CommandResult }} [options]
 */
function removeHarness(provider, options = {}) {
  const key = provider === 'claude' ? 'two@example.com' : CODEX_KEY;
  const email = provider === 'claude' ? 'two@example.com' : 'b@example.com';
  const listAccounts = vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    accounts: [
      {
        key: provider === 'claude' ? 'one@example.com' : 'user-AAA::1',
        number: 1,
        email: 'one@example.com',
        active: !options.active
      },
      { key, number: 2, email, active: options.active === true }
    ],
    active_key: null
  }));
  const runningBeads = vi.fn(async () => {
    if (options.in_use instanceof Error) {
      throw options.in_use;
    }
    return options.in_use || [];
  });
  const collectRefs = vi.fn(
    async () => options.refs || { refs: [], unchecked_repos: 0 }
  );
  const lock_during_remove = /** @type {boolean[]} */ ([]);
  const runRemove = vi.fn(async () => {
    lock_during_remove.push(isSwitchInFlight(provider));
    return (
      options.remove ||
      commandResult(
        0,
        provider === 'claude' ? CSWAP_REMOVE_OK : CODEX_REMOVE_OK
      )
    );
  });
  const invalidateUsageCache = vi.fn();
  const handler = createAccountRemoveHandler({
    provider,
    listAccounts,
    runningBeads,
    collectRefs,
    runRemove,
    invalidateUsageCache
  });
  /**
   * @param {unknown} body
   */
  async function post(body) {
    const res = fakeResponse();
    await handler(/** @type {any} */ ({ body }), res, () => {});
    return { status: res.statusCode, body: res.body };
  }
  return {
    key,
    post,
    listAccounts,
    runningBeads,
    collectRefs,
    runRemove,
    invalidateUsageCache,
    lock_during_remove
  };
}

beforeEach(() => {
  __resetSwitchStateForTest();
});

afterEach(() => {
  __resetSwitchStateForTest();
});

describe.each(/** @type {const} */ (['claude', 'codex']))(
  '%s account remove',
  (provider) => {
    test('answers confirm_required without removing even with no references', async () => {
      const h = removeHarness(provider);

      const response = await h.post({ number: 2, key: h.key });

      expect(response).toEqual({
        status: 200,
        body: {
          ok: false,
          error: 'confirm_required',
          refs: [],
          unchecked_repos: 0
        }
      });
      expect(h.runRemove).not.toHaveBeenCalled();
    });

    test('re-checks everything then removes on confirm', async () => {
      const h = removeHarness(provider);

      const response = await h.post({ number: 2, key: h.key, confirm: true });

      expect(h.listAccounts).toHaveBeenCalledOnce();
      expect(h.runningBeads).toHaveBeenCalledWith(h.key);
      expect(h.collectRefs).toHaveBeenCalledWith(h.key);
      expect(h.runRemove).toHaveBeenCalledWith(2);
      expect(response.body).toEqual({
        ok: true,
        removed: {
          number: 2,
          email: provider === 'claude' ? 'two@example.com' : 'b@example.com'
        }
      });
    });

    test('drops the usage cache after a removal', async () => {
      const h = removeHarness(provider);

      await h.post({ number: 2, key: h.key, confirm: true });

      expect(h.invalidateUsageCache).toHaveBeenCalledOnce();
    });

    test('runs the removal under the switch lock and releases it', async () => {
      const h = removeHarness(provider);

      await h.post({ number: 2, key: h.key, confirm: true });

      expect(h.lock_during_remove).toEqual([true]);
      expect(isSwitchInFlight(provider)).toBe(false);
    });

    test.each([false, true])(
      'answers account_changed when the number moved (confirm %s)',
      async (confirm) => {
        const h = removeHarness(provider);

        const response = await h.post({
          number: 2,
          key: 'someone-else',
          confirm
        });

        expect(response.body).toEqual({ ok: false, error: 'account_changed' });
        expect(h.runRemove).not.toHaveBeenCalled();
      }
    );

    test.each([false, true])(
      'blocks the active account (confirm %s)',
      async (confirm) => {
        const h = removeHarness(provider, { active: true });

        const response = await h.post({ number: 2, key: h.key, confirm });

        expect(response.body).toEqual({ ok: false, error: 'account_active' });
        expect(h.runRemove).not.toHaveBeenCalled();
      }
    );

    test.each([false, true])(
      'blocks an account a running attempt uses (confirm %s)',
      async (confirm) => {
        const h = removeHarness(provider, { in_use: ['UI-one', 'UI-two'] });

        const response = await h.post({ number: 2, key: h.key, confirm });

        expect(response.body).toEqual({
          ok: false,
          error: 'account_in_use',
          in_use: ['UI-one', 'UI-two']
        });
        expect(h.runRemove).not.toHaveBeenCalled();
      }
    );

    test('blocks with in_use_unchecked when the in-use read fails', async () => {
      const h = removeHarness(provider, { in_use: new Error('queue') });

      const response = await h.post({ number: 2, key: h.key, confirm: true });

      expect(response.body).toEqual({ ok: false, error: 'in_use_unchecked' });
      expect(h.runRemove).not.toHaveBeenCalled();
    });

    test('lists the references and unchecked repos it found', async () => {
      const refs = {
        refs: [
          { kind: 'default_account' },
          { kind: 'workspace_pin', workspace: 'beads-ui', path: '/r/beads-ui' }
        ],
        unchecked_repos: 1
      };
      const h = removeHarness(provider, { refs });

      const response = await h.post({ number: 2, key: h.key });

      expect(response.body).toEqual({
        ok: false,
        error: 'confirm_required',
        ...refs
      });
    });

    test('answers 409 switch_in_flight while a switch holds the lock', async () => {
      const h = removeHarness(provider);
      acquireSwitchLock(provider);

      const response = await h.post({ number: 2, key: h.key, confirm: true });

      expect(response).toEqual({
        status: 409,
        body: { ok: false, error: 'switch_in_flight' }
      });
      expect(h.listAccounts).not.toHaveBeenCalled();
      releaseSwitchLock(provider);
    });

    test('answers remove_failed and keeps the cache when the tool fails', async () => {
      const h = removeHarness(provider, {
        remove: commandResult(
          1,
          provider === 'claude' ? CSWAP_REMOVE_FAILED : CODEX_REMOVE_UNRESOLVED
        )
      });

      const response = await h.post({ number: 2, key: h.key, confirm: true });

      expect(response.body).toEqual({
        ok: false,
        error: 'remove_failed',
        message:
          provider === 'claude'
            ? 'Account 2 does not exist'
            : 'one or more selectors could not be resolved'
      });
      expect(h.invalidateUsageCache).not.toHaveBeenCalled();
    });

    test('answers not_found when the tool is not installed', async () => {
      const h = removeHarness(provider, {
        remove: { ...commandResult(127), not_found: true }
      });

      const response = await h.post({ number: 2, key: h.key, confirm: true });

      expect(response.body).toEqual({ ok: false, error: 'not_found' });
    });

    test.each([
      [{ key: 'x' }, 'invalid_number'],
      [{ number: 2 }, 'invalid_key']
    ])('answers 400 for %o', async (body, error) => {
      const h = removeHarness(provider);

      const response = await h.post(body);

      expect(response).toEqual({ status: 400, body: { ok: false, error } });
    });
  }
);

describe('removal output', () => {
  test('reports the codex row whose key matches the request', () => {
    const outcome = removalOutcomeOf(
      'codex',
      commandResult(0, CODEX_REMOVE_OK),
      CODEX_KEY
    );

    expect(outcome).toEqual({
      ok: true,
      removed: { number: 2, email: 'b@example.com' }
    });
  });

  test('refuses a codex removal that names another account', () => {
    const outcome = removalOutcomeOf(
      'codex',
      commandResult(0, CODEX_REMOVE_OK),
      'user-ZZZ::other'
    );

    expect(outcome.ok).toBe(false);
  });

  test('reports the cswap removal line', () => {
    const outcome = removalOutcomeOf(
      'claude',
      commandResult(0, `Removed Account 2\n${CSWAP_REMOVE_OK}\n`),
      'two@example.com'
    );

    expect(outcome).toEqual({
      ok: true,
      removed: { number: 2, email: 'two@example.com' }
    });
  });
});

describe('account references', () => {
  /**
   * @param {Partial<Parameters<typeof collectAccountRefs>[2]>} [overrides]
   */
  function refDeps(overrides = {}) {
    return {
      settingsOf: () => ({ default_account: null, accounts: [] }),
      workspaces: () => [{ path: '/repos/alpha' }, { path: '/repos/beta' }],
      kvGet: async () => ({ ok: true, found: false }),
      queueSnapshot: () => ({ provider_limit_policy: {} }),
      ...overrides
    };
  }

  test('finds the usual account and the active allow list', async () => {
    const found = await collectAccountRefs(
      'codex',
      CODEX_KEY,
      refDeps({
        settingsOf: () => ({
          default_account: CODEX_KEY,
          accounts: [CODEX_KEY]
        })
      })
    );

    expect(found).toEqual({
      refs: [{ kind: 'default_account' }, { kind: 'active_allow_list' }],
      unchecked_repos: 0
    });
  });

  test('finds repo pins and repo policy allow lists by repo', async () => {
    const found = await collectAccountRefs(
      'claude',
      'two@example.com',
      refDeps({
        kvGet: async (/** @type {string} */ root) =>
          root === '/repos/alpha'
            ? {
                ok: true,
                found: true,
                value: { schema: 1, claude_account: 'two@example.com' }
              }
            : { ok: true, found: false },
        queueSnapshot: (/** @type {string} */ root) => ({
          provider_limit_policy:
            root === '/repos/beta'
              ? {
                  claude: {
                    mode: 'switch',
                    accounts: ['two@example.com'],
                    preempt_pct: null
                  }
                }
              : {}
        })
      })
    );

    expect(found).toEqual({
      refs: [
        { kind: 'workspace_pin', workspace: 'alpha', path: '/repos/alpha' },
        { kind: 'workspace_policy', workspace: 'beta', path: '/repos/beta' }
      ],
      unchecked_repos: 0
    });
  });

  test('counts a repo whose kv read failed as unchecked', async () => {
    const found = await collectAccountRefs(
      'claude',
      'two@example.com',
      refDeps({
        kvGet: async (/** @type {string} */ root) =>
          root === '/repos/alpha'
            ? { ok: false, error: 'bd failed' }
            : { ok: true, found: false }
      })
    );

    expect(found).toEqual({ refs: [], unchecked_repos: 1 });
  });

  test('counts a repo whose kv read outlives the timeout as unchecked', async () => {
    const found = await collectAccountRefs(
      'claude',
      'two@example.com',
      refDeps({
        kvGet: () => new Promise(() => {}),
        kv_timeout_ms: 5
      })
    );

    expect(found.unchecked_repos).toBe(2);
  });

  test('counts a repo once when both of its reads failed', async () => {
    const found = await collectAccountRefs(
      'codex',
      CODEX_KEY,
      refDeps({
        workspaces: () => [{ path: '/repos/alpha' }],
        kvGet: async () => {
          throw new Error('bd');
        },
        queueSnapshot: () => {
          throw new Error('queue');
        }
      })
    );

    expect(found.unchecked_repos).toBe(1);
  });
});
