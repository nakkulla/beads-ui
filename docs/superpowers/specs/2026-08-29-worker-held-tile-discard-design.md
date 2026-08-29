---
scope:
  - server/worker/discard-coordinator.js
  - server/worker/discard-coordinator.test.js
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
---

# held 타일(parked·retry_wait)의 폐기 — 의미 확정과 판정 집합 정합

- Bead: `UI-w56w`
- 출처: `2026-08-28-worker-prerequisite-wait-tier-design.md` §8 후속(defect)
- 선행 결정: `2026-07-27-worker-discard-button.md` §1(폐기 후 자동 재큐잉 없음),
  `2026-08-28-worker-failure-tiers-queue-hold-design.md` §3(parked·retry_wait 정의),
  ADR 0017(parked 비자동 복귀), 카드 문법 `2026-08-25-card-header-grammar-unify-design.md` §5.1

## 1. 문제

`server/worker/discard-coordinator.js`의 `DISCARDABLE_ATTEMPT_STATUSES`는 #120에서
`{running, paused, failed, orphaned, done}`으로 굳었고, held 계층(UI-5ym8)은 그 뒤에
들어왔다. UI-8jau이 `waiting`만 더했다. 그래서 지금은:

- `parked` 타일은 foot에 `재시도`·`폐기`를 그리지만(`running-grid.js heldBodyTemplate`),
  `폐기` 클릭은 `captureSource`에서 `attempt_not_discardable`로 항상 거절된다.
- `retry_wait` 타일은 본문이 비어 있고 헤더도 held면 조작을 그리지 않아 버튼 자체가 없다.
  그러나 `worker-discard`가 `attempt_id` 없이 오면 마지막 implementation attempt를 고르므로
  같은 거절이 잠재한다.
- `retry_wait` bead가 폐기되면 `completeDiscardOperation`의 `removeFromLanes`로 대기 레인에서
  빠지는데 env lineage는 `queue.lineages`에 남는다. `runDueRetries`는 `waiting.has()`
  실패로 `continue`만 하고 `retry_deferred`도 쓰지 않으므로 `next_at`이 과거에 고정된 채
  `armRetryTimer`가 헛돈다.

## 2. 목표와 비목표

목표:

1. `parked`·`retry_wait` attempt의 `폐기`가 무엇을 되돌리는지 정한다.
2. 정한 의미대로 판정 집합을 고치고 두 상태의 폐기 경로를 테스트로 고정한다.
3. 버튼이 그려지지만 서버가 거절하는 조합을 없앤다.

비목표:

- `awaiting_user` 해제. dotfiles 계약(`workflow-state.yaml awaiting_user.cleared_with_write_to`)이
  결정 쓰기와 같은 write에서만 해제하도록 정하고 있고, Worker는 결정 쓰기의 주체가 아니다.
- `dismissed_at`(타일 숨김)로 `폐기`를 재정의하는 것. 같은 라벨이 실패 타일에선 원복, held
  타일에선 숨김이 되어 한 이름이 두 뜻을 갖는다.
- 폐기 후 자동 재큐잉. 2026-07-27 스펙 §1이 제거한 것이며 이 스펙도 되살리지 않는다.
- 워크트리가 만들어지기 전 spawn 실패로 `retry_wait`가 된 attempt의 폐기(§8 관찰).
- `parked`의 `재시도`(`worker-parked-retry`) 경로 변경.

## 3. 결정 요약

- **D1. `parked` 폐기 = `failed`(unmerged) 폐기와 같은 unified discard lifecycle.** 백업
  archive(워크트리·브랜치·세션 로그) → attempt `discarded` → PR 관측 → 워크트리·로컬·원격
  브랜치 제거 → Phase 자식 삭제 → parent reset(`open`, `pr_url`/`impl_review`/`last_checked_sha`
  unset) → 대기 레인 이탈(후보 복귀). `awaiting_user`는 그대로 남고, Worker admission이
  `awaiting_user` 키 존재로 dispatch를 거절하므로(`admission.js` 0.5) 사용자가 결정을
  쓰기 전엔 새 세션이 뜨지 않는다. `재시도`는 산출물을 보존한 채 새 attempt를 띄우고, `폐기`는
  산출물을 버린다 — 두 버튼의 차이는 이것 하나다.
