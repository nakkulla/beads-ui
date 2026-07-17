import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { registerWorkspace } from './registry-watcher.js';
import {
  __resetRegistriesForTest,
  __resetVisibleWorkspacesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

/** @type {string} */
let tmp_state;
/** @type {string} */
let ws_a;
/** @type {string} */
let ws_b;

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
 * @returns {Promise<any>}
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @returns {any}
 */
function replyFor(sock, id) {
  for (const raw of sock.sent) {
    const m = JSON.parse(raw);
    if (m.id === id) {
      return m;
    }
  }
  return null;
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsvis-'));
  process.env.XDG_STATE_HOME = tmp_state;
  ws_a = path.join(tmp_state, 'ws-a');
  ws_b = path.join(tmp_state, 'ws-b');
  __resetRegistriesForTest();
  __resetVisibleWorkspacesForTest();
  registerWorkspace({ path: ws_a, database: path.join(ws_a, '.beads/ui.db') });
  registerWorkspace({ path: ws_b, database: path.join(ws_b, '.beads/ui.db') });
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetVisibleWorkspacesForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws set-workspace-visibility', () => {
  test('list-workspaces carries an initially-empty hidden array', async () => {
    const sock = fakeSocket();
    await send(sock, 'l1', 'list-workspaces', {});
    const reply = replyFor(sock, 'l1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.hidden).toEqual([]);
  });

  test('hiding an allowlisted workspace replies {changed, hidden} and persists into list-workspaces', async () => {
    const sock = fakeSocket();
    await send(sock, 'v1', 'set-workspace-visibility', {
      path: ws_a,
      visible: false
    });
    const reply = replyFor(sock, 'v1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.changed).toBe(true);
    expect(reply.payload.hidden).toEqual([ws_a]);

    // A subsequent list-workspaces reflects the persisted hidden set.
    await send(sock, 'l1', 'list-workspaces', {});
    expect(replyFor(sock, 'l1').payload.hidden).toEqual([ws_a]);

    // A fresh cold-load (cleared cache) still sees the on-disk hidden set.
    __resetVisibleWorkspacesForTest();
    await send(sock, 'l2', 'list-workspaces', {});
    expect(replyFor(sock, 'l2').payload.hidden).toEqual([ws_a]);
  });

  test('re-hiding is idempotent (changed false); showing removes it', async () => {
    const sock = fakeSocket();
    await send(sock, 'v1', 'set-workspace-visibility', {
      path: ws_a,
      visible: false
    });
    await send(sock, 'v2', 'set-workspace-visibility', {
      path: ws_a,
      visible: false
    });
    expect(replyFor(sock, 'v2').payload.changed).toBe(false);
    expect(replyFor(sock, 'v2').payload.hidden).toEqual([ws_a]);

    await send(sock, 'v3', 'set-workspace-visibility', {
      path: ws_a,
      visible: true
    });
    expect(replyFor(sock, 'v3').payload.changed).toBe(true);
    expect(replyFor(sock, 'v3').payload.hidden).toEqual([]);
  });

  test('a non-allowlisted path is rejected with bad_request', async () => {
    const sock = fakeSocket();
    await send(sock, 'v1', 'set-workspace-visibility', {
      path: path.join(tmp_state, 'not-registered'),
      visible: false
    });
    const reply = replyFor(sock, 'v1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });

  test('a relative or empty path is rejected with bad_request', async () => {
    const sock = fakeSocket();
    await send(sock, 'v1', 'set-workspace-visibility', {
      path: 'relative/ws',
      visible: false
    });
    expect(replyFor(sock, 'v1').ok).toBe(false);
    expect(replyFor(sock, 'v1').error.code).toBe('bad_request');

    await send(sock, 'v2', 'set-workspace-visibility', {
      path: '',
      visible: false
    });
    expect(replyFor(sock, 'v2').ok).toBe(false);
    expect(replyFor(sock, 'v2').error.code).toBe('bad_request');
  });
});
