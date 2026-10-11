/**
 * The `⏸ 보류로 전환` and `↺ 되살리기` confirm dialog (UI-0d9i §3.2, §3.5). One
 * module, two modes, shared by the Worker tab and the Monitor tab — the caller
 * hands over a transport already bound to the target repository (`root_dir` on
 * the Monitor tab), so both surfaces send the same ops.
 *
 * The dialog asks the server for its material when it opens
 * (`worker-bead-defer-preview` / `worker-bead-revive-preview`) and never
 * re-judges the contract itself: a preview refusal or a failed request shows
 * its reason and turns the confirm button off. The confirm click sends the
 * write op once; nothing retries on its own — a write whose readback failed
 * is reported as `적용 여부 확인 불가`, never as a no-change failure.
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { errorText } from '../../utils/error-text.js';

/** The two fixed guidance lines of the defer mode (§3.2). */
export const DEFER_GUIDANCE = Object.freeze([
  '다른 저장소의 후행은 확인하지 않았습니다.',
  'PR·브랜치·worktree는 그대로 두고, 「보류 N」에서 되살릴 수 있습니다.'
]);

/** The defer mode's line when no same-repository dependent waits (§3.2). */
export const NO_DEPENDENTS_TEXT = '이 이슈를 기다리는 같은 저장소 이슈 없음';

/** The revive mode's line when a shelf record will be lifted (§3.5). */
export const SHELF_LIFT_TEXT = '보관도 해제되어 PR 대기로 돌아갑니다';

/** The outcome a write whose readback failed is reported as (§3.3, §5.9). */
export const UNKNOWN_OUTCOME_TEXT = '적용 여부 확인 불가';

/**
 * Sentences for the refusal and failure reasons the four ops answer with
 * (§4). An unknown reason falls back to its code.
 *
 * @type {Readonly<Record<string, string>>}
 */
const REASON_TEXT = Object.freeze({
  not_shelved: '보관이 풀려 있어 보류로 전환하지 않았습니다',
  merge_active: '머지 큐가 이 PR을 처리 중입니다',
  merge_observed: '머지가 관측됐거나 정리 중인 PR입니다',
  already_deferred: '이미 보류된 이슈입니다',
  not_resolved_with_pr: 'PR이 있는 resolved 이슈만 보류로 전환합니다',
  not_deferred: '보류된 이슈가 아닙니다',
  pr_lookup_failed: 'PR 상태를 읽지 못해 아무것도 쓰지 않았습니다',
  bd_read_failed: 'bd를 읽지 못해 아무것도 쓰지 않았습니다',
  bd_write_failed: 'bd 쓰기가 실패해 아무것도 바뀌지 않았습니다',
  readback_failed: UNKNOWN_OUTCOME_TEXT,
  readback_mismatch: UNKNOWN_OUTCOME_TEXT
});

/**
 * @typedef {Object} DeferDialogMaterial
 * @property {'defer'|'revive'} mode
 * @property {string} bead_id
 */

/**
 * @typedef {Object} DeferDialogDeps
 * @property {(type: string, payload: Record<string, unknown>) => Promise<any>} transport -
 * Sends one op to the target repository (the caller adds `root_dir`).
 * @property {(text: string, type: 'success'|'info'|'error') => void} [toast]
 * @property {Document} [document]
 */

/**
 * One reason code as the sentence the dialog and its toasts show, with the
 * code kept for the reader who has to look it up.
 *
 * @param {unknown} reason
 * @param {unknown} [message]
 * @returns {string}
 */
export function deferReasonText(reason, message) {
  const code = typeof reason === 'string' && reason.length > 0 ? reason : '';
  const sentence = code && REASON_TEXT[code] ? REASON_TEXT[code] : '';
  const detail =
    typeof message === 'string' && message.length > 0 ? message : '';
  if (sentence) {
    return detail
      ? `${sentence} (${code}: ${detail})`
      : `${sentence} (${code})`;
  }
  if (code) {
    return detail ? `${code}: ${detail}` : code;
  }
  return detail || '요청이 실패했습니다';
}

/**
 * The revive target as the dialog spells it (§3.5).
 *
 * @param {unknown} target
 * @param {unknown} pr_state
 * @returns {string}
 */
