import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createApp } from '../app.js';
import { createBeadTimeline } from './bead-timeline.js';
import { collectWorkerIncidents } from './incidents.js';
import {
  attemptRecordPath,
  beadTimelinePath,
  queueFilePath
} from './state-paths.js';

const mocks = vi.hoisted(() => ({
  workspaces: vi.fn(),
  bd: vi.fn()
}));
vi.mock('../registry-watcher.js', async (importOriginal) => ({
  ...(await importOriginal()),
  getAvailableWorkspaces: mocks.workspaces
}));
vi.mock('../bd.js', async (importOriginal) => ({
  ...(await importOriginal()),
  runBdJsonProjected: mocks.bd
}));

const SINCE = '2026-10-15T00:00:00.000Z';
const START = Date.parse(SINCE);
const THROUGH = START + 86400000;
/** @type {string} */
let temporary;
/** @type {string[]} */
let roots;
/** @type {Map<string, any[]>} */
let issues;
/** @type {import('node:http').Server|undefined} */
let server;

beforeEach(() => {
  temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-incidents-'));
  vi.stubEnv('XDG_STATE_HOME', path.join(temporary, 'state'));
  roots = [path.join(temporary, 'repo-a'), path.join(temporary, 'repo-b')];
  issues = new Map(roots.map((root) => [root, []]));
  mocks.workspaces.mockReturnValue(roots.map((root) => ({ path: root })));
  mocks.bd.mockImplementation(async (_family, _args, options) => ({
    ok: true,
    data: issues.get(options.cwd) || []
  }));
});

afterEach(async () => {
  if (server) {
    const closing_server = server;
    await new Promise((resolve) =>
      closing_server.close(() => resolve(undefined))
    );
    server = undefined;
  }
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  fs.rmSync(temporary, { recursive: true, force: true });
});

/**
 * @param {string} file
 * @param {unknown} value
 */
function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value));
}

/**
 * @param {string} root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @param {Record<string, unknown>} [fields]
 */
function attempt(root, bead_id, attempt_id, fields = {}) {
  const record = {
    bead_id,
    attempt_id,
    status: 'failed',
    cause: 'verify_failed:tests:exit_1',
    finished_at: START + 1000,
    ...fields
  };
  writeJson(attemptRecordPath(root, bead_id, attempt_id), record);
  return record;
}

/**
 * @param {string} root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @param {Partial<import('./bead-timeline.js').TimelineAppendInput>} [fields]
 */
function event(root, bead_id, attempt_id, fields = {}) {
  const result = createBeadTimeline({ workspace_root: root }).append({
    bead_id,
    attempt_id,
    kind: 'attempt_failed',
    seq: 'failed',
    at: START + 1000,
    summary: 'A concrete failure',
    ...fields
  });
  if (!result.ok) {
    throw new Error(result.detail);
  }
  return result.event;
}

/**
 * @param {string[]} [carry]
 */
function collect(carry = []) {
  return collectWorkerIncidents(
    { since: SINCE, carry },
    { now: () => THROUGH }
  );
}

test('groups two cause segments across workspaces and keeps distinct bead identities', async () => {
  attempt(roots[0], 'UI-a', 'first');
  attempt(roots[1], 'UI-a', 'second', { cause: 'verify_failed:tests:exit_2' });
  event(roots[0], 'UI-a', 'first');
  event(roots[1], 'UI-a', 'second', { at: START + 2000 });

  const result = await collect();

  expect(result).toEqual({
    schema_version: 1,
    since: SINCE,
    through: '2026-10-16T00:00:00.000Z',
    fingerprints: [
      {
        fp: createHash('sha256')
          .update('attempt_failed|verify_failed:tests|')
          .digest('hex')
          .slice(0, 12),
        kind: 'attempt_failed',
        cause_head: 'verify_failed:tests',
        tier: 'individual',
        env_group: null,
        count: 2,
        beads: roots.map((workspace_root) => ({
          workspace_root,
          bead_id: 'UI-a'
        })),
        first_at: '2026-10-15T00:00:01.000Z',
        last_at: '2026-10-15T00:00:02.000Z',
        samples: [
          {
            attempt_id: 'second',
            at: '2026-10-15T00:00:02.000Z',
            summary: 'A concrete failure',
            events_path: beadTimelinePath(roots[1], 'UI-a')
          },
          {
            attempt_id: 'first',
            at: '2026-10-15T00:00:01.000Z',
            summary: 'A concrete failure',
            events_path: beadTimelinePath(roots[0], 'UI-a')
          }
        ],
        transient: false,
        self_origin: false,
        recurred_after_fix: false
      }
    ]
  });
});

