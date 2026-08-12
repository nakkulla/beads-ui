import { runBdJson as defaultRunBdJson } from './bd.js';
import { normalizeIssueList } from './list-adapters.js';
import { debug } from './logging.js';

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];
const DEFAULT_RETRY_BASE_MS = 1000;
const DEFAULT_RETRY_MAX_MS = 30000;
const log = debug('workspace-snapshot');

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
 * @typedef {Object} WorkspaceSnapshotTelemetry
 * @property {string} event
 * @property {string} workspace
 * @property {string} cause
 * @property {number} generation
 * @property {boolean} join
 * @property {boolean} trailing
 * @property {number} retry_attempt
 * @property {number} backoff_ms
 * @property {number} command_duration_ms
 * @property {number | null} command_exit
 * @property {number} projection_count
 * @property {number | null} command_count
 * @property {'embedded-dependencies'|'legacy-dependency-fallback'|null} command_mode
 * @property {'all'|'ready'|'dependencies'|null} command_stage
 */

/**
 * Build a per-workspace raw snapshot coordinator. This module owns generation
 * atomicity only; projection and WebSocket publication remain consumers.
 *
 * @param {{ cwd?: string, runBdJson?: typeof defaultRunBdJson, now?: () => number, retry_base_ms?: number, retry_max_ms?: number, dependency_mode?: 'embedded-dependencies'|'legacy-dependency-fallback', setTimeout?: typeof globalThis.setTimeout, clearTimeout?: typeof globalThis.clearTimeout, telemetry?: (event: WorkspaceSnapshotTelemetry) => void }} [options]
 */
