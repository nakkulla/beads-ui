/**
 * Client projection of one `session_ref` item (UI-4xzk §6.1).
 *
 * The server decides what a `session_ref` value SAYS and where its transcript
 * is (`server/worker/session-ref.js`); this module decides how the three
 * surfaces that show it — the monitor session tile, the issue detail's session
 * history, and the transcript drawer — name and open it, so the same session
 * reads the same way on all of them.
 *
 * The drawer is keyed by an attempt id, and a session has none, so the key
 * `session:<provider>:<session_id>` takes that slot — the convention the
 * parallel analyzer already set by putting a `job_id` there.
 */

/**
 * @import { SessionRefView } from '../../server/worker/session-ref.js'
 * @import { DrawerMeta } from '../views/worker/transcript-drawer.js'
 */

/**
 * The value that stands in for an attempt id: the drawer's subscription key and
 * the client session-log store's record key.
 *
 * @param {SessionRefView} view
 * @returns {string}
 */
export function sessionRefKey(view) {
  return `session:${view.provider}:${view.session_id}`;
}

/**
 * The human label of one session — provider plus the short id every other
 * surface already shows a session by.
 *
 * @param {SessionRefView} view
 * @returns {string}
 */
export function sessionRefLabel(view) {
  return `${view.provider} · ${view.session_id.slice(0, 8)}`;
}

/**
 * Whether the drawer should treat this session as live (§6.3).
 *
 * Process liveness is deliberately NOT judged — the contract does not record
 * it. "running" here means "this is the current session and the issue is still
 * open"; how long ago it actually moved is what the `ago` label says.
 *
 * @param {SessionRefView} view
 * @param {string|null|undefined} bead_status
 * @returns {'running'|'done'}
 */
function sessionRefStatus(view, bead_status) {
  return view.current &&
    bead_status === 'in_progress' &&
    view.locality === 'local'
    ? 'running'
    : 'done';
}

/**
 * The `transcript_drawer.open` input for one session (§6.1).
 *
 * @param {SessionRefView} view
 * @param {string} bead_id
 * @param {string|null|undefined} bead_status
 * @param {string|null} [root_dir] - Owning workspace, for a monitor tile
 * pointing at a repo this connection is not scoped to.
 * @returns {{ attempt_id: string, session_ref: { bead_id: string, provider: string, session_id: string }, root_dir?: string, hide_prompt: boolean, meta: DrawerMeta }}
 */
export function sessionRefDrawerInput(view, bead_id, bead_status, root_dir) {
  return {
    attempt_id: sessionRefKey(view),
    session_ref: {
      bead_id,
      provider: view.provider,
      session_id: view.session_id
    },
    ...(typeof root_dir === 'string' && root_dir.length > 0
      ? { root_dir }
      : {}),
    // A session has no dispatched prompt to inspect — the toggle would only
    // ever answer "기록 없음".
    hide_prompt: true,
    meta: {
      runner: view.provider,
      label: sessionRefLabel(view),
      session_id: view.session_id,
      ...(typeof view.resume_command === 'string' &&
      view.resume_command.length > 0
        ? { resume_command: view.resume_command }
        : {}),
      status: sessionRefStatus(view, bead_status)
    }
  };
}
