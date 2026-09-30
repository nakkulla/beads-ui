/**
 * The issue detail's editable fields (UI-dbn6 §3.5): the 제목 (✎ inline editor,
 * Enter saves, Esc cancels), the 속성 — status, priority, route (a full_plan
 * exit asks first), labels (add with Enter, remove with ×), created/updated —
 * the 설명 (markdown; ✎ editor, Ctrl/Cmd+Enter saves), the read-only 노트, and
 * the raw workflow receipts under the stepper. Every write is one issue
 * mutation whose `bd show` reply the detail adopts (`sendMutation`). Moved out
 * of the detail panel closure (UI-dbn6 Phase 2); the description now renders
 * as markdown (spec §3.5).
 *
 * @import { DetailContext } from './index.js'
 */
import { html } from 'lit-html';
import { formatTimestampLocal } from '../../model/relative-time.js';
import { markdownBlock } from '../../ui/markdown.js';
import { providerUsageBadges } from '../../utils/token-usage.js';
import { formatExecReceipt } from './exec-format.js';

/**
 * Allowed status values (mirrors UPDATE_STATUS_ALLOWED in
 * server/ws/mutation-handlers.js).
 */
const STATUS_OPTIONS = [
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
];

/** Allowed priority values (handleUpdatePriority accepts a number 0..4). */
const PRIORITY_OPTIONS = [0, 1, 2, 3, 4];

/**
 * @param {DetailContext} ctx
 */
