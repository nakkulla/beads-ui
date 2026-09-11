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
import {
  codexSessionsRootFor,
  createIncrementalCodexChildObserver,
  readCodexChildRecords
} from './codex-children/reader.js';
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
/** @param {{ createReader?: typeof createTailReader, readSnapshot?: typeof readSessionSnapshot, sessionsRootFor?: (attempt: any) => string }} [options] */
export function createWorkerSessionObservationStore(options = {}) {
  /** @type {Map<string, Record<string, any>>} */
  const values = new Map();
  /** @type {Map<string, any>} */
  const observers = new Map();
  const make_reader = options.createReader || createTailReader;
  const read_snapshot = options.readSnapshot || readSessionSnapshot;
  /** @param {string} workspace - Workspace. @param {string} attempt_id - Attempt. */
  const keyOf = (workspace, attempt_id) =>
    `${path.resolve(workspace)}\0${attempt_id}`;
  return {
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
        const current = createCodexAccumulator();
        const baseline = createCodexAccumulator();
        /** @param {Record<string, any>} record */
        const apply = (record) => {
          held.current.apply(record);
          const at =
            typeof record.timestamp === 'string'
              ? Date.parse(record.timestamp)
              : NaN;
          if (!Number.isFinite(at)) {
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
          reader: null,
          children: createIncrementalCodexChildObserver({
            root_thread_id: attempt.session_id,
            root_file: file,
            sessions_root,
            started_at: attempt.started_at,
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
            held.current = createCodexAccumulator();
            held.baseline = createCodexAccumulator();
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
          .usage_legs.map((/** @type {any} */ leg) => [leg.turn_id, leg.usage])
      );
      const usage_segments = current.usage_legs.flatMap(
        (/** @type {any} */ leg) => {
          const old = prior.get(leg.turn_id);
          if (!old) {
            return [
              { ...leg, ...(held.boundary_unproven ? { partial: true } : {}) }
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
                  ...(held.boundary_unproven ? { partial: true } : {})
                }
              ]
            : [];
        }
      );
      const usage = sumUsage(
        usage_segments.map((/** @type {any} */ leg) => leg.usage)
      );
      const value = {
        ...(values.get(key) || {}),
        usage,
        usage_segments,
        codex_children: held.children.snapshot(
          observation_options.parent_terminated === true
        )
      };
      values.set(key, value);
      return value;
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
      values.delete(key);
    },
    clear() {
      for (const held of observers.values()) {
        held.reader.stop?.();
        held.children.stop();
      }
      observers.clear();
      values.clear();
    }
  };
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

function createCodexAccumulator() {
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
      if (
        session_id &&
        typeof payload.thread_id === 'string' &&
        payload.thread_id !== session_id
      ) {
        return;
      }
      const turn_id =
        typeof payload.turn_id === 'string' ? payload.turn_id : current_turn;
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
      if (current_turn && completed) {
        turns.set(current_turn, completed);
      }
    }
  }
  function snapshot() {
    /** @type {Array<Record<string, any>>} */
    const usage_legs = [];
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
    if (thread_usage) {
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
        residual[field] = Math.max(0, value - (summed[field] || 0));
      }
      if (Object.values(residual).some((value) => value > 0)) {
        usage_legs.push({
          provider: 'codex',
          role: 'orchestrator',
          attempt_id: `session:${session_id || 'unknown'}`,
          turn_id: 'unattributed',
          model: null,
          usage: residual,
          partial: true
        });
      }
    }
    const usage = thread_usage ?? sumUsage(usage_legs.map((leg) => leg.usage));
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

/** @param {Array<Record<string, any>>} records */
function foldCodex(records) {
  const accumulator = createCodexAccumulator();
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
  return foldCodexAttemptUsage(root_records, started_at, ended_at);
}

/**
 * Apply one Worker attempt's time boundary to cumulative Codex turn records.
 *
 * @param {Array<Record<string, any>>} records - Root rollout records.
 * @param {number|null} started_at - Attempt start in milliseconds.
 * @param {number|null} ended_at - Attempt end in milliseconds.
 */
export function foldCodexAttemptUsage(records, started_at, ended_at) {
  const boundary_unproven = records.some((record) => {
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
    return !Number.isFinite(at) || at <= ended_at;
  });
  const current = foldCodex(in_window).usage_legs;
  if (started_at === null) {
    return current;
  }
  const before = foldCodex(
    in_window.filter((record) => {
      if (typeof record.timestamp !== 'string') {
        return false;
      }
      const at = Date.parse(record.timestamp);
      return Number.isFinite(at) && at < started_at;
    })
  ).usage_legs;
  const baseline = new Map(before.map((leg) => [leg.turn_id, leg.usage]));
  return current.flatMap((leg) => {
    const prior = baseline.get(leg.turn_id);
    if (!prior) {
      return [{ ...leg, ...(boundary_unproven ? { partial: true } : {}) }];
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
      ? [{ ...leg, usage, ...(boundary_unproven ? { partial: true } : {}) }]
      : [];
  });
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
 */
function createObservationAccumulator(provider, context = {}, on_apply) {
  if (provider === 'codex') {
    let codex = createCodexAccumulator();
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
        codex = createCodexAccumulator();
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
          /** @type {any} */
          const held = {
            file: target.file,
            provider: target.provider,
            session_id: target.session_id,
            accumulator: createObservationAccumulator(
              target.provider,
              { session_id: target.session_id },
              options.onApply
            ),
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
