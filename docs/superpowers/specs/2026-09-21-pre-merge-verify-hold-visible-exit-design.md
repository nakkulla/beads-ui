---
scope:
  - server/worker/merge-candidates.js
  - server/worker/completion-intent.js
  - server/worker/queue-store.js
  - server/worker/resolve-session.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/data/worker-queue-store.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/utils/failure-sentences.js
---

# 머지 전 검증 실패는 보이는 보류다 — completion intent `holding` phase·`[세션에서 해결]` 출구·수정 push 자동 해소

Bead: `UI-g0lk` · route: `spec_backed` · discovered-from `UI-3vvi` ·
작성일: 2026-09-21 · 사용자 결정: §1

## 0. 배경·목표·비목표

### 0.1 실측 (2026-09-16, UI-3vvi)

| 시각 (KST)  | 사건                                                                                     | 사람이 본 것                                   |
| ----------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 04:01:36    | attempt 2 성공 종료 · PR #298 (head `205ef99`)                                           | PR 대기 행                                     |
| 04:01:38→56 | PR 관측 poller가 head `205ef99`의 repo-ops verify를 자동 실행 → exit 1 (`npm run build`) | 게이트 배지 「검증 실패」(툴팁 `script_failed`) |
| 04:01→07:18 | Worker 이벤트 0건 — 댓글·알림·`[세션에서 해결]` 없음                                     | 3시간 17분 침묵                                |
| 07:02~07:19 | 사용자가 직접 세션을 열어 원인 조사·수정. 세션이 07:13 `impl_entry=user@a7cd228…` 기록  | —                                              |
| 07:18:54→55 | 새 head `19f1119`의 재verify 자동 실행 → exit 0                                          | —                                              |
| 07:20:01    | 게이트 재판정 → `receipt_unresolvable:approval_forged` terminal needs_human               | 「확인 필요」·알림·`[세션에서 해결]`·`[머지]`   |
| 07:22:48    | 사용자 `[머지]` 클릭(receipt tier waive) → squash 머지                                   | —                                              |

두 결함이 한 사고에 겹쳤다. 첫째, **머지 전 verify 실패가 소리 없이 머문다**
— 자동 해소 주체(수정 push)가 있는 보류인데 그 사실을 아무 표면도 말하지 않고,
사람이 이어받을 출구가 없다. 둘째, 그 침묵 때문에 사람이 **직접 연 세션**이
승계 절차를 어기고 `impl_entry`를 써서, 이미 ADR 0040·ADR dotfiles/0064가 다룬
`approval_forged`가 재발했다.

### 0.2 닫는 결함

**(1) beads-ui 소유 — 머지 전 verify 실패의 침묵.** §2.1–§2.4. 이 스펙의 본문이다.

**(2) 계약·훅 소유 — 직접 연 세션의 `impl_entry` 쓰기.** §2.5. 규칙(승계 세션은
권한 키를 쓰지 않는다)과 신호(큐 `attempts` 투영)는 이미 있고, 09-16 세션은
승계 프로브를 `impl_entry`를 쓴 **뒤에** 돌렸다. beads-ui가 바꿀 코드는 없으며,
기계적 집행은 dotfiles 형제 Bead가 소유한다(D3).

### 0.3 목표

- 머지 전 verify 실패는 **비종단 보류**로 남되 보인다: 타임라인 한 줄, Bead
  댓글 한 건, Discord 알림 한 건이 head당 한 번 나가고, PR 대기 행은 그 보류를
  배지로 말하고 `[세션에서 해결]`을 단다.
- 수정 커밋 push가 그 보류를 **자동으로** 푼다 — poller의 자동 재verify와 게이트
  재판정, 자동 머지는 지금 그대로다. `[머지]` 재클릭이 필요 없다.
- `[세션에서 해결]`로 뜬 세션은 기록 세션의 fork라 원인·로그·계보를 이미 갖고
  있고, workflow 계약의 승계 규칙 아래에서 `impl_entry`를 쓰지 않는다.

### 0.4 비목표

- `receipt_baseline` 불변식·위조 3종 판정·`[머지]` 클릭의 waive(ADR 0040,
  UI-jxs3 D1). 결정: `receipt-check.js:886`의 위조 판정은 바꾸지 않는다 —
  값만으로 사람 세션과 무인 세션의 쓰기를 가를 수 없고, 완화는 ADR
  dotfiles/0064가 기각한 위조 통로다.
- verify 실패를 terminal needs_human으로 종단하는 것(D1에서 기각).
- `[머지]` 클릭 의미. 결정: 보류 행의 `[머지]`는 지금처럼 게이트를 다시 돌릴 뿐이고
  verify를 재실행하거나 waive하지 않는다 — 출구는 수정 push와 `[세션에서 해결]`이다.
- 구형 verify-cmd 경로의 `verify_cmd_failed → verify_red` 종단
  (`completion-intent.js:1820`). 결정: 바꾸지 않는다 — repo-ops 경로의 실패
  코드는 `script_failed` 등 operation 실패 코드이고 이 스펙은 그 경로만 다룬다.
- repo-ops 타임라인 drawer의 실패 operation 행(`[기록 닫기]`)에 버튼 추가.
  결정: `[세션에서 해결]`은 PR 대기 행 하나에만 단다 — 조작 표면 하나, 기록
  표면 하나(UI-jw27 §4의 분리를 유지).
