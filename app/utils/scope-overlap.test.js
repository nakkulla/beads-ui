import { describe, expect, test } from 'vitest';
import {
  normalizeScopePrefix,
  overlapPrefixes,
  scopeItemsOverlap
} from './scope-overlap.js';

describe('scopeItemsOverlap (UI-t4zy §3.3, moved by UI-qm12 §5.1)', () => {
  test('treats identical items as overlapping', () => {
    const overlap = scopeItemsOverlap('server/worker', 'server/worker');

    expect(overlap).toBe(true);
  });

  test('ignores a trailing slash on either side', () => {
    const overlap = scopeItemsOverlap(
      'server/worker/',
      'server/worker/queue.js'
    );

    expect(overlap).toBe(true);
  });

  test('refuses a prefix that stops mid-segment', () => {
    const overlap = scopeItemsOverlap('server/worker', 'server/worker-x.js');

    expect(overlap).toBe(false);
  });

  test('overlaps a directory with a file below it in either order', () => {
    const forward = scopeItemsOverlap(
      'app/views',
      'app/views/monitor/index.js'
    );
    const backward = scopeItemsOverlap(
      'app/views/monitor/index.js',
      'app/views'
    );

    expect([forward, backward]).toEqual([true, true]);
  });
});

describe('overlapPrefixes (UI-qm12 §5.1)', () => {
  test('adopts the longer item of each colliding pair', () => {
    const prefixes = overlapPrefixes(['server/'], ['server/worker/queue.js']);

    expect(prefixes).toEqual(['server/worker/queue.js']);
  });

  test('returns an empty list when nothing collides', () => {
    const prefixes = overlapPrefixes(['app/views'], ['server/worker']);

    expect(prefixes).toEqual([]);
  });

  test('dedupes and sorts the adopted prefixes lexicographically', () => {
    const prefixes = overlapPrefixes(
      ['server/', 'app/views/worker'],
      ['server/worker/queue.js', 'app/views', 'server/worker/queue.js']
    );

    expect(prefixes).toEqual(['app/views/worker', 'server/worker/queue.js']);
  });

  test('answers empty for an empty declaration', () => {
    const prefixes = overlapPrefixes([], ['server/worker']);

    expect(prefixes).toEqual([]);
  });
});

describe('normalizeScopePrefix', () => {
  test('strips every trailing slash', () => {
    const normalized = normalizeScopePrefix('server/worker///');

    expect(normalized).toBe('server/worker');
  });
});
