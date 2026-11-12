---
scope:
  - server/worker/queue-store.js
  - server/worker/queue-place.js
  - server/worker/queue-place-bundle.js
  - server/worker/queue-remove.js
  - server/worker/scheduler.js
  - server/ws/worker-handlers.js
  - server/routes/worker-queue.js
---

# 대기 자리 조작의 버전 확인을 배치 지문으로 판정한다 (UI-cbc7)

## 1. 목표

대기열에 넣기·빼기·순서 바꾸기 요청은 "내가 본 대기열 버전"(`expected_revision`)을 함께
보내고, 지금은 그 번호가 현재 번호와 정확히 같아야만 받아들여진다. 대기열 버전은 어떤 쓰기든
하나만 올라가므로, 배치 판단과 무관한 쓰기(세션 생존 시각, attempt 진행 기록 등)만 있었어도
요청이 거절된다. 2026-11-12 Cortex 세션의 레인 배치가 이렇게 두 번 연속 거절돼 보류로
떨어졌다.

이 스펙이 끝나면:

- 대기 자리 조작은 판단의 전제(대기 줄·레인 구성·실행 중 작업의 자리)가 바뀌었을 때만
  거절된다. 무관한 쓰기만 있었다면 낡은 번호로도 받아들여진다.
- 요청·응답 모양은 그대로다. 웹 화면, 모니터, REST로 배치하는 에이전트, dotfiles 절차는
  바꾸지 않는다.
- 아무도 읽지 않는 세션 생존 시각을 점검 때마다 쓰는 일이 없어져, 버전이 오르는 일과
  화면 갱신 소음이 함께 줄어든다.

## 2. 검증된 전제

기준: `origin/main` `f21b237dda50730b582fc520f4bba6d6a3c19b6a`.

- CAS 쓰기는 `expected_revision !== cur.revision`이면 `conflict:true`로 거절하고, 성공하면 revision을 1 올린다 — server/worker/queue-store.js:7663-7677
- 스케줄러 쓰기는 CAS 없이 같은 revision을 1 올린다; revision을 올리는 곳은 이 두 함수뿐이다 — server/worker/queue-store.js:7689-7700, `grep -n '\.revision = ' server/worker/queue-store.js` 결과 7672·7695 두 줄
- 대화형 세션 관측 패스는 살아 있는 세션마다 매번 `last_seen_alive_at: now()`를 쓰고 변경 통지를 낸다 — server/worker/scheduler.js:13551-13559, :12881-12889
- `last_seen_alive_at`를 읽는 운영 코드는 없다(쓰기와 정규화만 있고 나머지는 테스트) — `grep -rn 'last_seen_alive_at' --include='*.js' server app` 결과: queue-store.js:560·4040, 쓰기 5곳, 그 밖은 `*.test.js`
- 실측: Cortex 큐 rev 9724→9726 사이 디스크 `queue.json`에서 바뀐 필드는 `interactive_sessions/Cortex-dpvu:resolve/last_seen_alive_at` 하나였고, rev 9723→9724 사이 `GET /api/worker/queue` 응답은 `revision` 말고 같았다 — 2026-11-12 15:54 두 스냅숏 diff
- 대기 자리를 바꾸는 store 조작은 모두 `applyMutation` CAS를 쓴다: `place` :8332, `reorder` :8371, `setSerialLaneCount` :8402, `placeSerialGroup` :8508, `placeBundle` :8594, `remove` :9905 — server/worker/queue-store.js
- place-bundle은 store CAS 전에 revision을 따로 확인하고, 비동기 admission 뒤 같은 `expected_revision`으로 store CAS를 한다 — server/worker/queue-place-bundle.js:162-164, :191-197
- place-plan도 store 쓰기 전에 revision을 따로 확인한다 — server/worker/queue-place.js:260
- REST `place`·`place-bundle`·`remove`는 `expected_revision`을 필수 정수로 받는다 — server/routes/worker-queue.js:232, :300, :361
- 웹 배치 전송은 conflict 뒤 다시 계산해서, 묶음이 같으면 최대 5회까지 다시 보낸다 — app/utils/placement/apply.js:21, :307-327
- dotfiles 에이전트 절차는 conflict 뒤 판단을 1단계부터 다시 하고 한 번만 다시 시도한다 — dotfiles src/shared/skills/flow/workflow/references/execution-worker-lane.md:149-152, :203-206
- 자리 판정이 읽는 attempt 필드: `status`·`resumed_from`·`attempt_id`·`bead_id`·`kind`·`completion_root_id`·삽입 순서·`withdrawn` — server/worker/queue-store.js:2407-2424, :2448-2460, :2469-2475, app/utils/active-attempts.js:35-41, :50-60
- 배치 계산이 읽는 큐 필드: `queue`·`serial_lanes`·`serial_lane_count`·`done`·`pr_wait`·`merge_shelved`·`discard_operations`·`attempts`(`bead_id`·`status`·`serial_lane_id`·`resumed_from`·`started_at`·`finished_at`) — `grep -on 'queue\.[a-z_]\+\|attempt\.[a-z_]\+\|entry\.[a-z_]\+' app/utils/placement/*.js` 집계
- 진행 중 폐기는 `phase`가 종단 단계가 아닌 작업이다 — server/worker/discard-phase.js:8-16

