# 외부 PR의 PR 대기 레인 표시·머지 지원 (UI-7agi)

- 날짜: 2026-07-28
- Bead: UI-7agi
- Route: spec_backed

## 목적

worker attempt 없이 일반 세션에서 PR Delivery까지 끝난 bead(`status=resolved` +
`metadata.pr_url`, 예: UI-0x54)도 worker 콘솔의 PR 대기 레인에 표시하고, 기존
머지 버튼으로 worker PR과 동일한 머지·후처리 초레오그래피를 실행할 수 있게
한다. beads-ui의 "human merge click"을 worker 출신 PR로 한정하지 않는다.

## 현재 구조 (관측 사실)

- `q.pr_wait`는 worker 스케줄러 attempt가 verify 성공으로 전이될 때만 채워진다
  (`server/worker/queue-store.js` `moveToPrWait` — attempt 기록 선행 필수,
  호출처는 `server/worker/scheduler.js`의 성공/재조정 경로 2곳).
- 머지 실체는 `server/worker/pr-actions.js` `merge()`: gh 게이트 재확인 → 충돌
  시 충돌 해소 세션 디스패치 → BEHIND면 update-branch 후 재게이트 → squash
  머지 → durable cleanup(베이스 동기화·머지 후 검증·deploy·자식 bead
  정리·브랜치/워크트리 정리·bd close).
- attempt 의존은 두 곳뿐: PR 번호를 `queue.attempts`에서만 찾는
  `resolvePrRef()`(`server/worker/pr-poller.js`)와
  `targetBaseFor()`(`pr-actions.js`). 브랜치/워크트리 이름은 bead_id에서 순수
  유도, 자식 정리·bd close는 attempt 무관.
- attachment(`server/worker/attach.js`)는 서버 시작 시 설정된 모든
  워크스페이스에 eager 생성 — worker 모드 토글과 무관하므로 완화 불필요.
- 스냅샷 장식 지점: `decorateQueue()`(`server/ws/worker-handlers.js`)가 구독·
  fanout 양쪽에서 호출되며 store에 되쓰지 않는다.
- board는 이미 `metadata.pr_url`을 소비한다: `parsePrNumber()`·`mergeStage()`
  (`server/workflow-enrich.js`)가 `resolved`+`pr_url`을 "PR 열림·머지 대기"로
  취급.

## 사용자 결정

1. 외부 행 포함 기준: **`status=resolved` + `metadata.pr_url` 존재**.
2. GitHub에서 MERGED/CLOSED인 PR: **둘 다 표시 + 배지** — MERGED는 버튼이
   cleanup+bd close만 수행(라벨 `정리`), CLOSED(미머지)는 머지 비활성 +
   `닫힘` 배지.
3. 후처리 범위: worker PR과 **동일한 전체 초레오그래피**(deploy 포함).

## 설계

### 1. 외부 행 발견 (서버, 메모리 전용)

- worker 런타임에 워크스페이스별 외부 PR 레지스트리(메모리)를 둔다. 소스는
  `bd list --json` 스캔에서 `status=resolved` && `metadata.pr_url` 존재 필터.
  PR 번호는 `server/workflow-enrich.js`의 `parsePrNumber()` 재사용.
- 갱신 트리거: worker 큐 구독 시 1회 + pr-poller `tick()` 주기에 편승
  (구독자가 있을 때만). queue.json에는 아무것도 쓰지 않는다.
- pr-poller `tick()`은 store `pr_wait`와 외부 레지스트리의 합집합을 순회한다
  (현재는 raw store만 읽으므로 오버레이만으로는 외부 행이 gh 관측 대상에
  들어가지 않음). 빈 store `pr_wait` 조기 반환 조건도 합집합 기준으로 바꾼다.
- worker `q.pr_wait`에 이미 있는 bead_id는 오버레이에서 제외(worker 행 우선).

### 2. 스냅샷 오버레이

- `decorateQueue()`에서 레지스트리의 외부 행을 `pr_wait` 배열에
  `{ bead_id, added_at, external: true }`로 합성한 뒤 기존
  `prObservationsFor`/`prActivityFor`/`beadTitlesFor` 장식을 그대로 통과시킨다.
  관측·배지·타이틀 장식이 추가 코드 없이 적용된다.

### 3. PR ref·베이스 폴백

- `resolvePrRef()`: attempts 우선, 실패 시 bead `metadata.pr_url` →
  `parsePrNumber` 폴백. 외부 행에서 `pr_ref_unknown`이 사라진다.
- `targetBaseFor()`: attempts 우선, 외부 행은 gh 게이트가 주는 `baseRefName`,
  최종 폴백 `'main'`.
- 브랜치/워크트리 정리: 기존 `branchForBead(bead_id)` 유지(규약상 브랜치==bead
  ID). gh `headRefName`이 bead_id와 다르면 브랜치 삭제 대상은 `headRefName`을
  우선 사용. 없는 브랜치/워크트리는 기존처럼 무해한 no-op.

### 4. 머지 경로 가드

- `inPrWait` 가드: store `pr_wait` 멤버십 **또는** 클릭 시점 bd 재조회로
  `resolved`+`pr_url`을 재확인하면 통과. 외부 행은 queue revision CAS 대상이
  아니므로 이 재조회가 CAS 역할을 대신한다(불일치 시 `refused` 반환).
- attachment 없는 미설정 워크스페이스는 기존 `no_attachment` 거부 유지.
- MERGED → 기존대로 cleanup만 실행, CLOSED → 머지 거부 유지.

### 5. UI (프론트)

- 외부 행에 `세션` 배지(worker attempt 없이 세션이 배달한 PR 표시).
- MERGED 관측 시 버튼 라벨 `정리`, CLOSED(미머지)는 `닫힘` 배지 + 머지 비활성.
- 충돌 해소 버튼, base 배지, gate 활성화 등 나머지는 기존
  `prWaitRow()`(`app/views/worker/index.js`) 로직 그대로.

### 6. 에러 처리·엣지 케이스

- bead가 다른 경로로 closed되면 다음 스캔에서 행이 자연 소멸. cleanup의
  마지막 단계가 bd close이므로 머지 완료 행도 같은 방식으로 사라진다.
- 머지 클릭과 동시 close 레이스는 4의 재조회가 거부.
- `pr_url` 파싱 실패 행은 기존 `pr_ref_unknown` 표시로 fail-quiet
  (workflow 계약 소비자 원칙: 계약 키 부재/이상 시 표시 생략).

### 7. 테스트

- 오버레이 합성: 중복 제외(worker 행 우선)·`external: true` 플래그.
- `resolvePrRef` metadata 폴백, `targetBaseFor` 폴백 순서.
- 머지 가드: 외부 행 허용, 클릭 시점 재조회 거부 레이스.
- MERGED(cleanup-only)/CLOSED(거부) 분기.
- 프론트 `prWaitRow`: `세션` 배지, MERGED `정리` 라벨, CLOSED 비활성.
- 기존 `test/` 하위 패턴 준수.

## 범위 밖

- Board 카드/detail panel의 머지 버튼(레인으로 일원화).
- worker attempt 기반 기존 pr_wait 동작 변경.
- queue.json 스키마 변경(영속화 없음).
- workflow 계약 표면 변경 없음 — `pr_url`/`resolved`는 이미 소비 중인 계약
  키이며, "beads-ui human merge click"은 dotfiles `docs/contracts/workflow.md`가
  이미 정식 머지 경로로 명시.
