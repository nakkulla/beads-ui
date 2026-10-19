/**
 * POST /api/codex/switch-candidate — the session-facing Codex switch lookup
 * (UI-9y1k §4.4).
 *
 * A Claude session whose Codex run (review, consult, implementation leaf)
 * ended on an account limit asks here which account to continue on. The answer
 * comes from the SAME rule the Worker's reactive switch uses
 * (`selectCodexSwitchCandidate`) over the workspace's Codex limit policy, the
 * server-global credit settings, and one fresh `codex-auth list --json --api`
 * read — the 180-second usage cache is bypassed, because the caller has just
 * hit a limit the cache may not show yet.
 *
 * On a choice the account's `CODEX_HOME` mirror is prepared, so the caller can
 * relaunch with it at once. It is a POST because preparing the mirror creates
 * directories and links, like the other state-changing calls; the server's
 * rules apply unchanged (tailnet binding, no token, JSON body, no CORS). The
 * response names the account by its codex-auth NUMBER only — never an email or
 * an account key.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 * @typedef {import('../worker/account-catalog.js').Account} Account
 * @typedef {import('../worker/codex-switch-candidate.js').CreditLedger} CreditLedger
 */
import os from 'node:os';
import path from 'node:path';
import { codexCreditStore } from '../codex-credit-store.js';
import {
  codexAccountAuthFile,
  prepareCodexAccountHome
} from '../worker/codex-account-home.js';
import { selectCodexSwitchCandidate } from '../worker/codex-switch-candidate.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { codexAccountHomeDir } from '../worker/state-paths.js';
import { listAccountsFresh } from './codex-usage.js';
import { workspaceKeyOf } from './worker-queue.js';

/** The two limit kinds a caller may report. */
const LIMIT_KINDS = ['account', 'workspace_credits'];

/**
 * @typedef {Object} SwitchCandidateDeps
 * @property {(root_dir: unknown) => string|null} [workspaceKeyOf]
 * @property {(workspace: string) => any} [queueSnapshot] - The workspace queue
 * (its `provider_limit_policy` and `provider_hold`).
 * @property {() => Promise<{ ok: true, accounts: Account[], active_key: string|null }|{ ok: false, error?: string }>} [listAccounts]
 * - A fresh Codex account read.
 * @property {CreditLedger} [credit]
 * @property {typeof prepareCodexAccountHome} [prepareCodexAccountHome]
 * @property {(key: string) => string} [codexAccountHomeDir]
 * @property {() => string} [codexRoot]
 */

/**
 * The account key a bdui mirror `CODEX_HOME` belongs to, or null when the path
 * is not one of `codexAccountHomeDir`'s mirrors.
 *
 * @param {string} home
 * @param {(key: string) => string} homeDirOf
 * @returns {string|null}
 */
export function mirrorAccountKey(home, homeDirOf) {
  const mirrors_root = path.dirname(path.resolve(homeDirOf('probe')));
  const resolved = path.resolve(home);
  if (path.dirname(resolved) !== mirrors_root) {
    return null;
  }
  const encoded = path.basename(resolved);
  if (!/^[A-Za-z0-9_-]+$/.test(encoded)) {
    return null;
  }
  const key = Buffer.from(encoded, 'base64url').toString('utf8');
  return key.length > 0 &&
    Buffer.from(key, 'utf8').toString('base64url') === encoded
    ? key
    : null;
}

/**
 * The validated request body, or null for a bad request.
 *
 * @param {unknown} raw
 * @returns {{ root_dir: unknown, current_home: string, tried: number[], limit_kind: 'account'|'workspace_credits' }|null}
 */
function readBody(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return null;
  }
  const body = /** @type {any} */ (raw);
  const current_home = body.current_home ?? '';
  const tried = body.tried ?? [];
  const limit_kind = body.limit_kind ?? 'account';
  if (
    typeof current_home !== 'string' ||
    !Array.isArray(tried) ||
    !tried.every(
      (/** @type {unknown} */ value) =>
        typeof value === 'number' && Number.isInteger(value) && value > 0
    ) ||
    !LIMIT_KINDS.includes(limit_kind)
  ) {
    return null;
  }
  return {
    root_dir: body.root_dir,
    current_home,
    tried,
    limit_kind
  };
}

/**
 * Accounts a usage hold of this workspace's queue names.
 *
 * @param {any} queue
 * @returns {Set<string>}
 */
