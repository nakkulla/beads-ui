import { describe, expect, test, vi } from 'vitest';
import { handleMessage } from './ws.js';

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
