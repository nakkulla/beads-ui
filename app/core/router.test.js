import { describe, expect, test } from 'vitest';
import { createHashRouter, parseHash, parseView } from './router.js';
import { createStore } from './state.js';

describe('router', () => {
  test('parseHash extracts id', () => {
    expect(parseHash('#/worker?issue=UI-5')).toBe('UI-5');
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
    // The normalized Worker deep link opens the shared detail overlay
    // (UI-p7s2 §7.1) and also records the worker parent selection.
    expect(store.getState().selected_id).toBe('UI-10');
    expect(store.getState().worker.selected_parent_id).toBe('UI-10');
    // Legacy single-issue hash normalizes to the canonical worker form.
    expect(window.location.hash).toBe('#/worker?issue=UI-10');

    router.gotoIssue('UI-11');
    expect(window.location.hash).toBe('#/worker?issue=UI-11');
    router.stop();
  });

  test('normalizes the retired board hash to worker, keeping the issue param', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/board?issue=UI-p7s2';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(store.getState().view).toBe('worker');
    expect(store.getState().worker.selected_parent_id).toBe('UI-p7s2');
    expect(window.location.hash).toBe('#/worker?issue=UI-p7s2');
    router.stop();
  });

  test('normalizes a bare board hash to worker', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(store.getState().view).toBe('worker');
    expect(window.location.hash).toBe('#/worker');
    router.stop();
  });

  test('normalizes the legacy issues and epics hashes to worker', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/issues';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(window.location.hash).toBe('#/worker');

    window.location.hash = '#/epics';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    expect(window.location.hash).toBe('#/worker');
    router.stop();
  });

  test('worker hash opens the detail overlay on the issue parameter', () => {
    document.body.innerHTML = '<div></div>';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    window.location.hash = '#/worker?issue=UI-62lm';
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(store.getState().view).toBe('worker');
    expect(store.getState().selected_id).toBe('UI-62lm');
    expect(store.getState().worker.selected_parent_id).toBe('UI-62lm');

    router.stop();
  });

  test('parseView resolves worker and defaults everything else to worker', () => {
    expect(parseView('#/worker')).toBe('worker');
    // The retired Board hash and the legacy tab hashes collapse to worker.
    expect(parseView('#/board')).toBe('worker');
    expect(parseView('#/board?issue=UI-5')).toBe('worker');
    expect(parseView('#/issue/UI-5')).toBe('worker');
    expect(parseView('#/issues')).toBe('worker');
    expect(parseView('#/epics')).toBe('worker');
    expect(parseView('')).toBe('worker');
    expect(parseView('#/unknown')).toBe('worker');
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
    // 앞 테스트의 issue 해시가 남아 있으면 그 선택이 adr 해시에 실린다.
    window.location.hash = '';
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
