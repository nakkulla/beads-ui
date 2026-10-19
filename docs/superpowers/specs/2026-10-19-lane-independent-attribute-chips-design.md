---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/pr-wait-row.js
  - app/views/worker/workspace-adapter.js
  - app/views/monitor/
  - server/ws/monitor-handlers.js
  - server/worker/title-cache.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Worker·모니터 카드의 Bead 속성 칩을 레인과 무관하게 같게 보인다 (UI-refs)

## 1. 목표와 배경

같은 Bead는 후보·대기·실행 중·PR 대기·완료 어느 레인에서나, Worker 탭과 모니터 탭
모두에서 **같은 속성 칩을 같은 슬롯에** 갖는다.

지금은 `worker-ineligible`·`세션 권장`/`세션 실행`·`quick_fix` 리뷰 칩이 후보 카드에만
서고, 대기·실행 중·PR 대기·완료 카드에는 실행 방식의 `세션` exec 칩(슬롯 5b)만 보인다.
그래서 세션 레인 카드가 Worker로 돌 수 없는 일(worker-ineligible)인지 사용자가 세션을
골랐을 뿐인지(세션 권장) 구분되지 않는다. `복잡`·`frontend`·`backend`는 후보 카드에서
슬롯 1, 다른 레인에서 슬롯 5b에 있어 §5.1 배치 규칙("그 요소가 답하는 질문")이 같은
칩에 두 답을 낸다. 완료 행에는 이 칩들이 아예 없다.

원인은 두 겹이다. 렌더러가 칩을 그리지 않고, 레인 항목에 칩 재료(라벨·metadata)가
레인마다 다르게 실린다.

사용자 결정 (2026-10-19, Hermes 중계 질문):

- 속성 칩의 자리는 **모든 레인에서 슬롯 1 정체성 줄**이다 (대안: 모든 레인 슬롯 5b).
- 범위는 **Bead 속성 칩 전부**이고, 완료 행의 일반 `↩ from`도 다시 보인다. 레인 상태
  칩·실행 사실은 레인별로 남는다 (대안: 완료 `↩ from` 생략 유지; 상태 칩까지 전부).

## 2. 검증된 전제

base `9f1cf1fa8f3916550386f658c66f2db8d2acbd98` 기준.

- 후보 카드는 슬롯 1에 `worker-ineligible`(아니면 `세션 권장`/`세션 실행`), `복잡`,
  `frontend`·`backend`, `quick_fix` 리뷰 칩을 이 순서로 싣는다 —
  app/views/worker/lanes.js:5267, :5277, :5287, :5292, :5295
- `quickFixReviewChipTemplate`의 호출처는 후보 카드 하나다 — app/views/worker/lanes.js:1197, :5295
- `miniRow`(대기·PR 대기·Worker 완료 행)는 `복잡`·area 칩을 슬롯 5b 재료로 만들지만
  ineligible·세션 권장·리뷰 칩은 만들지 않는다 — app/views/worker/lanes.js:3899, :4225-4234
- Worker 완료 행(row3)은 `세션`·exec·usage만 싣고 `복잡`·area를 싣지 않는다 —
  app/views/worker/lanes.js:4345-4348
- 모니터 완료 3줄 행은 route·출처·`세션`·exec만 싣는다 — app/views/worker/lanes.js:2276-2286
- 완료 행은 일반 `↩ from`을 뺀다 (UI-j10d §4) — app/views/worker/lanes.js:3995-3998, :2284;
  docs/superpowers/specs/2026-09-14-worker-created-issue-chip-design.md:96
- 실행 중 타일은 `복잡`·area를 슬롯 5에 싣고 ineligible·세션 권장·리뷰 칩은 없다 —
  app/views/worker/running-grid.js:1094, :1199, :1255, :1262
- 레인 모델 overlay는 metadata가 있을 때만 `complex_reason`·`chip_metadata`를 싣고,
  `worker_ineligible`·`session_preferred`·`exec`는 대기(`queue`·`s*`) 항목에만 싣는다 —
  app/views/worker/lane-model.js:4636, :4651-4666
- Worker 탭 overlay는 ready·blocked·in_progress 이슈에만 metadata를 싣고 resolved·closed
  이슈에는 싣지 않는다 — app/views/worker/workspace-adapter.js:608-623
- 모니터 overlay는 완료 레인을 뺀 레인 구성원에만 metadata를 싣고, 그 값은 실행 핀 허용
  키와 `complex_reason`뿐이다 — server/ws/monitor-handlers.js:633-636, :694-699;
  server/worker/title-cache.js:77-83
- 실행 핀 허용 키에는 `exec_lane`·`session_preferred_reason`이 없다 —
  app/utils/execution-defaults.js:9-28, server/worker/title-cache.js:77-83 (grep 0건)
