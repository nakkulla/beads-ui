/**
 * Server-global provider holds (UI-3v1h §5.1).
 *
 * A provider hold is a property of an account (`usage_limit`, an account-bound
 * `credential` outage) or of a whole runner (every other outage), never of a
 * repository. This store is the ONE source of every such hold: every
 * workspace's dispatch gate, switch-candidate exclusion, and live preempt read
 * it, and one process-wide probe controller releases it.
 *
 * What stays per workspace is the {@link ProviderHoldMember membership}: which
 * held attempt of that workspace waits on which global target, plus the switch
 * state its own `provider_limit_policy` decides. An account-unresolved
 * `usage_limit` target never reaches this store — it stays in its workspace's
 * own `provider_hold` (§5.1), because fanning a fail-closed runner-wide block
 * out to every repository would let one catalog miss stop the whole server.
 *
 * Persistence follows the other server-global files (`timing-settings.js`):
 * one JSON file written temp+rename, an in-memory cache, and persist BEFORE the
 * cache moves, so a failed write throws and leaves memory at the prior state.
 */
import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { providerHoldsFilePath } from './state-paths.js';

const log = debug('worker:provider-holds');

/**
 * @typedef {Object} GlobalProviderTarget
 * @property {string} target_id - Immutable identity, fixed when the target is
 * first created. A probe reclassifying `kind` keeps it.
 * @property {string} origin - The workspace that first observed the target;
 * only the notification label and the probe cwd read it.
 * @property {'outage'|'usage_limit'} kind
 * @property {string} model
 * @property {string|null} account
 * @property {string} detail
 * @property {string} last_error
 * @property {number|null} resets_at
 * @property {number} rearm_count
 * @property {number|null} next_probe_at
 */
/**
 * @typedef {Object} GlobalProviderHold
 * @property {number} since
 * @property {number} generation
 * @property {GlobalProviderTarget[]} targets
 */
/**
 * @typedef {Object} ProviderHoldState
 * @property {number} generation - Global monotonic counter; a new runner hold
 * takes the counter + 1.
 * @property {Record<string, GlobalProviderHold>} holds
 */
/**
 * One held attempt's binding to a global target (UI-3v1h §5.1), kept in its
 * own workspace's queue.
 *
 * @typedef {Object} ProviderHoldMember
 * @property {string} runner
 * @property {string} target_id
 * @property {string|null} account - The target's account at entry. Durable on
 * purpose: an attempt record need not name the held account, and the target
 * may be gone by the time the membership is settled.
 * @property {'none'|'unconfigured'|'disabled'|null} [auto_switch]
 * @property {number|null} [switch_ready_at]
 * @property {string|null} [switch_ready_account]
 */
/**
 * @typedef {Object} ProjectedProviderTarget
 * @property {string} [target_id]
 * @property {string} [origin]
 * @property {'outage'|'usage_limit'} kind
 * @property {string} model
 * @property {string|null} account
 * @property {string} detail
 * @property {string} last_error
 * @property {number|null} resets_at
 * @property {number} rearm_count
 * @property {string[]} attempt_ids
 * @property {'none'|'unconfigured'|'disabled'|null} [auto_switch]
 * @property {number|null} [switch_ready_at]
 * @property {string|null} [switch_ready_account]
 * @property {number|null} [next_probe_at]
 */
/**
 * @typedef {Object} ProjectedProviderHold
 * @property {number} since
 * @property {number} generation
 * @property {ProjectedProviderTarget[]} targets
 */
/**
 * @typedef {Object} TargetLocation
 * @property {string} runner
 * @property {number} since
 * @property {number} generation
 * @property {GlobalProviderTarget} target
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Which dispatches one target blocks (UI-3v1h §5.1): an account-scoped target
 * blocks only launches resolved to its account, a runner-scoped one blocks the
 * whole runner, and an `unresolved` one is the fail-closed account-less
 * `usage_limit` that stays in its own workspace.
 *
 * @param {{ kind?: unknown, detail?: unknown, account?: unknown }} target
 * @returns {'account'|'runner'|'unresolved'}
 */
export function providerTargetScope(target) {
  if (target.kind === 'usage_limit') {
    return typeof target.account === 'string' ? 'account' : 'unresolved';
  }
  return target.detail === 'credential' && typeof target.account === 'string'
    ? 'account'
    : 'runner';
}

