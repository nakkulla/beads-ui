/**
 * Pure grammar of the Codex rollout JSONL, for native subagent observation
 * (UI-mn5u §6.1–6.2).
 *
 * `codex exec --json` stdout carries NO child events at all — the measured
 * fixture notes (`docs/superpowers/specs/assets/codex-native-child-fixture-notes.md`,
 * codex-cli 0.153.4) record that the only child-facing item is a
 * `collab_tool_call` wait whose `receiver_thread_ids` is empty. So the rollout
 * files are the ONLY source that can link a root thread to its children, and
 * this module is the line-level reader of that source: every function here is
 * pure, takes one already-parsed record, and returns null for anything it
 * cannot explain. The rollout schema is an unofficial surface, so a missing or
 * malformed piece is dropped rather than guessed.
 */

/**
 * One normalized observation lifted from a single rollout record.
 *
 * @typedef {Object} CodexChildSignal
 * @property {'meta'|'context'|'started'|'completed'|'failed'|'usage'|'spawn'|'spawn_output'|'activity'} kind
 * @property {number|null} at - Epoch ms of the record itself.
 * @property {string|null} [parent_thread_id]
 * @property {string|null} [agent_path]
 * @property {number|null} [depth]
 * @property {string|null} [model]
 * @property {string|null} [effort]
 * @property {string|null} [launch_id]
 * @property {number|null} [event_at] - Epoch ms the payload itself states
 * (`started_at`/`completed_at`), which is not the record's own timestamp.
 * @property {CodexChildUsage|null} [usage]
 */

/**
 * The six usage keys the rollout reports, and the ONLY keys a stored row may
 * carry (§6.2). `cached_input_tokens` and `reasoning_output_tokens` are subsets
 * of the input/output figures, never separate consumption.
 *
 * @typedef {{ input_tokens?: number, cached_input_tokens?: number, cache_write_input_tokens?: number, output_tokens?: number, reasoning_output_tokens?: number, total_tokens?: number }} CodexChildUsage
 */

/**
 * @type {ReadonlyArray<keyof CodexChildUsage>}
 */
