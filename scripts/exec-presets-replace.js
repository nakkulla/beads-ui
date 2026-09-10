#!/usr/bin/env node
/**
 * One-shot post-merge job (UI-s8qn §3.9, §4): replace the live execution
 * presets with the five targets and apply the 최고효율 profile to both rigs'
 * workspace kv and queue defaults.
 *
 * Without `--apply` this is a DRY RUN: it reads the preset snapshot, prints the
 * plan, and exits 0 without a single write and without touching kv or queue.
 *
 * Every step ends in a readback and every failure exits non-zero with a named
 * error on stderr, so the Worker's `post_merge_jobs` ledger records a failure
 * rather than a silent partial. The whole procedure is idempotent — steps 1-4
 * are CAS, steps 5-6 are replacing writes — so a human reruns this same file.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { WebSocket } from 'ws';
import {
  KV_DEFAULT_PRESET_NAME,
  LEGACY_PRESET_IDS,
  TARGET_PRESETS,
  planPresetReplacement,
  settingsEqual
} from './lib/exec-presets-plan.js';

const CLIENT_ID = 'exec-presets-replace';
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 30000;
const WORKSPACE_BASENAMES = ['dotfiles', 'beads-ui'];

/**
 * The six review keys a target preset carries. The quick_fix lane has no
 * destination for them, so `apply-impl-preset-global` reports exactly these as
 * `skipped_keys` (`normalizeQuickFixLanePreset` skips every unmapped key).
 *
 * @type {ReadonlyArray<string>}
 */
const EXPECTED_QUICK_FIX_SKIPPED_KEYS = Object.freeze([
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort'
]);

/** The one lane incompatibility the 최고효율 profile must produce (spec §3.8). */
const EXPECTED_LANE_WARNING = 'lane_incompatible:quick_fix_impl_model';

/** Expected `workflow_session_defaults` values after a general+quick_fix apply. */
const EXPECTED_KV = Object.freeze({
  impl_runtime: 'codex',
  impl_model: 'auto',
  impl_effort: 'auto',
  quick_fix_impl_runtime: 'codex',
  quick_fix_impl_effort: 'auto',
  spec_review_model: 'astra',
  spec_review_effort: 'xhigh',
  plan_review_model: 'astra',
  plan_review_effort: 'xhigh',
  impl_review_model: 'astra',
  impl_review_effort: 'xhigh'
});

/** Expected queue orchestration defaults after the same applies. */
const EXPECTED_QUEUE = Object.freeze({
  orchestration_model: 'opus',
  orchestration_effort: 'high',
  quick_fix_orchestration_model: 'opus',
  quick_fix_orchestration_effort: 'high'
});

/** A named, non-retryable job failure — its `name` is the job's error code. */
class JobError extends Error {
  /**
   * @param {string} code - Stable failure name such as `workspace_missing`.
   * @param {string} [detail] - Human detail appended after the code.
   */
  constructor(code, detail) {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'JobError';
    this.code = code;
  }
}

/**
 * Resolve the server ws URL (spec §3.9): `BDUI_WS`, then `BDUI_HOST`, then the
 * `ts-ip` command. There is no loopback fallback — the shared server binds the
 * tailnet address only, so guessing localhost would talk to an orphan.
 *
 * @returns {string}
 */
function resolveServerUrl() {
  const explicit = process.env.BDUI_WS;
  if (typeof explicit === 'string' && explicit.length > 0) {
    return explicit;
  }
  const host = process.env.BDUI_HOST;
  if (typeof host === 'string' && host.length > 0) {
    return `ws://${host}:3000/ws`;
  }
  try {
    const ip = execFileSync('ts-ip', [], { encoding: 'utf8' }).trim();
    if (ip.length > 0) {
      return `ws://${ip}:3000/ws`;
    }
  } catch {
    // Fall through to the named failure below.
  }
  throw new JobError(
    'bdui_host_unresolved',
    'set BDUI_WS or BDUI_HOST, or make ts-ip resolvable'
  );
}

