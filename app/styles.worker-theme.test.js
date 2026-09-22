import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Guards the Task 3 closeout: the Worker console CSS must consume tokens (so it
 * respects `[data-theme='light']`), the dead v3 worker CSS must be gone, and the
 * ≤640px responsive rules must be present.
 */
const CSS = readFileSync(path.resolve(process.cwd(), 'app/styles.css'), 'utf8');

/**
 * Every `@media (any-pointer: coarse), (max-width: 640px)` block body, matched by
 * counting braces rather than slicing to a later marker: the file carries more
 * than one such query (UI-6g3t added the `.op-btn` sizing one ahead of the
 * worker block), so an `indexOf`-to-marker slice reads a span that is not a
 * media block at all.
 *
 * @returns {string[]}
 */
function coarsePointerBlocks() {
  const query = '@media (any-pointer: coarse), (max-width: 640px)';
  /** @type {string[]} */
  const blocks = [];
  let from = CSS.indexOf(query);
  while (from >= 0) {
    const open = CSS.indexOf('{', from);
    let depth = 0;
    let i = open;
    for (; i < CSS.length; i++) {
      if (CSS[i] === '{') {
        depth += 1;
      } else if (CSS[i] === '}') {
        depth -= 1;
        if (depth === 0) {
          break;
        }
      }
    }
    blocks.push(CSS.slice(open, i + 1));
    from = CSS.indexOf(query, i);
  }
  return blocks;
}

