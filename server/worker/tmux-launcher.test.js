import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { hubReply } from '../../test/session-hub.js';
import { __resetConversationSettingsForTest } from '../conversation-settings.js';
import { agyConversationArgs } from './runner/agy.js';
import { __resetRuntimeCatalogForTest } from './runner/index.js';
import {
  INQUIRY_PANE_MARKER,
  RESOLVE_PANE_MARKER,
  SESSION_LANE_PANE_MARKER,
  createTmuxLauncher,
  defaultResolveRunner,
  markerWrapper,
  paneFormatExtended,
  withLaunchFlags
} from './tmux-launcher.js';

/**
 * Render the requested tmux format with C-locale TAB sanitization.
 *
 * @param {string} format
 * @param {Record<string, string>[]} panes
 */
function renderPanes(format, panes) {
  return panes
    .map(
      (pane) =>
        format
          .replace(/#\{([^}]+)\}/g, (_, field) => pane[field] ?? '')
          .replaceAll('\t', '_') + '\n'
    )
    .join('');
}

describe('tmux-launcher C-locale pane listing', () => {
  test.each(['', 'UI-gcf6', 'foreign:rig:UI-gcf6'])(
    'preserves marker value %j and pane liveness',
    async (key) => {
      const launcher = createTmuxLauncher({
        runTmux: async (args) => ({
          code: 0,
          stdout: renderPanes(args[3], [
            {
              session_name: 'bdui-inquiry',
              pane_id: '%1',
              pane_dead: '0',
              [INQUIRY_PANE_MARKER]: key
            },
            {
              session_name: 'other_session',
              pane_id: '%2',
              pane_dead: '1'
            }
          ]),
          stderr: ''
        })
      });

      const result = await launcher.listPanes(INQUIRY_PANE_MARKER);

      expect(result).toEqual({
        ok: true,
        rows: [
          { session: 'bdui-inquiry', pane: '%1', dead: '0', key },
          { session: 'other_session', pane: '%2', dead: '1', key: '' }
        ]
      });
    }
  );
});

/** @type {string[]} */
const temp_dirs = [];
let test_dir = '';
let codex_home = '';

describe('tmux interactive session inspection and exit', () => {
  /**
   * Build a launcher whose tmux renders the requested extended format.
   *
   * @param {string} marker
   * @param {Record<string, string>[]} panes
   */
  function extendedLauncher(marker, panes) {
    return createTmuxLauncher({
      runTmux: async (args) => ({
        code: 0,
        stdout: renderPanes(
          args[3],
          panes.map(({ key = '', ...fields }) => ({
            session_name: 'hub',
            window_name: 'window',
            pane_dead: '0',
            ...fields,
            [marker]: key
          }))
        ),
        stderr: ''
      })
    });
  }

  test('keeps runtime-like path segments inside the cwd', async () => {
    const launcher = extendedLauncher(RESOLVE_PANE_MARKER, [
      {
        pane_id: '%9',
        pane_current_path: '/repo:claude:work::tree',
        '@agent_runtime': 'codex',
        key: 'foreign:UI-1'
      }
    ]);

    const result = await launcher.listPanesExtended(RESOLVE_PANE_MARKER);

    expect(result).toMatchObject({
      ok: true,
      rows: [
        {
          cwd: '/repo:claude:work::tree',
          agent_runtime: 'codex',
          key: 'foreign:UI-1'
        }
      ]
    });
  });

  test('exposes the agent running and attention pane options', async () => {
    const launcher = extendedLauncher(RESOLVE_PANE_MARKER, [
      {
        pane_id: '%9',
        '@agent_running': '1',
        '@agent_attention': 'question',
        pane_current_path: '/repo:a',
        '@agent_runtime': 'codex',
        key: 'UI-1'
      }
    ]);

    const result = await launcher.listPanesExtended(RESOLVE_PANE_MARKER);

    expect(result).toMatchObject({
      ok: true,
      rows: [
        {
          agent_running: '1',
          agent_attention: 'question',
          cwd: '/repo:a',
          agent_runtime: 'codex',
          key: 'UI-1'
        }
      ]
    });
  });

  test('keeps a pane whose runtime marker is agy', async () => {
    const launcher = extendedLauncher(SESSION_LANE_PANE_MARKER, [
      {
        session_name: 'hub',
        window_name: 'dotfiles-uop05',
        pane_id: '%26',
        '@agent_running': '1',
        pane_current_path: '/repo',
        '@agent_runtime': 'agy',
        key: 'dotfiles-uop05'
      },
      { pane_id: '%27', pane_current_path: '/repo' }
    ]);

    const result = await launcher.listPanesExtended(SESSION_LANE_PANE_MARKER);

    expect(result).toMatchObject({
      ok: true,
      rows: [
        { pane: '%26', agent_runtime: 'agy', key: 'dotfiles-uop05' },
        { pane: '%27', agent_runtime: '', key: '' }
      ]
    });
  });

  test.each([
    ['/repo', 'unknown-runtime'],
    ['/repo:claude:work', 'unknown-runtime'],
    ['/repo::work', 'unknown-runtime']
  ])(
    'fails the listing when a marked row with cwd %j has runtime %j',
    async (pane_current_path, agent_runtime) => {
      const launcher = extendedLauncher(SESSION_LANE_PANE_MARKER, [
        {
          pane_id: '%1',
          pane_current_path: '/repo',
          '@agent_runtime': 'claude',
          key: 'UI-1'
        },
        {
          pane_id: '%2',
          pane_current_path,
          '@agent_runtime': agent_runtime,
          key: 'UI-2'
        }
      ]);

      const result = await launcher.listPanesExtended(SESSION_LANE_PANE_MARKER);

      expect(result).toMatchObject({ ok: false });
    }
  );

  test('skips an unparsed row that carries no marker value', async () => {
    const launcher = extendedLauncher(SESSION_LANE_PANE_MARKER, [
      {
        pane_id: '%1',
        pane_current_path: '/repo',
        '@agent_runtime': 'claude',
        key: 'UI-1'
      },
      {
        pane_id: '%2',
        pane_current_path: '/repo:claude:work',
        '@agent_runtime': 'unknown-runtime'
      }
    ]);

    const result = await launcher.listPanesExtended(SESSION_LANE_PANE_MARKER);

    expect(result).toMatchObject({
      ok: true,
      rows: [{ pane: '%1', key: 'UI-1' }]
    });
  });

  test.each(['claude', 'codex', 'agy', 'hermes', ''])(
    'preserves cwd and marker colons for runtime %j',
    async (agent_runtime) => {
      const runTmux = vi.fn(async (/** @type {string[]} */ args) => ({
        code: 0,
        stdout: renderPanes(args[3], [
          {
            session_name: 'inquiry',
            window_name: 'resolve-UI-1',
            pane_id: '%9',
            pane_dead: '0',
            pane_current_path: '/repo:with:colons',
            '@agent_runtime': agent_runtime,
            [RESOLVE_PANE_MARKER]: 'foreign:rig:UI-1'
          }
        ]),
        stderr: ''
      }));
      const launcher = createTmuxLauncher({ runTmux });

      const result = await launcher.listPanesExtended(RESOLVE_PANE_MARKER);

      expect(runTmux).toHaveBeenCalledExactlyOnceWith([
        'list-panes',
        '-a',
        '-F',
        paneFormatExtended(RESOLVE_PANE_MARKER)
      ]);
      expect(result).toEqual({
        ok: true,
        rows: [
          {
            session: 'inquiry',
            window: 'resolve-UI-1',
            pane: '%9',
            dead: '0',
            agent_running: '',
            agent_attention: '',
            cwd: '/repo:with:colons',
            agent_runtime,
            key: 'foreign:rig:UI-1'
          }
        ]
      });
    }
  );

  test.each([' session-id \n', '', '  \n'])(
    'reads optional pane value %j',
    async (stdout) => {
      const runTmux = vi.fn(async () => ({ code: 0, stdout, stderr: '' }));
      const launcher = createTmuxLauncher({ runTmux });

      const result = await launcher.readPaneOption('%9', '@agent_session');

      expect(runTmux).toHaveBeenCalledExactlyOnceWith([
        'show-options',
        '-pqv',
        '-t',
        '%9',
        '@agent_session'
      ]);
      expect(result).toEqual({ ok: true, value: stdout.trim() || null });
    }
  );

  test('reports a thrown option read as a failed observation', async () => {
    const launcher = createTmuxLauncher({
      runTmux: async () => {
        throw new Error('offline');
      }
    });

    const result = await launcher.readPaneOption('%9', '@agent_session');

    expect(result).toEqual({ ok: false, error: 'Error: offline' });
  });

  test.each(['option', 'capture'])(
    'reports a nonzero %s read as a failed observation',
    async (operation) => {
      const launcher = createTmuxLauncher({
        runTmux: async () => ({ code: 1, stdout: '', stderr: 'missing pane' })
      });

      const result =
        operation === 'option'
          ? await launcher.readPaneOption('%9', '@agent_running')
          : await launcher.capturePaneTail('%9');

      expect(result).toEqual({ ok: false, error: 'missing pane' });
    }
  );

  test('types exit literally before submitting Enter', async () => {
    const runTmux = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const launcher = createTmuxLauncher({ runTmux });

    const result = await launcher.sendExit('%9');

    expect(result).toEqual({ ok: true });
    expect(runTmux.mock.calls).toEqual([
      [['send-keys', '-t', '%9', '-l', '/exit']],
      [['send-keys', '-t', '%9', 'Enter']]
    ]);
  });

  test('does not submit Enter when literal exit input fails', async () => {
    const runTmux = vi.fn(async () => ({
      code: 1,
      stdout: '',
      stderr: 'missing pane'
    }));
    const launcher = createTmuxLauncher({ runTmux });

    const result = await launcher.sendExit('%9');

    expect(result).toEqual({ ok: false, error: 'missing pane' });
    expect(runTmux).toHaveBeenCalledTimes(1);
  });

  test('kills the selected session window', async () => {
    const runTmux = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const launcher = createTmuxLauncher({ runTmux });

    const result = await launcher.killWindow('inquiry', 'resolve-UI-1');

    expect(result).toEqual({ ok: true });
    expect(runTmux).toHaveBeenCalledExactlyOnceWith([
      'kill-window',
      '-t',
      'inquiry:resolve-UI-1'
    ]);
  });

  test.each([
    ['earlier\n ❯ \n   \n', '❯'],
    ['❯\nmodel: Opus\nContext: 12%\nsid: abc\n⏵⏵ auto mode on\n', '❯'],
    ['❯ draft\nmodel: Opus\n⏵⏵ auto mode on\n', '❯ draft'],
    ['❯ earlier\noutput\n❯\ncustom status\n', '❯'],
    ['❯\noutput\n❯ draft\ncustom status\n', '❯ draft'],
    ['Working...\ncustom status\n', null],
    ['\n \n', null]
  ])('captures the last Claude prompt from %j', async (stdout, expected) => {
    const runTmux = vi.fn(async () => ({
      code: 0,
      stdout: /** @type {string} */ (stdout),
      stderr: ''
    }));
    const launcher = createTmuxLauncher({ runTmux });

    const result = await launcher.capturePaneTail('%9');

    expect(result).toEqual({ ok: true, line: expected });
    expect(runTmux).toHaveBeenCalledExactlyOnceWith([
      'capture-pane',
      '-p',
      '-t',
      '%9'
    ]);
  });

  test.each(['list', 'exit', 'kill', 'capture'])(
    'reports a thrown %s operation',
    async (operation) => {
      const launcher = createTmuxLauncher({
        runTmux: async () => {
          throw new Error('offline');
        }
      });

      const result =
        operation === 'list'
          ? await launcher.listPanesExtended(RESOLVE_PANE_MARKER)
          : operation === 'exit'
            ? await launcher.sendExit('%9')
            : operation === 'kill'
              ? await launcher.killWindow('inquiry', 'resolve-UI-1')
              : await launcher.capturePaneTail('%9');

      expect(result).toEqual({ ok: false, error: 'Error: offline' });
    }
  );
});

describe('bridge thread projection', () => {
  test('reads a session-keyed map while keeping absent link fields nullable', () => {
    const file = path.join(test_dir, 'threads.json');
    fs.writeFileSync(
      file,
      JSON.stringify({
        legacy: { thread_id: 123 },
        linked: {
          thread_id: '456',
          url: 'https://discord.com/channels/1/456',
          guild_id: '1'
        },
        broken: {}
      })
    );
    const launcher = createTmuxLauncher({ bridgeStateDir: test_dir });

    const result = launcher.readBridgeThreads();

    expect(result).toEqual(
      new Map([
        ['legacy', { thread_id: 123, url: null, guild_id: null }],
        [
          'linked',
          {
            thread_id: '456',
            url: 'https://discord.com/channels/1/456',
            guild_id: '1'
          }
        ]
      ])
    );
  });

  test('reuses the cached map until the file mtime changes', () => {
    const file = path.join(test_dir, 'threads.json');
    let mtime = 1;
    const launcher = createTmuxLauncher({
      bridgeStateDir: test_dir,
      statFile: () => ({ mtimeMs: mtime })
    });
    fs.writeFileSync(file, '{"sid":{"thread_id":"first"}}');
    const first = launcher.readBridgeThreads();
    fs.writeFileSync(file, '{"sid":{"thread_id":"next"}}');

    const cached = launcher.readBridgeThreads();
    mtime = 2;
    const refreshed = launcher.readBridgeThreads();

    expect(cached).toBe(first);
    expect(cached.get('sid')?.thread_id).toBe('first');
    expect(refreshed.get('sid')?.thread_id).toBe('next');
  });

  test.each(['missing', 'corrupt', 'array'])(
    'returns an empty map for a %s file',
    (condition) => {
      if (condition !== 'missing') {
        fs.writeFileSync(
          path.join(test_dir, 'threads.json'),
          condition === 'corrupt' ? '{' : '[]'
        );
      }
      const launcher = createTmuxLauncher({ bridgeStateDir: test_dir });

      const result = launcher.readBridgeThreads();

      expect(result).toEqual(new Map());
    }
  );

  test('drops stale links when the bridge file disappears', () => {
    const file = path.join(test_dir, 'threads.json');
    fs.writeFileSync(file, '{"sid":{"thread_id":"first"}}');
    const launcher = createTmuxLauncher({ bridgeStateDir: test_dir });
    launcher.readBridgeThreads();
    fs.unlinkSync(file);

    const result = launcher.readBridgeThreads();

    expect(result.size).toBe(0);
  });
});
beforeEach(() => {
  test_dir = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-trust-'))
  );
  temp_dirs.push(test_dir);
  codex_home = path.join(test_dir, 'codex-home');
  vi.stubEnv('CODEX_HOME', codex_home);
});
/** @type {string|undefined} */
let previous_config;

