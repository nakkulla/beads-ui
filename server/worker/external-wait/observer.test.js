import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetTimingSettingsForTest,
  __setTimingOverridesForTest
} from '../../timing-settings.js';
import { createExternalWaitObserver, mergeSpawned } from './observer.js';
import { createExternalWaitStore } from './store.js';
import { TAKEOVER_SETTLE_MS } from './takeover.js';

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
  __resetTimingSettingsForTest();
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

test('schedules the next observation at the overridden intervals', async () => {
  __setTimingOverridesForTest({
    external_wait_process_interval_seconds: 45,
    external_wait_slurm_interval_seconds: 240
  });
  const record = insert();
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run: async () => ({ code: 0, stdout: 'same', stderr: '' }),
    now: () => time
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(Date.parse(result?.next_observation_at || '') - time).toBe(45000);
});

test('keeps the error backoff at the contract copy when intervals are overridden', async () => {
  __setTimingOverridesForTest({
    external_wait_process_interval_seconds: 45,
    external_wait_slurm_interval_seconds: 240
  });
  const record = insert();
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run: async () => ({ code: 2, stdout: '', stderr: 'probe failed' }),
    now: () => time
  });

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(Date.parse(result?.next_observation_at || '') - time).toBe(60000);
});

test('keeps a recorded next_observation_at when the setting changes later', async () => {
  const record = insert();
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run: async () => ({ code: 0, stdout: 'same', stderr: '' }),
    now: () => time
  });
  const result = await observer.observeRecord(workspace, record.wait_id);
  const recorded = result?.next_observation_at;

  __setTimingOverridesForTest({ external_wait_process_interval_seconds: 900 });

  expect(store.get(workspace, record.wait_id)?.next_observation_at).toBe(
    recorded
  );
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

/**
 * One slurm wait record (UI-q15q).
 *
 * @param {Array<Partial<import('./store.js').SlurmJob>>} [jobs]
 */
function insertSlurm(jobs = [{}]) {
  return store.insert(workspace, {
    root_dir: workspace,
    bead_id: `UI-${sequence}`,
    owner: { kind: 'worker', attempt_id: 'attempt-1' },
    worktree: workspace,
    execution_sha: 'a'.repeat(40),
    stage: 'detached',
    jobs: jobs.map((job) => ({
      adapter: /** @type {const} */ ('slurm'),
      ssh_host: 'cluster',
      job_id: '123',
      submitted_at: new Date(time).toISOString(),
      log_path: '/log',
      expected: ['/result'],
      ...job
    }))
  });
}

/**
 * A remote observation of a registered job plus its sub-job section.
 *
 * @param {{rows?: string[], comp?: string, counts?: string, uq_rc?: number, terminal?: boolean}} [options]
 */
function slurmStdout({
  rows = [],
  comp = 'filetxt',
  counts = '0|0|0|0',
  uq_rc = 0,
  terminal = false
} = {}) {
  return [
    terminal ? '' : 'RUNNING',
    '__EWM_SQUEUE_RC__=0',
    terminal
      ? 'JobId=123 JobName=snake__20260921_090000_ab12 JobState=COMPLETED ExitCode=0:0'
      : 'JobId=123 JobName=snake__20260921_090000_ab12 JobState=RUNNING TimeLimit=00:30:00 RunTime=00:20:00',
    '__EWM_SCONTROL_RC__=0',
    '',
    '__EWM_LOG_RC__=0',
    '__EWM_ARTIFACT__0=1|1|1',
    '__EWM_SPAWN_BEGIN__',
    '__EWM_SPAWN_USER__=alice',
    '__EWM_SPAWN_WORKDIR__=/work',
    '__EWM_SPAWN_START__=2026-09-21T09:00:00',
    `__EWM_SPAWN_UQ_RC__=${uq_rc}`,
    `__EWM_SPAWN_COMP__=${comp}`,
    ...rows,
    `__EWM_SPAWN_COUNTS__=${counts}`,
    '__EWM_SPAWN_NOW__=2026-09-21T10:00:00',
    '__EWM_SPAWN_END__',
    ''
  ].join('\n');
}

