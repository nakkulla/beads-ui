/**
 * Ask how a Worker attempt should be resumed (UI-6icf §4).
 *
 * The dialog has two states. State A offers the branch itself — resume right
 * away, or type instructions first — and state B replaces the choice row with
 * a textarea and its confirm. The return contract is the one every caller
 * already reads: cancel or Esc is `null`, the immediate branch is `''`, and the
 * instructions branch is the trimmed 1..4000 character string.
 *
 * `context` names WHAT is being resumed (UI-6g3t §5.2): the title, the target
 * line under it, and the button labels all read from it. A missing target is
 * left out rather than rendered empty (fail-quiet).
 *
 * @param {{ bead_id?: string, kind?: 'session'|'settlement', tuple?: string }} [context]
 * @param {Document} [doc]
 * @returns {Promise<string|null>}
 */
export function requestResumeInstructions(context, doc = document) {
  const settlement = context?.kind === 'settlement';
  const labels = settlement
    ? {
        title: '착지 후 정리 재시도',
        immediate: '▶ 바로 정리 재시도',
        instruct: '✎ 지시 입력 후 정리 재시도',
        confirm: '정리 재시도'
      }
    : {
        title: '세션 이어하기',
        immediate: '▶ 바로 이어하기',
        instruct: '✎ 지시 입력 후 이어하기',
        confirm: '이어하기'
      };
  const dialog = doc.createElement('dialog');
  dialog.className = 'op-dialog resume-instructions-dialog';
  const title = doc.createElement('h2');
  title.textContent = labels.title;
  dialog.append(title);

  const target_text = [context?.bead_id, context?.tuple]
    .filter((part) => typeof part === 'string' && part !== '')
    .join(' · ');
  if (target_text !== '') {
    const target = doc.createElement('p');
    target.className = 'resume-instructions-dialog__target';
    target.textContent = target_text;
    dialog.append(target);
  }

  const choices = doc.createElement('div');
  choices.className =
    'op-dialog__actions resume-instructions-dialog__actions resume-instructions-dialog__choices';
  const immediate = doc.createElement('button');
  immediate.type = 'button';
  immediate.className = 'op-btn op-btn--primary';
  immediate.textContent = labels.immediate;
  const instruct = doc.createElement('button');
  instruct.type = 'button';
  instruct.className = 'op-btn';
  instruct.textContent = labels.instruct;
  instruct.setAttribute('aria-expanded', 'false');
  const cancel_choice = doc.createElement('button');
  cancel_choice.type = 'button';
  cancel_choice.className = 'op-btn';
  cancel_choice.textContent = '취소';
  choices.append(immediate, instruct, cancel_choice);
  dialog.append(choices);

  const textarea = doc.createElement('textarea');
  textarea.placeholder = '이번 재개에 전달할 지침';
  textarea.maxLength = 4000;
  const actions = doc.createElement('div');
  actions.className = 'op-dialog__actions resume-instructions-dialog__actions';
  const confirm = doc.createElement('button');
  confirm.type = 'button';
  confirm.className = 'op-btn op-btn--primary';
  confirm.textContent = labels.confirm;
  const cancel_input = doc.createElement('button');
  cancel_input.type = 'button';
  cancel_input.className = 'op-btn';
  cancel_input.textContent = '취소';
  actions.append(confirm, cancel_input);

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
    /** Keep the confirm button in step with the typed value. false when empty. */
    const syncConfirm = () => {
      confirm.disabled = textarea.value.trim().length === 0;
    };
    /** Submit the trimmed textarea value if there is one. */
    const submit = () => {
      const value = textarea.value.trim();
      if (value.length === 0) {
        return;
      }
      finish(value);
    };
    /** Replace the choice row with the input state (state B). */
    const openInput = () => {
      instruct.setAttribute('aria-expanded', 'true');
      choices.remove();
      dialog.append(textarea, actions);
      syncConfirm();
      textarea.focus();
    };

    immediate.addEventListener('click', () => finish(''));
    instruct.addEventListener('click', openInput);
    cancel_choice.addEventListener('click', () => finish(null));
    cancel_input.addEventListener('click', () => finish(null));
    confirm.addEventListener('click', submit);
    textarea.addEventListener('input', syncConfirm);
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
    immediate.focus();
  });
}
