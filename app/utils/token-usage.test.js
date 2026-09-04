import { describe, expect, test } from 'vitest';
import { resolveCatalog } from '../../server/worker/runner-catalog.js';
import {
  formatCost,
  formatUsageTotal,
  formatUsageTotalWithCost,
  mergeUsageProjections,
  providerUsageBadges,
  providerUsageTooltip,
  sumAttemptUsage,
  usageTooltip
} from './token-usage.js';

describe('views/worker usage formatting (UI-raqh §1)', () => {
  test('sums input and output into a k-abbreviated total', () => {
    const label = formatUsageTotal({ input_tokens: 8420, output_tokens: 3910 });

    expect(label).toBe('τ 12.3k');
  });

  test('leaves a sub-thousand total unabbreviated', () => {
    const label = formatUsageTotal({ input_tokens: 600, output_tokens: 340 });

    expect(label).toBe('τ 940');
  });

  test('abbreviates a million-scale total with M', () => {
    const label = formatUsageTotal({
      input_tokens: 1_200_000,
      output_tokens: 30_000
    });

    expect(label).toBe('τ 1.2M');
  });

  test('includes the cache fields in the headline total (UI-tq13 §1)', () => {
    const label = formatUsageTotal({
      input_tokens: 10,
      output_tokens: 5,
      cache_read_input_tokens: 999_999,
      cache_creation_input_tokens: 999_999
    });

    expect(label).toBe('τ 2.0M');
  });

  test('returns null for a missing usage record', () => {
    expect(formatUsageTotal(null)).toBe(null);
  });

  test('returns null when no token field is present', () => {
    expect(formatUsageTotal({ total_cost_usd: 0.4 })).toBe(null);
  });

  test('draws a badge for a record carrying only cache counts (UI-tq13 §2)', () => {
    const label = formatUsageTotal({
      cache_read_input_tokens: 4000,
      cache_creation_input_tokens: 1000
    });

    expect(label).toBe('τ 5.0k');
  });

  test('appends the cost to the lane badge when one was reported', () => {
    const label = formatUsageTotalWithCost({
      input_tokens: 8420,
      output_tokens: 3910,
      total_cost_usd: 12.339
    });

    expect(label).toBe('τ 12.3k · $12.34');
  });

  test('leaves the lane badge cost-free when none was reported', () => {
    const label = formatUsageTotalWithCost({
      input_tokens: 8420,
      output_tokens: 3910
    });

    expect(label).toBe('τ 12.3k');
  });

  test('returns null from the lane badge when no token field is present', () => {
    expect(formatUsageTotalWithCost({ total_cost_usd: 0.4 })).toBe(null);
  });

  test('spells out every field in the tooltip', () => {
    const title = usageTooltip({
      input_tokens: 8420,
      output_tokens: 3910,
      cache_read_input_tokens: 214300,
      cache_creation_input_tokens: 12800,
      total_cost_usd: 0.42
    });

    expect(title).toBe(
      '총 239,430\n입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800 · $0.42'
    );
  });

  test('omits the cost from the tooltip when none was reported', () => {
    const title = usageTooltip({ input_tokens: 10, output_tokens: 5 });

    expect(title).toBe('총 15\n입력 10 · 출력 5 · 캐시읽기 0 · 캐시생성 0');
  });

  test('labels a restart-recovered tally as partial (UI-ediw)', () => {
    const title = usageTooltip({
      input_tokens: 10,
      output_tokens: 5,
      replayed: true
    });

    expect(title).toBe(
      '총 15\n입력 10 · 출력 5 · 캐시읽기 0 · 캐시생성 0\n서버 재시작 복구 — 부분 집계'
    );
  });

  test('leaves the badge total unchanged for a replayed tally', () => {
    const label = formatUsageTotal({
      input_tokens: 8420,
      output_tokens: 3910,
      replayed: true
    });

    expect(label).toBe('τ 12.3k');
  });
});

