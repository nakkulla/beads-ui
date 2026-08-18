# 복구 세션 진행 중 자동 머지 보류 설계 (UI-0lct)

## 배경

`dotfiles-wn55`의 post-merge 정리에서, 자동 해결(복구) 세션이 도는 동안 그 세션이
고치라고 지시받은 cleanup이 정상 경로로 스스로 완주했다. 실측 타임라인은 다음과
같다 (`queue.json`, KST).

- 13:27:05 — wn55 머지, deploy operation `dee4dec5` 요청
- 13:28:39 — attempt `dotfiles-wn55-1787027313615-1` 시작. 프롬프트는
  `operation=cleanup:dotfiles-wn55`, 분류 `action_in_flight`,
  stage `auto_repair_session`
- 13:36:57 — `bd dotfiles-wn55` closed (세션 진행 중)
- 13:38:32 — 세션 종료

즉 같은 subject의 cleanup cursor를 두 executor가 동시에 굴렸다. 복구 세션은 같은
저장소에 commit·push하고 같은 `repo_serial_lock`과 공유 detached 워크트리
`.worktrees/.repo-ops-deploy`를 쓴다. 그 사이 base가 움직이면 복구 판정 근거인
`exact_input_exit_zero_evidence_adoption`이 다른 `target_sha` 위에서 나온다.

현재 구조에는 이미 필요한 기반이 있고, 빠진 것은 복구 진행을 읽는 판정 하나다
(그 하나를 드라이버의 두 지점에서 부른다).

- 드라이버에는 "멈춤 + 이름 붙은 재개 조건" 관용구가 세 벌 있다:
  `halted_on_head`, `halted_on_completion`, `halted_on_conflict`. 재개 판정은
  `queue-changed` 구독자에서 한다 (`server/worker/merge-queue.js:1913` 인근).
- 복구 진행은 이미 durable하게 기록된다:
  `repo_operations[*].state === 'repairing'` (`queue-store.js:3810`
  `startRepoOperationRepair`) 와 `cleanup_failed[*].repair.mode`
  (`queue-store.js:3913` `startCleanupRepair`).
- completion intent의 복구 단계는 **이미 머지를 막는다**:
  `processCompletionItem` (`merge-queue.js:1298`) 은 `intent.phase !== 'merging'`
  이면 `halted = true`로 드레인 전체를 멈춘다.

결함은 새 상태의 부재가 아니다. 머지 드라이버가 복구 진행을 **전혀 읽지 않는다**.
`merge-queue.js` 전체에 repo operation 참조가 0건이고, `merge-candidates.js:194`의
후보 제외는 충돌 해결 세션(`hasConflictSession`)만 본다. 그래서 `repo_operations`
복구와 legacy cleanup 복구 두 표면이 드라이버에게 보이지 않는다.

## 목표

- 복구 세션이 durable하게 진행 중인 동안, 머지 드라이버가 새 subject의 턴을
  시작하지 않으며 `deps.merge()`도 호출하지 않는다.
- 복구가 끝나면 밀린 머지가 사람 개입 없이 재개된다.
- 복구 대상 subject의 정리를 복구 세션이 단독으로 소유한다.
- 이미 `deps.merge()`에 진입한 항목은 펜스 때문에 중단되지 않는다.

## 비목표

- `auto_merge` 플래그를 자동으로 끄는 것. `completion-intent.js:88`에서
  `auto_merge !== true`는 모든 completion intent를 `pause`시키며, 복구 체인
  자신의 intent까지 멈춰 교착이 된다.
- 새 workflow enum, queue state, durable metadata, label 추가
- 새 protocol 필드, UI projection, frontend bundle 변경
- 자동 해결 사다리, retry budget, `auto_repair` 토글 의미 변경
- `UI-pmfr`이 소유한 `action_in_flight` 오분류 수정. 그것은 근본 원인이고 이
  설계는 독립적인 두 번째 방어층이다.
- 교차 저장소 유닛의 `repo_id` 분리 판정

## 결정

### 복구 진행 중에는 드라이버가 턴을 시작하지도 머지하지도 않는다

