/**
 * The workspace `bd kv` channels (two keys): session defaults and exec account
 * defaults. They share `kvTargetOf`/`readKv`/`writeKv`, which are key-argued,
 * so the per-repo `root_dir` targeting is written once for both.
 *
 * Both writes are strict: an out-of-vocabulary edit is refused before bd is
 * touched, and every failure (bd write, readback mismatch) reaches the client
 * as an error so the dialog can keep the user's edit state (spec §F).
 *
 * The two READS differ by design. Session defaults are fail-quiet — an absent
 * key or a broken value yields an empty layer plus warnings. Accounts report a
 * three-state layer instead (UI-d3cb §3/§4), because `unusable` decides which
 * account's tokens a launch spends and must reach the screen as a fact rather
 * than as "no default". Only a bd read failure is an error response.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  SESSION_DEFAULTS_KV_KEY,
  isHttpOriginValue,
  mergeSessionDefaults,
  normalizeSessionDefaults,
  validateSessionDefaultsPatch
} from '../session-defaults.js';
import { commonSet, resolveWorkerUrl } from '../worker-url.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  WORKSPACE_ACCOUNTS_KV_KEY,
  mergeWorkspaceAccounts,
  normalizeWorkspaceAccounts,
  validateWorkspaceAccountsPatch
} from '../workspace-accounts.js';
import {
  kvGetJsonAtRoot,
  kvGetJsonInWorkspace,
  kvSetJsonAtRoot,
  kvSetJsonInWorkspace,
  log,
  readbackFailureDetail
} from './context.js';
import {
  invalidateSessionDefaults,
  invalidateWorkspaceAccounts
} from './monitor-handlers.js';
import { targetWorkspaceOf } from './workspace-target.js';

/**
 * Resolve which workspace's kv this request addresses (UI-eey2 §9.5).
 *
 * `root_dir` is optional and validated against the registry allow list; absent
 * keeps the connection's workspace AND the connection-addressed kv helpers, so
 * a client that never sends the field observes no behaviour change at all.
 *
 * @param {WebSocket} ws
 * @param {unknown} payload
 * @returns {{ ok: true, root: string, explicit: boolean }|{ ok: false }}
 */
function kvTargetOf(ws, payload) {
  const raw = /** @type {any} */ (payload || {}).root_dir;
  const explicit = raw !== undefined && raw !== null;
  const root = targetWorkspaceOf(ws, payload);
  if (root === null) {
    return { ok: false };
  }
  return { ok: true, root, explicit };
}

/**
 * @param {WebSocket} ws
 * @param {{ root: string, explicit: boolean }} target
 * @param {string} key
 */
function readKv(ws, target, key) {
  return target.explicit
    ? kvGetJsonAtRoot(target.root, key)
    : kvGetJsonInWorkspace(ws, key);
}

/**
 * @param {WebSocket} ws
 * @param {{ root: string, explicit: boolean }} target
 * @param {string} key
 * @param {Record<string, unknown>} value
 */
function writeKv(ws, target, key, value) {
  return target.explicit
    ? kvSetJsonAtRoot(target.root, key, value)
    : kvSetJsonInWorkspace(ws, key, value);
}

/**
 * Read the kv layer and normalize it for one reply.
 *
 * @param {WebSocket} ws
 * @param {{ root: string, explicit: boolean }} target
 * @returns {Promise<{ ok: true, found: boolean|undefined, warning: string|undefined, values: Record<string, string|boolean>, warnings: string[], raw: Record<string, unknown>|undefined }|{ ok: false, error: string }>}
 */
async function readSessionDefaults(ws, target) {
  const read = await readKv(ws, target, SESSION_DEFAULTS_KV_KEY);
  if (!read.ok) {
    return { ok: false, error: read.error || 'bd kv get failed' };
  }
  const normalized = normalizeSessionDefaults(read.value);
  const warnings = read.warning
    ? [read.warning, ...normalized.warnings]
    : normalized.warnings;
  return {
    ok: true,
    found: read.found,
    warning: read.warning,
    values: normalized.values,
    warnings,
    raw: read.value
  };
}

/** @param {string} code */
function workerUnavailable(code) {
  return {
    status: 'unavailable',
    effective_url: null,
    source: null,
    error: { code }
  };
}

