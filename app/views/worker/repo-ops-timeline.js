/**
 * The 저장소 작업 타임라인 drawer (UI-q0uy §4.2).
 *
 * One time axis for everything the Worker did to this repository: verify/deploy
 * operations and stopped post-merge cleanups, merged newest-first. It is a PURE
 * derivation of projections the queue snapshot already carries — no new query
 * exists for this view.
 *
 * The rendering rule is the whole point of the redesign. A success is one quiet
 * line with its evidence folded away; a failure carries the cause SENTENCE and,
 * in the same place, the buttons that act on it. Raw contract tokens never
 * appear in the body — they live in each event's 세부 disclosure, so the
 * debugging path survives the translation.
 *
 * @import { TemplateResult } from 'lit-html'
 */
import { html, render } from 'lit-html';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { failureText, operationFailureText } from './failure-labels.js';
import { formatClock, formatElapsed, shortSha } from './lanes.js';
import { cleanupStepLabel, cleanupStepperView } from './merge-steps.js';

/**
 * How many events the drawer shows. The rail is a "what just happened" surface,
 * not an archive; the durable records stay whole behind it.
 *
 * @type {number}
 */
export const TIMELINE_LIMIT = 20;

/**
 * What each operation kind is called in the timeline. `verify` and `deploy` are
 * durable vocabulary; these are the human names for the same two lanes.
 *
 * @type {Record<string, string>}
 */
const OPERATION_KIND_LABELS = {
  verify: '머지 전 검증',
  deploy: '머지 후 배포'
};

/**
 * The repair button's wording per failure kind (master spec §9.2). Every button
 * names the failure it resolves — there is deliberately no generic 재시도.
 *
 * @type {Record<string, string>}
 */
const RESOLVE_LABELS = {
  verify_script_failure: '검증 실패 해결',
  verify_script_failure_pre_merge: '검증 실패 해결 후 머지',
  deploy_script_failure: '배포 실패 해결',
  interrupted_without_terminal_exit: '중단된 작업 진단',
  other: '자동 해결 세션 시작'
};

/**
 * Merge the two projections into one newest-first event list (§4.2/§5). A row
 * with no usable time sorts to the END — the oldest side — rather than claiming
 * the top of the rail it cannot prove it belongs on.
 *
 * @param {any} operations - Projected `repo_operations` cards.
 * @param {any} cleanup_failures - Projected `cleanup_failed` entries.
 * @param {number} [limit]
 * @returns {any[]}
 */
export function timelineEvents(
  operations,
  cleanup_failures,
  limit = TIMELINE_LIMIT
) {
  /** @type {any[]} */
  const events = [];
  for (const card of Array.isArray(operations) ? operations : []) {
    if (!card || typeof card !== 'object') {
      continue;
    }
    events.push({
      type: 'operation',
      id: card.operation_id,
      at:
        typeof card.finished_at === 'number'
          ? card.finished_at
          : typeof card.requested_at === 'number'
            ? card.requested_at
            : null,
      operation: card
    });
  }
  for (const entry of Array.isArray(cleanup_failures) ? cleanup_failures : []) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }
    events.push({
      type: 'cleanup',
      id: entry.bead_id,
      at: typeof entry.at === 'number' ? entry.at : null,
      cleanup: entry
    });
  }
  events.sort((left, right) => {
    if (left.at === null && right.at === null) {
      return String(left.id || '').localeCompare(String(right.id || ''));
    }
    if (left.at === null) {
      return 1;
    }
    if (right.at === null) {
      return -1;
    }
    return right.at - left.at;
  });
  return events.slice(0, Math.max(0, limit));
}

/**
 * The dot's tone for one event.
 *
 * @param {any} event
 * @returns {'ok'|'fail'|'warn'|'live'}
 */
function toneOf(event) {
  if (event.type === 'cleanup') {
    return 'warn';
  }
  const state = event.operation.state;
  if (state === 'succeeded') {
    return 'ok';
  }
  if (state === 'failed') {
    return 'fail';
  }
  return 'live';
}

/**
 * The state chip's word.
 *
 * @param {any} event
 * @returns {string}
 */
function stateWordOf(event) {
  if (event.type === 'cleanup') {
    return '멈춤';
  }
  switch (event.operation.state) {
    case 'succeeded':
      return '성공';
    case 'failed':
      return '실패';
    case 'repairing':
      return '자동 해결 중';
    case 'running':
      return '실행 중';
    default:
      return '대기';
  }
}

/**
 * The `세부` disclosure: everything a body line deliberately does not say —
 * including the RAW failure code, which is the reason this block always exists
 * on a failing event.
 *
 * `open` is intentionally unbound, leaving it DOM state, so an expanded block
 * survives every snapshot re-render.
 *
 * @param {Array<{ term: string, value: string }>} rows
 * @returns {TemplateResult|string}
 */