/**
 * Point the runtime catalog at a config that names an absolute `command` for
 * codex, the way an operator with a non-PATH install does.
 *
 * @param {string} command
 * @returns {void}
 */
function withCodexCommand(command) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-tmux-launcher-'));
  temp_dirs.push(dir);
  const config_path = path.join(dir, 'config.toml');
  fs.writeFileSync(
    config_path,
    `[runner.codex]\ncommand = ${JSON.stringify(command)}\n`
  );
  previous_config = process.env.BDUI_CONFIG_PATH;
  process.env.BDUI_CONFIG_PATH = config_path;
  __resetRuntimeCatalogForTest();
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  if (previous_config === undefined) {
    delete process.env.BDUI_CONFIG_PATH;
  } else {
    process.env.BDUI_CONFIG_PATH = previous_config;
  }
  previous_config = undefined;
  __resetRuntimeCatalogForTest();
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * Exercise the real Codex setup with only tmux replaced.
 *
 * @param {string} cwd
 * @param {string} [runner]
 */
function codexLaunch(cwd, runner = 'codex') {
  const config_path = path.join(codex_home, 'config.toml');
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
      window: 'UI-ohhr',
      pane: '%9'
    });
  });
  const launcher = createTmuxLauncher({
    runSessionHub,
    resolveRunner: () => '/usr/bin/true'
  });
  const launch = () =>
    launcher.launch({
      marker: INQUIRY_PANE_MARKER,
      key: 'UI-ohhr',
      tmux_session: 'bdui-inquiry',
      window_name: 'UI-ohhr',
      cwd,
      commandArgs: [],
      runner
    });
  return { config_path, runSessionHub, launch };
}

