---
scope:
  - server/placement/
  - app/utils/placement/
  - app/views/worker/placement.js
---

# 배치 추천의 부딪힘 기준 좁히기 (UI-i7k9)

## 1. 목표

Worker 대기열 배치 추천(UI-izba)이 병렬 배치를 거의 내지 않고, 직렬 배치는 한 레인으로 몰아 넣는다.
원인은 선언 scope가 경로 접두만 겹쳐도 고정 `conflict`가 되는 규칙이다. 예를 들어 `tests` 폴더 하나를
선언하면 그 아래 파일을 고치는 모든 이슈와 부딪힘이 된다. jev는 이 판정을 뒤집지 못하고, 자리 계산은
부딪힘으로 이어진 후보를 한 묶음으로 보아 한 직렬 레인에 넣는다.

머지 충돌은 충돌 해소 세션이 푼다. 그래서 동시에 돌리면 안 되는 쌍은 "한쪽이 다른 쪽 결과를
전제한다"와 "같은 부분을 크게 고쳐 해소 세션으로도 풀기 어렵다" 두 경우뿐이다(사용자 판단,
2026-10-16). 이 설계는 부딪힘을 그 두 경우로 좁혀 병렬을 기본으로 만든다.

비목표: 스케줄러가 실행 시점에 부딪힘 상대를 기다리는 기능(검토 후 채택하지 않음). 자리 계산의 묶음·K
규칙. 보관한 PR 대기 항목 제외·기본 체크·근거 접기(UI-7y8h quick_fix가 맡는다).

## 2. 검증된 전제

- 고정 조건은 blocks 다음으로 선언 scope 겹침을 `conflict`·`basis: 'scope'`로 정하고, 같은 spec·plan 출처면 건너뛴다 — `server/placement/relations.js:84`, `server/placement/relations.js:89`, `server/placement/relations.js:98`
- 고정 조건이 정한 쌍은 jev에 묻지 않는다(`total`에 세지 않음) — `server/placement/relations.js:145`
- scope 겹침은 경로 접두 비교다 — `app/utils/scope-overlap.js:32`
- jev 질문의 `independent` 기준은 "파일·공유 상태·계약·배포 대상 중 어느 것도 바꾸지 않는다", `conflict`는 "같은 파일 영역 … 을 바꿔 동시에 하면 부딪힌다"이다 — `server/placement/question.js:53`, `server/placement/question.js:59`
- 질문 버전은 질문 정의의 digest라, 문구를 바꾸면 캐시된 모든 쌍을 다시 묻는다 — `server/placement/question.js:72`
- 쌍 캐시 키는 두 id·두 재료 digest·질문 버전·모델이다 — `server/placement/pair-cache.js:52`
- jev가 읽는 이슈 재료는 id·제목·type·route·본문이고, spec이 있으면 spec의 scope와 절이다 — `server/placement/material.js:60`, `server/placement/material.js:63`
- 쌍 state 텍스트는 두 재료를 이어 붙인 것이다 — `server/placement/material.js:87`, `server/placement/service.js:337`
- wire의 `overlap`은 `basis: 'scope'`에만 실린다 — `server/placement/wire.js:46`
- 화면 근거 줄은 `basis: 'scope'`를 `고정(scope 겹침: …)`으로 쓴다 — `app/views/worker/placement.js:418`
- 자리 계산은 관계 종류(`conflict`·`c_first`·`x_first`)를 출처와 무관하게 묶음·레인 선택·삽입 위치에 쓰고, `basis`로 갈리는 곳은 레인 안 blocks 정렬(`edgesAmong`)뿐이다 — `app/utils/placement/compute.js:422`, `app/utils/placement/compute.js:496`
- 후보 상태는 jev 대상 쌍이 0이면 `fixed_only`다 — `server/placement/relations.js:190`
- 모니터 경로는 같은 투영을 `observe: false`로 불러 캐시만 읽고 jev 호출을 잡지 않는다 — `server/ws/worker-handlers.js:2034`, `server/placement/service.js:453`
- `⧉` 칩은 같은 spec·plan 출처 쌍을 겹침으로 보지 않는다 — `app/views/worker/queue-overlaps.js:85`, `app/views/worker/lane-model.js:2760`
- 이슈 재료 메모는 같은 행·같은 spec 값이면 이전 재료를 그대로 돌려준다 — `server/placement/service.js:390`
- 이슈 재료 텍스트는 직렬화한 앞 `ISSUE_MATERIAL_CAP`(12,000)자이고 digest는 그 텍스트의 해시이며, 쌍 state는 `STATE_CAP`(24,000)자로 자른다 — `server/placement/material.js:69`, `server/placement/material.js:88`
- 머지 충돌은 충돌 해소 세션(`resolveConflict`, `resolution_rounds`)이 다룬다 — `server/worker/scheduler.js:16087`, `server/worker/queue-store.js:730`
- quick_fix의 선언 scope는 본문 `## scope` 절에서 읽는다 — `server/worker/title-cache.js:167`
- 미확인: 화면 배치 계산에 들어가는 선언 scope(`bead_scope`)가 quick_fix 본문 `## scope`·spec front-matter 외의 출처(plan 산출물 등)에서도 오는지 — 3.2가 재료에 그 scope를 직접 싣기로 해 결과는 출처와 무관하다

