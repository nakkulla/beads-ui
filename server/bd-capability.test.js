import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  activeBdProtocolFailures,
  bdHealthSnapshot,
  probeBdCapabilities,
  pruneBdWorkspaceObservations,
  recordBdProtocolObservation,
  requireBdJsonCapability,
  resetBdCapabilityState,
  resolveBdWorkspaceIdentity
} from './bd-capability.js';
import { bdJsonFailure } from './bd-json.js';

/** @type {string[]} */
let temp_roots = [];

/**
 * Create a disposable workspace directory holding a `.beads/metadata.json`.
 *
 * @param {{ metadata?: boolean }} [options]
 * @returns {string}
 */
function makeWorkspace(options = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'bd-capability-'));
  temp_roots.push(root);
  if (options.metadata !== false) {
    mkdirSync(path.join(root, '.beads'), { recursive: true });
    writeFileSync(
      path.join(root, '.beads', 'metadata.json'),
      JSON.stringify({ backend: 'dolt' })
    );
  }
  return root;
}

/**
 * Build a fake runner that replies from a per-args script.
 *
 * @param {(args: string[], options: any) => any} handler
 */
function makeRunner(handler) {
  /** @type {{ args: string[], env: Record<string, string | undefined> }[]} */
  const calls = [];
  /**
   * @param {string[]} args
   * @param {any} [options]
   */
  const run_json = async (args, options = {}) => {
    calls.push({ args, env: options.env || {} });
    return handler(args, options);
  };
  return { run_json, calls };
}

/**
 * Successful transport result helper.
 *
 * @param {unknown} data
 * @param {'bare'|'envelope'} format
 */
function ok(data, format) {
  return {
    ok: true,
    data,
    protocol: { format, schema_version: format === 'envelope' ? 2 : null }
  };
}

/**
 * Runner replying with a healthy version and list for both legs, echoing the
 * envelope format the leg's env asked for.
 */
function healthyRunner() {
  return makeRunner((args, options) => {
    const wants_envelope = options.env?.BD_JSON_ENVELOPE === '1';
    const format = wants_envelope ? 'envelope' : 'bare';
    if (args[0] === 'version') {
      return ok({ version: '1.2.0-fork.1' }, format);
    }
    return ok([{ id: 'UI-1' }], format);
  });
}

/** @type {{ workspace_key: string }} */
let workspace;
let workspace_root = '';

beforeEach(() => {
  resetBdCapabilityState();
  workspace_root = makeWorkspace();
  const identity = resolveBdWorkspaceIdentity({ root_dir: workspace_root });
  if (!identity.ok) {
    throw new Error('fixture workspace identity failed');
  }
  workspace = identity.data;
});

afterEach(() => {
  resetBdCapabilityState();
  for (const root of temp_roots) {
    rmSync(root, { recursive: true, force: true });
  }
  temp_roots = [];
});

describe('resolveBdWorkspaceIdentity', () => {
  test('returns a stable key for the same workspace', () => {
    const first = resolveBdWorkspaceIdentity({ root_dir: workspace_root });
    const second = resolveBdWorkspaceIdentity({ root_dir: workspace_root });

    expect(first.ok && second.ok && first.data.workspace_key).toEqual(
      second.ok && second.data.workspace_key
    );
  });

  test('resolves a symlinked root to the same key', () => {
    const link_parent = mkdtempSync(path.join(os.tmpdir(), 'bd-link-'));
    temp_roots.push(link_parent);
    const link = path.join(link_parent, 'linked');
    symlinkSync(workspace_root, link);

    const direct = resolveBdWorkspaceIdentity({ root_dir: workspace_root });
    const linked = resolveBdWorkspaceIdentity({ root_dir: link });

    expect(linked.ok && linked.data.workspace_key).toEqual(
      direct.ok && direct.data.workspace_key
    );
  });

  test('returns different keys for different workspaces', () => {
    const other_root = makeWorkspace();

    const first = resolveBdWorkspaceIdentity({ root_dir: workspace_root });
    const second = resolveBdWorkspaceIdentity({ root_dir: other_root });

    expect(first.ok && first.data.workspace_key).not.toEqual(
      second.ok && second.data.workspace_key
    );
  });

  test('fails closed when root_dir is missing', () => {
    const result = resolveBdWorkspaceIdentity({});

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_workspace_identity_unresolved' }
    });
  });

  test('fails closed when root_dir does not exist', () => {
    const result = resolveBdWorkspaceIdentity({
      root_dir: path.join(workspace_root, 'missing-child')
    });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_workspace_identity_unresolved' }
    });
  });

  test('does not expose the path or database name in the key', () => {
    const result = resolveBdWorkspaceIdentity({ root_dir: workspace_root });

    expect(result.ok && result.data.workspace_key).toMatch(/^[0-9a-f]{32}$/);
    expect(result.ok && result.data.workspace_key).not.toContain(
      path.basename(workspace_root)
    );
  });
});

