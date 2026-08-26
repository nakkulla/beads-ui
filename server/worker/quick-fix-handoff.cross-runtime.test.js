import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

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

  test.each(CASES.map((entry) => [entry.name, entry]))('%s', (_name, entry) => {
    const issue = /** @type {HandoffCase} */ (entry).issue;
    const issue_json = path.join(tmp_dir, 'issue.json');
    fs.writeFileSync(issue_json, JSON.stringify(issue), 'utf8');

    const run = spawnSync(
      /** @type {string} */ (PYTHON),
      [
        CHECKER,
        'UI-r7or',
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
    expect({ state: report.state, missing: report.missing }).toEqual(
      /** @type {HandoffCase} */ (entry).expect
    );
  });
});