describe('worker console styles', () => {
  const markerIndex = CSS.indexOf('/* ---------- Worker console');
  const workerBlock = markerIndex >= 0 ? CSS.slice(markerIndex) : '';

  test('the worker console block exists', () => {
    expect(markerIndex).toBeGreaterThan(0);
  });

  test('applies the settings dialog grid only while open', () => {
    const baseRule =
      CSS.match(/(?:^|\n)\.settings-dialog\s*{([^}]*)}/)?.[1] || '';
    const openRule =
      CSS.match(/(?:^|\n)\.settings-dialog\[open\]\s*{([^}]*)}/)?.[1] || '';

    expect(baseRule).not.toContain('display:');
    expect(openRule).toContain('display: grid');
  });

  test('consumes design tokens (no raw 6-digit hex in the worker block)', () => {
    const hex = workerBlock.match(/#[0-9a-fA-F]{6}\b/g) || [];
    expect(hex).toEqual([]);
    expect(workerBlock).toContain('var(--accent-success)');
    expect(workerBlock).toContain('var(--bg-app)');
  });

  test('the dead v3 worker CSS was removed', () => {
    expect(CSS).not.toContain('.worker-tree');
    expect(CSS).not.toContain('.worker-parent-row');
    expect(CSS).not.toContain('.worker-toolbar');
  });

  test('has the ≤640px responsive rules (single-column grid + stacked lanes)', () => {
    const mq = CSS.slice(CSS.indexOf('@media (max-width: 640px)', markerIndex));
    expect(mq).toContain('.worker-rungrid');
    expect(mq).toContain('grid-template-columns: 1fr');
    expect(mq).toContain('flex-direction: column');
  });

  test('splits controls and KPIs into full rows at intermediate widths', () => {
    const mediaStart = CSS.indexOf(
      '@media (min-width: 641px) and (max-width: 1400px)',
      markerIndex
    );
    const mediaEnd = CSS.indexOf('@media (max-width: 640px)', mediaStart);
    const mq = CSS.slice(mediaStart, mediaEnd);

    expect(mediaStart).toBeGreaterThan(markerIndex);
    expect(mq).toContain('.worker-ctrl');
    expect(mq).toContain('flex-wrap: wrap');
    expect(mq).toContain('.worker-ctrl__ops');
    expect(mq).toContain('flex: 1 1 100%');
    expect(mq).toContain('.worker-kpi');
    expect(mq).toContain('justify-content: flex-start');
    expect(mq).toContain('margin-left: 0');
  });

  test('styles the transcript drawer + tile selection ring', () => {
    expect(workerBlock).toContain('.sv__body');
    expect(workerBlock).toContain('.rtile--sel');
    expect(workerBlock).toContain('.detail-session');
  });

  test('wraps long transcript tool details inside the drawer', () => {
    const bodyRule =
      workerBlock.match(/(?:^|\n)\.sv__body\s*{([^}]*)}/)?.[1] || '';
    const lineRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-line\s*{([^}]*)}/)?.[1] || '';
    const detailRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-detail\s*{([^}]*)}/)?.[1] || '';
    const resultRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-ok\s*{([^}]*)}/)?.[1] || '';

    expect(bodyRule).toContain('overflow-x: hidden');
    expect(lineRule).toContain('display: flex');
    expect(lineRule).toContain('width: 100%');
    expect(detailRule).toContain('white-space: normal');
    expect(detailRule).toContain('overflow-wrap: anywhere');
    expect(resultRule).toContain('overflow-wrap: anywhere');
  });

  test('shows the queue placement button without a pointer media gate', () => {
    const baseRule =
      CSS.match(/(?:^|\n)\.worker-card__place\s*{([^}]*)}/)?.[1] || '';
    const coarse_blocks = coarsePointerBlocks();

    expect(baseRule).not.toContain('display: none');
    expect(coarse_blocks.length).toBeGreaterThan(0);
    coarse_blocks.forEach((block) => {
      expect(block).not.toContain('.worker-card__place');
    });
  });

  // 저장소 작업 타임라인은 transcript drawer와 오버레이를 공유하지만 `.sv`가
  // 아니어서 폭·스크롤 계약을 못 받았고, rail의 60vh 상한이 host 높이와 이중으로
  // 걸려 배포 이력 뒤쪽이 스크롤 없이 잘렸다.
  test('gives the repo-ops drawer the same overlay contract as the transcript drawer', () => {
    const drawerRule =
      CSS.match(
        /(?:^|\n)\.worker-drawer-overlay \.worker-repo-drawer\s*{([^}]*)}/
      )?.[1] || '';
    const railRule =
      CSS.match(
        /(?:^|\n)\.worker-drawer-overlay \.worker-rail\s*{([^}]*)}/
      )?.[1] || '';

    expect(drawerRule).toContain('width: 100%');
    expect(drawerRule).toContain('flex-direction: column');
    expect(drawerRule).toContain('min-height: 0');
    expect(railRule).toContain('max-height: none');
    expect(railRule).toContain('flex: 1 1 auto');
  });

  // 오버레이는 host 둘을 담고 하나만 연다. 닫힌 host가 flex item으로 남으면
  // `justify-content: center`가 열린 쪽을 옆으로 민다. 이 규칙이 오버레이 규칙보다
  // 뒤에 있어야 이기므로, 소스 순서 자체가 계약이다.
  test('keeps a closed drawer host out of the overlay layout', () => {
    const overlayRuleAt = CSS.indexOf(
      '.worker-drawer-overlay .worker-drawer-host {'
    );
    const suppressAt = CSS.indexOf(
      '.worker-drawer-overlay .worker-drawer-host[hidden]'
    );
    const suppressRule =
      CSS.match(
        /\.worker-drawer-overlay \.worker-drawer-host\[hidden\],\s*\n\s*\.worker-drawer-overlay \.worker-drawer-host:empty\s*{([^}]*)}/
      )?.[1] || '';

    expect(overlayRuleAt).toBeGreaterThan(0);
    expect(suppressAt).toBeGreaterThan(overlayRuleAt);
    expect(suppressRule).toContain('display: none');
  });

  test('wraps the repo-ops strip into two rows below 640px', () => {
    const mediaStart = CSS.indexOf('/* ---------- Worker responsive (<=640px)');
    const mq = CSS.slice(mediaStart);
    const stripRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip\s*{([^}]*)}/)?.[1] || '';
    const factRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip__fact\s*{([^}]*)}/)?.[1] || '';
    const badgeRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip__badge\s*{([^}]*)}/)?.[1] || '';

    expect(mediaStart).toBeGreaterThan(0);
    expect(stripRule).toContain('flex-wrap: wrap');
    expect(factRule).toContain('flex: 1 0 100%');
    // 배지는 부르는 쪽이므로 사실보다 앞 줄에 남는다.
    expect(badgeRule).toContain('order: 2');
    expect(factRule).toContain('order: 3');
  });

  test('narrows the repo-ops timeline gutters below 640px', () => {
    const mq = CSS.slice(
      CSS.indexOf('/* ---------- Worker responsive (<=640px)')
    );
    const eventRule = mq.match(/(?:^|\n)\s*\.worker-ev\s*{([^}]*)}/)?.[1] || '';
    const kvRule =
      mq.match(/(?:^|\n)\s*\.worker-ev__kv dt\s*{([^}]*)}/)?.[1] || '';

    expect(eventRule).toContain('grid-template-columns: 42px 22px 1fr');
    expect(kvRule).toContain('width: auto');
  });

  // 대기 행의 한 줄 변형은 사라졌다 (UI-pw2g §3.1) — 남은 규칙은 그 변형이 없는
  // 행에 죽은 선택자로 남는다.
  test('retires every one-line row rule with the variant', () => {
    expect(CSS).not.toContain('.worker-mini__line');
  });

  test('moves the card reason out of the head into its own line', () => {
    const responsiveMarker = CSS.indexOf(
      '/* ---------- Worker responsive (<=640px)'
    );
    const baseWorkerCss = CSS.slice(markerIndex, responsiveMarker);
    const reasonRule =
      baseWorkerCss.match(
        /(?:^|\n)\.worker-mini__reason-line\s*{([^}]*)}/
      )?.[1] || '';
    const headRule =
      baseWorkerCss.match(/(?:^|\n)\.worker-mini__head\s*{([^}]*)}/)?.[1] || '';

    expect(responsiveMarker).toBeGreaterThan(markerIndex);
    expect(reasonRule).toContain('min-width: 0');
    expect(reasonRule).toContain('overflow-wrap: anywhere');
    expect(headRule).toContain('flex-wrap: nowrap');
    expect(headRule).toContain('min-height: 28px');
  });

  test('shares the card reason line across Worker and Monitor roots', () => {
    const responsiveMarker = CSS.indexOf(
      '/* ---------- Worker responsive (<=640px)'
    );
    const baseWorkerCss = CSS.slice(markerIndex, responsiveMarker);
    const selector_list =
      baseWorkerCss.match(/([^{}]*\.worker-mini__reason-line)\s*{/)?.[1] || '';

    expect(selector_list.trim()).toBe('.worker-mini__reason-line');
  });

  test('ellipsizes long mini-row badges in a narrow lane', () => {
    const badgeRule =
      workerBlock.match(
        /(?:^|\n)\.worker-mini__badge,\s*\.worker-card__badge\s*{([^}]*)}/
      )?.[1] || '';

    expect(badgeRule).toContain('min-width: 0');
    expect(badgeRule).toContain('max-width: 100%');
    expect(badgeRule).toContain('text-overflow: ellipsis');
  });

  test('keeps candidate card headers on one line in narrow lanes', () => {
    const headRule =
      workerBlock.match(/(?:^|\n)\.worker-card__head\s*{([^}]*)}/)?.[1] || '';

    expect(headRule).toContain('flex-wrap: nowrap');
    expect(headRule).toContain('min-height: 28px');
    expect(headRule).toContain('min-width: 0');
  });

  test('ellipsizes wait summaries within every card header without wrapping', () => {
    const summaryRule = CSS.match(
      /:is\(([^)]*)\)\s*:is\(\.wait-verdict,\s*\.external-wait-summary\)\s*>\s*summary\s*{([^}]*)}/
    );
    const selectors = summaryRule?.[1] || '';
    const declarations = summaryRule?.[2] || '';

    for (const selector of [
      '.worker-mini__head',
      '.worker-mini__row1',
      '.worker-card__head',
      '.rtile__hd'
    ]) {
      expect(selectors).toContain(selector);
    }
    expect(declarations).toContain('display: block');
    expect(declarations).toContain('white-space: nowrap');
    expect(declarations).toContain('overflow: hidden');
    expect(declarations).toContain('text-overflow: ellipsis');
  });

  // 좁은 화면의 머리줄은 말줄임 대신 줄을 넘긴다 (UI-c8kc). 같은 명시도의 기본
  // `nowrap` 규칙보다 뒤에 서야 덮으므로 순서도 함께 본다.
  test('wraps every card header row below 640px', () => {
    const mediaStart = CSS.indexOf('/* ---------- Worker responsive (<=640px)');
    const mq = CSS.slice(mediaStart);
    const wrapRule =
      mq.match(
        /\n\s*:is\(\.worker-card__head, \.worker-mini__head, \.rtile__hd\)\s*{([^}]*)}/
      )?.[1] || '';

    expect(wrapRule).toContain('flex-wrap: wrap');
    for (const base_rule of [
      '\n.worker-card__head {',
      '\n.worker-mini__head {',
      '\n.rtile__hd {'
    ]) {
      expect(CSS.indexOf(base_rule)).toBeGreaterThan(0);
      expect(CSS.indexOf(base_rule)).toBeLessThan(mediaStart);
    }
  });

  // 이 폭의 `.chip-popover`는 정적 블록이라 담는 `<details>`의 폭을 그대로 쓴다
  // (UI-c8kc): 열린 대기 배지가 한 줄을 차지하지 않으면 팝업이 배지 폭으로 눌린다.
  test('gives an open header wait badge its own line below 640px', () => {
    const mq = CSS.slice(
      CSS.indexOf('/* ---------- Worker responsive (<=640px)')
    );
    const openRule = mq.match(
      /:is\(([^)]*)\)\s*:is\(\.wait-verdict, \.external-wait-summary\)\[open\]\s*{([^}]*)}/
    );

    for (const selector of [
      '.worker-card__head',
      '.worker-mini__head',
      '.worker-mini__row1',
      '.rtile__hd'
    ]) {
      expect(openRule?.[1] || '').toContain(selector);
    }
    expect(openRule?.[2] || '').toContain('flex-basis: 100%');
  });

  test('keeps an open header wait badge at its chip width below 640px', () => {
    const mq = CSS.slice(
      CSS.indexOf('/* ---------- Worker responsive (<=640px)')
    );
    const summaryRule =
      mq.match(
        /:is\(\.wait-verdict, \.external-wait-summary\)\[open\]\s*>\s*summary\s*{([^}]*)}/
      )?.[1] || '';

    expect(summaryRule).toContain('width: fit-content');
  });

  test('wraps candidate card footer items in narrow lanes', () => {
    const footRule =
      workerBlock.match(/(?:^|\n)\.worker-card__foot\s*{([^}]*)}/)?.[1] || '';

    expect(footRule).toContain('flex-wrap: wrap');
    expect(footRule).toContain('min-width: 0');
  });

  // 후보 레인이 드래그 소스가 아니게 되면서 `[대기로 ↴]`가 유일한 배치 경로가
  // 됐다 (UI-d13v §6) — 포인터 종류로 그것을 감추던 규칙은 남아 있으면 안 된다.
  test('never hides the actions-only candidate foot', () => {
    const rules =
      CSS.match(/\.worker-card__foot--actions-only\s*{[^}]*}/g) || [];

    expect(rules).toEqual([]);
  });

  test('gives the release chip its colour before the foreign override', () => {
    const released = workerBlock.indexOf('.worker-dep--released');
    const foreign = workerBlock.indexOf('.worker-dep--foreign');

    expect(released).toBeGreaterThan(0);
    expect(released).toBeLessThan(foreign);
  });

  test('colours the dependents chip with the route tokens', () => {
    const rule =
      CSS.match(/(?:^|\n)\.worker-dep--dependents\s*{([^}]*)}/)?.[1] || '';

    expect(rule).toContain('var(--chip-route)');
  });

  test('keeps a candidate reason readable beside or below its action', () => {
    const reasonRule =
      workerBlock.match(/(?:^|\n)\.worker-card__reason\s*{([^}]*)}/)?.[1] || '';

    expect(reasonRule).toContain('flex: 1 1 auto');
    expect(reasonRule).toContain('min-width: 0');
    expect(reasonRule).toContain('max-width: 100%');
    expect(reasonRule).toContain('overflow-wrap: anywhere');
  });

  test('keeps running tile headers on one line in narrow lanes', () => {
    const headerRule =
      workerBlock.match(/(?:^|\n)\.rtile__hd\s*{([^}]*)}/)?.[1] || '';

    expect(headerRule).toContain('flex-wrap: nowrap');
    expect(headerRule).toContain('min-height: 28px');
    expect(headerRule).toContain('min-width: 0');
  });

  test('keeps wrapped running tile controls pinned to the right', () => {
    const actionsRule =
      workerBlock.match(/(?:^|\n)\.rtile__hd-actions\s*{([^}]*)}/)?.[1] || '';

    expect(actionsRule).toContain('margin-left: auto');
    expect(actionsRule).toContain('flex: 0 0 auto');
  });

  test('stacks running tile coordinate and run lines as two metadata lines', () => {
    const metaRule =
      workerBlock.match(/(?:^|\n)\.rtile__meta\s*{([^}]*)}/)?.[1] || '';

    const rowRule =
      workerBlock.match(/(?:^|\n)\.rtile \.worker-chips\s*{([^}]*)}/)?.[1] ||
      '';

    expect(metaRule).toContain('flex-direction: column');
    expect(metaRule).toContain('min-width: 0');
    expect(rowRule).toContain('display: flex');
    expect(rowRule).toContain('min-width: 0');
  });

  // 실행 중 타일의 칩 줄도 줄을 넘긴다 (UI-pw2g §3.2): 담는 줄이 wrap하고 자식은
  // 말줄임을 갖지 않아야 `오케 claude · fable · l…`이 나오지 않는다.
  test('wraps the running tile coordinate and run lines instead of clipping them', () => {
    const rowRule =
      workerBlock.match(/(?:^|\n)\.rtile \.worker-chips\s*{([^}]*)}/)?.[1] ||
      '';
    const childRule =
      workerBlock.match(
        /(?:^|\n)\.rtile \.worker-chips > \*\s*{([^}]*)}/
      )?.[1] || '';

    expect(rowRule).toContain('flex-wrap: wrap');
    expect(childRule).toContain('flex: 0 1 auto');
    expect(childRule).toContain('overflow-wrap: anywhere');
    expect(childRule).not.toContain('white-space: nowrap');
    expect(workerBlock).not.toContain('.rtile__facts > :not(.chip-popover)');
  });

  // 게이트 칩이 22글자에서 잘리던 자리다 (UI-pw2g §3.2).
  test('lets a wide dependency chip wrap instead of ellipsizing at 22ch', () => {
    const depRule =
      workerBlock.match(/(?:^|\n)\.worker-dep\s*{([^}]*)}/)?.[1] || '';
    const openRule =
      workerBlock.match(/(?:^|\n)\.worker-dep__open\s*{([^}]*)}/)?.[1] || '';

    expect(depRule).toContain('max-width: 100%');
    expect(depRule).toContain('overflow-wrap: anywhere');
    expect(depRule).not.toContain('text-overflow: ellipsis');
    expect(openRule).not.toContain('text-overflow: ellipsis');
  });

  /**
   * The one rule that releases the per-chip width caps inside a chip line
   * (UI-pw2g §3.2 gate-r1).
   *
   * @returns {{ selector: string, declarations: string }}
   */
  function chipLineReleaseRule() {
    const match = workerBlock.match(
      /:is\(\.worker-card, \.worker-mini, \.rtile\)\s*:is\(\.worker-chips, \.worker-deps\)\s*:is\(([^)]*)\)\s*{([^}]*)}/
    );
    return { selector: match?.[1] || '', declarations: match?.[2] || '' };
  }

  // `.worker-usage`의 nowrap, 레포 배지의 12ch, 세션 정체 칩의 18ch가 담는 줄
  // 안에서도 글자를 먹던 자리다 (UI-pw2g §3.2 gate-r1).
  test('releases the per-chip width caps inside a chip line', () => {
    const { selector, declarations } = chipLineReleaseRule();

    for (const chip of [
      '.worker-usage',
      '.worker-card__repo',
      '.worker-mini__repo',
      '.ctl-chip--sref'
    ]) {
      expect(selector).toContain(chip);
    }
    expect(declarations).toContain('max-width: 100%');
    expect(declarations).toContain('white-space: normal');
    expect(declarations).toContain('text-overflow: clip');
    expect(declarations).toContain('overflow-wrap: anywhere');
  });

  // 실행 타일의 `.rtile__facts`·`.rtile__usage`는 5a·5b `.worker-chips` 줄로
  // 합쳐졌다 (UI-us7l §4.3). 담는 줄 둘만 지명해야 머리줄 칩에 번지지 않는다.
  test('scopes the chip-line release to the two chip containers', () => {
    const scoped = workerBlock.match(
      /:is\(\.worker-card, \.worker-mini, \.rtile\)\s*:is\(([^)]*)\)\s*:is\(\s*\.worker-usage,/
    );

    expect(scoped?.[1]).toBe('.worker-chips, .worker-deps');
  });

  // `margin-left: auto`는 그대로다 (UI-pw2g §3.2): 대기 행 `.worker-chips` 안의
  // usage 배지는 지금 자리를 유지한다.
  test('leaves the usage badge auto margin alone', () => {
    const { declarations } = chipLineReleaseRule();

    expect(declarations).not.toContain('margin-left');
  });

  test('wraps the shared coordinate chip row in narrow lanes', () => {
    const chipsRule =
      workerBlock.match(/(?:^|\n)\.worker-chips\s*{([^}]*)}/)?.[1] || '';

    expect(chipsRule).toContain('flex-wrap: wrap');
    expect(chipsRule).toContain('min-width: 0');
  });

  // 후보 카드 헤더가 route 칩을 잃으면서 그 칩 묶음도 사라졌다 (UI-251y §3.2):
  // 남겨두면 self-review 칩 유무에 따라 비었다 찼다 하는 빈 자리가 된다.
  test('the candidate header chip cluster and its coordinate rules are gone', () => {
    expect(CSS).not.toContain('.worker-card__wfchips');
    expect(CSS).not.toContain('.worker-card__head .ctl-chip--route');
    expect(CSS).not.toContain('.worker-card__head .ctl-chip--from');
    expect(CSS).not.toContain('.worker-card__head .worker-card__repo');
    expect(CSS).not.toContain('.worker-mini__exec');
  });

  // 폭 하한과 등폭 몫은 최상위 다섯 레인만의 것이다 (UI-5ksp §4.5). 대기 본문
  // 껍데기는 pane 안에 사는 세로 스택일 뿐이라 자기 폭 규칙을 갖지 않는다.
  test('gives the five top-level lanes one width rule', () => {
    const laneRule =
      workerBlock.match(
        /(?:^|\n)\.worker-lanes > \.worker-pane\s*{([^}]*)}/
      )?.[1] || '';
    const hostRule =
      workerBlock.match(/(?:^|\n)\.worker-lanes-host\s*{([^}]*)}/)?.[1] || '';

    expect(laneRule).toContain('flex: 1 1 0');
    expect(laneRule).toContain('min-width: 220px');
    expect(hostRule).toContain('overflow-x: auto');
  });

  test('drops the old waiting-column stack rules', () => {
    const waitRule =
      workerBlock.match(/(?:^|\n)\.worker-wait\s*{([^}]*)}/)?.[1] || '';

    expect(CSS).not.toContain('.worker-wait > .worker-pane');
    expect(waitRule).toContain('flex-direction: column');
    expect(waitRule).not.toContain('flex: 1');
    expect(waitRule).not.toContain('min-width');
  });

  test('stops narrowing the candidate source pane', () => {
    const srcRule =
      workerBlock.match(/(?:^|\n)\.worker-pane--src\s*{([^}]*)}/)?.[1] || '';

    expect(srcRule).not.toContain('flex:');
    expect(srcRule).toContain('border: 1px dashed var(--border-chip)');
    expect(srcRule).toContain('background: var(--bg-candidate)');
  });

  test('lets the mobile running grid scroll with the document', () => {
    const mobile_end = CSS.indexOf('.worker-lanes--mobile');
    const mobile_start = CSS.lastIndexOf(
      '@media (max-width: 640px)',
      mobile_end
    );
    const rule =
      CSS.slice(mobile_start, mobile_end).match(
        /\.worker-rungrid\s*{([^}]*)}/
      )?.[1] || '';

    expect(rule).toContain('grid-template-columns: 1fr');
    expect(rule).not.toContain('max-height');
  });

  test('carries the tab-specific header chip on its own class', () => {
    const metaRule =
      workerBlock.match(/(?:^|\n)\.worker-pane__meta\s*{([^}]*)}/)?.[1] || '';

    expect(metaRule).toContain('flex: 0 0 auto');
    expect(metaRule).toContain('var(--text-dim)');
  });

  // 공유 대기 본문 (UI-5ksp §4.2·§4.3·§4.4·§4.6). 여기서 고정하는 것은 나중
  // 단계가 지우면 안 되는 구조 규칙이다: 중첩 pane의 토큰과 폭 하한, 빈 레인의
  // 뷰포트별 표시, 데스크톱 세로 띠.
  test('gives the nested wait panes card tokens and no lane min-width', () => {
    const nestedRule =
      workerBlock.match(
        /(?:^|\n)\.worker-wait \.worker-pane\s*{([^}]*)}/
      )?.[1] || '';

    expect(nestedRule).toContain('min-width: 0');
    expect(nestedRule).toContain('border: 1px solid var(--border-card)');
    expect(nestedRule).toContain('background: var(--bg-card)');
    expect(nestedRule).toContain('border-radius: var(--r-6)');
  });

  test('gives the mobile lanes one shared pane rule with no width floor', () => {
    const rule =
      CSS.match(
        /(?:^|\n)\s*\.worker-lanes--mobile \.worker-pane\s*{([^}]*)}/
      )?.[1] || '';

    expect(rule).toContain('flex: none');
    expect(rule).toContain('min-width: 0');
  });

  test('draws the wait body as two stacked areas', () => {
    const areaRule =
      workerBlock.match(/(?:^|\n)\.worker-wait__area\s*{([^}]*)}/)?.[1] || '';
    const bodyRule =
      workerBlock.match(/(?:^|\n)\.worker-wait__area-body\s*{([^}]*)}/)?.[1] ||
      '';

    expect(areaRule).toContain('flex-direction: column');
    expect(bodyRule).toContain('flex-direction: column');
  });

  test('hides the empty-lane hint until the mobile breakpoint', () => {
    const hintRule =
      workerBlock.match(/(?:^|\n)\.worker-wait__hint\s*{([^}]*)}/)?.[1] || '';
    const mq_start = CSS.indexOf(
      '@media (max-width: 640px)',
      CSS.indexOf('.worker-wait__hint')
    );
    const mq = CSS.slice(mq_start, mq_start + 700);

    expect(hintRule).toContain('display: none');
    expect(mq).toContain('.worker-wait__lane--empty > .worker-pane');
    expect(mq).toContain('.worker-wait__lane--empty > .worker-wait__hint');
    expect(mq).toContain('.is-dragging .worker-wait__lane--empty');
  });

  test('turns a collapsed desktop pane into a vertical strip', () => {
    const mq_start = CSS.indexOf('@media (min-width: 641px) {', markerIndex);
    const mq = CSS.slice(mq_start, CSS.indexOf('\n}\n', mq_start));

    // 띠의 폭 규칙은 최상위 레인 규칙(§4.5)과 같은 자식 결합자여야 이긴다.
    expect(mq).toContain('.worker-lanes > .worker-pane--collapsed');
    expect(mq).toContain('flex: 0 0 36px');
    expect(mq).toContain('writing-mode: vertical-rl');
    expect(mq).toContain('.worker-pane--collapsed .worker-pane__caret');
  });

  test('lets the pane toggle share its header with a control', () => {
    const toggleRule =
      workerBlock.match(/(?:^|\n)\.worker-pane__toggle\s*{([^}]*)}/)?.[1] || '';

    expect(toggleRule).toContain('flex: 1 1 auto');
    expect(toggleRule).toContain('min-width: 0');
    expect(toggleRule).not.toContain('width: 100%');
  });

  test('pushes the card head actions to the end of the first line', () => {
    const rule =
      workerBlock.match(
        /(?:^|\n)\.worker-card__head-actions\s*{([^}]*)}/
      )?.[1] || '';

    expect(rule).toContain('margin-left: auto');
  });

  test('keeps the row action cluster inline with the row', () => {
    const rule =
      workerBlock.match(/(?:^|\n)\.worker-mini__rowops\s*{([^}]*)}/)?.[1] || '';

    expect(rule).toContain('display: inline-flex');
    expect(rule).toContain('margin-left: auto');
  });

  test('shows the queue row ✕ without a pointer or width condition (UI-d13v §6)', () => {
    const rule =
      workerBlock.match(
        /(?:^|\n)\.worker-mini__rowops-remove\s*{([^}]*)}/
      )?.[1] || '';
    const hidden_group =
      workerBlock.match(
        /(?:^|\n)\.worker-mini__rowops-up,\s*\n\s*\.worker-mini__rowops-down\s*{([^}]*)}/
      )?.[1] || '';

    expect(rule).toContain('display: inline-flex');
    expect(hidden_group).toContain('display: none');
    expect(hidden_group).not.toContain('rowops-remove');
  });

  test('keeps the toolbar labels on one line at every width (UI-0bvr §7.3)', () => {
    const play =
      workerBlock.match(/(?:^|\n)\.worker-play\s*{([^}]*)}/)?.[1] || '';
    const toggle =
      workerBlock.match(/(?:^|\n)\.worker-tgl\s*{([^}]*)}/)?.[1] || '';

    expect(play).toContain('white-space: nowrap');
    expect(toggle).toContain('white-space: nowrap');
  });

  test('lays the toolbar toggle label and its input on one row', () => {
    const toggle =
      workerBlock.match(/(?:^|\n)\.worker-tgl\s*{([^}]*)}/)?.[1] || '';

    expect(toggle).toContain('display: inline-flex');
    expect(toggle).toContain('align-items: center');
  });

  test('drops the visible box from the ghost operation button (UI-0bvr §7.2)', () => {
    const ghost = CSS.match(/(?:^|\n)\.op-btn--ghost\s*{([^}]*)}/)?.[1] || '';

    expect(ghost).toContain('border-color: transparent');
  });

  test('keeps the coarse-pointer target size of the ghost icon button', () => {
    const icon_sizes = coarsePointerBlocks()
      .map((block) => block.match(/\.op-btn--icon\s*{([^}]*)}/)?.[1] || '')
      .filter(Boolean);

    expect(icon_sizes.join('')).toContain('min-width: 32px');
  });

  // 칩은 제자리에서 압축되지 않고 줄을 넘긴다 (UI-pw2g §3.2): `1 1 auto`와
  // 말줄임이 함께 있으면 좁은 줄에서 값이 글자를 잃는다.
  test('wraps a long running tile metadata token instead of clipping it', () => {
    const chipRule =
      workerBlock.match(/(?:^|\n)\.exec-chip\s*{([^}]*)}/)?.[1] || '';
    const valueRule =
      workerBlock.match(/(?:^|\n)\.exec-chip__v\s*{([^}]*)}/)?.[1] || '';

    expect(chipRule).toContain('min-width: 0');
    expect(chipRule).toContain('max-width: 100%');
    expect(valueRule).toContain('flex: 0 1 auto');
    expect(valueRule).toContain('overflow-wrap: anywhere');
    expect(valueRule).not.toContain('text-overflow: ellipsis');
  });
});

