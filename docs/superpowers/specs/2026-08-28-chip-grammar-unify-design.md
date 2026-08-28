---
scope:
  - app/views/worker/queue-blockers.js
  - app/views/worker/queue-blockers.test.js
  - app/views/worker/queue-overlaps.js
  - app/views/worker/queue-overlaps.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/monitor/lanes.js
  - app/views/monitor/lanes.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/chip-popover.js
  - app/views/chip-popover.test.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/index.test.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/effective-settings-view.test.js
  - app/utils/rec-settings.js
  - app/utils/rec-settings.test.js
  - server/list-adapters.js
  - server/list-adapters.test.js
  - server/ws/worker-handlers.js
  - server/ws/worker-handlers.test.js
  - server/worker/policy.test.js
  - app/protocol.md
  - app/styles.css
  - app/styles/base.css
  - AGENTS.md
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-24-monitor-scope-overlap-chips-design.md
  - docs/superpowers/specs/2026-08-26-lane-agnostic-dependency-chips-design.md
  - docs/superpowers/specs/2026-08-27-ui-sbum-rec-complex-chip-design.md
  - docs/superpowers/specs/2026-08-25-session-preferred-chip-consumer-design.md
  - docs/superpowers/specs/2026-08-27-detail-panel-dependency-editor-design.md
  - docs/superpowers/specs/2026-08-27-worker-candidate-sort-chain-release-chips-design.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-8x90 — 카드 칩 문법 통일: 글리프+ID 라벨 · 상하 두 줄 · 클릭=이슈 상세 · 판정 칩 사유 팝업

- Bead: UI-8x90 (`route=spec_backed`)
- 날짜: 2026-08-28
- 선행 스펙: UI-251y(카드 헤더 문법) · UI-qm12(겹침 칩) · UI-anna(의존 칩 레인 무관) ·
  UI-d13v(해제·후속 칩) · UI-sbum(`복잡` 칩) · UI-49mc(`세션 권장` 칩) · UI-lx45(상세
  의존성 절). 이 스펙은 그 결정 중 **칩의 문구·클릭·슬롯 4 내부 배치**만 바꾸고, 각
  스펙에 `정정(UI-8x90)` 문단으로 되돌아가 가리킨다(§8).

## 1. 문제

Worker·Monitor 탭 카드는 같은 렌더러를 쓰지만(UI-251y §1) 칩마다 문법이 다르다.

| 칩 | 지금 라벨 | 지금 클릭 | 어긋남 |
| --- | --- | --- | --- |
| 선행 | `⛓ blocked: UI-x` | 이슈 상세(openable일 때) | 방향어가 라벨에 다시 적힘 |
| 해제 | `🔓 해제: UI-x` (최대 2개, 세 번째부터 마지막 칩에 ` 외 n`) | 이슈 상세 | 같음, 그리고 `RELEASED_CHIP_MAX`로 축약 |
| 후속 | `→ 후속 3` | 없음 | ID가 없고 툴팁에 5개까지만(서버 `DEPENDENTS_ID_LIMIT`); 후보 행에만 |
| 겹침 | `⧉ UI-x` | 팝오버(경로 목록·`[같은 직렬 레인으로]` 1클릭 배치) | 같은 줄의 다른 칩과 클릭 결과가 다름 |
| `복잡` | `복잡` | 카드: 없음 · 상세 헤더: **즉시 적용**(권위 키 덮어쓰기) | 오터치 위험, 사유는 툴팁에만 |
| `세션 권장` · `worker-ineligible` · `리뷰 ✓/stale` | — | 없음(툴팁만) | 사유가 툴팁에만 |
| 상세 `의존성` 절 | `⛓ 막는 UI-x` · `⛓ 막히는 UI-x` · `관련 UI-x` | 이슈 이동 | 카드와 글리프 규칙이 다름 |

슬롯 4(`.worker-deps`)는 "지금 갈 수 있나"를 답하는 칩과 정보성 칩(`🔓`·`⧉`·
`scope 없음`)이 한 줄에 섞여 있어, 행동을 바꾸는 사실이 눈에 먼저 들어오지 않는다.

## 2. 사용자 결정 (2026-08-28)

1. 의존·겹침 칩 라벨은 `<글리프> <ID>`만이다. 방향어·`block:`·`해제:`는 라벨에서 빼고
   툴팁으로 보낸다. ID는 축약하지 않는다 — 후속이 7개면 칩 7개, 해제도 상한(`RELEASED_CHIP_MAX`
   2개)과 ` 외 n` 없이 7일 창 안의 것 전부.
2. 슬롯 4를 두 줄로 나눈다. 상단은 행동을 바꾸는 사실(`⛓`·`→`), 하단은 정보(`🔓`·`⧉`·
   `scope 없음`). `연결 n`은 좌표 줄(슬롯 5)로 내린다.
3. `⛓`·`→`·`🔓`·`⧉` 클릭은 모두 **그 이슈의 상세 열기**다. 겹침 팝오버와 1클릭 직렬
   배치는 없앤다.
