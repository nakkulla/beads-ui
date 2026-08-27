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
import { copyToClipboard } from '../../utils/clipboard.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { showToast } from '../../utils/toast.js';
import {
  failureText,
  operationFailureText,
  retryOutcomeText,
  terminationText
} from './failure-labels.js';
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
 * How many events the drawer opens with. The rail's first screen answers "what
 * just happened", so it starts at the handful a reader can take in; the older
 * twenty stay one click away rather than pushing the recent ones off-screen.
 *
 * @type {number}
 */
export const RECENT_LIMIT = 5;

/**
 * Operation states that still WANT something from a person or a runner. A row
 * in one of these is never folded away by age: an old failure is exactly the
 * one a reader must not have to hunt for.
 *
 * @type {Set<string>}
 */
const UNRESOLVED_STATES = new Set([
  'failed',
  'running',
  'queued',
  'retry_pending'
]);

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
 * Whether one event still needs attention. A stopped cleanup always does — it
 * exists only because the post-merge cursor could not finish.
 *
 * @param {any} event
 * @returns {boolean}
 */
function isUnresolved(event) {
  if (event.type === 'cleanup') {
    return true;
  }
  const operation = event.operation;
  return (
    UNRESOLVED_STATES.has(operation.state) &&
    !operation.dismissed &&
    !operation.superseded_by
  );
}

/**
 * Choose what the rail shows (UI-lsti §5): the newest handful plus every
 * unresolved row, in one newest-first order, and the count of everything else.
 *
 * The derivation runs over the WHOLE event list rather than a pre-cut twenty,
 * because the unresolved rule is about attention, not recency — a failure older
 * than the twentieth event must still surface.
 *
 * @param {any} operations - Projected `repo_operations` cards.
 * @param {any} cleanup_failures - Projected `cleanup_failed` entries.
 * @param {{ expanded?: boolean }} [options]
 * @returns {{ visible: any[], hidden: number }}
 */
export function timelineView(operations, cleanup_failures, options = {}) {
  const all = timelineEvents(operations, cleanup_failures, Infinity);
  const limit = options.expanded === true ? TIMELINE_LIMIT : RECENT_LIMIT;
  const recent = new Set(all.slice(0, limit));
  const visible = all.filter(
    (event) => recent.has(event) || isUnresolved(event)
  );
  return { visible, hidden: all.length - visible.length };
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
    case 'retry_pending':
      return '재시도 중';
    case 'running':
      return '실행 중';
    default:
      return '대기';
  }
}

/**
 * Put one absolute path on the clipboard. Board's `복사됨`/`복사 실패` toast
 * convention, because that is the only feedback a copy can honestly give.
 *
 * @param {string} value
 */
async function copyPath(value) {
  const copied = await copyToClipboard(value);
  showToast(
    copied ? '복사됨' : '복사 실패',
    copied ? 'success' : 'error',
    1200
  );
}

/**
 * A path value plus the control that moves it somewhere useful (UI-8w4t §4).
 * The log a failure left behind is read in a terminal, not here, so the path is
 * only worth showing if it can be carried out of the browser.
 *
 * The control is bound to the value, never drawn on its own: a card whose
 * failure happened BEFORE the RepoOperation started has no log file, and a
 * copy button for a path that does not exist is worse than no button.
 *
 * @param {string} value
 * @returns {TemplateResult}
 */
function pathValueTemplate(value) {
  return html`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${value}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`로그 경로 복사: ${value}`}
      @click=${() => void copyPath(value)}
    >
      ⧉
    </button></span
  >`;
}

/**
 * The `세부` disclosure: everything a body line deliberately does not say —
 * including the RAW failure code, which is the reason this block always exists
 * on a failing event.
 *
 * A row may ask for `copy`, which renders its value as a `<code>` path with the
 * copy control beside it. Rows with an empty value drop out first, so `copy`
 * never produces a control with nothing behind it.
 *
 * `open` is intentionally unbound, leaving it DOM state, so an expanded block
 * survives every snapshot re-render.
 *
 * @param {Array<{ term: string, value: string, copy?: boolean }>} rows
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
      ${kept.map((row) => {
        const value =
          row.copy === true ? pathValueTemplate(row.value) : row.value;
        return html`<div>
          <dt>${row.term}</dt>
          <dd>${value}</dd>
        </div>`;
      })}
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
 * The declared timeout for the lane one operation belongs to. It is NOT on the
 * operation card — a timeout is a property of the declaration, so it is read
 * from the same `repo_ops` projection the settings card draws, matched to the
 * operation's own `kind`. Absent when nothing declares that lane, which makes
 * the termination line say `타임아웃 초과` without a number rather than invent
 * one.
 *
 * @param {any} repo_ops - The snapshot's `workspace_info.repo_ops`.
 * @param {any} operation
 * @returns {number|undefined}
 */
