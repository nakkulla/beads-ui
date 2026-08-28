import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { checkHealth } from '../health.js';
import { createBeadTimeline } from './bead-timeline.js';
import {
  DEFAULT_RETENTION_POLICY,
  __resetRecordMigrationPendingForTest,
  createRecordRetention,
  readRetentionPolicy
} from './record-retention.js';
import {
  attemptRecordPath,
  beadArchivePath,
  beadSessionLogPath,
  beadSessionStderrPath,
  beadTimelinePath,
  queueFilePath,
  recordMigrationMarkerPath,
  retentionPolicyPath,
  sessionLogPath
} from './state-paths.js';

const WS = '/tmp/example-workspace/project-retention';
const DAY_MS = 86_400_000;
const NOW = 1_800_000_000_000;

/** @type {string} */
let tmp_state;

/**
 * @param {string} file
 * @param {string} contents
 */
function writeFile(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

/**
 * @param {string} file
 */
function exists(file) {
  return fs.existsSync(file);
}

/**
 * A raw persisted queue with only the collections the transfer predicate reads.
 *
 * @param {Record<string, any>} attempts
 * @param {Record<string, any>} [extra]
 */
function writeQueue(attempts, extra = {}) {
  writeFile(
    queueFilePath(WS),
    JSON.stringify({
      attempts,
      queue: [],
      serial_lanes: [],
      pr_wait: [],
      merge_queue: [],
      completion_intents: {},
      discard_operations: {},
      ...extra
    })
  );
  return JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
}

/**
 * @param {Partial<{ attempt_id: string, bead_id: string, status: string, cause: string, dismissed_at: number, finished_at: number }>} overrides
 */
function attempt(overrides) {
  return {
    attempt_id: 'UI-a-1',
    bead_id: 'UI-a',
    status: 'done',
    started_at: NOW - DAY_MS,
    finished_at: NOW - DAY_MS,
    ...overrides
  };
}

/**
 * @param {{ statuses?: Record<string, string>, now?: number }} [options]
 */
function makeRetention(options = {}) {
  const timeline = createBeadTimeline({ workspace_root: WS });
  const statuses = options.statuses || {};
  const retention = createRecordRetention({
    workspace_root: WS,
    timeline,
    readStatus: async (bead_id) => statuses[bead_id] ?? null,
    now: () => options.now ?? NOW
  });
  return { retention, timeline };
}

/**
 * @param {ReturnType<typeof import('./bead-timeline.js').createBeadTimeline>} bead_timeline
 * @param {string} bead_id
 * @param {number} at
 */
function recordEvent(bead_timeline, bead_id, at) {
  bead_timeline.append({
    bead_id,
    attempt_id: `${bead_id}-1`,
    kind: 'session_ended',
    seq: 'terminal',
    summary: '세션 종료 — 완료',
    at
  });
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-retention-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  __resetRecordMigrationPendingForTest();
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('retention policy', () => {
  test('returns the default horizons when no policy file exists', () => {
    const policy = readRetentionPolicy(WS);

    expect(policy).toEqual({ archive_days: 30, delete_days: 180 });
  });

  test('reads the horizons a workspace declares', () => {
    writeFile(
      retentionPolicyPath(WS),
      JSON.stringify({ archive_days: 7, delete_days: 45 })
    );

    const policy = readRetentionPolicy(WS);

    expect(policy).toEqual({ archive_days: 7, delete_days: 45 });
  });

  test('falls back per value when one horizon is invalid', () => {
    writeFile(
      retentionPolicyPath(WS),
      JSON.stringify({ archive_days: 7, delete_days: -3 })
    );

    const policy = readRetentionPolicy(WS);

    expect(policy).toEqual({
      archive_days: 7,
      delete_days: DEFAULT_RETENTION_POLICY.delete_days
    });
  });

  test('returns the defaults when the policy file is unreadable', () => {
    writeFile(retentionPolicyPath(WS), 'not json at all');

    const policy = readRetentionPolicy(WS);

    expect(policy).toEqual({ archive_days: 30, delete_days: 180 });
  });
});

describe('retention sweep horizons', () => {
  test('archives a closed bead once its last event reaches the archive horizon', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 30 * DAY_MS);
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(1);
    expect(exists(beadArchivePath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
    expect(exists(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'))).toBe(false);
  });

  test('leaves a closed bead alone one millisecond before the archive horizon', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 30 * DAY_MS + 1);
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(0);
    expect(exists(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('archives the stderr sidecar beside the transcript', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 31 * DAY_MS);
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');
    writeFile(beadSessionStderrPath(WS, 'UI-a', 'UI-a-1'), 'spawn noise\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(2);
    expect(exists(beadSessionStderrPath(WS, 'UI-a', 'UI-a-1'))).toBe(false);
  });

  test('deletes the archive once the last event reaches the delete horizon', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 180 * DAY_MS);
    writeFile(beadArchivePath(WS, 'UI-a', 'UI-a-1'), 'gz bytes');

    const result = await retention.sweep();

    expect(result.deleted).toBe(1);
    expect(exists(beadArchivePath(WS, 'UI-a', 'UI-a-1'))).toBe(false);
  });

  test('keeps the archive one millisecond before the delete horizon', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 180 * DAY_MS + 1);
    writeFile(beadArchivePath(WS, 'UI-a', 'UI-a-1'), 'gz bytes');

    const result = await retention.sweep();

    expect(result.deleted).toBe(0);
    expect(exists(beadArchivePath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('never removes the timeline or a transferred attempt record', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 400 * DAY_MS);
    writeFile(
      attemptRecordPath(WS, 'UI-a', 'UI-a-1'),
      '{"attempt_id":"UI-a-1"}'
    );
    writeFile(beadArchivePath(WS, 'UI-a', 'UI-a-1'), 'gz bytes');

    await retention.sweep();

    expect(exists(beadTimelinePath(WS, 'UI-a'))).toBe(true);
    expect(exists(attemptRecordPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });
});

describe('retention sweep across both session locations', () => {
  test('archives a transcript still at the legacy flat path', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 31 * DAY_MS);
    writeFile(
      attemptRecordPath(WS, 'UI-a', 'UI-a-1'),
      '{"attempt_id":"UI-a-1"}'
    );
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(1);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(false);
    expect(exists(beadArchivePath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('finds a flat transcript through the live queue when no record exists', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 31 * DAY_MS);
    writeQueue({ 'UI-a-1': attempt({ status: 'failed', cause: 'x' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(1);
    expect(exists(beadArchivePath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('leaves a running attempt flat transcript untouched', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 31 * DAY_MS);
    writeQueue({ 'UI-a-1': attempt({ status: 'running' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"live"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(0);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(true);
  });

  test('deletes a flat transcript past the delete horizon', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 200 * DAY_MS);
    writeFile(
      attemptRecordPath(WS, 'UI-a', 'UI-a-1'),
      '{"attempt_id":"UI-a-1"}'
    );
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.deleted).toBe(1);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(false);
    expect(exists(attemptRecordPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });
});

describe('retention sweep eligibility', () => {
  test('excludes a bead bd does not report closed', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'in_progress' }
    });
    recordEvent(timeline, 'UI-a', NOW - 90 * DAY_MS);
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result).toEqual({ archived: 0, deleted: 0, closed: 0 });
    expect(exists(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('excludes a bead whose status cannot be read', async () => {
    const timeline = createBeadTimeline({ workspace_root: WS });
    const retention = createRecordRetention({
      workspace_root: WS,
      timeline,
      readStatus: async () => {
        throw new Error('bd unavailable');
      },
      now: () => NOW
    });
    recordEvent(timeline, 'UI-a', NOW - 90 * DAY_MS);
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result.closed).toBe(0);
    expect(exists(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('leaves a running attempt log untouched inside a closed bead', async () => {
    const { retention, timeline } = makeRetention({
      statuses: { 'UI-a': 'closed' }
    });
    recordEvent(timeline, 'UI-a', NOW - 90 * DAY_MS);
    writeQueue({
      'UI-a-2': attempt({ attempt_id: 'UI-a-2', status: 'running' })
    });
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-2'), '{"type":"live"}\n');

    const result = await retention.sweep();

    expect(result.archived).toBe(1);
    expect(exists(beadSessionLogPath(WS, 'UI-a', 'UI-a-2'))).toBe(true);
  });

  test('skips a bead with no timeline event at all', async () => {
    const { retention } = makeRetention({ statuses: { 'UI-a': 'closed' } });
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"init"}\n');

    const result = await retention.sweep();

    expect(result).toEqual({ archived: 0, deleted: 0, closed: 0 });
  });
});

describe('record migration step 1 — attempt records', () => {
  test('writes a record for every transferable attempt', () => {
    const { retention } = makeRetention();
    writeQueue({
      'UI-a-1': attempt({ status: 'done' }),
      'UI-b-1': attempt({
        attempt_id: 'UI-b-1',
        bead_id: 'UI-b',
        status: 'running'
      })
    });

    const result = retention.migrate();

    expect(result.records).toBe(1);
    expect(exists(attemptRecordPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
    expect(exists(attemptRecordPath(WS, 'UI-b', 'UI-b-1'))).toBe(false);
  });

  test('holds a bead whose failure is not dismissed', () => {
    const { retention } = makeRetention();
    writeQueue({
      'UI-a-1': attempt({ status: 'done' }),
      'UI-a-2': attempt({ attempt_id: 'UI-a-2', status: 'failed', cause: 'x' })
    });

    const result = retention.migrate();

    expect(result.records).toBe(0);
    expect(exists(attemptRecordPath(WS, 'UI-a', 'UI-a-1'))).toBe(false);
  });

  test('adopts a record an interrupted pass already wrote', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    writeFile(
      attemptRecordPath(WS, 'UI-a', 'UI-a-1'),
      '{"attempt_id":"UI-a-1","bead_id":"UI-a","status":"done"}'
    );

    const result = retention.migrate();

    expect(result.records).toBe(1);
    expect(
      fs.readFileSync(attemptRecordPath(WS, 'UI-a', 'UI-a-1'), 'utf8')
    ).toBe('{"attempt_id":"UI-a-1","bead_id":"UI-a","status":"done"}');
  });
});

describe('record migration step 2 — session logs', () => {
  test('renames a flat session log into the bead directory', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');

    const result = retention.migrate();

    expect(result.moved).toBe(1);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(false);
    expect(
      fs.readFileSync(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), 'utf8')
    ).toBe('{"type":"init"}\n');
  });

  test('renames the flat stderr sidecar with the transcript', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');
    writeFile(
      sessionLogPath(WS, 'UI-a-1').replace(/\.jsonl$/, '.stderr.log'),
      'noise\n'
    );

    const result = retention.migrate();

    expect(result.moved).toBe(2);
    expect(exists(beadSessionStderrPath(WS, 'UI-a', 'UI-a-1'))).toBe(true);
  });

  test('never moves a running attempt log', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'running' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"live"}\n');

    const result = retention.migrate();

    expect(result.moved).toBe(0);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(true);
  });

  test('skips a move whose destination already exists', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"stale"}\n');
    writeFile(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), '{"type":"kept"}\n');

    const result = retention.migrate();

    expect(result.moved).toBe(0);
    expect(
      fs.readFileSync(beadSessionLogPath(WS, 'UI-a', 'UI-a-1'), 'utf8')
    ).toBe('{"type":"kept"}\n');
  });
});

describe('record migration step 3 — failure back-fill', () => {
  test('back-fills one attempt_failed event per past failure', () => {
    const { retention, timeline } = makeRetention();
    writeQueue({
      'UI-a-1': attempt({
        attempt_id: 'UI-a-1',
        status: 'failed',
        cause: 'session_failed',
        dismissed_at: NOW - DAY_MS
      })
    });

    const result = retention.migrate();

    expect(result.events).toBe(1);
    expect(timeline.readTimeline('UI-a')).toMatchObject([
      {
        event_id: 'attempt_failed:UI-a-1:terminal',
        kind: 'attempt_failed',
        summary: '세션 실패 — session_failed'
      }
    ]);
  });

  test('re-running the back-fill leaves one event per failure', () => {
    const first = makeRetention();
    writeQueue({
      'UI-a-1': attempt({
        status: 'failed',
        cause: 'session_failed',
        dismissed_at: NOW - DAY_MS
      })
    });
    first.retention.migrate();
    fs.rmSync(recordMigrationMarkerPath(WS));

    const second = makeRetention();
    second.retention.migrate();

    expect(second.timeline.readTimeline('UI-a')).toHaveLength(1);
  });
});

describe('record migration step 4 — reduced queue', () => {
  test('removes only the attempts whose record was written', () => {
    const { retention } = makeRetention();
    writeQueue({
      'UI-a-1': attempt({ status: 'done' }),
      'UI-b-1': attempt({
        attempt_id: 'UI-b-1',
        bead_id: 'UI-b',
        status: 'running'
      })
    });

    retention.migrate();

    const reduced = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(Object.keys(reduced.attempts)).toEqual(['UI-b-1']);
  });

  test('preserves every other queue collection verbatim', () => {
    const { retention } = makeRetention();
    const before = writeQueue(
      { 'UI-a-1': attempt({ status: 'done' }) },
      { auto_advance: true, pr_wait: [{ bead_id: 'UI-z' }] }
    );

    retention.migrate();

    const reduced = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(reduced.auto_advance).toBe(true);
    expect(reduced.pr_wait).toEqual(before.pr_wait);
  });

  test('re-running after a reduced queue changes nothing', () => {
    const first = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    first.retention.migrate();
    fs.rmSync(recordMigrationMarkerPath(WS));
    const reduced_before = fs.readFileSync(queueFilePath(WS), 'utf8');

    const result = makeRetention().retention.migrate();

    expect(result.ok).toBe(true);
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(reduced_before);
  });
});

describe('record migration step 5 — marker', () => {
  test('stamps the marker after a converting pass', () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });

    const result = retention.migrate();

    expect(result).toMatchObject({ ok: true, skipped: false });
    expect(exists(recordMigrationMarkerPath(WS))).toBe(true);
  });

  test('short-circuits to a no-op when the marker exists', () => {
    writeFile(recordMigrationMarkerPath(WS), '{"version":1}');
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });
    writeFile(sessionLogPath(WS, 'UI-a-1'), '{"type":"init"}\n');

    const result = makeRetention().retention.migrate();

    expect(result).toEqual({
      ok: true,
      skipped: true,
      records: 0,
      moved: 0,
      events: 0
    });
    expect(exists(attemptRecordPath(WS, 'UI-a', 'UI-a-1'))).toBe(false);
    expect(exists(sessionLogPath(WS, 'UI-a-1'))).toBe(true);
  });

  test('stamps a workspace that has no queue file yet', () => {
    const result = makeRetention().retention.migrate();

    expect(result).toMatchObject({ ok: true, skipped: false, records: 0 });
    expect(exists(recordMigrationMarkerPath(WS))).toBe(true);
  });
});

describe('record migration health gate', () => {
  /**
   * @param {string} root_dir
   */
  function health(root_dir) {
    return checkHealth({
      root_dir,
      bd_probe: () => true,
      db_probe: () => true,
      bd_capability_probe: async () => ({ ok: true, diagnostics: {} }),
      worker_status: () => /** @type {any} */ ({}),
      runtime_identity: () => null
    });
  }

  test('reports not-ready while a record migration is outstanding', async () => {
    makeRetention();

    const result = await health(WS);

    expect(result.checks.records).toBe(false);
    expect(result.ok).toBe(false);
  });

  test('reports ready once the migration finishes', async () => {
    const { retention } = makeRetention();
    writeQueue({ 'UI-a-1': attempt({ status: 'done' }) });

    retention.migrate();
    const result = await health(WS);

    expect(result.checks.records).toBe(true);
    expect(result.ok).toBe(true);
  });

  test('reports ready for a server with no attached workspace', async () => {
    const result = await health(WS);

    expect(result.checks.records).toBe(true);
  });
});
