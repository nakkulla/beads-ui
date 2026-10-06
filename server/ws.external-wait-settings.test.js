import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { __resetExternalWaitSettingsForTest } from './external-wait-settings.js';
import {
  __resetExternalWaitSettingsChannelForTest,
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('./bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('./bd.js', () => ({ runBd: vi.fn(), runBdJson: vi.fn() }));

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
    .filter((m) => m.type === 'external-wait-settings-snapshot')
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
    .find((m) => m.id === id && m.type !== 'external-wait-settings-snapshot');
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsews-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetExternalWaitSettingsChannelForTest();
  __resetExternalWaitSettingsForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetExternalWaitSettingsChannelForTest();
  __resetExternalWaitSettingsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws external-wait settings channel (UI-qbgj §3.6)', () => {
  test('emits a snapshot with the ratio field on subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-external-wait-settings', { id: 'ew' });

    const [snapshot] = snapshots(sock);
    expect(snapshot).toMatchObject({
      id: 'ew',
      revision: 0,
      values: { takeover_ratio_percent: 80 },
      fields: { takeover_ratio_percent: { default: 80, min: 10, max: 100 } }
    });
  });

  test('pushes the new snapshot to another subscriber after a set', async () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    await send(watcher, 's1', 'subscribe-external-wait-settings', { id: 'ew' });

    await send(editor, 'w1', 'external-wait-settings-set', {
      expected_revision: 0,
      values: { takeover_ratio_percent: 60 }
    });

    expect(replyTo(editor, 'w1').payload).toMatchObject({ ok: true });
    expect(snapshots(watcher).at(-1)).toMatchObject({
      revision: 1,
      values: { takeover_ratio_percent: 60 }
    });
    expect(
      JSON.parse(
        fs.readFileSync(
          path.join(tmp_state, 'bdui', 'external-wait-settings.json'),
          'utf8'
        )
      )
    ).toEqual({ revision: 1, overrides: { takeover_ratio_percent: 60 } });
  });

  test('names the offending key in an invalid_value refusal', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'external-wait-settings-set', {
      expected_revision: 0,
      values: { takeover_ratio_percent: 101 }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'takeover_ratio_percent'
    });
  });

  test('refuses a stale revision with conflict and the latest snapshot', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'external-wait-settings-set', {
      expected_revision: 3,
      values: { takeover_ratio_percent: 60 }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'conflict',
      snapshot: { revision: 0 }
    });
  });

  test('stops pushing to an unsubscribed connection', async () => {
    const watcher = fakeSocket();
    const editor = fakeSocket();
    await send(watcher, 's1', 'subscribe-external-wait-settings', { id: 'ew' });
    await send(watcher, 'u1', 'unsubscribe-external-wait-settings', {
      id: 'ew'
    });
    const before = snapshots(watcher).length;

    await send(editor, 'w1', 'external-wait-settings-set', {
      expected_revision: 0,
      values: { takeover_ratio_percent: 60 }
    });

    expect(snapshots(watcher)).toHaveLength(before);
  });
});
