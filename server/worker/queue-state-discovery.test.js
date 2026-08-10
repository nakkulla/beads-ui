import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { discoverQueueStates } from './queue-state-discovery.js';

/** @type {string} */
let tmp_dir;

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-discovery-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('queue state discovery', () => {
  test('distinguishes absent and malformed durable queue files from readable state', () => {
    const root = path.join(tmp_dir, 'bdui');
    fs.mkdirSync(path.join(root, 'absent'), { recursive: true });
    fs.mkdirSync(path.join(root, 'malformed'), { recursive: true });
    fs.mkdirSync(path.join(root, 'ready'), { recursive: true });
    fs.writeFileSync(path.join(root, 'malformed', 'queue.json'), '{');
    fs.writeFileSync(
      path.join(root, 'ready', 'queue.json'),
      JSON.stringify({ default_exec_preset_id: 'preset-1' })
    );

    const discovered = discoverQueueStates({ state_home: tmp_dir });

    expect(discovered.complete).toBe(false);
    expect(
      discovered.states.map((state) => [state.workspace_key, state.status])
    ).toEqual([
      ['absent', 'absent'],
      ['malformed', 'malformed'],
      ['ready', 'ok']
    ]);
  });

  test('treats an absent queue file as a complete known-unreferenced state', () => {
    fs.mkdirSync(path.join(tmp_dir, 'bdui', 'absent'), { recursive: true });

    const discovered = discoverQueueStates({ state_home: tmp_dir });

    expect(discovered).toMatchObject({
      complete: true,
      states: [{ workspace_key: 'absent', status: 'absent' }]
    });
  });
});
