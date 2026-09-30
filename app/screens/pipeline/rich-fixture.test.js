import { afterEach, describe, expect, test } from 'vitest';
import {
  enrichFixture,
  presetSnapshot
} from '../../../scripts/ui-fixture-rich.mjs';
import { createExecPresetStore } from '../../model/exec-preset-store.js';
import { NOW, mountPipeline } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

/**
 * @param {string} [scope]
 */
function mountRich(scope = '*') {
  const presetStore = createExecPresetStore();
  presetStore.set(/** @type {any} */ (presetSnapshot()));
  const handle = mountPipeline({
    now: NOW,
    scope,
    presetStore,
    edit: (fixture) => {
      enrichFixture(fixture, NOW);
    }
  });
  mounted.push(handle);
  return handle;
}

describe('검증 픽스처가 복원 표면을 모두 그린다 (UI-dbn6 P1-r2 item 12)', () => {
  test('draws every restored surface in the 전체 scope', () => {
    const { mount: root } = mountRich();

    const missing = [
      '[data-op="blocked-open"]',
      '.pl-stat--session',
      '.pl-strip__presets',
      '.pl-strip__merge.is-on',
      '[data-lane-body="pr_wait"] .pl-badge--live',
      '[data-lane-body="pr_wait"] .pl-title__tail',
      '[data-lane-body="pr_wait"] [data-op="resolve"]',
      '[data-lane-body="pr_wait"] .pl-fact--path',
      '[data-lane-body="queue"] .pl-cycle',
      '.pl-band__bead.is-open',
      '.pl-chip--leg.is-live',
      '.pl-activity__text',
      '[data-lane-body="running"] .pl-tile > .pl-history li',
      '[data-lane-body="running"] .pl-held-log',
      '[data-lane-body="running"] .pl-tile .pl-note',
      '[data-lane-body="running"] [data-op="failure-detail"]'
    ].filter((selector) => root.querySelector(selector) === null);

    expect(missing).toEqual([]);
  });

  test('draws the 레포 toolbar KPIs of repo-a', () => {
    const { mount: root } = mountRich('/fixture/repo-a');

    const missing = [
      '.pl-stat--presets',
      '.pl-stat--next',
      '.pl-stat--tok',
      '.pl-automerge',
      '.pl-opsline__ok'
    ].filter((selector) => root.querySelector(selector) === null);

    expect(missing).toEqual([]);
  });
});
