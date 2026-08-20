import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from '../worker/attach.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';
import { sessionLogPath } from '../worker/state-paths.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from '../ws.js';
import { __setAnalysisDepsForTest } from './worker-parallel-analysis-handlers.js';

/** @type {string} */
let tmp_state;
const WS = process.cwd();
const BASE_SHA = 'b'.repeat(40);
const RECEIPT = `self@${'a'.repeat(40)}`;

function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 */
function replyFor(sock, id) {
  for (const raw of sock.sent) {
    const m = JSON.parse(raw);
    if (m.id === id) {
      return m;
    }
  }
  return null;
}

/**
 * @param {{ sent: string[] }} sock
 */
function analysisSnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'worker-parallel-analysis-snapshot')
    .map((m) => m.payload);
}

/**
 * @param {string} id
 * @param {any} over
 */
function issueOf(id, over = {}) {
  return {
    id,
    title: id,
    status: 'open',
    labels: [],
    dependencies: [],
    metadata: {
      route: 'spec_backed',
      spec_id: `docs/${id}.md`,
      spec_review: RECEIPT
    },
    ...over
  };
}

const ISSUES = [issueOf('UI-a'), issueOf('UI-b'), issueOf('UI-c')];

/**
 * @param {any} over
 */
function analysisResult(over = {}) {
  return {
    schema_version: 3,
    snapshot_digest: '',
    issues: [{ bead_id: 'UI-c', verdict: 'parallel_ok', reason: '독립' }],
    groups: [
      {
        members: ['UI-a', 'UI-b'],
        order: ['UI-a', 'UI-b'],
        confidence: 'high',
        categories: ['schema_or_migration'],
        reason: '같은 마이그레이션',
        evidence: [
          {
            path: 'docs/UI-a.md',
            artifact_kind: 'spec',
            locator: 'queue.json'
          }
        ]
      }
    ],
    ...over
  };
}

/** @type {{ runs: number, outcome: any, model_ids: string[], inputs: any[] }} */
let runner_state;

/**
 * The analyzer's injected deps: a fake bd issue lister, a pinned-blob git
 * runner, and a fake tool-free runner. No real process is ever spawned.
 *
 * @param {{ result?: any, outcome?: any }} [options]
 */
function analysisDeps(options = {}) {
  return {
    listIssues: async () => ISSUES,
    analysisContext: () => ({
      repo: '/repo',
      resolveBase: async () => ({ ok: true, base: 'main', base_oid: BASE_SHA }),
      gitRun: async (/** @type {string[]} */ args) => {
        const target = String(args[args.length - 1]);
        if (!/docs\/UI-[abc]\.md$/.test(target)) {
          return { code: 128, stdout: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: `${'c'.repeat(40)}\n` };
        }
        if (args[1] === '-s') {
          return { code: 0, stdout: '32\n' };
        }
        return { code: 0, stdout: '레인 상태는 queue.json 에 있다\n' };
      }
    }),
    runAnalysis: (/** @type {any} */ input) => {
      runner_state.runs += 1;
      runner_state.inputs.push(input);
      if (typeof input.model_id === 'string') {
        runner_state.model_ids.push(input.model_id);
      }
      const outcome = runner_state.outcome || {
        ok: true,
        result: {
          ...(options.result || analysisResult()),
          snapshot_digest: input.snapshot.digest
        }
      };
      return { done: Promise.resolve(outcome), cancel: vi.fn() };
    }
  };
}

/**
 * @param {{ result?: any, outcome?: any }} [options]
 */
