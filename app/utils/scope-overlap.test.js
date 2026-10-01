import { describe, expect, test } from 'vitest';
import {
  normalizeScopePrefix,
  overlapPrefixes,
  scopeItemsOverlap,
  scopeSourceOf,
  sharesScopeSource
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

describe('scopeSourceOf (UI-ruwu §4)', () => {
  test('reads the spec first and the plan second', () => {
    const source = scopeSourceOf(['docs/spec.md', 'plans/p.md']);

    expect(source).toEqual({
      spec_path: 'docs/spec.md',
      plan_path: 'plans/p.md'
    });
  });

  test('leaves the plan empty when only a spec was read', () => {
    const source = scopeSourceOf(['docs/spec.md']);

    expect(source).toEqual({ spec_path: 'docs/spec.md', plan_path: '' });
  });

  test('leaves both empty for a description-sourced declaration', () => {
    expect(scopeSourceOf([])).toEqual({ spec_path: '', plan_path: '' });
    expect(scopeSourceOf(undefined)).toEqual({ spec_path: '', plan_path: '' });
  });
});

describe('sharesScopeSource (UI-ruwu §4)', () => {
  test('matches two issues of the same spec', () => {
    const shared = sharesScopeSource(
      { spec_path: 'docs/spec.md', plan_path: 'plans/a.md' },
      { spec_path: 'docs/spec.md', plan_path: 'plans/b.md' }
    );

    expect(shared).toBe(true);
  });

  test('matches two issues of the same plan under different specs', () => {
    const shared = sharesScopeSource(
      { spec_path: 'docs/a.md', plan_path: 'plans/p.md' },
      { spec_path: 'docs/b.md', plan_path: 'plans/p.md' }
    );

    expect(shared).toBe(true);
  });

  test('keeps a pair of different specs and different plans apart', () => {
    const shared = sharesScopeSource(
      { spec_path: 'docs/a.md', plan_path: 'plans/p.md' },
      { spec_path: 'docs/b.md', plan_path: 'plans/q.md' }
    );

    expect(shared).toBe(false);
  });

  test('never matches on two empty paths', () => {
    const shared = sharesScopeSource(
      { spec_path: '', plan_path: '' },
      { spec_path: '', plan_path: '' }
    );

    expect(shared).toBe(false);
  });

  test('never matches when a side names no source', () => {
    const shared = sharesScopeSource({}, { spec_path: 'docs/a.md' });

    expect(shared).toBe(false);
  });
});
