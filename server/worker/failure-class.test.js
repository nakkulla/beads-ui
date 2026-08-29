import { describe, expect, test } from 'vitest';
import {
  RETRY_DELAYS_MS,
  RETRY_MAX,
  causeKey,
  classifyFailure,
  claudeSummary,
  codexSummary,
  extractSummary,
  failureTokenSummary,
  guardKillMessage,
  matchEnvPattern,
  scriptSummary
} from './failure-class.js';

/**
 * @param {Object} [overrides]
 * @returns {any}
 */
function input(overrides) {
  return { cause: null, cause_detail: null, verdict: null, ...overrides };
}

describe('worker failure classification table', () => {
  const cases = [
    ['session_failed:subtype', 'individual'],
    ['session_failed:no_result', 'individual'],
    ['session_failed:turn_failed', 'individual'],
    ['quickfix_landing_failed:head_mismatch', 'individual'],
    ['quickfix_landing_failed:delivery_unproven:push_log_absent', 'individual'],
    ['workflow_mode_record_failed', 'individual'],
    ['workflow_mode_revert_failed', 'individual'],
    ['disposition_failed:bd_write', 'individual'],
    ['verify_failed:bd_not_resolved', 'individual'],
    ['verify_failed:bd_record_failed', 'individual'],
    ['verify_failed:gh_observation_failed', 'env'],
    ['verify_failed:bd_read_failed', 'env'],
    ['quickfix_landing_failed:bd_read_failed', 'env'],
    ['verify_cmd_spawn_error', 'env'],
    ['spawn_failed', 'env'],
    ['spawn_failed:codex', 'env'],
    ['codex_home_prepare_failed', 'env'],
    ['base_landing_detected', 'systemic'],
    ['gh_unavailable', 'systemic'],
    ['bd_unreachable', 'systemic'],
    ['verify_red', 'systemic'],
    ['cleanup_failed', 'systemic'],
    ['cleanup_failed:deploy_script', 'systemic']
  ];

  for (const [cause, tier] of cases) {
    test(`maps ${cause} to ${tier}`, () => {
      const result = classifyFailure(input({ cause }));

      expect({ tier: result.tier, cause: result.cause }).toEqual({
        tier,
        cause
      });
    });
  }

  test('classifies an unknown cause as individual', () => {
    const result = classifyFailure(input({ cause: 'brand_new_cause' }));

    expect(result.tier).toEqual('individual');
  });

  test('attaches the retry ladder to env tiers only', () => {
    const env = classifyFailure(input({ cause: 'verify_cmd_spawn_error' }));
    const individual = classifyFailure(
      input({ cause: 'session_failed:subtype' })
    );

    expect(env.retry).toEqual({ max: RETRY_MAX, delays_ms: RETRY_DELAYS_MS });
    expect(individual.retry).toBeNull();
  });

  test('stops the queue on a bypassed prevention layer', () => {
    const result = classifyFailure(
      input({
        cause: 'loud_fail_blocker',
        cause_detail: { reason: 'hook_bypass_blocked' }
      })
    );

    expect(result.tier).toEqual('systemic');
  });

  test('keeps a bd_close blocker on its own bead', () => {
    const result = classifyFailure(
      input({
        cause: 'loud_fail_blocker',
        cause_detail: { reason: 'bd_close_blocked' }
      })
    );

    expect(result.tier).toEqual('individual');
  });
});

describe('worker failure environment patterns', () => {
  test('classifies an overloaded API error as env', () => {
    const result = classifyFailure(
      input({
        cause: 'session_failed:is_error',
        verdict: { success: false, summary: 'API Error: 529 Overloaded' }
      })
    );

    expect({ tier: result.tier, env_group: result.env_group }).toEqual({
      tier: 'env',
      env_group: 'api'
    });
  });

  test('classifies a permission denial as individual', () => {
    const result = classifyFailure(
      input({
        cause: 'session_failed:is_error',
        verdict: { success: false, summary: 'permission denied' }
      })
    );

    expect({ tier: result.tier, env_group: result.env_group }).toEqual({
      tier: 'individual',
      env_group: null
    });
  });

  test('matches a missing CLI as the runtime group', () => {
    expect(matchEnvPattern('codex: command not found')).toEqual('runtime');
  });

  test('returns null for a non-string summary', () => {
    expect(matchEnvPattern(null)).toBeNull();
  });
});

