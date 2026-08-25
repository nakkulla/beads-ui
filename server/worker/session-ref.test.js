import { describe, expect, test, vi } from 'vitest';
import {
  CODEX_SCAN_DAYS,
  parseSessionRef,
  resolveSessionFile,
  sessionRefViews
} from './session-ref.js';

const V7_ID = '01a035fc-4659-7220-aa50-e57904d303f3';
const V7_STARTED_AT = 1787612120665;

/**
 * A fake filesystem over a `path → entry names` map for directories and a
 * `path → mtimeMs` map for files.
 *
 * @param {{ dirs?: Record<string, string[]>, files?: Record<string, number> }} input
 */
function fakeFs(input) {
  const dirs = input.dirs || {};
  const files = input.files || {};
  return {
    /** @param {string} dir */
    readdirSync: vi.fn((dir) => {
      const names = dirs[dir];
      if (names === undefined) {
        throw new Error(`ENOENT ${dir}`);
      }
      return names;
    }),
    /** @param {string} file */
    statSync: vi.fn((file) => {
      const mtimeMs = files[file];
      if (mtimeMs === undefined) {
        throw new Error(`ENOENT ${file}`);
      }
      return { mtimeMs };
    })
  };
}

describe('parseSessionRef', () => {
  test('returns one entry per valid item in order', () => {
    const value = `claude:sid-a@boxA; codex:${V7_ID}@boxB`;

    const result = parseSessionRef(value);

    expect(result).toEqual([
      { index: 0, provider: 'claude', session_id: 'sid-a', host: 'boxA' },
      { index: 1, provider: 'codex', session_id: V7_ID, host: 'boxB' }
    ]);
  });

  test('drops only the malformed item and preserves the original index', () => {
    const value = 'claude:a@box; not-a-ref; codex:c@box';

    const result = parseSessionRef(value);

    expect(result.map((entry) => [entry.index, entry.session_id])).toEqual([
      [0, 'a'],
      [2, 'c']
    ]);
  });

  test('returns an empty list for an empty value', () => {
    expect(parseSessionRef('')).toEqual([]);
    expect(parseSessionRef('   ')).toEqual([]);
    expect(parseSessionRef(null)).toEqual([]);
    expect(parseSessionRef(42)).toEqual([]);
  });

  test('rejects an unknown provider and a session id holding a separator', () => {
    const value = 'gemini:a@box; claude:a:b@box; claude:c@box';

    const result = parseSessionRef(value);

    expect(result).toEqual([
      { index: 2, provider: 'claude', session_id: 'c', host: 'box' }
    ]);
  });
});

describe('resolveSessionFile host comparison', () => {
  test('matches the first label when the server hostname has a .local suffix', () => {
    const file_system = fakeFs({
      dirs: { '/home/u/.claude/projects': ['-repo-a'] },
      files: { '/home/u/.claude/projects/-repo-a/sid.jsonl': 1700 }
    });

    const result = resolveSessionFile(
      { index: 0, provider: 'claude', session_id: 'sid', host: 'MacStudio-2' },
      {
        home_dir: '/home/u',
        hostname: 'macstudio-2.local',
        fs: /** @type {any} */ (file_system)
      }
    );

    expect(result).toEqual({
      locality: 'local',
      file: '/home/u/.claude/projects/-repo-a/sid.jsonl',
      last_event_at: 1700
    });
  });

  test('reports remote and touches no filesystem when the host differs', () => {
    const file_system = fakeFs({});

    const result = resolveSessionFile(
      { index: 0, provider: 'claude', session_id: 'sid', host: 'other-box' },
      {
        home_dir: '/home/u',
        hostname: 'macstudio-2.local',
        fs: /** @type {any} */ (file_system)
      }
    );

    expect(result).toEqual({
      locality: 'remote',
      file: null,
      last_event_at: null
    });
    expect(file_system.readdirSync).not.toHaveBeenCalled();
  });
});

describe('resolveSessionFile claude lookup', () => {
  test('finds the session file in a later project directory', () => {
    const file_system = fakeFs({
      dirs: { '/home/u/.claude/projects': ['-repo-a', '-repo-b', '-repo-c'] },
      files: { '/home/u/.claude/projects/-repo-b/sid.jsonl': 900 }
    });

    const result = resolveSessionFile(
      { index: 0, provider: 'claude', session_id: 'sid', host: 'box' },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system)
      }
    );

    expect(result.file).toBe('/home/u/.claude/projects/-repo-b/sid.jsonl');
    expect(result.locality).toBe('local');
  });

  test('reports missing when no project directory holds the file', () => {
    const file_system = fakeFs({
      dirs: { '/home/u/.claude/projects': ['-repo-a'] }
    });

    const result = resolveSessionFile(
      { index: 0, provider: 'claude', session_id: 'sid', host: 'box' },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system)
      }
    );

    expect(result).toEqual({
      locality: 'missing',
      file: null,
      last_event_at: null
    });
  });
});

