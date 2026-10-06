import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { formatBoundaryLine } from '../worker/repo-operation-log.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';
import {
  deployLogDir,
  repoOperationLogDir,
  verifyLogDir
} from '../worker/state-paths.js';
import { decorateQueue } from '../ws/worker-handlers.js';
import { createRepoOpsLogHandler } from './repo-ops-log.js';

/** @type {string} */
let tmp;
/** @type {string} */
let workspace;
/** @type {Record<string, any>} */
let queue;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-repo-ops-log-'));
  workspace = path.join(tmp, 'repo');
  fs.mkdirSync(workspace, { recursive: true });
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');
  __resetWorkerRuntimeForTest();
  queue = {
    revision: 1,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    repo_operations: {},
    cleanup_failed: {},
    completion_intents: {}
  };
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * Write one log file and return its path.
 *
 * @param {string} dir
 * @param {string} name
 * @param {string|Buffer} content
 */
function writeLog(dir, name, content) {
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  fs.writeFileSync(file, content);
  return file;
}

/**
 * @param {Record<string, string>} query
 * @param {{ workspaces?: string[] }} [options]
 * @returns {{ status: number, body: any, cache_control: string|null }}
 */
function request(query, options = {}) {
  const handler = createRepoOpsLogHandler({
    workspaces: () => options.workspaces || [workspace],
    snapshot: () => queue
  });
  let status = 200;
  /** @type {any} */
  let body = null;
  /** @type {Map<string, string>} */
  const headers = new Map();
  const response = {
    /** @param {number} value */
    status(value) {
      status = value;
      return response;
    },
    /**
     * @param {string} name
     * @param {string} value
     */
    set(name, value) {
      headers.set(name.toLowerCase(), value);
      return response;
    },
    /** @param {any} value */
    json(value) {
      body = value;
      return response;
    }
  };
  handler(/** @type {any} */ ({ query }), /** @type {any} */ (response));
  return { status, body, cache_control: headers.get('cache-control') ?? null };
}

/**
 * @param {Record<string, unknown>} payload
 */
function boundary(payload) {
  return formatBoundaryLine(payload, false);
}

/**
 * A needs_human completion intent for root `R-1`.
 *
 * @param {Record<string, unknown>} [extra]
 */
function needsHumanIntent(extra = {}) {
  return {
    target_base: 'main',
    phase: 'needs_human',
    subject: { role: 'root', bead_id: 'R-1' },
    active_op: null,
    terminal_reason: null,
    auto_resolution: null,
    paused_resolution: null,
    ...extra
  };
}

describe('GET /api/repo-ops-log request checks', () => {
  test('rejects a workspace outside the registry', () => {
    const result = request(
      { workspace: path.join(tmp, 'other'), source: 'operation', id: 'op-1' },
      { workspaces: [workspace] }
    );

    expect(result).toMatchObject({
      status: 403,
      body: { ok: false, error: 'forbidden' },
      cache_control: 'no-store'
    });
  });

  test('rejects an unknown source', () => {
    const result = request({ workspace, source: 'file', id: 'op-1' });

    expect(result).toMatchObject({
      status: 400,
      body: { ok: false, error: 'bad_request' }
    });
  });

  test('answers not_found for a record the queue does not hold', () => {
    const result = request({ workspace, source: 'operation', id: 'op-404' });

    expect(result).toMatchObject({
      status: 404,
      body: { ok: false, error: 'not_found' }
    });
  });

  test('answers not_found for an inherited property name', () => {
    const result = request({ workspace, source: 'operation', id: '__proto__' });

    expect(result.body).toEqual({ ok: false, error: 'not_found' });
  });

  test('answers not_found when the stored log file is gone', () => {
    queue.repo_operations['op-1'] = {
      state: 'failed',
      log_path: path.join(repoOperationLogDir(workspace), 'op-1.log')
    };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body).toEqual({ ok: false, error: 'not_found' });
  });

  test('refuses a stored path outside the workspace log directories', () => {
    const outside = writeLog(path.join(tmp, 'elsewhere'), 'secret.log', 'x\n');
    queue.repo_operations['op-1'] = { state: 'failed', log_path: outside };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result).toMatchObject({
      status: 403,
      body: { ok: false, error: 'forbidden' }
    });
  });

  test('refuses a symlink in the log directory that points outside it', () => {
    const outside = writeLog(path.join(tmp, 'elsewhere'), 'secret.log', 'x\n');
    const dir = repoOperationLogDir(workspace);
    fs.mkdirSync(dir, { recursive: true });
    const link = path.join(dir, 'op-1.log');
    fs.symlinkSync(outside, link);
    queue.repo_operations['op-1'] = { state: 'failed', log_path: link };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body).toEqual({ ok: false, error: 'forbidden' });
  });
});

