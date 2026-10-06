import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { observeSjobLocalJob } from './sjob-local.js';

const execFileAsync = promisify(execFile);

// Each test runs the generated program through a real `/bin/sh`, which can
// exceed the default 5 s under a loaded full-suite run.
const SHELL_TEST_TIMEOUT_MS = 15000;
const START = 'Tue Oct  6 17:00:00 2026';
/** @type {string} */
let dir;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-sjob-local-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

/**
 * A stored local run whose exitcode and expected artifact live in `dir`.
 *
 * @param {Partial<import('../store.js').SjobLocalJob>} [patch]
 * @returns {import('../store.js').SjobLocalJob}
 */
function job(patch = {}) {
  return {
    adapter: 'sjob_local',
    ssh_host: 'wallace',
    local_id: 'L003',
    pid: 4242,
    process_start: START,
    workdir: dir,
    log_path: path.join(dir, 'job.log'),
    exitcode_path: path.join(dir, "L003 ' $(false).exitcode"),
    submitted_at: '2026-10-06T08:00:00.000Z',
    expected: [path.join(dir, 'result')],
    cpus: 16,
    mem_gb: 64,
    takeover_from: {
      job_id: '249043',
      at: '2026-10-06T08:00:00.000Z',
      cancel_failed: false
    },
    ...patch
  };
}

/**
 * Run the generated remote program in a local shell whose `ps` and `stat`
 * are fakes: `ps` prints `lstart` (alive), exits 1 silently (gone), or fails.
 *
 * @param {{ps: 'gone'|'fail'|string, exitcode?: string, artifact?: boolean}} scenario
 * @returns {import('../store.js').Run}
 */
function remote({ ps, exitcode, artifact = true }) {
  const probe =
    ps === 'gone'
      ? 'exit 1'
      : ps === 'fail'
        ? 'echo "ps: broken" >&2; exit 2'
        : `echo '${ps}'`;
  fs.writeFileSync(path.join(dir, 'ps'), `#!/bin/sh\n${probe}\n`, {
    mode: 0o755
  });
  // BSD stat has no -c; this fake honours the two format fields used.
  fs.writeFileSync(
    path.join(dir, 'stat'),
    `#!/bin/sh\nprintf '%s\\n' "$2" | sed 's/%s/12/; s/%Y/100/'\n`,
    { mode: 0o755 }
  );
  if (exitcode !== undefined) {
    fs.writeFileSync(job().exitcode_path, exitcode);
  }
  if (artifact) {
    fs.writeFileSync(path.join(dir, 'result'), 'done');
  }
  return async (argv) => {
    const result = await execFileAsync('/bin/sh', ['-c', argv[6]], {
      timeout: 10000,
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  };
}

test(
  'reports RUNNING while the saved start identity matches',
  async () => {
    const run = remote({ ps: START, exitcode: '0' });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toEqual({ state: 'RUNNING', terminal: false });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'completes on a zero exitcode once the process is gone',
  async () => {
    const run = remote({ ps: 'gone', exitcode: '0\n' });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toEqual({
      state: 'COMPLETED',
      terminal: true,
      exit_code: 0,
      evidence: 'exitcode',
      expected_results: [
        { path: path.join(dir, 'result'), exists: true, size: 12, mtime: 100 }
      ],
      recovery_needed: false
    });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'fails on a nonzero exitcode and asks for recovery',
  async () => {
    const run = remote({ ps: 'gone', exitcode: '3' });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toMatchObject({
      state: 'FAILED',
      exit_code: 3,
      evidence: 'exitcode',
      recovery_needed: true
    });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'vanishes when the process is gone without an exitcode',
  async () => {
    const run = remote({ ps: 'gone' });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toMatchObject({
      state: 'VANISHED',
      terminal: true,
      exit_code: null,
      recovery_needed: true
    });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'judges a reused pid by the exitcode',
  async () => {
    const run = remote({ ps: 'Wed Oct  7 09:00:00 2026', exitcode: '0' });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toMatchObject({ state: 'COMPLETED', exit_code: 0 });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'judges an empty saved start by the exitcode alone',
  async () => {
    const run = remote({ ps: START, exitcode: '0' });

    const result = await observeSjobLocalJob(job({ process_start: '' }), {
      run
    });

    expect(result).toMatchObject({ state: 'COMPLETED', terminal: true });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'asks for recovery when an expected artifact is missing',
  async () => {
    const run = remote({ ps: 'gone', exitcode: '0', artifact: false });

    const result = await observeSjobLocalJob(job(), { run });

    expect(result).toMatchObject({
      state: 'COMPLETED',
      expected_results: [{ exists: false, size: null, mtime: null }],
      recovery_needed: true
    });
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'throws when the ssh call fails',
  async () => {
    /** @type {import('../store.js').Run} */
    const run = async () => ({ code: 255, stdout: '', stderr: 'refused' });

    const observation = observeSjobLocalJob(job(), { run });

    await expect(observation).rejects.toThrow('ssh observation failed');
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'throws instead of judging when the process probe fails',
  async () => {
    const run = remote({ ps: 'fail' });

    const observation = observeSjobLocalJob(job(), { run });

    await expect(observation).rejects.toThrow('local process probe failed');
  },
  SHELL_TEST_TIMEOUT_MS
);

test(
  'reads the process before the exitcode in one batch-mode ssh',
  async () => {
    /** @type {string[][]} */
    const calls = [];
    const inner = remote({ ps: START });
    /** @type {import('../store.js').Run} */
    const run = async (argv, options) => {
      calls.push(argv);
      return inner(argv, options);
    };

    await observeSjobLocalJob(job(), { run });

    expect(calls).toHaveLength(1);
    expect(calls[0].slice(0, 6)).toEqual([
      'ssh',
      '-o',
      'BatchMode=yes',
      '-o',
      'ConnectTimeout=10',
      'wallace'
    ]);
    expect(calls[0][6].indexOf('ps -p 4242 -o lstart=')).toBeLessThan(
      calls[0][6].indexOf('cat --')
    );
  },
  SHELL_TEST_TIMEOUT_MS
);
