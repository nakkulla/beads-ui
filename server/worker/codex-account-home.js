import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Read a path without following a final symlink.
 *
 * @param {string} target
 */
async function lstatOrNull(target) {
  try {
    return await fs.lstat(target);
  } catch (error) {
    const fs_error = /** @type {NodeJS.ErrnoException} */ (error);
    if (fs_error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Compare an existing symlink with its required literal target.
 *
 * @param {string} link_path
 * @param {string} expected_target
 */
async function linkMatches(link_path, expected_target) {
  return (await fs.readlink(link_path)) === expected_target;
}

/**
 * Whether a non-symlink mirror entry is one codex could have created itself.
 * Only a real file or directory qualifies; a FIFO, socket, or device node is
 * not a shape this mirror ever produces, so it stays fail-closed.
 *
 * @param {import('node:fs').Stats} entry_stat
 */
function isPrivateEntry(entry_stat) {
  return entry_stat.isFile() || entry_stat.isDirectory();
}

/**
 * Create a mirror link, accepting a concurrent creator after reinspection.
 *
 * @param {string} link_path
 * @param {string} expected_target
 * @param {string} name
 * @returns {Promise<{ ok: true }|{ ok: false, reason: 'codex_home_prepare_failed', detail: string }>}
 */
async function ensureMirrorLink(link_path, expected_target, name) {
  const existing = await lstatOrNull(link_path);
  if (existing) {
    if (!existing.isSymbolicLink()) {
      return isPrivateEntry(existing)
        ? { ok: true }
        : {
            ok: false,
            reason: 'codex_home_prepare_failed',
            detail: `mirror_link_mismatch:${name}`
          };
    }
    return (await linkMatches(link_path, expected_target))
      ? { ok: true }
      : {
          ok: false,
          reason: 'codex_home_prepare_failed',
          detail: `mirror_link_mismatch:${name}`
        };
  }
  try {
    await fs.symlink(expected_target, link_path);
    return { ok: true };
  } catch (error) {
    const fs_error = /** @type {NodeJS.ErrnoException} */ (error);
    if (fs_error.code !== 'EEXIST') {
      throw error;
    }
    const raced = await lstatOrNull(link_path);
    if (!raced || !raced.isSymbolicLink()) {
      return raced && isPrivateEntry(raced)
        ? { ok: true }
        : {
            ok: false,
            reason: 'codex_home_prepare_failed',
            detail: `mirror_link_mismatch:${name}`
          };
    }
    return (await linkMatches(link_path, expected_target))
      ? { ok: true }
      : {
          ok: false,
          reason: 'codex_home_prepare_failed',
          detail: `mirror_link_mismatch:${name}`
        };
  }
}

/**
 * Replace `auth.json` through a same-directory temporary symlink and rename.
 *
 * @param {string} auth_path
 * @param {string} auth_file
 */
async function replaceAuthLink(auth_path, auth_file) {
  const temp_path = path.join(
    path.dirname(auth_path),
    `.auth.json.${process.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`
  );
  await fs.symlink(auth_file, temp_path);
  try {
    await fs.rename(temp_path, auth_path);
  } catch (error) {
    try {
      await fs.unlink(temp_path);
    } catch {
      // The rename may already have consumed the private temporary link.
    }
    throw error;
  }
}

/**
 * Prepare one fail-closed Codex account HOME mirror.
 *
 * @param {{ key: string, auth_file: string, codex_root: string, home_dir: string }} input
 * @returns {Promise<{ ok: true, home_dir: string }|{ ok: false, reason: 'codex_home_prepare_failed', detail: string }>}
 */
export async function prepareCodexAccountHome(input) {
  const { auth_file, codex_root, home_dir } = input;
  try {
    const auth_stat = await lstatOrNull(auth_file);
    if (!auth_stat || !auth_stat.isFile() || auth_stat.isSymbolicLink()) {
      return {
        ok: false,
        reason: 'codex_home_prepare_failed',
        detail: 'auth_file_not_regular'
      };
    }

    let home_stat = await lstatOrNull(home_dir);
    if (!home_stat) {
      try {
        await fs.mkdir(home_dir, { recursive: true, mode: 0o700 });
      } catch (error) {
        const fs_error = /** @type {NodeJS.ErrnoException} */ (error);
        if (fs_error.code !== 'EEXIST') {
          throw error;
        }
      }
      home_stat = await lstatOrNull(home_dir);
    }
    if (!home_stat || !home_stat.isDirectory() || home_stat.isSymbolicLink()) {
      return {
        ok: false,
        reason: 'codex_home_prepare_failed',
        detail: 'home_not_directory'
      };
    }

    const entries = await fs.readdir(codex_root);
    for (const name of entries) {
      if (name === 'auth.json') {
        continue;
      }
      const expected_target = path.join(codex_root, name);
      const mirror = await ensureMirrorLink(
        path.join(home_dir, name),
        expected_target,
        name
      );
      if (!mirror.ok) {
        return mirror;
      }
    }

    const auth_path = path.join(home_dir, 'auth.json');
    const mirrored_auth = await lstatOrNull(auth_path);
    if (mirrored_auth && !mirrored_auth.isSymbolicLink()) {
      return {
        ok: false,
        reason: 'codex_home_prepare_failed',
        detail: 'auth_json_not_symlink'
      };
    }
    if (!mirrored_auth || !(await linkMatches(auth_path, auth_file))) {
      await replaceAuthLink(auth_path, auth_file);
    }
    return { ok: true, home_dir };
  } catch (error) {
    const fs_error = /** @type {NodeJS.ErrnoException} */ (error);
    return {
      ok: false,
      reason: 'codex_home_prepare_failed',
      detail: `filesystem_error:${fs_error.code || 'unknown'}`
    };
  }
}
