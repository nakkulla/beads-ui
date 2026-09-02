import { isBdProtocolFailure } from './bd-json.js';
import { runBdJsonProjected as defaultRunBdJsonProjected } from './bd.js';
import { normalizeIssueList } from './list-adapters.js';
import { debug } from './logging.js';

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
/**
 * Snapshot stage to the bd command family whose typed projector owns its shape.
 *
 * @type {Record<string, string>}
 */
const COMMAND_FAMILY_BY_STAGE = {
  all: 'list',
  ready: 'ready-explain',
  dependencies: 'dep'
};
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
 * @property {Map<string, string[]>} blocks_out - issue → the blocker ids it depends on.
 * @property {Map<string, string[]>} blocks_in - issue → the snapshot issues waiting on it.
 * @property {Map<string, Array<{ issue_id: string, type: string }>>} edges_in - issue → all snapshot issues depending on it.
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
 * @param {{ cwd?: string, runBdJsonProjected?: typeof defaultRunBdJsonProjected, now?: () => number, retry_base_ms?: number, retry_max_ms?: number, dependency_mode?: 'embedded-dependencies'|'legacy-dependency-fallback', resolveDependencyMode?: () => Promise<'embedded-dependencies'|'legacy-dependency-fallback'>, setTimeout?: typeof globalThis.setTimeout, clearTimeout?: typeof globalThis.clearTimeout, telemetry?: (event: WorkspaceSnapshotTelemetry) => void }} [options]
 */
