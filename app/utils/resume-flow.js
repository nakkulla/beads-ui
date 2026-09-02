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
      context?.kind === 'settlement' ? '정산 재개' : '이어하기';
    showToast(`${refusal_label} 거부: ${res.reason}`, 'error', 2400);
  }
  return res;
}