describe('summed attempt usage (UI-d7pw §1)', () => {
  test('sums every attempt recorded for a bead', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, output_tokens: 10 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, output_tokens: 20 }
      }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.breakdown
    ).toMatchObject({
      input_tokens: 3,
      output_tokens: 30
    });
  });

  test('skips an attempt with no usage but keeps the others', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.breakdown
    ).toMatchObject({
      input_tokens: 1
    });
  });

  test('ignores attempts of other beads', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-2', usage: { input_tokens: 9 } }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('returns null for an empty attempts map', () => {
    expect(sumAttemptUsage({}, 'UI-1')).toBe(null);
  });

  test('returns null when every attempt reported no token field', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { total_cost_usd: 0.4 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('sums the cost when every summed attempt reported one', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.25 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, total_cost_usd: 0.75 }
      }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.total_cost_usd
    ).toBe(1);
  });

  test('sums the priced attempts and counts the unpriced one (preset-compare §1.3)', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.25 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, total_cost_usd: 0.75 }
      },
      a3: { attempt_id: 'a3', bead_id: 'UI-1', usage: { input_tokens: 4 } }
    };

    const total = sumAttemptUsage(attempts, 'UI-1');

    expect(total?.providers.claude?.total_cost_usd).toBe(1);
    expect(total?.providers.claude?.unpriced_leg_count).toBe(1);
    expect(total?.providers.claude?.breakdown.input_tokens).toBe(7);
  });

  test('counts a usage-less attempt as neither summed nor cost-missing', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.5 }
      },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.total_cost_usd
    ).toBe(0.5);
  });

  test('omits the cost when no attempt reported one', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude
    ).not.toHaveProperty('total_cost_usd');
  });

  test('propagates replayed when any summed attempt carried it', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, replayed: true }
      }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.replayed).toBe(
      true
    );
  });

  test('sums the cache fields alongside the headline fields', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, cache_read_input_tokens: 100 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, cache_read_input_tokens: 200 }
      }
    };

    expect(
      sumAttemptUsage(attempts, 'UI-1')?.providers.claude?.breakdown
        .cache_read_input_tokens
    ).toBe(300);
  });
});

