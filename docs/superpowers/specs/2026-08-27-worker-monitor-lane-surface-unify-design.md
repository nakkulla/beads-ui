---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/lane-collapse.js
  - app/views/worker/lane-collapse.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/utils/viewport.js
  - app/utils/viewport.test.js
  - app/main.monitor.e2e.test.js
  - app/main.worker-queue-sync.test.js
  - app/main.closed-range.e2e.test.js
  - app/styles.css
  - app/styles.worker-theme.test.js
  - app/styles.monitor-theme.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-5ksp — Worker·Monitor 레인 표면 정합 1단계

- Bead: `UI-5ksp` (route `spec_backed`)
- 선행: `2026-08-25-card-header-grammar-unify-design.md`(UI-251y) 카드 슬롯 표,
  `2026-08-24-monitor-wait-lane-unify-design.md`(UI-e6hw) 대기 레인 두 영역,
  `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 연결 레인·의존성
  버튼, UI-58y2 Worker 모바일 `지금` 패널.
- 사용자 결정(2026-08-27): §3.

## 1. 문제

Worker 탭과 Monitor 탭은 카드·행·타일 렌더러와 레인 host DOM을 이미 공유한다.
Monitor 루트는 문자 그대로 `<div class="worker-lanes mon2-lanes">`이고,
`paneTemplate`·`candidateCard`·`miniRow`·`runningTile`·transcript drawer를
`app/views/worker/*`에서 import한다. 그런데 **레인 안을 채우는 조립**은 두 벌이다.

| 역할 | Worker | Monitor |
|---|---|---|
| 대기 레인 본문 | `.worker-wait` 안에 병렬·직렬을 **각각 별도 `.worker-pane`** 으로 쌓음 (`worker/index.js lanesTemplate`) | 대기 pane **하나** 안에 `.mon2-wait` 병렬 영역·직렬 영역 (`monitor/index.js waitBody`) |
| 접기 | 모바일에서만 `lane_collapse`(queue·done) | 레포 섹션 접기 + 병렬·직렬 영역 접기(`sections_state`) |
| 레인 폭 | 후보 `flex: 0.9`, 나머지 `flex: 1`, `min-width: 220px` | `.mon2-lanes > .worker-pane { flex: 1 1 0; min-width: 0 }` |
| 중첩 pane 토큰 | 직렬 pane도 panel 토큰(`--border-panel`·`--r-8`) | 연결 레인 `.mon2-clane`은 card 토큰(`--border-card`·`--r-6`) |
| 모바일 | `지금` 패널(실행 중+PR 대기) → 대기 → 후보 → 완료, `.worker-rungrid { max-height: 40vh }` | 다섯 pane을 CSS `order`로 재배열 |
| 후보 카드 foot | 터치/≤640px에서만 (`.worker-card__foot--actions-only`) | `dep_action`이 foot을 항상 켬(⛓ 의존성 버튼 때문) |
| 대기 행 조작 | 행 안 1번 줄 | 행 **밖** `<span class="mon2-rowops">`(⛓ ↑ ↓ ✕) 별도 줄 |

그 결과가 사용자가 본 세 증상이다.

1. **대기 레인이 좁다.** `app/styles.css` `.worker-wait > .worker-pane { flex: 0 1 auto;
   min-height: 72px }` — 주석이 밝히듯 "높이 배분은 내용 기준"으로 grow를 껐기 때문에
   빈 레인은 72px만 차지하고 나머지 높이가 논다. Monitor는 이 규칙이 없어 레인 전체
   높이를 쓴다.
2. **스타일이 다르다.** 위 표의 폭·토큰·제목(`후보 · Board 연동` vs `실행가능`,
   `실행 중 · 슬롯 5` vs `실행중`)·조작 자리 차이.
3. **완료 레인을 접을 수 없다.** 데스크톱 접기는 두 탭 모두 없다.

한쪽을 고치면 다른 쪽이 따라오지 않는 것은 구조의 결과다. 이 스펙은 **레인 표면**
(대기 본문·접기·폭·토큰·제목·조작 자리·모바일 분기)을 한 벌로 만든다. 스냅샷 →
레인 모델 조립(`worker/index.js buildModel` ~1,700줄 vs `monitor/lanes.js
buildLanes` ~1,290줄)의 단일화는 서버 스냅샷 두 종류의 필드 정합이 필요하므로 2단계
형제 Bead다(§9).

## 2. 검증된 전제

- `paneTemplate`(`app/views/worker/lanes.js`)은 이미 `collapsible`·`collapsed`·
  `preview`를 받아 `.worker-pane--collapsed`와 `<button class="worker-pane__hd
  worker-pane__hd--toggle">`를 그린다. 데스크톱에서는 어느 탭도 이 옵션을 켜지 않는다.
- Worker 드롭 처리는 접힌 대기 pane 위 드롭을 **허용**하고 인덱스를 큐 말미로 맞춘다
  (`worker/index.js` ~5514, UI-58y2 §모바일 3: "스트립에 떨어뜨린 사람이 원한 것은
  대기에 넣기"). 이 의미는 유지한다.
- `paneTemplate`의 collapsible 분기는 `header_control`을 그리지 않는다(토글이 헤더
  전체를 `<button>`으로 감싸기 때문). Worker가 완료 범위 선택을 `controls` 줄에 둔 이유가
  이것이다(`worker/index.js` ~5081 주석).
- Monitor 레포 직렬 레인은 `cycle` 외에 `cross_wait_peers`(레포 간 상호 정지 경고,
  `.mon2-lane__cross-wait`, `monitor/index.js` ~1834)를 pane 아래에 그린다.
- `app/main.closed-range.e2e.test.js`는 `#worker-pane-done .worker-done-range`를 직접
  조회한다(~203). 완료 pane이 기본 접힘이 되면 이 테스트가 깨진다.
- Monitor `serialLanePane`은 `paneTemplate`을 쓰되 `body`로 `.mon2-lane__rows`(드롭
  속성 `data-drop`·`data-root-dir`·`data-lane-id`·`data-lane-length`)를 넘긴다.
  Worker 드롭은 `.worker-pane`의 `data-lane`을 읽는다. 두 탭의 드롭 식별자는 다르고
  이 스펙은 그것을 바꾸지 않는다.
- Monitor 빈 직렬 레인은 `.mon2-lane--empty > .worker-pane { display: none }`과
  `.is-dragging` 복원으로 CSS가 표시를 소유한다(UI-e6hw §6). Monitor는 드래그 시작
  시 `console_el.classList.add('is-dragging')`을 하고 Worker는 하지 않는다.
- 접힘 저장 키: Worker `beads-ui.worker.lane-collapsed`(`{ queue, done }`), Monitor
  `beads-ui.monitor.sections`(`root_dir` 키 + `parallel`·`serial` 불리언 혼재).
- 390px 모바일 에뮬레이션(CDP `Emulation.setDeviceMetricsOverride`, `mobile:true`)
  에서 두 탭 모두 문서 `scrollWidth === innerWidth`다. 가로 넘침 결함은 없다 —
  헤드리스 창 최소폭이 만든 촬영 왜곡이었다. Monitor 데크 타일만 `.mon2-deck__strip`
  안에서 의도된 가로 스와이프로 넘친다.
- `lit-html@3.3`의 `directives/if-defined.js`가 설치돼 있어 선택적 `data-*` 속성을
  `ifDefined`로 쓸 수 있다.
- 스타일 테스트 두 개(`app/styles.worker-theme.test.js`, `app/styles.monitor-theme.test.js`)
  가 선택자 존재·부재를 문자열로 단언한다. 이 스펙이 지우는 규칙(`.worker-now*`,
  `.mon2-wait`, `.mon2-area*`, `.mon2-lane*`, 모바일 `order`, `.worker-wait >
  .worker-pane`)을 단언하는 테스트가 있으므로 함께 갱신한다.

## 3. 사용자 결정 (2026-08-27)

1. 1단계는 레인 표면 정합만. 레인 조립 단일화(2단계)와 의존 편집기의 이슈 상세 이동은
   형제 Bead.
2. 완료 레인 접힘은 데스크톱에서 **얇은 세로 띠**(레인 색 스파인·세로 제목·건수).
3. 다섯 레인 모두 접기 가능, 기본 접힘은 완료만.
4. 빈 직렬 레인: 데스크톱은 Worker 규칙(pane 유지, "비어 있음" 문구), ≤640px는 Monitor
   규칙(한 줄 힌트, 드래그 중에만 pane).
5. 후보 카드 foot(`대기로 ↴`)은 두 탭 모두 터치/≤640px에서만. Monitor ⛓ 의존성 버튼은
   foot과 분리한다. 의존성 편집의 최종 자리는 이슈 상세(형제 Bead); 그때까지 ⛓ 버튼은
   카드·행의 1번 줄 조작 슬롯에 둔다. 의존은 `대기로 ↴`가 아니라 의존성 편집 또는
   연결 레인 `확정`으로만 생긴다(UI-j92s 결정 유지).
6. 모바일은 두 탭이 같은 분기: `지금`(실행 중 + PR 대기) → 대기 → 후보 → 완료. Monitor도
   `지금` 패널을 채택한다.
7. 칩은 UI-251y 슬롯 표를 두 탭이 같이 따르고, 호출 측이 다른 재료를 넘겨 생기는
   드리프트를 없앤다.

## 4. 화면 구조

### 4.1 데스크톱 레인 host

```
.worker-lanes-host (overflow-x:auto)
└ .worker-lanes (flex row, gap sp-8)
  ├ .worker-pane--lane-candidate  --src   [후보]        flex 1 1 0 · min-width 220
  ├ .worker-pane--lane-queue               [대기]        ″  ← body = waitBody
  ├ .worker-pane--lane-running             [실행 중]     ″  ← body = 실행 grid
  ├ .worker-pane--lane-pr_wait             [PR 대기]     ″
  └ .worker-pane--lane-done  --collapsed   [완료]        flex 0 0 36px (기본 접힘)
```

- 다섯 pane 모두 `flex: 1 1 0; min-width: 220px`. `.worker-pane--src { flex: 0.9 }`와
  `.mon2-lanes > .worker-pane { min-width: 0 }`는 삭제한다. 다섯 레인 최소폭 합이
  창을 넘으면 host가 가로 스크롤한다 — 두 탭 동일.
- 후보 pane은 두 탭 모두 `src: true`(dashed 테두리·`--bg-candidate`). "이슈의 원천이지
  생애 단계가 아니다"라는 표현은 Monitor에도 같은 뜻이다.
- Monitor 레포 데크(`.mon2-deck`)는 레인 위에 그대로 남는다. Monitor의 cross-repo
  확장이다.

### 4.2 공유 대기 본문 `waitBody`

`app/views/worker/lanes.js`가 export한다. Monitor `parallelArea`·`serialArea`·
`serialLanePane`과 Worker `.worker-wait` 스택·`serialLaneTemplate`을 대체한다.

```js
/**
 * @typedef {{
 *   id: string,                       // 's1'.. — paneTemplate `lane`·`data-lane`
 *   title: string,                    // '직렬 1' | 'dotfiles · 직렬 1'
 *   rows: TemplateResult[],           // 호출 측이 그린 행 (miniRow 등)
 *   count: number,                    // 헤더 건수
 *   empty: boolean,                   // rows·occupant 모두 없음
 *   badge?: TemplateResult|string,    // 점유 뱃지 (header_control 왼쪽)
 *   held?: boolean,                   // 점유 중 강조
 *   cycle?: boolean,                  // blocks 순환 경고 줄
 *   after?: TemplateResult,           // pane 아래 호출 측 조각 (Monitor 상호 정지 경고)
 *   header_control?: TemplateResult,  // 뱃지 오른쪽 (Monitor `Worker ↗`)
 *   drop?: WaitDropAttrs              // 행 컨테이너 data-* (Monitor)
 * }} WaitSerialLane
 * @typedef {{ drop?: string, root_dir?: string, lane_id?: string, lane_length?: string }} WaitDropAttrs
 * @typedef {{
 *   parallel: { rows: TemplateResult[], count: number, collapsed: boolean, drop?: WaitDropAttrs },
 *   serial: {
 *     lanes: WaitSerialLane[],
 *     collapsed: boolean,
 *     extra_panes?: TemplateResult[],   // Monitor 연결 레인 pane — 레포 직렬 레인 앞
 *     header_control?: TemplateResult,  // Monitor `+ 연결 레인`
 *     notice?: TemplateResult           // Monitor '연결 레인 저장소를 읽을 수 없음'
 *   }
 * }} WaitBodyModel
 */