/**
 * Minimal request/response + push-event client for the beads-ui ws protocol.
 * Replies are matched by envelope `id`; anything else is an unsolicited push
 * delivered to the waiter registered for its `type`.
 */
class WsClient {
  /** @param {string} url - Full ws URL including the `/ws` path. */
  constructor(url) {
    this.url = url;
    this.seq = 0;
    /** @type {Map<string, { resolve: (value: any) => void, reject: (err: Error) => void }>} */
    this.pending = new Map();
    /** @type {Map<string, { accept: (payload: any) => boolean, resolve: (payload: any) => void }>} */
    this.event_waiters = new Map();
    /** @type {WebSocket|null} */
    this.socket = null;
  }

  /** @returns {Promise<void>} */
  connect() {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(this.url);
      this.socket = socket;
      const onError = /** @param {Error} err */ (err) => {
        reject(new JobError('bdui_connect_failed', err.message));
      };
      socket.once('error', onError);
      socket.once('open', () => {
        socket.off('error', onError);
        socket.on('error', () => {
          // Post-open transport errors surface as pending-request timeouts.
        });
        socket.on('message', (data) => {
          this.dispatch(String(data));
        });
        resolve();
      });
    });
  }

  /**
   * Route one incoming frame to its pending request or its event waiter.
   *
   * @param {string} raw - The received frame text.
   */
  dispatch(raw) {
    /** @type {any} */
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      return;
    }
    const waiting = this.pending.get(message.id);
    if (waiting) {
      this.pending.delete(message.id);
      if (message.ok === true) {
        waiting.resolve(message.payload);
      } else {
        const error = message.error || {};
        waiting.reject(
          new JobError(
            `ws_error:${error.code || 'unknown'}`,
            `${message.type}: ${error.message || ''}`
          )
        );
      }
      return;
    }
    const waiter = this.event_waiters.get(message.type);
    if (waiter && waiter.accept(message.payload)) {
      this.event_waiters.delete(message.type);
      waiter.resolve(message.payload);
    }
  }

  /**
   * Send one request and resolve with its reply payload.
   *
   * @param {string} type - Protocol request type such as `list-workspaces`.
   * @param {Record<string, unknown>} payload - Body sent inside the envelope.
   * @returns {Promise<any>}
   */
  request(type, payload) {
    this.seq += 1;
    const id = `${CLIENT_ID}-${this.seq}`;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new JobError('ws_request_timeout', type));
      }, REQUEST_TIMEOUT_MS);
      this.pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        }
      });
      const socket = /** @type {WebSocket} */ (this.socket);
      socket.send(JSON.stringify({ id, type, payload }));
    });
  }

  /**
   * Arm a waiter for the next pushed message of one type. Arm it BEFORE the
   * request that triggers the push, since the server sends both in one turn.
   *
   * @param {string} type - Envelope type of the awaited server push.
   * @param {(payload: any) => boolean} [accept] - Optional filter; a push it
   * rejects is ignored and the waiter stays armed.
   * @returns {Promise<any>}
   */
  nextEvent(type, accept = () => true) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.event_waiters.delete(type);
        reject(new JobError('ws_event_timeout', type));
      }, REQUEST_TIMEOUT_MS);
      this.event_waiters.set(type, {
        accept,
        resolve: (payload) => {
          clearTimeout(timer);
          resolve(payload);
        }
      });
    });
  }

  /** Close the socket. */
  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

/**
 * Read the current preset snapshot by (re)subscribing — the subscribe handler
 * always emits a fresh snapshot to the caller.
 *
 * @param {WsClient} client - Connected client.
 * @returns {Promise<{ revision: number, presets: any[] }>}
 */
async function readPresetSnapshot(client) {
  const pushed = client.nextEvent('impl-presets-snapshot');
  await client.request('subscribe-impl-presets', { id: CLIENT_ID });
  const payload = await pushed;
  return { revision: payload.revision, presets: payload.presets || [] };
}

