import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createExternalWaitObserver } from './observer.js';
import { createExternalWaitStore } from './store.js';

let workspace = '';
let time = 0;
let sequence = 0;
let store = createExternalWaitStore();

/**
 * @param {Partial<import('./store.js').WaitInput>} [overrides]
 */
function insert(overrides = {}) {
  const log_path = path.join(workspace, `log-${sequence}`);
  fs.writeFileSync(log_path, 'rc=0\n');
  return store.insert(workspace, {
    root_dir: workspace,
    bead_id: `UI-${sequence}`,
    owner: { kind: 'worker', attempt_id: 'attempt-1' },
    worktree: workspace,
    execution_sha: 'a'.repeat(40),
    jobs: [
      {
        adapter: 'process',
        pid: 1234,
        process_start: 'same',
        submitted_at: new Date(time).toISOString(),
        workdir: workspace,
        log_path,
        expected: []
      }
    ],
    ...overrides
  });
}

beforeEach(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-observer-'));
  time = Date.parse('2026-09-21T00:00:00Z');
  sequence = 0;
  store = createExternalWaitStore({
    filePathFor: (root) => path.join(root, 'external-wait.json'),
    now: () => time,
    makeId: () => `w-${(++sequence).toString(16).padStart(12, '0')}`
  });
});

afterEach(() => {
  vi.useRealTimers();
});

test.each(['hold', 'detached'])(
  'persists completion before advancing %s',
  async (stage) => {
    const record = insert({
      stage: /** @type {import('./store.js').Stage} */ (stage)
    });
    /** @type {import('./store.js').WaitRecord[]} */
    const changes = [];
    const onCompletion = vi.fn();
    const observer = createExternalWaitObserver({
      store,
      listWorkspaces: () => [workspace],
      run: async () => ({ code: 1, stdout: '', stderr: '' }),
      now: () => time,
      onRecordChanged: (root, next) => {
        expect(store.get(root, next.wait_id)).toEqual(next);
        changes.push(next);
      },
      onCompletion
    });

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(changes.map((next) => [next.stage, !!next.completion])).toEqual([
      [stage, true],
      [stage === 'hold' ? 'done' : 'completing', true]
    ]);
    expect(result?.completion).toMatchObject({
      digest: expect.stringMatching(/^[a-f0-9]{64}$/),
      recovery_needed: false
    });
    expect(onCompletion).toHaveBeenCalledTimes(stage === 'hold' ? 0 : 1);
  }
);

test('resumes a persisted completion without probing after restart', async () => {
  const record = insert({ stage: 'detached' });
  store.update(workspace, record.wait_id, (next) => {
    next.jobs[0].terminal = {
      exit_code: 0,
      evidence: 'rc_line',
      expected_results: [],
      recovery_needed: false,
      completed_at: new Date(time).toISOString()
    };
    next.completion = {
      digest: 'a'.repeat(64),
      completed_at: new Date(time).toISOString(),
      recovery_needed: false
    };
  });
  const run = vi.fn();
  const onCompletion = vi.fn();
  const observer = createExternalWaitObserver({
    store: createExternalWaitStore({
      filePathFor: (root) => path.join(root, 'external-wait.json')
    }),
    listWorkspaces: () => [workspace],
    run,
    now: () => time,
    onCompletion
  });

  await observer.tick();
  await observer.tick();

  expect(run).not.toHaveBeenCalled();
  expect(onCompletion).toHaveBeenCalledTimes(1);
  expect(store.get(workspace, record.wait_id)?.stage).toBe('completing');
});

