import { describe, expect, test } from 'vitest';
import { handleMonitorAutoToggle } from './monitor-handlers.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * A socket that records every frame the handler sends.
 *
 * @returns {any}
 */
function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {any} sock
 * @returns {any}
 */
function lastReply(sock) {
  return JSON.parse(sock.sent.at(-1));
}

/**
 * A queue store stand-in with a real per-workspace revision that both toggles
 * bump — the point of the ordering assertion below.
 *
 * @param {{ revisions?: Record<string, number>, throwFor?: string[], rejectAdvance?: string[], rejectMerge?: string[] }} [input]
 */
function fakeStore(input = {}) {
  /** @type {Record<string, number>} */
  const revisions = { ...(input.revisions || {}) };
  /** @type {Array<{ op: string, workspace: string, input: any }>} */
  const calls = [];

  /**
   * @param {string} workspace
   * @returns {number}
   */
  function revisionOf(workspace) {
    if (typeof revisions[workspace] !== 'number') {
      revisions[workspace] = 0;
    }
    return revisions[workspace];
  }

  return {
    calls,
    /** @param {string} workspace */
    snapshot(workspace) {
      if ((input.throwFor || []).includes(workspace)) {
        throw new Error('snapshot boom');
      }
      calls.push({ op: 'snapshot', workspace, input: null });
      return { revision: revisionOf(workspace) };
    },
    /**
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean }} args
     */
    toggleAutoAdvance(workspace, args) {
      calls.push({ op: 'toggleAutoAdvance', workspace, input: args });
      if ((input.rejectAdvance || []).includes(workspace)) {
        return {
          ok: false,
          conflict: true,
          queue: { revision: revisionOf(workspace) }
        };
      }
      if (args.expected_revision !== revisionOf(workspace)) {
        return {
          ok: false,
          conflict: true,
          queue: { revision: revisionOf(workspace) }
        };
      }
      revisions[workspace] = revisionOf(workspace) + 1;
      return {
        ok: true,
        conflict: false,
        queue: { revision: revisions[workspace], auto_advance: args.on }
      };
    },
    /**
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean, clear_waiting?: boolean, keep?: string|null }} args
     */
    toggleAutoMerge(workspace, args) {
      calls.push({ op: 'toggleAutoMerge', workspace, input: args });
      if ((input.rejectMerge || []).includes(workspace)) {
        return {
          ok: false,
          conflict: false,
          reason: 'nope',
          queue: { revision: revisionOf(workspace) }
        };
      }
      if (args.expected_revision !== revisionOf(workspace)) {
        return {
          ok: false,
          conflict: true,
          queue: { revision: revisionOf(workspace) }
        };
      }
      revisions[workspace] = revisionOf(workspace) + 1;
      return {
        ok: true,
        conflict: false,
        queue: { revision: revisions[workspace], auto_merge: args.on }
      };
    }
  };
}

/**
 * @param {{
 *   on: boolean,
 *   store?: ReturnType<typeof fakeStore>,
 *   workspaces?: string[],
 *   hidden?: string[],
 *   active?: Record<string, string|null>,
 *   ticked?: string[],
 *   pushes?: number[]
 * }} input
 */
function toggle(input) {
  const sock = fakeSocket();
  const store = input.store || fakeStore();
  const ticked = input.ticked || [];
  const pushes = input.pushes || [];
  handleMonitorAutoToggle(
    sock,
    { id: 'r1', type: 'monitor-auto-toggle', payload: { on: input.on } },
    {
      queueStore: () => /** @type {any} */ (store),
      listWorkspaces: () =>
        (input.workspaces || [WS_A, WS_B]).map((p) => ({
          path: p
        })),
      listHidden: () => input.hidden || [],
      tick: (root_dir) => {
        ticked.push(root_dir);
      },
      mergeQueueState: (root_dir) => ({
        active: (input.active || {})[root_dir] ?? null,
        failures: {}
      }),
      onApplied: () => {
        pushes.push(1);
      }
    }
  );
  return { sock, store, ticked, pushes, reply: lastReply(sock) };
}