describe('tmux-launcher pane targeting', () => {
  test('expands the new pane target as one argument before exec', () => {
    const bin_dir = path.join(test_dir, 'bin');
    const captured = path.join(test_dir, 'tmux-argv');
    fs.mkdirSync(bin_dir);
    fs.writeFileSync(
      path.join(bin_dir, 'tmux'),
      '#!/bin/sh\nprintf "%s\\n" "$@" > "$TMUX_CAPTURE"\n',
      { mode: 0o755 }
    );
    const wrapper = markerWrapper({
      marker: INQUIRY_PANE_MARKER,
      key: 'UI-ohhr',
      argv: ['/usr/bin/true']
    });

    execFileSync('sh', ['-c', wrapper], {
      env: {
        ...process.env,
        PATH: `${bin_dir}${path.delimiter}${process.env.PATH}`,
        TMUX_PANE: '%977',
        TMUX_CAPTURE: captured
      }
    });

    expect(fs.readFileSync(captured, 'utf8').trim().split('\n')).toEqual([
      'set-option',
      '-p',
      '-t',
      '%977',
      INQUIRY_PANE_MARKER,
      'UI-ohhr'
    ]);
  });
});

describe('tmux-launcher Codex permission flags', () => {
  test('omits the Claude permission-switch flag from Codex launches', async () => {
    const { launch, runSessionHub } = codexLaunch(test_dir);

    await launch();

    const args = runSessionHub.mock.calls.find(
      ([call]) => call[0] === 'open'
    )?.[0];
    expect(args).toBeDefined();
    expect(args).not.toContain('--allow-dangerously-skip-permissions');
  });
});

describe('tmux-launcher Chrome dialog flag (UI-hdj5)', () => {
  test('starts Claude windows with --no-chrome', async () => {
    const { launch, runSessionHub } = codexLaunch(test_dir, 'claude');

    await launch();

    const args = runSessionHub.mock.calls.find(
      ([call]) => call[0] === 'open'
    )?.[0];
    expect(args?.slice(args.indexOf('--') + 1)).toContain('--no-chrome');
  });

  test('omits --no-chrome from Codex windows', async () => {
    const { launch, runSessionHub } = codexLaunch(test_dir);

    await launch();

    const args = runSessionHub.mock.calls.find(
      ([call]) => call[0] === 'open'
    )?.[0];
    expect(args).toBeDefined();
    expect(args).not.toContain('--no-chrome');
  });
});