- **D2. `retry_wait` 폐기 = 사다리 포기.** D1과 같은 lifecycle에 더해, attempt 정산 시 그
  bead의 env lineage를 닫는다(`closeRetryLineage`). 마지막 lineage였다면 env hold가 스스로
  풀린다(reducer `reduceRetrySucceeded`의 기존 규칙). 타일은 foot `폐기`만 그린다 — 재시도는
  사다리가 자동으로 하고 `지금 재시도`는 큐 상단의 조작이므로 타일에 두 번째 조작을 만들지
  않는다.
- **D3. 정합 원칙.** `DISCARDABLE_ATTEMPT_STATUSES` = running-lane 타일이 `.rtile__discard`를
  그리는 status 전부 = `{running, paused, failed, orphaned, done, parked, retry_wait, waiting}`.
  `discardProjection`의 `action`은 `!external && !done`이라 running-lane 타일은 전부 버튼을
  얻으므로, 이 집합이 `HELD_STATUSES` ∪ 기존 집합과 같아야 "그려지되 거절되는" 조합이 없다.
- **D4. PR을 가진 parked.** `parked`는 정의상 정산 시점 `pr_url` 부재다(ADR 0017). attempt
  `verify_result`나 `pr_wait`에 기록된 PR이 있으면 `observeAndClosePr`의 기존 규칙(OPEN →
  close, MERGED → 원복 PR)을 그대로 따른다. 사람이 손으로 연 PR은 `resolvePrRef`가 모르므로
  관측을 건너뛰고, 원격 브랜치 삭제가 GitHub에서 그 PR을 닫는다 — `failed` 폐기와 같다.

## 4. 서버

### 4.1 `discard-coordinator.js`

- `DISCARDABLE_ATTEMPT_STATUSES`에 `'parked'`, `'retry_wait'`를 더한다. 주석은 D3의 정합
  원칙(집합 = 버튼을 그리는 status 전부)을 한 문장으로 적고 이 스펙을 가리킨다.
- `captureSource`의 나머지 판정(leaf·latest·identity·topology·PR·authority)은 손대지 않는다.
  `parked`·`retry_wait`는 세션이 이미 끝난 attempt라 `process_identity`가 있으면
  `terminateRunner`의 probe가 `gone`을 답하고 신호 없이 `finalizeDiscardAttempt`로 간다 —
  `failed`와 같은 경로다.
- phase 순서(`requested → backup_verified → runner_terminated → pr_closed → worktree_removed →
  local_ref_removed → remote_ref_removed → phase_children_deleted → parent_reset → done`)는
  불변.

### 4.2 `scheduler.js finalizeDiscardAttempt`

`status: 'discarded'` 패치와 `revertStamps` 사이에, 정산 전 레코드의 `status`가
`'retry_wait'`였으면 `closeRetryLineage(workspace, attempt.bead_id)`를 호출한다.

- `closeRetryLineage`는 lineage가 없으면 no-op, 있으면 `retry_succeeded` 이벤트로 제거하고
  `armRetryTimer`를 다시 잰다. 새 이벤트 종류는 만들지 않는다 — 이 함수의 헤더 주석이 이미
  "ANY non-env outcome closes the lineage"라고 적고 있고, 폐기는 그 결말 중 하나다.
- `parked`·`waiting`은 정산 시점에 이미 lineage를 닫았으므로(`settleFailureTier`) 여기서
  다시 부를 필요가 없다. `retry_wait`만이 lineage를 살려 둔 채 끝나는 상태다.
