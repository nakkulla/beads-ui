import { describe, expect, test } from 'vitest';
import { judgementPopoverLines } from './judgement-popover.js';

// Moved from the retired `views/worker/lanes.test.js` (UI-dbn6 Phase 4), where
// they ran through the old lanes' thin `judgementPopoverContent` wrapper; the
// lines are this module's.

describe('judgementPopoverLines (UI-8x90 §4.5)', () => {
  test('names the 복잡 사유 sentences without a state line', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        complex_reason: 'verification_by_judgment'
      }),
      'complex'
    );

    expect(content).toEqual({
      title: '복잡한 작업으로 판정됨',
      lines: [
        '테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다',
        '칩에 프리셋을 매려면 모니터 탭 ⚙ → 칩'
      ]
    });
  });

  test('names the 세션 권장 reason in one line', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        session_preferred: true,
        session_preferred_reason: 'external_roundtrip'
      }),
      'session_preferred'
    );

    expect(content).toEqual({
      title: '워커로 돌릴 수 있지만 세션이 낫다',
      lines: [
        '하네스 밖 상대와 예측 불가 왕복 반복 — 다른 rig 세션·사람·외부 시스템'
      ]
    });
  });

  test('says where the worker-ineligible label is removed', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({ id: 'UI-a', worker_ineligible: true }),
      'ineligible'
    );

    expect(content).toEqual({
      title: '워커 실행 대상이 아니다',
      lines: [
        'worker-ineligible 라벨이 붙어 있다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    });
  });

  test('lists the missing review items', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        workflow: {
          quick_fix_review: { state: 'stale', missing: ['테스트', '문서'] }
        }
      }),
      'qfr'
    );

    expect(content).toEqual({
      title: 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
      lines: ['테스트', '문서']
    });
  });

  test('says so when no review item is missing', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        workflow: { quick_fix_review: { state: 'reviewed', missing: [] } }
      }),
      'qfr'
    );

    expect(content?.lines).toEqual(['빠진 항목 없음']);
  });

  test('names the blockers the spec is waiting on', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        spec_after_blocker: true,
        blocked_by: ['UI-b', 'UI-c']
      }),
      'spec_after_blocker'
    );

    expect(content).toEqual({
      title: '선행 결과가 설계 전제 — 스펙도 선행 뒤에',
      lines: [
        '선행: UI-b · UI-c',
        '선행이 닫히면 이 표시는 저절로 사라진다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    });
  });

  test('answers null when the 스펙 대기 judgement is absent', () => {
    expect(
      judgementPopoverLines(
        /** @type {any} */ ({ id: 'UI-a', blocked_by: ['UI-b'] }),
        'spec_after_blocker'
      )
    ).toBeNull();
  });

  test('answers null when the chip has no material', () => {
    expect(
      judgementPopoverLines(/** @type {any} */ ({ id: 'UI-a' }), 'complex')
    ).toBeNull();
  });

  test('names one sentence per receipt badge code', () => {
    const content = judgementPopoverLines(
      /** @type {any} */ ({
        id: 'UI-a',
        receipt_badge: { codes: ['absent'] }
      }),
      'receipt'
    );

    expect(content).toEqual({
      title: '실행 영수증 회계 잔여 — 머지는 진행',
      lines: [
        '실행 영수증이 기록되지 않았다 — 과거 Bead·외부 경로 PR은 원래 없다',
        '자동 머지 판정에는 영향이 없다 — 정정은 bd update --set-metadata exec_receipt=… 로'
      ]
    });
  });

  test('answers null when the receipt chip has no material', () => {
    expect(
      judgementPopoverLines(/** @type {any} */ ({ id: 'UI-a' }), 'receipt')
    ).toBeNull();
  });
});
