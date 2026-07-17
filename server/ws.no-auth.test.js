import { createServer } from 'node:http';
import { afterEach, describe, expect, test } from 'vitest';
import { WebSocket } from 'ws';
import { attachWsServer } from './ws.js';

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
 * Boot an unauthenticated WS server (no auth option at all) and return the port.
 *
 * @returns {Promise<number>}
 */
async function startServer() {
  const server = createServer();
  const { wss } = attachWsServer(server, {
    path: '/ws',
    heartbeat_ms: 100000
  });
  running.push({ wss, server });
  await new Promise((resolve) => server.listen(0, () => resolve(undefined)));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  return address.port;
}

describe('attachWsServer without any auth option', () => {
  test('processes a normal application message as the FIRST frame', async () => {
    const port = await startServer();
    const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
    await new Promise((resolve, reject) => {
      ws.on('open', () => resolve(undefined));
      ws.on('error', reject);
    });

    // The very first frame is a real request (no auth handshake precedes it),
    // and it must be dispatched normally.
    const reply = await new Promise((resolve, reject) => {
      ws.on('message', (data) => {
        try {
          resolve(JSON.parse(data.toString()));
        } catch (err) {
          reject(err);
        }
      });
      ws.on('close', (code) => reject(new Error(`socket closed: ${code}`)));
      ws.send(
        JSON.stringify({ id: 'req-1', type: 'list-workspaces', payload: {} })
      );
    });

    expect(reply.id).toBe('req-1');
    expect(reply.ok).toBe(true);
    expect(reply.type).toBe('list-workspaces');
    expect(Array.isArray(reply.payload.workspaces)).toBe(true);

    ws.close();
  });
});
