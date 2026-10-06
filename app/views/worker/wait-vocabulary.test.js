import { describe, expect, test } from 'vitest';
import {
  RELATION_CHIPS,
  REPRESENTATIVE_KIND_ORDER,
  SUMMARY_CHIPS,
  WAIT_KINDS,
  WAIT_VERDICTS,
  externalJobCapacityLines,
  externalJobDisplayName,
  externalJobRows,
  externalSpawnedSummary,
  externalSpawnedTable,
  representativeWaitReason,
  waitBadgeText,
  waitKindRow,
  waitScopeOf
} from './wait-vocabulary.js';

test.each(
  /** @type {const} */ ([
    [
      'no_launch_record',
      '바로 실행 불가 · 실행 기록 없음(sjob 1.7 이전 제출 — 다시 제출하면 가능)'
    ],
    [
      'workflow_local_profile_missing',
      '바로 실행 불가 · 서버 로컬 프로필 없음(profiles/server-local)'
    ]
  ])
)(
  'appends the %s prerequisite after the capacity lines',
  (takeover_blocker, text) => {
    const job = {
      adapter: /** @type {const} */ ('slurm'),
      state: 'PENDING',
      submitted_at: '2026-10-06T00:00:00Z',
      log_path: '/work/job.log',
      terminal: null,
      capacity: {
        reason: 'Resources',
        partition: 'debug',
        ahead: { jobs: 3, cpus: 48 },
        slurm: {
          cpu_alloc: 112,
          cpu_total: 112,
          mem_alloc_mb: 0,
          mem_total_mb: 1000
        },
        observed_at: '2026-10-06T00:00:00Z',
        takeover_blocker
      }
    };

    const lines = externalJobCapacityLines(job);
    const detail = externalJobCapacityLines(job, { read_time: true });

    expect(lines).toEqual([
      '대기 사유 자원 부족 · 앞 3건',
      'debug CPU 112/112 배정',
      text
    ]);
    expect(detail.at(-1)).toContain(`${text} · 용량 확인`);
  }
);

