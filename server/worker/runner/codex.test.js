import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import { codexSpec, spawnCodex } from './codex.js';
import { makeFixtureSpawn } from './fixture-spawn.js';

const OK_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/codex-success.jsonl', import.meta.url)
);
const FAIL_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/codex-failure.jsonl', import.meta.url)
);

const BEAD = { id: 'UI-2' };
const WS = '/tmp/ws';

describe('runner/codex verdict', () => {
  test('success: rc 0 + turn.completed, no failure', async () => {
    const spawn_impl = makeFixtureSpawn({ file: OK_FIXTURE, exit: 0 });
    const handle = spawnCodex(BEAD, WS, { model: 'gpt-5.6' }, { spawn_impl });
    const v = await handle.done;
    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
    const text = v.events.find((e) => e.kind === 'text');
    expect(text?.text).toBe('pong');
  });

  test('builds codex argv with --skip-git-repo-check + reasoning effort', async () => {
    const spawn_impl = makeFixtureSpawn({ file: OK_FIXTURE, exit: 0 });
    await spawnCodex(
      BEAD,
      WS,
      { model: 'gpt-5.6', effort: 'high' },
      { spawn_impl }
    ).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('codex');
    expect(call.args.slice(0, 2)).toEqual(['exec', '--json']);
    expect(call.args).toContain('-m');
    expect(call.args).toContain('-c');
    expect(call.args).toContain('model_reasoning_effort=high');
    expect(call.args).toContain('--skip-git-repo-check');
  });

  test('failure: turn.failed/error present → not success', async () => {
    const spawn_impl = makeFixtureSpawn({ file: FAIL_FIXTURE, exit: 1 });
    const v = await spawnCodex(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    // exit is checked first.
    expect(v.reason).toBe('exit');
    const err = v.events.find((e) => e.kind === 'error');
    expect(err).toBeTruthy();
  });

  test('failure verdict on rc 0 but turn.failed present', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({ type: 'turn.started' }),
        JSON.stringify({ type: 'turn.failed', error: { message: 'boom' } })
      ],
      exit: 0
    });
    const v = await spawnCodex(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    expect(v.reason).toBe('turn_failed');
  });
});

describe('runner/codex fail-closed (approval → blocker + group kill)', () => {
  test('approval item emits blocker and group-kills via negative pid', async () => {
    const spawn_impl = makeFixtureSpawn({
      pid: 6006,
      lines: [
        JSON.stringify({ type: 'turn.started' }),
        JSON.stringify({
          type: 'item.completed',
          item: { id: 'i0', type: 'approval_request', message: 'run rm?' }
        }),
        JSON.stringify({ type: 'turn.completed', usage: {} })
      ],
      exit: 0
    });
    const kill_impl = vi.fn();
    const v = await spawnCodex(BEAD, WS, {}, { spawn_impl, kill_impl }).done;
    expect(v.blocked).toBe(true);
    expect(v.success).toBe(false);
    expect(kill_impl).toHaveBeenCalledWith(-6006, 'SIGTERM');
  });

  test('a plain codex error is a failure, NOT a fail-closed question', async () => {
    const spawn_impl = makeFixtureSpawn({ file: FAIL_FIXTURE, exit: 1 });
    const v = await spawnCodex(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.blocked).toBe(false);
  });
});

describe('runner/codex session id (spec §2)', () => {
  test('extractSessionId reads thread_id from a thread.started line only', () => {
    const spec = codexSpec();
    expect(
      spec.extractSessionId?.({ type: 'thread.started', thread_id: 'th-019f' })
    ).toBe('th-019f');
    expect(spec.extractSessionId?.({ type: 'turn.started' })).toBeNull();
    expect(spec.extractSessionId?.({ type: 'thread.started' })).toBeNull();
  });

  test('the engine emits session_id exactly once (first thread.started wins)', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({ type: 'thread.started', thread_id: 'th-1' }),
        JSON.stringify({ type: 'thread.started', thread_id: 'th-2' }),
        JSON.stringify({ type: 'turn.completed', usage: {} })
      ],
      exit: 0
    });
    /** @type {string[]} */
    const ids = [];
    const handle = spawnCodex(BEAD, WS, {}, { spawn_impl });
    handle.events.on('session_id', (id) => ids.push(id));
    await handle.done;
    expect(ids).toEqual(['th-1']);
  });
});

describe('runner/codex resume argv (spec §1.4)', () => {
  test('resume_session_id switches to `exec resume <thread_id> --json`', async () => {
    const spawn_impl = makeFixtureSpawn({ file: OK_FIXTURE, exit: 0 });
    await spawnCodex(BEAD, WS, { resume_session_id: 'th-019f' }, { spawn_impl })
      .done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('codex');
    expect(call.args.slice(0, 4)).toEqual([
      'exec',
      'resume',
      'th-019f',
      '--json'
    ]);
    expect(call.args).toContain('--skip-git-repo-check');
  });

  test('no resume subcommand without a resume_session_id (first launch)', async () => {
    const spawn_impl = makeFixtureSpawn({ file: OK_FIXTURE, exit: 0 });
    await spawnCodex(BEAD, WS, {}, { spawn_impl }).done;
    expect(spawn_impl.captured.calls[0].args.slice(0, 2)).toEqual([
      'exec',
      '--json'
    ]);
  });
});
