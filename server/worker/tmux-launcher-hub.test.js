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
    if (args[0] === 'focus') {
      return script.focus_code
        ? hubReply({ code: 'focus_failed' }, script.focus_code)
        : hubReply({ focused: true, pane: args[2] });
    }
    return hubReply({ status: 'launched', ...LOCATION, ...script.open });
  });
  const launcher = createTmuxLauncher({
    runSessionHub,
    resolveRunner: () => '/bin/claude',
    launchFlags: () => flags,
    log: () => {}
  });
  return { launcher, runSessionHub };
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
      '--allow-dangerously-skip-permissions',
      '--permission-mode',
      'bypassPermissions',
      '--no-chrome',
      '--model',
      'opus',
      ...INPUT.commandArgs
    ]);
  });

  test('keeps permission switching available when the launch declines conversation flags', async () => {
    const { launcher, runSessionHub } = makeHub({}, ['--model', 'opus']);

    await launcher.launch({ ...INPUT, conversation_flags: false });

    expect(openedCommand(runSessionHub)).toEqual([
      '/bin/claude',
      '--allow-dangerously-skip-permissions',
      '--permission-mode',
      'bypassPermissions',
      '--no-chrome',
      ...INPUT.commandArgs
    ]);
  });
});

describe('session-hub interactive launch', () => {
  test('starts through the hub when no server or marked window exists', async () => {
    const { launcher, runSessionHub } = makeHub({
      open: { server_started: true, placement: 'session' }
    });

    const result = await launcher.launch(INPUT);

    expect(result).toEqual({
      session: 'launched',
      placement: 'inquiry',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'resolve-UI-g4vm',
      pane_id: '%9',
      mux: 'tmux'
    });
    expect(runSessionHub.mock.calls.map(([args]) => args[0])).toEqual([
      'find',
      'open',
      'alive'
    ]);
    expect(runSessionHub.mock.calls.map(([args]) => args[0])).not.toContain(
      'focus'
    );
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
      '--allow-dangerously-skip-permissions',
      '--permission-mode',
      'bypassPermissions',
      '--no-chrome',
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

  test('opens a click window in the configured session and selects it', async () => {
    const { launcher, runSessionHub } = makeHub();

    const result = await launcher.launch({ ...INPUT, placement: 'user' });

    expect(result).toMatchObject({
      session: 'launched',
      placement: 'inquiry',
      tmux_session: 'bdui-inquiry'
    });
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
      '--allow-dangerously-skip-permissions',
      '--permission-mode',
      'bypassPermissions',
      '--no-chrome',
      ...INPUT.commandArgs
    ]);
    expect(runSessionHub.mock.calls.at(-1)?.[0]).toEqual([
      'focus',
      '--pane',
      '%9'
    ]);
  });

  test('leaves an automatic window in the background', async () => {
    const { launcher, runSessionHub } = makeHub();

    const result = await launcher.launch({ ...INPUT, placement: 'inquiry' });

    expect(result).toMatchObject({ session: 'launched', placement: 'inquiry' });
    expect(runSessionHub.mock.calls[1][0]).toContain('--session');
    expect(runSessionHub.mock.calls.map(([args]) => args[0])).not.toContain(
      'focus'
    );
  });

  test('finds a click window already open in a user session without moving it', async () => {
    const { launcher, runSessionHub } = makeHub({
      find: { found: true, ...LOCATION, tmux_session: 'dev' }
    });

    const result = await launcher.launch({ ...INPUT, placement: 'user' });

    expect(result).toMatchObject({
      session: 'already_running',
      placement: 'user',
      tmux_session: 'dev',
      pane_id: '%9'
    });
    expect(runSessionHub.mock.calls.map(([args]) => args)).toEqual([
      ['find', '--marker-option', INPUT.marker, '--marker-value', INPUT.key],
      ['focus', '--pane', '%9']
    ]);
  });

  test.each([0, 1])(
    'keeps a found click window alive after focus exit %i',
    async (focus_code) => {
      const { launcher, runSessionHub } = makeHub({
        find: { found: true, ...LOCATION },
        focus_code
      });

      const result = await launcher.focusRunning({
        ...INPUT,
        placement: 'user'
      });

      expect(result).toMatchObject({
        ok: true,
        outcome: { session: 'already_running', pane_id: '%9' }
      });
      expect(runSessionHub.mock.calls.at(-1)?.[0]).toEqual([
        'focus',
        '--pane',
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
    'maps hub refusal %s without any other call',
    async (code, reason, exit) => {
      const { launcher, runSessionHub } = makeHub();
      runSessionHub.mockResolvedValueOnce(hubReply({ found: false }));
      runSessionHub.mockResolvedValueOnce(
        hubReply({ code, reason: 'refusal', next: '' }, Number(exit))
      );

      const result = await launcher.launch(INPUT);

      expect(result).toEqual({ session: 'not_launched', reason });
      expect(runSessionHub).toHaveBeenCalledTimes(2);
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

describe('session-hub launch on a non-tmux backend', () => {
  const HERDR = { pane: 'wR:p2', window: 'wR:2', mux: 'herdr' };

  test('keeps the pane handle and backend of an opened window', async () => {
    const { launcher, runSessionHub } = makeHub({ open: HERDR });

    const result = await launcher.launch(INPUT);

    expect(result).toMatchObject({
      session: 'launched',
      pane_id: 'wR:p2',
      mux: 'herdr'
    });
    expect(runSessionHub.mock.calls.at(-1)?.[0]).toEqual([
      'alive',
      '--pane',
      'wR:p2',
      '--marker-option',
      INPUT.marker,
      '--marker-value',
      INPUT.key
    ]);
  });

  test('adopts a found window under its own pane handle and backend', async () => {
    const { launcher } = makeHub({
      find: { found: true, ...LOCATION, ...HERDR }
    });

    const result = await launcher.launch(INPUT);

    expect(result).toMatchObject({
      session: 'already_running',
      pane_id: 'wR:p2',
      mux: 'herdr'
    });
  });

  test('focuses a found click window by its pane handle', async () => {
    const { launcher, runSessionHub } = makeHub({
      find: { found: true, ...LOCATION, ...HERDR, tmux_session: 'dev' }
    });

    await launcher.launch({ ...INPUT, placement: 'user' });

    expect(runSessionHub.mock.calls.at(-1)?.[0]).toEqual([
      'focus',
      '--pane',
      'wR:p2'
    ]);
  });

  test('reads a hub answer without a mux field as tmux', async () => {
    const { launcher } = makeHub({ find: { found: true, ...LOCATION } });

    const result = await launcher.launch(INPUT);

    expect(result).toMatchObject({ session: 'already_running', mux: 'tmux' });
  });
});
