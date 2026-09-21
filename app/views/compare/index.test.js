import process from 'node:process';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { DEFAULT_PROBLEM_CRITERIA } from '../../utils/compare-problem-criteria.js';
import { createCompareView } from './index.js';

/** Let every pending microtask and timer-0 callback run. */
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

const RUN = {
  run_id: 'bench-1',
  source_bead_id: 'UI-src',
  base_sha: 'a'.repeat(40),
  repeats: 3,
  reviewer_mode: 'fixed',
  reviewer: {
    impl_review_model: 'sonnet',
    impl_review_effort: 'high',
    impl_review_speed: 'default'
  },
  delegate_forced: true,
  created_at: 1750000000000,
  root_dir: '/repo',
  cell_count: 9,
  terminal_count: 3,
  presets: [{ id: 'p1', name: '프리셋 A' }],
  cells: [
    {
      preset_id: 'p1',
      k: 1,
      bead_id: 'UI-c1',
      attempt_id: 'a1',
      status: 'done',
      terminal: true,
      bench_verify: { ok: true }
    },
    {
      preset_id: 'p1',
      k: 2,
      bead_id: 'UI-c2',
      attempt_id: 'a2',
      status: 'done',
      terminal: true,
      bench_verify: { ok: true }
    }
  ]
};

const ISSUES = [
  {
    id: 'UI-src',
    title: '원본 이슈',
    metadata: { route: 'quick_fix', quick_fix_review: 'self@abcdef123456' }
  },
  {
    id: 'UI-spec',
    title: '스펙 이슈',
    metadata: { route: 'spec_backed' }
  }
];

/**
 * @param {{ runs?: any[], benchRows?: any[], onCreate?: (payload: any) => any }} [options]
 */
function mountView(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const calls = /** @type {Array<{ type: string, payload: any }>} */ ([]);
  const transport = vi.fn(async (type, payload) => {
    calls.push({ type, payload });
    if (type === 'get-compare') {
      const bench_rows = options.benchRows ?? [
        {
          attempt_id: 'a1',
          bead_id: 'UI-c1',
          status: 'done',
          verify: 'pass',
          duration_ms: 1000
        },
        {
          attempt_id: 'a2',
          bead_id: 'UI-c2',
          status: 'done',
          verify: 'pass',
          duration_ms: 3000
        }
      ];
      return {
        payload: {
          rows: bench_rows,
          groups: [],
          workspaces: [],
          runs: options.runs ?? [RUN],
          bench_rows
        }
      };
    }
    if (type === 'bench-run-create') {
      return options.onCreate
        ? options.onCreate(payload)
        : { payload: { run: RUN } };
    }
    return { payload: {} };
  });
  const view = createCompareView(root, {
    transport,
    execPresetStore: {
      get: () => ({ presets: [{ id: 'p1', name: '프리셋 A', settings: {} }] })
    },
    sourceCandidates: () => ISSUES
  });
  return { root, view, transport, calls };
}

/**
 * @param {HTMLElement} root
 */
function openForm(root) {
  /** @type {HTMLButtonElement} */ (
    root.querySelector('.cmp-bench__new')
  ).click();
}

/** @param {Record<string, any>} [overrides] */
function comparisonGroup(overrides = {}) {
  return {
    key: 'preset:p1',
    name: '프리셋 A',
    badge: 'preset',
    n: 4,
    issue_count: 3,
    landed: 2,
    judged: 3,
    in_flight: 1,
    landing_rate: 2 / 3,
    problem_count: 2,
    problem_rate: 0.5,
    problems: { failed: 1, retry: 1, review: 0, human: 1 },
    duration_ms: { mean: 120000, median: 60000, sample: 4, total: 4 },
    cost_usd: { mean: 2, median: 1, sample: 3, total: 4, partial_count: 1 },
    compositions: [{ composition: 'astra/high → main 직접', count: 4 }],
    best: ['landing', 'duration', 'cost'],
    attempt_ids: ['session-1'],
    ...overrides
  };
}

