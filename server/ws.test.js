import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
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
  test('invalid JSON yields bad_json error', () => {
    const ws = makeStubSocket();
    handleMessage(/** @type {any} */ (ws), Buffer.from('{oops'));
    expect(ws.sent.length).toBe(1);
    const obj = JSON.parse(ws.sent[0]);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_json');
  });

  test('invalid envelope yields bad_request', () => {
    const ws = makeStubSocket();
    handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ not: 'a request' }))
    );
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });

  test('unknown message type returns unknown_type error', () => {
    const ws = makeStubSocket();
    const req = { id: '1', type: 'some-unknown', payload: {} };
    handleMessage(/** @type {any} */ (ws), Buffer.from(JSON.stringify(req)));
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('unknown_type');
  });

  test('set-workspace broadcasts workspace-changed when workspace changes', async () => {
    const root_a = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ws-a-'));
    const root_b = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ws-b-'));
    try {
      fs.mkdirSync(path.join(root_a, '.beads'), { recursive: true });
      fs.mkdirSync(path.join(root_b, '.beads'), { recursive: true });
      fs.writeFileSync(path.join(root_a, '.beads', 'metadata.json'), '{}');
      fs.writeFileSync(path.join(root_b, '.beads', 'metadata.json'), '{}');

      const server = createServer();
      const { wss } = attachWsServer(server, {
        path: '/ws',
        root_dir: root_a
      });
      const requester = makeStubSocket();
      const observer = makeStubSocket();
      wss.clients.add(/** @type {any} */ (requester));
      wss.clients.add(/** @type {any} */ (observer));

      await handleMessage(
        /** @type {any} */ (requester),
        Buffer.from(
          JSON.stringify({
            id: 'set-workspace-1',
            type: 'set-workspace',
            payload: { path: root_b }
          })
        )
      );

      const event = observer.sent
        .map((/** @type {string} */ msg) => JSON.parse(msg))
        .find(
          (/** @type {{ type?: string }} */ msg) =>
            msg.type === 'workspace-changed'
        );
      expect(event).toBeTruthy();
      expect(event.payload.root_dir).toBe(root_b);
    } finally {
      fs.rmSync(root_a, { recursive: true, force: true });
      fs.rmSync(root_b, { recursive: true, force: true });
    }
  });
});

// Note: broadcast behavior is integration-tested later when a full server can run.
