import { beforeEach, describe, expect, test } from 'vitest';
import {
  CANDIDATE_SORT_KEY,
  CANDIDATE_SORT_PRESETS,
  applyCandidateSort,
  chainOf,
  flipChainStepDir,
  loadCandidateSort,
  normalizeCandidateSort,
  presetIdOf,
  saveCandidateSort,
  setChainStepKey
} from './candidate-sort.js';

const RECEIPT = 'codex@' + 'a'.repeat(40);

/**
 * @param {string} id
 * @param {Record<string, any>} over
 */
function issue(id, over = {}) {
  return { id, ...over };
}

/**
 * @param {'spec'|'bottleneck'|'created'|'updated'} id
 */
function presetChain(id) {
  return chainOf({ preset: id });
}

describe('candidate sort presets (UI-d13v §4.2)', () => {
  test('orders spec-first then oldest-created for the spec preset', () => {
    expect(presetChain('spec')).toEqual([
      { key: 'spec', dir: 'desc' },
      { key: 'created', dir: 'asc' }
    ]);
  });

  test('orders priority, dependents, released for the bottleneck preset', () => {
    expect(presetChain('bottleneck')).toEqual([
      { key: 'priority', dir: 'asc' },
      { key: 'dependents', dir: 'desc' },
      { key: 'released', dir: 'desc' }
    ]);
  });

  test('orders newest-created then priority for the created preset', () => {
    expect(presetChain('created')).toEqual([
      { key: 'created', dir: 'desc' },
      { key: 'priority', dir: 'asc' }
    ]);
  });

  test('orders newest-updated only for the updated preset', () => {
    expect(presetChain('updated')).toEqual([{ key: 'updated', dir: 'desc' }]);
  });

  test('offers exactly the four presets, spec first', () => {
    expect(CANDIDATE_SORT_PRESETS.map((p) => p.id)).toEqual([
      'spec',
      'bottleneck',
      'created',
      'updated'
    ]);
  });
});

describe('candidate sort migration (UI-d13v §4.3)', () => {
  test('reads the legacy spec string as the spec preset', () => {
    expect(normalizeCandidateSort('spec')).toEqual({ preset: 'spec' });
  });

  test('reads the legacy created string as the created preset', () => {
    expect(normalizeCandidateSort('created')).toEqual({ preset: 'created' });
  });

  test('reads the legacy updated string as the updated preset', () => {
    expect(normalizeCandidateSort('updated')).toEqual({ preset: 'updated' });
  });

  test('reads the retired board string as the default preset', () => {
    expect(normalizeCandidateSort('board')).toEqual({ preset: 'spec' });
  });

  test('reads an unknown string as the default preset', () => {
    expect(normalizeCandidateSort('nonsense')).toEqual({ preset: 'spec' });
  });

  test('reads a missing value as the default preset', () => {
    expect(normalizeCandidateSort(null)).toEqual({ preset: 'spec' });
  });

  test('falls back to the default preset for an unknown step key', () => {
    const stored = { chain: [{ key: 'usage', dir: 'desc' }] };

    expect(normalizeCandidateSort(stored)).toEqual({ preset: 'spec' });
  });

  test('falls back to the default preset for an unknown step direction', () => {
    const stored = { chain: [{ key: 'created', dir: 'sideways' }] };

    expect(normalizeCandidateSort(stored)).toEqual({ preset: 'spec' });
  });

  test('falls back to the default preset for a chain longer than three steps', () => {
    const stored = {
      chain: [
        { key: 'priority', dir: 'asc' },
        { key: 'dependents', dir: 'desc' },
        { key: 'released', dir: 'desc' },
        { key: 'created', dir: 'asc' }
      ]
    };

    expect(normalizeCandidateSort(stored)).toEqual({ preset: 'spec' });
  });

  test('normalizes a chain equal to a preset back to that preset', () => {
    const stored = {
      chain: [
        { key: 'priority', dir: 'asc' },
        { key: 'dependents', dir: 'desc' },
        { key: 'released', dir: 'desc' }
      ]
    };

    expect(normalizeCandidateSort(stored)).toEqual({ preset: 'bottleneck' });
  });

  test('keeps a chain no preset matches as a chain', () => {
    const stored = { chain: [{ key: 'released', dir: 'asc' }] };

    expect(normalizeCandidateSort(stored)).toEqual({
      chain: [{ key: 'released', dir: 'asc' }]
    });
  });

  test('drops the later of two steps carrying the same key', () => {
    const stored = {
      chain: [
        { key: 'released', dir: 'asc' },
        { key: 'released', dir: 'desc' }
      ]
    };

    expect(normalizeCandidateSort(stored)).toEqual({
      chain: [{ key: 'released', dir: 'asc' }]
    });
  });
});

describe('candidate sort storage (UI-d13v §4.3)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('persists a custom chain as JSON', () => {
    saveCandidateSort({ chain: [{ key: 'released', dir: 'asc' }] });

    expect(window.localStorage.getItem(CANDIDATE_SORT_KEY)).toBe(
      '{"chain":[{"key":"released","dir":"asc"}]}'
    );
  });

  test('restores a persisted chain', () => {
    saveCandidateSort({ chain: [{ key: 'released', dir: 'asc' }] });

    expect(loadCandidateSort()).toEqual({
      chain: [{ key: 'released', dir: 'asc' }]
    });
  });

  test('restores a legacy string written by the previous version', () => {
    window.localStorage.setItem(CANDIDATE_SORT_KEY, 'updated');

    expect(loadCandidateSort()).toEqual({ preset: 'updated' });
  });

  test('names the preset of a preset state', () => {
    expect(presetIdOf({ preset: 'created' })).toBe('created');
  });

  test('names no preset for a custom chain', () => {
    expect(presetIdOf({ chain: [{ key: 'released', dir: 'asc' }] })).toBe(null);
  });
});

