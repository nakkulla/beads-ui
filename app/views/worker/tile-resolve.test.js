import { describe, expect, test } from 'vitest';
import { hasLiveResolveSession, tileResolveFields } from './tile-resolve.js';

/**
 * @param {'inquiry'|'resolve'|'external_resume'} kind
 * @param {Record<string, any>} [over]
 */
function session(kind, over = {}) {
  return { kind, state: 'live', closing: false, ...over };
}

/** @type {Record<string, Record<string, any>>} */
const MATERIALS = {
  recovery_tile: { run_state: 'waiting', wait: { recovery: { kind: 'x' } } },
  recovery_row: { wait_reasons: [{ kind: 'recovery' }] },
  parked: { run_state: 'parked' },
  discard_failed: { discard: { error: 'dirty_worktree' } }
};

describe('tileResolveFields', () => {
  for (const [name, material] of Object.entries(MATERIALS)) {
    test(`exposes the action for ${name} without a live session`, () => {
      const item = { id: 'UI-1', interactive_sessions: [], ...material };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    });

    test(`hides the action for ${name} with a live inquiry`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('inquiry')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields).toEqual({});
    });

    test(`hides the action for ${name} with a live resolve session`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('resolve')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields).toEqual({});
    });

    test(`keeps the action for ${name} beside an external_resume session`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('external_resume')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    });
  }

  test('counts a closing session as not live', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      interactive_sessions: [session('inquiry', { closing: true })]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBe(true);
  });

  test('hides the action while a closing conversation holds a handoff reservation', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      interactive_sessions: [
        session('inquiry', {
          state: 'exiting',
          closing: true,
          conversation: {
            handoff: { line: '인계 · 승인', source: 'result_line' },
            result: { kind: 'handoff' }
          }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBeUndefined();
  });

  test('hides the action while a closing conversation holds a takeover', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.recovery_tile,
      interactive_sessions: [
        session('inquiry', {
          closing: true,
          conversation: { handoff: null, result: { kind: 'takeover' } }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBeUndefined();
  });

  test('keeps the action beside a closing conversation that ended on hold', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.recovery_tile,
      interactive_sessions: [
        session('inquiry', {
          closing: true,
          conversation: { handoff: null, result: { kind: 'hold' } }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBe(true);
  });

  test('uses the same-session conversation title for a recovery tile', () => {
    const item = { id: 'UI-1', ...MATERIALS.recovery_tile };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '멈춘 세션을 같은 세션 그대로 대화형으로 다시 엽니다 — 사람과 대화한 뒤 인계하면 Worker가 이어갑니다'
    );
  });

  test('prefers the discard-failure title on a parked tile', () => {
    const item = { id: 'UI-1', run_state: 'parked', discard: { error: 'x' } };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toContain('실패한 폐기');
  });

  test('locks a recovery tile while its request is pending', () => {
    const item = { id: 'UI-1', ...MATERIALS.recovery_tile };

    const fields = tileResolveFields(item, true);

    expect(fields.resolve_enabled).toBe(false);
  });

  test('omits fields without resolve material', () => {
    const item = { id: 'UI-1', run_state: 'running' };

    const fields = tileResolveFields(item, false);

    expect(fields).toEqual({});
  });
});

describe('tileResolveFields conversation handoff', () => {
  /**
   * @param {Record<string, any>} [over]
   */
  function handoffReason(over = {}) {
    return {
      kind: 'recovery',
      actions: [
        { op: 'worker-resolve-in-session', payload: {} },
        {
          op: 'worker-conversation-handoff',
          label: '[워커로 이어가기]',
          title: '서버가 정한 설명',
          payload: { bead_id: 'UI-1', root_dir: '/r', attempt_id: 'a1' }
        },
        { op: 'worker-discard', payload: {} }
      ],
      ...over
    };
  }

  test('exposes the handoff next to the resolve action after the window vanished', () => {
    const item = {
      id: 'UI-1',
      run_state: 'waiting',
      wait_reasons: [handoffReason()],
      interactive_sessions: []
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      resolve_action: true,
      handoff_action: true,
      handoff_enabled: true,
      handoff_title: '서버가 정한 설명',
      handoff_attempt_id: 'a1'
    });
  });

  test('keeps the handoff beside a live conversation that hides the resolve action', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      wait_reasons: [handoffReason({ kind: 'awaiting_user' })],
      interactive_sessions: [session('inquiry')]
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields.resolve_action).toBeUndefined();
    expect(fields.handoff_action).toBe(true);
  });

  test('omits the handoff when the server projected none', () => {
    const item = { id: 'UI-1', ...MATERIALS.recovery_row };

    const fields = tileResolveFields(item, false, false);

    expect(fields.handoff_action).toBeUndefined();
  });

  test('locks the handoff while its request is pending', () => {
    const item = {
      id: 'UI-1',
      wait_reasons: [handoffReason()],
      interactive_sessions: []
    };

    const fields = tileResolveFields(item, false, true);

    expect(fields.handoff_enabled).toBe(false);
  });
});

describe('hasLiveResolveSession', () => {
  test('ignores an exiting session', () => {
    const views = [session('resolve', { state: 'exiting' })];

    const live = hasLiveResolveSession(views);

    expect(live).toBe(false);
  });
});