- 이미 쌓인 `events.jsonl` 중복 줄 정리(UI-5o1b 범위 밖으로 남긴 관찰).

## 1. 사용자 결정 (2026-09-21)

**D1. 보이는 보류 + `[세션에서 해결]`.** 머지 전 verify 실패는 terminal이 아니라
보류다. 타임라인·Bead 댓글·Discord 알림을 남기고 PR 대기 행에 `[세션에서
해결]`을 단다. 수정 push를 관측하면 지금처럼 자동 재검증·자동 머지가 이어진다.
계약 `pre_merge_hold`(원인 `verify_failure`)에 `resolve_in_session` 출구와 알림
라벨을 더하는 dotfiles 형제 Bead가 선행한다.

**D2. 보류의 주인은 completion intent다.** 자동 머지 등록기가 verify 실패 행도
등록하고, 코디네이터가 intent를 새 phase `holding`에 두고 `hold` 기록을 갖는다.
새 head는 기존 `stale` 경로로 `gating`에 복귀한다. poller가 별도 보류 맵을 쓰는
대안(B)은 상태 주인이 둘이 되고 관측기에 부작용이 생겨 기각.

**D3. `impl_entry` 재발은 훅 가드로 닫는다.** dotfiles가 소유하는 write-time
가드(`src/shared/hooks/bd_write_guard.py`, Claude/Codex 공용)가 `impl_entry`·
`plan_approval` 쓰기 명령에서 승계 프로브(worker-url resolve → `GET
/api/worker/queue` `attempts`)를 돌려 그 Bead의 attempt가 있으면 차단한다.
막히는 것은 그 명령 하나이고 세션은 fast_track으로 이어간다. beads-ui는 위조
판정·`attempts` 투영을 바꾸지 않는다. "값 기반 완화"는 위조 통로라 기각,
"시각 구간 완화"(bd history 커밋 시각 대조)는 원칙은 지키지만 일이 커서 기각.

**D4. Bead 분할.** beads-ui는 `UI-g0lk` 하나. dotfiles rig에 형제 둘 — ① 계약
`pre_merge_hold` 정정(`UI-g0lk`가 foreign `blocks`를 건다), ② 훅 가드(독립).
§경계·후속.

**D5. 테스트 범위.** §9.

## 2. 원인 구조

### 2.1 poller가 verify를 돌리고 게이트가 `script_failed`를 낸다

`server/worker/pr-poller.js:657` `startVerify`는 관측된 (bead, head) 쌍마다
`repo_operations.ensureVerify`를 자동 실행하고 종료 영수증을
`observations.recordVerify`로 싣는다. `repo-operation-coordinator.js`
`verifyReceipt`는 `state === 'failed'`면 `reason = operation.failure.code`
(repo-ops verify는 `script_failed`, 시간 초과·spawn 오류 코드 등)를 돌려주고,
`merge-gate.js:519-526`은 `receipt.ok === false`에 `verdict(false, 'verify',
'검증 실패', base_badge, receipt.reason)`을 낸다. 카드의 게이트 배지
(`app/views/worker/index.js:1046`)가 그 「검증 실패」다 — 툴팁은 코드 한 토큰.

### 2.2 등록기가 verify 실패 행을 등록하지 않는다

`server/worker/merge-candidates.js:240`의 `repairable`은
`gate.tier === 'verify' && gate.reason === 'verify_cmd_failed'`다.
`verify_cmd_failed`는 구형 `verify-cmd.js` 경로의 코드이고, repo-ops 경로는
`script_failed`를 내므로 **repo-ops verify 실패 행은 `eligible`이 아니다** —
`enroll()`(`auto-merge.js:123`)이 `completionSeed`를 만들지 않고, completion
intent가 생기지 않는다. intent가 없으니 needs_human·댓글·알림·`[세션에서
해결]`의 재료가 전부 없다. 09-16의 verify 실패에 needs_human 이벤트가 하나도
없고, 07:19 재verify가 green이 된 뒤에야 등록·게이트·영수증 검사가 처음 도는
관측이 이 순서와 정확히 맞는다.

같은 파일 §336 테스트 「repairable post-merge verify failure」가 보이듯
`repairable`의 원 뜻은 UI-q0uy의 AI 수리 사다리였고 UI-s582가 사다리를 없앤 뒤
"등록 자격"만 남았다. 이 스펙은 그 자격을 **"verify 영수증이 있고 `ok=false`"**로
넓힌다(§4.1).

### 2.3 `[세션에서 해결]`의 재료는 셋이고 서버도 verify 보류를 모른다

`app/views/worker/index.js:1369` `resolve_action = !!cleanup_failed ||
completion?.phase === 'needs_human' || !!discard.error` (UI-jw27 §4의 terminal
실패 행 3종). 서버 `server/worker/resolve-session.js:115`
`resolveFailureContext`도 같은 셋(+파킹)만 알고 그 밖은 `null` →
`handleWorkerResolveInSession`이 `no_terminal_failure`로 거절한다.

### 2.4 계약은 `pre_merge_hold`의 출구를 `fix_commit_push`로만 둔다