export function createWorkspaceSnapshotCoordinator(options = {}) {
  const cwd = options.cwd;
  const runBdJson = options.runBdJson || defaultRunBdJson;
  const now = options.now || (() => Date.now());
  const set_timeout = options.setTimeout || globalThis.setTimeout;
  const clear_timeout = options.clearTimeout || globalThis.clearTimeout;
  const telemetry = options.telemetry || logTelemetry;
  const workspace = cwd || process.cwd();
  const retry_base_ms = positiveNumber(
    options.retry_base_ms,
    DEFAULT_RETRY_BASE_MS
  );
  const retry_max_ms = positiveNumber(
    options.retry_max_ms,
    DEFAULT_RETRY_MAX_MS
  );
  const dependency_mode =
    options.dependency_mode === 'legacy-dependency-fallback'
      ? 'legacy-dependency-fallback'
      : 'embedded-dependencies';

  /** @type {{ generation: number, snapshot: WorkspaceSnapshot | null, in_flight: Promise<SnapshotResult> | null, pending_mutation: boolean, projection_count: number, request_epoch: number, mutation_epoch: number, last_success_at: number | null, last_failure_at: number | null, retry_attempt: number, next_retry_at: number, retry_timer: ReturnType<typeof setTimeout> | null }} */
  const state = {
    generation: 0,
    snapshot: null,
    in_flight: null,
    pending_mutation: false,
    projection_count: 0,
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
    if (state.in_flight !== null) {
      state.projection_count += 1;
      emitTelemetry('generation-join', {
        cause,
        generation: state.generation + 1,
        join: true,
        trailing: state.pending_mutation
      });
      return state.in_flight;
    }

    if (now() < state.next_retry_at) {
      emitTelemetry('generation-backoff', {
        cause,
        generation: state.generation,
        trailing: state.pending_mutation
      });
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
    emitTelemetry('mutation-signal', {
      cause: 'mutation',
      generation: state.generation,
      trailing: true
    });
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
    const generation = state.generation + 1;
    const trailing = cause === 'mutation-trailing';
    const retry_attempt = state.retry_attempt;
    state.projection_count = 1;
    emitTelemetry('generation-start', {
      cause,
      generation,
      trailing,
      retry_attempt
    });
    const work = runGeneration(
      cause,
      request_epoch,
      mutation_epoch,
      generation,
      trailing,
      retry_attempt
    );
    const completion = work.then((result) => {
      if (state.in_flight !== completion) {
        return result;
      }

      if (state.pending_mutation) {
        if (result.ok && !result.stale) {
          state.pending_mutation = false;
          state.in_flight = null;
          return startGeneration('mutation-trailing');
        }
        state.in_flight = null;
        schedulePendingMutationRetry();
        return result;
      }
      state.in_flight = null;
      return result;
    });
    state.in_flight = completion;
    return completion;
  }

  /**
   * @param {string} cause
   * @param {number} request_epoch
   * @param {number} mutation_epoch
   * @param {number} generation
   * @param {boolean} trailing
   * @param {number} retry_attempt
   * @returns {Promise<SnapshotResult>}
   */
  async function runGeneration(
    cause,
    request_epoch,
    mutation_epoch,
    generation,
    trailing,
    retry_attempt
  ) {
    const generation_started_at = now();
    try {
      const [all_result, ready_result] = await Promise.all([
        runCommand('all', ALL_ARGS, cause, generation, trailing, retry_attempt),
        runCommand(
          'ready',
          READY_ARGS,
          cause,
          generation,
          trailing,
          retry_attempt
        )
      ]);
      const all_error = commandError('all', all_result);
      if (all_error !== null) {
        return recordFailure(all_error, {
          cause,
          generation,
          trailing,
          retry_attempt,
          command_duration_ms: elapsedSince(generation_started_at),
          command_exit: commandExit(all_result)
        });
      }
      const ready_error = commandError('ready', ready_result);
      if (ready_error !== null) {
        return recordFailure(ready_error, {
          cause,
          generation,
          trailing,
          retry_attempt,
          command_duration_ms: elapsedSince(generation_started_at),
          command_exit: commandExit(ready_result)
        });
      }

      const raw_all = all_result.stdoutJson;
      const raw_ready = ready_result.stdoutJson;
      if (!Array.isArray(raw_all)) {
        return recordFailure(
          snapshotError('validation', 'bd list returned a non-array payload'),
          {
            cause,
            generation,
            trailing,
            retry_attempt,
            command_duration_ms: elapsedSince(generation_started_at),
            command_exit: 0
          }
        );
      }
      const ready_explain = normalizeReadyExplain(raw_ready);
      if (ready_explain === null) {
        return recordFailure(
          snapshotError(
            'validation',
            'bd ready --explain returned an invalid payload'
          ),
          {
            cause,
            generation,
            trailing,
            retry_attempt,
            command_duration_ms: elapsedSince(generation_started_at),
            command_exit: 0
          }
        );
      }

      const all = normalizeIssueList(raw_all);
      /** @type {Map<string, NormalizedIssue>} */
      const id_index = new Map(all.map((issue) => [issue.id, issue]));
      const validation_error = validateExplainSubjects(ready_explain, id_index);
      if (validation_error !== null) {
        return recordFailure(validation_error, {
          cause,
          generation,
          trailing,
          retry_attempt,
          command_duration_ms: elapsedSince(generation_started_at),
          command_exit: 0
        });
      }

      /** @type {Record<string, unknown>[]} */
      let dependency_edges = [];
      if (dependency_mode === 'legacy-dependency-fallback' && all.length > 0) {
        const dependency_result = await runCommand(
          'dependencies',
          ['dep', 'list', ...all.map((issue) => issue.id), '--json'],
          cause,
          generation,
          trailing,
          retry_attempt
        );
        const dependency_error = commandError(
          'dependencies',
          dependency_result
        );
        if (dependency_error !== null) {
          return recordFailure(dependency_error, {
            cause,
            generation,
            trailing,
            retry_attempt,
            command_duration_ms: elapsedSince(generation_started_at),
            command_exit: commandExit(dependency_result)
          });
        }
        if (!Array.isArray(dependency_result.stdoutJson)) {
          return recordFailure(
            snapshotError(
              'validation',
              'bd dep list returned a non-array payload'
            ),
            {
              cause,
              generation,
              trailing,
              retry_attempt,
              command_duration_ms: elapsedSince(generation_started_at),
              command_exit: 0
            }
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
        command_mode: dependency_mode,
        command_count:
          dependency_mode === 'legacy-dependency-fallback' && all.length > 0
            ? 3
            : 2,
        dependency_edges
      };
      state.generation = snapshot.generation;
      state.snapshot = snapshot;
      state.last_success_at = now();
      state.retry_attempt = 0;
      state.next_retry_at = 0;
      cancelRetryTimer();

      emitTelemetry('generation-complete', {
        cause,
        generation: snapshot.generation,
        trailing,
        retry_attempt,
        command_duration_ms: elapsedSince(generation_started_at),
        command_exit: 0,
        command_count: snapshot.command_count,
        command_mode: snapshot.command_mode
      });

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
        ),
        {
          cause,
          generation,
          trailing,
          retry_attempt,
          command_duration_ms: elapsedSince(generation_started_at),
          command_exit: null
        }
      );
    }
  }

  /**
   * @param {SnapshotError} error
   * @param {{ cause: string, generation: number, trailing: boolean, retry_attempt: number, command_duration_ms: number, command_exit: number | null }} detail
   * @returns {SnapshotResult}
   */
  function recordFailure(error, detail) {
    state.last_failure_at = now();
    state.retry_attempt += 1;
    const delay = Math.min(
      retry_base_ms * 2 ** (state.retry_attempt - 1),
      retry_max_ms
    );
    state.next_retry_at = now() + delay;
    emitTelemetry('generation-failure', {
      ...detail,
      retry_attempt: state.retry_attempt,
      backoff_ms: delay
    });
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
   * Run one named `bd` command and emit only its safe timing and exit data.
   *
   * @param {'all'|'ready'|'dependencies'} command_stage
   * @param {string[]} args
   * @param {string} cause
   * @param {number} generation
   * @param {boolean} trailing
   * @param {number} retry_attempt
   */
  async function runCommand(
    command_stage,
    args,
    cause,
    generation,
    trailing,
    retry_attempt
  ) {
    const command_started_at = now();
    try {
      const result = await runBdJson(args, { cwd });
      emitTelemetry('command-complete', {
        cause,
        generation,
        trailing,
        retry_attempt,
        command_stage,
        command_duration_ms: elapsedSince(command_started_at),
        command_exit: commandExit(result)
      });
      return result;
    } catch (error) {
      emitTelemetry('command-complete', {
        cause,
        generation,
        trailing,
        retry_attempt,
        command_stage,
        command_duration_ms: elapsedSince(command_started_at),
        command_exit: null
      });
      throw error;
    }
  }

  /**
   * Emit an allowlisted telemetry record. Snapshot rows, command arguments,
   * command output, and error messages deliberately never enter this record.
   *
   * @param {string} event
   * @param {Partial<WorkspaceSnapshotTelemetry>} [detail]
   */
  function emitTelemetry(event, detail = {}) {
    /** @type {WorkspaceSnapshotTelemetry} */
    const record = {
      event,
      workspace,
      cause: detail.cause || 'background-subscribe',
      generation: detail.generation ?? state.generation,
      join: detail.join || false,
      trailing: detail.trailing || false,
      retry_attempt: detail.retry_attempt ?? state.retry_attempt,
      backoff_ms: detail.backoff_ms ?? Math.max(0, state.next_retry_at - now()),
      command_duration_ms: detail.command_duration_ms ?? 0,
      command_exit: detail.command_exit ?? null,
      projection_count: detail.projection_count ?? state.projection_count,
      command_count: detail.command_count ?? null,
      command_mode: detail.command_mode ?? null,
      command_stage: detail.command_stage ?? null
    };
    try {
      telemetry(record);
    } catch {
      // Debug telemetry must never change the snapshot delivery path.
    }
  }

  /**
   * @param {number} started_at
   */
  function elapsedSince(started_at) {
    return Math.max(0, now() - started_at);
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
 * @param {WorkspaceSnapshotTelemetry} event
 */
function logTelemetry(event) {
  log('workspace snapshot telemetry %o', event);
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
 * @param {unknown} result
 * @returns {number | null}
 */
function commandExit(result) {
  return isRecord(result) && typeof result.code === 'number'
    ? result.code
    : null;
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