/**
 * Normalize one stored global target, or null when its identity is incomplete.
 *
 * @param {unknown} value
 * @returns {GlobalProviderTarget|null}
 */
function normalizeGlobalTarget(value) {
  if (
    !isRecord(value) ||
    typeof value.target_id !== 'string' ||
    value.target_id.length === 0 ||
    (value.kind !== 'outage' && value.kind !== 'usage_limit') ||
    typeof value.model !== 'string' ||
    (value.account !== null && typeof value.account !== 'string')
  ) {
    return null;
  }
  return {
    target_id: value.target_id,
    origin: typeof value.origin === 'string' ? value.origin : '',
    kind: value.kind,
    model: value.model,
    account: value.account,
    detail: typeof value.detail === 'string' ? value.detail : '',
    last_error: typeof value.last_error === 'string' ? value.last_error : '',
    resets_at:
      typeof value.resets_at === 'number' && Number.isFinite(value.resets_at)
        ? value.resets_at
        : null,
    rearm_count:
      Number.isInteger(value.rearm_count) && Number(value.rearm_count) >= 0
        ? Number(value.rearm_count)
        : 0,
    next_probe_at:
      typeof value.next_probe_at === 'number' &&
      Number.isFinite(value.next_probe_at)
        ? value.next_probe_at
        : null
  };
}

/**
 * Normalize the stored file, or null when it is not a provider-hold state.
 *
 * @param {unknown} value
 * @returns {ProviderHoldState|null}
 */
function normalizeState(value) {
  if (!isRecord(value) || !isRecord(value.holds)) {
    return null;
  }
  /** @type {Record<string, GlobalProviderHold>} */
  const holds = {};
  /** @type {Set<string>} */
  const seen = new Set();
  let generation =
    Number.isInteger(value.generation) && Number(value.generation) >= 0
      ? Number(value.generation)
      : 0;
  for (const [runner, raw_hold] of Object.entries(value.holds)) {
    if (
      runner.length === 0 ||
      !isRecord(raw_hold) ||
      typeof raw_hold.since !== 'number' ||
      !Number.isFinite(raw_hold.since) ||
      !Number.isInteger(raw_hold.generation) ||
      Number(raw_hold.generation) < 1 ||
      !Array.isArray(raw_hold.targets)
    ) {
      continue;
    }
    /** @type {GlobalProviderTarget[]} */
    const targets = [];
    for (const raw_target of raw_hold.targets) {
      const target = normalizeGlobalTarget(raw_target);
      if (target && !seen.has(target.target_id)) {
        seen.add(target.target_id);
        targets.push(target);
      }
    }
    if (targets.length > 0) {
      holds[runner] = {
        since: raw_hold.since,
        generation: Number(raw_hold.generation),
        targets
      };
      generation = Math.max(generation, Number(raw_hold.generation));
    }
  }
  return { generation, holds };
}

/**
 * Bind one workspace's memberships onto the global targets and append its own
 * account-unresolved targets: the hold set that workspace actually sees
 * (UI-3v1h §5.3/§5.5). The shape is the per-repository `provider_hold` every
 * consumer already reads — `attempt_ids` are that workspace's members of the
 * target (`[]` when it has none), and the switch state comes from them.
 *
 * When a runner has both a global hold and local targets, `since` and
 * `generation` are the global hold's: `↻ 지금 프로브` compares `since` against
 * the global hold, and a local target is never probed.
 *
 * @param {Record<string, GlobalProviderHold>} global_holds
 * @param {Record<string, { since: number, generation: number, targets: any[] }>} local_holds
 * @param {Record<string, ProviderHoldMember>} members
 * @returns {Record<string, ProjectedProviderHold>}
 */
