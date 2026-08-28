import { describe, expect, test } from 'vitest';
import { specAfterBlockerActive } from './spec-after-blocker.js';

describe('specAfterBlockerActive (UI-svh6 §7)', () => {
  test('accepts the label on a Bead that still has a blocker', () => {
    const labels = ['spec-after-blocker'];

    const result = specAfterBlockerActive(labels, ['DEP-9']);

    expect(result).toBe(true);
  });

  test('rejects the label once no blocker is left', () => {
    const labels = ['spec-after-blocker'];

    const result = specAfterBlockerActive(labels, []);

    expect(result).toBe(false);
  });

  test('rejects a blocked Bead carrying no label', () => {
    const labels = ['worker-serial'];

    const result = specAfterBlockerActive(labels, ['DEP-9']);

    expect(result).toBe(false);
  });

  test('rejects a non-array labels payload', () => {
    const labels = 'spec-after-blocker';

    const result = specAfterBlockerActive(labels, ['DEP-9']);

    expect(result).toBe(false);
  });

  test('rejects a non-array blocked_by payload', () => {
    const labels = ['spec-after-blocker'];

    const result = specAfterBlockerActive(labels, 'DEP-9');

    expect(result).toBe(false);
  });

  test('reads past non-string label entries', () => {
    const labels = [7, null, 'spec-after-blocker'];

    const result = specAfterBlockerActive(labels, ['DEP-9']);

    expect(result).toBe(true);
  });
});
