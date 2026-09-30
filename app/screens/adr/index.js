/**
 * The ADR screen (UI-8uz7 §7, UI-dbn6 §3.8): per repository one head line —
 * name · `현재 n · 이력 n` · the two checker badges (색인 · 인용) — over the
 * current decisions, one line each (ID · 제목 · 요약 · 날짜; the row opens the
 * document viewer), the history folded under `이력 n건 보기` and the checker
 * sections folded under `점검`. A badge opens its checker-error popup
 * (`CheckerError` rows as the checkers wrote them; the candidate signals and
 * the cross citations show only there and in `점검`).
 *
 * The data is the `subscribe-adr` channel's `adr-snapshot` push alone (the
 * channel is open only while this screen shows); this screen writes nothing —
 * filter, search, the `stale 우선` order and the open popup are local state.
 * The signal reading is `model/adr-signals.js`.
 *
 * @import { AdrRecord, AdrWorkspaceView, CheckerError } from '../../model/adr-signals.js'
 */
import { html } from 'lit-html';
import {
  CANDIDATE_KNOWN_KINDS,
  CITATION_NAMED_KINDS,
  candidateSpecs,
  citationBadge,
  compareAdrDesc,
  countChips,
  countModel,
  crossChip,
  formatCitedId,
  indexBadge,
  isLinkableDoc,
  kindLabel,
  matchesQuery,
  signalChips
} from '../../model/adr-signals.js';
import { popoverTemplate, watchOutside } from '../../ui/popover.js';
import { render } from '../../ui/render.js';
import { debug } from '../../utils/logging.js';

/**
 * @typedef {Object} AdrViewOptions
 * @property {{ get: () => ({ workspaces: AdrWorkspaceView[] }|null), subscribe?: (fn: () => void) => () => void }} [adrStore]
 * @property {(id: string) => void} [gotoIssue]
 * @property {() => (string|undefined)} [getWorkspacePath]
 * @property {(fn: () => void) => () => void} [subscribeWorkspace] - notifies
 * on app-state changes so the default filter can follow a workspace switch
 * without a new ADR snapshot (the server pushes `adr-snapshot` only on change)
 * @property {(root_dir: string) => Promise<unknown>|unknown} [switchWorkspace]
 * @property {(doc: { path: string, missing_state: null }, root_dir?: string) => void} [openDoc]
 */

/**
 * `HH:MM:SS` — 로케일에 흔들리지 않는 24시간 표기.
 *
 * @param {number} ts
 * @returns {string}
 */
function clockText(ts) {
  return new Date(ts).toTimeString().slice(0, 8);
}

/**
 * `file:line` of a checker error, or the file alone.
 *
 * @param {{ file?: string, line?: number|null }} err
 * @returns {string}
 */
function fileLine(err) {
  if (!err.file) {
    return '';
  }
  return err.line === null || err.line === undefined
    ? err.file
    : `${err.file}:${err.line}`;
}

