import { afterEach, describe, expect, test, vi } from 'vitest';
import { createWorkerJobManager } from './jobs.js';

function createChildProcessStub() {
  /** @type {Record<string, (value?: unknown) => void>} */
  const listeners = {};

  return {
    /**
     * @param {'error' | 'close'} event_name
     * @param {(value?: unknown) => void} handler
     */
    on(event_name, handler) {
      listeners[event_name] = handler;
    },
    /**
     * @param {'error' | 'close'} event_name
     * @param {unknown} value
     */
    emit(event_name, value) {
      listeners[event_name]?.(value);
    }
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('worker job manager', () => {
  test('spawns codex with argv instead of interpolated shell command', async () => {
    const child = createChildProcessStub();
    const spawn_impl = vi.fn(() => child);
    const manager = createWorkerJobManager({ spawn_impl });

    const job = await manager.enqueueJob({
      command: 'pr-review',
      issueId: "UI-62lm'; touch /tmp/pwned",
      workspace: '/workspace',
      prNumber: 42
    });

    expect(job.status).toBe('running');
    expect(spawn_impl).toHaveBeenCalledWith(
      'codex',
      ['exec', '$pr-review 42'],
      expect.objectContaining({
        cwd: '/workspace'
      })
    );
  });
});
