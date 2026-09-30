/**
 * The issue detail screen (UI-dbn6 §3.5): a 560px right-hand panel over the
 * lanes on a desktop, a full-screen sheet below 720px (closed by ✕, Esc, the
 * backdrop and the browser back — the overlay is the `?issue=` hash). Top to
 * bottom:
 *
 *   머리 (ID copy · status/route/판정 칩 · `↴ 대기로` · ✕) → 제목 → 라벨
 *   stepper (gates, 산출물, receipts) → 실행 설정 → 의존 → 속성 (status ·
 *   priority · route · labels) → 설명 → 외부 작업 → Worker 이력 → 댓글 →
 *   과업 프롬프트.
 *
 * It reads the `detail:<id>` subscription store (`subscribe-list
 * issue-detail`) plus request-type reads, and NO worker-queue channel of its
 * own: the queue facts (attempts, placement, runner catalog, wait reasons,
 * interactive sessions) come from the `queueStore` view the shell builds over
 * the monitor rows of the connected repo. Issue mutations carry no `root_dir`
 * — the shell connects the issue's repo before opening it — and the worker
 * ops (`worker-queue-place`, `worker-attempt-resume`) name it (§3.2).
 *
 * The sections are their own modules; this one owns the host, the shared
 * state, `↴ 대기로`, the header chips and the store wiring.
 *
 * @import { DepCandidateModel } from '../../model/dep-candidates.js'
 * @import { WaitReason } from '../../protocol.js'
 */
import { html } from 'lit-html';
import { createChipPresetToggle } from '../../model/chip-preset-binding.js';
import {
  candidatePlacement,
  placeLaneLabel,
  placeMenuLanes,
  placementTitle
} from '../../model/placement.js';
import { uiButton } from '../../ui/button.js';
import { createChipPopover } from '../../ui/chip-popover.js';
import { copyButton, copyWithToast } from '../../ui/copy.js';
import { render } from '../../ui/render.js';
import { createTicker } from '../../ui/ticker.js';
import { viewportOf, watchViewport } from '../../ui/viewport.js';
import { showToast } from '../../utils/toast.js';
import { createMdViewer } from '../doc-viewer/index.js';
import { createTranscriptScreen } from '../transcript/index.js';
import { artifactsTemplate } from './artifacts.js';
import { createCommentsSection } from './comments-section.js';
import { createDepsSection } from './deps-section.js';
import { createExecSection } from './exec-section.js';
import { createExternalSection } from './external-section.js';
import { createFieldsSection } from './fields-section.js';
import { createHistorySection } from './history-section.js';
import { placeMenuList } from './place-menu.js';
import { createPromptSection } from './prompt-section.js';
import {
  summaryChipsTemplate,
  summaryGatesTemplate
} from './summary-header.js';

