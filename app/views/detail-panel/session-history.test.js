import { render } from 'lit-html';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { describe, expect, test } from 'vitest';
import { sumAttemptUsage } from '../../utils/token-usage.js';
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
    expect(row?.textContent).toContain('launch-running');
    expect(
      row?.querySelector('.detail-session__leg-sid')?.getAttribute('title')
    ).toBe('launch-running · thread session-running');
    expect(
      row?.querySelector('.detail-session__leg-time')?.textContent
    ).not.toBe('');
  });

  test('marks only later Codex rows that continue the same thread', () => {
    const first = {
      ...monitor('done', 'unit1-codex-02'),
      session_id: 'shared-thread',
      started_at: 100
    };
    const second = {
      ...monitor('done', 'unit1-r1'),
      session_id: 'shared-thread',
      started_at: 200
    };
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [first, second]
        }
      ])
    );

    const ids = Array.from(host.querySelectorAll('.detail-session__leg-sid'));

    expect(ids.map((node) => node.textContent)).toEqual([
      'unit1-codex-02',
      '↩ unit1-r1'
    ]);
    expect(ids.map((node) => node.getAttribute('title'))).toEqual([
      'unit1-codex-02 · thread shared-thread',
      'unit1-r1 · thread shared-thread · 이전 라운드 스레드 이어감'
    ]);
  });

  test('renders monitored and static effort while omitting absent effort', () => {
    const monitored = { ...monitor('running'), effort: 'high' };
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [monitored, monitor('done', 'without-effort')],
          usage_legs: [
            {
              receipt_id: 'static-effort',
              provider: 'codex',
              role: 'review-consult',
              model: 'gpt-5.6-luna',
              effort: 'low',
              session_id: 'static-session',
              completed_at: '2026-08-18T04:27:00.000Z',
              usage: { input_tokens: 1 }
            }
          ]
        }
      ])
    );
    const metas = Array.from(
      host.querySelectorAll('.detail-session__leg-meta')
    ).map((node) => node.textContent?.trim());

    expect(metas).toContain('codex · gpt-5.6-sol · high');
    expect(metas).toContain('codex · gpt-5.6-luna · low');
    expect(metas).toContain('codex · gpt-5.6-sol');
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
    expect(row?.querySelector('.detail-session__leg-sid')?.textContent).toBe(
      'legacy-1'
    );
    expect(
      row?.querySelector('.detail-session__leg-sid')?.getAttribute('title')
    ).toBe('legacy-1 · thread legacy-session');
    expect(row?.querySelector('.detail-session__leg-glyph')).toBeNull();
  });

  test('renders a static Codex launch id without a thread id', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          usage_legs: [
            {
              receipt_id: 'receipt-without-thread',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-terra',
              completed_at: '2026-08-18T04:27:00.000Z',
              usage: { input_tokens: 5 }
            }
          ]
        }
      ])
    );

    const id = host.querySelector('.detail-session__leg-sid');

    expect(id?.textContent).toBe('receipt-without-thread');
    expect(id?.getAttribute('title')).toBe('receipt-without-thread');
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

