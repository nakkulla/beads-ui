import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { expect, test, vi } from 'vitest';
import { SPAWNED_TIMEOUT_SECONDS, observeSlurmJob } from './slurm.js';

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

/**
 * The sub-job section of the remote output (UI-q15q §3.2).
 *
 * @param {{lines?: string[], uq_rc?: number, comp?: string, counts?: string, now?: string, end?: boolean, anchor?: boolean}} [options]
 */
function spawnSection({
  lines = [],
  uq_rc = 0,
  comp = 'filetxt',
  counts = '0|0|0|0',
  now = '2026-09-21T10:00:00',
  end = true,
  anchor = true
} = {}) {
  return [
    '__EWM_SPAWN_BEGIN__',
    ...(anchor
      ? [
          '__EWM_SPAWN_USER__=alice',
          '__EWM_SPAWN_WORKDIR__=/work',
          '__EWM_SPAWN_START__=2026-09-21T09:00:00'
        ]
      : []),
    `__EWM_SPAWN_UQ_RC__=${uq_rc}`,
    `__EWM_SPAWN_COMP__=${comp}`,
    ...lines,
    `__EWM_SPAWN_COUNTS__=${counts}`,
    `__EWM_SPAWN_NOW__=${now}`,
    ...(end ? ['__EWM_SPAWN_END__'] : [])
  ].join('\n');
}

/**
 * @param {string} section
 */
function observeSpawned(section) {
  return observe(
    output({
      queue: 'RUNNING',
      control:
        'JobId=123 JobName=snake__20260921_090000_ab12 JobState=RUNNING TimeLimit=1-00:00:00 RunTime=01:00:00',
      artifacts: `__EWM_ARTIFACT__0=1|12|100\n${section}\n`
    })
  );
}

test('reads the registered JobName and the anchor the program used', async () => {
  const result = await observeSpawned(spawnSection());

  expect(result).toMatchObject({
    name: 'snake__20260921_090000_ab12',
    anchor: {
      user: 'alice',
      workdir: '/work',
      started_at: '2026-09-21T09:00:00'
    }
  });
});

test('parses a running queue row with its rule comment and runtime', async () => {
  const result = await observeSpawned(
    spawnSection({
      lines: [
        '__EWM_SPAWN_ROW__=Q|201|run_0b5e2f3a-1c2d-4e5f-8a9b-0c1d2e3f4a5b|rule_align_reads_wildcards_sample=A|RUNNING|2026-09-21T09:10:00|2026-09-21T09:11:00|2026-09-22T09:11:00|1:02:03|2:00:00|4|16G||/work'
      ],
      counts: '1|0|0|0'
    })
  );

  expect(result.spawned).toEqual({
    status: 'ok',
    completion_log: 'filetxt',
    counts: { running: 1, pending: 0, completed: 0, failed: 0 },
    rows: [
      {
        job_id: '201',
        name: 'run_0b5e2f3a-1c2d-4e5f-8a9b-0c1d2e3f4a5b',
        rule: 'rule_align_reads_wildcards_sample=A',
        state: 'RUNNING',
        submitted_at: '2026-09-21T09:10:00',
        started_at: '2026-09-21T09:11:00',
        ended_at: null,
        elapsed_seconds: 3723,
        time_limit_seconds: 7200,
        unlimited: false,
        cpus: 4,
        memory: '16G',
        exit_code: null
      }
    ]
  });
});

test('parses a completion row with remote start/end elapsed and minute limits', async () => {
  const result = await observeSpawned(
    spawnSection({
      lines: [
        '__EWM_SPAWN_DONE__=2026-09-21T09:40:00|C|202|sort||FAILED|2026-09-21T09:05:00|2026-09-21T09:10:00|2026-09-21T09:40:00||60|2|8G|1:0|/work'
      ],
      counts: '0|0|0|1'
    })
  );

  expect(
    result.spawned?.status === 'ok' ? result.spawned.rows[0] : null
  ).toMatchObject({
    job_id: '202',
    state: 'FAILED',
    ended_at: '2026-09-21T09:40:00',
    elapsed_seconds: 1800,
    time_limit_seconds: 3600,
    exit_code: 1
  });
});

