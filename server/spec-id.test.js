import { describe, expect, test } from 'vitest';
import {
  resolveSpecDraft,
  resolveSpecEvidence,
  resolveSpecId
} from './spec-id.js';

describe('resolveSpecId', () => {
  test.each([
    [
      'top-level only',
      { spec_id: ' docs/specs/native.md ' },
      { path: 'docs/specs/native.md', source: 'native', conflict: false }
    ],
    [
      'metadata only',
      { metadata: { spec_id: ' docs/specs/legacy.md ' } },
      { path: 'docs/specs/legacy.md', source: 'metadata', conflict: false }
    ],
    [
      'equal dual',
      {
        spec_id: ' docs/specs/same.md ',
        metadata: { spec_id: 'docs/specs/same.md' }
      },
      { path: 'docs/specs/same.md', source: 'native', conflict: false }
    ],
    [
      'conflicting dual',
      {
        spec_id: 'docs/specs/native.md',
        metadata: { spec_id: 'docs/specs/legacy.md' }
      },
      { path: 'docs/specs/native.md', source: 'native', conflict: true }
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

describe('resolveSpecDraft', () => {
  test('resolves a metadata spec_path as a draft when no spec_id exists', () => {
    const issue = { metadata: { spec_path: ' docs/specs/draft.md ' } };

    expect(resolveSpecDraft(issue)).toEqual({
      path: 'docs/specs/draft.md',
      source: 'draft',
      conflict: false
    });
  });

  test('lets a published spec_id win over a differing spec_path', () => {
    const issue = {
      spec_id: 'docs/specs/published.md',
      metadata: { spec_path: 'docs/specs/draft.md' }
    };

    expect(resolveSpecDraft(issue)).toEqual({
      path: 'docs/specs/published.md',
      source: 'native',
      conflict: false
    });
  });

  test('lets a metadata spec_id win over a differing spec_path', () => {
    const issue = {
      metadata: {
        spec_id: 'docs/specs/published.md',
        spec_path: 'docs/specs/draft.md'
      }
    };

    expect(resolveSpecDraft(issue)).toEqual({
      path: 'docs/specs/published.md',
      source: 'metadata',
      conflict: false
    });
  });

  test.each([
    ['blank spec_path', { metadata: { spec_path: '   ' } }],
    ['non-string spec_path', { metadata: { spec_path: 42 } }],
    ['missing issue', null]
  ])('reports none for %s', (_name, issue) => {
    expect(resolveSpecDraft(issue)).toEqual({
      path: '',
      source: 'none',
      conflict: false
    });
  });

  test('keeps resolveSpecId blind to spec_path', () => {
    const issue = { metadata: { spec_path: 'docs/specs/draft.md' } };

    expect(resolveSpecId(issue)).toEqual({
      path: '',
      source: 'none',
      conflict: false
    });
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

  test('reports published for a metadata-only spec_id with a valid receipt', () => {
    const issue = {
      metadata: { spec_id: 'docs/specs/legacy.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/legacy.md',
      source: 'metadata',
      conflict: false,
      evidence: 'published',
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

  test('reports draft with the draft path when only spec_path exists', () => {
    const issue = { metadata: { spec_path: ' docs/specs/draft.md ' } };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/draft.md',
      source: 'draft',
      conflict: false,
      evidence: 'draft',
      skipped: false
    });
  });

  test('keeps a spec_path-only row draft even under a valid receipt', () => {
    const issue = {
      metadata: { spec_path: 'docs/specs/draft.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/draft.md',
      source: 'draft',
      conflict: false,
      evidence: 'draft',
      skipped: false
    });
  });

  test('prefers the published path when spec_id and spec_path differ', () => {
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
    ['neither key', { metadata: { route: 'spec_backed' } }],
    ['blank spec_path', { metadata: { spec_path: '   ' } }],
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

  test('carries the conflicting-dual flag through unchanged', () => {
    const issue = {
      spec_id: 'docs/specs/native.md',
      metadata: { spec_id: 'docs/specs/legacy.md', spec_review: RECEIPT }
    };

    expect(resolveSpecEvidence(issue)).toEqual({
      path: 'docs/specs/native.md',
      source: 'native',
      conflict: true,
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