test('uses guard reason codes and separates event kinds', async () => {
  attempt(roots[0], 'UI-a', 'first', { cause: 'hook_bypass_blocked' });
  event(roots[0], 'UI-a', 'first');
  event(roots[0], 'UI-a', 'first', {
    kind: 'guard_denied',
    reason: 'hook_bypass_blocked',
    seq: 'hook-1'
  });
  event(roots[0], 'UI-a', 'first', {
    kind: 'guard_warning',
    reason: 'hook_bypass_blocked',
    seq: 'hook-2'
  });

  const { fingerprints } = await collect();

  expect(fingerprints.map((row) => [row.kind, row.cause_head]).sort()).toEqual([
    ['attempt_failed', 'hook_bypass_blocked'],
    ['guard_denied', 'hook_bypass_blocked']
  ]);
});

test('separates environment groups for the same cause', async () => {
  for (const [index, summary] of [
    'ECONNRESET',
    'command not found'
  ].entries()) {
    attempt(roots[0], 'UI-a', String(index), {
      cause: 'session_failed:is_error',
      cause_detail: { summary }
    });
    event(roots[0], 'UI-a', String(index));
  }

  const { fingerprints } = await collect();

  expect(fingerprints.map((row) => row.env_group).sort()).toEqual([
    'api',
    'runtime'
  ]);
});

test('fingerprints waiting causes that have no retry causeKey', async () => {
  attempt(roots[0], 'UI-a', 'waiting', {
    cause: 'prerequisite_unmet',
    status: 'waiting',
    cause_detail: { blockers: ['UI-b'] }
  });
  event(roots[0], 'UI-a', 'waiting');

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    tier: 'waiting',
    cause_head: 'prerequisite_unmet',
    fp: expect.stringMatching(/^[a-f0-9]{12}$/)
  });
});

test('preserves the recorded environment fingerprint after retries exhaust and recovery succeeds', async () => {
  attempt(roots[0], 'UI-a', 'failure', {
    cause: 'session_failed:reported_failure',
    cause_detail: { env_pattern: 'unknown' },
    retry: { attempts: 3, max: 3, exhausted: true }
  });
  event(roots[0], 'UI-a', 'failure');
  attempt(roots[0], 'UI-a', 'success', {
    status: 'done',
    cause: null,
    finished_at: START + 2000
  });

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    fp: createHash('sha256')
      .update('attempt_failed|session_failed:reported_failure|unknown')
      .digest('hex')
      .slice(0, 12),
    tier: 'env',
    env_group: 'unknown',
    transient: true
  });
});

test('preserves a recorded environment tier with no environment group', async () => {
  attempt(roots[0], 'UI-a', 'failure', {
    cause: 'session_failed:reported_failure',
    cause_detail: { env_pattern: null }
  });
  event(roots[0], 'UI-a', 'failure');

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({ tier: 'env', env_group: null });
});

test('uses the Worker recovery policy when a failure has no recorded environment classification', async () => {
  attempt(roots[0], 'UI-a', 'failure', {
    cause: 'session_failed:reported_failure'
  });
  event(roots[0], 'UI-a', 'failure');

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({ tier: 'env', env_group: 'unknown' });
});

test('includes the since boundary and excludes events beyond the response watermark', async () => {
  attempt(roots[0], 'UI-a', 'first');
  for (const at of [START - 1, START, THROUGH + 1]) {
    event(roots[0], 'UI-a', 'first', { at, seq: String(at) });
  }

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    count: 1,
    first_at: SINCE,
    last_at: SINCE
  });
});

test('includes older occurrences only for carried fingerprints', async () => {
  attempt(roots[0], 'UI-a', 'old');
  event(roots[0], 'UI-a', 'old', { at: START - 1000 });
  event(roots[0], 'UI-b', 'other', {
    at: START - 1000,
    kind: 'guard_denied',
    reason: 'other'
  });
  const fp = createHash('sha256')
    .update('attempt_failed|verify_failed:tests|')
    .digest('hex')
    .slice(0, 12);

  const regular = await collect();
  const carried = await collect([fp]);

  expect(regular.fingerprints).toEqual([]);
  expect(carried.fingerprints).toHaveLength(1);
  expect(carried.fingerprints[0]).toMatchObject({
    fp,
    count: 1,
    first_at: '2026-10-14T23:59:59.000Z'
  });
});

