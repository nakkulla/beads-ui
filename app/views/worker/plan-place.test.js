import { describe, expect, test, vi } from 'vitest';
import {
  createPlanSkipMemory,
  placePlanFromPopup,
  planDefaultLane,
  planPlaceLanesOf,
  planPlaceToast
} from './plan-place.js';

describe('planPlaceLanesOf (UI-ruwu §3 레인 선택)', () => {
  const QUEUE = {
    serial_lane_count: 2,
    serial_lanes: [
      { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] },
      { id: 's2', entries: [] },
      { id: 's3', entries: [{ bead_id: 'A-9' }] }
    ],
    queue: [{ bead_id: 'A-5' }]
  };

  test('offers the configured serial lanes with the beads waiting in them', () => {
    const lanes = planPlaceLanesOf(QUEUE);

    expect(lanes).toEqual([
      { id: 's1', label: '직렬 1', ids: ['A-1', 'A-2'] },
      { id: 's2', label: '직렬 2', ids: [] }
    ]);
  });

  test('never offers the parallel lane', () => {
    const lanes = planPlaceLanesOf(QUEUE);

    expect(lanes.map((lane) => lane.id)).not.toContain('parallel');
  });

  test('answers no lane for a queue without serial lanes', () => {
    expect(
      planPlaceLanesOf({ serial_lane_count: 0, serial_lanes: [] })
    ).toEqual([]);
  });

  test('answers no lane for a missing queue', () => {
    expect(planPlaceLanesOf(null)).toEqual([]);
  });
});

describe('planDefaultLane (UI-ruwu §3 레인 선택)', () => {
  const LANES = [
    { id: 's1', label: '직렬 1', ids: ['A-9'] },
    { id: 's2', label: '직렬 2', ids: ['A-1'] }
  ];

  test('picks the lane where the first member already waits', () => {
    expect(planDefaultLane('A-1', LANES)).toBe('s2');
  });

  test('falls back to the first serial lane', () => {
    expect(planDefaultLane('A-404', LANES)).toBe('s1');
  });

  test('answers an empty id without any lane', () => {
    expect(planDefaultLane('A-1', [])).toBe('');
  });
});

describe('planPlaceToast (UI-ruwu §3)', () => {
  test('counts the placed issues', () => {
    const toast = planPlaceToast({
      applied: true,
      placed: ['A-1', 'A-2'],
      skipped: []
    });

    expect(toast).toEqual({ text: 'plan 배치: 2개 추가', type: 'success' });
  });

  test('names each skipped issue with its reason', () => {
    const toast = planPlaceToast({
      applied: true,
      placed: ['A-2'],
      skipped: [
        { id: 'A-1', reason: 'worker-ineligible' },
        { id: 'A-3', reason: 'spec_missing' }
      ]
    });

    expect(toast).toEqual({
      text: 'plan 배치: 1개 추가 · 건너뜀 A-1(worker-ineligible), A-3(spec_missing)',
      type: 'warning'
    });
  });

  test('tells the user to re-read the list on a conflict', () => {
    const toast = planPlaceToast({ applied: false, conflict: true });

    expect(toast.text).toContain('목록을 다시 읽고');
    expect(toast.type).toBe('error');
  });

  test.each([
    ['no_eligible', '배치할 수 있는 이슈가 없습니다'],
    ['plan_group_not_found', 'plan 묶음을 찾지 못했습니다'],
    ['snapshot_unavailable', '목록을 아직 읽지 못했습니다'],
    ['member_present', '일부 이슈가 방금 큐에 들어갔습니다']
  ])('says what %s means', (reason, sentence) => {
    const toast = planPlaceToast({ applied: false, reason, skipped: [] });

    expect(toast.text).toContain(sentence);
  });

  test('keeps the skipped reasons on a refusal that placed nothing', () => {
    const toast = planPlaceToast({
      applied: false,
      reason: 'no_eligible',
      skipped: [{ id: 'A-1', reason: 'spec_missing' }]
    });

    expect(toast.text).toContain('건너뜀 A-1(spec_missing)');
  });

  test('echoes an unknown refusal reason', () => {
    expect(planPlaceToast({ applied: false, reason: 'rejected' }).text).toBe(
      'plan 배치 거부: rejected'
    );
  });
});

