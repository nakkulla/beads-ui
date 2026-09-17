import { afterEach, describe, expect, test, vi } from 'vitest';
import { isExternalWaitObservation } from '../../app/protocol.js';
import {
  WAIT_JUDGE_INTERVAL_SECONDS,
  createWaitJudge,
  createWaitObservationCollector
} from './attach.js';
import {
  WAIT_THRESHOLDS,
  externalJobHeadline,
  judgeWaitReasons
} from './wait-judgment.js';

const NOW = new Date(2026, 8, 15, 12, 0).getTime();
const ROOT = '/repo';
const MINUTE = 60_000;

describe('operation recovery wait reasons', () => {
  /** @param {Record<string, any>} [patch] */
  function operation(patch = {}) {
    return {
      state: 'failed',
      subjects: [{ bead_id: 'UI-consumer' }],
      finished_at: NOW - MINUTE,
      failure: { code: 'script_failed' },
      recovery: {
        disposition: 'repair',
        reason: null,
        handoff: { handoff_bead_id: 'UI-repair', recorded_at: NOW - 30_000 }
      },
      ...patch
    };
  }

  test('shows the repair reference for a subject waiting on cleanup', () => {
    const result = run({
      queue: queue({
        repo_operations: { op: operation() },
        pr_wait: [{ bead_id: 'UI-consumer' }]
      })
    });

    expect(result.wait_reasons).toContainEqual(
      expect.objectContaining({
        kind: 'recovery',
        headline: '수정 작업 대기 · UI-repair · 원인 script_failed',
        release: '수정 Bead의 PR·배포 뒤 [정리 재시도]',
        targets: [{ id: 'UI-repair', kind: 'issue' }],
        since: NOW - 30_000,
        verdict: 'normal'
      })
    );
  });

  test.each(['unclassified', 'reconcile'])(
    'requests confirmation for operation recovery %s',
    (reason) => {
      const result = run({
        queue: queue({
          repo_operations: {
            op: operation({
              recovery: {
                disposition: reason === 'reconcile' ? 'reconcile' : 'wait',
                reason,
                handoff: null
              }
            })
          }
        })
      });

      expect(result.wait_reasons).toContainEqual(
        expect.objectContaining({
          kind: 'recovery',
          verdict: 'action_required',
          verdict_reason: expect.objectContaining({ code: 'recovery_confirm' })
        })
      );
    }
  );

  test('leaves verification waiting at normal verdict', () => {
    const result = run({
      queue: queue({
        repo_operations: {
          op: operation({
            recovery: {
              disposition: 'wait',
              reason: 'verification',
              handoff: null
            }
          })
        }
      })
    });

    expect(result.wait_reasons).toContainEqual(
      expect.objectContaining({ kind: 'recovery', verdict: 'normal' })
    );
  });

  test.each([
    { cause_detail: { recovery: { reason: 'unclassified' } } },
    { cause: 'base_moved', cause_detail: { candidate_sha: 'a'.repeat(40) } },
    {
      cause: 'prerequisite_unmet',
      cause_detail: { blockers: [{ id: 'UI-blocker', status: 'open' }] }
    }
  ])(
    'keeps the existing attempt reason ahead of operation recovery %j',
    (patch) => {
      const result = run({
        queue: queue({
          attempts: { a: waiting(patch) },
          repo_operations: { op: operation() }
        })
      });

      expect(
        result.wait_reasons.filter(
          (row) => row.subject.bead_id === 'UI-consumer'
        )
      ).toHaveLength(1);
      expect(
        result.wait_reasons.some((row) =>
          row.headline.startsWith('수정 작업 대기')
        )
      ).toBe(false);
    }
  );

  test('shows one recovery row when multiple failed operations share a subject', () => {
    const result = run({
      queue: queue({
        repo_operations: { first: operation(), second: operation() }
      })
    });

    expect(
      result.wait_reasons.filter((row) => row.kind === 'recovery')
    ).toHaveLength(1);
  });

  test('omits a closed original Bead', () => {
    const result = run({
      queue: queue({ repo_operations: { op: operation() } }),
      blocker_facts: { 'UI-consumer': { status: 'closed' } }
    });

    expect(result.wait_reasons).toEqual([]);
  });

  test.each([
    { state: 'running' },
    { recovery: undefined },
    { dismissed: { at: 1 } },
    { superseded_by: 'new-op' }
  ])('omits inactive recovery evidence %j', (patch) => {
    expect(
      run({ queue: queue({ repo_operations: { op: operation(patch) } }) })
        .wait_reasons
    ).toEqual([]);
  });
});

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

