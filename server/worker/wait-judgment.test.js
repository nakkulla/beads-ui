import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  WAIT_JUDGE_INTERVAL_SECONDS,
  createWaitJudge,
  createWaitObservationCollector
} from './attach.js';
import { WAIT_THRESHOLDS, judgeWaitReasons } from './wait-judgment.js';

const NOW = new Date(2026, 8, 15, 12, 0).getTime();
const ROOT = '/repo';
const MINUTE = 60_000;

/**
 * @param {Record<string, any>} [overrides]
 * @returns {Record<string, any>}
 */
function queue(overrides = {}) {
  return {
    attempts: {},
    admission: {},
    queue: [],
    serial_lanes: [],
    pr_wait: [],
    done: [],
    auto_advance: true,
    provider_hold: {},
    ...overrides
  };
}

/** @param {Record<string, any>} [overrides] */
function external(overrides = {}) {
  return {
    root_dir: ROOT,
    gate_id: 'UI-gate',
    consumer_id: 'UI-consumer',
    consumer_title: '계산',
    watch_id: 'watch',
    ssh_host: 'wallace',
    job_id: '246428',
    job_state: '계산 중',
    stage: 'active',
    gate_open: true,
    last_observed_at: NOW - MINUTE,
    next_observation_at: NOW + MINUTE,
    ...overrides
  };
}

/** @param {Record<string, any>} [overrides] */
function waiting(overrides = {}) {
  return {
    attempt_id: 'a',
    bead_id: 'UI-consumer',
    status: 'waiting',
    finished_at: NOW - 60 * MINUTE,
    cause: 'prerequisite_unmet',
    cause_detail: { blockers: [{ id: 'UI-blocker', status: 'open' }] },
    ...overrides
  };
}

/** @param {Record<string, any>} [overrides] */
function run(overrides = {}) {
  return judgeWaitReasons({
    root_dir: ROOT,
    queue: queue(),
    now: NOW,
    ...overrides
  });
}

/** @param {Record<string, any>} [target] */
function provider(target = {}) {
  return queue({
    attempts: { a: waiting({ status: 'provider_hold' }) },
    provider_hold: {
      codex: {
        since: NOW - MINUTE,
        targets: [
          {
            kind: 'usage_limit',
            account: 'abcdefghijk',
            rearm_count: 0,
            model: 'astra',
            attempt_ids: ['a'],
            resets_at: NOW + MINUTE,
            ...target
          }
        ]
      }
    }
  });
}

describe('wait judgment external work', () => {
  test('builds the external headline and release from observed facts', () => {
    const result = run({
      external_waits: [external({ interval_seconds: 900 })]
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'external_job',
      headline: '계산가 wallace 작업 246428 종료를 기다림 · 계산 중',
      release: '15분마다 자동 확인 · 종료 확인되면 대기 자동 해제',
      verdict: 'normal',
      targets: [{ id: 'UI-gate', kind: 'gate' }]
    });
  });

  test.each([
    ['discord', true],
    ['none', false],
    [undefined, false],
    ['email', false]
  ])(
    'limits the Discord fragment to supported notify value %s',
    (value, visible) => {
      const row = external(
        value === undefined ? {} : { notify: { on_complete: value } }
      );

      const result = run({ external_waits: [row] }).wait_reasons[0];

      expect(result.release.includes('완료 시 Discord 알림')).toBe(visible);
    }
  );

  test.each([
    ['check_overdue', 15 * MINUTE - 1, 'normal'],
    ['check_overdue', 15 * MINUTE, 'overdue'],
    ['settle_overdue', 30 * MINUTE - 1, 'normal'],
    ['settle_overdue', 30 * MINUTE, 'overdue']
  ])('checks %s at age %i', (code, age, verdict) => {
    const row =
      code === 'check_overdue'
        ? external({ next_observation_at: NOW - Number(age) })
        : external({
            stage: 'terminal_recorded',
            last_observed_at: NOW - Number(age)
          });

    const result = run({ external_waits: [row] }).wait_reasons[0];

    expect(result).toMatchObject({
      verdict,
      ...(verdict === 'overdue' ? { verdict_reason: { code } } : {})
    });
  });

  test('uses the watch interval for the settlement threshold', () => {
    const row = external({
      stage: 'gate_noted',
      interval_seconds: 300,
      last_observed_at: NOW - 10 * MINUTE
    });

    const result = run({ external_waits: [row] }).wait_reasons[0];

    expect(result.verdict_reason?.code).toBe('settle_overdue');
  });

  test.each([
    [{ recovery_needed: true }, 'job_failed'],
    [{ error_count: 3 }, 'observe_failing'],
    [{ stage: 'stopped' }, 'monitor_stopped'],
    [{ monitor_reason: '자동 확인 서비스가 등록되지 않음' }, 'service_down'],
    [
      { monitor_reason: '자동 확인 서비스 명령이 설치본과 다름' },
      'service_down'
    ]
  ])('prioritizes the confirmed action reason %j', (fields, code) => {
    const row = external({ next_observation_at: NOW - 30 * MINUTE, ...fields });

    const result = run({ external_waits: [row] }).wait_reasons[0];

    expect(result).toMatchObject({
      verdict: 'action_required',
      verdict_reason: { code, message: expect.any(String) }
    });
  });

  test('keeps two observation errors below the action threshold', () => {
    const result = run({ external_waits: [external({ error_count: 2 })] });

    expect(result.wait_reasons[0].verdict).toBe('normal');
  });

  test('emits only one reason per gate', () => {
    const result = run({ external_waits: [external(), external()] });

    expect(result.wait_reasons).toHaveLength(1);
  });

  test.each([
    { stage: 'complete', gate_open: false },
    { root_dir: '/other' },
    { consumer_id: null }
  ])('omits a gate without an active local wait %j', (fields) => {
    const result = run({ external_waits: [external(fields)] });

    expect(result.wait_reasons).toEqual([]);
  });
});

