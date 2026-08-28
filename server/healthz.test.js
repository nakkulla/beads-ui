import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';
import { __resetWorkerRuntimeForTest } from './worker/runtime.js';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-healthz-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * A green bd capability snapshot: both producer legs healthy, no active
 * protocol failure.
 *
 * @returns {{ ok: boolean, diagnostics: Record<string, unknown> }}
 */
function greenCapability() {
  return {
    ok: true,
    diagnostics: {
      version: '1.2.0-fork.1',
      producer_observations: {
        default: { format: 'bare', schema_version: null },
        envelope_opt_in: { format: 'envelope', schema_version: 2 }
      },
      producer_capabilities: ['envelope_v2', 'legacy_bare'],
      consumer_supported_formats: ['bare', 'envelope_v2'],
      workspace_probe: { ok: true },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: null
    }
  };
}

/**
 * @param {{ bd?: boolean, db?: boolean, runtime?: any, capability?: any, capability_throws?: boolean }} probes
 * @returns {Promise<{ status: number, body: any }>}
 */
async function getHealthz(probes) {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: process.cwd(),
    frontend_mode: 'static',
    health_probes: {
      bd_probe: () => probes.bd ?? true,
      db_probe: () => probes.db ?? true,
      // Pinned so readiness does not depend on the live bd binary or on this
      // checkout's workspace state.
      bd_capability_probe: async () => {
        if (probes.capability_throws === true) {
          throw new Error('probe exploded');
        }
        return probes.capability ?? greenCapability();
      }
    },
    runtime_identity: () => probes.runtime ?? null
  });
  const server = createServer(app);
  // Bind the loopback address the fetch below targets (see
  // app.merge-lock-removed.test.js for why a wildcard bind is unsafe here).
  await new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(undefined))
  );
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  try {
    // No Authorization header: /healthz must stay unauthenticated.
    const response = await fetch(`http://127.0.0.1:${address.port}/healthz`);
    const body = await response.json();
    return { status: response.status, body };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

describe('GET /healthz', () => {
  test('200 with checks when probes pass (unauthenticated)', async () => {
    const { status, body } = await getHealthz({ bd: true, db: true });
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
    // worker is a live status object (auto_advance / running count).
    expect(body.checks.bd).toBe(true);
    expect(body.checks.db).toBe(true);
    expect(body.checks.worker).toEqual({
      auto_advance: false,
      running_count: 0,
      auto_merge: false,
      manual_merge_continuation: {
        schema_version: 2
      }
    });
  });

  test('the worker status omits the retired breaker_tripped field', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect('breaker_tripped' in body.checks.worker).toBe(false);
  });

  test('returns the live runtime provider without changing readiness', async () => {
    const runtime = {
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

    const { status, body } = await getHealthz({
      bd: true,
      db: true,
      runtime
    });

    expect(status).toBe(200);
    expect(body.runtime).toEqual(runtime);
  });

  test('503 when the db probe fails', async () => {
    const { status, body } = await getHealthz({ bd: true, db: false });
    expect(status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.db).toBe(false);
    expect(body.checks.worker.auto_advance).toBe(false);
  });

  test('503 when the bd probe fails', async () => {
    const { status, body } = await getHealthz({ bd: false, db: true });
    expect(status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.bd).toBe(false);
  });

  test('reports the exact bd version in the additive diagnostics', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect(body.diagnostics.bd.version).toBe('1.2.0-fork.1');
  });

  test('reports both producer observations from the dual-mode probe', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect(body.diagnostics.bd.producer_observations).toEqual({
      default: { format: 'bare', schema_version: null },
      envelope_opt_in: { format: 'envelope', schema_version: 2 }
    });
  });

  test('keeps observed producer capability separate from consumer support', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect(body.diagnostics.bd.producer_capabilities).toEqual([
      'envelope_v2',
      'legacy_bare'
    ]);
    expect(body.diagnostics.bd.consumer_supported_formats).toEqual([
      'bare',
      'envelope_v2'
    ]);
  });

  test('reports an empty active protocol failure summary when healthy', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect(body.diagnostics.bd.active_protocol_failures).toEqual({
      workspace_count: 0,
      families: []
    });
  });

  test('503 when the bd protocol boundary is unhealthy even though bd runs', async () => {
    const capability = greenCapability();
    capability.ok = false;
    capability.diagnostics.active_protocol_failures = {
      workspace_count: 1,
      families: ['list']
    };
    capability.diagnostics.error = 'bd_protocol_failure_active';

    const { status, body } = await getHealthz({
      bd: true,
      db: true,
      capability
    });

    expect(status).toBe(503);
    expect(body.checks.bd).toBe(false);
    expect(body.diagnostics.bd.error).toBe('bd_protocol_failure_active');
  });

  test('503 with a stable reason when the schema is unsupported', async () => {
    const capability = {
      ok: false,
      diagnostics: {
        ...greenCapability().diagnostics,
        error: 'bd_json_schema_unsupported'
      }
    };

    const { status, body } = await getHealthz({
      bd: true,
      db: true,
      capability
    });

    expect(status).toBe(503);
    expect(body.diagnostics.bd.error).toBe('bd_json_schema_unsupported');
  });

  test('503 with an explicit red diagnostic when the probe itself throws', async () => {
    const { status, body } = await getHealthz({
      bd: true,
      db: true,
      capability_throws: true
    });

    expect(status).toBe(503);
    expect(body.checks.bd).toBe(false);
    expect(body.diagnostics.bd.error).toBe('bd_capability_probe_failed');
  });

  test('keeps the runtime identity alongside the bd diagnostics', async () => {
    const runtime = {
      source_repo: '/managed/release',
      source_sha: 'a'.repeat(40)
    };

    const { body } = await getHealthz({ bd: true, db: true, runtime });

    expect(body.runtime).toEqual(runtime);
    expect(body.diagnostics.bd.workspace_probe).toEqual({ ok: true });
  });
});
