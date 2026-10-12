/**
 * `worker-bead-defer(-preview)` / `worker-bead-revive(-preview)` and the
 * `[보관 해제]` refusal they add (UI-0d9i §3.3–§3.5, §5 1–4·7·9).
 *
 * bd is a small in-memory fake behind the two process seams the handlers
 * reach (`runBdJsonProjected` for reads, `runBd` for writes), so the tests read
 * the bd call order and the resulting issue state the way the contract states
 * them.
 */
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn(), runBd: vi.fn() };
});

vi.mock('../bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('../workspace-snapshot-runtime.js', () => ({
  requestWorkspaceSnapshot: async () => ({ ok: false }),
  signalWorkspaceSnapshotMutation: () => {},
  __resetWorkspaceSnapshotRuntimeForTest: () => {},
  __setWorkspaceSnapshotCoordinatorFactoryForTest: () => {}
}));

const { runBd, runBdJsonProjected } = await import('../bd.js');
const { __registerWorkerAttachmentForTest, __resetWorkerAttachmentsForTest } =
  await import('../worker/attach.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const bead_defer = await import('../worker/bead-defer.js');
const { beadDeferLockKey } = bead_defer;
const {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} = await import('../ws.js');

const PR_URL = 'https://github.com/o/r/pull/7';

/**
 * @typedef {{ id: string, title: string, status: string, notes: string, metadata: Record<string, any> }} FakeIssue
 */

/** The fake bd's state, rebuilt per test. */
const bd = {
  /** @type {Map<string, FakeIssue>} */
  issues: new Map(),
  /** @type {Array<{ from: string, to: string, type: string }>} */
  edges: [],
  /** @type {string[][]} */
  writes: [],
  /** @type {Set<string>} */
  fail_writes: new Set(),
  fail_show_after_write: false,
  fail_show: false
};

/**
 * @param {string} id
 * @param {Partial<FakeIssue>} [patch]
 */
function issue(id, patch = {}) {
  bd.issues.set(id, {
    id,
    title: `${id} 제목`,
    status: 'open',
    notes: '',
    metadata: {},
    ...patch
  });
}

/**
 * @param {any} data
 * @returns {any}
 */
function ok(data) {
  return {
    ok: true,
    protocol: { format: 'bare', schema_version: null },
    data
  };
}

/**
 * @param {string} message
 * @returns {any}
 */
function bdFailure(message) {
  return { ok: false, error: { code: 'bd_exit_error', message } };
}

/**
 * @param {string[]} args
 * @returns {Promise<any>}
 */
async function fakeRead(args) {
  if (args[0] === 'show') {
    const found = bd.issues.get(args[1]);
    const after_write = bd.writes.length > 0;
    if (!found || bd.fail_show || (after_write && bd.fail_show_after_write)) {
      return bdFailure('show failed');
    }
    return ok(structuredClone(found));
  }
  if (args[0] === 'dep' && args[1] === 'list') {
    const id = args[2];
    if (args.includes('--direction')) {
      return ok(
        bd.edges
          .filter((edge) => edge.to === id && edge.type === 'blocks')
          .map((edge) => ({
            ...structuredClone(bd.issues.get(edge.from)),
            dependency_type: 'blocks'
          }))
      );
    }
    return ok(
      bd.edges
        .filter((edge) => edge.from === id)
        .map((edge) => ({
          ...structuredClone(bd.issues.get(edge.to)),
          dependency_type: edge.type
        }))
    );
  }
  if (args[0] === 'list') {
    const ids = String(args[args.indexOf('--id') + 1]).split(',');
    return ok(
      ids
        .map((id) => bd.issues.get(id))
        .filter(Boolean)
        .map((found) => structuredClone(found))
    );
  }
  return bdFailure(`unexpected read ${args.join(' ')}`);
}

/**
 * @param {string[]} args
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
async function fakeWrite(args) {
  bd.writes.push(args);
  const key = args.slice(0, 2).join(' ');
  if (bd.fail_writes.has(args[0]) || bd.fail_writes.has(key)) {
    return { code: 1, stdout: '', stderr: `${args[0]} failed` };
  }
  if (args[0] === 'defer') {
    const found = /** @type {FakeIssue} */ (bd.issues.get(args[1]));
    found.status = 'deferred';
    const reason = args.find((arg) => arg.startsWith('--reason='));
    if (reason) {
      found.notes += `${found.notes ? '\n' : ''}${reason.slice(9)}`;
    }
  } else if (args[0] === 'undefer') {
    /** @type {FakeIssue} */ (bd.issues.get(args[1])).status = 'open';
  } else if (args[0] === 'update' && args[2] === '--status') {
    /** @type {FakeIssue} */ (bd.issues.get(args[1])).status = args[3];
  } else if (args[0] === 'update' && args[2] === '--append-notes') {
    const found = /** @type {FakeIssue} */ (bd.issues.get(args[1]));
    found.notes += `${found.notes ? '\n' : ''}${args[3]}`;
  } else if (args[0] === 'dep' && args[1] === 'remove') {
    bd.edges = bd.edges.filter(
      (edge) => !(edge.from === args[2] && edge.to === args[3])
    );
  } else if (args[0] === 'dep' && args[1] === 'add') {
    bd.edges.push({ from: args[2], to: args[3], type: 'blocks' });
  }
  return { code: 0, stdout: '', stderr: '' };
}