describe('session-history claude subagent rows (UI-2mpn §6.1)', () => {
  const LAUNCH = 'toolu_01AgentAAAAAAAAAAAAAAAA';

  /**
   * @param {'running'|'done'|'failed'|'interrupted'} status
   * @param {Partial<Record<string, any>>} [over]
   */
  function subagent(status, over = {}) {
    return {
      launch_id: LAUNCH,
      provider: 'claude',
      role: 'subagent',
      agent_type: 'general-purpose',
      model: status === 'running' ? null : 'claude-sonnet-4-5-20250929',
      effort: null,
      session_id: LAUNCH,
      turn_id: LAUNCH,
      status,
      started_at: 100,
      completed_at: status === 'running' ? null : 3000,
      last_event_at: 200,
      ...over
    };
  }

  /**
   * @param {Partial<Record<string, any>>} [over]
   */
  function receipt(over = {}) {
    return {
      receipt_id: LAUNCH,
      provider: 'claude',
      role: 'subagent',
      agent_type: 'general-purpose',
      agent_id: 'agt_9f3c21d4c0',
      model: 'claude-sonnet-4-5-20250929',
      session_id: LAUNCH,
      turn_id: LAUNCH,
      effort: null,
      usage: {
        input_tokens: 30,
        output_tokens: 200,
        cache_read_input_tokens: 1000,
        cache_creation_input_tokens: 100,
        reasoning_output_tokens: 0
      },
      completed_at: 3000,
      ...over
    };
  }

  test('labels a finished subagent row with provider, type and model', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt()]
        }
      ])
    );

    expect(
      host.querySelector('.detail-session__leg-meta')?.textContent?.trim()
    ).toBe('Claude · general-purpose · claude-sonnet-4-5');
  });

  test('appends the observed effort to a finished subagent label', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done', { effort: 'low' })],
          usage_legs: [receipt({ effort: 'low' })]
        }
      ])
    );

    expect(
      host.querySelector('.detail-session__leg-meta')?.textContent?.trim()
    ).toBe('Claude · general-purpose · claude-sonnet-4-5 · low');
  });

  test('omits the agent type from the label when the call named none', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('running', { agent_type: null })]
        }
      ])
    );

    expect(
      host.querySelector('.detail-session__leg-meta')?.textContent?.trim()
    ).toBe('Claude');
  });

  test('shows the agent id once a receipt reported one', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt()]
        }
      ])
    );

    const sid = host.querySelector('.detail-session__leg-sid');
    expect(sid?.textContent).toBe('agt_9f3c');
    expect(sid?.getAttribute('title')).toBe('agt_9f3c21d4c0');
  });

  test('falls back to the launch id tail while the subagent runs', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('running')]
        }
      ])
    );

    expect(host.querySelector('.detail-session__leg-sid')?.textContent).toBe(
      'AAAAAAAA'
    );
  });

  test('shows the Claude token subtotal on a row with a receipt', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt()]
        }
      ])
    );

    expect(host.querySelector('.detail-session__usage')?.textContent).toContain(
      'Claude τ 1.3k'
    );
  });

  test('leaves the token cell empty on a row with no receipt', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('running')]
        }
      ])
    );

    expect(host.querySelector('.detail-session__usage')).toBe(null);
  });

  test('leaves the time cell empty when no stream line carried a timestamp', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [
            subagent('done', { completed_at: null, last_event_at: null })
          ],
          usage_legs: [receipt({ completed_at: null })]
        }
      ])
    );

    expect(host.querySelector('.detail-session__leg-time')).toBe(null);
  });

  test('passes the launch id on a subagent row click', () => {
    /** @type {Array<[string, string]>} */
    const opened = [];
    const host = mount(
      sessionHistoryTemplate(
        [
          {
            attempt_id: 'outer',
            delegation_sessions: [subagent('running')]
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

    expect(opened).toEqual([['outer', LAUNCH]]);
  });

  test('keeps the orchestrator badge separate from the subagent one', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          runner: 'claude',
          usage: {
            input_tokens: 1,
            output_tokens: 2,
            cache_read_input_tokens: 3,
            cache_creation_input_tokens: 4
          },
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt()]
        }
      ])
    );

    const badges = Array.from(
      host.querySelectorAll('.detail-session__usage')
    ).map((node) => node.textContent);
    expect(badges).toEqual(['Claude τ 10', 'Claude τ 1.3k']);
  });

  test('adds the subagent receipt to the issue Claude heading total', () => {
    const host = mount(
      sessionHistoryTemplate(
        [{ attempt_id: 'outer' }],
        {},
        {
          total: sumAttemptUsage(
            {
              outer: {
                attempt_id: 'outer',
                bead_id: 'UI-1',
                runner: 'claude',
                usage: {
                  input_tokens: 1,
                  output_tokens: 2,
                  cache_read_input_tokens: 3,
                  cache_creation_input_tokens: 4
                },
                usage_legs: [receipt()]
              }
            },
            'UI-1'
          )
        }
      )
    );

    expect(host.querySelector('.detail-usage-total')?.textContent).toBe(
      'Claude τ 1.3k'
    );
  });

  test('hides tool-typed subagent rows while keeping implementation ones', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [
            subagent('done'),
            subagent('done', {
              launch_id: 'toolu_01ExploreBBBBBBBBBBBBBB',
              session_id: 'toolu_01ExploreBBBBBBBBBBBBBB',
              turn_id: 'toolu_01ExploreBBBBBBBBBBBBBB',
              agent_type: 'Explore'
            }),
            subagent('running', {
              launch_id: 'toolu_01RunnerCCCCCCCCCCCCCCC',
              session_id: 'toolu_01RunnerCCCCCCCCCCCCCCC',
              turn_id: 'toolu_01RunnerCCCCCCCCCCCCCCC',
              agent_type: 'codex-runner'
            })
          ]
        }
      ])
    );

    const metas = Array.from(
      host.querySelectorAll('.detail-session__leg-meta')
    ).map((node) => node.textContent?.trim());
    expect(metas).toEqual(['Claude · general-purpose · claude-sonnet-4-5']);
  });

  test('keeps an unknown-typed subagent row visible', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('running', { agent_type: null })]
        }
      ])
    );

    expect(host.querySelectorAll('.detail-session__leg').length).toBe(1);
  });

  // UI-1663 §6.2: this view is NOT changed by that spec. The row below is the
  // proof that the parser and store fixes alone reach the screen — a completed
  // background leg carries a total-only receipt and must render exactly like a
  // four-field one.
  test('renders a background subagent row from a total-only receipt', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt({ usage: { total_tokens: 219570 } })]
        }
      ])
    );

    expect(host.querySelector('.detail-session__leg-glyph')?.textContent).toBe(
      '✓'
    );
    expect(host.querySelector('.detail-session__leg-sid')?.textContent).toBe(
      'agt_9f3c'
    );
    expect(
      host.querySelector('.detail-session__leg-time')?.textContent?.trim()
        ?.length
    ).toBeGreaterThan(0);
    expect(host.querySelector('.detail-session__usage')?.textContent).toContain(
      'Claude τ 219.6k'
    );
  });

  test('discloses the missing breakdown on the total-only row badge', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          delegation_sessions: [subagent('done')],
          usage_legs: [receipt({ usage: { total_tokens: 219570 } })]
        }
      ])
    );

    expect(
      host.querySelector('.detail-session__usage')?.getAttribute('title')
    ).toBe('총 219,570\n분해 없음 — 총량만 보고됨');
  });

  test('hides the usage-only receipt of a tool-typed subagent', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'outer',
          usage_legs: [
            receipt({ agent_type: 'Explore' }),
            receipt({
              receipt_id: 'toolu_01KeepDDDDDDDDDDDDDDDDD',
              session_id: 'toolu_01KeepDDDDDDDDDDDDDDDDD',
              turn_id: 'toolu_01KeepDDDDDDDDDDDDDDDDD'
            })
          ]
        }
      ])
    );

    const metas = Array.from(
      host.querySelectorAll('.detail-session__leg-meta')
    ).map((node) => node.textContent?.trim());
    expect(metas.length).toBe(1);
    expect(metas[0]).not.toContain('Explore');
  });
});

