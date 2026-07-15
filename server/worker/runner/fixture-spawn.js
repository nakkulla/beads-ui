/**
 * Test-support fake for `child_process.spawn` that replays a jsonl fixture's
 * lines through a fake child process WITHOUT launching a real CLI (spec §5.4:
 * tests must never spawn real runners). Injected as `deps.spawn_impl`.
 *
 * The returned function records every call (command / args / options) on
 * `.captured.calls` so tests can assert argv construction and env routing.
 */
import { EventEmitter } from 'node:events';
import { readFileSync } from 'node:fs';
import { PassThrough } from 'node:stream';

/**
 * The subset of `child_process.ChildProcess` the runner engine consumes.
 *
 * @typedef {Object} ChildProcessLike
 * @property {number|null} pid
 * @property {import('node:stream').Readable|null} stdout
 * @property {(signal?: NodeJS.Signals|number) => void} kill
 * @property {(event: string, listener: (...args: any[]) => void) => void} on
 */

/**
 * @typedef {Object} FixtureSpawnOptions
 * @property {string[]} [lines] - Raw jsonl lines to replay (takes precedence).
 * @property {string} [file] - Path to a jsonl fixture to read + replay.
 * @property {number} [exit] - Process exit code emitted on close (default 0).
 * @property {number} [pid] - Fake pid (default 4242).
 * @property {boolean} [error] - Emit a spawn 'error' instead of 'close'.
 */

/**
 * @typedef {((command: string, args: string[], options: any) => ChildProcessLike) & { captured: { calls: Array<{ command: string, args: string[], options: any }> } }} FixtureSpawn
 */

/**
 * Build a fixture-replaying fake spawn.
 *
 * @param {FixtureSpawnOptions} [options]
 * @returns {FixtureSpawn}
 */
export function makeFixtureSpawn(options = {}) {
  const source =
    options.lines ??
    (options.file ? readFileSync(options.file, 'utf8').split(/\r?\n/) : []);
  const exit = typeof options.exit === 'number' ? options.exit : 0;
  const pid = typeof options.pid === 'number' ? options.pid : 4242;
  const emit_error = !!options.error;

  /** @type {{ calls: Array<{ command: string, args: string[], options: any }> }} */
  const captured = { calls: [] };

  /**
   * @param {string} command
   * @param {string[]} args
   * @param {any} spawn_options
   * @returns {ChildProcessLike}
   */
  const spawn = (command, args, spawn_options) => {
    captured.calls.push({ command, args, options: spawn_options });
    const child = new EventEmitter();
    const stdout = new PassThrough();
    /** @type {any} */ (child).pid = pid;
    /** @type {any} */ (child).stdout = stdout;
    /** @type {any} */ (child).kill = () => {};

    stdout.on('end', () => {
      if (emit_error) {
        child.emit('error', new Error('spawn failure'));
      } else {
        child.emit('close', exit);
      }
    });
    setImmediate(() => {
      for (const line of source) {
        if (String(line).length > 0) {
          stdout.write(`${line}\n`);
        }
      }
      stdout.end();
    });

    return /** @type {any} */ (child);
  };
  /** @type {any} */ (spawn).captured = captured;
  return /** @type {FixtureSpawn} */ (/** @type {any} */ (spawn));
}
