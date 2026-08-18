/**
 * Parallel-analysis settings, cache, and job lifecycle (UI-04vo §9, seam G).
 *
 * - SETTINGS are server-global (`parallel-analysis-settings.json`) under an
 *   integer-revision CAS; only a selection that passes the injected
 *   catalog+probe validation may ever be stored.
 * - The per-workspace CACHE holds one last-good validated result and its
 *   identity digest. A failed/cancelled run never touches it — last-good is
 *   replaced only by a new success.
 * - JOBS are single-flight per workspace: a duplicate start joins the active
 *   run. Job state is process memory (plus an advisory marker in the cache
 *   file); a marker found on load is an ORPHAN from a dead server and settles
 *   to idle.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  parallelAnalysisCachePath,
  parallelAnalysisSettingsPath
} from './state-paths.js';

/**
 * The selection used when the stored settings are incomplete (UI-yqw9 §3).
 *
 * It replaces the older "initial state is unconfigured": a fresh install can
 * analyze without visiting the settings first. It is deliberately NEVER
 * persisted — `revision` stays 0 so the user's first save still lands on CAS 0
 * — and it is never auto-substituted for something else: a default the catalog
 * no longer offers falls back to unconfigured rather than picking a neighbour.
 *
 * @type {{ runner: string, model: string, effort: string }}
 */
export const DEFAULT_ANALYZER_SELECTION = {
  runner: 'claude',
  model: 'opus',
  effort: 'high'
};

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Cache identity for one analysis (UI-04vo §9): the semantic snapshot digest
 * (workspace, base SHA, targets, artifact OIDs, deps, prompt version) plus the
 * exact runner/model/effort the result was produced with.
 *
 * @param {{ snapshot: { digest: string }, runner: string|null, model: string|null, effort: string|null }} input
 * @returns {string}
 */
export function analysisIdentityOf(input) {
  return crypto
    .createHash('sha256')
    .update(
      JSON.stringify([
        input.snapshot?.digest || '',
        input.runner || '',
        input.model || '',
        input.effort || ''
      ])
    )
    .digest('hex');
}

/**
 * @param {string} file
 * @param {any} value
 */
function persist(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
}

/**
 * @param {string} file
 * @returns {any}
 */
function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Build the settings/cache/job surface for one server process. `jobs` lives in
 * this closure, which is what makes single-flight per workspace true for every
 * connection at once — and what makes a marker found on disk an orphan.
 *
 * @param {{ now?: () => number, validateSelection?: (sel: { runner: string, model: string, effort: string }) => boolean }} [options]
 */
