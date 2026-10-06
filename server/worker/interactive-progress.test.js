import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import {
  PROGRESS_TAIL_BYTES,
  parseConversationResult,
  readLastAssistantMessage
} from './interactive-progress.js';

describe('parseConversationResult', () => {
  test.each([
    ['인계 · 범위 확장 승인', 'handoff'],
    ['인수 · 내가 끝까지 간다', 'takeover'],
    ['보류 · 내일 본다', 'hold']
  ])('reads %s as a %s result line', (line, kind) => {
    const result = parseConversationResult(line);

    expect(result).toEqual({ kind, line });
  });

  test('returns null for a prose question', () => {
    const result = parseConversationResult('어느 쪽으로 갈까요?');

    expect(result).toBeNull();
  });

  test('ignores a result word that is not the line prefix', () => {
    const result = parseConversationResult('다음 턴에 인계 · 하겠습니다');

    expect(result).toBeNull();
  });
});

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

/**
 * @param {string} message
 * @param {string} [phase]
 */
function codexAgentMessage(message, phase = 'final_answer') {
  return JSON.stringify({
    timestamp: '2026-09-29T08:05:00.000Z',
    type: 'event_msg',
    payload: {
      type: 'item_completed',
      item: {
        type: 'AgentMessage',
        content: [{ type: 'Text', text: message }],
        phase
      }
    }
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
      at: Date.parse('2026-09-29T08:01:00.000Z'),
      first_line: 'make test 재실행 중',
      excerpt: 'make test 재실행 중 둘째 줄'
    });
  });

  test('returns the last Codex agent message', () => {
    const file = transcriptFile(
      [
        codexAgentMessage('검증을 다시 돌립니다'),
        JSON.stringify({
          type: 'event_msg',
          payload: {
            type: 'item_completed',
            item: {
              type: 'UserMessage',
              content: [{ type: 'text', text: '이어가자' }]
            }
          }
        }),
        ''
      ].join('\n')
    );

    const result = readLastAssistantMessage({ provider: 'codex', file });

    expect(result).toEqual({
      text: '검증을 다시 돌립니다',
      at: Date.parse('2026-09-29T08:05:00.000Z'),
      first_line: '검증을 다시 돌립니다',
      excerpt: '검증을 다시 돌립니다'
    });
  });

  test('reads a Codex handoff result after commentary and reasoning', () => {
    const file = transcriptFile(
      [
        codexAgentMessage('확인 중입니다', 'commentary'),
        JSON.stringify({
          type: 'event_msg',
          payload: {
            type: 'item_completed',
            item: { type: 'Reasoning', summary_text: ['진행 조건 확인'] }
          }
        }),
        codexAgentMessage('인계 · 승인 범위에서 계속\n확인 완료'),
        ''
      ].join('\n')
    );

    const result = readLastAssistantMessage({ provider: 'codex', file });

    expect(result?.first_line).toBe('인계 · 승인 범위에서 계속');
    expect(parseConversationResult(result?.first_line)).toEqual({
      kind: 'handoff',
      line: '인계 · 승인 범위에서 계속'
    });
  });

  test('cuts the line to 160 characters', () => {
    const file = transcriptFile(`${claudeAssistant('가'.repeat(200))}\n`);

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result?.text).toBe('가'.repeat(160));
  });

  test('keeps the first line whole for a long result line', () => {
    const line = `인계 · ${'결'.repeat(300)}`;
    const file = transcriptFile(`${claudeAssistant(`${line}\n근거`)}\n`);

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(result?.first_line).toBe(line);
  });

  test('collapses whitespace and cuts the excerpt to 400 code points', () => {
    const file = transcriptFile(
      `${claudeAssistant(`질문\n\n  ${'😀'.repeat(500)}`)}\n`
    );

    const result = readLastAssistantMessage({ provider: 'claude', file });

    expect(Array.from(result?.excerpt || '')).toHaveLength(400);
    expect(result?.excerpt.startsWith('질문 😀')).toBe(true);
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