판정 지점은 두 곳이다. 턴 경계에서 한 번, `deps.merge()` 직전에 한 번. 턴 경계
하나로는 부족하다 — 그 사이에 최대 30분급 대기를 포함한 여러 `await`가 있고, 그
창에서 시작된 복구를 놓친다. 자세한 근거와 배치는 「머지 직전 재검사」에 있다.

펜스는 workspace 단위다. 문제의 본질이 "복구가 판정 근거로 삼는 base가 움직인다"
이므로, 복구 대상 행만 제외하는 subject 한정 판정은 문제를 막지 못한다. 드레인은
어차피 순차이므로 workspace 펜스는 기존 halt와 같은 비용이다.

### 예외를 두지 않는다

복구 대상 subject 자신의 `[정리]` 행도 보류한다. `cleanup_failed` 행은
`merge-candidates.js:223`에서 후보로 올라가고 드라이버가 cleanup cursor를 굴리므로,
예외를 두면 `wn55`에서 관측된 경합이 그대로 남는다. 복구 세션이 그 subject의 단일
실행 소유권을 갖는다.

교착은 생기지 않는다. `repo_operations` 복구의 해제는 세션 정산에서 나오지 다른
머지에 의존하지 않는다 (`repo-operation-coordinator.js:2168`
`reconcileRepairsLocked`는 `judge()`가 `session_running`이 아니면 무조건
`releaseRepoOperationRepair`를 부른다). 따라서 펜스는 복구 세션보다 오래 살 수
없다.

### 신호는 두 표면만 읽는다

`completion_intents[*].phase`는 읽지 않는다. `processCompletionItem`이 이미
`merging`이 아닌 모든 단계에서 드레인을 멈추므로 중복 판정이다.

`merging` 단계인 completion intent는 신호로 읽지 않아도 여전히 보류된다. 펜스가
`processItem` 최상단, 즉 completion 분기보다 **앞**에 놓이기 때문이다. 신호 표면을
줄이는 것과 completion intent를 예외로 두는 것은 다른 얘기이며, 후자는 채택하지
않는다.

`repo_id` 필터도 두지 않는다. `createMergeQueue`에 `deps.repo`가 없고, 타 저장소
operation을 포함해도 과보류(안전한 방향)일 뿐이다. 교차 저장소 유닛에서 과보류가
실제 문제로 관측되면 그때 `deps.repo`를 배선한다.

### 판정은 열거자가 아니라 드라이버에 둔다

`mergeQueueCandidates`에 제외 필터를 추가하는 대안은 재시작 경로를 덮지 못한다.
`merge-queue.js:1480`이 UI-yk55 §3.2를 인용해 명시하듯, 재시작으로 복원된 durable
큐의 head는 열거자를 거치지 않고 곧바로 `processItem`으로 들어간다. 또 행이 큐에서
사라지면 `머지 대기 #N`이 보이지 않아 사용자에게 더 불투명해진다.

열거자와 드라이버 양쪽에 두는 것도 택하지 않는다. `merge-candidates.js` 헤더가
경계하는 "적격성 규칙이 두 벌이면 어느 쪽이 맞는지 아무도 말할 수 없는" 상태를
만든다.

드라이버 안에서 `repairFence`를 두 번 부르는 것은 이와 다르다. 규칙은 한 벌이고
소유자도 하나이며, 호출 지점만 둘이다. 규칙이 두 벌이 되는 것이 문제지 같은 규칙을
두 번 확인하는 것이 문제가 아니다.

### 해제는 기존 heartbeat에 맡긴다

새 `queue-changed` 발신을 추가하지 않는다. `repo-operation-coordinator.js`는
`queue-changed`를 한 번도 발신하지 않지만, 펜스가 행을 잡고 있으면
`merge_queue.length > 0`이고 그것이 `pollDemand()` (`pr-poller.js:219`) 를 참으로
만든다. 구독자가 없어도 PR poller가 45초마다 돌고 매 관측 패스 끝에
`notifyChanged`를 발신한다 (`pr-poller.js:712`). `repairing` 해제 자체는 ungated
reconcile 60초 (`attach.js:95` `RECONCILE_INTERVAL_SECONDS`) 에서 일어난다.

