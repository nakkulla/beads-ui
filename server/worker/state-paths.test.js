import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  codexAccountHomeDir,
  delegationMonitorDir,
  delegationMonitorRootDir,
  discardBackupDir,
  discardBackupRootDir,
  execPresetsFilePath,
  guardHookDir,
  parallelAnalysisRunDir,
  parallelAnalysisRunsPath,
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

describe('parallelAnalysisRunsPath', () => {
  test('derives the history file and prompt directory in workspace state', () => {
    expect(parallelAnalysisRunsPath(WS)).toBe(
      path.join(workspaceStateDir(WS), 'parallel-analysis-runs.json')
    );
    expect(parallelAnalysisRunDir(WS)).toBe(
      path.join(workspaceStateDir(WS), 'analysis-runs')
    );
  });
});
