import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  buildWorkerExecArgs,
  createCodexJsonlParser,
  createWorkerProcessRunner
} from './process-runner.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-runner-'));
  tmps.push(dir);
  return dir;
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const dir of tmps.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('buildWorkerExecArgs', () => {
  test('builds goal phase args with model and effort', () => {
    expect(
      buildWorkerExecArgs({
        phase: 'goal',
        issueId: 'UI-qclw',
        model: 'gpt-5.5',
        effort: 'high'
      })
    ).toEqual([
      'exec',
      '--json',
      '-m',
      'gpt-5.5',
      '-c',
      'model_reasoning_effort=high',
      '/goal UI-qclw'
    ]);
  });

  test('builds pr-finish phase args with quoted skill invocation target', () => {
    expect(
      buildWorkerExecArgs({
        phase: 'pr_finish',
        prNumber: 42,
        model: 'gpt-5.5',
        effort: 'high'
      })
    ).toEqual([
      'exec',
      '--json',
      '-m',
      'gpt-5.5',
      '-c',
      'model_reasoning_effort=high',
      '$pr-finish 42'
    ]);
  });
});

describe('createCodexJsonlParser', () => {
  test('extracts session id, agent message line, and usage events', () => {
    /** @type {any[]} */
    const events = [];
    const parser = createCodexJsonlParser((event) => events.push(event));

    parser.write('{"type":"thread.started","thread_id":"018f"}\n');
    parser.write(
      '{"type":"item.completed","item":{"type":"agent_message","text":"Done"}}\n'
    );
    parser.write(
      '{"type":"turn.completed","usage":{"input_tokens":10,"output_tokens":2}}\n'
    );

    expect(events).toEqual([
      { type: 'session_id', sessionId: '018f' },
      { type: 'log_line', line: 'Done' },
      { type: 'usage', usage: { input_tokens: 10, output_tokens: 2 } }
    ]);
  });
});

describe('createWorkerProcessRunner', () => {
  test('spawns detached codex exec process and appends stdout/stderr to log', async () => {
    const workspace = mkdtemp();
    const log_path = path.join(workspace, 'worker.log');
    const stdout = new PassThrough();
    const stderr = new PassThrough();
    const on = vi.fn();
    const unref = vi.fn();
    const spawn_impl = /** @type {any} */ (
      vi.fn(() => ({ pid: 4321, stdout, stderr, on, unref }))
    );
    const runner = createWorkerProcessRunner({ spawn_impl });

    const started = runner.startJob({
      phase: 'goal',
      issueId: 'UI-qclw',
      workspace,
      log_path,
      model: 'gpt-5.5',
      effort: 'high'
    });

    stdout.end('hello stdout\n');
    stderr.end('hello stderr\n');
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(started.pid).toBe(4321);
    expect(spawn_impl).toHaveBeenCalledWith(
      'codex',
      [
        'exec',
        '--json',
        '-m',
        'gpt-5.5',
        '-c',
        'model_reasoning_effort=high',
        '/goal UI-qclw'
      ],
      expect.objectContaining({
        cwd: workspace,
        detached: true,
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
      })
    );
    expect(unref).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync(log_path, 'utf8')).toContain('hello stdout');
    expect(fs.readFileSync(log_path, 'utf8')).toContain('hello stderr');
  });

  test('delegates cancel to terminate helper', async () => {
    const terminate_process_impl = vi.fn(async () => ({
      ok: true,
      forced: false
    }));
    const runner = createWorkerProcessRunner({ terminate_process_impl });

    const result = await runner.cancelJob(4321, { grace_timeout_ms: 1500 });

    expect(result).toEqual({ ok: true, forced: false });
    expect(terminate_process_impl).toHaveBeenCalledWith(4321, 1500);
  });
});