따라서 정상 패스 기준 명목 해제 cadence는 두 타이머 위상의 합인 약 105초다. 이것은
보장이 아니다. reconcile은 repo operation lock 획득과 `judge()` 수행 시간을 더하고,
poller의 `notifyChanged`는 레인 전체를 순차 관측한 뒤에 나오며, 실패한 패스는 다음
주기로 밀린다. 즉 end-to-end 최악값은 이보다 크고 상한이 고정돼 있지 않다.

해제 시점에 상한 보장이 필요하지 않다고 판단해 이 cadence를 받아들인다. 보류는
사용자에게 `머지 대기 #N`으로 보이고, 원인인 복구 세션도 running attempt로 보이며,
지연이 길어져도 잘못된 머지가 일어나지는 않는다. 상한이 필요해지면 그때
`releaseRepoOperationRepair`/`releaseCleanupRepair` 호출부에서 직접 wake를 발신하고
그 경계를 테스트로 고정한다. 지금은 코디네이터가 아무것도 발신하지 않는 기존 경계를
보존한다.

### 사용자 표면을 바꾸지 않는다

보류 사유는 서버 로그로만 남긴다. 기존 halt 3형제도 사유를 노출하지 않으므로 네
번째만 노출하면 "이것만 특별하다"는 비정합이 생긴다. 복구 세션은 Worker UI에 running
attempt로 이미 보이므로 사용자가 원인을 알 수 있고, 보류된 행은 기존대로
`머지 대기 #N`으로 보인다.

## beads-ui 변경

### 펜스 판정

`server/worker/merge-queue.js`에 로컬 순수 함수를 추가한다.

```js
/**
 * @param {any} q
 * @returns {{ active: boolean, reason: string|null }}
 */
function repairFence(q)
```

- `q === null` → `{ active: true, reason: 'snapshot_unreadable' }`. `snapshot()`은
  이미 throw 시 `null`을 돌려준다 (`merge-queue.js:201`). 복구가 없다는 것을
  증명할 수 없으면 머지하지 않는다 — 머지 게이트의 첫 규칙과 같은 fail-closed다.
- `q.repo_operations`의 어떤 값이든 `state === 'repairing'` →
  `{ active: true, reason: 'repo_operation:<operation_id>' }`
- `q.cleanup_failed`의 어떤 값이든 `repair?.mode`가 truthy →
  `{ active: true, reason: 'cleanup:<bead_id>' }`
- 그 외 → `{ active: false, reason: null }`

두 표면 모두 해당하면 먼저 발견한 `repo_operations` 사유를 쓴다. 사유는 로그
전용이므로 순서는 결정적이기만 하면 된다.

### 턴 경계 halt

`processItem(bead_id)` 최상단, `completionIntent` 분기(`merge-queue.js:1472`)보다
앞에 둔다.

```js
const fence = repairFence(snapshot());
if (fence.active) {
  halted = true;
  halted_on_repair = fence.reason;
  log('merge queue: %s halted — repair in flight (%s)', bead_id, fence.reason);
  return;
}
```

completion intent 분기보다 앞에 두는 것이 "예외 없음" 결정의 구현이다.

새 모듈 상태는 `let halted_on_repair = null` 하나이며, 기존 세 halt 변수와 같은
자리에 선언한다. `drain()`의 halt 초기화(`merge-queue.js:1837`)도 세 형제와
같은 방식으로 함께 초기화한다.

### 머지 직전 재검사

턴 경계 검사만으로는 부족하다. `processItem`은 펜스를 통과한 뒤 head review
dispatch, 미확인 head 대기, 충돌 해결 라운드(최대 `RESOLUTION_WAIT_MS`) 같은 여러
`await`를 거쳐서야 `runMerge()`에 도달한다. 그 창에서 복구가 시작되면 이미 통과한
항목이 그대로 `deps.merge()`를 호출해 목표를 위반한다.

`runMerge(bead_id)` (`merge-queue.js:1068`) 은 `deps.merge()`의 **유일한 호출
지점**이므로 여기서 동기적으로 한 번 더 판정한다.

```js
async function runMerge(bead_id) {
  if (repairFence(snapshot()).active) {
    return { ok: false, action: 'refused', reason: 'repair_in_flight' };
  }
  try {
    return await deps.merge(bead_id);
  } catch (err) { /* 기존 그대로 */ }
}
```

