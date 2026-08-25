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

const { createRunnableCache } = await import('./runnable-cache.js');

/**
 * A `requestSnapshot` stub answering the shared `--all` generation for one
 * workspace.
 *
 * @param {Array<Record<string, any>>} rows
 */
function fakeSnapshot(rows) {
  return vi.fn(async () => ({
    ok: true,
    stale: false,
    snapshot: { all: rows }
  }));
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
  cache.sessionActiveFor(WS);
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
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
