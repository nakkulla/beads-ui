/**
 * Phase 3 checks of `ui-shots.mjs` (UI-dbn6): the settings screen (레포 and
 * 일괄 mode, every tab), the usage popup, the ADR screen (with its badge
 * popup), the compare screen (with a group opened and the 문제 기준 popover),
 * the repo-ops declaration section, timeline drawer and script viewer, and
 * the fatal error dialog — in both colour schemes at 390 · 1280 · 1374
 * (usage, repo-ops and fatal at 390 · 1280). Each capture is measured with the
 * no-overflow probe (every count 0, 390 page `scrollWidth - innerWidth` 0);
 * at 390 every visible button, select and summary of the surface is ≥ 44px
 * tall; opening the ADR screen adds only `subscribe-adr` and leaving it
 * releases it; and no page error is thrown.
 */
/* global window, document */
import path from 'node:path';
import process from 'node:process';
import {
  REPO_A,
  openPage,
  overflowProbe,
  report,
  reportButtons,
  sentCount,
  sentSince
} from './ui-shots-lib.mjs';

/** The repo whose fixture carries the failed deploy and stopped cleanup. */
const REPO_C = '/fixture/repo-c';

export const P3_WIDTHS = [390, 1280, 1374];

/** @type {Array<{ where: string, containers: number, count: number }>} */
const table = [];

/**
 * @param {any} page
 * @param {string} where
 * @param {string} selector
 * @param {boolean} page_fit
 */
async function probe(page, where, selector, page_fit) {
  const result = await overflowProbe(page, selector);
  const extra = page_fit
    ? await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
    : 0;
  table.push({ where, containers: result.containers, count: result.count });
  report(
    `no overflow (${where})`,
    result.count === 0 && extra === 0 && result.containers > 0,
    `${result.containers} containers · ${result.count} overflowing${
      page_fit ? ` · page +${extra}px` : ''
    }${result.failures.length > 0 ? ` · ${result.failures.join(' | ')}` : ''}`
  );
}

/**
 * @param {any} page
 * @param {string} label
 * @param {string} scope
 */
async function buttons(page, label, scope) {
  await reportButtons(page, label, scope);
  const summaries = await page.$$eval(
    `${scope} summary`,
    (/** @type {HTMLElement[]} */ nodes) =>
      nodes
        .filter((node) => node.getBoundingClientRect().height > 0)
        .filter((node) => node.getBoundingClientRect().height < 44)
        .map((node) => node.textContent?.trim().slice(0, 16))
  );
  report(
    `summaries ≥ 44px (${label})`,
    summaries.length === 0,
    summaries.length > 0 ? `short: ${summaries.join(' | ')}` : 'all tall'
  );
}

