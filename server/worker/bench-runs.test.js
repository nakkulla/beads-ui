import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  benchAreaLabels,
  benchCellTerminal,
  benchCloneFields,
  benchHarnessDefaults,
  benchRunBeadIds,
  benchSourceEligibility,
  createBenchRun,
  listBenchManifests,
  readBenchManifest,
  resolveBenchTuple,
  validateBenchTuple
} from './bench-runs.js';
import { resolveCatalog } from './runner-catalog.js';
import { benchManifestPath } from './state-paths.js';

const CATALOG = resolveCatalog({ warn: () => {} });

/**
 * One COMPLETE execution tuple in the catalog's own vocabulary — what §4.2
 * pins onto every cell, and what `createBenchRun` now refuses to run without.
 *
 * @type {Record<string, string>}
 */
const TUPLE = {
  orchestration_model: 'opus',
  orchestration_effort: 'high',
  orchestration_speed: 'default',
  spec_review_model: 'fable',
  spec_review_effort: 'high',
  spec_review_speed: 'default',
  plan_review_model: 'fable',
  plan_review_effort: 'high',
  plan_review_speed: 'default',
  impl_review_model: 'fable',
  impl_review_effort: 'xhigh',
  impl_review_speed: 'default',
  impl_runtime: 'codex',
  impl_model: 'sol',
  impl_effort: 'high',
  impl_dispatch: 'delegated'
};

const WS = '/tmp/example-workspace/project-a';
const BASE = 'a'.repeat(40);

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-bench-runs-'));
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

/**
 * A coordinator that answers exactly what `resolveForDispatch` answers for a
 * `route=quick_fix` bead: the three orchestration values, already layered.
 *
 * @param {Record<string, string>} [queue]
 */
function fakeCoordinator(queue = {}) {
  return {
    /**
     * @param {string} workspace
     * @param {any} bead
     */
    resolveForDispatch(workspace, bead) {
      return {
        ok: true,
        exec: {
          orchestration_model:
            bead.model ?? queue.orchestration_model ?? 'opus',
          orchestration_effort: bead.effort ?? queue.orchestration_effort,
          orchestration_speed:
            bead.orchestration_speed ?? queue.orchestration_speed ?? 'default'
        }
      };
    }
  };
}

/** A harness layer with an answer for every non-orchestration tuple key. */
const HARNESS = {
  spec_review_model: 'codex',
  spec_review_effort: 'xhigh',
  spec_review_speed: 'default',
  plan_review_model: 'codex',
  plan_review_effort: 'xhigh',
  plan_review_speed: 'default',
  impl_review_model: 'codex',
  impl_review_effort: 'xhigh',
  impl_review_speed: 'default',
  impl_runtime: 'codex',
  impl_model: 'sol',
  impl_effort: 'auto',
  impl_dispatch: 'main'
};

