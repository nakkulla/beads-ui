import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetModelVisibilityForTest,
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
    .filter((m) => m.type === 'model-visibility-snapshot')
    .map((m) => m.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsmv-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetModelVisibilityForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetModelVisibilityForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws model-visibility channel', () => {
  test('emits a snapshot with runner model names and ids on subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-model-visibility', { id: 'mv' });

    const [snapshot] = snapshots(sock);
    expect(snapshot.revision).toBe(0);
    expect(snapshot.runners.codex).toContainEqual({
      name: 'luna',
      id: 'gpt-6-luna'
    });
    expect(snapshot.runners.claude[0]).toEqual({ name: 'opus', id: 'opus' });
  });

  test('pushes the new snapshot to another subscriber after a set', async () => {
    const editor = fakeSocket();
    const watcher = fakeSocket();
    await send(watcher, 's1', 'subscribe-model-visibility', { id: 'mv' });

    await send(editor, 'w1', 'model-visibility-set', {
      expected_revision: 0,
      disabled_models: ['terra']
    });

    const pushed = snapshots(watcher);
    expect(pushed.at(-1)).toMatchObject({
      revision: 1,
      disabled_models: ['terra']
    });
  });
});
