import { describe, expect, test } from 'vitest';
import { resolveSpecId } from './spec-id.js';

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