4. `→` 후속 칩은 `⛓`와 같은 레인 전부(후보·대기·실행중·PR 대기, 두 탭)에 선다.
5. 판정 칩 네 종(`복잡`·`세션 권장`·`worker-ineligible`·`리뷰 ✓/stale`)은 클릭하면
   **사유 팝업**이다. `복잡`의 즉시 적용은 상세 헤더에서도 완전히 제거한다 — 적용은
   실행 설정 편집기에서 사용자가 수동으로 한다.
6. 이슈 상세 `의존성` 절도 같은 글리프 규칙을 쓴다. `⌸ 상위`는 유지, `관련`은 `↔`.
7. `scope 없음`은 하단 줄에 남긴다.

## 3. 글리프 표 — 카드와 상세가 공유한다

| 관계 | 라벨 | 뜻 | 카드 | 상세 |
| --- | --- | --- | --- | --- |
| 나를 막는 (`blocks` 선행, 열림) | `⛓ <ID>` | 지금 못 가는 이유 | 상단 | 있음 (`✕` 유지) |
| 내가 막는 (`blocks` 후속, 열림) | `→ <ID>` | 내가 먼저 가야 풀리는 이슈 | 상단 | 있음 |
| 방금 풀림 (7일 내 close된 선행) | `🔓 <ID>` | 왜 이제 갈 수 있나 | 하단 | 없음 |
| scope 겹침 | `⧉ <ID>` | 같이 출발하면 부딪히는 이슈 | 하단 | 없음 |
| scope 미선언 | `scope 없음` | 겹침 판정 불가 | 하단 | 없음 |
| 발견 (`discovered-from`) | `↩ <ID>` | 어디서 파생됐나 | 슬롯 5 `↩ from` 칩 그대로 | 있음 |
| 상위 (`parent-child`) | `⌸ <ID>` | Phase 자식의 부모 | 없음 | 있음 |
| 관련 (`related`) | `↔ <ID>` | 양방향 소프트 관계 | 없음 | 있음 |
| 그 외 type | `<type> <ID>` | — | 없음 | 있음 (현행) |

관계명(`막는`·`막히는`·`해제`·`후속`·`발견`·`상위`·`관련`)은 툴팁 첫 줄로 옮긴다.
글리프 하나가 카드와 상세에서 같은 관계를 뜻하는 것이 이 표의 목적이다 — 지금은 `⛓`가
상세에서 양방향에 쓰인다.

타 레포 이슈는 문구가 같고 색만 갈린다(`worker-dep--foreign`, UI-anna §2). ID에 레포
접두사가 이미 들어 있어 별도 배지는 두지 않는다.

## 4. 카드 — 슬롯 4 두 줄과 슬롯 5

### 4.1 줄 정의

UI-251y §2 표의 4번 줄을 두 줄로 나눈다. 두 줄 모두 fail-quiet다 — 재료가 없는 줄은
그리지 않는다.

| # | 줄 | 싣는 것 | 순서 |
| --- | --- | --- | --- |
| 4a | 의존 (상단) | `▶ 연결 n` 발차 칩(고아 `해제` 버튼 포함) · `⛓ <ID>`… · `→ <ID>`… | 발차 → 선행 → 후속. 각 묶음 안은 ID 사전순 |
| 4b | 정보 (하단, 저채도) | `🔓 <ID>`… · `⧉ <ID>`… · `scope 없음` | 해제(`closed_at` 내림차순, 개수 상한 없음) → 겹침(ID 사전순) → scope 없음 |

`▶ 연결 n`이 4a인 이유: "연결 레인이 이 항목을 지금 발차했다"는 행동 상태이고, 고아
변형의 `해제`는 그 상태를 끄는 유일한 조작이다(UI-jaua §5.3). 자리와 동작 모두 바꾸지
않는다.

`연결 n`(레인 소속, 클릭=그 레인으로 스크롤)은 슬롯 5로 옮긴다. "어느 레인 소속인가"는
레포·직렬 레인 칩과 같은 좌표다. 슬롯 5 순서: 레포 → 직렬 레인 → **연결 n** → route →
`↩ from` → exec 칩 → `복잡` → usage/비용 → 로그 경로. 클릭 동작(`mon-lane__chip` →
`scrollIntoView`)은 그대로다.

### 4.2 마크업

`dependencyChipsTemplate(chips)` (`app/views/worker/lanes.js`)이 두 컨테이너를 그린다.

```html
<div class="worker-deps worker-deps--primary">…4a…</div>
<div class="worker-deps worker-deps--secondary">…4b…</div>
```

- `cross_lane`은 이 템플릿에서 빠지고, 세 렌더러의 슬롯 5 줄(`.worker-chips` /
  `.rtile__meta`)이 `crossLaneChipTemplate(item.cross_lane_chip)`를 직렬 레인 칩 다음에
  부른다. 투영(`monitor/lanes.js`)은 `dependency_chips.cross_lane` 대신 항목 최상위
  `cross_lane_chip`을 채운다 — 슬롯 5 재료는 항목 필드가 관용이다(`route`·`from_id`·
  `exec_chips`).
