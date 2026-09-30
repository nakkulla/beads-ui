/**
 * The 레포-scope list material of the pipeline lanes (UI-dbn6 §4.2): the 보류
 * shelf (`subscribe-list deferred-issues`) and session-closed completions
 * (`subscribe-list closed-issues`, `params.since`), both subscribed only while
 * their surface is open. The rows are shaped for `buildLanes`'
 * `workspace.deferred` / `workspace.session_done` inputs, exactly as the
 * retired Worker adapter shaped them (UI-p7s2 §3·§5).
 *
 * A closed issue carrying comments is classified once through `get-comments`
 * (a session-lane report makes it a `세션 작업` row); until that answer lands,
 * or when it fails, the row is a plain 닫힘 row — no session badge is guessed.
 */
import { resolveSpecEvidence } from '../../server/spec-id.js';
import { coerceTimestampMs } from './relative-time.js';
import { parseReport } from './report-marker.js';
import {
  APPLIED_EXEC_PRESET_KEY,
  BEAD_PIN_KEYS,
  CHIP_PRESET_SOURCE_KEY
} from './session-model.js';

/** @type {ReadonlyArray<string>} */
const EXEC_PIN_KEYS = [
  ...BEAD_PIN_KEYS,
  'claude_account',
  'codex_account',
  APPLIED_EXEC_PRESET_KEY,
  CHIP_PRESET_SOURCE_KEY
];

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * @param {any} issue
 * @returns {boolean}
 */
function isPhaseChild(issue) {
  const raw = issue && issue.parent;
  const has_parent =
    typeof raw === 'string' ? raw.length > 0 : !!(raw && raw.id);
  return has_parent || /\.\d+$/.test((issue && issue.id) || '');
}

/**
 * @param {any} issue
 * @returns {string[]}
 */
function blockerIdsOf(issue) {
  const info = issue?.blocked_info;
  if (info && typeof info === 'object') {
    return Array.isArray(info.blockers)
      ? info.blockers.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      : [];
  }
  return (Array.isArray(issue?.dependencies) ? issue.dependencies : [])
    .map((/** @type {any} */ dep) => {
      if (typeof dep === 'string') {
        return dep;
      }
      const kind = dep?.type ?? dep?.dependency_type;
      return kind !== undefined && kind !== 'blocks'
        ? ''
        : dep?.depends_on_id || dep?.id || '';
    })
    .filter(
      (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
    );
}

/**
 * The 보류 shelf rows: candidate-shaped facts, no admission judgment,
 * `updated_at` descending.
 *
 * @param {any[]} issues
 * @returns {any[]}
 */
export function deferredRows(issues) {
  /** @type {any[]} */
  const rows = [];
  for (const it of Array.isArray(issues) ? issues : []) {
    if (!it || typeof it.id !== 'string' || isPhaseChild(it)) {
      continue;
    }
    const spec = resolveSpecEvidence(it);
    const route =
      (it.workflow?.route_source === 'explicit' &&
        typeof it.workflow.route === 'string' &&
        it.workflow.route) ||
      (typeof it.metadata?.route === 'string' ? it.metadata.route : '');
    const blocker_ids = blockerIdsOf(it);
    /** @type {Record<string, string>} */
    const pins = {};
    for (const key of EXEC_PIN_KEYS) {
      const value = objectOf(it.metadata)[key];
      if (typeof value === 'string' && value.length > 0) {
        pins[key] = value;
      }
    }
    rows.push({
      bead_id: it.id,
      title: it.title || it.id,
      route,
      spec_id: spec.conflict ? '' : spec.path,
      published: spec.evidence === 'published',
      blocked: blocker_ids.length > 0,
      blocked_by: blocker_ids,
      labels: Array.isArray(it.labels) ? it.labels : [],
      ...(typeof it.issue_type === 'string' && it.issue_type.length > 0
        ? { issue_type: it.issue_type }
        : {}),
      ...(typeof it.priority === 'number' ? { priority: it.priority } : {}),
      created_at: it.created_at,
      updated_at: it.updated_at,
      status: it.status,
      workflow: it.workflow || null,
      exec_pins: pins,
      observation: true,
      deferred: true,
      release_info: it.release_info,
      dependents_info: it.dependents_info
    });
  }
  rows.sort(
    (a, b) =>
      (coerceTimestampMs(b.updated_at) ?? 0) -
        (coerceTimestampMs(a.updated_at) ?? 0) ||
      a.bead_id.localeCompare(b.bead_id)
  );
  return rows;
}

/**
 * The session-closed completion rows, with a per-issue `get-comments`
 * classification cache.
 *
 * @param {{ send: (type: string, payload: unknown) => Promise<any>, onChange: () => void }} deps
 */
export function createClosedRows(deps) {
  /** @type {Map<string, 'pending'|'session'|'not-session'|'failed'>} */
  const cache = new Map();

  return {
    /**
     * @param {any} queue - The repo's queue view (its `done` entries win).
     * @param {any[]} closed
     * @param {string} root_dir
     * @param {number|undefined} done_since
     * @returns {any[]}
     */
    rows(queue, closed, root_dir, done_since) {
      const worker_done = new Set(
        (Array.isArray(queue?.done) ? queue.done : [])
          .map((/** @type {any} */ entry) => entry?.bead_id)
          .filter((/** @type {any} */ id) => typeof id === 'string')
      );
      /** @type {any[]} */
      const rows = [];
      for (const issue of Array.isArray(closed) ? closed : []) {
        const closed_at = coerceTimestampMs(issue?.closed_at);
        if (
          !issue ||
          typeof issue.id !== 'string' ||
          worker_done.has(issue.id) ||
          closed_at === null ||
          (done_since !== undefined && closed_at < done_since)
        ) {
          continue;
        }
        const fields = {
          labels: Array.isArray(issue.labels) ? issue.labels : [],
          ...(typeof issue.issue_type === 'string' &&
          issue.issue_type.length > 0
            ? { issue_type: issue.issue_type }
            : {}),
          ...(typeof issue.priority === 'number'
            ? { priority: issue.priority }
            : {})
        };
        const base = {
          id: issue.id,
          title: issue.title || issue.id,
          reason: '',
          draggable: false,
          done: true,
          lane: 'done',
          badges: [],
          alert: false,
          usage: null,
          work_ms: null,
          done_at: closed_at,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          workflow: issue.workflow || null,
          ...fields
        };
        const has_comments =
          typeof issue.comment_count === 'number' && issue.comment_count > 0;
        if (!has_comments) {
          rows.push(base);
          continue;
        }
        const identity = `${root_dir}\u0000${issue.id}\u0000${String(issue.updated_at)}\u0000${issue.comment_count}`;
        const cached = cache.get(identity);
        if (cached === undefined) {
          cache.set(identity, 'pending');
          void Promise.resolve(deps.send('get-comments', { id: issue.id }))
            .then((comments) => {
              const session =
                Array.isArray(comments) &&
                comments.some(
                  (/** @type {any} */ comment) =>
                    parseReport(
                      typeof comment?.text === 'string' ? comment.text : ''
                    )?.lane === 'session'
                );
              cache.set(identity, session ? 'session' : 'not-session');
              deps.onChange();
            })
            .catch(() => {
              cache.set(identity, 'failed');
              deps.onChange();
            });
        }
        if (cached !== 'session') {
          rows.push(base);
          continue;
        }
        const started = coerceTimestampMs(issue.started_at);
        rows.push({
          ...base,
          badges: ['세션 작업'],
          work_ms:
            started !== null && closed_at >= started
              ? closed_at - started
              : null,
          work_kind: 'session'
        });
      }
      return rows;
    }
  };
}
