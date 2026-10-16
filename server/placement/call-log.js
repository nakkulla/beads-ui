/**
 * jev call record of the placement judgment (UI-izba §4.2): one JSON line per
 * call in the server state directory, file mode 0600.
 *
 * A line carries exactly the fields below. Issue text, the request state and
 * the key are never handed to this module, so they cannot reach the file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';

const log = debug('placement:call-log');

/**
 * @typedef {Object} CallRecord
 * @property {string} at - ISO time the call ended.
 * @property {string} workspace
 * @property {string} a
 * @property {string} b
 * @property {string} digest_a
 * @property {string} digest_b
 * @property {string|null} choice
 * @property {number|null} confidence
 * @property {number} ms
 * @property {string|null} reason - Failure reason, null on success.
 */

/** @type {ReadonlyArray<keyof CallRecord>} */
const FIELDS = Object.freeze([
  'at',
  'workspace',
  'a',
  'b',
  'digest_a',
  'digest_b',
  'choice',
  'confidence',
  'ms',
  'reason'
]);

/**
 * Create a call log over one file.
 *
 * @param {{ file: string }} options
 */
export function createCallLog(options) {
  const file = options.file;
  /** @type {Promise<void>} */
  let tail = Promise.resolve();
  let mode_checked = false;

  /**
   * @param {CallRecord} record
   */
  async function write(record) {
    const line = `${JSON.stringify(
      Object.fromEntries(FIELDS.map((field) => [field, record[field]]))
    )}\n`;
    await fs.promises.mkdir(path.dirname(file), { recursive: true });
    await fs.promises.appendFile(file, line, { mode: 0o600 });
    if (!mode_checked) {
      // `mode` applies only when appendFile creates the file; an older file
      // keeps whatever mode it had, so the first write of a process fixes it.
      await fs.promises.chmod(file, 0o600);
      mode_checked = true;
    }
  }

  return {
    /**
     * Append one record. Never rejects; a write failure is logged by reason.
     *
     * @param {CallRecord} record
     * @returns {Promise<void>}
     */
    append(record) {
      tail = tail
        .then(() => write(record))
        .catch((err) => {
          log('call log write failed: %s', err && err.code);
        });
      return tail;
    }
  };
}