/**
 * Mount the ADR screen into `root`; it redraws on every snapshot push.
 *
 * @param {HTMLElement} root
 * @param {AdrViewOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function createAdrView(root, options = {}) {
  const log = debug('screens:adr');
  const { adrStore, gotoIssue, getWorkspacePath } = options;
  const { subscribeWorkspace, switchWorkspace, openDoc } = options;

  // 저장소 필터는 현재 워크스페이스를 기본으로 열고, 사용자가 필터를 누르기
  // 전까지는 워크스페이스 전환을 따라간다(UI-a9ky). `repo_pinned`는 그 클릭
  // 여부다 — '전체'를 누른 것도 pinned 이다.
  /** @type {{ repo: string, repo_pinned: boolean, query: string, stale_first: boolean, popup: { root_dir: string, signal: 'index'|'cite' }|null }} */
  const ui = {
    repo: currentWorkspaceRepo(),
    repo_pinned: false,
    query: '',
    stale_first: true,
    popup: null
  };
  /** @type {(() => void) | null} */
  let unsubscribe = null;
  /** @type {(() => void) | null} */
  let unsubscribe_workspace = null;

  /**
   * The current workspace root, or '' (전체) when none is known.
   *
   * @returns {string}
   */
  function currentWorkspaceRepo() {
    const current = getWorkspacePath ? getWorkspacePath() : undefined;
    return typeof current === 'string' ? current : '';
  }

  /**
   * @returns {AdrWorkspaceView[]}
   */
  function snapshot() {
    const value = adrStore ? adrStore.get() : null;
    return value && Array.isArray(value.workspaces) ? value.workspaces : [];
  }

  /**
   * @param {string} path
   * @param {string} root_dir
   */
  function open(path, root_dir) {
    if (openDoc && isLinkableDoc(path)) {
      openDoc({ path, missing_state: null }, root_dir);
    }
  }

  /**
   * Document cell: `docs/` 아래면 뷰어를 여는 버튼, 그 밖이면 맨 문자다.
   *
   * @param {string} path
   * @param {string} root_dir
   * @param {string} [label]
   */
  function docCell(path, root_dir, label) {
    const text = label || path;
    if (!isLinkableDoc(path) || !openDoc) {
      return html`<span class="adr-doc adr-doc--plain">${text}</span>`;
    }
    return html`<button
      type="button"
      class="adr-doc adr-doc--link"
      title=${path}
      @click=${(/** @type {Event} */ ev) => {
        ev.stopPropagation();
        open(path, root_dir);
      }}
    >
      ${text}
    </button>`;
  }

  /**
   * Bead cell: 다른 저장소의 행이면 워크스페이스를 먼저 바꾸고 연다(§7.1).
   *
   * @param {string} bead_id
   * @param {string} root_dir
   */
  function beadCell(bead_id, root_dir) {
    return html`<button
      type="button"
      class="ui-chip adr-bead"
      title="Bead로 이동"
      @click=${async (/** @type {Event} */ ev) => {
        ev.stopPropagation();
        const current = getWorkspacePath ? getWorkspacePath() : undefined;
        if (switchWorkspace && root_dir && root_dir !== current) {
          try {
            await switchWorkspace(root_dir);
          } catch (err) {
            log('switch workspace failed: %o', err);
            return;
          }
        }
        if (gotoIssue) {
          gotoIssue(bead_id);
        }
      }}
    >
      ${bead_id}
    </button>`;
  }

  /**
   * One current decision: ID · 제목(+신호) · 요약 · 날짜, with the spec and
   * the Bead when the record names them. A click anywhere on the row opens
   * the decision document; the inner controls keep their own action.
   *
   * @param {AdrWorkspaceView} ws
   * @param {AdrRecord} adr
   * @param {Array<{ key: string, text: string }>} chips
   */
  function currentItem(ws, adr, chips) {
    const path = `docs/adr/${adr.file}`;
    return html`<li
      class="adr-item${chips.length > 0 ? ' has-signal' : ''}"
      data-adr=${String(adr.id)}
      @click=${() => open(path, ws.root_dir)}
    >
      <span class="adr-num">${adr.id}</span>
      <div class="adr-item__main">
        <div class="adr-title__top">
          ${docCell(path, ws.root_dir, adr.title || adr.file)}
          ${chips.length > 0
            ? html`<span class="adr-signals">
                ${chips.map(
                  (chip) =>
                    html`<span class="ui-chip adr-chip adr-chip--signal"
                      >${chip.text}</span
                    >`
                )}
              </span>`
            : ''}
        </div>
        ${adr.summary
          ? html`<span class="adr-title__summary" title=${adr.summary}
              >${adr.summary}</span
            >`
          : ''}
      </div>
      <div class="adr-item__side">
        <span class="adr-date">${adr.date || ''}</span>
        ${adr.spec
          ? html`<span class="adr-spec"
              >${docCell(
                adr.spec,
                ws.root_dir,
                adr.spec.split('/').pop() || adr.spec
              )}</span
            >`
          : ''}
        ${adr.bead ? beadCell(adr.bead, ws.root_dir) : ''}
      </div>
    </li>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   * @param {AdrWorkspaceView[]} all
   */
  function currentList(ws, all) {
    const query = ui.query.trim().toLowerCase();
    const rows = (ws.current || []).filter((adr) => matchesQuery(adr, query));
    if (rows.length === 0) {
      return '';
    }
    const decorated = rows.map((adr) => ({
      adr,
      chips: signalChips(ws, adr, all)
    }));
    decorated.sort((a, b) => {
      if (ui.stale_first) {
        const a_stale = a.chips.length > 0 ? 1 : 0;
        const b_stale = b.chips.length > 0 ? 1 : 0;
        if (a_stale !== b_stale) {
          return b_stale - a_stale;
        }
      }
      return compareAdrDesc(a.adr, b.adr);
    });
    return html`<ul class="adr-list adr-list--current">
      ${decorated.map(({ adr, chips }) => currentItem(ws, adr, chips))}
    </ul>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function historySection(ws) {
    const query = ui.query.trim().toLowerCase();
    const rows = (ws.history || [])
      .filter((adr) => matchesQuery(adr, query))
      .slice()
      .sort(compareAdrDesc);
    if (rows.length === 0) {
      return '';
    }
    /** @type {Map<string, AdrRecord>} */
    const by_id = new Map();
    for (const adr of [...(ws.current || []), ...(ws.history || [])]) {
      by_id.set(String(adr.id), adr);
    }
    return html`<details class="adr-history">
      <summary>이력 ${rows.length}건 보기</summary>
      <ul class="adr-list adr-list--history">
        ${rows.map((adr) => {
          const fm = (ws.frontmatter_errors || []).filter(
            (e) => e.file === adr.file
          );
          const has_target =
            adr.superseded_by !== null && adr.superseded_by !== undefined;
          const target = has_target
            ? by_id.get(String(adr.superseded_by)) || null
            : null;
          return html`<li class="adr-item" data-adr=${String(adr.id)}>
            <span class="adr-num">${adr.id}</span>
            <div class="adr-item__main">
              <div class="adr-title__top">
                ${docCell(
                  `docs/adr/${adr.file}`,
                  ws.root_dir,
                  adr.title || adr.file
                )}
                ${fm.length > 0
                  ? html`<span class="adr-signals"
                      ><span class="ui-chip adr-chip adr-chip--signal"
                        >frontmatter 오류</span
                      ></span
                    >`
                  : ''}
              </div>
            </div>
            <div class="adr-item__side">
              <span class="adr-status">${adr.status}</span>
              <span class="adr-superseded"
                >${!has_target
                  ? ''
                  : target
                    ? html`→
                      ${docCell(
                        `docs/adr/${target.file}`,
                        ws.root_dir,
                        String(adr.superseded_by)
                      )}`
                    : `→ ${adr.superseded_by}`}</span
              >
            </div>
          </li>`;
        })}
      </ul>
    </details>`;
  }

  /**
   * @param {string} text
   */
  function envLine(text) {
    return html`<p class="adr-env">환경 · ${text}</p>`;
  }

  /**
   * One checker-error line of the 점검 sections.
   *
   * @param {AdrWorkspaceView} ws
   * @param {CheckerError} err
   * @param {string[]} known
   * @param {boolean} [with_file]
   */
  function errorRow(ws, err, known, with_file = true) {
    return html`<li class="adr-row">
      ${with_file && err.file
        ? docCell(err.file, ws.root_dir, fileLine(err))
        : ''}
      ${!with_file
        ? html`<span class="ui-chip adr-chip adr-chip--kind"
            >${kindLabel(err.kind, known)}</span
          >`
        : ''}
      <span class="adr-row__mid"
        >${err.adr === null || err.adr === undefined
          ? ''
          : `ADR ${err.adr}`}</span
      >
      ${with_file
        ? html`<span class="ui-chip adr-chip adr-chip--kind"
            >${kindLabel(err.kind, known)}</span
          >`
        : ''}
      <span class="adr-row__detail">${err.detail || ''}</span>
    </li>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function driftSection(ws) {
    const env = ws.env_errors?.index;
    if (env) {
      return html`<section class="adr-sec adr-sec--drift">
        ${envLine(env)}
      </section>`;
    }
    const drift = ws.index_drift;
    if (!drift || drift.ok !== false) {
      return '';
    }
    return html`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${drift.detail || '인덱스가 ADR과 어긋난다'}</p>
    </section>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function citationSection(ws) {
    const env = ws.env_errors?.citations;
    if (env) {
      return html`<section class="adr-sec adr-sec--cite">
        ${envLine(env)}
      </section>`;
    }
    const rows = ws.citations_stale || [];
    if (rows.length === 0) {
      return '';
    }
    return html`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${rows.length}</h3>
      <ul class="adr-rows">
        ${rows.map((err) => errorRow(ws, err, CITATION_NAMED_KINDS))}
      </ul>
    </section>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function candidateSection(ws) {
    const env = ws.env_errors?.candidates;
    if (env) {
      return html`<section class="adr-sec adr-sec--cand">
        ${envLine(env)}
      </section>`;
    }
    const { open: open_specs, pending: pending_specs } = candidateSpecs(ws);
    if (open_specs.length === 0 && pending_specs.length === 0) {
      return '';
    }
    return html`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${open_specs.map(
        (row) => html`
          <div class="adr-candspec" data-spec=${row.spec}>
            <div class="adr-candspec__hd">
              ${docCell(row.spec, ws.root_dir)}
              ${row.env
                ? html`<span class="ui-chip adr-chip adr-chip--env">환경</span>`
                : ''}
            </div>
            <ul class="adr-rows">
              ${row.errors.map((err) =>
                errorRow(ws, err, CANDIDATE_KNOWN_KINDS, false)
              )}
            </ul>
          </div>
        `
      )}
      ${pending_specs.length > 0
        ? html`<details class="adr-pending">
            <summary>이행 전 스펙 ${pending_specs.length}</summary>
            <ul class="adr-rows">
              ${pending_specs.map(
                (spec) =>
                  html`<li class="adr-row">${docCell(spec, ws.root_dir)}</li>`
              )}
            </ul>
          </details>`
        : ''}
    </section>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function crossSection(ws) {
    const rows = ws.cross_citations || [];
    if (rows.length === 0) {
      return '';
    }
    return html`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${rows.length}</h3>
      <ul class="adr-rows">
        ${rows.map((cite) => {
          const chip = crossChip(cite.target);
          return html`
            <li class="adr-row">
              ${docCell(cite.file, ws.root_dir, `${cite.file}:${cite.line}`)}
              <span class="adr-row__mid"
                >→ ADR ${cite.repo}/${formatCitedId(cite.adr)}</span
              >
              <span
                class="ui-chip adr-chip adr-chip--cross is-${chip.tone}"
                data-tone=${chip.tone}
                >${chip.text}</span
              >
            </li>
          `;
        })}
      </ul>
    </section>`;
  }

  /**
   * Fold the checker signal sections (drift·citation·candidate·cross) into a
   * closed 점검 details: 데이터와 계산은 각 절이 그대로 소유하고, 여기서는
   * 표시 순서만 결정 목록·이력 뒤로 내린다(UI-a9ky).
   *
   * @param {AdrWorkspaceView} ws
   */
  function inspectSection(ws) {
    return html`<details class="adr-inspect">
      <summary>점검</summary>
      ${driftSection(ws)} ${citationSection(ws)} ${candidateSection(ws)}
      ${crossSection(ws)}
    </details>`;
  }

  /**
   * One popup line: a checker error as the checker wrote it.
   *
   * @param {unknown} where
   * @param {string} mid
   * @param {unknown} tag
   * @param {string} detail
   */
  function popupLine(where, mid, tag, detail) {
    return html`<li class="adr-err">
      ${where ? html`<span class="adr-err__where">${where}</span>` : ''}
      ${mid ? html`<span class="adr-err__mid">${mid}</span>` : ''} ${tag}
      ${detail ? html`<span class="adr-err__detail">${detail}</span>` : ''}
    </li>`;
  }

  /**
   * @param {string} text
   * @param {string} [tone]
   */
  function kindTag(text, tone = '') {
    return html`<span
      class="ui-chip adr-chip adr-chip--kind"
      data-tone=${tone || 'kind'}
      >${text}</span
    >`;
  }

  /**
   * The 색인 popup: the index checker's environment error or drift detail,
   * then every frontmatter error.
   *
   * @param {AdrWorkspaceView} ws
   */
  function indexPopupBody(ws) {
    /** @type {unknown[]} */
    const lines = [];
    if (ws.env_errors?.index) {
      lines.push(popupLine('', '', kindTag('환경'), ws.env_errors.index));
    } else if (ws.index_drift && ws.index_drift.ok === false) {
      lines.push(
        popupLine(
          '',
          '',
          '',
          ws.index_drift.detail || '인덱스가 ADR과 어긋난다'
        )
      );
    }
    for (const err of ws.frontmatter_errors || []) {
      lines.push(popupLine(err.file, '', '', err.error));
    }
    return lines.length > 0
      ? html`<ul class="adr-errs">
          ${lines}
        </ul>`
      : html`<p class="adr-pop__empty">색인 오류가 없습니다.</p>`;
  }

  /**
   * The 인용 popup: the count breakdown, then every citation error, every
   * candidate error (with its spec) and every cross citation.
   *
   * @param {AdrWorkspaceView} ws
   */
  function citationPopupBody(ws) {
    /** @type {unknown[]} */
    const lines = [];
    for (const env of [ws.env_errors?.citations, ws.env_errors?.candidates]) {
      if (env) {
        lines.push(popupLine('', '', kindTag('환경'), env));
      }
    }
    if (!ws.env_errors?.citations) {
      for (const err of ws.citations_stale || []) {
        lines.push(
          popupLine(
            fileLine(err),
            err.adr === null || err.adr === undefined ? '' : `ADR ${err.adr}`,
            kindTag(kindLabel(err.kind, CITATION_NAMED_KINDS)),
            err.detail || ''
          )
        );
      }
    }
    if (!ws.env_errors?.candidates) {
      for (const row of ws.candidates || []) {
        for (const err of row.errors || []) {
          lines.push(
            popupLine(
              row.spec,
              err.adr === null || err.adr === undefined ? '' : `ADR ${err.adr}`,
              kindTag(kindLabel(err.kind, CANDIDATE_KNOWN_KINDS)),
              err.detail || ''
            )
          );
        }
      }
    }
    for (const cite of ws.cross_citations || []) {
      const chip = crossChip(cite.target);
      lines.push(
        popupLine(
          `${cite.file}:${cite.line}`,
          `→ ADR ${cite.repo}/${formatCitedId(cite.adr)}`,
          kindTag(chip.text, chip.tone),
          ''
        )
      );
    }
    const chips = countChips(ws);
    return html`<div class="adr-counts">
        ${chips.map(
          (chip) =>
            html`<span
              class="ui-chip adr-chip adr-chip--count adr-count--${chip.key}"
              >${chip.text}</span
            >`
        )}
      </div>
      ${lines.length > 0
        ? html`<ul class="adr-errs">
            ${lines}
          </ul>`
        : html`<p class="adr-pop__empty">인용 오류가 없습니다.</p>`}`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   * @param {'index'|'cite'} signal
   */
  function popupTemplate(ws, signal) {
    const title = signal === 'index' ? '색인 점검' : '인용 점검';
    return html`<div class="adr-pop-anchor">
      ${popoverTemplate({
        label: `${ws.name} ${title}`,
        cls: 'adr-pop',
        body: html`<header class="adr-pop__hd">
            <b>${title}</b><span class="adr-pop__repo">${ws.name}</span>
            <button
              type="button"
              class="ui-btn ui-btn--icon ui-btn--sm adr-pop__close"
              aria-label="닫기"
              @click=${() => {
                ui.popup = null;
                doRender();
              }}
            >
              ✕
            </button>
          </header>
          ${signal === 'index' ? indexPopupBody(ws) : citationPopupBody(ws)}`
      })}
    </div>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   * @param {'index'|'cite'} signal
   */
  function badgeTemplate(ws, signal) {
    const badge = signal === 'index' ? indexBadge(ws) : citationBadge(ws);
    const open_now =
      ui.popup !== null &&
      ui.popup.root_dir === ws.root_dir &&
      ui.popup.signal === signal;
    return html`<button
      type="button"
      class="ui-chip adr-badge is-${badge.tone}"
      data-signal=${signal}
      data-tone=${badge.tone}
      aria-expanded=${open_now ? 'true' : 'false'}
      aria-haspopup="dialog"
      @click=${() => {
        ui.popup = open_now ? null : { root_dir: ws.root_dir, signal };
        doRender();
      }}
    >
      ${badge.text}
    </button>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   * @param {AdrWorkspaceView[]} all
   */
  function workspaceSection(ws, all) {
    const missing = ws.adr_dir_missing === true;
    const counts = countModel(ws);
    const popup =
      !missing && ui.popup && ui.popup.root_dir === ws.root_dir
        ? ui.popup.signal
        : null;
    return html`<section class="adr-ws" data-repo=${ws.root_dir}>
      <header class="adr-ws__hd">
        <h2>${ws.name}</h2>
        ${ws.name_duplicate
          ? html`<span class="ui-chip adr-chip adr-chip--dup">이름 중복</span>`
          : ''}
        <span class="adr-ws__counts"
          >현재 ${counts.current} · 이력 ${counts.history}</span
        >
        ${ws.computing
          ? html`<span class="adr-ws__state">계산 중</span>`
          : typeof ws.computed_at === 'number' && ws.computed_at > 0
            ? html`<span class="adr-ws__state"
                >갱신 ${clockText(ws.computed_at)}</span
              >`
            : ''}
        ${missing
          ? html`<span class="adr-ws__state">docs/adr 없음</span>`
          : html`<span class="adr-badges"
              >${badgeTemplate(ws, 'index')}${badgeTemplate(ws, 'cite')}</span
            >`}
        ${popup ? popupTemplate(ws, popup) : ''}
      </header>
      ${currentList(ws, all)} ${historySection(ws)}
      ${missing ? '' : inspectSection(ws)}
    </section>`;
  }

  /**
   * Toolbar: 저장소 필터·검색·`stale 우선`(§7).
   *
   * @param {AdrWorkspaceView[]} workspaces
   */
  function toolbar(workspaces) {
    /**
     * @param {string} repo
     */
    const pick = (repo) => {
      ui.repo = repo;
      ui.repo_pinned = true;
      doRender();
    };
    return html`<div class="adr-toolbar">
      <div class="ui-seg adr-filters" role="group" aria-label="저장소 필터">
        <button
          type="button"
          class="adr-filter"
          aria-pressed=${ui.repo === '' ? 'true' : 'false'}
          @click=${() => pick('')}
        >
          전체
        </button>
        ${workspaces.map(
          (ws) =>
            html`<button
              type="button"
              class="adr-filter"
              data-repo=${ws.root_dir}
              aria-pressed=${ui.repo === ws.root_dir ? 'true' : 'false'}
              @click=${() => pick(ws.root_dir)}
            >
              ${ws.name}
            </button>`
        )}
      </div>
      <input
        type="search"
        class="ui-input adr-search"
        placeholder="번호·제목·summary·spec·bead"
        aria-label="ADR 검색"
        .value=${ui.query}
        @input=${(/** @type {Event} */ ev) => {
          ui.query = /** @type {HTMLInputElement} */ (ev.target).value;
          doRender();
        }}
      />
      <button
        type="button"
        class="ui-toggle adr-sort${ui.stale_first ? ' is-on' : ''}"
        aria-pressed=${ui.stale_first ? 'true' : 'false'}
        title="신호가 있는 결정을 앞에"
        @click=${() => {
          ui.stale_first = !ui.stale_first;
          doRender();
        }}
      >
        <span class="ui-toggle__track" aria-hidden="true"></span>stale 우선
      </button>
    </div>`;
  }

  function template() {
    const workspaces = snapshot();
    if (!ui.repo_pinned) {
      ui.repo = currentWorkspaceRepo();
    }
    // 스냅샷에 없는 워크스페이스(아직 계산 전)는 빈 화면 대신 전체를 보인다.
    const known = workspaces.some((ws) => ws.root_dir === ui.repo);
    const shown =
      ui.repo && known
        ? workspaces.filter((ws) => ws.root_dir === ui.repo)
        : workspaces;
    return html`<div class="adr-screen">
      ${toolbar(workspaces)}
      <div class="adr-body">
        ${shown.length === 0
          ? html`<p class="adr-empty">ADR 스냅샷을 기다리는 중…</p>`
          : shown.map((ws) => workspaceSection(ws, workspaces))}
      </div>
    </div>`;
  }

  function doRender() {
    render(template(), root);
  }

  doRender();
  const detach_outside = watchOutside(
    document,
    '.adr-pop-anchor, .adr-badge',
    () => ui.popup !== null,
    () => {
      ui.popup = null;
      doRender();
    }
  );
  if (adrStore && typeof adrStore.subscribe === 'function') {
    unsubscribe = adrStore.subscribe(() => doRender());
  }
  if (typeof subscribeWorkspace === 'function') {
    // 앱 상태는 선택·필터마다 바뀌므로 워크스페이스 경로가 실제로 달라졌을 때만
    // 다시 그린다. pinned 필터는 template()이 그대로 지킨다.
    let seen_repo = currentWorkspaceRepo();
    unsubscribe_workspace = subscribeWorkspace(() => {
      const next = currentWorkspaceRepo();
      if (next === seen_repo) {
        return;
      }
      seen_repo = next;
      doRender();
    });
  }

  return {
    destroy() {
      detach_outside();
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (unsubscribe_workspace) {
        unsubscribe_workspace();
        unsubscribe_workspace = null;
      }
      render(html``, root);
    }
  };
}
