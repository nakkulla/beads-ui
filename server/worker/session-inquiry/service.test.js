/**
 * The session-inquiry row's reconcile and click (UI-gske §3.2, §3.3). A real
 * queue store over a temporary state directory holds the rows, so a second
 * store instance over the same directory is a server restart.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { hubReply } from '../../../test/session-hub.js';
import { createQueueStore } from '../queue-store.js';
import {
  EXTERNAL_RESUME_PANE_MARKER,
  createTmuxLauncher
} from '../tmux-launcher.js';
import { REOPENED_LINE, sessionInquiryRowKey } from './contract.js';
import {
  OWNER_ALIVE_MESSAGE,
  OWNER_UNVERIFIED_MESSAGE,
  createSessionInquiryRuntime
} from './service.js';

const WS = '/tmp/example-workspace/project-a';
const SID_A = '11111111-1111-4111-8111-111111111111';
const SID_B = '22222222-2222-4222-8222-222222222222';
const NOW = 1_800_000_000_000;

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-si-service-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {Record<string, unknown>} [patch]
 * @returns {import('./contract.js').InquiryRequest}
 */
function request(patch = {}) {
  return {
    repo: WS,
    ref: 'refs/set-aside/main/2026-10-13-base-sync',
    session_id: SID_A,
    runner: 'claude',
    cwd: `${WS}/.worktrees/sync`,
    summary: '보관한 두 묶음을 다시 적용할까요?',
    bundles: [{ title: '설정 변경', paths: ['a.js'], reason: '충돌' }],
    related_beads: [],
    ...patch
  };
}

/**
 * Register one row on `store` and return its id.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {Record<string, unknown>} [patch]
 * @returns {string}
 */
function register(store, patch = {}) {
  const result = store.upsertSessionInquiry(WS, request(patch), {
    at: NOW,
    makeId: () => 'si-0123456789ab',
    notify: false
  });
  return /** @type {any} */ (result.row).id;
}

/**
 * A runtime over `store` with every outside seam faked.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {{ ref_code?: number, liveness?: import('../external-wait/session-resume.js').OwnerLiveness, duringLiveness?: () => void, switch_on?: boolean, launch?: any, focus?: any, launcher?: any }} [options]
 */
function runtimeFor(store, options = {}) {
  const launcher = options.launcher || {
    launch: vi.fn(
      options.launch ||
        (async () => ({
          session: 'launched',
          placement: 'inquiry',
          tmux_session: 'bdui-inquiry',
          tmux_window: 'inquiry-01234567',
          pane_id: '%9'
        }))
    ),
    focusRegistryPane: vi.fn(
      options.focus ||
        (async () => ({
          ok: true,
          tmux_session: 'dev',
          tmux_window: '@3'
        }))
    ),
    bridgeActive: vi.fn(() => false)
  };
  const run = vi.fn(async () => ({ code: options.ref_code ?? 0 }));
  const ownerLiveness = vi.fn(async () => {
    options.duringLiveness?.();
    return options.liveness || { state: 'dead', owner_tmux: null };
  });
  const notifyChanged = vi.fn();
  const runtime = createSessionInquiryRuntime({
    workspace: WS,
    store,
    launcher: /** @type {any} */ (launcher),
    ownerLiveness: /** @type {any} */ (ownerLiveness),
    autoLaunchEnabled: () => options.switch_on ?? true,
    tmuxSession: () => 'bdui-inquiry',
    run,
    notifyChanged,
    now: () => NOW + 1000,
    log: () => {}
  });
  return { runtime, launcher, run, ownerLiveness, notifyChanged };
}

/**
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {string} id
 */
function rowOf(store, id) {
  return /** @type {any} */ (store.snapshot(WS)).session_inquiries[id];
}

