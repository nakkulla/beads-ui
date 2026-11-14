import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  findAttemptPrompts,
  readAttemptPrompts,
  writeAttemptPrompts
} from './attempt-prompts.js';
import { createBeadTimeline } from './bead-timeline.js';
import { createQueueStore } from './queue-store.js';
import {
  attemptPromptPath,
  attemptRecordPath,
  queueFilePath
} from './state-paths.js';

const WS = '/tmp/example-workspace/prompts';
/** @type {string} */
let tmp_state;
const legacy = {
  attempt_id: 'a1',
  bead_id: 'B1',
  status: 'running',
  started_at: 100,
  system_prompt: 'system',
  task_prompt: 'task',
  disposition_prompt: 'relaunch'
};

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-prompts-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/** @param {Record<string, any>} attempts */
function seedQueue(attempts) {
  const file = queueFilePath(WS);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ attempts }));
  return createQueueStore();
}

describe('attempt prompt files', () => {
  test('writes an atomic record and resolves an arbitrary attempt id', () => {
    const rename = vi.spyOn(fs, 'renameSync');

    const written = writeAttemptPrompts(WS, legacy);

    expect(written).toBe(true);
    expect(rename).toHaveBeenCalledWith(
      `${attemptPromptPath(WS, 'B1', 'a1')}.tmp`,
      attemptPromptPath(WS, 'B1', 'a1')
    );
    expect(findAttemptPrompts(WS, 'a1')).toEqual({
      attempt_id: 'a1',
      system_prompt: 'system',
      task_prompt: 'task',
      recorded_at: 100
    });
    expect(fs.existsSync(`${attemptPromptPath(WS, 'B1', 'a1')}.tmp`)).toBe(
      false
    );
  });

  test('returns null for corrupt or unreadable prompt files', () => {
    writeAttemptPrompts(WS, legacy);
    fs.writeFileSync(attemptPromptPath(WS, 'B1', 'a1'), '{broken');

    expect(readAttemptPrompts(WS, 'B1', 'a1')).toBeNull();
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('EACCES');
    });
    expect(readAttemptPrompts(WS, 'B1', 'a1')).toBeNull();
  });

  test('removes legacy queue fields only after writing their file', () => {
    const store = seedQueue({ a1: legacy });
    store.load(WS);

    store.migrateAttemptPrompts(WS);

    const attempt = store.snapshot(WS).attempts.a1;
    expect(attempt).not.toHaveProperty('system_prompt');
    expect(attempt).not.toHaveProperty('task_prompt');
    expect(attempt.disposition_prompt).toBe('relaunch');
    expect(readAttemptPrompts(WS, 'B1', 'a1')).toMatchObject({
      system_prompt: 'system',
      task_prompt: 'task'
    });
    expect(createQueueStore().load(WS).attempts.a1).not.toHaveProperty(
      'system_prompt'
    );
  });

  test('preserves an existing file and makes repeated migration a no-op', () => {
    writeAttemptPrompts(WS, { ...legacy, task_prompt: 'already saved' });
    const store = seedQueue({ a1: legacy });

    store.migrateAttemptPrompts(WS);
    const first = store.snapshot(WS);
    createQueueStore().migrateAttemptPrompts(WS);
    store.migrateAttemptPrompts(WS);

    expect(readAttemptPrompts(WS, 'B1', 'a1')?.task_prompt).toBe(
      'already saved'
    );
    expect(store.snapshot(WS)).toBe(first);
  });

  test('keeps a failed attempt migration while moving successful siblings', () => {
    const store = seedQueue({
      a1: legacy,
      a2: { ...legacy, attempt_id: 'a2' }
    });
    const write = fs.writeFileSync;
    vi.spyOn(fs, 'writeFileSync').mockImplementation((file, ...args) => {
      if (String(file) === `${attemptPromptPath(WS, 'B1', 'a1')}.tmp`) {
        throw new Error('EACCES');
      }
      return write(file, ...args);
    });

    store.migrateAttemptPrompts(WS);

    expect(store.snapshot(WS).attempts.a1).toMatchObject({
      system_prompt: 'system',
      task_prompt: 'task'
    });
    expect(store.snapshot(WS).attempts.a2).not.toHaveProperty('task_prompt');
    vi.restoreAllMocks();
    createQueueStore().migrateAttemptPrompts(WS);
    expect(createQueueStore().load(WS).attempts.a1).not.toHaveProperty(
      'task_prompt'
    );
  });

  test('leaves no published file when the atomic rename fails', () => {
    vi.spyOn(fs, 'renameSync').mockImplementation(() => {
      throw new Error('EACCES');
    });

    const written = writeAttemptPrompts(WS, legacy);

    expect(written).toBe(false);
    expect(readAttemptPrompts(WS, 'B1', 'a1')).toBeNull();
    expect(fs.existsSync(`${attemptPromptPath(WS, 'B1', 'a1')}.tmp`)).toBe(
      false
    );
  });

  test('transfers legacy attempts without copying prompt fields into records', () => {
    seedQueue({ a1: { ...legacy, status: 'done', finished_at: 200 } });
    const store = createQueueStore({
      timeline: createBeadTimeline({ workspace_root: WS })
    });

    store.setAutoAdvance(WS, false);

    const record = JSON.parse(
      fs.readFileSync(attemptRecordPath(WS, 'B1', 'a1'), 'utf8')
    );
    expect(record).not.toHaveProperty('system_prompt');
    expect(record).not.toHaveProperty('task_prompt');
    expect(record.disposition_prompt).toBe('relaunch');
    expect(readAttemptPrompts(WS, 'B1', 'a1')?.task_prompt).toBe('task');
  });
});
