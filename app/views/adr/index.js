/**
 * ADR 탭 (UI-8uz7 §7) — 워크스페이스별 ADR 현재표·이력과 인덱스 drift·지침 인용
 * stale·후보 미실체화·교차 인용을 한 화면에 놓는다.
 *
 * 데이터는 `subscribe-adr` 채널의 `adr-snapshot` push 하나뿐이고 이 뷰는 아무것도
 * 쓰지 않는다 — 필터·검색·정렬만 로컬 상태다. 신호의 정의는 dotfiles가 소유하고
 * 여기서는 체커가 낸 kind 어휘를 registry 상수로 복제해 소비한다(ADR 0012):
 * 이름 붙은 카운트는 그 정본 kind만 세고, 미지 kind는 버리지 않고 `기타`로
 * 그린다.
 */
import { html, render } from 'lit-html';
import { debug } from '../../utils/logging.js';

/**
 * `subscribe-adr` / `unsubscribe-adr` payload id. main.js가 이 상수로 채널을
 * 열고 닫는다.
 *
 * @type {string}
 */
export const ADR_SNAPSHOT_KEY = 'adr:snapshot';

/** `adr-cite-check.py`의 정본 kind — 이름 붙은 `인용 stale` 카운트가 세는 것. */
const CITATION_NAMED_KINDS = ['missing', 'retired'];

/** 후보 체커의 `후보 미실체화` 정본 kind. */
const CANDIDATE_UNRESOLVED_KINDS = ['adr_missing', 'supersede_unapplied'];

/** 후보 체커의 `토큰 없음` kind. */
const CANDIDATE_TOKEN_KIND = 'token_missing';

/** 후보 체커의 `이행 전 스펙` kind (관찰 항목이라 접어 둔다). */
const CANDIDATE_PENDING_KIND = 'section_missing';

/** 스펙 행 국소 환경 오류 kind — 저장소 전체의 `env_errors`가 아니다. */
const CANDIDATE_ENV_KIND = 'usage';

/** 이름 붙은 카운트에 들어가지 않는 알려진 kind. */
const CANDIDATE_OTHER_KINDS = ['adr_status'];

/**
 * @typedef {{ kind: string, file: string, line: number|null, adr: number|null, detail: string }} CheckerError
 * @typedef {{ file: string, id: number, title: string, status: string, date: string, summary: string, supersedes: number[], superseded_by: number|null, superseded_by_note: string|null, spec: string|null, bead: string|null }} AdrRecord
 * @typedef {{ root_dir: string, name: string, name_duplicate?: boolean, computing?: boolean, computed_at?: number|null, env_errors?: { index: string|null, citations: string|null, candidates: string|null }, adr_dir_missing?: boolean, current?: AdrRecord[], history?: AdrRecord[], frontmatter_errors?: Array<{ file: string, error: string }>, index_drift?: { ok: boolean, detail: string|null }|null, citations_stale?: CheckerError[], candidates?: Array<{ spec: string, ok: boolean, errors: CheckerError[] }>, cross_citations?: Array<{ file: string, line: number, repo: string, adr: number, target: { root_dir: string, status: string }|null }> }} AdrWorkspaceView
 */

/**
 * @typedef {Object} AdrViewOptions
 * @property {{ get: () => ({ workspaces: AdrWorkspaceView[] }|null), subscribe?: (fn: () => void) => () => void }} [adrStore]
 * @property {(id: string) => void} [gotoIssue]
 * @property {() => (string|undefined)} [getWorkspacePath]
 * @property {(root_dir: string) => Promise<unknown>|unknown} [switchWorkspace]
 * @property {(doc: import('../board/stepper.js').StepperDoc, root_dir?: string) => void} [openDoc]
 */

/** Every candidate kind the dotfiles §7 contract names. */
const CANDIDATE_KNOWN_KINDS = [
  ...CANDIDATE_UNRESOLVED_KINDS,
  CANDIDATE_TOKEN_KIND,
  CANDIDATE_PENDING_KIND,
  CANDIDATE_ENV_KIND,
  ...CANDIDATE_OTHER_KINDS
];

