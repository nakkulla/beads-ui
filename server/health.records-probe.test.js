import { describe, expect, test, vi } from 'vitest';

// The probe's own failure mode is what this file fixes, so the module it asks
// is replaced by one that cannot answer (record-timeline-retention §8.3).
vi.mock('./worker/record-retention.js', () => ({
  recordMigrationPending: () => {
    throw new Error('record migration state unreadable');
  }
}));

const { defaultRecordsProbe } = await import('./health.js');

describe('health records probe', () => {
  test('reports not-ready when the migration state cannot be read', () => {
    const ready = defaultRecordsProbe('/tmp/example-workspace/project-a');

    expect(ready).toBe(false);
  });
});
