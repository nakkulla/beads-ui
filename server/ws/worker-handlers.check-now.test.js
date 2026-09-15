import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from '../worker/attach.js';
import { emitQueueChanged } from '../worker/queue-events.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { setConnWorkspace } from './context.js';
import {
  __resetWorkerQueueForTest,
  handleWorkerExternalWaitCheckNow,
  onWorkerSnapshotRefresh
} from './worker-handlers.js';

const fake_spawn = vi.hoisted(() => vi.fn());
vi.mock('node:child_process', async (importOriginal) => ({
  ...(await importOriginal()),
  spawn: fake_spawn
}));
vi.mock('../registry-watcher.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getAvailableWorkspaces: () => [{ path: WS }]
}));

const WS = '/tmp/check-now-workspace';
/** @type {string} */
let tmp_state;
/** @type {any} */
let child;
/** @type {Record<string, any>} */
let row;
/** @type {string} */
let next_stage;
/** @type {ReturnType<typeof vi.fn>} */
let refresh;
/** @type {ReturnType<typeof vi.fn<(workspace: string) => void>>} */
let fanout;
/** @type {() => void} */
let unsubscribe;

beforeEach(() => {
  vi.useFakeTimers();
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-check-now-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  row = {
    root_dir: WS,
    watch_id: 'watch-1',
    consumer_id: 'A-original',
    gate_id: 'G-gate',
    stage: 'active',
    last_observed_at: 123
  };
  next_stage = 'active';
  child = Object.assign(new EventEmitter(), {
    stdout: new EventEmitter(),
    stderr: new EventEmitter(),
    kill: vi.fn()
  });
  fake_spawn.mockReset().mockReturnValue(child);
  refresh = vi.fn(async () => {
    row = { ...row, stage: next_stage, last_observed_at: 124 };
    emitQueueChanged(WS);
  });
  __registerWorkerAttachmentForTest(
    WS,
    /** @type {any} */ ({
      waitJudge: {
        get: () => ({ external_waits: [{ ...row }], wait_reasons: [] }),
        refresh,
        stop: vi.fn()
      }
    })
  );
  fanout = vi.fn();
  unsubscribe = onWorkerSnapshotRefresh(fanout);
});

