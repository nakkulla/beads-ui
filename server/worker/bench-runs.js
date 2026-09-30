/**
 * Bench experiment run manifests — the read surface the Worker scheduler still
 * needs for runs that already exist (preset-compare §4.6).
 *
 * Creating a run and listing runs on the comparison screen were retired with
 * the frontend rewrite (UI-dbn6 §4.5). What stays is what the
 * scheduler asks of a cell that is already in flight: which clone beads a run
 * owns, and whether one cell has finished for good so its residue may be
 * swept. The manifest holds the run's INPUTS only and is never rewritten.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { benchManifestPath } from './state-paths.js';

const log = debug('worker:bench-runs');

/**
 * `bench_run` / close-reason run-id vocabulary, consumed verbatim from the
 * dotfiles contract (`metadata.out_of_registry.formats.bench_run`, and the same
 * token set inside `landing_none_close.close_reason.regex`).
 */
export const BENCH_RUN_ID_RE = /^[A-Za-z0-9._-]+$/;

/**
 * Attempt statuses a bench cell can still come back from.
 *
 * Deliberately NOT `queue-store.js`'s `TERMINAL_ATTEMPT_STATUSES`: that set
 * answers "has this attempt released its bead" for scheduling, and `parked`,
 * `waiting`, `retry_wait` and `stopped` all release the bead while the CELL is
 * still expected to produce a result. Reading them as an ending would let the
 * run sweep delete the worktree and branch a resume needs.
 *
 * @type {ReadonlySet<string>}
 */
export const BENCH_CELL_RESUMABLE_STATUSES = new Set([
  'pending',
  'running',
  'retry_wait',
  'parked',
  'waiting',
  'stopped'
]);

/**
 * Has one bench cell finished for good (§4.6)? The single owner of that
 * question for the scheduler's residue sweep.
 *
 * Two conditions, both required. The clone bead must be CLOSED — a session
 * closes it with `bench:<run_id>` and the Worker closes a failed cell with
 * `bench:<run_id>:failed`, so an open bead means the cell is still owed a run.
 * And no attempt of the lineage may sit in a resumable status. An unknown
 * status counts as resumable: cleanup is irreversible, so an unreadable row is
 * a reason to keep the worktree, never a reason to remove it.
 *
 * @param {{ attempts?: Array<Record<string, any>>, bead_closed?: boolean }} cell
 * @returns {boolean}
 */
export function benchCellTerminal(cell) {
  if (cell?.bead_closed !== true) {
    return false;
  }
  for (const attempt of Array.isArray(cell.attempts) ? cell.attempts : []) {
    const status =
      attempt && typeof attempt.status === 'string' ? attempt.status : null;
    if (status === null || BENCH_CELL_RESUMABLE_STATUSES.has(status)) {
      return false;
    }
  }
  return true;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Persist one run manifest in the format {@link readBenchManifest} reads.
 *
 * @param {string} workspace_root
 * @param {Record<string, any>} manifest
 * @param {{ fs?: any }} [deps]
 * @returns {{ ok: boolean, path?: string, reason?: string }}
 */
export function writeBenchManifest(workspace_root, manifest, deps = {}) {
  const fs = deps.fs || nodeFs;
  const run_id = usableString(manifest?.run_id);
  if (run_id === null || !BENCH_RUN_ID_RE.test(run_id)) {
    return { ok: false, reason: 'invalid_run_id' };
  }
  const file = benchManifestPath(workspace_root, run_id);
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`);
  } catch (err) {
    log('bench manifest write failed for %s: %o', run_id, err);
    return { ok: false, reason: 'manifest_write_failed' };
  }
  return { ok: true, path: file };
}

/**
 * @param {string} workspace_root
 * @param {string} run_id
 * @param {{ fs?: any }} [deps]
 * @returns {Record<string, any>|null}
 */
export function readBenchManifest(workspace_root, run_id, deps = {}) {
  const fs = deps.fs || nodeFs;
  if (usableString(run_id) === null || !BENCH_RUN_ID_RE.test(run_id)) {
    return null;
  }
  try {
    const raw = String(
      fs.readFileSync(benchManifestPath(workspace_root, run_id), 'utf8')
    );
    const parsed = JSON.parse(raw);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // An unreadable manifest is an absent one: nothing downstream may treat a
    // read failure as "this run has no cells".
    return null;
  }
}

/**
 * The clone bead ids one run owns.
 *
 * @param {Record<string, any>|null} manifest
 * @returns {string[]}
 */
export function benchRunBeadIds(manifest) {
  if (!isRecord(manifest) || !Array.isArray(manifest.cells)) {
    return [];
  }
  /** @type {string[]} */
  const ids = [];
  for (const cell of manifest.cells) {
    const id = isRecord(cell) ? usableString(cell.bead_id) : null;
    if (id !== null) {
      ids.push(id);
    }
  }
  return ids;
}
