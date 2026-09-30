#!/usr/bin/env node
/**
 * UI verification against the fixture server (UI-dbn6 Phase 1 pipeline page,
 * Phase 2 issue detail and transcript). Uses a Playwright from the npx cache
 * — it is NOT a dependency.
 *
 * Checks, each reported PASS/FAIL (exit 1 on any FAIL, 2 when Playwright is
 * unavailable):
 *   1. 전체·레포 captures at 390 (every lane through the lane bar) and 1280,
 *      with `scrollWidth > innerWidth` counted on each;
 *   2. every card/row/tile op button and every sheet button ≥ 44px tall at 390;
 *   3. a 1280 mouse drag, a 390 touch long-press (350 ms) drag and the 390
 *      move sheet `↑ 위로` each reorder the fixture queue (read back over the
 *      fixture's own WebSocket) and the DOM;
 *   4. the first 8-repo snapshot's handling (parse → lanes → render) ≤ 100 ms
 *      at 1280 (`performance.measure('bdui:first-render')`);
 *   5. 60 idle seconds add 0 to `window.__bdui.render_count`;
 *   6. boot WS subscriptions are exactly monitor-pipeline + impl-presets +
 *      model-visibility (레포 scope: + worker-queue);
 *   7. (P1-r2) every capture of 1 in both `colorScheme`s, the progress-band
 *      bead buttons inside the 390 44px check, and the 막힘 sheet, a PR row's
 *      live-badge evidence and chip popover and the usage card in both
 *      schemes at 1280 and 390;
 *   9. (design-system round, `ui-shots-design.mjs`) captures of the pipeline
 *      (전체 + 레포) and the issue detail, transcript, new issue, document
 *      viewer and resume-instructions dialog in both schemes at 390 · 1280 ·
 *      1374 · 1600 · 1920, each with the no-overflow probe — every count 0 —
 *      and the 390 page `scrollWidth - innerWidth` 0; `--design-only` runs
 *      this pass alone;
 *   8. the issue detail (1280 panel, 390 full-screen sheet) and the transcript
 *      (1280 window, 390 sheet): captures, `scrollWidth` overflow 0, every
 *      visible button/select ≥ 44px at 390, opening the detail adds only
 *      `subscribe-list issue-detail` and the transcript only
 *      `subscribe-session-log`, closing releases them, the browser back closes
 *      both at 390, and 60 idle seconds with the detail open add no render.
 *
 * Usage: node scripts/ui-shots.mjs http://127.0.0.1:3101 --out <dir>
 */
/* global window, document */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { DONE_ATTEMPT, designChecks, openDetail } from './ui-shots-design.mjs';
import {
  FIRST_RENDER_BUDGET_MS,
  IDLE_MS,
  LANES,
  REPO_A,
  fixtureQueue,
  loadPlaywright,
  openPage,
  overflowOf,
  report,
  reportButtons,
  reportOverflow,
  results,
  sentCount,
  sentSince,
  shortButtons,
  showLane,
  waitDomQueue
} from './ui-shots-lib.mjs';

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function captures(browser, base, out) {
  for (const scheme of /** @type {const} */ (['dark', 'light'])) {
    await capturesIn(browser, base, out, scheme);
  }
}

/**
 * The capture pass of one colour scheme.
 *
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 * @param {'dark'|'light'} scheme
 */
