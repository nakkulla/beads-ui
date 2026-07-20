import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetDisplayPolicyForTest,
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import { setConnWorkspace } from './ws/context.js';

// The display-policy channel never touches bd; mock it so the module graph
// resolves without a real bd CLI.
vi.mock('./bd.js', () => ({ runBd: vi.fn(), runBdJson: vi.fn() }));

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
function policySnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'display-policy-snapshot')
    .map((m) => m.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsdp-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetDisplayPolicyForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetDisplayPolicyForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws display-policy channel', () => {
  test('subscribe emits an initial seeded policy snapshot', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-display-policy', { id: 'dp' });

    expect(replyFor(sock, 's1').ok).toBe(true);
    const snaps = policySnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps[0].policy).toMatchObject({
      revision: 0,
      hidden_labels: ['has:spec', 'pr'],
      hidden_prefixes: ['reviewed:', 'skipped:']
    });
  });

  test('subscribe rejects a missing client id', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-display-policy', {});

    const reply = replyFor(sock, 's1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });

  test('display-policy-set applies, replies, and fans out to every subscriber', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-display-policy', { id: 'dp:a' });
    await send(b, 'sb', 'subscribe-display-policy', { id: 'dp:b' });
    a.sent = [];
    b.sent = [];

    await send(a, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    const reply = replyFor(a, 'm1');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.revision).toBe(1);
    expect(policySnapshots(a).at(-1).policy.hidden_labels).toEqual(['wip']);
    expect(policySnapshots(b).at(-1).policy.hidden_labels).toEqual(['wip']);
  });

  test('stale-revision set is a conflict with the current policy and no fanout', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-display-policy', { id: 'dp:a' });
    await send(b, 'sb', 'subscribe-display-policy', { id: 'dp:b' });
    await send(a, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['first'] }
    });
    a.sent = [];
    b.sent = [];

    await send(b, 'm2', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['second'] }
    });

    const reply = replyFor(b, 'm2');
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    expect(reply.payload.revision).toBe(1);
    expect(reply.payload.policy.hidden_labels).toEqual(['first']);
    expect(policySnapshots(a).length).toBe(0);
    expect(policySnapshots(b).length).toBe(0);
  });

  test('display-policy-set rejects a malformed payload', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-display-policy', { id: 'dp' });

    await send(sock, 'm1', 'display-policy-set', { expected_revision: 0 });

    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });

  test('unsubscribe stops further fanout', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-display-policy', { id: 'dp:a' });
    await send(b, 'sb', 'subscribe-display-policy', { id: 'dp:b' });
    await send(a, 'ua', 'unsubscribe-display-policy', { id: 'dp:a' });
    expect(replyFor(a, 'ua').payload.unsubscribed).toBe(true);
    a.sent = [];
    b.sent = [];

    await send(b, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    expect(policySnapshots(a).length).toBe(0);
    expect(policySnapshots(b).length).toBe(1);
  });

  test('unsubscribe after a workspace switch removes the old-workspace subscription', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    setConnWorkspace(/** @type {any} */ (a), {
      root_dir: '/tmp/dp-ws-A',
      db_path: '/tmp/dp-ws-A/.beads/db'
    });
    setConnWorkspace(/** @type {any} */ (b), {
      root_dir: '/tmp/dp-ws-A',
      db_path: '/tmp/dp-ws-A/.beads/db'
    });
    await send(a, 's1', 'subscribe-display-policy', { id: 'dp' });

    // The client unsubscribes AFTER set-workspace already switched the
    // connection — the entry to remove lives under the PREVIOUS workspace key.
    setConnWorkspace(/** @type {any} */ (a), {
      root_dir: '/tmp/dp-ws-B',
      db_path: '/tmp/dp-ws-B/.beads/db'
    });
    await send(a, 'u1', 'unsubscribe-display-policy', { id: 'dp' });
    expect(replyFor(a, 'u1').payload.unsubscribed).toBe(true);
    a.sent = [];

    await send(b, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    expect(replyFor(b, 'm1').payload.applied).toBe(true);
    expect(policySnapshots(a).length).toBe(0);
  });

  test('re-subscribing on the same socket does not duplicate fanout', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-display-policy', { id: 'dp:a' });
    await send(a, 'sa2', 'subscribe-display-policy', { id: 'dp:a' });
    await send(b, 'sb', 'subscribe-display-policy', { id: 'dp:b' });
    a.sent = [];

    await send(b, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    expect(policySnapshots(a).length).toBe(1);
  });

  test('a persistence failure answers with an error instead of throwing', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-display-policy', { id: 'dp' });
    // Make the state dir unwritable by turning it into a file.
    const dir = path.join(tmp_state, 'bdui');
    fs.rmSync(dir, { recursive: true, force: true });
    fs.writeFileSync(dir, 'not a directory');

    await send(sock, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['wip'] }
    });

    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('internal_error');
  });

  test('policies are isolated per workspace', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    setConnWorkspace(/** @type {any} */ (a), {
      root_dir: '/tmp/dp-iso-A',
      db_path: '/tmp/dp-iso-A/.beads/db'
    });
    setConnWorkspace(/** @type {any} */ (b), {
      root_dir: '/tmp/dp-iso-B',
      db_path: '/tmp/dp-iso-B/.beads/db'
    });
    await send(a, 'sa', 'subscribe-display-policy', { id: 'dp:a' });
    await send(b, 'sb', 'subscribe-display-policy', { id: 'dp:b' });
    b.sent = [];

    await send(a, 'm1', 'display-policy-set', {
      expected_revision: 0,
      policy: { hidden_labels: ['only-a'] }
    });

    expect(policySnapshots(b).length).toBe(0);
    await send(b, 'sb2', 'subscribe-display-policy', { id: 'dp:b2' });
    expect(policySnapshots(b).at(-1).policy.hidden_labels).toEqual([
      'has:spec',
      'pr'
    ]);
  });
});
