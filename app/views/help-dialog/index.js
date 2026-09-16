/**
 * 도움말 범례 다이얼로그 (UI-8gem §11). 카드·칩이 쓰는 어휘는 한 곳
 * (`wait-vocabulary.js`)에만 있고, 이 다이얼로그는 그 표를 읽어 그린다 —
 * 표가 바뀌면 범례도 같이 바뀌므로 문구를 여기에 복사하지 않는다.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../worker/wait-vocabulary.js').WaitKindRow} WaitKindRow
 */
import { html, render } from 'lit-html';
import {
  RELATION_CHIPS,
  SUMMARY_CHIPS,
  WAIT_KINDS,
  WAIT_VERDICTS,
  waitBadgeText
} from '../worker/wait-vocabulary.js';

/** 제목 줄에 쓰는 이 다이얼로그의 이름. `aria-label`도 같은 문자열이다. */
const DIALOG_TITLE = '도움말 · 칩과 배지의 뜻';

/** anchor 강조가 남아 있는 시간(ms). */
const HIGHLIGHT_MS = 2000;

/** 절 제목 — 스펙 §11의 네 절 순서 그대로. */
export const HELP_SECTIONS = Object.freeze([
  '판정 글리프',
  '대기 상태 배지',
  '게이트 칩',
  '관계 칩과 요약 칩'
]);

/** 판정 글리프 절이 예시로 쓰는 표본 행 (`prerequisite`). */
const SAMPLE_KIND_ID = 'prerequisite';

/**
 * `WaitKindRow` 하나의 배지 예시 — 판정 없는 형태(`<글리프> <라벨>`)다.
 *
 * @param {WaitKindRow} row
 * @returns {string}
 */
function exampleBadgeText(row) {
  return waitBadgeText(row, null);
}

/**
 * `WaitKindRow` 한 줄을 네 열로 그린다: 배지 예시 · 언제 뜨나 · 풀리는 조건 ·
 * 조작. 재료가 없는 조작 열은 `—`로 비운다.
 *
 * @param {WaitKindRow} row
 * @param {'badge'|'gate'} shape - `badge`는 카드 배지 마크업, `gate`는 큐 칩 마크업.
 * @returns {TemplateResult}
 */
function kindRowTemplate(row, shape) {
  const example =
    shape === 'gate'
      ? html`<span class="worker-dep worker-dep--gate"
          >${exampleBadgeText(row)}</span
        >`
      : html`<span class="worker-mini__badge">${exampleBadgeText(row)}</span>`;
  return html`<tr class="help-dialog__row" id=${`help-${row.id}`}>
    <td class="help-dialog__example">${example}</td>
    <td>${row.when}</td>
    <td>${row.release}</td>
    <td>${row.action || '—'}</td>
  </tr>`;
}

/**
 * `thead` 한 줄 — 네 열 이름은 §11이 정한 순서다.
 *
 * @returns {TemplateResult}
 */
function kindHeadTemplate() {
  return html`<thead>
    <tr>
      <th scope="col">배지 예시</th>
      <th scope="col">언제 뜨나</th>
      <th scope="col">풀리는 조건</th>
      <th scope="col">조작</th>
    </tr>
  </thead>`;
}

/**
 * `section` 껍데기 하나 — `title`은 `HELP_SECTIONS`의 한 항목이다.
 *
 * @param {string} title
 * @param {TemplateResult} body
 * @returns {TemplateResult}
 */
function sectionTemplate(title, body) {
  return html`<section class="help-dialog__section" aria-label=${title}>
    <h2>${title}</h2>
    ${body}
  </section>`;
}

/**
 * `WAIT_VERDICTS` 세 줄 — 표본 행에 판정을 얹어 실제 배지 마크업으로 그린다.
 *
 * @returns {TemplateResult}
 */
