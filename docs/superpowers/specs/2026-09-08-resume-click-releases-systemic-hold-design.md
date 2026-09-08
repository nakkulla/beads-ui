---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - app/views/worker/index.js
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# ↻ 이어하기가 체계적 정지(systemic hold)의 재개를 포함한다

- Bead: UI-hhju
- 작성일: 2026-09-08
- 상태: 작성안 — 구현 전 문구 확인 대상
- 경로: spec_backed, 한 저장소·한 구현 단위

## 1. 목표와 승인된 방향

큐를 세운 실패 attempt를 사람이 ↻ 이어하기로 다시 띄우면, 그 클릭이 상단
"체계적 정지" 배너의 `재개`까지 포함한다. 같은 실패를 두고 같은 결정("봤다,
계속해라")을 두 번 클릭하지 않는다. 배너와 `재개` 버튼은 없애지 않는다 — §3.1의
해제 조건이 충족되지 않는 동안(큐를 세운 attempt를 아무도 이어하지 않았거나, base
이동·gh 미인증처럼 이어할 attempt가 원인이 아닌 정지)의 유일한 큐 정지 표시이자
출구다.

2026-09-08 대화에서 사용자가 결정한 것:

- 해제 단위는 **큐를 세운 attempt와 그 자손**이다. 사람이 개시한 ↻이고, 이어하는
  attempt가 `hold.halted_by_attempt_id`이거나 거기서 `resumed_from` 계보로 이어진
  자손일 때만 hold를 푼다. 자동 재개(`provider_auto_resume`)는 어느 경우에도 풀지
  않는다.
- hold에 같이 묶인 다른 bead는 **`재개` 버튼과 동일하게** 재디스패치한다.
- 이번 정지의 원인인 가드 오탐(읽기 전용 `git diff`에 붙은 `-c core.hooksPath`까지
  kill)은 이 Bead 범위 밖이며 다른 세션이 처리한다.

## 2. 확인한 원인과 계약 소유권

실측(2026-09-08, dotfiles 워크스페이스 `queue.json`):

- attempt `dotfiles-muao-1788857704669-1`이 17:55 디스패치, 18:06 가드 kill
  (`loud_fail_blocker` / `hook_bypass_blocked`, 명령
  `git -c core.hooksPath=/dev/null diff --stat generated/`). `failure-class.js`는
  이 사유를 `systemic`으로 분류하고 큐는 `hold={kind:'systemic', cause:
  'loud_fail_blocker', bead_ids:['dotfiles-muao'], halted_by_attempt_id: <위 ID>}`가
  됐다.
- 18:35 사용자가 실패 타일의 ↻으로 자식 attempt `…-1788860110408-2`
  (`resumed_from` = 위 ID)를 띄워 실행 중이다. hold는 그대로다.

코드상 두 상태 기계는 서로를 모른다:

- `scheduler.js resume()`은 큐 hold를 읽거나 쓰지 않는다. 자식 attempt 성공 여부와
  무관하게 hold는 남는다.
- `queue-hold.js reduceRetrySucceeded`는 env hold만 풀고 systemic은 건드리지
  않는다. systemic을 지우는 유일한 이벤트는 `resume`이고, 그 발신자는
  `scheduler.js resumeQueueHold` (ws `worker-queue-hold-resume`, `재개` 버튼)뿐이다.
- `hold !== null`인 동안 `runPass`는 armed 행만 디스패치하므로, 배너는 장식이 아니라
  다른 bead의 자동 진행이 실제로 막혀 있다는 표시다.

계약 소유권: 큐 정지 의미는 UI-5ym8 스펙
`2026-08-28-worker-failure-tiers-queue-hold-design.md` §3.4·§4·§8과 ADR 0016이
소유한다. ADR 0016 결정문의 "해제는 사용자 `재개`뿐이다" 조항이 이 설계로 뒤집히므로
승계(supersede)가 필요하다. 이 저장소 밖의 dotfiles 계약(`workflow-contract.md`)은
Worker 큐 hold를 다루지 않으므로 무관하다.

## 3. 결정

### 3.1 해제 술어

`resume(workspace, attempt_id, continuation)`이 `relaunchFromAttempt`에서
`ok:true`를 받은 **뒤에만** 판정한다(spawn 실패면 hold는 그대로다). 아래 네 조건이
모두 참이면 hold를 푼다:

1. `continuation.provider_auto_resume !== true` — 사람이 개시한 재개다. ws
   `worker-attempt-resume`(실패 타일 ↻, 지시와 함께 재시작, paused ▶)과
   `worker-stale-work-continue`의 잔여 attempt 이어하기가 여기 든다. 공급자 장애
   자동 회복(`consumeProviderAutoResume`, `provider_auto_resume:true`)은 들지 않는다.
2. 현재 `queue.hold`가 `kind:'systemic'`이다. env hold는 이 설계의 대상이 아니다
   (기존 사다리·`retry_succeeded`가 소유).
3. `hold.halted_by_attempt_id`가 비어 있지 않다. 비어 있으면(필드 이전 레거시
   기록) ↻은 풀지 않고 `재개`만 남는다(fail-quiet).
4. 이어한 `attempt_id`가 `halted_by_attempt_id`와 같거나, `attempt_id`에서
   `resumed_from`을 따라 올라가다 `halted_by_attempt_id`에 닿는다. 순회는 attempts
   맵 안에서만, 방문 집합으로 순환을 끊고, 끊긴 계보(부모 기록 부재)는 "닿지
   않음"이다.

다른 bead의 ↻, 같은 bead라도 halting 계보 밖의 attempt ↻, 자동 재개는 hold를
건드리지 않는다.

### 3.2 해제 절차 — `재개`와 같은 헬퍼

`resumeQueueHold`의 CAS 뒤 본문을 `releaseQueueHold(workspace, at)` 헬퍼로
분리하고 두 경로가 공유한다:

1. `deps.store.applyQueueHold(workspace, { event: { kind: 'resume', at }, now: at })`
   — reducer `reduceResume`가 `hold=null`·`lineages=[]`·`hold_history=[]`로 만들고
   `redispatch` effect에 hold와 lineage의 bead 전부를 싣는다. reducer는 바꾸지
   않는다.
2. `clearRetryTimer(workspace)`.
3. `redispatch` bead마다 `latestImplementationAttempt`가 `failed`/`retry_wait`이고
   미dismiss면 `dismissed_at=at`을 찍는다. 방금 ↻한 bead는 최신 attempt가
   `running` 자식이라 자연히 제외된다.
4. `notifyChanged(workspace)` → `tick(workspace)`. ↻ 경로는 자식 spawn 직후
   호출되므로 tick은 그 bead를 건너뛰고(`running` 존재) 나머지 held bead를 슬롯
   범위 안에서 디스패치한다.

`resumeQueueHold`는 CAS(`hold.since`) 검사 뒤 이 헬퍼를 부른다. ↻은 CAS 없이 부른다
— 판정 근거가 `since`가 아니라 attempt 계보이고, `resume()` 안에서 스냅샷을 다시
읽어 3.1을 판정하므로 그 사이 바뀐 hold는 술어에서 걸러진다.

### 3.3 `재개` 버튼과의 관계

↻이 hold를 지운 뒤 아직 화면에 남아 있던 `재개` 클릭은 기존
`hold.since` CAS로 `{ok:false, reason:'hold_changed'}` no-op이다. 스냅샷 fanout이
배너를 내리므로 추가 처리는 없다.

### 3.4 표면

- 서버 스냅샷: `hold=null`이 되면 배너가 사라진다(`holdBannerTemplate`). 새 필드·
  메시지·프로토콜 어휘는 없다. `queue-hold.js` reducer는 읽기 참고 대상이고 바꾸지
  않는다.
- `app/views/worker/index.js` `holdBannerTemplate` JSDoc의 "체계적 정지는 자동
  출구가 없어 사람의 `재개`만이 유일한 길"을 "사람의 승인 한 번 — `재개` 또는 큐를
  세운 attempt(자손 포함)의 ↻"으로 고친다. 번들 재빌드가 따른다.
- 타임라인: `재개`와 같은 파리티로 새 이벤트를 남기지 않는다. 해제 사실은
  `hold=null` 스냅샷과 자식 attempt의 `dispatched:…:resume` 이벤트로 읽힌다.

### 3.5 오류 처리

- `holdStateOf` 읽기 실패: `resume()`은 자식 spawn 결과를 그대로 반환하고 hold는
  건드리지 않으며 로그 한 줄만 남긴다. 세션은 이미 떠 있으므로 실패를 세션 실패로
  바꾸지 않는다.
- `applyQueueHold`가 no-op(hold가 그 사이 사라짐): `redispatch` 대상이 없으므로
  dismiss할 attempt가 없고, 통지와 tick은 기존 `resumeQueueHold`와 같이 그대로
  호출한다. 효과 유무로 호출 순서를 바꾸지 않는다.

## 4. 검토한 대안

- **A. (채택) 스케줄러 `resume()`에서 헬퍼 공유.** 계보 판정에 필요한 attempts
  맵과 `provider_auto_resume` 플래그가 이미 그 자리에 있고, `재개`의 dismiss·tick
  절차를 그대로 재사용한다. reducer·프로토콜 무변경.
- **B. 프론트에서 `worker-attempt-resume` 성공 뒤 `worker-queue-hold-resume`을
  잇달아 보냄.** 서버 무변경이지만 두 메시지 사이 경합이 생기고, stale-work
  이어하기 등 다른 사람 개시 경로가 빠지며, "↻이 재개를 포함한다"가 화면 습관이지
  큐 의미가 아니게 된다. 기각.
- **C. reducer에 `attempt_resumed {attempt_id}` 이벤트 추가.** 의미가 reducer에
  명시되는 장점이 있으나 자손 판정에 attempts 맵이 필요해 결국 스케줄러가
  판정하고 reducer는 `resume`과 같은 일을 한다. 이름만 늘어난다. 기각.

## 5. 검증과 인수 기준

`server/worker/scheduler.test.js`, 기존 `resumeQueueHold` 테스트(17143행 부근)의
setup·`seedQueue`·`env.runner.finish` 패턴을 따른다. systemic hold 시드는 11090행
부근의 `loud_fail_blocker`/`merge_to_base_blocked` 경로 또는
`store.applyQueueHold({event:{kind:'systemic_failure', …}})`를 쓴다.

1. **halting attempt ↻이 hold를 푼다.** systemic hold의 `halted_by_attempt_id`를
   ↻ → `hold === null`, `lineages === []`, 자식 attempt `running`, 원 attempt는
   `resumed_from`로 연결. `재개`와 달리 원 attempt에 `dismissed_at`은 찍히지
   않는다(최신 attempt가 자식).
2. **자손 ↻도 푼다.** halting attempt → 자식(실패) → 그 자식 ↻ → `hold === null`.
   (레거시: hold가 이 변경 전에 생겼고 이미 한 번 이어한 경우를 대표한다.)
3. **다른 bead의 ↻은 풀지 않는다.** hold.bead_ids에 없는 bead의 failed attempt ↻
   → hold 유지.
4. **같은 bead의 계보 밖 attempt ↻은 풀지 않는다.** halting attempt와 무관한 이전
   failed attempt ↻ → hold 유지(현재 `resume()` 규칙상 그 bead가 running이면
   `bead_running`으로 거부되므로, halting attempt가 running이 아닌 상태를 시드한다).
5. **자동 재개는 풀지 않는다.** `provider_auto_resume:true`로 halting attempt를
   resume → 자식은 뜨되 hold 유지.
6. **spawn 실패면 풀지 않는다.** runner spawn 거부 → `{ok:false}`, hold 유지.
7. **다른 held bead가 재디스패치된다.** hold.bead_ids=[A,B](B는 failed) 상태에서
   A의 halting attempt ↻ → B의 최신 failed attempt `dismissed_at` 찍힘, tick 뒤 B에
   새 attempt(슬롯 허용 시).
8. **`재개` 회귀.** 기존 `resumeQueueHold` 테스트 3건 그대로 통과(헬퍼 분리
   무손실).
9. **레거시 `halted_by_attempt_id:null`.** ↻ → hold 유지.

Pre-Handoff 묶음(`npm run tsc`·`npx vitest run --reporter=dot`·`npm run lint`·
`npm run prettier:write`·`npm run build`)을 통과한다.

## 6. 경계

- 바꾸지 않는 것: `queue-hold.js` reducer, ws 프로토콜, `재개`·`지금 재시도` 버튼,
  env hold 사다리, `failure-class.js` 등급표, `command-guard.js` 정규식.
- 결정: 자동 재개(`provider_auto_resume`)는 hold를 바꾸지 않는다 — 큐 정지 해제는
  사람의 승인이라는 ADR 0016의 뿌리는 유지한다.
- 관찰: 가드 `HOOK_BYPASS_RE`가 읽기 전용 git 하위 명령의 `-c core.hooksPath`까지
  kill하는 오탐 — 다른 세션이 처리 중(사용자 확인 2026-09-08), 이 Bead에서 만들지
  않는다.

## 결정 (ADR 후보)

- 전제: ADR 0016 — 큐 정지 권한은 `systemic` 계층만 갖고 실패가 켜는 유일한 정지는
  durable `queue.hold`다. 이 설계는 정지 권한과 상태 모델을 그대로 따르고 해제
  조항만 바꾼다.
- **체계적 정지 해제는 사람의 승인 한 번이며, `재개` 버튼과 큐를 세운 attempt(또는
  그 `resumed_from` 자손)의 ↻ 이어하기가 같은 승인이다. 자동 재개는 풀지 않는다.**
  되돌리기 어려움: 낮음 — `resume()` 분기 하나 제거로 복귀, durable 형식 무변경 /
  맥락 없이 놀라움: 있음 — 타일의 ↻ 한 번이 큐 전체 정지를 풀고 다른 held bead까지
  재디스패치하는 것은 이 결정을 모르면 "재개를 안 눌렀는데 큐가 돈다"로 읽힌다 /
  실제 trade-off: 있음 — 클릭 한 번의 통일 vs 큐 정지 승인의 별도 명시성. 두 조건
  충족이나 Accepted ADR 0016의 "해제는 사용자 `재개`뿐이다" 조항을 뒤집으므로 승계
  기록이 필요하다. `summary`: "Worker 체계적 정지의 해제는 사람의 승인 한 번이며,
  재개 버튼과 큐를 세운 attempt(자손 포함)의 ↻ 이어하기가 같은 승인이다. 자동
  재개는 정지를 풀지 않는다." → ADR, supersede 0016
