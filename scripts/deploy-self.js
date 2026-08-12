#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SHA_RE = /^[0-9a-f]{40}$/;
const HEALTH_ATTEMPTS = 50;
const HEALTH_POLL_MS = 100;

/**
 * @param {NodeJS.ProcessEnv|Record<string, string|undefined>} env
 */
function defaultRuntimePointerPath(env) {
  const configured_data_home = String(env.XDG_DATA_HOME || '');
  const data_home = configured_data_home.trim()
    ? configured_data_home
    : path.join(env.HOME || '', '.local', 'share');
  return path.join(data_home, 'bdui', 'runtime', 'beads-ui', 'current');
}

/**
 * @param {number} ms
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {any} result
 */
function succeeded(result) {
  return !result.error && result.status === 0;
}

/**
 * @param {NodeJS.ProcessEnv|Record<string, string|undefined>} env
 * @param {any} run_sync
 */
function defaultHealthUrl(env, run_sync) {
  const configured_url = String(env.BDUI_DEPLOY_HEALTH_URL || '').trim();
  if (configured_url) {
    return configured_url;
  }
  let host = String(env.BDUI_HOST || '').trim();
  if (!host) {
    const result = run_sync('ts-ip', [], {
      encoding: 'utf8',
      shell: false
    });
    if (succeeded(result)) {
      host = String(result.stdout || '').trim();
    }
  }
  return host ? `http://${host}:3000/healthz` : '';
}

/**
 * Run the provider-owned exact-candidate deployment command. This deliberately
 * has no journal, receipt, marker, or helper authority: success is the live
 * process's own `/healthz` identity.
 *
 * @param {{ cwd?: string, env?: Record<string, string|undefined>, fs_impl?: any, run_sync?: any, fetch_impl?: any, sleep?: (ms: number) => Promise<void> }} [input]
 * @returns {Promise<{ ok: true, sha: string, release_path: string }|{ ok: false, reason: string }>}
 */
export async function deploySelf(input = {}) {
  const env = input.env || process.env;
  const fs_impl = input.fs_impl || fs;
  const run_sync = input.run_sync || spawnSync;
  const fetch_impl = input.fetch_impl || fetch;
  const sleep = input.sleep || delay;
  const cwd = path.resolve(input.cwd || process.cwd());
  const target_sha = String(env.BDUI_DEPLOY_TARGET_SHA || '').toLowerCase();
  if (!SHA_RE.test(target_sha)) {
    return { ok: false, reason: 'candidate_sha_invalid' };
  }
  /** @type {string} */
  let release_path;
  try {
    release_path = fs_impl.realpathSync(cwd);
  } catch {
    return { ok: false, reason: 'candidate_path_unavailable' };
  }
  const head = run_sync('git', ['rev-parse', 'HEAD'], {
    cwd: release_path,
    encoding: 'utf8',
    shell: false
  });
  if (!succeeded(head)) {
    return { ok: false, reason: 'candidate_head_unavailable' };
  }
  if (
    String(head.stdout || '')
      .trim()
      .toLowerCase() !== target_sha
  ) {
    return { ok: false, reason: 'candidate_sha_mismatch' };
  }
  const status = run_sync(
    'git',
    ['status', '--porcelain', '--untracked-files=no'],
    {
      cwd: release_path,
      encoding: 'utf8',
      shell: false
    }
  );
  if (!succeeded(status)) {
    return { ok: false, reason: 'candidate_status_unavailable' };
  }
  if (String(status.stdout || '').trim().length > 0) {
    return { ok: false, reason: 'candidate_dirty' };
  }
  const install = run_sync('npm', ['ci'], {
    cwd: release_path,
    encoding: 'utf8',
    shell: false
  });
  if (!succeeded(install)) {
    return { ok: false, reason: 'dependency_install_failed' };
  }
  const build = run_sync('npm', ['run', 'build'], {
    cwd: release_path,
    encoding: 'utf8',
    shell: false
  });
  if (!succeeded(build)) {
    return { ok: false, reason: 'build_failed' };
  }
  const pointer_path = path.resolve(
    String(env.BDUI_DEPLOY_RUNTIME_CURRENT || defaultRuntimePointerPath(env))
  );
  const pointer_parent = path.dirname(pointer_path);
  const temporary_pointer = path.join(
    pointer_parent,
    `.${path.basename(pointer_path)}.new`
  );
  try {
    fs_impl.mkdirSync(pointer_parent, { recursive: true });
    fs_impl.rmSync(temporary_pointer, { force: true, recursive: true });
    fs_impl.symlinkSync(release_path, temporary_pointer, 'junction');
    fs_impl.renameSync(temporary_pointer, pointer_path);
  } catch {
    try {
      fs_impl.rmSync(temporary_pointer, { force: true, recursive: true });
    } catch {
      // The pointer publish failure remains the actionable result.
    }
    return { ok: false, reason: 'runtime_pointer_publish_failed' };
  }
  const restart = run_sync('bdui-shared', ['restart'], {
    cwd: release_path,
    encoding: 'utf8',
    shell: false
  });
  if (!succeeded(restart)) {
    return { ok: false, reason: 'runtime_restart_failed' };
  }
  const health_url = defaultHealthUrl(env, run_sync);
  if (!health_url) {
    return { ok: false, reason: 'runtime_health_endpoint_unavailable' };
  }
  for (let attempt = 0; attempt < HEALTH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch_impl(health_url, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(2_000)
      });
      const body = response.ok ? await response.json() : null;
      const runtime = body && typeof body === 'object' ? body.runtime : null;
      if (
        runtime &&
        typeof runtime === 'object' &&
        runtime.source_sha === target_sha &&
        typeof runtime.source_repo === 'string' &&
        fs_impl.realpathSync(runtime.source_repo) === release_path
      ) {
        return { ok: true, sha: target_sha, release_path };
      }
    } catch {
      // Restart races are expected until the bounded poll is exhausted.
    }
    if (attempt + 1 < HEALTH_ATTEMPTS) {
      await sleep(HEALTH_POLL_MS);
    }
  }
  return { ok: false, reason: 'runtime_health_mismatch' };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await deploySelf();
  if (!result.ok) {
    process.stderr.write(`deploy-self failed: ${result.reason}\n`);
    process.exitCode = 1;
  }
}