describe('provider and role usage projection (UI-orfj Phase 1)', () => {
  test('separates Claude and Codex subtotals without a provider grand total', () => {
    const attempts = {
      claude: {
        attempt_id: 'claude',
        bead_id: 'UI-1',
        runner: 'claude',
        usage: {
          input_tokens: 1,
          output_tokens: 2,
          cache_read_input_tokens: 3,
          cache_creation_input_tokens: 4,
          total_cost_usd: 0.5
        }
      },
      codex: {
        attempt_id: 'codex',
        bead_id: 'UI-1',
        runner: 'codex',
        usage: {
          input_tokens: 10,
          output_tokens: 5,
          cache_read_input_tokens: 100,
          cache_creation_input_tokens: 9,
          reasoning_output_tokens: 8
        }
      }
    };

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.providers).toMatchObject({
      claude: {
        subtotal: 10,
        breakdown: {
          input_tokens: 1,
          output_tokens: 2,
          cache_read_input_tokens: 3,
          cache_creation_input_tokens: 4
        },
        total_cost_usd: 0.5
      },
      codex: {
        subtotal: 15,
        breakdown: {
          input_tokens: 10,
          output_tokens: 5,
          cache_read_input_tokens: 100,
          cache_creation_input_tokens: 9,
          reasoning_output_tokens: 8
        }
      }
    });
    expect(projected).not.toHaveProperty('total');
  });

  test('projects outer usage and deduplicated nested receipts into role legs', () => {
    const attempts = {
      outer: {
        attempt_id: 'outer',
        bead_id: 'UI-1',
        runner: 'claude',
        model: 'gpt-5.6-sol',
        session_id: 'outer-session',
        usage: { input_tokens: 3 },
        usage_legs: [
          {
            receipt_id: 'r-implementation',
            provider: 'codex',
            role: 'implementation',
            model: 'gpt-5.6-terra',
            effort: 'high',
            session_id: 'thread-implementation',
            turn_id: 'turn-implementation',
            completed_at: '2026-08-11T00:00:00.000Z',
            usage: { input_tokens: 10, output_tokens: 2 }
          },
          {
            receipt_id: 'r-review',
            provider: 'codex',
            role: 'review-consult',
            model: 'gpt-5.6-luna',
            thread_id: 'thread-review',
            turn_id: 'turn-review',
            completed_at: '2026-08-11T00:01:00.000Z',
            usage: { input_tokens: 20, output_tokens: 2 }
          }
        ]
      },
      duplicate: {
        attempt_id: 'duplicate',
        bead_id: 'UI-1',
        usage_legs: [
          {
            receipt_id: 'r-implementation',
            provider: 'codex',
            role: 'implementation',
            usage: { input_tokens: 10, output_tokens: 2 }
          }
        ]
      }
    };

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.roles.orchestrator?.claude?.legs).toEqual([
      expect.objectContaining({
        model: 'gpt-5.6-sol',
        session_id: 'outer-session'
      })
    ]);
    expect(projected?.roles.implementation?.codex).toMatchObject({
      subtotal: 12,
      legs: [
        {
          receipt_id: 'r-implementation',
          model: 'gpt-5.6-terra',
          effort: 'high',
          session_id: 'thread-implementation',
          turn_id: 'turn-implementation',
          completed_at: '2026-08-11T00:00:00.000Z'
        }
      ]
    });
    expect(projected?.roles['review-consult']?.codex).toMatchObject({
      subtotal: 22,
      legs: [
        {
          receipt_id: 'r-review',
          model: 'gpt-5.6-luna',
          session_id: 'thread-review',
          turn_id: 'turn-review',
          completed_at: '2026-08-11T00:01:00.000Z'
        }
      ]
    });
  });

  test('omits effort from a projected nested leg when it is absent', () => {
    const projected = sumAttemptUsage(
      {
        outer: {
          attempt_id: 'outer',
          bead_id: 'UI-1',
          usage_legs: [
            {
              receipt_id: 'r-1',
              provider: 'codex',
              role: 'implementation',
              usage: { input_tokens: 1 }
            }
          ]
        }
      },
      'UI-1'
    );

    expect(projected?.roles.implementation?.codex?.legs[0]).not.toHaveProperty(
      'effort'
    );
  });

  test('omits historical absent reasoning from an aggregate breakdown', () => {
    const projected = sumAttemptUsage(
      {
        codex: {
          attempt_id: 'codex',
          bead_id: 'UI-1',
          runner: 'codex',
          usage: { input_tokens: 3, output_tokens: 1 }
        }
      },
      'UI-1'
    );

    expect(projected?.providers.codex?.breakdown).not.toHaveProperty(
      'reasoning_output_tokens'
    );
  });

  test('preserves explicit zero reasoning in an aggregate breakdown', () => {
    const projected = sumAttemptUsage(
      {
        codex: {
          attempt_id: 'codex',
          bead_id: 'UI-1',
          runner: 'codex',
          usage: {
            input_tokens: 3,
            output_tokens: 1,
            reasoning_output_tokens: 0
          }
        }
      },
      'UI-1'
    );

    expect(projected?.providers.codex?.breakdown).toHaveProperty(
      'reasoning_output_tokens',
      0
    );
  });

  test('omits a nested leg without a nonempty receipt id', () => {
    const projected = sumAttemptUsage(
      {
        outer: {
          attempt_id: 'outer',
          bead_id: 'UI-1',
          usage: { input_tokens: 1 },
          usage_legs: [
            {
              receipt_id: '',
              provider: 'codex',
              role: 'implementation',
              usage: { input_tokens: 10, output_tokens: 2 }
            }
          ]
        }
      },
      'UI-1'
    );

    expect(projected?.providers).not.toHaveProperty('codex');
    expect(projected?.roles).not.toHaveProperty('implementation');
  });

  test('reports a partial Claude cost beside the count of unpriced legs', () => {
    const attempts = {
      priced: {
        attempt_id: 'priced',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.5 }
      },
      unpriced: {
        attempt_id: 'unpriced',
        bead_id: 'UI-1',
        usage: { input_tokens: 2 }
      }
    };

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.providers.claude?.total_cost_usd).toBe(0.5);
    expect(projected?.providers.claude?.unpriced_leg_count).toBe(1);
  });

  test('keeps explicit zero, replayed, and resumed outer attempts distinct from absent usage', () => {
    const attempts = {
      original: {
        attempt_id: 'original',
        bead_id: 'UI-1',
        runner: 'codex',
        usage: {
          input_tokens: 0,
          output_tokens: 0,
          cache_read_input_tokens: 50,
          replayed: true
        }
      },
      resumed: {
        attempt_id: 'resumed',
        bead_id: 'UI-1',
        runner: 'codex',
        resumed_from: 'original',
        usage: { input_tokens: 3 }
      },
      absent: {
        attempt_id: 'absent',
        bead_id: 'UI-1',
        runner: 'codex',
        usage: null
      }
    };

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.providers.codex).toMatchObject({
      subtotal: 3,
      replayed: true,
      breakdown: { cache_read_input_tokens: 50 }
    });
    expect(projected?.roles.orchestrator?.codex?.legs).toHaveLength(2);
  });
});