describe('resolveSessionFile codex lookup', () => {
  test('derives the rollout date directory from a UUIDv7 timestamp', () => {
    const day = new Date(V7_STARTED_AT);
    const dir = `/home/u/.codex/sessions/${String(day.getFullYear()).padStart(4, '0')}/${String(day.getMonth() + 1).padStart(2, '0')}/${String(day.getDate()).padStart(2, '0')}`;
    const name = `rollout-2026-08-25T07-55-20-${V7_ID}.jsonl`;
    const file_system = fakeFs({
      dirs: { [dir]: [name] },
      files: { [`${dir}/${name}`]: 4242 }
    });

    const result = resolveSessionFile(
      { index: 0, provider: 'codex', session_id: V7_ID, host: 'box' },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system),
        // A `now` far from the id proves the DATE came from the id itself.
        now: () => V7_STARTED_AT + 90 * 24 * 60 * 60 * 1000
      }
    );

    expect(result).toEqual({
      locality: 'local',
      file: `${dir}/${name}`,
      last_event_at: 4242
    });
  });

  test('scans back from today for a non-v7 id and caps the scan', () => {
    const now = Date.UTC(2026, 7, 26, 12, 0, 0);
    const file_system = fakeFs({});

    const result = resolveSessionFile(
      { index: 0, provider: 'codex', session_id: 'plain-id', host: 'box' },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system),
        now: () => now
      }
    );

    expect(result.locality).toBe('missing');
    expect(file_system.readdirSync).toHaveBeenCalledTimes(CODEX_SCAN_DAYS);
    expect(CODEX_SCAN_DAYS).toBe(30);
  });

  test('finds a non-v7 id in an older day directory', () => {
    const now = Date.UTC(2026, 7, 26, 12, 0, 0);
    const older = new Date(now - 3 * 24 * 60 * 60 * 1000);
    const dir = `/home/u/.codex/sessions/${String(older.getFullYear()).padStart(4, '0')}/${String(older.getMonth() + 1).padStart(2, '0')}/${String(older.getDate()).padStart(2, '0')}`;
    const name = 'rollout-2026-08-23T01-02-03-plain-id.jsonl';
    const file_system = fakeFs({
      dirs: { [dir]: ['unrelated.txt', name] },
      files: { [`${dir}/${name}`]: 55 }
    });

    const result = resolveSessionFile(
      { index: 0, provider: 'codex', session_id: 'plain-id', host: 'box' },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system),
        now: () => now
      }
    );

    expect(result.file).toBe(`${dir}/${name}`);
  });
});

describe('resolveSessionFile id safety', () => {
  test('reports missing without any lookup for a path-traversing id', () => {
    const file_system = fakeFs({});

    const result = resolveSessionFile(
      {
        index: 0,
        provider: 'claude',
        session_id: '../../etc/passwd',
        host: 'box'
      },
      {
        home_dir: '/home/u',
        hostname: 'box',
        fs: /** @type {any} */ (file_system)
      }
    );

    expect(result).toEqual({
      locality: 'missing',
      file: null,
      last_event_at: null
    });
    expect(file_system.readdirSync).not.toHaveBeenCalled();
  });
});

describe('sessionRefViews', () => {
  /** @type {{ home_dir: string, hostname: string, fs: any }} */
  const remote_options = {
    home_dir: '/home/u',
    hostname: 'box',
    fs: /** @type {any} */ (fakeFs({}))
  };

  test('marks only the last valid item as current', () => {
    const metadata = {
      session_ref: 'claude:a@elsewhere; codex:b@elsewhere; claude:c@elsewhere'
    };

    const result = sessionRefViews(metadata, remote_options);

    expect(result.map((view) => view.current)).toEqual([false, false, true]);
    expect(result.map((view) => view.index)).toEqual([0, 1, 2]);
  });

  test('returns an empty list when the key is absent', () => {
    expect(sessionRefViews({}, remote_options)).toEqual([]);
    expect(sessionRefViews(null, remote_options)).toEqual([]);
  });

  test('keeps last_event_at null for a remote item', () => {
    const result = sessionRefViews(
      { session_ref: 'claude:a@elsewhere' },
      remote_options
    );

    expect(result[0].locality).toBe('remote');
    expect(result[0].last_event_at).toBe(null);
  });

  test('builds a single-quoted resume command per provider', () => {
    const result = sessionRefViews(
      { session_ref: 'claude:sid-1@elsewhere; codex:sid-2@elsewhere' },
      remote_options
    );

    expect(result.map((view) => view.resume_command)).toEqual([
      "claude --resume 'sid-1'",
      "codex resume 'sid-2'"
    ]);
  });

  test('returns null resume_command for shell metacharacters and a leading dash', () => {
    const metadata = {
      session_ref: [
        'claude:$(whoami)@elsewhere',
        'codex:`id`@elsewhere',
        'claude:-rf@elsewhere'
      ].join('; ')
    };

    const result = sessionRefViews(metadata, remote_options);

    expect(result.map((view) => view.session_id)).toEqual([
      '$(whoami)',
      '`id`',
      '-rf'
    ]);
    expect(result.map((view) => view.resume_command)).toEqual([
      null,
      null,
      null
    ]);
  });

  test('reports missing for an unsafe id even on the local host', () => {
    const result = sessionRefViews(
      { session_ref: 'claude:$(whoami)@box' },
      remote_options
    );

    expect(result[0].locality).toBe('missing');
  });
});
