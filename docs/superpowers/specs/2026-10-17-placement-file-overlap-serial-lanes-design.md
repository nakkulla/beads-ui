---
scope:
  - server/placement/
  - app/utils/placement/
  - app/utils/scope-overlap.js
  - app/views/worker/placement.js
  - server/ws/worker-handlers.js
---

# 배치 추천: 같은 파일은 직렬로, 필요하면 직렬 레인을 늘려 적용 (UI-lsr4)

## 1. 목표

UI-i7k9 배포 뒤 [전체 배치안]이 거의 모든 후보를 병렬로 낸다. 새 질문 버전(`019d23f3b282`)으로 판정한
72쌍 중 71쌍이 `independent`였고, 나머지 1쌍은 확신도 0.3의 `conflict`, `a_first`/`b_first`는 0건이다.
사용자 판단(2026-10-17): 직렬은 기다리는 시간만 잃지만 충돌 해소 세션은 세션 하나와 재작성 위험을 쓴다.
그래서 같은 파일을 고치는 쌍은 직렬이 기본이고, 겹치지 않는 것만 병렬이어야 한다. 다만 `tests` 같은
폴더 하나가 겹친다고 모든 쌍을 한 레인에 몰던 UI-izba 규칙으로 돌아가지는 않는다.

이 설계는 세 가지를 바꾼다.

1. 두 이슈가 같은 파일을 선언하면 jev에 묻지 않고 고정 부딪힘(직렬)으로 정한다. 폴더만 겹치는 쌍은
   jev에 묻는다. jev의 `conflict` 기준은 "같은 파일을 함께 고친다"로 되돌린다. 병렬은 jev가 0.9 이상의
   `independent`를 낼 때만이다.
2. 서로 무관한 직렬 묶음이 남의 줄 뒤에 서지 않도록, 기존 직렬 레인이 모두 차 있으면 새 레인(상한 5)을
   추천한다. [적용]·[전체 적용]은 레인 수를 먼저 늘린 뒤 넣는다.
3. 병렬 행의 `— X 뒤` 문구를 없앤다. 이 문구가 순서 의존으로 읽혔다. 근거 접기 요약은 판정한 쌍 전체를 센다.

비목표: 스케줄러가 실행 시점에 부딪힘 상대를 기다리는 기능(UI-i7k9에서 비채택, 그대로). 빈 레인을 자동으로
줄이는 기능. 선언 scope 작성 규칙(dotfiles `description_scope`·`artifact_scope` 계약) 변경. 모니터 탭(추천
배치 없음, parity §9 행 그대로).

## 2. 검증된 전제

