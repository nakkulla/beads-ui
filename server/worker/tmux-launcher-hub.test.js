import { describe, expect, test, vi } from 'vitest';
import { hubReply } from '../../test/session-hub.js';
import {
  EXTERNAL_RESUME_PANE_MARKER,
  INQUIRY_PANE_MARKER,
  RESOLVE_PANE_MARKER,
  createTmuxLauncher
} from './tmux-launcher.js';

const INPUT = {
  marker: RESOLVE_PANE_MARKER,
  key: 'foreign:UI-g4vm',
  tmux_session: 'bdui-inquiry',
  window_name: 'resolve-UI-g4vm',
  cwd: '/tmp/a project',
  commandArgs: ['--resume', 'sid', 'a "quoted" prompt\nwith $literal text']
};
const LOCATION = {
  tmux_session: 'bdui-inquiry',
  window: '@9',
  pane: '%9'
};

/**
 * Replace the CLI boundary, leaving launcher argument construction intact.
 *
 * @param {Record<string, any>} [script]
 * @param {string[]} [flags] - The conversation settings' model/effort flags.
 */
function makeHub(script = {}, flags = []) {
  const runSessionHub = vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'find') {
      return hubReply(script.find ?? { found: false });
    }
    if (args[0] === 'alive') {
      return hubReply({ alive: script.alive ?? 'alive' });
    }
    return hubReply({ status: 'launched', ...LOCATION, ...script.open });
  });
  const runTmux = vi.fn(async () => ({
    code: script.select_code ?? 0,
    stdout: '',
    stderr: ''
  }));
  const launcher = createTmuxLauncher({
    runSessionHub,
    runTmux,
    resolveRunner: () => '/bin/claude',
    launchFlags: () => flags,
    log: () => {}
  });
  return { launcher, runSessionHub, runTmux };
}

/**
 * The argv after `--` of the hub `open` call.
 *
 * @param {import('vitest').Mock} runSessionHub
 * @returns {string[]}
 */
function openedCommand(runSessionHub) {
  const open = runSessionHub.mock.calls
    .map(([args]) => /** @type {string[]} */ (args))
    .find((args) => args[0] === 'open');
  if (!open) {
    throw new Error('open call missing');
  }
  return open.slice(open.indexOf('--') + 1);
}

describe('conversation model/effort flags', () => {
  test('puts the conversation flags before the resume arguments', async () => {
    const { launcher, runSessionHub } = makeHub({}, ['--model', 'opus']);

    await launcher.launch(INPUT);

    expect(openedCommand(runSessionHub)).toEqual([
      '/bin/claude',
      '--model',
      'opus',
      ...INPUT.commandArgs
    ]);
  });

  test('leaves the conversation flags out when the launch declines them', async () => {
    const { launcher, runSessionHub } = makeHub({}, ['--model', 'opus']);

    await launcher.launch({ ...INPUT, conversation_flags: false });

    expect(openedCommand(runSessionHub)).toEqual([
      '/bin/claude',
      ...INPUT.commandArgs
    ]);
  });
});