export function waitBody(model) {}
```

DOM:

```
.worker-wait
├ section.worker-wait__area.worker-wait__area--parallel[.is-collapsed] data-area=parallel
│ ├ header.worker-wait__area-hd   [▾/▸ toggle] [병렬 영역] [count]
│ └ div.worker-wait__area-body   (+ data-drop 등 `parallel.drop`)   rows | .worker-pane__empty
└ section.worker-wait__area.worker-wait__area--serial[.is-collapsed] data-area=serial
  ├ header.worker-wait__area-hd   [▾/▸ toggle] [직렬 영역] [header_control]
  └ div.worker-wait__area-body
    ├ notice?
    ├ extra_panes…                (Monitor 연결 레인)
    └ div.worker-wait__lane[.worker-wait__lane--empty] × lanes
      ├ paneTemplate({ id, lane:id, title, items:[], header_control: badge+control,
      │                body: div.worker-wait__rows (+ drop data-*) rows | .worker-pane__empty })
      ├ div.worker-wait__hint      "<title> · 비어 있음"   (empty일 때만)
      ├ div.worker-lane__cycle     (cycle일 때만)
      └ after                      (Monitor `cross_wait_peers` 경고 — 호출 측이 그림)
```

- 본문은 **구조**만 소유한다. 행 렌더링(`miniRow`, Monitor `parallelRow`/`serialRow`/
  `occupantRow`), 레포 배지, 연결 레인 pane(`chainLanePane`), `+ 연결 레인` 버튼, 레포 간
  상호 정지 경고(`cross_wait_peers` → `after`)는 호출 측이 만들어 슬롯으로 넘긴다.
  Worker는 `extra_panes`·`header_control`·`notice`·`drop`·`after`를 넘기지 않는다 —
  재료가 없는 자리는 그리지 않는다. Monitor의 기존 상호 정지 경고는 이 `after` 슬롯으로
  그대로 옮겨져 사라지지 않는다(테스트 §7).
- `drop` 속성은 `ifDefined`로 있을 때만 붙는다. Worker 드롭은 pane `data-lane`, Monitor
  드롭은 행 컨테이너 `data-drop`/`data-root-dir`/`data-lane-id`/`data-lane-length`를
  지금처럼 읽는다. 드롭 식별자 통일은 2단계 범위다.
- 직렬 pane의 `items`는 빈 배열로 넘기고 건수는 `count`로 헤더에 쓴다. `paneTemplate`은
  `pane.count`가 있으면 그것을, 없으면 `items.length`를 건수로 쓴다(추가 옵션).
- 영역 접기 토글은 `.worker-wait__area-hd` 안 `button[data-area]`. 클릭 처리는 두
  탭의 index.js가 `lane-collapse` 스토어(§4.4)로 위임한다.

### 4.3 빈 직렬 레인

`lane.empty`이면 wrapper에 `.worker-wait__lane--empty`, 그 아래 `.worker-wait__hint`.
표시 조건은 `app/styles.css` 한 곳이 소유한다.

| 뷰포트 | pane | hint |
|---|---|---|
| ≥641px | 보임 (`.worker-pane__empty` "비어 있음 — 행을 여기로 드래그") | 숨김 |
| ≤640px | 숨김 | 보임 |
| ≤640px + `.is-dragging` | 보임 | 숨김 |

Worker도 드래그 시작·종료에 콘솔 루트(`.worker-console`)에 `is-dragging`을 넣고 뺀다
(Monitor `console_el`과 같은 규칙). 드롭 타깃 판별 로직은 그대로다.

### 4.4 레인 접기

`app/views/worker/lane-collapse.js`(신규):

```js
/**
 * @typedef {{ lanes: Partial<Record<LaneId, boolean>>, areas: { parallel?: boolean, serial?: boolean } }} LaneCollapseState
 * LaneId = 'candidate'|'queue'|'running'|'pr_wait'|'done'
 */