/** @param {Record<string, any>} [payload] */
function mountComparison(payload = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const snapshot = {
    summary: comparisonGroup(),
    groups: [comparisonGroup()],
    rows: [
      {
        attempt_id: 'session-1',
        bead_id: 'UI-one',
        title: '긴 제목의 세션',
        outcome: {
          kind: 'landed',
          evidence: 'closed',
          pr_url: 'https://github.com/a/b/pull/291'
        },
        verify: 'pass',
        duration_ms: 60000,
        finished_at: 1750000000000,
        usage: { total_cost_usd: 2 },
        problems: {
          failed: false,
          retry: true,
          review: true,
          human: true,
          evidence: {
            retry: {
              origin: 'original-1',
              kind: 'resume',
              cause: null,
              env: false
            },
            review: { round: 2, blocking: 1, minor: 3 },
            human: ['승인 대기', '재개']
          }
        },
        preset: { deviated_keys: ['impl_effort'] }
      }
    ],
    workspaces: [{ root_dir: '/repo', name: '저장소 A' }],
    runs: [],
    bench_rows: [],
    warnings: [],
    criteria: {
      effective: DEFAULT_PROBLEM_CRITERIA,
      is_default: true,
      baselines: {
        duration_ms: { median: 60000, sample: 5, active: true },
        cost_usd: {
          median: 1,
          sample: 5,
          active: true,
          partial_count: 0
        }
      }
    },
    ...payload
  };
  const transport = vi.fn(async () => ({ payload: snapshot }));
  const gotoIssue = vi.fn();
  const view = createCompareView(root, { transport, gotoIssue });
  return { root, view, transport, gotoIssue, snapshot };
}

/**
 * @param {HTMLElement} root
 * @param {string} label
 * @param {string} value
 */