- 고정 조건은 직접 `blocks` 하나다 — `server/placement/relations.js:59`
- 선언 scope 겹침은 jev 쌍에 `overlap`으로 실리기만 하고 관계를 정하지 않는다 — `server/placement/relations.js:149`, `server/placement/relations.js:150`
- jev 답은 확신도 0.8(`ADOPT_CONFIDENCE`) 이상일 때만 채택되고, 그 아래는 `unknown`이다 — `server/placement/relations.js:159`, `server/placement/wire.js:106`
- scope 겹침은 경로 마디 경계의 접두 비교이고, 겹침 접두로 둘 중 긴 쪽을 낸다 — `app/utils/scope-overlap.js:29`, `app/utils/scope-overlap.js:45`
- 현재 질문 기준은 "해소 세션이 풀 수 있는 같은 파일 수정은 independent", "겹침만으로 conflict를 고르지 말라"다 — `server/placement/question.js:52`
- UI-i7k9 이전 기준은 "같은 파일 영역·공유 상태·계약 조항·배포 대상을 함께 바꾸면 conflict"였다 — `git show c64ca91f^:server/placement/question.js`
- 질문 버전은 질문 정의의 digest라 문구를 바꾸면 모든 쌍을 다시 묻는다 — `server/placement/question.js:72`
- 자리 계산의 제약은 `c_first`·`x_first`·`conflict`뿐이고 `unknown`은 제약이 아니다 — `app/utils/placement/compute.js:113`
- 제약 관계로 이어진 후보가 한 묶음이 된다 — `app/utils/placement/compute.js:422`
- K(묶음이 제약을 갖는 기존 항목)가 없으면 1개짜리 묶음은 병렬, 여러 개면 가장 빈 직렬 레인으로 간다. 그 레인이 이미 차 있어도 그렇다 — `app/utils/placement/compute.js:466`, `app/utils/placement/compute.js:567`
- 자리 계산은 `serial_lane_count`(최대 5)개의 레인만 본다 — `app/utils/placement/compute.js:198`
- 근거 줄은 제약 관계에 채택된 `independent` 대표 하나만 더한다 — `app/utils/placement/compute.js:679`, `app/utils/placement/compute.js:698`
- 위치 문구는 병렬·직렬 구분 없이 `— X 뒤`/`맨 앞`을 붙인다 — `app/views/worker/placement.js:404`
- 근거 접기 요약은 보이는 근거 줄만 센다 — `app/views/worker/placement.js:500`
- [전체 적용]은 행마다 남은 후보를 최신 스냅샷에서 다시 계산하고, 자리가 표와 같을 때만 보낸다 — `app/utils/placement/apply.js:169`
- 저장소는 `serial_lane_count` 밖 레인으로 넣는 요청을 거부한다 — `server/worker/queue-store.js:5658`
- 레인 수는 1~5이고, `setSerialLaneCount`는 CAS로 빈 레인을 뒤에 덧붙인다 — `server/worker/queue-store.js:2253`, `server/worker/queue-store.js:7755`
- 화면은 `worker-queue-set-serial-lane-count`에 `{ count, expected_revision }`을 보낸다 — `app/views/worker/index.js:1871`
- 점선 카드는 기존 레인 안에만 그려진다 — `app/views/worker/placement.js:651`
- 배치 판정의 선언 scope는 `bead_scope` 장식에서 온다 — `server/ws/worker-handlers.js:2003`
- 배치 서비스의 workspace 값은 저장소 루트 경로다 — `tail -1 ~/.local/state/bdui/placement-calls.jsonl`(`"workspace":"/Users/…/GitHub/dotfiles"`)
- 직렬 레인 점유는 attempt의 `serial_lane_id`로 정해지며 설정된 레인 수와 무관하다. 레인 수를 줄여도 대기 항목만 병렬로 돌아가고 점유는 남는다. 화면에 가는 `lane_states`는 설정된 레인만 싣는다 — `server/worker/scheduler.js:1181`, `server/worker/queue-store.js:7755`, `server/ws/worker-handlers.js:1667`
- 추천 버튼·전체 배치안·열린 추천은 `ready` 후보만 받고, `fixed_only`는 꺼진 버튼("고정 조건만 있음")이다 — `app/views/worker/placement.js:387`, `app/views/worker/placement.js:795`, `app/views/worker/placement.js:824`
- 모니터 탭에는 추천 배치가 없다 — `docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md:182`, `app/views/monitor/index.js:1694`
- 판정 분포(71/72 independent) — `~/.local/state/bdui/placement-pair-cache.json`을 question_version·choice로 집계

## 3. 설계

### 3.1 같은 파일 겹침은 고정 부딪힘

- 결정: 두 이슈의 선언 scope에 같은 **파일** 항목이 있으면(정규화 후 문자열이 같은 항목) 그 쌍은 고정
  `conflict`이고 jev에 묻지 않는다. wire는 `source: 'fixed'`, `basis: 'file'`, `overlap: [<같은 파일들>]`이다.
  `blocks`가 있는 쌍은 지금처럼 `blocks`가 정한다(먼저 본다).
- 결정: 한쪽이 폴더를 적고 다른 쪽이 그 안의 파일을 적은 쌍, 또는 둘 다 같은 폴더를 적은 쌍은 폴더 겹침이다.
  고정이 아니고 jev에 묻는다(3.2).
