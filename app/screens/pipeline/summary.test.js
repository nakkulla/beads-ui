import { afterEach, describe, expect, test, vi } from 'vitest';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
  vi.useRealTimers();
});

const REPO_A = '/fixture/repo-a';
const REPO_C = '/fixture/repo-c';

/**
 * @param {Parameters<typeof mountPipeline>[0]} [options]
 */
function mount(options = {}) {
  const handle = mountPipeline({ now: NOW, ...options });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLElement)) {
    throw new Error(`missing ${selector}`);
  }
  return found;
}

/**
 * Make repo-c's second queue row wait on an action-required recovery and
 * its third on a normal provider hold.
 *
 * @param {ReturnType<typeof import('../../../scripts/ui-fixture-server.mjs').buildPipelineFixture>} fixture
 */
function blockRepoC(fixture) {
  fixture.workspaces[2].wait_reasons = [
    {
      kind: 'recovery',
      subject: { bead_id: 'C-2', root_dir: REPO_C },
      headline: '복구 판단 필요',
      verdict: 'action_required',
      targets: [],
      actions: []
    },
    {
      kind: 'provider_hold',
      subject: { bead_id: 'C-3', root_dir: REPO_C },
      headline: '공급자 한도',
      verdict: 'normal',
      targets: [],
      actions: []
    }
  ];
}

describe('막힘 요약 (UI-0bvr §6.2, UI-dbn6 P1-r2)', () => {
  test('counts blocked issues and action-required ones in the 전체 toolbar', () => {
    const { mount: root } = mount({ edit: blockRepoC });

    const chip = el(root, '.pl-toolbar--all [data-op="blocked-open"]');

    expect(chip.textContent?.replace(/\s+/g, ' ').trim()).toBe('막힘 3 · ⛔ 1');
  });

  test('counts only the scoped repo in the 레포 toolbar', () => {
    const { mount: root } = mount({ scope: REPO_C, edit: blockRepoC });

    const chip = el(root, '.pl-toolbar--repo [data-op="blocked-open"]');

    expect(chip.textContent?.replace(/\s+/g, ' ').trim()).toBe('막힘 2 · ⛔ 1');
  });

  test('draws no 막힘 chip while nothing is blocked', () => {
    const { mount: root } = mount({ scope: REPO_A });

    const chip = root.querySelector('[data-op="blocked-open"]');

    expect(chip).toBeNull();
  });

  test('lists the wait groups with their counts in the 막힘 sheet', () => {
    const { mount: root } = mount({ edit: blockRepoC });

    el(root, '[data-op="blocked-open"]').click();

    const groups = Array.from(
      root.querySelectorAll('.pl-sheet-host .pl-blocked__group-head')
    ).map((node) => node.textContent?.replace(/\s+/g, ' ').trim());
    expect(groups).toEqual(['외부 작업 1', '공급자 1', '확인 필요 1']);
  });

  test('reveals and highlights the chosen card in its collapsed lane', async () => {
    const { mount: root } = mount({ edit: blockRepoC });
    el(root, '[data-op="lane-toggle"][data-lane="queue"]').click();
    const scroll = vi.fn();
    Element.prototype.scrollIntoView = scroll;
    el(root, '[data-op="blocked-open"]').click();

    el(
      root,
      `.pl-sheet-host [data-op="blocked-pick"][data-bead-id="C-2"]`
    ).click();
    await settle();

    const card = el(
      root,
      `[data-lane-body="queue"] .pl-row[data-bead-id="C-2"][data-root-dir="${REPO_C}"]`
    );
    expect(card.classList.contains('is-highlight')).toBe(true);
    expect(scroll).toHaveBeenCalledTimes(1);
    expect(root.querySelector('.pl-sheet-host .ui-sheet')).toBeNull();
  });

  test('counts live session_active beads in the 전체 toolbar', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces_state[0].counts.session_active = 2;
        fixture.workspaces_state[3].counts.session_active = 1;
      }
    });

    const chip = el(root, '.pl-toolbar--all .pl-stat--session');

    expect(chip.textContent?.replace(/\s+/g, ' ').trim()).toBe('세션 3');
  });
});

