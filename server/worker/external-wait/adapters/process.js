import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @param {string} file
 * @param {number} bytes
 * @returns {Promise<string>}
 */
async function readLogTail(file, bytes) {
  const handle = await fs.open(file, 'r');
  try {
    const info = await handle.stat();
    const buffer = Buffer.alloc(Math.min(bytes, info.size));
    const { bytesRead: bytes_read } = await handle.read(
      buffer,
      0,
      buffer.length,
      Math.max(0, info.size - bytes)
    );
    return buffer.subarray(0, bytes_read).toString('utf8');
  } finally {
    await handle.close();
  }
}

/**
 * @param {import('../store.js').ProcessJob} job
 * @param {{run:import('../store.js').Run, readTail?:(file:string, bytes:number)=>Promise<string>}} options
 * @returns {Promise<import('../store.js').Observation>}
 */
export async function observeProcessJob(job, { run, readTail = readLogTail }) {
  let probe;
  try {
    probe = await run(
      ['env', 'LC_ALL=C', 'ps', '-p', String(job.pid), '-o', 'lstart='],
      { timeout_ms: 5000 }
    );
  } catch {
    return { state: 'UNKNOWN', terminal: false, error: 'process probe failed' };
  }
  const actual = probe.stdout.trim();
  const absent =
    probe.code === 1 && actual === '' && probe.stderr.trim() === '';
  if (!(probe.code === 0 && actual) && !absent) {
    return { state: 'UNKNOWN', terminal: false, error: 'process probe failed' };
  }
  // Probe before reading: the wrapper may write its final rc as it exits.
  let tail;
  try {
    tail = await readTail(job.log_path, 4096);
  } catch {
    return { state: 'UNKNOWN', terminal: false, error: 'log unreadable' };
  }
  const alive =
    !absent &&
    (job.process_start === undefined || actual === job.process_start);
  if (alive) {
    return { state: 'RUNNING', terminal: false };
  }
  const matches = [...tail.matchAll(/^rc=(-?\d+)$/gm)];
  const last_match = matches.at(-1);
  const exit_code = last_match ? Number(last_match[1]) : null;
  /** @type {import('../store.js').ExpectedResult[]} */
  const expected_results = [];
  for (const expected of job.expected || []) {
    try {
      const info = await fs.stat(path.resolve(job.workdir, expected));
      expected_results.push({
        path: expected,
        exists: true,
        size: info.size,
        mtime: Math.floor(info.mtimeMs / 1000)
      });
    } catch (error) {
      const code = /** @type {NodeJS.ErrnoException} */ (error).code;
      if (code !== 'ENOENT' && code !== 'ENOTDIR') {
        throw error;
      }
      expected_results.push({
        path: expected,
        exists: false,
        size: null,
        mtime: null
      });
    }
  }
  return {
    state:
      exit_code === null
        ? 'VANISHED'
        : exit_code === 0
          ? 'COMPLETED'
          : 'FAILED',
    terminal: true,
    exit_code,
    evidence: exit_code === null ? 'vanished' : 'rc_line',
    expected_results,
    recovery_needed:
      exit_code !== 0 || expected_results.some((item) => !item.exists)
  };
}
