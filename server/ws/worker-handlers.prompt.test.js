/**
 * Prompt inspection (UI-rxp3 §3/§5): the queue push must NOT carry the recorded
 * prompts, and the three on-demand requests are the only way to read them.
 */
import { describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {Record<string, any>} */
  attempts: {}
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      snapshot: () => ({ revision: 1, attempts: state.attempts })
    },
    usageStore: { get: () => null },
    sessionLog: { lastEventAt: () => null }
  })
}));

const { setConnWorkspace } = await import('./context.js');
const {
  attemptsWithUsage,
  handleGetAttemptPrompt,
  handleGetBeadPrompt,
  handleGetWorkerSystemPrompt
} = await import('./worker-handlers.js');
const { applyPreamble, defaultTaskPrompt } =
  await import('../worker/runner/preamble.js');

const WS = '/tmp/example-workspace/project-a';

/**
 * @returns {any}
 */
function fakeSocket() {
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
  setConnWorkspace(/** @type {any} */ (sock), {
    root_dir: WS,
    db_path: ''
  });
  return sock;
}

/**
 * @param {any} sock
 * @returns {any}
 */
function lastPayload(sock) {
  return JSON.parse(sock.sent[sock.sent.length - 1]).payload;
}

/**
 * @param {any} sock
 * @returns {any}
 */
function lastReply(sock) {
  return JSON.parse(sock.sent[sock.sent.length - 1]);
}

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function recordedAttempt(over = {}) {
  return {
    attempt_id: 'a1',
    bead_id: 'UI-1',
    status: 'done',
    started_at: 1_700_000_000_000,
    system_prompt: '## 무인 모드\n\n계약 전문',
    task_prompt: 'Bead UI-1 작업을 계약 네이티브 흐름으로 완료하라.',
    ...over
  };
}

describe('worker-state push prompt stripping (UI-rxp3 §3)', () => {
  test('drops both prompt fields from the pushed attempt', () => {
    const out = attemptsWithUsage(
      { attempts: { a1: recordedAttempt({ status: 'running' }) } },
      WS
    );

    expect('system_prompt' in /** @type {any} */ (out.a1)).toBe(false);
    expect('task_prompt' in /** @type {any} */ (out.a1)).toBe(false);
  });

  test('keeps every other field of the attempt', () => {
    const out = attemptsWithUsage({ attempts: { a1: recordedAttempt() } }, WS);

    expect(/** @type {any} */ (out.a1).attempt_id).toBe('a1');
    expect(/** @type {any} */ (out.a1).bead_id).toBe('UI-1');
    expect(/** @type {any} */ (out.a1).started_at).toBe(1_700_000_000_000);
  });

  test('keeps usage legs while stripping every prompt field', () => {
    const out = attemptsWithUsage(
      {
        attempts: {
          a1: recordedAttempt({
            status: 'running',
            usage_legs: [
              {
                receipt_id: 'launch-1',
                provider: 'codex',
                role: 'implementation',
                session_id: 'thread-1',
                turn_id: 'turn-1',
                model: 'gpt-5.6-terra',
                usage: {
                  input_tokens: 1,
                  output_tokens: 1,
                  cache_read_input_tokens: 0,
                  cache_creation_input_tokens: 0,
                  reasoning_output_tokens: 0
                },
                completed_at: '2026-08-11T12:34:56Z'
              }
            ]
          })
        }
      },
      WS
    );

    expect(/** @type {any} */ (out.a1).usage_legs).toHaveLength(1);
    expect('system_prompt' in /** @type {any} */ (out.a1)).toBe(false);
    expect('task_prompt' in /** @type {any} */ (out.a1)).toBe(false);
  });

  test('leaves the durable record itself untouched', () => {
    const attempt = recordedAttempt();

    attemptsWithUsage({ attempts: { a1: attempt } }, WS);

    expect(attempt.system_prompt).toBe('## 무인 모드\n\n계약 전문');
    expect(attempt.task_prompt).toContain('Bead UI-1');
  });

  test('drops the disposition lane task prompt too', () => {
    const out = attemptsWithUsage(
      {
        attempts: {
          a1: recordedAttempt({
            disposition: 'revise_fix',
            disposition_prompt: '처분 과업 본문'
          })
        }
      },
      WS
    );

    expect('disposition_prompt' in /** @type {any} */ (out.a1)).toBe(false);
    expect(/** @type {any} */ (out.a1).disposition).toBe('revise_fix');
  });

  test('passes a legacy attempt with no prompt fields through', () => {
    const out = attemptsWithUsage(
      {
        attempts: {
          a1: { attempt_id: 'a1', bead_id: 'UI-1', status: 'failed' }
        }
      },
      WS
    );

    expect(/** @type {any} */ (out.a1).attempt_id).toBe('a1');
  });
});