describe('tmux-launcher Codex project trust', () => {
  test.each(['missing', 'existing'])(
    'passes the absolute config home to the hub for a %s project entry',
    async (entry) => {
      codex_home = path.join(test_dir, 'codex home');
      vi.stubEnv('CODEX_HOME', path.relative(process.cwd(), codex_home));
      const { launch, config_path, runSessionHub } = codexLaunch(test_dir);
      if (entry === 'existing') {
        fs.mkdirSync(codex_home);
        fs.writeFileSync(
          config_path,
          `[projects.${JSON.stringify(test_dir)}]\ntrust_level = "trusted"\n`
        );
      }

      const result = await launch();

      expect(result.session).toBe('launched');
      const args =
        runSessionHub.mock.calls.find(([call]) => call[0] === 'open')?.[0] ||
        [];
      expect(args[args.indexOf('--env') + 1]).toBe(`CODEX_HOME=${codex_home}`);
      expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
        projects: { [test_dir]: { trust_level: 'trusted' } }
      });
    }
  );

  test('creates a private config for a non-Git launch directory', async () => {
    const { launch, config_path, runSessionHub } = codexLaunch(test_dir);
    runSessionHub.mockResolvedValueOnce(hubReply({ found: false }));
    runSessionHub.mockImplementationOnce(async () => {
      expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
        projects: { [test_dir]: { trust_level: 'trusted' } }
      });
      return hubReply({
        status: 'launched',
        tmux_session: 'bdui-inquiry',
        window: 'UI-ohhr',
        pane: '%9'
      });
    });
    runSessionHub.mockResolvedValueOnce(hubReply({ alive: 'alive' }));

    const result = await launch();

    expect(result.session).toBe('launched');
    expect(fs.statSync(config_path).mode & 0o777).toBe(0o600);
  });

  test.each(['root', 'subdirectory', 'worktree'])(
    'registers the common repository root from a %s',
    async (location) => {
      const repo = path.join(test_dir, 'repo');
      fs.mkdirSync(repo);
      execFileSync('git', ['init', '--quiet', repo]);
      execFileSync('git', [
        '-C',
        repo,
        '-c',
        'user.name=Test',
        '-c',
        'user.email=test@example.com',
        '-c',
        'commit.gpgsign=false',
        'commit',
        '--quiet',
        '--allow-empty',
        '-m',
        'fixture'
      ]);
      let cwd = repo;
      if (location === 'subdirectory') {
        cwd = path.join(repo, 'nested');
        fs.mkdirSync(cwd);
      } else if (location === 'worktree') {
        cwd = path.join(test_dir, 'worktree');
        execFileSync('git', [
          '-C',
          repo,
          'worktree',
          'add',
          '--quiet',
          '--detach',
          cwd
        ]);
      }
      const { launch, config_path } = codexLaunch(cwd);

      const result = await launch();

      expect(result.session).toBe('launched');
      expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
        projects: { [repo]: { trust_level: 'trusted' } }
      });
    }
  );

  test('appends once while preserving existing settings and comments', async () => {
    const original = '# keep this comment\nmodel = "example"\n';
    const { launch, config_path } = codexLaunch(test_dir);
    fs.mkdirSync(codex_home);
    fs.writeFileSync(config_path, original);

    await launch();
    const first = fs.readFileSync(config_path, 'utf8');
    await codexLaunch(test_dir).launch();

    expect(first.startsWith(original)).toBe(true);
    expect(fs.readFileSync(config_path, 'utf8')).toBe(first);
    expect(parseToml(first)).toEqual({
      model: 'example',
      projects: { [test_dir]: { trust_level: 'trusted' } }
    });
  });

  test.each(['trusted', 'untrusted'])(
    'preserves an existing %s project choice byte for byte',
    async (trust_level) => {
      const { launch, config_path } = codexLaunch(test_dir);
      const original = `[projects.'${test_dir}']\ntrust_level = '${trust_level}'\n`;
      fs.mkdirSync(codex_home);
      fs.writeFileSync(config_path, original);

      await launch();

      expect(fs.readFileSync(config_path, 'utf8')).toBe(original);
    }
  );

  test('marks the launch of a folder with an existing untrusted entry (UI-e5cq)', async () => {
    const { launch, config_path } = codexLaunch(test_dir);
    fs.mkdirSync(codex_home);
    fs.writeFileSync(
      config_path,
      `[projects.'${test_dir}']\ntrust_level = 'untrusted'\n`
    );

    const result = await launch();

    expect(result).toMatchObject({
      session: 'launched',
      codex_project_untrusted: true
    });
  });

  test.each(['missing', 'trusted'])(
    'marks the launch of a folder with a %s entry as not untrusted',
    async (entry) => {
      const { launch, config_path } = codexLaunch(test_dir);
      if (entry === 'trusted') {
        fs.mkdirSync(codex_home);
        fs.writeFileSync(
          config_path,
          `[projects.'${test_dir}']\ntrust_level = 'trusted'\n`
        );
      }

      const result = await launch();

      expect(result).toMatchObject({
        session: 'launched',
        codex_project_untrusted: false
      });
    }
  );

  test('escapes quoted directory names in the project key', async () => {
    const cwd = path.join(test_dir, 'a"quoted\\directory');
    fs.mkdirSync(cwd);
    const { launch, config_path } = codexLaunch(cwd);

    await launch();

    expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
      projects: { [cwd]: { trust_level: 'trusted' } }
    });
  });

  test('uses the default Codex home when CODEX_HOME is absent', async () => {
    vi.stubEnv('CODEX_HOME', undefined);
    vi.spyOn(os, 'homedir').mockReturnValue(test_dir);
    const { launch } = codexLaunch(test_dir);

    await launch();

    expect(fs.existsSync(path.join(test_dir, '.codex', 'config.toml'))).toBe(
      true
    );
  });

  test('leaves Codex settings untouched for a Claude launch', async () => {
    const { launch, config_path } = codexLaunch(test_dir, 'claude');

    const result = await launch();

    expect(result.session).toBe('launched');
    expect(fs.existsSync(config_path)).toBe(false);
  });

  test('leaves the untrusted mark off a Claude launch', async () => {
    const { launch } = codexLaunch(test_dir, 'claude');

    const result = await launch();

    expect(result).not.toHaveProperty('codex_project_untrusted');
  });

  test('refuses to open a window when the config cannot be extended', async () => {
    const { launch, config_path, runSessionHub } = codexLaunch(test_dir);
    fs.mkdirSync(codex_home);
    fs.writeFileSync(config_path, 'broken = [');

    const result = await launch();

    expect(result).toEqual({
      session: 'not_launched',
      reason: 'launch_failed:codex_trust_setup'
    });
    expect(runSessionHub.mock.calls.map(([args]) => args[0])).toEqual(['find']);
    expect(fs.readFileSync(config_path, 'utf8')).toBe('broken = [');
  });
});

