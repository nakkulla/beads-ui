import { describe, expect, test } from 'vitest';
import { resolveSpecEvidence, resolveSpecId } from './spec-id.js';

describe('resolveSpecId', () => {
  test.each([
    [
      'top-level only',
      { spec_id: ' docs/specs/native.md ' },
      { path: 'docs/specs/native.md', source: 'native', conflict: false }
    ],
    [
      'retired metadata spec_id only',
      { metadata: { spec_id: ' docs/specs/legacy.md ' } },
      { path: '', source: 'none', conflict: false }
    ],
    [
      'retired metadata spec_path only',
      { metadata: { spec_path: 'docs/specs/draft.md' } },
      { path: '', source: 'none', conflict: false }
    ],
    [
      'differing native and retired metadata spec_id',
      {
        spec_id: 'docs/specs/native.md',
        metadata: { spec_id: 'docs/specs/legacy.md' }
      },
      { path: 'docs/specs/native.md', source: 'native', conflict: false }
    ],
    [
      'blank and non-string',
      { spec_id: '   ', metadata: { spec_id: 42 } },
      { path: '', source: 'none', conflict: false }
    ],
    ['missing issue', null, { path: '', source: 'none', conflict: false }]
  ])('%s', (_name, issue, expected) => {
    expect(resolveSpecId(issue)).toEqual(expected);
  });
});

const RECEIPT = 'codex@' + 'a'.repeat(40);
const SKIPPED_RECEIPT = 'skipped@' + 'b'.repeat(40);

describe('resolveSpecEvidence', () => {
  test('reports published for a spec_id with a valid receipt', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/published.md',
      source: 'native',
      conflict: false,
      evidence: 'published',
      skipped: false
    });
  });

  test('reports none for a retired metadata-only spec_id even under a valid receipt', () => {
    const issue = {
      metadata: { spec_id: 'docs/specs/legacy.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: '',
      source: 'none',
      conflict: false,
      evidence: 'none',
      skipped: false
    });
  });

  test('reports draft for a spec_id whose receipt is absent', () => {
    const issue = { spec_id: 'docs/specs/awaiting.md' };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/awaiting.md',
      source: 'native',
      conflict: false,
      evidence: 'draft',
      skipped: false
    });
  });

  test.each([
    ['a short sha', 'codex@abc'],
    ['a missing reviewer token', '@' + 'a'.repeat(40)],
    ['a sha with a non-hex character', 'codex@' + 'z'.repeat(40)],
    ['a bare reviewer token', 'codex'],
    ['a blank receipt', '   ']
  ])('reports draft for a spec_id whose receipt has %s', (_name, review) => {
    const issue = {
      spec_id: 'docs/specs/awaiting.md',
      metadata: { spec_review: review }
    };

    expect(resolveSpecEvidence(issue).evidence).toEqual('draft');
  });

  test('reports none for a retired spec_path-only row even under a valid receipt', () => {
    const issue = {
      metadata: { spec_path: 'docs/specs/draft.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: '',
      source: 'none',
      conflict: false,
      evidence: 'none',
      skipped: false
    });
  });

  test('ignores a retired spec_path beside a published spec_id', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_path: 'docs/specs/draft.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/published.md',
      source: 'native',
      conflict: false,
      evidence: 'published',
      skipped: false
    });
  });

  test.each([
    ['no spec_id', { metadata: { route: 'spec_backed' } }],
    ['retired spec_path only', { metadata: { spec_path: 'docs/draft.md' } }],
    ['a receipt with no path at all', { metadata: { spec_review: RECEIPT } }],
    ['missing issue', null]
  ])('reports none for %s', (_name, issue) => {
    expect(resolveSpecEvidence(issue)).toEqual({
      path: '',
      source: 'none',
      conflict: false,
      evidence: 'none',
      skipped: expect.any(Boolean)
    });
  });

  test('never flags conflict for a differing retired metadata spec_id', () => {
    const issue = {
      spec_id: 'docs/specs/native.md',
      metadata: { spec_id: 'docs/specs/legacy.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/native.md',
      source: 'native',
      conflict: false,
      evidence: 'published',
      skipped: false
    });
  });

  test('flags skipped for a valid skipped@ receipt', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_review: SKIPPED_RECEIPT }
    };

    expect(resolveSpecEvidence(issue).skipped).toEqual(true);
  });

  test('leaves skipped false for a valid reviewer receipt', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue).skipped).toEqual(false);
  });

  test('leaves skipped false for a malformed skipped receipt', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_review: 'skipped@short' }
    };

    expect(resolveSpecEvidence(issue).skipped).toEqual(false);
  });
});
