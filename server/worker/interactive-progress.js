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
 * First non-empty line of a message, cut to the display budget.
 *
 * @param {string} text
 * @returns {string|null}
 */
function firstLine(text) {
  const line = text
    .split('\n')
    .map((part) => part.trim())
    .find((part) => part.length > 0);
  if (line === undefined) {
    return null;
  }
  return Array.from(line).slice(0, PROGRESS_MESSAGE_MAX_CHARS).join('');
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
 * Read the last assistant message line from a transcript tail; null when the
 * tail carries none or the file cannot be read.
 *
 * @param {{ provider: 'claude'|'codex', file: string, since_offset?: number, fs?: Pick<typeof nodeFs, 'statSync'|'openSync'|'readSync'|'closeSync'> }} input
 * @returns {{ text: string, at: number|null }|null}
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
  /** @type {{ text: string, at: number|null }|null} */
  let last = null;
  for (const line of lines) {
    for (const event of transcript.project(line)) {
      const text = assistantText(event);
      const head = text === null ? null : firstLine(text);
      if (head !== null) {
        last = { text: head, at: lineTimestamp(line) };
      }
    }
  }
  return last;
}