export function effectiveProviderHolds(global_holds, local_holds, members) {
  /** @type {Map<string, Array<{ attempt_id: string, member: ProviderHoldMember }>>} */
  const bound = new Map();
  for (const [attempt_id, member] of Object.entries(members || {})) {
    const list = bound.get(member.target_id) || [];
    list.push({ attempt_id, member });
    bound.set(member.target_id, list);
  }
  /** @type {Record<string, ProjectedProviderHold>} */
  const out = {};
  for (const [runner, hold] of Object.entries(global_holds || {})) {
    out[runner] = {
      since: hold.since,
      generation: hold.generation,
      targets: hold.targets.map((target) => {
        const members_of = bound.get(target.target_id) || [];
        const lead = members_of[0]?.member;
        const auto_switch = lead?.auto_switch ?? null;
        return {
          target_id: target.target_id,
          origin: target.origin,
          kind: target.kind,
          model: target.model,
          account: target.account,
          detail: target.detail,
          last_error: target.last_error,
          resets_at: target.resets_at,
          rearm_count: target.rearm_count,
          attempt_ids: members_of.map((entry) => entry.attempt_id),
          auto_switch,
          switch_ready_at:
            auto_switch === 'none' ? (lead?.switch_ready_at ?? null) : null,
          switch_ready_account:
            auto_switch === 'none'
              ? (lead?.switch_ready_account ?? null)
              : null,
          next_probe_at: target.next_probe_at
        };
      })
    };
  }
  for (const [runner, hold] of Object.entries(local_holds || {})) {
    const local_targets = clone(hold.targets);
    const existing = out[runner];
    if (existing) {
      existing.targets.push(...local_targets);
    } else {
      out[runner] = {
        since: hold.since,
        generation: hold.generation,
        targets: local_targets
      };
    }
  }
  return out;
}

/**
 * Build the server-global provider hold store.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: Pick<typeof nodeFs, 'readFileSync'|'writeFileSync'|'renameSync'|'mkdirSync'>,
 *   now?: () => number,
 *   randomUUID?: () => string,
 *   warn?: (message: string) => void
 * }} [options]
 */
