import { describe, expect, test } from 'vitest';
import { benchSourceOf, newBenchRunId } from './bench-handlers.js';

describe('newBenchRunId', () => {
  test('produces an id in the contract run-id vocabulary', () => {
    const id = newBenchRunId(() => Date.parse('2026-09-04T10:20:30Z'));

    expect(id).toMatch(/^[A-Za-z0-9._-]+$/);
    expect(id.startsWith('bench-20260904102030')).toBe(true);
  });

  test('does not repeat within one millisecond', () => {
    const at = () => 1700000000000;

    expect(newBenchRunId(at)).not.toBe(newBenchRunId(at));
  });
});

describe('benchSourceOf', () => {
  test('keeps the description byte for byte', () => {
    const source = benchSourceOf({
      id: 'UI-a',
      title: '제목',
      description: '본문\n\n마지막 줄\n',
      metadata: { route: 'quick_fix', quick_fix_review: 'self@abc' }
    });

    expect(source.description).toBe('본문\n\n마지막 줄\n');
    expect(source.quick_fix_review).toBe('self@abc');
    expect(source.route).toBe('quick_fix');
  });

  test('reads an absent body as an empty one rather than throwing', () => {
    const source = benchSourceOf({ id: 'UI-a', title: '제목' });

    expect(source.description).toBe('');
    expect(source.quick_fix_review).toBe('');
  });
});