const RUNNING_ROW =
  '__EWM_SPAWN_ROW__=Q|201|run-a|rule_align|RUNNING|2026-09-21T09:10:00|2026-09-21T09:11:00|N/A|10:00|1:00:00|4|16G||/work';
const COMPLETED_ROW =
  '__EWM_SPAWN_DONE__=2026-09-21T09:30:00|C|201|run-a||COMPLETED|2026-09-21T09:10:00|2026-09-21T09:11:00|2026-09-21T09:30:00||60|4|16G|0:0|/work';

/**
 * @param {string[]} outputs
 */
function sequenceObserver(outputs) {
  const run = vi.fn(
    /** @type {import('./store.js').Run} */ (
      async () => ({
        code: 0,
        stdout: outputs.shift() || '',
        stderr: ''
      })
    )
  );
  const observer = createExternalWaitObserver({
    store,
    listWorkspaces: () => [workspace],
    run,
    now: () => time
  });
  return { observer, run };
}

/**
 * @param {import('./store.js').Job|undefined} job
 */
function slurmOf(job) {
  if (job?.adapter !== 'slurm') {
    throw new Error('slurm job expected');
  }
  return job;
}

test('stores the name, anchor and sub-jobs on the registered slurm job', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0])).toMatchObject({
    name: 'snake__20260921_090000_ab12',
    anchor: {
      user: 'alice',
      workdir: '/work',
      started_at: '2026-09-21T09:00:00'
    },
    spawned: {
      total: 1,
      counts: { running: 1, pending: 0, completed: 0, failed: 0, unknown: 0 },
      omitted: 0,
      rows: [expect.objectContaining({ job_id: '201', state: 'RUNNING' })]
    }
  });
});

test('keeps a rule name seen in the queue once the completion row lacks it', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' }),
    slurmStdout({ rows: [COMPLETED_ROW], counts: '0|0|1|0' })
  ]);

  await observer.observeRecord(workspace, record.wait_id);
  time += 120000;
  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).spawned?.rows).toEqual([
    expect.objectContaining({
      job_id: '201',
      state: 'COMPLETED',
      rule: 'rule_align'
    })
  ]);
});

test('passes the previously nonterminal sub-job ids to the next read', async () => {
  const record = insertSlurm();
  const { observer, run } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' }),
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' })
  ]);

  await observer.observeRecord(workspace, record.wait_id);
  time += 120000;
  await observer.observeRecord(workspace, record.wait_id);

  expect(String(run.mock.calls[1]?.[0]?.[6])).toContain(
    "previous='\\''201'\\''"
  );
});

test('turns a vanished running sub-job unknown without a completion log', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' }),
    slurmStdout({ comp: 'unsupported' })
  ]);

  await observer.observeRecord(workspace, record.wait_id);
  time += 120000;
  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).spawned).toMatchObject({
    total: 1,
    counts: { running: 0, unknown: 1 },
    rows: [expect.objectContaining({ job_id: '201', state: 'UNKNOWN' })]
  });
});

test('drops a stored sub-job the read completion log no longer attributes', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' }),
    slurmStdout()
  ]);

  await observer.observeRecord(workspace, record.wait_id);
  time += 120000;
  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).spawned).toEqual({
    total: 0,
    counts: { running: 0, pending: 0, completed: 0, failed: 0, unknown: 0 },
    rows: [],
    omitted: 0
  });
});

test('leaves the stored sub-jobs unchanged when their material fails', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    slurmStdout({ rows: [RUNNING_ROW], counts: '1|0|0|0' }),
    slurmStdout({ uq_rc: 1 })
  ]);

  const first = await observer.observeRecord(workspace, record.wait_id);
  time += 120000;
  const second = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(second?.jobs[0]).spawned).toEqual(
    slurmOf(first?.jobs[0]).spawned
  );
});

