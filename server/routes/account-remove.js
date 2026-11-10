/**
 * Remove a stored account from the usage card (UI-xm29 §4.4).
 *
 * Every request — the first ask and the confirmed one alike — takes the
 * provider's switch lock, re-reads the account list and redoes every check
 * from scratch, and nothing is deleted without `confirm: true`. A block (the
 * active account, a running attempt on it, or an in-use read that failed)
 * cannot be confirmed past. References — the usual account (★), the active
 * allow list, repo pins and repo policy allow lists — are warnings only, and
 * the settings naming a removed account are left as they are.
 *
 * Account keys follow the switch path: a Claude account is its email, a
 * Codex account its `account_key`.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 * @import { CommandResult } from './account-login.js'
 */
import path from 'node:path';
import { kvGetJson } from '../bd.js';
import {
  activeSwitchSettingsOf,
  normalizeProviderLimitPolicyEntry
} from '../limit-policy-settings.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  WORKSPACE_ACCOUNTS_KV_KEY,
  normalizeWorkspaceAccounts
} from '../workspace-accounts.js';
import {
  lastJsonObjectOf,
  lastOutputLine,
  resolveExecutable,
  runCommand
} from './account-login.js';
import {
  acquireSwitchLock,
  releaseSwitchLock,
  runningBeadsUsingAccount
} from './account-switch.js';
import {
  invalidateCache as invalidateClaudeUsageCache,
  listAccountsFresh as listClaudeAccountsFresh,
  resolveCswapPath
} from './claude-usage.js';
import {
  invalidateCache as invalidateCodexUsageCache,
  listAccountsFresh as listCodexAccountsFresh
} from './codex-usage.js';

/**
 * @typedef {'claude'|'codex'} RemoveProvider
 * @typedef {'default_account'|'active_allow_list'|'workspace_pin'|'workspace_policy'} RemoveRefKind
 * @typedef {{ kind: RemoveRefKind, workspace?: string, path?: string }} RemoveRef
 * @typedef {{ refs: RemoveRef[], unchecked_repos: number }} RemoveRefs
 * @typedef {{ key: string, number: number, email: string, active: boolean }} ListedAccount
 * @typedef {{ ok: true, accounts: ListedAccount[], active_key: string|null } | { ok: false, error: string }} AccountListRead
 * @typedef {{ path: string }} RegisteredWorkspace
 */

/**
 * @typedef {Object} AccountRemoveDeps
 * @property {RemoveProvider} provider
 * @property {() => Promise<AccountListRead>} [listAccounts]
 * @property {(account_key: string) => string[]|Promise<string[]>} [runningBeads] -
 * Throws when the in-use answer is unknown.
 * @property {(account_key: string) => Promise<RemoveRefs>} [collectRefs]
 * @property {(account_number: number) => Promise<CommandResult>} [runRemove]
 * @property {() => void} [invalidateUsageCache]
 * @property {(provider: RemoveProvider) => boolean} [acquireLock]
 * @property {(provider: RemoveProvider) => void} [releaseLock]
 */

const KV_TIMEOUT_MS = 5_000;
const REMOVE_TIMEOUT_MS = 30_000;

/**
 * Reject when `promise` outlives `ms`.
 *
 * @template T
 * @param {Promise<T>} promise
 * @param {number} ms
 * @returns {Promise<T>}
 */
function withTimeout(promise, ms) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  const timeout = new Promise((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error('timeout')), ms);
    timer.unref?.();
  });
  return /** @type {Promise<T>} */ (
    Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
  );
}

/**
 * Collect every setting that names `account_key` (§4.4-4). Each registered
 * repo is read in parallel; a repo whose kv or queue cannot be read counts
 * once into `unchecked_repos` instead of failing the request.
 *
 * @param {RemoveProvider} provider
 * @param {string} account_key
 * @param {{ settingsOf?: (provider: RemoveProvider) => { default_account: string|null, accounts: string[] }, workspaces?: () => RegisteredWorkspace[], kvGet?: (root: string, key: string) => Promise<unknown>, queueSnapshot?: (root: string) => unknown, kv_timeout_ms?: number }} [deps]
 * @returns {Promise<RemoveRefs>}
 */
