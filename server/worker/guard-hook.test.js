import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  envFor,
  install,
  pushLogPath,
  readPushLog,
  remove,
  renderHookScript
} from './guard-hook.js';
import { guardHookDir } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
const ATTEMPT = 'UI-8mvc-1700000000-1';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-guard-hook-unit-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('guard-hook install', () => {
  test('writes an executable pre-push script into the attempt dir', () => {
    const result = install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    expect(result.ok).toBe(true);
    expect(result.dir).toBe(guardHookDir(WS, ATTEMPT));
    expect(fs.statSync(String(result.hook_path)).mode & 0o111).toBe(0o111);
  });

  test('bakes repo and base into the script as shell literals', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'ilsun/dev'
    });

    const script = fs.readFileSync(
      path.join(guardHookDir(WS, ATTEMPT), 'pre-push'),
      'utf8'
    );

    expect(script).toContain("guard_repo='/repo'");
    expect(script).toContain("guard_ref='refs/heads/ilsun/dev'");
  });

  test('quotes a base carrying shell metacharacters', () => {
    const script = renderHookScript({
      repo: "/re'po",
      target_base: "dev'; rm -rf /; echo '",
      attempt_id: ATTEMPT,
      push_log: '/tmp/pushes.jsonl'
    });

    // Every interpolated value stays inside ONE single-quoted literal, so no
    // metacharacter can become syntax.
    expect(script).toContain(`guard_repo='/re'\\''po'`);
    expect(script).toContain(
      `guard_ref='refs/heads/dev'\\''; rm -rf /; echo '\\'''`
    );
  });

  test('refuses to install without a repo subject', () => {
    const result = install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '',
      target_base: 'main'
    });

    expect(result).toEqual({ ok: false, reason: 'guard_hook_subject_missing' });
  });

  test('refuses to install without a base subject', () => {
    const result = install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: ''
    });

    expect(result).toEqual({ ok: false, reason: 'guard_hook_subject_missing' });
  });

  test('reports a mkdir failure instead of throwing', () => {
    const fake_fs = /** @type {any} */ ({
      mkdirSync: vi.fn(() => {
        throw new Error('EACCES');
      })
    });

    const result = install(
      {
        workspace: WS,
        attempt_id: ATTEMPT,
        repo: '/repo',
        target_base: 'main'
      },
      { fs: fake_fs }
    );

    expect(result).toEqual({ ok: false, reason: 'guard_hook_mkdir_failed' });
  });

  test('leaves NO residue when the script write fails after the mkdir', () => {
    const real_write = fs.writeFileSync;
    const spy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('ENOSPC');
    });

    const result = install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    expect(result).toEqual({ ok: false, reason: 'guard_hook_write_failed' });
    // A hook dir with no `pre-push` in it would still be pointed at by
    // core.hooksPath — disabling the repo's hooks while protecting nothing.
    expect(fs.existsSync(guardHookDir(WS, ATTEMPT))).toBe(false);
    spy.mockRestore();
    expect(fs.writeFileSync).toBe(real_write);
  });
});