describe('recovery wait judgment', () => {
  /**
   * @param {string} reason
   * @param {Record<string, any>} [patch]
   * @returns {Record<string, any>}
   */
  function recoveryAttempt(reason, patch = {}) {
    return waiting({
      started_at: NOW - MINUTE,
      finished_at: NOW,
      cause: 'session_ended_unresolved',
      session_id: 'saved-session',
      cause_detail: {
        recovery: {
          classification: 'condition',
          disposition: 'wait',
          reason,
          policy_schema: 1
        }
      },
      ...patch
    });
  }

  test.each(['provider', 'credential', 'prerequisite', 'verification'])(
    'promotes %s only at the settle threshold',
    (token) => {
      const material = queue({ attempts: { a: recoveryAttempt(token) } });
      const threshold =
        WAIT_THRESHOLDS.interval_ms * WAIT_THRESHOLDS.settle_cycles;

      const before = run({ queue: material, now: NOW + threshold - 1 })
        .wait_reasons[0];
      const after = run({ queue: material, now: NOW + threshold })
        .wait_reasons[0];

      expect(before).toMatchObject({
        kind: 'recovery',
        verdict: 'normal',
        since: NOW,
        notify_plan: { on_complete: 'none', on_overdue: 'discord' }
      });
      expect(after).toMatchObject({
        verdict: 'overdue',
        verdict_reason: { code: 'settle_overdue' }
      });
    }
  );

  test.each(['unclassified', 'reconcile', 'authority', 'no_progress'])(
    'requests a decision for %s immediately',
    (token) => {
      const result = run({
        queue: queue({ attempts: { a: recoveryAttempt(token) } })
      });

      expect(result.wait_reasons).toMatchObject([
        {
          kind: 'recovery',
          verdict: 'action_required',
          verdict_reason: {
            code: 'recovery_confirm',
            message: '보존된 작업의 원인 확인 또는 이어하기·폐기 결정이 필요함'
          }
        }
      ]);
    }
  );

  test('omits the internal recovery cause from the headline', () => {
    const attempt = recoveryAttempt('verification', {
      cause: 'session_recovery_wait'
    });
    attempt.cause_detail.recovery.no_progress = { count: 2, key: 'same-error' };

    const result = run({
      queue: queue({ attempts: { a: attempt } })
    }).wait_reasons[0];

    expect(result.headline).toBe(
      '조건 대기 · 검증 오류의 정정을 기다리며, 원인이 고쳐지면 이어갈 수 있습니다. · 무진전 2회'
    );
  });

  test('carries the original cause and no-progress evidence into one reason', () => {
    const attempt = recoveryAttempt('no_progress');
    attempt.cause_detail.recovery.no_progress = { count: 2, key: 'same-error' };

    const result = run({
      queue: queue({ attempts: { a: attempt } })
    }).wait_reasons;

    expect(result).toHaveLength(1);
    expect(result[0].headline).toContain('조건 대기 · 같은 오류에 진전이 없어');
    expect(result[0].headline).toContain(
      ' · 원인 session_ended_unresolved · 무진전 2회'
    );
    expect(result[0].actions).toEqual([
      {
        op: 'resume',
        label: '↻ 이어하기',
        payload: { root_dir: ROOT, bead_id: 'UI-consumer', attempt_id: 'a' }
      }
    ]);
  });

  test.each(['', null, undefined])(
    'withholds resume when the session is %s',
    (session_id) => {
      const result = run({
        queue: queue({
          attempts: { a: recoveryAttempt('credential', { session_id }) }
        })
      });

      expect(result.wait_reasons[0].actions).toEqual([]);
    }
  );

  test.each(['future_reason', 'constructor'])(
    'keeps unknown reason %s raw',
    (token) => {
      const result = run({
        queue: queue({ attempts: { a: recoveryAttempt(token) } })
      }).wait_reasons[0];

      expect(result.headline).toBe(`${token} · 원인 session_ended_unresolved`);
      expect(result.release).toBe('');
    }
  );

  test('does not infer elapsed time from an absent finish clock', () => {
    const result = run({
      queue: queue({
        attempts: { a: recoveryAttempt('provider', { finished_at: undefined }) }
      }),
      now: NOW + 100 * MINUTE
    }).wait_reasons[0];

    expect(result.verdict).toBe('normal');
    expect(result.since).toBeUndefined();
  });

  test.each([NOW - 2 * MINUTE, NOW + MINUTE])(
    'suppresses recovery while a writer is live at %s',
    (started_at) => {
      const result = run({
        queue: queue({
          attempts: {
            live: {
              attempt_id: 'live',
              bead_id: 'UI-consumer',
              status: 'running',
              started_at
            },
            a: recoveryAttempt('unclassified')
          }
        })
      });

      expect(result.wait_reasons).toEqual([]);
    }
  );

  test.each(['done', 'pr_wait'])(
    'omits recovery subjects already in %s',
    (lane) => {
      const result = run({
        queue: queue({
          [lane]: [{ bead_id: 'UI-consumer' }],
          attempts: { a: recoveryAttempt('unclassified') }
        })
      });

      expect(result.wait_reasons).toEqual([]);
    }
  );
});

