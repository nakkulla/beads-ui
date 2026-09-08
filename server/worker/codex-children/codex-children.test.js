import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { normalizeDelegationSessions } from '../delegation-monitor.js';
import { makeAttempt } from '../queue-store.js';
import { accumulateCodexChildren } from './accumulate.js';
import { normalizeCodexChildren } from './normalize.js';
import { observeCodexChildren, readCodexChildRecords } from './reader.js';
import { normalizeCodexChildUsage, parseRolloutText } from './rollout.js';

const FIXTURES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '__fixtures__'
);
const ROOT_ID = '01a07fdf-ee94-7ac3-8e6f-bc0910eee0af';
const CHILD_ID = '01a07fe0-1e96-7443-b224-30d21a82419a';
/** Second `session_meta` line of the concatenated fixture (notes §fixture). */
const CHILD_BOUNDARY = 33;
const ATTEMPT_STARTED_AT = Date.parse('2026-09-08T07:16:00Z');

/**
 * The two halves of the concatenated rollout fixture, as separate files.
 *
 * @returns {{ root: any[], child: any[] }}
 */
function fixtureHalves() {
  const parsed = parseRolloutText(
    fs.readFileSync(
      path.join(FIXTURES, 'codex-native-child-rollout.jsonl'),
      'utf8'
    )
  );

  return {
    root: parsed.slice(0, CHILD_BOUNDARY).map((entry) => entry.record),
    child: parsed.slice(CHILD_BOUNDARY).map((entry) => entry.record)
  };
}

/**
 * @param {string} thread_id
 * @param {any[]} records
 * @returns {Array<{ thread_id: string, ordinal: number, record: any }>}
 */
function tagged(thread_id, records) {
  return records.map((record, ordinal) => ({ thread_id, ordinal, record }));
}

/**
 * A deep copy so a variant edit cannot leak into the next test.
 *
 * @param {any} value
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Re-thread one child transcript under a new identity.
 *
 * @param {any[]} records
 * @param {{ thread_id: string, parent_thread_id: string, agent_path?: string, depth?: number, shift_ms?: number }} identity
 */
function rethread(records, identity) {
  const copy = clone(records);
  const meta = copy.find(
    (/** @type {any} */ record) => record.type === 'session_meta'
  );
  meta.payload.id = identity.thread_id;
  meta.payload.parent_thread_id = identity.parent_thread_id;
  meta.payload.source.subagent.thread_spawn.parent_thread_id =
    identity.parent_thread_id;
  if (identity.agent_path) {
    meta.payload.agent_path = identity.agent_path;
    meta.payload.source.subagent.thread_spawn.agent_path = identity.agent_path;
  }
  if (typeof identity.depth === 'number') {
    meta.payload.source.subagent.thread_spawn.depth = identity.depth;
  }
  if (typeof identity.shift_ms === 'number') {
    for (const record of copy) {
      const at = Date.parse(record.timestamp);
      if (Number.isFinite(at)) {
        record.timestamp = new Date(at + identity.shift_ms).toISOString();
      }
    }
  }
  return copy;
}

/**
 * @param {any[]} records
 * @param {{ parent_terminated?: boolean, attempt_started_at?: number|null, attempt_ended_at?: number|null }} [options]
 */
function accumulate(records, options = {}) {
  return accumulateCodexChildren({
    root_thread_id: ROOT_ID,
    records,
    attempt_started_at: ATTEMPT_STARTED_AT,
    ...options
  });
}

describe('codex-children rollout grammar (UI-mn5u §6.1)', () => {
  test('finds no child thread id anywhere in the exec JSONL', () => {
    const text = fs.readFileSync(
      path.join(FIXTURES, 'codex-native-child.jsonl'),
      'utf8'
    );

    const parsed = text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line));

    expect(text.includes(CHILD_ID)).toBe(false);
    expect(
      parsed.some(
        (/** @type {any} */ event) =>
          (event.item?.receiver_thread_ids || []).length > 0
      )
    ).toBe(false);
  });

  test('reads the measured child row off the rollout halves', () => {
    const { root, child } = fixtureHalves();

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, child)
    ]);

    expect(rows).toEqual([
      {
        thread_id: CHILD_ID,
        parent_thread_id: ROOT_ID,
        launch_id: 'call_zQrh960DQ1iub7GdKSyWan48',
        agent_path: '/root/create_child_note',
        model: 'gpt-5.6-terra',
        effort: 'low',
        status: 'done',
        started_at: 1788851789000,
        completed_at: 1788851826000,
        last_event_at: 1788851826165,
        usage: {
          input_tokens: 113441,
          cached_input_tokens: 87040,
          cache_write_input_tokens: 0,
          output_tokens: 902,
          reasoning_output_tokens: 276,
          total_tokens: 114343
        }
      }
    ]);
  });

  test('rejects usage keys the rollout never declared', () => {
    const usage = normalizeCodexChildUsage({
      input_tokens: 5,
      total_tokens: 9,
      web_search_requests: 3,
      output_tokens: -1,
      cached_input_tokens: 1.5
    });

    expect(usage).toEqual({ input_tokens: 5, total_tokens: 9 });
  });
});

