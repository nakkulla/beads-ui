import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { beforeEach, expect, test } from 'vitest';
import { RECORD_STAGES, WAIT_ID_RE } from './contract.js';
import { createExternalWaitStore, makeWaitId } from './store.js';

let workspace = '';
let file = '';
let sequence = 0;
let store = createExternalWaitStore();
const NOW = Date.parse('2026-09-21T00:00:00Z');

/**
 * @param {Partial<import('./store.js').WaitInput>} [overrides]
 * @returns {import('./store.js').WaitInput}
 */
function input(overrides = {}) {
  return {
    root_dir: workspace,
    bead_id: 'UI-test',
    owner: { kind: 'worker', attempt_id: 'attempt-1' },
    worktree: workspace,
    execution_sha: 'a'.repeat(40),
    jobs: [],
    ...overrides
  };
}

beforeEach(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'external-wait-store-'));
  file = path.join(workspace, 'state', 'external-wait.json');
  sequence = 0;
  store = createExternalWaitStore({
    filePathFor: () => file,
    now: () => NOW,
    makeId: () => `w-${(++sequence).toString(16).padStart(12, '0')}`
  });
});

test('generates twelve lowercase hex digits after the wait prefix', () => {
  const ids = Array.from({ length: 10 }, () => makeWaitId());

  expect(ids.every((id) => WAIT_ID_RE.test(id))).toBe(true);
  expect(new Set(ids).size).toBe(10);
});

test('reads missing files as empty without an error', () => {
  const records = store.list(workspace);

  expect(records).toEqual([]);
  expect(store.last_read_error).toBeNull();
});

test.each([
  '{broken',
  '{"schema":2,"records":[]}',
  '{"schema":1,"records":[{}]}'
])('exposes corrupt reads while returning an empty list: %s', (contents) => {
  fs.mkdirSync(path.dirname(file));
  fs.writeFileSync(file, contents);

  const records = store.list(workspace);

  expect(records).toEqual([]);
  expect(store.last_read_error).toBeTruthy();
});

test('persists defaults atomically and reads them after restart', () => {
  const record = store.insert(workspace, input());
  const restarted = createExternalWaitStore({ filePathFor: () => file });

  expect(record.registered_at).toBe(new Date(NOW).toISOString());
  expect(record.budget).toEqual({ turns_total: 3, turns_used: 0 });
  expect(restarted.get(workspace, record.wait_id)).toEqual(record);
  expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
    schema: 1,
    records: [record]
  });
  expect(fs.readdirSync(path.dirname(file))).toEqual(['external-wait.json']);
});

test('returns detached copies from writes and reads', () => {
  const record = store.insert(workspace, input());
  record.budget.turns_used = 99;
  const read = store.get(workspace, record.wait_id);
  if (!read) {
    throw new Error('missing fixture');
  }
  read.budget.turns_used = 100;

  expect(store.get(workspace, record.wait_id)?.budget.turns_used).toBe(0);
});

test.each(['hold', 'detached', 'completing'])(
  'rejects a second live wait beside %s',
  (stage) => {
    const record = store.insert(
      workspace,
      input({ stage: /** @type {import('./store.js').Stage} */ (stage) })
    );

    expect(() => store.insert(workspace, input())).toThrow('already exists');
    expect(store.findByBead(workspace, 'UI-test')).toEqual(record);
  }
);

test.each(['done', 'resumed', 'stopped'])(
  'releases bead ownership at %s',
  (stage) => {
    store.insert(
      workspace,
      input({ stage: /** @type {import('./store.js').Stage} */ (stage) })
    );

    expect(store.findByBead(workspace, 'UI-test')).toBeNull();
    expect(store.insert(workspace, input()).stage).toBe('hold');
  }
);