/**
 * @param {string} root
 * @param {Awaited<ReturnType<typeof readSessionDefaults>>} read
 */
async function resolveSnapshot(root, read) {
  if (
    !read.ok ||
    (read.found !== false && (read.raw === undefined || read.warning))
  ) {
    return workerUnavailable('workspace_unavailable');
  }
  const result = await resolveWorkerUrl({
    root,
    workspace:
      read.found === false
        ? {}
        : /** @type {Record<string, unknown>} */ (read.raw)
  });
  return result.status === 'ok'
    ? result
    : workerUnavailable('helper_unavailable');
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGetSessionDefaults(ws, req) {
  log('get-session-defaults');
  const target = kvTargetOf(ws, req.payload);
  if (!target.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  const read = await readSessionDefaults(ws, target);
  if (!read.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', read.error)));
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        values: read.values,
        warnings: read.warnings,
        worker_url: await resolveSnapshot(target.root, read)
      })
    )
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSetSessionDefaults(ws, req) {
  log('set-session-defaults');
  const target = kvTargetOf(ws, req.payload);
  if (!target.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  const { values } = /** @type {any} */ (req.payload || {});
  const validated = validateSessionDefaultsPatch(values);
  if (!validated.ok) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', validated.reason)));
    return;
  }

  // Re-read immediately before the write: `bd kv` carries no CAS, so this is
  // what narrows the clobber window to per-key last-write-wins (spec §C.2).
  const before = await readSessionDefaults(ws, target);
  if (!before.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', before.error)));
    return;
  }
  const next = mergeSessionDefaults(before.raw, validated.patch);
  const planned = normalizeSessionDefaults(next);
  try {
    const runtime = getWorkerRuntime();
    for (let attempt = 0; attempt < 2; attempt++) {
      const queue = runtime.queueStore.snapshot(target.root);
      if (
        !queue.applied_exec_preset ||
        !runtime.execPresetCoordinator.changesAppliedExecPreset(
          queue.applied_exec_preset,
          before.values,
          planned.values
        )
      ) {
        break;
      }
      const cleared = runtime.queueStore.clearAppliedExecPreset(target.root, {
        expected_revision: queue.revision
      });
      if (cleared.ok) {
        break;
      }
      if (!cleared.conflict || attempt === 1) {
        ws.send(
          JSON.stringify(
            makeError(
              req,
              'queue_write_failed',
              'Failed to clear preset identity'
            )
          )
        );
        return;
      }
    }
  } catch (err) {
    log(
      'session defaults preset identity clear failed for %s: %o',
      target.root,
      err
    );
    ws.send(
      JSON.stringify(
        makeError(req, 'queue_write_failed', 'Failed to clear preset identity')
      )
    );
    return;
  }

  const written = await writeKv(ws, target, SESSION_DEFAULTS_KV_KEY, next);
  if (!written.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, 'kv_write_failed', written.error || 'bd kv set failed')
      )
    );
    return;
  }

  const after = await readSessionDefaults(ws, target);
  if (!after.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          after.error,
          readbackFailureDetail('kv_readback_failed')
        )
      )
    );
    return;
  }
  for (const [key, value] of Object.entries(validated.patch)) {
    const observed = Object.hasOwn(after.values, key)
      ? after.values[key]
      : null;
    if (observed !== value) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bd_readback_failed',
            `session default did not persist: ${key}`,
            readbackFailureDetail('kv_readback_mismatch')
          )
        )
      );
      return;
    }
  }
  // The monitor's per-repo cache now holds a value this write replaced, and it
  // is the writer that knows which repo moved (UI-eey2 §9.4).
  invalidateSessionDefaults(target.root);
  ws.send(
    JSON.stringify(
      makeOk(req, {
        values: after.values,
        warnings: after.warnings,
        worker_url: await resolveSnapshot(target.root, after)
      })
    )
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSetWorkerUrlCommon(ws, req) {
  log('set-worker-url-common');
  const target = kvTargetOf(ws, req.payload);
  if (!target.ok) {
    sendBadRoot(ws, req);
    return;
  }
  const { value, expected_revision } = /** @type {any} */ (req.payload || {});
  if (
    (value !== null &&
      (typeof value !== 'string' || !isHttpOriginValue(value))) ||
    typeof expected_revision !== 'string' ||
    expected_revision.length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'A canonical origin or null and a non-empty revision are required'
        )
      )
    );
    return;
  }
  const saved = await commonSet({ value, expected_revision });
  if (saved.status !== 'ok') {
    const code = saved.error.code;
    ws.send(
      JSON.stringify(
        makeError(req, code, `Common Worker address save failed: ${code}`)
      )
    );
    return;
  }
  const read = await readSessionDefaults(ws, {
    root: target.root,
    explicit: true
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        common_saved: true,
        common: saved.common,
        worker_url: await resolveSnapshot(target.root, read)
      })
    )
  );
}

