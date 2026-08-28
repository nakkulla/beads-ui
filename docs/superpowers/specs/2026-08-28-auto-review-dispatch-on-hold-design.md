---
scope:
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/review-session.js
  - server/worker/attach.js
  - server/worker/scheduler.js
  - server/worker/completion-intent.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/data/worker-queue-store.js
---

# 머지 큐 `impl_review` 부재/stale 보류 시 리뷰 lineage 세션 자동 dispatch(head당 1회) — `[리뷰 후 머지]` 경로 재사용 (UI-qksl)

## 1. 배경과 문제

UI-d7fy(2026-08-27, `2026-08-27-head-review-layer-removal-design.md`)는 head-review
큐 계층을 제거하고, 영수증 부재/stale 보류의 출구를 **`[리뷰 후 머지]` 버튼 하나**로
정했다(결정 3). 그 결과 `impl_review`가 없거나 stale인 PR은 사람이 버튼을 누를 때까지
큐에 머문다.

UI-5ym8(2026-08-28)이 세션 파킹 결말을 실패가 아니라 대기로 재분류하면서, "세션이
PR은 만들었지만 영수증 없이 끝난" 행이 정상 결말로 늘어난다 — impl gate REVISE 파킹,
codex 환경 장애로 리뷰 레그가 못 뜬 경우, 턴 한도 등. 이 행들은 모두 같은 자리(리뷰
보류)에서 같은 동작(리뷰 lineage 1회)을 기다리는데, 지금은 매번 사람이 눌러야 한다.

