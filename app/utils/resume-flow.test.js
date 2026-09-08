import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  runRestartWithInstructionsFlow,
  runResumeFlow
} from './resume-flow.js';

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
 * first statement, so a click can follow the call without awaiting.
 *
 * @param {string} instructions
 */
function submitInstructions(instructions) {
  const textarea = /** @type {HTMLTextAreaElement} */ (
    document.querySelector('.resume-instructions-dialog textarea')
  );
  textarea.value = instructions;
  /** @type {HTMLButtonElement} */ (
    document.querySelector('.resume-instructions-dialog .op-btn--primary')
  ).click();
}

/** Cancel the first dialog. */
function cancelInstructions() {
  /** @type {HTMLButtonElement} */ (
    document.querySelectorAll('.resume-instructions-dialog button')[1]
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

/**
 * Answer a mandatory-input dialog: the confirm button is disabled until the
 * textarea reports a value, so the input event is part of the interaction.
 *
 * @param {string} instructions
 */
function submitRequiredInstructions(instructions) {
  const textarea = /** @type {HTMLTextAreaElement} */ (
    document.querySelector('.resume-instructions-dialog textarea')
  );
  textarea.value = instructions;
  textarea.dispatchEvent(new Event('input'));
  /** @type {HTMLButtonElement} */ (
    document.querySelector('.resume-instructions-dialog .op-btn--primary')
  ).click();
}

describe('runRestartWithInstructionsFlow (UI-qce9 §3.2)', () => {
  test('sends pause once and then resumes with the recorded-execution choice', async () => {
    const pause = vi.fn(async () => ({ paused: true, phase: 'done' }));
    const resume = vi.fn(async () => ({ resumed: true }));
    const snapshot = vi.fn(() => ({ attempts: {} }));

    const flow = runRestartWithInstructionsFlow({
      context: { bead_id: 'A-1', kind: 'restart', attempt_id: 'att-1' },
      pause,
      resume,
      snapshot
    });
    submitRequiredInstructions('테스트부터 고쳐라');
    const result = await flow;

    expect(pause).toHaveBeenCalledTimes(1);
    expect(resume).toHaveBeenCalledTimes(1);
    expect(resume).toHaveBeenCalledWith({
      continuation: 'prior_attempt',
      instructions: '테스트부터 고쳐라'
    });
    expect(result).toBe('테스트부터 고쳐라');
  });

  test('skips the pause half for a paused row', async () => {
    const pause = vi.fn();
    const resume = vi.fn(async () => ({ resumed: true }));

    const flow = runRestartWithInstructionsFlow({
      context: { kind: 'resume_recorded', attempt_id: 'att-1' },
      pause,
      resume,
      snapshot: () => ({ attempts: {} })
    });
    submitRequiredInstructions('이어서');
    await flow;

    expect(pause).not.toHaveBeenCalled();
    expect(resume).toHaveBeenCalledTimes(1);
  });

  test('sends nothing when the dialog is cancelled', async () => {
    const pause = vi.fn();
    const resume = vi.fn();

    const flow = runRestartWithInstructionsFlow({
      context: { kind: 'restart', attempt_id: 'att-1' },
      pause,
      resume,
      snapshot: () => ({ attempts: {} })
    });
    cancelInstructions();

    await expect(flow).resolves.toBeNull();
    expect(pause).not.toHaveBeenCalled();
    expect(resume).not.toHaveBeenCalled();
  });

  test('keeps the dialog open with the reason when the pause is refused', async () => {
    const pause = vi.fn(async () => ({
      paused: false,
      reason: 'bead_running'
    }));
    const resume = vi.fn();

    runRestartWithInstructionsFlow({
      context: { kind: 'restart', attempt_id: 'att-1' },
      pause,
      resume,
      snapshot: () => ({ attempts: {} })
    });
    submitRequiredInstructions('고쳐라');
    await flush();

    expect(resume).not.toHaveBeenCalled();
    expect(
      document.querySelector('.resume-instructions-dialog__error')?.textContent
    ).toBe('재시작 거부: bead_running');
    expect(
      /** @type {HTMLTextAreaElement} */ (
        document.querySelector('.resume-instructions-dialog textarea')
      ).value
    ).toBe('고쳐라');
  });

  test('does not resend a lost pause while the attempt still runs', async () => {
    const pause = vi.fn(async () => {
      throw new Error('socket closed');
    });
    const resume = vi.fn();

    runRestartWithInstructionsFlow({
      context: { kind: 'restart', attempt_id: 'att-1' },
      pause,
      resume,
      snapshot: () => ({ attempts: { 'att-1': { status: 'running' } } })
    });
    submitRequiredInstructions('고쳐라');
    await flush();

    expect(pause).toHaveBeenCalledTimes(1);
    expect(resume).not.toHaveBeenCalled();
    expect(
      document.querySelector('.resume-instructions-dialog__error')?.textContent
    ).toBe('중단 응답을 받지 못했습니다. 최신 상태를 확인하세요.');
  });

  test('reports an existing child instead of resuming twice on a lost reply', async () => {
    const resume = vi.fn(async () => {
      throw new Error('socket closed');
    });

    const flow = runRestartWithInstructionsFlow({
      context: { kind: 'resume_recorded', attempt_id: 'att-1' },
      pause: vi.fn(),
      resume,
      snapshot: () => ({
        attempts: { 'att-2': { resumed_from: 'att-1', status: 'running' } }
      })
    });
    submitRequiredInstructions('이어서');

    await expect(flow).resolves.toBe('이어서');
    expect(resume).toHaveBeenCalledTimes(1);
  });

  test('surfaces a resume refusal without closing the dialog', async () => {
    const resume = vi.fn(async () => ({
      resumed: false,
      reason: 'prior_session_unavailable'
    }));

    runRestartWithInstructionsFlow({
      context: { kind: 'resume_recorded', attempt_id: 'att-1' },
      pause: vi.fn(),
      resume,
      snapshot: () => ({ attempts: {} })
    });
    submitRequiredInstructions('이어서');
    await flush();

    expect(
      document.querySelector('.resume-instructions-dialog__error')?.textContent
    ).toBe('이어하기 거부: prior_session_unavailable');
  });

  test('retries a revision conflict once', async () => {
    const resume = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true })
      .mockResolvedValueOnce({ resumed: true });

    const flow = runRestartWithInstructionsFlow({
      context: { kind: 'resume_recorded', attempt_id: 'att-1' },
      pause: vi.fn(),
      resume,
      snapshot: () => ({ attempts: {} })
    });
    submitRequiredInstructions('이어서');
    await flow;

    expect(resume).toHaveBeenCalledTimes(2);
  });
});
