import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import {
  HEARTBEAT_FRESH_MS,
  monitorPipelineTemplate,
  monitorRowTemplate
} from './row.js';

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

/**
 * @param {Partial<import('./row.js').MonitorRowItem>} [patch]
 * @returns {import('./row.js').MonitorRowItem}
 */
function item(patch = {}) {
  return {
    id: 'UI-1',
    title: '제목',
    root_dir: '/tmp/example/repo-a',
    workspace_name: 'repo-a',
    lane: 'queue',
    ...patch
  };
}

describe('views/monitor/row (UI-nprg)', () => {
  test('renders the repo badge, id and title', () => {
    const el = mount(monitorRowTemplate(item(), NOW));

    expect(el.querySelector('.mon-row__repo')?.textContent?.trim()).toBe(
      'repo-a'
    );
    expect(el.querySelector('.mon-row__id')?.textContent?.trim()).toBe('UI-1');
    expect(el.querySelector('.mon-row__title')?.textContent?.trim()).toBe(
      '제목'
    );
  });

  test('carries the owning workspace on the row for the click path', () => {
    const el = mount(monitorRowTemplate(item(), NOW));

    expect(el.querySelector('.mon-row')?.getAttribute('data-root-dir')).toBe(
      '/tmp/example/repo-a'
    );
  });

  test('falls back to the bead id with no title', () => {
    const el = mount(monitorRowTemplate(item({ title: '' }), NOW));

    expect(el.querySelector('.mon-row__title')?.textContent?.trim()).toBe(
      'UI-1'
    );
  });

  test('marks the row with its lane', () => {
    const el = mount(monitorRowTemplate(item({ lane: 'done' }), NOW));

    expect(
      el.querySelector('.mon-row')?.classList.contains('mon-row--done')
    ).toBe(true);
  });

  test('renders the waiting position', () => {
    const el = mount(
      monitorRowTemplate(item({ lane: 'queue', queue_position: 3 }), NOW)
    );

    expect(el.querySelector('.mon-row__pos')?.textContent?.trim()).toBe('#3');
  });

  test('omits the heartbeat when no event time is known', () => {
    const el = mount(
      monitorRowTemplate(
        item({ lane: 'running', started_at: NOW - 1_000, last_event_at: null }),
        NOW
      )
    );

    expect(el.querySelector('.mon-row__beat')).toBe(null);
    expect(el.querySelector('.mon-row__elapsed')).not.toBe(null);
  });

  test('dims the heartbeat once the log has been quiet too long', () => {
    const el = mount(
      monitorRowTemplate(
        item({
          lane: 'running',
          started_at: NOW - 200_000,
          last_event_at: NOW - HEARTBEAT_FRESH_MS - 1
        }),
        NOW
      )
    );

    expect(
      el
        .querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(false);
  });

  test('renders an unknown completion kind verbatim with the warn tone', () => {
    const el = mount(
      monitorRowTemplate(
        item({ lane: 'done', done_at: NOW - 1_000, done_kind: 'weird_kind' }),
        NOW
      )
    );

    const kind = el.querySelector('.mon-row__kind');
    expect(kind?.textContent?.trim()).toBe('weird_kind');
    expect(kind?.classList.contains('mon-row__kind--warn')).toBe(true);
  });
});

describe('views/monitor/pipeline sections (UI-nprg)', () => {
  test('renders only the non-empty sections, in pipeline order', () => {
    const el = mount(
      monitorPipelineTemplate(
        [
          {
            lane: 'running',
            title: '실행중',
            items: [item({ lane: 'running' })]
          },
          { lane: 'pr_wait', title: 'PR 대기', items: [] },
          { lane: 'queue', title: '대기', items: [item({ id: 'UI-2' })] },
          { lane: 'done', title: '완료·오늘', items: [] }
        ],
        NOW
      )
    );

    expect(
      Array.from(el.querySelectorAll('.mon-group')).map((node) => node.id)
    ).toEqual(['monitor-running', 'monitor-queue']);
  });

  test('counts the rows of each section', () => {
    const el = mount(
      monitorPipelineTemplate(
        [
          {
            lane: 'queue',
            title: '대기',
            items: [item(), item({ id: 'UI-2' })]
          }
        ],
        NOW
      )
    );

    expect(el.querySelector('.mon-group__count')?.textContent?.trim()).toBe(
      '2'
    );
  });

  test('renders the empty state when every section is empty', () => {
    const el = mount(
      monitorPipelineTemplate(
        [{ lane: 'queue', title: '대기', items: [] }],
        NOW
      )
    );

    expect(el.querySelector('.mon-group')).toBe(null);
    expect(el.querySelector('.mon-group__empty')?.textContent).toContain(
      '진행 중인 워커 작업 없음'
    );
  });
});
