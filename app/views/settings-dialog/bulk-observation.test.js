import { describe, expect, test } from 'vitest';
import {
  accountLayerLegacy,
  observationBadge,
  observeAppliedPreset,
  observeKey,
  observeSet
} from './bulk-observation.js';

/**
 * One monitor row with a READ session-defaults layer.
 *
 * @param {string} name
 * @param {Record<string, any>} [values]
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function row(name, values = {}, patch = {}) {
  return {
    root_dir: `/tmp/${name}`,
    name,
    session_defaults: values,
    session_defaults_state: 'ready',
    ...patch
  };
}

describe('observeKey over the session defaults layer (UI-e1ta §3)', () => {
  test('reads one value when every repository holds it', () => {
    const rows = [
      row('a', { impl_effort: 'high' }),
      row('b', { impl_effort: 'high' }),
      row('c', { impl_effort: 'high' })
    ];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('same');
    expect(observation.value).toBe('high');
  });

  test('reads an absence when no repository holds the key', () => {
    const rows = [row('a'), row('b')];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('empty');
    expect(observation.value).toBe(null);
  });

  test('reads a split when a value and an empty value are mixed', () => {
    const rows = [row('a', { impl_effort: 'high' }), row('b')];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('mixed');
    expect(observation.per_repo).toEqual([
      { root_dir: '/tmp/a', name: 'a', value: 'high' },
      { root_dir: '/tmp/b', name: 'b', value: null }
    ]);
  });

  test('never reads a split from a single repository', () => {
    const observation = observeKey(
      [row('a', { impl_effort: 'high' })],
      'impl_effort',
      'session_defaults'
    );

    expect(observation.state).toBe('same');
  });

  test('reads a pending layer as unknown rather than absent', () => {
    const rows = [
      row('a', { impl_effort: 'high' }),
      row('b', {}, { session_defaults_state: 'pending' })
    ];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('pending');
    expect(observation.pending_count).toBe(1);
  });

  test('reads every row of a cold layer as unknown, not as an absence', () => {
    const rows = [
      row('a', {}, { session_defaults_state: 'pending' }),
      row('b', {}, { session_defaults_state: 'pending' })
    ];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('pending');
  });

  test('reads a legacy row with no lookup state as its values', () => {
    const rows = [
      { root_dir: '/tmp/a', name: 'a', session_defaults: {} },
      { root_dir: '/tmp/b', name: 'b', session_defaults: {} }
    ];

    const observation = observeKey(rows, 'impl_effort', 'session_defaults');

    expect(observation.state).toBe('empty');
  });
});

describe('observeKey over the account layer (UI-e1ta §3)', () => {
  test('reads the stored account when both repositories agree', () => {
    const rows = [
      row(
        'a',
        {},
        {
          workspace_accounts: {
            state: 'usable',
            values: { claude_account: 'work@example.com' },
            warnings: []
          }
        }
      ),
      row(
        'b',
        {},
        {
          workspace_accounts: {
            state: 'usable',
            values: { claude_account: 'work@example.com' },
            warnings: []
          }
        }
      )
    ];

    const observation = observeKey(
      rows,
      'claude_account',
      'workspace_accounts'
    );

    expect(observation.state).toBe('same');
    expect(observation.value).toBe('work@example.com');
  });

  test('reads an unusable layer as unknown', () => {
    const rows = [
      row(
        'a',
        {},
        {
          workspace_accounts: { state: 'absent', values: {}, warnings: [] }
        }
      ),
      row(
        'b',
        {},
        {
          workspace_accounts: {
            state: 'unusable',
            values: {},
            warnings: ['kv_read_failed']
          }
        }
      )
    ];

    const observation = observeKey(
      rows,
      'claude_account',
      'workspace_accounts'
    );

    expect(observation.state).toBe('pending');
  });

  test('reads a row with no account projection as unknown', () => {
    const observation = observeKey(
      [row('a'), row('b')],
      'claude_account',
      'workspace_accounts'
    );

    expect(observation.state).toBe('pending');
  });
});

describe('observeSet over the allow list (UI-e1ta §6)', () => {
  test('reads one set when the members match whatever the order', () => {
    const rows = [
      { root_dir: '/tmp/a', name: 'a', accounts: ['b@x', 'a@x'] },
      { root_dir: '/tmp/b', name: 'b', accounts: ['a@x', 'b@x'] }
    ];

    const observation = observeSet(rows, (entry) => entry.accounts);

    expect(observation.state).toBe('same');
    expect(observation.value).toEqual(['b@x', 'a@x']);
  });

  test('reads a split when one member differs', () => {
    const rows = [
      { root_dir: '/tmp/a', name: 'a', accounts: ['a@x'] },
      { root_dir: '/tmp/b', name: 'b', accounts: ['a@x', 'b@x'] }
    ];

    const observation = observeSet(rows, (entry) => entry.accounts);

    expect(observation.state).toBe('mixed');
  });
});

describe('observeAppliedPreset (UI-e1ta §4.1)', () => {
  test('compares the record by id alone', () => {
    const rows = [
      row(
        'a',
        {},
        {
          applied_exec_preset: {
            id: 'p1',
            name: '페이블 기본',
            revision: 3,
            applied_at: 1
          }
        }
      ),
      row(
        'b',
        {},
        {
          applied_exec_preset: {
            id: 'p1',
            name: '옛 이름',
            revision: 9,
            applied_at: 2
          }
        }
      )
    ];

    const observation = observeAppliedPreset(rows);

    expect(observation.state).toBe('same');
    expect(observation.value).toBe('p1');
  });

  test('reads two different ids as a split', () => {
    const rows = [
      row('a', {}, { applied_exec_preset: { id: 'p1' } }),
      row('b', {}, { applied_exec_preset: { id: 'p2' } })
    ];

    const observation = observeAppliedPreset(rows);

    expect(observation.state).toBe('mixed');
  });

  test('reads an absent record on every repository as an absence', () => {
    const rows = [
      row('a', {}, { applied_exec_preset: null }),
      row('b', {}, { applied_exec_preset: null })
    ];

    const observation = observeAppliedPreset(rows);

    expect(observation.state).toBe('empty');
  });
});

describe('observeKey over a legacy account layer (UI-e1ta §8)', () => {
  test('stands legacy rows on 기본값 사용 with nothing to badge', () => {
    const rows = [
      { root_dir: '/tmp/a', name: 'a' },
      { root_dir: '/tmp/b', name: 'b' }
    ];

    const observation = observeKey(
      rows,
      'claude_account',
      'workspace_accounts'
    );

    expect(observation.state).toBe('empty');
    expect(observationBadge(observation)).toBe(null);
  });

  test('holds a current row whose account layer has not landed', () => {
    const rows = [
      { root_dir: '/tmp/a', name: 'a' },
      { root_dir: '/tmp/b', name: 'b', session_defaults_state: 'ready' }
    ];

    const observation = observeKey(
      rows,
      'claude_account',
      'workspace_accounts'
    );

    expect(observation.state).toBe('pending');
  });

  test('reports a mixed selection as not legacy', () => {
    const legacy = accountLayerLegacy([
      { root_dir: '/tmp/a', name: 'a' },
      { root_dir: '/tmp/b', name: 'b', session_defaults_state: 'pending' }
    ]);

    expect(legacy).toBe(false);
  });
});
