/**
 * The `⋯ 다른 방법으로` 복구 선택기 (UI-jr8v §10) — 공급자 보류 타일의 두 번째
 * 출구. Worker 탭과 Monitor 탭이 같은 타일 렌더러(`running-grid.js`)를 쓰므로
 * 그 타일이 여는 다이얼로그도 하나여야 한다 (ADR 0014): 두 탭이 각자 복제하면
 * 러너·모델·계정 목록과 `exec_override` payload가 탭마다 갈라진다.
 *
 * 상태는 이 모듈이 들지 않는다 — 호출 화면이 `draft` 하나를 들고, 이 모듈은
 * 그 draft로부터 열기·그리기·수정·확인 payload를 계산하는 순수 함수 넷을
 * 내놓는다. 화면마다 다른 것은 큐 스냅샷을 어디서 읽고 재개를 어디로 보내는지
 * 뿐이므로, 그 둘만 호출자가 넘긴다.
 */
import { html } from 'lit-html';

/**
 * @typedef {Object} ProviderResumeDraft
 * @property {string} attempt_id - 복구 대상이 되는 원래 attempt의 id.
 * @property {string} original_runner - 원 attempt의 러너. 러너가 바뀌면
 * transcript를 이을 수 없으므로 확인 payload가 `fresh_current`로 넘어간다.
 * @property {string} runner - 선택기에서 지금 고른 러너 (`claude`·`codex`).
 * @property {string} model - 그 러너의 카탈로그에서 고른 모델 id.
 * @property {string} account - 지금 고른 Claude 계정 (`claude` 러너만).
 * @property {boolean} fresh_current - `true`면 transcript를 잇지 않고 새 세션으로
 * 출발한다.
 */

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * Find the durable hold target that names one attempt.
 *
 * @param {string} attempt_id - 보류 target 안에서 찾을 attempt id.
 * @param {Record<string, any>} queue - 그 attempt가 속한 워크스페이스의 스냅샷 —
 * `provider_hold` 하나만 읽는다.
 * @returns {any|null}
 */
function providerTargetForAttempt(attempt_id, queue) {
  for (const hold of Object.values(objectOf(queue.provider_hold))) {
    for (const target of Array.isArray(hold?.targets) ? hold.targets : []) {
      if (
        Array.isArray(target?.attempt_ids) &&
        target.attempt_ids.includes(attempt_id)
      ) {
        return target;
      }
    }
  }
  return null;
}

/**
 * Explain whether a Claude account meets the manual switch health threshold.
 *
 * @param {any} account
 * @returns {{ eligible: boolean, reason: string }}
 */
function providerAccountEligibility(account) {
  if (account?.status !== 'ok') {
    return {
      eligible: false,
      reason: `계정 상태 ${String(account?.status || '미상')}`
    };
  }
  const windows = Array.isArray(account.windows) ? account.windows : [];
  const five_hour = windows.find(
    (/** @type {any} */ window) => window?.key === '5h'
  );
  const seven_day = windows.find(
    (/** @type {any} */ window) => window?.key === '7d'
  );
  if (!five_hour || typeof five_hour.pct !== 'number') {
    return { eligible: false, reason: '5시간 사용량 미관측' };
  }
  if (five_hour.pct > 80) {
    return { eligible: false, reason: '5시간 사용량 80% 초과' };
  }
  if (seven_day) {
    if (typeof seven_day.pct !== 'number') {
      return { eligible: false, reason: '7일 사용량 미관측' };
    }
    if (seven_day.pct > 90) {
      return { eligible: false, reason: '7일 사용량 90% 초과' };
    }
  }
  return { eligible: true, reason: '' };
}

/**
 * The draft the selector opens with, read from the ORIGINAL attempt identity:
 * 같은 러너·같은 모델·같은 계정이 기본값이고, 사람이 바꾼 것만 복구가 된다.
 *
 * @param {string} attempt_id
 * @param {Record<string, any>} queue
 * @returns {ProviderResumeDraft|null} attempt를 못 찾으면 `null` (열지 않는다).
 */
