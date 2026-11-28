/**
 * agy usage route and the agy credential-change coordination (agy-runtime
 * §3.4-§3.5).
 *
 * `GET /api/agy-usage` answers the shared usage frame (`available`, `windows`,
 * `accounts[]`). The active account's windows come from the pre-run quota read
 * the agy model list owns (`agy -p /usage`); every other saved slot shows the
 * observation `agy-auth list --json` stored for it. The answer is cached for
 * 180 seconds, a failure too.
 *
 * Every credential change (login, switch, remove) runs through
 * {@link runAgyCredentialChange}: one at a time, never while an agy run or an
 * agy conversation window is live, and on success the model list and this
 * route's cache are dropped. The flag itself lives in `agy-model-list.js`,
 * which the scheduler gate reads.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 */
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../bd.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import {
  agyModelList,
  agyUsageBuckets,
  agyUsageWindows,
  beginAgyCredentialChange,
  endAgyCredentialChange,
  invalidateAgyModelList
} from '../worker/agy-model-list.js';
import { getWorkerRuntime } from '../worker/runtime.js';

/**
 * @typedef {import('../worker/agy-model-list.js').AgyUsageWindow} AgyUsageWindow
 * @typedef {import('../worker/agy-model-list.js').AgyQuota} AgyQuota
 * @typedef {{ save: boolean, switch: boolean, remove: boolean }} AgyCapabilities
 * @typedef {{ name: string, account: string|null, active: boolean, saved_at: string|null, usage: unknown[]|null, usage_at: string|null }} AgyAuthSlot
 * @typedef {{ ok: true, capabilities: AgyCapabilities, active: string|null, slots: AgyAuthSlot[] } | { ok: false }} AgyAuthList
 * @typedef {{ quota: AgyQuota, groups: unknown, read_at: number }} AgyUsageRead
 * @typedef {{ key: string, number: number, email: string, alias: string|null, plan: null, active: boolean, status: string, windows: AgyUsageWindow[], fetchedAt: string|null, ageSeconds: number|null }} AgyUsageAccount
 * @typedef {{ available: false, capabilities?: AgyCapabilities, accounts?: AgyUsageAccount[] }
 *   | { available: true, provider: 'agy', windows: AgyUsageWindow[], fetchedAt: string, ageSeconds: number, capabilities: AgyCapabilities, accounts: AgyUsageAccount[] }} AgyUsagePayload
 * @typedef {(args: string[], options?: { timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>} RunAgyAuth
 */

const CACHE_TTL_MS = 180_000;
const AGY_AUTH_LIST_TIMEOUT_MS = 10_000;
// `agy-auth switch` reads the new account's usage itself (its own bound is
// 120 seconds) before it answers.
const AGY_AUTH_CHANGE_TIMEOUT_MS = 150_000;
const TMUX_TIMEOUT_MS = 10_000;
/** The active row when the signed-in account is in no saved slot. */
const SIGNED_IN_KEY = 'active';
const SIGNED_IN_LABEL = '현재 로그인';

/** @type {AgyCapabilities} */
const NO_CAPABILITIES = Object.freeze({
  save: false,
  switch: false,
  remove: false
});

/** @type {AgyUsagePayload|null} */
let cached_payload = null;
let cache_expires_at = 0;
/** @type {Promise<AgyUsagePayload>|null} */
let in_flight = null;
// Bumped by `invalidateCache()`; a read started under an older generation
// never lands, so a post-switch answer cannot show the old account.
let cache_generation = 0;

/**
 * Run `agy-auth` without a shell; a missing PATH entry falls back to
 * `~/.local/bin/agy-auth` (launchd PATH).
 *
 * @type {RunAgyAuth}
 */
