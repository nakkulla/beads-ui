import { render } from 'lit-html';
import { describe, expect, test, vi } from 'vitest';
import { commentsTemplate } from './comments.js';

/**
 * @param {import('lit-html').TemplateResult} tpl
 * @returns {HTMLElement}
 */
function mount(tpl) {
  const host = document.createElement('div');

  render(tpl, host);

  return host;
}

const REPORT_TEXT = [
  '## 🤖 작업 보고서',
  '> worker · attempt 1785076768091-1 · 2026-08-04T09:12:33Z',
  '',
  '**결론** — 머지 가능. 검증 전부 통과.',
  '',
  '### 진행 경과',
  '',
  '이어받아 마감했다.'
].join('\n');

const BROKEN_REPORT_TEXT = [
  '## 🤖 작업 보고서',
  '> session · 5ac8ab71 · 2026-08-02 11:05',
  '',
  '**결론** — 메타 줄이 규격을 벗어났다.'
].join('\n');

describe('views/detail-panel/comments', () => {
  test('renders the empty state and a compose box on zero comments', () => {
    const host = mount(commentsTemplate([], {}, {}));

    expect(host.querySelector('.detail-empty')?.textContent).toContain(
      '댓글 없음'
    );
    expect(host.querySelector('.detail-comment-compose textarea')).not.toBe(
      null
    );
    expect(host.textContent).toContain('댓글 (0)');
  });

  test('sorts a report and a plain comment newest first', () => {
    const comments = [
      {
        id: 'c1',
        author: 'ilsun yun',
        text: '먼저 쓴 사람 댓글',
        created_at: '2026-08-03T17:20:00Z'
      },
      {
        id: 'c2',
        author: 'agent',
        text: REPORT_TEXT,
        created_at: '2026-08-04T09:12:40Z'
      }
    ];

    const host = mount(commentsTemplate(comments, {}, {}));

    const items = host.querySelectorAll('.detail-report, .detail-comment');
    expect(items.length).toBe(2);
    expect(items[0].classList.contains('detail-report')).toBe(true);
    expect(items[1].classList.contains('detail-comment')).toBe(true);
    expect(host.querySelector('.detail-report__concl')?.textContent).toContain(
      '머지 가능. 검증 전부 통과.'
    );
  });

  test('renders an unrecognized report as a plain comment', () => {
    const comments = [
      {
        id: 'c1',
        author: 'agent',
        text: BROKEN_REPORT_TEXT,
        created_at: '2026-08-02T11:05:00Z'
      }
    ];

    const host = mount(commentsTemplate(comments, {}, {}));

    expect(host.querySelector('.detail-report')).toBe(null);
    expect(host.querySelector('.detail-comment')).not.toBe(null);
    expect(host.textContent).toContain('메타 줄이 규격을 벗어났다');
  });

  test('collapses a report by default and reflects aria-expanded when open', () => {
    const comments = [
      {
        id: 'c2',
        author: 'agent',
        text: REPORT_TEXT,
        created_at: '2026-08-04T09:12:40Z'
      }
    ];

    const closed = mount(commentsTemplate(comments, {}, {}));
    expect(
      closed
        .querySelector('.detail-report__head')
        ?.getAttribute('aria-expanded')
    ).toBe('false');
    expect(closed.querySelector('.detail-report__body')).toBe(null);

    const open = mount(
      commentsTemplate(comments, {}, { expanded: new Set(['c2']) })
    );
    expect(
      open.querySelector('.detail-report__head')?.getAttribute('aria-expanded')
    ).toBe('true');
    expect(open.querySelector('.detail-report__body')?.textContent).toContain(
      '이어받아 마감했다'
    );
  });

  test('calls onToggle with the comment id when a report head is clicked', () => {
    const onToggle = vi.fn();
    const comments = [
      {
        id: 'c2',
        author: 'agent',
        text: REPORT_TEXT,
        created_at: '2026-08-04T09:12:40Z'
      }
    ];

    const host = mount(commentsTemplate(comments, { onToggle }, {}));
    /** @type {HTMLButtonElement} */ (
      host.querySelector('.detail-report__head')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onToggle).toHaveBeenCalledWith('c2');
  });

  test('disables the submit button on an empty draft and enables it otherwise', () => {
    const empty = mount(commentsTemplate([], {}, { draft: '   ' }));
    expect(
      /** @type {HTMLButtonElement} */ (
        empty.querySelector('.detail-comment-compose__btn')
      ).disabled
    ).toBe(true);

    const filled = mount(commentsTemplate([], {}, { draft: '한 줄' }));
    expect(
      /** @type {HTMLButtonElement} */ (
        filled.querySelector('.detail-comment-compose__btn')
      ).disabled
    ).toBe(false);
  });

  test('calls onSubmit when the submit button is clicked', () => {
    const onSubmit = vi.fn();

    const host = mount(commentsTemplate([], { onSubmit }, { draft: '한 줄' }));
    /** @type {HTMLButtonElement} */ (
      host.querySelector('.detail-comment-compose__btn')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('disables the compose box while a submission is in flight', () => {
    const host = mount(
      commentsTemplate([], {}, { draft: '한 줄', sending: true })
    );

    expect(
      /** @type {HTMLTextAreaElement} */ (
        host.querySelector('.detail-comment-compose__input')
      ).disabled
    ).toBe(true);
    expect(
      /** @type {HTMLButtonElement} */ (
        host.querySelector('.detail-comment-compose__btn')
      ).disabled
    ).toBe(true);
  });

  test('shows a load failure in place of the list and keeps the compose box', () => {
    const host = mount(commentsTemplate([], {}, { error: true }));

    expect(host.querySelector('[data-seam="comments-error"]')).not.toBe(null);
    expect(host.querySelector('.detail-comment-compose')).not.toBe(null);
  });

  test('marks a worker-lane report so it reads apart from a session one', () => {
    const comments = [
      {
        id: 'c2',
        author: 'agent',
        text: REPORT_TEXT,
        created_at: '2026-08-04T09:12:40Z'
      }
    ];

    const host = mount(commentsTemplate(comments, {}, {}));

    const lane = host.querySelector('.detail-report__lane');
    expect(lane?.classList.contains('detail-report__lane--worker')).toBe(true);
    expect(lane?.textContent).toContain('worker');
    expect(lane?.getAttribute('title')).toContain('1785076768091-1');
  });
});

const REVIEW_ANCHOR = 'a'.repeat(40);

const REVIEW_TEXT = [
  '## 🔎 리뷰 결과 · impl · r2',
  'VERDICT: REVISE',
  `anchor: ${REVIEW_ANCHOR}`,
  '',
  '1. severity(blocking) | server/a.js:10 | 문제 | 최소 수정',
  '2. minor | app/b.js:3 | 문제 | 최소 수정'
].join('\n');

const BROKEN_REVIEW_TEXT = [
  '## 🔎 리뷰 결과 · impl · r2',
  'VERDICT: 통과',
  `anchor: ${REVIEW_ANCHOR}`
].join('\n');

/**
 * @param {string} text
 * @param {import('./comments.js').CommentsHandlers} [handlers]
 * @param {import('./comments.js').CommentsView} [view]
 * @returns {HTMLElement}
 */
function mountComment(text, handlers = {}, view = {}) {
  return mount(
    commentsTemplate(
      [{ id: 'r1', author: 'agent', text, created_at: '2026-09-03T04:05:00Z' }],
      handlers,
      view
    )
  );
}

describe('views/detail-panel/comments — 리뷰 결과 카드', () => {
  test('draws a review round as a collapsed card with its verdict', () => {
    const host = mountComment(REVIEW_TEXT);

    const card = host.querySelector('.detail-report--review');
    expect(card?.querySelector('.detail-report__kind')?.textContent).toBe(
      '리뷰 결과'
    );
    expect(card?.querySelector('.detail-report__lane')?.textContent).toBe(
      'impl · r2'
    );
    expect(card?.querySelector('.detail-report__verdict')?.textContent).toBe(
      'REVISE'
    );
    expect(card?.querySelector('.detail-report__body')).toBe(null);
  });

  test('shows the point count raised in the round', () => {
    const host = mountComment(REVIEW_TEXT);

    expect(host.querySelector('.detail-report__points')?.textContent).toContain(
      '지적 2건'
    );
  });

  test('marks an APPROVE verdict apart from a REVISE one', () => {
    const approve = [
      '## 🔎 리뷰 결과 · spec · r1',
      'VERDICT: APPROVE',
      `anchor: ${REVIEW_ANCHOR}`,
      '',
      '- 지적 없음'
    ].join('\n');

    const host = mountComment(approve);

    expect(
      host.querySelector('.detail-report__verdict--approve')?.textContent
    ).toBe('APPROVE');
    expect(host.querySelector('.detail-report__points')?.textContent).toContain(
      '지적 없음'
    );
  });

  test('shows the anchor as written without any freshness judgement', () => {
    const host = mountComment(REVIEW_TEXT);

    const anchor = host.querySelector('.detail-report__anchor');
    expect(anchor?.getAttribute('title')).toBe(REVIEW_ANCHOR);
    expect(host.textContent).not.toContain('stale');
  });

  test('reveals the round points when expanded', () => {
    const host = mountComment(REVIEW_TEXT, {}, { expanded: new Set(['r1']) });

    expect(host.querySelector('.detail-report__body')?.textContent).toContain(
      'server/a.js:10'
    );
  });

  test('calls onToggle with the comment id when the head is clicked', () => {
    const onToggle = vi.fn();
    const host = mountComment(REVIEW_TEXT, { onToggle });

    /** @type {HTMLButtonElement|null} */ (
      host.querySelector('.detail-report--review .detail-report__head')
    )?.click();

    expect(onToggle).toHaveBeenCalledWith('r1');
  });

  test('falls back to a plain comment when the header is off-contract', () => {
    const host = mountComment(BROKEN_REVIEW_TEXT);

    expect(host.querySelector('.detail-report--review')).toBe(null);
    expect(host.querySelector('.detail-comment')).not.toBe(null);
  });

  test('keeps a work report on its own card, not the review one', () => {
    const host = mountComment(REPORT_TEXT);

    expect(host.querySelector('.detail-report')).not.toBe(null);
    expect(host.querySelector('.detail-report--review')).toBe(null);
  });
});