test('measures a pending row from submission to the remote clock', async () => {
  const result = await observeSpawned(
    spawnSection({
      lines: [
        '__EWM_SPAWN_ROW__=Q|203|wait|(null)|PENDING|2026-09-21T09:50:00|N/A|N/A|0:00|UNLIMITED|1|4G||/work'
      ],
      counts: '0|1|0|0'
    })
  );

  expect(
    result.spawned?.status === 'ok' ? result.spawned.rows[0] : null
  ).toMatchObject({
    state: 'PENDING',
    started_at: null,
    elapsed_seconds: 600,
    time_limit_seconds: null,
    unlimited: true
  });
});

test.each([
  ['a failed user queue', { uq_rc: 1 }],
  ['a failed completion file read', { comp: 'failed' }],
  ['a truncated section', { end: false }],
  ['a missing anchor', { anchor: false }]
])('reports %s as failed sub-job material', async (_case, options) => {
  const result = await observeSpawned(spawnSection(options));

  expect(result.spawned).toEqual({ status: 'failed' });
});

test('keeps the registered observation when sub-job material fails', async () => {
  const result = await observeSpawned(spawnSection({ uq_rc: 1 }));

  expect(result).toMatchObject({
    state: 'RUNNING',
    terminal: false,
    time_limit_seconds: 86400,
    run_time_seconds: 3600
  });
});

test('reports no sub-job material without an anchor', async () => {
  const result = await observeSpawned(
    '__EWM_SPAWN_BEGIN__\n__EWM_SPAWN__=none'
  );

  expect(result.spawned).toEqual({ status: 'none' });
  expect(result).not.toHaveProperty('anchor');
});

const START = '2026-09-21T09:00:00';

/**
 * One jobcomp/filetxt line.
 *
 * @param {{id:string, user?:string, name?:string, state?:string, submit?:string, start?:string, end:string, workdir?:string, exit?:string}} fields
 */
function completionLine({
  id,
  user = 'alice',
  name = `job${id}`,
  state = 'COMPLETED',
  submit = '2026-09-21T09:01:00',
  start = '2026-09-21T09:02:00',
  end,
  workdir = '/work',
  exit = '0:0'
}) {
  return `JobId=${id} UserId=${user}(1001) GroupId=g(1001) Name=${name} JobState=${state} Partition=p TimeLimit=60 StartTime=${start} EndTime=${end} NodeList=n1 NodeCnt=1 ProcCnt=2 WorkDir=${workdir} ReservationName= Tres=cpu=2,mem=8G,node=1,billing=2 Account= QOS=normal WcKey= Cluster=c SubmitTime=${submit} EligibleTime=${submit} DerivedExitCode=0:0 ExitCode=${exit}`;
}

/**
 * One `squeue -o '%i|%j|%k|%T|%V|%S|%e|%M|%l|%C|%m||%Z'` line.
 *
 * @param {{id:string, name?:string, comment?:string, state?:string, submit?:string, workdir?:string}} fields
 */
function queueLine({
  id,
  name = `job${id}`,
  comment = '(null)',
  state = 'RUNNING',
  submit = '2026-09-21T09:05:00',
  workdir = '/work'
}) {
  return `${id}|${name}|${comment}|${state}|${submit}|2026-09-21T09:06:00|N/A|10:00|1:00:00|2|8G||${workdir}`;
}

/**
 * @typedef {{queue?: string[], queue_rc?: number, completion?: string[], config?: string|null, readable?: boolean, context?: import('./slurm.js').SpawnedContext, job?: Partial<import('../store.js').SlurmJob>, control?: string, tools?: Record<string, string>}} ProgramOptions
 */

/**
 * Run the generated program through `/bin/sh` against fake Slurm commands;
 * `tools` adds or replaces fake commands, which see the fixture dir as `$EWM_DIR`.
 *
 * @param {ProgramOptions} options
 */