dotfiles `docs/contracts/workflow-state.yaml failure_classes.pre_merge_hold` —
`causes: [merge_conflict, verify_failure, review_stale_history_rewrite_only]`,
`exit: [conflict_resolution, fix_commit_push, review_then_merge_click]`,
알림 없음. `resolve_in_session`은 `needs_human_reentry.actions`와
`receipt_hold.exit`에만 있다. beads-ui가 이 행에 버튼을 그리려면 계약이 먼저
그 출구를 이 클래스에 더해야 한다(ADR 0012 — beads-ui는 소비자).

### 2.5 (2) 직접 연 세션이 승계 절차를 어겼다

ADR dotfiles/0064(→ ADR dotfiles/dotfiles-48gg 승계)와 workflow
`references/execution-spec-backed.md` `## Attempt continuation`은 승계 대상에
「사용자가 그 Bead에 직접 연 세션」을 명시하고, `status`를 보지 않으며, 승계면
`workflow_mode=fast_track`만 쓰고 `impl_entry`를 쓰지 않는다고 정한다. beads-ui
`server/routes/worker-queue.js:126` `projectAttempts`는 status 무관·구현 attempt
전부를 실어 그 신호를 이미 공급한다(UI-jxs3 D7). 09-16 세션 로그
(`dbd68b80`)는 `impl_entry`를 22:13:14Z에 쓰고 큐 프로브를 22:19:45Z에 처음
돌렸다 — 신호 결함이 아니라 절차 순서 위반이다. write-time 가드
`bd_write_guard.py`는 그 프로브를 돌리지 않으므로 기계적으로 막지 못했다.

## 3. 계약 소비 (dotfiles 소유 — 여기서는 소비 문장만)

**이 절의 정본은 dotfiles 형제 ①의 스펙이다.** beads-ui가 이 저장소에서 쓰는
것은 아래 소비 문장과 라벨 바이트 하나다(ADR 0012).

> `pre_merge_hold`의 `verify_failure`는 `resolved`를 유지하는 비종단 보류이며,
> 출구는 수정 커밋 push(자동 재검증)와 `[세션에서 해결]`이고, 보류 진입 시 알림
> 한 번을 낸다. 알림 클래스 라벨은 `failure_classes.pre_merge_hold.notify_label`
> 이다.

dotfiles ①이 소유하는 것(형제 Bead 범위, 여기서 복제하지 않는다):

- `workflow-state.yaml failure_classes.pre_merge_hold`에 `exit` +=
  `resolve_in_session`, `notification: true`, `notify_label` (제안:
  「머지 전 검증 실패」), `consumer_stage_key: verify`. `receipt_hold`가 같은
  키 셋으로 등록된 선례를 따른다.
- `workflow-contract.md` "`failure_classes` is the single source of truth…" 문단의
  `pre_merge_hold` 문장에 `[세션에서 해결]` 출구와 알림을 더한다.
- 알림 재생 금지·재관측 침묵 규칙은 `needs_human_reentry.notification`과 같은
  문장을 이 클래스에도 적용한다.

dotfiles ②가 소유하는 것(독립 형제):

- `src/shared/hooks/bd_write_guard.py`: `bd update … --set-metadata impl_entry=`·
  `plan_approval=` 쓰기 판정 앞에 `Attempt continuation` 1·2·3단계 프로브를
  넣어, 응답 `attempts`에 그 Bead의 항목이 있으면 exit 2와 한 줄 안내(승계
  세션은 권한 키를 쓰지 않는다·`workflow_mode=fast_track`으로 잇는다). 프로브
  실패·부재는 지금처럼 통과(fail-open) — 판정은 계약 `attempt_continuation`
  블록의 `absent_or_failed: not_continuation`을 그대로 따른다.

**beads-ui가 (2)로 바꾸는 코드는 없다.** 다만 §4.7의 resolve 프롬프트에 사람이
읽는 안내 한 줄을 넣는다 — ADR dotfiles/0064가 허용한 "판정 근거가 아닌 안내"다.

## 4. 보류의 소유 — completion intent `holding` (beads-ui)

### 4.1 등록 자격 — `server/worker/merge-candidates.js`

`repairable`을 다음으로 바꾼다.

```
repairable =
  !external &&
  ((gate.tier === 'verify' && gate.gate_badge === '검증 실패') ||
   (merged_tier && isCleanupResolutionFailure(cleanup_failed[bead_id])))
```

`gate_badge === '검증 실패'`는 `merge-gate.js:519-526`이 `receipt.ok === false`에만
내는 값이라 "verify 영수증이 있고 실패했다"와 동치이고, 코드가
`verify_cmd_failed`든 `script_failed`든 같이 잡는다. `verify_missing`·
`verify_sha_stale`·`verify_receipt_stale`(배지 「검증 대기」)은 여전히 자격이
없다 — 그 셋은 poller가 곧 채우는 대기다. `completionIntentSeed`는 그대로다.

