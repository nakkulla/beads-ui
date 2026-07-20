import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createDisplayPolicyStore } from '../data/display-policy-store.js';
import {
  createDisplaySettingsDialog,
  labelPillPatch,
  labelPillState
} from './display-settings-dialog.js';

/**
 * @param {Partial<Omit<import('../utils/label-policy.js').DisplayPolicy, 'chips'>> & { chips?: Partial<import('../utils/label-policy.js').DisplayPolicyChips> }} [overrides]
 * @returns {import('../utils/label-policy.js').DisplayPolicy}
 */
function makePolicy(overrides = {}) {
  const { chips: chip_overrides, ...rest } = overrides;
  return {
    revision: 0,
    hidden_labels: [],
    hidden_prefixes: [],
    visible_labels: [],
    ...rest,
    chips: {
      route: true,
      fast_track: true,
      pr: true,
      from: true,
      blocked: true,
      stepper: true,
      ...chip_overrides
    }
  };
}

describe('labelPillState', () => {
  test('reports a rendered label as shown', () => {
    expect(labelPillState('frontend', makePolicy())).toBe('shown');
  });

  test('reports an exact-hidden label', () => {
    const policy = makePolicy({ hidden_labels: ['pr'] });

    expect(labelPillState('pr', policy)).toBe('hidden_exact');
  });

  test('reports a prefix-hidden label', () => {
    const policy = makePolicy({ hidden_prefixes: ['reviewed:'] });

    expect(labelPillState('reviewed:spec', policy)).toBe('hidden_prefix');
  });

  test('reports a prefix-exempted label as shown', () => {
    const policy = makePolicy({
      hidden_prefixes: ['reviewed:'],
      visible_labels: ['reviewed:spec']
    });

    expect(labelPillState('reviewed:spec', policy)).toBe('shown');
  });
});

describe('labelPillPatch', () => {
  test('hides a shown label by exact rule', () => {
    const patch = labelPillPatch('frontend', makePolicy());

    expect(patch.hidden_labels).toEqual(['frontend']);
  });

  test('drops a stale visible entry when hiding a label', () => {
    const policy = makePolicy({ visible_labels: ['frontend'] });

    const patch = labelPillPatch('frontend', policy);

    expect(patch.visible_labels).toEqual([]);
  });

  test('unhides an exact-hidden label by dropping the rule', () => {
    const policy = makePolicy({ hidden_labels: ['pr', 'wip'] });

    const patch = labelPillPatch('pr', policy);

    expect(patch.hidden_labels).toEqual(['wip']);
  });

  test('exempts a prefix-hidden label instead of dropping the prefix rule', () => {
    const policy = makePolicy({ hidden_prefixes: ['reviewed:'] });

    const patch = labelPillPatch('reviewed:spec', policy);

    expect(patch.visible_labels).toEqual(['reviewed:spec']);
    expect(patch.hidden_labels).toBeUndefined();
  });
});