## 3. 설계

### 3.1 배치 지문

배치 지문은 대기열 스냅숏에서 대기 자리 판단이 기대는 부분만 모은 결정적 요약이다. 같은
지문이면 그 판단의 전제가 같다.

결정: 지문에 들어가는 것은 아래뿐이다.

1. 병렬 대기 줄(`queue`)의 행 순서와 각 행의 `bead_id`·`serial_lane_id`·`external`.
2. `serial_lane_count`, 그리고 직렬 레인마다 `id`와 행 순서(`bead_id`).
3. `done` 행의 `bead_id`(배치는 `done` 행을 새로 넣는 것으로 센다).
4. `pr_wait` 행의 순서와 각 행의 `bead_id`·`serial_lane_id`, `merge_shelved`의 키 집합.
5. `attempts`의 삽입 순서와 각 attempt의 `attempt_id`·`bead_id`·`kind`·`status`·
   `serial_lane_id`·`resumed_from`·`completion_root_id`·`started_at`·`finished_at`·
   `withdrawn` 유무.
6. 진행 중인 폐기 작업의 `bead_id` 집합.

그 밖의 필드(대화형 세션, attempt의 세션·사용량·진행 기록, 공급자 보류, 설정, 위에 없는
시각)는 지문에 넣지 않는다. 예: 위 항목을 고정된 키 순서의 JSON 문자열로 만들고, 그
문자열이나 해시를 지문으로 쓴다.

새 필드가 자리 판단에 쓰이기 시작하면 그 필드를 지문에 넣는 일은 그 변경의 몫이다.
§5의 지문 테스트가 들어간 항목과 빠진 항목을 고정해 두므로, 넣지 않으면 리뷰에서 드러난다.

### 3.2 최근 지문 기억과 판정

- store는 revision을 올리는 두 쓰기(§2) 직후, 그리고 워크스페이스를 처음 읽을 때, 그
  revision의 지문을 워크스페이스별 메모리에 적는다.
- 결정: 워크스페이스마다 가장 최근 1024개 revision의 지문만 둔다. 디스크에는 쓰지 않는다 —
  서버 재시작 직후에는 재시작 뒤 revision만 알고, 그보다 오래된 번호는 지금처럼 거절된다.
- 판정(예: `placementRevisionMatches(workspace, expected_revision)`):
  - `expected_revision === 현재 revision`이면 통과(지금과 같다).
  - `expected_revision`의 지문이 기억에 있고 현재 지문과 같으면 통과.
  - 그 밖(기억에 없음, 현재보다 큰 번호, 정수가 아님, 지문이 다름)은 `conflict:true`.
- 지문이 한 번 바뀌었다가 원래대로 돌아온 경우(A→B→A)도 통과한다. 전제가 지금과 같기
  때문이다.

### 3.3 적용 조작

결정: 위 판정은 대기 자리를 바꾸는 조작에만 쓴다 — `place`, `reorder`, `setSerialLaneCount`,
`placeSerialGroup`, `placeBundle`, `remove`. WS·REST·서버 안 호출자 모두 같은 store 조작을
거치므로 진입점이 어디든 같이 적용된다.

- 그 밖의 CAS 조작(자동 진행 켜기·끄기, 슬롯 수, 머지 큐, 한도 정책, 실행 기본값 등)은 지금처럼
  정확한 revision을 요구한다. 이들의 전제는 지문에 없는 필드라서, 느슨하게 하면 낡은 화면이
  더 새 설정을 덮어쓸 수 있기 때문이다.
- 조작 자체가 하는 현재 상태 재검사(레인 점유, 실행 중, 폐기 중 등)는 그대로 둔다. 판정이
  통과해도 쓰기는 언제나 현재 상태 위에서 한다.
- 통과한 쓰기의 결과 revision은 지금처럼 현재 revision + 1이다.

### 3.4 서버 안 사전 확인과 admission 창

- place-bundle(queue-place-bundle.js:162-164)과 place-plan(queue-place.js:260)의 사전
  확인은 §3.2 판정을 쓴다. 지금처럼 정확한 번호를 요구하면 판정을 느슨하게 한 효과가
  사라진다.
- place-bundle과 place의 store 쓰기는 비동기 admission이 끝난 뒤에 처음 받은
  `expected_revision`으로 판정한다. admission 동안 무관한 쓰기만 있었다면 통과한다. 따로
  다시 읽은 revision으로 바꾸지 않는다 — 그렇게 하면 요청자가 본 전제가 아니라 서버가 나중에
  본 상태를 확인하게 된다.

