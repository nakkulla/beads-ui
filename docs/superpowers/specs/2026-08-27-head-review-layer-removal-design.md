---
scope:
  - server/worker/head-review.js
  - server/worker/head-review-transport.js
  - server/worker/attach.js
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/completion-intent.js
  - server/worker/scheduler.js
  - server/worker/merge-gate.js
  - server/ws/worker-handlers.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/monitor/lanes.js
  - app/utils/active-attempts.js
---

# head-review 큐 계층 제거 — 머지 리뷰 판정을 merge-gate `impl_review` ancestry로 단일화 (UI-d7fy)

## 1. 배경과 문제

UI-d13v(PR #220)에서 `[다시 머지]` 클릭이 11초 만에
`head_review.failure_reason=mutation_unproven`으로 실패했다(2026-08-27 08:42Z).
PR은 `MERGEABLE/CLEAN`이었고 `impl_review=codex@ef0ef80`은 관측 head `a25a0aa`의
조상이었다.

원인은 리뷰 신선도를 판정하는 계층이 둘이고 규칙이 다르기 때문이다.

| 계층 | 위치 | 규칙 |
|---|---|---|
| 머지 게이트 | `server/worker/merge-gate.js` `reviewReceiptState`/`evaluateMergeGate` | 영수증 SHA가 head와 같거나 **조상**이면 유효(UI-vzyh §2) |
| head-review 큐 | `server/worker/head-review.js` + `head-review-transport.js` | enqueue 결속(`existing_current`)은 영수증 SHA == head **정확 일치**만; 이동은 큐 소유 변이(`resolver:`/`base_update`/`repair:`)로만 증명(`lineage`), 아니면 `mutation_unproven` |

세션이 직접 push한 base 동기화 머지는 큐 입장에서 외부 이동이라 증명이 불가능하고,
계약 문구("head 이동만으로는 재dispatch 없음")보다 코드가 좁게 구현된 상태다.
head-review 계층은 이 결속 외에도 외부 리뷰 자동 dispatch, REVISE findings digest →
bounded repair 사다리, `resolver-self:` 영수증 요구, journal 상태 5종·실패 사유
17종을 가진다(`head-review.js` 1,211줄 + transport 1,422줄 + 테스트 97개).

## 2. 사용자 결정

1. **B안**: 머지 자격의 리뷰 판정은 `merge-gate.js`의 "`impl_review` 존재 + ancestry"
   하나만 남기고 head-review 큐 계층을 통째로 제거한다.
2. 큐 소유 `resolver:` 충돌 해소 결과에 `resolver-self:` 영수증을 **요구하지 않는다**.
   해소 커밋도 일반 커밋과 같이 원 `impl_review`가 조상이면 통과하고 `[verify]`가
   기계 검증한다.
3. 영수증 부재/stale PR의 출구는 자동 dispatch가 아니라 **`[리뷰 후 머지]` 버튼**이다.
   클릭은 Bead에 기록된 세션을 resume해 **리뷰 lineage만**(리뷰, REVISE면 일괄 수정과
   exact-delta self-review까지; PR 브랜치 push만 허용) 수행시키고, 머지는 큐가 소유한다.
4. 계약 canonical(dotfiles)을 먼저 정정하고 beads-ui가 그 뒤에 착지한다.

## 3. 제거 범위 (beads-ui)

### 3.1 삭제 파일

- `server/worker/head-review.js`, `server/worker/head-review.test.js`
- `server/worker/head-review-transport.js`, `server/worker/head-review-transport.test.js`

### 3.2 `server/worker/attach.js`

- transport/driver 생성(현 1249–1296행)과 `createMergeQueue` 의존성 `headReview` 제거.
- `dispatchAutoHeadReview`(1446–1502행)와 `createCompletionActionDriver`의
  `dispatchAutoReview` 콜백 제거.
- `headReviewTransport.recordUpstreamViolation`/`readReceipt` 호출(1521–1528행),
  attachment 노출(1666행), 재시작 `reconcileAttempts`(1893–1895행) 제거.
- `stopWorkerHeadReviewAttempts` export 삭제; `server/ws/worker-handlers.js`의
  import·호출(4593행)과 취소 자격 판정의 `?.head_review` 읽기(4541–4548행)는 §5.6의
  `review_session` 취소 경로로 대체한다.

### 3.3 `server/worker/merge-queue.js`

- `ensureHeadReview` 래퍼(1266–1281행)와 두 호출 지점(1373–1409행, 1961–2009행) 제거.
- `captureStartingApproval` 호출과 `vouched` 스레딩(1754–1805행, 1396–1398행,
  1983–1985행) 제거. `resolution.kind === 'ready'`는 `vouched.mutation`을 세우지 않고
  바로 재관측으로 이어진다.
- 게이트 결과가 `review_receipt_missing|stale|undetermined`이면 큐 항목은 **보류(hold)**
  가 된다. 지금은 head-review가 없으면 이 사유가 일반 `refused`와 같이
  `failAndDequeue`(현 2064행)로 떨어지므로, 보류를 명시적으로 정의한다.
  - 저장: 큐 항목에 `hold: { reason, head_sha, since }`를 기록한다(`queue-store.js`
    `MergeQueueEntry`에 필드 추가, `normalizeMergeQueue`가 정규화). authority는 그대로
    남는다. terminal 실패·dequeue·needs_human 굳힘 없음.
  - 드레인: 보류 항목은 `halted_on_head`처럼 드레인을 멈추지 **않고** 건너뛴다. 같은
    드레인의 다른 항목은 계속 처리된다.
  - 재판정: 보류 항목은 매 `kick()`(PR 관측 pass·enrollment·completion 드라이버가
    이미 호출)마다 게이트를 다시 통과한다. 게이트가 `eligible`이면 `hold`를 지우고
    머지로 진행하고, 다른 사유면 `hold.reason`을 갱신한다. 추가 깨움: §5.4 리뷰 세션
    완료 판정이 `current`를 확인하면 즉시 `kick()`한다. runnable-cache의 Bead metadata
    갱신이 `impl_review` 변경을 관측하면 `kick()`한다(관측 경로가 없으면 다음 PR 관측
    pass가 상한이다).
  - `MergeClickResult.action`의 `'head_review'`·`review_state`(`pr-actions.js`
    117·134–135행)와 merge-queue의 `action === 'head_review'` 분기(2010–2029행) 삭제.
- `base_update` 1회 자동 정렬(1930–1959행)과 `dispatchConflict` 해소 경로는 그대로다.

### 3.4 `server/worker/queue-store.js`

- `HeadReview` typedef(617–635행), `normalizeHeadReview`, `beginHeadReview`,
  `openApprovedHeadReview`, `setHeadReviewState`, `enrolAutoReview` 삭제.
- `normalizeMergeQueue` 로드 시 기존 `queue.json`의 `entry.head_review`는 **읽고 버린다**
  (필드 무시, 오류 아님). 저장 시 쓰지 않는다. 재시작 마이그레이션은 §3.8.
- `upsertHeadReviewAttempt`는 `kind` 검사(`head_review|head_repair`)를 새 kind
  `review_session`(§5) 하나로 바꾸고 이름을 `upsertReviewSessionAttempt`로 정정한다.
- `MANUAL_MERGE_CONTINUATION`을 `{ schema_version: 2 }`로 올리고
  `head_review_projection` 필드를 삭제한다. 소비자(`server/health.js`,
  `server/worker/runtime.js`, `server/ws/worker-handlers.js`,
  `app/data/worker-queue-store.js` typedef, 관련 테스트 3개)를 같이 정정한다.

### 3.5 `server/worker/completion-intent.js`

- `decideAutoResolution`의 `head_review` 입력과 `approved|failed` 분기(256–261행,
  337–361행), `head_review` projection(529행), `dispatchAutoReview` 콜백(681·2254·2260행),
  재등록 가드의 `entry?.head_review`(1281행) 제거.
- 리뷰 사유는 completion intent를 `needs_human`으로 terminalize하지 않는다. 게이트 보류가
  유일한 표현이며 §5 버튼이 출구다. 리뷰 게이트 보류는 pre-merge 상태이지 completion
  실패가 아니므로, UI-8w4t(post-merge 완료 실패의 `needs_human` 종단·로그 인계)의 대상이
  아니다. UI-8w4t가 비목표로 남겨 둔 auto-review 분기(`dispatch_auto_review`, `head_repair`
  kind)가 이 스펙의 삭제 대상이며, 두 스펙은 서로 다른 실패 부류를 다룬다.

### 3.6 `server/worker/scheduler.js`

- resolver 세션 시스템 프롬프트의 `impl_review=resolver-self:...` 지시(6110–6136행)
  삭제. 해소 세션은 충돌 해소·push만 한다.
- `server/workflow-enrich.js`의 `parseResolverReceipt`와 `app/views/detail-panel/index.js`
  2014행 표시는 **과거 영수증 읽기용으로 유지**한다(`carry:`와 같은 historical-read).

### 3.7 유지하는 공유 자산

`merge-gate.js` 전체(`createAncestryProbe`, `reviewReceiptState`, `evaluateMergeGate`,
`GATE_BADGES`), `pr-actions.js`·`receipt-check.js`·`pr-poller.js`의 probe 사용,
`app/utils/active-attempts.js`의 점유 계산 구조.

### 3.8 업그레이드 마이그레이션 (재시작 1회)

배포 시점에 실행 중이던 head-review 상태가 남아 있을 수 있다. `attach` 부팅의 기존
reconcile 지점(현 `reconcileAttempts` 호출 자리)에서 아래를 한 번 수행하고 저장한다.

1. `attempts[*].kind ∈ {head_review, head_repair}`인 attempt를 모두 찾는다. 상태가
   running이면 기존 attempt 중단 경로(`stopAttempt` 상당)로 프로세스를 best-effort
   중단한다.
2. 그 attempt들을 `state: failed, reason: 'retired_kind'`로 종단한다. 새 kind enum에
   없는 값이 `implementation`으로 오인돼 레인을 점유하는 일이 없도록, `normalizeAttempt`는
   알 수 없는 kind를 `retired_kind` 종단으로 정규화한다.
3. 큐 항목의 `head_review` 필드를 제거한다. 상태가 `pending|reviewing|revising`이던
   항목은 authority를 유지한 채 §3.3 보류(`hold.reason = 'review_receipt_missing'`,
   다음 `kick()`에서 실제 사유로 갱신)로 옮긴다. `approved|failed`이던 항목은 필드만
   제거한다(게이트가 다시 판정).

테스트: 구형 `queue.json` 픽스처(running `head_review` attempt + `reviewing` journal)
로드 후 attempt가 `retired_kind`로 종단되고, 항목이 보류로 남으며, 저장 결과에
`head_review`가 없다.

## 4. 남는 머지 판정

`evaluateMergeGate` 순서를 바꾸지 않는다.

1. PR 관측 실패·닫힘 → 판정 불가/불가
2. `merge_conflicting` / `base_behind` / `mergeability_unknown` / `not_clean` → 보류
   (`base_behind`는 큐 `base_update` 1회, 충돌은 큐 `resolver:` 해소 경로)
3. `spec_id_missing` → 보류(metadata 정정으로만 해소)
4. **`impl_review` 존재 + ancestry**: `equal|ancestor` 통과, `non_ancestor` stale,
   `probe_error` fail-closed, `skipped`/malformed 거부
5. `receipt_unbacked` → 보류
6. `[verify]` 영수증(선언 시) exact head 결속

자동 enrollment(`auto_merge=true`)와 수동 `[머지]`·`[리뷰 후 머지]` 클릭이 같은 판정을
쓴다. 큐 소유 `resolver:` 해소 결과·`base_update` 결과·세션의 외부 push 모두 4번 규칙
하나로 판정한다.

## 5. `[리뷰 후 머지]` 버튼

### 5.1 표시 조건

게이트 사유가 `review_receipt_missing` 또는 `review_receipt_stale`인 PR 행.
`review_receipt_undetermined`(probe 오류)는 버튼 없이 재관측을 기다린다.
`spec_id_missing`은 리뷰로 해소되지 않으므로 버튼을 내지 않는다(UI-yqw9 사고 규칙).

### 5.2 클릭 동작

`enqueueMergeManual`(`queue-store.js`)은 지금 authority만 기록하고 attempt 입력을 받지
않으며, attempt upsert는 별도의 무조건부 write다. 따라서 이 저장 연산을 확장한다:
`enqueueMergeManual(workspace, { ..., review_session: { attempt_id, session_source } })`
가 **같은 CAS mutation** 안에서 (1) `[머지]`와 동일한 manual authority(재사용·재발급 규칙
동일)와 (2) `attempts[attempt_id] = { kind: 'review_session', state: 'pending',
authority_id, head_sha }`를 함께 커밋한다. write가 실패하면 아무것도 dispatch하지 않는다.
실제 세션 launch는 write 성공 **뒤에만** 일어나고, launch 실패는 그 attempt를
`failed: launch_failed`로 기록한다.

per-Bead in-flight 가드: 같은 Bead에 `pending|running` `review_session` attempt가 있으면
두 번째 클릭은 authority만 재사용하고 attempt를 만들지 않는다(no-op).

세션 선택은 REVISE 파킹 `fix` 처분(`server/worker/revise-disposition.js`)과 같은 규칙이다:
Bead `session_ref`의 마지막 `claude:` 항목을 `--resume`; transcript 부재·마지막 항목이
`codex:`·항목 없음이면 fresh 대체 세션. 리뷰어 선택(`impl_review_model`/`effort`)은
세션의 `review` 스킬 사다리에 맡기고 서버는 관여하지 않는다.

### 5.3 세션 범위와 프롬프트

세션 범위는 **리뷰 lineage**다: impl 리뷰 1회 → APPROVE면 영수증 write·readback으로
종료; REVISE면 워크플로 계약의 단일 패스 규칙대로 finding 전부 처분·일괄 수정·exact-delta
self-review 후 영수증 write·readback으로 종료. 수정은 **PR head 브랜치에만** 커밋·push할
수 있다. 머지·PR 상태 변경(close/draft/base 변경)·base ref push·큐 상태 파일 편집은
금지다. 머지는 큐가 한다. 이 범위는 dotfiles 계약의
`review_after_merge_click.scope: review_lineage_no_merge`와 동일한 정의다(§7).

프롬프트는 사실과 금지만 싣고 절차는 계약을 가리킨다.

- 인가: beads-ui `[리뷰 후 머지]` 클릭은 세션 밖 human 액션이며 리뷰 진입 승인이다.
- 사실: Bead ID, PR URL, PR head 브랜치명, 관측 head SHA, 현재 `impl_review` 값(또는
  없음), 게이트 사유, attempt id.
- 지시: 위 범위대로 수행하고 `impl_review` 영수증을 쓰고 `bd show --json`으로 readback한다.
- 금지: 위 금지 목록.

### 5.4 완료 판정

세션 종료 후 서버가 attempt 결속(attempt id·authority id)이 아직 살아 있는지 확인한 뒤,
PR head를 **다시 관측**하고 `impl_review`를 다시 읽어 `reviewReceiptState(receipt,
final_head)`로 판정한다. REVISE 수정이 push돼 head가 클릭 당시와 달라질 수 있으므로,
판정 대상은 클릭 head가 아니라 최종 관측 head다.

- `current` → 하나의 CAS로 (1) attempt를 `succeeded`로 종단하고 (2) authority의
  `requested_head_sha`를 최종 head로 **재결속**한다. 재결속은 manual authority가 그
  head에 부여하는 것(`receipt_unbacked` waiver 포함)을 그대로 옮긴다 — 클릭 head에
  묶인 채 두면 head 이동 후 `receipt_unbacked` 사례에서 waiver가 사라져 영구 보류가 되기
  때문이다. 그 뒤 `kick()`으로 즉시 재판정한다(§3.3).
- 그 외(`missing|stale|invalid|undetermined`) → attempt를 `failed: receipt_not_current`로
  종단하고 큐 항목 `hold.reason`을 갱신하며 버튼을 재활성한다. authority는 클릭 head에
  그대로 남는다.
- 세션 실패(launch 실패·transcript 소실 후 대체 실패·비정상 종료)는
  `failed: <cause>`로 기록하고 같은 방식으로 표시·버튼 재활성.
- 완료 처리 중 attempt 결속이 사라져 있으면(§5.6 취소) 아무것도 쓰지 않는다.

repair 라운드·findings digest·attempt journal 상태기계는 두지 않는다. attempt 상태는
`pending|running|succeeded|failed` 넷뿐이다.

### 5.5 레인 점유

`review_session` attempt는 기존 disposition 세션과 같은 부류로 레인 점유에 잡힌다.
`app/utils/active-attempts.js`의 `headReviewAttemptStates`는 `reviewSessionAttemptStates`로
바꾸고 `head_review|head_repair` 필터를 `review_session`으로 대체한다.
`server/ws/snapshot-retention.js` 138행과 `app/views/worker/lanes.js` 103·115–116행,
`app/views/monitor/lanes.js` 1452–1473행의 러닝 라벨은 `'리뷰'` 하나로 정리한다.

### 5.6 취소

`server/ws/worker-handlers.js` 4540–4597행의 취소 판정은 지금 `head_review` journal과
`stopWorkerHeadReviewAttempts`에 의존한다. 대체 경로:

1. 취소 자격 판정은 실행 중 `review_session` attempt의 유무로 바꾼다. 리뷰 세션이 running
   이어도 취소는 `merge_active`로 거부되지 않는다 — 리뷰 중은 머지 중이 아니다.
2. 순서: 먼저 CAS로 authority 회수·큐 항목 제거·attempt `failed: cancelled` 종단을 한
   write에 커밋하고, 그 다음 세션 프로세스를 best-effort 중단한다(기존 attempt 중단 경로).
3. 중단이 늦어 세션이 영수증을 쓰고 끝나더라도 §5.4의 결속 확인이 실패하므로 완료
   판정은 아무것도 쓰지 않는다. 그 영수증 자체는 Bead에 남으며, 다음 `[머지]` 클릭의
   게이트가 정상 판정한다.

## 6. 표시

- `app/views/worker/index.js`: `headReviewFailureCategory`(610–648행),
  `headReviewView`(751–801행), `autoResolutionBadge`(862–906행), 행 조립의
  `head_review`/`journal` 폴딩(1454–1591행), `merge_head_reviews` Map(4045–4053·4669행),
  `리뷰 실패: …` 뱃지(1284행) 삭제.
- 게이트 뱃지(`GATE_BADGES.review` 등)는 `merge-gate.js`가 이미 만든다. `[리뷰 후 머지]`는
  카드 문법 §5.1에 따라 **액션 foot** 슬롯에 `[머지]`와 같은 자리로 들어가며, 표시 조건
  §5.1을 만족하는 행에서만 `[머지]` 대신 나타난다. §5.4의 종료 사유는 진행 줄의 게이트
  뱃지 옆 텍스트다.
- `app/views/monitor/lanes.js` 484행 `'♻️ stale→재리뷰'`는 삭제한다(재리뷰 자동 경로가
  없어짐).

## 7. 계약 unit (dotfiles) · 착지 순서

착지 순서는 **UI-8w4t → dotfiles 계약 unit → UI-d7fy**다.

- **UI-8w4t 선행**: 두 스펙은 `completion-intent.js`·`scheduler.js`·`queue-store.js`·
  `attach.js`·`server/ws/worker-handlers.js`·`app/views/worker/index.js`와
  `completion-intent.test.js`(UI-8w4t는 auto-review 케이스를 유지하고 이 스펙은 삭제)를
  같이 건드린다. 동시 진행은 머지 충돌과 테스트 상호 무효화를 만들므로 UI-8w4t를
  `blocks` 의존으로 앞세우고, UI-d7fy 구현은 UI-8w4t가 머지된 base에서 시작한다. 이 스펙의
  행 번호는 UI-8w4t 머지 후 달라질 수 있으며, 식별자(함수·필드 이름)가 기준이다.
- **dotfiles 계약 unit**: dotfiles rig에 quick_fix Bead를 만들고 UI-d7fy에 foreign
  `blocks` 의존을 건다. 이 unit이 먼저 닫혀야 UI-d7fy가 `bd ready`에 오른다.

- `docs/contracts/workflow-state.yaml`: `manual_merge_continuation.head_review`·`revise`·
  `review_selection` 블록 삭제; `manual_action`을
  `conflict_or_base_alignment_then_fresh_gate_then_pinned_merge_cleanup`으로; `freshness`
  규칙(`receipt_sha_equals_or_is_ancestor_of_observed_head`, probe 결과 4종, 게이트
  fail-closed/표시 fail-quiet)은 `impl_review` 키 정의 아래로 옮겨 유지; 새 항목
  `review_after_merge_click: { dispatch: session_resume, session_source: bead_session_ref_last_claude_else_fresh, scope: review_lineage_no_merge, allowed_writes: [impl_review_receipt, pr_head_branch_push], forbidden: [merge, pr_state_change, base_ref_push, queue_state_edit], merge_owner: queue, authority: same_as_merge_click, completion: rebind_authority_to_final_head_when_receipt_current }`;
  `resolver-self:` 형식을 retired 목록에 추가.
- `docs/contracts/workflow-contract.md` "Worker manual merge continuation" 절: 98행의
  `carry:` 문장 유지, 100·102행(resolver-self 우선·외부 dispatch·REVISE 수리) 삭제 후
  "영수증 부재·stale은 머지 게이트 보류다. `[리뷰 후 머지]` 클릭은 `[머지]`와 같은
  authority를 부여하고 기록 세션을 resume해 리뷰 lineage만(리뷰, REVISE면 단일 패스
  규칙대로 일괄 수정·exact-delta self-review, PR head 브랜치 push 허용) 수행시킨다;
  세션은 머지·PR 상태 변경·base push를 하지 않고, 큐는 dispatch·repair하지 않으며,
  세션이 쓴 영수증이 최종 head에 current이면 authority를 그 head로 재결속한다"로 교체.
- `skills/workflow/SKILL.md` Gates 절: "Named Worker manual merge continuation reuses…"와
  "Resolver mutations need controller-owned exact-delta self-review…" 두 문장을 위 규칙으로
  교체.
- 계약 checker(`scripts/check-*`)가 위 키를 참조하면 함께 정정.
- beads-ui `AGENTS.md` 245–252행의 `resolver:`/`resolver-self:` 서술은 beads-ui PR에서 정정.

## 8. 테스트

- 삭제: head-review·transport 테스트 97개.
- 정리: `merge-queue.test.js`(head_review 스텁 16건), `queue-store.test.js`(39건),
  `completion-intent.test.js`(7건), `scheduler.test.js`(resolver-self 프롬프트 4건),
  `runtime.test.js`/`healthz.test.js`/`worker-handlers.capability.test.js`(schema_version 2),
  `e2e/worker-flow.test.js`(`createHeadReview` 5건), worker/monitor 뷰 테스트.
- 신규:
  - 게이트 `review_receipt_missing|stale`이 큐 항목을 terminal로 굳히지 않고 보류로 남긴다.
  - `resolver:` 해소 결과 head에 원 `impl_review`가 조상이면 통과한다.
  - `[리뷰 후 머지]` 클릭이 authority 부여와 `review_session` attempt 등록을
    `enqueueMergeManual` 한 CAS write로 커밋한다; write 실패 시 launch 없음; launch 실패는
    `launch_failed`; 진행 중 재클릭은 no-op.
  - 보류 항목이 드레인을 멈추지 않고 건너뛰어지며, 다음 `kick()`에서 게이트가
    `eligible`로 바뀌면 `hold`가 지워지고 머지로 진행한다(보류 → 영수증 write → 재개).
  - 완료 판정: REVISE 수정 push로 head가 이동한 경우 최종 head 기준으로 판정하고
    authority `requested_head_sha`가 재결속된다; 클릭 시 `receipt_unbacked` waiver가
    있던 항목이 head 이동 후에도 영구 보류되지 않는다.
  - 취소: running `review_session`이 있는 행의 취소가 `merge_active`로 거부되지 않고,
    authority 회수·attempt `cancelled`가 먼저 커밋된 뒤 늦은 세션 완료가 아무것도 쓰지
    않는다.
  - §3.8 마이그레이션 픽스처.
  - 세션 선택: `claude:` resume / transcript 부재·`codex:`·없음 → 대체 세션.
  - 완료 판정 두 갈래(`current` → 진행, 그 외 → 사유 표시·버튼 재활성).
  - 구형 `queue.json`의 `head_review` 필드가 있어도 로드가 성공하고 저장 시 사라진다.
  - `[리뷰 후 머지]`가 `spec_id_missing`·`undetermined`에는 나타나지 않는다.

## 구현 unit 후보

- `remove`: §3 삭제·큐 보류 동작·저장소 호환(§3.1–§3.7, §4)
- `button`: §5 서버 액션·dispatch·완료 판정 + §6 표시 + `active-attempts` kind 교체
- `docs`: AGENTS.md 245–252행 정정, UI-58w8 스펙에 폐기 각주

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
|---|---|---|---|---|---|
| 형제 | dotfiles | awaited_by_consumer | 계약 canonical 소유자가 다른 저장소(§7) | UI-d7fy | dotfiles-z1sl |