describe('placePlanFromPopup (UI-ruwu §3)', () => {
  /**
   * @param {Record<string, any>} [over]
   */
  function input(over = {}) {
    return {
      transport: vi.fn().mockResolvedValue({
        applied: true,
        conflict: false,
        placed: ['A-1'],
        skipped: []
      }),
      showToast: vi.fn(),
      memory: createPlanSkipMemory(),
      root_dir: '/repo/a',
      plan_path: 'plans/p.md',
      lane: 's1',
      revision: () => 4,
      adopt: vi.fn(),
      ...over
    };
  }

  test('always sends the repository, plan, lane and revision', async () => {
    const args = input();

    await placePlanFromPopup(args);

    expect(args.transport).toHaveBeenCalledWith('worker-queue-place-plan', {
      root_dir: '/repo/a',
      plan_path: 'plans/p.md',
      lane: 's1',
      expected_revision: 4
    });
  });

  test('refuses a parallel or empty lane without sending', async () => {
    const args = input({ lane: 'parallel' });

    const reply = await placePlanFromPopup(args);

    expect(reply).toBeNull();
    expect(args.transport).not.toHaveBeenCalled();
  });

  test('refuses an empty repository without sending', async () => {
    const args = input({ root_dir: '' });

    await placePlanFromPopup(args);

    expect(args.transport).not.toHaveBeenCalled();
  });

  test('adopts the reply queue before the next send', async () => {
    const reply = {
      applied: true,
      placed: [],
      skipped: [],
      queue: { revision: 5 }
    };
    const args = input({ transport: vi.fn().mockResolvedValue(reply) });

    await placePlanFromPopup(args);

    expect(args.adopt).toHaveBeenCalledWith(reply);
  });

  test('retries a conflict once with the re-read revision', async () => {
    let revision = 4;
    const replies = [
      { applied: false, conflict: true, placed: [], skipped: [], queue: {} },
      { applied: true, conflict: false, placed: ['A-1'], skipped: [] }
    ];
    const args = input({
      transport: vi.fn(async () => replies.shift()),
      revision: () => revision,
      adopt: () => {
        revision = 9;
      }
    });

    await placePlanFromPopup(args);

    expect(
      args.transport.mock.calls.map((call) => call[1].expected_revision)
    ).toEqual([4, 9]);
    expect(args.showToast).toHaveBeenCalledWith(
      'plan 배치: 1개 추가',
      'success',
      4000
    );
  });

  test('stops after one retry when the conflict stands', async () => {
    const stale = { applied: false, conflict: true, placed: [], skipped: [] };
    const args = input({ transport: vi.fn().mockResolvedValue(stale) });

    await placePlanFromPopup(args);

    expect(args.transport).toHaveBeenCalledTimes(2);
  });

  test('remembers the skipped issues of the reply per repo and plan', async () => {
    const skipped = [{ id: 'A-1', reason: 'worker-ineligible' }];
    const args = input({
      transport: vi
        .fn()
        .mockResolvedValue({ applied: true, placed: ['A-2'], skipped })
    });

    await placePlanFromPopup(args);

    expect(args.memory.get('/repo/a', 'plans/p.md')).toEqual(skipped);
    expect(args.memory.get('/repo/b', 'plans/p.md')).toEqual([]);
  });

  test('ignores a second click while the first is in flight', async () => {
    /** @type {(value: any) => void} */
    let resolve = () => {};
    const args = input({
      transport: vi.fn(
        () =>
          new Promise((done) => {
            resolve = done;
          })
      )
    });

    const first = placePlanFromPopup(args);
    const second = await placePlanFromPopup(args);
    resolve({ applied: true, placed: [], skipped: [] });
    await first;

    expect(second).toBeNull();
    expect(args.transport).toHaveBeenCalledTimes(1);
  });

  test('toasts a transport failure and frees the click guard', async () => {
    const args = input({
      transport: vi.fn().mockRejectedValue(new Error('연결 끊김'))
    });

    await placePlanFromPopup(args);

    expect(args.showToast).toHaveBeenCalledWith('연결 끊김', 'error');
    expect(args.memory.pending.size).toBe(0);
  });
});
