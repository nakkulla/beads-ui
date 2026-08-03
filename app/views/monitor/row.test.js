import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { monitorGroupTemplate, monitorRowTemplate } from './row.js';

const NOW = 1_700_000_000_000;

/**
 * @param {import('lit-html').TemplateResult} tpl
 * @returns {HTMLElement}
 */
function mount(tpl) {
  document.body.innerHTML = '<div id="m"></div>';
  const el = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(tpl, el);
  return el;
}

describe('views/monitor/row', () => {
  test('renders id and title', () => {
    const el = mount(
      monitorRowTemplate({ id: 'UI-1', title: '모니터 탭' }, NOW)
    );

    expect(el.querySelector('.mon-row__id')?.textContent?.trim()).toBe('UI-1');
    expect(el.querySelector('.mon-row__title')?.textContent?.trim()).toBe(
      '모니터 탭'
    );
  });

  test('shows the current child title when there is one', () => {
    const el = mount(
      monitorRowTemplate(
        { id: 'UI-1', title: '부모', current_child: 'T5: 통합 검증' },
        NOW
      )
    );

    expect(el.querySelector('.mon-row__child')?.textContent).toContain(
      'T5: 통합 검증'
    );
  });

  test('omits the child element when there is no current child', () => {
    const el = mount(
      monitorRowTemplate(
        { id: 'UI-1', title: '부모', current_child: null },
        NOW
      )
    );

    expect(el.querySelector('.mon-row__child')).toBe(null);
  });

  test('renders elapsed and no 마지막 갱신 for a row with an attempt', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '실행중',
          has_attempt: true,
          started_at: NOW - 65_000,
          updated_at: NOW - 600_000
        },
        NOW
      )
    );

    expect(el.querySelector('.mon-row__elapsed')?.textContent?.trim()).toBe(
      '1m 05s'
    );
    expect(el.querySelector('.mon-row__since')).toBe(null);
  });

  test('renders 마지막 갱신 후 경과 and no elapsed for a row with no attempt', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '대화형',
          has_attempt: false,
          updated_at: NOW - 600_000
        },
        NOW
      )
    );

    expect(el.querySelector('.mon-row__elapsed')).toBe(null);
    expect(el.querySelector('.mon-row__since')?.textContent).toContain(
      '10분 전'
    );
  });

  test('renders the token badge when usage is present', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '실행중',
          has_attempt: true,
          started_at: NOW - 1_000,
          usage: { input_tokens: 1_000, output_tokens: 2_000 }
        },
        NOW
      )
    );

    expect(el.querySelector('.worker-usage')).not.toBe(null);
  });
});

describe('views/monitor/row heartbeat', () => {
  test('renders a live dot when the last event is within the window', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '실행중',
          has_attempt: true,
          started_at: NOW - 10_000,
          last_event_at: NOW - 5_000
        },
        NOW
      )
    );

    const beat = el.querySelector('.mon-row__beat');
    expect(beat?.classList.contains('mon-row__beat--live')).toBe(true);
    expect(el.querySelector('.mon-row__beat-age')).toBe(null);
  });

  test('renders a dim dot with the age when the last event is stale', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '실행중',
          has_attempt: true,
          started_at: NOW - 600_000,
          last_event_at: NOW - 300_000
        },
        NOW
      )
    );

    const beat = el.querySelector('.mon-row__beat');
    expect(beat?.classList.contains('mon-row__beat--live')).toBe(false);
    expect(el.querySelector('.mon-row__beat-age')?.textContent).toContain(
      '5분 전'
    );
  });

  test('renders no dot at all when last_event_at is absent', () => {
    const el = mount(
      monitorRowTemplate(
        {
          id: 'UI-1',
          title: '실행중',
          has_attempt: true,
          started_at: NOW - 10_000,
          last_event_at: null
        },
        NOW
      )
    );

    expect(el.querySelector('.mon-row__beat')).toBe(null);
  });
});

describe('views/monitor/row group', () => {
  test('renders the empty message with no rows', () => {
    const el = mount(monitorGroupTemplate([], NOW));

    expect(el.querySelectorAll('.mon-row').length).toBe(0);
    expect(el.querySelector('.mon-group__empty')?.textContent?.trim()).toBe(
      '진행중 이슈 없음'
    );
  });

  test('renders one row per item with the count', () => {
    const el = mount(
      monitorGroupTemplate(
        [
          { id: 'UI-1', title: 'a' },
          { id: 'UI-2', title: 'b' }
        ],
        NOW
      )
    );

    expect(el.querySelectorAll('.mon-row').length).toBe(2);
    expect(el.querySelector('.mon-group__count')?.textContent?.trim()).toBe(
      '2'
    );
  });
});