- 열리는 칩(`⛓`·`→`·`🔓`·`⧉`)은 전부 같은 마크업이다:
  `<button type="button" class="worker-dep worker-dep--<kind> worker-dep__open" data-dep-id data-root-dir title>`.
  `openable`이 아닌 칩(타 레포인데 owner를 모름)은 `<span>`이다 — 누를 수 없는 버튼은
  만들지 않는다(UI-u6zf §5.1). 겹침 칩의 `mon-overlap__chip`·`data-overlap-id`·
  `aria-label`은 없어지고 `title`이 `겹침 · <위치>` 첫 줄과 겹치는 경로 목록을 싣는다 —
  팝오버가 보여 주던 경로는 툴팁으로 남는다.
- `→` 칩의 `title`: `후속 — 이 이슈가 close되면 풀린다`. `🔓`: `해제 — <시각>에
  close되어 이 이슈가 풀렸다`. `⛓`: `선행 — close될 때까지 출발하지 않는다 (<위치>)`.
- `dependents`는 `DependencyChips.dependents: DependentsChip[]`(ID별 배열)로 바뀐다.
  `count`/`title`만 담던 객체 형태는 폐기한다.
- 해제 칩의 `candidateReleasedChips`(`worker/index.js`)에서 `RELEASED_CHIP_MAX`(2)와
  마지막 칩에 ` 외 n`을 덧붙이는 분기를 없앤다. 7일 창(`releasedChip`)은 그대로다 —
  칩 수를 제한하는 것은 창 하나뿐이다.
- `popover`·`overlaps[].prefixes`를 팝오버용으로 쓰던 자리는 사라진다. `prefixes`는
  툴팁 재료로 남는다.

### 4.3 클릭

- Worker `onClick`·Monitor 버튼 분기 모두 `.worker-dep__open` 하나로 네 칩을 받는다.
  Worker는 `openBlocker(dep_id, root_dir)`, Monitor는 `openRow(id, root_dir)` — 두
  래퍼는 그대로 두고 호출 조건만 넓힌다.
- 제거: Worker `open_overlap` 상태와 그 `onDocumentClick`/`onDocumentKeyDown` 분기,
  `overlapPopoverFor`, `placeIntoSameSerialLane`, `queue-overlaps.js`의
  `workerPlacementPlan`과 그 타입; Monitor의 같은 것들(`open_overlap`·
  `overlapPopoverFor`·`placeIntoSameSerialLane`·`mon-overlap__chip`/`__place` 분기);
  `lanes.js`의 `overlapPopoverTemplate`·`OverlapPopover` 타입; CSS `.mon-overlap__*`
  전부(§7에서 `.chip-popover`로 개명해 재사용하는 규칙 제외).
- `deriveWorkerOverlaps`·`applyScopeOverlaps`는 `overlaps[]`·`scope_missing` 파생만
  남기고 바뀌지 않는다. 겹침 칩의 `openable`은 선행 칩과 같은 규칙이다: 같은 레포는
  항상, 타 레포(Monitor만 생김)는 `locations`가 `root_dir`을 아는 것만.

### 4.4 후속 칩의 재료 — 모든 레인

지금 `→` 재료는 후보 행의 `dependents_info`(board 컬럼 장식, `list-adapters.js`)뿐이다.
`⛓`와 같은 범위로 넓히려면 큐 스냅샷에도 실어야 한다.

- 서버(§6.2) `bead_dependents`를 Worker·Monitor가 함께 읽는다.
- Worker `index.js`: `dependents_by_bead`는 두 원천의 **합집합**이다 — 큐 장식
  `bead_dependents[id].ids`와 후보 행의 `dependents_info.ids`를 ID로 dedupe해 합친다.
  blocked 칩의 "큐 장식이 이긴다" 규칙(UI-anna §5.1)을 쓰지 않는 이유는 재료의 성질이
  다르기 때문이다: `bead_blocked_by`는 서버가 매 스냅샷 완전 재계산하는 값이라 빈 배열이
  "없다"이지만, 후속은 peer 스냅샷이 아직 없으면 그 레포의 후속을 세지 못해 빈 배열이
  "모른다"일 수 있다. 합집합은 어느 원천도 다른 원천의 사실을 지우지 않는다.
  `root_dirs`도 두 원천을 합친다. `dependencyChipsFor`가 `dependents`를 함께 만들고,
  실행중 오버레이의 최소 조건에 `dependents`도 든다(UI-anna §5.3의 blocked와 같은
  이유).
- Monitor `lanes.js`: `bead_blocked_by`를 읽어 `predecessors`를 붙이는 같은 루프에서
  `bead_dependents`를 읽어 `dependents`를 붙인다. 각 후속 ID의 `root_dir` 결정 순서:
  (1) 서버 `root_dirs[id]`; (2) 없으면 ID 접두사가 카드의 레포 접두사와 같으면 **카드의
  `item.root_dir`** — 레인에 없는 열린 후속(예: `worker-ineligible` 이슈)은 `locations`에
  없으므로, 이 단계가 없으면 다른 레포가 활성인 상태에서 현재 레포로 잘못 연다;
  (3) 그 외 타 레포는 `locations.get(id)?.root_dir`; (4) 셋 다 없으면 `openable`이
  아니다.
