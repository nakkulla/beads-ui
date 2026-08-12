import { runBdJson as defaultRunBdJson } from './bd.js';
import { normalizeIssueList } from './list-adapters.js';

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];
const DEFAULT_RETRY_BASE_MS = 1000;
const DEFAULT_RETRY_MAX_MS = 30000;

/**
 * @typedef {{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>} NormalizedIssue
 */

/**
 * @typedef {Object} WorkspaceSnapshot
 * @property {number} generation
 * @property {NormalizedIssue[]} all
 * @property {Map<string, NormalizedIssue>} id_index
 * @property {{ ready: Record<string, unknown>[], blocked: Record<string, unknown>[] }} ready_explain
 * @property {'embedded-dependencies'|'legacy-dependency-fallback'} command_mode
 * @property {number} command_count
 * @property {Record<string, unknown>[]} dependency_edges
 */

/**
 * Build a per-workspace raw snapshot coordinator. This module owns generation
 * atomicity only; projection and WebSocket publication remain consumers.
 *
 * @param {{ cwd?: string, runBdJson?: typeof defaultRunBdJson, now?: () => number, retry_base_ms?: number, retry_max_ms?: number, setTimeout?: typeof globalThis.setTimeout, clearTimeout?: typeof globalThis.clearTimeout }} [options]
 */
