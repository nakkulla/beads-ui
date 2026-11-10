import { describe, expect, test } from 'vitest';
import { attemptCostUsage, sessionCostBaseline } from './session-cost.js';

/**
 * @param {string} attempt_id
 * @param {Record<string, any>} [fields]
 */
function attempt(attempt_id, fields = {}) {
  return {
    attempt_id,
    bead_id: 'UI-1',
    runner: 'claude',
    session_id: 'sid-1',
    resumed_from: null,
    started_at: null,
    finished_at: null,
    ...fields
  };
}

describe('worker/session-cost', () => {
  test('records a same-session resume as the increment over its parent', () => {
    const attempts = {
      a1: attempt('a1', { finished_at: 10, usage: { total_cost_usd: 61.25 } }),
      a2: attempt('a2', { resumed_from: 'a1', started_at: 20 })
    };

    const result = attemptCostUsage(attempts, attempts.a2, {
      output_tokens: 2151,
      total_cost_usd: 63.75
    });

    expect(result).toEqual({
      usage: { output_tokens: 2151, total_cost_usd: 2.5 },
      session_cost_usd: 63.75
    });
  });

  test('subtracts the raw session total a resumed parent kept, not its increment', () => {
    const attempts = {
      a1: attempt('a1', {
        finished_at: 10,
        usage: { total_cost_usd: 10 },
        session_cost_usd: 10
      }),
      a2: attempt('a2', {
        resumed_from: 'a1',
        finished_at: 20,
        usage: { total_cost_usd: 5 },
        session_cost_usd: 15
      }),
      a3: attempt('a3', { resumed_from: 'a2', started_at: 30 })
    };

    const result = attemptCostUsage(attempts, attempts.a3, {
      total_cost_usd: 18
    });

    expect(result.usage).toEqual({ total_cost_usd: 3 });
  });

  test('passes over an earlier attempt that reported no cost', () => {
    const attempts = {
      a1: attempt('a1', { finished_at: 10, usage: { total_cost_usd: 4 } }),
      a2: attempt('a2', { finished_at: 20, usage: { input_tokens: 3 } }),
      a3: attempt('a3', { started_at: 30 })
    };

    const baseline = sessionCostBaseline(attempts, attempts.a3);

    expect(baseline).toBe(4);
  });

  test('deducts nothing for an attempt that started another session', () => {
    const attempts = {
      a1: attempt('a1', { finished_at: 10, usage: { total_cost_usd: 4 } }),
      a2: attempt('a2', {
        resumed_from: 'a1',
        session_id: 'sid-2',
        started_at: 20
      })
    };

    const result = attemptCostUsage(attempts, attempts.a2, {
      total_cost_usd: 1
    });

    expect(result).toEqual({
      usage: { total_cost_usd: 1 },
      session_cost_usd: 1
    });
  });

  test('keeps the reported cost when it is below the baseline', () => {
    const attempts = {
      a1: attempt('a1', { finished_at: 10, usage: { total_cost_usd: 4 } }),
      a2: attempt('a2', { resumed_from: 'a1', started_at: 20 })
    };

    const result = attemptCostUsage(attempts, attempts.a2, {
      total_cost_usd: 1
    });

    expect(result.usage).toEqual({ total_cost_usd: 1 });
  });

  test('deducts the session cost of a review that resumed without resumed_from', () => {
    const attempts = {
      impl: attempt('impl', { finished_at: 10, usage: { total_cost_usd: 10 } }),
      review: attempt('review', { started_at: 20 })
    };

    const result = attemptCostUsage(attempts, attempts.review, {
      total_cost_usd: 12
    });

    expect(result.usage).toEqual({ total_cost_usd: 2 });
  });

  test('ignores a same-session attempt that finished after this one started', () => {
    const attempts = {
      a1: attempt('a1', { started_at: 10 }),
      a2: attempt('a2', { finished_at: 20, usage: { total_cost_usd: 3 } })
    };

    const baseline = sessionCostBaseline(attempts, attempts.a1);

    expect(baseline).toBe(null);
  });

  test('leaves a non-Claude attempt untouched', () => {
    const attempts = {
      a1: attempt('a1', { runner: 'codex', usage: { total_cost_usd: 4 } }),
      a2: attempt('a2', { runner: 'codex', resumed_from: 'a1' })
    };
    const usage = { total_cost_usd: 6 };

    const result = attemptCostUsage(attempts, attempts.a2, usage);

    expect(result).toEqual({ usage });
  });
});
