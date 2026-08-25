import { describe, expect, test } from 'vitest';
import { createDelegationStore } from './delegation-store.js';

const WS = '/tmp/ws';
const ATTEMPT = 'att-1';
const LAUNCH = 'toolu_01AgentAAAAAAAAAAAAAAAA';

/**
 * @param {Partial<{ agent_type: string|null, model_alias: string|null, at: number|null }>} [over]
 * @returns {any}
 */
function start(over = {}) {
  return {
    kind: 'start',
    launch_id: LAUNCH,
    agent_type: over.agent_type ?? 'general-purpose',
    model_alias: over.model_alias ?? 'sonnet',
    at: over.at === undefined ? 1000 : over.at
  };
}

/**
 * @param {Partial<{ model: string|null, proves_session: boolean, at: number|null }>} [over]
 * @returns {any}
 */
function progress(over = {}) {
  return {
    kind: 'progress',
    launch_id: LAUNCH,
    model: over.model === undefined ? 'claude-sonnet-4-5-20250929' : over.model,
    proves_session: over.proves_session ?? true,
    at: over.at === undefined ? 2000 : over.at
  };
}

/**
 * @param {Partial<{ at: number|null }>} [over]
 * @returns {any}
 */
function launchAck(over = {}) {
  return {
    kind: 'launch_ack',
    launch_id: LAUNCH,
    at: over.at === undefined ? 1500 : over.at
  };
}

/**
 * The end a `task_notification` lifts (UI-1663 §5.1): a total, no breakdown, no
 * timestamp of its own.
 *
 * @param {Partial<{ result_status: string|null, total_tokens: number|null }>} [over]
 * @returns {any}
 */
function notification(over = {}) {
  return end({
    source: 'notification',
    result_status:
      over.result_status === undefined ? 'completed' : over.result_status,
    agent_id: 'agt_7d21ba90ff',
    agent_type: null,
    model: null,
    usage: null,
    total_tokens: over.total_tokens === undefined ? 219570 : over.total_tokens,
    at: null
  });
}

/**
 * @param {Partial<{ source: 'tool_result'|'notification', is_error: boolean, result_status: string|null, agent_id: string|null, agent_type: string|null, model: string|null, usage: any, total_tokens: number|null, at: number|null }>} [over]
 * @returns {any}
 */
function end(over = {}) {
  return {
    kind: 'end',
    source: over.source ?? 'tool_result',
    launch_id: LAUNCH,
    is_error: over.is_error ?? false,
    result_status:
      over.result_status === undefined ? 'completed' : over.result_status,
    agent_id: over.agent_id === undefined ? 'agt_9f3c21d4c0' : over.agent_id,
    agent_type:
      over.agent_type === undefined ? 'general-purpose' : over.agent_type,
    model: over.model === undefined ? 'claude-sonnet-4-5-20250929' : over.model,
    usage:
      over.usage === undefined
        ? {
            input_tokens: 30,
            output_tokens: 200,
            cache_read_input_tokens: 1000,
            cache_creation_input_tokens: 100
          }
        : over.usage,
    total_tokens: over.total_tokens === undefined ? 1330 : over.total_tokens,
    at: over.at === undefined ? 3000 : over.at
  };
}

