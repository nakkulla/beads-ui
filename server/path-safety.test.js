import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import {
  isSafeRelativeMarkdownPath,
  resolveRealpathWithinDocs,
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

describe('resolveRealpathWithinDocs (symlink-aware containment)', () => {
  /** @type {string} */
  let root;

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-pathsafety-'));
    fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
    fs.writeFileSync(path.join(root, 'docs', 'spec.md'), 'hi');
    fs.writeFileSync(path.join(root, 'secret.md'), 'secret');
    fs.symlinkSync(
      path.join(root, 'secret.md'),
      path.join(root, 'docs', 'escape.md')
    );
  });

  afterAll(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('resolves a real file inside docs/', () => {
    const result = resolveRealpathWithinDocs(root, 'docs/spec.md');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.path).toBe(
        fs.realpathSync(path.join(root, 'docs', 'spec.md'))
      );
    }
  });

  test('blocks a symlink escaping docs/ with status 403', () => {
    const result = resolveRealpathWithinDocs(root, 'docs/escape.md');
    expect(result).toEqual({ ok: false, status: 403 });
  });

  test('missing file yields status 404', () => {
    const result = resolveRealpathWithinDocs(root, 'docs/missing.md');
    expect(result).toEqual({ ok: false, status: 404 });
  });

  test('non-docs / non-md path yields status 400', () => {
    expect(resolveRealpathWithinDocs(root, 'secret.md')).toEqual({
      ok: false,
      status: 400
    });
    expect(resolveRealpathWithinDocs(root, 'docs/spec.txt')).toEqual({
      ok: false,
      status: 400
    });
  });
});
