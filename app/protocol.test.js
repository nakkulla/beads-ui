import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  MESSAGE_TYPES,
  decodeReply,
  decodeRequest,
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
