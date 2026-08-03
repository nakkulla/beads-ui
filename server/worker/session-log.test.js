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
