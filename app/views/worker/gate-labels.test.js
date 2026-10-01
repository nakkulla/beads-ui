import { describe, expect, test } from 'vitest';
import {
  autoResumeRefusalBadge,
  autoSwitchText,
  providerClock,
  providerHoldBadgeText
} from './gate-labels.js';

// 타일 뱃지와 대기 행의 게이트 칩이 같은 문자열을 내야 하므로 문구는 여기 하나다
// (UI-01wh §3.2). 원래 running-grid.test.js가 들고 있던 검증을 그대로 옮겼다.
describe('provider hold badge text (UI-01wh §3.2)', () => {
  test.each([
    { resets_at: 7_200_000, switch_ready_at: 3_600_000, expected: 3_600_000 },
    { resets_at: 3_600_000, switch_ready_at: 7_200_000, expected: 3_600_000 },
    { resets_at: undefined, switch_ready_at: 3_600_000, expected: 3_600_000 }
  ])(
    'uses the earliest available usage-hold deadline ($resets_at, $switch_ready_at)',
    ({ resets_at, switch_ready_at, expected }) => {
      const text = providerHoldBadgeText({
        kind: 'usage_limit',
        detail: 'usage_limit',
        auto_switch: 'none',
        resets_at,
        switch_ready_at
      });

      expect(text).toBe(`⏳ 공급자 보류 ${providerClock(expected)}`);
    }
  );

  test('ignores a stale switch deadline in wait mode', () => {
    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      auto_switch: 'disabled',
      resets_at: 7_200_000,
      switch_ready_at: 3_600_000
    });

    expect(text).toBe(`⏳ 공급자 보류 ${providerClock(7_200_000)}`);
  });

  test('formats the outage badge with its next probe', () => {
    const clock = new Date(3000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const text = providerHoldBadgeText({
      kind: 'outage',
      detail: 'overloaded_529',
      next_probe_at: 3000
    });

    expect(text).toBe(`⏳ 공급자 보류 · 다음 프로브 ${clock}`);
  });

  // 계정은 칩을 떠나 팝업에만 남는다 (UI-pw2g §3.3): 별명 없는 계정은 이메일
  // 전체가 들어와 칩 하나가 담는 줄을 혼자 차지했다.
  test('formats the usage badge with the reset clock and no account', () => {
    const clock = new Date(4000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      resets_at: 4000,
      target: { account: 'one@example.com', account_alias: '업무' }
    });

    expect(text).toBe(`⏳ 공급자 보류 ${clock}`);
  });

  test('leaves the plain account out of the usage badge too', () => {
    const clock = new Date(4000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      resets_at: 4000,
      target: { account: 'nakkulla@example.com' }
    });

    expect(text).toBe(`⏳ 공급자 보류 ${clock}`);
  });

  test('ignores a retired auto-resume cap when formatting an unknown reset', () => {
    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      auto_resume: 'disarmed'
    });

    expect(text).toBe('⏳ 공급자 보류 · 리셋 미상');
  });
});

// 한도 보류가 왜 계정을 바꾸지 않았는지는 정책 어휘로 읽힌다 (UI-13o1 §3.4, RED 21).
describe('auto switch reason text (UI-13o1 §3.4)', () => {
  test('adds the server-selected receiving account and deadline to the reason', () => {
    const text = autoSwitchText('none', {
      switch_ready_at: 3_600_000,
      switch_ready_account: '업무'
    });

    expect(text).toBe(
      `허용 계정 중 사용 가능한 계정 없음 · 전환 예정 업무 ${providerClock(3_600_000)}`
    );
  });

  test('words the wait mode as a mode choice, not a broken switch', () => {
    const text = autoSwitchText('disabled');

    expect(text).toBe('계정 전환 안 함 · 기다림 모드');
  });

  test('words an empty allow list as a missing configuration', () => {
    const text = autoSwitchText('unconfigured');

    expect(text).toBe('계정 전환 안 함 · 전환 허용 계정 미지정');
  });

  test('scopes the no-candidate sentence to the allow list', () => {
    const text = autoSwitchText('none');

    expect(text).toBe('허용 계정 중 사용 가능한 계정 없음');
  });

  test('says nothing for the retired cap reason', () => {
    const text = autoSwitchText('cap');

    expect(text).toBe('');
  });
});

// 보류 기록이 없는 공급자 보류 타일의 슬롯 1 배지 (2026-10-01 stall-reconcile D5):
// 같은 배타 자리의 문구만 바뀌고, 거절 기록이 없으면 지금 배지 그대로다.
describe('auto-resume refusal badge (stall-reconcile D5)', () => {
  test('words a transient refusal as an automatic retry with its next time', () => {
    const badge = autoResumeRefusalBadge({
      kind: 'outage',
      detail: 'overloaded_529',
      auto_resume_refusal: {
        kind: 'transient',
        next_at: 9000,
        reason: 'bd_snapshot_failed'
      }
    });

    expect([badge?.text, badge?.verdict, badge?.next_at]).toEqual([
      '⏳ 자동 재개 재시도',
      null,
      9000
    ]);
  });

  test('words a wait refusal as the same automatic retry', () => {
    const badge = autoResumeRefusalBadge({
      kind: 'usage_limit',
      detail: 'usage_limit',
      auto_resume_refusal: {
        kind: 'wait',
        next_at: 9000,
        reason: 'provider_gate'
      }
    });

    expect(badge?.text).toBe('⏳ 자동 재개 재시도');
  });

  test('words a permanent refusal as an action with its reason', () => {
    const badge = autoResumeRefusalBadge({
      kind: 'outage',
      detail: 'overloaded_529',
      auto_resume_refusal: {
        kind: 'permanent',
        next_at: null,
        reason: 'worktree_missing'
      }
    });

    expect([badge?.text, badge?.verdict, badge?.next_at]).toEqual([
      '⛔ 조치 필요 · 자동 재개 거부 worktree_missing',
      'action_required',
      null
    ]);
  });

  test('words a closed refusal as the same action', () => {
    const badge = autoResumeRefusalBadge({
      kind: 'outage',
      detail: 'overloaded_529',
      auto_resume_refusal: {
        kind: 'closed',
        next_at: null,
        reason: 'not_ready:closed'
      }
    });

    expect(badge?.text).toBe('⛔ 조치 필요 · 자동 재개 거부 not_ready:closed');
  });

  test('returns nothing without a refusal record', () => {
    const badge = autoResumeRefusalBadge({
      kind: 'outage',
      detail: 'overloaded_529',
      auto_resume: 'refused:bd_snapshot_failed'
    });

    expect(badge).toBeNull();
  });
});
