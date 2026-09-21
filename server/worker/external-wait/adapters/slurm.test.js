import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { expect, test, vi } from 'vitest';
import { observeSlurmJob } from './slurm.js';

const execFileAsync = promisify(execFile);
/** @type {import('../store.js').SlurmJob} */
const JOB = {
  adapter: 'slurm',
  ssh_host: 'cluster',
  job_id: '123',
  submitted_at: '2026-09-21T00:00:00Z',
  log_path: '/work/job.log',
  expected: ['/work/result']
};
const EPOCH = Date.parse(JOB.submitted_at) / 1000;

/**
 * @param {{queue?:string, control?:string, queue_rc?:number, control_rc?:number, log_rc?:number, log?:string, artifacts?:string}} [options]
 */
function output({
  queue = '',
  control = '',
  queue_rc = 0,
  control_rc = 0,
  log_rc = 0,
  log = '',
  artifacts = '__EWM_ARTIFACT__0=1|12|100\n'
} = {}) {
  return `${queue}\n__EWM_SQUEUE_RC__=${queue_rc}\n${control}\n__EWM_SCONTROL_RC__=${control_rc}\n${log}\n__EWM_LOG_RC__=${log_rc}\n${artifacts}`;
}

/**
 * @param {{job_id?:string, epoch?:number|null, exit_code?:number}} [options]
 */
function logBlock({ job_id = '123', epoch = EPOCH, exit_code = 0 } = {}) {
  return `__EWM_LOG_START__====== Job Started: current =====\n__EWM_LOG_JOB_ID__=Job ID: ${job_id}\n__EWM_LOG_FINISH__====== Job Finished: later =====\n__EWM_LOG_EXIT__=Exit code: ${exit_code}\n${epoch === null ? '' : `__EWM_LOG_START_EPOCH__=${epoch}\n`}`;
}

/**
 * @param {string} stdout
 * @param {import('../store.js').SlurmJob} [job]
 */
function observe(stdout, job = JOB) {
  return observeSlurmJob(job, {
    run: async () => ({ code: 0, stdout, stderr: '' }),
    now: () => EPOCH * 1000
  });
}

test.each(['PENDING', 'RUNNING', 'CONFIGURING', 'SUSPENDED', 'COMPLETING'])(
  'keeps %s nonterminal even beside a completed log',
  async (state) => {
    const stdout = output({
      queue: state,
      control: `JobId=123 JobState=${state} TimeLimit=00:30:00 RunTime=00:03:00`,
      log: logBlock()
    });

    const result = await observe(stdout);

    expect(result).toMatchObject({
      state,
      terminal: false,
      time_limit_seconds: 1800,
      run_time_seconds: 180,
      unlimited: false,
      unparseable: false
    });
  }
);

test('keeps active scontrol evidence nonterminal when the queue is empty', async () => {
  const result = await observe(
    output({ control: 'JobId=123 JobState=RUNNING', log: logBlock() })
  );

  expect(result).toMatchObject({ state: 'RUNNING', terminal: false });
});

test.each([
  ['COMPLETED', '0:0', false],
  ['FAILED', '9:0', true],
  ['CANCELLED', '0:15', true],
  ['TIMEOUT', '0:0', true],
  ['NODE_FAIL', '1:0', true]
])(
  'proves %s with scontrol and preserves recovery',
  async (state, exit, recovery_needed) => {
    const result = await observe(
      output({ control: `JobId=123 JobState=${state} ExitCode=${exit}` })
    );

    expect(result).toMatchObject({
      state,
      terminal: true,
      evidence: 'scontrol',
      recovery_needed
    });
    expect(result.expected_results).toEqual([
      { path: '/work/result', exists: true, size: 12, mtime: 100 }
    ]);
    expect(JSON.stringify(result)).not.toContain('__EWM');
  }
);

test('marks a successful exit with missing output for recovery', async () => {
  const result = await observe(
    output({
      control: 'JobId=123 JobState=COMPLETED ExitCode=0:0',
      artifacts: '__EWM_ARTIFACT__0=0|-|-\n'
    })
  );

  expect(result).toMatchObject({
    terminal: true,
    recovery_needed: true,
    expected_results: [
      { path: '/work/result', exists: false, size: null, mtime: null }
    ]
  });
});

test.each([
  {},
  { log: '' },
  { log: logBlock({ job_id: '999' }) },
  { log: logBlock({ epoch: EPOCH - 1 }) },
  { log: logBlock({ epoch: null }) },
  { log: logBlock().replace('__EWM_LOG_FINISH__=', 'invalid=') },
  { queue: 'COMPLETED', log: logBlock() },
  { control: 'JobId=123 JobState=COMPLETED ExitCode=unknown' },
  { log: logBlock(), log_rc: 1 }
])('refuses weak terminal evidence: %j', async (parts) => {
  const result = await observe(output(parts));

  expect(result).toMatchObject({ state: 'UNKNOWN', terminal: false });
});

test('uses a fresh matching log trailer after scontrol purges the job', async () => {
  const result = await observe(output({ control_rc: 1, log: logBlock() }));

  expect(result).toMatchObject({
    state: 'COMPLETED',
    terminal: true,
    exit_code: 0,
    evidence: 'log',
    recovery_needed: false
  });
});

