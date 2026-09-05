---
scope:
  - server/worker/receipt-check.js
  - server/worker/completion-intent.js
  - server/worker/merge-gate.js
  - server/worker/auto-merge.js
  - server/worker/pr-actions.js
  - server/worker/repo-ops-display.js
  - server/routes/worker-queue.js
  - app/views/worker/lane-model.js
  - app/views/worker/index.js
---

# 승계 세션의 영수증 충돌과 영수증 보류의 침묵을 닫는다 — 보류의 해소 가능성 분류·terminal needs_human·대기 배지·원인 기록

Bead: `UI-jxs3` · route: `spec_backed` · discovered-from `UI-91fl` ·
작성일: 2026-09-04 · 사용자 결정: §1

## 0. 배경·목표·비목표

### 0.1 실측 (2026-09-04, UI-91fl)

Worker가 무인 dispatch한 attempt `UI-91fl-1788427621125-2`(base `a6f2201`)가
`awaiting_user=impl_review_conflict:design`으로 파킹했다. 사용자가 파킹 타일의
`[세션에서 해결]`을 눌렀고, 그 문의 세션이 같은 attempt를 이어받아 계약대로
`workflow_mode`를 `standard`로 해소하고 구현 진입을 질문한 뒤
`impl_entry=user@b1ff079…`를 기록했다. 이후 `[머지]` 클릭에서 needs_human 두
건이 났다.

| 시각(KST)      | 관측                                                      | 기록         |
| -------------- | --------------------------------------------------------- | ------------ |
| 07:39:23       | `merge_step:gating` 「머지 게이트 통과」                  | events.jsonl |
| 07:39:23~09:32 | 자동 머지 진행 없음, 약 2시간 침묵                        | 기록 없음    |
| 09:32:57       | 1차 `[머지]` 클릭                                         | events.jsonl |
| 09:33:20       | `internal_record_failed:verify_config_invalid`            | needs_human  |
| 09:33:21       | `internal_record_failed:receipt_unbacked:approval_forged` | needs_human  |
| 09:36:05       | 3차 `[머지]` 클릭이 receipt tier를 waive → 머지 `9be4a83` | events.jsonl |

침묵 구간에 `auto_merge=true`였고 `auto_merge_skips`는 `{}`였으며 `pr_wait`·
`merge_queue` 어디에도 흔적이 없었다. `completion_intents.UI-91fl`의
`resumed_terminal`은 `evidence`·`log_path`·`failure_key`가 전부 `null`이라
`verify_config_invalid`의 원인을 확정하지 못했다.

### 0.2 닫는 결함 셋

1. **승계 충돌.** 무인 attempt를 이어받은 대화형 세션이 계약이 요구하는
   `impl_entry`를 쓰는 순간, dispatch 시점에 얼어붙은 `receipt_baseline`과
   어긋나 `approval_forged`가 된다. 키를 지우는 것도 같은 위반이라 Bead
   metadata 편집으로는 해소되지 않는다.
2. **보류의 침묵.** 영수증 보류는 `metadata_watch`로 무기한 대기하는데 skip
   기록·이벤트·배지·알림 어디에도 남지 않아 사용자가 멈춘 이유를 볼 수 없다.
3. **원인 미기록.** needs_human을 남기는 일부 경로가 `failure_key`·`evidence`를
   넘기지 않고, `verify_config_invalid`를 만드는 두 지점(`verifyState()` 예외,
   `[머지]` 클릭 경로의 `ensureVerify` 실패)은 원인을 버린다.

### 0.3 목표

- 같은 조합(무인 dispatch → 파킹 → `[세션에서 해결]` → 머지)이 사람 개입 없이
  지나가게 한다.
- 지나가지 못하는 보류는 언제나 화면이나 알림에 즉시 드러나게 한다.
- needs_human 기록만 읽고 원인을 재구성할 수 있게 한다.

### 0.4 비목표

- `receipt_baseline` 재포착은 하지 않는다(§1 D1). 불변식·위조 판정 규칙·
  `EXEC_RECEIPT_MERGE_GATE`의 hold·badge 표·`[머지]` 클릭의 waive 권한은
  그대로다.
- 게이트가 만드는 이유 문자열 `receipt_unbacked:<code>`를 바꾸지 않는다.
- 새 durable metadata 키·새 큐 필드를 만들지 않는다.
- 과거 attempt·과거 completion intent의 소급 정정은 하지 않는다.
- `[세션에서 해결]`의 fork 방식·프롬프트 블록 바이트는 바꾸지 않는다.

## 1. 사용자 결정 (2026-09-04)

**D1. takeover 충돌은 세션 규칙으로 닫는다.** Worker attempt를 이어받은 세션은
`impl_entry`를 쓰지 않는다. `receipt_baseline` 불변식·위조 규칙·hold/badge 표·
`[머지]` 클릭의 waive는 바꾸지 않는다.

**D2. 영수증 보류를 해소 가능성으로 분류한다.** 해소 불가(`approval_forged`·
`dispatch_forged`·`mode_authority_forged`)는 즉시 terminal needs_human이 되고
사유는 `receipt_unresolvable:<code>`다. 게이트가 내는 이유 문자열은 불변이다.
해소 가능(`unit_plan_mismatch`·`non_ancestor`·`ancestry_probe_error`·
`probe_error`)은 지금처럼 `metadata_watch`로 두되 PR 대기 행에
「영수증 대기 — <code>」 배지를 세운다.