- 결정: 항목이 파일인지 폴더인지는 서버가 정한다. `/`로 끝나는 항목은 폴더다. 그 밖의 항목은 저장소 루트에서
  실제로 폴더이면 폴더이고, 파일이거나 아직 없으면 파일이다(새로 만들 파일을 둘 다 적었다면 같은 파일이다).
  stat 실패는 "없음"과 같다. 관계 계산(`relations.js`)은 계속 I/O 없는 순수 함수이고, 호출부가 폴더 판정을 넘긴다.
- 같은 spec·plan 출처 쌍도 예외로 두지 않는다. 같은 파일을 고친다면 직렬이 맞다.
- 이렇게 정해진 쌍은 jev 대상(`jev_pairs`)과 진행 막대 `total`에 들지 않는다. 모든 쌍이 고정이면 상태는 `fixed_only`다.
- 결정: 추천할 수 있는 후보 상태는 `ready`와 `fixed_only`다. 후보 카드의 [추천 배치] 버튼, [전체 배치안]의
  체크·포함, 열린 추천이 모두 그렇다. 같은 파일 고정 관계만 있는 두 후보도 jev 호출 없이 직렬 추천·적용된다.
  `fixed_only`의 꺼진 버튼 문구("고정 조건만 있음")는 없어진다.

### 3.2 폴더 겹침과 jev 기준

- 결정: jev 질문의 뜻을 UI-i7k9 이전 기준으로 되돌린다. 해소 세션 전제와 "겹침만으로 conflict를 고르지
  말라"는 문구는 지운다. 문구는 구현이 다듬되 뜻은 다음과 같다.
  - `independent`: 동시에 구현·머지해도 서로의 전제를 바꾸지 않고, 같은 파일·공유 상태·계약 조항·배포
    대상을 함께 고치지 않는다.
  - `a_first`·`b_first`: 지금과 같다.
  - `conflict`: 서로의 결과를 전제하지는 않지만 같은 파일·공유 상태·계약 조항·배포 대상을 함께 고친다.
  - 겹침 줄은 "선언 scope가 이 경로에서 겹친다"는 재료다. 폴더만 겹친다고 같은 파일을 고친다는 뜻은
    아니라고 질문이 말한다.
- 결정: 선언 scope가 겹치는(폴더 겹침) 쌍은 jev가 `independent`를 0.9(새 상수, 예: `OVERLAP_INDEPENDENT_CONFIDENCE`)
  이상으로 낼 때만 `independent`다. 선후·부딪힘은 지금처럼 0.8 이상에서 채택한다. 그 밖(낮은 확신의
  `independent`, 0.8 미만의 다른 답)은 `conflict`로 정한다. 이 관계는 `source: 'jev'`, `overlap`을 싣고
  `overlap_guard: true`로 표시해 화면이 이유를 말하게 한다.
- 겹치지 않는 쌍은 지금 규칙 그대로다(0.8 미만은 `unknown`, 제약 아님).
- 질문 버전이 바뀌므로 배포 뒤 모든 쌍을 한 번 다시 묻는다(UI-i7k9 §3.3의 추정 그대로, 약 1분).

### 3.3 새 직렬 레인 추천

- 결정: 자리 계산이 "가장 빈 직렬 레인"을 고를 때(K 없는 여러 개 묶음, 그리고 K가 직렬 레인을 덮지 못한 여러
  개 묶음) 고르는 범위를 설정된 레인에서 `s1`~`s5` 전체로 넓힌다. 레인의 짐은 대기 항목 수와 점유자 수의 합이고,
  설정 수 밖 레인은 대기 항목이 없으므로 숨은 점유자 수만 짐이다. 짐이 가장 적은 레인을 고르고, 같으면 낮은 번호가
  먼저다. 그래서 빈 기존 레인이 있으면 그 레인이 먼저이고, 기존 레인이 모두 차 있으면 점유 없는 설정 수 밖 레인
  (새 레인)이 되며, 다섯 개가 모두 차 있으면 가장 빈 레인이다.
