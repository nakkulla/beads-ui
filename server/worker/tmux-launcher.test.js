import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { __resetRuntimeCatalogForTest } from './runner/index.js';
import {
  INQUIRY_PANE_MARKER,
  RESOLVE_PANE_MARKER,
  createTmuxLauncher,
  defaultResolveRunner,
  markerWrapper,
  paneFormatExtended
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

  test.each([INQUIRY_PANE_MARKER, RESOLVE_PANE_MARKER])(
    'recognizes a live %s pane without launching a duplicate',
    async (marker) => {
      const launcher = createTmuxLauncher({
        runTmux: async (args) => ({
          code: 0,
          stdout: renderPanes(args[3], [
            {
              session_name: 'bdui-inquiry',
              pane_id: '%1',
              pane_dead: '0',
              [marker]: 'foreign:UI-gcf6'
            }
          ]),
          stderr: ''
        }),
        resolveRunner: () => null
      });

      const result = await launcher.launch({
        marker,
        key: 'foreign:UI-gcf6',
        tmux_session: 'bdui-inquiry',
        window_name: 'test',
        cwd: '/tmp',
        commandArgs: []
      });

      expect(result).toEqual({ session: 'already_running' });
    }
  );

  test('opens a window in the existing session under the C locale', async () => {
    /** @type {Record<string, string>[]} */
    const panes = [
      { session_name: 'bdui-inquiry', pane_id: '%1', pane_dead: '0' }
    ];
    /** @type {string[]} */
    const calls = [];
    const launcher = createTmuxLauncher({
      resolveRunner: () => '/usr/bin/true',
      runTmux: async (args) => {
        calls.push(args[0]);
        if (args[0] === 'list-panes') {
          return { code: 0, stdout: renderPanes(args[3], panes), stderr: '' };
        }
        if (args[0] === 'new-window') {
          panes.push({
            session_name: 'bdui-inquiry',
            pane_id: '%2',
            pane_dead: '0',
            [INQUIRY_PANE_MARKER]: 'UI-gcf6'
          });
          return { code: 0, stdout: '%2\n', stderr: '' };
        }
        return { code: 1, stdout: '', stderr: 'duplicate session' };
      }
    });

    const result = await launcher.launch({
      marker: INQUIRY_PANE_MARKER,
      key: 'UI-gcf6',
      tmux_session: 'bdui-inquiry',
      window_name: 'test',
      cwd: '/tmp',
      commandArgs: []
    });

    expect(result).toEqual({
      session: 'launched',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'test',
      pane_id: '%2'
    });
    expect(calls).toEqual(['list-panes', 'new-window', 'list-panes']);
  });
});

/** @type {string[]} */
const temp_dirs = [];
let test_dir = '';
let codex_home = '';

describe('tmux interactive session inspection and exit', () => {
  test('keeps runtime-like path segments inside the cwd', async () => {
    const launcher = createTmuxLauncher({
      runTmux: async () => ({
        code: 0,
        stdout:
          'inquiry:window:%9:0:/repo:claude:work::tree:codex:foreign:UI-1\n',
        stderr: ''
      })
    });

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

  test.each(['claude', 'codex', ''])(
    'preserves cwd and marker colons for runtime %j',
    async (agent_runtime) => {
      const runTmux = vi.fn(async () => ({
        code: 0,
        stdout: `inquiry:resolve-UI-1:%9:0:/repo:with:colons:${agent_runtime}:foreign:rig:UI-1\n`,
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
      expect(result).toBe(stdout.trim() || null);
    }
  );

  test('treats an unavailable option as unknown', async () => {
    const launcher = createTmuxLauncher({
      runTmux: async () => {
        throw new Error('offline');
      }
    });

    const result = await launcher.readPaneOption('%9', '@agent_session');

    expect(result).toBeNull();
  });

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
    ['\n \n', null]
  ])('captures the last nonblank line from %j', async (stdout, expected) => {
    const runTmux = vi.fn(async () => ({
      code: 0,
      stdout: /** @type {string} */ (stdout),
      stderr: ''
    }));
    const launcher = createTmuxLauncher({ runTmux });

    const result = await launcher.capturePaneTail('%9');

    expect(result).toBe(expected);
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
  let opened = false;
  const runTmux = vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'new-window') {
      opened = true;
      return { code: 0, stdout: '%9\n', stderr: '' };
    }
    return {
      code: 0,
      stdout: opened ? 'bdui-inquiry:%9:0:UI-ohhr\n' : 'bdui-inquiry:%1:0:\n',
      stderr: ''
    };
  });
  const launcher = createTmuxLauncher({
    runTmux,
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
  return { config_path, runTmux, launch };
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

describe('tmux-launcher Codex project trust', () => {
  test.each(['missing', 'existing'])(
    'passes the absolute config home to tmux for a %s project entry',
    async (entry) => {
      codex_home = path.join(test_dir, 'codex home');
      vi.stubEnv('CODEX_HOME', path.relative(process.cwd(), codex_home));
      const { launch, config_path, runTmux } = codexLaunch(test_dir);
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
        runTmux.mock.calls.find(([call]) => call[0] === 'new-window')?.[0] ||
        [];
      expect(args[args.indexOf('-e') + 1]).toBe(`CODEX_HOME=${codex_home}`);
      expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
        projects: { [test_dir]: { trust_level: 'trusted' } }
      });
    }
  );

  test('creates a private config for a non-Git launch directory', async () => {
    const { launch, config_path, runTmux } = codexLaunch(test_dir);
    runTmux.mockImplementationOnce(async () => ({
      code: 0,
      stdout: 'bdui-inquiry:%1:0:\n',
      stderr: ''
    }));
    runTmux.mockImplementationOnce(async () => {
      expect(parseToml(fs.readFileSync(config_path, 'utf8'))).toEqual({
        projects: { [test_dir]: { trust_level: 'trusted' } }
      });
      return { code: 0, stdout: '%9\n', stderr: '' };
    });
    runTmux.mockImplementationOnce(async () => ({
      code: 0,
      stdout: 'bdui-inquiry:%9:0:UI-ohhr\n',
      stderr: ''
    }));

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

  test('refuses to open a window when the config cannot be extended', async () => {
    const { launch, config_path, runTmux } = codexLaunch(test_dir);
    fs.mkdirSync(codex_home);
    fs.writeFileSync(config_path, 'broken = [');

    const result = await launch();

    expect(result).toEqual({
      session: 'not_launched',
      reason: 'launch_failed:codex_trust_setup'
    });
    expect(runTmux.mock.calls.map(([args]) => args[0])).toEqual(['list-panes']);
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
});