export const CODEX_CHILD_USAGE_KEYS = Object.freeze([
  'input_tokens',
  'cached_input_tokens',
  'cache_write_input_tokens',
  'output_tokens',
  'reasoning_output_tokens',
  'total_tokens'
]);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function stringOrNull(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

/**
 * Epoch ms of a rollout record's own ISO `timestamp`.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
export function isoToEpochMs(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  const at = Date.parse(value);
  return Number.isFinite(at) ? at : null;
}

/**
 * Epoch ms of a payload field the rollout states in whole SECONDS
 * (`task_started.started_at`, `task_complete.completed_at`).
 *
 * @param {unknown} value
 * @returns {number|null}
 */
export function epochSecondsToMs(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  return Math.round(value * 1000);
}

/**
 * Keep only the six declared usage keys, and only where the value is a finite
 * non-negative integer. Anything else — an unknown key, a float, a negative, a
 * string — yields null for that key, and a record with no surviving key yields
 * null overall rather than an empty object that would read as "observed zero".
 *
 * @param {unknown} raw
 * @returns {CodexChildUsage|null}
 */
export function normalizeCodexChildUsage(raw) {
  if (!isRecord(raw)) {
    return null;
  }
  /** @type {CodexChildUsage} */
  const usage = {};
  let kept = 0;
  for (const key of CODEX_CHILD_USAGE_KEYS) {
    const value = raw[key];
    if (
      typeof value === 'number' &&
      Number.isInteger(value) &&
      Number.isFinite(value) &&
      value >= 0
    ) {
      usage[key] = value;
      kept += 1;
    }
  }
  return kept > 0 ? usage : null;
}

/**
 * The thread identity a `session_meta` record declares. Note `payload.id` is
 * the thread's OWN id while `payload.session_id` is the ROOT thread's id —
 * reading `session_id` as identity is the mistake this function exists to
 * prevent (fixture notes §2).
 *
 * @param {unknown} record
 * @returns {{ thread_id: string, parent_thread_id: string|null, agent_path: string|null, depth: number|null, subagent: boolean }|null}
 */
export function rolloutThreadIdentity(record) {
  if (!isRecord(record) || record.type !== 'session_meta') {
    return null;
  }
  const payload = record.payload;
  if (!isRecord(payload)) {
    return null;
  }
  const thread_id = stringOrNull(payload.id);
  if (thread_id === null) {
    return null;
  }
  const source = isRecord(payload.source) ? payload.source : null;
  const subagent_source =
    source && isRecord(source.subagent) ? source.subagent : null;
  const spawn =
    subagent_source && isRecord(subagent_source.thread_spawn)
      ? subagent_source.thread_spawn
      : null;
  const depth = spawn && typeof spawn.depth === 'number' ? spawn.depth : null;
  return {
    thread_id,
    parent_thread_id:
      stringOrNull(payload.parent_thread_id) ??
      (spawn ? stringOrNull(spawn.parent_thread_id) : null),
    agent_path:
      stringOrNull(payload.agent_path) ??
      (spawn ? stringOrNull(spawn.agent_path) : null),
    depth: depth !== null && Number.isFinite(depth) ? depth : null,
    subagent: payload.thread_source === 'subagent'
  };
}

/**
 * Lift one rollout record into the observation it carries, or null when the
 * record says nothing about a child's identity, lifetime, model or usage.
 *
 * @param {unknown} record
 * @returns {CodexChildSignal|null}
 */
export function liftCodexChildSignal(record) {
  if (!isRecord(record)) {
    return null;
  }
  const at = isoToEpochMs(record.timestamp);
  const identity = rolloutThreadIdentity(record);
  if (identity) {
    return {
      kind: 'meta',
      at,
      parent_thread_id: identity.parent_thread_id,
      agent_path: identity.agent_path,
      depth: identity.depth
    };
  }
  const payload = isRecord(record.payload) ? record.payload : null;
  if (record.type === 'turn_context' && payload) {
    return {
      kind: 'context',
      at,
      model: stringOrNull(payload.model),
      effort: stringOrNull(payload.effort)
    };
  }
  if (record.type === 'token_usage_record' && payload) {
    return {
      kind: 'usage',
      at,
      usage: normalizeCodexChildUsage(payload.thread_token_usage)
    };
  }
  if (record.type === 'event_msg' && payload) {
    if (payload.type === 'task_started') {
      return {
        kind: 'started',
        at,
        event_at: epochSecondsToMs(payload.started_at)
      };
    }
    if (payload.type === 'task_complete') {
      return {
        kind: 'completed',
        at,
        event_at: epochSecondsToMs(payload.completed_at)
      };
    }
    // Unobserved in the 0.153.4 measurement: accepted leniently so a failure
    // shape that does exist is not read as a still-running child, never
    // synthesized when the evidence is absent.
    if (payload.type === 'task_failed' || payload.type === 'turn_failed') {
      return { kind: 'failed', at };
    }
    if (payload.type === 'token_count' && isRecord(payload.info)) {
      return {
        kind: 'usage',
        at,
        usage: normalizeCodexChildUsage(payload.info.total_token_usage)
      };
    }
    return { kind: 'activity', at };
  }
  if (record.type === 'response_item' && payload) {
    if (payload.type === 'function_call' && payload.name === 'spawn_agent') {
      /** @type {unknown} */
      let args = null;
      try {
        args =
          typeof payload.arguments === 'string'
            ? JSON.parse(payload.arguments)
            : payload.arguments;
      } catch {
        args = null;
      }
      const parsed_args = isRecord(args) ? args : null;
      return {
        kind: 'spawn',
        at,
        launch_id: stringOrNull(payload.call_id),
        model: parsed_args ? stringOrNull(parsed_args.model) : null,
        // The root names the agent by `task_name`; the child's own
        // `agent_path` is `/root/<task_name>`, and the spawn OUTPUT states the
        // full path. Both are kept so either can join.
        agent_path: parsed_args ? stringOrNull(parsed_args.task_name) : null
      };
    }
    if (payload.type === 'function_call_output') {
      /** @type {unknown} */
      let output = null;
      try {
        output =
          typeof payload.output === 'string'
            ? JSON.parse(payload.output)
            : payload.output;
      } catch {
        output = null;
      }
      const parsed_output = isRecord(output) ? output : null;
      const task_name = parsed_output
        ? stringOrNull(parsed_output.task_name)
        : null;
      if (task_name === null) {
        return { kind: 'activity', at };
      }
      // A completed spawn tool call is NOT a completed child (§6.2): it only
      // names the agent the launch id belongs to.
      return {
        kind: 'spawn_output',
        at,
        launch_id: stringOrNull(payload.call_id),
        agent_path: task_name
      };
    }
    return { kind: 'activity', at };
  }
  return at === null ? null : { kind: 'activity', at };
}

/**
 * Parse a rollout file's text into its records, dropping torn or non-object
 * lines. Ordinal is the line's position in the file, which is what orders two
 * records that share a timestamp.
 *
 * @param {string} text
 * @returns {Array<{ ordinal: number, record: Record<string, unknown> }>}
 */
export function parseRolloutText(text) {
  /** @type {Array<{ ordinal: number, record: Record<string, unknown> }>} */
  const out = [];
  if (typeof text !== 'string') {
    return out;
  }
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line.length === 0) {
      continue;
    }
    /** @type {unknown} */
    let parsed;
    try {
      parsed = JSON.parse(line);
    } catch {
      continue;
    }
    if (!isRecord(parsed)) {
      continue;
    }
    out.push({ ordinal: index, record: parsed });
  }
  return out;
}
