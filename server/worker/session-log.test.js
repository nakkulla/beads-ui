import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLog } from './session-log.js';
import { sessionLogPath } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
/** @type {string} */
let tmp_state;

/**
 * Write a raw line the way the RUNNER now does — straight to the file through
 * its own fd, with no server involvement (UI-o2yt §3.1).
 *
 * @param {string} attempt_id
 * @param {unknown} event
 */
function writeRunnerLine(attempt_id, event) {
  const file = sessionLogPath(WS, attempt_id);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${JSON.stringify(event)}\n`);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-slog-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker/session-log', () => {
  test('read parses back the jsonl the runner wrote under the XDG sessions dir', () => {
    const log = createSessionLog();
    writeRunnerLine('att-1', { type: 'system' });
    writeRunnerLine('att-1', { type: 'assistant', text: 'hi' });

    const file = sessionLogPath(WS, 'att-1');
    expect(file.includes(path.join('bdui'))).toBe(true);
    expect(file.endsWith(path.join('sessions', 'att-1.jsonl'))).toBe(true);

    const events = log.read(WS, 'att-1');
    expect(events).toEqual([
      { type: 'system' },
      { type: 'assistant', text: 'hi' }
    ]);
  });

  test('stderrPathFor names the sidecar next to the jsonl', () => {
    const log = createSessionLog();

    expect(log.stderrPathFor(WS, 'att-1')).toBe(
      sessionLogPath(WS, 'att-1').replace(/\.jsonl$/, '.stderr.log')
    );
  });

  test('attach re-broadcasts a runner raw stream without writing the file', () => {
    const log = createSessionLog();
    const events = new EventEmitter();
    /** @type {unknown[]} */
    const seen = [];
    log.subscribe((a) => seen.push(a.event));

    log.attach(WS, 'att-2', events);
    events.emit('raw', { type: 'thread.started' });
    events.emit('raw', { type: 'turn.completed' });

    expect(seen).toEqual([
      { type: 'thread.started' },
      { type: 'turn.completed' }
    ]);
    expect(fs.existsSync(sessionLogPath(WS, 'att-2'))).toBe(false);
  });

  test('publish notifies subscribers of one already-persisted event', () => {
    const log = createSessionLog();
    /** @type {any[]} */
    const seen = [];
    log.subscribe((a) => seen.push(a));

    log.publish(WS, 'att-3', { type: 'system' });

    expect(seen).toEqual([
      { workspace: WS, attempt_id: 'att-3', event: { type: 'system' } }
    ]);
  });

  test('delegation publish carries the launch id', () => {
    const log = createSessionLog();
    /** @type {any[]} */
    const seen = [];
    log.subscribe((append) => seen.push(append), 'launch-1');

    log.publish(WS, 'att-3', { type: 'session.started' }, 'launch-1');

    expect(seen).toEqual([
      {
        workspace: WS,
        attempt_id: 'att-3',
        event: { type: 'session.started' },
        launch_id: 'launch-1'
      }
    ]);
  });

  test('main subscribers do not receive delegation appends', () => {
    const log = createSessionLog();
    /** @type {any[]} */
    const seen = [];
    log.subscribe((append) => seen.push(append));

    log.publish(WS, 'att-3', { type: 'session.started' }, 'launch-1');

    expect(seen).toEqual([]);
  });

  test('delegation snapshot returns empty for an unknown launch', () => {
    const log = createSessionLog();

    const snapshot = log.readDelegation(WS, 'att-3', 'unknown-launch');

    expect(snapshot).toEqual({ lines: [], last_event_at: null, offset: 0 });
  });

  test('delegation snapshot is empty when the authorized identity disagrees', () => {
    const log = createSessionLog();

    const snapshot = log.readDelegation(WS, 'att-3', 'launch-1', {
      launch_id: 'launch-1',
      provider: 'codex',
      role: 'implementation',
      model: 'gpt-5.6-sol',
      session_id: 'another-thread',
      turn_id: 'turn-1',
      status: 'running',
      started_at: 1,
      completed_at: null,
      last_event_at: 1
    });

    expect(snapshot).toEqual({ lines: [], last_event_at: null, offset: 0 });
  });

  test('read of an absent attempt returns []', () => {
    expect(createSessionLog().read(WS, 'nope')).toEqual([]);
  });

  test('lastEventAtOf returns the log file mtime in epoch ms', () => {
    const log = createSessionLog();
    writeRunnerLine('att-4', { type: 'system' });

    const at = log.lastEventAtOf(WS, 'att-4');

    expect(at).toBe(fs.statSync(sessionLogPath(WS, 'att-4')).mtimeMs);
  });

  test('lastEventAtOf returns null for an absent attempt', () => {
    expect(createSessionLog().lastEventAtOf(WS, 'nope')).toBe(null);
  });
});

describe('worker/session-log last_event_at (UI-53es §1)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('publish records the event time for the attempt', () => {
    let now = 1_000;
    const log = createSessionLog({ now: () => now });

    log.publish(WS, 'att-1', { type: 'system' });
    now = 5_000;
    log.publish(WS, 'att-1', { type: 'assistant' });

    expect(log.lastEventAt(WS, 'att-1')).toBe(5_000);
  });

  test('lastEventAt is null for an attempt that published nothing', () => {
    const log = createSessionLog({ now: () => 1_000 });

    expect(log.lastEventAt(WS, 'att-none')).toBe(null);
  });

  test('publish schedules a coalesced queue fanout 3s later', () => {
    /** @type {string[]} */
    const fanouts = [];
    const log = createSessionLog({
      now: () => 1_000,
      emitChanged: (workspace) => fanouts.push(workspace)
    });

    log.publish(WS, 'att-1', { type: 'system' });

    expect(fanouts).toEqual([]);
    vi.advanceTimersByTime(3_000);
    expect(fanouts).toEqual([WS]);
  });

  test('merges a burst of publishes into a single fanout per window', () => {
    /** @type {string[]} */
    const fanouts = [];
    const log = createSessionLog({
      now: () => 1_000,
      emitChanged: (workspace) => fanouts.push(workspace)
    });

    for (let i = 0; i < 20; i += 1) {
      log.publish(WS, 'att-1', { type: 'assistant' });
    }
    vi.advanceTimersByTime(2_999);
    expect(fanouts).toEqual([]);
    vi.advanceTimersByTime(1);
    expect(fanouts).toEqual([WS]);

    log.publish(WS, 'att-1', { type: 'assistant' });
    vi.advanceTimersByTime(3_000);
    expect(fanouts).toEqual([WS, WS]);
  });

  test('coalesces per workspace, not globally', () => {
    /** @type {string[]} */
    const fanouts = [];
    const other = '/tmp/example-workspace/project-b';
    const log = createSessionLog({
      now: () => 1_000,
      emitChanged: (workspace) => fanouts.push(workspace)
    });

    log.publish(WS, 'att-1', { type: 'system' });
    log.publish(other, 'att-2', { type: 'system' });
    vi.advanceTimersByTime(3_000);

    expect(fanouts.slice().sort()).toEqual([other, WS].sort());
  });

  test('attach re-broadcast also refreshes last_event_at and schedules a fanout', () => {
    /** @type {string[]} */
    const fanouts = [];
    const events = new EventEmitter();
    const log = createSessionLog({
      now: () => 7_000,
      emitChanged: (workspace) => fanouts.push(workspace)
    });

    log.attach(WS, 'att-4', events);
    events.emit('raw', { type: 'turn.completed' });
    vi.advanceTimersByTime(3_000);

    expect(log.lastEventAt(WS, 'att-4')).toBe(7_000);
    expect(fanouts).toEqual([WS]);
  });

  test('delegation publish uses the same coalesced queue fanout', () => {
    /** @type {string[]} */
    const fanouts = [];
    const log = createSessionLog({
      now: () => 7_000,
      emitChanged: (workspace) => fanouts.push(workspace)
    });

    log.publish(WS, 'att-4', { type: 'session.started' }, 'launch-1');
    vi.advanceTimersByTime(3_000);

    expect(log.lastEventAt(WS, 'att-4', 'launch-1')).toBe(7_000);
    expect(fanouts).toEqual([WS]);
  });
});

describe('worker/session-log lastActivity (UI-eey2 §9.3)', () => {
  test('projects a claude assistant line as the last activity', () => {
    const log = createSessionLog({ now: () => 1_000, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: '구현을 시작합니다.' }] }
    });

    expect(log.lastActivity(WS, 'a1')).toEqual({
      at: 1_000,
      kind: 'assistant',
      text: '구현을 시작합니다.'
    });
  });

  test('leaves the activity untouched for claude system progress events', () => {
    const log = createSessionLog({ now: () => 1_000, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'system',
      subtype: 'init',
      model: 'claude-opus-4-5'
    });
    log.publish(WS, 'a1', {
      type: 'system',
      subtype: 'thinking_tokens',
      estimated_tokens: 380
    });

    expect(log.lastActivity(WS, 'a1')).toBe(null);
  });

  test('carries the paired tool_result summary onto the tool activity', () => {
    const log = createSessionLog({ now: () => 5, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'tool_use',
            id: 't1',
            name: 'Bash',
            input: { command: 'npm test' }
          }
        ]
      }
    });
    log.publish(WS, 'a1', {
      type: 'user',
      message: {
        content: [
          { type: 'tool_result', tool_use_id: 't1', content: '통과 41\nrest' }
        ]
      }
    });

    expect(log.lastActivity(WS, 'a1')).toEqual({
      at: 5,
      kind: 'tool',
      text: 'npm test',
      tool: 'Bash',
      command: 'npm test',
      result: '통과 41'
    });
  });

  // UI-4xzk §5.3: the parser learned a `user` line kind for interactive session
  // transcripts. A Worker attempt's user records carry `tool_result` blocks
  // ONLY, so no `user` line is produced here and the overlay needs no new rule.
  test('leaves the activity on the tool line for a tool_result-only user record', () => {
    const log = createSessionLog({ now: () => 5, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'tool_use',
            id: 't1',
            name: 'Bash',
            input: { command: 'npm test' }
          }
        ]
      }
    });
    const before = log.lastActivity(WS, 'a1');
    log.publish(WS, 'a1', {
      type: 'user',
      message: {
        content: [{ type: 'tool_result', tool_use_id: 't1', content: 'ok' }]
      }
    });

    expect(before?.kind).toBe('tool');
    expect(log.lastActivity(WS, 'a1')?.kind).toBe('tool');
  });

  test('projects a codex agent_message and command_execution', () => {
    const log = createSessionLog({ now: () => 7, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'agent_message', text: '검토를 마쳤습니다.' }
    });
    const after_message = log.lastActivity(WS, 'a1');
    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'npm run lint',
        exit_code: 0
      }
    });

    expect(after_message).toMatchObject({
      kind: 'assistant',
      text: '검토를 마쳤습니다.'
    });
    expect(log.lastActivity(WS, 'a1')).toMatchObject({
      kind: 'tool',
      tool: 'shell',
      command: 'npm run lint',
      result: 'exit 0'
    });
  });

  test('projects a delegation-monitor line onto the same attempt', () => {
    const log = createSessionLog({ now: () => 9, emitChanged: () => {} });

    log.publish(
      WS,
      'a1',
      {
        schema: 'codex-delegation-monitor-v1',
        event: {
          type: 'item.completed',
          item: {
            id: 'i1',
            kind: 'activity',
            activity: 'command_execution',
            status: 'completed'
          }
        }
      },
      'launch-1'
    );

    expect(log.lastActivity(WS, 'a1')).toMatchObject({
      kind: 'tool',
      tool: '명령 실행 · 완료'
    });
  });

  test('ignores thinking lines', () => {
    const log = createSessionLog({ now: () => 3, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: '먼저 계약을 읽습니다.' }] }
    });
    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'thinking', thinking: '고민 중' }] }
    });

    expect(log.lastActivity(WS, 'a1')).toMatchObject({
      kind: 'assistant',
      text: '먼저 계약을 읽습니다.'
    });
  });

  test('truncates the activity text at 160 characters', () => {
    const log = createSessionLog({ now: () => 1, emitChanged: () => {} });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: 'ㄱ'.repeat(400) }] }
    });

    expect(log.lastActivity(WS, 'a1')?.text).toHaveLength(160);
  });

  test('returns null for an attempt that produced nothing', () => {
    const log = createSessionLog({ emitChanged: () => {} });

    expect(log.lastActivity(WS, 'nope')).toBeNull();
  });

  test('keeps the last successful activity when the parser throws', () => {
    const changed = vi.fn();
    const log = createSessionLog({ now: () => 2, emitChanged: changed });
    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: '정상 줄' }] }
    });
    const before = log.lastActivity(WS, 'a1');

    const exploding = {
      get type() {
        throw new Error('boom');
      }
    };
    log.publish(WS, 'a1', exploding);

    expect(log.lastActivity(WS, 'a1')).toEqual(before);
    expect(log.lastEventAt(WS, 'a1')).toBe(2);
  });

  test('keeps the last successful activity for a malformed event', () => {
    const appended = /** @type {any[]} */ ([]);
    const log = createSessionLog({ now: () => 4, emitChanged: () => {} });
    log.subscribe((a) => appended.push(a));
    log.publish(WS, 'a1', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: '정상 줄' }] }
    });

    log.publish(WS, 'a1', { type: 'assistant', message: null });
    log.publish(WS, 'a1', 42);

    expect(log.lastActivity(WS, 'a1')).toMatchObject({ text: '정상 줄' });
    expect(log.lastEventAt(WS, 'a1')).toBe(4);
    expect(appended).toHaveLength(3);
  });
});

describe('worker/session-log onBeadWrite (UI-eey2 §9.2)', () => {
  test('fires when a claude bd update Bash command completes', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'assistant',
      message: {
        content: [
          {
            type: 'tool_use',
            id: 't1',
            name: 'Bash',
            input: { command: 'bd update UI-1 --status in_progress' }
          }
        ]
      }
    });
    const before_result = onBeadWrite.mock.calls.length;
    log.publish(WS, 'a1', {
      type: 'user',
      message: {
        content: [{ type: 'tool_result', tool_use_id: 't1', content: 'ok' }]
      }
    });

    expect(before_result).toBe(0);
    expect(onBeadWrite).toHaveBeenCalledWith(WS, 'UI-1');
  });

  test('fires when a codex command_execution of bd close completes', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'bd close UI-7',
        exit_code: 0
      }
    });

    expect(onBeadWrite).toHaveBeenCalledWith(WS, 'UI-7');
  });

  test('names both ends of a bd dep add', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'bd dep add UI-1 UI-2 --type blocks'
      }
    });

    expect(onBeadWrite.mock.calls.map((c) => c[1])).toEqual(['UI-1', 'UI-2']);
  });

  test('ignores a bd dep read', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd dep list UI-1 --json' }
    });

    expect(onBeadWrite).not.toHaveBeenCalled();
  });

  test('fires on a bd dep remove', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd dep remove UI-1 UI-2' }
    });

    expect(onBeadWrite.mock.calls.map((c) => c[1])).toEqual(['UI-1', 'UI-2']);
  });

  test('ignores bd reads and non-bd commands', () => {
    const onBeadWrite = vi.fn();
    const log = createSessionLog({ emitChanged: () => {}, onBeadWrite });

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd show UI-1 --json' }
    });
    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'git commit -m UI-1' }
    });

    expect(onBeadWrite).not.toHaveBeenCalled();
  });

  test('never lets a throwing hook break the broadcast', () => {
    const appended = /** @type {any[]} */ ([]);
    const log = createSessionLog({
      emitChanged: () => {},
      onBeadWrite: () => {
        throw new Error('boom');
      }
    });
    log.subscribe((a) => appended.push(a));

    log.publish(WS, 'a1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd close UI-9' }
    });

    expect(appended).toHaveLength(1);
  });
});

describe('worker/session-log claude subagent streams (UI-2mpn §6.3/§6.4)', () => {
  const LAUNCH = 'toolu_01AgentAAAAAAAAAAAAAAAA';

  /**
   * @param {string} text
   * @param {string|null} parent_tool_use_id
   */
  function assistantLine(text, parent_tool_use_id) {
    return {
      type: 'assistant',
      parent_tool_use_id,
      message: { id: 'm1', content: [{ type: 'text', text }] }
    };
  }

  test('falls back to the parent log when no monitor stream exists', () => {
    const log = createSessionLog();
    writeRunnerLine('att-sub', assistantLine('부모 줄', null));
    writeRunnerLine('att-sub', assistantLine('자식 줄', LAUNCH));
    writeRunnerLine('att-sub', {
      type: 'user',
      parent_tool_use_id: null,
      message: {
        content: [{ type: 'tool_result', tool_use_id: LAUNCH, content: '요약' }]
      }
    });

    const snapshot = log.readDelegation(WS, 'att-sub', LAUNCH);

    expect(snapshot.lines).toHaveLength(2);
    expect(snapshot.offset).toBeGreaterThan(0);
  });

  test('excludes another launch lines from the fallback snapshot', () => {
    const log = createSessionLog();
    writeRunnerLine('att-sub2', assistantLine('다른 자식', 'toolu_other'));
    writeRunnerLine('att-sub2', assistantLine('내 자식', LAUNCH));

    const snapshot = log.readDelegation(WS, 'att-sub2', LAUNCH);

    expect(snapshot.lines).toEqual([assistantLine('내 자식', LAUNCH)]);
  });

  test('returns an empty fallback snapshot when the log is absent', () => {
    const log = createSessionLog();

    const snapshot = log.readDelegation(WS, 'att-missing', LAUNCH);

    expect(snapshot).toEqual({ lines: [], last_event_at: null, offset: 0 });
  });

  test('keeps a subagent line out of the attempt last_activity', () => {
    const log = createSessionLog({ fanoutMs: 1, emitChanged: () => {} });
    log.publish(WS, 'att-sub3', assistantLine('부모가 한 일', null));

    log.publish(WS, 'att-sub3', assistantLine('자식이 한 일', LAUNCH));

    expect(log.lastActivity(WS, 'att-sub3')).toMatchObject({
      text: '부모가 한 일'
    });
  });

  test('republishes an attached subagent line under its launch id', () => {
    const log = createSessionLog({ fanoutMs: 1, emitChanged: () => {} });
    const events = new EventEmitter();
    /** @type {any[]} */
    const seen = [];
    log.subscribe((append) => seen.push(append.event), LAUNCH);
    log.attach(WS, 'att-sub4', events);

    events.emit('raw', assistantLine('자식이 한 일', LAUNCH));

    expect(seen).toEqual([assistantLine('자식이 한 일', LAUNCH)]);
  });
});

describe('worker/session-log subagent last_event_at (UI-2mpn §6.4)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('leaves the attempt time untouched for a subagent line', () => {
    let now = 1_000;
    const log = createSessionLog({ now: () => now });
    log.publish(WS, 'att-1', { type: 'assistant' });

    now = 5_000;
    log.publish(WS, 'att-1', {
      type: 'assistant',
      parent_tool_use_id: 'toolu_a'
    });

    expect(log.lastEventAt(WS, 'att-1')).toBe(1_000);
  });

  test('records the subagent line time under its own launch', () => {
    let now = 1_000;
    const log = createSessionLog({ now: () => now });
    log.publish(WS, 'att-1', { type: 'assistant' });

    now = 5_000;
    const event = { type: 'assistant', parent_tool_use_id: 'toolu_a' };
    log.publish(WS, 'att-1', event);
    log.publish(WS, 'att-1', event, 'toolu_a');

    expect(log.lastEventAt(WS, 'att-1', 'toolu_a')).toBe(5_000);
  });

  test('still records a parent line time after a subagent line', () => {
    let now = 1_000;
    const log = createSessionLog({ now: () => now });

    log.publish(WS, 'att-1', {
      type: 'assistant',
      parent_tool_use_id: 'toolu_a'
    });
    now = 9_000;
    log.publish(WS, 'att-1', { type: 'assistant' });

    expect(log.lastEventAt(WS, 'att-1')).toBe(9_000);
  });
});

describe('worker/session-log — recorded attempt log path (UI-hk74 §7)', () => {
  /**
   * A transcript written outside `sessions/`: beside the
   * attempt's own marker, not under `sessions/`.
   *
   * @param {string} file
   * @param {unknown[]} events
   */
  function writeRecordedLog(file, events) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      file,
      events.map((event) => `${JSON.stringify(event)}\n`).join('')
    );
  }

  test('reads an attempt from the log path its record names', () => {
    const recorded = path.join(
      tmp_state,
      'review-sessions',
      'review_a.log.jsonl'
    );
    writeRecordedLog(recorded, [{ type: 'assistant', seq: 1 }]);
    const log = createSessionLog({
      attemptLogPath: () => recorded
    });

    const lines = log.read(WS, 'review:authority-1:aaa');

    expect(lines).toEqual([{ type: 'assistant', seq: 1 }]);
  });

  test('reports the recorded log mtime as the attempt last event time', () => {
    const recorded = path.join(
      tmp_state,
      'review-sessions',
      'review_b.log.jsonl'
    );
    writeRecordedLog(recorded, [{ type: 'assistant' }]);
    const log = createSessionLog({ attemptLogPath: () => recorded });

    const at = log.lastEventAtOf(WS, 'review:authority-1:bbb');

    expect(at).toBe(fs.statSync(recorded).mtimeMs);
  });

  test('falls back to the session path for a legacy attempt', () => {
    writeRunnerLine('att-legacy', { type: 'assistant', seq: 9 });
    const log = createSessionLog({ attemptLogPath: () => null });

    const lines = log.read(WS, 'att-legacy');

    expect(lines).toEqual([{ type: 'assistant', seq: 9 }]);
  });

  test('returns an empty snapshot when the recorded log is absent', () => {
    const log = createSessionLog({
      attemptLogPath: () => path.join(tmp_state, 'nope', 'gone.log.jsonl')
    });

    const lines = log.read(WS, 'review:authority-1:ccc');

    expect(lines).toEqual([]);
  });

  test('returns an empty snapshot when neither path exists', () => {
    const log = createSessionLog({ attemptLogPath: () => null });

    const lines = log.read(WS, 'att-missing');

    expect(lines).toEqual([]);
  });

  test('keeps the default path when the resolver throws', () => {
    writeRunnerLine('att-legacy', { type: 'assistant', seq: 3 });
    const log = createSessionLog({
      attemptLogPath: () => {
        throw new Error('store unreadable');
      }
    });

    const lines = log.read(WS, 'att-legacy');

    expect(lines).toEqual([{ type: 'assistant', seq: 3 }]);
  });

  test('leaves the spawn-side path resolution attempt-agnostic', () => {
    const recorded = path.join(tmp_state, 'review-sessions', 'x.log.jsonl');
    const log = createSessionLog({ attemptLogPath: () => recorded });

    expect(log.pathFor(WS, 'att-1')).toBe(sessionLogPath(WS, 'att-1'));
    expect(log.stderrPathFor(WS, 'att-1')).toBe(
      `${sessionLogPath(WS, 'att-1').replace(/\.jsonl$/, '')}.stderr.log`
    );
  });
});