dotfiles-01no(closed, PR #456)가 계약을 먼저 정정했다. `workflow-contract.md:102`와
`workflow-state.yaml manual_merge_continuation.auto_review_dispatch`가 지금 정한 것:

- 영수증 부재/stale 보류에서 큐는 durable claim
  `review_dispatch={head_sha, attempt_id, state:'active'|'exhausted', at}`를 행에 기록하고
  **같은 리뷰 lineage를 head당 1회** 자동 dispatch한다(`per_head: 1`).
- `active` 동안 어떤 경로도 재dispatch하지 않는다. 세션 자신의 REVISE 수정 push로
  head가 움직여도 같은 lineage의 exact-delta self-review다.
- 영수증 write가 claim을 지운다. 세션이 영수증 없이 끝나거나 dispatch가 실패하면
  `exhausted` — 보류는 유지되고 다시 자동 dispatch하지 않는다. `[리뷰 후 머지]`는
  같은 lineage를 resume한다(`button_role: resume_same_lineage`).
- 큐 밖에서 head가 이동해 `non_ancestor`가 되면 claim 없는 새 lineage이므로 자동 1회.
- 자동 dispatch와 버튼은 **같은 세션 모양**이다(`review_after_merge_click` 블록 그대로:
  `session_resume`, `bead_session_ref_last_claude_else_fresh`, `review_lineage_no_merge`,
  허용/금지 write, 머지는 큐 소유, 영수증 current면 최종 head로 authority 재결속).

beads-ui는 이 계약의 소비자다(AGENTS.md). 이 스펙은 새 계층을 만들지 않고 UI-d7fy §5의
`review-session.js`·`enqueueMergeManual`·`settleReviewSession`·`dispatchReviewSession`을
큐가 자동으로 한 번 누르는 배선과 claim 저장만 더한다.

## 2. 사용자 결정 (2026-08-28)

1. **자동 dispatch 앞의 fence는 ADR 0015의 충돌 해소 fence를 재사용한다.** 수동
   authority 행은 면제·즉시 dispatch, 자동(auto_merge enrollment) authority 행은
   워크스페이스 실행 슬롯 여유가 있을 때만. 슬롯이 없으면 claim 없이 대기하고 보류
   사유로 표시하며 다음 `kick()`에서 재판정한다.
2. **claim 뒤의 dispatch 실패는 전부 `exhausted`다.** launch 거부·spawn 오류·환경성
   거부를 구분하지 않는다(계약 문구 그대로). 보류 유지, 사유 표시, `[리뷰 후 머지]`가
   출구.
3. **착지 순서: UI-5ym8 머지 뒤.** UI-5ym8(in_progress)이 `queue-store.js`·`scheduler.js`를
   함께 수정하므로 `blocks` 의존을 걸고 그 머지 base에서 구현한다. spec 리뷰는 지금
   진행한다.

UI-d7fy 결정 3("자동 dispatch 대신 버튼")은 계약 정정에 따라 이 스펙이 supersede한다.
UI-d7fy §5의 버튼 자체·세션 범위·완료 판정·취소는 그대로다.

## 3. Durable 상태

### 3.1 `MergeQueueEntry.review_dispatch` (queue-store.js)

```js
/**
 * @typedef {Object} ReviewDispatchClaim
 * @property {string|null} head_sha - claim이 잡힌 head (40hex 소문자). exhausted 전이
 *                                 시 §5.2 규칙으로 갱신되며, null은 "최종 head 미확정 —
 *                                 어느 head에도 자동 dispatch 없음"(fail-closed)이다.
 * @property {string} attempt_id - 그 lineage의 review_session attempt.
 * @property {'active'|'exhausted'} state
 * @property {number} at         - 마지막 전이 시각.
 */
```

- `normalizeMergeQueue`가 정규화한다: 모양이 어긋나면(필드 누락·`head_sha`가 40hex도
  null도 아님·state enum 밖·`active`인데 null) 필드를 버린다(오류 아님). 구형 `queue.json`에는 없으므로 부재가 정상이다.
- `MergeHold`에 선택 필드 `auto_review_wait: 'slot'|null`을 더한다 — 결정 1의 "슬롯이
  없어 대기 중"을 화면에 투영하기 위한 유일한 durable 표시다(ADR 0015 "슬롯 부재
  보류는 화면 보류 사유로 투영"). `setMergeHold` 입력에서 이 필드가 **생략**되면 기존
  값을 보존하고, 명시된 값이 기존과 다를 때만 write한다. `holdEntry`의 선행 보류
  write는 이 필드를 생략해 보존하고, fence 판정 결과(`'slot'` 또는 `null`)를 그 뒤의
  write에 명시한다 — 같은 결과가 반복되면 write·revision·이벤트가 없다(§4 5번).
- 클라이언트 typedef `app/data/worker-queue-store.js` `WorkerQueueSnapshot.merge_queue[]`에
  `review_dispatch?: ReviewDispatchClaim|null`을 추가한다.

### 3.2 attempt

새 kind·상태 없음. 자동 dispatch의 attempt는 `kind:'review_session'`, **`origin:'auto'`**
(enum에 이미 있음), 그 외 필드는 클릭 attempt와 같다. `app/views/worker/lanes.js`
`reviewSessionAttemptBadges`가 이미 `origin==='auto'`를 `'리뷰 · 자동'`으로 읽는다.

### 3.3 claim은 클릭에도 쓴다

`enqueueMergeManual(…, { review_session })`이 `review_session` attempt를 등록하는 그
CAS 안에서 `entry.review_dispatch = { head_sha: authority.head_sha, attempt_id, state:'active', at }`
를 함께 쓴다. 이유: "head당 1회"의 주체는 **lineage**이지 트리거가 아니다. 클릭 세션이
head X에서 실패한 직후 큐가 같은 X에 자동 dispatch를 한 번 더 하면, 사용자가 방금
본 실패를 기계가 반복하는 것이고 계약의 "one external reviewer per lineage"를
어긴다. 클릭·자동 어느 쪽이든 claim이 X에 `exhausted`로 남으면 X에는 자동 dispatch가
없고, 버튼만이 lineage를 다시 resume한다(그때 claim은 새 attempt_id로 `active`가 된다).

**클릭과 자동 attempt의 경합.** 지금 `enqueueMergeManual`은 automatic authority를 manual로
교체한 **뒤에** in-flight `review_session`을 검사한다. 자동 attempt가 등록된 직후 클릭이
오면 authority id가 바뀌어 그 attempt의 결속(`bindingAlive`)이 끊기고, 새 attempt는
만들어지지 않아 `active` claim과 종단되지 않는 attempt가 남는다. 정정: 모든 클릭 경로에서
그 Bead의 `pending|running` `review_session` 유무를 authority·hold·claim 변경 **이전**에
검사하고, 있으면 authority(source가 무엇이든)·hold·claim을 건드리지 않는 완전한 no-op
(`{ok:true, review_session_registered:false, reason:'review_session_in_flight'}`)으로
돌려보낸다. UI 버튼 잠금(§6)은 그 위의 편의일 뿐 서버 no-op이 정본이다.

## 4. 자동 dispatch 판정 (merge-queue.js)

판정 자리는 `holdEntry(bead_id, reason, head_sha)` — 게이트가 보류 사유를 낸 그 턴이다.
매 `kick()`이 보류 행을 재판정하므로 별도 감시자·타이머가 없다.

`holdEntry`는 보류 write 뒤에 아래 순서로 판정하고, 조건이 하나라도 어긋나면 아무것도
dispatch하지 않는다(로그만).

1. `reason ∈ HOLD_REASONS`일 때만. 계약 102행은 missing·malformed·`non_ancestor`·
   `probe_error` 넷을 모두 보류+자동 dispatch 대상으로 정하므로, `HOLD_REASONS`를
   `review_receipt_missing|stale|invalid|undetermined` 넷으로 맞추고(`review_receipt_invalid`는
   지금 일반 거부→`failAndDequeue`인데 보류로 옮긴다) `REVIEW_AFTER_MERGE_GATE_REASONS`를
   같은 집합으로 통일한다 — 버튼도 넷 모두에 나타난다. UI-d7fy §5.1이 `undetermined`를
   제외한 근거("probe 오류는 판정이 아니다")는 유지되지만, 리뷰 세션이 head에 정확히 쓴
   새 영수증은 `equal`로 probe 없이 판정되므로 지속적 probe 오류의 유일한 출구가 리뷰
   lineage다 — 계약이 그렇게 정한 이유이며 이 스펙이 §5.1의 그 제외를 supersede한다.
   `spec_id_missing`은 리뷰 상태가 아니므로 여전히 제외. `head_sha`가 40hex가 아니면
   제외. `completion-intent.js` `COMPLETION_FAILURE_POLICY`에 `review_receipt_invalid:
   'metadata_watch'`를 추가해(다른 셋과 같은 부류) 보류가 `needs_human`으로 종단되지
   않게 한다.
2. 행에 `authority`가 있어야 한다. authority 없는 legacy 행은 dispatch하지 않는다 —
   자동 dispatch는 **authority를 새로 부여하지 않고 source도 바꾸지 않는다**(클릭만이
   manual authority를 만든다). 이 행의 출구는 버튼이다.
3. 이 Bead에 `pending|running` `review_session` attempt가 없어야 한다(per-Bead in-flight
   가드, UI-d7fy §5.2와 같은 사실). 있으면 `active` claim이 누구 것이든 no-op — 세션
   자신의 REVISE push로 head가 이동한 경우가 여기 걸린다.
4. claim 판정: `review_dispatch`가 없거나 `review_dispatch.head_sha`가 40hex이면서
   `!== head_sha`일 때만 dispatch. 같은 head에 `exhausted`면 no-op(버튼이 출구).
   `exhausted`이고 `head_sha === null`(§5.2 fail-closed)이면 head와 무관하게 no-op. 같은
   head에 `active`인데 3의 attempt가 없으면 기록 불일치(재시작 회복 누락)이므로
   `exhausted`(head 유지)로 정정만 하고 dispatch하지 않는다.
5. fence(결정 1): `authority.source === 'manual'`이면 면제. `'automatic'`이면
   `deps.reviewDispatchBlocked(bead_id)` → attach가 기존
   `scheduler.queueConflictBlocked(workspace, bead_id, bead_id)`에 배선한다(subject = 이
   Bead; 이 Bead는 pr_wait이라 자기 슬롯을 쓰지 않는다). blocked면
   `setMergeHold`로 `hold.auto_review_wait='slot'`을 명시해 쓰고 끝낸다(이미 `'slot'`이면
   write 없음, §3.1). 통과하면 `null`을 명시해 지운다; 1~4번에서 탈락해 판정이 끝나는
   경우와 `releaseHold`도 `null`로 지운다. 반복 blocked `kick()`은 revision도 이벤트도
   만들지 않는다 — 그렇지 않으면 queue-changed → `hasHeldEntry()` → 드레인 → 같은
   write의 무한 재판정이 된다. 슬롯이 비면 attempt 종료가 큐 변경 이벤트를 내고
   `hasHeldEntry()`가 드레인을 요청하므로(현 `kick()` 배선) 추가 깨움이 필요 없다.
6. 통과 시 `reviewSession.startAuto({ bead_id, head_sha, head_ref, reason })`(§4.1)를
   호출한다. 결과와 무관하게 이 턴은 `held_this_pass`에 남는다.

### 4.1 `review-session.js` `startAuto`

기존 `start`(클릭)와 세션 선택·프롬프트·launch·launch 실패 처리를 공유하고, 차이는
저장 연산 하나뿐이다.

- 클릭 `start`: `enqueueMergeManual`이 manual authority 부여 + attempt 등록 + claim을
  한 CAS로 커밋.
- 자동 `startAuto`: 새 저장 연산
  `claimAutoReviewDispatch(workspace, { bead_id, attempt_id, session_source, expected: { authority_id, authority_source, hold_reason, head_sha } })`가
  **행의 기존 authority id에** `review_session` attempt(`origin:'auto'`, `status:'pending'`,
  `authority_id`, `head_sha`, `continuation_mode`)를 등록하고
  `review_dispatch={head_sha, attempt_id, state:'active', at}`를 쓴다 — 한
  `applyUnconditional` 안에서. `expected`는 §4 판정 시점의 사실이며, write 안에서
  행의 현재 `authority.id`·`authority.source`·`hold.reason`·`hold.head_sha`가 **넷 다
  일치**할 때만 기록한다 — 판정과 write 사이의 metadata read(`bd`) 동안 다른 클릭이나
  재관측이 authority·hold를 바꿨으면 옛 head를 새 authority에 묶는 셈이므로
  `{ok:false, reason:'claim_input_stale'}`로 거부하고 다음 `kick()`이 다시 판정한다.
  §4의 2·3·4 조건도 같은 write에서 재검사한다(`authority_missing`·
  `review_session_in_flight`·`review_dispatch_claimed`). write 실패면 dispatch
  없음(UI-d7fy 속성 1과 동일).
- write 성공 뒤 `scheduler.dispatchReviewSession`을 클릭과 같은 인자로 호출한다.
  `pr_url`은 클릭 경로에서도 probe가 싣지 않으므로 프롬프트의 `(URL 미상)`이 그대로다;
  `head_ref`는 게이트 결과(`MergeClickResult.head_ref`)에서 받아 워크트리 복원에 쓴다.
- 프롬프트는 트리거를 사실대로 적는다. `reviewSessionPrompt(input)`에
  `trigger: 'click'|'auto'`를 더하고, 인가 문장을 갈라 쓴다 — `click`: 기존 문장("beads-ui
  `[리뷰 후 머지]` 클릭이 이 세션을 인가했다. 그 클릭은 세션 밖 human 액션이며 리뷰 진입
  승인이다"); `auto`: "beads-ui 머지 큐가 durable `review_dispatch` claim으로 이 세션을
  인가했다(workflow 계약 `auto_review_dispatch`, head당 1회). 사람의 클릭은 없었다".
  authority의 종류를 세션에 설명하지 않는다(세션은 authority를 알 필요가 없다). 세션
  선택·범위·허용/금지 write·완료 판정은 두 트리거가 공유한다.
- `dispatchReviewSession`은 리뷰 세션에도 구현 세션과 같은 pre-push hook(`installGuardHook`,
  UI-8mvc §2)을 설치한다. 지금은 설치하지 않아 push 기록(`pushes.jsonl`)이 없다. 설치
  이유 둘: (1) §5.2의 "세션 소유 head 이동" 판정이 이 기록을 증거로 쓴다; (2) 계약이 금지한
  base ref push를 hook이 거부한다(리뷰 세션의 허용 write는 PR head 브랜치뿐이다).
- launch 실패(`dispatched.ok !== true`·throw)는 클릭과 같이
  `settle(attempt_id, {outcome:'failed', from:'launch', cause:'launch_failed:<reason>', hold_reason: reason, final_head_sha: head_sha, head_moved_by_session: false})`
  — 결정 2에 따라 `bead_running`·`bd_snapshot_failed`·`worktree_*`·spawn 오류를 구분하지
  않고 모두 `exhausted`가 된다(§5.2).

`complete`(완료 판정)는 두 트리거가 같은 코드를 쓴다 — attempt의 `origin`으로 갈라지는
분기는 없다. receipt-less 종료에서 최종 head를 재관측하고 push 기록을 읽는 변경은 §5.2에
있으며 두 트리거에 똑같이 적용된다.

## 5. claim 전이

### 5.1 `active` → 삭제

- `settleReviewSession` `outcome:'current'`: authority 재결속과 `hold` 삭제를 하는 그
  write에서 `delete entry.review_dispatch`. 영수증이 최종 head에 current이므로 lineage가
  닫혔다.
- 행 제거(dequeue·취소·머지 완료)는 필드를 통째로 가져간다. 영수증이 세션
  밖(사람, 다른 경로)에서 써져 게이트가 `eligible`이 되면 큐가 머지하고 행이 떠나므로,
  계약의 "the receipt write clears the claim"은 큐 입장에서 이 경로다.
- `releaseHold`는 지금처럼 `hold`만 지우고 claim은 **남긴다**. 같은 head에서
  `mergeability_unknown` 같은 일시적 비보류 판정이 끼었다가 다시 `review_receipt_missing`
  보류로 돌아오는 경우, claim이 지워졌다면 같은 head에 두 번째 자동 dispatch가 열린다 —
  head당 1회는 claim이 head에 붙어 있어야 지켜진다.

### 5.2 `active` → `exhausted`

`settleReviewSession` `outcome:'failed'`(launch 실패·`receipt_not_current`·
`session_failed:*`·재시작 회복의 `cause`·취소 아닌 모든 실패)에서, attempt_id가
`review_dispatch.attempt_id`와 같으면 `state:'exhausted'`, `at`를 쓰고 `head_sha`를 아래
규칙으로 정한다. 호출자는 `final_head_sha`(관측된 최종 head 또는 null)와
`head_moved_by_session: true|false|null`(null = 판정 불가)을 함께 넘긴다.

- claim head == final head → 그대로.
- final head ≠ claim head이고 `head_moved_by_session === true` → `head_sha := final head`.
  세션이 REVISE 수정을 push한 뒤 영수증을 못 쓰고 죽은 경우다. claim을 X에 두면 다음
  `kick()`이 X'를 "claim 없는 새 head"로 읽어 같은 lineage에 두 번째 외부 리뷰를 보낸다.
- final head ≠ claim head이고 `head_moved_by_session === false` → claim head **유지**.
  세션 실행 중 큐 밖의 이동(외부 force-push·base 동기화)이며 새 lineage다. 다음 `kick()`이
  X'에서 §5.3대로 새 claim·자동 1회를 연다.
- final head를 관측하지 못했거나(`final_head_sha` null) `head_moved_by_session === null`
  (push 기록 부재·읽기 실패) → `head_sha := null`. **fail-closed**: §4 4번은
  `head_sha === null`인 `exhausted` claim을 "어느 head에도 자동 dispatch 없음"으로 읽는다.
  출구는 버튼뿐이고, 버튼 클릭이 새 `active` claim을 쓰면서 해소된다(§3.3).

`head_moved_by_session`의 증거는 그 attempt의 pre-push 기록이다(§4.1에서 설치;
`guardHook.readPushLog({workspace, attempt_id})`). final head가 기록된 push oid 중 하나면
`true`, 기록이 읽히는데 없으면 `false`, 기록이 없거나 읽기 실패면 `null`.

`complete()`는 이 판정을 위해 **receipt-less 종료 모두**에서 최종 head를 재관측한다.
지금은 `session_ok !== true`면 재관측 없이 `session_failed:*`로 settle하므로, 그 분기도
`observeReviewReceipt`를 먼저 부르고(실패면 `final_head_sha: null`) push 기록을 읽어
`head_moved_by_session`을 넘기도록 바꾼다. `receipt_not_current` 분기도 같은 두 값을
넘긴다. launch 실패는 세션이 뜨지 않았으므로 `final_head_sha: claim head,
head_moved_by_session: false`로 고정이다.

취소(UI-d7fy §5.6)는 attempt를 `failed: cancelled`로 종단하면서 행을 제거하므로 claim도
사라진다. 같은 Bead가 나중에 다시 큐에 들어오면(재클릭·재enrollment) 새 행은 claim이
없고, 그 head에 보류가 서면 자동 1회가 다시 열린다 — 취소는 사람의 의사이므로 새
lineage로 본다.

### 5.3 `exhausted` + 새 head → 새 claim

§4의 4번. 큐 밖 base 동기화로 head가 X''로 이동해 `non_ancestor` 보류가 서면
`review_dispatch.head_sha(X') !== X''`이므로 새 `active` claim을 쓰고 1회 dispatch한다
(계약 "new lineage with no claim"). 이때 옛 claim은 덮어쓴다 — 행당 claim은 하나다.

### 5.4 재시작

`attach` 부팅의 `recoverReviewSessions`는 고아 `review_session` attempt를
`settleReviewSession(outcome:'failed', cause)`로 종단한다. §5.2가 그 write에서 claim을
`exhausted`로 옮기므로 별도 마이그레이션이 없다. 부팅 시 `hold`가 있고 claim이 없는
행(이 스펙 배포 전부터 보류 중이던 행)은 다음 `kick()`에서 §4대로 1회 dispatch된다 —
의도된 동작이다.

## 6. 버튼과의 관계 (UI-d7fy §5 유지)

| 상황 | 버튼 | 클릭 효과 |
|---|---|---|
| claim `active`(자동 또는 클릭 세션 실행 중) | 잠김(기존 `review_session.active` 가드) | 서버 in-flight 가드가 authority·hold·claim 변경 전에 완전 no-op(§3.3) |
| claim `exhausted` | 활성, 옆에 종료 사유 | `enqueueMergeManual`: 새 attempt·새 `active` claim(§3.3), manual authority 재발급(`lastReviewSessionFailed` 기존 규칙) |
| 슬롯 대기(`hold.auto_review_wait='slot'`) | 활성 | 클릭은 manual authority라 fence 면제 → 즉시 dispatch |
| authority 없는 legacy 행 | 활성 | 기존 클릭 경로 |
| `review_receipt_invalid`·`undetermined` 보류 | 활성(§4 1번으로 버튼 집합 확장) | missing/stale과 같음 |
| claim `exhausted`·`head_sha===null`(fail-closed) | 활성, 사유 `최종 head 미확정` | 클릭이 새 `active` claim을 써 해소 |

버튼이 부여하는 authority·세션 모양·완료 판정·취소는 바뀌지 않는다.

## 7. 표시 (app/views/worker)

`lanes.js` `reviewSessionRowState`에 `origin`을 더한다:
`{ active, failure, origin: 'auto'|'click'|null }` — active면 그 attempt의 origin, 아니면
마지막 실패 attempt의 origin. `index.js` PR 대기 행:

- active + `origin:'auto'`: 진행 줄 게이트 뱃지 옆 텍스트 `자동 리뷰 세션 실행 중`,
  버튼 title `자동 리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다`.
- `review_dispatch.state==='exhausted'`: 기존 실패 사유 텍스트 앞에 `자동 리뷰 1회 소진 · `
  를 붙인다(클릭 세션 실패면 접두 없음). hold title 끝의 "`[리뷰 후 머지]`가 이 보류의
  출구입니다"는 그대로.
- `hold.auto_review_wait==='slot'`: 텍스트 `리뷰 세션 슬롯 대기`, title에 "실행 슬롯이
  비면 자동으로 리뷰 세션을 띄웁니다. 지금 클릭하면 즉시 띄웁니다".
- `index.js` 버튼 활성 조건의 게이트 사유 목록에 `review_receipt_invalid`·
  `review_receipt_undetermined`를 더하고, 877행 `review_receipt_invalid` 전용 뱃지와
  1318행의 "undetermined 제외" 주석은 §4 1번에 맞춰 정리한다.

카드 문법(AGENTS.md·스펙 §5.1 슬롯 표)상 이 텍스트는 모두 **진행 줄**의 게이트 뱃지 옆
자리이며 새 칩·새 슬롯을 만들지 않는다. 자동 attempt의 `'리뷰 · 자동'` 배지는 이미
있다.

## 8. 계약·ADR 정합

- 이 스펙이 소비하는 계약: `workflow-contract.md` "Worker manual merge continuation"
  (102행), `workflow-state.yaml manual_merge_continuation.auto_review_dispatch`·
  `review_after_merge_click`. 계약 키·어휘를 추가하지 않는다(`workflow_metadata_keys:
  unchanged`; 큐 내부 durable 필드 `review_dispatch`·`hold.auto_review_wait`는
  `authority_owner: beads_ui_queue_internal_durable_state`).
- ADR 0005(자동 AI 수리 레인 폐기)와 충돌하지 않는다: 0005는 **post-merge** 실패의
  자동 수리를 배제한다. 리뷰 보류는 pre-merge 게이트 상태이고 completion
  `needs_human`이 아니다(UI-d7fy §3.5). 이 스펙은 수리 세션을 두지 않는다 — 리뷰
  lineage 1회이며 REVISE 처리는 계약의 단일 패스 규칙 안에서 세션이 한다.
- ADR 0015(슬롯 fence)를 같은 predicate로 재사용한다(결정 1).
- ADR 0004(ancestry 신선도)와 무관 — 게이트 판정(`evaluateMergeGate`)은 바뀌지 않는다;
  바뀌는 것은 `review_receipt_invalid` 판정에 대한 큐의 처리(거부→보류)뿐이다.
- 계약 102행의 네 사유(missing·malformed·`non_ancestor`·`probe_error`)를 모두 보류+자동
  dispatch 대상으로 구현한다(§4 1번). UI-d7fy §4의 "malformed 거부"와 §5.1의
  "`undetermined` 버튼 제외"는 이 스펙이 supersede한다.

### 8.1 스코프 겹침 (미종결 Bead·spec)

| Bead | 상태 | 교차 경로 | 관계 |
|---|---|---|---|
| UI-5ym8 | in_progress | `queue-store.js`·`scheduler.js`·`attach.js`·`app/views/worker/` | **선행(`blocks`)**. 같은 파일의 다른 절(큐 `hold`/`lineages` reducer·attempt status vs 이 스펙의 merge_queue 행 claim). 이 스펙은 UI-5ym8 머지 base에서 구현한다(결정 3). |
| UI-8wpb | open | `queue-store.js`·`scheduler.js`·`attach.js`·`app/views/worker/` | 같은 파일의 다른 절. UI-8wpb §7이 terminal attempt를 `attempts/<id>.json`으로 이관해도 이 스펙의 판정은 **비종결** attempt(in-flight 가드)와 행 수준 `review_dispatch`에만 의존하므로 영향이 없다. `reviewSessionRowState`의 "마지막 실패" 읽기는 UI-8wpb가 먼저 착지하면 그 합집합 reader(`readAttemptsForBead`)를 쓴다; 소진 표시 자체는 claim이 담당해 이관과 무관하다. |
| UI-jr8v | deferred | `server/worker/`·`app/views/worker/` | 다른 절. UI-jr8v §6 러너 단위 `provider_hold` 게이트가 착지하면 자동 리뷰 dispatch도 그 게이트에 걸려 launch 거부 → 결정 2대로 `exhausted`. 공급자 장애 중 자동 1회를 소비하는 셈이지만 버튼이 출구로 남고, 자동 재개 정책은 UI-jr8v가 소유한다. |
| UI-7uid | open | `scheduler.js` | 다른 함수(방향 질의 세션 기동 vs `dispatchReviewSession` 호출자). 방향 질의는 파킹된 구현 attempt에, 이 스펙은 pr_wait 행에 작동해 같은 Bead에서 동시에 성립하지 않는다. |
| UI-q1y7 | open | `app/views/worker/index.js` | 다른 절(후보 레인 인접 배치 vs PR 대기 행 진행 줄 텍스트). |
| UI-8x90 | open | `app/views/worker/index.js`·`lanes.js` | 다른 절. 이 스펙의 텍스트는 진행 줄 게이트 뱃지 옆 슬롯이며, UI-8x90이 먼저 착지하면 그 글리프+ID 라벨 문법을 따른다. |
| UI-ww5s | deferred(은퇴) | `merge-queue.js`·`queue-store.js`·`scheduler.js` | UI-d7fy가 폐기한 `resolver-self:` 경로의 spec. 이 스펙과 살아 있는 교차 없음(historical-read). |


## 9. 테스트

- `queue-store.test.js`
  - `claimAutoReviewDispatch`: 행의 기존 authority id에 `origin:'auto'` attempt와 `active`
    claim을 한 write로 등록; authority 없음·in-flight 있음·같은 head claim 있음 → 거부,
    아무것도 안 씀.
  - `enqueueMergeManual` + `review_session`이 claim도 함께 쓴다.
  - `settleReviewSession`: `current` → claim 삭제; `failed` → `exhausted`이며 `head_sha`는
    §5.2 네 갈래(동일/세션 이동→final/외부 이동→유지/불명→null); attempt_id가 claim과
    다르면 claim 불변.
  - `claimAutoReviewDispatch`: `expected` 넷 중 하나라도 어긋나면 `claim_input_stale`로
    거부하고 아무것도 쓰지 않는다.
  - `normalizeMergeQueue`: 모양 어긋난 `review_dispatch` 폐기, 구형 파일 로드 성공;
    `hold.auto_review_wait` 정규화.
- `merge-queue.test.js`
  - 보류 진입(`review_receipt_missing`)에서 manual authority 행은 즉시 `startAuto` 1회.
  - 같은 head에서 두 번째 `kick()`은 dispatch 없음(active); `exhausted` 뒤에도 없음.
  - head가 바뀌면(`non_ancestor` 보류) 새 claim·dispatch 1회.
  - in-flight `review_session`이 있으면 head가 바뀌어도 dispatch 없음.
  - automatic authority 행은 `reviewDispatchBlocked=true`면 claim 없이
    `hold.auto_review_wait='slot'`, false로 바뀐 다음 `kick()`에서 dispatch.
  - `review_receipt_invalid`·`undetermined`도 보류·dispatch 대상; authority 없는 행 →
    dispatch 없음; `exhausted`+`head_sha===null` claim은 어떤 head에도 dispatch 없음.
  - 반복 blocked `kick()`(슬롯 없음)이 revision·queue-changed 이벤트를 만들지 않는다.
  - 자동 attempt 등록 직후의 클릭이 authority·hold·claim을 바꾸지 않는 완전 no-op이고
    attempt 결속이 유지된다(경합 테스트).
  - 같은 head에서 비보류 판정이 끼었다 다시 보류로 돌아와도(`releaseHold` 경유) claim이
    남아 dispatch가 없다.
- `review-session.test.js`
  - `startAuto`: write 실패 시 launch 없음; launch 실패 → `failed: launch_failed:*` +
    claim `exhausted`(head 유지); 성공 시 클릭과 같은 resume 선택, 프롬프트는
    `trigger:'auto'` 인가 문장.
  - `complete`: `session_ok=false`에서도 최종 head를 재관측하고 push 기록으로
    `head_moved_by_session`을 판정한다(세션 push → final, 외부 이동 → 유지, 기록 없음 → null).
  - `scheduler.test.js`: `dispatchReviewSession`이 pre-push hook을 설치한다.
- `attach.test.js`: `recoverReviewSessions`가 고아 자동 attempt를 종단하면 claim이
  `exhausted`.
- `lanes.test.js`·`index.test.js`: `reviewSessionRowState.origin`; 자동 실행 중·소진·슬롯
  대기 텍스트; 버튼 잠금은 기존 규칙 그대로.

## 구현 unit 후보

- `claim-store`: `queue-store.js` 필드·정규화·`claimAutoReviewDispatch`·
  `settleReviewSession`/`enqueueMergeManual` 경로의 claim 전이 + 클라이언트 typedef
- `queue-dispatch`: `merge-queue.js` `holdEntry` 판정·fence 배선, `review-session.js`
  `startAuto`, `attach.js` deps 배선
- `worker-ui`: `lanes.js` `reviewSessionRowState.origin`, `index.js` 텍스트

## 착지 순서

UI-5ym8(in_progress) → **UI-qksl**. 라우터가 `bd dep add UI-qksl UI-5ym8 --type blocks`를
걸고, 구현은 UI-5ym8 머지 base에서 시작한다. 이 스펙의 함수·필드 이름이 기준이며
UI-5ym8이 옮긴 위치는 구현 시 다시 잡는다.

## 결정 (ADR 후보)

- **리뷰 보류는 큐가 head당 1회 자동으로 리뷰 lineage를 dispatch해 해소를 시도하고,
  `[리뷰 후 머지]`는 그 lineage의 resume이다** — 되돌리기 어려움: 성립(durable claim
  필드와 attempt 이력이 남고, 계약 `auto_review_dispatch`가 이를 전제로 한다) /
  맥락 없이는 의외: 성립(ADR 0005 "자동 세션 dispatch 없음"과 나란히 놓이면 모순으로
  읽히며, pre-merge/post-merge 구분이 있어야 이해된다) / 실제 trade-off: 성립(무인
  AI 세션 비용·슬롯 점유 vs 사람이 누를 때까지 PR이 큐에 머무는 지연).
  `summary`: 영수증 부재·stale 보류는 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 실패·소진 뒤에는 [리뷰 후 머지]가 같은 lineage를 resume하며 post-merge 자동 수리 금지(ADR 0005)와는 별개다.
  supersede 대상 ADR 없음(UI-d7fy 결정 3은 ADR로 기록되지 않았다).

## 경계·후속

- 없음 — 계약 정정(dotfiles-01no)은 이미 닫혔고, 형제로 분리할 저장소·소유자가 다른
  작업이 없다.
