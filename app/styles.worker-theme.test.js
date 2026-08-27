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
    const mediaStart = CSS.indexOf(
      '@media (any-pointer: coarse), (max-width: 640px)'
    );
    const mediaEnd = CSS.indexOf('/* 클릭 어포던스', mediaStart);
    const mediaBlock = CSS.slice(mediaStart, mediaEnd);

    expect(baseRule).not.toContain('display: none');
    expect(mediaBlock).not.toContain('.worker-card__place');
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

  test('moves a mini-row admission reason below its ID and title at every width', () => {
    const responsiveMarker = CSS.indexOf(
      '/* ---------- Worker responsive (<=640px)'
    );
    const baseWorkerCss = CSS.slice(markerIndex, responsiveMarker);
    const lineRule =
      baseWorkerCss.match(
        /#worker-root \.worker-mini__line:has\(> \.worker-mini__reason\)\s*{([^}]*)}/
      )?.[1] || '';
    const reasonRule =
      baseWorkerCss.match(
        /#worker-root \.worker-mini__line > \.worker-mini__reason\s*{([^}]*)}/
      )?.[1] || '';

    expect(responsiveMarker).toBeGreaterThan(markerIndex);
    expect(lineRule).toContain('flex-wrap: wrap');
    expect(reasonRule).toContain('flex: 1 0 100%');
    expect(reasonRule).toContain('margin-left: 0');
    expect(reasonRule).toContain('min-width: 0');
    expect(reasonRule).toContain('white-space: normal');
    expect(reasonRule).toContain('overflow-wrap: anywhere');
  });

  test('moves a card-head admission reason below PR links and badges', () => {
    const responsiveMarker = CSS.indexOf(
      '/* ---------- Worker responsive (<=640px)'
    );
    const baseWorkerCss = CSS.slice(markerIndex, responsiveMarker);
    const reasonRule =
      baseWorkerCss.match(
        /#worker-root \.worker-mini--card \.worker-mini__head > \.worker-mini__reason\s*{([^}]*)}/
      )?.[1] || '';

    expect(responsiveMarker).toBeGreaterThan(markerIndex);
    expect(reasonRule).toContain('flex: 1 0 100%');
    expect(reasonRule).toContain('min-width: 0');
    expect(reasonRule).toContain('max-width: 100%');
    expect(reasonRule).toContain('margin-left: 0');
    expect(reasonRule).toContain('white-space: normal');
    expect(reasonRule).toContain('overflow-wrap: anywhere');
  });

  test('wraps every standard mini-row sibling in narrow lanes', () => {
    const lineRule =
      workerBlock.match(/(?:^|\n)\.worker-mini__line\s*{([^}]*)}/)?.[1] || '';

    expect(lineRule).toContain('flex-wrap: wrap');
  });

  test('keeps long mini-row badges readable in a narrow lane', () => {
    const badgeRule =
      workerBlock.match(/(?:^|\n)\.worker-mini__badge\s*{([^}]*)}/)?.[1] || '';

    expect(badgeRule).toContain('min-width: 0');
    expect(badgeRule).toContain('max-width: 100%');
    expect(badgeRule).toContain('overflow-wrap: anywhere');
  });

  test('wraps candidate card header items in narrow lanes', () => {
    const headRule =
      workerBlock.match(/(?:^|\n)\.worker-card__head\s*{([^}]*)}/)?.[1] || '';

    expect(headRule).toContain('flex-wrap: wrap');
    expect(headRule).toContain('min-width: 0');
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

  test('wraps running tile header controls in narrow lanes', () => {
    const headerRule =
      workerBlock.match(/(?:^|\n)\.rtile__hd\s*{([^}]*)}/)?.[1] || '';

    expect(headerRule).toContain('flex-wrap: wrap');
    expect(headerRule).toContain('min-width: 0');
  });

  test('keeps wrapped running tile controls pinned to the right', () => {
    const actionsRule =
      workerBlock.match(/(?:^|\n)\.rtile__hd-actions\s*{([^}]*)}/)?.[1] || '';

    expect(actionsRule).toContain('margin-left: auto');
    expect(actionsRule).toContain('flex: 0 0 auto');
  });

  test('wraps running tile metadata in narrow lanes', () => {
    const metaRule =
      workerBlock.match(/(?:^|\n)\.rtile__meta\s*{([^}]*)}/)?.[1] || '';

    expect(metaRule).toContain('flex-wrap: wrap');
    expect(metaRule).toContain('min-width: 0');
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
    // 선택자 목록이다 — Monitor 연결 레인도 같은 중첩 단계라 같은 토큰을 받는다
    // (UI-5ksp §4.5), 그래서 규칙 본문 하나만 읽는다.
    const nestedRule =
      workerBlock.match(
        /(?:^|\n)\.worker-wait \.worker-pane,[^{]*{([^}]*)}/
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

  test('keeps running tile metadata readable when it has a long token', () => {
    const chipRule =
      workerBlock.match(/(?:^|\n)\.exec-chip\s*{([^}]*)}/)?.[1] || '';
    const valueRule =
      workerBlock.match(/(?:^|\n)\.exec-chip__v\s*{([^}]*)}/)?.[1] || '';

    expect(chipRule).toContain('min-width: 0');
    expect(chipRule).toContain('max-width: 100%');
    expect(valueRule).toContain('white-space: nowrap');
    expect(valueRule).toContain('text-overflow: ellipsis');
  });
});
