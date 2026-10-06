import { describe, expect, test } from 'vitest';
import {
  hasLiveConversation,
  repoOperationResolveFields,
  tileResolveFields
} from './tile-resolve.js';

/**
 * @param {'inquiry'|'resolve'|'external_resume'} kind
 * @param {Record<string, any>} [over]
 */
function session(kind, over = {}) {
  return { kind, state: 'live', closing: false, ...over };
}

/** The server's 외부 작업 완료 projection (`wait-judgment`, UI-18a5 §3.2). */
const EXTERNAL_REASON = {
  kind: 'external_job',
  actions: [
    {
      op: 'worker-resolve-in-session',
      label: '[세션에서 이어가기]',
      title: '서버가 정한 외부 작업 완료 설명',
      placement: 'card',
      payload: { root_dir: '/r', bead_id: 'UI-1', wait_id: 'w-0123456789ab' }
    },
    {
      op: 'external_wait_resume',
      label: '[워커로 이어가기]',
      payload: { root_dir: '/r', wait_id: 'w-0123456789ab', mode: 'fork' }
    }
  ]
};

/** @type {Record<string, Record<string, any>>} */
const MATERIALS = {
  recovery_tile: { run_state: 'waiting', wait: { recovery: { kind: 'x' } } },
  recovery_row: { wait_reasons: [{ kind: 'recovery' }] },
  parked: { run_state: 'parked' },
  discard_failed: { discard: { error: 'dirty_worktree', action: true } },
  cleanup_failed: {
    failure_material: {
      cleanup: true,
      cleanup_retry: true,
      completion_phase: null
    },
    merge_action: true
  },
  verify_hold: {
    failure_material: {
      cleanup: false,
      cleanup_retry: false,
      completion_phase: 'holding'
    }
  },
  merge_gate: {
    failure_material: {
      cleanup: false,
      cleanup_retry: false,
      completion_phase: 'needs_human'
    }
  },
  external_completion: { wait_reasons: [EXTERNAL_REASON] }
};

describe('tileResolveFields', () => {
  for (const [name, material] of Object.entries(MATERIALS)) {
    test(`exposes the session action for ${name} without a live session`, () => {
      const item = { id: 'UI-1', interactive_sessions: [], ...material };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    });

    for (const kind of /** @type {const} */ ([
      'inquiry',
      'resolve',
      'external_resume'
    ])) {
      test(`hides the session action for ${name} beside a live ${kind} session`, () => {
        const item = {
          id: 'UI-1',
          interactive_sessions: [session(kind)],
          ...material
        };

        const fields = tileResolveFields(item, false);

        expect(fields.resolve_action).toBeUndefined();
      });
    }
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
      '멈춘 세션을 같은 세션 그대로 대화로 다시 엽니다 — 인계하면 Worker가 이어갑니다'
    );
  });

  test('says a failure handoff reruns the failed step', () => {
    const item = { id: 'UI-1', ...MATERIALS.cleanup_failed };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '기록된 세션을 대화로 엽니다 — 인계하면 Worker가 실패한 단계를 다시 돌립니다'
    );
  });

  test('says a merge-gate handoff runs nothing', () => {
    const item = { id: 'UI-1', ...MATERIALS.merge_gate };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toContain('[머지]만 풀므로');
  });

  test('prefers the discard-failure title on a parked tile', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      discard: { error: 'x', action: true }
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '기록된 세션을 대화로 엽니다 — 인계하면 Worker가 실패한 폐기를 다시 시도합니다'
    );
  });

  test('takes the 외부 작업 완료 title from the server projection', () => {
    const item = { id: 'UI-1', ...MATERIALS.external_completion };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe('서버가 정한 외부 작업 완료 설명');
  });

  test('names a refused handoff ahead of the title', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.cleanup_failed,
      conversation_refusal: '결과 미상'
    };

    const fields = tileResolveFields(item, false);

    expect(
      fields.resolve_title?.startsWith('이어가기 거절: 결과 미상 — ')
    ).toBe(true);
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