test('keeps error count and backoff free of sub-job material failure', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([slurmStdout({ uq_rc: 1 })]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result).toMatchObject({ error_count: 0, last_error: null });
  expect(Date.parse(result?.next_observation_at || '') - time).toBe(120000);
});

test('bounds a registered job by the later-started sibling in the same place', async () => {
  const anchor = { user: 'alice', workdir: '/work' };
  const record = insertSlurm([
    { anchor: { ...anchor, started_at: '2026-09-21T09:00:00' } },
    {
      job_id: '124',
      anchor: { ...anchor, started_at: '2026-09-21T09:20:00' }
    }
  ]);
  const { observer, run } = sequenceObserver([slurmStdout(), slurmStdout()]);

  await observer.observeRecord(workspace, record.wait_id);

  const first = String(run.mock.calls[0]?.[0]?.[6]);
  expect(first).toContain("later='\\''2026-09-21T09:20:00'\\''");
  expect(first).toContain("exclude='\\''123 124'\\''");
});

test('passes the same-host registered siblings to the remote read', async () => {
  const record = insertSlurm([
    {},
    { job_id: '124' },
    { job_id: '125', ssh_host: 'other' }
  ]);
  const { observer, run } = sequenceObserver([
    slurmStdout(),
    slurmStdout(),
    slurmStdout()
  ]);

  await observer.observeRecord(workspace, record.wait_id);

  expect(String(run.mock.calls[0]?.[0]?.[6])).toContain(
    "siblings='\\''124'\\''"
  );
});

