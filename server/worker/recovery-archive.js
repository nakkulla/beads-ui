/**
 * Binary-safe, restart-verifiable recovery archives for Worker discard.
 *
 * Every archive is built outside the repository in a deterministic temporary
 * sibling, verified in place, and atomically renamed only after its COMPLETE
 * checksum matches the final manifest bytes.
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { discardBackupDir } from './state-paths.js';

const ARCHIVE_SCHEMA_VERSION = 1;
const MAX_GIT_OUTPUT_BYTES = 128 * 1024 * 1024;

class ArchiveError extends Error {
  /**
   * @param {string} reason
   */
  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

/**
 * @param {Buffer|string} value
 */
function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * @param {Buffer} value
 */
function nulPaths(value) {
  return value
    .toString('utf8')
    .split('\0')
    .filter((entry) => entry.length > 0);
}

/**
 * @param {string} root
 * @param {string} relative_path
 */
function safePath(root, relative_path) {
  const resolved_root = path.resolve(root);
  const resolved = path.resolve(resolved_root, relative_path);
  if (
    resolved !== resolved_root &&
    !resolved.startsWith(`${resolved_root}${path.sep}`)
  ) {
    throw new ArchiveError('path_escape');
  }
  return resolved;
}

/**
 * @param {typeof nodeFs} fs
 * @param {string} file
 */
function checksumEntry(fs, file) {
  const stat = fs.lstatSync(file);
  if (stat.isSymbolicLink()) {
    const target = fs.readlinkSync(file);
    return {
      type: 'symlink',
      mode: stat.mode & 0o7777,
      size: Buffer.byteLength(target),
      sha256: sha256(target)
    };
  }
  if (!stat.isFile()) {
    throw new ArchiveError('unsupported_file_type');
  }
  const contents = fs.readFileSync(file);
  return {
    type: 'file',
    mode: stat.mode & 0o7777,
    size: contents.length,
    sha256: sha256(contents)
  };
}

/**
 * @param {{ fs?: typeof nodeFs, now?: () => number, git?: (cwd: string, args: string[]) => Buffer }} [deps]
 */
