import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetTimingSettingsForTest,
  getTimingSettings
} from './timing-settings.js';
import {
  __resetRegistriesForTest,
  __resetTimingSettingsChannelForTest,
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
    .filter((m) => m.type === 'timing-settings-snapshot')
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
    .find((m) => m.id === id && m.type !== 'timing-settings-snapshot');
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsts-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetTimingSettingsChannelForTest();
  __resetTimingSettingsForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetTimingSettingsChannelForTest();
  __resetTimingSettingsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws timing-settings channel', () => {
  test('emits a snapshot with the field table and off value on subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-timing-settings', { id: 'ts' });

    const [snapshot] = snapshots(sock);
    expect(snapshot.revision).toBe(0);
    expect(snapshot.values.queue_grace_seconds).toBe(20);
    expect(snapshot.fields.env_retry_delays_seconds).toMatchObject({
      rungs: 3,
      unit: 'minutes'
    });
    expect(snapshot.fields.list_poll_interval_seconds.off_value).toBe(0);
    expect('off_value' in snapshot.fields.queue_grace_seconds).toBe(false);
  });

  test('pushes the new snapshot to another subscriber after a set', async () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    await send(watcher, 's1', 'subscribe-timing-settings', { id: 'ts' });

    await send(editor, 'w1', 'timing-settings-set', {
      expected_revision: 0,
      values: { queue_grace_seconds: 45 }
    });

    expect(replyTo(editor, 'w1').payload).toMatchObject({ ok: true });
    expect(snapshots(watcher).at(-1)).toMatchObject({
      revision: 1,
      overrides: { queue_grace_seconds: 45 }
    });
    expect(getTimingSettings().queue_grace_seconds).toBe(45);
  });

  test('refuses a stale revision with conflict and the latest snapshot', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'timing-settings-set', {
      expected_revision: 4,
      values: { queue_grace_seconds: 45 }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'conflict',
      snapshot: { revision: 0 }
    });
  });

  test('names the offending key in an invalid_value refusal', async () => {
    const sock = fakeSocket();

    await send(sock, 'w1', 'timing-settings-set', {
      expected_revision: 0,
      values: { queue_grace_seconds: 9999 }
    });

    expect(replyTo(sock, 'w1').payload).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'queue_grace_seconds'
    });
    expect(getTimingSettings().queue_grace_seconds).toBe(20);
  });

  test('stops pushing to an unsubscribed connection', async () => {
    const watcher = fakeSocket();
    const editor = fakeSocket();
    await send(watcher, 's1', 'subscribe-timing-settings', { id: 'ts' });
    await send(watcher, 'u1', 'unsubscribe-timing-settings', { id: 'ts' });
    const before = snapshots(watcher).length;

    await send(editor, 'w1', 'timing-settings-set', {
      expected_revision: 0,
      values: { queue_grace_seconds: 45 }
    });

    expect(snapshots(watcher)).toHaveLength(before);
  });
});
