/**
 * Cross-lane membership store — the durable SERVER-GLOBAL set of monitor
 * 연결 레인 (UI-j92s §4.1/§4.2).
 *
 * A lane is stored membership, not a derived graph component: the bd `blocks`
 * dependencies stay the execution truth, while this file says which beads the
 * user put in one lane and in what order. Like the visible-workspaces and
 * exec-preset stores this is ONE file for the whole server (lanes span repos by
 * definition, so no workspace owns them), and like the queue store it is
 * CAS-guarded: two monitor tabs drag concurrently against one in-memory
 * revision.
 *
 * Persistence: `cross-lanes.json` under `$XDG_STATE_HOME/bdui/` (state-paths).
 * Writes are atomic (temp file + rename) so a crash mid-write never leaves a
 * partial file.
 *
 * @typedef {Object} CrossLaneEntry
 * @property {string} bead_id
 * @property {string} root_dir - Resolved absolute workspace root.
 */
/**
 * @typedef {Object} CrossLane
 * @property {string} id - Server-issued, immutable (`cl_<ulid>`).
 * @property {'draft'|'confirmed'} status
 * @property {string} created_at - ISO 8601.
 * @property {CrossLaneEntry[]} entries - Order IS the lane order.
 */
/**
 * @typedef {Object} CrossLanesState
 * @property {number} revision
 * @property {CrossLane[]} lanes
 */
/**
 * What a mutator hands back: success (with an optional value the caller wants
 * out of the mutation, e.g. a freshly issued lane id) or a rejection carrying
 * one of the channel's error codes.
 *
 * @typedef {{ ok: true, value?: unknown }|{ ok: false, code: string, message: string }} CrossLanesMutationOutcome
 */
/**
 * Server-owned facilities a mutator may use. Lane ids and timestamps are issued
 * HERE rather than by the caller so no request can pin either one.
 *
 * @typedef {Object} CrossLanesMutationContext
 * @property {() => string} newLaneId
 * @property {() => string} nowIso
 */
/**
 * @typedef {{ ok: true, state: CrossLanesState, value: unknown }|{ ok: false, code: string, message: string, state: CrossLanesState|null }} CrossLanesMutationResult
 */
import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { crossLanesFilePath } from './state-paths.js';

/** Crockford base32 — the ULID alphabet. */
const ULID_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ULID_TIME_CHARS = 10;
const ULID_RANDOM_CHARS = 16;

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** @returns {CrossLanesState} */
function emptyState() {
  return { revision: 0, lanes: [] };
}

/**
 * A ULID: 48-bit millisecond timestamp then 80 random bits, Crockford base32.
 * `256 % 32 === 0`, so masking a random byte is unbiased.
 *
 * @param {number} now_ms
 * @param {(size: number) => Buffer} randomBytes
 * @returns {string}
 */
function ulid(now_ms, randomBytes) {
  let time = '';
  let rest = Math.floor(now_ms);
  for (let i = 0; i < ULID_TIME_CHARS; i += 1) {
    time = ULID_ALPHABET[rest % 32] + time;
    rest = Math.floor(rest / 32);
  }
  const bytes = randomBytes(ULID_RANDOM_CHARS);
  let random = '';
  for (let i = 0; i < ULID_RANDOM_CHARS; i += 1) {
    random += ULID_ALPHABET[bytes[i] % 32];
  }
  return `${time}${random}`;
}

/**
 * Normalize a parsed file into durable state, or `null` when its SHAPE is
 * violated.
 *
 * Two tiers on purpose. A malformed `entries[]` item is dropped (§4.2
 * normalization) because a half-written member must not take the whole feature
 * down. A malformed LANE — no id, an unknown status, a duplicate id — makes the
 * whole file unreadable instead, because dropping it would silently delete user
 * lanes, and this store never destroys what it cannot understand.
 *
 * @param {unknown} raw
 * @returns {CrossLanesState|null}
 */
