import { describe, expect, test } from 'vitest';
import { createHashRouter, parseHash, parseView } from './router.js';
import { createStore } from './state.js';

describe('router', () => {
  test('parseHash extracts id', () => {
    expect(parseHash('#/board?issue=UI-5')).toBe('UI-5');
    expect(parseHash('#/issue/UI-5')).toBe('UI-5');
    expect(parseHash('#/anything')).toBeNull();
  });

  test('router updates store and gotoIssue updates hash', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/issue/UI-10';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(store.getState().selected_id).toBe('UI-10');
    // Legacy single-issue hash normalizes to the canonical board form.
    expect(window.location.hash).toBe('#/board?issue=UI-10');

    router.gotoIssue('UI-11');
    expect(window.location.hash).toBe('#/board?issue=UI-11');
    router.stop();
  });

  test('worker hash updates worker selection without opening global detail state', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/worker?issue=UI-62lm';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(store.getState().view).toBe('worker');
    expect(store.getState().selected_id).toBeNull();
    expect(store.getState().worker.selected_parent_id).toBe('UI-62lm');

    router.stop();
  });

  test('parseView resolves worker and defaults everything else to board', () => {
    expect(parseView('#/worker')).toBe('worker');
    expect(parseView('#/board')).toBe('board');
    // Legacy tab hashes collapse to board.
    expect(parseView('#/issues')).toBe('board');
    expect(parseView('#/epics')).toBe('board');
    expect(parseView('')).toBe('board');
    expect(parseView('#/unknown')).toBe('board');
  });
});