- Worker의 `openable`: 같은 레포는 항상(현재 워크스페이스), 타 레포는 `root_dirs`를
  아는 것만(§4.2).
- 후보 정렬 체인의 `후속 많은 순`(UI-d13v §4)은 `dependents_info.count`를 그대로 읽는다
  — 정렬 키는 바꾸지 않는다.

### 4.5 판정 칩 팝업

대상은 네 판정 칩이다. **칩의 슬롯은 표면마다 지금 자리 그대로다** — `세션 권장`·
`worker-ineligible`·`리뷰`·`복잡`은 후보 카드에서 슬롯 1(정체성 줄), `복잡`은 대기·PR
대기·완료 행의 `.worker-chips`와 실행 타일의 `.rtile__meta`(슬롯 5)에 있다(UI-sbum §3).
이 스펙은 자리를 옮기지 않고, 그 칩이 그려지는 **모든 표면**에서 칩을 `<button
type="button" class="ctl-chip … judgement-chip" data-chip-key="<kind>" aria-expanded>`로
바꾼다. 완료 행의 `복잡`도 포함한다 — 완료 행의 줄 문법(§9 비목표)은 그대로이고 칩 하나가
버튼이 될 뿐이다. 클릭하면 **그 칩이 속한 줄 바로 아래**에 `.chip-popover`(`role="dialog"`)가
카드 안 절대 배치로 열린다. 카드 클릭(상세 열기)보다 먼저 잡고 멈춘다.

| 칩 | `data-chip-key` | 팝업 제목 | 팝업 본문 |
| --- | --- | --- | --- |
| `복잡` | `rec` | 복잡한 작업으로 판정됨 | 사유 목록(§4.6) · `상태: 미적용/적용됨/추천과 다름` · 안내 `적용은 이슈 상세의 실행 설정 편집기에서` |
| `세션 권장` | `session_preferred` | 워커로 돌릴 수 있지만 세션이 낫다 | `SESSION_PREFERRED_TOOLTIP[reason]` 한 줄 |
| `worker-ineligible` | `ineligible` | 워커 실행 대상이 아니다 | `worker-ineligible 라벨이 붙어 있다 — 라벨은 이슈 상세의 라벨 절에서 뗀다` |
| `리뷰 ✓` / `리뷰 stale` | `qfr` | 현행 상태 문장 | `missing[]` 목록(없으면 `빠진 항목 없음`) |

- 팝업은 한 번에 하나다. 같은 칩을 다시 누르면 닫히고, 다른 칩을 누르면 바뀐다. 바깥
  클릭·Esc로 닫힌다. 카드가 재렌더돼도 열림 상태는 `bead_id + chip_key`로 유지된다.
- `title` 툴팁은 유지한다 — 마우스 사용자는 팝업 없이도 읽는다.
- Monitor는 `복잡`·`리뷰` 칩만 그린다(`세션 권장`·`worker-ineligible`은 Worker 후보
  투영에만 있다, UI-49mc §3). 그 두 칩의 팝업은 두 탭에서 같다.
- `복잡`의 `data-state`(unapplied/applied/diverged) 시각 상태는 유지한다. 상태가 무엇이든
  클릭은 팝업이다.

### 4.6 `복잡` 사유 문장 (`app/utils/rec-settings.js`)

`REC_REASON_TEXT`를 두고 `recTooltip`과 팝업이 함께 읽는다. 신호 의미는 dotfiles
`docs/superpowers/specs/2026-08-27-rec-exec-settings-design.md` §1이 소유하고, 여기서는
표시 문장만 정한다. 모델·런타임 이름은 계속 쓰지 않는다(UI-sbum 결정).

| 신호 | 문장 |
| --- | --- |
| `contract_change` | 계약 문서·checker·스킬 사본을 함께 바꿔야 한다 |
| `multi_repo` | 둘 이상의 저장소에 작업 단위가 생긴다 |
| `open_design_fork` | 실행 중에도 이어질 미해결 설계 분기가 있다 |
| `multi_phase` | 여러 Phase 또는 병렬 쓰기 조정이 필요하다 |
| `claude_bound` | Claude 세션 자산·의미론에 강하게 묶여 있다 |

`recTooltip`의 `사유:` 줄은 신호 코드 대신 이 문장을 `·`로 잇는다. 알 수 없는 신호는
지금처럼 버린다.

## 5. 공유 팝업 — `app/views/chip-popover.js` (신규)

겹침 팝오버는 두 탭이 같은 코드를 복붙해 갖고 있었다(`open_overlap` 상태·
`onDocumentClick`·Esc). 그것을 지우면서 판정 칩 팝업이 쓸 것을 한 모듈로 뽑는다.