- 두 탭이 받는 큐 스냅샷의 `bead_labels`는 대기·직렬·PR 대기·완료·실행 중 Bead를 모두
  덮는다 — server/ws/worker-handlers.js:2346-2370, :3796
- title-cache 레코드는 `bd show` 한 번의 결과에서 라벨·workflow·실행 핀을 함께 만든다
  (추가 bd 프로세스 없음) — server/worker/title-cache.js:375-387, :823-825
- 큐 스냅샷 `bead_workflow`는 `enrichIssueWorkflow` 요약이고 그 요약에
  `quick_fix_review`가 실린다 — server/worker/title-cache.js:191-194, :330-332;
  server/workflow-enrich.js:2064-2066
- PR 대기 행 투영은 새 객체를 만들며 `labels`·`complex_reason`·`chip_metadata`·`exec`를
  옮기지 않는다 — app/views/worker/pr-wait-row.js:1703-1756. 그래서 §4.6이 정한 PR 대기
  `세션` exec 칩도 지금 그려지지 않는다.
- 모니터·Worker 카드 동일성 테스트는 두 탭을 비교할 뿐 레인 사이는 비교하지 않고,
  세션 레인 검사는 대기·실행 중 `세션` 칩만 본다 — app/views/monitor/card-parity.test.js:905,
  :972, :1557
- 칩 클릭 처리기는 위임형이고 레인을 보지 않는다 — app/views/worker/index.js:3730-3779,
  app/views/monitor/index.js:3036-3066
- title-cache 요약은 선행 resolver 없이 `quick_fix_review`를 판정하고, resolver 부재는
  `predecessor_edge_*` 토큰이 나오지 않는다는 뜻일 뿐이다 — server/workflow-enrich.js:2070-2091
- 실행 핀 허용 키는 runnable-cache와 같은 집합이어야 한다 — server/worker/title-cache.js:66-73
- 닫힌 이슈 목록은 열린 이슈와 같은 `bd list --json` 계열이고 투영기는 행을 그대로
  통과시킨다 — server/list-adapters.js:59-71, server/bd-json.js:274-305
- 미확인: 닫힌 이슈 `bd list --json` 행에 `metadata`가 실제로 실리는지 — 열린 이슈 행은
  싣는다(workspace-adapter.js:608-609). 실리지 않으면 Worker 완료 행의 속성 칩은
  fail-quiet로 빠지고, 레인 동일성 테스트가 그 차이를 드러낸다.

## 3. 설계

### 3.1 칩의 두 부류 — 재료 출처가 정한다

- **Bead 속성 칩**: 재료가 Bead(라벨·metadata·workflow 요약)에서 온다. 같은 Bead면
  모든 레인·두 탭에서 같은 칩·같은 슬롯·같은 클릭이다.
  - 슬롯 1: `worker-ineligible` \| `세션 권장`/`세션 실행`(서로 배타, ineligible 우선) ·
    `복잡` · `frontend` · `backend` · `quick_fix` 리뷰 칩 — 후보 카드의 지금 순서 그대로.
  - 슬롯 5a: `route` · `↩ from` · 워커 생성 출처 · `plan <slug>`.
- **레인 칩**: 재료가 attempt·큐·배치·머지에서 온다. 지금처럼 그 레인에만 선다.
  `세션`·`오케`·`워커` exec 칩, 세션 정체 칩, `exec_receipt`, `영수증 잔여`, 레인 출처
  칩, `⏏ 내려옴`, held 판정 뱃지, 실패 원인, usage, 의존·정보 칩(슬롯 4), 조작 버튼.
- 결정 — 우선순위 `P n` 배지는 이 스펙이 바꾸지 않는다 — 칩이 아니라 배지이고, 모니터
  완료 3줄 행의 생략은 parity §9 "완료 줄 모양"에 이미 묶여 있다.

### 3.2 자리 — 모든 렌더러의 슬롯 1

- `candidateCard`·`miniRow`(대기·PR 대기·Worker 완료)·모니터 완료 3줄 행·`runningTile`이
  슬롯 1 정체성 줄 왼쪽 묶음, `P n`·`⏏ 내려옴` 뒤에 §3.1 슬롯 1 칩을 같은 순서로 싣는다.
  예: 하나의 공유 템플릿(`attributeChipsTemplate(item)`)이 다섯 칩을 그리고 렌더러는
  자리만 고른다.
- `miniRow`·`runningTile`의 슬롯 5b에서 `복잡`·`frontend`·`backend`를 뺀다(자리 이동이지
  중복 표시가 아니다).
- 완료 행은 Worker·모니터 모두 일반 `↩ from`을 슬롯 5a에 싣는다(UI-j10d §4 생략 철회).
  근거: 출처는 끝난 일에도 유효한 정보다(2026-08-03-closed-enrich-cost §범위 밖).
