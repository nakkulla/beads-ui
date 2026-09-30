import { afterEach, describe, expect, test } from 'vitest';
import { buildLanes } from '../../model/lane-model.js';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

/**
 * @param {Parameters<typeof mountPipeline>[0]} [options]
 */
function mount(options) {
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

const REPO_A = '/fixture/repo-a';
const REPO_B = '/fixture/repo-b';

const EXEC_DEFAULTS = {
  supported: true,
  schema_version: 1,
  source_commit: 'abc',
  digest: 'd',
  session: { impl_runtime: 'claude' },
  orchestration: {
    runtime: 'claude',
    model: 'sonnet',
    model_id: 'claude-sonnet',
    effort: null,
    speed: null
  }
};

describe('pipeline card operations (UI-dbn6 §3.4·§5)', () => {
  test('sends worker-queue-place with root_dir and expected_revision from the place sheet', async () => {
    const { mount: root, send } = mount();
    el(root, '[data-op="place-sheet"][data-bead-id="A-10"]').click();

    el(
      root,
      '.pl-sheet-host [data-op="queue-op"][data-queue-op="place"]'
    ).click();
    await settle();

    expect(payloadsOf(send, 'worker-queue-place')).toEqual([
      { bead_id: 'A-10', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends no discard when the confirmation is declined', async () => {
    const { mount: root, send, confirm } = mount({ confirm: () => false });
    el(root, '[data-op="ops-sheet"][data-bead-id="A-5"]').click();

    el(root, '.pl-sheet-host [data-op="discard"]').click();
    await settle();

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(payloadsOf(send, 'worker-discard')).toEqual([]);
  });

  test('sends the discard after the confirmation is accepted', async () => {
    const { mount: root, send } = mount({ confirm: () => true });
    el(root, '[data-op="ops-sheet"][data-bead-id="A-5"]').click();

    el(root, '.pl-sheet-host [data-op="discard"]').click();
    await settle();

    expect(payloadsOf(send, 'worker-discard')).toEqual([
      { bead_id: 'A-5', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('draws neither a child rollup nor a carryover chip', () => {
    const { mount: root } = mount({
      buildLanes: (
        /** @type {any} */ rows,
        /** @type {any} */ states,
        /** @type {any} */ options
      ) => {
        const model = buildLanes(rows, states, options);
        for (const item of [...model.running, ...model.done]) {
          Object.assign(item, {
            rollup: {
              total: 2,
              done: 1,
              children: [{ id: `${item.id}.1`, title: 'child', status: 'open' }]
            },
            carried_to: ['Z-99']
          });
        }
        return model;
      }
    });

    const text = root.textContent || '';

    expect(root.querySelector('[data-roll-parent]')).toBeNull();
    expect(text).not.toContain('children');
    expect(text).not.toContain('Z-99');
  });

  test('draws [세션에서 해결] on a parked tile as tileResolveFields decides', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        for (const attempt of Object.values(fixture.workspaces[0].attempts)) {
          attempt.status = 'parked';
        }
      }
    });

    const tile = el(root, '.pl-tile[data-bead-id="A-4"]');

    expect(tile.querySelector('[data-op="resolve"]')).not.toBeNull();
  });

  test('omits [세션에서 해결] from a running tile', () => {
    const { mount: root } = mount();

    const tile = el(root, '.pl-tile[data-bead-id="A-4"]');

    expect(tile.querySelector('[data-op="resolve"]')).toBeNull();
  });

  test('keeps a detail-placement external action off the card', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[1].wait_reasons[0].actions.push({
          op: 'external_wait_resume',
          label: '[세션에서 이어가기]',
          placement: 'detail',
          payload: {
            root_dir: REPO_B,
            wait_id: 'w-0123456789ab',
            mode: 'session'
          }
        });
      }
    });
    el(root, '[data-op="ops-sheet"][data-bead-id="B-2"]').click();

    const ops = Array.from(
      root.querySelectorAll('[data-op="external-wait"]')
    ).map((node) => /** @type {HTMLElement} */ (node).dataset.externalWaitOp);

    expect(ops).toContain('external_wait_check');
    expect(ops).not.toContain('external_wait_resume');
  });

  test('sends no confirmed external action when the confirmation is declined', async () => {
    const { mount: root, send } = mount({ confirm: () => false });
    el(root, '[data-op="ops-sheet"][data-bead-id="B-2"]').click();

    el(
      root,
      '.pl-sheet-host [data-external-wait-op="external_wait_stop"]'
    ).click();
    await settle();

    expect(payloadsOf(send, 'external_wait_stop')).toEqual([]);
  });

  test('sends the confirmed external action after the confirmation is accepted', async () => {
    const { mount: root, send } = mount({ confirm: () => true });
    el(root, '[data-op="ops-sheet"][data-bead-id="B-2"]').click();

    el(
      root,
      '.pl-sheet-host [data-external-wait-op="external_wait_stop"]'
    ).click();
    await settle();

    expect(payloadsOf(send, 'external_wait_stop')).toEqual([
      { root_dir: REPO_B, wait_id: 'w-0123456789ab' }
    ]);
  });

  test('sends worker-resolve-in-session from [세션에서 해결] on a parked tile', async () => {
    const { mount: root, send } = mount({
      edit: (fixture) => {
        for (const attempt of Object.values(fixture.workspaces[0].attempts)) {
          Object.assign(attempt, {
            status: 'parked',
            cause: 'session_parked',
            cause_detail: {
              awaiting_user: 'implementation_question',
              summary: '사람 판단 대기'
            }
          });
        }
      }
    });

    el(root, '.pl-tile[data-bead-id="A-4"] [data-op="resolve"]').click();
    await settle();

    expect(payloadsOf(send, 'worker-resolve-in-session')).toEqual([
      { bead_id: 'A-4', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('renders an unready candidate without a queue action or drag handle', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        Object.assign(fixture.workspaces[0].runnable[0], {
          spec_id: '',
          published: false,
          route: 'spec_backed',
          spec_state: 'draft',
          has_description: false,
          awaiting_user: false,
          worker_ineligible: false
        });
      }
    });

    const card = el(root, '.pl-card[data-bead-id="A-10"]');
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('[data-op="place-sheet"]')
    );

    expect(card.dataset.dragKind).toBeUndefined();
    expect(place.disabled).toBe(true);
  });

  test('draws the orchestration fact on a waiting row', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        Object.assign(fixture.workspaces_state[0], {
          orchestration_model: 'sonnet',
          runner_catalog: { runtimes: {} },
          session_defaults: {},
          execution_defaults: EXEC_DEFAULTS
        });
        fixture.workspaces[0].bead_overlay['A-1'] = {
          route: 'spec_backed',
          metadata: {}
        };
      }
    });

    const row = el(root, '.pl-row[data-bead-id="A-1"]');

    expect(row.querySelector('.pl-facts')?.textContent).toContain('sonnet');
  });

  test('draws the attempt orchestration fact on a done row', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].attempts['A-6-1700000000-2'] = {
          attempt_id: 'A-6-1700000000-2',
          bead_id: 'A-6',
          status: 'done',
          started_at: NOW - 3_600_000,
          finished_at: NOW - 1_900_000,
          runner: 'codex',
          model: 'sonnet'
        };
      }
    });
    el(root, '[data-op="lane-toggle"][data-lane="done"]').click();

    const row = el(root, '.pl-row[data-bead-id="A-6"]');

    expect(row.textContent).toContain('codex · sonnet');
  });

  test.each([
    ['queue', '.pl-row', 'B-2'],
    ['running', '.pl-tile', 'B-4']
  ])(
    'draws external work on the %s consumer without a lane of its own',
    (_lane, selector, bead_id) => {
      const { mount: root } = mount({
        edit: (fixture) => {
          const row = fixture.workspaces[1];
          row.external_waits[0].bead_id = bead_id;
          row.wait_reasons[0].subject.bead_id = bead_id;
        }
      });

      const consumer = el(root, `${selector}[data-bead-id="${bead_id}"]`);

      expect(consumer.textContent).toContain('⏳ 외부 작업');
      expect(consumer.textContent).toContain('wallace 작업 42');
      expect(consumer.textContent).not.toContain('ssh wallace');
      expect(root.querySelector('[data-lane="external_wait"]')).toBeNull();
    }
  );

  test('redraws the orchestration fact when a push carries new session defaults', () => {
    const handle = mount({
      edit: (fixture) => {
        fixture.workspaces[0].bead_overlay['A-1'] = {
          route: 'spec_backed',
          metadata: {}
        };
      }
    });
    const rows = /** @type {Array<Record<string, any>>} */ (
      handle.monitor.get()
    );
    const states = handle.monitor.getWorkspacesState();
    const before = el(
      handle.mount,
      '.pl-row[data-bead-id="A-1"] .pl-facts'
    ).textContent;

    handle.monitor.set(
      rows,
      [
        {
          ...states[0],
          orchestration_model: 'opus',
          execution_defaults: {
            ...states[0].execution_defaults,
            orchestration: {
              ...states[0].execution_defaults.orchestration,
              model: 'opus',
              model_id: 'claude-opus'
            }
          }
        },
        ...states.slice(1)
      ],
      2
    );

    const facts = el(handle.mount, '.pl-row[data-bead-id="A-1"] .pl-facts');
    expect(before).toContain('sonnet');
    expect(facts.textContent).toContain('opus');
  });
});
