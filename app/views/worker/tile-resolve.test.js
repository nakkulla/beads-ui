import { describe, expect, test } from 'vitest';
import {
  SESSION_FINISH_RESEND_MS,
  hasLiveConversation,
  liveConversationResolution,
  repoOperationResolveFields,
  sessionFinishBoundaryMs,
  sessionFinishFields,
  tileResolveFields
} from './tile-resolve.js';

const DISCORD_URL = 'https://discord.com/channels/1/2';

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
      test(`hides the continue button when a discord link exists (${name}, live ${kind})`, () => {
        const item = {
          id: 'UI-1',
          interactive_sessions: [session(kind, { discord_url: DISCORD_URL })],
          ...material
        };

        const fields = tileResolveFields(item, false);

        expect(fields.resolve_action).toBeUndefined();
      });
    }
  }

  test.each(/** @type {const} */ (['inquiry', 'resolve', 'external_resume']))(
    'shows the continue button for a live conversation without a discord link (%s)',
    (kind) => {
      const item = {
        id: 'UI-1',
        ...MATERIALS.recovery_row,
        interactive_sessions: [session(kind, { discord_url: null })]
      };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    }
  );

  test.each(/** @type {const} */ (['inquiry', 'resolve', 'external_resume']))(
    'shows the focus button for a live conversation on a card with no row (%s)',
    (kind) => {
      const item = {
        id: 'UI-1',
        run_state: 'waiting',
        wait_reasons: [],
        interactive_sessions: [session(kind, { discord_url: null })]
      };

      const fields = tileResolveFields(item, false);

      expect(fields).toMatchObject({
        resolve_action: true,
        resolve_enabled: true,
        resolve_title:
          '열린 대화의 대화 세션 창을 앞으로 부릅니다 — 새 세션을 띄우지 않습니다'
      });
    }
  );

  test.each(/** @type {const} */ (['inquiry', 'resolve', 'external_resume']))(
    'hides the button for a linked live conversation on a card with no row (%s)',
    (kind) => {
      const item = {
        id: 'UI-1',
        run_state: 'waiting',
        wait_reasons: [],
        interactive_sessions: [session(kind, { discord_url: DISCORD_URL })]
      };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBeUndefined();
    }
  );

  test('keeps the button hidden while a decided outcome holds a live conversation without a link', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.recovery_row,
      interactive_sessions: [
        session('inquiry', {
          discord_url: null,
          conversation: { handoff: { reserved_at: 1 }, result: null }
        })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBeUndefined();
  });

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
      '멈춘 세션을 같은 세션 그대로 대화로 다시 엽니다 — Worker로 넘기면 Worker가 이어갑니다'
    );
  });

  test('says a failure handoff reruns the failed step', () => {
    const item = { id: 'UI-1', ...MATERIALS.cleanup_failed };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '기록된 세션을 대화로 엽니다 — Worker로 넘기면 Worker가 실패한 단계를 다시 돌립니다'
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
      '기록된 세션을 대화로 엽니다 — Worker로 넘기면 Worker가 실패한 폐기를 다시 시도합니다'
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

describe('tileResolveFields takeover row (UI-9w5l §3.4)', () => {
  /** The server's unresolved-takeover projection (`wait-judgment`). */
  const TAKEOVER_REASON = {
    kind: 'external_job',
    verdict: 'action_required',
    verdict_reason: {
      code: 'takeover_unresolved',
      message: '바로 실행 결과 확인 필요'
    },
    actions: [
      { op: 'external_wait_check', label: '[지금 확인]', payload: {} },
      {
        op: 'worker-resolve-in-session',
        label: '[세션에서 이어가기]',
        title: '서버가 정한 바로 실행 정리 설명',
        placement: 'card',
        payload: { root_dir: '/r', bead_id: 'UI-1', wait_id: 'w-0123456789ab' }
      },
      { op: 'external_wait_stop', label: '[관찰 중단]', payload: {} }
    ]
  };

  test('shows it for an unresolved takeover', () => {
    const item = {
      id: 'UI-1',
      wait_reasons: [TAKEOVER_REASON],
      interactive_sessions: []
    };

    const fields = tileResolveFields(item, false);

    expect(fields).toMatchObject({
      resolve_action: true,
      resolve_title: '서버가 정한 바로 실행 정리 설명',
      pair_anchor: 'external'
    });
  });

  test('ranks a recovery wait ahead of the takeover row', () => {
    const item = {
      id: 'UI-1',
      wait_reasons: [{ kind: 'recovery' }, TAKEOVER_REASON],
      interactive_sessions: []
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '멈춘 세션을 같은 세션 그대로 대화로 다시 엽니다 — Worker로 넘기면 Worker가 이어갑니다'
    );
  });
});

describe('liveConversationResolution (UI-9w5l §3.5)', () => {
  test('points at Discord when the live conversation has a link', () => {
    const line = liveConversationResolution([
      session('resolve', { discord_url: DISCORD_URL })
    ]);

    expect(line).toBe('↗ Discord에서 대화를 이어간다');
  });

  test('points at the tmux window when the bridge left no link', () => {
    const line = liveConversationResolution([
      session('external_resume', { discord_url: null })
    ]);

    expect(line).toBe(
      '[세션에서 이어가기]로 맥의 대화 세션 창을 앞으로 불러 대화를 이어간다 · Discord 브리지가 꺼져 있어 휴대폰에서는 이어갈 수 없다'
    );
  });

  test('says the Discord thread is coming while the bridge prepares it', () => {
    const line = liveConversationResolution([
      session('resolve', { discord_url: null, discord_pending: true })
    ]);

    expect(line).toBe('Discord 스레드 준비 중 — 세션의 첫 답 뒤 생긴다');
  });

  test('keeps [세션에서 이어가기] while the Discord thread is pending', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.cleanup_failed,
      interactive_sessions: [
        session('resolve', { discord_url: null, discord_pending: true })
      ]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBe(true);
  });

  test('returns nothing without a live conversation', () => {
    const line = liveConversationResolution([
      session('inquiry', { closing: true, discord_url: DISCORD_URL })
    ]);

    expect(line).toBe('');
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

  test('draws [세션에서 이어가기] on a stale residue failure tile without a pair anchor', () => {
    const item = {
      id: 'UI-1',
      run_state: 'failed',
      failure: { cause: 'stale_work_unresolved' }
    };

    const fields = tileResolveFields(item, false);

    expect(fields).toEqual({
      resolve_action: true,
      resolve_enabled: true,
      resolve_title:
        '대화 세션을 엽니다 — 잔재 처분 실패의 원인을 정리하고, Worker로 넘기면 Worker가 같은 잔재 처분 검사로 디스패치를 한 번 다시 돌립니다'
    });
  });

  test('names a failed discard ahead of the stale residue failure it sits on', () => {
    const item = {
      id: 'UI-1',
      run_state: 'failed',
      failure: { cause: 'stale_work_unresolved' },
      ...MATERIALS.discard_failed
    };

    const fields = tileResolveFields(item, false);

    expect(fields.pair_anchor).toBe('discard');
  });

  test('draws [세션에서 이어가기] on a landing deploy failure tile without a pair anchor', () => {
    const item = {
      id: 'UI-1',
      run_state: 'failed',
      failure: { cause: 'quickfix_landing_failed:script_failed' },
      landing_deploy_failure: true
    };

    const fields = tileResolveFields(item, false);

    expect(fields).toEqual({
      resolve_action: true,
      resolve_enabled: true,
      resolve_title:
        '대화 세션을 엽니다 — 착지 배포 실패의 원인을 정리하고, Worker로 넘기면 Worker가 실패한 착지 단계(배포)부터 한 번 다시 실행합니다'
    });
  });

  test('draws no [세션에서 이어가기] on an ordinary failure tile', () => {
    const item = {
      id: 'UI-1',
      run_state: 'failed',
      failure: { cause: 'session_failed:exit_1' }
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBeUndefined();
  });
});

describe('tileResolveFields conversation handoff', () => {
  test('uses the projected recovery resume in the existing Worker exit slot', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      wait_reasons: [
        {
          kind: 'recovery',
          actions: [
            {
              op: 'worker-attempt-resume',
              title: '보존 작업 재개',
              payload: { attempt_id: 'a1' }
            }
          ]
        }
      ]
    });

    expect(fields).toMatchObject({
      resolve_action: true,
      handoff_action: true,
      handoff_op: 'worker-attempt-resume',
      handoff_attempt_id: 'a1',
      handoff_title: '보존 작업 재개',
      pair_anchor: 'handoff'
    });
  });

  test('hides the recovery resume while a conversation outcome holds the pair', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      wait_reasons: [
        {
          kind: 'recovery',
          actions: [
            { op: 'worker-attempt-resume', payload: { attempt_id: 'a1' } }
          ]
        }
      ],
      interactive_sessions: [
        session('resolve', { conversation: { handoff: { reserved_at: 1 } } })
      ]
    });

    expect(fields.resolve_action).toBeUndefined();
    expect(fields.handoff_action).toBeUndefined();
    expect(fields.pair_held).toBe(true);
  });

  test('omits the projected recovery resume on a Worker-ineligible card', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      labels: ['worker-ineligible'],
      wait_reasons: [
        {
          kind: 'recovery',
          actions: [
            { op: 'worker-attempt-resume', payload: { attempt_id: 'a1' } }
          ]
        }
      ]
    });

    expect(fields.handoff_action).toBeUndefined();
  });

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
      interactive_sessions: [session('inquiry', { discord_url: DISCORD_URL })]
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

