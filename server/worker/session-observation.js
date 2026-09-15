/**
 * Shared observation of direct local conversations.
 *
 * The store owns one snapshot+tail reader per transcript file and fans its
 * projection out to every card that references that file. Raw records stay on
 * the server; callers receive only model, usage and delegation facts.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { accumulateCodexChildren } from './codex-children/accumulate.js';
import {
  codexSessionsRootFor,
  createIncrementalCodexChildObserver,
  readCodexChildRecords
} from './codex-children/reader.js';
import {
  createCodexResponseLedger,
  registerCodexResponseRecord
} from './codex-children/response-ledger.js';
import { normalizeCodexChildUsage } from './codex-children/rollout.js';
import { codexRolloutFilePath } from './codex-effort-observer.js';
import { createDelegationStore } from './delegation-store.js';
import {
  liftUsage as liftClaudeUsage,
  liftDelegation
} from './runner/claude.js';
import { createTailReader } from './runner/tail-reader.js';
import { readSessionSnapshot, uuidV7StartedAt } from './session-ref.js';
import { createUsageStore } from './usage-store.js';

/** Prepared asynchronous observations consumed by synchronous queue projection. */
/** @param {{ createReader?: typeof createTailReader, readSnapshot?: typeof readSessionSnapshot, sessionsRootFor?: (attempt: any) => string, historicalTtlMs?: number }} [options] */
export function createWorkerSessionObservationStore(options = {}) {
  /** @type {Map<string, Record<string, any>>} */
  const values = new Map();
  /** @type {Map<string, any>} */
  const observers = new Map();
  /** @type {Map<string, Promise<Record<string, any>|null>>} */
  const historical_preparations = new Map();
  /** @type {Set<string>} */
  const historical_keys = new Set();
  /** @type {Set<string>} */
  const historical_completed = new Set();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const historical_expiry = new Map();
  let clear_generation = 0;
  /** @type {Map<string, number>} */
  const workspace_generations = new Map();
  const make_reader = options.createReader || createTailReader;
  const read_snapshot = options.readSnapshot || readSessionSnapshot;
  /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. */
  const keyOf = (workspace, attempt_id) =>
    `${path.resolve(workspace)}\0${attempt_id}`;
  /** @param {any} attempt - Bounded ended attempt. */
  function readBoundedAttempt(attempt) {
    const sessions_root = options.sessionsRootFor
      ? options.sessionsRootFor(attempt)
      : codexSessionsRootFor(attempt);
    const observed = readCodexChildRecords({
      root_thread_id: attempt.session_id,
      sessions_root,
      started_at: attempt.started_at ?? null,
      ended_at: attempt.finished_at ?? null
    });
    if (observed.root_file === null) {
      return null;
    }
    const response_ledger = createCodexResponseLedger();
    for (const entry of observed.records) {
      const at =
        typeof entry.record.timestamp === 'string'
          ? Date.parse(entry.record.timestamp)
          : NaN;
      if (
        !Number.isFinite(at) ||
        (Number.isFinite(attempt.started_at) && at < attempt.started_at) ||
        (Number.isFinite(attempt.finished_at) && at >= attempt.finished_at)
      ) {
        continue;
      }
      registerCodexResponseRecord(
        response_ledger,
        entry.thread_id,
        entry.record
      );
    }
    const root_records = observed.records
      .filter((entry) => entry.thread_id === attempt.session_id)
      .map((entry) => entry.record);
    const usage_segments = /** @type {Array<Record<string, any>>} */ (
      foldCodexAttemptUsage(
        root_records,
        Number.isFinite(attempt.started_at) ? attempt.started_at : null,
        Number.isFinite(attempt.finished_at) ? attempt.finished_at : null,
        response_ledger,
        attempt.session_id
      )
    );
    const usage = sumUsage(
      usage_segments.map((/** @type {any} */ leg) => leg.usage)
    );
    const codex_children = accumulateCodexChildren({
      root_thread_id: attempt.session_id,
      records: observed.records,
      attempt_started_at: attempt.started_at ?? null,
      attempt_ended_at: attempt.finished_at ?? null,
      parent_terminated: true,
      responseLedger: response_ledger
    });
    const merged_children = mergeHistoricalChildren(
      Array.isArray(attempt.codex_children) ? attempt.codex_children : [],
      codex_children
    );
    return {
      usage:
        usage_segments.length > 0 || !attempt.usage ? usage : attempt.usage,
      usage_segments:
        usage_segments.length > 0 || !Array.isArray(attempt.usage_segments)
          ? usage_segments
          : attempt.usage_segments,
      codex_children:
        merged_children.length > 0 || !Array.isArray(attempt.codex_children)
          ? merged_children
          : attempt.codex_children
    };
  }
  const api = {
    /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. @param {Record<string, any>} value - Observation. */
    set(workspace, attempt_id, value) {
      const key = keyOf(workspace, attempt_id);
      values.set(key, { ...(values.get(key) || {}), ...value });
    },
    /**
     * Prepare or refresh the root rollout observer.

     * @param {string} workspace - Workspace root containing the attempt.
     * @param {any} attempt - Codex attempt.
     * @param {{ parent_terminated?: boolean }} [observation_options] - Terminal observation state.
     */
    observe(workspace, attempt, observation_options = {}) {
      if (
        attempt?.runner !== 'codex' ||
        typeof attempt.session_id !== 'string'
      ) {
        return null;
      }
      const key = keyOf(workspace, attempt.attempt_id);
      if (observation_options.parent_terminated !== true) {
        clearTimeout(historical_expiry.get(key));
        historical_expiry.delete(key);
        historical_keys.delete(key);
        historical_completed.delete(key);
      }
      if (
        observation_options.parent_terminated === true &&
        Number.isFinite(attempt.finished_at)
      ) {
        const held = observers.get(key);
        held?.reader.stop?.();
        held?.children.stop();
        observers.delete(key);
        const bounded = readBoundedAttempt(attempt);
        if (bounded) {
          values.set(key, { ...(values.get(key) || {}), ...bounded });
        }
        return bounded;
      }
      let held = observers.get(key);
      if (!held) {
        const sessions_root = options.sessionsRootFor
          ? options.sessionsRootFor(attempt)
          : codexSessionsRootFor(attempt);
        const file = codexRolloutFilePath({
          session_id: attempt.session_id,
          started_at:
            uuidV7StartedAt(attempt.session_id) ??
            (Number.isFinite(attempt.started_at) ? attempt.started_at : null),
          fs,
          home_dir: os.homedir(),
          sessions_root
        });
        if (!file) {
          return null;
        }
        const snapshot = read_snapshot(file);
        if (!snapshot) {
          return null;
        }
        const response_ledger = createCodexResponseLedger();
        const current = createCodexAccumulator(
          response_ledger,
          attempt.session_id
        );
        const baseline = createCodexAccumulator(
          response_ledger,
          attempt.session_id
        );
        /** @param {Record<string, any>} record */
        const apply = (record) => {
          held.current.apply(record);
          const at =
            typeof record.timestamp === 'string'
              ? Date.parse(record.timestamp)
              : NaN;
          if (record.type === 'token_usage_record' && !Number.isFinite(at)) {
            held.boundary_unproven = true;
          } else if (
            Number.isFinite(attempt.started_at) &&
            at < attempt.started_at
          ) {
            held.baseline.apply(record);
          }
        };
        held = {
          file,
          current,
          baseline,
          apply,
          boundary_unproven: false,
          response_ledger,
          reader: null,
          children: createIncrementalCodexChildObserver({
            root_thread_id: attempt.session_id,
            root_file: file,
            sessions_root,
            started_at: attempt.started_at,
            ended_at: attempt.finished_at,
            responseLedger: response_ledger,
            createReader: make_reader,
            readSnapshot: read_snapshot
          })
        };
        for (const line of snapshot.text.split(/\r?\n/)) {
          if (!line) {
            continue;
          }
          try {
            const record = objectOf(JSON.parse(line));
            if (record) {
              apply(record);
              held.children.applyRoot(record);
            }
          } catch {
            // Invalid complete records contribute no invented observation.
          }
        }
        held.reader = make_reader({
          file,
          start_offset: snapshot.boundary,
          /** @param {string} line */
          onLine(line) {
            try {
              const record = objectOf(JSON.parse(line));
              if (record) {
                apply(record);
                held.children.applyRoot(record);
              }
            } catch {
              // Invalid complete records contribute no invented observation.
            }
          },
          onReset() {
            held.response_ledger.resetThread(attempt.session_id);
            held.current = createCodexAccumulator(
              held.response_ledger,
              attempt.session_id
            );
            held.baseline = createCodexAccumulator(
              held.response_ledger,
              attempt.session_id
            );
            held.boundary_unproven = false;
            held.children.resetRoot();
          }
        });
        held.reader.start();
        observers.set(key, held);
      } else {
        held.reader.pump?.();
      }
      held.children.scan();
      const current = held.current.snapshot();
      /** @type {Map<string, Record<string, any>>} */
      const prior = new Map(
        held.baseline
          .snapshot()
          .usage_legs.map((/** @type {any} */ leg) => [
            `${leg.turn_id}\0${leg.model}`,
            leg.usage
          ])
      );
      const usage_segments = current.usage_legs.flatMap(
        (/** @type {any} */ leg) => {
          if (
            leg.partial === true &&
            !Object.values(leg.usage || {}).some((value) =>
              Number.isFinite(value)
            )
          ) {
            return [
              {
                ...leg,
                ...(leg.scope_id
                  ? {
                      scope_id: attemptScopeId(
                        leg.scope_id,
                        attempt.started_at,
                        attempt.finished_at
                      )
                    }
                  : {})
              }
            ];
          }
          const old = prior.get(`${leg.turn_id}\0${leg.model}`);
          if (!old) {
            return [
              {
                ...leg,
                ...(leg.scope_id
                  ? {
                      scope_id: attemptScopeId(
                        leg.scope_id,
                        attempt.started_at,
                        attempt.finished_at
                      )
                    }
                  : {}),
                ...(Number.isFinite(attempt.started_at)
                  ? {
                      observed_from: Math.max(
                        Number.isFinite(leg.observed_from)
                          ? leg.observed_from
                          : attempt.started_at,
                        attempt.started_at
                      )
                    }
                  : {}),
                ...(held.boundary_unproven
                  ? {
                      partial: true,
                      partial_reasons: ['attempt_boundary_unproven']
                    }
                  : {})
              }
            ];
          }
          /** @type {Record<string, number>} */
          const usage = {};
          for (const [field, value] of Object.entries(leg.usage)) {
            usage[field] = Math.max(0, Number(value) - Number(old[field] || 0));
          }
          return Object.values(usage).some((value) => value > 0)
            ? [
                {
                  ...leg,
                  usage,
                  ...(leg.scope_id
                    ? {
                        scope_id: attemptScopeId(
                          leg.scope_id,
                          attempt.started_at,
                          attempt.finished_at
                        )
                      }
                    : {}),
                  observed_from: attempt.started_at,
                  ...(held.boundary_unproven
                    ? {
                        partial: true,
                        partial_reasons: ['attempt_boundary_unproven']
                      }
                    : {})
                }
              ]
            : [];
        }
      );
      const usage = sumUsage(
        usage_segments.map((/** @type {any} */ leg) => leg.usage)
      );
      const observed_children = held.children.snapshot(
        observation_options.parent_terminated === true
      );
      const has_observed_usage = usage_segments.length > 0;
      const value = {
        ...(values.get(key) || {}),
        usage: has_observed_usage || !attempt.usage ? usage : attempt.usage,
        usage_segments:
          has_observed_usage || !Array.isArray(attempt.usage_segments)
            ? usage_segments
            : attempt.usage_segments,
        codex_children:
          observed_children.length > 0 || !Array.isArray(attempt.codex_children)
            ? observed_children
            : attempt.codex_children
      };
      values.set(key, value);
      return value;
    },
    /**
     * Read one ended rollout asynchronously and retain only its bounded
     * projection. Concurrent detail, compare and queue consumers share the
     * same preparation; the temporary readers are released when it settles.
     *
     * @param {string} workspace - Workspace root containing the attempt.
     * @param {any} attempt - Ended Codex attempt.
     * @returns {Promise<Record<string, any>|null>|null}
     */
    prepareHistorical(workspace, attempt) {
      if (
        attempt?.runner !== 'codex' ||
        attempt.status === 'running' ||
        typeof attempt.session_id !== 'string'
      ) {
        return null;
      }
      const key = keyOf(workspace, attempt.attempt_id);
      if (historical_completed.has(key)) {
        return null;
      }
      const pending = historical_preparations.get(key);
      if (pending) {
        return pending;
      }
      const resolved_workspace = path.resolve(workspace);
      const generation = workspace_generations.get(resolved_workspace) || 0;
      const global_generation = clear_generation;
      /** @type {Promise<Record<string, any>|null>} */
      let preparation;
      preparation = Promise.resolve()
        .then(() => readBoundedAttempt(attempt))
        .then((value) => {
          if (
            global_generation !== clear_generation ||
            generation !==
              (workspace_generations.get(resolved_workspace) || 0) ||
            historical_preparations.get(key) !== preparation
          ) {
            return null;
          }
          if (observers.has(key)) {
            return value;
          }
          historical_completed.add(key);
          if (value) {
            historical_keys.add(key);
            values.set(key, { ...(values.get(key) || {}), ...value });
          }
          if (Number.isFinite(attempt.finished_at)) {
            return value;
          }
          const timer = setTimeout(
            () => {
              if (historical_expiry.get(key) !== timer) {
                return;
              }
              if (!observers.has(key)) {
                historical_completed.delete(key);
              }
              historical_expiry.delete(key);
            },
            Number.isFinite(options.historicalTtlMs)
              ? options.historicalTtlMs
              : 60_000
          );
          timer.unref?.();
          historical_expiry.set(key, timer);
          return value;
        })
        .finally(() => {
          if (historical_preparations.get(key) === preparation) {
            historical_preparations.delete(key);
          }
        });
      historical_preparations.set(key, preparation);
      return preparation;
    },
    /**
     * Release historical entries that have left this workspace's queue.
     *
     * @param {string} workspace - Workspace root.
     * @param {Set<string>} live_attempt_ids - Attempts still in the queue.
     */
    pruneHistorical(workspace, live_attempt_ids) {
      const prefix = `${path.resolve(workspace)}\0`;
      const keys = new Set([
        ...historical_keys,
        ...historical_completed,
        ...historical_expiry.keys(),
        ...historical_preparations.keys(),
        ...values.keys()
      ]);
      for (const key of keys) {
        if (
          !key.startsWith(prefix) ||
          live_attempt_ids.has(key.slice(prefix.length)) ||
          observers.has(key)
        ) {
          continue;
        }
        historical_keys.delete(key);
        historical_completed.delete(key);
        historical_preparations.delete(key);
        clearTimeout(historical_expiry.get(key));
        historical_expiry.delete(key);
        values.delete(key);
      }
    },
    /** @param {string} workspace - Workspace whose last card subscriber left. */
    releaseHistorical(workspace) {
      const resolved_workspace = path.resolve(workspace);
      workspace_generations.set(
        resolved_workspace,
        (workspace_generations.get(resolved_workspace) || 0) + 1
      );
      const prefix = `${resolved_workspace}\0`;
      for (const key of historical_keys) {
        if (!key.startsWith(prefix)) {
          continue;
        }
        historical_keys.delete(key);
        historical_completed.delete(key);
        values.delete(key);
        clearTimeout(historical_expiry.get(key));
        historical_expiry.delete(key);
      }
      for (const key of historical_completed) {
        if (key.startsWith(prefix)) {
          historical_completed.delete(key);
          clearTimeout(historical_expiry.get(key));
          historical_expiry.delete(key);
        }
      }
    },
    /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. */
    drain(workspace, attempt_id) {
      const held = observers.get(keyOf(workspace, attempt_id));
      held?.reader.drain?.({ flush: false });
      held?.children.drain();
    },
    /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. */
    get(workspace, attempt_id) {
      return values.get(keyOf(workspace, attempt_id)) ?? null;
    },
    /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. */
    delete(workspace, attempt_id) {
      const key = keyOf(workspace, attempt_id);
      observers.get(key)?.reader.stop?.();
      observers.get(key)?.children.stop();
      observers.delete(key);
      historical_keys.delete(key);
      historical_completed.delete(key);
      clearTimeout(historical_expiry.get(key));
      historical_expiry.delete(key);
      values.delete(key);
    },
    clear() {
      clear_generation += 1;
      workspace_generations.clear();
      for (const held of observers.values()) {
        held.reader.stop?.();
        held.children.stop();
      }
      observers.clear();
      historical_preparations.clear();
      historical_keys.clear();
      historical_completed.clear();
      for (const timer of historical_expiry.values()) {
        clearTimeout(timer);
      }
      historical_expiry.clear();
      values.clear();
    }
  };
  return api;
}