/**
 * Guards UI-fj0b: a `var(--x)` whose custom property nobody defines makes the
 * whole declaration invalid, so the hover/focus feedback it carries silently
 * does nothing. `--accent` was dead that way for six rules plus the `.op-btn`
 * token UI-6g3t introduced.
 */
describe('design token definitions', () => {
  const TOKENS = readFileSync(
    path.resolve(process.cwd(), 'app/styles/tokens.css'),
    'utf8'
  );
  const BASE = readFileSync(
    path.resolve(process.cwd(), 'app/styles/base.css'),
    'utf8'
  );

  /** Custom properties stamped onto elements from JS, never declared in CSS. */
  const RUNTIME_INJECTED = new Set(['--progress']);

  /**
   * The body of a top-level rule, matched by counting braces so a nested block
   * (`@media`, `color-mix` has none, but `:root` may gain one) cannot truncate it.
   *
   * @param {string} css
   * @param {string} selector
   * @returns {string}
   */
  function ruleBody(css, selector) {
    const at = css.indexOf(`${selector} {`);
    if (at < 0) {
      return '';
    }
    const open = css.indexOf('{', at);
    let depth = 0;
    for (let i = open; i < css.length; i++) {
      if (css[i] === '{') {
        depth += 1;
      } else if (css[i] === '}') {
        depth -= 1;
        if (depth === 0) {
          return css.slice(open + 1, i);
        }
      }
    }
    return '';
  }

  test('defines --accent for the dark default theme', () => {
    const root = ruleBody(TOKENS, ':root');

    expect(root).toMatch(/--accent:\s*#[0-9a-f]{6};/);
  });

  test('overrides --accent for the light theme', () => {
    const light = ruleBody(TOKENS, ":root[data-theme='light']");

    expect(light).toMatch(/--accent:\s*#[0-9a-f]{6};/);
  });

  /**
   * WCAG 2.x relative luminance of one `#rrggbb` string.
   *
   * @param {string} hex
   * @returns {number}
   */
  function luminance(hex) {
    const channels = [1, 3, 5]
      .map((at) => parseInt(hex.slice(at, at + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  /**
   * WCAG contrast ratio between two `#rrggbb` strings.
   *
   * @param {string} a
   * @param {string} b
   * @returns {number}
   */
  function contrast(a, b) {
    const x = luminance(a);
    const y = luminance(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  /**
   * One declared custom property's value inside a rule body.
   *
   * @param {string} body
   * @param {string} name
   * @returns {string}
   */
  function tokenValue(body, name) {
    const m = body.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6});`));
    return m ? m[1].toLowerCase() : '';
  }

  const DARK = ruleBody(TOKENS, ':root');
  const LIGHT = ruleBody(TOKENS, ":root[data-theme='light']");

  test('defines both route tokens of every classification in the dark theme', () => {
    const values = ['spec_backed', 'quick_fix', 'full_plan', 'unset'].flatMap(
      (route) => [
        tokenValue(DARK, `--route-${route}-bg`),
        tokenValue(DARK, `--route-${route}-fg`)
      ]
    );

    expect(values).toEqual([
      '#122925',
      '#5eead4',
      '#172338',
      '#93c5fd',
      '#251d38',
      '#c4b5fd',
      '#171c26',
      '#a9b4c6'
    ]);
  });

  test('overrides every route token for the light theme', () => {
    const values = ['spec_backed', 'quick_fix', 'full_plan', 'unset'].flatMap(
      (route) => [
        tokenValue(LIGHT, `--route-${route}-bg`),
        tokenValue(LIGHT, `--route-${route}-fg`)
      ]
    );

    expect(values).toEqual([
      '#e8f3f0',
      '#0f766e',
      '#edf2ff',
      '#1d4ed8',
      '#f3edfb',
      '#6d28d9',
      '#f2f5f9',
      '#47536a'
    ]);
  });

  test('overrides all five stage on colors for the light theme', () => {
    const values = ['spec', 'plan', 'impl', 'pr', 'merge'].map((stage) =>
      tokenValue(LIGHT, `--stage-${stage}-on`)
    );

    expect(values).toEqual([
      '#0f766e',
      '#1d4ed8',
      '#6d28d9',
      '#be185d',
      '#166534'
    ]);
  });

  /** Every light surface the stage text and the route chip can sit on (§3.2). */
  const LIGHT_BACKGROUNDS = [
    '--bg-app',
    '--bg-panel',
    '--bg-card',
    '--bg-candidate',
    '--bg-drawer',
    '--bg-tile-run',
    '--bg-gate-pill',
    '--route-spec_backed-bg',
    '--route-quick_fix-bg',
    '--route-full_plan-bg',
    '--route-unset-bg'
  ].map((name) => tokenValue(LIGHT, name));

  test('reads every light stage on color at 4.5:1 or better', () => {
    const worst = ['spec', 'plan', 'impl', 'pr', 'merge'].map((stage) => {
      const fg = tokenValue(LIGHT, `--stage-${stage}-on`);
      return Math.min(...LIGHT_BACKGROUNDS.map((bg) => contrast(fg, bg)));
    });

    expect(worst.every((ratio) => ratio >= 4.5)).toBe(true);
  });

  test('reads every light route chip color at 4.5:1 or better', () => {
    const worst = ['spec_backed', 'quick_fix', 'full_plan', 'unset'].map(
      (route) => {
        const fg = tokenValue(LIGHT, `--route-${route}-fg`);
        return Math.min(...LIGHT_BACKGROUNDS.map((bg) => contrast(fg, bg)));
      }
    );

    expect(worst.every((ratio) => ratio >= 4.5)).toBe(true);
  });

  test('keeps the light focus accent above the 3:1 non-text threshold', () => {
    const accent = tokenValue(LIGHT, '--accent');

    const worst = Math.min(
      ...LIGHT_BACKGROUNDS.map((bg) => contrast(accent, bg))
    );

    expect(worst).toBeGreaterThanOrEqual(3);
  });

  test('drops the opacity reduction from the derived route chip', () => {
    const derived =
      BASE.match(/\.ctl-chip--route\.is-derived\s*{([^}]*)}/)?.[1] || '';

    expect(derived).toContain('border-style: dashed');
    expect(derived).not.toContain('opacity');
  });

  test('paints the neutral card route background from the route tokens', () => {
    for (const route of ['spec_backed', 'quick_fix', 'full_plan', 'unset']) {
      expect(CSS).toContain(`.worker-card--route-bg[data-route='${route}']`);
      expect(CSS).toContain(`.worker-mini--route-bg[data-route='${route}']`);
      expect(CSS).not.toContain(`.rtile--route-bg[data-route='${route}']`);
      expect(CSS).toContain(`background: var(--route-${route}-bg);`);
    }
  });

  test('leaves no var() reference without a definition or a fallback', () => {
    const all_css = [BASE, TOKENS, CSS].join('\n');
    /** @type {Set<string>} */
    const defined = new Set();
    for (const m of all_css.matchAll(/(--[a-z0-9-]+)\s*:/g)) {
      defined.add(m[1]);
    }
    /** @type {string[]} */
    const dangling = [];
    for (const m of all_css.matchAll(/var\(\s*(--[a-z0-9-]+)\s*\)/g)) {
      if (!defined.has(m[1]) && !RUNTIME_INJECTED.has(m[1])) {
        dangling.push(m[1]);
      }
    }

    expect([...new Set(dangling)]).toEqual([]);
  });
});
