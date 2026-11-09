import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetLimitPolicySettingsForTest,
  globalLimitPolicyOf,
  onLimitPolicyApplied
} from './limit-policy-settings.js';
import { __resetWorkerRuntimeForTest } from './worker/runtime.js';
import {
  __resetLimitPolicySettingsChannelForTest,
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

const WS_A = '/tmp/limit-policy-ws-a';
const WS_B = '/tmp/limit-policy-ws-b';

const { reevaluate } = vi.hoisted(() => ({
  reevaluate: vi.fn()
}));

vi.mock('./registry-watcher.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getAvailableWorkspaces: () => [{ path: WS_A }, { path: WS_B }]
}));

vi.mock('./worker/attach.js', async (importOriginal) => ({
  ...(await importOriginal()),
  reevaluateWorkerProviderSwitches: reevaluate
}));

/** @type {string} */
let tmp_state;

/**
 * @returns {{ sent: string[], readyState: number, OPEN: number, send(msg: string): void }}
 */
function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function snapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'limit-policy-settings-snapshot')
    .map((m) => m.payload);
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @returns {any}
 */
function replyTo(sock, id) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .find((m) => m.id === id && m.type !== 'limit-policy-settings-snapshot');
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wslp-'));
  process.env.XDG_STATE_HOME = tmp_state;
  reevaluate.mockReset();
  reevaluate.mockResolvedValue(undefined);
  __resetRegistriesForTest();
  __resetLimitPolicySettingsChannelForTest();
  __resetLimitPolicySettingsForTest();
  __resetWorkerRuntimeForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetLimitPolicySettingsChannelForTest();
  __resetLimitPolicySettingsForTest();
  __resetWorkerRuntimeForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws limit-policy settings channel', () => {
  test('emits the repo-scope default snapshot on subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    expect(snapshots(sock)).toEqual([
      {
        type: 'limit-policy-settings-snapshot',
        id: 'lp',
        revision: 0,
        runners: {
          claude: {
            scope: 'repo',
            mode: 'switch',
            accounts: [],
            preempt_pct: null
          },
          codex: {
            scope: 'repo',
            mode: 'switch',
            accounts: [],
            preempt_pct: null
          }
        }
      }
    ]);
  });

  test('pushes the new snapshot to another subscriber after a set', async () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    await send(watcher, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { claude: { scope: 'global', accounts: ['a@example.test'] } }
    });

    expect(replyTo(editor, 'w1').payload).toMatchObject({ ok: true });
    expect(snapshots(watcher).at(-1)).toMatchObject({
      revision: 1,
      runners: { claude: { scope: 'global', accounts: ['a@example.test'] } }
    });
    expect(globalLimitPolicyOf('claude').scope).toBe('global');
  });

  test('re-runs the switch pass of every registered workspace after a successful set', async () => {
    const editor = fakeSocket();

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { scope: 'global' } }
    });

    expect(reevaluate.mock.calls.map(([key]) => key).sort()).toEqual([
      path.resolve(WS_A),
      path.resolve(WS_B)
    ]);
  });

  test('announces the end of propagation after every switch pass', async () => {
    const editor = fakeSocket();
    /** @type {string[]} */
    const order = [];
    reevaluate.mockImplementation(async () => {
      order.push('reevaluate');
    });
    const stop = onLimitPolicyApplied(() => order.push('applied'));

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { claude: { mode: 'wait' } }
    });
    stop();

    expect(order).toEqual(['reevaluate', 'reevaluate', 'applied']);
  });

  test('keeps re-running the other workspaces when one switch pass fails', async () => {
    const editor = fakeSocket();
    reevaluate.mockImplementation(async (/** @type {string} */ key) => {
      if (key === path.resolve(WS_A)) {
        throw new Error('pass failed');
      }
    });
    const applied = vi.fn();
    const stop = onLimitPolicyApplied(applied);

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { claude: { mode: 'wait' } }
    });
    stop();

    expect(reevaluate).toHaveBeenCalledTimes(2);
    expect(applied).toHaveBeenCalledTimes(1);
  });

  test('refuses a stale revision with conflict and re-runs no switch pass', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'limit-policy-settings-set', {
      expected_revision: 4,
      runners: { claude: { scope: 'global' } }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'conflict',
      snapshot: { revision: 0 }
    });
    expect(reevaluate).not.toHaveBeenCalled();
  });

  test('names the offending runner in an invalid_value refusal', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { preempt_pct: 0 } }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'invalid_value',
      runner: 'codex'
    });
  });
});
