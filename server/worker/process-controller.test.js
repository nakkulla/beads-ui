import { describe, expect, test, vi } from 'vitest';
import {
  createProcessController,
  inspectProcess,
  observeProcessIdentity,
  processGroupAlive
} from './process-controller.js';

const IDENTITY = {
  pid: 4242,
  pgid: 4242,
  started_at: 1_000
};

/**
 * @param {{ inspect?: any, groupAlive?: any, signal?: any, wait?: any }} [over]
 */
function setup(over = {}) {
  const inspect =
    over.inspect ||
    vi.fn(() => ({
      ok: true,
      alive: true,
      pgid: 4242,
      started_at: 1_000
    }));
  const groupAlive = over.groupAlive || vi.fn(() => true);
  const signal = over.signal || vi.fn();
  const wait = over.wait || vi.fn(async () => {});
  const controller = createProcessController({
    inspect,
    groupAlive,
    signal,
    wait,
    start_tolerance_ms: 2_000,
    term_grace_ms: 10,
    kill_grace_ms: 5
  });
  return { controller, inspect, groupAlive, signal, wait };
}

describe('worker process controller identity', () => {
  test('observes a live process start without requiring a group leader', () => {
    const inspect = vi.fn(() => ({
      ok: true,
      alive: true,
      pgid: 4000,
      started_at: 1_000
    }));

    const result = observeProcessIdentity(4242, { inspect });

    expect(result).toEqual({
      ok: true,
      identity: { pid: 4242, process_started_at: 1_000 }
    });
  });

  test('fails closed when a live process start cannot be observed', () => {
    const inspect = vi.fn(() => ({
      ok: false,
      reason: 'ps_failed'
    }));

    const result = observeProcessIdentity(4242, { inspect });

    expect(result).toEqual({ ok: false, reason: 'ps_failed' });
  });

  test('captures a detached group leader identity', () => {
    const env = setup();

    const result = env.controller.capture(4242);

    expect(result).toEqual({ ok: true, identity: IDENTITY });
  });

  test('refuses a spawned process that is not its group leader', () => {
    const env = setup({
      inspect: vi.fn(() => ({
        ok: true,
        alive: true,
        pgid: 4000,
        started_at: 1_000
      }))
    });

    const result = env.controller.capture(4242);

    expect(result).toEqual({ ok: false, reason: 'not_group_leader' });
  });

  test('reports owned only when pid pgid and start time still match', () => {
    const env = setup();

    const result = env.controller.probe(IDENTITY);

    expect(result.state).toBe('owned');
  });

  test('reports gone when both leader and process group are absent', () => {
    const env = setup({
      inspect: vi.fn(() => ({
        ok: true,
        alive: false,
        pgid: null,
        started_at: null
      })),
      groupAlive: vi.fn(() => false)
    });

    const result = env.controller.probe(IDENTITY);

    expect(result.state).toBe('gone');
  });

  test('reports recycled when the pid start time changed', () => {
    const env = setup({
      inspect: vi.fn(() => ({
        ok: true,
        alive: true,
        pgid: 4242,
        started_at: 10_000
      }))
    });

    const result = env.controller.probe(IDENTITY);

    expect(result.state).toBe('recycled');
  });

  test('reports unknown when the leader vanished but its group remains', () => {
    const env = setup({
      inspect: vi.fn(() => ({
        ok: true,
        alive: false,
        pgid: null,
        started_at: null
      })),
      groupAlive: vi.fn(() => true)
    });

    const result = env.controller.probe(IDENTITY);

    expect(result.state).toBe('unknown');
  });

  test('reports unknown when process inspection fails', () => {
    const env = setup({
      inspect: vi.fn(() => ({ ok: false, reason: 'ps_failed' }))
    });

    const result = env.controller.probe(IDENTITY);

    expect(result).toEqual({ state: 'unknown', reason: 'ps_failed' });
  });
});

/**
 * @param {string} code
 */
function errno(code) {
  return Object.assign(new Error(code), { code });
}