test.each([
  { queue_rc: 1, log: logBlock() },
  { control: 'JobId=999 JobState=COMPLETED ExitCode=0:0', log: logBlock() }
])(
  'rejects failed queries or mismatched scheduler identity: %j',
  async (parts) => {
    await expect(observe(output(parts))).rejects.toThrow();
  }
);

test('rejects a changed registered scheduler submission identity', async () => {
  await expect(
    observe(
      output({
        control: 'JobId=123 JobState=COMPLETED ExitCode=0:0 SubmitTime=other'
      }),
      { ...JOB, scheduler_submit_time: 'registered' }
    )
  ).rejects.toThrow('identity mismatch');
});

test.each([
  ['1-02:03:04', '01:02:03', 93784, 3723, false, false],
  ['UNLIMITED', '00:00:00', null, 0, true, false],
  ['unknown', '00:00:00', null, 0, false, true],
  ['00:30:00', 'unknown', 1800, null, false, true]
])(
  'extracts TimeLimit=%s and RunTime=%s',
  async (
    limit,
    runtime,
    limit_seconds,
    runtime_seconds,
    unlimited,
    unparseable
  ) => {
    const result = await observe(
      output({
        queue: 'RUNNING',
        control: `JobId=123 JobState=RUNNING TimeLimit=${limit} RunTime=${runtime}`
      })
    );

    expect(result).toMatchObject({
      time_limit_seconds: limit_seconds,
      run_time_seconds: runtime_seconds,
      unlimited,
      unparseable
    });
  }
);

test('runs one bounded SSH command with batch authentication', async () => {
  const run = vi.fn(async () => ({ code: 0, stdout: output(), stderr: '' }));

  await observeSlurmJob(JOB, { run });

  expect(run).toHaveBeenCalledTimes(1);
  expect(run).toHaveBeenCalledWith(
    [
      'ssh',
      '-o',
      'BatchMode=yes',
      '-o',
      'ConnectTimeout=10',
      'cluster',
      expect.stringContaining('tail -n 200')
    ],
    { timeout_ms: 60000 }
  );
});

test.each(['-oProxyCommand=bad', 'host;bad', 'host\nother'])(
  'rejects invalid SSH alias %s before execution',
  async (ssh_host) => {
    const run = vi.fn();

    await expect(
      observeSlurmJob({ ...JOB, ssh_host }, { run })
    ).rejects.toThrow('ssh_host');
    expect(run).not.toHaveBeenCalled();
  }
);

test('rejects malformed transport output', async () => {
  await expect(observe('partial response')).rejects.toThrow('markers');
});

test('reports SSH failure without preserving stderr', async () => {
  await expect(
    observeSlurmJob(JOB, {
      run: async () => ({ code: 255, stdout: '', stderr: 'private output' })
    })
  ).rejects.toThrow('ssh observation failed');
});

test.each([
  'finished',
  'new-unfinished',
  'new-mismatch',
  'old',
  'unparseable',
  'purged',
  'queue-error'
])(
  'projects only the last bounded sjob block: %s',
  async (kind) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-slurm-'));
    const log_path = path.join(dir, "job ' $(false).log");
    const started =
      kind === 'unparseable'
        ? 'unparseable'
        : kind === 'old'
          ? 'old'
          : 'current';
    const old =
      '===== Job Started: old =====\nJob ID: 123\n===== Job Finished: old =====\nExit code: 9\n';
    const latest = `===== Job Started: ${started} =====\nJob ID: ${kind === 'new-mismatch' ? '999' : '123'}\n${kind === 'new-unfinished' ? '' : '===== Job Finished: later =====\nExit code: 0\n'}`;
    fs.writeFileSync(log_path, old + latest);
    for (const [name, body] of Object.entries({
      squeue:
        kind === 'queue-error'
          ? 'exit 1'
          : kind === 'purged'
            ? 'case "$*" in *-j*) exit 1;; *) exit 0;; esac'
            : 'exit 0',
      scontrol: 'exit 1',
      date: `case "$2" in current) echo ${EPOCH};; old) echo ${EPOCH - 1};; *) exit 1;; esac`
    })) {
      fs.writeFileSync(path.join(dir, name), `#!/bin/sh\n${body}\n`, {
        mode: 0o755
      });
    }
    /** @type {import('../store.js').Run} */
    const run = async (argv) => {
      const result = await execFileAsync('/bin/sh', ['-c', argv[6]], {
        timeout: 10000,
        env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }
      });
      return { code: 0, stdout: result.stdout, stderr: result.stderr };
    };

    const observation = observeSlurmJob(
      { ...JOB, log_path, expected: [path.join(dir, 'missing')] },
      { run }
    );

    if (kind === 'queue-error') {
      await expect(observation).rejects.toThrow('squeue query failed');
      return;
    }
    const result = await observation;

    expect(result.terminal).toBe(kind === 'finished' || kind === 'purged');
    if (kind === 'finished' || kind === 'purged') {
      expect(result).toMatchObject({
        exit_code: 0,
        evidence: 'log',
        recovery_needed: true
      });
    }
  },
  15000
);
