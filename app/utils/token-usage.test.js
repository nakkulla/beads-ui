import { describe, expect, test } from 'vitest';
import {
  formatUsageTotal,
  formatUsageTotalWithCost,
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

  test('omits the cost when only some attempts reported one (UI-tq13 §7)', () => {
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

    expect(total?.providers.claude).not.toHaveProperty('total_cost_usd');
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

  test('exposes Claude cost only when every summed Claude outer attempt reports it', () => {
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

    expect(projected?.providers.claude).not.toHaveProperty('total_cost_usd');
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
