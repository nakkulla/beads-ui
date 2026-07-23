import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { showToast } from '../../utils/toast.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { artifactsTemplate } from './artifacts.js';
import { execSettingsTemplate } from './exec-settings.js';
import { createMdViewer } from './md-viewer.js';
import { sessionHistoryTemplate } from './session-history.js';

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
 * Shared detail panel (spec §3). Opens as a right-side overlay from a board
 * card (and later a Worker tile). Composition: id/title/status/description,
 * dependencies (bd edges), workflow summary WITH raw receipt strings,
 * Artifacts (copy path / open md viewer), execution settings (5 keys +
 * workflow_mode), and a session-history seam (Phase 11). Reads the pushed
 * snapshot from the `detail:<id>` subscription store — no new list calls; the
 * exec-settings edit is the only mutation (via `transport`).
 */

/**
 * @typedef {Object} DetailPanelOptions
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<unknown>} [transport]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [queueStore] - Client worker-queue store (source of a bead's attempts).
 * @property {{ get: (id: string) => { lines: unknown[] } | null, subscribe: (fn: () => void) => () => void }} [sessionLogStore]
 * @property {() => string | null | undefined} [getWorkspacePath]
 * @property {(id: string) => void} [onNavigate] - Navigate to a dependency id.
 * @property {() => void} onClose - Invoked to request the overlay be closed.
 */

/**
 * @param {HTMLElement} mount_element
 * @param {DetailPanelOptions} options
 * @returns {{ load: (id: string) => void, clear: () => void, destroy: () => void }}
 */