/**
 * Read one workspace's queue snapshot. The queue channel is addressed by the
 * CONNECTION's workspace, so this points the connection at `root_dir` first.
 *
 * @param {WsClient} client - Connected client.
 * @param {string} root_dir - Absolute workspace root.
 * @returns {Promise<any>}
 */
async function readQueueSnapshot(client, root_dir) {
  // Drop the previous workspace's subscription first so a later push from
  // that queue cannot be mistaken for this one; the snapshot's `root_dir` is
  // then checked against the requested workspace as well.
  await client.request('unsubscribe-worker-queue', { id: CLIENT_ID });
  await client.request('set-workspace', { path: root_dir });
  const pushed = client.nextEvent(
    'worker-queue-snapshot',
    /** @param {any} payload - Pushed queue snapshot. */
    (payload) => payload?.root_dir === root_dir
  );
  await client.request('subscribe-worker-queue', { id: CLIENT_ID });
  const payload = await pushed;
  return payload.queue;
}

/**
 * Execute one plan's deletes and creates under the preset CAS, chaining each
 * reply's revision into the next request (spec §4.3).
 *
 * @param {WsClient} client - Connected client.
 * @param {import('./lib/exec-presets-plan.js').ReplacementPlan} plan - Classified snapshot to carry out.
 * @param {number} revision - Expected revision to start the chain at.
 * @returns {Promise<{ conflict: boolean, revision: number }>}
 */
async function executePlan(client, plan, revision) {
  let current = revision;
  for (const victim of plan.delete) {
    const reply = await client.request('impl-preset-delete', {
      expected_revision: current,
      id: victim.id
    });
    if (reply.conflict === true) {
      return { conflict: true, revision: reply.revision };
    }
    if (reply.applied !== true) {
      throw new JobError(
        'preset_delete_failed',
        `${victim.id} ${reply.reason || 'applied=false'}`
      );
    }
    current = reply.revision;
  }
  for (const target of plan.create) {
    const reply = await client.request('impl-preset-create', {
      expected_revision: current,
      name: target.name,
      settings: { ...target.settings }
    });
    if (reply.conflict === true) {
      return { conflict: true, revision: reply.revision };
    }
    if (reply.applied !== true) {
      throw new JobError(
        'preset_create_failed',
        `${target.name} ${reply.reason || 'applied=false'}`
      );
    }
    current = reply.revision;
  }
  return { conflict: false, revision: current };
}

/**
 * Confirm the five targets exist with EXACTLY their settings and are
 * compatible, and that no legacy id survives (spec §4.4). A same-name preset
 * whose settings drifted between the last write and this read is a mismatch,
 * not a success — the caller re-plans on it.
 *
 * @param {{ revision: number, presets: any[] }} snapshot - Post-write snapshot.
 * @returns {Map<string, string>} Target name to its live preset id.
 */
function verifyPresets(snapshot) {
  /** @type {Map<string, string>} */
  const by_name = new Map();
  for (const target of TARGET_PRESETS) {
    const live = snapshot.presets.find(
      (preset) =>
        preset.name === target.name &&
        preset.compatible === true &&
        settingsEqual(target.settings, preset.settings || {})
    );
    if (!live) {
      throw new JobError('preset_readback_missing', target.name);
    }
    by_name.set(target.name, live.id);
  }
  const legacy = new Set(LEGACY_PRESET_IDS);
  const survivor = snapshot.presets.find((preset) => legacy.has(preset.id));
  if (survivor) {
    throw new JobError('preset_readback_legacy_present', survivor.id);
  }
  return by_name;
}

/**
 * Pick the dotfiles and beads-ui workspace roots out of `list-workspaces`.
 *
 * @param {any} payload - The `list-workspaces` reply payload.
 * @returns {string[]} Absolute roots, in `WORKSPACE_BASENAMES` order.
 */