export function createWorkspaceSnapshotCoordinator(options = {}) {
  const cwd = options.cwd;
  const runBdJson = options.runBdJson || defaultRunBdJson;
  const now = options.now || (() => Date.now());
  const set_timeout = options.setTimeout || globalThis.setTimeout;
  const clear_timeout = options.clearTimeout || globalThis.clearTimeout;
  const retry_base_ms = positiveNumber(
    options.retry_base_ms,
    DEFAULT_RETRY_BASE_MS
  );
  const retry_max_ms = positiveNumber(
    options.retry_max_ms,
    DEFAULT_RETRY_MAX_MS
  );

  /** @type {{ generation: number, snapshot: WorkspaceSnapshot | null, in_flight: Promise<SnapshotResult> | null, pending_mutation: boolean, request_epoch: number, mutation_epoch: number, last_success_at: number | null, last_failure_at: number | null, retry_attempt: number, next_retry_at: number, retry_timer: ReturnType<typeof setTimeout> | null }} */
  const state = {
    generation: 0,
    snapshot: null,
    in_flight: null,
    pending_mutation: false,
    request_epoch: 0,
    mutation_epoch: 0,
    last_success_at: null,
    last_failure_at: null,
    retry_attempt: 0,
    next_retry_at: 0,
    retry_timer: null
  };

  /**
   * Request a generation or join the current one.
   *
   * @param {string} [cause]
   * @returns {Promise<SnapshotResult>}
   */
  function request(cause = 'background-subscribe') {
    if (isMutationCause(cause)) {
      markMutation();
    }
    if (state.in_flight !== null) {
      return state.in_flight;
    }

    if (now() < state.next_retry_at) {
      return Promise.resolve(backoffResult(state.snapshot));
    }

    // A retry after backoff consumes earlier mutation evidence. A mutation
    // arriving after this point increments its epoch and schedules another run.
    state.pending_mutation = false;
    return startGeneration(cause);
  }

  /**
   * Record watcher or successful mutation evidence. Several signals while a
   * generation is running collapse into one trailing refresh.
   */
  function signalMutation() {
    markMutation();
  }

  /**
   * @returns {WorkspaceSnapshot | null}
   */
  function getSnapshot() {
    return state.snapshot;
  }

  /**
   * Return durable refresh state without exposing the mutable snapshot.
   *
   * @returns {{ generation: number, in_flight: boolean, pending_mutation: boolean, request_epoch: number, mutation_epoch: number, last_success_at: number | null, last_failure_at: number | null, retry_attempt: number, next_retry_at: number }}
   */
  function getState() {
    return {
      generation: state.generation,
      in_flight: state.in_flight !== null,
      pending_mutation: state.pending_mutation,
      request_epoch: state.request_epoch,
      mutation_epoch: state.mutation_epoch,
      last_success_at: state.last_success_at,
      last_failure_at: state.last_failure_at,
      retry_attempt: state.retry_attempt,
      next_retry_at: state.next_retry_at
    };
  }

  /**
   * Settle all currently scheduled work, including a successful mutation
   * trailing generation. Test callers use this instead of timing internals.
   *
   * @returns {Promise<void>}
   */
  async function waitForIdle() {
    while (state.in_flight !== null) {
      await state.in_flight;
      await Promise.resolve();
    }
  }

  /**
   * @param {string} cause
   * @returns {Promise<SnapshotResult>}
   */
  function startGeneration(cause) {
    cancelRetryTimer();
    const request_epoch = state.request_epoch + 1;
    state.request_epoch = request_epoch;
    const mutation_epoch = state.mutation_epoch;
    const work = runGeneration(cause, request_epoch, mutation_epoch);
    state.in_flight = work;

    void work.then((result) => {
      if (state.in_flight !== work) {
        return;
      }
      state.in_flight = null;

      if (state.pending_mutation) {
        if (result.ok && !result.stale) {
          state.pending_mutation = false;
          startGeneration('mutation-trailing');
        } else {
          schedulePendingMutationRetry();
        }
      }
    });
    return work;
  }

  /**
   * @param {string} cause
   * @param {number} request_epoch
   * @param {number} mutation_epoch
   * @returns {Promise<SnapshotResult>}
   */
  async function runGeneration(cause, request_epoch, mutation_epoch) {
    try {
      const [all_result, ready_result] = await Promise.all([
        runBdJson(ALL_ARGS, { cwd }),
        runBdJson(READY_ARGS, { cwd })
      ]);
      const all_error = commandError('all', all_result);
      if (all_error !== null) {
        return recordFailure(all_error);
      }
      const ready_error = commandError('ready', ready_result);
      if (ready_error !== null) {
        return recordFailure(ready_error);
      }

      const raw_all = all_result.stdoutJson;
      const raw_ready = ready_result.stdoutJson;
      if (!Array.isArray(raw_all)) {
        return recordFailure(
          snapshotError('validation', 'bd list returned a non-array payload')
        );
      }
      const ready_explain = normalizeReadyExplain(raw_ready);
      if (ready_explain === null) {
        return recordFailure(
          snapshotError(
            'validation',
            'bd ready --explain returned an invalid payload'
          )
        );
      }

      const all = normalizeIssueList(raw_all);
      /** @type {Map<string, NormalizedIssue>} */
      const id_index = new Map(all.map((issue) => [issue.id, issue]));
      const validation_error = validateExplainSubjects(ready_explain, id_index);
      if (validation_error !== null) {
        return recordFailure(validation_error);
      }

      const embedded_dependencies = raw_all.some(hasDependenciesProperty);
      /** @type {Record<string, unknown>[]} */
      let dependency_edges = [];
      if (!embedded_dependencies && all.length > 0) {
        const dependency_result = await runBdJson(
          ['dep', 'list', ...all.map((issue) => issue.id), '--json'],
          { cwd }
        );
        const dependency_error = commandError(
          'dependencies',
          dependency_result
        );
        if (dependency_error !== null) {
          return recordFailure(dependency_error);
        }
        if (!Array.isArray(dependency_result.stdoutJson)) {
          return recordFailure(
            snapshotError(
              'validation',
              'bd dep list returned a non-array payload'
            )
          );
        }
        dependency_edges = dependency_result.stdoutJson.filter(isRecord);
      }

      if (request_epoch !== state.request_epoch) {
        return fencedResult(state.snapshot);
      }

      /** @type {WorkspaceSnapshot} */
      const snapshot = {
        generation: state.generation + 1,
        all,
        id_index,
        ready_explain,
        command_mode:
          /** @type {'embedded-dependencies'|'legacy-dependency-fallback'} */ (
            embedded_dependencies
              ? 'embedded-dependencies'
              : 'legacy-dependency-fallback'
          ),
        command_count: embedded_dependencies || all.length === 0 ? 2 : 3,
        dependency_edges
      };
      state.generation = snapshot.generation;
      state.snapshot = snapshot;
      state.last_success_at = now();
      state.retry_attempt = 0;
      state.next_retry_at = 0;
      cancelRetryTimer();

      return {
        ok: true,
        snapshot,
        stale: false,
        fresh: mutation_epoch === state.mutation_epoch,
        cause
      };
    } catch (error) {
      return recordFailure(
        snapshotError(
          'command',
          error instanceof Error ? error.message : 'bd invocation failed'
        )
      );
    }
  }

  /**
   * @param {SnapshotError} error
   * @returns {SnapshotResult}
   */
  function recordFailure(error) {
    state.last_failure_at = now();
    state.retry_attempt += 1;
    const delay = Math.min(
      retry_base_ms * 2 ** (state.retry_attempt - 1),
      retry_max_ms
    );
    state.next_retry_at = now() + delay;
    if (state.snapshot === null) {
      return { ok: false, error, stale: false, fresh: false };
    }
    return {
      ok: true,
      snapshot: state.snapshot,
      error,
      stale: true,
      fresh: false
    };
  }

  /**
   * Incrementing this epoch fences a generation that began before the write.
   */
  function markMutation() {
    state.pending_mutation = true;
    state.mutation_epoch += 1;
    if (state.in_flight === null) {
      schedulePendingMutationRetry();
    }
  }

  /**
   * Schedule one unreferenced retry only when mutation evidence must wait for
   * the current backoff window. Calls coalesce through `retry_timer`.
   */
  function schedulePendingMutationRetry() {
    if (
      !state.pending_mutation ||
      state.in_flight !== null ||
      state.next_retry_at <= now() ||
      state.retry_timer !== null
    ) {
      return;
    }
    const delay = state.next_retry_at - now();
    /** @type {ReturnType<typeof setTimeout>} */
    let retry_timer;
    retry_timer = set_timeout(() => {
      if (state.retry_timer !== retry_timer) {
        return;
      }
      state.retry_timer = null;
      runPendingMutationRetry();
    }, delay);
    state.retry_timer = retry_timer;
    retry_timer.unref?.();
  }

  /**
   * Start the scheduled retry only after the backoff deadline and only when
   * no request has already consumed the pending mutation evidence.
   */
  function runPendingMutationRetry() {
    if (!state.pending_mutation || state.in_flight !== null) {
      return;
    }
    if (now() < state.next_retry_at) {
      schedulePendingMutationRetry();
      return;
    }
    state.pending_mutation = false;
    startGeneration('mutation-retry');
  }

  /**
   * Cancel a stale deadline timer before an earlier request or a success can
   * consume its pending work.
   */
  function cancelRetryTimer() {
    if (state.retry_timer === null) {
      return;
    }
    clear_timeout(state.retry_timer);
    state.retry_timer = null;
  }

  return { request, signalMutation, getSnapshot, getState, waitForIdle };
}

