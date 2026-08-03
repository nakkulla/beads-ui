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

  test('read of an absent attempt returns []', () => {
    expect(createSessionLog().read(WS, 'nope')).toEqual([]);
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
});