/** @param {Record<string, any>|null|undefined} child */
function childHasDirectUsage(child) {
  if (
    Array.isArray(child?.usage_segments) &&
    child.usage_segments.some((segment) =>
      Object.values(segment?.usage || {}).some((value) =>
        Number.isFinite(value)
      )
    )
  ) {
    return true;
  }
  return Object.values(child?.usage || {}).some((value) =>
    Number.isFinite(value)
  );
}

/**
 * Refresh historical children by thread without erasing stored direct evidence
 * when one linked rollout disappeared or was truncated before its usage rows.
 *
 * @param {Array<Record<string, any>>} saved_children
 * @param {Array<Record<string, any>>} observed_children
 */
function mergeHistoricalChildren(saved_children, observed_children) {
  const observed_by_thread = new Map(
    observed_children.map((child) => [child.thread_id, child])
  );
  /** @type {Array<Record<string, any>>} */
  const merged = [];
  for (const saved of saved_children) {
    const observed = observed_by_thread.get(saved.thread_id);
    observed_by_thread.delete(saved.thread_id);
    if (!observed) {
      merged.push({
        ...saved,
        usage_partial: true,
        usage_partial_reasons: [
          ...new Set([
            ...(Array.isArray(saved.usage_partial_reasons)
              ? saved.usage_partial_reasons
              : []),
            'usage_missing'
          ])
        ]
      });
      continue;
    }
    if (childHasDirectUsage(observed) || !childHasDirectUsage(saved)) {
      merged.push(observed);
      continue;
    }
    merged.push({
      ...saved,
      ...observed,
      usage: saved.usage,
      usage_segments: saved.usage_segments,
      usage_partial: true,
      usage_partial_reasons: [
        ...new Set([
          ...(Array.isArray(saved.usage_partial_reasons)
            ? saved.usage_partial_reasons
            : []),
          ...(Array.isArray(observed.usage_partial_reasons)
            ? observed.usage_partial_reasons
            : []),
          'usage_missing'
        ])
      ]
    });
  }
  merged.push(...observed_by_thread.values());
  return merged;
}