describe('codex-children lifecycle (UI-mn5u §6.2)', () => {
  test('keeps one row per thread for two children', () => {
    const { root, child } = fixtureHalves();
    const second = rethread(child, {
      thread_id: '01a07fe0-2222-7443-b224-30d21a82419a',
      parent_thread_id: ROOT_ID,
      agent_path: '/root/second_note'
    });

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, child),
      ...tagged('01a07fe0-2222-7443-b224-30d21a82419a', second)
    ]);

    expect(rows.map((row) => row.thread_id)).toEqual([
      CHILD_ID,
      '01a07fe0-2222-7443-b224-30d21a82419a'
    ]);
  });

  test('accepts a nested child through its parent chain', () => {
    const { root, child } = fixtureHalves();
    const grandchild = rethread(child, {
      thread_id: '01a07fe0-3333-7443-b224-30d21a82419a',
      parent_thread_id: CHILD_ID,
      agent_path: '/root/create_child_note/deep',
      depth: 2
    });

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, child),
      ...tagged('01a07fe0-3333-7443-b224-30d21a82419a', grandchild)
    ]);

    expect(rows.map((row) => row.parent_thread_id)).toEqual([
      ROOT_ID,
      CHILD_ID
    ]);
  });

  test('creates no extra row for repeated wait and send records', () => {
    const { root, child } = fixtureHalves();
    const wait = root.filter(
      (/** @type {any} */ record) => record.payload?.name === 'wait_agent'
    );
    const repeated = [...root, ...clone(wait), ...clone(wait)];

    const rows = accumulate([
      ...tagged(ROOT_ID, repeated),
      ...tagged(CHILD_ID, child)
    ]);

    expect(rows).toHaveLength(1);
  });

  test('keeps the terminal status when an older event arrives after it', () => {
    const { root, child } = fixtureHalves();
    const stale_activity = clone(
      child.find(
        (/** @type {any} */ record) => record.payload?.type === 'token_count'
      )
    );

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, [...child, stale_activity])
    ]);

    expect(rows[0].status).toBe('done');
    expect(rows[0].usage?.total_tokens).toBe(114343);
  });

  test('marks a child with no terminal evidence interrupted when the parent ends', () => {
    const { root, child } = fixtureHalves();
    const unfinished = child.filter(
      (/** @type {any} */ record) => record.payload?.type !== 'task_complete'
    );

    const rows = accumulate(
      [...tagged(ROOT_ID, root), ...tagged(CHILD_ID, unfinished)],
      { parent_terminated: true }
    );

    expect(rows[0].status).toBe('interrupted');
    expect(rows[0].completed_at).toBeNull();
  });

  test('leaves a running child running while the parent still runs', () => {
    const { root, child } = fixtureHalves();
    const unfinished = child.filter(
      (/** @type {any} */ record) => record.payload?.type !== 'task_complete'
    );

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, unfinished)
    ]);

    expect(rows[0].status).toBe('running');
  });

  test('does not treat the spawn tool call completion as child completion', () => {
    const { root, child } = fixtureHalves();
    const spawn_only = child.filter(
      (/** @type {any} */ record) =>
        record.type === 'session_meta' ||
        record.payload?.type === 'task_started'
    );

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, spawn_only)
    ]);

    expect(rows[0].status).toBe('running');
    expect(rows[0].completed_at).toBeNull();
  });

  test('binds only the current attempt activity of a reused child', () => {
    const { root, child } = fixtureHalves();
    const earlier = rethread(child, {
      thread_id: CHILD_ID,
      parent_thread_id: ROOT_ID,
      shift_ms: -3 * 60 * 60 * 1000
    });

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, [...earlier, ...child])
    ]);

    expect(rows).toHaveLength(1);
    expect(rows[0].started_at).toBe(1788851789000);
  });

  test('excludes a child whose chain never reaches this root', () => {
    const { root, child } = fixtureHalves();
    const stranger = rethread(child, {
      thread_id: '01a07fe0-4444-7443-b224-30d21a82419a',
      parent_thread_id: '01a07fdf-0000-7ac3-8e6f-bc0910eee0af'
    });

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged('01a07fe0-4444-7443-b224-30d21a82419a', stranger)
    ]);

    expect(rows).toEqual([]);
  });
});