- 결정: 서버의 `lane_states`는 설정 수 밖 레인의 점유도 싣는다(예: `hidden: true`와 `occupied_by`만). 레인 수를
  줄인 뒤에도 그 레인에서 돌던 작업이 점유를 유지하기 때문이다. 자리 계산은 이 숨은 점유를 새 레인 선택에만 쓰고,
  [↴ 대기로] 메뉴와 레인 그리기(Worker 탭·모니터 탭)는 숨은 레인을 무시하고 지금처럼 설정된 레인만 본다.
- 계획은 필요한 레인 수(예: `lane_count`)를 함께 낸다. 쓰는 가장 높은 레인 번호와 지금 수 중 큰 값이다.
- 불변식: 레인 수를 `lane_count`로 늘린 스냅샷에서 다시 계산하면 같은 자리가 나온다. 늘리기는 설정 수 밖 레인에
  빈 대기열만 붙이고 점유는 바꾸지 않으므로, `s1`~`s5` 각 레인의 짐이 늘리기 전후로 같고 고르는 규칙도 같기 때문이다.
  이 불변식이 [전체 적용]의 행별 재계산 비교를 그대로 쓸 수 있게 한다.
- 결정: [적용](후보 하나)과 [전체 적용] 모두, 보낼 자리가 지금 레인 수 밖이면 먼저
  `worker-queue-set-serial-lane-count { count: lane_count, expected_revision }`를 보낸다. 충돌이 나면 응답
  스냅샷으로 다시 계산한다. 여전히 같은 레인 수가 필요하고 보여 준 자리가 같으면 한 번 다시 보내고, 아니면
  `moved`로 멈춘다. 거부되면 아무것도 넣지 않고 멈추며 알림은 "직렬 레인을 늘리지 못했습니다"다. 늘리기가
  성공해도 응답 스냅샷으로 다시 계산해, 보낼 자리가 보여 준 자리(`samePlace`)와 같을 때만 넣는다. 다르면
  `moved`로 멈춘다([전체 적용]은 행별 비교가 이미 이 일을 하고, [적용]도 같은 비교를 한다).
- 결정: 새 레인의 점선 카드는 그리지 않는다. 아직 없는 레인이기 때문이다. 표의 위치 문구는 `직렬 3(새 레인) · #1 — 맨 앞`이고,
  표 아래 알림 줄은 "적용하면 직렬 레인을 2개에서 3개로 늘립니다"다.

### 3.4 위치 문구와 근거 요약

- 결정: 병렬 행의 위치 문구는 `병렬 · 대기 #2`처럼 순번만 쓴다. `— X 뒤`·`맨 앞`은 직렬 레인에서만 쓴다.
  직렬은 앞 항목이 끝나야 시작하므로 이 말에 실제 뜻이 있다.
- 결정: 근거 접기 요약은 그 후보가 비교된 쌍 전체를 센다. 형식은 `판정 5쌍 · 독립 5`,
  `판정 6쌍 · 부딪힘 2 · 선후 1 · 독립 2 · 모름 1`이고, 바깥(`outside`) 줄은 지금처럼 부딪힘에 센다. 펼친 줄은
  지금처럼 제약과 대표 독립 하나다. 다른 독립이 더 있으면 `그 밖 독립 4쌍` 한 줄을 붙인다.
- 근거 줄 출처 문구: 고정 같은 파일은 `고정(같은 파일: a.js, b.js)`, 겹침 보호로 정해진 부딪힘은
  `jev 독립 0.85 < 0.9 (겹침: tests)`처럼 미달을 말한다. 나머지는 지금 그대로다.

### 3.5 오류와 경계

- 폴더 판정 stat이 모두 실패해도(예: 루트 없음) 항목은 파일로 보므로, 같은 문자열 항목만 고정이 된다. 잘못
  고정될 수 있는 경우는 둘이 같은 폴더를 `/` 없이 적었는데 그 폴더가 없는 때뿐이다.