describe('session-hub interactive launch', () => {
  test('starts through the hub when no server or marked window exists', async () => {
    const { launcher, runSessionHub, runTmux } = makeHub({
      open: { server_started: true, placement: 'session' }
    });

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({
      session: 'launched',
      placement: 'inquiry',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'resolve-UI-g4vm',
      pane_id: '%9'
    });
    expect(runSessionHub.mock.calls.map(([args]) => args[0])).toEqual([
      'find',
      'open',
      'alive'
    ]);
    expect(runTmux).not.toHaveBeenCalled();
    expect(runSessionHub.mock.calls[1][0]).toEqual([
      'open',
      '--cwd',
      INPUT.cwd,
      '--window-name',
      INPUT.window_name,
      '--marker-option',
      INPUT.marker,
      '--marker-value',
      INPUT.key,
      '--session',
      INPUT.tmux_session,
      '--',
      '/bin/claude',
      ...INPUT.commandArgs
    ]);
    expect(runSessionHub.mock.calls[2][0]).toEqual([
      'alive',
      '--pane',
      '%9',
      '--marker-option',
      INPUT.marker,
      '--marker-value',
      INPUT.key
    ]);
  });

  test.each([
    INQUIRY_PANE_MARKER,
    RESOLVE_PANE_MARKER,
    EXTERNAL_RESUME_PANE_MARKER
  ])('keeps the existing %s marker and caller window name', async (marker) => {
    const { launcher, runSessionHub } = makeHub({
      find: { found: true, ...LOCATION }
    });

    const result = await launcher.launch({ ...INPUT, marker });

    expect(result).toMatchObject({
      session: 'already_running',
      tmux_window: INPUT.window_name
    });
    expect(runSessionHub).toHaveBeenCalledExactlyOnceWith([
      'find',
      '--marker-option',
      marker,
      '--marker-value',
      INPUT.key
    ]);
  });

  test('accepts exists when another caller won the hub opening race', async () => {
    const { launcher } = makeHub({
      open: { status: 'exists', window: '@10' }
    });

    const result = await launcher.launch(INPUT);

    expect(result).toMatchObject({
      session: 'already_running',
      tmux_window: INPUT.window_name
    });
  });

  test('delegates attached placement and focuses the returned user pane', async () => {
    const { launcher, runSessionHub, runTmux } = makeHub({
      open: { tmux_session: 'dev', placement: 'attached' }
    });

    const result = await launcher.launch({ ...INPUT, placement: 'user' });

    expect(result).toMatchObject({ placement: 'user', tmux_session: 'dev' });
    expect(runSessionHub.mock.calls[1][0]).toEqual([
      'open',
      '--cwd',
      INPUT.cwd,
      '--window-name',
      INPUT.window_name,
      '--marker-option',
      INPUT.marker,
      '--marker-value',
      INPUT.key,
      '--attached',
      '--exclude-session',
      'bdui-inquiry',
      '--fallback-session',
      'bdui-inquiry',
      '--',
      '/bin/claude',
      ...INPUT.commandArgs
    ]);
    expect(runTmux).toHaveBeenCalledExactlyOnceWith([
      'select-window',
      '-t',
      '%9'
    ]);
  });

  test('leaves a fallback inquiry window in the background', async () => {
    const { launcher, runSessionHub, runTmux } = makeHub({
      open: { placement: 'fallback' }
    });

    const result = await launcher.launch({ ...INPUT, placement: 'user' });

    expect(result).toMatchObject({ session: 'launched', placement: 'inquiry' });
    expect(runSessionHub.mock.calls[1][0]).not.toContain('--focus');
    expect(runTmux).not.toHaveBeenCalled();
  });

  test.each([0, 1])(
    'keeps a found click window alive after focus exit %i',
    async (select_code) => {
      const { launcher, runTmux } = makeHub({
        find: { found: true, ...LOCATION },
        select_code
      });

      const result = await launcher.focusRunning({
        ...INPUT,
        placement: 'user'
      });

      expect(result).toMatchObject({
        ok: true,
        outcome: { session: 'already_running', pane_id: '%9' }
      });
      expect(runTmux).toHaveBeenCalledExactlyOnceWith([
        'select-window',
        '-t',
        '%9'
      ]);
    }
  );

  test.each([
    ['repo_not_allowed', 'launch_failed:repo_not_allowed', 2],
    ['protected_folder', 'launch_failed:protected_folder', 2],
    ['start_failed', 'launch_failed:exited', 2],
    ['tmux_unavailable', 'tmux_unavailable', 3],
    ['bad_config', 'launch_failed:bad_config', 3],
    ['busy', 'launch_failed:busy', 2]
  ])(
    'maps hub refusal %s without running a tmux fallback',
    async (code, reason, exit) => {
      const { launcher, runSessionHub, runTmux } = makeHub();
      runSessionHub.mockResolvedValueOnce(hubReply({ found: false }));
      runSessionHub.mockResolvedValueOnce(
        hubReply({ code, reason: 'refusal', next: '' }, Number(exit))
      );

      const result = await launcher.launch(INPUT);

      expect(result).toEqual({ session: 'not_launched', reason });
      expect(runTmux).not.toHaveBeenCalled();
    }
  );

  test.each([
    ['dead', 'launch_failed:exited'],
    ['unknown', 'tmux_unavailable']
  ])('keeps hub liveness %s distinct', async (alive, reason) => {
    const { launcher } = makeHub({ alive });

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({ session: 'not_launched', reason });
  });

  test.each([
    'not JSON',
    'null',
    '[]',
    '{"ok":true}',
    '{"ok":true,"found":true,"pane":"oops"}'
  ])('refuses malformed hub evidence %s', async (stdout) => {
    const { launcher, runSessionHub } = makeHub();
    runSessionHub.mockResolvedValueOnce({ code: 0, stdout, stderr: '' });

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({
      session: 'not_launched',
      reason: 'launch_failed:session_hub_invalid_response'
    });
    expect(runSessionHub).toHaveBeenCalledTimes(1);
  });

  test('does not interpret failed find as an absent pane', async () => {
    const { launcher, runSessionHub } = makeHub();
    runSessionHub.mockResolvedValueOnce(
      hubReply({ code: 'tmux_unavailable' }, 3)
    );

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({
      session: 'not_launched',
      reason: 'tmux_unavailable'
    });
    expect(runSessionHub).toHaveBeenCalledTimes(1);
  });

  test('reports a missing hub executable without throwing', async () => {
    const { launcher, runSessionHub } = makeHub();
    runSessionHub.mockRejectedValueOnce(new Error('ENOENT'));

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({
      session: 'not_launched',
      reason: 'launch_failed:session_hub_unavailable'
    });
  });
});
