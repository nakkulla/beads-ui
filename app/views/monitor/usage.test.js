import { describe, expect, test } from 'vitest';
import { crossRepoTokenTotal, tokenTotalTooltip } from './usage.js';

/**
 * One 완료 아이템's minimal shape `crossRepoTokenTotal()` reads — just the
 * `usage` field `buildLanes()` already attaches via `sumAttemptUsage()`.
 *
 * @param {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null|undefined} usage
 * @returns {{ usage: import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null|undefined }}
 */
function doneItem(usage) {
  return { usage };
}

describe('cross-repo token total (UI-qrfo §7)', () => {
  test('keeps Claude and Codex totals separate across workspaces', () => {
    const total = crossRepoTokenTotal([
      doneItem({
        providers: {
          claude: {
            subtotal: 15,
            breakdown: { input_tokens: 10, output_tokens: 5 }
          }
        },
        roles: {}
      }),
      doneItem({
        providers: {
          codex: {
            subtotal: 8,
            breakdown: {
              input_tokens: 5,
              output_tokens: 3,
              cache_read_input_tokens: 100
            }
          }
        },
        roles: {}
      })
    ]);

    expect(total).toEqual([
      expect.objectContaining({ label: 'Claude τ 15' }),
      expect.objectContaining({ label: 'Codex τ 8' })
    ]);
  });

  test('sums usage across every repo done row into one total', () => {
    const total = crossRepoTokenTotal([
      doneItem({ input_tokens: 1000, output_tokens: 200 }),
      doneItem({ input_tokens: 800, output_tokens: 0 })
    ]);

    expect(total).toBe('τ 2.0k');
  });

  test('omits the cost when only some of the summed rows reported one', () => {
    const total = crossRepoTokenTotal([
      doneItem({
        input_tokens: 1000,
        output_tokens: 200,
        total_cost_usd: 1.5
      }),
      doneItem({ input_tokens: 800, output_tokens: 0 })
    ]);

    expect(total).toBe('τ 2.0k');
  });

  test('appends the cost when every summed row reported one', () => {
    const total = crossRepoTokenTotal([
      doneItem({
        input_tokens: 1000,
        output_tokens: 200,
        total_cost_usd: 1.5
      }),
      doneItem({
        input_tokens: 800,
        output_tokens: 0,
        total_cost_usd: 2.25
      })
    ]);

    expect(total).toBe('τ 2.0k · $3.75');
  });

  test('renders no total at all when nobody reported usage', () => {
    const total = crossRepoTokenTotal([doneItem(null), doneItem(undefined)]);

    expect(total).toBeNull();
  });

  test('changes when the period-filtered population changes', () => {
    const wide = [
      doneItem({ input_tokens: 1000 }),
      doneItem({ input_tokens: 500 })
    ];
    const narrow = wide.slice(0, 1);

    expect(crossRepoTokenTotal(wide)).toBe('τ 1.5k');
    expect(crossRepoTokenTotal(narrow)).toBe('τ 1.0k');
    expect(crossRepoTokenTotal(wide)).not.toBe(crossRepoTokenTotal(narrow));
  });
});

describe('cross-repo token total tooltip (UI-qrfo §7)', () => {
  test('names the selected period and states the cohort-not-window caveat', () => {
    const tooltip = tokenTotalTooltip('오늘');

    expect(tooltip).toBe(
      '오늘 완료된 이슈들이 생애 전체에 쓴 토큰 누적 (입력+출력+캐시). 이 기간에 소모된 양이 아니다'
    );
  });
});
