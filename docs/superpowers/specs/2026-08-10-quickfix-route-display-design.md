# quick_fix route 표시·상태 블록 정합 설계 (UI-6kow)

- 날짜: 2026-08-10
- Bead: UI-6kow (route: spec_backed)
- 상위 계약: dotfiles `dotfiles-gvlf` (closed, PR #345 머지, 2026-08-06) —
  `docs/contracts/workflow.{md,yaml}`의 route enum이
  `[quick_fix, spec_backed, full_plan]`으로 확장됐다. quick_fix는 기존 bead에
  **부착만** 하고(생성 불허, `bead: attach_existing_only`), 라우팅 시점에
  스탬프되며, `open → in_progress → closed` 직행(`resolved: forbidden`), PR
  없음, 게이트 영수증(`spec_review`/`impl_review`) 없이 close되는 것이 **정상
  종결**이다(증거는 close 직전 완료 보고서 코멘트 + 랜딩 커밋). 본 스펙은 그
  계약의 beads-ui 소비자 정합이다 — 계약 정의는 dotfiles 소유(AGENTS.md).
- 사용자 확정 사항 (2026-08-10): stepper는 **2셀 [impl·close]** / 상세 패널
  영수증 행은 **조건부 생략 + 있으면 표시** / route 드롭다운은 **quick_fix
  선택지 추가(쓰기 허용)** / 워커 후보는 **route 인지 사유 칩** / 구현 접근은
  **A. 기존 패턴 확장**.

## 1. 배경과 실측 (2026-08-10)

- **오분류 체인**: `server/workflow-enrich.js:432` `deriveRoute()`가 quick_fix를
  몰라 `plan_path` 폴백으로 derived `spec_backed`를 반환하고, 같은 파일 662행이
  핀된 quick_fix를 `route_source: 'derived'`로 강등한다. 결과: 보드 카드 칩이
  `spec_backed ?`(추론 표기), 상세 패널이 `spec_backed ? (추론)`으로 표시된다.
  `server/workflow-enrich.test.js:395`는 이 동작을 "invalid pin은 derived"
  단언의 표본으로 quick_fix를 사용 중이다.
- **2차 coercion**: `app/views/board/stepper.js:200`이 서버 값과 독립적으로
  `route === 'full_plan' ? 'full_plan' : 'spec_backed'`를 재판정한다.
  `ROUTE_ORDER`에 3번째 route를 표현할 자리가 없다. 워커 후보 카드
  (`app/views/worker/lanes.js:370`)도 같은 `stepperTemplate`을 쓴다.
- **상태 블록 결손 표기**: `app/views/detail-panel/index.js:932-960`이
  `spec_review`/`impl_review` 행을 route 무관하게 항상 렌더해, quick_fix의 정상
  종결(영수증 없음)이 미완료 spec_backed와 동일한 `없음`으로 표시된다. "게이트
  미적용"과 "게이트 미충족"을 구분할 수단이 없다. plan 행은
  `wf.route === 'full_plan'`일 때만 렌더하는 조건부 선례가 이미 있다(938행).
- **드롭다운/쓰기 게이트**: `app/views/detail-panel/index.js:978`
  `WORKFLOW_META_OPTIONS.route`와 `server/ws/mutation-handlers.js:195`
  `WORKFLOW_META_ENUMS.route`가 2값이라, 핀된 quick_fix가 드롭다운에서 "(미설정
  · 추론)"으로 표시되고 quick_fix 쓰기는 `bad_request`로 거부된다
  (`server/ws/workflow-meta-mutation.test.js:107`이 거부를 단언).
- **워커 dispatch는 이미 3중 fail-closed** (bead 범위 3항은 검증으로 종결):
  `server/worker/runnable-cache.js:56` `RUNNABLE_ROUTES` 화이트리스트(후보
  캐시에서 사전 제외), `server/worker/admission.js:53` `ADMISSIBLE_ROUTES`(큐
  진입·tick·dispatch 재검사 3지점에서 `invalid_route` 거부),
  `server/ws/mutation-handlers.js:195`(쓰기 게이트). 세 곳 모두 quick_fix 거부
  테스트가 존재한다(`runnable-cache.test.js:136`, `admission.test.js:94,283`,
  `workflow-meta-mutation.test.js:107`). 오배정 경로 없음.
- **보드 레인은 status 기반**: `app/views/board/index.js:52-64` 컬럼 소속은
  전적으로 status로 결정되고 route는 읽지 않는다 — quick_fix bead는 이미 올바른
  컬럼에 뜬다. Bead 기재의 "레인 신설"은 실측상 불필요하며, 실제 작업은 칩·
  stepper·상태 블록 정합이다.
