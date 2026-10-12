/**
 * Session-inquiry code-level field registry (UI-gske §3.1). dotfiles
 * `docs/contracts/workflow-state.yaml` `session_inquiry` owns these values;
 * beads-ui only copies and consumes them (ADR UI-u6ud-2).
 *
 * A row is a Bead-less, session-owned human-needed record: the base-sync
 * set-aside resolution session registers it by (repo, ref) and is the one
 * resumed when it dies. The row lives in the workspace queue's
 * `session_inquiries` collection, keyed by a server-generated id.
 */
import { randomBytes } from 'node:crypto';
import path from 'node:path';

/** The row id format: `si-` and twelve lowercase hex digits. */
export const INQUIRY_ID_RE = Object.freeze(/^si-[0-9a-f]{12}$/);

/** The row states, in contract order. */
export const INQUIRY_STATES = Object.freeze(['waiting', 'held', 'closed']);

/**
 * The allowed transitions. `closed` is terminal.
 *
 * @type {Readonly<Record<string, readonly string[]>>}
 */
export const INQUIRY_TRANSITIONS = Object.freeze({
  waiting: Object.freeze(['held', 'closed']),
  held: Object.freeze(['waiting', 'closed']),
  closed: Object.freeze([])
});

/** The one runner the contract accepts. */
export const INQUIRY_RUNNERS = Object.freeze(['claude']);

/** The refname prefix every registered ref carries. */
export const SET_ASIDE_REF_PREFIX = 'refs/set-aside/';

/** The longest `summary` the contract accepts. */
export const SUMMARY_MAX = 200;

/** A lowercase UUID, the registered session id format. */
const SESSION_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * The second first-input line of a resumed session (contract
 * `auto_resume.first_input` `reopened_line`).
 */
export const REOPENED_LINE = '답을 기다리던 해소 세션이 다시 열렸다';

/**
 * The conversation row key prefix: a row's interactive record stands under
 * `session-inquiry:<id>` where a Bead row's stands under its Bead id.
 */
export const SESSION_INQUIRY_ROW_PREFIX = 'session-inquiry:';

/** Why beads-ui closed a row: its set-aside ref is gone from the repo. */
export const REF_ABSENT_REASON = 'ref_absent';

/**
 * @typedef {Object} InquiryBundle
 * @property {string} title
 * @property {string[]} paths
 * @property {string} reason
 */

/**
 * @typedef {Object} InquiryLiveness
 * @property {'alive'|'dead'|'unverified'} state
 * @property {number} at
 * @property {string|null} tmux
 */

/**
 * One stored row (UI-gske §3.1 기록 필드).
 *
 * @typedef {Object} SessionInquiry
 * @property {string} id
 * @property {string} repo
 * @property {string} ref
 * @property {string} session_id
 * @property {'claude'} runner
 * @property {string} cwd
 * @property {string} summary
 * @property {InquiryBundle[]} bundles
 * @property {string[]} related_beads
 * @property {'waiting'|'held'|'closed'} state
 * @property {number} created_at
 * @property {number} updated_at
 * @property {number|null} notified_at
 * @property {string[]} auto_resume_consumed - Session ids an automatic
 * resume already used; append-only.
 * @property {InquiryLiveness|null} liveness
 * @property {string|null} closed_reason
 * @property {string|null} note
 */

/**
 * The validated register request fields.
 *
 * @typedef {Pick<SessionInquiry, 'repo'|'ref'|'session_id'|'runner'|'cwd'|'summary'|'bundles'|'related_beads'>} InquiryRequest
 */

/**
 * A fresh row id.
 *
 * @returns {string}
 */
export function makeInquiryId() {
  return `si-${randomBytes(6).toString('hex')}`;
}

/**
 * The conversation row key of one row.
 *
 * @param {string} id
 * @returns {string}
 */
export function sessionInquiryRowKey(id) {
  return `${SESSION_INQUIRY_ROW_PREFIX}${id}`;
}

