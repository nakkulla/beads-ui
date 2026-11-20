/**
 * The repo-ops verify adapter (UI-vzyh §4.4) driven as the Worker drives it:
 * the real script, the three protocol variables, and a fake `npm` on `PATH`.
 *
 * The declaration test guards the other half — a script the config does not
 * name, or names with an identity the resolver rejects, verifies nothing.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolveRepoOps } from '../../server/worker/repo-ops-resolver.js';

// This file drives REAL child processes (git, a shell, node), so its wall time
// is process startup, not product work. Measured against the whole suite running
// in parallel, tests here reach ~4s — against a 5s default that is a coin flip,
// and the repo-ops verify gate is where the coin lands wrong. The assertions are
// unchanged; only the budget is sized for the load the suite actually creates.
vi.setConfig({ testTimeout: 30_000 });

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, 'verify');
const REPO_ROOT = path.dirname(path.dirname(HERE));

/** @type {string[]} */
const created_roots = [];

afterEach(() => {
  while (created_roots.length > 0) {
    const root = created_roots.pop();
    if (root) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

/**
 * A stand-in for the coordinator's candidate checkout plus a fake `npm` whose
 * per-subcommand exit code the test picks.
 *
 * The ADR index and citation gates read real files, so the candidate carries
 * this repository's `docs/adr` and `AGENTS.md` — the same bytes the coordinator
 * would squash into the throwaway checkout. A test that wants the gate red
 * mutates its own copy.
 *
 * `HOME` is a fixture directory: the ADR scripts are linked in from the real
 * installation, and `bin/discord` is a fake that logs, so a warning never
 * reaches the real notification channel.
 *
 * @param {{ npm_body?: string, discord?: boolean, discord_body?: string }} [options]
 */
function fixture(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-verify-'));
  created_roots.push(root);
  const repo = path.join(root, 'candidate');
  fs.mkdirSync(repo);
  // The coordinator materializes a real checkout, and the citation gate refuses
  // a `--repo` without one, so the candidate is a git repository here too.
  spawnSync('git', ['init', '-q', repo]);
  fs.cpSync(
    path.join(REPO_ROOT, 'docs', 'adr'),
    path.join(repo, 'docs', 'adr'),
    {
      recursive: true
    }
  );
  fs.copyFileSync(
    path.join(REPO_ROOT, 'AGENTS.md'),
    path.join(repo, 'AGENTS.md')
  );

  const log = path.join(root, 'calls.log');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(
    path.join(bin, 'npm'),
    `#!/bin/sh\nprintf 'npm %s\\n' "$*" >> "$CALL_LOG"\n${options.npm_body || ''}\n`,
    'utf8'
  );
  fs.chmodSync(path.join(bin, 'npm'), 0o755);

  const home = path.join(root, 'home');
  fs.mkdirSync(path.join(home, '.claude', 'skills'), { recursive: true });
  fs.symlinkSync(
    path.join(os.homedir(), '.claude', 'skills', 'adr'),
    path.join(home, '.claude', 'skills', 'adr')
  );
  fs.mkdirSync(path.join(home, 'bin'));
  if (options.discord !== false) {
    fs.writeFileSync(
      path.join(home, 'bin', 'discord'),
      `#!/bin/sh\nprintf 'discord %s\\n' "$1 $2" >> "$CALL_LOG"\n${options.discord_body || ''}\n`,
      'utf8'
    );
    fs.chmodSync(path.join(home, 'bin', 'discord'), 0o755);
  }

  return { root, repo, bin, log, home };
}

/**
 * @param {ReturnType<typeof fixture>} env
 * @param {{ sha?: string, root?: string, cwd?: string, notify_seconds?: string }} [overrides]
 */
function run(env, overrides = {}) {
  return spawnSync(ADAPTER, [], {
    cwd: overrides.cwd || env.repo,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${env.bin}${path.delimiter}${process.env.PATH}`,
      HOME: env.home,
      CALL_LOG: env.log,
      REPO_OPS_TARGET_SHA: overrides.sha || 'a'.repeat(40),
      REPO_OPS_TARGET_BASE: 'main',
      REPO_OPS_REPO_ROOT: overrides.root || env.repo,
      REPO_OPS_VERIFY_NOTIFY_SECONDS: overrides.notify_seconds || '10'
    }
  });
}

/**
 * @param {ReturnType<typeof fixture>} env
 */
function calls(env) {
  if (!fs.existsSync(env.log)) {
    return [];
  }
  return fs.readFileSync(env.log, 'utf8').trim().split('\n').filter(Boolean);
}

/**
 * Commit the fixture's files so `git status --porcelain` can report a write to
 * a tracked path afterwards. The coordinator compares tree objects; this is the
 * same observation with a `git` command.
 *
 * @param {string} repo
 */
function commitAll(repo) {
  spawnSync('git', ['add', '-A'], { cwd: repo });
  spawnSync(
    'git',
    [
      '-c',
      'user.email=verify@example.invalid',
      '-c',
      'user.name=verify test',
      'commit',
      '-q',
      '-m',
      'candidate base'
    ],
    { cwd: repo }
  );
}

/**
 * Add an ADR file the generated index does not list.
 *
 * @param {string} repo
 */
function writeIndexDrift(repo) {
  fs.writeFileSync(
    path.join(repo, 'docs', 'adr', '9999-index-drift.md'),
    '---\nid: 9999\ntitle: drift\nstatus: accepted\ndate: 2026-01-01\nsummary: drift\n---\n',
    'utf8'
  );
}

/**
 * @param {string} repo
 * @returns {string} porcelain status text, empty when nothing changed
 */
function porcelain(repo) {
  return spawnSync('git', ['status', '--porcelain'], {
    cwd: repo,
    encoding: 'utf8'
  }).stdout.trim();
}

describe('repo-ops/script/verify', () => {
  test('runs install, type check, build and tests in order', () => {
    const env = fixture();

    const result = run(env);

    expect(result.status).toBe(0);
    expect(calls(env)).toEqual([
      'npm ci',
      'npm run tsc',
      'npm run build',
      'npm test'
    ]);
  });

  test('propagates a red build without running the suite', () => {
    const env = fixture({
      npm_body: 'if [ "$1" = run ] && [ "$2" = build ]; then exit 2; fi'
    });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('npm run build failed');
    expect(calls(env)).toEqual(['npm ci', 'npm run tsc', 'npm run build']);
  });

  test('leaves the candidate tracked tree untouched', () => {
    const env = fixture();
    commitAll(env.repo);

    const result = run(env);

    expect(result.status).toBe(0);
    expect(porcelain(env.repo)).toBe('');
  });

  test('fails on a red type check without running the suite', () => {
    const env = fixture({
      npm_body: 'if [ "$1" = run ] && [ "$2" = tsc ]; then exit 2; fi'
    });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('npm run tsc failed');
    expect(calls(env)).toEqual(['npm ci', 'npm run tsc']);
  });

  test('fails on a red suite', () => {
    const env = fixture({ npm_body: 'if [ "$1" = test ]; then exit 1; fi' });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('npm test failed');
  });

  test('fails on ADR index drift this change made before paying the install cost', () => {
    const env = fixture();
    commitAll(env.repo);
    writeIndexDrift(env.repo);

    const result = run(env);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('ADR index drift check failed');
    expect(calls(env)).toEqual([]);
  });

  test('warns on ADR index drift a change outside docs/adr did not make', () => {
    const env = fixture();
    writeIndexDrift(env.repo);
    commitAll(env.repo);
    fs.writeFileSync(path.join(env.repo, 'unrelated.js'), 'export {};\n');

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toContain(
      'repo-ops verify: warn: adr-index: ADR index drift check failed'
    );
    expect(result.stdout).toContain('repo-ops verify ok: base=main');
    expect(calls(env)).toEqual([
      'npm ci',
      'npm run tsc',
      'npm run build',
      'npm test',
      'discord --channel ops'
    ]);
  });

  test('fails on ADR index drift staged the way the coordinator squashes', () => {
    const env = fixture();
    commitAll(env.repo);
    writeIndexDrift(env.repo);
    spawnSync('git', ['add', '-A'], { cwd: env.repo });

    const result = run(env);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('ADR index drift check failed');
  });

  test('fails on ADR index drift when a staged ADR path is put back in the working tree', () => {
    const env = fixture();
    writeIndexDrift(env.repo);
    commitAll(env.repo);
    const staged = path.join(env.repo, 'docs', 'adr', 'staged-note.txt');
    fs.writeFileSync(staged, 'note\n', 'utf8');
    spawnSync('git', ['add', '--', staged], { cwd: env.repo });
    fs.rmSync(staged);

    const result = run(env);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('ADR index drift check failed');
  });

  test('carries the detail line under a validation heading into the warning', () => {
    const env = fixture();
    fs.writeFileSync(
      path.join(env.repo, 'docs', 'adr', '9999-bad-status.md'),
      '---\nid: 9999\ntitle: bad\nstatus: bogus\ndate: 2026-01-01\nsummary: bad\n---\n',
      'utf8'
    );
    commitAll(env.repo);

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toContain(
      "warn: adr-index: ADR index drift check failed: ADR validation failed (1): 9999-bad-status.md: key 'status' must be one of"
    );
  });

  test('warns on ADR index drift when the changed paths are unreadable', () => {
    const env = fixture();
    writeIndexDrift(env.repo);

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toContain('not blocking: changed paths are unknown');
  });

  test('cuts a hanging notification at its limit as a warning', () => {
    const env = fixture({ discord_body: 'sleep 30; true' });
    writeIndexDrift(env.repo);
    commitAll(env.repo);
    const started = Date.now();

    const result = run(env, { notify_seconds: '1' });

    expect(result.status).toBe(0);
    expect(result.stderr).toContain('repo-ops verify: warn: notify:');
    expect(result.stderr).toContain('timed out after 1s');
    expect(Date.now() - started).toBeLessThan(15_000);
  });

  test('warns on ADR index drift when the change is empty', () => {
    const env = fixture();
    writeIndexDrift(env.repo);
    commitAll(env.repo);

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toContain('not blocking: this change does not touch');
  });

  test('records a missing notification tool as one more warning', () => {
    const env = fixture({ discord: false });
    writeIndexDrift(env.repo);
    commitAll(env.repo);

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toContain(
      'repo-ops verify: warn: notify: cannot run'
    );
    expect(result.stderr).toContain(
      'repo-ops verify: warn: adr-index: ADR index drift check failed'
    );
  });

  test('sends no warning notification when a blocking step fails', () => {
    const env = fixture({ npm_body: 'if [ "$1" = test ]; then exit 1; fi' });
    writeIndexDrift(env.repo);
    commitAll(env.repo);

    const result = run(env);

    expect(result.status).toBe(1);
    expect(calls(env)).not.toContain('discord --channel ops');
  });

  test('fails on guidance citing an ADR that does not exist', () => {
    const env = fixture();
    commitAll(env.repo);
    fs.appendFileSync(
      path.join(env.repo, 'AGENTS.md'),
      '\n- 없는 결정을 가리키는 문장이다(ADR 9998).\n',
      'utf8'
    );

    const result = run(env);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('stale ADR guidance citation check failed');
    expect(calls(env)).toEqual([]);
  });

  test('fails on a stale citation when the change touches only CLAUDE.md', () => {
    const env = fixture();
    commitAll(env.repo);
    fs.writeFileSync(
      path.join(env.repo, 'CLAUDE.md'),
      '@AGENTS.md\n\n- 없는 결정을 가리키는 문장이다(ADR 9998).\n',
      'utf8'
    );

    const result = run(env);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('stale ADR guidance citation check failed');
    expect(calls(env)).toEqual([]);
  });

  test('warns on a stale citation a change outside its inputs did not make', () => {
    const env = fixture();
    fs.appendFileSync(
      path.join(env.repo, 'AGENTS.md'),
      '\n- 없는 결정을 가리키는 문장이다(ADR 9998).\n',
      'utf8'
    );
    commitAll(env.repo);
    fs.writeFileSync(path.join(env.repo, 'unrelated.js'), 'export {};\n');

    const result = run(env);

    expect(result.status).toBe(0);
    expect(result.stderr).toMatch(
      /repo-ops verify: warn: adr-cite: stale ADR guidance citation check failed: AGENTS\.md:\d+: missing ADR 9998/
    );
  });

  test('refuses a cwd that is not the declared repo root', () => {
    const env = fixture();

    const result = run(env, { cwd: env.root });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('cwd must equal REPO_OPS_REPO_ROOT');
    expect(calls(env)).toEqual([]);
  });

  test('refuses a target SHA that is not 40 lowercase hex', () => {
    const env = fixture();

    const result = run(env, { sha: 'HEAD' });

    expect(result.status).not.toBe(0);
    expect(calls(env)).toEqual([]);
  });

  test('is a tracked regular executable', () => {
    const stat = fs.lstatSync(ADAPTER);

    expect(stat.isFile() && !stat.isSymbolicLink()).toBe(true);
    expect(stat.mode & 0o111).toBeTruthy();
    expect(
      spawnSync('git', ['ls-files', '--stage', 'repo-ops/script/verify'], {
        cwd: REPO_ROOT,
        encoding: 'utf8'
      }).stdout.trim()
    ).toMatch(/^100755 /);
  });
});

/**
 * The Worker never reads `repo-ops/config.toml` from a working tree — it reads
 * the blob at a pinned SHA — so the declaration is asserted through the real
 * resolver at HEAD. An edit that is not committed yet is, to the Worker, not a
 * declaration at all, and this test says the same thing.
 */
describe('repo-ops/config.toml verify declaration', () => {
  /**
   * @param {string[]} args
   * @param {{ cwd: string }} options
   */
  const gitRun = async (args, options) => {
    const result = spawnSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8'
    });
    return {
      code: typeof result.status === 'number' ? result.status : 1,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    };
  };

  const headSha = () =>
    spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd: REPO_ROOT,
      encoding: 'utf8'
    }).stdout.trim();

  test('resolves the verify declaration and script identity at HEAD', async () => {
    const resolved = await resolveRepoOps({
      repo: REPO_ROOT,
      sha: headSha(),
      gitRun
    });

    expect(resolved.ok).not.toBe(false);
    expect(resolved.verify).toMatchObject({
      script: 'repo-ops/script/verify',
      timeout_ms: 600000,
      mode: '100755',
      object_type: 'blob'
    });
  });

  test('keeps the deploy declaration alongside it', async () => {
    const resolved = await resolveRepoOps({
      repo: REPO_ROOT,
      sha: headSha(),
      gitRun
    });

    expect(resolved.base).toBe('main');
    expect(resolved.deploy).toMatchObject({
      script: 'repo-ops/script/deploy'
    });
  });

  // The eligibility RULE moved out of `AGENTS.md` with the 2026-09-09
  // harness-reduction spec D7: restating the merge gate's five inputs and the
  // `impl_review` ancestry bind here made a second copy of a dotfiles-owned
  // judgment, and a session that read the copy read it as the rule. What the
  // project file still owes a session is the one BEHAVIOUR the rule implies —
  // do not wait on checks — plus the pointer to the ADR that decided it.
  test('states the check-free behaviour the declaration implies', () => {
    const agents = fs.readFileSync(path.join(REPO_ROOT, 'AGENTS.md'), 'utf8');

    expect(agents).not.toContain('저장소는 `[verify]`를 선언하지 않는다');
    expect(agents).toContain('`gh pr checks`를 호출하지 않는다');
    expect(agents).toContain('ADR UI-ny0h');
    expect(agents).toContain('repo-ops/script/verify');
  });
});