/** @param {unknown} value */
function objectOf(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, any>} */ (value)
    : null;
}

/** @param {unknown} raw */
function codexUsage(raw) {
  const usage = normalizeCodexChildUsage(raw);
  if (!usage) {
    return null;
  }
  return {
    ...(Number.isFinite(usage.input_tokens)
      ? { input_tokens: usage.input_tokens }
      : {}),
    ...(Number.isFinite(usage.cached_input_tokens)
      ? { cache_read_input_tokens: usage.cached_input_tokens }
      : {}),
    ...(Number.isFinite(usage.cache_write_input_tokens)
      ? { cache_creation_input_tokens: usage.cache_write_input_tokens }
      : {}),
    ...(Number.isFinite(usage.output_tokens)
      ? { output_tokens: usage.output_tokens }
      : {}),
    ...(Number.isFinite(usage.reasoning_output_tokens)
      ? { reasoning_output_tokens: usage.reasoning_output_tokens }
      : {}),
    ...(Number.isFinite(usage.total_tokens)
      ? { total_tokens: usage.total_tokens }
      : {})
  };
}

/** @param {any} message - Claude assistant message. */
function claudeMessageUsage(message) {
  if (!message?.usage || typeof message.usage !== 'object') {
    return null;
  }
  /** @type {Record<string, number|string>} */
  const usage = {};
  if (typeof message.id === 'string') {
    usage.message_id = message.id;
  }
  for (const field of [
    'input_tokens',
    'output_tokens',
    'cache_read_input_tokens',
    'cache_creation_input_tokens'
  ]) {
    const value = message.usage[field];
    if (typeof value === 'number' && Number.isFinite(value)) {
      usage[field] = value;
    }
  }
  return Object.keys(usage).some((field) => field !== 'message_id')
    ? usage
    : null;
}

