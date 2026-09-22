import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as directionInquiry from './direction-inquiry.js';
import * as resolveSession from './resolve-session.js';
import {
  __resetWorkerRuntimeForTest,
  __setExternalWaitRunForTest,
  createWorkerRuntime as buildWorkerRuntime,
  getWorkerRuntime
} from './runtime.js';
import { sessionLogPath, workspaceStateDir } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
const metadata = vi.hoisted(() => ({
  setMetadata: vi.fn(),
  unsetMetadata: vi.fn(),
  readMetadata: vi.fn()
}));
vi.mock('./bd-metadata.js', () => ({ createBdMetadata: () => metadata }));
/** @type {ReturnType<typeof buildWorkerRuntime>[]} */
const runtimes = [];

function createWorkerRuntime() {
  const runtime = buildWorkerRuntime();
  runtimes.push(runtime);
  return runtime;
}
/** @type {string} */
let tmp_state;

beforeEach(() => {
  vi.resetAllMocks();
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-rt-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  for (const runtime of runtimes.splice(0)) {
    runtime.externalWaitObserver.stop();
  }
  __resetWorkerRuntimeForTest();
  vi.restoreAllMocks();
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/** @returns {import('./external-wait/store.js').WaitInput} */
function externalWaitInput() {
  return {
    root_dir: WS,
    bead_id: 'UI-wait',
    owner: { kind: 'worker', attempt_id: 'prior' },
    worktree: WS,
    execution_sha: 'a'.repeat(40),
    jobs: [],
    budget: { turns_total: 3, turns_used: 3 }
  };
}

test('shares the current runner resolver between inquiry and resolve launchers', () => {
  const inquiry = vi.spyOn(directionInquiry, 'createDirectionInquiry');
  const resolve = vi.spyOn(resolveSession, 'createResolveSession');
  const runtime = createWorkerRuntime();
  const resolveForDispatch = vi
    .spyOn(runtime.execPresetCoordinator, 'resolveForDispatch')
    .mockReturnValue(
      /** @type {any} */ ({ ok: true, exec: { runner: 'codex' } })
    );
  const bead = { id: 'UI-fresh' };
  const inquiry_runner = inquiry.mock.calls[0][0].currentRunner;
  const resolve_runner = resolve.mock.calls[0][0].currentRunner;

  const runner = inquiry_runner?.(WS, bead);

  expect(inquiry_runner).toBe(resolve_runner);
  expect(runner).toBe('codex');
  expect(resolveForDispatch).toHaveBeenCalledExactlyOnceWith(WS, bead);
});

test('writes the external wait metadata and confirms it before replying', async () => {
  const runtime = createWorkerRuntime();
  const record = runtime.externalWaitStore.insert(WS, externalWaitInput());
  metadata.readMetadata.mockResolvedValue(record.wait_id);

  const result = await runtime.externalWait.hold(WS, record.wait_id);

  expect(result).toMatchObject({ state: 'detached' });
  expect(metadata.setMetadata).toHaveBeenCalledExactlyOnceWith(
    'UI-wait',
    'external_wait',
    record.wait_id
  );
  expect(metadata.readMetadata).toHaveBeenCalledExactlyOnceWith(
    'UI-wait',
    'external_wait'
  );
  expect(metadata.setMetadata.mock.invocationCallOrder[0]).toBeLessThan(
    metadata.readMetadata.mock.invocationCallOrder[0]
  );
});

test('rejects a mismatched metadata set readback', async () => {
  const runtime = createWorkerRuntime();
  const record = runtime.externalWaitStore.insert(WS, externalWaitInput());
  metadata.readMetadata.mockResolvedValue(null);

  const result = await runtime.externalWait.hold(WS, record.wait_id);

  expect(result).toMatchObject({ status: 500, error: 'bead_write_failed' });
  expect(runtime.externalWaitStore.get(WS, record.wait_id)).toMatchObject({
    stage: 'detached'
  });
});

test('clears a matching orphan key without a wait record', async () => {
  const runtime = createWorkerRuntime();
  metadata.readMetadata
    .mockResolvedValueOnce('w-0123456789ab')
    .mockResolvedValueOnce(null);

  const result = await runtime.externalWait.stop(
    WS,
    'w-0123456789ab',
    'UI-wait'
  );

  expect(result).toMatchObject({
    ok: true,
    stage: 'stopped',
    bead_id: 'UI-wait'
  });
  expect(metadata.unsetMetadata).toHaveBeenCalledExactlyOnceWith(
    'UI-wait',
    'external_wait'
  );
});

test('preserves an orphan key that changed after the card was drawn', async () => {
  const runtime = createWorkerRuntime();
  metadata.readMetadata.mockResolvedValue('w-ffffffffffff');

  const result = await runtime.externalWait.stop(
    WS,
    'w-0123456789ab',
    'UI-wait'
  );

  expect(result).toMatchObject({ status: 409, error: 'wait_changed' });
  expect(metadata.unsetMetadata).not.toHaveBeenCalled();
});

test('rejects a metadata unset whose readback still contains the key', async () => {
  const runtime = createWorkerRuntime();
  const record = runtime.externalWaitStore.insert(WS, externalWaitInput());
  metadata.readMetadata.mockResolvedValue(record.wait_id);

  const result = await runtime.externalWait.stop(WS, record.wait_id);

  expect(result).toMatchObject({ status: 500, error: 'bead_write_failed' });
  expect(runtime.externalWaitStore.get(WS, record.wait_id)).toMatchObject({
    stage: 'stopped'
  });
});

test('accepts an already absent metadata key only after a successful readback', async () => {
  const runtime = createWorkerRuntime();
  const record = runtime.externalWaitStore.insert(WS, externalWaitInput());
  metadata.unsetMetadata.mockRejectedValue(new Error('key absent'));
  metadata.readMetadata.mockResolvedValue(null);

  const result = await runtime.externalWait.stop(WS, record.wait_id);

  expect(result).toMatchObject({ stage: 'stopped' });
  expect(metadata.readMetadata).toHaveBeenCalledExactlyOnceWith(
    'UI-wait',
    'external_wait'
  );
});

test('reports an unavailable metadata readback after an unset failure', async () => {
  const runtime = createWorkerRuntime();
  const record = runtime.externalWaitStore.insert(WS, externalWaitInput());
  metadata.unsetMetadata.mockRejectedValue(new Error('write unavailable'));
  metadata.readMetadata.mockRejectedValue(new Error('read unavailable'));

  const result = await runtime.externalWait.stop(WS, record.wait_id);

  expect(result).toMatchObject({ status: 500, error: 'bead_write_failed' });
});

test('swaps completion and resume hooks on the existing runtime instances', async () => {
  const runtime = createWorkerRuntime();
  const oldCompletion = vi.fn();
  const onCompletion = vi.fn();
  const onRecordChanged = vi.fn();
  const resume = vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    attempt_id: 'next'
  }));
  const original_service = runtime.externalWait;
  runtime.setExternalWaitHooks({ onCompletion: oldCompletion });
  runtime.setExternalWaitHooks({ onCompletion, onRecordChanged, resume });
  const record = runtime.externalWaitStore.insert(WS, {
    ...externalWaitInput(),
    stage: 'detached',
    owner: {
      kind: 'session',
      session_ref: 'codex:test',
      session_pid: 123,
      session_start: 'start'
    }
  });

  await runtime.externalWait.check(WS, record.wait_id);
  const result = await runtime.externalWait.resume(WS, record.wait_id, 'fork');

  expect(runtime.externalWait).toBe(original_service);
  expect(oldCompletion).not.toHaveBeenCalled();
  expect(onCompletion).toHaveBeenCalledExactlyOnceWith(
    WS,
    expect.objectContaining({ stage: 'completing' })
  );
  expect(result).toEqual({ ok: true, attempt_id: 'next' });
  expect(onRecordChanged).toHaveBeenLastCalledWith(
    WS,
    expect.objectContaining({ stage: 'completing' })
  );
  onRecordChanged.mockClear();
  metadata.readMetadata.mockResolvedValue(null);
  await runtime.externalWait.stop(WS, record.wait_id);
  expect(onRecordChanged).toHaveBeenCalledExactlyOnceWith(
    WS,
    expect.objectContaining({ stage: 'stopped' })
  );
});

