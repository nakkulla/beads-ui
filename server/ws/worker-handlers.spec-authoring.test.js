import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const ROOT = '/tmp/spec-authoring-ws';
const B = 'UI-spec';

vi.mock('../registry-watcher.js', async (importOriginal) => ({
  .../** @type {any} */ (await importOriginal()),
  getAvailableWorkspaces: () => [{ path: ROOT }]
}));
vi.mock('../bd.js', async (importOriginal) => ({
  .../** @type {any} */ (await importOriginal()),
  runBdJsonProjected: vi.fn()
}));

const { runBdJsonProjected } = await import('../bd.js');
const { conversationSettingsStore, __resetConversationSettingsForTest } =
  await import('../conversation-settings.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const { setConnWorkspace } = await import('./context.js');
const { handleWorkerSpecAuthoringSession, __resetWorkerQueueForTest } =
  await import('./worker-handlers.js');

/** @type {string} */
let tmp;
/** @type {any} */
let original_launcher;
/** @type {any} */
let target;
const launch = vi.fn();
const listPanes = vi.fn();

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'spec-authoring-ws-'));
  vi.stubEnv('XDG_STATE_HOME', tmp);
  vi.stubEnv('BDUI_CONFIG_PATH', path.join(tmp, 'absent.toml'));
  __resetWorkerQueueForTest();
  __resetConversationSettingsForTest();
  conversationSettingsStore().set({
    expected_revision: 0,
    values: { auto_launch: false }
  });
  target = {
    id: B,
    status: 'open',
    labels: [],
    metadata: { route: 'spec_backed' }
  };
  vi.mocked(runBdJsonProjected).mockImplementation(
    /** @type {any} */ (
      async (/** @type {any} */ _projection, /** @type {string[]} */ args) =>
        args[0] === 'show'
          ? {
              ok: true,
              data: args[1] === B ? target : { id: args[1], status: 'open' }
            }
          : { ok: false, error: { code: 'bd_exit_error', message: 'unused' } }
    )
  );
  const runtime = getWorkerRuntime();
  original_launcher = runtime.interactiveLauncher;
  listPanes.mockReset().mockResolvedValue({ ok: true, rows: [] });
  launch.mockReset().mockResolvedValue({
    session: 'launched',
    placement: 'user',
    tmux_session: 'personal',
    tmux_window: B,
    pane_id: '%1'
  });
  runtime.interactiveLauncher = /** @type {any} */ ({
    listPanes,
    launch,
    readBridgeThreads: () => new Map()
  });
  const store = runtime.queueStore;
  store.place(ROOT, {
    bead_id: 'UI-original',
    expected_revision: store.snapshot(ROOT).revision
  });
  store.recordAdmission(ROOT, {
    bead_id: 'UI-original',
    reason: 'prerequisite_unmet',
    blockers: [{ id: B, rig: null, status: 'open' }]
  });
});

afterEach(() => {
  getWorkerRuntime().interactiveLauncher = original_launcher;
  __resetWorkerQueueForTest();
  __resetConversationSettingsForTest();
  vi.unstubAllEnvs();
  fs.rmSync(tmp, { recursive: true, force: true });
});

/** @param {number} [revision] */
async function click(
  revision = getWorkerRuntime().queueStore.snapshot(ROOT).revision
) {
  /** @type {any} */
  const socket = { send: vi.fn(), readyState: 1, OPEN: 1 };
  setConnWorkspace(socket, { root_dir: ROOT, db_path: '' });
  await handleWorkerSpecAuthoringSession(socket, {
    id: 'spec',
    type: 'worker-spec-authoring-session',
    payload: { bead_id: B, expected_revision: revision }
  });
  return JSON.parse(socket.send.mock.calls.at(-1)[0]).payload;
}

test('opens a click with switch off and no attempt or failure', async () => {
  const before = getWorkerRuntime().queueStore.snapshot(ROOT);

  const result = await click();

  expect(result).toMatchObject({ launched: true, conflict: false });
  expect(launch).toHaveBeenCalledWith(
    expect.objectContaining({ key: B, cwd: ROOT, placement: 'user' })
  );
  expect(getWorkerRuntime().queueStore.snapshot(ROOT).queue).toEqual(
    before.queue
  );
  expect(getWorkerRuntime().queueStore.snapshot(ROOT).attempts).toEqual({});
});

test('opens a click despite an automatic once record', async () => {
  getWorkerRuntime().queueStore.claimSpecAuthoring(ROOT, B);

  const result = await click();

  expect(result.launched).toBe(true);
});

test('refuses a live conversation on the blocker row', async () => {
  getWorkerRuntime().queueStore.recordInteractiveSession(ROOT, {
    bead_id: B,
    kind: 'inquiry',
    provider: 'claude',
    pane_id: '%2',
    tmux_session: 'old',
    tmux_window: B,
    state: 'live',
    launched_at: 1
  });

  const result = await click();

  expect(result).toMatchObject({
    launched: false,
    reason: 'live_conversation'
  });
  expect(launch).not.toHaveBeenCalled();
});

test('refuses a Bead that no longer targets spec authoring', async () => {
  target.status = 'in_progress';

  const result = await click();

  expect(result).toMatchObject({ launched: false, reason: 'not_target' });
  expect(launch).not.toHaveBeenCalled();
});

test('refuses unavailable tmux without creating a record', async () => {
  listPanes.mockResolvedValue({ ok: false, error: 'unavailable' });

  const result = await click();

  expect(result).toMatchObject({ launched: false, reason: 'tmux_unavailable' });
  expect(
    getWorkerRuntime().queueStore.snapshot(ROOT).interactive_sessions
  ).toEqual({});
});

test('rejects a stale revision before launching a target', async () => {
  const result = await click(-1);

  expect(result.conflict).toBe(true);
  expect(launch).not.toHaveBeenCalled();
  expect(
    getWorkerRuntime().queueStore.snapshot(ROOT).interactive_sessions
  ).toEqual({});
});