/**
 * @param {ReturnType<typeof createCodexResponseLedger>} [response_ledger]
 * @param {string|null} [source_thread_id]
 */
function createCodexAccumulator(
  response_ledger = createCodexResponseLedger(),
  source_thread_id = null
) {
  /** @type {string|null} */
  let session_id = null;
  /** @type {string|null} */
  let current_turn = null;
  /** @type {string|null} */
  let current_model = null;
  /** @type {Map<string, string|null>} */
  const turn_models = new Map();
  /** @type {Map<string, Record<string, number>>} */
  const turns = new Map();
  /** @type {Map<string, { usage: Record<string, number>, turn_id: string|null, model: string|null, at: number|null, owner: string|null }>} */
  const responses = new Map();
  /** @type {Record<string, number>|null} */
  let thread_usage = null;
  /** @param {Record<string, any>} record */
  function apply(record) {
    const payload = objectOf(record.payload);
    if (record.type === 'session_meta' && payload) {
      if (
        typeof payload.parent_thread_id !== 'string' &&
        typeof payload.id === 'string'
      ) {
        session_id = payload.id;
      }
      return;
    }
    if (record.type === 'turn_context' && payload) {
      current_turn =
        typeof payload.turn_id === 'string' ? payload.turn_id : current_turn;
      current_model =
        typeof payload.model === 'string' ? payload.model : current_model;
      if (current_turn) {
        turn_models.set(current_turn, current_model);
      }
      return;
    }
    if (record.type === 'event_msg' && payload?.type === 'task_started') {
      current_turn =
        typeof payload.turn_id === 'string' ? payload.turn_id : current_turn;
      return;
    }
    if (record.type === 'token_usage_record' && payload) {
      const response_id = registerCodexResponseRecord(
        response_ledger,
        source_thread_id || session_id || 'unknown',
        record
      );
      if (
        session_id &&
        typeof payload.thread_id === 'string' &&
        payload.thread_id !== session_id
      ) {
        return;
      }
      const turn_id =
        typeof payload.turn_id === 'string' ? payload.turn_id : current_turn;
      const direct_usage = codexUsage(payload.usage);
      if (response_id && direct_usage && !responses.has(response_id)) {
        const owner =
          typeof payload.thread_id === 'string'
            ? payload.thread_id
            : session_id;
        const at =
          typeof record.timestamp === 'string'
            ? Date.parse(record.timestamp)
            : NaN;
        responses.set(response_id, {
          usage: direct_usage,
          turn_id,
          model: turn_id
            ? (turn_models.get(turn_id) ?? current_model)
            : current_model,
          at: Number.isFinite(at) ? at : null,
          owner
        });
      }
      const turn_usage = codexUsage(payload.turn_token_usage ?? payload.usage);
      if (turn_id && turn_usage) {
        turns.set(turn_id, turn_usage);
      }
      thread_usage = codexUsage(payload.thread_token_usage) ?? thread_usage;
      return;
    }
    if (record.type === 'event_msg' && payload?.type === 'token_count') {
      const info = objectOf(payload.info);
      thread_usage = codexUsage(info?.total_token_usage) ?? thread_usage;
      return;
    }
    if (record.type === 'turn.completed') {
      const completed = codexUsage(record.usage);
      if (completed) {
        thread_usage = completed;
      }
    }
  }
  function snapshot() {
    /** @type {Array<Record<string, any>>} */
    const usage_legs = [];
    const has_response_conflict = response_ledger.hasConflictFor(
      source_thread_id || session_id || 'unknown'
    );
    if (responses.size > 0 || has_response_conflict) {
      const grouped = new Map();
      for (const [response_id, response] of responses) {
        if (!response_ledger.isValid(response_id)) {
          continue;
        }
        const key = `${response.turn_id || 'unknown'}\0${response.model || 'unknown'}`;
        let segment = grouped.get(key);
        if (!segment) {
          segment = {
            provider: 'codex',
            role: 'orchestrator',
            attempt_id: `session:${session_id || 'unknown'}`,
            scope_id: `thread:${session_id || 'unknown'}:turn:${response.turn_id || 'unknown'}:model:${response.model || 'unknown'}`,
            turn_id: response.turn_id,
            model: response.model,
            usage: {},
            observed_from: response.at,
            observed_through: response.at
          };
          grouped.set(key, segment);
        }
        for (const [field, value] of Object.entries(response.usage)) {
          if (field !== 'total_tokens' && Number.isFinite(value)) {
            segment.usage[field] = (segment.usage[field] || 0) + value;
          }
        }
        if (response.at !== null) {
          segment.observed_from =
            segment.observed_from === null
              ? response.at
              : Math.min(segment.observed_from, response.at);
          segment.observed_through =
            segment.observed_through === null
              ? response.at
              : Math.max(segment.observed_through, response.at);
        }
      }
      usage_legs.push(...grouped.values());
      if (has_response_conflict) {
        usage_legs.push({
          provider: 'codex',
          role: 'orchestrator',
          attempt_id: `session:${session_id || 'unknown'}`,
          scope_id: `thread:${session_id || 'unknown'}:conflict`,
          turn_id: 'unattributed',
          model: null,
          usage: {},
          partial: true,
          partial_reasons: ['response_conflict']
        });
      }
    } else {
      for (const [turn_id, usage] of turns) {
        usage_legs.push({
          provider: 'codex',
          role: 'orchestrator',
          attempt_id: `session:${session_id || 'unknown'}`,
          turn_id,
          model: turn_models.get(turn_id) ?? null,
          usage
        });
      }
    }
    if (thread_usage && !has_response_conflict) {
      /** @type {Record<string, number>} */
      const summed = {};
      for (const leg of usage_legs) {
        for (const [field, value] of Object.entries(leg.usage)) {
          summed[field] = (summed[field] || 0) + value;
        }
      }
      /** @type {Record<string, number>} */
      const residual = {};
      for (const [field, value] of Object.entries(thread_usage)) {
        if (field === 'total_tokens') {
          continue;
        }
        residual[field] = Math.max(0, value - (summed[field] || 0));
      }
      if (Object.values(residual).some((value) => value > 0)) {
        usage_legs.push({
          provider: 'codex',
          role: 'orchestrator',
          attempt_id: `session:${session_id || 'unknown'}`,
          turn_id: 'unattributed',
          model: null,
          usage: responses.size > 0 ? {} : residual,
          partial: true,
          partial_reasons:
            responses.size > 0
              ? ['cumulative_gap']
              : ['attempt_boundary_unproven']
        });
      }
    }
    const usage =
      responses.size > 0 || has_response_conflict
        ? sumUsage(usage_legs.map((leg) => leg.usage))
        : (thread_usage ?? sumUsage(usage_legs.map((leg) => leg.usage)));
    if (
      usage &&
      Number.isFinite(usage.input_tokens) &&
      Number.isFinite(usage.output_tokens)
    ) {
      usage.total_tokens = usage.input_tokens + usage.output_tokens;
    }
    return { session_id, model: current_model, usage, usage_legs };
  }
  return { apply, snapshot };
}

