/**
 * Ask for optional instructions before manually resuming a Worker attempt.
 *
 * @param {Document} [doc]
 * @returns {Promise<string|null>}
 */
export function requestResumeInstructions(doc = document) {
  const dialog = doc.createElement('dialog');
  dialog.className = 'resume-instructions-dialog';
  const title = doc.createElement('h2');
  const textarea = doc.createElement('textarea');
  const actions = doc.createElement('div');
  const resume = doc.createElement('button');
  const cancel = doc.createElement('button');

  title.textContent = '세션 이어하기';
  textarea.placeholder = '추가 지침 (선택) — 비워두면 기본 절차로 재개';
  textarea.maxLength = 4000;
  actions.className = 'resume-instructions-dialog__actions';
  resume.type = 'button';
  resume.textContent = '이어하기';
  cancel.type = 'button';
  cancel.textContent = '취소';
  actions.append(resume, cancel);
  dialog.append(title, textarea, actions);
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