async function runObservation({
  queue = [],
  queue_rc = 0,
  completion = [],
  config,
  readable = true,
  context = {},
  job = {},
  control = `JobId=123 JobName=snake__20260921_090000_ab12\n   UserId=alice(1001) GroupId=g(1001)\n   JobState=RUNNING Reason=None\n   RunTime=01:00:00 TimeLimit=1-00:00:00\n   StartTime=${START} EndTime=2026-09-22T09:00:00\n   WorkDir=/work`,
  tools = {}
}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-spawn-'));
  const completion_path = path.join(dir, 'jobcomp.log');
  fs.writeFileSync(path.join(dir, 'queue.txt'), queue.join('\n'));
  fs.writeFileSync(path.join(dir, 'control.txt'), control);
  fs.writeFileSync(completion_path, completion.join('\n'));
  if (!readable) {
    fs.chmodSync(completion_path, 0o000);
  }
  fs.writeFileSync(
    path.join(dir, 'config.txt'),
    config === undefined
      ? `JobCompType             = jobcomp/filetxt\nJobCompLoc              = ${completion_path}\n`
      : config || ''
  );
  for (const [name, body] of Object.entries({
    squeue: `case "$*" in *-u*) cat '${dir}/queue.txt'; exit ${queue_rc};; *) echo RUNNING;; esac`,
    scontrol: `case "$1 $2" in "show job") cat '${dir}/control.txt';; "show config") ${config === null ? 'exit 1' : `cat '${dir}/config.txt'`};; esac`,
    tac: `awk '{ l[NR] = $0 } END { for (i = NR; i > 0; i--) print l[i] }' "$2"`,
    date: 'case "$1" in +*) echo 2026-09-21T10:00:00;; *) exit 1;; esac',
    ...tools
  })) {
    fs.writeFileSync(path.join(dir, name), `#!/bin/sh\n${body}\n`, {
      mode: 0o755
    });
  }
  /** @type {import('../store.js').Run} */
  const run = async (argv) => {
    const result = await execFileAsync('/bin/sh', ['-c', argv[6]], {
      timeout: 10000,
      maxBuffer: 16 * 1024 * 1024,
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, EWM_DIR: dir }
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  };
  const observation = await observeSlurmJob(
    { ...JOB, ...job },
    { run, spawned: context }
  );
  return { observation, dir };
}

/**
 * The sub-job material of {@link runObservation}.
 *
 * @param {ProgramOptions} options
 */
async function runProgram(options) {
  const { observation } = await runObservation(options);
  return observation.spawned;
}

/**
 * @param {import('../store.js').SpawnedMaterial|undefined} spawned
 */
function okMaterial(spawned) {
  if (spawned?.status !== 'ok') {
    throw new Error(`sub-job material ${JSON.stringify(spawned)}`);
  }
  return spawned;
}

test('admits only same-workdir jobs submitted at or after the anchor start, minus registered jobs', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({ id: '201' }),
        queueLine({ id: '202', workdir: '/elsewhere' }),
        queueLine({ id: '203', submit: '2026-09-21T08:59:59' }),
        queueLine({ id: '124' })
      ],
      completion: [
        completionLine({ id: '301', end: '2026-09-21T09:30:00' }),
        completionLine({
          id: '302',
          user: 'bob',
          end: '2026-09-21T09:31:00'
        })
      ],
      context: { exclude: ['123', '124'] }
    })
  );

  expect(spawned.rows.map((row) => row.job_id).sort()).toEqual(['201', '301']);
  expect(spawned.counts).toEqual({
    running: 1,
    pending: 0,
    completed: 1,
    failed: 0
  });
}, 15000);

test('counts every member before capping completed rows at 300', async () => {
  const completion = Array.from({ length: 305 }, (_, index) =>
    completionLine({
      id: String(1000 + index),
      end: `2026-09-21T09:${String(10 + Math.floor(index / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}`
    })
  );

  const spawned = okMaterial(
    await runProgram({ queue: [queueLine({ id: '201' })], completion })
  );

  expect(spawned.counts.completed).toBe(305);
  expect(spawned.rows.filter((row) => row.state === 'COMPLETED')).toHaveLength(
    300
  );
  expect(spawned.rows.map((row) => row.job_id)).not.toContain('1004');
  expect(spawned.rows.map((row) => row.job_id)).toContain('1005');
}, 15000);

test('returns a previously nonterminal row beyond the completed cap', async () => {
  const completion = Array.from({ length: 305 }, (_, index) =>
    completionLine({
      id: String(1000 + index),
      end: `2026-09-21T09:${String(10 + Math.floor(index / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}`
    })
  );

  const spawned = okMaterial(
    await runProgram({ completion, context: { previous: ['1000'] } })
  );

  expect(spawned.rows.map((row) => row.job_id)).toContain('1000');
  expect(spawned.rows).toHaveLength(301);
}, 15000);