test('deduplicates replayed events and ignores a torn JSONL line', async () => {
  attempt(roots[0], 'UI-a', 'first');
  const recorded = event(roots[0], 'UI-a', 'first');
  fs.appendFileSync(
    beadTimelinePath(roots[0], 'UI-a'),
    `${JSON.stringify(recorded)}\n{"torn":`
  );

  const { fingerprints } = await collect();

  expect(fingerprints[0].count).toBe(1);
});

test('caps samples at three while retaining total counts and full time bounds', async () => {
  attempt(roots[0], 'UI-a', 'first');
  for (let index = 0; index < 5; index += 1) {
    event(roots[0], 'UI-a', 'first', {
      seq: String(index),
      at: START + index * 1000
    });
  }

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    count: 5,
    first_at: SINCE,
    last_at: '2026-10-15T00:00:04.000Z',
    beads: [{ workspace_root: roots[0], bead_id: 'UI-a' }]
  });
  expect(fingerprints[0].samples.map((sample) => sample.at)).toEqual([
    '2026-10-15T00:00:04.000Z',
    '2026-10-15T00:00:03.000Z',
    '2026-10-15T00:00:02.000Z'
  ]);
});

test('marks an environment incident transient after every affected bead succeeds', async () => {
  for (const root of roots) {
    attempt(root, 'UI-a', 'failure', { cause: 'bd_unreachable' });
    event(root, 'UI-a', 'failure');
    attempt(root, 'UI-a', 'success', {
      status: 'done',
      cause: null,
      finished_at: START + 2000
    });
  }

  const { fingerprints } = await collect();

  expect(fingerprints[0].transient).toBe(true);
});

test('keeps an environment incident active when only another affected bead succeeds', async () => {
  for (const root of roots) {
    attempt(root, 'UI-a', 'failure', { cause: 'bd_unreachable' });
    event(root, 'UI-a', 'failure');
  }
  attempt(roots[0], 'UI-a', 'success', {
    status: 'done',
    finished_at: START + 2000
  });

  const { fingerprints } = await collect();

  expect(fingerprints[0].transient).toBe(false);
});

test('requires success after the latest failure of a bead', async () => {
  attempt(roots[0], 'UI-a', 'failure', { cause: 'bd_unreachable' });
  event(roots[0], 'UI-a', 'failure');
  attempt(roots[0], 'UI-a', 'success', {
    status: 'done',
    finished_at: START + 2000
  });
  attempt(roots[0], 'UI-a', 'again', { cause: 'bd_unreachable' });
  event(roots[0], 'UI-a', 'again', { at: START + 3000 });

  const { fingerprints } = await collect();

  expect(fingerprints[0].transient).toBe(false);
});

test('does not treat a later parked or future done attempt as recovery', async () => {
  attempt(roots[0], 'UI-a', 'failure', { cause: 'bd_unreachable' });
  event(roots[0], 'UI-a', 'failure');
  attempt(roots[0], 'UI-a', 'parked', {
    status: 'parked',
    finished_at: START + 2000
  });
  attempt(roots[0], 'UI-a', 'future', {
    status: 'done',
    finished_at: THROUGH + 1
  });

  const { fingerprints } = await collect();

  expect(fingerprints[0].transient).toBe(false);
});

test('reads current attempts without creating or rewriting queue state', async () => {
  event(roots[0], 'UI-a', 'first');
  const record = {
    attempt_id: 'first',
    bead_id: 'UI-a',
    cause: 'bd_unreachable',
    status: 'failed'
  };
  const file = queueFilePath(roots[0]);
  writeJson(file, {
    attempts: { first: record },
    queue: [{ bead_id: 'UI-pending' }]
  });
  const before = fs.readFileSync(file, 'utf8');
  const timeline_before = fs.readFileSync(
    beadTimelinePath(roots[0], 'UI-a'),
    'utf8'
  );

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    cause_head: 'bd_unreachable',
    tier: 'env'
  });
  expect(fs.readFileSync(file, 'utf8')).toBe(before);
  expect(fs.readFileSync(beadTimelinePath(roots[0], 'UI-a'), 'utf8')).toBe(
    timeline_before
  );
  expect(fs.existsSync(queueFilePath(roots[1]))).toBe(false);
  expect(
    mocks.bd.mock.calls.every(
      ([family, args]) =>
        family === 'list' && args[0] === 'list' && args.includes('--all')
    )
  ).toBe(true);
});

