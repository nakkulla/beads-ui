import { afterEach, describe, expect, test, vi } from 'vitest';
import { getWorkerRuntime } from '../worker/runtime.js';
import { pushSnapshotIfChanged, setConnWorkspace } from './context.js';
import {
  __resetWorkerQueueForTest,
  __setWorkerAccountCatalogForTest,
  detachWorkerQueue,
  fanout,
  handleSubscribeWorkerQueue,
  onWorkerSnapshotRefresh,
  workerQueueSubscriberCount
} from './worker-handlers.js';

/**
 * A fake socket recording every frame it was sent.
 */
function fakeWs() {
  /** @type {any[]} */
  const frames = [];
  return {
    frames,
    /** @param {string} raw */
    send(raw) {
      frames.push(JSON.parse(raw));
    }
  };
}

describe('pushSnapshotIfChanged (UI-d509)', () => {
  test('assembles the standard push envelope around the shared body', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'worker:queue' };

    const sent = pushSnapshotIfChanged(
      sub,
      'worker-queue-snapshot',
      JSON.stringify({ root_dir: '/r', queue: { revision: 1 } })
    );

    expect(sent).toBe(true);
    expect(ws.frames).toHaveLength(1);
    expect(ws.frames[0].ok).toBe(true);
    expect(ws.frames[0].id).toMatch(/^evt-\d+$/);
    expect(ws.frames[0].type).toBe('worker-queue-snapshot');
    expect(ws.frames[0].payload).toEqual({
      type: 'worker-queue-snapshot',
      id: 'worker:queue',
      root_dir: '/r',
      queue: { revision: 1 }
    });
  });

  test('skips a body identical to the last one sent', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };
    const body = JSON.stringify({ workspaces: [] });
    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', body);

    const sent = pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', body);

    expect(sent).toBe(false);
    expect(ws.frames).toHaveLength(1);
  });

  test('sends again once the body changes', () => {
    const ws = fakeWs();
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };
    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', '{"a":1}');

    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', '{"a":2}');

    expect(ws.frames.map((f) => f.payload.a)).toEqual([1, 2]);
  });

  test('retries on the next push when the send threw', () => {
    let fail = true;
    /** @type {any[]} */
    const frames = [];
    const ws = {
      /** @param {string} raw */
      send(raw) {
        if (fail) {
          throw new Error('socket closed');
        }
        frames.push(JSON.parse(raw));
      }
    };
    const sub = { ws: /** @type {any} */ (ws), client_id: 'm1' };

    const first = pushSnapshotIfChanged(
      sub,
      'monitor-pipeline-snapshot',
      '{"a":1}'
    );
    fail = false;
    const second = pushSnapshotIfChanged(
      sub,
      'monitor-pipeline-snapshot',
      '{"a":1}'
    );

    expect(first).toBe(false);
    expect(second).toBe(true);
    expect(frames).toHaveLength(1);
  });
});

describe('worker queue keyed fanout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    __resetWorkerQueueForTest();
  });

  function subscribe() {
    const root_dir = '/tmp/example/push-patch/repo';
    const ws = fakeWs();
    const socket = /** @type {any} */ (ws);
    const queue = {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      exec_defaults: {}
    };
    vi.spyOn(getWorkerRuntime().queueStore, 'snapshot').mockReturnValue(
      /** @type {any} */ (queue)
    );
    vi.spyOn(getWorkerRuntime().runnableCache, 'refresh').mockImplementation(
      () => {}
    );
    __setWorkerAccountCatalogForTest({
      listClaude: () => new Promise(() => {})
    });
    setConnWorkspace(socket, { root_dir, db_path: `${root_dir}/.beads/db` });
    const req = /** @type {const} */ ({
      id: 'subscribe-1',
      type: 'subscribe-worker-queue',
      payload: { id: 'worker:queue' }
    });
    handleSubscribeWorkerQueue(socket, req);
    return { root_dir, ws, socket, queue, req };
  }

  test('pushes a changed revision immediately as a patch and notifies refresh listeners', () => {
    const { root_dir, ws, socket, queue } = subscribe();
    const listener = vi.fn();
    const off = onWorkerSnapshotRefresh(listener);

    fanout(root_dir, { ...queue, revision: 2 });

    const pushed = ws.frames.filter((frame) =>
      frame.type.startsWith('worker-queue-')
    );
    expect(pushed.map((frame) => [frame.type, frame.payload.seq])).toEqual([
      ['worker-queue-snapshot', 1],
      ['worker-queue-patch', 2]
    ]);
    expect(pushed[1].payload).toEqual({
      type: 'worker-queue-patch',
      id: 'worker:queue',
      seq: 2,
      root_dir,
      set: { 'queue/revision': 2 },
      unset: []
    });
    expect(listener).toHaveBeenCalledWith(root_dir);
    off();
    detachWorkerQueue(socket);
  });

  test('replaces a repeated subscription with one new snapshot baseline', () => {
    const { root_dir, ws, socket, queue, req } = subscribe();

    handleSubscribeWorkerQueue(socket, req);
    fanout(root_dir, { ...queue, revision: 2 });

    expect(workerQueueSubscriberCount(root_dir)).toBe(1);
    expect(
      ws.frames
        .filter((frame) => frame.type.startsWith('worker-queue-'))
        .map((frame) => frame.payload.seq)
    ).toEqual([1, 1, 2]);
    detachWorkerQueue(socket);
  });
});
