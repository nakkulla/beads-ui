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
  test('publishes the exact bound address before returning the identity', () => {
    const createIdentity = vi.fn(() => ({
      ok: /** @type {true} */ (true),
      identity: IDENTITY
    }));
    const writeMarker = vi.fn(() => ({ ok: /** @type {true} */ (true) }));

    const result = publishRuntimeIdentity({
      server: { address: () => ({ address: '127.0.0.1', port: 3000 }) },
      createIdentity,
      writeMarker
    });

    expect(result).toEqual({ ok: true, identity: IDENTITY });
    expect(createIdentity).toHaveBeenCalledWith({
      host: '127.0.0.1',
      port: 3000
    });
    expect(writeMarker).toHaveBeenCalledWith({ identity: IDENTITY });
  });

  test('fails closed when the marker cannot be published', () => {
    const close = vi.fn();
    const writeMarker = vi.fn(() => ({
      ok: /** @type {false} */ (false),
      reason: 'runtime_marker_write_failed'
    }));

    const result = publishRuntimeIdentity({
      server: {
        address: () => ({ address: '127.0.0.1', port: 3000 }),
        close
      },
      createIdentity: () => ({ ok: true, identity: IDENTITY }),
      writeMarker
    });

    expect(result).toEqual({
      ok: false,
      reason: 'runtime_marker_write_failed'
    });
    expect(close).toHaveBeenCalledOnce();
  });

  test('rejects an unavailable bound socket address', () => {
    const createIdentity = vi.fn();

    const result = publishRuntimeIdentity({
      server: { address: () => null },
      createIdentity,
      writeMarker: vi.fn()
    });

    expect(result).toEqual({
      ok: false,
      reason: 'runtime_address_unavailable'
    });
    expect(createIdentity).not.toHaveBeenCalled();
  });
});
