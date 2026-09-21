import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { __resetRuntimeCatalogForTest } from './runner/index.js';
import {
  INQUIRY_PANE_MARKER,
  RESOLVE_PANE_MARKER,
  createTmuxLauncher,
  defaultResolveRunner
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
      tmux_window: 'test'
    });
    expect(calls).toEqual(['list-panes', 'new-window', 'list-panes']);
  });
});

/** @type {string[]} */
const temp_dirs = [];
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