describe('recordBdProtocolObservation', () => {
  test('records a protocol failure for its workspace and family', () => {
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    expect(activeBdProtocolFailures()).toMatchObject({
      workspace_count: 1,
      families: ['list']
    });
  });

  test('clears the failure on the next healthy observation of that pair', () => {
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: { ok: true }
    });

    expect(activeBdProtocolFailures().workspace_count).toBe(0);
  });

  test('keeps the failure when a different family recovers', () => {
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'show',
      result: { ok: true }
    });

    expect(activeBdProtocolFailures().families).toEqual(['list']);
  });

  test('keeps the failure when another workspace recovers', () => {
    const other = resolveBdWorkspaceIdentity({ root_dir: makeWorkspace() });
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    recordBdProtocolObservation({
      workspace_key: other.ok ? other.data.workspace_key : 'x',
      command_family: 'list',
      result: { ok: true }
    });

    expect(activeBdProtocolFailures().workspace_count).toBe(1);
  });

  test('ignores an ordinary non-zero bd exit', () => {
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'dep',
      result: bdJsonFailure('bd_exit_error', 'bd exited 1')
    });

    expect(activeBdProtocolFailures().workspace_count).toBe(0);
  });

  test('fails health closed instead of evicting past the workspace bound', () => {
    for (let i = 0; i < 130; i++) {
      recordBdProtocolObservation({
        workspace_key: `workspace-${i}`,
        command_family: 'list',
        result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
      });
    }

    const failures = activeBdProtocolFailures();

    expect(failures.workspace_count).toBe(128);
    expect(failures.overflow).toBe(true);
  });

  test('forgets a workspace when it is explicitly pruned', () => {
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    pruneBdWorkspaceObservations(workspace.workspace_key);

    expect(activeBdProtocolFailures().workspace_count).toBe(0);
  });
});

