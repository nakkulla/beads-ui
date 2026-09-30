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

const REPO_C = '/fixture/repo-c';

function mount() {
  const handle = mountPipeline({ now: NOW });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} op
 * @returns {HTMLElement}
 */
function stripButton(root, op) {
  return /** @type {HTMLElement} */ (
    root.querySelector(`.pl-strip [data-op="${op}"][data-root-dir="${REPO_C}"]`)
  );
}

describe('pipeline repo strip (UI-dbn6 §3.3)', () => {
  test('lists one chip per visible repo', () => {
    const { mount: root } = mount();

    const chips = root.querySelectorAll('.pl-strip__chip');

    expect(chips).toHaveLength(8);
  });

  test('narrows the scope to a repo on a chip click', () => {
    const { mount: root, setScope } = mount();

    stripButton(root, 'scope-repo').click();

    expect(setScope).toHaveBeenCalledWith(REPO_C);
  });

  test('sends worker-automation-toggle with that repo revision from the dot', async () => {
    const { mount: root, send } = mount();

    stripButton(root, 'repo-automation').click();
    await settle();

    expect(payloadsOf(send, 'worker-automation-toggle')).toEqual([
      { on: true, root_dir: REPO_C, expected_revision: 12 }
    ]);
  });

  test('opens that repo settings from ⚙', () => {
    const { mount: root, openSettings } = mount();

    stripButton(root, 'repo-settings').click();

    expect(openSettings).toHaveBeenCalledWith({
      scope: 'repo',
      root_dir: REPO_C
    });
  });
});

const REPO_A = '/fixture/repo-a';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: { models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } } }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

/**
 * Mount repo-a on a named general and quick-fix preset with resolvable
 * orchestration and worker settings; repo-b carries none of that material.
 *
 * @param {{ coarse?: boolean }} [options]
 */
function mountExecLine(options = {}) {
  const presetStore = createExecPresetStore();
  presetStore.set({
    revision: 1,
    presets: [
      { id: 'p-claude', name: '클로드', settings: {} },
      { id: 'p-qf', name: 'astra', settings: {} }
    ],
    chip_bindings: {}
  });
  const handle = mountPipeline({
    now: NOW,
    coarse: options.coarse,
    presetStore,
    edit: (fixture) => {
      Object.assign(fixture.workspaces_state[0], {
        applied_exec_preset: { id: 'p-claude', applied_at: 1 },
        applied_quick_fix_preset: { id: 'p-qf', applied_at: 1 },
        runner_catalog: CATALOG,
        orchestration_model: 'opus',
        orchestration_effort: 'high',
        session_defaults: {
          impl_runtime: 'codex',
          impl_model: 'sol',
          impl_effort: 'medium'
        }
      });
      const bare = fixture.workspaces_state[1];
      delete bare.execution_defaults;
      delete bare.runner_catalog;
      delete bare.session_defaults;
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
function cellOf(root, root_dir) {
  const cell = root
    .querySelector(
      `.pl-strip [data-op="scope-repo"][data-root-dir="${root_dir}"]`
    )
    ?.closest('.pl-strip__chip');
  if (!(cell instanceof HTMLElement)) {
    throw new Error(`missing repo cell ${root_dir}`);
  }
  return cell;
}

/**
 * @param {Element|null|undefined} node
 * @returns {string}
 */
function textOf(node) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim();
}

describe('pipeline repo strip exec line (UI-dbn6 P1-r3)', () => {
  test('puts the name, the load and both switches on the first line', () => {
    const { mount: root } = mountExecLine();

    const line = cellOf(root, REPO_A).querySelector('.pl-strip__r1');
    const toggles = Array.from(
      line?.querySelectorAll('button.ui-toggle') || []
    ).map((node) => [
      node.getAttribute('data-op'),
      textOf(node),
      node.getAttribute('aria-pressed')
    ]);

    expect(textOf(line?.querySelector('.pl-strip__name'))).toBe('repo-a 1/2');
    expect(toggles).toEqual([
      ['repo-automation', '진행', 'true'],
      ['auto-merge', '머지', 'false']
    ]);
  });

  test('names the preset, 오케, 워커 and qf on the second line', () => {
    const { mount: root } = mountExecLine();

    const line = cellOf(root, REPO_A).querySelector('.pl-strip__r2');
    const parts = Array.from(line?.children || []).map((node) => textOf(node));

    expect(parts).toEqual([
      '클로드',
      '오케 claude · opus · high',
      '워커 codex · 5.6-sol · medium',
      'qf astra'
    ]);
  });

  test('carries each formatter title as the tooltip of its part', () => {
    const { mount: root } = mountExecLine();

    const line = cellOf(root, REPO_A).querySelector('.pl-strip__r2');
    /** @param {string} kind */
    const title = (kind) =>
      line?.querySelector(`[data-kind="${kind}"]`)?.getAttribute('title') || '';

    expect(title('preset')).toBe('적용된 구현 프리셋 · 클로드');
    expect(title('orchestration')).toContain(
      '오케스트레이션 — 현재 해석값 (핀 > 큐 기본값)'
    );
    expect(title('worker')).toContain('워커(구현 위임) — 현재 해석값');
    expect(title('qf')).toBe('적용된 quick fix 프리셋 · astra');
  });

  test('draws no second line for a repo without that material', () => {
    const { mount: root } = mountExecLine();

    const line = cellOf(root, '/fixture/repo-b').querySelector('.pl-strip__r2');

    expect(line).toBeNull();
  });

  test('keeps state-only switch dots on a coarse pointer', () => {
    const { mount: root } = mountExecLine({ coarse: true });

    const line = cellOf(root, REPO_A).querySelector('.pl-strip__r1');
    const marks = Array.from(line?.querySelectorAll('.ui-toggle') || []).map(
      (node) => [node.tagName, node.getAttribute('aria-label')]
    );

    expect(marks).toEqual([
      ['SPAN', 'repo-a 자동 진행 켜짐'],
      ['SPAN', 'repo-a 자동 머지 꺼짐']
    ]);
  });
});