describe('tileResolveFields handback after a takeover (UI-3713 §3.3)', () => {
  /**
   * A live takeover conversation view with the server's handback flag.
   *
   * @param {'inquiry'|'resolve'|'external_resume'} kind
   * @param {boolean} handback_allowed
   * @param {Record<string, any>} [over]
   */
  function takeover(kind, handback_allowed, over = {}) {
    return session(kind, {
      attempt_id: kind === 'external_resume' ? null : 'a1',
      conversation: {
        handoff: null,
        result: { kind: 'takeover' },
        ...(handback_allowed ? { handback_allowed: true } : {})
      },
      ...over
    });
  }

  test.each(['inquiry', 'resolve', 'external_resume'])(
    'shows [워커로 이어가기] on a live %s takeover marked handback_allowed',
    (kind) => {
      const item = {
        id: 'UI-1',
        run_state: 'parked',
        interactive_sessions: [takeover(/** @type {any} */ (kind), true)]
      };

      const fields = tileResolveFields(item, false, false);

      expect(fields).toMatchObject({
        handoff_action: true,
        handoff_enabled: true,
        handoff_attempt_id: kind === 'external_resume' ? null : 'a1',
        pair_held: true
      });
      expect(fields.resolve_action).toBeUndefined();
    }
  );

  test('hides [워커로 이어가기] on a live takeover without handback_allowed', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      interactive_sessions: [takeover('inquiry', false)]
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields.handoff_action).toBeUndefined();
    expect(fields.pair_held).toBe(true);
  });

  test('hides [워커로 이어가기] on a closing takeover even when handback_allowed', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      interactive_sessions: [
        takeover('inquiry', true, { state: 'exiting', closing: true })
      ]
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields.handoff_action).toBeUndefined();
  });

  test('keeps the cleanup-retry exit masked beside the handback button', () => {
    const item = {
      id: 'UI-1',
      ...MATERIALS.cleanup_failed,
      interactive_sessions: [takeover('resolve', true)]
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      handoff_action: true,
      pair_anchor: 'merge',
      pair_held: true,
      merge_action: false
    });
  });

  test('omits the handback button on a worker-ineligible Bead', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      labels: ['worker-ineligible'],
      interactive_sessions: [takeover('inquiry', true)]
    };

    const fields = tileResolveFields(item, false, false);

    expect(fields.handoff_action).toBeUndefined();
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

  test('shows a linked live conversation instead of the button', () => {
    const live = session('resolve', {
      tmux_window: 'resolve-repo-op-op-1',
      discord_url: DISCORD_URL
    });

    const fields = repoOperationResolveFields(
      card({ interactive_sessions: [live] })
    );

    expect(fields).toEqual({ conversation: live });
  });

  test('draws the focus button beside a live conversation without a link', () => {
    const live = session('resolve', {
      tmux_window: 'resolve-repo-op-op-1',
      discord_url: null
    });

    const fields = repoOperationResolveFields(
      card({ interactive_sessions: [live] })
    );

    expect(fields).toEqual({
      resolve_action: true,
      resolve_enabled: true,
      resolve_title:
        '열린 대화의 대화 세션 창을 앞으로 부릅니다 — 새 세션을 띄우지 않습니다',
      conversation: live
    });
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

describe('tileResolveFields — foreign_handoff row (UI-k467 §3.7)', () => {
  const FOREIGN_HANDOFF = {
    failure_material: {
      cleanup: true,
      cleanup_retry: false,
      completion_phase: null,
      foreign_handoff: 'foreign_deploy_unsupported'
    }
  };

  test('stands [세션에서 이어가기] on a foreign handoff row', () => {
    const item = { id: 'UI-1', ...FOREIGN_HANDOFF };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBe(true);
  });

  test('draws no [워커로 이어가기] pair on a foreign handoff row', () => {
    const item = { id: 'UI-1', ...FOREIGN_HANDOFF };

    const fields = tileResolveFields(item, false);

    expect(fields.handoff_action).toBeUndefined();
    expect(fields.pair_anchor).toBeUndefined();
  });

  test('titles the session apart from the merge-gate row', () => {
    const handoff = tileResolveFields(
      { id: 'UI-1', ...FOREIGN_HANDOFF },
      false
    );
    const merge_gate = tileResolveFields(
      { id: 'UI-1', ...MATERIALS.merge_gate },
      false
    );

    expect(handoff.resolve_title).not.toBe(merge_gate.resolve_title);
    expect(handoff.resolve_title).toContain('[머지]로 풀리지 않습니다');
  });
});

describe('tileResolveFields session lane (UI-lbm5 §4.5-§4.6)', () => {
  test('omits continuation buttons on a running session-lane tile', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      exec: 'session',
      run_state: 'running',
      interactive_sessions: [session(/** @type {any} */ ('session_lane'))]
    });

    expect(fields).toEqual({});
  });

  test('omits continuation buttons beside a session-lane Discord link', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      exec: 'session',
      run_state: 'running',
      interactive_sessions: [
        session(/** @type {any} */ ('session_lane'), {
          discord_url: DISCORD_URL
        })
      ]
    });

    expect(fields).toEqual({});
  });

  test('draws nothing on a running session-lane tile whose window is closing', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      exec: 'session',
      run_state: 'running',
      interactive_sessions: [
        session(/** @type {any} */ ('session_lane'), { closing: true })
      ]
    });

    expect(fields).toEqual({});
  });

  test('stands neither half of the pair on a session_exited row', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      exec: 'session',
      run_state: 'failed',
      failure: { cause: 'session_exited' },
      wait_reasons: [
        {
          kind: 'recovery',
          actions: [
            {
              op: 'worker-conversation-handoff',
              payload: { attempt_id: 'a1' }
            }
          ]
        }
      ],
      interactive_sessions: []
    });

    expect(fields).toEqual({});
  });

  test('stands no [워커로 이어가기] on a worker-ineligible row', () => {
    const fields = tileResolveFields({
      id: 'UI-1',
      run_state: 'waiting',
      labels: ['worker-ineligible'],
      wait: { recovery: { kind: 'x' } },
      wait_reasons: [
        {
          kind: 'recovery',
          actions: [
            {
              op: 'worker-conversation-handoff',
              payload: { attempt_id: 'a1' }
            }
          ]
        }
      ],
      interactive_sessions: []
    });

    expect(fields.handoff_action).toBeUndefined();
    expect(fields.resolve_action).toBe(true);
  });
});