describe('session-inquiry reconcile: ref observation', () => {
  test('closes the row as ref_absent when show-ref exits 1', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, run } = runtimeFor(store, { ref_code: 1 });

    await runtime.reconcile();

    expect(run).toHaveBeenCalledWith(
      [
        'git',
        '-C',
        WS,
        'show-ref',
        '--verify',
        '--quiet',
        'refs/set-aside/main/2026-10-13-base-sync'
      ],
      expect.any(Object)
    );
    expect(rowOf(store, id)).toMatchObject({
      state: 'closed',
      closed_reason: 'ref_absent'
    });
  });

  test.each([128, 124, 127])(
    'leaves the row unchanged when show-ref exits %i',
    async (code) => {
      const store = createQueueStore();
      const id = register(store);
      const { runtime } = runtimeFor(store, {
        ref_code: code,
        liveness: { state: 'alive', owner_tmux: null }
      });

      await runtime.reconcile();

      expect(rowOf(store, id)).toMatchObject({
        state: 'waiting',
        closed_reason: null
      });
    }
  );

  test('ends the pass without a liveness write or a resume when show-ref fails', async () => {
    const store = createQueueStore();
    const id = register(store);
    const revision = store.snapshot(WS).revision;
    const { runtime, launcher, ownerLiveness } = runtimeFor(store, {
      ref_code: 128
    });

    await runtime.reconcile();

    expect(ownerLiveness).not.toHaveBeenCalled();
    expect(launcher.launch).not.toHaveBeenCalled();
    expect(rowOf(store, id).auto_resume_consumed).toEqual([]);
    expect(store.snapshot(WS).revision).toBe(revision);
  });

  test('keeps a live conversation window when the ref disappears', async () => {
    const store = createQueueStore();
    const id = register(store);
    store.recordInteractiveSession(WS, {
      bead_id: sessionInquiryRowKey(id),
      kind: 'external_resume',
      provider: 'claude',
      pane_id: '%9',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'inquiry-01234567',
      launched_at: NOW,
      state: 'live'
    });
    const { runtime } = runtimeFor(store, { ref_code: 1 });

    await runtime.reconcile();

    expect(rowOf(store, id).state).toBe('closed');
    expect(
      store.snapshot(WS).interactive_sessions[
        `${sessionInquiryRowKey(id)}:external_resume`
      ]
    ).toBeDefined();
  });
});

describe('session-inquiry reconcile: liveness observation', () => {
  test('writes liveness when it changes', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime } = runtimeFor(store, {
      liveness: { state: 'alive', owner_tmux: 'dev:@3.%7' }
    });

    await runtime.reconcile();

    expect(rowOf(store, id).liveness).toEqual({
      state: 'alive',
      at: NOW + 1000,
      tmux: 'dev:@3.%7'
    });
  });

  test('writes nothing when the liveness is unchanged', async () => {
    const store = createQueueStore();
    register(store);
    const { runtime } = runtimeFor(store, {
      liveness: { state: 'alive', owner_tmux: null }
    });
    await runtime.reconcile();
    const revision = store.snapshot(WS).revision;

    await runtime.reconcile();

    expect(store.snapshot(WS).revision).toBe(revision);
  });
});