describe('claude subagent legs (UI-2mpn §5.5)', () => {
  /**
   * @param {Partial<Record<string, any>>} [over]
   * @returns {Record<string, any>}
   */
  function attemptWithSubagent(over = {}) {
    return {
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
        usage_legs: [
          {
            receipt_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
            provider: 'claude',
            role: 'subagent',
            agent_type: 'general-purpose',
            agent_id: 'agt_9f3c21d4c0',
            model: 'claude-sonnet-4-5-20250929',
            session_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
            turn_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
            effort: null,
            usage: {
              input_tokens: 30,
              output_tokens: 200,
              cache_read_input_tokens: 1000,
              cache_creation_input_tokens: 100,
              reasoning_output_tokens: 0
            },
            completed_at: 3000
          }
        ],
        ...over
      }
    };
  }

  test('adds a subagent receipt to the Claude headline', () => {
    const projected = sumAttemptUsage(attemptWithSubagent(), 'UI-1');

    expect(projected?.providers.claude?.subtotal).toBe(1340);
  });

  test('leaves the Codex headline untouched by a subagent receipt', () => {
    const projected = sumAttemptUsage(attemptWithSubagent(), 'UI-1');

    expect(projected?.providers.codex).toBeUndefined();
  });

  test('projects the receipt into a subagent role leg', () => {
    const projected = sumAttemptUsage(attemptWithSubagent(), 'UI-1');

    expect(projected?.roles.subagent?.claude?.legs).toEqual([
      {
        provider: 'claude',
        role: 'subagent',
        attempt_id: 'outer',
        receipt_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
        agent_type: 'general-purpose',
        agent_id: 'agt_9f3c21d4c0',
        model: 'claude-sonnet-4-5-20250929',
        session_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
        turn_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
        completed_at: 3000,
        usage: {
          input_tokens: 30,
          output_tokens: 200,
          cache_read_input_tokens: 1000,
          cache_creation_input_tokens: 100,
          reasoning_output_tokens: 0
        },
        subtotal: 1330
      }
    ]);
  });

  test('makes no role leg for a session that reported no receipt', () => {
    const attempts = attemptWithSubagent({ usage_legs: [] });

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.roles.subagent).toBeUndefined();
    expect(projected?.providers.claude?.subtotal).toBe(10);
  });

  test('skips a claude leg whose role belongs to codex', () => {
    const attempts = attemptWithSubagent();
    attempts.outer.usage_legs[0].role = 'implementation';

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.providers.claude?.subtotal).toBe(10);
  });

  test('counts a repeated receipt id once', () => {
    const attempts = attemptWithSubagent();
    attempts.outer.usage_legs.push({ ...attempts.outer.usage_legs[0] });

    const projected = sumAttemptUsage(attempts, 'UI-1');

    expect(projected?.providers.claude?.subtotal).toBe(1340);
  });
});

