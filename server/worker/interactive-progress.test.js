import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import {
  PROGRESS_TAIL_BYTES,
  readLastAssistantMessage
} from './interactive-progress.js';

/** @type {string[]} */
const roots = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

/**
 * @param {string} contents
 * @returns {string}
 */
function transcriptFile(contents) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'interactive-progress-'));
  roots.push(root);
  const file = path.join(root, 'session.jsonl');
  fs.writeFileSync(file, contents);
  return file;
}

/**
 * @param {string} text
 * @param {string} [timestamp]
 */
function claudeAssistant(text, timestamp = '2026-09-29T08:00:00.000Z') {
  return JSON.stringify({
    type: 'assistant',
    timestamp,
    message: { role: 'assistant', content: [{ type: 'text', text }] }
  });
}

/** @param {string} message */
function codexAgentMessage(message) {
  return JSON.stringify({
    timestamp: '2026-09-29T08:05:00.000Z',
    type: 'event_msg',
    payload: { type: 'agent_message', message }
  });
}

describe('readLastAssistantMessage', () => {
  test('returns the first line of the last Claude assistant text', () => {
    const file = transcriptFile(
      [
        claudeAssistant('첫 메시지'),
        JSON.stringify({
          type: 'user',
          message: { role: 'user', content: 'go' }
        }),
        claudeAssistant(
          '\nmake test 재실행 중\n둘째 줄',
          '2026-09-29T08:01:00.000Z'
        ),
        ''
      ].join('\n')
    );

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result).toEqual({
      text: 'make test 재실행 중',
      at: Date.parse('2026-09-29T08:01:00.000Z')
    });
  });

  test('returns the last Codex agent message', () => {
    const file = transcriptFile(
      [
        codexAgentMessage('검증을 다시 돌립니다'),
        JSON.stringify({
          type: 'event_msg',
          payload: { type: 'user_message', message: '이어가자' }
        }),
        ''
      ].join('\n')
    );

    const result = readLastAssistantMessage({ provider: 'codex', file });

    expect(result).toEqual({
      text: '검증을 다시 돌립니다',
      at: Date.parse('2026-09-29T08:05:00.000Z')
    });
  });

  test('cuts the line to 160 characters', () => {
    const file = transcriptFile(`${claudeAssistant('가'.repeat(200))}\n`);

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result?.text).toBe('가'.repeat(160));
  });

  test('returns null when the tail has no assistant message', () => {
    const file = transcriptFile(
      `${JSON.stringify({ type: 'user', message: { content: 'hi' } })}\n`
    );

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result).toBeNull();
  });

  test('ignores the record cut by the tail boundary', () => {
    const cut = claudeAssistant(`잘린 줄 ${'x'.repeat(PROGRESS_TAIL_BYTES)}`);
    const filler = JSON.stringify({ type: 'user', message: { content: 'y' } });
    const file = transcriptFile(`${cut}\n${filler}\n`);

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result).toBeNull();
  });
});
