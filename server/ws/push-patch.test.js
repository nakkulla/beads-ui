import { describe, expect, test } from 'vitest';
import {
  canonicalJson,
  splitMonitorPipeline,
  splitWorkerQueue
} from '../../app/data/keyed-patch.js';
import { isMessageType } from '../../app/protocol.js';
import { pushKeyed } from './push-patch.js';

/** @import { KeyedSubscriber } from './push-patch.js' */

function fixture() {
  /** @type {any[]} */
  const frames = [];
  const socket = {
    fail: false,
    /** @param {string} raw */
    send(raw) {
      if (socket.fail) {
        throw new Error('socket closed');
      }
      frames.push(JSON.parse(raw));
    }
  };
  /** @type {KeyedSubscriber} */
  const sub = { ws: /** @type {any} */ (socket), client_id: 'queue:1' };
  return { sub, socket, frames };
}

/** @param {import('../../app/data/keyed-patch.js').KeyedMap} values */
function prepare(values) {
  return {
    values,
    canonical: new Map(
      [...values].map(([key, value]) => [key, canonicalJson(value)])
    )
  };
}

/**
 * @param {KeyedSubscriber} sub
 * @param {Record<string, unknown>} queue
 */
function pushQueue(sub, queue) {
  const body = { root_dir: '/tmp/repos/a', queue };
  return pushKeyed(sub, 'worker-queue', body, prepare(splitWorkerQueue(body)));
}

describe('pushKeyed', () => {
  test('sends snapshot then patch, skips equal values, and unsets removed keys', () => {
    const { sub, frames } = fixture();

    pushQueue(sub, { revision: 1, attempts: { 'UI-1-100-1': { a: 1, b: 2 } } });
    pushQueue(sub, { revision: 2, attempts: { 'UI-1-100-1': { a: 1, b: 2 } } });
    const skipped = pushQueue(sub, {
      attempts: { 'UI-1-100-1': { b: 2, a: 1 } },
      revision: 2
    });
    pushQueue(sub, { revision: 2, attempts: {} });

    expect(skipped).toBe(false);
    expect(frames.map((frame) => [frame.type, frame.payload.seq])).toEqual([
      ['worker-queue-snapshot', 1],
      ['worker-queue-patch', 2],
      ['worker-queue-patch', 3]
    ]);
    expect(frames[0]).toMatchObject({
      id: expect.stringMatching(/^evt-\d+$/),
      ok: true,
      payload: {
        type: 'worker-queue-snapshot',
        id: 'queue:1',
        seq: 1,
        root_dir: '/tmp/repos/a',
        queue: { revision: 1 }
      }
    });
    expect(frames[1].payload).toEqual({
      type: 'worker-queue-patch',
      id: 'queue:1',
      seq: 2,
      root_dir: '/tmp/repos/a',
      set: { 'queue/revision': 2 },
      unset: []
    });
    expect(frames[2].payload).toMatchObject({
      set: {},
      unset: ['attempts/UI-1-100-1']
    });
  });

  test('retries a failed initial send at sequence one', () => {
    const { sub, socket, frames } = fixture();
    socket.fail = true;

    const failed = pushQueue(sub, { revision: 1 });

    expect(failed).toBe(false);
    expect(sub.seq).toBeUndefined();
    expect(sub.last).toBeUndefined();
    socket.fail = false;
    pushQueue(sub, { revision: 1 });
    expect(frames[0].payload.seq).toBe(1);
  });

  test('preserves the baseline and sequence when a patch send fails', () => {
    const { sub, socket, frames } = fixture();
    pushQueue(sub, { revision: 1 });
    const baseline = sub.last;
    socket.fail = true;

    const failed = pushQueue(sub, { revision: 2 });

    expect(failed).toBe(false);
    expect(sub.seq).toBe(1);
    expect(sub.last).toBe(baseline);
    socket.fail = false;
    pushQueue(sub, { revision: 2 });
    expect(frames[1].payload).toMatchObject({
      seq: 2,
      set: { 'queue/revision': 2 }
    });
  });

  test('shares prepared maps without sharing subscriber sequences', () => {
    const first = fixture();
    const second = fixture();
    const body = { workspaces: [], workspaces_state: [] };
    const keyed = prepare(splitMonitorPipeline(body));

    pushKeyed(first.sub, 'monitor-pipeline', body, keyed);
    pushKeyed(second.sub, 'monitor-pipeline', body, keyed);

    expect(first.sub.last).toBe(second.sub.last);
    expect(first.frames[0].payload).toEqual({
      type: 'monitor-pipeline-snapshot',
      id: 'queue:1',
      seq: 1,
      ...body
    });
  });

  test('omits workspace addressing from monitor patches', () => {
    const { sub, frames } = fixture();
    const first = { workspaces: [], workspaces_state: [] };
    const next = {
      workspaces: [],
      workspaces_state: [{ root_dir: '/repo', revision: 2 }]
    };

    pushKeyed(
      sub,
      'monitor-pipeline',
      first,
      prepare(splitMonitorPipeline(first))
    );
    pushKeyed(
      sub,
      'monitor-pipeline',
      next,
      prepare(splitMonitorPipeline(next))
    );

    expect(frames[1].payload).toEqual({
      type: 'monitor-pipeline-patch',
      id: 'queue:1',
      seq: 2,
      set: {
        'state-order': ['/repo'],
        'state//repo': next.workspaces_state[0]
      },
      unset: []
    });
  });

  test('recognizes both patch message types in the protocol', () => {
    expect(isMessageType('worker-queue-patch')).toBe(true);
    expect(isMessageType('monitor-pipeline-patch')).toBe(true);
  });
});
