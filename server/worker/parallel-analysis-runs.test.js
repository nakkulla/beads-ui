import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  PARALLEL_ANALYSIS_RUN_LIMIT,
  createParallelAnalysisRunsStore,
  parallelAnalysisPromptPath
} from './parallel-analysis-runs.js';
import { parallelAnalysisRunsPath, sessionLogPath } from './state-paths.js';

const WS = '/ws/runs';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-runs-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {string} run_id
 */
function runOf(run_id) {
  return {
    run_id,
    session_id: null,
    runner: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: 'high',
    target_ids: ['UI-a'],
    snapshot_digest: 'd'.repeat(64),
    identity: 'i'.repeat(64),
    started_at: 10,
    ended_at: null,
    outcome: /** @type {const} */ ('running'),
    reason: null,
    diagnostic: null,
    prompt_saved: true
  };
}

describe('parallel-analysis durable runs', () => {
  test('records and updates one run lifecycle', () => {
    const store = createParallelAnalysisRunsStore();
    store.create(WS, runOf('analysis-1-1'));

    store.update(WS, 'analysis-1-1', {
      outcome: 'success',
      ended_at: 20,
      session_id: 'session-1'
    });

    expect(store.read(WS, [])).toEqual([
      expect.objectContaining({
        run_id: 'analysis-1-1',
        outcome: 'success',
        ended_at: 20,
        session_id: 'session-1'
      })
    ]);
  });

  test('rotates history and deletes evicted owned files', () => {
    const store = createParallelAnalysisRunsStore();
    const oldest = 'analysis-1-1';
    fs.mkdirSync(path.dirname(parallelAnalysisPromptPath(WS, oldest)), {
      recursive: true
    });
    fs.mkdirSync(path.dirname(sessionLogPath(WS, oldest)), { recursive: true });
    fs.writeFileSync(parallelAnalysisPromptPath(WS, oldest), 'prompt');
    fs.writeFileSync(sessionLogPath(WS, oldest), '{}\n');
    for (let index = 1; index <= PARALLEL_ANALYSIS_RUN_LIMIT + 1; index += 1) {
      store.create(WS, runOf(`analysis-${index}-1`));
    }

    const runs = store.read(WS, []);

    expect(runs).toHaveLength(PARALLEL_ANALYSIS_RUN_LIMIT);
    expect(runs.some((run) => run.run_id === oldest)).toBe(false);
    expect(fs.existsSync(parallelAnalysisPromptPath(WS, oldest))).toBe(false);
    expect(fs.existsSync(sessionLogPath(WS, oldest))).toBe(false);
  });

  test('marks an inactive running record interrupted on read', () => {
    const store = createParallelAnalysisRunsStore({ now: () => 99 });
    store.create(WS, runOf('analysis-1-1'));

    const runs = store.read(WS, []);

    expect(runs[0]).toMatchObject({
      outcome: 'interrupted',
      reason: 'server_restart',
      ended_at: 99
    });
  });

  test('keeps an active running record unchanged on read', () => {
    const store = createParallelAnalysisRunsStore({ now: () => 99 });
    store.create(WS, runOf('analysis-1-1'));

    const runs = store.read(WS, ['analysis-1-1']);

    expect(runs[0].outcome).toBe('running');
    expect(runs[0].ended_at).toBeNull();
  });

  test('reads a damaged history as empty and recreates it on write', () => {
    const file = parallelAnalysisRunsPath(WS);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '{broken');
    const store = createParallelAnalysisRunsStore();

    const damaged = store.read(WS, []);
    store.create(WS, runOf('analysis-2-1'));

    expect(damaged).toEqual([]);
    expect(store.read(WS, ['analysis-2-1'])).toHaveLength(1);
  });
});
