import { describe, expect, test } from 'vitest';
import { parseReport, parseReviewComment } from './report-marker.js';

const ANCHOR = '## 🤖 작업 보고서';

describe('utils/report-marker', () => {
  test('recognizes a session-lane report and extracts its meta fields', () => {
    const text = [
      ANCHOR,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '**결론** — PR #339 제출 완료, 머지 판단 가능.',
      '',
      '### 진행 경과',
      '',
      '본문.'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toEqual({
      lane: 'session',
      identifier: 'b36fdefa',
      timestamp: '2026-08-04T02:01:46Z',
      conclusion: 'PR #339 제출 완료, 머지 판단 가능.',
      body: '### 진행 경과\n\n본문.'
    });
  });

  test('recognizes a worker-lane report', () => {
    const text = [
      ANCHOR,
      '> worker · attempt 1785076768091-1 · 2026-08-04T09:12:33Z',
      '',
      '**결론** — 머지 가능.'
    ].join('\n');

    const report = parseReport(text);

    expect(report?.lane).toBe('worker');
    expect(report?.identifier).toBe('1785076768091-1');
  });

  test('returns null when only the anchor matches', () => {
    const text = [ANCHOR, '작성자 메모입니다.', '', '**결론** — 없음'].join(
      '\n'
    );

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('returns null when the meta line breaks the grammar', () => {
    const text = [
      ANCHOR,
      '> session · 5ac8ab71 · 2026-08-02 11:05',
      '',
      '**결론** — 규격 위반'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('returns null when the anchor is not the first line', () => {
    const text = [
      '앞선 한 줄',
      ANCHOR,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('returns null on a crossed lane/identifier pair', () => {
    const text = [
      ANCHOR,
      '> worker · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '**결론** — 교차 조합'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('collapses runs of whitespace inside the conclusion preview', () => {
    const text = [
      ANCHOR,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '**결론** — 머지   가능.\t검증  통과.'
    ].join('\n');

    const report = parseReport(text);

    expect(report?.conclusion).toBe('머지 가능. 검증 통과.');
  });

  test('recognizes a report with no conclusion line and empties the preview', () => {
    const text = [
      ANCHOR,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '### 진행 경과',
      '',
      '본문만 있다.'
    ].join('\n');

    const report = parseReport(text);

    expect(report?.conclusion).toBe('');
    expect(report?.body).toBe('### 진행 경과\n\n본문만 있다.');
  });

  test('returns null when the anchor line carries trailing whitespace', () => {
    const text = [
      `${ANCHOR}  `,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '**결론** — 규격 위반'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('returns null when the meta line is indented', () => {
    const text = [
      ANCHOR,
      '  > session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '**결론** — 규격 위반'
    ].join('\n');

    const report = parseReport(text);

    expect(report).toBe(null);
  });

  test('recognizes a CRLF report and leaves no carriage return behind', () => {
    const text = [
      ANCHOR,
      '> worker · attempt 1785076768091-1 · 2026-08-04T09:12:33Z',
      '',
      '**결론** — 머지 가능.',
      '',
      '### 진행 경과'
    ].join('\r\n');

    const report = parseReport(text);

    expect(report?.conclusion).toBe('머지 가능.');
    expect(report?.body).toBe('### 진행 경과');
  });

  test('leaves an indented conclusion line to the body', () => {
    const text = [
      ANCHOR,
      '> session · sid b36fdefa · 2026-08-04T02:01:46Z',
      '',
      '  **결론** — 들여쓴 결론'
    ].join('\n');

    const report = parseReport(text);

    expect(report?.conclusion).toBe('');
    expect(report?.body).toBe('**결론** — 들여쓴 결론');
  });

  test('returns null on a non-string input', () => {
    expect(parseReport(/** @type {any} */ (null))).toBe(null);
    expect(parseReport(/** @type {any} */ (undefined))).toBe(null);
  });
});

const SHA = 'a'.repeat(40);
const DIGEST = '9f8e7d6c5b4a';

/**
 * @param {string[]} lines
 * @returns {string}
 */
function reviewText(lines) {
  return lines.join('\n');
}

describe('utils/report-marker — parseReviewComment', () => {
  test('recognizes an impl round and counts its numbered points', () => {
    const text = reviewText([
      '## 🔎 리뷰 결과 · impl · r2',
      'VERDICT: REVISE',
      `anchor: ${SHA}`,
      '',
      '1. severity(blocking) | server/a.js:10 | 문제 | 최소 수정',
      '2. minor | app/b.js:3 | 문제 | 최소 수정'
    ]);

    const review = parseReviewComment(text);

    expect(review).toEqual({
      step: 'impl',
      round: 2,
      verdict: 'REVISE',
      anchor: SHA,
      points: 2,
      body: [
        '1. severity(blocking) | server/a.js:10 | 문제 | 최소 수정',
        '2. minor | app/b.js:3 | 문제 | 최소 수정'
      ].join('\n')
    });
  });

  test('reads an explicit 지적 없음 line as zero points', () => {
    const review = parseReviewComment(
      reviewText([
        '## 🔎 리뷰 결과 · spec · r1',
        'VERDICT: APPROVE',
        `anchor: ${SHA}`,
        '',
        '- 지적 없음'
      ])
    );

    expect(review?.points).toBe(0);
  });

  test('accepts a plan round bound to a 12hex draft digest', () => {
    const review = parseReviewComment(
      reviewText([
        '## 🔎 리뷰 결과 · plan · r1',
        'VERDICT: APPROVE',
        `anchor: ${DIGEST}`,
        '',
        '- 지적 없음'
      ])
    );

    expect(review?.step).toBe('plan');
    expect(review?.anchor).toBe(DIGEST);
  });

  test('rejects a plan round carrying a commit-length anchor', () => {
    const review = parseReviewComment(
      reviewText([
        '## 🔎 리뷰 결과 · plan · r1',
        'VERDICT: APPROVE',
        `anchor: ${SHA}`,
        ''
      ])
    );

    expect(review).toBe(null);
  });

  test('leaves points null when the body states neither points nor 지적 없음', () => {
    const review = parseReviewComment(
      reviewText([
        '## 🔎 리뷰 결과 · spec · r1',
        'VERDICT: APPROVE',
        `anchor: ${SHA}`,
        '',
        '자유 서술만 있다.'
      ])
    );

    expect(review?.points).toBe(null);
  });

  test.each([
    ['an unknown step', ['## 🔎 리뷰 결과 · quick · r1', 'VERDICT: APPROVE']],
    ['a work-report anchor', [ANCHOR, 'VERDICT: APPROVE']],
    ['a missing verdict line', ['## 🔎 리뷰 결과 · spec · r1', '지적 없음']],
    [
      'an unknown verdict token',
      ['## 🔎 리뷰 결과 · spec · r1', 'VERDICT: MAYBE']
    ]
  ])('returns null for %s', (_label, head) => {
    expect(parseReviewComment(reviewText([...head, `anchor: ${SHA}`]))).toBe(
      null
    );
  });

  test('returns null when the anchor line is missing', () => {
    const review = parseReviewComment(
      reviewText(['## 🔎 리뷰 결과 · spec · r1', 'VERDICT: APPROVE', ''])
    );

    expect(review).toBe(null);
  });

  test('returns null for a plain comment and for empty text', () => {
    expect(parseReviewComment('사람이 쓴 댓글')).toBe(null);
    expect(parseReviewComment('')).toBe(null);
  });
});