describe('resolveBenchTuple', () => {
  test('prefers the quick_fix lane kv value over the general one', () => {
    const resolved = resolveBenchTuple({
      coordinator: fakeCoordinator(),
      workspace: WS,
      preset_settings: {},
      kv_values: {
        impl_model: 'opus',
        quick_fix_impl_model: 'fable'
      },
      harness: HARNESS
    });

    expect(resolved.ok).toBe(true);
    expect(resolved.ok && resolved.values.impl_model).toBe('fable');
  });

  test('falls through an empty quick_fix key to the general value', () => {
    const resolved = resolveBenchTuple({
      coordinator: fakeCoordinator(),
      workspace: WS,
      preset_settings: {},
      kv_values: {
        impl_model: 'opus',
        quick_fix_impl_model: ''
      },
      harness: HARNESS
    });

    expect(resolved.ok && resolved.values.impl_model).toBe('opus');
  });

  test('prefers the preset value over both workspace layers', () => {
    const resolved = resolveBenchTuple({
      coordinator: fakeCoordinator(),
      workspace: WS,
      preset_settings: { impl_model: 'sonnet' },
      kv_values: { impl_model: 'opus', quick_fix_impl_model: 'fable' },
      harness: HARNESS
    });

    expect(resolved.ok && resolved.values.impl_model).toBe('sonnet');
  });

  test('falls back to the harness value when no layer names the key', () => {
    const resolved = resolveBenchTuple({
      coordinator: fakeCoordinator(),
      workspace: WS,
      preset_settings: {},
      kv_values: {},
      harness: HARNESS
    });

    expect(resolved.ok && resolved.values.impl_runtime).toBe('codex');
    expect(resolved.ok && resolved.values.impl_review_effort).toBe('xhigh');
  });

  test('takes the three orchestration keys from resolveForDispatch', () => {
    const resolved = resolveBenchTuple({
      coordinator: fakeCoordinator({ orchestration_model: 'fable' }),
      workspace: WS,
      preset_settings: {},
      kv_values: {},
      harness: HARNESS
    });

    expect(resolved.ok && resolved.values.orchestration_model).toBe('fable');
    expect(resolved.ok && resolved.values.orchestration_speed).toBe('default');
  });

  test('refuses when the orchestration resolution is invalid', () => {
    const resolved = resolveBenchTuple({
      coordinator: {
        resolveForDispatch: () => ({
          ok: true,
          exec: { invalid_reason: 'invalid_orchestration_model' }
        })
      },
      workspace: WS,
      preset_settings: {},
      kv_values: {},
      harness: HARNESS
    });

    expect(resolved).toEqual({
      ok: false,
      reason: 'invalid_orchestration_model'
    });
  });
});

describe('benchHarnessDefaults', () => {
  test('projects the pinned execution-defaults artifact', () => {
    const harness = benchHarnessDefaults();

    expect(harness.impl_runtime).toBe('codex');
    expect(harness.impl_review_model).toBe('codex');
    expect(harness.impl_dispatch).toBe('main');
  });
});

const SOURCE = {
  id: 'UI-src',
  title: '원본 제목',
  description: '본문\n두 번째 줄\n',
  issue_type: 'bug',
  priority: 1,
  labels: ['frontend'],
  quick_fix_review: 'self@0123456789ab',
  route: 'quick_fix'
};

describe('benchCloneFields', () => {
  test('copies the body byte for byte with its self-review receipt', () => {
    const fields = benchCloneFields({
      source: SOURCE,
      preset: { id: 'p1', name: '클로드 라인' },
      k: 2,
      run_id: 'bench-1',
      base_sha: BASE,
      tuple: { ...TUPLE }
    });

    expect(fields.description).toBe(SOURCE.description);
    expect(fields.metadata.quick_fix_review).toBe('self@0123456789ab');
  });

  test('names the cell by preset and repetition', () => {
    const fields = benchCloneFields({
      source: SOURCE,
      preset: { id: 'p1', name: '클로드 라인' },
      k: 2,
      run_id: 'bench-1',
      base_sha: BASE,
      tuple: {}
    });

    expect(fields.title).toBe('[bench] 원본 제목 · 클로드 라인 #2');
    expect(fields.metadata.bench_cell).toBe('p1:2');
  });

  test('carries the bench pins and forces delegation', () => {
    const fields = benchCloneFields({
      source: SOURCE,
      preset: { id: 'p1', name: 'x' },
      k: 1,
      run_id: 'bench-1',
      base_sha: BASE,
      tuple: { impl_dispatch: 'main', impl_model: 'sol' }
    });

    expect(fields.metadata.impl_dispatch).toBe('delegated');
    expect(fields.metadata.bench_base).toBe(BASE);
    expect(fields.metadata.bench_source).toBe('UI-src');
    expect(fields.metadata.bench_run).toBe('bench-1');
    expect(fields.metadata.landing).toBe('none');
    expect(fields.metadata.route).toBe('quick_fix');
  });

  test('overwrites the reviewer triple when one is fixed', () => {
    const fields = benchCloneFields({
      source: SOURCE,
      preset: { id: 'p1', name: 'x' },
      k: 1,
      run_id: 'bench-1',
      base_sha: BASE,
      tuple: { impl_review_model: 'codex', impl_review_effort: 'low' },
      reviewer: {
        impl_review_model: 'fable',
        impl_review_effort: 'xhigh',
        impl_review_speed: 'default'
      }
    });

    expect(fields.metadata.impl_review_model).toBe('fable');
    expect(fields.metadata.impl_review_effort).toBe('xhigh');
  });

  test('adds the bench label beside the copied area labels', () => {
    const fields = benchCloneFields({
      source: SOURCE,
      preset: { id: 'p1', name: 'x' },
      k: 1,
      run_id: 'bench-1',
      base_sha: BASE,
      tuple: {}
    });

    expect(fields.labels).toEqual(['frontend', 'bench']);
  });
});

