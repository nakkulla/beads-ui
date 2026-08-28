import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Guards the document-scroll layout (UI-tutz). The window itself must scroll at
 * every width while the app header stays pinned, and no lane may grow past one
 * screen — the two together are what keeps a long lane from stretching the page
 * while the other lanes sit next to empty space.
 */
/**
 * Strip block comments so a rule quoted inside prose never reads as a rule.
 *
 * @param {string} css
 */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

const CSS = readFileSync(path.resolve(process.cwd(), 'app/styles.css'), 'utf8');
const RULES = stripComments(CSS);
const BASE_RULES = stripComments(
  readFileSync(path.resolve(process.cwd(), 'app/styles/base.css'), 'utf8')
);

/**
 * Body of the first rule whose selector matches, or an empty string.
 *
 * @param {string} css
 * @param {RegExp} selector
 */
function ruleBody(css, selector) {
  return css.match(selector)?.[1] || '';
}

describe('document scroll layout', () => {
  test('leaves the document unlocked from the viewport', () => {
    const body = ruleBody(RULES, /(?:^|\n)html,\nbody\s*{([^}]*)}/);

    expect(body).not.toMatch(/height:\s*100%/);
  });

  test('keeps the app header pinned wherever it stays one line', () => {
    const header = ruleBody(RULES, /(?:^|\n)\.app-header\s*{([^}]*)}/);
    const wide = RULES.slice(0, RULES.indexOf('@media (max-width: 640px)'));

    expect(header).toMatch(/position:\s*sticky/);
    expect(wide).not.toMatch(/\.app-header\s*{[^}]*position:\s*static/);
  });

  test('releases the header only where it wraps to several lines', () => {
    const narrow = RULES.slice(RULES.indexOf('@media (max-width: 640px)'));

    expect(narrow).toMatch(/\.app-header\s*{[^}]*position:\s*static/);
  });

  test('bounds the app shell by a minimum rather than a fixed height', () => {
    const shell = ruleBody(RULES, /(?:^|\n)\.app-shell\s*{([^}]*)}/);

    expect(shell).toMatch(/min-height:/);
    expect(shell).not.toMatch(/\n\s*height:/);
  });

  test('stops the route shells from clipping their overflow', () => {
    const shells = ruleBody(
      RULES,
      /#board-root\.route\.board,\n#worker-root\.route\.worker\s*{([^}]*)}/
    );

    expect(shells).not.toMatch(/\n\s*height:/);
    expect(shells).not.toMatch(/overflow:\s*hidden/);
  });

  test('caps the top-level worker lanes at one screen', () => {
    const lane = ruleBody(RULES, /\.worker-lanes > \.worker-pane\s*{([^}]*)}/);

    expect(lane).toMatch(/max-height:\s*var\(--lane-max-h\)/);
  });

  test('keeps the lane body scrollable inside that cap', () => {
    const lane_body = ruleBody(
      RULES,
      /(?:^|\n)\.worker-pane__body\s*{([^}]*)}/
    );

    expect(lane_body).toMatch(/overflow-y:\s*auto/);
  });

  test('derives the lane cap from the measured header height', () => {
    const root = ruleBody(RULES, /:root\s*{([^}]*--lane-max-h[^}]*)}/);

    expect(root).toMatch(/--app-header-h:/);
    expect(root).toMatch(/--lane-max-h:[^;]*var\(--app-header-h\)/);
  });

  test('binds the board column cap to the same lane token', () => {
    const column = ruleBody(BASE_RULES, /(?:^|\n)\.board-column\s*{([^}]*)}/);

    expect(column).toMatch(/max-height:[^;]*var\(--lane-max-h\)/);
  });

  test('releases the lane cap where lanes stack into one column', () => {
    const mobile = ruleBody(
      RULES,
      /\.worker-lanes--mobile > \.worker-pane\s*{([^}]*)}/
    );

    expect(mobile).toMatch(/max-height:\s*none/);
  });
});
