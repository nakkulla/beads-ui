import { describe, expect, test } from 'vitest';
import {
  formatAttemptTuple,
  formatContinuationLineage
} from './attempt-display.js';

describe('attempt display', () => {
  test('formats the actual tuple and only labels fast speed', () => {
    const result = formatAttemptTuple({
      runner: 'codex',
      model: 'sol',
      effort: 'ultra',
      speed: 'fast'
    });

    expect(result).toBe('codex · sol · ultra · Fast');
  });

  test('omits unknown legacy tuple fields and default speed', () => {
    const result = formatAttemptTuple({ runner: 'codex', speed: 'default' });

    expect(result).toBe('codex');
  });

  test('labels continuation mode without claiming a legacy provider session', () => {
    const result = formatContinuationLineage({
      resumed_from: 'A-1',
      continuation_mode: 'fresh'
    });

    expect(result).toBe('새 session으로 이어받음 (from A-1)');
  });
});