describe('tileResolveFields paused row (UI-6kj0 §3.1-§3.2)', () => {
  const PAUSED_TITLE =
    '일시정지한 세션을 같은 세션 그대로 대화로 다시 엽니다 — 대화하며 작업을 잇고, Worker로 넘기면 Worker가 이어갑니다';

  /**
   * A paused row as lane-model builds it from `isUserPausedAttempt`.
   *
   * @param {Record<string, any>} [over]
   * @returns {Record<string, any>}
   */
  function paused(over = {}) {
    return {
      id: 'UI-1',
      attempt_id: 'a1',
      run_state: 'paused',
      status: 'paused',
      user_paused: true,
      interactive_sessions: [],
      ...over
    };
  }

  /** The server's paused-row projection while the conversation awaits. */
  const AWAITING_REASON = {
    kind: 'awaiting_user',
    actions: [
      { op: 'worker-resolve-in-session', payload: {} },
      {
        op: 'worker-conversation-handoff',
        label: '[워커로 이어가기]',
        title: '서버가 정한 설명',
        payload: { bead_id: 'UI-1', root_dir: '/r', attempt_id: 'a1' }
      },
      { op: 'worker-discard', payload: {} }
    ]
  };

  test('stands [세션에서 이어가기] alone on a paused row', () => {
    const item = paused();

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      resolve_action: true,
      resolve_enabled: true,
      resolve_title: PAUSED_TITLE,
      pair_anchor: 'resume'
    });
    expect(fields.handoff_action).toBeUndefined();
  });

  test.each([
    ['a provider hold', { id: 'UI-1', run_state: 'provider_hold' }],
    [
      'a session-lane pause',
      { id: 'UI-1', run_state: 'paused', status: 'paused', exec: 'session' }
    ],
    [
      'a pause the shared predicate rejected (withdrawn, account preempt)',
      { id: 'UI-1', run_state: 'paused', status: 'paused' }
    ],
    [
      'a PR 대기 auto-advance pause',
      {
        id: 'UI-1',
        failure_material: {
          cleanup: false,
          cleanup_retry: false,
          completion_phase: null
        },
        merge_action: true
      }
    ]
  ])('draws no paused-row button on %s', (_label, item) => {
    const fields = tileResolveFields(item, false, false);

    expect(fields.resolve_action).toBeUndefined();
    expect(fields.pause_resume_mode).toBeUndefined();
  });

  test('ranks a failed discard ahead of the paused row', () => {
    const item = paused({
      discard: { error: 'dirty_worktree', action: true }
    });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      resolve_title:
        '기록된 세션을 대화로 엽니다 — Worker로 넘기면 Worker가 실패한 폐기를 다시 시도합니다',
      pair_anchor: 'discard'
    });
    expect(fields.pause_resume_mode).toBeUndefined();
  });

  test('names a refused handoff ahead of the paused title', () => {
    const item = paused({ conversation_refusal: 'bd_unavailable' });

    const fields = tileResolveFields(item, false, false);

    expect(fields.resolve_title).toBe(
      `이어가기 거절: bd_unavailable — ${PAUSED_TITLE}`
    );
  });

  test('opens the resume dialog from ▶ 재개 without a conversation', () => {
    const item = paused();

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'dialog',
      pause_resume_title:
        '같은 세션으로 이어서 재개 — 바로 재개하거나 지시를 입력할 수 있음'
    });
  });

  test('hands the conversation to Worker from ▶ 재개 while it awaits the answer', () => {
    const item = paused({
      wait_reasons: [AWAITING_REASON],
      interactive_sessions: [session('inquiry', { turn_state: 'question' })]
    });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'handoff',
      pause_resume_attempt_id: 'a1',
      pair_anchor: 'resume'
    });
    expect(fields.handoff_action).toBeUndefined();
  });

  test('disables ▶ 재개 while the conversation runs a turn', () => {
    const item = paused({
      interactive_sessions: [session('inquiry', { turn_state: 'running' })]
    });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'disabled',
      pause_resume_title:
        '대화가 턴을 진행 중 — 세션의 답을 기다린 뒤 Worker로 넘길 수 있습니다'
    });
  });

  test('turns ▶ 재개 into the handback of a takeover the server allows back', () => {
    const item = paused({
      interactive_sessions: [
        session('inquiry', {
          attempt_id: 'a1',
          conversation: {
            handoff: null,
            result: { kind: 'takeover' },
            handback_allowed: true
          }
        })
      ]
    });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'handoff',
      pause_resume_attempt_id: 'a1',
      pair_held: true
    });
    expect(fields.resolve_action).toBeUndefined();
  });

  test('disables ▶ 재개 on a takeover that may not go back', () => {
    const item = paused({
      interactive_sessions: [
        session('inquiry', {
          attempt_id: 'a1',
          conversation: { handoff: null, result: { kind: 'takeover' } }
        })
      ]
    });

    const fields = tileResolveFields(item, false, false);

    expect(fields.pause_resume_mode).toBe('disabled');
    expect(fields.resolve_action).toBeUndefined();
  });

  test('locks ▶ 재개 while its handoff request is pending', () => {
    const item = paused({
      wait_reasons: [AWAITING_REASON],
      interactive_sessions: [session('inquiry', { turn_state: 'question' })]
    });

    const fields = tileResolveFields(item, false, true);

    expect(fields.pause_resume_mode).toBe('disabled');
  });

  test('turns ▶ 재개 into the handback after a closed takeover window', () => {
    const item = paused({ paused_handback: 'allowed' });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'handoff',
      pause_resume_title:
        '이 대화에서 마무리한 일시정지 행을 Worker로 되돌립니다 — 대화 창을 닫고 Worker가 같은 세션을 이어갑니다',
      pause_resume_attempt_id: 'a1'
    });
  });

  test('disables ▶ 재개 after a closed takeover that may not go back', () => {
    const item = paused({ paused_handback: 'refused' });

    const fields = tileResolveFields(item, false, false);

    expect(fields).toMatchObject({
      pause_resume_mode: 'disabled',
      pause_resume_title:
        '이 대화에서 마무리 중 — Bead가 open이 아니라 Worker로 되돌릴 수 없습니다'
    });
  });

  test('names the paused conversation refusal ahead of the paused title', () => {
    const item = paused({ paused_refusal: 'bd_unavailable' });

    const fields = tileResolveFields(item, false, false);

    expect(fields.resolve_title).toBe(
      `이어가기 거절: bd_unavailable — ${PAUSED_TITLE}`
    );
  });
});