describe('wait judgment prerequisites', () => {
  const serial = queue({
    serial_lanes: [
      {
        id: 's1',
        entries: [{ bead_id: 'UI-head' }, { bead_id: 'UI-consumer' }]
      }
    ]
  });

  test('finds a blocker on the second serial entry without attempt or admission', () => {
    const result = run({
      queue: serial,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] },
      blocker_facts: { 'UI-blocker': { title: '선행 작업', status: 'open' } }
    });

    expect(result.wait_reasons).toMatchObject([
      {
        kind: 'prerequisite',
        subject: { bead_id: 'UI-consumer' },
        headline: 'UI-blocker "선행 작업" 완료를 기다림 (open)',
        release: '선행이 닫히면 bd ready 재스캔으로 자동 복귀'
      }
    ]);
  });

  test.each([{}, { 'UI-consumer': [] }])(
    'does not invent prerequisites from %j',
    (bead_blocked_by) => {
      const result = run({ queue: serial, bead_blocked_by });

      expect(result.wait_reasons).toEqual([]);
    }
  );

  test('unions attempt and admission blockers without counting duplicate ids', () => {
    const material = queue({
      ...serial,
      attempts: { a: waiting() },
      admission: {
        'UI-consumer': {
          reason: 'prerequisite_unmet',
          blockers: ['UI-blocker', 'UI-second']
        }
      }
    });

    const result = run({
      queue: material,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker', 'UI-second'] }
    });

    expect(result.wait_reasons[0].targets.map((item) => item.id)).toEqual([
      'UI-blocker',
      'UI-second'
    ]);
  });

  test.each(['pr_wait', 'done', 'running'])('excludes %s subjects', (lane) => {
    const material =
      lane === 'running'
        ? queue({ ...serial, attempts: { a: waiting({ status: 'running' }) } })
        : queue({ ...serial, [lane]: [{ bead_id: 'UI-consumer' }] });

    const result = run({
      queue: material,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] }
    });

    expect(result.wait_reasons).toEqual([]);
  });

  test.each([
    { status: 'blocked' },
    { status: 'deferred' },
    { status: 'open', labels: ['worker-ineligible'] }
  ])('requires action for an open blocker with facts %j', (blocker) => {
    const result = run({
      queue: serial,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] },
      blocker_facts: { 'UI-blocker': blocker }
    });

    expect(result.wait_reasons[0]).toMatchObject({
      verdict: 'action_required',
      verdict_reason: { code: 'blocker_needs_human' }
    });
  });

  test('keeps an unknown foreign blocker unjudged despite a frozen blocked status', () => {
    const attempt = waiting({
      cause_detail: {
        blockers: [{ id: 'OTHER-a', rig: 'OTHER', status: 'blocked' }]
      }
    });

    const result = run({ queue: queue({ attempts: { a: attempt } }) })
      .wait_reasons[0];

    expect(result).toMatchObject({
      kind: 'prerequisite_foreign',
      verdict: 'normal',
      headline: 'OTHER/OTHER-a 완료를 기다림',
      release: '다른 저장소 선행이 닫히면 자동 복귀'
    });
  });

  test('uses a foreign readback for an action verdict', () => {
    const result = run({
      queue: serial,
      bead_blocked_by: { 'UI-consumer': ['OTHER-a'] },
      foreign_readback: { 'OTHER-a': { rig: 'OTHER', status: 'deferred' } }
    });

    expect(result.wait_reasons[0].verdict_reason?.code).toBe(
      'blocker_needs_human'
    );
  });

  test.each([
    [
      'missing key',
      {},
      { return_observed_at: { 'UI-consumer:a': NOW - 60 * MINUTE } }
    ],
    [
      'missing clock',
      { 'UI-consumer': [] },
      { return_observed_at: { 'UI-consumer:a': null } }
    ],
    ['restart', { 'UI-consumer': [] }, {}]
  ])(
    'does not claim return overdue with %s',
    (_name, bead_blocked_by, observed_at) => {
      const result = run({
        queue: queue({ attempts: { a: waiting() } }),
        bead_blocked_by,
        observed_at
      });

      expect(result.wait_reasons[0].verdict).toBe('normal');
    }
  );

  test.each([
    [10 * MINUTE - 1, 'normal'],
    [10 * MINUTE, 'overdue']
  ])('checks return at elapsed %i', (age, verdict) => {
    const result = run({
      queue: queue({ attempts: { a: waiting() } }),
      bead_blocked_by: { 'UI-consumer': [] },
      observed_at: {
        return_observed_at: { 'UI-consumer:a': NOW - Number(age) }
      }
    });

    expect(result.wait_reasons[0]).toMatchObject({
      verdict,
      ...(verdict === 'overdue'
        ? { verdict_reason: { code: 'return_overdue' } }
        : {})
    });
  });

  test('starts the return clock at the first proven empty list', () => {
    const result = run({
      queue: queue({ attempts: { a: waiting() } }),
      bead_blocked_by: { 'UI-consumer': [] }
    });

    expect(result.observed_at.return_observed_at).toEqual({
      'UI-consumer:a': NOW
    });
  });

  test('drops the return clock when prerequisites become unknown', () => {
    const result = run({
      queue: queue({ attempts: { a: waiting() } }),
      observed_at: { return_observed_at: { 'UI-consumer:a': NOW - MINUTE } }
    });

    expect(result.observed_at.return_observed_at).toEqual({});
  });

  test('keeps base movement separate even when a frozen blockers list exists', () => {
    const result = run({
      queue: queue({
        attempts: {
          a: waiting({ cause: 'base_moved', head_oid: '1234567890' })
        }
      })
    });

    expect(result.wait_reasons).toMatchObject([
      {
        kind: 'base_moved',
        verdict: 'normal',
        headline:
          '기준 이동 대기 · 보존 후보 1234567가 새 base 위에서 재검증을 기다림',
        release: '↻ 이어하기로 보존 세션 재개'
      }
    ]);
  });

  test('ignores an older waiting attempt after a newer run starts', () => {
    const result = run({
      queue: queue({
        attempts: {
          a: waiting({ started_at: 1 }),
          b: waiting({ attempt_id: 'b', status: 'running', started_at: 2 })
        }
      })
    });

    expect(result.wait_reasons).toEqual([]);
  });
});

