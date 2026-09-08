/**
 * Ask for instructions before manually resuming — or restarting — a Worker
 * attempt.
 *
 * `context` names WHAT is being resumed (UI-6g3t §5.2): the title, the target
 * line under it, and the confirm label all read from it. Callers that pass no
 * context keep the older shape — a missing target is left out rather than
 * rendered empty (fail-quiet).
 *
 * `handlers.onSubmit` is the instructions-restart entry's addition (UI-qce9
 * §3.2): the flow behind the dialog runs two requests, and a refusal has to
 * come back INTO the open dialog with the typed sentence still there. Without
 * it the dialog closes on submit exactly as it always did.
 *
 * @param {{ bead_id?: string, kind?: 'session'|'settlement'|'restart'|'resume_recorded', tuple?: string }} [context]
 * @param {Document} [doc]
 * @param {{ onSubmit?: (value: string) => Promise<{ ok: boolean, message?: string }> }} [handlers]
 * @returns {Promise<string|null>}
 */
export function requestResumeInstructions(
  context,
  doc = document,
  handlers = {}
) {
  const kind = context?.kind;
  const settlement = kind === 'settlement';
  const restart = kind === 'restart';
  const recorded = kind === 'resume_recorded';
  // 지시가 이 흐름의 요청 자체다 (§3.1): 빈 입력으로는 제출하지 않는다.
  const mandatory = restart || recorded;
  const onSubmit = handlers?.onSubmit;
  const dialog = doc.createElement('dialog');
  dialog.className = 'op-dialog resume-instructions-dialog';
  const title = doc.createElement('h2');
  const textarea = doc.createElement('textarea');
  const actions = doc.createElement('div');
  const resume = doc.createElement('button');
  const cancel = doc.createElement('button');
  const error = doc.createElement('p');
  const target_text = [context?.bead_id, context?.tuple]
    .filter((part) => typeof part === 'string' && part !== '')
    .join(' · ');

  title.textContent = restart
    ? '지시와 함께 재시작'
    : recorded
      ? '지시와 함께 이어하기'
      : settlement
        ? '착지 후 정리 재시도'
        : '세션 이어하기';
  textarea.placeholder = mandatory
    ? '이번 재개에 전달할 지침 (필수)'
    : '추가 지침 (선택) — 비워두면 기본 절차로 재개';
  textarea.maxLength = 4000;
  if (mandatory) {
    textarea.required = true;
  }
  actions.className = 'op-dialog__actions resume-instructions-dialog__actions';
  resume.type = 'button';
  resume.className = 'op-btn op-btn--primary';
  resume.textContent = restart
    ? '중단 후 재시작'
    : recorded
      ? '이어하기'
      : settlement
        ? '정리 재시도'
        : '이어하기';
  cancel.type = 'button';
  cancel.className = 'op-btn';
  cancel.textContent = '취소';
  error.className = 'resume-instructions-dialog__error';
  error.hidden = true;
  actions.append(resume, cancel);
  dialog.append(title);
  if (mandatory) {
    // 이 조작이 실제로 하는 일 (§3.1). 도구의 완료를 약속하지 않는다는 문장이
    // 여기 있는 이유는, 그것이 기존 프로세스 제어기가 보장하는 것과 보장하지
    // 않는 것의 경계이기 때문이다.
    const description = doc.createElement('p');
    description.className = 'resume-instructions-dialog__desc';
    description.textContent = restart
      ? '실행을 중단한 뒤 같은 세션 기록과 실행 설정으로 이어갑니다. 실행 중인 도구는 중단될 수 있으며 작업 디렉터리는 보존됩니다.'
      : '같은 세션 기록과 실행 설정으로 이어갑니다. 실행 중인 도구는 중단될 수 있으며 작업 디렉터리는 보존됩니다.';
    dialog.append(description);
  }
  if (target_text !== '') {
    const target = doc.createElement('p');
    target.className = 'resume-instructions-dialog__target';
    target.textContent = target_text;
    dialog.append(target);
  }
  dialog.append(textarea, error, actions);
  doc.body.append(dialog);

  /** Keep the confirm button in step with the mandatory-input rule. */
  const syncConfirm = () => {
    if (mandatory) {
      resume.disabled = textarea.value.trim().length === 0;
    }
  };
  syncConfirm();

  return new Promise((resolve) => {
    let finished = false;
    let in_flight = false;
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
    const submit = async () => {
      if (finished || in_flight) {
        return;
      }
      const value = textarea.value.trim();
      if (mandatory && value.length === 0) {
        return;
      }
      if (!onSubmit) {
        finish(value);
        return;
      }
      in_flight = true;
      resume.disabled = true;
      cancel.disabled = true;
      error.hidden = true;
      /** @type {{ ok: boolean, message?: string }} */
      let result;
      try {
        result = await onSubmit(value);
      } catch {
        result = { ok: false, message: '요청을 보내지 못했습니다.' };
      }
      in_flight = false;
      if (result?.ok) {
        finish(value);
        return;
      }
      // 거부는 입력을 지우지 않는다 (§3.2): 사용자가 방금 쓴 문장이 다음 시도의
      // 재료다.
      error.textContent = result?.message || '요청이 거부되었습니다.';
      error.hidden = false;
      cancel.disabled = false;
      resume.disabled = false;
      syncConfirm();
      textarea.focus();
    };

    resume.addEventListener('click', () => void submit());
    cancel.addEventListener('click', () => {
      if (!in_flight) {
        finish(null);
      }
    });
    textarea.addEventListener('input', syncConfirm);
    textarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        void submit();
      }
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      if (!in_flight) {
        finish(null);
      }
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    textarea.focus();
  });
}