**D3. 승계 신호는 큐 프로브다.** 세션이 mode를 해소하기 전
`GET /api/worker/queue`를 읽어 그 Bead의 구현 attempt가 살아 있는 큐에 하나라도
있으면 승계 세션이다 — `status`는 보지 않는다. 근거는 판정 집합을 §7의 baseline
대조 선택기와 정확히 같게 맞추는 것이다: `pr-actions.js:876-908`의
`receiptAttemptFor`가 status를 전혀 거르지 않으므로 어떤 status의 attempt든 그
얼어붙은 baseline이 머지 게이트의 대조 대상이 되고, 좁은 집합은 나머지
status에서 같은 `approval_forged`를 남긴다. 프로브 실패와 attempt 부재는 승계가
아니다. 프롬프트 블록 바이트는 바꾸지 않는다 — 사람이 읽는 안내 한 줄은 넣을 수
있으나 판정 근거가 아니다.

**D4. 승계 세션 규칙(dotfiles 소유).** 승계 세션은 `workflow_mode`를
`fast_track`으로 해소하고 source는 attempt의 `worker`를 승계하며, 권한 키
`impl_entry`·`plan_approval`·`impl_dispatch`·`workflow_mode_source`를 하나도
쓰지 않고 구현 진입을 질문하지 않는다. `exec_receipt`는 기존 `main:takeover`
규칙 그대로다. 승계면 mode 해소 사다리를 타지 않는 선판정이며, 판정은 새
스크립트가 아니라 세션이 직접 하는 산문 절차다 — 레인 배치가 이미 같은 GET을
세션 절차로 규정한다.

**D5. 알림.** `NEEDS_HUMAN_NOTIFY_CLASSES`에 머지 게이트 stage를
「머지 게이트 보류」로 더한다. 그 라벨은 dotfiles `workflow-state.yaml`의
`failure_classes`에 신설되는 `receipt_hold` 클래스의 `notify_label`을 그대로
복사한 것이다(형제 Bead 범위).

**D6. needs_human 원인 필드.** `merge_subject_pin_failed`·
`merge_prerecord_failed` 호출에 `failure_key`와 `evidence`(원인 문자열)를
넘긴다. `verify_config_invalid`를 만드는 두 생산 지점 — `auto-merge.js`의
`verifyState()` catch와 `[머지]` 클릭 경로 `pr-actions.js`의 `ensureVerify`
실패 — 는 버리던 오류(예외 메시지·실패 `code`)를 `error`로 실어 게이트 이유를
`verify_config_invalid:<error>`로 만든다.

**D7. 큐 GET에 attempts.** 응답에 `attempts: [{attempt_id, bead_id, status,
kind}]`를 더한다. 살아 있는 구현 attempt만이며 review 세션은 제외한다. 기존
필드는 불변이고 프로브 스크립트는 이 필드만 읽는다.

**D8. Bead 분할.** Bead는 `UI-jxs3` 하나다. 형제는 dotfiles rig 하나이며 계약
문장·스크립트·`workflow-state.yaml` 등록을 한 묶음으로 갖는다. `UI-jxs3`는 그
dotfiles Bead에 foreign `blocks`를 건다.

**D9. 테스트 범위.** §9.

## 2. 원인 구조

### 2.1 baseline은 attempt 생성 시에만 얼어붙는다

`server/worker/receipt-check.js:108-114`의 `RECEIPT_BASELINE_KEYS`는 다섯 키
`exec_receipt`·`impl_entry`·`plan_approval`·`workflow_mode_source`·
`impl_dispatch`다. `server/worker/scheduler.js:2763`의
`captureReceiptBaseline`이 dispatch 직전 그 값을 읽어 attempt에 싣고, 호출은 세
곳(`scheduler.js:6953` 일반 dispatch, `8791` 외부 충돌 해소, `9444` relaunch)
뿐이며 셋 다 **새 attempt를 만드는 자리**다.

`receipt-check.js:841`의 주석이 판정 근거를 명시한다 — "ANY movement is
forgery, deletion included". `impl_entry`·`plan_approval`의 어떤 이동이든
`approval_forged`, `impl_dispatch`는 `dispatch_forged`,
`workflow_mode_source`가 `user`가 되면 `mode_authority_forged`다(846-871).
셋 다 `EXEC_RECEIPT_MERGE_GATE.hold`(`receipt-check.js:76-94`)에 든다.

### 2.2 `[세션에서 해결]`은 attempt를 만들지 않는다

`server/ws/worker-handlers.js:5748`의 `handleWorkerResolveInSession`은
`server/worker/resolve-session.js:254`의 `createResolveSession().resolve()`를
부르고, 그 구현은 `queue.attempts`와 `completion_intents`를 건드리지 않은 채
기록 세션을 `claude --resume <id> --fork-session`으로 fork해 tmux로 띄운다
(`resolve-session.js:365-372`). 큐 쓰기는 `worker-handlers.js:5847-5852`의
`recordUserAction(..., 'resolve_in_session', '[세션에서 해결] 클릭')` 타임라인
이벤트 하나뿐이다. 따라서 baseline은 재포착되지 않는다.

`resumed_terminal`은 이 경로가 아니다. `server/worker/queue-store.js:8531`의
`enqueueMergeManual`이 `[머지]` 재클릭에서 needs_human intent를 되살릴 때
`8728-8740`에서 쓰는 필드이고 `[세션에서 해결]`과 무관하다.

### 2.3 mode 스탬프가 attempt 종료에 복원된다

`scheduler.js:2820-2822`가 dispatch 시 Bead에 `workflow_mode=fast_track`과
`workflow_mode_source=worker`를 쓰고 `2824-2833`에서 readback한다. attempt가
끝나면 `scheduler.js:3612`의 `revertWorkflowMode`가 attempt에 실린
`workflow_mode_prior`와 `workflow_mode_source_prior`로 되돌린다
(`scheduler.js:5688-5691`, `exec_stamped_keys`).