test('stops carrying a stored row submitted after a later sibling started', async () => {
  const anchor = { user: 'alice', workdir: '/work' };
  const record = insertSlurm([
    {
      anchor: { ...anchor, started_at: '2026-09-21T09:00:00' },
      spawned: {
        total: 2,
        counts: { running: 0, pending: 0, completed: 0, failed: 2, unknown: 0 },
        rows: [
          spawnedRow({ job_id: '201', state: 'FAILED', exit_code: 1 }),
          spawnedRow({
            job_id: '202',
            state: 'FAILED',
            exit_code: 1,
            submitted_at: '2026-09-21T09:25:00'
          })
        ],
        omitted: 0
      }
    },
    {
      job_id: '124',
      anchor: { ...anchor, started_at: '2026-09-21T09:20:00' }
    }
  ]);
  const { observer } = sequenceObserver([
    slurmStdout({ comp: 'unsupported' }),
    slurmStdout({ comp: 'unsupported' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).spawned).toMatchObject({
    total: 1,
    counts: { failed: 1 },
    rows: [expect.objectContaining({ job_id: '201' })]
  });
});

test('takes the final sub-job snapshot on the terminal observation and stops there', async () => {
  const record = insertSlurm();
  const { observer, run } = sequenceObserver([
    slurmStdout({ rows: [COMPLETED_ROW], counts: '0|0|1|0', terminal: true })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);
  await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).spawned?.counts.completed).toBe(1);
  expect(result?.completion).not.toBeNull();
  expect(run).toHaveBeenCalledTimes(1);
});

/**
 * One stored sub-job row.
 *
 * @param {Partial<import('./store.js').SpawnedRow>} patch
 * @returns {import('./store.js').SpawnedRow}
 */
function spawnedRow(patch) {
  return {
    job_id: '201',
    name: '',
    rule: '',
    state: 'COMPLETED',
    submitted_at: '2026-09-21T09:01:00',
    started_at: '2026-09-21T09:02:00',
    ended_at: '2026-09-21T09:30:00',
    elapsed_seconds: 60,
    time_limit_seconds: 3600,
    unlimited: false,
    cpus: 1,
    memory: '1G',
    exit_code: 0,
    ...patch
  };
}

/**
 * Completed rows ending one second apart from 09:10:00, ids from 1000.
 *
 * @param {number} length
 * @param {number} [first]
 */
function completedRows(length, first = 0) {
  return Array.from({ length }, (_, offset) => {
    const index = first + offset;
    return spawnedRow({
      job_id: String(1000 + index),
      ended_at: `2026-09-21T09:${String(10 + Math.floor(index / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}`
    });
  });
}

test('caps completed rows at 300 and counts the omitted rows', () => {
  const rows = completedRows(302);

  const spawned = mergeSpawned(undefined, {
    status: 'ok',
    completion_log: 'filetxt',
    counts: { running: 0, pending: 0, completed: 310, failed: 0 },
    rows
  });

  expect(spawned?.rows).toHaveLength(300);
  expect(spawned?.omitted).toBe(10);
  expect(spawned?.total).toBe(310);
  expect(spawned?.rows.map((row) => row.job_id)).not.toContain('1000');
});

/**
 * Queue-only material (no completion log) with the members beyond the cap.
 *
 * @param {number} completed
 * @param {import('./store.js').SpawnedRow[]} rows
 * @param {import('./store.js').SpawnedRow[]} [capped]
 * @returns {import('./adapters/slurm.js').SpawnedReading}
 */
function queueMaterial(completed, rows, capped = []) {
  return {
    status: 'ok',
    completion_log: 'unsupported',
    counts: { running: 0, pending: 0, completed, failed: 0 },
    rows,
    truncated: capped.map((row) => ({
      job_id: row.job_id,
      ended_at: row.ended_at || ''
    }))
  };
}

test('keeps every completed queue member counted on the first queue-only read', () => {
  const all = completedRows(301);

  const spawned = mergeSpawned(
    undefined,
    queueMaterial(301, all.slice(1), all.slice(0, 1))
  );

  expect(spawned).toMatchObject({
    total: 301,
    counts: { completed: 301 },
    omitted: 1
  });
  expect(spawned?.rows).toHaveLength(300);
});

test('counts an omitted row still in the queue once on the next queue-only read', () => {
  const all = completedRows(301);
  const material = queueMaterial(301, all.slice(1), all.slice(0, 1));
  const first = mergeSpawned(undefined, material);

  const second = mergeSpawned(first, material);

  expect(second).toMatchObject({
    total: 301,
    counts: { completed: 301 },
    omitted: 1
  });
});

test('counts stored rows the cap left in the queue once', () => {
  const all = completedRows(305);
  const first = mergeSpawned(undefined, queueMaterial(300, all.slice(0, 300)));

  const second = mergeSpawned(
    first,
    queueMaterial(305, all.slice(5), all.slice(0, 5))
  );

  expect(second).toMatchObject({
    total: 305,
    counts: { completed: 305 },
    omitted: 5
  });
});

test('keeps rows and omitted counts that left the queue', () => {
  const all = completedRows(301);
  const first = mergeSpawned(
    undefined,
    queueMaterial(301, all.slice(1), all.slice(0, 1))
  );

  const second = mergeSpawned(first, queueMaterial(200, all.slice(101)));

  expect(second).toMatchObject({
    total: 301,
    counts: { completed: 301 },
    omitted: 1
  });
  expect(second?.rows).toHaveLength(300);
});

const CAPACITY = {
  reason: 'Resources',
  est_start: '2026-10-08T13:38:00',
  partition: 'normal',
  ahead: { jobs: 3, cpus: 48 },
  slurm: {
    cpu_alloc: 108,
    cpu_total: 128,
    mem_alloc_mb: 513000,
    mem_total_mb: 1033000
  },
  host: { name: 'n1', cpus: 112, load1: 61.2, mem_available_mb: 2000 },
  observed_at: '2026-10-06T06:00:00.000Z'
};

/**
 * A remote observation of a registered job plus its capacity section.
 *
 * @param {{state?: string, capacity?: 'ok'|'failed'|'absent'}} [options]
 */
function capacityStdout({ state = 'PENDING', capacity = 'ok' } = {}) {
  const section =
    capacity === 'absent'
      ? []
      : [
          '',
          '__EWM_CAP_BEGIN__',
          ...(capacity === 'ok'
            ? [
                '__EWM_CAP_NOW__=2026-09-21T10:00:00',
                '__EWM_CAP_JOB__=Resources|2026-10-08T13:38:00|normal|1000|2026-10-06T10:00:00',
                '__EWM_CAP_AHEAD__=3|48',
                '__EWM_CAP_SLURM__=108|128|513000|1033000',
                '__EWM_CAP_HOST__=n1|112|61.2|2000',
                '__EWM_CAP_OK__=1'
              ]
            : ['__EWM_CAP_NOW__=2026-09-21T10:00:00', '__EWM_CAP_OK__=0']),
          '__EWM_CAP_END__'
        ];
  return [
    state,
    '__EWM_SQUEUE_RC__=0',
    `JobId=123 JobState=${state} TimeLimit=00:30:00 RunTime=00:00:00`,
    '__EWM_SCONTROL_RC__=0',
    '',
    '__EWM_LOG_RC__=0',
    '__EWM_ARTIFACT__0=1|1|1',
    '__EWM_SPAWN_BEGIN__',
    '__EWM_SPAWN__=none',
    '__EWM_SPAWN_END__',
    ...section,
    ''
  ].join('\n');
}

test('stores the pending capacity on the registered slurm job', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([capacityStdout()]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).capacity).toMatchObject({
    reason: 'Resources',
    ahead: { jobs: 3, cpus: 48 },
    host: { name: 'n1' }
  });
});