## 3. 설계

### 3.1 고정 조건은 blocks만

- 결정: 고정 조건은 직접 `blocks` 의존 하나다. 선언 scope 겹침은 어떤 경우에도 고정 관계를 만들지 않고,
  그 쌍은 다른 쌍과 똑같이 jev에 묻는다.
- 같은 spec·plan 출처 예외(`sharesScopeSource`)는 배치 판정에서 더는 쓰지 않는다. `⧉` 칩은 그 규칙을
  그대로 쓴다.
- wire `basis`의 값은 `blocks` 하나가 된다. `fixed_only` 상태는 "모든 쌍이 blocks로 정해짐"을 뜻한다.

### 3.2 jev 질문에 겹치는 경로를 싣는다

- 두 이슈의 선언 scope가 겹치면 쌍 state 텍스트에 겹치는 접두를 한 줄로 싣는다.
  예: `Declared scopes overlap on: tests, src/claude/settings/base.json`.
- 결정: 겹침 줄은 상한에 잘리지 않는다. 쌍 state는 겹침 줄을 먼저 두고, 남은 상한 안에서 두 재료를
  지금처럼 자른다.
- 결정: 겹침 계산에 쓰는 선언 scope(배치 판정이 받는 `scopes`와 같은 값)는 이슈 재료의 본문보다 앞
  필드로 직렬화되어(예: `declared_scope`) 재료 상한에 잘리지 않고 digest에 들어간다. 따라서 scope가
  바뀌거나 뒤늦게 채워지면 그 이슈 digest가 바뀌고 그 이슈가 낀 쌍만 다시 묻는다. 캐시 키 형식은
  바꾸지 않는다.
- 결정: 이슈 재료 메모의 재사용 조건에 선언 scope 값을 넣는다. 같은 행·같은 spec에서 scope만 달라져도
  재료를 새로 만든다.
- scope를 모르는 이슈는 그 필드가 없고 겹침 줄도 없다(fail-quiet).

### 3.3 jev 질문 기준을 좁힌다

`instructions`는 각 이슈를 다른 Worker가 따로 구현·머지하고, 머지 충돌은 충돌 해소 세션이 푼다는
전제를 말한다. 선택지 기준은 다음 뜻으로 바꾼다(문구는 구현이 다듬되 뜻은 이것이다).

- `independent` — 동시에 구현·머지해도 어느 쪽도 다른 쪽 결과를 전제하지 않는다. 같은 파일을 고치더라도
  해소 세션이 보통 풀 수 있는 겹침(서로 다른 함수·항목 추가·설정 줄 추가)이면 이것이다.
