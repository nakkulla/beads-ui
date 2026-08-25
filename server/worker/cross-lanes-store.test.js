import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createCrossLanesStore } from './cross-lanes-store.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file_path;

/** 2026-08-25 09:00 UTC. */
const NOW = Date.parse('2026-08-25T09:00:00.000Z');

/**
 * @param {{ now?: () => number }} [options]
 */
function store(options = {}) {
  return createCrossLanesStore({
    filePath: file_path,
    now: options.now || (() => NOW)
  });
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function lane(patch = {}) {
  return {
    id: 'cl_ONE',
    status: 'draft',
    created_at: '2026-08-25T00:00:00.000Z',
    entries: [],
    ...patch
  };
}

/**
 * @param {Record<string, any>} state
 */
function writeFile(state) {
  fs.writeFileSync(file_path, JSON.stringify(state, null, 2));
}

/**
 * A mutator that appends one lane through the server-issued context.
 *
 * @param {Record<string, any>} next
 * @param {{ newLaneId: () => string, nowIso: () => string }} ctx
 */
function appendLane(next, ctx) {
  next.lanes.push({
    id: ctx.newLaneId(),
    status: 'draft',
    created_at: ctx.nowIso(),
    entries: []
  });
  return { ok: /** @type {const} */ (true) };
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-cross-lanes-'));
  file_path = path.join(tmp_dir, 'cross-lanes.json');
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('cross-lanes-store load', () => {
  test('reads an empty state when the file is absent', () => {
    const s = store();

    const state = s.read();

    expect(state).toEqual({ revision: 0, lanes: [] });
  });

  test('reads lanes back from a well-formed file', () => {
    writeFile({
      revision: 7,
      lanes: [lane({ entries: [{ bead_id: 'UI-1', root_dir: '/abs/a' }] })]
    });

    const state = store().read();

    expect(state).toEqual({
      revision: 7,
      lanes: [
        {
          id: 'cl_ONE',
          status: 'draft',
          created_at: '2026-08-25T00:00:00.000Z',
          entries: [{ bead_id: 'UI-1', root_dir: '/abs/a' }]
        }
      ]
    });
  });

  test('drops entries missing a bead_id or a root_dir', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({
          entries: [
            { bead_id: 'UI-1', root_dir: '/abs/a' },
            { bead_id: '', root_dir: '/abs/a' },
            { bead_id: 'UI-2' },
            { bead_id: 'UI-3', root_dir: '/abs/b' }
          ]
        })
      ]
    });

    const state = store().read();

    expect(state?.lanes[0].entries).toEqual([
      { bead_id: 'UI-1', root_dir: '/abs/a' },
      { bead_id: 'UI-3', root_dir: '/abs/b' }
    ]);
  });

  test('keeps only the first lane a duplicated bead_id appears in', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({
          id: 'cl_A',
          entries: [{ bead_id: 'UI-1', root_dir: '/abs/a' }]
        }),
        lane({
          id: 'cl_B',
          entries: [
            { bead_id: 'UI-1', root_dir: '/abs/a' },
            { bead_id: 'UI-2', root_dir: '/abs/b' }
          ]
        })
      ]
    });

    const state = store().read();

    expect(state?.lanes.map((l) => l.entries)).toEqual([
      [{ bead_id: 'UI-1', root_dir: '/abs/a' }],
      [{ bead_id: 'UI-2', root_dir: '/abs/b' }]
    ]);
  });

  test('caches the load so a later file rewrite is not observed', () => {
    writeFile({ revision: 1, lanes: [] });
    const s = store();
    s.read();

    writeFile({ revision: 99, lanes: [lane()] });

    expect(s.read()).toEqual({ revision: 1, lanes: [] });
  });
});

describe('cross-lanes-store unreadable file', () => {
  test('returns null from read when the file does not parse', () => {
    fs.writeFileSync(file_path, '{ this is not json');

    const state = store().read();

    expect(state).toBeNull();
  });

  test('returns null from read when a lane has an unknown status', () => {
    writeFile({ revision: 1, lanes: [lane({ status: 'archived' })] });

    const state = store().read();

    expect(state).toBeNull();
  });

  test('returns null from read when two lanes share an id', () => {
    writeFile({
      revision: 1,
      lanes: [lane({ id: 'cl_A' }), lane({ id: 'cl_A' })]
    });

    const state = store().read();

    expect(state).toBeNull();
  });

  test('rejects a mutation with state_unreadable', () => {
    fs.writeFileSync(file_path, 'not json at all');

    const result = store().mutate(0, appendLane);

    expect(result).toEqual({
      ok: false,
      code: 'state_unreadable',
      message: '연결 레인 저장소를 읽을 수 없습니다',
      state: null
    });
  });

  test('leaves the corrupt file byte-identical after a rejected mutation', () => {
    const raw = '{ "revision": broken }';
    fs.writeFileSync(file_path, raw);
    const s = store();

    s.mutate(0, appendLane);

    expect(fs.readFileSync(file_path, 'utf8')).toEqual(raw);
  });
});

