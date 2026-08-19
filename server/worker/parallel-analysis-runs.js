/**
 * Durable parallel-analysis run history.
 *
 * Runs are newest-first and capped. Rotation deletes only files owned by an
 * `analysis-` run id, so attempt transcripts in the shared sessions directory
 * can never be removed through this store.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import {
  parallelAnalysisRunDir,
  parallelAnalysisRunsPath,
  sessionLogPath
} from './state-paths.js';

/** @type {number} */
export const PARALLEL_ANALYSIS_RUN_LIMIT = 20;

/**
 * @typedef {Object} ParallelAnalysisRun
 * @property {string} run_id
 * @property {string|null} session_id
 * @property {string} runner
 * @property {string} model
 * @property {string} model_id
 * @property {string} effort
 * @property {string[]} target_ids
 * @property {string} snapshot_digest
 * @property {string} identity
 * @property {number} started_at
 * @property {number|null} ended_at
 * @property {'running'|'success'|'failure'|'cancelled'|'interrupted'} outcome
 * @property {string|null} reason
 * @property {string|null} diagnostic
 * @property {boolean} prompt_saved
 */

/**
 * @param {string} workspace
 * @param {string} run_id
 */
export function parallelAnalysisPromptPath(workspace, run_id) {
  const safe = String(run_id || 'analysis').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.join(parallelAnalysisRunDir(workspace), `${safe}-prompt.txt`);
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} file
 * @param {unknown} value
 * @param {typeof import('node:fs')} fs_impl
 */
function persist(file, value, fs_impl) {
  fs_impl.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs_impl.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs_impl.renameSync(tmp, file);
}

/**
 * @param {string} file
 * @param {typeof import('node:fs')} fs_impl
 * @returns {ParallelAnalysisRun[]}
 */
function readRuns(file, fs_impl) {
  try {
    const raw = JSON.parse(fs_impl.readFileSync(file, 'utf8'));
    if (!isRecord(raw) || !Array.isArray(raw.runs)) {
      return [];
    }
    return raw.runs.filter(
      (run) => isRecord(run) && typeof run.run_id === 'string'
    );
  } catch {
    return [];
  }
}

/**
 * @param {Iterable<string>|string|null|undefined} active_job_ids
 * @returns {Set<string>}
 */
function activeSetOf(active_job_ids) {
  if (typeof active_job_ids === 'string') {
    return new Set([active_job_ids]);
  }
  if (!active_job_ids) {
    return new Set();
  }
  return new Set(active_job_ids);
}

/**
 * Build a durable run-history store.
 *
 * @param {{ now?: () => number, fs?: typeof import('node:fs'), limit?: number }} [options]
 */
export function createParallelAnalysisRunsStore(options = {}) {
  const now = options.now || Date.now;
  const fs_impl = options.fs || nodeFs;
  const limit =
    typeof options.limit === 'number'
      ? Math.max(1, Math.floor(options.limit))
      : PARALLEL_ANALYSIS_RUN_LIMIT;

  /**
   * @param {string} workspace
   * @param {ParallelAnalysisRun[]} runs
   */
  function write(workspace, runs) {
    const kept = runs.slice(0, limit);
    const removed = runs.slice(limit);
    persist(parallelAnalysisRunsPath(workspace), { runs: kept }, fs_impl);
    for (const run of removed) {
      if (!/^analysis-[A-Za-z0-9._-]+$/.test(run.run_id)) {
        continue;
      }
      for (const file of [
        parallelAnalysisPromptPath(workspace, run.run_id),
        sessionLogPath(workspace, run.run_id)
      ]) {
        try {
          fs_impl.rmSync(file, { force: true });
        } catch {
          // Rotation is durable even when one owned detail file is unreadable.
        }
      }
    }
  }

  return {
    /**
     * Read history and lazily settle runs orphaned by a server restart.
     *
     * @param {string} workspace
     * @param {Iterable<string>|string|null} [active_job_ids]
     * @returns {ParallelAnalysisRun[]}
     */
    read(workspace, active_job_ids = null) {
      const runs = readRuns(parallelAnalysisRunsPath(workspace), fs_impl);
      const active = activeSetOf(active_job_ids);
      let changed = false;
      /** @type {ParallelAnalysisRun[]} */
      const adjusted = runs.map((run) => {
        if (run.outcome !== 'running' || active.has(run.run_id)) {
          return run;
        }
        changed = true;
        return /** @type {ParallelAnalysisRun} */ ({
          ...run,
          outcome: 'interrupted',
          reason: 'server_restart',
          ended_at: now()
        });
      });
      if (changed) {
        write(workspace, adjusted);
      }
      return adjusted;
    },

    /**
     * Add one newest run, replacing an accidental duplicate id.
     *
     * @param {string} workspace
     * @param {ParallelAnalysisRun} run
     */
    create(workspace, run) {
      const current = readRuns(parallelAnalysisRunsPath(workspace), fs_impl);
      write(workspace, [
        run,
        ...current.filter((entry) => entry.run_id !== run.run_id)
      ]);
      return run;
    },

    /**
     * Patch an existing run without creating a synthetic history row.
     *
     * @param {string} workspace
     * @param {string} run_id
     * @param {Partial<ParallelAnalysisRun>} patch
     */
    update(workspace, run_id, patch) {
      const current = readRuns(parallelAnalysisRunsPath(workspace), fs_impl);
      let found = false;
      const next = current.map((run) => {
        if (run.run_id !== run_id) {
          return run;
        }
        found = true;
        return { ...run, ...patch, run_id };
      });
      if (found) {
        write(workspace, next);
      }
      return found;
    }
  };
}