/**
 * @typedef {Object} DetailPanelOptions
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: (client_id: string) => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<unknown>} [transport]
 * @property {{ get: () => any, set?: (queue: any) => void, subscribe?: (fn: () => void) => () => void }} [queueStore] - The
 * connected repo's queue view (attempts, placement, catalog, wait reasons).
 * @property {{ get: () => Array<Record<string, any>>|null, subscribe?: (fn: () => void) => () => void }} [pipelineStore] - Current monitor projection, including external waits.
 * @property {{ get: () => any, set: (state: any) => void, subscribe?: (fn: () => void) => () => void }} [execPresetStore]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [modelVisibilityStore] - Server-global
 * model visibility; its disabled list filters the editor's model choices.
 * @property {{ get: (id: string) => { lines: unknown[] } | null, subscribe: (fn: () => void) => () => void }} [sessionLogStore]
 * @property {ReturnType<typeof createTranscriptScreen>} [transcript] - The
 * shell's shared transcript screen; the detail makes its own when absent.
 * @property {() => string | null | undefined} [getWorkspacePath]
 * @property {{ open: (doc_path: string, open_options?: any) => Promise<void>|void, close: () => void, destroy: () => void }} [mdViewer] - Shared
 * document viewer owned by the shell. When given, the detail neither mounts
 * nor destroys one of its own.
 * @property {(id: string, root_dir?: string) => void} [onNavigate] - Navigate to
 * a dependency id. `root_dir` names the repo that owns it when the candidate
 * model knows one; the shell switches workspace first (UI-lx45 §4.1).
 * @property {() => DepCandidateModel | null} [depCandidates] - The 막는 이슈
 * 후보 모집단 (UI-lx45 §3.2). `null` means no snapshot yet, which the section
 * says out loud rather than guessing.
 * @property {(change: { type: string, a: string, b: string }) => void} [onDepChanged] - Called
 * exactly once per SAVED edge, including a failed readback (UI-lx45 §3.3).
 * @property {(fn: () => void) => () => void} [subscribeCandidates] - Subscribe to
 * the candidate snapshot; the detail re-renders on every callback.
 * @property {() => void} [onOpenExecPresets] - Open the repo settings on its
 * worker-preset tab (spec §3.7 `상세의 프리셋 바꾸기`).
 * @property {import('../../ui/viewport.js').MatchMedia} [matchMedia]
 * @property {() => void} onClose - Invoked to request the overlay be closed.
 */

/**
 * What every section reads and calls. The getters read the detail's live
 * state, so a section never holds a stale copy of the issue.
 *
 * @typedef {Object} DetailContext
 * @property {DetailPanelOptions} options
 * @property {HTMLElement} mount
 * @property {((type: string, payload: unknown) => Promise<unknown>)|undefined} transport
 * @property {() => string|null} id
 * @property {() => any} data
 * @property {(issue: any) => void} setData
 * @property {() => void} render
 * @property {() => any} queue - The connected repo's queue view, or null.
 * @property {(queue: any) => void} adoptQueue - Adopt a mutation reply's queue.
 * @property {() => Record<string, any>|undefined} pipelineRow - The monitor row of the connected repo.
 * @property {() => WaitReason[]} waitReasons - Server judgements of the connected repo.
 * @property {() => string} workspace - The connected repo's root_dir, or ''.
 * @property {() => any} runnerCatalog
 * @property {() => any[]} workerAttempts
 * @property {() => ReturnType<typeof createTranscriptScreen>} transcript
 * @property {(text: string) => void} copyText
 * @property {(type: string, payload: Record<string, unknown>, fail_message: string) => Promise<boolean | { ok: false, saved: true }>} sendMutation
 */

/**
 * @param {HTMLElement} mount_element
 * @param {DetailPanelOptions} options
 * @returns {{ load: (id: string) => void, clear: () => void, destroy: () => void }}
 */