test('lets the completion state win and keeps the queue comment', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({
          id: '201',
          state: 'COMPLETING',
          comment: 'rule_sort'
        })
      ],
      completion: [
        completionLine({
          id: '201',
          state: 'FAILED',
          end: '2026-09-21T09:30:00',
          exit: '2:0'
        })
      ]
    })
  );

  expect(spawned.rows).toEqual([
    expect.objectContaining({
      job_id: '201',
      rule: 'rule_sort',
      state: 'FAILED',
      exit_code: 2
    })
  ]);
  expect(spawned.counts.failed).toBe(1);
}, 15000);

test('stops reading the completion file at the first line that ended before the anchor', async () => {
  const spawned = okMaterial(
    await runProgram({
      completion: [
        completionLine({ id: '300', end: '2026-09-21T09:20:00' }),
        completionLine({
          id: '299',
          submit: '2026-09-21T08:00:00',
          start: '2026-09-21T08:01:00',
          end: '2026-09-21T08:59:00'
        }),
        completionLine({ id: '301', end: '2026-09-21T09:30:00' })
      ]
    })
  );

  expect(spawned.rows.map((row) => row.job_id)).toEqual(['301']);
}, 15000);

test('bounds the submission window at a later-started registered sibling', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({ id: '201', submit: '2026-09-21T09:05:00' }),
        queueLine({ id: '202', submit: '2026-09-21T09:30:00' })
      ],
      context: { later: ['2026-09-21T09:20:00', '2026-09-21T08:00:00'] }
    })
  );

  expect(spawned.rows.map((row) => row.job_id)).toEqual(['201']);
}, 15000);

test('reads the queue alone when the completion log is unsupported', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({ id: '201' }),
        queueLine({ id: '202', state: 'COMPLETED' })
      ],
      completion: [completionLine({ id: '301', end: '2026-09-21T09:30:00' })],
      config: 'JobCompType             = jobcomp/none\n'
    })
  );

  expect(spawned.completion_log).toBe('unsupported');
  expect(spawned.counts).toEqual({
    running: 1,
    pending: 0,
    completed: 1,
    failed: 0
  });
}, 15000);

test.each([
  ['an unreadable configuration', { config: null }],
  ['an unreadable completion file', { readable: false }],
  ['a failed user queue', { queue_rc: 1 }]
])(
  'fails the sub-job material on %s',
  async (_case, options) => {
    const spawned = await runProgram(
      /** @type {Parameters<typeof runProgram>[0]} */ (options)
    );

    expect(spawned).toEqual({ status: 'failed' });
  },
  15000
);

test('falls back to the stored anchor once scontrol forgets the job', async () => {
  const spawned = okMaterial(
    await runProgram({
      control: '',
      queue: [queueLine({ id: '201' })],
      job: {
        anchor: { user: 'alice', workdir: '/work', started_at: START }
      }
    })
  );

  expect(spawned.rows.map((row) => row.job_id)).toEqual(['201']);
}, 15000);

test('takes no anchor from a registered job that has not started', async () => {
  const spawned = await runProgram({
    control: `JobId=123 JobName=x\n   UserId=alice(1001)\n   JobState=PENDING\n   StartTime=2026-09-21T11:00:00\n   WorkDir=/work`,
    queue: [queueLine({ id: '201' })]
  });

  expect(spawned).toEqual({ status: 'none' });
}, 15000);

test('bounds each sub-job read by its own timeout budget', async () => {
  const { dir } = await runObservation({
    queue: [queueLine({ id: '201' })],
    tools: {
      timeout:
        'printf "%s %s\\n" "$3" "$4" >> "$EWM_DIR/budgets"; shift 3; exec "$@"'
    }
  });

  expect(
    fs.readFileSync(path.join(dir, 'budgets'), 'utf8').trim().split('\n')
  ).toEqual([
    `${SPAWNED_TIMEOUT_SECONDS.queue} squeue`,
    `${SPAWNED_TIMEOUT_SECONDS.config} scontrol`,
    `${SPAWNED_TIMEOUT_SECONDS.completion} tac`
  ]);
}, 15000);

test('keeps the registered observation when the user queue read times out', async () => {
  const { observation } = await runObservation({
    queue: [queueLine({ id: '201' })],
    tools: {
      timeout: 'shift 3; case "$*" in squeue*-u*) exit 124;; esac; exec "$@"'
    }
  });

  expect(observation).toMatchObject({
    state: 'RUNNING',
    terminal: false,
    run_time_seconds: 3600,
    spawned: { status: 'failed' }
  });
}, 15000);

