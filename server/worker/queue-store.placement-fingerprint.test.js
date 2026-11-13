/** @import { Queue } from './queue-store.js' */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import {
  createQueueStore,
  makeAttempt,
  placementFingerprint
} from './queue-store.js';

const WS = '/tmp/placement-fingerprint';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(
    path.join(os.tmpdir(), 'bdui-placement-fingerprint-')
  );
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/** @returns {Queue} */
function fingerprintFixture() {
  const store = createQueueStore();
  store.recordInteractiveSession(WS, {
    bead_id: 'B1',
    kind: 'resolve',
    provider: 'claude',
    state: 'live',
    pane_id: '%1',
    tmux_session: 'interactive',
    tmux_window: 'B1',
    launched_at: 1
  });
  store.createDiscardOperation(WS, {
    expected_revision: store.snapshot(WS).revision,
    operation: {
      operation_id: 'discard',
      bead_id: 'B2',
      attempt_id: 'a2',
      source_snapshot: {}
    }
  });
  const queue = store.snapshot(WS);
  queue.queue = [
    { bead_id: 'Q1', added_at: 1 },
    { bead_id: 'Q2', added_at: 2 }
  ];
  queue.serial_lanes[0].entries = [
    { bead_id: 'S1', added_at: 1 },
    { bead_id: 'S2', added_at: 2 }
  ];
  queue.done = [{ bead_id: 'D1', added_at: 1 }];
  queue.pr_wait = [
    { bead_id: 'P1', added_at: 1 },
    { bead_id: 'P2', added_at: 2 }
  ];
  queue.merge_queue = [
    { bead_id: 'M1', resolution_rounds: 0, rebase_rounds: 0, resolution: null },
    { bead_id: 'M2', resolution_rounds: 0, rebase_rounds: 0, resolution: null }
  ];
  queue.attempts = {
    a1: makeAttempt({
      attempt_id: 'a1',
      bead_id: 'B1',
      status: 'failed',
      started_at: 10,
      finished_at: 20
    }),
    a2: makeAttempt({ attempt_id: 'a2', bead_id: 'B2', status: 'paused' })
  };
  return queue;
}

/** @type {Array<[string, (queue: Queue) => void]>} */
const placement_changes = [
  [
    'queue order',
    (q) => {
      q.queue.reverse();
    }
  ],
  [
    'queue bead_id',
    (q) => {
      q.queue[0].bead_id = 'other';
    }
  ],
  [
    'queue added_at',
    (q) => {
      q.queue[0].added_at = 99;
    }
  ],
  [
    'queue lane',
    (q) => {
      q.queue[0].serial_lane_id = 's1';
    }
  ],
  [
    'queue external origin',
    (q) => {
      q.queue[0].external = true;
    }
  ],
  [
    'serial lane count',
    (q) => {
      q.serial_lane_count += 1;
    }
  ],
  [
    'serial lane id',
    (q) => {
      q.serial_lanes[0].id = 's2';
    }
  ],
  [
    'serial row order',
    (q) => {
      q.serial_lanes[0].entries.reverse();
    }
  ],
  [
    'serial row bead_id',
    (q) => {
      q.serial_lanes[0].entries[0].bead_id = 'other';
    }
  ],
  [
    'serial row added_at',
    (q) => {
      q.serial_lanes[0].entries[0].added_at = 99;
    }
  ],
  [
    'done bead_id',
    (q) => {
      q.done[0].bead_id = 'other';
    }
  ],
  [
    'done added_at',
    (q) => {
      q.done[0].added_at = 99;
    }
  ],
  [
    'pr_wait order',
    (q) => {
      q.pr_wait.reverse();
    }
  ],
  [
    'pr_wait bead_id',
    (q) => {
      q.pr_wait[0].bead_id = 'other';
    }
  ],
  [
    'pr_wait lane',
    (q) => {
      q.pr_wait[0].serial_lane_id = 's1';
    }
  ],
  [
    'merge shelf keys',
    (q) => {
      q.merge_shelved.P1 = { at: 1 };
    }
  ],
  [
    'merge queue bead_id',
    (q) => {
      q.merge_queue[0].bead_id = 'other';
    }
  ],
  [
    'merge queue order',
    (q) => {
      q.merge_queue.reverse();
    }
  ],
  [
    'attempt insertion order',
    (q) => {
      q.attempts = { a2: q.attempts.a2, a1: q.attempts.a1 };
    }
  ],
  [
    'attempt id',
    (q) => {
      q.attempts.a1.attempt_id = 'other';
    }
  ],
  [
    'attempt bead_id',
    (q) => {
      q.attempts.a1.bead_id = 'other';
    }
  ],
  [
    'attempt kind',
    (q) => {
      q.attempts.a1.kind = 'review_session';
    }
  ],
  [
    'attempt status',
    (q) => {
      q.attempts.a1.status = 'paused';
    }
  ],
  [
    'attempt lane',
    (q) => {
      q.attempts.a1.serial_lane_id = 's1';
    }
  ],
  [
    'attempt predecessor',
    (q) => {
      q.attempts.a1.resumed_from = 'a0';
    }
  ],
  [
    'attempt completion root',
    (q) => {
      q.attempts.a1.completion_root_id = 'root';
    }
  ],
  [
    'attempt start',
    (q) => {
      q.attempts.a1.started_at = 99;
    }
  ],
  [
    'attempt finish',
    (q) => {
      q.attempts.a1.finished_at = 99;
    }
  ],
  [
    'attempt session',
    (q) => {
      q.attempts.a1.session_id = 'sid';
    }
  ],
  [
    'attempt bead session ref',
    (q) => {
      q.attempts.a1.bead_session_ref = 'claude:sid';
    }
  ],
  [
    'attempt external conflict',
    (q) => {
      q.attempts.a1.external_conflict = true;
    }
  ],
  [
    'attempt withdrawal presence',
    (q) => {
      q.attempts.a1.withdrawn = {
        at: 1,
        from_status: 'paused',
        from_cause: null
      };
    }
  ],
  [
    'attempt dismissal presence',
    (q) => {
      q.attempts.a1.dismissed_at = 99;
    }
  ],
  [
    'active discard bead_id',
    (q) => {
      q.discard_operations.discard.bead_id = 'other';
    }
  ],
  [
    'active discard attempt_id',
    (q) => {
      q.discard_operations.discard.attempt_id = 'a1';
    }
  ],
  [
    'discard termination',
    (q) => {
      q.discard_operations.discard.phase = 'done';
    }
  ],
  [
    'interactive bead_id',
    (q) => {
      q.interactive_sessions['B1:resolve'].bead_id = 'other';
    }
  ],
  [
    'interactive session_id',
    (q) => {
      q.interactive_sessions['B1:resolve'].session_id = 'sid';
    }
  ]
];