function normalizeState(raw) {
  if (!isRecord(raw)) {
    return null;
  }
  if (!Number.isInteger(raw.revision) || Number(raw.revision) < 0) {
    return null;
  }
  if (!Array.isArray(raw.lanes)) {
    return null;
  }
  /** @type {CrossLane[]} */
  const lanes = [];
  /** @type {Set<string>} */
  const lane_ids = new Set();
  /** @type {Set<string>} */
  const owned_beads = new Set();
  for (const raw_lane of raw.lanes) {
    if (!isRecord(raw_lane)) {
      return null;
    }
    const id = typeof raw_lane.id === 'string' ? raw_lane.id : '';
    if (id.length === 0 || lane_ids.has(id)) {
      return null;
    }
    const status = typeof raw_lane.status === 'string' ? raw_lane.status : '';
    if (status !== 'draft' && status !== 'confirmed') {
      return null;
    }
    const created_at =
      typeof raw_lane.created_at === 'string' ? raw_lane.created_at : '';
    if (created_at.length === 0) {
      return null;
    }
    if (!Array.isArray(raw_lane.entries)) {
      return null;
    }
    lane_ids.add(id);
    /** @type {CrossLaneEntry[]} */
    const entries = [];
    for (const raw_entry of raw_lane.entries) {
      if (!isRecord(raw_entry)) {
        continue;
      }
      const bead_id =
        typeof raw_entry.bead_id === 'string' ? raw_entry.bead_id.trim() : '';
      const root_dir =
        typeof raw_entry.root_dir === 'string' ? raw_entry.root_dir.trim() : '';
      // 같은 bead_id는 파일 전체에서 레인 하나에만 속한다 (§4.1). 중복은 첫
      // 것만 남긴다.
      if (
        bead_id.length === 0 ||
        root_dir.length === 0 ||
        owned_beads.has(bead_id)
      ) {
        continue;
      }
      owned_beads.add(bead_id);
      entries.push({ bead_id, root_dir });
    }
    lanes.push({ id, status, created_at, entries });
  }
  return { revision: Number(raw.revision), lanes };
}

/**
 * The membership invariant (§4.1): one bead belongs to at most one lane. The
 * offending position is read from the CURRENT state, because that is the number
 * `연결 N` the user is looking at while the rejected drag happens.
 *
 * @param {CrossLanesState} current
 * @param {CrossLanesState} next
 * @returns {{ position: number }|null} 1-based lane position, or null when clean.
 */
function membershipViolation(current, next) {
  /** @type {Map<string, { lane_id: string, position: number }>} */
  const current_owner = new Map();
  current.lanes.forEach((lane, index) => {
    for (const entry of lane.entries) {
      if (!current_owner.has(entry.bead_id)) {
        current_owner.set(entry.bead_id, {
          lane_id: lane.id,
          position: index + 1
        });
      }
    }
  });
  /** @type {Map<string, number>} */
  const next_position = new Map();
  for (let index = 0; index < next.lanes.length; index += 1) {
    const lane = next.lanes[index];
    for (const entry of lane.entries) {
      const seen = next_position.get(entry.bead_id);
      if (seen !== undefined) {
        return { position: seen };
      }
      next_position.set(entry.bead_id, index + 1);
      const owner = current_owner.get(entry.bead_id);
      if (owner && owner.lane_id !== lane.id) {
        return { position: owner.position };
      }
    }
  }
  return null;
}

/**
 * Create a cross-lanes store. A single instance is shared server-wide so every
 * connection observes one coherent in-memory revision, which is what makes the
 * CAS authoritative in-process.
 *
 * @param {{ filePath?: string, fs?: typeof import('node:fs'), now?: () => number, randomBytes?: (size: number) => Buffer }} [options]
 */
