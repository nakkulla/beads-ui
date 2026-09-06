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

  test('parseView resolves the fourth tab compare', () => {
    expect(parseView('#/compare')).toBe('compare');
    expect(parseView('#/compare?issue=UI-1')).toBe('compare');
  });

  test('parseView resolves the fifth tab adr', () => {
    expect(parseView('#/adr')).toBe('adr');
    expect(parseView('#/adr?issue=UI-1')).toBe('adr');
  });

  test('gotoView and gotoIssue round trip the adr view through the hash', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    router.gotoView('adr');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(window.location.hash).toBe('#/adr');
    expect(store.getState().view).toBe('adr');

    router.gotoIssue('UI-8uz7');
    expect(window.location.hash).toBe('#/adr?issue=UI-8uz7');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(parseView(window.location.hash)).toBe('adr');
    expect(store.getState().selected_id).toBe('UI-8uz7');
    router.stop();
  });

  test('compare hash opens the detail overlay on the same issue parameter', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/compare?issue=UI-n28d';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(store.getState().view).toBe('compare');
    expect(store.getState().selected_id).toBe('UI-n28d');

    router.stop();
  });

  test('gotoIssue keeps the compare view in the canonical hash', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();
    window.location.hash = '#/compare';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    router.gotoIssue('UI-77');

    expect(window.location.hash).toBe('#/compare?issue=UI-77');
    router.stop();
  });
});