/** @param {Array<Record<string, number>>} rows */
function sumUsage(rows) {
  /** @type {Record<string, number>} */
  const total = {};
  for (const row of rows) {
    for (const [field, value] of Object.entries(row)) {
      if (field !== 'message_id' && Number.isFinite(value)) {
        total[field] = (total[field] || 0) + Number(value);
      }
    }
  }
  return Object.keys(total).length > 0 ? total : null;
}

/**
 * @param {Array<Record<string, any>>} records
 * @param {ReturnType<typeof createCodexResponseLedger>} [response_ledger]
 * @param {string|null} [source_thread_id]
 */
function foldCodex(records, response_ledger, source_thread_id) {
  const accumulator = createCodexAccumulator(response_ledger, source_thread_id);
  for (const record of records) {
    accumulator.apply(record);
  }
  return accumulator.snapshot();
}

/**
 * Read the root rollout at an attempt boundary and return turn/model segments.
 * Thread totals are deliberately not copied across a resumed attempt.
 *
 * @param {{ runner?: string|null, session_id?: string|null, started_at?: number|null, finished_at?: number|null, codex_account?: string|null }} attempt - Worker attempt.
 */
export function observeCodexRootUsage(attempt) {
  if (
    attempt?.runner !== 'codex' ||
    typeof attempt.session_id !== 'string' ||
    attempt.session_id.length === 0
  ) {
    return [];
  }
  const started_at =
    typeof attempt.started_at === 'number' &&
    Number.isFinite(attempt.started_at)
      ? attempt.started_at
      : null;
  const { records } = readCodexChildRecords({
    root_thread_id: attempt.session_id,
    sessions_root: codexSessionsRootFor(attempt),
    started_at,
    ended_at: attempt.finished_at ?? null
  });
  const ended_at =
    typeof attempt.finished_at === 'number' &&
    Number.isFinite(attempt.finished_at)
      ? attempt.finished_at
      : null;
  const root_records = records
    .filter((entry) => entry.thread_id === attempt.session_id)
    .map((entry) => entry.record);
  const response_ledger = createCodexResponseLedger();
  for (const entry of records) {
    const at =
      typeof entry.record.timestamp === 'string'
        ? Date.parse(entry.record.timestamp)
        : NaN;
    if (
      !Number.isFinite(at) ||
      (started_at !== null && at < started_at) ||
      (ended_at !== null && at >= ended_at)
    ) {
      continue;
    }
    registerCodexResponseRecord(response_ledger, entry.thread_id, entry.record);
  }
  return foldCodexAttemptUsage(
    root_records,
    started_at,
    ended_at,
    response_ledger,
    attempt.session_id
  );
}

/**
 * Apply one Worker attempt's time boundary to cumulative Codex turn records.
 *
 * @param {Array<Record<string, any>>} records - Root rollout records.
 * @param {number|null} started_at - Attempt start in milliseconds.
 * @param {number|null} ended_at - Attempt end in milliseconds.
 * @param {ReturnType<typeof createCodexResponseLedger>} [response_ledger] - Shared owner ledger.
 * @param {string|null} [source_thread_id] - Rollout file owner.
 */
