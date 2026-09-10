import nodeFs from 'node:fs';
import path from 'node:path';

/**
 * @typedef {Object} WorktreeContainer
 * @property {string} path
 * @property {string} realpath
 */

/**
 * Prepare and validate the repository's logical worktree container.
 *
 * A pre-existing `.worktrees` symlink wins. Otherwise, a real
 * `.worktrees.nosync` directory opts the repository into a relative symlink.
 * Existing content is never moved or removed recursively.
 *
 * @param {string} repo
 * @param {typeof import('node:fs')} [fs]
 * @returns {WorktreeContainer}
 */
export function prepareWorktreeContainer(repo, fs = nodeFs) {
  const repo_path = path.resolve(repo);
  const container_path = path.join(repo_path, '.worktrees');
  const nosync_path = path.join(repo_path, '.worktrees.nosync');
  const container_entry = readEntry(fs, container_path);

  if (container_entry?.isSymbolicLink()) {
    return validateContainer(fs, container_path);
  }
  if (container_entry && !container_entry.isDirectory()) {
    throw invalidPath(container_path, 'must be a directory or symbolic link');
  }

  const nosync_entry = readEntry(fs, nosync_path);
  if (!nosync_entry) {
    if (!container_entry) {
      fs.mkdirSync(container_path, { recursive: true });
    }
    return validateContainer(fs, container_path);
  }
  if (!nosync_entry.isDirectory()) {
    throw invalidPath(nosync_path, 'must be a real directory');
  }

  const nosync_realpath = validateDirectory(fs, nosync_path);
  if (container_entry) {
    const entries = fs.readdirSync(container_path);
    if (entries.length > 0) {
      throw invalidPath(
        container_path,
        `must be empty before using ${nosync_path}`
      );
    }
    fs.rmdirSync(container_path);
  }

  try {
    fs.symlinkSync('.worktrees.nosync', container_path, 'dir');
  } catch (err) {
    if (!isSameNosyncLink(fs, container_path, nosync_realpath)) {
      throw invalidPath(
        container_path,
        `could not link to ${nosync_path}`,
        err
      );
    }
  }

  const prepared = validateContainer(fs, container_path);
  if (prepared.realpath !== nosync_realpath) {
    throw invalidPath(
      container_path,
      `must resolve to ${nosync_path}, resolved to ${prepared.realpath}`
    );
  }
  return prepared;
}

/**
 * @param {typeof import('node:fs')} fs
 * @param {string} entry_path
 * @returns {import('node:fs').Stats|null}
 */
function readEntry(fs, entry_path) {
  try {
    return fs.lstatSync(entry_path);
  } catch (err) {
    if (isMissing(err)) {
      return null;
    }
    throw invalidPath(entry_path, 'could not be inspected', err);
  }
}

/**
 * @param {typeof import('node:fs')} fs
 * @param {string} container_path
 * @returns {WorktreeContainer}
 */
function validateContainer(fs, container_path) {
  return {
    path: container_path,
    realpath: validateDirectory(fs, container_path)
  };
}

/**
 * @param {typeof import('node:fs')} fs
 * @param {string} directory_path
 * @returns {string}
 */
function validateDirectory(fs, directory_path) {
  let realpath;
  try {
    realpath = fs.realpathSync(directory_path);
  } catch (err) {
    throw invalidPath(
      directory_path,
      'must resolve to an existing directory',
      err
    );
  }
  let stat;
  try {
    stat = fs.statSync(realpath);
  } catch (err) {
    throw invalidPath(directory_path, 'must be an accessible directory', err);
  }
  if (!stat.isDirectory()) {
    throw invalidPath(directory_path, 'must resolve to a directory');
  }
  return realpath;
}

/**
 * @param {typeof import('node:fs')} fs
 * @param {string} container_path
 * @param {string} nosync_realpath
 * @returns {boolean}
 */
function isSameNosyncLink(fs, container_path, nosync_realpath) {
  try {
    return (
      fs.lstatSync(container_path).isSymbolicLink() &&
      validateDirectory(fs, container_path) === nosync_realpath
    );
  } catch {
    return false;
  }
}

/**
 * @param {unknown} err
 * @returns {boolean}
 */
function isMissing(err) {
  return (
    err instanceof Error &&
    'code' in err &&
    /** @type {{ code?: string }} */ (err).code === 'ENOENT'
  );
}

/**
 * @param {string} entry_path
 * @param {string} detail
 * @param {unknown} [cause]
 * @returns {Error}
 */
function invalidPath(entry_path, detail, cause) {
  return new Error(`Invalid worktree container ${entry_path}: ${detail}`, {
    cause
  });
}
