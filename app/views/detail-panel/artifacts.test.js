import { describe, expect, test } from 'vitest';
import { collectArtifacts } from './artifacts.js';

describe('views/detail-panel/artifacts', () => {
  test('marks a reserved plan without authoring history as pending', () => {
    const rows = collectArtifacts({
      metadata: { plan_path: 'docs/plans/x.md' }
    });

    expect(rows).toEqual([
      {
        kind: 'plan',
        path: 'docs/plans/x.md',
        missing_state: 'plan_pending'
      }
    ]);
  });

  test('keeps a reviewed plan outside the pending state', () => {
    const rows = collectArtifacts({
      metadata: {
        plan_path: 'docs/plans/x.md',
        plan_review: 'skipped@123456789abc'
      }
    });

    expect(rows).toEqual([
      {
        kind: 'plan',
        path: 'docs/plans/x.md',
        missing_state: null
      }
    ]);
  });
});
