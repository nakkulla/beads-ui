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
// A textconv driver turns a patch into an unappliable rendering, so both the
// archive and the live inventory read the raw diff (UI-w2ou §3.1).
const INDEX_PATCH_ARGS = Object.freeze([
  'diff',
  '--cached',
  '--binary',
  '--full-index',
  '--no-ext-diff',
  '--no-textconv'
]);
const WORKTREE_PATCH_ARGS = Object.freeze([
  'diff',
  '--binary',
  '--full-index',
  '--no-ext-diff',
  '--no-textconv'
]);
// How many differing same-id archives a completed-worktree backup steps past
// before it gives up; each one is a content change between two cleanup runs.
const MAX_ARCHIVE_ID_SUFFIX = 100;

/**
 * One path of a worktree's undelivered content, as raw bytes. `mode` is the
 * git mode class (`100644`/`100755`/`120000`), never raw permission bits: a
 * copied symlink cannot carry its source's bits on every platform.
 *
 * @typedef {{ path: string, type: string, mode: string|null, sha256: string|null }} InventoryEntry
 */
/**
 * The undelivered content of a worktree (UI-w2ou §3.2): staged paths by their
 * index blob, changed and untracked paths by their worktree bytes, plus both
 * patches. Read without clean filters, so a raw-byte change a filtered hash
 * hides still changes the inventory.
 *
 * @typedef {{ index: InventoryEntry[], worktree: InventoryEntry[], patches: { index: string, worktree: string } }} WorktreeInventory
 */

/**
 * The fixed-order serialization every inventory comparison and hash uses, or
 * null for a value that is not an inventory (a malformed manifest).
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function canonicalInventory(value) {
  const inventory = /** @type {any} */ (value);
  if (
    !inventory ||
    typeof inventory !== 'object' ||
    !Array.isArray(inventory.index) ||
    !Array.isArray(inventory.worktree) ||
    !inventory.patches ||
    typeof inventory.patches.index !== 'string' ||
    typeof inventory.patches.worktree !== 'string'
  ) {
    return null;
  }
  /**
   * @param {any} entry
   */
  const canonicalEntry = (entry) => [
    String(entry?.path),
    String(entry?.type),
    entry?.mode ?? null,
    entry?.sha256 ?? null
  ];
  return JSON.stringify({
    index: inventory.index.map(canonicalEntry),
    worktree: inventory.worktree.map(canonicalEntry),
    patches: [inventory.patches.index, inventory.patches.worktree]
  });
}

/**
 * @param {WorktreeInventory} inventory
 * @returns {string}
 */
export function inventoryDigest(inventory) {
  return sha256(canonicalInventory(inventory) ?? 'inventory_invalid');
}

/**
 * Whether two inventories name exactly the same bytes. A malformed side is
 * never equal to anything.
 *
 * @param {unknown} left
 * @param {unknown} right
 * @returns {boolean}
 */
export function sameInventory(left, right) {
  const left_key = canonicalInventory(left);
  return left_key !== null && left_key === canonicalInventory(right);
}

/**
 * How many distinct paths an inventory holds — the `file_count` of a
 * completed-worktree backup receipt.
 *
 * @param {WorktreeInventory} inventory
 * @returns {number}
 */
export function inventoryPathCount(inventory) {
  return new Set(
    [...inventory.index, ...inventory.worktree].map((entry) => entry.path)
  ).size;
}

/**
 * @param {{ type: string, mode: number|null }} checksum
 * @returns {string|null}
 */
