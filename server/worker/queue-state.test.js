import { describe, expect, test, vi } from 'vitest';
import { createQueueState } from './queue-state.js';

describe('queue-state', () => {
  test('normalizes bd show array and reads waiting cards', async () => {
    const run_bd_json_impl = vi.fn(async () => [
      {
        id: 'UI-A',
        spec_id: 'docs/spec.md',
        metadata: { worker_lane: 'waiting', worker_queue_sort_key: '2000' }
      },
      {
        id: 'UI-B',
        spec_id: 'docs/spec.md',
        metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' }
      }
    ]);
    const state = createQueueState({ cwd: '/repo', run_bd_json_impl });

    const waiting = await state.listWaitingCards();

    expect(waiting.map((card) => card.id)).toEqual(['UI-B', 'UI-A']);
    expect(run_bd_json_impl).toHaveBeenCalledWith(['list', '--json'], {
      cwd: '/repo'
    });
  });

  test('moves card to waiting with lane and sort metadata', async () => {
    const run_bd_impl = vi.fn(async () => ({
      code: 0,
      stdout: '',
      stderr: ''
    }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.moveToWaiting('UI-A', 3000);

    expect(run_bd_impl).toHaveBeenCalledWith(
      [
        'update',
        'UI-A',
        '--set-metadata',
        'worker_lane=waiting',
        '--set-metadata',
        'worker_queue_sort_key=3000'
      ],
      { cwd: '/repo' }
    );
  });

  test('persists worker override metadata', async () => {
    const run_bd_impl = vi.fn(async () => ({
      code: 0,
      stdout: '',
      stderr: ''
    }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.setWorkerOverrides('UI-A', {
      worker_parallel: 'true',
      worker_model: 'gpt-5.4',
      worker_effort: 'medium'
    });

    expect(run_bd_impl).toHaveBeenCalledWith(
      [
        'update',
        'UI-A',
        '--set-metadata',
        'worker_parallel=true',
        '--set-metadata',
        'worker_model=gpt-5.4',
        '--set-metadata',
        'worker_effort=medium'
      ],
      { cwd: '/repo' }
    );
  });

  test('clears PR metadata when no PR is linked', async () => {
    const run_bd_impl = vi.fn(async () => ({
      code: 0,
      stdout: '',
      stderr: ''
    }));
    const state = createQueueState({ cwd: '/repo', run_bd_impl });

    await state.cachePrLink('UI-A', null);

    expect(run_bd_impl).toHaveBeenCalledWith(
      [
        'update',
        'UI-A',
        '--unset-metadata',
        'pr_number',
        '--unset-metadata',
        'pr_url'
      ],
      { cwd: '/repo' }
    );
  });
});