function detailsTemplate(rows) {
  const kept = rows.filter((row) => row.value);
  if (kept.length === 0) {
    return '';
  }
  return html`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${kept.map(
        (row) =>
          html`<div>
            <dt>${row.term}</dt>
            <dd>${row.value}</dd>
          </div>`
      )}
    </dl>
  </details>`;
}

/**
 * The failure explanation block. Known failures read as a sentence; an unknown
 * contract token falls back to the raw string (§4.3), which the 세부 block
 * repeats verbatim either way.
 *
 * @param {string} text - Already-resolved human text for this failure.
 * @param {string} [suffix] - Optional second line of context.
 * @param {boolean} [warn] - Warn tone (a stopped cleanup) instead of danger.
 * @returns {TemplateResult|string}
 */
function explainTemplate(text, suffix = '', warn = false) {
  if (!text && !suffix) {
    return '';
  }
  return html`<p
    class="worker-ev__explain${warn ? ' worker-ev__explain--warn' : ''}"
  >
    <span class="worker-ev__cause">${text}</span>${suffix
      ? html`<br />${suffix}`
      : ''}
  </p>`;
}

/**
 * The repair/dismiss actions on a failed operation (§4.2). The budget subtitle
 * is not decoration: a repair session is a spent-once resource, and a button
 * that does not say so invites a second click that the coordinator will refuse.
 *
 * @param {any} operation
 * @returns {TemplateResult|string}
 */
function operationActionsTemplate(operation) {
  if (
    operation.state !== 'failed' ||
    operation.dismissed ||
    operation.superseded_by
  ) {
    return '';
  }
  const repair = operation.repair || {};
  const remaining = typeof repair.remaining === 'number' ? repair.remaining : 0;
  const budget =
    typeof repair.auto_budget === 'number' ? repair.auto_budget : 1;
  const resolve_key =
    operation.failure_kind === 'verify_script_failure' &&
    operation.verify_stage === 'pre_merge'
      ? 'verify_script_failure_pre_merge'
      : operation.failure_kind || 'other';
  const spent = remaining <= 0;
  return html`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${operation.operation_id}
      data-failure-kind=${operation.failure_kind || 'other'}
      ?disabled=${spent}
      title=${spent
        ? '자동 해결 횟수를 다 썼습니다 — 수동으로 해결하세요'
        : '해결 세션을 띄웁니다 (실패한 명령을 그대로 다시 돌리지 않습니다)'}
    >
      ${Object.hasOwn(RESOLVE_LABELS, resolve_key)
        ? RESOLVE_LABELS[resolve_key]
        : RESOLVE_LABELS.other}
    </button>
    <span class="worker-ev__btn-sub"
      >${spent
        ? '자동 해결 횟수를 다 썼습니다 — 수동으로 해결하세요'
        : `repair 세션 1회를 씁니다 · 남음 ${remaining}/${budget}`}</span
    >
    ${repair.attempt_id
      ? html`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${repair.attempt_id}
        >
          해결 세션 보기
        </button>`
      : ''}
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${operation.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`;
}

/**
 * One repo-operation event.
 *
 * @param {any} event
 * @returns {TemplateResult}
 */
function operationEventTemplate(event) {
  const operation = event.operation;
  const failed = operation.state === 'failed';
  const code = operation.failure ? operation.failure.code : '';
  return html`<li
    class="worker-ev"
    data-operation-id=${operation.operation_id}
    data-state=${operation.state}
  >
    <span
      class="worker-ev__t"
      title=${event.at ? formatTimestampLocal(event.at) : ''}
      >${formatClock(event.at) || '—'}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${toneOf(event)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(OPERATION_KIND_LABELS, operation.kind)
            ? OPERATION_KIND_LABELS[operation.kind]
            : operation.kind}</span
        >
        <span class="worker-ev__meta"
          >${operation.target_base}@${shortSha(
            operation.target_sha
          )}${typeof operation.elapsed_ms === 'number'
            ? ` · ${formatElapsed(operation.elapsed_ms)}`
            : ''}</span
        >
        <span class="worker-ev__st worker-ev__st--${toneOf(event)}"
          >${stateWordOf(event)}</span
        >
        ${operation.dismissed
          ? html`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`
          : ''}
        ${operation.superseded_by
          ? html`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`
          : ''}
      </div>
      ${failed
        ? explainTemplate(operationFailureText(operation.failure_kind, code))
        : ''}
      ${operationActionsTemplate(operation)}
      ${detailsTemplate([
        { term: '실패 코드', value: failed ? code : '' },
        {
          term: 'script',
          value: [
            operation.script_path || '',
            operation.script_blob_sha
              ? `blob ${shortSha(operation.script_blob_sha)}`
              : '',
            Number.isInteger(operation.exit_code)
              ? `exit ${operation.exit_code}`
              : ''
          ]
            .filter(Boolean)
            .join(' · ')
        },
        { term: '로그', value: operation.log_path || '' },
        { term: '출력', value: operation.output_tail || '' }
      ])}
    </div>
  </li>`;
}