function changeSelect(root, label, value) {
  const field = Array.from(root.querySelectorAll('.cmp-filter')).find(
    (element) =>
      element.querySelector('.cmp-filter__label')?.textContent === label
  );
  const select = /** @type {HTMLSelectElement} */ (
    field?.querySelector('select')
  );
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * @param {HTMLElement} root
 * @param {'시작일'|'종료일'} label
 * @param {string} value
 */
function changeDate(root, label, value) {
  const input = /** @type {HTMLInputElement} */ (
    root.querySelector(`.cmp-filter__date[aria-label="${label}"]`)
  );
  input.value = value;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('compare group cards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  test('renders the short and custom comparison periods', () => {
    const { root } = mountComparison();
    const period = Array.from(root.querySelectorAll('.cmp-filter')).find(
      (element) =>
        element.querySelector('.cmp-filter__label')?.textContent === '기간'
    );
    const labels = Array.from(period?.querySelectorAll('option') ?? []).map(
      (option) => option.textContent?.trim()
    );

    expect(labels).toEqual([
      '오늘',
      '최근 2일',
      '최근 3일',
      '최근 7일',
      '최근 30일',
      '전체',
      '직접 지정'
    ]);
  });

  test('renders two date inputs for a custom period', async () => {
    const { root } = mountComparison();

    changeSelect(root, '기간', 'custom');
    await settle();

    expect(root.querySelectorAll('.cmp-filter__date')).toHaveLength(2);
    expect(root.querySelector('[aria-label="시작일"]')).not.toBeNull();
    expect(root.querySelector('[aria-label="종료일"]')).not.toBeNull();
  });

  test('omits date inputs for a preset period', () => {
    const { root } = mountComparison();

    expect(root.querySelector('.cmp-filter__date')).toBeNull();
  });

  test('keeps the previous table and skips a reversed custom request', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    changeSelect(root, '기간', 'custom');
    await settle();
    changeDate(root, '시작일', '2026-09-10');
    await settle();
    const calls_before_error = transport.mock.calls.length;

    changeDate(root, '종료일', '2026-09-01');
    await settle();

    expect(transport).toHaveBeenCalledTimes(calls_before_error);
    expect(root.querySelector('.cmp-filter__error')?.textContent).toContain(
      '시작일이 종료일보다 늦습니다'
    );
    expect(root.querySelector('.cmp-card')).not.toBeNull();
  });

  test('sends valid custom dates as epoch boundaries', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    changeSelect(root, '기간', 'custom');
    await settle();
    changeDate(root, '시작일', '2026-09-01');
    await settle();

    changeDate(root, '종료일', '2026-09-10');
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        range: 'custom',
        since: new Date(2026, 8, 1, 0, 0, 0, 0).getTime(),
        until: new Date(2026, 8, 11, 0, 0, 0, 0).getTime()
      })
    );
  });

  test('uses the next local midnight as the exclusive end boundary', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    changeSelect(root, '기간', 'custom');
    await settle();

    changeDate(root, '종료일', '2026-09-10');
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        since: null,
        until: new Date(2026, 8, 11, 0, 0, 0, 0).getTime()
      })
    );
  });

  test('resets the exclusive end boundary after a midnight DST transition', async () => {
    const original_tz = process.env.TZ;
    process.env.TZ = 'America/Santiago';
    try {
      const { root, view, transport } = mountComparison();
      await view.refresh();
      changeSelect(root, '기간', 'custom');
      await settle();

      changeDate(root, '종료일', '2026-09-06');
      await settle();

      expect(transport).toHaveBeenLastCalledWith(
        'get-compare',
        expect.objectContaining({
          until: new Date(2026, 8, 7, 0, 0, 0, 0).getTime()
        })
      );
    } finally {
      if (original_tz === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = original_tz;
      }
    }
  });

  test.each([
    ['2026-09-01', '2026-09-10', '2026-09-01 ~ 2026-09-10'],
    ['2026-09-01', '', '2026-09-01 이후'],
    ['', '2026-09-10', '2026-09-10까지'],
    ['', '', '전체 기간']
  ])(
    'summarizes custom dates %s to %s',
    async (start_date, end_date, expected) => {
      const { root, view } = mountComparison();
      await view.refresh();
      changeSelect(root, '기간', 'custom');
      await settle();
      if (start_date !== '') {
        changeDate(root, '시작일', start_date);
        await settle();
      }
      if (end_date !== '') {
        changeDate(root, '종료일', end_date);
        await settle();
      }

      expect(
        root
          .querySelector('.cmp-head__summary')
          ?.textContent?.replace(/\s+/gu, ' ')
      ).toContain(expected);
    }
  );

  test('restores a stored comparison preset', async () => {
    localStorage.setItem('bdui.compare.range', '2d');
    const { view, transport } = mountComparison();

    await view.refresh();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({ range: '2d' })
    );
  });

  test('falls back to thirty days for a stored custom period', async () => {
    localStorage.setItem('bdui.compare.range', 'custom');
    const { view, transport } = mountComparison();

    await view.refresh();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({ range: '30d' })
    );
  });

  test('renders effective criteria and marks a customized response', async () => {
    const effective = structuredClone(DEFAULT_PROBLEM_CRITERIA);
    effective.failed.on = false;
    const { root, view } = mountComparison({
      criteria: {
        effective,
        is_default: false,
        baselines: {
          duration_ms: { median: 60000, sample: 5, active: true },
          cost_usd: { median: 1, sample: 5, active: true, partial_count: 0 }
        }
      }
    });

    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();

    expect(
      root
        .querySelector('.cmp-criteria summary')
        ?.textContent?.replace(/\s+/gu, ' ')
        .trim()
    ).toBe('문제 기준 ●');
    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('.cmp-criteria__row input')
      ).checked
    ).toBe(false);
    expect(
      root.querySelector('[data-metric="problem"]')?.textContent
    ).toContain('기준 조정됨');
    expect(root.querySelector('.cmp-problems')?.textContent).not.toContain(
      '실패·폐기'
    );
  });

  test('stores a checkbox change and sends criteria on the next request', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const failed = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-criteria__row input')
    );

    failed.click();
    await settle();

    expect(
      JSON.parse(localStorage.getItem('bdui.compare.problem_criteria') ?? '{}')
        .failed.on
    ).toBe(false);
    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        problem_criteria: expect.objectContaining({ failed: { on: false } })
      })
    );
    expect(
      /** @type {HTMLDetailsElement} */ (root.querySelector('.cmp-criteria'))
        .open
    ).toBe(true);
  });

  test('clamps a factor before storing and requesting', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const inputs = root.querySelectorAll('.cmp-criteria__number');
    const duration = /** @type {HTMLInputElement} */ (inputs[3]);

    duration.value = '20';
    duration.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        problem_criteria: expect.objectContaining({
          duration: { on: true, factor: 10 }
        })
      })
    );
  });

  test('stores an emptied review threshold as null', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const round = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-criteria__number')
    );

    round.value = '';
    round.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        problem_criteria: expect.objectContaining({
          review: expect.objectContaining({ round_min: null })
        })
      })
    );
  });

  test('removes storage and omits criteria when resetting', async () => {
    localStorage.setItem(
      'bdui.compare.problem_criteria',
      JSON.stringify({ failed: { on: false } })
    );
    const effective = structuredClone(DEFAULT_PROBLEM_CRITERIA);
    effective.failed.on = false;
    const { root, view, transport } = mountComparison({
      criteria: {
        effective,
        is_default: false,
        baselines: {
          duration_ms: { median: null, sample: 0, active: false },
          cost_usd: { median: null, sample: 0, active: false, partial_count: 0 }
        }
      }
    });
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-criteria__reset')
    ).click();
    await settle();

    expect(localStorage.getItem('bdui.compare.problem_criteria')).toBeNull();
    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.not.objectContaining({ problem_criteria: expect.anything() })
    );
  });

  test('falls back to defaults when localStorage reading throws', async () => {
    const get_item = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementationOnce(() => {
        throw new Error('blocked');
      });

    const { view, transport } = mountComparison();
    await view.refresh();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.not.objectContaining({ problem_criteria: expect.anything() })
    );
    get_item.mockRestore();
  });

  test('accumulates two changes made before a reply arrives', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const failed = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-criteria__row input')
    );
    const factor = /** @type {HTMLInputElement} */ (
      root.querySelectorAll('.cmp-criteria__number')[3]
    );

    failed.click();
    factor.value = '5';
    factor.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        problem_criteria: expect.objectContaining({
          failed: { on: false },
          duration: { on: true, factor: 5 }
        })
      })
    );
  });

  test('edits from the defaults when a change follows an unanswered reset', async () => {
    localStorage.setItem(
      'bdui.compare.problem_criteria',
      JSON.stringify({ failed: { on: false }, verify: { on: false } })
    );
    const effective = structuredClone(DEFAULT_PROBLEM_CRITERIA);
    effective.failed.on = false;
    effective.verify.on = false;
    const { root, view, transport } = mountComparison({
      criteria: {
        effective,
        is_default: false,
        baselines: {
          duration_ms: { median: 60000, sample: 5, active: true },
          cost_usd: { median: 1, sample: 5, active: true, partial_count: 0 }
        }
      }
    });
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-criteria__reset')
    ).click();
    const factor = /** @type {HTMLInputElement} */ (
      root.querySelectorAll('.cmp-criteria__number')[3]
    );
    factor.value = '5';
    factor.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({
        problem_criteria: expect.objectContaining({
          failed: { on: true },
          verify: { on: true },
          duration: { on: true, factor: 5 }
        })
      })
    );
  });

  test('restores an emptied factor input from the effective criteria', async () => {
    const { root, view } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const factor = /** @type {HTMLInputElement} */ (
      root.querySelectorAll('.cmp-criteria__number')[3]
    );

    factor.value = '';
    factor.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(factor.value).toBe('3');
  });

  test('restores a checkbox from the effective criteria after a failed request', async () => {
    const { root, view, transport } = mountComparison();
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    const failed = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-criteria__row input')
    );
    transport.mockRejectedValueOnce(new Error('끊김'));

    failed.click();
    await settle();

    expect(failed.checked).toBe(true);
  });

  test('drops the factor from a chip when the baseline median is zero', async () => {
    const row = {
      ...mountComparison().snapshot.rows[0],
      problems: {
        failed: false,
        retry: false,
        review: false,
        human: false,
        verify: false,
        duration: true,
        cost: true,
        pin: false,
        evidence: {
          duration: { value_ms: 5000, baseline_ms: 0, factor: 3 },
          cost: { value_usd: 2, baseline_usd: 0, factor: 3, partial: false }
        }
      },
      preset: { deviated_keys: [] }
    };
    const { root, view } = mountComparison({
      rows: [row],
      criteria: {
        effective: DEFAULT_PROBLEM_CRITERIA,
        is_default: true,
        baselines: {
          duration_ms: { median: 0, sample: 5, active: true },
          cost_usd: { median: 0, sample: 5, active: true, partial_count: 0 }
        }
      }
    });
    await view.refresh();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();
    const chips = Array.from(
      root.querySelectorAll('.cmp-session__chips .cmp-chip')
    );

    expect(chips.map((chip) => chip.textContent?.trim())).toEqual([
      '시간 초과',
      '비용 초과'
    ]);
  });

  test('keeps the last effective criteria after a failed request', async () => {
    const effective = structuredClone(DEFAULT_PROBLEM_CRITERIA);
    effective.cost.factor = 5;
    const { root, view, transport } = mountComparison({
      criteria: {
        effective,
        is_default: false,
        baselines: {
          duration_ms: { median: 60000, sample: 5, active: true },
          cost_usd: { median: 1, sample: 5, active: true, partial_count: 0 }
        }
      }
    });
    await view.refresh();
    /** @type {HTMLElement} */ (
      root.querySelector('.cmp-criteria summary')
    ).click();
    transport.mockRejectedValueOnce(new Error('끊김'));

    await view.refresh();

    expect(root.querySelector('.cmp-error')).not.toBeNull();
    expect(
      Array.from(root.querySelectorAll('.cmp-criteria__number')).map(
        (input) => /** @type {HTMLInputElement} */ (input).value
      )
    ).toContain('5');
  });

  test('renders environmental retry and verify, duration, and cost chips', async () => {
    const row = {
      ...mountComparison().snapshot.rows[0],
      problems: {
        failed: false,
        retry: true,
        review: false,
        human: false,
        verify: true,
        duration: true,
        cost: true,
        pin: false,
        evidence: {
          retry: {
            origin: 'origin',
            kind: 'env_ladder',
            cause: 'capacity',
            env: true
          },
          verify: 'merge_verify',
          duration: { value_ms: 240000, baseline_ms: 60000, factor: 3 },
          cost: {
            value_usd: 4.1,
            baseline_usd: 1,
            factor: 3,
            partial: true
          }
        }
      },
      preset: { deviated_keys: [] }
    };
    const { root, view } = mountComparison({
      rows: [row],
      criteria: {
        effective: DEFAULT_PROBLEM_CRITERIA,
        is_default: true,
        baselines: {
          duration_ms: { median: 60000, sample: 5, active: true },
          cost_usd: { median: 1, sample: 5, active: true, partial_count: 2 }
        }
      }
    });
    await view.refresh();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();
    const chips = Array.from(
      root.querySelectorAll('.cmp-session__chips .cmp-chip')
    );

    expect(chips.map((chip) => chip.textContent?.trim())).toEqual([
      '재시도(환경)',
      'verify 실패',
      '시간 ×4.0',
      '비용 ×4.1'
    ]);
    expect(chips[2].getAttribute('title')).toBe('4분 · 중앙값 1분 × 3');
    expect(chips[3].getAttribute('title')).toContain(
      '부분 · 기준선 부분 집계 2건 포함'
    );
  });

  test('renders the server metrics and best markers on a group card', async () => {
    const { root, view } = mountComparison();

    await view.refresh();

    const card = /** @type {HTMLElement} */ (root.querySelector('.cmp-card'));
    expect(card.querySelector('.cmp-badge')?.textContent).toBe('프리셋');
    expect(
      card.querySelector('[data-metric="landing"]')?.textContent
    ).toContain('67%');
    expect(
      card.querySelector('[data-metric="problem"]')?.textContent
    ).toContain('50%');
    expect(
      card.querySelector('[data-metric="duration"]')?.textContent
    ).toContain('2분');
    expect(card.querySelector('[data-metric="cost"]')?.textContent).toContain(
      'n=3/4 · 부분 1'
    );
    expect(
      Array.from(card.querySelectorAll('.is-best')).map((tile) =>
        tile.getAttribute('data-metric')
      )
    ).toEqual(['landing', 'duration', 'cost']);
    expect(card.querySelectorAll('.cmp-best')).toHaveLength(3);
    expect(card.querySelector('.cmp-chip.is-zero')?.textContent).toContain(
      '리뷰 지적 0'
    );
    expect(root.querySelector('table')).toBeNull();
  });

  test('keeps a null landing rate unjudged and without a bar', async () => {
    const { root, view } = mountComparison({
      groups: [comparisonGroup({ landing_rate: null, best: [] })]
    });

    await view.refresh();

    expect(
      root.querySelector('.cmp-card [data-metric="landing"] .cmp-kpi__value')
        ?.textContent
    ).toBe('—');
    expect(
      root.querySelector('.cmp-card [data-metric="landing"] .cmp-bar')
    ).toBeNull();
    expect(root.querySelector('.cmp-card .is-best')).toBeNull();
  });

  test('renders all five summary tiles and the selected workspace heading', async () => {
    const { root, view } = mountComparison();

    await view.refresh();
    changeSelect(root, '저장소', '/repo');
    await settle();

    expect(root.querySelectorAll('.cmp-summary > .cmp-kpi')).toHaveLength(5);
    expect(
      root
        .querySelector('.cmp-head__summary')
        ?.textContent?.replace(/\s+/g, ' ')
    ).toContain('최근 30일 · 저장소 A · 세션 4건 · 이슈 3건');
    expect(
      root.querySelector('.cmp-summary [data-metric="sessions"]')?.textContent
    ).toContain('이슈 3 · 진행 중 1');
  });

  test('keeps expanded group keys across refresh and regrouping', async () => {
    const { root, view } = mountComparison();

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();
    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelectorAll('.cmp-group-by button')[1]
    ).click();
    await settle();

    expect(root.querySelector('.cmp-card')?.classList.contains('is-open')).toBe(
      true
    );
    expect(
      root.querySelector('.cmp-expand')?.getAttribute('aria-expanded')
    ).toBe('true');
    expect(root.querySelectorAll('.cmp-session')).toHaveLength(1);
  });

  test.each([
    ['landing', ['C', 'A', 'B', 'D']],
    ['problem', ['B', 'C', 'A', 'D']],
    ['duration', ['B', 'A', 'C', 'D']],
    ['cost', ['C', 'B', 'A', 'D']]
  ])('sorts by %s locally with missing values last', async (sort, expected) => {
    const groups = [
      comparisonGroup({
        key: 'A',
        landing_rate: 0.9,
        problem_rate: 0.8,
        duration_ms: { mean: 2 },
        cost_usd: { mean: 3 }
      }),
      comparisonGroup({
        key: 'B',
        landing_rate: 0.5,
        problem_rate: 0.1,
        duration_ms: { mean: 1 },
        cost_usd: { mean: 2 }
      }),
      comparisonGroup({
        key: 'C',
        landing_rate: 0.9,
        problem_rate: 0.3,
        duration_ms: { mean: 3 },
        cost_usd: { mean: 1 }
      }),
      comparisonGroup({
        key: 'D',
        landing_rate: null,
        problem_rate: null,
        duration_ms: { mean: null },
        cost_usd: { mean: null }
      })
    ];
    const { root, view, transport } = mountComparison({ groups });

    await view.refresh();
    changeSelect(root, '정렬', sort);

    expect(
      Array.from(root.querySelectorAll('.cmp-card')).map((card) =>
        card.getAttribute('data-group-key')
      )
    ).toEqual(expected);
    expect(transport).toHaveBeenCalledTimes(1);
  });

  test.each([
    [1, 'orchestration'],
    [2, 'impl_actor']
  ])('requests grouping axis %s as group_by', async (index, group_by) => {
    const { root, view, transport } = mountComparison();

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelectorAll('.cmp-group-by button')[index]
    ).click();
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({ group_by })
    );
    expect(transport.mock.calls[0]).toEqual([
      'get-compare',
      {
        range: '30d',
        root_dirs: [],
        routes: [],
        include_bench: false,
        group_by: 'preset'
      }
    ]);
    expect(root.querySelectorAll('.cmp-filters select')).toHaveLength(4);
  });

  test('opens the issue deep link from a session row', async () => {
    const { root, view, gotoIssue } = mountComparison();

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();
    const row = /** @type {HTMLAnchorElement} */ (
      root.querySelector('.cmp-session')
    );
    row.click();

    expect(row.getAttribute('href')).toBe('#/compare?issue=UI-one');
    expect(gotoIssue).toHaveBeenCalledWith('UI-one');
    expect(row.querySelector('.cmp-session__outcome')?.textContent).toBe(
      '착지 · PR #291 · verify 통과'
    );
    expect(row.querySelector('.cmp-dot--landed')).not.toBeNull();
  });

  test('renders problem evidence and adjusted pins as session chips', async () => {
    const { root, view } = mountComparison();

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    const chips = Array.from(
      root.querySelectorAll('.cmp-session__chips .cmp-chip')
    );
    expect(chips.map((chip) => chip.textContent)).toEqual([
      '재시도',
      '리뷰 r2',
      '개입',
      '핀 조정'
    ]);
    expect(chips.map((chip) => chip.getAttribute('title'))).toEqual([
      'original-1 · 재개',
      '라운드 2 · blocking 1 · minor 3',
      '승인 대기\n재개',
      'impl_effort'
    ]);
  });

  test('renders the blocking count when a review has no later round', async () => {
    const { root, view, snapshot } = mountComparison();
    snapshot.rows[0].problems.evidence.review.round = 1;

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    expect(root.querySelector('.cmp-session__chips')?.textContent).toContain(
      '리뷰 b1'
    );
  });

  test('omits the problem chip line for a session with no signals', async () => {
    const { root, view } = mountComparison({
      rows: [
        {
          attempt_id: 'session-1',
          bead_id: 'UI-one',
          outcome: { kind: 'unknown' }
        }
      ]
    });

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    expect(root.querySelector('.cmp-session__chips')).toBeNull();
  });

  test('writes the server composition on the session row', async () => {
    const { root, view } = mountComparison({
      rows: [
        {
          attempt_id: 'session-1',
          bead_id: 'UI-one',
          outcome: { kind: 'unknown' },
          composition: 'claude-opus-5/high → sol/high'
        }
      ]
    });

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    expect(
      root.querySelector('.cmp-session__composition')?.textContent
    ).toContain('claude-opus-5/high → sol/high');
  });

  test('omits the session composition line when the string is empty', async () => {
    const { root, view } = mountComparison({
      rows: [
        {
          attempt_id: 'session-1',
          bead_id: 'UI-one',
          outcome: { kind: 'unknown' },
          composition: ''
        }
      ]
    });

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    expect(root.querySelector('.cmp-session__composition')).toBeNull();
  });

  test('titles a mixed session composition with its per-unit executors', async () => {
    const { root, view } = mountComparison({
      rows: [
        {
          attempt_id: 'session-1',
          bead_id: 'UI-one',
          outcome: { kind: 'unknown' },
          composition: 'claude-opus-5/high → 혼합 2종',
          impl_actor: {
            kind: 'mixed',
            label: '혼합 2종',
            model: null,
            effort: null,
            parts: [
              { unit: 'u1', label: 'sol/high' },
              { unit: 'u2', label: 'main' }
            ]
          }
        }
      ]
    });

    await view.refresh();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('.cmp-expand')
    ).click();

    expect(
      root.querySelector('.cmp-session__composition')?.getAttribute('title')
    ).toBe('u1: sol/high\nu2: main');
  });

  test('joins sorted unique unmatched candidates after the composition', async () => {
    const { root, view } = mountComparison({
      groups: [
        comparisonGroup({
          badge: 'unmatched',
          attempt_ids: ['x', 'y'],
          compositions: [
            { composition: 'A → B', count: 3 },
            { composition: 'A → C', count: 1 }
          ]
        })
      ],
      rows: [
        { attempt_id: 'x', preset_candidates: ['Z', 'A'] },
        { attempt_id: 'y', preset_candidates: ['A'] }
      ]
    });

    await view.refresh();

    expect(root.querySelector('.cmp-badge')?.textContent).toBe('미대조');
    expect(root.querySelector('.cmp-composition')?.textContent?.trim()).toBe(
      'A → B 외 1 · 프리셋 미확정 — A·Z 중 판별 불가'
    );
    expect(root.querySelector('.cmp-composition')?.getAttribute('title')).toBe(
      'A → B 3건\nA → C 1건'
    );
  });

  test('names an unmatched group with no candidates', async () => {
    const { root, view } = mountComparison({
      groups: [comparisonGroup({ badge: 'unmatched' })]
    });

    await view.refresh();

    expect(root.querySelector('.cmp-composition')?.textContent).toContain(
      '일치하는 프리셋 없음'
    );
  });

  test('omits a badge for model groups', async () => {
    const { root, view } = mountComparison({
      groups: [comparisonGroup({ badge: 'none' })]
    });

    await view.refresh();

    expect(root.querySelector('.cmp-badge')).toBeNull();
  });

  test('places the known store warning immediately before the grid', async () => {
    const { root, view } = mountComparison({
      warnings: ['preset_store_unreadable', 'future_warning']
    });

    await view.refresh();

    expect(root.querySelectorAll('.cmp-warning')).toHaveLength(1);
    expect(root.querySelector('.cmp-warning')?.textContent?.trim()).toBe(
      '프리셋 저장소를 읽지 못해 프리셋 대조를 건너뛰었습니다'
    );
    expect(
      root.querySelector('.cmp-grid')?.previousElementSibling?.className
    ).toBe('cmp-warning');
  });

  test('ignores unknown warnings', async () => {
    const { root, view } = mountComparison({ warnings: ['future_warning'] });

    await view.refresh();

    expect(root.querySelector('.cmp-warning')).toBeNull();
  });

  test('keeps an empty experiment section collapsed below the cards', async () => {
    const { root, view } = mountComparison();

    await view.refresh();

    const bench = /** @type {HTMLDetailsElement} */ (
      root.querySelector('.cmp-bench')
    );
    expect(bench.open).toBe(false);
    expect(bench.querySelector('summary')?.textContent).toBe(
      '실험 (bench 클론 실행) · 0건'
    );
    expect(bench.querySelector('.cmp-bench__new')).not.toBeNull();
    expect(bench.previousElementSibling?.className).toBe('cmp-legend');
  });

  test('keeps the form and experiment list inside the details section', async () => {
    const { root, view } = mountView();

    await view.refresh();
    openForm(root);

    expect(root.querySelector('.cmp-bench .cmp-form')).not.toBeNull();
    expect(root.querySelector('.cmp-bench .cmp-runs')).not.toBeNull();
    expect(root.querySelector('.cmp-bench')?.hasAttribute('open')).toBe(false);
  });

  test('requests experiment inclusion from the collapsed section checkbox', async () => {
    const { root, view, transport } = mountComparison();

    await view.refresh();
    /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-bench input[type="checkbox"]')
    ).click();
    await settle();

    expect(transport).toHaveBeenLastCalledWith(
      'get-compare',
      expect.objectContaining({ include_bench: true })
    );
    expect(
      root.querySelector('.cmp-filters input[type="checkbox"]')
    ).toBeNull();
  });
});