describe('worker/delegation-store (UI-2mpn §5.2)', () => {
  test('returns empty lists for an attempt with no signal', () => {
    const store = createDelegationStore();

    expect(store.get(WS, ATTEMPT)).toEqual({ sessions: [], legs: [] });
  });

  test('creates a running session from a start', () => {
    const store = createDelegationStore();

    store.apply(WS, ATTEMPT, start());

    expect(store.get(WS, ATTEMPT).sessions).toEqual([
      {
        launch_id: LAUNCH,
        provider: 'claude',
        role: 'subagent',
        agent_type: 'general-purpose',
        model: 'sonnet',
        effort: null,
        session_id: LAUNCH,
        turn_id: LAUNCH,
        status: 'running',
        started_at: 1000,
        completed_at: null,
        last_event_at: 1000
      }
    ]);
  });

  test('leaves both time fields null for a start with no timestamp', () => {
    const store = createDelegationStore();

    store.apply(WS, ATTEMPT, start({ at: null }));

    expect(store.get(WS, ATTEMPT).sessions[0]).toMatchObject({
      started_at: null,
      last_event_at: null
    });
  });

  test('settles the model on a progress that reports one', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start({ model_alias: null }));

    store.apply(WS, ATTEMPT, progress());

    expect(store.get(WS, ATTEMPT).sessions[0]).toMatchObject({
      model: 'claude-sonnet-4-5-20250929',
      last_event_at: 2000
    });
  });

  test('keeps last_event_at when a progress carries no timestamp', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, progress({ at: null }));

    expect(store.get(WS, ATTEMPT).sessions[0].last_event_at).toBe(1000);
  });

  test('creates a running session from a progress that missed its start', () => {
    const store = createDelegationStore();

    store.apply(WS, ATTEMPT, progress({ model: null }));

    expect(store.get(WS, ATTEMPT).sessions).toEqual([
      {
        launch_id: LAUNCH,
        provider: 'claude',
        role: 'subagent',
        agent_type: null,
        model: null,
        effort: null,
        session_id: LAUNCH,
        turn_id: LAUNCH,
        status: 'running',
        started_at: 2000,
        completed_at: null,
        last_event_at: 2000
      }
    ]);
  });

  test('ignores a tool_progress-only launch that never started', () => {
    const store = createDelegationStore();

    const changed = store.apply(
      WS,
      ATTEMPT,
      progress({ model: null, proves_session: false })
    );

    expect(changed).toBe(false);
    expect(store.get(WS, ATTEMPT).sessions).toEqual([]);
  });

  test('advances last_event_at on a tool_progress for a started session', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(
      WS,
      ATTEMPT,
      progress({ model: null, proves_session: false, at: 2500 })
    );

    expect(store.get(WS, ATTEMPT).sessions[0].last_event_at).toBe(2500);
  });

  test('closes a session as done and writes its receipt', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end());

    expect(store.get(WS, ATTEMPT)).toEqual({
      sessions: [
        {
          launch_id: LAUNCH,
          provider: 'claude',
          role: 'subagent',
          agent_type: 'general-purpose',
          model: 'claude-sonnet-4-5-20250929',
          effort: null,
          session_id: LAUNCH,
          turn_id: LAUNCH,
          status: 'done',
          started_at: 1000,
          completed_at: 3000,
          last_event_at: 3000
        }
      ],
      legs: [
        {
          receipt_id: LAUNCH,
          provider: 'claude',
          role: 'subagent',
          agent_type: 'general-purpose',
          agent_id: 'agt_9f3c21d4c0',
          model: 'claude-sonnet-4-5-20250929',
          session_id: LAUNCH,
          turn_id: LAUNCH,
          effort: null,
          usage: {
            input_tokens: 30,
            output_tokens: 200,
            cache_read_input_tokens: 1000,
            cache_creation_input_tokens: 100,
            reasoning_output_tokens: 0
          },
          completed_at: 3000
        }
      ]
    });
  });

  test('closes a session as failed on is_error', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end({ is_error: true, result_status: null }));

    expect(store.get(WS, ATTEMPT).sessions[0].status).toBe('failed');
  });

  test('closes a session as failed on a non-completed result status', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end({ result_status: 'aborted' }));

    expect(store.get(WS, ATTEMPT).sessions[0].status).toBe('failed');
  });

  test('closes a session as done when the result reported no status', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end({ result_status: null }));

    expect(store.get(WS, ATTEMPT).sessions[0].status).toBe('done');
  });

  test('writes no receipt for an end with no usage', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end({ usage: null, total_tokens: null }));

    const entry = store.get(WS, ATTEMPT);
    expect(entry.legs).toEqual([]);
    expect(entry.sessions[0].status).toBe('done');
  });

  test('keeps the reported usage when total_tokens disagrees with it', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, end({ total_tokens: 7 }));

    expect(store.get(WS, ATTEMPT).legs[0].usage).toMatchObject({
      input_tokens: 30
    });
  });

  test('pins an observed effort on the closed session and its receipt', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, end());

    const changed = store.setEffort(WS, ATTEMPT, LAUNCH, 'low');

    expect(changed).toBe(true);
    const { sessions, legs } = store.get(WS, ATTEMPT);
    expect(sessions[0].effort).toBe('low');
    expect(legs[0].effort).toBe('low');
  });

  test('reports no change for an empty effort or an unknown launch', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    expect(store.setEffort(WS, ATTEMPT, LAUNCH, '')).toBe(false);
    expect(store.setEffort(WS, ATTEMPT, 'toolu_other', 'low')).toBe(false);
    expect(store.get(WS, ATTEMPT).sessions[0].effort).toBe(null);
  });

  test('ignores an end for a launch it never saw start', () => {
    const store = createDelegationStore();

    const changed = store.apply(WS, ATTEMPT, end());

    expect(changed).toBe(false);
    expect(store.get(WS, ATTEMPT)).toEqual({ sessions: [], legs: [] });
  });

  test('leaves a launch_ack session running and advances its activity time', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    const changed = store.apply(WS, ATTEMPT, launchAck());

    expect(changed).toBe(true);
    const entry = store.get(WS, ATTEMPT);
    expect(entry.sessions[0]).toEqual({
      launch_id: LAUNCH,
      provider: 'claude',
      role: 'subagent',
      agent_type: 'general-purpose',
      model: 'sonnet',
      effort: null,
      session_id: LAUNCH,
      turn_id: LAUNCH,
      status: 'running',
      started_at: 1000,
      completed_at: null,
      last_event_at: 1500
    });
    expect(entry.legs).toEqual([]);
  });

  test('ignores a launch_ack for a launch it never saw start', () => {
    const store = createDelegationStore();

    expect(store.apply(WS, ATTEMPT, launchAck())).toBe(false);
    expect(store.get(WS, ATTEMPT).sessions).toEqual([]);
  });

  test('closes a background session as done with a total-only receipt', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, progress({ at: 2000 }));

    store.apply(WS, ATTEMPT, notification());

    const entry = store.get(WS, ATTEMPT);
    expect(entry.sessions[0].status).toBe('done');
    expect(entry.legs).toEqual([
      {
        receipt_id: LAUNCH,
        provider: 'claude',
        role: 'subagent',
        agent_type: 'general-purpose',
        agent_id: 'agt_7d21ba90ff',
        model: 'claude-sonnet-4-5-20250929',
        session_id: LAUNCH,
        turn_id: LAUNCH,
        effort: null,
        usage: { total_tokens: 219570 },
        completed_at: 2000
      }
    ]);
  });

  test('falls back to last_event_at when the closing line carries no time', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, progress({ at: 2400 }));

    store.apply(WS, ATTEMPT, notification());

    expect(store.get(WS, ATTEMPT).sessions[0].completed_at).toBe(2400);
  });

  test('closes a session as failed on a non-completed notification status', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, notification({ result_status: 'killed' }));

    expect(store.get(WS, ATTEMPT).sessions[0].status).toBe('failed');
  });

  test('writes no receipt for a notification reporting no total', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.apply(WS, ATTEMPT, notification({ total_tokens: null }));

    const entry = store.get(WS, ATTEMPT);
    expect(entry.legs).toEqual([]);
    expect(entry.sessions[0].status).toBe('done');
  });

  test('replaces a total-only receipt with the four-field tool_result', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, notification());

    store.apply(WS, ATTEMPT, end());

    const entry = store.get(WS, ATTEMPT);
    expect(entry.legs).toHaveLength(1);
    expect(entry.legs[0].usage).toEqual({
      input_tokens: 30,
      output_tokens: 200,
      cache_read_input_tokens: 1000,
      cache_creation_input_tokens: 100,
      reasoning_output_tokens: 0
    });
    expect(entry.sessions[0].completed_at).toBe(3000);
  });

  test('drops the total-only receipt when the tool_result reports no usage', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, notification());

    store.apply(WS, ATTEMPT, end({ usage: null, total_tokens: null }));

    const entry = store.get(WS, ATTEMPT);
    expect(entry.legs).toEqual([]);
    expect(entry.sessions[0].completed_at).toBe(3000);
  });

  test('ignores a late notification for a four-field closed session', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, end());

    const changed = store.apply(WS, ATTEMPT, notification());

    expect(changed).toBe(false);
    const entry = store.get(WS, ATTEMPT);
    expect(entry.legs[0].usage).toMatchObject({ input_tokens: 30 });
    expect(entry.sessions[0].completed_at).toBe(3000);
  });

  test('ignores a second end for an already closed session', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());
    store.apply(WS, ATTEMPT, end());

    store.apply(WS, ATTEMPT, end());

    expect(store.get(WS, ATTEMPT).legs).toHaveLength(1);
  });

  test('reports no change for a repeated start', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    expect(store.apply(WS, ATTEMPT, start())).toBe(false);
  });

  test('reports no change for a null signal', () => {
    const store = createDelegationStore();

    expect(store.apply(WS, ATTEMPT, null)).toBe(false);
  });

  test('drops one attempt on clearAttempt', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.clearAttempt(WS, ATTEMPT);

    expect(store.get(WS, ATTEMPT)).toEqual({ sessions: [], legs: [] });
  });

  test('resolves the workspace key so writer and reader share one lane', () => {
    const store = createDelegationStore();

    store.apply(`${WS}/../ws`, ATTEMPT, start());

    expect(store.get(WS, ATTEMPT).sessions).toHaveLength(1);
  });

  test('returns copies a caller cannot mutate back into the store', () => {
    const store = createDelegationStore();
    store.apply(WS, ATTEMPT, start());

    store.get(WS, ATTEMPT).sessions[0].status = 'failed';

    expect(store.get(WS, ATTEMPT).sessions[0].status).toBe('running');
  });
});