/**
 * One stopped-cleanup event: the five-step stepper showing WHERE it stopped, the
 * cause sentence, and a resume button that names the step it resumes from. This
 * absorbs the old yellow banner without losing any of its information — the
 * output tail and log path move into 세부.
 *
 * @param {any} event
 * @returns {TemplateResult}
 */
function cleanupEventTemplate(event) {
  const cleanup = event.cleanup;
  const step_label = cleanupStepLabel(cleanup.step);
  return html`<li
    class="worker-ev"
    data-bead-id=${cleanup.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${event.at ? formatTimestampLocal(event.at) : ''}
      >${formatClock(event.at) || '—'}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--warn"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${cleanup.bead_id} 머지 후 정리</span>
        <span class="worker-ev__st worker-ev__st--warn">멈춤</span>
      </div>
      <ol class="worker-stepper" aria-label="정리 단계">
        ${cleanupStepperView(cleanup.step).map(
          (pip) =>
            html`<li
              class="worker-step worker-step--${pip.state}"
              data-step=${pip.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${pip.label}</span>
            </li>`
        )}
      </ol>
      ${explainTemplate(
        failureText(cleanup.reason),
        typeof cleanup.retry_count === 'number' && cleanup.retry_count > 0
          ? `${cleanup.retry_count}회 자동 재시도 후에도 실패했습니다 — 정리를 재개하면 멈춘 단계부터 다시 진행합니다.`
          : '정리를 재개하면 멈춘 단계부터 다시 진행합니다.',
        true
      )}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${cleanup.bead_id}
        >
          정리 재개${step_label ? ` — ${step_label} 단계부터` : ''}
        </button>
      </div>
      ${detailsTemplate([
        { term: '실패 코드', value: cleanup.reason || '' },
        { term: '진단', value: cleanup.detail || '' },
        { term: '로그', value: cleanup.log_path || '' },
        { term: '출력', value: cleanup.output_tail || '' }
      ])}
    </div>
  </li>`;
}

/**
 * The drawer body.
 *
 * @param {{ events: any[], repo: string }} model
 * @returns {TemplateResult}
 */
export function repoOpsTimelineTemplate(model) {
  return html`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
    <div class="worker-repo-drawer__hd">
      <h3>저장소 작업 타임라인</h3>
      <span class="worker-repo-drawer__hint">${model.repo}</span>
      <span class="worker-repo-drawer__spacer"></span>
      <button
        type="button"
        class="worker-repo-drawer__close"
        aria-label="닫기"
        data-seam="repo-ops-close"
      >
        ✕
      </button>
    </div>
    ${model.events.length === 0
      ? html`<div class="worker-repo-drawer__empty">기록 없음</div>`
      : html`<ul class="worker-rail">
          ${model.events.map((event) =>
            event.type === 'cleanup'
              ? cleanupEventTemplate(event)
              : operationEventTemplate(event)
          )}
        </ul>`}
  </section>`;
}

/**
 * Create the timeline drawer. It owns its own lit-html root inside the console's
 * drawer overlay — the same chrome the transcript drawer uses — so a console
 * re-render never clobbers it and an open drawer never pushes the lanes down.
 *
 * @param {HTMLElement} mount_element
 * @param {{ onClose?: () => void }} [options]
 */
export function createRepoOpsDrawer(mount_element, options = {}) {
  /** @type {{ events: any[], repo: string }|null} */
  let model = null;

  function doRender() {
    render(model ? repoOpsTimelineTemplate(model) : html``, mount_element);
  }

  mount_element.addEventListener('click', (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target?.closest?.('[data-seam="repo-ops-close"]')) {
      close();
    }
  });

  /**
   * @param {{ operations: any, cleanup_failures: any, repo?: string }} input
   */
  function open(input) {
    model = {
      events: timelineEvents(input.operations, input.cleanup_failures),
      repo: input.repo || ''
    };
    doRender();
  }

  function close() {
    if (model === null) {
      return;
    }
    model = null;
    doRender();
    if (options.onClose) {
      options.onClose();
    }
  }

  return {
    open,
    close,
    /** @returns {boolean} */
    isOpen: () => model !== null,
    /**
     * Re-derive from a fresh snapshot while the drawer stays open.
     *
     * @param {{ operations: any, cleanup_failures: any, repo?: string }} input
     */
    refresh(input) {
      if (!model) {
        return;
      }
      open(input);
    }
  };
}