- 재료가 없는 칩은 그리지 않는다(fail-quiet). 칩이 하나도 없으면 묶음 요소도 없다.

### 3.3 재료 — 한 곳에서, 모든 레인에

- 레인 모델 overlay가 **모든 레인** 항목에 같은 공유 함수로 속성 필드를 싣는다:
  `labels`, `chip_metadata`, `complex_reason`, `worker_ineligible`, `session_preferred`,
  `session_preferred_reason`, `exec_lane`. 대기 전용 조건(lane-model.js:4651)은 속성
  필드에서 걷어 내고, 레인 칩 재료인 `exec`·`exec_chips`는 지금 자리에 남긴다.
  후보 항목도 같은 판정 함수(`isWorkerIneligible`·`sessionPreferredReason`·
  `execLaneOf`·`complexReason`)를 거친다.
- Worker 탭 overlay는 resolved·closed 이슈에도 열린 이슈와 같이 metadata를 싣는다.
  클라이언트 메모리 안의 투영이라 전송량은 늘지 않는다.
- 모니터 overlay는 완료 레인을 포함한 모든 레인 구성원에 두 가지를 싣는다.
  - 실행 핀: 지금 핀 그대로. `복잡`·area 칩의 바인딩 상태(`applied_exec_preset`·
    `chip_preset_source`)가 핀에 있으므로, 완료 행에 핀이 없으면 완료 행만 팝업 칩으로
    갈려 수용 기준 1이 깨진다. 비용은 완료 행마다 허용 키 몇 개다.
  - 속성 필드: `complex_reason` 옆에 `exec_lane`·`session_preferred_reason`을 더한다.
    지금 `complex_reason`이 실리는 issue-field 경로(`overlayFieldsFor`)를 따른다.
  - 값은 이미 있는 `bd show` 레코드에서 나오므로 bd 호출은 늘지 않는다(ADR UI-u6ud).
- 결정 — 실행 핀 허용 키(`EXEC_PIN_KEYS`)는 바꾸지 않는다 — 그 집합은 runnable-cache와
  같아야 대기 행 한도 게이트가 두 탭에서 같은 계정을 고르고(title-cache.js:66-73), 프리셋
  동일성 비교가 핀 키 집합을 대칭 비교한다(ADR UI-rd2m).
- PR 대기 행 투영은 레인 항목의 속성 필드와 `exec`를 옮겨 싣는다. 이것으로 §4.6 PR 대기
  `세션` exec 칩 결함도 함께 고친다.
- `quick_fix` 리뷰 칩 재료는 각 항목의 `workflow.quick_fix_review`다. 결정 — 선행 간선
  토큰(`predecessor_edge_*`)은 snapshot resolver가 있는 후보 투영에서만 판정하고 다른
  레인은 그 토큰 없이 판정한다 (대안: title-cache에도 선행 resolver를 넘김; 이유: 리뷰
  칩은 배치 전에 행동을 바꾸고, resolver를 캐시 경로에 넣으면 레코드가 선행 상태에 따라
  무효화돼야 한다). 수용 기준 1의 유일한 예외다.

### 3.4 `세션` exec 칩과 함께 설 때

결정 — 속성 칩과 `세션` exec 칩은 함께 선다 (대안: ineligible·세션 실행이 있으면 exec 칩
생략; 이유: 속성 칩은 Bead의 **지금** 설정이고 exec 칩은 attempt에 **기록된** 실행
방식이라, 세션 토글 뒤에는 둘이 다를 수 있다 — UI-lbm5 §4.7 "다음 dispatch부터").
후보 카드는 attempt가 없으므로 지금처럼 exec 칩이 없다.

### 3.5 클릭

결정 — 클릭 의미는 바꾸지 않는다. 칩마다 한 의미(chip-grammar 스펙·ADR UI-rd2m·UI-lbm5
§4.7)가 모든 레인에서 같다. 렌더러는 클릭에 필요한 `data-bead-id`·`data-root-dir`을
카드에 싣고, 항목은 바인딩 판정용 `chip_metadata`를 싣는다. 팝업 내용
(`judgementPopoverContent`)이 후보 전용 필드에 기대면 공유 재료로 바꿔 어느 레인에서나
같은 내용을 낸다.

### 3.6 폭

- 390px에서 머리줄은 지금처럼 줄바꿈하고(UI-l48z) 칩 글자를 줄이지 않는다.
- 실행 중 타일 머리줄 오른쪽 조작 묶음은 자리를 지킨다. 속성 칩은 왼쪽 묶음 안에서만
  줄바꿈한다.

### 3.7 정본 문서 정정 (구현 산출물)

