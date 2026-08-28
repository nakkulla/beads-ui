import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  attemptRecordPath,
  beadArchivePath,
  beadSessionLogPath,
  beadSessionStderrPath,
  beadStateDir,
  beadTimelinePath,
  beadsRootDir,
  codexAccountHomeDir,
  delegationMonitorDir,
  delegationMonitorRootDir,
  discardBackupDir,
  discardBackupRootDir,
  execPresetsFilePath,
  guardHookDir,
  recordMigrationMarkerPath,
  retentionPolicyPath,
  sessionLogPath,
  usageReceiptInboxDir,
  workspaceSlug,
  workspaceStateDir
} from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';

/** @type {string | undefined} */
let saved_xdg;

beforeEach(() => {
  saved_xdg = process.env.XDG_STATE_HOME;
  process.env.XDG_STATE_HOME = '/state';
});

describe('usageReceiptInboxDir', () => {
  test('derives one deterministic private inbox per attempt', () => {
    expect(usageReceiptInboxDir(WS, 'UI-orfj-1')).toBe(
      path.join(workspaceStateDir(WS), 'usage-receipts', 'UI-orfj-1')
    );
  });
});

describe('delegationMonitorDir', () => {
  test('derives a separate sanitized monitor directory per attempt', () => {
    const root = delegationMonitorRootDir(WS);

    expect(root).toBe(path.join(workspaceStateDir(WS), 'delegation-monitors'));
    expect(delegationMonitorDir(WS, '../escape/UI-1')).toBe(
      path.join(root, '.._escape_UI-1')
    );
  });
});

describe('discardBackupDir', () => {
  test('keeps one sanitized archive outside the repository', () => {
    const root = discardBackupRootDir(WS);

    expect(root).toBe(path.join(workspaceStateDir(WS), 'discard-backups'));
    expect(discardBackupDir(WS, '../discard/UI-1')).toBe(
      path.join(root, '.._discard_UI-1')
    );
  });
});

afterEach(() => {
  if (saved_xdg === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = saved_xdg;
  }
});

describe('guardHookDir', () => {
  test('lives beside the queue file in the per-workspace state dir', () => {
    const dir = guardHookDir(WS, 'UI-8mvc-1');

    expect(dir).toBe(
      path.join('/state', 'bdui', workspaceSlug(WS), 'guard-hooks', 'UI-8mvc-1')
    );
    expect(path.dirname(path.dirname(dir))).toBe(workspaceStateDir(WS));
  });

  test('gives each attempt its own directory', () => {
    expect(guardHookDir(WS, 'UI-8mvc-1')).not.toBe(
      guardHookDir(WS, 'UI-8mvc-2')
    );
  });

  test('sanitizes an attempt id the same way the session log does', () => {
    const dir = guardHookDir(WS, '../escape/UI-1');

    expect(path.basename(dir)).toBe('.._escape_UI-1');
    expect(path.basename(sessionLogPath(WS, '../escape/UI-1'))).toBe(
      '.._escape_UI-1.jsonl'
    );
  });

  test('falls back to the XDG default when the env var is unset', () => {
    delete process.env.XDG_STATE_HOME;

    expect(guardHookDir(WS, 'UI-1')).toBe(
      path.join(
        os.homedir(),
        '.local',
        'state',
        'bdui',
        workspaceSlug(WS),
        'guard-hooks',
        'UI-1'
      )
    );
  });
});

describe('execPresetsFilePath', () => {
  test('derives one server-global file under the bdui state root', () => {
    expect(execPresetsFilePath()).toBe(
      path.join('/state', 'bdui', 'exec-presets.json')
    );
  });
});

describe('codexAccountHomeDir', () => {
  test('encodes the account key as unpadded base64url', () => {
    const key = 'acct/+=';

    const result = codexAccountHomeDir(key);

    expect(result).toBe(
      path.join(
        '/state',
        'bdui',
        'codex-homes',
        Buffer.from(key).toString('base64url')
      )
    );
    expect(path.basename(result)).not.toMatch(/[+/=]/);
  });
});

describe('bead-scoped record paths', () => {
  test('lays the bead record tree out under beads/<bead_id>', () => {
    const dir = beadStateDir(WS, 'UI-8wpb');

    expect(beadsRootDir(WS)).toBe(path.join(workspaceStateDir(WS), 'beads'));
    expect(dir).toBe(path.join(workspaceStateDir(WS), 'beads', 'UI-8wpb'));
  });

  test('places every per-bead record file at its spec location', () => {
    const dir = beadStateDir(WS, 'UI-8wpb');

    expect(beadTimelinePath(WS, 'UI-8wpb')).toBe(
      path.join(dir, 'events.jsonl')
    );
    expect(attemptRecordPath(WS, 'UI-8wpb', 'UI-8wpb-1')).toBe(
      path.join(dir, 'attempts', 'UI-8wpb-1.json')
    );
    expect(beadSessionLogPath(WS, 'UI-8wpb', 'UI-8wpb-1')).toBe(
      path.join(dir, 'sessions', 'UI-8wpb-1.jsonl')
    );
    expect(beadSessionStderrPath(WS, 'UI-8wpb', 'UI-8wpb-1')).toBe(
      path.join(dir, 'sessions', 'UI-8wpb-1.stderr.log')
    );
    expect(beadArchivePath(WS, 'UI-8wpb', 'UI-8wpb-1')).toBe(
      path.join(dir, 'archive', 'UI-8wpb-1.jsonl.gz')
    );
  });

  test('requires an explicit bead id at every bead-scoped call', () => {
    // @ts-expect-error - a bead is never derivable from an attempt id.
    beadTimelinePath(WS);
    // @ts-expect-error - the bead has to be named before the attempt.
    attemptRecordPath(WS, 'UI-8wpb-1');
    // @ts-expect-error - same for the session original.
    beadSessionLogPath(WS, 'UI-8wpb-1');
  });

  test('sanitizes a bead id the same way the attempt-scoped helpers do', () => {
    const dir = beadStateDir(WS, '../escape/UI-1');

    expect(path.basename(dir)).toBe('.._escape_UI-1');
    expect(path.dirname(dir)).toBe(beadsRootDir(WS));
  });

  test('keeps a dot-only bead id inside the beads root', () => {
    expect(beadStateDir(WS, '..')).toBe(path.join(beadsRootDir(WS), 'bead'));
  });

  test('keeps the legacy flat session path for the read-resolution order', () => {
    expect(sessionLogPath(WS, 'UI-8wpb-1')).toBe(
      path.join(workspaceStateDir(WS), 'sessions', 'UI-8wpb-1.jsonl')
    );
  });

  test('keeps the migration marker inside the tree it describes', () => {
    expect(recordMigrationMarkerPath(WS)).toBe(
      path.join(beadsRootDir(WS), '.migrated-v1')
    );
  });

  test('keeps the retention policy in its own workspace file', () => {
    expect(retentionPolicyPath(WS)).toBe(
      path.join(workspaceStateDir(WS), 'retention-policy.json')
    );
  });
});