- `a_first`·`b_first` — 지금과 같다(한쪽이 다른 쪽 결과 위에 짓거나, 늦게 착지하면 다시 해야 한다).
- `conflict` — 어느 쪽도 다른 쪽 결과를 전제하지 않지만, 같은 함수·같은 계약 조항·같은 데이터 형식을
  서로 다르게 바꿔 동시에 하면 해소 세션도 한쪽을 다시 짜야 하는 경우.
- 겹침 줄은 판단 재료일 뿐이고, 겹친다는 사실만으로 `conflict`를 고르지 말라고 질문이 말한다.
- 채택 확신도(0.8)·참고 확신도(0.5)·모델·엔드포인트·시간 제한은 바꾸지 않는다.
- 질문 버전이 바뀌므로 배포 뒤 모든 쌍을 한 번 다시 묻는다. 후보끼리도 비교하므로 후보 12·기존 항목
  10이면 최대 12×10 + 12×11÷2 = 186쌍에서 blocks 쌍을 뺀 수이고, 동시 2개·호출당 0.4~0.9초라 첫 채움은
  약 37~84초다.

### 3.4 화면 근거 줄

- jev 관계에 겹침이 있으면 wire 관계가 `overlap`을 싣고, 근거 줄이 출처 뒤에 덧붙인다.
  예: `UI-x — 독립 · jev 0.93 (겹침: tests)`, `UI-y — 부딪힘 · jev 0.86 (겹침: app/styles.css)`.
- `고정(scope 겹침: …)` 문구와 그 분기는 없앤다. `고정(blocks)`는 그대로다.
- 자리 계산(`app/utils/placement/compute.js`)은 바꾸지 않는다. 부딪힘 관계가 줄어 묶음이 작아지는 것이
  효과다.

### 3.5 오류와 경계

- jev를 못 쓰는 경우(키 없음·실패·판정 중)는 지금 상태 규칙 그대로다. 예전에는 고정으로 정해지던 쌍도
  이제 jev를 기다리므로 `fixed_only`였던 후보가 `pending`·`unavailable`이 될 수 있다. 수동 배치는 늘
  그대로 쓸 수 있다. 같은 이유로 그 쌍은 진행 막대(`placement_progress`, UI-7y8h)의 `total`에도 든다 —
  고정 관계가 아닌 쌍만 세는 지금 규칙 그대로라 따로 바꿀 것은 없다.
- 모니터 탭은 같은 투영의 캐시만 읽으므로 따로 바꿀 것이 없다(parity §9 행 변화 없음).

## 4. 수용 기준

1. 선언 scope만 겹치고 blocks가 없는 쌍은 고정 관계가 없고, jev 판정 대상(`jev_pairs`)에 든다.
2. blocks가 있는 쌍은 지금처럼 고정 관계이고 jev에 묻지 않는다.
3. scope가 겹치는 쌍의 state 텍스트에 겹침 줄이 있고, 두 재료가 상한을 넘는 긴 본문이어도 남는다.
   겹치지 않으면 없다.
4. 이슈의 선언 scope가 바뀌면 그 이슈 재료 digest가 바뀐다. 본문이 재료 상한을 넘어도, 같은 행·같은
   spec에서 scope만 바뀌거나 뒤늦게 채워져도 그렇다.
5. 질문 정의가 3.3의 뜻을 담고, 질문 버전이 이전 값과 다르다.
6. jev 관계에 겹침이 있으면 근거 줄에 `(겹침: …)`이 붙고, `고정(scope 겹침` 문구는 어디에도 나오지 않는다.
7. 배포 뒤 공유 서버 dotfiles Worker 탭 [전체 배치안]에서, 재판정이 끝난 후보들이 병렬 또는 여러 직렬
   레인으로 나뉘는지 390px 스크린샷으로 확인한다(변경 전 스크린샷과 비교).

## 5. 테스트

- `server/placement/relations.test.js`: "relates a scope-only overlap through jev", "keeps a blocks pair fixed
  and unasked", "ships the overlap on a jev relation" (기존 scope 고정 테스트는 이 뜻으로 바꾼다).
- `server/placement/material.test.js`: "keeps the overlap line in a pair state over the cap", "changes the
  digest when the declared scope changes under a long description".
