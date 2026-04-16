import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  isSafeRelativeMarkdownPath,
  resolveWithinDocs
} from './path-safety.js';

describe('path-safety', () => {
  test('allows docs markdown paths', () => {
    expect(isSafeRelativeMarkdownPath('docs/spec.md')).toBe(true);
    expect(isSafeRelativeMarkdownPath('docs/nested/spec.md')).toBe(true);
  });

  test('rejects absolute paths', () => {
    expect(isSafeRelativeMarkdownPath('/tmp/spec.md')).toBe(false);
  });

  test('rejects traversal paths', () => {
    expect(isSafeRelativeMarkdownPath('docs/../secret.md')).toBe(false);
  });

  test('rejects non-markdown extensions', () => {
    expect(isSafeRelativeMarkdownPath('docs/spec.txt')).toBe(false);
  });

  test('rejects canonical resolutions outside workspace docs root', () => {
    const root_dir = path.resolve('/workspace');
    expect(resolveWithinDocs(root_dir, 'docs/spec.md')).toBe(
      path.resolve('/workspace/docs/spec.md')
    );
    expect(resolveWithinDocs(root_dir, 'docs/../../secret.md')).toBeNull();
  });
});
