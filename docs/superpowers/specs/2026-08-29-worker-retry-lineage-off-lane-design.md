---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/queue-hold.js
---

# 대기 레인 밖 due retry lineage — 사다리 포기로 닫고 0ms 재무장 경로를 없앤다

- Bead: `UI-c5ko`
- 출처: `2026-08-29-worker-held-tile-discard-design.md` §8 관찰 줄(UI-w56w 구현 중 관측)
- 선행 결정: `2026-08-28-worker-failure-tiers-queue-hold-design.md` §3.3(env 사다리·lineage·
  hold 해제 규칙), ADR 0016(큐 정지 권한은 systemic만; env는 보류→재시도→승격 사다리)

## 1. 문제

`server/worker/scheduler.js runDueRetries`는 `dueRetries(state, at)`가 돌려준 lineage마다
다음 한 조건문으로 건너뛴다:

```js
if (!waiting.has(bead_id) || claimed.has(bead_id) || active.has(bead_id)) {
  continue;
}
```

세 경우 모두 큐 이벤트를 쓰지 않으므로 그 lineage의 `next_at`은 과거에 고정된다. 루프 끝의
`armRetryTimer(workspace)`는 `earliestRetryAt(state)`가 돌려준 그 과거 시각으로
`setTimeout(..., Math.max(0, earliest - now()))` = 0ms를 걸고, 타이머가 곧바로
`runDueRetries`를 다시 불러 같은 `continue`에 닿는다. 대기 레인 밖에 due lineage가 하나라도
있으면 그 워크스페이스의 워커는 이벤트 루프 틱마다 큐 스냅샷을 읽는 hot loop를 돈다.

세 조건의 지속성은 다르다:

- `!waiting.has(bead_id)` — **지속적**. 사용자가 `retry_wait` bead를 대기 레인에서 후보로
  끌어내면(`worker-queue-remove` → `queue-store.js remove`) 레인에서는 빠지지만
  `queue.lineages`는 그대로다(`remove`는 `removeFromLanes`·`rebindLineageLane`·admission만
  건드린다). bd 밖에서 닫힌 bead의 `moveToDone`/`dropFromQueue`도 같다. 되돌릴 사건이 없어
  `next_at`이 영원히 과거에 남는다.
- `claimed.has` / `active.has` — **과도적**. dispatch 중이거나 attempt가 돌고 있는 동안만이고,
  attempt가 정산되면 lineage가 닫히거나(`closeRetryLineage`) 전진한다(`reduceEnvFailure`).
  그러나 `재개` dispatch가 await 중인 동안에도 같은 0ms 재무장이 돌아, 짧게나마 헛돈다.

`reduceRetryDeferred`(`queue-hold.js`)의 헤더 주석은 "the bead left its lane"을 deferral 사례로
이미 적어 두었지만, 코드는 그 분기에서 이벤트를 쓰지 않아 주석과 동작이 어긋나 있다.

폐기 경로는 UI-w56w D2(`finalizeDiscardAttempt` → `closeRetryLineage`)가 막았다. 남은 것은
레인 이동·외부 close 경로다.

## 2. 목표와 비목표

목표:

1. 대기 레인 밖의 due lineage를 만났을 때의 의미를 정한다.
2. 정한 의미대로 고치고, `runDueRetries` 한 번을 지나면 어떤 due lineage도 `next_at`이
   과거에 남지 않게 한다 — `armRetryTimer`가 0ms로 재무장하는 경로를 없앤다.

비목표:

- 레인 이탈 시점(`remove`/`moveToDone`/`dropFromQueue`)에 store가 lineage를 즉시 닫는 것.
  같은 의미를 store 여러 call site에 복제하고 store가 hold reducer를 직접 부르는 결합을
  만든다. hold 해제가 `next_at`까지(최대 `RETRY_DELAYS_MS` 마지막 단, 15분) 늦는 것은 §8
  관찰로 남긴다.
- `queue-hold.js`의 이벤트 어휘 추가(`retry_abandoned` 같은 새 kind). 기존
  `retry_succeeded`가 reducer의 "lineage 닫기" 이벤트이고 `closeRetryLineage`가 비-env 결말
  전부에 이미 그것을 쓴다.
- 레인 밖으로 나간 `retry_wait` attempt 레코드(타일) 자체의 처분. attempt status와 타일은
  UI-w56w·UI-5ym8이 소유한다.
- `armRetryTimer`에 최소 지연 바닥을 두는 것. 바닥은 hot loop를 "느린 loop"로 바꿀 뿐이며
  원인(과거에 고정된 `next_at`)을 가린다.

