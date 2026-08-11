import { describe, expect, test } from 'vitest';
import { WORKER_SERIAL_LABEL, isWorkerSerial } from './worker-serial.js';

describe('worker serial label', () => {
  test('matches only the exact worker-serial label', () => {
    expect(WORKER_SERIAL_LABEL).toBe('worker-serial');
    expect(isWorkerSerial(['worker-serial'])).toBe(true);
    expect(isWorkerSerial(['team-worker-serial'])).toBe(false);
  });

  test('returns false for malformed label values', () => {
    expect(isWorkerSerial(null)).toBe(false);
    expect(isWorkerSerial('worker-serial')).toBe(false);
    expect(isWorkerSerial({ labels: ['worker-serial'] })).toBe(false);
  });

  test('stays independent from worker-ineligible', () => {
    expect(isWorkerSerial(['worker-ineligible'])).toBe(false);
    expect(isWorkerSerial(['worker-ineligible', 'worker-serial'])).toBe(true);
  });
});