describe('wait judgment holds and manual waits', () => {
  test.each([
    [new Date(2026, 8, 15, 23, 59, 59, 999).getTime(), '23:59'],
    [new Date(2026, 8, 16, 0, 0, 0, 0).getTime(), '00:00']
  ])('formats a reset at the local midnight boundary %i as %s', (at, clock) => {
    const result = run({ queue: provider({ resets_at: at }) }).wait_reasons[0];

    expect(result).toMatchObject({
      release: `리셋 ${clock} 뒤 자동 프로브 (자동 재개 3회)`,
      resets_at: at,
      since: NOW - MINUTE
    });
  });

  test('formats an env retry locally while retaining its epoch clock', () => {
    const next_at = new Date(2026, 8, 15, 14, 5).getTime();

    const result = run({
      queue: queue({
        hold: { kind: 'env', bead_ids: ['UI-consumer'], since: NOW },
        lineages: [{ bead_id: 'UI-consumer', next_at }]
      })
    }).wait_reasons[0];

    expect(result).toMatchObject({
      release: '14:05에 자동 재시도 · 성공하면 자동 해제 (지금 재시도 가능)',
      next_check_at: next_at,
      since: NOW
    });
  });

  test.each([
    [5 * MINUTE - 1, 'normal'],
    [5 * MINUTE, 'overdue']
  ])('checks the reset grace boundary %i', (age, verdict) => {
    const result = run({ queue: provider({ resets_at: NOW - Number(age) }) })
      .wait_reasons[0];

    expect(result).toMatchObject({
      verdict,
      ...(verdict === 'overdue'
        ? { verdict_reason: { code: 'reset_passed' } }
        : {})
    });
  });

  test.each([
    [1, 'normal'],
    [0, 'action_required']
  ])(
    'waits until the reset before requiring a probe %i',
    (remaining, verdict) => {
      const result = run({
        queue: provider({
          resets_at: NOW + Number(remaining),
          last_error: 'auto_resume_disarmed:rearm_cap'
        })
      }).wait_reasons[0];

      expect(result.verdict).toBe(verdict);
    }
  );

  test.each([
    [6 * 60 * MINUTE - 1, 'normal'],
    [6 * 60 * MINUTE, 'normal'],
    [6 * 60 * MINUTE + 1, 'action_required']
  ])('checks the unknown-reset boundary %i', (age, verdict) => {
    const material = provider({
      resets_at: null,
      last_error: 'auto_resume_disarmed:hold_age_cap'
    });
    material.provider_hold.codex.since = NOW - Number(age);

    const result = run({ queue: material }).wait_reasons[0];

    expect(result.verdict).toBe(verdict);
  });

  test('uses catalog identity and plan in a usage limit headline', () => {
    const result = run({
      queue: provider(),
      account_catalog: {
        abcdefghijk: { alias: '계정', plan: 'business', window: '5h' }
      }
    });

    expect(result.wait_reasons[0].headline).toBe(
      'codex 계정(business) 5h 한도 초과'
    );
  });

  test('falls back to the account key prefix without a catalog', () => {
    const result = run({ queue: provider() });

    expect(result.wait_reasons[0].headline).toBe('codex abcdefgh 한도 초과');
  });

  test('shows exhausted automatic resumes without changing the reset verdict', () => {
    const result = run({ queue: provider({ rearm_count: 3 }) }).wait_reasons[0];

    expect(result).toMatchObject({
      release: '자동 재개 꺼짐 · ↻ 지금 프로브 필요',
      verdict: 'normal'
    });
  });

  test.each([
    [5 * MINUTE - 1, 'normal'],
    [5 * MINUTE, 'overdue']
  ])(
    'checks outage probe grace %i without creating action-required',
    (age, verdict) => {
      const result = run({
        queue: provider({
          kind: 'outage',
          detail: '접속 실패',
          next_probe_at: NOW - Number(age),
          resets_at: NOW - 60 * MINUTE,
          last_error: 'auto_resume_disarmed:rearm_cap'
        })
      }).wait_reasons[0];

      expect(result).toMatchObject({
        verdict,
        ...(verdict === 'overdue'
          ? { verdict_reason: { code: 'probe_stalled' } }
          : {})
      });
    }
  );

  test('omits reset and resume-count language from outage holds', () => {
    const result = run({
      queue: provider({
        kind: 'outage',
        detail: '접속 실패',
        next_probe_at: NOW
      })
    }).wait_reasons[0];

    expect(result).toMatchObject({
      headline: 'codex 공급자 장애 · 접속 실패',
      release: '12:00에 자동 프로브 (상한 없음, ADR UI-o5ll)',
      next_check_at: NOW
    });
    expect(result).not.toHaveProperty('resets_at');
  });

  test('requires approval for a systemic hold', () => {
    const result = run({
      queue: queue({
        hold: {
          kind: 'systemic',
          cause: 'verify_failed',
          bead_ids: ['UI-consumer']
        }
      })
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'queue_hold',
      verdict: 'action_required',
      verdict_reason: { code: 'hold' },
      release: '▶ 재개로 해제 (사람 승인)'
    });
  });

  test.each([
    [5 * MINUTE - 1, 'normal'],
    [5 * MINUTE, 'overdue']
  ])('checks env retry grace %i', (age, verdict) => {
    const result = run({
      queue: queue({
        hold: { kind: 'env', cause: 'network', bead_ids: ['UI-consumer'] },
        lineages: [{ bead_id: 'UI-consumer', next_at: NOW - Number(age) }]
      })
    }).wait_reasons[0];

    expect(result).toMatchObject({
      verdict,
      next_check_at: NOW - Number(age),
      ...(verdict === 'overdue'
        ? { verdict_reason: { code: 'retry_stalled' } }
        : {})
    });
  });

  test('counts pending entries for manual start without marking action-required', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        queue: [{ bead_id: 'UI-a' }, { bead_id: 'UI-b' }]
      })
    });

    expect(result.wait_reasons).toMatchObject([
      {
        kind: 'auto_advance_off',
        headline: '자동 진행 꺼짐 · 대기 2건 출발 안 함',
        verdict: 'normal'
      },
      {
        kind: 'auto_advance_off',
        headline: '자동 진행 꺼짐 · 대기 2건 출발 안 함',
        verdict: 'normal'
      }
    ]);
  });

  test('omits manual-start reasons while an attempt runs', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        queue: [{ bead_id: 'UI-b' }],
        attempts: { a: waiting({ status: 'running' }) }
      })
    });

    expect(result.wait_reasons).toEqual([]);
  });

  test('builds the user-decision reason from a parked attempt', () => {
    const result = run({
      queue: queue({
        attempts: {
          a: waiting({
            status: 'parked',
            cause_detail: { awaiting_user: '방향 선택' }
          })
        }
      })
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'awaiting_user',
      headline: '사용자 결정 대기 · 방향 선택',
      release: '문의 세션에서 답하면 해제',
      verdict_reason: { code: 'decision' }
    });
  });

  test('builds retry timing without guessing an abnormal verdict', () => {
    const result = run({
      queue: queue({
        attempts: {
          a: waiting({
            status: 'retry_wait',
            retry: { cause: 'network', next_at: NOW }
          })
        }
      })
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'retry_wait',
      headline: 'network 재시도 대기',
      release: '12:00에 자동 재시도',
      verdict: 'normal',
      next_check_at: NOW
    });
  });

  test('builds the stale-work disposition reason', () => {
    const result = run({
      queue: queue({
        queue: [{ bead_id: 'UI-consumer' }],
        admission: {
          'UI-consumer': {
            reason: 'worktree_stale_work',
            stale_work: { action_id: 'choose' }
          }
        }
      })
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'stale_work',
      headline: '보존 작업 처분 대기',
      release: '이어하기 / 새로 시작 선택',
      verdict_reason: { code: 'disposition' }
    });
  });

  test('leaves all input material unchanged', () => {
    const input = {
      queue: queue({ attempts: { a: waiting() } }),
      bead_blocked_by: { 'UI-consumer': [] },
      observed_at: { return_observed_at: {} },
      external_waits: [external({ stage: 'terminal_recorded' })]
    };
    const before = structuredClone(input);

    run(input);

    expect(input).toEqual(before);
  });
});

