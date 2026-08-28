/**
 * The §9 transport of a bead's Worker history: the `get-bead-timeline` request
 * and the `bead_timelines` snapshot decoration.
 */
import { describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {Record<string, any[]>} */
  timelines: {},
  /** @type {Record<string, any>} */
  attempts: {},
  /** @type {Record<string, any[]>} */
  bead_attempts: {},
  /** @type {Set<string>} */
  existing_logs: new Set(),
  /** @type {Set<string>} */
  unreadable_logs: new Set()
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      readAttemptsForBead: (
        /** @type {string} */ _workspace,
        /** @type {string} */ bead_id
      ) => state.bead_attempts[bead_id] || []
    }
  })
}));

vi.mock('../worker/attach.js', () => ({
  readBeadTimeline: (
    /** @type {string} */ _workspace,
    /** @type {string} */ bead_id,
    /** @type {{ limit?: number }} */ options = {}
  ) => {
    const all = state.timelines[bead_id] || [];
    const limit = typeof options.limit === 'number' ? options.limit : Infinity;
    return limit >= all.length ? all : all.slice(all.length - limit);
  }
}));

vi.mock('../worker/session-log.js', () => ({
  beadOfTransferredAttempt: () => null,
  resolveSessionLogRead: (/** @type {any} */ input) => {
    const path = String(input.log_path);
    if (state.unreadable_logs.has(path)) {
      return { status: 'unreadable', path, gzipped: false };
    }
    return state.existing_logs.has(path)
      ? { status: 'ok', path, gzipped: false }
      : { status: 'expired', path: null, gzipped: false };
  }
}));

const { setConnWorkspace } = await import('./context.js');
const { handleGetBeadTimeline, beadTimelinesFor } =
  await import('./worker-handlers.js');

const WS = '/tmp/example-workspace/project-a';

/**
 * @returns {any}
 */
function fakeSocket() {
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
  setConnWorkspace(/** @type {any} */ (sock), { root_dir: WS, db_path: '' });
  return sock;
}

/**
 * @param {any} sock
 * @returns {any}
 */
function lastPayload(sock) {
  return JSON.parse(sock.sent[sock.sent.length - 1]).payload;
}

/**
 * @param {string} event_id
 * @param {number} at
 * @returns {any}
 */
function event(event_id, at) {
  return {
    event_id,
    at,
    bead_id: 'UI-1',
    kind: 'session_ended',
    summary: `요약 ${event_id}`
  };
}

describe('get-bead-timeline (record-timeline-retention §9)', () => {
  test("returns a bead's whole timeline newest first", () => {
    state.timelines = { 'UI-1': [event('e1', 1000), event('e2', 2000)] };
    const sock = fakeSocket();

    handleGetBeadTimeline(sock, {
      id: 'r1',
      type: 'get-bead-timeline',
      payload: { bead_id: 'UI-1' }
    });

    expect(lastPayload(sock).bead_id).toBe('UI-1');
    expect(
      lastPayload(sock).events.map((/** @type {any} */ e) => e.event_id)
    ).toEqual(['e2', 'e1']);
  });

  test("returns the bead's attempt union alongside its events", () => {
    // A bead whose finished records already left `queue.json` (§7): the client
    // store cannot see them, so the detail panel's 세션 이력 and 총 사용량 read
    // this list.
    state.timelines = { 'UI-1': [event('e1', 1000)] };
    state.bead_attempts = {
      'UI-1': [
        { attempt_id: 'a-old', bead_id: 'UI-1', status: 'done' },
        { attempt_id: 'a-new', bead_id: 'UI-1', status: 'running' }
      ]
    };
    const sock = fakeSocket();

    handleGetBeadTimeline(sock, {
      id: 'r1',
      type: 'get-bead-timeline',
      payload: { bead_id: 'UI-1' }
    });

    expect(
      lastPayload(sock).attempts.map((/** @type {any} */ a) => a.attempt_id)
    ).toEqual(['a-old', 'a-new']);
  });

  test('returns an empty list for an unknown bead', () => {
    state.timelines = { 'UI-1': [event('e1', 1000)] };
    const sock = fakeSocket();

    handleGetBeadTimeline(sock, {
      id: 'r1',
      type: 'get-bead-timeline',
      payload: { bead_id: 'UI-nope' }
    });

    expect(lastPayload(sock)).toEqual({
      bead_id: 'UI-nope',
      events: [],
      attempts: []
    });
  });

  test('refuses a payload with no bead id', () => {
    const sock = fakeSocket();

    handleGetBeadTimeline(sock, {
      id: 'r1',
      type: 'get-bead-timeline',
      payload: {}
    });

    expect(JSON.parse(sock.sent[0]).error.code).toBe('bad_request');
  });
});

describe('bead_timelines snapshot decoration (§9)', () => {
  test('carries the last five events of a failed bead', () => {
    state.timelines = {
      'UI-1': [1, 2, 3, 4, 5, 6, 7].map((n) => event(`e${n}`, n * 1000))
    };
    state.existing_logs = new Set(['/w/UI-1/a1.jsonl']);
    state.attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'failed',
        finished_at: 10,
        log_path: '/w/UI-1/a1.jsonl'
      }
    };

    const out = beadTimelinesFor(WS, { attempts: state.attempts });

    expect(
      out['UI-1'].events.map((/** @type {any} */ e) => e.event_id)
    ).toEqual(['e3', 'e4', 'e5', 'e6', 'e7']);
    expect(out['UI-1'].log_path).toBe('/w/UI-1/a1.jsonl');
    expect(out['UI-1'].log_expired).toBe(false);
  });

  test('marks a log the resolution order could not read as unreadable', () => {
    state.timelines = { 'UI-1': [event('e1', 1000)] };
    state.existing_logs = new Set();
    state.unreadable_logs = new Set(['/w/UI-1/a1.jsonl']);
    state.attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'failed',
        log_path: '/w/UI-1/a1.jsonl'
      }
    };

    const out = beadTimelinesFor(WS, { attempts: state.attempts });

    expect(out['UI-1'].log_unreadable).toBe(true);
    expect(out['UI-1'].log_expired).toBe(false);
    state.unreadable_logs = new Set();
  });

  test('marks a stored log the resolution order no longer finds as expired', () => {
    state.timelines = { 'UI-1': [event('e1', 1000)] };
    state.existing_logs = new Set();
    state.attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'parked',
        log_path: '/w/UI-1/a1.jsonl'
      }
    };

    const out = beadTimelinesFor(WS, { attempts: state.attempts });

    expect(out['UI-1'].log_expired).toBe(true);
    expect(out['UI-1'].log_path).toBeNull();
  });

  test('omits a bead whose card shows neither a failure nor a park', () => {
    state.timelines = { 'UI-1': [event('e1', 1000)] };
    state.existing_logs = new Set();
    state.attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', status: 'running' }
    };

    const out = beadTimelinesFor(WS, { attempts: state.attempts });

    expect(out).toEqual({});
  });

  test('omits a failed bead with no events and no log', () => {
    state.timelines = {};
    state.existing_logs = new Set();
    state.attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', status: 'failed' }
    };

    const out = beadTimelinesFor(WS, { attempts: state.attempts });

    expect(out).toEqual({});
  });
});