`snapshot()` 읽기와 `deps.merge()` 호출 사이에 `await`가 없어야 한다. 그래야
"복구 없음"을 확인한 시점과 머지 시점 사이에 다른 틱이 끼어들지 못한다.

`runMerge`는 halt 상태를 쓰지 않는다. halt는 결과를 소비하는 루프가 정한다 —
`halted_on_head`가 helper가 아니라 루프에서 설정되는 것과 같은 배치다.

#### 거절 결과를 소비하는 두 지점

**이 분기를 추가하지 않으면 펜스가 행을 큐에서 제거한다.** 기존 두 소비 경로는
알 수 없는 `refused` 사유를 종결 실패로 처리하기 때문이다.

- `processItem`의 결과 루프는 마지막에
  `failAndDequeue(bead_id, result.reason || 'refused')` (`merge-queue.js:1757`) 로
  떨어진다. 그대로 두면 보류돼야 할 행이 실패로 기록되고 큐에서 빠진다.
- `processCompletionItem`의 결과 루프는 마지막에
  `handoffCompletion(root_bead_id, subject_bead_id, result)`
  (`merge-queue.js:1457`) 로 떨어져 `deps.onCompletionResult`에 거절을 보고한다.
  펜스를 completion 실패로 보고해서는 안 된다.

따라서 두 루프 모두, 각자의 fallthrough **앞에** 전용 분기를 둔다. 모양은 같은
루프의 `review_state === 'halted'` 분기(`merge-queue.js:1753`)와 동일하다.

```js
if (action === 'refused' && result.reason === 'repair_in_flight') {
  halted = true;
  halted_on_repair = repairFence(snapshot()).reason || 'repair_in_flight';
  notify();
  return;
}
```

행은 큐에 남고 위치도 유지된다. 재개는 다른 halt와 같은 경로다.

`deps.merge()`가 이미 시작된 뒤 복구가 생기는 경우는 대상이 아니다. 되돌릴 수
없으므로 완주시킨다.

### 재개

`queue-changed` 구독자(`merge-queue.js:1913` 인근)에 세 형제와 같은 모양으로
추가한다.

```js
if (halted_on_repair && !repairFence(snapshot()).active) {
  halted_on_repair = null;
  void requestDrain();
}
```

`requestDrain()`에는 넣지 않는다. `halted_on_head`·`halted_on_completion`과 동일하게
halt + 구독자 재개만으로 충분하다. `conflictDispatchStillBlocked` 형태는 별도 사전
조건을 가진 특수 케이스이며 이 펜스는 그 조건을 갖지 않는다.

`stop()`에서 `halted_on_repair`를 `null`로 되돌린다 — `halted_on_conflict`와 같다.

## 오류 처리와 관측성

- 스냅샷 읽기 실패는 fail closed다. 펜스가 복구 세션보다 오래 살 수 없으므로
  영구 정지가 되지 않는다.
- 보류는 `log`로만 남기고, 사유 문자열에 bead id와 operation id 외의 내용을 담지
  않는다.
- 판정 지점은 턴 경계와 `deps.merge()` 직전 두 곳이다. 두 번째 판정이 거절한
  항목은 `{ ok: false, action: 'refused', reason: 'repair_in_flight' }`로 기존
  실패 형태를 재사용하되, 두 소비 루프의 전용 분기가 이를 halt로 바꾼다. 큐에서
  제거되지도, completion 실패로 보고되지도 않는다.
- 이미 `deps.merge()`에 진입한 머지는 중단하지 않는다. 되돌릴 수 없다.
- 펜스 활성 중에도 열거자는 계속 행을 큐에 넣는다. 이것이 `merge_queue.length > 0`
  을 유지해 poller heartbeat를 살리고, 사용자에게 `머지 대기 #N`으로 보인다.

## Test scope

### UI-0lct RED → GREEN seams

대상 파일은 `server/worker/merge-queue.test.js`다.

1. **repo operation 복구가 머지를 보류한다**
   RED: `repo_operations`에 `state='repairing'` 레코드를 두고 green 행을 enqueue한
   뒤 드레인하면 머지가 실행된다.
   GREEN: 머지가 실행되지 않고 큐에 남는다.

2. **해제 후 정확히 한 번 머지한다**
   RED: 없음 (1의 후속).
   GREEN: `repairing`을 제거하고 `queue-changed`를 한 번 발신하면 그 행이 정확히
   한 번 머지된다.