export async function collectAccountRefs(provider, account_key, deps = {}) {
  const settingsOf = deps.settingsOf || activeSwitchSettingsOf;
  const workspaces = deps.workspaces || getAvailableWorkspaces;
  const kvGet =
    deps.kvGet ||
    ((/** @type {string} */ root, /** @type {string} */ key) =>
      kvGetJson(key, { cwd: root, timeout_ms: KV_TIMEOUT_MS }));
  const queueSnapshot =
    deps.queueSnapshot ||
    ((/** @type {string} */ root) =>
      getWorkerRuntime().queueStore.snapshot(root));
  const kv_timeout_ms = deps.kv_timeout_ms ?? KV_TIMEOUT_MS;
  const account_field = `${provider}_account`;

  /** @type {RemoveRef[]} */
  const refs = [];
  const settings = settingsOf(provider);
  if (settings.default_account === account_key) {
    refs.push({ kind: 'default_account' });
  }
  if (settings.accounts.includes(account_key)) {
    refs.push({ kind: 'active_allow_list' });
  }

  const roots = [
    ...new Set(workspaces().map((workspace) => path.resolve(workspace.path)))
  ];
  const checks = await Promise.all(
    roots.map(async (root) => {
      const workspace = path.basename(root);
      /** @type {RemoveRef[]} */
      const found = [];
      let unchecked = false;
      try {
        const layer = normalizeWorkspaceAccounts(
          await withTimeout(
            Promise.resolve(kvGet(root, WORKSPACE_ACCOUNTS_KV_KEY)),
            kv_timeout_ms
          )
        );
        if (layer.values[account_field] === account_key) {
          found.push({ kind: 'workspace_pin', workspace, path: root });
        } else if (layer.state === 'unusable') {
          unchecked = true;
        }
      } catch {
        unchecked = true;
      }
      try {
        const queue = /** @type {any} */ (queueSnapshot(root));
        const policy = normalizeProviderLimitPolicyEntry(
          queue?.provider_limit_policy?.[provider]
        );
        if (policy.accounts.includes(account_key)) {
          found.push({ kind: 'workspace_policy', workspace, path: root });
        }
      } catch {
        unchecked = true;
      }
      return { found, unchecked };
    })
  );
  let unchecked_repos = 0;
  for (const check of checks) {
    refs.push(...check.found);
    if (check.unchecked) {
      unchecked_repos += 1;
    }
  }
  return { refs, unchecked_repos };
}

/**
 * The launchd-safe, shell-free removal command for one provider.
 *
 * @param {RemoveProvider} provider
 * @returns {(account_number: number) => Promise<CommandResult>}
 */
export function createAccountRemoveRunner(provider) {
  return async (account_number) => {
    const bin =
      provider === 'claude'
        ? resolveCswapPath()
        : resolveExecutable('codex-auth');
    if (!bin) {
      return {
        code: 127,
        stdout: '',
        stderr: '',
        not_found: true,
        timed_out: false
      };
    }
    const args =
      provider === 'claude'
        ? ['remove', String(account_number), '--yes', '--json']
        : ['remove', String(account_number), '--json'];
    return runCommand(bin, args, { timeout_ms: REMOVE_TIMEOUT_MS });
  };
}

/**
 * Read what the removal tool reports it removed, checked against the
 * requested key: `codex-auth remove --json` lists `removed[]` rows with
 * `account_key`; `cswap remove --yes --json` ends with one
 * `{ ok, removed: { number, email } }` line.
 *
 * @param {RemoveProvider} provider
 * @param {CommandResult} result
 * @param {string} account_key
 * @returns {{ ok: true, removed: { number: number, email: string } } | { ok: false, message: string|null }}
 */
export function removalOutcomeOf(provider, result, account_key) {
  const line = lastJsonObjectOf(result.stdout);
  if (provider === 'codex') {
    const rows = Array.isArray(line?.removed) ? line.removed : [];
    const row = rows.find(
      (/** @type {any} */ candidate) => candidate?.account_key === account_key
    );
    if (result.code === 0 && row && Number.isInteger(row.number)) {
      return {
        ok: true,
        removed: {
          number: row.number,
          email: typeof row.email === 'string' ? row.email : ''
        }
      };
    }
    const message =
      typeof line?.error?.message === 'string' ? line.error.message : null;
    return {
      ok: false,
      message: lastOutputLine(message ?? `${result.stdout}\n${result.stderr}`)
    };
  }
  if (
    result.code === 0 &&
    line?.ok === true &&
    line.removed?.email === account_key &&
    Number.isInteger(line.removed?.number)
  ) {
    return {
      ok: true,
      removed: { number: line.removed.number, email: line.removed.email }
    };
  }
  const message = typeof line?.message === 'string' ? line.message : null;
  return {
    ok: false,
    message: lastOutputLine(message ?? `${result.stdout}\n${result.stderr}`)
  };
}

