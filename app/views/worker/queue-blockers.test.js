import { describe, expect, test } from 'vitest';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { buildLanes } from './lane-model.js';
import {
  dependentsChip,
  deriveWorkerBlockers,
  predecessorChip,
  releasedChip
} from './queue-blockers.js';

/**
 * @param {Partial<import('./queue-overlaps.js').LaneMember>} over
 * @returns {import('./queue-overlaps.js').LaneMember}
 */
function member(over) {
  const id = over.id || 'A-1';
  return {
    id,
    title: id,
    location_label: '#1',
    kind: 'parallel',
    lane_id: null,
    ...over
  };
}

describe('deriveWorkerBlockers (UI-anna §5.1)', () => {
  test('names only the blocker on the chip label', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), [
      member({ id: 'A-1' })
    ]);

    expect(chips.get('A-2')?.[0].label).toBe('⛓ blocked: A-1');
  });

  test('reads the blocker location from the lane member list', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), [
      member({ id: 'A-1', kind: 'running', location_label: '실행중' })
    ]);

    expect(chips.get('A-2')?.[0].title).toBe(
      '이 이슈는 A-1가 close될 때까지 출발하지 않는다 (실행중)'
    );
  });

  test('folds a blocker outside this tab into 미적재', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-9']]]), [
      member({ id: 'A-1' })
    ]);

    expect(chips.get('A-2')?.[0].title).toBe(
      '이 이슈는 A-9가 close될 때까지 출발하지 않는다 (미적재)'
    );
  });

  test('marks a blocker from another rig as foreign', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['B-1']]]), []);

    expect(chips.get('A-2')?.[0].foreign).toBe(true);
  });

  test('leaves a same-rig blocker unmarked', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), []);

    expect(chips.get('A-2')?.[0].foreign).toBe(undefined);
  });

  test('keeps the first lane member when one bead stands twice', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), [
      member({ id: 'A-1', kind: 'running', location_label: '실행중' }),
      member({ id: 'A-1', kind: 'pr_wait', location_label: 'PR 대기' })
    ]);

    expect(chips.get('A-2')?.[0].title).toContain('(실행중)');
  });

  test('draws one chip per blocker id', () => {
    const chips = deriveWorkerBlockers(new Map([['A-3', ['A-1', 'A-2']]]), []);

    expect(chips.get('A-3')?.map((chip) => chip.id)).toEqual(['A-1', 'A-2']);
  });

  test('keeps no entry for a bead whose blocker list is empty', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', []]]), []);

    expect(chips.size).toBe(0);
  });

  test('drops a malformed blocker id rather than naming it', () => {
    const chips = deriveWorkerBlockers(
      new Map([['A-2', /** @type {any} */ ([''])]]),
      []
    );

    expect(chips.size).toBe(0);
  });

  test('answers an empty map when no source carried anything', () => {
    const chips = deriveWorkerBlockers(new Map(), [member({ id: 'A-1' })]);

    expect(chips.size).toBe(0);
  });
});

describe('두 탭의 blocked 칩이 같은 문장을 낸다 (UI-anna §5.1)', () => {
  const WS = '/tmp/example/repo-a';

  /**
   * The monitor's chip for `A-2` blocked by `blocker_id`, projected from a
   * snapshot where the blocker stands in the same waiting lane.
   *
   * @param {string} blocker_id
   * @returns {any}
   */
  function monitorChip(blocker_id) {
    const lanes = buildLanes(
      [
        {
          root_dir: WS,
          name: 'repo-a',
          revision: 1,
          queue: [{ bead_id: blocker_id }, { bead_id: 'A-2' }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [],
          attempts: {},
          pr_observations: {},
          bead_titles: {},
          bead_blocked_by: { 'A-2': [blocker_id] }
        }
      ],
      [
        {
          root_dir: WS,
          name: 'repo-a',
          auto_advance: false,
          auto_merge: false,
          slots: 1,
          revision: 1,
          issue_prefix: 'A'
        }
      ]
    );
    return lanes.queue.find((item) => item.id === 'A-2')?.dependency_chips
      ?.predecessors?.[0];
  }

  test('gives the same label in both tabs', () => {
    const worker = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), [
      member({ id: 'A-1' })
    ]).get('A-2')?.[0];

    expect(worker?.label).toBe(monitorChip('A-1')?.label);
  });

  test('gives the same tooltip sentence frame in both tabs', () => {
    const worker = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), [
      member({ id: 'A-1' })
    ]).get('A-2')?.[0];

    // 괄호 안 위치는 비교하지 않는다 — 워커 탭이 볼 수 없는 위치는 `미적재`로
    // 접히고, 그 경계는 §5.1이 정한다.
    const frame = (/** @type {string} */ title) =>
      title.replace(/\(.*\)$/, '').trim();
    expect(frame(worker?.title || '')).toBe(
      frame(monitorChip('A-1')?.title || '')
    );
  });

  test('judges foreign the same way in both tabs', () => {
    const worker = deriveWorkerBlockers(new Map([['A-2', ['B-1']]]), []).get(
      'A-2'
    )?.[0];

    expect(worker?.foreign).toBe(monitorChip('B-1')?.foreign);
  });
});

