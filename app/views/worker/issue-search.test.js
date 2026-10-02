import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { SEARCH_DEBOUNCE_MS, createIssueSearch } from './issue-search.js';

/** @type {Array<ReturnType<typeof createIssueSearch>>} */
const mounted = [];

/**
 * @param {string} id
 * @param {string} [root_dir]
 * @returns {Record<string, string>}
 */
function row(id, root_dir = '/repo/a') {
  return {
    id,
    status: 'open',
    title: `title ${id}`,
    root_dir,
    workspace_name: root_dir.split('/').pop() || ''
  };
}

/**
 * @param {{ scope?: 'workspace'|'visible', transport?: any }} [over]
 * @returns {{ box: ReturnType<typeof createIssueSearch>, openIssue: ReturnType<typeof vi.fn>, input: HTMLInputElement }}
 */
function mountSearch(over = {}) {
  const openIssue = vi.fn();
  const box = createIssueSearch({
    scope: over.scope || 'workspace',
    transport:
      over.transport ||
      vi.fn(async () => ({ results: [row('A-1')], partial: false })),
    openIssue
  });
  mounted.push(box);
  document.body.append(box.element);
  const input = /** @type {HTMLInputElement} */ (
    box.element.querySelector('.issue-search__input')
  );
  return { box, openIssue, input };
}

/**
 * @param {HTMLInputElement} input
 * @param {string} value
 */
function type(input, value) {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

/**
 * @param {HTMLInputElement} input
 * @param {string} key
 * @returns {KeyboardEvent}
 */
function press(input, key) {
  const ev = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true
  });
  input.dispatchEvent(ev);
  return ev;
}

/** Let the debounce fire and the reply settle. */
async function settle() {
  await vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS);
}

/**
 * @param {HTMLElement} el
 * @returns {string[]}
 */
function rowIds(el) {
  return Array.from(el.querySelectorAll('.issue-search__row')).map(
    (r) => /** @type {HTMLElement} */ (r).dataset.issueId || ''
  );
}

beforeEach(() => {
  document.body.innerHTML = '';
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  while (mounted.length > 0) {
    mounted.pop()?.destroy();
  }
});