describe('레포 툴바 KPI (UI-58y2, UI-dbn6 P1-r2)', () => {
  test('names the first parallel row as 다음', () => {
    const { mount: root } = mount({ scope: REPO_A });

    const next = el(root, '.pl-toolbar--repo .pl-stat--next');

    expect(next.textContent?.replace(/\s+/g, ' ').trim()).toBe('다음 A-1');
  });

  test('flags live sessions over the slot cap', () => {
    const { mount: root } = mount({
      scope: REPO_A,
      edit: (fixture) => {
        fixture.workspaces_state[0].slots = 1;
        fixture.workspaces[0].attempts['A-7-1700000000-2'] = {
          attempt_id: 'A-7-1700000000-2',
          bead_id: 'A-3',
          status: 'running',
          started_at: NOW - 60_000
        };
      }
    });

    const cap = el(root, '.pl-toolbar--repo .pl-stat--overcap');

    expect(cap.textContent?.trim()).toBe('cap 초과');
  });

  test('labels the done-lane token total with the chosen period', () => {
    const { mount: root } = mount({
      scope: REPO_A,
      edit: (fixture) => {
        fixture.workspaces[0].done = [
          { bead_id: 'A-6', added_at: NOW - 60_000 }
        ];
        fixture.workspaces[0].attempts['A-6-1700000000-0'] = {
          attempt_id: 'A-6-1700000000-0',
          bead_id: 'A-6',
          status: 'done',
          started_at: NOW - 600_000,
          finished_at: NOW - 60_000,
          runner: 'claude',
          usage: {
            input_tokens: 1000,
            output_tokens: 500,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0
          }
        };
      }
    });

    const total = el(root, '.pl-toolbar--repo .pl-stat--tok');

    expect(total.textContent?.replace(/\s+/g, ' ').trim()).toMatch(
      /^오늘 완료 · 누적 /
    );
  });
});

describe('자동 머지 토글 상태 (UI-yk55 §5.1, UI-dbn6 P1-r2)', () => {
  /**
   * @param {(fixture: any) => void} patch
   * @returns {HTMLElement}
   */
  function toggle(patch) {
    const { mount: root } = mount({ scope: REPO_A, edit: patch });
    return el(root, '.pl-toolbar--repo .pl-automerge');
  }

  /** @param {any} fixture */
  const eligible = (fixture) => {
    fixture.workspaces[0].pr_observations['A-5'].gate = {
      enabled: true,
      tier: 'eligible',
      gate_badge: '머지 가능',
      base_badge: '최신',
      reason: null
    };
  };

  test('offers ▶ 자동 머지 with the eligible count while it is off', () => {
    const button = toggle(eligible);

    expect(button.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      '▶ 자동 머지 1'
    );
  });

  test('shows ⏸ 자동 머지 when it is armed with nothing queued', () => {
    const button = toggle((fixture) => {
      fixture.workspaces[0].auto_merge = true;
      fixture.workspaces_state[0].auto_merge = true;
    });

    expect(button.textContent?.replace(/\s+/g, ' ').trim()).toBe('⏸ 자동 머지');
  });

  test('shows ⏸ 자동 머지 중단 with the queue size while it drives', () => {
    const button = toggle((fixture) => {
      fixture.workspaces[0].auto_merge = true;
      fixture.workspaces_state[0].auto_merge = true;
      fixture.workspaces[0].merge_queue = [{ bead_id: 'A-5' }];
    });

    expect(button.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      '⏸ 자동 머지 중단 1'
    );
  });

  test('shows 일괄 머지 중단 with the queue size for manual entries', async () => {
    const { mount: root, send } = mount({
      scope: REPO_A,
      edit: (fixture) => {
        fixture.workspaces[0].merge_queue = [{ bead_id: 'A-5' }];
      }
    });
    const button = el(root, '.pl-toolbar--repo .pl-automerge');

    button.click();
    await settle();

    expect(button.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      '일괄 머지 중단 1'
    );
    expect(payloadsOf(send, 'worker-merge-queue-remove')).toEqual([
      { all: true, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });
});
