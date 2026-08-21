import { describe, expect, test } from 'vitest';
import { resolveSpecDraft, resolveSpecId } from './spec-id.js';

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
