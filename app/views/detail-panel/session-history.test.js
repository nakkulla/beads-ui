import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { sessionHistoryTemplate } from './session-history.js';

/**
 * @param {import('lit-html').TemplateResult} tpl
 * @returns {HTMLElement}
 */
function mount(tpl) {
  const host = document.createElement('div');

  render(tpl, host);

  return host;
}

describe('session-history token usage (UI-d7pw §2.2)', () => {
  test('renders a token badge on an attempt that reported usage', () => {
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: { input_tokens: 8420, output_tokens: 3910 }
      }
    ];

    const host = mount(sessionHistoryTemplate(attempts));

    expect(host.querySelector('.detail-session__usage')?.textContent).toBe(
      'τ 12.3k'
    );
  });

  test('renders no token badge on an attempt without usage', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done', usage: null }];

    const host = mount(sessionHistoryTemplate(attempts));

    expect(host.querySelector('.detail-session__usage')).toBe(null);
  });

  test('renders no detail toggle on an attempt without usage', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done', usage: null }];

    const host = mount(sessionHistoryTemplate(attempts));

    expect(host.querySelector('.detail-session__usage-toggle')).toBe(null);
  });

  test('renders the issue total beside the section heading', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done' }];

    const host = mount(
      sessionHistoryTemplate(
        attempts,
        {},
        {
          total: { input_tokens: 100000, output_tokens: 39400 }
        }
      )
    );

    expect(host.querySelector('.detail-usage-total')?.textContent).toBe(
      'τ 총 139.4k'
    );
  });

  test('counts the cache fields in the issue total (UI-tq13 §1)', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done' }];

    const host = mount(
      sessionHistoryTemplate(
        attempts,
        {},
        {
          total: {
            input_tokens: 267,
            output_tokens: 2407,
            cache_read_input_tokens: 13_655_022,
            cache_creation_input_tokens: 446_503
          }
        }
      )
    );

    expect(host.querySelector('.detail-usage-total')?.textContent).toBe(
      'τ 총 14.1M'
    );
  });

  test('appends the cost to the total when one was reported', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done' }];

    const host = mount(
      sessionHistoryTemplate(
        attempts,
        {},
        {
          total: {
            input_tokens: 1000,
            output_tokens: 500,
            total_cost_usd: 2.409
          }
        }
      )
    );

    expect(host.querySelector('.detail-usage-total')?.textContent).toContain(
      '$2.41'
    );
  });

  test('marks a replayed total as partial', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done' }];

    const host = mount(
      sessionHistoryTemplate(
        attempts,
        {},
        {
          total: { input_tokens: 10, output_tokens: 5, replayed: true }
        }
      )
    );

    expect(host.querySelector('.detail-usage-partial')?.textContent).toBe(
      '부분 집계'
    );
  });

  test('renders no total when nothing was reported', () => {
    const attempts = [{ attempt_id: 'a1', status: 'done' }];

    const host = mount(sessionHistoryTemplate(attempts, {}, { total: null }));

    expect(host.querySelector('.detail-usage-total')).toBe(null);
  });

  test('expands the breakdown for an attempt marked expanded', () => {
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: {
          input_tokens: 4102,
          output_tokens: 18940,
          cache_read_input_tokens: 812003,
          cache_creation_input_tokens: 44210
        }
      }
    ];

    const host = mount(
      sessionHistoryTemplate(attempts, {}, { expanded: new Set(['a1']) })
    );

    expect(
      host.querySelector('.detail-session__usage-detail')?.textContent
    ).toContain('812,003');
  });

  test('hides the breakdown for an attempt not marked expanded', () => {
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: { input_tokens: 1, output_tokens: 2 }
      }
    ];

    const host = mount(
      sessionHistoryTemplate(attempts, {}, { expanded: new Set() })
    );

    expect(host.querySelector('.detail-session__usage-detail')).toBe(null);
  });

  test('calls onToggleUsage when the detail button is clicked', () => {
    /** @type {string[]} */
    const seen = [];
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: { input_tokens: 1, output_tokens: 2 }
      }
    ];
    const host = mount(
      sessionHistoryTemplate(attempts, {
        onToggleUsage: (/** @type {string} */ id) => seen.push(id)
      })
    );

    /** @type {HTMLButtonElement|null} */ (
      host.querySelector('.detail-session__usage-toggle')
    )?.click();

    expect(seen).toEqual(['a1']);
  });

  test('does not open the transcript when the detail button is clicked', () => {
    /** @type {string[]} */
    const opened = [];
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: { input_tokens: 1, output_tokens: 2 }
      }
    ];
    const host = mount(
      sessionHistoryTemplate(attempts, {
        onOpen: (/** @type {string} */ id) => opened.push(id)
      })
    );

    /** @type {HTMLButtonElement|null} */ (
      host.querySelector('.detail-session__usage-toggle')
    )?.click();

    expect(opened).toEqual([]);
  });

  test('notes the partial tally inside an expanded replayed breakdown', () => {
    const attempts = [
      {
        attempt_id: 'a1',
        status: 'done',
        usage: { input_tokens: 1, output_tokens: 2, replayed: true }
      }
    ];

    const host = mount(
      sessionHistoryTemplate(attempts, {}, { expanded: new Set(['a1']) })
    );

    expect(
      host.querySelector('.detail-session__usage-note')?.textContent
    ).toContain('부분 집계');
  });
});

describe('session-history preset audit', () => {
  test('renders outer preset provenance without claiming a child execution model', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'a1',
          status: 'done',
          exec_default_preset_id: 'preset-dev',
          exec_default_preset_revision: 4,
          exec_values: { impl_model: 'terra', impl_runtime: 'codex' }
        }
      ])
    );

    const audit = host.querySelector('[data-attempt-preset-audit]');
    expect(audit?.textContent).toContain('외부 실행 preset');
    expect(audit?.textContent).toContain('preset-dev r4');
    expect(audit?.textContent).toContain(
      '내부 workflow 실행 영수증과 별도 기록'
    );
  });
});