/**
 * Chip text for a checker kind: contract kinds keep their name, anything else
 * is `기타` — the registry is the consumer's copy of the vocabulary (ADR 0012)
 * and an unknown token is drawn, not echoed.
 *
 * @param {string} kind
 * @param {string[]} known
 */
function kindLabel(kind, known) {
  return known.includes(kind) ? kind : '기타';
}

/**
 * `/api/doc`은 `docs/` 아래 마크다운만 서빙한다 — 그 밖의 인용 대상은 링크 없이
 * 문자만 보인다(§7, §12).
 *
 * @param {string|null|undefined} path
 * @returns {boolean}
 */
function isLinkableDoc(path) {
  return typeof path === 'string' && path.startsWith('docs/');
}

/**
 * `HH:MM:SS` — 로케일에 흔들리지 않는 24시간 표기.
 *
 * @param {number} ts
 */
function clockText(ts) {
  return new Date(ts).toTimeString().slice(0, 8);
}

/**
 * Count material for one workspace: 후보 오류를 kind별로 갈라 이름 붙은 카운트와
 * `기타`로 나눈다.
 *
 * @param {AdrWorkspaceView} ws
 */
function countModel(ws) {
  const citations = ws.citations_stale || [];
  const candidates = ws.candidates || [];
  /** @type {CheckerError[]} */
  const candidate_errors = [];
  for (const row of candidates) {
    for (const err of row.errors || []) {
      candidate_errors.push(err);
    }
  }
  const named_citation = citations.filter((e) =>
    CITATION_NAMED_KINDS.includes(e.kind)
  );
  const unresolved = candidate_errors.filter((e) =>
    CANDIDATE_UNRESOLVED_KINDS.includes(e.kind)
  );
  const token_missing = candidate_errors.filter(
    (e) => e.kind === CANDIDATE_TOKEN_KIND
  );
  const pending = candidate_errors.filter(
    (e) => e.kind === CANDIDATE_PENDING_KIND
  );
  const other = [
    ...citations.filter((e) => !CITATION_NAMED_KINDS.includes(e.kind)),
    ...candidate_errors.filter(
      (e) =>
        CANDIDATE_OTHER_KINDS.includes(e.kind) ||
        (!CANDIDATE_UNRESOLVED_KINDS.includes(e.kind) &&
          e.kind !== CANDIDATE_TOKEN_KIND &&
          e.kind !== CANDIDATE_PENDING_KIND &&
          e.kind !== CANDIDATE_ENV_KIND)
    )
  ];
  return {
    current: (ws.current || []).length,
    drift: Boolean(ws.index_drift && ws.index_drift.ok === false),
    citation_stale: named_citation.length,
    unresolved: unresolved.length,
    token_missing: token_missing.length,
    pending: pending.length,
    other: other.length,
    cross: (ws.cross_citations || []).length
  };
}

/**
 * ADR 한 행에 붙는 신호 칩. 번호로만 결합한다 — 표의 행과 신호 절은 같은 ADR
 * 번호를 공유하는 별개의 재료다(§7.1).
 *
 * @param {AdrWorkspaceView} ws
 * @param {AdrRecord} adr
 * @param {AdrWorkspaceView[]} all
 * @returns {Array<{ key: string, text: string }>}
 */
function signalChips(ws, adr, all) {
  /** @type {Array<{ key: string, text: string }>} */
  const chips = [];
  const retired = (ws.citations_stale || []).filter(
    (e) => e.kind === 'retired' && e.adr === adr.id
  );
  if (retired.length > 0) {
    chips.push({ key: 'cite', text: `인용 stale ${retired.length}` });
  }
  let candidate_hits = 0;
  for (const row of ws.candidates || []) {
    for (const err of row.errors || []) {
      if (err.adr === adr.id) {
        candidate_hits += 1;
      }
    }
  }
  if (candidate_hits > 0) {
    chips.push({ key: 'cand', text: `후보 ${candidate_hits}` });
  }
  const fm = (ws.frontmatter_errors || []).filter((e) => e.file === adr.file);
  if (fm.length > 0) {
    chips.push({ key: 'fm', text: 'frontmatter 오류' });
  }
  let cited_by = 0;
  for (const other of all) {
    if (other.root_dir === ws.root_dir) {
      continue;
    }
    for (const cite of other.cross_citations || []) {
      if (cite.adr === adr.id && cite.target?.root_dir === ws.root_dir) {
        cited_by += 1;
      }
    }
  }
  if (cited_by > 0) {
    chips.push({ key: 'cross', text: `피인용 ${cited_by}` });
  }
  return chips;
}