### 3.5 세션 생존 시각 기록 정리

- 결정: 대화형 세션 관측 패스(scheduler.js:13551)는 `last_seen_alive_at`를 더 이상 쓰지
  않는다. `turn_state`·`turn_state_since`·마지막 메시지가 바뀔 때만 쓰고, 바뀐 것이 없으면
  쓰기와 변경 통지를 모두 하지 않는다.
- 세션을 시작할 때 쓰는 `last_seen_alive_at`(direction-inquiry.js:686, resolve-session.js:1021,
  external-wait/session-resume.js:319, session-inquiry/service.js:223)와 필드 정규화는
  그대로 둔다. 필드를 없애는 이관은 하지 않는다.

### 3.6 바꾸지 않는 것

- 결정: 요청·응답 모양은 바꾸지 않는다 — 웹 화면, 모니터, REST 에이전트, dotfiles 절차가
  모두 지금 형태로 계속 동작해야 한다. conflict 응답은 지금처럼 현재 큐를 싣는다.
- revision 번호는 지금처럼 모든 쓰기마다 오른다. 구독 갱신과 순서 판단은 revision을
  그대로 쓴다.
- 배치 판단(어느 레인 몇 번째, 묶을 상대)은 계속 요청하는 쪽이 한다. 서버는 다시 판단하지
  않는다.

## 4. 오류·경계 처리

- 기억에 없는 번호(재시작 직후, 1024개보다 오래됨)는 지금처럼 conflict다. 요청자의 다시 시도
  규칙이 그대로 처리한다.
- 지문을 만들다 예외가 나면 그 revision의 지문은 적지 않는다. 그러면 그 번호는 정확히
  같을 때만 통과한다(엄격한 쪽으로 실패).
- 판정은 store 쓰기와 같은 동기 구간에서 한다. 판정과 쓰기 사이에 다른 쓰기가 끼지 않는다.

## 5. 테스트

새 테스트(이름은 예시):

- 지문: 3.1의 1~6 항목 각각을 바꾸면 지문이 달라진다; `interactive_sessions`, attempt의
  사용량·세션 필드, `provider_hold`, 슬롯 수를 바꾸면 지문이 같다.
- 판정: 정확히 같은 번호 통과; 무관한 스케줄러 쓰기 뒤 낡은 번호 통과; 대기 줄이 바뀐 뒤
  낡은 번호 거절; 1024개를 넘어 밀려난 번호 거절; 현재보다 큰 번호 거절; A→B→A 통과.
- 조작별: `place`·`placeBundle`·`remove`·`reorder`가 무관한 쓰기 뒤 낡은 번호로 적용된다;
  `toggleAutoAdvance`·`setSlots`는 같은 상황에서 conflict다.
- place-bundle: admission을 기다리는 동안 무관한 쓰기가 일어나도 적용된다; 그 동안 같은 레인에
  다른 행이 들어오면 conflict다.
- REST: `/api/worker/queue/place-bundle`이 무관한 쓰기 뒤 낡은 `expected_revision`으로
  `applied:true`를 돌려준다.
- 스케줄러: 살아 있는 세션에 바뀐 것이 없으면 관측 패스가 큐를 쓰지 않고 revision도 그대로다.

기존 테스트 중 관측 패스마다 `last_seen_alive_at`가 갱신되기를 기대하는 것
(scheduler.test.js:261 등)은 §3.5의 의도된 동작 변경이라 새 동작에 맞춘다.

## 6. 수용 기준

1. 대화형 세션이 열려 있고 대기 자리가 그대로인 Cortex 같은 저장소에서, 에이전트가 GET으로
   본 revision으로 1분 뒤 보낸 place-bundle이 `applied:true`다.
2. 대기 줄이나 대상 레인이 그 사이 바뀌었으면 지금처럼 `conflict:true`다.
3. 범위 밖 CAS 조작은 지금과 같이 동작한다.
4. 사전 검증 묶음(`npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`)이 통과한다.
5. 배포 뒤 Cortex 큐를 1분간 관측했을 때, 대화형 세션만 열려 있으면 revision이 오르지 않는다.

## 결정 (ADR 후보)

- 대기 자리 조작의 CAS를 최근 revision의 배치 지문 동등으로 판정한다 — 되돌리기 쉽다: 서버 store 한 곳만 바뀌고 요청·응답 모양과 소비자(웹 화면·모니터·REST 에이전트·dotfiles 절차)는 움직이지 않아 코드 되돌림으로 끝난다 → ADR 아님
- 대화형 세션 관측 패스의 생존 시각 쓰기 제거 — 읽는 곳 없는 국소 구현 정리(기본 제외 목록: 국소 구현 세부) → ADR 아님