test('fails the sub-job material when the completion read times out', async () => {
  const spawned = await runProgram({
    queue: [queueLine({ id: '201' })],
    completion: [completionLine({ id: '301', end: '2026-09-21T09:30:00' })],
    tools: {
      timeout: 'shift 3; case "$1" in tac) exit 124;; esac; exec "$@"'
    }
  });

  expect(spawned).toEqual({ status: 'failed' });
}, 15000);

test('ends the window at a started sibling the queue shows before its anchor is stored', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({ id: '201', submit: '2026-09-21T09:05:00' }),
        queueLine({ id: '202', submit: '2026-09-21T09:30:00' }),
        `124|sib|(null)|RUNNING|2026-09-21T08:50:00|2026-09-21T09:20:00|2026-09-22T09:20:00|10:00|1-00:00:00|2|8G||/work`
      ],
      context: { exclude: ['123', '124'], siblings: ['124'] }
    })
  );

  expect(spawned.rows.map((row) => row.job_id)).toEqual(['201']);
}, 15000);

test('ignores the estimated start of a pending sibling', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [
        queueLine({ id: '201', submit: '2026-09-21T09:05:00' }),
        queueLine({ id: '202', submit: '2026-09-21T09:30:00' }),
        `124|sib|(null)|PENDING|2026-09-21T08:50:00|2026-09-21T09:20:00|2026-09-22T09:20:00|0:00|1-00:00:00|2|8G||/work`
      ],
      context: { exclude: ['123', '124'], siblings: ['124'] }
    })
  );

  expect(spawned.rows.map((row) => row.job_id).sort()).toEqual(['201', '202']);
}, 15000);

test('ends the window at a sibling found ended in the completion log', async () => {
  const spawned = okMaterial(
    await runProgram({
      queue: [queueLine({ id: '202', submit: '2026-09-21T09:30:00' })],
      completion: [
        completionLine({
          id: '201',
          submit: '2026-09-21T09:05:00',
          end: '2026-09-21T09:40:00'
        }),
        completionLine({
          id: '124',
          submit: '2026-09-21T08:50:00',
          start: '2026-09-21T09:20:00',
          end: '2026-09-21T09:50:00'
        })
      ],
      context: { exclude: ['123', '124'], siblings: ['124'] }
    })
  );

  expect(spawned.rows.map((row) => row.job_id)).toEqual(['201']);
}, 15000);

test('fails the merge that reaches its line limit', async () => {
  const queue = Array.from({ length: 200001 }, (_, index) =>
    queueLine({ id: String(10000 + index) })
  );

  const spawned = await runProgram({ queue, config: 'JobCompType = none\n' });

  expect(spawned).toEqual({ status: 'failed' });
}, 60000);

test('fails the completion read that reaches its line limit', async () => {
  const completion = Array.from(
    { length: 200001 },
    (_, index) =>
      `JobId=${10000 + index} UserId=alice(1001) EndTime=2026-09-21T09:30:00`
  );

  const spawned = await runProgram({ completion });

  expect(spawned).toEqual({ status: 'failed' });
}, 60000);

test('reports a malformed row as failed sub-job material', async () => {
  const result = await observeSpawned(
    spawnSection({
      lines: ['__EWM_SPAWN_ROW__=Q|201|broken|(null)|RUNNING'],
      counts: '1|0|0|0'
    })
  );

  expect(result.spawned).toEqual({ status: 'failed' });
});

test('names the completed members beyond the cap without a completion log', async () => {
  const queue = Array.from({ length: 302 }, (_, index) =>
    queueLine({ id: String(1000 + index), state: 'COMPLETED' }).replace(
      '|N/A|',
      `|2026-09-21T09:${String(10 + Math.floor(index / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}|`
    )
  );

  const spawned = okMaterial(
    await runProgram({ queue, config: 'JobCompType = jobcomp/none\n' })
  );

  expect(spawned.counts.completed).toBe(302);
  expect(spawned.rows).toHaveLength(300);
  expect(
    /** @type {import('./slurm.js').SpawnedReading} */ (spawned).truncated
  ).toEqual([
    { job_id: '1001', ended_at: '2026-09-21T09:10:01' },
    { job_id: '1000', ended_at: '2026-09-21T09:10:00' }
  ]);
}, 15000);