function selectWorkspaceRoots(payload) {
  const rows = Array.isArray(payload.workspaces) ? payload.workspaces : [];
  /** @type {string[]} */
  const roots = [];
  for (const basename of WORKSPACE_BASENAMES) {
    const match = rows.find(
      /** @param {any} row - Workspace row. */ (row) => {
        const root = row.root_dir || row.path;
        return typeof root === 'string' && path.basename(root) === basename;
      }
    );
    if (!match) {
      throw new JobError('workspace_missing', basename);
    }
    roots.push(match.root_dir || match.path);
  }
  return roots;
}

/**
 * Check one `apply-impl-preset-global` reply's lane report (spec §3.8).
 *
 * @param {any} reply - The reply payload.
 * @param {'general'|'quick_fix'} lane - The lane that was applied.
 */
function verifyLaneReport(reply, lane) {
  if (lane !== 'quick_fix') {
    return;
  }
  const lane_warnings = (reply.warnings || []).filter(
    /** @param {string} warning - One warning string. */
    (warning) => warning.startsWith('lane_incompatible:')
  );
  if (
    lane_warnings.length !== 1 ||
    lane_warnings[0] !== EXPECTED_LANE_WARNING
  ) {
    throw new JobError(
      'lane_report_unexpected',
      `warnings=${JSON.stringify(lane_warnings)}`
    );
  }
  const observed = new Set(reply.skipped_keys || []);
  const expected = new Set(EXPECTED_QUICK_FIX_SKIPPED_KEYS);
  if (
    observed.size !== expected.size ||
    [...expected].some((key) => !observed.has(key))
  ) {
    throw new JobError(
      'lane_report_unexpected',
      `skipped_keys=${JSON.stringify([...observed])}`
    );
  }
}

/**
 * Apply one lane of the 최고효율 profile to one workspace, retrying the queue
 * CAS up to `MAX_ATTEMPTS` times (spec §4.5).
 *
 * @param {WsClient} client - Connected client.
 * @param {string} preset_id - The 최고효율 preset id.
 * @param {number} preset_revision - Current preset revision.
 * @param {string} root_dir - Target workspace root.
 * @param {'general'|'quick_fix'} lane - Lane to apply.
 * @returns {Promise<{ preset_conflict: boolean, queue: any }>}
 */
async function applyLane(client, preset_id, preset_revision, root_dir, lane) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const queue = await readQueueSnapshot(client, root_dir);
    const reply = await client.request('apply-impl-preset-global', {
      preset_id,
      expected_revision: preset_revision,
      expected_queue_revision: queue.revision,
      lane,
      root_dir
    });
    if (reply.conflict === true) {
      return { preset_conflict: true, queue: null };
    }
    if (reply.applied !== true) {
      throw new JobError('kv_apply_failed', `${root_dir} ${lane}`);
    }
    if (reply.queue_applied !== true) {
      continue;
    }
    verifyLaneReport(reply, lane);
    return { preset_conflict: false, queue: reply.queue };
  }
  throw new JobError('queue_apply_failed', `${root_dir} ${lane}`);
}

/**
 * Read `workflow_session_defaults` from one workspace through `bd`.
 *
 * @param {string} root_dir - Workspace root.
 * @returns {Record<string, unknown>}
 */
function readKvDefaults(root_dir) {
  let raw;
  try {
    raw = execFileSync(
      'bd',
      ['-C', root_dir, 'kv', 'get', 'workflow_session_defaults', '--json'],
      { encoding: 'utf8' }
    );
  } catch (err) {
    throw new JobError(
      'kv_readback_failed',
      err instanceof Error ? err.message : String(err)
    );
  }
  const envelope = JSON.parse(raw);
  if (envelope.found !== true || typeof envelope.value !== 'string') {
    throw new JobError('kv_readback_failed', `${root_dir} not found`);
  }
  return JSON.parse(envelope.value);
}