/**
 * The `payload.root_dir` refusal both account handlers share.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
function sendBadRoot(ws, req) {
  ws.send(
    JSON.stringify(
      makeError(
        req,
        'bad_request',
        'payload.root_dir must be an absolute path in the available workspace list'
      )
    )
  );
}

/**
 * Read the workspace account layer for one reply.
 *
 * Only a bd FAILURE is an error here. A corrupt or unsupported stored value is
 * a successful read of an `unusable` layer, and the settings pane must be able
 * to show that state to the one user who can fix it (§4).
 *
 * @param {WebSocket} ws
 * @param {{ root: string, explicit: boolean }} target
 * @returns {Promise<{ ok: true, state: 'absent'|'usable'|'unusable', values: Record<string, string>, warnings: string[], raw: Record<string, unknown>|undefined }|{ ok: false, error: string }>}
 */
async function readWorkspaceAccounts(ws, target) {
  const read = await readKv(ws, target, WORKSPACE_ACCOUNTS_KV_KEY);
  if (!read.ok) {
    return { ok: false, error: read.error || 'bd kv get failed' };
  }
  const normalized = normalizeWorkspaceAccounts(read);
  return {
    ok: true,
    state: normalized.state,
    values: normalized.values,
    warnings: normalized.warnings,
    raw: read.value
  };
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGetWorkspaceAccounts(ws, req) {
  log('get-workspace-accounts');
  const target = kvTargetOf(ws, req.payload);
  if (!target.ok) {
    sendBadRoot(ws, req);
    return;
  }
  const read = await readWorkspaceAccounts(ws, target);
  if (!read.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', read.error)));
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        state: read.state,
        values: read.values,
        warnings: read.warnings
      })
    )
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSetWorkspaceAccounts(ws, req) {
  log('set-workspace-accounts');
  const target = kvTargetOf(ws, req.payload);
  if (!target.ok) {
    sendBadRoot(ws, req);
    return;
  }
  const { values } = /** @type {any} */ (req.payload || {});
  const invalid = validateWorkspaceAccountsPatch(values);
  if (invalid !== null) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', invalid)));
    return;
  }
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const [key, value] of Object.entries(
    /** @type {Record<string, string|null>} */ (values)
  )) {
    patch[key] = value === null || value === '' ? null : value;
  }

  // Re-read immediately before the write: `bd kv` carries no CAS, so this is
  // what narrows the clobber window to per-key last-write-wins.
  const before = await readWorkspaceAccounts(ws, target);
  if (!before.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', before.error)));
    return;
  }
  const next = mergeWorkspaceAccounts(before.raw, patch);

  const written = await writeKv(ws, target, WORKSPACE_ACCOUNTS_KV_KEY, next);
  if (!written.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, 'kv_write_failed', written.error || 'bd kv set failed')
      )
    );
    return;
  }

  const after = await readWorkspaceAccounts(ws, target);
  if (!after.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          after.error,
          readbackFailureDetail('kv_readback_failed')
        )
      )
    );
    return;
  }
  for (const [key, value] of Object.entries(patch)) {
    const observed = Object.hasOwn(after.values, key)
      ? after.values[key]
      : null;
    if (observed !== value) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bd_readback_failed',
            `workspace account default did not persist: ${key}`,
            readbackFailureDetail('kv_readback_mismatch')
          )
        )
      );
      return;
    }
  }
  // The monitor row projects this layer too (UI-e1ta §8): drop its cached
  // copy so the bulk window observes the account just written instead of the
  // one the TTL still holds. `workflow_session_defaults` is untouched here.
  invalidateWorkspaceAccounts(target.root);
  ws.send(
    JSON.stringify(
      makeOk(req, {
        state: after.state,
        values: after.values,
        warnings: after.warnings
      })
    )
  );
}
