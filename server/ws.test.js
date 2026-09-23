import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import net from 'node:net';
import { describe, expect, test, vi } from 'vitest';
import { attachWsServer, handleMessage } from './ws.js';

/** @returns {any} */
function makeStubSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    },
    ping: vi.fn(),
    terminate: vi.fn()
  };
}

describe('ws message handling', () => {
  test('invalid JSON yields bad_json error', async () => {
    const ws = makeStubSocket();
    await handleMessage(/** @type {any} */ (ws), Buffer.from('{oops'));
    expect(ws.sent.length).toBe(1);
    const obj = JSON.parse(ws.sent[0]);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_json');
  });

  test('invalid envelope yields bad_request', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ not: 'a request' }))
    );
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });

  test('unknown message type returns unknown_type error', async () => {
    const ws = makeStubSocket();
    const req = { id: '1', type: 'some-unknown', payload: {} };
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify(req))
    );
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('unknown_type');
  });

  test('set-workspace rejects paths outside the available workspace list', async () => {
    const ws = makeStubSocket();
    const req = {
      id: 'workspace-1',
      type: 'set-workspace',
      payload: { path: '/outside-configured' }
    };

    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify(req))
    );

    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });

  test('set-workspace rejects relative paths', async () => {
    const ws = makeStubSocket();
    const req = {
      id: 'workspace-2',
      type: 'set-workspace',
      payload: { path: 'relative/workspace' }
    };

    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify(req))
    );

    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });
});

/**
 * Attach the real WS server to an ephemeral HTTP server.
 *
 * @returns {Promise<{ wss: import('ws').WebSocketServer, port: number, close: () => Promise<void> }>}
 */
async function startWsServer() {
  const http_server = createServer();
  const { wss } = attachWsServer(http_server, {
    path: '/ws',
    heartbeat_ms: 60_000,
    initial_workspace_root: null
  });
  await new Promise((resolve) => {
    http_server.listen({ port: 0, host: '127.0.0.1' }, () =>
      resolve(undefined)
    );
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    http_server.address()
  );
  return {
    wss,
    port: address.port,
    close: async () => {
      for (const client of wss.clients) {
        client.terminate();
      }
      await new Promise((resolve) => wss.close(() => resolve(undefined)));
      await new Promise((resolve) =>
        http_server.close(() => resolve(undefined))
      );
    }
  };
}

/**
 * Open a raw TCP WebSocket that negotiates permessage-deflate and collect the
 * first byte (FIN/RSV1/opcode) of each server frame, so the compression bit
 * is observed on the wire rather than through a client library.
 *
 * @param {number} port
 * @returns {Promise<{ socket: net.Socket, frames: number[], upgraded: string }>}
 */
async function rawDeflateClient(port) {
  const socket = net.connect(port, '127.0.0.1');
  /** @type {number[]} */
  const frames = [];
  let buffer = Buffer.alloc(0);
  let upgraded = '';
  await new Promise((resolve, reject) => {
    socket.once('error', reject);
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (upgraded === '') {
        const end = buffer.indexOf('\r\n\r\n');
        if (end < 0) {
          return;
        }
        upgraded = buffer.subarray(0, end).toString();
        buffer = buffer.subarray(end + 4);
        resolve(undefined);
      }
      while (buffer.length >= 2) {
        let length = buffer[1] & 0x7f;
        let offset = 2;
        if (length === 126) {
          if (buffer.length < 4) {
            return;
          }
          length = buffer.readUInt16BE(2);
          offset = 4;
        } else if (length === 127) {
          if (buffer.length < 10) {
            return;
          }
          length = Number(buffer.readBigUInt64BE(2));
          offset = 10;
        }
        if (buffer.length < offset + length) {
          return;
        }
        frames.push(buffer[0]);
        buffer = buffer.subarray(offset + length);
      }
    });
    socket.write(
      [
        'GET /ws HTTP/1.1',
        `Host: 127.0.0.1:${port}`,
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Key: ${randomBytes(16).toString('base64')}`,
        'Sec-WebSocket-Version: 13',
        'Sec-WebSocket-Extensions: permessage-deflate',
        '',
        ''
      ].join('\r\n')
    );
  });
  return { socket, frames, upgraded };
}

describe('ws permessage-deflate (UI-j2h3 §4.5)', () => {
  test('creates the server with no context takeover and a 1KB threshold', async () => {
    const server = await startWsServer();

    const options = server.wss.options.perMessageDeflate;
    await server.close();

    expect(options).toEqual({ serverNoContextTakeover: true, threshold: 1024 });
  });

  // A real monitor snapshot needs registered workspaces, so the frames here are
  // sent through the same server-side socket with a sub-1KB push and a
  // snapshot-sized body; the RSV1 bit of each frame header is read off the raw
  // TCP stream.
  test('sends a push under 1KB uncompressed and a snapshot-sized push compressed', async () => {
    const server = await startWsServer();
    const client = await rawDeflateClient(server.port);
    await vi.waitFor(() => expect(server.wss.clients.size).toBe(1));
    const [peer] = server.wss.clients;

    peer.send(JSON.stringify({ type: 'session-log-append', line: 'x' }));
    peer.send(JSON.stringify({ type: 'snapshot', body: 'y'.repeat(8000) }));
    await vi.waitFor(() => expect(client.frames.length).toBe(2));
    client.socket.destroy();
    await server.close();

    expect([
      client.upgraded.includes('permessage-deflate'),
      (client.frames[0] & 0x40) !== 0,
      (client.frames[1] & 0x40) !== 0
    ]).toEqual([true, false, true]);
  });
});
