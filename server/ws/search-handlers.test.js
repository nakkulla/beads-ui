import { beforeEach, describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  runBd: vi.fn(),
  runBdJson: vi.fn(),
  runProjected: vi.fn()
}));

vi.mock('../bd.js', async (importOriginal) => ({
  .../** @type {object} */ (await importOriginal()),
  runBd: state.runBd,
  runBdJson: state.runBdJson,
  runBdJsonProjected: state.runProjected
}));

const { setConnWorkspace } = await import('./context.js');
const { SEARCH_RESULT_LIMIT, handleSearchIssues } =
  await import('./search-handlers.js');

const CONN_ROOT = '/tmp/example/repo-conn';
const OTHER_ROOT = '/tmp/example/repo-other';
const COLD_ROOT = '/tmp/example/repo-cold';

/**
 * @param {Array<Record<string, any>>} issues
 * @returns {any}
 */
function snapshotOf(issues) {
  return { all: issues };
}

/**
 * @param {string} id
 * @param {string} title
 * @param {number} updated_at
 * @param {string} [status]
 * @returns {Record<string, any>}
 */
function issue(id, title, updated_at, status = 'open') {
  return { id, title, status, updated_at, closed_at: null };
}

/**
 * @param {Record<string, any>|undefined} workspace
 * @returns {{ sent: any[], send: (raw: string) => void }}
 */
function socketIn(workspace) {
  const ws = /** @type {any} */ ({ sent: [] });
  ws.send = (/** @type {string} */ raw) => ws.sent.push(JSON.parse(raw));
  if (workspace) {
    setConnWorkspace(ws, /** @type {any} */ (workspace));
  }
  return ws;
}

/**
 * @param {ReturnType<typeof socketIn>} ws
 * @param {unknown} payload
 * @param {Record<string, any>} snapshots - root_dir to snapshot (absent = none yet).
 * @param {string[]} [visible]
 * @returns {{ reply: any, peek: ReturnType<typeof vi.fn> }}
 */
function search(ws, payload, snapshots, visible = []) {
  const peek = vi.fn((/** @type {string} */ root) => snapshots[root] ?? null);
  handleSearchIssues(
    /** @type {any} */ (ws),
    /** @type {any} */ ({ id: 'r1', type: 'search-issues', payload }),
    { peek: /** @type {any} */ (peek), visibleRoots: () => visible }
  );
  return { reply: ws.sent[0], peek };
}

beforeEach(() => {
  state.runBd.mockReset();
  state.runBdJson.mockReset();
  state.runProjected.mockReset();
});

