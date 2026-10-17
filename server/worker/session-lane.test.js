import { describe, expect, test } from 'vitest';
import {
  sessionLaneAwaitsAnswer,
  sessionLaneCommandArgs,
  sessionLaneEnv,
  sessionLaneHoldsWindow,
  sessionLanePaneAlive,
  sessionLaneVerdict
} from './session-lane.js';

describe('sessionLaneCommandArgs (UI-lbm5 §4.3)', () => {
  test('starts claude on the pre-chosen session id with the contract channel', () => {
    const args = sessionLaneCommandArgs({
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-1',
      system_prompt: '세션 레인: ...',
      task_prompt: 'Bead X 작업을 계약 네이티브 흐름으로 완료하라.'
    });

    expect(args).toEqual([
      '--session-id',
      'sid-1',
      '--model',
      'opus',
      '--effort',
      'high',
      '--append-system-prompt',
      '세션 레인: ...',
      'Bead X 작업을 계약 네이티브 흐름으로 완료하라.'
    ]);
  });

  test('resumes a claude session by its id', () => {
    const args = sessionLaneCommandArgs({
      runner: 'claude',
      session_id: 'sid-1',
      resume_session_id: 'sid-1',
      system_prompt: 'S',
      task_prompt: 'T'
    });

    expect(args.slice(0, 2)).toEqual(['--resume', 'sid-1']);
    expect(args).not.toContain('--session-id');
  });

  test('prefixes the contract to the first codex input', () => {
    const args = sessionLaneCommandArgs({
      runner: 'codex',
      model: 'sol',
      effort: 'high',
      system_prompt: 'S',
      task_prompt: 'T'
    });

    expect(args).toEqual([
      '-m',
      'sol',
      '-c',
      'model_reasoning_effort=high',
      'S\n\nT'
    ]);
  });

  test('resumes a codex thread with its flags after the subcommand', () => {
    const args = sessionLaneCommandArgs({
      runner: 'codex',
      model: 'sol',
      resume_session_id: 'th-1',
      system_prompt: 'S',
      task_prompt: 'T'
    });

    expect(args).toEqual(['resume', '-m', 'sol', 'th-1', 'S\n\nT']);
  });
});

describe('sessionLaneEnv (UI-lbm5 §4.3)', () => {
  test('carries the guard, recovery and account layers without Worker markers', () => {
    const env = sessionLaneEnv({
      repo: '/repo',
      bead_id: 'UI-1',
      recovery_env: { BDUI_WORK_RECOVERY_READY: '1' },
      guard_env: {
        GIT_CONFIG_COUNT: '1',
        GIT_CONFIG_KEY_0: 'core.hooksPath',
        GIT_CONFIG_VALUE_0: '/hooks'
      },
      account_env: {
        CODEX_HOME: '/codex/acct',
        BDUI_ATTEMPT_ID: 'leak',
        CLAUDE_HOOK_SUPPRESS: '1'
      }
    });

    expect(env).toEqual({
      WORKFLOW_REPO_ROOT: '/repo',
      WORKFLOW_BEAD_ID: 'UI-1',
      BDUI_WORK_RECOVERY_READY: '1',
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'core.hooksPath',
      GIT_CONFIG_VALUE_0: '/hooks',
      CODEX_HOME: '/codex/acct'
    });
  });
});

describe('sessionLaneVerdict (UI-lbm5 §4.5)', () => {
  test('reads a terminal result line as a headless-shaped verdict', () => {
    expect(sessionLaneVerdict({ first_line: '성공 · PR #3' })).toMatchObject({
      success: true,
      reason: 'ok',
      summary: '성공 · PR #3',
      terminal_result: { kind: 'success' },
      exit: null,
      blocked: false
    });
  });

  test('reads a non-result message as no verdict', () => {
    expect(sessionLaneVerdict({ first_line: '어느 쪽으로 갈까요?' })).toBe(
      null
    );
  });
});

describe('sessionLaneHoldsWindow (UI-mcth §4.1)', () => {
  test.each(['parked', 'failure', 'environment', 'recovery_wait'])(
    'holds the window for a %s result',
    (kind) => {
      expect(sessionLaneHoldsWindow({ kind })).toBe(true);
    }
  );

  test.each(['success', 'waiting_blocks', 'waiting_external', 'base_moved'])(
    'settles a %s result',
    (kind) => {
      expect(sessionLaneHoldsWindow({ kind })).toBe(false);
    }
  );

  test('settles no result line at all', () => {
    expect(sessionLaneHoldsWindow(null)).toBe(false);
  });
});

describe('sessionLaneAwaitsAnswer (UI-lbm5 §4.4)', () => {
  test('waits on a question prompt', () => {
    expect(sessionLaneAwaitsAnswer('question', null)).toBe(true);
  });

  test('waits on an idle turn whose last message is no result line', () => {
    expect(
      sessionLaneAwaitsAnswer('idle', { first_line: '확인 부탁드립니다' })
    ).toBe(true);
  });

  test('does not wait on an idle turn that ended with a settling result line', () => {
    expect(
      sessionLaneAwaitsAnswer('idle', { first_line: '성공 · PR #1' })
    ).toBe(false);
  });

  test.each([
    '파킹 · 판단',
    '실패 · 원인',
    '환경 · 도구',
    '대기 · recovery:authority'
  ])('waits on an idle turn that ended with the hold line %s', (first_line) => {
    expect(sessionLaneAwaitsAnswer('idle', { first_line })).toBe(true);
  });

  test('does not wait while the turn runs', () => {
    expect(sessionLaneAwaitsAnswer('running', { first_line: '진행 중' })).toBe(
      false
    );
  });
});

describe('sessionLanePaneAlive (UI-lbm5 §4.4)', () => {
  test('finds the attempt pane by Bead key and pane id', () => {
    expect(
      sessionLanePaneAlive([{ key: 'UI-1', pane: '%2', dead: '0' }], {
        bead_id: 'UI-1',
        interactive: { pane_id: '%2' }
      })
    ).toBe(true);
  });

  test('reads a dead pane as gone', () => {
    expect(
      sessionLanePaneAlive([{ key: 'UI-1', pane: '%2', dead: '1' }], {
        bead_id: 'UI-1',
        interactive: { pane_id: '%2' }
      })
    ).toBe(false);
  });

  test('reads another pane of the same Bead as gone', () => {
    expect(
      sessionLanePaneAlive([{ key: 'UI-1', pane: '%5', dead: '0' }], {
        bead_id: 'UI-1',
        interactive: { pane_id: '%2' }
      })
    ).toBe(false);
  });
});