export function createDetailPanel(mount_element, options) {
  const issueStores = options.issueStores;
  const onClose = options.onClose;
  const transport = options.transport;
  const onNavigate = options.onNavigate;
  const queueStore = options.queueStore;
  const sessionLogStore = options.sessionLogStore;

  /** @type {string | null} */
  let current_id = null;
  /** @type {any} */
  let current = null;
  /** @type {Record<string, string>} */
  let exec_local = {};

  // Inline edit state. These live in the closure (not derived from `current`),
  // so an incoming subscription push re-render never wipes an open editor or the
  // in-flight draft value. An editor is closed only on explicit save/cancel.
  let editing_title = false;
  let editing_desc = false;
  let title_draft = '';
  let desc_draft = '';
  let label_draft = '';

  function resetEditors() {
    editing_title = false;
    editing_desc = false;
    title_draft = '';
    desc_draft = '';
    label_draft = '';
  }

  // md viewer lives in its own body-appended overlay mount.
  const mv_mount = document.createElement('div');
  mv_mount.className = 'md-viewer-root';
  document.body.appendChild(mv_mount);
  const md_viewer = createMdViewer(mv_mount, {
    getWorkspacePath: options.getWorkspacePath || (() => '')
  });

  // Transcript drawer for a session-history row (Done/Failed → persisted log,
  // live attempt → live-follow). Opens as its own body-appended overlay so it
  // sits above the detail overlay (spec §5.6).
  const sl_mount = document.createElement('div');
  sl_mount.className = 'session-log-root';
  document.body.appendChild(sl_mount);
  const transcript_drawer = createTranscriptDrawer(sl_mount, {
    transport: transport
      ? (type, payload) => Promise.resolve(transport(type, payload))
      : undefined,
    sessionLogStore
  });

  /**
   * Attempts recorded for the current bead, newest first (from the client
   * worker-queue store's `attempts` map).
   *
   * @returns {import('./session-history.js').SessionAttempt[]}
   */
  function attemptsForBead() {
    if (!queueStore || !current_id) {
      return [];
    }
    const q = queueStore.get();
    const attempts = q && q.attempts ? Object.values(q.attempts) : [];
    return /** @type {any[]} */ (attempts)
      .filter((a) => a && a.bead_id === current_id)
      .sort((a, b) => (b.started_at || 0) - (a.started_at || 0))
      .map((a) => ({
        attempt_id: a.attempt_id,
        bead_id: a.bead_id,
        status: a.status,
        started_at: typeof a.started_at === 'number' ? a.started_at : null,
        runner: a.runner || null,
        model: a.model || null,
        session_id: a.session_id || null,
        resumed_from: a.resumed_from || null
      }));
  }

  /**
   * @param {string} attempt_id
   */
  function openTranscript(attempt_id) {
    const q = queueStore ? queueStore.get() : null;
    const a = q && q.attempts ? q.attempts[attempt_id] : null;
    transcript_drawer.open({
      attempt_id,
      meta: a
        ? {
            runner: a.runner || undefined,
            model: a.model || undefined,
            effort: a.effort || undefined,
            status: a.status || undefined,
            session_id: a.session_id || undefined
          }
        : {}
    });
  }

  /**
   * Manually resume a failed/orphaned attempt (spec §1). Fire-and-forget; the
   * server validates (six §1.2 refusals), dispatches, and pushes a fresh queue
   * snapshot that surfaces the new running attempt in the history list.
   *
   * @param {string} attempt_id
   */
  function resumeAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    void Promise.resolve(
      transport('worker-attempt-resume', { attempt_id })
    ).then((res) => {
      const r = /** @type {any} */ (res);
      if (r && r.resumed === false && r.reason) {
        showToast(`이어하기 거부: ${r.reason}`, 'error', 2400);
      }
    });
  }

  const session_handlers = { onOpen: openTranscript, onResume: resumeAttempt };

  /**
   * Workspace-global exec defaults from the queue snapshot (spec §3.2): a
   * bead-unset exec key resolves through these before the static fallback, so
   * the panel shows `(기본: <값> — 전역)` when a global override exists.
   *
   * @returns {Record<string, any>}
   */
  function execDefaults() {
    const q = queueStore ? queueStore.get() : null;
    const d = q && q.exec_defaults;
    return d && typeof d === 'object' ? d : {};
  }

  /** @type {null | (() => void)} */
  let unsubscribe = null;
  if (issueStores && issueStores.subscribe) {
    unsubscribe = issueStores.subscribe(() => refreshFromStore());
  }
  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  if (queueStore && typeof queueStore.subscribe === 'function') {
    // A new/updated attempt should refresh the session-history list.
    unsubscribe_queue = queueStore.subscribe(() => {
      if (current_id) {
        doRender();
      }
    });
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onKeydown(ev) {
    if (ev.key === 'Escape' && current_id) {
      ev.preventDefault();
      onClose();
    }
  }
  document.addEventListener('keydown', onKeydown);

  function refreshFromStore() {
    if (!current_id) {
      return;
    }
    if (issueStores && typeof issueStores.snapshotFor === 'function') {
      const snap = issueStores.snapshotFor('detail:' + current_id) || [];
      const found = snap.find((it) => it && it.id === current_id);
      current = found || snap[0] || current;
    }
    doRender();
  }

  /**
   * @param {string} text
   */
  function copyText(text) {
    void copyToClipboard(text).then((ok) => {
      if (ok) {
        showToast('복사됨', 'success', 1200);
      } else {
        showToast('복사 실패', 'error', 1600);
      }
    });
  }

  /**
   * @param {Event} ev
   */
  function onCopyId(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (current_id) {
      copyText(current_id);
    }
  }

  /**
   * @param {Event} ev
   * @param {string} path
   */
  function onCopyPath(ev, path) {
    ev.preventDefault();
    ev.stopPropagation();
    copyText(path);
  }

  /**
   * @param {Event} ev
   * @param {string} path
   */
  function onOpenDoc(ev, path) {
    ev.preventDefault();
    ev.stopPropagation();
    void md_viewer.open(path);
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onExecChange(key, value) {
    exec_local[key] = value;
    doRender();
    if (!transport || !current_id) {
      return;
    }
    void Promise.resolve(
      transport('update-exec-settings', { id: current_id, key, value })
    ).catch(() => {
      showToast('실행 설정 변경 실패', 'error');
    });
  }

  /**
   * Send an issue mutation and reconcile local state from the reply. A
   * successful reply is the fresh `bd show` issue object (has an `id`); the
   * production transport swallows rejections into `[]`, so anything that is not
   * an issue object is treated as failure. Returns whether it succeeded.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} fail_message
   * @returns {Promise<boolean>}
   */
  async function sendMutation(type, payload, fail_message) {
    if (!transport || !current_id) {
      return false;
    }
    try {
      const res = await Promise.resolve(transport(type, payload));
      // `bd show --json` emits an object OR a single-item array depending on
      // the CLI version; the server passes it through unnormalized. An empty
      // array (the transport's swallowed-error value) stays a failure.
      const issue = Array.isArray(res) ? res[0] : res;
      if (issue && typeof issue === 'object' && /** @type {any} */ (issue).id) {
        current = issue;
        return true;
      }
      showToast(fail_message, 'error');
      return false;
    } catch {
      showToast(fail_message, 'error');
      return false;
    }
  }

  /**
   * @param {string} selector
   */
  function focusEdit(selector) {
    setTimeout(() => {
      try {
        const el = /** @type {HTMLElement | null} */ (
          mount_element.querySelector(selector)
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
    title_draft = (current && current.title) || '';
    doRender();
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
    doRender();
  }

  function saveTitle() {
    const value = title_draft;
    void sendMutation(
      'edit-text',
      { id: current_id, field: 'title', value },
      '제목 저장 실패'
    ).then((ok) => {
      if (ok) {
        editing_title = false;
        title_draft = '';
      }
      doRender();
    });
  }

  function startEditDesc() {
    editing_desc = true;
    desc_draft = (current && current.description) || '';
    doRender();
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
    doRender();
  }

  function saveDesc() {
    const value = desc_draft;
    void sendMutation(
      'edit-text',
      { id: current_id, field: 'description', value },
      '설명 저장 실패'
    ).then((ok) => {
      if (ok) {
        editing_desc = false;
        desc_draft = '';
      }
      doRender();
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
    void sendMutation(
      'update-status',
      { id: current_id, status },
      '상태 변경 실패'
    ).then(() => doRender());
  }

  /**
   * @param {Event} ev
   */
  function onPriorityChange(ev) {
    const priority = Number(/** @type {HTMLSelectElement} */ (ev.target).value);
    void sendMutation(
      'update-priority',
      { id: current_id, priority },
      '우선순위 변경 실패'
    ).then(() => doRender());
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
    void sendMutation(
      'label-add',
      { id: current_id, label },
      '라벨 추가 실패'
    ).then((ok) => {
      if (ok) {
        label_draft = '';
      }
      doRender();
    });
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onLabelKeydown(ev) {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      label_draft = '';
      doRender();
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
    void sendMutation(
      'label-remove',
      { id: current_id, label },
      '라벨 제거 실패'
    ).then(() => doRender());
  }

  const artifact_handlers = { onCopyPath, onOpenDoc };
  const exec_handlers = { onChange: onExecChange };

  /**
   * Normalize a bd dependency edge to a target id.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeId(edge) {
    if (typeof edge === 'string') {
      return edge;
    }
    if (edge && typeof edge === 'object') {
      return String(
        edge.id || edge.to || edge.issue_id || edge.depends_on || ''
      );
    }
    return '';
  }

  /**
   * Icon for a bd edge type. An unknown type renders the bare id rather than a
   * misleading glyph.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeIcon(edge) {
    const type =
      edge && typeof edge === 'object'
        ? String(edge.dependency_type || edge.type || '')
        : '';
    switch (type) {
      case 'blocks':
        return '⛓';
      case 'discovered-from':
        return '↩';
      case 'parent-child':
        return '⌸';
      default:
        return '';
    }
  }

  /**
   * @param {any} data
   */
  function depsTemplate(data) {
    const raw = Array.isArray(data.dependencies) ? data.dependencies : [];
    const edges = raw
      .map((/** @type {any} */ edge) => ({
        id: edgeId(edge),
        icon: edgeIcon(edge)
      }))
      .filter((/** @type {{ id: string }} */ e) => e.id.length > 0);
    return html`
      <div class="detail-section-label">의존성</div>
      ${edges.length === 0
        ? html`<div class="detail-empty">의존성 없음</div>`
        : html`<div class="detail-deps">
            ${edges.map((/** @type {{ id: string, icon: string }} */ edge) =>
              onNavigate
                ? html`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${() => onNavigate(edge.id)}
                  >
                    ${edge.icon ? `${edge.icon} ` : ''}${edge.id}
                  </button>`
                : html`<span class="detail-dep"
                    >${edge.icon ? `${edge.icon} ` : ''}${edge.id}</span
                  >`
            )}
          </div>`}
    `;
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
    // Same explicit/derived distinction as the board chip (§6): an inferred
    // route renders dimmed with a `?` suffix instead of posing as a pin.
    const route_derived = wf.route_source === 'derived';
    const route_label = wf.route || md.route || '—';
    return html`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${route_derived ? ' detail-kv__v--derived' : ''}"
          title=${route_derived ? 'route 추론값 (metadata 미핀)' : 'route'}
          >${route_derived && wf.route
            ? `${route_label} ? (추론)`
            : route_label}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${md.spec_review || '없음'}${specStale ? ' · stale' : ''}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${md.impl_review || '없음'}${implStale ? ' · stale' : ''}</span
        >
      </div>
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
   * (the key is removed; route falls back to derivation, policies to their
   * defaults at resolution time).
   */
  /** @type {Record<'route'|'merge_policy'|'drift_policy', string[]>} */
  const WORKFLOW_META_OPTIONS = {
    route: ['spec_backed', 'full_plan'],
    merge_policy: ['auto_merge', 'pr_stop'],
    drift_policy: ['auto_rereview', 'halt']
  };

  /**
   * @param {'route'|'merge_policy'|'drift_policy'} key
   * @param {Event} ev
   */
  async function onWorkflowMetaChange(key, ev) {
    const value = /** @type {HTMLSelectElement} */ (ev.target).value;
    if (
      key === 'route' &&
      current &&
      current.metadata &&
      current.metadata.route === 'full_plan' &&
      value !== 'full_plan'
    ) {
      // 저장된 plan 포기·마커 정리는 세션 계약 소유 — UI는 metadata만 바꾼다.
      const proceed = window.confirm(
        `full_plan → ${value || '(미설정)'} 전환: 저장된 plan 승인은 포기되며, plan 파일·마커 정리는 세션 계약이 수행합니다. 계속할까요?`
      );
      if (!proceed) {
        doRender();
        return;
      }
    }
    await sendMutation(
      'update-workflow-meta',
      { id: current_id, key, value },
      '워크플로우 메타 변경 실패'
    );
    doRender();
  }

  /**
   * Editable workflow metadata selects (route / merge_policy / drift_policy).
   *
   * @param {any} data
   */
  function workflowMetaTemplate(data) {
    const md = data.metadata || {};
    /**
     * @param {'route'|'merge_policy'|'drift_policy'} key
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
    return html`
      ${row('route', '(미설정 · 추론)')}
      ${row('merge_policy', '(기본 auto_merge)')}
      ${row('drift_policy', '(기본 auto_rereview)')}
    `;
  }

  /**
   * @param {string} title
   */
  function titleTemplate(title) {
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
            ${description || '(설명 없음)'}
          </div>`}
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

  function template() {
    if (!current_id) {
      return html``;
    }
    const data = current || {};
    const id = String(data.id || current_id);
    const title = data.title || '(제목 없음)';
    const status = data.status || 'open';
    /** @type {number | ''} */
    const priority_val =
      typeof data.priority === 'number'
        ? Math.max(0, Math.min(4, data.priority))
        : '';
    const description = data.description || '';
    const effective = {
      ...data,
      metadata: { ...(data.metadata || {}), ...exec_local }
    };
    return html`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${() => onClose()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${() => onClose()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${onCopyId}
          >
            ${id}
          </button>
          ${titleTemplate(title)} ${propsTemplate(status, priority_val)}
          ${timesTemplate(data)} ${descTemplate(description)}
          ${labelsTemplate(data)} ${depsTemplate(data)}
          ${workflowTemplate(data)} ${workflowMetaTemplate(data)}
          ${artifactsTemplate(data, artifact_handlers)}
          ${execSettingsTemplate(effective, exec_handlers, execDefaults())}
          ${sessionHistoryTemplate(attemptsForBead(), session_handlers)}
        </div>
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
  }

  return {
    /**
     * @param {string} id
     */
    load(id) {
      if (id !== current_id) {
        exec_local = {};
        resetEditors();
      }
      current_id = id;
      current = null;
      refreshFromStore();
    },
    clear() {
      current_id = null;
      current = null;
      exec_local = {};
      resetEditors();
      md_viewer.close();
      transcript_drawer.close();
      render(html``, mount_element);
    },
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      document.removeEventListener('keydown', onKeydown);
      md_viewer.destroy();
      if (mv_mount.parentNode) {
        mv_mount.parentNode.removeChild(mv_mount);
      }
      transcript_drawer.destroy();
      if (sl_mount.parentNode) {
        sl_mount.parentNode.removeChild(sl_mount);
      }
      current_id = null;
      current = null;
      render(html``, mount_element);
    }
  };
}