/** The gh the revival reads PR state through: slug#number → state. */
const gh_state = {
  /** @type {Map<string, string>} */
  prs: new Map(),
  /** @type {string[]} */
  reads: [],
  fail: false
};

function installFakeGh() {
  /** @type {any} */ (getWorkerRuntime()).gh = {
    /** @param {string} slug */
    forSlug(slug) {
      return {
        /**
         * @param {string} _cwd
         * @param {number} number
         */
        async prDetail(_cwd, number) {
          gh_state.reads.push(`${slug}#${number}`);
          const state = gh_state.prs.get(`${slug}#${number}`);
          if (gh_state.fail || !state) {
            return { state: 'error', reason: 'gh_failed' };
          }
          return { state: 'ok', data: { state, number } };
        }
      };
    }
  };
}

/**
 * @returns {any}
 */
function fakeSocket() {
  /** @type {any} */
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      sock.sent.push(String(msg));
    }
  };
  return sock;
}

/**
 * @param {any} sock
 * @param {string} type
 * @param {Record<string, unknown>} payload
 * @returns {Promise<any>}
 */
async function call(sock, type, payload) {
  const id = `r${sock.sent.length}-${type}`;
  await handleMessage(sock, Buffer.from(JSON.stringify({ id, type, payload })));
  for (const raw of sock.sent) {
    const m = JSON.parse(raw);
    if (m.id === id) {
      return m;
    }
  }
  return null;
}

/**
 * Park one bead in PR 대기 and shelve it, as [보관] would.
 *
 * @param {string} bead_id
 */
function parkShelved(bead_id) {
  const store = getWorkerRuntime().queueStore;
  store.appendAttempt('', {
    expected_revision: store.snapshot('').revision,
    attempt: { attempt_id: `att-${bead_id}`, bead_id }
  });
  store.moveToPrWait('', {
    bead_id,
    attempt_id: `att-${bead_id}`,
    patch: { status: 'done', finished_at: 1 }
  });
  const shelved = store.setMergeShelved('', {
    expected_revision: store.snapshot('').revision,
    bead_id,
    on: true
  });
  expect(shelved.ok).toBe(true);
}

/**
 * The shelved, resolved-with-PR bead most tests start from, plus two open
 * dependents and one closed one.
 */
function deferFixture() {
  issue('UI-1', { status: 'resolved', metadata: { pr_url: PR_URL } });
  issue('UI-2');
  issue('UI-3');
  issue('UI-4', { status: 'closed' });
  bd.edges.push(
    { from: 'UI-2', to: 'UI-1', type: 'blocks' },
    { from: 'UI-3', to: 'UI-1', type: 'blocks' },
    { from: 'UI-4', to: 'UI-1', type: 'blocks' }
  );
  parkShelved('UI-1');
}

/**
 * @param {string} from
 * @param {string} to
 * @returns {boolean}
 */