describe('worker parked classification', () => {
  const parked_input = {
    cause: null,
    verdict: { success: true, summary: 'REVISE 처리 대기' },
    bead_status: 'in_progress',
    pr_url: null,
    awaiting_user: 'spec 승인 대기'
  };

  test('parks a successful session that recorded awaiting_user', () => {
    const result = classifyFailure(input(parked_input));

    expect({ tier: result.tier, cause: result.cause }).toEqual({
      tier: 'parked',
      cause: 'session_parked'
    });
  });

  test('parks over the retired pr_missing cause', () => {
    const result = classifyFailure(
      input({ ...parked_input, cause: 'verify_failed:pr_missing' })
    );

    expect(result.cause).toEqual('session_parked');
  });

  test('reads a missing awaiting_user as session_ended_unresolved', () => {
    const result = classifyFailure(
      input({ ...parked_input, awaiting_user: undefined })
    );

    expect({ tier: result.tier, cause: result.cause }).toEqual({
      tier: 'individual',
      cause: 'session_ended_unresolved'
    });
  });

  test('does not park a session that failed', () => {
    const result = classifyFailure(
      input({ ...parked_input, verdict: { success: false, summary: 'boom' } })
    );

    expect(result.tier).not.toEqual('parked');
  });

  test('does not park a resolved bead', () => {
    const result = classifyFailure(
      input({ ...parked_input, bead_status: 'resolved' })
    );

    expect(result.tier).not.toEqual('parked');
  });

  test('does not park an attempt that produced a PR', () => {
    const result = classifyFailure(
      input({ ...parked_input, pr_url: 'https://example.test/pr/1' })
    );

    expect(result.tier).not.toEqual('parked');
  });

  test('sends an unresolved end with an env error onto the retry ladder', () => {
    const result = classifyFailure(
      input({
        ...parked_input,
        awaiting_user: null,
        verdict: { success: true, summary: 'spawn codex ENOENT' }
      })
    );

    expect({ tier: result.tier, cause: result.cause }).toEqual({
      tier: 'env',
      cause: 'session_ended_unresolved'
    });
  });

  test('keeps a hard cause instead of rewriting it as a parked outcome', () => {
    const result = classifyFailure(
      input({ ...parked_input, cause: 'base_landing_detected' })
    );

    expect(result.tier).toEqual('systemic');
  });
});

describe('worker failure summary extraction', () => {
  test('takes the first non-empty line', () => {
    expect(extractSummary('\n\n  first line  \nsecond')).toEqual('first line');
  });

  test('caps the summary at 200 characters', () => {
    expect(extractSummary('x'.repeat(300))).toHaveLength(200);
  });

  test('returns null for text without content', () => {
    expect(extractSummary('   \n  ')).toBeNull();
  });

  test('falls back to cause_detail summary', () => {
    const result = classifyFailure(
      input({
        cause: 'session_failed:is_error',
        cause_detail: { summary: 'fetch failed' }
      })
    );

    expect({ summary: result.summary, tier: result.tier }).toEqual({
      summary: 'fetch failed',
      tier: 'env'
    });
  });
});

describe('worker script output summary', () => {
  test('takes the first failure-announcing line', () => {
    const output = ['running tests', 'FAIL server/a.test.js', 'done'].join(
      '\n'
    );

    expect(scriptSummary(output)).toEqual('FAIL server/a.test.js');
  });

  test('matches a failure line that the runner indented', () => {
    const output = ['ok', '    AssertionError: expected 1 to be 2'].join('\n');

    expect(scriptSummary(output)).toEqual('AssertionError: expected 1 to be 2');
  });

  test('takes the first match when several lines announce a failure', () => {
    const output = ['npm ERR! code ELIFECYCLE', 'Error: later'].join('\n');

    expect(scriptSummary(output)).toEqual('npm ERR! code ELIFECYCLE');
  });

  test('falls back to the last non-empty line without a match', () => {
    const output = ['step one', 'step two', '', '   '].join('\n');

    expect(scriptSummary(output)).toEqual('step two');
  });

  test('returns null for output with no content', () => {
    expect(scriptSummary('\n   \n')).toBeNull();
  });

  test('returns null for a non-string output', () => {
    expect(scriptSummary(undefined)).toBeNull();
  });

  test('caps the script summary at 200 characters', () => {
    expect(scriptSummary(`Error: ${'x'.repeat(300)}`)).toHaveLength(200);
  });

  test('caps a fallback last line at 200 characters', () => {
    expect(scriptSummary('y'.repeat(300))).toHaveLength(200);
  });
});

describe('worker guard kill summary', () => {
  test('carries the base merge kill message verbatim', () => {
    expect(
      guardKillMessage({
        reason: 'merge_to_base_blocked',
        command: 'git merge origin/main'
      })
    ).toEqual(
      'landing on the base branch is never permitted: git merge origin/main'
    );
  });

  test('carries the hook bypass kill message verbatim', () => {
    expect(
      guardKillMessage({
        reason: 'hook_bypass_blocked',
        command: 'git push --no-verify'
      })
    ).toEqual(
      'disabling the git hooks is never permitted: git push --no-verify'
    );
  });

  test('names an unrecognized kind with the command it refused', () => {
    expect(
      guardKillMessage({ reason: 'new_kind', command: 'rm -rf /' })
    ).toEqual('the session engine refused this command: rm -rf /');
  });

  test('reports the reason alone for a kill with no command', () => {
    expect(
      guardKillMessage({ reason: 'question_detected', command: null })
    ).toEqual('question_detected');
  });

  test('classifies a guard kill with its message as the summary', () => {
    const result = classifyFailure(
      input({
        cause: 'loud_fail_blocker',
        cause_detail: {
          reason: 'merge_to_base_blocked',
          command: 'git merge origin/main',
          summary: guardKillMessage({
            reason: 'merge_to_base_blocked',
            command: 'git merge origin/main'
          })
        }
      })
    );

    expect({ tier: result.tier, summary: result.summary }).toEqual({
      tier: 'systemic',
      summary:
        'landing on the base branch is never permitted: git merge origin/main'
    });
  });
});