describe('tmux-launcher runner resolution (UI-mn5u §4.2)', () => {
  test('accepts an absolute catalog command that exists', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-bin-'));
    temp_dirs.push(dir);
    const command = path.join(dir, 'codex');
    fs.writeFileSync(command, '#!/bin/sh\n', { mode: 0o755 });
    withCodexCommand(command);

    expect(defaultResolveRunner('codex')).toBe(command);
  });

  test('reports nothing for an absolute command that does not exist', () => {
    withCodexCommand('/nonexistent/bin/codex');

    expect(defaultResolveRunner('codex')).toBeNull();
  });

  test('refuses a runner outside the active vocabulary', () => {
    expect(defaultResolveRunner('grok')).toBeNull();
  });

  test('resolves agy to the launcher under the home directory, not PATH', () => {
    const path_dir = path.join(test_dir, 'path-bin');
    const launcher = path.join(test_dir, '.local', 'bin', 'agy');
    fs.mkdirSync(path_dir);
    fs.mkdirSync(path.dirname(launcher), { recursive: true });
    fs.writeFileSync(path.join(path_dir, 'agy'), '#!/bin/sh\n', {
      mode: 0o755
    });
    fs.writeFileSync(launcher, '#!/bin/sh\n', { mode: 0o755 });
    vi.stubEnv('PATH', path_dir);
    vi.spyOn(os, 'homedir').mockReturnValue(test_dir);

    const resolved = defaultResolveRunner('agy');

    expect(resolved).toBe(launcher);
  });

  test('resolves no agy launcher when the home launcher is missing', () => {
    const path_dir = path.join(test_dir, 'path-bin');
    fs.mkdirSync(path_dir);
    fs.writeFileSync(path.join(path_dir, 'agy'), '#!/bin/sh\n', {
      mode: 0o755
    });
    vi.stubEnv('PATH', path_dir);
    vi.spyOn(os, 'homedir').mockReturnValue(test_dir);

    const resolved = defaultResolveRunner('agy');

    expect(resolved).toBeNull();
  });
});

describe('tmux-launcher conversation flags (UI-jbl1 §3.4)', () => {
  test('puts claude flags ahead of the resume arguments', () => {
    const args = withLaunchFlags(
      'claude',
      ['--resume', 'sid', 'prompt'],
      ['--model', 'sonnet', '--effort', 'high']
    );

    expect(args).toEqual([
      '--model',
      'sonnet',
      '--effort',
      'high',
      '--resume',
      'sid',
      'prompt'
    ]);
  });

  test('puts codex flags right after the fork subcommand', () => {
    const args = withLaunchFlags(
      'codex',
      ['fork', 'sid', 'prompt'],
      ['-m', 'gpt-6-sol', '-c', 'model_reasoning_effort=xhigh']
    );

    expect(args).toEqual([
      'fork',
      '-m',
      'gpt-6-sol',
      '-c',
      'model_reasoning_effort=xhigh',
      'sid',
      'prompt'
    ]);
  });

  test('puts codex flags ahead of a fresh prompt', () => {
    const args = withLaunchFlags('codex', ['prompt'], ['-m', 'gpt-6-sol']);

    expect(args).toEqual(['-m', 'gpt-6-sol', 'prompt']);
  });

  test('keeps the arguments unchanged without flags', () => {
    const args = withLaunchFlags('claude', ['--resume', 'sid'], []);

    expect(args).toEqual(['--resume', 'sid']);
  });

  describe('stored settings', () => {
    /** @type {string} */
    let state_home = '';
    beforeEach(() => {
      state_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-conv-flags-'));
      vi.stubEnv('XDG_STATE_HOME', state_home);
      __resetConversationSettingsForTest();
    });
    afterEach(() => {
      vi.unstubAllEnvs();
      __resetConversationSettingsForTest();
      fs.rmSync(state_home, { recursive: true, force: true });
    });

    test('appends the stored model and effort to the launch argv', async () => {
      fs.mkdirSync(path.join(state_home, 'bdui'), { recursive: true });
      fs.writeFileSync(
        path.join(state_home, 'bdui', 'conversation-settings.json'),
        JSON.stringify({
          revision: 1,
          overrides: { claude_model: 'sonnet', claude_effort: 'high' }
        })
      );
      /** @type {string[][]} */
      const calls = [];
      const launcher = createTmuxLauncher({
        runSessionHub: async (args) => {
          calls.push(args);
          if (args[0] === 'find') {
            return hubReply({ found: false });
          }
          if (args[0] === 'alive') {
            return hubReply({ alive: 'alive' });
          }
          return hubReply({
            status: 'launched',
            tmux_session: 'bdui-inquiry',
            window: 'resolve-UI-jbl1',
            pane: '%7'
          });
        },
        resolveRunner: () => '/usr/bin/claude',
        log: () => {}
      });

      await launcher.launch({
        marker: RESOLVE_PANE_MARKER,
        key: 'UI-jbl1',
        tmux_session: 'bdui-inquiry',
        window_name: 'resolve-UI-jbl1',
        cwd: '/tmp',
        commandArgs: ['--session-id', 'sid', 'prompt'],
        runner: 'claude',
        placement: 'inquiry'
      });

      const opened = calls.find((call) => call[0] === 'open') ?? [];
      expect(opened.slice(opened.indexOf('--') + 1)).toEqual([
        '/usr/bin/claude',
        '--allow-dangerously-skip-permissions',
        '--no-chrome',
        '--model',
        'sonnet',
        '--effort',
        'high',
        '--session-id',
        'sid',
        'prompt'
      ]);
    });
  });
});