/**
 * @typedef {{ code: 'workspace_snapshot_error', stage: string, message: string, details?: Record<string, unknown> }} SnapshotError
 */

/**
 * @typedef {{ ok: true, snapshot: WorkspaceSnapshot, stale: boolean, fresh: boolean, cause?: string, error?: SnapshotError } | { ok: false, error: SnapshotError, stale: false, fresh: false }} SnapshotResult
 */

/**
 * @param {unknown} value
 * @param {number} fallback
 */
function positiveNumber(value, fallback) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

/**
 * @param {string} cause
 */
function isMutationCause(cause) {
  return cause === 'mutation' || cause === 'watcher';
}

/**
 * @param {WorkspaceSnapshot | null} snapshot
 * @returns {SnapshotResult}
 */
function backoffResult(snapshot) {
  if (snapshot === null) {
    return {
      ok: false,
      error: snapshotError('backoff', 'workspace snapshot retry is pending'),
      stale: false,
      fresh: false
    };
  }
  return { ok: true, snapshot, stale: true, fresh: false };
}

/**
 * @param {WorkspaceSnapshot | null} snapshot
 * @returns {SnapshotResult}
 */
function fencedResult(snapshot) {
  if (snapshot === null) {
    return {
      ok: false,
      error: snapshotError(
        'fence',
        'workspace snapshot request was superseded'
      ),
      stale: false,
      fresh: false
    };
  }
  return { ok: true, snapshot, stale: true, fresh: false };
}

/**
 * @param {string} stage
 * @param {unknown} result
 * @returns {SnapshotError | null}
 */
function commandError(stage, result) {
  if (
    !isRecord(result) ||
    result.code !== 0 ||
    !Object.hasOwn(result, 'stdoutJson')
  ) {
    return snapshotError(
      stage,
      isRecord(result) && typeof result.stderr === 'string'
        ? result.stderr || `bd ${stage} failed`
        : `bd ${stage} failed`
    );
  }
  return null;
}

/**
 * @param {string} stage
 * @param {string} message
 * @returns {SnapshotError}
 */
function snapshotError(stage, message) {
  return { code: 'workspace_snapshot_error', stage, message };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 */
function hasDependenciesProperty(value) {
  return isRecord(value) && Object.hasOwn(value, 'dependencies');
}

/**
 * @param {unknown} value
 * @returns {{ ready: Record<string, unknown>[], blocked: Record<string, unknown>[] } | null}
 */
function normalizeReadyExplain(value) {
  if (
    !isRecord(value) ||
    !Array.isArray(value.ready) ||
    !Array.isArray(value.blocked)
  ) {
    return null;
  }
  const ready = value.ready.filter(isRecord);
  const blocked = value.blocked.filter(isRecord);
  if (
    ready.length !== value.ready.length ||
    blocked.length !== value.blocked.length
  ) {
    return null;
  }
  return { ready, blocked };
}

/**
 * Only the ready/blocked subjects must exist locally. `blocked_by` may point
 * to an external rig or a missing issue and is deliberately preserved as-is.
 *
 * @param {{ ready: Record<string, unknown>[], blocked: Record<string, unknown>[] }} ready_explain
 * @param {Map<string, NormalizedIssue>} id_index
 * @returns {SnapshotError | null}
 */
function validateExplainSubjects(ready_explain, id_index) {
  for (const subject of [...ready_explain.ready, ...ready_explain.blocked]) {
    const id =
      typeof subject.id === 'string' ? subject.id : String(subject.id ?? '');
    if (id.length === 0 || !id_index.has(id)) {
      return snapshotError(
        'validation',
        `ready explain subject is absent from all rows: ${id}`
      );
    }
  }
  return null;
}
