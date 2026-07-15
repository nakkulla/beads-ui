import { createServer } from 'node:http';
import { afterEach, describe, expect, test } from 'vitest';
import { WebSocket } from 'ws';
import { attachWsServer } from './ws.js';

const TOKEN = 'test-secret-token';

/** @type {Array<{ wss: import('ws').WebSocketServer, server: import('node:http').Server }>} */
const running = [];

afterEach(async () => {
  while (running.length) {
    const entry = running.pop();
    if (!entry) {
      continue;
    }
    const { wss, server } = entry;
    try {
      for (const client of wss.clients) {
        client.terminate();
      }
    } catch {
      // ignore
    }
    wss.close();
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
});

/**
 * @param {{ auth_token?: string, auth_deadline_ms?: number }} [options]
 * @returns {Promise<number>} listening port
 */
async function startServer(options = {}) {
  const server = createServer();
  const { wss } = attachWsServer(server, {
    path: '/ws',
    heartbeat_ms: 100000,
    auth_token: TOKEN,
    ...options
  });
  running.push({ wss, server });
  await new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(undefined))
  );
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no server address');
  }
  return address.port;
}

/**
 * @param {number} port
 * @returns {Promise<WebSocket>}
 */
function openClient(port) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
  return new Promise((resolve, reject) => {
    ws.on('open', () => resolve(ws));
    ws.on('error', reject);
  });
}

/**
 * @param {WebSocket} ws
 * @returns {Promise<number>} close code
 */
function waitForClose(ws) {
  return new Promise((resolve) => {
    ws.on('close', (code) => resolve(code));
  });
}

describe('ws first-frame auth', () => {
  test('valid auth frame first → subsequent requests are processed', async () => {
    const port = await startServer();
    const ws = await openClient(port);

    /** @type {any[]} */
    const messages = [];
    ws.on('message', (data) => messages.push(JSON.parse(data.toString())));

    ws.send(JSON.stringify({ type: 'auth', token: TOKEN }));

    const reply = await new Promise((resolve) => {
      ws.on('message', (data) => resolve(JSON.parse(data.toString())));
      ws.send(JSON.stringify({ id: 'ping-1', type: 'ping' }));
    });

    expect(reply.ok).toBe(true);
    expect(reply.id).toBe('ping-1');
    ws.close();
  });

  test('wrong token as first frame → socket closed 4401', async () => {
    const port = await startServer();
    const ws = await openClient(port);
    const closed = waitForClose(ws);
    ws.send(JSON.stringify({ type: 'auth', token: 'wrong-token' }));
    expect(await closed).toBe(4401);
  });

  test('non-auth first frame → socket closed 4401 (subscribe rejected)', async () => {
    const port = await startServer();
    const ws = await openClient(port);
    const closed = waitForClose(ws);
    ws.send(
      JSON.stringify({
        id: 's1',
        type: 'subscribe-list',
        payload: { id: 'c1', type: 'all-issues' }
      })
    );
    expect(await closed).toBe(4401);
  });

  test('unauth mutation as first frame → socket closed 4401', async () => {
    const port = await startServer();
    const ws = await openClient(port);
    const closed = waitForClose(ws);
    ws.send(
      JSON.stringify({
        id: 'm1',
        type: 'update-status',
        payload: { id: 'UI-1', status: 'open' }
      })
    );
    expect(await closed).toBe(4401);
  });

  test('missing auth frame → deadline closes socket 4401', async () => {
    const port = await startServer({ auth_deadline_ms: 50 });
    const ws = await openClient(port);
    const closed = waitForClose(ws);
    // Send nothing; the deadline must fire.
    expect(await closed).toBe(4401);
  });
});