## 3. 결정 요약 (사용자 결정 2026-08-29)

- **D1. 레인 이탈은 사다리 포기다.** `runDueRetries`가 due lineage의 bead를 대기 레인
  (`queue` + `serial_lanes`)에서 찾지 못하면 그 lineage를 `closeRetryLineage(workspace,
  bead_id)`로 닫는다. 마지막 lineage였으면 env hold가 풀린다(`reduceRetrySucceeded`의 기존
  규칙). 근거: 사다리는 "이 bead가 아직 환경 때문에 실패하는가"에 답하려고 있고
  (`closeRetryLineage` 헤더), 사용자가 bead를 레인에서 꺼낸 행위는 그 질문에 대한 답이다 —
  더는 재시도할 attempt가 없는 bead 때문에 큐가 보류되어서는 안 된다(ADR 0016: 개별 bead가
  큐를 세우지 않는다). 사용자가 bead를 다시 레인에 넣으면 새 실패가 새 사다리를 시작한다.
- **D2. claimed·active는 미룸이다.** dispatch가 진행 중이거나 attempt가 살아 있는 bead의 due
  lineage는 기존 `retry_deferred` 이벤트로 `next_at`을 `at + RETRY_DELAYS_MS[0]`로 옮긴다.
  rung(`attempts`)은 소비하지 않는다. attempt 정산이 lineage를 닫거나 전진시키므로 미룸은
  그 정산까지의 다리다.
- **D3. 루프 불변식.** `runDueRetries`의 루프는 `dueRetries`가 돌려준 모든 lineage에 대해
  정확히 하나의 결과를 남긴다: `retry_dispatched`(`next_at: null`) · `retry_deferred`
  (`next_at` 미래) · lineage 제거. 따라서 루프 뒤 `earliestRetryAt(state)`는 `null`이거나
  미래이고 `armRetryTimer`의 지연은 0ms가 될 수 없다.
- **D4. 판정 순서.** claimed·active를 먼저 본다(D2). dispatch는 레인 항목을 지우지 않으므로
  (`removeFromLanes`는 lane 이동·폐기·PR 대기·done·remove만 부른다) 활성 bead는 보통 레인
  안에 있지만, 사용자가 attempt 실행 중 `remove`한 bead는 레인 밖에서 돌고 있다. 그 경우도
  살아 있는 attempt의 정산이 사다리에 대한 정본 답이라 미룸이 맞고, 레인 부재를 먼저 보면
  정산 전에 lineage를 닫아 뒤이은 env 실패가 `attempts: 1`부터 새 사다리를 시작한다.

## 4. 변경

### 4.1 `scheduler.js runDueRetries`

세 조건을 묶은 `continue` 하나를 두 분기로 나눈다.

```js
for (const lineage of dueRetries(state, at)) {
  const bead_id = lineage.bead_id;
  if (claimed.has(bead_id) || active.has(bead_id)) {
    // D2: 정산이 lineage를 닫거나 전진시킬 때까지 rung을 쓰지 않고 미룬다.
    deps.store.applyQueueHold(workspace, {
      event: { kind: 'retry_deferred', bead_id, at },
      now: at
    });
    continue;
  }
  if (!waiting.has(bead_id)) {
    // D1: 레인 이탈은 사다리 포기다.
    log('retry lineage abandoned for %s: bead left the waiting lanes', bead_id);
    closeRetryLineage(workspace, bead_id);
    continue;
  }
  // 이하 dispatch 경로는 그대로 (retry_dispatched / retry_deferred).
}
armRetryTimer(workspace);
```

- `closeRetryLineage`는 내부에서 `armRetryTimer`를 한 번 더 부르지만 idempotent
  (`clearRetryTimer` 뒤 재무장)이고, 루프 끝의 `armRetryTimer`가 최종 상태로 다시 건다.
  `dueRetries`가 돌려준 배열은 스냅샷이라 루프 중 lineage 제거가 반복을 깨지 않는다.
- 함수 헤더 주석에 D1·D2를 한 문장씩 더하고 이 스펙을 가리킨다.

### 4.2 `queue-hold.js reduceRetryDeferred` 헤더 주석

"the bead left its lane"을 사례 목록에서 빼고, 미룸의 사례를 "claimed·active, 또는 attempt
없이 끝난 dispatch"로 고친다. 레인 이탈은 §3 D1대로 닫기다. reducer 코드는 바뀌지 않는다.

### 4.3 손대지 않는 것

