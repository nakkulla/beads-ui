import { describe, expect, test } from 'vitest';
import {
  attemptFailureComment,
  logRow,
  summaryRow
} from './failure-comment.js';

describe('실패 hand-off 댓글 형식 (record-timeline-retention §9)', () => {
  test('carries the summary line and the log path', () => {
    const text = attemptFailureComment({
      cause: 'session_failed:is_error',
      summary: 'API Error: 529 Overloaded',
      log_path: '/w/beads/UI-1/sessions/a1.jsonl'
    });

    expect(text).toContain('## 🤖 세션 실패 기록');
    expect(text).toContain('- 원인: session_failed:is_error');
    expect(text).toContain('- 요약: API Error: 529 Overloaded');
    expect(text).toContain('- 로그: /w/beads/UI-1/sessions/a1.jsonl');
  });

  test('titles a park as a park', () => {
    const text = attemptFailureComment({
      parked: true,
      cause: 'session_parked',
      summary: 'spec 리뷰 REVISE 7건 확인 요청'
    });

    expect(text).toContain('## 🤖 세션 파킹 기록');
    expect(text).toContain('- 다음: 파킹 타일의 [세션에서 해결] · [폐기]');
  });

  test('omits the summary row when the failure produced no line', () => {
    const text = attemptFailureComment({ cause: 'session_failed' });

    expect(text).not.toContain('- 요약:');
  });

  test('says so when the attempt left no log', () => {
    expect(logRow(null)).toBe('- 로그: (없음)');
  });

  test('drops a blank summary rather than emitting an empty field', () => {
    expect(summaryRow('   ')).toEqual([]);
  });
});
