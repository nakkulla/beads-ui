/**
 * Label/metadata display-policy store — persistence + revision-CAS guard.
 *
 * Owns the durable per-workspace answer to "which labels and which derived
 * chips does this board show?". Cards render every bead label by default; this
 * policy is the subtractive layer on top:
 *
 * - `hidden_labels` hides an exact label,
 * - `hidden_prefixes` hides every label starting with a prefix,
 * - `visible_labels` is the exact-match override that wins over BOTH (it is how
 *   a single label escapes a prefix rule),
 * - `chips` toggles the derived card chips and the stepper.
 *
 * Resolution order is `visible_labels` > `hidden_labels` > `hidden_prefixes` >
 * shown. The store keeps `visible_labels` and `hidden_labels` disjoint so the
 * first two levels can never disagree about the same label.
 *
 * The default seed hides exactly the retired display-only mirror labels
 * (`has:spec`, `pr`, `reviewed:*`, `skipped:*`) whose authority moved to bead
 * metadata; every other label starts visible.
 *
 * Persistence mirrors the UI-order store: one `display-policy.json` per
 * workspace under `$XDG_STATE_HOME/bdui/<slug>/` (see state-paths.js), written
 * atomically (temp file + rename), guarded by an integer `revision` CAS so a
 * stale settings panel cannot clobber a newer policy.
 *
 * @typedef {Object} DisplayPolicyChips
 * @property {boolean} route
 * @property {boolean} fast_track
 * @property {boolean} pr
 * @property {boolean} from
 * @property {boolean} blocked
 * @property {boolean} stepper
 */
/**
 * @typedef {Object} DisplayPolicy
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {string[]} hidden_labels - Exact labels to hide.
 * @property {string[]} hidden_prefixes - Label prefixes to hide.
 * @property {string[]} visible_labels - Exact labels forced visible.
 * @property {DisplayPolicyChips} chips - Derived chip / stepper toggles.
 */
/**
 * @typedef {Object} DisplayPolicyOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {number} revision - Current revision (new on success, unchanged else).
 * @property {DisplayPolicy} policy - Current policy (snapshot copy).
 */
/**
 * @typedef {Object} DisplayPolicyPatch
 * @property {string[]} [hidden_labels]
 * @property {string[]} [hidden_prefixes]
 * @property {string[]} [visible_labels]
 * @property {Partial<DisplayPolicyChips>} [chips]
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { displayPolicyFilePath } from './worker/state-paths.js';

/**
 * Retired display-only mirror labels. Their authority is bead metadata and the
 * card stepper already renders that readiness, so they are hidden by default
 * rather than deleted from existing beads.
 *
 * Exported because they are this repository's ONLY spelling of that workflow
 * vocabulary, and a second copy would be a second vocabulary.
 *
 * @type {ReadonlyArray<string>}
 */
export const RETIRED_MIRROR_LABELS = ['has:spec', 'pr'];

/** @type {ReadonlyArray<string>} */
export const RETIRED_MIRROR_LABEL_PREFIXES = ['reviewed:', 'skipped:'];

const SEED_HIDDEN_LABELS = [...RETIRED_MIRROR_LABELS];
const SEED_HIDDEN_PREFIXES = [...RETIRED_MIRROR_LABEL_PREFIXES];

/** @type {Array<keyof DisplayPolicyChips>} */
const CHIP_KEYS = ['route', 'fast_track', 'pr', 'from', 'blocked', 'stepper'];

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @returns {DisplayPolicyChips}
 */
function defaultChips() {
  return {
    route: true,
    fast_track: true,
    pr: true,
    from: true,
    blocked: true,
    stepper: true
  };
}

/**
 * The policy a workspace gets before anyone edits it.
 *
 * @returns {DisplayPolicy}
 */
export function defaultDisplayPolicy() {
  return {
    revision: 0,
    hidden_labels: [...SEED_HIDDEN_LABELS],
    hidden_prefixes: [...SEED_HIDDEN_PREFIXES],
    visible_labels: [],
    chips: defaultChips()
  };
}

/**
 * Deep clone via JSON — policy state is plain data, so this keeps returned
 * snapshots isolated from the in-memory cache.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Coerce a value to a de-duplicated list of non-blank strings, preserving
 * first-seen order. Returns null when the value is not an array at all, so
 * callers can tell "absent/invalid" from "explicitly empty".
 *
 * @param {unknown} value
 * @returns {string[] | null}
 */
function toStringList(value) {
  if (!Array.isArray(value)) {
    return null;
  }
  /** @type {string[]} */
  const out = [];
  for (const entry of value) {
    if (typeof entry !== 'string') {
      continue;
    }
    const trimmed = entry.trim();
    if (trimmed.length > 0 && !out.includes(trimmed)) {
      out.push(trimmed);
    }
  }
  return out;
}

/**
 * Enforce the invariant the resolution order depends on: a label is never both
 * force-visible and exact-hidden. `visible_labels` wins because it is the
 * higher-priority rule, so the duplicate is dropped from `hidden_labels`.
 *
 * @param {DisplayPolicy} policy
 */
function dropVisibleFromHidden(policy) {
  policy.hidden_labels = policy.hidden_labels.filter(
    (label) => !policy.visible_labels.includes(label)
  );
}

/**
 * @param {unknown} raw
 * @returns {DisplayPolicy}
 */