export function createRecoveryArchive(deps = {}) {
  const fs = deps.fs || nodeFs;
  const now = deps.now || (() => Date.now());
  const git =
    deps.git ||
    ((cwd, args) =>
      execFileSync('git', args, {
        cwd,
        encoding: null,
        maxBuffer: MAX_GIT_OUTPUT_BYTES
      }));

  /**
   * @param {string} worktree
   */
  function assertSubmodulesClean(worktree) {
    let output;
    try {
      output = git(worktree, ['submodule', 'status', '--recursive']).toString(
        'utf8'
      );
    } catch {
      throw new ArchiveError('submodule_observation_failed');
    }
    for (const line of output.split('\n')) {
      if (line.length === 0) {
        continue;
      }
      const prefix = line[0];
      const fields = line.slice(1).trim().split(/\s+/);
      const submodule_path = fields[1];
      if (prefix !== ' ' || !submodule_path) {
        throw new ArchiveError('dirty_submodule');
      }
      let status;
      try {
        status = git(path.join(worktree, submodule_path), [
          'status',
          '--porcelain=v1',
          '--untracked-files=all'
        ]);
      } catch {
        throw new ArchiveError('submodule_observation_failed');
      }
      if (status.length > 0) {
        throw new ArchiveError('dirty_submodule');
      }
    }
  }

  /**
   * @param {string} worktree
   * @param {string} relative_path
   */
  function assertNotSubmodule(worktree, relative_path) {
    let stage;
    try {
      stage = git(worktree, ['ls-files', '--stage', '--', relative_path])
        .toString('utf8')
        .trim();
    } catch {
      throw new ArchiveError('git_index_observation_failed');
    }
    if (stage.startsWith('160000 ')) {
      throw new ArchiveError('dirty_submodule');
    }
  }

  /**
   * Git's untracked inventory intentionally omits sockets/FIFOs. Walk only to
   * detect those unsupported nodes, while honoring git-ignore exclusions.
   *
   * @param {string} worktree
   */
  function assertNoUntrackedSpecialFiles(worktree) {
    /**
     * @param {string} directory
     */
    const visit = (directory) => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const absolute = path.join(directory, entry.name);
        const relative = path.relative(worktree, absolute);
        if (relative === '.git' || relative.startsWith(`.git${path.sep}`)) {
          continue;
        }
        const stat = fs.lstatSync(absolute);
        if (stat.isDirectory()) {
          visit(absolute);
          continue;
        }
        if (stat.isFile() || stat.isSymbolicLink()) {
          continue;
        }
        let ignored = false;
        try {
          git(worktree, ['check-ignore', '-q', '--', relative]);
          ignored = true;
        } catch {
          ignored = false;
        }
        if (!ignored) {
          throw new ArchiveError('unsupported_file_type');
        }
      }
    };
    visit(worktree);
  }

  /**
   * @param {string} archive_path
   * @returns {{ ok: true, receipt: { path: string, manifest_sha256: string, verified_at: number }}|{ ok: false, reason: string }}
   */
  function verify(archive_path) {
    try {
      const manifest_path = path.join(archive_path, 'manifest.json');
      const complete_path = path.join(archive_path, 'COMPLETE');
      if (!fs.existsSync(manifest_path) || !fs.existsSync(complete_path)) {
        return { ok: false, reason: 'archive_incomplete' };
      }
      const manifest_bytes = fs.readFileSync(manifest_path);
      const expected = fs.readFileSync(complete_path, 'utf8').trim();
      const actual = sha256(manifest_bytes);
      if (!/^[0-9a-f]{64}$/.test(expected) || expected !== actual) {
        return { ok: false, reason: 'manifest_checksum_mismatch' };
      }
      const manifest = JSON.parse(manifest_bytes.toString('utf8'));
      if (
        manifest.schema_version !== ARCHIVE_SCHEMA_VERSION ||
        !Array.isArray(manifest.artifacts) ||
        !Array.isArray(manifest.files)
      ) {
        return { ok: false, reason: 'manifest_invalid' };
      }
      for (const entry of manifest.artifacts) {
        const artifact = safePath(archive_path, entry.path);
        const observed = checksumEntry(fs, artifact);
        if (
          observed.type !== 'file' ||
          observed.mode !== entry.mode ||
          observed.size !== entry.size ||
          observed.sha256 !== entry.sha256
        ) {
          return { ok: false, reason: 'artifact_checksum_mismatch' };
        }
        if (entry.kind === 'bundle') {
          const repo = manifest.source_snapshot?.repo;
          if (typeof repo !== 'string' || repo.length === 0) {
            return { ok: false, reason: 'bundle_verify_failed' };
          }
          try {
            git(repo, ['bundle', 'verify', artifact]);
          } catch {
            return { ok: false, reason: 'bundle_verify_failed' };
          }
        }
      }
      for (const entry of manifest.files) {
        if (entry.type === 'deleted') {
          continue;
        }
        const file = safePath(path.join(archive_path, 'files'), entry.path);
        const observed = checksumEntry(fs, file);
        if (
          observed.type !== entry.type ||
          observed.mode !== entry.mode ||
          observed.size !== entry.size ||
          observed.sha256 !== entry.sha256
        ) {
          return { ok: false, reason: 'file_checksum_mismatch' };
        }
      }
      return {
        ok: true,
        receipt: {
          path: archive_path,
          manifest_sha256: actual,
          verified_at: manifest.created_at
        }
      };
    } catch (err) {
      return {
        ok: false,
        reason:
          err instanceof ArchiveError ? err.reason : 'archive_verify_failed'
      };
    }
  }

  /**
   * @param {{ workspace: string, operation_id: string, repo: string, worktree: string, target_base: string, source_head: string, source_snapshot: Record<string, unknown>, session_log_path?: string|null }} input
   * @returns {{ ok: true, reused?: boolean, receipt: { path: string, manifest_sha256: string, verified_at: number }}|{ ok: false, reason: string, temp_path?: string }}
   */
  function create(input) {
    const final_path = discardBackupDir(input.workspace, input.operation_id);
    const temp_path = `${final_path}.tmp`;
    if (fs.existsSync(final_path)) {
      const existing = verify(final_path);
      return existing.ok
        ? { ...existing, reused: true }
        : { ok: false, reason: 'archive_exists_invalid' };
    }
    try {
      if (
        typeof input.repo !== 'string' ||
        typeof input.worktree !== 'string' ||
        typeof input.target_base !== 'string' ||
        typeof input.source_head !== 'string' ||
        !input.source_snapshot ||
        typeof input.source_snapshot !== 'object'
      ) {
        throw new ArchiveError('archive_input_invalid');
      }
      fs.mkdirSync(path.dirname(final_path), { recursive: true });
      fs.rmSync(temp_path, { recursive: true, force: true });
      fs.mkdirSync(path.join(temp_path, 'files'), { recursive: true });
      assertSubmodulesClean(input.worktree);
      assertNoUntrackedSpecialFiles(input.worktree);

      /** @type {Array<{ path: string, kind: string, mode: number, size: number, sha256: string }>} */
      const artifacts = [];
      /**
       * @param {string} artifact_path
       * @param {Buffer} contents
       * @param {string} kind
       */
      const writeArtifact = (artifact_path, contents, kind) => {
        const output_path = safePath(temp_path, artifact_path);
        fs.writeFileSync(output_path, contents);
        const observed = checksumEntry(fs, output_path);
        artifacts.push({ path: artifact_path, kind, ...observed });
      };

      let ahead_count;
      try {
        ahead_count = Number(
          git(input.worktree, [
            'rev-list',
            '--count',
            `${input.target_base}..${input.source_head}`
          ])
            .toString('utf8')
            .trim()
        );
      } catch {
        throw new ArchiveError('commit_range_observation_failed');
      }
      if (!Number.isInteger(ahead_count) || ahead_count < 0) {
        throw new ArchiveError('commit_range_observation_failed');
      }
      if (ahead_count > 0) {
        const bundle_path = path.join(temp_path, 'commits.bundle');
        try {
          const observed_head = git(input.worktree, ['rev-parse', 'HEAD'])
            .toString('utf8')
            .trim();
          if (observed_head !== input.source_head) {
            throw new ArchiveError('source_head_changed');
          }
          git(input.worktree, [
            'bundle',
            'create',
            bundle_path,
            'HEAD',
            `^${input.target_base}`
          ]);
          git(input.repo, ['bundle', 'verify', bundle_path]);
        } catch (err) {
          if (err instanceof ArchiveError) {
            throw err;
          }
          throw new ArchiveError('bundle_create_failed');
        }
        const observed = checksumEntry(fs, bundle_path);
        artifacts.push({ path: 'commits.bundle', kind: 'bundle', ...observed });
      }

      try {
        writeArtifact(
          'index.patch',
          git(input.worktree, [
            'diff',
            '--cached',
            '--binary',
            '--full-index',
            '--no-ext-diff'
          ]),
          'patch'
        );
        writeArtifact(
          'worktree.patch',
          git(input.worktree, [
            'diff',
            '--binary',
            '--full-index',
            '--no-ext-diff'
          ]),
          'patch'
        );
      } catch (err) {
        if (err instanceof ArchiveError) {
          throw err;
        }
        throw new ArchiveError('patch_create_failed');
      }

      let tracked;
      let untracked;
      try {
        tracked = nulPaths(
          git(input.worktree, ['diff', '--name-only', '-z', 'HEAD'])
        );
        untracked = nulPaths(
          git(input.worktree, [
            'ls-files',
            '--others',
            '--exclude-standard',
            '-z'
          ])
        );
      } catch {
        throw new ArchiveError('file_inventory_failed');
      }
      const relative_paths = [...new Set([...tracked, ...untracked])].sort();
      /** @type {Array<{ path: string, type: string, mode: number|null, size: number, sha256: string|null }>} */
      const files = [];
      for (const relative_path of relative_paths) {
        assertNotSubmodule(input.worktree, relative_path);
        const source_path = safePath(input.worktree, relative_path);
        let stat;
        try {
          stat = fs.lstatSync(source_path);
        } catch (err) {
          const code = err && /** @type {any} */ (err).code;
          if (code === 'ENOENT') {
            files.push({
              path: relative_path,
              type: 'deleted',
              mode: null,
              size: 0,
              sha256: null
            });
            continue;
          }
          throw new ArchiveError('file_observation_failed');
        }
        const destination = safePath(
          path.join(temp_path, 'files'),
          relative_path
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        if (stat.isSymbolicLink()) {
          const target = fs.readlinkSync(source_path);
          fs.symlinkSync(target, destination);
        } else if (stat.isFile()) {
          fs.copyFileSync(source_path, destination);
          fs.chmodSync(destination, stat.mode & 0o7777);
        } else {
          throw new ArchiveError('unsupported_file_type');
        }
        files.push({ path: relative_path, ...checksumEntry(fs, destination) });
      }

      if (input.session_log_path && fs.existsSync(input.session_log_path)) {
        const session = checksumEntry(fs, input.session_log_path);
        if (session.type !== 'file') {
          throw new ArchiveError('session_log_invalid');
        }
        const contents = fs.readFileSync(input.session_log_path);
        writeArtifact('session.jsonl', contents, 'session');
      }

      const created_at = now();
      const manifest = {
        schema_version: ARCHIVE_SCHEMA_VERSION,
        operation_id: input.operation_id,
        created_at,
        source_snapshot: input.source_snapshot,
        commit_range: {
          target_base: input.target_base,
          source_head: input.source_head,
          ahead_count
        },
        excluded: ['git-ignored', 'dependency-build-output'],
        failures: [],
        artifacts,
        files
      };
      const manifest_bytes = Buffer.from(JSON.stringify(manifest, null, 2));
      const manifest_sha256 = sha256(manifest_bytes);
      fs.writeFileSync(path.join(temp_path, 'manifest.json'), manifest_bytes);
      fs.writeFileSync(
        path.join(temp_path, 'COMPLETE'),
        `${manifest_sha256}\n`
      );
      const checked = verify(temp_path);
      if (!checked.ok) {
        throw new ArchiveError(checked.reason);
      }
      fs.renameSync(temp_path, final_path);
      const final_check = verify(final_path);
      if (!final_check.ok) {
        throw new ArchiveError(final_check.reason);
      }
      return final_check;
    } catch (err) {
      return {
        ok: false,
        reason:
          err instanceof ArchiveError ? err.reason : 'archive_create_failed',
        temp_path
      };
    }
  }

  return { create, verify };
}