- 판정은 `finalizeDiscardAttempt`가 이미 읽는 `attempt`(정산 전 스냅샷)의 `status`로 한다.
  `discarded` 패치 뒤의 레코드로 판정하면 언제나 거짓이다.
- `readTransferredAttempt` 분기(이관된 레코드)는 `retry_wait`에 닿지 않는다 — `retry_wait`는
  processed-terminal이 아니라 `queue.json`을 떠나지 않는다.

### 4.3 폐기 뒤의 bead

- `completeDiscardOperation`이 `removeFromLanes`와 `dismissed_at`을 쓴다. bead는 후보 레인에
  다시 나타나고 `settledAttemptFence`는 `discarded`를 fence하지 않는다. 사용자가 대기 레인으로
  옮기면 admission을 다시 통과한다.
- `parked` 출처: admission이 `awaiting_user`로 거절해 후보 카드에 그 사유가 선다. 결정 쓰기가
  키를 지우면 보통 dispatch다. `onIssuesChanged`의 파킹 재개 규칙은 `status === 'parked'`
  레코드만 보므로 `discarded`가 된 레코드는 그 규칙에서 빠진다 — 두 경로가 동시에 뜨지 않는다.
- `retry_wait` 출처: lineage가 닫혔으므로 `runDueRetries`가 그 bead를 다시 고르지 않는다. env
  hold가 남아 있으면(다른 lineage) 보통 dispatch는 hold 규칙대로 막힌다.

## 5. 프런트

### 5.1 `running-grid.js heldBodyTemplate`

`kind === 'retry_wait'` 분기가 `''`를 반환하던 것을, foot `폐기`만 담은 블록으로 바꾼다:

```js
if (kind === 'retry_wait') {
  return html`<div class="rtile__foot">${discard_button}</div>`;
}
```

- 요약 줄·이력 블록은 그리지 않는다. 뱃지 `↻ 재시도 대기 n/3 · HH:MM`이 이미 상태를 말하고
  (UI-5ym8 §6), `retry_wait`에 본문을 요구하는 스펙이 없다(fail-quiet).
- `discard_button`은 `runningTile`이 만든 같은 `.rtile__discard`다. 두 번째 조작을 만들지
  않는다(헤더 주석의 기존 규칙).
- `parked`·`waiting` 본문은 그대로다.

### 5.2 슬롯

`폐기`는 카드 문법 §5.1 슬롯 6(액션 foot)의 기존 항목이다. 새 라벨·칩·뱃지·슬롯은 없다.
`retry_wait` 타일은 그 foot을 처음 얻는 것이지 자리를 새로 고르는 것이 아니므로 카드 문법
스펙은 갱신하지 않는다.

### 5.3 `lane-model.js`

변경 없음. `discardProjection`은 이미 모든 running-lane 타일에 `action: true`를 준다.

## 6. 검증 bundle

- `server/worker/discard-coordinator.test.js` — `describe('worker discard source eligibility')`에
  두 케이스 추가: `status: 'parked'`(`cause: 'session_parked'`, `awaiting_user_present: true`)와
  `status: 'retry_wait'`(`retry: {cause, attempts: 1, max: 3, next_at, origin_attempt_id}`)
  attempt가 `discard()`에서 `{ ok: true, operation_id }`를 받는다. 기존 `waiting` 케이스와 같은
  형태(`setup()` 뒤 `updateAttempt`).
- `server/worker/scheduler.test.js` — `finalizeDiscardAttempt`가 `retry_wait` attempt를
  정산하면 그 bead의 lineage가 `queue.lineages`에서 사라지고, 그것이 마지막 lineage였으면
  `queue.hold`가 `null`이 된다. 대조: `failed` attempt 정산은 lineage를 건드리지 않는다.
- `app/views/worker/running-grid.test.js` — `retry_wait` 타일 foot에 `.rtile__discard`가
  하나 있고 `.rtile__parked-retry`는 없다. 기존 "badges a retry_wait attempt" 픽스처를 쓴다.