- jev 답이 아직 없거나 실패한 폴더 겹침 쌍은 지금 상태 규칙(`pending`·`unavailable`) 그대로이고, 수동 배치는 늘 쓸 수 있다.
- 수동 [↴ 대기로] 메뉴, 모니터 탭, 스케줄러, 큐 저장 형식은 바꾸지 않는다. 숨은 레인을 무시하는 것(3.3)만
  예외다.

## 4. 수용 기준

1. 같은 파일을 선언한 두 이슈(blocks 없음)는 고정 `conflict`(`basis: 'file'`)이고 `jev_pairs`에 들지 않는다.
2. 같은 폴더(존재하는 폴더, `/` 유무 무관)만 겹치는 쌍은 jev 대상이고 `overlap`을 싣는다.
3. 폴더 겹침 쌍에서 jev `independent` 0.85는 `conflict`(`overlap_guard`)이고, 0.95는 `independent`다. 겹치지 않는
   쌍의 `independent` 0.85는 `independent`다.
4. 질문 정의가 3.2의 뜻을 담고 질문 버전이 `019d23f3b282`와 다르다.
5. 직렬 레인 2개가 모두 차 있을 때 K 없는 2개짜리 묶음은 `s3`에 들어가고 계획의 레인 수는 3이다. 빈 `s2`가
   있으면 `s2`에 들어간다. 레인 5개가 모두 차 있으면 가장 빈 레인이다.
6. 레인 수를 늘린 스냅샷에서 다시 계산한 계획은 늘리기 전 계획과 모든 후보의 자리(`samePlace`)가 같다. 레인
   3개에서 2개로 줄였는데 `s3`에 실행 중 점유가 남은 경우에도 새 레인은 `s4`이고 레인 수는 4다.
7. [전체 적용]·[적용]은 새 레인이 필요할 때 레인 수 변경을 먼저 보내고, 거부되면 넣기를 보내지 않는다. 늘린 뒤
   자리가 달라지면 넣지 않고 멈춘다.
8. 같은 파일 고정 관계만 있는 두 후보(`fixed_only`)는 [추천 배치]와 [전체 배치안]에서 jev 호출 없이 같은 직렬
   레인에 추천되고 적용된다.
9. 병렬 행 위치 문구에 `뒤`·`맨 앞`이 없고, 직렬 행에는 있다. 근거 요약이 비교된 쌍 전체를 센다.
10. 배포 뒤 공유 서버 dotfiles Worker 탭 [전체 배치안]을 390px로 캡처한다. 재판정이 끝난 뒤 같은 파일을
   선언한 후보 쌍이 같은 직렬 레인에 있고, 병렬 행 문구에 `뒤`가 없는지 확인한다.

## 5. 테스트

- `server/placement/relations.test.js`: "fixes a same-file pair as a conflict without asking jev", "asks jev about a
  directory-only overlap", "turns a low-confidence independent on an overlapping pair into a conflict", "keeps a
  low-confidence answer on a disjoint pair unknown".
- 폴더 판정(호출부): "treats a trailing-slash item as a directory", "treats a missing path as a file".
- `server/placement/question.cross-runtime.test.js`는 그대로 통과(모델·엔드포인트·시간 제한 불변).
- `app/utils/placement/compute.test.js`: "opens a new serial lane when every lane is occupied", "prefers an empty
  existing lane over a new one", "stays within five lanes", "reproduces every place after the lane count grows",
  "skips a hidden occupied lane when opening a new one".
- 서버 `lane_states`: "ships the occupancy of a lane beyond the configured count as hidden".
- `app/utils/placement/apply.test.js`: "grows the serial lane count before the first place", "stops without a place
  when growing is refused", "stops a single apply when the place moved after growing".
- `app/views/worker/placement-preview.test.js`: "shows only the order on a parallel row", "counts every compared pair
  in the reason summary", "names the same file on a fixed reason line", "recommends two fixed-only same-file
  candidates into one serial lane".
- 전체 검증 bundle: `npm run tsc`, `npm run lint`, `npx prettier --check`, `npx vitest run --reporter=dot`.

## 6. 결정 (ADR 후보)

