import { afterEach, describe, expect, test } from 'vitest';
import { createExecPresetStore } from '../../model/exec-preset-store.js';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_A = '/fixture/repo-a';
const REPO_B = '/fixture/repo-b';
const REPO_C = '/fixture/repo-c';

/**
 * The 전체 scope with repo-a on named presets, repo-b's fields present and
 * null, repo-c on an unknown preset id and auto-merge on.
 *
 * @param {string} [scope]
 * @param {{ coarse?: boolean }} [options]
 */
function mountPresets(scope = '*', options = {}) {
  const presetStore = createExecPresetStore();
  presetStore.set({
    revision: 3,
    presets: [
      { id: 'p-claude', name: '클로드 구현', settings: {} },
      { id: 'p-qf', name: '빠른 수정 아주 긴 이름의 프리셋', settings: {} }
    ],
    chip_bindings: {}
  });
  const handle = mountPipeline({
    now: NOW,
    scope,
    coarse: options.coarse,
    presetStore,
    edit: (fixture) => {
      Object.assign(fixture.workspaces_state[0], {
        applied_exec_preset: { id: 'p-claude', applied_at: 1 },
        applied_quick_fix_preset: { id: 'p-qf', applied_at: 1 }
      });
      Object.assign(fixture.workspaces_state[1], {
        applied_exec_preset: null,
        applied_quick_fix_preset: null
      });
      Object.assign(fixture.workspaces_state[2], {
        applied_exec_preset: { id: 'gone', applied_at: 1 },
        auto_merge: true
      });
      fixture.workspaces[2].auto_merge = true;
    }
  });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} root_dir
 * @returns {HTMLElement}
 */
function chipOf(root, root_dir) {
  const button = root.querySelector(
    `.pl-strip [data-op="scope-repo"][data-root-dir="${root_dir}"]`
  );
  const chip = button?.closest('.pl-strip__chip');
  if (!(chip instanceof HTMLElement)) {
    throw new Error(`missing chip ${root_dir}`);
  }
  return chip;
}

/**
 * @param {Element|null|undefined} node
 * @returns {string}
 */
function text(node) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim();
}

describe('레포 띠의 설정 요약 (UI-dbn6 P1-r2 item 14)', () => {
  test('names the applied worker and quick-fix presets on the chip', () => {
    const { mount: root } = mountPresets();

    const line = chipOf(root, REPO_A).querySelector('.pl-strip__presets');

    expect(text(line)).toBe(
      '워커 클로드 구현 · qf 빠른 수정 아주 긴 이름의 프리셋'
    );
    expect(line?.getAttribute('title')).toBe(
      '워커 클로드 구현 · qf 빠른 수정 아주 긴 이름의 프리셋'
    );
  });

  test('says 프리셋 없음 for a present and null preset field', () => {
    const { mount: root } = mountPresets();

    const line = chipOf(root, REPO_B).querySelector('.pl-strip__presets');

    expect(text(line)).toBe('워커 프리셋 없음 · qf 프리셋 없음');
  });

  test('omits a preset it cannot name or that the row does not carry', () => {
    const { mount: root } = mountPresets();

    const line = chipOf(root, REPO_C).querySelector('.pl-strip__presets');
    const none = chipOf(root, '/fixture/repo-d').querySelector(
      '.pl-strip__presets'
    );

    expect(line).toBeNull();
    expect(none).toBeNull();
  });

  test('marks the auto-merge state of each repo', () => {
    const { mount: root } = mountPresets();

    const on = chipOf(root, REPO_C).querySelector('[data-op="auto-merge"]');
    const off = chipOf(root, REPO_A).querySelector('[data-op="auto-merge"]');

    expect(on?.getAttribute('aria-pressed')).toBe('true');
    expect(off?.getAttribute('aria-pressed')).toBe('false');
  });

  test('sends worker-merge-auto-toggle for that repo from its mark', async () => {
    const { mount: root, send } = mountPresets();

    /** @type {HTMLElement} */ (
      chipOf(root, REPO_C).querySelector('[data-op="auto-merge"]')
    ).click();
    await settle();

    expect(payloadsOf(send, 'worker-merge-auto-toggle')).toEqual([
      { on: false, root_dir: REPO_C, expected_revision: 12 }
    ]);
  });

  test('keeps the automation dot sending worker-automation-toggle', async () => {
    const { mount: root, send } = mountPresets();

    /** @type {HTMLElement} */ (
      chipOf(root, REPO_A).querySelector('[data-op="repo-automation"]')
    ).click();
    await settle();

    expect(payloadsOf(send, 'worker-automation-toggle')).toEqual([
      { on: false, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('names the applied presets in the 레포 toolbar', () => {
    const { mount: root } = mountPresets(REPO_A);

    const line = root.querySelector('.pl-toolbar--repo .pl-stat--presets');

    expect(text(line)).toBe(
      '워커 클로드 구현 · qf 빠른 수정 아주 긴 이름의 프리셋'
    );
  });

  test('keeps the chip scope when its auto-merge mark is pressed', async () => {
    const { mount: root, setScope } = mountPresets();

    /** @type {HTMLElement} */ (
      chipOf(root, REPO_C).querySelector('[data-op="auto-merge"]')
    ).click();
    await settle();

    expect(setScope).not.toHaveBeenCalled();
  });

  test('draws state-only marks on a coarse pointer', () => {
    const { mount: root } = mountPresets('*', { coarse: true });

    const chip = chipOf(root, REPO_C);
    const merge = chip.querySelector('.pl-strip__merge');

    expect(chip.querySelector('[data-op="auto-merge"]')).toBeNull();
    expect(chip.querySelector('[data-op="repo-automation"]')).toBeNull();
    expect(merge?.tagName).toBe('SPAN');
    expect(merge?.getAttribute('aria-label')).toBe('repo-c 자동 머지 켜짐');
  });
});