describe('tmux-launcher session-lane launch input (UI-lbm5 §4.3)', () => {
  /**
   * A hub that records its calls and opens every window.
   *
   * @returns {{ calls: string[][], runSessionHub: (args: string[]) => Promise<any> }}
   */
  function recordingHub() {
    /** @type {string[][]} */
    const calls = [];
    return {
      calls,
      runSessionHub: async (args) => {
        calls.push(args);
        if (args[0] === 'find') {
          return hubReply({ found: false });
        }
        if (args[0] === 'alive') {
          return hubReply({ alive: 'alive' });
        }
        return hubReply({
          status: 'launched',
          tmux_session: 'bdui-inquiry',
          window: 'UI-lbm5',
          pane: '%7'
        });
      }
    };
  }

  test('names the session-lane window marker apart from the other kinds', () => {
    const markers = [INQUIRY_PANE_MARKER, RESOLVE_PANE_MARKER];

    const distinct = !markers.includes(SESSION_LANE_PANE_MARKER);

    expect(SESSION_LANE_PANE_MARKER).toBe('@bdui_session_lane_bead');
    expect(distinct).toBe(true);
  });

  test('passes every extra env pair to session-hub open', async () => {
    const hub = recordingHub();
    const launcher = createTmuxLauncher({
      runSessionHub: hub.runSessionHub,
      resolveRunner: () => '/usr/bin/claude',
      launchFlags: () => [],
      log: () => {}
    });

    await launcher.launch({
      marker: SESSION_LANE_PANE_MARKER,
      key: 'UI-lbm5',
      tmux_session: 'bdui-inquiry',
      window_name: 'UI-lbm5',
      cwd: '/tmp',
      commandArgs: ['prompt'],
      runner: 'claude',
      conversation_flags: false,
      env: { GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'core.hooksPath' }
    });

    const opened = hub.calls.find((call) => call[0] === 'open') ?? [];
    const head = opened.slice(0, opened.indexOf('--'));
    expect(head).toEqual(
      expect.arrayContaining([
        '--marker-option',
        SESSION_LANE_PANE_MARKER,
        '--env',
        'GIT_CONFIG_COUNT=1',
        'GIT_CONFIG_KEY_0=core.hooksPath'
      ])
    );
  });

  test('passes claude arguments directly to the account wrapper', async () => {
    const hub = recordingHub();
    const launcher = createTmuxLauncher({
      runSessionHub: hub.runSessionHub,
      resolveRunner: () => '/usr/bin/claude',
      launchFlags: () => [],
      log: () => {}
    });

    await launcher.launch({
      marker: SESSION_LANE_PANE_MARKER,
      key: 'UI-lbm5',
      tmux_session: 'bdui-inquiry',
      window_name: 'UI-lbm5',
      cwd: '/tmp',
      commandArgs: ['--session-id', 'sid', 'prompt'],
      runner: 'claude',
      conversation_flags: false,
      wrapper: {
        executable: '/usr/local/bin/cswap',
        args: ['run', 'me@example.com', '--share-history', '--']
      }
    });

    const opened = hub.calls.find((call) => call[0] === 'open') ?? [];
    expect(opened.slice(opened.indexOf('--') + 1)).toEqual([
      '/usr/local/bin/cswap',
      'run',
      'me@example.com',
      '--share-history',
      '--',
      '--allow-dangerously-skip-permissions',
      '--no-chrome',
      '--session-id',
      'sid',
      'prompt'
    ]);
  });

  test('writes the codex trust into the account CODEX_HOME it launches under', async () => {
    const account_home = path.join(test_dir, 'account-home');
    const hub = recordingHub();
    const launcher = createTmuxLauncher({
      runSessionHub: hub.runSessionHub,
      resolveRunner: () => '/usr/bin/true',
      launchFlags: () => [],
      log: () => {}
    });

    await launcher.launch({
      marker: SESSION_LANE_PANE_MARKER,
      key: 'UI-lbm5',
      tmux_session: 'bdui-inquiry',
      window_name: 'UI-lbm5',
      cwd: test_dir,
      commandArgs: ['prompt'],
      runner: 'codex',
      conversation_flags: false,
      env: { CODEX_HOME: account_home }
    });

    const opened = hub.calls.find((call) => call[0] === 'open') ?? [];
    expect(opened.filter((word) => word.startsWith('CODEX_HOME='))).toEqual([
      `CODEX_HOME=${account_home}`
    ]);
    expect(
      parseToml(fs.readFileSync(path.join(account_home, 'config.toml'), 'utf8'))
    ).toEqual({ projects: { [test_dir]: { trust_level: 'trusted' } } });
  });
});

describe('tmux-launcher startup screen (UI-e5cq §3.1)', () => {
  /**
   * A launcher whose hub answers every call with `reply`, recording the argv.
   *
   * @param {() => Promise<any>} reply
   */
  function startupLauncher(reply) {
    /** @type {string[][]} */
    const calls = [];
    const launcher = createTmuxLauncher({
      runSessionHub: async (args) => {
        calls.push(args);
        return reply();
      },
      log: () => {}
    });
    return { calls, launcher };
  }

  const INPUT = {
    runner: /** @type {const} */ ('claude'),
    pane: '%8',
    marker: RESOLVE_PANE_MARKER,
    key: 'UI-e5cq'
  };

  const CHROME = {
    dialog: 'startup',
    startup_kind: 'chrome',
    fingerprint: 'a1b2c3d4e5f6a7b8c9d0e1f2',
    heading: 'Claude in Chrome',
    auto: { choice: 'No, keep browser tools off' }
  };

  test('asks the hub for the marked pane of a runner read-only', async () => {
    const { calls, launcher } = startupLauncher(async () =>
      hubReply({ alive: 'alive', started: false, screen: null })
    );

    await launcher.startupScreen(INPUT);

    expect(calls).toEqual([
      [
        'startup-screen',
        '--runner',
        'claude',
        '--pane',
        '%8',
        '--marker-option',
        RESOLVE_PANE_MARKER,
        '--marker-value',
        'UI-e5cq'
      ]
    ]);
  });

  test('returns a startup screen with its kind, heading and policy row', async () => {
    const { launcher } = startupLauncher(async () =>
      hubReply({ alive: 'alive', started: false, screen: CHROME })
    );

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: true,
      alive: 'alive',
      started: false,
      screen: CHROME
    });
  });

  test('returns a trust screen without a startup kind', async () => {
    const trust = {
      dialog: 'trust',
      startup_kind: null,
      fingerprint: 'a1b2c3d4e5f6a7b8c9d0e1f2',
      heading: 'Do you trust the files in this folder?',
      auto: null
    };
    const { launcher } = startupLauncher(async () =>
      hubReply({ alive: 'alive', started: false, screen: trust })
    );

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: true,
      alive: 'alive',
      started: false,
      screen: trust
    });
  });

  test('returns the start of a started window', async () => {
    const { launcher } = startupLauncher(async () =>
      hubReply({ alive: 'alive', started: true, screen: null })
    );

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: true,
      alive: 'alive',
      started: true,
      screen: null
    });
  });

  test('returns no screen for a pane the marker does not confirm', async () => {
    const { launcher } = startupLauncher(async () =>
      hubReply({ alive: 'unknown', started: false, screen: null })
    );

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: true,
      alive: 'unknown',
      started: false,
      screen: null
    });
  });

  test.each([
    [
      'an unknown dialog',
      { alive: 'alive', started: false, screen: { ...CHROME, dialog: 'boot' } }
    ],
    [
      'an empty fingerprint',
      { alive: 'alive', started: false, screen: { ...CHROME, fingerprint: '' } }
    ],
    [
      'a fingerprint that is not hex',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, fingerprint: 'fp' }
      }
    ],
    [
      'a fingerprint shorter than 24 hex digits',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, fingerprint: 'a1b2c3' }
      }
    ],
    [
      'an uppercase fingerprint',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, fingerprint: 'A1B2C3D4E5F6A7B8C9D0E1F2' }
      }
    ],
    [
      'a startup kind on a trust screen',
      {
        alive: 'alive',
        started: false,
        screen: {
          ...CHROME,
          dialog: 'trust',
          startup_kind: 'hooks',
          auto: null
        }
      }
    ],
    [
      'a trust screen without its startup kind key',
      {
        alive: 'alive',
        started: false,
        screen: {
          dialog: 'trust',
          fingerprint: 'a1b2c3d4e5f6a7b8c9d0e1f2',
          heading: 'h',
          auto: null
        }
      }
    ],
    [
      'a startup screen without its kind',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, startup_kind: null }
      }
    ],
    [
      'a screen without its heading',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, heading: undefined }
      }
    ],
    [
      'a policy row without its choice',
      { alive: 'alive', started: false, screen: { ...CHROME, auto: {} } }
    ],
    [
      'a policy row on an unclassified screen',
      {
        alive: 'alive',
        started: false,
        screen: { ...CHROME, dialog: 'unknown_screen', startup_kind: null }
      }
    ],
    ['a missing alive', { started: false, screen: null }],
    ['a missing started', { alive: 'alive', screen: null }],
    [
      'a screen on a started window',
      { alive: 'alive', started: true, screen: CHROME }
    ],
    [
      'a screen on a dead pane',
      { alive: 'dead', started: false, screen: CHROME }
    ]
  ])('refuses a reply with %s', async (_name, value) => {
    const { launcher } = startupLauncher(async () => hubReply(value));

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: false,
      error: 'launch_failed:session_hub_invalid_response'
    });
  });

  test('passes a hub refusal through as a failure', async () => {
    const { launcher } = startupLauncher(async () =>
      hubReply({ ok: false, code: 'bad_request' }, 1)
    );

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({ ok: false, error: 'launch_failed:bad_request' });
  });

  test('reports an unreachable hub as a failure', async () => {
    const { launcher } = startupLauncher(async () => {
      throw new Error('spawn session-hub ENOENT');
    });

    const result = await launcher.startupScreen(INPUT);

    expect(result).toEqual({
      ok: false,
      error: 'launch_failed:session_hub_unavailable'
    });
  });
});