```js
/** @typedef {{ bead_id: string, chip_key: string }} ChipPopoverKey */
export function createChipPopover(onChange) // → { toggle(key), close(), isOpen(key), attach(root), detach() }
export function chipPopoverTemplate(content) // → <div class="chip-popover" role="dialog" aria-label=...>
```

- `toggle(key)`: 같은 키면 닫고 아니면 연다. 바뀌면 `onChange()`(뷰의 `doRender`).
- `attach(root)`: `document`에 click(캡처 아님)·keydown(Esc) 리스너를 한 번 건다.
  `.chip-popover, .judgement-chip` 안의 클릭은 무시한다. `detach()`는 뷰 unmount에서.
- 콘텐츠 구성은 뷰가 한다: `{ title: string, lines: string[] }`. 템플릿은 제목 한 줄과
  `<ul>`뿐이다. 칩 종류별 문장은 §4.5 표를 `lanes.js`의 `judgementPopoverContent(item,
  chip_key)` 하나가 만든다(두 탭 공유).
- 렌더 위치: 그 칩이 속한 줄(§4.5 — 후보 카드는 정체성 줄, 대기·PR 대기·완료 행은
  `.worker-chips`, 실행 타일은 `.rtile__meta`) 바로 아래, 카드 안 절대 배치(기존
  `.mon-overlap__popover` 규칙을 `.chip-popover`로 개명, ≤640px 규칙 포함).
- 이슈 상세 헤더도 같은 모듈을 쓴다(§5.1). 상세는 오버레이라 바깥 클릭 판정이 패널
  닫힘과 겹치지 않도록 `.detail-summary` 안 클릭은 패널 닫힘으로 흐르지 않는 현행
  규칙을 그대로 둔다.

### 5.1 이슈 상세 헤더 `복잡`

`effective-settings-view.js` `summaryHeaderTemplate`: `onApplyRec`·`?disabled`·`confirm`을
없애고 버튼은 `judgement-chip` + `data-chip-key="rec"`가 된다. 클릭은 §4.5와 같은
팝업이다. `detail-panel/index.js`의 `onApplyRec`와 그 테스트는 삭제한다.
`onExecChange`/`onImplTargetChange`의 Promise 반환 계약(UI-sbum §4)은 편집기가 쓰므로
그대로 둔다. `rec_*` 키는 여전히 어디서도 unset하지 않는다.

## 6. 서버

### 6.1 `server/list-adapters.js` — 후속 ID 전량

- `DEPENDENTS_ID_LIMIT`와 `.slice(0, …)`를 없앤다. `dependents_info.ids`는 열린 후속
  전부(사전순)다.
- 타 레포 후속(peer snapshot에서 온 id)은 `root_dirs: Record<id, root_dir>`에 owner를
  싣는다 — 같은 레포 id는 항목이 없다. `release_info.released_by[].root_dir`과 같은
  의미다.
- `decoration_rev`는 `ids.join(',')`에 더해 정렬된 `root_dirs` 항목(`id=root_dir`)도
  지문에 넣는다 — 후속 ID는 같은데 소유 레포만 바뀐(peer 스냅샷 도착) 경우에도 후보
  구독이 upsert돼 칩의 `openable`이 갱신된다.
- `collectOpenDependents`와 owner 조회를 export해 §6.2가 재사용한다.

### 6.2 `server/ws/worker-handlers.js decorateQueue` — `bead_dependents`

```
bead_dependents: Record<bead_id, { ids: string[], root_dirs?: Record<string, string> }>
```

- 대상 집합은 `bead_scope`와 같다: `queue` ∪ `serial_lanes[].entries` ∪ 실행중 attempt
  bead ∪ `pr_wait` ∪ runnable 투영 ∪ `session_active`.
- 재료는 워크스페이스 목록 스냅샷의 `blocks_in` 색인(`peekWorkspaceSnapshot(root)` +
  peers, `list-adapters.js`와 같은 `createDecorationContext` 경로). 열린(`status !==
  'closed'`) 후속만 싣는다.
- partial·fail-quiet: 자기 레포 스냅샷이 아직 없으면 키 전체를 싣지 않는다(모름).
  peer 스냅샷은 있는 것만 센다 — 그래서 한 bead의 빈 배열은 "없다"가 아니라 "보이는
  스냅샷 안에는 없다"이며, 소비자는 이 값을 후보 `dependents_info`와 **합집합**으로만
  쓴다(§4.4). 컨텍스트 조립이 던지면 로그 한 줄과 함께 키 전체를 생략한다.
- 비영속, Worker 런타임 미소비(`policy.test.js`에 불변 케이스 1개).
- `app/protocol.md`: `bead_scope` 단락 옆에 `bead_dependents` 단락, `dependents_info`
  단락의 "최대 5개"를 전량·`root_dirs`로 고친다.

## 7. 스타일

- `.worker-deps--secondary`: 저채도(테두리·글자 muted 토큰), 상단 줄과 4px 간격. 새 색
  토큰 없음.
