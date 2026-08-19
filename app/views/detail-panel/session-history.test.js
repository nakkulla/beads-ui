import { render } from 'lit-html';
import { readFileSync } from 'node:fs';
import process from 'node:process';
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
  test('groups receipt legs by role beneath the outer orchestrator attempt', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          bead_id: 'UI-1',
          status: 'done',
          runner: 'claude',
          model: 'opus',
          session_id: 'outer-session',
          usage: { input_tokens: 10, output_tokens: 2 },
          usage_legs: [
            {
              receipt_id: 'impl-1',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-terra',
              session_id: 'implementation-thread',
              completed_at: '2026-08-11T00:00:00Z',
              usage: {
                input_tokens: 5,
                output_tokens: 3,
                cache_read_input_tokens: 100,
                reasoning_output_tokens: 2
              }
            },
            {
              receipt_id: 'review-1',
              provider: 'codex',
              role: 'review-consult',
              model: 'gpt-5.6-luna',
              session_id: 'review-thread',
              completed_at: '2026-08-11T00:01:00Z',
              usage: { input_tokens: 4, output_tokens: 1 }
            }
          ]
        }
      ])
    );

    expect(host.querySelector('.detail-session__role')?.textContent).toContain(
      'orchestrator'
    );
    const legs = host.querySelectorAll('.detail-session__leg');
    expect(legs).toHaveLength(2);
    expect(legs[0].classList).toContain('detail-session__usage-detail');
    expect(
      legs[0].querySelector('.detail-session__leg-role')?.classList
    ).toContain('detail-session__usage-label');
    expect(
      legs[0].querySelector('.detail-session__leg-meta')?.classList
    ).toContain('detail-session__usage-value');
    expect(host.textContent).toContain('implementation');
    expect(host.textContent).toContain('review-consult');
    expect(host.textContent).toContain('Codex τ 8');
    expect(host.textContent).not.toContain('미실행');
  });

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
      'Claude τ 12.3k'
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

  test('labels direct Codex cache and reasoning as subset breakdown fields', () => {
    const attempts = [
      {
        attempt_id: 'codex-1',
        status: 'done',
        runner: 'codex',
        usage: {
          input_tokens: 10,
          output_tokens: 5,
          cache_read_input_tokens: 100,
          cache_creation_input_tokens: 9,
          reasoning_output_tokens: 8
        }
      }
    ];

    const host = mount(
      sessionHistoryTemplate(
        attempts,
        {},
        {
          expanded: new Set(['codex-1'])
        }
      )
    );
    const detail = host.querySelector('.detail-session__usage-detail');

    expect(detail?.textContent).toContain('캐시 쓰기');
    expect(detail?.textContent).toContain('추론 출력');
    expect(detail?.textContent).not.toContain('캐시 생성');
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
  test('renders the attempt tuple and session-continuation lineage', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'a1',
          status: 'done',
          runner: 'codex',
          model: 'sol',
          effort: 'xhigh',
          speed: 'fast',
          resumed_from: 'a0',
          continuation_mode: 'session'
        }
      ])
    );

    expect(host.querySelector('.detail-session__meta')?.textContent).toBe(
      'codex · sol · xhigh · Fast'
    );
    expect(
      host.querySelector('.detail-session__resumed')?.getAttribute('title')
    ).toBe('session 이어받음 (from a0)');
  });

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