describe('applyCandidateSort (UI-d13v §4.1)', () => {
  test('puts a published spec ahead of a draft one under the spec preset', () => {
    const list = [
      issue('draft', { created_at: 100, spec_id: 'docs/a.md', metadata: {} }),
      issue('published', {
        created_at: 200,
        spec_id: 'docs/b.md',
        metadata: { spec_review: RECEIPT }
      })
    ];

    const sorted = applyCandidateSort(list, { preset: 'spec' });

    expect(sorted.map((i) => i.id)).toEqual(['published', 'draft']);
  });

  test('orders the longest-waiting first inside the spec group', () => {
    const meta = { spec_review: RECEIPT };
    const list = [
      issue('new', { created_at: 300, spec_id: 'docs/a.md', metadata: meta }),
      issue('old', { created_at: 100, spec_id: 'docs/a.md', metadata: meta })
    ];

    const sorted = applyCandidateSort(list, { preset: 'spec' });

    expect(sorted.map((i) => i.id)).toEqual(['old', 'new']);
  });

  test('sorts an issue without updated_at last under the updated preset', () => {
    const list = [
      issue('none', { created_at: 100 }),
      issue('touched', { created_at: 200, updated_at: 1000 })
    ];

    const sorted = applyCandidateSort(list, { preset: 'updated' });

    expect(sorted.map((i) => i.id)).toEqual(['touched', 'none']);
  });

  test('ranks a blocked issue by the chain under the bottleneck preset', () => {
    const list = [
      issue('blocked_p0', { priority: 0, created_at: 100 }),
      issue('ready_p3', { priority: 3, created_at: 200 })
    ];

    const sorted = applyCandidateSort(list, { preset: 'bottleneck' });

    expect(sorted.map((i) => i.id)).toEqual(['blocked_p0', 'ready_p3']);
  });

  test('ranks a blocked issue by the chain under a custom chain', () => {
    const list = [
      issue('blocked_new', { created_at: 300 }),
      issue('ready_old', { created_at: 100 })
    ];

    const sorted = applyCandidateSort(list, {
      chain: [{ key: 'created', dir: 'desc' }]
    });

    expect(sorted.map((i) => i.id)).toEqual(['blocked_new', 'ready_old']);
  });

  test('interleaves blocked and ready issues by the chain alone', () => {
    const list = [
      issue('blocked_new', { created_at: 300 }),
      issue('blocked_old', { created_at: 100 }),
      issue('ready', { created_at: 200 })
    ];

    const sorted = applyCandidateSort(list, {
      chain: [{ key: 'created', dir: 'desc' }]
    });

    expect(sorted.map((i) => i.id)).toEqual([
      'blocked_new',
      'ready',
      'blocked_old'
    ]);
  });

  test('leaves the input array untouched', () => {
    const list = [
      issue('B', { created_at: 100 }),
      issue('A', { created_at: 200 })
    ];

    applyCandidateSort(list, { preset: 'created' });

    expect(list.map((i) => i.id)).toEqual(['B', 'A']);
  });
});

describe('chain editing (UI-d13v §4.4)', () => {
  test('starts a freshly picked key at its default direction', () => {
    const chain = [{ key: 'created', dir: 'asc' }];

    const next = setChainStepKey(/** @type {any} */ (chain), 1, 'dependents');

    expect(next).toEqual([
      { key: 'created', dir: 'asc' },
      { key: 'dependents', dir: 'desc' }
    ]);
  });

  test('keeps the direction when the same key is re-picked', () => {
    const chain = [{ key: 'created', dir: 'desc' }];

    const next = setChainStepKey(/** @type {any} */ (chain), 0, 'created');

    expect(next).toEqual([{ key: 'created', dir: 'desc' }]);
  });

  test('truncates the chain when a step is set to 없음', () => {
    const chain = [
      { key: 'priority', dir: 'asc' },
      { key: 'created', dir: 'asc' }
    ];

    const next = setChainStepKey(/** @type {any} */ (chain), 1, '');

    expect(next).toEqual([{ key: 'priority', dir: 'asc' }]);
  });

  test('collapses a later step that repeats an earlier key', () => {
    const chain = [
      { key: 'priority', dir: 'asc' },
      { key: 'created', dir: 'asc' }
    ];

    const next = setChainStepKey(/** @type {any} */ (chain), 1, 'priority');

    expect(next).toEqual([{ key: 'priority', dir: 'asc' }]);
  });

  test('drops a later duplicate when an earlier step takes its key', () => {
    const chain = [
      { key: 'priority', dir: 'asc' },
      { key: 'created', dir: 'asc' }
    ];

    const next = setChainStepKey(/** @type {any} */ (chain), 0, 'created');

    expect(next).toEqual([{ key: 'created', dir: 'asc' }]);
  });

  test('flips one step direction and leaves the others alone', () => {
    const chain = [
      { key: 'priority', dir: 'asc' },
      { key: 'created', dir: 'asc' }
    ];

    const next = flipChainStepDir(/** @type {any} */ (chain), 1);

    expect(next).toEqual([
      { key: 'priority', dir: 'asc' },
      { key: 'created', dir: 'desc' }
    ]);
  });
});