export function createCrossLanesStore(options = {}) {
  const file_path = options.filePath || crossLanesFilePath();
  const fs = options.fs || nodeFs;
  const now = options.now || (() => Date.now());
  const randomBytes =
    options.randomBytes || ((size) => nodeCrypto.randomBytes(size));

  /** @type {CrossLanesState|null} */
  let cache = null;
  let loaded = false;

  /**
   * Cold-load once per process. A missing file is an empty state; anything the
   * parser or the shape check rejects leaves `null` — the unreadable state —
   * and every write path then refuses rather than overwriting with `{}`.
   *
   * @returns {CrossLanesState|null}
   */
  function ensureLoaded() {
    if (loaded) {
      return cache;
    }
    loaded = true;
    /** @type {unknown} */
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    } catch (err) {
      // ENOENT은 "아직 레인이 없다"이고, 그 밖의 읽기·파싱 실패는 "레인이
      // 있는데 못 읽었다"이므로 절대 빈 상태로 덮어쓰지 않는다.
      cache =
        /** @type {NodeJS.ErrnoException} */ (err)?.code === 'ENOENT'
          ? emptyState()
          : null;
      return cache;
    }
    cache = normalizeState(parsed);
    return cache;
  }

  /**
   * @param {CrossLanesState} state
   */
  function persist(state) {
    fs.mkdirSync(path.dirname(file_path), { recursive: true });
    const tmp_path = `${file_path}.tmp`;
    try {
      fs.writeFileSync(tmp_path, JSON.stringify(state, null, 2));
      fs.renameSync(tmp_path, file_path);
    } catch (err) {
      try {
        fs.rmSync?.(tmp_path, { force: true });
      } catch {
        // Preserve the original persistence error.
      }
      throw err;
    }
  }

  return {
    /**
     * Current state, or `null` when the file could not be read. `null` is NOT
     * an empty lane list: the snapshot ships it as-is so the client disables
     * lane ops instead of drawing "레인 없음" over lanes that exist (§7).
     *
     * @returns {CrossLanesState|null}
     */
    read() {
      const current = ensureLoaded();
      return current ? clone(current) : null;
    },

    /**
     * Apply a CAS-guarded mutation. The mutator edits a CLONE; the cache and
     * the file only move after both the mutator and the membership invariant
     * accept, so a rejected write leaves memory and disk at the prior revision.
     *
     * @param {number} expected_revision
     * @param {(next: CrossLanesState, ctx: CrossLanesMutationContext) => CrossLanesMutationOutcome} mutator
     * @returns {CrossLanesMutationResult}
     */
    mutate(expected_revision, mutator) {
      const current = ensureLoaded();
      if (!current) {
        return {
          ok: false,
          code: 'state_unreadable',
          message: '연결 레인 저장소를 읽을 수 없습니다',
          state: null
        };
      }
      if (
        !Number.isInteger(expected_revision) ||
        expected_revision !== current.revision
      ) {
        return {
          ok: false,
          code: 'conflict',
          message: '레인이 다른 곳에서 바뀌었습니다',
          state: clone(current)
        };
      }
      const next = clone(current);
      const outcome = mutator(next, {
        newLaneId: () => `cl_${ulid(now(), randomBytes)}`,
        nowIso: () => new Date(now()).toISOString()
      });
      if (!outcome.ok) {
        return {
          ok: false,
          code: outcome.code,
          message: outcome.message,
          state: clone(current)
        };
      }
      const violation = membershipViolation(current, next);
      if (violation) {
        return {
          ok: false,
          code: 'conflict_membership',
          message: `이미 연결 ${violation.position}에 있습니다`,
          state: clone(current)
        };
      }
      next.revision = current.revision + 1;
      try {
        persist(next);
      } catch {
        // 쓰기 실패도 저장소를 쓸 수 없는 상태다. 캐시는 옛 revision 그대로
        // 두어 메모리와 디스크가 갈라지지 않게 한다.
        return {
          ok: false,
          code: 'state_unreadable',
          message: '연결 레인 저장소에 쓸 수 없습니다',
          state: clone(current)
        };
      }
      cache = next;
      return { ok: true, state: clone(next), value: outcome.value };
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk).
     */
    __clearCacheForTest() {
      cache = null;
      loaded = false;
    }
  };
}

/**
 * The process-wide instance. Lazily built so a test that replaces it is not
 * racing a module-load construction.
 *
 * @type {ReturnType<typeof createCrossLanesStore>|null}
 */
let SINGLETON = null;

/**
 * The ONE store every reader shares. The snapshot projection and all four lane
 * ops read THIS instance, so a push can never carry a revision the next CAS
 * disagrees with.
 */
export function sharedCrossLanesStore() {
  if (!SINGLETON) {
    SINGLETON = createCrossLanesStore();
  }
  return SINGLETON;
}

/**
 * @param {ReturnType<typeof createCrossLanesStore>} instance
 */
export function __setCrossLanesStoreForTest(instance) {
  SINGLETON = instance;
}

export function __resetCrossLanesStoreForTest() {
  SINGLETON = null;
}