function verdictSection() {
  const sample = WAIT_KINDS.find((row) => row.id === SAMPLE_KIND_ID) || null;
  return sectionTemplate(
    HELP_SECTIONS[0],
    html`<table class="help-dialog__table">
      <thead>
        <tr>
          <th scope="col">배지 예시</th>
          <th scope="col">뜻</th>
        </tr>
      </thead>
      <tbody>
        ${WAIT_VERDICTS.map(
          (verdict) =>
            html`<tr
              class="help-dialog__row"
              id=${`help-verdict-${verdict.verdict}`}
            >
              <td class="help-dialog__example">
                <span class="worker-mini__badge" data-verdict=${verdict.verdict}
                  >${waitBadgeText(sample, verdict.verdict)}</span
                >
              </td>
              <td>${verdict.meaning}</td>
            </tr>`
        )}
      </tbody>
    </table>`
  );
}

/**
 * `scope`로 갈린 어휘 행들(절 2·3) — 같은 열 구조를 쓰되 예시 모양만 다르다.
 *
 * @param {string} title
 * @param {'bead'|'queue'} scope
 * @param {'badge'|'gate'} shape
 * @returns {TemplateResult}
 */
function kindSection(title, scope, shape) {
  const rows = WAIT_KINDS.filter((row) => row.scope === scope);
  return sectionTemplate(
    title,
    html`<table class="help-dialog__table">
      ${kindHeadTemplate()}
      <tbody>
        ${rows.map((row) => kindRowTemplate(row, shape))}
      </tbody>
    </table>`
  );
}

/**
 * `RELATION_CHIPS`와 `SUMMARY_CHIPS`(절 4) — 관계 칩은 클릭 의미까지, 요약
 * 칩은 뜻만 싣는다.
 *
 * @returns {TemplateResult}
 */
function chipSection() {
  return sectionTemplate(
    HELP_SECTIONS[3],
    html`
      <table class="help-dialog__table">
        <thead>
          <tr>
            <th scope="col">관계 칩</th>
            <th scope="col">뜻</th>
            <th scope="col">클릭</th>
          </tr>
        </thead>
        <tbody>
          ${RELATION_CHIPS.map(
            (chip) =>
              html`<tr class="help-dialog__row" id=${`help-chip-${chip.id}`}>
                <td class="help-dialog__example">
                  <span class="worker-dep">${chip.label}</span>
                </td>
                <td>${chip.meaning}</td>
                <td>${chip.click}</td>
              </tr>`
          )}
        </tbody>
      </table>
      <table class="help-dialog__table">
        <thead>
          <tr>
            <th scope="col">요약 칩</th>
            <th scope="col">뜻</th>
          </tr>
        </thead>
        <tbody>
          ${SUMMARY_CHIPS.map(
            (chip) =>
              html`<tr class="help-dialog__row" id=${`help-summary-${chip.id}`}>
                <td class="help-dialog__example">
                  <span class="worker-dep">${chip.label}</span>
                </td>
                <td>${chip.meaning}</td>
              </tr>`
          )}
        </tbody>
      </table>
    `
  );
}

/**
 * `[data-help-anchor]` 클릭을 한 곳에서 받아 범례를 연다 (§6.2). 카드가
 * 다이얼로그를 소유하지 않도록 위임으로만 연결한다.
 *
 * @param {Document|HTMLElement} root
 * @param {{ open: (options?: { anchor?: string }) => void }} dialog
 * @returns {() => void} - 붙인 `click` 리스너를 떼는 함수.
 */
export function installHelpAnchorDelegation(root, dialog) {
  const onClick = (/** @type {Event} */ event) => {
    const target = /** @type {HTMLElement|null} */ (event.target);
    const anchor_element = target?.closest?.('[data-help-anchor]');
    if (!anchor_element) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const details = /** @type {HTMLDetailsElement|null} */ (
      anchor_element.closest('details')
    );
    if (details) {
      details.open = false;
    }
    const anchor = anchor_element.getAttribute('data-help-anchor') || '';
    dialog.open(anchor ? { anchor } : {});
  };
  // 배지 `<details>`는 카드 열림을 막으려고 클릭 전파를 끊는다 — 버블 단계의
  // 위임에는 닿지 않으므로 캡처 단계에서 받는다.
  root.addEventListener('click', onClick, true);
  return () => {
    root.removeEventListener('click', onClick, true);
  };
}

/**
 * `dialog` 하나를 `mount_element`에 붙여 도움말 범례를 만든다.
 *
 * @param {HTMLElement} mount_element
 * @param {{
 *   onOpenChange?: (open: boolean) => void,
 *   anchorRoot?: Document|HTMLElement
 * }} [options]
 */