describe('views/display-settings-dialog', () => {
  /** @type {HTMLElement} */
  let mount;
  /** @type {ReturnType<typeof createDisplayPolicyStore>} */
  let store;

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    store = createDisplayPolicyStore();
  });

  /**
   * @param {{ transport?: any, labels?: string[] }} [options]
   */
  function openDialog(options = {}) {
    const transport =
      options.transport ||
      vi.fn(async () => ({ applied: true, conflict: false, policy: null }));
    const dialog = createDisplaySettingsDialog(mount, {
      policyStore: store,
      transport,
      labelOptions: () => options.labels || ['frontend', 'pr', 'reviewed:spec']
    });
    dialog.open();
    return { dialog, transport };
  }

  /**
   * @param {string} label
   * @returns {HTMLElement}
   */
  function pill(label) {
    return /** @type {HTMLElement} */ (
      document.querySelector(`.display-settings__pill[data-label="${label}"]`)
    );
  }

  test('reports a pending policy before the first snapshot', () => {
    openDialog();

    expect(document.body.textContent).toContain('표시 정책을 불러오는 중');
  });

  test('marks each pill with why it is hidden', () => {
    store.set(
      makePolicy({ hidden_labels: ['pr'], hidden_prefixes: ['reviewed:'] })
    );

    openDialog();

    expect(pill('frontend').dataset.state).toBe('shown');
    expect(pill('pr').dataset.state).toBe('hidden_exact');
    expect(pill('reviewed:spec').dataset.state).toBe('hidden_prefix');
  });

  test('sends the current revision as the CAS guard', async () => {
    store.set(makePolicy({ revision: 7 }));
    const { transport } = openDialog();

    pill('frontend').click();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith(
      'display-policy-set',
      expect.objectContaining({ expected_revision: 7 })
    );
  });

  test('hides a shown label on click', async () => {
    store.set(makePolicy());
    const { transport } = openDialog();

    pill('frontend').click();
    await Promise.resolve();

    expect(transport.mock.calls[0][1].policy.hidden_labels).toEqual([
      'frontend'
    ]);
  });

  test('exempts a prefix-hidden label on click', async () => {
    store.set(makePolicy({ hidden_prefixes: ['reviewed:'] }));
    const { transport } = openDialog();

    pill('reviewed:spec').click();
    await Promise.resolve();

    expect(transport.mock.calls[0][1].policy.visible_labels).toEqual([
      'reviewed:spec'
    ]);
  });

  test('adopts the policy the server returns', async () => {
    store.set(makePolicy());
    const applied = makePolicy({ revision: 1, hidden_labels: ['frontend'] });
    const transport = vi.fn(async () => ({
      applied: true,
      conflict: false,
      policy: applied
    }));
    openDialog({ transport });

    pill('frontend').click();
    await Promise.resolve();
    await Promise.resolve();

    expect(store.get()).toEqual(applied);
  });

  test('retries once against the revision a conflict reports', async () => {
    store.set(makePolicy({ revision: 0 }));
    const server_policy = makePolicy({ revision: 5 });
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        policy: server_policy
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        policy: makePolicy({ revision: 6, hidden_labels: ['frontend'] })
      });
    openDialog({ transport });

    pill('frontend').click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(transport.mock.calls[1][1].expected_revision).toBe(5);
  });

  test('does not retry a second time when the retry also conflicts', async () => {
    store.set(makePolicy({ revision: 0 }));
    const transport = vi.fn(async () => ({
      applied: false,
      conflict: true,
      policy: makePolicy({ revision: 5 })
    }));
    openDialog({ transport });

    pill('frontend').click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledTimes(2);
  });

  test('flips a chip toggle on change', async () => {
    store.set(makePolicy());
    const { transport } = openDialog();

    const box = /** @type {HTMLInputElement} */ (
      document.querySelector(
        '.display-settings__toggle input[data-chip="from"]'
      )
    );
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await Promise.resolve();

    expect(transport.mock.calls[0][1].policy.chips).toEqual({ from: false });
  });

  test('renders each chip toggle checked from the policy', () => {
    store.set(makePolicy({ chips: { stepper: false } }));

    openDialog();

    const box = /** @type {HTMLInputElement} */ (
      document.querySelector(
        '.display-settings__toggle input[data-chip="stepper"]'
      )
    );
    expect(box.checked).toBe(false);
  });

  test('removes a hidden prefix rule', async () => {
    store.set(makePolicy({ hidden_prefixes: ['reviewed:', 'skipped:'] }));
    const { transport } = openDialog();

    /** @type {HTMLElement} */ (
      document.querySelector('.display-settings__prefix-remove')
    ).click();
    await Promise.resolve();

    expect(transport.mock.calls[0][1].policy.hidden_prefixes).toEqual([
      'skipped:'
    ]);
  });

  test('adds a typed hidden prefix', async () => {
    store.set(makePolicy());
    const { transport } = openDialog();

    const input = /** @type {HTMLInputElement} */ (
      document.querySelector('.display-settings__prefix-input')
    );
    input.value = 'area:';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLElement} */ (
      document.querySelector('.display-settings__prefix-add button')
    ).click();
    await Promise.resolve();

    expect(transport.mock.calls[0][1].policy.hidden_prefixes).toEqual([
      'area:'
    ]);
  });

  test('ignores a blank prefix', async () => {
    store.set(makePolicy());
    const { transport } = openDialog();

    /** @type {HTMLElement} */ (
      document.querySelector('.display-settings__prefix-add button')
    ).click();
    await Promise.resolve();

    expect(transport).not.toHaveBeenCalled();
  });

  test('re-renders when a pushed snapshot changes the policy', async () => {
    store.set(makePolicy());
    openDialog();

    store.set(makePolicy({ revision: 1, hidden_labels: ['frontend'] }));

    expect(pill('frontend').dataset.state).toBe('hidden_exact');
  });
});