describe('get-attempt-prompt (UI-rxp3 §5)', () => {
  test('returns the recorded send for a known attempt', () => {
    state.attempts = { a1: recordedAttempt() };
    const sock = fakeSocket();

    handleGetAttemptPrompt(sock, {
      id: 'r1',
      type: 'get-attempt-prompt',
      payload: { attempt_id: 'a1' }
    });

    const payload = lastPayload(sock);
    expect(payload.attempt_id).toBe('a1');
    expect(payload.system_prompt).toContain('무인 모드');
    expect(payload.task_prompt).toContain('Bead UI-1');
    expect(payload.recorded_at).toBe(1_700_000_000_000);
  });

  test('reports missing for an attempt recorded before the fields existed', () => {
    state.attempts = { a1: { attempt_id: 'a1', bead_id: 'UI-1' } };
    const sock = fakeSocket();

    handleGetAttemptPrompt(sock, {
      id: 'r1',
      type: 'get-attempt-prompt',
      payload: { attempt_id: 'a1' }
    });

    expect(lastPayload(sock)).toEqual({ missing: true });
  });

  test('reports missing for an attempt of another workspace', () => {
    state.attempts = {};
    const sock = fakeSocket();

    handleGetAttemptPrompt(sock, {
      id: 'r1',
      type: 'get-attempt-prompt',
      payload: { attempt_id: 'elsewhere' }
    });

    expect(lastPayload(sock)).toEqual({ missing: true });
  });

  test('rejects a payload with no attempt_id', () => {
    state.attempts = {};
    const sock = fakeSocket();

    handleGetAttemptPrompt(sock, {
      id: 'r1',
      type: 'get-attempt-prompt',
      payload: {}
    });

    expect(lastReply(sock).ok).toBe(false);
    expect(lastReply(sock).error.code).toBe('bad_request');
  });
});

describe('get-bead-prompt (UI-rxp3 §5)', () => {
  test('returns the newest recorded attempt of the bead', () => {
    state.attempts = {
      old: recordedAttempt({
        attempt_id: 'old',
        started_at: 1,
        task_prompt: '오래된 과업'
      }),
      new: recordedAttempt({
        attempt_id: 'new',
        started_at: 2,
        task_prompt: '최신 과업'
      })
    };
    const sock = fakeSocket();

    handleGetBeadPrompt(sock, {
      id: 'r1',
      type: 'get-bead-prompt',
      payload: { bead_id: 'UI-1' }
    });

    expect(lastPayload(sock).attempt_id).toBe('new');
    expect(lastPayload(sock).task_prompt).toBe('최신 과업');
  });

  test('skips attempts that recorded no prompt', () => {
    state.attempts = {
      newer: { attempt_id: 'newer', bead_id: 'UI-1', started_at: 9 },
      older: recordedAttempt({ attempt_id: 'older', started_at: 1 })
    };
    const sock = fakeSocket();

    handleGetBeadPrompt(sock, {
      id: 'r1',
      type: 'get-bead-prompt',
      payload: { bead_id: 'UI-1' }
    });

    expect(lastPayload(sock).attempt_id).toBe('older');
  });

  test('ignores attempts of another bead', () => {
    state.attempts = {
      a1: recordedAttempt({ bead_id: 'UI-2', task_prompt: '남의 과업' })
    };
    const sock = fakeSocket();

    handleGetBeadPrompt(sock, {
      id: 'r1',
      type: 'get-bead-prompt',
      payload: { bead_id: 'UI-1' }
    });

    expect(lastPayload(sock).missing).toBe(true);
  });

  test('previews the default task prompt when nothing was ever recorded', () => {
    state.attempts = {};
    const sock = fakeSocket();

    handleGetBeadPrompt(sock, {
      id: 'r1',
      type: 'get-bead-prompt',
      payload: { bead_id: 'UI-9' }
    });

    expect(lastPayload(sock)).toEqual({
      missing: true,
      default_task_prompt: defaultTaskPrompt('UI-9')
    });
  });

  test('rejects a payload with no bead_id', () => {
    state.attempts = {};
    const sock = fakeSocket();

    handleGetBeadPrompt(sock, {
      id: 'r1',
      type: 'get-bead-prompt',
      payload: {}
    });

    expect(lastReply(sock).ok).toBe(false);
  });
});

describe('get-worker-system-prompt (UI-rxp3 §4)', () => {
  test('returns the dispatch default the scheduler actually launches with', () => {
    const sock = fakeSocket();

    handleGetWorkerSystemPrompt(sock, {
      id: 'r1',
      type: 'get-worker-system-prompt',
      payload: {}
    });

    const payload = lastPayload(sock);
    expect(payload.system_prompt).toBe(
      applyPreamble('', {
        fast_track: true,
        target_base: payload.target_base_placeholder
      }).system_prompt
    );
    expect(payload.system_prompt).toContain('## fast_track');
    expect(payload.system_prompt).toContain('PR 제출까지 수행하고');
  });

  test('labels the conditional variants with the condition that selects them', () => {
    const sock = fakeSocket();

    handleGetWorkerSystemPrompt(sock, {
      id: 'r1',
      type: 'get-worker-system-prompt',
      payload: {}
    });

    const payload = lastPayload(sock);
    const keys = payload.variants.map((/** @type {any} */ v) => v.key);
    expect(keys).toEqual(['dispatch', 'disposition']);
    for (const variant of payload.variants) {
      expect(variant.label.length).toBeGreaterThan(0);
      expect(variant.condition.length).toBeGreaterThan(0);
      expect(variant.system_prompt.length).toBeGreaterThan(0);
    }
  });

  test('carries the disposition variant without the PR-submit directive', () => {
    const sock = fakeSocket();

    handleGetWorkerSystemPrompt(sock, {
      id: 'r1',
      type: 'get-worker-system-prompt',
      payload: {}
    });

    const variant = lastPayload(sock).variants.find(
      (/** @type {any} */ v) => v.key === 'disposition'
    );
    expect(variant.system_prompt).not.toContain('PR 제출까지 수행하고');
    expect(variant.system_prompt).toContain('REVISE 처분 세션');
  });
});