describe('codex-children usage (UI-mn5u §6.4)', () => {
  test('replaces the cumulative total instead of summing turns', () => {
    const { root, child } = fixtureHalves();
    const totals = child
      .filter(
        (/** @type {any} */ record) => record.type === 'token_usage_record'
      )
      .map(
        (/** @type {any} */ record) =>
          record.payload.thread_token_usage.total_tokens
      );

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, child)
    ]);

    expect(totals.length).toBeGreaterThan(1);
    expect(rows[0].usage?.total_tokens).toBe(totals[totals.length - 1]);
  });

  test('keeps usage null when the child reported none', () => {
    const { root, child } = fixtureHalves();
    const without_usage = child.filter(
      (/** @type {any} */ record) =>
        record.type !== 'token_usage_record' &&
        record.payload?.type !== 'token_count'
    );

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, without_usage)
    ]);

    expect(rows[0].usage).toBeNull();
  });

  test('keeps cache and reasoning figures as reported subsets', () => {
    const { root, child } = fixtureHalves();

    const rows = accumulate([
      ...tagged(ROOT_ID, root),
      ...tagged(CHILD_ID, child)
    ]);

    const usage = /** @type {any} */ (rows[0].usage);
    expect(usage.input_tokens + usage.output_tokens - usage.total_tokens).toBe(
      0
    );
    expect(usage.cached_input_tokens).toBeLessThan(usage.input_tokens);
  });
});

describe('codex-children stored field (UI-mn5u §6.3)', () => {
  test('reads an attempt without the field as an empty observation', () => {
    const attempt = makeAttempt({ attempt_id: 'a-1', bead_id: 'UI-1' });

    expect(attempt.codex_children).toEqual([]);
  });

  test('preserves a valid stored row through attempt normalization', () => {
    const attempt = makeAttempt({
      attempt_id: 'a-1',
      bead_id: 'UI-1',
      codex_children: [
        {
          thread_id: CHILD_ID,
          parent_thread_id: ROOT_ID,
          launch_id: 'call_1',
          agent_path: '/root/x',
          model: 'gpt-5.6-terra',
          effort: 'low',
          status: 'done',
          started_at: 5,
          completed_at: 6,
          last_event_at: 7,
          usage: { total_tokens: 9 }
        }
      ]
    });

    expect(attempt.codex_children[0].usage).toEqual({ total_tokens: 9 });
  });

  test('drops a stored row with an unexplained shape', () => {
    const rows = normalizeCodexChildren([
      { thread_id: CHILD_ID, parent_thread_id: ROOT_ID, status: 'launched' },
      { parent_thread_id: ROOT_ID, status: 'done' },
      'not a row',
      { thread_id: CHILD_ID, parent_thread_id: ROOT_ID, status: 'done' },
      { thread_id: CHILD_ID, parent_thread_id: ROOT_ID, status: 'running' }
    ]);

    expect(rows).toEqual([
      {
        thread_id: CHILD_ID,
        parent_thread_id: ROOT_ID,
        launch_id: null,
        agent_path: null,
        model: null,
        effort: null,
        status: 'done',
        started_at: null,
        completed_at: null,
        last_event_at: null,
        usage: null
      }
    ]);
  });

  test('keeps the external delegation validator strict about a native row', () => {
    const sessions = normalizeDelegationSessions([
      {
        thread_id: CHILD_ID,
        parent_thread_id: ROOT_ID,
        status: 'done',
        provider: 'codex',
        role: 'subagent'
      }
    ]);

    expect(sessions).toEqual([]);
  });
});

