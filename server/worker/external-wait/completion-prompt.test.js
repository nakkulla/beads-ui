import { expect, test } from 'vitest';
import { externalWaitCompletionPrompt } from './completion-prompt.js';

/**
 * A spawned row of the stored record.
 *
 * @param {Partial<import('./store.js').SpawnedRow>} patch
 * @returns {import('./store.js').SpawnedRow}
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
 * A completed record whose one slurm job may carry sub-jobs.
 *
 * @param {import('./store.js').Spawned} [spawned]
 * @returns {import('./store.js').WaitRecord}
 */
function record(spawned) {
  return {
    wait_id: 'w-0123456789ab',
    root_dir: '/repo',
    bead_id: 'A-1',
    owner: { kind: 'worker', attempt_id: 'attempt-1' },
    worktree: '/repo',
    execution_sha: 'a'.repeat(40),
    registered_at: '2026-09-21T00:00:00Z',
    stage: 'completing',
    budget: { turns_total: 3, turns_used: 3 },
    next_observation_at: '2026-09-21T00:00:00Z',
    error_count: 0,
    last_error: null,
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '123',
        submitted_at: '2026-09-21T00:00:00Z',
        log_path: '/logs/job.log',
        expected: ['/result'],
        state: 'COMPLETED',
        terminal: {
          exit_code: 0,
          evidence: 'scontrol',
          expected_results: [],
          recovery_needed: false,
          completed_at: '2026-09-21T01:00:00Z'
        },
        ...(spawned ? { spawned } : {})
      }
    ],
    completion: {
      digest: 'b'.repeat(64),
      completed_at: '2026-09-21T01:00:00Z',
      recovery_needed: false
    },
    resume: null
  };
}

test('adds a sub-job count line and one line per failure under the registered job', () => {
  const prompt = externalWaitCompletionPrompt(
    record({
      total: 3,
      counts: { running: 0, pending: 0, completed: 2, failed: 1, unknown: 0 },
      rows: [
        row({ job_id: '201' }),
        row({
          job_id: '202',
          rule: 'rule_sort_wildcards_s=A',
          state: 'FAILED',
          exit_code: 1
        })
      ],
      omitted: 1
    })
  );

  expect(prompt.split('\n').slice(2, 5)).toEqual([
    'recovery_needed=false · log=/logs/job.log',
    '하위 잡 3개 · 완료 2 · 실패 1',
    '✕ 202 sort · FAILED · exit=1'
  ]);
});

test('lists at most ten failed sub-jobs, most recently ended first', () => {
  const rows = Array.from({ length: 12 }, (_, index) =>
    row({
      job_id: String(300 + index),
      state: 'TIMEOUT',
      exit_code: null,
      ended_at: `2026-09-21T09:${String(10 + index)}:00`
    })
  );

  const prompt = externalWaitCompletionPrompt(
    record({
      total: 12,
      counts: { running: 0, pending: 0, completed: 0, failed: 12, unknown: 0 },
      rows,
      omitted: 0
    })
  );

  const failed = prompt.split('\n').filter((line) => line.startsWith('✕ '));
  expect(failed).toHaveLength(10);
  expect(failed[0]).toBe('✕ 311 · TIMEOUT · exit=unknown');
});

test('keeps the old bytes for a record without sub-jobs', () => {
  const prompt = externalWaitCompletionPrompt(record());

  expect(prompt).toBe(
    [
      '## 외부 작업 완료',
      '123 · COMPLETED · exit_code=0 · evidence=scontrol',
      'recovery_needed=false · log=/logs/job.log',
      `completion.digest=${'b'.repeat(64)}`,
      'recovery_needed=false',
      '관찰 완료는 구현 완료가 아니다 — 아티팩트의 의미 검증·복구·커밋·완료는 이 세션이 한다'
    ].join('\n')
  );
});

/**
 * A completed record whose one job is a takeover's local run.
 *
 * @param {boolean} cancel_failed
 * @returns {import('./store.js').WaitRecord}
 */
function localRecord(cancel_failed) {
  return {
    ...record(),
    jobs: [
      {
        adapter: 'sjob_local',
        ssh_host: 'wallace',
        local_id: 'L003',
        pid: 4242,
        process_start: '',
        workdir: '/work',
        log_path: '/home/u/.sjob/logs/run.log',
        exitcode_path: '/home/u/.sjob/local/L003.exitcode',
        submitted_at: '2026-10-06T08:00:00.000Z',
        expected: ['/result'],
        cpus: 16,
        mem_gb: 64,
        takeover_from: {
          job_id: '249043',
          at: '2026-10-06T08:00:00.000Z',
          cancel_failed
        },
        state: 'COMPLETED',
        terminal: {
          exit_code: 0,
          evidence: 'exitcode',
          expected_results: [],
          recovery_needed: false,
          completed_at: '2026-10-06T09:00:00Z'
        }
      }
    ]
  };
}

test('names the local run and the Slurm job it took over (UI-qbgj §3.5)', () => {
  const prompt = externalWaitCompletionPrompt(localRecord(false));

  expect(prompt.split('\n').slice(1, 4)).toEqual([
    'wallace:L003 · COMPLETED · exit_code=0 · evidence=exitcode',
    'Slurm 249043에서 바로 실행으로 전환(2026-10-06T08:00:00.000Z)',
    'recovery_needed=false · log=/home/u/.sjob/logs/run.log'
  ]);
});

test('adds the unconfirmed cancellation line when the cancel failed', () => {
  const prompt = externalWaitCompletionPrompt(localRecord(true));

  expect(prompt.split('\n').slice(2, 4)).toEqual([
    'Slurm 249043에서 바로 실행으로 전환(2026-10-06T08:00:00.000Z)',
    '원 Slurm 249043 취소 미확인 — hold 유지'
  ]);
});
