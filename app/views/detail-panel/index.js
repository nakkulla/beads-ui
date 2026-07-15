import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { artifactsTemplate } from './artifacts.js';
import { execSettingsTemplate } from './exec-settings.js';
import { createMdViewer } from './md-viewer.js';
import { sessionHistoryTemplate } from './session-history.js';

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
        model: a.model || null
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
            status: a.status || undefined
          }
        : {}
    });
  }

  const session_handlers = { onOpen: openTranscript };

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
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        void navigator.clipboard
          .writeText(String(text))
          .then(() => showToast('복사됨', 'success', 1200))
          .catch(() => {});
      }
    } catch {
      // ignore copy errors
    }
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
   * @param {any} data
   */
  function depsTemplate(data) {
    const raw = Array.isArray(data.dependencies) ? data.dependencies : [];
    const ids = raw
      .map(edgeId)
      .filter((/** @type {string} */ s) => s.length > 0);
    return html`
      <div class="detail-section-label">의존성</div>
      ${ids.length === 0
        ? html`<div class="detail-empty">의존성 없음</div>`
        : html`<div class="detail-deps">
            ${ids.map((/** @type {string} */ id) =>
              onNavigate
                ? html`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${() => onNavigate(id)}
                  >
                    ${id}
                  </button>`
                : html`<span class="detail-dep">${id}</span>`
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
    return html`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span class="detail-kv__v">${wf.route || md.route || '—'}</span>
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

  function template() {
    if (!current_id) {
      return html``;
    }
    const data = current || {};
    const id = String(data.id || current_id);
    const title = data.title || '(제목 없음)';
    const status = data.status || 'open';
    const priority =
      typeof data.priority === 'number'
        ? `P${Math.max(0, Math.min(4, data.priority))}`
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
          <h2 class="detail-overlay__title">${title}</h2>
          <div class="detail-overlay__meta">
            <span class="ctl-chip">${status}</span>
            ${priority ? html`<span class="ctl-chip">${priority}</span>` : ''}
          </div>
          <div class="detail-overlay__section-label">설명</div>
          <div class="detail-overlay__desc">
            ${description || '(설명 없음)'}
          </div>
          ${depsTemplate(data)} ${workflowTemplate(data)}
          ${artifactsTemplate(data, artifact_handlers)}
          ${execSettingsTemplate(effective, exec_handlers)}
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
      }
      current_id = id;
      current = null;
      refreshFromStore();
    },
    clear() {
      current_id = null;
      current = null;
      exec_local = {};
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
