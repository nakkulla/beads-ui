import express from 'express';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createApp } from '../app.js';
import { prepareCodexAccountHome } from '../worker/codex-account-home.js';
import {
  createCodexSwitchCandidateHandler,
  mirrorAccountKey
} from './codex-switch-candidate.js';

const ROOT = '/repo';
const ACCOUNT_1 = 'user-1::ws-a';
const ACCOUNT_2 = 'user-2::ws-a';
const ACCOUNT_3 = 'user-3::ws-b';

/** @type {string} */
let tmp_dir;

/**
 * @param {string} key
 * @returns {string}
 */
function homeDirOf(key) {
  return path.join(
    tmp_dir,
    'codex-homes',
    Buffer.from(key, 'utf8').toString('base64url')
  );
}

/**
 * One catalog row.
 *
 * @param {string} key
 * @param {number} number
 * @param {number} pct - Weekly window usage.
 * @param {Record<string, unknown>} [extra]
 */
function row(key, number, pct, extra = {}) {
  return {
    key,
    number,
    email: `${key}@example.com`,
    status: 'ok',
    windows: [
      { key: '5h', pct: 10, resetsAt: null },
      { key: '7d', pct, resetsAt: null }
    ],
    ...extra
  };
}

/**
 * @param {Partial<import('./codex-switch-candidate.js').SwitchCandidateDeps> & { policy?: Record<string, unknown>, accounts?: any[], active_key?: string|null }} [overrides]
 */
function makeHandler(overrides = {}) {
  const {
    policy = { mode: 'switch', accounts: [ACCOUNT_2, ACCOUNT_1, ACCOUNT_3] },
    accounts = [
      row(ACCOUNT_1, 1, 20),
      row(ACCOUNT_2, 2, 60),
      row(ACCOUNT_3, 3, 30)
    ],
    active_key = ACCOUNT_1,
    ...deps
  } = overrides;
  return createCodexSwitchCandidateHandler({
    workspaceKeyOf: (raw) => (raw === ROOT ? ROOT : null),
    queueSnapshot: () => ({
      provider_limit_policy: { codex: { preempt_pct: null, ...policy } },
      provider_hold: {}
    }),
    listAccounts: async () => ({ ok: true, accounts, active_key }),
    credit: {
      settingsOf: () => ({ allow_credits: false, daily_cap: 1000 }),
      consumedToday: () => 0
    },
    prepareCodexAccountHome: vi.fn(async (input) => ({
      ok: /** @type {const} */ (true),
      home_dir: input.home_dir
    })),
    codexAccountHomeDir: homeDirOf,
    codexRoot: () => path.join(tmp_dir, 'codex-root'),
    ...deps
  });
}

/**
 * Send one request to a server that mounts only the handler, behind the same
 * JSON body parser the app uses.
 *
 * @param {import('express').RequestHandler} handler
 * @param {unknown} body
 */