function hasEdge(from, to) {
  return bd.edges.some((edge) => edge.from === from && edge.to === to);
}

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-defer-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  attachWsServer(createServer(), { path: '/ws' });
  getWorkerRuntime().externalPrs.clear();
  bd.issues = new Map();
  bd.edges = [];
  bd.writes = [];
  bd.fail_writes = new Set();
  bd.fail_show_after_write = false;
  bd.fail_show = false;
  gh_state.prs = new Map();
  gh_state.reads = [];
  gh_state.fail = false;
  vi.mocked(runBdJsonProjected).mockImplementation(
    /** @type {any} */ (
      async (/** @type {string} */ _family, /** @type {string[]} */ args) =>
        fakeRead(args)
    )
  );
  vi.mocked(runBd).mockImplementation(
    /** @type {any} */ (async (/** @type {string[]} */ args) => fakeWrite(args))
  );
  installFakeGh();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  vi.mocked(runBdJsonProjected).mockReset();
  vi.mocked(runBd).mockReset();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker-bead-defer-preview (UI-0d9i §3.3)', () => {
  test('lists the open same-repository blocks dependents of a shelved bead', async () => {
    deferFixture();

    const reply = await call(fakeSocket(), 'worker-bead-defer-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload.ok).toBe(true);
    expect(
      reply.payload.dependents.map((/** @type {any} */ d) => d.id)
    ).toEqual(['UI-2', 'UI-3']);
  });

  test.each([
    ['in_progress', {}, 'invalid_defer_origin'],
    ['resolved', {}, 'invalid_defer_origin'],
    ['deferred', { pr_url: PR_URL }, 'already_deferred']
  ])('refuses a %s origin with reason %s', async (status, metadata, reason) => {
    issue('UI-1', { status, metadata });

    const reply = await call(fakeSocket(), 'worker-bead-defer-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({ ok: false, reason });
  });

  test('refuses a bead whose shelf record is gone with not_shelved', async () => {
    issue('UI-1', { status: 'resolved', metadata: { pr_url: PR_URL } });

    const reply = await call(fakeSocket(), 'worker-bead-defer-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({ ok: false, reason: 'not_shelved' });
  });
});

describe('worker-bead-defer (UI-0d9i §3.3)', () => {
  test.each(['parallel', 's1'])(
    'withdraws an open issue from %s before deferring it',
    async (lane) => {
      issue('UI-1');
      const store = getWorkerRuntime().queueStore;
      expect(
        store.place('', {
          expected_revision: store.snapshot('').revision,
          bead_id: 'UI-1',
          lane
        }).ok
      ).toBe(true);
      const seatsAtWrite = vi.fn();
      vi.mocked(runBd).mockImplementation(async (args) => {
        const q = store.snapshot('');
        seatsAtWrite([
          ...q.queue,
          ...q.serial_lanes.flatMap((entry) => entry.entries)
        ]);
        return fakeWrite(args);
      });

      const reply = await call(fakeSocket(), 'worker-bead-defer', {
        bead_id: 'UI-1',
        source: 'detail',
        remove_edges: []
      });

      expect(reply.payload).toMatchObject({
        applied: true,
        status: 'deferred'
      });
      expect(seatsAtWrite).toHaveBeenCalledWith([]);
      expect(bd.writes).toEqual([
        ['defer', 'UI-1', '--reason=이슈 상세에서 사용자가 보류로 지정']
      ]);
    }
  );

  test('previews an open issue without requiring a shelf record', async () => {
    issue('UI-1');

    const reply = await call(fakeSocket(), 'worker-bead-defer-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({
      ok: true,
      status: 'open',
      dependents: []
    });
    expect(bd.writes).toEqual([]);
  });

  test.each(['running', 'pending', 'paused'])(
    'refuses an open issue with a %s attempt before removing its seat',
    async (status) => {
      issue('UI-1');
      const store = getWorkerRuntime().queueStore;
      store.place('', {
        expected_revision: store.snapshot('').revision,
        bead_id: 'UI-1'
      });
      store.appendAttempt('', {
        expected_revision: store.snapshot('').revision,
        attempt: { attempt_id: 'active', bead_id: 'UI-1', status }
      });

      const reply = await call(fakeSocket(), 'worker-bead-defer', {
        bead_id: 'UI-1',
        source: 'detail'
      });

      expect(reply.payload).toMatchObject({
        outcome: 'refused',
        reason: 'attempt_active'
      });
      expect(store.snapshot('').queue.map((entry) => entry.bead_id)).toEqual([
        'UI-1'
      ]);
      expect(bd.writes).toEqual([]);
    }
  );

  test.each([undefined, '', '  '])(
    'fills an absent or blank shelf reason (%s)',
    async (reason) => {
      deferFixture();

      await call(fakeSocket(), 'worker-bead-defer', {
        bead_id: 'UI-1',
        reason
      });

      expect(bd.writes).toEqual([
        ['defer', 'UI-1', '--reason=보관 행에서 사용자가 보류로 전환']
      ]);
    }
  );

  test('refuses an in_progress origin on the write path', async () => {
    issue('UI-1', { status: 'in_progress' });

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      source: 'detail'
    });

    expect(reply.payload).toMatchObject({
      outcome: 'refused',
      reason: 'invalid_defer_origin'
    });
    expect(bd.writes).toEqual([]);
  });

  test('defers first, then cuts each chosen edge and notes it', async () => {
    deferFixture();

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      applied: true,
      outcome: 'applied',
      edges: ['UI-2']
    });
    expect(bd.writes).toEqual([
      ['defer', 'UI-1', '--reason=나중에'],
      ['dep', 'remove', 'UI-2', 'UI-1'],
      ['update', 'UI-1', '--append-notes', 'deferred-unblocked: UI-2']
    ]);
  });

  test('leaves the unselected edge and records the reason and the cut edge in notes', async () => {
    deferFixture();

    await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: ['UI-2']
    });

    const after = /** @type {FakeIssue} */ (bd.issues.get('UI-1'));
    expect(after.status).toBe('deferred');
    expect(after.notes).toBe('나중에\ndeferred-unblocked: UI-2');
    expect(hasEdge('UI-2', 'UI-1')).toBe(false);
    expect(hasEdge('UI-3', 'UI-1')).toBe(true);
  });

  test('keeps the PR 대기 row, its shelf record and hides the row on the wire', async () => {
    deferFixture();

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });

    const stored = getWorkerRuntime().queueStore.snapshot('');
    expect(stored.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
    expect(Object.keys(stored.merge_shelved || {})).toEqual(['UI-1']);
    expect(
      reply.payload.queue.pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([]);
  });

  test('reports a failed edge and keeps the bead deferred', async () => {
    deferFixture();
    bd.fail_writes.add('dep remove');

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: ['UI-2', 'UI-3']
    });

    expect(reply.payload).toMatchObject({ applied: true, outcome: 'partial' });
    expect(
      reply.payload.failed_edges.map((/** @type {any} */ f) => [f.id, f.step])
    ).toEqual([
      ['UI-2', 'remove'],
      ['UI-3', 'remove']
    ]);
    expect(bd.issues.get('UI-1')?.status).toBe('deferred');
  });

  test('reports a failed bd defer write as no change', async () => {
    deferFixture();
    bd.fail_writes.add('defer');

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      applied: false,
      outcome: 'failed',
      reason: 'bd_write_failed',
      write_applied: false
    });
    expect(bd.writes).toEqual([['defer', 'UI-1', '--reason=나중에']]);
  });

  test('reports a write whose readback failed as unknown and never retries it', async () => {
    deferFixture();
    bd.fail_show_after_write = true;

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      applied: false,
      outcome: 'unknown',
      reason: 'readback_failed',
      write_applied: true,
      retry_safe: false
    });
    expect(bd.writes).toEqual([['defer', 'UI-1', '--reason=나중에']]);
  });

  test('refuses with not_shelved when the shelf was lifted after the preview', async () => {
    deferFixture();
    const sock = fakeSocket();
    await call(sock, 'worker-bead-defer-preview', { bead_id: 'UI-1' });
    const store = getWorkerRuntime().queueStore;
    store.setMergeShelved('', {
      expected_revision: store.snapshot('').revision,
      bead_id: 'UI-1',
      on: false
    });

    const reply = await call(sock, 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });

    expect(reply.payload).toMatchObject({
      applied: false,
      outcome: 'refused',
      reason: 'not_shelved'
    });
    expect(bd.writes).toEqual([]);
  });

  test('refuses with merge_active while a merge effect runs on the bead', async () => {
    deferFixture();
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        prActions: { isInFlight: () => true },
        mergeQueue: { state: () => ({ active: null, failures: {} }) }
      })
    );

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });

    expect(reply.payload).toMatchObject({
      outcome: 'refused',
      reason: 'merge_active'
    });
    expect(bd.writes).toEqual([]);
  });

  test('refuses with merge_observed once the PR was observed merged', async () => {
    deferFixture();
    getWorkerRuntime().prObservations.record('', 'UI-1', {
      error: null,
      pr: /** @type {any} */ ({ number: 7, url: PR_URL, state: 'MERGED' })
    });

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });

    expect(reply.payload).toMatchObject({
      outcome: 'refused',
      reason: 'merge_observed'
    });
    expect(bd.writes).toEqual([]);
  });

  test('refuses a defer that waited behind a running completion cleanup', async () => {
    deferFixture();
    const applyDefer = vi.spyOn(bead_defer, 'applyDefer');
    let cleaning = true;
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        prActions: { isInFlight: () => cleaning },
        mergeQueue: { state: () => ({ active: null, failures: {} }) }
      })
    );
    const release = await getWorkerRuntime().locks.acquire(
      beadDeferLockKey('', 'UI-1')
    );
    const pending = call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const transitions_while_held = applyDefer.mock.calls.length;
    getWorkerRuntime().prObservations.record('', 'UI-1', {
      error: null,
      pr: /** @type {any} */ ({ number: 7, url: PR_URL, state: 'MERGED' })
    });
    cleaning = false;
    release();

    const reply = await pending;

    expect(transitions_while_held).toBe(0);
    expect(applyDefer).toHaveBeenCalledTimes(1);
    expect(reply.payload).toMatchObject({
      outcome: 'refused',
      reason: 'merge_observed'
    });
    expect(bd.writes).toEqual([]);
  });

  test('rejects a non-string reason as a bad request', async () => {
    deferFixture();

    const reply = await call(fakeSocket(), 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: 42,
      remove_edges: []
    });

    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });
});

