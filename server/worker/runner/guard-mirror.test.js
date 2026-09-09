/**
 * The PreToolUse guard-mirror probe (guard-hook-bypass-result-judgment §2).
 *
 * Every condition is proved against a real settings file in a temporary HOME,
 * because the probe's whole job is to answer about a filesystem the Worker does
 * not otherwise read. Every failure resolves to `absent`, which is the current
 * immediate-kill contract.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { probeGuardMirror, resolveGuardPending } from './guard-mirror.js';

/** @type {string} */
let home;
/** @type {string} */
let cwd;
/** @type {string} */
let hook_path;

/**
 * Write the user settings file of the temporary HOME.
 *
 * @param {any} settings
 * @param {string} [dir] - Config directory (defaults to `<home>/.claude`).
 */
function writeSettings(settings, dir = path.join(home, '.claude')) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'settings.json'),
    JSON.stringify(settings),
    'utf8'
  );
}

/**
 * A registration of the guard hook for one matcher string.
 *
 * @param {string} matcher
 * @param {string} [command]
 */
function registration(matcher, command = hook_path) {
  return {
    hooks: {
      PreToolUse: [{ matcher, hooks: [{ type: 'command', command }] }]
    }
  };
}

/**
 * Probe with the temporary HOME as the child's environment.
 *
 * @param {Record<string, string|undefined>} [env]
 */
function probe(env = {}) {
  return probeGuardMirror({ env: { HOME: home, ...env }, cwd, fs });
}

beforeEach(() => {
  home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-mirror-'));
  cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-mirror-ws-'));
  hook_path = path.join(home, '.claude', 'hooks', 'destructive-guard-hook.sh');
  fs.mkdirSync(path.dirname(hook_path), { recursive: true });
  fs.writeFileSync(hook_path, '#!/bin/sh\nexit 0\n', { mode: 0o755 });
});