export function createWorkspaceSnapshotCoordinator(options = {}) {
  const cwd = options.cwd;
  const runBdJsonProjected =
    options.runBdJsonProjected || defaultRunBdJsonProjected;
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
  const has_explicit_dependency_mode = options.dependency_mode !== undefined;
  /** @type {Promise<'embedded-dependencies'|'legacy-dependency-fallback'> | null} */
  let dependency_mode_promise = null;

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
      const [resolved_dependency_mode, commands] = await Promise.all([
        resolveDependencyMode(),
        Promise.all([
          runCommand(
            'all',
            ALL_ARGS,
            cause,
            generation,
            trailing,
            retry_attempt
          ),
          runCommand(
            'ready',
            READY_ARGS,
            cause,
            generation,
            trailing,
            retry_attempt
          )
        ])
      ]);
      const [all_result, ready_result] = commands;
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

      const raw_all = all_result.ok === true ? all_result.data : null;
      const raw_ready = ready_result.ok === true ? ready_result.data : null;
      if (!Array.isArray(raw_all)) {
        return recordFailure(
          snapshotError(
            'validation',
            'bd list returned a non-array payload',
            true
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
      const ready_explain = normalizeReadyExplain(raw_ready);
      if (ready_explain === null) {
        return recordFailure(
          snapshotError(
            'validation',
            'bd ready --explain returned an invalid payload',
            true
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
      if (
        resolved_dependency_mode === 'legacy-dependency-fallback' &&
        all.length > 0
      ) {
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
        if (
          dependency_result.ok !== true ||
          !Array.isArray(dependency_result.data)
        ) {
          return recordFailure(
            snapshotError(
              'validation',
              'bd dep list returned a non-array payload',
              true
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
        dependency_edges =
          dependency_result.ok === true
            ? dependency_result.data.filter(isRecord)
            : [];
      }

      if (request_epoch !== state.request_epoch) {
        return fencedResult(state.snapshot);
      }

      const blocks_index = buildBlocksIndex(
        all,
        id_index,
        resolved_dependency_mode,
        dependency_edges
      );
      /** @type {WorkspaceSnapshot} */
      const snapshot = {
        generation: state.generation + 1,
        all,
        id_index,
        ready_explain,
        command_mode: resolved_dependency_mode,
        command_count:
          resolved_dependency_mode === 'legacy-dependency-fallback' &&
          all.length > 0
            ? 3
            : 2,
        dependency_edges,
        blocks_out: blocks_index.blocks_out,
        blocks_in: blocks_index.blocks_in,
        edges_in: blocks_index.edges_in
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
   * Resolve the embedded dependency capability once for this coordinator.
   * Explicit test mode preserves deterministic seams when no live resolver is
   * injected by the process runtime.
   *
   * @returns {Promise<'embedded-dependencies'|'legacy-dependency-fallback'>}
   */
  function resolveDependencyMode() {
    if (has_explicit_dependency_mode || !options.resolveDependencyMode) {
      return Promise.resolve(dependency_mode);
    }
    if (dependency_mode_promise === null) {
      try {
        dependency_mode_promise = Promise.resolve(
          options.resolveDependencyMode()
        )
          .then((mode) =>
            mode === 'embedded-dependencies'
              ? 'embedded-dependencies'
              : 'legacy-dependency-fallback'
          )
          .catch(() => 'legacy-dependency-fallback');
      } catch {
        dependency_mode_promise = Promise.resolve('legacy-dependency-fallback');
      }
    }
    return dependency_mode_promise;
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
    // A protocol fault never degrades to a stale success: serving the previous
    // generation would report a compatibility break as ordinary staleness and
    // let effect gates keep running on data this build can no longer read.
    if (state.snapshot === null || error.protocol_failure === true) {
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
    const command_family = COMMAND_FAMILY_BY_STAGE[command_stage];
    try {
      const result = await runBdJsonProjected(command_family, args, { cwd });
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
 * Derive dependency adjacency indexes once per generation (UI-d13v §3.2).
 *
 * Both dependency modes carry the SAME edge shape — embedded mode hangs it off
 * each issue as `dependencies`, the legacy fallback returns the identical
 * records from `bd dep list` — so one walk covers both and the projections
 * never re-scan the edges themselves.
 *
 * `blocks_in` is keyed by the blocker and holds only waiters this snapshot
 * knows: an issue in another rig waiting on this one lives in that rig's DB and
 * is invisible from here (UI-d13v §3.5 reads those through a peek instead).
 *
 * @param {NormalizedIssue[]} all
 * @param {Map<string, NormalizedIssue>} id_index
 * @param {'embedded-dependencies'|'legacy-dependency-fallback'} command_mode
 * @param {Record<string, unknown>[]} dependency_edges
 * @returns {{ blocks_out: Map<string, string[]>, blocks_in: Map<string, string[]>, edges_in: Map<string, Array<{ issue_id: string, type: string }>> }}
 */
function buildBlocksIndex(all, id_index, command_mode, dependency_edges) {
  /** @type {Map<string, string[]>} */
  const blocks_out = new Map();
  /** @type {Map<string, string[]>} */
  const blocks_in = new Map();
  /** @type {Map<string, Array<{ issue_id: string, type: string }>>} */
  const edges_in = new Map();
  const edges =
    command_mode === 'embedded-dependencies'
      ? embeddedDependencyEdges(all)
      : legacyDependencyEdges(dependency_edges);
  for (const [issue_id, depends_on_id, type] of edges) {
    if (type === 'blocks') {
      appendUnique(blocks_out, issue_id, depends_on_id);
    }
    if (id_index.has(issue_id)) {
      appendEdge(edges_in, depends_on_id, { issue_id, type });
      if (type === 'blocks') {
        appendUnique(blocks_in, depends_on_id, issue_id);
      }
    }
  }
  return { blocks_out, blocks_in, edges_in };
}

/**
 * @param {NormalizedIssue[]} all
 * @returns {Array<[string, string, string]>}
 */
function embeddedDependencyEdges(all) {
  /** @type {Array<[string, string, string]>} */
  const edges = [];
  for (const issue of all) {
    if (!Array.isArray(issue.dependencies)) {
      continue;
    }
    for (const edge of issue.dependencies) {
      // The embedded record repeats its owner as `issue_id`; a build that omits
      // it still names the issue the array hangs off.
      const pair = dependencyEdgeTuple(edge, issue.id);
      if (pair !== null) {
        edges.push(pair);
      }
    }
  }
  return edges;
}

/**
 * @param {Record<string, unknown>[]} dependency_edges
 * @returns {Array<[string, string, string]>}
 */
function legacyDependencyEdges(dependency_edges) {
  /** @type {Array<[string, string, string]>} */
  const edges = [];
  for (const edge of dependency_edges) {
    const pair = dependencyEdgeTuple(edge, null);
    if (pair !== null) {
      edges.push(pair);
    }
  }
  return edges;
}

/**
 * @param {unknown} edge
 * @param {string | null} owner_id - Issue the edge hangs off, when known.
 * @returns {[string, string, string] | null}
 */
function dependencyEdgeTuple(edge, owner_id) {
  if (!isRecord(edge)) {
    return null;
  }
  const issue_id = nonEmptyString(edge.issue_id) ?? owner_id;
  const depends_on_id = nonEmptyString(edge.depends_on_id);
  const type = nonEmptyString(edge.type);
  if (issue_id === null || depends_on_id === null || type === null) {
    return null;
  }
  return [issue_id, depends_on_id, type];
}

/**
 * Append one reverse edge while preserving source order and exact edge identity.
 *
 * @param {Map<string, Array<{ issue_id: string, type: string }>>} index
 * @param {string} key
 * @param {{ issue_id: string, type: string }} value
 */
function appendEdge(index, key, value) {
  const current = index.get(key);
  if (current) {
    if (
      !current.some(
        (edge) => edge.issue_id === value.issue_id && edge.type === value.type
      )
    ) {
      current.push(value);
    }
    return;
  }
  index.set(key, [value]);
}

/**
 * @param {Map<string, string[]>} index
 * @param {string} key
 * @param {string} value
 */
function appendUnique(index, key, value) {
  const current = index.get(key);
  if (!current) {
    index.set(key, [value]);
    return;
  }
  if (!current.includes(value)) {
    current.push(value);
  }
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function nonEmptyString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @param {WorkspaceSnapshotTelemetry} event
 */
function logTelemetry(event) {
  log('workspace snapshot telemetry %o', event);
}

/**
 * @typedef {{ code: 'workspace_snapshot_error', stage: string, message: string, protocol_failure?: boolean, details?: Record<string, unknown> }} SnapshotError
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
  if (!isRecord(result) || result.ok !== true) {
    const error = isRecord(result) ? result.error : null;
    return snapshotError(
      stage,
      isRecord(error) && typeof error.code === 'string'
        ? String(error.code)
        : `bd ${stage} failed`,
      isBdProtocolFailure(result)
    );
  }
  return null;
}

/**
 * @param {unknown} result
 * @returns {number | null}
 */
function commandExit(result) {
  if (!isRecord(result)) {
    return null;
  }
  if (result.ok === true) {
    return 0;
  }
  // The discriminated result carries bd's own exit code in its bounded details,
  // so telemetry keeps reporting the process exit rather than a flattened 1.
  const error = isRecord(result.error) ? result.error : null;
  const details = error && isRecord(error.details) ? error.details : null;
  return details && typeof details.exit_code === 'number'
    ? details.exit_code
    : null;
}

/**
 * @param {string} stage
 * @param {string} message
 * @returns {SnapshotError}
 */
function snapshotError(stage, message, protocol_failure = false) {
  return {
    code: 'workspace_snapshot_error',
    stage,
    message,
    ...(protocol_failure ? { protocol_failure: true } : {})
  };
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
