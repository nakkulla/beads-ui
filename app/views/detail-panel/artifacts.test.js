import { describe, expect, test } from 'vitest';
import { collectArtifacts } from './artifacts.js';

describe('views/detail-panel/artifacts', () => {
  test('uses the native top-level spec_id for the spec artifact', () => {
    expect(
      collectArtifacts({
        spec_id: ' docs/specs/native.md ',
        metadata: { spec_id: 'docs/specs/legacy.md' }
      })[0]
    ).toEqual({
      kind: 'spec',
      path: 'docs/specs/native.md',
      missing_state: null
    });
  });

  test('keeps metadata-only spec_id as a compatibility fallback', () => {
    expect(
      collectArtifacts({ metadata: { spec_id: ' docs/specs/legacy.md ' } })[0]
    ).toEqual({
      kind: 'spec',
      path: 'docs/specs/legacy.md',
      missing_state: null
    });
  });

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
