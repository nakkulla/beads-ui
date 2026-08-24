import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { finalizeDelegationSessions } from './delegation-monitor.js';
import { createDelegationStore } from './delegation-store.js';
import { createQueueStore } from './queue-store.js';
import { liftDelegation } from './runner/claude.js';
import { createSessionLog } from './session-log.js';
import { createSessionMonitors } from './session-monitor.js';
import { replayUsage } from './usage-replay.js';
import { createUsageStore } from './usage-store.js';

const SUBAGENT_FIXTURE = fileURLToPath(
  new URL('./__fixtures__/claude-subagent.jsonl', import.meta.url)
);
const LAUNCH_A = 'toolu_01AgentAAAAAAAAAAAAAAAA';
const LAUNCH_B = 'toolu_01AgentBBBBBBBBBBBBBBBB';

/** @type {string} */
let tmp_state;
/** @type {string} */
let WS;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-delegation-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @returns {string}
 */
function fixtureText() {
  return fs.readFileSync(SUBAGENT_FIXTURE, 'utf8');
}

/**
 * @returns {any[]}
 */
function fixtureLines() {
  return fixtureText()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line));
}

/**
 * A session log whose read side hands back exactly these lines.
 *
 * @param {unknown[]} lines
 */
function fakeSessionLog(lines) {
  return /** @type {any} */ ({ read: () => lines });
}

/**
 * The live path: what the scheduler does per raw stream line.
 *
 * @param {ReturnType<typeof createDelegationStore>} store
 * @param {any[]} lines
 */
function feedLive(store, lines) {
  for (const raw of lines) {
    store.apply(WS, 'att-1', liftDelegation(raw));
  }
}

/**
 * Persist a `running` attempt and write the fixture to its session log, the way
 * an orphaned session left it behind.
 *
 * @param {any} store
 * @param {any} session_log
 */
function seedOrphan(store, session_log) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
  });
  store.updateAttempt(WS, {
    attempt_id: 'att-1',
    patch: { status: 'running', pid: 4242, started_at: 1000, repo: '/repo' }
  });
  const file = session_log.pathFor(WS, 'att-1');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, fixtureText());
  return store.snapshot(WS).attempts['att-1'];
}