**보류 중인 행은 머지 큐에 없다(r1 지적 1).** `completion-intent.js:652`의
`reconcile`은 `merge_queue` 선두 하나만 관측하고, `merge-queue.js:1883`
`processCompletionItem`은 선두 intent의 phase가 `merging`이 아니면 큐 전체를
멈춘다. 그래서 `holding` intent는 `paused`와 같은 방식으로 **`merge_queue`에서
빠진다**(§4.5) — 뒤의 정상 PR과 다른 실패 PR이 선두에 올라 각각 판정·머지·보류된다.
등록기의 기존 intent 분기(`enqueueMergeAuto`)는 `holding` intent에 대해:
`entry.head_sha === intent.hold.head_sha`면 아무 것도 하지 않고(재삽입 없음, 관측
없음), head가 다르면 runnable entry를 다시 넣는다 — 이것이 새 head가 코디네이터의
관측(선두 → `stale` → `gate`)에 도달하는 길이다. `merge-queue.js`는 바꾸지 않는다:
보류 행이 큐에 없으므로 그 halt 규칙에 닿지 않고, §9(j)의 순서 테스트가 그 사실을
고정한다.

### 4.2 fact — `server/worker/completion-intent.js factFromGate`

`verify_cmd_failed` 분기(`:1820`) **앞에** 한 분기를 더한다: `verdict.tier ===
'verify' && verdict.gate_badge === '검증 실패' && reason !== 'verify_cmd_failed'`
이면

```
{ state: 'verify_hold',
  failure_key: createCompletionFailureKey({ stage: 'verify', reason,
    subject_sha: gated.subject.head_sha, base_sha: gated.base_sha,
    evidence: { output_tail: verify?.output_tail } }),
  evidence: verify,            // observations.verify: reason·summary·output_tail·log_path
  op_id: operationIdFromLogPath(verify?.log_path),
  gated }
```

`CompletionFactState`에 `verify_hold`를 더한다. `verify_red`(구형 코드) 분기와
그 뒤는 바뀌지 않는다.

### 4.3 nextAction

- `intent.phase === 'holding'`은 `gating`과 같은 자리에서 판정한다
  (`if (intent.phase !== 'gating') return needsHuman('intent_state_invalid')`
  → `gating`·`holding` 둘 허용).
- fact `verify_hold`:
  - phase `gating` → `{ kind: 'hold', fact }`.
  - phase `holding`(사람의 `[머지]` 클릭이 같은 head를 다시 큐에 넣어 관측된 경우)이고
    `intent.hold.head_sha === fact.gated.subject.head_sha`이며 `operation_id`·
    `reason`도 같으면 `null`; head는 같은데 `operation_id`나 `reason`이 다르면
    `{ kind: 'hold', fact }` — 내용 갱신이지 새 알림이 아니다(§4.4).
- fact `stale`(새 head 관측, `observe():1961`) → 기존 `{ kind: 'gate' }`.
  `onAction gate`의 `setCompletionSubject(phase 'gating')`이 `holding`에서도
  통과하도록 §4.5의 store 규칙을 둔다 — 이것이 보류의 자동 해소다.
- fact `green`·`conflict`(같은 head의 재verify가 green이 된 경우 등) → 기존
  `merge_subject`. `undecidable`·그 밖은 기존 그대로(terminal `approval_forged`
  등은 `holding`에서도 그대로 종단한다).
- `input.auto_merge !== true`·`active_op`·`paused` 분기는 앞서 그대로다.

### 4.4 onAction `hold` — 한 번 쓰고 한 번 알린다

```
const hold = {
  class: 'pre_merge_hold', cause: 'verify_failure',
  reason: fact.failure_key.reason,            // script_failed 등 raw 코드
  summary: queue.repo_operations[fact.op_id]?.failure?.summary   // 원장의 실패 요약("repo-ops verify: npm run build failed")
           ?? completionFailureSummary(fact.evidence),             // 없으면 스크립트 자체 실패 줄
  operation_id: fact.op_id, log_path: evidence.log_path,
  head_sha: gated.subject.head_sha, base_sha: gated.base_sha,
  at: now(), comment_at: <아래>
};
```

`deps.store.holdCompletionIntent(workspace, { root_bead_id, hold })`가 phase를
`holding`으로 두고 `merge_queue`에서 행을 빼며 `intent.hold`를 쓴다(§4.5).
**알림 이력의 단위는 head다(r1 지적 2).** 이전 `intent.hold`가 없거나 그
`head_sha`가 다를 때만 `comment_at = now()`로 새 기록을 만들고 아래 세 효과를
낸다; 같은 head에서 `operation_id`나 `reason`만 바뀐 경우는 그 두 필드와
`summary`·`log_path`·`at`을 갱신하되 `comment_at`을 그대로 두고 효과를 내지
않는다. 재시작·재관측은 `intent.hold`를 다시 읽어 같은 head면 침묵한다 —
terminalize의 `commented_at === null` 규칙과 같은 꼴이다.

1. 타임라인: `recordTimeline(root, 'merge_step', 'hold:<head_sha>',
   '머지 보류 — 검증 실패 · <reason>')`. seq는 **head**다(r1 지적 3):
   `verifyOperationId`(`repo-operation-coordinator.js:202`)는 candidate tree 등을
   해시하므로 내용이 같은 새 head가 같은 operation id를 재사용하고, 로그 없는
   실패는 `operation_id`가 `null`이라 seq가 될 수 없다. head는 보류마다 고유하고
   `bead-timeline.js`의 `event_id` 중복 제거와 정확히 "head당 한 줄"로 맞는다.
   `merge_step`은 이미 saga의 phase 줄(「머지 게이트 통과」·「머지 후 정리 시작」)을
   담는 kind이므로 새 TimelineKind는 만들지 않는다.
