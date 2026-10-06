import { afterEach, describe, expect, test, vi } from 'vitest';
import { formatClockLocal } from '../../utils/relative-time.js';
import { runExternalWaitAction } from './external-wait-action.js';
import {
  TAKEOVER_OVERCOMMIT_WARNING,
  bindTakeoverRatioSource,
  openTakeoverDialog,
  takeoverDefaults
} from './external-wait-takeover-dialog.js';

/**
 * @param {Record<string, any>} [patch]
 * @returns {any}
 */
function capacity(patch = {}) {
  return {
    reason: 'Resources',
    est_start: null,
    partition: 'debug',
    ahead: { jobs: 39, cpus: 624 },
    slurm: {
      cpu_alloc: 112,
      cpu_total: 112,
      mem_alloc_mb: 900 * 1024,
      mem_total_mb: 1000 * 1024
    },
    host: {
      name: 'wallace',
      cpus: 112,
      load1: 61.4,
      mem_available_mb: 902 * 1024
    },
    observed_at: '2026-10-06T05:54:00Z',
    ...patch
  };
}

/**
 * @param {Record<string, any>} [patch]
 * @returns {import('./external-wait-takeover-dialog.js').TakeoverMaterial}
 */
function material(patch = {}) {
  return {
    root_dir: '/repo',
    wait_id: 'w-0123456789ab',
    job_id: '249043',
    ssh_host: 'wallace',
    capacity: capacity(),
    ...patch
  };
}

/** @returns {HTMLDialogElement} */
function openDialog() {
  return /** @type {HTMLDialogElement} */ (
    document.querySelector('.takeover-dialog')
  );
}

/**
 * @param {string} selector
 * @returns {HTMLInputElement}
 */
function input(selector) {
  return /** @type {HTMLInputElement} */ (openDialog().querySelector(selector));
}

/** @returns {HTMLButtonElement} */
function confirmButton() {
  return /** @type {HTMLButtonElement} */ (
    openDialog().querySelector('.takeover-dialog__confirm')
  );
}

/**
 * @param {string} selector
 * @param {string} value
 */
function typeInto(selector, value) {
  const field = input(selector);
  field.value = value;
  field.dispatchEvent(new Event('input'));
}

afterEach(() => {
  document.body.innerHTML = '';
  bindTakeoverRatioSource(() => null);
});

describe('takeover dialog defaults (UI-qbgj §3.4)', () => {
  test('computes the defaults from the real headroom times the ratio', () => {
    const defaults = takeoverDefaults(capacity(), 80);

    expect(defaults).toEqual({ cpus: '40', mem_gb: '721' });
  });

  test('opens the fields with the bound server ratio', () => {
    bindTakeoverRatioSource(() => 50);

    void openTakeoverDialog(material(), { transport: vi.fn() });

    expect(input('.takeover-dialog__cpus').value).toBe('25');
    expect(input('.takeover-dialog__mem').value).toBe('451');
  });

  test('leaves both fields empty and the run button off without a host', () => {
    void openTakeoverDialog(material({ capacity: capacity({ host: null }) }), {
      transport: vi.fn()
    });

    expect(input('.takeover-dialog__cpus').value).toBe('');
    expect(input('.takeover-dialog__mem').value).toBe('');
    expect(confirmButton().disabled).toBe(true);
  });

  test('turns the run button on once a person fills both fields', () => {
    void openTakeoverDialog(material({ capacity: capacity({ host: null }) }), {
      transport: vi.fn()
    });

    typeInto('.takeover-dialog__cpus', '4');
    typeInto('.takeover-dialog__mem', '16');

    expect(confirmButton().disabled).toBe(false);
  });
});

describe('takeover dialog guidance (UI-qbgj §3.4)', () => {
  test('warns when the request goes past the Slurm unallocated share', () => {
    void openTakeoverDialog(material(), { transport: vi.fn() });

    expect(
      openDialog().querySelector('.takeover-dialog__warn')?.textContent?.trim()
    ).toBe(TAKEOVER_OVERCOMMIT_WARNING);
  });

  test('omits the warning while the request fits the unallocated share', () => {
    const roomy = capacity({
      slurm: {
        cpu_alloc: 0,
        cpu_total: 112,
        mem_alloc_mb: 0,
        mem_total_mb: 1000 * 1024
      }
    });

    void openTakeoverDialog(material({ capacity: roomy }), {
      transport: vi.fn()
    });

    expect(openDialog().querySelector('.takeover-dialog__warn')).toBeNull();
  });

  test('tells which Slurm job is cancelled and the core bound', () => {
    void openTakeoverDialog(material(), { transport: vi.fn() });

    expect(
      openDialog().querySelector('.takeover-dialog__guide')?.textContent
    ).toContain(
      '원 Slurm 작업 249043는 취소되고, 워크플로면 하위 단계까지 이 서버에서 40코어 안에서 돈다'
    );
  });

  test('tells when the capacity was read', () => {
    void openTakeoverDialog(material(), { transport: vi.fn() });

    expect(
      openDialog().querySelector('.takeover-dialog__guide')?.textContent
    ).toContain(`용량 확인 ${formatClockLocal('2026-10-06T05:54:00Z')}`);
  });
});

describe('takeover dialog request (UI-qbgj §3.4)', () => {
  test('sends the takeover with the chosen resources and closes on success', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true, jobs: [] });
    const adopt = vi.fn();
    const outcome = openTakeoverDialog(material(), { transport, adopt });

    typeInto('.takeover-dialog__cpus', '16');
    typeInto('.takeover-dialog__mem', '64');
    confirmButton().click();

    expect(transport).toHaveBeenCalledWith('external_wait_takeover', {
      root_dir: '/repo',
      wait_id: 'w-0123456789ab',
      cpus: 16,
      mem_gb: 64
    });
    expect(await outcome).toMatchObject({ sent: true, ok: true });
    expect(adopt).toHaveBeenCalledWith({ ok: true, jobs: [] });
    expect(document.querySelector('.takeover-dialog')).toBeNull();
  });

  test('keeps the dialog open with the server message on refusal', async () => {
    const transport = vi.fn().mockRejectedValue({
      code: 'insufficient_host_capacity',
      message: '서버 여유가 모자랍니다'
    });
    void openTakeoverDialog(material(), { transport });

    confirmButton().click();
    await vi.waitFor(() => {
      expect(
        openDialog().querySelector('.takeover-dialog__error')?.textContent
      ).toBe('서버 여유가 모자랍니다');
    });

    expect(confirmButton().disabled).toBe(false);
  });

  test('sends nothing when the person cancels', async () => {
    const transport = vi.fn();
    const outcome = openTakeoverDialog(material(), { transport });

    /** @type {HTMLButtonElement} */ (
      openDialog().querySelector('.takeover-dialog__cancel')
    ).click();

    expect(await outcome).toEqual({ sent: false, ok: false });
    expect(transport).not.toHaveBeenCalled();
  });

  test('opens the dialog from a run-now button through the shared click rule', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const button = document.createElement('button');
    button.dataset.externalWaitOp = 'external_wait_takeover';
    button.dataset.rootDir = '/repo';
    button.dataset.waitId = 'w-0123456789ab';
    button.dataset.takeover = JSON.stringify({
      job_id: '249043',
      ssh_host: 'wallace',
      capacity: capacity()
    });
    const sent = runExternalWaitAction(button, { transport });

    confirmButton().click();

    expect(await sent).toBe(true);
    expect(transport).toHaveBeenCalledWith('external_wait_takeover', {
      root_dir: '/repo',
      wait_id: 'w-0123456789ab',
      cpus: 40,
      mem_gb: 721
    });
  });
});