describe('views/worker/issue-search', () => {
  test('sends no request before the debounce elapses', async () => {
    const transport = vi.fn(async () => ({ results: [], partial: false }));
    const { input } = mountSearch({ transport });

    type(input, 'a');
    await vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS - 1);

    expect(transport).not.toHaveBeenCalled();
  });

  test('sends one request with the query and scope after the debounce', async () => {
    const transport = vi.fn(async () => ({ results: [], partial: false }));
    const { input } = mountSearch({ scope: 'visible', transport });

    type(input, 'a');
    type(input, 'ab');
    await settle();

    expect(transport.mock.calls).toEqual([
      ['search-issues', { query: 'ab', scope: 'visible' }]
    ]);
  });

  test('lists the id, status and title of each result', async () => {
    const { box, input } = mountSearch();

    type(input, 'a');
    await settle();

    const first = /** @type {HTMLElement} */ (
      box.element.querySelector('.issue-search__row')
    );
    expect(
      [
        '.issue-search__id',
        '.issue-search__status',
        '.issue-search__title'
      ].map((selector) => first.querySelector(selector)?.textContent)
    ).toEqual(['A-1', 'open', 'title A-1']);
  });

  test('leaves the repo badge off a workspace scope result', async () => {
    const { box, input } = mountSearch({ scope: 'workspace' });

    type(input, 'a');
    await settle();

    expect(box.element.querySelector('.issue-search__repo')).toBeNull();
  });

  test('puts the repo badge before the id of a visible scope result', async () => {
    const { box, input } = mountSearch({ scope: 'visible' });

    type(input, 'a');
    await settle();

    expect(
      box.element.querySelector('.issue-search__row')?.firstElementChild
        ?.className
    ).toBe('issue-search__repo');
  });

  test('opens the clicked result with its id and repository', async () => {
    const transport = vi.fn(async () => ({
      results: [row('B-2', '/repo/b')],
      partial: false
    }));
    const { box, input, openIssue } = mountSearch({
      scope: 'visible',
      transport
    });
    type(input, 'b');
    await settle();

    /** @type {HTMLElement} */ (
      box.element.querySelector('.issue-search__row')
    ).click();

    expect(openIssue).toHaveBeenCalledWith('B-2', '/repo/b');
  });

  test('closes the dropdown after a result opens', async () => {
    const { box, input } = mountSearch();
    type(input, 'a');
    await settle();

    /** @type {HTMLElement} */ (
      box.element.querySelector('.issue-search__row')
    ).click();

    expect(box.element.querySelector('.issue-search__menu')).toBeNull();
  });

  test('opens the first result on Enter', async () => {
    const transport = vi.fn(async () => ({
      results: [row('A-1'), row('A-2')],
      partial: false
    }));
    const { input, openIssue } = mountSearch({ transport });
    type(input, 'a');
    await settle();

    press(input, 'Enter');

    expect(openIssue).toHaveBeenCalledWith('A-1', '/repo/a');
  });

  test('requests at once and opens the first result when Enter beats the debounce', async () => {
    const { input, openIssue } = mountSearch();
    type(input, 'a');

    press(input, 'Enter');
    await vi.advanceTimersByTimeAsync(0);

    expect(openIssue).toHaveBeenCalledWith('A-1', '/repo/a');
  });

  test('clears the query and closes the dropdown on Escape', async () => {
    const { box, input } = mountSearch();
    type(input, 'a');
    await settle();

    press(input, 'Escape');

    expect([
      input.value,
      box.element.querySelector('.issue-search__menu')
    ]).toEqual(['', null]);
  });

  test('stops an Escape that cleared a query from reaching the page', async () => {
    const { input } = mountSearch();
    type(input, 'a');
    await settle();
    const page = vi.fn();
    document.addEventListener('keydown', page);

    press(input, 'Escape');
    document.removeEventListener('keydown', page);

    expect(page).not.toHaveBeenCalled();
  });

  test('lets an Escape on an empty box reach the page', () => {
    const { input } = mountSearch();
    const page = vi.fn();
    document.addEventListener('keydown', page);

    press(input, 'Escape');
    document.removeEventListener('keydown', page);

    expect(page).toHaveBeenCalledTimes(1);
  });

  test('closes the dropdown on an outside click', async () => {
    const { box, input } = mountSearch();
    type(input, 'a');
    await settle();

    document.body.click();

    expect(box.element.querySelector('.issue-search__menu')).toBeNull();
  });

  test('keeps the dropdown open on a click inside the box', async () => {
    const { box, input } = mountSearch();
    type(input, 'a');
    await settle();

    input.click();

    expect(box.element.querySelector('.issue-search__menu')).not.toBeNull();
  });

  test('drops a late reply of an earlier query', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const transport = vi.fn(
      () => new Promise((resolve) => resolvers.push(resolve))
    );
    const { box, input } = mountSearch({ transport });
    type(input, 'a');
    await settle();
    type(input, 'ab');
    await settle();

    resolvers[1]({ results: [row('NEW-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);
    resolvers[0]({ results: [row('OLD-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);

    expect(rowIds(box.element)).toEqual(['NEW-1']);
  });

  test('drops a reply that lands after the query was cleared', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const transport = vi.fn(
      () => new Promise((resolve) => resolvers.push(resolve))
    );
    const { box, input } = mountSearch({ transport });
    type(input, 'a');
    await settle();
    type(input, '');

    resolvers[0]({ results: [row('OLD-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);

    expect(box.element.querySelector('.issue-search__menu')).toBeNull();
  });

  test('shows a 검색 실패 line when the request rejects', async () => {
    const transport = vi.fn(async () => {
      throw new Error('unknown_type');
    });
    const { box, input } = mountSearch({ transport });

    type(input, 'a');
    await settle();

    expect(box.element.querySelector('.issue-search__note')?.textContent).toBe(
      '검색 실패'
    );
  });

  test('treats a reply without results as a failed search', async () => {
    const transport = vi.fn(async () => []);
    const { box, input } = mountSearch({ transport });

    type(input, 'a');
    await settle();

    expect(box.element.querySelector('.issue-search__note')?.textContent).toBe(
      '검색 실패'
    );
  });

  test('ends a partial reply with the unread-repositories line', async () => {
    const transport = vi.fn(async () => ({
      results: [row('A-1')],
      partial: true
    }));
    const { box, input } = mountSearch({ transport });

    type(input, 'a');
    await settle();

    expect(
      box.element.querySelector('.issue-search__menu')?.lastElementChild
        ?.textContent
    ).toContain('일부 저장소는 아직 읽지 못했습니다');
  });

  test('draws no dropdown for an empty complete reply', async () => {
    const transport = vi.fn(async () => ({ results: [], partial: false }));
    const { box, input } = mountSearch({ transport });

    type(input, 'zzz');
    await settle();

    expect(box.element.querySelector('.issue-search__menu')).toBeNull();
  });

  test('opens the new reply first result when Enter lands before an edited query replies', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const transport = vi.fn(
      () => new Promise((resolve) => resolvers.push(resolve))
    );
    const { input, openIssue } = mountSearch({ transport });
    type(input, 'a');
    await settle();
    resolvers[0]({ results: [row('OLD-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);
    type(input, 'ab');
    await settle();

    press(input, 'Enter');
    resolvers[1]({ results: [row('NEW-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);

    expect(openIssue.mock.calls).toEqual([['NEW-1', '/repo/a']]);
  });

  test('keeps a dropdown closed by an outside click closed when the late reply lands', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const transport = vi.fn(
      () => new Promise((resolve) => resolvers.push(resolve))
    );
    const { box, input } = mountSearch({ transport });
    type(input, 'a');
    await settle();
    resolvers[0]({ results: [row('A-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);
    type(input, 'ab');
    await settle();

    document.body.click();
    resolvers[1]({ results: [row('A-2')], partial: false });
    await vi.advanceTimersByTimeAsync(0);

    expect(box.element.querySelector('.issue-search__menu')).toBeNull();
  });

  test('empties the box and drops the in-flight reply on reset', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const transport = vi.fn(
      () => new Promise((resolve) => resolvers.push(resolve))
    );
    const { box, input } = mountSearch({ transport });
    type(input, 'a');
    await settle();

    box.reset();
    resolvers[0]({ results: [row('OLD-1')], partial: false });
    await vi.advanceTimersByTimeAsync(0);

    expect([
      input.value,
      box.element.querySelector('.issue-search__menu')
    ]).toEqual(['', null]);
  });

  test('writes nothing to localStorage', async () => {
    window.localStorage.clear();
    const { input } = mountSearch();

    type(input, 'a');
    await settle();
    press(input, 'Escape');

    expect(window.localStorage.length).toBe(0);
  });
});
