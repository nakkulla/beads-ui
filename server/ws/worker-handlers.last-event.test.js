import { describe, expect, test, vi } from 'vitest';

/** @type {Record<string, number>} */
let last_events = {};
/** @type {Record<string, any>} */
let live_usage = {};

// The projection reads both live stores off the shared runtime; nothing else in
// it is exercised here.
vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    usageStore: {
      /**
       * @param {string} workspace
       * @param {string} attempt_id
       */
      get(workspace, attempt_id) {
        void workspace;
        return live_usage[attempt_id] || null;
      }
    },
    sessionLog: {
      /**
       * @param {string} workspace
       * @param {string} attempt_id
       */
      lastEventAt(workspace, attempt_id) {
        void workspace;
        const at = last_events[attempt_id];
        return typeof at === 'number' ? at : null;
      }
    }
  })
}));

const { attemptsWithUsage } = await import('./worker-handlers.js');

const WS = '/tmp/example-workspace/project-a';

describe('attemptsWithUsage last_event_at projection (UI-53es §1)', () => {
  test('folds last_event_at onto a running attempt', () => {
    last_events = { a1: 1_700_000_000_000 };
    live_usage = {};

    const out = attemptsWithUsage(
      { attempts: { a1: { attempt_id: 'a1', status: 'running' } } },
      WS
    );

    expect(/** @type {any} */ (out.a1).last_event_at).toBe(1_700_000_000_000);
  });

  test('leaves a terminated attempt untouched', () => {
    last_events = { a1: 1_700_000_000_000 };
    live_usage = {};

    const out = attemptsWithUsage(
      { attempts: { a1: { attempt_id: 'a1', status: 'failed' } } },
      WS
    );

    expect(/** @type {any} */ (out.a1).last_event_at).toBe(undefined);
  });

  test('omits the key when the broker has seen no line for the attempt', () => {
    last_events = {};
    live_usage = {};

    const out = attemptsWithUsage(
      { attempts: { a1: { attempt_id: 'a1', status: 'running' } } },
      WS
    );

    expect('last_event_at' in /** @type {any} */ (out.a1)).toBe(false);
  });

  test('keeps the live usage tally alongside it', () => {
    last_events = { a1: 42 };
    live_usage = { a1: { input_tokens: 10 } };

    const out = attemptsWithUsage(
      { attempts: { a1: { attempt_id: 'a1', status: 'running' } } },
      WS
    );

    expect(/** @type {any} */ (out.a1).usage).toEqual({ input_tokens: 10 });
    expect(/** @type {any} */ (out.a1).last_event_at).toBe(42);
  });
});