2. Bead 댓글 `## 🤖 완료 보류 기록`(§6.1).
3. Discord 알림(§6.2).

### 4.5 store — `server/worker/queue-store.js`

- `CompletionPhase`·`COMPLETION_PHASES`에 `holding`. `CompletionIntent`에
  `hold: CompletionHold|null`(정규화기는 객체가 아니면 `null`).
- `holdCompletionIntent(workspace, {root_bead_id, hold})`: intent가 있고
  `active_op === null`, phase가 `gating`·`holding`일 때만 phase `holding`으로
  두고, `paused` 전이(`:10577`)와 같이 `merge_queue`에서 그 행을 제거하며,
  `intent.hold`를 §4.4 규칙(같은 head면 내용 갱신·`comment_at` 유지, 새 head면
  새 기록)으로 쓴다. `auto_resolution`이 살아 있으면 `applyCompletionPhase`의
  기존 규칙대로 phase는 보류된다(변경 없음).
- `setCompletionSubject`: 거부 목록(`paused`·`needs_human`·`completed`)은 그대로
  — `holding`은 거부되지 않으므로 새 head 재핀이 통과하고, 이때 `intent.hold =
  null`로 비운다(보류의 해소 = 새 subject).
- `terminalizeCompletionIntent`: `holding`에서도 종단 가능(변경 없음). `hold`는
  레코드에 남지만 **`holding` phase 밖에서는 아무 표면도 읽지 않는다**(§4.6, r1
  지적 4).
- `enqueueMergeAuto`(`:10938`): 기존 intent 분기에 `holding` 규칙을 더한다 —
  `intent.hold?.head_sha === entry.head_sha`면 건너뛴다(재삽입·`auto_merge_skips`
  변경 없음); head가 다르면 `gating`과 같이 runnable entry를 다시 넣는다. 그 밖의
  분기(`needs_human`·`completed` 건너뜀, `paused` 재개)는 그대로다.
- `[✕]`·`auto_merge_skips`: 보류 행은 큐에 없어 `[✕]`가 그려지지 않는다.
  `[머지]` 클릭(`enqueueMergeManual`)은 같은 head를 수동 authority로 다시 넣고,
  코디네이터가 같은 실패 영수증을 관측해 다시 `hold`(효과 없음, 행 제거)로
  돌아온다 — 클릭은 무해하고 verify를 재실행하지 않는다(§0.4 결정).

### 4.6 투영 — `server/ws/worker-handlers.js completionStatusFor`

`COMPLETION_PHASES`(`:2546`)에 `holding`. **`value.phase === 'holding'`일 때만**
응답에 `hold: { cause, reason, summary, operation_id, log_path, head_sha, at }`
(각 문자열은 `boundedCompletionText`로 자른다)을 싣고 `failure_stage = 'verify'`,
`failure_reason = hold.reason`, `log_path = hold.log_path`로 채운다. 다른 phase
에서는 `hold: null`이고 기존 우선순위(`failure_key` → `terminal` → `cleanup`)가
그대로다 — 같은 head에서 `approval_forged`로 종단하면 화면은 그 terminal 증거를
보인다(r1 지적 4). `app/data/worker-queue-store.js CompletionStatus`에 phase
`holding`과 `hold`를 더한다. 구형 서버 스냅샷에는 필드가 없고 클라이언트는
fail-quiet.

### 4.7 `[세션에서 해결]` — `server/worker/resolve-session.js`

`resolveFailureContext`의 **첫 분기**로 `intent.phase === 'holding' &&
intent.hold`를 더한다.

```
{ failure_class: PRE_MERGE_HOLD_CLASS,   // 계약 notify_label 바이트 복사
  reason: hold.reason, stage: 'verify',
  detail: [hold.summary, hold.log_path && `로그 ${hold.log_path}`].filter(Boolean).join(' · '),
  exit: 'fix_commit_push' }
```

`ResolveFailureContext`에 `exit?: 'fix_commit_push'`를 더하고
`buildResolvePrompt`는 그 값이 있을 때 첫 문장과 후보 행동 2를 보류형으로 바꾼다:

- 첫 문장: 「이 세션이 맡았던 Bead X의 PR이 머지 전 검증에 실패해 보류 중입니다.
  수정 커밋을 같은 브랜치에 push하면 Worker가 자동으로 재검증·머지합니다.」
  (fallback 문장도 같은 꼴에 계보 인용을 붙인다.)
- 후보 행동 2: 「고칠 수 있는 원인이면 고쳐서 같은 브랜치에 push한다 — 재검증과
  머지는 Worker가 자동으로 잇는다.」
- 안내 한 줄(모든 resolve 프롬프트 공통, 판정 근거 아님): 「이 세션은 Worker
  attempt를 이어받은 승계 세션이다 — workflow `Attempt continuation`대로
  `impl_entry`·`plan_approval`을 쓰지 않고 `workflow_mode=fast_track`으로 잇는다.」
- 금지 줄은 그대로.

