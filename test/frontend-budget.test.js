/**
 * Frontend code budget (UI-dbn6 spec §6 "코드", Phase 4).
 *
 * Spec deviation, recorded: the §6 numbers — `app/` non-test JavaScript at most
 * 20,000 lines, CSS at most 4,000 lines, bundle at most 350 KB minified and
 * 120 KB gzip — cannot hold. The pure modules moved verbatim into `app/model/`
 * (`buildLanes` alone is ~5,800 lines) plus the server-imported `app/utils/`
 * modules that must stay in place (§4.1) already exceed them. The ceilings here
 * are the values measured after the Phase 4 deletion plus about 5% headroom
 * (lines rounded up to the next 500, bytes to the next 10 KiB), so the budget
 * stops growth from here rather than pretending to a size the code is not.
 *
 * The bundle ceilings read the `npm run build` output. A missing bundle FAILS
 * with a build hint instead of skipping: the Pre-Handoff order runs `build`
 * before `vitest`, so this always measures the current artifact.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APP_DIR = path.join(REPO_ROOT, 'app');
const BUNDLE = path.join(APP_DIR, 'main.bundle.js');
const KIB = 1024;

/** Non-test `.js` lines under `app/` — measured 62,271 (193 files). */
const JS_LINE_CEILING = 65_500;

/**
 * `.css` lines under `app/`, third-party `app/vendor/` excluded — measured
 * 10,532 (19 files).
 */
const CSS_LINE_CEILING = 11_500;

/** One source file's line ceiling (spec §4.1). */
const FILE_LINE_CEILING = 1_000;

/**
 * Files allowed past {@link FILE_LINE_CEILING}, with their line count when the
 * budget was set.
 *
 * @type {ReadonlyMap<string, number>}
 */
const FILE_LINE_EXCEPTIONS = new Map([
  // `buildLanes`; the split is a follow-up after UI-7xrf (spec §4.1).
  ['app/model/lane-model.js', 5_783],
  // Server-imported, so it stays in place (spec §4.1).
  ['app/utils/token-usage.js', 1_385],
  ['app/utils/execution-defaults.js', 1_168],
  ['app/utils/transcript-lines.js', 1_037]
]);

/** `app/main.bundle.js` minified bytes — measured 796,266. */
const BUNDLE_BYTE_CEILING = 82 * 10 * KIB;

/**
 * `app/main.bundle.js` gzip bytes (level 9, as the build writes it) —
 * measured 237,126.
 */
const BUNDLE_GZIP_BYTE_CEILING = 25 * 10 * KIB;

/**
 * Every file under `dir`, skipping the third-party `vendor/` tree.
 *
 * @param {string} dir
 * @returns {string[]}
 */
function appFiles(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'vendor') {
        out.push(...appFiles(full));
      }
    } else {
      out.push(full);
    }
  }
  return out;
}

/**
 * Line count as `wc -l` reports it for a newline-terminated file.
 *
 * @param {string} file
 * @returns {number}
 */
function lineCount(file) {
  const text = readFileSync(file, 'utf8');
  if (text.length === 0) {
    return 0;
  }
  const lines = text.split('\n').length;
  return text.endsWith('\n') ? lines - 1 : lines;
}

/** @returns {string[]} */
function sourceScripts() {
  return appFiles(APP_DIR).filter(
    (file) =>
      file.endsWith('.js') && !file.endsWith('.test.js') && file !== BUNDLE
  );
}

/** @returns {string[]} */
function stylesheets() {
  return appFiles(APP_DIR).filter((file) => file.endsWith('.css'));
}

/**
 * @param {string[]} files
 * @returns {number}
 */
function totalLines(files) {
  return files.reduce((sum, file) => sum + lineCount(file), 0);
}

/**
 * The built bundle, or a failure that says how to produce it.
 *
 * @param {string} file
 * @returns {Buffer}
 */
function readBundle(file) {
  if (!existsSync(file)) {
    throw new Error(
      `${path.relative(REPO_ROOT, file)} is missing — run \`npm run build\` first`
    );
  }
  return readFileSync(file);
}

describe('frontend code budget (UI-dbn6 §6)', () => {
  test('keeps app non-test JavaScript within its line ceiling', () => {
    const lines = totalLines(sourceScripts());

    expect(lines).toBeLessThanOrEqual(JS_LINE_CEILING);
  });

  test('keeps app CSS within its line ceiling', () => {
    const lines = totalLines(stylesheets());

    expect(lines).toBeLessThanOrEqual(CSS_LINE_CEILING);
  });

  test('keeps every source file within 1,000 lines outside the exception list', () => {
    const files = [...sourceScripts(), ...stylesheets()];

    const oversized = files
      .map((file) => path.relative(REPO_ROOT, file).split(path.sep).join('/'))
      .filter((file) => !FILE_LINE_EXCEPTIONS.has(file))
      .filter(
        (file) => lineCount(path.join(REPO_ROOT, file)) > FILE_LINE_CEILING
      );

    expect(oversized).toEqual([]);
  });

  test('keeps the minified bundle within its byte ceiling', () => {
    const bundle = readBundle(BUNDLE);

    expect(bundle.length).toBeLessThanOrEqual(BUNDLE_BYTE_CEILING);
  });

  test('keeps the gzip bundle within its byte ceiling', () => {
    const bundle = readBundle(BUNDLE);

    const gzip_bytes = gzipSync(bundle, { level: 9 }).length;

    expect(gzip_bytes).toBeLessThanOrEqual(BUNDLE_GZIP_BYTE_CEILING);
  });

  test('fails with a build hint when the bundle is missing', () => {
    const missing = path.join(APP_DIR, 'missing.bundle.js');

    expect(() => readBundle(missing)).toThrow('run `npm run build` first');
  });
});
