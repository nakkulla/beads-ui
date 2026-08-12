import { describe, expect, test, vi } from 'vitest';
import { publishRuntimeIdentity } from './runtime-startup.js';

const IDENTITY = {
  protocol_version: 1,
  pid: 77,
  process_started_at: 1_000,
  started_at: '2026-08-11T00:00:00.000Z',
  instance_id: '11111111-2222-4333-8444-555555555555',
  source_repo: '/managed/release',
  source_sha: 'a'.repeat(40),
  host: '127.0.0.1',
  port: 3000,
  health_path: '/healthz'
};

describe('runtime startup', () => {
  test('computes the exact bound address before returning the identity', () => {
    const createIdentity = vi.fn(() => ({
      ok: /** @type {true} */ (true),
      identity: IDENTITY
    }));
    const result = publishRuntimeIdentity({
      server: { address: () => ({ address: '127.0.0.1', port: 3000 }) },
      createIdentity
    });

    expect(result).toEqual({ ok: true, identity: IDENTITY });
    expect(createIdentity).toHaveBeenCalledWith({
      host: '127.0.0.1',
      port: 3000
    });
  });

  test('does not close a bound server because no marker is written', () => {
    const close = vi.fn();

    const result = publishRuntimeIdentity({
      server: {
        address: () => ({ address: '127.0.0.1', port: 3000 }),
        close
      },
      createIdentity: () => ({ ok: true, identity: IDENTITY })
    });

    expect(result).toEqual({ ok: true, identity: IDENTITY });
    expect(close).not.toHaveBeenCalled();
  });

  test('closes an unavailable bound socket address', () => {
    const createIdentity = vi.fn();
    const close = vi.fn();

    const result = publishRuntimeIdentity({
      server: { address: () => null, close },
      createIdentity
    });

    expect(result).toEqual({
      ok: false,
      reason: 'runtime_address_unavailable'
    });
    expect(createIdentity).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledOnce();
  });

  test('closes when process identity cannot be computed', () => {
    const close = vi.fn();

    const result = publishRuntimeIdentity({
      server: { address: () => ({ address: '127.0.0.1', port: 3000 }), close },
      createIdentity: () => ({
        ok: false,
        reason: 'runtime_source_unavailable'
      })
    });

    expect(result).toEqual({ ok: false, reason: 'runtime_source_unavailable' });
    expect(close).toHaveBeenCalledOnce();
  });
});