/**
 * The row id a conversation row key names, or null for any other row key.
 *
 * @param {unknown} row_key
 * @returns {string|null}
 */
export function sessionInquiryIdOf(row_key) {
  return typeof row_key === 'string' &&
    row_key.startsWith(SESSION_INQUIRY_ROW_PREFIX) &&
    row_key.length > SESSION_INQUIRY_ROW_PREFIX.length
    ? row_key.slice(SESSION_INQUIRY_ROW_PREFIX.length)
    : null;
}

/**
 * The last `max` characters of a ref, after the set-aside prefix.
 *
 * @param {unknown} ref
 * @param {number} [max]
 * @returns {string}
 */
export function refTail(ref, max = 24) {
  if (typeof ref !== 'string') {
    return '';
  }
  const bare = ref.startsWith(SET_ASIDE_REF_PREFIX)
    ? ref.slice(SET_ASIDE_REF_PREFIX.length)
    : ref;
  return bare.length > max ? `…${bare.slice(bare.length - max)}` : bare;
}

/**
 * Whether a row still asks a person (`waiting` or `held`).
 *
 * @param {{ state?: unknown }|null|undefined} row
 * @returns {boolean}
 */
export function isOpenInquiry(row) {
  return !!row && (row.state === 'waiting' || row.state === 'held');
}

/**
 * Whether a row already has its one conversation (contract
 * `live_conversations_per_row: 1`): an unsettled interactive record on the
 * row key. A window still closing counts, because its process still holds
 * the session id a second `--resume` would reopen.
 *
 * @param {{ interactive_sessions?: Record<string, any> }|null|undefined} queue
 * @param {string} id
 * @returns {boolean}
 */