async function capturesIn(browser, base, out, scheme) {
  for (const [label_base, scope] of [
    ['all', '*'],
    ['repo', REPO_A]
  ]) {
    const label = `${label_base} ${scheme}`;
    for (const width of [1280, 390]) {
      const { context, page, errors } = await openPage(browser, base, {
        scope,
        width,
        colorScheme: scheme
      });
      if (width === 1280) {
        const expected = [
          'subscribe-impl-presets',
          'subscribe-model-visibility',
          'subscribe-monitor-pipeline',
          ...(scope === '*' ? [] : ['subscribe-worker-queue'])
        ];
        const subs = (
          await page.evaluate(() => /** @type {any} */ (window).__shots.sent)
        )
          .filter((/** @type {string} */ type) => type.startsWith('subscribe-'))
          .sort();
        report(
          `boot subscriptions (${label})`,
          JSON.stringify(subs) === JSON.stringify(expected),
          subs.join(', ')
        );
      }
      // Measure before any full-page capture: Playwright's full-page
      // screenshot drops the `(pointer: coarse)` emulation of a mobile
      // context, which would turn the coarse `⋯` rows back into `✕` rows.
      const lanes = width === 390 ? LANES : ['all'];
      if (width === 390) {
        const coarse = await page.evaluate(
          () => window.matchMedia('(pointer: coarse)').matches
        );
        report(
          `coarse pointer emulated (${label} 390)`,
          coarse,
          String(coarse)
        );
        for (const [lane, opener] of [
          ['queue', '[data-op="move-sheet"]'],
          ['running', '[data-op="ops-sheet"]'],
          ['candidate', '[data-op="place-sheet"]:not([disabled])']
        ]) {
          await showLane(page, lane);
          const handle = await page.$(`[data-lane-body="${lane}"] ${opener}`);
          if (!handle) {
            report(
              `sheet buttons ≥ 44px (${label} ${lane})`,
              false,
              'no opener'
            );
            continue;
          }
          await handle.click();
          await page.waitForSelector('.pl-sheet-host .ui-sheet');
          const file = path.join(
            out,
            `sheet-${label_base}-${scheme}-${lane}-390.png`
          );
          await page.screenshot({ path: file });
          const buttons = await shortButtons(
            page,
            '.pl-sheet-host .ui-sheet button'
          );
          report(
            `sheet buttons ≥ 44px (${label} ${lane})`,
            buttons.short.length === 0 && buttons.count > 0,
            `${buttons.count} measured${
              buttons.short.length > 0
                ? ` · short: ${buttons.short.join(' ')}`
                : ''
            } · ${path.basename(file)}`
          );
          await page.click(
            '.pl-sheet-host .ui-sheet__head [data-op="sheet-close"]'
          );
          await page.waitForTimeout(250);
        }
        for (const lane of lanes) {
          await showLane(page, lane);
          const overflow = await overflowOf(page);
          report(
            `no horizontal overflow (${label} 390 ${lane})`,
            !overflow.over,
            `scrollWidth ${overflow.scroll} / innerWidth ${overflow.inner}${
              overflow.wide.length > 0
                ? ` · wide: ${overflow.wide.join(' ')}`
                : ''
            }`
          );
          const buttons = await shortButtons(
            page,
            '.pl-card .pl-op, .pl-row .pl-op, .pl-tile .pl-op, .pl-card .pl-band__bead.is-open'
          );
          report(
            `op buttons ≥ 44px (${label} 390 ${lane})`,
            buttons.short.length === 0,
            `${buttons.count} measured${
              buttons.short.length > 0
                ? ` · short: ${buttons.short.join(' ')}`
                : ''
            }`
          );
        }
      } else {
        const overflow = await overflowOf(page);
        report(
          `no horizontal overflow (${label} 1280)`,
          !overflow.over,
          `scrollWidth ${overflow.scroll} / innerWidth ${overflow.inner}${
            overflow.wide.length > 0
              ? ` · wide: ${overflow.wide.join(' ')}`
              : ''
          }`
        );
      }
      for (const lane of lanes) {
        if (width === 390) {
          await showLane(page, lane);
        }
        await page.screenshot({
          path: path.join(
            out,
            `pipeline-${label_base}-${scheme}-${width}${lane === 'all' ? '' : `-${lane}`}.png`
          ),
          fullPage: width !== 390
        });
      }
      report(
        `no page errors (${label} ${width})`,
        errors.length === 0,
        errors.slice(0, 3).join(' | ') || 'none'
      );
      await context.close();
    }
  }
}