function normalizeDisplayPolicy(raw) {
  const policy = defaultDisplayPolicy();
  if (!isRecord(raw)) {
    return policy;
  }
  policy.revision =
    typeof raw.revision === 'number' && Number.isFinite(raw.revision)
      ? Math.max(0, Math.floor(raw.revision))
      : 0;
  const hidden_labels = toStringList(raw.hidden_labels);
  if (hidden_labels) {
    policy.hidden_labels = hidden_labels;
  }
  const hidden_prefixes = toStringList(raw.hidden_prefixes);
  if (hidden_prefixes) {
    policy.hidden_prefixes = hidden_prefixes;
  }
  const visible_labels = toStringList(raw.visible_labels);
  if (visible_labels) {
    policy.visible_labels = visible_labels;
  }
  if (isRecord(raw.chips)) {
    for (const key of CHIP_KEYS) {
      const value = raw.chips[key];
      if (typeof value === 'boolean') {
        policy.chips[key] = value;
      }
    }
  }
  dropVisibleFromHidden(policy);
  return policy;
}

/**
 * A patch is valid when every present key carries the right kind of value.
 * Unknown keys are ignored rather than rejected so an older client stays usable.
 *
 * @param {unknown} patch
 * @returns {patch is DisplayPolicyPatch}
 */
export function isValidDisplayPolicyPatch(patch) {
  if (!isRecord(patch)) {
    return false;
  }
  for (const key of ['hidden_labels', 'hidden_prefixes', 'visible_labels']) {
    const value = patch[key];
    if (value === undefined) {
      continue;
    }
    if (!Array.isArray(value) || value.some((it) => typeof it !== 'string')) {
      return false;
    }
  }
  if (patch.chips !== undefined) {
    if (!isRecord(patch.chips)) {
      return false;
    }
    for (const [key, value] of Object.entries(patch.chips)) {
      if (
        CHIP_KEYS.includes(/** @type {keyof DisplayPolicyChips} */ (key)) &&
        typeof value !== 'boolean'
      ) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Create a display-policy store. A single instance is shared server-wide so all
 * connections observe one coherent in-memory revision, making the CAS
 * authoritative in-process.
 *
 * @param {{ filePathFor?: (workspace: string) => string, fs?: typeof import('node:fs') }} [options]
 */
export function createDisplayPolicyStore(options = {}) {
  const filePathFor = options.filePathFor || displayPolicyFilePath;
  const fs = options.fs || nodeFs;

  /** @type {Map<string, DisplayPolicy>} */
  const cache = new Map();

  /**
   * @param {string} workspace
   * @returns {string}
   */
  function keyFor(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * Cold-load a workspace policy from disk (once per process). A missing or
   * unreadable file yields the default seed.
   *
   * @param {string} workspace
   * @returns {DisplayPolicy}
   */
  function ensureLoaded(workspace) {
    const key = keyFor(workspace);
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    let policy = defaultDisplayPolicy();
    try {
      const raw = fs.readFileSync(filePathFor(workspace), 'utf8');
      policy = normalizeDisplayPolicy(JSON.parse(raw));
    } catch {
      policy = defaultDisplayPolicy();
    }
    cache.set(key, policy);
    return policy;
  }

  /**
   * Atomically persist a policy for a workspace (temp file + rename).
   *
   * @param {string} workspace
   * @param {DisplayPolicy} policy
   */
  function persist(workspace, policy) {
    const file = filePathFor(workspace);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(policy, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * @param {DisplayPolicy} cur
   * @param {boolean} conflict
   * @returns {DisplayPolicyOpResult}
   */
  function reject(cur, conflict) {
    return {
      ok: false,
      conflict,
      revision: cur.revision,
      policy: clone(cur)
    };
  }

  /**
   * Apply a CAS-guarded mutation. Builds the next state on a clone, persists it,
   * and only commits to the cache on a successful write — so a failed write
   * leaves both memory and disk at the prior revision.
   *
   * @param {string} workspace
   * @param {number} expected_revision
   * @param {(next: DisplayPolicy) => boolean} mutate - Returns false to reject.
   * @returns {DisplayPolicyOpResult}
   */
  function applyMutation(workspace, expected_revision, mutate) {
    const cur = ensureLoaded(workspace);
    if (expected_revision !== cur.revision) {
      return reject(cur, true);
    }
    const next = clone(cur);
    if (!mutate(next)) {
      return reject(cur, false);
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return {
      ok: true,
      conflict: false,
      revision: next.revision,
      policy: clone(next)
    };
  }

  return {
    /**
     * Cold-load (and cache) a workspace policy.
     *
     * @param {string} workspace
     * @returns {DisplayPolicy}
     */
    load(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Current in-memory snapshot (loads on first access).
     *
     * @param {string} workspace
     * @returns {DisplayPolicy}
     */
    snapshot(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Replace the provided policy fields. CAS-guarded. Each present list key is
     * a FULL replacement (the settings panel always sends the whole list);
     * `chips` merges per key so a partial toggle patch is legal. An invalid
     * patch rejects the whole write.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, policy: DisplayPolicyPatch }} input
     * @returns {DisplayPolicyOpResult}
     */
    setPolicy(workspace, input) {
      const { expected_revision, policy: patch } = input || {};
      return applyMutation(workspace, expected_revision, (next) => {
        if (!isValidDisplayPolicyPatch(patch)) {
          return false;
        }
        const hidden_labels = toStringList(patch.hidden_labels);
        if (hidden_labels) {
          next.hidden_labels = hidden_labels;
        }
        const hidden_prefixes = toStringList(patch.hidden_prefixes);
        if (hidden_prefixes) {
          next.hidden_prefixes = hidden_prefixes;
        }
        const visible_labels = toStringList(patch.visible_labels);
        if (visible_labels) {
          next.visible_labels = visible_labels;
        }
        if (isRecord(patch.chips)) {
          for (const key of CHIP_KEYS) {
            const value = patch.chips[key];
            if (typeof value === 'boolean') {
              next.chips[key] = value;
            }
          }
        }
        dropVisibleFromHidden(next);
        return true;
      });
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk).
     */
    __clearCacheForTest() {
      cache.clear();
    }
  };
}