test('names no capped member when the completion log is read', async () => {
  const completion = Array.from({ length: 302 }, (_, index) =>
    completionLine({
      id: String(1000 + index),
      end: `2026-09-21T09:${String(10 + Math.floor(index / 60)).padStart(2, '0')}:${String(index % 60).padStart(2, '0')}`
    })
  );

  const spawned = okMaterial(await runProgram({ completion }));

  expect(spawned).not.toHaveProperty('truncated');
}, 15000);

/**
 * A fake command body that prints each line.
 *
 * @param {string[]} lines
 */
function printLines(lines) {
  return `printf '%s\\n' ${lines.map((line) => `'${line}'`).join(' ')}`;
}

const PENDING_CONTROL = [
  'JobId=123 JobName=snake__20260921_090000_ab12',
  '   UserId=alice(1001) GroupId=g(1001)',
  '   Priority=1000 Nice=0 Account=a QOS=normal',
  '   JobState=PENDING Reason=Resources Dependency=(null)',
  '   RunTime=00:00:00 TimeLimit=1-00:00:00',
  '   SubmitTime=2026-10-06T10:00:00 EligibleTime=2026-10-06T10:00:00',
  '   StartTime=2026-10-08T13:38:00 EndTime=2026-10-09T13:38:00',
  '   Partition=normal AllocNode:Sid=login:1',
  '   WorkDir=/work'
].join('\n');

const PENDING_ROWS = [
  '201|2000|2026-10-06T11:00:00|Resources|16',
  '202_1|1000|2026-10-06T09:00:00|Priority|16',
  '202_2|1000|2026-10-06T09:00:00|Priority|16',
  '203|1000|2026-10-06T11:00:00|Priority|8',
  '204|500|2026-10-06T08:00:00|Priority|8',
  '205|3000|2026-10-06T08:00:00|Dependency|4',
  '206|3000|2026-10-06T08:00:00|JobHeldUser|4',
  '207|3000|2026-10-06T08:00:00|BeginTime|4',
  '123|1000|2026-10-06T09:59:00|Resources|2'
];

const NODE_ROWS = [
  'NodeName=n1 Arch=x86_64 CPUAlloc=100 CPUTot=112 CPULoad=61.2 RealMemory=1031000 AllocMem=512000 FreeMem=59000 State=ALLOCATED',
  'NodeName=n2 Arch=x86_64 CPUAlloc=8 CPUTot=16 CPULoad=1.0 RealMemory=2000 AllocMem=1000 FreeMem=900 State=MIXED',
  'NodeName=n3 Arch=x86_64 CPUAlloc=1 CPUTot=2 CPULoad=0.1 RealMemory=10 AllocMem=1 FreeMem=9 State=IDLE'
];

/**
 * Fake commands of a pending job's capacity reads; `tools` replaces any.
 *
 * @param {{rows?: string[], host?: string, tools?: Record<string, string>}} [options]
 * @returns {Record<string, string>}
 */
function capacityTools({ rows = PENDING_ROWS, host = 'n1', tools = {} } = {}) {
  return {
    squeue: `case "$*" in *"-t PD"*) ${printLines(rows)};; *) echo PENDING;; esac`,
    sinfo: printLines(['n1', 'n2']),
    scontrol: `case "$1 $2" in "show job") cat "$EWM_DIR/control.txt";; "show node") ${printLines(NODE_ROWS)};; esac`,
    hostname: `echo ${host}`,
    nproc: 'echo 112',
    cat: `case "$1" in /proc/loadavg) echo '61.20 50.10 40.00 3/900 12345';; /proc/meminfo) printf 'MemTotal: 1000000 kB\\nMemAvailable:    2048000 kB\\n';; *) exec /bin/cat "$@";; esac`,
    ...tools
  };
}

/**
 * @param {Parameters<typeof capacityTools>[0] & {control?: string}} [options]
 */
async function runCapacity({ control = PENDING_CONTROL, ...options } = {}) {
  const { observation, dir } = await runObservation({
    control,
    tools: capacityTools(options)
  });
  return { observation, dir };
}

/**
 * @param {import('../store.js').CapacityMaterial|undefined} material
 */
function okCapacity(material) {
  if (material?.status !== 'ok') {
    throw new Error(`capacity ${JSON.stringify(material)}`);
  }
  return material.capacity;
}

