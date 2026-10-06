import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  MESSAGE_TYPES,
  decodeReply,
  decodeRequest,
  externalJobIdentity,
  isExternalWaitObservation,
  isMessageType,
  isReply,
  isRequest,
  makeError,
  makeOk,
  makeRequest
} from './protocol.js';

describe('protocol', () => {
  test('accepts the common Worker address request', () => {
    const payload = { value: null, expected_revision: 'missing' };

    const request = makeRequest('set-worker-url-common', payload);

    expect(isRequest(request)).toBe(true);
    expect(MESSAGE_TYPES).toContain('set-worker-url-common');
  });
  test.each(
    /** @type {const} */ ([
      'external_wait_check',
      'external_wait_stop',
      'external_wait_resume'
    ])
  )('accepts %s operations', (op) => {
    const payload = { root_dir: '/repo', wait_id: 'w-0123456789ab' };

    const request = makeRequest(op, payload);

    expect(isRequest(request)).toBe(true);
    expect(MESSAGE_TYPES).toContain(op);
    expect(request.payload).toEqual(payload);
  });

  /**
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function externalWait(patch = {}) {
    return {
      wait_id: 'w-0123456789ab',
      root_dir: '/repo',
      bead_id: 'A-1',
      owner_kind: 'worker',
      stage: 'detached',
      budget: { turns_total: 3, turns_used: 3 },
      registered_at: '2026-09-21T00:00:00Z',
      next_observation_at: '2026-09-21T03:14:00Z',
      error_count: 0,
      last_error: null,
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '42',
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/job.log',
          state: 'RUNNING',
          observed_at: '2026-09-21T03:12:00Z',
          terminal: null
        }
      ],
      completion: null,
      resume: null,
      ...patch
    };
  }

  test('accepts the public record projection', () => {
    expect(isExternalWaitObservation(externalWait())).toBe(true);
  });

  test.each([
    { owner: { session_ref: 'secret' } },
    { worktree: '/private' },
    { stage: 'active' },
    { error_count: '3' },
    { wait_id: 'bad' }
  ])('rejects private or malformed fields %j', (patch) => {
    expect(isExternalWaitObservation(externalWait(patch))).toBe(false);
  });

  test('accepts slurm sub-job display fields (UI-q15q §3.4)', () => {
    const record = externalWait();
    record.jobs[0] = {
      ...record.jobs[0],
      name: 'snake__20260921_090000_ab12',
      anchor: {
        user: 'alice',
        workdir: '/work',
        started_at: '2026-09-21T09:00:00'
      },
      spawned: {
        total: 0,
        counts: { running: 0, pending: 0, completed: 0, failed: 0, unknown: 0 },
        rows: [],
        omitted: 0
      }
    };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(true);
  });

  test.each([
    { name: 42 },
    { anchor: { user: 'alice' } },
    { spawned: { total: 1, counts: {}, rows: 'x', omitted: 0 } }
  ])('rejects malformed sub-job display fields %j', (patch) => {
    const record = externalWait();
    record.jobs[0] = { ...record.jobs[0], ...patch };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(false);
  });

  const CAPACITY = {
    reason: 'Resources',
    est_start: '2026-10-08T13:38:00',
    partition: 'normal',
    ahead: { jobs: 39, cpus: 624 },
    slurm: {
      cpu_alloc: 112,
      cpu_total: 112,
      mem_alloc_mb: 512000,
      mem_total_mb: 1031000
    },
    host: { name: 'wallace', cpus: 112, load1: 61.2, mem_available_mb: 902000 },
    observed_at: '2026-10-06T06:00:00.000Z'
  };

  test('accepts the slurm pending capacity field (UI-qbgj §3.1)', () => {
    const record = externalWait();
    record.jobs[0] = {
      ...record.jobs[0],
      state: 'PENDING',
      capacity: CAPACITY
    };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(true);
  });

  test('accepts a capacity without an estimate or host', () => {
    const record = externalWait();
    record.jobs[0] = {
      ...record.jobs[0],
      capacity: { ...CAPACITY, est_start: null, host: null }
    };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(true);
  });

  test.each(['no_launch_record', 'workflow_local_profile_missing'])(
    'accepts the takeover blocker %s',
    (takeover_blocker) => {
      const record = externalWait();
      record.jobs[0] = {
        ...record.jobs[0],
        capacity: { ...CAPACITY, takeover_blocker }
      };

      const valid = isExternalWaitObservation(record);

      expect(valid).toBe(true);
    }
  );

  test.each([
    ['a non-object capacity', 'x'],
    ['a missing reason', { ...CAPACITY, reason: '' }],
    [
      'a non-integer ahead count',
      { ...CAPACITY, ahead: { jobs: 1.5, cpus: 2 } }
    ],
    ['a missing slurm total', { ...CAPACITY, slurm: { cpu_alloc: 1 } }],
    ['a malformed host', { ...CAPACITY, host: { name: 'wallace', cpus: 4 } }],
    ['a non-string estimate', { ...CAPACITY, est_start: 5 }],
    [
      'an unknown takeover blocker',
      { ...CAPACITY, takeover_blocker: 'unknown' }
    ],
    ['a null takeover blocker', { ...CAPACITY, takeover_blocker: null }]
  ])('rejects %s', (_label, capacity) => {
    const record = externalWait();
    record.jobs[0] = { ...record.jobs[0], capacity };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(false);
  });

  test('rejects a capacity on a process job', () => {
    const record = externalWait();
    record.jobs[0] = {
      adapter: 'process',
      pid: 42,
      submitted_at: '2026-09-21T00:00:00Z',
      log_path: '/logs/job.log',
      terminal: null,
      capacity: CAPACITY
    };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(false);
  });

  const LOCAL_RUN = {
    adapter: 'sjob_local',
    ssh_host: 'wallace',
    local_id: 'L003',
    pid: 4242,
    cpus: 16,
    mem_gb: 64,
    takeover_from: {
      job_id: '249043',
      at: '2026-10-06T08:00:00.000Z',
      cancel_failed: true
    },
    submitted_at: '2026-10-06T08:00:00.000Z',
    log_path: '/home/u/.sjob/logs/run.log',
    state: 'RUNNING',
    terminal: null
  };
  const MARKER = {
    state: 'unknown',
    requested_at: '2026-10-06T08:00:00.000Z',
    cpus: 16,
    mem_gb: 64
  };

  test('accepts a takeover local run (UI-qbgj §3.5)', () => {
    const record = externalWait();
    record.jobs[0] = LOCAL_RUN;

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(true);
  });

  test('accepts a takeover marker on a slurm job (UI-qbgj §3.4)', () => {
    const record = externalWait();
    record.jobs[0] = { ...record.jobs[0], state: 'PENDING', takeover: MARKER };

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(true);
  });

  test.each([
    ['a local run without its origin', { ...LOCAL_RUN, takeover_from: null }],
    ['a local run with zero cpus', { ...LOCAL_RUN, cpus: 0 }],
    ['a local run with a malformed id', { ...LOCAL_RUN, local_id: '3' }],
    ['a local run carrying a marker', { ...LOCAL_RUN, takeover: MARKER }],
    [
      'a marker state outside the contract',
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '249043',
        submitted_at: '2026-10-06T08:00:00.000Z',
        log_path: '/logs/job.log',
        terminal: null,
        takeover: { ...MARKER, state: 'operator' }
      }
    ]
  ])('rejects %s', (_label, job) => {
    const record = externalWait();
    record.jobs[0] = job;

    const valid = isExternalWaitObservation(record);

    expect(valid).toBe(false);
  });

  test('registers the takeover message type', () => {
    expect(MESSAGE_TYPES).toContain('external_wait_takeover');
  });

  test.each([
    [{ adapter: 'slurm', job_id: '249043', pid: 1 }, '249043'],
    [{ adapter: 'process', pid: 4242 }, '4242'],
    [
      { adapter: 'sjob_local', ssh_host: 'wallace', local_id: 'L003' },
      'wallace:L003'
    ]
  ])('names external job %j as %s', (job, identity) => {
    expect(externalJobIdentity(job)).toBe(identity);
  });

  test('version and message types', () => {
    expect(Array.isArray(MESSAGE_TYPES)).toBe(true);
    expect(MESSAGE_TYPES.length).toBeGreaterThan(3);
    expect(isMessageType('edit-text')).toBe(true);
    expect(isMessageType('unknown-type')).toBe(false);
  });

  test('makeRequest / isRequest / decodeRequest', () => {
    const req = makeRequest(
      'edit-text',
      { id: 'UI-1', field: 'title', value: 'X' },
      'r-1'
    );
    expect(isRequest(req)).toBe(true);
    const round = decodeRequest(JSON.parse(JSON.stringify(req)));
    expect(round.id).toBe('r-1');
    expect(round.type).toBe('edit-text');
  });

  test('makeOk / makeError / isReply / decodeReply', () => {
    const req = makeRequest(
      'edit-text',
      { id: 'UI-1', field: 'title', value: 'T' },
      'r-2'
    );
    const ok = makeOk(req, { id: 'UI-1', title: 'T' });
    expect(isReply(ok)).toBe(true);
    const ok2 = decodeReply(JSON.parse(JSON.stringify(ok)));
    expect(ok2.ok).toBe(true);

    const err = makeError(req, 'not_found', 'Issue not found');
    expect(isReply(err)).toBe(true);
    const err2 = decodeReply(JSON.parse(JSON.stringify(err)));
    expect(err2.ok).toBe(false);
    if (!('error' in err2) || !err2.error) {
      throw new Error('Expected error to be present when ok=false');
    }
    expect(err2.error.code).toBe('not_found');
  });

  test('invalid envelopes are rejected', () => {
    expect(() => decodeRequest({})).toThrow();
    expect(() => decodeReply({ ok: true })).toThrow();
  });
});

describe('server/protocol', () => {
  test('isMessageType returns true for known type', () => {
    const res = isMessageType('edit-text');

    expect(res).toBe(true);
  });

  test('isMessageType returns true for git-pull-workspace', () => {
    const res = isMessageType('git-pull-workspace');

    expect(res).toBe(true);
  });

  test('isMessageType returns true for worker-automation-toggle', () => {
    const res = isMessageType('worker-automation-toggle');

    expect(res).toBe(true);
  });

  test('isMessageType returns true for worker-cleanup-retry', () => {
    const res = isMessageType('worker-cleanup-retry');

    expect(res).toBe(true);
  });

  test('rejects the retired parked retry message', () => {
    const retired_type = ['worker', 'parked', 'retry'].join('-');

    expect(isMessageType(retired_type)).toBe(false);
  });

  test('isMessageType returns false for unknown type', () => {
    const res = isMessageType('not-a-type');

    expect(res).toBe(false);
  });

  test('makeRequest and decodeRequest round-trip', () => {
    const req = makeRequest(
      'edit-text',
      { id: 'UI-9', field: 'title', value: 'X' },
      'r-9'
    );

    const decoded = decodeRequest(JSON.parse(JSON.stringify(req)));

    expect(isRequest(req)).toBe(true);
    expect(decoded.id).toBe('r-9');
    expect(decoded.type).toBe('edit-text');
  });

  test('makeOk and makeError create valid replies', () => {
    const req = makeRequest(
      'edit-text',
      { id: 'UI-1', field: 'title', value: 'T' },
      'r-10'
    );

    const ok = makeOk(req, [{ id: 'UI-1' }]);
    const err = makeError(req, 'boom', 'Something went wrong');

    expect(isReply(ok)).toBe(true);
    expect(isReply(err)).toBe(true);
    expect(ok.ok).toBe(true);
    expect(err.ok).toBe(false);
  });

  test('decodeReply accepts ok and error envelopes', () => {
    const req = makeRequest('edit-text', { id: 'UI-1', text: 'x' }, 'r-11');
    const ok = makeOk(req, { id: 'UI-1' });
    const err = makeError(req, 'validation', 'Invalid');

    const ok2 = decodeReply(JSON.parse(JSON.stringify(ok)));
    const err2 = decodeReply(JSON.parse(JSON.stringify(err)));

    expect(ok2.ok).toBe(true);
    expect(err2.ok).toBe(false);
  });

  test('invalid envelopes throw on decode', () => {
    expect(() => decodeRequest({})).toThrow();
    expect(() => decodeReply({ ok: true })).toThrow();
  });

  test('exports protocol constants', () => {
    expect(Array.isArray(MESSAGE_TYPES)).toBe(true);
    expect(MESSAGE_TYPES.length).toBeGreaterThan(0);
  });

  test('rejects retired connected-lane message types', () => {
    expect(MESSAGE_TYPES).not.toEqual(
      expect.arrayContaining(['monitor-lane-provenance', 'worker-queue-arm'])
    );
  });

  test('drops the retired master automation switch', () => {
    expect(MESSAGE_TYPES).not.toContain('monitor-auto-toggle');
  });

  test('registers the queue start-now message type', () => {
    expect(MESSAGE_TYPES).toContain('worker-queue-start-now');
  });

  test('registers the ADR channel message types and documents them', () => {
    const doc = readFileSync('app/protocol.md', 'utf8');
    const adr_types = ['subscribe-adr', 'unsubscribe-adr', 'adr-snapshot'];

    const undocumented = adr_types.filter((type) => !doc.includes(type));

    expect(MESSAGE_TYPES).toEqual(expect.arrayContaining(adr_types));
    expect(undocumented).toEqual([]);
  });

  test('registers every client-sent server dispatch type', () => {
    const connection_source = readFileSync('server/ws/connection.js', 'utf8');
    const dispatch_types = [
      ...connection_source.matchAll(/case '([a-z0-9-]+)':/g)
    ]
      .map((match) => match[1])
      .filter((type) => type !== 'ping');
    const missing_types = dispatch_types.filter(
      (type) => !MESSAGE_TYPES.includes(/** @type {any} */ (type))
    );

    expect(
      missing_types,
      `MESSAGE_TYPES에 없는 서버 메시지 타입: ${missing_types.join(', ')}`
    ).toEqual([]);
  });
});
