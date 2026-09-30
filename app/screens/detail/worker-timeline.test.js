import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  WORKER_TIMELINE_PAGE,
  workerTimelineTemplate
} from './worker-timeline.js';

/**
 * `n` events, newest first, the way the server sends them.
 *
 * @param {number} n
 * @returns {import('./worker-timeline.js').WorkerTimelineEvent[]}
 */
function events(n) {
  return Array.from({ length: n }, (_, i) => ({
    event_id: `e${n - i}`,
    at: 1_700_000_000_000 + (n - i) * 1000,
    kind: 'session_ended',
    summary: `이벤트 ${n - i}`
  }));
}

describe('이슈 상세 Worker 이력 섹션 (record-timeline-retention §9)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders nothing for a bead with no events', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(workerTimelineTemplate({ events: [] }), mount);

    expect(mount.querySelector('[data-seam="worker-timeline"]')).toBeNull();
    expect(mount.textContent?.trim()).toBe('');
  });

  test('renders one page of events newest first', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(workerTimelineTemplate({ events: events(25) }), mount);

    const rows = Array.from(
      mount.querySelectorAll('[data-seam="worker-timeline"] li')
    );
    expect(rows).toHaveLength(WORKER_TIMELINE_PAGE);
    expect(rows[0].textContent).toContain('이벤트 25');
  });

  test('reveals more events on 더 보기', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    let shown = WORKER_TIMELINE_PAGE;
    const draw = () =>
      render(
        workerTimelineTemplate(
          { events: events(25), shown },
          {
            onMore: () => {
              shown += WORKER_TIMELINE_PAGE;
              draw();
            }
          }
        ),
        mount
      );
    draw();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-seam="worker-timeline-more"]')
    ).click();

    expect(
      mount.querySelectorAll('[data-seam="worker-timeline"] li')
    ).toHaveLength(WORKER_TIMELINE_PAGE * 2);
  });

  test('drops the 더 보기 button once every event is visible', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(workerTimelineTemplate({ events: events(3) }), mount);

    expect(
      mount.querySelector('[data-seam="worker-timeline-more"]')
    ).toBeNull();
  });

  test('ignores an event carrying no summary', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      workerTimelineTemplate({
        events: /** @type {any} */ ([
          { event_id: 'e1', kind: 'dispatched', summary: '  ' }
        ])
      }),
      mount
    );

    expect(mount.querySelector('[data-seam="worker-timeline"]')).toBeNull();
  });
});
