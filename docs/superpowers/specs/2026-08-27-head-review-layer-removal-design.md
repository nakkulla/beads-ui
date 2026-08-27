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
   클릭은 Bead에 기록된 세션을 resume해 **리뷰만** 수행시키고, 머지는 큐가 소유한다.
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
  import·호출(4593행)과 취소 자격 판정의 `?.head_review` 읽기(4541–4548행) 제거.

### 3.3 `server/worker/merge-queue.js`

- `ensureHeadReview` 래퍼(1266–1281행)와 두 호출 지점(1373–1409행, 1961–2009행) 제거.
- `captureStartingApproval` 호출과 `vouched` 스레딩(1754–1805행, 1396–1398행,
  1983–1985행) 제거. `resolution.kind === 'ready'`는 `vouched.mutation`을 세우지 않고
  바로 재관측으로 이어진다.
- 게이트 결과가 `review_receipt_missing|stale|undetermined`이면 큐 항목은 **보류**로
  남고 다음 관측에서 재판정한다. terminal 실패·dequeue·needs_human 굳힘 없음. 새 상태
  enum 없음. `MergeClickResult.action`의 `'head_review'`·`review_state`
  (`pr-actions.js` 117·134–135행) 삭제.
- `base_update` 1회 자동 정렬(1930–1959행)과 `dispatchConflict` 해소 경로는 그대로다.

### 3.4 `server/worker/queue-store.js`

- `HeadReview` typedef(617–635행), `normalizeHeadReview`, `beginHeadReview`,
  `openApprovedHeadReview`, `setHeadReviewState`, `enrolAutoReview` 삭제.
- `normalizeMergeQueue` 로드 시 기존 `queue.json`의 `entry.head_review`는 **읽고 버린다**
  (필드 무시, 오류 아님). 저장 시 쓰지 않는다.
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

하나의 CAS write로 두 가지를 커밋한다.

1. `enqueueMergeManual` — `[머지]` 클릭과 동일한 manual authority(재사용·재발급 규칙 동일).
2. 리뷰 세션 dispatch 등록 — attempt `kind: 'review_session'`, per-Bead in-flight 가드
   1개(진행 중이면 두 번째 클릭은 no-op).

세션 선택은 REVISE 파킹 `fix` 처분(`server/worker/revise-disposition.js`)과 같은 규칙이다:
Bead `session_ref`의 마지막 `claude:` 항목을 `--resume`; transcript 부재·마지막 항목이
`codex:`·항목 없음이면 fresh 대체 세션. 리뷰어 선택(`impl_review_model`/`effort`)은
세션의 `review` 스킬 사다리에 맡기고 서버는 관여하지 않는다.

### 5.3 프롬프트

프롬프트는 사실과 금지만 싣고 절차는 계약을 가리킨다.

- 인가: beads-ui `[리뷰 후 머지]` 클릭은 세션 밖 human 액션이며 리뷰 진입 승인이다.
- 사실: Bead ID, PR URL, 관측 head SHA, 현재 `impl_review` 값(또는 없음), 게이트 사유.
- 지시: `review` 스킬로 PR head의 impl 리뷰를 수행하고 `impl_review` 영수증을 쓰고
  `bd show --json`으로 readback한다. REVISE면 워크플로 규칙대로 일괄 수정 후 exact-delta
  self-review까지 마치고 영수증을 쓴다.
- 금지: 머지·PR 상태 변경·base ref push·큐 상태 파일 편집. 머지는 큐가 한다.

### 5.4 완료 판정

세션 종료 후 서버가 `impl_review`를 다시 읽어 `reviewReceiptState`로 판정한다.

- `current` → 아무 기록 없이 큐가 다음 관측에서 verify → 머지로 진행.
- 그 외 → 행에 `리뷰 세션 종료 · 영수증 없음`(또는 `stale`) 사유를 붙이고 버튼을
  재활성한다. authority는 그대로 남는다(보류 상태).
- 세션 실패(launch 실패·transcript 소실 후 대체 실패)는 attempt 실패 기록으로 남기고
  같은 사유 표시·버튼 재활성.

repair 라운드·findings digest·attempt journal 상태기계는 두지 않는다.

### 5.5 레인 점유

`review_session` attempt는 기존 disposition 세션과 같은 부류로 레인 점유에 잡힌다.
`app/utils/active-attempts.js`의 `headReviewAttemptStates`는 `reviewSessionAttemptStates`로
바꾸고 `head_review|head_repair` 필터를 `review_session`으로 대체한다.
`server/ws/snapshot-retention.js` 138행과 `app/views/worker/lanes.js` 103·115–116행,
`app/views/monitor/lanes.js` 1452–1473행의 러닝 라벨은 `'리뷰'` 하나로 정리한다.

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
  `review_after_merge_click: { dispatch: session_resume, scope: review_only, merge_owner: queue }`;
  `resolver-self:` 형식을 retired 목록에 추가.
- `docs/contracts/workflow-contract.md` "Worker manual merge continuation" 절: 98행의
  `carry:` 문장 유지, 100·102행(resolver-self 우선·외부 dispatch·REVISE 수리) 삭제 후
  "영수증 부재·stale은 `[리뷰 후 머지]` 클릭이 기록 세션을 resume해 리뷰만 수행하며 큐는
  dispatch·repair하지 않는다; 클릭은 `[머지]`와 같은 authority를 부여한다"로 교체.
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
  - `[리뷰 후 머지]` 클릭이 authority 부여와 dispatch 등록을 한 write로 커밋한다;
    진행 중 재클릭은 no-op.
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
