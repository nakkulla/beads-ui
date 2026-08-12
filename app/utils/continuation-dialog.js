import { formatAttemptTuple } from './attempt-display.js';

/**
 * Ask the user how to cross a provider boundary. The server descriptor is the
 * sole source of tuple and availability facts.
 *
 * @param {Record<string, any>} mismatch
 * @param {Document} [doc]
 * @returns {Promise<'prior_session'|'fresh_current'|null>}
 */
export function chooseContinuation(mismatch, doc = document) {
  const dialog = doc.createElement('dialog');
  dialog.className = 'continuation-dialog';
  const prior = doc.createElement('button');
  const fresh = doc.createElement('button');
  const cancel = doc.createElement('button');
  const title = doc.createElement('h2');
  const copy = doc.createElement('p');
  title.textContent = '실행 provider가 변경되었습니다';
  copy.textContent = `${formatAttemptTuple(mismatch.prior || {}) || '이전 설정'} → ${formatAttemptTuple(mismatch.current || {}) || '현재 설정'}`;
  prior.type = 'button';
  prior.textContent = '기존 session 이어하기';
  prior.disabled = mismatch.prior_available === false;
  fresh.type = 'button';
  fresh.textContent = '현재 preset으로 새 session';
  cancel.type = 'button';
  cancel.textContent = '취소';
  dialog.append(title, copy, prior, fresh, cancel);
  doc.body.append(dialog);

  return new Promise((resolve) => {
    /** @param {'prior_session'|'fresh_current'|null} decision */
    const finish = (decision) => {
      if (typeof dialog.close === 'function') {
        dialog.close();
      }
      dialog.remove();
      resolve(decision);
    };
    prior.addEventListener('click', () => finish('prior_session'));
    fresh.addEventListener('click', () => finish('fresh_current'));
    cancel.addEventListener('click', () => finish(null));
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      finish(null);
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  });
}

/**
 * Re-run one direct action with the server-issued token. A stale token that
 * returns a refreshed descriptor reopens the same dialog with current facts.
 *
 * @param {any} initial
 * @param {(decision: 'prior_session'|'fresh_current', token: Record<string, unknown>) => Promise<any>} resend
 * @returns {Promise<any>}
 */
export async function resolveContinuationMismatch(initial, resend) {
  let result = initial;
  while (result?.continuation_mismatch) {
    const mismatch = result.continuation_mismatch;
    const decision = await chooseContinuation(mismatch);
    if (decision === null) {
      return result;
    }
    result = await resend(decision, mismatch.decision_token);
  }
  return result;
}
