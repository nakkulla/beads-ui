import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createExternalWaitService } from './service.js';
import { createExternalWaitStore } from './store.js';

const WORKSPACE = '/tmp/external-wait-service';
const TIMESTAMP = '2026-09-21T00:00:00.000Z';
/** @type {string} */
let tmp_state;
/** @type {ReturnType<typeof createExternalWaitStore>} */
let store;
/** @type {ReturnType<typeof createExternalWaitService>} */
let service;
let timestamp = Date.parse(TIMESTAMP);
const observer = { observeRecord: vi.fn() };
const bd = { setExternalWait: vi.fn(), unsetExternalWait: vi.fn() };
const resume = vi.fn();

/** @returns {import('./store.js').WaitInput} */
function input() {
  return {
    root_dir: WORKSPACE,
    bead_id: 'UI-test',
    owner: {
      kind: 'session',
      session_ref: 'codex:session',
      session_pid: 123,
      session_start: TIMESTAMP
    },
    worktree: WORKSPACE,
    execution_sha: 'a'.repeat(40),
    jobs: [
      {
        adapter: 'process',
        pid: 123,
        submitted_at: TIMESTAMP,
        workdir: WORKSPACE,
        log_path: '/tmp/wait.log'
      }
    ]
  };
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wait-service-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
  timestamp = Date.parse(TIMESTAMP);
  vi.resetAllMocks();
  store = createExternalWaitStore({ now: () => timestamp });
  observer.observeRecord.mockImplementation(async (workspace, wait_id) =>
    store.get(workspace, wait_id)
  );
  resume.mockResolvedValue({ ok: true, attempt_id: 'attempt-resumed' });
  service = createExternalWaitService({
    store,
    observer,
    bd,
    resume,
    now: () => timestamp,
    hold_turn_ms: 10,
    poll_interval_ms: 5,
    wait: async (ms) => {
      timestamp += ms;
    }
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

test('exhausts three hold turns and detaches the fourth without observing', async () => {
  const record = store.insert(WORKSPACE, input());

  for (let turn = 1; turn <= 3; turn += 1) {
    const result = await service.hold(WORKSPACE, record.wait_id);

    expect(result).toMatchObject({
      state: 'running',
      budget: { turns_used: turn }
    });
    expect(store.get(WORKSPACE, record.wait_id)).toMatchObject({
      stage: 'hold'
    });
  }
  const observations = observer.observeRecord.mock.calls.length;

  const result = await service.hold(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({
    state: 'detached',
    budget: { turns_total: 3, turns_used: 3 }
  });
  expect(observer.observeRecord).toHaveBeenCalledTimes(observations);
  expect(bd.setExternalWait).toHaveBeenCalledExactlyOnceWith(
    WORKSPACE,
    'UI-test',
    record.wait_id
  );
});

test('finishes a hold without starting a resume', async () => {
  const record = store.insert(WORKSPACE, input());
  observer.observeRecord.mockImplementationOnce(async (workspace, wait_id) =>
    store.update(workspace, wait_id, (current) => {
      current.stage = 'done';
    })
  );

  const result = await service.hold(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({ state: 'done', budget: { turns_used: 1 } });
  expect(resume).not.toHaveBeenCalled();
  expect(bd.setExternalWait).not.toHaveBeenCalled();
});

test('returns stopped when a concurrent stop ends the hold', async () => {
  const record = store.insert(WORKSPACE, input());
  observer.observeRecord.mockImplementationOnce(async () =>
    service.stop(WORKSPACE, record.wait_id)
  );

  const result = await service.hold(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({ state: 'stopped' });
  expect(resume).not.toHaveBeenCalled();
});

test('keeps the metadata key absent when stop races with detachment', async () => {
  const record = store.insert(WORKSPACE, {
    ...input(),
    budget: { turns_total: 3, turns_used: 3 }
  });
  /** @type {()=>void} */
  let release = () => {};
  const pending = new Promise((resolve) => {
    release = () => resolve(undefined);
  });
  /** @type {string|null} */
  let metadata_key = null;
  bd.setExternalWait.mockImplementationOnce(async () => {
    await pending;
    metadata_key = record.wait_id;
  });
  bd.unsetExternalWait.mockImplementationOnce(async () => {
    metadata_key = null;
  });

  const holding = service.hold(WORKSPACE, record.wait_id);
  const stopping = service.stop(WORKSPACE, record.wait_id);
  release();
  await Promise.all([holding, stopping]);

  expect(store.get(WORKSPACE, record.wait_id)).toMatchObject({
    stage: 'stopped'
  });
  expect(metadata_key).toBeNull();
});

test.each(['done', 'detached', 'hold'])(
  'registers the %s decision from the first observation',
  async (decision) => {
    const body = input();
    body.jobs = [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '123',
        submitted_at: TIMESTAMP,
        log_path: '/tmp/job.log',
        expected: ['result.txt']
      }
    ];
    observer.observeRecord.mockImplementationOnce(async (workspace, wait_id) =>
      store.update(workspace, wait_id, (record) => {
        record.jobs[0].state = decision === 'detached' ? 'PENDING' : 'RUNNING';
        record.jobs[0].time_limit_seconds = 60;
        record.jobs[0].run_time_seconds = 0;
        if (decision === 'done') {
          record.jobs[0].terminal = {
            exit_code: 0,
            evidence: 'rc_line',
            expected_results: [],
            recovery_needed: false,
            completed_at: TIMESTAMP
          };
          record.stage = 'done';
        }
      })
    );

    const result = await service.register(WORKSPACE, body);

    expect(result).toMatchObject({
      ok: true,
      decision,
      jobs: [{ adapter: 'slurm', job_id: '123' }]
    });
    expect(store.findByBead(WORKSPACE, 'UI-test')?.stage || 'done').toBe(
      decision
    );
    expect(observer.observeRecord).toHaveBeenCalledTimes(1);
    expect(bd.setExternalWait).toHaveBeenCalledTimes(
      decision === 'detached' ? 1 : 0
    );
  }
);

test('registers an empty job list as done', async () => {
  const result = await service.register(WORKSPACE, { ...input(), jobs: [] });

  expect(result).toMatchObject({ ok: true, decision: 'done', jobs: [] });
  expect(store.list(WORKSPACE)[0].stage).toBe('done');
});

test.each(['register', 'hold'])(
  'keeps the record detached after a %s metadata failure',
  async (method) => {
    bd.setExternalWait.mockRejectedValueOnce(new Error('readback mismatch'));
    const body = input();
    let wait_id = '';
    if (method === 'hold') {
      wait_id = store.insert(WORKSPACE, {
        ...body,
        budget: { turns_total: 3, turns_used: 3 }
      }).wait_id;
    } else {
      body.jobs = [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '123',
          submitted_at: TIMESTAMP,
          log_path: '/tmp/job.log',
          expected: ['out']
        }
      ];
      observer.observeRecord.mockImplementationOnce(async (workspace, id) =>
        store.update(workspace, id, (record) => {
          record.jobs[0].state = 'PENDING';
        })
      );
    }

    const result =
      method === 'hold'
        ? await service.hold(WORKSPACE, wait_id)
        : await service.register(WORKSPACE, body);

    expect(result).toMatchObject({
      ok: false,
      status: 500,
      error: 'bead_write_failed'
    });
    expect(store.list(WORKSPACE)[0]).toMatchObject({
      stage: 'detached',
      last_error: 'readback mismatch'
    });
  }
);

test('rejects a duplicate live bead with its existing wait identifier', async () => {
  const record = store.insert(WORKSPACE, input());

  const result = await service.register(WORKSPACE, input());

  expect(result).toEqual({
    ok: false,
    status: 409,
    error: 'wait_exists',
    wait_id: record.wait_id
  });
  expect(observer.observeRecord).not.toHaveBeenCalled();
});

test.each([
  { bead_id: '' },
  { worktree: 'relative' },
  { execution_sha: 'short' },
  { owner: { kind: 'worker' } },
  {
    owner: {
      kind: 'session',
      session_ref: 'ref',
      session_pid: 1,
      session_start: TIMESTAMP
    }
  },
  { jobs: null },
  { jobs: [null] },
  {
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: '-oProxyCommand=x',
        job_id: '1',
        submitted_at: TIMESTAMP,
        log_path: 'log',
        expected: ['out']
      }
    ]
  },
  {
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '1',
        submitted_at: TIMESTAMP,
        log_path: 'log',
        expected: []
      }
    ]
  },
  {
    jobs: [
      {
        adapter: 'process',
        pid: 1,
        submitted_at: TIMESTAMP,
        log_path: '/tmp/log',
        workdir: '/tmp'
      }
    ]
  }
])('rejects invalid registration fields %j', async (patch) => {
  const result = await service.register(WORKSPACE, { ...input(), ...patch });

  expect(result).toMatchObject({ ok: false, status: 400 });
  expect(store.list(WORKSPACE)).toEqual([]);
});