- **워커 후보 사유 칩**: `app/views/worker/index.js:81-84` `hasSpec` 게이트가
  route 무관하게 `spec_id` 부재를 `'spec 없음'` 사유로 표시한다. quick_fix
  bead는 결과적으로 드래그 불가(올바름)지만 정상 상태가 결손처럼 읽힌다.
- **팔로업 route 무스탬프화**: 계약 변경으로 팔로업 bead는 route 없이 생성되고
  intake 세션이 백필한다. route 부재 bead의 derived 표시는 현행 그대로 올바른
  동작이다.

## 2. 목표 / 비목표

목표:

1. 핀된 `route: quick_fix`를 explicit로 인식해 카드 칩·상세 패널·stepper가
   quick_fix를 3번째 route로 정확히 표시한다.
2. 상태 블록이 quick_fix의 영수증 없는 정상 종결을 결손으로 표시하지 않는다.
3. route 드롭다운에서 quick_fix를 표시·선택(쓰기)할 수 있다.
4. 워커 후보 패널의 비적격 사유가 quick_fix를 결손이 아닌 route 사실로
   표기한다.

비목표:

- 보드 레인(컬럼) 구조 변경 — status 기반 유지.
- 워커 dispatch 로직 변경 — 3중 fail-closed 실측 확인으로 종결, 기존 거부
  테스트가 회귀 가드로 유지된다.
- admission 거부 사유 `invalid_route`의 어휘 변경 — quick_fix는
  `runnable-cache`에서 사전 필터되어 그 사유가 실전에서 노출될 경로가 없다.
- monitor 표면 변경 — runnable 경로는 사전 필터로 quick_fix를 보지 않고, 그 외
  monitor 아이템은 route 칩을 렌더하지 않는다.
- 계약 문서·미지의 4번째 route 값 처리 변경 — 계약 밖 값(오타 등)은 현행대로
  derived `spec_backed`로 fail-quiet 표시.

## 3. 설계

### 3.1 서버 enrichment — `server/workflow-enrich.js`

- `deriveRoute()`: `md.route === 'quick_fix'`이면 `'quick_fix'` 반환. 폴백
  (`plan_path ? 'full_plan' : 'spec_backed'`)은 유지 — quick_fix는 추론으로
  절대 나오지 않고 명시 핀으로만 나온다(계약: 라우팅 시점 스탬프, 부착 없으면
  핀 자체가 없음).
- `route_source`: 662행 explicit 판정에 `'quick_fix'` 추가 — 핀된 quick_fix는
  `'explicit'`.
- stages: route가 quick_fix일 때 `stages.close`를 추가한다 — fill은
  `status === 'closed' → 'full'`, 그 외 `'none'`; glyph·stale 없음(영수증
  개념이 없는 셀). 기존 spec/impl/pr/merge 계산은 형태 호환을 위해 그대로
  유지한다(stepper가 `ROUTE_ORDER`로 선택 렌더하므로 잉여 스테이지는 무해).
  plan 스테이지는 full_plan 전용 유지.
- typedef: `WorkflowSummary.route`와 `chips.route`의 유니온을
  `'quick_fix'|'spec_backed'|'full_plan'`으로 확장.
- quick_fix + `plan_path` 동시 존재(계약 이탈) 시 explicit 핀이 우선한다 — plan
  스테이지는 붙지 않는다.

### 3.2 보드 stepper — `app/views/board/stepper.js`

- `ROUTE_ORDER.quick_fix = ['impl', 'close']`.
- `STAGE_CLASS.close = 'mrg'`(merge 색상 클래스 재사용 — CSS 무변경),
  `STAGE_LABEL.close = 'close'`.
- 200행 coercion을 3값 조회로 교체:
  `const order = ROUTE_ORDER[workflow.route] || ROUTE_ORDER.spec_backed;`
- `currentStageKey`·aria 라벨은 order 파생이라 자동 정합: in_progress에서 impl
  셀이 dim+blink, closed에서 [●·●]. 워커 후보 카드는 같은 템플릿으로 자동
  반영.

### 3.3 상세 패널 — `app/views/detail-panel/index.js`

- route 표시(918-930행): 서버 수정만으로 `quick_fix`(explicit, 추론 마커 없음)
  표시가 자동 정정된다 — 클라이언트 변경 없음.