export function createLaneCollapse(storage_key, defaults = { lanes: { done: true }, areas: {} }) {
  return { isCollapsed(lane), isAreaCollapsed(area), toggle(lane), toggleArea(area) };
}
```

- 저장 키: Worker `beads-ui.worker.lane-collapsed`(기존), Monitor
  `beads-ui.monitor.lane-collapsed`(신규). `localStorage` 읽기·쓰기는 fail-quiet.
- 하위 호환: 읽은 값에 `lanes` 키가 없고 최상위가 불리언 맵이면(`{ queue, done }`
  구형) 그것을 `lanes`로 승격한다. Monitor `beads-ui.monitor.sections`의 `parallel`·
  `serial` 불리언은 더 이상 읽지 않는다(레포 섹션 키는 그대로).
- 다섯 pane 모두 `collapsible: true`. `paneTemplate`의 헤더 구조를 바꾼다: 토글은
  헤더 전체가 아니라 **별도 `<button class="worker-pane__toggle" data-lane aria-expanded>`**
  (caret + 점 + 제목 + 건수)이고, `header_control`(후보 정렬·실행 정렬·`슬롯 N`·완료 범위
  등)은 그 **형제**로 헤더 오른쪽에 선다. 접혔을 때는 `header_control`·`controls`·
  `body`를 그리지 않고, 펼쳤을 때 `header_control` 조작(`<select>` 변경·버튼 클릭)은
  토글 버튼 밖에 있으므로 접힘 상태를 바꾸지 않는다(테스트 §7). 지금 Worker가 완료
  범위를 `controls` 줄에 둔 이유(collapsible 헤더가 `header_control`을 못 그림)가
  사라지므로 §4.5의 `header_control` 이관이 가능해진다.
- 데스크톱 접힘(`@media (min-width: 641px)` `.worker-pane--collapsed`): `flex: 0 0
  36px; min-width: 0; padding: var(--sp-6) 0`. 헤더 버튼은 `writing-mode: vertical-rl`
  로 점 → 제목 → 건수 순, caret 숨김, 상단 2px 스파인 유지. 제목이 띠 높이를 넘으면
  ellipsis.
- 모바일 접힘은 가로 방향 그대로(토글 버튼 한 줄 + `preview`), 세로 띠 규칙은
  `min-width: 641px` 가드 안에만 있다.
- 접힌 대기 pane 위 드롭은 **지금처럼 허용**되고 병렬 큐 말미에 적재된다(UI-58y2
  §모바일 3 의미 유지, `worker/index.js` ~5514). 데스크톱 세로 띠도 같은 드롭 타깃이다
  (`.worker-pane--drag-over` 강조 포함). 접힌 후보 pane 위 드롭도 지금 의미 그대로다(대기
  행을 떨어뜨리면 큐에서 제거, 후보→후보는 행이 없어 재정렬할 것이 없다). 직렬 레인은
  대기 pane 안에 있어 개별 접힘이 없다. `대기로 ↴`·배치 메뉴는
  대기 레인이 접혀 있어도 동작한다 — 적재 후 레인을 자동으로 펼치지 않는다.
- 클릭 위임: `.worker-pane__toggle[data-lane]` → `toggle(lane)`, `.worker-wait__area-hd
  button[data-area]` → `toggleArea(area)`, 둘 다 저장 후 재렌더. 기존
  `.worker-pane__hd--toggle` 셀렉터는 새 버튼 클래스로 바뀐다.

### 4.5 레인 폭·토큰·제목

- 중첩 한 단계 = 토큰 한 단계 아래. 바깥 다섯 pane은 panel 토큰(`--border-panel`,
  `--bg-panel`, `--r-8`). 대기 본문 안의 직렬 pane과 Monitor 연결 레인 pane은 card
  토큰(`--border-card`, `--bg-card`, `--r-6`). `.worker-wait .worker-pane` 규칙 하나가
  이를 소유하고 `.mon2-clane`의 개별 토큰 규칙은 여기에 흡수된다.
- 폭 하한은 **최상위 pane에만**: `.worker-lanes > .worker-pane { min-width: 220px }`,
  `.worker-wait .worker-pane { min-width: 0 }`. `.worker-wait > .worker-pane` 규칙을
  지우면 중첩 pane이 전역 220px을 물려받아 바깥 대기 pane 안에서 넘치므로, 이 두 규칙을
  스타일 테스트로 고정한다.
- 제목 어휘는 두 탭 공통 `후보` · `대기` · `실행 중` · `PR 대기` · `완료`. 탭 부가정보는
  `header_control`로 옮긴다: Worker `슬롯 N` 칩(실행 중), 완료 범위 선택(`오늘`·`7일`…)
  은 두 탭 모두 `header_control`(지금 Worker는 `controls` 줄, Monitor는 header 오른쪽).
  Worker 후보의 `Board 연동`은 제목에서 뺀다 — 정렬 컨트롤이 이미 header에 있다.
- `.mon2-parallel .worker-mini__seq::before { content: '#' }`는 삭제한다. 순번 표기는
  `miniRow` 하나의 것이다.

### 4.6 칩·foot·조작

- `candidateCard`의 foot 표시 조건은 `item.reason`만 본다. `options.dep_action`은 foot을
  켜지 않는다. `.worker-card__foot--actions-only`의 미디어쿼리(coarse pointer / ≤640px)
  가 두 탭에 같이 적용된다.
- ⛓ 의존성 버튼은 슬롯 1 조작(1번 줄 오른쪽 끝)이다. `candidateCard`는 `options.dep_action`
  일 때 `.worker-card__head` 끝에 `<span class="worker-card__head-actions">`(margin-left
  auto)로 그린다. Monitor 대기 행의 `mon2-rowops`(⛓ ↑ ↓ ✕)는 행 밖 별도 줄을 그만두고
  `miniRow(item, { actions })`의 새 옵션으로 행 1번 줄 조작 영역 끝에 들어간다. 클래스는
  `worker-mini__rowops`·`worker-mini__rowops-*`로 이관하고 이벤트 위임 셀렉터를 같이
  바꾼다.
- 레포 배지·연결 레인 칩·route·exec 칩은 이미 슬롯 5 fail-quiet라 변경 없다.
- UI-251y 스펙 §5.1 슬롯 표에 정정 문단을 추가한다: "⛓ 의존성 버튼은 슬롯 1 조작이다.
  UI-j92s가 `대기로 ↴` 옆(foot)에 두었던 자리는 UI-5ksp가 옮겼다." `AGENTS.md` 카드
  배치 문법 절은 결정만 싣고 있으므로 바뀌지 않는다(scope에도 없다).

### 4.7 모바일

- 두 탭이 같은 분기를 쓴다. 뷰포트 판정은 `app/utils/viewport.js`(신규)
  `MOBILE_QUERY = '(max-width: 640px)'`·`watchMobile(on_change) → unsubscribe`로
  옮기고 Worker `watchViewport`를 대체한다. 계약: 등록 시 현재 `matches`를 **동기적으로
  한 번** 콜백하고 이후 변경만 전달한다; `matchMedia`가 없으면 최초 `false`를 전달하고
  변경 구독은 하지 않는다. 그래서 첫 렌더부터 모바일 DOM이 된다. Monitor도 같은
  watcher로 `is_mobile`을 갖는다(지금은 CSS `order`만으로 재배열).
- 모바일 DOM 순서: `지금` → `대기` → `후보` → `완료`. `nowPanel({ live, running_body,
  pr_wait_rows, count })`를 `worker/lanes.js`가 export하고 Monitor가 import한다. Monitor
  `.mon2-lanes > .worker-pane--lane-* { order }` 규칙은 삭제한다.
- 실행 중·PR 대기 pane은 모바일에서 그리지 않는다(`지금`이 가져간다). 모바일 접기는
  대기·후보·완료 세 pane, 기본 접힘 완료, 저장은 데스크톱과 같은 키.
- 내부 스크롤 없음: `.worker-rungrid { max-height: 40vh }`(≤640px) 삭제. 문서 스크롤
  하나만 남긴다. pane `min-width: 0`.
- 가독성 기준: 390px 에뮬레이션에서 문서 `scrollWidth === innerWidth`; 카드 1번 줄
  조작 버튼은 잘리지 않고 wrap; 대기 본문의 빈 직렬 레인은 힌트 한 줄; 세로 띠 접힘은
  모바일에서 나오지 않는다(`min-width: 641px` 가드).

## 5. 코드 배치

| 파일 | 변경 |
|---|---|
| `app/views/worker/lanes.js` | `waitBody`·`nowPanel` export 추가, `paneTemplate`에 `count` 옵션·별도 `.worker-pane__toggle` 버튼 + 형제 `header_control`·접힘 시 `header_control`/`controls`/`body` 생략, `candidateCard` foot 조건·`head-actions`, `miniRow(item, { actions })` |
| `app/views/worker/lane-collapse.js` | 신규 `createLaneCollapse` |
| `app/utils/viewport.js` | 신규 `MOBILE_QUERY`·`watchMobile` |
| `app/views/worker/index.js` | `.worker-wait` 스택·`serialLaneTemplate`·`nowPanelTemplate`·`watchViewport`·`loadLaneCollapse/saveLaneCollapse` 제거 → `waitBody`·`nowPanel`·`createLaneCollapse`·`watchMobile` 사용, 다섯 pane `collapsible`, 제목·`header_control` 이관, 드래그 `is-dragging` |
| `app/views/monitor/index.js` | `parallelArea`·`serialArea`·`serialLanePane`·`areaCollapsed`·`toggleArea` 제거 → `waitBody` 호출(행·연결 레인 pane·`+ 연결 레인`은 그대로 만들어 슬롯으로), `nowPanel` 모바일 분기, `createLaneCollapse`, 후보 `src: true`, 제목 어휘, `mon2-rowops` → `miniRow` `actions`, 이벤트 위임 셀렉터 |
| `app/styles.css` | 삭제: `.worker-wait > .worker-pane`(grow 0·72px), `.worker-pane--src { flex }`, `.mon2-lanes > .worker-pane`, `.mon2-wait`, `.mon2-area*`, `.mon2-lane*`, `.mon2-rowops*`, `.mon2-parallel … ::before`, `.worker-now*`, Monitor 모바일 `order`, `.worker-rungrid` 40vh. 추가: `.worker-wait__*`, `.worker-mini__rowops*`, `.worker-card__head-actions`, 데스크톱 `.worker-pane--collapsed` 세로 띠, 빈 레인 미디어쿼리 |
| 테스트 | §7 |
| `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` | §5.1 정정 문단 |

Monitor 전용으로 남는 것: 레포 데크(`deck.js`), 레포 섹션(`mon2-sec*`), 연결 레인
pane(`mon2-clane*`)과 그 op, `blockers.js`·`dep-candidates.js`·`drop-plan.js`,
의존성 인라인 패널(`mon-deppanel*`). 이것이 "Worker + cross-repo"의 cross-repo다.

## 6. 데이터 흐름과 오류 처리

- 렌더 경로는 바뀌지 않는다: 스냅샷 → (`buildModel` | `buildLanes`) → 탭 index.js가
  행 템플릿을 만들어 `waitBody`/`paneTemplate`에 넘김 → lit 렌더. 서버·프로토콜·op는
  건드리지 않는다.
- 접힘 상태는 클라이언트 표시 상태다. `localStorage` 부재·파싱 실패는 기본값으로
  조용히 대체하고, 쓰기 실패는 무시한다(현행 `loadLaneCollapse` 규칙).
- 접힌 대기 pane(세로 띠) 위 드롭은 병렬 큐 말미 적재다(§4.4). 직렬 레인이나 특정
  위치에 넣고 싶으면 레인을 펼치거나 `대기로 ↴` 배치 메뉴를 쓴다 — 레인을 자동으로
  펼치지 않는다.
- `waitBody`의 드롭 속성은 값이 문자열일 때만 붙는다(`ifDefined`). Monitor의
  `data-lane-length`는 지금처럼 문자열로 넘긴다.

## 7. 테스트·검증

단위(vitest, 기존 파일 확장):

- `lanes.test.js`: `waitBody`가 두 영역·직렬 pane·빈 레인 클래스·힌트·`extra_panes`
  위치·`after` 슬롯·`drop` 속성 유무를 그린다; `paneTemplate`이 `count`·별도 토글
  버튼과 형제 `header_control`·접힘 시 `header_control`/`controls`/`body` 생략·
  `aria-expanded`를 지킨다; `candidateCard` foot이 `dep_action`만으로 켜지지
  않고 ⛓가 `head-actions`에 선다; `miniRow` `actions`가 1번 줄 끝에 선다; `nowPanel`
  이 실행 grid와 PR 대기 행을 함께 그린다.
- `lane-collapse.test.js`: 기본값 `done: true`, 토글·저장·구형 스키마 승격, 저장소
  오류 fail-quiet.
- `viewport.test.js`: 등록 시 동기 초기 콜백, `matchMedia` 부재 시 최초 `false`·구독
  없음, 변경 콜백·해제.
- `worker/index.test.js`·`monitor/index.test.js`·`main.monitor.e2e.test.js`·
  `main.worker-queue-sync.test.js`: 다섯 pane `collapsible`, 완료 기본 접힘, 제목 어휘,
  모바일 `지금` 순서, `is-dragging` 토글, Monitor 후보 `src`, 행 조작이 행 안에 있음,
  `header_control` 조작이 접힘을 바꾸지 않음, 접힌 대기 세로 띠 드롭이 큐 말미 적재,
  Monitor 상호 정지 경고가 `after` 슬롯에 남아 있음.
- `main.closed-range.e2e.test.js`: 완료 pane을 먼저 펼친 뒤 `.worker-done-range`를 조작
  하도록 갱신(기본 접힘이면 컨트롤이 DOM에 없다).
- `styles.worker-theme.test.js`·`styles.monitor-theme.test.js`: 삭제 규칙 부재
  (`.worker-now`, `.mon2-wait`, `.mon2-area`, `.mon2-lane`, `.mon2-rowops`, 모바일
  `order`, `.worker-wait > .worker-pane`), 추가 규칙 존재(`.worker-wait__*`, 세로 띠,
  빈 레인 미디어쿼리), 최상위 레인 `flex: 1 1 0`·`min-width: 220px`, 중첩
  `.worker-wait .worker-pane { min-width: 0 }`, 중첩 card 토큰.

Pre-handoff: `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`(번들 포함).

시각 검증(구현 세션이 수행하고 보고서에 결과를 적는다): 헤드리스 Chrome을
`--remote-debugging-port`로 띄우고 CDP `Emulation.setDeviceMetricsOverride`로
1800×1200과 390×844(`mobile: true`)를 잡아 `#/worker`·`#/monitor`를 각각 캡처한다.
확인 항목 — 대기 레인이 레인 전체 높이를 씀, 완료 레인이 세로 띠, 두 탭의 레인
제목·폭·중첩 토큰이 같음, 390px에서 문서 `scrollWidth === innerWidth`와 `지금` 순서.
캡처는 배포 후 공유 서버(`http://<ts-ip>:3000`)에서 한 번 더 한다.