test('ignores client supplied stages and observations', async () => {
  const body = input();
  body.jobs[0].state = 'COMPLETED';
  body.jobs[0].terminal = {
    completed_at: TIMESTAMP,
    exit_code: 0,
    evidence: 'forged',
    expected_results: [],
    recovery_needed: false
  };

  const result = await service.register(WORKSPACE, {
    ...body,
    stage: 'resumed',
    budget: { turns_total: 10, turns_used: 0 }
  });

  expect(result).toMatchObject({
    decision: 'hold',
    budget: { turns_total: 3 },
    jobs: [{ state: 'UNKNOWN', terminal: null }]
  });
});

test.each([
  ['session', 'completing', null, 'fork', 200],
  ['worker', 'completing', null, 'fork', 409],
  ['worker', 'completing', 'failed', 'fork', 200],
  ['session', 'completing', 'pending', 'fork', 409],
  ['session', 'completing', 'pending', 'fresh', 200],
  ['worker', 'completing', 'failed', 'fresh', 200],
  ['worker', 'completing', null, 'fresh', 409],
  ['session', 'hold', null, 'fork', 409],
  ['session', 'completing', null, 'invalid', 400]
])(
  'checks resume for %s owner at %s with %s reservation in %s mode',
  async (kind, stage, reservation, mode, status) => {
    const body = input();
    if (kind === 'worker') {
      body.owner = { kind: 'worker', attempt_id: 'attempt-1' };
    }
    const record = store.insert(WORKSPACE, {
      ...body,
      stage: /** @type {import('./store.js').Stage} */ (stage),
      resume:
        reservation === null
          ? null
          : {
              mode: 'fork',
              attempt_id: 'reserved',
              reserved_at: TIMESTAMP,
              launched_at: null,
              session_id: null,
              error: reservation === 'failed' ? 'no_transcript' : null
            }
    });

    const result = await service.resume(WORKSPACE, record.wait_id, mode);

    expect('status' in result ? result.status : 200).toBe(status);
    expect(resume).toHaveBeenCalledTimes(status === 200 ? 1 : 0);
    if (status === 200) {
      expect(resume).toHaveBeenCalledWith(WORKSPACE, record.wait_id, mode);
      expect(result).toEqual({ ok: true, attempt_id: 'attempt-resumed' });
    }
  }
);