export function hasInquiryConversation(queue, id) {
  const row_key = sessionInquiryRowKey(id);
  return Object.values(queue?.interactive_sessions || {}).some(
    (record) =>
      !!record &&
      record.bead_id === row_key &&
      record.settled_at === null &&
      (record.state === 'live' || record.state === 'exiting')
  );
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function finite(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Validate one register body field by field (UI-gske §3.1 검증 기준). The
 * `repo` registry match is the caller's: this checks only its shape.
 *
 * @param {unknown} raw
 * @returns {{ ok: true, value: InquiryRequest }|{ ok: false, message: string }}
 */
export function validateInquiryRequest(raw) {
  if (!isRecord(raw)) {
    return { ok: false, message: 'body must be a JSON object' };
  }
  const body = raw;
  if (typeof body.repo !== 'string' || !path.isAbsolute(body.repo)) {
    return { ok: false, message: 'repo must be an absolute path' };
  }
  if (
    typeof body.ref !== 'string' ||
    !body.ref.startsWith(SET_ASIDE_REF_PREFIX) ||
    body.ref.length === SET_ASIDE_REF_PREFIX.length
  ) {
    return {
      ok: false,
      message: `ref must be a full refname under ${SET_ASIDE_REF_PREFIX}`
    };
  }
  if (
    typeof body.session_id !== 'string' ||
    !SESSION_ID_RE.test(body.session_id)
  ) {
    return { ok: false, message: 'session_id must be a lowercase UUID' };
  }
  if (!INQUIRY_RUNNERS.includes(body.runner)) {
    return { ok: false, message: 'runner must be claude' };
  }
  if (typeof body.cwd !== 'string' || !path.isAbsolute(body.cwd)) {
    return { ok: false, message: 'cwd must be an absolute path' };
  }
  if (
    !nonEmpty(body.summary) ||
    /[\r\n]/.test(body.summary) ||
    body.summary.length > SUMMARY_MAX
  ) {
    return {
      ok: false,
      message: `summary must be one non-empty line of at most ${SUMMARY_MAX} characters`
    };
  }
  if (!Array.isArray(body.bundles)) {
    return { ok: false, message: 'bundles must be an array' };
  }
  /** @type {InquiryBundle[]} */
  const bundles = [];
  for (const [index, bundle] of body.bundles.entries()) {
    if (
      !isRecord(bundle) ||
      !nonEmpty(bundle.title) ||
      !nonEmpty(bundle.reason) ||
      !Array.isArray(bundle.paths) ||
      !bundle.paths.every(
        (/** @type {unknown} */ item) => typeof item === 'string'
      )
    ) {
      return {
        ok: false,
        message: `bundles[${index}] needs a non-empty title and reason and a string array of paths`
      };
    }
    bundles.push({
      title: bundle.title,
      paths: [...bundle.paths],
      reason: bundle.reason
    });
  }
  /** @type {string[]} */
  let related_beads = [];
  if (body.related_beads !== undefined) {
    if (
      !Array.isArray(body.related_beads) ||
      !body.related_beads.every((/** @type {unknown} */ id) => nonEmpty(id))
    ) {
      return {
        ok: false,
        message: 'related_beads must be an array of bead ids'
      };
    }
    related_beads = [...body.related_beads];
  }
  return {
    ok: true,
    value: {
      repo: body.repo,
      ref: body.ref,
      session_id: body.session_id,
      runner: 'claude',
      cwd: body.cwd,
      summary: body.summary,
      bundles,
      related_beads
    }
  };
}

/**
 * Normalize the durable `session_inquiries` collection on load, dropping a
 * row that cannot name its identity, session or state.
 *
 * @param {unknown} raw
 * @returns {Record<string, SessionInquiry>}
 */
export function normalizeSessionInquiries(raw) {
  /** @type {Record<string, SessionInquiry>} */
  const out = {};
  if (!isRecord(raw)) {
    return out;
  }
  for (const [id, value] of Object.entries(raw)) {
    if (
      !INQUIRY_ID_RE.test(id) ||
      !isRecord(value) ||
      !nonEmpty(value.repo) ||
      !nonEmpty(value.ref) ||
      !nonEmpty(value.session_id) ||
      !nonEmpty(value.cwd) ||
      !INQUIRY_STATES.includes(value.state) ||
      !finite(value.created_at)
    ) {
      continue;
    }
    const liveness =
      isRecord(value.liveness) &&
      ['alive', 'dead', 'unverified'].includes(value.liveness.state) &&
      finite(value.liveness.at)
        ? {
            state: value.liveness.state,
            at: value.liveness.at,
            tmux: nonEmpty(value.liveness.tmux) ? value.liveness.tmux : null
          }
        : null;
    out[id] = {
      id,
      repo: value.repo,
      ref: value.ref,
      session_id: value.session_id,
      runner: 'claude',
      cwd: value.cwd,
      summary: typeof value.summary === 'string' ? value.summary : '',
      bundles: (Array.isArray(value.bundles) ? value.bundles : [])
        .filter(
          (/** @type {unknown} */ bundle) =>
            isRecord(bundle) && nonEmpty(bundle.title)
        )
        .map((/** @type {Record<string, any>} */ bundle) => ({
          title: bundle.title,
          paths: Array.isArray(bundle.paths)
            ? bundle.paths.filter(
                (/** @type {unknown} */ item) => typeof item === 'string'
              )
            : [],
          reason: typeof bundle.reason === 'string' ? bundle.reason : ''
        })),
      related_beads: Array.isArray(value.related_beads)
        ? value.related_beads.filter(nonEmpty)
        : [],
      state: value.state,
      created_at: value.created_at,
      updated_at: finite(value.updated_at)
        ? value.updated_at
        : value.created_at,
      notified_at: finite(value.notified_at) ? value.notified_at : null,
      auto_resume_consumed: Array.isArray(value.auto_resume_consumed)
        ? value.auto_resume_consumed.filter(nonEmpty)
        : [],
      liveness: /** @type {InquiryLiveness|null} */ (liveness),
      closed_reason: nonEmpty(value.closed_reason) ? value.closed_reason : null,
      note: typeof value.note === 'string' ? value.note : null
    };
  }
  return out;
}
