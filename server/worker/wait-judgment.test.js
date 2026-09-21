import { describe, expect, test, vi } from 'vitest';
import { isExternalWaitObservation } from '../../app/protocol.js';
import { createWaitJudge, projectExternalWait } from './attach.js';
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

/**
 * @param {Record<string, any>} [patch]
 * @returns {any}
 */
function external(patch = {}) {
  return {
    wait_id: 'w-0123456789ab',
    root_dir: '/repo',
    bead_id: 'UI-consumer',
    owner_kind: 'worker',
    stage: 'hold',
    budget: { turns_total: 3, turns_used: 3 },
    registered_at: new Date(NOW - 192 * MINUTE).toISOString(),
    next_observation_at: new Date(NOW + MINUTE).toISOString(),
    error_count: 0,
    last_error: null,
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '42',
        submitted_at: new Date(NOW - 192 * MINUTE).toISOString(),
        log_path: '/logs/job.log',
        state: 'RUNNING',
        observed_at: '2026-09-21T03:12:00Z',
        terminal: null
      }
    ],
    completion: null,
    resume: null,
    ...patch
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
  test('projects the consumer headline without dependency targets', () => {
    const result = run({ external_waits: [external()] }).wait_reasons[0];

    expect(result).toMatchObject({
      subject: { bead_id: 'UI-consumer', root_dir: ROOT },
      headline: 'wallace 작업 42 · RUNNING · 경과 3h12m',
      release: '완료되면 같은 세션을 이어간다',
      verdict: 'normal',
      targets: []
    });
    expect(result.actions.map((action) => action.op)).toEqual([
      'external_wait_check',
      'external_wait_stop'
    ]);
  });

  test.each([
    [240000, 'normal'],
    [240001, 'overdue']
  ])('judges two Slurm intervals at %i ms', (age, verdict) => {
    const result = run({
      external_waits: [
        external({
          next_observation_at: new Date(NOW - Number(age)).toISOString()
        })
      ]
    });

    expect(result.wait_reasons[0].verdict).toBe(verdict);
  });

  test('marks three observation errors overdue and preserves the error line', () => {
    const result = run({
      external_waits: [external({ error_count: 3, last_error: 'ssh failed' })]
    }).wait_reasons[0];

    expect(result).toMatchObject({
      verdict: 'overdue',
      error: '관찰 오류 3회 · ssh failed'
    });
  });

  test.each([
    ['session', null, ['external_wait_stop', 'external_wait_resume']],
    ['worker', null, ['external_wait_stop']],
    [
      'worker',
      { error: 'no_session_ref' },
      ['external_wait_stop', 'external_wait_resume', 'external_wait_resume']
    ],
    ['session', { error: null, attempt_id: 'reserved' }, ['external_wait_stop']]
  ])(
    'offers stage-aware completion actions for %s (%j)',
    (owner_kind, resume, actions) => {
      const result = run({
        external_waits: [
          external({
            owner_kind,
            resume,
            stage: 'completing',
            completion: { completed_at: new Date(NOW).toISOString() }
          })
        ],
        blocker_facts: { 'UI-consumer': { external_wait: 'w-0123456789ab' } }
      }).wait_reasons[0];

      expect(result.actions.map((action) => action.op)).toEqual(actions);
      expect(result.completed_at).toBe(NOW);
      expect(result.next_check_at).toBeUndefined();
      expect(result.notify_plan.on_complete).toBe(
        owner_kind === 'session' ? 'discord' : 'none'
      );
      if (resume?.error) {
        expect(result.verdict_reason?.message).toBe(
          '재개 실패 · no_session_ref'
        );
        expect(
          result.actions.slice(1).map((action) => action.payload.mode)
        ).toEqual(['fork', 'fresh']);
      }
    }
  );

  test('fails closed when the detached record has no metadata key', () => {
    const result = run({ external_waits: [external({ stage: 'detached' })] })
      .wait_reasons[0];

    expect(result).toMatchObject({
      verdict: 'action_required',
      verdict_reason: { message: '키 없음' }
    });
  });

  test('fails closed when the metadata key has no record', () => {
    const result = run({
      blocker_facts: { 'UI-consumer': { external_wait: 'w-0123456789ab' } }
    }).wait_reasons[0];

    expect(result).toMatchObject({
      verdict: 'action_required',
      verdict_reason: { message: '대기 레코드 없음' }
    });
    expect(result.actions[0].op).toBe('external_wait_stop');
  });

  test.each(['done', 'resumed', 'stopped'])(
    'omits terminal records at %s',
    (stage) => {
      const result = run({ external_waits: [external({ stage })] });

      expect(result.wait_reasons).toEqual([]);
    }
  );

  test('summarizes multiple jobs by terminal count', () => {
    const jobs = [
      external().jobs[0],
      { ...external().jobs[0], terminal: { exit_code: 0 } }
    ];

    expect(externalJobHeadline({ jobs }, NOW)).toBe('잡 2건 · 완료 1 · 실행 1');
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
      release: `리셋 ${clock} 뒤 자동 프로브 (상한 없음)`,
      resets_at: at,
      since: NOW - MINUTE
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

  test('keeps a usage hold normal after its reset with a retired disarm marker', () => {
    const result = run({
      queue: provider({
        resets_at: NOW,
        last_error: 'auto_resume_disarmed:rearm_cap'
      })
    }).wait_reasons[0];

    expect(result.verdict).toBe('normal');
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

  test('keeps automatic probing beyond three rearms', () => {
    const result = run({ queue: provider({ rearm_count: 3 }) }).wait_reasons[0];

    expect(result).toMatchObject({
      release: expect.stringMatching(/^리셋 .* 뒤 자동 프로브 \(상한 없음\)$/),
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

  test('omits a retired systemic queue hold', () => {
    const result = run({
      queue: queue({
        hold: {
          kind: 'systemic',
          cause: 'verify_failed',
          bead_ids: ['UI-consumer']
        }
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
      observed_at: { settle_observed_at: {} },
      external_waits: [external({ stage: 'terminal_recorded' })]
    };
    const before = structuredClone(input);

    run(input);

    expect(input).toEqual(before);
  });
});

describe('wait-judge runtime', () => {
  test('projects changed records before broadcasting the judgment', async () => {
    const record = {
      ...external(),
      owner: { kind: 'worker', attempt_id: 'a' },
      worktree: '/repo/tree',
      execution_sha: 'a'.repeat(40)
    };
    const onChanged = vi.fn();
    const judge = createWaitJudge({
      workspace: ROOT,
      repo: ROOT,
      store: /** @type {any} */ ({
        snapshot: () => queue(),
        claimWaitNotifications: () => []
      }),
      notifier: /** @type {any} */ ({}),
      listRecords: () => [record],
      requestSnapshot: /** @type {any} */ (
        async () => ({ ok: true, snapshot: {} })
      ),
      readFacts: async () => ({}),
      onChanged,
      now: () => NOW
    });

    await judge.refresh();
    record.error_count = 3;
    record.last_error = 'ssh failed';
    await judge.refresh();

    expect(judge.get().wait_reasons[0].verdict).toBe('overdue');
    expect(onChanged).toHaveBeenCalledTimes(2);
    expect(isExternalWaitObservation(projectExternalWait(record))).toBe(true);
    expect(projectExternalWait(record)).not.toHaveProperty('worktree');
    judge.stop();
  });
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

  test('omits a retired queue hold while auto advance is paused', () => {
    const result = run({
      queue: queue({
        auto_advance: false,
        hold: { kind: 'systemic', cause: 'disk_full', bead_ids: ['UI-idle'] }
      })
    });

    expect(result.wait_reasons).toEqual([]);
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