test('returns an unwired resume refusal', async () => {
  const record = store.insert(WORKSPACE, { ...input(), stage: 'completing' });
  const unwired = createExternalWaitService({ store, observer, bd });

  const result = await unwired.resume(WORKSPACE, record.wait_id, 'fork');

  expect(result).toEqual({ ok: false, status: 409, error: 'resume_unwired' });
});

test.each(['done', 'resumed', 'stopped'])(
  'rejects stopping a %s record',
  async (stage) => {
    const record = store.insert(WORKSPACE, {
      ...input(),
      stage: /** @type {import('./store.js').Stage} */ (stage)
    });

    const result = await service.stop(WORKSPACE, record.wait_id);

    expect(result).toMatchObject({ status: 409 });
    expect(bd.unsetExternalWait).not.toHaveBeenCalled();
  }
);

test.each(['done', 'resumed', 'stopped'])(
  'clears a lingering bead key when stopping a %s record',
  async (stage) => {
    const record = store.insert(WORKSPACE, {
      ...input(),
      stage: /** @type {import('./store.js').Stage} */ (stage)
    });
    const keyed = createExternalWaitService({
      store,
      observer,
      bd: { ...bd, readExternalWait: vi.fn(async () => record.wait_id) }
    });

    const result = await keyed.stop(WORKSPACE, record.wait_id);

    expect(result).toEqual({ ok: true, stage, bead_id: 'UI-test' });
    expect(bd.unsetExternalWait).toHaveBeenCalledExactlyOnceWith(
      WORKSPACE,
      'UI-test'
    );
    expect(store.get(WORKSPACE, record.wait_id)?.stage).toBe(stage);
  }
);

test('stops observation and unsets the bead key', async () => {
  const record = store.insert(WORKSPACE, input());

  const result = await service.stop(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({ stage: 'stopped' });
  expect(bd.unsetExternalWait).toHaveBeenCalledExactlyOnceWith(
    WORKSPACE,
    'UI-test'
  );
  expect(observer.observeRecord).not.toHaveBeenCalled();
});

test('keeps the record stopped when the unset readback fails', async () => {
  const record = store.insert(WORKSPACE, input());
  bd.unsetExternalWait.mockRejectedValueOnce(new Error('readback failed'));

  const result = await service.stop(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({ status: 500, error: 'bead_write_failed' });
  expect(store.get(WORKSPACE, record.wait_id)).toMatchObject({
    stage: 'stopped',
    last_error: 'readback failed'
  });
});

test.each(/** @type {const} */ (['get', 'hold', 'check', 'stop', 'resume']))(
  'returns not found for an unknown %s record',
  async (method) => {
    const result = await service[method](WORKSPACE, 'w-000000000000', 'fork');

    expect(result).toMatchObject({ status: 404, error: 'not_found' });
  }
);

test('rejects checks after observation has stopped', async () => {
  const record = store.insert(WORKSPACE, { ...input(), stage: 'stopped' });

  const result = await service.check(WORKSPACE, record.wait_id);

  expect(result).toMatchObject({ status: 409 });
  expect(observer.observeRecord).not.toHaveBeenCalled();
});
