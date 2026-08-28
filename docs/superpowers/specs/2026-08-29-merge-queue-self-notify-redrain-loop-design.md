---
scope:
  - server/worker/merge-queue.js
  - server/worker/merge-queue.test.js
---

# 머지 큐 drain 자기 알림 재드레인 고리 차단 (UI-nfkp)

## 1. 문제

`server/worker/merge-queue.js`의 드라이버는 `queue-changed` 버스를 **양쪽에서**
쓴다. `notify()`가 `deps.notifyChanged`(attach.js에서 `emitQueueChanged`)로
발화하고, `start()`가 `deps.subscribeQueueChanged`(같은 버스의 `onQueueChanged`)로
구독한다. 구독 콜백은 `hasHeldEntry()`가 참이면 `requestDrain()`을 부른다
(UI-d7fy §3.3 "보류 항목은 매 kick마다 재판정").

보류 행이 하나라도 서 있으면 이 배선이 닫힌 고리가 된다.

- `drain()`의 `finally`가 `draining=false` 직후 `notify()`를 부른다 → 동기
  팬아웃 → 자기 구독자 → `hasHeldEntry()` 참 → `requestDrain()` → 새 pass.
- pass **안**의 `active` 전이 알림(`notify()` 두 곳)도 같은 구독자를 깨워
  `drain_requested` 래치를 세운다. `draining` 가드는 재진입만 막고 래치는
  막지 못하므로 바깥 `while (drain_requested)`가 한 번 더 돈다.

저장 write는 이미 "같은 판정이면 write 0건"(UI-qksl)이지만 이 고리는 write와
무관하게 성립한다. UI-qksl이 보류 사유를 넷으로 넓히고 자동 dispatch를 붙여
보류 시간이 길어지면서 노출이 커졌다.

## 2. 결정

**드라이버는 자기가 발화한 `queue-changed`를 보류 재판정(`hasHeldEntry()`)
신호로 세지 않는다.** `emitQueueChanged`는 동기 팬아웃이므로 `notify()`가 팬아웃
중임을 나타내는 플래그 하나로 자기 이벤트를 정확히 가려낼 수 있다. 구독 콜백의
다른 분기(`wake()`·halt 재개 판정·`resolutionNeedsDrain()`)는 자기 이벤트에서도
그대로 돈다 — 그중 `halted_on_snapshot` 재확인은 drain 종료 `notify()`에 기대어
일시적 스냅샷 읽기 실패를 외부 이벤트 없이 회복하는 경로이기 때문이다(spec 리뷰
codex 지적).

기각한 대안과 이유:

- revision 이동 시에만 재드레인(monitor-handlers의 `queueRevisionMoved` 방식):
  큐 파일이 바뀌지 않는 PR 관측 pass의 이벤트로 보류가 풀려야 한다는 계약
  (`merge-queue.test.js` "an observation pass re-judges a held item the queue
  never mutated")을 깬다. 영수증은 Bead metadata에 있어 큐 revision을 움직이지
  않는다.
- `hasHeldEntry()` 재드레인 최소 간격: 고리를 느리게 할 뿐 끊지 않고 테스트가
  시간 의존이 된다.

## 3. 설계

### 3.1 변경 — `server/worker/merge-queue.js`만

- 드라이버 상태에 `let self_notifying = false;`를 둔다.
- `notify()`는 `deps.notifyChanged(workspace)` 호출을 `self_notifying = true` /
  `finally { self_notifying = false; }`로 감싼다. 기존 try/catch(팬아웃 예외
  삼킴)는 그대로다.
- `start()`의 구독 콜백에서 **마지막 분기** `if (hasHeldEntry()) requestDrain()`
  만 `if (!self_notifying && hasHeldEntry())`로 좁힌다. 콜백의 다른 분기
  (`wake()`·`halted_on_head`·`halted_on_completion`·`halted_on_snapshot`·
  `halted_on_conflict`·`resolutionNeedsDrain()`)는 자기 이벤트에서도 지금처럼
  평가한다.

분기를 하나만 좁히는 근거:

- `hasHeldEntry()`: 이 스펙이 끊으려는 고리 그 자체. 보류 재판정은 UI-d7fy
  §3.3이 열거한 외부 kick(PR 관측 pass·enrollment·completion 드라이버·리뷰
  세션 완료·runnable-cache metadata 관측)으로 그대로 일어난다.
- `halted_on_snapshot`: `processItem`이 스냅샷을 못 읽으면 halt를 세우고 drain이
  끝나며, 종료 `notify()`가 자기 구독자를 통해 `snapshotFence(snapshot())`를
  다시 본다. 읽기가 회복돼 있으면 그 자리에서 재드레인한다 — 이 회복은
  드라이버 자신의 알림이 유일한 즉시 신호이므로 건너뛰면 안 된다.
- `halted_on_head`·`halted_on_completion`: 자기 알림 시점에 halt를 정당화한
  상태가 그대로면 재개 조건이 거짓이라 고리를 만들지 않는다. 상태가 바뀌었다면
  재드레인이 맞다.
- `halted_on_conflict`: `requestDrain()`이 `conflictDispatchStillBlocked()`로
  스스로 게이트한다.
- `wake()`·`resolutionNeedsDrain()`: 기존 동작 유지. 해소 감시 타이머
  (`maintainResolutionWatcher`)는 `notify()`가 아니라 `requestDrain()`을 직접
  부르므로 이 스펙과 무관하다.

이 좁힌 형태로도 고리는 끊긴다: 보류 행만 서 있는 상태에서는 위 다른 분기가
어느 것도 참이 아니므로, 자기 이벤트가 `requestDrain()`에 닿는 유일한 길이
`hasHeldEntry()`였다.

### 3.2 바뀌지 않는 것

- `queue-changed` 이벤트의 의미·발화 시점·횟수. 드라이버는 지금과 똑같이
  발화한다 — UI 팬아웃(`worker-handlers.js`)·모니터(`monitor-handlers.js`)·PR
  poller(`pr-poller.js`)는 드라이버의 알림을 그대로 받는다.
- 다른 드라이버의 구독 콜백. 이 플래그는 이 드라이버 인스턴스의 클로저 안에만
  있다.
- `kick()`·`requestDrain()`·`drain()`의 래치 의미. 외부 이벤트가 pass 도중에
  오면 지금처럼 래치를 세우고 다음 pass가 돈다.
- 구독 콜백의 halt 재개·해소 대기 분기. 자기 이벤트에서도 지금과 같이 돈다.
- 보류 write의 "같은 판정이면 write 0건" 성질(UI-qksl). 그 성질은 저장 쪽
  방어이고 이 스펙은 신호 쪽 방어라 둘이 겹치지 않는다.

Bead 설명의 scope에 있던 `queue-events.js`·`attach.js`는 열린 분기 중
"알림을 UI 팬아웃 전용으로 가른다"를 위한 후보였고, 채택한 결정은 그 두 파일을
건드리지 않는다.

## 4. 테스트 — `server/worker/merge-queue.test.js`

기존 테스트는 `subscribeQueueChanged`를 배열에 쌓는 가짜로 두고 `notifyChanged`를
잇지 않아 이 고리를 재현하지 못한다. 두 deps를 **실제로 서로 이어** 고리를
재현하는 테스트를 추가한다.

1. **닫힌 pub/sub에서 보류 행이 유한 횟수의 drain으로 끝난다.**
   `queue-events.js`의 실제 `onQueueChanged`/`emitQueueChanged`를
   `subscribeQueueChanged`/`notifyChanged`에 연결하고(`afterEach`에서
   `__resetQueueEventsForTest`), `blockedProbe('review_receipt_missing', …)`로
   행 하나를 보류시킨다. `probeMergeability` 호출 횟수를 센다. `mq.start()` 뒤
   `setTimeout(0)`을 몇 번 흘려도 호출 횟수가 정착하고(=1), 마지막 drain 뒤
   `emitQueueChanged` 발화 횟수도 정착한다. 수정 전에는 이 테스트가 매
   `setTimeout(0)`마다 호출 횟수가 늘어 실패한다.
2. **외부 이벤트는 여전히 보류를 재판정한다.** 같은 실제 버스 배선에서 외부
   소스가 `emitQueueChanged(WS)`를 부르면(드라이버 밖에서 직접 호출)
   `probeMergeability`가 한 번 더 불리고, 판정이 `clean`으로 바뀌어 있으면
   머지가 진행된다. 기존 2638행 테스트의 계약을 실제 버스에서 다시 고정한다.
3. **자기 이벤트는 래치도 세우지 않는다.** pass 안 `active` 알림이 래치를
   세우지 않는지 — 1번의 호출 횟수 정착이 이것도 함께 증명한다(래치가 서면
   pass가 한 번 더 돌아 호출이 늘어난다).
4. **일시적 스냅샷 읽기 실패는 외부 이벤트 없이 회복된다.** 같은 실제 버스
   배선에서 `store.snapshot`이 첫 호출 한 번만 `null`(또는 throw)을 돌려주도록
   감싼 뒤 `mq.kick()`한다. 외부에서 `emitQueueChanged`를 부르지 않아도 drain
   종료 자기 알림의 `halted_on_snapshot` 재확인으로 재드레인이 일어나 머지가
   진행된다. 이 테스트가 §3.1의 "분기를 하나만 좁힌다"를 고정한다.

pass 종료 `notify()`가 사라지는 것이 아니므로, UI 팬아웃 계약 테스트
(`attach.test.js`·`worker-handlers` 쪽)는 그대로 통과해야 한다.

## 5. 검증

- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120초) · `npm run lint` ·
  `npm run prettier:write`. 프런트 소스 무변경이라 `npm run build`는 번들 바이트
  동일 확인만.
- 머지 후 배포(`repo-ops/config.toml` `[deploy]`)까지가 완료다.

## 구현 unit 후보

- `driver:server/worker/merge-queue.js` — 단일 unit. 분할 근거 없음.

## 경계·후속

후속 Bead 후보 없음.

- 관찰: `session-log.js`의 3초 하트비트 `emitQueueChanged`가 보류 중 3초마다
  재판정을 부른다 — 타이머로 유계된 외부 이벤트라 이 스펙의 고리가 아니고,
  같은 판정이면 write 0건이라 비용은 게이트 재판정 1회뿐이다. 문제가 관측되면
  별도 제기.

## 결정 (ADR 후보)

- 드라이버는 자기가 발화한 `queue-changed`를 보류 재판정 신호로 세지 않는다 —
  되돌리기 어려움: 아님(플래그 하나, 국소). 맥락 없이 놀라움: 아님(구독 콜백의
  주석이 근거를 담는다). 실질 trade-off: 아님(기각 대안이 계약을 깨므로 선택지가
  하나). → 세 조건 모두 불성립, ADR 아님.
