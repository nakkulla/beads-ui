import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { SPEC_DRAFT_IDLE_LIMIT_HOURS } from './spec-authoring.js';

// Waits on a REAL python child, so wall time is process startup under the load
// the parallel suite creates, not product work.
vi.setConfig({ testTimeout: 30_000 });

/**
 * 이 파일은 게이트가 아니라 개발자 도구다. dotfiles 체크아웃·python·PyYAML이
 * 갖춰진 자리에서만 돌고, 돌 때는 계약 파일의 값을 직접 읽어 복제 상수와 비교한다.
 */
const DOTFILES_ROOT =
  process.env.DOTFILES_ROOT || path.join(os.homedir(), 'GitHub', 'dotfiles');

const CONTRACT = path.join(DOTFILES_ROOT, 'docs/contracts/workflow-state.yaml');

const READ_IDLE_LIMIT = [
  'import sys, yaml',
  'data = yaml.safe_load(open(sys.argv[1], encoding="utf-8"))',
  'def find(node):',
  '    if isinstance(node, dict):',
  '        if "draft_in_progress" in node:',
  '            return node["draft_in_progress"]',
  '        for value in node.values():',
  '            found = find(value)',
  '            if found is not None:',
  '                return found',
  '    elif isinstance(node, list):',
  '        for value in node:',
  '            found = find(value)',
  '            if found is not None:',
  '                return found',
  '    return None',
  'print(find(data)["idle_limit_hours"])'
].join('\n');

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

const PYTHON = fs.existsSync(CONTRACT) ? resolvePython() : null;

const describeCrossRuntime = PYTHON ? describe : describe.skip;

describeCrossRuntime('dotfiles draft_in_progress contract parity', () => {
  test('matches the idle limit hours of the contract', () => {
    const run = spawnSync(
      /** @type {string} */ (PYTHON),
      ['-c', READ_IDLE_LIMIT, CONTRACT],
      { encoding: 'utf8' }
    );

    expect(run.status, run.stderr).toBe(0);
    expect(Number(run.stdout.trim())).toBe(SPEC_DRAFT_IDLE_LIMIT_HOURS);
  });
});