3. **cleanup 복구가 정리를 보류한다 — wn55 회귀**
   RED: `cleanup_failed[bead].repair.mode='auto'`인 상태에서 그 bead의 `[정리]`
   행을 드레인하면 cleanup cursor가 전진한다.
   GREEN: 전진하지 않고 보류된다.

4. **completion intent도 예외가 아니다**
   RED: `completion_intents[root].phase='merging'`인 행이 `repairing` 중에도
   머지된다.
   GREEN: 보류된다.

5. **턴 통과 후 머지 직전에 시작된 복구를 잡는다**
   RED: 턴 경계 검사는 통과시키고(그 시점 `repo_operations`에 `repairing` 없음),
   `processItem`이 `runMerge()`에 닿기 전의 `await` 지점 — 예컨대 head review
   또는 미확인 head 대기 — 에서 `repairing`을 주입하면 `deps.merge()`가 호출된다.
   GREEN: `deps.merge()`가 호출되지 않고, 행이 큐에 **남은 채** halt된다.
   `failAndDequeue`가 호출되지 않고 실패도 기록되지 않는다.

   같은 seam을 completion intent 경로로도 둔다: 그 경우 `deps.onCompletionResult`가
   호출되지 않아야 한다.

6. **이미 시작된 머지는 완주한다**
   RED: 없음 — 경계 고정용이다. 5번이 도입한 재검사가 이 경계까지 넘어와
   진행 중 머지를 끊지 않는지 확인한다.
   GREEN: `deps.merge()`가 호출된 뒤 그 promise가 resolve되기 전에 `repairing`이
   생겨도 그 항목은 완주하고 결과가 정상 처리된다.

7. **스냅샷 실패는 fail closed다**
   RED: 스냅샷이 계속 throw하면 `headEntry()`가 헤드를 못 읽어 드레인이 애초에
   `processItem`에 닿지 않으므로, 단순히 `store.snapshot`을 항상 throw시키는
   RED는 구현 전에도 통과하는 vacuous seam이다. 호출 순서를 정확히 지정한다 —
   `headEntry()`의 첫 스냅샷은 성공시키고, 새 펜스가 읽는 **그다음** 스냅샷만
   throw시키며, 이후 읽기는 다시 성공시킨다. 그 배치에서 구현 전에는 머지가
   실행된다.
   GREEN: 보류한다.

### 회귀 확인

- `server/worker/merge-queue.test.js` 기존 케이스 전체
- `server/worker/repo-operation-repair.test.js`
- `server/e2e/worker-flow.test.js`

## 배포 및 live 검증

`repo-ops/config.toml`은 `[deploy]`만 선언하고 `[verify]`는 선언하지 않는다. 머지
후 deploy operation이 terminal success에 도달하고, 공유 detached 워크트리
`.worktrees/.repo-ops-deploy`에서 병합된 SHA로 서버가 올라오는 것을 프로세스 경로·
포트·HTTP 응답으로 확인한 뒤에만 완료를 선언한다.

frontend 변경이 없으므로 `npm run build`와 bundle 동봉은 하지 않는다.

Pre-Handoff Validation: `npm run tsc`, `npm test`, `npm run lint`,
`npm run prettier:write`.

## 수용 기준

- `repo_operations[*].state === 'repairing'` 중에는 green 행이 enqueue되어도 머지되지
  않고, 해제 후 `queue-changed` 한 번에 정확히 한 번 머지된다.
- `cleanup_failed[*].repair.mode`가 설정된 subject의 `[정리]`가 보류된다.
- `completion_intents`가 `merging` 단계여도 펜스에 걸린다.
- 턴 경계를 통과한 뒤 `deps.merge()` 호출 전에 복구가 시작되면 그 머지가 거절되고,
  행은 큐에 남는다 — `failAndDequeue`도 `onCompletionResult` 보고도 일어나지 않는다.
- 이미 `deps.merge()`에 진입한 머지는 펜스 때문에 중단되지 않는다.
- 스냅샷 읽기 실패 시 머지하지 않는다.
- 새 workflow enum, queue state, protocol 필드, frontend 변경이 없다.
- `npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` 통과.