describe('session-history 세션 행 (UI-4xzk §6.5)', () => {
  /**
   * Lit's per-process marker comments carry a random id, so only the rendered
   * markup is comparable across runs.
   *
   * @param {HTMLElement} host
   * @returns {string}
   */
  function markup(host) {
    return host.innerHTML.replace(/<!--[\s\S]*?-->/g, '');
  }

  /** @type {import('./session-history.js').SessionAttempt[]} */
  const ATTEMPTS = [
    {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      status: 'done',
      runner: 'claude',
      model: 'opus',
      session_id: 'abcdefgh1234',
      started_at: 1_700_000_000_000
    }
  ];

  /**
   * @param {Partial<import('../../../server/worker/session-ref.js').SessionRefView>} [patch]
   * @returns {import('../../../server/worker/session-ref.js').SessionRefView}
   */
  function view(patch = {}) {
    return {
      index: 0,
      provider: 'claude',
      session_id: 'a1b2c3d4-5e6f',
      host: 'mac-studio',
      current: true,
      locality: 'local',
      last_event_at: 1_700_000_000_000,
      resume_command: "claude --resume 'a1b2c3d4-5e6f'",
      ...patch
    };
  }

  test('leads with the current session, then the past ones newest first', () => {
    const host = mount(
      sessionHistoryTemplate(ATTEMPTS, {}, {}, [
        view({ index: 0, current: false, session_id: 'oldest-0' }),
        view({ index: 1, current: false, session_id: 'middle-0' }),
        view({ index: 2, session_id: 'current-0' })
      ])
    );

    expect(
      Array.from(
        host.querySelectorAll('.detail-session-row button:first-child')
      ).map(
        (el) =>
          el.getAttribute('data-session-key') ||
          el.getAttribute('data-attempt-id')
      )
    ).toEqual([
      'session:claude:current-0',
      'session:claude:middle-0',
      'session:claude:oldest-0',
      'att-1'
    ]);
  });

  test('marks the current session with a half-filled glyph and past ones with a dot', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [
        view({ index: 0, current: false, session_id: 'oldest-0' }),
        view({ index: 1 })
      ])
    );

    expect(
      Array.from(host.querySelectorAll('.detail-session__glyph')).map(
        (el) => el.textContent
      )
    ).toEqual(['◐', '·']);
  });

  test('shows the label, the host and the transcript time of a local session', () => {
    const host = mount(sessionHistoryTemplate([], {}, {}, [view()]));

    expect(host.querySelector('.detail-session__id')?.textContent).toBe(
      'claude · a1b2c3d4'
    );
    expect(host.querySelector('.detail-session__meta')?.textContent).toBe(
      'mac-studio'
    );
    expect(
      host.querySelector('.detail-session__sid')?.getAttribute('title')
    ).toBe('a1b2c3d4-5e6f');
    expect(host.querySelector('.detail-session__time')?.textContent).not.toBe(
      ''
    );
  });

  test('leaves the time cell empty when no transcript mtime is known', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [
        view({ locality: 'missing', last_event_at: null })
      ])
    );

    expect(host.querySelector('.detail-session__time')?.textContent).toBe('');
  });

  test('says so and disables the row for a session of another machine', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [view({ locality: 'remote' })])
    );
    const row = /** @type {HTMLButtonElement} */ (
      host.querySelector('.detail-session')
    );

    expect(host.querySelector('.detail-session__meta')?.textContent).toBe(
      'mac-studio · 다른 머신'
    );
    expect(row.disabled).toBe(true);
    expect(row.getAttribute('title')).toBe(
      '다른 머신 세션 — 이 서버에 transcript 없음'
    );
  });

  test('says so and disables the row when the transcript file is gone', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [view({ locality: 'missing' })])
    );
    const row = /** @type {HTMLButtonElement} */ (
      host.querySelector('.detail-session')
    );

    expect(host.querySelector('.detail-session__meta')?.textContent).toBe(
      'mac-studio · 파일 없음'
    );
    expect(row.disabled).toBe(true);
    expect(row.getAttribute('title')).toBe('transcript 파일 없음');
  });

  test('opens the transcript of a local session on a row click', () => {
    /** @type {any[]} */
    const opened = [];
    const host = mount(
      sessionHistoryTemplate(
        [],
        { onOpenSessionRef: (v) => opened.push(v) },
        {},
        [view()]
      )
    );

    /** @type {HTMLElement} */ (host.querySelector('.detail-session')).click();

    expect(opened).toHaveLength(1);
    expect(opened[0].session_id).toBe('a1b2c3d4-5e6f');
  });

  test('copies the provider resume command from the ⧉ 재개 sibling', () => {
    /** @type {string[]} */
    const copied = [];
    const host = mount(
      sessionHistoryTemplate(
        [],
        { onCopyResumeCommand: (command) => copied.push(command) },
        {},
        [view({ provider: 'codex', resume_command: "codex resume 'sid-7'" })]
      )
    );
    const button = /** @type {HTMLElement} */ (
      host.querySelector('.detail-session__resume-cmd')
    );

    button.click();

    expect(button.getAttribute('title')).toBe("codex resume 'sid-7'");
    expect(copied).toEqual(["codex resume 'sid-7'"]);
  });

  test('omits the ⧉ 재개 button for an id no safe command could be built from', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [view({ resume_command: null })])
    );

    expect(host.querySelector('.detail-session__resume-cmd')).toBeNull();
  });

  test('renders the section for sessions alone when no attempt exists', () => {
    const host = mount(sessionHistoryTemplate([], {}, {}, [view()]));

    expect(
      host.querySelector('[data-seam="session-history"]')?.textContent
    ).not.toContain('세션 이력 없음');
    expect(host.querySelectorAll('.detail-session-row')).toHaveLength(1);
  });

  test('keeps the empty state when neither attempts nor sessions exist', () => {
    const host = mount(sessionHistoryTemplate([], {}, {}, []));

    expect(host.querySelector('.detail-empty')?.textContent).toBe(
      '세션 이력 없음'
    );
  });

  test('renders an attempt-only history exactly as it did without session rows', () => {
    const host = mount(sessionHistoryTemplate(ATTEMPTS, {}, {}, []));

    expect(markup(host)).toMatchInlineSnapshot(`
      "
          <div class="detail-section-label">
            세션 이력
          </div>
          <div class="detail-sessions" data-seam="session-history">
            <div class="detail-session-row">
                <button type="button" class="detail-session detail-session--done" data-attempt-id="att-1">
                  <span class="detail-session__glyph">✓</span>
                  <span class="detail-session__id">att-1</span>
                  
                  <span class="detail-session__meta">claude · opus</span>
                  
                  <span class="detail-session__sid" title="abcdefgh1234">abcdefgh</span>
                  
                  <span class="detail-session__time">07:13</span>
                </button>
                   
                
                
              </div>
          </div>
        "
    `);
  });
});

describe('세션 이력 행 조작 형태 (UI-6g3t §3.2)', () => {
  test('gives the ↻ 이어하기 button the op token', () => {
    const host = mount(
      sessionHistoryTemplate([
        {
          attempt_id: 'a-1',
          bead_id: 'UI-1',
          status: 'failed',
          runner: 'claude',
          model: 'opus',
          session_id: 'sid-1'
        }
      ])
    );

    const resume = /** @type {HTMLElement} */ (
      host.querySelector('.detail-session__resume')
    );

    expect(resume.classList.contains('op-btn')).toBe(true);
  });

  test('gives the 재개 명령 복사 button the same op token', () => {
    const host = mount(
      sessionHistoryTemplate([], {}, {}, [
        {
          index: 0,
          provider: 'claude',
          session_id: 'a1b2c3d4-5e6f',
          host: 'mac-studio',
          current: true,
          locality: 'local',
          last_event_at: 1_700_000_000_000,
          resume_command: "claude --resume 'a1b2c3d4-5e6f'"
        }
      ])
    );

    const copy = /** @type {HTMLElement} */ (
      host.querySelector('.detail-session__resume-cmd')
    );

    expect(copy.classList.contains('op-btn')).toBe(true);
  });
});