- `server/placement/service.test.js`: "rebuilds the material when only the declared scope changes",
  "re-asks only the pairs of an issue whose scope filled in late".
- `server/placement/question.cross-runtime.test.js`는 그대로 통과해야 한다(모델·엔드포인트·시간 제한 불변).
- `app/views/worker/placement-preview.test.js`: "appends the overlap to a jev reason line".
- 전체 검증 bundle: `npm run tsc`, `npm run lint`, `npx prettier --check`, `npx vitest run --reporter=dot`.

## 6. 결정 (ADR 후보)

- 배치 추천의 고정 조건을 blocks만으로 좁히고, 선언 scope 겹침은 jev 질문의 재료로만 쓰며, jev의
  `conflict`를 해소 세션으로도 풀기 어려운 겹침으로 좁힌다. (1) 되돌리기 어려움: 질문 버전이 바뀌어 쌍
  캐시 전체가 다시 채워지고, `server/placement/relations.js`·`material.js`·`question.js`·`service.js`, wire
  `basis`·`overlap` 뜻, 화면 근거 줄(`app/views/worker/placement.js`)이 함께 움직인다. (2) 맥락 없이 의외:
  파일이 겹치는데도 병렬로 배치되는 것은 해소 세션이 있다는 전제 없이는 위험해 보인다. (3) 실제
  트레이드오프: 해소 세션 비용과 jev 오판 위험 대 직렬 몰림으로 잃는 병렬성. 통합: 같은 소비자를 다스리는
  현재 ADR은 둘이다. UI-izba는 `server/placement/`·`app/utils/placement/`·`placement.js` 배치 추천을
  다스리고 그 "선언 scope 겹침은 충돌이고 jev에 묻지 않는다" 조항을 이 결정이 뒤집는다. UI-lbm5는
  `placement.js`의 후보 사실·자격 판정(그리고 승계한 카드 문법·직접 push 착지 조항)을 다스리며 이 결정은
  그 조항을 바꾸지 않고 그대로 다시 적는다. 그래서 둘을 하나로 통합해 대체한다. `summary`: "Worker 대기열 배치 추천은 서버가 jev 쌍 판정(두 이슈 재료 digest로 캐시, 선언 scope 겹침은 질문 재료로만 싣는다)과 고정 조건(blocks)으로 쌍 관계를 만들고, jev의 충돌은 해소 세션으로도 풀기 어려운 겹침에만 내며, 화면이 현재 큐·후보 순서로 자리를 계산해 Worker 탭 후보 카드의 별도 [추천 배치] 버튼을 누를 때 점선 미리보기로 보이고([↴ 대기로] 수동 메뉴는 그대로) 레인에는 사람의 [적용]·[전체 적용]만 쓴다; 큐 변화는 jev를 부르지 않고 추천은 blocks 의존을 쓰지 않으며 질문 정의는 beads-ui 서버에 둔다; 배포·빌드 조항은 UI-u6ud-5에서 승계한 그대로다; worker-ineligible과 exec_lane=session인 session-preferred 이슈는 Worker 대기열에서 세션 레인으로 실행된다 — 같은 admission·공유 슬롯·직렬 레인을 거쳐 Worker attempt로 기록되고(fast_track·worker 출처) headless와 같은 계정·가드 훅 env로 Worker 표지 없이 session-hub 대화형 창으로 열리며, 생존은 isDeadAttempt가 마커 pane 관측으로 판정하고(관측 실패는 생존) 결과는 종단 결과 줄로 headless와 같은 판정을 탄다; 결과 줄 없는 창 소멸은 클릭 전용 session_exited 실패이고 재개는 세션 레인 attempt의 ↻ 이어하기이며 일시정지는 없다; UI-lbm5가 UI-1eag에서 승계한 나머지 조항은 그대로다" → ADR, supersede UI-izba, UI-lbm5
- 스케줄러에 부딪힘 대기를 넣지 않는다 — 지금 동작을 바꾸지 않는 비채택이라 되돌리기 어려운 결정이 아니다 → ADR 아님
