import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createSessionLog } from './session-log.js';
import { sessionLogPath } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
/** @type {string} */
let tmp_state;

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
  test('append persists jsonl under the XDG sessions dir; read parses it back', () => {
    const log = createSessionLog();
    log.append(WS, 'att-1', { type: 'system' });
    log.append(WS, 'att-1', { type: 'assistant', text: 'hi' });

    const file = sessionLogPath(WS, 'att-1');
    expect(file.includes(path.join('bdui'))).toBe(true);
    expect(file.endsWith(path.join('sessions', 'att-1.jsonl'))).toBe(true);
    expect(fs.existsSync(file)).toBe(true);

    const events = log.read(WS, 'att-1');
    expect(events).toEqual([
      { type: 'system' },
      { type: 'assistant', text: 'hi' }
    ]);
  });

  test('attach persists a runner handle raw event stream', () => {
    const log = createSessionLog();
    const events = new EventEmitter();
    log.attach(WS, 'att-2', events);
    events.emit('raw', { type: 'thread.started' });
    events.emit('raw', { type: 'turn.completed' });
    expect(log.read(WS, 'att-2')).toEqual([
      { type: 'thread.started' },
      { type: 'turn.completed' }
    ]);
  });

  test('read of an absent attempt returns []', () => {
    expect(createSessionLog().read(WS, 'nope')).toEqual([]);
  });
});
