import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  queueFilePath,
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from '../worker/state-paths.js';
import { runRepoOpsBootstrap } from './repo-ops.js';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-bootstrap-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

describe('repo-ops-bootstrap CLI', () => {
  test('rejects incomplete approval without writing a spool request', async () => {
    /** @type {string[]} */
    const output = [];
    const code = await runRepoOpsBootstrap(['--repo', root], {
      write: (text) => output.push(text)
    });
    expect(code).toBe(2);
    expect(fs.existsSync(repoOpsSpoolPendingDir(root))).toBe(false);
    expect(output.join('')).toContain('approval basis');
  });

  test('writes only an atomic pending spool request, never queue.json', async () => {
    const pending = repoOpsSpoolPendingDir(root);
    const promise = runRepoOpsBootstrap(
      [
        '--repo',
        root,
        '--target-base',
        'main',
        '--approved-source-path',
        'repo-ops/config.toml',
        '--approved-source-sha',
        'a'.repeat(40),
        '--requested-by',
        'operator'
      ],
      { write() {} }
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    const names = fs.readdirSync(pending);
    const request_id = names[0].replace(/\.json$/, '');
    const processed = repoOpsSpoolProcessedDir(root);
    fs.mkdirSync(processed, { recursive: true });
    fs.writeFileSync(
      path.join(processed, `${request_id}.receipt.json`),
      '{"ok":true}'
    );
    const code = await promise;
    expect(code).toBe(0);
    expect(names).toHaveLength(1);
    expect(names[0]).toMatch(/\.json$/);
    expect(fs.existsSync(queueFilePath(root))).toBe(false);
  });
});
