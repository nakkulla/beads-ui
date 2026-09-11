import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createTailReader } from './runner/tail-reader.js';
import { createSessionMonitors } from './session-monitor.js';
import {
  createSessionObservationStore,
  createWorkerSessionObservationStore,
  foldCodexAttemptUsage,
  foldSessionObservation
} from './session-observation.js';
import { readSessionSnapshot } from './session-ref.js';

const FIXTURE = new URL(
  './__fixtures__/codex-native-child-rollout.jsonl',
  import.meta.url
);

describe('worker/session-observation', () => {
  test('deduplicates Codex raw usage forms and keeps live cumulative values', () => {
    const text = fs
      .readFileSync(FIXTURE, 'utf8')
      .split('\n')
      .slice(0, 33)
      .join('\n');

    const observed = foldSessionObservation('codex', text);

    expect(observed.usage).toMatchObject({
      input_tokens: 56733,
      cache_read_input_tokens: 37376,
      output_tokens: 448,
      reasoning_output_tokens: 146,
      total_tokens: 57181
    });
    expect(observed.usage_legs).toHaveLength(1);
    expect(observed.usage_legs[0].model).toBe('gpt-5.6-sol');
  });

  test('replaces one turn and adds a later model turn', () => {
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'model-a' } },
      {
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 10, output_tokens: 1 },
          thread_token_usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 20, output_tokens: 2 },
          thread_token_usage: { input_tokens: 20, output_tokens: 2 }
        }
      },
      { type: 'turn_context', payload: { turn_id: 't2', model: 'model-b' } },
      {
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't2',
          turn_token_usage: { input_tokens: 5, output_tokens: 3 },
          thread_token_usage: { input_tokens: 25, output_tokens: 5 }
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );

    expect(observed.usage).toMatchObject({
      input_tokens: 25,
      output_tokens: 5
    });
    expect(
      observed.usage_legs.map((leg) => [leg.model, leg.usage.input_tokens])
    ).toEqual([
      ['model-a', 20],
      ['model-b', 5]
    ]);
  });

  test('uses turn.completed as the authoritative value for its current turn', () => {
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'model-a' } },
      {
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        type: 'turn.completed',
        usage: {
          input_tokens: 12,
          cached_input_tokens: 4,
          output_tokens: 2
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );

    expect(observed.usage_legs).toHaveLength(1);
    expect(observed.usage_legs[0].usage).toMatchObject({
      input_tokens: 12,
      cache_read_input_tokens: 4,
      output_tokens: 2
    });
  });

  test('keeps an unknown thread-total residual as an unpriced partial segment', () => {
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'model-a' } },
      {
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        type: 'event_msg',
        payload: {
          type: 'token_count',
          info: { total_token_usage: { input_tokens: 15, output_tokens: 2 } }
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );

    expect(observed.usage_legs[1]).toMatchObject({
      model: null,
      partial: true,
      usage: { input_tokens: 5, output_tokens: 1 }
    });
  });

  test('subtracts a resumed attempt baseline within the same turn', () => {
    const rows = [
      {
        timestamp: '2026-09-11T00:00:00.000Z',
        type: 'session_meta',
        payload: { id: 'root' }
      },
      {
        timestamp: '2026-09-11T00:00:01.000Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'gpt-5.6-sol' }
      },
      {
        timestamp: '2026-09-11T00:00:02.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 100, output_tokens: 10 }
        }
      },
      {
        timestamp: '2026-09-11T00:00:04.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 140, output_tokens: 14 }
        }
      }
    ];

    const legs = foldCodexAttemptUsage(
      rows,
      Date.parse('2026-09-11T00:00:03.000Z'),
      null
    );

    expect(legs).toHaveLength(1);
    expect(/** @type {any} */ (legs[0]).usage).toMatchObject({
      input_tokens: 40,
      output_tokens: 4
    });
  });

  test('keeps Claude root and Agent lifecycle accounting separate', () => {
    const text = fs.readFileSync(
      new URL('./__fixtures__/claude-subagent.jsonl', import.meta.url),
      'utf8'
    );

    const observed = foldSessionObservation('claude', text, {
      session_id: 'claude-root'
    });

    expect(observed.usage).not.toBeNull();
    expect(observed.delegations.length).toBeGreaterThan(0);
    expect(observed.usage_legs.some((leg) => leg.role === 'subagent')).toBe(
      true
    );
    expect(
      observed.delegations.some(
        (session) =>
          session.status === 'done' && /** @type {any} */ (session).usage
      )
    ).toBe(true);
  });

  test('shares a reader and disposes it after the last reference', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-observation-'));
    const file = path.join(dir, 'session.jsonl');
    fs.writeFileSync(
      file,
      `${JSON.stringify({ type: 'session_meta', payload: { id: 'root' } })}\n`
    );
    const stop = vi.fn();
    const createReader = vi.fn(() => ({
      start: vi.fn(),
      stop,
      pump: vi.fn(),
      drain: vi.fn(),
      offset: vi.fn(() => 0)
    }));
    const store = createSessionObservationStore({ createReader });

    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'root', file },
      { bead_id: 'B', provider: 'codex', session_id: 'root', file }
    ]);
    store.reconcile('/workspace', [
      { bead_id: 'B', provider: 'codex', session_id: 'root', file }
    ]);

    expect(createReader).toHaveBeenCalledTimes(1);
    expect(stop).not.toHaveBeenCalled();

    store.reconcile('/workspace', []);

    expect(stop).toHaveBeenCalledTimes(1);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('detaches an old reader when one card switches session reference', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-switch-'));
    const first = path.join(dir, 'first.jsonl');
    const second = path.join(dir, 'second.jsonl');
    fs.writeFileSync(first, '{"type":"session_meta","payload":{"id":"a"}}\n');
    fs.writeFileSync(second, '{"type":"session_meta","payload":{"id":"b"}}\n');
    const readers = new Map();
    const createReader = vi.fn((input) => {
      const reader = {
        start: vi.fn(),
        stop: vi.fn(),
        pump: vi.fn(),
        drain: vi.fn(),
        offset: vi.fn(() => 0)
      };
      readers.set(input.file, { input, reader });
      return reader;
    });
    const store = createSessionObservationStore({ createReader });

    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'a', file: first }
    ]);
    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'b', file: second }
    ]);
    readers
      .get(first)
      .input.onLine('{"type":"session_meta","payload":{"id":"a-old"}}');

    expect(store.readerCount()).toBe(1);
    expect(readers.get(first).reader.stop).toHaveBeenCalledTimes(1);
    expect(store.get('/workspace', 'A')?.session_id).toBe('b');
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('reads one snapshot for simultaneous consumers and no snapshot on append', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-shared-'));
    const file = path.join(dir, 'session.jsonl');
    fs.writeFileSync(file, '{"type":"session_meta","payload":{"id":"root"}}\n');
    /** @type {any} */
    /** @type {any} */
    /** @type {any} */
    let input;
    const readSnapshot = vi.fn(readSessionSnapshot);
    const store = createSessionObservationStore({
      readSnapshot,
      createReader: (/** @type {any} */ value) => {
        input = value;
        return {
          start: vi.fn(),
          stop: vi.fn(),
          pump: vi.fn(),
          drain: vi.fn(),
          offset: vi.fn(() => 0)
        };
      }
    });

    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'root', file },
      { bead_id: 'B', provider: 'codex', session_id: 'root', file }
    ]);
    input.onLine(
      '{"type":"turn_context","payload":{"turn_id":"t1","model":"sol"}}'
    );

    expect(readSnapshot).toHaveBeenCalledTimes(1);
    expect(store.readerCount()).toBe(1);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('rebuilds observation from an atomically replaced actual file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-replace-'));
    const file = path.join(dir, 'session.jsonl');
    /** @param {string} turn_id - Turn. @param {number} input_tokens - Usage. */
    const record = (turn_id, input_tokens) =>
      `${JSON.stringify({ type: 'session_meta', payload: { id: 'root' } })}\n${JSON.stringify({ type: 'turn_context', payload: { turn_id, model: 'sol' } })}\n${JSON.stringify({ type: 'token_usage_record', payload: { thread_id: 'root', turn_id, turn_token_usage: { input_tokens } } })}\n`;
    fs.writeFileSync(file, record('old', 100));
    /** @type {any} */
    let tail;
    const store = createSessionObservationStore({
      createReader: (/** @type {any} */ input) => {
        tail = createTailReader({ ...input, poll_ms: 60_000 });
        return tail;
      }
    });
    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'root', file }
    ]);

    const replacement = path.join(dir, 'replacement.jsonl');
    fs.writeFileSync(replacement, record('new', 3));
    fs.renameSync(replacement, file);
    tail.pump();

    const observed = store.get('/workspace', 'A');
    expect(observed?.usage_legs).toHaveLength(1);
    expect(observed?.usage_legs[0]).toMatchObject({
      turn_id: 'new',
      usage: { input_tokens: 3 }
    });
    store.clear();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  test('tracks Claude message models and every Agent block separately', () => {
    /**
     * @param {string} id
     * @param {string} model
     * @param {any[]} content
     * @param {string|undefined} [parent_tool_use_id]
     */
    const assistant = (id, model, content, parent_tool_use_id = undefined) => ({
      type: 'assistant',
      ...(parent_tool_use_id ? { parent_tool_use_id } : {}),
      message: {
        id,
        model,
        usage: { input_tokens: 10, output_tokens: 2 },
        content
      }
    });
    const rows = [
      assistant('m1', 'claude-opus-4-8', [
        { type: 'tool_use', name: 'Agent', id: 'agent-a', input: {} },
        { type: 'tool_use', name: 'Agent', id: 'agent-b', input: {} }
      ]),
      assistant('m2', 'claude-opus-4-6', []),
      assistant('child', 'claude-opus-4-6', [], 'agent-a')
    ];

    const observed = foldSessionObservation(
      'claude',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`,
      { session_id: 'root' }
    );

    expect(observed.model).toBe('claude-opus-4-6');
    expect(
      observed.usage_legs
        .filter((leg) => leg.role === 'orchestrator')
        .map((leg) => leg.model)
    ).toEqual(['claude-opus-4-8', 'claude-opus-4-6']);
    expect(observed.delegations.map((row) => row.launch_id)).toEqual([
      'agent-a',
      'agent-b'
    ]);
    expect(
      /** @type {any} */ (observed.delegations[0]).usage.input_tokens
    ).toBe(10);
  });

  test('applies each direct record once and coalesces append notifications', () => {
    vi.useFakeTimers();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-incremental-'));
    const file = path.join(dir, 'session.jsonl');
    fs.writeFileSync(
      file,
      `${JSON.stringify({ type: 'system', subtype: 'init', model: 'claude-opus-4-8' })}\n${JSON.stringify({ type: 'assistant', message: { id: 'm1', model: 'claude-opus-4-8', usage: { input_tokens: 2 }, content: [] } })}\n`
    );
    /** @type {any} */
    let input;
    const onApply = vi.fn();
    const onChange = vi.fn();
    const store = createSessionObservationStore({
      onApply,
      onChange,
      createReader(value) {
        input = value;
        return {
          start() {},
          stop() {},
          pump() {},
          drain() {},
          offset() {
            return 0;
          }
        };
      }
    });
    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'claude', session_id: 'root', file }
    ]);
    onChange.mockClear();

    input.onLine(
      JSON.stringify({
        type: 'assistant',
        message: {
          id: 'm1',
          model: 'claude-opus-4-8',
          usage: { input_tokens: 4 },
          content: []
        }
      })
    );
    input.onLine(
      JSON.stringify({
        type: 'assistant',
        message: {
          id: 'm2',
          model: 'claude-opus-4-6',
          usage: { input_tokens: 3 },
          content: []
        }
      })
    );

    expect(onApply).toHaveBeenCalledTimes(4);
    expect(store.get('/workspace', 'A')?.usage.input_tokens).toBe(7);
    expect(onChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(onChange).toHaveBeenCalledTimes(1);
    store.clear();
    fs.rmSync(dir, { recursive: true, force: true });
    vi.useRealTimers();
  });

  test('keeps Claude result scopes replaceable across multiple turns', () => {
    const rows = [
      {
        type: 'assistant',
        message: {
          id: 'm1',
          model: 'claude-opus-4-8',
          usage: { input_tokens: 10, output_tokens: 1 },
          content: []
        }
      },
      {
        type: 'assistant',
        message: {
          id: 'm1',
          model: 'claude-opus-4-8',
          usage: { input_tokens: 12, output_tokens: 2 },
          content: []
        }
      },
      {
        type: 'result',
        usage: { input_tokens: 15, output_tokens: 3 },
        total_cost_usd: 0.5
      },
      {
        type: 'assistant',
        message: {
          id: 'm2',
          model: 'claude-opus-4-6',
          usage: { input_tokens: 7, output_tokens: 1 },
          content: []
        }
      },
      {
        type: 'result',
        usage: { input_tokens: 9, output_tokens: 2 },
        total_cost_usd: 0.25
      }
    ];

    const observed = foldSessionObservation(
      'claude',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`,
      { session_id: 'root' }
    );

    expect(observed.usage).toMatchObject({
      input_tokens: 24,
      output_tokens: 5,
      total_cost_usd: 0.75
    });
    expect(
      observed.usage_legs.filter((leg) => leg.turn_id === 'm1')
    ).toHaveLength(1);
    expect(
      observed.usage_legs.filter((leg) => leg.turn_id === 'm2')
    ).toHaveLength(1);
    expect(
      observed.usage_legs.filter((leg) =>
        String(leg.turn_id).endsWith('reported-cost')
      )
    ).toHaveLength(2);
  });

  test('actual monitor tails Worker root rollout and retains prepared segments', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-root-'));
    const started_at = Date.parse('2026-09-11T00:00:00.000Z');
    const dir = path.join(root, '2026', '09', '11');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'rollout-test-root-session.jsonl');
    const rows = [
      {
        timestamp: '2026-09-11T00:00:01.000Z',
        type: 'session_meta',
        payload: { id: 'root-session' }
      },
      {
        timestamp: '2026-09-11T00:00:02.000Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'gpt-5.6-sol' }
      },
      {
        timestamp: '2026-09-11T00:00:03.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root-session',
          turn_id: 't1',
          turn_token_usage: { input_tokens: 100, output_tokens: 10 }
        }
      }
    ];
    fs.writeFileSync(
      file,
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root
    });
    const attempt = {
      attempt_id: 'a1',
      runner: 'codex',
      session_id: 'root-session',
      started_at,
      pid: 12,
      status: 'running'
    };
    const log_file = path.join(root, 'worker.jsonl');
    fs.writeFileSync(log_file, '');
    const monitors = createSessionMonitors({
      store: { snapshot: () => ({ attempts: { a1: attempt } }) },
      sessionLog: { pathFor: () => log_file, publish() {} },
      workerSessionObservations: store,
      observeCodexChildren: () => [],
      probePid: () => ({ alive: true, started_at }),
      poll_ms: 60_000
    });

    expect(monitors.start('/workspace', attempt)).toBe(true);
    fs.appendFileSync(
      file,
      `${JSON.stringify({ timestamp: '2026-09-11T00:00:04.000Z', type: 'turn_context', payload: { turn_id: 't2', model: 'gpt-6-astra' } })}\n${JSON.stringify({ timestamp: '2026-09-11T00:00:05.000Z', type: 'token_usage_record', payload: { thread_id: 'root-session', turn_id: 't2', turn_token_usage: { input_tokens: 50, output_tokens: 5 }, thread_token_usage: { input_tokens: 150, output_tokens: 15 } } })}\n`
    );
    monitors.stop('/workspace', 'a1');

    const prepared = store.get('/workspace', 'a1');
    expect(prepared?.usage).toMatchObject({
      input_tokens: 150,
      output_tokens: 15
    });
    expect(
      prepared?.usage_segments.map((/** @type {any} */ leg) => [
        leg.model,
        leg.usage.input_tokens
      ])
    ).toEqual([
      ['gpt-5.6-sol', 100],
      ['gpt-6-astra', 50]
    ]);
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });
});