- 2026-08-25 card-header-grammar §5.1: 슬롯 1 행에 속성 칩 다섯을 "모든 변형"으로 적고,
  5b 행의 "`복잡` 및 그 옆의 `frontend`·`backend`(이미 슬롯 5인 변형만)"을 뺀다. :273-274
  "후보의 … 슬롯 1에 남는다"를 "모든 변형에서 슬롯 1"로 고친다. §3.2 :144-145는 그대로
  유효하다.
- 2026-09-22 run-lane-origin §4.3 :149-154, 2026-08-28 chip-grammar :239-245,
  2026-09-22 chip-preset-bindings §5.4 :290-291, 2026-08-25-session-preferred-chip-consumer
  §4.1과 수용 기준 4: 각 자리에 "UI-refs 정정: 모든 레인 슬롯 1" 한 줄을 단다.
- 2026-09-14 worker-created-issue-chip :96: 완료 행 일반 출처 생략에 UI-refs 철회를 단다.
- 모니터-Worker parity §9에는 행을 더하지 않는다 — 탭 사이 차이가 생기지 않는다.

## 4. 수용 기준

1. 같은 Bead의 슬롯 1 속성 칩 집합·순서·클래스가 후보·대기·실행 중·PR 대기·완료
   카드에서 같다. 단, 레인 이동 사이에 Bead 라벨·metadata가 바뀐 경우와 §3.3 리뷰 칩
   선행 간선 예외는 제외한다.
2. 위 1이 Worker·모니터 두 탭에서 같다.
3. `세션` 레인 Bead 카드에서 `worker-ineligible`과 `세션 실행`이 구분되어 보인다.
4. PR 대기 세션 레인 카드에 `세션` exec 칩이 선다.
5. 완료 행(두 탭)에 `↩ from`이 선다.
6. `miniRow`·`runningTile` 슬롯 5b에 `복잡`·`frontend`·`backend`가 없다.
7. 모니터 overlay가 bd 호출 수를 늘리지 않고, 속성 키가 없는 이슈의 실행 핀 객체는
   지금과 같다.
8. 390px·1280px 폭 넘침 탐침이 `#/worker`·`#/monitor`에서 exit 0이다.

## 5. 비목표

- 레인 칩(§3.1)의 자리·표시 조건 변경.
- 칩 클릭 의미, 프리셋 바인딩, 세션 토글 서버 op 변경.
- `P n` 배지와 완료 줄 모양(parity §9).
- 이슈 상세 헤더.

## 6. 테스트

- 새 레인 동일성 테스트(예: `card-lane-identity.test.js`): 한 Bead 픽스처를 다섯 레인
  렌더러로 그려 슬롯 1 속성 칩의 클래스·텍스트·순서가 같고 슬롯 5b에 판정 칩이 없음을
  확인한다. 픽스처는 ineligible, 세션 권장(`exec_lane` 유·무), 복잡+area, `quick_fix`
  리뷰 reviewed를 덮는다.
- card-parity.test.js: 세션 레인 검사에 PR 대기·완료 `세션` 칩과 네 레인 속성 칩을 더한다.
- lane-model·pr-wait-row 단위 테스트: 모든 레인 항목이 속성 필드를 싣고 PR 대기 행이
  `exec`를 옮긴다.
- monitor-handlers·title-cache 단위 테스트: 완료 레인 구성원 metadata, 새 허용 키 두 개,
  bd 호출 수 불변.
- styles.design-system.test.js 검사 3: 다섯 속성 칩을 모두 단 각 렌더러 상태를 더한다.
- `node scripts/ui-overflow-probe.mjs http://127.0.0.1:<port> '#/worker' '#/monitor'`
  (live 프런트엔드 개발 서버) exit 0.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-lsr4 — worker-ineligible·session-preferred(`exec_lane=session`) 이슈는 세션
  레인으로 실행된다는 조항을 칩 의미로 따른다.
- 전제: ADR UI-rd2m — `복잡`·`frontend`·`backend` 클릭은 route 계열 바인딩 프리셋 토글
  그대로다.
- 전제: ADR UI-u6ud — overlay 재료는 기존 스냅샷·`bd show` 레코드에서 투영하고 bd 호출을
  더하지 않는다.
- 전제: ADR UI-u6ud-2 — 계약 키(라벨·metadata) 부재는 fail-quiet 표시 생략이다.
- Bead 속성 칩은 모든 레인 슬롯 1에 같은 순서로 선다 — 화면 배치라 되돌리기 쉽고 함께
  움직일 외부 소비자가 없다 → ADR 아님
- 칩의 레인 표시 여부는 재료 출처(Bead vs attempt·큐)가 정한다 — 스펙 수준 분류 규칙이고
  카드 문법 스펙 §5.1이 소유한다 → ADR 아님
- 완료 행 일반 `↩ from` 표시 — 화면 배치 → ADR 아님