describe('benchSourceEligibility', () => {
  test('refuses a source outside quick_fix', () => {
    expect(benchSourceEligibility({ ...SOURCE, route: 'spec_backed' })).toEqual(
      { ok: false, reason: 'source_not_quick_fix' }
    );
  });

  test('refuses a source with no self-review receipt', () => {
    expect(benchSourceEligibility({ ...SOURCE, quick_fix_review: '' })).toEqual(
      { ok: false, reason: 'source_quick_fix_review_missing' }
    );
  });
});

/**
 * @param {{ fail_at?: number, close_fails?: boolean, readback_status?: string|null }} [options]
 */
function fakeBd(options = {}) {
  const calls = {
    /** @type {string[]} */ created: [],
    /** @type {string[]} */ placed: [],
    /** @type {Array<{ bead_id: string, reason: string }>} */ closed: [],
    /** @type {Array<{ bead_id: string, values: Record<string, string> }>} */
    metadata: []
  };
  let n = 0;
  return {
    calls,
    async create() {
      n += 1;
      if (options.fail_at === n) {
        return { ok: false, reason: 'clone_create_failed' };
      }
      const id = `UI-clone${n}`;
      calls.created.push(id);
      return { ok: true, id };
    },
    async addLabels() {
      return { ok: true };
    },
    /**
     * @param {string} bead_id
     * @param {Record<string, string>} values
     */
    async setMetadata(bead_id, values) {
      calls.metadata.push({ bead_id, values });
      return { ok: true };
    },
    /**
     * @param {string} bead_id
     * @param {string} reason
     */
    async closeWithReason(bead_id, reason) {
      calls.closed.push({ bead_id, reason });
      return options.close_fails === true
        ? { ok: false, reason: 'clone_close_failed' }
        : { ok: true };
    },
    async readStatus() {
      return options.readback_status === undefined
        ? 'closed'
        : options.readback_status;
    }
  };
}

/**
 * @param {any} bd
 * @param {Record<string, any>} [overrides]
 */
function runInput(bd, overrides = {}) {
  return {
    workspace_root: WS,
    run_id: 'bench-run-1',
    base_sha: BASE,
    source: SOURCE,
    presets: [{ id: 'p1', name: '클로드 라인', tuple: { ...TUPLE } }],
    repeats: 2,
    reviewer_mode: /** @type {const} */ ('preset'),
    reviewer: null,
    bd,
    catalog: CATALOG,
    /**
     * @param {string} bead_id
     */
    place: async (bead_id) => {
      bd.calls.placed.push(bead_id);
      return { ok: true };
    },
    now: () => 1700000000000,
    ...overrides
  };
}

