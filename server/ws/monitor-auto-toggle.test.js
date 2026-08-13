import { describe, expect, test } from 'vitest';
import { handleMonitorAutoToggle } from './monitor-handlers.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
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
 * @param {{
 *   states?: Record<string, { revision?: number, auto_advance?: boolean, auto_merge?: boolean }>,
 *   throwFor?: string[],
 *   rejectFor?: Record<string, { conflict?: boolean, reason?: string }>
 * }} [input]
 */
function fakeStore(input = {}) {
  /** @type {Record<string, { revision: number, auto_advance: boolean, auto_merge: boolean }>} */
  const states = {};
  /** @type {Array<{ op: string, workspace: string, input: any }>} */
  const calls = [];

  /**
   * @param {string} workspace
   */
  function stateOf(workspace) {
    if (!states[workspace]) {
      const configured = input.states?.[workspace];
      states[workspace] = {
        revision: configured?.revision ?? 0,
        auto_advance: configured?.auto_advance === true,
        auto_merge: configured?.auto_merge === true
      };
    }
    return states[workspace];
  }

  return {
    calls,
    /**
     * @param {string} workspace
     */
    snapshot(workspace) {
      if ((input.throwFor || []).includes(workspace)) {
        throw new Error('snapshot boom');
      }
      calls.push({ op: 'snapshot', workspace, input: null });
      return { ...stateOf(workspace) };
    },
    /**
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean, keep?: string|null }} args
     */
    toggleAutomation(workspace, args) {
      calls.push({ op: 'toggleAutomation', workspace, input: args });
      const state = stateOf(workspace);
      const rejected = input.rejectFor?.[workspace];
      if (rejected) {
        return {
          ok: false,
          conflict: rejected.conflict === true,
          reason: rejected.reason,
          queue: { ...state }
        };
      }
      if (args.expected_revision !== state.revision) {
        return {
          ok: false,
          conflict: true,
          queue: { ...state }
        };
      }
      state.revision += 1;
      state.auto_advance = args.on;
      state.auto_merge = args.on;
      return {
        ok: true,
        conflict: false,
        queue: { ...state }
      };
    },
    /**
     * Simulate the independent auto-merge control while observation is active.
     *
     * @param {string} workspace
     * @param {boolean} on
     */
    setAutoMerge(workspace, on) {
      const state = stateOf(workspace);
      state.revision += 1;
      state.auto_merge = on;
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
 *   observe?: (root_dir: string) => unknown
 * }} input
 */
function toggle(input) {
  const sock = fakeSocket();
  const store = input.store || fakeStore();
  /** @type {string[]} */
  const ticked = [];
  /** @type {string[]} */
  const observed = [];
  /** @type {string[]} */
  const enrolled = [];
  /** @type {number[]} */
  const pushes = [];
  handleMonitorAutoToggle(
    sock,
    { id: 'r1', type: 'monitor-auto-toggle', payload: { on: input.on } },
    {
      queueStore: () => /** @type {any} */ (store),
      listWorkspaces: () =>
        (input.workspaces || [WS_A, WS_B]).map((workspace) => ({
          path: workspace
        })),
      listHidden: () => input.hidden || [],
      tick: (root_dir) => {
        ticked.push(root_dir);
      },
      observe: (root_dir) => {
        observed.push(root_dir);
        return input.observe ? input.observe(root_dir) : undefined;
      },
      enroll: (root_dir) => {
        enrolled.push(root_dir);
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
  return {
    sock,
    store,
    ticked,
    observed,
    enrolled,
    pushes,
    reply: lastReply(sock)
  };
}

/**
 * Let the fire-and-forget observation pipeline settle.
 */
async function flushEffects() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('monitor-auto-toggle target set', () => {
  test('applies one integrated mutation to every visible workspace', () => {
    const { reply, store } = toggle({ on: true });

    expect(reply.payload).toMatchObject({ applied: 2, failed: [] });
    expect(
      store.calls
        .filter((call) => call.op === 'toggleAutomation')
        .map((call) => call.workspace)
    ).toEqual([WS_A, WS_B]);
  });

  test('excludes a hidden workspace', () => {
    const { store } = toggle({ on: true, hidden: [WS_B] });

    expect(
      store.calls
        .filter((call) => call.op === 'toggleAutomation')
        .map((call) => call.workspace)
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

  test('schedules one aggregation push for the whole sweep', () => {
    const { pushes } = toggle({ on: true });

    expect(pushes).toHaveLength(1);
  });
});

describe('monitor-auto-toggle atomic mutation', () => {
  test('uses the current revision once for both automation axes', () => {
    const store = fakeStore({ states: { [WS_A]: { revision: 7 } } });

    toggle({ on: true, workspaces: [WS_A], store });

    const mutations = store.calls.filter(
      (call) => call.op === 'toggleAutomation'
    );
    expect(mutations).toHaveLength(1);
    expect(mutations[0].input).toMatchObject({
      expected_revision: 7,
      on: true
    });
    expect(store.snapshot(WS_A)).toMatchObject({
      revision: 8,
      auto_advance: true,
      auto_merge: true
    });
  });

  test('leaves both axes unchanged when the integrated mutation fails', () => {
    const store = fakeStore({
      rejectFor: { [WS_A]: { conflict: true } }
    });

    const { reply } = toggle({ on: true, workspaces: [WS_A], store });

    expect(reply.payload).toMatchObject({
      applied: 0,
      failed: [{ root_dir: WS_A, reason: 'conflict' }]
    });
    expect(store.snapshot(WS_A)).toMatchObject({
      auto_advance: false,
      auto_merge: false
    });
  });

  test('passes the active merge identity while turning automation off', () => {
    const store = fakeStore({
      states: {
        [WS_A]: { revision: 3, auto_advance: true, auto_merge: true }
      }
    });

    toggle({
      on: false,
      workspaces: [WS_A],
      active: { [WS_A]: 'UI-active' },
      store
    });

    const mutation = store.calls.find((call) => call.op === 'toggleAutomation');
    expect(mutation?.input).toMatchObject({
      expected_revision: 3,
      on: false,
      keep: 'UI-active'
    });
    expect(store.snapshot(WS_A)).toMatchObject({
      auto_advance: false,
      auto_merge: false
    });
  });
});

describe('monitor-auto-toggle side effects', () => {
  test('starts dispatch and conditional enrollment for every successful ON', async () => {
    const result = toggle({ on: true });

    await flushEffects();

    expect(result.ticked).toEqual([WS_A, WS_B]);
    expect(result.observed).toEqual([WS_A, WS_B]);
    expect(result.enrolled).toEqual([WS_A, WS_B]);
  });

  test('skips enrollment when independent merge OFF lands during observation', async () => {
    /** @type {() => void} */
    let release = () => {};
    const observing = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const store = fakeStore();
    const result = toggle({
      on: true,
      workspaces: [WS_A],
      store,
      observe: () => observing
    });

    store.setAutoMerge(WS_A, false);
    release();
    await flushEffects();

    expect(result.observed).toEqual([WS_A]);
    expect(result.enrolled).toEqual([]);
  });

  test('starts no ON effects while turning automation off', async () => {
    const store = fakeStore({
      states: {
        [WS_A]: { auto_advance: true, auto_merge: true }
      }
    });
    const result = toggle({ on: false, workspaces: [WS_A], store });

    await flushEffects();

    expect(result.ticked).toEqual([]);
    expect(result.observed).toEqual([]);
    expect(result.enrolled).toEqual([]);
  });
});

describe('monitor-auto-toggle partial failure', () => {
  test('applies the remaining workspaces when one throws', () => {
    const store = fakeStore({ throwFor: [WS_A] });

    const { reply } = toggle({ on: true, store });

    expect(reply.payload).toMatchObject({
      applied: 1,
      failed: [{ root_dir: WS_A, reason: 'error' }]
    });
    expect(
      store.calls
        .filter((call) => call.op === 'toggleAutomation')
        .map((call) => call.workspace)
    ).toEqual([WS_B]);
  });

  test('starts effects only for workspaces whose mutation succeeded', async () => {
    const store = fakeStore({
      rejectFor: { [WS_B]: { conflict: false, reason: 'nope' } }
    });
    const result = toggle({ on: true, store });

    await flushEffects();

    expect(result.reply.payload).toMatchObject({
      applied: 1,
      failed: [{ root_dir: WS_B, reason: 'nope' }]
    });
    expect(result.ticked).toEqual([WS_A]);
    expect(result.observed).toEqual([WS_A]);
    expect(result.enrolled).toEqual([WS_A]);
  });
});
