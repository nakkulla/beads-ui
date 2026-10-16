/**
 * The jev pair question and the server constants of the placement judgment
 * (UI-izba §4.2–§4.4).
 *
 * The question definition is beads-ui's own (ADR dotfiles-hkski: a consumer
 * that calls jev directly keeps its question on its side). The model, endpoint
 * and time limit are the workflow judge's values, held here as a code registry
 * rather than read from dotfiles at runtime (ADR UI-u6ud-2); the cross-runtime
 * test compares them with dotfiles `judge-questions.yaml` policy.
 */
import crypto from 'node:crypto';

/** @type {string} The workflow judge's jev model. */
export const JEV_MODEL = 'jev-1.13.0';

/** @type {string} The workflow judge's jev endpoint. */
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
      'Issues A and B (A has the smaller id) will be implemented by separate workers and merged separately. How must their implementation and landing be ordered?',
    criteria: Object.freeze({
      independent:
        "Implementing and merging both at the same time changes neither one's premises, files, shared state, contract clauses or deployment surface.",
      a_first:
        "B builds on A's result, or B would have to be redone if A landed later.",
      b_first:
        "A builds on B's result, or A would have to be redone if B landed later.",
      conflict:
        "Both change the same file area, shared state, contract clause or deployment surface, so doing them at the same time collides, yet neither relies on the other's result."
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

/** @type {number} A jev answer is adopted at this confidence or above. */
export const ADOPT_CONFIDENCE = 0.8;

/**
 * An unadopted non-`independent` first choice at this confidence or above is
 * shown as a 참고 line (never used for placement). The browser applies it; the
 * value rides here so both sides read one number.
 *
 * @type {number}
 */
export const REFERENCE_CONFIDENCE = 0.5;

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
