import { describe, expect, test } from 'vitest';
import { blockedSummary } from './blocked-summary.js';

/**
 * Moved from the retired `views/worker/lanes.test.js` (UI-dbn6 Phase 4): the
 * summary is the model's, so its cases live beside it.
 *
 * @param {Partial<import('../../server/worker/wait-judgment.js').WaitReason>} [patch]
 * @returns {import('../../server/worker/wait-judgment.js').WaitReason}
 */
function waitReason(patch = {}) {
  return {
    kind: 'prerequisite',
    subject: { bead_id: 'A-1', root_dir: '/repo' },
    headline: 'A-2 완료를 기다림',
    release: '선행 해제 후 자동 복귀',
    verdict: 'normal',
    targets: [{ id: 'A-2', kind: 'issue' }],
    actions: [],
    notify_plan: { on_complete: 'none', on_overdue: 'none' },
    ...patch
  };
}

/**
 * One server prerequisite reason with an empty headline, as UI-0bvr §4.2
 * leaves it.
 *
 * @param {string} bead_id
 * @param {string[]} blockers
 * @returns {import('../../server/worker/wait-judgment.js').WaitReason}
 */
function prerequisiteOf(bead_id, blockers) {
  return waitReason({
    headline: '',
    subject: { bead_id, root_dir: '/repo' },
    targets: blockers.map((id) => ({ id, kind: 'issue' }))
  });
}

/**
 * A-2 waits on A-1, which is itself a blocked row, and A-2 also waits on a
 * person — the mixed-reason case of §6.2 where only the prerequisite is
 * represented upstream.
 *
 * @param {Partial<import('../../server/worker/wait-judgment.js').WaitReason>} [prerequisite_patch]
 * @returns {Array<{ root_dir: string, wait_reasons: import('../../server/worker/wait-judgment.js').WaitReason[] }>}
 */
function mixedReasonWorkspaces(prerequisite_patch = {}) {
  return [
    {
      root_dir: '/repo',
      wait_reasons: [
        prerequisiteOf('A-1', ['A-9']),
        waitReason({
          headline: '',
          subject: { bead_id: 'A-2', root_dir: '/repo' },
          targets: [{ id: 'A-1', kind: 'issue' }],
          ...prerequisite_patch
        }),
        waitReason({
          kind: 'awaiting_user',
          headline: '사람 확인을 기다림',
          subject: { bead_id: 'A-2', root_dir: '/repo' },
          targets: []
        })
      ]
    }
  ];
}

describe('blockedSummary (UI-8gem §8, UI-0bvr §6.2)', () => {
  test('counts recovery subjects once and exposes their action-required reasons', () => {
    const reason = waitReason({
      kind: 'recovery',
      verdict: 'action_required',
      targets: []
    });

    const summary = blockedSummary([
      { root_dir: '/repo', wait_reasons: [reason, reason] }
    ]);

    expect(summary.count).toBe(1);
    expect(summary.action_count).toBe(1);
    expect(summary.groups.map((group) => group.label)).toEqual(['확인 필요']);
    expect(summary.groups[0].entries[0].id).toBe('A-1');
  });

  test('groups provider and human aliases together without empty groups', () => {
    const kinds = /** @type {const} */ ([
      'provider_hold',
      'awaiting_user',
      'recovery'
    ]);

    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: kinds.map((kind, index) =>
          waitReason({
            kind,
            subject: { root_dir: '/repo', bead_id: `A-${index}` }
          })
        )
      }
    ]);

    expect(
      summary.groups.map((group) => [group.label, group.entries.length])
    ).toEqual([
      ['공급자', 1],
      ['확인 필요', 2]
    ]);
  });

  test('counts distinct original issues and omits empty groups', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          waitReason(),
          waitReason({
            kind: 'prerequisite_foreign',
            verdict: 'action_required'
          }),
          waitReason({ kind: 'external_job' })
        ]
      }
    ]);

    expect(summary.count).toBe(1);
    expect(summary.action_count).toBe(1);
    expect(summary.queue_line).toEqual([]);
    expect(
      summary.groups.map((group) => [group.label, group.entries.length])
    ).toEqual([
      ['외부 작업', 1],
      ['선행', 1]
    ]);
  });

  test('counts the same ID in different repositories separately', () => {
    const summary = blockedSummary([
      { root_dir: '/repo', wait_reasons: [waitReason()] },
      {
        root_dir: '/other',
        wait_reasons: [
          waitReason({ subject: { root_dir: '/other', bead_id: 'A-1' } })
        ]
      }
    ]);

    expect(summary.count).toBe(2);
  });

  test('leaves the queue line empty without a queue-scope reason (UI-3pu9 §4.2)', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          waitReason({
            kind: 'prerequisite',
            subject: { bead_id: 'A-1', root_dir: '/repo' }
          })
        ]
      }
    ]);

    expect(summary.queue_line).toEqual([]);
  });

  test('drops an issue whose every prerequisite is another blocked row', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          prerequisiteOf('A-1', ['A-9']),
          prerequisiteOf('A-2', ['A-1'])
        ]
      }
    ]);

    expect(summary.groups[0].entries.map((entry) => entry.id)).toEqual(['A-1']);
  });

  test('counts an upstream-covered issue that still carries another reason', () => {
    const summary = blockedSummary(mixedReasonWorkspaces());

    expect(summary.count).toBe(2);
  });

  test('lists an upstream-covered issue under its remaining kind', () => {
    const summary = blockedSummary(mixedReasonWorkspaces());

    const people = summary.groups.find((group) => group.label === '확인 필요');

    expect(people?.entries.map((entry) => entry.id)).toEqual(['A-2']);
  });

  test('drops only the covered prerequisite from the 선행 group', () => {
    const summary = blockedSummary(mixedReasonWorkspaces());

    const prerequisites = summary.groups.find(
      (group) => group.label === '선행'
    );

    expect(prerequisites?.entries.map((entry) => entry.id)).toEqual(['A-1']);
  });

  test('leaves a covered action-required prerequisite out of the action count', () => {
    const summary = blockedSummary(
      mixedReasonWorkspaces({ verdict: 'action_required' })
    );

    expect(summary.action_count).toBe(0);
  });

  test('keeps a foreign prerequisite in the blocked count', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          prerequisiteOf('A-1', ['A-9']),
          waitReason({
            kind: 'prerequisite_foreign',
            headline: '',
            subject: { bead_id: 'A-2', root_dir: '/repo' },
            targets: [{ id: 'OTHER-1', kind: 'issue' }]
          })
        ]
      }
    ]);

    expect(summary.count).toBe(2);
  });

  test('counts both rows of a two-row wait cycle', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          prerequisiteOf('A-1', ['A-2']),
          prerequisiteOf('A-2', ['A-1'])
        ]
      }
    ]);

    expect(summary.count).toBe(2);
  });

  test('counts every row of a three-row wait cycle', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          prerequisiteOf('A-1', ['A-2']),
          prerequisiteOf('A-2', ['A-3']),
          prerequisiteOf('A-3', ['A-1'])
        ]
      }
    ]);

    expect(summary.count).toBe(3);
  });

  test('drops a tail row hanging off a wait cycle', () => {
    const summary = blockedSummary([
      {
        root_dir: '/repo',
        wait_reasons: [
          prerequisiteOf('A-1', ['A-2']),
          prerequisiteOf('A-2', ['A-1']),
          prerequisiteOf('A-3', ['A-1'])
        ]
      }
    ]);

    expect(summary.groups[0].entries.map((entry) => entry.id)).toEqual([
      'A-1',
      'A-2'
    ]);
  });
});