describe('probeBdCapabilities', () => {
  test('reports the version and both producer observations', async () => {
    const runner = healthyRunner();

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: true,
      data: {
        version: '1.2.0-fork.1',
        producer_observations: {
          default: { format: 'bare', schema_version: null },
          envelope_opt_in: { format: 'envelope', schema_version: 2 }
        },
        producer_capabilities: ['envelope_v2', 'legacy_bare'],
        workspace_probe: { ok: true }
      }
    });
  });

  test('removes the envelope env for the default leg and sets it for the opt-in leg', async () => {
    const runner = healthyRunner();

    await probeBdCapabilities({
      workspace,
      run_json: runner.run_json,
      env: { BD_JSON_ENVELOPE: '1', PATH: '/usr/bin' }
    });

    const default_leg = runner.calls[0];
    const opt_in_leg = runner.calls[1];
    expect(Object.hasOwn(default_leg.env, 'BD_JSON_ENVELOPE')).toBe(false);
    expect(opt_in_leg.env.BD_JSON_ENVELOPE).toBe('1');
  });

  test('does not mutate the caller env object', async () => {
    const runner = healthyRunner();
    const env = { BD_JSON_ENVELOPE: '1' };

    await probeBdCapabilities({ workspace, run_json: runner.run_json, env });

    expect(env).toEqual({ BD_JSON_ENVELOPE: '1' });
  });

  test('stays healthy for a legacy CLI that only emits bare payloads', async () => {
    const runner = makeRunner((args) =>
      args[0] === 'version' ? ok({ version: '1.0.0' }, 'bare') : ok([], 'bare')
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: true,
      data: { producer_capabilities: ['legacy_bare'] }
    });
  });

  test('accepts an empty workspace list as container capability', async () => {
    const runner = makeRunner((args, options) => {
      const format =
        options.env?.BD_JSON_ENVELOPE === '1' ? 'envelope' : 'bare';
      return args[0] === 'version'
        ? ok({ version: '1.2.0' }, format)
        : ok([], format);
    });

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result.ok).toBe(true);
  });

  test('rejects a malformed list row even in an empty-capable workspace', async () => {
    const runner = makeRunner((args) =>
      args[0] === 'version'
        ? ok({ version: '1.2.0' }, 'bare')
        : ok([{ title: 'no id' }], 'bare')
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a version mismatch between the two legs', async () => {
    const runner = makeRunner((args, options) => {
      if (args[0] !== 'version') {
        return ok([], 'bare');
      }
      const version = options.env?.BD_JSON_ENVELOPE === '1' ? '1.3.0' : '1.2.0';
      return ok({ version }, 'bare');
    });

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('accepts a matching version regardless of its string value', async () => {
    const runner = makeRunner((args) =>
      args[0] === 'version'
        ? ok({ version: '9.9.9-custom' }, 'bare')
        : ok([], 'bare')
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: true,
      data: { version: '9.9.9-custom' }
    });
  });

  test('rejects an unsupported schema reported by the runner', async () => {
    const runner = makeRunner(() =>
      bdJsonFailure('bd_json_schema_unsupported', 'schema 3', {
        schema_version: 3
      })
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_schema_unsupported' }
    });
  });

  test('maps a timed-out probe to bd_probe_timeout', async () => {
    const runner = makeRunner(() =>
      bdJsonFailure('bd_exit_error', 'timeout', {
        timed_out: true,
        command_family: 'version'
      })
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_probe_timeout' }
    });
  });

  test('rejects an invalid version payload shape', async () => {
    const runner = makeRunner((args) =>
      args[0] === 'version' ? ok({ build: 'x' }, 'bare') : ok([], 'bare')
    );

    const result = await probeBdCapabilities({ workspace, ...runner });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  // One full probe issues four runner calls: `version` and the list probe, each
  // in the default and the envelope opt-in leg.
  const CALLS_PER_PROBE = 4;

  test('serves a cached success within the success TTL', async () => {
    const runner = healthyRunner();
    let clock = 1000;
    const now = () => clock;

    await probeBdCapabilities({ workspace, ...runner, now });
    clock += 59_000;
    await probeBdCapabilities({ workspace, ...runner, now });

    expect(runner.calls).toHaveLength(CALLS_PER_PROBE);
  });

  test('re-probes after the success TTL expires', async () => {
    const runner = healthyRunner();
    let clock = 1000;
    const now = () => clock;

    await probeBdCapabilities({ workspace, ...runner, now });
    clock += 61_000;
    await probeBdCapabilities({ workspace, ...runner, now });

    expect(runner.calls).toHaveLength(CALLS_PER_PROBE * 2);
  });

  test('re-probes a failure after the shorter failure TTL', async () => {
    let healthy = false;
    const runner = makeRunner((args) => {
      if (!healthy) {
        return bdJsonFailure('bd_json_invalid', 'bad json');
      }
      return args[0] === 'version'
        ? ok({ version: '1.2.0' }, 'bare')
        : ok([], 'bare');
    });
    let clock = 1000;
    const now = () => clock;

    const first = await probeBdCapabilities({ workspace, ...runner, now });
    healthy = true;
    clock += 6_000;
    const second = await probeBdCapabilities({ workspace, ...runner, now });

    expect(first.ok).toBe(false);
    expect(second.ok).toBe(true);
  });

  test('collapses concurrent probes into one run', async () => {
    const runner = healthyRunner();

    await Promise.all([
      probeBdCapabilities({ workspace, ...runner }),
      probeBdCapabilities({ workspace, ...runner })
    ]);

    expect(runner.calls).toHaveLength(CALLS_PER_PROBE);
  });
});