그래서 파킹 뒤 문의 세션이 뜰 때 Bead는 이미 `standard`로 돌아가 있다. 계약의
해소 순서 `current_user > bead_metadata > workspace_kv > harness_default`
(dotfiles `workflow-state.yaml:355`, harness 기본값 `standard`)에는 승계 특례가
없으므로 세션은 표준 모드로 판정하고, `docs/contracts/workflow-contract.md:72`의
impl-entry 조항대로 질문하고 `impl_entry`를 쓴다. **이것이 위조 판정의 직접
원인이다.**

### 2.4 보류가 `metadata_watch`에서 소리 없이 머문다

`server/worker/merge-gate.js:442-450`은 `receipt_state.state === 'probe_error'`를
`receipt_unbacked:probe_error`로, `451-459`는 `unbacked`를
`receipt_unbacked:<codes[0]>`로 보류시킨다. 둘 다 hold이고 terminal이 아니다.

소비 경로는 다음과 같다.

```
completion-intent.js:1716 factFromGate → state 'undecidable'
  → :518-519 needsHuman(reason)            (terminal 아님)
  → :2339-2362 onAction needs_human        (terminal !== true)
  → :1634 settleFailure
  → :321 classifyCompletionFailure         (':' 앞 토큰으로 매칭)
  → :231 COMPLETION_FAILURE_POLICY
         receipt_unbacked: 'metadata_watch'
  → startCompletionAutoResolution class metadata_watch
  → queue-store.js:1006-1010 phase 'waiting_metadata'
```

terminal이 없으므로 needs_human 이벤트도, 알림도, `auto_merge_skips` 기록도
남지 않는다. `completion-intent.js:1882-1956`의 `runMetadataCheck`는 bd 이벤트가
올 때마다 completion gate를 다시 돌리고 여전히 `metadata_watch`면 `last_error`만
갱신한 채 상한 없이 대기한다.

「머지 게이트 통과」 타임라인(`completion-intent.js:2165-2195`, `merge_step`
`gating:<bead>`)은 영수증 검사를 포함한 게이트가 통과한 뒤에만 발화한다.
실측의 07:39 이벤트는 **그 시점에는 영수증 검사가 통과했다**는 뜻이고, 이후
세션이 `impl_entry`를 쓰면서 다음 재판정이 보류로 뒤집힌 것이다. 순서 결함이
아니므로 이 스펙은 발화 시점을 바꾸지 않는다.

### 2.5 원인이 기록되지 않는다

`completion-intent.js:1381`의 `terminalize`는 terminal 레코드에 `reason`(folded)·
`stage`·`failure_key`·`evidence`(문자열 뒤 4000자)·`log_path`·`op_id`·
`comment_at`·`at`을 싣는다. 호출자가 넘기지 않으면 전부 `null`이다.

- `completion-intent.js:2260-2266` — `settleFailure(root, 'merge_subject_pin_failed',
'merge_subject')`: `failure_key`도 `evidence`도 없다.
- `completion-intent.js:2292-2299` — `merge_prerecord_failed`: `failure_key`만
  있고 `evidence`가 없다.

`verify_config_invalid`를 만드는 생산 지점은 둘이고 둘 다 원인을 버린다.
`server/worker/auto-merge.js:128-133`은 `verifyState()`가 throw하면
`{declaration_state: 'invalid', base_sha: null}`로 대체하고 예외를 버린다.
`server/worker/pr-actions.js:1185-1199`는 `[머지]` 클릭의 `gateNow`에서
`repo_operations.ensureVerify(...)`가 `ok: false`(또는 `operation_id` 부재)를
돌려주면 그 `code`(`verify_candidate_mismatch`, materialize 실패 코드, 정책
해석 실패 등 — `server/worker/repo-operation-coordinator.js:926-1000`)를 버리고
`{declaration_state: 'invalid', receipt: null}`로 게이트를 부른다. 실측의
needs_human은 클릭 경로에서 났으므로 두 번째 지점이 유력하지만, 코드가
기록되지 않아 확정하지 못했다.

알림도 닫혀 있다. `completion-intent.js:786-791`의
`NEEDS_HUMAN_NOTIFY_CLASSES`는 `post_merge_jobs`·`repo_operations`·`deploy`·
`deployment_request` 네 stage 토큰만 담고, `announceNeedsHuman`
(`completion-intent.js:1487-1515`)은 그 밖의 stage에서 조용히 반환한다. 머지
게이트 stage의 needs_human은 Discord로 나가지 않는다.

## 3. 승계 세션 계약 (dotfiles 소유 — 여기서는 소비 문장만)

**이 절의 정본은 dotfiles 형제 Bead의 스펙이다.** beads-ui가 이 저장소에서
쓰는 것은 아래 소비 문장 하나와 포인터뿐이다(ADR 0012 — beads-ui는 계약을
런타임에 읽지 않는 소비자다).

> Worker가 dispatch한 attempt를 이어받은 세션은 `impl_entry`를 비롯한 권한 키를
> 쓰지 않는다. 따라서 그 attempt의 `receipt_baseline`은 승계 뒤에도 유효하며,
> beads-ui는 baseline을 재포착하지 않는다.

dotfiles 쪽이 소유하는 것(형제 Bead 범위, 여기서 복제하지 않는다):

- `docs/contracts/workflow-contract.md:72` impl-entry 조항에 승계 예외 한 줄.
  현행 조항은 표준 사용자만·사용자 개시 턴에서만·anchor는 `spec_review`이며
  Worker attempt 승계나 `[세션에서 해결]`에 대한 언급이 없다.
- `workflow-state.yaml:103-113`(`impl_entry`)와 `:114-118`
  (`user_approval_turn`)의 승계 분기.
- `workflow-state.yaml:355` mode 해소 precedence의 승계 특례.
- `workflow-contract.md:134` — `fast_track`이 `workflow_mode_source`에
  `user`나 `worker`를 쓰고 `standard`는 생략한다는 현행 조항. 승계는 attempt의
  `worker`를 승계하므로 새 값이 필요 없다.
