import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import {
  archiveDiscardSource,
  createRecoveryArchive
} from './recovery-archive.js';
import { discardBackupDir } from './state-paths.js';

/** @type {string} */
let tmp;
/** @type {string} */
let repo;
/** @type {string} */
let workspace;

/**
 * @param {string[]} args
 * @param {string} [cwd]
 */
function git(args, cwd = repo) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

/**
 * @param {string} file
 * @param {string|Buffer} contents
 */
function write(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-archive-'));
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');
  workspace = path.join(tmp, 'workspace');
  repo = path.join(tmp, 'repo');
  fs.mkdirSync(repo, { recursive: true });
  git(['init']);
  git(['config', 'user.email', 'test@example.com']);
  git(['config', 'user.name', 'Test']);
  write(path.join(repo, 'tracked.txt'), 'base\n');
  write(path.join(repo, 'binary.bin'), Buffer.from([0, 1, 2, 3]));
  git(['add', '.']);
  git(['commit', '-m', 'base']);
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * @param {string} operation_id
 */
function input(operation_id) {
  return {
    workspace,
    operation_id,
    repo,
    worktree: repo,
    target_base: git(['rev-parse', 'HEAD~1']),
    source_head: git(['rev-parse', 'HEAD']),
    source_snapshot: {
      repo,
      worktree: repo,
      branch: 'UI-1',
      target_base: 'main'
    },
    session_log_path: path.join(tmp, 'session.jsonl')
  };
}

describe('worker recovery archive real-git integration', () => {
  test('archives commits patches binary files symlinks and session evidence', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    write(path.join(repo, 'binary.bin'), Buffer.from([0, 9, 8, 7]));
    git(['add', 'binary.bin']);
    write(path.join(repo, 'binary.bin'), Buffer.from([0, 6, 5, 4]));
    write(path.join(repo, 'tracked.txt'), 'modified\n');
    write(path.join(repo, 'untracked/nested.txt'), 'new\n');
    fs.symlinkSync('../tracked.txt', path.join(repo, 'untracked/link'));
    write(path.join(tmp, 'session.jsonl'), '{"type":"result"}\n');
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-1'));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(archive.verify(result.receipt.path)).toEqual({
      ok: true,
      receipt: result.receipt
    });
    expect(
      fs.existsSync(path.join(result.receipt.path, 'commits.bundle'))
    ).toBe(true);
    expect(
      fs.readFileSync(path.join(result.receipt.path, 'index.patch'))
    ).not.toHaveLength(0);
    expect(
      fs.readFileSync(path.join(result.receipt.path, 'worktree.patch'))
    ).not.toHaveLength(0);
    expect(
      fs.readFileSync(path.join(result.receipt.path, 'files/binary.bin'))
    ).toEqual(Buffer.from([0, 6, 5, 4]));
    expect(
      fs.readlinkSync(path.join(result.receipt.path, 'files/untracked/link'))
    ).toBe('../tracked.txt');
    expect(
      fs.readFileSync(path.join(result.receipt.path, 'session.jsonl'), 'utf8')
    ).toContain('result');
    const manifest = JSON.parse(
      fs.readFileSync(path.join(result.receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest.excluded).toContain('git-ignored');
    expect(
      manifest.files.map((/** @type {any} */ entry) => entry.path)
    ).toEqual(
      expect.arrayContaining([
        'binary.bin',
        'tracked.txt',
        'untracked/nested.txt',
        'untracked/link'
      ])
    );
  });

  test('reuses an already verified final archive', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    const archive = createRecoveryArchive({ now: () => 5000 });
    const archive_input = input('discard-reuse');

    const first = archive.create(archive_input);
    const second = archive.create(archive_input);

    expect(first.ok).toBe(true);
    expect(second).toMatchObject({ ok: true, reused: true });
  });

  test('rejects a corrupted completed archive', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    const archive = createRecoveryArchive({ now: () => 5000 });
    const created = archive.create(input('discard-corrupt'));
    if (!created.ok) {
      throw new Error(created.reason);
    }
    fs.appendFileSync(path.join(created.receipt.path, 'manifest.json'), '\n');

    expect(archive.verify(created.receipt.path)).toEqual({
      ok: false,
      reason: 'manifest_checksum_mismatch'
    });
  });

  test('replaces a partial temp archive instead of treating it as complete', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    const final_path = discardBackupDir(workspace, 'discard-partial');
    const temp_path = `${final_path}.tmp`;
    fs.mkdirSync(temp_path, { recursive: true });
    write(path.join(temp_path, 'manifest.json'), '{}');
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-partial'));

    expect(result.ok).toBe(true);
    expect(fs.existsSync(path.join(final_path, 'COMPLETE'))).toBe(true);
  });

  test('fails closed on a dirty submodule', () => {
    const child = path.join(tmp, 'child');
    fs.mkdirSync(child);
    git(['init'], child);
    git(['config', 'user.email', 'test@example.com'], child);
    git(['config', 'user.name', 'Test'], child);
    write(path.join(child, 'child.txt'), 'base\n');
    git(['add', '.'], child);
    git(['commit', '-m', 'child'], child);
    git(
      [
        '-c',
        'protocol.file.allow=always',
        'submodule',
        'add',
        child,
        'vendor/child'
      ],
      repo
    );
    git(['commit', '-am', 'submodule']);
    write(path.join(repo, 'vendor/child/child.txt'), 'dirty\n');
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-submodule'));

    expect(result).toMatchObject({ ok: false, reason: 'dirty_submodule' });
  });

  test('fails closed on an untracked special file', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    execFileSync('mkfifo', [path.join(repo, 'named-pipe')]);
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-special'));

    expect(result).toMatchObject({
      ok: false,
      reason: 'unsupported_file_type'
    });
  });

  test('never publishes a success receipt when the atomic marker write fails', () => {
    write(path.join(repo, 'committed.txt'), 'ahead\n');
    git(['add', 'committed.txt']);
    git(['commit', '-m', 'ahead']);
    const failing_fs = {
      ...fs,
      writeFileSync(/** @type {any} */ file, /** @type {any} */ contents) {
        if (String(file).endsWith(`${path.sep}COMPLETE`)) {
          throw new Error('disk full');
        }
        return fs.writeFileSync(file, contents);
      }
    };
    const archive = createRecoveryArchive({ fs: failing_fs, now: () => 5000 });

    const result = archive.create(input('discard-write-failure'));

    expect(result).toMatchObject({
      ok: false,
      reason: 'archive_create_failed'
    });
    expect(
      fs.existsSync(discardBackupDir(workspace, 'discard-write-failure'))
    ).toBe(false);
  });
});