export function createDetailPanel(mount_element, options) {
  const { issueStores, onClose, transport } = options;
  const queueStore = options.queueStore;
  const pipelineStore = options.pipelineStore;

  /** @type {string | null} */
  let current_id = null;
  /** @type {any} */
  let current = null;
  /**
   * 레인 선택 메뉴가 열려 있는가 (UI-6g3t §6.2). 상세는 한 번에 bead 하나만
   * 보여 주므로 불린 하나면 된다.
   */
  let place_menu_open = false;
  let viewport = viewportOf(options.matchMedia);

  // The document viewer lives in its own body-appended overlay mount, unless
  // the shell already owns a shared one (spec §4).
  const injected_md_viewer = options.mdViewer || null;
  /** @type {HTMLElement | null} */
  let mv_mount = null;
  if (!injected_md_viewer) {
    mv_mount = document.createElement('div');
    mv_mount.className = 'md-viewer-root';
    document.body.appendChild(mv_mount);
  }
  const md_viewer =
    injected_md_viewer ||
    createMdViewer(/** @type {HTMLElement} */ (mv_mount), {
      getWorkspacePath: options.getWorkspacePath || (() => '')
    });

  // A session row opens the shell's transcript screen, which sits above the
  // detail; a detail mounted on its own gets a screen of its own.
  const own_transcript = options.transcript
    ? null
    : createTranscriptScreen({
        send: (type, payload) =>
          transport
            ? Promise.resolve(transport(type, payload))
            : Promise.resolve(null),
        sessionLogStore: options.sessionLogStore
      });
  const transcript = /** @type {ReturnType<typeof createTranscriptScreen>} */ (
    options.transcript || own_transcript
  );

  /** @returns {string} */
  function workspace() {
    return (options.getWorkspacePath && options.getWorkspacePath()) || '';
  }

  /** @returns {Record<string, any>|undefined} */
  function pipelineRow() {
    const root_dir = workspace();
    return (pipelineStore?.get() || []).find(
      (/** @type {Record<string, any>} */ entry) => entry.root_dir === root_dir
    );
  }

  /**
   * Read only server judgments belonging to the connected workspace.
   *
   * @returns {WaitReason[]}
   */
  function waitReasons() {
    const root_dir = workspace();
    const reasons =
      queueStore?.get()?.wait_reasons ?? pipelineRow()?.wait_reasons ?? [];
    return reasons.filter(
      (/** @type {WaitReason} */ reason) => reason.subject.root_dir === root_dir
    );
  }

  /**
   * @param {string} text
   */
  function copyText(text) {
    void copyWithToast(text);
  }

  /**
   * The 실패 토스트 문구. 서버가 실은 사유(`bd_error`의 stderr 등)가 있으면
   * 그대로 뒤에 붙인다 — 후보 밖 ID를 직접 걸 때 왜 거절됐는지는 bd만 알고
   * 있고, 그 문장을 버리면 사용자에게 남는 정보가 없다 (UI-k9e9).
   *
   * @param {string} fail_message
   * @param {unknown} err
   * @returns {string}
   */
  function failToastText(fail_message, err) {
    const detail =
      err &&
      typeof err === 'object' &&
      typeof (/** @type {any} */ (err).message) === 'string'
        ? /** @type {any} */ (err).message.trim()
        : '';
    return detail.length > 0 ? `${fail_message} — ${detail}` : fail_message;
  }

  /**
   * Send an issue mutation and reconcile local state from the reply. A
   * successful reply is the fresh `bd show` issue object (has an `id`); a
   * swallowed rejection is `[]`, so anything that is not an issue object is a
   * failure. `bd_readback_failed` is the one failure that is not a failure to
   * write: it comes back as `{ ok: false, saved: true }` so a caller that must
   * react to the saved edge can (UI-lx45 §6).
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} fail_message
   * @returns {Promise<boolean | { ok: false, saved: true }>}
   */
  async function sendMutation(type, payload, fail_message) {
    if (!transport || !current_id) {
      return false;
    }
    try {
      const res = await Promise.resolve(transport(type, payload));
      // `bd show --json` emits an object OR a single-item array depending on
      // the CLI version; the server passes it through unnormalized.
      const issue = Array.isArray(res) ? res[0] : res;
      if (issue && typeof issue === 'object' && /** @type {any} */ (issue).id) {
        current = issue;
        return true;
      }
      showToast(fail_message, 'error');
      return false;
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        /** @type {any} */ (err).code === 'bd_readback_failed'
      ) {
        showToast('저장됐으나 확인 실패 — 곧 갱신됩니다', 'error');
        return { ok: false, saved: true };
      }
      showToast(failToastText(fail_message, err), 'error');
      return false;
    }
  }

  /** @type {DetailContext} */
  const ctx = {
    options,
    mount: mount_element,
    transport,
    id: () => current_id,
    data: () => current,
    setData: (issue) => {
      current = issue;
    },
    render: () => doRender(),
    queue: () => (queueStore ? queueStore.get() : null),
    adoptQueue: (queue) => {
      if (queueStore?.set) {
        queueStore.set(queue);
      }
    },
    pipelineRow,
    waitReasons,
    workspace,
    runnerCatalog: () => exec.runnerCatalog(),
    workerAttempts: () => history.workerAttempts(),
    transcript: () => transcript,
    copyText,
    sendMutation
  };

  const comments = createCommentsSection(ctx);
  const prompt = createPromptSection(ctx);
  const history = createHistorySection(ctx);
  const exec = createExecSection(ctx);
  const deps = createDepsSection(ctx);
  const fields = createFieldsSection(ctx);
  const external = createExternalSection(ctx);

  function resetSections() {
    comments.reset();
    prompt.reset();
    history.reset();
    exec.reset();
    deps.reset();
    fields.reset();
  }

  /**
   * The preset context this issue's 판정 칩 reads (UI-wg68 §5.1). 상세는 언제나
   * 연결된 워크스페이스의 이슈이므로 카탈로그도 그 하나다.
   *
   * @returns {import('../../model/chip-preset-binding.js').ChipPresetContext|null}
   */
  function chipPresetContext() {
    const state = options.execPresetStore
      ? options.execPresetStore.get()
      : null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      bindings: state.chip_bindings,
      presets: Array.isArray(state.presets) ? state.presets : [],
      revision: state.revision,
      catalogOf: () => exec.runnerCatalog(),
      isBusy: (bead_id, chip) => chip_preset_toggle.isBusy(bead_id, chip)
    };
  }

  /**
   * 상세 헤더의 바인딩된 칩 클릭 (§5.3). 연결된 워크스페이스의 이슈이므로
   * `root_dir`을 싣지 않는다 — 서버가 연결 워크스페이스를 쓴다.
   */
  const chip_preset_toggle = createChipPresetToggle({
    transport: (/** @type {any} */ type, /** @type {any} */ payload) =>
      transport ? transport(type, payload) : Promise.resolve(null),
    store: {
      get: () =>
        options.execPresetStore ? options.execPresetStore.get() : null,
      set: (/** @type {any} */ next) => options.execPresetStore?.set(next)
    },
    onChange: () => doRender(),
    toast: (/** @type {string} */ message, /** @type {any} */ kind) =>
      showToast(message, kind, 2600)
  });

  // --- 대기로 ----------------------------------------------------------------

  /**
   * `worker-queue-place` 하나로 이 이슈를 대기 큐에 넣는다 (UI-6g3t §6.4). 후보
   * 카드와 같은 op·같은 규율이다: 병렬이면 `lane`을 생략해 맨 뒤에 붙이고, 워커
   * 조작이라 연결 저장소를 `root_dir`로 싣는다 (UI-dbn6 §3.2). 응답의 큐를 먼저
   * 채택해야 재시도의 `expected_revision`이 새 값이 되고, 충돌 재시도는 정확히
   * 한 번이다. 입장 거부는 `applied:false`로 온다.
   *
   * @param {string} bead_id
   * @param {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
   */
  async function placeInQueue(bead_id, lane) {
    if (!transport || !bead_id) {
      return;
    }
    const send = transport;
    const root_dir = workspace();
    /** @returns {any} */
    const payload = () => {
      const q = ctx.queue();
      return {
        bead_id,
        ...(lane === 'parallel' ? {} : { lane }),
        ...(root_dir ? { root_dir } : {}),
        expected_revision: q && typeof q.revision === 'number' ? q.revision : 0
      };
    };
    /** @param {any} response */
    const adopt = (response) => {
      if (response?.queue) {
        ctx.adoptQueue(response.queue);
      }
    };
    let res = /** @type {any} */ (
      await Promise.resolve(send('worker-queue-place', payload()))
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await Promise.resolve(send('worker-queue-place', payload()))
      );
      adopt(res);
    }
    doRender();
    if (!res) {
      return;
    }
    if (res.applied === false && typeof res.admission_reason === 'string') {
      showToast(`대기 적재 거부: ${res.admission_reason}`, 'error', 2400);
      return;
    }
    if (res.reason === 'rejected') {
      showToast('대기 적재 거부: rejected', 'error', 2400);
      return;
    }
    if (res.applied === false) {
      return;
    }
    // 자리는 응답이 준 큐가 말한다 — 보낸 레인이 아니라 채택된 스냅샷에서 다시
    // 읽으므로, 서버가 다른 자리에 넣었어도 토스트가 사실을 말한다.
    const location = res.queue
      ? candidatePlacement({ id: bead_id }, res.queue).location
      : null;
    if (location && 'index' in location) {
      showToast(
        `${placeLaneLabel(location.lane)} 대기 #${location.index + 1}에 추가`,
        'success',
        2400
      );
    }
  }

  /**
   * `place_menu_open`을 열거나 곧장 적재한다 (§6.2). 직렬 레인이 있으면 자리를
   * 먼저 고르고, 병렬 하나뿐이면 한 번의 누름이 그대로 맨 뒤 적재다.
   *
   * @param {string} bead_id
   * @param {import('../../model/placement.js').PlaceMenuEntry[]|null} lanes
   */
  function onPlaceClick(bead_id, lanes) {
    if (lanes) {
      place_menu_open = true;
      doRender();
      return;
    }
    void placeInQueue(bead_id, 'parallel');
  }

  /**
   * @param {Event} event
   * @param {string} bead_id
   */
  function onPlaceLaneClick(event, bead_id) {
    const target = /** @type {HTMLElement|null} */ (event.target);
    const row = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-card__place-lane') || null
    );
    const lane = row?.dataset.lane;
    if (!lane || (lane !== 'parallel' && !/^s[1-5]$/.test(lane))) {
      return;
    }
    place_menu_open = false;
    doRender();
    void placeInQueue(
      bead_id,
      /** @type {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane)
    );
  }

  // --- store wiring ------------------------------------------------------------

  /** @type {Array<() => void>} */
  const unsubscribers = [];
  if (issueStores && issueStores.subscribe) {
    // 현재 상세 구독의 변경만 읽는다 (UI-hhn9 §5.1).
    unsubscribers.push(
      issueStores.subscribe((client_id) => {
        if (current_id && client_id === `detail:${current_id}`) {
          refreshFromStore();
        }
      })
    );
  }
  for (const store of [
    queueStore,
    options.execPresetStore,
    options.modelVisibilityStore
  ]) {
    if (store && typeof store.subscribe === 'function') {
      unsubscribers.push(
        store.subscribe(() => {
          if (current_id) {
            doRender();
          }
        })
      );
    }
  }
  if (pipelineStore && typeof pipelineStore.subscribe === 'function') {
    unsubscribers.push(
      pipelineStore.subscribe(() => {
        if (current_id) {
          // A settings write re-pushes the repo's session defaults.
          exec.load(current_id);
          doRender();
        }
      })
    );
  }
  unsubscribers.push(
    watchViewport((next) => {
      if (next.size !== viewport.size) {
        viewport = next;
        if (current_id) {
          doRender();
        }
      }
    }, options.matchMedia)
  );
  /**
   * The aggregated candidate channel (UI-lx45 §3.2): a first snapshot that
   * lands late must still reach the section.
   *
   * @type {null | (() => void)}
   */
  let unsubscribe_candidates = null;
  function releaseCandidates() {
    if (unsubscribe_candidates) {
      unsubscribe_candidates();
      unsubscribe_candidates = null;
    }
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

  /**
   * 헤더 판정 칩의 사유 팝업 (UI-8x90 §5.1). 바깥 클릭·Esc 판정은 카드와 같은
   * 모듈이 소유한다.
   */
  const chip_popover = createChipPopover(() => doRender());
  chip_popover.attach();

  const ticker = createTicker({ root: () => mount_element });

  function refreshFromStore() {
    if (!current_id) {
      return;
    }
    if (issueStores && typeof issueStores.snapshotFor === 'function') {
      const snap = issueStores.snapshotFor('detail:' + current_id) || [];
      const found = snap.find((it) => it && it.id === current_id);
      current = found || snap[0] || current;
    }
    comments.sync();
    history.sync();
    doRender();
  }

  const artifact_handlers = {
    /**
     * @param {Event} ev
     * @param {string} path
     */
    onCopyPath(ev, path) {
      ev.preventDefault();
      ev.stopPropagation();
      copyText(path);
    },
    /**
     * @param {Event} ev
     * @param {string} path
     * @param {'plan_pending'|'spec_draft'|null} missing_state
     */
    onOpenDoc(ev, path, missing_state) {
      ev.preventDefault();
      ev.stopPropagation();
      void md_viewer.open(path, { missing_state });
    }
  };

  // --- template ------------------------------------------------------------------

  /**
   * @param {any} data
   * @param {string} id
   */
  function headTemplate(data, id) {
    const status = data.status || 'open';
    // 대기 배치 (§6.2·§6.3): 큐 뷰가 없으면 그리지 않고, 닫힌 bead에도 그리지
    // 않는다 — 넣을 자리가 없는 처분이다.
    const queue_snapshot = ctx.queue();
    const placement =
      queue_snapshot && status !== 'closed'
        ? candidatePlacement({ ...data, id }, queue_snapshot)
        : null;
    const place_lanes = queue_snapshot ? placeMenuLanes(queue_snapshot) : null;
    const effective = {
      ...data,
      metadata: { ...(data.metadata || {}), ...exec.exec_local }
    };
    return html`<header class="detail-overlay__bar dt-head" data-section="head">
        ${copyButton({
          label: id,
          value: id,
          title: 'ID 복사',
          cls: 'detail-overlay__id dt-head__id'
        })}
        <div class="detail-summary dt-head__chips" data-seam="detail-summary">
          ${summaryChipsTemplate(effective, {
            onChipToggle: (chip_key) =>
              chip_popover.toggle({ bead_id: id, chip_key }),
            isChipOpen: (chip_key) =>
              chip_popover.isOpen({ bead_id: id, chip_key }),
            // 바인딩된 칩은 카드와 같은 op를 부른다 (UI-wg68 §5.3).
            chipPresets: chipPresetContext(),
            onChipPresetToggle: (chip_key) => {
              void chip_preset_toggle.toggle(id, chip_key);
            }
          })}
        </div>
        ${placement
          ? html`<button
              type="button"
              class="ui-btn ui-btn--primary ui-btn--sm detail-overlay__place dt-head__place"
              data-bead-id=${id}
              ?disabled=${!placement.placeable}
              title=${placementTitle(placement)}
              @click=${() => onPlaceClick(id, place_lanes)}
            >
              ↴ 대기로
            </button>`
          : ''}
        <button
          type="button"
          class="detail-overlay__close dt-head__close"
          aria-label="닫기"
          @click=${() => onClose()}
        >
          ✕
        </button>
      </header>
      ${placement && place_menu_open && place_lanes
        ? html`<div
            class="place-menu detail-overlay__place-menu"
            @click=${(/** @type {Event} */ event) =>
              onPlaceLaneClick(event, id)}
          >
            ${placeMenuList(place_lanes, id)}
            <button
              type="button"
              class="ui-btn ui-btn--icon ui-btn--sm worker-card__place-cancel"
              data-bead-id=${id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
              @click=${() => {
                place_menu_open = false;
                doRender();
              }}
            >
              ✕
            </button>
          </div>`
        : ''}`;
  }

  function template() {
    if (!current_id) {
      return html``;
    }
    const data = current || {};
    const id = String(data.id || current_id);
    const title = data.title || '(제목 없음)';
    const total_usage = history.totalUsage();
    const status = data.status || 'open';
    /** @type {number | ''} */
    const priority_val =
      typeof data.priority === 'number'
        ? Math.max(0, Math.min(4, data.priority))
        : '';
    const effective = {
      ...data,
      metadata: { ...(data.metadata || {}), ...exec.exec_local }
    };
    const sheet = viewport.size === 'narrow';
    return html`
      <div
        class="detail-overlay dt-overlay${sheet ? ' dt-overlay--sheet' : ''}"
        role="dialog"
        aria-modal="true"
        aria-label=${`이슈 상세 ${id}`}
      >
        <div class="detail-overlay__backdrop" @click=${() => onClose()}></div>
        <div class="detail-overlay__panel dt-panel">
          ${headTemplate(data, id)}
          <section class="dt-section" data-section="title">
            ${fields.titleTemplate(title, total_usage)}
          </section>
          <section class="dt-section" data-section="stepper">
            ${summaryGatesTemplate(effective)}
            ${artifactsTemplate(data, artifact_handlers)}
            ${fields.workflowTemplate(data)}
          </section>
          <section class="dt-section" data-section="exec">
            ${exec.template(effective)}
            ${options.onOpenExecPresets
              ? html`<div
                  class="dt-exec__more"
                  @click=${(/** @type {Event} */ ev) => {
                    const target = /** @type {HTMLElement|null} */ (ev.target);
                    if (target?.closest?.('[data-op="open-exec-presets"]')) {
                      options.onOpenExecPresets?.();
                    }
                  }}
                >
                  ${uiButton({
                    label: '프리셋 바꾸기',
                    op: 'open-exec-presets',
                    tone: 'ghost',
                    title: '이 저장소의 워커 프리셋 설정 열기'
                  })}
                </div>`
              : ''}
          </section>
          <section class="dt-section" data-section="deps">
            ${deps.template(data)}
          </section>
          <section class="dt-section" data-section="props">
            ${fields.propsTemplate(status, priority_val)}
            ${fields.workflowMetaTemplate(data)} ${fields.labelsTemplate(data)}
            ${fields.timesTemplate(data)}
          </section>
          <section class="dt-section" data-section="desc">
            ${fields.descTemplate(data.description || '')}
            ${fields.notesTemplate(data)}
          </section>
          ${external.template()}
          <section class="dt-section" data-section="history">
            ${history.template(total_usage)}
          </section>
          <section class="dt-section" data-section="comments">
            ${comments.template()}
          </section>
          <section class="dt-section" data-section="prompt">
            ${prompt.template()}
          </section>
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
        place_menu_open = false;
        resetSections();
      }
      current_id = id;
      current = null;
      if (!unsubscribe_candidates && options.subscribeCandidates) {
        unsubscribe_candidates = options.subscribeCandidates(() => {
          if (current_id) {
            doRender();
          }
        });
      }
      refreshFromStore();
      exec.load(id);
      ticker.start();
    },
    clear() {
      current_id = null;
      current = null;
      place_menu_open = false;
      resetSections();
      releaseCandidates();
      ticker.stop();
      md_viewer.close();
      transcript.close();
      render(html``, mount_element);
    },
    destroy() {
      for (const off of unsubscribers.splice(0)) {
        off();
      }
      releaseCandidates();
      ticker.stop();
      document.removeEventListener('keydown', onKeydown);
      chip_popover.detach();
      if (!injected_md_viewer) {
        md_viewer.destroy();
        if (mv_mount && mv_mount.parentNode) {
          mv_mount.parentNode.removeChild(mv_mount);
        }
      }
      own_transcript?.destroy();
      current_id = null;
      current = null;
      resetSections();
      render(html``, mount_element);
    }
  };
}
