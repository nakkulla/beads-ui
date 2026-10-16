import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

const { runBdJsonProjected } = await import('../bd.js');
const { __resetWorkerAttachmentsForTest, checkWorkerQueueAdmission } =
  await import('./attach.js');

const ROOT = '/tmp/example-workspace/unattached';

afterEach(() => {
  vi.mocked(runBdJsonProjected).mockReset();
  __resetWorkerAttachmentsForTest();
});

describe('unattached queue admission (UI-lbm5 §4.2)', () => {
  test('admits a worker-ineligible Bead into the queue without an attachment', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'UI-1', labels: ['worker-ineligible'] }
      })
    );

    const result = await checkWorkerQueueAdmission(ROOT, 'UI-1');

    expect(result).toEqual({ ok: true });
  });

  test('refuses the placement when the Bead cannot be read', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: false,
        error: { code: 'bd_exit_error', message: 'boom' }
      })
    );

    const result = await checkWorkerQueueAdmission(ROOT, 'UI-1');

    expect(result).toEqual({ ok: false, reason: 'bd_snapshot_failed' });
  });
});
