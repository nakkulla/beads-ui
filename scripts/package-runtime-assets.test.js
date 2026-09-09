/**
 * Published package completeness (UI-7732 §4.2). A checkout runs from source,
 * so a green suite here says nothing about whether an installed tarball can
 * resolve its own runtime imports. This walks the real `npm pack` file set and
 * proves the runtime graph closes inside it.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PACK_TIMEOUT_MS = 120000;
const RUNTIME_JS_ROOTS = ['server/', 'bin/', 'app/'];
const REQUIRED_ENTRIES = [
  'bin/bdui.js',
  'app/index.html',
  'app/styles.css',
  'app/protocol.js',
  'server/index.js',
  // Read with fs at runtime (server/worker/*), invisible to the import walk.
  'generated/contracts/execution-defaults.json',
  'generated/contracts/execution-defaults.provenance.json',
  'generated/contracts/quick-fix-handoff.json',
  'generated/contracts/quick-fix-handoff.provenance.json',
  'generated/contracts/repo-operation-policy.json',
  'generated/contracts/repo-operation-policy.provenance.json'
];

/**
 * Build outputs `prepack` creates, which `package.json#files` declares but this
 * check's `--ignore-scripts` pack never produces. They are untracked
 * (UI-47y7), so a fresh checkout may not have them on disk at all: assert the
 * DECLARATION for these two and exclude them from the on-disk pack set.
 */
const PREPACK_OUTPUTS = ['app/main.bundle.js', 'app/main.bundle.js.map'];

/**
 * Collect the paths `npm pack` would actually publish.
 *
 * Runs with `--dry-run --ignore-scripts` so no tarball is written and the
 * `prepack` build never fires. A non-zero exit or unparsable payload fails the
 * check rather than degrading into an empty set.
 *
 * @returns {Set<string>}
 */
function publishedPaths() {
  const stdout = execFileSync(
    'npm',
    ['pack', '--dry-run', '--ignore-scripts', '--json'],
    { cwd: REPO_ROOT, encoding: 'utf8', timeout: PACK_TIMEOUT_MS }
  );

  const parsed = JSON.parse(stdout);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('npm pack --json did not return a package entry');
  }
  const files = parsed[0].files;
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('npm pack --json returned no file list');
  }

  /** @type {Set<string>} */
  const paths = new Set();
  for (const entry of files) {
    if (!entry || typeof entry.path !== 'string') {
      throw new Error('npm pack --json returned a file entry without a path');
    }
    paths.add(entry.path);
  }
  return paths;
}

const PUBLISHED = publishedPaths();

/**
 * Relative module specifiers a module needs at runtime.
 *
 * Uses the TypeScript AST so JSDoc `@import` type comments are not counted as
 * runtime edges, and skips `node:` builtins and bare package specifiers.
 *
 * @param {string} rel_path
 * @returns {string[]}
 */
function runtimeRelativeSpecifiers(rel_path) {
  const text = readFileSync(path.join(REPO_ROOT, rel_path), 'utf8');
  const source = ts.createSourceFile(
    rel_path,
    text,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS
  );

  /** @type {string[]} */
  const specifiers = [];

  /**
   * @param {string | undefined} value
   */
  function collect(value) {
    if (value && value.startsWith('.')) {
      specifiers.push(value);
    }
  }

  /**
   * @param {ts.Node} node
   */
  function walk(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      collect(node.moduleSpecifier.text);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      const [first] = node.arguments;
      if (first && ts.isStringLiteralLike(first)) {
        collect(first.text);
      }
    }
    ts.forEachChild(node, walk);
  }

  walk(source);
  return specifiers;
}

/**
 * Resolve a relative specifier against its importer, as a repo-relative path.
 *
 * @param {string} from_rel
 * @param {string} specifier
 */
function resolveSpecifier(from_rel, specifier) {
  return path.posix.normalize(
    path.posix.join(path.posix.dirname(from_rel), specifier)
  );
}

/**
 * Local resource references of an HTML document, query/hash stripped.
 *
 * @param {string} html
 * @returns {string[]}
 */
function htmlLocalResources(html) {
  /** @type {string[]} */
  const references = [];
  const pattern =
    /<(?:link[^>]*?href|script[^>]*?src)\s*=\s*["']([^"']+)["'][^>]*>/g;
  let match = pattern.exec(html);
  while (match) {
    const raw = match[1];
    if (!/^[a-z]+:|^\/\//i.test(raw)) {
      references.push(raw.split('#')[0].split('?')[0]);
    }
    match = pattern.exec(html);
  }
  return references;
}

describe('published package file set', () => {
  test('includes the executable entry points and static assets', () => {
    const missing = REQUIRED_ENTRIES.filter((entry) => !PUBLISHED.has(entry));

    expect(missing).toEqual([]);
  });

  test('resolves every runtime relative import inside the package', () => {
    const modules = [...PUBLISHED].filter(
      (entry) =>
        entry.endsWith('.js') &&
        !entry.endsWith('.bundle.js') &&
        RUNTIME_JS_ROOTS.some((root) => entry.startsWith(root))
    );

    /** @type {string[]} */
    const unresolved = [];
    for (const rel_path of modules) {
      for (const specifier of runtimeRelativeSpecifiers(rel_path)) {
        const target = resolveSpecifier(rel_path, specifier);
        if (!PUBLISHED.has(target)) {
          unresolved.push(`${rel_path} -> ${target}`);
        }
      }
    }

    expect({ count: modules.length, unresolved }).toEqual({
      count: modules.length,
      unresolved: []
    });
  });

  test('declares the prepack build outputs it cannot pack here', () => {
    const declared = JSON.parse(
      readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
    ).files;

    expect(
      PREPACK_OUTPUTS.filter((entry) => !declared.includes(entry))
    ).toEqual([]);
  });

  test('publishes every local asset app/index.html links to', () => {
    const html = readFileSync(path.join(REPO_ROOT, 'app/index.html'), 'utf8');

    const missing = htmlLocalResources(html)
      .map((reference) =>
        reference.startsWith('/')
          ? path.posix.join('app', reference.slice(1))
          : resolveSpecifier('app/index.html', reference)
      )
      .filter(
        (target) => !PUBLISHED.has(target) && !PREPACK_OUTPUTS.includes(target)
      );

    expect(missing).toEqual([]);
  });

  test('lists only files that exist in the checkout', () => {
    const absent = [...PUBLISHED].filter(
      (entry) => !existsSync(path.join(REPO_ROOT, entry))
    );

    expect(absent).toEqual([]);
  });
});