- `spec_review`/`impl_review` 행(932-960행): `wf.route === 'quick_fix'`이면
  **생략하되, metadata에 해당 키 값이 존재하면 그대로 렌더**한다(계약 이탈을
  숨기지 않음). plan 행의 조건부 렌더와 동일 패턴.
- 드롭다운(978행): `WORKFLOW_META_OPTIONS.route`에 `'quick_fix'` 추가 — 핀된
  값이 올바르게 표시되고 사용자가 직접 선택(재분류)할 수 있다.

### 3.4 서버 쓰기 게이트 — `server/ws/mutation-handlers.js`

- `WORKFLOW_META_ENUMS.route`에 `'quick_fix'` 추가 — 드롭다운 쓰기 허용과 서버
  게이트를 동일 집합으로 유지한다. 계약 enum과 일치하므로 소비자 역할 안에
  있다.

### 3.5 워커 후보 사유 칩 — `app/views/worker/index.js`

- `candidate_rows`(1693-1712행)에서 `hasSpec` 검사보다 먼저 route 분기:
  `metadata.route === 'quick_fix'`이면 사유 `'quick_fix · 워커 비대상'`,
  `eligible = false`(드래그 불가 유지). 그 외 route는 현행 `'spec 없음'` 경로
  그대로.

### 3.6 fail-quiet 경계

- 계약 이탈 관측(quick_fix인데 `pr_url`/영수증 존재, 금지된 `resolved` 상태)은
  특수 마커 없이 있는 그대로 렌더한다 — pr 칩은 chips 로직 그대로, status는
  status 기반 컬럼/스테이지 로직 그대로. 정정은 계약 쪽 제기(AGENTS.md
  fail-quiet 원칙).
- 미지의 route 값은 현행 fail-quiet(derived spec_backed) 유지 — §2 비목표.

## 4. Test scope

RED → GREEN seam (신규 동작):

1. `server/workflow-enrich.test.js` — `route: 'quick_fix'` 핀:
   `wf.route === 'quick_fix'`, `route_source === 'explicit'`,
   `stages.close`가 open→`none`/closed→`full`, plan 스테이지 부재,
   `chips.route === 'quick_fix'`.
2. `app/views/board/stepper.test.js` — quick_fix workflow에서 2셀 [impl·close]
   렌더(라벨 `close`, 색상 클래스 `mrg`), 미지 route 폴백은 spec_backed 4셀
   유지.
3. `app/views/detail-panel/index.test.js` — quick_fix route에서
   `spec_review`/`impl_review` 행 생략, metadata에 값이 있으면 렌더
   (show-if-present), 드롭다운에 quick_fix 옵션 표시.
4. `server/ws/workflow-meta-mutation.test.js` — `route=quick_fix` 쓰기 수용
   (기존 107행 거부 단언을 수용 단언으로 교체).
5. `app/views/worker/index.test.js` — quick_fix bead의 reason이
   `'quick_fix · 워커 비대상'`, `eligible === false`.

Characterization 갱신 (기존 단언의 표본 교체):

6. `server/workflow-enrich.test.js:395` "invalid pin은 derived" — 표본을
   quick_fix에서 진짜 invalid 값(`'foo'`)으로 교체하고 단언 유지.

무변경 회귀 가드 (건드리지 않음):

- `server/worker/runnable-cache.test.js:136`(quick_fix 후보 제외),
  `server/worker/admission.test.js:94,283`(quick_fix `invalid_route` 거부) —
  워커 오배정 방지의 회귀 가드로 그대로 둔다.

## 5. 검증

- Pre-Handoff Validation: `npm run tsc` / `npm test` / `npm run lint` /
  `npm run prettier:write` / `npm run build`(+ 갱신된 `app/main.bundle.js`,
  `app/main.bundle.js.map` 포함).
- 머지 후: `docs/agents/repo-ops.toml [deploy]` 자동 경로(`bdui-shared
  restart`, detached)가 걸리는 [머지] 클릭 경로 사용 시 자동 재시작 후, 프로세스
  경로·포트·HTTP 응답 검증. 수동 머지 시 AGENTS.md Post-Merge Runtime
  Validation 절차 직접 수행.
- 표시 확인: route가 quick_fix로 핀된 실제 bead 1건으로 보드 칩(`quick_fix`,
  추론 마커 없음)·2셀 stepper·상세 패널(영수증 행 부재, 드롭다운 quick_fix
  선택 표시)·워커 후보 사유 칩을 브라우저에서 확인.
