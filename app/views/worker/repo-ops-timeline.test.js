import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import {
  repoOpsTimelineTemplate,
  timelineEvents
} from './repo-ops-timeline.js';

/**
 * @param {Record<string, any>} [patch]
 */
function operation(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    state: 'succeeded',
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    requested_at: 100,
    finished_at: 200,
    ...patch
  };
}

/**
 * @param {Record<string, any>} [patch]
 */
function cleanup(patch = {}) {
  return {
    bead_id: 'UI-a',
    step: 'child_sweep',
    reason: 'x',
    at: 300,
    ...patch
  };
}

describe('timelineEvents', () => {
  test('merges operations and cleanups into one newest-first list', () => {
    const events = timelineEvents([operation()], [cleanup()]);

    expect(events.map((event) => event.type)).toEqual(['cleanup', 'operation']);
  });

  test('sorts an operation by its finish time', () => {
    const events = timelineEvents(
      [operation({ operation_id: 'old', finished_at: 10 }), operation()],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['op-1', 'old']);
  });

  test('falls back to the request time when nothing finished', () => {
    const events = timelineEvents([operation({ finished_at: null })], []);

    expect(events[0].at).toBe(100);
  });

  test('sorts an event with no time to the oldest end', () => {
    const events = timelineEvents(
      [
        operation({
          operation_id: 'timeless',
          finished_at: null,
          requested_at: null
        }),
        operation({ operation_id: 'timed', finished_at: 5 })
      ],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['timed', 'timeless']);
  });

  test('orders two timeless events by id so the list is stable', () => {
    const events = timelineEvents(
      [
        operation({ operation_id: 'b', finished_at: null, requested_at: null }),
        operation({ operation_id: 'a', finished_at: null, requested_at: null })
      ],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['a', 'b']);
  });

  test('caps the list at twenty events', () => {
    const events = timelineEvents(
      Array.from({ length: 30 }, (_unused, index) =>
        operation({ operation_id: `op-${index}`, finished_at: index })
      ),
      []
    );

    expect(events).toHaveLength(20);
  });

  test('keeps the newest events when it caps', () => {
    const events = timelineEvents(
      Array.from({ length: 25 }, (_unused, index) =>
        operation({ operation_id: `op-${index}`, finished_at: index })
      ),
      []
    );

    expect(events[0].id).toBe('op-24');
  });

  test('renders nothing from absent projections', () => {
    expect(timelineEvents(undefined, null)).toEqual([]);
  });

  test('skips a malformed row rather than throwing', () => {
    const events = timelineEvents([null, operation()], [undefined]);

    expect(events).toHaveLength(1);
  });

  test('renders retry pending as 재시도 중', () => {
    const mount = document.createElement('div');
    const events = timelineEvents(
      [operation({ state: 'retry_pending', finished_at: null })],
      []
    );

    render(repoOpsTimelineTemplate({ events, repo: '/repo' }), mount);

    expect(mount.querySelector('.worker-ev__st')?.textContent).toBe(
      '재시도 중'
    );
  });

  test('offers a resolve entry on an eligible cleanup row', () => {
    const mount = document.createElement('div');
    const events = timelineEvents([], [cleanup({ repair_eligible: true })]);

    render(repoOpsTimelineTemplate({ events, repo: '/repo' }), mount);

    expect(
      mount
        .querySelector('.worker-repo-op__resolve')
        ?.getAttribute('data-operation-id')
    ).toBe('cleanup:UI-a');
  });

  test('omits the resolve entry on a cleanup row the server did not mark eligible', () => {
    const mount = document.createElement('div');
    const events = timelineEvents([], [cleanup()]);

    render(repoOpsTimelineTemplate({ events, repo: '/repo' }), mount);

    expect(mount.querySelector('.worker-repo-op__resolve')).toBeNull();
  });
});