`handleWorkerResolveInSession`·fork/fresh 판정·tmux 기동은 바뀌지 않는다.

## 5. 카드 표시 (beads-ui)

### 5.1 PR 대기 행 — `app/views/worker/index.js`

- `completionView`(`:712`)에 `case 'holding'`: badge `검증 실패 — 수정 push 대기`,
  `alert: true`, `lock_actions: false`. details에 `[failureSentence(hold.reason)
  또는 '머지 전 검증이 실패했습니다.', hold.summary, hold.log_path && '로그 …',
  '수정 커밋을 push하면 자동으로 다시 검증합니다']`.
- `prStatusBadge`(`:893` 이하)의 우선순위는 그대로다 — `recovery`
  (completionView) 분기가 게이트 「검증 실패」 분기보다 앞이라 등록된 행은 새
  배지를, 등록되지 않은 행(자동 머지 꺼짐)은 지금처럼 게이트 배지를 본다.
- `resolve_action`(`:1369`)에 `|| completion?.phase === 'holding'` — UI-jw27 §4의
  재료가 셋에서 넷이 된다. 이 스펙이 그 슬롯 표의 갱신이다(ADR 0014). 버튼
  자리·문구·`resolve_title`은 그대로.
- `merge_action`·`merge_enabled`·`cancel_*`: 변경 없음(§0.4 결정).
- `AUTO_RESOLUTION_PHASES`에는 넣지 않는다 — `holding`은 자동 해소 phase가
  아니라 head 관측 대기이고, `needs_reclick` 의미(클릭이 자동 대기를 끝낸다)가
  맞지 않는다.

### 5.2 문장·라벨

- `app/utils/failure-sentences.js`: `pre_merge_hold: '머지 전 검증이 실패했습니다
  — 수정 커밋을 push하면 자동으로 다시 검증합니다.'` 한 항목. raw 코드 문장
  (`script_failed` 등)은 기존 표를 쓴다.
- Monitor 탭은 `completion_intents`를 싣지 않으므로(UI-jxs3 관찰) 이 phase로
  바뀌는 것이 없다. 실패 집계에도 들지 않는다 — 관찰로 남긴다.

## 6. 기록과 알림

### 6.1 Bead 댓글 `## 🤖 완료 보류 기록`

`completionFailureComment`와 같은 행 문법(`failure-comment.js` 소유의 헤딩·
요약·로그 행)으로 한 함수 `completionHoldComment(intent, queue, hold)`를 둔다.

```
## 🤖 완료 보류 기록
- 단계: verify
- 원인: <reason> — <문장>
- 요약: <summary>                (있을 때만)
- 대상: <head_sha> (base <base_sha>)
- 로그: <log_path>               (있을 때만)
- 다음: 수정 커밋을 같은 브랜치에 push → 자동 재검증·머지 · 또는 [세션에서 해결]
```

`hold.comment_at`이 그 댓글의 시각이며, 같은 head에는 다시 달지 않는다 — 같은
head에서 `operation_id`·`reason`만 바뀌면 내용은 갱신되지만 댓글은 그대로다(§4.4).

### 6.2 Discord 알림 — `server/worker/notify.js`

`needsHuman(input)`의 본문 조립을 공유하는 `hold(input: NeedsHumanInput)`를
더한다 — 제목 접두만 「머지 보류」이고 행 구조(클래스·원인·다음·링크)는 같다.
`completion-intent.js`는 `PRE_MERGE_HOLD_NOTIFY_LABEL`(계약
`pre_merge_hold.notify_label`의 바이트 복사, 주석에 출처)을 `failure_class`로,
`next_action`은 「수정 커밋 push(자동 재검증) 또는 [세션에서 해결]」로 넘긴다.
알림은 §4.4의 "새 벽" 조건에서만 한 번 나간다; 재시작·재관측은 침묵한다.

## 7. (2)의 처리 — beads-ui 변경 없음

- `receipt-check.js` 위조 판정, `worker-queue.js projectAttempts`,
  `receiptAttemptFor` 선택기: 불변.
- 승계 세션이 `[세션에서 해결]` fork로 들어오게 하는 것(§4·§5)이 직접 연 세션의
  빈도를 줄이고, 훅 가드(dotfiles ②)가 남은 경우를 기계적으로 막는다.
- 이 스펙의 §4.7 안내 한 줄은 판정 근거가 아니다(ADR dotfiles/0064).

## 8. 바꾸는 파일 (beads-ui)

| 파일                                        | 변경                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `server/worker/merge-candidates.js`         | `repairable` 자격을 verify 영수증 `ok=false`로 (§4.1)                    |
| `server/worker/completion-intent.js`        | `verify_hold` fact·`hold` action·`holdCompletionIntent` 호출·댓글·알림 (§4.2–4.4, §6) |
| `server/worker/queue-store.js`              | phase `holding`·`hold` 필드·`holdCompletionIntent`·`setCompletionSubject` 비움 (§4.5) |
| `server/ws/worker-handlers.js`              | `COMPLETION_PHASES`·`hold` 투영 (§4.6)                                  |
| `server/worker/resolve-session.js`          | `holding` 분기·보류형 프롬프트·승계 안내 줄 (§4.7)                      |
| `server/worker/notify.js`                   | `hold(input)` (§6.2)                                                    |
| `app/data/worker-queue-store.js`            | `CompletionStatus` phase·`hold` (§4.6)                                  |
| `app/views/worker/index.js`                 | `completionView` case·`resolve_action` 재료 (§5.1)                      |
| `app/views/worker/lanes.js`                 | 변경 없음이 기대값 — `resolve_action` 소비만; 테스트로 고정             |
| `app/utils/failure-sentences.js`            | `pre_merge_hold` 문장 (§5.2)                                            |

