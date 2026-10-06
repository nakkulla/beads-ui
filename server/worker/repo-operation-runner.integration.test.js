import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import {
  parseRepoOperationLog,
  scanBoundaryLines,
  stripBoundaryLines
} from './repo-operation-log.js';
import { createRepoOperationRunner } from './repo-operation-runner.js';
import { repoOperationMarkerPath } from './state-paths.js';

// These tests spawn REAL node processes and wait for the marker a detached
// grandchild writes after its own sleep. One test costs ~1s on an idle machine,
// and this file is one of 282 the suite runs in parallel — under that load the
// default 5s per-test budget is not patience, it is a coin flip. The assertions
// are unchanged; only the waiting is sized for the load the suite creates.
vi.setConfig({ testTimeout: 30_000 });

/**
 * How long {@link eventually} may wait for a REAL spawned process to reach an
 * observable state. The poll returns the moment the check passes, so an idle
 * machine pays nothing for the headroom.
 */
const PROCESS_WAIT_MS = 15_000;

/**
 * Kill budget for a spawned script the test expects to RUN TO COMPLETION.
 * The script's own sleep is under a second; the rest is node startup under
 * suite load. The deliberate-timeout test keeps its own tiny budget.
 *
 * Must stay below {@link PROCESS_WAIT_MS}: the child is detached, so a budget
 * larger than the observation window would leave it writing into a directory
 * afterEach has already removed.
 */
const SCRIPT_BUDGET_MS = 10_000;

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

/**
 * @param {() => unknown} check
 * @param {number} [timeout_ms]
 */
