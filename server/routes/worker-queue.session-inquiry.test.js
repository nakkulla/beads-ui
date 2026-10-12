/**
 * The session-inquiry HTTP input (UI-gske §3.1, dotfiles workflow-state.yaml
 * `session_inquiry`): register and state, through the real app and the real
 * queue store over a temporary state directory.
 */
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';

vi.mock('../workspace-snapshot-runtime.js', () => ({
  requestWorkspaceSnapshot: async () => ({ ok: false }),
  signalWorkspaceSnapshotMutation: () => {},
  __resetWorkspaceSnapshotRuntimeForTest: () => {},
  __setWorkspaceSnapshotCoordinatorFactoryForTest: () => {}
}));

const { createApp } = await import('../app.js');
const { registerWorkspace } = await import('../registry-watcher.js');
const { __registerWorkerAttachmentForTest, __resetWorkerAttachmentsForTest } =
  await import('../worker/attach.js');
const { __resetWorkerRuntimeForTest, getWorkerRuntime } =
  await import('../worker/runtime.js');

const SID_A = '11111111-1111-4111-8111-111111111111';
const SID_B = '22222222-2222-4222-8222-222222222222';

/** @type {string} */
let workspace;
/** @type {string} */
let other_workspace;
/** @type {string} */
let tmp_state;
/** @type {import('node:http').Server} */
let server;
/** @type {string} */
let base_url;

beforeAll(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-si-route-ws-'));
  other_workspace = fs.mkdtempSync(
    path.join(os.tmpdir(), 'bdui-si-route-ws2-')
  );
  for (const root of [workspace, other_workspace]) {
    registerWorkspace({ path: root, database: path.join(root, '.beads') });
  }
});

beforeEach(async () => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-si-route-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: workspace,
    frontend_mode: 'live'
  });
  server = createServer(app);
  // Bind loopback explicitly: a wildcard bind would expose the test server.
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(undefined));
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  base_url = `http://127.0.0.1:${address.port}`;
});

