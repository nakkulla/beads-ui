import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  ensureDelegationMonitorDir,
  finalizeDelegationSessions,
  normalizeDelegationSessions,
  readAttemptDelegationStreams,
  removeEmptyDelegationMonitorDir
} from './delegation-monitor.js';
import { delegationMonitorDir } from './state-paths.js';

const WORKSPACE = '/tmp/example-workspace/project-a';
const ATTEMPT_ID = 'UI-c00b-1';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-monitor-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {string} launch_id
 * @param {Record<string, unknown>} event
 * @param {Partial<Record<string, unknown>>} [overrides]
 */
function monitorLine(launch_id, event, overrides = {}) {
  return {
    schema: 'codex-delegation-monitor-v1',
    attempt_id: ATTEMPT_ID,
    launch_id,
    provider: 'codex',
    role: 'implementation',
    model: 'gpt-5.6-sol',
    thread_id: 'thread-1',
    turn_id: event.type === 'session.started' ? null : 'turn-1',
    recorded_at: '2026-08-18T04:27:00.000Z',
    event,
    ...overrides
  };
}

/**
 * @param {string} launch_id
 * @param {Record<string, unknown>[]} lines
 * @param {{ trailing_newline?: boolean, mode?: number }} [options]
 */
function writeStream(launch_id, lines, options = {}) {
  ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);
  const file = path.join(
    delegationMonitorDir(WORKSPACE, ATTEMPT_ID),
    `${launch_id}.jsonl`
  );
  const suffix = options.trailing_newline === false ? '' : '\n';
  fs.writeFileSync(
    file,
    `${lines.map((line) => JSON.stringify(line)).join('\n')}${suffix}`,
    { mode: options.mode ?? 0o600 }
  );
  fs.chmodSync(file, options.mode ?? 0o600);
  return file;
}

describe('delegation monitor directory', () => {
  it('creates a private attempt directory', () => {
    const dir = delegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    const result = ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);

    expect(result).toEqual({ ok: true, dir });
    expect(fs.statSync(dir).mode & 0o777).toBe(0o700);
  });

  it('refuses an existing directory with a permissive mode', () => {
    const dir = delegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
    fs.chmodSync(dir, 0o755);

    const result = ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);

    expect(result).toEqual({ ok: false, reason: 'directory_mode' });
    expect(fs.statSync(dir).mode & 0o777).toBe(0o755);
  });

  it('refuses a symlink without changing its target', () => {
    const dir = delegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    const target = path.join(tmp_state, 'target');
    fs.mkdirSync(path.dirname(dir), { recursive: true });
    fs.mkdirSync(target, { mode: 0o700 });
    fs.symlinkSync(target, dir);

    const result = ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);

    expect(result).toEqual({ ok: false, reason: 'directory_type' });
    expect(fs.lstatSync(dir).isSymbolicLink()).toBe(true);
  });

  it('refuses a directory owned by another user', () => {
    const dir = delegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
    const foreign_fs = new Proxy(fs, {
      get(target, property) {
        if (property !== 'lstatSync') {
          return Reflect.get(target, property);
        }
        return (/** @type {fs.PathLike} */ file) => {
          const stat = target.lstatSync(file);
          return new Proxy(stat, {
            get(stat_target, stat_property) {
              return stat_property === 'uid'
                ? stat_target.uid + 1
                : Reflect.get(stat_target, stat_property);
            }
          });
        };
      }
    });

    const result = ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID, {
      fs: foreign_fs
    });

    expect(result).toEqual({ ok: false, reason: 'directory_owner' });
  });

  it('removes only an empty attempt directory', () => {
    ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);

    removeEmptyDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);

    expect(fs.existsSync(delegationMonitorDir(WORKSPACE, ATTEMPT_ID))).toBe(
      false
    );
  });
});

