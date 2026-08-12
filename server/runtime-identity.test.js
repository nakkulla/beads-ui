import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createRuntimeIdentity } from './runtime-identity.js';

const SHA = 'a'.repeat(40);
const INSTANCE_ID = '11111111-2222-4333-8444-555555555555';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'runtime-identity-'));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('runtime identity', () => {
  test('binds the current process and module source to the listening address', () => {
    const source = path.join(root, 'release');
    const module_url = pathToFileURL(
      path.join(source, 'server', 'runtime-identity.js')
    ).href;
    const realpath = vi.fn(() => source);

    const result = createRuntimeIdentity({
      host: '127.0.0.1',
      port: 3000,
      module_url,
      pid: 77,
      realpath,
      readHead: vi.fn(() => SHA),
      observeProcess: vi.fn(() => ({
        ok: true,
        identity: { pid: 77, process_started_at: 1_000 }
      })),
      now: () => new Date('2026-08-11T00:00:00.000Z'),
      randomUUID: () => INSTANCE_ID
    });

    expect(result).toEqual({
      ok: true,
      identity: {
        protocol_version: 1,
        pid: 77,
        process_started_at: 1_000,
        started_at: '2026-08-11T00:00:00.000Z',
        instance_id: INSTANCE_ID,
        source_repo: source,
        source_sha: SHA,
        host: '127.0.0.1',
        port: 3000,
        health_path: '/healthz'
      }
    });
    expect(realpath).toHaveBeenCalledWith(source);
  });

  test('fails closed when the OS process start is unknown', () => {
    const result = createRuntimeIdentity({
      host: '127.0.0.1',
      port: 3000,
      module_url: pathToFileURL(
        path.join(root, 'release', 'server', 'runtime-identity.js')
      ).href,
      pid: 77,
      realpath: (value) => value,
      readHead: () => SHA,
      observeProcess: () => ({ ok: false, reason: 'ps_failed' }),
      now: () => new Date('2026-08-11T00:00:00.000Z'),
      randomUUID: () => INSTANCE_ID
    });

    expect(result).toEqual({ ok: false, reason: 'ps_failed' });
  });

  test('does not export filesystem marker authority', async () => {
    const runtime = await import('./runtime-identity.js');

    expect(['write', 'Runtime', 'Marker'].join('') in runtime).toBe(false);
    expect(['read', 'Runtime', 'Marker'].join('') in runtime).toBe(false);
  });
});
