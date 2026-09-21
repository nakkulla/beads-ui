import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse, stringify } from 'smol-toml';
import { preToolHookGroup } from './guard-hook.js';

/**
 * @param {any} value
 * @returns {any}
 */
function canonicalValue(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalValue);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalValue(value[key])])
    );
  }
  return value;
}

/**
 * Match Codex's fingerprint of the entire matcher group, not one handler.
 *
 * @param {string} event_name
 * @param {{ matcher?: string, hooks: any[] }} group
 */
export function codexHookHash(event_name, group) {
  const hooks = group.hooks.map((handler) => ({
    type: handler.type ?? 'command',
    command: handler.command,
    timeout: Math.max(1, handler.timeout ?? 600),
    async: !!handler.async,
    ...(handler.statusMessage == null
      ? {}
      : { statusMessage: handler.statusMessage }),
    ...(handler.additionalContextLimit == null ||
    handler.additionalContextLimit === 2500
      ? {}
      : { additionalContextLimit: handler.additionalContextLimit })
  }));
  const canonical = canonicalValue({
    event_name,
    hooks,
    ...(group.matcher == null ? {} : { matcher: group.matcher })
  });
  return `sha256:${crypto.createHash('sha256').update(JSON.stringify(canonical)).digest('hex')}`;
}

/**
 * @param {string} file
 */
async function readOptional(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code === 'ENOENT') {
      return '';
    }
    throw error;
  }
}

/**
 * Make a private attempt HOME, preserving user hooks and their existing trust.
 * A preparation error leaves the caller on its original HOME with a warning.
 *
 * @param {{ base_home: string, parent_dir: string, hook_path: string }} input
 * @returns {Promise<{ ok: true, home_dir: string }|{ ok: false, reason: 'codex_hook_not_loaded' }>}
 */
export async function prepareCodexGuardHome(input) {
  try {
    const base_home = path.resolve(input.base_home);
    const hooks_path = path.join(base_home, 'hooks.json');
    const config_path = path.join(base_home, 'config.toml');
    const hooks_text = await readOptional(hooks_path);
    const config_text = await readOptional(config_path);
    const hooks_file = hooks_text ? JSON.parse(hooks_text) : {};
    const config = /** @type {any} */ (parse(config_text));
    const hook_group = preToolHookGroup(input.hook_path, 'codex');
    hooks_file.hooks ??= {};
    hooks_file.hooks.PreToolUse ??= [];
    const group_index = hooks_file.hooks.PreToolUse.length;
    hooks_file.hooks.PreToolUse.push(hook_group);

    await fs.mkdir(input.parent_dir, { recursive: true });
    const home_dir = await fs.mkdtemp(
      path.join(input.parent_dir, 'codex-home-')
    );
    await fs.chmod(home_dir, 0o700);
    for (const name of await fs.readdir(base_home)) {
      if (name !== 'hooks.json' && name !== 'config.toml') {
        await fs.symlink(path.join(base_home, name), path.join(home_dir, name));
      }
    }
    /** @type {Record<string, any>} */
    const states = {};
    for (const file of ['hooks.json', 'config.toml']) {
      const original = path.join(base_home, file);
      const real = await fs.realpath(original).catch(() => original);
      const link = await fs
        .readlink(original)
        .then((target) => path.resolve(base_home, target))
        .catch(() => original);
      for (const [key, value] of Object.entries(config.hooks?.state || {})) {
        const source = [original, link, real].find((candidate) =>
          key.startsWith(`${candidate}:`)
        );
        if (source) {
          states[`${path.join(home_dir, file)}${key.slice(source.length)}`] =
            value;
        }
      }
    }
    states[
      `${path.join(home_dir, 'hooks.json')}:pre_tool_use:${group_index}:0`
    ] = {
      trusted_hash: codexHookHash('pre_tool_use', hook_group),
      enabled: true
    };
    const state_text = Object.entries(states)
      .map(
        ([key, value]) =>
          `\n[hooks.state.${JSON.stringify(key)}]\n${stringify(value)}`
      )
      .join('');
    await fs.writeFile(
      path.join(home_dir, 'hooks.json'),
      `${JSON.stringify(hooks_file, null, 2)}\n`,
      { mode: 0o600 }
    );
    await fs.writeFile(
      path.join(home_dir, 'config.toml'),
      `${config_text}\n${state_text}`,
      { mode: 0o600 }
    );
    return { ok: true, home_dir };
  } catch {
    return { ok: false, reason: 'codex_hook_not_loaded' };
  }
}

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

/**
 * The per-account `auth.json` path inside one codex root. Shared so the health
 * probe reads the SAME file the launch mirror does — a probe on the default
 * account would report on a pool nothing is held on.
 *
 * @param {string} codex_root
 * @param {string} key
 */
export function codexAccountAuthFile(codex_root, key) {
  const encoded_key = Buffer.from(key, 'utf8').toString('base64url');
  return path.join(codex_root, 'accounts', `${encoded_key}.auth.json`);
}
