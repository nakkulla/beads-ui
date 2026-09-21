import { createHash } from 'node:crypto';
import { describe, expect, test } from 'vitest';
import { HOLD_BUDGET } from './contract.js';
import {
  completionDigest,
  holdDecision,
  registrationDecision
} from './decision.js';

/**
 * @param {Partial<import('./store.js').SlurmJob>} [overrides]
 * @returns {import('./store.js').SlurmJob}
 */
function slurm(overrides = {}) {
  return {
    adapter: 'slurm',
    ssh_host: 'cluster',
    job_id: '123',
    log_path: '/job.log',
    submitted_at: '2026-09-21T00:00:00Z',
    expected: ['/result'],
    state: 'RUNNING',
    terminal: null,
    time_limit_seconds: 1800,
    run_time_seconds: 180,
    ...overrides
  };
}

const TERMINAL = {
  exit_code: 0,
  evidence: 'scontrol',
  expected_results: [],
  recovery_needed: false,
  completed_at: '2026-09-21T00:10:00Z'
};

describe('registrationDecision', () => {
  test.each([
    ['empty', [], 'done'],
    ['terminal', [slurm({ terminal: TERMINAL })], 'done'],
    ['pending', [slurm({ state: 'PENDING' })], 'detached'],
    ['budget boundary', [slurm()], 'hold'],
    ['over budget', [slurm({ run_time_seconds: 179 })], 'detached'],
    ['unlimited', [slurm({ unlimited: true })], 'detached'],
    ['unparseable', [slurm({ unparseable: true })], 'detached'],
    ['missing limit', [slurm({ time_limit_seconds: null })], 'detached'],
    [
      'mixed',
      [slurm({ terminal: TERMINAL, state: 'FAILED' }), slurm()],
      'hold'
    ],
    [
      'completing',
      [slurm({ state: 'COMPLETING', time_limit_seconds: null })],
      'hold'
    ]
  ])('judges %s jobs on the remaining set', (_name, jobs, expected) => {
    const decision = registrationDecision(
      /** @type {import('./store.js').Job[]} */ (jobs)
    );

    expect(decision).toBe(expected);
  });

  test('holds a slurm job whose first observation could not read its state', () => {
    const decision = registrationDecision([slurm({ state: 'UNKNOWN' })]);

    expect(decision).toBe('hold');
  });

  test.each(['CONFIGURING', 'SUSPENDED', 'REQUEUED', 'RESIZING', 'PENDING'])(
    'detaches %s without a runtime ceiling',
    (state) => {
      const decision = registrationDecision([slurm({ state })]);

      expect(decision).toBe('detached');
    }
  );

  test('holds local processes within the call budget', () => {
    const decision = registrationDecision([
      {
        adapter: 'process',
        pid: 22,
        submitted_at: '2026-09-21T00:00:00Z',
        workdir: '/tmp',
        log_path: '/tmp/log',
        state: 'RUNNING'
      }
    ]);

    expect(decision).toBe('hold');
  });

  test('uses the supplied budget', () => {
    const decision = registrationDecision([slurm()], {
      turns_total: 1,
      turn_seconds: 10
    });

    expect(decision).toBe('detached');
  });
});

test('permits three hold calls and detaches the fourth without observation', () => {
  const record = {
    budget: { turns_total: HOLD_BUDGET.turns_total, turns_used: 0 }
  };
  /** @type {ReturnType<typeof holdDecision>[]} */
  const decisions = [];

  for (let turn = 0; turn < 4; turn += 1) {
    decisions.push(holdDecision(record));
    record.budget.turns_used += 1;
  }

  expect(decisions).toEqual([
    { decision: 'hold', observe: true },
    { decision: 'hold', observe: true },
    { decision: 'hold', observe: true },
    { decision: 'detached', observe: false }
  ]);
});

test('hashes canonical terminal projections without observation timestamps', () => {
  const job = slurm({ terminal: TERMINAL });
  const expected_json =
    '[{"adapter":"slurm","evidence":"scontrol","exit_code":0,"expected_results":[],"job_id":"123","recovery_needed":false}]';

  const digest = completionDigest([job]);
  job.observed_at = '2026-09-22T00:00:00Z';
  job.terminal = { ...TERMINAL, completed_at: '2026-09-22T00:00:00Z' };

  expect(digest).toBe(createHash('sha256').update(expected_json).digest('hex'));
  expect(completionDigest([job])).toBe(digest);
});

test('preserves job order and result changes in the digest', () => {
  const first = slurm({ terminal: TERMINAL });
  const second = slurm({
    job_id: '456',
    terminal: { ...TERMINAL, recovery_needed: true }
  });

  const forward = completionDigest([first, second]);

  expect(completionDigest([second, first])).not.toBe(forward);
  expect(completionDigest([first, first])).not.toBe(forward);
  expect(() => completionDigest([slurm()])).toThrow('terminal');
});