describe('wait vocabulary table', () => {
  test('keeps every row id unique', () => {
    const ids = WAIT_KINDS.map((row) => row.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  test('lists the spec row ids in order', () => {
    const ids = WAIT_KINDS.map((row) => row.id);

    expect(ids).toEqual([
      'prerequisite',
      'provider_hold',
      'retry_wait',
      'awaiting_user',
      'external_job'
    ]);
  });

  test('names the external job exits by their stage labels (UI-r6xq §4.5)', () => {
    const row = WAIT_KINDS.find((entry) => entry.id === 'external_job');

    expect(row?.action).toBe(
      '[지금 확인] · [관찰 중단] · [세션에서 이어가기] · [워커로 이어가기] · 재개 실패 시 [새 세션으로] · 상세의 [대기 해제]'
    );
  });

  test('points the external job release at both resume exits', () => {
    const row = WAIT_KINDS.find((entry) => entry.id === 'external_job');

    expect(row?.release).toBe(
      '완료되면 같은 세션을 이어간다 · 사용자 세션은 [세션에서 이어가기] 또는 [워커로 이어가기]'
    );
  });

  test('gives every row a scope, a glyph string and the release sentence', () => {
    const complete = WAIT_KINDS.every(
      (row) =>
        ['bead', 'queue'].includes(row.scope) &&
        typeof row.glyph === 'string' &&
        row.release.length > 0
    );

    expect(complete).toBe(true);
  });

  test('defines both times-line words on every row (UI-0bvr §5.1)', () => {
    const defined = WAIT_KINDS.every(
      (row) =>
        typeof row.elapsed_word === 'string' &&
        typeof row.next_word === 'string'
    );

    expect(defined).toBe(true);
  });

  test('leaves both times-line words empty for the two prerequisite rows', () => {
    const rows = WAIT_KINDS.filter((row) =>
      ['prerequisite', 'prerequisite_foreign'].includes(row.id)
    );

    expect(rows.map((row) => [row.elapsed_word, row.next_word])).toEqual([
      ['', '']
    ]);
  });

  test('names the times-line words of the clock-carrying kinds', () => {
    const words = ['external_job', 'retry_wait', 'provider_hold']
      .map((id) => WAIT_KINDS.find((row) => row.id === id))
      .map((row) => [row?.elapsed_word, row?.next_word]);

    expect(words).toEqual([
      ['경과', '다음'],
      ['대기', '다음 재시도'],
      ['보류', '다음 프로브']
    ]);
  });

  test('writes the overdue glyph as one codepoint without a variation selector', () => {
    const overdue = WAIT_VERDICTS.find((row) => row.verdict === 'overdue');

    expect([...(overdue?.glyph || '')].map((ch) => ch.codePointAt(0))).toEqual([
      0x26a0
    ]);
  });
});

describe('waitScopeOf', () => {
  test('treats provider gate chips as queue-scoped', () => {
    expect(waitScopeOf('gate')).toBe('queue');
  });

  test.each(['prerequisite', 'provider_hold', 'external_job', 'recovery'])(
    'treats %s as an issue fact',
    (kind) => {
      expect(waitScopeOf(kind)).toBe('bead');
    }
  );
});

describe('waitKindRow', () => {
  test('maps a prerequisite to the one prerequisite row', () => {
    const row = waitKindRow(
      { kind: 'prerequisite' },
      /** @type {any} */ ({ returning: true })
    );

    expect(row?.id).toBe('prerequisite');
  });

  test('infers an outage hold from the headline when no hold kind is given', () => {
    const row = waitKindRow({
      kind: 'provider_hold',
      headline: 'codex 공급자 장애 · 접속 실패'
    });

    expect(row?.id).toBe('provider_hold');
  });

  test('defaults an unlabelled provider hold to the usage limit row', () => {
    const row = waitKindRow({
      kind: 'provider_hold',
      headline: 'codex 한도 초과'
    });

    expect(row?.id).toBe('provider_hold');
  });

  test('omits the retired queue hold', () => {
    const row = waitKindRow({
      kind: 'queue_hold',
      headline: '환경 오류로 큐 일시 정지 · network'
    });

    expect(row).toBeNull();
  });

  test('returns null for a reason without a kind', () => {
    expect(waitKindRow({ headline: '무엇' })).toBeNull();
  });
});

describe('waitBadgeText', () => {
  const prerequisite = WAIT_KINDS[0];

  test('draws the kind glyph and label at a normal verdict', () => {
    expect(waitBadgeText(prerequisite, 'normal')).toBe('⛓ 선행 대기');
  });

  test('adds the elapsed minutes to an overdue badge', () => {
    const text = waitBadgeText(waitKindRow({ kind: 'retry_wait' }), 'overdue', {
      since: 1000,
      now: 1000 + 12 * 60_000
    });

    expect(text).toBe('⚠ 재시도 대기 · 지연 12분');
  });

  test('omits the minutes when no observation start is known', () => {
    expect(
      waitBadgeText(waitKindRow({ kind: 'retry_wait' }), 'overdue', { now: 5 })
    ).toBe('⚠ 재시도 대기 · 지연');
  });

  test('marks an action-required badge', () => {
    expect(waitBadgeText(prerequisite, 'action_required')).toBe(
      '⛔ 선행 대기 · 조치 필요'
    );
  });

  test('draws the kind alone when the server has no verdict', () => {
    expect(waitBadgeText(prerequisite, null)).toBe('⛓ 선행 대기');
  });

  test('omits retired base movement as a wait kind', () => {
    const base_moved = WAIT_KINDS.find((row) => row.id === 'base_moved');

    expect(waitBadgeText(base_moved, 'normal')).toBe('');
  });
});

describe('representativeWaitReason', () => {
  test('prefers the action-required foreign prerequisite over a normal one', () => {
    const chosen = representativeWaitReason([
      { kind: 'prerequisite', verdict: 'normal' },
      { kind: 'prerequisite_foreign', verdict: 'action_required' }
    ]);

    expect(chosen?.kind).toBe('prerequisite_foreign');
  });

  test('breaks a verdict tie with the kind order', () => {
    const chosen = representativeWaitReason([
      { kind: 'retry_wait', verdict: 'normal' },
      { kind: 'awaiting_user', verdict: 'normal' }
    ]);

    expect(chosen?.kind).toBe('awaiting_user');
  });

  test('ignores external work and queue facts', () => {
    const chosen = representativeWaitReason([
      { kind: 'external_job', verdict: 'action_required' },
      { kind: 'gate', verdict: 'normal' },
      { kind: 'retry_wait', verdict: 'normal' }
    ]);

    expect(chosen?.kind).toBe('retry_wait');
  });

  test('returns null when nothing is issue-scoped', () => {
    expect(representativeWaitReason([{ kind: 'gate' }])).toBeNull();
  });

  test('orders human decisions ahead of prerequisites', () => {
    expect(REPRESENTATIVE_KIND_ORDER.indexOf('awaiting_user')).toBeLessThan(
      REPRESENTATIVE_KIND_ORDER.indexOf('prerequisite')
    );
  });
});

describe('relation and summary chips', () => {
  test('keeps the chip grammar meanings verbatim', () => {
    const meanings = Object.fromEntries(
      RELATION_CHIPS.map((row) => [row.id, row.meaning])
    );

    expect(meanings).toMatchObject({
      'blocked-by': '지금 못 가는 이유',
      blocks: '내가 먼저 가야 풀리는 이슈',
      released: '왜 이제 갈 수 있나',
      'scope-overlap': '같이 출발하면 부딪히는 이슈',
      'scope-missing': '겹침 판정 불가',
      'discovered-from': '어디서 파생됐나',
      'worker-created': 'Worker가 어느 이슈에서 새로 만들었나'
    });
  });

  test('carries the grace and external-count chips', () => {
    const labels = RELATION_CHIPS.map((row) => row.label);

    expect(labels).toContain('⏳ <n>초');
    expect(labels).not.toContain('<판정 글리프> 외부 작업 N건');
  });

  test('states the blocked aggregation rule on the summary chip', () => {
    const blocked = SUMMARY_CHIPS.find((row) => row.id === 'blocked');

    expect(blocked?.meaning).toContain('provider_hold도 포함');
  });

  test('names the four summary chips', () => {
    expect(SUMMARY_CHIPS.map((row) => row.id)).toEqual([
      'running',
      'pr_wait',
      'done',
      'blocked'
    ]);
  });
});

test('shares one session label across parked and recovery kinds', () => {
  const rows = ['awaiting_user', 'recovery'].map((kind) =>
    waitKindRow({ kind })
  );

  expect(rows.map((row) => waitBadgeText(row, 'action_required'))).toEqual([
    '⛔ 확인 필요 · 조치 필요',
    '⛔ 확인 필요 · 조치 필요'
  ]);
});

test('shares one prerequisite label across repositories', () => {
  expect(waitKindRow({ kind: 'prerequisite_foreign' })).toBe(
    waitKindRow({ kind: 'prerequisite' })
  );
});

test('pins the representative reason order', () => {
  expect(REPRESENTATIVE_KIND_ORDER).toEqual([
    'awaiting_user',
    'recovery',
    'provider_hold',
    'prerequisite_foreign',
    'prerequisite',
    'retry_wait'
  ]);
});

describe('externalJobRows (UI-a119 §3.4)', () => {
  const SUBMITTED = '2026-09-30T00:00:00Z';
  const NOW = Date.parse('2026-09-30T01:29:40Z');

  /**
   * One slurm job of the card projection.
   *
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function slurm(patch = {}) {
    return {
      adapter: 'slurm',
      ssh_host: 'wallace',
      job_id: '42',
      submitted_at: SUBMITTED,
      log_path: '/logs/42.log',
      state: 'RUNNING',
      observed_at: '2026-09-30T01:20:00Z',
      terminal: null,
      ...patch
    };
  }

  /**
   * A terminal observation.
   *
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function ended(patch = {}) {
    return {
      exit_code: 0,
      evidence: 'sacct',
      recovery_needed: false,
      expected_results: [],
      ...patch
    };
  }

  /**
   * @param {any[]} jobs
   * @returns {any}
   */
  function record(jobs) {
    return { jobs, completion: null };
  }

  test.each([
    [
      'completed with exit 0',
      { state: 'COMPLETED', terminal: ended() },
      '✓',
      '완료',
      'success'
    ],
    [
      'completed without an exit code',
      { state: 'COMPLETED', terminal: ended({ exit_code: null }) },
      '✓',
      '완료',
      'success'
    ],
    [
      'vanished',
      { state: 'VANISHED', terminal: ended({ exit_code: null }) },
      '?',
      '결과 모름',
      'neutral'
    ],
    [
      'failed',
      { state: 'FAILED', terminal: ended({ exit_code: 1 }) },
      '✕',
      '실패',
      'danger'
    ],
    [
      'completed with a nonzero exit',
      { state: 'COMPLETED', terminal: ended({ exit_code: 2 }) },
      '✕',
      '실패',
      'danger'
    ],
    [
      'completed but needing recovery',
      { state: 'COMPLETED', terminal: ended({ recovery_needed: true }) },
      '✕',
      '실패',
      'danger'
    ],
    ['running', { state: 'RUNNING' }, '◐', '실행 중', 'progress'],
    ['pending', { state: 'PENDING' }, '○', '대기 중', 'neutral'],
    ['configuring', { state: 'CONFIGURING' }, '○', '대기 중', 'neutral'],
    ['requeued', { state: 'REQUEUED' }, '○', '대기 중', 'neutral'],
    ['unknown', { state: 'UNKNOWN' }, '·', '확인 중', 'neutral'],
    ['another state', { state: 'SUSPENDED' }, '·', 'SUSPENDED', 'neutral']
  ])('words a %s job', (_case, patch, glyph, state, tone) => {
    const jobs = [slurm(patch)];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows[0]).toMatchObject({ glyph, state, tone });
  });

  test('orders running, other waiting, failed or unknown, then completed', () => {
    const jobs = [
      slurm({ job_id: 'done', state: 'COMPLETED', terminal: ended() }),
      slurm({ job_id: 'lost', state: 'VANISHED', terminal: ended() }),
      slurm({ job_id: 'queued', state: 'PENDING' }),
      slurm({ job_id: 'run', state: 'RUNNING' })
    ];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows.map((row) => row.id)).toEqual([
      'run',
      'queued',
      'lost',
      'done'
    ]);
  });

  test('orders one group by submission time', () => {
    const jobs = [
      slurm({ job_id: 'late', submitted_at: '2026-09-30T00:30:00Z' }),
      slurm({ job_id: 'early', submitted_at: '2026-09-29T23:00:00Z' })
    ];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows.map((row) => row.id)).toEqual(['early', 'late']);
  });

  test('draws every job up to four', () => {
    const jobs = ['1', '2', '3', '4'].map((job_id) => slurm({ job_id }));

    const result = externalJobRows(record(jobs), NOW);

    expect(result.rows).toHaveLength(4);
    expect(result.more).toBe('');
  });

  test('keeps three lines and counts the rest from five jobs', () => {
    const jobs = ['1', '2', '3', '4', '5', '6'].map((job_id) =>
      slurm({ job_id })
    );

    const result = externalJobRows(record(jobs), NOW);

    expect(result.rows.map((row) => row.id)).toEqual(['1', '2', '3']);
    expect(result.more).toBe('외 3건 · 전체는 상세의 잡 표');
  });

  test.each([
    ['2026-09-29T22:30:00Z', '2h59m'],
    ['2026-09-30T00:10:00Z', '1h19m'],
    ['2026-09-30T01:10:40Z', '19m'],
    ['2026-09-30T01:29:10Z', '<1m'],
    ['not a time', '']
  ])(
    'formats the elapsed of a job submitted at %s as %j',
    (submitted_at, elapsed) => {
      const jobs = [slurm({ submitted_at })];

      const { rows } = externalJobRows(record(jobs), NOW);

      expect(rows[0].elapsed).toBe(elapsed);
    }
  );

  test('names a hostless process job local with its pid', () => {
    const jobs = [
      {
        adapter: 'process',
        pid: 4242,
        submitted_at: SUBMITTED,
        log_path: '/wt/job.log',
        state: 'RUNNING',
        observed_at: '2026-09-30T01:20:00Z',
        terminal: null
      }
    ];

    const { rows } = externalJobRows(/** @type {any} */ (record(jobs)), NOW);

    expect(rows[0]).toMatchObject({ host: '로컬', id: 'pid 4242' });
  });

  test('ends each terminal job at its own observation time', () => {
    const jobs = [
      slurm({
        job_id: 'a',
        state: 'COMPLETED',
        observed_at: '2026-09-30T00:19:00Z',
        terminal: ended()
      }),
      slurm({
        job_id: 'b',
        state: 'COMPLETED',
        observed_at: '2026-09-30T01:05:00Z',
        terminal: ended()
      })
    ];

    const { rows } = externalJobRows(
      /** @type {any} */ ({
        jobs,
        completion: { completed_at: '2026-09-30T01:05:00Z' }
      }),
      NOW
    );

    expect(rows.map((row) => [row.id, row.elapsed])).toEqual([
      ['a', '19m'],
      ['b', '1h05m']
    ]);
  });

  test('freezes an ended job while a running one follows now', () => {
    const jobs = [
      slurm({
        job_id: 'ended',
        state: 'COMPLETED',
        observed_at: '2026-09-30T00:19:00Z',
        terminal: ended()
      }),
      slurm({ job_id: 'running' })
    ];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows.map((row) => [row.id, row.elapsed])).toEqual([
      ['running', '1h29m'],
      ['ended', '19m']
    ]);
  });

  test('carries the raw state, exit code and evidence in the title', () => {
    const jobs = [
      slurm({
        state: 'FAILED',
        terminal: ended({ exit_code: 3, evidence: 'sacct FAILED 3:0' })
      })
    ];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows[0].title).toBe('FAILED · exit 3 · sacct FAILED 3:0');
  });

  test('omits a job line with no id, state or elapsed material', () => {
    const jobs = [
      slurm({ job_id: undefined, state: undefined, submitted_at: 'x' }),
      slurm({ job_id: '7' })
    ];

    const { rows } = externalJobRows(record(jobs), NOW);

    expect(rows.map((row) => row.id)).toEqual(['7']);
  });

  test('draws nothing without a record', () => {
    const result = externalJobRows(undefined, NOW);

    expect(result).toEqual({ rows: [], more: '' });
  });
});