async function postCandidate(handler, body) {
  const app = express();
  app.use(express.json());
  app.post('/api/codex/switch-candidate', handler);
  const server = createServer(app);
  await new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(undefined))
  );
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/codex/switch-candidate`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      }
    );
    return { status: response.status, body: await response.json() };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-switch-candidate-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('POST /api/codex/switch-candidate (UI-9y1k §4.4)', () => {
  test('answers policy_wait while the Codex policy waits', async () => {
    const handler = makeHandler({ policy: { mode: 'wait', accounts: [] } });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toEqual({
      ok: true,
      decision: 'none',
      reason: 'policy_wait'
    });
  });

  test('answers unconfigured for an empty allow list', async () => {
    const handler = makeHandler({ policy: { mode: 'switch', accounts: [] } });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toMatchObject({
      decision: 'none',
      reason: 'unconfigured'
    });
  });

  test('refuses a root_dir outside the registry', async () => {
    const handler = makeHandler();

    const res = await postCandidate(handler, { root_dir: '/elsewhere' });

    expect(res.status).toBe(400);
  });

  test('answers catalog_unavailable when codex-auth fails', async () => {
    const handler = makeHandler({
      listAccounts: async () => ({ ok: false, error: 'unavailable' })
    });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toMatchObject({
      decision: 'none',
      reason: 'catalog_unavailable'
    });
  });

  test('answers policy_wait when the policy turns to wait during the catalog read', async () => {
    /** @type {Record<string, unknown>} */
    let policy = { mode: 'switch', accounts: [ACCOUNT_2, ACCOUNT_1] };
    const handler = makeHandler({
      queueSnapshot: () => ({
        provider_limit_policy: { codex: { preempt_pct: null, ...policy } },
        provider_hold: {}
      }),
      listAccounts: async () => {
        policy = { mode: 'wait', accounts: [ACCOUNT_2, ACCOUNT_1] };
        return {
          ok: true,
          accounts: [row(ACCOUNT_1, 1, 20), row(ACCOUNT_2, 2, 60)],
          active_key: ACCOUNT_3
        };
      }
    });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toEqual({
      ok: true,
      decision: 'none',
      reason: 'policy_wait'
    });
  });

  test('never picks an account removed from the allow list during the catalog read', async () => {
    /** @type {string[]} */
    let allowed = [ACCOUNT_2, ACCOUNT_1];
    const handler = makeHandler({
      queueSnapshot: () => ({
        provider_limit_policy: {
          codex: { mode: 'switch', accounts: allowed, preempt_pct: null }
        },
        provider_hold: {}
      }),
      listAccounts: async () => {
        allowed = [ACCOUNT_1];
        return {
          ok: true,
          accounts: [row(ACCOUNT_1, 1, 20), row(ACCOUNT_2, 2, 60)],
          active_key: ACCOUNT_3
        };
      }
    });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toMatchObject({ decision: 'switch', account_number: 1 });
  });

  test('picks the first allowed account in the user order', async () => {
    const handler = makeHandler();

    const res = await postCandidate(handler, {
      root_dir: ROOT,
      current_home: '',
      tried: [],
      limit_kind: 'account'
    });

    expect(res.body).toEqual({
      ok: true,
      decision: 'switch',
      account_number: 2,
      codex_home: homeDirOf(ACCOUNT_2),
      credit_mode: false,
      reason: 'window'
    });
  });

  test('carries no email and no account key in the answer', async () => {
    const handler = makeHandler();

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(JSON.stringify(res.body)).not.toMatch(/example\.com|user-\d::/);
  });

  test('skips the accounts a caller already tried', async () => {
    const handler = makeHandler();

    const res = await postCandidate(handler, { root_dir: ROOT, tried: [2] });

    expect(res.body).toMatchObject({ decision: 'switch', account_number: 3 });
  });

  test('drops the current workspace for a workspace credit limit', async () => {
    const handler = makeHandler();

    const res = await postCandidate(handler, {
      root_dir: ROOT,
      limit_kind: 'workspace_credits'
    });

    expect(res.body).toMatchObject({ decision: 'switch', account_number: 3 });
  });

  test('reads the current account from a bdui mirror home', async () => {
    const handler = makeHandler({ active_key: ACCOUNT_3 });

    const res = await postCandidate(handler, {
      root_dir: ROOT,
      current_home: homeDirOf(ACCOUNT_2)
    });

    expect(res.body).toMatchObject({ decision: 'switch', account_number: 1 });
  });

  test('moves to a credit account in credit mode when windows are full', async () => {
    const handler = makeHandler({
      accounts: [
        row(ACCOUNT_1, 1, 100),
        row(ACCOUNT_2, 2, 100),
        row(ACCOUNT_3, 3, 100, {
          credits: { has_credits: true, unlimited: false, balance: 62500 }
        })
      ],
      credit: {
        settingsOf: (key) => ({
          allow_credits: key === ACCOUNT_3,
          daily_cap: 1000
        }),
        consumedToday: () => 0
      }
    });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toMatchObject({
      decision: 'switch',
      account_number: 3,
      credit_mode: true,
      reason: 'credits'
    });
  });

  test('answers credit_cap_reached once the credit account is at its cap', async () => {
    const handler = makeHandler({
      accounts: [
        row(ACCOUNT_1, 1, 100),
        row(ACCOUNT_3, 3, 100, {
          credits: { has_credits: true, unlimited: false, balance: 62500 }
        })
      ],
      credit: {
        settingsOf: () => ({ allow_credits: true, daily_cap: 1000 }),
        consumedToday: () => 1000
      }
    });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(res.body).toMatchObject({
      decision: 'none',
      reason: 'credit_cap_reached'
    });
  });

  test('prepares a mirror whose auth points at the chosen account file', async () => {
    const codex_root = path.join(tmp_dir, 'codex-root');
    const auth_file = path.join(
      codex_root,
      'accounts',
      `${Buffer.from(ACCOUNT_2, 'utf8').toString('base64url')}.auth.json`
    );
    fs.mkdirSync(path.dirname(auth_file), { recursive: true });
    fs.writeFileSync(auth_file, '{}');
    const handler = makeHandler({ prepareCodexAccountHome });

    const res = await postCandidate(handler, { root_dir: ROOT });

    expect(fs.readlinkSync(path.join(res.body.codex_home, 'auth.json'))).toBe(
      auth_file
    );
  });

  test('answers 404 to a GET on the registered app', async () => {
    const app = createApp({
      host: '127.0.0.1',
      port: 0,
      app_dir: path.resolve('app'),
      root_dir: process.cwd(),
      frontend_mode: 'live'
    });
    const server = createServer(app);
    await new Promise((resolve) =>
      server.listen(0, '127.0.0.1', () => resolve(undefined))
    );
    const address = /** @type {import('node:net').AddressInfo} */ (
      server.address()
    );

    let status;
    try {
      const response = await fetch(
        `http://127.0.0.1:${address.port}/api/codex/switch-candidate`
      );
      status = response.status;
    } finally {
      await new Promise((resolve) => server.close(() => resolve(undefined)));
    }

    expect(status).toBe(404);
  });
});

describe('mirrorAccountKey', () => {
  test('decodes the account key of a mirror home', () => {
    const key = mirrorAccountKey(homeDirOf(ACCOUNT_2), homeDirOf);

    expect(key).toBe(ACCOUNT_2);
  });

  test('reads a home outside the mirrors as no mirror', () => {
    const key = mirrorAccountKey(path.join(os.homedir(), '.codex'), homeDirOf);

    expect(key).toBeNull();
  });
});
