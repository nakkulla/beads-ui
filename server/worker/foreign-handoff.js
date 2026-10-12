/**
 * `foreign_handoff` — the needs-human class a foreign PR (enclosed foreign
 * landing, PR delivery) is handed to a person with (dotfiles
 * `workflow-state.yaml failure_classes.foreign_handoff`, copied by hand: beads-ui
 * is a contract consumer, ADR UI-u6ud-2).
 *
 * The cause is re-judged on every observation turn (spec §3.7), so a conflict
 * cleared by a push to the PR head or a base mismatch cleared by a pin/PR-base
 * fix releases on the next turn without a click. What must NOT repeat is the
 * push: the announcement is recorded on the Bead's durable timeline FIRST, under
 * an event id naming the cause and the identity it was judged on, and only a
 * write that is new announces — a restart or a re-observation of the same wall
 * finds the record and stays silent.
 */
import { debug } from '../logging.js';
import {
  FOREIGN_HANDOFF_CAUSES,
  FOREIGN_HANDOFF_CLASS
} from './foreign-target.js';

const default_log = debug('worker:foreign-handoff');

/**
 * Copied byte-for-byte from dotfiles `workflow-state.yaml`
 * `failure_classes.foreign_handoff.notify_label`.
 */
export const FOREIGN_HANDOFF_NOTIFY_LABEL = '외부 PR 사람 처리 필요';

/** The one exit a foreign handoff has (`exit: resolve_in_session`). */
export const FOREIGN_HANDOFF_NEXT_ACTION = '[세션에서 이어가기]';

/**
 * The reason token a handoff travels as: `foreign_handoff:<cause>`.
 *
 * @param {string} cause
 * @returns {string}
 */
export function foreignHandoffReason(cause) {
  return `${FOREIGN_HANDOFF_CLASS}:${cause}`;
}

/**
 * The cause a `foreign_handoff:<cause>` reason names, or null for any other
 * reason.
 *
 * @param {unknown} reason
 * @returns {string|null}
 */
export function foreignHandoffCauseOf(reason) {
  if (typeof reason !== 'string') {
    return null;
  }
  const prefix = `${FOREIGN_HANDOFF_CLASS}:`;
  if (!reason.startsWith(prefix)) {
    return null;
  }
  const cause = reason.slice(prefix.length);
  return FOREIGN_HANDOFF_CAUSES.includes(cause) ? cause : null;
}

/**
 * The causes a person clears by fixing the PR (a push to its head, a PR-base or
 * pin fix), so the next observation turn drops them. `foreign_deploy_unsupported`
 * is absent on purpose: it is released only from a session.
 *
 * @type {readonly string[]}
 */
export const FOREIGN_HANDOFF_REARM_CAUSES = Object.freeze([
  'foreign_conflict_needs_human',
  'foreign_pr_base_mismatch'
]);

/**
 * The cause a reason names anywhere as its `foreign_handoff:<cause>` tail — the
 * bare token, or behind a family prefix such as `cleanup_failed:` — or null.
 * Only the contract's three causes count; any other tail is not a handoff.
 *
 * @param {unknown} reason
 * @returns {string|null}
 */
export function foreignHandoffCauseWithin(reason) {
  if (typeof reason !== 'string') {
    return null;
  }
  for (const cause of FOREIGN_HANDOFF_CAUSES) {
    const token = foreignHandoffReason(cause);
    if (reason === token || reason.endsWith(`:${token}`)) {
      return cause;
    }
  }
  return null;
}

/**
 * The re-armable cause of a completion terminal reason, or null. Accepts the
 * folded `foreign_handoff:<cause>` and the form stored before that family
 * existed, `internal_record_failed:foreign_handoff:<cause>`.
 *
 * @param {unknown} reason
 * @returns {string|null}
 */
export function foreignHandoffRearmCause(reason) {
  if (typeof reason !== 'string') {
    return null;
  }
  const cause = foreignHandoffCauseWithin(reason);
  if (cause === null || !FOREIGN_HANDOFF_REARM_CAUSES.includes(cause)) {
    return null;
  }
  const token = foreignHandoffReason(cause);
  return reason === token || reason === `internal_record_failed:${token}`
    ? cause
    : null;
}

/**
 * Whether a PR observation proves the foreign handoff is gone: the entry is
 * readable, has no error, carries a PR and a foreign target, and the target's
 * handoff is empty. Anything less fails closed.
 *
 * @param {any} observation
 * @returns {boolean}
 */
export function foreignHandoffCleared(observation) {
  return Boolean(
    observation &&
    !observation.error &&
    observation.pr &&
    observation.foreign &&
    typeof observation.foreign === 'object' &&
    observation.foreign.handoff === null
  );
}

/**
 * Build the announcer for one workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string|null,
 *   timeline?: { append: (input: any) => { ok: boolean }, readTimeline?: (bead_id: string) => Array<{ event_id: string }> }|null,
 *   notify?: { needsHuman: (input: any) => Promise<void> }|null,
 *   failureConversation?: { launchForBead: (input: { workspace: string, repo: string|null, bead_id: string }) => Promise<any> }|null,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createForeignHandoffAnnouncer(deps) {
  const log = deps.log || default_log;
  /** In-process guard for a timeline that cannot be read back. @type {Set<string>} */
  const announced = new Set();

  return {
    /**
     * Record the handoff once and push it. Returns whether THIS call was the
     * one that recorded it.
     *
     * @param {{ bead_id: string, cause: string, identity: string, pr_url?: string|null, foreign_path?: string|null }} input
     * @returns {boolean}
     */
    announce(input) {
      const seq = `${FOREIGN_HANDOFF_CLASS}:${input.cause}:${input.identity}`;
      const event_id = `needs_human:${input.bead_id}:${seq}`;
      if (announced.has(event_id)) {
        return false;
      }
      const timeline = deps.timeline || null;
      if (timeline && typeof timeline.readTimeline === 'function') {
        try {
          if (
            timeline
              .readTimeline(input.bead_id)
              .some((event) => event && event.event_id === event_id)
          ) {
            announced.add(event_id);
            return false;
          }
        } catch (err) {
          log('foreign handoff timeline read failed: %o', err);
        }
      }
      if (timeline) {
        /** @type {{ ok: boolean }} */
        let written = { ok: false };
        try {
          written = timeline.append({
            bead_id: input.bead_id,
            kind: 'needs_human',
            seq,
            summary: `확인 필요 — ${FOREIGN_HANDOFF_NOTIFY_LABEL} (${input.cause})`
          });
        } catch (err) {
          log('foreign handoff timeline write failed: %o', err);
        }
        if (!written.ok) {
          // The record is the once-mark; without it a push could repeat.
          return false;
        }
      }
      announced.add(event_id);
      const run = async () => {
        const conversation = deps.failureConversation
          ? await deps.failureConversation.launchForBead({
              workspace: deps.workspace,
              repo: deps.repo ?? null,
              bead_id: input.bead_id
            })
          : null;
        await deps.notify?.needsHuman({
          bead_id: input.bead_id,
          failure_class: FOREIGN_HANDOFF_NOTIFY_LABEL,
          reason: foreignHandoffReason(input.cause),
          reason_detail: input.foreign_path
            ? `대상 저장소: ${input.foreign_path}`
            : null,
          next_action: FOREIGN_HANDOFF_NEXT_ACTION,
          conversation,
          pr_url: input.pr_url ?? null,
          repo: deps.repo ?? null
        });
      };
      run().catch((err) => {
        log('foreign handoff notify failed for %s: %o', input.bead_id, err);
      });
      return true;
    }
  };
}