describe('guard-hook push log (UI-1xcd §4.1)', () => {
  test('install initializes an EMPTY push log beside the hook', () => {
    const result = install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    expect(result.ok).toBe(true);
    expect(pushLogPath(WS, ATTEMPT)).toBe(
      path.join(guardHookDir(WS, ATTEMPT), 'pushes.jsonl')
    );
    expect(fs.readFileSync(pushLogPath(WS, ATTEMPT), 'utf8')).toBe('');
  });

  // The migration boundary: a file that EXISTS means the new hook ran, so
  // "no push recorded" is a fact. Absent means the attempt predates the
  // deployment, which is unobservable rather than innocent.
  test('reads an initialized-but-empty log as ok with no entries', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    expect(readPushLog({ workspace: WS, attempt_id: ATTEMPT })).toEqual({
      ok: true,
      entries: []
    });
  });

  test('reports absence for an attempt that never had a log', () => {
    expect(
      readPushLog({ workspace: WS, attempt_id: 'legacy-attempt' })
    ).toEqual({ ok: false, reason: 'absent' });
  });

  test('parses the recorded push lines in order', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });
    fs.appendFileSync(
      pushLogPath(WS, ATTEMPT),
      `${JSON.stringify({
        local_ref: 'refs/heads/UI-1',
        local_oid: 'a'.repeat(40),
        remote_ref: 'refs/heads/main',
        remote_oid: 'b'.repeat(40)
      })}\n${JSON.stringify({
        local_ref: 'refs/heads/UI-1',
        local_oid: 'c'.repeat(40),
        remote_ref: 'refs/heads/UI-1',
        remote_oid: '0'.repeat(40)
      })}\n`
    );

    const read = readPushLog({ workspace: WS, attempt_id: ATTEMPT });

    expect(read.ok).toBe(true);
    expect((read.ok ? read.entries : []).map((e) => e.remote_ref)).toEqual([
      'refs/heads/main',
      'refs/heads/UI-1'
    ]);
  });

  test('skips an unparseable line instead of failing the whole read', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });
    fs.appendFileSync(
      pushLogPath(WS, ATTEMPT),
      `not json\n${JSON.stringify({ remote_ref: 'refs/heads/main' })}\n`
    );

    const read = readPushLog({ workspace: WS, attempt_id: ATTEMPT });

    expect(read.ok ? read.entries : []).toHaveLength(1);
  });

  test('the script appends every judged line before it decides', () => {
    const script = renderHookScript({
      repo: '/repo',
      target_base: 'main',
      attempt_id: ATTEMPT,
      push_log: '/state/pushes.jsonl'
    });

    expect(script).toContain("guard_push_log='/state/pushes.jsonl'");
    // Recorded BEFORE the refusal branch: a refused push is evidence too.
    const record_at = script.indexOf('guard_record');
    const refuse_at = script.indexOf('refusing push to');
    expect(record_at).toBeGreaterThan(-1);
    expect(record_at).toBeLessThan(refuse_at);
    // An append failure must never turn into a failed push.
    expect(script).toContain('|| :');
  });

  test('removing the attempt tree removes the push log with it', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    remove({ workspace: WS, attempt_id: ATTEMPT });

    expect(fs.existsSync(pushLogPath(WS, ATTEMPT))).toBe(false);
  });
});

describe('guard-hook envFor', () => {
  test('returns the three GIT_CONFIG keys at index 0 with no inherited count', () => {
    const env = envFor({ workspace: WS, attempt_id: ATTEMPT }, { env: {} });

    expect(env).toEqual({
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'core.hooksPath',
      GIT_CONFIG_VALUE_0: guardHookDir(WS, ATTEMPT)
    });
  });

  test('appends at the next index when a count is inherited', () => {
    const env = envFor(
      { workspace: WS, attempt_id: ATTEMPT },
      { inherited_count: '2' }
    );

    // Overwriting COUNT with `1` would silently drop the parent's KEY_1 pair.
    expect(env.GIT_CONFIG_COUNT).toBe('3');
    expect(env.GIT_CONFIG_KEY_2).toBe('core.hooksPath');
    expect(env.GIT_CONFIG_VALUE_2).toBe(guardHookDir(WS, ATTEMPT));
  });

  test('reads the inherited count off the given environment', () => {
    const env = envFor(
      { workspace: WS, attempt_id: ATTEMPT },
      { env: { GIT_CONFIG_COUNT: '4' } }
    );

    expect(env.GIT_CONFIG_COUNT).toBe('5');
    expect(env.GIT_CONFIG_KEY_4).toBe('core.hooksPath');
  });

  test('treats an unparseable inherited count as absent', () => {
    const env = envFor(
      { workspace: WS, attempt_id: ATTEMPT },
      { inherited_count: 'not-a-number' }
    );

    expect(env.GIT_CONFIG_COUNT).toBe('1');
    expect(env.GIT_CONFIG_KEY_0).toBe('core.hooksPath');
  });
});

describe('guard-hook remove', () => {
  test('deletes the attempt hook tree', () => {
    install({
      workspace: WS,
      attempt_id: ATTEMPT,
      repo: '/repo',
      target_base: 'main'
    });

    const removed = remove({ workspace: WS, attempt_id: ATTEMPT });

    expect(removed).toBe(true);
    expect(fs.existsSync(guardHookDir(WS, ATTEMPT))).toBe(false);
  });

  test('is a no-op for an attempt that never installed one', () => {
    expect(remove({ workspace: WS, attempt_id: 'never-installed' })).toBe(true);
  });

  test('reports a cleanup failure instead of throwing', () => {
    const fake_fs = /** @type {any} */ ({
      rmSync: vi.fn(() => {
        throw new Error('EBUSY');
      })
    });

    expect(
      remove({ workspace: WS, attempt_id: ATTEMPT }, { fs: fake_fs })
    ).toBe(false);
  });
});