describe('tmux-launcher startup advance (UI-e5cq §3.1)', () => {
  /**
   * A launcher whose hub answers every call with `reply`, recording the argv.
   *
   * @param {() => Promise<any>} reply
   */
  function advanceLauncher(reply) {
    /** @type {string[][]} */
    const calls = [];
    const launcher = createTmuxLauncher({
      runSessionHub: async (args) => {
        calls.push(args);
        return reply();
      },
      log: () => {}
    });
    return { calls, launcher };
  }

  const INPUT = {
    runner: /** @type {const} */ ('codex'),
    pane: '%8',
    marker: SESSION_LANE_PANE_MARKER,
    key: 'UI-e5cq',
    fingerprint: 'a1b2c3d4e5f6a7b8c9d0e1f2'
  };

  test('asks the hub to answer the screen of that fingerprint', async () => {
    const { calls, launcher } = advanceLauncher(async () =>
      hubReply({ advanced: false, key_sent: false, reason: 'busy' })
    );

    await launcher.startupAdvance(INPUT);

    expect(calls).toEqual([
      [
        'startup-advance',
        '--runner',
        'codex',
        '--pane',
        '%8',
        '--marker-option',
        SESSION_LANE_PANE_MARKER,
        '--marker-value',
        'UI-e5cq',
        '--fingerprint',
        'a1b2c3d4e5f6a7b8c9d0e1f2'
      ]
    ]);
  });

  test('returns a confirmed advance with its screen and row', async () => {
    const { launcher } = advanceLauncher(async () =>
      hubReply({
        advanced: true,
        key_sent: true,
        dialog: 'startup',
        startup_kind: 'model',
        choice: 'Use existing model',
        heading: 'Try the new model'
      })
    );

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({
      ok: true,
      advanced: true,
      key_sent: true,
      dialog: 'startup',
      startup_kind: 'model',
      choice: 'Use existing model',
      heading: 'Try the new model'
    });
  });

  test('reads a confirmed advance that carries no key_sent key', async () => {
    const { launcher } = advanceLauncher(async () =>
      hubReply({
        advanced: true,
        dialog: 'trust',
        startup_kind: null,
        choice: 'Trust and continue',
        heading: 'Trust this folder?'
      })
    );

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({
      ok: true,
      advanced: true,
      key_sent: true,
      dialog: 'trust',
      startup_kind: null,
      choice: 'Trust and continue',
      heading: 'Trust this folder?'
    });
  });

  test('returns an unconfirmed key as sent', async () => {
    const { launcher } = advanceLauncher(async () =>
      hubReply({ advanced: false, key_sent: true, reason: 'not_confirmed' })
    );

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({
      ok: true,
      advanced: false,
      key_sent: true,
      reason: 'not_confirmed'
    });
  });

  test.each([
    'screen_changed',
    'not_auto',
    'already_answered',
    'busy',
    'not_alive',
    'started'
  ])('returns a keyless %s refusal', async (reason) => {
    const { launcher } = advanceLauncher(async () =>
      hubReply({ advanced: false, key_sent: false, reason })
    );

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({
      ok: true,
      advanced: false,
      key_sent: false,
      reason
    });
  });

  test.each([
    ['an unknown reason', { advanced: false, key_sent: false, reason: 'odd' }],
    [
      'a keyless not_confirmed',
      { advanced: false, key_sent: false, reason: 'not_confirmed' }
    ],
    [
      'a sent key with another reason',
      { advanced: false, key_sent: true, reason: 'busy' }
    ],
    ['a missing advanced', { key_sent: false, reason: 'busy' }],
    [
      'an advance without its row',
      { advanced: true, dialog: 'trust', startup_kind: null, heading: 'h' }
    ],
    [
      'an advance on an unclassified screen',
      {
        advanced: true,
        dialog: 'unknown_screen',
        startup_kind: null,
        choice: 'c',
        heading: 'h'
      }
    ],
    [
      'a startup kind on an advanced trust screen',
      {
        advanced: true,
        key_sent: true,
        dialog: 'trust',
        startup_kind: 'hooks',
        choice: 'c',
        heading: 'h'
      }
    ],
    [
      'an advance that says no key went in',
      {
        advanced: true,
        key_sent: false,
        dialog: 'trust',
        startup_kind: null,
        choice: 'c',
        heading: 'h'
      }
    ]
  ])('refuses a reply with %s', async (_name, value) => {
    const { launcher } = advanceLauncher(async () => hubReply(value));

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({
      ok: false,
      error: 'launch_failed:session_hub_invalid_response'
    });
  });

  test('passes a hub refusal through as a failure', async () => {
    const { launcher } = advanceLauncher(async () =>
      hubReply({ ok: false, code: 'bad_request' }, 1)
    );

    const result = await launcher.startupAdvance(INPUT);

    expect(result).toEqual({ ok: false, error: 'launch_failed:bad_request' });
  });
});

