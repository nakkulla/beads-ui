import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { spawnClaude } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';

const WS = '/tmp/ws';

/** @type {string} */
let dir;
/** @type {string} */
let log_path;
/** @type {string} */
let stderr_path;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-logfd-'));
  log_path = path.join(dir, 'sessions', 'att-1.jsonl');
  stderr_path = path.join(dir, 'sessions', 'att-1.stderr.log');
});

afterEach(() => {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @returns {string}
 */
function resultLine() {
  return JSON.stringify({
    type: 'result',
    subtype: 'success',
    is_error: false,
    permission_denials: []
  });
}

describe('runner/session file-fd transport (UI-o2yt §3.1)', () => {
  test('hands the child fds on the session-log and stderr files as its stdio', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });

    await spawnClaude(
      { id: 'UI-1' },
      WS,
      { log_path, stderr_path },
      { spawn_impl }
    ).done;

    const stdio = spawn_impl.captured.calls[0].options.stdio;
    expect(stdio[0]).toBe('ignore');
    expect(typeof stdio[1]).toBe('number');
    expect(typeof stdio[2]).toBe('number');
    expect(stdio[1]).not.toBe(stdio[2]);
  });

  test('creates the sessions directory and both output files', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });

    await spawnClaude(
      { id: 'UI-1' },
      WS,
      { log_path, stderr_path },
      { spawn_impl }
    ).done;

    expect(fs.existsSync(log_path)).toBe(true);
    expect(fs.existsSync(stderr_path)).toBe(true);
  });

  test('closes the server-side copies of both fds after the spawn', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    /** @type {number[]} */
    const closed = [];
    const real_close = fs.closeSync;
    const close_spy = vi
      .spyOn(fs, 'closeSync')
      .mockImplementation((/** @type {number} */ fd) => {
        closed.push(fd);
        return real_close(fd);
      });
    try {
      await spawnClaude(
        { id: 'UI-1' },
        WS,
        { log_path, stderr_path },
        { spawn_impl }
      ).done;
    } finally {
      close_spy.mockRestore();
    }

    const stdio = spawn_impl.captured.calls[0].options.stdio;
    // A fd left open leaks one per session and holds the file open long past it.
    expect(closed).toContain(stdio[1]);
    expect(closed).toContain(stdio[2]);
  });

  test('appends to an existing log instead of truncating it', async () => {
    fs.mkdirSync(path.dirname(log_path), { recursive: true });
    fs.writeFileSync(log_path, '{"prior":true}\n');
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });

    await spawnClaude(
      { id: 'UI-1' },
      WS,
      { log_path, stderr_path },
      { spawn_impl }
    ).done;

    expect(fs.readFileSync(log_path, 'utf8')).toContain('{"prior":true}');
  });

  test('reads the verdict off the FILE the child wrote, not a pipe', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });

    const verdict = await spawnClaude(
      { id: 'UI-1' },
      WS,
      { log_path, stderr_path },
      { spawn_impl }
    ).done;

    expect(verdict.success).toBe(true);
    expect(verdict.raw).toHaveLength(1);
    expect(fs.readFileSync(log_path, 'utf8')).toContain('"type":"result"');
  });

  test('a session log the server cannot open fails the spawn (fail-visible)', () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    // A path whose parent is a FILE: mkdir/open cannot succeed.
    const blocked = path.join(dir, 'blocker');
    fs.writeFileSync(blocked, 'x');

    expect(() =>
      spawnClaude(
        { id: 'UI-1' },
        WS,
        { log_path: path.join(blocked, 'att.jsonl') },
        { spawn_impl }
      )
    ).toThrow();
    expect(spawn_impl.captured.calls).toHaveLength(0);
  });

  test('without a log_path the engine stays on the stdout pipe', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });

    const verdict = await spawnClaude({ id: 'UI-1' }, WS, {}, { spawn_impl })
      .done;

    expect(spawn_impl.captured.calls[0].options.stdio).toEqual([
      'ignore',
      'pipe',
      'pipe'
    ]);
    expect(verdict.success).toBe(true);
  });
});