function gitModeClass(checksum) {
  if (checksum.type === 'symlink') {
    return '120000';
  }
  if (checksum.type !== 'file' || checksum.mode === null) {
    return null;
  }
  return checksum.mode & 0o111 ? '100755' : '100644';
}

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
   * Normalizes a Git path for gitlink classification.
   *
   * @param {string} git_path
   */
  function normalizeGitPath(git_path) {
    return path.posix.normalize(git_path).replace(/\/+$/, '');
  }

  /**
   * Classifies index gitlinks before archive inventory.
   *
   * @param {string} worktree
   * @returns {{ orphan_gitlinks: string[] }}
   */
  function classifySubmodules(worktree) {
    let index_output;
    try {
      index_output = git(worktree, ['ls-files', '--stage', '-z']).toString(
        'utf8'
      );
    } catch {
      throw new ArchiveError('git_index_observation_failed');
    }
    /** @type {Set<string>} */
    const gitlink_path_set = new Set();
    for (const entry of index_output.split('\0')) {
      const match = /^160000 [0-9a-f]+ \d\t(.+)$/s.exec(entry);
      if (match) {
        gitlink_path_set.add(normalizeGitPath(match[1]));
      }
    }
    const gitlink_paths = [...gitlink_path_set].sort();

    /** @type {Set<string>} */
    const mapped_paths = new Set();
    if (fs.existsSync(path.join(worktree, '.gitmodules'))) {
      let config_output;
      try {
        config_output = git(worktree, [
          'config',
          '--file',
          '.gitmodules',
          '--list',
          '-z'
        ]).toString('utf8');
      } catch {
        throw new ArchiveError('submodule_observation_failed');
      }
      for (const entry of config_output.split('\0')) {
        const separator = entry.indexOf('\n');
        if (separator === -1) {
          continue;
        }
        const key = entry.slice(0, separator);
        if (!/^submodule\..+\.path$/.test(key)) {
          continue;
        }
        mapped_paths.add(normalizeGitPath(entry.slice(separator + 1)));
      }
    }

    /** @type {string[]} */
    const orphan_gitlinks = [];
    for (const gitlink_path of gitlink_paths) {
      if (mapped_paths.has(gitlink_path)) {
        continue;
      }
      const absolute_path = path.join(worktree, gitlink_path);
      let stat;
      try {
        stat = fs.lstatSync(absolute_path);
      } catch (err) {
        const code = err && /** @type {any} */ (err).code;
        if (code === 'ENOENT') {
          orphan_gitlinks.push(gitlink_path);
          continue;
        }
        throw new ArchiveError('submodule_observation_failed');
      }
      if (!stat.isDirectory()) {
        throw new ArchiveError(`orphan_gitlink_content:${gitlink_path}`);
      }
      try {
        if (fs.readdirSync(absolute_path).length === 0) {
          orphan_gitlinks.push(gitlink_path);
          continue;
        }
      } catch (err) {
        const code = err && /** @type {any} */ (err).code;
        if (code === 'ENOENT') {
          orphan_gitlinks.push(gitlink_path);
          continue;
        }
        throw new ArchiveError('submodule_observation_failed');
      }
      throw new ArchiveError(`orphan_gitlink_content:${gitlink_path}`);
    }

    const mapped_gitlinks = gitlink_paths.filter((gitlink_path) =>
      mapped_paths.has(gitlink_path)
    );
    if (mapped_gitlinks.length === 0) {
      return { orphan_gitlinks };
    }

    let output;
    try {
      output = git(worktree, [
        'submodule',
        'status',
        '--recursive',
        '--',
        ...mapped_gitlinks
      ]).toString('utf8');
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
    return { orphan_gitlinks };
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
   * The two path sets an archive covers: staged paths (index differs from
   * HEAD) get an index-blob copy, and changed or untracked paths (worktree
   * differs from HEAD, or not tracked and not ignored) get a worktree copy.
   * The archive and the live inventory share this listing, so the two can
   * only differ in bytes, never in which paths they looked at.
   *
   * @param {string} worktree
   * @returns {{ staged: string[], worktree: string[] }}
   */
  function listInventoryPaths(worktree) {
    let staged;
    let tracked;
    let untracked;
    try {
      staged = nulPaths(
        git(worktree, ['diff', '--cached', '--name-only', '-z', '--no-renames'])
      );
      tracked = nulPaths(
        git(worktree, ['diff', '--name-only', '-z', '--no-renames', 'HEAD'])
      );
      untracked = nulPaths(
        git(worktree, ['ls-files', '--others', '--exclude-standard', '-z'])
      );
    } catch {
      throw new ArchiveError('file_inventory_failed');
    }
    return {
      staged: [...new Set(staged)].sort(),
      worktree: [...new Set([...tracked, ...untracked])].sort()
    };
  }

  /**
   * Every index entry by path. A path with only conflict stages reads as
   * `unmerged` — there is no single index blob to copy for it.
   *
   * @param {string} worktree
   * @returns {Map<string, { mode: string, oid: string }|'unmerged'>}
   */
  function readIndexMap(worktree) {
    let output;
    try {
      output = git(worktree, ['ls-files', '--stage', '-z']).toString('utf8');
    } catch {
      throw new ArchiveError('git_index_observation_failed');
    }
    /** @type {Map<string, { mode: string, oid: string }|'unmerged'>} */
    const entries = new Map();
    for (const record of output.split('\0')) {
      if (record.length === 0) {
        continue;
      }
      const match = /^([0-7]{6}) ([0-9a-f]{40,64}) ([0-3])\t(.+)$/s.exec(
        record
      );
      if (!match) {
        throw new ArchiveError('git_index_observation_failed');
      }
      if (match[3] === '0') {
        entries.set(match[4], { mode: match[1], oid: match[2] });
      } else if (!entries.has(match[4])) {
        entries.set(match[4], 'unmerged');
      }
    }
    return entries;
  }

  /**
   * The raw bytes of one index blob, read without filters.
   *
   * @param {string} worktree
   * @param {{ mode: string, oid: string }} entry
   * @returns {Buffer}
   */
  function readIndexBlob(worktree, entry) {
    if (entry.mode === '160000') {
      throw new ArchiveError('dirty_submodule');
    }
    try {
      return git(worktree, ['cat-file', 'blob', entry.oid]);
    } catch {
      throw new ArchiveError('git_index_observation_failed');
    }
  }

  /**
   * The live undelivered-content inventory of a worktree (UI-w2ou §3.2),
   * observed with the same listing and the same byte reads `create` records
   * from its copies.
   *
   * @param {string} worktree
   * @returns {{ ok: true, inventory: WorktreeInventory }|{ ok: false, reason: string }}
   */
  function observeInventory(worktree) {
    try {
      const { orphan_gitlinks } = classifySubmodules(worktree);
      const skipped = new Set(orphan_gitlinks);
      const listed = listInventoryPaths(worktree);
      const index_map = readIndexMap(worktree);
      /** @type {InventoryEntry[]} */
      const index = [];
      for (const relative_path of listed.staged) {
        if (skipped.has(relative_path)) {
          continue;
        }
        const entry = index_map.get(relative_path);
        if (entry === undefined || entry === 'unmerged') {
          index.push({
            path: relative_path,
            type: entry === 'unmerged' ? 'unmerged' : 'deleted',
            mode: null,
            sha256: null
          });
          continue;
        }
        index.push({
          path: relative_path,
          type: 'blob',
          mode: entry.mode,
          sha256: sha256(readIndexBlob(worktree, entry))
        });
      }
      /** @type {InventoryEntry[]} */
      const worktree_entries = [];
      for (const relative_path of listed.worktree) {
        if (skipped.has(relative_path)) {
          continue;
        }
        const indexed = index_map.get(relative_path);
        if (indexed !== undefined && indexed !== 'unmerged') {
          if (indexed.mode === '160000') {
            throw new ArchiveError('dirty_submodule');
          }
        }
        const source_path = safePath(worktree, relative_path);
        /** @type {import('node:fs').Stats} */
        let stat;
        try {
          stat = fs.lstatSync(source_path);
        } catch (err) {
          const code = err && /** @type {any} */ (err).code;
          if (code === 'ENOENT') {
            worktree_entries.push({
              path: relative_path,
              type: 'deleted',
              mode: null,
              sha256: null
            });
            continue;
          }
          throw new ArchiveError('file_observation_failed');
        }
        if (!stat.isFile() && !stat.isSymbolicLink()) {
          throw new ArchiveError('unsupported_file_type');
        }
        const observed = checksumEntry(fs, source_path);
        worktree_entries.push({
          path: relative_path,
          type: observed.type,
          mode: gitModeClass(observed),
          sha256: observed.sha256
        });
      }
      let patches;
      try {
        patches = {
          index: sha256(git(worktree, [...INDEX_PATCH_ARGS])),
          worktree: sha256(git(worktree, [...WORKTREE_PATCH_ARGS]))
        };
      } catch {
        throw new ArchiveError('patch_create_failed');
      }
      return {
        ok: true,
        inventory: { index, worktree: worktree_entries, patches }
      };
    } catch (err) {
      return {
        ok: false,
        reason:
          err instanceof ArchiveError
            ? err.reason
            : 'inventory_observation_failed'
      };
    }
  }

  /**
   * The inventory a verified archive's manifest carries, or null.
   *
   * @param {string} archive_path
   * @returns {unknown}
   */
  function readManifestInventory(archive_path) {
    try {
      return (
        JSON.parse(
          fs.readFileSync(path.join(archive_path, 'manifest.json'), 'utf8')
        ).inventory ?? null
      );
    } catch {
      return null;
    }
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
        !Array.isArray(manifest.files) ||
        (manifest.index_files !== undefined &&
          !Array.isArray(manifest.index_files))
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
      // Archives written before index copies existed carry no `index_files`.
      for (const entry of manifest.index_files || []) {
        if (entry.type !== 'blob') {
          continue;
        }
        const file = safePath(path.join(archive_path, 'index'), entry.path);
        const observed = checksumEntry(fs, file);
        if (
          observed.type !== 'file' ||
          observed.mode !== entry.mode ||
          observed.size !== entry.size ||
          observed.sha256 !== entry.sha256
        ) {
          return { ok: false, reason: 'index_checksum_mismatch' };
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
   * Pick where an inventory-bound archive goes (UI-w2ou §3.3): the first of
   * `<id>`, `<id>-1`, … that either holds a verified archive whose manifest
   * inventory equals `expected` (reuse it) or does not exist yet (create it).
   * A differing or broken archive is stepped past and never touched.
   *
   * @param {string} workspace
   * @param {string} operation_id
   * @param {unknown} expected
   * @returns {{ reused: { ok: true, reused: true, receipt: { path: string, manifest_sha256: string, verified_at: number }, inventory: WorktreeInventory } }|{ reused: null, operation_id: string }|null}
   */
  function resolveInventoryTarget(workspace, operation_id, expected) {
    for (let suffix = 0; suffix <= MAX_ARCHIVE_ID_SUFFIX; suffix += 1) {
      const candidate_id =
        suffix === 0 ? operation_id : `${operation_id}-${suffix}`;
      const candidate = discardBackupDir(workspace, candidate_id);
      if (!fs.existsSync(candidate)) {
        return { reused: null, operation_id: candidate_id };
      }
      const existing = verify(candidate);
      const inventory = existing.ok ? readManifestInventory(candidate) : null;
      if (existing.ok && sameInventory(inventory, expected)) {
        return {
          reused: {
            ...existing,
            reused: true,
            inventory: /** @type {WorktreeInventory} */ (inventory)
          }
        };
      }
    }
    return null;
  }

  /**
   * @param {{ workspace: string, operation_id: string, repo: string, worktree: string, target_base: string, source_head: string, source_snapshot: Record<string, unknown>, session_log_path?: string|null, expected_inventory?: WorktreeInventory }} input
   * `expected_inventory` binds the archive to content: an existing same-id
   * archive is reused only when its manifest inventory equals it, and the
   * result then carries the manifest's own inventory.
   * @returns {{ ok: true, reused?: boolean, receipt: { path: string, manifest_sha256: string, verified_at: number }, inventory?: WorktreeInventory }|{ ok: false, reason: string, temp_path?: string }}
   */
  function create(input) {
    let operation_id = input.operation_id;
    const bound = input.expected_inventory !== undefined;
    if (bound) {
      const target = resolveInventoryTarget(
        input.workspace,
        input.operation_id,
        input.expected_inventory
      );
      if (target === null) {
        return { ok: false, reason: 'archive_exists_invalid' };
      }
      if (target.reused) {
        return target.reused;
      }
      operation_id = target.operation_id;
    }
    const final_path = discardBackupDir(input.workspace, operation_id);
    const temp_path = `${final_path}.tmp`;
    if (!bound && fs.existsSync(final_path)) {
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
      const { orphan_gitlinks } = classifySubmodules(input.worktree);
      const orphan_gitlink_set = new Set(orphan_gitlinks);
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
          git(input.worktree, [...INDEX_PATCH_ARGS]),
          'patch'
        );
        writeArtifact(
          'worktree.patch',
          git(input.worktree, [...WORKTREE_PATCH_ARGS]),
          'patch'
        );
      } catch (err) {
        if (err instanceof ArchiveError) {
          throw err;
        }
        throw new ArchiveError('patch_create_failed');
      }

      const listed = listInventoryPaths(input.worktree);
      const index_map = readIndexMap(input.worktree);
      /** @type {Array<{ path: string, type: string, git_mode: string|null, oid: string|null, mode: number|null, size: number, sha256: string|null }>} */
      const index_files = [];
      for (const relative_path of listed.staged) {
        if (orphan_gitlink_set.has(relative_path)) {
          continue;
        }
        const entry = index_map.get(relative_path);
        if (entry === undefined || entry === 'unmerged') {
          index_files.push({
            path: relative_path,
            type: entry === 'unmerged' ? 'unmerged' : 'deleted',
            git_mode: null,
            oid: null,
            mode: null,
            size: 0,
            sha256: null
          });
          continue;
        }
        const contents = readIndexBlob(input.worktree, entry);
        const destination = safePath(
          path.join(temp_path, 'index'),
          relative_path
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, contents);
        const observed = checksumEntry(fs, destination);
        index_files.push({
          path: relative_path,
          type: 'blob',
          git_mode: entry.mode,
          oid: entry.oid,
          mode: observed.mode,
          size: observed.size,
          sha256: observed.sha256
        });
      }

      const relative_paths = listed.worktree;
      /** @type {Array<{ path: string, type: string, mode: number|null, size: number, sha256: string|null }>} */
      const files = [];
      for (const relative_path of relative_paths) {
        if (orphan_gitlink_set.has(relative_path)) {
          continue;
        }
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

      // Computed from the bytes actually copied, so content that changed
      // during the copy shows up as a manifest that no longer matches the
      // worktree (UI-w2ou §3.2 step 4).
      /**
       * @param {string} artifact_path
       * @returns {string}
       */
      const artifactSha = (artifact_path) =>
        String(
          artifacts.find((artifact) => artifact.path === artifact_path)?.sha256
        );
      /** @type {WorktreeInventory} */
      const inventory = {
        index: index_files.map((entry) => ({
          path: entry.path,
          type: entry.type,
          mode: entry.git_mode,
          sha256: entry.sha256
        })),
        worktree: files.map((entry) => ({
          path: entry.path,
          type: entry.type,
          mode: gitModeClass(entry),
          sha256: entry.sha256
        })),
        patches: {
          index: artifactSha('index.patch'),
          worktree: artifactSha('worktree.patch')
        }
      };

      const created_at = now();
      const manifest = {
        schema_version: ARCHIVE_SCHEMA_VERSION,
        operation_id,
        created_at,
        source_snapshot: input.source_snapshot,
        commit_range: {
          target_base: input.target_base,
          source_head: input.source_head,
          ahead_count
        },
        excluded: ['git-ignored', 'dependency-build-output'],
        orphan_gitlinks,
        failures: [],
        artifacts,
        files,
        index_files,
        inventory
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
      return bound ? { ...final_check, inventory } : final_check;
    } catch (err) {
      return {
        ok: false,
        reason:
          err instanceof ArchiveError ? err.reason : 'archive_create_failed',
        temp_path
      };
    }
  }

  /**
   * Back up a completed worktree's undelivered content before its cleanup
   * deletes it (UI-w2ou §3.3). History is not part of it: the branch head is
   * either contained in the delivered base or kept by the branch archive, so
   * the commit range is empty and the archive holds patches and copies only.
   *
   * @param {{ workspace: string, archive_id: string, repo: string, worktree: string, branch: string, branch_head_sha: string, delivered_sha: string, inventory: WorktreeInventory }} input
   * @returns {{ ok: true, reused: boolean, receipt: { path: string, manifest_sha256: string, file_count: number }, inventory: WorktreeInventory }|{ ok: false, reason: string }}
   */
  function createWorktree(input) {
    const created = create({
      workspace: input.workspace,
      operation_id: input.archive_id,
      repo: input.repo,
      worktree: input.worktree,
      target_base: input.branch_head_sha,
      source_head: input.branch_head_sha,
      source_snapshot: {
        mode: 'completed-worktree',
        repo: input.repo,
        worktree: input.worktree,
        branch: input.branch,
        branch_head_sha: input.branch_head_sha,
        delivered_sha: input.delivered_sha
      },
      expected_inventory: input.inventory
    });
    if (!created.ok) {
      return { ok: false, reason: created.reason };
    }
    if (!created.inventory) {
      return { ok: false, reason: 'archive_inventory_missing' };
    }
    return {
      ok: true,
      reused: created.reused === true,
      receipt: {
        path: created.receipt.path,
        manifest_sha256: created.receipt.manifest_sha256,
        file_count: inventoryPathCount(created.inventory)
      },
      inventory: created.inventory
    };
  }

  /**
   * @param {{ workspace: string, archive_id: string, repo: string, ref: string, base_oid: string, branch_head_sha: string }} input
   * @returns {{ ok: true, reused?: boolean, receipt: { path: string, manifest_sha256: string, verified_at: number }}|{ ok: false, reason: string, temp_path?: string }}
   */
  function createBranch(input) {
    const final_path = discardBackupDir(input.workspace, input.archive_id);
    const temp_path = `${final_path}.tmp`;
    if (fs.existsSync(final_path)) {
      const existing = verify(final_path);
      if (!existing.ok) {
        return { ok: false, reason: 'archive_exists_invalid' };
      }
      try {
        const manifest = JSON.parse(
          fs.readFileSync(path.join(final_path, 'manifest.json'), 'utf8')
        );
        if (
          manifest.mode !== 'branch-only' ||
          manifest.source_snapshot?.repo !== input.repo ||
          manifest.source_snapshot?.ref !== input.ref ||
          manifest.source_snapshot?.base_oid !== input.base_oid ||
          manifest.source_snapshot?.branch_head_sha !== input.branch_head_sha
        ) {
          return { ok: false, reason: 'archive_exists_invalid' };
        }
      } catch {
        return { ok: false, reason: 'archive_exists_invalid' };
      }
      return { ...existing, reused: true };
    }
    try {
      if (
        typeof input.repo !== 'string' ||
        typeof input.ref !== 'string' ||
        !/^refs\/heads\/[A-Za-z0-9._/-]+$/.test(input.ref) ||
        !/^[0-9a-f]{40,64}$/i.test(input.base_oid) ||
        !/^[0-9a-f]{40,64}$/i.test(input.branch_head_sha)
      ) {
        throw new ArchiveError('branch_archive_input_invalid');
      }
      fs.mkdirSync(path.dirname(final_path), { recursive: true });
      fs.rmSync(temp_path, { recursive: true, force: true });
      fs.mkdirSync(temp_path, { recursive: true });

      let ahead_count;
      try {
        const observed_head = git(input.repo, ['rev-parse', input.ref])
          .toString('utf8')
          .trim();
        if (observed_head !== input.branch_head_sha) {
          throw new ArchiveError('source_head_changed');
        }
        ahead_count = Number(
          git(input.repo, [
            'rev-list',
            '--count',
            `${input.base_oid}..${input.ref}`
          ])
            .toString('utf8')
            .trim()
        );
      } catch (err) {
        if (err instanceof ArchiveError) {
          throw err;
        }
        throw new ArchiveError('commit_range_observation_failed');
      }
      if (!Number.isInteger(ahead_count) || ahead_count <= 0) {
        throw new ArchiveError('commit_range_observation_failed');
      }

      const bundle_path = path.join(temp_path, 'commits.bundle');
      try {
        git(input.repo, [
          'bundle',
          'create',
          bundle_path,
          input.ref,
          `^${input.base_oid}`
        ]);
        const bundled_head = git(input.repo, [
          'bundle',
          'list-heads',
          bundle_path,
          input.ref
        ])
          .toString('utf8')
          .trim();
        const observed_after = git(input.repo, ['rev-parse', input.ref])
          .toString('utf8')
          .trim();
        if (
          bundled_head !== `${input.branch_head_sha} ${input.ref}` ||
          observed_after !== input.branch_head_sha
        ) {
          throw new ArchiveError('source_head_changed');
        }
        git(input.repo, ['bundle', 'verify', bundle_path]);
      } catch (err) {
        throw err instanceof ArchiveError
          ? err
          : new ArchiveError('bundle_create_failed');
      }
      const artifacts = [
        {
          path: 'commits.bundle',
          kind: 'bundle',
          ...checksumEntry(fs, bundle_path)
        }
      ];
      const manifest = {
        schema_version: ARCHIVE_SCHEMA_VERSION,
        operation_id: input.archive_id,
        created_at: now(),
        mode: 'branch-only',
        topology: 'branch',
        source_snapshot: {
          repo: input.repo,
          ref: input.ref,
          base_oid: input.base_oid,
          branch_head_sha: input.branch_head_sha
        },
        commit_range: {
          target_base: input.base_oid,
          source_head: input.branch_head_sha,
          ahead_count
        },
        excluded: [
          'worktree-patch',
          'index-patch',
          'untracked-files',
          'submodule-and-special-file-checks'
        ],
        failures: [],
        artifacts,
        files: []
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
          err instanceof ArchiveError
            ? err.reason
            : 'branch_archive_create_failed',
        temp_path
      };
    }
  }

  /**
   * Preserve immutable evidence when a cleanup-failed merged source is already
   * absent. This intentionally makes no dirty/untracked recovery claim.
   *
   * @param {{ workspace: string, operation_id: string, source_snapshot: Record<string, unknown>, session_log_path?: string|null }} input
   */
  function createCommittedSource(input) {
    const final_path = discardBackupDir(input.workspace, input.operation_id);
    const temp_path = `${final_path}.tmp`;
    if (fs.existsSync(final_path)) {
      const existing = verify(final_path);
      return existing.ok
        ? { ...existing, reused: true }
        : { ok: false, reason: 'archive_exists_invalid' };
    }
    try {
      const source = input.source_snapshot;
      if (
        !source ||
        source.preexisting_absent !== true ||
        typeof source.repo !== 'string' ||
        typeof source.source_head !== 'string' ||
        !/^[0-9a-f]{40}$/i.test(source.source_head)
      ) {
        throw new ArchiveError('committed_source_archive_invalid');
      }
      fs.mkdirSync(path.dirname(final_path), { recursive: true });
      fs.rmSync(temp_path, { recursive: true, force: true });
      fs.mkdirSync(temp_path, { recursive: true });
      /** @type {Array<{ path: string, kind: string, mode: number, size: number, sha256: string }>} */
      const artifacts = [];
      const bundle_path = path.join(temp_path, 'commits.bundle');
      const archive_ref = `refs/bdui/discard-archives/${String(
        input.operation_id
      ).replace(/[^A-Za-z0-9._-]/g, '_')}`;
      /** @type {ArchiveError|null} */
      let bundle_error = null;
      try {
        git(source.repo, ['update-ref', archive_ref, source.source_head]);
        git(source.repo, ['bundle', 'create', bundle_path, archive_ref]);
        git(source.repo, ['bundle', 'verify', bundle_path]);
      } catch {
        bundle_error = new ArchiveError('bundle_create_failed');
      }
      try {
        git(source.repo, ['update-ref', '-d', archive_ref, source.source_head]);
      } catch {
        bundle_error ??= new ArchiveError('archive_ref_cleanup_failed');
      }
      if (bundle_error) {
        throw bundle_error;
      }
      artifacts.push({
        path: 'commits.bundle',
        kind: 'bundle',
        ...checksumEntry(fs, bundle_path)
      });
      if (input.session_log_path && fs.existsSync(input.session_log_path)) {
        const source_log = checksumEntry(fs, input.session_log_path);
        if (source_log.type !== 'file') {
          throw new ArchiveError('session_log_invalid');
        }
        const destination = path.join(temp_path, 'session.jsonl');
        fs.copyFileSync(input.session_log_path, destination);
        artifacts.push({
          path: 'session.jsonl',
          kind: 'session',
          ...checksumEntry(fs, destination)
        });
      }
      const manifest = {
        schema_version: ARCHIVE_SCHEMA_VERSION,
        operation_id: input.operation_id,
        created_at: now(),
        mode: 'committed-source',
        topology: 'preexisting_absent',
        source_snapshot: source,
        excluded: ['dirty-and-untracked-unavailable'],
        failures: [],
        artifacts,
        files: []
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
      return verify(final_path);
    } catch (err) {
      return {
        ok: false,
        reason:
          err instanceof ArchiveError
            ? err.reason
            : 'committed_source_archive_failed',
        temp_path
      };
    }
  }

  return {
    create,
    createBranch,
    createCommittedSource,
    createWorktree,
    observeInventory,
    verify
  };
}

/**
 * Quiesce an owned runner, create/verify its archive under the repository
 * topology lock, then persist the receipt. Failure deliberately sends no CONT:
 * the fenced operation and frozen artifacts remain available for same-id retry.
 *
 * `announceFailure` is the discard coordinator's own announce seam (UI-e98l):
 * this function writes durable discard failures the coordinator's `fail()`
 * never sees, so without it an archive-stage failure stays silent.
 *
 * @param {{ workspace: string, operation: any, store: any, processController: any, withTopologyLock: (work: () => any) => any, createArchive: () => any, announceFailure?: (bead_id: unknown, reason: string) => void }} input
 * @returns {Promise<any>}
 */
export async function archiveDiscardSource(input) {
  const { operation } = input;
  const identity = operation?.process_identity || null;

  /**
   * Report one durable discard-failure write to the coordinator's announce
   * seam. Only a write that LANDED is a terminal fact — `failDiscardOperation`
   * is a CAS, and a refused or unwired write left no record a push could be
   * about. The guard keeps this seam NO-THROW for a callback that breaks its
   * own contract.
   *
   * @param {any} written
   * @param {string} reason
   */
  function announceIfWritten(written, reason) {
    if (!written?.ok) {
      return;
    }
    try {
      input.announceFailure?.(operation.bead_id, reason);
    } catch {
      // NO-THROW: a broken notifier never becomes a discard failure.
    }
  }
  if (identity) {
    const observed = input.processController.probe(identity);
    if (observed.state === 'unknown') {
      const reason = observed.reason || 'identity_unknown';
      announceIfWritten(
        input.store.failDiscardOperation?.(input.workspace, {
          operation_id: operation.operation_id,
          expected_phase: operation.phase,
          reason
        }),
        reason
      );
      return { ok: false, reason };
    }
    if (observed.state === 'owned') {
      const stopped = input.processController.signal(identity, 'SIGSTOP');
      if (!stopped.ok) {
        const reason = stopped.reason || `identity_${stopped.state}`;
        announceIfWritten(
          input.store.failDiscardOperation?.(input.workspace, {
            operation_id: operation.operation_id,
            expected_phase: operation.phase,
            reason
          }),
          reason
        );
        return { ok: false, reason };
      }
    }
  }
  const archived = await input.withTopologyLock(() => input.createArchive());
  if (!archived.ok) {
    announceIfWritten(
      input.store.failDiscardOperation?.(input.workspace, {
        operation_id: operation.operation_id,
        expected_phase: operation.phase,
        reason: archived.reason
      }),
      archived.reason
    );
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