- `.worker-dep--dependents`: 개수 칩용 규칙을 ID 칩 규칙으로(`--pred`와 같은 크기,
  본색). `.worker-dep--released`·`--overlap`·`--muted`는 하단 줄 톤을 따른다.
- `.mon-overlap__popover`(+ ≤640px 규칙) → `.chip-popover`로 개명. `.mon-overlap__row/
  __hd/__rid/__rtitle/__rwhere/__paths/__note/__place`는 삭제.
- `.judgement-chip`: `button` 리셋(테두리·배경은 각 칩 클래스가 이미 가짐), `cursor:
  pointer`, `[aria-expanded="true"]`는 테두리 강조. `.detail-summary__chip--rec:disabled`
  규칙 삭제.
- `.detail-dep--succ`는 `→` 칩용으로 그대로 저채도, `.detail-dep--other`는 그대로.

## 8. 문서 정정

- **UI-251y** `2026-08-25-card-header-grammar-unify-design.md`: §2 표 4번 줄을 4a/4b로,
  §5.1 슬롯 표 4번을 `4a 의존 · 4b 정보`로 나누고 `연결 레인 칩`을 5번으로 옮긴다.
  `정정(UI-8x90)` 문단으로 근거를 남긴다. §6 "칩의 문구·툴팁·색·클릭 동작은 바꾸지
  않는다"에 이 스펙이 바꿨다는 정정 한 줄.
- **UI-qm12** §5.3·§5.4: 팝오버·1클릭 배치 제거 정정. §1의 "팝오버에서 1클릭 배치"
  결정이 이 스펙으로 대체됐음을 적는다.
- **UI-anna** §5.3a·§8: 클릭 동작 통일 정정, "후속 칩 부활 비목표"가 UI-d13v→이 스펙
  순으로 바뀐 경위 한 줄.
- **UI-d13v** `2026-08-27-worker-candidate-sort-chain-release-chips-design.md`: §3.5
  (`ids` 최대 5 → 전량 + `root_dirs`), §5.2·§5.3(`→ 후속 n`·` 외 n`·`RELEASED_CHIP_MAX`·
  후보 행 전용·클릭 없음 → §3·§4의 라벨·전 레인·클릭=이슈 상세), §8 검증 항목 정정.
  정렬 체인(§4)·후보 드래그 제거(§6)는 그대로다.
- **UI-sbum** 결정 표 `적용 동작`·§3(카드 칩 클릭 없음)·§4: 팝업·적용 제거 정정.
- **UI-49mc** §4: 칩이 버튼이 되고 클릭=팝업임을 정정.
- **UI-lx45** §4.1 표: 표기 열을 §3 글리프 표로 정정.
- **`AGENTS.md`** 카드 배치 문법 절: 줄 순서에 `의존(상단)·정보(하단)`을 반영하고,
  "열리는 칩의 클릭은 그 이슈 상세, 판정 칩의 클릭은 사유 팝업"을 결정으로 한 줄
  추가. 근거는 이 스펙이 소유한다.

## 9. 비목표

- 완료 행(2줄·3줄) 문법, 보드 카드, `⚠ 의존 없음/순서와 다름` 표시, PR 게이트 뱃지,
  `⏸ REVISE 파킹`, exec/usage/route 칩 — 바꾸지 않는다.
- 계약 표면(라벨 어휘·metadata 키·`status`)은 그대로다. `rec_*`·`session_preferred_reason`
  은 읽기만 한다.
- Monitor 실행가능 카드에 `세션 권장`·`worker-ineligible`을 새로 그리지 않는다(재료가
  runnable 행에 없다). 관찰로 남긴다.
- 겹침을 직렬 레인에 넣는 조작은 기존 드래그·`[대기로 ↴]` 배치 메뉴로 한다 — 대체
  조작을 새로 만들지 않는다.
- 상세 `의존성` 절의 편집(추가 입력·`✕`)은 바꾸지 않는다.

## 10. 검증

### Test scope

RED seam은 지금 구현에서 **실패하고** 변경 후 통과하는 케이스다. 기존 동작의 부재를
확인하거나 불변을 지키는 케이스는 회귀 검사로 따로 적는다 — 변경 전에도 통과하는
케이스는 seam이 아니다.

**RED seams**

- `app/views/worker/queue-blockers.test.js`: `predecessorChip`/`releasedChip` 라벨이
  `⛓ <ID>`/`🔓 <ID>`(지금은 `blocked:`/`해제:` 포함); `dependentsChip`이 ID별 배열을
  돌려주고(지금은 `{count,title}` 하나) `root_dirs`로 `openable`·`root_dir`을 정한다.
- `app/views/worker/lanes.test.js`: `.worker-deps--primary`/`--secondary` 두 컨테이너와
  각 줄의 칩 집합(지금은 `.worker-deps` 하나); `→`·`🔓`·`⧉`가 `.worker-dep__open`
  버튼(지금 `→`는 span, `⧉`는 `mon-overlap__chip`); `연결 n`이 `.worker-chips`/
  `.rtile__meta` 안 직렬 레인 칩 다음(지금은 `.worker-deps`); 판정 칩 네 종이
  `judgement-chip` 버튼(지금은 span); `judgementPopoverContent`가 §4.5 표대로;
  `복잡` 팝업 본문에 §4.6 문장.