describe('tileResolveFields pair anchor (UI-18a5 §3.2)', () => {
  test.each([
    ['cleanup_failed', 'merge'],
    ['discard_failed', 'discard'],
    ['external_completion', 'external']
  ])('anchors the session button of %s before its %s exit', (name, anchor) => {
    const item = { id: 'UI-1', ...MATERIALS[name] };

    const fields = tileResolveFields(item, false);

    expect(fields.pair_anchor).toBe(anchor);
  });

  test('anchors nothing on a verify hold, whose Worker exit is [머지]', () => {
    const item = { id: 'UI-1', ...MATERIALS.verify_hold };

    const fields = tileResolveFields(item, false);

    expect(fields.pair_anchor).toBeUndefined();
    expect(fields.resolve_action).toBe(true);
  });

  test('leaves a stale-work backup retry out of the pair', () => {
    const item = {
      id: 'UI-1',
      discard: {
        error: 'x',
        action: true,
        operation: { kind: 'stale_work_backup_fresh' }
      }
    };

    const fields = tileResolveFields(item, false);

    expect(fields.pair_anchor).toBeUndefined();
  });

  test('hides the cleanup-retry exit while a takeover holds the row', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.cleanup_failed,
      interactive_sessions: [
        session('resolve', {
          conversation: { handoff: null, result: { kind: 'takeover' } }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields).toMatchObject({ pair_held: true, merge_action: false });
    expect(fields.resolve_action).toBeUndefined();
  });

  test('hides the discard-retry exit while a handoff reservation holds the row', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.discard_failed,
      interactive_sessions: [
        session('resolve', {
          state: 'exiting',
          closing: true,
          conversation: {
            handoff: { line: '인계 · 다시', source: 'result_line' },
            result: { kind: 'handoff' }
          }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.discard).toMatchObject({
      error: 'dirty_worktree',
      action: false
    });
  });

  test('keeps the worker exit standing beside a live conversation', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.cleanup_failed,
      interactive_sessions: [session('resolve')]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.merge_action).toBeUndefined();
    expect(fields.pair_held).toBe(false);
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

  test('exposes the handoff next to the session action after the window vanished', () => {
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
      handoff_attempt_id: 'a1',
      pair_anchor: 'handoff'
    });
  });

  test('keeps the handoff beside a live conversation that hides the session action', () => {
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

describe('hasLiveConversation', () => {
  test('ignores an exiting session', () => {
    const views = [session('resolve', { state: 'exiting' })];

    const live = hasLiveConversation(views);

    expect(live).toBe(false);
  });

  test('counts a live external resume session', () => {
    const views = [session('external_resume')];

    const live = hasLiveConversation(views);

    expect(live).toBe(true);
  });
});

describe('repoOperationResolveFields (UI-jbl1 §3.3)', () => {
  /**
   * @param {Record<string, any>} [resolve]
   */
  function card(resolve = {}) {
    return {
      operation_id: 'op-1',
      state: 'failed',
      resolve: { terminal_failure: true, interactive_sessions: [], ...resolve }
    };
  }

  test('draws the button on a failed manual deploy', () => {
    const fields = repoOperationResolveFields(card());

    expect(fields).toMatchObject({
      resolve_action: true,
      resolve_enabled: true
    });
  });

  test('draws nothing for a card the server marked no terminal failure', () => {
    const fields = repoOperationResolveFields(
      card({ terminal_failure: false })
    );

    expect(fields).toEqual({});
  });

  test('shows the live conversation instead of the button', () => {
    const live = session('resolve', { tmux_window: 'resolve-repo-op-op-1' });

    const fields = repoOperationResolveFields(
      card({ interactive_sessions: [live] })
    );

    expect(fields).toEqual({ conversation: live });
  });

  test('hides the button while a decided outcome holds the row', () => {
    const closing = session('resolve', {
      state: 'exiting',
      closing: true,
      conversation: { handoff: { line: '인계 · 다시' }, result: null }
    });

    const fields = repoOperationResolveFields(
      card({ interactive_sessions: [closing] })
    );

    expect(fields).toEqual({});
  });

  test('locks the button while its request is pending', () => {
    const fields = repoOperationResolveFields(card(), true);

    expect(fields.resolve_enabled).toBe(false);
  });
});