export async function runAgyAuth(args, options = {}) {
  const timeout_ms = options.timeout_ms ?? AGY_AUTH_LIST_TIMEOUT_MS;
  const from_path = await runShell('agy-auth', args, { timeout_ms });
  if (from_path.code !== 127) {
    return from_path;
  }
  return runShell(path.join(os.homedir(), '.local', 'bin', 'agy-auth'), args, {
    timeout_ms
  });
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function stringOrNull(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Parse one `agy-auth list --json` answer. A capability it does not name is
 * off; anything that is not a list answer is `{ ok: false }`.
 *
 * @param {string} text
 * @returns {AgyAuthList}
 */
export function parseAgyAuthList(text) {
  /** @type {any} */
  let root;
  try {
    root = JSON.parse(text);
  } catch {
    return { ok: false };
  }
  if (
    typeof root !== 'object' ||
    root === null ||
    root.ok !== true ||
    !Array.isArray(root.slots)
  ) {
    return { ok: false };
  }
  const raw_capabilities =
    typeof root.capabilities === 'object' && root.capabilities !== null
      ? root.capabilities
      : {};
  /** @type {AgyAuthSlot[]} */
  const slots = [];
  for (const slot of root.slots) {
    const name = stringOrNull(slot?.name);
    if (name === null) {
      continue;
    }
    slots.push({
      name,
      account: stringOrNull(slot.account),
      active: slot.active === true,
      saved_at: stringOrNull(slot.saved_at),
      usage: Array.isArray(slot.usage) ? slot.usage : null,
      usage_at: stringOrNull(slot.usage_at)
    });
  }
  return {
    ok: true,
    capabilities: {
      save: raw_capabilities.save === true,
      switch: raw_capabilities.switch === true,
      remove: raw_capabilities.remove === true
    },
    active: stringOrNull(root.active),
    slots
  };
}

/**
 * Read the saved agy slots. Any failure is `{ ok: false }`.
 *
 * @param {{ run?: RunAgyAuth }} [options]
 * @returns {Promise<AgyAuthList>}
 */
export async function listAgyAccounts(options = {}) {
  const run = options.run || runAgyAuth;
  try {
    const result = await run(['list', '--json'], {
      timeout_ms: AGY_AUTH_LIST_TIMEOUT_MS
    });
    if (result.code !== 0) {
      return { ok: false };
    }
    return parseAgyAuthList(result.stdout);
  } catch {
    return { ok: false };
  }
}

/**
 * The active account's `/usage` read through the shared agy model list, or
 * null when it failed.
 *
 * @returns {Promise<AgyUsageRead|null>}
 */
async function defaultReadUsage() {
  const list = agyModelList();
  await list.quota();
  return list.usage();
}

/**
 * @param {string} fetched_at
 * @param {() => number} now
 * @returns {number}
 */
function snapshotAge(fetched_at, now) {
  return Math.max(0, Math.floor((now() - Date.parse(fetched_at)) / 1000));
}

/**
 * Build the route payload from the live read and the slot list.
 *
 * @param {AgyUsageRead|null} usage
 * @param {AgyAuthList} list
 * @param {() => number} now
 * @returns {AgyUsagePayload}
 */
export function normalizeAgyUsage(usage, list, now) {
  if (usage === null && !list.ok) {
    return { available: false };
  }
  const live =
    usage === null
      ? null
      : {
          windows: agyUsageWindows(agyUsageBuckets(usage.groups)),
          fetchedAt: new Date(usage.read_at).toISOString()
        };
  /**
   * The active row carries the live read, or no windows when it failed.
   *
   * @param {{ key: string, number: number, email: string, alias: string|null }} identity
   * @returns {AgyUsageAccount}
   */
  function activeRow(identity) {
    return {
      ...identity,
      plan: null,
      active: true,
      status: live ? 'ok' : 'unavailable',
      windows: live ? live.windows : [],
      fetchedAt: live ? live.fetchedAt : null,
      ageSeconds: live ? snapshotAge(live.fetchedAt, now) : null
    };
  }
  /** @type {AgyUsageAccount[]} */
  const accounts = [];
  let has_active = false;
  if (list.ok) {
    list.slots.forEach((slot, index) => {
      const identity = {
        key: slot.name,
        number: index + 1,
        email: slot.account ?? slot.name,
        alias: slot.name
      };
      if (slot.active || slot.name === list.active) {
        has_active = true;
        accounts.push(activeRow(identity));
        return;
      }
      const windows = agyUsageWindows(slot.usage ?? []);
      const observed = windows.length > 0 && slot.usage_at !== null;
      accounts.push({
        ...identity,
        plan: null,
        active: false,
        status: observed ? 'ok' : 'no_usage',
        windows: observed ? windows : [],
        fetchedAt: observed ? slot.usage_at : null,
        ageSeconds:
          observed && slot.usage_at !== null
            ? snapshotAge(slot.usage_at, now)
            : null
      });
    });
  }
  if (!has_active) {
    accounts.push(
      activeRow({
        key: SIGNED_IN_KEY,
        number: accounts.length + 1,
        email: SIGNED_IN_LABEL,
        alias: null
      })
    );
  }
  const capabilities = list.ok ? list.capabilities : { ...NO_CAPABILITIES };
  if (!live) {
    return { available: false, capabilities, accounts };
  }
  return {
    available: true,
    provider: 'agy',
    windows: live.windows,
    fetchedAt: live.fetchedAt,
    ageSeconds: snapshotAge(live.fetchedAt, now),
    capabilities,
    accounts
  };
}

/**
 * @param {() => Promise<AgyUsageRead|null>} readUsage
 * @param {() => Promise<AgyAuthList>} listAccounts
 * @param {() => number} now
 * @returns {Promise<AgyUsagePayload>}
 */
async function loadAgyUsage(readUsage, listAccounts, now) {
  const [usage, list] = await Promise.all([
    readUsage().catch(() => null),
    listAccounts().catch(() => /** @type {AgyAuthList} */ ({ ok: false }))
  ]);
  return normalizeAgyUsage(usage ?? null, list, now);
}

/**
 * Read through the module-level positive/negative TTL cache.
 *
 * @param {() => Promise<AgyUsageRead|null>} readUsage
 * @param {() => Promise<AgyAuthList>} listAccounts
 * @param {() => number} now
 * @returns {Promise<AgyUsagePayload>}
 */
async function getAgyUsage(readUsage, listAccounts, now) {
  if (cached_payload && now() < cache_expires_at) {
    return cached_payload;
  }
  if (in_flight) {
    return in_flight;
  }
  const generation = cache_generation;
  const pending = loadAgyUsage(readUsage, listAccounts, now).then((payload) => {
    if (generation === cache_generation) {
      cached_payload = payload;
      cache_expires_at = now() + CACHE_TTL_MS;
    }
    return payload;
  });
  in_flight = pending;
  void pending.finally(() => {
    if (in_flight === pending) {
      in_flight = null;
    }
  });
  return pending;
}

/**
 * Recalculate every age for this response without reading again.
 *
 * @param {AgyUsagePayload} payload
 * @param {() => number} now
 * @returns {AgyUsagePayload}
 */
function withCurrentAge(payload, now) {
  const accounts = payload.accounts?.map((account) =>
    account.fetchedAt === null
      ? account
      : { ...account, ageSeconds: snapshotAge(account.fetchedAt, now) }
  );
  if (!payload.available) {
    return accounts ? { ...payload, accounts } : { ...payload };
  }
  return {
    ...payload,
    ageSeconds: snapshotAge(payload.fetchedAt, now),
    accounts: accounts ?? []
  };
}

/** Drop the cached answer and disown any read in flight. */
export function invalidateCache() {
  cache_generation += 1;
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}

/**
 * Create the fail-quiet agy usage route handler.
 *
 * @param {{ readUsage?: () => Promise<AgyUsageRead|null>, listAccounts?: () => Promise<AgyAuthList>, now?: () => number }} [options]
 * @returns {RequestHandler}
 */
export function createAgyUsageHandler(options = {}) {
  const readUsage = options.readUsage || defaultReadUsage;
  const listAccounts = options.listAccounts || (() => listAgyAccounts());
  const now = options.now || (() => Date.now());

  /**
   * @param {Request} _req
   * @param {Response} res
   */
  async function handler(_req, res) {
    const payload = withCurrentAge(
      await getAgyUsage(readUsage, listAccounts, now),
      now
    );
    res.set('Cache-Control', 'no-store');
    res.type('application/json');
    res.status(200).send(payload);
  }

  return handler;
}

export const agyUsageHandler = createAgyUsageHandler();

/**
 * Re-read the agy usage now and fill the cache (login success path).
 *
 * @returns {Promise<void>}
 */
export async function rereadAgyUsage() {
  invalidateCache();
  const now = () => Date.now();
  await getAgyUsage(defaultReadUsage, () => listAgyAccounts(), now);
}

/** Reset module state between cache tests. */
export function __resetCacheForTest() {
  invalidateCache();
}

/**
 * Whether a tmux pane recorded as an agy runtime is alive — an agy
 * conversation window holds the agy lock as long as it lives.
 *
 * @param {{ runTmux?: (args: string[]) => Promise<{ code: number, stdout: string, stderr: string }> }} [options]
 * @returns {Promise<boolean>}
 */
export async function agyConversationOpen(options = {}) {
  const runTmux =
    options.runTmux ||
    ((/** @type {string[]} */ args) =>
      runShell('tmux', args, { timeout_ms: TMUX_TIMEOUT_MS }));
  try {
    const result = await runTmux([
      'list-panes',
      '-a',
      '-F',
      '#{pane_dead} #{@agent_runtime}'
    ]);
    if (result.code !== 0) {
      return false;
    }
    return result.stdout
      .split('\n')
      .some((line) => line.trim().split(/\s+/).join(' ') === '0 agy');
  } catch {
    return false;
  }
}

/**
 * Whether any registered workspace has a running agy attempt.
 *
 * @returns {boolean}
 */
export function agyRunLive() {
  try {
    const { queueStore } = getWorkerRuntime();
    for (const workspace of getAvailableWorkspaces()) {
      const queue = queueStore.snapshot(path.resolve(workspace.path));
      for (const attempt of Object.values(queue.attempts || {})) {
        if (attempt.status === 'running' && attempt.runner === 'agy') {
          return true;
        }
      }
    }
  } catch {
    // An unreadable queue is no evidence; agy-auth's own lock still refuses.
  }
  return false;
}

/**
 * Whether an agy run or an agy conversation window is live.
 *
 * @returns {Promise<boolean>}
 */
export async function agyActivityBusy() {
  if (agyRunLive()) {
    return true;
  }
  return agyConversationOpen();
}

/**
 * @typedef {Object} AgyCredentialChangeDeps
 * @property {() => boolean} begin - Take the change flag; false when held.
 * @property {() => void} end
 * @property {() => Promise<boolean>} busy - An agy run or window is live.
 * @property {() => Promise<void>} settle - Let reads in flight finish.
 * @property {() => void} invalidateModels
 * @property {() => void} invalidateUsage
 */

/** @type {AgyCredentialChangeDeps} */
export const DEFAULT_AGY_CHANGE_DEPS = {
  begin: beginAgyCredentialChange,
  end: endAgyCredentialChange,
  busy: agyActivityBusy,
  settle: async () => {
    await agyModelList().settle();
  },
  invalidateModels: invalidateAgyModelList,
  invalidateUsage: invalidateCache
};

/**
 * Run one agy credential change under the coordination rules: one at a time,
 * never next to a live agy run or window, reads settled first, and both caches
 * dropped after a success (after the flag is released, so the new reads run).
 *
 * @template {{ ok: boolean }} T
 * @param {() => Promise<T>} action
 * @param {AgyCredentialChangeDeps} [deps]
 * @returns {Promise<T|{ ok: false, error: 'busy' }>}
 */
export async function runAgyCredentialChange(
  action,
  deps = DEFAULT_AGY_CHANGE_DEPS
) {
  if (!deps.begin()) {
    return { ok: false, error: 'busy' };
  }
  /** @type {T} */
  let result;
  try {
    if (await deps.busy()) {
      return { ok: false, error: 'busy' };
    }
    await deps.settle();
    result = await action();
  } finally {
    deps.end();
  }
  if (result.ok) {
    deps.invalidateModels();
    deps.invalidateUsage();
  }
  return result;
}

/**
 * @param {{ code: number, stdout: string }} result
 * @param {string} fallback
 * @returns {{ ok: true, [key: string]: unknown } | { ok: false, error: string }}
 */
function changeResultOf(result, fallback) {
  /** @type {any} */
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = null;
  }
  if (result.code === 0 && parsed?.ok === true) {
    return parsed;
  }
  if (result.code === 75) {
    return { ok: false, error: 'busy' };
  }
  if (result.code === 3) {
    return { ok: false, error: 'not_supported' };
  }
  return {
    ok: false,
    error: typeof parsed?.error === 'string' ? parsed.error : fallback
  };
}

/**
 * `agy-auth switch <name> --json`, without the coordination around it.
 *
 * @param {string} name
 * @param {{ run?: RunAgyAuth }} [options]
 */
export async function runAgySwitch(name, options = {}) {
  const run = options.run || runAgyAuth;
  return changeResultOf(
    await run(['switch', name, '--json'], {
      timeout_ms: AGY_AUTH_CHANGE_TIMEOUT_MS
    }),
    'switch_failed'
  );
}

/**
 * `agy-auth remove <name> --json`, without the coordination around it.
 *
 * @param {string} name
 * @param {{ run?: RunAgyAuth }} [options]
 */
export async function runAgyRemove(name, options = {}) {
  const run = options.run || runAgyAuth;
  return changeResultOf(
    await run(['remove', name, '--json'], {
      timeout_ms: AGY_AUTH_CHANGE_TIMEOUT_MS
    }),
    'remove_failed'
  );
}

/**
 * Switch the agy account under the coordination rules (the scheduler's
 * auto-switch path).
 *
 * @param {string} name
 */
export function switchAgyAccount(name) {
  return runAgyCredentialChange(() => runAgySwitch(name));
}
