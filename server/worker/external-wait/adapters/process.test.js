import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { beforeEach, expect, test, vi } from 'vitest';
import { observeProcessJob } from './process.js';

/** @type {import('../store.js').ProcessJob} */
let job;

beforeEach(() => {
  const workdir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'external-wait-process-')
  );
  job = {
    adapter: 'process',
    pid: 1234,
    submitted_at: '2026-09-21T00:00:00Z',
    process_start: 'same',
    workdir,
    log_path: path.join(workdir, 'log'),
    expected: []
  };
  fs.writeFileSync(job.log_path, 'working\n');
});

test.each([
  [true, 'working\n', 'RUNNING', undefined],
  [true, 'rc=0\n', 'RUNNING', undefined],
  [false, 'rc=0\n', 'COMPLETED', 0],
  [false, 'rc=3\n', 'FAILED', 3],
  [false, 'rc=-9\n', 'FAILED', -9],
  [false, 'rc=4\nrc=0\nmore output\n', 'COMPLETED', 0],
  [false, 'working\n', 'VANISHED', null],
  [false, ' rc=0\n', 'VANISHED', null]
])(
  'observes alive=%s log=%s as %s',
  async (alive, contents, state, exit_code) => {
    fs.writeFileSync(job.log_path, /** @type {string} */ (contents));
    const run = vi.fn(async () => ({
      code: alive ? 0 : 1,
      stdout: alive ? 'same\n' : '',
      stderr: ''
    }));

    const result = await observeProcessJob(job, { run });

    expect(result.state).toBe(state);
    expect(result.terminal).toBe(!alive);
    expect(result.exit_code).toBe(exit_code);
    if (!alive) {
      expect(result.recovery_needed).toBe(exit_code !== 0);
    }
    expect(run).toHaveBeenCalledWith(
      ['env', 'LC_ALL=C', 'ps', '-p', '1234', '-o', 'lstart='],
      { timeout_ms: 5000 }
    );
  }
);

test('probes before reading the final exit line', async () => {
  const run = vi.fn(async () => {
    fs.writeFileSync(job.log_path, 'rc=0\n');
    return { code: 1, stdout: '', stderr: '' };
  });

  const result = await observeProcessJob(job, { run });

  expect(result).toMatchObject({
    state: 'COMPLETED',
    evidence: 'rc_line',
    exit_code: 0
  });
});

test('reads only the last 4096 bytes', async () => {
  fs.writeFileSync(job.log_path, `rc=0\n${'x'.repeat(4096)}`);

  const result = await observeProcessJob(job, {
    run: async () => ({ code: 1, stdout: '', stderr: '' })
  });

  expect(result).toMatchObject({
    state: 'VANISHED',
    recovery_needed: true,
    exit_code: null
  });
});

test.each([null, 'old'])(
  'treats a reused PID with saved identity %s as gone',
  async (process_start) => {
    job.process_start = process_start;
    fs.writeFileSync(job.log_path, 'rc=0\n');
    job.expected = ['present', 'missing'];
    fs.writeFileSync(path.join(job.workdir, 'present'), '123');

    const result = await observeProcessJob(job, {
      run: async () => ({ code: 0, stdout: 'new', stderr: '' })
    });

    expect(result).toMatchObject({ state: 'COMPLETED', recovery_needed: true });
    expect(result.expected_results).toEqual([
      {
        path: 'present',
        exists: true,
        size: 3,
        mtime: Math.floor(
          fs.statSync(path.join(job.workdir, 'present')).mtimeMs / 1000
        )
      },
      { path: 'missing', exists: false, size: null, mtime: null }
    ]);
  }
);

test('gate-r1 #5 captures the first live process start identity', async () => {
  delete job.process_start;

  const result = await observeProcessJob(job, {
    run: async () => ({ code: 0, stdout: 'new', stderr: '' })
  });

  expect(result).toEqual({
    state: 'RUNNING',
    terminal: false,
    process_start: 'new'
  });
});

test('gate-r1 #5 retains the first process identity even when its log is unreadable', async () => {
  delete job.process_start;

  const result = await observeProcessJob(job, {
    run: async () => ({ code: 0, stdout: 'first\n', stderr: '' }),
    readTail: async () => {
      throw new Error('unreadable');
    }
  });

  expect(result).toMatchObject({
    process_start: 'first',
    error: 'log unreadable',
    terminal: false
  });
});

test.each([
  { code: 2, stdout: '', stderr: 'bad' },
  { code: 0, stdout: '', stderr: '' },
  { code: 1, stdout: '', stderr: 'bad' },
  { code: 1, stdout: 'unexpected', stderr: '' }
])('keeps probe errors nonterminal: %j', async (probe) => {
  const readTail = vi.fn(async () => 'rc=0\n');

  const result = await observeProcessJob(job, {
    run: async () => probe,
    readTail
  });

  expect(result).toEqual({
    state: 'UNKNOWN',
    terminal: false,
    error: 'process probe failed'
  });
  expect(readTail).not.toHaveBeenCalled();
});

test('keeps a thrown process probe nonterminal', async () => {
  const result = await observeProcessJob(job, {
    run: async () => {
      throw new Error('spawn failed');
    }
  });

  expect(result.error).toBe('process probe failed');
  expect(result.terminal).toBe(false);
});

test('reports an unreadable log without inventing VANISHED', async () => {
  job.log_path = path.join(job.workdir, 'missing-log');

  const result = await observeProcessJob(job, {
    run: async () => ({ code: 1, stdout: '', stderr: '' })
  });

  expect(result.error).toBe('log unreadable');
  expect(result.terminal).toBe(false);
});