describe('worker landing failure summary', () => {
  test('says the sentence of a single-token failure', () => {
    expect(failureTokenSummary('verify_red')).toEqual(
      '머지 후 검증이 실패했습니다.'
    );
  });

  test('appends the detail token to the sentence', () => {
    expect(
      failureTokenSummary('verify_failed:verify_cmd_failed:exit_1')
    ).toEqual('머지 후 검증 명령이 실패했습니다. (exit_1)');
  });

  test('returns null for a token with no sentence', () => {
    expect(failureTokenSummary('quickfix_landing_failed:threw')).toBeNull();
  });

  test('returns null for a non-string cause', () => {
    expect(failureTokenSummary(null)).toBeNull();
  });

  test('classifies a merge failure with the token sentence as summary', () => {
    const result = classifyFailure(input({ cause: 'cleanup_failed:branch' }));

    expect({ tier: result.tier, summary: result.summary }).toEqual({
      tier: 'systemic',
      summary: '머지 후 정리가 끝나지 못했습니다. (branch)'
    });
  });

  test('keeps the session summary ahead of the token sentence', () => {
    const result = classifyFailure(
      input({
        cause: 'verify_red',
        cause_detail: { summary: 'npm ERR! code ELIFECYCLE' }
      })
    );

    expect(result.summary).toEqual('npm ERR! code ELIFECYCLE');
  });
});

describe('worker prerequisite wait classification', () => {
  const wait_input = {
    cause: 'prerequisite_unmet',
    cause_detail: {
      blockers: [{ id: 'Analysis-2zly', rig: 'Analysis', status: 'open' }]
    },
    verdict: { success: true, summary: '대기 · blocks:Analysis-2zly' },
    bead_status: 'open',
    pr_url: null,
    tier_hint: 'waiting'
  };

  test('classifies a proven prerequisite wait as waiting', () => {
    const result = classifyFailure(input(wait_input));

    expect({ tier: result.tier, cause: result.cause }).toEqual({
      tier: 'waiting',
      cause: 'prerequisite_unmet'
    });
  });

  test('falls back to individual without the tier hint', () => {
    const result = classifyFailure(
      input({ ...wait_input, tier_hint: undefined })
    );

    expect(result.tier).toEqual('individual');
  });

  test('falls back to individual when no blocker was proven', () => {
    const result = classifyFailure(
      input({ ...wait_input, cause_detail: { blockers: [] } })
    );

    expect(result.tier).toEqual('individual');
  });

  test('opens no retry ladder', () => {
    const result = classifyFailure(input(wait_input));

    expect(result.retry).toBeNull();
  });
});

describe('worker failure cause keys', () => {
  test('keeps the first two colon segments', () => {
    expect(
      causeKey('quickfix_landing_failed:delivery_unproven:absent')
    ).toEqual('quickfix_landing_failed:delivery_unproven');
  });

  test('appends the pattern group for session error causes', () => {
    expect(causeKey('session_failed:is_error', 'api')).toEqual(
      'session_failed:is_error:api'
    );
  });

  test('ignores the pattern group for other causes', () => {
    expect(causeKey('verify_cmd_spawn_error', 'api')).toEqual(
      'verify_cmd_spawn_error'
    );
  });

  test('excludes a prerequisite wait from promotion comparison', () => {
    expect(causeKey('prerequisite_unmet')).toBeNull();
  });
});

describe('worker session summary readers', () => {
  test('prefers a codex turn.failed message', () => {
    const events = [
      {
        type: 'item.completed',
        item: { type: 'agent_message', text: '작업 요약' }
      },
      { type: 'turn.failed', error: { message: 'API Error: 529 Overloaded' } }
    ];

    expect(codexSummary(events)).toEqual('API Error: 529 Overloaded');
  });

  test('falls back to the last codex agent message', () => {
    const events = [
      {
        type: 'item.completed',
        item: { type: 'agent_message', text: '첫 보고' }
      },
      {
        type: 'item.completed',
        item: { type: 'agent_message', text: '마지막 보고' }
      }
    ];

    expect(codexSummary(events)).toEqual('마지막 보고');
  });

  test('returns no_result when codex reported nothing', () => {
    expect(codexSummary([{ type: 'item.started' }])).toEqual('no_result');
  });

  test('reads the last claude result text', () => {
    const events = [
      { type: 'result', is_error: false, result: '이전 실행' },
      { type: 'result', is_error: false, result: '완료 보고\n둘째 줄' }
    ];

    expect(claudeSummary(events)).toEqual('완료 보고');
  });

  test('reads the claude error text when the run is flagged is_error', () => {
    const events = [
      { type: 'result', is_error: true, error: 'socket hang up' }
    ];

    expect(claudeSummary(events)).toEqual('socket hang up');
  });

  test('returns no_result when claude emitted no result event', () => {
    expect(claudeSummary([{ type: 'system' }])).toEqual('no_result');
  });
});
