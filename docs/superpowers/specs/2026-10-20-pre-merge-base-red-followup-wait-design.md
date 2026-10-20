---
scope:
  - server/worker/completion-intent.js
  - server/worker/queue-store.js
  - server/worker/repo-operation-coordinator.js
  - server/worker/pr-poller.js
  - server/worker/merge-gate.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/views/worker/pr-wait-row.js
  - server/worker/
  - app/views/worker/
---

# 머지 전 검증 base 실패 대기: base 검증·후속 닫힘 관찰·자동 재검증 (UI-ty6k)

## 1. 목표

dotfiles-84icv spec(`docs/superpowers/specs/2026-10-20-pre-merge-base-red-followup-wait-design.md`, dotfiles)이 정한
`failure_classes.pre_merge_wait`와 `base_red_followup` 키를 Worker가 구현한다. 어휘·진입 순서·출구·상한의 정본은
그 spec §4.1~4.3이고, 이 spec은 Worker 안의 상태·관찰·표시만 정한다.

- 머지 전 검증이 같은 후보 재시도까지 실패하면, 연결된 후속이 살아 있을 때만 PR 없는 base 검증을 한 번 돌린다.
- base도 `script_failed`면 완료 의도(completion intent)를 알림·대화 없는 대기 단계에 둔다.
- 연결된 후속이 모두 끝나면 base 이동을 확인하고, 움직였으면 새 base로 후보를 다시 만들어 검증을 한 번 돌린다.
- 재검증 실패·base 그대로·48시간 상한이면 지금의 「머지 전 검증 실패」 보류로 들어간다.

## 2. 검증된 전제

beads-ui `e8887fd411a8e729856f5c64b83642963b0742fd`, dotfiles `d157b4c35bbbec46175134e0ce8fe07bfc99baaf` 기준.

- 완료 의도 단계는 `gating|holding|merging|cleaning|waiting_metadata|reviewing|retrying|paused|needs_human|completed`다 — server/worker/queue-store.js:1102
- 자동 해소 클래스는 단계에 묶인 고정 목록이다 — server/worker/queue-store.js:1342-1346
- 검증 보류 판정은 `verify_hold` 사실에서 `hold` 동작으로 간다 — server/worker/completion-intent.js:616-624
- 보류 진입 알림·대화는 `first_hold`(보류 없음 또는 다른 head)일 때만 난다 — server/worker/completion-intent.js:2594, :2627-2661
- 보류 기록은 `class: pre_merge_hold`, `cause: verify_failure`로 고정된 형이다 — server/worker/queue-store.js:1194-1207
- 머지 후보는 핀 base에 detached 체크아웃을 만들고 PR head를 squash한다 — server/worker/repo-operation-coordinator.js:4223, :4234
- 검증 operation id는 base·후보 tree·스크립트로 정해진다 — server/worker/repo-operation-coordinator.js:229-254
- 같은 후보 1회 자동 재시도가 있다 — server/worker/repo-operation-coordinator.js:905, :3200
- 같은 후보 재현 실패는 수리 Bead를 만들고 `repo_operations[op].recovery.handoff.handoff_bead_id`에 남긴다 — server/worker/repo-operation-coordinator.js:1032-1167, server/worker/queue-store.js:4350
- 폴러는 base·head·스크립트 키로 검증을 중복 없이 돌린다 — server/worker/pr-poller.js:1020-1028
- bd DB 변경 때 `waiting_metadata` 의도를 다시 보는 트리거가 있다 — server/worker/completion-intent.js:3082
- 보류 배지는 「검증 실패 — 수정 push 대기」다 — app/views/worker/pr-wait-row.js:170-176
- base만 다시 핀하면 보류는 유지된다 — server/worker/queue-store.test.js:4002
- 미확인: 폴러가 `holding` 행에서 base 이동 시 돌린 검증 영수증을 실제로 소비하는 곳이 없다 — 코드 읽기만 했고 실행하지 않았다

## 3. 결정

- 결정 1 — 새 단계 `waiting_followup`과 자동 해소 클래스 `base_red_followup`을 더한다(`COMPLETION_AUTO_RESOLUTION_PHASE`
  확장). (대안: `holding` 안의 플래그 — 보류 진입 알림·대화 경로와 섞인다.)
- 결정 2 — base 검증은 기존 검증 체크아웃에서 squash 단계만 뺀 후보로, 같은 `[verify]` 스크립트·같은 operation 장부를
  쓴다(새 실행기 없음). operation 종류는 `verify`, 대상 표시는 `base_only`.
- 결정 3 — 후속 닫힘 관찰은 기존 `onIssuesChanged` 트리거에 `waiting_followup`을 더하고, 상한 확인은 같은 트리거와 기존
  재시도 깨우기 타이머로 한다. 새 폴링 루프는 없다.
- 결정 4 — 대기 기록은 queue.json 완료 의도에 영속한다(메모리 관측 캐시에 두지 않는다). 예: `intent.followup_wait =
  {head_sha, base_sha, links, base_op_id, at, deadline_at, outcome}`, `intent.followup_waits[]`에 (PR, head) 1회 기록.
- 결정 5 — 대기 배지는 「base 실패 — <후속 ID> 착지 대기」, 주의(alert) 아닌 정보 색이다. 버튼은 `[리뷰 후 머지]`만 남긴다.
- 결정: `holding` 진입의 알림·대화 자동 기동(`first_hold`, `hold_launches`)은 바꾸지 않는다 — 대기가 보류로 끝날 때 그
  진입이 지금처럼 알림과 대화를 연다.