describe('session-inquiry reconcile: automatic resume', () => {
  test('resumes a dead waiting session with --resume at the registered cwd', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store);

    await runtime.reconcile();

    expect(launcher.launch).toHaveBeenCalledTimes(1);
    const input = /** @type {any} */ (launcher.launch.mock.calls[0])[0];
    expect(input).toMatchObject({
      marker: EXTERNAL_RESUME_PANE_MARKER,
      key: sessionInquiryRowKey(id),
      cwd: `${WS}/.worktrees/sync`,
      runner: 'claude',
      placement: 'inquiry',
      window_name: 'inquiry-01234567'
    });
    expect(input.commandArgs.slice(0, 2)).toEqual(['--resume', SID_A]);
    expect(input.commandArgs).not.toContain('--fork-session');
    expect(input.commandArgs).not.toContain('--session-id');
    expect(input.commandArgs).toHaveLength(3);
  });

  test('gives the resumed session the summary and the reopened line only', async () => {
    const store = createQueueStore();
    register(store);
    const { runtime, launcher } = runtimeFor(store);

    await runtime.reconcile();

    const prompt = /** @type {any} */ (launcher.launch.mock.calls[0])[0]
      .commandArgs[2];
    expect(prompt).toBe(
      `보관한 두 묶음을 다시 적용할까요?\n${REOPENED_LINE} — refs/set-aside/main/2026-10-13-base-sync`
    );
    expect(prompt).not.toContain('## ');
  });

  test('records the window as the row conversation', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime } = runtimeFor(store);

    await runtime.reconcile();

    expect(
      store.snapshot(WS).interactive_sessions[
        `${sessionInquiryRowKey(id)}:external_resume`
      ]
    ).toMatchObject({
      mode: 'resume',
      session_id: SID_A,
      cwd: `${WS}/.worktrees/sync`,
      state: 'live'
    });
  });

  test('records the consumed session id before the launch', async () => {
    const store = createQueueStore();
    const id = register(store);
    /** @type {string[]|null} */
    let consumed_at_launch = null;
    const { runtime } = runtimeFor(store, {
      launch: async () => {
        consumed_at_launch = rowOf(store, id).auto_resume_consumed;
        return { session: 'not_launched', reason: 'tmux_unavailable' };
      }
    });

    await runtime.reconcile();

    expect(consumed_at_launch).toEqual([SID_A]);
  });

  test.each(
    /** @type {Array<[string, Record<string, any>, (store: any, id: string) => void]>} */ ([
      [
        'a held row',
        {},
        (store, id) =>
          store.transitionSessionInquiry(WS, id, { state: 'held', at: NOW })
      ],
      [
        'a live session',
        { liveness: { state: 'alive', owner_tmux: null } },
        () => {}
      ],
      [
        'an unverified session',
        { liveness: { state: 'unverified', owner_tmux: null } },
        () => {}
      ],
      ['the switch off', { switch_on: false }, () => {}],
      [
        'a live conversation on the row',
        {},
        (store, id) =>
          store.recordInteractiveSession(WS, {
            bead_id: sessionInquiryRowKey(id),
            kind: 'external_resume',
            provider: 'claude',
            pane_id: '%9',
            tmux_session: 'bdui-inquiry',
            tmux_window: 'inquiry-01234567',
            launched_at: NOW,
            state: 'live'
          })
      ],
      [
        'a consumed session id',
        {},
        (store, id) =>
          store.patchSessionInquiry(WS, id, (/** @type {any} */ row) => {
            row.auto_resume_consumed.push(SID_A);
            return true;
          })
      ]
    ])
  )('launches nothing for %s', async (_label, options, seed) => {
    const store = createQueueStore();
    const id = register(store);
    seed(store, id);
    const { runtime, launcher } = runtimeFor(store, options);

    await runtime.reconcile();

    expect(launcher.launch).not.toHaveBeenCalled();
  });

  test('resumes once per session id across passes', async () => {
    const store = createQueueStore();
    register(store);
    const { runtime, launcher } = runtimeFor(store, {
      launch: async () => ({
        session: 'not_launched',
        reason: 'launch_failed:exited'
      })
    });

    await runtime.reconcile();
    await runtime.reconcile();

    expect(launcher.launch).toHaveBeenCalledTimes(1);
  });

  test('resumes nothing again after a restart', async () => {
    const store = createQueueStore();
    register(store);
    await runtimeFor(store, {
      launch: async () => ({ session: 'not_launched', reason: 'error' })
    }).runtime.reconcile();
    const restarted = createQueueStore();
    const { runtime, launcher } = runtimeFor(restarted);

    await runtime.reconcile();

    expect(launcher.launch).not.toHaveBeenCalled();
  });

  test('resumes nothing again when the session returns from B to A', async () => {
    const store = createQueueStore();
    register(store);
    const failing = {
      launch: async () => ({ session: 'not_launched', reason: 'x' })
    };
    await runtimeFor(store, failing).runtime.reconcile();
    register(store, { session_id: SID_B });
    await runtimeFor(store, failing).runtime.reconcile();
    register(store, { session_id: SID_A });
    const { runtime, launcher } = runtimeFor(store);

    await runtime.reconcile();

    expect(launcher.launch).not.toHaveBeenCalled();
  });
});