/**
 * The P1-r2 restored surfaces in both colour schemes at 1280 and 390: the
 * 막힘 sheet, a PR row's live badge evidence and chip popover, and the
 * usage card with its accounts.
 *
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function restoredSurfaces(browser, base, out) {
  for (const scheme of /** @type {const} */ (['dark', 'light'])) {
    for (const width of [1280, 390]) {
      const tag = `${scheme} ${width}`;
      const { context, page, errors } = await openPage(browser, base, {
        scope: '*',
        width,
        colorScheme: scheme
      });
      await page.click('.pl-toolbar--all [data-op="blocked-open"]');
      await page.waitForSelector('.pl-sheet-host .pl-blocked__group');
      await page.screenshot({
        path: path.join(out, `blocked-${scheme}-${width}.png`)
      });
      const groups = await page.$$eval(
        '.pl-sheet-host .pl-blocked__group-head',
        (/** @type {HTMLElement[]} */ nodes) =>
          nodes.map((node) =>
            (node.textContent || '').replace(/\s+/g, ' ').trim()
          )
      );
      report(
        `막힘 sheet lists its wait groups (${tag})`,
        groups.length >= 3,
        groups.join(', ')
      );
      if (width === 390) {
        await reportButtons(
          page,
          `막힘 sheet ${tag}`,
          '.pl-sheet-host .ui-sheet'
        );
      }
      await reportOverflow(page, `막힘 sheet ${tag}`);
      await page.click(
        '.pl-sheet-host .ui-sheet__head [data-op="sheet-close"]'
      );
      await page.waitForTimeout(250);

      if (width === 390) {
        await showLane(page, 'pr_wait');
      }
      const live = await page.$eval(
        '[data-lane-body="pr_wait"] .pl-row[data-bead-id="B-5"] .pl-badge--live',
        (/** @type {HTMLElement} */ node) => ({
          text: (node.textContent || '').trim(),
          title: node.getAttribute('title') || ''
        })
      );
      report(
        `PR row live badge carries its evidence (${tag})`,
        live.title.length > 0,
        `${live.text} — ${live.title.replace(/\n/g, ' / ')}`
      );
      const pr = '[data-lane-body="pr_wait"] .pl-row[data-bead-id="F-8"]';
      await page.click(`${pr} [data-op="chip-popover"]`);
      await page.waitForSelector(`${pr} .pl-pop`);
      await (await page.$(pr)).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: path.join(out, `pr-popover-${scheme}-${width}.png`)
      });
      await reportOverflow(page, `PR popover ${tag}`);

      await page.click('.usage-meter__toggle');
      await page.waitForSelector('#usage-meter-card');
      await page.waitForTimeout(250);
      await page.screenshot({
        path: path.join(out, `usage-card-${scheme}-${width}.png`)
      });
      const accounts = await page.$$eval(
        '#usage-meter-card .usage-meter__account-head',
        (/** @type {HTMLElement[]} */ nodes) => nodes.length
      );
      report(
        `usage card lists the accounts (${tag})`,
        accounts >= 2,
        `${accounts} account rows`
      );
      await reportOverflow(page, `usage card ${tag}`);
      report(
        `no page errors (restored ${tag})`,
        errors.length === 0,
        errors.slice(0, 3).join(' | ') || 'none'
      );
      await context.close();
    }
  }
}

/**
 * @param {any} browser
 * @param {string} base
 */