export function foldCodexAttemptUsage(
  records,
  started_at,
  ended_at,
  response_ledger = createCodexResponseLedger(),
  source_thread_id = null
) {
  const resolved_source_thread_id =
    source_thread_id ||
    records
      .map((record) => objectOf(record.payload))
      .find(
        (payload, index) =>
          records[index]?.type === 'session_meta' &&
          typeof payload?.id === 'string'
      )?.id ||
    null;
  const boundary_unproven = records.some((record) => {
    if (record.type !== 'token_usage_record') {
      return false;
    }
    if (typeof record.timestamp !== 'string') {
      return true;
    }
    return !Number.isFinite(Date.parse(record.timestamp));
  });
  const in_window = records.filter((record) => {
    if (ended_at === null || typeof record.timestamp !== 'string') {
      return true;
    }
    const at = Date.parse(record.timestamp);
    return !Number.isFinite(at) || at < ended_at;
  });
  const current = foldCodex(
    in_window,
    response_ledger,
    resolved_source_thread_id
  ).usage_legs;
  if (started_at === null) {
    return current.map((leg) => ({
      ...leg,
      ...(leg.scope_id
        ? { scope_id: attemptScopeId(leg.scope_id, started_at, ended_at) }
        : {}),
      ...(boundary_unproven
        ? {
            partial: true,
            partial_reasons: ['attempt_boundary_unproven']
          }
        : {})
    }));
  }
  const before = foldCodex(
    in_window.filter((record) => {
      if (typeof record.timestamp !== 'string') {
        return false;
      }
      const at = Date.parse(record.timestamp);
      return Number.isFinite(at) && at < started_at;
    }),
    response_ledger,
    resolved_source_thread_id
  ).usage_legs;
  const baseline = new Map(
    before.map((leg) => [`${leg.turn_id}\0${leg.model}`, leg.usage])
  );
  return current.flatMap((leg) => {
    if (
      leg.partial === true &&
      !Object.values(leg.usage || {}).some((value) => Number.isFinite(value))
    ) {
      return [
        {
          ...leg,
          ...(leg.scope_id
            ? { scope_id: attemptScopeId(leg.scope_id, started_at, ended_at) }
            : {})
        }
      ];
    }
    const prior = baseline.get(`${leg.turn_id}\0${leg.model}`);
    if (!prior) {
      return [
        {
          ...leg,
          ...(leg.scope_id
            ? { scope_id: attemptScopeId(leg.scope_id, started_at, ended_at) }
            : {}),
          observed_from: Math.max(
            Number.isFinite(leg.observed_from) ? leg.observed_from : started_at,
            started_at
          ),
          ...(boundary_unproven
            ? {
                partial: true,
                partial_reasons: ['attempt_boundary_unproven']
              }
            : {})
        }
      ];
    }
    /** @type {Record<string, number>} */
    const usage = {};
    for (const [field, value] of Object.entries(leg.usage)) {
      if (!Number.isFinite(value)) {
        continue;
      }
      const old = Number.isFinite(prior[field]) ? prior[field] : 0;
      usage[field] = Math.max(0, value - old);
    }
    return Object.values(usage).some((value) => value > 0)
      ? [
          {
            ...leg,
            usage,
            ...(leg.scope_id
              ? {
                  scope_id: attemptScopeId(leg.scope_id, started_at, ended_at)
                }
              : {}),
            observed_from: started_at,
            ...(boundary_unproven
              ? {
                  partial: true,
                  partial_reasons: ['attempt_boundary_unproven']
                }
              : {})
          }
        ]
      : [];
  });
}

/**
 * A response scope is reusable only within the same proven attempt window.
 *
 * @param {string} scope_id - Thread, turn and model identity.
 * @param {number|null|undefined} started_at - Inclusive start.
 * @param {number|null|undefined} ended_at - Exclusive end.
 */
function attemptScopeId(scope_id, started_at, ended_at) {
  return `${scope_id}:window:${Number.isFinite(started_at) ? started_at : 'open'}:${Number.isFinite(ended_at) ? ended_at : 'open'}`;
}

/**
 * Fold a complete raw transcript into its public observation.
 *
 * @param {'claude'|'codex'} provider - Provider grammar to apply.
 * @param {string} text - Complete JSONL snapshot.
 * @param {{ file?: string, session_id?: string }} [context] - Local identity.
 */
export function foldSessionObservation(provider, text, context = {}) {
  const accumulator = createObservationAccumulator(provider, context);
  for (const line of text.split(/\r?\n/)) {
    if (line.trim().length === 0) {
      continue;
    }
    try {
      const parsed = JSON.parse(line);
      if (objectOf(parsed)) {
        accumulator.apply(parsed);
      }
    } catch {
      // A damaged or torn line contributes no invented value.
    }
  }
  return accumulator.snapshot();
}

/**
 * Stateful fold shared by snapshot and tail paths.
 *
 * @param {'claude'|'codex'} provider
 * @param {{ session_id?: string }} [context]
 * @param {() => void} [on_apply]
 * @param {ReturnType<typeof createCodexResponseLedger>} [response_ledger]
 */