describe('session-inquiry click', () => {
  test('brings the live registered session window forward without launching', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store, {
      liveness: { state: 'alive', owner_tmux: 'dev:@3.%7' }
    });

    const result = await runtime.click(id);

    expect(launcher.focusRegistryPane).toHaveBeenCalledWith('dev:@3.%7');
    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      session: 'already_running',
      tmux_session: 'dev',
      tmux_window: '@3'
    });
  });

  test('answers with the alive sentence when the live session has no tmux location', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store, {
      liveness: { state: 'alive', owner_tmux: null }
    });

    const result = await runtime.click(id);

    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'owner_alive',
      message: OWNER_ALIVE_MESSAGE
    });
  });

  test('refuses an unverified registered session', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store, {
      liveness: { state: 'unverified', owner_tmux: null }
    });

    const result = await runtime.click(id);

    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      reason: 'owner_unverified',
      message: OWNER_UNVERIFIED_MESSAGE
    });
  });

  test('resumes a dead held row in the person tmux session', async () => {
    const store = createQueueStore();
    const id = register(store);
    store.transitionSessionInquiry(WS, id, { state: 'held', at: NOW });
    const { runtime, launcher } = runtimeFor(store);

    const result = await runtime.click(id);

    expect(launcher.launch.mock.calls[0][0]).toMatchObject({
      placement: 'user',
      commandArgs: expect.arrayContaining(['--resume', SID_A])
    });
    expect(result).toMatchObject({ launched: true, mode: 'resume' });
  });

  test('writes no consumed session id on a click', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime } = runtimeFor(store);

    await runtime.click(id);

    expect(rowOf(store, id).auto_resume_consumed).toEqual([]);
  });

  test('refuses a closed row', async () => {
    const store = createQueueStore();
    const id = register(store);
    store.transitionSessionInquiry(WS, id, { state: 'closed', at: NOW });
    const { runtime, launcher } = runtimeFor(store);

    const result = await runtime.click(id);

    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result.reason).toBe('inquiry_closed');
  });

  test('refuses a row closed while its liveness was checked', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store, {
      duringLiveness: () =>
        store.transitionSessionInquiry(WS, id, { state: 'closed', at: NOW })
    });

    const result = await runtime.click(id);

    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'inquiry_closed'
    });
  });

  test('refuses a row whose session was replaced while its liveness was checked', async () => {
    const store = createQueueStore();
    const id = register(store);
    const { runtime, launcher } = runtimeFor(store, {
      duringLiveness: () => register(store, { session_id: SID_B })
    });

    const result = await runtime.click(id);

    expect(rowOf(store, id).session_id).toBe(SID_B);
    expect(launcher.launch).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'session_replaced'
    });
  });
});

describe('session-inquiry resume launch flags', () => {
  test('resumes without the conversation model and effort flags', async () => {
    const store = createQueueStore();
    register(store);
    const runSessionHub = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'find') {
        return hubReply({ found: false });
      }
      if (args[0] === 'alive') {
        return hubReply({ alive: 'alive' });
      }
      return hubReply({
        status: 'launched',
        tmux_session: 'bdui-inquiry',
        window: '@9',
        pane: '%9'
      });
    });
    const launcher = createTmuxLauncher({
      runSessionHub,
      runTmux: vi.fn(async () => ({ code: 0, stdout: '', stderr: '' })),
      resolveRunner: () => '/bin/claude',
      launchFlags: () => ['--model', 'opus', '--effort', 'high'],
      log: () => {}
    });
    const { runtime } = runtimeFor(store, { launcher });

    await runtime.reconcile();

    const open = runSessionHub.mock.calls
      .map(([args]) => args)
      .find((args) => args[0] === 'open');
    expect(open?.slice(open.indexOf('--') + 1)).toEqual([
      '/bin/claude',
      '--allow-dangerously-skip-permissions',
      '--resume',
      SID_A,
      expect.any(String)
    ]);
  });
});

describe('session-inquiry announce', () => {
  test('sends the creation push with the ref tail and the Discord thread', async () => {
    const store = createQueueStore();
    const id = register(store);
    const sessionInquiryCreated = vi.fn(async () => true);
    const runtime = createSessionInquiryRuntime({
      workspace: WS,
      store,
      launcher: /** @type {any} */ ({ bridgeActive: () => false }),
      ownerLiveness: async () => ({ state: 'dead', owner_tmux: null }),
      autoLaunchEnabled: () => true,
      tmuxSession: () => 'bdui-inquiry',
      run: async () => ({ code: 0 }),
      notifyChanged: () => {},
      notify: { sessionInquiryCreated },
      discordUrlOf: (session_id) =>
        session_id === SID_A ? 'https://discord.com/channels/1/2' : null,
      log: () => {}
    });

    await runtime.announce(rowOf(store, id));

    expect(sessionInquiryCreated).toHaveBeenCalledWith({
      repo: WS,
      ref_tail: '…ain/2026-10-13-base-sync',
      summary: '보관한 두 묶음을 다시 적용할까요?',
      link: 'https://discord.com/channels/1/2'
    });
  });
});