- `exec_receipt`의 `main:takeover` 규칙(`workflow-contract.md:74-76`,
  `workflow-state.yaml:302-311`)은 그대로다.
- 승계 판정 절차 — `references/execution.md`에 새 절로, `Worker lane placement`가
  이미 쓰는 두 프로브 단계(kv `bdui_url` 읽기, `GET … 200`)를 인용해 §7의
  `attempts` 필드를 읽는다. 새 스크립트는 만들지 않는다: dotfiles에는 파이썬
  HTTP 클라이언트가 없고 이 프로브는 이미 세션 수행 절차다.
- `workspace_kv_defaults.key_scoped`의 `bdui_url` consumer가 둘이 된다(레인
  배치 + 승계 판정).
- 연결 한 줄씩: workflow `SKILL.md`의 mode 해소 문장,
  `references/execution.md`, 파킹 스펙
  `2026-09-03-parking-contract-spec-deviation-and-inquiry-design.md` §3.3.
  §3.3은 "그 세션이 구현을 finish까지 잇는다"까지만 정하고 어떤 mode로 잇는지를
  비워 두었다 — D4가 그 빈자리를 채운다.
- 알림 어휘 등록(D5): `workflow-state.yaml`의 `failure_classes`(612-630)에 별도
  클래스 `receipt_hold`를 신설하고 그 `notify_label`을 「머지 게이트 보류」로
  둔다. 그 라벨 바이트가 §5.2가 복사하는 문자열이다. `pre_merge_hold`에 cause를
  더하지 않는다 — 그 클래스는 다시 관측하면 풀리는 보류이고 이것은 클릭으로만
  풀리는 종단이라 출구 집합이 다르다. `needs_human_reentry.notification`은 이미
  `automatic: true`이고 payload에 `failure_class`를 실으므로 스키마를 바꾸지
  않는다.

큐 프로브 자체는 이미 계약 표면이다(`workflow-contract.md:20`,
workflow `SKILL.md:18`·`:51`, `references/execution.md:180-222`의
`GET <bdui_url>/api/worker/queue?root_dir=<repo-absolute-path>`). D3은 그
표면에 새 소비처를 하나 더할 뿐 새 전송 계약을 만들지 않는다.

**beads-ui가 이 결정으로 바꾸는 코드는 없다.** D1은 §4가 닫는 나머지 절반의
전제일 뿐이며, 이 저장소에서 `receipt_baseline` 관련 코드는 한 줄도 움직이지
않는다.

## 4. 영수증 보류의 분류와 종단 (beads-ui 소유)

### 4.1 해소 가능성 레지스트리 — `server/worker/receipt-check.js`

ADR 0012의 field registry 방식대로, hold 코드를 두 부분집합으로 나누는 상수를
같은 모듈에 둔다.

```js
export const RECEIPT_HOLD_RESOLUTION = Object.freeze({
  unresolvable: Object.freeze([
    "approval_forged",
    "dispatch_forged",
    "mode_authority_forged",
  ]),
  resolvable: Object.freeze([
    "unit_plan_mismatch",
    "non_ancestor",
    "ancestry_probe_error",
  ]),
});
```

`unresolvable`은 baseline 대비 이동으로만 나며 삭제도 같은 위반이라 Bead
metadata 편집으로 되돌릴 수 없는 셋이다(§2.1). `resolvable`은 새 커밋·새
영수증·probe 재관측으로 관측이 바뀔 수 있는 셋이다.

게이트 밖에서 오는 `probe_error`(metadata 미관측·검사기 예외)는
`EXEC_RECEIPT_MERGE_GATE.hold`의 원소가 아니지만 이유 문자열
`receipt_unbacked:probe_error`로 도착하므로 소비 쪽에서 `resolvable`로 다룬다
(§4.2). 테스트가 두 부분집합의 서로소와 합집합=`EXEC_RECEIPT_MERGE_GATE.hold`
6코드를 고정한다.

`verify_receipt` 계열 표시 전용 코드는 이 블록의 대상이 아니며 그대로 둔다.

### 4.2 소비 — `server/worker/completion-intent.js`

`COMPLETION_FAILURE_POLICY`(`completion-intent.js:231-252`)의 매칭 단위는
`classifyCompletionFailure`(`:321-344`)가 `':'` 앞에서 자른 첫 토큰이므로
`receipt_unbacked` 하나다. 코드별로 갈라지려면 그 앞에서 판단해야 한다.

`factFromGate`(`:1716-1761`)가 `verdict.reason`을 `state: 'undecidable'`로
접기 전에 영수증 이유를 분기한다.

- `reason`이 `receipt_unbacked:`로 시작하고 코드가
  `RECEIPT_HOLD_RESOLUTION.unresolvable`에 들면
  `{ state: 'undecidable', reason: 'receipt_unresolvable:<code>', terminal: true }`.
- 그 밖의 `receipt_unbacked:<code>`(`probe_error` 포함)는 현행 그대로
  `{ state: 'undecidable', reason }` — `metadata_watch`로 간다.

`onAction`의 `needs_human` 분기(`:2339-2362`)는 이미 `action.terminal === true`를
stage `'coordinator'`로 `terminalize`에 보내며 그때 `fact.failure_key`와
`fact.evidence`를 그대로 넘기고 §3 정책표를 건너뛴다. 그러므로 `:518-519`의
`needsHuman(fact.reason)` 호출이 `fact.terminal === true`일 때 terminal 플래그를
함께 넘기면 나머지 경로는 손대지 않는다.