describe('createBenchRun', () => {
  test('creates one clone per preset and repetition', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(runInput(bd));

    expect(result.ok).toBe(true);
    expect(bd.calls.created).toEqual(['UI-clone1', 'UI-clone2']);
  });

  test('writes the manifest with the immutable inputs only', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(runInput(bd));

    const manifest = readBenchManifest(WS, 'bench-run-1');
    expect(manifest).toEqual({
      run_id: 'bench-run-1',
      source_bead_id: 'UI-src',
      base_sha: BASE,
      presets: [{ id: 'p1', name: '클로드 라인', resolved_tuple: TUPLE }],
      repeats: 2,
      reviewer_mode: 'preset',
      reviewer: null,
      delegate_forced: true,
      cells: [
        { preset_id: 'p1', k: 1, bead_id: 'UI-clone1' },
        { preset_id: 'p1', k: 2, bead_id: 'UI-clone2' }
      ],
      created_at: 1700000000000
    });
    expect(result.ok).toBe(true);
  });

  test('leaves the manifest untouched after creation', async () => {
    const bd = fakeBd();
    await createBenchRun(runInput(bd));
    const file = benchManifestPath(WS, 'bench-run-1');
    const written_at = fs.statSync(file).mtimeMs;

    const listed = listBenchManifests(WS);

    expect(listed).toHaveLength(1);
    expect(fs.statSync(file).mtimeMs).toBe(written_at);
  });

  test('aborts the experiment when one clone cannot be created', async () => {
    const bd = fakeBd({ fail_at: 2 });

    const result = await createBenchRun(runInput(bd));

    expect(result).toEqual({
      ok: false,
      reason: 'clone_create_failed',
      aborted: ['UI-clone1'],
      residue: []
    });
    expect(bd.calls.closed).toEqual([
      { bead_id: 'UI-clone1', reason: 'bench:bench-run-1:aborted' }
    ]);
    expect(readBenchManifest(WS, 'bench-run-1')).toBeNull();
  });

  test('refuses to start without a readable base tip', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(runInput(bd, { base_sha: 'HEAD' }));

    expect(result).toEqual({
      ok: false,
      reason: 'base_tip_unreadable',
      aborted: [],
      residue: []
    });
    expect(bd.calls.created).toEqual([]);
  });

  test('refuses a source that is not a quick_fix bead', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(
      runInput(bd, { source: { ...SOURCE, route: 'full_plan' } })
    );

    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reason).toBe('source_not_quick_fix');
  });

  test('stamps every cell with the resolved tuple and the bench pins', async () => {
    const bd = fakeBd();

    await createBenchRun(runInput(bd));

    expect(bd.calls.metadata[0].values).toMatchObject({
      route: 'quick_fix',
      impl_model: 'sol',
      impl_runtime: 'codex',
      impl_dispatch: 'delegated',
      bench_run: 'bench-run-1',
      bench_base: BASE,
      landing: 'none'
    });
  });
});

describe('createBenchRun queue placement', () => {
  test('places every created clone into the queue before the manifest', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(runInput(bd));

    expect(result.ok).toBe(true);
    expect(bd.calls.placed).toEqual(['UI-clone1', 'UI-clone2']);
  });

  test('aborts the experiment when one clone cannot be queued', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(
      runInput(bd, {
        /**
         * @param {string} bead_id
         */
        place: async (bead_id) =>
          bead_id === 'UI-clone2'
            ? { ok: false, reason: 'clone_place_refused:worker_ineligible' }
            : { ok: true }
      })
    );

    expect(result).toEqual({
      ok: false,
      reason: 'clone_place_refused:worker_ineligible',
      aborted: ['UI-clone1', 'UI-clone2'],
      residue: []
    });
    expect(readBenchManifest(WS, 'bench-run-1')).toBeNull();
  });

  test('refuses to create anything without a placement path', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(runInput(bd, { place: undefined }));

    expect(result.ok === false && result.reason).toBe(
      'clone_place_unavailable'
    );
    expect(readBenchManifest(WS, 'bench-run-1')).toBeNull();
  });
});

describe('createBenchRun abort readback', () => {
  test('reports a clone whose close failed as uncleaned residue', async () => {
    const bd = fakeBd({ fail_at: 2, close_fails: true });

    const result = await createBenchRun(runInput(bd));

    expect(result).toEqual({
      ok: false,
      reason: 'clone_create_failed',
      aborted: [],
      residue: ['UI-clone1']
    });
  });

  test('reports a clone the readback does not show closed as residue', async () => {
    const bd = fakeBd({ fail_at: 2, readback_status: 'open' });

    const result = await createBenchRun(runInput(bd));

    expect(result.ok === false && result.residue).toEqual(['UI-clone1']);
    expect(result.ok === false && result.aborted).toEqual([]);
  });
});