`bead-timeline.js`의 kind 어휘, `merge-gate.js`, `pr-poller.js`,
`receipt-check.js`, `repo-ops-timeline.js`는 바꾸지 않는다.

## 9. 테스트 범위 (D5)

- `merge-candidates.test.js`: repo-ops `script_failed` 영수증 행이 `repairable`로
  등록된다; 「검증 대기」(영수증 없음·stale) 행은 여전히 제외; 외부 행 제외 유지.
- `completion-intent.test.js`: (a) tier verify·`script_failed` → fact
  `verify_hold`·failure_key stage `verify`; (b) `gating`+`verify_hold` →
  `hold` action → phase `holding`·`hold` 기록·`merge_queue`에서 행 제거·
  `merge_step hold:<head_sha>` 타임라인 1건·댓글 1건·알림 1건; (c) 같은 head 재관측
  → `null`·효과 0건; (d) 같은 head 다른 `operation_id`/`reason` → `hold` 내용
  갱신·`comment_at` 유지·타임라인/댓글/알림 0건; (e) `holding`+`stale` → `gate` →
  `setCompletionSubject` 통과·`hold` null·phase `gating`; (f) `holding`+`green` →
  `merge_subject`; (g) `holding`에서 `approval_forged` terminal 종단 가능; (h)
  `verify_cmd_failed`는 여전히 `verify_red` 종단; (i) 재시작(`intent.hold` 있는
  스냅샷) 뒤 같은 head 침묵; (j) 큐 순서 [실패 PR A, 정상 PR B, 실패 PR C]에서 A
  보류 → 행 제거 → B 머지 → C 보류(A·C 각각 댓글·알림 1건), 어느 단계도 `halted`
  없음; (k) 내용이 같은 두 head가 같은 `operation_id`를 공유해도 타임라인 줄은
  head마다 하나이고 `operation_id`가 `null`인 실패도 줄을 얻는다.
- `queue-store.test.js`: `holdCompletionIntent` 전이 규칙(`gating`·`holding`만,
  `active_op` 있으면 거부)·`merge_queue` 행 제거·같은 head 내용 갱신 시
  `comment_at` 보존; 정규화기가 `hold` 보존; `enqueueMergeAuto`가 같은 head의
  `holding` intent를 건너뛰고 다른 head면 재삽입.
- `worker-handlers.test.js`: `holding` 투영 필드·bounded 절단; `hold`가 남은
  `needs_human` intent는 terminal 증거를 투영하고 `hold: null`; 구형 intent(`hold`
  없음) fail-quiet.
- `resolve-session.test.js`: `holding` intent → 클래스·원인·stage·detail·`exit`;
  프롬프트 첫 문장·후보 행동 2·승계 안내 줄; `needs_human`·`cleanup`·`discard`·
  `파킹` 분기 불변; `handleWorkerResolveInSession`이 `holding` 행을 기동한다.
- `notify.test.js`: `hold()` 본문 행(클래스·원인·다음·링크)·제목 접두.
- `index.test.js`(worker): `holding` 행에 배지 「검증 실패 — 수정 push 대기」·
  `[세션에서 해결]`이 있고 `[머지]` 의미는 불변; `needs_human`·`cleanup_failed`·
  폐기 실패 행의 기존 재료 셋 회귀; 등록되지 않은 행은 게이트 배지 유지.
- e2e(`server/e2e/worker-flow.test.js` 계열): verify 실패 → holding(댓글·알림
  1회) → 새 head push 관측 → 자동 재verify green → 자동 머지, 사람 클릭 0회.
- 검증 명령은 AGENTS.md Pre-Handoff Validation(`npm run tsc`·`npm run lint`·
  prettier·`npx vitest run --reporter=dot`) + `npm run build`(번들 그래프 회귀
  안전망 — UI-3vvi 사고의 교훈).

## 10. 구현 unit 후보

- unit-a `server/worker/merge-candidates.js`·`completion-intent.js`·
  `queue-store.js`·`server/ws/worker-handlers.js` — 등록·fact·hold·store·투영.
- unit-b `server/worker/resolve-session.js`·`notify.js` — 출구·프롬프트·알림·댓글
  문법.
- unit-c `app/views/worker/index.js`·`app/data/worker-queue-store.js`·
  `app/utils/failure-sentences.js` — 카드 배지·버튼·문장.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| ---- | ---------- | ---------------- | --------- | ---------------- | ------- |
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소가 소유하는 계약 표면 — `pre_merge_hold` 출구·알림 라벨(§3 ①); beads-ui §5·§6이 그 라벨 바이트와 출구 어휘를 소비한다 | 없음 | dotfiles-eurv |
| 형제 | dotfiles | defect | 다른 저장소가 소유하는 훅 코드 — `bd_write_guard.py` 승계 프로브(§3 ②); beads-ui 소비자 없음이라 ①과 admission 클래스·선행 관계가 달라 행을 나눈다 | 없음 | dotfiles-wism |

