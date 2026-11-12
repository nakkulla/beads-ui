import { execFile } from 'node:child_process';

/**
 * @param {string[]} args
 * @returns {Promise<string>}
 */
function runHub(args) {
  return new Promise((resolve, reject) => {
    const child = execFile(
      'session-hub',
      ['relay-defaults', ...args],
      { encoding: 'utf8', timeout: 12000, maxBuffer: 1024 * 1024 },
      (error, stdout) => {
        if (error) {
          reject(Object.assign(error, { stdout }));
        } else {
          resolve(stdout);
        }
      }
    );
    child.stdin?.on('error', () => {});
    child.stdin?.end();
  });
}

/**
 * @param {any} value
 * @returns {boolean}
 */
function isSnapshot(value) {
  return (
    value &&
    value.ok === true &&
    Number.isSafeInteger(value.revision) &&
    value.revision >= 0 &&
    [value.overrides, value.effective, value.allowed].every(
      (item) => item && typeof item === 'object' && !Array.isArray(item)
    )
  );
}

/**
 * Invoke only the hub CLI; it owns validation and persistence.
 *
 * @param {{ expected_revision: number, values: Record<string, string|null> }|null} [input]
 * @param {(args: string[]) => Promise<string>} [run]
 * @returns {Promise<any>}
 */
export async function relayDefaults(input = null, run = runHub) {
  /** @type {string[]} */
  const args = [];
  if (input !== null) {
    if (
      !Number.isSafeInteger(input.expected_revision) ||
      input.expected_revision < 0 ||
      !input.values ||
      typeof input.values !== 'object' ||
      Array.isArray(input.values) ||
      !Object.entries(input.values).every(
        ([key, value]) =>
          /^[a-z]+\.[a-z]+$/.test(key) &&
          (value === null || typeof value === 'string')
      )
    ) {
      return {
        ok: false,
        code: 'bad_request',
        message: 'invalid relay defaults request'
      };
    }
    args.push('set');
    /** @type {string[]} */
    const unset_keys = [];
    for (const [key, value] of Object.entries(input.values)) {
      if (value !== null) {
        args.push(`${key}=${value}`);
      } else {
        unset_keys.push(key);
      }
    }
    if (unset_keys.length > 0) {
      args.push('--unset', ...unset_keys);
    }
    args.push('--revision', String(input.expected_revision));
  }
  try {
    const result = JSON.parse(await run(args));
    if (isSnapshot(result)) {
      return { ok: true, snapshot: result };
    }
  } catch (error) {
    try {
      const result = JSON.parse(/** @type {any} */ (error).stdout);
      if (
        result.ok === false &&
        ['conflict', 'invalid_value'].includes(result.code)
      ) {
        const current = await relayDefaults(null, run);
        return {
          ok: false,
          code: result.code,
          message: result.reason,
          snapshot: current.snapshot
        };
      }
    } catch {
      // Unavailable helpers and malformed output leave the editor read-only.
    }
  }
  return {
    ok: false,
    code: 'hub_unavailable',
    message: 'session-hub relay-defaults unavailable'
  };
}
