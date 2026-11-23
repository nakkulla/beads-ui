import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../bd.js';
import { hasExternalWaitKey } from '../worker/runnable-cache.js';
import {
  isSafeSessionId,
  parseSessionRef,
  resolveSessionFile
} from '../worker/session-ref.js';
import { sessionExcludedBeadIds } from './lane-membership.js';

/**
 * Verbatim dotfiles `## 직접 세션 마무리` text block, without a trailing
 * newline. Only the `<Bead ID>` slot belongs to beads-ui; the procedure belongs
 * to dotfiles. The sha256 of these bytes is pinned by the handler test.
 *
 * @type {string}
 */
export const SESSION_FINISH_BLOCK = [
  '[beads-ui 마무리] 사용자가 beads-ui의 직접 세션 타일에서 이 Bead의 [마무리]를 눌렀다.',
  '- 대상 Bead: <Bead ID>',
  '',
  '뜻: 사용자는 이 Bead의 작업이 끝났다고 판단했고, 이 세션이 남은 마감 절차를 끝내기를 바란다.',
  '1. 대상 Bead를 `bd show --json`으로 다시 읽는다. 이 세션이 잡은 Bead가 아니거나 이미 `in_progress`가 아니면 그 사실을 한 줄로 말하고 끝낸다.',
  '2. 닫기 전에 사용자의 완료 확인만 기다리고 있었다면 이 입력이 그 확인이다. 세션이 스스로 확인할 수 있는 결과(PR 머지 여부, 잡 결과, 파일·커밋 존재 등)는 이 입력으로 대신하지 않고 확인하며, 증거가 없으면 그 사실만 한 줄로 묻고 턴을 끝낸다.',
  '3. 이 Bead의 route가 정한 Finish 절차를 남은 데부터 끝까지 진행한다. PR로 전달하는 route는 PR 전달까지다.',
  '4. 대상 Bead 하나만 마감한다. 이 세션이 잡은 다른 Bead는 건드리지 않는다.',
  '',
  '이 입력이 근거가 되지 않는 것: `impl_entry`·`plan_approval`·`adr_approval`·리뷰어 선택·머지·폐기. 그런 답이 필요하거나 하드 스톱에 걸리면 필요한 것을 한 줄로 묻고 턴을 끝낸다.'
].join('\n');

/** Time the hub gets to read one session state. */
const HUB_STATE_TIMEOUT_MS = 15000;
/** Resume waits 20 s for the window and 3 s for the delivery check. */
const HUB_SEND_TIMEOUT_MS = 60000;

/**
 * @typedef {Object} SessionFinishReply
 * @property {string} bead_id
 * @property {boolean} sent
 * @property {'resumed'|'typed'|'queued'|null} delivery
 * @property {string|null} reason
 */

/**
 * @typedef {Object} SessionFinishBead
 * @property {string} [status]
 * @property {Record<string, unknown>} [metadata]
 */

/**
 * @typedef {Object} SessionFinishDeps
 * @property {(root_dir: string, bead_id: string) => Promise<SessionFinishBead|null>} readBead - Fresh Bead read, never a screen cache.
 * @property {(root_dir: string) => Record<string, any>} snapshot - Decorated queue snapshot, the one the tile was drawn from.
 * @property {(root_dir: string, bead_id: string) => { attempts: any[], interactive_sessions: Record<string, any> }} ownership - Untrimmed Worker attempts (queue and transferred records of this Bead) and conversation records; throws when the queue cannot be read.
 * @property {(args: string[], options: { input?: string, timeout_ms: number }) => Promise<{ code: number, stdout: string, stderr: string }>} runHub
 * @property {(target: string) => string} realpath - Throws when the path cannot be resolved.
 * @property {typeof resolveSessionFile} [locate]
 * @property {Set<string>} [in_flight] - Session ids with a send under way; share one set across instances to make `in_flight` process-wide.
 */

/**
 * Fill the single `<Bead ID>` slot of the finish block.
 *
 * @param {string} bead_id
 * @returns {string}
 */
export function fillSessionFinishBlock(bead_id) {
  return SESSION_FINISH_BLOCK.replace('<Bead ID>', () => bead_id);
}

/**
 * @param {string} reason
 * @param {string} bead_id
 * @returns {SessionFinishReply}
 */
function refusal(bead_id, reason) {
  return { bead_id, sent: false, delivery: null, reason };
}

/**
 * Parse one JSON object from the hub's stdout; null for anything else.
 *
 * @param {string} stdout
 * @returns {Record<string, any>|null}
 */
