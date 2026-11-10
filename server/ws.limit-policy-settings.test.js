import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetActiveLoginReturnStoreForTest,
  activeLoginReturnStore
} from './active-login-return-store.js';
import {
  __resetLimitPolicySettingsForTest,
  activeSwitchSettingsOf,
  limitPolicySettingsStore,
  onLimitPolicySettingsChanged
} from './limit-policy-settings.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from './worker/runtime.js';
import {
  __resetLimitPolicySettingsChannelForTest,
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import {
  bindDepartureBroadcast,
  resumeLimitPolicyRebind
} from './ws/limit-policy-settings-handlers.js';

const WS_A = '/tmp/limit-policy-ws-a';
const WS_B = '/tmp/limit-policy-ws-b';

const { reevaluate, listWorkspaces } = vi.hoisted(() => ({
  reevaluate: vi.fn(),
  listWorkspaces: vi.fn()
}));

vi.mock('./registry-watcher.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getAvailableWorkspaces: listWorkspaces
}));

vi.mock('./worker/attach.js', async (importOriginal) => ({
  ...(await importOriginal()),
  reevaluateWorkerProviderSwitches: reevaluate
}));

/** @type {string} */
let tmp_state;

/** The UI-giog settings file measured on 2026-11-10 (spec §2). */
const LEGACY_FILE = {
  revision: 3,
  runners: {
    claude: { scope: 'repo', mode: 'wait', accounts: [], preempt_pct: null },
    codex: {
      scope: 'global',
      mode: 'switch',
      accounts: ['k1', 'k2', 'k3'],
      preempt_pct: null
    }
  }
};

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

/** @returns {string} */
function settingsFile() {
  return path.join(tmp_state, 'bdui', 'limit-policy-settings.json');
}

/**
 * @param {unknown} content
 */
function writeSettings(content) {
  fs.mkdirSync(path.dirname(settingsFile()), { recursive: true });
  fs.writeFileSync(settingsFile(), JSON.stringify(content));
}

/** @returns {any} */
function readSettings() {
  return JSON.parse(fs.readFileSync(settingsFile(), 'utf8'));
}

/**
 * Migrate the measured UI-giog file and drop the in-process store, as a
 * server that stopped right after the migration write would.
 */
function migrateThenRestart() {
  writeSettings(LEGACY_FILE);
  limitPolicySettingsStore().migrate();
  __resetLimitPolicySettingsForTest();
}

/**
 * Spy on the queue store's verdict re-binding.
 *
 * @returns {import('vitest').MockInstance}
 */