describe('compare view experiment list', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  test('lists an experiment with its progress fraction', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();

    expect(root.querySelector('.cmp-run__progress')?.textContent?.trim()).toBe(
      '3/9'
    );
  });

  test('names the source issue by title when it is loaded', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();

    expect(root.querySelector('.cmp-run__title')?.textContent).toContain(
      '원본 이슈'
    );
  });

  test('writes pass^k next to the success rate of a repeated preset', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    const table = /** @type {HTMLElement} */ (
      root.querySelector('.cmp-table--bench')
    );
    expect(table.textContent).toContain('pass^2');
  });

  test('marks a partial benchmark cost median', async () => {
    const { root, view } = mountView({
      benchRows: [
        {
          attempt_id: 'a1',
          bead_id: 'UI-c1',
          status: 'done',
          verify: 'pass',
          usage: { tokens: 1000, total_cost_usd: 1, partial: true }
        },
        {
          attempt_id: 'a2',
          bead_id: 'UI-c2',
          status: 'done',
          verify: 'pass',
          usage: { tokens: 1000, total_cost_usd: 1 }
        }
      ]
    });

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    expect(root.querySelector('.cmp-table--bench')?.textContent).toContain(
      '부분 집계'
    );
  });

  test('marks the experiment table as delegate-forced', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    expect(root.querySelector('.cmp-run-detail__flag')?.textContent).toContain(
      '구현 위임 강제'
    );
  });

  test('reads the experiment list from the one compare request', async () => {
    const { view, calls } = mountView();

    view.load();
    await settle();

    expect(calls.map((call) => call.type)).toEqual(['get-compare']);
  });

  test('keeps the experiment rows when the main filter narrows', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    const table = /** @type {HTMLElement} */ (
      root.querySelector('.cmp-table--bench')
    );
    expect(table.textContent).toContain('pass^2');
  });

  test('shows a read failure with a retry button', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const failing = createCompareView(root, {
      transport: vi.fn(async () => {
        throw { code: 'compare_projection_failed', message: 'boom' };
      })
    });

    failing.load();
    await settle();

    expect(root.querySelector('.cmp-error')?.textContent).toContain(
      '비교 데이터'
    );
    failing.destroy();
  });
});