describe('GET /api/repo-ops-log sources', () => {
  test('reads an operation log split into attempts with its failure summary', () => {
    const log_path = writeLog(
      repoOperationLogDir(workspace),
      'op-1.log',
      `${boundary({ event: 'start', attempt_id: 'op-1:1', at: 10 })}npm ERR! boom\n${boundary({ event: 'end', attempt_id: 'op-1:1', at: 20, exit_code: 1, signal: null, timed_out: false })}`
    );
    queue.repo_operations['op-1'] = {
      state: 'failed',
      log_path,
      failure: { code: 'script_failed', summary: 'npm ERR! boom' }
    };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body).toEqual({
      ok: true,
      path: log_path,
      total_bytes: fs.statSync(log_path).size,
      truncated_bytes: 0,
      running: false,
      summary: 'npm ERR! boom',
      preamble: [],
      attempts: [
        {
          attempt_id: 'op-1:1',
          started_at: 10,
          finished_at: 20,
          exit_code: 1,
          signal: null,
          timed_out: false,
          lines: ['npm ERR! boom']
        }
      ]
    });
  });

  test('reads a cleanup failure log as a preamble-only log', () => {
    const log_path = writeLog(
      verifyLogDir(workspace),
      'cleanup.log',
      'git push failed\n'
    );
    queue.cleanup_failed['UI-1'] = {
      step: 'branch_cleanup',
      reason: 'push_failed',
      log_path
    };

    const result = request({ workspace, source: 'cleanup', id: 'UI-1' });

    expect(result.body).toMatchObject({
      ok: true,
      running: false,
      preamble: ['git push failed'],
      attempts: []
    });
  });

  test('redacts credential-shaped text in the returned lines', () => {
    const log_path = writeLog(
      deployLogDir(workspace),
      'deploy.log',
      'token=abcdef123\n'
    );
    queue.cleanup_failed['UI-1'] = { log_path };

    const result = request({ workspace, source: 'cleanup', id: 'UI-1' });

    expect(result.body.preamble).toEqual(['[redacted]']);
  });

  test('reads the completion log the terminal reason names, the path the projection shows', () => {
    const log_path = writeLog(
      deployLogDir(workspace),
      'terminal.log',
      'deploy failed\n'
    );
    queue.completion_intents['R-1'] = needsHumanIntent({
      terminal_reason: { stage: 'deploy', reason: 'x', log_path }
    });

    const result = request({ workspace, source: 'completion', id: 'R-1' });

    expect(result.body.path).toBe(log_path);
    expect(
      /** @type {any} */ (decorateQueue(workspace, queue)).completion_status[
        'R-1'
      ].log_path
    ).toBe(result.body.path);
  });

  test('reads the completion log of the stopped cleanup, the path the projection shows', () => {
    const log_path = writeLog(
      verifyLogDir(workspace),
      'cleanup.log',
      'cleanup failed\n'
    );
    queue.completion_intents['R-1'] = needsHumanIntent();
    queue.cleanup_failed['R-1'] = { step: 'branch_cleanup', log_path };

    const result = request({ workspace, source: 'completion', id: 'R-1' });

    expect(result.body.path).toBe(log_path);
    expect(
      /** @type {any} */ (decorateQueue(workspace, queue)).completion_status[
        'R-1'
      ].log_path
    ).toBe(result.body.path);
  });

  test('reads the completion log of the verify observation, the path the projection shows', () => {
    const log_path = writeLog(
      verifyLogDir(workspace),
      'verify.log',
      'verify failed\n'
    );
    queue.completion_intents['R-1'] = needsHumanIntent();
    getWorkerRuntime().prObservations.recordVerify(
      workspace,
      'R-1',
      /** @type {any} */ ({ sha: 'a'.repeat(40), status: 'failed', log_path })
    );

    const result = request({ workspace, source: 'completion', id: 'R-1' });

    expect(result.body.path).toBe(log_path);
    expect(
      /** @type {any} */ (decorateQueue(workspace, queue)).completion_status[
        'R-1'
      ].log_path
    ).toBe(result.body.path);
  });
});