test.each(placement_changes)(
  'changes the fingerprint after changing %s',
  (_name, change) => {
    const queue = fingerprintFixture();
    const before = placementFingerprint(queue);

    change(queue);

    expect(placementFingerprint(queue)).not.toBe(before);
  }
);

/** @type {Array<[string, (queue: Queue) => void]>} */
const unrelated_changes = [
  [
    'revision',
    (q) => {
      q.revision += 1;
    }
  ],
  [
    'session liveness',
    (q) => {
      q.interactive_sessions['B1:resolve'].last_seen_alive_at = 99;
    }
  ],
  [
    'session turn state',
    (q) => {
      q.interactive_sessions['B1:resolve'].turn_state = 'running';
    }
  ],
  [
    'session turn state time',
    (q) => {
      q.interactive_sessions['B1:resolve'].turn_state_since = 99;
    }
  ],
  [
    'session last message',
    (q) => {
      q.interactive_sessions['B1:resolve'].last_message = {
        text: 'progress',
        at: 99
      };
    }
  ],
  [
    'session last read',
    (q) => {
      q.interactive_sessions['B1:resolve'].last_message_read_at = 99;
    }
  ],
  [
    'attempt usage',
    (q) => {
      q.attempts.a1.usage = {
        input_tokens: 1,
        output_tokens: 1,
        cache_read_input_tokens: 0,
        cache_creation_input_tokens: 0
      };
    }
  ],
  [
    'attempt usage legs',
    (q) => {
      q.attempts.a1.usage_legs = [
        {
          receipt_id: 'progress',
          provider: 'claude',
          role: 'subagent',
          session_id: 'sid',
          turn_id: 'tid',
          model: null,
          effort: null,
          usage: { total_tokens: 1 },
          completed_at: 99
        }
      ];
    }
  ],
  [
    'attempt execution profile',
    (q) => {
      q.attempts.a1.exec_profile = { model: 'progress' };
    }
  ],
  [
    'attempt observation',
    (q) => {
      q.attempts.a1.observation_checked = true;
    }
  ],
  [
    'attempt progress',
    (q) => {
      q.attempts.a1.head_oid = 'new-head';
    }
  ],
  [
    'provider holds',
    (q) => {
      q.provider_hold.claude = { since: 99, generation: 1, targets: [] };
    }
  ],
  [
    'slots',
    (q) => {
      q.slots += 1;
    }
  ],
  [
    'automatic advance',
    (q) => {
      q.auto_advance = !q.auto_advance;
    }
  ],
  [
    'pr_wait time',
    (q) => {
      q.pr_wait[0].added_at = 99;
    }
  ],
  [
    'nonterminal discard phase',
    (q) => {
      q.discard_operations.discard.phase = 'backing_up';
    }
  ],
  [
    'dismissal timestamp',
    (q) => {
      q.attempts.a1.dismissed_at = 100;
    }
  ]
];

