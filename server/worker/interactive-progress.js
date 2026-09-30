/**
 * Last assistant line of an interactive session's transcript (UI-ri8n §3.1).
 *
 * The reconcile pass reads only the file's tail, so a long session costs one
 * bounded read per changed mtime. Lines go through the same projection the
 * transcript drawer uses, which keeps "what counts as an assistant message"
 * in one place for both providers.
 */
import nodeFs from 'node:fs';
import { createSessionRefTranscript } from './session-ref-transcript.js';

export const PROGRESS_TAIL_BYTES = 64 * 1024;
export const PROGRESS_MESSAGE_MAX_CHARS = 160;
/** The `❓ 답 대기` excerpt budget in code points (UI-nuwy §3.3). */
export const PROGRESS_EXCERPT_MAX_CHARS = 400;

/**
 * The three conversation-turn result lines (dotfiles `Worker 세션 대화`).
 *
 * @type {ReadonlyArray<[string, 'handoff'|'takeover'|'hold']>}
 */
const RESULT_LINE_PREFIXES = [
  ['인계 ·', 'handoff'],
  ['인수 ·', 'takeover'],
  ['보류 ·', 'hold']
];

/**
 * Read a conversation result line off a message's FIRST non-empty line; the
 * line is returned whole, never cut to the display budget.
 *
 * @param {unknown} first_line
 * @returns {{ kind: 'handoff'|'takeover'|'hold', line: string }|null}
 */
export function parseConversationResult(first_line) {
  if (typeof first_line !== 'string') {
    return null;
  }
  const line = first_line.trim();
  for (const [prefix, kind] of RESULT_LINE_PREFIXES) {
    if (line.startsWith(prefix)) {
      return { kind, line };
    }
  }
  return null;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Text of one projected event when it is an assistant message, else null.
 *
 * @param {unknown} event
 * @returns {string|null}
 */
function assistantText(event) {
  if (!isObject(event)) {
    return null;
  }
  if (event.type === 'assistant' && isObject(event.message)) {
    const content = event.message.content;
    if (typeof content === 'string') {
      return content;
    }
    if (!Array.isArray(content)) {
      return null;
    }
    /** @type {string[]} */
    const parts = [];
    for (const block of content) {
      if (
        isObject(block) &&
        block.type === 'text' &&
        typeof block.text === 'string'
      ) {
        parts.push(block.text);
      }
    }
    return parts.length > 0 ? parts.join('\n') : null;
  }
  if (
    event.type === 'item.completed' &&
    isObject(event.item) &&
    event.item.type === 'agent_message' &&
    typeof event.item.text === 'string'
  ) {
    return event.item.text;
  }
  return null;
}

/**
 * First non-empty line of a message, uncut.
 *
 * @param {string} text
 * @returns {string|null}
 */
function firstLine(text) {
  const line = text
    .split('\n')
    .map((part) => part.trim())
    .find((part) => part.length > 0);
  return line === undefined ? null : line;
}

/**
 * Cut a value to a code-point budget, so a surrogate pair is never split.
 *
 * @param {string} value
 * @param {number} max
 * @returns {string}
 */
function cut(value, max) {
  return Array.from(value).slice(0, max).join('');
}

/**
 * Epoch ms of a raw JSONL record's `timestamp`, or null.
 *
 * @param {string} line
 * @returns {number|null}
 */
function lineTimestamp(line) {
  try {
    const raw = JSON.parse(line);
    if (isObject(raw) && typeof raw.timestamp === 'string') {
      const at = Date.parse(raw.timestamp);
      return Number.isFinite(at) ? at : null;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Read the last assistant message from a transcript tail; null when the tail
 * carries none or the file cannot be read. `text` is the first non-empty line
 * cut to 160 code points (the card's progress line), `first_line` the same
 * line uncut (a long result line must stay whole), and `excerpt` the whole
 * message with whitespace collapsed, cut to 400 code points.
 *
 * @param {{ provider: 'claude'|'codex', file: string, since_offset?: number, fs?: Pick<typeof nodeFs, 'statSync'|'openSync'|'readSync'|'closeSync'> }} input
 * @returns {{ text: string, at: number|null, first_line: string, excerpt: string }|null}
 */
export function readLastAssistantMessage(input) {
  const file_system = input.fs || nodeFs;
  const size = file_system.statSync(input.file).size;
  const floor = Math.max(0, input.since_offset || 0);
  const start = Math.max(floor, size - PROGRESS_TAIL_BYTES);
  if (start >= size) {
    return null;
  }
  const buffer = Buffer.alloc(size - start);
  const fd = file_system.openSync(input.file, 'r');
  try {
    file_system.readSync(fd, buffer, 0, buffer.length, start);
  } finally {
    file_system.closeSync(fd);
  }
  const lines = buffer.toString('utf8').split('\n');
  // A tail cut starts inside a record; that fragment is not a line of its
  // own. `since_offset` is the caller's line boundary and is kept whole.
  if (start > floor) {
    lines.shift();
  }
  const transcript = createSessionRefTranscript(input.provider);
  /** @type {{ text: string, at: number|null, first_line: string, excerpt: string }|null} */
  let last = null;
  for (const line of lines) {
    for (const event of transcript.project(line)) {
      const text = assistantText(event);
      const head = text === null ? null : firstLine(text);
      if (text !== null && head !== null) {
        last = {
          text: cut(head, PROGRESS_MESSAGE_MAX_CHARS),
          at: lineTimestamp(line),
          first_line: head,
          excerpt: cut(
            text.replace(/\s+/g, ' ').trim(),
            PROGRESS_EXCERPT_MAX_CHARS
          )
        };
      }
    }
  }
  return last;
}
