import { describe, expect, test } from 'vitest';
import {
  failureIncidentLines,
  repoOperationFacts
} from './failure-incident-lines.js';

/**
 * @param {number} at
 * @param {Record<string, any>} [fields]
 * @returns {any}
 */
function event(at, fields = {}) {
  return {
    event_id: `dispatched:A:${at}`,
    bead_id: 'UI-1',
    attempt_id: 'A',
    kind: 'dispatched',
    at,
    summary: `줄 ${at}`,
    ...fields
  };
}

/**
 * The four records one deploy failure of a quick_fix landing leaves.
 *
 * @param {number} at
 * @param {string} incident
 * @returns {any[]}
 */
function deployFailure(at, incident) {
  return [
    event(at, {
      event_id: `operation_failed:UI-1:${incident}`,
      kind: 'operation_failed',
      summary: '배포 실패 — 스크립트가 0이 아닌 코드로 끝났습니다 · exit 1',
      code: 'script_failed',
      incident,
      operation: { kind: 'deploy', exit_code: 1, retry_exhausted: true }
    }),
    event(at + 1, {
      event_id: `operation_recovery:UI-1:${incident}:r`,
      kind: 'operation_recovery',
      summary: '복구 분류 — 수리 대상 · 스크립트가 0이 아닌 코드로 끝났습니다',
      code: 'repair:repair · script_failed',
      incident
    }),
    event(at + 2, {
      event_id: `landing_step:A:${incident}`,
      kind: 'landing_step',
      summary: '착지 실패 — 스크립트가 0이 아닌 코드로 끝났습니다 (배포 실행)',
      code: 'script_failed',
      incident
    }),
    event(at + 3, {
      event_id: `attempt_failed:A:failed:${incident}`,
      kind: 'attempt_failed',
      summary: '세션 실패 — 스크립트가 0이 아닌 코드로 끝났습니다',
      code: 'quickfix_landing_failed:script_failed',
      incident
    })
  ];
}

const ATTEMPT = {
  attempt_id: 'A',
  status: 'failed',
  cause: 'quickfix_landing_failed:script_failed',
  finished_at: 999,
  quickfix_landing: { incident: 'dep-1', deploy_operation_id: 'dep-1' }
};