export function providerResumeDraft(attempt_id, queue) {
  const attempt = objectOf(objectOf(queue).attempts)[attempt_id];
  if (!attempt) {
    return null;
  }
  const catalog = objectOf(objectOf(queue).runner_catalog);
  const runners = objectOf(catalog.runners);
  const original_runner =
    typeof attempt.runner === 'string' && runners[attempt.runner]
      ? attempt.runner
      : Object.keys(runners)[0] || '';
  const runner_entry = objectOf(runners[original_runner]);
  const models = objectOf(runner_entry.models);
  const model =
    typeof attempt.model === 'string' && models[attempt.model]
      ? attempt.model
      : typeof runner_entry.default_model === 'string'
        ? runner_entry.default_model
        : Object.keys(models)[0] || '';
  const target = providerTargetForAttempt(attempt_id, objectOf(queue));
  const account =
    typeof attempt.claude_account === 'string'
      ? attempt.claude_account
      : typeof target?.account === 'string'
        ? target.account
        : '';
  return {
    attempt_id,
    original_runner,
    runner: original_runner,
    model,
    account,
    fresh_current: false
  };
}

/**
 * Fold one `change` event into the draft. Returns the NEW draft, the SAME draft
 * reference when the event was ours but changed nothing, or `null` when the event
 * target belongs to something else — 호출 화면이 그 값으로 자기 나머지 `change`
 * 처리를 이어갈지, 다시 그릴지를 판단한다.
 *
 * @param {ProviderResumeDraft} draft
 * @param {HTMLElement|null} event_target
 * @param {Record<string, any>} queue
 * @returns {ProviderResumeDraft|null}
 */
export function providerResumeDraftChange(draft, event_target, queue) {
  if (!draft || !event_target || typeof event_target.closest !== 'function') {
    return null;
  }
  const runner_select = /** @type {HTMLSelectElement|null} */ (
    event_target.closest('.provider-resume-dialog__runner')
  );
  if (runner_select) {
    const runners = objectOf(objectOf(objectOf(queue).runner_catalog).runners);
    const runner_entry = objectOf(runners[runner_select.value]);
    const models = Object.keys(objectOf(runner_entry.models));
    return {
      ...draft,
      runner: runner_select.value,
      model:
        typeof runner_entry.default_model === 'string'
          ? runner_entry.default_model
          : models[0] || ''
    };
  }
  const model_select = /** @type {HTMLSelectElement|null} */ (
    event_target.closest('.provider-resume-dialog__model')
  );
  if (model_select) {
    try {
      const [runner, model] = JSON.parse(model_select.value);
      if (typeof runner === 'string' && typeof model === 'string') {
        return { ...draft, runner, model };
      }
    } catch {
      /* stale catalog option — leave the draft unchanged */
    }
    // 낡은 옵션이라도 이 select는 우리 것이다: 호출 화면의 다른 `change`
    // 처리로 흘려보내지 않는다. 같은 draft를 그대로 돌려주므로 호출자가
    // 다시 그리지 않고, select의 표시는 사람이 고른 자리에 머문다.
    return draft;
  }
  const account_select = /** @type {HTMLSelectElement|null} */ (
    event_target.closest('.provider-resume-dialog__account')
  );
  if (account_select) {
    return { ...draft, account: account_select.value };
  }
  const fresh_input = /** @type {HTMLInputElement|null} */ (
    event_target.closest('.provider-resume-dialog__fresh-input')
  );
  if (fresh_input) {
    return { ...draft, fresh_current: fresh_input.checked };
  }
  return null;
}

/**
 * The one-attempt resume payload this draft confirms to, or `null` when the
 * draft is not complete enough to send. 계정 없는 `claude` 복구를 거절하는 이유:
 * payload에서 `claude_account`가 빠지면 launch가 자기 풀에서 하나를 고르므로
 * 화면이 보여 준 계정과 다른 계정으로 실행된다.
 *
 * @param {ProviderResumeDraft|null} draft
 * @returns {{ attempt_id: string, payload: Record<string, unknown> }|null}
 */
export function providerResumeOverride(draft) {
  if (!draft || !draft.runner || !draft.model) {
    return null;
  }
  if (draft.runner === 'claude' && !draft.account) {
    return null;
  }
  /** @type {Record<string, string>} */
  const exec_override = {
    runner: draft.runner,
    model: draft.model
  };
  if (draft.runner === 'claude' && draft.account) {
    exec_override.claude_account = draft.account;
  }
  const fresh = draft.fresh_current || draft.runner !== draft.original_runner;
  return {
    attempt_id: draft.attempt_id,
    payload: {
      exec_override,
      ...(fresh ? { continuation: 'fresh_current', decision_token: {} } : {})
    }
  };
}