afterEach(() => {
  for (const dir of [home, cwd]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

describe('runner/guard-mirror probe (§2)', () => {
  test('verifies a registered executable Bash hook', () => {
    writeSettings(registration('Bash'));

    expect(probe()).toBe('verified');
  });

  test('verifies a matcher listing Bash among alternatives', () => {
    writeSettings(registration('Edit|Write|Bash'));

    expect(probe()).toBe('verified');
  });

  test('verifies a wildcard matcher', () => {
    writeSettings(registration('*'));

    expect(probe()).toBe('verified');
  });

  test('expands a leading ${HOME} in the hook command', () => {
    writeSettings(
      registration('Bash', '${HOME}/.claude/hooks/destructive-guard-hook.sh')
    );

    expect(probe()).toBe('verified');
  });

  test('expands a leading ~ in the hook command', () => {
    writeSettings(
      registration('Bash', '~/.claude/hooks/destructive-guard-hook.sh')
    );

    expect(probe()).toBe('verified');
  });

  test('reads the settings file under CLAUDE_CONFIG_DIR when set', () => {
    const config_dir = path.join(home, 'alt-config');
    writeSettings(registration('Bash'), config_dir);

    expect(probe({ CLAUDE_CONFIG_DIR: config_dir })).toBe('verified');
  });

  test('reports absent when the settings file is missing', () => {
    expect(probe()).toBe('absent');
  });

  test('reports absent when the settings file is not JSON', () => {
    fs.mkdirSync(path.join(home, '.claude'), { recursive: true });
    fs.writeFileSync(path.join(home, '.claude', 'settings.json'), 'not json');

    expect(probe()).toBe('absent');
  });

  test('reports absent when no matcher covers Bash', () => {
    writeSettings(registration('Edit|Write'));

    expect(probe()).toBe('absent');
  });

  test('reports absent for a regex-style matcher, never evaluating it', () => {
    writeSettings(registration('Ba.*'));

    expect(probe()).toBe('absent');
  });

  test('reports absent when the hook basename differs', () => {
    const other = path.join(home, '.claude', 'hooks', 'other-guard-hook.sh');
    fs.writeFileSync(other, '#!/bin/sh\n', { mode: 0o755 });
    writeSettings(registration('Bash', other));

    expect(probe()).toBe('absent');
  });

  test('reports absent when the hook is not executable', () => {
    fs.chmodSync(hook_path, 0o644);
    writeSettings(registration('Bash'));

    expect(probe()).toBe('absent');
  });

  test('reports absent when the user settings disable all hooks', () => {
    writeSettings({ ...registration('Bash'), disableAllHooks: true });

    expect(probe()).toBe('absent');
  });

  test('reports absent when the project settings disable all hooks', () => {
    writeSettings(registration('Bash'));
    fs.mkdirSync(path.join(cwd, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(cwd, '.claude', 'settings.json'),
      JSON.stringify({ disableAllHooks: true })
    );

    expect(probe()).toBe('absent');
  });

  test('reports absent when the local project overlay disables all hooks', () => {
    writeSettings(registration('Bash'));
    fs.mkdirSync(path.join(cwd, '.claude'), { recursive: true });
    fs.writeFileSync(
      path.join(cwd, '.claude', 'settings.local.json'),
      JSON.stringify({ disableAllHooks: true })
    );

    expect(probe()).toBe('absent');
  });

  test('reports absent when a project settings file cannot be parsed', () => {
    writeSettings(registration('Bash'));
    fs.mkdirSync(path.join(cwd, '.claude'), { recursive: true });
    fs.writeFileSync(path.join(cwd, '.claude', 'settings.json'), '{');

    expect(probe()).toBe('absent');
  });

  test('reports absent when the environment carries no HOME', () => {
    writeSettings(registration('Bash'));

    expect(probeGuardMirror({ env: {}, cwd, fs })).toBe('absent');
  });
});

describe('runner/guard-mirror tool_result pairing (§3)', () => {
  const held = [
    {
      tool_use_id: 'toolu_1',
      command: 'git -c core.hooksPath=/dev/null diff',
      at: 1,
      log_offset: 10
    }
  ];

  /**
   * One `user` line carrying a single `tool_result` block.
   *
   * @param {any} block
   */
  function userLine(block) {
    return { type: 'user', message: { content: [block] } };
  }

  test('reads a PreToolUse refusal as not executed', () => {
    const raw = userLine({
      type: 'tool_result',
      tool_use_id: 'toolu_1',
      is_error: true,
      content: 'PreToolUse:Bash hook error: BLOCKED: …'
    });

    expect(resolveGuardPending(raw, held)).toEqual([
      { entry: held[0], executed: false }
    ]);
  });

  test('reads a refusal delivered as text blocks the same way', () => {
    const raw = userLine({
      type: 'tool_result',
      tool_use_id: 'toolu_1',
      is_error: true,
      content: [{ type: 'text', text: 'PreToolUse:Bash hook error: BLOCKED' }]
    });

    expect(resolveGuardPending(raw, held)[0].executed).toBe(false);
  });

  test('reads an ordinary result as executed', () => {
    const raw = userLine({
      type: 'tool_result',
      tool_use_id: 'toolu_1',
      content: '3 files changed'
    });

    expect(resolveGuardPending(raw, held)[0].executed).toBe(true);
  });

  test('reads a non-hook error as executed', () => {
    const raw = userLine({
      type: 'tool_result',
      tool_use_id: 'toolu_1',
      is_error: true,
      content: 'fatal: not a git repository'
    });

    expect(resolveGuardPending(raw, held)[0].executed).toBe(true);
  });

  test('ignores a result for another tool call', () => {
    const raw = userLine({
      type: 'tool_result',
      tool_use_id: 'toolu_other',
      content: 'ok'
    });

    expect(resolveGuardPending(raw, held)).toEqual([]);
  });
});