describe('worker process controller zombie probes', () => {
  test('reads a zombie leader as not alive', () => {
    const exec = vi.fn(() => '4242 Z    Mon Nov  9 14:59:14 2026\n');

    const result = inspectProcess(4242, { kill: vi.fn(), exec });

    expect(result).toEqual({
      ok: true,
      alive: false,
      pgid: null,
      started_at: null
    });
  });

  test('reads a running leader with its group and start time', () => {
    const exec = vi.fn(() => '4242 Ss   Mon Nov  9 14:59:14 2026\n');

    const result = inspectProcess(4242, { kill: vi.fn(), exec });

    expect(result).toEqual({
      ok: true,
      alive: true,
      pgid: 4242,
      started_at: Date.parse('Mon Nov  9 14:59:14 2026')
    });
  });

  test('treats an EPERM group holding only zombies as absent', () => {
    const kill = vi.fn(() => {
      throw errno('EPERM');
    });
    const exec = vi.fn(() => ' 4242 Z\n 4242 Z\n  100 Ss\n');

    const result = processGroupAlive(4242, { kill, exec });

    expect(result).toBe(false);
  });

  test('keeps an EPERM group alive while a non-zombie member remains', () => {
    const kill = vi.fn(() => {
      throw errno('EPERM');
    });
    const exec = vi.fn(() => ' 4242 Z\n 4242 S\n');

    const result = processGroupAlive(4242, { kill, exec });

    expect(result).toBe(true);
  });

  test('fails closed when the EPERM group listing fails', () => {
    const kill = vi.fn(() => {
      throw errno('EPERM');
    });
    const exec = vi.fn(() => {
      throw new Error('ps failed');
    });

    const result = processGroupAlive(4242, { kill, exec });

    expect(result).toBeNull();
  });

  test('reports gone for a zombie leader whose group holds only zombies', () => {
    const kill = vi.fn(() => {
      throw errno('EPERM');
    });
    const controller = createProcessController({
      inspect: (pid) =>
        inspectProcess(pid, {
          kill: vi.fn(),
          exec: () => '4242 Z    Mon Nov  9 14:59:14 2026\n'
        }),
      groupAlive: (pgid) =>
        processGroupAlive(pgid, { kill, exec: () => ' 4242 Z\n' })
    });

    const result = controller.probe(IDENTITY);

    expect(result).toEqual({ state: 'gone' });
  });
});

describe('worker process controller signaling', () => {
  test('revalidates identity immediately before signaling the group', () => {
    const env = setup();

    const result = env.controller.signal(IDENTITY, 'SIGTERM');

    expect(result).toEqual({ ok: true, state: 'owned' });
    expect(env.signal).toHaveBeenCalledWith(-4242, 'SIGTERM');
  });

  test('does not signal a recycled pid', () => {
    const env = setup({
      inspect: vi.fn(() => ({
        ok: true,
        alive: true,
        pgid: 4242,
        started_at: 10_000
      }))
    });

    const result = env.controller.signal(IDENTITY, 'SIGTERM');

    expect(result).toEqual({ ok: false, state: 'recycled' });
    expect(env.signal).not.toHaveBeenCalled();
  });

  test('accepts an EPERM signal when the re-probe finds the group gone', () => {
    const inspections = [
      { ok: true, alive: true, pgid: 4242, started_at: 1_000 },
      { ok: true, alive: false, pgid: null, started_at: null }
    ];
    const groups = [true, false];
    const env = setup({
      inspect: vi.fn(() => inspections.shift()),
      groupAlive: vi.fn(() => groups.shift()),
      signal: vi.fn(() => {
        throw errno('EPERM');
      })
    });

    const result = env.controller.signal(IDENTITY, 'SIGTERM');

    expect(result).toEqual({ ok: true, state: 'gone' });
  });

  test('fails an EPERM signal when the re-probe still finds the group owned', () => {
    const env = setup({
      signal: vi.fn(() => {
        throw errno('EPERM');
      })
    });

    const result = env.controller.signal(IDENTITY, 'SIGSTOP');

    expect(result).toEqual({
      ok: false,
      state: 'unknown',
      reason: 'signal_failed'
    });
  });

  test('uses TERM then KILL and confirms process group absence', async () => {
    const inspections = [
      { ok: true, alive: true, pgid: 4242, started_at: 1_000 },
      { ok: true, alive: true, pgid: 4242, started_at: 1_000 },
      { ok: true, alive: true, pgid: 4242, started_at: 1_000 },
      { ok: true, alive: false, pgid: null, started_at: null }
    ];
    const groups = [true, true, true, false];
    const env = setup({
      inspect: vi.fn(() => inspections.shift()),
      groupAlive: vi.fn(() => groups.shift())
    });

    const result = await env.controller.terminate(IDENTITY);

    expect(result).toEqual({ ok: true, state: 'gone', forced: true });
    expect(env.signal.mock.calls).toEqual([
      [-4242, 'SIGTERM'],
      [-4242, 'SIGKILL']
    ]);
    expect(env.wait.mock.calls).toEqual([[10], [5]]);
  });

  test('fails closed when the group cannot be proven gone', async () => {
    const env = setup({
      inspect: vi.fn(() => ({ ok: false, reason: 'ps_failed' }))
    });

    const result = await env.controller.terminate(IDENTITY);

    expect(result).toEqual({
      ok: false,
      state: 'unknown',
      reason: 'ps_failed'
    });
    expect(env.signal).not.toHaveBeenCalled();
  });
});