test.each(['rc=0\n', 'working\n'])(
  'gate-r1 #5 persists initial process identity and detects PID reuse with log %s',
  async (contents) => {
    const record = insert();
    store.update(workspace, record.wait_id, (current) => {
      if (current.jobs[0].adapter === 'process') {
        delete current.jobs[0].process_start;
      }
    });
    fs.writeFileSync(record.jobs[0].log_path, contents);
    const run = vi
      .fn()
      .mockResolvedValueOnce({ code: 0, stdout: 'first\n', stderr: '' })
      .mockResolvedValue({ code: 0, stdout: 'reused\n', stderr: '' });
    const observer = createExternalWaitObserver({
      store,
      listWorkspaces: () => [workspace],
      run,
      now: () => time
    });
    await observer.observeRecord(workspace, record.wait_id);
    const restored = createExternalWaitStore({
      filePathFor: (root) => path.join(root, 'external-wait.json')
    });
    expect(restored.get(workspace, record.wait_id)?.jobs[0]).toMatchObject({
      process_start: 'first',
      state: 'RUNNING'
    });
    const restarted = createExternalWaitObserver({
      store: restored,
      listWorkspaces: () => [workspace],
      run,
      now: () => time
    });

    await restarted.observeRecord(workspace, record.wait_id);

    expect(restored.get(workspace, record.wait_id)).toMatchObject({
      stage: 'done',
      jobs: [
        {
          process_start: 'first',
          state: contents.startsWith('rc=') ? 'COMPLETED' : 'VANISHED'
        }
      ]
    });
  }
);

test('backs off errors at 60, 120, 300, 900 and caps at 900 seconds', async () => {
  const record = insert();
  const run = vi.fn(async () => ({
    code: 2,
    stdout: '',
    stderr: 'probe failed'
  }));
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run,
    now: () => time
  });
  /** @type {number[]} */
  const intervals = [];

  for (let count = 0; count < 5; count += 1) {
    const result = await observer.observeRecord(workspace, record.wait_id);
    if (!result) {
      throw new Error('missing record');
    }
    intervals.push((Date.parse(result.next_observation_at) - time) / 1000);
    expect(result.error_count).toBe(count + 1);
  }

  expect(intervals).toEqual([60, 120, 300, 900, 900]);
  expect(store.get(workspace, record.wait_id)?.last_error).toBe(
    'process probe failed'
  );
});

test('resets errors and uses the process interval after a successful observation', async () => {
  const record = insert({ error_count: 4, last_error: 'old error' });
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run: async () => ({ code: 0, stdout: 'same', stderr: '' }),
    now: () => time
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result).toMatchObject({
    error_count: 0,
    last_error: null,
    completion: null
  });
  expect(Date.parse(result?.next_observation_at || '') - time).toBe(30000);
  expect(result?.jobs[0]).toMatchObject({
    state: 'RUNNING',
    observed_at: new Date(time).toISOString(),
    terminal: null
  });
});

test('observes due records sequentially in oldest order and isolates errors', async () => {
  const later = insert({
    next_observation_at: new Date(time - 1000).toISOString()
  });
  const older = insert({
    next_observation_at: new Date(time - 2000).toISOString()
  });
  const future = insert({
    next_observation_at: new Date(time + 1000).toISOString()
  });
  store.update(workspace, older.wait_id, (next) => {
    next.jobs[0] = {
      ...next.jobs[0],
      adapter: 'process',
      pid: 2222,
      workdir: workspace
    };
  });
  /** @type {string[]} */
  const calls = [];
  let concurrent = 0;
  /** @type {import('./store.js').Run} */
  const run = async (argv) => {
    concurrent += 1;
    expect(concurrent).toBe(1);
    calls.push(argv[4]);
    await Promise.resolve();
    concurrent -= 1;
    return { code: argv[4] === '2222' ? 2 : 1, stdout: '', stderr: '' };
  };
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run,
    now: () => time
  });

  await observer.tick();

  expect(calls).toEqual(['2222', '1234']);
  expect(store.get(workspace, older.wait_id)?.error_count).toBe(1);
  expect(store.get(workspace, later.wait_id)?.stage).toBe('done');
  expect(store.get(workspace, future.wait_id)?.stage).toBe('hold');
});