describe('session-history delegation monitors', () => {
  /**
   * @param {'running'|'done'|'failed'|'interrupted'} status
   * @param {string} [launch_id]
   */
  function monitor(status, launch_id = `launch-${status}`) {
    return {
      launch_id,
      provider: 'codex',
      role: 'implementation',
      model: 'gpt-5.6-sol',
      session_id: `session-${status}`,
      turn_id: 'turn-1',
      status,
      started_at: 100,
      completed_at: status === 'running' ? null : '2026-08-18T04:27:00.000Z',
      last_event_at: 200
    };
  }

  test('renders four delegation status glyphs', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [
            monitor('running'),
            monitor('done'),
            monitor('failed'),
            monitor('interrupted')
          ]
        }
      ])
    );

    expect(
      Array.from(host.querySelectorAll('.detail-session__leg-glyph')).map(
        (node) => node.textContent
      )
    ).toEqual(['●', '✓', '✗', '⚠']);
  });

  test('renders delegation row metadata and running activity time', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [monitor('running')]
        }
      ])
    );
    const row = host.querySelector('.detail-session__leg');

    expect(row?.tagName).toBe('BUTTON');
    expect(row?.textContent).toContain('implementation');
    expect(row?.textContent).toContain('codex · gpt-5.6-sol');
    expect(row?.textContent).toContain('session-');
    expect(
      row?.querySelector('.detail-session__leg-sid')?.getAttribute('title')
    ).toBe('session-running');
    expect(
      row?.querySelector('.detail-session__leg-time')?.textContent
    ).not.toBe('');
  });

  test('passes exact attempt and launch ids on delegation row click', () => {
    /** @type {Array<[string, string]>} */
    const opened = [];
    const host = mount(
      sessionHistoryTemplate(
        [
          {
            attempt_id: 'outer',
            delegation_sessions: [monitor('running', 'launch-exact')]
          }
        ],
        {
          onOpenDelegation: (attempt_id, launch_id) =>
            opened.push([attempt_id, launch_id])
        }
      )
    );

    /** @type {HTMLButtonElement|null} */ (
      host.querySelector('.detail-session__leg')
    )?.click();

    expect(opened).toEqual([['outer', 'launch-exact']]);
  });

  test('keeps a legacy usage-only row static', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          usage_legs: [
            {
              receipt_id: 'legacy-1',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-terra',
              session_id: 'legacy-session',
              completed_at: '2026-08-18T04:27:00.000Z',
              usage: { input_tokens: 5, output_tokens: 3 }
            }
          ]
        }
      ])
    );
    const row = host.querySelector('.detail-session__leg');

    expect(row?.tagName).toBe('DIV');
    expect(row?.textContent).toContain('Codex τ 8');
    expect(row?.querySelector('.detail-session__leg-glyph')).toBeNull();
  });

  test('joins matching terminal usage into one monitored row', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [monitor('done', 'launch-joined')],
          usage_legs: [
            {
              receipt_id: 'launch-joined',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-sol',
              session_id: 'session-done',
              completed_at: '2026-08-18T04:27:00.000Z',
              usage: { input_tokens: 5, output_tokens: 3 }
            }
          ]
        }
      ])
    );
    const row = host.querySelector('.detail-session__leg');

    expect(host.querySelectorAll('.detail-session__leg')).toHaveLength(1);
    expect(row?.tagName).toBe('BUTTON');
    expect(row?.textContent).toContain('Codex τ 8');
    expect(
      row?.querySelector('.detail-session__leg-time')?.textContent
    ).not.toBe('');
  });

  test('renders only implementation and review-consult monitors', () => {
    const review = {
      ...monitor('done', 'launch-review'),
      role: 'review-consult'
    };
    const child = {
      ...monitor('done', 'launch-child'),
      role: 'Explore'
    };
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [monitor('done'), review, child]
        }
      ])
    );

    expect(host.querySelectorAll('button.detail-session__leg')).toHaveLength(2);
    expect(host.textContent).toContain('implementation');
    expect(host.textContent).toContain('review-consult');
    expect(host.textContent).not.toContain('Explore');
    expect(host.textContent).not.toContain('child');
  });

  test('keeps static usage row when monitor identity conflicts', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [monitor('done', 'launch-conflict')],
          usage_legs: [
            {
              receipt_id: 'launch-conflict',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-terra',
              session_id: 'session-done',
              completed_at: '2026-08-18T04:27:00.000Z',
              usage: { input_tokens: 5, output_tokens: 3 }
            }
          ]
        }
      ])
    );
    const row = host.querySelector('.detail-session__leg');

    expect(host.querySelectorAll('.detail-session__leg')).toHaveLength(1);
    expect(row?.tagName).toBe('DIV');
    expect(row?.textContent).toContain('gpt-5.6-terra');
  });

  test('keeps delegation rows responsive at narrow viewport', () => {
    const css = readFileSync(`${process.cwd()}/app/styles.css`, 'utf8');

    const responsive =
      /@media \(max-width: 640px\)[\s\S]*?\.detail-session__leg\s*\{[\s\S]*?flex-wrap:\s*wrap/;

    expect(css).toMatch(responsive);
  });
});
