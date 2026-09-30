/**
 * Design-system round checks of `ui-shots.mjs` (UI-dbn6): captures of the
 * pipeline (전체 + 레포) and the Phase 2 surfaces (issue detail, transcript,
 * new issue, document viewer, the resume-instructions dialog) in both
 * colour schemes at 390 · 1280 · 1374 · 1600 · 1920, each measured with the
 * no-overflow probe (`overflowProbe`) — every count must be 0 — and the 390
 * page `scrollWidth - innerWidth` must be 0.
 */
/* global window, document */
import path from 'node:path';
import process from 'node:process';
import {
  LANES,
  PIPELINE_PROBE,
  REPO_A,
  SURFACE_PROBE,
  openPage,
  overflowProbe,
  report,
  showLane
} from './ui-shots-lib.mjs';

export const DESIGN_WIDTHS = [390, 1280, 1374, 1600, 1920];

/** The running bead whose detail the checks open, and its finished attempt. */
export const DETAIL_BEAD = 'A-4';
export const DONE_ATTEMPT = 'A-4-1699990000-0';

/** @type {Array<{ where: string, containers: number, count: number }>} */
const table = [];

/**
 * One probe measurement, reported and kept for the closing table.
 *
 * @param {any} page
 * @param {string} where
 * @param {string} selector
 * @param {boolean} [page_fit] - Also require `scrollWidth === innerWidth`.
 */
async function probe(page, where, selector, page_fit = false) {
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
 * Open the running tile's detail from the lanes.
 *
 * @param {any} page
 * @param {number} width
 */
export async function openDetail(page, width) {
  if (width < 720) {
    await showLane(page, 'running');
  }
  await page.click(
    `.pl-tile[data-bead-id="${DETAIL_BEAD}"][data-root-dir="${REPO_A}"] .pl-title`
  );
  await page.waitForSelector(
    '#detail-panel .dt-panel [data-section="history"]'
  );
  await page.waitForSelector(
    `#detail-panel button.detail-session[data-attempt-id="${DONE_ATTEMPT}"]`
  );
  await page.waitForTimeout(300);
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 * @param {number} width
 */
async function pipelinePass(browser, base, out, scheme, width) {
  for (const [label, scope] of [
    ['all', '*'],
    ['repo', REPO_A]
  ]) {
    const { context, page } = await openPage(browser, base, {
      scope,
      width,
      colorScheme: scheme
    });
    const tag = `${label} ${scheme} ${width}`;
    if (width < 720) {
      for (const lane of LANES) {
        await showLane(page, lane);
        await probe(page, `pipeline ${tag} ${lane}`, PIPELINE_PROBE, true);
        await page.screenshot({
          path: path.join(
            out,
            `ds-pipeline-${label}-${scheme}-${width}-${lane}.png`
          )
        });
      }
    } else {
      await probe(page, `pipeline ${tag}`, PIPELINE_PROBE, true);
      await page.screenshot({
        path: path.join(out, `ds-pipeline-${label}-${scheme}-${width}.png`),
        fullPage: true
      });
    }
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
async function surfacesPass(browser, base, out, scheme, width) {
  const tag = `${scheme} ${width}`;
  /** @param {string} name */
  const shot = (name) => path.join(out, `ds-${name}-${scheme}-${width}.png`);

  // issue detail, then its transcript
  let { context, page } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  });
  await openDetail(page, width);
  await page.screenshot({ path: shot('detail') });
  await probe(page, `detail ${tag}`, SURFACE_PROBE, width < 720);
  await page.evaluate(() => {
    const panel = document.querySelector('#detail-panel .dt-panel');
    if (panel) {
      panel.scrollTop = panel.scrollHeight;
    }
  });
  await page.waitForTimeout(150);
  await page.screenshot({ path: shot('detail-end') });
  await probe(page, `detail end ${tag}`, SURFACE_PROBE, width < 720);
  await page.click(
    `#detail-panel button.detail-session[data-attempt-id="${DONE_ATTEMPT}"]`
  );
  await page.waitForSelector('.tr-overlay:not([hidden]) .sv__work');
  await page.waitForTimeout(300);
  await page.screenshot({ path: shot('transcript') });
  await probe(page, `transcript ${tag}`, SURFACE_PROBE, width < 720);
  await context.close();

  // document viewer from a candidate's spec bead
  ({ context, page } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  }));
  if (width < 720) {
    await showLane(page, 'candidate');
  }
  await page.click(
    '[data-lane-body="candidate"] .pl-band__bead.is-open[data-op="open-doc"]'
  );
  await page.waitForSelector('.mv-overlay .mv__body');
  await page.waitForTimeout(300);
  await page.screenshot({ path: shot('doc-viewer') });
  await probe(page, `doc viewer ${tag}`, SURFACE_PROBE, width < 720);
  await context.close();

  // new issue
  ({ context, page } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  }));
  if (width < 720) {
    await page.click('.ui-scope__trigger');
    await page.waitForSelector('.ui-scope__menu [data-op="new-issue"]');
    await page.click('.ui-scope__menu [data-op="new-issue"]');
  } else {
    await page.click('.ui-header [data-op="new-issue"]');
  }
  await page.waitForSelector('#new-issue-dialog[open] .new-issue__form');
  await page.waitForTimeout(250);
  await page.screenshot({ path: shot('new-issue') });
  await probe(page, `new issue ${tag}`, SURFACE_PROBE, width < 720);
  await context.close();

  // the resume-instructions dialog from the failed tile's ↻ 이어하기
  ({ context, page } = await openPage(browser, base, {
    scope: '*',
    width,
    colorScheme: scheme
  }));
  if (width < 720) {
    await showLane(page, 'running');
  }
  const resume = '.pl-tile[data-bead-id="D-4"] [data-op="resume"]';
  await (await page.$(resume)).scrollIntoViewIfNeeded();
  await page.click(resume);
  await page.waitForSelector('dialog.resume-instructions-dialog[open]');
  await page.waitForTimeout(250);
  await page.screenshot({ path: shot('dialog') });
  await probe(page, `dialog ${tag}`, SURFACE_PROBE, width < 720);
  await context.close();
}

/**
 * Every design-round capture and probe, then the probe table.
 *
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {{ widths?: number[], schemes?: Array<'dark'|'light'>, surfaces?: boolean }} [options]
 */
export async function designChecks(browser, base, out, options = {}) {
  const schemes = options.schemes || /** @type {const} */ (['dark', 'light']);
  for (const scheme of schemes) {
    for (const width of options.widths || DESIGN_WIDTHS) {
      await pipelinePass(browser, base, out, scheme, width);
      if (options.surfaces !== false) {
        await surfacesPass(browser, base, out, scheme, width);
      }
    }
  }
  const failing = table.filter((row) => row.count > 0);
  process.stdout.write(
    `\noverflow probe: ${table.length} measurements · ${failing.length} with overflow\n`
  );
  for (const row of table) {
    process.stdout.write(
      `  ${row.count === 0 ? '0' : String(row.count).padStart(1)}  ${row.where} (${row.containers} containers)\n`
    );
  }
}