test('validates every permitted and forbidden stage transition', () => {
  const legal = new Set([
    'hold:done',
    'hold:detached',
    'detached:completing',
    'completing:resumed'
  ]);

  for (const from of RECORD_STAGES) {
    for (const to of RECORD_STAGES) {
      const record = store.insert(
        workspace,
        input({
          bead_id: `${from}:${to}`,
          stage: /** @type {import('./store.js').Stage} */ (from)
        })
      );
      const mutate = () =>
        store.update(workspace, record.wait_id, (next) => {
          next.stage = /** @type {import('./store.js').Stage} */ (to);
        });

      if (from === to || to === 'stopped' || legal.has(`${from}:${to}`)) {
        expect(mutate().stage).toBe(to);
      } else {
        expect(mutate).toThrow('Illegal');
        expect(store.get(workspace, record.wait_id)?.stage).toBe(from);
      }
    }
  }
});

test('rejects invalid mutations without changing the persisted record', () => {
  const record = store.insert(workspace, input());
  const before = fs.readFileSync(file, 'utf8');

  expect(() =>
    store.update(workspace, record.wait_id, (next) => {
      next.budget.turns_used = -1;
    })
  ).toThrow('Invalid');
  expect(() =>
    store.update(workspace, record.wait_id, (next) => {
      next.bead_id = 'other';
    })
  ).toThrow('immutable');
  expect(fs.readFileSync(file, 'utf8')).toBe(before);
});

test('removes only the requested wait', () => {
  const first = store.insert(workspace, input());
  const second = store.insert(workspace, input({ bead_id: 'other' }));

  const removed = store.remove(workspace, first.wait_id);

  expect(removed).toBe(true);
  expect(store.list(workspace)).toEqual([second]);
  expect(store.remove(workspace, first.wait_id)).toBe(false);
});

test('stores and rereads a session resume without an attempt', () => {
  const record = store.insert(workspace, input());
  const session_resume = {
    mode: /** @type {const} */ ('session'),
    attempt_id: null,
    reserved_at: '2026-09-21T00:00:00.000Z',
    launched_at: null,
    session_id: 'user-session',
    error: null
  };

  store.update(workspace, record.wait_id, (current) => {
    current.resume = session_resume;
  });
  const reread = createExternalWaitStore({ filePathFor: () => file }).get(
    workspace,
    record.wait_id
  );

  expect(reread?.resume).toEqual(session_resume);
});

test('rejects a session resume that names an attempt', () => {
  const record = store.insert(workspace, input());

  const write = () =>
    store.update(workspace, record.wait_id, (current) => {
      current.resume = {
        mode: 'session',
        attempt_id: 'attempt-2',
        reserved_at: null,
        launched_at: null,
        session_id: 'user-session',
        error: null
      };
    });

  expect(write).toThrow('Invalid external wait resume');
});

/**
 * A `resumed` record a `session` resume closed (UI-18a5 §3.4).
 *
 * @param {'session'|'fork'} mode
 */
function resumedRecord(mode) {
  return store.insert(
    workspace,
    input({
      owner: {
        kind: 'session',
        session_ref: 'claude:user-session@host',
        session_pid: 3333,
        session_start: '2026-09-21T00:00:00.000Z'
      },
      stage: 'resumed',
      resume: {
        mode,
        attempt_id: mode === 'fork' ? 'attempt-2' : null,
        reserved_at: '2026-09-21T00:00:00.000Z',
        launched_at: '2026-09-21T00:00:01.000Z',
        session_id: 'user-session',
        error: null
      }
    })
  );
}

test('refuses resumed to completing through a plain update', () => {
  const record = resumedRecord('session');

  const write = () =>
    store.update(workspace, record.wait_id, (next) => {
      next.stage = 'completing';
    });

  expect(write).toThrow(
    'Illegal external wait transition: resumed -> completing'
  );
});

test('returns a session resume to completing through the revert path', () => {
  const record = resumedRecord('session');

  const reverted = store.revertSessionResume(workspace, record.wait_id);

  expect(reverted).toMatchObject({ stage: 'completing', resume: null });
  expect(store.get(workspace, record.wait_id)).toMatchObject({
    stage: 'completing',
    resume: null
  });
});