describe('worker recovery archive quiesce seam', () => {
  test('persists a verified receipt only after owned group stop and topology lock', async () => {
    const store = createQueueStore({ now: () => 100 });
    store.createDiscardOperation(workspace, {
      expected_revision: 0,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo },
        process_identity: { pid: 4242, pgid: 4242, started_at: 1000 }
      }
    });
    /** @type {string[]} */
    const order = [];
    const processController = {
      probe: vi.fn(() => ({ state: 'owned' })),
      signal: vi.fn(() => {
        order.push('stop');
        return { ok: true, state: 'owned' };
      })
    };
    const withTopologyLock = vi.fn(async (work) => {
      order.push('lock');
      return work();
    });

    const result = await archiveDiscardSource({
      workspace,
      operation: store.snapshot(workspace).discard_operations['discard-1'],
      store,
      processController,
      withTopologyLock,
      createArchive: () => {
        order.push('archive');
        return {
          ok: true,
          receipt: {
            path: '/state/archive',
            manifest_sha256: 'a'.repeat(64),
            verified_at: 200
          }
        };
      }
    });

    expect(result.ok).toBe(true);
    expect(order).toEqual(['stop', 'lock', 'archive']);
    expect(
      store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      phase: 'backup_verified',
      backup: { path: '/state/archive' }
    });
    expect(processController.signal).toHaveBeenCalledWith(
      { pid: 4242, pgid: 4242, started_at: 1000 },
      'SIGSTOP'
    );
  });

  test('does not signal or archive an unknown process identity', async () => {
    const processController = {
      probe: vi.fn(() => ({ state: 'unknown', reason: 'ps_failed' })),
      signal: vi.fn()
    };
    const createArchive = vi.fn();

    const result = await archiveDiscardSource({
      workspace,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        phase: 'requested',
        process_identity: { pid: 4242, pgid: 4242, started_at: 1000 }
      },
      store: {},
      processController,
      withTopologyLock: (work) => work(),
      createArchive
    });

    expect(result).toEqual({ ok: false, reason: 'ps_failed' });
    expect(processController.signal).not.toHaveBeenCalled();
    expect(createArchive).not.toHaveBeenCalled();
  });

  test('keeps a quiesced operation fenced when archive creation fails', async () => {
    const store = createQueueStore({ now: () => 100 });
    store.createDiscardOperation(workspace, {
      expected_revision: 0,
      operation: {
        operation_id: 'discard-failed',
        bead_id: 'UI-1',
        source_snapshot: { repo },
        process_identity: { pid: 4242, pgid: 4242, started_at: 1000 }
      }
    });
    const processController = {
      probe: vi.fn(() => ({ state: 'owned' })),
      signal: vi.fn(() => ({ ok: true, state: 'owned' }))
    };

    const result = await archiveDiscardSource({
      workspace,
      operation: store.snapshot(workspace).discard_operations['discard-failed'],
      store,
      processController,
      withTopologyLock: (work) => work(),
      createArchive: () => ({ ok: false, reason: 'disk_write_failed' })
    });

    expect(result).toEqual({ ok: false, reason: 'disk_write_failed' });
    expect(processController.signal.mock.calls).toEqual([
      [{ pid: 4242, pgid: 4242, started_at: 1000 }, 'SIGSTOP']
    ]);
    expect(
      store.snapshot(workspace).discard_operations['discard-failed']
    ).toMatchObject({
      phase: 'requested',
      last_error: 'disk_write_failed'
    });
    expect(store.activeDiscardBeadIds(workspace)).toEqual(new Set(['UI-1']));
  });
});