test.each(unrelated_changes)(
  'keeps the fingerprint after changing %s',
  (name, change) => {
    const queue = fingerprintFixture();
    if (name === 'dismissal timestamp') {
      queue.attempts.a1.dismissed_at = 99;
    }
    const before = placementFingerprint(queue);

    change(queue);

    expect(placementFingerprint(queue)).toBe(before);
  }
);

test('accepts the current placement revision on first load', () => {
  const store = createQueueStore();

  const matches = store.placementRevisionMatches(WS, 0);

  expect(matches).toBe(true);
});

test('accepts an older revision after an unrelated scheduler write', () => {
  const store = createQueueStore();
  const before = store.load(WS);
  store.recordAdmission(WS, { bead_id: 'B1', reason: 'grace_period' });

  const matches = store.placementRevisionMatches(WS, before.revision);

  expect(matches).toBe(true);
});

test('remembers a revision written by an exact CAS operation', () => {
  const store = createQueueStore();
  const written = store.setSlots(WS, { expected_revision: 0, slots: 2 });
  store.setAutoAdvance(WS, true);

  const matches = store.placementRevisionMatches(WS, written.queue.revision);

  expect(matches).toBe(true);
});

test('rejects an older revision after a queue change', () => {
  const store = createQueueStore();
  store.place(WS, { expected_revision: 0, bead_id: 'B1' });

  const matches = store.placementRevisionMatches(WS, 0);

  expect(matches).toBe(false);
});

test('evicts a revision after 1024 subsequent revisions', () => {
  const store = createQueueStore();
  store.load(WS);
  for (let index = 0; index < 1024; index += 1) {
    store.setAutoAdvance(WS, index % 2 === 0);
  }

  const matches = store.placementRevisionMatches(WS, 0);

  expect(matches).toBe(false);
  expect(store.placementRevisionMatches(WS, 1)).toBe(true);
});

test.each([1, -1, 0.5, NaN, Infinity])(
  'rejects an unavailable placement revision %s',
  (revision) => {
    const store = createQueueStore();

    const matches = store.placementRevisionMatches(WS, revision);

    expect(matches).toBe(false);
  }
);

test('accepts the original revision after placement returns from A through B to A', () => {
  const store = createQueueStore({ now: () => 1 });
  store.place(WS, { expected_revision: 0, bead_id: 'B1' });
  store.place(WS, { expected_revision: 1, bead_id: 'B2' });
  store.reorder(WS, { expected_revision: 2, bead_id: 'B1', to_index: 1 });
  store.reorder(WS, { expected_revision: 3, bead_id: 'B1', to_index: 0 });

  const matches = store.placementRevisionMatches(WS, 2);

  expect(matches).toBe(true);
});

test('forgets historical revisions after a cold reload', () => {
  const store = createQueueStore();
  store.load(WS);
  store.setAutoAdvance(WS, true);
  const reloaded = createQueueStore();

  const matches = reloaded.placementRevisionMatches(WS, 0);

  expect(matches).toBe(false);
  expect(reloaded.placementRevisionMatches(WS, 1)).toBe(true);
});

test.each(['load', 'write'])(
  'falls back to exact CAS when fingerprinting fails during %s',
  (stage) => {
    const store = createQueueStore();
    if (stage === 'write') {
      store.load(WS);
    }
    const stringify = JSON.stringify;
    const projection = vi
      .spyOn(JSON, 'stringify')
      .mockImplementation((value) => {
        if (value && Array.isArray(value.attempts)) {
          throw new Error('fingerprint failed');
        }
        return stringify(value);
      });
    if (stage === 'write') {
      store.setAutoAdvance(WS, true);
    } else {
      store.load(WS);
    }
    const failed_revision = store.snapshot(WS).revision;
    expect(store.placementRevisionMatches(WS, failed_revision)).toBe(true);
    projection.mockRestore();
    store.setAutoAdvance(WS, false);

    const matches = store.placementRevisionMatches(WS, failed_revision);

    expect(matches).toBe(false);
  }
);

test('keeps remembered revisions separate between workspaces', () => {
  const store = createQueueStore();
  store.place(WS, { expected_revision: 0, bead_id: 'B1' });
  store.load(`${WS}-other`);
  store.setAutoAdvance(`${WS}-other`, true);

  const matches = store.placementRevisionMatches(WS, 0);

  expect(matches).toBe(false);
  expect(store.placementRevisionMatches(`${WS}-other`, 0)).toBe(true);
});