/**
 * Render the alternate provider-resume selector from snapshot catalogs.
 *
 * @param {ProviderResumeDraft|null} draft
 * @param {Record<string, any>} queue
 * @returns {import('lit-html').TemplateResult|''}
 */
export function providerResumeDialogTemplate(draft, queue) {
  if (!draft) {
    return '';
  }
  const runners = objectOf(objectOf(objectOf(queue).runner_catalog).runners);
  const account_catalog = objectOf(objectOf(queue).account_catalog);
  const claude_accounts = Array.isArray(account_catalog.claude)
    ? account_catalog.claude
    : [];
  const cross_runner = draft.runner !== draft.original_runner;
  return html`<dialog
    class="op-dialog provider-resume-dialog"
    aria-label="다른 방법으로 이어하기"
  >
    <h2>다른 방법으로 이어하기</h2>
    <div class="provider-resume-dialog__fields">
      <label>
        러너
        <select class="provider-resume-dialog__runner">
          ${Object.keys(runners).map(
            (runner) =>
              html`<option value=${runner} ?selected=${runner === draft.runner}>
                ${runner}
              </option>`
          )}
        </select>
      </label>
      <label>
        모델
        <select class="provider-resume-dialog__model">
          ${Object.entries(runners).map(
            ([runner, entry]) =>
              html`<optgroup label=${runner}>
                ${Object.keys(objectOf(entry?.models)).map(
                  (model) =>
                    html`<option
                      value=${JSON.stringify([runner, model])}
                      ?selected=${runner === draft.runner &&
                      model === draft.model}
                    >
                      ${model}
                    </option>`
                )}
              </optgroup>`
          )}
        </select>
      </label>
      ${draft.runner === 'claude'
        ? html`<label>
            계정
            <select class="provider-resume-dialog__account">
              ${draft.account
                ? ''
                : html`<option value="" selected>계정 선택</option>`}
              ${draft.account &&
              !claude_accounts.some(
                (/** @type {any} */ account) => account?.email === draft.account
              )
                ? html`<option value=${draft.account} selected>
                    ${draft.account} (목록에 없음)
                  </option>`
                : ''}
              ${claude_accounts.map((/** @type {any} */ account) => {
                const eligibility = providerAccountEligibility(account);
                const label = account.alias || account.email;
                return html`<option
                  value=${account.email}
                  ?selected=${account.email === draft.account}
                  ?disabled=${!eligibility.eligible}
                  title=${eligibility.reason}
                >
                  ${label}${eligibility.reason
                    ? ` — ${eligibility.reason}`
                    : ''}
                </option>`;
              })}
            </select>
          </label>`
        : ''}
      <label class="provider-resume-dialog__fresh">
        <input
          type="checkbox"
          class="provider-resume-dialog__fresh-input"
          .checked=${draft.fresh_current}
        />
        새 세션으로
      </label>
    </div>
    ${cross_runner || draft.fresh_current
      ? html`<p class="provider-resume-dialog__notice">
          이전 세션 맥락을 요약 인계합니다
        </p>`
      : ''}
    <div class="op-dialog__actions provider-resume-dialog__actions">
      <button type="button" class="op-btn provider-resume-dialog__cancel">
        취소
      </button>
      <button
        type="button"
        class="op-btn op-btn--primary provider-resume-dialog__confirm"
        ?disabled=${draft.runner === 'claude' && !draft.account}
        title=${draft.runner === 'claude' && !draft.account
          ? '계정을 먼저 고르세요'
          : ''}
      >
        이어하기
      </button>
    </div>
  </dialog>`;
}

/**
 * Show the rendered selector as a modal. lit-html이 방금 그린 `<dialog>`는 아직
 * 닫힌 상태라, 렌더 직후 한 번 열어 줘야 한다. `showModal`이 없는 환경(테스트
 * DOM)에서는 `open` 속성으로 대신한다.
 *
 * @param {ParentNode|null} root - lit-html이 `<dialog>`를 그려 넣은 컨테이너.
 */
export function showProviderResumeDialog(root) {
  const dialog = /** @type {HTMLDialogElement|null} */ (
    root?.querySelector?.('.provider-resume-dialog') || null
  );
  if (!dialog || dialog.open) {
    return;
  }
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}
