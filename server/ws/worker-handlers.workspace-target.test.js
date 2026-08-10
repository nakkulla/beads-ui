/**
 * Every worker MUTATION must honour an optional `payload.root_dir` (UI-qrfo §5).
 *
 * Table-driven over all seventeen actions on purpose: a single-action test
 * cannot catch a leftover `workspaceKeyOf(ws)` in the other sixteen, and that
 * leftover is exactly the bug this change can leave behind.
 *
 * The observation seam is `worker/attach.js`. Every one of the seventeen reaches
 * it with the resolved workspace key — either directly (the attachment actions)
 * or through the snapshot decoration every reply carries — so "which workspace
 * did this handler decide on" is one uniform assertion instead of seventeen
 * bespoke ones.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {string[]} */
  attach_calls: [],
  /** @type {string[]} */
  workspaces: []
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () =>
      state.workspaces.map((workspace_path) => ({ path: workspace_path }))
  };
});

vi.mock('../worker/attach.js', () => {
  /**
   * @param {unknown} result
   * @returns {(workspace_key: string, ...rest: unknown[]) => any}
   */
  const rec = (result) => (workspace_key) => {
    state.attach_calls.push(String(workspace_key));
    return typeof result === 'function' ? result() : result;
  };
  return {
    checkWorkerQueueAdmission: rec(() => Promise.resolve({ ok: true })),
    discardWorkerPr: rec(() => Promise.resolve({ ok: true })),
    enrollWorkerMergeCandidates: rec(() => ({
      applied: false,
      conflict: false,
      queued: 0
    })),
    kickWorkerMergeQueue: rec(() => Promise.resolve()),
    observeWorkerPrs: rec(() => Promise.resolve()),
    pauseWorkerAttempt: rec(() => Promise.resolve({ ok: true })),
    refreshWorkerExternalPrs: rec(() => Promise.resolve(false)),
    resumeWorkerAttempt: rec(() =>
      Promise.resolve({ ok: true, attempt_id: 'a2' })
    ),
    reviseApproveWorkerBead: rec(() => Promise.resolve({ ok: true })),
    reviseFixWorkerBead: rec(() => Promise.resolve({ ok: true })),
    stopWorkerAttempt: rec(() => Promise.resolve(true)),
    tickWorkerQueue: rec(() => Promise.resolve()),
    workerMergeQueueState: rec(() => ({ active: null, failures: {} })),
    workerSlots: rec(() => null),
    workerWorktreeExists: rec(() => false)
  };
});

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const handlers = await import('./worker-handlers.js');

const WS_CONN = '/tmp/example/repo-conn';
const WS_TARGET = '/tmp/example/repo-target';
const WS_FORBIDDEN = '/tmp/example/repo-unregistered';

/** @type {string} */
let tmp_state;

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
 * The seventeen mutation actions §5 enumerates, each with the minimal payload
 * that reaches its workspace decision.
 *
 * @type {Array<{ action: string, run: (ws: any, req: any) => unknown, payload: Record<string, unknown> }>}
 */
const MUTATIONS = [
  {
    action: 'worker-queue-place',
    run: handlers.handleWorkerQueuePlace,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-queue-reorder',
    run: handlers.handleWorkerQueueReorder,
    payload: { bead_id: 'UI-1', to_index: 0, expected_revision: 0 }
  },
  {
    action: 'worker-queue-toggle',
    run: handlers.handleWorkerQueueToggle,
    payload: { on: true, expected_revision: 0 }
  },
  {
    action: 'worker-queue-set-slots',
    run: handlers.handleWorkerQueueSetSlots,
    payload: { slots: 2, expected_revision: 0 }
  },
  {
    action: 'worker-queue-set-pr-wait-hold',
    run: handlers.handleWorkerQueueSetPrWaitHold,
    payload: { on: true, expected_revision: 0 }
  },
  {
    action: 'worker-queue-remove',
    run: handlers.handleWorkerQueueRemove,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-attempt-pause',
    run: handlers.handleWorkerAttemptPause,
    payload: { attempt_id: 'a1' }
  },
  {
    action: 'worker-attempt-stop',
    run: handlers.handleWorkerAttemptStop,
    payload: { attempt_id: 'a1' }
  },
  {
    action: 'worker-attempt-resume',
    run: handlers.handleWorkerAttemptResume,
    payload: { attempt_id: 'a1', expected_revision: 0 }
  },
  {
    action: 'worker-attempt-dismiss',
    run: handlers.handleWorkerAttemptDismiss,
    payload: { attempt_id: 'a1', expected_revision: 0 }
  },
  {
    action: 'worker-merge-queue-add',
    run: handlers.handleWorkerMergeQueueAdd,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-merge-queue-add-all',
    run: handlers.handleWorkerMergeQueueAddAll,
    payload: { expected_revision: 0 }
  },
  {
    action: 'worker-merge-auto-toggle',
    run: handlers.handleWorkerMergeAutoToggle,
    payload: { on: true, expected_revision: 0 }
  },
  {
    action: 'worker-merge-queue-remove',
    run: handlers.handleWorkerMergeQueueRemove,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-pr-discard',
    run: handlers.handleWorkerPrDiscard,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-revise-fix',
    run: handlers.handleWorkerReviseFix,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  },
  {
    action: 'worker-revise-approve',
    run: handlers.handleWorkerReviseApprove,
    payload: { bead_id: 'UI-1', expected_revision: 0 }
  }
];

/**
 * Dispatch one mutation and let the handlers' fire-and-forget follow-ups settle,
 * so a pending microtask cannot leak its observation into the next test.
 *
 * @param {{ action: string, run: (ws: any, req: any) => unknown }} row
 * @param {Record<string, unknown>} payload
 */
async function dispatch(row, payload) {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir: WS_CONN, db_path: '' });
  await row.run(sock, { id: 'r1', type: row.action, payload });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return {
    sock,
    keys: [...new Set(state.attach_calls)],
    replies: /** @type {string[]} */ (sock.sent).map((raw) => JSON.parse(raw))
  };
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wst-'));
  process.env.XDG_STATE_HOME = tmp_state;
  state.attach_calls = [];
  state.workspaces = [WS_CONN, WS_TARGET];
  handlers.__resetWorkerQueueForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  handlers.__resetWorkerQueueForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe.each(MUTATIONS)('$action workspace targeting (UI-qrfo §5)', (row) => {
  test('acts on the workspace named by root_dir', async () => {
    const { keys } = await dispatch(row, {
      ...row.payload,
      root_dir: WS_TARGET
    });

    expect(keys).toEqual([WS_TARGET]);
  });

  test('leaves the connection workspace untouched', async () => {
    await dispatch(row, { ...row.payload, root_dir: WS_TARGET });

    expect(getWorkerRuntime().queueStore.snapshot(WS_CONN).revision).toBe(0);
  });

  test('rejects a root_dir outside the available workspace list', async () => {
    const { keys, replies } = await dispatch(row, {
      ...row.payload,
      root_dir: WS_FORBIDDEN
    });

    expect(replies).toEqual([
      expect.objectContaining({
        ok: false,
        error: expect.objectContaining({ code: 'bad_request' })
      })
    ]);
    expect(keys).toEqual([]);
  });

  test('acts on the connection workspace when root_dir is absent', async () => {
    const { keys } = await dispatch(row, { ...row.payload });

    expect(keys).toEqual([WS_CONN]);
  });
});