describe('tmux-launcher agy conversations (UI-ufgo Phase 4)', () => {
  const AGY = '/home/u/.local/bin/agy';

  /**
   * A launcher whose hub opens every window and records each argv.
   *
   * @param {{ flags?: string[], sessions?: any[] }} [input]
   */
  function agyLauncher(input = {}) {
    /** @type {string[][]} */
    const calls = [];
    const launcher = createTmuxLauncher({
      runSessionHub: async (args) => {
        calls.push(args);
        if (args[0] === 'find') {
          return hubReply({ found: false });
        }
        if (args[0] === 'alive') {
          return hubReply({ alive: 'alive' });
        }
        if (args[0] === 'list') {
          return hubReply({
            total: (input.sessions || []).length,
            sessions: input.sessions || []
          });
        }
        return hubReply({
          status: 'launched',
          tmux_session: 'bdui-inquiry',
          window: 'UI-ufgo',
          pane: '%9'
        });
      },
      resolveRunner: (runner) => (runner === 'agy' ? AGY : null),
      launchFlags: (runner) => (runner === 'agy' ? (input.flags ?? []) : []),
      log: () => {}
    });
    /**
     * The runner argv of the hub `open` call.
     *
     * @returns {string[]}
     */
    function openedArgv() {
      const opened = /** @type {string[]} */ (
        calls.find((call) => call[0] === 'open')
      );
      return opened.slice(opened.indexOf('--') + 1);
    }
    return { calls, launcher, openedArgv };
  }

  /**
   * @param {Partial<import('./tmux-launcher.js').LaunchInput>} over
   */
  function agyInput(over) {
    return {
      marker: INQUIRY_PANE_MARKER,
      key: 'UI-ufgo',
      tmux_session: 'bdui-inquiry',
      window_name: 'UI-ufgo',
      cwd: test_dir,
      commandArgs: [],
      runner: 'agy',
      ...over
    };
  }

  test('opens a fresh agy conversation with the model and skip-permissions flags', async () => {
    const { launcher, openedArgv } = agyLauncher({
      flags: ['--model', 'gemini-4-neon-high']
    });

    const result = await launcher.launch(
      agyInput({ commandArgs: agyConversationArgs({ prompt: 'hello' }) })
    );

    expect(result.session).toBe('launched');
    expect(openedArgv()).toEqual([
      AGY,
      '--model',
      'gemini-4-neon-high',
      '--dangerously-skip-permissions',
      '-i',
      'hello'
    ]);
  });

  test('resumes an agy conversation with --conversation after the flags', async () => {
    const { launcher, openedArgv } = agyLauncher({
      flags: ['--model', 'gemini-4-carbon-high']
    });

    await launcher.launch(
      agyInput({
        commandArgs: agyConversationArgs({
          conversation_id: 'conv-1',
          prompt: 'next'
        })
      })
    );

    expect(openedArgv()).toEqual([
      AGY,
      '--model',
      'gemini-4-carbon-high',
      '--dangerously-skip-permissions',
      '--conversation',
      'conv-1',
      '-i',
      'next'
    ]);
  });

  test('puts skip-permissions once after a model the launch carries itself', async () => {
    const { launcher, openedArgv } = agyLauncher({
      flags: ['--model', 'gemini-4-neon-high']
    });

    await launcher.launch(
      agyInput({
        conversation_flags: false,
        commandArgs: agyConversationArgs({
          model: 'gemini-4-argon-medium',
          prompt: 'task'
        })
      })
    );

    expect(openedArgv()).toEqual([
      AGY,
      '--model',
      'gemini-4-argon-medium',
      '--dangerously-skip-permissions',
      '-i',
      'task'
    ]);
  });

  test('opens through the hub argv form, never the Hermes agent form', async () => {
    const { calls, launcher } = agyLauncher();

    await launcher.launch(
      agyInput({ commandArgs: agyConversationArgs({ prompt: 'hello' }) })
    );

    const opened = /** @type {string[]} */ (
      calls.find((call) => call[0] === 'open')
    );
    expect(opened).not.toContain('--agent');
    expect(opened.slice(opened.indexOf('--') + 1)).toEqual([
      AGY,
      '--dangerously-skip-permissions',
      '-i',
      'hello'
    ]);
  });

  test('reads an agy startup screen with --runner agy', async () => {
    /** @type {string[][]} */
    const calls = [];
    const launcher = createTmuxLauncher({
      runSessionHub: async (args) => {
        calls.push(args);
        return hubReply({ alive: 'alive', started: false, screen: null });
      },
      log: () => {}
    });

    await launcher.startupScreen({
      runner: 'agy',
      pane: '%9',
      marker: SESSION_LANE_PANE_MARKER,
      key: 'UI-ufgo'
    });

    expect(calls[0].slice(0, 3)).toEqual(['startup-screen', '--runner', 'agy']);
  });

  test('finds the agy conversation id of a pane in the hub list', async () => {
    const { calls, launcher } = agyLauncher({
      sessions: [
        { session_id: 'claude-1', agent: 'claude', pane: '%9' },
        { session_id: 'agy-other', agent: 'agy', pane: '%3' },
        { session_id: 'agy-1', agent: 'agy', pane: '%9' }
      ]
    });

    const found = await launcher.agySessionId('%9');

    expect(found).toEqual({ ok: true, session_id: 'agy-1' });
    expect(calls).toEqual([['list']]);
  });

  test('reads no agy conversation id while the hub lists none for the pane', async () => {
    const { launcher } = agyLauncher({
      sessions: [{ session_id: 'claude-1', agent: 'claude', pane: '%9' }]
    });

    const found = await launcher.agySessionId('%9');

    expect(found).toEqual({ ok: true, session_id: null });
  });
});
