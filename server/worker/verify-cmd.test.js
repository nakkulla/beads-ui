import { describe, expect, test } from 'vitest';
import { runVerifyCmd } from './verify-cmd.js';

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
