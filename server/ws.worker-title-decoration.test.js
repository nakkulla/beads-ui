import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJson } from './bd.js';
import {
  __resetWorkerAttachmentsForTest,
  __setUnattachedAdmissionCheckForTest
} from './worker/attach.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

// Only `runBdJson` is faked — the title cache's fill is the single `bd` caller
// under test, and everything else the ws layer imports from `bd.js` must stay
// real so this exercises the production wiring.
vi.mock('./bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJson: vi.fn() };
});

/** @type {string} */
let tmp_state;

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
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function queueSnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'worker-queue-snapshot')
    .map((m) => m.payload.queue);
}

/**
 * Answer `bd show <id> --json` from a fixture map; an unknown id exits
 * non-zero, which is the lookup failure the cache must survive.
 *
 * @param {Record<string, string>} titles
 */
function stubBdTitles(titles) {
  vi.mocked(runBdJson).mockImplementation(
    async (/** @type {string[]} */ args) => {
      const bead_id = args[1];
      const title = titles[bead_id];
      if (typeof title !== 'string') {
        return { code: 1, stderr: 'not found' };
      }
      return { code: 0, stdoutJson: [{ id: bead_id, title }] };
    }
  );
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wstitle-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  vi.mocked(runBdJson).mockReset();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker queue snapshot — bead_titles decoration (UI-12k6)', () => {
  test('carries a bead_titles map on every snapshot', async () => {
    stubBdTitles({});
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock)[0].bead_titles).toEqual({});
  });

  test('omits a bead whose title is not cached yet and still delivers the snapshot', async () => {
    stubBdTitles({ 'UI-1': '캐시 대상' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    const snaps = queueSnapshots(sock);
    expect(snaps.length).toBeGreaterThanOrEqual(1);
    expect(snaps[0].queue[0].bead_id).toBe('UI-1');
    expect(snaps[0].bead_titles['UI-1']).toBeUndefined();
  });

  test('pushes a fresh snapshot carrying the title once the lookup fills', async () => {
    stubBdTitles({ 'UI-1': '채워진 제목' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    await vi.waitFor(() => {
      const snaps = queueSnapshots(sock);
      expect(snaps[snaps.length - 1].bead_titles['UI-1']).toBe('채워진 제목');
    });
  });

  test('keeps delivering snapshots when the title lookup fails', async () => {
    stubBdTitles({});
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-queue-place', {
      bead_id: 'UI-2',
      expected_revision: 1
    });

    const snaps = queueSnapshots(sock);
    expect(snaps[0].queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1',
      'UI-2'
    ]);
    expect(snaps[0].bead_titles).toEqual({});
  });
});