export function reviveTargetText(target, pr_state) {
  if (target === 'resolved') {
    return pr_state === 'MERGED'
      ? 'resolved — PR 머지됨'
      : 'resolved — PR 열림';
  }
  return 'open';
}

/**
 * What a partial defer's failed edges mean, by the step each failed at
 * (§3.3): an edge never removed still blocks, an edge removed without its
 * confirmed `deferred-unblocked:` notes line is cut but unrecorded, and an
 * edge whose removal readback failed is unconfirmed. Classes with no edge are
 * left out; an unknown step reads as still blocking (the safe default).
 *
 * @param {unknown} failed_edges
 * @returns {string[]}
 */
export function deferEdgeFailureTexts(failed_edges) {
  /** @type {{ blocking: string[], unrecorded: string[], unconfirmed: string[] }} */
  const groups = { blocking: [], unrecorded: [], unconfirmed: [] };
  for (const edge of Array.isArray(failed_edges) ? failed_edges : []) {
    const id = edge && typeof edge.id === 'string' ? edge.id : '';
    if (!id) {
      continue;
    }
    if (edge.step === 'note' || edge.step === 'note_readback') {
      groups.unrecorded.push(id);
    } else if (edge.step === 'readback') {
      groups.unconfirmed.push(id);
    } else {
      groups.blocking.push(id);
    }
  }
  /** @type {string[]} */
  const out = [];
  if (groups.blocking.length > 0) {
    out.push(
      `간선 처리 실패: ${groups.blocking.join(', ')} (그 간선은 계속 막습니다)`
    );
  }
  if (groups.unrecorded.length > 0) {
    out.push(
      `간선은 끊었지만 notes 기록 줄이 없거나 확인되지 않음: ${groups.unrecorded.join(', ')} (되살리기 목록에 오르지 않을 수 있습니다)`
    );
  }
  if (groups.unconfirmed.length > 0) {
    out.push(
      `간선 제거를 확인하지 못함: ${groups.unconfirmed.join(', ')} (bd에서 끊겼는지 확인하세요)`
    );
  }
  return out;
}

/**
 * The toast one write reply becomes. Null when the dialog stays open and says
 * it there instead.
 *
 * @param {any} res
 * @param {DeferDialogMaterial} material
 * @returns {{ text: string, type: 'success'|'info'|'error' }|null}
 */
export function deferResultToast(res, material) {
  if (!res || typeof res !== 'object') {
    return null;
  }
  const id = material.bead_id;
  if (res.outcome === 'unknown') {
    return {
      text: `${id} ${UNKNOWN_OUTCOME_TEXT} — 다시 누르기 전에 상태를 확인하세요 (${deferReasonText(res.reason, res.message)})`,
      type: 'error'
    };
  }
  if (res.outcome !== 'applied' && res.outcome !== 'partial') {
    return null;
  }
  const failed = Array.isArray(res.failed_edges)
    ? res.failed_edges
        .map((/** @type {any} */ edge) => edge && edge.id)
        .filter(Boolean)
    : [];
  if (material.mode === 'defer') {
    return failed.length > 0
      ? {
          text: `${id} 보류 — ${deferEdgeFailureTexts(res.failed_edges).join(' · ')}`,
          type: 'error'
        }
      : {
          text: `${id} 보류 — 「보류 N」에서 되살릴 수 있습니다`,
          type: 'success'
        };
  }
  const target = reviveTargetText(res.target, res.pr_state);
  const shelf =
    res.shelf_cleared === false
      ? ' · 보관 해제는 실패했습니다 — [보관 해제]를 누르세요'
      : '';
  const skipped = Array.isArray(res.skipped_edges)
    ? res.skipped_edges.filter(
        (/** @type {unknown} */ edge) => typeof edge === 'string' && edge
      )
    : [];
  const skipped_text =
    skipped.length > 0
      ? ` · 닫힌 후행이라 복원하지 않음: ${skipped.join(', ')}`
      : '';
  return failed.length > 0
    ? {
        text: `${id} 되살림(${target}) — 간선 복원 실패: ${failed.join(', ')}${skipped_text}${shelf}`,
        type: 'error'
      }
    : {
        text: `${id} 되살림(${target})${skipped_text}${shelf}`,
        type: shelf ? 'error' : 'success'
      };
}