describe('requireBdJsonCapability', () => {
  test('authorizes an effect for a healthy workspace and family', async () => {
    const runner = healthyRunner();

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toEqual({ ok: true });
  });

  test('refuses while that workspace and family has an active failure', async () => {
    const runner = healthyRunner();
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'show',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('does not run the probe when a failure already blocks the family', async () => {
    const runner = healthyRunner();
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'show',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(runner.calls).toHaveLength(0);
  });

  test('still authorizes a healthy family in the same workspace', async () => {
    const runner = healthyRunner();
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toEqual({ ok: true });
  });

  test('is not blocked by another workspace failure', async () => {
    const runner = healthyRunner();
    const other = resolveBdWorkspaceIdentity({ root_dir: makeWorkspace() });
    recordBdProtocolObservation({
      workspace_key: other.ok ? other.data.workspace_key : 'x',
      command_family: 'show',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toEqual({ ok: true });
  });

  test('refuses when the workspace identity is absent', async () => {
    const runner = healthyRunner();

    const result = await requireBdJsonCapability({
      workspace: /** @type {any} */ ({}),
      command_family: 'show',
      ...runner
    });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_workspace_identity_unresolved' }
    });
  });

  test('refuses every effect once the observation store overflows', async () => {
    const runner = healthyRunner();
    for (let i = 0; i < 130; i++) {
      recordBdProtocolObservation({
        workspace_key: `workspace-${i}`,
        command_family: 'list',
        result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
      });
    }

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_observation_store_overflow' }
    });
  });

  test('refuses when the probe itself is unhealthy', async () => {
    const runner = makeRunner(() =>
      bdJsonFailure('bd_json_invalid', 'bad json')
    );

    const result = await requireBdJsonCapability({
      workspace,
      command_family: 'show',
      ...runner
    });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_invalid' }
    });
  });
});

describe('bdHealthSnapshot', () => {
  test('reports green diagnostics for a healthy primary workspace', async () => {
    const runner = healthyRunner();

    const snapshot = await bdHealthSnapshot({
      primary_workspace: workspace,
      ...runner
    });

    expect(snapshot.ok).toBe(true);
    expect(snapshot.diagnostics).toMatchObject({
      version: '1.2.0-fork.1',
      consumer_supported_formats: ['bare', 'envelope_v2'],
      workspace_probe: { ok: true },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: null
    });
  });

  test('fails closed when any workspace has an active protocol failure', async () => {
    const runner = healthyRunner();
    const other = resolveBdWorkspaceIdentity({ root_dir: makeWorkspace() });
    recordBdProtocolObservation({
      workspace_key: other.ok ? other.data.workspace_key : 'x',
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    const snapshot = await bdHealthSnapshot({
      primary_workspace: workspace,
      ...runner
    });

    expect(snapshot.ok).toBe(false);
    expect(snapshot.diagnostics).toMatchObject({
      active_protocol_failures: { workspace_count: 1, families: ['list'] }
    });
  });

  test('hides workspace identity from the diagnostics payload', async () => {
    const runner = healthyRunner();
    recordBdProtocolObservation({
      workspace_key: workspace.workspace_key,
      command_family: 'list',
      result: bdJsonFailure('bd_json_shape_invalid', 'bad shape')
    });

    const snapshot = await bdHealthSnapshot({
      primary_workspace: workspace,
      ...runner
    });

    expect(JSON.stringify(snapshot.diagnostics)).not.toContain(
      workspace.workspace_key
    );
  });

  test('fails closed when the primary workspace identity is missing', async () => {
    const runner = healthyRunner();

    const snapshot = await bdHealthSnapshot({ ...runner });

    expect(snapshot.ok).toBe(false);
    expect(snapshot.diagnostics).toMatchObject({
      error: 'bd_workspace_identity_unresolved',
      workspace_probe: { ok: false }
    });
  });

  test('reports the probe failure code when the probe is unhealthy', async () => {
    const runner = makeRunner(() =>
      bdJsonFailure('bd_json_schema_unsupported', 'schema 3', {
        schema_version: 3
      })
    );

    const snapshot = await bdHealthSnapshot({
      primary_workspace: workspace,
      ...runner
    });

    expect(snapshot.ok).toBe(false);
    expect(snapshot.diagnostics).toMatchObject({
      error: 'bd_json_schema_unsupported'
    });
  });
});