test('marks failures of self-improvement beads and recurrence after a cross-workspace fix closes', async () => {
  attempt(roots[0], 'UI-a', 'first');
  event(roots[0], 'UI-a', 'first');
  const fp = createHash('sha256')
    .update('attempt_failed|verify_failed:tests|')
    .digest('hex')
    .slice(0, 12);
  issues.set(roots[0], [
    { id: 'UI-a', metadata: { self_improvement_from: 'triage-1' } }
  ]);
  issues.set(roots[1], [
    {
      id: 'DF-fix',
      status: 'closed',
      closed_at: SINCE,
      metadata: { incident_fp: fp }
    }
  ]);

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    self_origin: true,
    recurred_after_fix: true
  });
});

test('does not call an incident recurrent before its matching fix closes', async () => {
  attempt(roots[0], 'UI-a', 'first');
  event(roots[0], 'UI-a', 'first');
  const fp = createHash('sha256')
    .update('attempt_failed|verify_failed:tests|')
    .digest('hex')
    .slice(0, 12);
  issues.set(roots[1], [
    {
      id: 'DF-later',
      status: 'closed',
      closed_at: START + 2000,
      metadata: { incident_fp: fp }
    },
    {
      id: 'DF-open',
      status: 'open',
      closed_at: SINCE,
      metadata: { incident_fp: fp }
    }
  ]);

  const { fingerprints } = await collect();

  expect(fingerprints[0]).toMatchObject({
    self_origin: false,
    recurred_after_fix: false
  });
});

/**
 * @param {string} query
 */
async function request(query) {
  if (!server) {
    server = createServer(
      createApp({
        host: '127.0.0.1',
        port: 0,
        app_dir: path.resolve('app'),
        root_dir: roots[0],
        frontend_mode: 'live'
      })
    );
    const listening_server = server;
    await new Promise((resolve) =>
      listening_server.listen(0, '127.0.0.1', () => resolve(undefined))
    );
  }
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('missing HTTP address');
  }
  return fetch(`http://127.0.0.1:${address.port}/api/worker/incidents${query}`);
}

test('serves schema version one from the registered HTTP endpoint', async () => {
  event(roots[0], 'UI-a', 'guard', {
    kind: 'guard_denied',
    reason: 'hook_bypass_blocked'
  });

  const response = await request(`?since=${SINCE}`);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(response.headers.get('cache-control')).toBe('no-store');
  expect(body).toMatchObject({
    schema_version: 1,
    since: SINCE,
    fingerprints: [{ kind: 'guard_denied' }]
  });
});

test.each([
  '',
  '?since=garbage',
  '?since=2026-10-15',
  `?since=${SINCE}&since=${SINCE}`,
  `?since=${SINCE}&carry=bad`
])('rejects invalid incident query %s', async (query) => {
  const response = await request(query);

  expect(response.status).toBe(400);
  expect(mocks.bd).not.toHaveBeenCalled();
});

test('returns unavailable instead of a successful incomplete watermark when metadata reads fail', async () => {
  mocks.bd.mockResolvedValueOnce({ ok: false, error: { message: 'offline' } });

  const response = await request(`?since=${SINCE}`);

  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({
    error: 'Worker incident history is unavailable'
  });
});

test.each(['EACCES', 'EIO'])(
  'returns unavailable without a watermark when timeline reads fail with %s',
  async (code) => {
    attempt(roots[0], 'UI-a', 'failure');
    event(roots[0], 'UI-a', 'failure');
    const file = beadTimelinePath(roots[0], 'UI-a');
    const read_file = fs.readFileSync;
    const spy = vi
      .spyOn(fs, 'readFileSync')
      .mockImplementation((target, options) => {
        if (target === file) {
          throw Object.assign(new Error('timeline unavailable'), { code });
        }
        return read_file(target, options);
      });

    const response = await request(`?since=${SINCE}`);
    const body = await response.json();
    spy.mockRestore();
    const recovered = await request(`?since=${SINCE}`);

    expect(response.status).toBe(503);
    expect(body).toEqual({ error: 'Worker incident history is unavailable' });
    expect(recovered.status).toBe(200);
    expect((await recovered.json()).fingerprints).toHaveLength(1);
  }
);

test('treats a missing timeline as an empty history', async () => {
  attempt(roots[0], 'UI-a', 'failure');

  const { fingerprints } = await collect();

  expect(fingerprints).toEqual([]);
});