`factFromGate`가 만드는 terminal fact는 `failure_key`로
`createCompletionFailureKey({ stage: 'merge_gate', reason, subject_sha,
base_sha, evidence: { output_tail: detail } })`(`completion-intent.js:179`)를,
`evidence`로 관측된 위반 detail 문자열(`impl_entry (absent) -> user@…` 형태)을
싣는다. `announceNeedsHuman`은 `terminal.failure_key?.stage || terminal.stage`로
알림 클래스를 찾으므로(§5.2) 이 `failure_key.stage`가 알림의 키다. 이유
문자열은 `receipt_unresolvable:<code>`이고 **게이트가 만든
`receipt_unbacked:<code>`는 그대로 남는다** — 게이트 이유는 큐 실패 문구와
자동 제외 기록이 이미 쓰는 값이므로 바꾸지 않는다(D2).

`COMPLETION_FAILURE_POLICY`에는 `receipt_unresolvable` 항목을 넣지 않는다.
terminal 경로는 정책표를 보지 않고, 표에 없는 토큰의 기본값은 `human`이라 어느
쪽으로 새도 자동 재시도로 떨어지지 않는다.

### 4.3 사람이 보는 결말

terminal이 서면 기존 needs_human 표면이 전부 그대로 켜진다 — 상태 뱃지
「확인 필요」, 타임라인 needs_human 이벤트, `[세션에서 해결]`과 `[머지]` 재클릭
재진입(ADR 0024). `[머지]` 재클릭은 `enqueueMergeManual`
(`queue-store.js:8531`)이 `resumed_terminal`을 남기고 계약대로 그 head의
receipt tier를 waive하므로, 실측에서 3차 클릭이 뚫은 경로가 **1차 클릭 전에**
알림으로 안내된다.

`runMetadataCheck`의 무한 대기는 `resolvable` 셋에만 남는다. 상한은 두지 않는다
— 그 셋은 새 관측으로 실제로 풀리는 코드이고, 침묵이 문제였지 대기가 문제가
아니었기 때문이다. 대기가 보이게 하는 것이 §5다.

## 5. 가시화 — 배지 슬롯과 알림 클래스

### 5.1 「영수증 대기」 배지

재료는 이미 durable하다: `completion_intents[bead_id].auto_resolution`의
`class === 'metadata_watch'`와 `origin_reason`이다. 새 필드를 만들지 않는다.

`app/views/worker/lane-model.js:2556-2563`의 `autoSkipReason`은
`auto_merge_skips[bead_id]`의 `head_sha`가 지금 관측된 head와 같을 때만 사유를
돌려준다. 그 옆에 같은 모양의 파생 하나를 둔다: `metadataWatchReason(bead_id)`는
intent의 `auto_resolution.class`가 `metadata_watch`이고 `origin_reason`이
`receipt_unbacked:`로 시작할 때만 그 코드를 돌려주고 그 밖에는 `null`이다.
PR 대기 행 item에 `receipt_wait: '<code>'`로 싣는다(재료가 없으면 필드를 넘기지
않는다).

`app/views/worker/index.js:1015-1020`의 「자동 제외 — …」 배지와 **같은 슬롯**
이다. 판정 순서는 `queue_failure` → `auto_skip` → `receipt_wait`이며 문구는
「영수증 대기 — <code>」, `title`은 원본 이유 문자열, `alert`는 쓰지 않는다 —
아직 사람이 할 일이 없는 대기이기 때문이다. 이 배지는 Worker 탭 PR 대기
행에 그린다. Monitor 탭 행은 `monitor-pipeline-snapshot` 투영에서 오고 그
투영은 `completion_intents`를 싣지 않으므로(`자동 제외` 배지도 지금 Monitor에
없다) 이 스펙은 Monitor 반영을 범위에 넣지 않는다 — 관찰 항목으로 남긴다.

`mergeFailureText`(`app/views/worker/index.js:356-401`)는 바꾸지 않는다. 그
함수의 `receipt_unbacked:` 분기는 「실행 영수증 자동 검증 불가(<code>) —
[머지] 클릭으로 수동 진행 가능」을 계속 내고, 배지 문구는 그 위에서 짧은 라벨로
만든다.

`auto_merge_skips`에는 쓰지 않는다. `recordMergeSkip`
(`server/worker/queue-store.js:10067-10087`)은 행을 `merge_queue`에서 빼는
durable 제외 기록이고, 영수증 보류는 자동 머지 등록 이전 단계라 제외한 적이
없는 행에 제외 기록을 남기게 된다.

### 5.2 알림 클래스

`completion-intent.js:786-791`의 `NEEDS_HUMAN_NOTIFY_CLASSES`에 키
`merge_gate`를 `'머지 게이트 보류'`로 더한다. `announceNeedsHuman`
(`:1487-1515`)은 `failure_key.stage`를 먼저 조회하므로 §4.2의 terminal fact가
실은 `failure_key.stage === 'merge_gate'`가 그 키에 닿는다. 항목 추가로
충분하다.
`next_action` 문자열은 이 클래스에서 `'[머지] 재클릭 또는 [세션에서 해결]'`로
낸다 — `[정리 재시도]`는 머지 이전 단계에 없는 버튼이다.

이 라벨 문자열의 정본은 dotfiles `failure_classes.receipt_hold.notify_label`이고
이 저장소는 그 바이트를 복사한다(§3, D5). **dotfiles가 선행이다** — 클래스와
라벨이 계약에서 먼저 정해져야 소비자가 그 문자열을 쓴다.

## 6. needs_human 원인 필드와 `verifyState` 오류

### 6.1 빈 호출 둘을 채운다 (`server/worker/completion-intent.js`)

`queue-store.js`의 `setCompletionSubject`·`prepareCompletionOp`는 실패 시
`{ ok: false, conflict: <bool>, queue }`만 돌려주고 사유 문자열이 없다. 따라서
`evidence`는 호출자가 그 결과와 현재 intent에서 만든다.