- `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) · `npm run lint` ·
  `npm run prettier:write` → `npm run build`(`app/main.bundle.js`·`.map` 포함).
- 실제 Worker 화면: `parked` 타일 `폐기`가 `attempt_not_discardable` 없이 진행되고 bead가 후보
  레인에 `awaiting_user` 사유로 서는 스크린샷 — 재현 재료가 없으면 보고서에 그 사실만 적는다.

## 7. 구현 unit 후보

한 unit이다. 서버 두 줄(집합·lineage 훅)과 프런트 한 분기가 같은 정합 원칙 하나를 구현하므로
나눌 근거가 없다.

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

형제·발견 행 없음.

겹침(front-matter `scope`가 교차하는 비-`closed` Bead — 발행 전 수동 프로브):

| Bead | 상태 | 공유 경로 | 관계 |
| --- | --- | --- | --- |
| `UI-h6t1` | open | `scheduler.js` | 다른 함수. h6t1은 `recordReceiptCheck`의 exec_receipt 판정·로그이고, 이 스펙은 `finalizeDiscardAttempt` 한 곳이다 |
| `UI-jr8v` | deferred | `server/worker/`, `app/views/worker/` | 다른 절. jr8v는 공급자 장애를 `holdAttempt`·`provider_hold`로 보류하고, 이 스펙의 lineage 닫기는 env 사다리(`queue.lineages`)만 건드린다. jr8v가 새 held 상태를 더한다면 D3 정합 원칙대로 그 상태도 `DISCARDABLE_ATTEMPT_STATUSES`에 넣어야 한다 — 그 스펙이 흡수할 조정이다 |
| `UI-ww5s` | deferred | `scheduler.js` | 다른 함수. ww5s는 `conflictPrompt`/`resolveConflict`의 self-review 결속이다 |

관찰 줄:

- 관찰: 워크트리가 만들어지기 전 spawn 실패(`spawn_failed`, `codex_home_prepare_failed`)로
  `retry_wait`가 된 attempt는 `captureSource`가 topology 부재 → `source_branch_unknown`으로
  거절한다 — 사다리 소진 뒤 `failed`가 된 같은 attempt도 똑같이 거절되는 기존 한계라, 잔여물
  없는 폐기(archive·브랜치 단계 생략)는 이 스펙이 정하지 않는다. 재관측 시 admission 재판정.
- 관찰: `runDueRetries`가 대기 레인 밖의 lineage를 `retry_deferred` 없이 `continue`하는 것은
  D2가 폐기 경로에서 막지만, 사용자가 `retry_wait` bead를 대기 레인에서 후보로 끌어낸
  경우에도 같은 헛돎이 남는다 — 이 Bead의 출처 밖이라 범위에 넣지 않는다.

## 결정 (ADR 후보)

- held 타일 `폐기`는 실패 타일과 같은 unified discard이며 Worker는 `awaiting_user`를 해제하지
  않는다 — 되돌리기 어려움: 불성립(집합 한 줄과 훅 한 줄이며 계약 키는 건드리지 않는다) /
  맥락 없이 놀라움: 성립(폐기해도 `awaiting_user`가 남아 후보 카드가 그 사유로 선다) / 실제
  트레이드오프: 성립(Worker가 지우면 곧바로 재디스패치되지만 계약의 "결정 쓰기와 같은 write"
  규칙을 깬다). 세 조건 중 하나가 불성립이라 ADR로 올리지 않는다.
- `retry_wait` 폐기가 env lineage를 닫는다 — 되돌리기 어려움: 불성립 / 맥락 없이 놀라움:
  불성립(`closeRetryLineage` 헤더가 이미 "비-env 결말은 모두 lineage를 닫는다"고 적고 있다) /
  실제 트레이드오프: 불성립. ADR 아님.