describe('wait-judge runtime', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  /** @param {Record<string, any>} [overrides] */
  function runtime(overrides = {}) {
    const material = queue();
    const collect = vi.fn(async () => []);
    const onChanged = vi.fn();
    /** @type {(workspace: string) => void} */
    let listener = () => {};
    const instance = createWaitJudge({
      workspace: ROOT,
      repo: ROOT,
      store: /** @type {any} */ ({
        snapshot: () => material,
        claimWaitNotifications: () => [],
        recordTimelineEvent: vi.fn()
      }),
      notifier: /** @type {any} */ ({}),
      now: () => NOW,
      collector: {
        collect,
        get: () => ({ rows: [], collected_at: NOW, stale: false }),
        clear: () => {}
      },
      requestSnapshot: /** @type {any} */ (
        async () => ({ ok: true, snapshot: {} })
      ),
      readFacts: async () => ({}),
      onChanged,
      subscribe: (callback) => {
        listener = callback;
        return () => {};
      },
      ...overrides
    });
    return {
      instance,
      collect,
      material,
      onChanged,
      emit: () => listener(ROOT)
    };
  }

  test('collects at startup and every five minutes without viewers', async () => {
    vi.useFakeTimers();
    const harness = runtime();

    harness.instance.start();
    await harness.instance.refresh();
    await vi.advanceTimersByTimeAsync(WAIT_JUDGE_INTERVAL_SECONDS * 1000);
    harness.instance.stop();

    expect(harness.collect).toHaveBeenCalledTimes(2);
  });

  test.each(['provider_hold', 'hold', 'auto_advance'])(
    'refreshes immediately after %s changes',
    async (field) => {
      const harness = runtime();
      harness.instance.start();
      await harness.instance.refresh();

      harness.material[field] =
        field === 'auto_advance' ? false : { since: NOW };
      harness.emit();
      await harness.instance.refresh();
      harness.instance.stop();

      expect(harness.collect).toHaveBeenCalledTimes(2);
    }
  );

  test('joins a concurrent manual refresh to the active collection', async () => {
    const harness = runtime();

    const first = harness.instance.refresh();
    const second = harness.instance.refresh();
    await first;

    expect(second).toBe(first);
    expect(harness.collect).toHaveBeenCalledTimes(1);
  });

  test('does not recursively collect after its own fanout', async () => {
    const harness = runtime();
    harness.instance.start();
    await harness.instance.refresh();

    harness.emit();
    harness.instance.stop();

    expect(harness.collect).toHaveBeenCalledTimes(1);
  });

  test('caches the external rows and judgment together before fanout', async () => {
    const harness = runtime({
      collector: {
        collect: async () => [],
        clear: () => {},
        get: () => ({ rows: [external()], collected_at: NOW, stale: false })
      }
    });

    await harness.instance.refresh();

    expect(harness.instance.get()).toMatchObject({
      external_waits: [{ gate_id: 'UI-gate' }],
      wait_reasons: [{ kind: 'external_job' }]
    });
    expect(harness.onChanged).toHaveBeenCalledWith(ROOT);
  });

  test('fixes the default settlement threshold at thirty minutes', () => {
    expect(WAIT_THRESHOLDS.interval_ms * WAIT_THRESHOLDS.settle_cycles).toBe(
      30 * MINUTE
    );
  });

  test('retains watch judgment fields through the existing collector read', async () => {
    const watch_id = 'a'.repeat(24);
    const gate = {
      id: 'UI-gate',
      issue_type: 'gate',
      status: 'open',
      await_id: watch_id,
      await_type: 'human'
    };
    const consumer = {
      id: 'UI-consumer',
      title: '계산',
      status: 'in_progress'
    };
    const readFile = vi.fn(async () =>
      JSON.stringify({
        schema: 'external-job-monitor-v1',
        watch_id,
        repo: ROOT,
        gate_id: gate.id,
        consumer: consumer.id,
        job_id: '42',
        stage: 'active',
        observation_state: 'RUNNING',
        last_observed_at: NOW,
        next_observation_at: NOW + MINUTE,
        interval_seconds: 300,
        ssh_host: 'wallace',
        error_count: 3,
        notify: { on_complete: 'discord' }
      })
    );
    const collector = createWaitObservationCollector({
      state_root: '/state',
      now: () => NOW,
      fs: { readdir: async () => [`${watch_id}.json`], readFile },
      run: async (file) => ({
        stdout:
          file === 'git'
            ? '/repo/.git'
            : JSON.stringify({
                ok: true,
                schema: 'external-job-monitor-service-v1',
                loaded: true,
                command_matches: true,
                loaded_matches_plist: true,
                executable_exists: true
              })
      })
    });

    await collector.collect([
      {
        root_dir: ROOT,
        name: 'repo',
        snapshot: {
          all: [gate, consumer],
          id_index: new Map(
            /** @type {Array<[string, any]>} */ ([
              [gate.id, gate],
              [consumer.id, consumer]
            ])
          ),
          blocks_in: new Map([[gate.id, [consumer.id]]])
        }
      }
    ]);
    const result = run({ external_waits: collector.get().rows })
      .wait_reasons[0];

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      verdict_reason: { code: 'observe_failing' },
      release:
        '5분마다 자동 확인 · 종료 확인되면 대기 자동 해제 · 완료 시 Discord 알림'
    });
  });

  test('forgets return clocks after stopping the workspace runtime', async () => {
    vi.useFakeTimers();
    let now = NOW;
    const harness = runtime({
      now: () => now,
      readFacts: async () => ({ bead_blocked_by: { 'UI-consumer': [] } })
    });
    harness.material.attempts.a = waiting();
    await harness.instance.refresh();
    now += 10 * MINUTE;
    await harness.instance.refresh();
    expect(harness.instance.get().wait_reasons[0].verdict).toBe('overdue');

    harness.instance.stop();
    await harness.instance.refresh();

    expect(harness.instance.get().wait_reasons[0].verdict).toBe('normal');
  });
});