export function createHelpDialog(mount_element, options = {}) {
  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'help-dialog';
  dialog.className = 'help-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', DIALOG_TITLE);
  mount_element.appendChild(dialog);

  let is_open = false;
  /** @type {ReturnType<typeof setTimeout>|null} */
  let highlight_timer = null;
  /** @type {HTMLElement|null} */
  let highlighted = null;

  function doRender() {
    render(
      html`
        <div class="help-dialog__head">
          <h1 class="help-dialog__title">${DIALOG_TITLE}</h1>
          <button
            type="button"
            class="help-dialog__close"
            aria-label="닫기"
            @click=${close}
          >
            닫기
          </button>
        </div>
        <div class="help-dialog__body">
          ${verdictSection()} ${kindSection(HELP_SECTIONS[1], 'bead', 'badge')}
          ${kindSection(HELP_SECTIONS[2], 'queue', 'gate')} ${chipSection()}
        </div>
      `,
      dialog
    );
  }

  /** `help-dialog__row--highlight`를 걷는다 — 닫힘과 다음 anchor가 함께 쓴다. */
  function clearHighlight() {
    if (highlight_timer) {
      clearTimeout(highlight_timer);
      highlight_timer = null;
    }
    if (highlighted) {
      highlighted.classList.remove('help-dialog__row--highlight');
      highlighted = null;
    }
  }

  /**
   * `#help-<anchor>` 행으로 스크롤하고 잠시 강조한다. 행이 없으면 아무것도 하지
   * 않는다(fail-quiet).
   *
   * @param {string} anchor
   */
  function focusAnchor(anchor) {
    const row = /** @type {HTMLElement|null} */ (
      dialog.querySelector(`#help-${cssEscape(anchor)}`)
    );
    if (!row) {
      return;
    }
    row.scrollIntoView?.({ block: 'center' });
    row.classList.add('help-dialog__row--highlight');
    highlighted = row;
    highlight_timer = setTimeout(() => {
      clearHighlight();
    }, HIGHLIGHT_MS);
  }

  /**
   * `showModal`로 범례를 연다. `anchor`가 있으면 그 행으로 스크롤·강조한다.
   *
   * @param {{ anchor?: string }} [open_options]
   */
  function open(open_options = {}) {
    clearHighlight();
    if (!is_open) {
      is_open = true;
      options.onOpenChange?.(true);
      doRender();
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }
    if (open_options.anchor) {
      focusAnchor(open_options.anchor);
    }
  }

  function close() {
    clearHighlight();
    if (!is_open) {
      return;
    }
    is_open = false;
    options.onOpenChange?.(false);
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  const onDialogClose = () => {
    clearHighlight();
    if (!is_open) {
      return;
    }
    is_open = false;
    options.onOpenChange?.(false);
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);
  // 백드롭 클릭은 <dialog> 자신을 target으로 잡는다 (padding 0이라 본문 클릭은
  // 항상 자손이 받는다).
  const onBackdropClick = (/** @type {MouseEvent} */ event) => {
    if (event.target === dialog) {
      close();
    }
  };
  dialog.addEventListener('click', onBackdropClick);

  /** @type {(() => void)|null} */
  let remove_delegation = null;

  const api = {
    open,
    close,
    isOpen: () => is_open,
    destroy() {
      clearHighlight();
      is_open = false;
      remove_delegation?.();
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onBackdropClick);
      dialog.remove();
    }
  };

  if (options.anchorRoot) {
    remove_delegation = installHelpAnchorDelegation(options.anchorRoot, api);
  }

  return api;
}

/**
 * `CSS.escape`가 있으면 그것으로 선택자에 안전한 id 조각을 만든다 — 어휘 행
 * id는 지금 영숫자·`_`·`-`뿐이지만 표가 늘어날 수 있다.
 *
 * @param {string} value
 * @returns {string}
 */
function cssEscape(value) {
  const escape_fn = /** @type {any} */ (globalThis).CSS?.escape;
  return typeof escape_fn === 'function' ? escape_fn(value) : value;
}