function heldAccountsOf(queue) {
  /** @type {Set<string>} */
  const held = new Set();
  for (const hold of Object.values(queue?.provider_hold || {})) {
    for (const target of /** @type {any} */ (hold)?.targets || []) {
      if (typeof target?.account === 'string') {
        held.add(target.account);
      }
    }
  }
  return held;
}

/**
 * Create the handler with injectable dependencies.
 *
 * @param {SwitchCandidateDeps} [deps]
 * @returns {RequestHandler}
 */
export function createCodexSwitchCandidateHandler(deps = {}) {
  const resolveWorkspace = deps.workspaceKeyOf ?? workspaceKeyOf;
  const queueSnapshot =
    deps.queueSnapshot ??
    ((/** @type {string} */ workspace) =>
      getWorkerRuntime().queueStore.snapshot(workspace));
  const listAccounts = deps.listAccounts ?? (() => listAccountsFresh());
  const homeDirOf = deps.codexAccountHomeDir ?? codexAccountHomeDir;
  const prepareHome = deps.prepareCodexAccountHome ?? prepareCodexAccountHome;
  const codexRoot =
    deps.codexRoot ??
    (() => {
      const configured = process.env.CODEX_HOME;
      return typeof configured === 'string' && configured.length > 0
        ? configured
        : path.join(os.homedir(), '.codex');
    });

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async function handler(req, res) {
    res.set('Cache-Control', 'no-store');
    const body = readBody(req.body);
    const workspace = body ? resolveWorkspace(body.root_dir) : null;
    if (!body || workspace === null) {
      res.status(400).json({ ok: false, error: 'bad_request' });
      return;
    }
    const policy = queueSnapshot(workspace)?.provider_limit_policy?.codex;
    if (policy?.mode === 'wait') {
      res
        .status(200)
        .json({ ok: true, decision: 'none', reason: 'policy_wait' });
      return;
    }
    const allowed = Array.isArray(policy?.accounts) ? policy.accounts : [];
    if (allowed.length === 0) {
      res
        .status(200)
        .json({ ok: true, decision: 'none', reason: 'unconfigured' });
      return;
    }
    /** @type {any} */
    let listed;
    try {
      listed = await listAccounts();
    } catch {
      listed = null;
    }
    if (!listed?.ok || !Array.isArray(listed.accounts)) {
      res
        .status(200)
        .json({ ok: true, decision: 'none', reason: 'catalog_unavailable' });
      return;
    }
    /** @type {Account[]} */
    const accounts = listed.accounts;
    const mirror_key =
      body.current_home.length > 0
        ? mirrorAccountKey(body.current_home, homeDirOf)
        : null;
    // An empty or non-mirror home runs on the machine's active login.
    const current_account =
      mirror_key ??
      (typeof listed.active_key === 'string' ? listed.active_key : null);
    const excluded_accounts = accounts
      .filter(
        (account) =>
          typeof account.number === 'number' &&
          body.tried.includes(account.number)
      )
      .map((account) => account.key);
    // The queue is read again after the catalog, so a hold written while
    // codex-auth ran still counts.
    const decision = selectCodexSwitchCandidate({
      accounts,
      allowed,
      current_account,
      held_accounts: heldAccountsOf(queueSnapshot(workspace)),
      excluded_accounts,
      exclude_same_workspace: body.limit_kind === 'workspace_credits',
      kind: 'reactive',
      credit: deps.credit ?? codexCreditStore()
    });
    if (decision.decision === 'none') {
      res
        .status(200)
        .json({ ok: true, decision: 'none', reason: decision.reason });
      return;
    }
    const root = codexRoot();
    const prepared = await prepareHome({
      key: decision.key,
      auth_file: codexAccountAuthFile(root, decision.key),
      codex_root: root,
      home_dir: homeDirOf(decision.key)
    });
    if (!prepared.ok) {
      res
        .status(200)
        .json({ ok: true, decision: 'none', reason: 'home_prepare_failed' });
      return;
    }
    res.status(200).json({
      ok: true,
      decision: 'switch',
      account_number: decision.number,
      codex_home: prepared.home_dir,
      credit_mode: decision.credit_mode,
      reason: decision.reason
    });
  }

  return handler;
}

export const codexSwitchCandidateHandler = createCodexSwitchCandidateHandler();
