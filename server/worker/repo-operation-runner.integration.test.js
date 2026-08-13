import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { repoOperationMarkerPath } from './state-paths.js';

/** @type {string} */
let root;

/**
 * @param {string} marker_path
 */
function runnerMarkerExit(marker_path) {
  return JSON.parse(fs.readFileSync(marker_path, 'utf8')).exit_code;
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-operation-runner-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/** @param {() => unknown} check */
async function eventually(check) {
  for (let index = 0; index < 80; index += 1) {
    try {
      check();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  check();
}

describe('RepoOperation runner', () => {
  test('runs shell-free with a pinned environment and writes an atomic terminal marker', async () => {
    const script = path.join(root, 'script.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nsetTimeout(() => { console.log(JSON.stringify(process.env)); console.error("stderr"); }, 100);\n'
    );
    fs.chmodSync(script, 0o755);
    const runner = createRepoOperationRunner({
      processController: {
        capture: () => ({
          ok: true,
          identity: { pid: 1, pgid: 1, started_at: 1 }
        }),
        probe: () => ({ state: 'owned' }),
        signal: () => ({ ok: true, state: 'owned' }),
        terminate: async () => ({ ok: true, state: 'gone', forced: false })
      }
    });
    const started = runner.start({
      workspace: root,
      operation_id: 'op',
      attempt_id: 'one',
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: 2_000
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;
    if (typeof started.log_path !== 'string') return;

    await eventually(() =>
      expect(runner.readMarker(root, 'op', 'one')?.exit_code).toBe(0)
    );
    const log = fs.readFileSync(started.log_path, 'utf8');
    const environment = JSON.parse(log.split('\n')[0]);
    expect(
      Object.keys(environment)
        .filter((key) => key !== '__CF_USER_TEXT_ENCODING')
        .sort()
    ).toEqual([
      'HOME',
      'PATH',
      'REPO_OPS_REPO_ROOT',
      'REPO_OPS_TARGET_BASE',
      'REPO_OPS_TARGET_SHA'
    ]);
    expect(log).toContain('stderr');
  });

  test('records exit 124 after killing a timed-out script process group', async () => {
    const script = path.join(root, 'sleeper.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nsetTimeout(() => {}, 10000);\n'
    );
    fs.chmodSync(script, 0o755);
    const runner = createRepoOperationRunner({
      processController: {
        capture: () => ({
          ok: true,
          identity: { pid: 1, pgid: 1, started_at: 1 }
        }),
        probe: () => ({ state: 'owned' }),
        signal: () => ({ ok: true, state: 'owned' }),
        terminate: async () => ({ ok: true, state: 'gone', forced: false })
      }
    });

    const started = runner.start({
      workspace: root,
      operation_id: 'slow',
      attempt_id: 'one',
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: 200
    });

    expect(started.ok).toBe(true);
    await eventually(() =>
      expect(runner.readMarker(root, 'slow', 'one')?.exit_code).toBe(124)
    );
  });

  test('keeps the operation process alive after its launching parent dies', async () => {
    const script = path.join(root, 'survivor.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nsetTimeout(() => { console.log("survived"); }, 500);\n'
    );
    fs.chmodSync(script, 0o755);
    const child_path = fileURLToPath(
      new URL('./repo-operation-runner-child.js', import.meta.url)
    );
    const log_path = path.join(root, 'survivor.log');
    const marker_path = repoOperationMarkerPath(root, 'survivor', 'one');
    const parent_path = path.join(root, 'parent.cjs');
    fs.writeFileSync(
      parent_path,
      "const { spawn } = require('node:child_process');\n" +
        'const child = spawn(process.execPath, [process.argv[2], process.argv[3]], {\n' +
        "  detached: true, stdio: 'ignore'\n" +
        '});\nchild.unref();\n'
    );
    const payload = JSON.stringify({
      script_path: script,
      cwd: root,
      env: {
        REPO_OPS_TARGET_SHA: 'a'.repeat(40),
        REPO_OPS_TARGET_BASE: 'main',
        REPO_OPS_REPO_ROOT: root
      },
      log_path,
      marker_path,
      timeout_ms: 5000
    });

    execFileSync(process.execPath, [parent_path, child_path, payload]);

    expect(fs.existsSync(marker_path)).toBe(false);
    await eventually(() => expect(runnerMarkerExit(marker_path)).toBe(0));
    expect(fs.readFileSync(log_path, 'utf8')).toContain('survived');
  });

  test('does not read a stale marker from another attempt', () => {
    const runner = createRepoOperationRunner();
    const marker = repoOperationMarkerPath(root, 'op', 'one');
    fs.mkdirSync(path.dirname(marker), { recursive: true });
    fs.writeFileSync(
      marker,
      JSON.stringify({
        exit_code: 0,
        signal: null,
        started_at: 1,
        finished_at: 2
      })
    );
    expect(runner.readMarker(root, 'op', 'one')?.exit_code).toBe(0);
    expect(runner.readMarker(root, 'op', 'two')).toBeNull();
  });
});
