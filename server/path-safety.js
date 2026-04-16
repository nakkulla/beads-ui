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
