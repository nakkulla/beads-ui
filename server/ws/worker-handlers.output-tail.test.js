import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { formatBoundaryLine } from '../worker/repo-operation-log.js';
import { decorateQueue } from './worker-handlers.js';

/** The projection's tail window, `OPERATION_TAIL_BYTES` in worker-handlers. */
const TAIL_BYTES = 2000;

/** @type {string} */
let tmp;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-output-tail-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * The `출력` tail the operation card carries for a failed operation whose log
 * holds `content`.
 *
 * @param {string} content
 * @returns {string}
 */
function outputTailOf(content) {
  const log_path = path.join(tmp, 'op-1.log');
  fs.writeFileSync(log_path, content);
  const queue = {
    revision: 1,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    repo_operations: {
      'op-1': {
        schema: 1,
        kind: 'deploy',
        state: 'failed',
        log_path,
        failure: { code: 'script_failed', detail: '', interrupted: false }
      }
    }
  };
  const decorated = /** @type {any} */ (decorateQueue(tmp, queue));
  return decorated.repo_operations[0].output_tail;
}

describe('operation card output tail (UI-i8cy §5.2)', () => {
  test('drops a boundary line the tail window cut in half', () => {
    const end_line = formatBoundaryLine(
      {
        event: 'end',
        attempt_id: 'op-1:1',
        at: 1791268150000,
        exit_code: 1,
        signal: null,
        timed_out: false
      },
      false
    );
    const head = 'early output\n'.repeat(20);
    // 198 ten-byte lines: the window starts 20 bytes before the end line
    // finishes, inside its JSON.
    const tail = 'tail line\n'.repeat((TAIL_BYTES - 20) / 10);
    const content = `${head}${end_line}${tail}`;

    const output = outputTailOf(content);

    expect(output).toBe(tail);
  });

  test('drops the whole boundary line inside the tail window', () => {
    const content = `${formatBoundaryLine({ event: 'start', attempt_id: 'op-1:1', at: 1 }, false)}npm ERR! boom\n`;

    const output = outputTailOf(content);

    expect(output).toBe('npm ERR! boom\n');
  });
});