## 8. 구현 unit 후보

1. `shared-primitives` — `lane-collapse.js`, `viewport.js`, `paneTemplate` 옵션,
   `waitBody`, `nowPanel`, `miniRow actions`, `candidateCard` head-actions + 단위 테스트.
2. `worker-adopt` — `worker/index.js`를 공유 프리미티브로 전환, `is-dragging`, 제목·
   header_control, 스타일 삭제/추가의 Worker 몫, 스타일 테스트.
3. `monitor-adopt` — `monitor/index.js` 전환, `mon2-*` 삭제, 이전 스펙 정정 문단,
   e2e 테스트, 시각 검증.

## 9. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
|---|---|---|---|---|---|
| 형제 | beads-ui | user_request | 의존 편집기를 이슈 상세 패널로 옮기는 일은 `detail-panel` + ws mutation 표면이라 이 스펙의 레인 표면과 리뷰·검증 묶음이 다르다. 크로스레포 후보 목록은 Monitor에서 열었을 때만 제공한다. 닫히면 §4.6의 ⛓ 조작 슬롯 버튼을 제거한다. | UI-5ksp가 blocks | UI-lx45 |
| 형제 | beads-ui | user_request | 2단계 레인 조립 단일화 — `buildLanes`를 워크스페이스 N개 함수로 두고 Worker는 N=1로 호출해 `buildModel`을 제거한다. `worker-queue`와 `monitor-pipeline` 스냅샷의 필드 정합이 필요해 별도 설계다. 열린 `UI-e9sg`(Monitor PR 대기 행 칩 누락)는 여기서 구조적으로 해소된다. | UI-5ksp가 blocks | UI-4tud |

- 관찰: Worker 실행 중 레인에는 Monitor의 `시작순` 정렬 `header_control`이 없다 — 탭
  고유 컨트롤은 `header_control` 슬롯의 것이므로 이 스펙은 강제하지 않는다.
- 관찰: CDP 스크린샷 절차를 tracked 스크립트로 두면 이후 UI 검증이 반복 가능해진다 —
  이 스펙 범위 밖이라 scratch 절차로만 둔다.