- `dueRetries`·`earliestRetryAt`·`armRetryTimer`·`closeRetryLineage`의 본문.
- `queue-store.js remove`·`moveToDone`·`dropFromQueue` — lineage를 모른 채 그대로다.
- `retryParked`·`resumeQueueHold`·`retryQueueHoldNow`의 경로.

## 5. 검증 bundle

- `server/worker/scheduler.test.js` — 기존 `'the retry timer dispatches the ladder as a new
  attempt'` 픽스처(`ghDownVerifier`, fake `setTimeout`, `now: () => clock`)를 재사용해 두
  케이스를 더한다:
  1. **레인 이탈 → lineage 닫힘.** env 실패로 lineage가 생긴 뒤 `store.remove`로 S1을 레인에서
     빼고 `next_at`까지 시계를 옮긴다. 타이머가 한 번 돈 뒤 `snap.lineages`가 `[]`, `snap.hold`가
     `null`이며 새 attempt는 생기지 않는다. 그 뒤 `vi.advanceTimersByTimeAsync(0)`를 두 번
     더 돌려도 attempt 수와 `revision`이 변하지 않는다(재무장·재실행 없음 — hot loop 부재의
     관측 가능한 형태).
  2. **active → 미룸.** lineage가 due인 상태에서 같은 bead에 살아 있는 implementation attempt를
     `appendAttempt`로 둔 채 `runDueRetries`가 돌면 `lineages[0].next_at`이
     `clock + RETRY_DELAYS_MS[0]`이고 `attempts`는 그대로다. lineage는 남는다.
  - 대조(기존 테스트 유지): 레인 안의 due lineage는 새 attempt로 dispatch된다
    (`retry_dispatched`, `next_at: null`).
- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) · `npm run lint` ·
  `npm run prettier:write` → `npm run build`(`app/main.bundle.js`·`.map` 포함 — 프런트 소스는
  바뀌지 않지만 Pre-Handoff 규칙의 순서를 그대로 따른다).

## 6. 구현 unit 후보

한 unit이다. 서버 한 함수의 분기 재구성과 reducer 주석 한 줄이며, 테스트 둘이 같은 불변식
(D3)을 고정한다.

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

형제·발견 행 없음.

겹침(front-matter `scope`가 교차하는 비-`closed` Bead — 발행 전 수동 프로브):

| Bead | 상태 | 공유 경로 | 관계 |
| --- | --- | --- | --- |
| `UI-jr8v` | deferred | `server/worker/` | 다른 절. jr8v는 공급자 장애를 `holdAttempt`·`provider_hold`로 보류한다. 이 스펙은 env 사다리(`queue.lineages`)의 `runDueRetries` 분기만 건드린다 |
| `UI-ww5s` | deferred | `scheduler.js` | 다른 함수(`conflictPrompt`/`resolveConflict`) |

관찰 줄:

- 관찰: 레인 이탈 뒤 env hold는 그 lineage의 `next_at`까지(최대 15분) 유지된다 — 즉시 해제는
  §2 비목표(store 결합)라 넣지 않는다. 그 사이 사용자는 큐 상단의 `지금 재시도`로
  `next_at`을 당겨 같은 닫기를 앞당길 수 있다(`reduceRetryNow`가 모든 lineage의 `next_at`을
  `at`으로 놓고 `runDueRetries`를 부른다).
- 관찰: 레인 밖으로 나간 `retry_wait` attempt 타일은 lineage가 닫혀도 `retry_wait`로 남는다.
  이 bead를 다시 레인에 넣으면 `runPass`의 최근-attempt fence(`retry_wait`/`failed` skip)에
  걸려 자동 dispatch되지 않고 `재개`·타일 조작이 필요하다 — UI-5ym8 §8·UI-w56w 소유 표면이라
  이 스펙 밖이다.

## 결정 (ADR 후보)

- 대기 레인 이탈은 env 사다리 포기이며 그 lineage는 다음 due 시점에 닫힌다 — 되돌리기 어려움:
  불성립(`runDueRetries` 한 분기이며 durable 형식·계약 키는 그대로다) / 맥락 없이 놀라움:
  성립(bead를 후보로 끌어낸 것만으로 얼마 뒤 env 보류 배너가 사라진다) / 실제 트레이드오프:
  성립(미룸은 사다리를 보존하지만 후보에 머무는 bead 때문에 hold가 풀리지 않는다; 닫기는
  hold를 풀지만 다시 레인에 넣어도 사다리가 이어지지 않는다). 세 조건 중 하나가 불성립이라
  ADR로 올리지 않는다.