describe('[보관 해제] of a deferred bead (UI-0d9i §3.3)', () => {
  test('refuses the unshelve of a deferred bead with deferred', async () => {
    deferFixture();
    const sock = fakeSocket();
    await call(sock, 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });

    const reply = await call(sock, 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(reply.payload).toMatchObject({ applied: false, reason: 'deferred' });
    expect(
      Object.keys(getWorkerRuntime().queueStore.snapshot('').merge_shelved)
    ).toEqual(['UI-1']);
  });

  test('reads bd when no scan has read the status yet', async () => {
    deferFixture();
    /** @type {FakeIssue} */ (bd.issues.get('UI-1')).status = 'deferred';

    const reply = await call(fakeSocket(), 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(reply.payload).toMatchObject({ applied: false, reason: 'deferred' });
  });

  test('asks bd again after a defer whose readback failed', async () => {
    deferFixture();
    getWorkerRuntime().externalPrs.replaceStatuses('', { 'UI-1': 'resolved' });
    bd.fail_show_after_write = true;
    const sock = fakeSocket();
    await call(sock, 'worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
      remove_edges: []
    });
    bd.fail_show_after_write = false;

    const reply = await call(sock, 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(reply.payload).toMatchObject({ applied: false, reason: 'deferred' });
  });

  test('refuses the unshelve of a bead bd reads deferred despite a cached resolved status', async () => {
    deferFixture();
    getWorkerRuntime().externalPrs.replaceStatuses('', { 'UI-1': 'resolved' });
    /** @type {FakeIssue} */ (bd.issues.get('UI-1')).status = 'deferred';

    const reply = await call(fakeSocket(), 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(reply.payload).toMatchObject({ applied: false, reason: 'deferred' });
    expect(
      Object.keys(getWorkerRuntime().queueStore.snapshot('').merge_shelved)
    ).toEqual(['UI-1']);
  });

  test('stores the status the unshelve read in the projection cache', async () => {
    deferFixture();
    getWorkerRuntime().externalPrs.replaceStatuses('', { 'UI-1': 'resolved' });
    /** @type {FakeIssue} */ (bd.issues.get('UI-1')).status = 'deferred';

    await call(fakeSocket(), 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(getWorkerRuntime().externalPrs.statusOf('', 'UI-1')).toBe(
      'deferred'
    );
  });

  test('refuses the unshelve with merge_active while a completion cleanup holds the bead', async () => {
    deferFixture();
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        prActions: { isInFlight: () => true },
        mergeQueue: { state: () => ({ active: null, failures: {} }) }
      })
    );
    const release = await getWorkerRuntime().locks.acquire(
      beadDeferLockKey(process.cwd(), 'UI-1')
    );

    const reply = await call(fakeSocket(), 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });
    release();

    expect(reply.payload).toMatchObject({
      applied: false,
      reason: 'merge_active'
    });
  });

  test('refuses the unshelve when the status cannot be read', async () => {
    deferFixture();
    bd.fail_show = true;

    const reply = await call(fakeSocket(), 'worker-merge-shelve', {
      bead_id: 'UI-1',
      on: false,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(reply.payload).toMatchObject({
      applied: false,
      reason: 'bead_status_unreadable'
    });
  });
});

describe('worker-bead-revive (UI-0d9i §3.3, §3.5)', () => {
  /**
   * A deferred bead whose defer cut UI-2 and UI-4 (now closed).
   *
   * @param {Record<string, any>} [metadata]
   */
  function reviveFixture(metadata = { pr_url: PR_URL }) {
    issue('UI-1', {
      status: 'deferred',
      metadata,
      notes: '나중에\ndeferred-unblocked: UI-2\ndeferred-unblocked: UI-4'
    });
    issue('UI-2');
    issue('UI-4', { status: 'closed' });
    parkShelved('UI-1');
  }

  test.each([
    ['OPEN', 'resolved'],
    ['MERGED', 'resolved'],
    ['CLOSED', 'open']
  ])('previews a %s PR as target %s', async (state, target) => {
    reviveFixture();
    gh_state.prs.set('o/r#7', state);

    const reply = await call(fakeSocket(), 'worker-bead-revive-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({
      ok: true,
      target,
      pr_state: state,
      shelved: true
    });
    expect(
      reply.payload.restorable.map((/** @type {any} */ r) => r.id)
    ).toEqual(['UI-2']);
  });

  test('previews a bead with no pr_url as target open', async () => {
    reviveFixture({});

    const reply = await call(fakeSocket(), 'worker-bead-revive-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({ ok: true, target: 'open' });
    expect(gh_state.reads).toEqual([]);
  });

  test('previews a PR lookup failure as an error with no target', async () => {
    reviveFixture();
    gh_state.fail = true;

    const reply = await call(fakeSocket(), 'worker-bead-revive-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({
      ok: false,
      reason: 'pr_lookup_failed'
    });
    expect(reply.payload.target).toBeUndefined();
  });

  test('reads a pinned foreign PR from its pinned target repository', async () => {
    const foreign_url = 'https://github.com/other/target/pull/12';
    reviveFixture({
      pr_url: foreign_url,
      foreign_repo: 'https://github.com/other/target.git',
      foreign_path: '/tmp/other-target',
      foreign_base: 'main'
    });
    gh_state.prs.set('other/target#12', 'OPEN');

    const reply = await call(fakeSocket(), 'worker-bead-revive-preview', {
      bead_id: 'UI-1'
    });

    expect(reply.payload).toMatchObject({ ok: true, target: 'resolved' });
    expect(gh_state.reads).toEqual(['other/target#12']);
  });

  test('writes resolved for an open PR, restores the chosen edge and lifts the shelf', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'OPEN');

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      applied: true,
      outcome: 'applied',
      target: 'resolved',
      edges: ['UI-2'],
      shelf_cleared: true
    });
    expect(bd.writes).toEqual([
      ['update', 'UI-1', '--status', 'resolved'],
      ['dep', 'add', 'UI-2', 'UI-1', '--type', 'blocks']
    ]);
    expect(hasEdge('UI-2', 'UI-1')).toBe(true);
    expect(getWorkerRuntime().queueStore.snapshot('').merge_shelved).toEqual(
      {}
    );
  });

  test('returns the PR 대기 row to the wire after the revival', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'MERGED');
    getWorkerRuntime().externalPrs.noteStatus('', 'UI-1', 'deferred');

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: []
    });

    expect(
      reply.payload.queue.pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
    expect(bd.issues.get('UI-1')?.status).toBe('resolved');
  });

  test('writes bd undefer for a closed PR', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'CLOSED');

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: []
    });

    expect(reply.payload).toMatchObject({ outcome: 'applied', target: 'open' });
    expect(bd.writes).toEqual([['undefer', 'UI-1']]);
  });

  test('writes nothing when the PR cannot be read', async () => {
    reviveFixture();
    gh_state.fail = true;

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      applied: false,
      outcome: 'failed',
      reason: 'pr_lookup_failed'
    });
    expect(bd.writes).toEqual([]);
    expect(
      Object.keys(getWorkerRuntime().queueStore.snapshot('').merge_shelved)
    ).toEqual(['UI-1']);
  });

  test('reports an edge whose readback still lacks it as failed', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'OPEN');
    vi.mocked(runBd).mockImplementation(
      /** @type {any} */ (
        async (/** @type {string[]} */ args) => {
          if (args[0] === 'dep') {
            bd.writes.push(args);
            return { code: 0, stdout: '', stderr: '' };
          }
          return fakeWrite(args);
        }
      )
    );

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({ applied: true, outcome: 'partial' });
    expect(reply.payload.failed_edges).toEqual([
      { id: 'UI-2', step: 'readback', message: 'edge missing' }
    ]);
  });

  test('skips a chosen dependent that closed after the preview', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'OPEN');
    /** @type {FakeIssue} */ (bd.issues.get('UI-2')).status = 'closed';

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({
      outcome: 'applied',
      edges: [],
      failed_edges: [],
      skipped_edges: ['UI-2']
    });
    expect(bd.writes).toEqual([['update', 'UI-1', '--status', 'resolved']]);
  });

  test('restores no edge when the dependents status read fails', async () => {
    reviveFixture();
    gh_state.prs.set('o/r#7', 'OPEN');
    vi.mocked(runBdJsonProjected).mockImplementation(
      /** @type {any} */ (
        async (/** @type {string} */ _family, /** @type {string[]} */ args) =>
          args[0] === 'list' ? bdFailure('list failed') : fakeRead(args)
      )
    );

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });

    expect(reply.payload).toMatchObject({ applied: true, outcome: 'partial' });
    expect(reply.payload.failed_edges).toEqual([
      { id: 'UI-2', step: 'status_read', message: 'list failed' }
    ]);
    expect(bd.writes).toEqual([['update', 'UI-1', '--status', 'resolved']]);
  });

  test('refuses a bead that is not deferred', async () => {
    issue('UI-1', { status: 'resolved', metadata: { pr_url: PR_URL } });

    const reply = await call(fakeSocket(), 'worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: []
    });

    expect(reply.payload).toMatchObject({
      outcome: 'refused',
      reason: 'not_deferred'
    });
    expect(bd.writes).toEqual([]);
  });
});

describe('PR 대기 projection of a deferred bead (UI-0d9i §3.4)', () => {
  /**
   * @returns {any}
   */
  function rawQueue() {
    return {
      revision: 1,
      slots: 2,
      queue: [],
      attempts: {},
      pr_wait: [
        { bead_id: 'UI-1', added_at: 1 },
        { bead_id: 'UI-2', added_at: 2 }
      ],
      done: [],
      cleanup_failed: {},
      merge_shelved: { 'UI-1': { at: 1 } }
    };
  }

  test('hides the row of a bead the last scan read deferred', async () => {
    const { decorateQueue } = await import('./worker-handlers.js');
    getWorkerRuntime().externalPrs.replaceStatuses('', {
      'UI-1': 'deferred',
      'UI-2': 'resolved'
    });

    const projected = /** @type {any} */ (decorateQueue('', rawQueue()));

    expect(projected.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-2'
    ]);
    expect(projected.merge_shelved).toEqual({ 'UI-1': { at: 1 } });
  });

  test('shows the row when no scan has read the status', async () => {
    const { decorateQueue } = await import('./worker-handlers.js');

    const projected = /** @type {any} */ (decorateQueue('', rawQueue()));

    expect(projected.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1',
      'UI-2'
    ]);
  });
});
