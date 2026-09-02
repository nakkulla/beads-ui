import { describe, expect, test } from 'vitest';
import { collectArtifacts } from './artifacts.js';

describe('views/detail-panel/artifacts', () => {
  test('uses the server spec document verdict', () => {
    const rows = collectArtifacts({
      workflow: {
        stages: {
          spec: {
            doc: { path: 'docs/specs/native.md', missing_state: null }
          }
        }
      }
    });

    expect(rows).toEqual([
      {
        kind: 'spec',
        path: 'docs/specs/native.md',
        missing_state: null
      }
    ]);
  });

  test('omits the spec row when its stage has no document', () => {
    const rows = collectArtifacts({
      workflow: { stages: { spec: {} } }
    });

    expect(rows).toEqual([]);
  });

  test('ignores retired metadata spec paths', () => {
    const rows = collectArtifacts({
      metadata: { spec_path: 'docs/specs/draft.md' },
      workflow: { stages: { spec: {} } }
    });

    expect(rows).toEqual([]);
  });

  test('prefers the server verdict over conflicting issue fields', () => {
    const rows = collectArtifacts({
      spec_id: 'docs/specs/ignored.md',
      workflow: {
        stages: {
          spec: {
            doc: { path: 'docs/specs/published.md', missing_state: null }
          }
        }
      }
    });

    expect(rows[0]?.path).toBe('docs/specs/published.md');
  });

  test('carries the server spec draft state', () => {
    const rows = collectArtifacts({
      workflow: {
        stages: {
          spec: {
            doc: {
              path: 'docs/specs/awaiting.md',
              missing_state: 'spec_draft'
            }
          }
        }
      }
    });

    expect(rows[0]?.missing_state).toBe('spec_draft');
  });

  test('keeps the spec path exactly as enriched by the server', () => {
    const rows = collectArtifacts({
      workflow: {
        stages: {
          spec: {
            doc: { path: ' docs/specs/awaiting.md ', missing_state: null }
          }
        }
      }
    });

    expect(rows[0]?.path).toBe(' docs/specs/awaiting.md ');
  });

  test('omits the spec row when the spec stage is absent', () => {
    const rows = collectArtifacts({ workflow: { stages: {} } });

    expect(rows).toEqual([]);
  });

  test('carries the server plan pending state', () => {
    const rows = collectArtifacts({
      workflow: {
        stages: {
          plan: {
            doc: {
              path: 'docs/plans/x.md',
              missing_state: 'plan_pending'
            }
          }
        }
      }
    });

    expect(rows).toEqual([
      {
        kind: 'plan',
        path: 'docs/plans/x.md',
        missing_state: 'plan_pending'
      }
    ]);
  });

  test('carries the server authored-plan verdict', () => {
    const rows = collectArtifacts({
      workflow: {
        stages: {
          plan: { doc: { path: 'docs/plans/x.md', missing_state: null } }
        }
      }
    });

    expect(rows[0]?.missing_state).toBeNull();
  });

  test('omits every row when workflow is absent', () => {
    const rows = collectArtifacts({
      metadata: { plan_path: 'docs/plans/x.md' }
    });

    expect(rows).toEqual([]);
  });
});