- `app/views/chip-popover.test.js`(신규 모듈): toggle/close/isOpen, 바깥 클릭·Esc 닫힘,
  팝업·칩 안 클릭 무시, detach 후 리스너 없음.
- `app/views/worker/index.test.js`: `candidateReleasedChips`가 해제 3개 이상을 전부
  돌려주고 ` 외 n`이 없다(지금은 2개+` 외 n`); `dependents_by_bead` 합집합(큐 장식 ∪
  후보 `dependents_info`, 빈 큐 장식이 후보 재료를 지우지 않음); 대기·직렬·실행중·PR
  대기 행에 `dependents` 부착(지금은 후보만); `.worker-dep__open` 클릭이 `→`·`⧉`에서도
  `openBlocker`로 간다; 판정 칩 클릭이 팝업을 열고 카드 클릭으로 흐르지 않는다.
- `app/views/monitor/lanes.test.js`: `bead_dependents` → `dependents` 부착; `root_dir`
  결정 순서 §4.4(서버 → 같은 레포면 `item.root_dir` → `locations` → 없으면 비활성),
  특히 레인에 없는 같은 레포 후속이 카드의 `root_dir`을 받는 케이스; `cross_lane_chip`
  항목 필드; 겹침 칩 `openable` 규칙.
- `app/views/monitor/index.test.js`: `→`·`⧉` `.worker-dep__open` → `openRow`(다른
  레포가 활성인 상태에서 전환 후 열림 포함); 판정 칩 팝업.
- `app/views/detail-panel/index.test.js`: 의존성 칩 라벨 §3(지금은 `막는`/`막히는`
  문구), 툴팁 첫 줄 관계명.
- `app/views/detail-panel/effective-settings-view.test.js`: `복잡` 버튼이 `disabled`
  없이 `judgement-chip`이고 클릭이 팝업을 연다(지금은 `onApplyRec`).
- `app/utils/rec-settings.test.js`: `REC_REASON_TEXT` 전 신호 커버, `recTooltip`에
  코드 대신 문장.
- `server/list-adapters.test.js`: 후속 6개 이상 전량(지금은 5개), `root_dirs`(peer id만),
  `decoration_rev`가 `root_dirs`만 바뀌어도 달라진다.
- `server/ws/worker-handlers.test.js`: `bead_dependents` 대상 집합·열린 후속만·자기
  스냅샷 부재 시 키 생략·peer 부재 시 나머지로 계산·컨텍스트 예외 시 로그+생략.

**회귀 검사** (변경 전에도 통과하는 것 — 제거·불변 확인)

- `app/views/worker/queue-overlaps.test.js`: `workerPlacementPlan` 삭제에 맞춰 배치
  케이스 제거; `deriveWorkerOverlaps` 불변.
- `app/views/worker/lanes.test.js`·`monitor/index.test.js`: `mon-overlap` 클래스·
  `overlapPopoverTemplate`·`mon-overlap__place` 부재; `mon-lane__chip` 스크롤 불변;
  `open_overlap`·배치 op 부재.
- `app/views/detail-panel/index.test.js`: `onApplyRec` 부재; `✕`·추가 입력 불변.
- `app/views/detail-panel/effective-settings-view.test.js`: 세 `data-state` 유지.
- `app/utils/rec-settings.test.js`: 모델명 부재.
- `server/worker/policy.test.js`: `bead_dependents`가 결정에 영향 없음.
- 완료 2줄·3줄 행 마크업 불변(UI-251y §7 케이스 유지).

### 절차

- `npm run tsc` · `npm run lint` · `npm test` · `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js`·`.map`을 같은 PR에 포함
- 배포 후 공유 서버에서 Worker 탭(후보·대기·실행중·PR 대기)과 Monitor 탭, 이슈 상세
  헤더·의존성 절을 스크린샷으로 확인한다(모바일 폭 1장 포함).

## 11. 수용 기준

1. 카드 어디서도 `blocked:`·`해제:`·`후속 n`·`외 n` 문구가 보이지 않고, 의존·겹침 칩은
   전부 `<글리프> <ID>`다. 7일 창 안의 해제가 3개 이상이면 칩도 그 수만큼 선다.
2. 후속이 6개 이상인 이슈의 카드에 후속 칩이 그 수만큼 선다(후보·대기·실행중·PR 대기,
   두 탭).
3. `⛓`·`→`·`🔓`·`⧉` 클릭이 그 이슈의 상세를 연다(타 레포는 전환 후). 겹침 팝오버·1클릭
   배치 UI가 없다.
4. 슬롯 4가 상단(`▶ 연결`·`⛓`·`→`)과 하단(`🔓`·`⧉`·`scope 없음`) 두 줄로 나뉘고,
   `연결 n`이 좌표 줄에 있다.