function armAnalysis(options = {}) {
  runner_state = {
    runs: 0,
    outcome: options.outcome || null,
    model_ids: [],
    inputs: []
  };
  __setAnalysisDepsForTest(analysisDeps(options));
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wspa-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerRuntimeForTest();
  __resetWorkerAttachmentsForTest();
  attachWsServer(createServer(), { path: '/ws' });
  armAnalysis();
  getWorkerRuntime().parallelAnalysis.updateSettings({
    expected_revision: 0,
    runner: 'claude',
    model: 'opus',
    effort: 'high'
  });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __setAnalysisDepsForTest(null);
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  __resetWorkerRuntimeForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * Seed two waiting beads in the parallel lane.
 */
function seedQueue() {
  const store = getWorkerRuntime().queueStore;
  let rev = store.snapshot(WS).revision;
  for (const id of ['UI-a', 'UI-b']) {
    rev = store.place(WS, { expected_revision: rev, bead_id: id }).queue
      .revision;
  }
  return rev;
}

describe('ws worker-parallel-analysis channel (UI-04vo seam J)', () => {
  test('subscribe replies and pushes an idle snapshot with the settings', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    expect(replyFor(sock, 's1').ok).toBe(true);
    const snap = analysisSnapshots(sock).at(-1);
    expect(snap.job).toBeNull();
    expect(snap.settings).toMatchObject({ runner: 'claude', model: 'opus' });
    expect(snap.last_good).toBeNull();
  });

  test('start runs the analyzer once and fans out the validated last-good result', async () => {
    seedQueue();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    const reply = replyFor(sock, 'r1');
    expect(reply.payload).toMatchObject({ applied: true });
    expect(runner_state.runs).toBe(1);
    const snap = analysisSnapshots(sock).at(-1);
    expect(snap.last_good.result.groups[0].eligible).toBe(true);
    expect(snap.last_good.result.groups[0].members).toEqual(['UI-a', 'UI-b']);
    expect(snap.runs[0]).toMatchObject({
      outcome: 'success',
      target_ids: ['UI-a', 'UI-b', 'UI-c']
    });
  });

  test('stores the exact stdin payload for prompt retrieval', async () => {
    seedQueue();
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const run_id = replyFor(sock, 'r1').payload.job_id;
    await send(sock, 'p1', 'worker-parallel-analysis-prompt', { run_id });

    expect(replyFor(sock, 'p1').payload).toEqual({
      ok: true,
      prompt: runner_state.inputs[0].payload
    });
  });

  test('records each stream line and publishes its event', async () => {
    seedQueue();
    const deps = analysisDeps();
    const line = JSON.stringify({ type: 'system', subtype: 'init' });
    __setAnalysisDepsForTest({
      ...deps,
      runAnalysis: (/** @type {any} */ input) => {
        input.onStreamLine(line);
        return deps.runAnalysis(input);
      }
    });
    const publish = vi.spyOn(getWorkerRuntime().sessionLog, 'publish');
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const run_id = replyFor(sock, 'r1').payload.job_id;

    expect(fs.readFileSync(sessionLogPath(WS, run_id), 'utf8')).toBe(
      `${line}\n`
    );
    expect(publish).toHaveBeenCalledWith(WS, run_id, JSON.parse(line));
  });

  test('fans out a claude session id on the active job', async () => {
    seedQueue();
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      runAnalysis: (/** @type {any} */ input) => {
        input.onStreamLine(
          JSON.stringify({
            type: 'system',
            subtype: 'init',
            session_id: 'claude-session'
          })
        );
        return deps.runAnalysis(input);
      }
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    const running = analysisSnapshots(sock).find(
      (snapshot) => snapshot.job?.session_id === 'claude-session'
    );
    expect(running.job.session_id).toBe('claude-session');
  });

  test('extracts a codex thread id into run history', async () => {
    seedQueue();
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 1,
      runner: 'codex',
      model: 'sol',
      effort: 'high'
    });
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      catalog: { runners: { codex: { models: { sol: { id: 'gpt-sol' } } } } },
      validateSelection: () => true,
      runAnalysis: (/** @type {any} */ input) => {
        input.onStreamLine(
          JSON.stringify({ type: 'thread.started', thread_id: 'thread-1' })
        );
        return deps.runAnalysis(input);
      }
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    expect(
      getWorkerRuntime().parallelAnalysisRuns.read(WS, [])[0].session_id
    ).toBe('thread-1');
  });

  test('returns not_found for an unknown prompt run', async () => {
    const sock = fakeSocket();

    await send(sock, 'p1', 'worker-parallel-analysis-prompt', {
      run_id: 'analysis-missing'
    });

    expect(replyFor(sock, 'p1').payload).toEqual({
      ok: false,
      reason: 'not_found'
    });
  });

  test('a second start on the same identity is a cache hit that never re-runs', async () => {
    seedQueue();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    await send(sock, 'r2', 'worker-parallel-analysis-start', {});

    expect(runner_state.runs).toBe(1);
    expect(replyFor(sock, 'r2').payload.cached).toBe(true);
  });

  test('returns the analysis universe with exclusions and lane overlays', async () => {
    seedQueue();
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      listIssues: async () => [
        issueOf('UI-a'),
        issueOf('UI-b'),
        issueOf('UI-x', { metadata: { route: 'quick_fix' } }),
        issueOf('UI-z', { status: 'closed' })
      ],
      analysisContext: () => ({
        resolveBase: async () => ({
          ok: true,
          base: 'main',
          base_oid: BASE_SHA
        }),
        gitRun: async (/** @type {string[]} */ args) => {
          const target = String(args[2]);
          if (target.endsWith('docs/UI-a.md')) {
            return {
              code: 0,
              stdout: '---\nscope:\n  - server/worker\n---\n'
            };
          }
          if (target.endsWith('docs/UI-b.md')) {
            return { code: 0, stdout: '---\nscope:\n  - server\n---\n' };
          }
          return { code: 128, stdout: '' };
        }
      })
    });
    const sock = fakeSocket();

    await send(sock, 't1', 'worker-parallel-analysis-targets', {});

    expect(replyFor(sock, 't1').payload.qualified).toEqual([
      expect.objectContaining({
        id: 'UI-a',
        lane: 'parallel',
        scope: ['server/worker'],
        overlaps: ['UI-b']
      }),
      expect.objectContaining({
        id: 'UI-b',
        scope: ['server'],
        overlaps: ['UI-a']
      })
    ]);
    expect(replyFor(sock, 't1').payload.excluded).toEqual([
      expect.objectContaining({ id: 'UI-x', reason: 'route', lane: null })
    ]);
  });

  test('omits scope fields when context, base, or git resolution fails', async () => {
    seedQueue();
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      listIssues: async () => [issueOf('UI-a')],
      analysisContext: () => null
    });
    const sock = fakeSocket();

    await send(sock, 't-context', 'worker-parallel-analysis-targets', {});
    __setAnalysisDepsForTest({
      ...deps,
      listIssues: async () => [issueOf('UI-a')],
      analysisContext: () => ({
        resolveBase: async () => ({ ok: false }),
        gitRun: vi.fn()
      })
    });
    await send(sock, 't-base', 'worker-parallel-analysis-targets', {});
    __setAnalysisDepsForTest({
      ...deps,
      listIssues: async () => [issueOf('UI-a')],
      analysisContext: () => ({
        resolveBase: async () => ({
          ok: true,
          base: 'main',
          base_oid: BASE_SHA
        }),
        gitRun: async () => ({ code: 128, stdout: '' })
      })
    });
    await send(sock, 't-git', 'worker-parallel-analysis-targets', {});

    expect(replyFor(sock, 't-context').payload.qualified[0]).not.toHaveProperty(
      'scope'
    );
    expect(replyFor(sock, 't-context').payload.qualified[0]).not.toHaveProperty(
      'overlaps'
    );
    expect(replyFor(sock, 't-base').payload.qualified[0]).not.toHaveProperty(
      'scope'
    );
    expect(replyFor(sock, 't-base').payload.qualified[0]).not.toHaveProperty(
      'overlaps'
    );
    expect(replyFor(sock, 't-git').payload.qualified[0]).not.toHaveProperty(
      'scope'
    );
    expect(replyFor(sock, 't-git').payload.qualified[0]).not.toHaveProperty(
      'overlaps'
    );
  });

  test('starts analysis with only the requested qualified subset', async () => {
    seedQueue();
    armAnalysis({
      result: analysisResult({
        issues: [],
        groups: [analysisResult().groups[0]]
      })
    });
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {
      target_ids: ['UI-a', 'UI-b']
    });

    expect(replyFor(sock, 'r1').payload.applied).toBe(true);
    expect(runner_state.inputs[0].snapshot.target_ids).toEqual([
      'UI-a',
      'UI-b'
    ]);
  });

  test('rejects a start when any requested target is not qualified', async () => {
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {
      target_ids: ['UI-a', 'UI-missing']
    });

    expect(replyFor(sock, 'r1').payload).toMatchObject({
      applied: false,
      reason: 'target_not_qualified',
      detail: ['UI-missing']
    });
    expect(runner_state.runs).toBe(0);
  });

  test('rejects an empty requested target subset', async () => {
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {
      target_ids: []
    });

    expect(replyFor(sock, 'r1').payload.reason).toBe('no_targets');
    expect(runner_state.runs).toBe(0);
  });

  test('does not duplicate run history when a start joins active work', async () => {
    seedQueue();
    /** @type {(value: any) => void} */
    let resolveDone = () => {};
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      runAnalysis: (/** @type {any} */ input) => {
        runner_state.runs += 1;
        runner_state.inputs.push(input);
        return {
          done: new Promise((resolve) => {
            resolveDone = resolve;
          }),
          cancel: vi.fn()
        };
      }
    });
    const sock = fakeSocket();

    const first = send(sock, 'r1', 'worker-parallel-analysis-start', {});
    await new Promise((resolve) => setTimeout(resolve, 5));
    const second = send(sock, 'r2', 'worker-parallel-analysis-start', {});
    await new Promise((resolve) => setTimeout(resolve, 5));
    resolveDone({
      ok: true,
      result: {
        ...analysisResult(),
        snapshot_digest: runner_state.inputs[0].snapshot.digest
      }
    });
    await Promise.all([first, second]);

    expect(runner_state.runs).toBe(1);
    expect(getWorkerRuntime().parallelAnalysisRuns.read(WS, [])).toHaveLength(
      1
    );
  });

  test('re-runs when the catalog remaps a codex short name to a new model id', async () => {
    seedQueue();
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 1,
      runner: 'codex',
      model: 'sol',
      effort: 'xhigh'
    });
    const sock = fakeSocket();
    const deps = analysisDeps();
    __setAnalysisDepsForTest({
      ...deps,
      catalog: {
        runners: {
          codex: { models: { sol: { id: 'gpt-codex-old' } } }
        }
      },
      validateSelection: () => true
    });

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const first_identity = replyFor(sock, 'r1').payload.identity;
    __setAnalysisDepsForTest({
      ...deps,
      catalog: {
        runners: {
          codex: { models: { sol: { id: 'gpt-codex-new' } } }
        }
      },
      validateSelection: () => true
    });

    await send(sock, 'r2', 'worker-parallel-analysis-start', {});

    expect(replyFor(sock, 'r2').payload.cached).toBe(false);
    expect(replyFor(sock, 'r2').payload.identity).not.toBe(first_identity);
    expect(runner_state.runs).toBe(2);
    expect(runner_state.model_ids).toEqual(['gpt-codex-old', 'gpt-codex-new']);
  });

  test('force re-runs while preserving the previous last-good on failure', async () => {
    seedQueue();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const good = analysisSnapshots(sock).at(-1).last_good;
    runner_state.outcome = { ok: false, reason: 'invalid_output' };

    await send(sock, 'r2', 'worker-parallel-analysis-start', { force: true });

    expect(runner_state.runs).toBe(2);
    expect(replyFor(sock, 'r2').payload.applied).toBe(false);
    expect(analysisSnapshots(sock).at(-1).last_good).toEqual(good);
  });

  test('an invalid result never becomes a last-good cache entry', async () => {
    seedQueue();
    const sock = fakeSocket();
    armAnalysis({ result: analysisResult({ issues: [] }) });
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    const reply = replyFor(sock, 'r1');
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.reason).toBe('partition');
    expect(analysisSnapshots(sock).at(-1).last_good).toBeNull();
  });

  test('runs the default selection when nothing is stored', async () => {
    seedQueue();
    fs.rmSync(path.join(tmp_state, 'bdui'), { recursive: true, force: true });
    __resetWorkerRuntimeForTest();
    armAnalysis();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    expect(replyFor(sock, 'r1').payload.applied).toBe(true);
    expect(runner_state.runs).toBe(1);
    expect(analysisSnapshots(sock)[0].settings).toMatchObject({
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      is_default: true,
      compatible: true
    });
  });

  test('marks a stored selection as not default in the snapshot', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    expect(analysisSnapshots(sock).at(-1).settings).toMatchObject({
      is_default: false,
      compatible: true
    });
  });

  test('refuses a start whose stored selection the catalog no longer offers', async () => {
    seedQueue();
    armAnalysis();
    __setAnalysisDepsForTest({
      ...analysisDeps(),
      validateSelection: () => false
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    expect(replyFor(sock, 'r1').payload.reason).toBe('settings_incompatible');
    expect(runner_state.runs).toBe(0);
  });

  test('refuses a start whose default selection is not in the catalog', async () => {
    seedQueue();
    fs.rmSync(path.join(tmp_state, 'bdui'), { recursive: true, force: true });
    __resetWorkerRuntimeForTest();
    armAnalysis();
    __setAnalysisDepsForTest({
      ...analysisDeps(),
      validateSelection: () => false
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    expect(replyFor(sock, 'r1').payload.reason).toBe('settings_missing');
    expect(runner_state.runs).toBe(0);
  });

  test('marks an incompatible stored selection in the snapshot without hiding it', async () => {
    armAnalysis();
    __setAnalysisDepsForTest({
      ...analysisDeps(),
      validateSelection: () => false
    });
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    expect(analysisSnapshots(sock).at(-1).settings).toMatchObject({
      runner: 'claude',
      model: 'opus',
      compatible: false
    });
  });

  test('carries the running selection and start time on the job', async () => {
    seedQueue();
    /** @type {(v: any) => void} */
    let resolveDone = () => {};
    armAnalysis();
    __setAnalysisDepsForTest({
      ...analysisDeps(),
      runAnalysis: () => ({
        done: new Promise((res) => {
          resolveDone = res;
        }),
        cancel: vi.fn()
      })
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    const started = send(sock, 'r1', 'worker-parallel-analysis-start', {});
    await new Promise((res) => setTimeout(res, 5));

    const job = analysisSnapshots(sock).at(-1).job;

    expect(job).toMatchObject({
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    expect(typeof job.started_at).toBe('number');
    resolveDone({ ok: false, reason: 'cancelled' });
    await started;
  });

  test('settings-update persists under CAS and fans out', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'claude',
      model: 'sonnet',
      effort: 'medium'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(true);
    expect(analysisSnapshots(sock).at(-1).settings).toMatchObject({
      model: 'sonnet',
      effort: 'medium'
    });
  });

  test('rejects an effort the model does not accept even though the runner lists it', async () => {
    const sock = fakeSocket();

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'codex',
      model: 'sol',
      effort: 'minimal'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(false);
    expect(replyFor(sock, 'u1').payload.reason).toBe('selection_invalid');
  });

  test('accepts xhigh for sol', async () => {
    const sock = fakeSocket();

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'codex',
      model: 'sol',
      effort: 'xhigh'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(true);
  });

  test('accepts max for luna', async () => {
    const sock = fakeSocket();

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'codex',
      model: 'luna',
      effort: 'max'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(true);
  });

  test('accepts xhigh but rejects max for opus', async () => {
    const sock = fakeSocket();

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'claude',
      model: 'opus',
      effort: 'xhigh'
    });
    await send(sock, 'u2', 'worker-parallel-analysis-settings-update', {
      expected_revision: 2,
      runner: 'claude',
      model: 'opus',
      effort: 'max'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(true);
    expect(replyFor(sock, 'u2').payload.applied).toBe(false);
    expect(replyFor(sock, 'u2').payload.reason).toBe('selection_invalid');
  });

  test('rejects a runner without a tool-free analyzer transport', async () => {
    const sock = fakeSocket();

    await send(sock, 'u1', 'worker-parallel-analysis-settings-update', {
      expected_revision: 1,
      runner: 'gemini',
      model: 'opus',
      effort: 'high'
    });

    expect(replyFor(sock, 'u1').payload.applied).toBe(false);
    expect(replyFor(sock, 'u1').payload.reason).toBe('selection_invalid');
  });

  test('submit moves the eligible group into the target lane in one CAS', async () => {
    const rev = seedQueue();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const digest = analysisSnapshots(sock).at(-1).last_good.identity_digest;

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    const reply = replyFor(sock, 'sub1');
    expect(reply.payload.applied).toBe(true);
    const queue = getWorkerRuntime().queueStore.snapshot(WS);
    expect(queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'UI-a',
      'UI-b'
    ]);
    expect(queue.queue).toEqual([]);
    expect(queue.revision).toBe(rev + 1);
  });

  test('re-derives a subset last-good snapshot for submit', async () => {
    const rev = seedQueue();
    armAnalysis({
      result: analysisResult({
        issues: [],
        groups: [analysisResult().groups[0]]
      })
    });
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {
      target_ids: ['UI-a', 'UI-b']
    });
    const digest = analysisSnapshots(sock).at(-1).last_good.identity_digest;

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    expect(replyFor(sock, 'sub1').payload.applied).toBe(true);
  });

  test('refuses a submit whose digest does not match the last-good result', async () => {
    const rev = seedQueue();
    const sock = fakeSocket();
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: 'f'.repeat(64),
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    expect(replyFor(sock, 'sub1').payload.applied).toBe(false);
    expect(replyFor(sock, 'sub1').payload.reason).toBe('stale_digest');
    expect(
      getWorkerRuntime().queueStore.snapshot(WS).serial_lanes[0].entries
    ).toEqual([]);
  });

  test('refuses a submit of a group the validator did not mark eligible', async () => {
    const rev = seedQueue();
    armAnalysis({
      result: analysisResult({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'medium',
            categories: ['schema_or_migration'],
            reason: '약한 근거',
            evidence: [
              {
                path: 'docs/UI-a.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      })
    });
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const digest = analysisSnapshots(sock).at(-1).last_good.identity_digest;

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    expect(replyFor(sock, 'sub1').payload.reason).toBe('group_ineligible');
    expect(
      getWorkerRuntime().queueStore.snapshot(WS).serial_lanes[0].entries
    ).toEqual([]);
  });

  test('refuses a submit naming a bead outside the group members', async () => {
    const rev = seedQueue();
    const store = getWorkerRuntime().queueStore;
    store.place(WS, { expected_revision: rev, bead_id: 'UI-c' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const digest = analysisSnapshots(sock).at(-1).last_good.identity_digest;

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-c'],
      expected_revision: store.snapshot(WS).revision
    });

    expect(replyFor(sock, 'sub1').payload.reason).toBe('member_mismatch');
    expect(store.snapshot(WS).serial_lanes[0].entries).toEqual([]);
  });

  test('refuses a submit of fewer than two beads and an invalid lane', async () => {
    const rev = seedQueue();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});
    const digest = analysisSnapshots(sock).at(-1).last_good.identity_digest;

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a'],
      expected_revision: rev
    });
    await send(sock, 'sub2', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's9',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    expect(replyFor(sock, 'sub1').payload.applied).toBe(false);
    expect(replyFor(sock, 'sub2').payload.applied).toBe(false);
    expect(
      getWorkerRuntime().queueStore.snapshot(WS).serial_lanes[0].entries
    ).toEqual([]);
  });

  test('a refused submit never writes bd', async () => {
    const rev = seedQueue();
    /** @type {any[]} */
    const bd_calls = [];
    __registerWorkerAttachmentForTest(
      WS,
      /** @type {any} */ ({
        bd: {
          setMetadata: async (/** @type {any[]} */ ...args) =>
            bd_calls.push(args),
          unsetMetadata: async (/** @type {any[]} */ ...args) =>
            bd_calls.push(args)
        }
      })
    );
    const sock = fakeSocket();
    await send(sock, 'r1', 'worker-parallel-analysis-start', {});

    await send(sock, 'sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: 'f'.repeat(64),
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: rev
    });

    expect(bd_calls).toEqual([]);
  });

  test('cancel settles the active job and keeps the last-good cache', async () => {
    seedQueue();
    /** @type {(v: any) => void} */
    let resolveDone = () => {};
    const cancel = vi.fn();
    armAnalysis();
    __setAnalysisDepsForTest({
      listIssues: async () => ISSUES,
      analysisContext: () => ({
        repo: '/repo',
        resolveBase: async () => ({
          ok: true,
          base: 'main',
          base_oid: BASE_SHA
        }),
        gitRun: async (/** @type {string[]} */ args) => {
          const target = String(args[args.length - 1]);
          if (!/docs\/UI-[abc]\.md$/.test(target)) {
            return { code: 128, stdout: '' };
          }
          if (args[0] === 'rev-parse') {
            return { code: 0, stdout: `${'c'.repeat(40)}\n` };
          }
          if (args[1] === '-s') {
            return { code: 0, stdout: '32\n' };
          }
          return { code: 0, stdout: 'queue.json\n' };
        }
      }),
      runAnalysis: () => ({
        done: new Promise((res) => {
          resolveDone = res;
        }),
        cancel
      })
    });
    getWorkerRuntime().parallelAnalysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    const started = send(sock, 'r1', 'worker-parallel-analysis-start', {});
    await new Promise((res) => setTimeout(res, 5));
    const job = getWorkerRuntime().parallelAnalysis.activeJob(WS);

    await send(sock, 'c1', 'worker-parallel-analysis-cancel', {
      job_id: job?.job_id
    });
    resolveDone({ ok: false, reason: 'cancelled' });
    await started;

    expect(cancel).toHaveBeenCalled();
    expect(replyFor(sock, 'c1').payload.cancelled).toBe(true);
    expect(analysisSnapshots(sock).at(-1).last_good).toBeNull();
  });
});