test('keeps the stored capacity when the capacity read fails', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    capacityStdout(),
    capacityStdout({ capacity: 'failed' })
  ]);
  const first = await observer.observeRecord(workspace, record.wait_id);
  time += 120000;

  const second = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(second?.jobs[0]).capacity).toEqual(
    slurmOf(first?.jobs[0]).capacity
  );
});

test('leaves the error accounting alone when the capacity read fails', async () => {
  const record = insertSlurm();
  const { observer } = sequenceObserver([
    capacityStdout({ capacity: 'failed' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(result).toMatchObject({ error_count: 0, last_error: null });
  expect(Date.parse(result?.next_observation_at || '') - time).toBe(120 * 1000);
});

test('keeps the stored capacity when a pending observation lacks the section', async () => {
  const record = insertSlurm([{ capacity: CAPACITY }]);
  const { observer } = sequenceObserver([
    capacityStdout({ capacity: 'absent' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).capacity).toEqual(CAPACITY);
});

test('clears the stored capacity once the job is running', async () => {
  const record = insertSlurm([{ capacity: CAPACITY }]);
  const { observer } = sequenceObserver([
    capacityStdout({ state: 'RUNNING', capacity: 'absent' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0])).not.toHaveProperty('capacity');
});

test('keeps the stored capacity when the observed state is unknown', async () => {
  const record = insertSlurm([{ capacity: CAPACITY }]);
  const { observer } = sequenceObserver([
    capacityStdout({ state: 'UNKNOWN', capacity: 'absent' })
  ]);

  const result = await observer.observeRecord(workspace, record.wait_id);

  expect(slurmOf(result?.jobs[0]).capacity).toEqual(CAPACITY);
});

describe('takeover marker and local run (UI-qbgj §3.4, §3.5)', () => {
  const START = 'Tue Oct  6 17:00:00 2026';
  const LOCAL = {
    ok: true,
    state: 'done',
    slurm_job_id: '123',
    local_id: 'L003',
    pid: 4242,
    process_start: START,
    host: 'cluster-node',
    workdir: '/work',
    log_path: '/home/u/.sjob/logs/run.log',
    exitcode_path: '/home/u/.sjob/local/L003.exitcode',
    cpus: 16,
    mem_gb: 64,
    slurm_overcommit: false,
    slurm_cancel_failed: false
  };
  const CANCELLED_OUTPUT =
    'CANCELLED\n__EWM_SQUEUE_RC__=0\nJobId=123 JobState=CANCELLED ExitCode=0:15\n__EWM_SCONTROL_RC__=0\n\n__EWM_LOG_RC__=1\n';

  /**
   * @param {'pending'|'unknown'} [state]
   * @param {number} [age_ms] - How long ago the takeover was requested.
   * @returns {import('./store.js').TakeoverMarker}
   */
  function marker(state = 'unknown', age_ms = 60000) {
    return {
      state,
      requested_at: new Date(time - age_ms).toISOString(),
      cpus: 16,
      mem_gb: 64
    };
  }

  /**
   * The remote output of a recovery read.
   *
   * @param {Record<string, unknown>} record - What `--result` prints.
   * @param {string} [queue] - `state|reason|priority`, empty when gone.
   */
  function recoveryStdout(record, queue = '') {
    return [
      '__EWM_TK_BEGIN__',
      JSON.stringify(record),
      '__EWM_TK_END__',
      '__EWM_Q_RC__=0',
      '__EWM_Q_BEGIN__',
      queue,
      '__EWM_Q_END__',
      ''
    ].join('\n');
  }

  /**
   * The remote output of a local-run observation.
   *
   * @param {{ps_rc?: string, ps?: string, exit_rc?: string, exit?: string}} [options]
   */
  function localStdout({
    ps_rc = '1',
    ps = '',
    exit_rc = '0',
    exit = '0'
  } = {}) {
    return [
      `__EWM_PS_RC__=${ps_rc}`,
      '__EWM_PS_BEGIN__',
      ps,
      '__EWM_PS_END__',
      `__EWM_EXIT_RC__=${exit_rc}`,
      '__EWM_EXIT_BEGIN__',
      exit,
      '__EWM_EXIT_END__',
      '__EWM_ARTIFACT__0=1|1|1',
      ''
    ].join('\n');
  }

  /** @returns {import('./store.js').SjobLocalJob} */
  function localJob() {
    return {
      adapter: 'sjob_local',
      ssh_host: 'cluster',
      local_id: 'L003',
      pid: 4242,
      process_start: START,
      workdir: '/work',
      log_path: '/home/u/.sjob/logs/run.log',
      exitcode_path: '/home/u/.sjob/local/L003.exitcode',
      submitted_at: new Date(time).toISOString(),
      expected: ['/result'],
      cpus: 16,
      mem_gb: 64,
      takeover_from: {
        job_id: '123',
        at: new Date(time).toISOString(),
        cancel_failed: false
      },
      state: 'UNKNOWN',
      observed_at: new Date(time).toISOString(),
      terminal: null
    };
  }

  /** @returns {import('./store.js').WaitRecord} */
  function insertLocal() {
    return store.insert(workspace, {
      root_dir: workspace,
      bead_id: `UI-${sequence}`,
      owner: { kind: 'worker', attempt_id: 'attempt-1' },
      worktree: workspace,
      execution_sha: 'a'.repeat(40),
      stage: 'detached',
      jobs: [localJob()]
    });
  }

  test('skips a record while an operation owns it', async () => {
    const record = insertSlurm([{ state: 'PENDING' }]);
    const { observer, run } = sequenceObserver([capacityStdout()]);
    /** @type {() => void} */
    let release = () => {};

    const owned = observer.withOperationLock(
      workspace,
      record.wait_id,
      () =>
        new Promise((resolve) => {
          release = () => resolve(undefined);
        })
    );
    await observer.tick();
    await observer.observeRecord(workspace, record.wait_id);
    release();
    await owned;

    expect(run).not.toHaveBeenCalled();
  });

  test('answers a second operation on an owned record with null', async () => {
    const record = insertSlurm([{ state: 'PENDING' }]);
    const { observer } = sequenceObserver([]);
    /** @type {() => void} */
    let release = () => {};
    const first = observer.withOperationLock(
      workspace,
      record.wait_id,
      () =>
        new Promise((resolve) => {
          release = () => resolve('first');
        })
    );

    const second = await observer.withOperationLock(
      workspace,
      record.wait_id,
      async () => 'second'
    );
    release();

    expect(second).toBeNull();
    expect(await first).toEqual({ value: 'first' });
  });

  test('keeps a job an operation replaced while the observation was in flight', async () => {
    const record = insertSlurm([{ state: 'PENDING' }]);
    /** @type {(value: {code:number, stdout:string, stderr:string}) => void} */
    let finish = () => {};
    const observer = createExternalWaitObserver({
      store,
      listWorkspaces: () => [workspace],
      run: () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
      now: () => time
    });

    const observation = observer.observeRecord(workspace, record.wait_id);
    await new Promise((resolve) => setImmediate(resolve));
    store.update(workspace, record.wait_id, (current) => {
      current.jobs[0] = localJob();
    });
    finish({ code: 0, stdout: capacityStdout(), stderr: '' });
    await observation;

    expect(store.get(workspace, record.wait_id)?.jobs[0]).toMatchObject({
      adapter: 'sjob_local',
      local_id: 'L003'
    });
  });

  test('replaces a marked job when recovery finds a started takeover', async () => {
    const record = insertSlurm([
      { state: 'PENDING', takeover: marker(), name: 'snake' }
    ]);
    const { observer, run } = sequenceObserver([
      recoveryStdout({ ...LOCAL, state: 'started', slurm_cancel_failed: true })
    ]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result?.jobs).toEqual([
      expect.objectContaining({
        adapter: 'sjob_local',
        ssh_host: 'cluster',
        local_id: 'L003',
        name: 'snake',
        submitted_at: marker().requested_at,
        takeover_from: {
          job_id: '123',
          at: marker().requested_at,
          cancel_failed: true
        }
      })
    ]);
    expect(result?.next_observation_at).toBe(new Date(time).toISOString());
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('keeps an unknown marker for no takeover on an unheld job inside the settle window', async () => {
    const record = insertSlurm([
      { state: 'PENDING', takeover: marker('pending') }
    ]);
    const { observer, run } = sequenceObserver([
      recoveryStdout(
        { ok: false, reason: 'no_takeover' },
        'PENDING|Resources|1000'
      ),
      CANCELLED_OUTPUT
    ]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result?.jobs[0]).toHaveProperty('takeover', marker('unknown'));
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('skips terminal recognition for no takeover inside the settle window', async () => {
    const record = insertSlurm([{ state: 'PENDING', takeover: marker() }]);
    const { observer } = sequenceObserver([
      recoveryStdout(
        { ok: false, reason: 'no_takeover' },
        'PENDING|Resources|1000'
      ),
      CANCELLED_OUTPUT
    ]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result).toMatchObject({
      stage: 'detached',
      completion: null,
      jobs: [{ state: 'PENDING', terminal: null }]
    });
  });

  test('clears the marker and observes normally after a settled no takeover on an unheld job', async () => {
    const record = insertSlurm([
      {
        state: 'PENDING',
        takeover: marker('unknown', TAKEOVER_SETTLE_MS)
      }
    ]);
    const { observer, run } = sequenceObserver([
      recoveryStdout(
        { ok: false, reason: 'no_takeover' },
        'PENDING|Resources|1000'
      ),
      capacityStdout()
    ]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result?.jobs[0]).not.toHaveProperty('takeover');
    expect(result?.jobs[0]).toMatchObject({
      adapter: 'slurm',
      state: 'PENDING'
    });
    expect(run).toHaveBeenCalledTimes(2);
  });

  test.each([
    [
      'a holding record',
      { ok: false, state: 'holding', slurm_job_id: '123' },
      'PENDING|JobHeldUser|0'
    ],
    [
      'a user hold',
      { ok: false, reason: 'no_takeover' },
      'PENDING|JobHeldUser|0'
    ],
    [
      'a zero priority',
      { ok: false, reason: 'no_takeover' },
      'PENDING|Resources|0'
    ],
    [
      'a cancelled job',
      { ok: false, reason: 'no_takeover' },
      'CANCELLED|None|0'
    ],
    ['a vanished job', { ok: false, reason: 'no_takeover' }, '']
  ])(
    'keeps the marker unknown for an unresolved %s',
    async (_label, saved, queue) => {
      const settled = marker('pending', TAKEOVER_SETTLE_MS);
      const record = insertSlurm([{ state: 'PENDING', takeover: settled }]);
      const { observer, run } = sequenceObserver([
        recoveryStdout(saved, queue),
        CANCELLED_OUTPUT
      ]);

      const result = await observer.observeRecord(workspace, record.wait_id);

      expect(result).toMatchObject({
        stage: 'detached',
        completion: null,
        error_count: 0,
        jobs: [
          {
            adapter: 'slurm',
            state: 'PENDING',
            terminal: null
          }
        ]
      });
      expect(result?.jobs[0]).toHaveProperty('takeover', {
        ...settled,
        state: 'unknown'
      });
      expect(run).toHaveBeenCalledTimes(1);
    }
  );

  test('never completes a record whose marked job the queue shows cancelled', async () => {
    const record = insertSlurm([{ state: 'PENDING', takeover: marker() }]);
    const observer = createExternalWaitObserver({
      store,
      listWorkspaces: () => [workspace],
      run: async (argv) => ({
        code: 0,
        stdout: argv[6].includes('--result')
          ? recoveryStdout(
              { ok: false, reason: 'no_takeover' },
              'CANCELLED|None|0'
            )
          : CANCELLED_OUTPUT,
        stderr: ''
      }),
      now: () => time
    });

    await observer.observeRecord(workspace, record.wait_id);
    await observer.observeRecord(workspace, record.wait_id);

    expect(store.get(workspace, record.wait_id)).toMatchObject({
      stage: 'detached',
      completion: null,
      jobs: [{ state: 'PENDING', terminal: null }]
    });
  });

  test('keeps the takeover marker across a store reload', () => {
    const record = insertSlurm([
      { state: 'PENDING', takeover: marker('pending') }
    ]);

    const reloaded = createExternalWaitStore({
      filePathFor: (root) => path.join(root, 'external-wait.json')
    });

    expect(reloaded.get(workspace, record.wait_id)?.jobs[0]).toMatchObject({
      takeover: marker('pending')
    });
  });

  test('recovers a pending marker that no live operation owns', async () => {
    const record = insertSlurm([
      { state: 'PENDING', takeover: marker('pending') }
    ]);
    const restarted = createExternalWaitObserver({
      store: createExternalWaitStore({
        filePathFor: (root) => path.join(root, 'external-wait.json')
      }),
      listWorkspaces: () => [workspace],
      run: async () => ({ code: 0, stdout: recoveryStdout(LOCAL), stderr: '' }),
      now: () => time
    });

    await restarted.tick();

    expect(store.get(workspace, record.wait_id)?.jobs[0]).toMatchObject({
      adapter: 'sjob_local',
      takeover_from: { job_id: '123', cancel_failed: false }
    });
  });

  test('backs off and keeps the marker when the recovery read fails', async () => {
    const record = insertSlurm([{ state: 'PENDING', takeover: marker() }]);
    const observer = createExternalWaitObserver({
      store,
      listWorkspaces: () => [workspace],
      run: async () => ({ code: 255, stdout: '', stderr: 'refused' }),
      now: () => time
    });

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result).toMatchObject({
      error_count: 1,
      last_error: 'ssh takeover recovery failed',
      jobs: [{ takeover: marker() }]
    });
  });

  test('completes the record once the local run exits zero', async () => {
    const record = insertLocal();
    const { observer } = sequenceObserver([localStdout()]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result).toMatchObject({
      stage: 'completing',
      completion: { recovery_needed: false },
      jobs: [
        {
          adapter: 'sjob_local',
          state: 'COMPLETED',
          terminal: { exit_code: 0, evidence: 'exitcode' }
        }
      ]
    });
  });

  test('observes a running local run at the slurm interval', async () => {
    const record = insertLocal();
    const { observer } = sequenceObserver([
      localStdout({ ps_rc: '0', ps: START, exit_rc: 'absent', exit: '' })
    ]);

    const result = await observer.observeRecord(workspace, record.wait_id);

    expect(result?.jobs[0]).toMatchObject({ state: 'RUNNING' });
    expect(Date.parse(result?.next_observation_at || '') - time).toBe(120000);
  });
});