describe('failureIncidentLines', () => {
  test('folds the four records of one failure into one line', () => {
    const events = [event(1), ...deployFailure(10, 'dep-1')];

    const { incidents } = failureIncidentLines(events, ATTEMPT);

    expect(incidents).toEqual([
      expect.objectContaining({ summary: '줄 1' }),
      expect.objectContaining({
        kind: 'operation_failed',
        summary: '배포 실패 — 스크립트가 0이 아닌 코드로 끝났습니다 · exit 1',
        failure: true
      })
    ]);
  });

  test('draws a failure the cleanup retry met again as a second line', () => {
    const events = [
      ...deployFailure(10, 'dep-1'),
      ...deployFailure(20, 'dep-2')
    ];

    const { incidents } = failureIncidentLines(events, {
      ...ATTEMPT,
      quickfix_landing: { incident: 'dep-2', deploy_operation_id: 'dep-2' }
    });

    expect(incidents.map((line) => [line.at, line.failure === true])).toEqual([
      [10, false],
      [20, true]
    ]);
  });

  test('keeps the failure line when more than five events follow it', () => {
    const later = [30, 31, 32, 33, 34, 35].map((at) => event(at));
    const events = [event(1), ...deployFailure(10, 'dep-1'), ...later];

    const { incidents } = failureIncidentLines(events, ATTEMPT);

    expect(incidents.map((line) => line.at)).toEqual([1, 10, 33, 34, 35]);
    expect(incidents[1].failure).toBe(true);
  });

  test('picks at most three incidents before the failure', () => {
    const before = [1, 2, 3, 4, 5].map((at) => event(at));

    const { incidents } = failureIncidentLines(
      [...before, ...deployFailure(10, 'dep-1')],
      ATTEMPT
    );

    expect(incidents.map((line) => line.at)).toEqual([3, 4, 5, 10]);
  });

  test('leaves legacy records without an incident ungrouped', () => {
    const events = [
      event(10, {
        event_id: 'operation_failed:UI-1:dep-1',
        kind: 'operation_failed',
        summary: '배포 실패 — script_failed · exit 1'
      }),
      event(11, {
        event_id: 'attempt_failed:A:failed',
        kind: 'attempt_failed',
        summary: '세션 실패 — quickfix_landing_failed:script_failed'
      })
    ];

    const { incidents } = failureIncidentLines(events, {
      ...ATTEMPT,
      quickfix_landing: null
    });

    expect(incidents.map((line) => [line.kind, line.failure === true])).toEqual(
      [
        ['operation_failed', false],
        ['attempt_failed', true]
      ]
    );
  });

  test('makes the failure line from the attempt when no record holds it', () => {
    const { incidents } = failureIncidentLines([event(1)], {
      attempt_id: 'A',
      cause: 'quickfix_landing_failed:mystery_token',
      finished_at: 999
    });

    expect(incidents.at(-1)).toEqual({
      event_id: 'attempt_failed:A:synthesized',
      at: 999,
      kind: 'attempt_failed',
      summary: '세션 실패 — 착지 실패',
      failure: true
    });
  });

  test('carries the failure incident operation facts and recovery words', () => {
    const result = failureIncidentLines(deployFailure(10, 'dep-1'), ATTEMPT);

    expect(result.failure_operation).toEqual({
      kind: 'deploy',
      exit_code: 1,
      retry_exhausted: true
    });
    expect(result.failure_recovery).toEqual({
      summary: '복구 분류 — 수리 대상 · 스크립트가 0이 아닌 코드로 끝났습니다',
      code: 'repair:repair · script_failed'
    });
  });

  test('carries no operation or recovery key for a session failure', () => {
    const result = failureIncidentLines(
      [
        event(10, {
          event_id: 'attempt_failed:A:failed',
          kind: 'attempt_failed',
          summary: '세션 실패 — API Error: 529',
          code: 'session_failed:is_error',
          incident: 'A'
        })
      ],
      { attempt_id: 'A', cause: 'session_failed:is_error' }
    );

    expect(result).not.toHaveProperty('failure_operation');
    expect(result).not.toHaveProperty('failure_recovery');
  });

  test('places the made-up failure line at the attempt finish among later lines', () => {
    const events = [event(1), event(5), event(2000)];

    const { incidents } = failureIncidentLines(events, {
      attempt_id: 'A',
      cause: 'session_exited',
      finished_at: 999
    });

    expect(incidents.map((line) => line.at)).toEqual([1, 5, 999, 2000]);
    expect(incidents[2].failure).toBe(true);
  });

  test('adopts no earlier failure of the same attempt when the named incident is missing', () => {
    const events = [
      event(10, {
        event_id: 'attempt_failed:A:failed:old',
        kind: 'attempt_failed',
        summary: '세션 실패 — 예전 정리 실패',
        code: 'quickfix_landing_failed:script_failed',
        incident: 'old'
      })
    ];

    const { incidents } = failureIncidentLines(events, {
      ...ATTEMPT,
      quickfix_landing: { incident: 'dep-9' }
    });

    expect(incidents.map((line) => [line.at, line.failure === true])).toEqual([
      [10, false],
      [999, true]
    ]);
  });

  test('fills the failure operation facts from the stored record when history has none', () => {
    const repo_operations = {
      'dep-1': {
        kind: 'deploy',
        exit_code: 3,
        failure: { code: 'script_failed', summary: 'Error: boom' }
      }
    };

    const result = failureIncidentLines(
      [event(1)],
      {
        ...ATTEMPT,
        quickfix_landing: { incident: 'dep-1', deploy_operation_id: 'dep-1' }
      },
      repo_operations
    );

    expect(result.failure_operation).toEqual({
      kind: 'deploy',
      exit_code: 3,
      summary: 'Error: boom'
    });
  });

  test('fills the facts of an operation line that carries none from the stored record', () => {
    const events = deployFailure(10, 'dep-1').map((record) => {
      const copy = { ...record };
      delete copy.operation;
      return copy;
    });
    const repo_operations = {
      'dep-1': {
        kind: 'deploy',
        exit_code: 1,
        failure: { code: 'script_failed' }
      }
    };

    const result = failureIncidentLines(events, ATTEMPT, repo_operations);

    expect(result.failure_operation).toEqual({ kind: 'deploy', exit_code: 1 });
  });
});

describe('repoOperationFacts', () => {
  test('drops a summary that is only the failure code', () => {
    const facts = repoOperationFacts(
      { kind: 'deploy' },
      { code: 'script_failed', summary: 'script_failed' },
      2
    );

    expect(facts).toEqual({ kind: 'deploy', exit_code: 2 });
  });

  test('says the same error only when both runs confirmed their evidence', () => {
    const operation = {
      kind: 'deploy',
      retry: {
        consumed_key: ['k'],
        first_failure: { fingerprint: 'f', evidence_confirmed: true }
      }
    };

    const facts = repoOperationFacts(
      operation,
      { code: 'script_failed', fingerprint: 'f' },
      2
    );

    expect(facts).toEqual({
      kind: 'deploy',
      exit_code: 2,
      retry_exhausted: true
    });
  });
});
