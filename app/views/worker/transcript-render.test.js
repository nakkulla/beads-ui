import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';
import { diffCounts, parseTranscript } from './transcript-render.js';

/**
 * Load a real runner fixture as an array of raw parsed jsonl objects. Vitest
 * runs from the repo/worktree root, so the fixtures resolve off `process.cwd()`.
 *
 * @param {string} name
 * @returns {unknown[]}
 */
function loadFixture(name) {
  const file = path.resolve(process.cwd(), 'server/worker/__fixtures__', name);
  const raw = readFileSync(file, 'utf8');
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => JSON.parse(l));
}

describe('parseTranscript — claude-tools.jsonl (real fixture)', () => {
  const lines = parseTranscript(loadFixture('claude-tools.jsonl'));

  test('classifies a Read tool line with its path', () => {
    const read = lines.find((l) => l.kind === 'tool' && l.tool === 'Read');
    expect(read).toBeTruthy();
    expect(read?.icon).toBe('📖');
    expect(read?.path).toContain('sample.txt');
    expect(read?.expandable).toBe(true);
  });

  test('classifies a Bash tool line with command + paired result', () => {
    const bash = lines.find((l) => l.kind === 'tool' && l.tool === 'Bash');
    expect(bash).toBeTruthy();
    expect(bash?.icon).toBe('⚡');
    expect(bash?.command).toContain('wc -l');
    // The user tool_result was paired back onto the Bash line.
    expect(typeof bash?.result).toBe('string');
    expect(bash?.result && bash.result.length).toBeGreaterThan(0);
  });

  test('classifies assistant text lines (thinking dropped)', () => {
    const asst = lines.filter((l) => l.kind === 'assistant');
    expect(asst.length).toBeGreaterThanOrEqual(1);
    expect(asst.some((l) => (l.text || '').includes('read sample.txt'))).toBe(
      true
    );
  });

  test('classifies the terminal result line as success', () => {
    const result = lines.filter((l) => l.kind === 'result');
    expect(result).toHaveLength(1);
    expect(result[0].success).toBe(true);
    expect(result[0].text).toBe('DONE');
  });

  test('drops system/thinking noise (no assistant line is empty)', () => {
    expect(lines.every((l) => l.kind !== 'assistant' || !!l.text)).toBe(true);
  });
});

describe('parseTranscript — claude-success.jsonl (real fixture)', () => {
  const lines = parseTranscript(loadFixture('claude-success.jsonl'));

  test('has assistant text and one success result', () => {
    expect(lines.some((l) => l.kind === 'assistant')).toBe(true);
    const result = lines.filter((l) => l.kind === 'result');
    expect(result).toHaveLength(1);
    expect(result[0].success).toBe(true);
  });
});

describe('parseTranscript — codex-success.jsonl (real fixture)', () => {
  const lines = parseTranscript(loadFixture('codex-success.jsonl'));

  test('maps agent_message → assistant text and turn.completed → result', () => {
    const asst = lines.find((l) => l.kind === 'assistant');
    expect(asst?.text).toBe('pong');
    const result = lines.filter((l) => l.kind === 'result');
    expect(result).toHaveLength(1);
    expect(result[0].success).toBe(true);
  });
});

describe('parseTranscript — codex-failure.jsonl (real fixture)', () => {
  const lines = parseTranscript(loadFixture('codex-failure.jsonl'));

  test('classifies error lines from item error / error / turn.failed', () => {
    const errors = lines.filter((l) => l.kind === 'error');
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(
      errors.some((l) => (l.text || '').includes('gpt-5.1-codex-mini'))
    ).toBe(true);
  });

  test('produces no success result line for a failed turn', () => {
    expect(lines.some((l) => l.kind === 'result' && l.success)).toBe(false);
  });
});

describe('parseTranscript — synthetic line types (spec §5.6)', () => {
  test('reclassifies a gate-receipt assistant text into a gate line', () => {
    const lines = parseTranscript([
      {
        type: 'assistant',
        message: {
          content: [
            { type: 'text', text: '✓ spec 게이트 — codex APPROVE · 14:03' }
          ]
        }
      }
    ]);
    expect(lines).toHaveLength(1);
    expect(lines[0].kind).toBe('gate');
    expect(lines[0].gate).toBe('spec');
    expect(lines[0].reviewer).toBe('codex');
    expect(lines[0].verdict).toBe('APPROVE');
    expect(lines[0].time).toBe('14:03');
  });

  test('reclassifies a Phase heading into a phase separator', () => {
    const lines = parseTranscript([
      {
        type: 'assistant',
        message: {
          content: [{ type: 'text', text: 'Phase 2/4 · 토큰 발급 경로' }]
        }
      }
    ]);
    expect(lines[0].kind).toBe('phase');
    expect(lines[0].text).toContain('Phase 2/4');
  });

  test('computes Edit +added −removed diff counts', () => {
    const lines = parseTranscript([
      {
        type: 'assistant',
        message: {
          content: [
            {
              type: 'tool_use',
              id: 't1',
              name: 'Edit',
              input: {
                file_path: '/a/b.js',
                old_string: 'one\ntwo\nthree',
                new_string: 'one\nTWO\nthree\nfour'
              }
            }
          ]
        }
      }
    ]);
    expect(lines[0].kind).toBe('tool');
    expect(lines[0].tool).toBe('Edit');
    expect(lines[0].path).toBe('/a/b.js');
    // 'TWO' + 'four' added; 'two' removed.
    expect(lines[0].added).toBe(2);
    expect(lines[0].removed).toBe(1);
  });

  test('diffCounts is a pure multiset line difference', () => {
    expect(diffCounts('', 'a\nb')).toEqual({ added: 2, removed: 0 });
    expect(diffCounts('a\nb', '')).toEqual({ added: 0, removed: 2 });
    expect(diffCounts('a\nb', 'a\nb')).toEqual({ added: 0, removed: 0 });
  });
});
