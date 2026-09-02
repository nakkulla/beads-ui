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

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

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

/**
 * Adds an orphan gitlink to the real Git index and commits it.
 *
 * @param {string} relative_path
 */
function addOrphanGitlink(relative_path) {
  const oid = git(['rev-parse', 'HEAD']);
  git([
    'update-index',
    '--add',
    '--cacheinfo',
    `160000,${oid},${relative_path}`
  ]);
  git(['commit', '-m', `orphan gitlink ${relative_path}`]);
}

/**
 * Adds a real, initialized Git submodule to the parent repository.
 *
 * @param {string} relative_path
 */
function addMappedSubmodule(relative_path) {
  const child_repo = path.join(tmp, `child-${path.basename(relative_path)}`);
  fs.mkdirSync(child_repo);
  git(['init'], child_repo);
  git(['config', 'user.email', 'test@example.com'], child_repo);
  git(['config', 'user.name', 'Test'], child_repo);
  write(path.join(child_repo, 'child.txt'), 'base\n');
  git(['add', '.'], child_repo);
  git(['commit', '-m', 'child'], child_repo);
  git(
    [
      '-c',
      'protocol.file.allow=always',
      'submodule',
      'add',
      child_repo,
      relative_path
    ],
    repo
  );
  git(['commit', '-am', `submodule ${relative_path}`]);
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
  test('archives a branch-only commit range without worktree artifacts', () => {
    const base_oid = git(['rev-parse', 'HEAD']);
    git(['checkout', '-b', 'UI-1']);
    write(path.join(repo, 'branch-only.txt'), 'branch-only\n');
    git(['add', 'branch-only.txt']);
    git(['commit', '-m', 'branch-only']);
    const branch_head_sha = git(['rev-parse', 'HEAD']);
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.createBranch({
      workspace,
      archive_id: 'auto-reclaim-UI-1',
      repo,
      ref: 'refs/heads/UI-1',
      base_oid,
      branch_head_sha
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const manifest = JSON.parse(
      fs.readFileSync(path.join(result.receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest).toMatchObject({
      mode: 'branch-only',
      source_snapshot: {
        repo,
        ref: 'refs/heads/UI-1',
        base_oid,
        branch_head_sha
      },
      excluded: [
        'worktree-patch',
        'index-patch',
        'untracked-files',
        'submodule-and-special-file-checks'
      ],
      files: []
    });
    expect(manifest.artifacts).toHaveLength(1);
    expect(manifest.artifacts[0]).toMatchObject({
      path: 'commits.bundle',
      kind: 'bundle'
    });
    expect(
      git([
        'bundle',
        'list-heads',
        path.join(result.receipt.path, 'commits.bundle')
      ])
    ).toContain(`${branch_head_sha} refs/heads/UI-1`);
    expect(archive.verify(result.receipt.path)).toEqual({
      ok: true,
      receipt: result.receipt
    });
  });

  test('fails a branch-only archive when bundle verification fails', () => {
    const base_oid = git(['rev-parse', 'HEAD']);
    git(['checkout', '-b', 'UI-1']);
    write(path.join(repo, 'branch-only.txt'), 'branch-only\n');
    git(['add', 'branch-only.txt']);
    git(['commit', '-m', 'branch-only']);
    const branch_head_sha = git(['rev-parse', 'HEAD']);
    const archive = createRecoveryArchive({
      now: () => 5000,
      git(cwd, args) {
        if (args[0] === 'bundle' && args[1] === 'verify') {
          throw new Error('injected');
        }
        return execFileSync('git', args, { cwd, encoding: null });
      }
    });

    const result = archive.createBranch({
      workspace,
      archive_id: 'auto-reclaim-verify-failed',
      repo,
      ref: 'refs/heads/UI-1',
      base_oid,
      branch_head_sha
    });

    expect(result).toMatchObject({ ok: false, reason: 'bundle_create_failed' });
    expect(
      fs.existsSync(discardBackupDir(workspace, 'auto-reclaim-verify-failed'))
    ).toBe(false);
    expect(git(['rev-parse', 'refs/heads/UI-1'])).toBe(branch_head_sha);
  });

  test('records a checksum-verified committed-source archive for absent cleanup residue', () => {
    const session_log_path = path.join(tmp, 'absent-session.jsonl');
    write(session_log_path, '{"type":"result"}\n');
    const archive = createRecoveryArchive({ now: () => 5000 });
    const source_head = git(['rev-parse', 'HEAD']);

    const result = archive.createCommittedSource({
      workspace,
      operation_id: 'discard-absent',
      source_snapshot: {
        repo,
        source_head,
        preexisting_absent: true,
        pr: { number: 304, state: 'MERGED' }
      },
      session_log_path
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const receipt = /** @type {any} */ (result).receipt;
    const manifest = JSON.parse(
      fs.readFileSync(path.join(receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest).toMatchObject({
      mode: 'committed-source',
      topology: 'preexisting_absent',
      excluded: ['dirty-and-untracked-unavailable']
    });
    expect(fs.existsSync(path.join(receipt.path, 'commits.bundle'))).toBe(true);
    expect(() =>
      git([
        'show-ref',
        '--verify',
        '--quiet',
        'refs/bdui/discard-archives/discard-absent'
      ])
    ).toThrow();
    expect(archive.verify(receipt.path)).toEqual({
      ok: true,
      receipt
    });
  });

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
    expect(manifest.orphan_gitlinks).toEqual([]);
    expect(manifest.excluded).toEqual([
      'git-ignored',
      'dependency-build-output'
    ]);
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

  test('archives an empty orphan gitlink and records it in the manifest', () => {
    const relative_path = 'vendor/orphan';
    addOrphanGitlink(relative_path);
    fs.mkdirSync(path.join(repo, relative_path), { recursive: true });
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-empty-orphan'));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const manifest = JSON.parse(
      fs.readFileSync(path.join(result.receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest.orphan_gitlinks).toEqual([relative_path]);
  });

  test('archives an absent orphan gitlink without inventorying it', () => {
    const relative_path = 'vendor/orphan';
    addOrphanGitlink(relative_path);
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-absent-orphan'));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const manifest = JSON.parse(
      fs.readFileSync(path.join(result.receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest.orphan_gitlinks).toEqual([relative_path]);
    expect(manifest.files).not.toContainEqual(
      expect.objectContaining({ path: relative_path })
    );
  });

  test('rejects an orphan gitlink containing a regular file', () => {
    const relative_path = 'vendor/orphan';
    addOrphanGitlink(relative_path);
    write(path.join(repo, relative_path), 'untracked content\n');
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-file-orphan'));

    expect(result).toMatchObject({
      ok: false,
      reason: `orphan_gitlink_content:${relative_path}`
    });
  });

  test('rejects an orphan gitlink containing a nested repository', () => {
    const relative_path = 'vendor/orphan';
    addOrphanGitlink(relative_path);
    fs.mkdirSync(path.join(repo, relative_path), { recursive: true });
    git(['init'], path.join(repo, relative_path));
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-nested-orphan'));

    expect(result).toMatchObject({
      ok: false,
      reason: `orphan_gitlink_content:${relative_path}`
    });
  });

  test('archives an orphan gitlink with a mapped clean submodule', () => {
    const orphan_path = 'vendor/orphan';
    addMappedSubmodule('vendor/child');
    addOrphanGitlink(orphan_path);
    fs.mkdirSync(path.join(repo, orphan_path), { recursive: true });
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-clean-mixed'));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const manifest = JSON.parse(
      fs.readFileSync(path.join(result.receipt.path, 'manifest.json'), 'utf8')
    );
    expect(manifest.orphan_gitlinks).toEqual([orphan_path]);
  });

  test('rejects a dirty mapped submodule alongside an orphan gitlink', () => {
    const orphan_path = 'vendor/orphan';
    addMappedSubmodule('vendor/child');
    addOrphanGitlink(orphan_path);
    fs.mkdirSync(path.join(repo, orphan_path), { recursive: true });
    write(path.join(repo, 'vendor/child/child.txt'), 'dirty\n');
    const archive = createRecoveryArchive({ now: () => 5000 });

    const result = archive.create(input('discard-dirty-mixed'));

    expect(result).toMatchObject({ ok: false, reason: 'dirty_submodule' });
  });

  test('reports an index observation failure when gitlink listing fails', () => {
    addOrphanGitlink('vendor/orphan');
    const archive = createRecoveryArchive({
      now: () => 5000,
      git(cwd, args) {
        if (
          args[0] === 'ls-files' &&
          args[1] === '--stage' &&
          args[2] === '-z'
        ) {
          throw new Error('injected ls-files failure');
        }
        return execFileSync('git', args, { cwd, encoding: null });
      }
    });

    const result = archive.create(input('discard-index-observation'));

    expect(result).toMatchObject({
      ok: false,
      reason: 'git_index_observation_failed'
    });
  });

  test('reports a submodule observation failure when manifest reading fails', () => {
    const relative_path = 'vendor/child';
    const oid = git(['rev-parse', 'HEAD']);
    write(
      path.join(repo, '.gitmodules'),
      `[submodule "child"]\n\tpath = ${relative_path}\n\turl = ../child\n`
    );
    git(['add', '.gitmodules']);
    git([
      'update-index',
      '--add',
      '--cacheinfo',
      `160000,${oid},${relative_path}`
    ]);
    git(['commit', '-m', 'uninitialized submodule']);
    const archive = createRecoveryArchive({
      now: () => 5000,
      git(cwd, args) {
        if (
          args[0] === 'config' &&
          args[1] === '--file' &&
          args[2] === '.gitmodules'
        ) {
          throw new Error('injected config failure');
        }
        return execFileSync('git', args, { cwd, encoding: null });
      }
    });

    const result = archive.create(input('discard-manifest-observation'));

    expect(result).toMatchObject({
      ok: false,
      reason: 'submodule_observation_failed'
    });
  });

  test('reports a submodule observation failure when mapped status fails', () => {
    const relative_path = 'vendor/child';
    addMappedSubmodule(relative_path);
    write(path.join(repo, relative_path, 'child.txt'), 'dirty\n');
    const archive = createRecoveryArchive({
      now: () => 5000,
      git(cwd, args) {
        if (
          args[0] === 'submodule' &&
          args[1] === 'status' &&
          args[2] === '--recursive' &&
          args[3] === '--'
        ) {
          throw new Error('injected submodule status failure');
        }
        return execFileSync('git', args, { cwd, encoding: null });
      }
    });

    const result = archive.create(input('discard-status-observation'));

    expect(result).toMatchObject({
      ok: false,
      reason: 'submodule_observation_failed'
    });
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