/**
 * The edge rows of one preview: the open dependents (defer) or the open cut
 * dependents (revive), each `{ id, title }`.
 *
 * @param {any} preview
 * @param {'defer'|'revive'} mode
 * @returns {Array<{ id: string, title: string }>}
 */
function edgeRowsOf(preview, mode) {
  const raw = preview
    ? mode === 'defer'
      ? preview.dependents
      : preview.restorable
    : null;
  /** @type {Array<{ id: string, title: string }>} */
  const out = [];
  for (const entry of Array.isArray(raw) ? raw : []) {
    if (entry && typeof entry.id === 'string' && entry.id.length > 0) {
      out.push({
        id: entry.id,
        title: typeof entry.title === 'string' ? entry.title : ''
      });
    }
  }
  return out;
}

/**
 * Open the dialog in one mode, ask for its preview, and run the write on
 * confirm. Resolves once the dialog is gone.
 *
 * @param {DeferDialogMaterial} material
 * @param {DeferDialogDeps} deps
 * @returns {Promise<{ sent: boolean, ok: boolean, res?: any }>}
 */
export function openDeferDialog(material, deps) {
  const doc = deps.document || document;
  const defer_mode = material.mode === 'defer';
  /** @type {any} */
  let preview = null;
  let loading = true;
  let error = '';
  /** Whether a confirm may still be sent: off after a preview or terminal failure. */
  let confirmable = false;
  let busy = false;
  let sent = false;
  let reason_text = '';
  /** @type {Set<string>} */
  const unchecked = new Set();
  const dialog = doc.createElement('dialog');
  dialog.className = 'op-dialog defer-dialog';
  dialog.setAttribute('aria-label', defer_mode ? '보류로 전환' : '되살리기');
  doc.body.append(dialog);

  return new Promise((resolve) => {
    /**
     * @param {boolean} ok
     * @param {any} [res]
     */
    const finish = (ok, res) => {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      dialog.remove();
      resolve({ sent, ok, ...(res === undefined ? {} : { res }) });
    };

    const loadPreview = async () => {
      try {
        const res = await deps.transport(
          defer_mode
            ? 'worker-bead-defer-preview'
            : 'worker-bead-revive-preview',
          { bead_id: material.bead_id }
        );
        if (!res || res.ok !== true) {
          error = deferReasonText(res?.reason, res?.message);
          deps.toast?.(`${material.bead_id}: ${error}`, 'error');
        } else {
          preview = res;
          confirmable = true;
        }
      } catch (err) {
        error = errorText(err) || '미리보기 요청이 실패했습니다';
      }
      loading = false;
      draw();
    };

    const onConfirm = async () => {
      if (busy || !confirmable) {
        return;
      }
      const reason = reason_text.trim();
      if (defer_mode && reason.length === 0) {
        return;
      }
      const chosen = edgeRowsOf(preview, material.mode)
        .map((row) => row.id)
        .filter((id) => !unchecked.has(id));
      busy = true;
      error = '';
      draw();
      sent = true;
      /** @type {any} */
      let res;
      try {
        res = await deps.transport(
          defer_mode ? 'worker-bead-defer' : 'worker-bead-revive',
          defer_mode
            ? { bead_id: material.bead_id, reason, remove_edges: chosen }
            : { bead_id: material.bead_id, restore_edges: chosen }
        );
      } catch (err) {
        // A server refusal object (`{ code, message }`) is answered before any
        // write. Anything else — a lost connection — may or may not have
        // reached the server, so it is reported as unknown and never retried.
        const refused =
          !(err instanceof Error) &&
          typeof (/** @type {any} */ (err)?.code) === 'string';
        error = refused
          ? errorText(err)
          : `${UNKNOWN_OUTCOME_TEXT} — ${errorText(err) || '응답이 없습니다'}`;
        confirmable = refused;
        busy = false;
        draw();
        return;
      }
      const toast = deferResultToast(res, material);
      if (res && (res.outcome === 'applied' || res.outcome === 'partial')) {
        if (toast) {
          deps.toast?.(toast.text, toast.type);
        }
        finish(true, res);
        return;
      }
      if (res && res.outcome === 'unknown') {
        if (toast) {
          deps.toast?.(toast.text, toast.type);
        }
        error = `${UNKNOWN_OUTCOME_TEXT} — ${deferReasonText(res.reason, res.message)}`;
        confirmable = false;
        busy = false;
        draw();
        return;
      }
      // `failed` changed nothing and may be tried again; a refusal means the
      // state moved under the dialog, so its material is stale.
      error = deferReasonText(res?.reason, res?.message);
      deps.toast?.(`${material.bead_id}: ${error}`, 'error');
      confirmable = res?.outcome === 'failed';
      busy = false;
      draw();
    };

    function draw() {
      const rows = edgeRowsOf(preview, material.mode);
      const ready =
        confirmable &&
        !busy &&
        !loading &&
        (!defer_mode || reason_text.trim().length > 0);
      const title = defer_mode
        ? `${material.bead_id} 보류로 전환 — 더 이상 고려하지 않음`
        : `${material.bead_id} 되살리기`;
      const confirm_label = defer_mode ? '보류로 전환' : '되살리기';
      render(
        html`<h2>${title}</h2>
          ${loading
            ? html`<p class="defer-dialog__loading">불러오는 중…</p>`
            : ''}
          ${defer_mode
            ? html`<label class="defer-dialog__reason">
                사유
                <textarea
                  class="defer-dialog__reason-input"
                  required
                  .value=${live(reason_text)}
                  ?disabled=${busy}
                  @input=${(/** @type {Event} */ ev) => {
                    reason_text = /** @type {HTMLTextAreaElement} */ (ev.target)
                      .value;
                    draw();
                  }}
                ></textarea>
              </label>`
            : ''}
          ${!defer_mode && preview
            ? html`<p class="defer-dialog__target">
                되살릴 상태:
                <strong
                  >${reviveTargetText(preview.target, preview.pr_state)}</strong
                >
              </p>`
            : ''}
          ${preview && rows.length > 0
            ? html`<ul class="defer-dialog__edges">
                ${rows.map(
                  (row) =>
                    html`<li>
                      <label class="defer-dialog__edge">
                        <input
                          type="checkbox"
                          data-edge-id=${row.id}
                          .checked=${live(!unchecked.has(row.id))}
                          ?disabled=${busy}
                          @change=${(/** @type {Event} */ ev) => {
                            const on = /** @type {HTMLInputElement} */ (
                              ev.target
                            ).checked;
                            if (on) {
                              unchecked.delete(row.id);
                            } else {
                              unchecked.add(row.id);
                            }
                            draw();
                          }}
                        />
                        ${defer_mode ? '끊기' : '복원'}
                        <span class="defer-dialog__edge-id">${row.id}</span>
                        ${row.title
                          ? html`<span class="defer-dialog__edge-title"
                              >${row.title}</span
                            >`
                          : ''}
                      </label>
                    </li>`
                )}
              </ul>`
            : defer_mode && preview
              ? html`<p class="defer-dialog__none">${NO_DEPENDENTS_TEXT}</p>`
              : ''}
          ${!defer_mode && preview && preview.shelved === true
            ? html`<p class="defer-dialog__note">${SHELF_LIFT_TEXT}</p>`
            : ''}
          ${defer_mode
            ? html`<ul class="defer-dialog__guide">
                ${DEFER_GUIDANCE.map((line) => html`<li>${line}</li>`)}
              </ul>`
            : ''}
          ${error
            ? html`<p class="defer-dialog__error" role="alert">${error}</p>`
            : ''}
          <div class="op-dialog__actions defer-dialog__actions">
            <button
              type="button"
              class="op-btn defer-dialog__cancel"
              ?disabled=${busy}
              @click=${() => finish(false)}
            >
              취소
            </button>
            <button
              type="button"
              class="op-btn op-btn--primary defer-dialog__confirm"
              ?disabled=${!ready}
              title=${defer_mode && confirmable && !reason_text.trim()
                ? '사유를 적어야 보류로 전환할 수 있습니다'
                : ''}
              @click=${onConfirm}
            >
              ${confirm_label}
            </button>
          </div>`,
        dialog
      );
    }

    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      if (!busy) {
        finish(false);
      }
    });
    draw();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    void loadPreview();
  });
}