/**
 * Read `{ number, key }` out of a JSON request body.
 *
 * @param {unknown} body
 * @returns {{ ok: true, number: number, key: string, confirm: boolean } | { ok: false, error: string }}
 */
function readRemoveRequest(body) {
  const input = /** @type {any} */ (
    body && typeof body === 'object' ? body : {}
  );
  if (!Number.isInteger(input.number) || input.number <= 0) {
    return { ok: false, error: 'invalid_number' };
  }
  if (typeof input.key !== 'string' || input.key.length === 0) {
    return { ok: false, error: 'invalid_key' };
  }
  return {
    ok: true,
    number: input.number,
    key: input.key,
    confirm: input.confirm === true
  };
}

/**
 * Create the remove handler for one provider.
 *
 * @param {AccountRemoveDeps} options
 * @returns {RequestHandler}
 */
export function createAccountRemoveHandler(options) {
  const provider = options.provider;
  const listAccounts =
    options.listAccounts ||
    (provider === 'claude'
      ? () => listClaudeAccountsFresh()
      : () => listCodexAccountsFresh());
  const runningBeads =
    options.runningBeads ||
    ((/** @type {string} */ account_key) =>
      runningBeadsUsingAccount(provider, account_key));
  const collectRefs =
    options.collectRefs ||
    ((/** @type {string} */ account_key) =>
      collectAccountRefs(provider, account_key));
  const runRemove = options.runRemove || createAccountRemoveRunner(provider);
  const invalidateUsageCache =
    options.invalidateUsageCache ||
    (provider === 'claude'
      ? () => invalidateClaudeUsageCache()
      : () => invalidateCodexUsageCache());
  const acquireLock = options.acquireLock || acquireSwitchLock;
  const releaseLock = options.releaseLock || releaseSwitchLock;

  /**
   * Every check of §4.4 1-4 against a fresh list, as the response body of a
   * refusal or the facts a removal proceeds on.
   *
   * @param {number} account_number
   * @param {string} account_key
   * @returns {Promise<{ ok: false, body: Record<string, unknown> } | { ok: true, refs: RemoveRefs }>}
   */
  async function check(account_number, account_key) {
    const listed = await listAccounts();
    if (!listed.ok) {
      return {
        ok: false,
        body: { ok: false, error: 'account_list_unavailable' }
      };
    }
    const row = listed.accounts.find(
      (account) => account.number === account_number
    );
    if (!row || row.key !== account_key) {
      return { ok: false, body: { ok: false, error: 'account_changed' } };
    }
    if (row.active === true) {
      return { ok: false, body: { ok: false, error: 'account_active' } };
    }
    /** @type {string[]} */
    let in_use;
    try {
      in_use = await runningBeads(account_key);
    } catch {
      return { ok: false, body: { ok: false, error: 'in_use_unchecked' } };
    }
    if (in_use.length > 0) {
      return {
        ok: false,
        body: { ok: false, error: 'account_in_use', in_use }
      };
    }
    return { ok: true, refs: await collectRefs(account_key) };
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async function handler(req, res) {
    const request = readRemoveRequest(req.body);
    if (!request.ok) {
      res.status(400).json({ ok: false, error: request.error });
      return;
    }
    if (!acquireLock(provider)) {
      res.status(409).json({ ok: false, error: 'switch_in_flight' });
      return;
    }
    try {
      const checked = await check(request.number, request.key);
      if (!checked.ok) {
        res.status(200).json(checked.body);
        return;
      }
      if (!request.confirm) {
        res.status(200).json({
          ok: false,
          error: 'confirm_required',
          refs: checked.refs.refs,
          unchecked_repos: checked.refs.unchecked_repos
        });
        return;
      }
      const result = await runRemove(request.number);
      if (result.not_found) {
        res.status(200).json({ ok: false, error: 'not_found' });
        return;
      }
      if (result.code === 0) {
        // The list changed whenever the tool succeeded, matched or not.
        invalidateUsageCache();
      }
      const outcome = removalOutcomeOf(provider, result, request.key);
      if (!outcome.ok) {
        res.status(200).json({
          ok: false,
          error: 'remove_failed',
          ...(outcome.message ? { message: outcome.message } : {})
        });
        return;
      }
      res.status(200).json({ ok: true, removed: outcome.removed });
    } catch {
      res.status(200).json({ ok: false, error: 'remove_failed' });
    } finally {
      releaseLock(provider);
    }
  }

  return handler;
}

export const claudeAccountRemoveHandler = createAccountRemoveHandler({
  provider: 'claude'
});

export const codexAccountRemoveHandler = createAccountRemoveHandler({
  provider: 'codex'
});
