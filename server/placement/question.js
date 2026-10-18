/**
 * The jev pair question and the server constants of the placement judgment
 * (UI-izba §4.2–§4.4).
 *
 * The question definition is beads-ui's own (ADR dotfiles-hkski: a consumer
 * that calls jev directly keeps its question on its side). The model and
 * endpoint belong to dotfiles `shell.lib.decision`'s jev provider; the time
 * limit belongs to the workflow judge's `judge-questions.yaml` policy. They
 * are held here as a code registry rather than read from dotfiles at runtime
 * (ADR UI-u6ud-2); the cross-runtime test compares them with those owners.
 */
import crypto from 'node:crypto';

/** @type {string} The decision adapter's jev model. */
export const JEV_MODEL = 'jev-1.13.0';

/** @type {string} The decision adapter's jev endpoint. */
export const JEV_ENDPOINT = 'https://api.typesafe.ai/v1/systemone';

/** @type {number} The workflow judge's time limit (`timeout_s` 5) in ms. */
export const JEV_TIMEOUT_MS = 5_000;

/**
 * The provider WAF rejects a client without its own agent string, so the call
 * names itself like the two dotfiles precedents do.
 *
 * @type {string}
 */
export const JEV_USER_AGENT =
  'beads-ui-placement/1 (+https://github.com/nakkulla/beads-ui)';

/** @type {string} The one question name a placement request carries. */
export const PLACEMENT_QUESTION = 'placement_pair';

/**
 * The four choices, with A the smaller id of the pair and B the larger one.
 *
 * @type {readonly ['independent', 'a_first', 'b_first', 'conflict']}
 */
export const PLACEMENT_CHOICES = Object.freeze(
  /** @type {const} */ (['independent', 'a_first', 'b_first', 'conflict'])
);

/**
 * The question as the request carries it (`questions` member shape of the
 * workflow judge: `type`, `instructions`, `criteria`).
 */
export const PLACEMENT_QUESTIONS = Object.freeze({
  [PLACEMENT_QUESTION]: Object.freeze({
    type: 'choice',
    instructions:
      'Issues A and B (A has the smaller id) will be implemented by separate workers and merged separately. The state may begin with a line naming the paths their declared scopes overlap on; that line is material about where the two may touch. A folder on that line only says both work somewhere under it, which by itself does not mean they change the same file. How must their implementation and landing be ordered?',
    criteria: Object.freeze({
      independent:
        "Implementing and merging both at the same time changes neither one's premises, and the two do not both change the same file, shared state, contract clause or deployment surface.",
      a_first:
        "B builds on A's result, or B would have to be redone if A landed later.",
      b_first:
        "A builds on B's result, or A would have to be redone if B landed later.",
      conflict:
        "Neither relies on the other's result, but both change the same file, shared state, contract clause or deployment surface, so doing them at the same time collides."
    })
  })
});

/**
 * The question version a cached answer is keyed by: a digest of the question
 * definition itself, so any wording change re-asks every pair without a
 * hand-maintained counter.
 *
 * @type {string}
 */
export const PLACEMENT_QUESTION_VERSION = crypto
  .createHash('sha256')
  .update(JSON.stringify(PLACEMENT_QUESTIONS))
  .digest('hex')
  .slice(0, 12);

// The confidence thresholds live in the import-free `wire.js`, because the
// browser's placement computation reads the 참고 threshold and this module's
// `node:crypto` import cannot enter the bundle.
export {
  ADOPT_CONFIDENCE,
  OVERLAP_INDEPENDENT_CONFIDENCE,
  REFERENCE_CONFIDENCE
} from './wire.js';

/** @type {number} Per-issue material cap in characters. */
export const ISSUE_MATERIAL_CAP = 12_000;

/** @type {number} Whole-state cap in characters. */
export const STATE_CAP = 24_000;

/** @type {number} Debounce of a workspace's changes before one computation. */
export const BATCH_DELAY_MS = 3_000;

/** @type {number} Server-wide concurrent jev calls. */
export const CONCURRENCY = 2;

/** @type {number} A failed pair is not asked again within this window. */
export const FAILURE_BACKOFF_MS = 10 * 60_000;

/** @type {number} A missing key is looked up again only after this window. */
export const KEY_RECHECK_MS = 10 * 60_000;

/** @type {number} A cached answer unused for this long is pruned. */
export const CACHE_UNUSED_TTL_MS = 30 * 24 * 60 * 60_000;
