import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { locateHermesSession, readHermesSession } from './hermes-session.js';
import { selectReviewSession } from './review-session.js';
import {
  parseSessionRef,
  qualifyInteractiveForkSource,
  qualifySessionFork,
  recordedSessionProvider,
  resolveSessionFile,
  sessionRefViews,
  sessionResumeCommand
} from './session-ref.js';

let root = '';
/** @type {DatabaseSync[]} */
const databases = [];

/** @param {string} [profile] */
function database(profile) {
  const dir = profile ? path.join(root, 'profiles', profile) : root;
  fs.mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, 'state.db'));
  databases.push(db);
  db.exec(`CREATE TABLE sessions (
    id TEXT PRIMARY KEY, source TEXT, parent_session_id TEXT,
    ended_at REAL, end_reason TEXT, model_config TEXT
  );
  CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, role TEXT,
    content TEXT, tool_calls TEXT, tool_call_id TEXT, timestamp REAL,
    active INTEGER DEFAULT 1, compacted INTEGER DEFAULT 0
  );`);
  return db;
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-history-'));
  vi.stubEnv('HERMES_HOME', root);
});

afterEach(() => {
  for (const db of databases.splice(0)) {
    db.close();
  }
  vi.unstubAllEnvs();
  fs.rmSync(root, { recursive: true, force: true });
});

describe('Hermes session discovery', () => {
  test('accepts Hermes as the last contract item', () => {
    const entries = parseSessionRef('claude:old@box; hermes:current@box');

    expect(entries[1]).toEqual({
      index: 1,
      provider: 'hermes',
      session_id: 'current',
      host: 'box'
    });
  });

  test.each([undefined, 'research'])(
    'locates a unique conversation in %s',
    (profile) => {
      if (profile) {
        database();
      }
      const db = database(profile);
      db.exec(
        "INSERT INTO sessions(id, source) VALUES ('chat', 'telegram'); INSERT INTO messages(session_id, role, content, timestamp) VALUES ('chat', 'user', 'hi', 1700)"
      );

      const result = resolveSessionFile(
        { index: 0, provider: 'hermes', session_id: 'chat', host: 'box' },
        { hostname: 'box.local' }
      );

      expect(result).toEqual({
        locality: 'local',
        file: path.join(
          root,
          ...(profile ? ['profiles', profile] : []),
          'state.db'
        ),
        last_event_at: 1700000
      });
    }
  );

  test('uses the default home when HERMES_HOME is absent', () => {
    vi.stubEnv('HERMES_HOME', '');
    root = path.join(root, '.hermes');
    database().exec("INSERT INTO sessions(id, source) VALUES ('chat', 'cli')");

    const result = locateHermesSession('chat', {
      home_dir: path.dirname(root)
    });

    expect(result?.file).toBe(path.join(root, 'state.db'));
  });

  test('refuses an ambiguous id across profiles', () => {
    database().exec("INSERT INTO sessions(id, source) VALUES ('chat', 'cli')");
    database('research').exec(
      "INSERT INTO sessions(id, source) VALUES ('chat', 'telegram')"
    );

    expect(locateHermesSession('chat')).toBeNull();
  });

  test('reports remote for a different host even with a local copy', () => {
    database().exec("INSERT INTO sessions(id, source) VALUES ('chat', 'cli')");

    const result = resolveSessionFile(
      { index: 0, provider: 'hermes', session_id: 'chat', host: 'elsewhere' },
      { hostname: 'box' }
    );

    expect(result).toEqual({
      locality: 'remote',
      file: null,
      last_event_at: null
    });
  });

  test('returns missing on an unreadable schema without creating a database', () => {
    fs.writeFileSync(path.join(root, 'state.db'), 'invalid sqlite');

    expect(locateHermesSession('chat')).toBeNull();
    expect(readHermesSession(path.join(root, 'absent.db'), 'chat')).toBeNull();
    expect(fs.existsSync(path.join(root, 'absent.db'))).toBe(false);
  });

  test('keeps an unknown conversation missing', () => {
    database();

    expect(locateHermesSession('unknown')).toBeNull();
  });
});