test('keeps observing other jobs when one job fails', async () => {
  const record = insert();
  store.update(workspace, record.wait_id, (next) => {
    next.jobs.push({
      .../** @type {import('./store.js').ProcessJob} */ (next.jobs[0]),
      pid: 2222
    });
  });
  /** @type {import('./store.js').Run} */
  const run = async (argv) => ({
    code: argv[4] === '1234' ? 2 : 1,
    stdout: '',
    stderr: ''
  });
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run,
    now: () => time
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result?.jobs[0].terminal).toBeNull();
  expect(result?.jobs[1].terminal?.exit_code).toBe(0);
  expect(result?.completion).toBeNull();
  expect(result?.error_count).toBe(1);
});

test('uses the shortest interval among remaining adapters', async () => {
  const record = insert();
  store.update(workspace, record.wait_id, (next) => {
    next.jobs.push({
      adapter: 'slurm',
      ssh_host: 'cluster',
      job_id: '123',
      submitted_at: new Date(time).toISOString(),
      log_path: '/log',
      expected: ['/result']
    });
  });
  /** @type {import('./store.js').Run} */
  const run = async (argv) => ({
    code: 0,
    stdout:
      argv[0] === 'ssh'
        ? 'RUNNING\n__EWM_SQUEUE_RC__=0\nJobId=123 JobState=RUNNING TimeLimit=00:30:00 RunTime=00:20:00\n__EWM_SCONTROL_RC__=0\n\n__EWM_LOG_RC__=0\n'
        : 'same',
    stderr: ''
  });
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run,
    now: () => time
  });

  const mixed = await observer.observeRecord(workspace, record.wait_id);
  store.update(workspace, record.wait_id, (next) => {
    next.jobs.shift();
  });
  const slurm = await observer.observeRecord(workspace, record.wait_id);

  expect(Date.parse(mixed?.next_observation_at || '') - time).toBe(30000);
  expect(Date.parse(slurm?.next_observation_at || '') - time).toBe(120000);
});

test('keeps a stop made during an outstanding probe', async () => {
  const record = insert();
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    now: () => time,
    run: async () => {
      store.update(workspace, record.wait_id, (next) => {
        next.stage = 'stopped';
      });
      return { code: 1, stdout: '', stderr: '' };
    }
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result?.stage).toBe('stopped');
  expect(result?.completion).toBeNull();
});

test('coalesces overlapping manual observations', async () => {
  const record = insert();
  const run = vi.fn(async () => ({ code: 0, stdout: 'same', stderr: '' }));
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    now: () => time,
    run
  });

  const first = observer.observeRecord(workspace, record.wait_id);
  const second = observer.observeRecord(workspace, record.wait_id);
  await Promise.all([first, second]);

  expect(first).toBe(second);
  expect(run).toHaveBeenCalledTimes(1);
});

test('polls without clients and stops its unreferenced interval', async () => {
  vi.useFakeTimers();
  insert();
  const run = vi.fn(async () => ({ code: 0, stdout: 'same', stderr: '' }));
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    now: () => time,
    run,
    interval_ms: 100
  });

  observer.start();
  observer.start();
  await vi.advanceTimersByTimeAsync(100);
  observer.stop();
  time += 30000;
  await vi.advanceTimersByTimeAsync(1000);

  expect(run).toHaveBeenCalledTimes(1);
  expect(vi.getTimerCount()).toBe(0);
});

test('keeps callback failure separate from observation success', async () => {
  const record = insert({ stage: 'detached' });
  const log = vi.fn();
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    now: () => time,
    run: async () => ({ code: 1, stdout: '', stderr: '' }),
    onCompletion: () => {
      throw new Error('callback failed');
    },
    log
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result).toMatchObject({
    stage: 'completing',
    error_count: 0,
    last_error: null
  });
  expect(log).toHaveBeenCalledWith('External wait callback failed');
});