describe('total-only subagent legs (UI-1663 §6.1)', () => {
  const FOUR_FIELD_BREAKDOWN = {
    input_tokens: 1,
    output_tokens: 2,
    cache_read_input_tokens: 3,
    cache_creation_input_tokens: 4
  };

  /**
   * @returns {Record<string, any>}
   */
  function attemptWithBackgroundSubagent() {
    return {
      outer: {
        attempt_id: 'outer',
        bead_id: 'UI-1',
        runner: 'claude',
        usage: { ...FOUR_FIELD_BREAKDOWN },
        usage_legs: [
          {
            receipt_id: 'toolu_01AgentBGBGBGBGBGBGBG',
            provider: 'claude',
            role: 'subagent',
            agent_type: 'Explore',
            agent_id: 'agt_7d21ba90ff',
            model: 'claude-sonnet-4-5-20250929',
            session_id: 'toolu_01AgentBGBGBGBGBGBGBG',
            turn_id: 'toolu_01AgentBGBGBGBGBGBGBG',
            effort: null,
            usage: { total_tokens: 219570 },
            completed_at: 3000
          }
        ]
      }
    };
  }

  test('takes total_tokens as the subtotal of a total-only leg', () => {
    const projected = sumAttemptUsage(attemptWithBackgroundSubagent(), 'UI-1');

    expect(projected?.roles.subagent?.claude?.legs[0].subtotal).toBe(219570);
  });

  test('adds a total-only leg to the Claude headline', () => {
    const projected = sumAttemptUsage(attemptWithBackgroundSubagent(), 'UI-1');

    expect(projected?.providers.claude?.subtotal).toBe(219580);
  });

  test('leaves the four-field breakdown untouched by a total-only leg', () => {
    const projected = sumAttemptUsage(attemptWithBackgroundSubagent(), 'UI-1');

    expect(projected?.providers.claude?.breakdown).toEqual(
      FOUR_FIELD_BREAKDOWN
    );
  });

  test('states that a total-only record reports no breakdown', () => {
    const tooltip = providerUsageTooltip('claude', {
      subtotal: 219570,
      breakdown: { total_tokens: 219570 }
    });

    expect(tooltip).toBe('총 219,570\n분해 없음 — 총량만 보고됨');
  });

  test('omits the zeroed fields and the formula from a total-only tooltip', () => {
    const tooltip = providerUsageTooltip('claude', {
      subtotal: 219570,
      breakdown: { total_tokens: 219570 }
    });

    expect(tooltip).not.toContain('입력 0');
    expect(tooltip).not.toContain('Claude subtotal =');
  });

  test('keeps the four-field tooltip unchanged', () => {
    const tooltip = providerUsageTooltip('claude', {
      subtotal: 10,
      breakdown: { ...FOUR_FIELD_BREAKDOWN }
    });

    expect(tooltip).toBe(
      'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성\n총 10\n입력 1 · 출력 2 · 캐시읽기 3 · 캐시생성 4'
    );
  });
});