describe('wait judgment external work', () => {
  test('builds the external headline and release from observed facts', () => {
    const result = run({
      external_waits: [external({ interval_seconds: 900 })]
    });

    expect(result.wait_reasons[0]).toMatchObject({
      kind: 'external_job',
      headline: 'wallace 작업 246428 · 계산 중',
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

  test('overwrites the external wait start once settlement begins', () => {
    const terminal_recorded_at = NOW - 5 * MINUTE;
    const row = external({ stage: 'terminal_recorded', terminal_recorded_at });

    const result = run({ external_waits: [row] }).wait_reasons[0];

    expect(result.since).toBe(terminal_recorded_at);
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
    [{ service_down: true }, 'service_down']
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
    { consumer_id: null },
    { watch_id: null },
    { watch_id: undefined }
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
        headline: '',
        release: '선행이 닫히면 bd ready 재스캔으로 자동 복귀'
      }
    ]);
  });

  test('reads blocked_by past an admission record about something else', () => {
    const result = run({
      queue: queue({
        ...serial,
        admission: {
          'UI-consumer': { reason: 'spec_review_stale', stale: true }
        }
      }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] },
      blocker_facts: { 'UI-blocker': { status: 'open' } }
    });

    expect(result.wait_reasons).toMatchObject([
      { kind: 'prerequisite', subject: { bead_id: 'UI-consumer' } }
    ]);
  });

  test('leaves a running implementation attempt without a prerequisite reason', () => {
    const result = run({
      queue: queue({
        ...serial,
        attempts: { a: waiting({ status: 'running', cause_detail: {} }) }
      }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] }
    });

    expect(result.wait_reasons).toEqual([]);
  });

  test('judges a waiting attempt with blockers through the held branch', () => {
    const result = run({
      queue: queue({ ...serial, attempts: { a: waiting() } }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker', 'UI-extra'] }
    });

    expect(result.wait_reasons[0].targets).toEqual([
      { id: 'UI-blocker', kind: 'issue', status: 'open' }
    ]);
  });

  test('uses the held attempt finish time as the prerequisite start', () => {
    const finished_at = NOW - 12 * MINUTE;
    const result = run({
      queue: queue({ ...serial, attempts: { a: waiting({ finished_at }) } }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] }
    });

    expect(result.wait_reasons[0].since).toBe(finished_at);
  });

  test('uses the admission record time as the prerequisite start', () => {
    const admitted_at = NOW - 12 * MINUTE;
    const result = run({
      queue: queue({
        ...serial,
        admission: {
          'UI-consumer': {
            at: admitted_at,
            blockers: ['UI-blocker'],
            reason: 'prerequisite_unmet'
          }
        }
      }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] }
    });

    expect(result.wait_reasons[0].since).toBe(admitted_at);
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
      headline: '',
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
      release:
        '자동 재개 꺼짐 · 서버 재시작 시 1회 자동 프로브 · ↻ 지금 프로브 필요',
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
      observed_at: { settle_observed_at: {} },
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

  test.each([
    {
      notify: { on_complete: 'discord' },
      error_count: 3,
      interval_seconds: 300,
      terminal_recorded_at: '2026-09-15T00:10:00Z'
    },
    {
      notify: null,
      error_count: 0,
      interval_seconds: 900,
      terminal_recorded_at: null
    }
  ])(
    'transmits a collected ISO watch through client validation %j',
    async (fields) => {
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
          registered_at: '2026-09-14T19:14:06Z',
          ssh_host: 'wallace',
          ...fields
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
      const transmitted = JSON.parse(JSON.stringify(collector.get().rows));
      const accepted = transmitted.filter(isExternalWaitObservation);
      const result = run({ external_waits: accepted }).wait_reasons[0];

      expect(readFile).toHaveBeenCalledTimes(1);
      expect(accepted).toHaveLength(1);
      expect(accepted[0]).toMatchObject({
        registered_at: Date.parse('2026-09-14T19:14:06Z'),
        terminal_recorded_at:
          fields.terminal_recorded_at === null
            ? null
            : Date.parse(fields.terminal_recorded_at),
        interval_seconds: fields.interval_seconds,
        ssh_host: 'wallace',
        error_count: fields.error_count
      });
      expect(result).toMatchObject({
        verdict: fields.error_count === 3 ? 'action_required' : 'normal',
        release: `${fields.interval_seconds / 60}분마다 자동 확인 · 종료 확인되면 대기 자동 해제${fields.notify ? ' · 완료 시 Discord 알림' : ''}`,
        actions: [
          {
            op: 'monitor_tick_now',
            payload: { root_dir: ROOT, watch_id, since: NOW }
          }
        ]
      });
    }
  );
});