/**
 * Confirm kv and queue landed the expected profile (spec §4.6). Orchestration
 * defaults are stored as TOP-LEVEL queue keys; the retired `exec_defaults` map
 * is still read as a fallback so an older queue file cannot read as a mismatch.
 *
 * @param {string} root_dir - Workspace root.
 * @param {any} queue - The queue snapshot from the last apply reply.
 * @param {unknown} bdui_url_before - The kv `bdui_url` read before the apply.
 * @returns {{ kv: Record<string, unknown>, queue: Record<string, unknown> }}
 */
function verifyReadback(root_dir, queue, bdui_url_before) {
  const kv = readKvDefaults(root_dir);
  for (const [key, expected] of Object.entries(EXPECTED_KV)) {
    if (kv[key] !== expected) {
      throw new JobError('readback_mismatch', `${root_dir} ${key}`);
    }
  }
  // The lane-incompatible key must be truly ABSENT, not merely empty.
  if (Object.hasOwn(kv, 'quick_fix_impl_model')) {
    throw new JobError('readback_mismatch', `${root_dir} quick_fix_impl_model`);
  }
  // Preservation is proved against the value read BEFORE the apply.
  if (kv.bdui_url !== bdui_url_before) {
    throw new JobError('readback_mismatch', `${root_dir} bdui_url`);
  }
  const exec_defaults = queue.exec_defaults || {};
  /** @type {Record<string, unknown>} */
  const observed_queue = {};
  for (const [key, expected] of Object.entries(EXPECTED_QUEUE)) {
    const observed = Object.hasOwn(queue, key)
      ? queue[key]
      : exec_defaults[key];
    if (observed !== expected) {
      throw new JobError('readback_mismatch', `${root_dir} ${key}`);
    }
    observed_queue[key] = observed;
  }
  return { kv, queue: observed_queue };
}

/**
 * Steps 1-4: plan and execute the preset replacement, re-planning on conflict.
 *
 * @param {WsClient} client - Connected client.
 * @returns {Promise<{ revision_before: number, revision_after: number, plan: import('./lib/exec-presets-plan.js').ReplacementPlan, snapshot: any }>}
 */
async function replacePresets(client) {
  let revision_before = -1;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const snapshot = await readPresetSnapshot(client);
    revision_before = snapshot.revision;
    const plan = planPresetReplacement(
      snapshot,
      TARGET_PRESETS,
      LEGACY_PRESET_IDS
    );
    // A preserved same-name preset would collide with the create that follows
    // it; fail before any delete so nothing is half-replaced.
    const collision = plan.preserve.find((kept) =>
      plan.create.some((target) => target.name === kept.name)
    );
    if (collision) {
      throw new JobError(
        'preset_name_conflict',
        `${collision.id} ${collision.name}`
      );
    }
    const result = await executePlan(client, plan, snapshot.revision);
    if (result.conflict) {
      continue;
    }
    const after = await readPresetSnapshot(client);
    return {
      revision_before,
      revision_after: after.revision,
      plan,
      snapshot: after
    };
  }
  throw new JobError('preset_replace_conflict', `after ${MAX_ATTEMPTS} tries`);
}

/**
 * Steps 5-6: apply the kv default preset to both rigs and read both halves back.
 *
 * @param {WsClient} client - Connected client.
 * @param {Map<string, string>} preset_ids - Target name to live preset id.
 * @param {number} preset_revision - Preset revision after replacement.
 * @returns {Promise<{ preset_conflict: boolean, applied: Record<string, any>, readback: Record<string, any> }>}
 */
