import { describe, expect, test } from 'vitest';
import { EXEC_SETTING_KEYS } from './exec-enums.js';
import {
  RESTART_INELIGIBLE_REASONS,
  instructionsRestartEligibility,
  restartRecordEligibility
} from './instructions-restart.js';

/** @returns {Record<string, string|null>} */
function execValues() {
  return Object.fromEntries(EXEC_SETTING_KEYS.map((key) => [key, null]));
}

/**
 * @param {Record<string, unknown>} [over]
 * @returns {Record<string, unknown>}
 */
function runningAttempt(over = {}) {
  return {
    attempt_id: 'a1',
    bead_id: 'B1',
    kind: 'implementation',
    status: 'running',
    session_id: 'sid-1',
    process_identity: { pid: 10, pgid: 10, started_at: 1 },
    runner: 'claude',
    model: 'opus',
    effort: 'high',
    speed: 'default',
    claude_account: 'a@example.com',
    codex_account: null,
    exec_values: execValues(),
    ...over
  };
}

describe('instructions restart eligibility (UI-qce9 §2)', () => {
  test('accepts an ordinary running implementation attempt', () => {
    const attempt = runningAttempt();

    const verdict = instructionsRestartEligibility(attempt);

    expect(verdict).toEqual({ eligible: true, code: null, reason: null });
  });

  test('accepts a quick_fix lane implementation attempt', () => {
    const attempt = runningAttempt({ quickfix_lane: true });

    const verdict = instructionsRestartEligibility(attempt);

    expect(verdict.eligible).toBe(true);
  });

  test('refuses a null active account with the recorded-account sentence', () => {
    const attempt = runningAttempt({ claude_account: null });

    const verdict = instructionsRestartEligibility(attempt);

    expect(verdict).toEqual({
      eligible: false,
      code: 'account_missing',
      reason: RESTART_INELIGIBLE_REASONS.account_missing
    });
    expect(verdict.reason).toBe(
      '실행 계정이 기록되지 않아 같은 계정으로 재시작할 수 없습니다.'
    );
  });

  test('reads the codex account for a codex runner', () => {
    const attempt = runningAttempt({
      runner: 'codex',
      claude_account: 'a@example.com',
      codex_account: null
    });

    const verdict = instructionsRestartEligibility(attempt);

    expect(verdict.code).toBe('account_missing');
  });

  test('refuses a review session', () => {
    const attempt = runningAttempt({ kind: 'review_session' });

    const verdict = instructionsRestartEligibility(attempt);

    expect(verdict).toMatchObject({
      eligible: false,
      code: 'not_implementation'
    });
  });

  test('refuses a conflict resolution and a disposition', () => {
    const conflict = instructionsRestartEligibility(
      runningAttempt({ conflict_resolution: true })
    );
    const disposition = instructionsRestartEligibility(
      runningAttempt({ disposition: 'revise' })
    );

    expect(conflict.code).toBe('not_implementation');
    expect(disposition.code).toBe('not_implementation');
  });

  test('refuses a record with no session id yet', () => {
    const verdict = instructionsRestartEligibility(
      runningAttempt({ session_id: null })
    );

    expect(verdict).toMatchObject({
      code: 'no_session_id',
      reason: '세션 ID 기록 전 — 재시작 불가'
    });
  });

  test('refuses a record with no process identity', () => {
    const verdict = instructionsRestartEligibility(
      runningAttempt({ process_identity: null, pid: null })
    );

    expect(verdict).toMatchObject({
      code: 'no_process_identity',
      reason: '프로세스 신원이 기록되지 않아 재시작할 수 없습니다.'
    });
  });

  test('refuses an incomplete execution record', () => {
    const values = execValues();
    delete values[EXEC_SETTING_KEYS[0]];

    const verdict = instructionsRestartEligibility(
      runningAttempt({ exec_values: values })
    );

    expect(verdict).toMatchObject({
      code: 'exec_incomplete',
      reason: '실행 설정 기록이 불완전해 같은 설정으로 재시작할 수 없습니다.'
    });
  });

  test('accepts a paused attempt only after its durable pause is done', () => {
    const settled = instructionsRestartEligibility(
      runningAttempt({
        status: 'paused',
        control: { kind: 'pause', phase: 'done', requested_at: 1 }
      })
    );
    const mid = instructionsRestartEligibility(
      runningAttempt({
        status: 'paused',
        control: { kind: 'pause', phase: 'signaled', requested_at: 1 }
      })
    );

    expect(settled.eligible).toBe(true);
    expect(mid).toMatchObject({ eligible: false, code: 'pause_not_settled' });
  });

  test('refuses every other status while keeping the record verdict pure', () => {
    const failed = instructionsRestartEligibility(
      runningAttempt({ status: 'failed' })
    );

    expect(failed.code).toBe('not_restartable');
    expect(
      restartRecordEligibility(runningAttempt({ status: 'failed' }))
    ).toEqual({ eligible: true, code: null, reason: null });
  });
});
