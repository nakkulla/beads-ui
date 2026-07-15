import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {string} target_path
 * @returns {boolean}
 */
export function isSafeRelativeMarkdownPath(target_path) {
  if (typeof target_path !== 'string' || target_path.length === 0) {
    return false;
  }
  if (path.isAbsolute(target_path)) {
    return false;
  }
  if (!target_path.startsWith('docs/')) {
    return false;
  }
  if (!target_path.endsWith('.md')) {
    return false;
  }
  const segments = target_path.split('/');
  return !segments.includes('..');
}

/**
 * @param {string} root_dir
 * @param {string} target_path
 * @returns {string | null}
 */
export function resolveWithinDocs(root_dir, target_path) {
  if (!isSafeRelativeMarkdownPath(target_path)) {
    return null;
  }
  const docs_root = path.resolve(root_dir, 'docs');
  const resolved = path.resolve(root_dir, target_path);
  if (
    resolved === docs_root ||
    resolved.startsWith(`${docs_root}${path.sep}`)
  ) {
    return resolved;
  }
  return null;
}

/**
 * Resolve `target_path` under `<root_dir>/docs` with symlink-aware containment.
 *
 * Unlike {@link resolveWithinDocs} (which is purely lexical), this canonicalizes
 * the real filesystem path via `fs.realpathSync` and verifies the CANONICAL path
 * still lives inside the canonical `<root_dir>/docs` directory. A symlink placed
 * inside `docs/` that points outside the workspace is therefore rejected.
 *
 * Status semantics:
 * - 400 — the lexical path is not a safe relative markdown path under `docs/`.
 * - 404 — the target (or the `docs/` root) does not exist on disk.
 * - 403 — the target exists but its canonical path escapes `<root_dir>/docs`.
 *
 * @param {string} root_dir - Absolute workspace root directory.
 * @param {string} target_path - Workspace-relative path (e.g. `docs/spec.md`).
 * @returns {{ ok: true, path: string } | { ok: false, status: 400 | 403 | 404 }}
 */
export function resolveRealpathWithinDocs(root_dir, target_path) {
  const lexical = resolveWithinDocs(root_dir, target_path);
  if (!lexical) {
    return { ok: false, status: 400 };
  }

  const docs_root = path.resolve(root_dir, 'docs');
  let docs_real;
  try {
    docs_real = fs.realpathSync(docs_root);
  } catch {
    // No docs/ directory → treat as a missing target rather than an escape.
    return { ok: false, status: 404 };
  }

  let real;
  try {
    real = fs.realpathSync(lexical);
  } catch {
    return { ok: false, status: 404 };
  }

  if (real !== docs_real && !real.startsWith(`${docs_real}${path.sep}`)) {
    return { ok: false, status: 403 };
  }

  return { ok: true, path: real };
}