export function createParallelAnalysisStore(options = {}) {
  const now = options.now || (() => Date.now());
  const validateSelection = options.validateSelection || (() => true);
  /**
   * @type {Map<string, { job_id: string, identity: string, runner: string|null, model: string|null, effort: string|null, started_at: number, cancel: () => void, done: Promise<any> }>}
   */
  const jobs = new Map();
  let job_seq = 0;

  /**
   * @returns {{ revision: number, runner: string|null, model: string|null, effort: string|null }}
   */
  function readSettings() {
    const raw = readJson(parallelAnalysisSettingsPath());
    if (!isRecord(raw)) {
      return { revision: 0, runner: null, model: null, effort: null };
    }
    return {
      revision:
        typeof raw.revision === 'number' && Number.isFinite(raw.revision)
          ? Math.max(0, Math.floor(raw.revision))
          : 0,
      runner: typeof raw.runner === 'string' ? raw.runner : null,
      model: typeof raw.model === 'string' ? raw.model : null,
      effort: typeof raw.effort === 'string' ? raw.effort : null
    };
  }

  /**
   * @param {string} workspace
   */
  function readCacheRaw(workspace) {
    const raw = readJson(parallelAnalysisCachePath(workspace));
    const last_good =
      isRecord(raw) &&
      isRecord(raw.last_good) &&
      typeof raw.last_good.identity === 'string'
        ? {
            identity: raw.last_good.identity,
            result: raw.last_good.result,
            at: typeof raw.last_good.at === 'number' ? raw.last_good.at : null
          }
        : null;
    return { last_good };
  }

  /**
   * The selection a run would actually use: the stored one when it is
   * COMPLETE, else {@link DEFAULT_ANALYZER_SELECTION} marked `is_default`.
   *
   * `revision` is always the stored one, so a CAS built on this value still
   * writes the user's first save at revision 0 — the default is a reading, not
   * a stored state.
   *
   * @returns {{ revision: number, runner: string, model: string, effort: string, is_default: boolean }}
   */
  function effectiveSettings() {
    const stored = readSettings();
    if (stored.runner && stored.model && stored.effort) {
      return {
        revision: stored.revision,
        runner: stored.runner,
        model: stored.model,
        effort: stored.effort,
        is_default: false
      };
    }
    return {
      revision: stored.revision,
      ...DEFAULT_ANALYZER_SELECTION,
      is_default: true
    };
  }

  return {
    readSettings,
    effectiveSettings,

    /**
     * CAS settings update (UI-04vo §9). A selection failing the catalog+probe
     * validation is REJECTED without a write.
     *
     * @param {{ expected_revision: number, runner: string, model: string, effort: string }} input
     */
    updateSettings(input) {
      const current = readSettings();
      if (input.expected_revision !== current.revision) {
        return { ok: false, conflict: true, settings: current };
      }
      if (
        typeof input.runner !== 'string' ||
        typeof input.model !== 'string' ||
        typeof input.effort !== 'string' ||
        !validateSelection({
          runner: input.runner,
          model: input.model,
          effort: input.effort
        })
      ) {
        return {
          ok: false,
          conflict: false,
          reason: 'selection_invalid',
          settings: current
        };
      }
      const next = {
        revision: current.revision + 1,
        runner: input.runner,
        model: input.model,
        effort: input.effort
      };
      persist(parallelAnalysisSettingsPath(), next);
      return { ok: true, conflict: false, settings: next };
    },

    /**
     * Last-good cache + job view. An on-disk job marker is an orphan from a
     * dead server process and always reads as idle (`job: null`).
     *
     * @param {string} workspace
     */
    readCache(workspace) {
      return { ...readCacheRaw(workspace), job: null };
    },

    /**
     * Replace the last-good result — the ONLY path that writes it.
     *
     * @param {string} workspace
     * @param {{ identity: string, result: any }} input
     */
    saveLastGood(workspace, input) {
      persist(parallelAnalysisCachePath(workspace), {
        last_good: {
          identity: input.identity,
          result: input.result,
          at: now()
        }
      });
    },

    /**
     * The active in-memory job for a workspace, or null.
     *
     * Carries the SELECTION and the start time (UI-yqw9 §4.1) so every
     * subscriber — including a tab that connected mid-run — can say what is
     * running and for how long, without a new message type.
     *
     * @param {string} workspace
     */
    activeJob(workspace) {
      const job = jobs.get(workspace);
      return job
        ? {
            job_id: job.job_id,
            identity: job.identity,
            runner: job.runner,
            model: job.model,
            effort: job.effort,
            started_at: job.started_at
          }
        : null;
    },

    /**
     * Start the workspace's single-flight job, or JOIN the active one when it
     * is computing the SAME identity.
     *
     * Identity equality is what makes joining safe: the joiner adopts the
     * runner's result, and a result produced under one model/effort must never
     * be validated and cached as another's. A different identity is refused
     * (`job_active`) rather than silently served the wrong run.
     *
     * @param {string} workspace
     * @param {{ identity: string, selection?: { runner: string, model: string, effort: string }, start: () => { done: Promise<any>, cancel: () => void } }} input
     * @returns {{ job_id: string, done?: Promise<any>, joined?: true, ok?: false, reason?: string }}
     */
    startJob(workspace, input) {
      const active = jobs.get(workspace);
      if (active) {
        if (active.identity !== input.identity) {
          return { ok: false, reason: 'job_active', job_id: active.job_id };
        }
        return { job_id: active.job_id, done: active.done, joined: true };
      }
      const job_id = `analysis-${now()}-${++job_seq}`;
      const handle = input.start();
      const done = Promise.resolve(handle.done)
        .catch((err) => ({
          ok: false,
          reason: 'run_error',
          detail: String(err)
        }))
        .then((outcome) => {
          jobs.delete(workspace);
          return outcome;
        });
      jobs.set(workspace, {
        job_id,
        identity: input.identity,
        runner: input.selection?.runner ?? null,
        model: input.selection?.model ?? null,
        effort: input.selection?.effort ?? null,
        started_at: now(),
        cancel: handle.cancel,
        done
      });
      return { job_id, done };
    },

    /**
     * Cancel the active job; the last-good cache is untouched.
     *
     * @param {string} workspace
     * @param {string} job_id
     */
    cancelJob(workspace, job_id) {
      const job = jobs.get(workspace);
      if (!job || job.job_id !== job_id) {
        return false;
      }
      try {
        job.cancel();
      } catch {
        // The run may already be settling.
      }
      return true;
    }
  };
}