test('starts the observer interval and stops it on singleton reset', () => {
  const interval = vi.spyOn(globalThis, 'setInterval');
  const clear = vi.spyOn(globalThis, 'clearInterval');

  getWorkerRuntime();
  const timer = interval.mock.results[0].value;
  __resetWorkerRuntimeForTest();

  expect(interval).toHaveBeenCalledWith(expect.any(Function), 15000);
  expect(clear).toHaveBeenCalledWith(timer);
});

test('passes observation argv and timeout through the test runner seam', async () => {
  const run = vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }));
  __setExternalWaitRunForTest(run);
  const runtime = createWorkerRuntime();
  const log_path = path.join(tmp_state, 'process.log');
  fs.writeFileSync(log_path, 'rc=0\n');
  const record = runtime.externalWaitStore.insert(WS, {
    ...externalWaitInput(),
    jobs: [
      {
        adapter: 'process',
        pid: 123,
        submitted_at: '2026-09-21T00:00:00.000Z',
        workdir: WS,
        log_path
      }
    ]
  });

  const result = await runtime.externalWait.check(WS, record.wait_id);

  expect(result).toMatchObject({ stage: 'done' });
  expect(run).toHaveBeenCalledExactlyOnceWith(
    ['env', 'LC_ALL=C', 'ps', '-p', '123', '-o', 'lstart='],
    { timeout_ms: 5000 }
  );
});