afterEach(async () => {
  await new Promise((resolve) => server.close(() => resolve(undefined)));
  __resetWorkerAttachmentsForTest();
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {string} suffix
 * @param {unknown} body
 */
async function post(suffix, body) {
  const response = await fetch(
    `${base_url}/api/worker/session-inquiry${suffix}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }
  );
  const text = await response.text();
  return {
    status: response.status,
    content_type: response.headers.get('content-type') || '',
    body: JSON.parse(text)
  };
}

/**
 * @param {Record<string, unknown>} [patch]
 * @returns {Record<string, unknown>}
 */
function registerBody(patch = {}) {
  return {
    repo: workspace,
    ref: 'refs/set-aside/main/sync-1',
    session_id: SID_A,
    runner: 'claude',
    cwd: workspace,
    summary: '보관한 묶음을 다시 적용할까요?',
    bundles: [{ title: '설정', paths: ['a.js', 'b.js'], reason: '충돌' }],
    ...patch
  };
}

/**
 * @param {string} root
 * @param {string} id
 */
function rowOf(root, id) {
  return /** @type {any} */ (getWorkerRuntime().queueStore.snapshot(root))
    .session_inquiries[id];
}

/**
 * Register a fake attachment whose session-inquiry runtime records pushes.
 *
 * @param {string} root
 */
function attachWithAnnounce(root) {
  const announce = vi.fn(async () => {});
  __registerWorkerAttachmentForTest(
    root,
    /** @type {any} */ ({ sessionInquiry: { announce } })
  );
  return announce;
}

describe('POST /api/worker/session-inquiry', () => {
  test('creates a waiting row and answers created:true', async () => {
    const result = await post('', registerBody());

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: expect.stringMatching(/^si-[0-9a-f]{12}$/),
      state: 'waiting',
      created: true
    });
    expect(rowOf(workspace, result.body.id)).toMatchObject({
      repo: workspace,
      ref: 'refs/set-aside/main/sync-1',
      session_id: SID_A,
      related_beads: [],
      auto_resume_consumed: [],
      liveness: null
    });
  });

  test('updates the open row of the same repo and ref without a new row', async () => {
    const first = await post('', registerBody());

    const second = await post('', registerBody({ summary: '바뀐 질문' }));

    expect(second.body).toEqual({
      id: first.body.id,
      state: 'waiting',
      created: false
    });
    expect(rowOf(workspace, first.body.id).summary).toBe('바뀐 질문');
  });

  test('resets a held row to waiting when the session id changes', async () => {
    const first = await post('', registerBody());
    await post(`/${first.body.id}/state`, { state: 'held' });

    const second = await post('', registerBody({ session_id: SID_B }));

    expect(second.body).toEqual({
      id: first.body.id,
      state: 'waiting',
      created: false
    });
    expect(rowOf(workspace, first.body.id).session_id).toBe(SID_B);
  });

  test('makes a new row after the same identity closed', async () => {
    const first = await post('', registerBody());
    await post(`/${first.body.id}/state`, { state: 'closed' });

    const second = await post('', registerBody());

    expect(second.body.created).toBe(true);
    expect(second.body.id).not.toBe(first.body.id);
  });

  test.each([
    ['a relative repo', { repo: 'repo' }],
    ['an unregistered repo', { repo: '/tmp/not-a-registered-workspace' }],
    ['a ref outside refs/set-aside/', { ref: 'refs/heads/main' }],
    ['a bare refs/set-aside/ prefix', { ref: 'refs/set-aside/' }],
    [
      'an uppercase session id',
      { session_id: 'ABCDEFAB-ABCD-4ABC-8ABC-ABCDEFABCDEF' }
    ],
    ['a non-UUID session id', { session_id: 'abc' }],
    ['a codex runner', { runner: 'codex' }],
    ['a relative cwd', { cwd: 'sub/dir' }],
    ['an empty summary', { summary: '  ' }],
    ['a multi-line summary', { summary: '첫 줄\n둘째 줄' }],
    ['a 201-character summary', { summary: 'x'.repeat(201) }],
    [
      'a bundle without a title',
      { bundles: [{ title: '', paths: [], reason: 'r' }] }
    ],
    [
      'a bundle without a reason',
      { bundles: [{ title: 't', paths: [], reason: '' }] }
    ],
    [
      'bundle paths that are not strings',
      { bundles: [{ title: 't', paths: [1], reason: 'r' }] }
    ],
    ['bundles that are not an array', { bundles: {} }],
    ['related beads that are not ids', { related_beads: [''] }]
  ])('rejects %s with a JSON 400', async (_label, patch) => {
    const result = await post('', registerBody(patch));

    expect(result.status).toBe(400);
    expect(result.content_type).toContain('application/json');
    expect(result.body).toMatchObject({
      ok: false,
      error: 'bad_request',
      message: expect.any(String)
    });
  });

  test('sends the creation push once for an attached workspace', async () => {
    const announce = attachWithAnnounce(workspace);

    const first = await post('', registerBody());
    await post('', registerBody({ summary: '다시' }));
    await post('', registerBody({ session_id: SID_B }));

    expect(announce).toHaveBeenCalledTimes(1);
    expect(rowOf(workspace, first.body.id).notified_at).toEqual(
      expect.any(Number)
    );
  });

  test('sends no push after a restart re-registers the same row', async () => {
    const first = await post('', registerBody());
    __resetWorkerRuntimeForTest();
    const announce = attachWithAnnounce(workspace);

    const second = await post('', registerBody());

    expect(second.body).toMatchObject({ id: first.body.id, created: false });
    expect(announce).not.toHaveBeenCalled();
  });

  test('stores the row of an unattached workspace without a push', async () => {
    const result = await post('', registerBody());

    expect(result.body.created).toBe(true);
    expect(rowOf(workspace, result.body.id).notified_at).toBeNull();
  });
});

describe('POST /api/worker/session-inquiry/:id/state', () => {
  test.each([
    ['waiting', 'held'],
    ['waiting', 'closed'],
    ['held', 'waiting'],
    ['held', 'closed']
  ])('moves a %s row to %s', async (from, to) => {
    const created = await post('', registerBody());
    if (from === 'held') {
      await post(`/${created.body.id}/state`, { state: 'held' });
    }

    const result = await post(`/${created.body.id}/state`, {
      state: to,
      note: '세션 메모'
    });

    expect(result).toMatchObject({
      status: 200,
      body: { id: created.body.id, state: to }
    });
    expect(rowOf(workspace, created.body.id)).toMatchObject({
      state: to,
      note: '세션 메모'
    });
  });

  test.each(['waiting', 'closed'])(
    'answers a same-state %s request with 200 and no change',
    async (state) => {
      const created = await post('', registerBody());
      if (state === 'closed') {
        await post(`/${created.body.id}/state`, { state: 'closed' });
      }
      const revision =
        getWorkerRuntime().queueStore.snapshot(workspace).revision;

      const result = await post(`/${created.body.id}/state`, { state });

      expect(result).toMatchObject({
        status: 200,
        body: { id: created.body.id, state }
      });
      expect(getWorkerRuntime().queueStore.snapshot(workspace).revision).toBe(
        revision
      );
    }
  );

  test.each(['waiting', 'held'])(
    'rejects closed -> %s with a JSON 409 and no change',
    async (state) => {
      const created = await post('', registerBody());
      await post(`/${created.body.id}/state`, { state: 'closed' });

      const result = await post(`/${created.body.id}/state`, { state });

      expect(result.status).toBe(409);
      expect(result.body).toMatchObject({
        ok: false,
        error: 'invalid_transition'
      });
      expect(rowOf(workspace, created.body.id).state).toBe('closed');
    }
  );

  test('answers an unknown id with a JSON 404', async () => {
    const result = await post('/si-ffffffffffff/state', { state: 'held' });

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ ok: false, error: 'unknown_id' });
  });

  test('finds a row registered under another workspace', async () => {
    const created = await post('', registerBody({ repo: other_workspace }));

    const result = await post(`/${created.body.id}/state`, { state: 'held' });

    expect(result.status).toBe(200);
    expect(rowOf(other_workspace, created.body.id).state).toBe('held');
  });

  test('rejects an unknown state value with a JSON 400', async () => {
    const created = await post('', registerBody());

    const result = await post(`/${created.body.id}/state`, { state: 'done' });

    expect(result.status).toBe(400);
    expect(result.body).toMatchObject({ ok: false, error: 'bad_request' });
  });
});

describe('session-inquiry body parse errors', () => {
  test('answers a malformed JSON body with a JSON 400', async () => {
    const init = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"repo":'
    };

    const response = await fetch(
      `${base_url}/api/worker/session-inquiry`,
      init
    );
    const body = JSON.parse(await response.text());

    expect(response.status).toBe(400);
    expect(body).toMatchObject({ ok: false, error: 'bad_request' });
  });
});
