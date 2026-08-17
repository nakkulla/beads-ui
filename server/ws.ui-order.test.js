import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { projectedResponse } from './__fixtures__/bd-json/projected.js';
import { runBd, runBdJsonProjected } from './bd.js';
import {
  __resetRegistriesForTest,
  __resetUiOrderForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import { setConnWorkspace } from './ws/context.js';

// update-status runs bd; mock it so the prune-on-close path resolves without a
// real bd CLI. The ui-order channel itself never touches bd.
vi.mock('./bd.js', () => ({ runBd: vi.fn(), runBdJsonProjected: vi.fn() }));

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

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function orderSnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'ui-order-snapshot')
    .map((m) => m.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsuio-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetUiOrderForTest();
  /** @type {import('vitest').Mock} */ (runBd).mockReset();
  /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
  // Seed DEFAULT_WORKSPACE so bare sockets resolve a deterministic workspace.
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetUiOrderForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws ui-order channel', () => {
  test('subscribe emits an initial ui-order snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-ui-order', { id: 'ui:order' });
    expect(replyFor(sock, 's1').ok).toBe(true);
    const snaps = orderSnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps[0]).toMatchObject({ revision: 0, order: {} });
  });

  test('ui-order-set applies, replies, and fans out to every subscriber', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-ui-order', { id: 'ui:a' });
    await send(b, 'sb', 'subscribe-ui-order', { id: 'ui:b' });
    a.sent = [];
    b.sent = [];

    await send(a, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1048576 }]
    });

    const reply = replyFor(a, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.revision).toBe(1);
    expect(reply.payload.order).toEqual({ 'UI-1': 1048576 });

    // Both subscribers received the fresh snapshot.
    const snapA = orderSnapshots(a);
    const snapB = orderSnapshots(b);
    expect(snapA.at(-1)).toMatchObject({
      revision: 1,
      order: { 'UI-1': 1048576 }
    });
    expect(snapB.at(-1)).toMatchObject({
      revision: 1,
      order: { 'UI-1': 1048576 }
    });
  });

  test('stale-revision ui-order-set is a conflict with current snapshot, no fanout', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-ui-order', { id: 'ui:a' });
    await send(b, 'sb', 'subscribe-ui-order', { id: 'ui:b' });
    await send(a, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    a.sent = [];
    b.sent = [];

    // Second client still thinks revision is 0.
    await send(b, 'm2', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-2', rank: 2 }]
    });
    const reply = replyFor(b, 'm2');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    expect(reply.payload.revision).toBe(1);
    expect(reply.payload.order).toEqual({ 'UI-1': 1 });
    // No fanout snapshot on conflict — neither subscriber gets a push.
    expect(orderSnapshots(a).length).toBe(0);
    expect(orderSnapshots(b).length).toBe(0);
  });

  test('unsubscribe stops further fanout', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-ui-order', { id: 'ui:a' });
    await send(b, 'sb', 'subscribe-ui-order', { id: 'ui:b' });
    await send(a, 'ua', 'unsubscribe-ui-order', { id: 'ui:a' });
    expect(replyFor(a, 'ua').payload.unsubscribed).toBe(true);
    a.sent = [];
    b.sent = [];

    await send(b, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    // a unsubscribed → no snapshot; b still subscribed → gets one.
    expect(orderSnapshots(a).length).toBe(0);
    expect(orderSnapshots(b).length).toBe(1);
  });

  test('closing a bead via update-status prunes it and fans out a fresh snapshot', async () => {
    const mRun = /** @type {import('vitest').Mock} */ (runBd);
    const mJson = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
    mRun.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
    mJson.mockResolvedValueOnce(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', status: 'closed' }
      })
    );

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-ui-order', { id: 'ui:order' });
    await send(sock, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [
        { bead_id: 'UI-1', rank: 1 },
        { bead_id: 'UI-2', rank: 2 }
      ]
    });
    sock.sent = [];

    await send(sock, 'c1', 'update-status', { id: 'UI-1', status: 'closed' });

    const snaps = orderSnapshots(sock);
    expect(snaps.length).toBeGreaterThanOrEqual(1);
    // UI-1 pruned from the order; UI-2 retained.
    expect(snaps.at(-1).order).toEqual({ 'UI-2': 2 });
    expect(snaps.at(-1).revision).toBe(2);
  });

  test('closing a bead not in the order does not fan out (no-op prune)', async () => {
    const mRun = /** @type {import('vitest').Mock} */ (runBd);
    const mJson = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
    mRun.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' });
    mJson.mockResolvedValueOnce(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-404', status: 'closed' }
      })
    );

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-ui-order', { id: 'ui:order' });
    await send(sock, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    sock.sent = [];

    await send(sock, 'c1', 'update-status', { id: 'UI-404', status: 'closed' });
    // Nothing removed → no ui-order snapshot fanout.
    expect(orderSnapshots(sock).length).toBe(0);
  });

  test('unsubscribe after a workspace switch removes the old-workspace subscription', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    // Both sockets start on workspace A; a subscribes there.
    setConnWorkspace(/** @type {any} */ (a), {
      root_dir: '/tmp/uio-ws-A',
      db_path: '/tmp/uio-ws-A/.beads/db'
    });
    setConnWorkspace(/** @type {any} */ (b), {
      root_dir: '/tmp/uio-ws-A',
      db_path: '/tmp/uio-ws-A/.beads/db'
    });
    await send(a, 's1', 'subscribe-ui-order', { id: 'ui:order' });

    // The client unsubscribes AFTER set-workspace already switched the
    // connection — the entry to remove lives under the PREVIOUS workspace key.
    setConnWorkspace(/** @type {any} */ (a), {
      root_dir: '/tmp/uio-ws-B',
      db_path: '/tmp/uio-ws-B/.beads/db'
    });
    await send(a, 'u1', 'unsubscribe-ui-order', { id: 'ui:order' });
    expect(replyFor(a, 'u1').payload.unsubscribed).toBe(true);

    // A mutation in workspace A must not fan out to the switched socket.
    a.sent = [];
    await send(b, 'm1', 'ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    expect(replyFor(b, 'm1').payload.applied).toBe(true);
    expect(orderSnapshots(a).length).toBe(0);
  });
});