describe('worker/runtime status', () => {
  test('reports auto_advance and running_count', () => {
    const rt = createWorkerRuntime();

    rt.queueStore.setAutoAdvance(WS, true);
    rt.setRunningCountProvider(() => 2);

    expect(rt.status(WS)).toEqual({
      auto_advance: true,
      running_count: 2,
      auto_merge: false,
      manual_merge_continuation: {
        schema_version: 2
      }
    });
  });

  test('omits the retired breaker_tripped field', () => {
    const rt = createWorkerRuntime();

    const status = rt.status(WS);

    expect(status).toEqual({
      auto_advance: false,
      running_count: 0,
      auto_merge: false,
      manual_merge_continuation: {
        schema_version: 2
      }
    });
    expect('breaker_tripped' in status).toBe(false);
  });

  test('reads auto_merge from the actual queue store, independent of the capability', () => {
    const rt = createWorkerRuntime();
    rt.queueStore.toggleAutoMerge(WS, {
      expected_revision: rt.queueStore.snapshot(WS).revision,
      on: true
    });

    const status = rt.status(WS);

    expect(status.auto_merge).toBe(true);
    expect(status.manual_merge_continuation).toEqual({
      schema_version: 2
    });
  });

  test('exposes no breaker or token registry', () => {
    const rt = createWorkerRuntime();

    expect(/** @type {any} */ (rt).breaker).toBeUndefined();
    expect(/** @type {any} */ (rt).tokens).toBeUndefined();
    expect(/** @type {any} */ (rt).mergeLock).toBeUndefined();
  });
});

describe('worker/runtime session-log → title-cache wiring (UI-eey2 §9.2)', () => {
  test('expires a bead when the session log sees its bd write complete', () => {
    const rt = createWorkerRuntime();
    const expire = vi.spyOn(rt.titleCache, 'expire');

    rt.sessionLog.publish(WS, 'attempt-1', {
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'bd update UI-1 --set-metadata route=full_plan',
        exit_code: 0
      }
    });

    expect(expire).toHaveBeenCalledWith(WS, 'UI-1');
  });

  test('leaves the cache alone for a bd read', () => {
    const rt = createWorkerRuntime();
    const expire = vi.spyOn(rt.titleCache, 'expire');

    rt.sessionLog.publish(WS, 'attempt-1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd show UI-1 --json' }
    });

    expect(expire).not.toHaveBeenCalled();
  });
});