describe('compare view new-experiment form', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  test('offers an eligible quick_fix source', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const option = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    );
    expect(option.disabled).toBe(false);
  });

  test('refuses a non quick_fix source and shows the reason', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const option = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-spec"]')
    );
    expect(option.disabled).toBe(true);
    expect(option.textContent).toContain('quick_fix');
  });

  test('seeds the fixed reviewer from the previous experiment', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-reviewer-key="impl_review_model"]')
    );
    expect(input.value).toBe('sonnet');
  });

  test('falls back to the documented reviewer triple without experiments', async () => {
    const { root, view } = mountView({ runs: [] });

    view.load();
    await settle();
    openForm(root);

    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-reviewer-key="impl_review_effort"]')
    );
    expect(input.value).toBe('xhigh');
  });

  test('hides the fixed reviewer inputs in preset reviewer mode', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);
    const radio = /** @type {HTMLInputElement} */ (
      root.querySelector('input[name="cmp-reviewer-mode"][value="preset"]')
    );
    radio.checked = true;
    radio.dispatchEvent(new Event('change'));

    expect(
      root.querySelector('[data-reviewer-key="impl_review_model"]')
    ).toBeNull();
  });

  test('clamps a repeat count above the maximum', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-form__input--repeats')
    );
    input.value = '9';
    input.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('.cmp-form__input--repeats')
      ).value
    ).toBe('5');
  });

  test('keeps submit disabled until a source and a preset are chosen', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    expect(
      /** @type {HTMLButtonElement} */ (
        root.querySelector('.cmp-form__actions button[type="submit"]')
      ).disabled
    ).toBe(true);
  });

  test('sends the chosen inputs to bench-run-create', async () => {
    const { root, view, calls } = mountView();

    view.load();
    await settle();
    openForm(root);
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    ).click();
    const preset = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-preset-id="p1"]')
    );
    preset.checked = true;
    preset.dispatchEvent(new Event('change'));
    /** @type {HTMLFormElement} */ (
      root.querySelector('.cmp-form')
    ).dispatchEvent(new Event('submit'));
    await settle();

    const created = calls.find((call) => call.type === 'bench-run-create');
    expect(created?.payload).toMatchObject({
      source_id: 'UI-src',
      preset_ids: ['p1'],
      repeats: 1,
      reviewer_mode: 'fixed'
    });
  });

  test('reports an aborted creation with the closed clone ids', async () => {
    const { root, view } = mountView({
      onCreate: () => {
        throw {
          code: 'bench_run_create_failed',
          message: 'clone_create_failed',
          details: { aborted: ['UI-x1'] }
        };
      }
    });

    view.load();
    await settle();
    openForm(root);
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    ).click();
    const preset = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-preset-id="p1"]')
    );
    preset.checked = true;
    preset.dispatchEvent(new Event('change'));
    /** @type {HTMLFormElement} */ (
      root.querySelector('.cmp-form')
    ).dispatchEvent(new Event('submit'));
    await settle();

    expect(root.querySelector('.cmp-form .cmp-error')?.textContent).toContain(
      'UI-x1'
    );
  });
});