test('reads the raw reason, partition and a future start estimate of a pending job', async () => {
  const { observation } = await runCapacity();

  expect(observation).toMatchObject({ state: 'PENDING', terminal: false });
  expect(okCapacity(observation.capacity)).toMatchObject({
    reason: 'Resources',
    partition: 'normal',
    est_start: '2026-10-08T13:38:00',
    observed_at: expect.stringMatching(/^\d{4}-\d\d-\d\dT[\d:.]+Z$/)
  });
}, 15000);

test('drops a start estimate that is not after the remote clock', async () => {
  const { observation } = await runCapacity({
    control: PENDING_CONTROL.replace(
      'StartTime=2026-10-08T13:38:00',
      'StartTime=2026-09-21T09:59:59'
    )
  });

  expect(okCapacity(observation.capacity).est_start).toBeNull();
}, 15000);

test('drops an unparseable start estimate', async () => {
  const { observation } = await runCapacity({
    control: PENDING_CONTROL.replace(
      'StartTime=2026-10-08T13:38:00',
      'StartTime=Unknown'
    )
  });

  expect(okCapacity(observation.capacity).est_start).toBeNull();
}, 15000);

test('counts expanded array tasks that outrank the job and skips excluded reasons and itself', async () => {
  const { observation } = await runCapacity();

  expect(okCapacity(observation.capacity).ahead).toEqual({
    jobs: 3,
    cpus: 48
  });
}, 15000);

test('sums CPU and memory allocation over the partition nodes only', async () => {
  const { observation } = await runCapacity();

  expect(okCapacity(observation.capacity).slurm).toEqual({
    cpu_alloc: 108,
    cpu_total: 128,
    mem_alloc_mb: 513000,
    mem_total_mb: 1033000
  });
}, 15000);

test('reads the ssh host load when the host is a partition node', async () => {
  const { observation } = await runCapacity({ host: 'n2' });

  expect(okCapacity(observation.capacity).host).toEqual({
    name: 'n2',
    cpus: 112,
    load1: 61.2,
    mem_available_mb: 2000
  });
}, 15000);

test('omits the host when the ssh host is not a partition node', async () => {
  const { observation } = await runCapacity({ host: 'login' });

  expect(okCapacity(observation.capacity).host).toBeNull();
}, 15000);

test('bounds each capacity read by five seconds', async () => {
  const { dir } = await runObservation({
    control: PENDING_CONTROL,
    tools: capacityTools({
      tools: {
        timeout:
          'printf "%s %s\\n" "$3" "$4" >> "$EWM_DIR/budgets"; shift 3; exec "$@"'
      }
    })
  });

  expect(
    fs.readFileSync(path.join(dir, 'budgets'), 'utf8').trim().split('\n')
  ).toEqual([
    '5 squeue',
    '5 sinfo',
    '5 scontrol',
    '5 hostname',
    '5 nproc',
    '5 cat',
    '5 cat'
  ]);
}, 15000);

test.each([
  ['the pending queue', 'squeue'],
  ['the partition nodes', 'sinfo'],
  ['the host load', 'nproc']
])(
  'reports a failed capacity read when %s times out',
  async (_label, command) => {
    const { observation } = await runCapacity({
      tools: {
        timeout: `shift 3; case "$1" in ${command}) exit 124;; esac; exec "$@"`
      }
    });

    expect(observation).toMatchObject({ state: 'PENDING', terminal: false });
    expect(observation.capacity).toEqual({ status: 'failed' });
  },
  15000
);

test('reports a failed capacity read when a node lacks its memory allocation', async () => {
  const { observation } = await runCapacity({
    tools: {
      scontrol: `case "$1 $2" in "show job") cat "$EWM_DIR/control.txt";; "show node") ${printLines(NODE_ROWS.map((row) => row.replace(' AllocMem=512000', '')))};; esac`
    }
  });

  expect(observation.capacity).toEqual({ status: 'failed' });
}, 15000);

test('skips every capacity read once the job is no longer pending', async () => {
  const { observation, dir } = await runObservation({
    tools: capacityTools({
      tools: {
        squeue:
          'case "$*" in *"-t PD"*) touch "$EWM_DIR/pd-read";; *) echo RUNNING;; esac'
      }
    })
  });

  expect(observation).toMatchObject({ state: 'RUNNING', terminal: false });
  expect(fs.existsSync(path.join(dir, 'pd-read'))).toBe(false);
}, 15000);