function parseHubJson(stdout) {
  try {
    const parsed = JSON.parse(stdout.trim());
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
}

/**
 * Map one `session-hub send` result to the reply, whatever its exit code.
 *
 * @param {string} bead_id
 * @param {{ code: number, stdout: string }} result
 * @returns {SessionFinishReply}
 */
export function mapHubSend(bead_id, result) {
  if (result.code === 127 && result.stdout.trim().length === 0) {
    return refusal(bead_id, 'hub_unavailable');
  }
  const body = parseHubJson(result.stdout);
  if (body === null) {
    return refusal(bead_id, 'hub_invalid_response');
  }
  if (body.ok === true) {
    if (body.resumed === true) {
      if (body.transcript_confirmed === true) {
        return { bead_id, sent: true, delivery: 'resumed', reason: null };
      }
      return refusal(
        bead_id,
        body.trust_prompt === true ? 'trust_prompt' : 'resume_unconfirmed'
      );
    }
    return {
      bead_id,
      sent: true,
      delivery: body.queued === true ? 'queued' : 'typed',
      reason: null
    };
  }
  if (body.ok === false && typeof body.code === 'string' && body.code) {
    return refusal(bead_id, body.code);
  }
  return refusal(bead_id, 'hub_invalid_response');
}

/**
 * Whether `child` is the root or lies under it.
 *
 * @param {string} root
 * @param {string} child
 * @returns {boolean}
 */
function isInside(root, child) {
  return child === root || child.startsWith(root + path.sep);
}

/**
 * Create the `[마무리]` handler core (UI-lxxf §3.4). The in-flight set lives in
 * memory only, so `in_flight` means "this server process". Nothing here writes
 * a Bead or the queue.
 *
 * @param {SessionFinishDeps} deps
 * @returns {(request: { root_dir: string, bead_id: string }) => Promise<SessionFinishReply>}
 */
export function createSessionFinish(deps) {
  const in_flight = deps.in_flight || new Set();
  const locate = deps.locate || resolveSessionFile;

  return async function finish({ root_dir, bead_id }) {
    // Step 1: the tile must still be a direct session tile.
    const bead = await deps.readBead(root_dir, bead_id);
    if (
      !bead ||
      bead.status !== 'in_progress' ||
      hasExternalWaitKey(/** @type {Record<string, unknown>} */ (bead)) ||
      sessionExcludedBeadIds(deps.snapshot(root_dir)).has(bead_id)
    ) {
      return refusal(bead_id, 'not_session_tile');
    }

    // Step 2: the current session is the last valid `session_ref` item.
    const entries = parseSessionRef(bead.metadata?.session_ref);
    const entry = entries.length > 0 ? entries[entries.length - 1] : null;
    if (entry === null) {
      return refusal(bead_id, 'no_session_ref');
    }
    if (!isSafeSessionId(entry.session_id)) {
      return refusal(bead_id, 'unsafe_session_id');
    }
    if (entry.provider !== 'claude') {
      return refusal(bead_id, 'provider_unsupported');
    }
    const located = locate(entry);
    if (located.locality !== 'local') {
      return refusal(bead_id, 'not_local');
    }
    const session_id = entry.session_id;

    // Step 4 runs before step 3: a synchronous check-and-add as soon as the
    // session id is known, held across the `state` read and the send, so a
    // second request can never pass while the first is still under way.
    if (in_flight.has(session_id)) {
      return refusal(bead_id, 'in_flight');
    }
    in_flight.add(session_id);
    try {
      // Step 3: the session must be a human session of this repository.
      if (!(await isRepositoryHumanSession(root_dir, bead_id, session_id))) {
        return refusal(bead_id, 'session_mismatch');
      }
      // Step 5: exactly one send, never retried.
      const result = await deps.runHub(['send', session_id], {
        input: fillSessionFinishBlock(bead_id),
        timeout_ms: HUB_SEND_TIMEOUT_MS
      });
      return mapHubSend(bead_id, result);
    } finally {
      in_flight.delete(session_id);
    }
  };

  /**
   * @param {string} root
   * @param {string} bead_id
   * @param {string} session_id
   * @returns {Promise<boolean>}
   */
  async function isRepositoryHumanSession(root, bead_id, session_id) {
    try {
      const owned = deps.ownership(root, bead_id);
      for (const attempt of owned.attempts) {
        if (attempt?.session_id === session_id) {
          return false;
        }
      }
      for (const record of Object.values(owned.interactive_sessions)) {
        if (record?.session_id === session_id) {
          return false;
        }
      }
    } catch {
      return false;
    }
    try {
      const state = await deps.runHub(['state', session_id], {
        timeout_ms: HUB_STATE_TIMEOUT_MS
      });
      const body = parseHubJson(state.stdout);
      if (body === null || body.ok !== true || typeof body.cwd !== 'string') {
        return false;
      }
      if (body.cwd.length === 0) {
        return false;
      }
      return isInside(deps.realpath(root), deps.realpath(body.cwd));
    } catch {
      return false;
    }
  }
}

/**
 * Default `session-hub` runner: the same binary path the launcher uses.
 *
 * @param {string[]} args
 * @param {{ input?: string, timeout_ms: number }} options
 */
export function runSessionHub(args, options) {
  return runShell(path.join(os.homedir(), 'bin', 'session-hub'), args, options);
}

/**
 * @param {string} target
 * @returns {string}
 */
export function realpathOf(target) {
  return fs.realpathSync(target);
}