describe('codex-children reader (UI-mn5u §6.1)', () => {
  /**
   * A fake sessions tree holding the fixture's two halves as separate files,
   * exactly as codex writes them.
   *
   * @param {{ extra?: Record<string, { text: string, mtime: number }> }} [options]
   */
  function fakeSessions(options = {}) {
    const { root, child } = fixtureHalves();
    const dir = '/sessions/2026/09/08';
    /** @type {Record<string, { text: string, mtime: number }>} */
    const files = {
      [`${dir}/rollout-2026-09-08T07-16-17-${ROOT_ID}.jsonl`]: {
        text: root.map((record) => JSON.stringify(record)).join('\n'),
        mtime: ATTEMPT_STARTED_AT
      },
      [`${dir}/rollout-2026-09-08T07-16-29-${CHILD_ID}.jsonl`]: {
        text: child.map((record) => JSON.stringify(record)).join('\n'),
        mtime: ATTEMPT_STARTED_AT + 60_000
      },
      ...(options.extra || {})
    };
    return {
      files,
      fs: {
        /** @param {string} target */
        readdirSync(target) {
          const names = Object.keys(files)
            .filter((file) => path.dirname(file) === target)
            .map((file) => path.basename(file));
          if (names.length === 0) {
            throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
          }
          return names;
        },
        /** @param {string} file */
        readFileSync(file) {
          if (!files[file]) {
            throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
          }
          return files[file].text;
        },
        /** @param {string} file */
        statSync(file) {
          if (!files[file]) {
            throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
          }
          return { mtimeMs: files[file].mtime };
        }
      }
    };
  }

  /** @type {{ runner: string, session_id: string, started_at: number }} */
  const ATTEMPT = {
    runner: 'codex',
    session_id: ROOT_ID,
    started_at: ATTEMPT_STARTED_AT
  };

  test('collects the child file that names this root as its parent', () => {
    const sessions = fakeSessions();

    const rows = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(rows.map((row) => row.thread_id)).toEqual([CHILD_ID]);
  });

  test('excludes an unrelated transcript in the same directory', () => {
    const { child } = fixtureHalves();
    const stranger = rethread(child, {
      thread_id: '01a07fe0-5555-7443-b224-30d21a82419a',
      parent_thread_id: '01a07fdf-9999-7ac3-8e6f-bc0910eee0af'
    });
    const sessions = fakeSessions({
      extra: {
        '/sessions/2026/09/08/rollout-2026-09-08T07-16-40-01a07fe0-5555-7443-b224-30d21a82419a.jsonl':
          {
            text: stranger
              .map((/** @type {any} */ r) => JSON.stringify(r))
              .join('\n'),
            mtime: ATTEMPT_STARTED_AT + 90_000
          }
      }
    });

    const rows = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(rows.map((row) => row.thread_id)).toEqual([CHILD_ID]);
  });

  test('excludes a child file written before this attempt started', () => {
    const sessions = fakeSessions();
    const child_file = Object.keys(sessions.files).find((file) =>
      file.includes(CHILD_ID)
    );
    sessions.files[/** @type {string} */ (child_file)].mtime =
      ATTEMPT_STARTED_AT - 3 * 60 * 60 * 1000;

    const rows = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(rows).toEqual([]);
  });

  test('drops a corrupted rollout line without losing the file', () => {
    const sessions = fakeSessions();
    const child_file = /** @type {string} */ (
      Object.keys(sessions.files).find((file) => file.includes(CHILD_ID))
    );
    sessions.files[child_file].text =
      `${sessions.files[child_file].text}\n{"type":`;

    const rows = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(rows[0].status).toBe('done');
  });

  test('observes nothing for an attempt that is not a codex attempt', () => {
    const sessions = fakeSessions();

    const rows = observeCodexChildren({
      attempt: { ...ATTEMPT, runner: 'claude' },
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(rows).toEqual([]);
  });

  test('returns the same rows on a repeated read as on the first', () => {
    const sessions = fakeSessions();

    const live = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });
    const replayed = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(replayed).toEqual(live);
  });

  test('reads the same rows the raw records accumulate to', () => {
    const sessions = fakeSessions();

    const { records } = readCodexChildRecords({
      root_thread_id: ROOT_ID,
      sessions_root: '/sessions',
      started_at: ATTEMPT_STARTED_AT,
      fs: /** @type {any} */ (sessions.fs)
    });

    expect(
      accumulateCodexChildren({
        root_thread_id: ROOT_ID,
        records,
        attempt_started_at: ATTEMPT_STARTED_AT
      })
    ).toEqual(
      observeCodexChildren({
        attempt: ATTEMPT,
        sessions_root: '/sessions',
        fs: /** @type {any} */ (sessions.fs)
      })
    );
  });

  test('observes nothing when no rollout file can be read', () => {
    const rows = observeCodexChildren({
      attempt: ATTEMPT,
      sessions_root: '/sessions',
      fs: /** @type {any} */ ({
        readdirSync() {
          throw new Error('EACCES');
        },
        readFileSync() {
          throw new Error('EACCES');
        },
        statSync() {
          throw new Error('EACCES');
        }
      })
    });

    expect(rows).toEqual([]);
  });
});
