import { describe, expect, test } from 'vitest';
import {
  detectVerifyCmd,
  resolveVerifyCmd,
  runVerifyCmd
} from './verify-cmd.js';

describe('worker/verify-cmd — independent post-merge verification runner (수용 기준 12)', () => {
  test('exit 0 → ok', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(true);
    expect(r.reason).toBe('ok');
    expect(r.exit).toBe(0);
  });

  test('non-zero exit → verify_cmd_failed with the exit code', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'process.exit(3)'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.exit).toBe(3);
  });

  test('timeout → verify_cmd_timeout (NOT overloaded onto an exit code)', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'setTimeout(() => {}, 60000)'],
      timeout_ms: 150
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_timeout');
  });

  test('unspawnable binary → verify_cmd_spawn_error (NOT code-127 overload)', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['bdui-definitely-not-a-binary-xyz'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_spawn_error');
  });

  test('an empty argv is a spawn error, never a silent pass', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_spawn_error');
  });
});

describe('worker/verify-cmd auto-detection + resolution (§2)', () => {
  /**
   * @param {Record<string, string>} files - Absolute path → file contents.
   */
  function fakeFs(files) {
    return /** @type {any} */ ({
      existsSync: (/** @type {string} */ p) => Object.hasOwn(files, p),
      readFileSync: (/** @type {string} */ p) => {
        if (!Object.hasOwn(files, p)) {
          const err = new Error('ENOENT');
          /** @type {any} */ (err).code = 'ENOENT';
          throw err;
        }
        return files[p];
      }
    });
  }

  test('package.json with scripts.test → npm test', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: { test: 'vitest' } })
    });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['npm', 'test']);
  });

  test('package.json WITHOUT scripts.test → no detection', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: {} })
    });
    expect(detectVerifyCmd('/repo', { fs })).toBeNull();
  });

  test('Cargo.toml → cargo test', () => {
    const fs = fakeFs({ '/repo/Cargo.toml': '[package]' });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['cargo', 'test']);
  });

  test('go.mod → go test ./...', () => {
    const fs = fakeFs({ '/repo/go.mod': 'module x' });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['go', 'test', './...']);
  });

  test('ambiguous toolchain (python etc.) → no detection', () => {
    const fs = fakeFs({ '/repo/requirements.txt': 'pytest' });
    expect(detectVerifyCmd('/repo', { fs })).toBeNull();
  });

  test('resolve: explicit config ALWAYS wins over detection (source=config)', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: { test: 'vitest' } })
    });
    const config = { '/repo': { cmd: ['npm', 'run', 'all'], timeout_ms: 900 } };
    const r = resolveVerifyCmd('/repo', config, { fs });
    expect(r).toEqual({
      cmd: ['npm', 'run', 'all'],
      timeout_ms: 900,
      source: 'config'
    });
  });

  test('resolve: no config → detected command with source=detected + default timeout', () => {
    const fs = fakeFs({ '/repo/go.mod': 'module x' });
    const r = resolveVerifyCmd('/repo', {}, { fs });
    expect(r).toEqual({
      cmd: ['go', 'test', './...'],
      timeout_ms: 600000,
      source: 'detected'
    });
  });

  test('resolve: neither config nor detection → null (keeps the demotion)', () => {
    const fs = fakeFs({ '/repo/requirements.txt': 'pytest' });
    expect(resolveVerifyCmd('/repo', {}, { fs })).toBeNull();
  });
});
