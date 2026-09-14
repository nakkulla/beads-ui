import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createIncrementalCodexChildObserver } from './codex-children/reader.js';
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
  test('discovers incremental child files after midnight without rereading the root', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-child-midnight-'));
    const root_dir = path.join(dir, '2026/09/10');
    const child_dir = path.join(dir, '2026/09/11');
    fs.mkdirSync(root_dir, { recursive: true });
    fs.mkdirSync(child_dir, { recursive: true });
    const root = path.join(root_dir, 'rollout-root.jsonl');
    const child = path.join(child_dir, 'rollout-child.jsonl');
    fs.writeFileSync(root, '');
    const rows = [
      {
        type: 'session_meta',
        payload: {
          id: 'child',
          parent_thread_id: 'root',
          thread_source: 'subagent',
          agent_path: '/root/child'
        }
      },
      {
        timestamp: '2026-09-11T00:01:00.000Z',
        type: 'turn_context',
        payload: { model: 'gpt-5.6-terra' }
      }
    ];
    fs.writeFileSync(
      child,
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );
    const readSnapshot = vi.fn(readSessionSnapshot);
    const observer = createIncrementalCodexChildObserver({
      root_thread_id: 'root',
      root_file: root,
      readSnapshot,
      started_at: Date.parse('2026-09-10T23:59:00.000Z'),
      now: () => Date.parse('2026-09-11T00:02:00.000Z')
    });

    try {
      observer.scan();
      observer.scan();

      expect(observer.snapshot()).toMatchObject([
        { thread_id: 'child', model: 'gpt-5.6-terra' }
      ]);
      expect(readSnapshot.mock.calls.map(([file]) => file)).toEqual([child]);
    } finally {
      observer.stop();
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

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

  test('deduplicates response ids and keeps model boundaries', () => {
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      {
        timestamp: '2026-09-15T00:00:00.000Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'sol' }
      },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r1',
          usage: { input_tokens: 10, output_tokens: 1 },
          turn_token_usage: { input_tokens: 10, output_tokens: 1 },
          thread_token_usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r1',
          usage: { input_tokens: 10, output_tokens: 1 },
          thread_token_usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      { type: 'turn_context', payload: { turn_id: 't2', model: 'astra' } },
      {
        timestamp: '2026-09-15T00:00:02.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't2',
          response_id: 'r2',
          usage: { input_tokens: 20, output_tokens: 2 },
          thread_token_usage: { input_tokens: 30, output_tokens: 3 }
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      rows.map((row) => JSON.stringify(row)).join('\n')
    );

    expect(observed.usage_legs.map((leg) => [leg.model, leg.usage])).toEqual([
      ['sol', { input_tokens: 10, output_tokens: 1 }],
      ['astra', { input_tokens: 20, output_tokens: 2 }]
    ]);
  });

  test('excludes a conflicting response contribution and preserves its reason', () => {
    const base = {
      timestamp: '2026-09-15T00:00:01.000Z',
      type: 'token_usage_record',
      payload: {
        thread_id: 'root',
        turn_id: 't1',
        response_id: 'r1',
        usage: { input_tokens: 10, output_tokens: 1 }
      }
    };
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'sol' } },
      base,
      {
        ...base,
        payload: {
          ...base.payload,
          usage: { input_tokens: 11, output_tokens: 1 }
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      rows.map((row) => JSON.stringify(row)).join('\n')
    );

    expect(observed.usage_legs).toEqual([
      expect.objectContaining({
        partial: true,
        partial_reasons: ['response_conflict']
      })
    ]);
  });

  test('folds anonymized 29-response parent and 3-response child fixtures', () => {
    /**
     * @param {string} thread_id
     * @param {number} count
     * @param {{ input: number, cache: number, output: number }} totals
     */
    const fixture = (thread_id, count, totals) => {
      /** @type {any[]} */
      const records = [
        { type: 'session_meta', payload: { id: thread_id } },
        {
          type: 'turn_context',
          payload: { turn_id: `${thread_id}-turn`, model: 'astra' }
        }
      ];
      for (let index = 0; index < count; index += 1) {
        const last = index === count - 1;
        records.push({
          timestamp: `2026-09-15T00:00:${String(index).padStart(2, '0')}.000Z`,
          type: 'token_usage_record',
          payload: {
            thread_id,
            turn_id: `${thread_id}-turn`,
            response_id: `${thread_id}-response-${index}`,
            usage: {
              input_tokens: last ? totals.input - (count - 1) : 1,
              cached_input_tokens: last ? totals.cache : 0,
              output_tokens: last ? totals.output : 0
            }
          }
        });
      }
      return records.map((record) => JSON.stringify(record)).join('\n');
    };

    const parent = foldSessionObservation(
      'codex',
      fixture('parent', 29, {
        input: 2_442_197,
        cache: 2_339_968,
        output: 11_953
      })
    );
    const child = foldSessionObservation(
      'codex',
      fixture('child', 3, {
        input: 86_154,
        cache: 29_440,
        output: 1_085
      })
    );

    expect(parent.usage_legs).toHaveLength(1);
    expect(parent.usage_legs[0].usage).toMatchObject({
      input_tokens: 2_442_197,
      cache_read_input_tokens: 2_339_968,
      output_tokens: 11_953
    });
    expect(child.usage_legs).toHaveLength(1);
    expect(child.usage_legs[0].usage).toMatchObject({
      input_tokens: 86_154,
      cache_read_input_tokens: 29_440,
      output_tokens: 1_085
    });
  });

  test('uses a half-open attempt end boundary for historical responses', () => {
    const records = [
      { type: 'session_meta', payload: { id: 'root' } },
      {
        timestamp: '2026-09-15T00:00:05.500Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'astra' }
      },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r1',
          usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        timestamp: '2026-09-15T00:00:10.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r2',
          usage: { input_tokens: 20, output_tokens: 2 }
        }
      }
    ];

    const legs = /** @type {any[]} */ (
      foldCodexAttemptUsage(
        records,
        Date.parse('2026-09-15T00:00:00.000Z'),
        Date.parse('2026-09-15T00:00:05.000Z')
      )
    );

    expect(legs).toHaveLength(1);
    expect(legs[0].usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 1
    });
  });

  test('assigns a response at an adjacent boundary to only the later attempt', () => {
    const records = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'astra' } },
      {
        timestamp: '2026-09-15T00:00:05.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'boundary-response',
          usage: { input_tokens: 10, output_tokens: 1 }
        }
      }
    ];
    const boundary = Date.parse('2026-09-15T00:00:05.000Z');

    const earlier = foldCodexAttemptUsage(records, boundary - 5_000, boundary);
    const later = foldCodexAttemptUsage(records, boundary, boundary + 5_000);

    expect(earlier).toEqual([]);
    expect(later).toHaveLength(1);
  });

  test('keeps same-turn model segments separate across resume baseline', () => {
    const records = [
      { type: 'session_meta', payload: { id: 'root' } },
      {
        timestamp: '2026-09-15T00:00:00.000Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'sol' }
      },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r1',
          usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        timestamp: '2026-09-15T00:00:05.500Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'astra' }
      },
      {
        timestamp: '2026-09-15T00:00:06.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r2',
          usage: { input_tokens: 20, output_tokens: 2 }
        }
      }
    ];

    const legs = /** @type {any[]} */ (
      foldCodexAttemptUsage(
        records,
        Date.parse('2026-09-15T00:00:05.000Z'),
        Date.parse('2026-09-15T00:00:10.000Z')
      )
    );

    expect(legs.map((leg) => [leg.model, leg.usage.input_tokens])).toEqual([
      ['astra', 20]
    ]);
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

  test('keeps direct responses and marks an unattributed cumulative gap without adding it', () => {
    const rows = [
      { type: 'session_meta', payload: { id: 'root' } },
      { type: 'turn_context', payload: { turn_id: 't1', model: 'astra' } },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'root',
          turn_id: 't1',
          response_id: 'r1',
          usage: { input_tokens: 10, output_tokens: 1 },
          thread_token_usage: { input_tokens: 15, output_tokens: 2 }
        }
      }
    ];

    const observed = foldSessionObservation(
      'codex',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );

    expect(observed.usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 1
    });
    expect(observed.usage_legs).toHaveLength(2);
    expect(observed.usage_legs[1]).toMatchObject({
      usage: {},
      partial: true,
      partial_reasons: ['cumulative_gap']
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

  test('keeps sidechain-only Claude records out of root usage and model', () => {
    const rows = [
      {
        type: 'assistant',
        message: {
          id: 'root',
          model: 'claude-opus-4-8',
          usage: { input_tokens: 10, output_tokens: 2 },
          content: []
        }
      },
      {
        type: 'assistant',
        isSidechain: true,
        message: {
          id: 'unattached-child',
          model: 'claude-opus-4-6',
          usage: { input_tokens: 90, output_tokens: 8 },
          content: []
        }
      }
    ];

    const observed = foldSessionObservation(
      'claude',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`,
      { session_id: 'root' }
    );

    expect(observed.model).toBe('claude-opus-4-8');
    expect(observed.usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 2
    });
    expect(observed.usage_legs).toHaveLength(1);
  });

  test('tails linked Codex children once and shares their incremental readers', () => {
    vi.useFakeTimers();
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-child-tail-'));
    const root = path.join(dir, 'rollout-root.jsonl');
    const child = path.join(dir, 'rollout-child.jsonl');
    const grandchild = path.join(dir, 'rollout-grandchild.jsonl');
    const unrelated = path.join(dir, 'rollout-unrelated.jsonl');
    /** @param {string} id - Thread. @param {string|null} [parent] - Parent thread. @param {string|null} [agent_path] - Agent path. */
    const meta = (id, parent = null, agent_path = null) => ({
      timestamp: '2026-09-11T00:00:00.000Z',
      type: 'session_meta',
      payload: {
        id,
        ...(parent
          ? {
              parent_thread_id: parent,
              agent_path,
              thread_source: 'subagent'
            }
          : {})
      }
    });
    fs.writeFileSync(root, `${JSON.stringify(meta('root'))}\n`);
    fs.writeFileSync(
      child,
      `${JSON.stringify(meta('child', 'root', '/root/child'))}\n${JSON.stringify({ timestamp: '2026-09-11T00:00:01.000Z', type: 'turn_context', payload: { model: 'gpt-5.6-terra', effort: 'medium' } })}\n`
    );
    fs.writeFileSync(
      grandchild,
      `${JSON.stringify(meta('grandchild', 'child', '/root/child/grand'))}\n${JSON.stringify({ timestamp: '2026-09-11T00:00:01.000Z', type: 'turn_context', payload: { model: 'gpt-5.6-luna', effort: 'low' } })}\n`
    );
    fs.writeFileSync(unrelated, `${JSON.stringify(meta('other'))}\n`);
    const readers = new Map();
    const readSnapshot = vi.fn(readSessionSnapshot);
    const store = createSessionObservationStore({
      readSnapshot,
      createReader(input) {
        const reader = {
          start: vi.fn(),
          stop: vi.fn(),
          pump: vi.fn(),
          drain: vi.fn(),
          offset: vi.fn(() => 0)
        };
        readers.set(input.file, { input, reader });
        return reader;
      }
    });

    store.reconcile('/workspace', [
      { bead_id: 'A', provider: 'codex', session_id: 'root', file: root },
      { bead_id: 'B', provider: 'codex', session_id: 'root', file: root }
    ]);
    vi.advanceTimersByTime(6000);

    expect(readSnapshot.mock.calls.map(([file]) => file).sort()).toEqual(
      [root, child, grandchild].sort()
    );
    expect(readers.size).toBe(3);
    readers.get(child).input.onLine(
      JSON.stringify({
        timestamp: '2026-09-11T00:00:02.000Z',
        type: 'token_usage_record',
        payload: { thread_token_usage: { input_tokens: 7, output_tokens: 2 } }
      })
    );
    expect(store.get('/workspace', 'A')?.delegations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          thread_id: 'child',
          usage: expect.objectContaining({ input_tokens: 7, output_tokens: 2 })
        }),
        expect.objectContaining({ thread_id: 'grandchild' })
      ])
    );
    /** @type {any[]} */
    const replacement_rows = [
      meta('child', 'root', '/root/child'),
      {
        timestamp: '2026-09-11T00:00:03.000Z',
        type: 'token_usage_record',
        payload: { thread_token_usage: { input_tokens: 3, output_tokens: 1 } }
      }
    ];
    fs.writeFileSync(
      child,
      `${replacement_rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );
    readers.get(child).input.onReset();
    for (const row of replacement_rows) {
      readers.get(child).input.onLine(JSON.stringify(row));
    }
    /** @param {any} row */
    const is_child = (row) => row.thread_id === 'child';
    expect(
      store.get('/workspace', 'A')?.delegations.find(is_child)?.usage
    ).toMatchObject({ input_tokens: 3, output_tokens: 1 });
    expect(readSnapshot.mock.calls.map(([file]) => file).sort()).toEqual(
      [root, child, grandchild].sort()
    );

    store.reconcile('/workspace', []);
    expect(
      [...readers.values()].every(
        ({ reader }) => reader.stop.mock.calls.length === 1
      )
    ).toBe(true);
    fs.rmSync(dir, { recursive: true, force: true });
    vi.useRealTimers();
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
      },
      {
        type: 'assistant',
        message: {
          id: 'm3',
          model: 'claude-sonnet-4-6',
          usage: { input_tokens: 5, output_tokens: 1 },
          content: []
        }
      }
    ];

    const observed = foldSessionObservation(
      'claude',
      `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`,
      { session_id: 'root' }
    );

    expect(observed.usage).toMatchObject({
      input_tokens: 29,
      output_tokens: 6,
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
    expect(
      observed.usage_legs.filter((leg) => leg.cost_covered === true)
    ).toHaveLength(4);
    expect(
      observed.usage_legs.find((leg) => leg.turn_id === 'm3')
    ).not.toHaveProperty('cost_covered');
  });

  test('actual monitor refolds the root rollout at its terminal boundary', () => {
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
      now: () => Date.parse('2026-09-11T00:00:04.500Z'),
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
      input_tokens: 100,
      output_tokens: 10
    });
    expect(
      prepared?.usage_segments.map((/** @type {any} */ leg) => [
        leg.model,
        leg.usage.input_tokens
      ])
    ).toEqual([['gpt-5.6-sol', 100]]);
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('single-flights an ended attempt and releases its temporary reader', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-history-'));
    const dir = path.join(root, '2026', '09', '15');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'rollout-history-session.jsonl'),
      `${JSON.stringify({ timestamp: '2026-09-15T00:00:01.000Z', type: 'turn_context', payload: { turn_id: 't1', model: 'gpt-5.6-sol' } })}\n${JSON.stringify({ timestamp: '2026-09-15T00:00:02.000Z', type: 'token_usage_record', payload: { thread_id: 'history-session', turn_id: 't1', response_id: 'r1', usage: { input_tokens: 40, output_tokens: 4 } } })}\n`
    );
    let stopped = 0;
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root,
      createReader: () => ({
        start() {},
        pump() {},
        drain() {},
        stop() {
          stopped += 1;
        },
        offset: () => 0
      })
    });
    const attempt = {
      attempt_id: 'a-history',
      runner: 'codex',
      session_id: 'history-session',
      started_at: Date.parse('2026-09-15T00:00:00.000Z'),
      finished_at: Date.parse('2026-09-15T00:01:00.000Z'),
      status: 'done'
    };

    const first = store.prepareHistorical('/workspace', attempt);
    const second = store.prepareHistorical('/workspace', attempt);
    expect(second).toBe(first);
    await first;

    expect(store.get('/workspace', 'a-history')?.usage).toMatchObject({
      input_tokens: 40,
      output_tokens: 4
    });
    expect(stopped).toBe(0);
    expect(store.prepareHistorical('/workspace', attempt)).toBeNull();
    store.releaseHistorical('/workspace');
    expect(store.get('/workspace', 'a-history')).toBeNull();
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('keeps stored usage when a historical rollout has no complete usage record', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'bdui-worker-truncated-')
    );
    const dir = path.join(root, '2026', '09', '15');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'rollout-truncated-session.jsonl'),
      '{"type":"token_usage_record","payload":'
    );
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root
    });
    const attempt = {
      attempt_id: 'a-truncated',
      runner: 'codex',
      session_id: 'truncated-session',
      started_at: Date.parse('2026-09-15T00:00:00.000Z'),
      status: 'done',
      usage: { input_tokens: 12, output_tokens: 3 },
      codex_children: [{ thread_id: 'stored-child' }]
    };

    await store.prepareHistorical('/workspace', attempt);

    expect(store.get('/workspace', 'a-truncated')).toMatchObject({
      usage: { input_tokens: 12, output_tokens: 3 },
      codex_children: [{ thread_id: 'stored-child' }]
    });
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('does not expire a historical value after a live observer takes ownership', async () => {
    vi.useFakeTimers();
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-live-'));
    const dir = path.join(root, '2026', '09', '15');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'rollout-live-session.jsonl'),
      `${JSON.stringify({ timestamp: '2026-09-15T00:00:00.000Z', type: 'session_meta', payload: { id: 'live-session' } })}\n${JSON.stringify({ timestamp: '2026-09-15T00:00:01.000Z', type: 'turn_context', payload: { turn_id: 't1', model: 'astra' } })}\n${JSON.stringify({ timestamp: '2026-09-15T00:00:02.000Z', type: 'token_usage_record', payload: { thread_id: 'live-session', turn_id: 't1', response_id: 'r1', usage: { input_tokens: 10, output_tokens: 1 } } })}\n`
    );
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root,
      historicalTtlMs: 10,
      createReader: () => ({
        start() {},
        pump() {},
        drain() {},
        stop() {},
        offset: () => 0
      })
    });
    const attempt = {
      attempt_id: 'a-live',
      runner: 'codex',
      session_id: 'live-session',
      started_at: Date.parse('2026-09-15T00:00:00.000Z'),
      finished_at: Date.parse('2026-09-15T00:01:00.000Z'),
      status: 'done'
    };

    const pending = store.prepareHistorical('/workspace', attempt);
    store.observe('/workspace', {
      ...attempt,
      finished_at: null,
      status: 'running'
    });
    await pending;
    await vi.advanceTimersByTimeAsync(20);

    expect(store.get('/workspace', 'a-live')?.usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 1
    });
    store.clear();
    vi.useRealTimers();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('excludes a response claimed by both root and child owners', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-owner-'));
    const dir = path.join(root, '2026', '09', '15');
    fs.mkdirSync(dir, { recursive: true });
    const root_rows = [
      {
        timestamp: '2026-09-15T00:00:00.000Z',
        type: 'session_meta',
        payload: { id: 'owner-root' }
      },
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'turn_context',
        payload: { turn_id: 't1', model: 'astra' }
      },
      {
        timestamp: '2026-09-15T00:00:02.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'owner-root',
          turn_id: 't1',
          response_id: 'shared-response',
          usage: { input_tokens: 10, output_tokens: 1 }
        }
      },
      {
        timestamp: '2026-09-15T00:00:03.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'owner-root',
          turn_id: 't1',
          response_id: 'safe-root-response',
          usage: { input_tokens: 5, output_tokens: 1 }
        }
      }
    ];
    const child_rows = [
      {
        timestamp: '2026-09-15T00:00:01.000Z',
        type: 'session_meta',
        payload: {
          id: 'owner-child',
          parent_thread_id: 'owner-root',
          thread_source: 'subagent',
          agent_path: '/root/child'
        }
      },
      {
        timestamp: '2026-09-15T00:00:01.500Z',
        type: 'turn_context',
        payload: { turn_id: 'ct1', model: 'astra' }
      },
      {
        timestamp: '2026-09-15T00:00:02.000Z',
        type: 'token_usage_record',
        payload: {
          thread_id: 'owner-child',
          turn_id: 'ct1',
          response_id: 'shared-response',
          usage: { input_tokens: 10, output_tokens: 1 }
        }
      }
    ];
    fs.writeFileSync(
      path.join(dir, 'rollout-owner-root.jsonl'),
      `${root_rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );
    const child_file = path.join(dir, 'rollout-owner-child.jsonl');
    fs.writeFileSync(
      child_file,
      `${child_rows.map((row) => JSON.stringify(row)).join('\n')}\n`
    );
    const child_mtime = new Date('2026-09-15T00:00:03.000Z');
    fs.utimesSync(child_file, child_mtime, child_mtime);
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root
    });
    const attempt = {
      attempt_id: 'a-owner',
      runner: 'codex',
      session_id: 'owner-root',
      started_at: Date.parse('2026-09-15T00:00:00.000Z'),
      finished_at: Date.parse('2026-09-15T00:01:00.000Z'),
      status: 'done'
    };

    await store.prepareHistorical('/workspace', attempt);

    expect(store.get('/workspace', 'a-owner')?.usage).toMatchObject({
      input_tokens: 5,
      output_tokens: 1
    });
    expect(store.get('/workspace', 'a-owner')?.usage_segments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          usage: { input_tokens: 5, output_tokens: 1 }
        }),
        expect.objectContaining({
          usage: {},
          partial_reasons: ['response_conflict']
        })
      ])
    );
    expect(
      store.get('/workspace', 'a-owner')?.codex_children[0]
        .usage_partial_reasons
    ).toContain('response_conflict');
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('memoizes a missing rollout and prevents late cache resurrection', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-missing-'));
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root
    });
    const attempt = {
      attempt_id: 'a-missing',
      runner: 'codex',
      session_id: 'missing-session',
      started_at: Date.parse('2026-09-15T00:00:00.000Z'),
      status: 'done'
    };

    const pending = store.prepareHistorical('/workspace', attempt);
    store.releaseHistorical('/workspace');
    expect(await pending).toBeNull();
    expect(store.get('/workspace', 'a-missing')).toBeNull();

    const completed = store.prepareHistorical('/workspace', attempt);
    expect(await completed).toBeNull();
    expect(store.prepareHistorical('/workspace', attempt)).toBeNull();
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('releases only the pending historical workspace', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'bdui-worker-isolated-')
    );
    const store = createWorkerSessionObservationStore({
      sessionsRootFor: () => root
    });
    const first = {
      attempt_id: 'a-first',
      runner: 'codex',
      session_id: 'missing-first',
      status: 'done'
    };
    const second = {
      attempt_id: 'a-second',
      runner: 'codex',
      session_id: 'missing-second',
      status: 'done'
    };

    const first_pending = store.prepareHistorical('/workspace-first', first);
    const second_pending = store.prepareHistorical('/workspace-second', second);
    store.releaseHistorical('/workspace-first');

    expect(await first_pending).toBeNull();
    expect(await second_pending).toBeNull();
    expect(store.prepareHistorical('/workspace-second', second)).toBeNull();
    expect(store.prepareHistorical('/workspace-first', first)).not.toBeNull();
    store.clear();
    fs.rmSync(root, { recursive: true, force: true });
  });
});
