/**
 * Issue search box with a result dropdown (UI-f2sy §6.3), shared by the Worker
 * and Monitor tabs.
 *
 * The box asks the server (`search-issues`) for matching issues of its scope and
 * lists them under the input; picking one opens its detail. Lanes are never
 * touched — the old `search_match` dimming and `일치 n` count are gone.
 *
 * The query lives only in this closure: nothing is persisted, and a reload
 * starts empty. A reply is applied only while it still answers the latest
 * query, so a slow earlier reply cannot overwrite newer results.
 */
import { html, render } from 'lit-html';

/** Debounce between the last keystroke and the request. */
export const SEARCH_DEBOUNCE_MS = 150;

/**
 * @typedef {Object} IssueSearchRow
 * @property {string} id
 * @property {string} status
 * @property {string} title
 * @property {string} root_dir
 * @property {string} workspace_name
 */

/**
 * @typedef {Object} IssueSearchOptions
 * @property {'workspace'|'visible'} scope - Worker asks `workspace`, Monitor
 * `visible`.
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {(id: string, root_dir: string) => void} openIssue - Opens the
 * detail; the Monitor switches repository first.
 * @property {number} [debounce_ms] - Test seam for the 150ms debounce.
 */

/**
 * Whether a reply has the `{ results, partial }` shape. A legacy server answers
 * `unknown_type` (a rejection) and the tab transport turns other failures into
 * `[]`; both read as failure here.
 *
 * @param {any} res
 * @returns {boolean} true when the reply is usable.
 */
function isSearchReply(res) {
  return !!res && !Array.isArray(res) && Array.isArray(res.results);
}

/**
 * Create the search box. `element` is a persistent node — embed it with a lit
 * child expression and it keeps its input focus across the host's re-renders.
 *
 * @param {IssueSearchOptions} options
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export function createIssueSearch(options) {
  const debounce_ms =
    typeof options.debounce_ms === 'number'
      ? options.debounce_ms
      : SEARCH_DEBOUNCE_MS;
  const element = document.createElement('div');
  element.className = `issue-search issue-search--${options.scope}`;

  let query = '';
  /** @type {IssueSearchRow[]} */
  let results = [];
  let partial = false;
  let failed = false;
  let open = false;
  /** Latest request generation; a reply for an older one is dropped. */
  let generation = 0;
  /** @type {ReturnType<typeof setTimeout>|null} */
  let timer = null;

  /** @returns {boolean} */
  function hasQuery() {
    return query.trim().length > 0;
  }

  /** @param {IssueSearchRow} row */
  function pick(row) {
    open = false;
    renderBox();
    options.openIssue(row.id, row.root_dir);
  }

  /**
   * @param {IssueSearchRow} row
   * @returns {import('lit-html').TemplateResult}
   */
  function rowTemplate(row) {
    return html`<button
      type="button"
      class="op-btn op-btn--ghost issue-search__row"
      data-issue-id=${row.id}
      @click=${() => pick(row)}
    >
      ${options.scope === 'visible' && row.workspace_name
        ? html`<span class="issue-search__repo" title=${row.root_dir}
            >${row.workspace_name}</span
          >`
        : ''}
      <span class="issue-search__id">${row.id}</span>
      <span class="issue-search__status">${row.status}</span>
      <span class="issue-search__title">${row.title}</span>
    </button>`;
  }

  /** @returns {import('lit-html').TemplateResult|''} */
  function menuTemplate() {
    if (!open || !hasQuery()) {
      return '';
    }
    if (!failed && results.length === 0 && !partial) {
      return '';
    }
    return html`<div class="issue-search__menu" role="listbox">
      ${failed
        ? html`<div class="issue-search__note">검색 실패</div>`
        : html`${results.map((row) => rowTemplate(row))}${partial
            ? html`<div class="issue-search__note">
                일부 저장소는 아직 읽지 못했습니다
              </div>`
            : ''}`}
    </div>`;
  }

  function renderBox() {
    render(
      html`<input
          type="search"
          class="ui-input issue-search__input"
          placeholder="ID·제목 검색"
          aria-label="이슈 검색 (ID·제목)"
          .value=${query}
          @input=${onInput}
          @keydown=${onKeyDown}
          @focus=${onFocus}
        />${menuTemplate()}`,
      element
    );
  }

  /**
   * Ask the server for the current query. `open_first` is Enter's request: the
   * first result opens as soon as the reply lands.
   *
   * @param {boolean} open_first
   * @returns {Promise<void>}
   */
  async function run(open_first) {
    timer = null;
    const mine = ++generation;
    const transport = options.transport;
    /** @type {any} */
    let res = null;
    try {
      res = transport
        ? await transport('search-issues', {
            query: query.trim(),
            scope: options.scope
          })
        : null;
    } catch {
      res = null;
    }
    if (mine !== generation) {
      return;
    }
    if (isSearchReply(res)) {
      failed = false;
      results = res.results;
      partial = res.partial === true;
    } else {
      failed = true;
      results = [];
      partial = false;
    }
    open = true;
    renderBox();
    if (open_first && !failed && results.length > 0) {
      pick(results[0]);
    }
  }

  /** @param {Event} ev */
  function onInput(ev) {
    query = /** @type {HTMLInputElement} */ (ev.target).value;
    generation += 1;
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    if (!hasQuery()) {
      results = [];
      partial = false;
      failed = false;
      open = false;
      renderBox();
      return;
    }
    timer = setTimeout(() => {
      void run(false);
    }, debounce_ms);
  }

  /** @param {KeyboardEvent} ev */
  function onKeyDown(ev) {
    if (ev.key === 'Escape') {
      if (query.length === 0 && !open) {
        return;
      }
      // Escape leaves the dimmed search state in one key; consume it so a page
      // level Escape handler does not also act.
      ev.stopPropagation();
      generation += 1;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      query = '';
      results = [];
      partial = false;
      failed = false;
      open = false;
      renderBox();
      return;
    }
    if (ev.key !== 'Enter' || ev.isComposing || !hasQuery()) {
      return;
    }
    ev.preventDefault();
    if (timer !== null) {
      clearTimeout(timer);
      void run(true);
      return;
    }
    if (open && !failed && results.length > 0) {
      pick(results[0]);
    }
  }

  function onFocus() {
    if (hasQuery() && !open && (results.length > 0 || failed || partial)) {
      open = true;
      renderBox();
    }
  }

  /** @param {Event} ev */
  function onDocumentClick(ev) {
    if (!open || element.contains(/** @type {Node|null} */ (ev.target))) {
      return;
    }
    open = false;
    renderBox();
  }
  document.addEventListener('click', onDocumentClick);

  renderBox();

  return {
    element,
    destroy() {
      document.removeEventListener('click', onDocumentClick);
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      generation += 1;
      render(html``, element);
    }
  };
}