describe('worker delegation replay + monitor (UI-2mpn §5.4)', () => {
  test('replays the fixture into the same state the live path builds', () => {
    const replayed = createDelegationStore();
    const live = createDelegationStore();

    replayUsage({
      session_log: fakeSessionLog(fixtureLines()),
      usage_store: createUsageStore(),
      delegation_store: replayed,
      workspace: WS,
      attempt_id: 'att-1',
      runner: 'claude'
    });
    feedLive(live, fixtureLines());

    expect(JSON.stringify(replayed.get(WS, 'att-1'))).toEqual(
      JSON.stringify(live.get(WS, 'att-1'))
    );
  });

  test('replays both launches with their observed status', () => {
    const store = createDelegationStore();

    replayUsage({
      session_log: fakeSessionLog(fixtureLines()),
      usage_store: createUsageStore(),
      delegation_store: store,
      workspace: WS,
      attempt_id: 'att-1',
      runner: 'claude'
    });

    expect(
      store
        .get(WS, 'att-1')
        .sessions.map((session) => [session.launch_id, session.status])
    ).toEqual([
      [LAUNCH_A, 'done'],
      [LAUNCH_B, 'failed']
    ]);
  });

  test('writes one receipt, for the launch whose result reported usage', () => {
    const store = createDelegationStore();

    replayUsage({
      session_log: fakeSessionLog(fixtureLines()),
      usage_store: createUsageStore(),
      delegation_store: store,
      workspace: WS,
      attempt_id: 'att-1',
      runner: 'claude'
    });

    expect(store.get(WS, 'att-1').legs).toEqual([
      {
        receipt_id: LAUNCH_A,
        provider: 'claude',
        role: 'subagent',
        agent_type: 'general-purpose',
        agent_id: 'agt_9f3c21d4c0',
        model: 'claude-sonnet-4-5-20250929',
        session_id: LAUNCH_A,
        turn_id: LAUNCH_A,
        effort: null,
        usage: {
          input_tokens: 30,
          output_tokens: 200,
          cache_read_input_tokens: 1000,
          cache_creation_input_tokens: 100,
          reasoning_output_tokens: 0
        },
        completed_at: Date.parse('2026-08-24T01:00:09.000Z')
      }
    ]);
  });

  test('records nothing when the log was written by the codex runner', () => {
    const store = createDelegationStore();

    replayUsage({
      session_log: fakeSessionLog(fixtureLines()),
      usage_store: createUsageStore(),
      delegation_store: store,
      workspace: WS,
      attempt_id: 'att-1',
      runner: 'codex'
    });

    expect(store.get(WS, 'att-1')).toEqual({ sessions: [], legs: [] });
  });

  test('builds the same state from a reattached monitor as from a replay', () => {
    const queue_store = createQueueStore();
    const session_log = createSessionLog();
    const monitored = createDelegationStore();
    const replayed = createDelegationStore();
    const attempt = seedOrphan(queue_store, session_log);
    const monitors = createSessionMonitors({
      store: queue_store,
      sessionLog: session_log,
      delegation: monitored,
      probePid: () => ({ alive: true, started_at: 1000 }),
      poll_ms: 5
    });

    monitors.start(WS, attempt, { start_offset: 0 });
    monitors.stop(WS, 'att-1');
    replayUsage({
      session_log: fakeSessionLog(fixtureLines()),
      usage_store: createUsageStore(),
      delegation_store: replayed,
      workspace: WS,
      attempt_id: 'att-1',
      runner: 'claude'
    });

    expect(JSON.stringify(monitored.get(WS, 'att-1'))).toEqual(
      JSON.stringify(replayed.get(WS, 'att-1'))
    );
  });

  test('republishes a subagent line under its launch id', () => {
    const queue_store = createQueueStore();
    const session_log = createSessionLog();
    const attempt = seedOrphan(queue_store, session_log);
    const monitors = createSessionMonitors({
      store: queue_store,
      sessionLog: session_log,
      probePid: () => ({ alive: true, started_at: 1000 }),
      poll_ms: 5
    });
    /** @type {any[]} */
    const appends = [];
    const off = session_log.subscribe((a) => appends.push(a), LAUNCH_A);

    monitors.start(WS, attempt, { start_offset: 0 });
    monitors.stop(WS, 'att-1');
    off();

    expect(appends.map((a) => /** @type {any} */ (a.event).uuid)).toEqual([
      'u-3',
      'u-4',
      'u-5'
    ]);
  });

  test('folds the live subagent state onto the attempt at settlement', () => {
    const delegation_store = createDelegationStore();
    const queue_store = createQueueStore({ delegationStore: delegation_store });
    queue_store.appendAttempt(WS, {
      expected_revision: queue_store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    queue_store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { status: 'running' }
    });
    feedLive(delegation_store, fixtureLines());

    queue_store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { status: 'done' }
    });

    const settled = queue_store.snapshot(WS).attempts['att-1'];
    expect(settled.delegation_sessions.map((s) => s.launch_id)).toEqual([
      LAUNCH_A,
      LAUNCH_B
    ]);
    expect(settled.usage_legs.map((leg) => leg.receipt_id)).toEqual([LAUNCH_A]);
    expect(delegation_store.get(WS, 'att-1')).toEqual({
      sessions: [],
      legs: []
    });
  });

  test('interrupts a still-running subagent when the parent settles', () => {
    const store = createDelegationStore();
    store.apply(WS, 'att-1', liftDelegation(fixtureLines()[2]));

    const finalized = finalizeDelegationSessions(
      store.get(WS, 'att-1').sessions,
      true
    );

    expect(finalized).toEqual([
      {
        launch_id: LAUNCH_A,
        provider: 'claude',
        role: 'subagent',
        agent_type: 'general-purpose',
        model: 'sonnet',
        effort: null,
        session_id: LAUNCH_A,
        turn_id: LAUNCH_A,
        status: 'interrupted',
        started_at: null,
        completed_at: null,
        last_event_at: null
      }
    ]);
  });
});