- `:2260-2266` — `merge_subject_pin_failed`에 `failure_key`로
  `mergeFailureKey(root_bead_id, current, fact)`와 같은 규칙의 키를,
  `evidence`로 `setCompletionSubject conflict=<bool> phase=<intent.phase>
subject=<head_sha>` 형태의 한 줄을 넘긴다.
- `:2292-2299` — `merge_prerecord_failed`에 `evidence`로
  `prepareCompletionOp conflict=<bool> active_op=<op_id|null>` 형태의 한 줄을
  더한다. `failure_key`는 현행 그대로다.

`terminalize`(`:1381-1427`)는 이미 `evidence` 문자열을 뒤 4000자로 잘라 싣고
`log_path`를 뽑아내므로 접점 변경이 없다.

### 6.2 `verify_config_invalid`의 원인을 버리지 않는다

생산 지점 둘(§2.5)이 각각 원인을 `error` 필드로 싣고, 게이트가 그것을 이유
문자열에 붙인다.

**`server/worker/auto-merge.js:128-133`** — catch가 예외 메시지를
`verify_policy.error`에 싣는다.

```js
let verify_policy = { declaration_state: "invalid", base_sha: null };
try {
  verify_policy = deps.verifyState();
} catch (err) {
  verify_policy = {
    declaration_state: "invalid",
    base_sha: null,
    error: err instanceof Error ? err.message : String(err),
  };
}
```

이 값은 `mergeQueueCandidates`(`server/worker/merge-candidates.js:198-230`)를
거쳐 `repoOpsVerifyReceiptState`(`server/worker/repo-ops-display.js:158-171`)가
`verify_receipt_state`로 접는다. 그 함수의 `present`가 아닌 분기가
`policy.error`를 그대로 실어 넘긴다.

**`server/worker/pr-actions.js:1185-1199`** — `ensureVerify`가 `ok: false`를
돌려주면 `verify_receipt_state`에 `error: ensured.code ?? 'operation_id_missing'`
을 더한다.

**`server/worker/merge-gate.js:462-470`** — `declaration_state === 'invalid'`
분기는 `verify_state.error`가 문자열이면 이유를
`verify_config_invalid:<error>`로, 없으면 현행 `verify_config_invalid` 그대로
낸다. 토큰이 `':'` 앞에서 잘리므로 `classifyCompletionFailure`의 매칭도 현행과
같다.

## 7. 큐 GET 투영 — `server/routes/worker-queue.js`

`workerQueueGetHandler`(`:133-149`)의 응답에 `attempts`를 더한다. 기존 키
`ok`·`revision`·`serial_lane_count`·`lanes`·`running`·`pr_wait`은 불변이다.

```
attempts: [{ attempt_id, bead_id, status, kind }]
```

투영 규칙은 `projectRunning`(`:94-110`)과 같은 자리에 새 함수로 둔다.

- 대상은 `queue.attempts`의 값 전부 — 살아 있는 큐가 정본이고 합집합 조회를
  쓰지 않는다(ADR 0029: 살아 있는 `queue.attempts`는 bead 이력의 최신 접미).
- `external_conflict === true`인 attempt와 review 세션을 제외한다. 판정은
  `server/worker/pr-actions.js:876-908`의 `receiptAttemptFor`가 쓰는
  `isImplementationAttempt`와 같은 술어다 — 승계 판정의 대상은 영수증 baseline을
  가진 구현 attempt이므로 두 곳이 같은 집합을 봐야 한다.
- `status`는 `queue-store.js:1793-1812`의 `TERMINAL_ATTEMPT_STATUSES` 어휘를
  그대로 실어 보낸다(`done`·`failed`·`orphaned`·`stopped`·`discarded`·`parked`·
  `retry_wait`·`superseded`·`waiting`과 `pending`·`running`). 승계 판정은 이
  값을 보지 않지만(D3), 세션이 사람에게 알리는 한 줄과 진단에 필요하므로 싣는다.
- `kind`는 attempt 종류를 그대로 싣는다. 새 값을 만들지 않는다.

`Cache-Control: no-store`와 400 `bad_request` 경로는 현행 그대로다.

## 8. 바꾸는 파일

| 파일                                 | 무엇                                                            | 절             |
| ------------------------------------ | --------------------------------------------------------------- | -------------- |
| `server/worker/receipt-check.js`     | `RECEIPT_HOLD_RESOLUTION` 레지스트리                            | §4.1           |
| `server/worker/completion-intent.js` | 해소 불가 terminal 분기·알림 클래스·원인 필드 둘                | §4.2·§5.2·§6.1 |
| `server/worker/merge-gate.js`        | `verify_config_invalid:<error>` 접미(영수증 이유 문자열은 불변) | §6.2           |
| `server/worker/auto-merge.js`        | `verifyState` 예외 메시지를 `error`로 전달                      | §6.2           |
| `server/worker/pr-actions.js`        | `ensureVerify` 실패 `code`를 `error`로 전달                     | §6.2           |
| `server/worker/repo-ops-display.js`  | `repoOpsVerifyReceiptState`가 `error` 통과                      | §6.2           |
| `server/routes/worker-queue.js`      | 응답 `attempts` 투영                                            | §7             |
| `app/views/worker/lane-model.js`     | `metadataWatchReason` 파생·`receipt_wait`                       | §5.1           |
| `app/views/worker/index.js`          | 「영수증 대기 — <code>」 배지                                   | §5.1           |

빌드 산출물 `app/main.bundle.js`와 `.map`은 표시층 변경에 따라 함께 갱신된다.

## 9. 테스트 범위 (D9)

- `server/worker/receipt-check.test.js` — `RECEIPT_HOLD_RESOLUTION`의
  `unresolvable`·`resolvable`이 서로소이고 합집합이
  `EXEC_RECEIPT_MERGE_GATE.hold` 6코드와 정확히 같다.