const SETTINGS_PROBE =
  '.settings-dialog__rail, .settings-dialog__pane, .settings-dialog__group, .settings-dialog__preset-bar, .settings-dialog__row, .settings-dialog__bulk-targets';

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function settingsPass(browser, base, out, scheme, width) {
  for (const [mode, scope] of [
    ['repo', REPO_A],
    ['bulk', '*']
  ]) {
    const { context, page, errors } = await openPage(browser, base, {
      scope,
      width,
      colorScheme: scheme
    });
    await page.click('.ui-header [data-op="settings"]');
    await page.waitForSelector('#settings-dialog[open] .settings-dialog__pane');
    await page.waitForTimeout(400);
    const tabs = await page.$$eval(
      '#settings-dialog .settings-dialog__tab',
      (/** @type {HTMLElement[]} */ nodes) =>
        nodes.map((node) => node.dataset.tab || '')
    );
    for (const tab of tabs) {
      await page.click(
        `#settings-dialog .settings-dialog__tab[data-tab="${tab}"]`
      );
      await page.waitForTimeout(350);
      const tag = `settings ${mode} ${tab} ${scheme} ${width}`;
      await probe(page, tag, SETTINGS_PROBE, width < 720);
      if (width < 720) {
        await buttons(page, tag, '#settings-dialog');
      }
      await page.screenshot({
        path: path.join(
          out,
          `p3-settings-${mode}-${tab}-${scheme}-${width}.png`
        )
      });
    }
    report(
      `no page errors (settings ${mode} ${scheme} ${width})`,
      errors.length === 0,
      errors.slice(0, 3).join(' | ') || 'none'
    );
    await context.close();
  }
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function adrPass(browser, base, out, scheme, width) {
  const { context, page, errors } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  });
  const mark = await sentCount(page);
  await page.evaluate(() => {
    window.location.hash = '#/adr';
  });
  await page.waitForSelector('.adr-screen .adr-ws');
  await page.waitForTimeout(400);
  const subs = (await sentSince(page, mark)).filter((type) =>
    type.startsWith('subscribe-')
  );
  const tag = `adr ${scheme} ${width}`;
  report(
    `opening ADR adds only subscribe-adr (${tag})`,
    JSON.stringify(subs) === JSON.stringify(['subscribe-adr']),
    subs.join(', ') || 'none'
  );
  await probe(
    page,
    tag,
    '.adr-toolbar, .adr-ws, .adr-item, .adr-ws__hd',
    width < 720
  );
  if (width < 720) {
    await buttons(page, tag, '.adr-screen');
  }
  await page.screenshot({
    path: path.join(out, `p3-adr-${scheme}-${width}.png`),
    fullPage: width >= 720
  });
  await page.click('.adr-ws [data-signal="cite"]');
  await page.waitForSelector('.adr-pop');
  await page.waitForTimeout(200);
  await probe(page, `adr popup ${scheme} ${width}`, '.adr-pop', width < 720);
  await page.screenshot({
    path: path.join(out, `p3-adr-popup-${scheme}-${width}.png`)
  });
  await page.keyboard.press('Escape');
  await page.click('.adr-ws .adr-history > summary');
  await page.click('.adr-ws .adr-inspect > summary');
  await page.waitForTimeout(200);
  await probe(
    page,
    `adr folds open ${scheme} ${width}`,
    '.adr-ws, .adr-item, .adr-sec',
    width < 720
  );
  await page.screenshot({
    path: path.join(out, `p3-adr-open-${scheme}-${width}.png`),
    fullPage: width >= 720
  });
  const leave = await sentCount(page);
  await page.evaluate(() => {
    window.location.hash = '#/pipeline';
  });
  await page.waitForTimeout(300);
  const released = (await sentSince(page, leave)).includes('unsubscribe-adr');
  report(
    `leaving ADR releases subscribe-adr (${tag})`,
    released,
    String(released)
  );
  report(
    `no page errors (${tag})`,
    errors.length === 0,
    errors.slice(0, 3).join(' | ') || 'none'
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function comparePass(browser, base, out, scheme, width) {
  const { context, page, errors } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  });
  await page.evaluate(() => {
    window.location.hash = '#/compare';
  });
  await page.waitForSelector('.cmp .cmp-group');
  await page.click(
    '.cmp .cmp-group[data-group-key="preset:p-claude"] .cmp-expand'
  );
  await page.waitForSelector('.cmp .cmp-session');
  await page.waitForTimeout(300);
  const tag = `compare ${scheme} ${width}`;
  const bench = await page.evaluate(
    () =>
      document.body.textContent?.includes('bench-should-not-show') ||
      document.body.textContent?.includes('BENCH-1') ||
      document.querySelector('.cmp-bench') !== null
  );
  report(
    `compare draws no experiment material (${tag})`,
    !bench,
    String(!bench)
  );
  // The table scrolls inside its own frame when narrow (intended); what must
  // not overflow is every cell's own content, and the frame the page.
  await probe(
    page,
    tag,
    '.cmp-head, .cmp-controls, .cmp-summary, .cmp-kpi, .cmp-legend, .cmp-table th, .cmp-table td, .cmp-session',
    width < 720
  );
  if (width < 720) {
    await buttons(page, tag, '.cmp');
  }
  await page.screenshot({
    path: path.join(out, `p3-compare-${scheme}-${width}.png`),
    fullPage: width >= 720
  });
  await page.click('.cmp-criteria > summary');
  await page.waitForTimeout(200);
  await probe(
    page,
    `compare criteria ${scheme} ${width}`,
    '.cmp-criteria__panel',
    width < 720
  );
  await page.screenshot({
    path: path.join(out, `p3-compare-criteria-${scheme}-${width}.png`)
  });
  report(
    `no page errors (${tag})`,
    errors.length === 0,
    errors.slice(0, 3).join(' | ') || 'none'
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function usagePass(browser, base, out, scheme, width) {
  const { context, page, errors } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  });
  await page.waitForSelector('.usage-meter__toggle[aria-label="Claude usage"]');
  const tag = `usage ${scheme} ${width}`;
  await probe(
    page,
    `usage meter ${tag}`,
    '.ui-header__row, .usage-meter__group',
    width < 720
  );
  await page.click('.usage-meter__toggle[aria-label="Claude usage"]');
  await page.waitForSelector('.usage-meter__card');
  await page.waitForTimeout(250);
  await probe(
    page,
    `usage popup ${tag}`,
    '.usage-meter__card, .usage-meter__account',
    width < 720
  );
  if (width < 720) {
    await buttons(page, tag, '.usage-meter__card');
  }
  await page.screenshot({
    path: path.join(out, `p3-usage-${scheme}-${width}.png`)
  });
  report(
    `no page errors (${tag})`,
    errors.length === 0,
    errors.slice(0, 3).join(' | ') || 'none'
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function repoOpsPass(browser, base, out, scheme, width) {
  const { context, page, errors } = await openPage(browser, base, {
    scope: REPO_C,
    width,
    colorScheme: scheme
  });
  const tag = `repo-ops ${scheme} ${width}`;
  await page.waitForSelector('.worker-repo-ops-settings > summary');
  await page.click('.worker-repo-ops-settings > summary');
  await page.waitForSelector('.worker-repo-ops-settings__panel');
  await page.waitForTimeout(250);
  await probe(
    page,
    `repo-ops declaration ${tag}`,
    '.worker-repo-ops-settings__panel, .worker-repo-ops__lane',
    width < 720
  );
  if (width < 720) {
    await buttons(page, `declaration ${tag}`, '.worker-repo-ops-settings');
  }
  // A full-page capture drops the coarse-pointer emulation of a phone
  // context, so every capture here is of the viewport.
  await page.screenshot({
    path: path.join(out, `p3-repo-ops-declaration-${scheme}-${width}.png`)
  });

  await page.click('.worker-repo-ops__vd-cmd--link');
  await page.waitForSelector('.repo-ops-script-viewer__code');
  await page.waitForTimeout(250);
  await probe(
    page,
    `script viewer ${tag}`,
    '.repo-ops-script-viewer__panel, .repo-ops-script-viewer__header',
    width < 720
  );
  if (width < 720) {
    await buttons(page, `script viewer ${tag}`, '.repo-ops-script-viewer');
  }
  await page.screenshot({
    path: path.join(out, `p3-repo-ops-script-${scheme}-${width}.png`)
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);

  await page.click('[data-op="repo-ops-timeline"]');
  await page.waitForSelector('.ro-overlay:not([hidden]) .worker-ev');
  await page.waitForTimeout(250);
  await page.$$eval('.ro-overlay .worker-ev__details', (nodes) => {
    for (const node of nodes.slice(0, 2)) {
      /** @type {HTMLDetailsElement} */ (node).open = true;
    }
  });
  await page.waitForTimeout(150);
  await probe(
    page,
    `repo-ops timeline ${tag}`,
    '.ro-overlay__host, .worker-repo-drawer__hd, .worker-ev',
    width < 720
  );
  if (width < 720) {
    await buttons(page, `timeline ${tag}`, '.ro-overlay');
  }
  await page.screenshot({
    path: path.join(out, `p3-repo-ops-timeline-${scheme}-${width}.png`)
  });
  await page.click('.ro-overlay [data-seam="repo-ops-close"]');
  await page.waitForSelector('.ro-overlay', { state: 'hidden' });

  // The fatal error dialog is shown the way `showFatal` fills it.
  await page.evaluate(() => {
    const dialog = /** @type {HTMLDialogElement} */ (
      document.getElementById('fatal-error-dialog')
    );
    /** @type {HTMLElement} */ (
      document.getElementById('fatal-error-title')
    ).textContent = 'Failed to load workspace';
    /** @type {HTMLElement} */ (
      document.getElementById('fatal-error-message')
    ).textContent = 'bd list --json exited 1';
    const detail = /** @type {HTMLElement} */ (
      document.getElementById('fatal-error-detail')
    );
    detail.textContent =
      'Error: database is locked\n  at runBd (server/bd.js:88)\n  at listIssues (server/list.js:41)';
    detail.hidden = false;
    dialog.showModal();
  });
  await page.waitForTimeout(250);
  await probe(
    page,
    `fatal dialog ${tag}`,
    'dialog.fatal-error-dialog[open]',
    false
  );
  if (width < 720) {
    await buttons(page, `fatal ${tag}`, 'dialog.fatal-error-dialog');
  }
  await page.screenshot({
    path: path.join(out, `p3-fatal-${scheme}-${width}.png`)
  });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const fatal_closed = await page.evaluate(
    () =>
      !(
        /** @type {HTMLDialogElement} */ (
          document.getElementById('fatal-error-dialog')
        ).open
      )
  );
  report(
    `Escape closes the fatal dialog (${tag})`,
    fatal_closed,
    String(fatal_closed)
  );
  report(
    `no page errors (${tag})`,
    errors.length === 0,
    errors.slice(0, 3).join(' | ') || 'none'
  );
  await context.close();
}

/**
 * Every Phase 3 capture and check, then the probe table.
 *
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {{ schemes?: Array<'dark'|'light'>, widths?: number[] }} [options]
 */
export async function p3Checks(browser, base, out, options = {}) {
  const schemes = options.schemes || /** @type {const} */ (['dark', 'light']);
  const widths = options.widths || P3_WIDTHS;
  for (const scheme of schemes) {
    for (const width of widths) {
      await settingsPass(browser, base, out, scheme, width);
      await adrPass(browser, base, out, scheme, width);
      await comparePass(browser, base, out, scheme, width);
      if (width !== 1374) {
        await usagePass(browser, base, out, scheme, width);
        await repoOpsPass(browser, base, out, scheme, width);
      }
    }
  }
  const failing = table.filter((row) => row.count > 0);
  process.stdout.write(
    `\nP3 overflow probe: ${table.length} measurements · ${failing.length} with overflow\n`
  );
  for (const row of table) {
    process.stdout.write(
      `  ${String(row.count)}  ${row.where} (${row.containers} containers)\n`
    );
  }
}