describe('GET /api/repo-ops-log running flag', () => {
  test.each([
    ['queued', true],
    ['running', true],
    ['retry_pending', true],
    ['succeeded', false],
    ['failed', false]
  ])('reports an operation in %s as running=%s', (state, expected) => {
    const log_path = writeLog(repoOperationLogDir(workspace), 'op-1.log', '');
    queue.repo_operations['op-1'] = { state, log_path };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body.running).toBe(expected);
  });

  test('reports the queued stretch between a failure and its retry as running', () => {
    const log_path = writeLog(
      repoOperationLogDir(workspace),
      'op-1.log',
      `${boundary({ event: 'start', attempt_id: 'op-1:1', at: 1 })}fail\n${boundary({ event: 'end', attempt_id: 'op-1:1', at: 2, exit_code: 1, signal: null, timed_out: false })}`
    );
    queue.repo_operations['op-1'] = {
      state: 'queued',
      log_path,
      retry: { outcome: 'pending', consumed_key: ['a', 'b', 'c'] }
    };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body).toMatchObject({
      running: true,
      attempts: [{ exit_code: 1 }]
    });
  });

  test('reports a completion in a non-terminal phase as running', () => {
    const log_path = writeLog(verifyLogDir(workspace), 'verify.log', 'x\n');
    queue.completion_intents['R-1'] = needsHumanIntent({
      phase: 'retrying',
      terminal_reason: { log_path }
    });

    const result = request({ workspace, source: 'completion', id: 'R-1' });

    expect(result.body.running).toBe(true);
  });

  test('reports a needs_human completion as not running', () => {
    const log_path = writeLog(verifyLogDir(workspace), 'verify.log', 'x\n');
    queue.completion_intents['R-1'] = needsHumanIntent({
      terminal_reason: { log_path }
    });

    const result = request({ workspace, source: 'completion', id: 'R-1' });

    expect(result.body.running).toBe(false);
  });
});

describe('GET /api/repo-ops-log tail window', () => {
  const KIB = 1024;

  test('keeps the cut-off start metadata of a running log', () => {
    const body = `${'r'.repeat(99)}\n`.repeat(6 * KIB);
    const log_path = writeLog(
      repoOperationLogDir(workspace),
      'op-1.log',
      `${boundary({ event: 'start', attempt_id: 'op-1:1', at: 1234 })}${body}latest\n`
    );
    queue.repo_operations['op-1'] = { state: 'running', log_path };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body.truncated_bytes).toBeGreaterThan(0);
    expect(result.body.attempts).toHaveLength(1);
    expect(result.body.attempts[0]).toMatchObject({
      started_at: 1234,
      finished_at: null
    });
    expect(result.body.attempts[0].lines.at(-1)).toBe('latest');
    expect(result.body.attempts[0].lines[0]).toBe('r'.repeat(99));
  });

  test('keeps the metadata of a finished attempt whose body is entirely cut', () => {
    const body = `${'f'.repeat(99)}\n`.repeat(6 * KIB);
    const log_path = writeLog(
      repoOperationLogDir(workspace),
      'op-1.log',
      `${boundary({ event: 'start', attempt_id: 'op-1:1', at: 1 })}${body}${boundary({ event: 'end', attempt_id: 'op-1:1', at: 2, exit_code: 1, signal: null, timed_out: false })}${boundary({ event: 'start', attempt_id: 'op-1:1', at: 3 })}${body}${boundary({ event: 'end', attempt_id: 'op-1:1', at: 4, exit_code: 1, signal: null, timed_out: false })}`
    );
    queue.repo_operations['op-1'] = { state: 'failed', log_path };

    const result = request({ workspace, source: 'operation', id: 'op-1' });

    expect(result.body.attempts).toHaveLength(2);
    expect(result.body.attempts[0]).toMatchObject({
      started_at: 1,
      finished_at: 2,
      exit_code: 1,
      lines: [],
      body_truncated: true
    });
    expect(result.body.attempts[1]).toMatchObject({
      started_at: 3,
      finished_at: 4
    });
  });
});