- `server/worker/completion-intent.test.js`
  - 코드별 분류 `test.each`: 위조 3종은 terminal, `unit_plan_mismatch`·
    `non_ancestor`·`ancestry_probe_error`·`probe_error`는 `metadata_watch`.
  - 해소 불가 terminal 경로: `terminal_reason.reason`이
    `receipt_unresolvable:<code>`이고 `failure_key`·`evidence`가 채워지며
    게이트 이유 문자열 `receipt_unbacked:<code>`는 변하지 않는다.
  - 알림: 머지 게이트 stage의 terminal이 `announceNeedsHuman`을 태우고
    `failure_class`가 「머지 게이트 보류」다. 나머지 stage는 현행대로 조용하다.
  - `evidence` 채움: `merge_subject_pin_failed`·`merge_prerecord_failed`가
    `failure_key`와 `evidence`를 싣는다(현행 픽스처
    `completion-intent.test.js:589-600`의 기대값 갱신).
- `server/worker/merge-gate.test.js` — 회귀 고정: hold 6코드의 이유 문자열이
  `receipt_unbacked:<code>` 그대로다. `verify_receipt_state.error`가 있으면
  이유가 `verify_config_invalid:<error>`, 없으면 `verify_config_invalid`다.
- `server/worker/auto-merge.test.js` — `verifyState()` throw 시
  `verify_policy.error`에 메시지가 실린다(현행 테스트 `:238-265`의 기대값
  확장). 정상 `invalid`에는 `error`가 없다.
- `server/worker/pr-actions.test.js` — `ensureVerify`가 `{ ok: false, code }`를
  돌려주면 게이트 이유가 `verify_config_invalid:<code>`다.
- `server/worker/repo-ops-display.test.js` — `repoOpsVerifyReceiptState`가
  `invalid` 정책의 `error`를 통과시킨다.
- `server/routes/worker-queue.test.js` — 응답 `attempts`가 살아 있는 구현
  attempt만 담고 `external_conflict`와 review 세션을 제외하며, 기존 여섯 키가
  그대로다.
- `app/views/worker/lane-model.test.js` — `metadata_watch`이고 `origin_reason`이
  `receipt_unbacked:`인 intent만 `receipt_wait`를 만든다. 다른 class·다른
  `origin_reason`·intent 부재는 필드가 없다.
- `app/views/worker/index.test.js` — 배지 문구·`title`·판정 순서
  (`queue_failure` → `auto_skip` → `receipt_wait`), `alert` 없음.
- dotfiles(형제 Bead) — `check-workflow-contract.py` 체커와 그 계약 테스트.
- 절차: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120s) ·
  `npm run lint` · `npm run prettier:write` → `npm run build`
  (prettier → build 순서).

## 10. 구현 unit 후보

- **unit1 — 보류의 분류와 종단.** §4 전부와 §5.2 알림 클래스. 한
  레지스트리에서 갈라지는 판정이라 서버 안에서 쪼개지 않는다.
- **unit2 — 가시화와 기록.** §5.1 배지, §6 원인 필드·`verifyState` 오류, §7 큐
  GET 투영. unit1과 자료 의존이 없다.

한 Bead 안의 두 unit이며 `unit_plan`으로 이름을 고정한다. 나누지 않고 단일
unit으로 가도 무방하다 — 파일 아홉 개 규모다.

## 경계·후속

| 종류 | 저장소/rig                   | admission 클래스      | 분할 근거                        | 선행(blocked_by) | Bead ID            |
| ---- | ---------------------------- | --------------------- | -------------------------------- | ---------------- | ------------------ |
| 형제 | dotfiles                     | `awaited_by_consumer` | 다른 저장소가 소유하는 계약 표면 | 없음             | dotfiles-xk12      |

형제 Bead는 §3이 열거한 한 묶음을 갖는다 — 승계 세션 규칙 문장과 그 프로브
절차, `workflow-state.yaml`의 `receipt_hold` 클래스 등록, 그리고 두 표면을
고정하는 체커. `UI-jxs3`는 그 dotfiles Bead에 **foreign `blocks`를 건다**: 알림 클래스
이름이 계약에서 먼저 정해져야 §5.2가 그 문자열을 쓸 수 있고, 승계 규칙이
계약에 서야 §4.1의 `unresolvable` 분류가 "다시 나지 않는 위반"이라는 전제를
갖는다. dotfiles Bead 자신의 `blocked_by`는 없다.

`UI-35io`(구조적 검증 불가 receipt 행의 사전 분류)는 **핸드오프 때 이 스펙을
사유로 close한다.** 그 1번 항목(`main:takeover` 계보 미관측이 `probe_error`로
무한 스킵)은 `2026-08-29-exec-receipt-merge-gate-consumer-design.md`가
`takeover_lineage_unobservable` badge로 바꾸면서 이미 소멸했고, 2번 항목
(`metadata_watch` 무한 대기의 분류)은 이 스펙 §4가 닫는다.

- 비목표: `receipt_baseline` 재포착, 게이트 이유 문자열 변경,
  「머지 게이트 통과」 타임라인의 발화 시점(§2.4), `runMetadataCheck`의 대기
  상한(§4.3), `[세션에서 해결]`의 fork 방식과 프롬프트 블록 바이트(D3).
- 관찰: D3의 넓은 승계 판정은 폐기·중단된 attempt가 큐에 남은 Bead에서도 성립해,
  그 Bead를 새로 집는 대화형 세션이 구현 진입 질문을 잃는다. 대신 세션이 승계
  사실을 한 줄로 알린다. 좁히려면 baseline 대조 선택기 쪽을 함께 좁혀야 하므로
  (`receiptAttemptFor`에 status 필터) 이 스펙의 비목표다 — 실측 뒤 판단한다.
- 관찰: `resolvable` 셋의 대기는 상한 없이 남는다 — 배지로 보이게 됐으므로
  상한이 필요한지는 실측 뒤에 판단한다. 관측 전에 정책을 늘리지 않는다.