5. `복잡`·`세션 권장`·`worker-ineligible`·`리뷰` 클릭이 사유 팝업을 열고, 상세 헤더
   `복잡` 클릭이 어떤 metadata도 쓰지 않는다.
6. 상세 `의존성` 절 칩이 §3 글리프 표를 따른다.

## 결정 (ADR 후보)

- **카드 위 칩은 상태를 쓰지 않는다 — 의존·겹침 칩 클릭은 이슈 상세, 판정 칩 클릭은 사유
  팝업, 적용·배치 조작은 편집기와 배치 메뉴에서만.** 겹침 팝오버의 `[같은 직렬 레인으로]`
  1클릭 배치(UI-qm12)와 상세 헤더 `복잡`의 즉시 적용(UI-sbum)을 걷어내는 결정이다.
  - 되돌리기 어려움: **성립** — `workerPlacementPlan`·`placeIntoSameSerialLane`·
    `onApplyRec`와 그 테스트·CSS를 지우므로 복원은 두 스펙의 구현을 다시 쓰는 일이다.
  - 맥락 없이 보면 의아함: **성립** — 두 조작 모두 직전 스펙이 일부러 넣은 것이라, 기록
    없이는 "왜 카드에서 바로 못 하게 했나"가 남는다.
  - 실제 트레이드오프: **성립** — 한 번 클릭의 편의(팝오버 배치·즉시 적용) 대신 칩 클릭
    의미의 단일성과 모바일 오터치 방지를 택했다.
  - `summary`: 워커·모니터 카드 위 칩은 정보만 열고(이슈 상세·사유 팝업) 상태를 바꾸지
    않는다; 실행 설정 적용과 레인 배치는 편집기·배치 메뉴가 소유한다.
- 슬롯 4를 의존(상단)·정보(하단) 두 줄로 나눈 것 — 스펙 본문(§4.1)에 둔다.
  - 되돌리기 어려움: **불성립** — 템플릿 한 함수와 CSS 두 규칙을 합치면 끝난다.
  - 맥락 없이 보면 의아함: **불성립** — UI-251y 슬롯 문법("행동을 바꾸는 사실이 위")의
    연장이라 그 스펙만 읽어도 이해된다.
  - 실제 트레이드오프: **성립** — 한 줄(공간 절약) 대 두 줄(우선순위 가독)이라는 대안이
    있었다. 하나만 성립하므로 ADR이 아니다.
- 글리프 표(§3)를 카드·상세가 공유하는 것 — 스펙 본문에 둔다.
  - 되돌리기 어려움: **불성립** — 라벨 문자열 상수 몇 개다.
  - 맥락 없이 보면 의아함: **불성립** — 같은 관계에 같은 기호를 쓰는 것은 설명이 필요
    없는 기본값이다.
  - 실제 트레이드오프: **불성립** — 방향어를 라벨에 남기는 대안은 사용자가 이미 배제했고,
    거절된 다른 설계는 없다.
- `bead_dependents` 큐 장식을 `bead_scope`와 같은 대상 집합으로 싣는 것 — 스펙 본문
  (§6.2)에 둔다.
  - 되돌리기 어려움: **불성립** — 장식 하나를 빼면 소비자는 후보 `dependents_info`만으로
    돌아간다(합집합이라 코드 경로가 남는다).
  - 맥락 없이 보면 의아함: **불성립** — `bead_blocked_by`·`bead_scope`와 같은 관용이다.
  - 실제 트레이드오프: **성립** — runnable 행과 큐 항목에 각각 싣는 대안 대신 장식 하나를
    택했다. 하나만 성립하므로 ADR이 아니다.

이 저장소 `docs/adr/`에는 `README.md` 인덱스가 없고 기존 ADR 2건(001·002)은 목록 push
설계라 충돌하지 않는다.

## 구현 unit 후보

1. `server`: `server/list-adapters.js` · `server/ws/worker-handlers.js` ·
   `app/protocol.md` · 서버 테스트
2. `cards`: `app/views/chip-popover.js` · `app/views/worker/{queue-blockers,
   queue-overlaps,lanes,running-grid,index}.js` · `app/views/monitor/{lanes,index}.js` ·
   `app/utils/rec-settings.js` · CSS · 뷰 테스트
3. `detail+docs`: `app/views/detail-panel/{index,effective-settings-view}.js` · 스펙
   정정 6건 · `AGENTS.md` · `npm run build` 산출물

## 경계·후속

- 관찰: Monitor 실행가능 카드의 `세션 권장`·`worker-ineligible` — runnable 행에 라벨·
  metadata 재료가 없어 이 스펙에서 그리지 않는다. 필요해지면 `runnable-cache`에 재료를
  싣는 별도 요청으로.
- 관찰: `⚠ 의존 없음/순서와 다름`·`PR 대기 · 점유`·PR 게이트 뱃지는 표시 전용이지만
  각자 뜻이 분명해 정리 대상이 아니다(2026-08-28 인벤토리).