describe('deriveWorkerBlockers 칩 단위 openable (UI-u6zf §5.2)', () => {
  const OWNER_WS = '/repos/dotfiles';

  test('opens a same-repo blocker in the current workspace', () => {
    const chip = deriveWorkerBlockers(new Map([['A-2', ['A-1']]]), []).get(
      'A-2'
    )?.[0];

    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(undefined);
  });

  test('carries the owning workspace of a foreign blocker', () => {
    const chip = deriveWorkerBlockers(new Map([['A-2', ['B-1']]]), [], {
      'B-1': OWNER_WS
    }).get('A-2')?.[0];

    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(OWNER_WS);
  });

  test('leaves a foreign blocker of unknown owner display-only', () => {
    const chip = deriveWorkerBlockers(new Map([['A-2', ['B-1']]]), []).get(
      'A-2'
    )?.[0];

    expect(chip?.openable).toBe(undefined);
    expect(chip?.root_dir).toBe(undefined);
  });

  test('splits openability chip by chip inside one bead', () => {
    const chips = deriveWorkerBlockers(new Map([['A-2', ['A-1', 'B-1']]]), [], {
      'B-9': OWNER_WS
    }).get('A-2');

    expect(chips?.map((chip) => chip.openable)).toEqual([true, undefined]);
  });
});

describe('predecessorChip', () => {
  test('composes the label from the blocker id alone', () => {
    const chip = predecessorChip('A-2', { id: 'A-1', location_label: '#1' });

    expect(chip.label).toBe('⛓ blocked: A-1');
  });

  test('moves the location into the tooltip', () => {
    const chip = predecessorChip('A-2', {
      id: 'A-1',
      location_label: 'PR 대기'
    });

    expect(chip.title).toBe(
      '이 이슈는 A-1가 close될 때까지 출발하지 않는다 (PR 대기)'
    );
  });
});

describe('releasedChip (UI-d13v §5.3)', () => {
  const NOW = 1_700_000_000_000;
  const DAY = 24 * 60 * 60 * 1000;

  test('names the closed blocker on the chip label', () => {
    const chip = releasedChip('A-2', { id: 'A-1', closed_at: NOW - DAY }, NOW);

    expect(chip?.label).toBe('🔓 해제: A-1');
  });

  test('puts the close time in the tooltip', () => {
    const closed_at = NOW - DAY;

    const chip = releasedChip('A-2', { id: 'A-1', closed_at }, NOW);

    expect(chip?.title).toBe(
      `A-1가 ${formatTimestampLocal(closed_at)}에 close되어 이 이슈가 풀렸다`
    );
  });

  test('keeps a release from exactly seven days ago', () => {
    const chip = releasedChip(
      'A-2',
      { id: 'A-1', closed_at: NOW - 7 * DAY },
      NOW
    );

    expect(chip).not.toBeNull();
  });

  test('drops a release older than seven days', () => {
    const chip = releasedChip(
      'A-2',
      { id: 'A-1', closed_at: NOW - 8 * DAY },
      NOW
    );

    expect(chip).toBeNull();
  });

  test('drops an entry without a numeric close time', () => {
    const chip = releasedChip(
      'A-2',
      /** @type {any} */ ({ id: 'A-1', closed_at: 'yesterday' }),
      NOW
    );

    expect(chip).toBeNull();
  });

  test('marks a blocker from another rig as foreign', () => {
    const chip = releasedChip('A-2', { id: 'B-9', closed_at: NOW }, NOW);

    expect(chip?.foreign).toBe(true);
  });

  test('opens a same-repo release without a root_dir', () => {
    const chip = releasedChip('A-2', { id: 'A-1', closed_at: NOW }, NOW);

    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBeUndefined();
  });

  test('opens a foreign release only with its owner workspace', () => {
    const chip = releasedChip(
      'A-2',
      { id: 'B-9', closed_at: NOW, root_dir: '/repo/b' },
      NOW
    );

    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe('/repo/b');
  });

  test('leaves a foreign release without an owner unopenable', () => {
    const chip = releasedChip('A-2', { id: 'B-9', closed_at: NOW }, NOW);

    expect(chip?.openable).toBeUndefined();
  });
});

describe('dependentsChip (UI-d13v §5.3)', () => {
  test('carries the count the label renders', () => {
    const chip = dependentsChip({ count: 3, ids: ['A-2', 'A-3', 'A-4'] });

    expect(chip?.count).toBe(3);
  });

  test('lists the served ids in the tooltip', () => {
    const chip = dependentsChip({ count: 2, ids: ['A-2', 'A-3'] });

    expect(chip?.title).toBe('이 이슈가 close되면 풀리는 이슈: A-2, A-3');
  });

  test('counts the ids the server could not list', () => {
    const chip = dependentsChip({ count: 7, ids: ['A-2', 'A-3'] });

    expect(chip?.title).toBe('이 이슈가 close되면 풀리는 이슈: A-2, A-3 외 5');
  });

  test('draws nothing for a zero count', () => {
    const chip = dependentsChip({ count: 0, ids: [] });

    expect(chip).toBeNull();
  });
});