async function applyDefaults(client, preset_ids, preset_revision) {
  const listed = await client.request('list-workspaces', {});
  const roots = selectWorkspaceRoots(listed);
  const preset_id = /** @type {string} */ (
    preset_ids.get(KV_DEFAULT_PRESET_NAME)
  );
  /** @type {Record<string, any>} */
  const applied = {};
  /** @type {Record<string, any>} */
  const readback = {};
  for (const root_dir of roots) {
    /** @type {Record<string, boolean>} */
    const lanes = {};
    /** @type {any} */
    let last_queue = null;
    const bdui_url_before = readKvDefaults(root_dir).bdui_url;
    for (const lane of /** @type {const} */ (['general', 'quick_fix'])) {
      const result = await applyLane(
        client,
        preset_id,
        preset_revision,
        root_dir,
        lane
      );
      if (result.preset_conflict) {
        // A preset revision moved under us: hand control back to the caller,
        // which re-plans from a fresh snapshot (spec §4.5 → §4.3).
        return { preset_conflict: true, applied, readback };
      }
      lanes[lane] = true;
      last_queue = result.queue;
    }
    applied[root_dir] = lanes;
    readback[root_dir] = verifyReadback(root_dir, last_queue, bdui_url_before);
  }
  return { preset_conflict: false, applied, readback };
}

/**
 * Judge whether both rigs already carry the 최고효율 profile in kv and queue,
 * without writing anything. Used on a rerun whose preset plan is empty so the
 * idempotent path really performs no write (spec §4.2).
 *
 * @param {WsClient} client - Connected client.
 * @returns {Promise<Record<string, any>|null>} Per-root readback when
 * everything matches, `null` when any key differs.
 */
async function readDefaultsIfSettled(client) {
  const listed = await client.request('list-workspaces', {});
  const roots = selectWorkspaceRoots(listed);
  /** @type {Record<string, any>} */
  const readback = {};
  for (const root_dir of roots) {
    const queue = await readQueueSnapshot(client, root_dir);
    try {
      const kv = readKvDefaults(root_dir);
      readback[root_dir] = verifyReadback(root_dir, queue, kv.bdui_url);
    } catch (err) {
      if (err instanceof JobError && err.code === 'readback_mismatch') {
        return null;
      }
      throw err;
    }
  }
  return readback;
}

/**
 * Entry point. Dry run reads and prints; `--apply` runs the full procedure.
 *
 * @returns {Promise<void>}
 */
async function main() {
  const apply = process.argv.slice(2).includes('--apply');
  const client = new WsClient(resolveServerUrl());
  await client.connect();
  try {
    if (!apply) {
      const snapshot = await readPresetSnapshot(client);
      const plan = planPresetReplacement(
        snapshot,
        TARGET_PRESETS,
        LEGACY_PRESET_IDS
      );
      process.stdout.write(
        `${JSON.stringify({
          dry_run: true,
          revision: snapshot.revision,
          keep: plan.keep,
          delete: plan.delete,
          create: plan.create.map((target) => target.name),
          preserve: plan.preserve
        })}\n`
      );
      return;
    }
    // One re-plan loop covers both conflict sources — a preset revision that
    // moves during the replace (§4.3) and one that moves during the kv apply
    // (§4.5) — under the same bound.
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      const replaced = await replacePresets(client);
      const preset_ids = verifyPresets(replaced.snapshot);
      const no_preset_change =
        replaced.plan.delete.length === 0 && replaced.plan.create.length === 0;
      const settled = no_preset_change
        ? await readDefaultsIfSettled(client)
        : null;
      const defaults = settled
        ? { preset_conflict: false, applied: {}, readback: settled }
        : await applyDefaults(client, preset_ids, replaced.revision_after);
      if (defaults.preset_conflict) {
        continue;
      }
      process.stdout.write(
        `${JSON.stringify({
          revision_before: replaced.revision_before,
          revision_after: replaced.revision_after,
          kept: replaced.plan.keep,
          deleted: replaced.plan.delete,
          created: replaced.plan.create.map((target) => target.name),
          preserved: replaced.plan.preserve,
          applied: defaults.applied,
          readback: defaults.readback
        })}\n`
      );
      return;
    }
    throw new JobError(
      'preset_replace_conflict',
      `after ${MAX_ATTEMPTS} tries`
    );
  } finally {
    client.close();
  }
}

main().then(
  () => {
    process.exitCode = 0;
  },
  (err) => {
    process.stderr.write(
      `${err instanceof JobError ? err.message : `unexpected_failure: ${err}`}\n`
    );
    process.exitCode = 1;
  }
);