/**
 * Search predicate: 번호·제목·summary·spec·bead의 부분 일치다(§7).
 *
 * @param {AdrRecord} adr
 * @param {string} query - lower-cased needle.
 */
function matchesQuery(adr, query) {
  if (!query) {
    return true;
  }
  const hay = [
    String(adr.id),
    adr.title || '',
    adr.summary || '',
    adr.spec || '',
    adr.bead || ''
  ]
    .join('\n')
    .toLowerCase();
  return hay.includes(query);
}

/**
 * Cross-citation status chip tone: accepted는 성공, 나머지 상태는 경고,
 * `target:null`은 회색 `미확인`(§7.6).
 *
 * @param {{ root_dir: string, status: string }|null} target
 */
function crossChip(target) {
  if (!target) {
    return { tone: 'unknown', text: '미확인' };
  }
  return {
    tone: target.status === 'accepted' ? 'ok' : 'warn',
    text: target.status
  };
}

/**
 * Mount the ADR tab: 툴바 하나와 저장소 섹션들을 `root`에 그리고, 스냅샷 push마다
 * 통째로 다시 그린다.
 *
 * @param {HTMLElement} root
 * @param {AdrViewOptions} [options]
 * @returns {{ destroy: () => void }}
 */
export function createAdrView(root, options = {}) {
  const log = debug('views:adr');
  const adrStore = options.adrStore;
  const gotoIssue = options.gotoIssue;
  const getWorkspacePath = options.getWorkspacePath;
  const switchWorkspace = options.switchWorkspace;
  const openDoc = options.openDoc;

  /** @type {{ repo: string, query: string, stale_first: boolean }} */
  const ui = { repo: '', query: '', stale_first: true };
  /** @type {(() => void) | null} */
  let unsubscribe = null;

  /**
   * @returns {AdrWorkspaceView[]}
   */
  function snapshot() {
    const value = adrStore ? adrStore.get() : null;
    return value && Array.isArray(value.workspaces) ? value.workspaces : [];
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
      @click=${() => openDoc({ path, missing_state: null }, root_dir)}
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
      class="adr-bead"
      @click=${async () => {
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
   * @param {AdrWorkspaceView} ws
   * @param {AdrWorkspaceView[]} all
   */
  function currentTable(ws, all) {
    const query = ui.query.trim().toLowerCase();
    const rows = (ws.current || []).filter((adr) => matchesQuery(adr, query));
    if (rows.length === 0) {
      return html``;
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
      return b.adr.id - a.adr.id;
    });
    return html`
      <div class="adr-tablewrap">
        <table class="adr-table adr-table--current">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
              <th>summary</th>
              <th>spec</th>
              <th>bead</th>
              <th>신호</th>
            </tr>
          </thead>
          <tbody>
            ${decorated.map(
              ({ adr, chips }) => html`
                <tr data-adr=${String(adr.id)}>
                  <td class="adr-num">${adr.id}</td>
                  <td>
                    ${docCell(
                      `docs/adr/${adr.file}`,
                      ws.root_dir,
                      adr.title || adr.file
                    )}
                  </td>
                  <td class="adr-date">${adr.date || ''}</td>
                  <td class="adr-summary">${adr.summary || ''}</td>
                  <td>${adr.spec ? docCell(adr.spec, ws.root_dir) : html``}</td>
                  <td>
                    ${adr.bead ? beadCell(adr.bead, ws.root_dir) : html``}
                  </td>
                  <td class="adr-signals">
                    ${chips.map(
                      (chip) =>
                        html`<span class="adr-chip adr-chip--signal"
                          >${chip.text}</span
                        >`
                    )}
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function historySection(ws) {
    const query = ui.query.trim().toLowerCase();
    const rows = (ws.history || [])
      .filter((adr) => matchesQuery(adr, query))
      .slice()
      .sort((a, b) => b.id - a.id);
    if (rows.length === 0) {
      return html``;
    }
    return html`
      <details class="adr-history">
        <summary>이력 ${rows.length}</summary>
        <div class="adr-tablewrap">
          <table class="adr-table adr-table--history">
            <tbody>
              ${rows.map(
                (adr) => html`
                  <tr data-adr=${String(adr.id)}>
                    <td class="adr-num">${adr.id}</td>
                    <td>${adr.title || adr.file}</td>
                    <td class="adr-status">${adr.status}</td>
                    <td class="adr-superseded">
                      ${adr.superseded_by === null ||
                      adr.superseded_by === undefined
                        ? ''
                        : `→ ${adr.superseded_by}`}
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </details>
    `;
  }

  /**
   * @param {string} text
   */
  function envLine(text) {
    return html`<p class="adr-env">환경 · ${text}</p>`;
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
      return html``;
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
      return html``;
    }
    return html`<section class="adr-sec adr-sec--cite">
      <h3>지침 인용 stale ${rows.length}</h3>
      <ul class="adr-rows">
        ${rows.map(
          (err) => html`
            <li class="adr-row">
              ${err.file
                ? docCell(
                    err.file,
                    ws.root_dir,
                    `${err.file}${err.line === null || err.line === undefined ? '' : `:${err.line}`}`
                  )
                : html``}
              <span class="adr-row__mid"
                >${err.adr === null || err.adr === undefined
                  ? ''
                  : `ADR ${err.adr}`}</span
              >
              <span class="adr-chip adr-chip--kind"
                >${kindLabel(err.kind, CITATION_NAMED_KINDS)}</span
              >
              <span class="adr-row__detail">${err.detail || ''}</span>
            </li>
          `
        )}
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
    const specs = (ws.candidates || []).filter(
      (row) => (row.errors || []).length > 0
    );
    /** @type {Array<{ spec: string, errors: CheckerError[], env: boolean }>} */
    const open_specs = [];
    /** @type {string[]} */
    const pending_specs = [];
    for (const row of specs) {
      const errors = row.errors || [];
      const visible = errors.filter(
        (e) =>
          e.kind !== CANDIDATE_PENDING_KIND && e.kind !== CANDIDATE_ENV_KIND
      );
      const has_env = errors.some((e) => e.kind === CANDIDATE_ENV_KIND);
      if (visible.length === 0 && !has_env) {
        pending_specs.push(row.spec);
        continue;
      }
      open_specs.push({ spec: row.spec, errors: visible, env: has_env });
    }
    if (open_specs.length === 0 && pending_specs.length === 0) {
      return html``;
    }
    return html`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${open_specs.map(
        (row) => html`
          <div class="adr-candspec" data-spec=${row.spec}>
            <div class="adr-candspec__hd">
              ${docCell(row.spec, ws.root_dir)}
              ${row.env
                ? html`<span class="adr-chip adr-chip--env">환경</span>`
                : html``}
            </div>
            <ul class="adr-rows">
              ${row.errors.map(
                (err) => html`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind"
                      >${kindLabel(err.kind, CANDIDATE_KNOWN_KINDS)}</span
                    >
                    <span class="adr-row__mid"
                      >${err.adr === null || err.adr === undefined
                        ? ''
                        : `ADR ${err.adr}`}</span
                    >
                    <span class="adr-row__detail">${err.detail || ''}</span>
                  </li>
                `
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
        : html``}
    </section>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function crossSection(ws) {
    const rows = ws.cross_citations || [];
    if (rows.length === 0) {
      return html``;
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
                >→ ADR ${cite.repo}/${String(cite.adr).padStart(4, '0')}</span
              >
              <span class="adr-chip adr-chip--cross is-${chip.tone}"
                >${chip.text}</span
              >
            </li>
          `;
        })}
      </ul>
    </section>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   */
  function countChips(ws) {
    const counts = countModel(ws);
    /** @type {Array<{ key: string, text: string }>} */
    const chips = [];
    if (counts.current > 0) {
      chips.push({ key: 'current', text: `현재 유효 ${counts.current}` });
    }
    if (counts.drift) {
      chips.push({ key: 'drift', text: '인덱스 drift' });
    }
    if (counts.citation_stale > 0) {
      chips.push({ key: 'cite', text: `인용 stale ${counts.citation_stale}` });
    }
    if (counts.unresolved > 0) {
      chips.push({
        key: 'cand',
        text: `후보 미실체화 ${counts.unresolved}`
      });
    }
    if (counts.token_missing > 0) {
      chips.push({ key: 'token', text: `토큰 없음 ${counts.token_missing}` });
    }
    if (counts.pending > 0) {
      chips.push({ key: 'pending', text: `이행 전 스펙 ${counts.pending}` });
    }
    if (counts.other > 0) {
      chips.push({ key: 'other', text: `기타 ${counts.other}` });
    }
    if (counts.cross > 0) {
      chips.push({ key: 'cross', text: `교차 인용 ${counts.cross}` });
    }
    if (ws.computing) {
      chips.push({ key: 'computing', text: '계산 중' });
    } else if (typeof ws.computed_at === 'number' && ws.computed_at > 0) {
      chips.push({
        key: 'computed',
        text: `갱신 ${clockText(ws.computed_at)}`
      });
    }
    return html`<div class="adr-counts">
      ${chips.map(
        (chip) =>
          html`<span class="adr-chip adr-chip--count adr-count--${chip.key}"
            >${chip.text}</span
          >`
      )}
    </div>`;
  }

  /**
   * @param {AdrWorkspaceView} ws
   * @param {AdrWorkspaceView[]} all
   */
  function workspaceSection(ws, all) {
    const missing = ws.adr_dir_missing === true;
    return html`
      <section class="adr-ws" data-repo=${ws.root_dir}>
        <header class="adr-ws__hd">
          <h2>${ws.name}</h2>
          ${ws.name_duplicate
            ? html`<span class="adr-chip adr-chip--dup">이름 중복</span>`
            : html``}
        </header>
        ${countChips(ws)} ${currentTable(ws, all)} ${historySection(ws)}
        ${missing ? html`` : driftSection(ws)}
        ${missing ? html`` : citationSection(ws)}
        ${missing ? html`` : candidateSection(ws)}
        ${missing ? html`` : crossSection(ws)}
      </section>
    `;
  }

  /**
   * Toolbar: 저장소 필터·검색·정렬 토글(§7).
   *
   * @param {AdrWorkspaceView[]} workspaces
   */
  function toolbar(workspaces) {
    return html`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${ui.repo === '' ? 'true' : 'false'}
            @click=${() => {
              ui.repo = '';
              doRender();
            }}
          >
            전체
          </button>
          ${workspaces.map(
            (ws) => html`
              <button
                type="button"
                class="adr-filter"
                data-repo=${ws.root_dir}
                aria-pressed=${ui.repo === ws.root_dir ? 'true' : 'false'}
                @click=${() => {
                  ui.repo = ws.root_dir;
                  doRender();
                }}
              >
                ${ws.name}
              </button>
            `
          )}
        </div>
        <input
          type="search"
          class="adr-search"
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
          class="adr-sort"
          aria-pressed=${ui.stale_first ? 'true' : 'false'}
          @click=${() => {
            ui.stale_first = !ui.stale_first;
            doRender();
          }}
        >
          stale 우선
        </button>
      </div>
    `;
  }

  function template() {
    const workspaces = snapshot();
    const shown = ui.repo
      ? workspaces.filter((ws) => ws.root_dir === ui.repo)
      : workspaces;
    return html`
      ${toolbar(workspaces)}
      <div class="adr-body">
        ${shown.map((ws) => workspaceSection(ws, workspaces))}
      </div>
    `;
  }

  function doRender() {
    render(template(), root);
  }

  doRender();
  if (adrStore && typeof adrStore.subscribe === 'function') {
    unsubscribe = adrStore.subscribe(() => doRender());
  }

  return {
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      render(html``, root);
    }
  };
}
