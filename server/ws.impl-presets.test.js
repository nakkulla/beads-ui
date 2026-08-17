import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import { attachWsServer, handleMessage } from './ws.js';
import {
  __resetImplPresetsForTest,
  detachImplPresets
} from './ws/exec-preset-handlers.js';

/** @type {string} */
let tmp_state;

function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} message */
    send(message) {
      this.sent.push(String(message));
    }
  };
}

/**
 * @param {{ sent: string[] }} socket
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 */
async function send(socket, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (socket),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} socket
 * @param {string} id
 */
function replyFor(socket, id) {
  return socket.sent.map((raw) => JSON.parse(raw)).find((msg) => msg.id === id);
}

/** @param {{ sent: string[] }} socket */
function snapshots(socket) {
  return socket.sent
    .map((raw) => JSON.parse(raw))
    .filter((msg) => msg.type === 'impl-presets-snapshot')
    .map((msg) => msg.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wspreset-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetImplPresetsForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetImplPresetsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('ws impl-preset channel', () => {
  test('registers the complete preset protocol vocabulary', () => {
    expect(MESSAGE_TYPES).toEqual(
      expect.arrayContaining([
        'subscribe-impl-presets',
        'unsubscribe-impl-presets',
        'impl-presets-snapshot',
        'impl-preset-create',
        'impl-preset-update',
        'impl-preset-delete',
        'apply-impl-preset'
      ])
    );
  });

  test('subscribes and emits an initial server-global snapshot', async () => {
    const socket = fakeSocket();

    await send(socket, 's1', 'subscribe-impl-presets', { id: 'exec:presets' });

    expect(MESSAGE_TYPES).toContain('subscribe-impl-presets');
    expect(replyFor(socket, 's1').ok).toBe(true);
    expect(snapshots(socket)).toEqual([
      {
        type: 'impl-presets-snapshot',
        id: 'exec:presets',
        revision: 0,
        presets: []
      }
    ]);
  });

  test('creates a preset and fans the authoritative snapshot to subscribers', async () => {
    const first = fakeSocket();
    const second = fakeSocket();
    await send(first, 's1', 'subscribe-impl-presets', { id: 'exec:first' });
    await send(second, 's2', 'subscribe-impl-presets', { id: 'exec:second' });
    first.sent = [];
    second.sent = [];

    await send(first, 'c1', 'impl-preset-create', {
      expected_revision: 0,
      name: '기본 개발',
      settings: {}
    });

    expect(replyFor(first, 'c1').payload).toMatchObject({
      applied: true,
      conflict: false,
      revision: 1
    });
    expect(snapshots(first).at(-1)).toMatchObject({
      id: 'exec:first',
      revision: 1
    });
    expect(snapshots(second).at(-1)).toMatchObject({
      id: 'exec:second',
      revision: 1
    });
  });

  test('updates and deletes a preset with full-state replies', async () => {
    const socket = fakeSocket();
    await send(socket, 's1', 'subscribe-impl-presets');
    await send(socket, 'c1', 'impl-preset-create', {
      expected_revision: 0,
      name: '원본',
      settings: {}
    });
    const created = replyFor(socket, 'c1').payload.presets[0];

    await send(socket, 'u1', 'impl-preset-update', {
      expected_revision: 1,
      id: created.id,
      name: '수정',
      settings: {}
    });
    await send(socket, 'd1', 'impl-preset-delete', {
      expected_revision: 2,
      id: created.id
    });

    expect(replyFor(socket, 'u1').payload.presets[0].name).toBe('수정');
    expect(replyFor(socket, 'd1').payload).toMatchObject({
      applied: true,
      conflict: false,
      revision: 3,
      presets: []
    });
  });

  test('returns a conflict snapshot to the requester without fanout', async () => {
    const first = fakeSocket();
    const second = fakeSocket();
    await send(first, 's1', 'subscribe-impl-presets');
    await send(second, 's2', 'subscribe-impl-presets');
    await send(first, 'c1', 'impl-preset-create', {
      expected_revision: 0,
      name: '현재',
      settings: {}
    });
    first.sent = [];
    second.sent = [];

    await send(second, 'c2', 'impl-preset-create', {
      expected_revision: 0,
      name: '오래된 요청',
      settings: {}
    });

    expect(replyFor(second, 'c2').payload).toMatchObject({
      applied: false,
      conflict: true,
      revision: 1
    });
    expect(snapshots(first)).toHaveLength(0);
    expect(snapshots(second)).toHaveLength(0);
  });

  test('continues fanout when one subscriber send fails', async () => {
    const broken = fakeSocket();
    const healthy = fakeSocket();
    const requester = fakeSocket();
    await send(broken, 's1', 'subscribe-impl-presets');
    await send(healthy, 's2', 'subscribe-impl-presets');
    broken.send = () => {
      throw new Error('socket closed');
    };
    healthy.sent = [];

    await send(requester, 'c1', 'impl-preset-create', {
      expected_revision: 0,
      name: '프리셋',
      settings: {}
    });

    expect(replyFor(requester, 'c1').ok).toBe(true);
    expect(snapshots(healthy)).toHaveLength(1);
  });

  test('deduplicates resubscribe and removes subscriptions on unsubscribe or close', async () => {
    const first = fakeSocket();
    const second = fakeSocket();
    await send(first, 's1', 'subscribe-impl-presets', { id: 'same' });
    await send(first, 's2', 'subscribe-impl-presets', { id: 'same' });
    await send(second, 's3', 'subscribe-impl-presets', { id: 'second' });
    await send(first, 'x1', 'unsubscribe-impl-presets', { id: 'same' });
    detachImplPresets(/** @type {any} */ (second));
    first.sent = [];
    second.sent = [];

    await send(first, 'c1', 'impl-preset-create', {
      expected_revision: 0,
      name: '새 프리셋',
      settings: {}
    });

    expect(snapshots(first)).toHaveLength(0);
    expect(snapshots(second)).toHaveLength(0);
  });
});
