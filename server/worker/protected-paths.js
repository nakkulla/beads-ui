/**
 * Changed-path collection and protected-path judgment for the self-improvement
 * landing notice (UI-jlov spec §4.3–§4.4).
 *
 * beads-ui never reads the protected list: the installed dotfiles checker owns
 * the prefix rules and this module only runs it and consumes `--json` (ADR
 * UI-jlov). Neither function throws; every failure is a fixed reason token
 * the notice prints as `확인 못 함 (<reason>)`.
 */
import { execFile } from 'node:child_process';
import nodeFs from 'node:fs';
import path from 'node:path';

const OID_RE = /^[0-9a-f]{40}$/i;
const ZERO_OID_RE = /^0{40}$/;
const CHECKER_RELATIVE = [
  'src',
  'shared',
  'skills',
  'flow',
  'workflow',
  'scripts',
  'check-protected-paths.py'
];
const DEFAULT_TIMEOUT_MS = 20000;
const MAX_BUFFER_BYTES = 4 * 1024 * 1024;

/**
 * Collect the paths one attempt changed on the landing base, from the base
 * lines of its push record.
 *
 * @param {{
 *   entries: Record<string, unknown>[],
 *   base_ref: string,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   cwd: string
 * }} input
 * @returns {Promise<{ ok: true, paths: string[] }|{ ok: false, reason: 'range_unknown'|'git_error' }>}
 */
export async function collectChangedPaths(input) {
  const base_lines = input.entries.filter(
    (entry) =>
      typeof entry.remote_ref === 'string' &&
      entry.remote_ref === input.base_ref
  );
  if (base_lines.length === 0) {
    return { ok: false, reason: 'range_unknown' };
  }
  /** @type {{ remote_oid: string, local_oid: string }[]} */
  const ranges = [];
  for (const entry of base_lines) {
    const { remote_oid, local_oid } = entry;
    if (
      typeof remote_oid !== 'string' ||
      typeof local_oid !== 'string' ||
      !OID_RE.test(remote_oid) ||
      !OID_RE.test(local_oid) ||
      ZERO_OID_RE.test(remote_oid)
    ) {
      return { ok: false, reason: 'range_unknown' };
    }
    ranges.push({ remote_oid, local_oid });
  }
  /** @type {Set<string>} */
  const seen = new Set();
  for (const range of ranges) {
    let result;
    try {
      result = await input.gitRun(
        [
          'diff',
          '--name-only',
          '--no-renames',
          '-z',
          range.remote_oid,
          range.local_oid
        ],
        { cwd: input.cwd }
      );
    } catch {
      return { ok: false, reason: 'git_error' };
    }
    if (result.code !== 0) {
      return { ok: false, reason: 'git_error' };
    }
    for (const changed of String(result.stdout).split('\0')) {
      if (changed.length > 0) {
        seen.add(changed);
      }
    }
  }
  return { ok: true, paths: [...seen] };
}

/**
 * Run a file with stdin input; rejects with the execFile error on any failure.
 *
 * @param {string} file
 * @param {string[]} argv
 * @param {{ cwd?: string, timeout?: number, input?: string, maxBuffer?: number }} options
 * @returns {Promise<{ stdout: string }>}
 */
function defaultSpawn(file, argv, options) {
  return new Promise((resolve, reject) => {
    const { input, ...exec_options } = options;
    const child = execFile(file, argv, exec_options, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout: String(stdout) });
      }
    });
    // A checker exiting before it consumed stdin surfaces through execFile's
    // result; the EPIPE itself must not reach the process.
    child.stdin?.on('error', () => {});
    child.stdin?.end(input);
  });
}

/**
 * Map an execFile failure to a fixed reason token.
 *
 * @param {any} err
 * @returns {string}
 */
function spawnFailureReason(err) {
  if (err && err.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
    return 'bad_json';
  }
  if (err && (err.killed === true || typeof err.signal === 'string')) {
    return 'timeout';
  }
  if (err && typeof err.code === 'number') {
    return `checker_exit_${err.code}`;
  }
  return 'checker_missing';
}

/**
 * Ask the installed dotfiles checker which of the changed paths are protected.
 *
 * @param {{
 *   paths: string[],
 *   rig: string,
 *   cwd: string,
 *   dotfiles_root: string|null,
 *   python: string,
 *   spawn?: (file: string, argv: string[], options: { cwd?: string, timeout?: number, input?: string, maxBuffer?: number }) => Promise<{ stdout: string }>,
 *   timeout_ms?: number,
 *   fs?: { existsSync: (p: string) => boolean }
 * }} input
 * @returns {Promise<{ ok: true, protected: string[] }|{ ok: false, reason: string }>}
 */
export async function checkProtectedPaths(input) {
  try {
    if (
      typeof input.dotfiles_root !== 'string' ||
      input.dotfiles_root.length === 0
    ) {
      return { ok: false, reason: 'checker_missing' };
    }
    const fs = input.fs || nodeFs;
    const checker = path.join(input.dotfiles_root, ...CHECKER_RELATIVE);
    if (!fs.existsSync(checker)) {
      return { ok: false, reason: 'checker_missing' };
    }
    if (input.paths.length === 0) {
      return { ok: true, protected: [] };
    }
    const spawn = input.spawn || defaultSpawn;
    let out;
    try {
      out = await spawn(input.python, [checker, '--rig', input.rig, '--json'], {
        cwd: input.cwd,
        timeout: input.timeout_ms ?? DEFAULT_TIMEOUT_MS,
        input: `${input.paths.join('\n')}\n`,
        maxBuffer: MAX_BUFFER_BYTES
      });
    } catch (err) {
      return { ok: false, reason: spawnFailureReason(err) };
    }
    /** @type {any} */
    let parsed;
    try {
      parsed = JSON.parse(out.stdout);
    } catch {
      return { ok: false, reason: 'bad_json' };
    }
    if (
      parsed === null ||
      typeof parsed !== 'object' ||
      !Array.isArray(parsed.protected) ||
      !parsed.protected.every(
        (/** @type {unknown} */ p) => typeof p === 'string'
      )
    ) {
      return { ok: false, reason: 'bad_json' };
    }
    return { ok: true, protected: parsed.protected };
  } catch {
    return { ok: false, reason: 'checker_missing' };
  }
}
