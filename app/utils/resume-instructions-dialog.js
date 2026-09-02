/**
 * Ask for optional instructions before manually resuming a Worker attempt.
 *
 * `context` names WHAT is being resumed (UI-6g3t §5.2): the title, the target
 * line under it, and the confirm label all read from it. Callers that pass no
 * context keep the older shape — a missing target is left out rather than
 * rendered empty (fail-quiet).
 *
 * @param {{ bead_id?: string, kind?: 'session'|'settlement', tuple?: string }} [context]
 * @param {Document} [doc]
 * @returns {Promise<string|null>}
 */
export function requestResumeInstructions(context, doc = document) {
  const settlement = context?.kind === 'settlement';
  const dialog = doc.createElement('dialog');
  dialog.className = 'op-dialog resume-instructions-dialog';
  const title = doc.createElement('h2');
  const textarea = doc.createElement('textarea');
  const actions = doc.createElement('div');
  const resume = doc.createElement('button');
  const cancel = doc.createElement('button');
  const target_text = [context?.bead_id, context?.tuple]
    .filter((part) => typeof part === 'string' && part !== '')
    .join(' · ');

  title.textContent = settlement ? '착지 정산 재개' : '세션 이어하기';
  textarea.placeholder = '추가 지침 (선택) — 비워두면 기본 절차로 재개';
  textarea.maxLength = 4000;
  actions.className = 'op-dialog__actions resume-instructions-dialog__actions';
  resume.type = 'button';
  resume.className = 'op-btn op-btn--primary';
  resume.textContent = settlement ? '정산 재개' : '이어하기';
  cancel.type = 'button';
  cancel.className = 'op-btn';
  cancel.textContent = '취소';
  actions.append(resume, cancel);
  dialog.append(title);
  if (target_text !== '') {
    const target = doc.createElement('p');
    target.className = 'resume-instructions-dialog__target';
    target.textContent = target_text;
    dialog.append(target);
  }
  dialog.append(textarea, actions);
  doc.body.append(dialog);

  return new Promise((resolve) => {
    let finished = false;
    /** @param {string|null} instructions */
    const finish = (instructions) => {
      if (finished) {
        return;
      }
      finished = true;
      if (typeof dialog.close === 'function') {
        dialog.close();
      }
      dialog.remove();
      resolve(instructions);
    };
    /** Submit the current trimmed textarea value. */
    const submit = () => finish(textarea.value.trim());

    resume.addEventListener('click', submit);
    cancel.addEventListener('click', () => finish(null));
    textarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        submit();
      }
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      finish(null);
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    textarea.focus();
  });
}
