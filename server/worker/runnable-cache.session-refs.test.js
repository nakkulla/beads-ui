import { describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example/repo-session-refs';

const state = vi.hoisted(() => ({ projection_throws: false }));

vi.mock('./session-ref.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    /**
     * @param {any} metadata
     * @param {any} [options]
     */
    sessionRefViews: (metadata, options) => {
      if (state.projection_throws) {
        throw new Error('filesystem exploded');
      }
      return actual.sessionRefViews(metadata, options);
    }
  };
});

// The git warm is isolated here: this file asserts the session_ref PROJECTION,
// and the real warm would spawn `git` for a workspace that does not exist.
vi.mock('../workflow-enrich.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    warmWorkflowProbes: vi.fn(async () => ({
      head: null,
      branch_tips: new Map(),
      dirty_paths: new Set(),
      checked_paths: new Set(),
      undetermined: new Set()
    }))
  };
});

const { createRunnableCache } = await import('./runnable-cache.js');

/** Monotonic snapshot generation so no two fills share a probe context. */
let generation_seq = 0;

/**
 * The ok snapshot envelope a fill consumes. `generation` is REQUIRED: the fill
 * keys its probe context by it, so a fixture omitting it is not the real shape
 * (UI-hhn9 §4.2).
 *
 * @typedef {{
 *   ok: true,
 *   stale: boolean,
 *   snapshot: {
 *     generation: number,
 *     all: Array<Record<string, any>>,
 *     ready_explain?: Record<string, any>
 *   }
 * }} SnapshotOkReply
 */

/**
 * A `requestSnapshot` stub answering the shared `--all` generation for one
 * workspace, in the real snapshot shape (UI-hhn9 §4.2).
 *
 * @param {Array<Record<string, any>>} rows
 */
function fakeSnapshot(rows) {
  return vi.fn(async () => {
    generation_seq += 1;
    return /** @type {SnapshotOkReply} */ ({
      ok: true,
      stale: false,
      snapshot: { generation: generation_seq, all: rows, ready_explain: {} }
    });
  });
}

/**
 * A session-held row carrying the given metadata bag.
 *
 * @param {Record<string, any>} metadata
 */
function sessionRow(metadata) {
  return {
    id: 'UI-2',
    title: '세션 진행 이슈',
    status: 'in_progress',
    metadata
  };
}

/**
 * Trigger the async fill and return the settled session bucket.
 *
 * @param {Array<Record<string, any>>} rows
 */
async function sessionBucket(rows) {
  const cache = createRunnableCache({ requestSnapshot: fakeSnapshot(rows) });
  /** @type {(value: void) => void} */
  let done = () => {};
  const filled = new Promise((resolve) => {
    done = resolve;
  });
  cache.setOnFilled(() => done());

  cache.sessionActiveFor(WS);
  await filled;

  return cache.sessionActiveFor(WS);
}

describe('session_active[].session_refs (UI-4xzk §4.1)', () => {
  test('projects the row metadata key without an extra bd call', async () => {
    const rows = [
      sessionRow({
        session_ref: 'claude:sid-old@far-away-box; codex:sid-new@far-away-box'
      })
    ];

    const out = await sessionBucket(rows);

    expect(
      out[0].session_refs.map((view) => [
        view.index,
        view.provider,
        view.session_id,
        view.current,
        view.locality
      ])
    ).toEqual([
      [0, 'claude', 'sid-old', false, 'remote'],
      [1, 'codex', 'sid-new', true, 'remote']
    ]);
  });

  test('returns an empty list when the metadata key is absent', async () => {
    const out = await sessionBucket([sessionRow({ route: 'quick_fix' })]);

    expect(out[0].session_refs).toEqual([]);
  });

  test('returns an empty list when the projection throws', async () => {
    state.projection_throws = true;

    const out = await sessionBucket([
      sessionRow({ session_ref: 'claude:sid@far-away-box' })
    ]);
    state.projection_throws = false;

    expect(out[0].session_refs).toEqual([]);
    expect(out[0].bead_id).toBe('UI-2');
  });
});
