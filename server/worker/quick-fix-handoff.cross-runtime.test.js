import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { repairHandoffDescription } from './operation-recovery.js';
import {
  QUICK_FIX_HANDOFF_PATH,
  QUICK_FIX_HANDOFF_PROVENANCE_PATH
} from './quick-fix-handoff.js';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000 });

/**
 * 이 파일은 게이트가 아니라 개발자 도구다. dotfiles 체크아웃·python·PyYAML이
 * 갖춰진 자리에서만 돌고, 돌 때는 같은 픽스처로 두 구현을 실제로 비교한다.
 */
const FIXTURES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

/**
 * @typedef {Object} HandoffCase
 * @property {string} name
 * @property {Record<string, any>} issue
 * @property {Record<string, any>} [related]
 * @property {{ state: string, missing: string[] }} expect
 */

/** @type {HandoffCase[]} */
const CASES = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, 'quick-fix-handoff-cases.json'), 'utf8')
);

const DOTFILES_ROOT =
  process.env.DOTFILES_ROOT ||
  path.join(os.homedir(), 'Documents', 'GitHub', 'dotfiles');

const CHECKER = path.join(
  DOTFILES_ROOT,
  'src/shared/skills/flow/workflow/scripts/check-quick-fix-handoff.py'
);

const CONTRACT = path.join(DOTFILES_ROOT, 'docs/contracts/workflow-state.yaml');

/**
 * PyYAML은 시스템 python3에 없을 수 있으므로 dotfiles의 repo-local venv를 먼저
 * 본다.
 *
 * @returns {string|null}
 */
function resolvePython() {
  const candidates = [
    process.env.DOTFILES_PYTHON,
    path.join(DOTFILES_ROOT, '.venv/bin/python'),
    'python3'
  ];
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    const probe = spawnSync(candidate, ['-c', 'import yaml'], {
      stdio: 'ignore'
    });
    if (probe.status === 0) {
      return candidate;
    }
  }
  return null;
}

const PYTHON =
  fs.existsSync(CHECKER) && fs.existsSync(CONTRACT) ? resolvePython() : null;

const describeCrossRuntime = PYTHON ? describe : describe.skip;

describeCrossRuntime('dotfiles check-quick-fix-handoff parity', () => {
  /** @type {string} */
  let tmp_dir;

  beforeAll(() => {
    tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-qfh-'));
  });

  afterAll(() => {
    fs.rmSync(tmp_dir, { recursive: true, force: true });
  });

  test.each(CASES.map((entry, index) => [entry.name, entry, index]))(
    '%s',
    (_name, entry, index) => {
      const typed_entry = /** @type {HandoffCase} */ (entry);
      const issue = typed_entry.issue;
      const issue_json = path.join(tmp_dir, 'issue.json');
      fs.writeFileSync(issue_json, JSON.stringify(issue), 'utf8');

      const args = [
        CHECKER,
        typed_entry.issue.id || 'UI-r7or',
        '--verify',
        '--json',
        '--contract',
        CONTRACT,
        '--issue-json',
        issue_json
      ];
      if (typed_entry.related) {
        const related_json = path.join(tmp_dir, `related-${index}.json`);
        fs.writeFileSync(
          related_json,
          JSON.stringify(typed_entry.related),
          'utf8'
        );
        args.push('--related-json', related_json);
      }

      const run = spawnSync(/** @type {string} */ (PYTHON), args, {
        encoding: 'utf8'
      });

      expect(run.status, run.stderr).toBe(0);
      const report = JSON.parse(run.stdout);
      expect({ state: report.state, missing: report.missing }).toEqual(
        /** @type {HandoffCase} */ (entry).expect
      );
    }
  );
});

const describeDotfilesCheckout = fs.existsSync(DOTFILES_ROOT)
  ? describe
  : describe.skip;

describeDotfilesCheckout('pinned projection drift', () => {
  test('matches the local dotfiles checkout HEAD byte for byte', () => {
    const head = spawnSync('git', ['-C', DOTFILES_ROOT, 'rev-parse', 'HEAD'], {
      encoding: 'utf8'
    }).stdout.trim();
    const upstream = spawnSync(
      'git',
      [
        '-C',
        DOTFILES_ROOT,
        'show',
        `${head}:generated/contracts/quick-fix-handoff.json`
      ],
      { encoding: 'utf8' }
    );
    expect(upstream.status, upstream.stderr).toBe(0);

    const pinned_bytes = fs.readFileSync(QUICK_FIX_HANDOFF_PATH, 'utf8');
    const provenance = JSON.parse(
      fs.readFileSync(QUICK_FIX_HANDOFF_PROVENANCE_PATH, 'utf8')
    );
    const pinned_sha256 = createHash('sha256')
      .update(pinned_bytes)
      .digest('hex');
    const upstream_sha256 = createHash('sha256')
      .update(upstream.stdout)
      .digest('hex');

    // false: mismatch means the dotfiles projection moved since the pin.
    expect(
      pinned_sha256 === upstream_sha256,
      `pinned quick-fix-handoff.json is stale: provenance.source_commit=${provenance.source_commit}, ` +
        `dotfiles checkout HEAD=${head}, pinned sha256=${pinned_sha256}, checkout sha256=${upstream_sha256}. ` +
        'Repin with `git -C <dotfiles> show origin/main:generated/contracts/quick-fix-handoff.json > ' +
        'generated/contracts/quick-fix-handoff.json` and recompute provenance (see spec §2.2).'
    ).toBe(true);
  });
});

describeCrossRuntime('repair handoff body parity', () => {
  /** @type {string} */
  let parity_tmp_dir;

  beforeAll(() => {
    parity_tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-qfh-parity-'));
  });

  afterAll(() => {
    fs.rmSync(parity_tmp_dir, { recursive: true, force: true });
  });

  test('repairHandoffDescription output clears the canonical checker', () => {
    const description = repairHandoffDescription({
      operation_id: 'op-parity',
      operation: {
        repo_id: '/repo',
        kind: 'deploy',
        target_sha: 'a'.repeat(40),
        target_base: 'main',
        effective_base_sha: 'b'.repeat(40),
        script_blob_sha: 'c'.repeat(40),
        script_mode: '100755',
        script_path: 'repo-ops/script/deploy',
        log_path: '/logs/op.log',
        exit_code: 2,
        subjects: [{ bead_id: 'UI-source' }],
        failure: { code: 'script_failed', summary: 'npm ERR! Test failed' }
      }
    });
    const issue = {
      id: 'UI-parity',
      issue_type: 'bug',
      metadata: { route: 'quick_fix' },
      description
    };
    const issue_json = path.join(parity_tmp_dir, 'recovery-issue.json');
    fs.writeFileSync(issue_json, JSON.stringify(issue), 'utf8');

    const run = spawnSync(
      /** @type {string} */ (PYTHON),
      [
        CHECKER,
        'UI-parity',
        '--verify',
        '--json',
        '--contract',
        CONTRACT,
        '--issue-json',
        issue_json
      ],
      { encoding: 'utf8' }
    );

    expect(run.status, run.stderr).toBe(0);
    const report = JSON.parse(run.stdout);
    expect(report.state).toBe('unreviewed');
    expect(report.missing).toEqual([]);
  });
});
