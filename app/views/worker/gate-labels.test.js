import { describe, expect, test } from 'vitest';
import { autoSwitchText, providerHoldBadgeText } from './gate-labels.js';

// 타일 뱃지와 대기 행의 게이트 칩이 같은 문자열을 내야 하므로 문구는 여기 하나다
// (UI-01wh §3.2). 원래 running-grid.test.js가 들고 있던 검증을 그대로 옮겼다.
describe('provider hold badge text (UI-01wh §3.2)', () => {
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

    expect(text).toBe(`⚠️ 공급자 장애 · 다음 프로브 ${clock}`);
  });

  test('formats the usage badge with an account alias', () => {
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

    expect(text).toBe(`⏳ 한도 대기 ${clock} · 업무`);
  });

  test('formats an unknown reset with the manual suffix', () => {
    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      auto_resume: 'disarmed'
    });

    expect(text).toBe('⏳ 한도 대기 · 리셋 미상 · 수동 조치');
  });
});

// 한도 보류가 왜 계정을 바꾸지 않았는지는 정책 어휘로 읽힌다 (UI-13o1 §3.4, RED 21).
describe('auto switch reason text (UI-13o1 §3.4)', () => {
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