afterEach(() => {
  unsubscribe();
  __resetWorkerAttachmentsForTest();
  __resetWorkerQueueForTest();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.useRealTimers();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/** @param {Record<string, any>} [patch] */
function start(patch = {}) {
  const socket = /** @type {any} */ ({ send: vi.fn() });
  setConnWorkspace(socket, { root_dir: WS, db_path: '' });
  const done = handleWorkerExternalWaitCheckNow(socket, {
    id: 'check-1',
    type: 'worker-external-wait-check-now',
    payload: { root_dir: WS, watch_id: 'watch-1', since: 123, ...patch }
  });
  return {
    socket,
    done,
    reply: () => JSON.parse(socket.send.mock.calls.at(-1)[0])
  };
}

/**
 * @param {number} [completed]
 * @param {boolean} [skipped]
 */
function close(completed = 0, skipped = false) {
  child.stdout.emit(
    'data',
    JSON.stringify({ skipped, summary: { completed } })
  );
  child.emit('close', 0);
}

describe('external wait check now handler', () => {
  test('reports settlement only when the clicked watch completes', async () => {
    next_stage = 'complete';
    const request = start();

    close(1);
    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: true,
      outcome: 'settled'
    });
    expect(fake_spawn).toHaveBeenCalledWith('bead-job-monitor', ['tick'], {
      cwd: WS,
      shell: false,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });
  });

  test('keeps waiting when another watch completed', async () => {
    const request = start();

    close(1);
    await request.done;

    expect(request.reply().payload.outcome).toBe('still_waiting');
  });

  test('keeps waiting when the receipt records no completion', async () => {
    const request = start();

    close();
    await request.done;

    expect(request.reply().payload.outcome).toBe('still_waiting');
  });

  test('reports a busy host lock as already running', async () => {
    const request = start();

    close(0, true);
    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: true,
      outcome: 'skipped',
      summary: '이미 실행 중'
    });
  });

  test('reports only the first stderr line on abnormal exit', async () => {
    const request = start();

    child.stderr.emit('data', 'ssh failed\nprivate diagnostic');
    child.emit('close', 1);
    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: false,
      outcome: 'error',
      summary: 'ssh failed'
    });
  });

  test('reports malformed stdout as an error', async () => {
    const request = start();

    child.stdout.emit('data', '{}');
    child.emit('close', 0);
    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: false,
      outcome: 'error'
    });
  });

  test('reports spawn failure without an unhandled rejection', async () => {
    const request = start();

    child.emit('error', new Error('ENOENT'));
    child.emit('close', -2);
    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: false,
      outcome: 'error',
      summary: 'ENOENT'
    });
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  test('refuses a second in-flight request in the same workspace', async () => {
    const first = start();

    const second = start();
    await second.done;

    expect(second.reply().payload).toMatchObject({
      ok: false,
      outcome: 'skipped',
      summary: '이미 실행 중'
    });
    expect(fake_spawn).toHaveBeenCalledTimes(1);
    close();
    await first.done;
  });

  test('refuses a stale observation clock before spawning', async () => {
    const request = start({ since: 122 });

    await request.done;

    expect(request.reply().payload).toMatchObject({
      ok: false,
      outcome: 'skipped'
    });
    expect(fake_spawn).not.toHaveBeenCalled();
    expect(refresh).not.toHaveBeenCalled();
  });

  test.each([
    { root_dir: '' },
    { root_dir: '/unregistered' },
    { since: '123' },
    { watch_id: '' }
  ])('refuses invalid payload %j', async (patch) => {
    const request = start(patch);

    await request.done;

    expect(request.reply().error.code).toBe('bad_request');
    expect(fake_spawn).not.toHaveBeenCalled();
  });

  test('allows normal execution past 120 seconds and below 360 seconds', async () => {
    const request = start();

    await vi.advanceTimersByTimeAsync(359_999);
    expect(request.socket.send).not.toHaveBeenCalled();
    close();
    await request.done;

    expect(request.reply().payload.outcome).toBe('still_waiting');
    expect(child.kill).not.toHaveBeenCalled();
  });

  test('replies running at 360 seconds and retains the process lock until exit', async () => {
    const request = start();

    await vi.advanceTimersByTimeAsync(360_000);
    await request.done;
    const second = start();
    await second.done;

    expect(request.reply().payload.outcome).toBe('running');
    expect(second.reply().payload.outcome).toBe('skipped');
    expect(child.kill).not.toHaveBeenCalled();
    expect(refresh).not.toHaveBeenCalled();
    fanout.mockClear();
    close();
    await vi.advanceTimersByTimeAsync(0);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fanout).toHaveBeenCalledTimes(1);
    expect(request.socket.send).toHaveBeenCalledTimes(1);
    const third = start({ since: 124 });
    close();
    await third.done;
    expect(
      fake_spawn.mock.calls.filter(
        ([command]) => command === 'bead-job-monitor'
      )
    ).toHaveLength(2);
  });

  test('refreshes judgment and fans out once after completion', async () => {
    next_stage = 'complete';
    const request = start();

    close(1);
    await request.done;

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fanout).toHaveBeenCalledExactlyOnceWith(WS);
    expect(request.reply().payload.queue.external_waits[0].stage).toBe(
      'complete'
    );
  });

  test('records each click on the original issue with a distinct event identity', async () => {
    const record = vi.spyOn(
      getWorkerRuntime().queueStore,
      'recordTimelineEvent'
    );
    const first = start();

    close();
    await first.done;
    const second = start({ since: 124 });
    close();
    await second.done;

    expect(record).toHaveBeenCalledTimes(2);
    expect(record).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({
        bead_id: 'A-original',
        kind: 'user_action',
        summary: '[지금 확인] 클릭'
      })
    );
    expect(record.mock.calls[0][1].seq).not.toBe(record.mock.calls[1][1].seq);
  });
});
