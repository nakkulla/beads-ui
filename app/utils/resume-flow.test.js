import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as resume_flow from './resume-flow.js';
import { runResumeFlow } from './resume-flow.js';

const DECISION_TOKEN = { source_attempt_id: 'a1', digest: 'one' };
const MISMATCH = {
  prior_available: true,
  prior: { runner: 'codex', model: 'sol' },
  current: { runner: 'claude', model: 'opus' },
  decision_token: DECISION_TOKEN
};

beforeEach(() => {
  document.body.innerHTML = '';
});

/**
 * Answer the first dialog. The dialog is built synchronously by the flow's
 * first statement, so a click can follow the call without awaiting. A blank
 * answer takes the immediate branch, which is what the two-branch dialog offers
 * in place of an empty submit (false input is not submittable there).
 *
 * @param {string} instructions
 */
function submitInstructions(instructions) {
  const choices = /** @type {HTMLButtonElement[]} */ (
    Array.from(document.querySelectorAll('.resume-instructions-dialog button'))
  );
  if (instructions.trim() === '') {
    choices[0].click();
    return;
  }
  choices[1].click();
  const textarea = /** @type {HTMLTextAreaElement} */ (
    document.querySelector('.resume-instructions-dialog textarea')
  );
  textarea.value = instructions;
  textarea.dispatchEvent(new Event('input'));
  /** @type {HTMLButtonElement} */ (
    document.querySelector('.resume-instructions-dialog .op-btn--primary')
  ).click();
}

/** Cancel the first dialog. */
function cancelInstructions() {
  /** @type {HTMLButtonElement} */ (
    document.querySelectorAll('.resume-instructions-dialog button')[2]
  ).click();
}

/**
 * Answer the provider-boundary dialog with 현재 preset으로 새 session.
 */
function chooseFreshSession() {
  /** @type {HTMLButtonElement} */ (
    document.querySelectorAll('.continuation-dialog button')[1]
  ).click();
}

/** Let every queued microtask and the dialog promises settle. */
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('runResumeFlow', () => {
  test.each([
    [
      { prior_lane: 'quick_fix', current_route: 'spec_backed' },
      ' quick_fix에서 spec_backed로'
    ],
    [undefined, '']
  ])(
    'explains a route refusal with details %j',
    async (route_change, change) => {
      const transport = vi.fn().mockResolvedValue({
        resumed: false,
        reason: 'route_changed',
        route_change
      });

      const flow = runResumeFlow({ context: { kind: 'session' }, transport });
      submitInstructions('');
      await flow;

      expect(document.querySelector('.toast')?.textContent).toBe(
        `승인된 작업 방식이${change} 바뀌어 이전 세션을 이어갈 수 없습니다. [폐기] 뒤 후보에서 대기열에 다시 배치하면 현재 방식으로 새로 시작됩니다.`
      );
    }
  );

  test('leaves transport uncalled when the first dialog is cancelled', async () => {
    const transport = vi.fn();

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    cancelInstructions();

    await expect(flow).resolves.toBeNull();
    expect(transport).not.toHaveBeenCalled();
  });

  test('carries the same instructions on all four sends', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ continuation_mismatch: MISMATCH })
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ resumed: true });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('  로그부터 확인  ');
    await flush();
    chooseFreshSession();
    await flow;

    expect(
      transport.mock.calls.map(([payload]) => payload.instructions)
    ).toEqual([
      '로그부터 확인',
      '로그부터 확인',
      '로그부터 확인',
      '로그부터 확인'
    ]);
  });

  test('omits the instructions key on all four sends when none were given', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ continuation_mismatch: MISMATCH })
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ resumed: true });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('   ');
    await flush();
    chooseFreshSession();
    await flow;

    expect(transport).toHaveBeenCalledTimes(4);
    expect(
      transport.mock.calls.every(([payload]) => !('instructions' in payload))
    ).toBe(true);
  });

  test('sends exactly once more after a conflict and stops on a second one', async () => {
    const transport = vi.fn().mockResolvedValue({ conflict: true });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('');
    await flow;

    expect(transport).toHaveBeenCalledTimes(2);
  });

  test('sends continuation, decision_token and instructions together after the second dialog', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ continuation_mismatch: MISMATCH })
      .mockResolvedValueOnce({ resumed: true });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('테스트부터');
    await flush();
    chooseFreshSession();
    await flow;

    expect(transport.mock.calls[1][0]).toEqual({
      instructions: '테스트부터',
      continuation: 'fresh_current',
      decision_token: DECISION_TOKEN
    });
  });

  test('adopts every reply before the next send', async () => {
    const adopt = vi.fn();
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ resumed: true });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport,
      adopt
    });
    submitInstructions('');
    await flow;

    expect(adopt.mock.calls.map(([res]) => res.resumed)).toEqual([
      undefined,
      true,
      true
    ]);
  });

  test('raises the 이어하기 refusal toast for a session resume', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue({ resumed: false, reason: 'no_session_id' });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('');
    await flow;

    expect(document.querySelector('.toast')?.textContent).toBe(
      '이어하기 거부: no_session_id'
    );
  });

  test('raises the 정리 재시도 refusal toast for a settlement resume', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue({ resumed: false, reason: 'no_session_id' });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'settlement' },
      transport
    });
    submitInstructions('');
    await flow;

    expect(document.querySelector('.toast')?.textContent).toBe(
      '정리 재시도 거부: no_session_id'
    );
  });

  test('stays quiet when a conflict is the last word', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue({ resumed: false, conflict: true, reason: 'stale' });

    const flow = runResumeFlow({
      context: { bead_id: 'A-1', kind: 'session' },
      transport
    });
    submitInstructions('');
    await flow;

    expect(document.querySelector('.toast')).toBeNull();
  });
});

describe('resume-flow 모듈 표면', () => {
  test('no longer exports the instructions-restart flow', () => {
    expect(resume_flow).not.toHaveProperty('runRestartWithInstructionsFlow');
  });
});