describe('sessionFinishFields (UI-lxxf §3.1)', () => {
  const FINISH_TITLE =
    '이 세션에 마감 지시를 보낸다 — 세션이 이 Bead의 남은 마감 절차를 끝낸다';

  /** @param {Record<string, any>} [over] */
  function ref(over = {}) {
    return {
      index: 0,
      provider: 'claude',
      session_id: 'sid-1',
      host: 'mac',
      current: true,
      locality: 'local',
      ...over
    };
  }

  test('enables the button for a local Claude current session', () => {
    const fields = sessionFinishFields({ session_refs: [ref()] });

    expect(fields).toEqual({
      finish_action: { enabled: true, title: FINISH_TITLE, label: '마무리' }
    });
  });

  test('disables the button for a Codex current session', () => {
    const fields = sessionFinishFields({
      session_refs: [ref({ provider: 'codex' })]
    });

    expect(fields).toEqual({
      finish_action: {
        enabled: false,
        title: 'Codex 세션은 지원하지 않습니다',
        label: '마무리'
      }
    });
  });

  test('disables the button for a Hermes current session', () => {
    const fields = sessionFinishFields({
      session_refs: [ref({ provider: 'hermes' })]
    });

    expect(fields).toEqual({
      finish_action: {
        enabled: false,
        title: '지원하지 않는 세션 종류',
        label: '마무리'
      }
    });
  });

  test('disables the button with the 세션 sentence for a remote session', () => {
    const fields = sessionFinishFields({
      session_refs: [ref({ locality: 'remote' })]
    });

    expect(fields).toEqual({
      finish_action: {
        enabled: false,
        title: '다른 머신 세션 — 이 서버에 transcript 없음',
        label: '마무리'
      }
    });
  });

  test('disables the button with the 세션 sentence for a missing transcript', () => {
    const fields = sessionFinishFields({
      session_refs: [ref({ locality: 'missing' })]
    });

    expect(fields).toEqual({
      finish_action: {
        enabled: false,
        title: 'transcript 파일 없음',
        label: '마무리'
      }
    });
  });

  test('reads only the current item of several references', () => {
    const fields = sessionFinishFields({
      session_refs: [
        ref({ provider: 'codex', current: false }),
        ref({ session_id: 'sid-2' })
      ]
    });

    expect(fields.finish_action?.enabled).toBe(true);
  });

  test('draws no button without a current session', () => {
    const with_current = sessionFinishFields({ session_refs: [ref()] });
    const without_current = sessionFinishFields({
      session_refs: [ref({ current: false })]
    });
    const empty = sessionFinishFields({ session_refs: [] });

    expect(with_current.finish_action).toBeDefined();
    expect(without_current).toEqual({});
    expect(empty).toEqual({});
  });

  test('draws no button when only the external_wait key is present', () => {
    const open = sessionFinishFields({ session_refs: [ref()] });
    const key_only = sessionFinishFields({
      session_refs: [ref()],
      has_external_wait: true
    });

    expect(open.finish_action?.enabled).toBe(true);
    expect(key_only).toEqual({});
  });

  test('disables the button as 마무리 중 inside the resend window', () => {
    const sent_at = Date.parse('2026-11-23T10:00:00.000Z');

    const fields = sessionFinishFields(
      {
        session_refs: [ref()],
        finish_sent_at: '2026-11-23T10:00:00.000Z'
      },
      sent_at + SESSION_FINISH_RESEND_MS - 1
    );

    expect(fields).toEqual({
      finish_action: {
        enabled: false,
        title: '마감 지시를 보냈다 — 전송 10분 뒤부터 다시 보낼 수 있다',
        label: '마무리 중',
        sent_at,
        resend_at: sent_at + SESSION_FINISH_RESEND_MS
      }
    });
  });

  test('enables the 마무리 중 button again once the resend window passes', () => {
    const sent_at = Date.parse('2026-11-23T10:00:00.000Z');

    const fields = sessionFinishFields(
      {
        session_refs: [ref()],
        finish_sent_at: '2026-11-23T10:00:00.000Z'
      },
      sent_at + SESSION_FINISH_RESEND_MS
    );

    expect(fields).toEqual({
      finish_action: {
        enabled: true,
        title:
          '마감 지시를 보낸 지 10분이 지났다 — 누르면 같은 지시를 다시 보낸다',
        label: '마무리 중',
        sent_at
      }
    });
  });

  test('keeps the unsupported reason over a remembered send', () => {
    const fields = sessionFinishFields(
      {
        session_refs: [ref({ provider: 'codex' })],
        finish_sent_at: '2026-11-23T10:00:00.000Z'
      },
      Date.parse('2026-11-23T10:01:00.000Z')
    );

    expect(fields.finish_action).toMatchObject({
      enabled: false,
      label: '마무리'
    });
  });

  test('reads an unparseable send time as no send', () => {
    const fields = sessionFinishFields({
      session_refs: [ref()],
      finish_sent_at: 'not-a-time'
    });

    expect(fields).toEqual({
      finish_action: { enabled: true, title: FINISH_TITLE, label: '마무리' }
    });
  });

  test('draws no button when a wait record is attached', () => {
    const open = sessionFinishFields({ session_refs: [ref()] });
    const attached = sessionFinishFields({
      session_refs: [ref()],
      external_wait: { wait_id: 'w-1' }
    });

    expect(open.finish_action?.enabled).toBe(true);
    expect(attached).toEqual({});
  });
});

describe('sessionFinishBoundaryMs (UI-wjrm)', () => {
  test('returns the time until the earliest disabled button opens', () => {
    const tiles = [
      { finish_action: { resend_at: 9000 } },
      { finish_action: { resend_at: 4000 } },
      { finish_action: { enabled: true } },
      {}
    ];

    const left = sessionFinishBoundaryMs(tiles, 1000);

    expect(left).toBe(3000);
  });

  test('returns zero for a disabled button whose window already passed', () => {
    const tiles = [{ finish_action: { resend_at: 500 } }, {}];

    const left = sessionFinishBoundaryMs(tiles, 1000);

    expect(left).toBe(0);
  });

  test('returns null when no button waits for its resend window', () => {
    const tiles = [{ finish_action: { enabled: true, sent_at: 500 } }, {}];

    const left = sessionFinishBoundaryMs(tiles, 1000);

    expect(left).toBeNull();
  });
});