function spyRebind() {
  return vi.spyOn(
    getWorkerRuntime().queueStore,
    'rebindProviderSwitchVerdicts'
  );
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wslp-'));
  process.env.XDG_STATE_HOME = tmp_state;
  reevaluate.mockReset();
  reevaluate.mockResolvedValue(undefined);
  listWorkspaces.mockReset();
  listWorkspaces.mockReturnValue([{ path: WS_A }, { path: WS_B }]);
  __resetRegistriesForTest();
  __resetLimitPolicySettingsChannelForTest();
  __resetLimitPolicySettingsForTest();
  __resetActiveLoginReturnStoreForTest();
  __resetWorkerRuntimeForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetLimitPolicySettingsChannelForTest();
  __resetLimitPolicySettingsForTest();
  __resetActiveLoginReturnStoreForTest();
  __resetWorkerRuntimeForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws limit-policy settings channel', () => {
  test('emits the auto-switch-off default snapshot on subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    expect(snapshots(sock)).toEqual([
      {
        type: 'limit-policy-settings-snapshot',
        id: 'lp',
        revision: 0,
        runners: {
          claude: {
            auto_switch: false,
            default_account: null,
            accounts: [],
            preempt_pct: null
          },
          codex: {
            auto_switch: false,
            default_account: null,
            accounts: [],
            preempt_pct: null
          }
        },
        departures: { claude: null, codex: null }
      }
    ]);
  });

  test('pushes the new snapshot to another subscriber after a set', async () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    await send(watcher, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: {
        claude: { auto_switch: true, default_account: 'a@example.test' }
      }
    });

    expect(replyTo(editor, 'w1').payload).toMatchObject({ ok: true });
    expect(snapshots(watcher).at(-1)).toMatchObject({
      revision: 1,
      runners: {
        claude: { auto_switch: true, default_account: 'a@example.test' }
      }
    });
    expect(activeSwitchSettingsOf('claude').auto_switch).toBe(true);
  });

  test('runs no workspace switch pass after a set', async () => {
    const editor = fakeSocket();

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { auto_switch: true, accounts: ['k1'] } }
    });

    expect(reevaluate).not.toHaveBeenCalled();
  });

  test('re-binds no hold verdict after a set', async () => {
    const editor = fakeSocket();
    const rebind = spyRebind();

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { auto_switch: true, accounts: ['k1'] } }
    });

    expect(rebind).not.toHaveBeenCalled();
  });

  test('hands settings change listeners the new snapshot after a set', async () => {
    const editor = fakeSocket();
    const heard = vi.fn();
    const stop = onLimitPolicySettingsChanged(heard);

    await send(editor, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { claude: { auto_switch: true } }
    });
    stop();

    expect(heard).toHaveBeenCalledTimes(1);
    expect(heard.mock.calls[0][0].runners.claude.auto_switch).toBe(true);
  });

  test('refuses a stale revision with conflict', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'limit-policy-settings-set', {
      expected_revision: 4,
      runners: { claude: { auto_switch: true } }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'conflict',
      snapshot: { revision: 0 }
    });
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

  test('refuses an old-shape scope patch with invalid_value', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { scope: 'global' } }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'invalid_value'
    });
  });
});

describe('departure records on the settings channel (UI-32oq §4.4)', () => {
  /** @type {import('./active-login-return-store.js').DepartureRecord} */
  const RECORD = {
    default_account: 'k1',
    to_account: 'k2',
    until: '2026-11-10T05:00:00.000Z'
  };

  test('lays a standing departure record beside the settings on subscribe', async () => {
    activeLoginReturnStore().set('codex', RECORD);
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    expect(snapshots(sock)[0].departures).toEqual({
      claude: null,
      codex: RECORD
    });
  });

  test('pushes the snapshot to a subscriber when a record is created', async () => {
    const departures = activeLoginReturnStore();
    const unbind = bindDepartureBroadcast(departures);
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    departures.set('claude', RECORD);

    const pushed = snapshots(sock);
    expect(pushed).toHaveLength(2);
    expect(pushed[1].departures).toEqual({ claude: RECORD, codex: null });
    unbind();
  });

  test('pushes the snapshot to a subscriber when a record ends', async () => {
    const departures = activeLoginReturnStore();
    departures.set('claude', RECORD);
    const unbind = bindDepartureBroadcast(departures);
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    departures.clear('claude');

    expect(snapshots(sock).at(-1).departures).toEqual({
      claude: null,
      codex: null
    });
    unbind();
  });

  test('moves no revision when a record changes', async () => {
    const departures = activeLoginReturnStore();
    const unbind = bindDepartureBroadcast(departures);
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-limit-policy-settings', { id: 'lp' });

    departures.set('codex', RECORD);

    expect(snapshots(sock).map((snapshot) => snapshot.revision)).toEqual([
      0, 0
    ]);
    unbind();
  });

  test('carries the departure records on a set reply', async () => {
    activeLoginReturnStore().set('codex', RECORD);
    const sock = fakeSocket();

    await send(sock, 'w1', 'limit-policy-settings-set', {
      expected_revision: 0,
      runners: { codex: { auto_switch: true } }
    });

    expect(replyTo(sock, 'w1').payload.snapshot.departures).toEqual({
      claude: null,
      codex: RECORD
    });
  });
});