describe('Hermes compression history', () => {
  test('follows compression only and retains compacted display history in time order', () => {
    const db = database();
    db.exec(`INSERT INTO sessions(id, source, parent_session_id, ended_at, end_reason) VALUES
      ('root', 'telegram', NULL, 3, 'compression'),
      ('child', 'telegram', 'root', 5, 'session_reset'),
      ('reset', 'telegram', 'child', NULL, NULL),
      ('delegate', 'subagent', 'root', NULL, NULL);
    INSERT INTO messages(session_id, role, content, timestamp, active, compacted) VALUES
      ('child', 'assistant', 'second', 2, 1, 0),
      ('root', 'user', 'first', 1, 0, 1),
      ('root', 'assistant', 'rewound', 1.5, 0, 0),
      ('reset', 'user', 'new conversation', 6, 1, 0),
      ('delegate', 'assistant', 'private branch', 4, 1, 0);`);
    const file = path.join(root, 'state.db');
    const before = fs.readFileSync(file);

    const result = readHermesSession(file, 'root');

    expect(result?.rows.map((row) => row.content)).toEqual(['first', 'second']);
    expect(result).toMatchObject({
      cursor: 2,
      last_event_at: 2000,
      ended: true
    });
    expect(fs.readFileSync(file)).toEqual(before);
  });

  test('reads new compression children beyond the cursor', () => {
    const db = database();
    db.exec(
      "INSERT INTO sessions(id, source) VALUES ('root', 'cli'); INSERT INTO messages(session_id, role, content, timestamp) VALUES ('root', 'user', 'first', 1)"
    );
    const file = path.join(root, 'state.db');
    const first = readHermesSession(file, 'root');
    db.exec(
      "UPDATE sessions SET ended_at = 2, end_reason = 'compression'; INSERT INTO sessions(id, source, parent_session_id) VALUES ('child', 'cli', 'root'); INSERT INTO messages(session_id, role, content, timestamp) VALUES ('child', 'assistant', 'next', 3)"
    );

    const result = readHermesSession(file, 'root', first?.cursor);

    expect(result?.rows.map((row) => row.content)).toEqual(['next']);
    expect(result?.ended).toBe(false);
  });

  test('waits for a compressed parent whose child is not yet published', () => {
    database().exec(
      "INSERT INTO sessions(id, source, parent_session_id, ended_at, end_reason) VALUES ('root', 'cli', NULL, 2, 'compression')"
    );

    expect(readHermesSession(path.join(root, 'state.db'), 'root')?.ended).toBe(
      false
    );
  });

  test('excludes a directly requested subagent conversation', () => {
    database().exec(
      "INSERT INTO sessions(id, source) VALUES ('child', 'subagent')"
    );

    expect(locateHermesSession('child')).toBeNull();
  });

  test.each(['_reset_from', '_branched_from', '_delegate_from'])(
    'excludes a separate %s child of a compressed parent',
    (marker) => {
      const db = database();
      db.exec(`INSERT INTO sessions(id, source, parent_session_id, ended_at, end_reason, model_config) VALUES
        ('root', 'cli', NULL, 1, 'compression', NULL),
        ('continued', 'cli', 'root', 3, 'agent_close', NULL),
        ('separate', 'cli', 'root', NULL, NULL, '{"${marker}":"root"}');
      INSERT INTO messages(session_id, role, content, timestamp) VALUES
        ('continued', 'assistant', 'continued', 2),
        ('separate', 'user', 'separate', 4);`);

      const result = readHermesSession(path.join(root, 'state.db'), 'root');

      expect(result?.rows.map((row) => row.content)).toEqual(['continued']);
      expect(result?.ended).toBe(true);
    }
  );

  test('keeps inherited fork markers within a compression continuation', () => {
    database()
      .exec(`INSERT INTO sessions(id, source, parent_session_id, ended_at, end_reason, model_config) VALUES
      ('root', 'cli', NULL, 1, 'compression', '{"_reset_from":"earlier"}'),
      ('continued', 'cli', 'root', NULL, NULL, '{"_reset_from":"earlier"}'),
      ('tool-child', 'tool', 'root', NULL, NULL, NULL);
    INSERT INTO messages(session_id, role, content, timestamp) VALUES
      ('continued', 'assistant', 'continued', 2),
      ('tool-child', 'assistant', 'private delegate', 3);`);

    const result = readHermesSession(path.join(root, 'state.db'), 'root');

    expect(result?.rows.map((row) => row.content)).toEqual(['continued']);
    expect(result?.ended).toBe(false);
  });
});

describe('Hermes display-only boundary', () => {
  const entry = {
    index: 0,
    provider: /** @type {const} */ ('hermes'),
    session_id: 'chat',
    host: 'box'
  };
  const metadata = { session_ref: 'claude:old@box; hermes:chat@box' };

  test('offers no resume command or recorded runner', () => {
    expect(sessionResumeCommand(entry)).toBeNull();
    expect(recordedSessionProvider(metadata)).toBeNull();
  });

  test('rejects a Hermes fork through the existing fresh fallback', () => {
    expect(qualifySessionFork(metadata, null)).toEqual({
      ok: false,
      reason: 'no_session_ref'
    });
    expect(qualifyInteractiveForkSource({ metadata })).toEqual({
      session_id: null,
      provider: null,
      source: 'fresh',
      fallback_reason: 'no_session_ref'
    });
  });

  test('selects a fresh review without passing Hermes to a runner', () => {
    expect(selectReviewSession(metadata)).toEqual({
      resume_session_id: null,
      resume_runner: null,
      session_source: 'fresh',
      reason: 'no_session_ref'
    });
  });

  test('projects an available Hermes view with no resume command', () => {
    database().exec("INSERT INTO sessions(id, source) VALUES ('chat', 'cli')");

    const views = sessionRefViews(metadata, { hostname: 'box' });

    expect(views[1]).toMatchObject({
      provider: 'hermes',
      current: true,
      locality: 'local',
      resume_command: null
    });
  });
});