async function eventually(check, timeout_ms = PROCESS_WAIT_MS) {
  const deadline = Date.now() + timeout_ms;
  while (Date.now() < deadline) {
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
    const started = await runner.start({
      workspace: root,
      operation_id: 'op',
      attempt_id: 'one',
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: SCRIPT_BUDGET_MS
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;
    if (typeof started.log_path !== 'string') return;

    await eventually(() =>
      expect(runner.readMarker(root, 'op', 'one')?.exit_code).toBe(0)
    );
    // The runner's attempt boundary lines (UI-i8cy §5.1) frame the script
    // output; what the script itself printed is the log without them.
    const log = stripBoundaryLines(fs.readFileSync(started.log_path)).toString(
      'utf8'
    );
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

    const started = await runner.start({
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
      timeout_ms: SCRIPT_BUDGET_MS
    });

    execFileSync(process.execPath, [parent_path, child_path, payload]);

    expect(fs.existsSync(marker_path)).toBe(false);
    await eventually(() => expect(runnerMarkerExit(marker_path)).toBe(0));
    expect(fs.readFileSync(log_path, 'utf8')).toContain('survived');
  });

  test('restarted worker adopts the live operation and settles its real marker', async () => {
    const script = path.join(root, 'adopted.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nsetTimeout(() => { console.log("done"); }, 700);\n'
    );
    fs.chmodSync(script, 0o755);
    const runner_a = createRepoOperationRunner();
    const store_a = createQueueStore({
      filePathFor: (workspace) => path.join(workspace, 'queue.json')
    });
    store_a.ensureRepoOperation(root, {
      operation_id: 'op-adopt',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: 'a'.repeat(40) }],
      effective_base_sha: 'a'.repeat(40),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'c'.repeat(40)
    });
    const attempt_id =
      store_a.snapshot(root).repo_operations['op-adopt'].attempt_id;
    const started = await runner_a.start({
      workspace: root,
      operation_id: 'op-adopt',
      attempt_id,
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: SCRIPT_BUDGET_MS
    });
    expect(started.ok).toBe(true);
    if (!started.ok || !started.process_identity) return;
    store_a.startRepoOperation(root, {
      operation_id: 'op-adopt',
      attempt_id,
      process_identity: started.process_identity,
      log_path: started.log_path ?? '',
      target_sha: 'a'.repeat(40)
    });

    // A "restarted" Worker: fresh store and coordinator instances that only
    // share the durable queue file and marker directory on disk.
    const store_b = createQueueStore({
      filePathFor: (workspace) => path.join(workspace, 'queue.json')
    });
    const coordinator = createRepoOperationCoordinator({
      workspace: root,
      repo: root,
      store: store_b,
      locks: createLockManager(),
      gitRun: async () => ({ code: 0, stdout: '', stderr: '' }),
      deployWorktree: /** @type {never} */ ({
        bindTarget: async () => ({ ok: true, target_sha: 'a'.repeat(40) }),
        ensureAligned: async () => ({ ok: true, path: root }),
        verifyAligned: async () => ({ ok: true })
      })
    });

    await coordinator.reconcile(root);
    const adopted = store_b.snapshot(root).repo_operations['op-adopt'];
    expect(adopted.state).toBe('running');

    await eventually(() => {
      expect(
        fs.existsSync(repoOperationMarkerPath(root, 'op-adopt', attempt_id))
      ).toBe(true);
    });
    await coordinator.reconcile(root);
    expect(store_b.snapshot(root).repo_operations['op-adopt']).toMatchObject({
      state: 'succeeded',
      exit_code: 0
    });
  });

  test('frames two runs of one operation with two start/end pairs in order', async () => {
    const script = path.join(root, 'twice.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nconsole.log("run");\nprocess.exitCode = 1;\n'
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
    /** @type {string} */
    let log_path = '';
    for (const attempt_id of ['op-twice:1', 'op-twice:2']) {
      const started = await runner.start({
        workspace: root,
        operation_id: 'op-twice',
        attempt_id,
        script_path: script,
        cwd: root,
        target_sha: 'a'.repeat(40),
        target_base: 'main',
        timeout_ms: SCRIPT_BUDGET_MS
      });
      if (started.ok && typeof started.log_path === 'string') {
        log_path = started.log_path;
      }
      await eventually(() =>
        expect(runner.readMarker(root, 'op-twice', attempt_id)?.exit_code).toBe(
          1
        )
      );
    }

    const boundaries = scanBoundaryLines(fs.readFileSync(log_path));

    expect(
      boundaries.map((entry) => [entry.event, entry.payload.attempt_id])
    ).toEqual([
      ['start', 'op-twice:1'],
      ['end', 'op-twice:1'],
      ['start', 'op-twice:2'],
      ['end', 'op-twice:2']
    ]);
    expect(
      parseRepoOperationLog(fs.readFileSync(log_path)).attempts.map(
        (attempt) => [attempt.exit_code, attempt.lines]
      )
    ).toEqual([
      [1, ['run']],
      [1, ['run']]
    ]);
  });

  test('marks an end line sep after output that ended without a newline', async () => {
    const script = path.join(root, 'no-newline.js');
    fs.writeFileSync(
      script,
      '#!/usr/bin/env node\nprocess.stdout.write("unterminated");\n'
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
    const started = await runner.start({
      workspace: root,
      operation_id: 'op-sep',
      attempt_id: 'one',
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: SCRIPT_BUDGET_MS
    });
    if (!started.ok || typeof started.log_path !== 'string') {
      throw new Error('runner did not start');
    }
    await eventually(() =>
      expect(runner.readMarker(root, 'op-sep', 'one')?.exit_code).toBe(0)
    );

    const bytes = fs.readFileSync(started.log_path);
    const end_line = scanBoundaryLines(bytes).find(
      (entry) => entry.event === 'end'
    );

    expect(end_line?.payload.sep).toBe(true);
    expect(stripBoundaryLines(bytes).toString('utf8')).toBe('unterminated');
  });

  test('records timed_out on the end line of a killed script', async () => {
    const script = path.join(root, 'slow-boundary.js');
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
    const started = await runner.start({
      workspace: root,
      operation_id: 'op-slow-boundary',
      attempt_id: 'one',
      script_path: script,
      cwd: root,
      target_sha: 'a'.repeat(40),
      target_base: 'main',
      timeout_ms: 200
    });
    if (!started.ok || typeof started.log_path !== 'string') {
      throw new Error('runner did not start');
    }
    await eventually(() =>
      expect(
        runner.readMarker(root, 'op-slow-boundary', 'one')?.exit_code
      ).toBe(124)
    );

    const attempts = parseRepoOperationLog(
      fs.readFileSync(started.log_path)
    ).attempts;

    expect(attempts).toHaveLength(1);
    expect(attempts[0]).toMatchObject({ exit_code: 124, timed_out: true });
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