- 전제: ADR UI-i7k9 — 배치 추천의 서버 쌍 판정·화면 자리 계산·사람의 [적용]만 쓰는 구조, 질문 정의 위치,
  세션 레인 조항을 따른다.
- 같은 파일 선언은 고정 부딪힘, 폴더 겹침은 jev 0.9 이상 `independent`일 때만 병렬, jev 충돌 기준을 "같은 파일
  등을 함께 고침"으로 되돌림, 기존 직렬 레인이 모두 차 있으면 새 레인(상한 5)을 추천하고 적용 때 레인 수를 먼저
  늘림. (1) 되돌리기 어려움: 질문 버전이 바뀌어 쌍 캐시 전체가 다시 채워지고,
  `server/placement/relations.js`·`question.js`·`wire.js`의 `basis`·`overlap_guard` 뜻, `app/utils/placement/compute.js`의
  레인 선택과 `apply.js`의 전송 순서, 화면 문구(`app/views/worker/placement.js`)가 함께 움직인다. (2) 맥락 없이
  의외: 하루 전 ADR이 병렬을 기본으로 만들었는데, 배치 추천이 큐 설정인 레인 수를 스스로 늘린다. (3) 실제
  트레이드오프: 해소 세션 비용·재작성 위험 대 직렬 대기 시간, 레인 수 증가 대 남의 줄 뒤 대기. 통합: 같은
  소비자를 다스리는 현재 ADR은 UI-i7k9 하나다. 그 "고정 조건(blocks)"·"jev 충돌은 해소 세션으로도 풀기 어려운
  겹침에만" 조항을 이 결정이 바꾸고 나머지 조항은 그대로 다시 적는다. `summary`: "Worker 대기열 배치 추천은 서버가 jev 쌍 판정(두 이슈 재료 digest로 캐시, 선언 scope 겹침은 질문 재료로 싣는다)과 고정 조건(blocks, 두 이슈가 같은 파일을 선언한 겹침)으로 쌍 관계를 만들고, jev의 충돌은 같은 파일·공유 상태·계약 조항·배포 대상을 함께 고치는 쌍에 내며 폴더만 겹치는 쌍은 jev가 0.9 이상 독립이라 할 때만 병렬로 두고, 화면이 현재 큐·후보 순서로 자리를 계산해 Worker 탭 후보 카드의 별도 [추천 배치] 버튼을 누를 때 점선 미리보기로 보이고([↴ 대기로] 수동 메뉴는 그대로) 레인에는 사람의 [적용]·[전체 적용]만 쓰며, 기존 직렬 레인이 모두 차 있으면 새 직렬 레인(상한 5)을 추천해 적용 때 레인 수를 먼저 늘린다; 큐 변화는 jev를 부르지 않고 추천은 blocks 의존을 쓰지 않으며 질문 정의는 beads-ui 서버에 둔다; 배포·빌드 조항은 UI-u6ud-5에서 승계한 그대로다; worker-ineligible과 exec_lane=session인 session-preferred 이슈는 Worker 대기열에서 세션 레인으로 실행된다 — 같은 admission·공유 슬롯·직렬 레인을 거쳐 Worker attempt로 기록되고(fast_track·worker 출처) headless와 같은 계정·가드 훅 env로 Worker 표지 없이 session-hub 대화형 창으로 열리며, 생존은 isDeadAttempt가 마커 pane 관측으로 판정하고(관측 실패는 생존) 결과는 종단 결과 줄로 headless와 같은 판정을 탄다; 결과 줄 없는 창 소멸은 클릭 전용 session_exited 실패이고 재개는 세션 레인 attempt의 ↻ 이어하기이며 일시정지는 없다; UI-lbm5가 UI-1eag에서 승계한 나머지 조항은 그대로다" → ADR, supersede UI-i7k9
- 병렬 행 위치 문구를 순번만으로 바꾸고 근거 요약이 비교된 쌍 전체를 센다 — 되돌리기 쉬운 화면 문구 → ADR 아님
- 빈 레인을 자동으로 줄이지 않는다 — 지금 동작을 바꾸지 않는 비채택 → ADR 아님