- 관찰: Monitor 탭 PR 대기 행에는 「영수증 대기」도 「자동 제외」도 없다 —
  `monitor-pipeline-snapshot`이 `completion_intents`를 싣지 않기 때문이다(§5.1).
  이월 칩과 같은 계열의 투영 부재이며 `UI-ys18`이 그 투영을 넓힐 때 함께
  판단한다.
- 관찰: `auto_merge_skips`는 영수증 보류를 담지 않는다(§5.1). 자동 머지 등록
  이전 단계의 보류이므로 durable 제외 기록의 뜻과 어긋난다.
- 관찰: `verify_config_invalid`의 실제 원인은 실측에서 끝내 확정되지 않았다.
  §6.2는 다음 발생을 기록할 뿐 지난 건을 소급하지 않는다.
- 관찰(scope 겹침): `app/views/worker/lane-model.js`와
  `app/views/worker/index.js`는 여러 표시층 Bead가 공유하는 파일이다. 이 스펙은
  배지 슬롯 한 자리만 더하고 기존 판정 순서를 바꾸지 않으므로 `blocks` 엣지를
  걸지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0036 — 파킹의 출구는 값별 문의 세션의 자동 기동과 파킹 타일
  `[세션에서 해결]` 클릭뿐이고 새 attempt는 없다. §2.2의 "승계는 attempt를
  만들지 않는다"가 그 결정의 직접 귀결이며, 이 스펙은 출구를 늘리지 않는다.
- 전제: ADR 0031 — 영수증이 없거나 조상이 아니면 머지는 terminal 실패가 아니라
  보류다. 그 Decision의 대상은 `impl_review` 영수증이고 출구는 자동 리뷰
  lineage와 `[리뷰 후 머지]`다. §4는 `exec_receipt`의 위조 3종 — 새 관측으로는
  결코 풀리지 않아 그 결정이 전제한 "해소 경로"가 아예 없는 코드 — 만 종단으로
  옮기므로 0031의 범위와 겹치지 않고 supersede 대상이 아니다.
- 전제: ADR 0024 — 사용자 개시 실패의 재진입은 자동 알림 뒤 사람 클릭이다.
  §4.3과 §5.2는 새 출구를 만들지 않고 기존 두 클릭에 알림 하나를 붙인다.
- 전제: ADR 0012 — beads-ui는 계약 파일을 런타임에 읽지 않고 필요한 subset만
  코드의 field registry로 복제한다. §3의 소비 문장과 §4.1의 레지스트리가 그
  방식이다.
- 전제: ADR 0014 — 카드의 줄 순서와 새 요소의 자리는 공유 슬롯 표가 정한다.
  §5.1은 자동 제외 배지와 같은 슬롯을 쓰고 새 슬롯을 만들지 않는다.
- 전제: ADR 0029 — 살아 있는 `queue.attempts`는 bead 이력의 최신 접미이고
  "마지막 구현 attempt" 판정은 라이브 큐만 본다. §7의 투영이 그 규칙 위에 선다.

- 영수증 보류는 해소 가능성으로 분류하고, 해소 불가는 즉시 terminal
  needs_human으로 종단한다.
  - 되돌리기 어렵다: 성립 — terminal은 durable 기록이고 알림이 나가며 사용자
    클릭이 뒤따르는 상태 전이다. 분류를 되돌려도 그 사이에 종단된 intent는
    자동으로 대기로 돌아가지 않는다.
  - 여러 표면에 걸친다: 성립 — 영수증 검사 레지스트리, completion 코디네이터의
    실패 정책, 알림 클래스, PR 대기 행 배지, 그리고 dotfiles 계약의 알림 어휘가
    한 판정에 묶인다.
  - 앞으로의 판단 입력이 된다: 성립 — 새 hold 코드가 계약에 생길 때마다 "이
    코드는 새 관측으로 풀리는가"를 먼저 묻게 되고, 그 답이 종단이냐 대기냐를
    정한다.
  - 세 조건이 모두 성립하므로 `summary` 초안을 단다.
    `summary`: "머지 게이트의 영수증 보류는 새 관측으로 해소될 수 있는지로
    나뉘고, 해소 불가 위조 3종은 대기 없이 terminal needs_human으로 종단해
    알림과 두 클릭으로 넘긴다"
  - → ADR
- Worker attempt를 이어받은 세션은 권한 키를 쓰지 않고 `fast_track`을 승계한다.
  - 되돌리기 어렵다: 판단 대상 아님 — 이 저장소는 그 규칙을 소유하지 않는다.
  - 여러 표면에 걸친다: 판단 대상 아님 — 계약 문장·상태 스키마·스킬 스크립트가
    전부 dotfiles 안에 있다.
  - 앞으로의 판단 입력이 된다: 판단 대상 아님 — 정본이 dotfiles에 있으므로
    입력도 그쪽에서 나온다.
  - 정본은 dotfiles 형제 스펙과 그 ADR이다. beads-ui 쪽에 남는 것은 §3의 소비
    문장 하나와 이 포인터뿐이며(ADR 0012), 이 저장소는 그 결정으로 코드를 바꾸지
    않는다. → ADR 아님
- 큐 GET이 살아 있는 구현 attempt 목록을 투영한다.
  - 되돌리기 어렵다: 불성립 — 응답 키 하나이고 기존 여섯 키를 건드리지 않아
    지우면 현행으로 돌아간다.
  - 여러 표면에 걸친다: 불성립 — 라우트 하나와 그것을 읽는 dotfiles 스크립트
    하나이며, 새 durable 필드도 새 판정도 없다.
  - 앞으로의 판단 입력이 된다: 불성립 — 판정(어떤 status가 승계인가)은 D3대로
    소비자가 갖고, 이 투영은 이미 있는 큐 사실을 그대로 옮긴다.
  - → ADR 아님