describe('cross-lanes-store mutate', () => {
  test('persists the mutated state atomically and bumps the revision', () => {
    const s = store();

    const result = s.mutate(0, appendLane);

    expect(result.ok).toBe(true);
    expect(JSON.parse(fs.readFileSync(file_path, 'utf8'))).toEqual({
      revision: 1,
      lanes: [
        {
          id: expect.stringMatching(/^cl_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: 'draft',
          created_at: '2026-08-25T09:00:00.000Z',
          entries: []
        }
      ]
    });
  });

  test('leaves no temp file behind after a successful write', () => {
    const s = store();

    s.mutate(0, appendLane);

    expect(fs.existsSync(`${file_path}.tmp`)).toBe(false);
  });

  test('issues a distinct lane id per mutation', () => {
    const s = store();

    s.mutate(0, appendLane);
    s.mutate(1, appendLane);

    const state = s.read();
    expect(state?.lanes[0].id).not.toEqual(state?.lanes[1].id);
  });

  test('rejects a stale expected_revision with the current state', () => {
    const s = store();
    s.mutate(0, appendLane);

    const result = s.mutate(0, appendLane);

    expect(result).toMatchObject({
      ok: false,
      code: 'conflict',
      state: { revision: 1 }
    });
  });

  test('does not write when the CAS rejects', () => {
    const s = store();
    s.mutate(0, appendLane);
    const written = fs.readFileSync(file_path, 'utf8');

    s.mutate(0, appendLane);

    expect(fs.readFileSync(file_path, 'utf8')).toEqual(written);
  });

  test('returns the mutator value on success', () => {
    const s = store();

    const result = s.mutate(0, (next, ctx) => {
      next.lanes.push({
        id: ctx.newLaneId(),
        status: 'draft',
        created_at: ctx.nowIso(),
        entries: []
      });
      return { ok: true, value: next.lanes[0].id };
    });

    expect(result).toMatchObject({ ok: true, value: expect.any(String) });
  });

  test('passes the mutator rejection through untouched', () => {
    const s = store();

    const result = s.mutate(0, () => ({
      ok: false,
      code: 'not_found',
      message: '레인이 없습니다'
    }));

    expect(result).toEqual({
      ok: false,
      code: 'not_found',
      message: '레인이 없습니다',
      state: { revision: 0, lanes: [] }
    });
  });

  test('rejects a write that puts one bead in two lanes', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({
          id: 'cl_A',
          entries: [{ bead_id: 'UI-1', root_dir: '/abs/a' }]
        }),
        lane({ id: 'cl_B', entries: [] })
      ]
    });
    const s = store();

    const result = s.mutate(1, (next) => {
      next.lanes[1].entries = [{ bead_id: 'UI-1', root_dir: '/abs/a' }];
      return { ok: true };
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'conflict_membership',
      message: '이미 연결 1에 있습니다'
    });
  });

  test('names the owning lane by its current 1-based position', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({ id: 'cl_A', entries: [] }),
        lane({ id: 'cl_B', entries: [] }),
        lane({ id: 'cl_C', entries: [{ bead_id: 'UI-9', root_dir: '/abs/a' }] })
      ]
    });
    const s = store();

    const result = s.mutate(1, (next) => {
      next.lanes[0].entries = [{ bead_id: 'UI-9', root_dir: '/abs/a' }];
      return { ok: true };
    });

    expect(result).toMatchObject({ message: '이미 연결 3에 있습니다' });
  });

  test('allows re-adding a bead the same lane already owns', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({
          id: 'cl_A',
          entries: [
            { bead_id: 'UI-1', root_dir: '/abs/a' },
            { bead_id: 'UI-2', root_dir: '/abs/a' }
          ]
        })
      ]
    });
    const s = store();

    const result = s.mutate(1, (next) => {
      next.lanes[0].entries.reverse();
      return { ok: true };
    });

    expect(result.ok).toBe(true);
  });

  test('accepts a bead that moved out of its old lane in an earlier write', () => {
    writeFile({
      revision: 1,
      lanes: [
        lane({
          id: 'cl_A',
          entries: [{ bead_id: 'UI-1', root_dir: '/abs/a' }]
        }),
        lane({ id: 'cl_B', entries: [] })
      ]
    });
    const s = store();
    s.mutate(1, (next) => {
      next.lanes[0].entries = [];
      return { ok: true };
    });

    const result = s.mutate(2, (next) => {
      next.lanes[1].entries = [{ bead_id: 'UI-1', root_dir: '/abs/a' }];
      return { ok: true };
    });

    expect(result.ok).toBe(true);
  });
});