test.each(['done', 'abandoned'])(
  'ignores discard identity after terminal phase %s',
  (phase) => {
    const queue = fingerprintFixture();
    queue.discard_operations.discard.phase = phase;
    const before = placementFingerprint(queue);

    queue.discard_operations.discard.bead_id = 'other';

    expect(placementFingerprint(queue)).toBe(before);
  }
);

test('keeps merge shelf timestamps and insertion order outside the fingerprint', () => {
  const queue = fingerprintFixture();
  queue.merge_shelved = { P1: { at: 1 }, P2: { at: 2 } };
  const before = placementFingerprint(queue);

  queue.merge_shelved = { P2: { at: 99 }, P1: { at: 100 } };

  expect(placementFingerprint(queue)).toBe(before);
});

/** @type {Array<[string, (store: ReturnType<typeof createQueueStore>, revision: number) => import('./queue-store.js').QueueOpResult]>} */
const placement_ops = [
  [
    'place',
    (store, revision) =>
      store.place(WS, { expected_revision: revision, bead_id: 'B3' })
  ],
  [
    'placeBundle',
    (store, revision) =>
      store.placeBundle(WS, {
        expected_revision: revision,
        lane: 's1',
        binds: [],
        steps: [{ bead_id: 'B3', index: 0 }]
      })
  ],
  [
    'remove',
    (store, revision) =>
      store.remove(WS, { expected_revision: revision, bead_id: 'B1' })
  ],
  [
    'reorder',
    (store, revision) =>
      store.reorder(WS, {
        expected_revision: revision,
        bead_id: 'B1',
        to_index: 1
      })
  ],
  [
    'setSerialLaneCount',
    (store, revision) =>
      store.setSerialLaneCount(WS, { expected_revision: revision, count: 2 })
  ],
  [
    'placeSerialGroup',
    (store, revision) =>
      store.placeSerialGroup(WS, {
        expected_revision: revision,
        lane: 's1',
        ordered_bead_ids: ['B3', 'B4']
      })
  ]
];

test.each(placement_ops)(
  'applies %s on the current state with an unrelated stale revision',
  (_name, mutate) => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'B1' });
    store.place(WS, { expected_revision: 1, bead_id: 'B2' });
    store.setAutoAdvance(WS, true);

    const result = mutate(store, 2);

    expect(result).toMatchObject({
      ok: true,
      conflict: false,
      queue: { revision: 4, auto_advance: true }
    });
  }
);

test.each(['toggleAutoAdvance', 'setSlots'])(
  'keeps exact CAS for %s after an unrelated write',
  (operation) => {
    const store = createQueueStore();
    store.load(WS);
    store.setAutoAdvance(WS, true);

    const result =
      operation === 'toggleAutoAdvance'
        ? store.toggleAutoAdvance(WS, { expected_revision: 0, on: false })
        : store.setSlots(WS, { expected_revision: 0, slots: 2 });

    expect(result).toMatchObject({
      ok: false,
      conflict: true,
      queue: { revision: 1 }
    });
  }
);

/** @type {Array<[string, (store: ReturnType<typeof createQueueStore>, revision: number) => unknown]>} */
const projection_changes = [
  [
    'failed-attempt dismissal',
    (store, revision) =>
      store.dismissAttempt(WS, {
        expected_revision: revision,
        attempt_id: 'failed'
      })
  ],
  ['done row', (store) => store.moveToDone(WS, { bead_id: 'B1' })],
  [
    'merge queue entry',
    (store, revision) =>
      store.enqueueMerge(WS, {
        expected_revision: revision,
        entries: [{ bead_id: 'B1', external: true }]
      })
  ],
  [
    'interactive session identity',
    (store) =>
      store.updateInteractiveSession(WS, 'B1:resolve', { session_id: 'sid' })
  ]
];

test.each(projection_changes)(
  'rejects a stale bundle after changing the projection through %s',
  (_name, change) => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'failed',
        bead_id: 'B1',
        status: 'failed',
        finished_at: 1
      }
    });
    store.recordInteractiveSession(WS, {
      bead_id: 'B1',
      kind: 'resolve',
      provider: 'claude',
      state: 'live',
      pane_id: '%1',
      tmux_session: 'interactive',
      tmux_window: 'B1',
      launched_at: 1
    });
    const revision = store.snapshot(WS).revision;
    change(store, revision);

    const result = store.placeBundle(WS, {
      expected_revision: revision,
      lane: 's1',
      binds: ['B1'],
      steps: [{ bead_id: 'B2', index: 0 }]
    });

    expect(result).toMatchObject({ ok: false, conflict: true });
  }
);
