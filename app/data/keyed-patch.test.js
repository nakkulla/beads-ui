import { describe, expect, test } from 'vitest';
import {
  applyPatch,
  assembleMonitorPipeline,
  assembleWorkerQueue,
  canonicalJson,
  splitMonitorPipeline,
  splitWorkerQueue
} from './keyed-patch.js';

const ATTEMPT_ID = 'UI-defk-1789459200000-1';
const ATTEMPT = {
  attempt_id: ATTEMPT_ID,
  status: 'running',
  usage: { input: 4 }
};
const QUEUE = {
  revision: 2,
  queue: [{ bead_id: 'UI-defk' }],
  attempts: { [ATTEMPT_ID]: ATTEMPT },
  exec_defaults: { impl_runtime: 'codex' }
};

describe('canonicalJson', () => {
  test('ignores recursive object key order and undefined fields', () => {
    const first = { z: [{ b: 2, a: 1 }], a: { y: 3, x: undefined } };
    const second = { a: { y: 3 }, z: [{ a: 1, b: 2 }] };

    expect(canonicalJson(first)).toBe(canonicalJson(second));
  });

  test('preserves array ordering and JSON null slots', () => {
    expect(canonicalJson([undefined, 1, 2])).toBe('[null,1,2]');
    expect(canonicalJson([1, 2])).not.toBe(canonicalJson([2, 1]));
  });
});

describe('worker queue codec', () => {
  test('round-trips all queue fields through the specified keys', () => {
    const body = { root_dir: '/tmp/repos/a', queue: QUEUE };

    const map = splitWorkerQueue(body);

    expect([...map.keys()]).toEqual([
      'root_dir',
      'queue/revision',
      'queue/queue',
      `attempts/${ATTEMPT_ID}`,
      'queue/exec_defaults'
    ]);
    expect(assembleWorkerQueue(map)).toEqual(body);
  });

  test('assembles an empty attempts record after the last attempt disappears', () => {
    const map = splitWorkerQueue({ root_dir: '/repo', queue: QUEUE });

    const next = applyPatch(map, {
      set: {},
      unset: [`attempts/${ATTEMPT_ID}`]
    });

    expect(assembleWorkerQueue(next).queue.attempts).toEqual({});
  });

  test('uses slash-free bead-epoch-counter attempt identifiers', () => {
    expect(ATTEMPT_ID).toMatch(/^UI-defk-\d+-\d+$/);
    expect(ATTEMPT.attempt_id).not.toContain('/');
  });
});

describe('monitor pipeline codec', () => {
  test('round-trips ordered nested root paths without mixing their fields', () => {
    const body = {
      workspaces: [
        { root_dir: '/tmp/repos/a/nested', name: 'nested', ...QUEUE },
        { root_dir: '/tmp/repos/a', name: 'a', ...QUEUE, attempts: {} },
        { root_dir: '/tmp/repos/a/attempts/child', name: 'child', ...QUEUE }
      ],
      workspaces_state: [
        { root_dir: '/tmp/repos/a', revision: 2 },
        { root_dir: '/tmp/empty', revision: 0 }
      ]
    };

    const map = splitMonitorPipeline(body);

    expect(map.get('ws-order')).toEqual(
      body.workspaces.map((entry) => entry.root_dir)
    );
    expect(map.get(`ws//tmp/repos/a/nested/attempts/${ATTEMPT_ID}`)).toBe(
      ATTEMPT
    );
    expect(map.get('ws//tmp/repos/a/nested/name')).toBe('nested');
    expect(map.has('ws//tmp/repos/a/nested/queue/revision')).toBe(false);
    expect(assembleMonitorPipeline(map)).toEqual(body);
  });

  test('skips ordered workspaces and states with no entry keys', () => {
    const body = {
      workspaces: [{ root_dir: '/repo/child', name: 'child', attempts: {} }],
      workspaces_state: [{ root_dir: '/repo/child' }]
    };
    const map = splitMonitorPipeline(body);
    map.set('ws-order', ['/repo', '/missing', '/repo/child']);
    map.set('state-order', ['/missing', '/repo/child']);

    expect(assembleMonitorPipeline(map)).toEqual(body);
  });

  test('round-trips an empty monitor body', () => {
    const body = { workspaces: [], workspaces_state: [] };

    expect(assembleMonitorPipeline(splitMonitorPipeline(body))).toEqual(body);
  });

  test('separates a workspace named attempts from its parent attempt keys', () => {
    const body = {
      workspaces: [
        { root_dir: '/repo', name: 'parent', ...QUEUE },
        { root_dir: '/repo/attempts', name: 'attempts', ...QUEUE }
      ],
      workspaces_state: []
    };

    expect(assembleMonitorPipeline(splitMonitorPipeline(body))).toEqual(body);
  });
});

describe('applyPatch', () => {
  test('preserves untouched value identity without mutating the original map', () => {
    const map = splitWorkerQueue({ root_dir: '/repo', queue: QUEUE });

    const next = applyPatch(map, {
      set: { 'queue/revision': 3 },
      unset: ['queue/exec_defaults', 'absent']
    });

    expect(next).not.toBe(map);
    expect(next.get(`attempts/${ATTEMPT_ID}`)).toBe(ATTEMPT);
    expect(next.get('queue/revision')).toBe(3);
    expect(next.has('queue/exec_defaults')).toBe(false);
    expect(map.get('queue/revision')).toBe(2);
    expect(map.has('queue/exec_defaults')).toBe(true);
  });
});