test('refuses to revert a fork resume', () => {
  const record = resumedRecord('fork');

  const revert = () => store.revertSessionResume(workspace, record.wait_id);

  expect(revert).toThrow('Illegal external wait revert');
});

test('leaves a record already back at completing unchanged', () => {
  const record = resumedRecord('session');
  store.revertSessionResume(workspace, record.wait_id);
  const before = fs.readFileSync(file, 'utf8');

  const again = store.revertSessionResume(workspace, record.wait_id);

  expect(again.stage).toBe('completing');
  expect(fs.readFileSync(file, 'utf8')).toBe(before);
});

/** @returns {import('./store.js').SlurmJob} */
function pendingSlurm() {
  return {
    adapter: 'slurm',
    ssh_host: 'wallace',
    job_id: '249043',
    submitted_at: '2026-09-21T00:00:00Z',
    log_path: '/logs/job.log',
    expected: ['/work/result'],
    state: 'PENDING'
  };
}

/** @returns {import('./store.js').SjobLocalJob} */
function localRun() {
  return {
    adapter: 'sjob_local',
    ssh_host: 'wallace',
    local_id: 'L003',
    pid: 4242,
    process_start: '',
    workdir: '/work',
    log_path: '/home/u/.sjob/logs/run.log',
    exitcode_path: '/home/u/.sjob/local/L003.exitcode',
    submitted_at: '2026-09-21T00:00:00Z',
    expected: ['/work/result'],
    cpus: 16,
    mem_gb: 64,
    takeover_from: {
      job_id: '249043',
      at: '2026-09-21T00:00:00Z',
      cancel_failed: true
    }
  };
}

test('stores and rereads a takeover marker and a local run', () => {
  const marked = store.insert(
    workspace,
    input({
      jobs: [
        {
          ...pendingSlurm(),
          takeover: {
            state: 'unknown',
            requested_at: '2026-09-21T00:00:00Z',
            cpus: 16,
            mem_gb: 64,
            operator: true
          }
        }
      ]
    })
  );
  const local = store.update(workspace, marked.wait_id, (current) => {
    current.jobs[0] = localRun();
  });

  const reread = createExternalWaitStore({ filePathFor: () => file });

  expect(reread.get(workspace, marked.wait_id)).toEqual(local);
  expect(local.jobs[0]).toMatchObject({ adapter: 'sjob_local' });
});

test.each([
  ['a marker state outside the contract', { state: 'operator' }],
  ['a marker without resources', { cpus: 0 }],
  ['a marker without a request time', { requested_at: 'now' }]
])('rejects %s', (_label, patch) => {
  const record = store.insert(workspace, input({ jobs: [pendingSlurm()] }));

  const write = () =>
    store.update(workspace, record.wait_id, (current) => {
      Object.assign(current.jobs[0], {
        takeover: {
          state: 'pending',
          requested_at: '2026-09-21T00:00:00Z',
          cpus: 16,
          mem_gb: 64,
          ...patch
        }
      });
    });

  expect(write).toThrow('Invalid external wait job identity');
  expect(store.get(workspace, record.wait_id)).toEqual(record);
});

test.each([
  ['a relative exitcode path', { exitcode_path: 'L003.exitcode' }],
  ['a malformed local id', { local_id: '3' }],
  ['a missing takeover origin', { takeover_from: undefined }],
  ['zero cpus', { cpus: 0 }]
])('rejects a local run with %s', (_label, patch) => {
  const insert = () =>
    store.insert(
      workspace,
      input({
        jobs: [
          /** @type {import('./store.js').SjobLocalJob} */ ({
            ...localRun(),
            ...patch
          })
        ]
      })
    );

  expect(insert).toThrow('Invalid external wait job identity');
});