async function firstRender(browser, base) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  const ms = await page.evaluate(
    () => /** @type {any} */ (window).__shots.first
  );
  const rows = await page.evaluate(
    () => document.querySelectorAll('.pl-bundle').length
  );
  report(
    'first 8-repo render ≤ 100ms (1280)',
    typeof ms === 'number' && ms <= FIRST_RENDER_BUDGET_MS,
    `${typeof ms === 'number' ? ms.toFixed(1) : 'unmeasured'}ms · ${rows} repo bundles`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 */
async function idle(browser, base) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  // A grace chip still counting down means one legitimate boundary render.
  await page
    .waitForFunction(
      () => document.querySelectorAll('.pl-chip--grace').length === 0,
      null,
      { timeout: 40_000 }
    )
    .catch(() => {});
  await page.waitForTimeout(1500);
  const before = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  await page.waitForTimeout(IDLE_MS);
  const after = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  report(
    'idle 60s adds no render (1280)',
    after - before === 0,
    `render_count ${before} → ${after}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function mouseDrag(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  const before = await fixtureQueue(base);
  const moved = before[before.length - 1];
  const zone = `[data-lane-body="queue"] [data-drop="parallel"][data-root-dir="${REPO_A}"]`;
  const source = await page.$(`${zone} .pl-row[data-bead-id="${moved}"]`);
  const target = await page.$(`${zone} .pl-row[data-bead-id="${before[0]}"]`);
  if (!source || !target) {
    report('mouse drag reorders (1280)', false, 'rows not found');
    await context.close();
    return;
  }
  const from = await source.boundingBox();
  const to = await target.boundingBox();
  await page.mouse.move(from.x + from.width / 2, from.y + 12);
  await page.mouse.down();
  await page.mouse.move(from.x + from.width / 2, from.y + 4, { steps: 3 });
  await page.mouse.move(to.x + to.width / 2, to.y + 6, { steps: 12 });
  await page.mouse.up();
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'drag-mouse-1280.png') });
  report(
    'mouse drag reorders (1280)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function touchDrag(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 390
  });
  await showLane(page, 'queue');
  const before = await fixtureQueue(base);
  const moved = before[before.length - 1];
  const zone = `[data-lane-body="queue"] [data-drop="parallel"][data-root-dir="${REPO_A}"]`;
  const source = await page.$(
    `${zone} .pl-row[data-bead-id="${moved}"] .pl-title`
  );
  const target = await page.$(`${zone} .pl-row[data-bead-id="${before[0]}"]`);
  if (!source || !target) {
    report('touch long-press drag reorders (390)', false, 'rows not found');
    await context.close();
    return;
  }
  // Put the target row right under the sticky header so the source row below
  // it is in view too: a centred scroll to the source (the design round's
  // 44px coarse rows are taller) would push the target above the viewport,
  // where no touch point can reach it.
  await target.evaluate((/** @type {HTMLElement} */ row) => {
    const header = document.querySelector('.ui-header');
    const offset = header ? header.getBoundingClientRect().height + 8 : 8;
    window.scrollTo(
      0,
      row.getBoundingClientRect().top + window.scrollY - offset
    );
  });
  await page.waitForTimeout(100);
  const from = await source.boundingBox();
  const to = await target.boundingBox();
  const cdp = await context.newCDPSession(page);
  const x = from.x + from.width / 2;
  const y = from.y + from.height / 2;
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x, y, id: 1 }]
  });
  await page.waitForTimeout(450);
  const steps = 12;
  const end_y = to.y + 6;
  for (let index = 1; index <= steps; index++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x, y: y + ((end_y - y) * index) / steps, id: 1 }]
    });
    await page.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: []
  });
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'drag-touch-390.png') });
  report(
    'touch long-press drag reorders (390)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function moveSheet(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 390
  });
  await showLane(page, 'queue');
  const before = await fixtureQueue(base);
  const moved = before[1];
  await page.click(
    `[data-lane-body="queue"] [data-op="move-sheet"][data-bead-id="${moved}"]`
  );
  await page.waitForSelector('.pl-sheet-host .ui-sheet');
  await page.click('.pl-sheet-host button:has-text("↑ 위로")');
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'move-sheet-390.png') });
  report(
    'move sheet ↑ 위로 reorders (390)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function detailAndTranscript(browser, base, out) {
  for (const width of [1280, 390]) {
    const { context, page, errors } = await openPage(browser, base, {
      scope: '*',
      width
    });
    const tag = width === 390 ? '390' : '1280';
    let mark = await sentCount(page);
    await openDetail(page, width);
    const detail_subs = (await sentSince(page, mark)).filter((type) =>
      type.startsWith('subscribe-')
    );
    report(
      `opening the detail adds only issue-detail (${tag})`,
      JSON.stringify(detail_subs) ===
        JSON.stringify(['subscribe-list:issue-detail']),
      detail_subs.join(', ') || 'none'
    );
    const sheet = await page.evaluate(
      () =>
        document
          .querySelector('.dt-overlay')
          ?.classList.contains('dt-overlay--sheet') === true
    );
    report(
      `detail layout (${tag})`,
      width === 390 ? sheet : !sheet,
      width === 390 ? 'full-screen sheet' : 'right panel'
    );
    await page.screenshot({ path: path.join(out, `detail-${tag}.png`) });
    await page.evaluate(() => {
      const panel = document.querySelector('#detail-panel .dt-panel');
      if (panel) {
        panel.scrollTop = panel.scrollHeight;
      }
    });
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, `detail-${tag}-end.png`) });
    await reportOverflow(page, `detail ${tag}`);
    if (width === 390) {
      await reportButtons(page, 'detail 390', '#detail-panel .dt-panel');
    }

    mark = await sentCount(page);
    await page.click(
      `#detail-panel button.detail-session[data-attempt-id="${DONE_ATTEMPT}"]`
    );
    await page.waitForSelector('.tr-overlay:not([hidden]) .sv__work');
    await page.waitForTimeout(300);
    const log_subs = (await sentSince(page, mark)).filter((type) =>
      type.startsWith('subscribe-')
    );
    report(
      `opening the transcript adds only session-log (${tag})`,
      JSON.stringify(log_subs) === JSON.stringify(['subscribe-session-log']),
      log_subs.join(', ') || 'none'
    );
    await page.screenshot({ path: path.join(out, `transcript-${tag}.png`) });
    await reportOverflow(page, `transcript ${tag}`);
    if (width === 390) {
      await reportButtons(page, 'transcript 390', '.tr-overlay .sv');
    }

    mark = await sentCount(page);
    if (width === 390) {
      await page.goBack();
    } else {
      await page.click('.tr-overlay .sv__close');
    }
    await page.waitForSelector('.tr-overlay', { state: 'hidden' });
    const log_release = (await sentSince(page, mark)).includes(
      'unsubscribe-session-log'
    );
    report(
      `closing the transcript releases session-log (${tag}${width === 390 ? ' back' : ' ✕'})`,
      log_release,
      String(log_release)
    );

    mark = await sentCount(page);
    if (width === 390) {
      await page.goBack();
    } else {
      await page.click('#detail-panel .detail-overlay__close');
    }
    await page.waitForFunction(
      () =>
        /** @type {HTMLElement} */ (document.getElementById('detail-panel'))
          .hidden
    );
    const detail_release = (await sentSince(page, mark)).some((type) =>
      type.startsWith('unsubscribe-list:detail:')
    );
    report(
      `closing the detail releases issue-detail (${tag}${width === 390 ? ' back' : ' ✕'})`,
      detail_release,
      String(detail_release)
    );
    report(
      `no page errors (detail ${tag})`,
      errors.length === 0,
      errors.slice(0, 3).join(' | ') || 'none'
    );
    await context.close();
  }
}

