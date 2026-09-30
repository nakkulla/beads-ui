import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  benchCellTerminal,
  benchRunBeadIds,
  readBenchManifest,
  writeBenchManifest
} from './bench-runs.js';
import { benchManifestPath } from './state-paths.js';

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

describe('bench run manifests', () => {
  test('reads a manifest written before the profile split unchanged', () => {
    const legacy = {
      run_id: 'bench-old',
      source_bead_id: 'UI-src',
      base_sha: BASE,
      presets: [{ id: 'p1', name: '옛 프리셋', resolved_tuple: {} }],
      repeats: 1,
      reviewer_mode: 'preset',
      reviewer: null,
      delegate_forced: true,
      cells: [{ preset_id: 'p1', k: 1, bead_id: 'UI-old1' }],
      created_at: 1690000000000
    };
    const file = benchManifestPath(WS, 'bench-old');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(legacy), 'utf8');

    const manifest = readBenchManifest(WS, 'bench-old');

    expect(manifest).toEqual(legacy);
  });

  test('reads back the manifest it wrote', () => {
    const manifest = {
      run_id: 'bench-run-1',
      cells: [{ preset_id: 'p1', k: 1, bead_id: 'UI-clone1' }]
    };

    writeBenchManifest(WS, manifest);

    expect(readBenchManifest(WS, 'bench-run-1')).toEqual(manifest);
  });

  test('refuses a run id outside the contract vocabulary', () => {
    const result = writeBenchManifest(WS, { run_id: 'bad/id', cells: [] });

    expect(result).toEqual({ ok: false, reason: 'invalid_run_id' });
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
