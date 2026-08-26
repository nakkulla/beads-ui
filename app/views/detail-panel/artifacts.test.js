import { describe, expect, test } from 'vitest';
import { collectArtifacts } from './artifacts.js';

const RECEIPT = 'codex@' + 'a'.repeat(40);

describe('views/detail-panel/artifacts', () => {
  test('uses the native top-level spec_id for the spec artifact', () => {
    expect(
      collectArtifacts({
        spec_id: ' docs/specs/native.md ',
        metadata: { spec_id: 'docs/specs/legacy.md', spec_review: RECEIPT }
      })[0]
    ).toEqual({
      kind: 'spec',
      path: 'docs/specs/native.md',
      missing_state: null
    });
  });

  test('keeps metadata-only spec_id as a compatibility fallback', () => {
    expect(
      collectArtifacts({
        metadata: { spec_id: ' docs/specs/legacy.md ', spec_review: RECEIPT }
      })[0]
    ).toEqual({
      kind: 'spec',
      path: 'docs/specs/legacy.md',
      missing_state: null
    });
  });

  test('marks a metadata spec_path without spec_id as a draft', () => {
    const rows = collectArtifacts({
      metadata: { spec_path: ' docs/specs/draft.md ' }
    });

    expect(rows).toEqual([
      {
        kind: 'spec',
        path: 'docs/specs/draft.md',
        missing_state: 'spec_draft'
      }
    ]);
  });

  test('keeps only the published row when spec_id and spec_path disagree', () => {
    const rows = collectArtifacts({
      spec_id: 'docs/specs/published.md',
      metadata: { spec_path: 'docs/specs/draft.md', spec_review: RECEIPT }
    });

    expect(rows).toEqual([
      {
        kind: 'spec',
        path: 'docs/specs/published.md',
        missing_state: null
      }
    ]);
  });

  test('marks a spec_id awaiting its review receipt as a draft', () => {
    const rows = collectArtifacts({ spec_id: 'docs/specs/awaiting.md' });

    expect(rows).toEqual([
      {
        kind: 'spec',
        path: 'docs/specs/awaiting.md',
        missing_state: 'spec_draft'
      }
    ]);
  });

  test('marks a spec_id with a malformed receipt as a draft', () => {
    const rows = collectArtifacts({
      spec_id: 'docs/specs/awaiting.md',
      metadata: { spec_review: 'codex@abc' }
    });

    expect(rows[0].missing_state).toEqual('spec_draft');
  });

  test('adds no spec row when neither spec_id nor spec_path exists', () => {
    const rows = collectArtifacts({ metadata: { route: 'quick_fix' } });

    expect(rows).toEqual([]);
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