describe('worker/runtime session-log attempt paths (UI-d7fy §5.5)', () => {
  /**
   * @param {any} rt
   * @param {Record<string, any>} patch
   */
  function recordHeadReview(rt, patch) {
    rt.queueStore.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review:authority-1:aaa',
      patch: { bead_id: 'UI-1', kind: 'review_session', ...patch }
    });
  }

  test('reads a review session attempt from the log its record names', () => {
    const rt = createWorkerRuntime();
    const recorded = path.join(
      workspaceStateDir(WS),
      'review-sessions',
      'review_authority-1_aaa.log.jsonl'
    );
    fs.mkdirSync(path.dirname(recorded), { recursive: true });
    fs.writeFileSync(recorded, `${JSON.stringify({ type: 'assistant' })}\n`);
    recordHeadReview(rt, { log_path: recorded, status: 'done' });

    const lines = rt.sessionLog.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([{ type: 'assistant' }]);
  });

  test('ignores a recorded log path outside the workspace state dir', () => {
    const rt = createWorkerRuntime();
    const outside = path.join(tmp_state, 'elsewhere.log.jsonl');
    fs.writeFileSync(outside, `${JSON.stringify({ type: 'assistant' })}\n`);
    recordHeadReview(rt, { log_path: outside, status: 'done' });

    const lines = rt.sessionLog.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([]);
  });

  test('refuses a symlink inside the state dir that points outside it', () => {
    const rt = createWorkerRuntime();
    const outside = path.join(tmp_state, 'secret.log.jsonl');
    fs.writeFileSync(outside, `${JSON.stringify({ type: 'assistant' })}\n`);
    const link = path.join(
      workspaceStateDir(WS),
      'review-sessions',
      'review_authority-1_aaa.log.jsonl'
    );
    fs.mkdirSync(path.dirname(link), { recursive: true });
    fs.symlinkSync(outside, link);
    recordHeadReview(rt, { log_path: link, status: 'done' });

    const lines = rt.sessionLog.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([]);
  });

  test('refuses a path that escapes through a linked parent directory', () => {
    const rt = createWorkerRuntime();
    const outside_dir = path.join(tmp_state, 'outside-logs');
    fs.mkdirSync(outside_dir, { recursive: true });
    fs.writeFileSync(
      path.join(outside_dir, 'review.log.jsonl'),
      `${JSON.stringify({ type: 'assistant' })}\n`
    );
    const linked_dir = path.join(workspaceStateDir(WS), 'linked-attempts');
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.symlinkSync(outside_dir, linked_dir);
    recordHeadReview(rt, {
      log_path: path.join(linked_dir, 'review.log.jsonl'),
      status: 'done'
    });

    const lines = rt.sessionLog.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([]);
  });

  test('keeps an implementation attempt on the session log path', () => {
    const rt = createWorkerRuntime();
    rt.queueStore.appendAttempt(WS, {
      expected_revision: rt.queueStore.snapshot(WS).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    const legacy = sessionLogPath(WS, 'att-1');
    fs.mkdirSync(path.dirname(legacy), { recursive: true });
    fs.writeFileSync(legacy, `${JSON.stringify({ type: 'result' })}\n`);

    const lines = rt.sessionLog.read(WS, 'att-1');

    expect(lines).toEqual([{ type: 'result' }]);
  });

  test('returns an empty snapshot for an attempt with no log at all', () => {
    const rt = createWorkerRuntime();
    recordHeadReview(rt, { log_path: null, status: 'running' });

    const lines = rt.sessionLog.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([]);
  });
});
