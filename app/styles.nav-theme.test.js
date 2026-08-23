import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Header scope split (UI-o4m1 §4). The repo scope capsule and the global
 * Monitor link live in the base.css nav block; token-only colour and the
 * longhand border/background overrides inside the capsule are the regression
 * guards.
 */
const BASE_CSS = readFileSync(
  path.resolve(process.cwd(), 'app/styles/base.css'),
  'utf8'
);
const APP_CSS = readFileSync(
  path.resolve(process.cwd(), 'app/styles.css'),
  'utf8'
);

const NAV_START = BASE_CSS.indexOf('/* --- nav (');
const NAV_END = BASE_CSS.indexOf('/* --- board view --- */');
const NAV = BASE_CSS.slice(NAV_START, NAV_END);

/**
 * The declaration body of a rule inside the nav block.
 *
 * @param {string} selector
 */
function ruleBody(selector) {
  const re = new RegExp(`(?:^|\\n)${selector}\\s*\\{([^}]*)\\}`);
  return NAV.match(re)?.[1] || '';
}

describe('header scope nav styles', () => {
  test('the nav block exists ahead of the board block', () => {
    expect(NAV_START).toBeGreaterThan(0);
    expect(NAV_END).toBeGreaterThan(NAV_START);
  });

  test('consumes design tokens (no raw 6-digit hex in the nav block)', () => {
    const hex = NAV.match(/#[0-9a-fA-F]{6}\b/g) || [];

    expect(hex).toEqual([]);
    expect(NAV).toContain('var(--border-card)');
    expect(NAV).toContain('var(--bg-drawer)');
  });

  test('dims the repo scope capsule only while it carries is-quiet', () => {
    const base = ruleBody('\\.repo-scope');
    const quiet = ruleBody('\\.repo-scope\\.is-quiet');

    expect(base).not.toMatch(/opacity:/);
    expect(quiet).toContain('opacity: 0.45');
    expect(quiet).toContain('filter: saturate(0.6)');
  });

  test('lifts the dim on hover and focus inside the capsule', () => {
    const restore = ruleBody(
      '\\.repo-scope\\.is-quiet:hover,\\s*\\n\\.repo-scope\\.is-quiet:focus-within'
    );

    expect(restore).toContain('opacity: 1');
    expect(restore).toContain('filter: none');
  });

  test('flattens capsule controls with longhand border and background only', () => {
    const select = ruleBody('\\.repo-scope \\.workspace-picker__select');
    const buttons = ruleBody(
      '\\.repo-scope \\.workspace-picker__manage-button,\\s*\\n\\.repo-scope \\.workspace-picker__git-pull-button'
    );

    expect(select).toContain('border-color: transparent');
    expect(select).toContain('background-color: transparent');
    expect(select).not.toMatch(/(?:^|\s)border:/);
    expect(select).not.toMatch(/(?:^|\s)background:/);
    expect(buttons).toContain('border-color: transparent');
    expect(buttons).toContain('background-color: transparent');
    expect(buttons).not.toMatch(/(?:^|\s)border:/);
    expect(buttons).not.toMatch(/(?:^|\s)background:/);
  });

  test('paints the active Monitor glyph with stage tokens', () => {
    expect(NAV).toContain('var(--stage-spec-on)');
    expect(NAV).toContain('var(--stage-plan-on)');
    expect(NAV).toContain('var(--stage-impl-on)');
    expect(NAV).toContain('var(--accent-success)');
  });

  test('drops the capsule transition under reduced motion', () => {
    const reduced = NAV.slice(NAV.indexOf('@media (prefers-reduced-motion'));

    expect(reduced).toContain('.repo-scope');
    expect(reduced).toContain('transition: none');
  });

  test('wraps the capsule contents in the <=640px header block', () => {
    const header_start = APP_CSS.indexOf(
      '/* App shell header: wrap instead of'
    );
    const mq = APP_CSS.slice(header_start, header_start + 1200);

    expect(header_start).toBeGreaterThan(0);
    expect(mq).toContain('.repo-scope');
    expect(mq).toContain('flex-wrap: wrap');
  });
});