describe('externalJobDisplayName (UI-q15q §3.3)', () => {
  test.each([
    ['strips the sjob tail', { name: 'snake__20260921_090000_ab12' }, 'snake'],
    ['keeps a plain JobName', { name: 'align' }, 'align'],
    [
      'names the rule from the comment',
      { name: 'x', rule: 'rule_align_reads' },
      'align_reads'
    ],
    [
      'drops a UUID run id',
      { name: 'pre_0b5e2f3a-1c2d-4e5f-8a9b-0c1d2e3f4a5b' },
      ''
    ],
    ['drops an empty name', { name: '' }, ''],
    ['drops a name that is only the tail', { name: '__20260921_090000_ab' }, '']
  ])('%s', (_case, job, name) => {
    const result = externalJobDisplayName(job);

    expect(result.name).toBe(name);
  });

  test('moves rule wildcards into the detail', () => {
    const result = externalJobDisplayName({
      rule: 'rule_align_reads_wildcards_sample=A,lane=1'
    });

    expect(result).toEqual({
      name: 'align_reads',
      detail: 'wildcards sample=A,lane=1'
    });
  });
});

describe('external sub-job summary and table (UI-q15q §3.5·§3.6)', () => {
  /**
   * @param {Record<string, any>} patch
   * @returns {any}
   */
  function row(patch) {
    return {
      job_id: '201',
      name: 'run_0b5e2f3a-1c2d-4e5f-8a9b-0c1d2e3f4a5b',
      rule: '',
      state: 'COMPLETED',
      submitted_at: '2026-09-21T09:10:00',
      started_at: '2026-09-21T09:11:00',
      ended_at: '2026-09-21T09:30:00',
      elapsed_seconds: 1140,
      time_limit_seconds: 3600,
      unlimited: false,
      cpus: 4,
      memory: '16G',
      exit_code: 0,
      ...patch
    };
  }

  /**
   * @param {Record<string, number>} counts
   * @param {any[]} [rows]
   * @param {number} [omitted]
   * @returns {any}
   */
  function spawned(counts, rows = [], omitted = 0) {
    const full = {
      running: 0,
      pending: 0,
      completed: 0,
      failed: 0,
      unknown: 0,
      ...counts
    };
    return {
      total: Object.values(full).reduce((sum, value) => sum + value, 0),
      counts: full,
      rows,
      omitted
    };
  }

  /**
   * @param {any[]} spawned_list
   * @returns {any}
   */
  function record(spawned_list) {
    return {
      jobs: spawned_list.map((value, index) => ({
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: String(100 + index),
        submitted_at: '2026-09-21T00:00:00Z',
        log_path: '/log',
        terminal: null,
        ...(value ? { spawned: value } : {})
      }))
    };
  }

  test('drops zero counts from the count line', () => {
    const summary = externalSpawnedSummary(
      record([spawned({ completed: 3, running: 1 })])
    );

    expect(summary?.total).toBe(4);
    expect(summary?.parts).toEqual([
      { key: 'completed', label: '완료', count: 3 },
      { key: 'running', label: '실행', count: 1 }
    ]);
  });

  test('names the most recently ended failures first', () => {
    const rows = [
      row({ job_id: '1', state: 'RUNNING', rule: 'rule_live' }),
      row({
        job_id: '2',
        state: 'FAILED',
        rule: 'rule_old',
        ended_at: '2026-09-21T09:20:00'
      }),
      row({
        job_id: '3',
        state: 'FAILED',
        rule: 'rule_new',
        ended_at: '2026-09-21T09:40:00'
      }),
      row({ job_id: '4', state: 'TIMEOUT', ended_at: '2026-09-21T09:30:00' })
    ];

    const summary = externalSpawnedSummary(
      record([spawned({ running: 1, failed: 3 }, rows)])
    );

    expect(summary?.names).toEqual({
      tone: 'danger',
      glyph: '✕',
      items: [
        { name: 'new', title: '' },
        { name: '4', title: '' }
      ],
      more: 1
    });
  });

  test('names the most recently started running jobs without a failure', () => {
    const rows = [
      row({
        job_id: '1',
        state: 'RUNNING',
        rule: 'rule_a',
        started_at: '2026-09-21T09:11:00'
      }),
      row({
        job_id: '2',
        state: 'RUNNING',
        rule: 'rule_b',
        started_at: '2026-09-21T09:15:00'
      })
    ];

    const summary = externalSpawnedSummary(
      record([spawned({ running: 2 }, rows)])
    );

    expect(summary?.names).toEqual({
      tone: 'progress',
      glyph: '◐',
      items: [
        { name: 'b', title: '' },
        { name: 'a', title: '' }
      ],
      more: 0
    });
  });

  test('carries the wildcards of a named sub-job as its title', () => {
    const rows = [
      row({
        job_id: '1',
        state: 'RUNNING',
        rule: 'rule_align_wildcards_sample=A',
        started_at: '2026-09-21T09:11:00'
      })
    ];

    const summary = externalSpawnedSummary(
      record([spawned({ running: 1 }, rows)])
    );

    expect(summary?.names?.items).toEqual([
      { name: 'align', title: 'wildcards sample=A' }
    ]);
  });

  test('sums two registered jobs into one count line without names', () => {
    const summary = externalSpawnedSummary(
      record([
        spawned({ completed: 2 }, [row({ state: 'FAILED' })]),
        spawned({ completed: 1, failed: 1 })
      ])
    );

    expect(summary).toEqual({
      total: 4,
      parts: [
        { key: 'completed', label: '완료', count: 3 },
        { key: 'failed', label: '실패', count: 1 }
      ],
      names: null
    });
  });

  test('draws no summary without sub-jobs', () => {
    const summary = externalSpawnedSummary(record([null]));

    expect(summary).toBeNull();
  });

  test('orders open rows running, pending, failed, then unknown', () => {
    const table = externalSpawnedTable(
      spawned({ running: 1, pending: 1, failed: 1, unknown: 1, completed: 1 }, [
        row({ job_id: 'u', state: 'UNKNOWN' }),
        row({ job_id: 'f', state: 'FAILED', exit_code: 1 }),
        row({ job_id: 'c' }),
        row({ job_id: 'p', state: 'PENDING', elapsed_seconds: 600 }),
        row({ job_id: 'r', state: 'RUNNING', elapsed_seconds: 1800 })
      ])
    );

    expect(table?.open.map((cell) => cell.id)).toEqual(['r', 'p', 'f', 'u']);
    expect(table?.completed.map((cell) => cell.id)).toEqual(['c']);
  });

  test.each([
    [
      'a running row with its limit',
      { state: 'RUNNING', elapsed_seconds: 1800 },
      '30m / 1h00m'
    ],
    [
      'an unlimited running row',
      {
        state: 'RUNNING',
        elapsed_seconds: 1800,
        unlimited: true,
        time_limit_seconds: null
      },
      '30m'
    ],
    ['a pending row', { state: 'PENDING', elapsed_seconds: 600 }, '대기 10m'],
    ['an ended row', { state: 'COMPLETED', elapsed_seconds: 1140 }, '19m']
  ])('words the elapsed cell of %s', (_case, patch, elapsed) => {
    const table = externalSpawnedTable(spawned({ running: 1 }, [row(patch)]));

    const cell = [...(table?.open || []), ...(table?.completed || [])][0];
    expect(cell.elapsed).toBe(elapsed);
  });

  test('words resources as cores and memory', () => {
    const table = externalSpawnedTable(spawned({ completed: 1 }, [row({})]));

    expect(table?.completed[0].resources).toBe('4코어 16G');
  });

  test('carries the completed count and omitted rows', () => {
    const table = externalSpawnedTable(
      spawned({ completed: 302 }, [row({})], 301)
    );

    expect(table).toMatchObject({ completed_count: 302, omitted: 301 });
  });
});

describe('externalJobRows names (UI-q15q §3.5)', () => {
  test('names the registered job and moves its number into the title', () => {
    const { rows } = externalJobRows(
      /** @type {any} */ ({
        jobs: [
          {
            adapter: 'slurm',
            ssh_host: 'wallace',
            job_id: '42',
            name: 'snake__20260921_090000_ab12',
            submitted_at: '2026-09-21T00:00:00Z',
            log_path: '/log',
            state: 'RUNNING',
            terminal: null
          }
        ]
      }),
      Date.parse('2026-09-21T01:00:00Z')
    );

    expect(rows[0]).toMatchObject({
      id: '42',
      name: 'snake',
      title: '42 · RUNNING'
    });
  });
});