describe('wait judgment prerequisite headline (UI-0bvr §4.2)', () => {
  const serial = queue({
    serial_lanes: [{ id: 's1', entries: [{ bead_id: 'UI-consumer' }] }]
  });

  test('leaves the prerequisite headline empty', () => {
    const result = run({
      queue: serial,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] },
      blocker_facts: {
        'UI-blocker': { title: '선행 작업', status: 'open' }
      }
    });

    expect(result.wait_reasons[0].headline).toBe('');
  });

  test('carries each open blocker status on the reason targets', () => {
    const result = run({
      queue: serial,
      bead_blocked_by: { 'UI-consumer': ['UI-blocker', 'UI-second'] },
      blocker_facts: {
        'UI-blocker': { status: 'open' },
        'UI-second': { status: 'in_progress' }
      }
    });

    expect(result.wait_reasons[0].targets).toEqual([
      { id: 'UI-blocker', kind: 'issue', status: 'open' },
      { id: 'UI-second', kind: 'issue', status: 'in_progress' }
    ]);
  });

  test('omits a prerequisite reason after frozen blockers resolve', () => {
    const result = run({
      queue: queue({ attempts: { a: waiting() } }),
      bead_blocked_by: { 'UI-consumer': [] }
    });

    expect(result.wait_reasons).toEqual([]);
  });
});

describe('externalJobHeadline', () => {
  test('prefers the monitor reason over the monitor state', () => {
    const row = external({
      job_state: '종료 확인 · 결과 검증 필요',
      monitor_state: '감시 확인 필요',
      monitor_reason: '자동 확인 3회 연속 실패',
      ssh_host: 'hamilton',
      job_id: '803565'
    });

    expect(externalJobHeadline(row)).toBe(
      'hamilton 작업 803565 · 종료 확인 · 결과 검증 필요 · 자동 확인 3회 연속 실패'
    );
  });

  test('falls back to the monitor state when no reason is recorded', () => {
    const row = external({ monitor_state: '감시 종료', monitor_reason: null });

    expect(externalJobHeadline(row)).toBe(
      'wallace 작업 246428 · 계산 중 · 감시 종료'
    );
  });

  test('drops the idle monitor state', () => {
    const row = external({ monitor_state: '자동 확인 중' });

    expect(externalJobHeadline(row)).toBe('wallace 작업 246428 · 계산 중');
  });
});

describe('auto-advance-off queues (UI-3pu9 §3)', () => {
  test('emits no reason for idle parallel entries and serial lanes', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        queue: [{ bead_id: 'UI-parallel' }],
        serial_lanes: [
          {
            id: 's1',
            entries: [
              { bead_id: 'UI-serial-head' },
              { bead_id: 'UI-serial-tail' }
            ]
          }
        ]
      })
    });

    expect(result.wait_reasons).toEqual([]);
  });

  test('emits no start_now action anywhere', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        queue: [{ bead_id: 'UI-consumer' }, { bead_id: 'UI-idle' }]
      }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] }
    });

    expect(
      result.wait_reasons.flatMap((row) =>
        row.actions.map((action) => action.op)
      )
    ).toEqual([]);
  });

  test('keeps the queue hold reason', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        hold: { kind: 'systemic', cause: 'disk_full', bead_ids: ['UI-idle'] }
      })
    });

    expect(result.wait_reasons).toMatchObject([
      { kind: 'queue_hold', subject: { bead_id: 'UI-idle' } }
    ]);
  });

  test('keeps the provider hold reason', () => {
    const result = run({
      queue: { ...provider(), auto_advance: false }
    });

    expect(result.wait_reasons.map((row) => row.kind)).toEqual([
      'provider_hold'
    ]);
  });

  test('keeps the prerequisite reason', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        queue: [{ bead_id: 'UI-consumer' }, { bead_id: 'UI-idle' }]
      }),
      bead_blocked_by: { 'UI-consumer': ['UI-blocker'] },
      blocker_facts: { 'UI-blocker': { title: '선행 작업', status: 'open' } }
    });

    expect(result.wait_reasons).toMatchObject([
      { kind: 'prerequisite', subject: { bead_id: 'UI-consumer' } }
    ]);
  });
});