`UI-g0lk`는 형제 ①에 **foreign `blocks`를 건다** — 알림 라벨과 `[세션에서 해결]`
출구가 계약에 먼저 서야 §4.7·§6.2가 그 바이트를 복사할 수 있다. 형제 ②는
`UI-g0lk`와 독립이며 `blocks`를 걸지 않는다. 두 형제의 스펙은 이 세션이 라우터
핸드오프 뒤 작성·게시한다(`gate_entry=all_siblings_authored_first`).

- 비목표: §0.4의 결정 넷(위조 판정·`[머지]` 의미·`verify_cmd_failed` 종단·drawer
  버튼)과 `events.jsonl` 정리.
- 관찰: 보류 행의 `[머지]` 클릭은 같은 head를 다시 큐에 넣고 코디네이터가 같은
  실패 영수증을 관측해 다시 `hold`(효과 없음)로 돌아온다(§4.5). `prStatusBadge`에서
  `recovery`가 `queue_failure`보다 앞이라 배지는 보류가 유지된다 — 클릭 자체를
  막을지는 실측 뒤 판단한다.
- 관찰: Monitor 탭 PR 대기 행은 `completion_intents`를 싣지 않아 `holding`도
  보이지 않는다(UI-jxs3 관찰과 같은 투영 부재).
- 관찰: repo-ops drawer의 실패 verify operation 행에는 `[기록 닫기]`만 남는다.
  UI-3vvi의 after-ladder 복구 분류(`recovery: wait:verification`)가 같은 operation에
  붙지만 카드 조작을 늘리지 않는다 — 두 표면이 한 실패를 다르게 부르는지는
  구현 리뷰에서 본다.
- 관찰: 09-16 세션의 절차 위반(§2.5)은 사람 절차 기록이며 beads-ui Bead를 만들지
  않는다; 기계적 집행은 형제 ②다.
- 관찰(scope 겹침): `app/views/worker/index.js`는 표시층 Bead들이 공유하는
  파일이다. 이 스펙은 `completionView` case 하나와 `resolve_action` 재료 하나를
  더하고 슬롯·판정 순서를 바꾸지 않으므로 `blocks`를 걸지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0040 — 머지 게이트의 보류는 자동 해소 주체 유무로 나뉜다. 머지 전
  verify 실패는 자동 해소 주체(수정 push → poller 재verify)가 **있는** 보류이므로
  terminal이 아니라 보이는 대기다; 위조 3종의 terminal 규칙과 baseline 불변식은
  그대로 전제한다.
- 전제: ADR 0012 — beads-ui는 계약의 소비자다. `[세션에서 해결]` 출구와 알림
  라벨은 dotfiles 형제 ①이 먼저 계약에 세우고 이 저장소는 바이트를 복사한다.
- 전제: ADR 0014 — 새 라벨·버튼은 슬롯 표를 먼저 갱신한다. 이 스펙이 UI-jw27 §4
  재료 표(셋→넷)의 갱신이며 새 슬롯은 없다.
- 전제: ADR UI-3vvi — 원시 실패 기록은 보존된다. 실패한 verify operation과 그
  복구 분류는 그대로 두고 intent 쪽에 보류 상태만 더한다.
- 전제: ADR dotfiles/0064(→ ADR dotfiles/dotfiles-48gg) — Worker attempt를 이어받은 세션은
  승계 프로브로 판정하고 권한 키를 쓰지 않는다. §4.7의 안내 줄은 그 규칙의
  소비이며 판정 근거가 아니다; 기계적 집행은 형제 ②다.
- 머지 전 verify 실패는 completion intent의 비종단 `holding` phase가 소유하는
  보이는 보류다 — 수정 커밋 push가 자동으로 풀고 `[세션에서 해결]`이 사람의
  출구이며, terminal 종단·baseline 판정·`[머지]` 의미는 바꾸지 않는다.
  되돌리기 어려움(성립: phase 어휘·투영·계약 출구·알림 클래스가 한 판정에
  묶인다)·맥락 없이 놀라움(성립: terminal 실패 행에만 있던 `[세션에서 해결]`이
  비종단 행에 서고, 그 행은 사람이 누르지 않아도 자동으로 풀린다)·실제
  trade-off(성립: terminal 종단(즉시 보임, 재클릭 필요, 계약 클래스 재정의) 대
  보이는 보류(자동 해소 유지, phase 하나 추가)).
  `summary`: "머지 전 검증 실패는 completion intent의 비종단 holding 보류로 보이게 남기고, 수정 push가 자동으로 풀며 [세션에서 해결]이 사람 출구다 — terminal 종단·baseline 위조 판정·[머지] 의미는 바꾸지 않는다" → ADR
- 직접 연 세션의 `impl_entry` 재발 방지는 계약·훅이 소유하고 beads-ui는 위조
  판정을 완화하지 않는다 — 이미 ADR 0040·ADR dotfiles/0064의 전제이고 새 결정을
  만들지 않는다 → ADR 아님