describe('total-only legs inside an aggregate tooltip (UI-1vpv)', () => {
  const FOUR_FIELD_BREAKDOWN = {
    input_tokens: 10,
    output_tokens: 20,
    cache_read_input_tokens: 30,
    cache_creation_input_tokens: 40
  };

  /**
   * @param {Record<string, any>|null} outer_usage
   * @returns {Record<string, any>}
   */
  function attemptWith(outer_usage) {
    return {
      outer: {
        attempt_id: 'outer',
        bead_id: 'UI-1',
        runner: 'claude',
        usage: outer_usage,
        usage_legs: [
          {
            receipt_id: 'toolu_01AgentBGBGBGBGBGBGBG',
            provider: 'claude',
            role: 'subagent',
            usage: { total_tokens: 900 }
          }
        ]
      }
    };
  }

  /**
   * The tokens the tooltip actually lists, in the order it prints them.
   *
   * @param {string} tooltip
   * @returns {number[]}
   */
  function listedValues(tooltip) {
    const detail = tooltip.split('\n').find((line) => line.includes(' · '));
    if (!detail) {
      return [];
    }
    return [...detail.matchAll(/([0-9,]+)/g)].map((match) =>
      Number(match[1].replace(/,/g, ''))
    );
  }

  test('carries the total-only contribution on the aggregate summary', () => {
    const projected = sumAttemptUsage(
      attemptWith({ ...FOUR_FIELD_BREAKDOWN }),
      'UI-1'
    );

    expect(projected?.providers.claude?.total_only_subtotal).toBe(900);
  });

  test('omits the contribution when no total-only leg was tallied', () => {
    const projected = sumAttemptUsage(
      {
        outer: {
          attempt_id: 'outer',
          bead_id: 'UI-1',
          runner: 'claude',
          usage: { ...FOUR_FIELD_BREAKDOWN },
          usage_legs: []
        }
      },
      'UI-1'
    );

    expect(projected?.providers.claude).not.toHaveProperty(
      'total_only_subtotal'
    );
  });

  test('names the total-only part as its own term in the mixed formula', () => {
    const projected = sumAttemptUsage(
      attemptWith({ ...FOUR_FIELD_BREAKDOWN }),
      'UI-1'
    );

    const tooltip = providerUsageTooltip(
      'claude',
      /** @type {any} */ (projected?.providers.claude)
    );

    expect(tooltip).toBe(
      'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성 + 분해 없는 leg\n총 1,000\n입력 10 · 출력 20 · 캐시읽기 30 · 캐시생성 40 · 분해 없는 leg 900'
    );
  });

  test('makes the listed values add up to the mixed aggregate total', () => {
    const projected = sumAttemptUsage(
      attemptWith({ ...FOUR_FIELD_BREAKDOWN }),
      'UI-1'
    );

    const tooltip = providerUsageTooltip(
      'claude',
      /** @type {any} */ (projected?.providers.claude)
    );

    expect(listedValues(tooltip).reduce((sum, value) => sum + value, 0)).toBe(
      projected?.providers.claude?.subtotal
    );
  });

  test('reports no breakdown when the aggregate holds total-only legs alone', () => {
    const projected = sumAttemptUsage(attemptWith(null), 'UI-1');

    const tooltip = providerUsageTooltip(
      'claude',
      /** @type {any} */ (projected?.providers.claude)
    );

    expect(tooltip).toBe('총 900\n분해 없음 — 총량만 보고됨');
  });

  test('keeps the four-field aggregate tooltip unchanged', () => {
    const tooltip = providerUsageTooltip('claude', {
      subtotal: 100,
      breakdown: { ...FOUR_FIELD_BREAKDOWN }
    });

    expect(tooltip).toBe(
      'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성\n총 100\n입력 10 · 출력 20 · 캐시읽기 30 · 캐시생성 40'
    );
  });

  test('adds the total-only term to the Codex formula too', () => {
    const tooltip = providerUsageTooltip('codex', {
      subtotal: 930,
      breakdown: { input_tokens: 10, output_tokens: 20 },
      total_only_subtotal: 900
    });

    expect(tooltip.split('\n')[0]).toBe(
      'Codex subtotal = 입력 + 출력 + 분해 없는 leg; 캐시읽기·캐시쓰기·추론출력은 subtotal에 포함되지 않는 subset'
    );
  });

  test('sums the total-only contribution across merged projections', () => {
    const merged = mergeUsageProjections([
      sumAttemptUsage(attemptWith({ ...FOUR_FIELD_BREAKDOWN }), 'UI-1'),
      sumAttemptUsage(attemptWith(null), 'UI-1')
    ]);

    expect(merged?.providers.claude?.total_only_subtotal).toBe(1800);
  });

  test('keeps a merged tooltip formula true after the merge', () => {
    const merged = mergeUsageProjections([
      sumAttemptUsage(attemptWith({ ...FOUR_FIELD_BREAKDOWN }), 'UI-1'),
      sumAttemptUsage(attemptWith(null), 'UI-1')
    ]);

    const tooltip = providerUsageTooltip(
      'claude',
      /** @type {any} */ (merged?.providers.claude)
    );

    expect(listedValues(tooltip).reduce((sum, value) => sum + value, 0)).toBe(
      merged?.providers.claude?.subtotal
    );
  });
});