describe('delegation monitor stream reader', () => {
  it('rejects a stream file without mode 0600', () => {
    writeStream(
      'launch-1',
      [monitorLine('launch-1', { type: 'session.started' })],
      { mode: 0o644 }
    );

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('file_security');
  });

  it('rejects a symlink stream file', () => {
    ensureDelegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    const dir = delegationMonitorDir(WORKSPACE, ATTEMPT_ID);
    const target = path.join(tmp_state, 'stream-target');
    fs.writeFileSync(
      target,
      `${JSON.stringify(
        monitorLine('launch-1', { type: 'session.started' })
      )}\n`,
      { mode: 0o600 }
    );
    fs.symlinkSync(target, path.join(dir, 'launch-1.jsonl'));

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('file_security');
  });

  it('rejects a stream file owned by another user', () => {
    const file = writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' })
    ]);
    const foreign_fs = new Proxy(fs, {
      get(target, property) {
        if (property !== 'lstatSync') {
          return Reflect.get(target, property);
        }
        return (/** @type {fs.PathLike} */ inspected) => {
          const stat = target.lstatSync(inspected);
          if (inspected !== file) {
            return stat;
          }
          return new Proxy(stat, {
            get(stat_target, stat_property) {
              return stat_property === 'uid'
                ? stat_target.uid + 1
                : Reflect.get(stat_target, stat_property);
            }
          });
        };
      }
    });

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID, {
      fs: foreign_fs
    });

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('file_security');
  });

  it('projects a complete valid stream', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine(
        'launch-1',
        { type: 'turn.started' },
        {
          recorded_at: '2026-08-18T04:27:01.000Z'
        }
      ),
      monitorLine(
        'launch-1',
        { type: 'turn.completed', status: 'completed' },
        {
          recorded_at: '2026-08-18T04:27:02.000Z'
        }
      )
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([
      {
        launch_id: 'launch-1',
        provider: 'codex',
        role: 'implementation',
        model: 'gpt-5.6-sol',
        effort: null,
        session_id: 'thread-1',
        turn_id: 'turn-1',
        status: 'done',
        started_at: Date.parse('2026-08-18T04:27:00.000Z'),
        completed_at: '2026-08-18T04:27:02.000Z',
        last_event_at: Date.parse('2026-08-18T04:27:02.000Z')
      }
    ]);
    expect(result.streams[0].events).toHaveLength(3);
  });

  it('excludes a trailing partial line until its newline arrives', () => {
    const started = monitorLine('launch-1', { type: 'session.started' });
    const terminal = monitorLine(
      'launch-1',
      { type: 'turn.completed', status: 'completed' },
      { recorded_at: '2026-08-18T04:27:02.000Z' }
    );
    const file = writeStream('launch-1', [started], {
      trailing_newline: true
    });
    fs.appendFileSync(file, JSON.stringify(terminal));

    const first = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);
    fs.appendFileSync(file, '\n');
    const second = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID, {
      from_offsets: { 'launch-1': first.streams[0].offset }
    });

    expect(first.sessions[0].status).toBe('running');
    expect(first.streams[0].events).toHaveLength(1);
    expect(second.sessions[0].status).toBe('done');
    expect(second.streams[0].events).toEqual([
      { offset: first.streams[0].offset, event: terminal }
    ]);
    expect(second.streams[0].offset).toBe(fs.statSync(file).size);
  });

  it('skips one malformed complete line', () => {
    const file = writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' })
    ]);
    fs.appendFileSync(file, '{bad json}\n');
    fs.appendFileSync(
      file,
      `${JSON.stringify(
        monitorLine(
          'launch-1',
          { type: 'turn.completed', status: 'completed' },
          { recorded_at: '2026-08-18T04:27:02.000Z' }
        )
      )}\n`
    );

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].status).toBe('done');
    expect(result.streams[0].events).toHaveLength(2);
    expect(result.warnings).toContain('line_schema');
  });

  it('rejects a whole stream on an identity conflict', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine(
        'launch-1',
        { type: 'turn.started' },
        {
          thread_id: 'another-thread',
          recorded_at: '2026-08-18T04:27:01.000Z'
        }
      )
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.streams).toEqual([]);
    expect(result.warnings).toContain('identity_conflict');
  });

  it('accepts effort on every line and projects it', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }, { effort: 'high' }),
      monitorLine('launch-1', { type: 'turn.started' }, { effort: 'high' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].effort).toBe('high');
  });

  it('rejects a whole stream when effort changes', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }, { effort: 'high' }),
      monitorLine('launch-1', { type: 'turn.started' }, { effort: 'low' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('identity_conflict');
  });

  it('rejects an empty effort', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }, { effort: '' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
  });

  it('merges a legacy durable identity with observed effort', () => {
    const durable = {
      launch_id: 'launch-1',
      provider: 'codex',
      role: 'implementation',
      model: 'gpt-5.6-sol',
      session_id: 'thread-1',
      turn_id: null,
      status: 'running',
      started_at: Date.parse('2026-08-18T04:27:00.000Z'),
      completed_at: null,
      last_event_at: Date.parse('2026-08-18T04:27:00.000Z')
    };
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }, { effort: 'high' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID, {
      known_sessions: [durable]
    });

    expect(result.sessions[0].effort).toBe('high');
    expect(result.warnings).not.toContain('identity_conflict');
  });

  it('rejects a whole stream when its provider identity changes', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine('launch-1', { type: 'turn.started' }, { provider: 'other' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('identity_conflict');
  });

  it('rejects a whole stream whose first complete line is malformed', () => {
    const started = monitorLine('launch-1', { type: 'session.started' });
    const file = writeStream('launch-1', [started]);
    fs.writeFileSync(file, `not json\n${fs.readFileSync(file, 'utf8')}`, {
      mode: 0o600
    });

    const read = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(read.sessions).toEqual([]);
    expect(read.warnings).toContain('identity_conflict');
  });

  it('skips re-reading a stream already consumed to its current size', () => {
    const file = writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' })
    ]);
    const first = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    const read = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID, {
      from_offsets: { 'launch-1': fs.statSync(file).size }
    });

    expect(first.streams).toHaveLength(1);
    expect(read.streams).toEqual([]);
    expect(read.sessions).toEqual([]);
  });

  it('rejects a whole stream when its first event is not session started', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'turn.started' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions).toEqual([]);
    expect(result.warnings).toContain('identity_conflict');
  });

  it('derives running status without a terminal event', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].status).toBe('running');
  });

  it('derives done status from turn completion', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine('launch-1', { type: 'turn.completed', status: 'completed' })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].status).toBe('done');
  });

  it('derives failed status from turn failure', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine('launch-1', {
        type: 'turn.failed',
        status: 'failed',
        error_code: 'turn_failed'
      })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].status).toBe('failed');
  });

  it('derives interrupted status from interrupted turn failure', () => {
    writeStream('launch-1', [
      monitorLine('launch-1', { type: 'session.started' }),
      monitorLine('launch-1', {
        type: 'turn.failed',
        status: 'interrupted',
        error_code: 'interrupted'
      })
    ]);

    const result = readAttemptDelegationStreams(WORKSPACE, ATTEMPT_ID);

    expect(result.sessions[0].status).toBe('interrupted');
  });
});

describe('delegation session summaries', () => {
  const running = {
    launch_id: 'launch-1',
    provider: 'codex',
    role: 'implementation',
    model: 'gpt-5.6-sol',
    effort: null,
    session_id: 'thread-1',
    turn_id: null,
    status: 'running',
    started_at: 1,
    completed_at: null,
    last_event_at: 1
  };

  it('pins running sessions to interrupted after the outer attempt terminates', () => {
    const result = finalizeDelegationSessions([running], true);

    expect(result).toEqual([{ ...running, status: 'interrupted' }]);
  });

  it('keeps the first valid identity when launch ids repeat', () => {
    const result = normalizeDelegationSessions([
      running,
      { ...running, role: 'review-consult', model: 'other' }
    ]);

    expect(result).toEqual([running]);
  });
});
