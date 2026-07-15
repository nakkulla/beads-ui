import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { getWorkerRuntime } from './worker/runtime.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

/** @type {string} */
let tmp_state;

/**
 * A minimal fake socket that records everything the server sends.
 *
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
 * @returns {Promise<void>}
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

/**
 * @param {{ sent: string[] }} sock
 * @param {string} type
 * @returns {any[]}
 */
function pushesOfType(sock, type) {
  return sock.sent.map((m) => JSON.parse(m)).filter((m) => m.type === type);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wssl-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws session-log (transcript) channel', () => {
  test('subscribe emits a snapshot of the persisted raw stream', async () => {
    const ws_key = process.cwd();
    const runtime = getWorkerRuntime();
    runtime.sessionLog.append(ws_key, 'att-done', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: 'hello' }] }
    });
    runtime.sessionLog.append(ws_key, 'att-done', {
      type: 'result',
      subtype: 'success',
      is_error: false,
      result: 'DONE'
    });

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-session-log', {
      id: 'session-log:att-done',
      attempt_id: 'att-done'
    });
    expect(replyFor(sock, 's1').ok).toBe(true);

    const snaps = pushesOfType(sock, 'session-log-snapshot');
    expect(snaps).toHaveLength(1);
    expect(snaps[0].payload.attempt_id).toBe('att-done');
    expect(snaps[0].payload.lines).toHaveLength(2);
    expect(snaps[0].payload.lines[1].result).toBe('DONE');
  });

  test('live appends push session-log-append after subscribe', async () => {
    const ws_key = process.cwd();
    const runtime = getWorkerRuntime();

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-session-log', {
      id: 'session-log:att-live',
      attempt_id: 'att-live'
    });
    // Empty snapshot (no persisted lines yet).
    expect(pushesOfType(sock, 'session-log-snapshot')[0].payload.lines).toEqual(
      []
    );
    sock.sent = [];

    // A live attempt appends a new event → it is pushed as an append.
    runtime.sessionLog.append(ws_key, 'att-live', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: 'streaming…' }] }
    });
    const appends = pushesOfType(sock, 'session-log-append');
    expect(appends).toHaveLength(1);
    expect(appends[0].payload.attempt_id).toBe('att-live');
    expect(appends[0].payload.event.message.content[0].text).toBe('streaming…');
  });

  test('only the matching attempt_id receives appends', async () => {
    const ws_key = process.cwd();
    const runtime = getWorkerRuntime();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-session-log', {
      id: 'session-log:att-a',
      attempt_id: 'att-a'
    });
    sock.sent = [];

    runtime.sessionLog.append(ws_key, 'att-b', { type: 'turn.started' });
    expect(pushesOfType(sock, 'session-log-append')).toHaveLength(0);

    runtime.sessionLog.append(ws_key, 'att-a', { type: 'turn.started' });
    expect(pushesOfType(sock, 'session-log-append')).toHaveLength(1);
  });

  test('unsubscribe stops further appends', async () => {
    const ws_key = process.cwd();
    const runtime = getWorkerRuntime();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-session-log', {
      id: 'session-log:att-x',
      attempt_id: 'att-x'
    });
    await send(sock, 'u1', 'unsubscribe-session-log', {
      id: 'session-log:att-x'
    });
    expect(replyFor(sock, 'u1').payload.unsubscribed).toBe(true);
    sock.sent = [];

    runtime.sessionLog.append(ws_key, 'att-x', { type: 'turn.started' });
    expect(pushesOfType(sock, 'session-log-append')).toHaveLength(0);
  });

  test('rejects a subscribe missing attempt_id', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-session-log', { id: 'session-log:x' });
    const reply = replyFor(sock, 's1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });
});