function createObservationAccumulator(
  provider,
  context = {},
  on_apply,
  response_ledger = createCodexResponseLedger()
) {
  if (provider === 'codex') {
    let codex = createCodexAccumulator(
      response_ledger,
      context.session_id || null
    );
    return {
      /** @param {Record<string, any>} record */
      apply(record) {
        on_apply?.();
        codex.apply(record);
      },
      snapshot() {
        const folded = codex.snapshot();
        return {
          provider,
          session_id: folded.session_id || context.session_id || null,
          model: folded.model,
          usage: folded.usage,
          usage_legs: folded.usage_legs,
          delegations: []
        };
      },
      reset() {
        if (context.session_id) {
          response_ledger.resetThread(context.session_id);
        }
        codex = createCodexAccumulator(
          response_ledger,
          context.session_id || null
        );
      }
    };
  }
  /** @type {string|null} */
  let model = null;
  let result_index = 0;
  /** @type {Map<string, { model: string|null, usage: Record<string, any> }>} */
  let active_segments = new Map();
  /** @type {Array<Record<string, any>>} */
  let settled_legs = [];
  /** @type {Array<Record<string, any>>} */
  let settled_totals = [];
  let delegation_store = createDelegationStore();
  let child_usage_store = createUsageStore();
  /** @type {Map<string, string|null>} */
  let child_models = new Map();

  /** @param {Record<string, any>} result_usage */
  function settleResult(result_usage) {
    settled_totals.push(result_usage);
    /** @type {Array<Record<string, any>>} */
    const active = [...active_segments].map(([message_id, segment]) => ({
      provider: 'claude',
      role: 'orchestrator',
      attempt_id: `session:${context.session_id || 'unknown'}`,
      turn_id: message_id,
      model: segment.model,
      usage: segment.usage
    }));
    const summed = sumUsage(active.map((leg) => leg.usage)) ?? {};
    /** @type {Record<string, number>} */
    const residual = {};
    for (const [field, value] of Object.entries(result_usage)) {
      if (
        field !== 'total_cost_usd' &&
        field !== 'replayed' &&
        Number.isFinite(value)
      ) {
        residual[field] = Math.max(0, Number(value) - (summed[field] || 0));
      }
    }
    if (Object.values(residual).some((value) => value > 0)) {
      active.push({
        provider: 'claude',
        role: 'orchestrator',
        attempt_id: `session:${context.session_id || 'unknown'}`,
        turn_id: `result:${result_index}:unattributed`,
        model: null,
        usage: residual,
        partial: true
      });
    }
    const has_reported_cost =
      typeof result_usage.total_cost_usd === 'number' &&
      Number.isFinite(result_usage.total_cost_usd) &&
      result_usage.total_cost_usd >= 0;
    if (has_reported_cost) {
      for (const leg of active) {
        leg.cost_covered = true;
      }
      active.push({
        provider: 'claude',
        role: 'orchestrator',
        attempt_id: `session:${context.session_id || 'unknown'}`,
        turn_id: `result:${result_index}:reported-cost`,
        model: null,
        usage: { total_tokens: 0, total_cost_usd: result_usage.total_cost_usd }
      });
    }
    settled_legs.push(...active);
    active_segments = new Map();
    result_index += 1;
  }

  return {
    /** @param {Record<string, any>} record */
    apply(record) {
      on_apply?.();
      const parent_id =
        typeof record.parent_tool_use_id === 'string'
          ? record.parent_tool_use_id
          : null;
      if (record.isSidechain === true && parent_id === null) {
        return;
      }
      if (!parent_id && record.type === 'system' && record.subtype === 'init') {
        model = typeof record.model === 'string' ? record.model : model;
      }
      if (
        !parent_id &&
        record.type === 'assistant' &&
        typeof record.message?.model === 'string'
      ) {
        model = record.message.model;
      }
      const usage = liftClaudeUsage(record);
      if (usage?.kind === 'result' && !parent_id) {
        settleResult(usage.usage);
      } else if (parent_id) {
        const child_usage = claudeMessageUsage(record.message);
        if (child_usage) {
          child_usage_store.record('/', parent_id, child_usage);
        }
        child_models.set(parent_id, record.message?.model ?? null);
      } else if (usage) {
        active_segments.set(String(usage.usage.message_id || ''), {
          model,
          usage: usage.usage
        });
      }
      const content = Array.isArray(record.message?.content)
        ? record.message.content
        : [];
      const relevant = content.filter(
        (/** @type {any} */ block) =>
          block &&
          typeof block === 'object' &&
          ((block.type === 'tool_use' && block.name === 'Agent') ||
            block.type === 'tool_result')
      );
      for (const block of relevant.length > 0 ? relevant : [null]) {
        delegation_store.apply(
          '/',
          'direct',
          liftDelegation(
            block
              ? { ...record, message: { ...record.message, content: [block] } }
              : record
          )
        );
      }
    },
    snapshot() {
      const delegated = delegation_store.get('/', 'direct');
      const usage_by_receipt = new Map(
        delegated.legs.map((leg) => [leg.receipt_id, leg])
      );
      const live_legs = [...active_segments].map(([message_id, segment]) => ({
        provider: 'claude',
        role: 'orchestrator',
        attempt_id: `session:${context.session_id || 'unknown'}`,
        turn_id: message_id,
        model: segment.model,
        usage: segment.usage
      }));
      const root_legs = [...settled_legs, ...live_legs];
      const live_usage = sumUsage(live_legs.map((leg) => leg.usage));
      return {
        provider,
        session_id: context.session_id || null,
        model,
        usage: sumUsage([
          ...settled_totals,
          ...(live_usage ? [live_usage] : [])
        ]),
        usage_legs: [...root_legs, ...delegated.legs],
        delegations: delegated.sessions.map((session) => {
          const usage_leg = usage_by_receipt.get(session.launch_id);
          const live_usage = child_usage_store.get('/', session.launch_id);
          return {
            ...session,
            ...(usage_leg
              ? {
                  usage: usage_leg.usage,
                  model: usage_leg.model || session.model
                }
              : live_usage
                ? {
                    usage: live_usage,
                    model: child_models.get(session.launch_id) || session.model
                  }
                : {})
          };
        })
      };
    },
    reset() {
      model = null;
      result_index = 0;
      active_segments = new Map();
      settled_legs = [];
      settled_totals = [];
      delegation_store = createDelegationStore();
      child_usage_store = createUsageStore();
      child_models = new Map();
    }
  };
}

/**
 * @param {{ onChange?: (workspace: string, bead_id: string, observation: Record<string, any>) => void, onApply?: () => void, fanoutMs?: number, createReader?: typeof createTailReader, readSnapshot?: typeof readSessionSnapshot, fs?: typeof fs }} [options]
 */
