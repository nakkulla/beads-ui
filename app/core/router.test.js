import { afterEach, describe, expect, test, vi } from 'vitest';
import { createHashRouter, parseRoute, routeHash } from './router.js';
import { createStore } from './state.js';

afterEach(() => {
  window.location.hash = '';
});

describe('route parsing (UI-dbn6 §3.1)', () => {
  test.each([
    ['#/worker', { screen: 'pipeline', issue: null, scope_intent: 'repo' }],
    ['#/monitor', { screen: 'pipeline', issue: null, scope_intent: 'all' }],
    ['#/board', { screen: 'pipeline', issue: null, scope_intent: null }],
    ['#/issues', { screen: 'pipeline', issue: null, scope_intent: null }],
    ['#/epics', { screen: 'pipeline', issue: null, scope_intent: null }],
    ['#/issue/UI-7', { screen: 'pipeline', issue: 'UI-7', scope_intent: null }]
  ])('normalizes the legacy hash %s onto the pipeline', (hash, expected) => {
    const route = parseRoute(hash);

    expect(route).toMatchObject({ ...expected, legacy: true });
  });

  test('keeps the issue of a legacy Worker deep link', () => {
    const route = parseRoute('#/worker?issue=UI-9');

    expect(route).toMatchObject({
      screen: 'pipeline',
      issue: 'UI-9',
      scope_intent: 'repo',
      legacy: true
    });
  });

  test('reads the issue and its encoded root from a pipeline hash', () => {
    const root = '/Users/me/My Repo';

    const route = parseRoute(
      `#/pipeline?issue=UI-1&root=${encodeURIComponent(root)}`
    );

    expect(route).toEqual({
      screen: 'pipeline',
      issue: 'UI-1',
      root,
      scope_intent: null,
      legacy: false
    });
  });

  test('keeps compare and adr as their own screens', () => {
    const screens = [parseRoute('#/compare'), parseRoute('#/adr')].map(
      (route) => route.screen
    );

    expect(screens).toEqual(['compare', 'adr']);
  });

  test('serializes an issue with its root through encodeURIComponent', () => {
    const hash = routeHash({
      screen: 'pipeline',
      issue: 'UI-1',
      root: '/a b/c'
    });

    expect(hash).toBe(
      `#/pipeline?issue=UI-1&root=${encodeURIComponent('/a b/c')}`
    );
  });

  test('serializes a bare screen without a query', () => {
    const hash = routeHash({ screen: 'adr', issue: null, root: null });

    expect(hash).toBe('#/adr');
  });
});

describe('hash router (UI-dbn6 §3.1)', () => {
  test('rewrites a legacy monitor hash and reports the 전체 scope intent', () => {
    window.location.hash = '#/monitor';
    const store = createStore();
    const onScopeIntent = vi.fn();
    const router = createHashRouter(store, { onScopeIntent });

    router.start();
    router.stop();

    expect(window.location.hash).toBe('#/pipeline');
    expect(onScopeIntent).toHaveBeenCalledWith('all');
  });

  test('opens the issue overlay state from a legacy issue hash', () => {
    window.location.hash = '#/issue/UI-3';
    const store = createStore();
    const router = createHashRouter(store);

    router.start();
    router.stop();

    expect(store.getState()).toMatchObject({
      view: 'pipeline',
      selected_id: 'UI-3',
      detail_root: null
    });
    expect(window.location.hash).toBe('#/pipeline?issue=UI-3');
  });

  test('keeps the root of an issue it navigates to', () => {
    const store = createStore({ view: 'pipeline' });
    const router = createHashRouter(store);
    router.start();

    router.gotoIssue('UI-5', '/repo/b');
    router.stop();

    expect(window.location.hash).toBe(
      `#/pipeline?issue=UI-5&root=${encodeURIComponent('/repo/b')}`
    );
  });

  test('drops the issue query when the overlay closes', () => {
    window.location.hash = '#/pipeline?issue=UI-5';
    const store = createStore();
    const router = createHashRouter(store);
    router.start();

    router.closeIssue();
    router.stop();

    expect(window.location.hash).toBe('#/pipeline');
  });
});
