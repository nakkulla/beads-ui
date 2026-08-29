/**
 * The session-facing queue endpoints (UI-1gpj §3.1/§3.2).
 *
 * The GET projection is seeded by writing `queue.json` straight into the state
 * directory: `running` and `pr_wait` rows carrying (and legacy rows lacking) a
 * `serial_lane_id` are exactly the shapes no public store method composes, and
 * the loader is the contract this projection reads through anyway.
 */
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest';

// `subscribe-worker-queue` triggers the session-lane scan, which would spawn a
// real `bd`; the same seam ws.worker-queue.test.js uses keeps it inert.
vi.mock('../workspace-snapshot-runtime.js', () => ({
  requestWorkspaceSnapshot: async () => ({ ok: false }),
  signalWorkspaceSnapshotMutation: () => {},
  __resetWorkspaceSnapshotRuntimeForTest: () => {},
  __setWorkspaceSnapshotCoordinatorFactoryForTest: () => {}
}));

const { createApp } = await import('../app.js');
const { registerWorkspace } = await import('../registry-watcher.js');
const {
  __resetWorkerAttachmentsForTest,
  __setUnattachedAdmissionCheckForTest
} = await import('../worker/attach.js');
const { __resetWorkerRuntimeForTest, getWorkerRuntime } =
  await import('../worker/runtime.js');
const { queueFilePath } = await import('../worker/state-paths.js');
const { setConnWorkspace } = await import('../ws/context.js');
const { __resetWorkerQueueForTest, handleSubscribeWorkerQueue } =
  await import('../ws/worker-handlers.js');

/** @type {string} */
let workspace;
/** @type {string} */
let tmp_state;
/** @type {import('node:http').Server} */
let server;
/** @type {string} */
let base_url;

beforeAll(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wq-route-ws-'));
  registerWorkspace({
    path: workspace,
    database: path.join(workspace, '.beads')
  });
});

beforeEach(async () => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wq-route-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
  __resetWorkerQueueForTest();
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));

  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: workspace,
    frontend_mode: 'static'
  });
  server = createServer(app);
  // Bind loopback explicitly: a wildcard bind would expose the test server.
  await new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(undefined))
  );
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  base_url = `http://127.0.0.1:${address.port}`;
});