describe('createBenchRun tuple validation', () => {
  test('refuses an incomplete tuple before any clone is created', async () => {
    const bd = fakeBd();
    const partial = { ...TUPLE };
    delete partial.impl_effort;

    const result = await createBenchRun(
      runInput(bd, { presets: [{ id: 'p1', name: 'x', tuple: partial }] })
    );

    expect(result.ok === false && result.reason).toBe(
      'bench_tuple_incomplete:impl_effort'
    );
    expect(bd.calls.created).toEqual([]);
  });

  test('refuses a fixed reviewer outside the contract enum', async () => {
    const bd = fakeBd();

    const result = await createBenchRun(
      runInput(bd, {
        reviewer_mode: 'fixed',
        reviewer: {
          impl_review_model: 'gpt',
          impl_review_effort: 'xhigh',
          impl_review_speed: 'default'
        }
      })
    );

    expect(result.ok === false && result.reason).toBe(
      'bench_tuple_invalid:invalid_impl_review_model'
    );
    expect(bd.calls.created).toEqual([]);
  });
});

describe('validateBenchTuple', () => {
  test('accepts a complete tuple in the catalog vocabulary', () => {
    expect(validateBenchTuple(TUPLE, { catalog: CATALOG })).toEqual({
      ok: true
    });
  });

  test('rejects a missing impl_dispatch', () => {
    const partial = { ...TUPLE };
    delete partial.impl_dispatch;

    expect(validateBenchTuple(partial, { catalog: CATALOG })).toEqual({
      ok: false,
      reason: 'bench_tuple_incomplete:impl_dispatch'
    });
  });

  test('rejects an impl_dispatch outside the contract enum', () => {
    expect(
      validateBenchTuple(
        { ...TUPLE, impl_dispatch: 'auto' },
        { catalog: CATALOG }
      )
    ).toEqual({ ok: false, reason: 'bench_tuple_invalid:impl_dispatch' });
  });

  test('rejects a reviewer effort outside the contract enum', () => {
    expect(
      validateBenchTuple(
        { ...TUPLE, impl_review_effort: 'ultra' },
        { catalog: CATALOG }
      )
    ).toEqual({
      ok: false,
      reason: 'bench_tuple_invalid:invalid_impl_review_effort'
    });
  });
});

describe('benchAreaLabels', () => {
  test('keeps the area pointers', () => {
    expect(benchAreaLabels(['frontend', 'backend'])).toEqual([
      'frontend',
      'backend'
    ]);
  });

  test('drops the contract labels that would change how the clone runs', () => {
    expect(
      benchAreaLabels([
        'frontend',
        'worker-ineligible',
        'session-preferred',
        'spec-after-blocker',
        'bench'
      ])
    ).toEqual(['frontend']);
  });

  test('drops the retired review mirror labels and their prefixes', () => {
    expect(
      benchAreaLabels([
        'has:spec',
        'pr',
        'reviewed:impl',
        'skipped:spec',
        'frontend'
      ])
    ).toEqual(['frontend']);
  });
});

describe('benchCellTerminal', () => {
  test('reports a closed cell with only ended attempts as terminal', () => {
    expect(
      benchCellTerminal({
        attempts: [{ status: 'done' }],
        bead_closed: true
      })
    ).toBe(true);
  });

  test('refuses a cell whose bead is still open', () => {
    expect(
      benchCellTerminal({ attempts: [{ status: 'done' }], bead_closed: false })
    ).toBe(false);
  });

  test('refuses a parked cell even when its bead reads closed', () => {
    expect(
      benchCellTerminal({
        attempts: [{ status: 'failed' }, { status: 'parked' }],
        bead_closed: true
      })
    ).toBe(false);
  });

  test('refuses a waiting cell even when its bead reads closed', () => {
    expect(
      benchCellTerminal({
        attempts: [{ status: 'waiting' }],
        bead_closed: true
      })
    ).toBe(false);
  });

  test('refuses a cell whose attempt status cannot be read', () => {
    expect(
      benchCellTerminal({ attempts: [{ status: null }], bead_closed: true })
    ).toBe(false);
  });
});

describe('benchRunBeadIds', () => {
  test('returns the clone ids of one manifest', () => {
    expect(
      benchRunBeadIds({
        cells: [{ bead_id: 'UI-a' }, { bead_id: '' }, { bead_id: 'UI-b' }]
      })
    ).toEqual(['UI-a', 'UI-b']);
  });

  test('returns an empty list for an absent manifest', () => {
    expect(benchRunBeadIds(null)).toEqual([]);
  });
});
