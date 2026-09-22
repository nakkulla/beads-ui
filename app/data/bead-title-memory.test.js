import { describe, expect, test } from 'vitest';
import { createBeadTitleMemory } from './bead-title-memory.js';

describe('data/bead-title-memory', () => {
  test('fills a title the next snapshot omits', () => {
    const memory = createBeadTitleMemory();
    memory.fill('/repo', { 'UI-1': '첫 제목', 'UI-2': '둘째' });

    const filled = memory.fill('/repo', { 'UI-2': '둘째' });

    expect(filled).toEqual({ 'UI-1': '첫 제목', 'UI-2': '둘째' });
  });

  test('lets a carried title replace the remembered one', () => {
    const memory = createBeadTitleMemory();
    memory.fill('/repo', { 'UI-1': '옛 제목' });
    memory.fill('/repo', { 'UI-1': '새 제목' });

    const filled = memory.fill('/repo', {});

    expect(filled).toEqual({ 'UI-1': '새 제목' });
  });

  test('returns null when the snapshot omits nothing it remembers', () => {
    const memory = createBeadTitleMemory();
    memory.fill('/repo', { 'UI-1': '제목' });

    const filled = memory.fill('/repo', { 'UI-1': '제목', 'UI-2': '둘째' });

    expect(filled).toBeNull();
  });

  test('keeps titles of different repos apart', () => {
    const memory = createBeadTitleMemory();
    memory.fill('/repo-a', { 'UI-1': 'A 제목' });

    const filled = memory.fill('/repo-b', undefined);

    expect(filled).toBeNull();
  });

  test('ignores a snapshot without a root_dir', () => {
    const memory = createBeadTitleMemory();
    memory.fill('', { 'UI-1': '제목' });

    const filled = memory.fill('', {});

    expect(filled).toBeNull();
  });
});