/**
 * @param {any} browser
 * @param {string} base
 */
async function detailIdle(browser, base) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  await page
    .waitForFunction(
      () => document.querySelectorAll('.pl-chip--grace').length === 0,
      null,
      { timeout: 40_000 }
    )
    .catch(() => {});
  await openDetail(page, 1280);
  await page.waitForTimeout(1500);
  const before = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  await page.waitForTimeout(IDLE_MS);
  const after = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  report(
    'idle 60s with the detail open adds no render (1280)',
    after - before === 0,
    `render_count ${before} → ${after}`
  );
  await context.close();
}

async function main() {
  const base = (process.argv[2] || '').replace(/\/+$/, '');
  const flag = process.argv.indexOf('--out');
  const out = flag >= 0 ? process.argv[flag + 1] : '';
  if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(base) || !out) {
    process.stderr.write(
      'usage: node scripts/ui-shots.mjs http://127.0.0.1:<port> --out <dir>\n'
    );
    process.exit(2);
  }
  const playwright = await loadPlaywright();
  if (!playwright) {
    process.stderr.write(
      'Playwright is not available. It is not a dependency of this repo:\n' +
        '  run `npx -y playwright@latest install chromium` once so the npx\n' +
        '  cache holds it, then rerun this script.\n'
    );
    process.exit(2);
  }
  fs.mkdirSync(out, { recursive: true });
  const browser = await playwright.chromium.launch();
  const only = process.argv.includes('--design-only');
  try {
    if (only) {
      await designChecks(browser, base, out);
      return;
    }
    await captures(browser, base, out);
    await restoredSurfaces(browser, base, out);
    await firstRender(browser, base);
    await mouseDrag(browser, base, out);
    await touchDrag(browser, base, out);
    await moveSheet(browser, base, out);
    await detailAndTranscript(browser, base, out);
    await designChecks(browser, base, out);
    await idle(browser, base);
    await detailIdle(browser, base);
  } finally {
    await browser.close();
    const failed = results.filter((entry) => !entry.ok);
    process.stdout.write(
      `\n${results.length - failed.length}/${results.length} checks passed · captures in ${out}\n`
    );
    process.exitCode = failed.length > 0 ? 1 : 0;
  }
}

await main();
process.exit(process.exitCode ?? 0);
