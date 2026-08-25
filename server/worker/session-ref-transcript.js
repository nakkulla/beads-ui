/**
 * Transcript adapter for `session_ref` sessions (UI-4xzk §5).
 *
 * The drawer parses the RUNNER event stream (`app/utils/transcript-lines.js`).
 * A Claude project JSONL is already that shape apart from records the runner
 * never writes, so it only needs a pass filter. A Codex rollout is a DIFFERENT
 * shape (`response_item`/`event_msg` records), so one projection here keeps the
 * client identical for both providers.
 *
 * An instance is created per subscription and outlives the snapshot: a
 * `custom_tool_call` may sit below the snapshot boundary while its output
 * arrives as a live append, and only shared pairing state can still name the
 * command that produced it.
 */
import { debug } from '../logging.js';

const log = debug('worker:session-ref-transcript');

/**
 * Claude record types the drawer parser understands. Everything else in a
 * project JSONL (`attachment`, `ai-title`, `file-history-snapshot`, `mode`, …)
 * is editor bookkeeping, and `system` never appears there in the runner's
 * `init`/`thinking_tokens` shape.
 *
 * @type {ReadonlySet<string>}
 */
const CLAUDE_PASS_TYPES = new Set(['user', 'assistant', 'result']);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Concatenated text of a codex tool-call output, which is either the raw string
 * or a list of `{ text }` parts.
 *
 * @param {unknown} output
 */
function outputText(output) {
  if (typeof output === 'string') {
    return output;
  }
  if (!Array.isArray(output)) {
    return '';
  }
  let text = '';
  for (const part of output) {
    if (isObject(part) && typeof part.text === 'string') {
      text += part.text;
    }
  }
  return text;
}

/**
 * The shell command a `function_call` carries, or null when it carries none.
 *
 * @param {unknown} args
 * @returns {string|null}
 */
function functionCallCommand(args) {
  if (typeof args !== 'string') {
    return null;
  }
  /** @type {unknown} */
  let parsed;
  try {
    parsed = JSON.parse(args);
  } catch {
    return null;
  }
  if (!isObject(parsed)) {
    return null;
  }
  for (const key of ['cmd', 'command']) {
    const value = parsed[key];
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }
  return null;
}

/**
 * Project one `event_msg` payload onto runner events.
 *
 * @param {Record<string, unknown>} payload
 * @returns {unknown[]}
 */
function projectCodexEvent(payload) {
  switch (payload.type) {
    case 'user_message':
      return typeof payload.message === 'string'
        ? [
            {
              type: 'item.completed',
              item: { type: 'user_message', text: payload.message }
            }
          ]
        : [];
    case 'agent_message':
      return typeof payload.message === 'string'
        ? [
            {
              type: 'item.completed',
              item: { type: 'agent_message', text: payload.message }
            }
          ]
        : [];
    case 'agent_reasoning':
      return typeof payload.text === 'string'
        ? [
            {
              type: 'item.completed',
              item: { type: 'reasoning', text: payload.text }
            }
          ]
        : [];
    case 'task_complete':
      return [{ type: 'turn.completed' }];
    case 'error':
      return [{ type: 'error', message: String(payload.message ?? '') }];
    default:
      return [];
  }
}

/**
 * Project one `response_item` payload onto runner events, registering and
 * consuming the call/output pairing that carries the command text.
 *
 * @param {Record<string, unknown>} payload
 * @param {Map<string, string>} pending_commands
 * @returns {unknown[]}
 */
function projectCodexResponseItem(payload, pending_commands) {
  const call_id = typeof payload.call_id === 'string' ? payload.call_id : '';
  if (call_id.length === 0) {
    return [];
  }
  if (payload.type === 'custom_tool_call') {
    if (payload.name === 'exec' && typeof payload.input === 'string') {
      pending_commands.set(call_id, payload.input);
    }
    return [];
  }
  if (payload.type === 'function_call') {
    const command = functionCallCommand(payload.arguments);
    if (command !== null) {
      pending_commands.set(call_id, command);
    }
    return [];
  }
  if (
    payload.type === 'custom_tool_call_output' ||
    payload.type === 'function_call_output'
  ) {
    const command = pending_commands.get(call_id);
    if (command === undefined) {
      // An output whose call was never registered names no command; the runner
      // stream has no shape for that, so the record is simply not shown.
      return [];
    }
    pending_commands.delete(call_id);
    return [
      {
        type: 'item.completed',
        item: {
          type: 'command_execution',
          command,
          aggregated_output: outputText(payload.output),
          status: 'completed'
        }
      }
    ];
  }
  return [];
}

/**
 * Create one subscription's transcript adapter.
 *
 * @param {'claude'|'codex'} provider
 * @returns {{ project: (line: string) => unknown[] }}
 */
export function createSessionRefTranscript(provider) {
  /** @type {Map<string, string>} */
  const pending_commands = new Map();

  /**
   * @param {string} line - One raw JSONL line of the session file.
   * @returns {unknown[]} Zero or more runner-shaped events.
   */
  function project(line) {
    if (typeof line !== 'string' || line.trim().length === 0) {
      return [];
    }
    /** @type {unknown} */
    let raw;
    try {
      raw = JSON.parse(line);
    } catch {
      log('session transcript line unparsable (%d bytes)', line.length);
      return [];
    }
    if (!isObject(raw)) {
      return [];
    }
    if (provider === 'claude') {
      if (typeof raw.type !== 'string' || !CLAUDE_PASS_TYPES.has(raw.type)) {
        return [];
      }
      // Injected text and subagent branches are not this session's turns.
      if (raw.isMeta === true || raw.isSidechain === true) {
        return [];
      }
      return [raw];
    }
    if (!isObject(raw.payload)) {
      return [];
    }
    if (raw.type === 'event_msg') {
      return projectCodexEvent(raw.payload);
    }
    if (raw.type === 'response_item') {
      return projectCodexResponseItem(raw.payload, pending_commands);
    }
    return [];
  }

  return { project };
}