function laneTimeoutMs(repo_ops, operation) {
  if (!repo_ops || typeof repo_ops !== 'object') {
    return undefined;
  }
  const lane = operation && operation.kind === 'verify' ? 'verify' : 'deploy';
  const declaration = repo_ops[lane];
  const timeout_ms =
    declaration && typeof declaration === 'object'
      ? declaration.timeout_ms
      : undefined;
  return typeof timeout_ms === 'number' && Number.isFinite(timeout_ms)
    ? timeout_ms
    : undefined;
}

/**
 * The two derived lines under the cause sentence (UI-s582 §2): HOW the process
 * ended, and what the one automatic `script_retry` did about it.
 *
 * Both are pure derivations of fields the card already carries, and both are
 * omitted when the card cannot prove what they would say — an absent line is the
 * honest rendering of an absent fact. The retry line is asked for on EVERY state
 * because `absorbed` belongs on a succeeded card: it is the only trace left of a
 * failure the retry erased.
 *
 * @param {any} operation
 * @param {number} [timeout_ms] - The declared timeout of this operation's lane.
 * @returns {TemplateResult|string}
 */
function operationWhyTemplate(operation, timeout_ms) {
  const termination = terminationText(operation, timeout_ms);
  const retry = retryOutcomeText(operation);
  if (!termination && !retry) {
    return '';
  }
  return html`<p class="worker-ev__why">
    ${termination
      ? html`<span class="worker-ev__why-line">${termination}</span>`
      : ''}${retry
      ? html`<span class="worker-ev__why-line">${retry}</span>`
      : ''}
  </p>`;
}

/**
 * The dismiss action on a failed operation (§4.2). A failed script is now a
 * terminal record: the only thing a reader can do to it is accept it, which
 * takes the row out of the attention count without erasing the evidence.
 *
 * @param {any} operation
 * @returns {TemplateResult|string}
 */
function operationActionsTemplate(operation) {
  if (
    operation.state !== 'failed' ||
    operation.superseded_by ||
    operation.dismissed
  ) {
    return '';
  }
  return html`<div class="worker-ev__acts">
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
 * @param {any} [repo_ops] - The snapshot's `workspace_info.repo_ops`, the only
 * place a lane's declared timeout exists.
 * @returns {TemplateResult}
 */
function operationEventTemplate(event, repo_ops) {
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
        ${operation.source === 'manual'
          ? html`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`
          : ''}
      </div>
      ${failed
        ? explainTemplate(operationFailureText(operation.failure_kind, code))
        : ''}
      ${operationWhyTemplate(operation, laneTimeoutMs(repo_ops, operation))}
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
        { term: '로그', value: operation.log_path || '', copy: true },
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
        { term: '로그', value: cleanup.log_path || '', copy: true },
        { term: '출력', value: cleanup.output_tail || '' }
      ])}
    </div>
  </li>`;
}

/**
 * The drawer body.
 *
 * @param {{ events: any[], repo: string, hidden?: number, expanded?: boolean, repo_ops?: any }} model
 * @returns {TemplateResult}
 */
export function repoOpsTimelineTemplate(model) {
  const hidden = typeof model.hidden === 'number' ? model.hidden : 0;
  const expanded = model.expanded === true;
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
              : operationEventTemplate(event, model.repo_ops)
          )}
        </ul>`}
    ${hidden > 0 || expanded
      ? html`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${expanded ? '접기' : `이전 ${hidden}개 더 보기`}
          </button>
        </div>`
      : ''}
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
  /** @type {{ operations: any, cleanup_failures: any, repo: string, repo_ops: any, expanded: boolean }|null} */
  let model = null;

  function doRender() {
    if (model === null) {
      render(html``, mount_element);
      return;
    }
    const view = timelineView(model.operations, model.cleanup_failures, {
      expanded: model.expanded
    });
    render(
      repoOpsTimelineTemplate({
        events: view.visible,
        hidden: view.hidden,
        expanded: model.expanded,
        repo: model.repo,
        repo_ops: model.repo_ops
      }),
      mount_element
    );
  }

  mount_element.addEventListener('click', (ev) => {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target?.closest?.('[data-seam="repo-ops-close"]')) {
      close();
      return;
    }
    if (target?.closest?.('[data-seam="repo-ops-more"]') && model) {
      model.expanded = !model.expanded;
      doRender();
    }
  });

  /**
   * @param {{ operations: any, cleanup_failures: any, repo?: string, repo_ops?: any }} input
   */
  function open(input) {
    model = {
      operations: input.operations,
      cleanup_failures: input.cleanup_failures,
      repo: input.repo || '',
      repo_ops: input.repo_ops || null,
      expanded: false
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
     * Re-derive from a fresh snapshot while the drawer stays open. The fold
     * state is the READER's, not the snapshot's: a queue push must never
     * collapse a timeline someone just opened.
     *
     * @param {{ operations: any, cleanup_failures: any, repo?: string, repo_ops?: any }} input
     */
    refresh(input) {
      if (!model) {
        return;
      }
      model = {
        operations: input.operations,
        cleanup_failures: input.cleanup_failures,
        repo: input.repo || '',
        repo_ops: input.repo_ops || null,
        expanded: model.expanded
      };
      doRender();
    }
  };
}
