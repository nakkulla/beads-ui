import { resolveContinuationMismatch } from './continuation-dialog.js';
import { requestResumeInstructions } from './resume-instructions-dialog.js';
import { showToast } from './toast.js';

/**
 * Run the whole manual resume flow once (UI-6g3t §5.1): ask for instructions,
 * send, adopt, retry ONE conflict, cross a provider boundary if the server
 * reports one, and surface a refusal as a toast.
 *
 * Two ownerships live here rather than in the three screens that used to copy
 * this. First, the base payload: every send of the flow — first, conflict
 * retry, continuation resend, `refresh` resend — carries the same
 * `instructions`, so an answer typed once cannot be dropped by one branch.
 * Second, the one-shot conflict retry: the mismatch path does NOT add its own,
 * because `resolveContinuationMismatch`'s `refresh` loop already reopens the
 * dialog with fresh facts.
 *
 * `transport` is one send with no retry of its own; it adds `attempt_id` and an
 * `expected_revision` read at call time, so adopting each reply's queue first
 * is what makes the next send's revision current.
 *
 * @param {{
 *   context: { bead_id?: string, kind?: 'session'|'settlement', tuple?: string },
 *   transport: (payload: Record<string, unknown>) => Promise<any>,
 *   adopt?: (res: any) => void
 * }} options
 * @returns {Promise<any|null>} null = 사용자가 취소
 */
export async function runResumeFlow(options) {
  const { context, transport, adopt } = options;
  const instructions = await requestResumeInstructions(context);
  if (instructions === null) {
    return null;
  }
  /** @type {Record<string, unknown>} */
  const base = instructions === '' ? {} : { instructions };
  let res = await transport({ ...base });
  adopt?.(res);
  if (res && res.conflict) {
    res = await transport({ ...base });
    adopt?.(res);
  }
  res = await resolveContinuationMismatch(
    res,
    (continuation, decision_token) =>
      transport({ ...base, continuation, decision_token }),
    { onResult: adopt, refresh: () => transport({ ...base }) }
  );
  if (res && res.resumed === false && !res.conflict && res.reason) {
    const refusal_label =
      context?.kind === 'settlement' ? '정리 재시도' : '이어하기';
    showToast(`${refusal_label} 거부: ${res.reason}`, 'error', 2400);
  }
  return res;
}

/**
 * The instructions-restart flow (UI-qce9 §3.2): one dialog, two requests.
 *
 * The dialog stays open across both, because the answer that decides whether
 * the user has to retype anything only arrives at the end. Ownership is the
 * same split the ordinary resume uses — this module owns the ORDER (pause once,
 * then resume with the recorded-execution choice) and the refusal text; the
 * screens own the transports.
 *
 * Two rules the §6 table fixes, both about a LOST reply rather than a refused
 * one. A lost pause reply is never resent: the flow reads the latest snapshot
 * and, if the attempt is still running, says so and stops — a blind resend
 * would signal a second time. A lost resume reply is answered by looking for
 * the child that carries `resumed_from`, so an already-created child is
 * reported instead of a second one being spawned.
 *
 * `kind: 'restart'` runs both halves; `resume_recorded` is the paused row's
 * entry point and runs only the resume half.
 *
 * @param {{
 *   context: { bead_id?: string, kind?: 'restart'|'resume_recorded', tuple?: string, attempt_id?: string },
 *   pause: () => Promise<any>,
 *   resume: (payload: Record<string, unknown>) => Promise<any>,
 *   snapshot: () => any
 * }} options
 * @returns {Promise<string|null>} null = 사용자가 취소
 */
export async function runRestartWithInstructionsFlow(options) {
  const { context, pause, resume, snapshot } = options;
  const attempt_id = context?.attempt_id || '';
  /** @param {any} queue */
  const attemptOf = (queue) =>
    (queue && queue.attempts && queue.attempts[attempt_id]) || null;
  /** @param {any} queue */
  const childExists = (queue) =>
    Object.values(queue?.attempts || {}).some(
      (/** @type {any} */ a) => a && a.resumed_from === attempt_id
    );

  return requestResumeInstructions(context, document, {
    onSubmit: async (instructions) => {
      if (context?.kind === 'restart') {
        /** @type {any} */
        let paused;
        try {
          paused = await pause();
        } catch {
          paused = null;
        }
        if (!paused) {
          const attempt = attemptOf(snapshot());
          if (!attempt || attempt.status === 'running') {
            return {
              ok: false,
              message: '중단 응답을 받지 못했습니다. 최신 상태를 확인하세요.'
            };
          }
        } else if (paused.paused === false) {
          return {
            ok: false,
            message: `재시작 거부: ${paused.reason || 'unknown'}`
          };
        }
      }
      /** @type {Record<string, unknown>} */
      const payload = { continuation: 'prior_attempt', instructions };
      /** @type {any} */
      let res;
      try {
        res = await resume({ ...payload });
        if (res && res.conflict) {
          res = await resume({ ...payload });
        }
      } catch {
        res = null;
      }
      if (!res) {
        if (childExists(snapshot())) {
          showToast('이미 재개됨', 'info', 2400);
          return { ok: true };
        }
        return { ok: false, message: '재개 응답을 받지 못했습니다.' };
      }
      if (res.resumed === false) {
        return {
          ok: false,
          message: `이어하기 거부: ${res.reason || 'unknown'}`
        };
      }
      return { ok: true };
    }
  });
}