describe('ws/search-handlers', () => {
  test('searches only the connection workspace for the workspace scope', () => {
    const ws = socketIn({ root_dir: CONN_ROOT, db_path: '' });

    const { reply, peek } = search(
      ws,
      { query: 'alpha', scope: 'workspace' },
      {
        [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha here', 1)]),
        [OTHER_ROOT]: snapshotOf([issue('O-1', 'alpha there', 2)])
      },
      [CONN_ROOT, OTHER_ROOT]
    );

    expect([
      peek.mock.calls,
      reply.payload.results.map((/** @type {any} */ r) => r.id)
    ]).toEqual([[[CONN_ROOT]], ['C-1']]);
  });

  test('searches every visible workspace for the visible scope', () => {
    const ws = socketIn({ root_dir: CONN_ROOT, db_path: '' });

    const { reply } = search(
      ws,
      { query: 'alpha', scope: 'visible' },
      {
        [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha here', 1)]),
        [OTHER_ROOT]: snapshotOf([issue('O-1', 'alpha there', 2)])
      },
      [CONN_ROOT, OTHER_ROOT]
    );

    expect(reply.payload.results.map((/** @type {any} */ r) => r.id)).toEqual([
      'O-1',
      'C-1'
    ]);
  });

  test('carries id, status, title, root_dir and the repo name on each row', () => {
    const ws = socketIn({ root_dir: CONN_ROOT, db_path: '' });

    const { reply } = search(
      ws,
      { query: 'c-1', scope: 'workspace' },
      { [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha', 1, 'closed')]) }
    );

    expect(reply.payload.results[0]).toEqual({
      id: 'C-1',
      status: 'closed',
      title: 'alpha',
      root_dir: CONN_ROOT,
      workspace_name: 'repo-conn'
    });
  });

  test('skips a workspace without a snapshot and marks the reply partial', () => {
    const ws = socketIn(undefined);

    const { reply } = search(
      ws,
      { query: 'alpha', scope: 'visible' },
      { [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha', 1)]) },
      [CONN_ROOT, COLD_ROOT]
    );

    expect([reply.payload.results.length, reply.payload.partial]).toEqual([
      1,
      true
    ]);
  });

  test('replies not partial when every workspace has a snapshot', () => {
    const ws = socketIn(undefined);

    const { reply } = search(
      ws,
      { query: 'alpha', scope: 'visible' },
      { [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha', 1)]) },
      [CONN_ROOT]
    );

    expect(reply.payload.partial).toBe(false);
  });

  test('matches case-insensitively on the id and the title whatever the status', () => {
    const ws = socketIn(undefined);

    const { reply } = search(
      ws,
      { query: 'MiXed', scope: 'visible' },
      {
        [CONN_ROOT]: snapshotOf([
          issue('A-1', 'a mixed title', 1, 'closed'),
          issue('MIXED-2', 'other', 2),
          issue('A-3', 'unrelated', 3)
        ])
      },
      [CONN_ROOT]
    );

    expect(reply.payload.results.map((/** @type {any} */ r) => r.id)).toEqual([
      'MIXED-2',
      'A-1'
    ]);
  });

  test('orders the exact id, then id prefixes, then the rest, each newest first', () => {
    const ws = socketIn(undefined);

    const { reply } = search(
      ws,
      { query: 'ab-1', scope: 'visible' },
      {
        [CONN_ROOT]: snapshotOf([
          issue('X-9', 'mentions ab-1 old', 1),
          issue('AB-10', 'prefix old', 2),
          issue('AB-1', 'exact', 3),
          issue('X-8', 'mentions ab-1 new', 9),
          issue('AB-11', 'prefix new', 8)
        ])
      },
      [CONN_ROOT]
    );

    expect(reply.payload.results.map((/** @type {any} */ r) => r.id)).toEqual([
      'AB-1',
      'AB-11',
      'AB-10',
      'X-8',
      'X-9'
    ]);
  });

  test('answers at most 20 rows', () => {
    const ws = socketIn(undefined);
    const issues = Array.from({ length: 30 }, (_unused, index) =>
      issue(`N-${index}`, 'needle', index)
    );

    const { reply } = search(
      ws,
      { query: 'needle', scope: 'visible' },
      { [CONN_ROOT]: snapshotOf(issues) },
      [CONN_ROOT]
    );

    expect(reply.payload.results.length).toBe(SEARCH_RESULT_LIMIT);
  });

  test('answers empty results for a blank query without reading a snapshot', () => {
    const ws = socketIn(undefined);

    const { reply, peek } = search(
      ws,
      { query: '   ', scope: 'visible' },
      { [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha', 1)]) },
      [CONN_ROOT]
    );

    expect([reply.payload, peek.mock.calls.length]).toEqual([
      { results: [], partial: false },
      0
    ]);
  });

  test('rejects an unknown scope with bad_request', () => {
    const ws = socketIn(undefined);

    const { reply } = search(ws, { query: 'a', scope: 'everything' }, {});

    expect(reply.error.code).toBe('bad_request');
  });

  test('starts no bd process while searching', () => {
    const ws = socketIn({ root_dir: CONN_ROOT, db_path: '' });

    search(
      ws,
      { query: 'alpha', scope: 'visible' },
      { [CONN_ROOT]: snapshotOf([issue('C-1', 'alpha', 1)]) },
      [CONN_ROOT, COLD_ROOT]
    );

    expect([
      state.runBd.mock.calls.length,
      state.runBdJson.mock.calls.length,
      state.runProjected.mock.calls.length
    ]).toEqual([0, 0, 0]);
  });
});
