import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { codexNameTable } from './codex-model-list.js';

// Waits on REAL child processes (python), so wall time here is process startup
// under the load the parallel suite creates, not product work.
vi.setConfig({ testTimeout: 30_000 });

/**
 * 이 파일은 게이트가 아니라 개발자 도구다. 설치된 dotfiles 해석기
 * (`codex-models.py`)와 python3이 있는 자리에서만 돌고, 돌 때는 같은
 * `codex debug models` 픽스처로 두 구현의 이름표를 실제로 비교한다.
 */
const FIXTURES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

/**
 * @typedef {{ name: string, models: any[] }} ListCase
 */

/** @type {ListCase[]} */
const CASES = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, 'codex-model-list-cases.json'), 'utf8')
);

const RESOLVER =
  process.env.CODEX_MODELS_PY ||
  path.join(
    os.homedir(),
    '.claude',
    'skills',
    'workflow',
    'scripts',
    'codex-models.py'
  );

/**
 * @returns {boolean}
 */
function pythonAvailable() {
  const probe = spawnSync('python3', ['-c', 'import json'], {
    stdio: 'ignore'
  });
  return probe.status === 0;
}

const describeCrossRuntime =
  fs.existsSync(RESOLVER) && pythonAvailable() ? describe : describe.skip;

describeCrossRuntime('dotfiles codex-models.py parity', () => {
  /** @type {string} */
  let tmp_dir;
  /** @type {string} */
  let stub;

  beforeAll(() => {
    tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-models-'));
    stub = path.join(tmp_dir, 'codex');
    fs.writeFileSync(
      stub,
      [
        '#!/bin/sh',
        'if [ "$1" = "--version" ]; then',
        '  echo "codex-cli 0.0.0-fixture"',
        '  exit 0',
        'fi',
        'cat "$CODEX_MODELS_FIXTURE"',
        ''
      ].join('\n'),
      { mode: 0o755 }
    );
  });

  afterAll(() => {
    fs.rmSync(tmp_dir, { recursive: true, force: true });
  });

  test.each(CASES.map((entry, index) => [entry.name, entry, index]))(
    'matches the python name table for %s',
    (_name, entry, index) => {
      const typed_entry = /** @type {ListCase} */ (entry);
      const fixture = path.join(tmp_dir, `models-${index}.json`);
      fs.writeFileSync(
        fixture,
        JSON.stringify({ models: typed_entry.models }),
        'utf8'
      );

      const run = spawnSync(
        'python3',
        ['-I', RESOLVER, '--codex-bin', stub, 'list'],
        {
          encoding: 'utf8',
          env: { ...process.env, CODEX_MODELS_FIXTURE: fixture }
        }
      );

      expect(run.stdout.length, run.stderr).toBeGreaterThan(0);
      const python_table = JSON.parse(run.stdout);
      expect(codexNameTable(typed_entry.models)).toEqual({
        aliases: python_table.aliases,
        pinned: python_table.pinned,
        errors: python_table.errors
      });
    }
  );
});