export function createProviderHoldStore(options = {}) {
  const filePath = options.filePath || providerHoldsFilePath;
  const fs = options.fs || nodeFs;
  const now = options.now || (() => Date.now());
  const randomUUID = options.randomUUID || (() => nodeCrypto.randomUUID());
  const warn = options.warn || ((message) => console.warn(message));
  /** @type {ProviderHoldState|null} */
  let cache = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /**
   * Keep an unreadable or malformed file beside the new one (§6): there is no
   * other source to rebuild it from, so a person must be able to read it.
   *
   * @param {string} file
   * @param {string} why
   */
  function preserveAside(file, why) {
    const aside = `${file}.corrupt-${now()}`;
    try {
      fs.renameSync(file, aside);
      warn(
        `provider-holds: ${file} ${why} — ${aside}에 보존하고 빈 보류로 시작합니다.`
      );
    } catch (err) {
      warn(
        `provider-holds: ${file} ${why} — 보존 실패(${String(err)}), 빈 보류로 시작합니다.`
      );
    }
  }

  /**
   * @returns {ProviderHoldState}
   */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    const file = filePath();
    /** @type {string|null} */
    let text = null;
    try {
      text = fs.readFileSync(file, 'utf8');
    } catch (err) {
      if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
        preserveAside(file, `읽기 실패(${String(err)})`);
      }
    }
    if (text === null) {
      cache = { generation: 0, holds: {} };
      return cache;
    }
    /** @type {ProviderHoldState|null} */
    let parsed = null;
    try {
      parsed = normalizeState(JSON.parse(text));
    } catch {
      parsed = null;
    }
    if (!parsed) {
      preserveAside(file, '형식 오류');
      cache = { generation: 0, holds: {} };
      return cache;
    }
    cache = parsed;
    return cache;
  }

  /**
   * @param {ProviderHoldState} state
   */
  function persist(state) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * Apply one change on a clone; persist first, then move the cache, then
   * tell listeners. An unchanged state writes nothing.
   *
   * @template R
   * @param {(next: ProviderHoldState) => R} change
   * @returns {R}
   */
  function mutate(change) {
    const current = ensureLoaded();
    const next = clone(current);
    const result = change(next);
    if (JSON.stringify(next) === JSON.stringify(current)) {
      return result;
    }
    persist(next);
    cache = next;
    for (const listener of [...listeners]) {
      try {
        listener();
      } catch (err) {
        log('provider-hold listener failed: %o', err);
      }
    }
    return result;
  }

  /**
   * @param {ProviderHoldState} state
   * @param {(runner: string, hold: GlobalProviderHold, target: GlobalProviderTarget) => boolean} predicate
   * @returns {{ runner: string, hold: GlobalProviderHold, target: GlobalProviderTarget, index: number }|null}
   */
  function locate(state, predicate) {
    for (const [runner, hold] of Object.entries(state.holds)) {
      const index = hold.targets.findIndex((target) =>
        predicate(runner, hold, target)
      );
      if (index >= 0) {
        return { runner, hold, target: hold.targets[index], index };
      }
    }
    return null;
  }

  /**
   * @param {{ runner: string, hold: GlobalProviderHold, target: GlobalProviderTarget }|null} found
   * @returns {TargetLocation|null}
   */
  function location(found) {
    return found
      ? {
          runner: found.runner,
          since: found.hold.since,
          generation: found.hold.generation,
          target: clone(found.target)
        }
      : null;
  }

  return {
    /**
     * The whole state, cloned.
     *
     * @returns {ProviderHoldState}
     */
    snapshot() {
      return clone(ensureLoaded());
    },

    /**
     * Every runner hold, cloned.
     *
     * @returns {Record<string, GlobalProviderHold>}
     */
    holds() {
      return clone(ensureLoaded().holds);
    },

    /**
     * The global generation counter.
     *
     * @returns {number}
     */
    generation() {
      return ensureLoaded().generation;
    },

    /**
     * Whether a target with this identity stands right now.
     *
     * @param {string} target_id
     */
    has(target_id) {
      return (
        locate(
          ensureLoaded(),
          (_r, _h, target) => target.target_id === target_id
        ) !== null
      );
    },

    /**
     * Locate one target by identity.
     *
     * @param {string} target_id
     * @returns {TargetLocation|null}
     */
    find(target_id) {
      return location(
        locate(
          ensureLoaded(),
          (_r, _h, target) => target.target_id === target_id
        )
      );
    },

    /**
     * Locate one target by its merge key `(runner, kind, model, account)`.
     *
     * @param {{ runner: string, kind: string, model: string, account: string|null }} key
     * @returns {TargetLocation|null}
     */
    findBy(key) {
      return location(
        locate(
          ensureLoaded(),
          (runner, _h, target) =>
            runner === key.runner &&
            target.kind === key.kind &&
            target.model === key.model &&
            target.account === key.account
        )
      );
    },

    /**
     * Every account a standing target names, across all runners — the set a
     * switch candidate must avoid (§5.3).
     *
     * @returns {Set<string>}
     */
    heldAccounts() {
      /** @type {Set<string>} */
      const accounts = new Set();
      for (const hold of Object.values(ensureLoaded().holds)) {
        for (const target of hold.targets) {
          if (typeof target.account === 'string') {
            accounts.add(target.account);
          }
        }
      }
      return accounts;
    },

    /**
     * Create or merge one target (§5.2 step 1). A same-key re-entry keeps the
     * target's identity: `detail`, `last_error` and `resets_at` follow the new
     * observation and `rearm_count` keeps the larger value. `entered` is true
     * only for the call that created the target — Node runs this whole
     * function on one turn, so two workspaces entering together still see it
     * once. Throws when the write fails, before any queue write. `since` only
     * seeds a runner hold this call creates (the migration keeps the
     * per-repository hold's start); a live entry starts it now.
     *
     * @param {{ runner: string, origin: string, since?: number, target: { kind: 'outage'|'usage_limit', model: string, account: string|null, detail?: string, last_error?: string, resets_at?: number|null, rearm_count?: number } }} input
     * @returns {{ target_id: string, generation: number, since: number, entered: boolean, origin: string }|null}
     */
    enter(input) {
      const target = input.target;
      if (
        typeof input.runner !== 'string' ||
        input.runner.length === 0 ||
        (target.kind !== 'outage' && target.kind !== 'usage_limit') ||
        (target.kind === 'usage_limit' && typeof target.account !== 'string')
      ) {
        return null;
      }
      return mutate((next) => {
        let hold = next.holds[input.runner];
        if (!hold) {
          next.generation += 1;
          hold = {
            since:
              typeof input.since === 'number' && Number.isFinite(input.since)
                ? input.since
                : now(),
            generation: next.generation,
            targets: []
          };
          next.holds[input.runner] = hold;
        }
        const existing = hold.targets.find(
          (candidate) =>
            candidate.kind === target.kind &&
            candidate.model === target.model &&
            candidate.account === target.account
        );
        const rearm_count =
          Number.isInteger(target.rearm_count) &&
          Number(target.rearm_count) >= 0
            ? Number(target.rearm_count)
            : 0;
        const resets_at =
          typeof target.resets_at === 'number' &&
          Number.isFinite(target.resets_at)
            ? target.resets_at
            : null;
        if (existing) {
          existing.detail = target.detail ?? existing.detail;
          existing.last_error = target.last_error ?? existing.last_error;
          existing.resets_at = resets_at;
          existing.rearm_count = Math.max(existing.rearm_count, rearm_count);
          return {
            target_id: existing.target_id,
            generation: hold.generation,
            since: hold.since,
            entered: false,
            origin: existing.origin
          };
        }
        /** @type {GlobalProviderTarget} */
        const created = {
          target_id: randomUUID(),
          origin: input.origin,
          kind: target.kind,
          model: target.model,
          account: target.account,
          detail: typeof target.detail === 'string' ? target.detail : '',
          last_error:
            typeof target.last_error === 'string' ? target.last_error : '',
          resets_at,
          rearm_count,
          next_probe_at: null
        };
        hold.targets.push(created);
        return {
          target_id: created.target_id,
          generation: hold.generation,
          since: hold.since,
          entered: true,
          origin: created.origin
        };
      });
    },

    /**
     * Patch one target's observation fields in place. The identity
     * (`target_id`, `origin`, `model`, `account`) never changes; a `kind` patch
     * is the probe's reclassification. False when the target is gone.
     *
     * @param {string} target_id
     * @param {{ kind?: 'outage'|'usage_limit', detail?: string, last_error?: string, resets_at?: number|null, rearm_count?: number, next_probe_at?: number|null }} patch
     * @returns {boolean}
     */
    update(target_id, patch) {
      return mutate((next) => {
        const found = locate(
          next,
          (_r, _h, target) => target.target_id === target_id
        );
        if (!found) {
          return false;
        }
        const target = found.target;
        if (patch.kind === 'outage' || patch.kind === 'usage_limit') {
          target.kind = patch.kind;
        }
        if (typeof patch.detail === 'string') {
          target.detail = patch.detail;
        }
        if (typeof patch.last_error === 'string') {
          target.last_error = patch.last_error;
        }
        if (
          patch.resets_at === null ||
          (typeof patch.resets_at === 'number' &&
            Number.isFinite(patch.resets_at))
        ) {
          target.resets_at = patch.resets_at;
        }
        if (
          Number.isInteger(patch.rearm_count) &&
          Number(patch.rearm_count) >= 0
        ) {
          target.rearm_count = Number(patch.rearm_count);
        }
        if (
          patch.next_probe_at === null ||
          (typeof patch.next_probe_at === 'number' &&
            Number.isFinite(patch.next_probe_at))
        ) {
          target.next_probe_at = patch.next_probe_at;
        }
        return true;
      });
    },

    /**
     * Delete one target (§5.4 release step 1); the runner hold goes with its
     * last target. Null when the target is already gone.
     *
     * @param {string} target_id
     * @returns {(TargetLocation & { hold_removed: boolean })|null}
     */
    remove(target_id) {
      return mutate((next) => {
        const found = locate(
          next,
          (_r, _h, target) => target.target_id === target_id
        );
        if (!found) {
          return null;
        }
        const removed = {
          runner: found.runner,
          since: found.hold.since,
          generation: found.hold.generation,
          target: clone(found.target),
          hold_removed: false
        };
        found.hold.targets.splice(found.index, 1);
        if (found.hold.targets.length === 0) {
          delete next.holds[found.runner];
          removed.hold_removed = true;
        }
        return removed;
      });
    },

    /**
     * Raise the counter to at least `value` (§5.6: the migrated queues' largest
     * hold or receipt generation). Never lowers it.
     *
     * @param {number} value
     */
    seedGeneration(value) {
      if (!Number.isInteger(value) || value <= ensureLoaded().generation) {
        return;
      }
      mutate((next) => {
        next.generation = Math.max(next.generation, value);
      });
    },

    /**
     * Subscribe to every successful write.
     *
     * @param {() => void} listener
     * @returns {() => void}
     */
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Drop the in-memory state (test hook): the next read cold-loads the file,
     * exercising the restart path.
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}