export function createSessionObservationStore(options = {}) {
  const make_reader = options.createReader || createTailReader;
  const read_snapshot = options.readSnapshot || readSessionSnapshot;
  const fanout_ms = options.fanoutMs ?? 3000;
  const file_system = options.fs || fs;
  /** @type {Map<string, any>} */
  const entries = new Map();
  /** @type {Map<string, Record<string, any>>} */
  const values = new Map();
  /**
   * @param {string} workspace - Workspace root.
   * @param {string} bead_id - Card identity.
   */
  const consumerKey = (workspace, bead_id) =>
    `${path.resolve(workspace)}\0${bead_id}`;

  /** @param {any} entry - Shared reader entry. */
  function publish(entry, notify = true) {
    const projection = entry.accumulator.snapshot();
    if (entry.provider === 'codex') {
      projection.delegations = entry.delegations;
    }
    const projection_json = JSON.stringify(projection);
    if (projection_json === entry.projection_json) {
      return;
    }
    entry.projection_json = projection_json;
    const observation = { ...projection, observed_at: Date.now() };
    entry.observation = observation;
    for (const consumer of entry.consumers.values()) {
      const key = consumerKey(consumer.workspace, consumer.bead_id);
      values.set(key, observation);
      if (notify) {
        options.onChange?.(consumer.workspace, consumer.bead_id, observation);
      }
    }
  }

  /** @param {any} entry */
  function schedulePublish(entry) {
    if (entry.publish_timer !== null) {
      return;
    }
    entry.publish_timer = setTimeout(() => {
      entry.publish_timer = null;
      for (const consumer of entry.consumers.values()) {
        if (entry.observation) {
          options.onChange?.(
            consumer.workspace,
            consumer.bead_id,
            entry.observation
          );
        }
      }
    }, fanout_ms);
    entry.publish_timer.unref?.();
  }

  /**
   * Parse one complete line once and append it to the accumulator.
   *
   * @param {any} entry
   * @param {string} line
   */
  function applyLine(entry, line) {
    try {
      const record = objectOf(JSON.parse(line));
      if (record) {
        entry.accumulator.apply(record);
        entry.child_observer?.applyRoot(record);
      }
    } catch {
      // A damaged complete record contributes no invented observation.
    }
  }

  /** @param {any} entry */
  function scanDelegations(entry) {
    if (entry.provider !== 'codex') {
      return;
    }
    entry.child_observer.scan();
    entry.delegations = entry.child_observer.snapshot();
    publish(entry, false);
    schedulePublish(entry);
  }

  /** @param {any} entry - Shared reader entry. */
  function stopEntry(entry) {
    entry.reader.stop();
    entry.child_observer?.stop();
    if (entry.rescan_timer !== null) {
      clearInterval(entry.rescan_timer);
      entry.rescan_timer = null;
    }
    if (entry.publish_timer !== null) {
      clearTimeout(entry.publish_timer);
      entry.publish_timer = null;
    }
  }

  return {
    /**
     * @param {string} workspace - Workspace root.
     * @param {Array<{ bead_id: string, provider: 'claude'|'codex', session_id: string, file: string }>} targets - Current local references.
     */
    reconcile(workspace, targets) {
      const root = path.resolve(workspace);
      const target_by_key = new Map(
        targets.map((target) => [consumerKey(root, target.bead_id), target])
      );
      for (const entry of entries.values()) {
        for (const [key, consumer] of entry.consumers) {
          const target = target_by_key.get(key);
          if (
            consumer.workspace === root &&
            (!target ||
              target.file !== entry.file ||
              target.provider !== entry.provider ||
              target.session_id !== entry.session_id)
          ) {
            entry.consumers.delete(key);
            values.delete(key);
          }
        }
        if (entry.consumers.size === 0) {
          stopEntry(entry);
          entries.delete(entry.file);
        }
      }
      for (const target of targets) {
        const key = consumerKey(root, target.bead_id);
        values.delete(key);
        let entry = entries.get(target.file);
        if (
          entry &&
          (entry.provider !== target.provider ||
            entry.session_id !== target.session_id)
        ) {
          stopEntry(entry);
          entries.delete(target.file);
          entry = undefined;
        }
        if (!entry) {
          const snapshot = read_snapshot(target.file);
          if (!snapshot) {
            continue;
          }
          const response_ledger = createCodexResponseLedger();
          /** @type {any} */
          const held = {
            file: target.file,
            provider: target.provider,
            session_id: target.session_id,
            accumulator: createObservationAccumulator(
              target.provider,
              { session_id: target.session_id },
              options.onApply,
              response_ledger
            ),
            response_ledger,
            delegations: [],
            projection_json: null,
            observation: null,
            reader: null,
            rescan_timer: null,
            publish_timer: null,
            child_observer: null,
            consumers: new Map()
          };
          if (held.provider === 'codex') {
            held.child_observer = createIncrementalCodexChildObserver({
              root_thread_id: held.session_id,
              root_file: held.file,
              createReader: make_reader,
              readSnapshot: read_snapshot,
              fs: file_system,
              responseLedger: response_ledger,
              onChange() {
                held.delegations = held.child_observer.snapshot();
                publish(held, false);
                schedulePublish(held);
              }
            });
          }
          for (const line of snapshot.text.split(/\r?\n/)) {
            if (line.length > 0) {
              applyLine(held, line);
            }
          }
          held.reader = make_reader({
            file: target.file,
            start_offset: snapshot.boundary,
            onLine: (line) => {
              applyLine(held, line);
              publish(held, false);
              schedulePublish(held);
            },
            onReset: () => {
              held.accumulator.reset();
              held.child_observer?.resetRoot();
              held.delegations = held.child_observer?.snapshot() || [];
              held.projection_json = null;
              publish(held, false);
              schedulePublish(held);
            }
          });
          held.reader.start();
          if (held.provider === 'codex') {
            scanDelegations(held);
            held.rescan_timer = setInterval(() => scanDelegations(held), 3000);
            held.rescan_timer.unref?.();
          }
          entries.set(target.file, held);
          entry = held;
        }
        if (!entry) {
          continue;
        }
        entry.consumers.set(key, { workspace: root, bead_id: target.bead_id });
        if (entry.observation) {
          values.set(key, entry.observation);
        } else {
          publish(entry);
        }
      }
    },
    /**
     * @param {string} workspace - Workspace root.
     * @param {string} bead_id - Card identity.
     */
    get(workspace, bead_id) {
      return values.get(consumerKey(workspace, bead_id)) ?? null;
    },
    clear() {
      for (const entry of entries.values()) {
        stopEntry(entry);
      }
      entries.clear();
      values.clear();
    },
    readerCount() {
      return entries.size;
    }
  };
}
