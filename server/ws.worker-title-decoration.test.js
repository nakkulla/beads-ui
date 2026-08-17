import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from './bd.js';
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
import { decorateQueue } from './ws/worker-handlers.js';

// Only `runBdJsonProjected` is faked — the title cache's fill is the single
// under test, and everything else the ws layer imports from `bd.js` must stay
// real so this exercises the production wiring.
// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('./bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('./bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
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
 * @param {Record<string, string | { title: string, labels?: unknown }>} titles
 */
function stubBdTitles(titles) {
  vi.mocked(runBdJsonProjected).mockImplementation(
    async (
      /** @type {string} */ _command_family,
      /** @type {string[]} */ args
    ) => {
      const bead_id = args[1];
      const title = titles[bead_id];
      if (
        typeof title !== 'string' &&
        (!title || typeof title.title !== 'string')
      ) {
        return {
          ok: false,
          error: { code: 'bd_exit_error', message: 'not found' }
        };
      }
      return {
        ok: true,
        protocol: { format: 'bare', schema_version: null },
        data:
          typeof title === 'string'
            ? { id: bead_id, title }
            : { id: bead_id, ...title }
      };
    }
  );
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wstitle-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  vi.mocked(runBdJsonProjected).mockReset();
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
  test('projects partial bead_labels for queue, pr_wait, and done rows', async () => {
    stubBdTitles({
      'UI-1': { title: '대기', labels: ['worker-serial'] },
      'UI-2': { title: 'PR', labels: ['frontend'] },
      'UI-3': { title: '완료', labels: [] }
    });
    const raw_queue = {
      queue: [{ bead_id: 'UI-1' }],
      pr_wait: [{ bead_id: 'UI-2' }],
      done: [{ bead_id: 'UI-3' }],
      attempts: {}
    };

    expect(decorateQueue(process.cwd(), raw_queue).bead_labels).toEqual({});

    await vi.waitFor(() => {
      expect(decorateQueue(process.cwd(), raw_queue).bead_labels).toEqual({
        'UI-1': ['worker-serial'],
        'UI-2': ['frontend'],
        'UI-3': []
      });
    });
  });

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
    stubBdTitles({
      'UI-1': { title: '채워진 제목', labels: ['worker-serial'] }
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    await vi.waitFor(() => {
      const snaps = queueSnapshots(sock);
      expect(snaps[snaps.length - 1].bead_titles['UI-1']).toBe('채워진 제목');
      expect(snaps[snaps.length - 1].bead_labels['UI-1']).toEqual([
        'worker-serial'
      ]);
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
