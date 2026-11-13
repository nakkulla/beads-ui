import { describe, expect, test } from 'vitest';
import { comparisonFindings } from './findings.js';

/** @param {Record<string, any>} [overrides] */
function unit(overrides = {}) {
  return {
    name: 'opus',
    n: 10,
    eligible: true,
    problem_rate: 0.4,
    duration_ms: { mean: 600000, median: 600000 },
    cost_usd: { mean: 10 },
    first_finished_at: Date.parse('2026-10-01'),
    last_finished_at: Date.parse('2026-10-10'),
    ...overrides
  };
}

/**
 * @param {any[]} groups
 * @param {Record<string, any>} [overrides]
 */
function model(groups, overrides = {}) {
  return {
    groups,
    summary: {
      n: 20,
      problem_count: 0,
      problems: {},
      duration_ms: { mean: 600000, median: 600000 },
      unobserved_count: 0,
      inferred_count: 0,
      ...overrides
    }
  };
}

describe('comparison findings', () => {
  test('compares the two most numerous eligible units using their measured values', () => {
    const input = model([
      unit({
        n: 30,
        name: 'A',
        cost_usd: { mean: 5 },
        duration_ms: { mean: 300000 }
      }),
      unit({ n: 20, name: 'B' }),
      unit({ n: 10, name: 'C' })
    ]);

    const lines = comparisonFindings(input, 'reviewer');

    expect(lines[0]).toContain('A 쪽은 B 쪽보다');
    expect(lines[0]).toContain('$5.00(50%)');
    expect(lines[0]).toContain('5분');
    expect(lines[0]).not.toContain('C');
  });

  test('warns when the two observed periods overlap less than halfway', () => {
    const input = model([
      unit(),
      unit({
        name: 'sol',
        first_finished_at: Date.parse('2026-11-01'),
        last_finished_at: Date.parse('2026-11-10')
      })
    ]);

    const lines = comparisonFindings(input, 'setting');

    expect(lines.join(' ')).toContain('10-01~10-10 대 11-01~11-10');
    expect(lines.join(' ')).toContain('시기와 작업 차이가 섞여');
  });

  test('counts a dominant problem kind without treating overlapping kinds as sessions', () => {
    const input = model([], {
      problem_count: 124,
      problems: { review: 109, failed: 20 }
    });

    const lines = comparisonFindings(input, 'setting');

    expect(lines.join(' ')).toContain('문제 세션 124건 중 109건이 리뷰 지적');
  });

  test('warns when long sessions pull the mean beyond twice the median', () => {
    const input = model([], { duration_ms: { mean: 130000, median: 60000 } });

    expect(comparisonFindings(input, 'setting').join(' ')).toContain(
      '몇몇 긴 세션'
    );
  });

  test.each(['setting', 'orchestration', 'impl_actor', 'reviewer'])(
    'explains the single comparable unit in the %s view',
    (group_by) => {
      const input = model([unit()]);

      const lines = comparisonFindings(input, group_by);

      expect(lines.join(' ')).toContain('하나뿐입니다');
      expect(lines.join(' ')).toContain(
        group_by === 'setting' ? '구현 리프 보기' : '기간을 넓혀'
      );
    }
  );

  test('reports inferred settings and missing observation counts', () => {
    const input = model(
      [unit({ name: '리프 설정 모름', n: 6, eligible: false })],
      { inferred_count: 3, unobserved_count: 2 }
    );

    const text = comparisonFindings(input, 'setting').join(' ');

    expect(text).toContain('리프 설정을 모르는 세션 6건');
    expect(text).toContain('리프·리뷰어 설정 3건');
    expect(text).toContain('실행 기록이 없는 세션 2건');
  });

  test('uses reviewer children as the setting comparison units', () => {
    const input = model([
      unit({
        name: 'parent',
        children: [unit({ name: 'sol' }), unit({ name: 'astra' })]
      })
    ]);

    const lines = comparisonFindings(input, 'setting');

    expect(lines[0]).toContain('sol 쪽은 astra 쪽보다');
    expect(lines[0]).not.toContain('parent');
  });

  test.each([
    ['impl_actor', '작업 크기 차이'],
    ['setting', '설정마다 맡은 작업'],
    ['reviewer', '착지 뒤 품질에 주는 효과는 재지 않고']
  ])('states the limits of comparisons in the %s view', (group_by, warning) => {
    const input = model([]);

    expect(comparisonFindings(input, group_by).join(' ')).toContain(warning);
  });
});