export function createFieldsSection(ctx) {
  // Inline edit state. These live in the closure (not derived from the issue),
  // so an incoming subscription push re-render never wipes an open editor or
  // the in-flight draft value. An editor is closed only on explicit
  // save/cancel.
  let editing_title = false;
  let editing_desc = false;
  let title_draft = '';
  let desc_draft = '';
  let label_draft = '';

  /**
   * @param {string} selector
   */
  function focusEdit(selector) {
    setTimeout(() => {
      try {
        const el = /** @type {HTMLElement | null} */ (
          ctx.mount.querySelector(selector)
        );
        if (el && typeof el.focus === 'function') {
          el.focus();
        }
      } catch {
        // ignore focus errors
      }
    }, 0);
  }

  function startEditTitle() {
    editing_title = true;
    title_draft = ctx.data()?.title || '';
    ctx.render();
    focusEdit('.detail-edit__input[data-edit="title"]');
  }

  /**
   * @param {Event} ev
   */
  function onTitleInput(ev) {
    title_draft = /** @type {HTMLInputElement} */ (ev.target).value;
  }

  function cancelTitle() {
    editing_title = false;
    title_draft = '';
    ctx.render();
  }

  function saveTitle() {
    const value = title_draft;
    void ctx
      .sendMutation(
        'edit-text',
        { id: ctx.id(), field: 'title', value },
        '제목 저장 실패'
      )
      .then((ok) => {
        if (ok === true) {
          editing_title = false;
          title_draft = '';
        }
        ctx.render();
      });
  }

  function startEditDesc() {
    editing_desc = true;
    desc_draft = ctx.data()?.description || '';
    ctx.render();
    focusEdit('.detail-edit__textarea[data-edit="description"]');
  }

  /**
   * @param {Event} ev
   */
  function onDescInput(ev) {
    desc_draft = /** @type {HTMLTextAreaElement} */ (ev.target).value;
  }

  function cancelDesc() {
    editing_desc = false;
    desc_draft = '';
    ctx.render();
  }

  function saveDesc() {
    const value = desc_draft;
    void ctx
      .sendMutation(
        'edit-text',
        { id: ctx.id(), field: 'description', value },
        '설명 저장 실패'
      )
      .then((ok) => {
        if (ok === true) {
          editing_desc = false;
          desc_draft = '';
        }
        ctx.render();
      });
  }

  /**
   * Escape cancels the editor without bubbling to the panel-close listener;
   * Enter (input) / Ctrl+Enter (textarea) saves.
   *
   * @param {KeyboardEvent} ev
   * @param {() => void} save
   * @param {() => void} cancel
   * @param {boolean} multiline
   */
  function onEditorKeydown(ev, save, cancel, multiline) {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      cancel();
      return;
    }
    if (ev.key === 'Enter' && (!multiline || ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault();
      save();
    }
  }

  /**
   * @param {Event} ev
   */
  function onStatusChange(ev) {
    const status = /** @type {HTMLSelectElement} */ (ev.target).value;
    void ctx
      .sendMutation('update-status', { id: ctx.id(), status }, '상태 변경 실패')
      .then(() => ctx.render());
  }

  /**
   * @param {Event} ev
   */
  function onPriorityChange(ev) {
    const priority = Number(/** @type {HTMLSelectElement} */ (ev.target).value);
    void ctx
      .sendMutation(
        'update-priority',
        { id: ctx.id(), priority },
        '우선순위 변경 실패'
      )
      .then(() => ctx.render());
  }

  /**
   * @param {Event} ev
   */
  function onLabelInput(ev) {
    label_draft = /** @type {HTMLInputElement} */ (ev.target).value;
  }

  function addLabel() {
    const label = label_draft.trim();
    if (label.length === 0) {
      return;
    }
    void ctx
      .sendMutation('label-add', { id: ctx.id(), label }, '라벨 추가 실패')
      .then((ok) => {
        if (ok === true) {
          label_draft = '';
        }
        ctx.render();
      });
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onLabelKeydown(ev) {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      label_draft = '';
      ctx.render();
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      addLabel();
    }
  }

  /**
   * @param {string} label
   */
  function removeLabel(label) {
    void ctx
      .sendMutation('label-remove', { id: ctx.id(), label }, '라벨 제거 실패')
      .then(() => ctx.render());
  }

  /**
   * @param {any} data
   */
  function workflowTemplate(data) {
    const md = data.metadata || {};
    const wf = data.workflow || {};
    const stages = wf.stages || {};
    const specStale = stages.spec && stages.spec.stale;
    const implStale = stages.impl && stages.impl.stale;
    // 접미는 판정이 `stale`이라고 말할 때만 붙는다. `unknown`은 투영을 못 읽어
    // 판정 자체가 없다는 뜻이므로 아무 주장도 하지 않는다 (UI-r7or §5.5).
    const quick_fix_stale = wf.quick_fix_review?.state === 'stale';
    const plan = stages.plan || null;
    // Derived route remains available for workflow layout, but display names
    // the missing metadata pin instead of exposing the fallback value.
    const route_derived = wf.route_source === 'derived';
    const route_label = wf.route || md.route || '—';
    return html`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${route_derived ? ' detail-kv__v--derived' : ''}"
          title=${route_derived ? 'route 미핀 (metadata unset)' : 'route'}
          >${route_derived ? 'unset' : route_label}</span
        >
      </div>
      ${wf.route !== 'quick_fix' || Object.hasOwn(md, 'spec_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${md.spec_review || '없음'}${specStale ? ' · stale' : ''}</span
            >
          </div>`
        : ''}
      ${wf.route === 'full_plan'
        ? html`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v"
                >${plan?.receipt || '없음'}${plan?.review_state === 'incomplete'
                  ? ' · 불완전(앵커 불일치)'
                  : ''}</span
              >
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${plan?.approval_receipt || '없음'}${plan?.approval_state ===
                'stale'
                  ? ' · stale'
                  : plan?.approval_state === 'unknown'
                    ? ' · unknown'
                    : ''}</span
              >
            </div>`
        : ''}
      ${wf.route !== 'quick_fix' || Object.hasOwn(md, 'impl_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${md.impl_review || '없음'}${implStale ? ' · stale' : ''}</span
            >
          </div>`
        : ''}
      ${wf.resolver
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${wf.resolver.attempt} · ${wf.resolver.prior_sha} → ${wf.resolver.sha}`}
              >${`${wf.resolver.prior_sha.slice(0, 7)} → ${wf.resolver.sha.slice(0, 7)}`}</span
            >
          </div>`
        : ''}
      ${wf.route === 'quick_fix' || Object.hasOwn(md, 'quick_fix_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${md.quick_fix_review || '없음'}${quick_fix_stale
                ? ' · stale'
                : ''}</span
            >
          </div>`
        : ''}
      ${wf.planned_execution
        ? html`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${wf.planned_execution.kind}</span>
            </div>
            ${wf.planned_execution.kind === 'main'
              ? html`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${wf.planned_execution.reason}</span
                  >
                </div>`
              : ''}`
        : ''}
      ${wf.exec_receipt
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${formatExecReceipt(wf.exec_receipt)}</span
            >
          </div>`
        : ''}
      ${wf.impl_entry
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${wf.impl_entry.actor}@${wf.impl_entry.sha}`}</span
            >
          </div>`
        : ''}
      ${md.pr_url
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${md.pr_url}</span>
          </div>`
        : ''}
    `;
  }

  /**
   * Workflow metadata enum keys editable from the panel (§6). Empty = unset
   * (the key is removed; route falls back to derivation at resolution time).
   * merge_policy/drift_policy는 축 폐기(worker-phase2 §2) — 모든 세션이
   * PR-stop이므로 더 이상 편집 대상이 아니다.
   */
  /** @type {Record<'route', string[]>} */
  const WORKFLOW_META_OPTIONS = {
    route: ['quick_fix', 'spec_backed', 'full_plan']
  };

  /**
   * @param {'route'} key
   * @param {Event} ev
   */
  async function onWorkflowMetaChange(key, ev) {
    const value = /** @type {HTMLSelectElement} */ (ev.target).value;
    if (
      key === 'route' &&
      ctx.data()?.metadata?.route === 'full_plan' &&
      value !== 'full_plan'
    ) {
      // 저장된 plan 포기·마커 정리는 세션 계약 소유 — UI는 metadata만 바꾼다.
      const proceed = window.confirm(
        `full_plan → ${value || '(미설정)'} 전환: 저장된 plan 승인은 포기되며, plan 파일·마커 정리는 세션 계약이 수행합니다. 계속할까요?`
      );
      if (!proceed) {
        ctx.render();
        return;
      }
    }
    await ctx.sendMutation(
      'update-workflow-meta',
      { id: ctx.id(), key, value },
      '워크플로우 메타 변경 실패'
    );
    ctx.render();
  }

  /**
   * Editable workflow metadata selects (route).
   *
   * @param {any} data
   */
  function workflowMetaTemplate(data) {
    const md = data.metadata || {};
    /**
     * @param {'route'} key
     * @param {string} unset_label
     */
    const row = (key, unset_label) => {
      const opts = WORKFLOW_META_OPTIONS[key];
      const value = typeof md[key] === 'string' ? md[key] : '';
      return html`<div class="detail-kv">
        <span class="detail-kv__k">${key}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${key}
          data-edit=${`wfmeta-${key}`}
          @change=${(/** @type {Event} */ ev) => onWorkflowMetaChange(key, ev)}
        >
          <option value="" ?selected=${!opts.includes(value)}>
            ${unset_label}
          </option>
          ${opts.map(
            (o) =>
              html`<option value=${o} ?selected=${value === o}>${o}</option>`
          )}
        </select>
      </div>`;
    };
    return html` ${row('route', '(unset)')} `;
  }

  /**
   * @param {string} title
   * @param {import('../../utils/token-usage.js').UsageProjection|null} total_usage
   */
  function titleTemplate(title, total_usage) {
    if (editing_title) {
      return html`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${title_draft}
            @input=${onTitleInput}
            @keydown=${(/** @type {KeyboardEvent} */ ev) =>
              onEditorKeydown(ev, saveTitle, cancelTitle, false)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${saveTitle}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${cancelTitle}
            >
              취소
            </button>
          </div>
        </div>
      `;
    }
    return html`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${title}</h2>
        ${providerUsageBadges(total_usage).map(
          (badge) =>
            html`<span class="detail-usage-total" title=${badge.tooltip}
              >${badge.label}</span
            >`
        )}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${startEditTitle}
        >
          ✎
        </button>
      </div>
    `;
  }

  /**
   * Read-only created/updated rows (UX v3 spec §1): local-timezone absolute
   * times via the shared `formatTimestampLocal` helper.
   *
   * @param {{ created_at?: number | string, updated_at?: number | string }} data
   */
  function timesTemplate(data) {
    const created = formatTimestampLocal(data.created_at);
    const updated = formatTimestampLocal(data.updated_at);
    if (!created && !updated) {
      return html``;
    }
    return html`
      ${created
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${created}</span>
          </div>`
        : ''}
      ${updated
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${updated}</span>
          </div>`
        : ''}
    `;
  }

  /**
   * @param {string} status
   * @param {number | ''} priority_val
   */
  function propsTemplate(status, priority_val) {
    return html`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${onStatusChange}
        >
          ${STATUS_OPTIONS.map(
            (s) =>
              html`<option value=${s} ?selected=${s === status}>${s}</option>`
          )}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${onPriorityChange}
        >
          ${PRIORITY_OPTIONS.map(
            (p) =>
              html`<option value=${String(p)} ?selected=${p === priority_val}>
                P${p}
              </option>`
          )}
        </select>
      </div>
    `;
  }

  /**
   * @param {string} description
   */
  function descTemplate(description) {
    return html`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${editing_desc
          ? ''
          : html`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${startEditDesc}
            >
              ✎
            </button>`}
      </div>
      ${editing_desc
        ? html`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${desc_draft}
              @input=${onDescInput}
              @keydown=${(/** @type {KeyboardEvent} */ ev) =>
                onEditorKeydown(ev, saveDesc, cancelDesc, true)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${saveDesc}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${cancelDesc}
              >
                취소
              </button>
            </div>
          </div>`
        : html`<div class="detail-overlay__desc">
            ${description ? markdownBlock(description) : '(설명 없음)'}
          </div>`}
    `;
  }

  /**
   * Read-only notes block (UI-yp64 §4). notes is where the gate receipt
   * lineage and REVISE findings live, so a parked bead's card click has to end
   * somewhere that actually shows them. Read-only on purpose: `bd`'s `--notes`
   * replaces rather than appends, so an editor here is an overwrite accident.
   * Absent/blank notes render nothing at all (fail-quiet).
   *
   * @param {any} data
   */
  function notesTemplate(data) {
    const notes = typeof data.notes === 'string' ? data.notes : '';
    if (notes.trim().length === 0) {
      return html``;
    }
    return html`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${notes}</div>
    `;
  }

  /**
   * @param {any} data
   */
  function labelsTemplate(data) {
    const labels = Array.isArray(data.labels) ? data.labels : [];
    return html`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${labels.map(
          (/** @type {string} */ label) =>
            html`<span class="detail-label-chip"
              >${label}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${label}
                aria-label=${'라벨 제거: ' + label}
                @click=${() => removeLabel(label)}
              >
                ×
              </button></span
            >`
        )}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${label_draft}
            @input=${onLabelInput}
            @keydown=${onLabelKeydown}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${addLabel}
          >
            추가
          </button>
        </span>
      </div>
    `;
  }

  return {
    reset() {
      editing_title = false;
      editing_desc = false;
      title_draft = '';
      desc_draft = '';
      label_draft = '';
    },
    titleTemplate,
    timesTemplate,
    propsTemplate,
    descTemplate,
    notesTemplate,
    labelsTemplate,
    workflowTemplate,
    workflowMetaTemplate
  };
}