describe('leg pricing and partial-cost display (preset-compare §1.3)', () => {
  const catalog = resolveCatalog({
    overrides: {
      codex: { models: { sol: { price: { input: 2, output: 10 } } } },
      claude: { models: { opus: { price: { input: 3 } } } }
    },
    warn: () => {}
  });

  const CODEX_ATTEMPT = {
    a1: {
      attempt_id: 'a1',
      bead_id: 'UI-1',
      runner: 'codex',
      model: 'sol',
      usage: { input_tokens: 1_000_000, output_tokens: 100_000 }
    }
  };

  test('prices a Codex attempt the runner never costed', () => {
    const projected = sumAttemptUsage(CODEX_ATTEMPT, 'UI-1', catalog);

    expect(projected?.providers.codex?.total_cost_usd).toBe(3);
    expect(projected?.providers.codex).not.toHaveProperty('unpriced_leg_count');
  });

  test('leaves a Codex attempt unpriced without a catalog', () => {
    const projected = sumAttemptUsage(CODEX_ATTEMPT, 'UI-1');

    expect(projected?.providers.codex).not.toHaveProperty('total_cost_usd');
  });

  test('names the unpriced leg count beside the partial sum', () => {
    const label = formatCost({ total_cost_usd: 1.234, unpriced_leg_count: 2 });

    expect(label).toBe('$1.23 (+2 leg 단가 없음)');
  });

  test('omits the suffix when every leg was priced', () => {
    expect(formatCost({ total_cost_usd: 1.234 })).toBe('$1.23');
  });

  test('returns no cost text when no leg could be priced', () => {
    expect(formatCost({ unpriced_leg_count: 3 })).toBe(null);
  });

  test('appends the unpriced count to the provider badge label', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        runner: 'codex',
        model: 'sol',
        usage: { input_tokens: 1_000_000, output_tokens: 100_000 },
        usage_legs: [
          {
            receipt_id: 'r1',
            provider: 'codex',
            role: 'implementation',
            model: 'terra',
            usage: { input_tokens: 500_000, output_tokens: 0 }
          }
        ]
      }
    };

    const badges = providerUsageBadges(
      sumAttemptUsage(attempts, 'UI-1', catalog)
    );

    expect(badges[0].label).toContain('$3.00 (+1 leg 단가 없음)');
  });

  test('notes the input-rate estimate in the tooltip', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        runner: 'claude',
        model: 'opus',
        usage: { input_tokens: 1_000_000 },
        usage_legs: [
          {
            receipt_id: 'r1',
            provider: 'claude',
            role: 'subagent',
            model: 'opus',
            usage: { total_tokens: 2_000_000 }
          }
        ]
      }
    };

    const badges = providerUsageBadges(
      sumAttemptUsage(attempts, 'UI-1', catalog)
    );

    expect(badges[0].label).toContain('$9.00');
    expect(badges[0].tooltip).toContain(
      '총량만 보고된 leg 포함 — 입력 단가로 추정'
    );
    expect(badges[0].tooltip).toContain('API 환산 단가 기준');
  });

  test('carries the unpriced count through a merge', () => {
    const priced = sumAttemptUsage(CODEX_ATTEMPT, 'UI-1', catalog);
    const unpriced = sumAttemptUsage(
      {
        a2: {
          attempt_id: 'a2',
          bead_id: 'UI-1',
          runner: 'codex',
          model: 'terra',
          usage: { input_tokens: 1_000_000 }
        }
      },
      'UI-1',
      catalog
    );

    const merged = mergeUsageProjections([priced, unpriced]);

    expect(formatCost(merged?.providers.codex)).toBe(
      '$3.00 (+1 leg 단가 없음)'
    );
  });

  test('marks each leg with the basis its price came from', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        runner: 'codex',
        model: 'sol',
        usage: { input_tokens: 1_000_000, output_tokens: 0 },
        usage_legs: [
          {
            receipt_id: 'r1',
            provider: 'codex',
            role: 'implementation',
            model: 'terra',
            usage: { input_tokens: 500_000 }
          }
        ]
      }
    };

    const legs = sumAttemptUsage(attempts, 'UI-1', catalog)?.roles;

    expect(legs?.orchestrator?.codex?.legs[0].price_basis).toBe('computed');
    expect(legs?.orchestrator?.codex?.legs[0].price_usd).toBe(2);
    expect(legs?.implementation?.codex?.legs[0].price_basis).toBe('none');
  });

  test('leaves the per-leg markers off when nothing could be priced', () => {
    const legs = sumAttemptUsage(CODEX_ATTEMPT, 'UI-1')?.roles;

    expect(legs?.orchestrator?.codex?.legs[0]).not.toHaveProperty(
      'price_basis'
    );
  });
});