describe('monitor-auto-toggle target set (UI-qrfo §6)', () => {
  test('applies to every visible workspace', () => {
    const { reply, store } = toggle({ on: true });

    expect(reply.payload).toMatchObject({ applied: 2, failed: [] });
    expect(
      store.calls
        .filter((c) => c.op === 'toggleAutoAdvance')
        .map((c) => c.workspace)
    ).toEqual([WS_A, WS_B]);
  });

  test('excludes a hidden workspace', () => {
    const { store } = toggle({ on: true, hidden: [WS_B] });

    expect(
      store.calls
        .filter((c) => c.op === 'toggleAutoAdvance')
        .map((c) => c.workspace)
    ).toEqual([WS_A]);
  });

  test('rejects a payload without a boolean on', () => {
    const sock = fakeSocket();

    handleMonitorAutoToggle(sock, {
      id: 'r1',
      type: 'monitor-auto-toggle',
      payload: {}
    });

    expect(lastReply(sock)).toMatchObject({
      ok: false,
      error: { code: 'bad_request' }
    });
  });

  test('schedules exactly one aggregation push for the whole sweep', () => {
    const { pushes } = toggle({ on: true });

    expect(pushes.length).toBe(1);
  });
});

describe('monitor-auto-toggle CAS ordering (UI-qrfo §6)', () => {
  // 첫 토글이 revision을 올리므로, 처음 읽은 값을 두 번 쓰면 두 번째가 충돌한다.
  test('sends the revision the first toggle produced to the second', () => {
    const { store } = toggle({
      on: true,
      workspaces: [WS_A],
      store: fakeStore({ revisions: { [WS_A]: 7 } })
    });

    const advance = store.calls.find((c) => c.op === 'toggleAutoAdvance');
    const merge = store.calls.find((c) => c.op === 'toggleAutoMerge');
    expect(advance?.input.expected_revision).toBe(7);
    expect(merge?.input.expected_revision).toBe(8);
  });

  test('applies both axes without a conflict', () => {
    const { reply } = toggle({
      on: true,
      workspaces: [WS_A],
      store: fakeStore({ revisions: { [WS_A]: 7 } })
    });

    expect(reply.payload).toMatchObject({ applied: 1, failed: [] });
  });
});

describe('monitor-auto-toggle side effects (UI-qrfo §6)', () => {
  test('kicks the dispatch loop of every workspace it turned on', () => {
    const { ticked } = toggle({ on: true });

    expect(ticked).toEqual([WS_A, WS_B]);
  });

  test('kicks nothing when turning automation off', () => {
    const { ticked } = toggle({ on: false });

    expect(ticked).toEqual([]);
  });

  test('clears the waiting merge queue in the same write when turning off', () => {
    const { store } = toggle({
      on: false,
      workspaces: [WS_A],
      active: { [WS_A]: 'UI-9' }
    });

    const merge = store.calls.find((c) => c.op === 'toggleAutoMerge');
    expect(merge?.input).toMatchObject({
      on: false,
      clear_waiting: true,
      keep: 'UI-9'
    });
  });

  test('leaves the waiting merge queue alone when turning on', () => {
    const { store } = toggle({ on: true, workspaces: [WS_A] });

    const merge = store.calls.find((c) => c.op === 'toggleAutoMerge');
    expect(merge?.input).toMatchObject({ on: true, clear_waiting: false });
  });
});

describe('monitor-auto-toggle partial failure (UI-qrfo §10)', () => {
  test('applies the remaining workspaces when one throws', () => {
    const { reply, store } = toggle({
      on: true,
      store: fakeStore({ throwFor: [WS_A] })
    });

    expect(reply.payload.applied).toBe(1);
    expect(
      store.calls
        .filter((c) => c.op === 'toggleAutoAdvance')
        .map((c) => c.workspace)
    ).toEqual([WS_B]);
  });

  test('names the failed repo in the reply', () => {
    const { reply } = toggle({
      on: true,
      store: fakeStore({ throwFor: [WS_A] })
    });

    expect(reply.payload.failed).toEqual([{ root_dir: WS_A, reason: 'error' }]);
  });

  test('reports a CAS conflict on the first axis as a failure', () => {
    const { reply } = toggle({
      on: true,
      store: fakeStore({ rejectAdvance: [WS_B] })
    });

    expect(reply.payload).toMatchObject({
      applied: 1,
      failed: [{ root_dir: WS_B, reason: 'conflict' }]
    });
  });

  test('reports a refused second axis with the store reason', () => {
    const { reply } = toggle({
      on: true,
      store: fakeStore({ rejectMerge: [WS_B] })
    });

    expect(reply.payload).toMatchObject({
      applied: 1,
      failed: [{ root_dir: WS_B, reason: 'nope' }]
    });
  });

  test('does not kick a workspace whose toggle failed', () => {
    const { ticked } = toggle({
      on: true,
      store: fakeStore({ rejectMerge: [WS_B] })
    });

    expect(ticked).toEqual([WS_A]);
  });
});