## 4. 설계

### 4.1 진입

`verify_hold` 사실이 나오면 `hold` 전에 대기 판정을 먼저 한다.

1. 실패가 `script_failed`이고 같은 후보 재시도가 소비됐는지 본다. 아니면 `hold`.
2. 이 (PR, head)가 `followup_waits[]`에 있으면 `hold`.
3. 연결 수집: 원 Bead `base_red_followup`(쉼표 분리, 같은 rig ID만, 형식 오류는 버림) + 이 operation의 수리 인계 Bead.
   `bd show`로 상태를 읽어 `open|in_progress|blocked|resolved`만 살아 있음으로 센다. 없으면 `hold`.
4. base 검증 operation을 시작하고 의도를 `waiting_followup`(하위 상태 `base_verifying`)에 둔다. 머지 대기열 머리를 막지
   않도록 행은 대기열에서 뺀다(보류와 같은 방식).
5. base 검증이 `script_failed`면 대기 기록을 쓰고 `deadline_at = at + 48h`. 통과·`timeout`·그 밖은 `hold`.

### 4.2 대기 중

- bd 변경 트리거 때마다 연결 상태를 다시 읽는다. 하나라도 살아 있으면 그대로.
- 모두 살아 있지 않으면 base를 fetch한다. `base_sha`가 대기 기록과 같으면 `hold`(사유 꼬리 `후속 <ID> 끝남·base 그대로`).
  달라졌으면 새 base로 주제를 다시 핀하고(`setCompletionSubject`의 base 재핀) 보통 검증을 한 번 돌린다.
  통과 → `gating`으로 돌아가 머지. 실패 → `hold`(꼬리 `후속 <ID> 착지 뒤 재검증 실패`).
- `deadline_at`을 넘기면 `hold`(꼬리 `대기 상한 48시간`).
- 새 head push는 기존 stale 규칙으로 대기 기록을 비우고 새 head를 처음부터 판정한다.
- `[리뷰 후 머지]` 클릭은 대기 중에도 지금과 같은 출구다.
- 재시작: 대기 기록이 영속이므로 서버가 다시 뜨면 `waiting_followup` 의도를 다시 관찰한다. `base_verifying` 중이던 operation은
  기존 operation 채택 규칙으로 이어 받는다.

### 4.3 표시

서버 투영(`server/ws/worker-handlers.js` 완료 의도 투영)에 대기 기록을 싣고, `completionView`가 `waiting_followup`에서
결정 5 배지를 그린다. 타임라인에 `wait:<head>` 한 줄, Bead 댓글은 쓰지 않는다. Discord 알림은 없다.

### 4.4 오류와 경계

- 연결 Bead 읽기 실패는 살아 있지 않음으로 센다(조용히 다음 단계). 다른 rig ID는 무시한다.
- base 검증 체크아웃 실패는 `hold`.
- 대기는 머지를 허락하지 않는다. 머지는 언제나 통과한 검증 영수증 뒤에만 일어난다.
- 다른 저장소(foreign) 대상 PR의 검증 실패는 대상이 아니다(지금처럼 보류).

## 5. 수용 기준

1. base도 실패 + 살아 있는 연결 → `waiting_followup`, 알림·대화·Bead 댓글 없음, 배지 표시.
2. 연결 없음 → base 검증을 돌리지 않고 지금과 똑같이 보류.
3. 연결이 모두 닫히고 base가 움직임 → 새 base로 재검증 한 번, 통과면 머지, 실패면 보류(알림·대화 1회).
4. 연결이 닫혔는데 base 그대로 → 곧바로 보류.
5. 48시간 → 보류. 같은 (PR, head)는 두 번 대기하지 않는다.
6. 새 head push → 대기 해제 후 새 head 판정. 서버 재시작 뒤 대기 유지.

## 6. 검증

- `node --test server/worker/completion-intent.test.js server/worker/queue-store.test.js`
- `npm run typecheck`
- `npm test`

## Test scope

- RED→GREEN: `completion-intent.test.js`에 수용 기준 1~6 각각의 시나리오 테스트(가짜 bd·가짜 operation 러너),
  `queue-store.test.js`에 대기 기록 영속·(PR, head) 1회·stale 해제 테스트, `pr-wait-row` 배지 렌더 테스트.

## 7. 경계·후속

- 선행: dotfiles-84icv — 계약 어휘(`pre_merge_wait`, `base_red_followup`)가 착지한 뒤 구현한다(hand-off에서 `blocks`).
- 관찰: 폴러가 `holding` 행에서 base 이동 때 돌리는 검증 결과를 소비하지 않는 점은 이 spec이 바꾸지 않는다 — 보류의 출구 규칙이다.

## 8. 결정 (ADR 후보)

- 전제: ADR UI-ny0h — 머지 자격은 저장소 안 입력과 `[verify]`만 본다; base 검증도 같은 `[verify]`다.
- 전제: ADR UI-u6ud-2 — dotfiles 계약은 코드 registry로 복제해 소비한다; 새 어휘도 같은 방식으로 들인다.
- 전제: ADR dotfiles/dotfiles-it5mv-2 — 보류 진입 대화 1회 조항 그대로.
- 머지 전 검증 대기를 완료 의도의 새 단계·자동 해소 클래스로 두고 bd 변경 트리거로 관찰한다 — 정본 결정은 dotfiles-84icv
  ADR이 기록하고 여기서는 그 구현 배치라, 다음 spec 한 줄로 바꿀 수 있는 내부 구조다 → ADR 아님