afterEach(async () => {
  await new Promise((resolve) => server.close(() => resolve(undefined)));
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * Write a `queue.json` the store has not loaded yet.
 *
 * @param {Record<string, unknown>} raw
 */
function seedQueueFile(raw) {
  const file = queueFilePath(workspace);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(raw));
}

/**
 * @param {string} query
 * @returns {Promise<{ status: number, body: any, cache_control: string|null }>}
 */
async function getQueue(query) {
  const response = await fetch(`${base_url}/api/worker/queue?${query}`);
  return {
    status: response.status,
    body: await response.json().catch(() => null),
    cache_control: response.headers.get('cache-control')
  };
}

/**
 * @param {Record<string, unknown>} body
 * @returns {Promise<{ status: number, body: any }>}
 */
async function postPlace(body) {
  const response = await fetch(`${base_url}/api/worker/queue/place`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  return {
    status: response.status,
    body: await response.json().catch(() => null)
  };
}

/**
 * @returns {any}
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

test('rejects a GET without root_dir', async () => {
  const { status, body } = await getQueue('');

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('rejects a relative root_dir', async () => {
  const { status, body } = await getQueue('root_dir=relative/path');

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('rejects a root_dir outside the registered workspaces', async () => {
  const { status, body } = await getQueue(
    `root_dir=${encodeURIComponent('/tmp/example/not-registered')}`
  );

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('projects the parallel lane ahead of the configured serial lanes', async () => {
  seedQueueFile({
    revision: 7,
    serial_lane_count: 2,
    queue: [{ bead_id: 'UI-par', added_at: 11 }],
    serial_lanes: [
      { id: 's1', entries: [] },
      { id: 's2', entries: [{ bead_id: 'UI-ser', added_at: 22 }] }
    ]
  });

  const { status, body, cache_control } = await getQueue(
    `root_dir=${encodeURIComponent(workspace)}`
  );

  expect(status).toBe(200);
  expect(cache_control).toBe('no-store');
  expect(body).toMatchObject({ ok: true, revision: 7, serial_lane_count: 2 });
  expect(body.lanes).toEqual([
    { id: 'parallel', entries: [{ bead_id: 'UI-par', added_at: 11 }] },
    { id: 's1', entries: [] },
    { id: 's2', entries: [{ bead_id: 'UI-ser', added_at: 22 }] }
  ]);
});

test('projects one running row per bead from that bead last running attempt', async () => {
  seedQueueFile({
    revision: 3,
    serial_lane_count: 2,
    attempts: {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-run',
        status: 'running',
        serial_lane_id: null
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-run',
        status: 'running',
        serial_lane_id: 's2'
      },
      a3: {
        attempt_id: 'a3',
        bead_id: 'UI-settled',
        status: 'done',
        serial_lane_id: 's1'
      },
      a4: {
        attempt_id: 'a4',
        bead_id: 'UI-parallel-run',
        status: 'running',
        serial_lane_id: null
      }
    }
  });

  const { body } = await getQueue(`root_dir=${encodeURIComponent(workspace)}`);

  expect(body.running).toEqual([
    { bead_id: 'UI-run', serial_lane_id: 's2' },
    { bead_id: 'UI-parallel-run', serial_lane_id: null }
  ]);
});

test('projects a legacy pr_wait row without a lane as null', async () => {
  seedQueueFile({
    revision: 4,
    serial_lane_count: 2,
    pr_wait: [
      { bead_id: 'UI-pr', added_at: 44, serial_lane_id: 's1' },
      { bead_id: 'UI-legacy', added_at: 55 }
    ]
  });

  const { body } = await getQueue(`root_dir=${encodeURIComponent(workspace)}`);

  expect(body.pr_wait).toEqual([
    { bead_id: 'UI-pr', serial_lane_id: 's1' },
    { bead_id: 'UI-legacy', serial_lane_id: null }
  ]);
});

test('rejects a place without expected_revision', async () => {
  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a'
  });

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('rejects a place naming an unknown lane', async () => {
  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    lane: 'serial',
    expected_revision: 0
  });

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('rejects a place without a bead_id', async () => {
  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: '',
    expected_revision: 0
  });

  expect(status).toBe(400);
  expect(body).toEqual({ ok: false, error: 'bad_request' });
});

test('places a bead and reports the seat it landed in', async () => {
  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    lane: 's1',
    expected_revision: 0
  });

  expect(status).toBe(200);
  expect(body).toEqual({
    ok: true,
    applied: true,
    lane: 's1',
    index: 0,
    revision: 1
  });
  expect(
    getWorkerRuntime()
      .queueStore.snapshot(workspace)
      .serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['UI-a']);
});

test('reports an admission refusal as a 200 with the reason', async () => {
  __setUnattachedAdmissionCheckForTest(async () => ({
    ok: false,
    reason: 'worker_ineligible'
  }));

  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    expected_revision: 0
  });

  expect(status).toBe(200);
  expect(body).toEqual({
    ok: true,
    applied: false,
    conflict: false,
    admission_reason: 'worker_ineligible'
  });
  expect(getWorkerRuntime().queueStore.snapshot(workspace).queue).toEqual([]);
});

test('reports a stale expected_revision as a conflict', async () => {
  await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    expected_revision: 0
  });

  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-b',
    expected_revision: 0
  });

  expect(status).toBe(200);
  expect(body).toEqual({
    ok: true,
    applied: false,
    conflict: true,
    revision: 1
  });
});

test('reports a lane beyond the configured count as rejected', async () => {
  const { status, body } = await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    lane: 's5',
    expected_revision: 0
  });

  expect(status).toBe(200);
  expect(body).toEqual({
    ok: true,
    applied: false,
    conflict: false,
    reason: 'rejected'
  });
});

test('pushes a fresh snapshot to ws subscribers after an http place', async () => {
  const sock = fakeSocket();
  setConnWorkspace(sock, /** @type {any} */ ({ root_dir: workspace }));
  handleSubscribeWorkerQueue(sock, {
    id: 's1',
    type: 'subscribe-worker-queue',
    payload: { id: 'wq' }
  });
  sock.sent = [];

  await postPlace({
    root_dir: workspace,
    bead_id: 'UI-a',
    expected_revision: 0
  });

  const snapshots = sock.sent
    .map((/** @type {string} */ raw) => JSON.parse(raw))
    .filter(
      (/** @type {any} */ message) => message.type === 'worker-queue-snapshot'
    );
  expect(snapshots).toHaveLength(1);
  expect(snapshots[0].payload.queue.revision).toBe(1);
  expect(
    snapshots[0].payload.queue.queue.map((/** @type {any} */ e) => e.bead_id)
  ).toEqual(['UI-a']);
});