/**
 * Quiesce an owned runner, create/verify its archive under the repository
 * topology lock, then persist the receipt. Failure deliberately sends no CONT:
 * the fenced operation and frozen artifacts remain available for same-id retry.
 *
 * @param {{ workspace: string, operation: any, store: any, processController: any, withTopologyLock: (work: () => any) => any, createArchive: () => any }} input
 * @returns {Promise<any>}
 */
export async function archiveDiscardSource(input) {
  const { operation } = input;
  const identity = operation?.process_identity || null;
  if (identity) {
    const observed = input.processController.probe(identity);
    if (observed.state === 'unknown') {
      input.store.failDiscardOperation?.(input.workspace, {
        operation_id: operation.operation_id,
        expected_phase: operation.phase,
        reason: observed.reason || 'identity_unknown'
      });
      return { ok: false, reason: observed.reason || 'identity_unknown' };
    }
    if (observed.state === 'owned') {
      const stopped = input.processController.signal(identity, 'SIGSTOP');
      if (!stopped.ok) {
        const reason = stopped.reason || `identity_${stopped.state}`;
        input.store.failDiscardOperation?.(input.workspace, {
          operation_id: operation.operation_id,
          expected_phase: operation.phase,
          reason
        });
        return { ok: false, reason };
      }
    }
  }
  const archived = await input.withTopologyLock(() => input.createArchive());
  if (!archived.ok) {
    input.store.failDiscardOperation?.(input.workspace, {
      operation_id: operation.operation_id,
      expected_phase: operation.phase,
      reason: archived.reason
    });
    return archived;
  }
  const persisted = input.store.advanceDiscardOperation(input.workspace, {
    operation_id: operation.operation_id,
    expected_phase: operation.phase,
    next_phase: 'backup_verified',
    patch: { backup: archived.receipt }
  });
  const readback =
    persisted.queue?.discard_operations?.[operation.operation_id];
  if (
    !persisted.ok ||
    readback?.phase !== 'backup_verified' ||
    readback.backup?.manifest_sha256 !== archived.receipt.manifest_sha256
  ) {
    return { ok: false, reason: 'backup_receipt_persist_failed' };
  }
  return { ok: true, receipt: archived.receipt };
}
