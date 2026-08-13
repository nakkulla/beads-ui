# post-merge completion repair 자동 재진입 설계

## 배경

`cleanupFact`는 머지 후 cleanup 실패의 `failure_key.subject_sha`를 `subject.merged_sha || subject.head_sha`로 기록한다. 그러나 `dispatchCompletionRepair`의 stale guard는 `subject.head_sha`만 비교한다. 따라서 PR head와 merge commit이 다른 정상 post-merge 실패도 `completion_subject_sha_stale`로 오판된다.

오판 시 이미 생성·readback된 repair Bead를 담은 `create_repair(status=observed)` operation은 보존되지만, root completion intent는 `needs_human`으로 terminalize되고 merge queue에서 빠진다. 현재 startup adoption은 과거 `resolution_timeout`만 처리하므로 재시작 뒤에도 이 상태가 자동으로 진행되지 않는다.

## 목표

- post-merge repair dispatch의 canonical subject SHA를 merge commit 기준으로 판정한다.
- 이 버그로 남은 정확한 historical terminal만 원자적으로 `repairing`에 복귀시킨다.
- 기존 repair Bead와 session budget을 그대로 재사용하고 새 Bead나 중복 session을 만들지 않는다.
- 일반적인 `needs_human`, 실제 SHA/base drift, 다른 terminal은 그대로 fail-closed로 둔다.
- 배포 뒤 현재 남아 있는 `beads-yvf-r555e06de`가 자동 session 생성, PR, 머지, post-merge 검증까지 기존 Worker 흐름으로 완료되게 한다.

## 비목표

- UI 상태 어휘, workflow metadata/label 계약, Beads schema를 변경하지 않는다.
- 모든 `needs_human` 상태를 자동 재개하지 않는다.
- queue 파일을 수동 수정하거나 기존 repair Bead를 새로 만들지 않는다.
- 외부 `beads` 저장소의 Bash 호환성 문제를 controller가 직접 수정하지 않는다. 복구된 Worker repair session이 해당 원인을 진단·수정한다.

## 설계

### 1. canonical subject SHA 판정

`server/worker/scheduler.js`의 `dispatchCompletionRepair`는 stale guard에서 `intent.subject.merged_sha || intent.subject.head_sha`를 사용한다. `merged_sha`가 있는 post-merge 단계에서는 merge commit만 canonical pin이며, merge 전 repair에서는 기존처럼 `head_sha`가 pin이다. `base_sha` 비교는 유지한다.

이 변경은 `failure_key`를 다시 쓰지 않는다. 현재 intent의 canonical pin과 operation에 이미 journal된 `failure_key`가 정확히 같은지만 검증한다.

### 2. 좁은 historical terminal adoption

`server/worker/queue-store.js`에 기존 `adoptLegacyResolutionTimeout`과 같은 원자 mutation을 추가한다. 다음 조건을 모두 만족할 때만 성공한다.

- queue의 `auto_merge`가 켜져 있다.
- root intent의 phase가 `needs_human`이다.
- terminal reason/stage가 각각 `completion_subject_sha_stale` / `repair_dispatch`다.
- `active_op`가 `create_repair`, `status=observed`, `attempt_id=null`이고 non-null `repair_bead_id`를 가진다.
- terminal과 active operation의 `failure_key` 5개 필드가 정확히 같다.
- `repair_bead_id`가 intent의 `repair_bead_ids`에 속하고 현재 completion lineage와 모순되지 않는다.
- canonical subject SHA(`merged_sha || head_sha`)와 `subject.base_sha`가 각각 journal된 failure key와 정확히 같다.
- root가 merge queue에 아직 없고 repair session budget이 남아 있다.

성공 mutation은 phase를 `repairing`으로 바꾸고 terminal을 지운 뒤 root를 runnable merge queue에 한 번 삽입한다. `active_op`, `repair_bead_ids`, `subject_stack`, `repair_sessions_used`는 변경하지 않는다. 조건 불일치나 persist 실패는 기존 terminal을 그대로 보존한다.

### 3. coordinator 재진입

`server/worker/completion-intent.js`의 driver는 `needs_human` adoption 진입점에서 위 historical repair adoption을 먼저 시도하고, 해당하지 않으면 기존 `resolution_timeout` adoption을 시도한다. `server/worker/attach.js`는 이 통합 adoption 함수를 coordinator에 연결한다.

원자 mutation이 queue change를 발생시키면 다음 reconcile에서 기존 `active_op=create_repair`가 `reconcile_op`로 선택된다. 기존 `continueCreateRepair`가 이미 기록된 repair Bead를 사용해 deterministic `dispatch_repair` operation/attempt를 만든다. scheduler의 canonical SHA guard를 통과하면 `beginRepairOp`가 create operation을 session operation으로 한 번 교체하면서 그때만 budget을 1 증가시킨다.

반복 startup/reconcile에서는 phase 또는 queue membership 전제조건이 더 이상 맞지 않으므로 adoption이 다시 적용되지 않는다. 기존 operation/attempt identity와 `beginRepairOp`의 충돌 방지가 session 중복 생성을 막는다.

## canonical owner와 소비자

- durable state와 atomic transition의 canonical owner: `server/worker/queue-store.js`
- lifecycle decision/effect consumer: `server/worker/completion-intent.js`
- dispatch pin 및 attempt 생성 consumer: `server/worker/scheduler.js`
- runtime wiring consumer: `server/worker/attach.js`
- runtime/generated copy: frontend 변경이 아니므로 bundle copy는 없다.
- checker/test surface: `server/worker/queue-store.test.js`, `server/worker/completion-intent.test.js`, `server/worker/scheduler.test.js`, 필요 시 attach wiring test

## Test scope

이 스펙은 아래 seam을 RED-GREEN 대상으로 승인한다.

1. scheduler unit test
   - `head_sha=A`, `merged_sha=M`, failure subject `M`인 post-merge repair가 dispatch되고 attempt/session budget이 한 번만 생성된다.
   - failure subject가 canonical pin과 다르거나 base가 drift하면 기존 stale reason으로 거부된다.
   - `merged_sha`가 없는 merge 전 흐름은 `head_sha`를 계속 사용한다.
2. queue-store unit test
   - 정확한 legacy terminal이 한 mutation으로 `repairing`/terminal null/queue restored가 되며 active op, repair Bead, stack, budget은 보존된다.
   - 반복 호출, failure key 불일치, repair Bead membership 불일치, SHA/base drift, queue 중복, budget 소진은 no-op이다.
   - persist 실패 시 기존 in-memory/durable terminal을 손상하지 않는다.
3. completion-intent/coordinator test
   - startup에서 해당 terminal을 한 번 adopt한 뒤 다음 reconcile이 기존 create operation을 정확히 한 번 dispatch한다.
   - 기존 `resolution_timeout` adoption은 회귀하지 않는다.
   - 다른 `needs_human` terminal은 자동 재개하지 않는다.

## 완료 검증

- focused RED-GREEN tests
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write` 후 owned diff 재확인
- 변경 범위가 frontend가 아니어도 repository pre-handoff 기준에 맞춰 `npm run build`
- PR 머지 뒤 merged checkout에서 공유 서비스 재시작 및 process path, listening port, HTTP health 확인
- durable queue/Bead/PR readback으로 기존 `beads-yvf-r555e06de` session 생성, repair PR 자동 머지, post-merge cleanup 성공, root/repair 완료를 확인

## 실패 처리

실제 SHA/base drift, persistence failure, local verification failure, CI red, unsafe merge는 자동으로 우회하지 않는다. 현재 계약의 terminal/hard-stop 경로와 증거를 보존하고 원인을 진단한다.