describe('resuming the migration rebind (UI-32oq §4.1)', () => {
  test('re-binds every registered workspace for a runner left pending after the migration write', async () => {
    migrateThenRestart();
    const rebind = spyRebind();

    await resumeLimitPolicyRebind();

    expect(rebind.mock.calls).toEqual([
      [path.resolve(WS_A), 'codex'],
      [path.resolve(WS_B), 'codex']
    ]);
  });

  test('drops the runner from rebind_pending once every workspace re-bound', async () => {
    migrateThenRestart();

    const outcome = await resumeLimitPolicyRebind();

    expect(outcome).toEqual({ done: ['codex'], pending: [] });
    expect(readSettings().rebind_pending).toEqual([]);
  });

  test('runs every workspace switch pass before dropping the runner', async () => {
    migrateThenRestart();
    /** @type {string[]} */
    const order = [];
    reevaluate.mockImplementation(async () => {
      order.push(`pass:${readSettings().rebind_pending.join(',')}`);
    });

    await resumeLimitPolicyRebind();

    expect(order).toEqual(['pass:codex', 'pass:codex']);
  });

  test('re-binds every workspace again after a stop part way through', async () => {
    migrateThenRestart();
    getWorkerRuntime().queueStore.rebindProviderSwitchVerdicts(
      path.resolve(WS_A),
      'codex'
    );
    __resetLimitPolicySettingsForTest();
    const rebind = spyRebind();

    await resumeLimitPolicyRebind();

    expect(rebind.mock.calls.map(([workspace]) => workspace)).toEqual([
      path.resolve(WS_A),
      path.resolve(WS_B)
    ]);
    expect(readSettings().rebind_pending).toEqual([]);
  });

  test('keeps the runner pending when one workspace fails to re-bind', async () => {
    migrateThenRestart();
    const real = getWorkerRuntime().queueStore.rebindProviderSwitchVerdicts;
    spyRebind().mockImplementation((workspace, runner) => {
      if (workspace === path.resolve(WS_A)) {
        throw new Error('queue unreadable');
      }
      return real(workspace, runner);
    });

    const outcome = await resumeLimitPolicyRebind();

    expect(outcome).toEqual({ done: [], pending: ['codex'] });
    expect(readSettings().rebind_pending).toEqual(['codex']);
  });

  test('still re-binds the other workspaces when one fails', async () => {
    migrateThenRestart();
    const rebind = spyRebind().mockImplementation((workspace) => {
      if (workspace === path.resolve(WS_A)) {
        throw new Error('queue unreadable');
      }
      return { ok: false, conflict: false, queue: /** @type {any} */ ({}) };
    });

    await resumeLimitPolicyRebind();

    expect(rebind.mock.calls.map(([workspace]) => workspace)).toEqual([
      path.resolve(WS_A),
      path.resolve(WS_B)
    ]);
  });

  test('finishes a failed runner on the next start', async () => {
    migrateThenRestart();
    spyRebind().mockImplementationOnce(() => {
      throw new Error('queue unreadable');
    });
    await resumeLimitPolicyRebind();
    vi.restoreAllMocks();
    __resetLimitPolicySettingsForTest();

    const outcome = await resumeLimitPolicyRebind();

    expect(outcome).toEqual({ done: ['codex'], pending: [] });
    expect(readSettings().rebind_pending).toEqual([]);
  });

  test('keeps every runner pending when the registry cannot be read', async () => {
    migrateThenRestart();
    listWorkspaces.mockImplementation(() => {
      throw new Error('registry unreadable');
    });

    const outcome = await resumeLimitPolicyRebind();

    expect(outcome).toEqual({ done: [], pending: ['codex'] });
    expect(readSettings().rebind_pending).toEqual(['codex']);
  });

  test('does nothing while no runner is pending', async () => {
    writeSettings({
      revision: 1,
      runners: {
        claude: {
          auto_switch: false,
          default_account: null,
          accounts: [],
          preempt_pct: null
        }
      },
      rebind_pending: []
    });
    const rebind = spyRebind();

    const outcome = await resumeLimitPolicyRebind();

    expect(outcome).toEqual({ done: [], pending: [] });
    expect(rebind).not.toHaveBeenCalled();
    expect(reevaluate).not.toHaveBeenCalled();
  });
});
