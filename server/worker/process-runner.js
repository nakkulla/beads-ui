/**
 * @import { Readable } from 'node:stream'
 * @import { SpawnOptions } from 'node:child_process'
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { terminateProcess } from '../cli/daemon.js';

/**
 * @typedef {{
 *   pid?: number | null,
 *   stdout?: Readable | null,
 *   stderr?: Readable | null,
 *   on: (event_name: string, handler: (...args: any[]) => void) => unknown,
 *   unref?: () => void
 * }} WorkerChildProcess
 */

/**
 * @typedef {{ pid: number | null, child: WorkerChildProcess | null }} StartedWorkerProcess
 */

/**
 * @typedef {boolean | { ok: boolean, forced: boolean }} WorkerCancelResult
 */

/**
 * @typedef {(command: string, args: string[], options: SpawnOptions) => WorkerChildProcess} WorkerSpawn
 */

/**
 * @typedef {{ type: 'session_id', sessionId: string } | { type: 'log_line', line: string } | { type: 'usage', usage: Record<string, unknown> }} CodexJsonlEvent
 */

/**
 * @param {{ phase: 'goal' | 'pr_finish', issueId?: string | null, prNumber?: number | null, model: string, effort: string }} input
 * @returns {string[]}
 */
export function buildWorkerExecArgs(input) {
  const target =
    input.phase === 'goal'
      ? `/goal ${requireIssueId(input.issueId)}`
      : `$pr-finish ${String(requirePrNumber(input.prNumber))}`;
  return [
    'exec',
    '--json',
    '-m',
    requireNonEmptyString(input.model, 'model'),
    '-c',
    `model_reasoning_effort=${requireNonEmptyString(input.effort, 'effort')}`,
    target
  ];
}

/**
 * @param {(event: CodexJsonlEvent) => void} on_event
 */
export function createCodexJsonlParser(on_event) {
  /** @type {string} */
  let buffer = '';

  return {
    /**
     * @param {Buffer | string} chunk
     */
    write(chunk) {
      buffer += typeof chunk === 'string' ? chunk : chunk.toString('utf8');
      let newline_index = buffer.indexOf('\n');
      while (newline_index >= 0) {
        const line = buffer.slice(0, newline_index);
        buffer = buffer.slice(newline_index + 1);
        emitCodexJsonLine(line, on_event);
        newline_index = buffer.indexOf('\n');
      }
    },

    flush() {
      if (buffer.length === 0) {
        return;
      }
      const line = buffer;
      buffer = '';
      emitCodexJsonLine(line, on_event);
    }
  };
}

/**
 * @param {{ spawn_impl?: WorkerSpawn, terminate_process_impl?: (pid: number, timeout_ms: number) => Promise<WorkerCancelResult> | WorkerCancelResult }} [options]
 */
export function createWorkerProcessRunner(options = {}) {
  const spawn_impl = options.spawn_impl || /** @type {WorkerSpawn} */ (spawn);
  const terminate_process_impl =
    options.terminate_process_impl ||
    /** @type {(pid: number, timeout_ms: number) => Promise<WorkerCancelResult>} */ (
      terminateProcess
    );

  return {
    /**
     * @param {{ phase: 'goal' | 'pr_finish', issueId?: string | null, prNumber?: number | null, workspace: string, log_path: string, model: string, effort: string, onCodexEvent?: (event: CodexJsonlEvent) => void }} input
     * @returns {StartedWorkerProcess}
     */
    startJob(input) {
      const exec_args = buildWorkerExecArgs(input);
      const log_stream = fs.createWriteStream(input.log_path, { flags: 'a' });
      const parser = createCodexJsonlParser((event) => {
        input.onCodexEvent?.(event);
      });
      let log_stream_finished = false;

      /** @type {SpawnOptions} */
      const spawn_options = {
        cwd: input.workspace,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      };
      const child = spawn_impl('codex', exec_args, spawn_options);

      child.stdout?.on('data', (chunk) => {
        log_stream.write(chunk);
        parser.write(chunk);
      });
      child.stdout?.on('end', () => {
        parser.flush();
      });
      child.stderr?.on('data', (chunk) => {
        log_stream.write(chunk);
      });
      child.on('close', () => {
        finishLogStream();
      });
      child.on('error', () => {
        finishLogStream();
      });
      child.unref?.();

      return {
        pid: typeof child.pid === 'number' ? child.pid : null,
        child
      };

      function finishLogStream() {
        if (log_stream_finished) {
          return;
        }
        log_stream_finished = true;
        parser.flush();
        log_stream.end();
      }
    },

    /**
     * @param {number} pid
     * @param {{ grace_timeout_ms: number }} options
     * @returns {Promise<WorkerCancelResult> | WorkerCancelResult}
     */
    cancelJob(pid, options) {
      return terminate_process_impl(pid, options.grace_timeout_ms);
    }
  };
}

/**
 * @param {string | null | undefined} issue_id
 */
function requireIssueId(issue_id) {
  return requireNonEmptyString(issue_id, 'issueId');
}

/**
 * @param {number | null | undefined} pr_number
 */
function requirePrNumber(pr_number) {
  if (typeof pr_number !== 'number' || !Number.isFinite(pr_number)) {
    throw Object.assign(new Error('Missing prNumber for pr-finish'), {
      code: 'invalid_request'
    });
  }
  return pr_number;
}

/**
 * @param {unknown} value
 * @param {string} name
 */
function requireNonEmptyString(value, name) {
  if (typeof value !== 'string' || value.length === 0) {
    throw Object.assign(new Error(`Missing ${name}`), {
      code: 'invalid_request'
    });
  }
  return value;
}

/**
 * @param {string} line
 * @param {(event: CodexJsonlEvent) => void} on_event
 */
function emitCodexJsonLine(line, on_event) {
  const trimmed_line = line.trim();
  if (trimmed_line.length === 0) {
    return;
  }

  /** @type {any} */
  let parsed;
  try {
    parsed = JSON.parse(trimmed_line);
  } catch {
    return;
  }

  if (
    parsed?.type === 'thread.started' &&
    typeof parsed.thread_id === 'string'
  ) {
    on_event({ type: 'session_id', sessionId: parsed.thread_id });
    return;
  }

  if (
    parsed?.type === 'item.completed' &&
    parsed.item?.type === 'agent_message' &&
    typeof parsed.item.text === 'string'
  ) {
    on_event({ type: 'log_line', line: parsed.item.text });
    return;
  }

  if (
    parsed?.type === 'turn.completed' &&
    parsed.usage &&
    typeof parsed.usage === 'object' &&
    !Array.isArray(parsed.usage)
  ) {
    on_event({
      type: 'usage',
      usage: /** @type {Record<string, unknown>} */ (parsed.usage)
    });
  }
}
